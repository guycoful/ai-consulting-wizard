import { getAvailableSlots } from './_lib/calendar';

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

    const slots = await getAvailableSlots(dateStr);
    return res.status(200).json({ slots });
  } catch (error: any) {
    console.error('Error fetching slots:', error);
    return res.status(500).json({ error: 'Failed to fetch available slots', details: error.message });
  }
}
