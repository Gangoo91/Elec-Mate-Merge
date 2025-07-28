import { Card, CardContent } from '@/components/ui/card';
import { FileText, Target, Clock, AlertTriangle } from 'lucide-react';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import { useComplianceTracking } from '@/hooks/time-tracking/useComplianceTracking';
import { useUltraFastPortfolio } from '@/hooks/portfolio/useUltraFastPortfolio';

const MetricCard = ({ 
  icon: Icon, 
  label, 
  value, 
  color,
  subText 
}: { 
  icon: any; 
  label: string; 
  value: string | number; 
  color: string;
  subText?: string;
}) => (
  <Card className="border-elec-yellow/20 bg-elec-gray">
    <CardContent className="p-6">
      <div className="flex flex-col items-center text-center space-y-3">
        <Icon className={`h-8 w-8 ${color}`} />
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {subText && (
            <p className="text-xs text-muted-foreground">{subText}</p>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

const LiveTrackingMetrics = () => {
  const { totalTime, isLoading: timeLoading } = useTimeEntries();
  const { otjGoal, getRemainingHours, isLoading: complianceLoading } = useComplianceTracking();
  const { entries, analytics, categories, isLoading: portfolioLoading } = useUltraFastPortfolio();

  if (timeLoading || complianceLoading || portfolioLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-6">
              <div className="animate-pulse flex flex-col items-center space-y-3">
                <div className="h-8 w-8 bg-elec-dark rounded"></div>
                <div className="space-y-1 text-center">
                  <div className="h-4 w-20 bg-elec-dark rounded"></div>
                  <div className="h-8 w-16 bg-elec-dark rounded"></div>
                  <div className="h-3 w-24 bg-elec-dark rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Portfolio metrics - sum up all required entries from qualification categories
  const totalRequiredEntries = categories.reduce((sum, category) => sum + (category.requiredEntries || 0), 0);
  const completedPortfolioEntries = analytics?.completedEntries || 0;
  const portfolioProgress = totalRequiredEntries > 0 ? Math.round((completedPortfolioEntries / totalRequiredEntries) * 100) : 0;

  // Compliance metrics - using 400h as standard 20% OTJ requirement
  const currentHours = otjGoal?.current_hours || 0;
  const targetHours = otjGoal?.target_hours || 400; // 20% of 2000-hour work year
  const remainingHours = getRemainingHours();
  const complianceProgress = Math.round((currentHours / targetHours) * 100);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <MetricCard
        icon={Target}
        label="Required Entries"
        value={totalRequiredEntries}
        color="text-elec-yellow"
        subText="Total portfolio items needed"
      />
      <MetricCard
        icon={FileText}
        label="Portfolio Progress"
        value={`${completedPortfolioEntries} (${portfolioProgress}%)`}
        color="text-green-400"
        subText="Completed portfolio items"
      />
      <MetricCard
        icon={AlertTriangle}
        label="Hours Needed"
        value={remainingHours > 0 ? `${remainingHours}h` : "Complete"}
        color={remainingHours > 0 ? "text-orange-400" : "text-green-400"}
        subText="For 20% OTJ requirement"
      />
      <MetricCard
        icon={Clock}
        label="Hours Progress"
        value={`${Math.round(currentHours)}h (${complianceProgress}%)`}
        color="text-purple-400"
        subText={`Of ${targetHours}h annual target`}
      />
    </div>
  );
};

export default LiveTrackingMetrics;