"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the cookie consent component
const CookieConsent = dynamic(() => import("./CookieConsent"), {
  ssr: false,
});

export default function CookieConsentWrapper() {
  const [mounted, setMounted] = useState(false);

  // Only show the component after hydration to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <CookieConsent />;
} 