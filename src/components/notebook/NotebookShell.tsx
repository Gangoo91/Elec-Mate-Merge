import { memo, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import {
  type NotebookConversation,
  type NotebookMessage,
  type SuggestedAction,
  type Citation,
  type CitationType,
  type Proposal,
  type OtjReflectionProposal,
  type PortfolioItemProposal,
  type IlpGoalProposal,
  type CollegePolicyProposal,
} from '@/hooks/useNotebook';
import { SubmitWorkOtjSheet } from '@/components/apprentice-hub/SubmitWorkOtjSheet';
import { FilePortfolioItemSheet } from '@/components/apprentice-hub/FilePortfolioItemSheet';
import { ProposeIlpGoalSheet } from '@/components/apprentice-hub/ProposeIlpGoalSheet';
import { FilePolicyDraftSheet } from '@/components/college/dialogs/FilePolicyDraftSheet';
import { fmtRel } from '@/lib/format';

/* ==========================================================================
   NotebookShell — editorial chat surface mirroring the Elec-AI design.

   - User: right-aligned tone-tinted pill
   - Assistant: full-width prose, no bubble; eyebrow ("College AI" / "AI
     Notebook"), markdown body, citation row, suggested-action chips
   - Streaming: TypingIndicator before first token, blinking cursor inline
   - Composer: rounded pill, auto-grow textarea, tone-coloured send button
   - Empty state: 4 categorised query cards
   ========================================================================== */

type Tone = 'cyan' | 'amber';

interface ToneStyle {
  accent: string; // text-... eyebrow / category
  ring: string; // border tint for citations / actions
  pill: string; // user message pill bg
  pillBorder: string; // user message pill border
  send: string; // send button bg
  sendHover: string;
  bullet: string; // marker:text-... for ul markers
  cursor: string; // bg-... for streaming cursor
  dot: string; // bg-... for typing dots
  hairline: string; // border-l-2 colour for category tab
}

const TONE: Record<Tone, ToneStyle> = {
  cyan: {
    accent: 'text-cyan-300',
    ring: 'border-cyan-300/30',
    pill: 'bg-cyan-300/[0.10]',
    pillBorder: 'border-cyan-300/25',
    send: 'bg-cyan-300',
    sendHover: 'hover:bg-cyan-200',
    bullet: 'marker:text-cyan-300/70',
    cursor: 'bg-cyan-300',
    dot: 'bg-cyan-300',
    hairline: 'bg-cyan-300',
  },
  amber: {
    accent: 'text-amber-300',
    ring: 'border-amber-300/30',
    pill: 'bg-amber-300/[0.10]',
    pillBorder: 'border-amber-300/25',
    send: 'bg-amber-300',
    sendHover: 'hover:bg-amber-200',
    bullet: 'marker:text-amber-300/70',
    cursor: 'bg-amber-300',
    dot: 'bg-amber-300',
    hairline: 'bg-amber-300',
  },
};

const CITATION_TONE: Record<CitationType, string> = {
  ac: 'border-purple-300/30 text-purple-200',
  bs7671: 'border-blue-300/30 text-blue-200',
  quiz: 'border-emerald-300/30 text-emerald-200',
  portfolio: 'border-blue-300/30 text-blue-200',
  otj: 'border-emerald-300/30 text-emerald-200',
  observation: 'border-cyan-300/30 text-cyan-200',
};

interface StarterCard {
  category: string;
  prompt: string;
}

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  tone: Tone;
  /** 4 categorised query cards for the welcome screen. */
  starterCards: StarterCard[];
  conversations: NotebookConversation[];
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  messages: NotebookMessage[];
  loadingConversations: boolean;
  loadingMessages: boolean;
  streaming: boolean;
  error: string | null;
  send: (text: string) => Promise<void>;
  newConversation: () => void;
  deleteConversation: (id: string) => Promise<void>;
  togglePinned: (id: string, pinned: boolean) => Promise<void>;
  /** AI write-back: persist filed-state on the proposal so it survives reload. */
  markProposalFiled?: (messageId: string, proposalIndex: number, recordId: string) => Promise<void>;
  /** Optional badge or pill rendered next to the page title (e.g. learner name). */
  headerExtra?: ReactNode;
  /** Optional content rendered above the welcome screen (empty state only).
      Used by the apprentice notebook to surface MyThisWeekCard. */
  welcomeExtra?: ReactNode;
}

