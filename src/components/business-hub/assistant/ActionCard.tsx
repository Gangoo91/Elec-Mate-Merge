import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, X, CheckCircle2, Mail } from 'lucide-react';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import type { ProposedAction, SparkTask, SparkProject, Customer } from './types';
import {
  accentForAction,
  isDestructive,
  labelForType,
  primaryLine,
  secondaryLine,
  summarise,
} from './helpers';
import { ActionIcon } from './ActionIcon';
import { InlineEditor } from './InlineEditor';

interface ActionCardProps {
  action: ProposedAction;
  resolved: 'pending' | 'applied' | 'rejected';
  lookupTask: (id: string) => SparkTask | undefined;
  lookupProject: (id: string) => SparkProject | undefined;
  lookupCustomer: (id: string) => Customer | undefined;
  onApply: () => void;
  onReject: () => void;
  onEdit: (patch: Record<string, unknown>) => void;
}

export function ActionCard({
  action,
  resolved,
  lookupTask,
  lookupProject,
  lookupCustomer,
  onApply,
  onReject,
  onEdit,
}: ActionCardProps) {
  const [showWhy, setShowWhy] = useState(false);

  const isCreatable =
    action.type === 'create-task' ||
    action.type === 'create-snag' ||
    action.type === 'create-project';
  const currentPriority =
    isCreatable && resolved === 'pending'
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((action as any).payload?.priority as
          | 'low'
          | 'normal'
          | 'high'
          | 'urgent'
          | undefined)
      : undefined;
  if (resolved === 'applied') {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2 flex items-center gap-2 text-[12px] text-emerald-300">
        <CheckCircle2 className="h-3.5 w-3.5" />
        <span>{summarise(action, lookupTask, lookupProject, lookupCustomer)}</span>
      </div>
    );
  }
  if (resolved === 'rejected') {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 flex items-center gap-2 text-[12px] text-white/40 line-through">
        <X className="h-3.5 w-3.5 not-line-through" />
        <span>{summarise(action, lookupTask, lookupProject, lookupCustomer)}</span>
      </div>
    );
  }

  const accent = accentForAction(action);

  return (
    <div className={cn('rounded-xl border p-3', accent)}>
      <div className="flex items-start gap-2 mb-2">
        <ActionIcon action={action} />
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              'text-[10px] font-bold uppercase tracking-[0.14em] mb-0.5',
              action.type === 'create-snag' ? 'text-orange-300' : 'text-white/50'
            )}
          >
            {labelForType(action.type)}
          </p>
          <p className="text-[13px] font-semibold text-white leading-snug">
            {primaryLine(action, lookupTask, lookupProject, lookupCustomer)}
          </p>
          {secondaryLine(action, lookupProject) && (
            <p className="text-[11px] text-white/60 mt-1 leading-snug">
              {secondaryLine(action, lookupProject)}
            </p>
          )}

          {/* Inline editor for create-* actions */}
          {isCreatable && resolved === 'pending' && (
            <InlineEditor action={action} onEdit={onEdit} />
          )}
        </div>
      </div>

      {/* Email body preview for draft-message */}
      {action.type === 'draft-message' && (
        <>
          <div className="mb-2 rounded-lg bg-white/[0.04] border border-white/[0.06] p-2.5 max-h-[200px] overflow-y-auto">
            <pre className="text-[11.5px] text-white/85 whitespace-pre-wrap font-sans leading-relaxed">
              {action.payload.body}
            </pre>
          </div>
          <p className="text-[10px] text-white/45 mb-2 leading-relaxed">
            Sent via Elec-Mate. <strong className="text-white/65 font-semibold">Replies route to your account email</strong> — your customer
            sees your business name on the from-line.
          </p>
        </>
      )}

      {/* "Why?" expandable — inference rationale */}
      {action.rationale && (
        <div className="mb-2">
          <button
            type="button"
            onClick={() => setShowWhy((v) => !v)}
            className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40 hover:text-white/70 transition-colors touch-manipulation"
          >
            {showWhy ? '— Hide reasoning' : '+ Why?'}
          </button>
          {showWhy && (
            <p className="mt-1.5 text-[11px] text-white/70 italic leading-snug border-l-2 border-elec-yellow/30 pl-2">
              {action.rationale}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onApply}
          className={cn(
            'flex-1 h-9 rounded-lg font-semibold text-[12px] flex items-center justify-center gap-1.5 touch-manipulation active:scale-[0.98]',
            isDestructive(action)
              ? 'bg-red-500 text-white'
              : 'bg-gradient-to-br from-elec-yellow to-amber-500 text-black'
          )}
        >
          {action.type === 'draft-message' ? (
            <>
              <Mail className="h-3.5 w-3.5" />
              Send
            </>
          ) : (
            <>
              <Check className="h-3.5 w-3.5" />
              Apply
            </>
          )}
        </button>
        {action.type === 'draft-message' && (
          <button
            type="button"
            onClick={async () => {
              const { to, subject, body } = action.payload;
              await copyToClipboard(body);
              const mailto =
                'mailto:' +
                encodeURIComponent(to || '') +
                '?subject=' +
                encodeURIComponent(subject) +
                '&body=' +
                encodeURIComponent(body);
              await openExternalUrl(mailto);
            }}
            className="h-9 px-3 rounded-lg bg-white/[0.06] text-white/70 text-[12px] font-medium hover:bg-white/[0.1] touch-manipulation"
            title="Copy body + open your default mail app"
          >
            Copy / mailto
          </button>
        )}
        <button
          type="button"
          onClick={onReject}
          className="h-9 px-3 rounded-lg bg-white/[0.06] text-white/70 text-[12px] font-medium hover:bg-white/[0.1] touch-manipulation"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
