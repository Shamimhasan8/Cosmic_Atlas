"use client";

import React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Error boundary for the 3D scene.
 *
 * If WebGL context creation fails (old GPU, driver crash, headless
 * browser, mobile battery saver, etc.) the R3F Canvas will throw.
 * Without this boundary the entire page would crash and the user
 * would see a white screen. With it, we render a graceful fallback
 * with a retry button.
 */

interface SceneErrorBoundaryProps {
  children: React.ReactNode;
}

interface SceneErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class SceneErrorBoundary extends React.Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  constructor(props: SceneErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console for debugging — in production this would go to
    // Sentry / Datadog / similar.
    console.error("[SceneErrorBoundary] 3D scene crashed:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#04060f] text-white p-6">
          <div className="max-w-md text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/15 border border-amber-500/30">
              <AlertTriangle className="h-6 w-6 text-amber-400" />
            </div>
            <h2 className="text-xl font-semibold">3D Scene Unavailable</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your browser couldn&apos;t initialize the WebGL 3D scene. This is
              usually caused by an outdated graphics driver, hardware
              acceleration being disabled, or a headless browser environment.
              You can still browse the sidebar to read about each celestial
              body.
            </p>
            {this.state.error && (
              <details className="text-left text-xs text-slate-400 bg-white/5 border border-white/10 rounded-md p-3">
                <summary className="cursor-pointer font-medium">
                  Technical details
                </summary>
                <pre className="mt-2 whitespace-pre-wrap break-all">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <Button
              onClick={this.handleRetry}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white"
            >
              <RotateCcw className="h-4 w-4 mr-1.5" />
              Retry scene
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
