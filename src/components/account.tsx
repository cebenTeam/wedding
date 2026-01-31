'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { inter, serif } from '@/app/fonts'
import { useState, useRef, useEffect } from 'react'

const Account = () => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add('visible'),
      { threshold: 0.2, rootMargin: '0px 0px -80px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="fade-in-up px-8 py-10 pb-40 text-center">
      <h3 className={`text-[17px] font-medium mb-4 ${serif.className}`}>
        마음 전하실 곳
      </h3>

      <p className="text-sm text-foreground/70 leading-relaxed mb-10">
        참석이 어려우신 분들을 위해
        <br />
        마음을 전하실 수 있는 계좌를 안내드립니다.
        <br />
        <span className="text-foreground/50">
          마음을 전해주시는 모든 분들께 <br /> 진심으로 감사드립니다.
        </span>
      </p>

      <Accordion
        type="single"
        collapsible
        className={`w-full text-sm ${inter.className}`}
      >
        {/* 신랑 측 */}
        <AccordionItem value="groom">
          <AccordionTrigger className="py-4 text-foreground/80">
            신랑 측
          </AccordionTrigger>
          <AccordionContent className="pb-6 space-y-3">
            <AccountCard
              role="신랑"
              name="장준혁"
              bank="기업은행"
              account="56802768501018"
            />
            <AccountCard
              role="혼주 · 어머니"
              name="백다임"
              bank="국민은행"
              account="088210586485"
            />
          </AccordionContent>
        </AccordionItem>

        {/* 신부 측 */}
        <AccordionItem value="bride">
          <AccordionTrigger className="py-4 text-foreground/80">
            신부 측
          </AccordionTrigger>
          <AccordionContent className="pb-6 space-y-3">
            <AccountCard
              role="신부"
              name="현유진"
              bank="신한은행"
              account="110407217708"
            />
            <AccountCard
              role="혼주 · 아버지"
              name="현병윤"
              bank="카카오뱅크"
              account="3333144645897"
            />
            <AccountCard
              role="혼주 · 어머니"
              name="임현미"
              bank="카카오뱅크"
              account="3333108002017"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

const AccountCard = ({
  role,
  name,
  bank,
  account,
}: {
  role: string
  name: string
  bank: string
  account: string
}) => {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${bank} ${account}`)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      // fallback: textarea를 이용한 복사
      const textarea = document.createElement('textarea')
      textarea.value = `${bank} ${account}`
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()

      try {
        document.execCommand('copy')
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      } catch (e) {
        alert('복사에 실패했습니다')
      } finally {
        document.body.removeChild(textarea)
      }
    }
  }

  return (
    <div className="p-4 rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="flex-1 text-left">
          {/* 역할 + 이름 */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">{role}</span>
            <span className="font-semibold">{name}</span>
          </div>

          {/* 은행 */}
          <div className="text-sm text-muted-foreground mb-1">{bank}</div>

          {/* 계좌번호 */}
          <div className="font-mono text-sm">{account}</div>
        </div>

        {/* 복사 버튼 */}
        <button
          type="button"
          onClick={copy}
          className="ml-4 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-dotted"
          aria-label={`${role} ${name} 계좌번호 복사`}
        >
          {isCopied ? '복사됨' : '복사'}
        </button>
      </div>
    </div>
  )
}

export default Account
