import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Ruler, Building2, ClipboardCheck, Sparkles, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { InspectorMessage } from './InspectorMessage';
import CategoryCard from './CategoryCard';
import { useSmoothedStreaming } from '@/hooks/useSmoothedStreaming';
import { useHaptic } from '@/hooks/useHaptic';
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
}

const CATEGORIES = [
  {
    icon: Shield,
    title: 'Safety & Protection',
    description: 'RCD, MCB, earthing and bonding requirements',
    color: 'from-red-500 to-orange-500',
    examples: [
      'RCD requirements for bathrooms',
      'When is additional protection required?',
      'Main bonding conductor sizing',
    ],
  },
  {
    icon: Ruler,
    title: 'Cable Sizing',
    description: 'Calculations, voltage drop, and selection',
    color: 'from-blue-500 to-cyan-500',
    examples: [
      'Cable sizing for 32A ring circuit',
      'Maximum voltage drop limits',
      'Cable derating factors',
    ],
  },
  {
    icon: Building2,
    title: 'Special Installations',
    description: 'Bathrooms, outdoor, agricultural, and EV',
    color: 'from-purple-500 to-pink-500',
    examples: [
      'EV charger installation requirements',
      'Outdoor socket regulations',
      'Bathroom zone requirements',
    ],
  },
  {
    icon: ClipboardCheck,
    title: 'Testing & Inspection',
    description: 'Procedures, limits, and certificates',
    color: 'from-green-500 to-emerald-500',
    examples: [
      'Earth fault loop testing procedure',
      'Maximum Zs values for circuits',
      'Insulation resistance test voltages',
    ],
  },
];

const ROTATING_PLACEHOLDERS = [
  'Ask about RCD requirements...',
  'Calculate cable sizes...',
  'Check voltage drop limits...',
  'Learn about special locations...',
  'Understand testing procedures...',
];

const STARTER_QUESTIONS = [
  "What are the RCD requirements for bathrooms?",
  "How do I size cables for a ring circuit?",
  "What's the maximum voltage drop allowed?",
  "EV charger installation requirements",
  "Earth fault loop impedance testing",
  "When is additional protection required?",
];

const ELECTRICAL_FACTS = [
  'BS 7671:2018+A3:2024 contains over 600 regulations',
  'RCDs must trip within 40ms for additional protection',
  'Maximum voltage drop: 3% for lighting, 5% for other uses',
  'Bathroom zones determine IPX4/IPX5 requirements',
  'Periodic inspection recommended every 5-10 years',
];

const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';

