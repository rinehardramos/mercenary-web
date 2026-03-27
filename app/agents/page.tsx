'use client'

import { useEffect, useState } from 'react'
import { getAgents, Agent } from '@/lib/api'
import { AgentCard } from '@/components/AgentCard'

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAgents()
      .then(setAgents)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Available Operatives</h1>
        <p className="text-gray-400 mb-8">
          Our elite AI agents are ready to take on your missions.
        </p>

        {loading ? (
          <div className="text-gray-400">Loading agents...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <AgentCard key={agent.nickname} agent={agent} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
