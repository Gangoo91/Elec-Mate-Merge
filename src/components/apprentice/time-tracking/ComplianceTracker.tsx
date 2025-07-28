import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useComplianceTracking } from "@/hooks/time-tracking/useComplianceTracking";
import { Target, Clock, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const ComplianceTracker = () => {
  const { otjGoal, getComplianceStatus, getRemainingHours, isLoading } = useComplianceTracking();

  if (isLoading) {
    return (
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-elec-yellow/20 rounded w-3/4" />
            <div className="h-8 bg-elec-yellow/20 rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!otjGoal) {
    return (
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-light flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Compliance Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-elec-light/70 text-sm">
            No compliance goals set. Setting up default 20% off-the-job learning requirement...
          </p>
        </CardContent>
      </Card>
    );
  }

  const complianceStatus = getComplianceStatus();
  const remainingHours = getRemainingHours();
  const currentDate = new Date();
  const deadlineDate = otjGoal.deadline ? new Date(otjGoal.deadline) : null;
  const daysRemaining = deadlineDate ? Math.ceil((deadlineDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)) : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'border-green-500 text-green-400 bg-green-500/10';
      case 'on-track':
        return 'border-blue-500 text-blue-400 bg-blue-500/10';
      case 'at-risk':
        return 'border-yellow-500 text-yellow-400 bg-yellow-500/10';
      case 'behind':
        return 'border-red-500 text-red-400 bg-red-500/10';
      default:
        return 'border-elec-yellow/20 text-elec-light/70 bg-elec-yellow/5';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-4 w-4" />;
      case 'on-track':
        return <TrendingUp className="h-4 w-4" />;
      case 'at-risk':
        return <AlertTriangle className="h-4 w-4" />;
      case 'behind':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-elec-light flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          20% Off-the-Job Learning
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Overview */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-elec-light/70">Progress</span>
            <span className="text-elec-light">{otjGoal.compliance_percentage}%</span>
          </div>
          <Progress 
            value={otjGoal.compliance_percentage} 
            className="h-2"
          />
          <div className="flex justify-between text-xs text-elec-light/50">
            <span>{otjGoal.current_hours}h completed</span>
            <span>{otjGoal.target_hours}h target</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getStatusColor(complianceStatus.status)}>
            {getStatusIcon(complianceStatus.status)}
            <span className="ml-1">{complianceStatus.message}</span>
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-elec-dark/50 rounded-lg p-3">
            <div className="text-lg font-bold text-elec-yellow">
              {remainingHours}h
            </div>
            <div className="text-xs text-elec-light/70">
              Remaining
            </div>
          </div>
          {daysRemaining !== null && (
            <div className="bg-elec-dark/50 rounded-lg p-3">
              <div className="text-lg font-bold text-elec-yellow">
                {daysRemaining > 0 ? daysRemaining : 0}
              </div>
              <div className="text-xs text-elec-light/70">
                Days left
              </div>
            </div>
          )}
        </div>

        {/* Recommendations */}
        {complianceStatus.status !== 'compliant' && (
          <div className="bg-elec-dark/30 rounded-lg p-3 border border-elec-yellow/10">
            <p className="text-xs text-elec-light/70 mb-2">Recommendation:</p>
            {complianceStatus.status === 'behind' && remainingHours > 0 && daysRemaining && (
              <p className="text-sm text-elec-light">
                Track {Math.ceil(remainingHours / (daysRemaining / 7))} hours per week to meet your target.
              </p>
            )}
            {complianceStatus.status === 'at-risk' && (
              <p className="text-sm text-elec-light">
                Increase your weekly learning hours to stay on track.
              </p>
            )}
            {complianceStatus.status === 'on-track' && (
              <p className="text-sm text-elec-light">
                Keep up the good work! Maintain your current pace.
              </p>
            )}
          </div>
        )}

        {/* Action Button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            // This could open a detailed compliance view or study planning tool
            console.log('Open compliance details');
          }}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          View Detailed Progress
        </Button>
      </CardContent>
    </Card>
  );
};

export default ComplianceTracker;