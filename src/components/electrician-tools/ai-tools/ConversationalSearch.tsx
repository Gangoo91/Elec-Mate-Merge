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

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  followUpQuestions?: string[];
  imageUrl?: string;
  /** Regulation numbers cited in this answer (populated post-stream). */
  citedRegulations?: string[];
}

const STREAM_STAGES = [
  'Understanding…',
  'Retrieving regulations…',
  'Answering…',
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
  const [historyOpen, setHistoryOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isNearBottomRef = useRef(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
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
  }>({ open: false, answer: '', question: '', cited: [] });

  // Streaming-status chip. `stage` is either a value emitted from the
  // backend (future-friendly) or an index into STREAM_STAGES.
  const [streamStatus, setStreamStatus] = useState<string | null>(null);
  const stageTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Batched token streaming — flush every 80ms.
  const streaming = useSmoothedStreaming({ flushInterval: 80 });

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
  const handleScrollPosition = useCallback((_e: React.UIEvent<HTMLDivElement>) => {
    // Retained for API compatibility with ChatMessagesArea onScroll; intentionally no-op.
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
      const el = document.querySelector<HTMLElement>(
        `[data-msg-anchor="user-${lastIdx}"]`
      );
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

  // Image handling
  const handleImageSelect = useCallback(
    async (file: File) => {
      if (!isImageFile(file)) {
        toast.error('Please select an image');
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
        setSelectedImage(compressed);
        setImagePreview(URL.createObjectURL(compressed));
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
    [haptic]
  );

  const clearImage = useCallback(() => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview(null);
  }, [imagePreview]);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const fileName = `${user.id}/elec-ai/${Date.now()}.jpg`;

    const { error } = await supabase.storage.from('visual-uploads').upload(fileName, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from('visual-uploads').getPublicUrl(fileName);

    return publicUrl;
  }, []);

  const handleSend = useCallback(
    async (queryText?: string, options?: { replaceLastAssistant?: boolean }) => {
      const messageText = queryText || input.trim();

      if (!messageText && !selectedImage) return;

      haptic.medium();

      let imageUrl: string | undefined;
      if (selectedImage) {
        try {
          imageUrl = await uploadImage(selectedImage);
          clearImage();
        } catch {
          toast.error('Failed to upload image');
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
      };

      if (!isRegenerate) {
        setMessages((prev) => [...prev, userMessage]);
      }
      setInput('');
      setIsSearching(true);
      setIsStreaming(true);
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
            imageUrl,
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
              }
              return newMessages;
            });

            // Persist to offline cache — fire-and-forget.
            void offlineCache.save({
              question: userMessage.content,
              answer: cleanedContent,
              sources: citedRegs.map((n) => ({ regulation_number: n })),
            });
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

                // Optional status event, eg `{ type: 'status', stage: '…' }`.
                if (parsed?.type === 'status' && typeof parsed.stage === 'string') {
                  if (stageTimerRef.current) {
                    clearInterval(stageTimerRef.current);
                    stageTimerRef.current = null;
                  }
                  setStreamStatus(parsed.stage);
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
      }
    },
    [input, messages, streaming, haptic, selectedImage, uploadImage, clearImage, offlineCache]
  );

  const handleNewChat = useCallback(() => {
    chatHistory.startNewSession();
    setMessages([]);
    haptic.selection();
    toast.success('New chat started');
  }, [chatHistory, haptic]);

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
      setInput(question);
      inputRef.current?.focus();
      haptic.selection();
    },
    [haptic]
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

  const handleOpenSaveSheet = useCallback((message: Message) => {
    // Find the user question that produced this answer.
    const idx = messages.indexOf(message);
    const question =
      idx > 0 && messages[idx - 1].role === 'user' ? messages[idx - 1].content : undefined;
    setSaveSheet({
      open: true,
      answer: message.content,
      question: question || '',
      cited: message.citedRegulations ?? [],
    });
  }, [messages]);

  const handleOpenSources = useCallback((message: Message) => {
    const first = message.citedRegulations?.[0];
    if (!first) {
      toast.message('No regulations cited in this answer');
      return;
    }
    setRegulationSheet({ open: true, regulationNumber: first });
  }, []);

  const handleInlineRegClick = useCallback((regNumber: string) => {
    if (!regNumber) return;
    setRegulationSheet({ open: true, regulationNumber: regNumber });
    haptic.selection();
  }, [haptic]);

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
        const keep = window.confirm(
          'Discard your current draft and use this suggestion instead?'
        );
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
    <ChatContainer>
      {/* Editorial header — no icons */}
      <header className="shrink-0 bg-[#0a0a0a] border-b border-white/[0.06]">
        <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-6 h-14">
          <button
            onClick={() => navigate('/electrician')}
            className="shrink-0 text-[13px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation -ml-1"
          >
            ← Back
          </button>
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h1 className="text-[15px] font-semibold text-white tracking-tight leading-none truncate">
              Elec-AI
            </h1>
            {/* Subtitle hidden on narrow screens to stop truncation (ASSISTA...) */}
            <p className="hidden sm:block mt-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 truncate">
              BS 7671 A4:2026 assistant
            </p>
          </div>
          {!isStreaming && (
            <div className="shrink-0 flex items-center gap-3 sm:gap-4 text-[13px] font-medium">
              <button
                onClick={() => setHistoryOpen(true)}
                className="text-white/70 hover:text-white transition-colors touch-manipulation"
                aria-label="Chat history"
              >
                History
              </button>
              {messages.length > 0 && (
                <button
                  onClick={handleNewChat}
                  className="text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
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
        <ChatMessagesArea className="px-3 sm:px-6">
          {offlineBannerVisible && (
            <div className="mx-auto max-w-3xl pt-4">
              <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-3">
                <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
                  Offline · showing your last {offlineCache.limit} saved answers
                </div>
                <p className="mt-1 text-[12px] text-white/70 leading-relaxed">
                  You’re offline. Elec-AI can’t stream new answers, but your
                  recent cached answers are below.
                </p>
              </div>
              {offlineCache.entries.length > 0 && (
                <div className="mt-3 space-y-2">
                  {offlineCache.entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-3"
                    >
                      <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
                        {formatRelativeTime(new Date(entry.timestamp))}
                      </div>
                      <div className="mt-1 text-[13px] font-semibold text-white">
                        {entry.question}
                      </div>
                      <p className="mt-1 text-[13px] text-white/70 leading-relaxed line-clamp-4 whitespace-pre-wrap">
                        {entry.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <WelcomeScreen onSelectQuery={handleGuardedSelectQuery} />
        </ChatMessagesArea>
      )}

      {/* Active state */}
      {messages.length > 0 && (
        <ChatMessagesArea
          messagesEndRef={messagesEndRef}
          onScroll={handleScrollPosition}
          className="px-3 sm:px-6"
        >
          <div className="mx-auto max-w-3xl py-4 sm:py-6 space-y-6 sm:space-y-8">
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
                          {message.imageUrl && (
                            <div className="rounded-2xl overflow-hidden ml-auto max-w-[220px] border border-white/[0.06]">
                              <img
                                src={message.imageUrl}
                                alt="Attached"
                                className="w-full h-auto object-cover"
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
                        </div>
                        {message.timestamp && (
                          <p className="mt-1 text-[11px] text-white/40 text-right">
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
                            }}
                            isStreaming={isCurrentlyStreaming}
                            onSaveToJob={
                              !isCurrentlyStreaming
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
                            onRegClick={handleInlineRegClick}
                          />

                          {/* Streaming status chip */}
                          {isCurrentlyStreaming && streamStatus && (
                            <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">
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

                          {message.timestamp && !isCurrentlyStreaming && (
                            <p className="text-[11px] text-white/40">
                              {formatRelativeTime(message.timestamp)}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <AnimatePresence>{isSearching && <SearchingSkeleton />}</AnimatePresence>
          </div>
        </ChatMessagesArea>
      )}

      {/* Input area */}
      <ChatInputArea>
        <div className="mx-auto w-full max-w-3xl">
          {/* Compression indicator */}
          <AnimatePresence>
            {isCompressing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pb-2"
              >
                <div className="flex items-center gap-2 text-[12px] text-white/55">
                  <span className="h-3 w-3 rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
                  <span>Optimising image…</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image preview */}
          <AnimatePresence>
            {imagePreview && !isCompressing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pb-2"
              >
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-16 rounded-xl object-cover border border-white/[0.08]"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 h-6 px-2 rounded-full bg-[hsl(0_0%_12%)] border border-white/[0.1] text-[11px] font-medium text-white hover:bg-[hsl(0_0%_15%)] touch-manipulation"
                    aria-label="Remove image"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Attachment pills — text-only */}
          <div className="flex items-center gap-2 pb-2">
            <button
              onClick={() => cameraInputRef.current?.click()}
              disabled={isCompressing}
              className="text-[12px] font-medium text-white px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Take photo with camera"
            >
              Camera
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isCompressing}
              className="text-[12px] font-medium text-white px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Attach photo from library"
            >
              Photo
            </button>
          </div>

          {/* Hidden file inputs */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*,.heic,.heif"
            capture="environment"
            onChange={(e) => e.target.files?.[0] && handleImageSelect(e.target.files[0])}
            className="hidden"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.heic,.heif"
            onChange={(e) => e.target.files?.[0] && handleImageSelect(e.target.files[0])}
            className="hidden"
          />

          <MobileChatInput
            value={input}
            onChange={setInput}
            onSubmit={() => handleSend()}
            onClear={handleNewChat}
            isStreaming={isStreaming}
            placeholder="Ask Elec-AI…"
            messageCount={messages.length}
            showClearButton={messages.length > 0}
            voiceEnabled
            onTranscript={handleVoiceTranscript}
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
      />
    </ChatContainer>
  );
}
