import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Loader2, Calendar, ChevronDown, ChevronUp, Plus, FileText, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileGestureHandler } from "@/components/ui/mobile-gesture-handler";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { BriefingFormWizard } from "./BriefingFormWizard";
import { BriefingHistory } from "./BriefingHistory";
import { HeroAIBriefingCard } from "./HeroAIBriefingCard";
import { TemplateLibrary } from "./briefing-templates/TemplateLibrary";

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
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'postponed';
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

const TeamBriefingTemplates = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [briefings, setBriefings] = useState<TeamBriefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAIWizard, setShowAIWizard] = useState(false);
  const [editingBriefing, setEditingBriefing] = useState<any>(null);
  const [nearMissData, setNearMissData] = useState<NearMissData | null>(null);
  const [scheduledBriefingsExpanded, setScheduledBriefingsExpanded] = useState(false);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);

  useEffect(() => {
    fetchBriefings();
    checkForNearMissData();
  }, []);

  // Check for near miss data from sessionStorage (matching Cost Engineer → Quote Hub pattern)
  const checkForNearMissData = () => {
    const nearMissSessionId = searchParams.get('nearMissSessionId');
    if (nearMissSessionId) {
      const storedData = sessionStorage.getItem(`nearMissData_${nearMissSessionId}`);
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData) as NearMissData;
          setNearMissData(parsedData);
          setShowAIWizard(true);
          
          // Clear the URL param but keep the data
          searchParams.delete('nearMissSessionId');
          setSearchParams(searchParams, { replace: true });
          
          // Clear from sessionStorage after retrieving
          sessionStorage.removeItem(`nearMissData_${nearMissSessionId}`);
          
          toast({
            title: "Creating Briefing from Near Miss",
            description: "The form has been pre-filled with details from the near miss report.",
          });
        } catch (e) {
          console.error('Error parsing near miss data:', e);
        }
      }
    }
  };

  const fetchBriefings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('team_briefings')
        .select('*')
        .order('briefing_date', { ascending: false });

      if (error) throw error;
      setBriefings((data || []).map(item => ({
        ...item,
        attendees: Array.isArray(item.attendees) ? item.attendees as Array<{ name: string; signature?: string; timestamp?: string; photo?: string }> : [],
        key_points: item.key_points || [],
        safety_points: item.safety_points || [],
        equipment_required: item.equipment_required || [],
        duration_minutes: item.duration_minutes || 10,
        notes: item.notes || "",
        status: (item as any).status || 'scheduled' as const,
        qr_code: (item as any).qr_code || undefined
      })));
    } catch (error) {
      console.error('Error fetching briefings:', error);
      toast({
        title: "Error",
        description: "Failed to load briefings",
        variant: "destructive"
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
      
      if (newStatus === 'in_progress') {
        updates.started_at = new Date().toISOString();
      } else if (newStatus === 'completed') {
        updates.completed = true;
      }

      const { error } = await supabase
        .from("team_briefings")
        .update(updates)
        .eq("id", briefingId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Briefing marked as ${newStatus.replace('_', ' ')}`,
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

  const upcomingBriefings = briefings.filter(b => new Date(b.briefing_date) >= new Date() && b.status === 'scheduled').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        <span className="ml-2 text-muted-foreground">Loading briefings...</span>
      </div>
    );
  }

  if (showTemplateLibrary) {
    return <TemplateLibrary onClose={() => setShowTemplateLibrary(false)} />;
  }

  if (showAIWizard) {
    return <BriefingFormWizard 
      initialData={editingBriefing}
      nearMissData={nearMissData}
      onClose={handleCloseWizard} 
      onSuccess={() => {
        handleCloseWizard();
        fetchBriefings();
      }} 
    />;
  }

  return (
    <div className="space-y-6 pb-24">
      {/* MOBILE LAYOUT */}
      <div className="md:hidden space-y-4 px-3">
        {/* Hero AI Briefing Card */}
        <HeroAIBriefingCard onCreateBriefing={handleCreateNew} />

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <MobileButton
            variant="elec"
            size="wide"
            onClick={handleCreateNew}
            className="font-semibold"
          >
            <Plus className="mr-2 h-5 w-5" />
            New Briefing
          </MobileButton>
          <MobileButton
            variant="elec-outline"
            size="wide"
            onClick={() => setShowTemplateLibrary(true)}
          >
            <FileText className="mr-2 h-5 w-5" />
            Templates
          </MobileButton>
        </div>

        {/* History Tab */}
        <div className="mt-6">
          <h3 className="text-base font-semibold text-elec-light mb-3">Recent Briefings</h3>
          <BriefingHistory
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
            onStatusChange={handleStatusChange}
          />
        </div>

        {/* Scheduled Briefings - Collapsible at Bottom */}
        <div className="border-t border-elec-yellow/20 pt-6">
          <button
            onClick={() => setScheduledBriefingsExpanded(!scheduledBriefingsExpanded)}
            className="w-full flex items-center justify-between mb-4 touch-manipulation min-h-[44px]"
          >
            <h2 className="text-lg font-semibold text-elec-light flex items-center gap-2">
              <Calendar className="h-5 w-5 text-elec-yellow" />
              Your Scheduled Briefings
              {upcomingBriefings > 0 && (
                <span className="bg-elec-yellow text-elec-dark text-xs font-bold px-2 py-1 rounded-full">
                  {upcomingBriefings}
                </span>
              )}
            </h2>
            {scheduledBriefingsExpanded ? (
              <ChevronUp className="h-5 w-5 text-elec-yellow" />
            ) : (
              <ChevronDown className="h-5 w-5 text-elec-yellow" />
            )}
          </button>

          {scheduledBriefingsExpanded && (
            <div className="space-y-3 animate-fade-in">
              {briefings && briefings.filter(b => b.status !== 'cancelled' && new Date(b.briefing_date) >= new Date()).length > 0 ? (
                briefings
                  .filter(b => b.status !== 'cancelled' && new Date(b.briefing_date) >= new Date())
                  .slice(0, 5)
                  .map((briefing) => {
                    const statusColors = {
                      'completed': 'border-green-500/30 bg-green-500/5',
                      'in_progress': 'border-yellow-500/50 bg-yellow-500/5 shadow-yellow-500/20 shadow-sm',
                      'scheduled': 'border-elec-yellow/10',
                    };
                    const statusColor = statusColors[briefing.status as keyof typeof statusColors] || 'border-elec-yellow/10';
                    
                    return (
                      <div
                        key={briefing.id}
                        className={`bg-card ${statusColor} rounded-xl p-3 hover:border-elec-yellow/40 transition-all`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-elec-light mb-1 text-sm">{briefing.briefing_name}</h3>
                            <p className="text-xs text-elec-light/70">
                              {briefing.location}
                            </p>
                          </div>
                          <Badge className={`text-xs ${
                            briefing.status === 'completed' ? 'bg-green-500/20 text-green-400 border-0' :
                            briefing.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400 border-0' :
                            'bg-card border-elec-yellow/20 text-elec-light'
                          }`}>
                            {briefing.status === 'in_progress' ? 'In Progress' : briefing.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-elec-light/60">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(briefing.briefing_date).toLocaleDateString('en-GB')}</span>
                          </div>
                          {briefing.attendees?.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{briefing.attendees.length}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="bg-card border border-elec-yellow/20 rounded-xl p-6 text-center">
                  <Calendar className="h-12 w-12 text-elec-yellow/50 mx-auto mb-3" />
                  <p className="text-elec-light/70">No scheduled briefings yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:block space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <MobileGestureHandler onTap={() => {}}>
            <Card className="border-primary/30">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{briefings.length}</div>
                <div className="text-sm text-muted-foreground">Total Briefings</div>
              </CardContent>
            </Card>
          </MobileGestureHandler>
          
          <Card className="border-primary/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">
                {briefings.filter(b => b.status === 'completed').length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          
          <Card className="border-secondary/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-secondary-foreground">
                {briefings.reduce((total, b) => total + b.attendees.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Attendees</div>
            </CardContent>
          </Card>
          
          <Card className="border-accent/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-accent-foreground">
                {upcomingBriefings}
              </div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Content */}
        <div className="space-y-6">
          <HeroAIBriefingCard onCreateBriefing={handleCreateNew} />
          
          <div>
            <h3 className="text-xl font-semibold text-elec-light mb-4">Recent Briefings</h3>
            <BriefingHistory
              onEdit={handleEdit}
              onDuplicate={handleDuplicate}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>

        {/* Desktop Scheduled Briefings */}
        <div>
          <h2 className="text-xl font-semibold text-elec-light mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            Scheduled Briefings
          </h2>
          {briefings && briefings.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {briefings.map((briefing) => (
                <Card key={briefing.id} className="border-elec-yellow/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-elec-light">{briefing.briefing_name}</h3>
                        <p className="text-sm text-elec-light/70">{briefing.location}</p>
                      </div>
                      <Badge className={`${
                        briefing.status === 'completed' ? 'bg-primary/10 text-primary' :
                        'bg-card text-elec-light'
                      }`}>
                        {briefing.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-elec-light/60">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(briefing.briefing_date).toLocaleDateString('en-GB')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{briefing.attendees.length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-elec-yellow/20">
              <CardContent className="p-6 text-center">
                <Calendar className="h-12 w-12 text-elec-yellow/50 mx-auto mb-3" />
                <p className="text-elec-light/70">No scheduled briefings yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamBriefingTemplates;
