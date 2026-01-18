import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  Target,
  Search,
  Shield,
  Wrench,
  ChevronRight
} from 'lucide-react';

export type ViewMode =
  | 'overview'
  | 'common-faults'
  | 'common-fault-detail'
  | 'real-world'
  | 'case-detail'
  | 'diagnostics'
  | 'diagnostic-detail'
  | 'methodology'
  | 'safety'
  | 'safety-detail'
  | 'equipment'
  | 'equipment-detail';

interface FaultFindingOverviewProps {
  onNavigate: (view: ViewMode) => void;
}

interface HubCard {
  id: ViewMode;
  title: string;
  subtitle: string;
  count: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  bgColor: string;
}

const FaultFindingOverview = ({ onNavigate }: FaultFindingOverviewProps) => {
  const hubCards: HubCard[] = [
    {
      id: 'common-faults',
      title: 'Common Faults',
      subtitle: 'Fault types & theory',
      count: '6 types',
      icon: <AlertTriangle className="h-8 w-8" />,
      color: 'text-red-400',
      borderColor: 'border-red-500/30',
      bgColor: 'bg-red-500/10'
    },
    {
      id: 'real-world',
      title: 'Real-World Cases',
      subtitle: 'Practical case studies',
      count: '35+ cases',
      icon: <Target className="h-8 w-8" />,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'diagnostics',
      title: 'Diagnostics',
      subtitle: 'Search symptoms & causes',
      count: '25+ guides',
      icon: <Search className="h-8 w-8" />,
      color: 'text-green-400',
      borderColor: 'border-green-500/30',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 'methodology',
      title: 'Methodology',
      subtitle: 'Step-by-step process',
      count: '8 steps',
      icon: <Target className="h-8 w-8" />,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 'safety',
      title: 'Safety Protocols',
      subtitle: 'Critical safety info',
      count: '6 topics',
      icon: <Shield className="h-8 w-8" />,
      color: 'text-orange-400',
      borderColor: 'border-orange-500/30',
      bgColor: 'bg-orange-500/10'
    },
    {
      id: 'equipment',
      title: 'Equipment Guides',
      subtitle: 'Test instruments',
      count: '6 tools',
      icon: <Wrench className="h-8 w-8" />,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
      bgColor: 'bg-cyan-500/10'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="bg-card/50 rounded-lg p-3 text-center border border-muted/20">
          <div className="text-lg sm:text-xl font-bold text-red-400">6</div>
          <div className="text-xs text-muted-foreground">Fault Types</div>
        </div>
        <div className="bg-card/50 rounded-lg p-3 text-center border border-muted/20">
          <div className="text-lg sm:text-xl font-bold text-blue-400">35+</div>
          <div className="text-xs text-muted-foreground">Case Studies</div>
        </div>
        <div className="bg-card/50 rounded-lg p-3 text-center border border-muted/20">
          <div className="text-lg sm:text-xl font-bold text-green-400">25+</div>
          <div className="text-xs text-muted-foreground">Diagnostics</div>
        </div>
      </div>

      {/* Hub Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {hubCards.map((card) => (
          <Card
            key={card.id}
            className={`${card.borderColor} border-2 ${card.bgColor} cursor-pointer
              transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
              touch-manipulation`}
            onClick={() => onNavigate(card.id)}
          >
            <CardContent className="p-4 sm:p-5">
              <div className="flex flex-col h-full">
                {/* Icon */}
                <div className={`${card.color} mb-3`}>
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className={`font-semibold text-sm sm:text-base ${card.color} mb-1`}>
                  {card.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs text-muted-foreground mb-3 flex-1">
                  {card.subtitle}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={`text-xs ${card.borderColor} ${card.color}`}
                  >
                    {card.count}
                  </Badge>
                  <ChevronRight className={`h-4 w-4 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Reference Card */}
      <Card className="border-l-4 border-l-elec-yellow bg-card/50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-elec-yellow mb-3 text-sm sm:text-base">
            Fault Finding Principles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-foreground">Systematic</p>
                <p className="text-xs text-muted-foreground">Follow logical sequence</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-foreground">Safety First</p>
                <p className="text-xs text-muted-foreground">Always isolate safely</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-foreground">Verify Repair</p>
                <p className="text-xs text-muted-foreground">Test after fixing</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaultFindingOverview;
