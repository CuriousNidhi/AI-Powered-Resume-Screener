import { PropsWithChildren, useMemo, useRef, useState } from 'react'

type HoverTiltProps = PropsWithChildren<{
  maxTiltDeg?: number
  scale?: number
  className?: string
}>

export default function HoverTilt({ children, maxTiltDeg = 8, scale = 1.01, className }: HoverTiltProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [style, setStyle] = useState<React.CSSProperties | undefined>()

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    const rx = dy * maxTiltDeg
    const ry = -dx * maxTiltDeg
    setStyle({
      transform: `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`,
      transition: 'transform 80ms ease-out',
    })
  }

  const onLeave = () => {
    setStyle({ transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)', transition: 'transform 200ms ease-in' })
  }

  const cls = useMemo(() => className || '', [className])

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={style} className={cls}>
      {children}
    </div>
  )
}


