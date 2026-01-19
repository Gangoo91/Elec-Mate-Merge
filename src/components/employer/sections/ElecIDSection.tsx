import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useElecIdProfiles, useVerifyElecIdProfile, useGenerateShareableLink, useCreateElecIdProfile } from "@/hooks/useElecId";
import { useEmployees } from "@/hooks/useEmployees";
import { ElecIdProfile } from "@/services/elecIdService";
import { ElecIDCard } from "@/components/employer/ElecIDCard";
import { ShareElecIDDialog } from "@/components/employer/dialogs/ShareElecIDDialog";
import { AddTrainingRecordDialog } from "@/components/employer/dialogs/AddTrainingRecordDialog";
import { ScanElecIDDialog } from "@/components/employer/dialogs/ScanElecIDDialog";
import { AddCertificationDialog } from "@/components/employer/dialogs/AddCertificationDialog";
import { AddSkillDialog } from "@/components/employer/dialogs/AddSkillDialog";
import { AddWorkHistoryDialog } from "@/components/employer/dialogs/AddWorkHistoryDialog";
import { CreateElecIDForEmployeeDialog } from "@/components/employer/dialogs/CreateElecIDForEmployeeDialog";
import { 
  CreditCard, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Award,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Building,
  ChevronRight,
  Briefcase,
  Star,
  QrCode,
  User,
  Clock,
  BarChart3,
  RefreshCw,
  Plus,
  UserPlus,
  Loader2
} from "lucide-react";

const statusConfig = {
  "Active": { 
    bg: "bg-success/20", 
    text: "text-success", 
    border: "border-success/30",
    accent: "border-l-success",
    icon: CheckCircle2 
  },
  "Valid": { 
    bg: "bg-success/20", 
    text: "text-success", 
    border: "border-success/30",
    accent: "border-l-success",
    icon: CheckCircle2 
  },
  "Warning": { 
    bg: "bg-warning/20", 
    text: "text-warning", 
    border: "border-warning/30",
    accent: "border-l-warning",
    icon: AlertTriangle 
  },
  "Expiring": { 
    bg: "bg-warning/20", 
    text: "text-warning", 
    border: "border-warning/30",
    accent: "border-l-warning",
    icon: AlertTriangle 
  },
  "Expired": { 
    bg: "bg-destructive/20", 
    text: "text-destructive", 
    border: "border-destructive/30",
    accent: "border-l-destructive",
    icon: XCircle 
  },
};

const skillLevelColors: Record<string, string> = {
  "beginner": "bg-muted text-foreground/70",
  "intermediate": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "advanced": "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30",
  "expert": "bg-success/20 text-success border-success/30",
};

// Helper to get certification status from expiry date
const getCertStatus = (expiryDate: string | null): string => {
  if (!expiryDate) return "Active";
  const expiry = new Date(expiryDate);
  const now = new Date();
  const daysUntil = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntil < 0) return "Expired";
  if (daysUntil <= 30) return "Warning";
  return "Active";
};

// Helper to get ECS card status
const getEcsStatus = (expiryDate: string | null): string => {
  if (!expiryDate) return "Active";
  const expiry = new Date(expiryDate);
  const now = new Date();
  const daysUntil = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntil < 0) return "Expired";
  if (daysUntil <= 60) return "Expiring";
  return "Valid";
};

