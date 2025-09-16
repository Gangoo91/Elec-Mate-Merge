import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Target,
  TrendingUp,
  Calendar,
  Award
} from 'lucide-react';
import { useEnhancedCPD } from '@/hooks/cpd/useEnhancedCPD';

const ComplianceDashboard = () => {
  const { compliance, settings, reminders, loading } = useEnhancedCPD();

  if (loading || !compliance || !settings) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'at-risk':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'non-compliant':
        return <Shield className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'at-risk':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'non-compliant':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const progressPercentage = Math.round((compliance.hoursCompleted / compliance.hoursRequired) * 100);

  return (
    <div className="space-y-6">
      {/* High Priority Alerts */}
      {reminders.filter(r => r.priority === 'high').map(reminder => (
        <Alert key={reminder.id} className="border-red-500/30 bg-red-500/5">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-white">
            <strong>{reminder.title}:</strong> {reminder.message}
          </AlertDescription>
        </Alert>
      ))}

      {/* Overall Compliance Status */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            {getStatusIcon(compliance.overallStatus)}
            Overall Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(compliance.overallStatus)}>
              {compliance.overallStatus.replace('-', ' ').toUpperCase()}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {compliance.hoursCompleted} / {compliance.hoursRequired} hours completed
            </span>
          </div>
          
          <Progress value={Math.min(progressPercentage, 100)} className="h-3" />
          
          <div className="text-center">
            <span className="text-2xl font-bold text-foreground">{progressPercentage}%</span>
            <p className="text-sm text-muted-foreground">of annual target achieved</p>
          </div>
        </CardContent>
      </Card>

      {/* Professional Bodies Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settings.professionalBodies.map((body, index) => (
          <Card key={index} className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-foreground">{body.body} Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <Badge className={getStatusColor(body.complianceStatus)}>
                  {body.complianceStatus}
                </Badge>
                {body.membershipNumber && (
                  <span className="text-xs text-muted-foreground">
                    #{body.membershipNumber}
                  </span>
                )}
              </div>
              
              {body.renewalDate && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Renewal: {new Date(body.renewalDate).toLocaleDateString()}
                </div>
              )}
              
              {body.nextAssessment && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Award className="h-4 w-4" />
                  Assessment: {new Date(body.nextAssessment).toLocaleDateString()}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Gaps Analysis */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Category Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {compliance.categoryGaps.map((gap, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground capitalize">
                    {gap.category.replace('-', ' ')}
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline"
                      className={
                        gap.status === 'complete' 
                          ? 'text-green-400 border-green-500/30' 
                          : gap.status === 'on-track'
                          ? 'text-yellow-400 border-yellow-500/30'
                          : 'text-red-400 border-red-500/30'
                      }
                    >
                      {gap.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {gap.completed}/{gap.required}h
                    </span>
                  </div>
                </div>
                <Progress 
                  value={Math.min((gap.completed / gap.required) * 100, 100)} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {compliance.recommendations.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {compliance.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Target className="h-4 w-4 mt-0.5 text-blue-400 flex-shrink-0" />
                  {recommendation}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Deadlines */}
      {compliance.nextDeadlines.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Calendar className="h-5 w-5" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {compliance.nextDeadlines.slice(0, 3).map((deadline, index) => {
                const daysUntil = Math.ceil(
                  (new Date(deadline.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );
                
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{deadline.description}</p>
                      <p className="text-sm text-muted-foreground">{deadline.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {daysUntil > 0 ? `${daysUntil} days` : 'Overdue'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(deadline.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComplianceDashboard;