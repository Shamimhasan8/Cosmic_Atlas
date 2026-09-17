"use client";

import { useState, useMemo } from "react";
import { Search, Menu, X, ChevronRight } from "lucide-react";
import { useSpaceAtlas } from "@/lib/space/store";
import { ALL_BODIES, BODY_CATEGORIES } from "@/data/space";
import type { BodyCategory } from "@/lib/space/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Left-hand navigation sidebar.
 *
 *  - Searchable, grouped by category.
 *  - Clicking an item selects the body (which opens the info panel
 *    and flies the camera to the body).
 *  - On mobile, the sidebar slides in as a Sheet; on desktop it's
 *    a permanent left rail.
 */

export function NavigationSidebar() {
  const [query, setQuery] = useState("");
  const selectedBodyId = useSpaceAtlas((s) => s.selectedBodyId);
  const selectBody = useSpaceAtlas((s) => s.selectBody);
  const sidebarOpen = useSpaceAtlas((s) => s.sidebarOpen);
  const setSidebarOpen = useSpaceAtlas((s) => s.setSidebarOpen);

  const filtered = useMemo(() => {
    if (!query.trim()) return ALL_BODIES;
    const q = query.toLowerCase();
    return ALL_BODIES.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q) ||
        b.category.includes(q),
    );
  }, [query]);

  // Group filtered results by category in canonical order
  const grouped = useMemo(() => {
    const out: Record<BodyCategory, typeof ALL_BODIES> = {} as never;
    for (const cat of BODY_CATEGORIES) {
      const items = filtered.filter((b) => b.category === cat.id);
      if (items.length > 0) out[cat.id] = items;
    }
    return out;
  }, [filtered]);

  return (
    <>
      {/* Mobile trigger */}
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden fixed top-3 left-3 z-40 h-10 w-10 bg-slate-900/80 backdrop-blur-md border-white/15 text-white"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open navigation"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fixed on desktop, slide-in on mobile */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[320px] bg-slate-950/95 backdrop-blur-xl border-r border-white/10 flex flex-col transition-transform duration-300",
          "lg:translate-x-0 lg:z-30",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-base font-semibold text-white tracking-tight">
                Cosmic Atlas
              </h1>
              <p className="text-[11px] text-slate-400">3D interactive space explorer</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-slate-400 hover:text-white hover:bg-white/10 h-8 w-8"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bodies, e.g. Saturn, black hole…"
              className="pl-8 h-9 text-sm bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500/40"
            />
          </div>
        </div>

        {/* List */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="px-3 py-3 space-y-5">
            {BODY_CATEGORIES.map((cat) => {
              const items = grouped[cat.id];
              if (!items || items.length === 0) return null;
              return (
                <div key={cat.id} className="space-y-1.5">
                  <div className="px-2 py-1 flex items-center justify-between">
                    <h3 className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                      {cat.label}
                    </h3>
                    <Badge
                      variant="outline"
                      className="text-[9px] py-0 px-1.5 h-4 border-white/15 text-slate-400"
                    >
                      {items.length}
                    </Badge>
                  </div>
                  <div className="space-y-0.5">
                    {items.map((body) => {
                      const isActive = selectedBodyId === body.id;
                      return (
                        <button
                          key={body.id}
                          onClick={() => selectBody(body.id)}
                          className={cn(
                            "group w-full text-left rounded-md px-2.5 py-2 transition-colors flex items-center gap-2.5",
                            isActive
                              ? "bg-white/10 border border-white/20"
                              : "hover:bg-white/5 border border-transparent",
                          )}
                        >
                          <span
                            className="inline-block h-2.5 w-2.5 rounded-full shrink-0 ring-1 ring-white/30"
                            style={{ backgroundColor: body.color }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-sm text-white font-medium truncate">
                              {body.name}
                            </div>
                            <div className="text-[11px] text-slate-400 leading-snug">
                              {body.tagline}
                            </div>
                          </div>
                          <ChevronRight
                            className={cn(
                              "h-3.5 w-3.5 shrink-0 transition-transform",
                              isActive
                                ? "text-cyan-400"
                                : "text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5",
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-12 text-sm text-slate-500">
                No bodies match &ldquo;{query}&rdquo;.
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 text-[10px] text-slate-500">
          Data sourced from NASA, ESA, JPL, IAU &amp; peer-reviewed publications.
        </div>
      </aside>
    </>
  );
}
