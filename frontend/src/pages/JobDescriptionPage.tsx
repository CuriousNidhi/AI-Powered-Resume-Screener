import { useState } from 'react'

export default function JobDescriptionPage() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://localhost:8080/api/job/description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, text }),
      })
      if (!res.ok) throw new Error('Submission failed')
      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Paste Job Description</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title (optional)" className="w-full border rounded px-3 py-2" />
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste job description here..." className="w-full border rounded px-3 py-2 h-48" />
        <button disabled={!text || loading} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
          {loading ? 'Processing...' : 'Extract Skills'}
        </button>
      </form>
      {error && <div className="text-red-600">{error}</div>}
      {result && (
        <div className="bg-white rounded border p-4">
          <div className="font-medium">Job ID: {result.jobId}</div>
          <div className="text-sm text-gray-600">{result.title}</div>
          <div className="mt-2">
            <h3 className="font-medium">Extracted Skills</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {(result.skills || []).map((s: string) => (
                <span key={s} className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm">{s}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