export default function ConversationalSearch() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isNearBottomRef = useRef(true); // Track if user is near bottom for smart scroll
  const haptic = useHaptic();

  // RAF-based smooth streaming - returns displayedText directly
  const streaming = useSmoothedStreaming({
    charsPerFrame: 4, // 4 chars per frame = ~240 chars/sec at 60fps (natural reading speed)
    stateUpdateInterval: 80, // Sync to React state every 80ms (12.5 updates/sec - less re-renders)
  });

  // Auto-focus input on load (desktop only - mobile keyboards are intrusive)
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile && messages.length === 0) {
      inputRef.current?.focus();
    }
  }, []);

  // Rotate placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ROTATING_PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Rotate electrical facts
  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % ELECTRICAL_FACTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const SCROLL_THRESHOLD = 150; // pixels from bottom to consider "near bottom"

  // Track user scroll position
  const handleScrollPosition = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    isNearBottomRef.current = distanceFromBottom < SCROLL_THRESHOLD;
  }, []);

  // Smart scroll - only if user is near bottom
  const scrollToBottomIfNeeded = useCallback((instant?: boolean) => {
    if (isNearBottomRef.current) {
      messagesEndRef.current?.scrollIntoView({
        behavior: instant ? 'instant' : 'smooth',
        block: 'end'
      });
    }
  }, []);

  // Auto-scroll when new messages arrive (only if near bottom)
  useEffect(() => {
    if (!isStreaming && messages.length > 0) {
      // Small delay to let content render
      const timeoutId = setTimeout(() => {
        scrollToBottomIfNeeded();
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [messages.length, isStreaming, scrollToBottomIfNeeded]);

  // During streaming: throttled scroll only if near bottom (every 500ms max)
  useEffect(() => {
    if (isStreaming && isNearBottomRef.current) {
      const timeoutId = setTimeout(() => {
        scrollToBottomIfNeeded(true);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isStreaming, streaming.displayedText, scrollToBottomIfNeeded]);

  const handleSend = useCallback(async (queryText?: string) => {
    const messageText = queryText || input.trim();

    if (!messageText) return;

    haptic.medium();

    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date()
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
            messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
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

      // Add empty assistant message as placeholder for streaming content
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
          // Flush remaining content and extract follow-ups
          const finalContent = streaming.flush();

          // Extract follow-up questions from final content
          const followUpMatch = finalContent.match(/---FOLLOWUP---([\s\S]*?)---END_FOLLOWUP---/);
          let questions: string[] = [];
          let cleanedContent = finalContent;

          if (followUpMatch) {
            questions = followUpMatch[1]
              .trim()
              .split('\n')
              .map(q => q.replace(/^[•\-*]\s*/, '').trim())
              .filter(q => q.length > 0 && q.endsWith('?'));

            // Remove follow-up section from displayed content
            cleanedContent = finalContent.replace(/---FOLLOWUP---[\s\S]*?---END_FOLLOWUP---/g, '').trim();
          }

          // Always update last message with final content
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
                // Use smooth streaming instead of batched updates
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

      console.error('Error calling conversational search:', error);
      toast.error('Failed to get response', {
        description: err.message
      });
      haptic.error();

      // Remove messages - if assistant was added (during streaming), remove both; otherwise just user
      setMessages(prev => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg?.role === 'assistant') {
          return prev.slice(0, -2); // Remove both assistant and user
        }
        return prev.slice(0, -1); // Remove just user
      });
    } finally {
      streaming.stop();
      setIsStreaming(false);
      setIsSearching(false);
      abortControllerRef.current = null;
    }
  }, [input, messages, streaming, haptic]);

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
      {/* Empty State - Hero & Categories (only show when no messages) */}
      {messages.length === 0 && (
        <ChatMessagesArea className="px-4 md:px-6">
          <div className="py-4 space-y-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-elec-yellow via-elec-yellow/80 to-yellow-600 flex items-center justify-center shadow-lg shadow-elec-yellow/20">
                  <Zap className="w-6 h-6 text-elec-dark" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                  AI Assistant
                </h1>
              </div>
              <p className="text-foreground/90 text-sm md:text-base max-w-2xl mx-auto">
                Instant BS 7671 answers · 18th Edition compliant
              </p>
            </motion.div>

            {/* Electrical Fact - Subtle hint */}
            <motion.div
              key={factIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p className="text-xs text-foreground/70">
                <span className="font-medium">Did you know?</span> {ELECTRICAL_FACTS[factIndex]}
              </p>
            </motion.div>

            {/* Quick Start Questions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
              <FollowUpChips
                questions={STARTER_QUESTIONS}
                onSelect={handleSend}
              />
            </motion.div>

            {/* Category Cards - Quick Access Templates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-lg font-semibold text-foreground/90 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-elec-yellow" />
                Quick Start Templates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {CATEGORIES.map((category, idx) => (
                  <CategoryCard
                    key={idx}
                    icon={category.icon}
                    title={category.title}
                    description={category.description}
                    examples={category.examples}
                    color={category.color}
                    onClick={handleSend}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </ChatMessagesArea>
      )}

      {/* Active State - Messages Container (only show if messages exist) */}
      {messages.length > 0 && (
        <ChatMessagesArea
          messagesEndRef={messagesEndRef}
          onScroll={handleScrollPosition}
          className="px-4 md:px-6"
        >
          <div className="py-4 space-y-4">
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
                  >
                    {message.role === 'user' ? (
                      <div className="flex justify-end">
                        <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-sm px-4 py-3 bg-gradient-to-br from-elec-yellow to-elec-yellow/90 text-elec-dark shadow-lg shadow-elec-yellow/20">
                          <div className="whitespace-pre-wrap break-words font-medium">
                            {message.content}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-start">
                        <div className="max-w-[95%] sm:max-w-[90%] space-y-3">
                          <InspectorMessage
                            message={{
                              role: 'assistant',
                              // Use streaming.displayedText during active streaming, otherwise use stored content
                              content: isCurrentlyStreaming ? streaming.displayedText : message.content,
                              agentName: 'BS 7671 Assistant'
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
        <MobileChatInput
          value={input}
          onChange={setInput}
          onSubmit={() => handleSend()}
          onClear={handleClearConversation}
          isStreaming={isStreaming}
          placeholder={ROTATING_PLACEHOLDERS[placeholderIndex]}
          messageCount={messages.length}
          showClearButton={messages.length > 0}
        />
      </ChatInputArea>
    </ChatContainer>
  );
}
