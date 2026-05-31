"use client"

import Script from "next/script"
import { useEffect } from "react"

/**
 * Google AdSense slot.
 *
 * Configure NEXT_PUBLIC_ADSENSE_CLIENT (ca-pub-XXXXXXXXXXXXXXXX) and
 * NEXT_PUBLIC_ADSENSE_SLOT in your environment to render a live ad unit.
 * When unset, a labeled placeholder is shown instead.
 */
export function AdSlot({ client, slot }: { client: string; slot: string }) {
  const enabled = client.length > 0 && slot.length > 0

  useEffect(() => {
    if (!enabled) return
    try {
      // @ts-expect-error - adsbygoogle is injected by the AdSense script.
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // no-op
    }
  }, [enabled])

  if (!enabled) {
    return (
      <div className="flex h-[90px] w-full max-w-[728px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 text-xs text-muted-foreground">
        Ad space — set NEXT_PUBLIC_ADSENSE_CLIENT and NEXT_PUBLIC_ADSENSE_SLOT
      </div>
    )
  }

  return (
    <>
      <Script
        id="adsbygoogle-init"
        async
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", maxWidth: 728, height: 90 }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </>
  )
}
