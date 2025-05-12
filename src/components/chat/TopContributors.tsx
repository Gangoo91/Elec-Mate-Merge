
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Contributor {
  id: string;
  name: string;
  avatar: string | null;
  points: number;
  badge: 'gold' | 'silver' | 'bronze' | 'regular';
}

const TopContributors = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  
  useEffect(() => {
    // In a real app, this would fetch from the API
    // For now, we'll use mock data
    const mockContributors: Contributor[] = [
      {
        id: '1',
        name: 'David Thompson',
        avatar: null,
        points: 256,
        badge: 'gold'
      },
      {
        id: '2',
        name: 'Sarah Wilson',
        avatar: null,
        points: 198,
        badge: 'silver'
      },
      {
        id: '3',
        name: 'Michael Brown',
        avatar: null,
        points: 172,
        badge: 'bronze'
      },
      {
        id: '4',
        name: 'Lisa Roberts',
        avatar: null,
        points: 145,
        badge: 'regular'
      },
      {
        id: '5',
        name: 'John Smith',
        avatar: null,
        points: 122,
        badge: 'regular'
      }
    ];
    
    setContributors(mockContributors);
  }, []);
  
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'gold': return 'bg-yellow-500 text-black';
      case 'silver': return 'bg-gray-300 text-black';
      case 'bronze': return 'bg-amber-700 text-white';
      default: return 'bg-zinc-700 text-white';
    }
  };
  
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Top Contributors</h3>
      
      <div className="space-y-3">
        {contributors.map((contributor) => (
          <div key={contributor.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border border-yellow-500/30">
                <AvatarImage src={contributor.avatar || undefined} />
                <AvatarFallback className="bg-zinc-800 text-sm font-medium">
                  {getInitials(contributor.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-white">{contributor.name}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{contributor.points} pts</span>
              {contributor.badge !== 'regular' && (
                <Badge variant="outline" className={`${getBadgeColor(contributor.badge)} text-xs px-1.5 py-0`}>
                  {contributor.badge}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-2 text-center">
        <a href="#" className="text-yellow-500 text-xs hover:underline">
          View All Rankings
        </a>
      </div>
    </div>
  );
};

export default TopContributors;
