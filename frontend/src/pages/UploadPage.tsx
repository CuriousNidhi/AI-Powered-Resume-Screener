import { useState, useRef } from 'react'
import ProcessingPanel from '../components/ProcessingPanel'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const dropRef = useRef<HTMLDivElement | null>(null)

  const onFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const f = files[0]
    const maxBytes = 2 * 1024 * 1024 // 2MB
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain']
    if (f.size > maxBytes) {
      setError('Max file size is 2MB')
      return
    }
    if (!allowed.includes(f.type)) {
      // allow based on extension fallback
      const okExt = /\.(pdf|docx|doc|txt)$/i.test(f.name)
      if (!okExt) {
        setError('Allowed types: PDF, DOCX, DOC, TXT')
        return
      }
    }
    setError(null)
    setFile(f)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('http://localhost:8080/api/resume/upload', {
        method: 'POST',
        body: form,
      })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    dropRef.current?.classList.add('ring-2', 'ring-emerald-400/70')
  }
  const onDragLeave = () => {
    dropRef.current?.classList.remove('ring-2', 'ring-emerald-400/70')
  }
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    onDragLeave()
    onFiles(e.dataTransfer.files)
  }

  return (
    <div className="space-y-10">
      <section className="relative">
        <div className="bg-gradient-to-br from-emerald-50 via-sky-50 to-violet-100">
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">Is your resume good enough?</h1>
                <p className="mt-6 text-gray-700 text-lg">A free and fast AI resume checker doing crucial checks to ensure your resume is ready to perform and get you interview callbacks.</p>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div
                    ref={dropRef}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className="rounded-2xl border-2 border-dashed border-emerald-300 bg-white p-8 text-center shadow-sm"
                  >
                    <div className="mx-auto h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl">⬆️</div>
                    <div className="mt-4 text-gray-700 font-medium">Drop your resume here or choose a file.</div>
                    <div className="text-sm text-gray-500">PDF & DOCX only. Max 2MB file size.</div>
                    <div className="mt-6">
                      <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md cursor-pointer transition">
                        Upload Your Resume
                        <input type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={(e) => onFiles(e.target.files)} />
                      </label>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-2 text-xs text-gray-500">
                      <span>🔒 Privacy guaranteed</span>
                    </div>
                    {file && <div className="mt-3 text-sm text-gray-600">Selected: {file.name}</div>}
                  </div>

                  <div className="mt-6">
                    <button disabled={!file || loading} className="w-full md:w-auto px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded disabled:opacity-50 transition">
                      {loading ? 'Uploading...' : 'Upload & Parse'}
                    </button>
                  </div>
                </form>
                {error && <div className="mt-4 text-rose-600">{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading && (
        <section className="max-w-5xl mx-auto px-4">
          <ProcessingPanel running={loading} />
        </section>
      )}

      {result && (
        <div className="max-w-3xl mx-auto bg-white rounded-xl border p-6 space-y-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">{result.candidateName || 'Candidate'}</div>
              <div className="text-sm text-gray-600">Resume ID: {result.resumeId}</div>
            </div>
            <div className="text-sm text-gray-500">Parsed via API</div>
          </div>
          <div>
            <h3 className="font-medium">Skills</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {(result.skills || []).map((s: string) => (
                <span key={s} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-sm">{s}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
