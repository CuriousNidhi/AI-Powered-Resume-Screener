import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { TemplateRenderer } from '../components/templates'

const PRESETS: Record<string, { name: string; title: string; summary: string; skills: string; experience: string; theme?: string }> = {
  classic: {
    name: 'John Doe',
    title: 'Software Engineer',
    summary: 'Results-driven engineer with 5+ years building reliable web apps.',
    skills: 'Java, Spring Boot, MongoDB, React',
    experience: 'ACME — Senior Engineer (2022–Now)\n• Led migration to microservices\n• Improved API latency by 35%'
  },
  modern: {
    name: 'Ava Johnson',
    title: 'Frontend Developer',
    summary: 'UI-focused developer specializing in React and modern tooling.',
    skills: 'React, Vite, Tailwind, TypeScript',
    experience: 'PixelCo — Frontend Dev (2021–Now)\n• Built reusable design system\n• Reduced bundle by 40%',
    theme: 'emerald'
  },
  bold: {
    name: 'Liam Smith',
    title: 'Product Designer',
    summary: 'Designer blending usability, systems thinking and delightful visuals.',
    skills: 'Figma, Prototyping, UX Writing',
    experience: 'Craft — Product Designer (2020–Now)\n• Led design for onboarding\n• Increased activation by 18%',
    theme: 'violet'
  },
  jack: {
    name: 'Jack Carter',
    title: 'Data Analyst',
    summary: 'Analyst turning data into actionable insights for growth teams.',
    skills: 'SQL, Python, Power BI, A/B Testing',
    experience: 'NorthWind — Data Analyst (2023–Now)\n• Built revenue dashboard\n• Automated ETL saving 8h/week',
    theme: 'blue'
  },
  sophia: {
    name: 'Sophia Patel',
    title: 'Marketing Manager',
    summary: 'Performance marketer focused on ROI and lifecycle programs.',
    skills: 'Content, SEO, Email, Google Ads',
    experience: 'Bright — Marketing (2021–Now)\n• +30% MQLs via nurture series\n• Cut CAC by 20%',
    theme: 'rose'
  },
  daniel: {
    name: 'Daniel Kim',
    title: 'DevOps Engineer',
    summary: 'Builds robust delivery pipelines and reliable cloud infrastructure.',
    skills: 'AWS, Docker, Kubernetes, Terraform',
    experience: 'ShipIt — DevOps (2020–Now)\n• CI/CD from 60m to 8m\n• 99.95% uptime',
    theme: 'amber'
  }
}

export default function ResumeBuilder() {
  const { templateId } = useParams()
  const preset = PRESETS[templateId || 'classic'] || PRESETS.classic
  const [name, setName] = useState(preset.name)
  const [title, setTitle] = useState(preset.title)
  const [summary, setSummary] = useState(preset.summary)
  const [skills, setSkills] = useState(preset.skills)
  const [experience, setExperience] = useState(preset.experience)

  useEffect(() => {
    const p = PRESETS[templateId || 'classic'] || PRESETS.classic
    setName(p.name); setTitle(p.title); setSummary(p.summary); setSkills(p.skills); setExperience(p.experience)
  }, [templateId])

  const theme = preset.theme

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Resume Builder — {templateId}</h1>
        <div>
          <label className="block text-sm text-gray-600">Full name</label>
          <input className="mt-1 w-full border rounded px-3 py-2" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Headline</label>
          <input className="mt-1 w-full border rounded px-3 py-2" value={title} onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Summary</label>
          <textarea className="mt-1 w-full border rounded px-3 py-2 h-24" value={summary} onChange={(e)=>setSummary(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Skills (comma separated)</label>
          <input className="mt-1 w-full border rounded px-3 py-2" value={skills} onChange={(e)=>setSkills(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Experience</label>
          <textarea className="mt-1 w-full border rounded px-3 py-2 h-32" value={experience} onChange={(e)=>setExperience(e.target.value)} />
        </div>
      </div>
      <div className="bg-white border rounded-xl p-6">
        <TemplateRenderer
          templateId={templateId || 'classic'}
          name={name}
          title={title}
          summary={summary}
          skills={skills.split(',').map((s) => s.trim()).filter(Boolean)}
          experience={experience}
          theme={theme}
        />
      </div>
    </div>
  )
}
