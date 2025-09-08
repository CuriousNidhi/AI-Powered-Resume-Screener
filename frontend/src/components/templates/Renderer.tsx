import ClassicTemplate from './ClassicTemplate'
import ModernTemplate from './ModernTemplate'
import DoubleColumnTemplate from './DoubleColumnTemplate'
import MinimalTemplate from './MinimalTemplate'
import type { TemplateProps } from './types'

const classicSet = new Set(['classic', 'ivy-league'])
const modernSet = new Set(['modern', 'polished', 'stylish', 'high-performer', 'modern-logos', 'elegant', 'elegant-logos'])
const doubleSet = new Set(['double-column', 'double-column-logos', 'timeline', 'timeline-logos', 'multicolumn'])
const minimalSet = new Set(['minimal', 'single-column', 'compact'])

function kindFromId(id: string): 'classic' | 'modern' | 'double' | 'minimal' {
  if (doubleSet.has(id)) return 'double'
  if (modernSet.has(id)) return 'modern'
  if (minimalSet.has(id)) return 'minimal'
  return 'classic'
}

export default function TemplateRenderer({ templateId, ...props }: TemplateProps & { templateId: string }) {
  const kind = kindFromId(templateId)
  if (kind === 'double') return <DoubleColumnTemplate {...props} />
  if (kind === 'modern') return <ModernTemplate {...props} />
  if (kind === 'minimal') return <MinimalTemplate {...props} />
  return <ClassicTemplate {...props} />
}

export { kindFromId }


