import type { TemplateProps } from './types'

export default function MinimalTemplate({ name, title, summary, skills, experience }: TemplateProps) {
  return (
    <div className="max-w-xl mx-auto">
      <div className="text-2xl font-bold">{name}</div>
      <div className="text-gray-500">{title}</div>
      <div className="mt-4 text-sm uppercase tracking-wide text-gray-500">Summary</div>
      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{summary}</p>
      <div className="mt-5 text-sm uppercase tracking-wide text-gray-500">Skills</div>
      <div className="mt-1 flex flex-wrap gap-2">
        {skills.map((s) => (
          <span key={s} className="inline-flex items-center rounded border px-2.5 py-0.5 text-xs text-gray-700">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-5 text-sm uppercase tracking-wide text-gray-500">Experience</div>
      <pre className="text-gray-700 whitespace-pre-wrap leading-relaxed">{experience}</pre>
    </div>
  )
}


