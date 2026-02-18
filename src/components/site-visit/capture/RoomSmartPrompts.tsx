import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
              {prompt.helpText && <p className="text-[11px] text-white/50">{prompt.helpText}</p>}

              {prompt.inputType === 'select' && prompt.options && (
                <Select
                  value={value}
                  onValueChange={(val) => setResponse(prompt.key, val, roomId, prompt.question)}
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
                      onClick={() => setResponse(prompt.key, opt, roomId, prompt.question)}
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
                  onChange={(e) => setResponse(prompt.key, e.target.value, roomId, prompt.question)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  placeholder="Enter response..."
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
