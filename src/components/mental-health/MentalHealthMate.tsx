
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, UserPlus, Users, Bot, Send, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Textarea } from "@/components/ui/textarea";

interface MentalHealthMateProps {
  onBecomeMate?: () => void;
}

const MentalHealthMate = ({ onBecomeMate }: MentalHealthMateProps) => {
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, type: 'user' | 'ai', content: string}>>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleBecomeMate = () => {
    setIsVolunteer(true);
    toast.success("Thank you for becoming a Mental Health Mate!", {
      description: "You are now available to help others in need.",
    });
    
    if (onBecomeMate) {
      onBecomeMate();
    }
  };

  const handleAIChat = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: inputMessage
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    // Simulate AI response for now
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: generateAIResponse(inputMessage)
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (message: string) => {
    const responses = [
      "I understand you're going through a challenging time. Remember that seeking support is a sign of strength, not weakness. In the electrical industry, we look out for each other.",
      "Work-related stress is common in our industry. Consider taking regular breaks, talking to your supervisor about workload, and remember that your wellbeing comes first.",
      "It sounds like you're dealing with pressure. Have you considered speaking with a Mental Health First Aider at your workplace or contacting the Construction Industry Helpline?",
      "Your feelings are valid. The electrical industry can be demanding, but there are resources available. Would you like me to suggest some specific support options?",
      "Thank you for sharing. Remember, you're not alone in this. Many electricians face similar challenges, and there's no shame in asking for help."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const availableMates = [
    { id: "1", name: "Sarah Thompson", role: "Journeyman Electrician", status: "Available" },
    { id: "2", name: "Michael Chen", role: "Master Electrician", status: "Available" },
    { id: "3", name: "James Wilson", role: "Apprentice", status: "Busy" },
  ];

  return (
    <Card className="border-purple-500/40 bg-gradient-to-br from-purple-500/10 to-elec-gray shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-500/20 to-transparent border-b border-purple-500/20 pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Users className="h-6 w-6 text-purple-400" />
          Mental Health Mate
          <div className="ml-auto flex gap-2">
            <Button
              onClick={() => setShowAIChat(!showAIChat)}
              className="bg-purple-500 hover:bg-purple-600 text-white"
              size="sm"
            >
              <Bot className="h-4 w-4 mr-2" />
              AI Support Chat
            </Button>
          </div>
        </CardTitle>
        <CardDescription className="text-sm">
          Get immediate AI-powered mental health support or connect with volunteer peer supporters
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* AI Chat Interface */}
        {showAIChat && (
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="h-5 w-5 text-purple-400" />
              <h3 className="font-semibold">AI Mental Health Support</h3>
            </div>
            
            <div className="max-h-64 overflow-y-auto space-y-3 mb-4">
              {chatMessages.length === 0 && (
                <div className="text-sm text-muted-foreground p-3 bg-purple-500/5 rounded">
                  <p className="font-medium mb-2">Hello! I'm your AI Mental Health Mate.</p>
                  <p>I'm here to provide support, guidance, and resources specifically for electrical industry professionals. You can ask me about stress, work pressures, or any mental health concerns you might have.</p>
                </div>
              )}
              
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-elec-yellow/20 ml-8 text-right'
                      : 'bg-purple-500/10 mr-8'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'ai' && <Bot className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="bg-purple-500/10 mr-8 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 text-purple-400 animate-spin" />
                    <p className="text-sm">AI is thinking...</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Share what's on your mind... I'm here to help."
                className="flex-1 min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAIChat();
                  }
                }}
              />
              <Button
                onClick={handleAIChat}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Volunteer Section */}
        {!isVolunteer ? (
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4 text-center space-y-4">
            <UserPlus className="h-10 w-10 text-purple-400 mx-auto" />
            <h3 className="font-semibold text-lg">Become a Mental Health Mate</h3>
            <p className="text-sm text-muted-foreground">
              Volunteer to provide peer support for fellow electrical professionals who need someone to talk to
            </p>
            <Button 
              onClick={handleBecomeMate}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              Sign Up as a Volunteer
            </Button>
          </div>
        ) : (
          <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 text-center space-y-3">
            <div className="w-4 h-4 bg-green-500 rounded-full mx-auto animate-pulse" />
            <h3 className="font-semibold text-lg">You're a Mental Health Mate</h3>
            <p className="text-sm text-muted-foreground">
              Thank you for volunteering! Others can now reach out to you for support.
            </p>
          </div>
        )}
        
        {/* Available Mates */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Connect with Mental Health Mates
          </h3>
          
          <div className="space-y-2">
            {availableMates.map(mate => (
              <div 
                key={mate.id}
                className="flex items-center justify-between border border-purple-500/20 rounded-lg p-3 hover:bg-purple-500/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${mate.status === "Available" ? "bg-green-500" : "bg-amber-500"}`} />
                  <div>
                    <p className="font-medium text-sm">{mate.name}</p>
                    <p className="text-xs text-muted-foreground">{mate.role}</p>
                  </div>
                </div>
                
                <Link to={`/messages?contact=${mate.id}`}>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <MessageCircle className="h-3 w-3" />
                    Message
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center pt-2">
            <Link to="/messages">
              <Button variant="link" size="sm" className="text-purple-400">
                View All Mental Health Mates
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentalHealthMate;
