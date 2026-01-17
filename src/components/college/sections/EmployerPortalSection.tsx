import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { useCollege } from "@/contexts/CollegeContext";
import { cn } from "@/lib/utils";
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
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EmployerApprentice {
  id: string;
  name: string;
  initials: string;
  photoUrl?: string;
  course: string;
  progress: number;
  attendance: number;
  status: "on-track" | "needs-attention" | "at-risk" | "excelling";
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
  lastVisit?: string;
  nextVisit?: string;
  satisfactionRating?: number;
}

export function EmployerPortalSection() {
  const { students, cohorts, courses, employers } = useCollege();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployer, setSelectedEmployer] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"overview" | "detail">("overview");

  // Create employer data from context
  const employerData = useMemo((): EmployerData[] => {
    // Group students by employer
    const employerMap = new Map<string, EmployerApprentice[]>();

    students.forEach(student => {
      if (student.status !== 'Active' || !student.employerId) return;

      const employer = employers.find(e => e.id === student.employerId);
      if (!employer) return;

      const course = courses.find(c => c.id === student.courseId);

      const apprentice: EmployerApprentice = {
        id: student.id,
        name: student.name,
        initials: student.avatarInitials || student.name.split(' ').map(n => n[0]).join(''),
        photoUrl: student.photoUrl,
        course: course?.name || 'Unknown Course',
        progress: student.progressPercentage || 0,
        attendance: student.attendancePercentage || 0,
        status: getApprenticeStatus(student.progressPercentage || 0, student.attendancePercentage || 0),
        offJobHours: Math.floor((student.progressPercentage || 0) * 3.7), // Estimate
        targetOffJobHours: 370,
        epaReadiness: Math.min(100, (student.progressPercentage || 0) * 1.1),
      };

      const existing = employerMap.get(employer.id) || [];
      employerMap.set(employer.id, [...existing, apprentice]);
    });

    // Convert to employer data array
    return employers.map(employer => ({
      id: employer.id,
      name: employer.name,
      contactName: employer.contactName || 'Unknown',
      email: employer.email || '',
      apprentices: employerMap.get(employer.id) || [],
      lastVisit: getRandomPastDate(30),
      nextVisit: getRandomFutureDate(30),
      satisfactionRating: 4 + Math.random(),
    })).filter(e => e.apprentices.length > 0);
  }, [students, employers, courses]);

  function getApprenticeStatus(progress: number, attendance: number): "on-track" | "needs-attention" | "at-risk" | "excelling" {
    if (progress >= 90 && attendance >= 95) return "excelling";
    if (progress >= 70 && attendance >= 85) return "on-track";
    if (progress >= 50 || attendance >= 75) return "needs-attention";
    return "at-risk";
  }

  function getRandomPastDate(daysAgo: number): string {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
    return date.toISOString();
  }

  function getRandomFutureDate(daysAhead: number): string {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * daysAhead));
    return date.toISOString();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excelling": return "bg-success/20 text-success border-success/30";
      case "on-track": return "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30";
      case "needs-attention": return "bg-amber-500/20 text-amber-500 border-amber-500/30";
      case "at-risk": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "excelling": return "Excelling";
      case "on-track": return "On Track";
      case "needs-attention": return "Attention Needed";
      case "at-risk": return "At Risk";
      default: return status;
    }
  };

  const filteredEmployers = employerData.filter(employer => {
    const matchesSearch = employer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employer.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employer.apprentices.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = selectedEmployer === "all" || employer.id === selectedEmployer;

    return matchesSearch && matchesFilter;
  });

  const totalApprentices = employerData.reduce((sum, e) => sum + e.apprentices.length, 0);
  const excellingCount = employerData.reduce((sum, e) =>
    sum + e.apprentices.filter(a => a.status === "excelling").length, 0);
  const atRiskCount = employerData.reduce((sum, e) =>
    sum + e.apprentices.filter(a => a.status === "at-risk").length, 0);
  const avgProgress = employerData.length > 0
    ? Math.round(employerData.reduce((sum, e) =>
        sum + e.apprentices.reduce((s, a) => s + a.progress, 0), 0) / Math.max(1, totalApprentices))
    : 0;

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Employer Portal"
        description={`${employerData.length} employers with ${totalApprentices} active apprentices`}
        action={
          <Button className="gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black">
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
              <p className="text-lg font-bold text-foreground">{employerData.length}</p>
              <p className="text-xs text-muted-foreground">Employers</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-info/10 border-info/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-info" />
            <div>
              <p className="text-lg font-bold text-foreground">{totalApprentices}</p>
              <p className="text-xs text-muted-foreground">Apprentices</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">{excellingCount}</p>
              <p className="text-xs text-muted-foreground">Excelling</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{avgProgress}%</p>
              <p className="text-xs text-muted-foreground">Avg Progress</p>
            </div>
          </CardContent>
        </Card>
        {atRiskCount > 0 && (
          <Card className="bg-destructive/10 border-destructive/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-lg font-bold text-foreground">{atRiskCount}</p>
                <p className="text-xs text-muted-foreground">At Risk</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          {!searchQuery && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          )}
          <Input
            placeholder="Search employers or apprentices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(!searchQuery && "pl-9")}
          />
        </div>
        <Select value={selectedEmployer} onValueChange={setSelectedEmployer}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Building2 className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter employer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Employers</SelectItem>
            {employerData.map(employer => (
              <SelectItem key={employer.id} value={employer.id}>
                {employer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Employer Cards */}
      <div className="grid gap-4">
        {filteredEmployers.map(employer => (
          <Card key={employer.id} className="border-elec-yellow/20 bg-elec-gray hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-elec-yellow/10">
                    <Building2 className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{employer.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{employer.contactName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {employer.satisfactionRating && (
                    <Badge className="bg-success/20 text-success gap-1">
                      <Star className="h-3 w-3" />
                      {employer.satisfactionRating.toFixed(1)}
                    </Badge>
                  )}
                  <Badge variant="outline">{employer.apprentices.length} apprentices</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Apprentice List */}
              <div className="space-y-2">
                {employer.apprentices.slice(0, 3).map(apprentice => (
                  <div
                    key={apprentice.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border hover:border-elec-yellow/50 transition-colors cursor-pointer"
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
                      <p className="text-xs text-muted-foreground truncate">{apprentice.course}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <TrendingUp className="h-3 w-3" />
                          <span>{apprentice.progress}%</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{apprentice.offJobHours}h off-job</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Award className="h-3 w-3" />
                          <span>EPA {Math.round(apprentice.epaReadiness)}%</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
                {employer.apprentices.length > 3 && (
                  <Button variant="ghost" className="w-full text-sm text-muted-foreground">
                    View {employer.apprentices.length - 3} more apprentices
                  </Button>
                )}
              </div>

              {/* Employer Actions */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                <Button variant="outline" size="sm" className="gap-1">
                  <Calendar className="h-3 w-3" />
                  Schedule Visit
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <ClipboardCheck className="h-3 w-3" />
                  Off-Job Review
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <MessageSquare className="h-3 w-3" />
                  Send Message
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Eye className="h-3 w-3" />
                  View Reports
                </Button>
              </div>

              {/* Next Visit Info */}
              {employer.nextVisit && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-info/10 border border-info/20">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-info" />
                    <span className="text-sm text-info">Next employer visit</span>
                  </div>
                  <span className="text-sm font-medium text-info">
                    {new Date(employer.nextVisit).toLocaleDateString('en-GB', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredEmployers.length === 0 && (
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-8 text-center">
              <Building2 className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No employers found matching your search.</p>
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
              <p className="text-xs text-muted-foreground">Avg Hours Completed</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border text-center">
              <p className="text-2xl font-bold text-success">370</p>
              <p className="text-xs text-muted-foreground">Target Hours</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border text-center">
              <p className="text-2xl font-bold text-info">20%</p>
              <p className="text-xs text-muted-foreground">Required Rate</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border text-center">
              <p className="text-2xl font-bold text-foreground">
                {totalApprentices > 0 ? Math.round((avgProgress * 3.7 / 370) * 100) : 0}%
              </p>
              <p className="text-xs text-muted-foreground">Avg Completion</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
