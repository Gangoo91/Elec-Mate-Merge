import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { ConversationList } from "@/components/employer/vacancies/ConversationList";
import { ChatView } from "@/components/employer/messaging/ChatView";
import { QuickStats, QuickStat } from "@/components/employer/QuickStats";
import { useVacancies, useCreateVacancy, useUpdateVacancy, useDeleteVacancy, useToggleVacancyStatus } from "@/hooks/useVacancies";
import { useVacancyApplications, useUpdateApplicationStatus } from "@/hooks/useVacancyApplications";
import { useConversations } from "@/hooks/useConversations";
import { Vacancy, VacancyApplication } from "@/services/vacancyService";
import type { Conversation } from "@/services/conversationService";
import { toast } from "@/hooks/use-toast";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Eye,
  ChevronDown,
  ChevronUp,
  Calendar,
  PoundSterling,
  CheckCircle,
  XCircle,
  UserCheck,
  Star,
  CreditCard,
  Filter,
  ArrowUpDown,
  Plus,
  Loader2,
  Shield,
  Award,
  MessageSquare,
} from "lucide-react";

type StatusFilter = 'all' | 'New' | 'Reviewing' | 'Shortlisted' | 'Interviewed' | 'Offered' | 'Hired' | 'Rejected';
type SortOption = 'date-desc' | 'date-asc' | 'name';

