import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  Search,
  CheckCircle2,
  BookOpen,
  Activity,
  Zap,
  Shield,
  Eye,
  Target,
  Clock,
  ThermometerSun
} from 'lucide-react';
import { diagnosticScenarios, Diagnostic } from '../data/faultFindingData';

interface DiagnosticDetailProps {
  categoryId: string;
  diagnosticIndex: number;
}

const getCategoryIcon = (category: string, className: string = "h-6 w-6") => {
  switch (category) {
    case 'continuity':
      return <Activity className={className} />;
    case 'voltage':
      return <Zap className={className} />;
    case 'rcd':
    case 'protection':
      return <Shield className={className} />;
    case 'insulation':
      return <Shield className={className} />;
    case 'earthing':
      return <Activity className={className} />;
    case 'power-quality':
      return <Eye className={className} />;
    case 'load':
      return <Target className={className} />;
    case 'thermal':
      return <ThermometerSun className={className} />;
    case 'transient':
      return <Clock className={className} />;
    default:
      return <Search className={className} />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
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

const DiagnosticDetail = ({ categoryId, diagnosticIndex }: DiagnosticDetailProps) => {
  const scenario = diagnosticScenarios.find(s => s.id === categoryId);

  if (!scenario || !scenario.diagnostics[diagnosticIndex]) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Diagnostic not found</p>
      </div>
    );
  }

  const diagnostic = scenario.diagnostics[diagnosticIndex];
  const colors = getSeverityColor(diagnostic.severity);

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card className={`${colors.border} border-l-4 ${colors.bg}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="outline"
              className={`text-xs uppercase ${colors.badge}`}
            >
              {diagnostic.severity}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {scenario.title.replace(' Analysis', '')}
            </Badge>
          </div>
          <CardTitle className={`text-lg ${colors.text}`}>
            {diagnostic.symptom}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Test Measurement */}
      <Card className="border-slate-500/20 bg-slate-500/5">
        <CardContent className="p-4">
          <h3 className="font-semibold text-xs text-muted-foreground mb-2 uppercase tracking-wide">
            Test Measurement
          </h3>
          <p className="text-sm font-mono text-foreground">
            {diagnostic.measurement}
          </p>
        </CardContent>
      </Card>

      {/* Interpretation */}
      <Card className="border-yellow-500/20 bg-yellow-500/5">
        <CardContent className="p-4">
          <h3 className="font-semibold text-xs text-yellow-400 mb-2 uppercase tracking-wide">
            Technical Interpretation
          </h3>
          <p className="text-sm text-foreground">
            {diagnostic.interpretation}
          </p>
        </CardContent>
      </Card>

      {/* Possible Causes */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            Probable Causes
          </h3>
          <div className="space-y-2">
            {diagnostic.possibleCauses.map((cause, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-orange-400 shrink-0">•</span>
                <span className="text-sm text-foreground">{cause}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Diagnostic Steps */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Search className="h-4 w-4 text-blue-400" />
            Diagnostic Procedure
          </h3>
          <div className="space-y-2">
            {diagnostic.diagnosticSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-2">
                <Badge
                  variant="outline"
                  className="text-xs min-w-[24px] h-5 flex items-center justify-center shrink-0 border-blue-500/30 text-blue-400"
                >
                  {index + 1}
                </Badge>
                <span className="text-sm text-foreground">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rectification Methods */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            Rectification Methods
          </h3>
          <div className="space-y-2">
            {diagnostic.rectificationMethods.map((method, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                <span className="text-sm text-foreground">{method}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regulation Reference */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardContent className="p-4">
          <h3 className="font-semibold text-xs text-blue-400 mb-2 uppercase tracking-wide flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Regulatory Compliance
          </h3>
          <p className="text-sm text-blue-300">
            {diagnostic.regulation}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticDetail;
