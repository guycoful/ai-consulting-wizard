import { getUpcomingBookings } from './_lib/calendar';
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

    const bookings = await getUpcomingBookings();
    return res.status(200).json({ bookings });
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ error: 'Failed to fetch bookings', details: error.message });
  }
}
