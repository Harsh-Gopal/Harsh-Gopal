"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";
import { DinoAudio } from "@/components/dino-audio";

export default function DinoRun() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    let runnerInstance: any;

    if (typeof window !== "undefined" && containerRef.current && !mounted) {
      import("@/lib/games/dino-engine.js").then((engine) => {
        // Initialize the Chromium Runner
        // It binds to window and uses the provided container selector
        runnerInstance = new engine.Runner(".interstitial-wrapper", {});
        setMounted(true);
      });
    }

    return () => {
      // The engine modifies global listeners (keydown, keyup). 
      // Hard navigation handles cleanup, but if we wanted to be perfectly clean in React 
      // we'd need to manually remove event listeners from window.
      // For now, this is stable for a dedicated game route.
    };
  }, [mounted]);

  return (
    <div className="min-h-screen bg-background text-foreground font-mono flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl p-6 rounded relative overflow-hidden border border-neutral-800 bg-neutral-900/50">
        <header className="flex items-center justify-between mb-8 border-b border-neutral-800 pb-4">
          <Link href="/arcade" className="text-neutral-500 hover:text-accent transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-accent" />
            <h1 className="font-bold tracking-widest text-neutral-200">T-REX RUNNER</h1>
          </div>
          <div className="w-5" />
        </header>

        {/* The DOM structure required by t-rex-runner/index.js */}
        <div 
          className="relative w-full overflow-hidden bg-neutral-200 rounded flex items-center justify-center min-h-[200px]"
        >
          <div id="main-frame-error" className="interstitial-wrapper w-full h-full relative" ref={containerRef}>
            <div id="main-content">
               {/* T-Rex runner appends canvas here or near here */}
               <div className="icon icon-offline" style={{ display: 'none' }}></div>
            </div>
            
            <div id="offline-resources" style={{ display: 'none' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img id="offline-resources-1x" src="/assets/default_100_percent/100-offline-sprite.png" alt="offline resources 1x" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img id="offline-resources-2x" src="/assets/default_200_percent/200-offline-sprite.png" alt="offline resources 2x" />
              <DinoAudio />
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center text-xs text-neutral-500">
           <p>Press <span className="text-accent font-bold">SPACE</span> or <span className="text-accent font-bold">&uarr;</span> to jump. <span className="text-accent font-bold">&darr;</span> to duck.</p>
        </div>
      </div>
    </div>
  );
}
