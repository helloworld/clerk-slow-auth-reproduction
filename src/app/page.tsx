"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface TimingResult {
  token: string | null;
  duration: number;
  error?: string;
}

export default function Home() {
  const { getToken } = useAuth();
  const [result, setResult] = useState<TimingResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function measureTokenTiming() {
      try {
        const start = performance.now();
        const token = await getToken();
        const end = performance.now();
        
        setResult({
          token,
          duration: Math.round(end - start)
        });
      } catch (error) {
        setResult({
          token: null,
          duration: 0,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      } finally {
        setLoading(false);
      }
    }
    
    measureTokenTiming();
  }, [getToken]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Clerk Auth Timing Test
        </h1>
        
        {loading ? (
          <div className="text-gray-600">Measuring authentication timing...</div>
        ) : result?.error ? (
          <div className="text-red-600">
            <p className="font-semibold">Error:</p>
            <p>{result.error}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-600 mb-1">Token (first 10 chars):</p>
              <p className="font-mono text-sm break-all">
                {result?.token?.substring(0, 10) || 'No token'}
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm text-blue-600 mb-1">Authentication Time:</p>
              <p className="text-2xl font-bold text-blue-800">
                {result?.duration}ms
              </p>
            </div>
            
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Test Again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
