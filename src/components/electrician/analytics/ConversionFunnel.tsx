import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, FileText, Send, CheckCircle, Receipt, PoundSterling } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FunnelStage {
  label: string;
  count: number;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

interface ConversionFunnelProps {
  stages: {
    drafts: number;
    sent: number;
    accepted: number;
    invoiced: number;
    paid: number;
  };
  values: {
    drafts: number;
    sent: number;
    accepted: number;
    invoiced: number;
    paid: number;
  };
  formatCurrency: (value: number) => string;
}

export const ConversionFunnel: React.FC<ConversionFunnelProps> = ({
  stages,
  values,
  formatCurrency,
}) => {
  const funnelStages: FunnelStage[] = [
    {
      label: 'Drafts',
      count: stages.drafts,
      value: values.drafts,
      icon: <FileText className="h-4 w-4" />,
      color: 'text-slate-400',
      bgColor: 'bg-slate-500/20',
    },
    {
      label: 'Sent',
      count: stages.sent,
      value: values.sent,
      icon: <Send className="h-4 w-4" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
    {
      label: 'Accepted',
      count: stages.accepted,
      value: values.accepted,
      icon: <CheckCircle className="h-4 w-4" />,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
    },
    {
      label: 'Invoiced',
      count: stages.invoiced,
      value: values.invoiced,
      icon: <Receipt className="h-4 w-4" />,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
    },
    {
      label: 'Paid',
      count: stages.paid,
      value: values.paid,
      icon: <PoundSterling className="h-4 w-4" />,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
  ];

  // Calculate conversion rates between stages
  const getConversionRate = (fromIndex: number, toIndex: number) => {
    const fromCount = funnelStages[fromIndex].count;
    const toCount = funnelStages[toIndex].count;
    if (fromCount === 0) return 0;
    return Math.round((toCount / fromCount) * 100);
  };

  // Calculate win rate (accepted / sent)
  const winRate = stages.sent > 0 ? Math.round((stages.accepted / stages.sent) * 100) : 0;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Quote Pipeline</CardTitle>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Win Rate:</span>
            <span className={cn(
              "font-bold",
              winRate >= 50 ? "text-emerald-400" : winRate >= 25 ? "text-amber-400" : "text-red-400"
            )}>
              {winRate}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-1">
          {funnelStages.map((stage, index) => {
            // Calculate width based on count relative to max
            const maxCount = Math.max(...funnelStages.map(s => s.count), 1);
            const widthPercent = Math.max((stage.count / maxCount) * 100, 20);

            return (
              <div key={stage.label}>
                {/* Stage Row */}
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                    stage.bgColor, stage.color
                  )}>
                    {stage.icon}
                  </div>

                  {/* Bar */}
                  <div className="flex-1 relative">
                    <div
                      className={cn(
                        "h-10 rounded-lg flex items-center justify-between px-3 transition-all",
                        stage.bgColor
                      )}
                      style={{ width: `${widthPercent}%` }}
                    >
                      <span className="text-sm font-medium">{stage.label}</span>
                      <div className="flex items-center gap-2">
                        <span className={cn("text-sm font-bold", stage.color)}>
                          {stage.count}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatCurrency(stage.value)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conversion Arrow (except after last stage) */}
                {index < funnelStages.length - 1 && (
                  <div className="flex items-center gap-3 py-0.5">
                    <div className="w-8 flex justify-center">
                      <ArrowDown className="h-3 w-3 text-muted-foreground/50" />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {getConversionRate(index, index + 1)}% conversion
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionFunnel;
