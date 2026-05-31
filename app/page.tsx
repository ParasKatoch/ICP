import { getSiteConfig } from "@/lib/site-config"
import { CountdownTimer } from "@/components/countdown-timer"
import { CopyBar } from "@/components/copy-bar"
import { SocialLinks } from "@/components/social-links"
import { AdSlot } from "@/components/ad-slot"

export default function Page() {
  const config = getSiteConfig()

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background">
      {/* Top: countdown timer */}
      <header className="flex shrink-0 items-center justify-center pt-8 sm:pt-10">
        <CountdownTimer target={config.countdownTarget} />
      </header>

      {/* Center: wordmark + copy bar + socials */}
      <section className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="flex w-full max-w-xl flex-col items-center gap-7">
          <Wordmark name={config.brandName} />
          <CopyBar text={config.copyText} />
          <SocialLinks socials={config.socials} />
        </div>
      </section>

      {/* Bottom: AdSense slot */}
      <footer className="flex shrink-0 flex-col items-center gap-3 px-6 pb-6">
        <AdSlot client={config.adsense.client} slot={config.adsense.slot} />
      </footer>
    </main>
  )
}

function Wordmark({ name }: { name: string }) {
  // Google-style multicolor wordmark, themed to the crypto palette.
  const palette = [
    "text-brand",
    "text-foreground",
    "text-brand",
    "text-foreground",
    "text-brand",
    "text-foreground",
    "text-brand",
    "text-foreground",
  ]
  const letters = name.split("")

  return (
    <h1
      className="select-none text-balance text-center text-5xl font-semibold tracking-tighter sm:text-6xl"
      aria-label={name}
    >
      {letters.map((letter, i) => (
        <span key={i} className={palette[i % palette.length]} aria-hidden="true">
          {letter}
        </span>
      ))}
    </h1>
  )
}
