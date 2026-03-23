"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitals() {
  useReportWebVitals((metric) => {
    console.log("[Web Vitals]", metric);

    // Send to analytics endpoint (optional)
    fetch("/api/vitals", {
      method: "POST",
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      }),
      headers: { "Content-Type": "application/json" },
    });
  });

  return null;
}
