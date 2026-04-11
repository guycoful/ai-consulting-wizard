import { google, calendar_v3 } from 'googleapis';

const TIMEZONE = 'Asia/Jerusalem';
const SLOT_DURATION_MINUTES = 30;
const WORKING_START_HOUR = 9;
const WORKING_END_HOUR = 18;

function getCalendarClient(): calendar_v3.Calendar {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const keyBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!email || !keyBase64) {
    throw new Error('Missing Google service account credentials in environment variables');
  }

  const keyJson = JSON.parse(Buffer.from(keyBase64, 'base64').toString('utf-8'));
  const privateKey = keyJson.private_key || keyJson;

  const auth = new google.auth.JWT({
    email,
    key: typeof privateKey === 'string' ? privateKey : keyJson.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return google.calendar({ version: 'v3', auth });
}

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = WORKING_START_HOUR; hour < WORKING_END_HOUR; hour++) {
    slots.push(`${String(hour).padStart(2, '0')}:00`);
    slots.push(`${String(hour).padStart(2, '0')}:30`);
  }
  return slots;
}

function isWeekend(dateStr: string): boolean {
  const date = new Date(dateStr + 'T00:00:00');
  const day = date.getDay();
  // Friday = 5, Saturday = 6
  return day === 5 || day === 6;
}

function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

async function getAvailableSlots(dateStr: string): Promise<Array<{ time: string; available: boolean }>> {
  if (isWeekend(dateStr)) {
    return [];
  }

  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'info@guycohen-ai.co.il';

  const timeMin = new Date(`${dateStr}T00:00:00+03:00`).toISOString();
  const timeMax = new Date(`${dateStr}T23:59:59+03:00`).toISOString();

  const freebusyResponse = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      timeZone: TIMEZONE,
      items: [{ id: calendarId }],
    },
  });

  const busySlots = freebusyResponse.data.calendars?.[calendarId]?.busy || [];

  const allSlots = generateTimeSlots();

  // Get current time in Israel timezone for filtering past slots
  const nowInIsrael = new Date(
    new Date().toLocaleString('en-US', { timeZone: TIMEZONE })
  );
  const todayStr = `${nowInIsrael.getFullYear()}-${String(nowInIsrael.getMonth() + 1).padStart(2, '0')}-${String(nowInIsrael.getDate()).padStart(2, '0')}`;
  const nowMinutes = nowInIsrael.getHours() * 60 + nowInIsrael.getMinutes();
  const isToday = dateStr === todayStr;

  return allSlots.map((time) => {
    const slotStartMinutes = parseTimeToMinutes(time);
    const slotEndMinutes = slotStartMinutes + SLOT_DURATION_MINUTES;

    // Don't return past slots for today
    if (isToday && slotStartMinutes <= nowMinutes) {
      return { time, available: false };
    }

    // Check if slot overlaps with any busy period
    const slotStart = new Date(`${dateStr}T${time}:00+03:00`);
    const slotEnd = new Date(slotStart.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);

    const isBusy = busySlots.some((busy) => {
      const busyStart = new Date(busy.start as string);
      const busyEnd = new Date(busy.end as string);
      return slotStart < busyEnd && slotEnd > busyStart;
    });

    return { time, available: !isBusy };
  });
}

async function createBookingEvent(
  dateStr: string,
  timeStr: string,
  name: string,
  email: string
): Promise<string> {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'info@guycohen-ai.co.il';

  const startDateTime = `${dateStr}T${timeStr}:00`;
  const startDate = new Date(`${startDateTime}+03:00`);
  const endDate = new Date(startDate.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);

  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `[BOOKING] שיחה עם ${name}`,
      description: `שם: ${name}\nאימייל: ${email}`,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: TIMEZONE,
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: TIMEZONE,
      },
    },
  });

  return event.data.id || '';
}

async function getUpcomingBookings(): Promise<
  Array<{ id: string; name: string; email: string; date: string; time: string }>
> {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'info@guycohen-ai.co.il';

  const now = new Date().toISOString();

  const response = await calendar.events.list({
    calendarId,
    timeMin: now,
    singleEvents: true,
    orderBy: 'startTime',
    q: '[BOOKING]',
  });

  const events = response.data.items || [];

  return events
    .filter((event) => event.summary?.startsWith('[BOOKING]'))
    .map((event) => {
      const summary = event.summary || '';
      const description = event.description || '';
      const nameMatch = summary.match(/\[BOOKING\] שיחה עם (.+)/);
      const emailMatch = description.match(/אימייל: (.+)/);

      const startDateTime = event.start?.dateTime || '';
      const dt = new Date(startDateTime);

      // Format date and time in Israel timezone
      const dateFormatted = dt.toLocaleDateString('en-CA', { timeZone: TIMEZONE }); // YYYY-MM-DD
      const timeFormatted = dt.toLocaleTimeString('en-GB', {
        timeZone: TIMEZONE,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      return {
        id: event.id || '',
        name: nameMatch ? nameMatch[1] : '',
        email: emailMatch ? emailMatch[1] : '',
        date: dateFormatted,
        time: timeFormatted,
      };
    });
}

async function cancelBooking(eventId: string): Promise<void> {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'info@guycohen-ai.co.il';

  await calendar.events.delete({
    calendarId,
    eventId,
  });
}

export {
  getCalendarClient,
  getAvailableSlots,
  createBookingEvent,
  getUpcomingBookings,
  cancelBooking,
};
