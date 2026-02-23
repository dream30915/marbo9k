"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";
import { Toaster } from "sonner";

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

  return (
    <>
      {children}
      <Toaster 
        position="top-center" 
        richColors 
        theme="system" 
        toastOptions={{
          className: "font-sans rounded-2xl border-white/20 backdrop-blur-md shadow-2xl",
        }}
      />
    </>
  );
}
