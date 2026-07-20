import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  X,
  Send,
  Loader2,
  RotateCcw,
  Mic,
  MicOff,
  Square,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Network } from '@capacitor/network';
import type {
  SparkTask,
  SaveTaskInput,
  UpdateTaskInput,
} from '@/hooks/useSparkTasks';
import type {
  SparkProject,
  CreateProjectInput,
} from '@/hooks/useSparkProjects';
import type { Customer } from '@/hooks/useCustomers';
import type {
  ChatMessage,
  ProposedAction,
  RecentChat,
  CustomerInput,
  CustomerPatch,
} from './assistant/types';
import { useVoiceDictation } from './assistant/useVoiceDictation';
import { EmptyState } from './assistant/EmptyState';
import { MessageBubble } from './assistant/MessageBubble';
import { isDestructive } from './assistant/helpers';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** Optional starter prompt — prefills the composer when the sheet opens. */
  initialPrompt?: string;
  /** Always required — tasks are the baseline entity. */
  currentTasks: SparkTask[];
  onSave: (input: SaveTaskInput) => Promise<SparkTask | null>;
  onUpdate: (id: string, input: UpdateTaskInput) => Promise<void>;
  onMarkDone: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  /** Optional — pass when projects exist on the host page. */
  currentProjects?: SparkProject[];
  onCreateProject?: (input: CreateProjectInput) => Promise<SparkProject | null>;
  onUpdateProject?: (
    id: string,
    input: Partial<CreateProjectInput> & { status?: SparkProject['status'] }
  ) => Promise<void>;
  onCompleteProject?: (id: string) => Promise<void>;
  onDeleteProject?: (id: string) => Promise<boolean>;
  /** Optional — pass when customers are wired in. */
  currentCustomers?: Customer[];
  onCreateCustomer?: (input: CustomerInput) => Promise<void>;
  onUpdateCustomer?: (id: string, patch: CustomerPatch) => Promise<void>;
  onDeleteCustomer?: (id: string) => Promise<void>;
}

