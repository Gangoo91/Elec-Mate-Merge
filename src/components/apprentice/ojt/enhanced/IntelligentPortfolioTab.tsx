import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ChatMessageRenderer from './ChatMessageRenderer';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const IntelligentPortfolioTab = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const portfolioSuggestions = [
    {
      category: 'Evidence collection',
      suggestions: [
        'Take before/after photos of installations',
        'Document safety procedures followed',
        'Record testing results and measurements',
        'Note any challenges and how you overcame them',
      ],
    },
    {
      category: 'Reflection & learning',
      suggestions: [
        'Explain what you learned from each task',
        'Describe how you applied regulations',
        'Note skills you developed or improved',
        'Identify areas for future development',
      ],
    },
    {
      category: 'Professional development',
      suggestions: [
        'Link work to NVQ learning outcomes',
        'Reference relevant BS 7671 regulations',
        'Show progression in your skills',
        'Document feedback from supervisors',
      ],
    },
  ];

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: currentMessage.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: {
          message: currentMessage.trim(),
          context: 'portfolio development and apprenticeship guidance',
        },
      });

      if (error) throw error;

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I'm here to help with your portfolio development! ⚡",
        isUser: false,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Sorry, I encountered an issue. Please try again.');

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "I apologise, but I'm having trouble responding right now. Please try your question again in a moment. 🔧",
        isUser: false,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, errorMessage]);
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

  const quickQuestions = [
    'How should I document this electrical installation?',
    'What reflection should I include for testing procedures?',
    'How do I link this work to my NVQ outcomes?',
    'What evidence do I need for my portfolio assessment?',
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {portfolioSuggestions.map((section, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              {section.category}
            </span>
            <ul className="space-y-1.5">
              {section.suggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            AI portfolio assistant
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Get personalised advice on portfolio development, documentation, and reflection writing
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-96 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 overflow-y-auto">
            {chatMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <h3 className="text-[18px] font-semibold text-white mb-2">
                  Welcome to your AI portfolio assistant
                </h3>
                <p className="text-[14px] text-white/85 leading-relaxed mb-6 max-w-md">
                  Ask me anything about portfolio development, documentation, or apprenticeship
                  guidance.
                </p>
                <div className="space-y-3">
                  <p className="text-[12px] text-white/55">Try asking:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {quickQuestions.slice(0, 2).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMessage(question)}
                        className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] touch-manipulation"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
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
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 mr-4">
                      <div className="flex items-center gap-3 text-[13px] text-white/85">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-elec-yellow rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-elec-yellow rounded-full animate-bounce"
                            style={{ animationDelay: '0.1s' }}
                          />
                          <div
                            className="w-2 h-2 bg-elec-yellow rounded-full animate-bounce"
                            style={{ animationDelay: '0.2s' }}
                          />
                        </div>
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex gap-3">
            <Textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about portfolio development, documentation, or apprenticeship guidance..."
              className="flex-1 min-h-[80px] resize-none touch-manipulation text-base focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isLoading}
              className="px-6 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Quick questions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMessage(question)}
                  className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] touch-manipulation"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligentPortfolioTab;
