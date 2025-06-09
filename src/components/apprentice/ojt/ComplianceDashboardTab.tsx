
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Clock, Target, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const ComplianceDashboardTab = () => {
  const { user } = useAuth();

  // Fetch compliance tracking data
  const { data: complianceData = [] } = useQuery({
    queryKey: ['compliance-tracking', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('compliance_tracking')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });

  // Calculate compliance statistics
  const totalRequirements = complianceData.length;
  const completedRequirements = complianceData.filter(item => item.status === 'completed').length;
  const overallProgress = totalRequirements > 0 ? (completedRequirements / totalRequirements) * 100 : 0;

  // Off-the-job training hours calculation
  const offJobRequirement = complianceData.find(item => item.requirement_type === 'off_job_training');
  const offJobProgress = offJobRequirement 
    ? Math.min((offJobRequirement.completed_hours / offJobRequirement.target_hours) * 100, 100)
    : 0;

  // Compliance requirements data
  const defaultComplianceItems = [
    {
      id: 'off-job-training',
      title: '20% Off-the-Job Training',
      description: 'Minimum 20% of working hours must be spent on off-the-job training',
      targetHours: 312, // Based on 1560 total hours for Level 3 apprenticeship
      completedHours: offJobRequirement?.completed_hours || 45,
      status: offJobProgress >= 100 ? 'completed' : 'in_progress',
      deadline: '2024-12-31'
    },
    {
      id: 'portfolio',
      title: 'Portfolio Completion',
      description: 'Comprehensive portfolio demonstrating competencies',
      targetHours: null,
      completedHours: null,
      status: 'in_progress',
      deadline: '2024-11-30'
    },
    {
      id: 'epa',
      title: 'End-Point Assessment',
      description: 'Successfully complete EPA with independent assessor',
      targetHours: null,
      completedHours: null,
      status: 'not_started',
      deadline: '2025-01-15'
    },
    {
      id: 'maths-english',
      title: 'Functional Skills',
      description: 'Level 2 Maths and English qualifications',
      targetHours: null,
      completedHours: null,
      status: 'completed',
      deadline: '2024-06-30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'in_progress':
        return 'text-blue-500';
      case 'not_started':
        return 'text-gray-500';
      case 'at_risk':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'not_started':
        return <Target className="h-5 w-5 text-gray-500" />;
      case 'at_risk':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress.toFixed(0)}%</div>
            <Progress value={overallProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Apprenticeship completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Off-Job Training</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offJobProgress.toFixed(0)}%</div>
            <Progress value={offJobProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              45/312 hours completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1/4</div>
            <p className="text-xs text-muted-foreground">
              Major requirements
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Deadline</CardTitle>
            <Target className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30</div>
            <p className="text-xs text-muted-foreground">
              Days to portfolio
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Compliance Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {defaultComplianceItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(item.status)}
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    {item.deadline && (
                      <p className="text-xs text-muted-foreground">
                        Deadline: {new Date(item.deadline).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                    {item.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                </div>
                
                {item.targetHours && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{item.completedHours}/{item.targetHours} hours</span>
                    </div>
                    <Progress 
                      value={Math.min((item.completedHours / item.targetHours) * 100, 100)} 
                      className="h-2"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Stay on track with off-the-job training</p>
                <p className="text-sm text-muted-foreground">
                  Aim for 1.5-2 hours per week to meet your 20% requirement
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Document everything</p>
                <p className="text-sm text-muted-foreground">
                  Keep evidence of all training activities and learning outcomes
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Prepare for EPA early</p>
                <p className="text-sm text-muted-foreground">
                  Start EPA preparation 6 months before your planned completion date
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceDashboardTab;
