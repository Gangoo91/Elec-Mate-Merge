
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Conversation, Message } from './types';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { toast } from "@/components/ui/use-toast";

export const useMentorConversations = (
  conversations: Conversation[],
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  addNotification: (notification: any) => void,
  profile?: { id: string; full_name?: string }
) => {
  const [mentorDbConnections, setMentorDbConnections] = useState<{[key: string]: string}>({});

  // Fetch mentor connections from the database when the component mounts
  useEffect(() => {
    if (profile?.id) {
      fetchMentorConnections();
      setupRealtimeSubscription();
    }
    
    return () => {
      // Clean up realtime subscription
      const channel = supabase.channel('messenger-changes');
      supabase.removeChannel(channel);
    };
  }, [profile?.id]);
  
  // Setup realtime subscription for new messages
  const setupRealtimeSubscription = () => {
    const channel = supabase.channel('messenger-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'mentor_messages' }, 
        handleNewMessage
      )
      .subscribe();
        
    return () => {
      supabase.removeChannel(channel);
    };
  };
  
  // Handle new incoming messages from Supabase realtime
  const handleNewMessage = async (payload) => {
    const newMessage = payload.new;
    
    // Find corresponding conversation
    const connectionId = newMessage.connection_id;
    const conversationId = Object.keys(mentorDbConnections).find(
      id => mentorDbConnections[id] === connectionId
    );
    
    if (!conversationId) return;
    
    // Don't process our own messages (they're already added in handleSendMessage)
    if (newMessage.sender_type === 'apprentice' && newMessage.sender_id === profile?.id) {
      return;
    }
    
    // Add message to state
    const msg: Message = {
      id: newMessage.id,
      content: newMessage.content,
      senderId: newMessage.sender_id,
      senderName: '', // Will be filled based on conversation participant
      timestamp: new Date(newMessage.created_at),
      read: false,
    };
    
    // Get conversation details
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      msg.senderName = conversation.participantName;
      
      // Add message to state
      setMessages(prev => [...prev, msg]);
      
      // Update conversation last message
      setConversations(prev => prev.map(c => 
        c.id === conversationId 
          ? { 
              ...c, 
              lastMessage: newMessage.content,
              lastMessageTime: new Date(newMessage.created_at),
              unreadCount: c.id === conversationId ? (c.unreadCount || 0) + 1 : c.unreadCount
            } 
          : c
      ));
      
      // Notify the user
      addNotification({
        title: 'New Message',
        message: `New message from ${conversation.participantName}`,
        type: 'info'
      });
    }
  };

  // Fetch mentor connections from the database
  const fetchMentorConnections = async () => {
    if (!profile?.id) return;
    
    try {
      // Get mentor connections for this user
      const { data: connections, error: connectionsError } = await supabase
        .from('mentor_connections')
        .select(`
          id,
          mentor:mentors(id, name, avatar)
        `)
        .eq('apprentice_id', profile.id);
      
      if (connectionsError) throw connectionsError;
      
      if (!connections || connections.length === 0) return;
      
      // For each connection, get the last message
      const newConversations: Conversation[] = [];
      const newMentorDbConnections = {};
      
      for (const connection of connections) {
        const { data: messages, error: messagesError } = await supabase
          .from('mentor_messages')
          .select('*')
          .eq('connection_id', connection.id)
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (messagesError) continue;
        
        const lastMessage = messages && messages.length > 0 ? messages[0] : null;
        const mentor = connection.mentor;
        
        if (mentor) {
          const conversationId = `mentor-${mentor.id}`;
          
          newMentorDbConnections[conversationId] = connection.id;
          
          // Create conversation
          newConversations.push({
            id: conversationId,
            participantId: mentor.id,
            participantName: mentor.name,
            participantAvatar: mentor.avatar,
            lastMessage: lastMessage ? lastMessage.content : "Connected successfully! Send a message to start the conversation.",
            lastMessageTime: lastMessage ? new Date(lastMessage.created_at) : new Date(),
            unreadCount: 0,
            type: 'mentor'
          });
          
          // Get all messages for this connection (for when user opens the conversation)
          const { data: allMessages } = await supabase
            .from('mentor_messages')
            .select('*')
            .eq('connection_id', connection.id)
            .order('created_at', { ascending: true });
            
          if (allMessages && allMessages.length > 0) {
            const formattedMessages: Message[] = allMessages.map(msg => ({
              id: msg.id,
              content: msg.content,
              senderId: msg.sender_id,
              senderName: msg.sender_type === 'mentor' ? mentor.name : profile?.full_name || 'Me',
              timestamp: new Date(msg.created_at),
              read: true
            }));
            
            // Add to messages array
            setMessages(prev => [...prev, ...formattedMessages]);
          }
        }
      }
      
      // Update state
      setMentorDbConnections(newMentorDbConnections);
      setConversations(prev => {
        // Remove existing mentor conversations
        const filteredConversations = prev.filter(c => c.type !== 'mentor');
        // Add new mentor conversations
        return [...filteredConversations, ...newConversations];
      });
      
    } catch (error) {
      console.error("Error fetching mentor connections:", error);
    }
  };

  // Function to send a message to a mentor
  const sendMentorMessage = async (content: string, conversationId: string) => {
    const dbConnectionId = mentorDbConnections[conversationId];
    if (!dbConnectionId) return false;

    try {
      await supabase
        .from('mentor_messages')
        .insert({
          connection_id: dbConnectionId,
          sender_type: 'apprentice',
          sender_id: profile?.id,
          content: content
        });
      return true;
    } catch (error) {
      console.error("Error saving message to database:", error);
      toast({
        title: "Message Error",
        description: "Failed to save your message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    }
  };

  // Function to add a new mentor conversation
  const addMentorConversation = ({
    mentorId, 
    mentorName, 
    mentorAvatar,
    dbConnectionId
  }: {
    mentorId: string, 
    mentorName: string, 
    mentorAvatar?: string,
    dbConnectionId?: string
  }) => {
    // Check if conversation already exists
    const existingConversation = conversations.find(c => 
      c.participantId === mentorId && c.type === 'mentor'
    );
    
    if (existingConversation) {
      return existingConversation.id;
    }
    
    // Create new conversation
    const conversationId = `mentor-${mentorId}`;
    
    const newConversation: Conversation = {
      id: conversationId,
      participantId: mentorId,
      participantName: mentorName,
      participantAvatar: mentorAvatar,
      lastMessage: "Connected successfully! Send a message to start the conversation.",
      lastMessageTime: new Date(),
      unreadCount: 1,
      type: 'mentor'
    };
    
    // Add to conversations
    setConversations(prev => [newConversation, ...prev]);
    
    // Store the dbConnectionId mapping if provided
    if (dbConnectionId) {
      setMentorDbConnections(prev => ({
        ...prev,
        [conversationId]: dbConnectionId
      }));
    }
    
    // Create welcome message
    const welcomeMsg: Message = {
      id: `welcome-${conversationId}`,
      content: `Hi there! I'm ${mentorName}, your new mentor. Feel free to ask me any questions about your electrical apprenticeship journey.`,
      senderId: mentorId,
      senderName: mentorName,
      timestamp: new Date(),
      read: false
    };
    
    setMessages(prev => [...prev, welcomeMsg]);
    
    // Notify the user
    addNotification({
      title: 'Mentor Connected',
      message: `You are now connected with ${mentorName}`,
      type: 'success'
    });
    
    return conversationId;
  };

  return {
    mentorDbConnections,
    setupRealtimeSubscription,
    sendMentorMessage,
    addMentorConversation
  };
};
