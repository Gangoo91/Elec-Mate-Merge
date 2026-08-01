import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, FileText, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { BriefingFormWizard } from './BriefingFormWizard';
import { BriefingDetailView } from './BriefingDetailView';
import { TemplateLibrary } from './briefing-templates/TemplateLibrary';
import { BriefingFilterTabs, HistoryCard, PendingCard } from './briefings';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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

/**
 * Briefing templates come from the `briefing_templates` table, which holds five
 * real templates with section schemas ("Work Scope", "Hazard Analysis", "BS 7671
 * Compliance", …).
 *
 * They used to be a hardcoded array of fourteen cards — "Site Induction", "Hot
 * Works Permit", "Safe Isolation (GS38)" — none of which existed in the table,
 * and every one of which called `handleCreateNew()` with no argument. Tapping
 * "Hot Works Permit" opened exactly the same blank form as tapping "Site
 * Induction". The templates were a picture of a feature: all five real templates
 * still showed `usage_count: 0` because nothing could ever increment them.
 */
interface BriefingTemplate {
  id: string;
  name: string;
  description: string | null;
  template_type: string;
  usage_count: number | null;
  template_schema: { sections?: { id: string; title: string; required?: boolean }[] } | null;
}

/**
 * The table and the wizard's type picker were written against different
 * vocabularies: the table uses `site-work` / `lfe` / `hse-update` /
 * `safety-alert`, the picker offers `site-induction` / `electrical` /
 * `hot-works` / `height-work`. Only `toolbox-talk` exists in both.
 *
 * Rather than invent a mapping that quietly puts a briefing under the wrong
 * heading, anything without a genuine counterpart seeds as `custom` — which is
 * exactly what it is: a briefing whose content you write yourself.
 */
const TEMPLATE_TYPE_TO_BRIEFING_TYPE: Record<string, string> = {
  'toolbox-talk': 'toolbox-talk',
};

