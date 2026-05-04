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

const CareerGuidanceTab = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const careerPaths = [
    {
      title: 'Specialisations',
      areas: [
        'Domestic installations',
        'Commercial & industrial',
        'Control systems',
        'Renewable energy',
      ],
    },
    {
      title: 'Further qualifications',
      areas: [
        '18th Edition updates',
        'Testing & inspection',
        'Design & verification',
        'PAT testing',
      ],
    },
    {
      title: 'Career progression',
      areas: [
        'Team leader roles',
        'Electrical supervisor',
        'Contracting business',
        'Training & assessment',
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
          context: 'electrical career guidance, professional development, and industry pathways',
        },
      });

      if (error) throw error;

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I'm here to help with your career guidance!",
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
          "I apologise, but I'm having trouble responding right now. Please try your question again in a moment.",
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
    'What career paths are available after my apprenticeship?',
    'How do I specialise in renewable energy systems?',
    'What qualifications should I pursue next?',
    'How can I start my own electrical business?',
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {careerPaths.map((path, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              {path.title}
            </span>
            <ul className="space-y-1.5">
              {path.areas.map((area, idx) => (
                <li
                  key={idx}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Career guidance assistant
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Get personalised advice on career progression, specialisations, and professional
            development
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-80 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 overflow-y-auto">
            {chatMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-[14px] text-white/85 leading-relaxed mb-4">
                  Ask about career paths, specialisations, qualifications, or professional
                  development.
                </p>
                <div className="space-y-2">
                  <p className="text-[12px] text-white/55">Try asking:</p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
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
                      <div className="flex items-center gap-2 text-[13px] text-white/85">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-elec-yellow" />
                        Providing career guidance...
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex gap-2">
            <Textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about career paths, specialisations, qualifications, or professional development..."
              className="flex-1 min-h-[60px] resize-none touch-manipulation text-base focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isLoading}
              className="px-4 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-40"
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

export default CareerGuidanceTab;
