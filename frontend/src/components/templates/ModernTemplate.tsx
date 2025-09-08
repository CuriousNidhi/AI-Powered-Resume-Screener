import type { TemplateProps } from './types'

export default function ModernTemplate({ name, title, summary, skills, experience, theme }: TemplateProps) {
  const accent = theme || 'emerald'
  return (
    <div className="max-w-xl mx-auto">
      <div className="grid grid-cols-[6px_1fr] gap-4 items-start">
        <div className={`h-full rounded bg-${accent}-500`} />
        <div>
          <div className="text-4xl font-black tracking-tight">{name}</div>
          <div className="text-gray-500">{title}</div>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className={`text-sm font-semibold text-${accent}-800`}>Summary</div>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mt-1">{summary}</p>

          <div className={`mt-6 text-sm font-semibold text-${accent}-800`}>Experience</div>
          <pre className="text-gray-700 whitespace-pre-wrap leading-relaxed mt-1">{experience}</pre>
        </div>
        <div>
          <div className={`text-sm font-semibold text-${accent}-800`}>Skills</div>
          <div className="mt-1 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className={`inline-flex items-center rounded-full border border-${accent}-200 bg-${accent}-50 px-2.5 py-1 text-xs text-${accent}-800`}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


