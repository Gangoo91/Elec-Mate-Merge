import { CheckSquare, AlertCircle, Clock, ListChecks } from "lucide-react";
import { motion } from "framer-motion";

interface KeyActionItemsProps {
  structuredData: any;
}

const KeyActionItems = ({ structuredData }: KeyActionItemsProps) => {
  // Extract top 3 priority actions from various sources
  const getTop3Actions = () => {
    const actions: Array<{icon: any, text: string, priority: string}> = [];

    // Action 1: Critical site checks
    if (structuredData?.siteChecklist?.critical?.[0]) {
      actions.push({
        icon: AlertCircle,
        text: structuredData.siteChecklist.critical[0],
        priority: 'critical'
      });
    }

    // Action 2: Payment terms
    if (structuredData?.paymentTerms) {
      actions.push({
        icon: Clock,
        text: `Secure ${structuredData.paymentTerms.depositPercent}% deposit (£${structuredData.paymentTerms.depositAmount?.toFixed(2)}) before starting`,
        priority: 'high'
      });
    }

    // Action 3: High-value upsell or risk mitigation
    const hotUpsell = structuredData?.upsells?.find((u: any) => u.isHot);
    if (hotUpsell) {
      actions.push({
        icon: CheckSquare,
        text: `Offer ${hotUpsell.opportunity} (+£${hotUpsell.price}) - ${hotUpsell.winRate}% win rate`,
        priority: 'medium'
      });
    } else if (structuredData?.riskAssessment?.risks?.[0]) {
      const topRisk = structuredData.riskAssessment.risks[0];
      actions.push({
        icon: AlertCircle,
        text: topRisk.mitigation,
        priority: 'high'
      });
    }

    return actions.slice(0, 3);
  };

  const actions = getTop3Actions();

  if (actions.length === 0) return null;

  const getPriorityStyle = (priority: string) => {
    switch(priority) {
      case 'critical': return { bg: 'bg-red-500/10', border: 'border-red-500/30', icon: 'text-red-400' };
      case 'high': return { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: 'text-amber-400' };
      default: return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: 'text-blue-400' };
    }
  };

  return (
    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-10 h-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center shadow-md"
          >
            <ListChecks className="h-5 w-5 text-elec-yellow" />
          </motion.div>
          <div>
            <h3 className="text-base sm:text-lg text-white font-bold">Key Action Items</h3>
            <p className="text-xs sm:text-sm text-white/60">Priority tasks before starting</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 sm:p-5 space-y-3">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          const style = getPriorityStyle(action.priority);
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-xl border ${style.bg} ${style.border}`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 mt-0.5 ${style.icon}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm sm:text-base text-white leading-relaxed">{action.text}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default KeyActionItems;
