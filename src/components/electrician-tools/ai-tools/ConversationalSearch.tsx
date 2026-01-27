import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Camera, ImageIcon, X, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { InspectorMessage } from './InspectorMessage';
import { useSmoothedStreaming } from '@/hooks/useSmoothedStreaming';
import { useHaptic } from '@/hooks/useHaptic';
import { supabase } from '@/integrations/supabase/client';
import { isImageFile, validateImageSize, compressImageForUpload } from '@/utils/imageUploadUtils';
import {
  ChatContainer,
  ChatMessagesArea,
  ChatInputArea,
  SearchingSkeleton,
  FollowUpChips,
  MobileChatInput,
} from './chat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  followUpQuestions?: string[];
  imageUrl?: string;
}

const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';

export default function ConversationalSearch() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
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

  // RAF-based smooth streaming - optimised for butter-smooth experience
  const streaming = useSmoothedStreaming({
    charsPerFrame: 5,
    stateUpdateInterval: 60,
  });

  // Auto-focus input on load (desktop only)
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile && messages.length === 0) {
      inputRef.current?.focus();
    }
  }, []);

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
        block: 'end'
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

  useEffect(() => {
    if (isStreaming && isNearBottomRef.current) {
      const timeoutId = setTimeout(() => {
        scrollToBottomIfNeeded(true);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isStreaming, streaming.displayedText, scrollToBottomIfNeeded]);

  // Image handling - supports large files with compression
  const handleImageSelect = useCallback(async (file: File) => {
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
  }, [haptic]);

  const clearImage = useCallback(() => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview(null);
  }, [imagePreview]);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const fileName = `${user.id}/elec-ai/${Date.now()}.jpg`;

    const { error } = await supabase.storage
      .from('visual-uploads')
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('visual-uploads')
      .getPublicUrl(fileName);

    return publicUrl;
  }, []);

  const handleSend = useCallback(async (queryText?: string) => {
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
      imageUrl
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsSearching(true);
    setIsStreaming(true);
    streaming.reset();

    try {
      abortControllerRef.current = new AbortController();

      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/conversational-search`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_KEY}`
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
            imageUrl
          }),
          signal: abortControllerRef.current.signal
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          toast.error('Rate limit exceeded', {
            description: 'Please wait a moment and try again.'
          });
          setMessages(prev => prev.slice(0, -1));
          haptic.error();
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsSearching(false);

      const assistantMessage: Message = {
        role: 'assistant',
        content: '',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          const finalContent = streaming.flush();

          const followUpMatch = finalContent.match(/---FOLLOWUP---([\s\S]*?)---END_FOLLOWUP---/);
          let questions: string[] = [];
          let cleanedContent = finalContent;

          if (followUpMatch) {
            questions = followUpMatch[1]
              .trim()
              .split('\n')
              .map(q => q.replace(/^[•\-*]\s*/, '').trim())
              .filter(q => q.length > 0 && q.endsWith('?'));

            cleanedContent = finalContent.replace(/---FOLLOWUP---[\s\S]*?---END_FOLLOWUP---/g, '').trim();
          }

          setMessages(prev => {
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
        description: err.message
      });
      haptic.error();

      setMessages(prev => {
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
  }, [input, messages, streaming, haptic, selectedImage, uploadImage, clearImage]);

  const handleClearConversation = useCallback(() => {
    if (messages.length === 0) return;

    if (confirm('Clear conversation history?')) {
      setMessages([]);
      haptic.warning();
      toast.success('Conversation cleared');
    }
  }, [messages.length, haptic]);

  const handleFollowUpSelect = useCallback((question: string) => {
    setInput(question);
    inputRef.current?.focus();
    haptic.selection();
  }, [haptic]);

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
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-white truncate">Elec-AI</h1>
            <p className="text-[11px] text-white/50">Your electrical advisor</p>
          </div>
        </div>
      </header>

      {/* Empty State - Clean spacer */}
      {messages.length === 0 && (
        <ChatMessagesArea className="px-4 md:px-6">
          <div className="flex-1" />
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
                const isCurrentlyStreaming = isStreaming && idx === messages.length - 1 && message.role === 'assistant';
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
                      <div className="flex justify-end">
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
                          <div className="rounded-2xl rounded-tr-sm px-4 py-3 bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/20">
                            <div className="whitespace-pre-wrap break-words font-medium">
                              {message.content}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-start">
                        <div className="max-w-[95%] sm:max-w-[90%] space-y-3">
                          <InspectorMessage
                            message={{
                              role: 'assistant',
                              content: isCurrentlyStreaming ? streaming.displayedText : message.content,
                              agentName: 'Elec-AI'
                            }}
                            isStreaming={isCurrentlyStreaming}
                          />

                          {/* Follow-up Question Chips */}
                          {!isCurrentlyStreaming && message.followUpQuestions && message.followUpQuestions.length > 0 && (
                            <FollowUpChips
                              questions={message.followUpQuestions}
                              onSelect={handleFollowUpSelect}
                              className="ml-11"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Searching Skeleton */}
            <AnimatePresence>
              {isSearching && (
                <SearchingSkeleton />
              )}
            </AnimatePresence>
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
          onClear={handleClearConversation}
          isStreaming={isStreaming}
          placeholder="Ask Elec-AI anything..."
          messageCount={messages.length}
          showClearButton={messages.length > 0}
        />
      </ChatInputArea>
    </ChatContainer>
  );
}
