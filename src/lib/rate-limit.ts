/**
 * In-memory, best-effort rate limiter (spec-accepted tradeoff: on serverless
 * each instance has its own memory, so this isn't a hard guarantee across
 * instances — it's still a real deterrent against casual password
 * guessing, and the admin login is a single hardcoded account behind
 * bcrypt, not a high-value multi-tenant target).
 */

interface Bucket {
  failures: number;
  windowStartedAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  allowed: boolean;
  retryAfterMs?: number;
}

export function checkRateLimit(
  key: string,
  { max, windowMs }: { max: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStartedAt > windowMs) {
    buckets.set(key, { failures: 0, windowStartedAt: now });
    return { allowed: true };
  }

  if (bucket.failures >= max) {
    return { allowed: false, retryAfterMs: windowMs - (now - bucket.windowStartedAt) };
  }

  return { allowed: true };
}

export function recordFailure(key: string): void {
  const bucket = buckets.get(key);
  if (bucket) bucket.failures += 1;
}
