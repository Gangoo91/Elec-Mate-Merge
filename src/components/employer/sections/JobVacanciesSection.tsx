import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Users,
  MessageSquare,
  Loader2,
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Import new premium components
import { VacanciesHeroCard } from "@/components/employer/vacancies/VacanciesHeroCard";
import { PremiumVacancyCard } from "@/components/employer/vacancies/PremiumVacancyCard";
import { PremiumCandidateCard } from "@/components/employer/vacancies/PremiumCandidateCard";
import { VacancyFilterPills, candidateStatusColors } from "@/components/employer/vacancies/VacancyFilterPills";
import { PremiumTabs } from "@/components/employer/vacancies/PremiumTabs";
import { ConversationList } from "@/components/employer/vacancies/ConversationList";
import { ChatView } from "@/components/employer/messaging/ChatView";
import { VacancyFormWizard } from "@/components/employer/vacancy-form/VacancyFormWizard";

// Hooks
import { useVacancies, useToggleVacancyStatus } from "@/hooks/useVacancies";
import { useVacancyApplications, useUpdateApplicationStatus } from "@/hooks/useVacancyApplications";
import { useConversations } from "@/hooks/useConversations";
import { useEmployer } from "@/contexts/EmployerContext";
import { toast } from "@/hooks/use-toast";

// Types
import { Vacancy, VacancyApplication } from "@/services/vacancyService";
import type { Conversation } from "@/services/conversationService";

type StatusFilter = "all" | "New" | "Reviewing" | "Shortlisted" | "Interviewed" | "Offered" | "Hired" | "Rejected";
type SortOption = "date-desc" | "date-asc" | "name";

