
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

// Get mock messages for apprentice chat
export const getApprenticeMockMessages = (): Promise<ChatMessage[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const apprenticeMockMessages: ChatMessage[] = [
        {
          id: "a1",
          authorId: "apprentice1",
          authorName: "James Wilson",
          authorAvatar: "https://i.pravatar.cc/150?img=10",
          content: "Hi everyone! Just started my apprenticeship last month. Looking forward to connecting with other apprentices!",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
          upvotes: 5,
          category: "Introductions",
          comments: []
        },
        {
          id: "a2",
          authorId: "apprentice2",
          authorName: "Sarah Martinez",
          authorAvatar: "https://i.pravatar.cc/150?img=11",
          content: "Anyone got tips for remembering all the regulations for the first year assessment? There's so much to learn!",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
          upvotes: 7,
          category: "Study",
          comments: [
            {
              id: "ac1",
              authorId: "apprentice3",
              authorName: "David Thompson",
              authorAvatar: "https://i.pravatar.cc/150?img=12",
              content: "I made flashcards with the key regulations and practiced every day. Really helped me pass!",
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
              parentId: "a2"
            }
          ]
        },
        {
          id: "a3",
          authorId: "apprentice4",
          authorName: "Alex Johnson",
          authorAvatar: "https://i.pravatar.cc/150?img=13",
          content: "Just completed my first conduit installation on site today! The journeyman said I did a great job with the bends.",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
          upvotes: 12,
          category: "Achievements",
          comments: [
            {
              id: "ac2",
              authorId: "apprentice5",
              authorName: "Michelle Lee",
              authorAvatar: "https://i.pravatar.cc/150?img=14",
              content: "That's awesome! I remember how proud I felt after my first installation. Keep it up!",
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
              parentId: "a3"
            },
            {
              id: "ac3",
              authorId: "apprentice6",
              authorName: "Ryan Garcia",
              authorAvatar: "https://i.pravatar.cc/150?img=15",
              content: "Any tips for getting clean bends? I'm still struggling with that part.",
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
              parentId: "a3"
            },
            {
              id: "ac4",
              authorId: "apprentice4",
              authorName: "Alex Johnson",
              authorAvatar: "https://i.pravatar.cc/150?img=13",
              content: "Practice with scrap pieces first and use a good quality bender. Also, mark your measurements clearly!",
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
              parentId: "a3"
            }
          ]
        }
      ];
      
      resolve(apprenticeMockMessages);
    }, 800);
  });
};
