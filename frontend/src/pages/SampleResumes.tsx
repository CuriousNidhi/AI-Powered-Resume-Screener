import { useEffect, useState } from 'react'

export default function SampleResumes() {
  const [files, setFiles] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/resumes/sample')
        if (!res.ok) throw new Error('Failed to load samples')
        const data = await res.json()
        setFiles(data)
      } catch (e: any) {
        setError(e.message || 'Error')
      } finally {
        setLoading(false)
      }
    }
    fetchList()
  }, [])

  const download = (name: string) => {
    window.location.href = `http://localhost:8080/api/resumes/sample/${encodeURIComponent(name)}`
  }

  const uploadAndTest = async (name: string) => {
    try {
      const url = `http://localhost:8080/api/resumes/sample/${encodeURIComponent(name)}`
      const blob = await fetch(url).then(r => r.blob())
      const file = new File([blob], name)
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('http://localhost:8080/api/resume/upload', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      alert(`Uploaded sample. Resume ID: ${data.id || data.resumeId || 'OK'}`)
    } catch (e: any) {
      alert(e.message || 'Failed to upload sample')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Sample Resumes</h1>
      <p className="text-gray-600 mt-1">Use these files to test parsing and matching quickly.</p>

      {loading && <div className="mt-6">Loading…</div>}
      {error && <div className="mt-6 text-red-600">{error}</div>}

      <div className="mt-6 divide-y rounded border bg-white">
        {files.map((f) => (
          <div key={f} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-medium">{f}</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-3 py-1.5 rounded border hover:bg-gray-50" onClick={() => download(f)}>Download</button>
              <button className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => uploadAndTest(f)}>Upload & Test</button>
            </div>
          </div>
        ))}
        {!loading && files.length === 0 && (
          <div className="px-4 py-6 text-gray-500">No samples found.</div>
        )}
      </div>
    </div>
  )
}


