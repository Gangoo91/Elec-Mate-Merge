import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import {
  FileText,
  Search,
  Calendar,
  MapPin,
  User,
  Sparkles,
  Camera,
  Clock,
  CheckCircle2,
  Wrench,
  ClipboardList,
} from "lucide-react";
import { BriefingPDFActions } from "./BriefingPDFActions";
import { BriefingActionsMenu } from "./BriefingActionsMenu";

interface BriefingHistoryProps {
  onEdit: (briefing: any) => void;
  onDuplicate: (briefing: any) => void;
  onStatusChange: (briefingId: string, status: string) => void;
}

const statusConfig: Record<
  string,
  { bg: string; text: string; border: string; label: string }
> = {
  completed: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    label: "Completed",
  },
  in_progress: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    label: "In Progress",
  },
  scheduled: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/20",
    label: "Scheduled",
  },
  cancelled: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/20",
    label: "Cancelled",
  },
  draft: {
    bg: "bg-white/10",
    text: "text-white",
    border: "border-white/20",
    label: "Draft",
  },
};

const briefingTypeConfig: Record<string, { label: string; color: string }> = {
  "site-work": { label: "Site Work", color: "bg-blue-500/15 text-blue-400" },
  lfe: { label: "LFE Report", color: "bg-red-500/15 text-red-400" },
  "hse-update": {
    label: "HSE Update",
    color: "bg-orange-500/15 text-orange-400",
  },
  "business-update": {
    label: "Business",
    color: "bg-purple-500/15 text-purple-400",
  },
  "safety-alert": {
    label: "Safety Alert",
    color: "bg-yellow-500/15 text-yellow-400",
  },
  regulatory: {
    label: "Regulatory",
    color: "bg-green-500/15 text-green-400",
  },
  general: { label: "General", color: "bg-gray-500/15 text-white" },
};

