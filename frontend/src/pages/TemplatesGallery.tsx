import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

type TemplateCard = {
  id: string
  name: string
  tags: string[]
  color?: string
  accent?: string
  thumbnail?: string
}

function MiniPreview({ color }: { color: string }) {
  return (
    <div className="h-48 bg-white">
      <div className="relative h-full rounded-xl border overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#eef2f7 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
        <div className="relative h-full p-3 grid grid-cols-3 gap-2">
          <div className="col-span-1 space-y-2">
            <div className="h-3 w-20 rounded" style={{ background: color, boxShadow: '0 0 0 2px white inset' }} />
            <div className="h-2 w-16 bg-slate-200 rounded" />
            <div className="h-2 w-14 bg-slate-200 rounded" />
            <div className="h-24 bg-slate-100 rounded" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.6) 50%, rgba(255,255,255,0) 100%)', backgroundSize: '200% 100%', animation: 'shimmer 2.2s linear infinite' }} />
          </div>
          <div className="col-span-2 space-y-2">
            <div className="h-3 w-3/4 bg-slate-200 rounded" />
            <div className="h-2 w-full bg-slate-200 rounded" />
            <div className="h-2 w-5/6 bg-slate-200 rounded" />
            <div className="h-2 w-2/3 bg-slate-200 rounded" />
            <div className="h-2 w-3/4 bg-slate-200 rounded" />
            <div className="pt-1 grid grid-cols-2 gap-2">
              <div className="h-16 bg-slate-100 rounded" />
              <div className="h-16 bg-slate-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TemplateThumb({ color }: { color: string }) {
  return (
    <div className="h-48 bg-white">
      <svg viewBox="0 0 320 192" className="w-full h-full">
        <defs>
          <linearGradient id="shimmer" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#ffffff00" />
            <stop offset="50%" stopColor="#ffffff99" />
            <stop offset="100%" stopColor="#ffffff00" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="320" height="192" fill="#f8fafc" rx="12" />
        <rect x="16" y="16" width="48" height="8" rx="3" fill={color} />
        <rect x="16" y="36" width="80" height="6" rx="3" fill="#cbd5e1" />
        <rect x="16" y="48" width="64" height="6" rx="3" fill="#e2e8f0" />
        <rect x="16" y="64" width="288" height="1" fill="#e5e7eb" />

        <rect x="16" y="76" width="180" height="6" rx="3" fill="#e2e8f0" />
        <rect x="16" y="88" width="216" height="6" rx="3" fill="#e2e8f0" />
        <rect x="16" y="100" width="192" height="6" rx="3" fill="#e2e8f0" />
        <rect x="16" y="112" width="160" height="6" rx="3" fill="#e2e8f0" />
        <rect x="16" y="124" width="184" height="6" rx="3" fill="#e2e8f0" />

        <rect x="224" y="76" width="80" height="48" rx="6" fill="#f1f5f9" />
        <rect x="224" y="132" width="38" height="36" rx="6" fill="#f1f5f9" />
        <rect x="266" y="132" width="38" height="36" rx="6" fill="#f1f5f9" />

        <rect x="16" y="16" width="288" height="160" fill="url(#shimmer)" style={{ animation: 'shimmer 2.2s linear infinite', backgroundSize: '200% 100%' }} />
      </svg>
    </div>
  )
}

function ThumbWithFallback({ src, color, label }: { src: string; color: string; label: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="relative">
      {!failed ? (
        <div className="h-48 bg-white">
          <img
            src={src}
            alt={label}
            className="h-48 w-full object-cover"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        </div>
      ) : (
        <TemplateThumb color={color} />
      )}
      <div className="pointer-events-none absolute left-2 bottom-2 rounded bg-white/90 px-2 py-1 text-xs font-medium shadow-sm">
        {label}
      </div>
    </div>
  )
}

