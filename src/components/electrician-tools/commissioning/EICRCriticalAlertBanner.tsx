import { AlertTriangle, Zap, AlertCircle, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EICRCriticalAlertBannerProps {
  classification: 'C1' | 'C2' | 'C3' | 'FI';
  confidenceScore: number;
  primaryDefect: string;
  urgency: string;
}

const EICRCriticalAlertBanner = ({ 
  classification, 
  confidenceScore, 
  primaryDefect,
  urgency 
}: EICRCriticalAlertBannerProps) => {
  // Early return if classification is invalid
  if (!classification || !['C1', 'C2', 'C3', 'FI'].includes(classification)) {
    return null;
  }

  const config = {
    C1: {
      bg: 'bg-elec-dark/80',
      border: 'border-elec-yellow',
      icon: AlertTriangle,
      iconColor: 'text-red-400',
      label: 'DANGER',
      ringColor: 'stroke-red-500',
      textColor: 'text-red-400'
    },
    C2: {
      bg: 'bg-elec-dark/80',
      border: 'border-elec-yellow',
      icon: Zap,
      iconColor: 'text-orange-400',
      label: 'URGENT',
      ringColor: 'stroke-orange-500',
      textColor: 'text-orange-400'
    },
    C3: {
      bg: 'bg-elec-dark/80',
      border: 'border-elec-yellow',
      icon: AlertCircle,
      iconColor: 'text-amber-400',
      label: 'IMPROVEMENT',
      ringColor: 'stroke-amber-500',
      textColor: 'text-amber-400'
    },
    FI: {
      bg: 'bg-elec-dark/80',
      border: 'border-elec-yellow',
      icon: Info,
      iconColor: 'text-elec-yellow',
      label: 'INVESTIGATION',
      ringColor: 'stroke-elec-yellow',
      textColor: 'text-elec-yellow'
    }
  };

  const conf = config[classification];
  const Icon = conf.icon;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidenceScore / 100) * circumference;

  return (
    <Card className={`${conf.bg} border-2 ${conf.border} p-5 sm:p-6 shadow-lg`}>
      <div className="flex items-center gap-4">
        {/* Confidence Ring */}
        <div className="relative flex-shrink-0">
          <svg className="w-24 h-24 sm:w-28 sm:h-28 transform -rotate-90" viewBox="0 0 96 96">
            {/* Background circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className="text-foreground/10"
            />
            {/* Progress circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className={conf.ringColor}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl sm:text-4xl font-bold ${conf.textColor}`}>
              {confidenceScore}
            </span>
            <span className="text-xs text-foreground/60">/ 100</span>
          </div>
        </div>

        {/* Classification & Details */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={`${conf.border} border-2 bg-transparent ${conf.textColor} text-base px-3 py-1.5`}>
              <Icon className="h-4 w-4 mr-1.5" />
              {conf.label} ({classification})
            </Badge>
          </div>
          
          <h3 className="text-lg sm:text-xl font-semibold text-foreground leading-tight line-clamp-2">
            {primaryDefect}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-foreground">
            <AlertTriangle className="h-4 w-4" />
            <span>{urgency}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EICRCriticalAlertBanner;
