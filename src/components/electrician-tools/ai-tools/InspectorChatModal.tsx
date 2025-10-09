import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, X, ChevronDown, ChevronUp } from "lucide-react";
import { useStreamingChat } from "@/hooks/useStreamingChat";
import { InspectorMessage } from "./InspectorMessage";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface Finding {
  description: string;
  eicr_code: string;
  bs7671_clauses: string[];
  fix_guidance?: string;
  confidence: number;
}

interface InspectorChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  findings: Finding[];
  imageUrl?: string;
  analysisMode: string;
  userContext?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  citations?: Array<{ number: string; title: string }>;
  activeAgents?: string[];
  agentName?: string;
}

export const InspectorChatModal = ({ 
  isOpen, 
  onClose, 
  findings, 
  imageUrl,
  analysisMode,
  userContext
}: InspectorChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reasoningSteps, setReasoningSteps] = useState<Array<{
    agent: string;
    status: 'pending' | 'active' | 'complete';
    reasoning?: string;
  }>>([]);
  const [showReasoning, setShowReasoning] = useState(false); // Start collapsed
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [streamingMessageIndex, setStreamingMessageIndex] = useState<number | null>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const { streamMessage, isStreaming } = useStreamingChat({
    onAgentStart: (agent, index, total) => {
      setReasoningSteps(prev => {
        const newSteps = [...prev];
        const existingIndex = newSteps.findIndex(s => s.agent === agent);
        if (existingIndex >= 0) {
          newSteps[existingIndex] = { agent, status: 'active' };
        } else {
          newSteps.push({ agent, status: 'active' });
        }
        return newSteps;
      });
    },
    onAgentResponse: (agent, response) => {
      setReasoningSteps(prev => 
        prev.map(s => s.agent === agent ? { ...s, status: 'complete', reasoning: response.slice(0, 100) + '...' } : s)
      );
    },
    onAgentComplete: (agent, nextAgent) => {
      setReasoningSteps(prev => 
        prev.map(s => s.agent === agent ? { ...s, status: 'complete' } : s)
      );
      if (nextAgent) {
        setReasoningSteps(prev => [...prev, { agent: nextAgent, status: 'pending' }]);
      }
    },
    onError: (error) => {
      toast.error(error);
      setIsLoading(false);
    }
  });

  // Auto-generate initial question when modal opens
  useEffect(() => {
    if (isOpen && findings.length > 0 && messages.length === 0) {
      const initialQuestion = generateInitialQuestion();
      
      // Add assistant greeting
      const greeting: Message = {
        role: 'assistant',
        content: "Right, let me have a look at what you've found. I'll analyse the safety classification, required tests, and how to verify these defects properly.",
        agentName: 'inspector'
      };
      
      setMessages([greeting]);
      
      // Auto-send the initial question
      setTimeout(() => {
        handleSendInitialMessage(initialQuestion);
      }, 500);
    }
  }, [isOpen, findings]);

  const generateInitialQuestion = (): string => {
    const findingsList = findings.map((f, i) => 
      `${i + 1}. [${f.eicr_code}] ${f.description}\n   BS 7671: ${f.bs7671_clauses.join(', ')}`
    ).join('\n\n');

    return `I've completed a visual inspection and identified the following issues:\n\n${findingsList}\n\nPlease help me:\n1. Confirm the safety classification for each finding\n2. Specify which tests I need to perform to verify these defects\n3. Explain the safety implications\n4. Advise on remediation approach`;
  };

  const handleSendInitialMessage = async (question: string) => {
    const userMessage: Message = {
      role: 'user',
      content: question
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setStreamingMessageIndex(1); // Next message will be at index 1

    const assistantMessage: Message = {
      role: 'assistant',
      content: '',
      activeAgents: ['inspector']
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      await streamMessage(
        [userMessage],
        { findings, analysisMode, userContext },
        (token) => {
          setMessages(prev => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            if (newMessages[lastIndex].role === 'assistant') {
              newMessages[lastIndex] = {
                ...newMessages[lastIndex],
                content: newMessages[lastIndex].content + token
              };
            }
            return newMessages;
          });
        },
        (fullMessage, data) => {
          setMessages(prev => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            newMessages[lastIndex] = {
              ...newMessages[lastIndex],
              content: fullMessage,
              citations: data.citations,
              activeAgents: data.activeAgents
            };
            return newMessages;
          });
          setIsLoading(false);
          setStreamingMessageIndex(null);
        },
        ['inspector']
      );
    } catch (error) {
      setIsLoading(false);
      setStreamingMessageIndex(null);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const currentStreamIndex = messages.length + 1;
    setStreamingMessageIndex(currentStreamIndex);

    const assistantMessage: Message = {
      role: 'assistant',
      content: '',
      activeAgents: []
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      await streamMessage(
        [...messages, userMessage],
        { findings, analysisMode, userContext },
        (token) => {
          setMessages(prev => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            if (newMessages[lastIndex].role === 'assistant') {
              newMessages[lastIndex] = {
                ...newMessages[lastIndex],
                content: newMessages[lastIndex].content + token
              };
            }
            return newMessages;
          });
        },
        (fullMessage, data) => {
          setMessages(prev => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            newMessages[lastIndex] = {
              ...newMessages[lastIndex],
              content: fullMessage,
              citations: data.citations,
              activeAgents: data.activeAgents
            };
            return newMessages;
          });
          setIsLoading(false);
          setStreamingMessageIndex(null);
        }
      );
    } catch (error) {
      setIsLoading(false);
      setStreamingMessageIndex(null);
    }
  };

  // Only auto-scroll if user hasn't manually scrolled up
  useEffect(() => {
    if (shouldAutoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, shouldAutoScroll]);

  // Track if user has scrolled up
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 100;
    setShouldAutoScroll(isAtBottom);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] sm:h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 sm:p-6 pb-3 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg sm:text-xl font-semibold">Inspector AI Consultation</DialogTitle>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                BS 7671 Part 6 Inspection & Testing Analysis
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Messages */}
        <div 
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 scroll-smooth"
          onScroll={handleScroll}
        >
          {/* Inline Reasoning Panel - Compact */}
          {reasoningSteps.length > 0 && (
            <div className="mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReasoning(!showReasoning)}
                className="w-full justify-between text-xs h-8 px-3 bg-elec-card/30 border border-elec-yellow/20 hover:bg-elec-card/50"
              >
                <div className="flex items-center gap-2">
                  <span className="text-elec-yellow">🔍</span>
                  <span className="text-muted-foreground">
                    {reasoningSteps.find(s => s.status === 'active') 
                      ? 'Inspector analysing...' 
                      : `Analysis complete`}
                  </span>
                </div>
                {showReasoning ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </Button>
              
              {showReasoning && (
                <div className="mt-2 space-y-1">
                  {reasoningSteps.map((step, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 p-2 rounded bg-elec-dark/30 border border-elec-yellow/10 text-xs"
                    >
                      <div className="flex-shrink-0">
                        {step.status === 'active' && (
                          <Loader2 className="h-3 w-3 animate-spin text-elec-yellow" />
                        )}
                        {step.status === 'complete' && (
                          <span className="text-green-500">✓</span>
                        )}
                        {step.status === 'pending' && (
                          <div className="h-3 w-3 rounded-full border border-muted-foreground/30" />
                        )}
                      </div>
                      <span className="text-muted-foreground">
                        {step.agent === 'inspector' ? 'Inspection Specialist' : step.agent}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {messages.map((message, index) => (
            <InspectorMessage 
              key={index} 
              message={message}
              isStreaming={index === streamingMessageIndex}
            />
          ))}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex justify-start">
              <Card className="max-w-[85%] sm:max-w-[75%] p-4 bg-muted">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm text-muted-foreground">Analysing...</p>
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t p-4 sm:p-6 bg-background/50">
          <div className="flex gap-3">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about testing procedures, safety implications, or remediation..."
              className="min-h-[64px] sm:min-h-[60px] resize-none text-sm sm:text-base font-medium text-white placeholder:text-gray-400 leading-relaxed"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              size="icon"
              className="h-16 sm:h-[60px] w-14 sm:w-12 flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 sm:h-4 sm:w-4 animate-spin" />
              ) : (
                <Send className="h-5 w-5 sm:h-4 sm:w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 px-1">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