export default function TemplatesGallery() {
  const [tag, setTag] = useState<string>('All')
  const phrases = ['Modern','Traditional','Creative','Minimal','ATS-friendly']
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 1400)
    return () => clearInterval(id)
  }, [])

  const defaultTemplates: TemplateCard[] = [
    { id: 'double-column', name: 'Double Column', accent: 'border-blue-300', color: '#60a5fa', tags: ['Two Column','Modern'] },
    { id: 'ivy-league', name: 'Ivy League', accent: 'border-slate-300', color: '#94a3b8', tags: ['Traditional','Simple'] },
    { id: 'elegant', name: 'Elegant', accent: 'border-cyan-300', color: '#22d3ee', tags: ['Two Column','Modern'] },
    { id: 'contemporary', name: 'Contemporary', accent: 'border-emerald-300', color: '#10b981', tags: ['Modern','Photo'] },
    { id: 'polished', name: 'Polished', accent: 'border-rose-300', color: '#fb7185', tags: ['Modern'] },
    { id: 'modern', name: 'Modern', accent: 'border-amber-300', color: '#f59e0b', tags: ['Modern'] },
    { id: 'creative', name: 'Creative', accent: 'border-violet-300', color: '#a78bfa', tags: ['Creative'] },
    { id: 'timeline', name: 'Timeline', accent: 'border-blue-300', color: '#60a5fa', tags: ['Timeline','Traditional'] },
    { id: 'stylish', name: 'Stylish', accent: 'border-indigo-300', color: '#818cf8', tags: ['Modern'] },
    { id: 'single-column', name: 'Single Column', accent: 'border-emerald-300', color: '#34d399', tags: ['Simple','ATS','One Page'] },
    { id: 'elegant-logos', name: 'Elegant with Logos', accent: 'border-cyan-300', color: '#22d3ee', tags: ['Two Column','Logos'] },
    { id: 'double-column-logos', name: 'Double Column with Logos', accent: 'border-blue-300', color: '#60a5fa', tags: ['Two Column','Logos'] },
    { id: 'compact', name: 'Compact', accent: 'border-blue-300', color: '#60a5fa', tags: ['One Page','ATS'] },
    { id: 'modern-logos', name: 'Modern with Logos', accent: 'border-indigo-300', color: '#818cf8', tags: ['Modern','Logos'] },
    { id: 'multicolumn', name: 'Multicolumn', accent: 'border-fuchsia-300', color: '#e879f9', tags: ['Modern'] },
    { id: 'timeline-logos', name: 'Timeline with Logos', accent: 'border-emerald-300', color: '#10b981', tags: ['Timeline','Logos'] },
    { id: 'classic', name: 'Classic', accent: 'border-slate-300', color: '#94a3b8', tags: ['Traditional'] },
    { id: 'high-performer', name: 'High Performer', accent: 'border-amber-300', color: '#f59e0b', tags: ['Modern','ATS'] },
    { id: 'minimal', name: 'Minimal', accent: 'border-slate-300', color: '#cbd5e1', tags: ['Minimal','Simple','ATS'] },
  ]

  const [templatesData, setTemplatesData] = useState<TemplateCard[]>(defaultTemplates)

  useEffect(() => {
    fetch('/templates.json')
      .then(r => r.ok ? r.json() : null)
      .then((data: TemplateCard[] | null) => {
        if (!data) return
        const enriched = data.map(t => ({
          accent: 'border-slate-200',
          color: '#94a3b8',
          ...t,
        }))
        setTemplatesData(enriched)
      })
      .catch(() => {})
  }, [])

  const tags = useMemo(() => {
    const s = new Set<string>()
    templatesData.forEach(t => (t.tags || []).forEach(g => s.add(g)))
    return ['All', ...Array.from(s)]
  }, [templatesData])

  const filtered = useMemo(() => tag==='All' ? templatesData : templatesData.filter(t => (t.tags || []).includes(tag)), [tag, templatesData])
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero like Enhancv templates page */}
      <section className="relative overflow-hidden rounded-3xl border bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-emerald-50 to-violet-50" />
        <div className="absolute inset-0 opacity-60" style={{ backgroundSize: '18px 18px', backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)' }} />
        <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">RESUME<br/>TEMPLATES</h1>
            <p className="mt-4 text-gray-700 text-lg max-w-xl">Choose from <span className="font-semibold text-gray-900">{phrases[idx]}</span><span className="ml-1 inline-block text-gray-400" style={{ animation: 'blink 1s steps(1) infinite' }}>|</span> templates and build your resume. Customize in minutes and download as a PDF.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white transition-transform active:scale-95">Import Resume</button>
              <button className="px-4 py-2 rounded border bg-white hover:bg-gray-50 transition-transform active:scale-95">Start With Linkedin</button>
            </div>
            <div className="mt-4 text-gray-600 text-sm inline-flex items-center gap-2">
              <span>Excellent</span>
              <span className="text-amber-500">★★★★★</span>
              <span>4,848 Reviews</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="mx-auto max-w-md animate-[float_6s_ease-in-out_infinite]">
              <div className="relative">
                <TemplateThumb color="#10b981" />
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-emerald-200/40 to-transparent blur-xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
        {tags.map(tg => (
          <button key={tg} onClick={()=>setTag(tg)} className={`px-3 py-1.5 rounded-full border ${tag===tg ? 'bg-gray-900 text-white border-gray-900' : 'bg-white hover:bg-gray-50'}`}>{tg}</button>
        ))}
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(t => (
          <Link key={t.id} to={`/builder/${t.id}`} className={`group block bg-white border ${t.accent} rounded-xl overflow-hidden hover:shadow-lg transition transform hover:-translate-y-0.5`}>
            <div className="relative">
              <ThumbWithFallback src={t.thumbnail || `/templates/${t.id}.png`} color={t.color || '#94a3b8'} label={t.name} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="font-medium">{t.name}</div>
              <div className="text-sm text-emerald-700 group-hover:underline">Use template</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
