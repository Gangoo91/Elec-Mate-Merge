
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, MessageSquare, Send, TrendingUp, Briefcase, GraduationCap, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ChatMessageRenderer from "./ChatMessageRenderer";

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
      title: "Specialisations",
      areas: [
        "Domestic installations",
        "Commercial & industrial",
        "Control systems",
        "Renewable energy"
      ],
      icon: Briefcase,
      color: "blue"
    },
    {
      title: "Further Qualifications",
      areas: [
        "18th Edition updates",
        "Testing & inspection",
        "Design & verification",
        "PAT testing"
      ],
      icon: GraduationCap,
      color: "green"
    },
    {
      title: "Career Progression",
      areas: [
        "Team leader roles",
        "Electrical supervisor",
        "Contracting business",
        "Training & assessment"
      ],
      icon: TrendingUp,
      color: "purple"
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
          context: 'electrical career guidance, professional development, and industry pathways'
        }
      });

      if (error) throw error;

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I'm here to help with your career guidance!",
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
    "What career paths are available after my apprenticeship?",
    "How do I specialise in renewable energy systems?",
    "What qualifications should I pursue next?",
    "How can I start my own electrical business?"
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {careerPaths.map((path, index) => (
          <Card key={index} className={`border-${path.color}-500/30 bg-gradient-to-br from-${path.color}-500/10 to-${path.color}-600/10`}>
            <CardHeader>
              <CardTitle className={`text-${path.color}-400 flex items-center gap-2 text-lg`}>
                <path.icon className="h-5 w-5" />
                {path.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {path.areas.map((area, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <Award className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                    {area}
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
            <User className="h-5 w-5" />
            Career Guidance Assistant
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Get personalised advice on career progression, specialisations, and professional development
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-80 border rounded-lg p-4 overflow-y-auto bg-elec-gray/50">
              {chatMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Ask me about career paths, specialisations, qualifications, or professional development!
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

export default CareerGuidanceTab;
