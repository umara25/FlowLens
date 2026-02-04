import crypto from 'crypto'

const FLOWLENS_SECRET = process.env.FLOWLENS_HMAC_SECRET || 'dev-secret-change-in-production'

/**
 * Verify HMAC signature from incoming webhook requests
 * Header: x-flowlens-signature = HMAC_SHA256(secret, raw_body)
 */
export function verifySignature(signature: string | null, rawBody: string): boolean {
  if (!signature) {
    return false
  }

  const expectedSignature = crypto
    .createHmac('sha256', FLOWLENS_SECRET)
    .update(rawBody)
    .digest('hex')

  // Use timing-safe comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  } catch {
    return false
  }
}

/**
 * Generate HMAC signature for testing purposes
 */
export function generateSignature(body: string): string {
  return crypto
    .createHmac('sha256', FLOWLENS_SECRET)
    .update(body)
    .digest('hex')
}
