
// Helper functions for styling and display of leaderboard elements

export const getLevelBadgeColor = (level: string) => {
  switch(level) {
    case 'Apprentice': return 'bg-blue-500/20 text-blue-500';
    case 'Journeyman': return 'bg-green-500/20 text-green-500';
    case 'Expert': return 'bg-purple-500/20 text-purple-500';
    case 'Master': return 'bg-yellow-500/20 text-yellow-500';
    default: return 'bg-gray-500/20 text-gray-500';
  }
};

export const getBadgeColor = (badge: string) => {
  switch(badge) {
    case 'Beginner': return 'bg-blue-500/20 text-blue-500';
    case 'Intermediate': return 'bg-green-500/20 text-green-500';
    case 'Advanced': return 'bg-purple-500/20 text-purple-500';
    case 'Expert': return 'bg-yellow-500/20 text-yellow-500';
    default: return 'bg-gray-500/20 text-gray-500';
  }
};
