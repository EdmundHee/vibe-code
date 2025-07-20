interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store for rate limiting
const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

export async function checkRateLimit(identifier: string) {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute window
  const maxRequests = 5
  
  const entry = rateLimitStore.get(identifier)
  
  if (!entry || entry.resetTime < now) {
    // New window
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    })
    
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      reset: Math.floor((now + windowMs) / 1000)
    }
  }
  
  if (entry.count >= maxRequests) {
    // Rate limit exceeded
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      reset: Math.floor(entry.resetTime / 1000)
    }
  }
  
  // Increment count
  entry.count++
  
  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - entry.count,
    reset: Math.floor(entry.resetTime / 1000)
  }
}