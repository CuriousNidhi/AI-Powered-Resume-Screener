import { useEffect, useState } from 'react'

type Props = {
  running: boolean
}

export default function ProcessingPanel({ running }: Props) {
  const steps = [
    'Parsing your resume',
    'Analyzing your experience',
    'Extracting your skills',
    'Generating recommendations',
  ]
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!running) return
    setCurrent(0)
    const id = setInterval(() => {
      setCurrent((c) => (c < steps.length ? c + 1 : c))
    }, 700)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  return (
    <div className="grid md:grid-cols-[320px,1fr] gap-6 items-start">
      <div className="bg-white/90 rounded-2xl p-6 shadow-sm">
        <div className="text-gray-800 font-semibold">Your Score</div>
        <div className="mt-5 flex items-center justify-center">
          <div className="relative h-28 w-28">
            <div className="absolute inset-0 rounded-full border-8 border-gray-200" />
            <div className="absolute inset-0 rounded-full border-8 border-emerald-400" style={{ clipPath: 'inset(50% 0 0 0)' }} />
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-3 bg-gray-200 rounded w-20" />
        </div>
        <div className="mt-6 space-y-3 text-sm">
          {['CONTENT', 'SECTION', 'ATS ESSENTIALS', 'TAILORING'].map((label) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-gray-500">{label}</span>
              <span className="h-2 w-16 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/90 rounded-2xl p-6 shadow-sm">
        <div className="space-y-6">
          {steps.map((label, idx) => {
            const done = current > idx
            const active = current === idx
            return (
              <div key={label} className="flex items-center gap-4">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${done ? 'bg-emerald-500 text-white' : active ? 'bg-emerald-100 text-emerald-600 animate-pulse' : 'bg-gray-100 text-gray-400'}`}>
                  {done ? '✓' : '✓'}
                </div>
                <div className={`text-lg ${done ? 'text-gray-800' : active ? 'text-gray-900' : 'text-gray-400'}`}>{label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