export const ElecIDSection = () => {
  const isMobile = useIsMobile();
  const { data: profiles, isLoading, refetch } = useElecIdProfiles();
  const { data: employees } = useEmployees();
  const verifyProfile = useVerifyElecIdProfile();
  const generateLink = useGenerateShareableLink();
  const createElecIdProfile = useCreateElecIdProfile();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<ElecIdProfile | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [addTrainingDialogOpen, setAddTrainingDialogOpen] = useState(false);
  const [addSkillDialogOpen, setAddSkillDialogOpen] = useState(false);
  const [addWorkHistoryDialogOpen, setAddWorkHistoryDialogOpen] = useState(false);
  const [scanDialogOpen, setScanDialogOpen] = useState(false);
  const [mainTab, setMainTab] = useState<"workers" | "compliance">("workers");
  const [createElecIdSheetOpen, setCreateElecIdSheetOpen] = useState(false);
  const [createElecIdDialogOpen, setCreateElecIdDialogOpen] = useState(false);
  const [selectedEmployeeForElecId, setSelectedEmployeeForElecId] = useState<{ id: string; name: string } | null>(null);
  const [bulkCreating, setBulkCreating] = useState(false);

  // Find employees without Elec-IDs
  const employeesWithoutElecId = useMemo(() => {
    if (!employees || !profiles) return [];
    const profileEmployeeIds = new Set(profiles.map(p => p.employee_id));
    return employees.filter(emp => !profileEmployeeIds.has(emp.id));
  }, [employees, profiles]);

  // Set first profile as selected when data loads - use useMemo to avoid state update during render
  const effectiveSelectedProfile = useMemo(() => {
    if (selectedProfile) return selectedProfile;
    if (profiles && profiles.length > 0) return profiles[0];
    return null;
  }, [selectedProfile, profiles]);

  const filteredProfiles = profiles?.filter(p =>
    p.employee?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.employee?.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.elec_id_number.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Aggregate compliance stats from certifications table
  const certifications = employees?.flatMap(emp => {
    // Get certifications for this employee from the profiles
    const profile = profiles?.find(p => p.employee_id === emp.id);
    return profile?.qualifications?.map(q => ({
      ...q,
      workerName: emp.name,
      workerId: emp.id,
      status: getCertStatus(q.date_achieved),
    })) || [];
  }) || [];

  // Also get training records for expiry tracking
  const allTraining = profiles?.flatMap(p => 
    p.training?.map(t => ({
      ...t,
      workerName: p.employee?.name,
      workerId: p.employee_id,
      status: getCertStatus(t.expiry_date),
    })) || []
  ) || [];

  const expiredItems = allTraining.filter(t => t.status === "Expired");
  const warningItems = allTraining.filter(t => t.status === "Warning");
  const activeItems = allTraining.filter(t => t.status === "Active");

  const handleVerifyCredentials = async () => {
    if (!effectiveSelectedProfile) return;
    
    try {
      await verifyProfile.mutateAsync({ id: effectiveSelectedProfile.id, verifiedBy: "Employer Admin" });
      toast({
        title: "Credentials Verified",
        description: `${effectiveSelectedProfile.employee?.name}'s credentials have been verified.`,
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Could not verify credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRenewCert = (certName: string, workerName: string) => {
    toast({
      title: "Renewal Initiated",
      description: `Renewal process started for ${certName} (${workerName}).`,
    });
  };

  const handleProfileSelect = (profile: ElecIdProfile) => {
    setSelectedProfile(profile);
    if (isMobile) {
      setSheetOpen(true);
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
          <div className="lg:col-span-2">
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const ProfileDetail = () => {
    if (!effectiveSelectedProfile) return null;
    
    const ecsStatus = getEcsStatus(effectiveSelectedProfile.ecs_expiry_date);
    const config = statusConfig[ecsStatus as keyof typeof statusConfig] || statusConfig.Active;
    
    // Create a profile-like object for the ElecIDCard
    const cardProfile = {
      id: effectiveSelectedProfile.id,
      employeeId: effectiveSelectedProfile.employee_id,
      elecIdNumber: effectiveSelectedProfile.elec_id_number,
      name: effectiveSelectedProfile.employee?.name || "Unknown",
      role: effectiveSelectedProfile.employee?.role || "Electrician",
      photo: effectiveSelectedProfile.employee?.photo_url,
      bio: effectiveSelectedProfile.bio || "",
      yearsExperience: 0,
      ecsCardType: effectiveSelectedProfile.ecs_card_type || "Gold Card",
      ecsCardNumber: effectiveSelectedProfile.ecs_card_number || "",
      ecsExpiry: effectiveSelectedProfile.ecs_expiry_date || "",
      ecsStatus,
      skills: effectiveSelectedProfile.skills?.map(s => ({
        name: s.skill_name,
        level: s.skill_level.charAt(0).toUpperCase() + s.skill_level.slice(1) as "Beginner" | "Intermediate" | "Advanced" | "Expert",
        yearsExperience: s.years_experience,
        verified: s.is_verified,
      })) || [],
      workHistory: effectiveSelectedProfile.work_history?.map(w => ({
        id: w.id,
        employer: w.employer_name,
        role: w.job_title,
        location: "",
        startDate: w.start_date,
        endDate: w.end_date,
        isCurrent: w.is_current,
        description: w.description || "",
        projects: w.projects || [],
        referenceAvailable: false,
        verified: w.is_verified,
      })) || [],
      certifications: effectiveSelectedProfile.qualifications?.map(q => ({
        name: q.qualification_name,
        issuer: q.awarding_body || "",
        certNumber: q.certificate_number || "",
        issueDate: q.date_achieved || "",
        expiryDate: q.date_achieved || "",
        status: "Active" as const,
        verified: q.is_verified,
      })) || [],
      training: effectiveSelectedProfile.training?.map(t => ({
        id: t.id,
        name: t.training_name,
        provider: t.provider || "",
        completedDate: t.completed_date || "",
        certificateId: t.certificate_id || "",
        fundedBy: t.funded_by || "",
        ownedBy: "worker" as const,
        verified: t.status === "valid",
      })) || [],
      qualifications: effectiveSelectedProfile.qualifications?.map(q => ({
        name: q.qualification_name,
        issuer: q.awarding_body || "",
        year: q.date_achieved ? new Date(q.date_achieved).getFullYear().toString() : "",
      })) || [],
      verified: effectiveSelectedProfile.is_verified,
      lastVerified: effectiveSelectedProfile.verified_at || "",
      profileViews: effectiveSelectedProfile.profile_views,
      shareableLink: effectiveSelectedProfile.shareable_link || undefined,
    };

    return (
      <div className="space-y-4">
        <ElecIDCard
          profile={cardProfile}
          onShare={() => setShareDialogOpen(true)}
        />

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleVerifyCredentials} size="sm" className="gap-2" disabled={verifyProfile.isPending}>
            <ShieldCheck className="h-4 w-4" />
            {verifyProfile.isPending ? "Verifying..." : "Verify Credentials"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setAddTrainingDialogOpen(true)} className="gap-2">
            <GraduationCap className="h-4 w-4" />
            Add Training
          </Button>
          <Button variant="outline" size="sm" onClick={() => setAddSkillDialogOpen(true)} className="gap-2">
            <Star className="h-4 w-4" />
            Add Skill
          </Button>
          <Button variant="outline" size="sm" onClick={() => setAddWorkHistoryDialogOpen(true)} className="gap-2">
            <Briefcase className="h-4 w-4" />
            Add Work History
          </Button>
        </div>

        <Tabs defaultValue="skills">
          <TabsList className="w-full grid grid-cols-5 h-auto">
            <TabsTrigger value="skills" className="gap-1 text-xs py-2 px-1">
              <Star className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="gap-1 text-xs py-2 px-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Training</span>
            </TabsTrigger>
            <TabsTrigger value="workhistory" className="gap-1 text-xs py-2 px-1">
              <Briefcase className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="qualifications" className="gap-1 text-xs py-2 px-1">
              <GraduationCap className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Quals</span>
            </TabsTrigger>
            <TabsTrigger value="certifications" className="gap-1 text-xs py-2 px-1">
              <Award className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Certs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="skills" className="mt-4 space-y-3">
            {effectiveSelectedProfile.skills?.length === 0 ? (
              <Card className="bg-elec-gray border-border">
                <CardContent className="p-6 text-center">
                  <Star className="h-10 w-10 text-foreground/70 mx-auto mb-3" />
                  <p className="text-foreground/70 text-sm">No skills recorded yet</p>
                  <Button variant="outline" size="sm" className="mt-3 gap-2" onClick={() => setAddSkillDialogOpen(true)}>
                    <Plus className="h-4 w-4" />
                    Add Skill
                  </Button>
                </CardContent>
              </Card>
            ) : (
              effectiveSelectedProfile.skills?.map((skill) => (
                <Card key={skill.id} className="bg-elec-gray border-border">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground text-sm">{skill.skill_name}</h4>
                        {skill.is_verified && (
                          <ShieldCheck className="h-4 w-4 text-success" />
                        )}
                      </div>
                      <Badge className={skillLevelColors[skill.skill_level.toLowerCase()] || skillLevelColors.intermediate}>
                        {skill.skill_level.charAt(0).toUpperCase() + skill.skill_level.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress 
                        value={skill.skill_level === 'beginner' ? 25 : skill.skill_level === 'intermediate' ? 50 : skill.skill_level === 'advanced' ? 75 : 100} 
                        className="h-2 flex-1"
                      />
                      {skill.years_experience > 0 && (
                        <span className="text-xs text-foreground/70 whitespace-nowrap">
                          {skill.years_experience} yrs
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="training" className="mt-4 space-y-3">
            {effectiveSelectedProfile.training?.length === 0 ? (
              <Card className="bg-elec-gray border-border">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-10 w-10 text-foreground/70 mx-auto mb-3" />
                  <p className="text-foreground/70 text-sm">No training records found</p>
                  <Button variant="outline" size="sm" className="mt-3 gap-2" onClick={() => setAddTrainingDialogOpen(true)}>
                    <GraduationCap className="h-4 w-4" />
                    Add Training Record
                  </Button>
                </CardContent>
              </Card>
            ) : (
              effectiveSelectedProfile.training?.map((train) => (
                <Card key={train.id} className="bg-elec-gray border-border">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground text-sm">{train.training_name}</h4>
                          {train.status === 'valid' && (
                            <ShieldCheck className="h-4 w-4 text-success flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs text-foreground/70 flex-wrap">
                          {train.provider && (
                            <span className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              {train.provider}
                            </span>
                          )}
                          {train.funded_by && (
                            <span className="text-elec-yellow/70">Funded by {train.funded_by}</span>
                          )}
                        </div>
                        <p className="text-[10px] text-elec-yellow/60 mt-1 flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          Worker-owned • Portable
                        </p>
                      </div>
                      {train.completed_date && (
                        <div className="text-right text-sm flex-shrink-0">
                          <p className="text-foreground/70 text-xs">Completed</p>
                          <p className="text-foreground font-medium">
                            {new Date(train.completed_date).toLocaleDateString('en-GB')}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="workhistory" className="mt-4 space-y-3">
            {effectiveSelectedProfile.work_history?.length === 0 ? (
              <Card className="bg-elec-gray border-border">
                <CardContent className="p-6 text-center">
                  <Briefcase className="h-10 w-10 text-foreground/70 mx-auto mb-3" />
                  <p className="text-foreground/70 text-sm">No work history on record</p>
                  <Button variant="outline" size="sm" className="mt-3 gap-2" onClick={() => setAddWorkHistoryDialogOpen(true)}>
                    <Plus className="h-4 w-4" />
                    Add Work History
                  </Button>
                </CardContent>
              </Card>
            ) : (
              effectiveSelectedProfile.work_history?.map((job) => (
                <Card key={job.id} className={`bg-elec-gray border-border ${job.is_current ? 'border-elec-yellow/30' : ''}`}>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-medium text-foreground text-sm">{job.job_title}</h4>
                          {job.is_current && (
                            <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30 text-[10px]">Current</Badge>
                          )}
                          {job.is_verified && (
                            <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-[10px]">
                              <ShieldCheck className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-foreground/70 flex items-center gap-1 mt-1">
                          <Building className="h-3 w-3" />
                          {job.employer_name}
                        </p>
                        {job.description && (
                          <p className="text-xs text-foreground/70 mt-2 line-clamp-2">{job.description}</p>
                        )}
                        {job.projects && job.projects.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {job.projects.slice(0, 3).map((project, idx) => (
                              <Badge key={idx} variant="secondary" className="text-[10px]">{project}</Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right text-xs flex-shrink-0">
                        <p className="text-foreground font-medium">
                          {new Date(job.start_date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                        </p>
                        <p className="text-foreground/70">to</p>
                        <p className="text-foreground font-medium">
                          {job.is_current ? 'Present' : job.end_date ? new Date(job.end_date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="qualifications" className="mt-4 space-y-3">
            {effectiveSelectedProfile.qualifications?.length === 0 ? (
              <Card className="bg-elec-gray border-border">
                <CardContent className="p-6 text-center">
                  <GraduationCap className="h-10 w-10 text-foreground/70 mx-auto mb-3" />
                  <p className="text-foreground/70 text-sm">No qualifications recorded</p>
                </CardContent>
              </Card>
            ) : (
              effectiveSelectedProfile.qualifications?.map((qual) => (
                <Card key={qual.id} className="bg-elec-gray border-border">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="font-medium text-foreground text-sm">{qual.qualification_name}</h4>
                        <p className="text-xs text-foreground/70 flex items-center gap-1 mt-1">
                          <Building className="h-3 w-3" />
                          {qual.awarding_body || "Unknown"}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {qual.date_achieved ? new Date(qual.date_achieved).getFullYear() : "N/A"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="certifications" className="mt-4 space-y-3">
            <AddCertificationDialog preselectedEmployeeId={effectiveSelectedProfile.employee_id} />
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const ComplianceOverview = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-destructive/50">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-1.5 md:p-2 rounded-lg bg-destructive/10 flex-shrink-0">
                <XCircle className="h-4 w-4 md:h-5 md:w-5 text-destructive" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-destructive">{expiredItems.length}</p>
                <p className="text-xs md:text-sm text-foreground/70">Expired</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-warning/50">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-1.5 md:p-2 rounded-lg bg-warning/10 flex-shrink-0">
                <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-warning" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-warning">{warningItems.length}</p>
                <p className="text-xs md:text-sm text-foreground/70">Expiring</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-success/50">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-1.5 md:p-2 rounded-lg bg-success/10 flex-shrink-0">
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-success" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-success">{activeItems.length}</p>
                <p className="text-xs md:text-sm text-foreground/70">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/50">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-1.5 md:p-2 rounded-lg bg-elec-yellow/10 flex-shrink-0">
                <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-elec-yellow" />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-elec-yellow">{profiles?.length || 0}</p>
                <p className="text-xs md:text-sm text-foreground/70">Profiles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 flex-wrap">
        <AddCertificationDialog />
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => toast({ title: "Training Scheduler", description: "Training scheduling coming soon" })}
        >
          <BookOpen className="h-4 w-4" />
          Schedule Training
        </Button>
      </div>

      {(expiredItems.length > 0 || warningItems.length > 0) && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg font-semibold flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4 md:h-5 md:w-5" />
              Urgent Attention Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {expiredItems.slice(0, 5).map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-border/50 last:border-0 gap-2">
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{item.training_name}</p>
                  <p className="text-xs text-foreground/70">{item.workerName}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  className="self-start sm:self-auto gap-2"
                  onClick={() => handleRenewCert(item.training_name, item.workerName || "")}
                >
                  <RefreshCw className="h-3 w-3" />
                  Renew Now
                </Button>
              </div>
            ))}
            {warningItems.slice(0, 5).map((item, idx) => {
              const daysLeft = item.expiry_date ? Math.ceil((new Date(item.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0;
              return (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-border/50 last:border-0 gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{item.training_name}</p>
                    <p className="text-xs text-foreground/70">{item.workerName} - {daysLeft} days remaining</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="self-start sm:self-auto gap-2"
                    onClick={() => handleRenewCert(item.training_name, item.workerName || "")}
                  >
                    <Clock className="h-3 w-3" />
                    Schedule
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );

  // Create mock profile for dialogs when using old interface
  const mockDialogProfile = selectedProfile ? {
    id: selectedProfile.id,
    employeeId: selectedProfile.employee_id,
    elecIdNumber: selectedProfile.elec_id_number,
    name: selectedProfile.employee?.name || "Unknown",
    role: selectedProfile.employee?.role || "Electrician",
    photo: selectedProfile.employee?.photo_url,
    bio: selectedProfile.bio || "",
    yearsExperience: 0,
    ecsCardType: selectedProfile.ecs_card_type || "Gold Card",
    ecsCardNumber: selectedProfile.ecs_card_number || "",
    ecsExpiry: selectedProfile.ecs_expiry_date || "",
    ecsStatus: getEcsStatus(selectedProfile.ecs_expiry_date),
    skills: [],
    workHistory: [],
    certifications: [],
    training: [],
    qualifications: [],
    verified: selectedProfile.is_verified,
    lastVerified: selectedProfile.verified_at || "",
    profileViews: selectedProfile.profile_views,
    shareableLink: selectedProfile.shareable_link || undefined,
  } : null;

  return (
    <div className="space-y-3 md:space-y-6 animate-fade-in -mx-4 px-4 sm:mx-0 sm:px-0">
      {/* Mobile: Compact header */}
      {isMobile ? (
        <div className="flex items-center justify-between py-2">
          <h1 className="text-lg font-semibold text-foreground">Credentials</h1>
          <div className="flex items-center gap-2">
            <Button onClick={() => refetch()} variant="ghost" size="icon" className="h-9 w-9 touch-manipulation">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button onClick={() => setScanDialogOpen(true)} size="sm" className="gap-2 h-9 touch-manipulation">
              <QrCode className="h-4 w-4" />
              Scan
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
              <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-elec-yellow" />
              Credentials & Compliance
            </h1>
            <p className="text-foreground/70 text-xs md:text-sm mt-1">
              Monitor certifications, verify credentials, manage compliance
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button onClick={() => refetch()} variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button onClick={() => setCreateElecIdSheetOpen(true)} variant="outline" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Create Elec-ID
            </Button>
            <Button onClick={() => setScanDialogOpen(true)} className="gap-2">
              <QrCode className="h-4 w-4" />
              Scan Elec-ID
            </Button>
          </div>
        </div>
      )}

      <Tabs value={mainTab} onValueChange={(v) => setMainTab(v as "workers" | "compliance")}>
        <TabsList className="w-full md:w-auto h-11">
          <TabsTrigger value="workers" className="gap-2 flex-1 md:flex-none h-9 touch-manipulation">
            <User className="h-4 w-4" />
            Workers
          </TabsTrigger>
          <TabsTrigger value="compliance" className="gap-2 flex-1 md:flex-none h-9 touch-manipulation">
            <BarChart3 className="h-4 w-4" />
            Compliance
            {(expiredItems.length + warningItems.length) > 0 && (
              <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-[10px] rounded-full">
                {expiredItems.length + warningItems.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workers" className="mt-4">
          <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  {!searchQuery && (
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/70 pointer-events-none" />
                  )}
                  <Input
                    placeholder="Search by name or Elec-ID..."
                    className={cn("h-11 touch-manipulation", !searchQuery && "pl-10")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                {isMobile && (
                  <Button
                    onClick={() => setCreateElecIdSheetOpen(true)}
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 shrink-0 touch-manipulation"
                  >
                    <UserPlus className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                {filteredProfiles.map((profile) => {
                  const ecsStatus = getEcsStatus(profile.ecs_expiry_date);
                  const config = statusConfig[ecsStatus as keyof typeof statusConfig] || statusConfig.Active;
                  const StatusIcon = config.icon;
                  
                  const daysUntilExpiry = profile.ecs_expiry_date 
                    ? Math.ceil((new Date(profile.ecs_expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                    : null;
                  
                  return (
                    <Card 
                      key={profile.id} 
                      className={`group cursor-pointer transition-all duration-200 overflow-hidden border-l-4 ${config.accent} ${
                        selectedProfile?.id === profile.id 
                          ? "border-elec-yellow bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 shadow-md shadow-elec-yellow/10"
                          : "bg-elec-gray border-border hover:border-elec-yellow/50 hover:shadow-md"
                      }`}
                      onClick={() => handleProfileSelect(profile)}
                    >
                      <CardContent className="p-3.5">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="relative flex-shrink-0">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center ring-2 ${config.border.replace('border-', 'ring-')} ring-offset-1 ring-offset-card`}>
                                <User className="h-5 w-5 text-foreground/60" />
                              </div>
                              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${config.bg} ${config.border} border flex items-center justify-center`}>
                                <StatusIcon className={`h-2.5 w-2.5 ${config.text}`} />
                              </div>
                            </div>
                            
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-foreground text-sm truncate">{profile.employee?.name || "Unknown"}</p>
                                {profile.is_verified && (
                                  <ShieldCheck className="h-3.5 w-3.5 text-success flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-foreground/70 truncate">{profile.employee?.role || "Electrician"}</p>
                              <p className="text-[10px] font-mono text-foreground/50 mt-0.5">{profile.elec_id_number}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                            <Badge variant="outline" className={`${config.bg} ${config.text} ${config.border} text-[10px] py-0.5`}>
                              {(profile.ecs_card_type || "Gold").split(' ')[0]}
                            </Badge>
                            
                            {daysUntilExpiry !== null && daysUntilExpiry <= 60 && (
                              <div className="flex items-center gap-1 text-[10px] text-warning">
                                <Clock className="h-3 w-3" />
                                <span>{daysUntilExpiry}d</span>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-2 text-[10px] text-foreground/70">
                              <span className="flex items-center gap-0.5">
                                <Star className="h-3 w-3" />
                                {profile.skills?.length || 0}
                              </span>
                              <span className="flex items-center gap-0.5">
                                <GraduationCap className="h-3 w-3" />
                                {profile.training?.length || 0}
                              </span>
                            </div>
                          </div>
                          
                          {isMobile && <ChevronRight className="h-4 w-4 text-foreground/70 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                
                {filteredProfiles.length === 0 && (
                  <Card className="bg-muted/30 border-dashed">
                    <CardContent className="p-6 text-center">
                      <User className="h-10 w-10 text-foreground/70 mx-auto mb-3" />
                      <p className="text-foreground/70 text-sm">No profiles found</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {!isMobile && (
              <div className="lg:col-span-2">
                <ProfileDetail />
              </div>
            )}

            {isMobile && (
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent side="bottom" className="h-[92vh] p-0 rounded-t-3xl border-t-0 bg-background">
                  <div className="w-12 h-1.5 bg-foreground/20 rounded-full mx-auto mt-3 mb-2" />
                  <SheetHeader className="px-4 pb-3 border-b border-border/50">
                    <SheetTitle className="text-lg">Elec-ID Profile</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(92vh-70px)] px-4 py-4">
                    <ProfileDetail />
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="mt-4">
          <ComplianceOverview />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      {effectiveSelectedProfile && (
        <>
          <ShareElecIDDialog 
            open={shareDialogOpen} 
            onOpenChange={setShareDialogOpen} 
            profile={effectiveSelectedProfile} 
          />
          <AddTrainingRecordDialog 
            open={addTrainingDialogOpen} 
            onOpenChange={setAddTrainingDialogOpen}
            workerName={effectiveSelectedProfile.employee?.name || "Worker"}
            profileId={effectiveSelectedProfile.id}
          />
          <AddSkillDialog
            open={addSkillDialogOpen}
            onOpenChange={setAddSkillDialogOpen}
            profileId={effectiveSelectedProfile.id}
            workerName={effectiveSelectedProfile.employee?.name || "Worker"}
          />
          <AddWorkHistoryDialog
            open={addWorkHistoryDialogOpen}
            onOpenChange={setAddWorkHistoryDialogOpen}
            profileId={effectiveSelectedProfile.id}
            profileName={effectiveSelectedProfile.employee?.name || "Worker"}
          />
        </>
      )}
      <ScanElecIDDialog
        open={scanDialogOpen}
        onOpenChange={setScanDialogOpen}
      />

      {/* Create Elec-ID Sheet - Select Employee */}
      <Sheet open={createElecIdSheetOpen} onOpenChange={setCreateElecIdSheetOpen}>
        <SheetContent side={isMobile ? "bottom" : "right"} className={isMobile ? "h-[85vh]" : ""}>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-elec-yellow" />
              Create Elec-ID
            </SheetTitle>
            <SheetDescription>
              Select an employee to create an Elec-ID profile for
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-4 space-y-4">
            {employeesWithoutElecId.length === 0 ? (
              <Card className="bg-success/10 border-success/30">
                <CardContent className="p-4 text-center">
                  <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-3" />
                  <p className="text-foreground font-medium">All employees have Elec-IDs!</p>
                  <p className="text-sm text-foreground/70 mt-1">
                    All {employees?.length || 0} employees have Elec-ID profiles.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-foreground/70">
                    {employeesWithoutElecId.length} employee{employeesWithoutElecId.length !== 1 ? 's' : ''} without Elec-ID
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={bulkCreating}
                    onClick={async () => {
                      setBulkCreating(true);
                      try {
                        for (const emp of employeesWithoutElecId) {
                          const cardType = emp.role?.toLowerCase().includes('apprentice') ? 'white' 
                            : emp.role?.toLowerCase().includes('supervisor') || emp.role?.toLowerCase().includes('manager') ? 'black'
                            : emp.role?.toLowerCase().includes('labourer') ? 'green'
                            : 'gold';
                          await createElecIdProfile.mutateAsync({
                            employee_id: emp.id,
                            ecs_card_type: cardType,
                          });
                        }
                        toast({
                          title: "Elec-IDs Created",
                          description: `Created Elec-ID profiles for ${employeesWithoutElecId.length} employees`,
                        });
                        setCreateElecIdSheetOpen(false);
                      } catch (error) {
                        toast({
                          title: "Error",
                          description: "Failed to create some Elec-ID profiles",
                          variant: "destructive",
                        });
                      } finally {
                        setBulkCreating(false);
                      }
                    }}
                  >
                    {bulkCreating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Create All
                      </>
                    )}
                  </Button>
                </div>
                
                <ScrollArea className={isMobile ? "h-[calc(85vh-200px)]" : "h-[calc(100vh-220px)]"}>
                  <div className="space-y-2 pr-4">
                    {employeesWithoutElecId.map((emp) => (
                      <Card 
                        key={emp.id}
                        className="cursor-pointer hover:border-elec-yellow/50 active:scale-[0.98] transition-all touch-manipulation"
                        onClick={() => {
                          setSelectedEmployeeForElecId({ id: emp.id, name: emp.name });
                          setCreateElecIdSheetOpen(false);
                          setCreateElecIdDialogOpen(true);
                        }}
                      >
                        <CardContent className="p-3 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-5 w-5 text-foreground/70" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{emp.name}</p>
                            <p className="text-xs text-foreground/70">{emp.role}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-foreground/70" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Create Elec-ID Dialog */}
      {selectedEmployeeForElecId && (
        <CreateElecIDForEmployeeDialog
          open={createElecIdDialogOpen}
          onOpenChange={setCreateElecIdDialogOpen}
          employeeId={selectedEmployeeForElecId.id}
          employeeName={selectedEmployeeForElecId.name}
          onSuccess={() => {
            setSelectedEmployeeForElecId(null);
            refetch();
          }}
        />
      )}
    </div>
  );
};
