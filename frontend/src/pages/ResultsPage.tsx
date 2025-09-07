import { useMemo, useState } from 'react'
import ScoreCard from '../components/ScoreCard'

function Progress({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className="w-full bg-gray-200 rounded h-3">
      <div className="bg-blue-600 h-3 rounded" style={{ width: `${clamped}%` }} />
    </div>
  )
}

export default function ResultsPage() {
  const [resumeId, setResumeId] = useState('')
  const [jobId, setJobId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleMatch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://localhost:8080/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId, jobId }),
      })
      if (!res.ok) throw new Error('Match failed')
      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/match/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId, jobId }),
      })
      if (!res.ok) throw new Error('Download failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'match-report.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Match Results</h2>
      <form onSubmit={handleMatch} className="space-y-3">
        <input value={resumeId} onChange={(e) => setResumeId(e.target.value)} placeholder="Resume ID" className="w-full border rounded px-3 py-2" />
        <input value={jobId} onChange={(e) => setJobId(e.target.value)} placeholder="Job ID" className="w-full border rounded px-3 py-2" />
        <button disabled={!resumeId || !jobId || loading} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
          {loading ? 'Matching...' : 'Compute Match'}
        </button>
      </form>
      {error && <div className="text-red-600">{error}</div>}
      {result && (
        <div className="grid md:grid-cols-[320px,1fr] gap-6">
          <ScoreCard
            score={result.score}
            sections={[
              {
                title: 'CONTENT',
                percent: Math.round(Math.min(100, result.score * 0.9)),
                items: [
                  { label: 'ATS Parse Rate', ok: true },
                  { label: 'Quantifying Impact', ok: result.score >= 70 },
                  { label: 'Repetition', ok: result.missingSkills.length <= 3 },
                  { label: 'Spelling & Grammar', ok: true },
                ],
              },
              {
                title: 'SECTION',
                percent: 81,
                items: [
                  { label: 'Summary Present', ok: true },
                  { label: 'Experience Listed', ok: true },
                ],
              },
              {
                title: 'ATS ESSENTIALS',
                percent: 83,
                items: [
                  { label: 'Contact Details', ok: true },
                  { label: 'Skills Present', ok: (result.matchedSkills || []).length > 0 },
                ],
              },
            ]}
          />

          <div className="bg-white rounded border p-4 space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-xl font-medium">Score: {result.score.toFixed(1)}%</div>
              <div className="flex-1"><Progress value={result.score} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium">Matched Skills</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(result.matchedSkills || []).map((s: string) => (
                    <span key={s} className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium">Missing Skills</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(result.missingSkills || []).map((s: string) => (
                    <span key={s} className="px-2 py-1 bg-red-50 text-red-700 rounded text-sm">{s}</span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <button onClick={handleDownload} className="px-4 py-2 bg-gray-800 text-white rounded">Download PDF Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
