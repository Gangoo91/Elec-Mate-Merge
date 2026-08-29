import React, { memo, useState } from 'react';
import {
  Zap,
  Copy,
  Check,
  BookmarkPlus,
  BookOpen,
  RotateCw,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  ClipboardList,
} from 'lucide-react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { copyToClipboard } from '@/utils/clipboard';
import { CARD_SURFACE, SURFACE_DEPTH } from '@/components/ui/card-recipe';
import { TypingIndicator } from './chat';
import { transformInlineChildren, extractVerdict } from './chat/inline-formatters';
import { VerdictCallout, ProcedureList, ProcedureStep } from './chat/answer-blocks';

interface InspectorMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
    citations?: Array<{ number: string; title: string }>;
    agentName?: string;
    imageUrl?: string;
    /**
     * This message is a generation-failure notice, not an answer. Suppresses the
     * reg-check footer badge so an outage can never read as verified guidance.
     */
    isError?: boolean;
  };
  isStreaming?: boolean;
  /** Open SaveToJobSheet for this assistant answer. */
  onSaveToJob?: () => void;
  /**
   * Scroll to / open the regulation sources attached to this message.
   * No-op if the caller hasn't wired a sources viewer.
   */
  onOpenSources?: () => void;
  /** Re-submit the question that produced this answer. */
  onRegenerate?: () => void;
  /**
   * Open the add-as-EICR-observation sheet. Passed only when the answer
   * actually commits to a classification code, so the pill stays contextual.
   */
  onAddToEicr?: () => void;
  /** Tap handler for inline regulation pills — opens the regulation detail sheet. */
  onRegClick?: (regNumber: string) => void;
  /** 'dave' adds a small avatar to assistant messages (apprentice tutor). */
  variant?: 'default' | 'dave';
  /**
   * Thumbs rating for this answer. When provided, the footer renders the
   * up/down controls at the end of the actions row — they belong to the
   * answer, not floating on the page beneath it.
   */
  onFeedback?: (rating: 'positive' | 'negative') => void;
  /** Rating already given (disables further votes and marks the choice). */
  feedback?: 'positive' | 'negative';
  /**
   * One-tap "what went wrong" after a thumbs-down. Chips render while this is
   * set and the vote is negative; the parent hides them once a reason lands.
   */
  onFeedbackReason?: (reason: string) => void;
}

/** Why a thumbs-down — one tap, no typing. Order: most diagnosable first. */
const FEEDBACK_REASONS = [
  'Wrong regulation',
  "Didn't answer the question",
  'Out of date',
  'Too long',
] as const;

/**
 * InspectorMessage — the answer as a volt document.
 *
 * User messages: right-aligned pill on the shared card material (diagonal
 * white ramp + inset highlight). No yellow tint — a translucent volt wash
 * renders olive-brown on this ground.
 *
 * Assistant messages: a full-width answer card in the app's volt language —
 * card-recipe surface, volt /35 edge with the 1px volt hairline catching the
 * top, edge-to-edge on phones. The verdict leads in display weight; headings,
 * lists, code and tables are styled to read as a document, and the actions
 * live inside the card's own footer.
 */
