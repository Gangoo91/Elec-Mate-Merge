
// Utility functions for filtering and styling badges/levels

export const getLevelBadgeColor = (level: string): string => {
  switch (level) {
    case 'Apprentice':
      return 'border-blue-500 text-blue-500';
    case 'Journeyman':
      return 'border-green-500 text-green-500';
    case 'Expert':
      return 'border-purple-500 text-purple-500';
    case 'Master':
      return 'border-yellow-500 text-yellow-500';
    default:
      return 'border-gray-500 text-gray-500';
  }
};

export const getBadgeColor = (badge: string): string => {
  switch (badge) {
    case 'Beginner':
      return 'border-gray-300 text-gray-300';
    case 'Bronze':
      return 'border-amber-700 text-amber-700';
    case 'Silver':
      return 'border-gray-400 text-gray-400';
    case 'Gold':
      return 'border-yellow-500 text-yellow-500';
    case 'Platinum':
      return 'border-cyan-300 text-cyan-300';
    default:
      return 'border-gray-500 text-gray-500';
  }
};
