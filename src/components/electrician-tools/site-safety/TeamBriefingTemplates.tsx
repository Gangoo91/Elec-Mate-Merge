import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { BriefingFormWizard } from './BriefingFormWizard';
import { BriefingDetailView } from './BriefingDetailView';
import { TemplateLibrary } from './briefing-templates/TemplateLibrary';
import {
  BriefingFilterTabs,
  BriefingShareSheet,
  HistoryCard,
  PendingCard,
  briefingTypeForTemplate,
} from './briefings';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * A type alias rather than an `interface` on purpose: TypeScript grants an
 * implicit index signature to object *type aliases* but not to interfaces, and
 * the wizard's prefill prop is an open bag of unknown values. As an interface,
 * handing a briefing straight to the wizard for editing did not typecheck.
 */
type TeamBriefing = {
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
  /**
   * These four are the whole of it. `team_briefings_status_check` on the live
   * database is `CHECK (status = ANY (ARRAY['scheduled','in_progress',
   * 'completed','cancelled']))`, so the `'postponed'` this type used to carry
   * was a value the database would reject on write and can never return on
   * read — it only ever succeeded in breaking assignment to every component
   * that types its status honestly.
   */
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  qr_code?: string;
  created_at: string;
};

/**
 * "Delivered" is not `status === 'completed'` alone.
 *
 * The wizard has always written `completed: true` while leaving `status` at
 * `'scheduled'`, and the live table shows the result: fifteen briefings sitting
 * at scheduled/completed=true. Reading only `status` meant the Recent tab and
 * the signed-off figure ignored every briefing this app has ever finished.
 */
const isDelivered = (b: TeamBriefing) => b.status === 'completed' || b.completed === true;

