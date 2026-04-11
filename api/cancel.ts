import { cancelBooking } from './_lib/calendar';
import { sendCancellationNotice } from './_lib/email';
import { verifyToken, getTokenFromRequest } from './_lib/auth';

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
    // Verify admin token
    const token = getTokenFromRequest(req);
    if (!token || !verifyToken(token)) {
      return res.status(401).json({ error: 'Unauthorized. Valid admin token required.' });
    }

    const { eventId, email, name, date, time } = req.body || {};

    if (!eventId || typeof eventId !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid field: eventId' });
    }

    // Cancel the calendar event
    await cancelBooking(eventId);

    // Send cancellation email if contact info provided
    if (email && name && date && time) {
      try {
        await sendCancellationNotice(email, name, date, time);
      } catch (emailError: any) {
        console.error('Cancellation email failed (event was still deleted):', emailError.message);
      }
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error cancelling booking:', error);
    return res.status(500).json({ error: 'Failed to cancel booking', details: error.message });
  }
}
