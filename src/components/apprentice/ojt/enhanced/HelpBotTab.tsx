
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Bot,
  MessageSquare,
  Shield,
  Calculator,
  BookOpen,
  Wrench,
  FileText,
  GraduationCap,
  Sparkles,
  HelpCircle,
  Zap
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ChatContainer, ChatMessagesArea, ChatInputArea } from '@/components/electrician-tools/ai-tools/chat/ChatContainer';
import { MobileChatInput } from '@/components/electrician-tools/ai-tools/chat/MobileChatInput';
import { InspectorMessage } from '@/components/electrician-tools/ai-tools/InspectorMessage';
import { ChatImageUpload, ImagePreviewBadge } from './ChatImageUpload';
import { Camera } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useSmoothedStreaming } from '@/hooks/useSmoothedStreaming';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  imageUrl?: string;
}

interface QuickQuestionCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  questions: string[];
}

const HelpBotTab = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quickQuestionsOpen, setQuickQuestionsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [attachedImage, setAttachedImage] = useState<string>('');
  const [imageUploadOpen, setImageUploadOpen] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const userScrolledRef = useRef(false);
  const wasAtBottomBeforeStreamRef = useRef(true);
  const lastScrollTimeRef = useRef(0);
  const SCROLL_THROTTLE_MS = 500; // Only scroll every 500ms during streaming

  // Smooth streaming hook - 60fps text animation
  const {
    displayedText: streamedContent,
    addTokens,
    flush: flushStream,
    reset: resetStream,
  } = useSmoothedStreaming({ charsPerFrame: 4, stateUpdateInterval: 60 });

  // Check if user is at bottom of scroll
  const isAtBottom = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return true;
    const { scrollTop, scrollHeight, clientHeight } = el;
    return scrollHeight - scrollTop - clientHeight < 100;
  }, []);

  // Track when user manually scrolls during streaming
  const handleScroll = useCallback(() => {
    if (isLoading && !isAtBottom()) {
      userScrolledRef.current = true;
    }
  }, [isLoading, isAtBottom]);

  // Smooth scroll to bottom - only if user hasn't scrolled away, with throttling during streaming
  const scrollToBottom = useCallback((force = false) => {
    const now = Date.now();

    // During streaming, throttle scroll calls to prevent jumpiness
    if (isLoading && !force) {
      if (now - lastScrollTimeRef.current < SCROLL_THROTTLE_MS) return;
      lastScrollTimeRef.current = now;
    }

    if (force || (!userScrolledRef.current && wasAtBottomBeforeStreamRef.current)) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [isLoading]);

  // Scroll to bottom when new message arrives (not during streaming)
  useEffect(() => {
    if (!isLoading) {
      scrollToBottom();
    }
  }, [chatMessages.length, scrollToBottom, isLoading]);

  // Periodically scroll during streaming (throttled via scrollToBottom)
  useEffect(() => {
    if (isLoading && streamedContent && !userScrolledRef.current) {
      scrollToBottom();
    }
  }, [streamedContent, isLoading, scrollToBottom]);

  const quickQuestionCategories: QuickQuestionCategory[] = [
    {
      id: "safety",
      name: "Safety",
      icon: Shield,
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      questions: [
        "Walk me through the safe isolation procedure",
        "What PPE do I need for electrical work?",
        "How do I safely test if a circuit is dead?",
        "Explain lock-off/tag-out procedures"
      ]
    },
    {
      id: "regs",
      name: "BS 7671",
      icon: BookOpen,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
      questions: [
        "Requirements for bathroom installations?",
        "When is RCD protection required?",
        "Bonding requirements for domestic?",
        "Consumer unit upgrade requirements?"
      ]
    },
    {
      id: "testing",
      name: "Testing",
      icon: Zap,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      questions: [
        "Correct sequence for initial verification?",
        "How do I test a ring circuit?",
        "Expected R1+R2 readings?",
        "Pass/fail for insulation resistance?"
      ]
    },
    {
      id: "calculations",
      name: "Calculations",
      icon: Calculator,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      questions: [
        "Calculate cable size for cooker circuit",
        "How to calculate voltage drop?",
        "Adiabatic equation explained",
        "Design current (Ib) calculation"
      ]
    },
    {
      id: "practical",
      name: "Practical",
      icon: Wrench,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      questions: [
        "Routing cables through joists?",
        "Terminate SWA cable properly",
        "Tips for neat CU wiring",
        "Identify cables in existing install"
      ]
    },
    {
      id: "portfolio",
      name: "Portfolio",
      icon: FileText,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      questions: [
        "Evidence needed for portfolio?",
        "Write up a job for evidence",
        "What to expect in EPA?",
        "Photograph installation work"
      ]
    },
    {
      id: "career",
      name: "Career",
      icon: GraduationCap,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
      questions: [
        "Qualifications after apprenticeship?",
        "How to get ECS/JIB card?",
        "Route to qualified supervisor?",
        "Set up own electrical business?"
      ]
    }
  ];

  // Generate follow-up questions based on the last response
  const generateFollowUps = useCallback((content: string): string[] => {
    // Simple keyword-based follow-up generation
    const followUps: string[] = [];

    if (content.toLowerCase().includes('regulation') || content.toLowerCase().includes('bs 7671')) {
      followUps.push("What's the exact regulation number?");
    }
    if (content.toLowerCase().includes('test') || content.toLowerCase().includes('verify')) {
      followUps.push("What equipment do I need for this?");
    }
    if (content.toLowerCase().includes('cable') || content.toLowerCase().includes('size')) {
      followUps.push("Can you show me the calculation?");
    }
    if (content.toLowerCase().includes('safety') || content.toLowerCase().includes('safe')) {
      followUps.push("What are common mistakes to avoid?");
    }

    // Always add generic useful follow-ups
    if (followUps.length < 3) {
      followUps.push("Can you explain that in more detail?");
    }
    if (followUps.length < 3) {
      followUps.push("Any tips from your experience?");
    }

    return followUps.slice(0, 3);
  }, []);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || currentMessage;
    if (!textToSend.trim() || isLoading) return;

    // Clear follow-ups and reset streaming state
    setFollowUpQuestions([]);
    resetStream();

    // Record scroll position before streaming starts
    wasAtBottomBeforeStreamRef.current = isAtBottom();
    userScrolledRef.current = false;

    // Capture attached image before clearing
    const imageToSend = attachedImage;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: textToSend.trim(),
      role: 'user',
      timestamp: new Date(),
      imageUrl: imageToSend || undefined
    };

    const aiMessageId = (Date.now() + 1).toString();

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setAttachedImage('');
    setIsLoading(true);
    setStreamingMessageId(aiMessageId);

    // Add empty AI message for streaming
    setChatMessages(prev => [...prev, {
      id: aiMessageId,
      content: '',
      role: 'assistant',
      timestamp: new Date()
    }]);

    // Scroll to show the new message
    setTimeout(() => scrollToBottom(), 50);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL || 'https://jtwygbeceundfgnkirof.supabase.co'}/functions/v1/chat-assistant`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || '',
          },
          body: JSON.stringify({
            message: textToSend.trim(),
            context: 'electrical apprenticeship training and guidance',
            stream: true,
            imageUrl: imageToSend || undefined,
            history: chatMessages
              .filter(m => m.content.trim() !== '')
              .slice(-10)
              .map(m => ({ role: m.role, content: m.content }))
          })
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
      const finalContent = flushStream() || fullContent || "I'm here to help with your electrical apprentice questions!";

      // Update the message with final content (single React update)
      setChatMessages(prev =>
        prev.map(msg =>
          msg.id === aiMessageId
            ? { ...msg, content: finalContent }
            : msg
        )
      );

      // Generate follow-up questions
      setFollowUpQuestions(generateFollowUps(finalContent));

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Sorry, I encountered an issue. Please try again.');

      setChatMessages(prev =>
        prev.map(msg =>
          msg.id === aiMessageId
            ? { ...msg, content: "I apologise, but I'm having trouble responding right now. Please try your question again in a moment." }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      setStreamingMessageId(null);
      // Scroll to bottom at end if user didn't scroll away
      if (!userScrolledRef.current) {
        setTimeout(() => scrollToBottom(), 100);
      }
    }
  };

  const handleClearConversation = useCallback(() => {
    setChatMessages([]);
    setFollowUpQuestions([]);
    resetStream();
    setStreamingMessageId(null);
    toast.success('Conversation cleared');
  }, [resetStream]);

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
    setQuickQuestionsOpen(false);
    setSelectedCategory(null);
  };

  const handleFollowUp = (question: string) => {
    handleSendMessage(question);
  };

  // Welcome screen when no messages - compact on mobile
  const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[200px] sm:min-h-[400px] text-center px-4 py-4 sm:py-8">
      {/* Dave Avatar - smaller on mobile */}
      <div className="relative mb-3 sm:mb-4">
        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-elec-yellow/30 to-orange-500/20 flex items-center justify-center border-2 border-elec-yellow/40">
          <Bot className="h-7 w-7 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
          <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
        </div>
      </div>

      <h3 className="font-bold text-lg sm:text-xl mb-0.5 sm:mb-1">Hey, I'm Dave!</h3>
      <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow text-[10px] sm:text-xs mb-2 sm:mb-3">
        20+ Years in the Trade
      </Badge>

      <p className="text-white/70 text-xs sm:text-sm max-w-xs mb-3 sm:mb-4 hidden sm:block">
        Qualified sparky with decades of UK experience. Ask me about regs, testing, calcs, or your apprenticeship.
      </p>

      {/* Quick Start Suggestions */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-sm">
        {["Safe isolation", "Cable sizing", "Test sequence", "RCD rules"].map((topic, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(`Tell me about ${topic.toLowerCase()}`)}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs bg-white/5 hover:bg-elec-yellow/20 border border-white/10 hover:border-elec-yellow/30 rounded-full transition-all touch-manipulation"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );

  // Typing indicator for streaming
  const TypingIndicator = () => (
    <div className="flex items-start gap-3 px-4 py-2">
      <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-elec-yellow to-elec-yellow/80 flex items-center justify-center shadow-sm">
        <Zap className="w-4 h-4 text-elec-dark animate-pulse" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted-foreground mb-1 font-medium">Dave</div>
        <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3 inline-block">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-elec-yellow rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-elec-yellow rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-elec-yellow rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100dvh-140px)] sm:h-[600px]">
      <ChatContainer>
        <ChatMessagesArea
          messagesEndRef={messagesEndRef}
          onScroll={handleScroll}
        >
          {chatMessages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            <div className="px-4 py-2 space-y-4">
              {chatMessages.map((message) => {
                const isCurrentlyStreaming = message.id === streamingMessageId && isLoading;
                // Use smoothed content for streaming message, otherwise use stored content
                const displayContent = isCurrentlyStreaming ? streamedContent : message.content;

                // Show typing indicator only when no content yet
                if (displayContent === '' && message.role === 'assistant' && isLoading) {
                  return <TypingIndicator key={message.id} />;
                }

                return (
                  <InspectorMessage
                    key={message.id}
                    message={{
                      role: message.role,
                      content: displayContent,
                      agentName: message.role === 'assistant' ? 'Dave' : undefined,
                      imageUrl: message.imageUrl
                    }}
                    isStreaming={isCurrentlyStreaming && displayContent !== ''}
                  />
                );
              })}
            </div>
          )}
        </ChatMessagesArea>

        <ChatInputArea>
          {/* Compact Follow-up chips - horizontal scroll on mobile */}
          {followUpQuestions.length > 0 && !isLoading && (
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1 mb-2 -mx-1 px-1">
              <span className="text-[10px] text-muted-foreground shrink-0 hidden sm:inline">Try:</span>
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

          {/* Quick Questions Button Row - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 mb-2">
            <Sheet open={quickQuestionsOpen} onOpenChange={setQuickQuestionsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 touch-manipulation text-xs"
                >
                  <HelpCircle className="h-3.5 w-3.5 mr-1.5 text-elec-yellow" />
                  Quick Questions
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0">
                <SheetHeader className="px-4 pt-4 pb-2 border-b border-white/10">
                  <SheetTitle className="flex items-center gap-2 text-lg">
                    <MessageSquare className="h-5 w-5 text-elec-yellow" />
                    Quick Questions
                  </SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto h-[calc(70vh-80px)] p-4" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {!selectedCategory ? (
                    <div className="grid grid-cols-2 gap-3">
                      {quickQuestionCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`${category.bgColor} p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all touch-manipulation text-left`}
                        >
                          <category.icon className={`h-6 w-6 ${category.color} mb-2`} />
                          <span className="font-medium text-sm">{category.name}</span>
                          <p className="text-xs text-white/50 mt-1">{category.questions.length} questions</p>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="text-sm text-elec-yellow mb-3 flex items-center gap-1 touch-manipulation"
                      >
                        ← Back to categories
                      </button>
                      {quickQuestionCategories.find(c => c.id === selectedCategory)?.questions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickQuestion(question)}
                          disabled={isLoading}
                          className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-elec-yellow/10 border border-white/10 hover:border-elec-yellow/30 transition-all touch-manipulation"
                        >
                          <span className="text-sm text-white/90">{question}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Attached Image Preview */}
          <AnimatePresence>
            {attachedImage && (
              <div className="mb-2">
                <ImagePreviewBadge
                  imageUrl={attachedImage}
                  onRemove={() => setAttachedImage('')}
                />
              </div>
            )}
          </AnimatePresence>

          {/* Input Row with Camera Button */}
          <div className="flex items-end gap-1.5 sm:gap-2">
            {/* Camera Button - Compact on mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setImageUploadOpen(true)}
              disabled={isLoading}
              className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-xl bg-white/5 hover:bg-elec-yellow/20 border border-white/10 hover:border-elec-yellow/30 transition-colors touch-manipulation"
            >
              <Camera className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-elec-yellow" />
            </Button>

            {/* Premium Mobile Chat Input */}
            <div className="flex-1 min-w-0">
              <MobileChatInput
                value={currentMessage}
                onChange={setCurrentMessage}
                onSubmit={() => handleSendMessage()}
                onClear={handleClearConversation}
                isStreaming={isLoading}
                placeholder={attachedImage ? "What do you see?" : "Ask Dave anything..."}
                messageCount={chatMessages.length}
                showClearButton={chatMessages.length > 0}
              />
            </div>
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
    </div>
  );
};

export default HelpBotTab;
