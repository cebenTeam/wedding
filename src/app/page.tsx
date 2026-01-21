import { inter, serif } from '@/app/fonts'
import { Calendar0418 } from '@/components/calendar0418'
import { Map } from '@/components/map'
import { Couple } from '@/components/couple'
import Account from '@/components/account'

const Page = () => {
  const baseUrl = import.meta.env.BASE_URL

  return (
    <main className="max-w-[420px] mx-auto overflow-x-hidden">
      <header
        className="relative rounded-b-[28px] overflow-hidden bg-black"
        // 이미지 로딩/유무와 무관하게 헤더 높이를 먼저 확보 (2:3)
        style={{ aspectRatio: '2 / 3' }}
      >
        <img
          src={`${baseUrl}images/here01.jpg`}
          alt="장준혁과 현유진의 결혼식 메인 사진"
          width={2560}
          height={3840}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="pointer-events-none absolute top-0 left-0 w-full h-[25%]
          bg-gradient-to-b from-black/90 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-[45%]
          bg-gradient-to-t from-black/70 to-transparent"
          aria-hidden="true"
        />

        <div className="absolute top-0 left-0 px-5 pt-5 text-white z-10">
          <p
            className={`${serif.className} text-[16px] tracking-[0.2em] opacity-90`}
          >
            장준혁
          </p>
        </div>

        <div className="absolute top-0 right-0 px-5 pt-5 text-white text-right z-10">
          <p
            className={`${serif.className} text-[16px] tracking-[0.2em] opacity-90`}
          >
            현유진
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 px-5 pb-6 text-white z-10"
          aria-label="결혼식 날짜"
        >
          <p className={`leading-none font-bold ${serif.className}`}>
            <span className="text-[96px] block">04</span>
            <span className="text-[96px] -mt-2 relative left-[6px] block">
              18
            </span>
          </p>
        </div>

        <div className="absolute bottom-0 right-0 px-5 pb-7 text-white text-right z-10">
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
        </div>
      </header>

      <article className="py-12 px-10 [word-break:keep-all] text-center">
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

        <section aria-labelledby="family-info my-10" className={``}>
          <h2 id="family-info" className="sr-only">
            신랑 신부 소개
          </h2>
          <dl className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-4">
              <dt className="text-sm text-right">
                장을균 · 백다임의{' '}
                <span className="inline-flex justify-end min-w-[28px]">
                  아들
                </span>
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

      <section
        className="pt-12 pb-12 px-4 max-[420px]:px-4"
        aria-labelledby="calendar-section"
      >
        <h2 id="calendar-section" className="sr-only">
          결혼식 날짜 캘린더
        </h2>
        <Calendar0418 />
      </section>

      <div className="flex items-center justify-center my-5 gap-2">
        <span className="h-px w-6 bg-foreground/30" />
        <span className="text-[10px] text-foreground/40">✦</span>
        <span className="h-px w-6 bg-foreground/30" />
      </div>

      <section className="my-10" aria-labelledby="location-section">
        <h2 id="location-section" className="sr-only">
          오시는 길
        </h2>
        <Map />
      </section>

      <section className="my-10" aria-labelledby="account-section">
        <h2 id="account-section" className="sr-only">
          마음 전하실 곳
        </h2>
        <Account />
      </section>
    </main>
  )
}

export default Page
