type Item = { label: string; ok: boolean }
type Section = { title: string; percent?: number; items: Item[] }

export default function ScoreCard({ score, sections }: { score: number; sections: Section[] }) {
  const issues = sections.reduce((acc, s) => acc + s.items.filter((i) => !i.ok).length, 0)
  const display = Math.max(0, Math.min(100, Math.round(score)))

  return (
    <aside className="bg-white rounded-2xl p-6 shadow-sm w-full">
      <div className="text-gray-800 text-xl font-semibold">Your Score</div>
      <div className="mt-4 flex items-baseline gap-2">
        <div className="text-4xl font-extrabold text-emerald-600">{display}</div>
        <div className="text-2xl text-gray-500">/100</div>
      </div>
      <div className="text-sm text-gray-500 mt-1">{issues} {issues === 1 ? 'Issue' : 'Issues'}</div>

      <div className="mt-6 space-y-6 text-sm">
        {sections.map((s) => (
          <div key={s.title}>
            <div className="flex items-center justify-between">
              <div className="uppercase tracking-wide text-gray-500">{s.title}</div>
              {typeof s.percent === 'number' && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs">{s.percent}%</span>
              )}
            </div>
            <div className="mt-3 space-y-2">
              {s.items.map((i) => (
                <div key={i.label} className="flex items-center gap-2">
                  <span className={`text-lg ${i.ok ? 'text-emerald-600' : 'text-rose-500'}`}>{i.ok ? '✓' : '✕'}</span>
                  <span className="text-gray-700">{i.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}


