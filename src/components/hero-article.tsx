import { inter } from '@/app/fonts'
import { Couple } from '@/components/couple'

export const HeroArticle = () => {
  return (
    <article className="py-12 px-10 break-keep text-center">
      <h1 className="mb-4 leading-7">
        We've decided on forever! <br />늘 곁에서 아껴주신 고마운 분들을 기쁜
        마음으로 초대합니다.
      </h1>

      <Couple />

      <section aria-labelledby="wedding-info">
        <h2 id="wedding-info" className="sr-only">
          결혼식 정보
        </h2>
        <div
          className={`my-5 text-center text-base text-foreground/90 font-semibold ${inter.className}`}
        >
          <time dateTime="2026-04-18T11:00" className="block">
            2026년 4월 18일 토요일 AM 11:00
          </time>
          <address className="not-italic mt-1">
            아펠가모 선릉 4층 웨딩홀
          </address>
        </div>
      </section>

      <section aria-labelledby="family-info" className={``}>
        <h2 id="family-info" className="sr-only">
          신랑 신부 소개
        </h2>
        <dl className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-4">
            <dt className="text-sm text-right">
              장을균 · 백다임의{' '}
              <span className="inline-flex justify-end min-w-[28px]">아들</span>
            </dt>
            <dd className="text-sm text-left">
              <span className="text-foreground/60">신랑 </span>
              <span className="font-semibold">장준혁</span>
            </dd>
          </div>
          <div className="flex items-center justify-center gap-4">
            <dt className="text-sm text-right">
              현병윤 · 임현미의{' '}
              <span className="inline-flex justify-end min-w-[28px]">딸</span>
            </dt>
            <dd className="text-sm text-left">
              <span className="text-foreground/60">신부 </span>
              <span className="font-semibold">현유진</span>
            </dd>
          </div>
        </dl>
      </section>
    </article>
  )
}
