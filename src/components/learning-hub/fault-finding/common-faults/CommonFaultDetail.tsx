import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Lightbulb,
  Search,
  AlertTriangle,
  Shield,
  BookOpen,
  Zap,
  Activity,
  Target,
  Eye
} from 'lucide-react';
import { commonFaultCategories, CommonFaultCategory } from '../data/faultFindingData';

interface CommonFaultDetailProps {
  faultId: string;
}

const getCategoryIcon = (category: string, className: string = "h-6 w-6") => {
  switch (category) {
    case 'overcurrent':
      return <Zap className={className} />;
    case 'earthing':
      return <Activity className={className} />;
    case 'insulation':
      return <Shield className={className} />;
    case 'supply_issues':
      return <Eye className={className} />;
    default:
      return <Target className={className} />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'overcurrent':
      return {
        text: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30'
      };
    case 'earthing':
      return {
        text: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-green-500/30'
      };
    case 'insulation':
      return {
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30'
      };
    case 'supply_issues':
      return {
        text: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30'
      };
    default:
      return {
        text: 'text-slate-400',
        bg: 'bg-slate-500/10',
        border: 'border-slate-500/30'
      };
  }
};

const CommonFaultDetail = ({ faultId }: CommonFaultDetailProps) => {
  const fault = commonFaultCategories.find(f => f.id === faultId);

  if (!fault) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Fault not found</p>
      </div>
    );
  }

  const colors = getCategoryColor(fault.category);

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card className={`${colors.border} border-l-4 ${colors.bg}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className={colors.text}>
              {getCategoryIcon(fault.category, "h-8 w-8")}
            </div>
            <div>
              <CardTitle className={`text-lg sm:text-xl ${colors.text}`}>
                {fault.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {fault.description}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Theory Section */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm text-blue-400 mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Theory & Background
          </h3>
          <p className="text-sm text-foreground leading-relaxed">
            {fault.theory}
          </p>
        </CardContent>
      </Card>

      {/* Detection Methods */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Search className="h-4 w-4 text-green-400" />
            Detection Methods
          </h3>
          <div className="space-y-2">
            {fault.detectionMethods.map((method, index) => (
              <div key={index} className="flex items-start gap-2">
                <Badge
                  variant="outline"
                  className="text-xs min-w-[24px] h-5 flex items-center justify-center shrink-0"
                >
                  {index + 1}
                </Badge>
                <span className="text-sm text-foreground">{method}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Symptoms */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            Common Symptoms
          </h3>
          <ul className="space-y-2">
            {fault.commonSymptoms.map((symptom, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-orange-400 shrink-0">•</span>
                <span className="text-foreground">{symptom}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Prevention Strategies */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-cyan-400" />
            Prevention Strategies
          </h3>
          <div className="space-y-2">
            {fault.preventionStrategies.map((strategy, index) => (
              <div key={index} className="flex items-start gap-2">
                <Badge
                  variant="outline"
                  className="text-xs min-w-[24px] h-5 flex items-center justify-center shrink-0 border-cyan-500/30 text-cyan-400"
                >
                  {index + 1}
                </Badge>
                <span className="text-sm text-foreground">{strategy}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regulation Reference */}
      <Card className="border-purple-500/20 bg-purple-500/5">
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm text-purple-400 mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Regulatory Reference
          </h3>
          <p className="text-sm text-purple-300">
            {fault.regulation}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommonFaultDetail;
