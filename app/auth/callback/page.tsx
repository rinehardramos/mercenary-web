'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function OAuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (!token) {
      router.push('/auth/login?error=oauth_failed')
      return
    }

    // Exchange token for session cookie via backend
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/set-cookie`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ token }),
    })
      .then(res => {
        if (res.ok) {
          router.replace('/dashboard')
        } else {
          router.push('/auth/login?error=session_failed')
        }
      })
      .catch(() => {
        router.push('/auth/login?error=session_failed')
      })
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Completing login...</p>
      </div>
    </div>
  )
}
