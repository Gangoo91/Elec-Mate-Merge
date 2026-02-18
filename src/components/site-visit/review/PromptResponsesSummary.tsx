import React from 'react';
import { HelpCircle } from 'lucide-react';
import type { SiteVisitPrompt } from '@/types/siteVisit';

interface PromptResponsesSummaryProps {
  prompts: SiteVisitPrompt[];
}

export const PromptResponsesSummary = ({ prompts }: PromptResponsesSummaryProps) => {
  const answered = prompts.filter((p) => p.response);
  const globalPrompts = answered.filter((p) => !p.roomId);
  const roomPrompts = answered.filter((p) => p.roomId);

  if (answered.length === 0) return null;

  return (
    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-3">
      <div className="flex items-center gap-2">
        <HelpCircle className="h-4 w-4 text-orange-400" />
        <h3 className="text-sm font-semibold text-white">Prompt Responses</h3>
        <span className="text-xs text-white ml-auto">{answered.length} answered</span>
      </div>

      {globalPrompts.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">Property</p>
          {globalPrompts.map((p) => (
            <div key={p.id} className="flex justify-between text-xs">
              <span className="text-white">{p.promptQuestion}</span>
              <span className="text-white font-medium">{p.response}</span>
            </div>
          ))}
        </div>
      )}

      {roomPrompts.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">
            Room-specific
          </p>
          {roomPrompts.map((p) => (
            <div key={p.id} className="flex justify-between text-xs">
              <span className="text-white">{p.promptQuestion}</span>
              <span className="text-white font-medium">{p.response}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
