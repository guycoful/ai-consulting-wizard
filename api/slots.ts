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
    const date = req.query.date;
    const dateStr = Array.isArray(date) ? date[0] : date;

    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return res.status(400).json({ error: 'Missing or invalid date parameter. Use YYYY-MM-DD format.' });
    }

    // Query all slots for this date from Supabase
    const url = `${SUPABASE_URL}/rest/v1/booking_slots?slot_date=eq.${dateStr}&order=slot_time.asc`;
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
      return res.status(500).json({ error: 'Failed to query slots' });
    }

    const rows: Array<{ slot_time: string; status: string }> = await response.json();

    // Return all slots - available ones as available:true, booked/blocked as available:false
    const slots = rows.map((row) => ({
      time: row.slot_time.substring(0, 5), // "18:00:00" -> "18:00"
      available: row.status === 'available',
    }));

    return res.status(200).json({ slots });
  } catch (error: any) {
    console.error('Error fetching slots:', error);
    return res.status(500).json({ error: 'Failed to fetch available slots', details: error.message });
  }
}
