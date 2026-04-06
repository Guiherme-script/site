import React from "react";
import { ScriptInput } from "./components/ScriptInput";
import { PreviewPlayer } from "./components/PreviewPlayer";
import { Timeline } from "./components/Timeline";
import { PropertyPanel } from "./components/PropertyPanel";

export const EditorPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-editor-bg">
      {/* Top Bar */}
      <header className="h-12 bg-editor-panel border-b border-editor-border flex items-center px-4 justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-editor-accent flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <h1 className="text-sm font-bold text-editor-text tracking-wide">
            Motion Editor
          </h1>
        </div>
        <span className="text-xs text-editor-muted">v0.1.0 · Fase 1</span>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Script Input */}
        <div className="w-80 flex-shrink-0">
          <ScriptInput />
        </div>

        {/* Center: Preview */}
        <PreviewPlayer />

        {/* Right: Properties */}
        <PropertyPanel />
      </div>

      {/* Bottom: Timeline */}
      <Timeline />
    </div>
  );
};
