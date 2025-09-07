import React from 'react'

export default function HeroScorePanel() {
  const percent = 92
  const issues = 24
  const sections: { title: string; items: { label: string; ok: boolean }[] }[] = [
    {
      title: 'CONTENT',
      items: [
        { label: 'ATS Parse Rate', ok: true },
        { label: 'Quantifying Impact', ok: true },
        { label: 'Repetition', ok: false },
        { label: 'Spelling & Grammar', ok: false },
        { label: 'Summarize Resume', ok: true },
      ],
    },
    {
      title: 'FORMAT & BREVITY',
      items: [
        { label: 'File format & size', ok: true },
        { label: 'Resume length', ok: true },
        { label: 'Long bullet points', ok: false },
      ],
    },
    {
      title: 'SECTIONS',
      items: [
        { label: 'Contact info present', ok: true },
        { label: 'Essential sections', ok: true },
        { label: 'Personality showcase', ok: false },
      ],
    },
    {
      title: 'STYLE',
      items: [
        { label: 'Design consistency', ok: true },
        { label: 'Email address', ok: true },
        { label: 'Active voice', ok: false },
        { label: 'Buzzwords & cliches', ok: false },
      ],
    },
    {
      title: 'SKILLS',
      items: [
        { label: 'Hard skills', ok: true },
        { label: 'Soft skills', ok: false },
      ],
    },
  ]

  const ringStyle: React.CSSProperties = {
    background: `conic-gradient(#10b981 ${percent * 3.6}deg, #e5e7eb 0deg)`,
    WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 16px), #000 0)',
    mask: 'radial-gradient(farthest-side, transparent calc(100% - 16px), #000 0)',
  }

  return (
    <aside className="bg-white border rounded-2xl p-5 md:p-6 shadow-sm">
      <div className="text-sm text-gray-700 font-semibold">Resume Score</div>
      <div className="mt-4 flex items-center gap-4">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full" style={ringStyle} />
          <div className="absolute inset-2 rounded-full bg-white grid place-items-center">
            <div className="text-emerald-600 font-bold text-lg">{percent}</div>
          </div>
        </div>
        <div className="text-gray-500 text-sm">
          <div className="text-gray-800 font-medium">{percent}/100</div>
          <div>{issues} Issues</div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="uppercase text-[11px] tracking-wide text-gray-500">{section.title}</div>
            <div className="mt-2 space-y-1.5">
              {section.items.map((it) => (
                <div key={it.label} className="flex items-center gap-2 text-sm">
                  <span className={`${it.ok ? 'text-emerald-600' : 'text-rose-500'}`}>{it.ok ? '✓' : '✕'}</span>
                  <span className="text-gray-700">{it.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}


