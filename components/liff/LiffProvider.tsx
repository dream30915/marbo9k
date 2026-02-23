"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";
import { Toaster } from "sonner";

const LIFF_ID = "2006859368-rG80dD6y"; // Updated with your actual LIFF ID

export function LiffProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!LIFF_ID) {
      console.error("LIFF ID is missing!");
      setReady(true);
      return;
    }
    liff
      .init({ liffId: LIFF_ID })
      .then(() => {
        console.log("LIFF initialized");
        setReady(true);
      })
      .catch((err) => {
        console.error("LIFF init failed", err);
        setReady(true);
      });
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
