
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
import { MessageBubble } from '@/components/electrician-tools/ai-tools/chat/MessageBubble';
import { MobileChatInput } from '@/components/electrician-tools/ai-tools/chat/MobileChatInput';
import { FollowUpChips } from '@/components/electrician-tools/ai-tools/chat/FollowUpChips';
import ChatMessageRenderer from "./ChatMessageRenderer";

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef<number>(0);
  const isNearBottomRef = useRef(true);

  // Track scroll position
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = el;
    isNearBottomRef.current = scrollHeight - scrollTop - clientHeight < 150;
  }, []);

  // Smooth scroll that respects user position
  const scrollToBottom = useCallback((force = false) => {
    if (force || isNearBottomRef.current) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      });
    }
  }, []);

  // Debounced scroll for streaming (max once per 50ms)
  const scrollToBottomDebounced = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollRef.current > 50) {
      lastScrollRef.current = now;
      scrollToBottom();
    }
  }, [scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages.length, scrollToBottom]);

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

    // Clear follow-ups when sending new message
    setFollowUpQuestions([]);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: textToSend.trim(),
      role: 'user',
      timestamp: new Date()
    };

    const aiMessageId = (Date.now() + 1).toString();

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    // Add empty AI message for streaming
    setChatMessages(prev => [...prev, {
      id: aiMessageId,
      content: '',
      role: 'assistant',
      timestamp: new Date()
    }]);

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
            stream: true
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
                  setChatMessages(prev =>
                    prev.map(msg =>
                      msg.id === aiMessageId
                        ? { ...msg, content: fullContent }
                        : msg
                    )
                  );
                  scrollToBottomDebounced();
                }
              } catch {
                // Skip malformed JSON chunks
              }
            }
          }
        }
      }

      // If no content was streamed, show fallback
      if (!fullContent) {
        fullContent = "I'm here to help with your electrical apprentice questions!";
        setChatMessages(prev =>
          prev.map(msg =>
            msg.id === aiMessageId
              ? { ...msg, content: fullContent }
              : msg
          )
        );
      }

      // Generate follow-up questions
      setFollowUpQuestions(generateFollowUps(fullContent));

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
    }
  };

  const handleClearConversation = useCallback(() => {
    setChatMessages([]);
    setFollowUpQuestions([]);
    toast.success('Conversation cleared');
  }, []);

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
    setQuickQuestionsOpen(false);
    setSelectedCategory(null);
  };

  const handleFollowUp = (question: string) => {
    handleSendMessage(question);
  };

  // Render assistant messages with rich formatting
  const renderAssistantContent = useCallback((content: string) => {
    return <ChatMessageRenderer content={content} isUser={false} />;
  }, []);

  // Welcome screen when no messages
  const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4 py-8">
      {/* Dave Avatar */}
      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-elec-yellow/30 to-orange-500/20 flex items-center justify-center border-2 border-elec-yellow/40">
          <Bot className="h-10 w-10 text-elec-yellow" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
          <Sparkles className="h-3 w-3 text-white" />
        </div>
      </div>

      <h3 className="font-bold text-xl mb-1">Hey, I'm Dave!</h3>
      <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow text-xs mb-3">
        20+ Years in the Trade
      </Badge>

      <p className="text-white/70 text-sm max-w-xs mb-4">
        Qualified sparky with decades of UK experience. Ask me about regs, testing, calcs, or your apprenticeship.
      </p>

      {/* Quick Start Suggestions */}
      <div className="flex flex-wrap justify-center gap-2 max-w-sm">
        {["Safe isolation", "Cable sizing", "Test sequence", "RCD rules"].map((topic, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(`Tell me about ${topic.toLowerCase()}`)}
            className="px-3 py-1.5 text-xs bg-white/5 hover:bg-elec-yellow/20 border border-white/10 hover:border-elec-yellow/30 rounded-full transition-all touch-manipulation"
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
    <div className="h-[calc(100dvh-280px)] sm:h-[600px]">
      <ChatContainer>
        <ChatMessagesArea
          messagesEndRef={messagesEndRef}
          onScroll={handleScroll}
        >
          {chatMessages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            <div className="px-4 py-2 space-y-4">
              {chatMessages.map((message) => (
                message.content === '' && message.role === 'assistant' && isLoading ? (
                  <TypingIndicator key={message.id} />
                ) : (
                  <MessageBubble
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    timestamp={message.timestamp}
                    isStreaming={message.content !== '' && message.role === 'assistant' && isLoading && message.id === chatMessages[chatMessages.length - 1]?.id}
                    renderContent={message.role === 'assistant' ? renderAssistantContent : undefined}
                  />
                )
              ))}
            </div>
          )}
        </ChatMessagesArea>

        <ChatInputArea>
          {/* Follow-up chips */}
          {followUpQuestions.length > 0 && !isLoading && (
            <FollowUpChips
              questions={followUpQuestions}
              onSelect={handleFollowUp}
              className="mb-2"
            />
          )}

          {/* Quick Questions Button Row */}
          <div className="flex items-center gap-2 mb-2">
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

          {/* Premium Mobile Chat Input */}
          <MobileChatInput
            value={currentMessage}
            onChange={setCurrentMessage}
            onSubmit={() => handleSendMessage()}
            onClear={handleClearConversation}
            isStreaming={isLoading}
            placeholder="Ask Dave anything..."
            messageCount={chatMessages.length}
            showClearButton={chatMessages.length > 0}
          />
        </ChatInputArea>
      </ChatContainer>
    </div>
  );
};

export default HelpBotTab;
