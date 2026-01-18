import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Zap,
  Activity,
  Shield,
  Eye,
  Target,
  Clock,
  MapPin,
  AlertTriangle,
  Search,
  CheckCircle,
  Wrench,
  ArrowLeft,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { realWorldFaultCategories, RealWorldFaultCategory, RealWorldExample } from '../data/faultFindingData';

interface CaseStudyDetailProps {
  categoryId: string;
  onSelectCase?: (caseIndex: number) => void;
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
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30'
      };
  }
};

const CaseStudyDetail = ({ categoryId }: CaseStudyDetailProps) => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number | null>(null);
  const category = realWorldFaultCategories.find(c => c.id === categoryId);

  if (!category) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Category not found</p>
      </div>
    );
  }

  const colors = getCategoryColor(category.category);

  // If a specific case is selected, show full detail
  if (selectedCaseIndex !== null) {
    const example = category.examples[selectedCaseIndex];
    return (
      <div className="space-y-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedCaseIndex(null)}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to cases
        </Button>

        {/* Case Header */}
        <Card className={`${colors.border} border-l-4 ${colors.bg}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={`text-xs ${colors.border} ${colors.text}`}>
                Case {selectedCaseIndex + 1}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {example.timeToResolve}
              </Badge>
            </div>
            <CardTitle className={`text-lg ${colors.text}`}>
              {example.scenario}
            </CardTitle>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
              <MapPin className="h-3 w-3" />
              {example.location}
            </div>
          </CardHeader>
        </Card>

        {/* Symptoms */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-400" />
              Symptoms Reported
            </h3>
            <p className="text-sm text-foreground">{example.symptoms}</p>
          </CardContent>
        </Card>

        {/* Diagnosis */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Search className="h-4 w-4 text-blue-400" />
              Diagnosis Method
            </h3>
            <p className="text-sm text-foreground">{example.diagnosis}</p>
          </CardContent>
        </Card>

        {/* Solution */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Solution Applied
            </h3>
            <p className="text-sm text-foreground">{example.solution}</p>
          </CardContent>
        </Card>

        {/* Rectification Steps */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-emerald-400" />
              Rectification Steps
            </h3>
            <div className="space-y-2">
              {example.rectification.split(/\d+\.\s/).filter(Boolean).map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Badge
                    variant="outline"
                    className="text-xs min-w-[24px] h-5 flex items-center justify-center shrink-0 border-emerald-500/30 text-emerald-400"
                  >
                    {index + 1}
                  </Badge>
                  <span className="text-sm text-foreground">{step.trim()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prevention */}
        <Card className="border-cyan-500/20 bg-cyan-500/5">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm text-cyan-400 mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Prevention Strategy
            </h3>
            <p className="text-sm text-foreground">{example.prevention}</p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            disabled={selectedCaseIndex === 0}
            onClick={() => setSelectedCaseIndex(selectedCaseIndex - 1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous Case
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={selectedCaseIndex === category.examples.length - 1}
            onClick={() => setSelectedCaseIndex(selectedCaseIndex + 1)}
          >
            Next Case
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  // Show case list
  return (
    <div className="space-y-4">
      {/* Category Header */}
      <Card className={`${colors.border} border-l-4 ${colors.bg}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className={colors.text}>
              {getCategoryIcon(category.category, "h-8 w-8")}
            </div>
            <div>
              <CardTitle className={`text-lg sm:text-xl ${colors.text}`}>
                {category.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {category.description}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Case List */}
      <div className="space-y-3">
        {category.examples.map((example, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:bg-card/80 active:scale-[0.99] transition-all touch-manipulation"
            onClick={() => setSelectedCaseIndex(index)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={`text-xs ${colors.border} ${colors.text}`}>
                      Case {index + 1}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {example.timeToResolve}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-sm text-foreground mb-1">
                    {example.scenario}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {example.symptoms}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CaseStudyDetail;
