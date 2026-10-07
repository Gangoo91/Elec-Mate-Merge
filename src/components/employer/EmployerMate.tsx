import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import jsPDF from 'jspdf';
import { getBrandColour, ensureSpace, addAccentBar } from '@/utils/pdfBrand';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { useActingFirmId } from '@/hooks/useEmployerHome';
import {
  MATE_RECORD_KINDS,
  OPEN_EMPLOYER_MATE_EVENT,
  type MateRecordKind,
  type OpenEmployerMateDetail,
} from '@/components/employer/employerMateBus';
import { MATE_PAGES } from '@/components/employer/mateSuggestions';
import { MateActionCard } from '@/components/employer/mateActionCards';
import {
  NO_RE,
  YES_RE,
  describeEntryForModel,
  parseMateStream,
  type MateActionEntry,
  type MateCardLink,
  type MateResultCard,
} from '@/components/employer/mateActionModel';
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
  return `${action} ${entity}${name ? `: ${String(name)}` : ''}`.trim();
}

const markdownClass =
  'text-[14px] leading-[1.55] text-white [&_h1]:text-[15px] [&_h1]:font-semibold [&_h1]:text-white [&_h1]:mt-3 [&_h2]:text-[14.5px] [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-3 [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-2.5 [&_p]:my-1.5 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:my-1.5 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:my-1.5 [&_li]:mt-0.5 [&_strong]:text-white [&_strong]:font-semibold [&_a]:text-elec-yellow [&_a]:underline [&_code]:text-elec-yellow [&_code]:text-[12.5px]';

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
  doc.text('Elec-Mate business advice', margin, margin + 15);
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

type Msg = {
  role: 'user' | 'assistant';
  content: string;
  /** Confirmation cards Mate put up in this answer (confirmed actions, 7 Oct). */
  actions?: MateActionEntry[];
};

/** What goes back to the server: the text, plus where each card got to. */
const toWire = (msgs: Msg[]) =>
  msgs.map((m) => ({
    role: m.role,
    content: m.actions?.length
      ? `${m.content}\n\n${m.actions.map(describeEntryForModel).join('\n')}`.trim()
      : m.content,
  }));

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
        <div className="h-10 w-10 shrink-0 rounded-xl bg-white/[0.06] flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-elec-yellow" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[15px] font-semibold text-white">Employer Mate</p>
            <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-elec-yellow border border-elec-yellow rounded-full px-1.5 py-0.5">
              AI partner
            </span>
          </div>
          <p className="mt-0.5 text-[12.5px] text-white">
            Ask about costing, tendering, hiring &amp; cashflow. Grounded in the standards and your
            live numbers.
          </p>
        </div>
        <span className="text-elec-yellow text-[15px] group-hover:translate-x-0.5 transition-transform shrink-0">
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

