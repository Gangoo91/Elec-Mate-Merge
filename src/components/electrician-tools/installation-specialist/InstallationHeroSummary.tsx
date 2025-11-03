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
    minimumQualifications?: string;
    mandatoryTraining?: string[];
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
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-1">{steps}</div>
            <div className="text-xs text-muted-foreground">Installation Steps</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-foreground mb-1">{duration}</div>
            <div className="text-xs text-muted-foreground">Est. Duration</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-1">{toolsCount}</div>
            <div className="text-xs text-muted-foreground">Tools Required</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-destructive mb-1">{hazardsCount}</div>
            <div className="text-xs text-muted-foreground">Hazards Identified</div>
          </div>
        </div>
      )
    },
    {
      title: "Risk Profile",
      icon: ShieldCheck,
      content: (
        <div className="text-center space-y-4">
          <Badge className={cn("text-2xl px-6 py-3 font-bold", riskColors[riskLevel])}>
            {riskLevel.toUpperCase()} RISK
          </Badge>
          <div className="flex justify-center gap-1 mt-4">
            {[...Array(10)].map((_, i) => (
              <Circle
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < (riskLevel === 'high' ? 8 : riskLevel === 'medium' ? 5 : 2)
                    ? "fill-current text-primary"
                    : "text-muted"
                )}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
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
              {competency?.minimumQualifications || '18th Edition BS 7671'}
            </div>
          </div>
          {competency?.mandatoryTraining && competency.mandatoryTraining.length > 0 && (
            <div>
              <div className="text-xs text-muted-foreground mb-1">Training Required</div>
              <div className="text-sm font-medium text-foreground">
                {competency.mandatoryTraining.join(', ')}
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
    <div className="space-y-3">
      <div {...handlers} className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentCard * 100}%)` }}
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="min-w-full px-1">
                <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                  </div>
                  {card.content}
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center gap-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentCard(index)}
            className={cn(
              "h-2 rounded-full transition-all touch-manipulation",
              currentCard === index 
                ? "w-8 bg-primary" 
                : "w-2 bg-muted-foreground/30"
            )}
            aria-label={`Go to card ${index + 1}`}
          />
        ))}
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Swipe or tap dots to explore
      </p>
    </div>
  );
};
