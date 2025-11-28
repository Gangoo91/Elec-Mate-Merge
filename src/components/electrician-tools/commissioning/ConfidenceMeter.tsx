import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";

interface ConfidenceMeterProps {
  level: 'high' | 'medium' | 'low';
  score?: number;
  reasoning?: string;
}

const ConfidenceMeter = ({ level, score, reasoning }: ConfidenceMeterProps) => {
  const config = {
    high: {
      color: 'bg-green-500/60',
      textColor: 'text-green-400/90',
      borderColor: 'border-green-500',
      icon: CheckCircle2,
      label: 'High Confidence',
      description: 'Clear defect - single interpretation'
    },
    medium: {
      color: 'bg-amber-500/60',
      textColor: 'text-amber-400/90',
      borderColor: 'border-amber-500',
      icon: AlertCircle,
      label: 'Medium Confidence',
      description: 'Code depends on installation context'
    },
    low: {
      color: 'bg-red-500/60',
      textColor: 'text-red-400/90',
      borderColor: 'border-red-500',
      icon: HelpCircle,
      label: 'Low Confidence',
      description: 'Site inspection required'
    }
  };

  const normalizedLevel = (level?.toLowerCase() || 'medium') as 'high' | 'medium' | 'low';
  const conf = config[normalizedLevel];
  const Icon = conf.icon;
  const displayScore = score || (level === 'high' ? 90 : level === 'medium' ? 70 : 50);

  return (
    <div className={`bg-elec-dark/50 border-2 ${conf.borderColor} rounded-lg p-4 sm:p-5 shadow-lg`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${conf.color}/20`}>
          <Icon className={`h-6 w-6 ${conf.textColor}`} />
        </div>
        <div className="flex-1 space-y-3 w-full">
          <div className="flex items-center justify-start gap-3 flex-wrap">
            <Badge className={`${conf.color} text-white border-none text-base px-3 py-1.5`}>
              {conf.label}
            </Badge>
            <span className={`text-4xl font-bold ${conf.textColor}`}>
              {displayScore}%
            </span>
          </div>
          <p className="text-base text-white leading-relaxed text-left">{conf.description}</p>
          {reasoning && (
            <p className="text-base text-white bg-elec-dark/80 rounded p-4 mt-3 leading-relaxed text-left">
              {reasoning}
            </p>
          )}
        </div>
      </div>

      {/* Visual confidence bar */}
      <div className="mt-4 h-3 bg-elec-dark rounded-full overflow-hidden">
        <div 
          className={`h-full ${conf.color} transition-all duration-500`}
          style={{ width: `${displayScore}%` }}
        />
      </div>
    </div>
  );
};

export default ConfidenceMeter;
