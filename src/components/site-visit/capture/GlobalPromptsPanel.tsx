import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ClipboardCheck, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GLOBAL_PROMPTS } from '@/data/siteVisit/smartPrompts';

interface GlobalPromptsPanelProps {
  getResponse: (promptKey: string) => string | undefined;
  setResponse: (promptKey: string, response: string, roomId?: string, question?: string) => void;
}

export const GlobalPromptsPanel = ({ getResponse, setResponse }: GlobalPromptsPanelProps) => {
  const answeredCount = GLOBAL_PROMPTS.filter((p) => getResponse(p.key)).length;
  const allAnswered = answeredCount === GLOBAL_PROMPTS.length;
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
            {answeredCount}/{GLOBAL_PROMPTS.length} answered
          </p>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-white/50" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white/50" />
        )}
      </button>

      {isOpen && (
        <div className="p-3 space-y-4 border-t border-white/[0.06]">
          {GLOBAL_PROMPTS.map((prompt) => {
            const value = getResponse(prompt.key) || '';
            return (
              <div key={prompt.key} className="space-y-1">
                <label className="text-xs font-medium text-white">{prompt.question}</label>
                {prompt.helpText && <p className="text-[11px] text-white/50">{prompt.helpText}</p>}

                {prompt.inputType === 'select' && prompt.options && (
                  <Select
                    value={value}
                    onValueChange={(val) =>
                      setResponse(prompt.key, val, undefined, prompt.question)
                    }
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground">
                      {prompt.options.map((opt) => (
                        <SelectItem key={opt} value={opt} className="touch-manipulation">
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {prompt.inputType === 'yes_no' && (
                  <div className="flex gap-2">
                    {['Yes', 'No'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setResponse(prompt.key, opt, undefined, prompt.question)}
                        className={`flex-1 h-11 rounded-xl border text-sm font-medium transition-all touch-manipulation ${
                          value === opt
                            ? 'bg-elec-yellow/20 border-elec-yellow text-white'
                            : 'bg-elec-gray border-white/10 text-white hover:border-white/20'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {prompt.inputType === 'text' && (
                  <Input
                    value={value}
                    onChange={(e) =>
                      setResponse(prompt.key, e.target.value, undefined, prompt.question)
                    }
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Enter response..."
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
