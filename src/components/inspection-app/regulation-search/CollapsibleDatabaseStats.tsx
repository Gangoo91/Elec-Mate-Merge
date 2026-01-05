import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { getDatabaseStats } from '@/utils/regulationSearchLogic';

const CollapsibleDatabaseStats: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const databaseStats = getDatabaseStats();

  return (
    <Card className="bg-gradient-to-r from-neutral-800 to-neutral-700 border-border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-foreground">Database Coverage</h3>
            <span className="text-sm text-gray-400">({databaseStats.total} total regulations)</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-foreground"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {isExpanded ? 'Hide Details' : 'Show Details'}
          </Button>
        </div>
        
        {isExpanded && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm animate-fade-in">
            <div>
              <h4 className="text-gray-400 mb-2">By Part:</h4>
              <div className="space-y-1">
                {Object.entries(databaseStats.byPart).map(([part, count]) => (
                  <div key={part} className="flex justify-between">
                    <span className="text-gray-300">Part {part}:</span>
                    <span className="text-elec-yellow font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-gray-400 mb-2">By Difficulty:</h4>
              <div className="space-y-1">
                {Object.entries(databaseStats.byDifficulty).map(([diff, count]) => (
                  <div key={diff} className="flex justify-between">
                    <span className="text-gray-300 capitalize">{diff}:</span>
                    <span className="text-elec-yellow font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-gray-400 mb-2">By Category:</h4>
              <div className="space-y-1">
                {Object.entries(databaseStats.byCategory).slice(0, 4).map(([cat, count]) => (
                  <div key={cat} className="flex justify-between">
                    <span className="text-gray-300 capitalize">{cat.replace('-', ' ')}:</span>
                    <span className="text-elec-yellow font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-gray-400 mb-2">By Frequency:</h4>
              <div className="space-y-1">
                {Object.entries(databaseStats.byFrequency).map(([freq, count]) => (
                  <div key={freq} className="flex justify-between">
                    <span className="text-gray-300 capitalize">{freq}:</span>
                    <span className="text-elec-yellow font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CollapsibleDatabaseStats;