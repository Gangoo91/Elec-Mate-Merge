
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageSquare, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ChatMessageRenderer from "./ChatMessageRenderer";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const HelpBotTab = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: currentMessage.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: {
          message: currentMessage.trim(),
          context: 'general electrical apprentice guidance and support'
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

  const quickQuestions = [
    "How do I safely isolate a circuit?",
    "What PPE do I need for electrical work?",
    "How do I calculate cable sizes?",
    "What testing should I do after installation?"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-dark">
        <CardHeader className="pb-4">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-lg">
            <Bot className="h-5 w-5" />
            Help Bot Assistant
          </CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Ask me anything about electrical work, safety, or regulations
          </p>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="h-64 sm:h-80 border border-elec-gray/30 rounded-lg p-3 sm:p-4 overflow-y-auto bg-background/50">
              {chatMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-2">
                  <Bot className="h-12 w-12 text-elec-yellow mb-4" />
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    Hello! I'm here to help with your electrical questions.
                  </p>
                  <div className="space-y-3 w-full">
                    <p className="text-xs text-muted-foreground">Quick start:</p>
                    <div className="space-y-2">
                      {quickQuestions.slice(0, 2).map((question, index) => (
                        <div
                          key={index}
                          className="cursor-pointer hover:bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3 text-xs transition-colors"
                          onClick={() => setCurrentMessage(question)}
                        >
                          {question}
                        </div>
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
                      <div className="bg-elec-gray border border-elec-yellow/30 rounded-lg p-3 sm:p-4 mr-2 sm:mr-4 max-w-xs sm:max-w-sm">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                          <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-elec-yellow"></div>
                          Thinking...
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about electrical work, safety, or regulations..."
                className="flex-1 min-h-[60px] sm:min-h-[80px] resize-none text-sm border-elec-gray/30 bg-background/50"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isLoading}
                className="px-4 sm:px-6 w-full sm:w-auto bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                <Send className="h-4 w-4 mr-2 sm:mr-0" />
                <span className="sm:hidden">Send</span>
              </Button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">More questions:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickQuestions.slice(2).map((question, index) => (
                  <div
                    key={index}
                    className="cursor-pointer hover:bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-3 text-xs transition-colors text-center"
                    onClick={() => setCurrentMessage(question)}
                  >
                    {question}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpBotTab;
