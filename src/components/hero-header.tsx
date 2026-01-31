import { motion } from 'framer-motion'
import { serif } from '@/app/fonts'

type HeroHeaderProps = {
  baseUrl: string
}

export const HeroHeader = ({ baseUrl }: HeroHeaderProps) => {
  return (
    <header
      className="relative overflow-hidden bg-black"
      style={{ aspectRatio: '2 / 3' }}
    >
      <motion.img
        src={`${baseUrl}images/here.jpg`}
        alt="장준혁과 현유진의 결혼식 메인 사진"
        width={2560}
        height={3840}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2.5,
          ease: [0.35, 0.1, 0.25, 1],
        }}
      />

      {/* SVG Curtain Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
        viewBox="0 0 100 150"
        preserveAspectRatio="none"
      >
        <motion.path
          fill="#000"
          initial={{
            d: 'M 0,0 L 100,0 L 100,150 C 100,150 75,150 50,150 C 25,150 0,150 0,150 Z',
          }}
          animate={{
            d: 'M 0,-60 L 100,-60 L 100,-60 C 100,-30 75,-30 50,-30 C 25,-30 0,-30 0,-60 Z',
          }}
          transition={{
            duration: 2.0,
            ease: [0.7, 0, 0.3, 1],
          }}
        />
      </svg>

      <div
        className="pointer-events-none absolute top-0 left-0 w-full h-[25%]
          bg-linear-to-b from-black/90 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-full h-[45%]
          bg-linear-to-t from-black/70 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        className="absolute top-0 left-0 px-5 pt-5 text-white z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      >
        <p
          className={`${serif.className} text-[16px] tracking-[0.2em] opacity-90`}
        >
          장준혁
        </p>
      </motion.div>

      <motion.div
        className="absolute top-0 right-0 px-5 pt-5 text-white text-right z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      >
        <p
          className={`${serif.className} text-[16px] tracking-[0.2em] opacity-90`}
        >
          현유진
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 px-5 pb-6 text-white z-10"
        aria-label="결혼식 날짜"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <p className={`leading-none font-bold ${serif.className}`}>
          <span className="text-[96px] block">04</span>
          <span className="text-[96px] -mt-2 relative left-[6px] block">
            18
          </span>
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0 px-5 pb-7 text-white text-right z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <time
          dateTime="2026-04-18T11:00"
          className="block text-[13px] tracking-[0.18em] opacity-90"
        >
          2026. 04. 18
        </time>
        <address className="mt-1 text-[13px] tracking-[0.18em] opacity-80 not-italic">
          아펠가모 선릉 오전 11시
        </address>
        <p className="mt-2 text-[13px] tracking-[0.15em] uppercase opacity-70">
          Our Wedding Day
        </p>
      </motion.div>
    </header>
  )
}
