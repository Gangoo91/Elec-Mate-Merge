import { CheckCircle, AlertCircle, HelpCircle, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const EmergencyLightingQuickCheck2_1 = () => {
  const [revealedItems, setRevealedItems] = useState<{ [key: number]: boolean }>({});
  const [showAll, setShowAll] = useState(false);

  const checkItems = [
    {
      type: 'correct' as const,
      text: 'Escape routes have minimum 1 lux horizontal illuminance',
      explanation: 'BS 5266-1 requires minimum 1 lux horizontal illuminance at floor level on the centre line of escape routes.'
    },
    {
      type: 'correct' as const, 
      text: 'Luminaires positioned at maximum 2m intervals along escape routes',
      explanation: 'Proper spacing ensures no dark spots exist along escape routes, maintaining continuous illumination.'
    },
    {
      type: 'correct' as const,
      text: 'All exit doors and changes of direction are illuminated',
      explanation: 'Exit doors require specific illumination to ensure they are clearly visible during an emergency evacuation.'
    },
    {
      type: 'incorrect' as const,
      text: 'Emergency lighting only needed at final exits',
      explanation: 'Incorrect - Emergency lighting must illuminate the entire escape route, not just final exits.'
    },
    {
      type: 'correct' as const,
      text: 'Uniformity ratio not exceeding 40:1 maintained throughout',
      explanation: 'The ratio between maximum and minimum illuminance levels ensures even lighting distribution.'
    },
    {
      type: 'incorrect' as const,
      text: 'Mounting height not considered for spacing calculations',
      explanation: 'Incorrect - Mounting height is crucial for proper spacing calculations and light distribution.'
    }
  ];

  const handleItemClick = (index: number) => {
    if (!showAll) {
      setRevealedItems(prev => ({
        ...prev,
        [index]: !prev[index]
      }));
    }
  };

  const handleShowAll = () => {
    setShowAll(true);
    const allRevealed = checkItems.reduce((acc, _, index) => {
      acc[index] = true;
      return acc;
    }, {} as { [key: number]: boolean });
    setRevealedItems(allRevealed);
  };

  const handleReset = () => {
    setRevealedItems({});
    setShowAll(false);
  };

  const revealedCount = Object.keys(revealedItems).length;
  const correctCount = checkItems.filter((item, index) => 
    revealedItems[index] && item.type === 'correct'
  ).length;

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Interactive Knowledge Check
        </CardTitle>
        <p className="text-sm text-gray-400 mt-2">
          Click each statement to reveal if it's correct or incorrect. Test your knowledge!
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {checkItems.map((item, index) => {
            const isRevealed = revealedItems[index] || showAll;
            return (
              <div 
                key={index} 
                onClick={() => handleItemClick(index)}
                className={`group relative cursor-pointer transition-all duration-300 ${
                  !isRevealed ? 'hover:scale-[1.02]' : ''
                }`}
              >
                <div className={`flex items-start gap-3 p-4 rounded-lg border transition-all duration-300 ${
                  !isRevealed 
                    ? 'bg-elec-dark/50 border-gray-600/50 hover:border-elec-yellow/50 hover:bg-elec-dark/70' 
                    : item.type === 'correct'
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <div className="flex-shrink-0 mt-0.5">
                    {!isRevealed ? (
                      <HelpCircle className="h-5 w-5 text-gray-400 group-hover:text-elec-yellow transition-colors" />
                    ) : item.type === 'correct' ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className={`text-sm block ${
                      !isRevealed 
                        ? 'text-gray-300 group-hover:text-foreground' 
                        : item.type === 'correct' 
                          ? 'text-gray-200' 
                          : 'text-red-200'
                    } transition-colors`}>
                      {item.text}
                    </span>
                    {isRevealed && (
                      <div className="mt-3 pt-3 border-t border-gray-600/50">
                        <p className="text-xs text-gray-400">
                          {item.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {!isRevealed ? (
                      <Badge variant="outline" className="text-xs bg-gray-700/50 text-gray-400 border-gray-600">
                        Click to reveal
                      </Badge>
                    ) : (
                      <Badge 
                        variant={item.type === 'correct' ? 'secondary' : 'destructive'}
                        className={`text-xs ${
                          item.type === 'correct' 
                            ? 'bg-green-600/20 text-green-400 border-green-600/30' 
                            : 'bg-red-600/20 text-red-400 border-red-600/30'
                        }`}
                      >
                        {item.type === 'correct' ? 'Correct' : 'Incorrect'}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Control Buttons */}
        <div className="mt-6 flex gap-3 justify-center">
          {!showAll && (
            <Button 
              onClick={handleShowAll}
              variant="outline"
              className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 hover:bg-elec-yellow/20"
            >
              Reveal All Answers
            </Button>
          )}
          {(revealedCount > 0 || showAll) && (
            <Button 
              onClick={handleReset}
              variant="outline"
              className="bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-700"
            >
              Reset Quiz
            </Button>
          )}
        </div>

        {/* Progress Indicator */}
        {revealedCount > 0 && !showAll && (
          <div className="mt-4 text-center">
            <Badge className="bg-elec-yellow/20 text-elec-yellow">
              Progress: {revealedCount}/{checkItems.length} • Score: {correctCount}/{revealedCount}
            </Badge>
          </div>
        )}

        {/* Final Score */}
        {showAll && (
          <div className="mt-4 text-center">
            <Badge className="bg-elec-yellow/20 text-elec-yellow text-sm px-4 py-2">
              Final Score: {correctCount}/{checkItems.length} ({Math.round((correctCount/checkItems.length)*100)}%)
            </Badge>
          </div>
        )}

        <div className="mt-6 p-4 bg-elec-dark rounded-lg border border-gray-600">
          <p className="text-sm text-gray-400">
            <strong className="text-elec-yellow">Quick Tip:</strong> Remember that escape lighting must provide a clear, 
            well-illuminated path from any point in the building to a place of safety. The key is ensuring adequate 
            illumination levels and proper spacing to prevent dark spots along escape routes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};