export function JobVacanciesSection() {
  // Data hooks
  const { data: vacancies = [], isLoading: vacanciesLoading } = useVacancies();
  const { data: applications = [], isLoading: applicationsLoading } = useVacancyApplications();
  const { data: conversations = [], isLoading: conversationsLoading, totalUnread } = useConversations();
  const toggleVacancyStatus = useToggleVacancyStatus();
  const updateApplicationStatus = useUpdateApplicationStatus();
  const { employer } = useEmployer();

  // UI State
  const [activeTab, setActiveTab] = useState("vacancies");
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [duplicatingVacancy, setDuplicatingVacancy] = useState<Vacancy | null>(null);
  const [viewingApplication, setViewingApplication] = useState<VacancyApplication | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  // Filter and sort state
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [vacancyFilter, setVacancyFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate stats
  const totalApplicants = applications.length;
  const newApplicants = applications.filter((a) => a.status === "New").length;
  const openVacancies = vacancies.filter((v) => v.status === "Open").length;
  const shortlistedCount = applications.filter((a) => a.status === "Shortlisted").length;
  const hiredCount = applications.filter((a) => a.status === "Hired").length;
  const fillRate = totalApplicants > 0 ? Math.round((hiredCount / totalApplicants) * 100) : 0;

  // Filtered and sorted applications
  const filteredApplications = useMemo(() => {
    let filtered = [...applications];

    if (statusFilter !== "all") {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }

    if (vacancyFilter !== "all") {
      filtered = filtered.filter((a) => a.vacancy_id === vacancyFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.applicant_name.toLowerCase().includes(query) ||
          a.applicant_email?.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime();
        case "date-asc":
          return new Date(a.applied_at).getTime() - new Date(b.applied_at).getTime();
        case "name":
          return a.applicant_name.localeCompare(b.applicant_name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [applications, statusFilter, vacancyFilter, sortBy, searchQuery]);

  const getApplicationsForVacancy = (vacancyId: string) =>
    applications.filter((a) => a.vacancy_id === vacancyId);

  // Status filter options with colors
  const statusFilterOptions = [
    { value: "all" as const, label: "All", count: applications.length, color: candidateStatusColors.all },
    { value: "New" as const, label: "New", count: newApplicants, color: candidateStatusColors.New },
    { value: "Reviewing" as const, label: "Reviewing", count: applications.filter((a) => a.status === "Reviewing").length, color: candidateStatusColors.Reviewing },
    { value: "Shortlisted" as const, label: "Shortlisted", count: shortlistedCount, color: candidateStatusColors.Shortlisted },
    { value: "Interviewed" as const, label: "Interview", count: applications.filter((a) => a.status === "Interviewed").length, color: candidateStatusColors.Interviewed },
    { value: "Offered" as const, label: "Offered", count: applications.filter((a) => a.status === "Offered").length, color: candidateStatusColors.Offered },
    { value: "Rejected" as const, label: "Rejected", count: applications.filter((a) => a.status === "Rejected").length, color: candidateStatusColors.Rejected },
  ];

  // Handlers
  const handleUpdateStatus = async (
    appId: string,
    status: VacancyApplication["status"],
    name: string
  ) => {
    try {
      await updateApplicationStatus.mutateAsync({ id: appId, status });
      toast({
        title: "Status Updated",
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
        title: vacancy.status === "Open" ? "Vacancy Closed" : "Vacancy Reopened",
        description: `${vacancy.title} is now ${vacancy.status === "Open" ? "closed" : "open"}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update vacancy status.",
        variant: "destructive",
      });
    }
  };

  const handleWizardClose = () => {
    setIsWizardOpen(false);
    setEditingVacancy(null);
    setDuplicatingVacancy(null);
  };

  const handleEditVacancy = (vacancy: Vacancy) => {
    setEditingVacancy(vacancy);
    setIsWizardOpen(true);
  };

  const handleDuplicateVacancy = (vacancy: Vacancy) => {
    setDuplicatingVacancy(vacancy);
    setIsWizardOpen(true);
  };

  const handleViewApplicants = (vacancyId: string) => {
    setVacancyFilter(vacancyId);
    setActiveTab("applications");
  };

  const isLoading = vacanciesLoading || applicationsLoading;

  // Tab configuration
  const tabs = [
    { id: "vacancies", label: "Vacancies", count: openVacancies, icon: <Briefcase className="h-4 w-4" /> },
    { id: "applications", label: "Candidates", count: totalApplicants, icon: <Users className="h-4 w-4" /> },
    { id: "conversations", label: "Messages", count: totalUnread, icon: <MessageSquare className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-20 sm:pb-6">
      {/* Hero Section */}
      <VacanciesHeroCard
        openVacancies={openVacancies}
        totalApplicants={totalApplicants}
        newApplicants={newApplicants}
        fillRate={fillRate}
        onPostVacancy={() => setIsWizardOpen(true)}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        </div>
      )}

      {/* Content */}
      {!isLoading && (
        <>
          {/* Premium Tabs */}
          <PremiumTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {/* Vacancies Tab */}
            {activeTab === "vacancies" && (
              <motion.div
                key="vacancies"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {vacancies.length === 0 ? (
                  <Card className="bg-elec-gray/50 border-white/10">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-elec-yellow/10 flex items-center justify-center mb-4">
                        <Briefcase className="h-8 w-8 text-elec-yellow" />
                      </div>
                      <h3 className="font-semibold text-white text-lg mb-2">No Vacancies Yet</h3>
                      <p className="text-sm text-white/60 mb-6 max-w-sm mx-auto">
                        Post your first job vacancy to start receiving applications from qualified electricians.
                      </p>
                      <Button
                        onClick={() => setIsWizardOpen(true)}
                        className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                      >
                        Post Your First Vacancy
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {vacancies.map((vacancy) => (
                      <PremiumVacancyCard
                        key={vacancy.id}
                        id={vacancy.id}
                        title={vacancy.title}
                        location={vacancy.location}
                        type={vacancy.type}
                        status={vacancy.status as "Open" | "Closed" | "Draft"}
                        salaryMin={vacancy.salary_min || undefined}
                        salaryMax={vacancy.salary_max || undefined}
                        salaryPeriod={vacancy.salary_period || undefined}
                        applicantCount={getApplicationsForVacancy(vacancy.id).length}
                        views={vacancy.views || 0}
                        postedAt={vacancy.created_at}
                        closingDate={vacancy.closing_date || undefined}
                        workArrangement={vacancy.work_arrangement}
                        companyInitial={employer?.company_name?.charAt(0) || "E"}
                        onEdit={() => handleEditVacancy(vacancy)}
                        onDuplicate={() => handleDuplicateVacancy(vacancy)}
                        onToggleStatus={() => handleToggleVacancy(vacancy)}
                        onViewApplicants={() => handleViewApplicants(vacancy.id)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Candidates Tab */}
            {activeTab === "applications" && (
              <motion.div
                key="applications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* Filter Pills */}
                <VacancyFilterPills
                  options={statusFilterOptions}
                  selected={statusFilter}
                  onSelect={setStatusFilter}
                />

                {/* Search and additional filters */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      placeholder="Search candidates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={cn(
                        "h-11 pl-10 bg-white/5 border-white/10 rounded-xl",
                        "text-white placeholder:text-white/40",
                        "focus:border-elec-yellow/60"
                      )}
                    />
                  </div>

                  <Select value={vacancyFilter} onValueChange={setVacancyFilter}>
                    <SelectTrigger className="w-[140px] h-11 bg-white/5 border-white/10 rounded-xl text-white">
                      <Filter className="h-4 w-4 mr-2 text-white/60" />
                      <SelectValue placeholder="Job" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-white/10">
                      <SelectItem value="all">All Jobs</SelectItem>
                      {vacancies.map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          {v.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                    <SelectTrigger className="w-[130px] h-11 bg-white/5 border-white/10 rounded-xl text-white">
                      <ArrowUpDown className="h-4 w-4 mr-2 text-white/60" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-white/10">
                      <SelectItem value="date-desc">Newest</SelectItem>
                      <SelectItem value="date-asc">Oldest</SelectItem>
                      <SelectItem value="name">A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Candidate Cards */}
                {filteredApplications.length === 0 ? (
                  <Card className="bg-elec-gray/50 border-white/10">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                        <Users className="h-8 w-8 text-white/40" />
                      </div>
                      <h3 className="font-semibold text-white text-lg mb-2">No Candidates Found</h3>
                      <p className="text-sm text-white/60">
                        {statusFilter !== "all" || vacancyFilter !== "all" || searchQuery
                          ? "Try adjusting your filters or search query."
                          : "Applications will appear here when candidates apply to your vacancies."}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {filteredApplications.map((app) => {
                      const vacancy = vacancies.find((v) => v.id === app.vacancy_id);

                      return (
                        <PremiumCandidateCard
                          key={app.id}
                          id={app.id}
                          name={app.applicant_name}
                          email={app.applicant_email || undefined}
                          phone={app.applicant_phone || undefined}
                          status={app.status as any}
                          appliedAt={app.applied_at}
                          vacancyTitle={vacancy?.title || "Unknown Position"}
                          elecIdTier={app.elec_id_profile?.verification_tier as any}
                          ecsCardType={app.elec_id_profile?.ecs_card_type}
                          onShortlist={() => handleUpdateStatus(app.id, "Shortlisted", app.applicant_name)}
                          onReject={() => handleUpdateStatus(app.id, "Rejected", app.applicant_name)}
                          onInterview={() => handleUpdateStatus(app.id, "Interviewed", app.applicant_name)}
                          onOffer={() => handleUpdateStatus(app.id, "Offered", app.applicant_name)}
                          onHire={() => handleUpdateStatus(app.id, "Hired", app.applicant_name)}
                          onClick={() => setViewingApplication(app)}
                        />
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* Conversations Tab */}
            {activeTab === "conversations" && (
              <motion.div
                key="conversations"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ConversationList
                  conversations={conversations}
                  isLoading={conversationsLoading}
                  onSelect={setSelectedConversation}
                  emptyMessage="Start a conversation by messaging someone from the Talent Pool, or wait for applicants to message you."
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Vacancy Form Wizard */}
      <VacancyFormWizard
        open={isWizardOpen}
        onOpenChange={handleWizardClose}
        onSuccess={handleWizardClose}
        editData={
          editingVacancy
            ? {
                id: editingVacancy.id,
                title: editingVacancy.title,
                type: editingVacancy.type as any,
                location: editingVacancy.location,
                workArrangement: "On-site",
                salaryMin: editingVacancy.salary_min || undefined,
                salaryMax: editingVacancy.salary_max || undefined,
                salaryPeriod: (editingVacancy.salary_period?.includes("year")
                  ? "year"
                  : editingVacancy.salary_period?.includes("month")
                  ? "month"
                  : editingVacancy.salary_period?.includes("week")
                  ? "week"
                  : editingVacancy.salary_period?.includes("day")
                  ? "day"
                  : editingVacancy.salary_period?.includes("hour")
                  ? "hour"
                  : "year") as any,
                benefits: editingVacancy.benefits || [],
                requirements: editingVacancy.requirements || [],
                experienceLevel: "Mid",
                description: editingVacancy.description || "",
                closingDate: editingVacancy.closing_date || "",
              }
            : undefined
        }
        duplicateData={
          duplicatingVacancy
            ? {
                title: `${duplicatingVacancy.title} (Copy)`,
                type: duplicatingVacancy.type as any,
                location: duplicatingVacancy.location,
                workArrangement: "On-site",
                salaryMin: duplicatingVacancy.salary_min || undefined,
                salaryMax: duplicatingVacancy.salary_max || undefined,
                salaryPeriod: (duplicatingVacancy.salary_period?.includes("year")
                  ? "year"
                  : duplicatingVacancy.salary_period?.includes("month")
                  ? "month"
                  : duplicatingVacancy.salary_period?.includes("week")
                  ? "week"
                  : duplicatingVacancy.salary_period?.includes("day")
                  ? "day"
                  : duplicatingVacancy.salary_period?.includes("hour")
                  ? "hour"
                  : "year") as any,
                benefits: duplicatingVacancy.benefits || [],
                requirements: duplicatingVacancy.requirements || [],
                experienceLevel: "Mid",
                description: duplicatingVacancy.description || "",
                closingDate: "",
              }
            : undefined
        }
      />

      {/* View Application Sheet */}
      <Sheet open={!!viewingApplication} onOpenChange={(open) => !open && setViewingApplication(null)}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl bg-elec-gray border-white/10">
          {viewingApplication && (
            <>
              <SheetHeader className="pb-4 border-b border-white/10">
                <SheetTitle className="text-white">{viewingApplication.applicant_name}</SheetTitle>
                <SheetDescription className="text-white/60">
                  Applied for: {vacancies.find((v) => v.id === viewingApplication.vacancy_id)?.title || "Unknown Position"}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 py-6 overflow-auto">
                {/* Avatar and contact */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 border-2 border-white/10">
                    <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold text-2xl">
                      {viewingApplication.applicant_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-xl text-white">{viewingApplication.applicant_name}</h3>
                    {viewingApplication.applicant_email && (
                      <p className="text-sm text-white/60">{viewingApplication.applicant_email}</p>
                    )}
                    {viewingApplication.applicant_phone && (
                      <p className="text-sm text-white/60">{viewingApplication.applicant_phone}</p>
                    )}
                  </div>
                </div>

                {/* Elec-ID Profile */}
                {viewingApplication.elec_id_profile && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <h4 className="font-medium text-white flex items-center gap-2">
                      <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                        Elec-ID Verified
                      </Badge>
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-white/50">ID Number</p>
                        <p className="text-white font-medium">{viewingApplication.elec_id_profile.elec_id_number}</p>
                      </div>
                      <div>
                        <p className="text-white/50">ECS Card</p>
                        <p className="text-white font-medium">{viewingApplication.elec_id_profile.ecs_card_type}</p>
                      </div>
                      <div>
                        <p className="text-white/50">Verification</p>
                        <p className="text-white font-medium capitalize">{viewingApplication.elec_id_profile.verification_tier}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cover Letter */}
                {viewingApplication.cover_letter && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Cover Letter</h4>
                    <p className="text-sm text-white/70 whitespace-pre-wrap leading-relaxed">
                      {viewingApplication.cover_letter}
                    </p>
                  </div>
                )}

                {/* Application date */}
                <div className="flex items-center justify-between text-sm pt-4 border-t border-white/10">
                  <span className="text-white/50">Applied</span>
                  <span className="text-white">
                    {new Date(viewingApplication.applied_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <SheetFooter className="pt-4 border-t border-white/10">
                {viewingApplication.status === "New" && (
                  <div className="flex gap-3 w-full">
                    <Button
                      variant="outline"
                      className="flex-1 h-12 bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                      onClick={() => {
                        handleUpdateStatus(viewingApplication.id, "Rejected", viewingApplication.applicant_name);
                        setViewingApplication(null);
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      className="flex-1 h-12 bg-purple-500 hover:bg-purple-500/90"
                      onClick={() => {
                        handleUpdateStatus(viewingApplication.id, "Shortlisted", viewingApplication.applicant_name);
                        setViewingApplication(null);
                      }}
                    >
                      Shortlist
                    </Button>
                  </div>
                )}
                {viewingApplication.status === "Shortlisted" && (
                  <Button
                    className="w-full h-12 bg-cyan-500 hover:bg-cyan-500/90"
                    onClick={() => {
                      handleUpdateStatus(viewingApplication.id, "Interviewed", viewingApplication.applicant_name);
                      setViewingApplication(null);
                    }}
                  >
                    Mark as Interviewed
                  </Button>
                )}
                {viewingApplication.status === "Interviewed" && (
                  <Button
                    className="w-full h-12 bg-emerald-500 hover:bg-emerald-500/90"
                    onClick={() => {
                      handleUpdateStatus(viewingApplication.id, "Offered", viewingApplication.applicant_name);
                      setViewingApplication(null);
                    }}
                  >
                    Make Offer
                  </Button>
                )}
                {viewingApplication.status === "Offered" && (
                  <Button
                    className="w-full h-12 bg-green-500 hover:bg-green-500/90"
                    onClick={() => {
                      handleUpdateStatus(viewingApplication.id, "Hired", viewingApplication.applicant_name);
                      setViewingApplication(null);
                    }}
                  >
                    Mark as Hired
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
