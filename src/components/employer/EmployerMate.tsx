import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import jsPDF from 'jspdf';
import { getBrandColour, ensureSpace, addAccentBar } from '@/utils/pdfBrand';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import {
  Sparkles,
  ArrowUp,
  X,
  Loader2,
  Copy,
  Check,
  FileDown,
  RotateCcw,
  History,
  ChevronLeft,
} from 'lucide-react';

interface MateAuditEntry {
  id: string;
  action: string;
  entity: string;
  detail: Record<string, unknown> | null;
  created_at: string;
}

/** "add · team" → "Added team member", best-effort from the audit row. */
function describeAuditEntry(e: MateAuditEntry): string {
  const name =
    (e.detail && (e.detail.name || e.detail.title || e.detail.client || e.detail.number)) || '';
  const entity = (e.entity || '').replace(/_/g, ' ');
  const action = (e.action || '').replace(/_/g, ' ');
  return `${action} ${entity}${name ? ` — ${String(name)}` : ''}`.trim();
}

const markdownClass =
  'text-[14px] leading-[1.55] text-white/90 [&_h1]:text-[15px] [&_h1]:font-semibold [&_h1]:text-white [&_h1]:mt-3 [&_h2]:text-[14.5px] [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-3 [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-2.5 [&_p]:my-1.5 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:my-1.5 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:my-1.5 [&_li]:mt-0.5 [&_strong]:text-white [&_strong]:font-semibold [&_a]:text-elec-yellow [&_a]:underline [&_code]:text-elec-yellow [&_code]:text-[12.5px]';

/** Plain-text export of an answer as a tidy A4 PDF. */
function downloadPdf(text: string) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 48;
  const lineHeight = 15;
  const brand = getBrandColour();
  const pageW = doc.internal.pageSize.getWidth();
  const width = pageW - margin * 2;
  addAccentBar(doc, brand, 6);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(brand[0], brand[1], brand[2]);
  doc.text('Employer Mate', margin, margin);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(130);
  doc.text('Elec-Mate — business advice', margin, margin + 15);
  doc.setTextColor(25);
  doc.setFontSize(11);
  const clean = text
    .replace(/\*\*/g, '')
    .replace(/^#{1,6}\s/gm, '')
    .replace(/^[-*]\s/gm, '•  ')
    // GFM tables: drop separator rows, turn cell pipes into readable spacing.
    .replace(/^\s*\|?[\s:|-]+\|[\s:|-]*$/gm, '')
    .replace(/^\s*\|\s*/gm, '')
    .replace(/\s*\|\s*$/gm, '')
    .replace(/\s*\|\s*/g, '   ·   ')
    .replace(/\n{3,}/g, '\n\n');
  const lines = doc.splitTextToSize(clean, width) as string[];
  let y = margin + 40;
  for (const line of lines) {
    y = ensureSpace(doc, y, lineHeight, { bottomMargin: margin, topAfterBreak: margin });
    doc.text(line, margin, y);
    y += lineHeight;
  }
  doc.save('employer-mate-advice.pdf');
}

type Msg = { role: 'user' | 'assistant'; content: string };

/**
 * The discoverable Hub entry point — a prominent card on the Employer Hub
 * overview that opens Employer Mate.
 */
export function MateEntryCard({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-full text-left rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/[0.14] px-4 py-4 sm:px-5 sm:py-5 touch-manipulation transition-colors active:scale-[0.995]"
    >
      <div className="flex items-center gap-3.5">
        <div className="h-10 w-10 shrink-0 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-elec-yellow" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[15px] font-semibold text-white">Employer Mate</p>
            <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-elec-yellow/80 border border-elec-yellow/30 rounded-full px-1.5 py-0.5">
              AI partner
            </span>
          </div>
          <p className="mt-0.5 text-[12.5px] text-white/60">
            Ask about costing, tendering, hiring &amp; cashflow — grounded in the standards and your
            live numbers.
          </p>
        </div>
        <span className="text-elec-yellow/70 text-[15px] group-hover:translate-x-0.5 transition-transform shrink-0">
          →
        </span>
      </div>
    </button>
  );
}

const SUGGESTIONS = [
  'How much retention can a main contractor hold?',
  "What's the VAT reverse charge and when does it apply?",
  'How do I price a domestic consumer unit change?',
  'When is electrical work notifiable under Part P?',
];

/**
 * Employer Mate — the firm owner's AI partner. Omnipresent across the Employer
 * Hub; advice is grounded in Elec-Mate's authoritative employer knowledge base
 * via the employer-ai-assistant edge function. Page-aware (passes the active section).
 */
