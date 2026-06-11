import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PromptAnswerOptions } from './PromptAnswerOptions';
import { getPromptsForRoom } from '@/data/siteVisit/smartPrompts';
import type { RoomType } from '@/types/siteVisit';

interface RoomSmartPromptsProps {
  roomType: RoomType;
  roomId: string;
  getResponse: (promptKey: string, roomId?: string) => string | undefined;
  setResponse: (promptKey: string, response: string, roomId?: string, question?: string) => void;
}

export const RoomSmartPrompts = ({
  roomType,
  roomId,
  getResponse,
  setResponse,
}: RoomSmartPromptsProps) => {
  const prompts = getPromptsForRoom(roomType);

  if (prompts.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-white flex items-center gap-1.5">
        <HelpCircle className="h-4 w-4 text-elec-yellow" />
        Smart Prompts
      </h4>
      <div className="space-y-3">
        {prompts.map((prompt) => {
          const value = getResponse(prompt.key, roomId) || '';
          return (
            <div key={prompt.key} className="space-y-1">
              <label className="text-xs font-medium text-white">{prompt.question}</label>
              {prompt.helpText && <p className="text-[11px] text-white">{prompt.helpText}</p>}

              {prompt.inputType === 'select' && prompt.options && (
                <PromptAnswerOptions
                  options={prompt.options}
                  value={value}
                  onSelect={(val) => setResponse(prompt.key, val, roomId, prompt.question)}
                />
              )}

              {prompt.inputType === 'yes_no' && (
                <PromptAnswerOptions
                  options={['Yes', 'No']}
                  value={value}
                  onSelect={(val) => setResponse(prompt.key, val, roomId, prompt.question)}
                />
              )}

              {prompt.inputType === 'text' && (
                <Input
                  value={value}
                  onChange={(e) => setResponse(prompt.key, e.target.value, roomId, prompt.question)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  placeholder="Enter response..."
                  autoCapitalize="sentences"
                  enterKeyHint="done"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
