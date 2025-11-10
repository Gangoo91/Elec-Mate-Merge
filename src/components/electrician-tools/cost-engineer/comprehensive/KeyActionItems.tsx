import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, AlertCircle, Clock } from "lucide-react";

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

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return 'border-red-500/50 bg-red-500/10';
      case 'high': return 'border-yellow-500/50 bg-yellow-500/10';
      default: return 'border-blue-500/50 bg-blue-500/10';
    }
  };

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-elec-yellow" />
          Key Action Items
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <div 
              key={idx}
              className={`p-3 rounded-lg border ${getPriorityColor(action.priority)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium leading-relaxed">{action.text}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default KeyActionItems;
