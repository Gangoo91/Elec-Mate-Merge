import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardViewIcon, TableViewIcon } from "lucide-react";
import { useLeaderboardFilters } from "@/hooks/leaderboards/filters";

interface LeaderboardTabsProps {
  onViewModeChange: (viewMode: 'card' | 'table') => void;
}

const LeaderboardTabs: React.FC<LeaderboardTabsProps> = ({ onViewModeChange }) => {
  const { setTimeframe, setLevelFilter, setBadgeFilter, setViewMode, timeframe, levelFilter, badgeFilter, uniqueLevels, uniqueBadges } = useLeaderboardFilters();

  return (
    <Tabs defaultValue="weekly" className="space-y-4">
      <TabsList>
        <TabsTrigger value="weekly" onClick={() => setTimeframe('weekly')}>Weekly</TabsTrigger>
        <TabsTrigger value="monthly" onClick={() => setTimeframe('monthly')}>Monthly</TabsTrigger>
        <TabsTrigger value="alltime" onClick={() => setTimeframe('alltime')}>All Time</TabsTrigger>
      </TabsList>
      
      <div className="flex items-center space-x-2">
        <select 
          className="border rounded px-2 py-1 text-black"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
        >
          <option value="all">All Levels</option>
          {uniqueLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        
        <select
          className="border rounded px-2 py-1 text-black"
          value={badgeFilter}
          onChange={(e) => setBadgeFilter(e.target.value)}
        >
          <option value="all">All Badges</option>
          {uniqueBadges.map(badge => (
            <option key={badge} value={badge}>{badge}</option>
          ))}
        </select>
        
        <button 
          className="p-2 rounded hover:bg-gray-200"
          onClick={() => {
            setViewMode('card');
            onViewModeChange('card');
          }}
        >
          <CardViewIcon className="h-5 w-5" />
        </button>
        
        <button 
          className="p-2 rounded hover:bg-gray-200"
          onClick={() => {
            setViewMode('table');
            onViewModeChange('table');
          }}
        >
          <TableViewIcon className="h-5 w-5" />
        </button>
      </div>

      <TabsContent value="weekly">
        {/* Weekly leaderboard content */}
      </TabsContent>
      <TabsContent value="monthly">
        {/* Monthly leaderboard content */}
      </TabsContent>
      <TabsContent value="alltime">
        {/* All time leaderboard content */}
      </TabsContent>
    </Tabs>
  );
};

export default LeaderboardTabs;
