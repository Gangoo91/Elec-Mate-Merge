
import { ChatMessage } from "@/components/messenger/types";

// Get mock messages - simulating API call
export const getMockMessages = (): Promise<ChatMessage[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockMessages: ChatMessage[] = [
        {
          id: "1",
          authorId: "user1",
          authorName: "Andrew Moore",
          authorAvatar: "https://i.pravatar.cc/150?img=1",
          content: "Welcome to Elec-Mate.",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          upvotes: 0,
          category: "General",
          comments: []
        },
        {
          id: "2",
          authorId: "user3",
          authorName: "Mike Johnson",
          authorAvatar: "https://i.pravatar.cc/150?img=3",
          content: "New regulations coming into effect next month regarding residential EV charging installations. Anyone attended the webinar about it?",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
          upvotes: 8,
          category: "General",
          comments: []
        },
        {
          id: "3",
          authorId: "user4",
          authorName: "Emma Davis",
          authorAvatar: "https://i.pravatar.cc/150?img=4",
          content: "First year apprentice here. Any tips for preparing for the upcoming practical assessment?",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
          upvotes: 15,
          category: "General",
          comments: [
            {
              id: "c2",
              authorId: "user5",
              authorName: "Robert Brown",
              authorAvatar: "https://i.pravatar.cc/150?img=5",
              content: "Focus on cable sizing calculations and make sure you understand the testing procedures thoroughly.",
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
              parentId: "3"
            },
            {
              id: "c3",
              authorId: "user6",
              authorName: "Lisa Jones",
              authorAvatar: "https://i.pravatar.cc/150?img=6",
              content: "Practice your conduit bending skills! That was a key part when I did my assessment.",
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 7), // 7 hours ago
              parentId: "3"
            }
          ]
        }
      ];
      
      resolve(mockMessages);
    }, 800);
  });
};
