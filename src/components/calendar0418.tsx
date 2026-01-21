'use client'

import { inter } from '@/app/fonts'

export const Calendar0418 = () => {
  return (
    <div
      className="w-full rounded-lg bg-background max-w-[420px] mx-auto relative overflow-hidden select-none"
      role="group"
      aria-label="2026년 4월 달력"
    >
      <div
        className={`mb-5 text-center text-base text-foreground/90 font-semibold ${inter.className}`}
      >
        <span aria-hidden="true">2026년 4월</span>
      </div>

      <div
        className="grid grid-cols-7 text-center text-[11px] text-muted-foreground/60 mb-3 font-normal"
        role="row"
        aria-hidden="true"
      >
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div
        className={`grid grid-cols-7 gap-y-1.5 text-center ${inter.className} relative`}
        role="grid"
        aria-label="날짜"
      >
        <div aria-hidden="true" />
        <div aria-hidden="true" />
        <div aria-hidden="true" />

        {Array.from({ length: 30 }).map((_, i) => {
          const day = i + 1
          const isTarget = day === 18

          return (
            <div
              key={day}
              className="flex flex-col aspect-square items-center justify-center relative"
              role="gridcell"
              aria-label={`4월 ${day}일${isTarget ? ' (결혼식)' : ''}`}
              aria-current={isTarget ? 'date' : undefined}
            >
              <div
                className={[
                  'flex items-center justify-center rounded-full relative z-10',
                  isTarget
                    ? 'relative z-10 bg-foreground text-background font-bold w-9 h-9 text-sm'
                    : 'text-foreground/70 text-[15px]',
                ].join(' ')}
              >
                {day}
              </div>

              {/* {isTarget && (
                <div className="relative top-[4px] text-[10px] h-0]">11am</div>
              )} */}
            </div>
          )
        })}
      </div>
    </div>
  )
}
