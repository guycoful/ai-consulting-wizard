const SUPABASE_URL = "https://vuvavjmbvdqnwtleudqh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1dmF2am1idmRxbnd0bGV1ZHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDY1MTMsImV4cCI6MjA2NzAyMjUxM30.QgtlrWs_qL7dMzxHkdUQaCBkGWsNNnExDv0phGz7NbI";

interface VercelRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: any;
  query: Record<string, string | string[]>;
}

interface VercelResponse {
  setHeader(k: string, v: string): VercelResponse;
  status(c: number): VercelResponse;
  json(b: any): VercelResponse;
  end(): VercelResponse;
}

function setCors(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { date, time, name, email } = req.body || {};

    // Validate required fields
    if (!date || typeof date !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid field: date (YYYY-MM-DD)' });
    }
    if (!time || typeof time !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid field: time (HH:MM)' });
    }
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'Missing or invalid field: name' });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Missing or invalid field: email' });
    }

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    // Validate time format (HH:MM)
    if (!/^\d{2}:\d{2}$/.test(time)) {
      return res.status(400).json({ error: 'Invalid time format. Use HH:MM.' });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    // Find available slot matching date + time
    const findUrl = `${SUPABASE_URL}/rest/v1/booking_slots?slot_date=eq.${date}&slot_time=eq.${time}:00&status=eq.available&select=id`;
    const findResponse = await fetch(findUrl, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!findResponse.ok) {
      const errorBody = await findResponse.text();
      console.error('Supabase find error:', findResponse.status, errorBody);
      return res.status(500).json({ error: 'Failed to check slot availability' });
    }

    const matchingSlots: Array<{ id: string }> = await findResponse.json();

    if (matchingSlots.length === 0) {
      return res.status(409).json({ error: 'החלון כבר תפוס', message: 'החלון כבר תפוס' });
    }

    const slotId = matchingSlots[0].id;

    // Update the slot to booked
    const updateUrl = `${SUPABASE_URL}/rest/v1/booking_slots?id=eq.${slotId}`;
    const updateResponse = await fetch(updateUrl, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        status: 'booked',
        booked_name: trimmedName,
        booked_email: trimmedEmail,
        booked_at: new Date().toISOString(),
      }),
    });

    if (!updateResponse.ok) {
      const errorBody = await updateResponse.text();
      console.error('Supabase update error:', updateResponse.status, errorBody);
      return res.status(500).json({ error: 'Failed to book slot' });
    }

    // TODO: Send email notification (email.ts is preserved for future use)
    // When ready, import sendBookingConfirmation and sendOwnerNotification from ./_lib/email

    return res.status(200).json({ success: true, slotId });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ error: 'Failed to create booking', details: error.message });
  }
}
