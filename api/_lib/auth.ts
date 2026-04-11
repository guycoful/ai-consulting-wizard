import crypto from 'crypto';

const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SECRET environment variable is not set');
  }
  return secret;
}

function createToken(): string {
  const secret = getSecret();
  const payload = {
    role: 'admin',
    exp: Date.now() + TOKEN_EXPIRY_MS,
  };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${sig}`;
}

function verifyToken(token: string): boolean {
  try {
    const secret = getSecret();
    const [data, sig] = token.split('.');
    if (!data || !sig) return false;

    const expectedSig = crypto.createHmac('sha256', secret).update(data).digest('base64url');
    if (sig !== expectedSig) return false;

    const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
    if (payload.exp < Date.now()) return false;

    return true;
  } catch {
    return false;
  }
}

function getTokenFromRequest(req: { headers: Record<string, string | string[] | undefined> }): string | null {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) return null;

  const headerValue = Array.isArray(authHeader) ? authHeader[0] : authHeader;
  if (!headerValue) return null;

  const match = headerValue.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

export { createToken, verifyToken, getTokenFromRequest };
