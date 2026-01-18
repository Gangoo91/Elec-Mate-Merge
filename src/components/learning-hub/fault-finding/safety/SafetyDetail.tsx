import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  HardHat,
  Lock,
  AlertTriangle,
  BookOpen,
  ClipboardCheck,
  Clock
} from 'lucide-react';
import { safetyTopics, SafetyTopic } from '../data/faultFindingData';

interface SafetyDetailProps {
  topicId: string;
}

const getCategoryIcon = (category: string, className: string = "h-6 w-6") => {
  switch (category) {
    case 'safety':
      return <Shield className={className} />;
    case 'equipment':
      return <HardHat className={className} />;
    case 'procedures':
      return <Lock className={className} />;
    case 'emergency':
      return <AlertTriangle className={className} />;
    case 'legal':
      return <BookOpen className={className} />;
    case 'assessment':
      return <ClipboardCheck className={className} />;
    default:
      return <Shield className={className} />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return {
        text: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30'
      };
    case 'high':
      return {
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30'
      };
    default:
      return {
        text: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/30'
      };
  }
};

const formatSectionTitle = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

const SafetyDetail = ({ topicId }: SafetyDetailProps) => {
  const topic = safetyTopics.find(t => t.id === topicId);

  if (!topic) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Topic not found</p>
      </div>
    );
  }

  const colors = getPriorityColor(topic.priority);

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card className={`${colors.border} border-l-4 ${colors.bg}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className={colors.text}>
              {getCategoryIcon(topic.category, "h-8 w-8")}
            </div>
            <div className="flex-1">
              <CardTitle className={`text-lg sm:text-xl ${colors.text}`}>
                {topic.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {topic.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <Badge
              variant="outline"
              className={`text-xs uppercase ${colors.border} ${colors.text}`}
            >
              {topic.priority} Priority
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {topic.estimatedTime}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Points */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
            Key Points
          </h3>
          <ul className="space-y-2">
            {topic.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-elec-yellow shrink-0">•</span>
                <span className="text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Detailed Content Sections */}
      {Object.entries(topic.detailedContent).map(([sectionKey, items]) => (
        <Card key={sectionKey}>
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {formatSectionTitle(sectionKey)}
            </h3>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Badge
                    variant="outline"
                    className="text-xs min-w-[24px] h-5 flex items-center justify-center shrink-0"
                  >
                    {index + 1}
                  </Badge>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Regulation Reference */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm text-blue-400 mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Regulatory Reference
          </h3>
          <p className="text-sm text-blue-300">
            {topic.regulation}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyDetail;
