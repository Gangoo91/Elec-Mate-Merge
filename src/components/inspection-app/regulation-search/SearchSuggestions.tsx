import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Zap, Clock, BookOpen } from 'lucide-react';
import { getDatabaseStats } from '@/utils/regulationSearchLogic';

interface SearchSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ onSuggestionClick }) => {
  const [favorites] = useState<string[]>([
    '612.1', '612.2.1', '612.8', '411.3.3', 'Table 41.3', '701.411.3.3'
  ]);

  const popularSearches = [
    'RCD protection',
    'Zs values',
    'bathroom zones',
    'ring circuit testing',
    'insulation resistance',
    'polarity testing'
  ];

  const quickRegulations = [
    '612.1', '612.2.1', '612.3.1', '612.6', '612.8', '612.10',
    '411.3.3', '415.1.1', 'Table 41.3', '701.411.3.3'
  ];

  const recentSearches = [
    'continuity testing',
    'earth electrode',
    'MCB ratings'
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground flex items-center gap-2 text-lg">
          <Zap className="h-5 w-5 text-elec-yellow" />
          Search Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Favorites */}
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
            <Star className="h-4 w-4 text-elec-yellow" />
            Quick Regulations
          </h4>
          <div className="flex flex-wrap gap-2">
            {quickRegulations.map((reg) => (
              <Button
                key={reg}
                variant="outline"
                size="sm"
                onClick={() => onSuggestionClick(reg)}
                className="text-xs border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow hover:text-black"
              >
                {reg}
              </Button>
            ))}
          </div>
        </div>

        {/* Popular Searches */}
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-400" />
            Popular Topics
          </h4>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search) => (
              <Button
                key={search}
                variant="outline"
                size="sm"
                onClick={() => onSuggestionClick(search)}
                className="text-xs border-blue-400/30 text-blue-400 hover:bg-blue-400 hover:text-black"
              >
                {search}
              </Button>
            ))}
          </div>
        </div>

        {/* Recent */}
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-green-400" />
            Recent Searches
          </h4>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search) => (
              <Button
                key={search}
                variant="outline"
                size="sm"
                onClick={() => onSuggestionClick(search)}
                className="text-xs border-green-400/30 text-green-400 hover:bg-green-400 hover:text-black"
              >
                {search}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchSuggestions;