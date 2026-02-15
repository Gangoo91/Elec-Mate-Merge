import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Loader2,
  FileText,
  Clock,
  CheckCircle,
  Plus,
  Users,
  AlertTriangle,
  Sparkles,
  Play,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { BriefingFormWizard } from './BriefingFormWizard';
import { BriefingDetailView } from './BriefingDetailView';
import { TemplateLibrary } from './briefing-templates/TemplateLibrary';
import { BriefingFilterTabs, HistoryCard, PendingCard } from './briefings';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface TeamBriefing {
  id: string;
  template_id: string;
  briefing_name: string;
  location: string;
  briefing_date: string;
  briefing_time: string;
  attendees: Array<{
    name: string;
    role?: string;
    signature?: string;
    timestamp?: string;
    photo?: string;
  }>;
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
  photos?: string[];
}

type TabId = 'active' | 'recent' | 'templates';

const TEMPLATES = [
  {
    id: 'site-induction',
    name: 'Site Induction',
    description: 'Standard site induction briefing',
    hazardCount: 8,
    isAIPowered: true,
  },
  {
    id: 'toolbox-talk',
    name: 'Toolbox Talk',
    description: 'Daily toolbox talk template',
    hazardCount: 5,
    isAIPowered: true,
  },
  {
    id: 'electrical-safety',
    name: 'Electrical Safety',
    description: 'Electrical work safety briefing',
    hazardCount: 10,
    isAIPowered: true,
  },
  {
    id: 'hot-works',
    name: 'Hot Works Permit',
    description: 'Hot works safety briefing',
    hazardCount: 7,
    isAIPowered: false,
  },
];

