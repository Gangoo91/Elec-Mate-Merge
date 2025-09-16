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
  Award,
  Plus,
  Download,
  FileText,
  Bell
} from 'lucide-react';
import { useEnhancedCPD } from '@/hooks/cpd/useEnhancedCPD';
import { cpdExportService } from '@/services/cpdExportService';
import { useCPDData } from '@/hooks/cpd/useCPDData';
import { CPDStats } from '@/services/cpdDataService';

interface ComplianceDashboardProps {
  onAddEntry?: () => void;
  onViewHistory?: () => void;
  onManageGoals?: () => void;
}

const ComplianceDashboard = ({ onAddEntry, onViewHistory, onManageGoals }: ComplianceDashboardProps = {}) => {
  const { compliance, settings, reminders, loading } = useEnhancedCPD();
  const { entries, goals } = useCPDData();

  const handleExportPDF = () => {
    if (compliance && entries && goals) {
      const statsData: CPDStats = {
        totalHours: compliance.hoursCompleted,
        hoursThisYear: compliance.hoursCompleted,
        targetHours: compliance.hoursRequired,
        completionPercentage: Math.round((compliance.hoursCompleted / compliance.hoursRequired) * 100),
        daysRemaining: Math.ceil((new Date('2024-12-31').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
        hoursThisMonth: entries.filter(e => 
          new Date(e.date).getMonth() === new Date().getMonth() &&
          new Date(e.date).getFullYear() === new Date().getFullYear()
        ).reduce((sum, e) => sum + e.hours, 0),
        averageHoursPerMonth: compliance.hoursCompleted / 12,
        categoryBreakdown: compliance.categoryGaps.map(gap => ({
          category: gap.category,
          hours: gap.completed,
          percentage: Math.round((gap.completed / compliance.hoursCompleted) * 100)
        }))
      };
      cpdExportService.exportToPDF(entries, statsData, goals);
    }
  };

  const handleExportCSV = () => {
    if (entries) {
      cpdExportService.exportToCSV(entries);
    }
  };

  if (loading || !compliance || !settings) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-elec-grey animate-pulse">
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
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {onAddEntry && (
          <Button onClick={onAddEntry} className="bg-elec-yellow text-elec-dark hover:bg-amber-400">
            <Plus className="mr-2 h-4 w-4" />
            Add CPD Entry
          </Button>
        )}
        {onViewHistory && (
          <Button variant="outline" onClick={onViewHistory} className="border-elec-yellow/30">
            <Clock className="mr-2 h-4 w-4" />
            View History
          </Button>
        )}
        {onManageGoals && (
          <Button variant="outline" onClick={onManageGoals} className="border-elec-yellow/30">
            <Target className="mr-2 h-4 w-4" />
            Manage Goals
          </Button>
        )}
        <Button variant="outline" onClick={handleExportPDF} className="border-elec-yellow/30">
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
        <Button variant="outline" onClick={handleExportCSV} className="border-elec-yellow/30">
          <FileText className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Regulatory Compliance Status */}
      <Card className="bg-elec-grey border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Shield className="h-5 w-5 text-elec-yellow" />
            BS 7671 18th Edition Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/10 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">18th Edition</p>
              <p className="text-xs text-muted-foreground">Current Standard</p>
            </div>
            <div className="text-center p-4 bg-muted/10 rounded-lg">
              <Award className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Regulation Updates</p>
              <p className="text-xs text-muted-foreground">Amendment 2</p>
            </div>
            <div className="text-center p-4 bg-muted/10 rounded-lg">
              <Bell className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Next Review</p>
              <p className="text-xs text-muted-foreground">2025 Expected</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
      <Card className="bg-elec-grey border-border">
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
          <Card key={index} className="bg-elec-grey border-border">
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
      <Card className="bg-elec-grey border-border">
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
        <Card className="bg-elec-grey border-border">
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
        <Card className="bg-elec-grey border-border">
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