export function NotebookShell({
  eyebrow,
  title,
  description,
  tone,
  starterCards,
  conversations,
  activeId,
  setActiveId,
  messages,
  loadingConversations,
  loadingMessages,
  streaming,
  error,
  send,
  newConversation,
  deleteConversation,
  togglePinned,
  markProposalFiled,
  headerExtra,
  welcomeExtra,
}: Props) {
  const navigate = useNavigate();
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Smart auto-scroll — only stick to the bottom if the user is already
  // there (within 120px). Stops the page yanking down while they read
  // earlier turns.
  const stickToBottomRef = useRef(true);
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    stickToBottomRef.current = distanceFromBottom < 120;
  };
  useEffect(() => {
    if (!scrollRef.current || !stickToBottomRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, streaming]);

  // Auto-grow textarea.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [draft]);

  const empty = messages.length === 0;
  const t = TONE[tone];

  // AI write-back: which proposal is the apprentice currently confirming?
  // Single sheet per kind, switches prefill based on which proposal was tapped.
  // Filed-state lives on the proposal itself (proposal.filed_at) — survives
  // reload and stops double-filing across sessions.
  const [activeProposal, setActiveProposal] = useState<{
    messageId: string;
    index: number;
    proposal: Proposal;
  } | null>(null);

  // Memoise the prefill objects so each sheet's open-time effect doesn't
  // see a fresh reference on every parent render (which would wipe the
  // apprentice's edits live). One memo per kind so changing kinds doesn't
  // remount or re-run the wrong sheet.
  const otjPrefill = useMemo(() => {
    const p = activeProposal?.proposal;
    if (p?.kind !== 'propose_otj_reflection') return undefined;
    return {
      title: p.title,
      description: p.description,
      duration_minutes: p.estimated_minutes,
      activity_type: p.activity_type,
      unit_codes: p.suggested_unit_codes,
    };
  }, [activeProposal]);

  const portfolioPrefill = useMemo(() => {
    const p = activeProposal?.proposal;
    if (p?.kind !== 'propose_portfolio_item') return undefined;
    return {
      title: p.title,
      description: p.description,
      reflection_notes: p.reflection_notes,
      category: p.category,
      assessment_criteria_met: p.assessment_criteria_met,
      date_completed: p.date_completed,
    };
  }, [activeProposal]);

  const ilpPrefill = useMemo(() => {
    const p = activeProposal?.proposal;
    if (p?.kind !== 'propose_ilp_goal') return undefined;
    return {
      title: p.title,
      description: p.description,
      acceptance_criteria: p.acceptance_criteria,
      category: p.category,
      priority: p.priority,
      target_date: p.target_date,
    };
  }, [activeProposal]);

  const policyPrefill = useMemo(() => {
    const p = activeProposal?.proposal;
    if (p?.kind !== 'propose_college_policy') return undefined;
    return {
      title: p.title,
      description: p.description,
      content_md: p.content_md,
      category: p.category,
      code: p.code,
      owner_role: p.owner_role,
      requires_acknowledgement: p.requires_acknowledgement,
    };
  }, [activeProposal]);

  const handleSend = async () => {
    const v = draft.trim();
    if (!v || streaming) return;
    setDraft('');
    await send(v);
  };

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pb-24">
        <motion.button
          onClick={() => navigate(-1)}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-1 -ml-1 h-9 px-2 rounded-lg text-[13px] font-medium text-white/85 hover:text-white hover:bg-white/[0.04] transition-colors touch-manipulation"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-3 sm:mt-4"
        >
          <div
            className={cn(
              'text-[10px] lg:text-[11px] font-medium uppercase tracking-[0.22em]',
              t.accent
            )}
          >
            {eyebrow}
          </div>
          <div className="mt-1 flex items-center gap-3 flex-wrap">
            <h1 className="text-[22px] sm:text-[28px] lg:text-[36px] font-semibold text-white tracking-tight leading-[1.1]">
              {title}
            </h1>
            {headerExtra}
          </div>
          <p className="mt-2 text-[12.5px] sm:text-[13px] text-white/85 leading-snug max-w-2xl">
            {description}
          </p>
        </motion.div>

        <div className="mt-5 sm:mt-6 grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-4 sm:gap-5">
          {/* Conversation rail */}
          <aside className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
            <div className="px-3 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/85">
                Conversations
              </div>
              <button
                type="button"
                onClick={newConversation}
                className={cn(
                  'h-7 px-2.5 rounded-md text-[11px] font-semibold text-black transition-colors touch-manipulation',
                  t.send,
                  t.sendHover
                )}
              >
                + New
              </button>
            </div>
            {loadingConversations ? (
              <div className="px-3 py-4 text-[11.5px] text-white/85">Loading…</div>
            ) : conversations.length === 0 ? (
              <div className="px-3 py-6 text-[11.5px] text-white/85 leading-snug">
                No conversations yet. Ask anything to start one.
              </div>
            ) : (
              <ul className="max-h-[60vh] lg:max-h-[68vh] overflow-y-auto divide-y divide-white/[0.05]">
                {conversations.map((c) => (
                  <li key={c.id}>
                    <ConversationRow
                      convo={c}
                      active={c.id === activeId}
                      tone={tone}
                      onPick={() => setActiveId(c.id)}
                      onTogglePin={() => togglePinned(c.id, !c.pinned)}
                      onDelete={() => deleteConversation(c.id)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </aside>

          {/* Conversation pane */}
          <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden flex flex-col min-h-[60vh]">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 sm:py-6 space-y-6"
            >
              {empty && !loadingMessages && (
                <>
                  {welcomeExtra}
                  <WelcomeScreen
                    starterCards={starterCards}
                    tone={tone}
                    onPick={(p) => {
                      setDraft(p);
                      textareaRef.current?.focus();
                    }}
                  />
                </>
              )}
              {loadingMessages && empty && (
                <div className="text-[12.5px] text-white/85">Loading…</div>
              )}
              {messages.map((m, i) => (
                <MessageBlock
                  key={m.id}
                  message={m}
                  tone={tone}
                  eyebrow={eyebrow}
                  isLast={i === messages.length - 1}
                  onProposalTap={(idx, proposal) =>
                    setActiveProposal({ messageId: m.id, index: idx, proposal })
                  }
                />
              ))}
              {streaming &&
                messages.length > 0 &&
                messages[messages.length - 1]?.role === 'user' && (
                  <ComposingIndicator tone={tone} eyebrow={eyebrow} />
                )}
              {error && (
                <div className="rounded-xl border border-rose-300/30 bg-rose-400/[0.06] px-3 py-2 text-[12.5px] text-rose-200">
                  {error}
                </div>
              )}
            </div>

            <footer className="border-t border-white/[0.06] px-3 sm:px-4 py-3 bg-[hsl(0_0%_8%)]">
              <div
                className={cn(
                  'flex items-end gap-2 rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] px-3 py-2 transition-colors focus-within:border-white/20'
                )}
              >
                <textarea
                  ref={textareaRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      e.key === 'Enter' &&
                      !e.shiftKey &&
                      (e.metaKey || e.ctrlKey || !window.matchMedia('(hover: none)').matches)
                    ) {
                      e.preventDefault();
                      void handleSend();
                    }
                  }}
                  rows={1}
                  placeholder={`Ask ${eyebrow}…  ⌘↵`}
                  disabled={streaming}
                  className="flex-1 bg-transparent text-[15px] sm:text-[14.5px] text-white placeholder:text-white/45 leading-relaxed focus:outline-none touch-manipulation resize-none disabled:opacity-50 max-h-40 py-1.5"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!draft.trim() || streaming}
                  className={cn(
                    'shrink-0 h-11 px-4 rounded-xl text-[13px] font-semibold transition-colors touch-manipulation',
                    draft.trim() && !streaming
                      ? cn(t.send, t.sendHover, 'text-black')
                      : 'bg-white/[0.05] text-white/40'
                  )}
                >
                  {streaming ? '…' : 'Send'}
                </button>
              </div>
            </footer>
          </section>
        </div>
      </div>

      {/* AI write-back: confirm sheet for OTJ reflection proposals.
          Only mounted on apprentice surfaces — tutor proposals (when
          they land) will mount their own sheets. */}
      <SubmitWorkOtjSheet
        open={activeProposal?.proposal.kind === 'propose_otj_reflection'}
        onOpenChange={(o) => {
          if (!o) setActiveProposal(null);
        }}
        prefill={otjPrefill}
        onSubmitted={(insertedId) => {
          if (activeProposal && insertedId && markProposalFiled) {
            void markProposalFiled(activeProposal.messageId, activeProposal.index, insertedId);
          }
          setActiveProposal(null);
        }}
      />

      <FilePortfolioItemSheet
        open={activeProposal?.proposal.kind === 'propose_portfolio_item'}
        onOpenChange={(o) => {
          if (!o) setActiveProposal(null);
        }}
        prefill={portfolioPrefill}
        onSubmitted={(insertedId) => {
          if (activeProposal && insertedId && markProposalFiled) {
            void markProposalFiled(activeProposal.messageId, activeProposal.index, insertedId);
          }
          setActiveProposal(null);
        }}
      />

      <ProposeIlpGoalSheet
        open={activeProposal?.proposal.kind === 'propose_ilp_goal'}
        onOpenChange={(o) => {
          if (!o) setActiveProposal(null);
        }}
        prefill={ilpPrefill}
        onSubmitted={(insertedId) => {
          if (activeProposal && insertedId && markProposalFiled) {
            void markProposalFiled(activeProposal.messageId, activeProposal.index, insertedId);
          }
          setActiveProposal(null);
        }}
      />

      <FilePolicyDraftSheet
        open={activeProposal?.proposal.kind === 'propose_college_policy'}
        onOpenChange={(o) => {
          if (!o) setActiveProposal(null);
        }}
        prefill={policyPrefill}
        onSubmitted={(insertedId) => {
          if (activeProposal && insertedId && markProposalFiled) {
            void markProposalFiled(activeProposal.messageId, activeProposal.index, insertedId);
          }
          setActiveProposal(null);
        }}
      />
    </div>
  );
}

/* ───────────────────────── conversation row ───────────────────────────── */

function ConversationRow({
  convo,
  active,
  tone,
  onPick,
  onTogglePin,
  onDelete,
}: {
  convo: NotebookConversation;
  active: boolean;
  tone: Tone;
  onPick: () => void;
  onTogglePin: () => void;
  onDelete: () => void;
}) {
  const [hover, setHover] = useState(false);
  const t = TONE[tone];
  return (
    <div
      className={cn(
        'flex items-baseline gap-2 px-3 py-2.5 transition-colors',
        active
          ? cn('border-l-2', t.ring, 'bg-white/[0.02]')
          : 'hover:bg-white/[0.02] border-l-2 border-transparent'
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        type="button"
        onClick={onPick}
        className="min-w-0 flex-1 text-left touch-manipulation"
      >
        <div
          className={cn(
            'text-[12.5px] font-medium leading-snug truncate',
            active ? 'text-white' : 'text-white/95'
          )}
        >
          {convo.pinned && <span className="mr-1.5 text-[10px]">★</span>}
          {convo.title || 'Untitled conversation'}
        </div>
        <div className="mt-0.5 text-[10.5px] text-white/85 tabular-nums">
          {convo.message_count} {convo.message_count === 1 ? 'msg' : 'msgs'}
          {convo.last_message_at && ` · ${fmtRel(convo.last_message_at)}`}
        </div>
      </button>
      {(hover || active) && (
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onTogglePin}
            className="text-[10px] text-white/85 hover:text-white tabular-nums px-1"
            title={convo.pinned ? 'Unpin' : 'Pin'}
          >
            {convo.pinned ? '★' : '☆'}
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Delete this conversation?')) onDelete();
            }}
            className="text-[10px] text-rose-300 hover:text-rose-200 tabular-nums px-1"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── welcome screen ─────────────────────────────── */

function WelcomeScreen({
  starterCards,
  tone,
  onPick,
}: {
  starterCards: StarterCard[];
  tone: Tone;
  onPick: (prompt: string) => void;
}) {
  const t = TONE[tone];
  return (
    <div className="py-6 sm:py-10">
      <h2 className="text-[20px] sm:text-[24px] font-semibold text-white tracking-tight max-w-md leading-tight">
        Ask anything. Grounded in real data.
      </h2>
      <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {starterCards.map((card) => (
          <button
            key={card.prompt}
            type="button"
            onClick={() => onPick(card.prompt)}
            className="group relative text-left rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.18] hover:bg-white/[0.04] transition-colors px-4 py-3.5 sm:py-4 touch-manipulation overflow-hidden"
          >
            <span
              className={cn('absolute left-0 top-0 bottom-0 w-[2px]', t.hairline)}
              aria-hidden="true"
            />
            <div className={cn('text-[10px] font-medium uppercase tracking-[0.22em]', t.accent)}>
              {card.category}
            </div>
            <div className="mt-1.5 flex items-start justify-between gap-3">
              <span className="text-[14px] sm:text-[14.5px] text-white leading-snug">
                {card.prompt}
              </span>
              <span className="text-white/40 group-hover:text-white/80 transition-colors mt-0.5">
                →
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── message block ──────────────────────────────── */

interface MessageBlockProps {
  message: NotebookMessage;
  tone: Tone;
  eyebrow: string;
  isLast: boolean;
  onProposalTap: (index: number, proposal: Proposal) => void;
}

const MessageBlock = memo(
  function MessageBlock({ message, tone, eyebrow, isLast, onProposalTap }: MessageBlockProps) {
    const t = TONE[tone];
    const isUser = message.role === 'user';

    if (isUser) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="flex justify-end w-full"
        >
          <div
            className={cn(
              'max-w-[88%] sm:max-w-[75%] rounded-2xl px-3.5 py-2.5 text-white',
              t.pill,
              'border',
              t.pillBorder
            )}
          >
            <div
              className="whitespace-pre-wrap text-[14.5px] leading-relaxed"
              style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
            >
              {message.content}
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={message.streaming ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="flex justify-start w-full text-left min-w-0"
      >
        <div
          className="w-full max-w-3xl space-y-3 min-w-0"
          style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
        >
          <div
            className={cn(
              'flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em]'
            )}
          >
            <span className={t.accent}>{eyebrow}</span>
            <span className="text-white/70">grounded answer</span>
          </div>

          <div className="prose prose-sm sm:prose-base max-w-none text-left">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-xl sm:text-2xl font-semibold mt-5 mb-3 first:mt-0 text-white tracking-tight leading-tight">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-lg sm:text-xl font-semibold mt-5 mb-3 first:mt-0 text-white tracking-tight">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base sm:text-lg font-semibold mt-4 mb-2 first:mt-0 text-white tracking-tight">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-[14.5px] leading-relaxed my-3 text-white">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className={cn('my-3 ml-5 space-y-1.5 list-disc', t.bullet)}>{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol
                    className={cn(
                      'my-3 ml-5 space-y-1.5 list-decimal marker:font-semibold',
                      t.bullet
                    )}
                  >
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-[14.5px] leading-relaxed text-white">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-white">{children}</strong>
                ),
                em: ({ children }) => <em className="text-white italic">{children}</em>,
                code: ({ className, children }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="bg-white/[0.06] text-white px-1.5 py-0.5 rounded text-[13px] font-mono border border-white/[0.08]">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code
                      className={cn(
                        'block bg-[hsl(0_0%_9%)] rounded-xl p-4 my-3 text-[13px] font-mono overflow-x-auto border border-white/[0.08] text-white',
                        className
                      )}
                    >
                      {children}
                    </code>
                  );
                },
                blockquote: ({ children }) => (
                  <blockquote
                    className={cn(
                      'my-4 pl-4 border-l-2 text-white text-[14px] leading-relaxed italic',
                      t.ring
                    )}
                  >
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4 rounded-2xl border border-white/[0.06]">
                    <table className="w-full text-[13px]">{children}</table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-[hsl(0_0%_15%)] border-b border-white/[0.06]">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="px-3 py-2 text-left font-semibold text-white">{children}</th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-2 border-t border-white/[0.06] text-white">{children}</td>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className={cn('underline-offset-2 hover:underline', t.accent)}
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>

            <AnimatePresence>
              {message.streaming && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    'inline-block w-0.5 h-5 ml-0.5 rounded-full align-middle animate-pulse',
                    t.cursor
                  )}
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>
          </div>

          {!message.streaming && message.proposals && message.proposals.length > 0 && (
            <div className="pt-2 space-y-2">
              {message.proposals.map((p, i) => {
                const filed = Boolean(p.filed_at);
                return (
                  <ProposalPanel
                    key={`${p.kind}-${i}`}
                    proposal={p}
                    tone={tone}
                    filed={filed}
                    onTap={() => {
                      if (!filed) onProposalTap(i, p);
                    }}
                  />
                );
              })}
            </div>
          )}

          {!message.streaming && message.citations && message.citations.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/55 mr-1">
                Sources
              </span>
              {message.citations.map((c, i) => (
                <CitationChip key={`${c.type}-${c.ref}-${i}`} citation={c} />
              ))}
            </div>
          )}

          {!message.streaming &&
            message.suggested_actions &&
            message.suggested_actions.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {message.suggested_actions.map((a, i) => (
                  <ActionButton key={`${a.kind}-${i}`} action={a} tone={tone} />
                ))}
              </div>
            )}

          {isLast && !message.streaming && (
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40 pt-1">
              Cited from learner data + BS 7671 A4:2026
            </div>
          )}
        </div>
      </motion.div>
    );
  },
  // Skip re-render unless the message reference, tone, eyebrow, or isLast
  // change. Crucial: completed messages don't re-render when a newer
  // message receives streaming deltas. The hook produces a new message
  // object whenever proposals[].filed_at changes via markProposalFiled,
  // so message reference equality is enough for filed-state updates too.
  (prev, next) =>
    prev.message === next.message &&
    prev.tone === next.tone &&
    prev.eyebrow === next.eyebrow &&
    prev.isLast === next.isLast
);

/* ───────────────────────── composing indicator ────────────────────────── */

function ComposingIndicator({ tone, eyebrow }: { tone: Tone; eyebrow: string }) {
  const t = TONE[tone];
  return (
    <div className="flex justify-start w-full">
      <div className="w-full max-w-3xl space-y-3">
        <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em]">
          <span className={t.accent}>{eyebrow}</span>
          <span className="text-white/70">composing</span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.3, scale: 0.8 }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
              className={cn('w-1.5 h-1.5 rounded-full', t.dot)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── citation + action chips ────────────────────── */

function ProposalPanel({
  proposal,
  tone,
  filed,
  onTap,
}: {
  proposal: Proposal;
  tone: Tone;
  filed: boolean;
  onTap: () => void;
}) {
  const t = TONE[tone];
  if (proposal.kind === 'propose_otj_reflection') {
    return <OtjProposalPanel proposal={proposal} t={t} filed={filed} onTap={onTap} />;
  }
  if (proposal.kind === 'propose_portfolio_item') {
    return <PortfolioProposalPanel proposal={proposal} filed={filed} onTap={onTap} />;
  }
  if (proposal.kind === 'propose_ilp_goal') {
    return <IlpGoalProposalPanel proposal={proposal} filed={filed} onTap={onTap} />;
  }
  if (proposal.kind === 'propose_college_policy') {
    return <PolicyProposalPanel proposal={proposal} filed={filed} onTap={onTap} />;
  }
  return null;
}

function OtjProposalPanel({
  proposal,
  t,
  filed,
  onTap,
}: {
  proposal: OtjReflectionProposal;
  t: ToneStyle;
  filed: boolean;
  onTap: () => void;
}) {
  const hours = Math.floor(proposal.estimated_minutes / 60);
  const mins = proposal.estimated_minutes % 60;
  const durationLabel = hours > 0 ? `${hours}h${mins > 0 ? ` ${mins}m` : ''}` : `${mins}m`;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border px-3.5 py-3 transition-opacity',
        filed
          ? 'border-emerald-300/30 bg-emerald-500/[0.06]'
          : cn(
              'bg-gradient-to-br from-cyan-500/[0.08] via-[hsl(0_0%_11%)] to-[hsl(0_0%_11%)]',
              t.ring
            )
      )}
    >
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-px opacity-50',
          filed ? 'bg-emerald-300' : t.cursor
        )}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div
            className={cn(
              'text-[10px] font-medium uppercase tracking-[0.22em]',
              filed ? 'text-emerald-300' : t.accent
            )}
          >
            {filed ? '✓ Filed as OTJ' : `✨ Proposed OTJ entry · ${durationLabel} · ready to file`}
          </div>
          <div className="mt-1.5 text-[13.5px] font-semibold text-white leading-snug">
            {proposal.title}
          </div>
          <p
            className={cn(
              'mt-1 text-[12.5px] leading-snug line-clamp-3',
              filed ? 'text-white/65' : 'text-white/85'
            )}
          >
            {proposal.description}
          </p>
        </div>
        {filed ? (
          <FiledPill href="/apprentice/college-plan#otj" label="Sent to tutor" />
        ) : (
          <button
            type="button"
            onClick={onTap}
            className={cn(
              'shrink-0 inline-flex items-center h-8 px-3 rounded-md text-[11.5px] font-semibold text-black transition-colors touch-manipulation',
              t.send,
              t.sendHover
            )}
          >
            Review &amp; file →
          </button>
        )}
      </div>
    </div>
  );
}

/** Filed-state pill for proposal panels — emerald, with an optional
    deep-link so the apprentice can jump to the surface where their just-
    filed record now lives (OTJ list / portfolio). */
function FiledPill({ href, label }: { href: string; label: string }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(href)}
      className="shrink-0 inline-flex items-center gap-1 h-8 px-3 rounded-md text-[11.5px] font-semibold text-emerald-200 bg-emerald-500/[0.10] border border-emerald-300/25 hover:bg-emerald-500/[0.16] transition-colors touch-manipulation"
    >
      {label} <span className="text-emerald-300/80">→</span>
    </button>
  );
}

function PortfolioProposalPanel({
  proposal,
  filed,
  onTap,
}: {
  proposal: PortfolioItemProposal;
  filed: boolean;
  onTap: () => void;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border px-3.5 py-3 transition-opacity',
        filed
          ? 'border-emerald-300/30 bg-emerald-500/[0.06]'
          : 'border-blue-300/30 bg-gradient-to-br from-blue-500/[0.08] via-[hsl(0_0%_11%)] to-[hsl(0_0%_11%)]'
      )}
    >
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-px opacity-50',
          filed ? 'bg-emerald-300' : 'bg-blue-300'
        )}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div
            className={cn(
              'text-[10px] font-medium uppercase tracking-[0.22em]',
              filed ? 'text-emerald-300' : 'text-blue-300'
            )}
          >
            {filed
              ? '✓ Filed in your portfolio'
              : `📁 Portfolio entry · ${proposal.category} · ready to file`}
          </div>
          <div className="mt-1.5 text-[13.5px] font-semibold text-white leading-snug">
            {proposal.title}
          </div>
          <p
            className={cn(
              'mt-1 text-[12.5px] leading-snug line-clamp-3',
              filed ? 'text-white/65' : 'text-white/85'
            )}
          >
            {proposal.description}
          </p>
          {proposal.assessment_criteria_met.length > 0 && !filed && (
            <div className="mt-2 flex items-center flex-wrap gap-1">
              {proposal.assessment_criteria_met.slice(0, 6).map((ac) => (
                <span
                  key={ac}
                  className="inline-flex items-center h-5 px-1.5 rounded-md border border-purple-300/30 bg-purple-500/[0.06] text-[10.5px] font-medium text-purple-200 font-mono"
                >
                  {ac}
                </span>
              ))}
            </div>
          )}
        </div>
        {filed ? (
          <FiledPill href="/apprentice/college-plan#portfolio" label="In portfolio" />
        ) : (
          <button
            type="button"
            onClick={onTap}
            className="shrink-0 inline-flex items-center h-8 px-3 rounded-md text-[11.5px] font-semibold text-black bg-blue-300 hover:bg-blue-200 transition-colors touch-manipulation"
          >
            Review &amp; save →
          </button>
        )}
      </div>
    </div>
  );
}

