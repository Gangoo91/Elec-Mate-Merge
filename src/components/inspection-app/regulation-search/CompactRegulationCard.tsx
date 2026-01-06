import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, Info, Zap, AlertTriangle, BookOpen, Star } from 'lucide-react';
import { RegulationData } from '@/utils/regulationDatabase';

interface CompactRegulationCardProps {
  regulation: RegulationData;
  onRelatedClick: (regNumber: string) => void;
}

const CompactRegulationCard: React.FC<CompactRegulationCardProps> = ({ regulation, onRelatedClick }) => {
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
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          {/* Left side - Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge className="bg-elec-yellow text-black font-bold text-xs">
                {regulation.number}
              </Badge>
              <Badge className={`border text-xs ${partColors[regulation.part as keyof typeof partColors]}`}>
                Part {regulation.part}
              </Badge>
              <Badge className={`border text-xs ${difficultyColors[regulation.difficulty]}`}>
                {regulation.difficulty}
              </Badge>
              <Badge className={`border text-xs ${frequencyColors[regulation.frequency]} flex items-center gap-1`}>
                <FrequencyIcon className="h-3 w-3" />
                {regulation.frequency}
              </Badge>
            </div>
            
            <h3 className="text-foreground font-semibold text-sm mb-1 leading-tight">{regulation.title}</h3>
            <p className="text-white/70 text-xs mb-2">{regulation.section}</p>
            
            <div className="p-2 bg-muted rounded border-l-2 border-elec-yellow">
              <p className="text-white/80 text-xs leading-relaxed line-clamp-2">{regulation.content}</p>
            </div>
            
            {/* Compact footer info */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              {regulation.keywords.slice(0, 3).map((keyword, idx) => (
                <Badge key={idx} variant="outline" className="text-xs border-white/20 text-white/80 h-5">
                  {keyword}
                </Badge>
              ))}
              {regulation.keywords.length > 3 && (
                <span className="text-white/70">+{regulation.keywords.length - 3}</span>
              )}
              {regulation.relatedRegs.length > 0 && (
                <span className="text-white/70 ml-2">• {regulation.relatedRegs.length} related</span>
              )}
            </div>
          </div>
          
          {/* Right side - Action button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white/80 hover:bg-white/10 shrink-0"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View
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
                <DialogDescription className="text-white/70">
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
                  <h4 className="font-semibold mb-2 text-white/70">Keywords:</h4>
                  <div className="flex flex-wrap gap-2">
                    {regulation.keywords.map((keyword, idx) => (
                      <Badge key={idx} variant="outline" className="border-white/20 text-white/80 text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Related Regulations */}
                {regulation.relatedRegs.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-white/70">Related Regulations:</h4>
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
      </CardContent>
    </Card>
  );
};

export default CompactRegulationCard;