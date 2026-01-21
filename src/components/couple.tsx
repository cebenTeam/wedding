'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { iconSprites } from '@/components/icon-sprites'

const random = (min: number, max: number) => Math.random() * (max - min) + min

const sample = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

const generateParticles = (
  num: number,
  size: number,
  lastEdge: string | null,
) => {
  const particles = []

  // 랜덤한 테두리 위치 선택 (이전과 다른 위치, bottom 제외)
  const edges = ['top', 'left', 'right'] as const
  let availableEdges = edges.filter((e) => e !== lastEdge)
  const edge = availableEdges[Math.floor(Math.random() * availableEdges.length)]

  let startX = 140
  let startY = 140

  switch (edge) {
    case 'top':
      startX = random(20, 260)
      startY = random(0, 30)
      break
    case 'left':
      startX = random(0, 30)
      startY = random(20, 260)
      break
    case 'right':
      startX = random(250, 280)
      startY = random(20, 260)
      break
  }

  for (let i of range(1, num)) {
    const sprite = sample(iconSprites)

    const angleMin = (i / num) * 360
    const angleMax = ((i + 1) / num) * 360
    const angle = random(angleMin, angleMax)
    const angleInRads = (angle * Math.PI) / 180

    let distance = random(size * 0.8, size * 1.6)

    const rotation = random(0, 360)

    const toX = Math.cos(angleInRads) * distance
    const toY = Math.sin(angleInRads) * distance

    particles.push({
      id: `${Date.now()}-${i}-${Math.random()}`,
      sprite,
      toX,
      toY,
      rotation,
      startX,
      startY,
    })
  }

  return { particles, edge }
}

export const Couple = () => {
  const [particles, setParticles] = useState<any[]>([])
  const lastEdgeRef = useRef<string | null>(null)
  const baseUrl = import.meta.env.BASE_URL

  useEffect(() => {
    const interval = setInterval(() => {
      const { particles: newParticles, edge } = generateParticles(
        6,
        60,
        lastEdgeRef.current,
      )
      setParticles((prev) => [...prev, ...newParticles])

      lastEdgeRef.current = edge

      setTimeout(() => {
        setParticles((current) => current.slice(6))
      }, 1500)
    }, 1400)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative mx-auto w-[280px]">
      <div className="absolute inset-0 z-20 pointer-events-none">
        <AnimatePresence>
          {particles.map((particle) => {
            return (
              <motion.div
                key={particle.id}
                initial={{
                  x: particle.startX,
                  y: particle.startY,
                  scale: 0.3,
                  opacity: 1,
                  rotate: 0,
                }}
                animate={{
                  x: particle.startX + particle.toX,
                  y: particle.startY + particle.toY,
                  scale: [0.3, 1.2, 0.8],
                  opacity: [1, 1, 0],
                  rotate: particle.rotation,
                }}
                transition={{
                  duration: 1,
                  ease: [0.2, 0.8, 0.3, 1],
                  times: [0, 0.5, 1],
                }}
                className="absolute"
              >
                <img
                  src={particle.sprite.src}
                  width={particle.sprite.width / 2}
                  height={particle.sprite.height / 2}
                  alt=""
                  className="block"
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <img
        src={`${baseUrl}images/couple.png`}
        alt=""
        className="relative z-10 pointer-events-none"
      />
    </div>
  )
}
