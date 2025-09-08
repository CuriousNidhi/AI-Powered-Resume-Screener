import type { TemplateProps } from './types'

export default function ClassicTemplate({ name, title, summary, skills, experience, theme }: TemplateProps) {
  const borderClass = theme ? `border-${theme}-200` : 'border-slate-200'
  const headingClass = theme ? `text-${theme}-800` : 'text-slate-800'
  return (
    <div className="max-w-xl mx-auto">
      <div className="text-3xl font-extrabold tracking-tight">{name}</div>
      <div className="text-gray-600">{title}</div>
      <hr className={`my-4 ${borderClass}`} />

      <div className={`font-semibold ${headingClass}`}>Summary</div>
      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{summary}</p>

      <div className={`mt-5 font-semibold ${headingClass}`}>Skills</div>
      <ul className="text-gray-700 list-disc pl-6">
        {skills.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <div className={`mt-5 font-semibold ${headingClass}`}>Experience</div>
      <pre className="text-gray-700 whitespace-pre-wrap leading-relaxed">{experience}</pre>
    </div>
  )
}


