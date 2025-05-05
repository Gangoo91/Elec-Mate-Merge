
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { Conversation, Message } from './types';
import { User, Users, Heart, GraduationCap } from "lucide-react";

export const useMessenger = () => {
  const { profile } = useAuth();
  const { addNotification } = useNotifications();
  
  const [activeTab, setActiveTab] = useState<'private' | 'team' | 'mental-health' | 'mentor'>('private');
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
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
    {
      id: '5',
      participantId: 'mentor-1',
      participantName: 'David Williams',
      lastMessage: 'Great progress on your portfolio!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 24),
      unreadCount: 0,
      type: 'mentor'
    },
  ]);
  
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
  
  const handleSendMessage = (content: string) => {
    if (!content.trim() || !activeConversation) return;
    
    const newMsg: Message = {
      id: `m${Date.now()}`,
      content,
      senderId: profile?.id || 'me',
      senderName: profile?.full_name || 'Me',
      timestamp: new Date(),
      read: false,
    };
    
    setMessages(prev => [...prev, newMsg]);
    
    // Update conversation last message
    setConversations(prev => prev.map(c => 
      c.id === activeConversation.id 
        ? { 
            ...c, 
            lastMessage: content,
            lastMessageTime: new Date()
          } 
        : c
    ));
    
    // Simulate reply after delay
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
  };
  
  // New function to add a mentor conversation
  const addMentorConversation = ({mentorId, mentorName, mentorAvatar}: {mentorId: string, mentorName: string, mentorAvatar?: string}) => {
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
    const newConversation: Conversation = {
      id: `mentor-${Date.now()}`,
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
    
    // Create welcome message
    setMessages(prev => [
      ...prev,
      {
        id: `welcome-${newConversation.id}`,
        content: `Hi there! I'm ${mentorName}, your new mentor. Feel free to ask me any questions about your electrical apprenticeship journey.`,
        senderId: mentorId,
        senderName: mentorName,
        timestamp: new Date(),
        read: false
      }
    ]);
    
    // Switch to the mentor tab
    setActiveTab('mentor');
    
    // Notify the user
    addNotification({
      title: 'Mentor Connected',
      message: `You are now connected with ${mentorName}`,
      type: 'success'
    });
    
    return newConversation.id;
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
