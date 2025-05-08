
import { ChatMessage } from "@/components/messenger/types";
import { v4 as uuidv4 } from "uuid";

// This is a mock service that returns sample chat messages
// In a real application, this would be replaced with API calls to a backend

// Storage for chat messages - this allows messages to persist between components
// that use this service (electrical chat and apprentice chat)
let sharedChatMessages: ChatMessage[] = [];

// Initialize with some mock data if empty
const initializeMockData = () => {
  if (sharedChatMessages.length === 0) {
    sharedChatMessages = [
      {
        id: uuidv4(),
        authorId: "user-1",
        authorName: "John Smith",
        authorAvatar: "https://i.pravatar.cc/150?img=1",
        content: "Has anyone encountered issues with AFDDs tripping unexpectedly on circuits with LED lighting?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        upvotes: 5,
        hasUserUpvoted: false,
        comments: [
          {
            id: uuidv4(),
            authorId: "user-2",
            authorName: "Sarah Jones",
            authorAvatar: "https://i.pravatar.cc/150?img=2",
            content: "Yes, I've seen this. Often it's due to harmonic distortion from cheap LED drivers. Try using higher quality LED bulbs or drivers.",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
            parentId: "1"
          }
        ],
        category: "General"
      },
      {
        id: uuidv4(),
        authorId: "user-3",
        authorName: "Mike Wilson",
        authorAvatar: "https://i.pravatar.cc/150?img=3",
        content: "Looking for recommendations on the best crimp tools for terminal connections that won't break the bank but are still reliable.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
        upvotes: 3,
        hasUserUpvoted: false,
        comments: [],
        category: "Tools"
      },
      {
        id: uuidv4(),
        authorId: "user-4",
        authorName: "Emily Chen",
        authorAvatar: "https://i.pravatar.cc/150?img=4",
        content: "Apprentice here! Any advice on how to efficiently memorize the color codes for different types of cables? I'm struggling to remember them all.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
        upvotes: 8,
        hasUserUpvoted: false,
        comments: [
          {
            id: uuidv4(),
            authorId: "user-5",
            authorName: "David Thompson",
            authorAvatar: "https://i.pravatar.cc/150?img=5",
            content: "I used flashcards when I was starting out. Also, try creating a mnemonic for the common ones - it really helps!",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
            parentId: "3"
          },
          {
            id: uuidv4(),
            authorId: "user-6",
            authorName: "Alex Turner",
            authorAvatar: "https://i.pravatar.cc/150?img=6",
            content: "There are some good apps that test you on this too. Look for electrical training apps in the app store.",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
            parentId: "3"
          }
        ],
        category: "Training"
      },
      {
        id: uuidv4(),
        authorId: "user-7",
        authorName: "Robert Johnson",
        authorAvatar: "https://i.pravatar.cc/150?img=7",
        content: "Just completed my first three-phase installation today! Feels great to put all that training into practice.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        upvotes: 12,
        hasUserUpvoted: true,
        comments: [],
        category: "Achievement"
      }
    ];
  }
};

export const getMockMessages = async (): Promise<ChatMessage[]> => {
  initializeMockData();
  return Promise.resolve([...sharedChatMessages].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ));
};

export const addMockMessage = async (message: ChatMessage): Promise<void> => {
  initializeMockData();
  sharedChatMessages.push(message);
  return Promise.resolve();
};

export const updateMockMessage = async (messageId: string, changes: Partial<ChatMessage>): Promise<void> => {
  initializeMockData();
  const index = sharedChatMessages.findIndex(msg => msg.id === messageId);
  if (index >= 0) {
    sharedChatMessages[index] = { ...sharedChatMessages[index], ...changes };
  }
  return Promise.resolve();
};

export const deleteMockMessage = async (messageId: string): Promise<void> => {
  initializeMockData();
  sharedChatMessages = sharedChatMessages.filter(msg => msg.id !== messageId);
  return Promise.resolve();
};

export const addMockComment = async (messageId: string, comment: any): Promise<void> => {
  initializeMockData();
  const index = sharedChatMessages.findIndex(msg => msg.id === messageId);
  if (index >= 0) {
    sharedChatMessages[index].comments.push(comment);
  }
  return Promise.resolve();
};
