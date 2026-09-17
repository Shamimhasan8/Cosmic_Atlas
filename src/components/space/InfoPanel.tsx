"use client";

import { useState } from "react";
import {
  X, ArrowRight, ExternalLink, Rocket, Lightbulb, BookOpen,
  Layers, Globe2, Thermometer, Gauge, Wind, Atom, CalendarClock, Orbit,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpaceAtlas } from "@/lib/space/store";
import { findBody } from "@/data/space";
import type { ScientificMeasure } from "@/lib/space/types";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

/**
 * Info panel — slides in from the right when a body is selected.
 *
 * Layout:
 *  - Header: name, tagline, category badge, close button
 *  - Quick-stats grid: 4 headline numbers (radius, mass, gravity, distance)
 *  - Tabbed sections: Overview · Physical · Orbital · Composition · Structure · Missions · Facts · References
 *
 * On mobile this renders as a bottom Sheet; on desktop as a fixed
 * right-hand panel.
 */

const PUBLISHER_COLORS: Record<string, string> = {
  NASA: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  ESA: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  JPL: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Hubble: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  JWST: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  IAU: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  NOAA: "bg-teal-500/15 text-teal-300 border-teal-500/30",
  USGS: "bg-lime-500/15 text-lime-300 border-lime-500/30",
  "Peer-reviewed": "bg-rose-500/15 text-rose-300 border-rose-500/30",
};

