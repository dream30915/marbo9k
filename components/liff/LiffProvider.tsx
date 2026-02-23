"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";

const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID;

export function LiffProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!LIFF_ID) {
      setReady(true);
      return;
    }
    liff
      .init({ liffId: LIFF_ID })
      .then(() => setReady(true))
      .catch(() => setReady(true));
  }, []);

  return <>{children}</>;
}