export function Assistant({
  isOpen,
  onClose,
  initialPrompt,
  currentTasks,
  currentProjects = [],
  currentCustomers = [],
  onSave,
  onUpdate,
  onMarkDone,
  onDelete,
  onCreateProject,
  onUpdateProject,
  onCompleteProject,
  onDeleteProject,
  onCreateCustomer,
  onUpdateCustomer,
  onDeleteCustomer,
}: Props) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [recentChatsLoading, setRecentChatsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  // Tracks which actions have already been applied (by tempId or id) so a
  // double-tap on Apply doesn't fire twice.
  const appliedActionKeysRef = useRef<Set<string>>(new Set());

  // ── Streaming smoothness ───────────────────────────────────────────────
  // Whether the user is "stuck" at the bottom of the transcript — if true we
  // auto-scroll on new tokens; if they scrolled up to read history we stop.
  const stickToBottomRef = useRef(true);
  const prevMessageCountRef = useRef(0);
  // Currently-running lookup tool name, surfaces a small inline indicator
  // ("Searching regs…", "Looking up customer…") while the model thinks.
  const [activeLookup, setActiveLookup] = useState<string | null>(null);
  // True while OpenAI is actively streaming tokens for this turn — drives
  // the live cursor at the end of the assistant message.
  const [isStreaming, setIsStreaming] = useState(false);
  // rAF-based token buffer. OpenAI emits chunks at irregular intervals
  // (sometimes 50/sec, sometimes 1-char each); we coalesce them to ~60fps
  // updates so the chat renders smoothly without thrash.
  const tokenBufferRef = useRef('');
  const flushScheduledRef = useRef(false);
  const streamingMessageIndexRef = useRef<number>(-1);
  // AbortController for the in-flight streaming fetch so we can stop the
  // model mid-reply (ChatGPT-style stop button).
  const streamAbortRef = useRef<AbortController | null>(null);

  const voice = useVoiceDictation((transcript) => setInput(transcript));
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationTitle, setConversationTitle] = useState<string | null>(null);
  const [recentChats, setRecentChats] = useState<RecentChat[]>([]);

  async function loadRecentChats() {
    setRecentChatsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: rows } = await (supabase as any)
        .from('assistant_conversations')
        .select('id, title, last_message_at')
        .eq('user_id', user.id)
        .order('last_message_at', { ascending: false })
        .limit(10);
      if (!rows) return;
      setRecentChats(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (rows as any[]).map((r) => ({
          id: r.id,
          title: r.title,
          lastMessageAt: r.last_message_at,
        }))
      );
    } finally {
      setRecentChatsLoading(false);
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    if (conversationId || messages.length > 0) return;
    loadRecentChats();
  }, [isOpen, conversationId, messages.length]);

  async function renameConversation(id: string, newTitle: string) {
    if (!newTitle.trim()) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from('assistant_conversations')
      .update({ title: newTitle.trim() })
      .eq('id', id);
    setRecentChats((cur) =>
      cur.map((c) => (c.id === id ? { ...c, title: newTitle.trim() } : c))
    );
    if (id === conversationId) setConversationTitle(newTitle.trim());
  }

  async function deleteConversation(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('assistant_conversations').delete().eq('id', id);
    setRecentChats((cur) => cur.filter((c) => c.id !== id));
    if (id === conversationId) {
      setConversationId(null);
      setConversationTitle(null);
      setMessages([]);
    }
  }

  async function resumeConversation(id: string) {
    const chat = recentChats.find((c) => c.id === id);
    if (chat) setConversationTitle(chat.title);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any)
      .from('assistant_messages')
      .select('role, content, citations, actions, clarification')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true });
    if (!data) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const restored: ChatMessage[] = (data as any[]).map((m: any) => ({
      role: m.role,
      content: m.content,
      citations: m.citations || [],
      actions: m.actions || [],
      clarification: m.clarification || undefined,
      resolved: Array.isArray(m.actions) ? m.actions.map(() => 'applied') : [],
    }));
    setMessages(restored);
    setConversationId(id);
  }

  // Build context the AI sees — recent customers + locations from current
  // tasks, projects, and the customers list. Customers list is canonical.
  const userContext = useMemo(() => {
    const customerNames = new Set<string>();
    const locations = new Set<string>();
    for (const c of currentCustomers) customerNames.add(c.name);
    for (const p of currentProjects) {
      if (p.customerName) customerNames.add(p.customerName);
      if (p.location) locations.add(p.location);
    }
    for (const t of currentTasks) {
      if (t.customerName) customerNames.add(t.customerName);
      if (t.location) locations.add(t.location);
    }
    return {
      recentCustomers: Array.from(customerNames).slice(0, 12),
      recentLocations: Array.from(locations).slice(0, 12),
    };
  }, [currentTasks, currentProjects, currentCustomers]);

  // Network status — uses Capacitor Network on native, navigator.onLine on web.
  useEffect(() => {
    let listenerHandle: { remove: () => Promise<void> } | null = null;
    if (Capacitor.isNativePlatform()) {
      Network.getStatus().then((s) => setIsOnline(s.connected));
      Network.addListener('networkStatusChange', (s) => setIsOnline(s.connected)).then(
        (h) => {
          listenerHandle = h;
        }
      );
    } else {
      setIsOnline(navigator.onLine);
      const onOnline = () => setIsOnline(true);
      const onOffline = () => setIsOnline(false);
      window.addEventListener('online', onOnline);
      window.addEventListener('offline', onOffline);
      return () => {
        window.removeEventListener('online', onOnline);
        window.removeEventListener('offline', onOffline);
      };
    }
    return () => {
      listenerHandle?.remove();
    };
  }, []);

  useEffect(() => {
    // When the sheet opens with an initialPrompt and the transcript is empty,
    // prefill the composer so the user can review/edit before sending.
    if (isOpen && initialPrompt && messages.length === 0) {
      setInput(initialPrompt);
    }
    // Focus the composer when the sheet opens — slight delay for the animation.
    if (isOpen) {
      const t = setTimeout(() => textareaRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
    // Intentionally omit `messages.length` so re-prompting after a chat clears
    // doesn't overwrite an in-progress edit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialPrompt]);

  useEffect(() => {
    // Auto-grow composer from 44px up to 120px so it sits level with the
    // mic/send buttons when empty, expanding only as the user types multi-line.
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = '44px';
    const next = Math.min(Math.max(ta.scrollHeight, 44), 120);
    if (next > 44) ta.style.height = `${next}px`;
  }, [input]);

  useEffect(() => {
    // Park the user's latest message at the top of the viewport when a NEW
    // message is added, then leave the scroll alone while tokens stream in.
    // Tokens flow below the user's reading position — the page never yanks down.
    const node = scrollRef.current;
    if (!node) return;
    const newCount = messages.length;
    const prevCount = prevMessageCountRef.current;
    prevMessageCountRef.current = newCount;
    if (newCount <= prevCount) return;
    requestAnimationFrame(() => {
      const last = node.lastElementChild as HTMLElement | null;
      if (!last) return;
      // On send, two messages are pushed in one batch (user + empty assistant).
      // Anchor on the user message so the question is at the top.
      const prev = last.previousElementSibling as HTMLElement | null;
      const anchor = prev && prev.offsetTop < last.offsetTop ? prev : last;
      const top = Math.max(0, anchor.offsetTop - 12);
      node.scrollTo({ top, behavior: 'smooth' });
    });
  }, [messages.length]);

  function handleScroll() {
    const node = scrollRef.current;
    if (!node) return;
    const distanceFromBottom = node.scrollHeight - node.scrollTop - node.clientHeight;
    stickToBottomRef.current = distanceFromBottom < 120;
  }

  function lookupTask(id: string): SparkTask | undefined {
    return currentTasks.find((t) => t.id === id);
  }

  function lookupProject(id: string): SparkProject | undefined {
    return currentProjects.find((p) => p.id === id);
  }

  function lookupCustomer(id: string): Customer | undefined {
    return currentCustomers.find((c) => c.id === id);
  }

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || sending) return;
    if (!isOnline) {
      toast({
        title: 'You\'re offline',
        description: 'Mate needs a connection to think. Try again when back online.',
        variant: 'destructive',
      });
      return;
    }
    setInput('');

    const next: ChatMessage[] = [
      ...messages,
      { role: 'user', content },
    ];
    setMessages(next);
    setSending(true);

    try {
      // Send the full transcript so the model can resolve referents like "that
      // one" / "the first task" across turns.
      const apiMessages = next.map((m) => ({ role: m.role, content: m.content }));

      const taskSlice = currentTasks.slice(0, 25).map((t) => ({
        id: t.id,
        status: t.status,
        priority: t.priority,
        dueAt: t.dueAt,
        title: t.title,
        customerName: t.customerName,
        location: t.location,
        tags: t.tags,
      }));

      const projectSlice = currentProjects.slice(0, 25).map((p) => ({
        id: p.id,
        status: p.status,
        stage: p.stage,
        priority: p.priority,
        dueDate: p.dueDate,
        startDate: p.startDate,
        title: p.title,
        customerName: p.customerName,
        location: p.location,
        estimatedValue: p.estimatedValue,
        quoteCount: p.quoteCount,
        invoiceCount: p.invoiceCount,
        unpaidInvoiceCount: p.unpaidInvoiceCount,
        certCount: p.certCount,
        totalTasks: p.totalTasks,
        completedTasks: p.completedTasks,
      }));

      const customerSlice = currentCustomers.slice(0, 50).map((c) => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        address: c.address,
      }));

      const {
        data: { user },
      } = await supabase.auth.getUser();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Append an empty assistant message we'll fill as tokens stream in.
      let assistantIndex = -1;
      setMessages((cur) => {
        assistantIndex = cur.length;
        streamingMessageIndexRef.current = assistantIndex;
        return [
          ...cur,
          {
            role: 'assistant',
            content: '',
            citations: [],
            actions: [],
            resolved: [],
          },
        ];
      });
      // Auto-stick to bottom on a fresh send.
      stickToBottomRef.current = true;
      setIsStreaming(true);
      setActiveLookup(null);

      const supabaseUrl =
        (import.meta.env.VITE_SUPABASE_URL as string) ||
        'https://jtwygbeceundfgnkirof.supabase.co';
      const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';
      const fnUrl = `${supabaseUrl}/functions/v1/tasks-ai-assistant`;

      const abort = new AbortController();
      streamAbortRef.current = abort;

      const resp = await fetch(fnUrl, {
        method: 'POST',
        signal: abort.signal,
        headers: {
          'Content-Type': 'application/json',
          apikey: anonKey,
          Authorization: `Bearer ${session?.access_token || anonKey}`,
        },
        body: JSON.stringify({
          messages: apiMessages,
          currentTasks: taskSlice,
          currentProjects: projectSlice,
          currentCustomers: customerSlice,
          userContext,
          userId: user?.id,
          conversationId,
          stream: true,
        }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error(`Stream failed: ${resp.status} ${await resp.text()}`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const updateAssistant = (mutator: (m: ChatMessage) => ChatMessage) => {
        setMessages((cur) => {
          if (assistantIndex < 0 || assistantIndex >= cur.length) return cur;
          const copy = [...cur];
          copy[assistantIndex] = mutator(copy[assistantIndex]);
          return copy;
        });
      };

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const rawLine of lines) {
          const line = rawLine.trim();
          if (!line.startsWith('data:')) continue;
          const payload = line.slice(5).trim();
          if (!payload) continue;
          let event: any;
          try {
            event = JSON.parse(payload);
          } catch {
            continue;
          }
          if (event.type === 'token') {
            // Coalesce token deltas via rAF — silky-smooth at ~60fps.
            tokenBufferRef.current += event.delta;
            if (!flushScheduledRef.current) {
              flushScheduledRef.current = true;
              requestAnimationFrame(() => {
                const flush = tokenBufferRef.current;
                tokenBufferRef.current = '';
                flushScheduledRef.current = false;
                if (!flush) return;
                updateAssistant((m) => ({
                  ...m,
                  content: (m.content || '') + flush,
                }));
              });
            }
            // A token implies the model is talking, not searching — clear
            // any lingering lookup indicator.
            if (activeLookup) setActiveLookup(null);
          } else if (event.type === 'conversation') {
            if (event.conversationId && event.conversationId !== conversationId) {
              setConversationId(event.conversationId);
            }
          } else if (event.type === 'lookup_started') {
            setActiveLookup(lookupLabel(event.tool));
          } else if (event.type === 'lookup_done') {
            // We keep the indicator visible until either tokens resume or the
            // next lookup starts — feels less flickery than instant-hide.
          } else if (event.type === 'citations') {
            updateAssistant((m) => ({ ...m, citations: event.citations || [] }));
          } else if (event.type === 'action') {
            updateAssistant((m) => ({
              ...m,
              actions: [...(m.actions || []), event.action],
              resolved: [...(m.resolved || []), 'pending'],
            }));
          } else if (event.type === 'clarification') {
            updateAssistant((m) => ({ ...m, clarification: event.clarification }));
          } else if (event.type === 'framing') {
            // Server-side fallback framing text when the model emitted no prose.
            updateAssistant((m) =>
              m.content ? m : { ...m, content: event.text || '' }
            );
          } else if (event.type === 'done') {
            // Final flush — if any tokens are buffered, push them through now.
            if (tokenBufferRef.current) {
              const flush = tokenBufferRef.current;
              tokenBufferRef.current = '';
              flushScheduledRef.current = false;
              updateAssistant((m) => ({
                ...m,
                content: (m.content || '') + flush,
              }));
            }
          } else if (event.type === 'error') {
            throw new Error(event.message || 'stream error');
          }
        }
      }
    } catch (err) {
      // User-initiated stop — don't treat as an error.
      const isAbort =
        (err as any)?.name === 'AbortError' ||
        ((err as any)?.message || '').toLowerCase().includes('aborted');
      if (isAbort) {
        // Append a small marker so the user can see where they stopped.
        setMessages((cur) => {
          if (cur.length === 0) return cur;
          const idx = cur.length - 1;
          if (cur[idx].role !== 'assistant') return cur;
          const copy = [...cur];
          const m = { ...copy[idx] };
          m.content = (m.content || '') + ' [stopped]';
          copy[idx] = m;
          return copy;
        });
        return;
      }
      console.error('[Assistant] send failed', err);
      toast({
        title: 'AI request failed',
        description: err instanceof Error ? err.message : 'Try again',
        variant: 'destructive',
      });
      // Update the in-progress assistant message (if any) with the error,
      // rather than appending a new one — keeps the transcript clean.
      setMessages((cur) => {
        if (cur.length === 0) return cur;
        const last = cur[cur.length - 1];
        if (last.role === 'assistant' && !last.content) {
          const copy = [...cur];
          copy[copy.length - 1] = {
            ...last,
            content: 'Sorry — that didn\'t go through. Try again.',
          };
          return copy;
        }
        return [
          ...cur,
          {
            role: 'assistant',
            content: 'Sorry — that didn\'t go through. Try again.',
          },
        ];
      });
    } finally {
      setSending(false);
      setIsStreaming(false);
      setActiveLookup(null);
      streamingMessageIndexRef.current = -1;
      streamAbortRef.current = null;
      // Flush any straggler buffered tokens that didn't ride a rAF.
      if (tokenBufferRef.current) {
        const flush = tokenBufferRef.current;
        tokenBufferRef.current = '';
        flushScheduledRef.current = false;
        setMessages((cur) => {
          if (cur.length === 0) return cur;
          const idx = cur.length - 1;
          if (cur[idx].role !== 'assistant') return cur;
          const copy = [...cur];
          copy[idx] = { ...copy[idx], content: (copy[idx].content || '') + flush };
          return copy;
        });
      }
      // Return focus to the composer for fast follow-up.
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  }

  /** Friendly label for the streaming lookup indicator. */
  function lookupLabel(tool: string): string {
    switch (tool) {
      case 'search_bs7671':
        return 'Searching BS 7671…';
      case 'find_customer':
        return 'Looking up customer…';
      case 'find_project':
        return 'Looking up project…';
      case 'query_outstanding_invoices':
        return 'Checking unpaid invoices…';
      case 'query_pipeline_quotes':
        return 'Checking pipeline…';
      case 'summarise_customer':
        return 'Building customer summary…';
      case 'plan_my_day':
        return 'Pulling your day…';
      case 'find_similar_jobs':
        return 'Reviewing past jobs…';
      default:
        return 'Thinking…';
    }
  }

  async function applyAction(messageIndex: number, actionIndex: number) {
    const message = messages[messageIndex];
    const action = message?.actions?.[actionIndex];
    if (!action) return;

    // Idempotency — guard against double-tap. tempId on creates, id on edits.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const key = ((action as any).tempId as string | undefined) ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((action as any).id as string | undefined) ||
      `${messageIndex}-${actionIndex}`;
    if (appliedActionKeysRef.current.has(key)) return;
    appliedActionKeysRef.current.add(key);

    // For create-* actions, capture the new record so the user can undo.
    let undo: { label: string; run: () => Promise<unknown> } | null = null;

    try {
      switch (action.type) {
        case 'create-task': {
          // customerName is on the payload for display but not in SaveTaskInput.
          const { customerName: _c, ...payload } = action.payload;
          const created = await onSave(payload);
          if (created?.id) {
            undo = {
              label: `Task "${created.title}" created`,
              run: () => onDelete(created.id),
            };
          }
          break;
        }
        case 'create-snag': {
          // Snag = task with the 'snagging' tag (edge function already enforces).
          const { customerName: _c, ...payload } = action.payload;
          const created = await onSave(payload);
          if (created?.id) {
            undo = {
              label: `Snag "${created.title}" created`,
              run: () => onDelete(created.id),
            };
          }
          break;
        }
        case 'create-project': {
          if (!onCreateProject) throw new Error('Projects not available here');
          const { customerName: _c, ...payload } = action.payload;
          const created = await onCreateProject(payload);
          if (created?.id && onDeleteProject) {
            const deleter = onDeleteProject;
            undo = {
              label: `Project "${created.title}" created`,
              run: () => deleter(created.id),
            };
          }
          break;
        }
        case 'create-customer': {
          if (!onCreateCustomer) throw new Error('Customers not available here');
          await onCreateCustomer(action.payload);
          // useCustomers.saveCustomer returns void — no id captured, so no undo.
          break;
        }
        case 'draft-message': {
          // Default Apply behaviour = send via Brevo. Mailto stays as a
          // separate explicit button on the card.
          const { to, toName, subject, body } = action.payload;
          if (!to) throw new Error('No recipient email');
          // Re-check connectivity before the network call.
          if (Capacitor.isNativePlatform()) {
            const status = await Network.getStatus();
            if (!status.connected) throw new Error('No network — try again on Wi-Fi');
          }
          const {
            data: { user },
          } = await supabase.auth.getUser();
          const { error: sendErr } = await supabase.functions.invoke(
            'send-assistant-email',
            {
              body: {
                to,
                toName,
                subject,
                body,
                userId: user?.id,
                conversationId,
              },
            }
          );
          if (sendErr) throw sendErr;
          toast({
            title: 'Email sent',
            description: `Delivered to ${toName || to}`,
          });
          break;
        }
        case 'add-material': {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) throw new Error('Not signed in');
          const p = action.payload;
          if (!p.projectId || !p.name?.trim()) throw new Error('Missing job or material name');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: created, error: matErr } = await (supabase as any)
            .from('job_materials')
            .insert({
              user_id: user.id,
              project_id: p.projectId,
              name: p.name.trim(),
              quantity: p.quantity ?? 1,
              unit: p.unit || null,
              unit_price: p.unitPrice ?? null,
              status: 'needed',
              source: 'manual',
            })
            .select('id, name')
            .single();
          if (matErr) throw matErr;
          window.dispatchEvent(new CustomEvent('job-materials-changed'));
          if (created?.id) {
            undo = {
              label: `Material "${created.name}" added`,
              run: async () => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await (supabase as any).from('job_materials').delete().eq('id', created.id);
                window.dispatchEvent(new CustomEvent('job-materials-changed'));
              },
            };
          }
          break;
        }
        case 'draft-invoice': {
          const pid = action.payload.projectId;
          if (!pid) throw new Error('Missing job');
          navigate(`/electrician/invoice-builder/create?projectId=${pid}`);
          onClose();
          break;
        }
        case 'amend-task': {
          const { customerName: _c, ...patch } = action.patch;
          // Snapshot the keys we're about to patch for undo.
          const before = lookupTask(action.id);
          const snapshot: Record<string, unknown> = {};
          if (before) {
            for (const k of Object.keys(patch)) {
              snapshot[k] = (before as any)[k] ?? null;
            }
          }
          await onUpdate(action.id, patch);
          if (before && Object.keys(snapshot).length > 0) {
            undo = {
              label: `Updated "${before.title}"`,
              run: () => onUpdate(action.id, snapshot as any),
            };
          }
          break;
        }
        case 'amend-project': {
          if (!onUpdateProject) throw new Error('Projects not available here');
          const { customerName: _c, ...patch } = action.patch;
          const before = lookupProject(action.id);
          const snapshot: Record<string, unknown> = {};
          if (before) {
            for (const k of Object.keys(patch)) {
              snapshot[k] = (before as any)[k] ?? null;
            }
          }
          await onUpdateProject(action.id, patch);
          if (before && Object.keys(snapshot).length > 0) {
            const updateProj = onUpdateProject;
            undo = {
              label: `Updated "${before.title}"`,
              run: () => updateProj(action.id, snapshot as any),
            };
          }
          break;
        }
        case 'amend-customer': {
          if (!onUpdateCustomer) throw new Error('Customers not available here');
          const before = lookupCustomer(action.id);
          const snapshot: Record<string, unknown> = {};
          if (before) {
            for (const k of Object.keys(action.patch)) {
              snapshot[k] = (before as any)[k] ?? null;
            }
          }
          await onUpdateCustomer(action.id, action.patch);
          if (before && Object.keys(snapshot).length > 0) {
            const updateCust = onUpdateCustomer;
            undo = {
              label: `Updated ${before.name}`,
              run: () => updateCust(action.id, snapshot as any),
            };
          }
          break;
        }
        case 'complete-task': {
          const before = lookupTask(action.id);
          await onMarkDone(action.id);
          if (before) {
            undo = {
              label: `Marked done: ${before.title}`,
              // Reopen via amend — onUpdate accepts a status field.
              run: () => onUpdate(action.id, { status: 'open' } as any),
            };
          }
          break;
        }
        case 'complete-project': {
          if (!onCompleteProject) throw new Error('Projects not available here');
          if (!onUpdateProject) throw new Error('Projects not available here');
          const before = lookupProject(action.id);
          await onCompleteProject(action.id);
          if (before) {
            const updateProj = onUpdateProject;
            undo = {
              label: `Marked done: ${before.title}`,
              run: () => updateProj(action.id, { status: 'active' } as any),
            };
          }
          break;
        }
        case 'delete-task': {
          // Snapshot the row before delete so we can re-create it. The new
          // record will have a new id; references via title/customer/location
          // stay correct but anything pointing to the old id is now orphaned.
          const before = lookupTask(action.id);
          await onDelete(action.id);
          if (before) {
            undo = {
              label: `Deleted "${before.title}"`,
              run: () =>
                onSave({
                  title: before.title,
                  details: before.details,
                  priority: before.priority,
                  dueAt: before.dueAt,
                  customerId: before.customerId,
                  location: before.location,
                  tags: before.tags,
                  projectId: before.projectId,
                }),
            };
          }
          break;
        }
        case 'delete-project': {
          if (!onDeleteProject) throw new Error('Projects not available here');
          if (!onCreateProject) throw new Error('Projects not available here');
          const before = lookupProject(action.id);
          await onDeleteProject(action.id);
          if (before) {
            const createProj = onCreateProject;
            undo = {
              label: `Deleted "${before.title}"`,
              run: () =>
                createProj({
                  title: before.title,
                  description: before.description,
                  projectType: before.projectType,
                  priority: before.priority,
                  customerId: before.customerId,
                  location: before.location,
                  estimatedValue: before.estimatedValue,
                  startDate: before.startDate,
                  dueDate: before.dueDate,
                  tags: before.tags,
                }),
            };
          }
          break;
        }
        case 'delete-customer': {
          if (!onDeleteCustomer) throw new Error('Customers not available here');
          if (!onCreateCustomer) throw new Error('Customers not available here');
          const before = lookupCustomer(action.id);
          await onDeleteCustomer(action.id);
          if (before) {
            const createCust = onCreateCustomer;
            undo = {
              label: `Deleted ${before.name}`,
              run: () =>
                createCust({
                  name: before.name,
                  email: before.email,
                  phone: before.phone,
                  address: before.address,
                  notes: before.notes,
                }),
            };
          }
          break;
        }
      }

      setMessages((cur) => {
        const copy = [...cur];
        const m = { ...copy[messageIndex] };
        m.resolved = [...(m.resolved ?? [])];
        m.resolved[actionIndex] = 'applied';
        copy[messageIndex] = m;
        return copy;
      });

      // Native haptic feedback on success — heavier for destructive actions.
      if (Capacitor.isNativePlatform()) {
        try {
          if (isDestructive(action)) {
            await Haptics.notification({ type: NotificationType.Warning });
          } else {
            await Haptics.impact({ style: ImpactStyle.Light });
          }
        } catch {
          /* haptics not critical */
        }
      }

      if (undo) {
        const undoFn = undo.run;
        const label = undo.label;
        toast({
          title: label,
          description: '5s to undo.',
          duration: 5000,
          action: (
            <button
              type="button"
              onClick={async () => {
                try {
                  await undoFn();
                  toast({ title: 'Undone.' });
                } catch (err) {
                  toast({
                    title: 'Undo failed',
                    description: err instanceof Error ? err.message : 'Try manually',
                    variant: 'destructive',
                  });
                }
              }}
              className="text-[12px] font-semibold px-3 py-1 rounded-md bg-white/15 text-white hover:bg-white/25 transition-colors"
            >
              Undo
            </button>
          ) as any,
        });
      }
    } catch (err) {
      console.error('[Assistant] apply failed', err);
      // Release the idempotency lock so retry is possible.
      appliedActionKeysRef.current.delete(key);
      if (Capacitor.isNativePlatform()) {
        try {
          await Haptics.notification({ type: NotificationType.Error });
        } catch {
          /* ignore */
        }
      }
      toast({
        title: 'Couldn\'t apply',
        description: err instanceof Error ? err.message : 'Try again',
        variant: 'destructive',
      });
    }
  }

  function editAction(
    messageIndex: number,
    actionIndex: number,
    patch: Record<string, unknown>
  ) {
    setMessages((cur) => {
      const copy = [...cur];
      const m = { ...copy[messageIndex] };
      if (!m.actions) return cur;
      const actions = [...m.actions];
      const a = actions[actionIndex];
      if (
        a.type === 'create-task' ||
        a.type === 'create-snag' ||
        a.type === 'create-project' ||
        a.type === 'create-customer' ||
        a.type === 'draft-message'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        actions[actionIndex] = {
          ...a,
          payload: { ...(a as any).payload, ...patch },
        } as ProposedAction;
      }
      m.actions = actions;
      copy[messageIndex] = m;
      return copy;
    });
  }

  function rejectAction(messageIndex: number, actionIndex: number) {
    setMessages((cur) => {
      const copy = [...cur];
      const m = { ...copy[messageIndex] };
      m.resolved = [...(m.resolved ?? [])];
      m.resolved[actionIndex] = 'rejected';
      copy[messageIndex] = m;
      return copy;
    });
  }

  async function applyAllInMessage(messageIndex: number) {
    const message = messages[messageIndex];
    if (!message?.actions) return;
    for (let i = 0; i < message.actions.length; i++) {
      if (message.resolved?.[i] === 'pending') {
        // eslint-disable-next-line no-await-in-loop
        await applyAction(messageIndex, i);
      }
    }
  }

  function startNewChat() {
    setMessages([]);
    setInput('');
    setConversationId(null);
    setConversationTitle(null);
    appliedActionKeysRef.current.clear();
    // Refresh the recent-chats list so the just-saved chat appears.
    loadRecentChats();
  }

  function answerClarification(messageIndex: number, value: string, label: string) {
    setMessages((cur) => {
      const copy = [...cur];
      const m = copy[messageIndex];
      if (m?.clarification) {
        copy[messageIndex] = {
          ...m,
          clarification: { ...m.clarification, answeredWith: label },
        };
      }
      return copy;
    });
    // Fire the chosen value as the user's next message.
    handleSend(value);
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        hideCloseButton
        className="h-[90vh] p-0 rounded-t-2xl overflow-hidden bg-background border-white/10"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-background/95 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-elec-yellow to-amber-500 flex items-center justify-center shadow-lg shadow-elec-yellow/20">
                <Sparkles className="h-4.5 w-4.5 text-black" />
                {/* live pulse — Mate is on */}
                <span
                  aria-hidden="true"
                  className="absolute -top-0.5 -right-0.5 flex h-2 w-2"
                >
                  <span className="absolute inline-flex h-full w-full rounded-full bg-elec-yellow opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-elec-yellow ring-2 ring-background" />
                </span>
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-white leading-none mb-0.5">
                  Mate
                </h2>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45 leading-none">
                  Your AI partner
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={startNewChat}
                  className="h-9 w-9 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 touch-manipulation"
                  aria-label="New chat"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="h-9 w-9 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 touch-manipulation"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          {!isOnline && (
            <div className="px-4 py-1.5 bg-red-500/15 border-t border-red-500/25 flex items-center gap-2 text-[11px] text-red-200">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-400" />
              </span>
              You're offline — Mate needs a connection.
            </div>
          )}

          {/* Messages */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
          >
            {messages.length === 0 ? (
              <EmptyState
                onPick={handleSend}
                recentChats={recentChats}
                recentChatsLoading={recentChatsLoading}
                onResume={resumeConversation}
                onRename={renameConversation}
                onDelete={deleteConversation}
              />
            ) : (
              messages.map((m, mi) => (
                <MessageBubble
                  key={mi}
                  message={m}
                  isStreamingTarget={
                    isStreaming && mi === streamingMessageIndexRef.current
                  }
                  lookupTask={lookupTask}
                  lookupProject={lookupProject}
                  lookupCustomer={lookupCustomer}
                  onApply={(ai) => applyAction(mi, ai)}
                  onReject={(ai) => rejectAction(mi, ai)}
                  onEdit={(ai, patch) => editAction(mi, ai, patch)}
                  onApplyAll={() => applyAllInMessage(mi)}
                  onAnswerClarification={(value, label) =>
                    answerClarification(mi, value, label)
                  }
                />
              ))
            )}
            {sending && !isStreaming && (
              <div className="flex items-center gap-2 text-[13px] text-white/60 px-1">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-elec-yellow" />
                Thinking…
              </div>
            )}
            {isStreaming && activeLookup && (
              <div className="flex items-center gap-2 text-[11px] text-elec-yellow/80 px-1 animate-pulse">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-elec-yellow opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                </span>
                {activeLookup}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 bg-background/95 backdrop-blur-sm px-3 py-2 pb-[max(env(safe-area-inset-bottom),8px)]">
            {voice.listening && (
              <div className="flex items-center gap-2 px-3 pb-2 text-[11px] text-elec-yellow">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-elec-yellow opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-elec-yellow" />
                </span>
                Listening… tap mic to stop
              </div>
            )}
            {!voice.supported && messages.length === 0 && (
              <div className="px-3 pb-1 text-[10px] text-white/35">
                Voice dictation isn't available in this browser — try Chrome or Safari.
              </div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-end gap-2"
            >
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={1}
                  placeholder={voice.listening ? 'Listening…' : 'Message Mate…'}
                  className="w-full resize-none rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-[15px] leading-[20px] placeholder:text-white/40 px-3 py-[11px] pr-3 focus:outline-none focus:border-elec-yellow/50 focus:bg-white/[0.07] max-h-[120px] touch-manipulation transition-colors"
                  style={{
                    height: '44px',
                    minHeight: '44px',
                  }}
                />
              </div>
              {/* Mic — voice dictation */}
              {voice.supported && (
                <button
                  type="button"
                  onClick={() => (voice.listening ? voice.stop() : voice.start())}
                  aria-label={voice.listening ? 'Stop dictation' : 'Start dictation'}
                  className={cn(
                    'h-11 w-11 p-0 rounded-xl shrink-0 flex items-center justify-center touch-manipulation transition-colors',
                    voice.listening
                      ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                      : 'bg-white/[0.06] text-white/70 hover:bg-white/[0.1]'
                  )}
                >
                  {voice.listening ? (
                    <MicOff className="h-5 w-5" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </button>
              )}
              {sending ? (
                <button
                  type="button"
                  onClick={() => streamAbortRef.current?.abort()}
                  aria-label="Stop generating"
                  className="h-11 w-11 p-0 rounded-xl shrink-0 touch-manipulation flex items-center justify-center bg-white text-black active:scale-[0.95] transition-transform"
                >
                  <Square className="h-4 w-4 fill-black" />
                </button>
              ) : (
                <Button
                  type="submit"
                  disabled={!input.trim() || !isOnline}
                  className={cn(
                    'h-11 w-11 p-0 rounded-xl shrink-0 touch-manipulation',
                    input.trim() && isOnline
                      ? 'bg-gradient-to-br from-elec-yellow to-amber-500 text-black active:scale-[0.95]'
                      : 'bg-white/10 text-white/40'
                  )}
                >
                  <Send className="h-5 w-5" />
                </Button>
              )}
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

