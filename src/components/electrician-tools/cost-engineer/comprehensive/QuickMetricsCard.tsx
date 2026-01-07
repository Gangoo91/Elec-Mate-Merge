import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, CheckCircle2, AlertTriangle, BarChart3 } from "lucide-react";
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
    <Card variant="ios" className="overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center"
            >
              <BarChart3 className="h-5 w-5 text-blue-400" />
            </motion.div>
            <div>
              <h3 className="text-ios-headline text-white font-semibold">Job Snapshot</h3>
              <p className="text-ios-caption-1 text-white/50">Key project metrics at a glance</p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-px bg-white/5">
          {/* Complexity */}
          {complexity && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-black/20 text-center"
            >
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <TrendingUp className={`h-4 w-4 ${complexityColors?.text}`} />
                <span className="text-ios-caption-1 text-white/50">Complexity</span>
              </div>
              <div className={`inline-block text-2xl font-bold px-3 py-1 rounded-lg ${complexityColors?.bg} ${complexityColors?.text} ${complexityColors?.border} border`}>
                {complexity.rating}/10
              </div>
              <p className="text-ios-caption-1 text-white/60 mt-1">{complexity.label}</p>
            </motion.div>
          )}

          {/* Confidence */}
          {confidence && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-4 bg-black/20 text-center"
            >
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <CheckCircle2 className={`h-4 w-4 ${getConfidenceColor(avgConfidence)}`} />
                <span className="text-ios-caption-1 text-white/50">Confidence</span>
              </div>
              <div className={`text-2xl font-bold ${getConfidenceColor(avgConfidence)}`}>
                {avgConfidence}%
              </div>
              <p className="text-ios-caption-1 text-white/60 mt-1">Accuracy</p>
            </motion.div>
          )}

          {/* Risk Level */}
          {riskAssessment && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-black/20 text-center"
            >
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <AlertTriangle className={`h-4 w-4 ${highRisks > 0 ? 'text-red-400' : 'text-emerald-400'}`} />
                <span className="text-ios-caption-1 text-white/50">Risk Level</span>
              </div>
              <div className={`text-2xl font-bold ${highRisks > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {highRisks > 0 ? 'High' : 'Low'}
              </div>
              <p className="text-ios-caption-1 text-white/60 mt-1">
                {highRisks > 0 ? `${highRisks} Risk${highRisks > 1 ? 's' : ''}` : 'Clear'}
              </p>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickMetricsCard;
