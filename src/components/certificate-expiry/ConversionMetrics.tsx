import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Clock, CheckCircle2, Users } from 'lucide-react';
import { ConversionMetrics as ConversionMetricsType } from '@/utils/analyticsHelper';
import { formatResponseTime } from '@/utils/analyticsHelper';

interface ConversionMetricsProps {
  metrics: ConversionMetricsType;
}

export const ConversionMetrics = ({ metrics }: ConversionMetricsProps) => {
  return (
    <Card className="bg-gradient-to-br from-neutral-900 to-neutral-800 border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-foreground">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          Conversion Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="space-y-2 p-3 sm:p-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Users className="h-5 w-5 text-elec-yellow shrink-0" />
                <span className="text-sm sm:text-base font-medium truncate text-foreground">Contact Rate</span>
              </div>
              <span className="text-base sm:text-lg font-bold shrink-0 text-foreground">{metrics.contactRate.toFixed(1)}%</span>
            </div>
            <Progress value={metrics.contactRate} className="h-2.5" />
            <p className="text-xs sm:text-sm text-neutral-400 leading-tight">
              Clients contacted from total reminders
            </p>
          </div>

          <div className="space-y-2 p-3 sm:p-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 className="h-5 w-5 text-elec-yellow shrink-0" />
                <span className="text-sm sm:text-base font-medium truncate text-foreground">Booking Rate</span>
              </div>
              <span className="text-base sm:text-lg font-bold shrink-0 text-foreground">{metrics.bookingRate.toFixed(1)}%</span>
            </div>
            <Progress value={metrics.bookingRate} className="h-2.5" />
            <p className="text-xs sm:text-sm text-neutral-400 leading-tight">
              Bookings from contacted clients
            </p>
          </div>

          <div className="space-y-2 p-3 sm:p-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <TrendingUp className="h-5 w-5 text-elec-yellow shrink-0" />
                <span className="text-sm sm:text-base font-medium truncate text-foreground">Completion Rate</span>
              </div>
              <span className="text-base sm:text-lg font-bold shrink-0 text-foreground">{metrics.completionRate.toFixed(1)}%</span>
            </div>
            <Progress value={metrics.completionRate} className="h-2.5" />
            <p className="text-xs sm:text-sm text-neutral-400 leading-tight">
              Jobs completed from bookings
            </p>
          </div>

          <div className="space-y-2 p-3 sm:p-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Clock className="h-5 w-5 text-elec-yellow shrink-0" />
                <span className="text-sm sm:text-base font-medium truncate text-foreground">Avg Response</span>
              </div>
              <span className="text-base sm:text-lg font-bold shrink-0 text-foreground">
                {metrics.avgResponseTime > 0 ? formatResponseTime(metrics.avgResponseTime) : 'N/A'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 leading-tight">
              Average time from reminder to contact
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
