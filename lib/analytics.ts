import { track } from "@vercel/analytics"

type AnalyticsValue = string | number | boolean | null | undefined

export function trackEvent(name: string, properties?: Record<string, AnalyticsValue>) {
  track(name, properties)
}
