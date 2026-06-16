import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  ChatContainer,
  ChatMessagesArea,
  ChatInputArea,
} from '@/components/electrician-tools/ai-tools/chat/ChatContainer';
import { MobileChatInput } from '@/components/electrician-tools/ai-tools/chat/MobileChatInput';
import { InspectorMessage } from '@/components/electrician-tools/ai-tools/InspectorMessage';
import { RegulationDetailSheet } from '@/components/electrician-tools/ai-tools/chat';
import { ChatHistoryDrawer } from '@/components/electrician-tools/ai-tools/chat';
import { ChatImageUpload, ImagePreviewBadge } from './ChatImageUpload';
import { AnimatePresence } from 'framer-motion';
import { History, PlusCircle } from 'lucide-react';
import { useSmoothedStreaming } from '@/hooks/useSmoothedStreaming';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { useStudentSnapshot, buildSmartPrompts } from '@/hooks/useStudentSnapshot';
import { useAIChatHistory } from '@/hooks/useAIChatHistory';
import { useAuth } from '@/contexts/AuthContext';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  imageUrl?: string;
}

/** Shape used by `useAIChatHistory` — superset of ChatMessage minus the
 *  local-only `id`. Kept in sync manually since the hook doesn't export
 *  the type yet. */
interface PersistedMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  followUpQuestions?: string[];
  imageUrl?: string;
  imageUrls?: string[];
}


/** Hydrate IDs onto messages loaded from history (the storage layer
 *  doesn't track them; React needs stable keys). */
function hydrateIds(msgs: PersistedMessage[]): ChatMessage[] {
  return msgs.map((m, i) => ({
    role: m.role,
    content: m.content,
    imageUrl: m.imageUrl,
    id: `${m.timestamp ? new Date(m.timestamp).getTime() : Date.now()}-${i}`,
    timestamp: m.timestamp ? new Date(m.timestamp) : new Date(),
  }));
}

