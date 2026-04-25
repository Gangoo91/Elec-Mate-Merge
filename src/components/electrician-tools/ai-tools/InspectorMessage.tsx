import React, { memo, useState } from 'react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { copyToClipboard } from '@/utils/clipboard';
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
  /** Tap handler for inline regulation pills — opens the regulation detail sheet. */
  onRegClick?: (regNumber: string) => void;
}

/**
 * InspectorMessage — Editorial AI response block.
 *
 * User messages: soft yellow pill (`bg-elec-yellow/10`), right-aligned.
 * Assistant messages: full-width prose, no chrome, no avatar tile.
 * Headings, lists, code and block-quotes are styled to feel like an article.
 * A small "Elec-AI · BS 7671 A4:2026" eyebrow sits above the prose.
 */
export const InspectorMessage = memo(
  function InspectorMessage({
    message,
    isStreaming,
    onSaveToJob,
    onOpenSources,
    onRegenerate,
    onRegClick,
  }: InspectorMessageProps) {
    const [copied, setCopied] = useState(false);
    const isUser = message.role === 'user';

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
            <div className="rounded-2xl px-3.5 py-3 sm:px-4 bg-elec-yellow/10 border border-elec-yellow/20 text-white">
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
    const { verdict, body: markdownBody } = extractVerdict(displayContent);
    const inlineCtx = { onRegClick };

    return (
      <div className="flex justify-start w-full text-left min-w-0">
        <div
          className="w-full max-w-4xl space-y-3 min-w-0"
          style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
        >
          {/* Eyebrow — no avatar tile, editorial */}
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em]">
            <span className="text-elec-yellow">{message.agentName || 'Elec-AI'}</span>
            <span className="text-white">BS 7671 A4:2026</span>
            {isStreaming && (
              <span className="text-white normal-case tracking-normal">composing…</span>
            )}
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
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-xl sm:text-2xl font-semibold mt-6 mb-3 first:mt-0 text-white tracking-tight leading-tight">
                        {transformInlineChildren(children, inlineCtx, 'h1')}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-lg sm:text-xl font-semibold mt-6 mb-3 first:mt-0 text-white tracking-tight">
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
                    ul: ({ children }) => (
                      <ul className="my-3 ml-5 space-y-1.5 list-disc marker:text-elec-yellow/70">
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
                          <ol className="my-3 ml-5 space-y-1.5 list-decimal marker:text-elec-yellow/70 marker:font-semibold">
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
                        className="text-elec-yellow underline-offset-2 hover:underline"
                      >
                        {children}
                      </a>
                    ),
                    code: ({ className, children }) => {
                      const isInline = !className;
                      if (isInline) {
                        return (
                          <code className="bg-white/[0.06] text-elec-yellow px-1.5 py-0.5 rounded text-[13px] font-mono border border-white/[0.08]">
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code
                          className={cn(
                            'block bg-[hsl(0_0%_9%)] rounded-xl p-4 my-3 text-[13px] font-mono overflow-x-auto',
                            'border border-white/[0.08] text-white',
                            className
                          )}
                        >
                          {children}
                        </code>
                      );
                    },
                    blockquote: ({ children }) => (
                      <blockquote className="my-4 pl-4 border-l-2 border-elec-yellow/60 text-white text-[14px] leading-relaxed italic">
                        {transformInlineChildren(children, inlineCtx, 'bq')}
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
                      <td className="px-3 py-2 border-t border-white/[0.06] text-white">
                        {transformInlineChildren(children, inlineCtx, 'td')}
                      </td>
                    ),
                  }}
                >
                  {markdownBody}
                </ReactMarkdown>

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

          {/* Text-only footer actions */}
          {!isStreaming && message.content && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
              <button
                onClick={handleCopy}
                className="font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
              {onSaveToJob && (
                <button
                  onClick={onSaveToJob}
                  className="font-medium text-white hover:text-white transition-colors touch-manipulation"
                >
                  Save to job
                </button>
              )}
              {onOpenSources && (
                <button
                  onClick={onOpenSources}
                  className="font-medium text-white hover:text-white transition-colors touch-manipulation"
                >
                  Open sources
                </button>
              )}
              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="font-medium text-white hover:text-white transition-colors touch-manipulation"
                >
                  Regenerate
                </button>
              )}
              <span className="uppercase tracking-[0.18em] text-white">
                Cited from BS 7671 A4:2026
              </span>
            </div>
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.isStreaming !== nextProps.isStreaming) return false;
    if (nextProps.isStreaming) return false;
    return (
      prevProps.message.content === nextProps.message.content &&
      prevProps.message.role === nextProps.message.role
    );
  }
);

export default InspectorMessage;
