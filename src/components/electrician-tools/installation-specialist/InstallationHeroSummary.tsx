import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Wrench, ShieldCheck, GraduationCap, MapPin, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSummaryProps {
  steps: number;
  duration: string;
  riskLevel: 'low' | 'medium' | 'high';
  toolsCount: number;
  hazardsCount: number;
  competency?: {
    competencyRequirements?: string;
    trainingRequired?: string;
  };
  siteLogistics?: {
    vehicleAccess?: string;
    restrictions?: string[];
  };
}

const riskColors = {
  low: 'bg-success/20 text-success border-success/40',
  medium: 'bg-warning/20 text-warning border-warning/40',
  high: 'bg-destructive/20 text-destructive border-destructive/40'
};

export const InstallationHeroSummary = ({
  steps,
  duration,
  riskLevel,
  toolsCount,
  hazardsCount,
  competency,
  siteLogistics
}: HeroSummaryProps) => {
  const [currentCard, setCurrentCard] = useState(0);
  
  const cards = [
    {
      title: "Overview",
      icon: CheckCircle2,
      content: (
        <div className="grid grid-cols-2 gap-5">
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-primary/10 to-transparent hover:from-primary/20 transition-all">
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-elec-yellow to-primary mb-2">{steps}</div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Installation Steps</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent hover:from-blue-500/20 transition-all">
            <div className="text-3xl font-bold text-foreground mb-2">{duration}</div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Est. Duration</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-primary/10 to-transparent hover:from-primary/20 transition-all">
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-elec-yellow to-primary mb-2">{toolsCount}</div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tools Required</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-destructive/10 to-transparent hover:from-destructive/20 transition-all">
            <div className="text-5xl font-black text-destructive mb-2 drop-shadow-lg">{hazardsCount}</div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Hazards Identified</div>
          </div>
        </div>
      )
    },
    {
      title: "Risk Profile",
      icon: ShieldCheck,
      content: (
        <div className="text-center space-y-5">
          <Badge className={cn("text-2xl px-8 py-4 font-black shadow-xl animate-pulse", riskColors[riskLevel])}>
            {(riskLevel || 'medium').toUpperCase()} RISK
          </Badge>
          <div className="flex justify-center gap-1.5 mt-5">
            {[...Array(10)].map((_, i) => (
              <Circle
                key={i}
                className={cn(
                  "h-4 w-4 transition-all",
                  i < (riskLevel === 'high' ? 8 : riskLevel === 'medium' ? 5 : 2)
                    ? "fill-current text-elec-yellow drop-shadow-md"
                    : "text-muted"
                )}
              />
            ))}
          </div>
          <p className="text-base font-semibold text-muted-foreground mt-3">
            {hazardsCount} control measures required
          </p>
        </div>
      )
    },
    {
      title: "Competency Required",
      icon: GraduationCap,
      content: (
        <div className="space-y-3">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Minimum Qualifications</div>
            <div className="text-sm font-medium text-foreground">
              {competency?.competencyRequirements || '18th Edition BS 7671'}
            </div>
          </div>
          {competency?.trainingRequired && (
            <div>
              <div className="text-xs text-muted-foreground mb-1">Training Required</div>
              <div className="text-sm font-medium text-foreground">
                {competency.trainingRequired}
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      title: "Site Information",
      icon: MapPin,
      content: (
        <div className="space-y-3">
          {siteLogistics?.vehicleAccess && (
            <div>
              <div className="text-xs text-muted-foreground mb-1">Vehicle Access</div>
              <div className="text-sm font-medium text-foreground">
                {siteLogistics.vehicleAccess}
              </div>
            </div>
          )}
          {siteLogistics?.restrictions && siteLogistics.restrictions.length > 0 && (
            <div>
              <div className="text-xs text-muted-foreground mb-1">Site Restrictions</div>
              <ul className="text-sm space-y-1">
                {siteLogistics.restrictions.slice(0, 2).map((r, i) => (
                  <li key={i} className="text-foreground">• {r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )
    }
  ];

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentCard((prev) => Math.min(prev + 1, cards.length - 1)),
    onSwipedRight: () => setCurrentCard((prev) => Math.max(prev - 1, 0)),
    trackMouse: true
  });

  return (
    <div className="space-y-4">
      <div {...handlers} className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentCard * 100}%)` }}
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="min-w-full px-1">
                <Card className="p-6 bg-gradient-to-br from-elec-yellow/5 via-blue-500/5 to-background border-primary/30 shadow-lg shadow-primary/10 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 animate-fade-in">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-primary/20 shadow-md">
                      <Icon className="h-6 w-6 text-elec-yellow" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{card.title}</h3>
                  </div>
                  {card.content}
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicator dots with glow effect */}
      <div className="flex justify-center gap-2.5">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentCard(index)}
            className={cn(
              "h-2.5 rounded-full transition-all touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center",
              currentCard === index 
                ? "w-10 bg-gradient-to-r from-elec-yellow to-primary shadow-lg shadow-elec-yellow/40" 
                : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>

      <p className="text-sm text-center text-muted-foreground font-medium animate-fade-in">
        ← Swipe or tap dots to explore →
      </p>
    </div>
  );
};