export function EmployerMate({
  pageContext,
  open: controlledOpen,
  onOpenChange,
  showLauncher = true,
  initialQuery,
}: {
  pageContext?: string;
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
  showLauncher?: boolean;
  initialQuery?: string;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  // The question behind a failed answer — lets the user retry in one tap.
  const [retryQ, setRetryQ] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Activity view: what Mate has actually done to the firm (employer_audit_log)
  const [showActivity, setShowActivity] = useState(false);
  const [activity, setActivity] = useState<MateAuditEntry[] | null>(null);
  const [activityError, setActivityError] = useState(false);

  useEffect(() => {
    if (!showActivity) return;
    let cancelled = false;
    (async () => {
      setActivityError(false);
      // Only Mate-authored rows: the assistant logs action='create' (with a
      // name in detail) or action='delete' + detail.via='mate'. The same table
      // also collects generic DB-trigger rows (raw insert/update on
      // employer_employees etc.) which are NOT Mate's doing — exclude them.
      const { data, error } = await supabase
        .from('employer_audit_log')
        .select('id, action, entity, detail, created_at')
        .or('action.eq.create,detail->>via.eq.mate')
        .order('created_at', { ascending: false })
        .limit(30);
      if (cancelled) return;
      if (error) {
        setActivityError(true);
        setActivity([]);
      } else {
        setActivity((data ?? []) as MateAuditEntry[]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [showActivity]);

  const copy = (text: string, idx: number) => {
    navigator.clipboard?.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx((c) => (c === idx ? null : c)), 1600);
  };

  useEffect(() => {
    // showActivity dep: while the activity view is open the messages pane is
    // display:none (scroll position is lost) — re-pin to bottom on return.
    if (showActivity) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, sending, showActivity]);

  // Pre-fill a question handed in from the ⌘K palette when the sheet opens.
  useEffect(() => {
    if (open && initialQuery) setInput(initialQuery);
  }, [open, initialQuery]);

  // Replace the (empty/failed) assistant message at the end of the thread.
  const setLastAssistant = (content: string) => {
    setMessages((m) => {
      const copy = [...m];
      copy[copy.length - 1] = { role: 'assistant', content };
      return copy;
    });
  };

  // Stream an answer for `q`, where `history` already ends with the user turn.
  const stream = async (q: string, history: Msg[]) => {
    setSending(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.access_token) {
        // No session token — sending the anon key would just 401. Ask the
        // owner to sign back in instead of surfacing a generic failure.
        setLastAssistant('Your session has expired — sign in again to keep chatting with Mate.');
        return;
      }
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/employer-ai-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ messages: history, page_context: pageContext }),
      });
      if (!resp.ok || !resp.body) throw new Error('request failed');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setLastAssistant(acc);
      }
      if (!acc.trim()) {
        setLastAssistant("I couldn't answer that — try rephrasing.");
        setRetryQ(q);
      }
    } catch {
      setLastAssistant('Something went wrong reaching Mate.');
      setRetryQ(q);
    } finally {
      setSending(false);
    }
  };

  const send = async (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || sending) return;
    setInput('');
    setRetryQ(null);
    const next = [...messages, { role: 'user' as const, content: q }];
    // Add the user message + an empty assistant message we stream into.
    setMessages([...next, { role: 'assistant', content: '' }]);
    await stream(q, next);
  };

  // Re-ask the failed question: keep the user turn, re-stream the answer.
  const retry = async () => {
    if (!retryQ || sending) return;
    const base =
      messages[messages.length - 1]?.role === 'assistant' ? messages.slice(0, -1) : messages;
    setRetryQ(null);
    setMessages([...base, { role: 'assistant', content: '' }]);
    await stream(retryQ, base);
  };

  return (
    <>
      {/* Floating launcher — present on every Employer Hub page */}
      {showLauncher && !open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ask Employer Mate"
          className="fixed bottom-20 right-4 z-40 sm:bottom-6 flex items-center gap-2 h-11 pl-3 pr-4 rounded-full bg-elec-yellow text-black font-semibold text-[13px] shadow-lg shadow-black/30 touch-manipulation active:scale-95 transition-transform"
        >
          <Sparkles className="h-4 w-4" />
          Ask Mate
        </button>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          hideCloseButton
          className="h-[88vh] [height:88dvh] p-0 rounded-t-2xl overflow-hidden border-elec-gray bg-background lg:left-64"
        >
          <div className="flex flex-col h-full">
            <SheetDescription className="sr-only">
              Chat with Employer Mate, your AI business partner for the firm.
            </SheetDescription>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-elec-yellow" />
                <SheetTitle className="text-[14px] font-semibold text-white">
                  Employer Mate
                </SheetTitle>
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                  Business partner
                </span>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setShowActivity((s) => !s)}
                  aria-label={showActivity ? 'Back to chat' : 'Mate activity'}
                  className="h-11 w-11 -my-2 flex items-center justify-center rounded-full text-white/60 hover:text-white touch-manipulation"
                >
                  {showActivity ? <ChevronLeft className="h-4 w-4" /> : <History className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="h-11 w-11 -my-2 -mr-2 flex items-center justify-center rounded-full text-white/60 hover:text-white touch-manipulation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {showActivity && (
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
                <p className="text-[15px] font-semibold text-white">What Mate has done</p>
                <p className="mt-1 text-[12.5px] text-white/55">
                  Every action Mate takes on your firm is recorded here. Say “undo” in the chat
                  to reverse something it created.
                </p>
                {activity === null && !activityError && (
                  <div className="mt-6 flex justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-white/40" />
                  </div>
                )}
                {activityError && (
                  <p className="mt-4 text-[13px] text-red-400/90">
                    Couldn’t load the activity log — try again in a moment.
                  </p>
                )}
                {activity !== null && !activityError && activity.length === 0 && (
                  <p className="mt-4 text-[13px] text-white/45">
                    Nothing yet — when Mate adds team members, raises quotes or creates jobs for
                    you, each action lands here.
                  </p>
                )}
                <div className="mt-4 space-y-2">
                  {(activity ?? []).map((e) => (
                    <div
                      key={e.id}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5"
                    >
                      <p className="text-[13px] text-white/85 capitalize">{describeAuditEntry(e)}</p>
                      <p className="mt-0.5 text-[11px] text-white/40">
                        {new Date(e.created_at).toLocaleString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div
              ref={scrollRef}
              className={`flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4 ${showActivity ? 'hidden' : ''}`}
            >
              {messages.length === 0 && (
                <div className="pt-6">
                  <p className="text-[15px] font-semibold text-white">Ask me about your firm.</p>
                  <p className="mt-1 text-[12.5px] text-white/55">
                    Costing, tendering, contracts, CIS &amp; VAT, hiring — grounded in the
                    standards, and aware of your live jobs, invoices and team.
                  </p>
                  <div className="mt-4 space-y-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] text-[12.5px] text-white/80 touch-manipulation"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) =>
                m.role === 'assistant' && !m.content ? null : m.role === 'user' ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap bg-elec-yellow text-black font-medium">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-3"
                  >
                    <div className={markdownClass}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                    </div>
                    {!(sending && i === messages.length - 1) &&
                      (retryQ && i === messages.length - 1 ? (
                        <div className="mt-2.5 flex items-center gap-1 border-t border-white/[0.06] pt-2">
                          <button
                            type="button"
                            onClick={retry}
                            className="flex items-center gap-1.5 h-11 -my-1.5 px-3 rounded-lg text-[12.5px] font-medium text-elec-yellow hover:bg-white/[0.05] touch-manipulation"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                            Try again
                          </button>
                        </div>
                      ) : (
                        <div className="mt-2.5 flex items-center gap-1 border-t border-white/[0.06] pt-2">
                          <button
                            type="button"
                            onClick={() => copy(m.content, i)}
                            className="flex items-center gap-1.5 h-11 -my-1.5 px-2.5 rounded-lg text-[11.5px] text-white/55 hover:text-white hover:bg-white/[0.05] touch-manipulation"
                          >
                            {copiedIdx === i ? (
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                            {copiedIdx === i ? 'Copied' : 'Copy'}
                          </button>
                          <button
                            type="button"
                            onClick={() => downloadPdf(m.content)}
                            className="flex items-center gap-1.5 h-11 -my-1.5 px-2.5 rounded-lg text-[11.5px] text-white/55 hover:text-white hover:bg-white/[0.05] touch-manipulation"
                          >
                            <FileDown className="h-3.5 w-3.5" />
                            PDF
                          </button>
                        </div>
                      ))}
                  </div>
                )
              )}

              {sending && !messages[messages.length - 1]?.content && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.06]">
                    <Loader2 className="h-3.5 w-3.5 text-elec-yellow animate-spin" />
                    <span className="text-[12px] text-white/55">Thinking…</span>
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <div
              className={`border-t border-white/[0.06] px-3 pt-3 ${showActivity ? 'hidden' : ''}`}
              style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
            >
              <div className="flex items-end gap-2 rounded-2xl border border-white/[0.1] bg-white/[0.03] pl-3 pr-1.5 py-1.5">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  rows={1}
                  placeholder="Ask Mate anything about your business…"
                  className="flex-1 resize-none bg-transparent text-base sm:text-[14px] text-white placeholder:text-white/35 outline-none max-h-28 py-2.5 touch-manipulation"
                />
                <button
                  type="button"
                  onClick={() => send()}
                  disabled={!input.trim() || sending}
                  aria-label="Send"
                  className="h-11 w-11 shrink-0 flex items-center justify-center rounded-full bg-elec-yellow text-black disabled:opacity-40 touch-manipulation active:scale-95 transition-transform"
                >
                  <ArrowUp className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
