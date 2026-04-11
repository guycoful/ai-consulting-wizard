import { verifyToken, getTokenFromRequest } from './_lib/auth';

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
    // Verify admin token
    const token = getTokenFromRequest(req);
    if (!token || !verifyToken(token)) {
      return res.status(401).json({ error: 'Unauthorized. Valid admin token required.' });
    }

    const { slotId, id } = req.body || {};
    const targetId = slotId || id; // Support both field names

    if (!targetId || typeof targetId !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid field: slotId' });
    }

    // Reset the slot back to available
    const updateUrl = `${SUPABASE_URL}/rest/v1/booking_slots?id=eq.${targetId}`;
    const updateResponse = await fetch(updateUrl, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        status: 'available',
        booked_name: null,
        booked_email: null,
        booked_at: null,
      }),
    });

    if (!updateResponse.ok) {
      const errorBody = await updateResponse.text();
      console.error('Supabase update error:', updateResponse.status, errorBody);
      return res.status(500).json({ error: 'Failed to cancel booking' });
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error cancelling booking:', error);
    return res.status(500).json({ error: 'Failed to cancel booking', details: error.message });
  }
}
