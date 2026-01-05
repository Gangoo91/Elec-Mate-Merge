import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { useEmployer, VacancyApplication } from "@/contexts/EmployerContext";
import { PostVacancyDialog } from "@/components/employer/dialogs/PostVacancyDialog";
import { ViewCandidateDialog } from "@/components/employer/dialogs/ViewCandidateDialog";
import { ScheduleInterviewDialog } from "@/components/employer/dialogs/ScheduleInterviewDialog";
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
  ArrowUpDown
} from "lucide-react";

type StatusFilter = 'all' | 'New' | 'Reviewing' | 'Shortlisted' | 'Interview Scheduled' | 'Offer Made' | 'Rejected';
type SortOption = 'date-desc' | 'date-asc' | 'name' | 'rating';

export function JobVacanciesSection() {
  const { vacancies, applications, updateApplicationStatus, closeVacancy } = useEmployer();
  const [activeTab, setActiveTab] = useState("vacancies");
  const [expandedVacancy, setExpandedVacancy] = useState<string | null>(null);
  
  // Filter and sort state
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [vacancyFilter, setVacancyFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  
  // Dialog state
  const [viewingCandidate, setViewingCandidate] = useState<VacancyApplication | null>(null);
  const [schedulingInterview, setSchedulingInterview] = useState<VacancyApplication | null>(null);

  const totalApplicants = applications.length;
  const newApplicants = applications.filter(a => a.status === "New").length;
  const openVacancies = vacancies.filter(v => v.status === "Open").length;
  const shortlistedCount = applications.filter(a => a.status === "Shortlisted").length;
  const interviewCount = applications.filter(a => a.status === "Interview Scheduled").length;

  // Filtered and sorted applications
  const filteredApplications = useMemo(() => {
    let filtered = [...applications];
    
    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(a => a.status === statusFilter);
    }
    
    // Vacancy filter
    if (vacancyFilter !== 'all') {
      filtered = filtered.filter(a => a.vacancyId === vacancyFilter);
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
        case 'date-asc':
          return new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [applications, statusFilter, vacancyFilter, sortBy]);

  const getApplicationsForVacancy = (vacancyId: string) => 
    applications.filter(a => a.vacancyId === vacancyId);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "New": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      "Reviewing": "bg-amber-500/10 text-amber-500 border-amber-500/20",
      "Shortlisted": "bg-purple-500/10 text-purple-500 border-purple-500/20",
      "Interview Scheduled": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      "Offer Made": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      "Rejected": "bg-destructive/10 text-destructive border-destructive/20",
    };
    return (
      <Badge variant="outline" className={`text-xs ${variants[status] || "bg-muted text-muted-foreground"}`}>
        {status}
      </Badge>
    );
  };

  const getCardBadge = (cardType?: string) => {
    if (!cardType) return null;
    const variants: Record<string, string> = {
      "Gold Card": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      "Blue Card": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      "Apprentice": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    };
    return (
      <Badge variant="outline" className={`text-xs ${variants[cardType] || "bg-muted text-muted-foreground"}`}>
        <CreditCard className="h-3 w-3 mr-1" />
        {cardType}
      </Badge>
    );
  };

  const handleShortlist = (appId: string, name: string) => {
    updateApplicationStatus(appId, "Shortlisted");
    toast({
      title: "Candidate Shortlisted",
      description: `${name} has been added to your shortlist.`,
    });
  };

  const handleReject = (appId: string, name: string) => {
    updateApplicationStatus(appId, "Rejected");
    toast({
      title: "Application Rejected",
      description: `${name}'s application has been rejected.`,
      variant: "destructive",
    });
  };

  const handleScheduleInterview = (app: VacancyApplication, details: { date: string; time: string; type: 'In-person' | 'Phone' | 'Video'; location?: string }) => {
    // Update the application with interview details
    updateApplicationStatus(app.id, "Interview Scheduled");
    // Note: In a real app, we'd store the interview details too
    setSchedulingInterview(null);
  };

  const handleMakeOffer = (appId: string, name: string) => {
    updateApplicationStatus(appId, "Offer Made");
    toast({
      title: "Offer Made",
      description: `Offer has been sent to ${name}.`,
    });
  };

  const handleCloseVacancy = (vacancyId: string, title: string) => {
    closeVacancy(vacancyId);
    toast({
      title: "Vacancy Closed",
      description: `${title} has been closed.`,
    });
  };

  const statusFilters: { value: StatusFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: applications.length },
    { value: 'New', label: 'New', count: newApplicants },
    { value: 'Reviewing', label: 'Reviewing', count: applications.filter(a => a.status === 'Reviewing').length },
    { value: 'Shortlisted', label: 'Shortlisted', count: shortlistedCount },
    { value: 'Interview Scheduled', label: 'Interview', count: interviewCount },
    { value: 'Offer Made', label: 'Offer', count: applications.filter(a => a.status === 'Offer Made').length },
    { value: 'Rejected', label: 'Rejected', count: applications.filter(a => a.status === 'Rejected').length },
  ];

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="Job Vacancies"
        description="Post jobs and manage applications"
      />

      {/* Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{openVacancies}</p>
              <p className="text-xs text-muted-foreground">Open Roles</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">{totalApplicants}</p>
              <p className="text-xs text-muted-foreground">Applicants</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-info/10 border-info/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-info" />
            <div>
              <p className="text-lg font-bold text-foreground">{newApplicants}</p>
              <p className="text-xs text-muted-foreground">New</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-warning/10 border-warning/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-warning" />
            <div>
              <p className="text-lg font-bold text-foreground">{shortlistedCount}</p>
              <p className="text-xs text-muted-foreground">Shortlisted</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Post New Button */}
      <PostVacancyDialog />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full md:w-auto grid grid-cols-2">
          <TabsTrigger value="vacancies" className="text-xs md:text-sm">
            Vacancies ({openVacancies})
          </TabsTrigger>
          <TabsTrigger value="applications" className="text-xs md:text-sm">
            Candidates ({totalApplicants})
          </TabsTrigger>
        </TabsList>

        {/* Vacancies Tab */}
        <TabsContent value="vacancies" className="mt-4 space-y-3">
          {vacancies.map((vacancy) => {
            const isExpanded = expandedVacancy === vacancy.id;
            const apps = getApplicationsForVacancy(vacancy.id);

            return (
              <Card 
                key={vacancy.id} 
                className="bg-elec-gray border-border overflow-hidden relative group transition-all duration-300 hover:border-elec-yellow/40 hover:shadow-lg hover:shadow-elec-yellow/5"
              >
                {/* Yellow accent bar */}
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
                        <div className="flex items-center gap-1.5 text-sm">
                          <PoundSterling className="h-4 w-4 text-elec-yellow" />
                          <span className="font-semibold text-foreground">
                            £{vacancy.salary.min.toLocaleString()} - £{vacancy.salary.max.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground text-xs">{vacancy.salary.period}</span>
                        </div>
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
                      <p className="text-sm text-muted-foreground leading-relaxed">{vacancy.description}</p>

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

                      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-elec-yellow/70" />
                          <span>Posted: {new Date(vacancy.postedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-elec-yellow/70" />
                          <span>Closes: {new Date(vacancy.closingDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        {vacancy.status === "Open" && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCloseVacancy(vacancy.id, vacancy.title);
                            }}
                          >
                            Close Vacancy
                          </Button>
                        )}
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
          })}
        </TabsContent>

        {/* Applications/Candidates Tab */}
        <TabsContent value="applications" className="mt-4 space-y-4">
          {/* Filter Bar */}
          <div className="space-y-3">
            {/* Status Filter Pills */}
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

            {/* Dropdowns Row */}
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
                  <SelectItem value="rating">Rating</SelectItem>
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
                const vacancy = vacancies.find(v => v.id === app.vacancyId);
                const initials = app.name.split(' ').map(n => n[0]).join('').toUpperCase();

                return (
                  <Card 
                    key={app.id} 
                    className="bg-elec-gray border-border overflow-hidden cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setViewingCandidate(app)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <Avatar className="w-12 h-12 shrink-0 border border-border">
                          <AvatarImage src={app.avatar} alt={app.name} />
                          <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>

                        {/* Main Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-foreground leading-tight">{app.name}</h3>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                {getCardBadge(app.ecsCardType)}
                                {app.currentLocation && (
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {app.currentLocation}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="shrink-0">
                              {getStatusBadge(app.status)}
                            </div>
                          </div>

                          {/* Job Applied For */}
                          <div className="mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {vacancy?.title}
                            </span>
                          </div>

                          {/* Bottom Row */}
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              {app.yearsExperience !== undefined && (
                                <span>{app.yearsExperience} yrs exp</span>
                              )}
                              <span>
                                {new Date(app.appliedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                              </span>
                            </div>
                            
                            {/* Rating Stars */}
                            {app.rating && app.rating > 0 && (
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${
                                      star <= app.rating!
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-muted-foreground/30'
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
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
                                    handleReject(app.id, app.name);
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
                                    handleShortlist(app.id, app.name);
                                  }}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Shortlist
                                </Button>
                              </>
                            )}
                            {app.status === 'Reviewing' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="flex-1 h-8 text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReject(app.id, app.name);
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
                                    handleShortlist(app.id, app.name);
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
                                  setSchedulingInterview(app);
                                }}
                              >
                                <Calendar className="h-3 w-3 mr-1" />
                                Schedule Interview
                              </Button>
                            )}
                            {app.status === 'Interview Scheduled' && (
                              <Button 
                                size="sm" 
                                className="flex-1 h-8 text-xs bg-success hover:bg-success/90"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMakeOffer(app.id, app.name);
                                }}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Make Offer
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
      </Tabs>

      {/* View Candidate Dialog */}
      <ViewCandidateDialog
        open={!!viewingCandidate}
        onOpenChange={(open) => !open && setViewingCandidate(null)}
        application={viewingCandidate}
        vacancyTitle={viewingCandidate ? vacancies.find(v => v.id === viewingCandidate.vacancyId)?.title : undefined}
        onScheduleInterview={() => {
          if (viewingCandidate) {
            setSchedulingInterview(viewingCandidate);
            setViewingCandidate(null);
          }
        }}
        onShortlist={() => {
          if (viewingCandidate) {
            handleShortlist(viewingCandidate.id, viewingCandidate.name);
            setViewingCandidate(null);
          }
        }}
        onReject={() => {
          if (viewingCandidate) {
            handleReject(viewingCandidate.id, viewingCandidate.name);
            setViewingCandidate(null);
          }
        }}
        onMakeOffer={() => {
          if (viewingCandidate) {
            handleMakeOffer(viewingCandidate.id, viewingCandidate.name);
            setViewingCandidate(null);
          }
        }}
      />

      {/* Schedule Interview Dialog */}
      <ScheduleInterviewDialog
        open={!!schedulingInterview}
        onOpenChange={(open) => !open && setSchedulingInterview(null)}
        candidateName={schedulingInterview?.name || ''}
        onSchedule={(details) => {
          if (schedulingInterview) {
            handleScheduleInterview(schedulingInterview, details);
          }
        }}
      />
    </div>
  );
}
