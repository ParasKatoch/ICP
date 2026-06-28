/**
 * Site configuration.
 *
 * Everything here is read from environment variables ("the backend") so it can
 * be changed without touching the UI. Set these in your Vercel project settings
 * (Project Settings -> Environment Variables) or in a local .env file.
 *
 * All fall back to sensible defaults so the page renders out of the box.
 */

export type SiteConfig = {
  /** Brand name shown as the Google-style wordmark. */
  brandName: string
  /** ISO date string the countdown ticks down to. e.g. "2026-12-31T23:59:59Z" */
  countdownTarget: string
  /** Read-only text shown inside the search bar (e.g. a token contract address). */
  copyText: string
  /** Social links. Leave blank to hide an icon. */
  socials: {
    x: string
    discord: string
    telegram: string
  }
  /**
   * Google AdSense. Provide your publisher client id (ca-pub-XXXXXXXX) and a
   * slot id to render a real ad unit. Leave blank to show a placeholder.
   */
  adsense: {
    client: string
    slot: string
  }
}

function env(key: string, fallback: string): string {
  const v = process.env[key]
  return v && v.trim().length > 0 ? v.trim() : fallback
}

export function getSiteConfig(): SiteConfig {
  return {
    brandName: env("NEXT_PUBLIC_BRAND_NAME", "BeThePUMP"),
    // Uses NEXT_PUBLIC_COUNTDOWN_TARGET if set, otherwise the default date below.
    countdownTarget: env(
      "NEXT_PUBLIC_COUNTDOWN_TARGET",
      "2026-06-28T16:00:00Z",
    ),
    copyText: env(
      "NEXT_PUBLIC_COPY_TEXT",
      "8opvqaWysX1oYbXuTL8PHaoaTiXD69VFYAX4smPebonk",
    ),
    socials: {
      x: env("NEXT_PUBLIC_SOCIAL_X", "https://x.com/bethepump"),
      discord: env("NEXT_PUBLIC_SOCIAL_DISCORD", "https://discord.gg/6RNwx3Vgsp"),
      telegram: env("NEXT_PUBLIC_SOCIAL_TELEGRAM", "https://t.me/katochxcryptotg"),
    },
    adsense: {
     client: env("NEXT_PUBLIC_ADSENSE_CLIENT", "ca-pub-3175478766639012"),
      slot: env("NEXT_PUBLIC_ADSENSE_SLOT", ""),
   },
  }
}
