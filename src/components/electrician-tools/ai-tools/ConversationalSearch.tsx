import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { InspectorMessage } from './InspectorMessage';
import { useSmoothedStreaming } from '@/hooks/useSmoothedStreaming';
import { useHaptic } from '@/hooks/useHaptic';
import { useAIChatHistory } from '@/hooks/useAIChatHistory';
import { useOfflineAICache } from '@/hooks/useOfflineAICache';
import { supabase } from '@/integrations/supabase/client';
import { mintFreshSignedUrl, useStorageUrls } from '@/utils/storageUrls';
import { isImageFile, validateImageSize, compressImageForUpload } from '@/utils/imageUploadUtils';
import {
  ChatContainer,
  ChatMessagesArea,
  ChatInputArea,
  SearchingSkeleton,
  FollowUpChips,
  MobileChatInput,
  WelcomeScreen,
  ChatHistoryDrawer,
  RegulationDetailSheet,
  SaveToJobSheet,
} from './chat';
import { AddToEicrSheet } from './chat/AddToEicrSheet';
import { SourcesRail } from './chat/SourcesRail';
import { ArrowDown, FileText, X } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  followUpQuestions?: string[];
  /**
   * First attached image — kept for back-compat with old chat history.
   * New messages store the bare visual-uploads storage path; legacy history
   * holds full public URLs. Render via the useStorageUrls resolution below.
   */
  imageUrl?: string;
  /** All attached images on the user message (max 5) — paths or legacy URLs. */
  imageUrls?: string[];
  /**
   * Filenames of PDFs attached to this question. Names only, not paths — this
   * exists so the transcript still shows WHAT was asked about after a reload.
   * Without it the question reads as though no document was ever attached.
   */
  documentNames?: string[];
  /** Regulation numbers cited in this answer (populated post-stream). */
  citedRegulations?: string[];
  /** Thumbs feedback given on this answer (persists with history). */
  feedback?: 'positive' | 'negative';
  /** A "what went wrong" reason was recorded for a negative vote. */
  feedbackReasonGiven?: boolean;
  /**
   * Server signalled generation failed — this message is the fallback apology,
   * not an answer. Suppresses the verification badge and Save-to-job.
   */
  isError?: boolean;
}