/** "pending" / "by-person" → "Pending" / "By person" for the context chip. */
function tabLabel(tab: string): string {
  const t = tab.replace(/[-_]+/g, ' ').trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/**
 * Employer Mate — the firm owner's AI partner. Omnipresent across the Employer
 * Hub; advice is grounded in Elec-Mate's authoritative employer knowledge base
 * via the employer-ai-assistant edge function. Page-aware (passes the active section).
 */
export function EmployerMate({
  pageContext,
  pageKey,
  open: controlledOpen,
  onOpenChange,
  showLauncher = true,
  initialQuery,
}: {
  /** The page title shown in the header (fallback when the page has no guide). */
  pageContext?: string;
  /** The Employer Hub section key (?section=), so Mate knows the page. */
  pageKey?: string;
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
  showLauncher?: boolean;
  initialQuery?: string;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  // ── Page awareness (7 Oct 2026) ─────────────────────────────────────────
  // What the user is looking at: the section and tab, records open in the
  // URL (?job=, ?member=, ?invoice=…), plus whatever a page passed through
  // openEmployerMate() (its tab and a short on-screen summary).
  const [searchParams] = useSearchParams();
  const [askedFrom, setAskedFrom] = useState<OpenEmployerMateDetail | null>(null);
  useEffect(() => {
    const onAsk = (e: Event) => {
      const detail = (e as CustomEvent<OpenEmployerMateDetail>).detail ?? {};
      setAskedFrom(detail);
      if (detail.prompt) setInput(detail.prompt);
      setShowActivity(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_EMPLOYER_MATE_EVENT, onAsk);
    return () => window.removeEventListener(OPEN_EMPLOYER_MATE_EVENT, onAsk);
  }, [setOpen]);
  // A page's summary describes that page only: drop it on close or on leaving.
  useEffect(() => {
    if (!open) setAskedFrom(null);
  }, [open]);
  const urlSection = searchParams.get('section');
  useEffect(() => {
    setAskedFrom((a) => (a && a.page && a.page !== (pageKey ?? urlSection) ? null : a));
  }, [pageKey, urlSection]);

  const page = askedFrom?.page ?? pageKey ?? urlSection ?? null;
  const urlTab = searchParams.get('tab');
  const tab = askedFrom?.tab ?? urlTab ?? null;
  const recordsKey = MATE_RECORD_KINDS.map((k) => searchParams.get(k) ?? '').join('|');
  const records = useMemo(() => {
    const out: Partial<Record<MateRecordKind, string>> = {};
    MATE_RECORD_KINDS.forEach((k) => {
      const v = askedFrom?.records?.[k] ?? searchParams.get(k);
      if (v && /^[0-9a-f-]{36}$/i.test(v)) out[k] = v;
    });
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordsKey, askedFrom]);
  const pageInfo = page ? MATE_PAGES[page] : undefined;
  const pageTitle = pageInfo?.title ?? pageContext ?? null;
  const contextChip = pageTitle ? `${pageTitle}${tab ? ` · ${tabLabel(tab)}` : ''}` : null;
  const pageSuggestions = pageInfo?.suggestions?.length ? pageInfo.suggestions : SUGGESTIONS;
  const pagePayload = {
    page,
    title: pageTitle,
    tab,
    summary: askedFrom?.summary ?? null,
    records,
  };
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  // The question behind a failed answer — lets the user retry in one tap.
  const [retryQ, setRetryQ] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Activity view: what Mate has actually done to the firm (employer_audit_log)
  const [showActivity, setShowActivity] = useState(false);
  // Phone launcher hides on scroll down, returns on scroll up or near the top.
  const [launcherHidden, setLauncherHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return;
      setLauncherHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const [activity, setActivity] = useState<MateAuditEntry[] | null>(null);
  const [activityError, setActivityError] = useState(false);

  // The firm Mate acts for (the owner's id for a co-admin). The feed filters
  // on it explicitly rather than trusting RLS alone (ELE-1939).
  const { data: firmId } = useActingFirmId();

  useEffect(() => {
    if (!showActivity || !firmId) return;
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
        .eq('employer_id', firmId)
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
  }, [showActivity, firmId]);

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

  // Streamed text with cards inside: keep each card's state across re-parses.
  const setLastAssistantRaw = (raw: string) => {
    const { text, cards } = parseMateStream(raw);
    setMessages((m) => {
      const copy = [...m];
      const prev = copy[copy.length - 1]?.actions ?? [];
      copy[copy.length - 1] = {
        role: 'assistant',
        content: text,
        actions: cards.length
          ? cards.map(
              (c) => prev.find((p) => p.confirm.token === c.token) ?? { confirm: c, state: 'pending' }
            )
          : undefined,
      };
      return copy;
    });
  };

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const patchAction = (
    msgIdx: number,
    token: string,
    patch: (e: MateActionEntry) => MateActionEntry
  ) =>
    setMessages((m) =>
      m.map((msg, i) =>
        i !== msgIdx || !msg.actions
          ? msg
          : {
              ...msg,
              actions: msg.actions.map((e) => (e.confirm.token === token ? patch(e) : e)),
            }
      )
    );

  // Confirm / Undo go straight to the server with the signed token; the model
  // is not asked, so it cannot run a write by itself.
  const runToken = async (action: 'confirm' | 'undo', token: string): Promise<MateResultCard> => {
    const fail = (title: string): MateResultCard => ({
      card: 'result',
      ok: false,
      action: 'unknown',
      title,
      lines: [],
      links: [],
    });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.access_token) return fail('Your session has expired. Sign in again.');
    try {
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/employer-ai-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ action, token }),
      });
      const body = (await resp.json().catch(() => null)) as { card?: MateResultCard } | null;
      return body?.card ?? fail('Mate could not do that. Nothing was changed.');
    } catch {
      return fail('Could not reach Mate. Nothing was changed.');
    }
  };

  const confirmAction = async (msgIdx: number, token: string) => {
    patchAction(msgIdx, token, (e) => ({ ...e, state: 'working' }));
    const result = await runToken('confirm', token);
    patchAction(msgIdx, token, (e) => ({ ...e, state: 'done', result }));
    // The page behind the sheet shows the change straight away.
    if (result.ok) queryClient.invalidateQueries();
  };

  const cancelAction = (msgIdx: number, token: string) =>
    patchAction(msgIdx, token, (e) => ({ ...e, state: 'cancelled' }));

  const undoAction = async (msgIdx: number, entry: MateActionEntry) => {
    const undoToken = entry.result?.undo_token;
    if (!undoToken) return;
    const token = entry.confirm.token;
    patchAction(msgIdx, token, (e) => ({ ...e, undoing: true }));
    const undone = await runToken('undo', undoToken);
    patchAction(msgIdx, token, (e) => ({
      ...e,
      undoing: false,
      result: e.result ? { ...e.result, undone } : e.result,
    }));
    if (undone.ok) queryClient.invalidateQueries();
  };

  const openLink = (l: MateCardLink) => {
    const qs = new URLSearchParams({ section: l.section, ...(l.params ?? {}) });
    setOpen(false);
    navigate(`${location.pathname}?${qs.toString()}`);
  };

  /** The one card still waiting in the latest answer, if exactly one is. */
  const waitingCard = (): { msgIdx: number; entry: MateActionEntry } | null => {
    const msgIdx = messages.length - 1;
    const last = messages[msgIdx];
    if (last?.role !== 'assistant' || !last.actions) return null;
    const waiting = last.actions.filter(
      (e) => e.state === 'pending' && new Date(e.confirm.expires_at).getTime() > Date.now()
    );
    return waiting.length === 1 ? { msgIdx, entry: waiting[0] } : null;
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
        setLastAssistant('Your session has expired. Sign in again to keep chatting with Mate.');
        return;
      }
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/employer-ai-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ messages: toWire(history), page_context: pagePayload }),
      });
      if (!resp.ok || !resp.body) throw new Error('request failed');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setLastAssistantRaw(acc);
      }
      if (!acc.trim()) {
        setLastAssistant("I couldn't answer that. Try rephrasing.");
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
    // A "yes" or "no" to the one card waiting answers the card itself: the
    // same as tapping Confirm or Cancel, never a fresh question to the model.
    const waiting = waitingCard();
    if (waiting && (YES_RE.test(q) || NO_RE.test(q))) {
      const yes = YES_RE.test(q);
      setMessages((m) => {
        const copy = [...m];
        copy.splice(waiting.msgIdx + 1, 0, { role: 'user', content: q });
        return copy;
      });
      // The user turn sits after the card's message; the card keeps its index.
      if (yes) await confirmAction(waiting.msgIdx, waiting.entry.confirm.token);
      else cancelAction(waiting.msgIdx, waiting.entry.confirm.token);
      return;
    }
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
      {/* Floating launcher — present on every Employer Hub page. On phones it is
          a round icon that slides away while you scroll down, so it never sits
          on top of a figure or a button; it comes back as soon as you scroll up. */}
      {showLauncher && !open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ask Employer Mate"
          className={`fixed bottom-20 right-4 z-40 sm:bottom-6 flex items-center justify-center gap-2 h-12 w-12 sm:w-auto sm:h-11 sm:pl-3 sm:pr-4 rounded-full bg-elec-yellow text-black font-semibold text-[13px] shadow-lg shadow-black/30 touch-manipulation active:scale-95 transition-all duration-200 ${
            launcherHidden ? 'translate-y-24 opacity-0 pointer-events-none sm:translate-y-0 sm:opacity-100 sm:pointer-events-auto' : ''
          }`}
        >
          <Sparkles className="h-5 w-5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Ask Mate</span>
        </button>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          hideCloseButton
          className="h-[85vh] [height:85dvh] p-0 rounded-t-2xl overflow-hidden border-elec-gray bg-background lg:left-64"
        >
          <div className="flex flex-col h-full mx-auto w-full max-w-5xl">
            <SheetDescription className="sr-only text-white">
              Chat with Employer Mate, your AI business partner for the firm.
            </SheetDescription>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-elec-yellow" />
                <SheetTitle className="text-[14px] font-semibold text-white">
                  Employer Mate
                </SheetTitle>
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white">
                  Business partner
                </span>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setShowActivity((s) => !s)}
                  aria-label={showActivity ? 'Back to chat' : 'Mate activity'}
                  className="h-11 w-11 -my-2 flex items-center justify-center rounded-full text-white hover:text-white touch-manipulation"
                >
                  {showActivity ? <ChevronLeft className="h-4 w-4" /> : <History className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="h-11 w-11 -my-2 -mr-2 flex items-center justify-center rounded-full text-white hover:text-white touch-manipulation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Where Mate thinks you are, and that page's questions once a chat is going */}
            {contextChip && !showActivity && (
              <div className="border-b border-white/[0.06] px-4 py-2">
                <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <span
                    data-testid="mate-context-chip"
                    className="inline-flex h-8 shrink-0 items-center rounded-full border border-white/[0.14] bg-white/[0.04] px-3 text-[12px] font-medium text-white"
                  >
                    On: {contextChip}
                  </span>
                  {messages.length > 0 &&
                    pageSuggestions.slice(0, 3).map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => send(q)}
                        disabled={sending}
                        className="inline-flex h-11 shrink-0 items-center rounded-full border border-white/[0.12] px-3.5 text-[12.5px] text-white hover:border-elec-yellow disabled:opacity-50 touch-manipulation"
                      >
                        {q}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {showActivity && (
              <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
                <p className="text-[15px] font-semibold text-white">What Mate has done</p>
                <p className="mt-1 text-[12.5px] text-white">
                  Every action Mate takes on your firm is recorded here. Say “undo” in the chat
                  to reverse something it created.
                </p>
                {activity === null && !activityError && (
                  <div className="mt-6 flex justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                  </div>
                )}
                {activityError && (
                  <p className="mt-4 text-[13px] text-white">
                    Couldn’t load the activity log. Try again in a moment.
                  </p>
                )}
                {activity !== null && !activityError && activity.length === 0 && (
                  <p className="mt-4 text-[13px] text-white">
                    Nothing yet. When Mate adds team members, raises quotes or creates jobs for
                    you, each action lands here.
                  </p>
                )}
                <div className="mt-4 space-y-2">
                  {(activity ?? []).map((e) => (
                    <div
                      key={e.id}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5"
                    >
                      <p className="text-[13px] text-white capitalize">{describeAuditEntry(e)}</p>
                      <p className="mt-0.5 text-[11px] text-white">
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
                  <p className="text-[15px] font-semibold text-white">
                    {pageInfo ? `Ask me about ${pageInfo.title}.` : 'Ask me about your firm.'}
                  </p>
                  <p className="mt-1 text-[12.5px] text-white">
                    {pageInfo
                      ? 'I know this page: what it shows, the buttons and who can do what. Ask how to do something and I will give you the steps, or do it for you where I can.'
                      : 'Costing, tendering, contracts, CIS & VAT, hiring. Grounded in the standards, and aware of your live jobs, invoices and team.'}
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2" data-testid="mate-suggestions">
                    {pageSuggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="w-full min-h-11 text-left px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] text-[13px] text-white touch-manipulation"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) =>
                m.role === 'assistant' && !m.content && !m.actions?.length ? null : m.role === 'user' ? (
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
                    {m.content && (
                      <div className={markdownClass}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                      </div>
                    )}
                    {m.actions && m.actions.length > 0 && (
                      <div className={`space-y-3 ${m.content ? 'mt-3' : ''}`}>
                        {m.actions.map((e) => (
                          <MateActionCard
                            key={e.confirm.token}
                            entry={e}
                            onConfirm={() => confirmAction(i, e.confirm.token)}
                            onCancel={() => cancelAction(i, e.confirm.token)}
                            onUndo={() => undoAction(i, e)}
                            onOpen={openLink}
                          />
                        ))}
                      </div>
                    )}
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
                            className="flex items-center gap-1.5 h-11 -my-1.5 px-2.5 rounded-lg text-[11.5px] text-white hover:text-white hover:bg-white/[0.05] touch-manipulation"
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
                            className="flex items-center gap-1.5 h-11 -my-1.5 px-2.5 rounded-lg text-[11.5px] text-white hover:text-white hover:bg-white/[0.05] touch-manipulation"
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
                    <span className="text-[12px] text-white">Thinking…</span>
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
                  placeholder="Ask Mate anything…"
                  className="flex-1 resize-none bg-transparent text-base sm:text-[14px] text-white placeholder:text-white/35 outline-none max-h-28 py-2.5 touch-manipulation"
                />
                <button
                  type="button"
                  onClick={() => send()}
                  disabled={!input.trim() || sending}
                  aria-label="Send"
                  className="h-11 w-11 shrink-0 flex items-center justify-center rounded-full bg-elec-yellow text-black disabled:bg-white/[0.08] disabled:text-white touch-manipulation active:scale-95 transition-transform"
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
