
import { useState, useEffect } from "react";
import { ChatMessage, ChatComment } from "@/components/messenger/types";
import { getMockMessages, getApprenticeMockMessages } from "@/services/chat/mockChatService";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type ChatContext = 'general' | 'apprentice';

export const useChatMessages = (context: ChatContext = 'general') => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { profile } = useAuth();
  
  // Load initial messages from Supabase
  useEffect(() => {
    setIsLoading(true);
    
    const fetchMessages = async () => {
      // If user is logged in, fetch messages with their upvote status
      if (profile?.id) {
        const { data, error } = await supabase
          .rpc('get_chat_messages_with_upvote_status', { user_id: profile.id });
          
        if (error) {
          console.error('Error fetching messages:', error);
          // Fallback to mock data if there's an error
          useMockData();
          return;
        }
        
        // Fetch comments for each message
        if (data) {
          const messagesWithComments = await addCommentsToMessages(data);
          setMessages(messagesWithComments);
          setIsLoading(false);
        }
      } else {
        // If not logged in, fetch messages without upvote status
        const { data, error } = await supabase
          .from('global_chat_messages')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching messages:', error);
          // Fallback to mock data if there's an error
          useMockData();
          return;
        }
        
        // Fetch comments for each message
        if (data) {
          const messagesWithComments = await addCommentsToMessages(data);
          setMessages(messagesWithComments);
          setIsLoading(false);
        }
      }
    };
    
    const useMockData = async () => {
      // For apprentice context, use apprentice mock data
      // This is a fallback in case the Supabase queries fail
      let mockMessages;
      if (context === 'apprentice') {
        mockMessages = await getApprenticeMockMessages();
      } else {
        mockMessages = await getMockMessages();
      }
      setMessages(mockMessages);
      setIsLoading(false);
    };
    
    const addCommentsToMessages = async (messagesData: any[]): Promise<ChatMessage[]> => {
      const messagesWithComments: ChatMessage[] = [];
      
      for (const message of messagesData) {
        const { data: comments, error } = await supabase
          .from('global_chat_comments')
          .select('*')
          .eq('parent_id', message.id)
          .order('created_at', { ascending: true });
          
        if (error) {
          console.error('Error fetching comments:', error);
          messagesWithComments.push({
            ...message,
            comments: []
          });
        } else {
          messagesWithComments.push({
            ...message,
            comments: comments || []
          });
        }
      }
      
      return messagesWithComments;
    };
    
    fetchMessages();
    
    // Set up real-time subscription to messages
    const messagesChannel = supabase
      .channel('public:global_chat_messages')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'global_chat_messages' 
        }, 
        async (payload) => {
          // Refresh messages to include the new one
          fetchMessages();
        })
      .subscribe();
      
    // Set up real-time subscription to comments
    const commentsChannel = supabase
      .channel('public:global_chat_comments')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'global_chat_comments' 
        }, 
        async (payload) => {
          // Refresh messages to include the new comment
          fetchMessages();
        })
      .subscribe();
      
    // Set up real-time subscription to upvotes
    const upvotesChannel = supabase
      .channel('public:global_chat_upvotes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'global_chat_upvotes' 
        }, 
        async (payload) => {
          // Refresh messages to include the updated upvote count
          fetchMessages();
        })
      .subscribe();
    
    return () => {
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(commentsChannel);
      supabase.removeChannel(upvotesChannel);
    };
  }, [context, profile?.id]);

  return {
    messages,
    setMessages,
    isLoading
  };
};
