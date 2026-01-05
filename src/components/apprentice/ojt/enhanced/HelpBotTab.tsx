
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  MessageSquare,
  Send,
  Zap,
  Shield,
  Calculator,
  BookOpen,
  Wrench,
  FileText,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Sparkles
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ChatMessageRenderer from "./ChatMessageRenderer";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface QuickQuestionCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  questions: string[];
}

const HelpBotTab = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const quickQuestionCategories: QuickQuestionCategory[] = [
    {
      id: "safety",
      name: "Safety & Isolation",
      icon: Shield,
      color: "text-red-500",
      questions: [
        "Walk me through the safe isolation procedure step by step",
        "What PPE do I need for different types of electrical work?",
        "How do I safely test if a circuit is dead?",
        "What's the procedure for working near overhead lines?",
        "Explain lock-off/tag-out procedures"
      ]
    },
    {
      id: "regs",
      name: "BS 7671 Regulations",
      icon: BookOpen,
      color: "text-orange-500",
      questions: [
        "What are the requirements for bathroom installations?",
        "When is RCD protection required under Amendment 2?",
        "Explain the zones in a bathroom and what's allowed in each",
        "What are the bonding requirements for a domestic installation?",
        "What's required for a consumer unit upgrade to meet 18th Edition?"
      ]
    },
    {
      id: "testing",
      name: "Testing & Inspection",
      icon: Zap,
      color: "text-yellow-500",
      questions: [
        "What's the correct sequence for initial verification tests?",
        "How do I test a ring circuit properly?",
        "What readings should I expect for an R1+R2 test?",
        "How do I test earth loop impedance (Zs)?",
        "What are the pass/fail criteria for insulation resistance?"
      ]
    },
    {
      id: "calculations",
      name: "Calculations & Design",
      icon: Calculator,
      color: "text-blue-500",
      questions: [
        "Help me calculate cable size for a cooker circuit",
        "How do I calculate voltage drop?",
        "What's the adiabatic equation and when do I use it?",
        "How do I calculate diversity for a domestic installation?",
        "Walk me through a full design current (Ib) calculation"
      ]
    },
    {
      id: "practical",
      name: "Practical Skills",
      icon: Wrench,
      color: "text-green-500",
      questions: [
        "What's the best way to route cables through joists?",
        "How do I terminate an SWA cable properly?",
        "Tips for neat consumer unit wiring?",
        "How do I identify cables in an existing installation?",
        "What's the correct method for bending conduit?"
      ]
    },
    {
      id: "portfolio",
      name: "Portfolio & EPA",
      icon: FileText,
      color: "text-purple-500",
      questions: [
        "What evidence do I need for my portfolio?",
        "How do I write up a job for portfolio evidence?",
        "What should I expect in the EPA practical assessment?",
        "How do I demonstrate competence in my portfolio?",
        "What's the best way to photograph installation work?"
      ]
    },
    {
      id: "career",
      name: "Career & Progression",
      icon: GraduationCap,
      color: "text-cyan-500",
      questions: [
        "What qualifications do I need after my apprenticeship?",
        "How do I get my ECS/JIB card?",
        "What's the route to becoming a qualified supervisor?",
        "Should I specialise or stay general?",
        "How do I set up my own electrical business?"
      ]
    }
  ];

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || currentMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: textToSend.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: {
          message: textToSend.trim(),
          context: 'electrical apprenticeship training and guidance'
        }
      });

      if (error) throw error;

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I'm here to help with your electrical apprentice questions!",
        isUser: false,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Sorry, I encountered an issue. Please try again.');

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I apologise, but I'm having trouble responding right now. Please try your question again in a moment.",
        isUser: false,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
    setExpandedCategory(null);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(prev => prev === categoryId ? null : categoryId);
  };

  return (
    <div className="space-y-4">
      {/* Main Chat Card */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-gray to-elec-gray/80">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <div className="relative">
                <Bot className="h-6 w-6" />
                <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-400" />
              </div>
              Ask Dave - Your Electrical Mentor
            </CardTitle>
            <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow">
              20+ Years Experience
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Master electrician with decades of UK experience. Ask anything about electrical work, regulations, testing, or your apprenticeship.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chat Messages Area */}
          <div className="h-[400px] border border-elec-yellow/20 rounded-lg p-4 overflow-y-auto bg-background/50">
            {chatMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-16 h-16 rounded-full bg-elec-yellow/20 flex items-center justify-center mb-4">
                  <Bot className="h-8 w-8 text-elec-yellow" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Hello! I'm Dave.</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  I'm a qualified electrician with over 20 years in the UK trade. I've trained dozens of apprentices
                  and know BS 7671 inside out. Whether it's regulations, testing, calculations, or career advice -
                  I'm here to help.
                </p>
                <div className="text-xs text-muted-foreground bg-elec-gray/50 px-3 py-2 rounded-lg">
                  💡 Use the quick questions below or ask me anything about electrical work
                </div>
              </div>
            ) : (
              <>
                {chatMessages.map((message) => (
                  <ChatMessageRenderer
                    key={message.id}
                    content={message.content}
                    isUser={message.isUser}
                  />
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-4 max-w-[85%]">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-elec-yellow rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-elec-yellow rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-elec-yellow rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">Dave is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Dave anything about electrical work..."
              className="flex-1 min-h-[60px] max-h-[120px] resize-none border-elec-yellow/30 focus:border-elec-yellow"
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!currentMessage.trim() || isLoading}
              className="px-4 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Questions Categories */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-elec-yellow" />
            Quick Questions by Topic
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {quickQuestionCategories.map((category) => (
            <div key={category.id} className="border border-elec-gray rounded-lg overflow-hidden">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-3 hover:bg-elec-gray/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <category.icon className={`h-4 w-4 ${category.color}`} />
                  <span className="font-medium text-sm">{category.name}</span>
                </div>
                {expandedCategory === category.id ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              {expandedCategory === category.id && (
                <div className="px-3 pb-3 space-y-2 border-t border-elec-gray">
                  {category.questions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="w-full text-left text-sm p-2 rounded hover:bg-elec-yellow/10 transition-colors text-muted-foreground hover:text-foreground"
                      disabled={isLoading}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-4 w-4 text-red-500" />
            <span className="text-xs font-medium">Safety First</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Dave always emphasises safe working practices. Never skip isolation procedures.
          </p>
        </div>
        <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-medium">Regs Expert</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Ask about BS 7671 - Dave knows the 18th Edition inside out.
          </p>
        </div>
        <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="h-4 w-4 text-cyan-500" />
            <span className="text-xs font-medium">Career Advice</span>
          </div>
          <p className="text-xs text-muted-foreground">
            From apprentice to running your own business - get guidance on your journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpBotTab;
