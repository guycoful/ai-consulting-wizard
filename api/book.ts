import { createBookingEvent } from './_lib/calendar';
import { sendBookingConfirmation, sendOwnerNotification } from './_lib/email';

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

    // Validate time format
    if (!/^\d{2}:\d{2}$/.test(time)) {
      return res.status(400).json({ error: 'Invalid time format. Use HH:MM.' });
    }

    // Create the calendar event
    const eventId = await createBookingEvent(date, time, name.trim(), email.trim());

    // Send emails (don't fail the booking if email fails)
    try {
      await Promise.all([
        sendBookingConfirmation(email.trim(), name.trim(), date, time),
        sendOwnerNotification(name.trim(), email.trim(), date, time),
      ]);
    } catch (emailError: any) {
      console.error('Email sending failed (booking was still created):', emailError.message);
    }

    return res.status(200).json({ success: true, eventId });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ error: 'Failed to create booking', details: error.message });
  }
}
