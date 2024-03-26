"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Home() {
  const { getToken } = useAuth();
  const [tokenWithTiming, setTokenWithTiming] = useState<{
    token: string | null;
    start: number;
    end: number;
  } | null>(null);

  useEffect(() => {
    async function getTokenWithTiming() {
      const start = performance.now();
      const token = await getToken();
      const end = performance.now();
      setTokenWithTiming({ token, start, end });
    }
    getTokenWithTiming();
  }, [getToken]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {tokenWithTiming ? (
        <div>
          <p>Token: {tokenWithTiming.token?.substring(0, 10)}</p>
          <p>Timing: {tokenWithTiming.end - tokenWithTiming.start}ms</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
