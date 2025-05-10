
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { Conversation, Message } from './types';
import { MESSAGE_SIMULATION_DELAY, MessengerTabType } from './constants';
import { useMentorConversations } from './useMentorConversations';
import { useConversationUtils } from './useConversationUtils';

export const useMessenger = () => {
  const { profile } = useAuth();
  const { addNotification } = useNotifications();
  
  const [activeTab, setActiveTab] = useState<MessengerTabType>('private');
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

  // Import utility functions
  const { getTabIcon, getInitials } = useConversationUtils();
  
  // Import mentor conversation functionality 
  const { mentorDbConnections, sendMentorMessage, addMentorConversation } = useMentorConversations(
    conversations, 
    setConversations, 
    setMessages, 
    addNotification,
    profile
  );
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as MessengerTabType);
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
    if (isMentorConversation) {
      await sendMentorMessage(content, activeConversation.id);
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
                lastMessageTime: new Date(),
                unreadCount: activeConversation === c ? 0 : c.unreadCount + 1
              } 
            : c
        ));
        
        addNotification({
          title: 'New Message',
          message: `New message from ${activeConversation.participantName}`,
          type: 'info'
        });
      }, MESSAGE_SIMULATION_DELAY);
    }
  };
  
  const filteredConversations = conversations
    .filter(c => c.type === activeTab)
    .filter(c => 
      c.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.lastMessage && c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  
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
