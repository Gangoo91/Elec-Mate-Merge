
import { UserBadge } from "./types";

// Get color for level badges
export const getLevelBadgeColor = (level: string): string => {
  switch(level) {
    case 'Novice': 
      return 'bg-gray-200/20 text-gray-200';
    case 'Apprentice':
      return 'bg-green-500/20 text-green-500';
    case 'Journeyman':
      return 'bg-blue-500/20 text-blue-500';
    case 'Expert':
      return 'bg-purple-500/20 text-purple-500';
    case 'Master':
      return 'bg-amber-500/20 text-amber-500';
    case 'Specialist':
      return 'bg-teal-500/20 text-teal-500';
    case 'Technician':
      return 'bg-indigo-500/20 text-indigo-500';
    case 'Engineer':
      return 'bg-rose-500/20 text-rose-500';
    case 'Senior Engineer':
      return 'bg-emerald-500/20 text-emerald-500';
    case 'Chief Engineer':
      return 'bg-yellow-500/20 text-yellow-500';
    default:
      return 'bg-gray-500/20 text-gray-500';
  }
};

// Get color for badge indicators
export const getBadgeColor = (badge: string): string => {
  switch(badge) {
    case 'Bronze': 
      return 'bg-amber-700/20 text-amber-700';
    case 'Silver':
      return 'bg-gray-300/20 text-gray-300';
    case 'Gold':
      return 'bg-yellow-500/20 text-yellow-500';
    case 'Platinum':
      return 'bg-slate-300/20 text-slate-300';
    case 'Diamond':
      return 'bg-sky-300/20 text-sky-300';
    case 'Elite':
      return 'bg-fuchsia-500/20 text-fuchsia-500';
    case 'Champion':
      return 'bg-red-500/20 text-red-500';
    case 'Innovator':
      return 'bg-cyan-500/20 text-cyan-500';
    case 'Safety Pro':
      return 'bg-orange-500/20 text-orange-500';
    case 'Regulations Expert':
      return 'bg-lime-500/20 text-lime-500';
    case 'Installation Ace':
      return 'bg-violet-500/20 text-violet-500';
    case 'Testing Guru':
      return 'bg-pink-500/20 text-pink-500';
    default:
      return 'bg-gray-500/20 text-gray-500';
  }
};
