
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, FileText, Upload, MessageSquare, Lightbulb, CheckCircle, AlertCircle, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ChatMessageRenderer from "./ChatMessageRenderer";

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
      category: "Evidence Collection",
      suggestions: [
        "Take before/after photos of installations",
        "Document safety procedures followed",
        "Record testing results and measurements",
        "Note any challenges and how you overcame them"
      ],
      icon: FileText,
      color: "blue"
    },
    {
      category: "Reflection & Learning",
      suggestions: [
        "Explain what you learned from each task",
        "Describe how you applied regulations",
        "Note skills you developed or improved",
        "Identify areas for future development"
      ],
      icon: Lightbulb,
      color: "yellow"
    },
    {
      category: "Professional Development",
      suggestions: [
        "Link work to NVQ learning outcomes",
        "Reference relevant BS 7671 regulations",
        "Show progression in your skills",
        "Document feedback from supervisors"
      ],
      icon: CheckCircle,
      color: "green"
    }
  ];

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
          context: 'portfolio development and apprenticeship guidance'
        }
      });

      if (error) throw error;

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I'm here to help with your portfolio development!",
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
    "How should I document this electrical installation?",
    "What reflection should I include for testing procedures?",
    "How do I link this work to my NVQ outcomes?",
    "What evidence do I need for my portfolio assessment?"
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {portfolioSuggestions.map((section, index) => (
          <Card key={index} className={`border-${section.color}-500/30 bg-gradient-to-br from-${section.color}-500/10 to-${section.color}-600/10`}>
            <CardHeader>
              <CardTitle className={`text-${section.color}-400 flex items-center gap-2`}>
                <section.icon className="h-5 w-5" />
                {section.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Portfolio Assistant
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Get personalised advice on portfolio development, documentation, and reflection writing
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-80 border rounded-lg p-4 overflow-y-auto bg-elec-gray/50 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Ask me anything about portfolio development, documentation, or apprenticeship guidance!
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
                          Thinking...
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
                placeholder="Ask about portfolio development, documentation, or apprenticeship guidance..."
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

export default IntelligentPortfolioTab;
