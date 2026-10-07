import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import { RiskThresholdsCard } from '@/components/college/settings/RiskThresholdsCard';

/* ==========================================================================
   CurriculumSettingsPage — /college/settings/curriculum

   College-level configuration that shapes every AI lesson plan we generate:
     - British Values embedding (Ofsted/DfE mandate)
     - Stretch & Challenge tasks
     - Inclusive Practice strategies
     - Optional Prevent lead + DSL names for safeguarding wording

   Rebuilt on the shared hub shell. The old page drew its own hero, its own
   back link at white/65, boxed inputs on hsl(0 0% 10%) and a volt-tinted
   toggle card — all four are dialects this app has retired. Masthead →
   two cards → one solid volt Save.
   ========================================================================== */

interface Settings {
  include_british_values: boolean;
  include_stretch_challenge: boolean;
  include_inclusive_practice: boolean;
  prevent_lead_name: string | null;
  dsl_name: string | null;
  safeguarding_notes: string | null;
  additional_frameworks: string | null;
}

const DEFAULTS: Settings = {
  include_british_values: true,
  include_stretch_challenge: true,
  include_inclusive_practice: true,
  prevent_lead_name: null,
  dsl_name: null,
  safeguarding_notes: null,
  additional_frameworks: null,
};

const BACK_TO = '/college?section=collegesettings';

const HELP: PageHelpContent = {
  id: 'college-curriculum-settings',
  title: 'Lesson plan settings',
  what: 'What every lesson plan generated for your college must include, and the safeguarding names and wording it can use.',
  steps: [
    {
      title: 'Choose what is always in',
      body: 'British values, stretch and challenge, and inclusive practice. Each is on by default, matching Ofsted and DfE expectations for FE.',
    },
    {
      title: 'Add your names',
      body: 'Your designated safeguarding lead and Prevent lead, so plans name the right people.',
    },
    { title: 'Save', body: 'The next plan anyone at your college generates uses these settings.' },
    {
      title: 'Set your risk flags',
      body: 'Further down: the attendance target and the gaps that flag a learner at risk, and the score for medium, high and critical. Saved separately, used from the next nightly check.',
    },
  ],
};
const PUSH_CONTEXT = 'Get notified about marking, off-the-job hours and learners who need you';

