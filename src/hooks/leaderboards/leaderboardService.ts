
import { UserActivity, CommunityStats } from './types';
import { UserBadge } from './filters/types';

const demoLevels = [
  'Novice',
  'Apprentice',
  'Journeyman',
  'Expert',
  'Master',
  'Specialist',
  'Technician',
  'Engineer',
  'Senior Engineer',
  'Chief Engineer'
];

const demoBadges = [
  'Bronze',
  'Silver',
  'Gold',
  'Platinum',
  'Diamond',
  'Elite',
  'Champion',
  'Innovator',
  'Safety Pro',
  'Regulations Expert',
  'Installation Ace',
  'Testing Guru'
];

// Demo data for leaderboards
export const fetchLeaderboardData = async (): Promise<{
  rankings: UserActivity[];
  communityStats: CommunityStats;
  currentUserRank: UserActivity | null;
}> => {
  // In a real app, this would be an API call to fetch leaderboard data
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockRankings = generateMockLeaderboardData(30);
      const mockCommunityStats = generateMockCommunityStats();
      const mockCurrentUser = mockRankings[4]; // Use the 5th user as the current user for demo purposes
      
      resolve({
        rankings: mockRankings,
        communityStats: mockCommunityStats,
        currentUserRank: mockCurrentUser,
      });
    }, 800); // Simulate network delay
  });
};

// Function to fetch top users for the leaderboard
export const fetchTopUsers = async (): Promise<UserActivity[]> => {
  const data = await fetchLeaderboardData();
  return data.rankings;
};

// Function to fetch community stats
export const fetchCommunityStats = async (): Promise<CommunityStats> => {
  const data = await fetchLeaderboardData();
  return data.communityStats;
};

// Function to fetch the current user's rank
export const fetchCurrentUserRank = async (userId: string): Promise<UserActivity | null> => {
  const data = await fetchLeaderboardData();
  // In a real app, we would filter by the actual userId
  // For now, we'll just return the mock current user
  return data.currentUserRank;
};

// Generate mock leaderboard data
const generateMockLeaderboardData = (count: number): UserActivity[] => {
  const users: UserActivity[] = [];
  
  for (let i = 0; i < count; i++) {
    const pointsBase = 10000 - (i * 200) + Math.floor(Math.random() * 150);
    const levelIndex = Math.min(9, Math.floor(i / 3)); // Distribute levels
    const badgeIndex = Math.min(11, Math.floor(i / 3)); // Distribute badges
    
    const user: UserActivity = {
      id: `user-${i}`,
      user_id: `user-id-${i}`,
      points: pointsBase,
      level: demoLevels[levelIndex],
      badge: demoBadges[badgeIndex],
      streak: Math.floor(Math.random() * 60) + 1,
      last_active_date: new Date(Date.now() - Math.random() * 86400000 * 5).toISOString(),
      created_at: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
      updated_at: new Date().toISOString(),
      previous_position: i + (Math.random() > 0.7 ? Math.floor(Math.random() * 5) - 2 : 0),
      profiles: {
        username: `user${i}`,
        full_name: getRandomName(),
        avatar_url: i % 5 === 0 ? `https://i.pravatar.cc/150?img=${i + 10}` : undefined,
        country_code: getRandomCountryCode(),
        country: getRandomCountry(),
        is_verified: i < 5,
        bio: i < 10 ? `Electrical professional with ${Math.floor(Math.random() * 10) + 1} years of experience.` : undefined,
      },
      achievements: generateMockAchievements(Math.min(15, Math.floor(Math.random() * 8))),
      top_skills: i < 15 ? getRandomSkills() : undefined,
    };
    
    users.push(user);
  }
  
  return users;
};

// Generate mock community statistics
const generateMockCommunityStats = (): CommunityStats => {
  return {
    id: 'stats-1',
    active_users: Math.floor(Math.random() * 1500) + 500,
    lessons_completed_today: Math.floor(Math.random() * 1200) + 300,
    longest_streak: Math.floor(Math.random() * 180) + 60,
    updated_at: new Date().toISOString(),
  };
};

// Helper functions
const getRandomName = () => {
  const firstNames = ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Charlotte', 'Mia', 'Amelia', 'Harper'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Wilson', 'Anderson', 'Thomas', 'Taylor'];
  
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
};

const getRandomCountryCode = () => {
  const countryCodes = ['GB', 'US', 'CA', 'AU', 'NZ', 'IE', 'DE', 'FR', 'ES', 'IT'];
  return countryCodes[Math.floor(Math.random() * countryCodes.length)];
};

const getRandomCountry = () => {
  const countries = ['United Kingdom', 'United States', 'Canada', 'Australia', 'New Zealand', 'Ireland', 'Germany', 'France', 'Spain', 'Italy'];
  return countries[Math.floor(Math.random() * countries.length)];
};

