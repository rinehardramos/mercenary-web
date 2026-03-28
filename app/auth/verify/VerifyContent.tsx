'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export function VerifyContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (!token) {
      setStatus('error')
      setMessage('No verification token provided')
      return
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setStatus('success')
          setMessage(data.message)
          setTimeout(() => router.push('/auth/login'), 3000)
        } else {
          setStatus('error')
          setMessage(data.detail || 'Verification failed')
        }
      })
      .catch(err => {
        setStatus('error')
        setMessage(err.message || 'Verification failed')
      })
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full px-6">
        <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
          <div className="text-center">
            {status === 'loading' && (
              <>
                <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h1 className="text-2xl font-bold text-white mb-2">Verifying Email</h1>
                <p className="text-gray-400">Please wait...</p>
              </>
            )}
            
            {status === 'success' && (
              <>
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Email Verified!</h1>
                <p className="text-gray-400 mb-4">{message}</p>
                <p className="text-gray-500 text-sm">Redirecting to login...</p>
              </>
            )}
            
            {status === 'error' && (
              <>
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Verification Failed</h1>
                <p className="text-gray-400 mb-6">{message}</p>
                <Link 
                  href="/auth/login"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition inline-block"
                >
                  Go to Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