export default function CurriculumSettingsPage() {
  const { toast } = useToast();
  const [collegeId, setCollegeId] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: userRes } = await supabase.auth.getUser();
      if (!userRes?.user) return;
      const collegeId = await getMyCollegeId(userRes.user.id).catch(() => null);
      if (!collegeId) {
        if (!cancelled) setLoading(false);
        return;
      }
      if (cancelled) return;
      setCollegeId(collegeId);

      const { data } = await supabase
        .from('college_curriculum_settings')
        .select(
          'include_british_values, include_stretch_challenge, include_inclusive_practice, prevent_lead_name, dsl_name, safeguarding_notes, additional_frameworks'
        )
        .eq('college_id', collegeId)
        .maybeSingle();
      if (cancelled) return;
      if (data) setSettings(data as Settings);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const save = async () => {
    if (!collegeId) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('college_curriculum_settings')
        .upsert({ college_id: collegeId, ...settings }, { onConflict: 'college_id' });
      if (error) throw error;
      toast({ title: 'Settings saved', description: 'Next lesson plan will use these settings.' });
    } catch (e) {
      toast({
        title: 'Could not save',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title="Lesson plan settings"
        backTo={BACK_TO}
        trailing={<PageHelpButton help={HELP} compact />}
      />
      <HubBody pushContext={PUSH_CONTEXT}>
        <CollegePageHeader
          eyebrow="Settings"
          title="Lesson plan settings"
          description="What every generated lesson plan must include. Defaults match Ofsted and DfE expectations for FE providers in England."
          actions={
            collegeId ? (
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className={cn(COLLEGE_BTN_PRIMARY, 'hidden sm:inline-flex')}
              >
                {saving ? 'Saving…' : 'Save settings'}
              </button>
            ) : undefined
          }
        />
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
          </div>
        ) : !collegeId ? (
          <CollegeEmpty
            title="You are not linked to a college yet"
            body="Ask your admin to add you to the staff roster."
          />
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid items-start gap-6 lg:grid-cols-2"
            >
              <motion.section variants={itemVariants} className="space-y-3">
                <CollegeSectionTitle
                  title="Always included"
                  sub="Switch off only what your college covers elsewhere."
                />
                <div className={COLLEGE_LIST}>
                  <ul className="divide-y divide-white/[0.06]">
                    <ToggleRow
                      label="British values"
                      hint="Democracy, rule of law, individual liberty, mutual respect, tolerance of faiths and beliefs, embedded in specific activities. Required by the Prevent duty."
                      on={settings.include_british_values}
                      onToggle={(v) => setSettings((s) => ({ ...s, include_british_values: v }))}
                    />
                    <ToggleRow
                      label="Stretch and challenge"
                      hint="Extension tasks for higher-attaining learners, using the top Bloom levels (analyse, evaluate, create)."
                      on={settings.include_stretch_challenge}
                      onToggle={(v) => setSettings((s) => ({ ...s, include_stretch_challenge: v }))}
                    />
                    <ToggleRow
                      label="Inclusive practice"
                      hint="Concrete strategies per need: SEND, EAL, EHCP, neurodivergence, prior-attainment spread. Named moves, not platitudes."
                      on={settings.include_inclusive_practice}
                      onToggle={(v) =>
                        setSettings((s) => ({ ...s, include_inclusive_practice: v }))
                      }
                    />
                  </ul>
                </div>
              </motion.section>

              <motion.section variants={itemVariants} className="space-y-3">
                <CollegeSectionTitle
                  title="Safeguarding context"
                  sub="Names and wording plans can use."
                />
                <div className={cn(COLLEGE_CARD, 'space-y-5')}>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="dsl-name" className={labelCn}>
                        Designated safeguarding lead (DSL)
                      </label>
                      <input
                        id="dsl-name"
                        type="text"
                        value={settings.dsl_name ?? ''}
                        onChange={(e) =>
                          setSettings((s) => ({ ...s, dsl_name: e.target.value || null }))
                        }
                        placeholder="e.g. Jane Smith"
                        className={inputCn}
                      />
                    </div>
                    <div>
                      <label htmlFor="prevent-lead" className={labelCn}>
                        Prevent lead
                      </label>
                      <input
                        id="prevent-lead"
                        type="text"
                        value={settings.prevent_lead_name ?? ''}
                        onChange={(e) =>
                          setSettings((s) => ({ ...s, prevent_lead_name: e.target.value || null }))
                        }
                        placeholder="e.g. Mark Jones"
                        className={inputCn}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="safeguarding-notes" className={labelCn}>
                      Safeguarding notes
                    </label>
                    <textarea
                      id="safeguarding-notes"
                      rows={3}
                      value={settings.safeguarding_notes ?? ''}
                      onChange={(e) =>
                        setSettings((s) => ({ ...s, safeguarding_notes: e.target.value || null }))
                      }
                      placeholder="Referral pathways, escalation, specific college policy to mention."
                      className={textareaCn}
                    />
                  </div>
                  <div>
                    <label htmlFor="additional-frameworks" className={labelCn}>
                      Other frameworks
                    </label>
                    <textarea
                      id="additional-frameworks"
                      rows={3}
                      value={settings.additional_frameworks ?? ''}
                      onChange={(e) =>
                        setSettings((s) => ({
                          ...s,
                          additional_frameworks: e.target.value || null,
                        }))
                      }
                      placeholder="Gatsby Benchmarks, PSHE, SMSC, careers education, awarding body guidance."
                      className={textareaCn}
                    />
                  </div>
                </div>
              </motion.section>
            </motion.div>

            <div className="mt-8">
              <RiskThresholdsCard collegeId={collegeId} />
            </div>

            {/* Sticky on phones so nobody scrolls back to commit. */}
            <div className="sticky bottom-0 z-10 -mx-4 flex flex-col gap-2 border-t border-white/[0.06] bg-elec-dark/95 px-4 py-3 backdrop-blur-sm sm:hidden">
              <span className="text-[12px] text-white">
                Changes apply to the next lesson plan generated.
              </span>
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className={COLLEGE_BTN_PRIMARY}
              >
                {saving ? 'Saving…' : 'Save settings'}
              </button>
            </div>
          </>
        )}
      </HubBody>
    </HubPage>
  );
}

/**
 * One row of the include-list. The whole row is the control (44px+), the
 * switch on the right shows state. Solid volt on the switch only — the old
 * card washed its whole face in volt/[0.04] when on, which is the khaki
 * tint the design forbids.
 */
function ToggleRow({
  label,
  hint,
  on,
  onToggle,
}: {
  label: string;
  hint: string;
  on: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <li>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => onToggle(!on)}
        className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-6"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-[14px] font-semibold leading-tight text-white">{label}</span>
          <span className="mt-1 block text-[12.5px] leading-relaxed text-white">{hint}</span>
        </span>
        <span
          aria-hidden
          className={cn(
            'relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors',
            on ? 'bg-elec-yellow' : 'bg-white/[0.14]'
          )}
        >
          <span
            className={cn(
              'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
              on && 'translate-x-5'
            )}
          />
        </span>
      </button>
    </li>
  );
}
