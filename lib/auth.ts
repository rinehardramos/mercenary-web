'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_URL, User, getToken, clearToken } from '@/lib/api'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    if (!token) {
      setLoading(false)
      return
    }

    fetch(`${API_URL}/auth/session`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          clearToken()
          throw new Error('Not authenticated')
        }
        return res.json()
      })
      .then(setUser)
      .catch(() => {
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const logout = async () => {
    clearToken()
    setUser(null)
    router.push('/')
  }

  return { user, loading, logout }
}
