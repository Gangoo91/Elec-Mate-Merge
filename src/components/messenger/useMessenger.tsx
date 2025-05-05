import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { Conversation, Message } from './types';
import { User, Users, Heart, GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const useMessenger = () => {
  const { profile } = useAuth();
  const { addNotification } = useNotifications();
  
  const [activeTab, setActiveTab] = useState<'private' | 'team' | 'mental-health' | 'mentor'>('private');
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mentorDbConnections, setMentorDbConnections] = useState<{[key: string]: string}>({});
  
  // Mock conversations
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      participantId: 'user-1',
      participantName: 'John Smith',
      lastMessage: 'Looking forward to our next session!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 2,
      type: 'private'
    },
    {
      id: '2',
      participantId: 'user-2',
      participantName: 'Sarah Jones',
      lastMessage: 'Did you finish the module?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 120),
      unreadCount: 0,
      type: 'private'
    },
    {
      id: '3',
      participantId: 'team-1',
      participantName: 'Site Team Alpha',
      lastMessage: 'Meeting at 10am tomorrow',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 360),
      unreadCount: 1,
      type: 'team'
    },
    {
      id: '4',
      participantId: 'mental-health-1',
      participantName: 'Support Advisor',
      lastMessage: 'How are you feeling today?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 24 * 2),
      unreadCount: 0,
      type: 'mental-health'
    },
  ]);
  
  // Fetch mentor conversations from the database when the component mounts
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
              unreadCount: c.id === activeConversation?.id ? 0 : (c.unreadCount || 0) + 1
            } 
          : c
      ));
      
      // Notify the user if this conversation isn't currently active
      if (activeConversation?.id !== conversationId) {
        addNotification({
          title: 'New Message',
          message: `New message from ${conversation.participantName}`,
          type: 'info'
        });
      }
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
  
  // Mock messages for active conversation
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      content: "Hi there! How's your training going?",
      senderId: 'user-1',
      senderName: 'John Smith',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      read: true
    },
    {
      id: 'm2',
      content: "It's going well, thanks for asking! I've just completed the electrical theory module.",
      senderId: profile?.id || 'me',
      senderName: profile?.full_name || 'Me',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      read: true
    },
    {
      id: 'm3',
      content: "That's great! What are you working on next?",
      senderId: 'user-1',
      senderName: 'John Smith',
      timestamp: new Date(Date.now() - 1000 * 60 * 40),
      read: true
    },
    {
      id: 'm4',
      content: "I'm going to start the practical wiring exercises this week.",
      senderId: profile?.id || 'me',
      senderName: profile?.full_name || 'Me',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: true
    },
    {
      id: 'm5',
      content: "Looking forward to our next session!",
      senderId: 'user-1',
      senderName: 'John Smith',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false
    },
  ]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as 'private' | 'team' | 'mental-health' | 'mentor');
    setActiveConversation(null);
  };
  
  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    
    // Mark conversation as read
    setConversations(prev => prev.map(c => 
      c.id === conversation.id ? { ...c, unreadCount: 0 } : c
    ));
    
    // Mark messages as read
    setMessages(prev => prev.map(m => ({ ...m, read: true })));
  };
  
  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !activeConversation) return;
    
    // Check if this is a mentor conversation
    const isMentorConversation = activeConversation.type === 'mentor';
    const dbConnectionId = isMentorConversation ? mentorDbConnections[activeConversation.id] : null;
    
    // Create message object
    const newMsg: Message = {
      id: `m${Date.now()}`,
      content,
      senderId: profile?.id || 'me',
      senderName: profile?.full_name || 'Me',
      timestamp: new Date(),
      read: false,
    };
    
    // Add to local state
    setMessages(prev => [...prev, newMsg]);
    
    // Update conversation last message in local state
    setConversations(prev => prev.map(c => 
      c.id === activeConversation.id 
        ? { 
            ...c, 
            lastMessage: content,
            lastMessageTime: new Date()
          } 
        : c
    ));
    
    // If this is a mentor conversation, save to database
    if (isMentorConversation && dbConnectionId) {
      try {
        await supabase
          .from('mentor_messages')
          .insert({
            connection_id: dbConnectionId,
            sender_type: 'apprentice',
            sender_id: profile?.id,
            content: content
          });
      } catch (error) {
        console.error("Error saving message to database:", error);
        toast({
          title: "Message Error",
          description: "Failed to save your message. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } else {
      // For non-mentor conversations, simulate reply after delay
      setTimeout(() => {
        const simulatedReply: Message = {
          id: `m${Date.now() + 1}`,
          content: "Thanks for your message! I'll get back to you soon.",
          senderId: activeConversation.participantId,
          senderName: activeConversation.participantName,
          timestamp: new Date(),
          read: false,
        };
        
        setMessages(prev => [...prev, simulatedReply]);
        
        // Update conversation
        setConversations(prev => prev.map(c => 
          c.id === activeConversation.id 
            ? { 
                ...c, 
                lastMessage: simulatedReply.content,
                lastMessageTime: new Date()
              } 
            : c
        ));
        
        addNotification({
          title: 'New Message',
          message: `New message from ${activeConversation.participantName}`,
          type: 'info'
        });
      }, 3000);
    }
  };
  
  // New function to add a mentor conversation
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
      // Switch to the mentor tab
      setActiveTab('mentor');
      
      // Select the existing conversation
      handleSelectConversation(existingConversation);
      
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
    
    // Switch to the mentor tab
    setActiveTab('mentor');
    
    // Notify the user
    addNotification({
      title: 'Mentor Connected',
      message: `You are now connected with ${mentorName}`,
      type: 'success'
    });
    
    return conversationId;
  };
  
  const filteredConversations = conversations
    .filter(c => c.type === activeTab)
    .filter(c => 
      c.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.lastMessage && c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  
  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'private': return <User className="h-4 w-4" />;
      case 'team': return <Users className="h-4 w-4" />;
      case 'mental-health': return <Heart className="h-4 w-4" />;
      case 'mentor': return <GraduationCap className="h-4 w-4" />;
      default: return null;
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return {
    activeTab,
    activeConversation,
    messages,
    searchQuery,
    filteredConversations,
    currentUserId: profile?.id || 'me',
    handleTabChange,
    setSearchQuery,
    handleSelectConversation,
    handleSendMessage,
    getTabIcon,
    getInitials,
    addMentorConversation,
  };
};
