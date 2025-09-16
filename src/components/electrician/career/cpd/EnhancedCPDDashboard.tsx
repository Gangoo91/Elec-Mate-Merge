import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, 
  BookOpen, 
  Clock, 
  Download, 
  FileText, 
  Plus, 
  Target,
  CheckCircle,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { professionalBodyService, UserProfessionalMembership } from '@/services/professionalBodyService';
import { enhancedCPDService, CPDComplianceStats } from '@/services/enhancedCPDService';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProfessionalBodySelector from './ProfessionalBodySelector';

interface EnhancedCPDDashboardProps {
  onAddEntry?: () => void;
  onViewHistory?: () => void;
  onManageGoals?: () => void;
}

const EnhancedCPDDashboard: React.FC<EnhancedCPDDashboardProps> = ({ 
  onAddEntry, 
  onViewHistory, 
  onManageGoals 
}) => {
  const [memberships, setMemberships] = useState<UserProfessionalMembership[]>([]);
  const [selectedMembership, setSelectedMembership] = useState<UserProfessionalMembership | null>(null);
  const [complianceStats, setComplianceStats] = useState<CPDComplianceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSelector, setShowSelector] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadUserMemberships();
  }, []);

  useEffect(() => {
    if (selectedMembership) {
      loadComplianceStats(selectedMembership.professional_body_id);
    }
  }, [selectedMembership]);

  const loadUserMemberships = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setShowSelector(true);
        setLoading(false);
        return;
      }

      const userMemberships = await professionalBodyService.getUserMemberships(user.id);
      setMemberships(userMemberships);
      
      if (userMemberships.length === 0) {
        setShowSelector(true);
      } else {
        setSelectedMembership(userMemberships[0]);
      }
    } catch (error) {
      console.error('Error loading memberships:', error);
      toast({
        title: "Error loading memberships",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadComplianceStats = async (professionalBodyId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const stats = await enhancedCPDService.getComplianceStats(user.id, professionalBodyId);
      setComplianceStats(stats);
    } catch (error) {
      console.error('Error loading compliance stats:', error);
      toast({
        title: "Error loading compliance data",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const handleMembershipsComplete = (newMemberships: UserProfessionalMembership[]) => {
    setMemberships(newMemberships);
    setSelectedMembership(newMemberships[0]);
    setShowSelector(false);
  };

  const handleGeneratePortfolio = async () => {
    if (!selectedMembership) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const title = `${selectedMembership.professional_body?.name} CPD Portfolio ${new Date().getFullYear()}`;
      await enhancedCPDService.generatePortfolio(user.id, selectedMembership.professional_body_id, title);
      
      toast({
        title: "Portfolio generated",
        description: "Your CPD portfolio has been created and is ready for export.",
      });
    } catch (error) {
      console.error('Error generating portfolio:', error);
      toast({
        title: "Error generating portfolio",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (showSelector) {
    return <ProfessionalBodySelector onComplete={handleMembershipsComplete} />;
  }

  if (!selectedMembership || !complianceStats) {
    return (
      <div className="text-center space-y-4 p-8">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto" />
        <h3 className="text-lg font-semibold">Loading CPD Dashboard</h3>
        <p className="text-muted-foreground">Please wait while we load your compliance data...</p>
      </div>
    );
  }

  const getComplianceColor = (percentage: number) => {
    if (percentage >= 100) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComplianceIcon = (percentage: number) => {
    if (percentage >= 100) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (percentage >= 75) return <Clock className="h-5 w-5 text-yellow-600" />;
    return <AlertCircle className="h-5 w-5 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">CPD Tracker</h2>
          <p className="text-muted-foreground">
            Track your professional development against {selectedMembership.professional_body?.name} requirements
          </p>
        </div>
        
        {memberships.length > 1 && (
          <Tabs value={selectedMembership.id} onValueChange={(value) => {
            const membership = memberships.find(m => m.id === value);
            if (membership) setSelectedMembership(membership);
          }}>
            <TabsList>
              {memberships.map((membership) => (
                <TabsTrigger key={membership.id} value={membership.id}>
                  {membership.professional_body?.code}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                {getComplianceIcon(complianceStats.compliance_percentage)}
                <span>Overall Compliance</span>
              </CardTitle>
              <CardDescription>
                {complianceStats.total_hours} of {complianceStats.required_hours} hours completed
              </CardDescription>
            </div>
            <Badge 
              variant={complianceStats.compliance_percentage >= 100 ? "default" : "secondary"}
              className="text-lg px-3 py-1"
            >
              {complianceStats.compliance_percentage}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress 
            value={complianceStats.compliance_percentage} 
            className="w-full h-3"
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>0 hours</span>
            <span className={getComplianceColor(complianceStats.compliance_percentage)}>
              {complianceStats.total_hours} hours
            </span>
            <span>{complianceStats.required_hours} hours</span>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Category Requirements</CardTitle>
          <CardDescription>
            Progress by CPD category for {selectedMembership.professional_body?.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {complianceStats.categories.map((category) => (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{category.name}</span>
                <Badge variant={category.percentage >= 100 ? "default" : "secondary"}>
                  {category.completed_hours}h / {category.required_hours}h
                </Badge>
              </div>
              <Progress 
                value={Math.min(category.percentage, 100)} 
                className="w-full h-2"
              />
              <div className="text-sm text-muted-foreground">
                {category.percentage}% complete
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceStats.entries_count}</div>
            <p className="text-xs text-muted-foreground">
              CPD activities recorded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{complianceStats.verified_entries}</div>
            <p className="text-xs text-muted-foreground">
              Evidence verified
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{complianceStats.pending_verification}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting verification
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={onAddEntry} className="flex-1 min-w-[200px]">
          <Plus className="h-4 w-4 mr-2" />
          Add CPD Entry
        </Button>
        
        <Button variant="outline" onClick={onViewHistory} className="flex-1 min-w-[200px]">
          <BookOpen className="h-4 w-4 mr-2" />
          View History
        </Button>
        
        <Button variant="outline" onClick={handleGeneratePortfolio} className="flex-1 min-w-[200px]">
          <Download className="h-4 w-4 mr-2" />
          Export Portfolio
        </Button>
        
        <Button variant="outline" onClick={onManageGoals} className="flex-1 min-w-[200px]">
          <Target className="h-4 w-4 mr-2" />
          Manage Goals
        </Button>
      </div>

      {/* Next Renewal Reminder */}
      {selectedMembership.renewal_date && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-800">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Renewal</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700">
              Your {selectedMembership.professional_body?.name} membership renews on{' '}
              {new Date(selectedMembership.renewal_date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedCPDDashboard;