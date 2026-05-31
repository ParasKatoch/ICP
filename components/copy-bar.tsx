"use client"

import { useState } from "react"
import { Check, Copy, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function CopyBar({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Fallback for environments without the async clipboard API.
      const el = document.createElement("textarea")
      el.value = text
      el.style.position = "fixed"
      el.style.opacity = "0"
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="w-full">
      <div className="group flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-sm transition-shadow hover:shadow-md focus-within:shadow-md">
        <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <input
          type="text"
          value={text}
          readOnly
          aria-label="Address to copy"
          className="w-full select-all cursor-default truncate bg-transparent font-mono text-sm text-foreground outline-none sm:text-base"
        />
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy text"}
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full transition-colors",
            copied
              ? "bg-brand text-brand-foreground"
              : "text-brand hover:bg-brand/10",
          )}
        >
          {copied ? (
            <Check className="size-5" aria-hidden="true" />
          ) : (
            <Copy className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>
      <p
        className={cn(
          "mt-2 h-4 text-center text-xs font-medium text-brand transition-opacity",
          copied ? "opacity-100" : "opacity-0",
        )}
        aria-live="polite"
      >
        Copied to clipboard
      </p>
    </div>
  )
}
