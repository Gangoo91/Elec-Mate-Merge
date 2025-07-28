import { Card, CardContent } from '@/components/ui/card';
import { FileText, Target, Clock, AlertTriangle } from 'lucide-react';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import { useComplianceTracking } from '@/hooks/time-tracking/useComplianceTracking';

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
  <Card className="border-elec-yellow/20 bg-elec-dark">
    <CardContent className="p-4">
      <div className="flex items-center gap-2">
        <Icon className={`h-5 w-5 ${color}`} />
        <div className="flex-1">
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
  const { entries, totalTime, isLoading: timeLoading } = useTimeEntries();
  const { getRemainingHours, isLoading: complianceLoading } = useComplianceTracking();

  if (timeLoading || complianceLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-elec-yellow/20 bg-elec-dark">
            <CardContent className="p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-elec-gray rounded mb-2"></div>
                <div className="h-8 bg-elec-gray rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const completedEntries = entries.filter(entry => entry.duration > 0).length;
  const totalTimeLogged = `${totalTime.hours}h ${totalTime.minutes}m`;
  const remainingHours = getRemainingHours();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <MetricCard
        icon={FileText}
        label="Total Entries"
        value={entries.length}
        color="text-elec-yellow"
        subText="All time entries"
      />
      <MetricCard
        icon={Target}
        label="Completed"
        value={completedEntries}
        color="text-green-400"
        subText="With logged time"
      />
      <MetricCard
        icon={Clock}
        label="Time Logged"
        value={totalTimeLogged}
        color="text-purple-400"
        subText="Total tracked time"
      />
      <MetricCard
        icon={AlertTriangle}
        label="Hours Needed"
        value={remainingHours > 0 ? `${remainingHours}h` : "Complete"}
        color={remainingHours > 0 ? "text-orange-400" : "text-green-400"}
        subText="For 20% OTJ requirement"
      />
    </div>
  );
};

export default LiveTrackingMetrics;