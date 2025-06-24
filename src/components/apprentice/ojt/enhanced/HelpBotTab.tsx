
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
      <Card className="border-elec-yellow/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Help Bot Assistant
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Ask me anything about electrical work, safety, regulations, or your apprenticeship journey
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-80 border rounded-lg p-4 overflow-y-auto bg-elec-gray/50">
              {chatMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Hello! I'm your electrical apprentice help bot. Ask me anything about electrical work, safety, or your training!
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Try asking:</p>
                    {quickQuestions.slice(0, 2).map((question, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-elec-yellow/20 text-xs"
                        onClick={() => setCurrentMessage(question)}
                      >
                        {question}
                      </Badge>
                    ))}
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
                      <div className="bg-elec-gray border border-gray-700 rounded-lg p-4 mr-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-elec-yellow"></div>
                          Thinking about your question...
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
                placeholder="Ask me about electrical work, safety, regulations, or anything else..."
                className="flex-1 min-h-[60px] resize-none"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isLoading}
                className="px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <p className="text-xs text-muted-foreground w-full mb-2">Quick questions:</p>
              {quickQuestions.map((question, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-elec-yellow/20 text-xs"
                  onClick={() => setCurrentMessage(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpBotTab;
