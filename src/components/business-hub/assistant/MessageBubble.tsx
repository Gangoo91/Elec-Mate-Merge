import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import type { ChatMessage, SparkTask, SparkProject, Customer } from './types';
import { ActionCard } from './ActionCard';
import { ClarificationBlock } from './ClarificationBlock';

interface MessageBubbleProps {
  message: ChatMessage;
  isStreamingTarget: boolean;
  lookupTask: (id: string) => SparkTask | undefined;
  lookupProject: (id: string) => SparkProject | undefined;
  lookupCustomer: (id: string) => Customer | undefined;
  onApply: (actionIndex: number) => void;
  onReject: (actionIndex: number) => void;
  onEdit: (actionIndex: number, patch: Record<string, unknown>) => void;
  onApplyAll: () => void;
  onAnswerClarification: (value: string, label: string) => void;
}

export function MessageBubble({
  message,
  isStreamingTarget,
  lookupTask,
  lookupProject,
  lookupCustomer,
  onApply,
  onReject,
  onEdit,
  onApplyAll,
  onAnswerClarification,
}: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const pendingCount =
    message.resolved?.filter((r) => r === 'pending').length ?? 0;
  const hasMultipleActions = (message.actions?.length ?? 0) > 1;

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div className={cn('max-w-[88%] sm:max-w-[80%] space-y-2', isUser && 'items-end')}>
        {(message.content || isStreamingTarget) && (
          <div
            className={cn(
              'rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed',
              isUser
                ? 'bg-gradient-to-br from-elec-yellow to-amber-500 text-black rounded-tr-md font-medium'
                : 'bg-white/[0.05] border border-white/[0.06] text-white rounded-tl-md'
            )}
          >
            {message.content ? (
              <>
                <span className="whitespace-pre-wrap">{message.content}</span>
                {isStreamingTarget && (
                  <span
                    className="inline-block w-[2px] h-[1em] align-text-bottom ml-0.5 bg-elec-yellow animate-pulse"
                    style={{ animationDuration: '900ms' }}
                  />
                )}
              </>
            ) : (
              // No tokens yet — show a subtle shimmer placeholder so the bubble
              // doesn't look empty/broken while the model warms up.
              <span className="inline-flex items-center gap-1.5 text-white/45">
                <span
                  className="inline-block w-2 h-2 rounded-full bg-elec-yellow/70 animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className="inline-block w-2 h-2 rounded-full bg-elec-yellow/50 animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="inline-block w-2 h-2 rounded-full bg-elec-yellow/30 animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </span>
            )}
          </div>
        )}

        {/* Clarifying question — quick-reply chips */}
        {message.clarification && (
          <ClarificationBlock
            clarification={message.clarification}
            onAnswer={onAnswerClarification}
          />
        )}

        {/* Citations */}
        {message.citations && message.citations.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {message.citations.slice(0, 6).map((c) => (
              <span
                key={c.ref}
                className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/20"
              >
                <BookOpen className="h-2.5 w-2.5" />
                {c.ref}
              </span>
            ))}
          </div>
        )}

        {/* Proposed actions */}
        {message.actions && message.actions.length > 0 && (
          <div className="space-y-2 pt-1">
            {message.actions.map((a, ai) => (
              <ActionCard
                key={ai}
                action={a}
                resolved={message.resolved?.[ai] ?? 'pending'}
                lookupTask={lookupTask}
                lookupProject={lookupProject}
                lookupCustomer={lookupCustomer}
                onApply={() => onApply(ai)}
                onReject={() => onReject(ai)}
                onEdit={(patch) => onEdit(ai, patch)}
              />
            ))}
            {hasMultipleActions && pendingCount > 1 && (
              <button
                type="button"
                onClick={onApplyAll}
                className="w-full rounded-xl bg-gradient-to-br from-elec-yellow to-amber-500 text-black font-semibold text-[13px] py-2.5 active:scale-[0.98] touch-manipulation"
              >
                Apply all {pendingCount}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
