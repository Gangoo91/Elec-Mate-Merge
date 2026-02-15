import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { useToast } from '@/hooks/use-toast';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { cn } from '@/lib/utils';
import {
  Search,
  Building2,
  Users,
  Clock,
  CheckCircle2,
  Calendar,
  TrendingUp,
  MessageSquare,
  FileCheck,
  Star,
  Award,
  ChevronRight,
  Eye,
  AlertTriangle,
  ClipboardCheck,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EmployerApprentice {
  id: string;
  name: string;
  initials: string;
  photoUrl?: string;
  course: string;
  progress: number;
  attendance: number;
  status: 'on-track' | 'needs-attention' | 'at-risk' | 'excelling';
  offJobHours: number;
  targetOffJobHours: number;
  nextReview?: string;
  lastFeedback?: string;
  epaReadiness: number;
}

interface EmployerData {
  id: string;
  name: string;
  contactName: string;
  email: string;
  apprentices: EmployerApprentice[];
}

export function EmployerPortalSection() {
  const { students, courses } = useCollegeSupabase();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployer, setSelectedEmployer] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'overview' | 'detail'>('overview');

  // Create employer data by grouping students by employer_id
  const employerData = useMemo((): EmployerData[] => {
    // Group students by employer_id
    const employerMap = new Map<string, EmployerApprentice[]>();

    students.forEach((student) => {
      if (student.status !== 'Active' || !student.employer_id) return;

      const course = courses.find((c) => c.id === student.course_id);

      const initials = student.name
        .split(' ')
        .map((n) => n[0])
        .join('');

      const progress = student.progress_percent || 0;
      const attendance = 85; // Default since attendance field does not exist on Supabase type

      const apprentice: EmployerApprentice = {
        id: student.id,
        name: student.name,
        initials,
        photoUrl: student.photo_url || undefined,
        course: course?.name || 'Unknown Course',
        progress,
        attendance,
        status: getApprenticeStatus(progress, attendance),
        offJobHours: Math.floor(progress * 3.7), // Estimate
        targetOffJobHours: 370,
        epaReadiness: Math.min(100, progress * 1.1),
      };

      const existing = employerMap.get(student.employer_id) || [];
      employerMap.set(student.employer_id, [...existing, apprentice]);
    });

    // Convert to employer data array from grouped students
    const employerEntries: EmployerData[] = [];
    employerMap.forEach((apprentices, employerId) => {
      const shortId = employerId.length > 8 ? employerId.slice(0, 8) : employerId;
      employerEntries.push({
        id: employerId,
        name: 'Employer ' + shortId,
        contactName: 'Contact pending',
        email: '',
        apprentices,
      });
    });

    return employerEntries;
  }, [students, courses]);

  function getApprenticeStatus(
    progress: number,
    attendance: number
  ): 'on-track' | 'needs-attention' | 'at-risk' | 'excelling' {
    if (progress >= 90 && attendance >= 95) return 'excelling';
    if (progress >= 70 && attendance >= 85) return 'on-track';
    if (progress >= 50 || attendance >= 75) return 'needs-attention';
    return 'at-risk';
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excelling':
        return 'bg-success/20 text-success border-success/30';
      case 'on-track':
        return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30';
      case 'needs-attention':
        return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      case 'at-risk':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      default:
        return 'bg-muted text-white';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'excelling':
        return 'Excelling';
      case 'on-track':
        return 'On Track';
      case 'needs-attention':
        return 'Attention Needed';
      case 'at-risk':
        return 'At Risk';
      default:
        return status;
    }
  };

  const filteredEmployers = employerData.filter((employer) => {
    const matchesSearch =
      employer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employer.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employer.apprentices.some((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = selectedEmployer === 'all' || employer.id === selectedEmployer;

    return matchesSearch && matchesFilter;
  });

  const totalApprentices = employerData.reduce((sum, e) => sum + e.apprentices.length, 0);
  const excellingCount = employerData.reduce(
    (sum, e) => sum + e.apprentices.filter((a) => a.status === 'excelling').length,
    0
  );
  const atRiskCount = employerData.reduce(
    (sum, e) => sum + e.apprentices.filter((a) => a.status === 'at-risk').length,
    0
  );
  const avgProgress =
    employerData.length > 0
      ? Math.round(
          employerData.reduce(
            (sum, e) => sum + e.apprentices.reduce((s, a) => s + a.progress, 0),
            0
          ) / Math.max(1, totalApprentices)
        )
      : 0;

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Employer Portal"
        description={`${employerData.length} employers with ${totalApprentices} active apprentices`}
        action={
          <Button
            className="gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black h-11 touch-manipulation"
            onClick={() =>
              toast({
                title: 'Contact Employers',
                description: 'Employer messaging is coming soon.',
              })
            }
          >
            <MessageSquare className="h-4 w-4" />
            Contact Employers
          </Button>
        }
      />

      {/* Quick Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-white">{employerData.length}</p>
              <p className="text-xs text-white">Employers</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-info/10 border-info/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-info" />
            <div>
              <p className="text-lg font-bold text-white">{totalApprentices}</p>
              <p className="text-xs text-white">Apprentices</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-white">{excellingCount}</p>
              <p className="text-xs text-white">Excelling</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-white">{avgProgress}%</p>
              <p className="text-xs text-white">Avg Progress</p>
            </div>
          </CardContent>
        </Card>
        {atRiskCount > 0 && (
          <Card className="bg-destructive/10 border-destructive/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-lg font-bold text-white">{atRiskCount}</p>
                <p className="text-xs text-white">At Risk</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          {!searchQuery && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
          )}
          <Input
            placeholder="Search employers or apprentices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn('touch-manipulation', !searchQuery && 'pl-9')}
          />
        </div>
        <Select value={selectedEmployer} onValueChange={setSelectedEmployer}>
          <SelectTrigger className="w-full sm:w-[200px] h-11 touch-manipulation">
            <Building2 className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter employer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="touch-manipulation">
              All Employers
            </SelectItem>
            {employerData.map((employer) => (
              <SelectItem key={employer.id} value={employer.id} className="touch-manipulation">
                {employer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Employer Cards */}
      <div className="grid gap-4">
        {filteredEmployers.map((employer) => (
          <Card
            key={employer.id}
            className="border-elec-yellow/20 bg-elec-gray hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-elec-yellow/10">
                    <Building2 className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{employer.name}</CardTitle>
                    <p className="text-sm text-white">{employer.contactName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{employer.apprentices.length} apprentices</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Apprentice List */}
              <div className="space-y-2">
                {employer.apprentices.slice(0, 3).map((apprentice) => (
                  <div
                    key={apprentice.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border hover:border-elec-yellow/50 transition-colors cursor-pointer touch-manipulation"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={apprentice.photoUrl} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {apprentice.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium truncate">{apprentice.name}</p>
                        <Badge className={`shrink-0 text-xs ${getStatusColor(apprentice.status)}`}>
                          {getStatusLabel(apprentice.status)}
                        </Badge>
                      </div>
                      <p className="text-xs text-white truncate">{apprentice.course}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-xs text-white">
                          <TrendingUp className="h-3 w-3" />
                          <span>{apprentice.progress}%</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-white">
                          <Clock className="h-3 w-3" />
                          <span>{apprentice.offJobHours}h off-job</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-white">
                          <Award className="h-3 w-3" />
                          <span>EPA {Math.round(apprentice.epaReadiness)}%</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white" />
                  </div>
                ))}
                {employer.apprentices.length > 3 && (
                  <Button
                    variant="ghost"
                    className="w-full text-sm text-white h-11 touch-manipulation"
                  >
                    View {employer.apprentices.length - 3} more apprentices
                  </Button>
                )}
              </div>

              {/* Employer Actions */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 h-11 touch-manipulation"
                  onClick={() =>
                    toast({
                      title: 'Schedule Visit',
                      description: 'Employer visit scheduling is coming soon.',
                    })
                  }
                >
                  <Calendar className="h-3 w-3" />
                  Schedule Visit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 h-11 touch-manipulation"
                  onClick={() =>
                    toast({
                      title: 'Off-Job Review',
                      description: 'Off-the-job review tracking is coming soon.',
                    })
                  }
                >
                  <ClipboardCheck className="h-3 w-3" />
                  Off-Job Review
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 h-11 touch-manipulation"
                  onClick={() => {
                    if (employer.email) {
                      window.location.href = 'mailto:' + employer.email;
                    } else {
                      toast({
                        title: 'No email',
                        description: 'No contact email on file for this employer.',
                      });
                    }
                  }}
                >
                  <MessageSquare className="h-3 w-3" />
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 h-11 touch-manipulation"
                  onClick={() =>
                    toast({
                      title: 'Employer Reports',
                      description: 'Employer reporting is coming soon.',
                    })
                  }
                >
                  <Eye className="h-3 w-3" />
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredEmployers.length === 0 && (
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-8 text-center">
              <Building2 className="h-12 w-12 mx-auto mb-3 text-white opacity-50" />
              <p className="text-white">No employers found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Off-Job Training Summary */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            Off-the-Job Training Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-background border border-border text-center">
              <p className="text-2xl font-bold text-elec-yellow">
                {totalApprentices > 0 ? Math.round(avgProgress * 3.7) : 0}
              </p>
              <p className="text-xs text-white">Avg Hours Completed</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border text-center">
              <p className="text-2xl font-bold text-success">370</p>
              <p className="text-xs text-white">Target Hours</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border text-center">
              <p className="text-2xl font-bold text-info">20%</p>
              <p className="text-xs text-white">Required Rate</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border text-center">
              <p className="text-2xl font-bold text-white">
                {totalApprentices > 0 ? Math.round(((avgProgress * 3.7) / 370) * 100) : 0}%
              </p>
              <p className="text-xs text-white">Avg Completion</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