export function InfoPanel() {
  const selectedBodyId = useSpaceAtlas((s) => s.selectedBodyId);
  const panelOpen = useSpaceAtlas((s) => s.panelOpen);
  const setPanelOpen = useSpaceAtlas((s) => s.setPanelOpen);
  const selectBody = useSpaceAtlas((s) => s.selectBody);
  const [tab, setTab] = useState("overview");

  const body = selectedBodyId ? findBody(selectedBodyId) : undefined;

  return (
    <Sheet
      open={panelOpen && !!body}
      onOpenChange={(open) => {
        // Closing the sheet via the radix close button or backdrop click
        // should fully deselect the body (camera flies back to overview).
        if (!open) selectBody(null);
        else setPanelOpen(true);
      }}
    >
      <SheetContent
        side="right"
        className="w-full sm:max-w-[480px] lg:max-w-[560px] p-0 bg-slate-950/95 backdrop-blur-xl border-l border-white/10 text-slate-100 h-full"
      >
        {body && (
          <>
            <SheetHeader className="px-6 pt-6 pb-4 border-b border-white/10">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant="outline"
                      className={`${PUBLISHER_COLORS["NASA"]} capitalize`}
                    >
                      {body.category.replace("-", " ")}
                    </Badge>
                    <span className="text-xs text-slate-400">
                      Order #{body.order} from the Sun
                    </span>
                  </div>
                  <SheetTitle className="text-3xl font-semibold tracking-tight">
                    {body.name}
                  </SheetTitle>
                  <SheetDescription className="text-sm text-slate-300 leading-relaxed pr-6">
                    {body.tagline}
                  </SheetDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-slate-400 hover:text-white hover:bg-white/10"
                  onClick={() => selectBody(null)}
                  aria-label="Close panel"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick stats — 2 cols on narrow, 4 cols on wider */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                {body.data.physical.slice(0, 2).map((m) => (
                  <StatChip key={m.label} measure={m} icon={<Gauge className="h-3 w-3 shrink-0" />} />
                ))}
                {body.data.orbital.slice(0, 1).map((m) => (
                  <StatChip key={m.label} measure={m} icon={<Orbit className="h-3 w-3 shrink-0" />} />
                ))}
                {body.data.atmosphere.slice(0, 1).map((m) => (
                  <StatChip key={m.label} measure={m} icon={<Thermometer className="h-3 w-3 shrink-0" />} />
                ))}
              </div>
            </SheetHeader>

            <Tabs value={tab} onValueChange={setTab} className="flex-1 flex flex-col min-h-0">
              <div className="px-3 pt-3 pb-2 border-b border-white/10">
                <ScrollArea className="w-full">
                  <TabsList className="bg-white/5 h-auto inline-flex flex-nowrap gap-1 p-1 w-max">
                    <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-white/15 px-3">Overview</TabsTrigger>
                    <TabsTrigger value="physical" className="text-xs data-[state=active]:bg-white/15 px-3">Physical</TabsTrigger>
                    <TabsTrigger value="orbital" className="text-xs data-[state=active]:bg-white/15 px-3">Orbital</TabsTrigger>
                    <TabsTrigger value="composition" className="text-xs data-[state=active]:bg-white/15 px-3">Composition</TabsTrigger>
                    {body.internalStructure && (
                      <TabsTrigger value="structure" className="text-xs data-[state=active]:bg-white/15 px-3">Structure</TabsTrigger>
                    )}
                    <TabsTrigger value="missions" className="text-xs data-[state=active]:bg-white/15 px-3">Missions</TabsTrigger>
                    <TabsTrigger value="facts" className="text-xs data-[state=active]:bg-white/15 px-3">Facts</TabsTrigger>
                    <TabsTrigger value="refs" className="text-xs data-[state=active]:bg-white/15 px-3">References</TabsTrigger>
                  </TabsList>
                </ScrollArea>
              </div>

              <ScrollArea className="flex-1 min-h-0">
                <div className="px-6 py-5 space-y-6">
                  <TabsContent value="overview" className="mt-0 space-y-4">
                    <SectionBlock icon={<BookOpen className="h-4 w-4" />} title="Overview">
                      <p className="text-sm leading-relaxed text-slate-200">{body.overview}</p>
                    </SectionBlock>

                    {body.sections.map((section) => (
                      <SectionBlock
                        key={section.id}
                        icon={<Layers className="h-4 w-4" />}
                        title={section.title}
                      >
                        <div className="space-y-3">
                          {section.body.map((p, i) => (
                            <p key={i} className="text-sm leading-relaxed text-slate-200">
                              {p}
                            </p>
                          ))}
                        </div>
                      </SectionBlock>
                    ))}
                  </TabsContent>

                  <TabsContent value="physical" className="mt-0 space-y-4">
                    <MeasureTable title="Physical Characteristics" measures={body.data.physical} />
                  </TabsContent>

                  <TabsContent value="orbital" className="mt-0 space-y-4">
                    <MeasureTable title="Orbital & Rotational Parameters" measures={body.data.orbital} />
                  </TabsContent>

                  <TabsContent value="composition" className="mt-0 space-y-4">
                    <MeasureTable title="Atmosphere & Climate" measures={body.data.atmosphere} />
                    <MeasureTable title="Composition" measures={body.data.composition} />
                  </TabsContent>

                  {body.internalStructure && (
                    <TabsContent value="structure" className="mt-0 space-y-3">
                      <SectionBlock icon={<Atom className="h-4 w-4" />} title="Internal Structure">
                        <div className="space-y-2.5">
                          {body.internalStructure.map((layer, i) => (
                            <div
                              key={layer.name}
                              className="rounded-lg bg-white/5 border border-white/10 p-3"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <div
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{
                                    background: `hsl(${30 + i * 50}, 70%, 55%)`,
                                  }}
                                />
                                <h5 className="text-sm font-medium text-white">{layer.name}</h5>
                                <span className="text-[11px] text-slate-400 ml-auto">
                                  {layer.thickness}
                                </span>
                              </div>
                              <p className="text-xs text-slate-300">{layer.composition}</p>
                              {layer.temperature && (
                                <p className="text-[11px] text-amber-300/80 mt-1">
                                  🌡 {layer.temperature}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </SectionBlock>
                    </TabsContent>
                  )}

                  <TabsContent value="missions" className="mt-0 space-y-3">
                    <SectionBlock icon={<Rocket className="h-4 w-4" />} title={`Exploration Missions (${body.missions.length})`}>
                      <div className="space-y-2.5">
                        {body.missions.map((mission) => (
                          <div
                            key={mission.name}
                            className="rounded-lg bg-white/5 border border-white/10 p-3"
                          >
                            <div className="flex items-baseline justify-between gap-2 mb-1">
                              <h5 className="text-sm font-medium text-white">{mission.name}</h5>
                              <span className="text-[11px] text-slate-400">{mission.year}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-white/20 text-slate-300 capitalize">
                                {mission.type}
                              </Badge>
                              <span className="text-[11px] text-cyan-300">{mission.agency}</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">{mission.highlight}</p>
                          </div>
                        ))}
                      </div>
                    </SectionBlock>
                  </TabsContent>

                  <TabsContent value="facts" className="mt-0 space-y-3">
                    <SectionBlock icon={<Lightbulb className="h-4 w-4" />} title="Did You Know?">
                      <div className="space-y-2">
                        {body.facts.map((fact, i) => (
                          <div
                            key={i}
                            className="flex gap-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20 p-2.5"
                          >
                            <span className="text-amber-400 text-sm shrink-0">★</span>
                            <div>
                              <p className="text-sm text-slate-200 leading-relaxed">{fact.text}</p>
                              {fact.citation && (
                                <p className="text-[10px] text-amber-300/60 mt-1">— {fact.citation}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </SectionBlock>
                  </TabsContent>

                  <TabsContent value="refs" className="mt-0 space-y-3">
                    <SectionBlock icon={<ExternalLink className="h-4 w-4" />} title="Scientific References">
                      <div className="space-y-2">
                        {body.references.map((ref) => (
                          <a
                            key={ref.url}
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors p-3 group"
                          >
                            <Badge
                              variant="outline"
                              className={`${PUBLISHER_COLORS[ref.publisher]} text-[10px] py-0 px-1.5`}
                            >
                              {ref.publisher}
                            </Badge>
                            <span className="text-xs text-slate-200 group-hover:text-white flex-1">
                              {ref.label}
                            </span>
                            <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-white" />
                          </a>
                        ))}
                      </div>
                    </SectionBlock>
                  </TabsContent>

                  {body.related.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-2">Explore next</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {body.related.map((rid) => {
                          const r = findBody(rid);
                          if (!r) return null;
                          return (
                            <Button
                              key={rid}
                              size="sm"
                              variant="outline"
                              className="h-7 text-[11px] bg-white/5 border-white/15 hover:bg-white/15 hover:text-white"
                              onClick={() => selectBody(rid)}
                            >
                              {r.name}
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </Tabs>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function StatChip({ measure, icon }: { measure: ScientificMeasure; icon: React.ReactNode }) {
  return (
    <div className="rounded-md bg-white/5 border border-white/10 p-2 min-w-0">
      <div className="flex items-start gap-1 text-[10px] uppercase tracking-wider text-slate-400 mb-0.5 min-w-0">
        <span className="shrink-0 mt-0.5">{icon}</span>
        <span className="leading-tight break-words">{measure.label}</span>
      </div>
      <div className="text-xs font-medium text-white truncate">
        {measure.value}
      </div>
      <div className="text-[10px] text-slate-400 truncate">{measure.unit}</div>
    </div>
  );
}

function SectionBlock({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2.5">
      <h3 className="flex items-center gap-2 text-sm font-medium text-white">
        <span className="text-cyan-400">{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function MeasureTable({ title, measures }: { title: string; measures: ScientificMeasure[] }) {
  if (measures.length === 0) return null;
  return (
    <SectionBlock icon={<Gauge className="h-4 w-4" />} title={title}>
      <div className="rounded-lg overflow-hidden border border-white/10">
        {measures.map((m, i) => (
          <div
            key={m.label}
            className={`grid grid-cols-12 gap-2 px-3 py-2 text-xs ${
              i % 2 === 0 ? "bg-white/[0.03]" : "bg-white/[0.06]"
            }`}
          >
            <div className="col-span-5 text-slate-300">{m.label}</div>
            <div className="col-span-4 text-white font-medium text-right">{m.value}</div>
            <div className="col-span-3 text-slate-400 text-right text-[11px]">{m.unit}</div>
          </div>
        ))}
      </div>
    </SectionBlock>
  );
}

// Unused imports for future icon use
void CalendarClock;
void Wind;
void Globe2;
void motion;
void AnimatePresence;
void Separator;
