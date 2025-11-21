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
      color: 'bg-green-500',
      textColor: 'text-green-300',
      borderColor: 'border-green-500',
      icon: CheckCircle2,
      label: 'High Confidence',
      description: 'Clear defect - single interpretation'
    },
    medium: {
      color: 'bg-amber-500',
      textColor: 'text-amber-300',
      borderColor: 'border-amber-500',
      icon: AlertCircle,
      label: 'Medium Confidence',
      description: 'Code depends on installation context'
    },
    low: {
      color: 'bg-red-500',
      textColor: 'text-red-300',
      borderColor: 'border-red-500',
      icon: HelpCircle,
      label: 'Low Confidence',
      description: 'Site inspection required'
    }
  };

  const conf = config[level];
  const Icon = conf.icon;
  const displayScore = score || (level === 'high' ? 90 : level === 'medium' ? 70 : 50);

  return (
    <div className={`bg-elec-dark/50 border-2 ${conf.borderColor} rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${conf.color}/20`}>
          <Icon className={`h-5 w-5 ${conf.textColor}`} />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={`${conf.color} text-white border-none`}>
              {conf.label}
            </Badge>
            <span className={`text-2xl font-bold ${conf.textColor}`}>
              {displayScore}%
            </span>
          </div>
          <p className="text-sm text-white/70">{conf.description}</p>
          {reasoning && (
            <p className="text-sm text-white/80 bg-elec-dark/80 rounded p-2 mt-2">
              {reasoning}
            </p>
          )}
        </div>
      </div>

      {/* Visual confidence bar */}
      <div className="mt-3 h-2 bg-elec-dark rounded-full overflow-hidden">
        <div 
          className={`h-full ${conf.color} transition-all duration-500`}
          style={{ width: `${displayScore}%` }}
        />
      </div>
    </div>
  );
};

export default ConfidenceMeter;
