
export type Message = {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: Date;
  read: boolean;
};

export type Conversation = {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  type: 'private' | 'team' | 'mental-health' | 'mentor';
};
