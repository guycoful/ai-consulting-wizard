const crypto = require('crypto');

const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000;

module.exports = async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { password } = req.body || {};

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Missing password' });
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_SECRET;

    if (!adminPassword || !secret) {
      return res.status(500).json({ error: 'Server config missing', detail: 'ADMIN_PASSWORD or ADMIN_SECRET not set' });
    }

    if (password.trim() !== adminPassword.trim()) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const payload = { role: 'admin', exp: Date.now() + TOKEN_EXPIRY_MS };
    const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const sig = crypto.createHmac('sha256', secret).update(data).digest('base64url');

    return res.status(200).json({ token: `${data}.${sig}` });
  } catch (error: any) {
    return res.status(500).json({ error: 'Auth failed', message: error.message, stack: error.stack });
  }
};