const TeamBriefingTemplates = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [briefings, setBriefings] = useState<TeamBriefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAIWizard, setShowAIWizard] = useState(false);
  const [templates, setTemplates] = useState<BriefingTemplate[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  /** Prefill for a briefing started from a template. Never carries an `id`. */
  const [templateSeed, setTemplateSeed] = useState<Record<string, unknown> | null>(null);
  const [editingBriefing, setEditingBriefing] = useState<TeamBriefing | null>(null);
  const [viewingBriefing, setViewingBriefing] = useState<TeamBriefing | null>(null);
  const [nearMissData, setNearMissData] = useState<NearMissData | null>(null);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('active');

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

  useEffect(() => {
    fetchBriefings();
    checkForNearMissData();
  }, [checkForNearMissData]);

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
    // Clear the template prefill too, or the next "New briefing" reopens the
    // last template's skeleton.
    setTemplateSeed(null);
  };

  const handleCreateNew = () => {
    setEditingBriefing(null);
    setNearMissData(null);
    setTemplateSeed(null);
    setShowAIWizard(true);
  };

  /**
   * Load the real templates. `is_public` covers the five defaults; a user's own
   * templates come back under RLS.
   */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('briefing_templates')
        .select('id, name, description, template_type, usage_count, template_schema')
        .order('usage_count', { ascending: false })
        .order('name');
      if (cancelled) return;
      if (error) {
        console.error('Error loading briefing templates:', error);
      } else {
        setTemplates((data ?? []) as BriefingTemplate[]);
      }
      setTemplatesLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * Actually apply the template.
   *
   * The seed deliberately carries **no `id`** — the wizard treats `initialData.id`
   * as "this is an existing briefing" and switches from insert to update, so a
   * seed with an id would overwrite whatever row that id belonged to.
   *
   * The section titles become a skeleton in the content field. That is the whole
   * point of a template: "Site Work Installation" should hand you Work Scope,
   * Hazard Analysis and BS 7671 Compliance to fill in, not a blank box.
   */
  const handleUseTemplate = (template: BriefingTemplate) => {
    const sections = template.template_schema?.sections ?? [];
    const skeleton = sections.length ? sections.map((s) => `${s.title}\n`).join('\n') : '';

    setEditingBriefing(null);
    setNearMissData(null);
    setTemplateSeed({
      briefing_type: TEMPLATE_TYPE_TO_BRIEFING_TYPE[template.template_type] ?? 'custom',
      briefing_name: template.name,
      briefing_description: skeleton,
    });
    setShowAIWizard(true);

    // Fire-and-forget usage count. `.rpc()`/`.from()` return thenables, not real
    // Promises — attaching `.catch()` throws and the request never sends, so the
    // error is handled inside the await instead.
    void (async () => {
      const { error } = await supabase
        .from('briefing_templates')
        .update({ usage_count: (template.usage_count ?? 0) + 1 })
        .eq('id', template.id);
      if (error) console.error('Could not record template usage:', error);
    })();
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
        initialData={editingBriefing ?? templateSeed}
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
      {/* Header — typography only. The purple icon tile and the boxed stat
          pills went: the design system carries hierarchy in type, and an accent
          colour that is not elec-yellow reads as a different product. */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-white tracking-tight">Team Briefings</h1>
          <p className="text-[11px] text-white tabular-nums tracking-wide">
            Toolbox talks · HSG250
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="h-11 shrink-0 rounded-xl bg-elec-yellow px-4 text-sm font-semibold text-black touch-manipulation active:scale-[0.97] transition-transform"
        >
          New briefing
        </button>
      </div>

      {/* Stats as figures, not chips. Tabular nums so they do not jitter as the
          counts change, and the pending figure carries the only colour — it is
          the one that needs acting on. */}
      <div className="flex items-baseline gap-6 border-b border-white/[0.1] pb-3">
        <div>
          <p className="text-xl font-bold text-white tabular-nums leading-none">{stats.thisWeek}</p>
          <p className="mt-1 text-[11px] text-white">This week</p>
        </div>
        <div>
          <p
            className={cn(
              'text-xl font-bold tabular-nums leading-none',
              stats.pendingSignatures > 0 ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {stats.pendingSignatures}
          </p>
          <button
            type="button"
            onClick={() => stats.pendingSignatures > 0 && setActiveTab('active')}
            disabled={stats.pendingSignatures === 0}
            className="mt-1 text-[11px] text-white underline-offset-2 touch-manipulation enabled:underline"
          >
            Awaiting signature
          </button>
        </div>
        <div>
          <p className="text-xl font-bold text-white tabular-nums leading-none">
            {stats.signatureRate}%
          </p>
          <p className="mt-1 text-[11px] text-white">Signed off</p>
        </div>
      </div>

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
                <h3 className="text-base font-semibold text-white mb-1">Nothing outstanding</h3>
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

        {/* Templates — one per row.
            A two-column grid gave each card about 150px, so every title was
            truncated ("Hot Works Per…", "Working at Hei…", "Safe Isolation (…")
            and every description was clamped to one line ("Standard site…").
            The user could not read what any template was without opening it.
            Full-width rows fit the whole name and the whole description, and
            the row itself is the tap target rather than a 10px "Use" link.

            The identical yellow document icon that sat on all fourteen cards is
            gone: an icon repeated on every row distinguishes nothing. */}
        {activeTab === 'templates' && (
          <div className="space-y-3">
            {templatesLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
              </div>
            ) : templates.length === 0 ? (
              <p className="py-10 text-center text-[13px] text-white">
                No templates available yet.
              </p>
            ) : (
              <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {templates.map((template, index) => {
                  const sectionCount = template.template_schema?.sections?.length ?? 0;
                  return (
                    <motion.button
                      key={template.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                      onClick={() => handleUseTemplate(template)}
                      className="w-full touch-manipulation px-1 py-3.5 text-left transition-colors active:bg-white/[0.04]"
                    >
                      <p className="text-[15px] font-semibold text-white">{template.name}</p>
                      {template.description && (
                        <p className="mt-0.5 text-[13px] leading-snug text-white">
                          {template.description}
                        </p>
                      )}
                      {sectionCount > 0 && (
                        <p className="mt-1 text-[12px] tabular-nums text-white">
                          {sectionCount} section{sectionCount === 1 ? '' : 's'} to complete
                        </p>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            <button
              onClick={() => setShowTemplateLibrary(true)}
              className="min-h-[44px] w-full touch-manipulation rounded-xl border border-dashed border-white/20 p-3 text-[14px] font-medium text-white transition-colors hover:border-white/30 hover:bg-white/5 active:scale-[0.98]"
            >
              Manage templates
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamBriefingTemplates;
