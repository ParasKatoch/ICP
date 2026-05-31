"use client"

import { useEffect, useState } from "react"

type Remaining = {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

function getRemaining(target: number): Remaining {
  const diff = Math.max(0, target - Date.now())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: diff === 0,
  }
}

function pad(n: number, size = 2) {
  return String(n).padStart(size, "0")
}

export function CountdownTimer({ target }: { target: string }) {
  const targetMs = new Date(target).getTime()
  const [time, setTime] = useState<Remaining | null>(null)

  useEffect(() => {
    setTime(getRemaining(targetMs))
    const id = setInterval(() => setTime(getRemaining(targetMs)), 1000)
    return () => clearInterval(id)
  }, [targetMs])

  const units: { label: string; value: string }[] = [
    { label: "Days", value: pad(time?.days ?? 0) },
    { label: "Hours", value: pad(time?.hours ?? 0) },
    { label: "Minutes", value: pad(time?.minutes ?? 0) },
    { label: "Seconds", value: pad(time?.seconds ?? 0) },
  ]

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex items-center gap-2 sm:gap-3"
        role="timer"
        aria-label="Countdown timer in days, hours, minutes and seconds"
      >
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center">
              <span className="rounded-xl border border-border bg-card px-2.5 py-2 font-mono text-2xl font-semibold tabular-nums tracking-tight text-foreground shadow-sm sm:px-3.5 sm:text-3xl">
                {unit.value}
              </span>
              <span className="mt-1.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="-mt-4 font-mono text-2xl font-semibold text-brand sm:text-3xl">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
