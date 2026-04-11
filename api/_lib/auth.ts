import jwt from 'jsonwebtoken';

const TOKEN_EXPIRY = '24h';

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SECRET environment variable is not set');
  }
  return secret;
}

function createToken(): string {
  const secret = getSecret();
  return jwt.sign({ role: 'admin', iat: Math.floor(Date.now() / 1000) }, secret, {
    expiresIn: TOKEN_EXPIRY,
  });
}

function verifyToken(token: string): boolean {
  try {
    const secret = getSecret();
    jwt.verify(token, secret);
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
