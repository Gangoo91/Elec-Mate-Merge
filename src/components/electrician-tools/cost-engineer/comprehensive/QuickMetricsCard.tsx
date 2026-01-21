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
    <div className="grid grid-cols-3 gap-4">
      {/* Complexity */}
      {complexity && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="min-h-[44px] text-left"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className={`h-4 w-4 ${complexityColors?.text}`} />
            <span className="text-xs text-white/50">Complexity</span>
          </div>
          <div className={`text-2xl font-bold ${complexityColors?.text}`}>
            {complexity.rating}/10
          </div>
          <p className="text-xs text-white/50 mt-0.5">{complexity.label}</p>
        </motion.div>
      )}

      {/* Confidence */}
      {confidence && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="min-h-[44px] text-left"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <CheckCircle2 className={`h-4 w-4 ${getConfidenceColor(avgConfidence)}`} />
            <span className="text-xs text-white/50">Confidence</span>
          </div>
          <div className={`text-2xl font-bold ${getConfidenceColor(avgConfidence)}`}>
            {avgConfidence}%
          </div>
          <p className="text-xs text-white/50 mt-0.5">Accuracy</p>
        </motion.div>
      )}

      {/* Risk Level */}
      {riskAssessment && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="min-h-[44px] text-left"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <AlertTriangle className={`h-4 w-4 ${highRisks > 0 ? 'text-red-400' : 'text-emerald-400'}`} />
            <span className="text-xs text-white/50">Risk Level</span>
          </div>
          <div className={`text-2xl font-bold ${highRisks > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {highRisks > 0 ? 'High' : 'Low'}
          </div>
          <p className="text-xs text-white/50 mt-0.5">
            {highRisks > 0 ? `${highRisks} Risk${highRisks > 1 ? 's' : ''}` : 'Clear'}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default QuickMetricsCard;
