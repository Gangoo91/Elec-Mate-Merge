import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ClipboardCheck, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PromptAnswerOptions } from './PromptAnswerOptions';
import { getGlobalPrompts } from '@/data/siteVisit/smartPrompts';
import type { PropertyType } from '@/types/siteVisit';

interface GlobalPromptsPanelProps {
  getResponse: (promptKey: string) => string | undefined;
  setResponse: (promptKey: string, response: string, roomId?: string, question?: string) => void;
  propertyType?: PropertyType;
}

export const GlobalPromptsPanel = ({
  getResponse,
  setResponse,
  propertyType,
}: GlobalPromptsPanelProps) => {
  const prompts = getGlobalPrompts(propertyType);
  const answeredCount = prompts.filter((p) => getResponse(p.key)).length;
  const allAnswered = answeredCount === prompts.length;
  const [isOpen, setIsOpen] = useState(!allAnswered);

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-3 touch-manipulation bg-white/[0.02]"
      >
        <div
          className={`p-2 rounded-lg ${allAnswered ? 'bg-emerald-500/20' : 'bg-elec-yellow/20'}`}
        >
          {allAnswered ? (
            <Check className="h-4 w-4 text-emerald-400" />
          ) : (
            <ClipboardCheck className="h-4 w-4 text-elec-yellow" />
          )}
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-white">Property Assessment</p>
          <p className="text-xs text-white">
            {answeredCount}/{prompts.length} answered
          </p>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-white" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white" />
        )}
      </button>

      {isOpen && (
        <div className="p-3 space-y-4 border-t border-white/[0.06]">
          {prompts.map((prompt) => {
            const value = getResponse(prompt.key) || '';
            return (
              <div key={prompt.key} className="space-y-1">
                <label className="text-[11.5px] font-medium text-white/65">{prompt.question}</label>
                {prompt.helpText && <p className="text-[11px] text-white">{prompt.helpText}</p>}

                {prompt.inputType === 'select' && prompt.options && (
                  <PromptAnswerOptions
                    options={prompt.options}
                    value={value}
                    onSelect={(val) => setResponse(prompt.key, val, undefined, prompt.question)}
                  />
                )}

                {prompt.inputType === 'yes_no' && (
                  <PromptAnswerOptions
                    options={['Yes', 'No']}
                    value={value}
                    onSelect={(val) => setResponse(prompt.key, val, undefined, prompt.question)}
                  />
                )}

                {prompt.inputType === 'text' && (
                  <Input
                    value={value}
                    onChange={(e) =>
                      setResponse(prompt.key, e.target.value, undefined, prompt.question)
                    }
                    className="h-11 text-base touch-manipulation rounded-xl border-white/[0.12] bg-[hsl(0_0%_9%)] text-white placeholder:text-white/40 focus:border-elec-yellow/50 focus:ring-elec-yellow/20"
                    placeholder="Enter response..."
                    autoCapitalize="sentences"
                    enterKeyHint="done"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
