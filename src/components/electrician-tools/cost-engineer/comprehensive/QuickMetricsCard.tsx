import { TrendingUp, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface QuickMetricsCardProps {
  complexity?: any;
  confidence?: any;
  riskAssessment?: any;
}

const QuickMetricsCard = ({
  complexity,
  confidence,
  riskAssessment
}: QuickMetricsCardProps) => {
  const getComplexityColor = (rating: number) => {
    if (rating <= 4) return { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30" };
    if (rating <= 6) return { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30" };
    return { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30" };
  };

  const getConfidenceColor = (level: number) => {
    if (level >= 80) return "text-emerald-400";
    if (level >= 60) return "text-amber-400";
    return "text-red-400";
  };

  const avgConfidence = confidence
    ? Math.round((confidence.materials?.level + confidence.labour?.level) / 2)
    : 75;

  const highRisks = riskAssessment?.risks?.filter((r: any) =>
    r.severity === 'critical' || r.severity === 'high'
  ).length || 0;

  const complexityColors = complexity ? getComplexityColor(complexity.rating) : null;

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Complexity Card */}
      {complexity && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`relative overflow-hidden rounded-xl p-4 ${complexityColors?.bg} border ${complexityColors?.border}`}
        >
          <div className={`absolute top-0 right-0 w-16 h-16 ${complexityColors?.bg} rounded-full blur-2xl -mr-4 -mt-4 opacity-50`} />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${complexityColors?.bg}`}>
                <TrendingUp className={`h-4 w-4 ${complexityColors?.text}`} />
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wide ${complexityColors?.text} opacity-80`}>Complexity</span>
            </div>
            <div className={`text-2xl font-black ${complexityColors?.text} tabular-nums`}>
              {complexity.rating}/10
            </div>
            <p className="text-xs text-white/50 mt-1">{complexity.label}</p>
          </div>
        </motion.div>
      )}

      {/* Risk Level Card */}
      {riskAssessment && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`relative overflow-hidden rounded-xl p-4 ${highRisks > 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-emerald-500/10 border-emerald-500/20'} border`}
        >
          <div className={`absolute top-0 right-0 w-16 h-16 ${highRisks > 0 ? 'bg-red-500/10' : 'bg-emerald-500/10'} rounded-full blur-2xl -mr-4 -mt-4 opacity-50`} />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${highRisks > 0 ? 'bg-red-500/20' : 'bg-emerald-500/20'}`}>
                <AlertTriangle className={`h-4 w-4 ${highRisks > 0 ? 'text-red-400' : 'text-emerald-400'}`} />
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wide ${highRisks > 0 ? 'text-red-300/80' : 'text-emerald-300/80'}`}>Risk Level</span>
            </div>
            <div className={`text-2xl font-black tabular-nums ${highRisks > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {highRisks > 0 ? 'High' : 'Low'}
            </div>
            <p className="text-xs text-white/50 mt-1">
              {highRisks > 0 ? `${highRisks} Risk${highRisks > 1 ? 's' : ''} identified` : 'No major risks'}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuickMetricsCard;
