import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { supabase } from '@/lib/supabase'
import { SignupFormData, ApiResponse, SignupRecord } from '@/types'
import { validateSignupData } from '@/lib/validation'
import { checkRateLimit } from '@/lib/rate-limit'

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: NextRequest) {
  // Add CORS headers to response
  const responseHeaders = {
    ...corsHeaders,
    'Content-Type': 'application/json',
  }

  try {
    // Get client information
    const headersList = headers()
    const userAgent = headersList.get('user-agent') || 'Unknown'
    const referer = headersList.get('referer') || null
    const forwardedFor = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    
    // Determine client IP
    const clientIp = forwardedFor?.split(',')[0] || realIp || request.ip || 'Unknown'

    // Rate limiting check
    const rateLimitResult = await checkRateLimit(clientIp)
    
    if (!rateLimitResult.success) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.' 
        },
        { 
          status: 429,
          headers: {
            ...responseHeaders,
            'X-RateLimit-Limit': rateLimitResult.limit?.toString() || '5',
            'X-RateLimit-Remaining': rateLimitResult.remaining?.toString() || '0',
            'X-RateLimit-Reset': rateLimitResult.reset?.toString() || '',
          }
        }
      )
    }

    // Parse request body
    const body = await request.json()
    
    // Validate input data
    const validation = validateSignupData(body)
    if (!validation.valid) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false, 
          error: validation.errors.join(', ') 
        },
        { status: 400, headers: responseHeaders }
      )
    }

    const signupData: SignupFormData = {
      name: body.name.trim(),
      email: body.email.toLowerCase().trim(),
      newsletter_subscribed: body.newsletter_subscribed || false,
    }

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('vibe_coding_signups')
      .select('id')
      .eq('email', signupData.email)
      .single()

    if (existingUser) {
      return NextResponse.json<ApiResponse>(
        { 
          success: false, 
          error: 'This email is already registered.' 
        },
        { status: 409, headers: responseHeaders }
      )
    }

    // Insert new signup
    const { data, error } = await supabase
      .from('vibe_coding_signups')
      .insert([
        {
          name: signupData.name,
          email: signupData.email,
          newsletter_subscribed: signupData.newsletter_subscribed,
          ip_address: clientIp,
          user_agent: userAgent,
          referrer_url: referer,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      
      // Handle specific database errors
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json<ApiResponse>(
          { 
            success: false, 
            error: 'This email is already registered.' 
          },
          { status: 409, headers: responseHeaders }
        )
      }
      
      return NextResponse.json<ApiResponse>(
        { 
          success: false, 
          error: 'Failed to process signup. Please try again.' 
        },
        { status: 400, headers: responseHeaders }
      )
    }

    // Return success response with sanitized data
    const responseData: Partial<SignupRecord> = {
      id: data.id,
      name: data.name,
      email: data.email,
      newsletter_subscribed: data.newsletter_subscribed,
      created_at: data.created_at,
    }

    return NextResponse.json<ApiResponse<Partial<SignupRecord>>>(
      { 
        success: true, 
        data: responseData 
      },
      { 
        status: 201, 
        headers: {
          ...responseHeaders,
          'X-RateLimit-Remaining': rateLimitResult.remaining?.toString() || '',
        }
      }
    )
  } catch (error) {
    console.error('Signup endpoint error:', error)
    
    return NextResponse.json<ApiResponse>(
      { 
        success: false, 
        error: 'An unexpected error occurred. Please try again.' 
      },
      { status: 500, headers: responseHeaders }
    )
  }
}