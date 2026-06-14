import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import jsPDF from 'jspdf';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { Sparkles, ArrowUp, X, Loader2, Copy, Check, FileDown } from 'lucide-react';

const markdownClass =
  'text-[14px] leading-[1.55] text-white/90 [&_h1]:text-[15px] [&_h1]:font-semibold [&_h1]:text-white [&_h1]:mt-3 [&_h2]:text-[14.5px] [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-3 [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-2.5 [&_p]:my-1.5 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:my-1.5 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:my-1.5 [&_li]:mt-0.5 [&_strong]:text-white [&_strong]:font-semibold [&_a]:text-elec-yellow [&_a]:underline [&_code]:text-elec-yellow [&_code]:text-[12.5px]';

/** Plain-text export of an answer as a tidy A4 PDF. */
function downloadPdf(text: string) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 48;
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const width = pageW - margin * 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
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
    .replace(/^[-*]\s/gm, '•  ');
  const lines = doc.splitTextToSize(clean, width) as string[];
  let y = margin + 40;
  for (const line of lines) {
    if (y > pageH - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += 15;
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
            Ask about costing, tendering, hiring &amp; cashflow — grounded in the standards and your live numbers.
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
 * Hub; advice is grounded in the authoritative employer_knowledge RAG via the
 * employer-ai-assistant edge function. Page-aware (passes the active section).
 */
export function EmployerMate({
  pageContext,
  open: controlledOpen,
  onOpenChange,
  showLauncher = true,
}: {
  pageContext?: string;
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
  showLauncher?: boolean;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const copy = (text: string, idx: number) => {
    navigator.clipboard?.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx((c) => (c === idx ? null : c)), 1600);
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, sending]);

  const send = async (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || sending) return;
    setInput('');
    const next = [...messages, { role: 'user' as const, content: q }];
    // Add the user message + an empty assistant message we stream into.
    setMessages([...next, { role: 'assistant', content: '' }]);
    setSending(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/employer-ai-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${session?.access_token ?? SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next, page_context: pageContext }),
      });
      if (!resp.ok || !resp.body) throw new Error('request failed');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: 'assistant', content: acc };
          return copy;
        });
      }
      if (!acc.trim()) {
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: 'assistant', content: "I couldn't answer that — try rephrasing." };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: 'assistant',
          content: 'Something went wrong reaching Mate. Try again in a moment.',
        };
        return copy;
      });
    } finally {
      setSending(false);
    }
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
          className="h-[88vh] p-0 rounded-t-2xl overflow-hidden border-elec-gray bg-background lg:left-64"
        >
          <div className="flex flex-col h-full">
            <SheetDescription className="sr-only">
              Chat with Employer Mate, your AI business partner for the firm.
            </SheetDescription>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-elec-yellow" />
                <SheetTitle className="text-[14px] font-semibold text-white">Employer Mate</SheetTitle>
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                  Business partner
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="h-8 w-8 flex items-center justify-center rounded-full text-white/60 hover:text-white touch-manipulation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="pt-6">
                  <p className="text-[15px] font-semibold text-white">Ask me about your firm.</p>
                  <p className="mt-1 text-[12.5px] text-white/55">
                    Costing, tendering, contracts, CIS &amp; VAT, hiring — grounded in the standards,
                    and aware of your live jobs, invoices and team.
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
                  <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-3">
                    <div className={markdownClass}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                    </div>
                    {!(sending && i === messages.length - 1) && (
                      <div className="mt-2.5 flex items-center gap-1 border-t border-white/[0.06] pt-2">
                        <button
                          type="button"
                          onClick={() => copy(m.content, i)}
                          className="flex items-center gap-1.5 h-7 px-2 rounded-lg text-[11.5px] text-white/55 hover:text-white hover:bg-white/[0.05] touch-manipulation"
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
                          className="flex items-center gap-1.5 h-7 px-2 rounded-lg text-[11.5px] text-white/55 hover:text-white hover:bg-white/[0.05] touch-manipulation"
                        >
                          <FileDown className="h-3.5 w-3.5" />
                          PDF
                        </button>
                      </div>
                    )}
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
            <div className="border-t border-white/[0.06] px-3 py-3">
              <div className="flex items-end gap-2 rounded-2xl border border-white/[0.1] bg-white/[0.03] px-3 py-2">
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
                  className="flex-1 resize-none bg-transparent text-[14px] text-white placeholder:text-white/35 outline-none max-h-28 py-1 touch-manipulation"
                />
                <button
                  type="button"
                  onClick={() => send()}
                  disabled={!input.trim() || sending}
                  aria-label="Send"
                  className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-elec-yellow text-black disabled:opacity-40 touch-manipulation active:scale-95 transition-transform"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
