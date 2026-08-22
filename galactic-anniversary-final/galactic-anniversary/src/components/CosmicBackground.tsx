import React, { useEffect, useRef } from 'react'

interface Star {
  x: number; y: number; r: number
  baseOpacity: number; opacity: number
  speed: number; phase: number
  color: string
}

const STAR_COLORS = [
  'rgba(255,255,255,', 'rgba(196,181,253,', 'rgba(129,140,248,',
  'rgba(240,244,255,', 'rgba(255,255,255,',
]

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const starsRef = useRef<Star[]>([])
  const shootRef = useRef({ timer: 4000, x: 0, y: 0, dx: 0, dy: 0, life: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const buildStars = (w: number, h: number): Star[] => {
      const count = Math.min(Math.floor((w * h) / 5500), 300)
      return Array.from({ length: count }, () => {
        const bright = Math.random() < 0.12
        const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
        return {
          x: Math.random() * w, y: Math.random() * h,
          r: bright ? Math.random() * 1.8 + 0.8 : Math.random() * 0.8 + 0.2,
          baseOpacity: bright ? Math.random() * 0.5 + 0.5 : Math.random() * 0.35 + 0.1,
          opacity: 0, speed: Math.random() * 0.005 + 0.002,
          phase: Math.random() * Math.PI * 2, color,
        }
      })
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      starsRef.current = buildStars(canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = (t: number) => {
      const time = t * 0.001
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Stars
      starsRef.current.forEach(s => {
        s.opacity = s.baseOpacity * (0.4 + 0.6 * Math.abs(Math.sin(time * s.speed + s.phase)))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `${s.color}${s.opacity})`
        ctx.fill()
      })

      // Shooting star
      const sh = shootRef.current
      sh.timer -= 16
      if (sh.timer <= 0) {
        sh.timer = 9000 + Math.random() * 12000
        sh.x = Math.random() * canvas.width * 0.7
        sh.y = Math.random() * canvas.height * 0.35
        const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4
        const spd = 7 + Math.random() * 5
        sh.dx = Math.cos(angle) * spd
        sh.dy = Math.sin(angle) * spd
        sh.life = 55 + Math.random() * 35
      }
      if (sh.life > 0) {
        const alpha = (sh.life / 90) * 0.85
        const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.dx * 9, sh.y - sh.dy * 9)
        grad.addColorStop(0, `rgba(255,255,255,${alpha})`)
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.save()
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(sh.x, sh.y)
        ctx.lineTo(sh.x - sh.dx * 9, sh.y - sh.dy * 9)
        ctx.stroke()
        ctx.restore()
        sh.x += sh.dx; sh.y += sh.dy; sh.life--
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  )
}