function IlpGoalProposalPanel({
  proposal,
  filed,
  onTap,
}: {
  proposal: IlpGoalProposal;
  filed: boolean;
  onTap: () => void;
}) {
  const priorityLabel =
    proposal.priority === 'high'
      ? 'High priority'
      : proposal.priority === 'low'
        ? 'Low priority'
        : 'Medium priority';
  const dateLabel = proposal.target_date
    ? new Date(proposal.target_date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      })
    : null;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border px-3.5 py-3 transition-opacity',
        filed
          ? 'border-emerald-300/30 bg-emerald-500/[0.06]'
          : 'border-amber-300/30 bg-gradient-to-br from-amber-500/[0.08] via-[hsl(0_0%_11%)] to-[hsl(0_0%_11%)]'
      )}
    >
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-px opacity-50',
          filed ? 'bg-emerald-300' : 'bg-amber-300'
        )}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div
            className={cn(
              'text-[10px] font-medium uppercase tracking-[0.22em]',
              filed ? 'text-emerald-300' : 'text-amber-300'
            )}
          >
            {filed
              ? '✓ Sent for tutor review'
              : `🎯 Proposed goal · ${priorityLabel}${dateLabel ? ` · by ${dateLabel}` : ''}`}
          </div>
          <div className="mt-1.5 text-[13.5px] font-semibold text-white leading-snug">
            {proposal.title}
          </div>
          <p
            className={cn(
              'mt-1 text-[12.5px] leading-snug line-clamp-3',
              filed ? 'text-white/65' : 'text-white/85'
            )}
          >
            {proposal.description}
          </p>
          {proposal.acceptance_criteria && !filed && (
            <p className="mt-2 text-[11.5px] text-amber-100/85 leading-snug">
              <span className="text-amber-300/85 font-medium">Done when:</span>{' '}
              {proposal.acceptance_criteria}
            </p>
          )}
        </div>
        {filed ? (
          <FiledPill href="/apprentice/college-plan#plan" label="Awaiting tutor" />
        ) : (
          <button
            type="button"
            onClick={onTap}
            className="shrink-0 inline-flex items-center h-8 px-3 rounded-md text-[11.5px] font-semibold text-black bg-amber-300 hover:bg-amber-200 transition-colors touch-manipulation"
          >
            Review &amp; send →
          </button>
        )}
      </div>
    </div>
  );
}

