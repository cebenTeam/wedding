import { Calendar0418 } from '@/components/calendar0418'
import { Map } from '@/components/map'
import Account from '@/components/account'
import { HeroHeader } from '@/components/hero-header'
import { HeroArticle } from '@/components/hero-article'

const Page = () => {
  const baseUrl = import.meta.env.BASE_URL

  return (
    <main className="max-w-[420px] mx-auto overflow-x-hidden">
      <HeroHeader baseUrl={baseUrl} />

      <HeroArticle />

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

      <div className="flex items-center justify-center pt-10 gap-2">
        <span className="h-px w-6 bg-foreground/30" />
        <span className="text-[10px] text-foreground/40">✦</span>
        <span className="h-px w-6 bg-foreground/30" />
      </div>

      <section aria-labelledby="account-section">
        <h2 id="account-section" className="sr-only">
          마음 전하실 곳
        </h2>
        <Account />
      </section>
    </main>
  )
}

export default Page
