import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { BriefingFormWizard } from "./BriefingFormWizard";
import { TemplateLibrary } from "./briefing-templates/TemplateLibrary";
import {
  BriefingHeroCard,
  BriefingFilterTabs,
  TemplateCard,
  HistoryCard,
  PendingCard,
} from "./briefings";

interface TeamBriefing {
  id: string;
  template_id: string;
  briefing_name: string;
  location: string;
  briefing_date: string;
  briefing_time: string;
  attendees: Array<{ name: string; signature?: string; timestamp?: string; photo?: string }>;
  key_points: string[];
  safety_points: string[];
  equipment_required: string[];
  duration_minutes: number;
  notes: string;
  completed: boolean;
  status: "scheduled" | "in_progress" | "completed" | "cancelled" | "postponed";
  qr_code?: string;
  created_at: string;
}

interface NearMissData {
  id: string;
  category: string;
  categoryLabel: string;
  severity: string;
  severityLabel: string;
  description: string;
  location: string;
  incident_date: string;
  incident_time: string;
  reporter_name: string;
  potential_consequences?: string;
  immediate_actions?: string;
  preventive_measures?: string;
  photo_urls?: string[];
}

type TabId = "templates" | "history" | "pending";

const TeamBriefingTemplates = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [briefings, setBriefings] = useState<TeamBriefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAIWizard, setShowAIWizard] = useState(false);
  const [editingBriefing, setEditingBriefing] = useState<any>(null);
  const [nearMissData, setNearMissData] = useState<NearMissData | null>(null);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("templates");

  useEffect(() => {
    fetchBriefings();
    checkForNearMissData();
  }, []);

  const checkForNearMissData = () => {
    const nearMissSessionId = searchParams.get("nearMissSessionId");
    if (nearMissSessionId) {
      const storedData = sessionStorage.getItem(`nearMissData_${nearMissSessionId}`);
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData) as NearMissData;
          setNearMissData(parsedData);
          setShowAIWizard(true);
          searchParams.delete("nearMissSessionId");
          setSearchParams(searchParams, { replace: true });
          sessionStorage.removeItem(`nearMissData_${nearMissSessionId}`);
          toast({
            title: "Creating Briefing from Near Miss",
            description: "The form has been pre-filled with details from the near miss report.",
          });
        } catch (e) {
          console.error("Error parsing near miss data:", e);
        }
      }
    }
  };

  const fetchBriefings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("team_briefings")
        .select("*")
        .order("briefing_date", { ascending: false });

      if (error) throw error;
      setBriefings(
        (data || []).map((item) => ({
          ...item,
          attendees: Array.isArray(item.attendees)
            ? (item.attendees as Array<{ name: string; signature?: string; timestamp?: string; photo?: string }>)
            : [],
          key_points: item.key_points || [],
          safety_points: item.safety_points || [],
          equipment_required: item.equipment_required || [],
          duration_minutes: item.duration_minutes || 10,
          notes: item.notes || "",
          status: ((item as any).status || "scheduled") as TeamBriefing["status"],
          qr_code: (item as any).qr_code || undefined,
        }))
      );
    } catch (error) {
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

  const handleEdit = (briefing: any) => {
    setEditingBriefing(briefing);
    setNearMissData(null);
    setShowAIWizard(true);
  };

  const handleDuplicate = async (briefing: any) => {
    const { id, created_at, updated_at, status, started_at, cancelled_at, cancelled_reason, ...duplicateData } = briefing;
    setEditingBriefing({
      ...duplicateData,
      title: `${duplicateData.title || duplicateData.briefing_name} (Copy)`,
      briefing_date: null,
      briefing_time: "09:00",
    });
    setNearMissData(null);
    setShowAIWizard(true);
  };

  const handleStatusChange = async (briefingId: string, newStatus: string) => {
    try {
      const updates: any = { status: newStatus };
      if (newStatus === "in_progress") {
        updates.started_at = new Date().toISOString();
      } else if (newStatus === "completed") {
        updates.completed = true;
      }

      const { error } = await supabase
        .from("team_briefings")
        .update(updates)
        .eq("id", briefingId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Briefing marked as ${newStatus.replace("_", " ")}`,
      });

      fetchBriefings();
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update briefing status",
        variant: "destructive",
      });
    }
  };

  const handleCloseWizard = () => {
    setShowAIWizard(false);
    setEditingBriefing(null);
    setNearMissData(null);
  };

  const handleCreateNew = () => {
    setEditingBriefing(null);
    setNearMissData(null);
    setShowAIWizard(true);
  };

  // Calculate stats
  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const totalBriefings = briefings.length;
    const thisWeek = briefings.filter((b) => new Date(b.created_at) >= weekAgo).length;
    const pendingSignatures = briefings.filter(
      (b) => b.status !== "completed" && b.attendees.some((a) => !a.signature)
    ).length;
    const completedBriefings = briefings.filter((b) => b.status === "completed").length;
    const signatureRate = totalBriefings > 0 ? Math.round((completedBriefings / totalBriefings) * 100) : 0;

    return { totalBriefings, thisWeek, pendingSignatures, signatureRate };
  }, [briefings]);

  // Filter briefings by tab
  const pendingBriefings = useMemo(() => {
    return briefings.filter(
      (b) => b.status !== "completed" && b.status !== "cancelled" && b.attendees.some((a) => !a.signature)
    );
  }, [briefings]);

  const completedBriefings = useMemo(() => {
    return briefings.filter((b) => b.status === "completed" || b.attendees.every((a) => a.signature));
  }, [briefings]);

  // Tab configuration
  const tabs = [
    { id: "templates" as const, label: "Templates", count: 0 },
    { id: "history" as const, label: "History", count: completedBriefings.length },
    { id: "pending" as const, label: "Pending", count: pendingBriefings.length },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        </div>
        <div className="text-center">
          <p className="text-white font-medium">Loading Briefings</p>
          <p className="text-sm text-white/50 mt-1">Fetching your team briefings...</p>
        </div>
      </div>
    );
  }

  if (showTemplateLibrary) {
    return <TemplateLibrary onClose={() => setShowTemplateLibrary(false)} />;
  }

  if (showAIWizard) {
    return (
      <BriefingFormWizard
        initialData={editingBriefing}
        nearMissData={nearMissData}
        onClose={handleCloseWizard}
        onSuccess={() => {
          handleCloseWizard();
          fetchBriefings();
        }}
      />
    );
  }

  return (
    <div className="space-y-5 pb-24">
      {/* Hero Card */}
      <BriefingHeroCard
        totalBriefings={stats.totalBriefings}
        thisWeek={stats.thisWeek}
        pendingSignatures={stats.pendingSignatures}
        signatureRate={stats.signatureRate}
        onCreateBriefing={handleCreateNew}
      />

      {/* Tab Navigation */}
      <BriefingFilterTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as TabId)}
      />

      {/* Tab Content */}
      <div className="space-y-3">
        {/* Templates Tab */}
        {activeTab === "templates" && (
          <div className="space-y-3">
            {/* Default templates */}
            <TemplateCard
              template={{
                id: "site-induction",
                name: "Site Induction",
                description: "Standard site induction briefing",
                hazardCount: 8,
                usageCount: briefings.filter((b) => b.template_id === "site-induction").length,
                isAIPowered: true,
              }}
              onStart={handleCreateNew}
              index={0}
            />
            <TemplateCard
              template={{
                id: "toolbox-talk",
                name: "Toolbox Talk",
                description: "Daily toolbox talk template",
                hazardCount: 5,
                usageCount: briefings.filter((b) => b.template_id === "toolbox-talk").length,
                isAIPowered: true,
              }}
              onStart={handleCreateNew}
              index={1}
            />
            <TemplateCard
              template={{
                id: "electrical-safety",
                name: "Electrical Safety",
                description: "Electrical work safety briefing",
                hazardCount: 10,
                usageCount: briefings.filter((b) => b.template_id === "electrical-safety").length,
                isAIPowered: true,
              }}
              onStart={handleCreateNew}
              index={2}
            />
            <TemplateCard
              template={{
                id: "hot-works",
                name: "Hot Works Permit",
                description: "Hot works safety briefing",
                hazardCount: 7,
                usageCount: briefings.filter((b) => b.template_id === "hot-works").length,
              }}
              onStart={handleCreateNew}
              index={3}
            />

            {/* View all templates button */}
            <button
              onClick={() => setShowTemplateLibrary(true)}
              className="w-full p-4 rounded-xl border border-dashed border-white/20 text-white/50 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all min-h-[56px] active:scale-[0.98]"
            >
              View All Templates
            </button>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-3">
            {completedBriefings.length > 0 ? (
              completedBriefings.map((briefing, index) => (
                <HistoryCard
                  key={briefing.id}
                  briefing={{
                    id: briefing.id,
                    name: briefing.briefing_name,
                    location: briefing.location,
                    date: new Date(briefing.briefing_date).toLocaleDateString("en-GB"),
                    time: briefing.briefing_time,
                    attendeeCount: briefing.attendees.length,
                    status: briefing.status,
                    signedCount: briefing.attendees.filter((a) => a.signature).length,
                  }}
                  onView={() => handleEdit(briefing)}
                  onShare={() => {
                    toast({
                      title: "Share",
                      description: "Share functionality coming soon",
                    });
                  }}
                  onDownload={() => {
                    toast({
                      title: "Download",
                      description: "PDF download coming soon",
                    });
                  }}
                  index={index}
                />
              ))
            ) : (
              <div className="text-center py-12 text-white/50">
                <p>No completed briefings yet</p>
                <p className="text-sm mt-1">Create your first briefing to see it here</p>
              </div>
            )}
          </div>
        )}

        {/* Pending Tab */}
        {activeTab === "pending" && (
          <div className="space-y-3">
            {pendingBriefings.length > 0 ? (
              pendingBriefings.map((briefing, index) => (
                <PendingCard
                  key={briefing.id}
                  briefing={{
                    id: briefing.id,
                    name: briefing.briefing_name,
                    location: briefing.location,
                    date: new Date(briefing.briefing_date).toLocaleDateString("en-GB"),
                    time: briefing.briefing_time,
                    attendeeCount: briefing.attendees.length,
                    status: briefing.status,
                    signedCount: briefing.attendees.filter((a) => a.signature).length,
                  }}
                  onContinue={() => handleEdit(briefing)}
                  index={index}
                />
              ))
            ) : (
              <div className="text-center py-12 text-white/50">
                <p>No pending briefings</p>
                <p className="text-sm mt-1">All briefings are up to date</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamBriefingTemplates;