function PolicyProposalPanel({
  proposal,
  filed,
  onTap,
}: {
  proposal: CollegePolicyProposal;
  filed: boolean;
  onTap: () => void;
}) {
  const wordCount = proposal.content_md.trim().split(/\s+/).length;
  const ackLabel = proposal.requires_acknowledgement ? ' · staff ack' : '';
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border px-3.5 py-3 transition-opacity',
        filed
          ? 'border-emerald-300/30 bg-emerald-500/[0.06]'
          : 'border-amber-300/30 bg-gradient-to-br from-amber-500/[0.08] via-[hsl(0_0%_11%)] to-[hsl(0_0%_11%)]'
      )}
    >
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-px opacity-50',
          filed ? 'bg-emerald-300' : 'bg-amber-300'
        )}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div
            className={cn(
              'text-[10px] font-medium uppercase tracking-[0.22em]',
              filed ? 'text-emerald-300' : 'text-amber-300'
            )}
          >
            {filed
              ? '✓ Saved as draft policy'
              : `📜 Policy draft · ${proposal.category.replace(/_/g, ' ')} · ~${wordCount} words${ackLabel}`}
          </div>
          <div className="mt-1.5 text-[13.5px] font-semibold text-white leading-snug">
            {proposal.title}
          </div>
          <p
            className={cn(
              'mt-1 text-[12.5px] leading-snug line-clamp-3',
              filed ? 'text-white/65' : 'text-white/85'
            )}
          >
            {proposal.description}
          </p>
          {!filed && (proposal.code || proposal.owner_role) && (
            <div className="mt-2 flex items-center flex-wrap gap-1">
              {proposal.code && (
                <span className="inline-flex items-center h-5 px-1.5 rounded-md border border-white/[0.10] bg-white/[0.03] text-[10.5px] font-medium text-white/85 font-mono">
                  {proposal.code}
                </span>
              )}
              {proposal.owner_role && (
                <span className="inline-flex items-center h-5 px-1.5 rounded-md border border-amber-300/30 bg-amber-500/[0.06] text-[10.5px] font-medium text-amber-200">
                  {proposal.owner_role}
                </span>
              )}
            </div>
          )}
        </div>
        {filed ? (
          <FiledPill
            href={
              proposal.filed_record_id
                ? `/college/policies/${proposal.filed_record_id}`
                : '/college/policies'
            }
            label="Open draft"
          />
        ) : (
          <button
            type="button"
            onClick={onTap}
            className="shrink-0 inline-flex items-center h-8 px-3 rounded-md text-[11.5px] font-semibold text-black bg-amber-300 hover:bg-amber-200 transition-colors touch-manipulation"
          >
            Review &amp; save →
          </button>
        )}
      </div>
    </div>
  );
}

function CitationChip({ citation }: { citation: Citation }) {
  return (
    <span
      className={cn(
        'inline-flex items-center h-6 px-2 rounded-md border bg-white/[0.02] text-[11px] font-medium',
        CITATION_TONE[citation.type] ?? 'border-white/[0.10] text-white/95'
      )}
      title={citation.ref}
    >
      {citation.label}
    </span>
  );
}

function ActionButton({ action, tone }: { action: SuggestedAction; tone: Tone }) {
  const navigate = useNavigate();
  const t = TONE[tone];
  // Defence in depth — only allow internal app paths. Anything else (custom
  // schemes like quiz://… that an old/cached row may carry) is dropped.
  if (!action.href || !action.href.startsWith('/')) return null;
  return (
    <button
      type="button"
      onClick={() => navigate(action.href)}
      className={cn(
        'inline-flex items-center h-7 px-2.5 rounded-md text-[11.5px] font-semibold text-black transition-colors touch-manipulation',
        t.send,
        t.sendHover
      )}
    >
      {action.label} →
    </button>
  );
}
