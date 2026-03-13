import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Camera, ImageIcon, X, ArrowLeft, Loader2, SquarePen, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { InspectorMessage } from './InspectorMessage';
import { useSmoothedStreaming } from '@/hooks/useSmoothedStreaming';
import { useHaptic } from '@/hooks/useHaptic';
import { useAIChatHistory } from '@/hooks/useAIChatHistory';
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
} from './chat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  followUpQuestions?: string[];
  imageUrl?: string;
}

import {
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY as SUPABASE_KEY,
} from '@/integrations/supabase/client';

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
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

  // Batched token streaming — flush every 80ms (~12fps).
  // ReactMarkdown re-parses the full content on every update, so we need to
  // throttle aggressively. 12fps is still smooth for reading streaming text.
  const streaming = useSmoothedStreaming({ flushInterval: 80 });

  // Auto-focus input on load (desktop only)
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile && messages.length === 0) {
      inputRef.current?.focus();
    }
  }, []);

  // Show toast when conversation is restored from localStorage
  useEffect(() => {
    if (messages.length > 0 && !hasRestoredSession) {
      setHasRestoredSession(true);
      // Small delay to ensure component is mounted
      const timeoutId = setTimeout(() => {
        toast.success('Previous conversation restored', {
          description: 'Your chat history has been recovered',
          duration: 3000,
        });
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, []); // Only run on mount

  // Persist messages to Supabase + localStorage when they change
  useEffect(() => {
    if (!isStreaming && messages.length > 0) {
      chatHistory.saveSession(messages);
    }
  }, [messages, isStreaming, chatHistory.saveSession]);

  const SCROLL_THRESHOLD = 150;

  const handleScrollPosition = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    isNearBottomRef.current = distanceFromBottom < SCROLL_THRESHOLD;
  }, []);

  const scrollToBottomIfNeeded = useCallback((instant?: boolean) => {
    if (isNearBottomRef.current) {
      messagesEndRef.current?.scrollIntoView({
        behavior: instant ? 'instant' : 'smooth',
        block: 'end',
      });
    }
  }, []);

  useEffect(() => {
    if (!isStreaming && messages.length > 0) {
      const timeoutId = setTimeout(() => {
        scrollToBottomIfNeeded();
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [messages.length, isStreaming, scrollToBottomIfNeeded]);

  // Pin-to-bottom during streaming — 150ms interval keeps scroll tracking content growth
  useEffect(() => {
    if (!isStreaming) return;

    const intervalId = setInterval(() => {
      if (isNearBottomRef.current) {
        messagesEndRef.current?.scrollIntoView({
          behavior: 'instant',
          block: 'end',
        });
      }
    }, 150);

    return () => clearInterval(intervalId);
  }, [isStreaming]);

  // Image handling - supports large files with compression
  const handleImageSelect = useCallback(
    async (file: File) => {
      // Check for image types including HEIC
      if (!isImageFile(file)) {
        toast.error('Please select an image');
        return;
      }

      // Validate size (allow up to 50MB, will be compressed)
      const validation = validateImageSize(file);
      if (!validation.valid) {
        toast.error(validation.error);
        return;
      }

      // Show compression indicator for large files
      const needsCompression = file.size > 2 * 1024 * 1024;
      if (needsCompression) {
        setIsCompressing(true);
      }

      try {
        // Compress image for upload (target ~2MB)
        const compressed = await compressImageForUpload(file);
        setSelectedImage(compressed);
        setImagePreview(URL.createObjectURL(compressed));
        haptic.selection();

        // Show compression result for large files
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
    async (queryText?: string) => {
      const messageText = queryText || input.trim();

      if (!messageText && !selectedImage) return;

      haptic.medium();

      // Upload image if present
      let imageUrl: string | undefined;
      if (selectedImage) {
        try {
          imageUrl = await uploadImage(selectedImage);
          clearImage();
        } catch (err) {
          toast.error('Failed to upload image');
          return;
        }
      }

      const userMessage: Message = {
        role: 'user',
        content: messageText || 'What can you tell me about this?',
        timestamp: new Date(),
        imageUrl,
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsSearching(true);
      setIsStreaming(true);
      streaming.reset();

      try {
        abortControllerRef.current = new AbortController();

        const response = await fetch(`${SUPABASE_URL}/functions/v1/conversational-search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
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

            // Match ---FOLLOWUP--- with optional ---END_FOLLOWUP--- (may run to end of content)
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

            setMessages((prev) => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              if (lastMessage?.role === 'assistant') {
                lastMessage.content = cleanedContent;
                if (questions.length > 0) {
                  lastMessage.followUpQuestions = questions;
                }
              }
              return newMessages;
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
      }
    },
    [input, messages, streaming, haptic, selectedImage, uploadImage, clearImage]
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

  return (
    <ChatContainer>
      {/* Header - iOS style with back button */}
      <header className="shrink-0 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-3 px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/electrician')}
            className="h-10 w-10 -ml-2 touch-manipulation active:scale-95 hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-elec-yellow to-amber-500 flex items-center justify-center shadow-lg shadow-elec-yellow/20">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-white truncate">Elec-AI</h1>
            <p className="text-[11px] text-white">Your electrical advisor</p>
          </div>
          {!isStreaming && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setHistoryOpen(true)}
                className="h-10 w-10 touch-manipulation active:scale-95 hover:bg-white/5"
                aria-label="Chat history"
              >
                <Clock className="h-5 w-5 text-white" />
              </Button>
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNewChat}
                  className="h-10 w-10 -mr-2 touch-manipulation active:scale-95 hover:bg-white/5"
                  aria-label="New chat"
                >
                  <SquarePen className="h-5 w-5 text-white" />
                </Button>
              )}
            </>
          )}
        </div>
      </header>

      {/* Empty State - Welcome Screen */}
      {messages.length === 0 && (
        <ChatMessagesArea className="px-4 md:px-6">
          <WelcomeScreen onSelectQuery={(q) => handleSend(q)} />
        </ChatMessagesArea>
      )}

      {/* Active State - Messages Container */}
      {messages.length > 0 && (
        <ChatMessagesArea
          messagesEndRef={messagesEndRef}
          onScroll={handleScrollPosition}
          className="px-4 md:px-6"
        >
          <div className="py-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {messages.map((message, idx) => {
                const isCurrentlyStreaming =
                  isStreaming && idx === messages.length - 1 && message.role === 'assistant';
                return (
                  <motion.div
                    key={`${idx}-${message.role}`}
                    initial={isCurrentlyStreaming ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    layout={!isCurrentlyStreaming}
                    className="transform-gpu"
                  >
                    {message.role === 'user' ? (
                      <div className="flex flex-col items-end">
                        <div className="max-w-[85%] sm:max-w-[75%] space-y-2">
                          {/* User's attached image */}
                          {message.imageUrl && (
                            <div className="rounded-xl overflow-hidden shadow-lg ml-auto max-w-[200px]">
                              <img
                                src={message.imageUrl}
                                alt="Attached"
                                className="w-full h-auto object-cover"
                              />
                            </div>
                          )}
                          <div className="rounded-2xl rounded-tr-sm px-4 py-3 bg-gradient-to-br from-elec-yellow to-amber-500 text-black shadow-lg shadow-elec-yellow/20">
                            <div className="whitespace-pre-wrap break-words font-medium">
                              {message.content}
                            </div>
                          </div>
                        </div>
                        {message.timestamp && (
                          <p className="text-[10px] text-white mt-1 text-right">
                            {formatRelativeTime(message.timestamp)}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-start">
                        <div className="max-w-[95%] sm:max-w-[90%] space-y-3">
                          <InspectorMessage
                            message={{
                              role: 'assistant',
                              content: isCurrentlyStreaming
                                ? streaming.displayedText
                                : message.content,
                              agentName: 'Elec-AI',
                            }}
                            isStreaming={isCurrentlyStreaming}
                          />

                          {/* Follow-up Question Chips */}
                          {!isCurrentlyStreaming &&
                            message.followUpQuestions &&
                            message.followUpQuestions.length > 0 && (
                              <FollowUpChips
                                questions={message.followUpQuestions}
                                onSelect={handleFollowUpSelect}
                                className="ml-11"
                              />
                            )}
                        </div>
                        {message.timestamp && !isCurrentlyStreaming && (
                          <p className="text-[10px] text-white mt-1 ml-11">
                            {formatRelativeTime(message.timestamp)}
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Searching Skeleton */}
            <AnimatePresence>{isSearching && <SearchingSkeleton />}</AnimatePresence>
          </div>
        </ChatMessagesArea>
      )}

      {/* Input Area */}
      <ChatInputArea>
        {/* Compression Indicator */}
        <AnimatePresence>
          {isCompressing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 pb-2"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Optimising image...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Preview */}
        <AnimatePresence>
          {imagePreview && !isCompressing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 pb-2"
            >
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-16 rounded-xl object-cover border border-border/50"
                />
                <button
                  onClick={clearImage}
                  className="absolute -top-2 -right-2 p-1.5 bg-red-500 rounded-full shadow-lg touch-manipulation active:scale-95"
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Camera/Upload buttons */}
        <div className="flex items-center gap-2 px-4 pb-2">
          <button
            onClick={() => cameraInputRef.current?.click()}
            disabled={isCompressing}
            className="p-2.5 rounded-xl bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors touch-manipulation active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Take photo"
          >
            <Camera className="h-5 w-5" />
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isCompressing}
            className="p-2.5 rounded-xl bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors touch-manipulation active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Upload image"
          >
            <ImageIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Hidden file inputs - accept HEIC for iPhone */}
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
          placeholder="Ask Elec-AI anything..."
          messageCount={messages.length}
          showClearButton={messages.length > 0}
        />
      </ChatInputArea>

      {/* Chat History Drawer */}
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
    </ChatContainer>
  );
}
