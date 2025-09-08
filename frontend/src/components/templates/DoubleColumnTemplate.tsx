import type { TemplateProps } from './types'

export default function DoubleColumnTemplate({ name, title, summary, skills, experience, theme }: TemplateProps) {
  const accent = theme || 'blue'
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-3xl font-extrabold tracking-tight">{name}</div>
      <div className="text-gray-500">{title}</div>
      <div className="mt-4 grid md:grid-cols-[1fr_2fr] gap-8">
        <aside>
          <div className={`text-sm font-semibold text-${accent}-800`}>Summary</div>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mt-1">{summary}</p>

          <div className={`mt-6 text-sm font-semibold text-${accent}-800`}>Skills</div>
          <ul className="text-gray-700 list-disc pl-6 mt-1">
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </aside>
        <main>
          <div className={`text-sm font-semibold text-${accent}-800`}>Experience</div>
          <pre className="text-gray-700 whitespace-pre-wrap leading-relaxed mt-1">{experience}</pre>
        </main>
      </div>
    </div>
  )
}


