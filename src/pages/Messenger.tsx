
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Send,
  Search, 
  User,
  Users, 
  Heart, 
  GraduationCap,
  Plus
} from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

type Message = {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: Date;
  read: boolean;
};

type Conversation = {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  type: 'private' | 'team' | 'mental-health' | 'mentor';
};

const MessengerPage = () => {
  const { profile } = useAuth();
  const { addNotification } = useNotifications();
  
  const [activeTab, setActiveTab] = useState<'private' | 'team' | 'mental-health' | 'mentor'>('private');
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
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
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation) return;
    
    const newMsg: Message = {
      id: `m${Date.now()}`,
      content: newMessage,
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
            lastMessage: newMessage,
            lastMessageTime: new Date()
          } 
        : c
    ));
    
    setNewMessage('');
    
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
  
  return (
    <div className="container max-w-7xl mx-auto py-6 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Chat with team members, mentors and support advisors.
        </p>
      </div>
      
      <div className="grid md:grid-cols-[350px_1fr] gap-6 h-[75vh]">
        {/* Left panel - Conversations List */}
        <Card className="border-elec-yellow/20 bg-elec-gray overflow-hidden flex flex-col">
          <div className="p-4 border-b border-elec-yellow/20">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="private" className="flex gap-1 items-center">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Private</span>
                </TabsTrigger>
                <TabsTrigger value="team" className="flex gap-1 items-center">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Team</span>
                </TabsTrigger>
                <TabsTrigger value="mental-health" className="flex gap-1 items-center">
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Support</span>
                </TabsTrigger>
                <TabsTrigger value="mentor" className="flex gap-1 items-center">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">Mentor</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="p-4 border-b border-elec-yellow/20">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search messages..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <p>No conversations found</p>
                <Button
                  variant="outline"
                  className="mt-4 border-elec-yellow/30 hover:bg-elec-yellow/10"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Start New Conversation
                </Button>
              </div>
            ) : (
              filteredConversations.map(conversation => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b border-elec-yellow/10 cursor-pointer ${
                    activeConversation?.id === conversation.id ? 'bg-elec-yellow/10' : 'hover:bg-elec-gray-light'
                  }`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.participantAvatar} />
                        <AvatarFallback className="bg-elec-yellow text-elec-dark">
                          {getInitials(conversation.participantName)}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-elec-yellow text-elec-dark text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{conversation.participantName}</h3>
                        {conversation.lastMessageTime && (
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(conversation.lastMessageTime, { addSuffix: true })}
                          </span>
                        )}
                      </div>
                      {conversation.lastMessage && (
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-4 border-t border-elec-yellow/20">
            <Button
              variant="outline"
              className="w-full border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
        </Card>
        
        {/* Right panel - Messages */}
        <Card className="border-elec-yellow/20 bg-elec-gray overflow-hidden flex flex-col">
          {activeConversation ? (
            <>
              {/* Conversation header */}
              <div className="p-4 border-b border-elec-yellow/20 flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={activeConversation.participantAvatar} />
                  <AvatarFallback className="bg-elec-yellow text-elec-dark">
                    {getInitials(activeConversation.participantName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeConversation.participantName}</h3>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
              
              {/* Messages area */}
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
                {messages.map(message => {
                  const isMe = message.senderId === (profile?.id || 'me');
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[75%] rounded-lg p-3 
                          ${isMe 
                            ? 'bg-elec-yellow text-elec-dark ml-auto' 
                            : 'bg-elec-gray-light'
                          }`
                        }
                      >
                        {!isMe && (
                          <p className="text-xs font-medium mb-1">{message.senderName}</p>
                        )}
                        <p className="break-words">{message.content}</p>
                        <div className={`flex items-center gap-1 mt-1 text-xs ${isMe ? 'justify-end' : ''}`}>
                          <span className={isMe ? 'text-elec-dark/70' : 'text-muted-foreground'}>
                            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                          </span>
                          {isMe && (
                            <span>{message.read ? '✓✓' : '✓'}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Message input */}
              <div className="p-4 border-t border-elec-yellow/20">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    className="min-h-10 resize-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                  />
                  <Button type="submit" className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="bg-elec-yellow/10 p-6 rounded-full mb-4">
                {getTabIcon(activeTab)}
              </div>
              <h3 className="text-lg font-medium mb-2">
                {activeTab === 'private' && 'Private Messages'}
                {activeTab === 'team' && 'Team Communication'}
                {activeTab === 'mental-health' && 'Mental Health Support'}
                {activeTab === 'mentor' && 'Mentorship Chat'}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                {activeTab === 'private' && 'Select a conversation or start a new one to send private messages to other users.'}
                {activeTab === 'team' && 'Communicate with your team members about projects, schedules and tasks.'}
                {activeTab === 'mental-health' && 'Connect with mental health professionals for support and guidance.'}
                {activeTab === 'mentor' && 'Chat with your mentors about your electrical apprenticeship progress.'}
              </p>
              <Button
                variant="outline"
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
              >
                <Plus className="mr-2 h-4 w-4" />
                {activeTab === 'private' && 'Start New Conversation'}
                {activeTab === 'team' && 'Create Team Channel'}
                {activeTab === 'mental-health' && 'Connect with Support'}
                {activeTab === 'mentor' && 'Request Mentor'}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MessengerPage;
