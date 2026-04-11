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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify admin token
    const token = getTokenFromRequest(req);
    if (!token || !verifyToken(token)) {
      return res.status(401).json({ error: 'Unauthorized. Valid admin token required.' });
    }

    // Get today's date in YYYY-MM-DD format (Israel timezone)
    const now = new Date();
    const israelDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }));
    const todayStr = `${israelDate.getFullYear()}-${String(israelDate.getMonth() + 1).padStart(2, '0')}-${String(israelDate.getDate()).padStart(2, '0')}`;

    // Query booked slots from today onwards
    const url = `${SUPABASE_URL}/rest/v1/booking_slots?status=eq.booked&slot_date=gte.${todayStr}&order=slot_date.asc,slot_time.asc&select=id,slot_date,slot_time,booked_name,booked_email`;
    const response = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Supabase error:', response.status, errorBody);
      return res.status(500).json({ error: 'Failed to query bookings' });
    }

    const rows: Array<{
      id: string;
      slot_date: string;
      slot_time: string;
      booked_name: string | null;
      booked_email: string | null;
    }> = await response.json();

    const bookings = rows.map((row) => ({
      id: row.id,
      date: row.slot_date,
      time: row.slot_time.substring(0, 5), // "18:00:00" -> "18:00"
      name: row.booked_name || '',
      email: row.booked_email || '',
    }));

    return res.status(200).json({ bookings });
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ error: 'Failed to fetch bookings', details: error.message });
  }
}
