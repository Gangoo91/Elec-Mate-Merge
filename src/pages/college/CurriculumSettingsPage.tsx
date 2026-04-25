import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageFrame, PageHero, LoadingState, itemVariants } from '@/components/college/primitives';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

/* ==========================================================================
   CurriculumSettingsPage — college-level configuration that shapes every
   AI lesson plan we generate:
     - British Values embedding (Ofsted/DfE mandate)
     - Stretch & Challenge tasks
     - Inclusive Practice strategies
     - Optional Prevent lead + DSL names for safeguarding wording
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

export default function CurriculumSettingsPage() {
  const navigate = useNavigate();
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
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userRes.user.id)
        .maybeSingle();
      if (!profile?.college_id) {
        if (!cancelled) setLoading(false);
        return;
      }
      if (cancelled) return;
      setCollegeId(profile.college_id);

      const { data } = await supabase
        .from('college_curriculum_settings')
        .select(
          'include_british_values, include_stretch_challenge, include_inclusive_practice, prevent_lead_name, dsl_name, safeguarding_notes, additional_frameworks'
        )
        .eq('college_id', profile.college_id)
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

  if (loading) {
    return (
      <PageFrame>
        <LoadingState />
      </PageFrame>
    );
  }

  if (!collegeId) {
    return (
      <PageFrame>
        <div className="text-white text-[13px]">
          Not linked to a college. Ask your admin to add you to the staff roster.
        </div>
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate(-1)}
          className="text-[12px] font-medium text-white/65 hover:text-white transition-colors"
        >
          ← Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="College · Curriculum"
          title="Lesson plan settings"
          description="Shape what the AI must include in every generated lesson plan. Defaults match Ofsted and DfE expectations for FE providers in England."
          tone="yellow"
        />
      </motion.div>

      {/* What the AI includes */}
      <motion.div variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Compliance sections"
          title="What the AI must include"
        />

        <ToggleCard
          label="British Values"
          hint="Democracy, rule of law, individual liberty, mutual respect, tolerance of faiths & beliefs — embedded in specific activities. Required by the Prevent duty."
          on={settings.include_british_values}
          onToggle={(v) => setSettings((s) => ({ ...s, include_british_values: v }))}
        />
        <ToggleCard
          label="Stretch & challenge"
          hint="Extension tasks aimed at higher-attaining learners, using the top Bloom levels (analyse / evaluate / create)."
          on={settings.include_stretch_challenge}
          onToggle={(v) => setSettings((s) => ({ ...s, include_stretch_challenge: v }))}
        />
        <ToggleCard
          label="Inclusive practice"
          hint="Concrete strategies per need profile — SEND, EAL, EHCP, neurodivergence, prior-attainment spread. Named moves, not platitudes."
          on={settings.include_inclusive_practice}
          onToggle={(v) => setSettings((s) => ({ ...s, include_inclusive_practice: v }))}
        />
      </motion.div>

      {/* Safeguarding context */}
      <motion.div variants={itemVariants} className="space-y-3">
        <SectionHeader
          eyebrow="Safeguarding context"
          title="Names the AI can reference"
        />
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
          <TextField
            label="Designated safeguarding lead (DSL)"
            placeholder="e.g. Jane Smith"
            value={settings.dsl_name ?? ''}
            onChange={(v) => setSettings((s) => ({ ...s, dsl_name: v || null }))}
          />
          <TextField
            label="Prevent lead"
            placeholder="e.g. Mark Jones"
            value={settings.prevent_lead_name ?? ''}
            onChange={(v) => setSettings((s) => ({ ...s, prevent_lead_name: v || null }))}
          />
          <TextAreaField
            label="Safeguarding notes"
            placeholder="Anything the AI should reference in wording — e.g. referral pathways, escalation, specific college policy."
            value={settings.safeguarding_notes ?? ''}
            onChange={(v) => setSettings((s) => ({ ...s, safeguarding_notes: v || null }))}
          />
          <TextAreaField
            label="Additional frameworks"
            placeholder="Other frameworks to reference — e.g. Gatsby Benchmarks, PSHE, SMSC, Careers Education, specific awarding body guidance."
            value={settings.additional_frameworks ?? ''}
            onChange={(v) =>
              setSettings((s) => ({ ...s, additional_frameworks: v || null }))
            }
          />
        </div>
      </motion.div>

      {/* Save bar */}
      <motion.div variants={itemVariants} className="sticky bottom-4 z-20">
        <div className="bg-[hsl(0_0%_10%)]/95 backdrop-blur-md border border-white/[0.1] rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
          <div className="text-[12px] text-white">
            Changes apply to the next lesson plan generated.
          </div>
          <button
            onClick={save}
            disabled={saving}
            className="h-11 px-6 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[13px] font-medium transition-colors disabled:opacity-40"
          >
            {saving ? 'Saving…' : 'Save settings'}
          </button>
        </div>
      </motion.div>
    </PageFrame>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
        {eyebrow}
      </div>
      <h2 className="mt-1.5 text-xl sm:text-[22px] font-semibold text-white tracking-tight leading-tight">
        {title}
      </h2>
    </div>
  );
}

function ToggleCard({
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
    <button
      type="button"
      onClick={() => onToggle(!on)}
      className={cn(
        'w-full text-left rounded-2xl px-5 py-5 border transition-colors',
        on
          ? 'border-elec-yellow/30 bg-elec-yellow/[0.04]'
          : 'border-white/[0.08] bg-[hsl(0_0%_12%)] hover:border-white/[0.18]'
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'relative h-6 w-11 rounded-full shrink-0 mt-0.5 transition-colors',
            on ? 'bg-elec-yellow' : 'bg-white/[0.1]'
          )}
        >
          <span
            className={cn(
              'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
              on && 'translate-x-5'
            )}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={cn(
              'text-[14px] font-semibold',
              on ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {label}
          </div>
          <p className="mt-1 text-[12.5px] text-white leading-relaxed">{hint}</p>
        </div>
      </div>
    </button>
  );
}

function TextField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="px-5 sm:px-6 py-4">
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2">
        {label}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl px-4 text-[13.5px] text-white placeholder:text-white focus:outline-none focus:border-elec-yellow/60"
      />
    </div>
  );
}

function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="px-5 sm:px-6 py-4">
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white mb-2">
        {label}
      </div>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl px-4 py-3 text-[13.5px] text-white placeholder:text-white focus:outline-none focus:border-elec-yellow/60 resize-y"
      />
    </div>
  );
}