export const InspectorMessage = memo(
  function InspectorMessage({
    message,
    isStreaming,
    onSaveToJob,
    onOpenSources,
    onRegenerate,
    onAddToEicr,
    onRegClick,
    variant = 'default',
    onFeedback,
    feedback,
    onFeedbackReason,
  }: InspectorMessageProps) {
    const [copied, setCopied] = useState(false);
    const [showWorking, setShowWorking] = useState(false);
    const isUser = message.role === 'user';
    const isError = !!message.isError;

    const handleCopy = async () => {
      if (message.content) {
        await copyToClipboard(message.content);
        setCopied(true);
        toast.success('Copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
      }
    };

    // User message
    if (isUser) {
      return (
        <div className="flex justify-end w-full">
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[92%] sm:max-w-[75%] min-w-0 space-y-2"
          >
            {message.imageUrl && (
              <div className="rounded-2xl overflow-hidden ml-auto border border-white/[0.06]">
                <img
                  src={message.imageUrl}
                  alt="Attached"
                  className="max-w-full max-h-40 sm:max-h-48 object-cover"
                />
              </div>
            )}
            <div
              className={cn(
                'rounded-2xl border border-white/[0.16] px-3.5 py-3 text-white sm:px-4',
                'bg-gradient-to-br from-white/[0.14] via-white/[0.09] to-white/[0.06]',
                SURFACE_DEPTH
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
        </div>
      );
    }

    // Strip any ---FOLLOWUP--- block from display (rendered as chips below)
    let displayContent = message.content
      .replace(/---FOLLOWUP---[\s\S]*?(?:---END_FOLLOWUP---|$)/g, '')
      .trim();

    if (isStreaming) {
      displayContent = displayContent
        .replace(/\n-{2,3}(?:F(?:O(?:L(?:L(?:O(?:W(?:U(?:P(?:-{0,3})?)?)?)?)?)?)?)?)?$/, '')
        .trim();
    }

    // Pull the verdict line off the top (e.g. "**Verdict:** 4mm² minimum CPC…").
    // Hidden while streaming the first tokens — pops in once the full first line arrives.
    const { verdict, body: rawBody } = extractVerdict(displayContent);
    const inlineCtx = { onRegClick };

    // On-site answer architecture: the number first, the working folded.
    // "## Key figures" bullets render as a spec strip; "## Working" collapses
    // behind a Show-working control. Both extractions run post-stream only —
    // restructuring text mid-stream would make the answer jump around.
    let keyFigures: { label: string; value: string; source?: string }[] = [];
    let workingSection: string | null = null;
    let markdownBody = rawBody;
    if (!isStreaming) {
      const figMatch = markdownBody.match(/^## Key figures\s*\n([\s\S]*?)(?=\n## |\s*$)/m);
      if (figMatch) {
        const parsed = figMatch[1]
          .split('\n')
          .map((line) => line.match(/^\s*[-*]\s*\*\*(.+?):?\*\*:?\s*(.+?)(?:\s+—\s+(.+))?\s*$/))
          .filter(Boolean)
          .map((m) => ({ label: m![1].trim(), value: m![2].trim(), source: m![3]?.trim() }));
        if (parsed.length > 0) {
          keyFigures = parsed.slice(0, 4);
          markdownBody = markdownBody.replace(figMatch[0], '').trim();
        }
      }
      const workMatch = markdownBody.match(/\n?## Working\s*\n([\s\S]*?)(?=\n## |\s*$)/);
      if (workMatch && workMatch[1].trim().length > 0) {
        workingSection = workMatch[1].trim();
        markdownBody = markdownBody.replace(workMatch[0], '\n').trim();
      }
    }

    return (
      <div className="flex justify-start w-full text-left min-w-0">
        {/* No max-w cap — the transcript column (and the sources rail beside
            it) set the measure; a 4xl cap left dead space inside the column. */}
        <div
          className="w-full min-w-0"
          style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
        >
          {/*
            The answer document. Card-recipe material with the volt /35 edge and
            the 1px volt hairline catching the top — the same object as a hub
            card, because it is the same product. Edge-to-edge on phones
            (border-y only), inset and rounded from sm: up. The -mx-4 relies on
            the parent transcript column padding being px-4.
          */}
          <div
            className={cn(
              'relative overflow-hidden space-y-3',
              '-mx-4 rounded-none border-y border-elec-yellow/35 px-4 py-4',
              'sm:mx-0 sm:rounded-2xl sm:border-x sm:px-6 sm:py-5',
              CARD_SURFACE
            )}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0"
            />
          {/* Eyebrow — editorial; Dave variant adds a small avatar for identity */}
          <div className="flex items-center gap-2.5">
            {variant === 'dave' && (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-elec-yellow shadow-sm">
                <Zap className="h-3.5 w-3.5 text-black" strokeWidth={2.5} />
              </span>
            )}
            <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em]">
              <span className="text-elec-yellow">{message.agentName || 'Elec-AI'}</span>
              {/* Never badge a failure with the standard rev — it reads as guidance */}
              {isError ? (
                <span className="inline-flex items-center gap-1.5 text-white">
                  <AlertTriangle className="h-3 w-3" />
                  Couldn&rsquo;t answer
                </span>
              ) : (
                <span className="text-white">BS 7671 A4:2026</span>
              )}
              {isStreaming && (
                <span className="text-white normal-case tracking-normal">composing…</span>
              )}
            </div>
          </div>

          {/* Prose block — no bubble chrome */}
          <motion.div initial={false} animate={{ opacity: 1 }} className="relative">
            {isStreaming && !displayContent ? (
              <TypingIndicator label="Composing" />
            ) : (
              <div className="inspector-message prose prose-sm sm:prose-base max-w-none text-left">
                {verdict && (
                  <VerdictCallout>
                    {transformInlineChildren(verdict, inlineCtx, 'verdict')}
                  </VerdictCallout>
                )}

                {/* Key figures — the numbers a spark needs, scannable in one glance */}
                {/*
                  Key figures and the Working toggle are only extracted once the
                  stream ends (restructuring mid-stream made the text jump
                  around). That means the answer visibly re-lays-out the instant
                  streaming stops — most noticeable on a wide desktop column,
                  where a bullet list becomes a four-tile grid in one frame.
                  Fading the new blocks in makes that read as the answer settling
                  rather than a jolt. Prose reflows instantly as before; only the
                  newly-appearing structure is animated.
                */}
                {keyFigures.length > 0 && (
                  /*
                    HubKpi's phone rule applies here too: phones get ROWS, not
                    cards. A 2-col tile grid at 390px gave a single figure a
                    half-width tile floating beside dead space, and a long
                    source line ("Table 41.3 (Cmin = 0.95…)") stacked the tile
                    three lines tall. One bordered strip, label left / figure
                    right, reads in a glance one-handed. Tiles return from sm:
                    where there is room for them.
                  */
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="not-prose my-4"
                  >
                    <div className="divide-y divide-white/[0.10] overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] sm:hidden">
                      {keyFigures.map((f) => (
                        <div key={f.label} className="flex items-center justify-between gap-3 px-3.5 py-2.5">
                          <div className="min-w-0">
                            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-white">
                              {f.label}
                            </div>
                            {f.source && (
                              <div className="mt-0.5 text-[10.5px] font-medium text-elec-yellow">
                                {f.source}
                              </div>
                            )}
                          </div>
                          <div className="shrink-0 text-[19px] font-semibold leading-tight text-white tabular-nums tracking-tight">
                            {f.value}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="hidden gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-4">
                      {keyFigures.map((f) => (
                        <div
                          key={f.label}
                          className="rounded-xl border border-white/[0.12] bg-white/[0.06] px-3.5 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
                        >
                          <div className="text-[19px] font-semibold leading-tight text-white tabular-nums tracking-tight">
                            {f.value}
                          </div>
                          <div className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.08em] text-white">
                            {f.label}
                          </div>
                          {f.source && (
                            <div className="mt-0.5 text-[10.5px] font-medium text-elec-yellow">{f.source}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-xl sm:text-2xl font-semibold mt-6 mb-3 first:mt-0 text-white tracking-tight leading-tight">
                        {transformInlineChildren(children, inlineCtx, 'h1')}
                      </h1>
                    ),
                    /* Hierarchy from type and a quiet rule, like every hub
                       section — the old volt gradient stripe before every H2
                       put five accent bars in one answer, which is exactly the
                       decoration the design language dropped. */
                    h2: ({ children }) => (
                      <h2 className="border-t border-white/[0.10] text-lg sm:text-xl font-semibold mt-7 pt-5 mb-3 first:mt-0 first:pt-0 first:border-t-0 text-white tracking-tight">
                        {transformInlineChildren(children, inlineCtx, 'h2')}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-base sm:text-lg font-semibold mt-5 mb-2 first:mt-0 text-white tracking-tight">
                        {transformInlineChildren(children, inlineCtx, 'h3')}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-[14.5px] leading-relaxed my-3 text-white">
                        {transformInlineChildren(children, inlineCtx, 'p')}
                      </p>
                    ),
                    // Suppress markdown horizontal rules — we already
                    // draw a gold gradient stripe before every H2, so an
                    // additional `---` line would double the divider.
                    hr: () => null,
                    ul: ({ children }) => (
                      <ul className="my-3 ml-5 space-y-1.5 list-disc marker:text-elec-yellow">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => {
                      // Render numbered lists as a tap-to-tick procedure card —
                      // fall back to a plain ol if children aren't <li>.
                      const items = React.Children.toArray(children).filter((c) =>
                        React.isValidElement(c)
                      ) as React.ReactElement<{ children?: React.ReactNode }>[];
                      if (items.length === 0) {
                        return (
                          <ol className="my-3 ml-5 space-y-1.5 list-decimal marker:text-elec-yellow marker:font-semibold">
                            {children}
                          </ol>
                        );
                      }
                      return (
                        <ProcedureList>
                          {items.map((item, i) => (
                            <ProcedureStep key={i} number={i + 1}>
                              {transformInlineChildren(item.props.children, inlineCtx, `step-${i}`)}
                            </ProcedureStep>
                          ))}
                        </ProcedureList>
                      );
                    },
                    li: ({ children }) => (
                      <li className="text-[14.5px] leading-relaxed text-white">
                        {transformInlineChildren(children, inlineCtx, 'li')}
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-white">{children}</strong>
                    ),
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-elec-yellow underline decoration-elec-yellow/50 underline-offset-2 hover:decoration-elec-yellow"
                      >
                        {children}
                      </a>
                    ),
                    code: ({ className, children }) => {
                      const isInline = !className;
                      if (isInline) {
                        return (
                          /* em, not px: this renders inside bullets, headings
                             and the verdict, and a fixed 13px mono read LARGER
                             than the 14.5px prose around it (mono glyphs are
                             wider), which made every figure shout.
                             NO whitespace-nowrap: the model sometimes puts a
                             whole phrase in backticks, and an unwrappable chip
                             stretched the card's content past its clip edge —
                             every line to the right of it was cut off. */
                          <code className="bg-white/[0.06] text-elec-yellow px-1 py-0.5 rounded text-[0.92em] font-mono border border-white/[0.08] [overflow-wrap:anywhere]">
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code
                          className={cn(
                            /* Recessed against the card's lit surface — a solid
                               near-black block inside the gradient read as a
                               hole punched in the card. */
                            'block bg-black/35 rounded-xl p-4 my-3 text-[13px] font-mono overflow-x-auto',
                            'border border-white/[0.08] text-white',
                            className
                          )}
                        >
                          {children}
                        </code>
                      );
                    },
                    blockquote: ({ children }) => (
                      <blockquote className="my-4 pl-4 border-l-2 border-elec-yellow text-white text-[14px] leading-relaxed italic">
                        {transformInlineChildren(children, inlineCtx, 'bq')}
                      </blockquote>
                    ),
                    /* Spec tables carry the densest information in an answer,
                       and they were the darkest thing on the page — a near-black
                       body inside a near-invisible border. Brighter surface,
                       zebra rows so the eye tracks across, and a header that
                       stays put when the table scrolls. */
                    table: ({ children }) => (
                      <div className="my-4 -mx-4 overflow-x-auto rounded-none border-y border-white/[0.14] bg-white/[0.05] sm:mx-0 sm:rounded-2xl sm:border-x">
                        <table className="w-full min-w-[420px] text-[13.5px]">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="border-b border-white/[0.14] bg-white/[0.09]">
                        {children}
                      </thead>
                    ),
                    th: ({ children }) => (
                      <th className="whitespace-nowrap px-3.5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-white sm:px-4">
                        {children}
                      </th>
                    ),
                    tbody: ({ children }) => (
                      /* Zebra striping beats a hairline rule per row: on a phone
                         a long value wraps to two lines and the rules stop
                         telling you which row you are on. */
                      <tbody className="[&>tr:nth-child(even)]:bg-white/[0.035]">{children}</tbody>
                    ),
                    td: ({ children }) => (
                      <td className="border-t border-white/[0.08] px-3.5 py-2.5 align-top text-white first:font-medium sm:px-4">
                        {transformInlineChildren(children, inlineCtx, 'td')}
                      </td>
                    ),
                  }}
                >
                  {markdownBody}
                </ReactMarkdown>

                {/* Working — folded by default; the number came first above.
                    Fades in with the same timing as the figures grid so the
                    whole post-stream restructure settles as one motion. */}
                {workingSection && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut', delay: 0.04 }}
                    className="not-prose my-4"
                  >
                    <button
                      type="button"
                      onClick={() => setShowWorking((v) => !v)}
                      className="h-11 text-[12.5px] font-medium text-elec-yellow transition-colors touch-manipulation sm:h-auto"
                    >
                      {showWorking ? 'Hide working' : 'Show working'}
                    </button>
                    {showWorking && (
                      <div className="mt-3 rounded-xl border border-white/[0.10] bg-black/25 px-4 py-3">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => (
                              <p className="text-[13.5px] leading-relaxed my-2 text-white">
                                {transformInlineChildren(children, inlineCtx, 'wp')}
                              </p>
                            ),
                            li: ({ children }) => (
                              <li className="text-[13.5px] leading-relaxed text-white">
                                {transformInlineChildren(children, inlineCtx, 'wli')}
                              </li>
                            ),
                            code: ({ children }) => (
                              <code className="bg-white/[0.06] text-elec-yellow px-1.5 py-0.5 rounded text-[12.5px] font-mono">
                                {children}
                              </code>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold text-white">{children}</strong>
                            ),
                          }}
                        >
                          {workingSection}
                        </ReactMarkdown>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Streaming cursor */}
                <AnimatePresence>
                  {isStreaming && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="inline-block w-0.5 h-5 ml-0.5 bg-elec-yellow rounded-full align-middle animate-[blink_0.8s_ease-in-out_infinite]"
                    />
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Footer actions — real tap targets, not text links (44px on mobile) */}
          {!isStreaming && message.content && (
            <div className="mt-1 space-y-2.5 border-t border-white/[0.10] pt-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  aria-label={copied ? 'Copied to clipboard' : 'Copy answer'}
                  className={cn(
                    'inline-flex h-11 items-center gap-1.5 rounded-full border px-3.5 text-[12.5px] font-medium',
                    'touch-manipulation transition-colors active:scale-[0.97] [-webkit-tap-highlight-color:transparent]',
                    'sm:h-9',
                    copied
                      ? 'border-emerald-400/30 bg-emerald-400/15 text-emerald-300'
                      : 'border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/[0.10] hover:border-white/[0.22]'
                  )}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                {onSaveToJob && (
                  <button
                    onClick={onSaveToJob}
                    aria-label="Save answer to a job"
                    className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] px-3.5 text-[12.5px] font-medium text-white touch-manipulation transition-colors hover:bg-white/[0.10] hover:border-white/[0.22] active:scale-[0.97] [-webkit-tap-highlight-color:transparent] sm:h-9"
                  >
                    <BookmarkPlus className="h-3.5 w-3.5" />
                    Save to job
                  </button>
                )}
                {onOpenSources && (
                  <button
                    onClick={onOpenSources}
                    aria-label="Open cited regulation sources"
                    className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] px-3.5 text-[12.5px] font-medium text-white touch-manipulation transition-colors hover:bg-white/[0.10] hover:border-white/[0.22] active:scale-[0.97] [-webkit-tap-highlight-color:transparent] sm:h-9"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    Sources
                  </button>
                )}
                {onAddToEicr && (
                  <button
                    onClick={onAddToEicr}
                    aria-label="Add this finding to an EICR as an observation"
                    className="inline-flex h-11 items-center gap-1.5 rounded-full border border-elec-yellow/40 bg-white/[0.06] px-3.5 text-[12.5px] font-medium text-white touch-manipulation transition-colors hover:bg-white/[0.10] hover:border-elec-yellow/70 active:scale-[0.97] [-webkit-tap-highlight-color:transparent] sm:h-9"
                  >
                    <ClipboardList className="h-3.5 w-3.5 text-elec-yellow" />
                    Add to EICR
                  </button>
                )}
                {onRegenerate && (
                  <button
                    onClick={onRegenerate}
                    aria-label={isError ? 'Try again' : 'Regenerate answer'}
                    className={cn(
                      'inline-flex h-11 items-center gap-1.5 rounded-full px-3.5 text-[12.5px] font-medium',
                      'touch-manipulation transition-colors active:scale-[0.97] [-webkit-tap-highlight-color:transparent] sm:h-9',
                      isError
                        ? 'border border-elec-yellow bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90'
                        : 'border border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/[0.10] hover:border-white/[0.22]'
                    )}
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                    {isError ? 'Try again' : 'Regenerate'}
                  </button>
                )}

                {/* Thumbs — part of the answer's own footer, end of the row.
                    Full-strength icons on the same pill material as the other
                    actions; the chosen thumb goes solid volt (or red for a
                    flag), the other one steps back. */}
                {onFeedback && !isError && (
                  <div className="ml-auto flex items-center gap-1.5 pl-2">
                    <button
                      type="button"
                      onClick={() => onFeedback('positive')}
                      disabled={!!feedback}
                      aria-label="Good answer"
                      className={cn(
                        'inline-flex h-11 w-11 items-center justify-center rounded-full border',
                        'touch-manipulation transition-all active:scale-[0.94] [-webkit-tap-highlight-color:transparent] sm:h-9 sm:w-9',
                        feedback === 'positive'
                          ? 'border-elec-yellow bg-elec-yellow text-black'
                          : 'border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/[0.10] hover:border-white/[0.22]',
                        feedback === 'negative' && 'opacity-35'
                      )}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onFeedback('negative')}
                      disabled={!!feedback}
                      aria-label="Wrong or unhelpful answer"
                      className={cn(
                        'inline-flex h-11 w-11 items-center justify-center rounded-full border',
                        'touch-manipulation transition-all active:scale-[0.94] [-webkit-tap-highlight-color:transparent] sm:h-9 sm:w-9',
                        feedback === 'negative'
                          ? 'border-red-400/40 bg-red-400/15 text-red-300'
                          : 'border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/[0.10] hover:border-white/[0.22]',
                        feedback === 'positive' && 'opacity-35'
                      )}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* "What went wrong?" — appears only after a thumbs-down, and
                  only until a reason lands. One tap; no typing on site. */}
              <AnimatePresence>
                {feedback === 'negative' && onFeedbackReason && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="mr-1 text-[12.5px] font-medium text-white">
                        What went wrong?
                      </span>
                      {FEEDBACK_REASONS.map((reason) => (
                        <button
                          key={reason}
                          type="button"
                          onClick={() => onFeedbackReason(reason)}
                          className="inline-flex h-9 items-center rounded-full border border-white/[0.12] bg-white/[0.06] px-3 text-[12px] font-medium text-white transition-colors hover:border-elec-yellow/40 hover:bg-white/[0.10] active:scale-[0.97] touch-manipulation [-webkit-tap-highlight-color:transparent]"
                        >
                          {reason}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/*
                Provenance line. Three states, and the distinction matters:
                the verifier checks that cited reg NUMBERS exist — it does not
                validate formulae or earthing-system logic. Claiming "citations
                verified" overstated that, so the wording is deliberately narrow.
                On a failure we say nothing at all.
              */}
              {!isError &&
                (message.content.includes('⚠️ **Citation check:**') ? (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                    <AlertTriangle className="h-3 w-3" />
                    Check citations before relying on this
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Reg numbers checked · BS 7671 A4:2026
                  </span>
                ))}
            </div>
          )}
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.isStreaming !== nextProps.isStreaming) return false;
    if (nextProps.isStreaming) return false;
    return (
      prevProps.message.content === nextProps.message.content &&
      prevProps.message.role === nextProps.message.role &&
      // Must be compared: the error flag lands in the same state update as the
      // final content, and if that content is unchanged the footer would keep
      // showing the verified badge on a failed answer.
      prevProps.message.isError === nextProps.message.isError &&
      // Same reason: a vote changes nothing but this prop, and without the
      // comparison the thumb never lights up.
      prevProps.feedback === nextProps.feedback &&
      // Presence flip (fn → undefined) is how the parent dismisses the
      // reason chips once a reason lands.
      !!prevProps.onFeedbackReason === !!nextProps.onFeedbackReason
    );
  }
);

export default InspectorMessage;