export const BriefingHistory = ({
  onEdit,
  onDuplicate,
  onStatusChange,
}: BriefingHistoryProps) => {
  const { toast } = useToast();
  const [briefings, setBriefings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [aiFilter, setAiFilter] = useState("all");
  const [companyProfile, setCompanyProfile] = useState<any>(null);

  useEffect(() => {
    fetchBriefings();
    fetchCompanyProfile();
  }, []);

  const fetchBriefings = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("team_briefings")
        .select("*")
        .neq("status", "cancelled")
        .order("briefing_date", { ascending: true });

      if (error) throw error;
      setBriefings(data || []);
    } catch (error: any) {
      console.error("Error fetching briefings:", error);
      toast({
        title: "Error",
        description: "Failed to load briefings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("company_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setCompanyProfile(data);
    } catch (error) {
      console.error("Error fetching company profile:", error);
    }
  };

  const filteredBriefings = briefings.filter((briefing) => {
    const matchesSearch =
      briefing.briefing_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      briefing.job_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      briefing.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || briefing.status === statusFilter;

    const matchesAI =
      aiFilter === "all" ||
      (aiFilter === "ai" && briefing.ai_generated) ||
      (aiFilter === "manual" && !briefing.ai_generated);

    return matchesSearch && matchesStatus && matchesAI;
  });

  const filterButtons = [
    { id: "all", label: "All Status" },
    { id: "completed", label: "Completed" },
    { id: "scheduled", label: "Scheduled" },
    { id: "draft", label: "Draft" },
  ];

  const aiButtons = [
    { id: "all", label: "All Types" },
    { id: "ai", label: "AI Generated", icon: Sparkles },
    { id: "manual", label: "Manual" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-white">Loading briefings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-1">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Briefing History
        </h3>
        <p className="text-sm text-white">View and manage all your briefings</p>
      </div>

      {/* Sticky Filters */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm pb-3 space-y-3">
        {/* Search */}
        <div className="relative">
          {!searchTerm && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
          )}
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search briefings..."
            className={cn(
              "h-11 bg-[#1e1e1e] border-white/10 text-white placeholder:text-white touch-manipulation",
              "focus:border-yellow-500 focus:ring-yellow-500",
              !searchTerm && "pl-10"
            )}
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setStatusFilter(btn.id)}
              className={cn(
                "px-4 py-2 min-h-[44px] rounded-full text-sm font-medium whitespace-nowrap transition-all touch-manipulation active:scale-95",
                statusFilter === btn.id
                  ? "bg-elec-yellow text-black"
                  : "bg-[#1e1e1e] border border-white/10 text-white hover:text-white hover:border-white/20"
              )}
            >
              {btn.label}
            </button>
          ))}
          <div className="border-l border-white/10 mx-1" />
          {aiButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setAiFilter(btn.id)}
              className={cn(
                "px-4 py-2 min-h-[44px] rounded-full text-sm font-medium whitespace-nowrap transition-all touch-manipulation active:scale-95",
                aiFilter === btn.id
                  ? "bg-elec-yellow text-black"
                  : "bg-[#1e1e1e] border border-white/10 text-white hover:text-white hover:border-white/20"
              )}
            >
              {btn.icon && <btn.icon className="h-3 w-3 inline mr-1" />}
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {filteredBriefings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-base font-semibold text-white mb-1">No Briefings Found</h3>
          <p className="text-sm text-white text-center max-w-xs">
            {searchTerm || statusFilter !== "all" || aiFilter !== "all"
              ? "Try adjusting your filters"
              : "Create your first briefing to get started"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBriefings.map((briefing) => {
            const typeInfo =
              briefingTypeConfig[
                briefing.briefing_type as keyof typeof briefingTypeConfig
              ] || briefingTypeConfig["general"];
            const photoCount = briefing.photos?.length || 0;
            const equipmentCount = briefing.equipment?.length || 0;
            const keyPointsCount = briefing.key_points?.length || 0;
            const description =
              briefing.briefing_description || briefing.job_description || "";
            const truncatedDesc =
              description.length > 80
                ? description.substring(0, 80) + "..."
                : description;

            const status =
              statusConfig[
                briefing.completed ? "completed" : briefing.status
              ] || statusConfig.scheduled;

            return (
              <div
                key={briefing.id}
                className="bg-[#1e1e1e] border border-white/10 rounded-2xl p-4 hover:border-elec-yellow/30 transition-all active:scale-[0.995] touch-manipulation"
              >
                {/* Top badges row with actions */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      className={cn(
                        "border-0 text-xs",
                        typeInfo.color
                      )}
                    >
                      {typeInfo.label}
                    </Badge>
                    {briefing.ai_generated && (
                      <Badge className="bg-elec-yellow/15 text-elec-yellow border-0 text-xs">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI
                      </Badge>
                    )}
                    <Badge
                      className={cn(
                        "border text-xs",
                        status.bg,
                        status.text,
                        status.border
                      )}
                    >
                      {status.label === "Completed" && (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      )}
                      {status.label}
                    </Badge>
                  </div>
                  <BriefingActionsMenu
                    briefing={briefing}
                    onEdit={() => onEdit(briefing)}
                    onDuplicate={() => onDuplicate(briefing)}
                    onStatusChange={(s) => onStatusChange(briefing.id, s)}
                    onRefresh={fetchBriefings}
                  />
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">
                  {briefing.job_name || briefing.briefing_name}
                </h3>

                {/* Description preview */}
                {truncatedDesc && (
                  <p className="text-sm text-white mb-3">{truncatedDesc}</p>
                )}

                {/* Metadata grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-white" />
                    <span className="whitespace-nowrap">
                      {new Date(briefing.briefing_date).toLocaleDateString(
                        "en-GB"
                      )}{" "}
                      at {briefing.briefing_time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-white" />
                    <span className="truncate">{briefing.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-white" />
                    <span className="truncate">
                      {briefing.conductor_name || "Not specified"}
                    </span>
                  </div>
                  {briefing.team_size && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-white" />
                      <span>Team: {briefing.team_size}</span>
                    </div>
                  )}
                  {briefing.duration_minutes && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-white" />
                      <span>{briefing.duration_minutes} min</span>
                    </div>
                  )}
                  {briefing.risk_level && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase font-medium">
                        Risk: {briefing.risk_level}
                      </span>
                    </div>
                  )}
                  {photoCount > 0 && (
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-white" />
                      <span>
                        {photoCount} photo{photoCount > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                  {equipmentCount > 0 && (
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-white" />
                      <span>{equipmentCount} equipment</span>
                    </div>
                  )}
                  {keyPointsCount > 0 && (
                    <div className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-white" />
                      <span>{keyPointsCount} key points</span>
                    </div>
                  )}
                </div>

                {/* PDF Actions at bottom */}
                <div className="pt-3 border-t border-white/10">
                  <BriefingPDFActions
                    briefing={briefing}
                    companyProfile={companyProfile}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
