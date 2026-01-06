
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, Info, Zap, AlertTriangle, BookOpen, Star } from 'lucide-react';
import { RegulationData } from '@/utils/regulationDatabase';

interface RegulationCardProps {
  regulation: RegulationData;
  onRelatedClick: (regNumber: string) => void;
}

const RegulationCard: React.FC<RegulationCardProps> = ({ regulation, onRelatedClick }) => {
  const partColors = {
    1: 'bg-white/5 border-white/20 text-white/70',
    4: 'bg-red-500/10 border-red-500/30 text-red-400',
    5: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    6: 'bg-green-500/10 border-green-500/30 text-green-400',
    7: 'bg-purple-500/10 border-purple-500/30 text-purple-400'
  };

  const difficultyColors = {
    beginner: 'bg-green-500/10 border-green-500/30 text-green-400',
    intermediate: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    advanced: 'bg-red-500/10 border-red-500/30 text-red-400'
  };

  const frequencyColors = {
    common: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    frequent: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    occasional: 'bg-white/5 border-white/20 text-white/70'
  };

  const FrequencyIcon = regulation.frequency === 'common' ? Star : 
                       regulation.frequency === 'frequent' ? BookOpen : Info;

  return (
    <Card className="bg-card border-border hover:border-border transition-all duration-200">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
          <div className="flex-1 min-w-0">
            {/* Badges - Stack on mobile, row on desktop */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-elec-yellow text-black font-bold text-xs sm:text-sm">
                  {regulation.number}
                </Badge>
                <Badge className={`border text-xs sm:text-sm ${partColors[regulation.part as keyof typeof partColors]}`}>
                  Part {regulation.part}
                </Badge>
                <Badge className={`border text-xs sm:text-sm ${difficultyColors[regulation.difficulty]}`}>
                  {regulation.difficulty}
                </Badge>
                <Badge className={`border text-xs sm:text-sm ${frequencyColors[regulation.frequency]} flex items-center gap-1`}>
                  <FrequencyIcon className="h-3 w-3" />
                  {regulation.frequency}
                </Badge>
              </div>
            </div>
            <CardTitle className="text-foreground text-base sm:text-lg mb-1">{regulation.title}</CardTitle>
            <CardDescription className="text-foreground/80 text-xs sm:text-sm">{regulation.section}</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto border-white/20 text-foreground hover:bg-white/10 min-h-[44px] sm:min-h-[36px]"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground flex items-center gap-2 flex-wrap">
                  <Badge className="bg-elec-yellow text-black font-bold">
                    {regulation.number}
                  </Badge>
                  <span>{regulation.title}</span>
                </DialogTitle>
                <DialogDescription className="text-foreground/80">
                  {regulation.section} - Part {regulation.part} of BS 7671
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 text-foreground">
                {/* Badge Row */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={`border ${partColors[regulation.part as keyof typeof partColors]}`}>
                    Part {regulation.part}
                  </Badge>
                  <Badge className={`border ${difficultyColors[regulation.difficulty]}`}>
                    {regulation.difficulty}
                  </Badge>
                  <Badge className={`border ${frequencyColors[regulation.frequency]} flex items-center gap-1`}>
                    <FrequencyIcon className="h-3 w-3" />
                    {regulation.frequency}
                  </Badge>
                  <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                    {regulation.category.replace('-', ' ')}
                  </Badge>
                </div>

                {/* Main Content */}
                <div className="p-4 bg-muted rounded-lg border-l-4 border-elec-yellow">
                  <h4 className="font-semibold mb-2 text-elec-yellow">Regulation Content:</h4>
                  <p className="text-white/80 leading-relaxed">{regulation.content}</p>
                </div>
                
                {/* Apprentice Note */}
                {regulation.apprenticeNote && (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-400 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Apprentice Note:
                    </h4>
                    <p className="text-white/80">{regulation.apprenticeNote}</p>
                  </div>
                )}
                
                {/* Test Method */}
                {regulation.testMethod && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <h4 className="font-semibold mb-2 text-green-400 flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Test Method:
                    </h4>
                    <p className="text-white/80">{regulation.testMethod}</p>
                  </div>
                )}
                
                {/* Safety Tip */}
                {regulation.safetyTip && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <h4 className="font-semibold mb-2 text-red-400 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Safety Tip:
                    </h4>
                    <p className="text-white/80">{regulation.safetyTip}</p>
                  </div>
                )}
                
                {/* Keywords */}
                <div>
                  <h4 className="font-semibold mb-2 text-foreground/80">Keywords:</h4>
                  <div className="flex flex-wrap gap-2">
                    {regulation.keywords.map((keyword, idx) => (
                      <Badge key={idx} variant="outline" className="border-white/20 text-foreground text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Related Regulations */}
                {regulation.relatedRegs.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground/80">Related Regulations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {regulation.relatedRegs.map((relReg, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow hover:text-black text-xs"
                          onClick={() => onRelatedClick(relReg)}
                        >
                          {relReg}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div className="p-3 sm:p-4 bg-muted rounded-lg border-l-4 border-elec-yellow">
          <p className="text-white/90 leading-relaxed text-sm sm:text-base">{regulation.content}</p>
        </div>
        
        {/* Compact info display */}
        {regulation.apprenticeNote && (
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-400 font-semibold text-xs sm:text-sm mb-1">Apprentice Note:</p>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{regulation.apprenticeNote}</p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-foreground/80 font-semibold">Keywords:</span>
          {regulation.keywords.slice(0, 4).map((keyword, idx) => (
            <Badge key={idx} variant="outline" className="text-xs border-white/20 text-foreground">
              {keyword}
            </Badge>
          ))}
          {regulation.keywords.length > 4 && (
            <Badge variant="outline" className="text-xs border-white/20 text-foreground/70">
              +{regulation.keywords.length - 4} more
            </Badge>
          )}
        </div>
        
        {regulation.relatedRegs.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-xs text-foreground/80 font-semibold">Related:</span>
            <div className="flex flex-wrap gap-2">
              {regulation.relatedRegs.slice(0, 3).map((relReg, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 px-2 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow hover:text-black"
                  onClick={() => onRelatedClick(relReg)}
                >
                  {relReg}
                </Button>
              ))}
              {regulation.relatedRegs.length > 3 && (
                <span className="text-xs text-foreground/70 self-center">+{regulation.relatedRegs.length - 3} more</span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RegulationCard;
