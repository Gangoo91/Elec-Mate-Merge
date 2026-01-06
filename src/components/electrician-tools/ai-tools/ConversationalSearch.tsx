import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Shield, Ruler, Building2, ClipboardCheck, Sparkles, Zap, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { InspectorMessage } from './InspectorMessage';
import CategoryCard from './CategoryCard';
import { Button } from '@/components/ui/button';

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

const ELECTRICAL_FACTS = [
  '💡 BS 7671:2018+A3:2024 contains over 600 regulations',
  '⚡ RCDs must trip within 40ms for additional protection',
  '🔌 Maximum voltage drop: 3% for lighting, 5% for other uses',
  '🏠 Bathroom zones determine IPX4/IPX5 requirements',
  '🔧 Periodic inspection recommended every 5-10 years',
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
  const [charCount, setCharCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Token batching for smooth streaming with setInterval
  const tokenBufferRef = useRef('');
  const assistantContentRef = useRef('');
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  const scrollToBottom = (instant?: boolean) => {
    messagesEndRef.current?.scrollIntoView({ behavior: instant ? 'instant' : 'smooth', block: 'end' });
  };

  useEffect(() => {
    if (!isStreaming) {
      scrollToBottom();
    }
  }, [messages, isStreaming]);

  const handleSend = async (queryText?: string) => {
    const messageText = queryText || input.trim();
    
    if (!messageText) return;

    const userMessage: Message = { 
      role: 'user', 
      content: messageText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setCharCount(0);
    setIsSearching(true);
    setIsStreaming(true);

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
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsSearching(false);

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buffer = '';
      assistantContentRef.current = '';
      tokenBufferRef.current = '';

      // Start interval for batched updates (~5 updates per second for smoother streaming)
      updateIntervalRef.current = setInterval(() => {
        if (tokenBufferRef.current) {
          assistantContentRef.current += tokenBufferRef.current;
          tokenBufferRef.current = '';
          
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            
            if (lastMessage?.role === 'assistant') {
              newMessages[newMessages.length - 1] = {
                role: 'assistant',
                content: assistantContentRef.current,
                timestamp: lastMessage.timestamp
              };
            } else {
              newMessages.push({
                role: 'assistant',
                content: assistantContentRef.current,
                timestamp: new Date()
              });
            }
            
            return newMessages;
          });
          
          // Use instant scroll during streaming
          scrollToBottom(true);
        }
      }, 200); // Update every 200ms = 5 updates per second

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          // Stop interval and flush any remaining tokens
          if (updateIntervalRef.current) {
            clearInterval(updateIntervalRef.current);
            updateIntervalRef.current = null;
          }
          
          // Final flush
          if (tokenBufferRef.current) {
            assistantContentRef.current += tokenBufferRef.current;
            tokenBufferRef.current = '';
          }
          
          // Extract follow-up questions from final content
          const followUpMatch = assistantContentRef.current.match(/---FOLLOWUP---([\s\S]*?)---END_FOLLOWUP---/);
          if (followUpMatch) {
            const questions = followUpMatch[1]
              .trim()
              .split('\n')
              .map(q => q.replace(/^[•\-*]\s*/, '').trim())
              .filter(q => q.length > 0 && q.endsWith('?'));
            
            // Remove follow-up section from displayed content
            assistantContentRef.current = assistantContentRef.current.replace(/---FOLLOWUP---[\s\S]*?---END_FOLLOWUP---/g, '').trim();
            
            // Update last message with follow-ups and cleaned content
            setMessages(prev => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              if (lastMessage?.role === 'assistant') {
                lastMessage.followUpQuestions = questions;
                lastMessage.content = assistantContentRef.current;
              }
              return newMessages;
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
              const token = parsed.choices?.[0]?.delta?.content;
              
              if (token) {
                // Simply accumulate tokens - interval will handle updates
                tokenBufferRef.current += token;
              }
            } catch (e) {
              // Ignore JSON parse errors
            }
          }
        }
      }
      
      // Cleanup interval
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
        updateIntervalRef.current = null;
      }

    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
        return;
      }
      
      console.error('Error calling conversational search:', error);
      toast.error('Failed to get response', {
        description: error.message
      });
      
      setMessages(prev => prev.slice(0, -1));
    } finally {
      // Cleanup interval if still running
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
        updateIntervalRef.current = null;
      }
      setIsStreaming(false);
      setIsSearching(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearConversation = () => {
    if (messages.length === 0) return;
    
    if (confirm('Clear conversation history?')) {
      setMessages([]);
      toast.success('Conversation cleared');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInput(text);
    setCharCount(text.length);
  };

  return (
    <div className="flex flex-col h-screen max-w-6xl mx-auto relative pb-safe overflow-y-auto">
      {/* Empty State - Hero & Categories (only show when no messages) */}
      {messages.length === 0 && (
        <div className="flex-1 px-4 md:px-6 py-4 space-y-8">
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
              💡 <span className="font-medium">Did you know?</span> {ELECTRICAL_FACTS[factIndex]}
            </p>
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
      )}

      {/* Active State - Messages Container (only show if messages exist) */}
      {messages.length > 0 && (
        <div className="flex-1 px-4 md:px-6 py-4 space-y-4">
          <AnimatePresence>
            {messages.map((message, idx) => {
              const isCurrentlyStreaming = isStreaming && idx === messages.length - 1;
              return (
              <motion.div
                key={idx}
                initial={isCurrentlyStreaming ? false : { opacity: 0, x: message.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {message.role === 'user' ? (
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-gradient-to-br from-elec-yellow to-elec-yellow/90 text-elec-dark shadow-lg shadow-elec-yellow/20">
                      <div className="whitespace-pre-wrap break-words font-medium">
                        {message.content}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start">
                    <div className="max-w-[90%] space-y-3">
                      <InspectorMessage
                        message={{
                          role: 'assistant',
                          content: message.content,
                          agentName: 'BS 7671 Assistant'
                        }}
                        isStreaming={isStreaming && idx === messages.length - 1}
                      />
                      
                      {/* Follow-up Question Pills */}
                      {message.followUpQuestions && message.followUpQuestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="space-y-2"
                        >
                          <div className="flex items-center gap-2 text-xs text-foreground/60">
                            <Sparkles className="w-3 h-3" />
                            <span>You might also ask:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {message.followUpQuestions.map((question, qIdx) => (
                              <motion.button
                                key={qIdx}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                  setInput(question);
                                  inputRef.current?.focus();
                                }}
                                className="text-xs px-3 py-2 rounded-lg bg-gradient-to-r from-elec-blue/20 to-elec-yellow/20 border border-elec-yellow/30 text-foreground/90 hover:border-elec-yellow/60 hover:bg-elec-yellow/10 transition-all text-left"
                              >
                                💡 {question}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            );})}
          </AnimatePresence>

          {isSearching && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Loader2 className="w-4 h-4 animate-spin text-elec-yellow" />
                  <span className="text-sm font-medium">Searching knowledge bases...</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400">BS 7671 Regulations</span>
                  <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-400">Practical Guides</span>
                  <span className="px-2 py-1 rounded-md bg-purple-500/10 text-purple-400">Design Knowledge</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Premium Input Area - STICKY AT BOTTOM */}
      <div className="sticky bottom-0 z-20 px-4 md:px-6 pb-4 pt-2 bg-gradient-to-t from-elec-dark via-elec-dark to-transparent backdrop-blur-lg border-t border-border/30">
        {/* Conversation continuity indicator with inline clear */}
        {messages.length > 0 && (
          <div className="flex items-center justify-between text-xs text-foreground/50 mb-2">
            <span>💬 Continuing conversation • Ask follow-up questions</span>
            <button
              onClick={handleClearConversation}
              className="text-foreground/40 hover:text-destructive transition-colors p-1 -mr-1"
              title="Clear conversation"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-elec-yellow/20 via-elec-blue/20 to-elec-yellow/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          
          <div className="relative border-2 border-border/50 rounded-2xl bg-card/80 backdrop-blur-sm p-3 md:p-4 shadow-xl transition-all focus-within:border-elec-yellow/50 focus-within:shadow-2xl focus-within:shadow-elec-yellow/10">
            <div className="flex gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={ROTATING_PLACEHOLDERS[placeholderIndex]}
                className="flex-1 bg-transparent border-none outline-none resize-none text-foreground placeholder:text-foreground/40 min-h-[48px] max-h-[120px] text-base"
                disabled={isStreaming}
                rows={1}
                style={{ fontSize: '16px' }}
              />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend()}
                disabled={!input.trim() || isStreaming}
                className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-elec-yellow to-elec-yellow/90 hover:from-elec-yellow/90 hover:to-elec-yellow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-elec-yellow/30 transition-all disabled:shadow-none"
              >
                {isStreaming ? (
                  <Loader2 className="w-5 h-5 animate-spin text-elec-dark" />
                ) : (
                  <Send className="w-5 h-5 text-elec-dark" />
                )}
              </motion.button>
            </div>

            <div className="flex items-center justify-between mt-2 text-xs text-foreground/50">
              <span>Press Enter to send, Shift+Enter for new line</span>
              {charCount > 0 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={charCount > 1800 ? 'text-orange-500' : ''}
                >
                  {charCount}/2000
                </motion.span>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}