const MAX_IMAGES_PER_MESSAGE = 5;
// Must stay in step with the same constants in the conversational-search edge
// function — it enforces them again server-side.
const MAX_DOCUMENTS_PER_MESSAGE = 3;
// Per-file AND combined ceilings — see the derivation in the edge function.
// Anthropic caps the whole request at 32 MB and base64 inflates by ~37%, so a
// per-file limit alone wasn't safe: 3 × 20 MB would have blown the cap.
// Enforced again server-side; these exist to fail fast with a clear message.
const MAX_DOCUMENT_BYTES = 20 * 1024 * 1024;
const MAX_DOCUMENT_BYTES_TOTAL = 20 * 1024 * 1024;
const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(0)} MB`;

const STREAM_STAGES = [
  'Reading your question…',
  'Searching 46,000+ regulation facets…',
  'Writing your answer…',
] as const;

import {
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY as SUPABASE_KEY,
} from '@/integrations/supabase/client';

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  // Under 1h → use date-fns for natural phrasing ("2 minutes ago").
  if (diffMins < 60) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  // Under 24h → absolute HH:MM in UK format.
  if (diffMs < 24 * 60 * 60 * 1000) {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/**
 * Parse `---REGULATIONS---(...)---END_REGULATIONS---` block for cited reg
 * numbers. Tolerant to absence — returns empty array when missing.
 */
function extractCitedRegulations(text: string): string[] {
  const match = text.match(/---REGULATIONS---([\s\S]*?)(?:---END_REGULATIONS---|$)/);
  if (!match) {
    // Fallback: scrape "Reg 411.4.1" / "Regulation 411.4.1" style tokens.
    const inline = text.match(/(?:Reg(?:ulation)?\s+)(\d{3}(?:\.\d+)*)/g);
    if (!inline) return [];
    return Array.from(
      new Set(inline.map((s) => s.replace(/^Reg(?:ulation)?\s+/i, '').trim()))
    ).slice(0, 10);
  }
  return match[1]
    .split(/[\n,]/)
    .map((x) => x.replace(/[^\d.]/g, '').trim())
    .filter(Boolean)
    .slice(0, 10);
}

export default function ConversationalSearch() {
  const navigate = useNavigate();
  const chatHistory = useAIChatHistory();
  const [messages, setMessages] = useState<Message[]>(() => chatHistory.loadFromLocalStorage());
  const [hasRestoredSession, setHasRestoredSession] = useState(false);

  // ELE-584: cross-device resume. The local cache only exists on the device
  // that held the chat — on a fresh device (or after an iOS storage purge)
  // pick up the latest server session so the conversation follows the user.
  const attemptedResumeRef = useRef(false);
  useEffect(() => {
    if (attemptedResumeRef.current) return;
    attemptedResumeRef.current = true;
    if (messages.length > 0) return; // device already has the conversation
    chatHistory.resumeLatestSession().then((resumed) => {
      if (resumed.length === 0) return;
      // Never clobber anything the user started typing/streaming meanwhile.
      setMessages((prev) => (prev.length === 0 ? resumed : prev));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  /** Attached PDFs — datasheets, a previous EICR, a spec, a DNO letter. */
  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);
  /** Camera/Photo/Document strip — folded behind the composer's "+". */
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isDraggingDoc, setIsDraggingDoc] = useState(false);
  /** True while attachments upload — before the request is even made. */
  const [isUploading, setIsUploading] = useState(false);
  /** Blocks re-entry into handleSend while attachments are still uploading. */
  const sendingRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isNearBottomRef = useRef(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const haptic = useHaptic();
  const offlineCache = useOfflineAICache();

  // Sheets + regeneration state.
  const [regulationSheet, setRegulationSheet] = useState<{
    open: boolean;
    regulationNumber: string | null;
  }>({ open: false, regulationNumber: null });
  const [saveSheet, setSaveSheet] = useState<{
    open: boolean;
    answer: string;
    question: string;
    cited: string[];
    imageUrls: string[];
  }>({ open: false, answer: '', question: '', cited: [], imageUrls: [] });
  const [eicrSheet, setEicrSheet] = useState<{
    open: boolean;
    answer: string;
    question: string;
    cited: string[];
  }>({ open: false, answer: '', question: '', cited: [] });

  // Streaming-status chip. `stage` is either a value emitted from the
  // backend (future-friendly) or an index into STREAM_STAGES.
  const [streamStatus, setStreamStatus] = useState<string | null>(null);
  // Retrieved regs, emitted the moment retrieval completes — fills the
  // desktop rail while the answer is still writing. Swapped for the
  // actually-cited set when the stream ends.
  const [liveSources, setLiveSources] = useState<string[]>([]);
  const stageTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Batched token streaming — flush every 80ms.
  const streaming = useSmoothedStreaming({ flushInterval: 80 });

  // Resolve message photo references for rendering — new messages hold bare
  // visual-uploads paths (signed on demand), legacy history holds full public
  // URLs (passed through untouched).
  const messageImageRefs = useMemo(
    () =>
      messages.flatMap((m) =>
        m.imageUrls && m.imageUrls.length > 0 ? m.imageUrls : m.imageUrl ? [m.imageUrl] : []
      ),
    [messages]
  );
  const { urls: resolvedImageUrls } = useStorageUrls('visual-uploads', messageImageRefs);

  // Auto-focus input on load (desktop only)
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile && messages.length === 0) {
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0 && !hasRestoredSession) {
      setHasRestoredSession(true);
      const timeoutId = setTimeout(() => {
        toast.success('Previous conversation restored', {
          description: 'Your chat history has been recovered',
          duration: 3000,
        });
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, []); // mount only

  useEffect(() => {
    if (!isStreaming && messages.length > 0) {
      chatHistory.saveSession(messages);
    }
  }, [messages, isStreaming, chatHistory.saveSession]);

  // No auto-scroll to bottom. Users want to read the answer from the top of
  // their question, with streaming content growing below the fold. We pin the
  // new user message to the top of the viewport and leave scroll alone
  // thereafter — the reader sets the pace.
  // Deliberately NOT auto-scrolling (see above) leaves one gap: on a long
  // streamed answer the text grows below the fold with no way back down. Track
  // distance from the bottom so we can offer a jump — the reader keeps control,
  // but never loses the end of the answer.
  const [isAwayFromLatest, setIsAwayFromLatest] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Threshold, not zero: sub-pixel rounding and the streaming tail would
  // otherwise flicker the control on and off. Identical values don't re-render,
  // so recomputing freely is cheap.
  const recomputeAwayFromLatest = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    setIsAwayFromLatest(el.scrollHeight - el.scrollTop - el.clientHeight > 260);
  }, []);

  const handleScrollPosition = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => recomputeAwayFromLatest(e.currentTarget),
    [recomputeAwayFromLatest]
  );

  // Scroll events are not enough. While an answer streams, content grows below a
  // stationary viewport — scrollHeight changes but the browser fires no scroll
  // event, so a scroll-only listener stays stale through exactly the case this
  // control exists for.
  //
  // Do NOT drive this off the streamed text. `displayedText` updates on every
  // animation frame (useSmoothedStreaming's rAF loop), so an effect keyed on it
  // calls setState ~60×/sec and React never settles — that produced
  // "Maximum update depth exceeded". A low-rate poll while streaming is ample
  // for a jump affordance and cannot feed back into itself; scroll events still
  // update it instantly.
  useEffect(() => {
    recomputeAwayFromLatest(scrollContainerRef.current);
    if (!isStreaming) return;
    const id = window.setInterval(
      () => recomputeAwayFromLatest(scrollContainerRef.current),
      300
    );
    return () => window.clearInterval(id);
  }, [isStreaming, messages.length, recomputeAwayFromLatest]);

  const scrollToLatest = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);

  // When a new user message is appended, scroll it to the top of the chat area
  // so the reader starts at the question and reads down naturally. No scroll
  // during or after streaming — the stream fills below the fold.
  const lastAnchoredUserIdxRef = useRef<number>(-1);
  useEffect(() => {
    if (messages.length === 0) return;
    const lastIdx = messages.length - 1;
    const lastMsg = messages[lastIdx];
    if (lastMsg.role !== 'user') return;
    if (lastIdx === lastAnchoredUserIdxRef.current) return;
    lastAnchoredUserIdxRef.current = lastIdx;

    // Defer one frame so the DOM has the new user bubble mounted.
    const t = window.setTimeout(() => {
      const el = document.querySelector<HTMLElement>(`[data-msg-anchor="user-${lastIdx}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
    return () => window.clearTimeout(t);
  }, [messages]);

  // Tear down stage timer on unmount — otherwise setInterval leaks.
  useEffect(() => {
    return () => {
      if (stageTimerRef.current) {
        clearInterval(stageTimerRef.current);
        stageTimerRef.current = null;
      }
    };
  }, []);

  // Image handling — supports up to MAX_IMAGES_PER_MESSAGE photos per turn.
  // Each call APPENDS to the current set (deliberately — sparkies often add
  // extra angles after a first shot). At the cap, we toast and ignore.
  const handleImageSelect = useCallback(
    async (file: File) => {
      if (!isImageFile(file)) {
        toast.error('Please select an image');
        return;
      }
      if (selectedImages.length >= MAX_IMAGES_PER_MESSAGE) {
        toast.message(`Up to ${MAX_IMAGES_PER_MESSAGE} photos per question`);
        return;
      }
      const validation = validateImageSize(file);
      if (!validation.valid) {
        toast.error(validation.error);
        return;
      }

      const needsCompression = file.size > 2 * 1024 * 1024;
      if (needsCompression) {
        setIsCompressing(true);
      }

      try {
        const compressed = await compressImageForUpload(file);
        setSelectedImages((prev) => [...prev, compressed]);
        setImagePreviews((prev) => [...prev, URL.createObjectURL(compressed)]);
        haptic.selection();

        if (needsCompression) {
          const savedMB = ((file.size - compressed.size) / 1024 / 1024).toFixed(1);
          toast.success(`Image optimised (saved ${savedMB}MB)`);
        }
      } catch (error) {
        console.error('Image processing error:', error);
        toast.error('Failed to process image');
      } finally {
        setIsCompressing(false);
      }
    },
    [haptic, selectedImages.length]
  );

  const removeImageAt = useCallback((index: number) => {
    setImagePreviews((prev) => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== index);
    });
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearImage = useCallback(() => {
    setImagePreviews((prev) => {
      prev.forEach((u) => URL.revokeObjectURL(u));
      return [];
    });
    setSelectedImages([]);
  }, []);

  // Document handling. Deliberately reuses the `visual-uploads` bucket rather
  // than adding a new one: its RLS is already correct, and creating a bucket
  // whose SELECT policy is wrong silently breaks uploads entirely (an
  // INSERT..RETURNING checks SELECT). Same limits as the edge function.
  const handleDocumentSelect = useCallback(
    (files: File[]) => {
      const pdfs = files.filter(
        (f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
      );
      if (pdfs.length === 0) {
        // Only reached via the Document button (the drop zone routes by type
        // before getting here), so name what this control is for.
        // Plain apostrophe: this is a JS string handed to a toast, not JSX, so
        // an HTML entity would be shown to the user literally.
        toast.error('That file type isn’t supported', {
          description: 'PDFs here; photos via Camera or Photo.',
        });
        return;
      }
      const oversized = pdfs.filter((f) => f.size > MAX_DOCUMENT_BYTES);
      if (oversized.length > 0) {
        toast.error(`${oversized[0].name} is too big`, {
          description: `Maximum ${mb(MAX_DOCUMENT_BYTES)} per PDF. Try attaching just the pages you need.`,
        });
      }
      const usable = pdfs.filter((f) => f.size <= MAX_DOCUMENT_BYTES);
      if (usable.length === 0) return;

      setSelectedDocuments((prev) => {
        const room = MAX_DOCUMENTS_PER_MESSAGE - prev.length;
        if (room <= 0) {
          toast.message(`Up to ${MAX_DOCUMENTS_PER_MESSAGE} documents per question`);
          return prev;
        }

        // Combined budget. Accept files while they fit so one huge PDF can't
        // silently push a later small one out server-side — better to say no
        // here, with the reason, than to drop it after upload.
        let running = prev.reduce((sum, f) => sum + f.size, 0);
        const accepted: File[] = [];
        let rejectedForTotal = 0;
        for (const f of usable.slice(0, room)) {
          if (running + f.size > MAX_DOCUMENT_BYTES_TOTAL) {
            rejectedForTotal += 1;
            continue;
          }
          running += f.size;
          accepted.push(f);
        }
        if (rejectedForTotal > 0) {
          toast.error("That's over the combined limit", {
            description: `${mb(MAX_DOCUMENT_BYTES_TOTAL)} total across attachments. Remove one, or attach fewer pages.`,
          });
        }
        if (usable.length > room) {
          toast.message(`Only the first ${room} added — ${MAX_DOCUMENTS_PER_MESSAGE} max per question`);
        }
        if (accepted.length === 0) return prev;
        return [...prev, ...accepted];
      });
      haptic.selection();
    },
    [haptic]
  );

  const removeDocument = useCallback((idx: number) => {
    setSelectedDocuments((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  /**
   * Anything dropped on the conversation. Routes by type rather than demanding
   * the user pick the right button first: PDFs become documents, images (PNG,
   * JPEG, HEIC…) go through the existing photo pipeline with its compression
   * and size validation. Only genuinely unsupported types get an error.
   */
  const handleDroppedFiles = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      const pdfs = files.filter(
        (f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
      );
      const images = files.filter((f) => isImageFile(f));
      const unsupported = files.filter((f) => !pdfs.includes(f) && !images.includes(f));

      if (pdfs.length > 0) handleDocumentSelect(pdfs);
      // Sequential: each image may be compressed, and handleImageSelect owns the
      // per-file cap and toasts.
      for (const img of images) await handleImageSelect(img);

      if (unsupported.length > 0 && pdfs.length === 0 && images.length === 0) {
        toast.error(`Can't read ${unsupported[0].name}`, {
          description: 'Drop a PDF or an image (PNG, JPEG, HEIC).',
        });
      }
    },
    [handleDocumentSelect, handleImageSelect]
  );

  const uploadDocument = useCallback(async (file: File): Promise<string> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Keep the original filename in the path — it's what the user recognises if
    // they ever go looking, and the edge function passes it to the model as the
    // document title so answers can attribute per-file.
    const safeName = file.name.replace(/[^\w.-]+/g, '_').slice(-80);
    const fileName = `${user.id}/elec-ai/docs/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}-${safeName}`;

    const { error } = await supabase.storage.from('visual-uploads').upload(fileName, file, {
      contentType: 'application/pdf',
    });
    if (error) throw error;
    return fileName;
  }, []);

  // Returns the bare storage PATH (not a URL) — the message keeps the path so
  // history survives the visual-uploads privacy flip; rendering resolves it
  // and the edge fn gets a fresh signed URL minted at send time.
  const uploadImage = useCallback(async (file: File): Promise<string> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const fileName = `${user.id}/elec-ai/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;

    const { error } = await supabase.storage.from('visual-uploads').upload(fileName, file);

    if (error) throw error;

    return fileName;
  }, []);

  const handleSend = useCallback(
    async (queryText?: string, options?: { replaceLastAssistant?: boolean }) => {
      const messageText = queryText || input.trim();

      // A document with no caption is a valid request ("what's wrong with this
      // EICR?"), same as a photo with no caption.
      if (!messageText && selectedImages.length === 0 && selectedDocuments.length === 0) return;

      // Re-entry guard. Attachments upload BEFORE `isStreaming` is set, and the
      // input's own submit guard only checks `isStreaming` — so during an upload
      // (up to 8 MB per PDF, on site 4G) a second tap on Send would run this
      // whole function again: two uploads, two user messages, two requests.
      if (sendingRef.current) return;
      sendingRef.current = true;

      haptic.medium();

      // Upload all attached photos in parallel — first one becomes the
      // legacy `imageUrl` for back-compat, full set lives in `imageUrls`.
      // Messages store bare storage PATHS; the edge fn (which fetches the
      // images server-side) gets fresh signed URLs minted at send time.
      const hasAttachments = selectedImages.length > 0 || selectedDocuments.length > 0;
      if (hasAttachments) setIsUploading(true);

      let imageUrls: string[] = [];
      let sendImageUrls: string[] = [];
      if (selectedImages.length > 0) {
        try {
          imageUrls = await Promise.all(selectedImages.map((f) => uploadImage(f)));
          sendImageUrls = (
            await Promise.all(imageUrls.map((p) => mintFreshSignedUrl('visual-uploads', p)))
          ).filter((u): u is string => !!u);
          if (sendImageUrls.length !== imageUrls.length) {
            throw new Error('signing failed');
          }
          clearImage();
        } catch {
          toast.error('Failed to upload one or more images');
          setIsUploading(false);
          sendingRef.current = false;
          return;
        }
      }
      const imageUrl = imageUrls[0];

      // Same shape for documents: upload, then hand the edge function fresh
      // signed URLs (it fetches and base64-encodes them for Claude server-side,
      // so a multi-MB PDF never travels through the request body).
      let sendDocumentUrls: string[] = [];
      let sendDocumentNames: string[] = [];
      if (selectedDocuments.length > 0) {
        try {
          const paths = await Promise.all(selectedDocuments.map((f) => uploadDocument(f)));
          sendDocumentUrls = (
            await Promise.all(paths.map((p) => mintFreshSignedUrl('visual-uploads', p)))
          ).filter((u): u is string => !!u);
          if (sendDocumentUrls.length !== paths.length) throw new Error('signing failed');
          sendDocumentNames = selectedDocuments.map((f) => f.name);
          setSelectedDocuments([]);
        } catch {
          toast.error('Failed to upload one or more documents');
          setIsUploading(false);
          sendingRef.current = false;
          return;
        }
      }

      const isRegenerate = !!options?.replaceLastAssistant;

      // Regenerate path: drop the trailing assistant message (the user
      // message that precedes it stays in place and is reused verbatim).
      // baseMessages is what gets sent to the backend alongside the
      // user-question. For a fresh send we append a new user message.
      let baseMessages: Message[] = messages;
      if (isRegenerate) {
        const trimmed =
          messages.length > 0 && messages[messages.length - 1].role === 'assistant'
            ? messages.slice(0, -1)
            : messages;
        setMessages(trimmed);
        // For regenerate, the prior user message is already inside
        // `trimmed`, so we do NOT add another user message to the fetch.
        baseMessages = trimmed.slice(0, -1);
      }

      const userMessage: Message = {
        role: 'user',
        content: messageText || 'What can you tell me about this?',
        timestamp: new Date(),
        imageUrl,
        imageUrls: imageUrls.length > 0 ? imageUrls : undefined,
        documentNames: sendDocumentNames.length > 0 ? sendDocumentNames : undefined,
      };

      if (!isRegenerate) {
        setMessages((prev) => [...prev, userMessage]);
      }
      setInput('');
      setIsUploading(false);
      setIsSearching(true);
      setIsStreaming(true);
      setLiveSources([]);
      streaming.reset();

      // Kick off stage-cycle fallback; cleared below if server emits status.
      setStreamStatus(STREAM_STAGES[0]);
      if (stageTimerRef.current) clearInterval(stageTimerRef.current);
      let stageIdx = 0;
      stageTimerRef.current = setInterval(() => {
        stageIdx = Math.min(stageIdx + 1, STREAM_STAGES.length - 1);
        setStreamStatus(STREAM_STAGES[stageIdx]);
      }, 1400);

      try {
        abortControllerRef.current = new AbortController();

        const response = await fetch(`${SUPABASE_URL}/functions/v1/conversational-search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...baseMessages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
            })),
            // Fresh signed URLs — the backend fetches these server-side.
            imageUrl: sendImageUrls[0],
            imageUrls: sendImageUrls.length > 0 ? sendImageUrls : undefined,
            documentUrls: sendDocumentUrls.length > 0 ? sendDocumentUrls : undefined,
            documentNames: sendDocumentNames.length > 0 ? sendDocumentNames : undefined,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          if (response.status === 429) {
            toast.error('Rate limit exceeded', {
              description: 'Please wait a moment and try again.',
            });
            setMessages((prev) => prev.slice(0, -1));
            haptic.error();
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setIsSearching(false);

        const assistantMessage: Message = {
          role: 'assistant',
          content: '',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let buffer = '';
        // Set by an `{ type: 'error' }` frame — the stream still completes with a
        // 200 and apology prose, so this is the only way to know it failed.
        let sawStreamError = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            const finalContent = streaming.flush();

            const followUpMatch = finalContent.match(
              /---FOLLOWUP---([\s\S]*?)(?:---END_FOLLOWUP---|$)/
            );
            let questions: string[] = [];
            let cleanedContent = finalContent;

            if (followUpMatch) {
              questions = followUpMatch[1]
                .trim()
                .split('\n')
                .map((q) => q.replace(/^[\s•\-*]*\d*[.)]*\s*/, '').trim())
                .filter((q) => q.length > 0 && q.endsWith('?'));

              cleanedContent = finalContent
                .replace(/---FOLLOWUP---[\s\S]*?(?:---END_FOLLOWUP---|$)/g, '')
                .trim();
            }

            // Strip optional regulations marker block if the backend starts
            // emitting one; we keep the cited numbers for offline cache
            // metadata.
            const citedRegs = extractCitedRegulations(cleanedContent);
            cleanedContent = cleanedContent
              .replace(/---REGULATIONS---[\s\S]*?(?:---END_REGULATIONS---|$)/g, '')
              .trim();

            setMessages((prev) => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              if (lastMessage?.role === 'assistant') {
                lastMessage.content = cleanedContent;
                if (questions.length > 0) {
                  lastMessage.followUpQuestions = questions;
                }
                if (citedRegs.length > 0) {
                  lastMessage.citedRegulations = citedRegs;
                }
                if (sawStreamError) {
                  lastMessage.isError = true;
                }
              }
              return newMessages;
            });

            // Persist to offline cache — fire-and-forget. Never cache a failure:
            // it would be served back offline as though it were an answer.
            if (!sawStreamError) {
              void offlineCache.save({
                question: userMessage.content,
                answer: cleanedContent,
                sources: citedRegs.map((n) => ({ regulation_number: n })),
              });
            }
            break;
          }

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);

                // Server hit an error mid-stream. The prose that follows is the
                // generic apology, not an answer — flag it so the footer drops
                // the verification badge and Save-to-job.
                if (parsed?.type === 'error') {
                  sawStreamError = true;
                  continue;
                }

                // Early sources — retrieved regs, before any prose arrives.
                if (parsed?.type === 'sources' && Array.isArray(parsed.regNumbers)) {
                  setLiveSources(
                    parsed.regNumbers.filter((r: unknown): r is string => typeof r === 'string')
                  );
                  continue;
                }

                // Optional status event, eg `{ type: 'status', stage: '…' }`.
                // Rendered as a human line that shows the machinery working —
                // perceived speed and perceived rigour in one stroke.
                if (parsed?.type === 'status' && typeof parsed.stage === 'string') {
                  if (stageTimerRef.current) {
                    clearInterval(stageTimerRef.current);
                    stageTimerRef.current = null;
                  }
                  const stageLabels: Record<string, string> = {
                    understanding: 'Reading your question…',
                    retrieving: 'Searching 46,000+ regulation facets…',
                    ranking:
                      typeof parsed.candidates === 'number' && parsed.candidates > 0
                        ? `Ranking ${parsed.candidates} sources…`
                        : 'Ranking sources…',
                    answering: 'Writing your answer…',
                    tool_call: 'Running a BS 7671 lookup…',
                    reading_documents:
                      typeof parsed.count === 'number' && parsed.count > 1
                        ? `Reading your ${parsed.count} documents…`
                        : 'Reading your document…',
                    cache_hit: '',
                  };
                  setStreamStatus(stageLabels[parsed.stage] ?? parsed.stage);
                  continue;
                }

                const token = parsed.choices?.[0]?.delta?.content;

                if (token) {
                  streaming.addTokens(token);
                }
              } catch {
                // Ignore JSON parse errors
              }
            }
          }
        }
      } catch (error: unknown) {
        const err = error as Error;
        if (err.name === 'AbortError') {
          return;
        }

        toast.error('Failed to get response', {
          description: err.message,
        });
        haptic.error();

        setMessages((prev) => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg?.role === 'assistant') {
            return prev.slice(0, -2);
          }
          return prev.slice(0, -1);
        });
      } finally {
        streaming.stop();
        setIsStreaming(false);
        setIsSearching(false);
        abortControllerRef.current = null;
        if (stageTimerRef.current) {
          clearInterval(stageTimerRef.current);
          stageTimerRef.current = null;
        }
        setStreamStatus(null);
        setIsUploading(false);
        sendingRef.current = false;
      }
    },
    [
      input,
      messages,
      streaming,
      haptic,
      selectedImages,
      uploadImage,
      clearImage,
      offlineCache,
      // Load-bearing: without these the callback closes over a stale empty
      // document list, so attaching a PDF and pressing Send silently posts the
      // question with no document at all. `selectedImages` was already here,
      // which is why the image path never showed the same bug.
      selectedDocuments,
      uploadDocument,
    ]
  );

  const handleNewChat = useCallback(() => {
    chatHistory.startNewSession();
    setMessages([]);
    haptic.selection();
    toast.success('New chat started');
  }, [chatHistory, haptic]);

  // ChatGPT-style stop. Aborts the in-flight fetch — the streaming
  // pipeline's `finally` block does the rest (resets state, frees the
  // controller). The user is then free to ask a different question.
  const handleStop = useCallback(() => {
    if (!abortControllerRef.current) return;
    haptic.warning();
    try {
      abortControllerRef.current.abort();
    } catch (err) {
      console.warn('[ConversationalSearch] abort failed:', err);
    }
  }, [haptic]);

  const handleLoadSession = useCallback(
    async (id: string) => {
      const loadedMessages = await chatHistory.loadSession(id);
      setMessages(loadedMessages);
      setHasRestoredSession(true);
    },
    [chatHistory]
  );

  const handleFollowUpSelect = useCallback(
    (question: string) => {
      // ELE-862: chips are suggested follow-ups (user-voice) — tapping
      // sends them straight to the AI rather than dropping into the input
      // box. The previous behaviour caused the user to feel like the AI was
      // asking THEM the questions, because the user had to "send" the
      // suggestion themselves.
      haptic.selection();
      void handleSend(question);
    },
    [haptic, handleSend]
  );

  // Regenerate the last assistant message by resubmitting the preceding
  // user question. Needs at least one user+assistant pair.
  const handleRegenerate = useCallback(() => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUser) return;
    haptic.medium();
    toast.message('Regenerating answer…');
    void handleSend(lastUser.content, { replaceLastAssistant: true });
  }, [messages, haptic, handleSend]);

  const handleOpenSaveSheet = useCallback(
    (message: Message) => {
      // Find the user question that produced this answer + any photos they attached.
      const idx = messages.indexOf(message);
      const userMsg = idx > 0 && messages[idx - 1].role === 'user' ? messages[idx - 1] : undefined;
      const question = userMsg?.content || '';
      const imageUrls =
        userMsg?.imageUrls && userMsg.imageUrls.length > 0
          ? userMsg.imageUrls
          : userMsg?.imageUrl
            ? [userMsg.imageUrl]
            : [];
      setSaveSheet({
        open: true,
        answer: message.content,
        question,
        cited: message.citedRegulations ?? [],
        imageUrls,
      });
    },
    [messages]
  );

  const handleOpenEicrSheet = useCallback(
    (message: Message) => {
      const idx = messages.indexOf(message);
      const userMsg = idx > 0 && messages[idx - 1].role === 'user' ? messages[idx - 1] : undefined;
      setEicrSheet({
        open: true,
        answer: message.content,
        question: userMsg?.content || '',
        cited: message.citedRegulations ?? [],
      });
    },
    [messages]
  );

  const handleOpenSources = useCallback((message: Message) => {
    const first = message.citedRegulations?.[0];
    if (!first) {
      toast.message('No regulations cited in this answer');
      return;
    }
    setRegulationSheet({ open: true, regulationNumber: first });
  }, []);

  // Thumbs feedback → elec_ai_feedback (its own table; the old
  // ai_interaction_feedback insert violated that table's CHECK constraints —
  // v3 agent whitelist, ±1 ratings — so every vote 400'd silently for as long
  // as the feature existed). Row ids are kept so a negative vote's reason chip
  // can attach to the row it belongs to; state not a ref, because the chips'
  // visibility must re-render when the id arrives.
  const [feedbackRows, setFeedbackRows] = useState<Record<number, string>>({});

  // Mirror of the chat session id. A brand-new conversation only gets its id
  // once the first debounced save returns, so a vote cast quickly after the
  // answer races it and the closure sees null — the ref lets a deferred
  // backfill read the id that arrived moments later.
  const sessionIdRef = useRef<string | null>(chatHistory.currentSessionId);
  useEffect(() => {
    sessionIdRef.current = chatHistory.currentSessionId;
  }, [chatHistory.currentSessionId]);

  const handleFeedback = useCallback(
    async (idx: number, rating: 'positive' | 'negative') => {
      const message = messages[idx];
      if (!message || message.role !== 'assistant' || message.feedback) return;

      // Optimistic UI — persists with chat history.
      setMessages((prev) => prev.map((m, i) => (i === idx ? { ...m, feedback: rating } : m)));

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('not signed in');

        // The question is the nearest preceding user message.
        const question =
          [...messages.slice(0, idx)].reverse().find((m) => m.role === 'user')?.content || '';

        // Session ids come from ai_chat_history as strings; the column is
        // uuid, so only pass one that actually is.
        const sid = chatHistory.currentSessionId;
        const sessionId =
          sid && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(sid)
            ? sid
            : null;

        const { data, error } = await supabase
          .from('elec_ai_feedback')
          .insert({
            user_id: user.id,
            agent: 'elec-ai',
            session_id: sessionId,
            question: question.slice(0, 2000),
            answer: message.content.slice(0, 8000),
            rating,
            cited_regulations: message.citedRegulations ?? [],
          })
          .select('id')
          .single();
        if (error) throw error;
        setFeedbackRows((prev) => ({ ...prev, [idx]: data.id }));

        // Backfill the session link if the vote raced the first session save.
        if (!sessionId) {
          window.setTimeout(() => {
            const late = sessionIdRef.current;
            if (
              late &&
              /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(late)
            ) {
              void supabase.from('elec_ai_feedback').update({ session_id: late }).eq('id', data.id);
            }
          }, 2500);
        }
      } catch (err) {
        console.warn('[feedback] insert failed:', err);
        // Un-light the thumb — a lit vote over a failed write would be a lie,
        // and reverting lets the user simply tap again.
        setMessages((prev) =>
          prev.map((m, i) => (i === idx ? { ...m, feedback: undefined } : m))
        );
        toast.error("Couldn't save your rating", { description: 'Tap to try again.' });
      }
    },
    [messages, chatHistory.currentSessionId]
  );

  // One-tap "what went wrong" after a thumbs-down — updates the row the vote
  // created. This is what makes a negative vote diagnosable rather than a
  // bare count.
  const handleFeedbackReason = useCallback(
    async (idx: number, reason: string) => {
      const rowId = feedbackRows[idx];
      setMessages((prev) =>
        prev.map((m, i) => (i === idx ? { ...m, feedbackReasonGiven: true } : m))
      );
      if (!rowId) return;
      const { error } = await supabase
        .from('elec_ai_feedback')
        .update({ reasons: [reason] })
        .eq('id', rowId);
      if (error) {
        console.warn('[feedback] reason update failed:', error);
        return;
      }
      toast.message('Thanks — flagged for review', {
        description: 'Wrong or unhelpful answers get looked at directly.',
      });
    },
    [feedbackRows]
  );

  const handleInlineRegClick = useCallback(
    (regNumber: string) => {
      if (!regNumber) return;
      setRegulationSheet({ open: true, regulationNumber: regNumber });
      haptic.selection();
    },
    [haptic]
  );

  // Called by RegulationDetailSheet when the user wants to ask a follow-up.
  const handleRegFollowUp = useCallback(
    (seed: string) => {
      setInput(seed);
      setRegulationSheet({ open: false, regulationNumber: null });
      // Focus after the sheet has animated out.
      setTimeout(() => inputRef.current?.focus(), 250);
      haptic.selection();
    },
    [haptic]
  );

  // Voice transcription → append to existing input text.
  const handleVoiceTranscript = useCallback(
    (transcript: string) => {
      setInput((prev) => {
        const trimmed = prev.trim();
        return trimmed ? `${trimmed} ${transcript.trim()}` : transcript.trim();
      });
      inputRef.current?.focus();
      haptic.selection();
    },
    [haptic]
  );

  // Guarded follow-up / suggestion handler — confirms discard when the
  // user has typed a substantial draft.
  const handleGuardedSelectQuery = useCallback(
    (question: string) => {
      const DRAFT_THRESHOLD = 100;
      if (input.trim().length >= DRAFT_THRESHOLD) {
        const keep = window.confirm('Discard your current draft and use this suggestion instead?');
        if (!keep) return;
      }
      void handleSend(question);
    },
    [input, handleSend]
  );

  const offlineBannerVisible = useMemo(
    () => !offlineCache.isOnline && messages.length === 0,
    [offlineCache.isOnline, messages.length]
  );

  return (
    <ChatContainer
      /*
       * Desktop drag-and-drop. Dropping a PDF onto the conversation is the
       * natural gesture and there was nowhere to do it. dragenter/over must both
       * preventDefault or the browser navigates away to the file instead.
       * `relatedTarget === null` is the reliable "left the window" signal —
       * dragleave also fires when crossing between child elements.
       */
      onDragEnter={(e) => {
        if (!e.dataTransfer?.types?.includes('Files')) return;
        e.preventDefault();
        setIsDraggingDoc(true);
      }}
      onDragOver={(e) => {
        if (!e.dataTransfer?.types?.includes('Files')) return;
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        if (e.relatedTarget === null) setIsDraggingDoc(false);
      }}
      onDrop={(e) => {
        if (!e.dataTransfer?.types?.includes('Files')) return;
        e.preventDefault();
        setIsDraggingDoc(false);
        void handleDroppedFiles(Array.from(e.dataTransfer.files ?? []));
      }}
    >
      {/* Drop affordance — only while a file is actually over the window */}
      <AnimatePresence>
        {isDraggingDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none absolute inset-3 z-40 flex flex-col items-center justify-center
              rounded-2xl border-2 border-dashed border-elec-yellow bg-black/70 backdrop-blur-sm"
          >
            <FileText className="h-8 w-8 text-elec-yellow" />
            <p className="mt-3 text-[15px] font-semibold text-white">Drop it here</p>
            <p className="mt-1 text-[12.5px] text-white">
              PDF or photo &middot; up to {MAX_DOCUMENTS_PER_MESSAGE} documents, {mb(MAX_DOCUMENT_BYTES)} each
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Masthead — same treatment as the hub pages: translucent volt ground,
          blur, one hairline. Text-only, no icons. */}
      <header className="shrink-0 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="flex items-center gap-2 sm:gap-4 px-4 sm:px-6 h-12">
          <button
            onClick={() => navigate('/electrician')}
            className="-ml-2 flex h-11 shrink-0 items-center whitespace-nowrap px-2 text-[12.5px] font-medium text-white transition-colors touch-manipulation"
          >
            ← Back
          </button>
          <div className="flex min-w-0 flex-1 items-baseline gap-2.5">
            <h1 className="truncate text-[13px] font-semibold tracking-tight text-white sm:text-sm">
              Elec-AI
            </h1>
            {/* Subtitle hidden on narrow screens to stop truncation (ASSISTA...) */}
            <span className="hidden h-3 w-px bg-white/10 sm:inline" aria-hidden />
            <span className="hidden sm:inline text-[10px] font-medium uppercase tracking-[0.18em] text-white truncate">
              BS 7671 A4:2026
            </span>
          </div>
          {!isStreaming && (
            <div className="shrink-0 flex items-center gap-1 text-[12.5px] font-medium">
              <button
                onClick={() => setHistoryOpen(true)}
                className="flex h-11 items-center px-2 text-white transition-colors touch-manipulation [-webkit-tap-highlight-color:transparent]"
                aria-label="Chat history"
              >
                History
              </button>
              {messages.length > 0 && (
                <button
                  onClick={handleNewChat}
                  className="flex h-11 items-center px-2 font-semibold text-elec-yellow transition-colors touch-manipulation [-webkit-tap-highlight-color:transparent]"
                  aria-label="New chat"
                >
                  New
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Empty state */}
      {messages.length === 0 && (
        <ChatMessagesArea className="px-4 sm:px-6 lg:px-10">
          {offlineBannerVisible && (
            <div className="mx-auto max-w-[1400px] pt-4">
              <div className="rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.10] via-white/[0.06] to-white/[0.04] px-4 py-3">
                <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white">
                  Offline · showing your last {offlineCache.limit} saved answers
                </div>
                <p className="mt-1 text-[12px] text-white leading-relaxed">
                  You’re offline. Elec-AI can’t stream new answers, but your recent cached answers
                  are below.
                </p>
              </div>
              {offlineCache.entries.length > 0 && (
                <div className="mt-3 space-y-2">
                  {offlineCache.entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.10] via-white/[0.06] to-white/[0.04] px-4 py-3"
                    >
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-elec-yellow">
                        {formatRelativeTime(new Date(entry.timestamp))}
                      </div>
                      <div className="mt-1 text-[13px] font-semibold text-white">
                        {entry.question}
                      </div>
                      <p className="mt-1 text-[13px] text-white leading-relaxed line-clamp-4 whitespace-pre-wrap">
                        {entry.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <WelcomeScreen
            onSelectQuery={handleGuardedSelectQuery}
            recentSessions={chatHistory.sessions}
            onResumeSession={handleLoadSession}
          />
        </ChatMessagesArea>
      )}

      {/* Active state — two-pane on xl: chat + persistent sources rail so
          the evidence for the current answer stays in view on desktop. */}
      {messages.length > 0 && (
        <ChatMessagesArea
          messagesEndRef={messagesEndRef}
          onScroll={handleScrollPosition}
          scrollContainerRef={scrollContainerRef}
          className="px-4 sm:px-6 lg:px-10"
        >
          {/* Same width budget as the composer (1400px) — the transcript used
              to cap at 4xl/7xl and float in dead space on wide monitors. */}
          <div className="mx-auto flex w-full max-w-[1400px] gap-0 py-4 sm:py-6">
            <div className="min-w-0 flex-1 space-y-6 sm:space-y-8 lg:pr-6 xl:pr-8">
            <AnimatePresence mode="popLayout">
              {messages.map((message, idx) => {
                const isCurrentlyStreaming =
                  isStreaming && idx === messages.length - 1 && message.role === 'assistant';
                return (
                  <motion.div
                    key={`${idx}-${message.role}`}
                    initial={isCurrentlyStreaming ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    layout={!isCurrentlyStreaming}
                    className="transform-gpu"
                  >
                    {message.role === 'user' ? (
                      <div
                        className="flex flex-col items-end min-w-0 scroll-mt-3"
                        data-msg-anchor={`user-${idx}`}
                      >
                        <div className="max-w-[92%] sm:max-w-[75%] min-w-0 space-y-2">
                          {(() => {
                            // Prefer the new array; fall back to legacy single.
                            // Stored refs are paths (new) or full URLs (legacy);
                            // both resolve through useStorageUrls above.
                            const stored = (
                              message.imageUrls && message.imageUrls.length > 0
                                ? message.imageUrls
                                : message.imageUrl
                                  ? [message.imageUrl]
                                  : []
                            ) as string[];
                            const urls = stored
                              .map((s) => ({ stored: s, url: resolvedImageUrls[s] }))
                              .filter((x): x is { stored: string; url: string } => !!x.url);
                            if (urls.length === 0) return null;
                            if (urls.length === 1) {
                              return (
                                <div className="rounded-2xl overflow-hidden ml-auto max-w-[220px] border border-white/[0.06]">
                                  <img
                                    src={urls[0].url}
                                    alt="Attached"
                                    className="w-full h-auto object-cover"
                                  />
                                </div>
                              );
                            }
                            return (
                              <div className="ml-auto flex flex-wrap justify-end gap-1.5 max-w-[260px]">
                                {urls.map(({ stored: key, url }, i) => (
                                  <div
                                    key={key}
                                    className="rounded-xl overflow-hidden border border-white/[0.06] w-[80px] h-[80px]"
                                  >
                                    <img
                                      src={url}
                                      alt={`Attached ${i + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            );
                          })()}
                          {/* Attached PDFs stay visible in the transcript. Without
                              this the question reads as though nothing was
                              attached, which makes the answer look unfounded on
                              a reload or when scrolling back. */}
                          {message.documentNames && message.documentNames.length > 0 && (
                            <div className="flex flex-col items-end gap-1.5">
                              {message.documentNames.map((name, i) => (
                                <span
                                  key={`${name}-${i}`}
                                  className="inline-flex max-w-full items-center gap-2 rounded-xl border border-white/[0.16] bg-white/[0.08] px-3 py-2"
                                >
                                  <FileText className="h-3.5 w-3.5 shrink-0 text-white" />
                                  <span className="min-w-0 truncate text-[12.5px] font-medium text-white">
                                    {name}
                                  </span>
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="rounded-2xl px-3.5 py-3 sm:px-4 border border-white/[0.16] bg-gradient-to-br from-white/[0.14] via-white/[0.09] to-white/[0.06] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10),0_2px_8px_-3px_rgba(0,0,0,0.75)]">
                            <div
                              className="whitespace-pre-wrap text-[14.5px] leading-relaxed"
                              style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                            >
                              {message.content}
                            </div>
                          </div>
                        </div>
                        {message.timestamp && (
                          <p className="mt-1 text-[11px] text-white text-right">
                            {formatRelativeTime(message.timestamp)}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-start">
                        <div className="w-full space-y-3">
                          <InspectorMessage
                            message={{
                              role: 'assistant',
                              content: isCurrentlyStreaming
                                ? streaming.displayedText
                                : message.content,
                              agentName: 'Elec-AI',
                              isError: message.isError,
                            }}
                            isStreaming={isCurrentlyStreaming}
                            onSaveToJob={
                              !isCurrentlyStreaming && !message.isError
                                ? () => handleOpenSaveSheet(message)
                                : undefined
                            }
                            onOpenSources={
                              !isCurrentlyStreaming && message.citedRegulations?.length
                                ? () => handleOpenSources(message)
                                : undefined
                            }
                            onRegenerate={
                              !isCurrentlyStreaming &&
                              idx === messages.length - 1 &&
                              messages.some((m) => m.role === 'user')
                                ? handleRegenerate
                                : undefined
                            }
                            onAddToEicr={
                              // Contextual: only when the answer commits to a
                              // classification code.
                              !isCurrentlyStreaming &&
                              !message.isError &&
                              /\b(C1|C2|C3|FI)\b/.test(message.content)
                                ? () => handleOpenEicrSheet(message)
                                : undefined
                            }
                            onRegClick={handleInlineRegClick}
                            onFeedback={
                              !isCurrentlyStreaming
                                ? (rating) => handleFeedback(idx, rating)
                                : undefined
                            }
                            feedback={message.feedback}
                            onFeedbackReason={
                              // Only while the vote's row id is known (same
                              // session) and no reason has landed yet.
                              !message.feedbackReasonGiven && feedbackRows[idx]
                                ? (reason) => handleFeedbackReason(idx, reason)
                                : undefined
                            }
                          />

                          {/* Streaming machinery line — quiet, human, alive */}
                          {isCurrentlyStreaming && streamStatus && (
                            <div className="flex items-center gap-2 text-[12.5px] text-white">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-elec-yellow/70" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                              </span>
                              {streamStatus}
                            </div>
                          )}

                          {!isCurrentlyStreaming &&
                            message.followUpQuestions &&
                            message.followUpQuestions.length > 0 && (
                              <FollowUpChips
                                questions={message.followUpQuestions}
                                onSelect={handleFollowUpSelect}
                              />
                            )}
                          {/* No assistant timestamp: the question above it
                              already carries one, and a second grey-reading
                              line under every answer was pure noise. */}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

              <AnimatePresence>{isSearching && <SearchingSkeleton />}</AnimatePresence>
            </div>

            <SourcesRail
              regNumbers={
                // While streaming, the retrieved set (available seconds
                // earlier); once done, what the answer actually cited.
                isStreaming && liveSources.length > 0
                  ? liveSources
                  : ([...messages]
                      .reverse()
                      .find((m) => m.role === 'assistant' && m.citedRegulations?.length)
                      ?.citedRegulations ?? [])
              }
              onOpenReg={(regNumber) => setRegulationSheet({ open: true, regulationNumber: regNumber })}
              isStreaming={isStreaming}
            />
          </div>
        </ChatMessagesArea>
      )}

      {/* Input area */}
      <ChatInputArea>
        {/*
          Jump to latest. Sits above the input rather than over the transcript
          so it never covers the answer being read. Only while there is a
          conversation and the reader has actually moved away from the end.
        */}
        <AnimatePresence>
          {messages.length > 0 && isAwayFromLatest && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              onClick={scrollToLatest}
              aria-label="Jump to the latest message"
              className="absolute -top-12 left-1/2 z-30 inline-flex h-10 -translate-x-1/2 items-center gap-1.5
                rounded-full border border-elec-yellow/35 bg-elec-dark px-4 text-[12.5px] font-medium
                text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10),0_4px_14px_-4px_rgba(0,0,0,0.8)]
                transition-colors hover:border-elec-yellow/60 hover:bg-white/[0.06]
                active:scale-[0.97] touch-manipulation [-webkit-tap-highlight-color:transparent]"
            >
              <ArrowDown className="h-3.5 w-3.5 text-elec-yellow" />
              {isStreaming ? 'Follow answer' : 'Latest'}
            </motion.button>
          )}
        </AnimatePresence>

        <div className="mx-auto w-full max-w-[1400px] px-1 sm:px-4 lg:px-8">
          {/* Compression indicator */}
          <AnimatePresence>
            {isCompressing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pb-2"
              >
                <div className="flex items-center gap-2 text-[12px] text-white">
                  <span className="h-3 w-3 rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
                  <span>Optimising image…</span>
                </div>
              </motion.div>
            )}

            {/* Upload feedback. Attachments upload BEFORE the request is made,
                so without this the Send tap looked like it did nothing —
                seconds of apparent deadness on site 4G with a multi-MB PDF. */}
            {isUploading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pb-2"
              >
                <div className="flex items-center gap-2 text-[12px] text-white">
                  <span className="h-3 w-3 rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
                  <span>
                    {selectedDocuments.length > 0 ? 'Uploading your document…' : 'Uploading…'}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image previews — up to 5 photos, scrollable strip */}
          <AnimatePresence>
            {imagePreviews.length > 0 && !isCompressing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pb-2"
              >
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {imagePreviews.map((url, idx) => (
                    <div key={url} className="relative shrink-0">
                      <img
                        src={url}
                        alt={`Preview ${idx + 1}`}
                        className="h-16 w-16 rounded-xl object-cover border border-white/[0.08]"
                      />
                      <button
                        onClick={() => removeImageAt(idx)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[hsl(0_0%_12%)] border border-white/[0.1] text-[12px] font-medium text-white hover:bg-[hsl(0_0%_15%)] touch-manipulation flex items-center justify-center"
                        aria-label={`Remove image ${idx + 1}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {imagePreviews.length < MAX_IMAGES_PER_MESSAGE && (
                    <span className="shrink-0 text-[11px] text-white/55 px-2">
                      {imagePreviews.length}/{MAX_IMAGES_PER_MESSAGE}
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Attached documents — visible and removable before sending, so
              nobody sends a 40-page EICR they picked by mistake. */}
          {selectedDocuments.length > 0 && (
            <div className="flex flex-wrap gap-2 pb-2">
              {selectedDocuments.map((doc, i) => (
                <span
                  key={`${doc.name}-${i}`}
                  className="inline-flex max-w-full items-center gap-2 rounded-xl border border-white/[0.16] bg-white/[0.08] px-3 py-2"
                >
                  <FileText className="h-3.5 w-3.5 shrink-0 text-white" />
                  <span className="min-w-0 truncate text-[12.5px] font-medium text-white">
                    {doc.name}
                  </span>
                  <span className="shrink-0 text-[11px] tabular-nums text-white">
                    {(doc.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                  <button
                    type="button"
                    onClick={() => removeDocument(i)}
                    aria-label={`Remove ${doc.name}`}
                    className="shrink-0 rounded-full p-1 text-white transition-colors hover:bg-white/10 touch-manipulation"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Attachment strip — folded behind the composer's "+" so the resting
              state is a single clean row. The chips animate in above the
              composer and close once a picker is opened. */}
          <AnimatePresence>
            {showAttachMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 4 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: 4 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-2 pb-2">
                  {(
                    [
                      { label: 'Camera', ref: cameraInputRef, aria: 'Take photo with camera' },
                      { label: 'Photo', ref: fileInputRef, aria: 'Attach photo from library' },
                      { label: 'Document', ref: docInputRef, aria: 'Attach a PDF document' },
                    ] as const
                  ).map((a) => (
                    <button
                      key={a.label}
                      onClick={() => {
                        setShowAttachMenu(false);
                        a.ref.current?.click();
                      }}
                      disabled={isCompressing}
                      className="h-9 px-3.5 rounded-full text-[12.5px] font-medium text-white bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.10] hover:border-white/[0.22] active:scale-[0.97] transition-all touch-manipulation [-webkit-tap-highlight-color:transparent] disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={a.aria}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hidden file inputs */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*,.heic,.heif"
            capture="environment"
            onChange={async (e) => {
              const files = Array.from(e.target.files ?? []);
              for (const f of files) await handleImageSelect(f);
              // Reset so the same shot can be re-attached after a remove.
              e.target.value = '';
            }}
            className="hidden"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.heic,.heif"
            multiple
            onChange={async (e) => {
              const files = Array.from(e.target.files ?? []);
              for (const f of files) await handleImageSelect(f);
              e.target.value = '';
            }}
            className="hidden"
          />

          <input
            ref={docInputRef}
            type="file"
            accept="application/pdf,.pdf"
            multiple
            onChange={(e) => {
              handleDocumentSelect(Array.from(e.target.files ?? []));
              // Reset so the same file can be re-attached after a remove.
              e.target.value = '';
            }}
            className="hidden"
          />

          <MobileChatInput
            value={input}
            onChange={setInput}
            onSubmit={() => handleSend()}
            onStop={handleStop}
            onClear={handleNewChat}
            isStreaming={isStreaming}
            placeholder="Ask Elec-AI…"
            messageCount={messages.length}
            showClearButton={messages.length > 0}
            voiceEnabled
            onTranscript={handleVoiceTranscript}
            canSubmitWithoutText={selectedImages.length > 0 || selectedDocuments.length > 0}
            onAttachPress={() => setShowAttachMenu((v) => !v)}
            attachActive={showAttachMenu}
          />
        </div>
      </ChatInputArea>

      <ChatHistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        sessions={chatHistory.sessions}
        isLoading={chatHistory.isLoadingSessions}
        currentSessionId={chatHistory.currentSessionId}
        onSelectSession={handleLoadSession}
        onDeleteSession={chatHistory.deleteSession}
        onNewChat={handleNewChat}
      />

      <RegulationDetailSheet
        isOpen={regulationSheet.open}
        regulationNumber={regulationSheet.regulationNumber}
        onClose={() => setRegulationSheet({ open: false, regulationNumber: null })}
        onAskFollowUp={handleRegFollowUp}
      />

      <SaveToJobSheet
        isOpen={saveSheet.open}
        onClose={() => setSaveSheet((prev) => ({ ...prev, open: false }))}
        answer={saveSheet.answer}
        question={saveSheet.question}
        citedRegulations={saveSheet.cited}
        imageUrls={saveSheet.imageUrls}
      />

      <AddToEicrSheet
        isOpen={eicrSheet.open}
        onClose={() => setEicrSheet((prev) => ({ ...prev, open: false }))}
        answer={eicrSheet.answer}
        question={eicrSheet.question}
        citedRegulations={eicrSheet.cited}
      />
    </ChatContainer>
  );
}