/** Empty register counts as signed — there is nobody outstanding. */
const isFullySigned = (b: TeamBriefing) => b.attendees.every((a) => a.signature);

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
  /** The briefing whose signing link is being shared from the list. */
  const [sharingBriefing, setSharingBriefing] = useState<TeamBriefing | null>(null);

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

  /*
   * `handleDuplicate` and `handleStatusChange` lived here and were never
   * rendered — nothing in this file passed either of them to a card, a menu or
   * a button, so neither could ever run. They were also both wrong: the
   * duplicate wrote its "(Copy)" suffix to a `title` key the wizard does not
   * read (it reads `briefing_name`), so a duplicate would have opened under the
   * original's name; and the status change offered values the database's
   * `team_briefings_status_check` rejects. Deleting them rather than wiring
   * them up: the detail view already owns status changes, and duplication is a
   * feature nobody has asked for and nobody had access to.
   */

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
      briefing_type: briefingTypeForTemplate(template.template_type),
      briefing_name: template.name,
      briefing_description: skeleton,
    });
    setShowAIWizard(true);

    /*
     * There used to be a fire-and-forget `usage_count` increment here. It could
     * never work and never reported that it hadn't.
     *
     * All five templates are the seeded public ones, and every one has
     * `user_id IS NULL`. The UPDATE policy on `briefing_templates` is
     * `auth.uid() = user_id`, so the row is invisible to the write, PostgREST
     * matches nothing, and the call returns success with zero rows affected —
     * no error to log. `usage_count` was always going to read 0 for ever, which
     * is also why ordering the list by it does nothing today.
     *
     * Counting template usage needs a SECURITY DEFINER function server-side; a
     * client UPDATE cannot do it without handing users write access to every
     * public template. Rather than keep code that looks like it records usage,
     * it is gone until that function exists.
     */
  };

  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const live = briefings.filter((b) => b.status !== 'cancelled');

    const totalBriefings = briefings.length;
    const thisWeek = briefings.filter((b) => new Date(b.created_at) >= weekAgo).length;
    // A cancelled briefing is not awaiting anyone's signature. The old count
    // asked only whether the status was not 'completed', so the three cancelled
    // briefings on the live table were being reported as outstanding work.
    const pendingSignatures = live.filter((b) => !isFullySigned(b)).length;
    const signedOff = live.filter((b) => isDelivered(b) && isFullySigned(b)).length;
    const signatureRate = live.length > 0 ? Math.round((signedOff / live.length) * 100) : 0;

    return { totalBriefings, thisWeek, pendingSignatures, signatureRate };
  }, [briefings]);

  /**
   * Active = anything not cancelled that is either unfinished or still short of
   * a signature. The old test additionally required `attendees.some(unsigned)`,
   * which meant a briefing saved with an empty register — the most unfinished
   * state there is — appeared in neither tab and became invisible.
   */
  const pendingBriefings = useMemo(
    () =>
      briefings.filter((b) => b.status !== 'cancelled' && (!isDelivered(b) || !isFullySigned(b))),
    [briefings]
  );

  const recentBriefings = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return briefings.filter(
      (b) => isDelivered(b) && isFullySigned(b) && new Date(b.created_at) >= thirtyDaysAgo
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
        <div className="p-4 rounded-2xl border border-elec-yellow/35">
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
          {/* This read "Toolbox talks · HSG250". HSG250 is *Guidance on
              permit-to-work systems: a guide for the petroleum, chemical and
              allied industries* — it is the reference behind the Permit to Work
              module and has nothing to say about toolbox talks. It appears to
              have been copied off the permit shell, whose docstring uses
              "PTW-2026-0012 · HSG250" as its worked example. A wrong standard
              printed under the title of a safety record is worse than no
              standard, so it is a plain description now. */}
          <p className="text-[11px] text-white tracking-wide">Toolbox talks and site briefings</p>
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
              /* One primary action, one quieter alternative — the two buttons
                 used to be the same weight, so "start from scratch" and "start
                 from a template" competed. */
              <div className="flex flex-col items-center justify-center py-16">
                <h3 className="mb-1 text-base font-semibold text-white">Nothing outstanding</h3>
                <p className="mb-5 max-w-xs text-center text-sm text-white">
                  Every briefing is signed off. Start the next one when you are on site.
                </p>
                <button
                  onClick={handleCreateNew}
                  className="h-11 w-full max-w-[16rem] touch-manipulation rounded-xl bg-elec-yellow px-5 text-sm font-semibold text-black transition-[filter,transform] active:scale-[0.97] active:brightness-110"
                >
                  New briefing
                </button>
                <button
                  onClick={() => setActiveTab('templates')}
                  className="mt-2 h-11 touch-manipulation px-4 text-sm font-medium text-white underline underline-offset-4"
                >
                  Start from a template
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
                  /* Share opens the real signing-link sheet. It used to fire a
                     "Share functionality coming soon" toast next to a "PDF
                     download coming soon" toast, while BriefingShareSheet and
                     BriefingPDFActions were both already built and wired into
                     the detail view one tap away. The PDF button is gone rather
                     than duplicated: generating a briefing PDF is a polling
                     state machine that belongs on the record, not on a list
                     row. */
                  onShare={() => setSharingBriefing(briefing)}
                  index={index}
                />
              ))
            ) : (
              /* The empty state's decorative icon tile is gone — a generic
                 document glyph in a box says nothing the heading does not. */
              <div className="flex flex-col items-center justify-center py-16">
                <h3 className="mb-1 text-base font-semibold text-white">No recent briefings</h3>
                <p className="mb-5 max-w-xs text-center text-sm text-white">
                  Briefings appear here once they are delivered and everyone on the register has
                  signed.
                </p>
                <button
                  onClick={handleCreateNew}
                  className="h-11 w-full max-w-[16rem] touch-manipulation rounded-xl bg-elec-yellow px-5 text-sm font-semibold text-black transition-[filter,transform] active:scale-[0.97] active:brightness-110"
                >
                  New briefing
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

      {sharingBriefing && (
        <BriefingShareSheet
          briefingId={sharingBriefing.id}
          briefingName={sharingBriefing.briefing_name}
          onClose={() => setSharingBriefing(null)}
        />
      )}
    </div>
  );
};

export default TeamBriefingTemplates;
