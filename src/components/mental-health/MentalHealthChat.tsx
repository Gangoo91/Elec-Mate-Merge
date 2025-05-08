
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
  };
  timestamp: Date;
  isRead: boolean;
}

interface MentalHealthChatProps {
  maxMessages?: number;
  showViewAll?: boolean;
}

const MentalHealthChat = ({ maxMessages = 3, showViewAll = true }: MentalHealthChatProps) => {
  const { user, profile } = useAuth();
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.id) {
      fetchRecentMessages();
    } else {
      setIsLoading(false);
    }
  }, [user?.id]);
  
  const fetchRecentMessages = async () => {
    try {
      setIsLoading(true);
      
      // In a production app, this would fetch real messages from the database
      // For now, we'll simulate fetching messages with a timeout
      setTimeout(() => {
        setRecentMessages([
          {
            id: "msg1",
            content: "Remember to take breaks during intense work periods.",
            sender: {
              id: "support-1",
              name: "Mental Health Support"
            },
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
            isRead: true
          },
          {
            id: "msg2",
            content: "How are you feeling today? Would you like to chat?",
            sender: {
              id: "buddy-1",
              name: "Sarah (Mental Health Buddy)"
            },
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            isRead: false
          }
        ]);
        setIsLoading(false);
      }, 500);
      
    } catch (error) {
      console.error("Error fetching mental health messages:", error);
      setIsLoading(false);
    }
  };
  
  const handleMessageClick = (message: Message) => {
    navigate("/messages", { 
      state: { 
        activeTab: "mental-health",
        conversationId: `mental-health-${message.sender.id}` 
      }
    });
  };
  
  const goToMentalHealthChat = () => {
    navigate("/messages", { state: { activeTab: "mental-health" } });
  };
  
  return (
    <Card className="border-purple-500/20 bg-elec-gray overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500/10 to-transparent border-b border-purple-500/10 pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageCircle className="h-5 w-5 text-purple-400" />
          Mental Health Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {isLoading ? (
          <div className="text-center py-6">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-purple-500 border-t-transparent"></div>
            <p className="text-sm text-muted-foreground mt-2">Loading messages...</p>
          </div>
        ) : recentMessages.length > 0 ? (
          <div className="space-y-3">
            {recentMessages.slice(0, maxMessages).map(message => (
              <div 
                key={message.id}
                onClick={() => handleMessageClick(message)}
                className="border border-purple-500/10 rounded-lg p-3 hover:bg-purple-500/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm flex items-center gap-1">
                    {message.sender.name}
                    {!message.isRead && (
                      <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                    )}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {formatMessageTime(message.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed border-purple-500/20 rounded-lg">
            <p className="text-sm text-muted-foreground mb-3">
              No recent mental health conversations.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
              onClick={goToMentalHealthChat}
            >
              Start a Conversation
            </Button>
          </div>
        )}
        
        {showViewAll && recentMessages.length > 0 && (
          <div className="text-center pt-1">
            <Button 
              variant="link" 
              size="sm" 
              className="text-purple-400 text-xs h-auto p-0"
              onClick={goToMentalHealthChat}
            >
              View All Conversations
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Utility function to format message timestamps
const formatMessageTime = (timestamp: Date): string => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  
  // Less than a minute
  if (diff < 60 * 1000) {
    return 'Just now';
  }
  
  // Less than an hour
  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));
    return `${minutes}m ago`;
  }
  
  // Less than a day
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return `${hours}h ago`;
  }
  
  // Less than a week
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    return `${days}d ago`;
  }
  
  // Format as date
  return `${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()}`;
};

export default MentalHealthChat;