export function JobVacanciesSection() {
  // Hooks for real data
  const { data: vacancies = [], isLoading: vacanciesLoading } = useVacancies();
  const { data: applications = [], isLoading: applicationsLoading } = useVacancyApplications();
  const { data: conversations = [], isLoading: conversationsLoading, totalUnread } = useConversations();
  const createVacancy = useCreateVacancy();
  const updateVacancy = useUpdateVacancy();
  const toggleVacancyStatus = useToggleVacancyStatus();
  const updateApplicationStatus = useUpdateApplicationStatus();

  // UI State
  const [activeTab, setActiveTab] = useState("vacancies");
  const [expandedVacancy, setExpandedVacancy] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewingApplication, setViewingApplication] = useState<VacancyApplication | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  // Filter and sort state
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [vacancyFilter, setVacancyFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');

  // Form state for new vacancy
  const [newVacancy, setNewVacancy] = useState({
    title: '',
    location: '',
    type: 'Full-time' as const,
    description: '',
    salary_min: '',
    salary_max: '',
    requirements: '',
    benefits: '',
    closing_date: '',
  });

  // Stats
  const totalApplicants = applications.length;
  const newApplicants = applications.filter(a => a.status === "New").length;
  const openVacancies = vacancies.filter(v => v.status === "Open").length;
  const shortlistedCount = applications.filter(a => a.status === "Shortlisted").length;
  const interviewCount = applications.filter(a => a.status === "Interviewed").length;

  // Filtered and sorted applications
  const filteredApplications = useMemo(() => {
    let filtered = [...applications];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(a => a.status === statusFilter);
    }

    if (vacancyFilter !== 'all') {
      filtered = filtered.filter(a => a.vacancy_id === vacancyFilter);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime();
        case 'date-asc':
          return new Date(a.applied_at).getTime() - new Date(b.applied_at).getTime();
        case 'name':
          return a.applicant_name.localeCompare(b.applicant_name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [applications, statusFilter, vacancyFilter, sortBy]);

  const getApplicationsForVacancy = (vacancyId: string) =>
    applications.filter(a => a.vacancy_id === vacancyId);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "New": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      "Reviewing": "bg-amber-500/10 text-amber-500 border-amber-500/20",
      "Shortlisted": "bg-purple-500/10 text-purple-500 border-purple-500/20",
      "Interviewed": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      "Offered": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      "Hired": "bg-success/10 text-success border-success/20",
      "Rejected": "bg-destructive/10 text-destructive border-destructive/20",
    };
    return (
      <Badge variant="outline" className={`text-xs ${variants[status] || "bg-muted text-muted-foreground"}`}>
        {status}
      </Badge>
    );
  };

  const getTierBadge = (tier?: string) => {
    if (!tier) return null;
    const variants: Record<string, { bg: string; icon: typeof Shield }> = {
      "basic": { bg: "bg-muted text-muted-foreground", icon: Shield },
      "verified": { bg: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: Shield },
      "premium": { bg: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", icon: Award },
    };
    const config = variants[tier] || variants.basic;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`text-xs ${config.bg}`}>
        <Icon className="h-3 w-3 mr-1" />
        {tier.charAt(0).toUpperCase() + tier.slice(1)}
      </Badge>
    );
  };

  const handleUpdateStatus = async (appId: string, status: VacancyApplication['status'], name: string) => {
    try {
      await updateApplicationStatus.mutateAsync({ id: appId, status });
      toast({
        title: `Status Updated`,
        description: `${name} has been marked as ${status}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive",
      });
    }
  };

  const handleToggleVacancy = async (vacancy: Vacancy) => {
    try {
      await toggleVacancyStatus.mutateAsync({ id: vacancy.id, currentStatus: vacancy.status });
      toast({
        title: vacancy.status === 'Open' ? "Vacancy Closed" : "Vacancy Reopened",
        description: `${vacancy.title} is now ${vacancy.status === 'Open' ? 'closed' : 'open'}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update vacancy status.",
        variant: "destructive",
      });
    }
  };

  const handleCreateVacancy = async () => {
    if (!newVacancy.title || !newVacancy.location) {
      toast({
        title: "Missing Fields",
        description: "Please fill in the required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createVacancy.mutateAsync({
        title: newVacancy.title,
        location: newVacancy.location,
        type: newVacancy.type,
        status: 'Open',
        description: newVacancy.description || null,
        salary_min: newVacancy.salary_min ? parseFloat(newVacancy.salary_min) : null,
        salary_max: newVacancy.salary_max ? parseFloat(newVacancy.salary_max) : null,
        salary_period: 'per year',
        requirements: newVacancy.requirements ? newVacancy.requirements.split(',').map(r => r.trim()) : [],
        benefits: newVacancy.benefits ? newVacancy.benefits.split(',').map(b => b.trim()) : [],
        closing_date: newVacancy.closing_date || null,
      });

      toast({
        title: "Vacancy Created",
        description: `${newVacancy.title} has been posted.`,
      });

      setIsCreateOpen(false);
      setNewVacancy({
        title: '',
        location: '',
        type: 'Full-time',
        description: '',
        salary_min: '',
        salary_max: '',
        requirements: '',
        benefits: '',
        closing_date: '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create vacancy.",
        variant: "destructive",
      });
    }
  };

  const statusFilters: { value: StatusFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: applications.length },
    { value: 'New', label: 'New', count: newApplicants },
    { value: 'Reviewing', label: 'Reviewing', count: applications.filter(a => a.status === 'Reviewing').length },
    { value: 'Shortlisted', label: 'Shortlisted', count: shortlistedCount },
    { value: 'Interviewed', label: 'Interview', count: interviewCount },
    { value: 'Offered', label: 'Offered', count: applications.filter(a => a.status === 'Offered').length },
    { value: 'Rejected', label: 'Rejected', count: applications.filter(a => a.status === 'Rejected').length },
  ];

  const isLoading = vacanciesLoading || applicationsLoading;

  // Handle conversation selection
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="Job Vacancies"
        description="Post jobs and manage applications"
      />

      {/* Stats */}
      <QuickStats
        stats={[
          {
            icon: Briefcase,
            value: openVacancies,
            label: "Open Roles",
            color: "yellow",
          },
          {
            icon: Users,
            value: totalApplicants,
            label: "Applicants",
            color: "green",
          },
          {
            icon: Clock,
            value: newApplicants,
            label: "New",
            color: "blue",
            pulse: newApplicants > 0,
          },
          {
            icon: UserCheck,
            value: shortlistedCount,
            label: "Shortlisted",
            color: "purple",
          },
          {
            icon: MessageSquare,
            value: totalUnread,
            label: "Unread",
            color: totalUnread > 0 ? "yellow" : "blue",
            pulse: totalUnread > 0,
          },
        ]}
      />

      {/* Post New Button */}
      <Button
        className="w-full"
        onClick={() => setIsCreateOpen(true)}
        disabled={createVacancy.isPending}
      >
        {createVacancy.isPending ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Plus className="h-4 w-4 mr-2" />
        )}
        Post New Vacancy
      </Button>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        </div>
      )}

      {/* Tabs */}
      {!isLoading && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:w-auto grid grid-cols-3">
            <TabsTrigger value="vacancies" className="text-xs md:text-sm">
              Vacancies ({openVacancies})
            </TabsTrigger>
            <TabsTrigger value="applications" className="text-xs md:text-sm">
              Candidates ({totalApplicants})
            </TabsTrigger>
            <TabsTrigger value="conversations" className="text-xs md:text-sm relative">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Messages</span>
              {totalUnread > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-elec-yellow text-black"
                >
                  {totalUnread > 9 ? '9+' : totalUnread}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Vacancies Tab */}
          <TabsContent value="vacancies" className="mt-4 space-y-3">
            {vacancies.length === 0 ? (
              <Card className="bg-elec-gray border-border">
                <CardContent className="p-8 text-center">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-foreground mb-2">No Vacancies Yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Post your first job vacancy to start receiving applications.
                  </p>
                  <Button onClick={() => setIsCreateOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Post Vacancy
                  </Button>
                </CardContent>
              </Card>
            ) : (
              vacancies.map((vacancy) => {
                const isExpanded = expandedVacancy === vacancy.id;
                const apps = getApplicationsForVacancy(vacancy.id);

                return (
                  <Card
                    key={vacancy.id}
                    className="bg-elec-gray border-border overflow-hidden relative group transition-all duration-300 hover:border-elec-yellow/40 hover:shadow-lg hover:shadow-elec-yellow/5"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-elec-yellow rounded-l-lg" />

                    <CardContent className="p-0 pl-3">
                      <div
                        className="p-4 cursor-pointer touch-feedback"
                        onClick={() => setExpandedVacancy(isExpanded ? null : vacancy.id)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-lg text-foreground">{vacancy.title}</h3>
                              <Badge
                                variant={vacancy.status === "Open" ? "default" : "secondary"}
                                className={`text-xs font-semibold px-2.5 py-0.5 ${
                                  vacancy.status === "Open"
                                    ? "bg-success/20 text-success border-success/30"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {vacancy.status}
                              </Badge>
                            </div>
                            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5 text-elec-yellow/70" />
                                <span>{vacancy.location}</span>
                              </div>
                              <Badge variant="outline" className="text-xs bg-surface border-border/50 font-medium">
                                {vacancy.type}
                              </Badge>
                            </div>
                            {(vacancy.salary_min || vacancy.salary_max) && (
                              <div className="flex items-center gap-1.5 text-sm">
                                <PoundSterling className="h-4 w-4 text-elec-yellow" />
                                <span className="font-semibold text-foreground">
                                  £{vacancy.salary_min?.toLocaleString() || '?'} - £{vacancy.salary_max?.toLocaleString() || '?'}
                                </span>
                                <span className="text-muted-foreground text-xs">{vacancy.salary_period}</span>
                              </div>
                            )}
                          </div>
                          <div className="text-right shrink-0 space-y-2">
                            <div className="flex items-center justify-end gap-1.5 bg-elec-yellow/10 text-elec-yellow px-2.5 py-1 rounded-full">
                              <Users className="h-3.5 w-3.5" />
                              <span className="font-bold text-sm">{apps.length}</span>
                            </div>
                            <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                              <Eye className="h-3.5 w-3.5" />
                              <span className="font-medium">{vacancy.views}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center mt-3 pt-2 border-t border-border/50">
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-elec-yellow" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-elec-yellow transition-colors" />
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="border-t border-border/50 p-4 pl-6 bg-surface/50 space-y-4">
                          {vacancy.description && (
                            <p className="text-sm text-muted-foreground leading-relaxed">{vacancy.description}</p>
                          )}

                          {vacancy.requirements && vacancy.requirements.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-foreground">Requirements</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {vacancy.requirements.map((req) => (
                                  <Badge key={req} variant="outline" className="text-xs bg-elec-gray border-border/50">
                                    {req}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {vacancy.benefits && vacancy.benefits.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-foreground">Benefits</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {vacancy.benefits.map((ben) => (
                                  <Badge key={ben} variant="secondary" className="text-xs bg-success/10 text-success border-success/20">
                                    {ben}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-elec-yellow/70" />
                              <span>Posted: {new Date(vacancy.created_at).toLocaleDateString()}</span>
                            </div>
                            {vacancy.closing_date && (
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 text-elec-yellow/70" />
                                <span>Closes: {new Date(vacancy.closing_date).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleVacancy(vacancy);
                              }}
                            >
                              {vacancy.status === "Open" ? "Close Vacancy" : "Reopen Vacancy"}
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                setVacancyFilter(vacancy.id);
                                setActiveTab("applications");
                              }}
                            >
                              View Applicants ({apps.length})
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          {/* Applications/Candidates Tab */}
          <TabsContent value="applications" className="mt-4 space-y-4">
            {/* Filter Bar */}
            <div className="space-y-3">
              <ScrollArea className="w-full">
                <div className="flex gap-2 pb-2">
                  {statusFilters.map((filter) => (
                    <Button
                      key={filter.value}
                      variant={statusFilter === filter.value ? "default" : "outline"}
                      size="sm"
                      className="shrink-0 text-xs"
                      onClick={() => setStatusFilter(filter.value)}
                    >
                      {filter.label}
                      {filter.count > 0 && (
                        <Badge
                          variant="secondary"
                          className={`ml-1.5 text-xs ${statusFilter === filter.value ? 'bg-elec-dark/20' : ''}`}
                        >
                          {filter.count}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              <div className="flex gap-2">
                <Select value={vacancyFilter} onValueChange={setVacancyFilter}>
                  <SelectTrigger className="flex-1 h-9 text-xs">
                    <Filter className="h-3 w-3 mr-2" />
                    <SelectValue placeholder="All Jobs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    {vacancies.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-[130px] h-9 text-xs">
                    <ArrowUpDown className="h-3 w-3 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Newest First</SelectItem>
                    <SelectItem value="date-asc">Oldest First</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Candidate Cards */}
            {filteredApplications.length === 0 ? (
              <Card className="bg-elec-gray border-border">
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-foreground mb-2">No Candidates Found</h3>
                  <p className="text-sm text-muted-foreground">
                    {statusFilter !== 'all' || vacancyFilter !== 'all'
                      ? "Try adjusting your filters."
                      : "Applications will appear here when candidates apply to your vacancies."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredApplications.map((app) => {
                  const vacancy = vacancies.find(v => v.id === app.vacancy_id);
                  const initials = app.applicant_name.split(' ').map(n => n[0]).join('').toUpperCase();

                  return (
                    <Card
                      key={app.id}
                      className="bg-elec-gray border-border overflow-hidden cursor-pointer hover:bg-muted/30 transition-colors"
                      onClick={() => setViewingApplication(app)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-12 h-12 shrink-0 border border-border">
                            <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold">
                              {initials}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-semibold text-foreground leading-tight">{app.applicant_name}</h3>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  {app.elec_id_profile && getTierBadge(app.elec_id_profile.verification_tier)}
                                  {app.applicant_email && (
                                    <span className="text-xs text-muted-foreground">
                                      {app.applicant_email}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="shrink-0">
                                {getStatusBadge(app.status)}
                              </div>
                            </div>

                            <div className="mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Briefcase className="h-3 w-3" />
                                {vacancy?.title || 'Unknown Position'}
                              </span>
                            </div>

                            <div className="mt-2 flex items-center justify-between gap-2">
                              <span className="text-xs text-muted-foreground">
                                Applied: {new Date(app.applied_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                              </span>
                            </div>

                            {/* Quick Actions */}
                            <div className="mt-3 flex gap-2">
                              {app.status === 'New' && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="flex-1 h-8 text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleUpdateStatus(app.id, 'Rejected', app.applicant_name);
                                    }}
                                  >
                                    <XCircle className="h-3 w-3 mr-1" />
                                    Reject
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="flex-1 h-8 text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleUpdateStatus(app.id, 'Shortlisted', app.applicant_name);
                                    }}
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Shortlist
                                  </Button>
                                </>
                              )}
                              {app.status === 'Shortlisted' && (
                                <Button
                                  size="sm"
                                  className="flex-1 h-8 text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateStatus(app.id, 'Interviewed', app.applicant_name);
                                  }}
                                >
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Mark Interviewed
                                </Button>
                              )}
                              {app.status === 'Interviewed' && (
                                <Button
                                  size="sm"
                                  className="flex-1 h-8 text-xs bg-success hover:bg-success/90"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateStatus(app.id, 'Offered', app.applicant_name);
                                  }}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Make Offer
                                </Button>
                              )}
                              {app.status === 'Offered' && (
                                <Button
                                  size="sm"
                                  className="flex-1 h-8 text-xs bg-success hover:bg-success/90"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateStatus(app.id, 'Hired', app.applicant_name);
                                  }}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Mark Hired
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Conversations Tab */}
          <TabsContent value="conversations" className="mt-4">
            <ConversationList
              conversations={conversations}
              isLoading={conversationsLoading}
              onSelect={handleSelectConversation}
              emptyMessage="Start a conversation by messaging someone from the Talent Pool, or wait for applicants to message you."
            />
          </TabsContent>
        </Tabs>
      )}

      {/* Create Vacancy Sheet */}
      <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl">
          <SheetHeader>
            <SheetTitle>Post New Vacancy</SheetTitle>
            <SheetDescription>
              Create a new job posting to attract candidates
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 py-4 overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Senior Electrician"
                value={newVacancy.title}
                onChange={(e) => setNewVacancy({ ...newVacancy, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="e.g. Manchester, UK"
                value={newVacancy.location}
                onChange={(e) => setNewVacancy({ ...newVacancy, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Employment Type</Label>
              <Select
                value={newVacancy.type}
                onValueChange={(v) => setNewVacancy({ ...newVacancy, type: v as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary_min">Min Salary (£)</Label>
                <Input
                  id="salary_min"
                  type="number"
                  placeholder="30000"
                  value={newVacancy.salary_min}
                  onChange={(e) => setNewVacancy({ ...newVacancy, salary_min: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary_max">Max Salary (£)</Label>
                <Input
                  id="salary_max"
                  type="number"
                  placeholder="45000"
                  value={newVacancy.salary_max}
                  onChange={(e) => setNewVacancy({ ...newVacancy, salary_max: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the role..."
                value={newVacancy.description}
                onChange={(e) => setNewVacancy({ ...newVacancy, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements (comma separated)</Label>
              <Input
                id="requirements"
                placeholder="Gold Card, 18th Edition, 5 years experience"
                value={newVacancy.requirements}
                onChange={(e) => setNewVacancy({ ...newVacancy, requirements: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefits">Benefits (comma separated)</Label>
              <Input
                id="benefits"
                placeholder="Company van, Pension, 25 days holiday"
                value={newVacancy.benefits}
                onChange={(e) => setNewVacancy({ ...newVacancy, benefits: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="closing_date">Closing Date</Label>
              <Input
                id="closing_date"
                type="date"
                value={newVacancy.closing_date}
                onChange={(e) => setNewVacancy({ ...newVacancy, closing_date: e.target.value })}
              />
            </div>
          </div>

          <SheetFooter className="pt-4 border-t">
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateVacancy} disabled={createVacancy.isPending}>
              {createVacancy.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Post Vacancy
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* View Application Sheet */}
      <Sheet open={!!viewingApplication} onOpenChange={(open) => !open && setViewingApplication(null)}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
          {viewingApplication && (
            <>
              <SheetHeader>
                <SheetTitle>{viewingApplication.applicant_name}</SheetTitle>
                <SheetDescription>
                  Applied for: {vacancies.find(v => v.id === viewingApplication.vacancy_id)?.title || 'Unknown Position'}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-16 h-16 border border-border">
                    <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold text-xl">
                      {viewingApplication.applicant_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{viewingApplication.applicant_name}</h3>
                    {viewingApplication.applicant_email && (
                      <p className="text-sm text-muted-foreground">{viewingApplication.applicant_email}</p>
                    )}
                    {viewingApplication.applicant_phone && (
                      <p className="text-sm text-muted-foreground">{viewingApplication.applicant_phone}</p>
                    )}
                  </div>
                </div>

                {viewingApplication.elec_id_profile && (
                  <Card className="bg-elec-gray border-border">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-elec-yellow" />
                        Elec-ID Profile
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground">ID:</span> {viewingApplication.elec_id_profile.elec_id_number}
                        </p>
                        <p>
                          <span className="text-muted-foreground">ECS Card:</span> {viewingApplication.elec_id_profile.ecs_card_type}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Verification:</span> {viewingApplication.elec_id_profile.verification_tier}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {viewingApplication.cover_letter && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Cover Letter</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {viewingApplication.cover_letter}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Applied:</span>
                  <span>{new Date(viewingApplication.applied_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  {getStatusBadge(viewingApplication.status)}
                </div>
              </div>

              <SheetFooter className="pt-4 border-t gap-2">
                {viewingApplication.status === 'New' && (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        handleUpdateStatus(viewingApplication.id, 'Rejected', viewingApplication.applicant_name);
                        setViewingApplication(null);
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => {
                        handleUpdateStatus(viewingApplication.id, 'Shortlisted', viewingApplication.applicant_name);
                        setViewingApplication(null);
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Shortlist
                    </Button>
                  </>
                )}
                {viewingApplication.status === 'Shortlisted' && (
                  <Button
                    className="flex-1"
                    onClick={() => {
                      handleUpdateStatus(viewingApplication.id, 'Interviewed', viewingApplication.applicant_name);
                      setViewingApplication(null);
                    }}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Mark Interviewed
                  </Button>
                )}
                {viewingApplication.status === 'Interviewed' && (
                  <Button
                    className="flex-1 bg-success hover:bg-success/90"
                    onClick={() => {
                      handleUpdateStatus(viewingApplication.id, 'Offered', viewingApplication.applicant_name);
                      setViewingApplication(null);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Make Offer
                  </Button>
                )}
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Chat View */}
      <ChatView
        conversation={selectedConversation}
        open={!!selectedConversation}
        onOpenChange={(open) => !open && setSelectedConversation(null)}
        onArchived={() => setSelectedConversation(null)}
      />
    </div>
  );
}