const generateMockAchievements = (count: number) => {
  const achievements = [
    { id: 'a1', name: 'First Steps', description: 'Complete your first quiz with a score of 80% or higher', awarded_at: new Date(Date.now() - 86400000 * 30).toISOString() },
    { id: 'a2', name: 'Consistent Learner', description: 'Maintain a learning streak for 7 consecutive days', awarded_at: new Date(Date.now() - 86400000 * 25).toISOString() },
    { id: 'a3', name: 'Module Master', description: 'Complete all lessons in a module with perfect scores', awarded_at: new Date(Date.now() - 86400000 * 20).toISOString() },
    { id: 'a4', name: 'Knowledge Explorer', description: 'Access and study content from all available categories', awarded_at: new Date(Date.now() - 86400000 * 15).toISOString() },
    { id: 'a5', name: 'Early Adopter', description: 'One of the first 1,000 users to join the platform', awarded_at: new Date(Date.now() - 86400000 * 60).toISOString() },
    { id: 'a6', name: 'Lightning Fast', description: 'Complete a quiz in less than 3 minutes with 100% accuracy', awarded_at: new Date(Date.now() - 86400000 * 12).toISOString() },
    { id: 'a7', name: 'Study Marathon', description: 'Spend more than 5 hours learning in a single day', awarded_at: new Date(Date.now() - 86400000 * 8).toISOString() },
    { id: 'a8', name: 'Perfect Attendance', description: 'Log in every day for a month', awarded_at: new Date(Date.now() - 86400000 * 5).toISOString() },
    { id: 'a9', name: 'Documentation Expert', description: 'Submit 5 detailed documentation reports with proper formatting', awarded_at: new Date(Date.now() - 86400000 * 4).toISOString() },
    { id: 'a10', name: 'Safety Champion', description: 'Complete all safety case studies with perfect scores', awarded_at: new Date(Date.now() - 86400000 * 3).toISOString() },
    { id: 'a11', name: 'Calculation Wizard', description: 'Successfully complete 20 different electrical calculations', awarded_at: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: 'a12', name: 'Regulation Master', description: 'Pass the regulations assessment with at least 95% accuracy', awarded_at: new Date(Date.now() - 86400000 * 1).toISOString() },
    { id: 'a13', name: 'Mentor Support', description: 'Help 3 other apprentices solve technical problems', awarded_at: new Date(Date.now() - 86400000 * 10).toISOString() },
    { id: 'a14', name: 'Professional Development', description: 'Complete 3 professional development modules', awarded_at: new Date(Date.now() - 86400000 * 18).toISOString() },
    { id: 'a15', name: 'Community Leader', description: 'Contribute 50+ helpful responses in community forums', awarded_at: new Date(Date.now() - 86400000 * 22).toISOString() },
  ];
  
  // Shuffle and take random achievements
  return achievements
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};

const getRandomSkills = () => {
  const skills = [
    'Wiring', 'Installations', 'Code Compliance', 'Circuit Design', 'Troubleshooting', 'Safety Protocols',
    'Maintenance', 'Testing', 'Panel Building', 'Documentation', '18th Edition', 'Fault Finding'
  ];
  
  return skills
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 5) + 1);
};

// Mock function to update user activity (points)
export const updateUserActivity = async (userId: string, pointsToAdd: number = 0): Promise<UserActivity> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would be an API call to update the user's activity
      const updatedUser: UserActivity = {
        id: 'user-4',
        user_id: userId,
        points: 9200 + pointsToAdd, // Add points
        level: 'Expert',
        badge: 'Gold',
        streak: 14,
        last_active_date: new Date().toISOString(),
        created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
        updated_at: new Date().toISOString(),
        profiles: {
          username: 'currentuser',
          full_name: 'Current User',
          avatar_url: undefined,
          country_code: 'GB',
          country: 'United Kingdom',
          is_verified: true,
          bio: 'Electrical apprentice focused on gaining practical experience and knowledge.',
        },
        achievements: [
          { id: 'a1', name: 'First Steps', description: 'Complete your first quiz with a score of 80% or higher', awarded_at: new Date(Date.now() - 86400000 * 20).toISOString() },
          { id: 'a2', name: 'Consistent Learner', description: 'Maintain a learning streak for 7 consecutive days', awarded_at: new Date(Date.now() - 86400000 * 15).toISOString() },
          { id: 'a5', name: 'Early Adopter', description: 'One of the first 1,000 users to join the platform', awarded_at: new Date(Date.now() - 86400000 * 30).toISOString() },
        ],
        top_skills: ['18th Edition', 'Testing', 'Troubleshooting'],
      };
      
      resolve(updatedUser);
    }, 500); // Simulate network delay
  });
};