const HelpBotTab = () => {
  const { qualificationCode, qualificationName } = useStudentQualification();
  const { user } = useAuth();
  const snapshot = useStudentSnapshot();
  const smartPrompts = buildSmartPrompts(snapshot);
  const [searchParams, setSearchParams] = useSearchParams();
  const chatHistory = useAIChatHistory('dave');
  const [historyOpen, setHistoryOpen] = useState(false);
  // Initial thread comes from useAIChatHistory's localStorage fallback so
  // apprentices pick up where they left off even on slow Supabase reads.
  // Once the Supabase sessions list loads they can browse past chats.
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() =>
    hydrateIds(chatHistory.loadFromLocalStorage() as PersistedMessage[])
  );
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [attachedImage, setAttachedImage] = useState<string>('');
  const [imageUploadOpen, setImageUploadOpen] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const [regulationSheet, setRegulationSheet] = useState<{
    open: boolean;
    regulationNumber: string | null;
  }>({ open: false, regulationNumber: null });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Smooth streaming hook - 60fps text animation
  const {
    displayedText: streamedContent,
    addTokens,
    flush: flushStream,
    reset: resetStream,
  } = useSmoothedStreaming({ flushInterval: 40 });

  // Scroll to bottom — only called explicitly, never auto during streaming
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  }, []);

  // Persist via useAIChatHistory — handles Supabase upsert + localStorage
  // fallback + debounce. We only persist completed messages (no half-drawn
  // streaming placeholders).
  useEffect(() => {
    const persistable = chatMessages.filter(
      (m) => m.content.trim() !== '' || m.role === 'user'
    );
    if (persistable.length === 0) return;
    // Don't save while a stream is still in flight — the hook's debounce
    // would still capture partial state. We let the post-stream useEffect
    // tick handle the save once content is finalised.
    if (isLoading) return;
    // Strip the local-only `id` field; the hook re-creates structure.
    const stripped: PersistedMessage[] = persistable.map(
      ({ id: _id, ...rest }) => rest
    );
    chatHistory.saveSession(stripped);
  }, [chatMessages, isLoading, chatHistory]);

  // Auto-send a prefilled prompt from the URL — Daily Tips "Ask Dave"
  // buttons land here via `?prompt=...`. We strip the param after dispatch
  // so refreshing doesn't replay the question.
  const autoPromptedRef = useRef(false);
  useEffect(() => {
    const prefill = searchParams.get('prompt');
    if (!prefill || autoPromptedRef.current || isLoading) return;
    autoPromptedRef.current = true;
    // Drop the param so a refresh doesn't fire it again
    const next = new URLSearchParams(searchParams);
    next.delete('prompt');
    setSearchParams(next, { replace: true });
    // Fire the question
    setTimeout(() => handleSendMessage(prefill), 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);


  /**
   * Context-aware follow-ups. The old version was a simple keyword check;
   * this one prioritises actions an apprentice actually wants on Dave's
   * answer: see the cited regs, get tested on it, or walk the calc.
   *
   * Order is action-first (Quiz/Calc/Show regs), topic-shaped second.
   */
  const generateFollowUps = useCallback((content: string): string[] => {
    const lower = content.toLowerCase();
    const followUps: string[] = [];

    const hasRegs = /\b\d{3}\.\d+/.test(content) || /regulation/.test(lower);
    const isCalc = /(calculat|equation|formula|adiabatic|csa|mm²|voltage drop|design current|ib\b|in\b|zs|loop)/.test(
      lower
    );
    const isTest = /(test|verif|measure|reading|ir |continuity|insulation|polarity|rcd)/.test(lower);
    const isProcedure = /(procedure|sequence|step|isolate|isolation|method|process)/.test(lower);

    // 1. Always pull the apprentice into action
    if (hasRegs) followUps.push('Quiz me on what you just covered');
    if (isCalc) followUps.push('Walk me through the calculation step by step');
    if (isTest) followUps.push('What equipment do I need and what readings am I aiming for?');
    if (isProcedure) followUps.push('What\'s the most common mistake on this?');

    // 2. Specifics that prompt depth
    if (hasRegs && followUps.length < 3) followUps.push('Show me the exact reg numbers');
    if (lower.includes('safe') && followUps.length < 3)
      followUps.push('What would fail me on AM2 day?');

    // 3. Universal closers — always good follow-ups
    const universals = [
      'Explain that like I\'m new to it',
      'Give me a real-site example',
      'How does this come up on AM2?',
    ];
    for (const u of universals) {
      if (followUps.length >= 3) break;
      followUps.push(u);
    }

    return followUps.slice(0, 3);
  }, []);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || currentMessage;
    if (!textToSend.trim() || isLoading) return;

    // Clear follow-ups and reset streaming state
    setFollowUpQuestions([]);
    resetStream();

    // Capture attached image before clearing
    const imageToSend = attachedImage;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: textToSend.trim(),
      role: 'user',
      timestamp: new Date(),
      imageUrl: imageToSend || undefined,
    };

    const aiMessageId = (Date.now() + 1).toString();

    setChatMessages((prev) => [...prev, userMessage]);
    setCurrentMessage('');
    setAttachedImage('');
    setIsLoading(true);
    setStreamingMessageId(aiMessageId);

    // Add empty AI message for streaming
    setChatMessages((prev) => [
      ...prev,
      {
        id: aiMessageId,
        content: '',
        role: 'assistant',
        timestamp: new Date(),
      },
    ]);

    // Scroll to show the new message
    setTimeout(() => scrollToBottom(), 50);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL || 'https://jtwygbeceundfgnkirof.supabase.co'}/functions/v1/chat-assistant`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
          },
          body: JSON.stringify({
            message: textToSend.trim(),
            context: qualificationName
              ? `electrical apprenticeship training - studying ${qualificationName}`
              : 'electrical apprenticeship training and guidance',
            stream: true,
            imageUrl: imageToSend || undefined,
            qualificationCode: qualificationCode || undefined,
            qualificationName: qualificationName || undefined,
            userId: user?.id,
            history: chatMessages
              .filter((m) => m.content.trim() !== '')
              .slice(-10)
              .map((m) => ({ role: m.role, content: m.content })),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content || '';
                if (content) {
                  fullContent += content;
                  // Add to smooth streaming buffer (no React re-render per chunk)
                  addTokens(content);
                }
              } catch {
                // Skip malformed JSON chunks
              }
            }
          }
        }
      }

      // Flush any remaining buffered content and get final text
      const finalContent =
        flushStream() ||
        fullContent ||
        "I'm here to help with your electrical apprentice questions!";

      // Update the message with final content (single React update)
      setChatMessages((prev) =>
        prev.map((msg) => (msg.id === aiMessageId ? { ...msg, content: finalContent } : msg))
      );

      // Generate follow-up questions
      setFollowUpQuestions(generateFollowUps(finalContent));
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Sorry, I encountered an issue. Please try again.');

      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? {
                ...msg,
                content:
                  "I apologise, but I'm having trouble responding right now. Please try your question again in a moment.",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      setStreamingMessageId(null);
    }
  };

  const handleClearConversation = useCallback(() => {
    setChatMessages([]);
    setFollowUpQuestions([]);
    resetStream();
    setStreamingMessageId(null);
    chatHistory.startNewSession();
    toast.success('Conversation cleared');
  }, [resetStream, chatHistory]);

  /** Load a previous conversation from the history drawer. */
  const handleLoadSession = useCallback(
    async (id: string) => {
      const loaded = await chatHistory.loadSession(id);
      setChatMessages(hydrateIds(loaded as PersistedMessage[]));
      setFollowUpQuestions([]);
      setHistoryOpen(false);
    },
    [chatHistory]
  );

  /** Start a fresh thread without touching saved history. */
  const handleNewChat = useCallback(() => {
    setChatMessages([]);
    setFollowUpQuestions([]);
    resetStream();
    setStreamingMessageId(null);
    chatHistory.startNewSession();
    setHistoryOpen(false);
  }, [chatHistory, resetStream]);


  const handleFollowUp = (question: string) => {
    handleSendMessage(question);
  };

  /** Inline reg pill clicked — opens the regulation detail sheet with the
   *  full BS 7671 text. The inline-formatters pre-detect "Reg X.X.X.X"
   *  patterns automatically; we just route the tap to the sheet. */
  const handleInlineRegClick = useCallback((regNumber: string) => {
    if (!regNumber) return;
    setRegulationSheet({ open: true, regulationNumber: regNumber });
  }, []);

  /** Triggered from the reg sheet's "ask Dave a follow-up" button. */
  const handleRegFollowUp = useCallback((seed: string) => {
    setRegulationSheet({ open: false, regulationNumber: null });
    handleSendMessage(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Editorial welcome — no icon, typography-driven. The promise: "Dave
  // already knows your training record." Stats tiles prove it, prompt
  // cards turn it into action.
  const WelcomeScreen = () => {
    const firstName = snapshot.firstName ?? 'mate';
    const course = qualificationName ?? snapshot.apprenticeLevel ?? null;

    // Build the four most informative stat tiles from whatever signals
    // we have. Rank by usefulness, drop empties.
    const tiles: Array<{ value: string; label: string; sub: string; tone: string }> = [];
    if (snapshot.weakAreas.length > 0) {
      tiles.push({
        value: `${snapshot.weakAreas[0].score}%`,
        label: 'Weakest AM2 area',
        sub: snapshot.weakAreas[0].label,
        tone: 'text-red-300',
      });
    }
    if (snapshot.overconfidentWrongs > 0) {
      tiles.push({
        value: String(snapshot.overconfidentWrongs),
        label: 'Blind-spot regs',
        sub: 'Wrong while certain',
        tone: 'text-red-300',
      });
    }
    if (snapshot.recentPracticeCount > 0) {
      tiles.push({
        value: String(snapshot.recentPracticeCount),
        label: 'Practice · 14d',
        sub: snapshot.recentPracticeCount >= 5 ? 'Strong rhythm' : 'Keep going',
        tone: snapshot.recentPracticeCount >= 5 ? 'text-emerald-300' : 'text-elec-yellow',
      });
    }
    if (snapshot.portfolioItems > 0) {
      tiles.push({
        value: String(snapshot.portfolioItems),
        label: 'Portfolio items',
        sub:
          snapshot.portfolioRecent > 0
            ? `${snapshot.portfolioRecent} this fortnight`
            : 'Add evidence soon',
        tone: snapshot.portfolioRecent > 0 ? 'text-emerald-300' : 'text-amber-300',
      });
    }
    if (snapshot.otjHours30d > 0 && tiles.length < 4) {
      tiles.push({
        value: `${snapshot.otjHours30d}h`,
        label: 'OTJ · 30d',
        sub:
          snapshot.otjPendingHours > 0
            ? `${snapshot.otjPendingHours}h pending`
            : 'All verified',
        tone: snapshot.otjPendingHours > 0 ? 'text-amber-300' : 'text-emerald-300',
      });
    }
    if (snapshot.attendancePct !== null && tiles.length < 4) {
      tiles.push({
        value: `${snapshot.attendancePct}%`,
        label: 'College attendance · 30d',
        sub: snapshot.attendancePct >= 90 ? 'Strong' : 'Watch this',
        tone:
          snapshot.attendancePct >= 90
            ? 'text-emerald-300'
            : snapshot.attendancePct >= 80
              ? 'text-amber-300'
              : 'text-red-300',
      });
    }
    if (snapshot.acCoveragePct !== null && tiles.length < 4) {
      tiles.push({
        value: `${snapshot.acCoveragePct}%`,
        label: 'AC coverage',
        sub: 'Qualification progress',
        tone: snapshot.acCoveragePct >= 70 ? 'text-emerald-300' : 'text-amber-300',
      });
    }
    if (snapshot.ilpGoalsActive > 0 && tiles.length < 4) {
      tiles.push({
        value: String(snapshot.ilpGoalsActive),
        label: 'Active ILP goals',
        sub: 'Set by your tutor',
        tone: 'text-elec-yellow',
      });
    }

    return (
      <div className="px-4 sm:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
        {/* Editorial lede — no icon, no avatar. Pure typography. */}
        <div className="space-y-3 sm:space-y-4 max-w-2xl">
          <div className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.22em] text-elec-yellow/85">
            Dave · master sparky · 20 years on the tools
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight leading-[1.05] text-white">
            Alright {firstName}.
            <br />
            <span className="text-white/55">I've already read your file.</span>
          </h2>
          <p className="text-[13px] sm:text-[14px] text-white/65 leading-relaxed max-w-xl">
            {course ? (
              <>
                Studying <span className="text-white/85 font-medium">{course}</span>. I see your
                AM2 scores, your portfolio, your OTJ logs, your ILP goals — and the regs you're
                quietly getting wrong. Ask me anything.
              </>
            ) : (
              <>
                I see your AM2 scores, your portfolio, your OTJ logs, your ILP goals — and the
                regs you're quietly getting wrong. Ask me anything.
              </>
            )}
          </p>
        </div>

        {/* Stats tiles — proof that Dave actually has the data */}
        {tiles.length > 0 && (
          <div className="space-y-2.5">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
              What I'm looking at
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
              {tiles.slice(0, 4).map((t, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/[0.08] bg-[hsl(0_0%_8%)] px-3.5 sm:px-4 py-3 sm:py-3.5"
                >
                  <div
                    className={`text-2xl sm:text-[28px] font-semibold tabular-nums leading-none ${t.tone}`}
                  >
                    {t.value}
                  </div>
                  <div className="mt-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/85">
                    {t.label}
                  </div>
                  <div className="text-[10.5px] text-white/45 leading-tight mt-0.5">{t.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Smart prompt cards — bigger, editorial. Each one is a hook
            that uses the apprentice's real data. */}
        <div className="space-y-2.5">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
            Start here · personalised
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
            {smartPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(p)}
                className="group text-left rounded-xl border border-white/[0.08] bg-[hsl(0_0%_8%)] hover:border-elec-yellow/45 hover:bg-[hsl(0_0%_15%)] transition-colors px-4 py-3.5 sm:py-4 touch-manipulation active:scale-[0.99]"
              >
                <div className="flex items-baseline gap-2.5">
                  <span className="text-[10px] font-mono tabular-nums text-elec-yellow/70 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[13px] text-white/90 leading-snug group-hover:text-white transition-colors">
                    {p}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Topic shortcuts — discreet footer, monochrome */}
        <div className="space-y-2">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
            Or jump straight to a topic
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Safe isolation',
              'Cable sizing',
              'Test sequence',
              'RCD rules',
              'Voltage drop',
              'EIC certs',
              'Bonding',
              'Special locations',
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => handleSendMessage(`Tell me about ${topic.toLowerCase()}`)}
                className="px-3 py-1.5 text-[11px] bg-white/[0.03] hover:bg-elec-yellow/12 border border-white/[0.10] hover:border-elec-yellow/40 rounded-full transition-colors touch-manipulation text-white/75 hover:text-white"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full">
      <ChatContainer>
        <ChatMessagesArea messagesEndRef={messagesEndRef}>
          {chatMessages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            <div className="mx-auto w-full max-w-4xl px-4 py-6 space-y-7 sm:py-8 sm:space-y-8">
              {chatMessages.map((message) => {
                const isCurrentlyStreaming = message.id === streamingMessageId && isLoading;
                // Smoothed content while streaming, stored content otherwise.
                const displayContent = isCurrentlyStreaming ? streamedContent : message.content;

                return (
                  <InspectorMessage
                    key={message.id}
                    variant="dave"
                    message={{
                      role: message.role,
                      content: displayContent,
                      agentName: message.role === 'assistant' ? 'Dave' : undefined,
                      imageUrl: message.imageUrl,
                    }}
                    // Keep isStreaming true even before the first token so Dave's
                    // avatar + "composing…" show instead of a bare dot indicator.
                    isStreaming={isCurrentlyStreaming}
                    onRegClick={handleInlineRegClick}
                  />
                );
              })}
            </div>
          )}
        </ChatMessagesArea>

        <ChatInputArea>
          <div className="mx-auto w-full max-w-4xl">
          {/* Conversation controls — history + new chat. Discreet row,
              shown only once the apprentice has actually started a chat. */}
          {chatMessages.length > 0 && (
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => setHistoryOpen(true)}
                className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-full text-[11px] font-medium text-white/70 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] touch-manipulation transition-colors"
              >
                <History className="h-3 w-3" />
                History
                {chatHistory.sessions.length > 0 && (
                  <span className="tabular-nums text-white/45">· {chatHistory.sessions.length}</span>
                )}
              </button>
              <button
                type="button"
                onClick={handleNewChat}
                className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-full text-[11px] font-medium text-white/70 hover:text-elec-yellow bg-white/[0.03] hover:bg-elec-yellow/[0.06] border border-white/[0.08] hover:border-elec-yellow/30 touch-manipulation transition-colors"
              >
                <PlusCircle className="h-3 w-3" />
                New chat
              </button>
            </div>
          )}

          {/* Compact Follow-up chips - horizontal scroll on mobile */}
          {followUpQuestions.length > 0 && !isLoading && (
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1 mb-2 -mx-1 px-1">
              <span className="text-[10px] text-muted-foreground shrink-0 hidden sm:inline">
                Try:
              </span>
              {followUpQuestions.slice(0, 2).map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleFollowUp(q)}
                  className="shrink-0 px-2.5 py-1 text-[11px] bg-elec-yellow/10 hover:bg-elec-yellow/20 border border-elec-yellow/20 rounded-full text-foreground/80 truncate max-w-[160px] touch-manipulation transition-colors"
                >
                  {q.length > 35 ? q.slice(0, 35) + '...' : q}
                </button>
              ))}
            </div>
          )}


          {/* Attached Image Preview */}
          <AnimatePresence>
            {attachedImage && (
              <div className="mb-1.5">
                <ImagePreviewBadge imageUrl={attachedImage} onRemove={() => setAttachedImage('')} />
              </div>
            )}
          </AnimatePresence>

          {/* Chat Input — camera integrated inside */}
          <MobileChatInput
            value={currentMessage}
            onChange={setCurrentMessage}
            onSubmit={() => handleSendMessage()}
            onClear={handleClearConversation}
            onCameraPress={() => setImageUploadOpen(true)}
            isStreaming={isLoading}
            placeholder={attachedImage ? 'What do you see?' : 'Ask Dave anything...'}
            messageCount={chatMessages.length}
            showClearButton={chatMessages.length > 0}
          />
          </div>
        </ChatInputArea>
      </ChatContainer>

      {/* Image Upload Sheet */}
      <ChatImageUpload
        open={imageUploadOpen}
        onOpenChange={setImageUploadOpen}
        onImageReady={(url) => setAttachedImage(url)}
        onCancel={() => {}}
      />

      {/* Regulation detail sheet — opens when an inline "Reg X.X.X.X" pill
          is tapped. The apprentice can read the full text and bounce a
          follow-up question straight back to Dave. */}
      <RegulationDetailSheet
        isOpen={regulationSheet.open}
        regulationNumber={regulationSheet.regulationNumber}
        onClose={() => setRegulationSheet({ open: false, regulationNumber: null })}
        onAskFollowUp={handleRegFollowUp}
      />

      {/* Past Dave conversations. Sessions are saved to ai_chat_history;
          drawer is shared infra used by the electrician AI too. */}
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
    </div>
  );
};

export default HelpBotTab;
