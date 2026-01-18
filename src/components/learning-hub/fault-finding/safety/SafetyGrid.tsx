import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ChevronRight,
  Shield,
  HardHat,
  Lock,
  AlertTriangle,
  BookOpen,
  ClipboardCheck
} from 'lucide-react';
import { safetyTopics, SafetyTopic } from '../data/faultFindingData';

interface SafetyGridProps {
  onSelectTopic: (topicId: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'safety':
      return <Shield className="h-6 w-6" />;
    case 'equipment':
      return <HardHat className="h-6 w-6" />;
    case 'procedures':
      return <Lock className="h-6 w-6" />;
    case 'emergency':
      return <AlertTriangle className="h-6 w-6" />;
    case 'legal':
      return <BookOpen className="h-6 w-6" />;
    case 'assessment':
      return <ClipboardCheck className="h-6 w-6" />;
    default:
      return <Shield className="h-6 w-6" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return {
        text: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        badge: 'bg-red-500/20 text-red-400 border-red-500/30'
      };
    case 'high':
      return {
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30',
        badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      };
    default:
      return {
        text: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/30',
        badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      };
  }
};

const SafetyGrid = ({ onSelectTopic }: SafetyGridProps) => {
  return (
    <div className="space-y-4">
      {/* Critical Safety Warning */}
      <Card className="border-l-4 border-l-red-500 bg-red-500/10">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-400 text-sm mb-1">
                Critical Safety Requirements
              </h3>
              <p className="text-sm text-red-300">
                Electrical fault finding involves working with potentially live systems.
                Always prioritise safety over speed of diagnosis.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Topic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {safetyTopics.map((topic: SafetyTopic) => {
          const colors = getPriorityColor(topic.priority);

          return (
            <Card
              key={topic.id}
              className={`${colors.border} border ${colors.bg} cursor-pointer
                transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                touch-manipulation`}
              onClick={() => onSelectTopic(topic.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`${colors.text} shrink-0`}>
                    {getCategoryIcon(topic.category)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm sm:text-base ${colors.text} mb-1`}>
                      {topic.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {topic.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={`text-xs uppercase ${colors.badge}`}
                      >
                        {topic.priority}
                      </Badge>
                      <ChevronRight className={`h-4 w-4 ${colors.text}`} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SafetyGrid;
