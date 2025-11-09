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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      let assistantContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

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
                assistantContent += token;
                
                setMessages(prev => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  
                  if (lastMessage?.role === 'assistant') {
                    newMessages[newMessages.length - 1] = {
                      role: 'assistant',
                      content: assistantContent,
                      timestamp: lastMessage.timestamp
                    };
                  } else {
                    newMessages.push({
                      role: 'assistant',
                      content: assistantContent,
                      timestamp: new Date()
                    });
                  }
                  
                  return newMessages;
                });
              }
            } catch (e) {
              // Ignore JSON parse errors
            }
          }
        }
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
    <div className="flex flex-col max-w-5xl mx-auto relative space-y-6">
      {/* Hero Section */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-3"
        >
          <Zap className="w-8 h-8 text-elec-yellow" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-elec-yellow via-elec-yellow/80 to-elec-yellow bg-clip-text text-transparent">
            AI Assistant
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          Instant answers from BS 7671:2018+A3:2024
        </motion.p>
      </div>

      {/* Premium Input Area - Now at Top */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-elec-yellow/20 via-elec-blue/20 to-elec-yellow/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
        
        <div className="relative border-2 border-border/50 rounded-2xl bg-card/80 backdrop-blur-sm p-4 shadow-xl transition-all focus-within:border-elec-yellow/50 focus-within:shadow-2xl focus-within:shadow-elec-yellow/10">
          <div className="flex gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={ROTATING_PLACEHOLDERS[placeholderIndex]}
              className="flex-1 bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground/50 min-h-[48px] max-h-[120px] text-base"
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

          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground/60">
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

      {/* Messages Container - No Scroll */}
      <div className="space-y-4 min-h-[200px]">
        <AnimatePresence mode="popLayout">

          {messages.map((message, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
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
                  <div className="max-w-[90%]">
                    <InspectorMessage
                      message={{
                        role: 'assistant',
                        content: message.content,
                        agentName: 'BS 7671 Assistant'
                      }}
                      isStreaming={isStreaming && idx === messages.length - 1}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg">
              <Loader2 className="w-4 h-4 animate-spin text-elec-yellow" />
              <span className="text-sm text-muted-foreground">
                Searching BS 7671 regulations...
              </span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Action Buttons */}
      {messages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 right-0 flex gap-2"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearConversation}
            className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </motion.div>
      )}

      {/* Category Cards - Always Visible at Bottom */}
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <CategoryCard
                {...category}
                onClick={handleSend}
              />
            </motion.div>
          ))}
        </div>

        {/* Rotating Electrical Fact */}
        <motion.div
          key={factIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm text-muted-foreground/70 text-center mt-6"
        >
          <span className="font-medium">Did you know?</span> {ELECTRICAL_FACTS[factIndex]}
        </motion.div>
      </div>
    </div>
  );
}
