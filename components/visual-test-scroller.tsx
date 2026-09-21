"use client";

import { useEffect } from "react";

export function VisualTestScroller() {
  useEffect(() => {
    const target = new URLSearchParams(window.location.search).get("capture");
    if (!target) return;
    document.documentElement.style.scrollBehavior = "auto";
    requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "instant" });
    });
  }, []);
  return null;
}