const TeamBriefingTemplates = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [briefings, setBriefings] = useState<TeamBriefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAIWizard, setShowAIWizard] = useState(false);
  const [editingBriefing, setEditingBriefing] = useState<TeamBriefing | null>(null);
  const [viewingBriefing, setViewingBriefing] = useState<TeamBriefing | null>(null);
  const [nearMissData, setNearMissData] = useState<NearMissData | null>(null);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('active');

  useEffect(() => {
    fetchBriefings();
    checkForNearMissData();
     
  }, [checkForNearMissData]);

  const checkForNearMissData = useCallback(() => {
    const nearMissSessionId = searchParams.get('nearMissSessionId');
    if (nearMissSessionId) {
      const storedData = sessionStorage.getItem(`nearMissData_${nearMissSessionId}`);
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData) as NearMissData;
          setNearMissData(parsedData);
          setShowAIWizard(true);
          searchParams.delete('nearMissSessionId');
          setSearchParams(searchParams, { replace: true });
          sessionStorage.removeItem(`nearMissData_${nearMissSessionId}`);
          toast({
            title: 'Creating Briefing from Near Miss',
            description: 'The form has been pre-filled with details from the near miss report.',
          });
        } catch (e) {
          console.error('Error parsing near miss data:', e);
        }
      }
    }
  }, [searchParams, setSearchParams]);

  const fetchBriefings = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('team_briefings')
        .select('*')
        .order('briefing_date', { ascending: false });

      if (error) throw error;
      setBriefings(
        (data || []).map((item) => ({
          ...item,
          attendees: Array.isArray(item.attendees)
            ? (item.attendees as Array<{
                name: string;
                role?: string;
                signature?: string;
                timestamp?: string;
                photo?: string;
              }>)
            : [],
          key_points: item.key_points || [],
          safety_points: item.safety_points || [],
          equipment_required: item.equipment_required || [],
          duration_minutes: item.duration_minutes || 10,
          notes: item.notes || '',
          status: (((item as Record<string, unknown>).status as string) ||
            'scheduled') as TeamBriefing['status'],
          qr_code: (item as Record<string, unknown>).qr_code as string | undefined,
        }))
      );
    } catch (error) {
      console.error('Error fetching briefings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load briefings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (briefing: TeamBriefing) => {
    setEditingBriefing(briefing);
    setNearMissData(null);
    setShowAIWizard(true);
  };

  const handleView = (briefing: TeamBriefing) => {
    setViewingBriefing(briefing);
  };

  const handleDuplicate = async (briefing: TeamBriefing & Record<string, unknown>) => {
    const {
      id,
      created_at,
      updated_at,
      status,
      started_at,
      cancelled_at,
      cancelled_reason,
      ...duplicateData
    } = briefing;
    setEditingBriefing({
      ...duplicateData,
      title: `${duplicateData.title || duplicateData.briefing_name} (Copy)`,
      briefing_date: null,
      briefing_time: '09:00',
    });
    setNearMissData(null);
    setShowAIWizard(true);
  };

  const handleStatusChange = async (briefingId: string, newStatus: string) => {
    try {
      const updates: Record<string, unknown> = { status: newStatus };
      if (newStatus === 'in_progress') {
        updates.started_at = new Date().toISOString();
      } else if (newStatus === 'completed') {
        updates.completed = true;
      }

      const { error } = await supabase.from('team_briefings').update(updates).eq('id', briefingId);

      if (error) throw error;

      toast({
        title: 'Status Updated',
        description: `Briefing marked as ${newStatus.replace('_', ' ')}`,
      });

      fetchBriefings();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update briefing status',
        variant: 'destructive',
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
      (b) => b.status !== 'completed' && b.attendees.some((a) => !a.signature)
    ).length;
    const completedBriefings = briefings.filter((b) => b.status === 'completed').length;
    const signatureRate =
      totalBriefings > 0 ? Math.round((completedBriefings / totalBriefings) * 100) : 0;

    return { totalBriefings, thisWeek, pendingSignatures, signatureRate };
  }, [briefings]);

  // Filter briefings by tab
  const pendingBriefings = useMemo(() => {
    return briefings.filter(
      (b) =>
        b.status !== 'completed' &&
        b.status !== 'cancelled' &&
        b.attendees.some((a) => !a.signature)
    );
  }, [briefings]);

  const recentBriefings = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return briefings.filter(
      (b) =>
        (b.status === 'completed' || b.attendees.every((a) => a.signature)) &&
        new Date(b.created_at) >= thirtyDaysAgo
    );
  }, [briefings]);

  // Tab configuration — Active first, then Recent, then Templates
  const tabs = [
    { id: 'active' as const, label: 'Active', count: pendingBriefings.length },
    { id: 'recent' as const, label: 'Recent', count: recentBriefings.length },
    { id: 'templates' as const, label: 'Templates', count: 0 },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        </div>
        <div className="text-center">
          <p className="text-white font-medium">Loading Briefings</p>
          <p className="text-sm text-white mt-1">Fetching your team briefings...</p>
        </div>
      </div>
    );
  }

  if (showTemplateLibrary) {
    return <TemplateLibrary onClose={() => setShowTemplateLibrary(false)} />;
  }

  if (viewingBriefing) {
    return (
      <BriefingDetailView
        briefing={viewingBriefing}
        onClose={() => {
          setViewingBriefing(null);
          fetchBriefings();
        }}
        onEdit={() => {
          const b = viewingBriefing;
          setViewingBriefing(null);
          handleEdit(b);
        }}
      />
    );
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
    <div className="space-y-4 pb-24">
      {/* Compact header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Users className="h-5 w-5 text-purple-400" />
          </div>
          <h1 className="text-lg font-bold text-white">Team Briefings</h1>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-elec-yellow text-black text-sm font-semibold touch-manipulation min-h-[44px] active:scale-[0.97] transition-transform"
        >
          <Plus className="h-4 w-4" />
          New Briefing
        </button>
      </div>

      {/* Stat pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10">
          <FileText className="h-3 w-3 text-white" />
          <span className="text-xs font-semibold text-white">{stats.thisWeek} This Week</span>
        </div>
        <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
          <Clock className="h-3 w-3 text-amber-400" />
          <span className="text-xs font-semibold text-white">
            {stats.pendingSignatures} Pending
          </span>
        </div>
        <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <CheckCircle className="h-3 w-3 text-emerald-400" />
          <span className="text-xs font-semibold text-white">
            {stats.signatureRate}% Sign-off Rate
          </span>
        </div>
      </div>

      {/* Pending signatures alert banner */}
      {stats.pendingSignatures > 0 && (
        <motion.button
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setActiveTab('active')}
          className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left touch-manipulation active:bg-amber-500/15 transition-colors"
        >
          <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0" />
          <span className="text-sm text-white font-medium">
            {stats.pendingSignatures} briefing{stats.pendingSignatures > 1 ? 's' : ''} awaiting
            signatures
          </span>
        </motion.button>
      )}

      {/* Tab Navigation */}
      <BriefingFilterTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(id) => setActiveTab(id as TabId)}
      />

      {/* Tab Content */}
      <div className="space-y-3">
        {/* Active Tab — pending briefings needing signatures */}
        {activeTab === 'active' && (
          <div className="space-y-3">
            {pendingBriefings.length > 0 ? (
              pendingBriefings.map((briefing, index) => (
                <PendingCard
                  key={briefing.id}
                  briefing={{
                    id: briefing.id,
                    name: briefing.briefing_name,
                    location: briefing.location,
                    date: new Date(briefing.briefing_date).toLocaleDateString('en-GB'),
                    time: briefing.briefing_time,
                    attendeeCount: briefing.attendees.length,
                    status: briefing.status,
                    signedCount: briefing.attendees.filter((a) => a.signature).length,
                  }}
                  onContinue={() => handleView(briefing)}
                  index={index}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">All Clear</h3>
                <p className="text-sm text-white text-center max-w-xs mb-5">
                  No pending briefings — start one from Templates.
                </p>
                <button
                  onClick={() => setActiveTab('templates')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white text-sm font-semibold touch-manipulation min-h-[44px] active:scale-[0.97] transition-transform border border-white/10"
                >
                  <FileText className="h-4 w-4" />
                  View Templates
                </button>
              </div>
            )}
          </div>
        )}

        {/* Recent Tab — completed briefings last 30 days */}
        {activeTab === 'recent' && (
          <div className="space-y-3">
            {recentBriefings.length > 0 ? (
              recentBriefings.map((briefing, index) => (
                <HistoryCard
                  key={briefing.id}
                  briefing={{
                    id: briefing.id,
                    name: briefing.briefing_name,
                    location: briefing.location,
                    date: new Date(briefing.briefing_date).toLocaleDateString('en-GB'),
                    time: briefing.briefing_time,
                    attendeeCount: briefing.attendees.length,
                    status: briefing.status,
                    signedCount: briefing.attendees.filter((a) => a.signature).length,
                  }}
                  onView={() => handleView(briefing)}
                  onShare={() => {
                    toast({
                      title: 'Share',
                      description: 'Share functionality coming soon',
                    });
                  }}
                  onDownload={() => {
                    toast({
                      title: 'Download',
                      description: 'PDF download coming soon',
                    });
                  }}
                  index={index}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">No Recent Briefings</h3>
                <p className="text-sm text-white text-center max-w-xs mb-5">
                  Completed briefings from the last 30 days will appear here.
                </p>
                <button
                  onClick={handleCreateNew}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-elec-yellow text-black text-sm font-semibold touch-manipulation min-h-[44px] active:scale-[0.97] transition-transform"
                >
                  <Plus className="h-4 w-4" />
                  Create Briefing
                </button>
              </div>
            )}
          </div>
        )}

        {/* Templates Tab — compact 2×2 grid */}
        {activeTab === 'templates' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((template, index) => (
                <motion.button
                  key={template.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.2 }}
                  onClick={handleCreateNew}
                  className="relative overflow-hidden rounded-2xl bg-[#1e1e1e] border border-white/10 p-4 text-left touch-manipulation active:scale-[0.97] active:bg-white/[0.06] transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                      <FileText className="h-3.5 w-3.5 text-elec-yellow" />
                    </div>
                    {template.isAIPowered && (
                      <Badge className="bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20 text-[9px] px-1 py-0">
                        <Sparkles className="h-2 w-2 mr-0.5" />
                        AI
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-0.5 truncate">
                    {template.name}
                  </h3>
                  <p className="text-[11px] text-white line-clamp-1">{template.description}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Play className="h-3 w-3 text-elec-yellow" />
                    <span className="text-[10px] font-semibold text-elec-yellow">Use</span>
                  </div>
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => setShowTemplateLibrary(true)}
              className="w-full p-4 rounded-xl border border-dashed border-white/20 text-white hover:text-white hover:bg-white/5 hover:border-white/30 transition-all min-h-[56px] active:scale-[0.98] touch-manipulation"
            >
              View All Templates
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamBriefingTemplates;
