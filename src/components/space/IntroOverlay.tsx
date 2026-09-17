"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpaceAtlas } from "@/lib/space/store";

/**
 * Intro overlay — shown once on first load until dismissed.
 *
 * Explains the interaction model in a few words so users immediately
 * understand: click planets to learn, drag to orbit, scroll to zoom.
 */

export function IntroOverlay() {
  const introDismissed = useSpaceAtlas((s) => s.introDismissed);
  const dismissIntro = useSpaceAtlas((s) => s.dismissIntro);
  const selectBody = useSpaceAtlas((s) => s.selectBody);
  const [show, setShow] = useState(false);

  // Mount the overlay only on the client to avoid hydration mismatch
  // with the persisted store state.
  useEffect(() => {
    if (!introDismissed) {
      const t = setTimeout(() => setShow(true), 400);
      return () => clearTimeout(t);
    }
  }, [introDismissed]);

  return (
    <AnimatePresence>
      {show && !introDismissed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md"
          onClick={dismissIntro}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative max-w-md mx-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/15 p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600">
                <Rocket className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Welcome to Cosmic Atlas</h2>
                <p className="text-[11px] text-slate-400">An interactive 3D space explorer</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Explore the Solar System and beyond. Click any celestial body to
              dive into its scientific profile — physical data, internal structure,
              exploration missions, and references back to NASA, ESA, and JPL.
            </p>

            <div className="space-y-2 mb-5">
              <Hint label="Click any body" desc="Open its full scientific profile" />
              <Hint label="Drag to orbit" desc="Rotate the 3D view" />
              <Hint label="Scroll to zoom" desc="Move closer or farther" />
              <Hint label="Use the sidebar" desc="Jump to any object instantly" />
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white"
                onClick={() => {
                  dismissIntro();
                  selectBody("earth");
                }}
              >
                <Sparkles className="h-4 w-4 mr-1.5" />
                Start with Earth
              </Button>
              <Button
                variant="outline"
                className="border-white/15 text-slate-200 hover:bg-white/10 hover:text-white"
                onClick={dismissIntro}
              >
                Explore
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <p className="mt-4 text-[10px] text-slate-500 text-center">
              Scientific data sourced from NASA · ESA · JPL · IAU · Hubble · JWST
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hint({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5">
      <span className="text-cyan-400 text-xs">▸</span>
      <span className="text-sm font-medium text-white">{label}</span>
      <span className="text-xs text-slate-400 ml-auto">{desc}</span>
    </div>
  );
}
