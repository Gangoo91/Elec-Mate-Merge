/**
 * NearMissToBriefingDialog
 *
 * ⚠️ Not currently mounted anywhere. `NearMissReportDetail` hands the report
 * to the Team Briefings tab through sessionStorage instead
 * (`nearMissData_<id>` → `TeamBriefingTemplates`). Kept because it is the only
 * code that calls `generate-briefing-from-near-miss` directly, but treat it as
 * unwired until something renders it.
 */

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Loader2, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { MobileInput } from '@/components/ui/mobile-input';
import { MobileInputWrapper } from '@/components/ui/mobile-input-wrapper';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface NearMissReport {
  id: string;
  incident_date: string;
  incident_time: string;
  location: string;
  category: string;
  severity: string;
  description: string;
  potential_consequences: string;
  immediate_actions: string;
  preventive_measures: string;
  photos: string[] | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
  nearMissReport: NearMissReport;
}

/**
 * Severity is stored lower-case — the report form writes 'low' | 'medium' |
 * 'high' | 'critical'. The preview compared against 'Critical' / 'High' /
 * 'Medium', so no branch ever matched and every near miss, up to and
 * including a critical one, showed the green "all clear" marker.
 */
const SEVERITY_TEXT: Record<string, string> = {
  critical: 'text-red-400',
  high: 'text-orange-400',
  medium: 'text-amber-400',
  low: 'text-emerald-400',
};

/** The model is asked for free text but can answer with a list. */
const asText = (value: unknown): string =>
  Array.isArray(value) ? value.filter(Boolean).join('\n') : typeof value === 'string' ? value : '';

const asBullets = (value: unknown): string =>
  Array.isArray(value) ? value.map((v) => `• ${String(v)}`).join('\n') : '';

export const NearMissToBriefingDialog = ({ open, onClose, nearMissReport }: Props) => {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [briefingData, setBriefingData] = useState({
    briefingDate: new Date().toISOString().split('T')[0],
    briefingTime: '09:00',
    conductorName: '',
  });

  const severityKey = (nearMissReport.severity || '').toLowerCase();

  const handleGenerateAndCreate = async () => {
    setGenerating(true);
    try {
      const { data: aiData, error: aiError } = await supabase.functions.invoke(
        'generate-briefing-from-near-miss',
        { body: { nearMissData: nearMissReport } }
      );

      if (aiError) throw aiError;
      // The function answers `{ content: {...} }`. Reading `aiData.content.x`
      // straight off a malformed or errored payload threw a TypeError that the
      // catch reported as "Failed to create briefing" with no clue why.
      const content = aiData?.content;
      if (!content?.briefingTitle) {
        throw new Error('The briefing generator returned no content. Please try again.');
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      const notes = [
        ['Safety points', asBullets(content.safetyPoints)],
        ['Discussion questions', asBullets(content.discussionQuestions)],
        ['Action items', asBullets(content.actionItems)],
        ['Regulations', asText(content.regulations)],
        ['Required PPE', asText(content.requiredPPE)],
      ]
        .filter(([, body]) => body)
        .map(([heading, body]) => `**${heading}:**\n${body}`)
        .join('\n\n');

      const briefingPayload = {
        user_id: user.id,
        template_id: 'near-miss-review',
        briefing_type: 'near-miss-review',
        briefing_name: String(content.briefingTitle),
        job_name: String(content.briefingTitle),
        briefing_date: briefingData.briefingDate,
        briefing_time: briefingData.briefingTime,
        location: nearMissReport.location,
        conductor_name: briefingData.conductorName || profile?.full_name || user.email || '',
        briefing_description: asText(content.briefingDescription),
        // `hazards` is a text column, not an array — coerce, or a list answer
        // from the model fails the whole insert.
        hazards: asText(content.hazards),
        safety_warning: asText(content.safetyWarning),
        identified_hazards: [nearMissReport.category],
        risk_level: severityKey,
        ai_generated: true,
        ai_prompt_data: {
          nearMissId: nearMissReport.id,
          nearMissCategory: nearMissReport.category,
          nearMissSeverity: nearMissReport.severity,
          aiGeneratedContent: true,
        } as Json,
        // `photos` is nullable on the report — `.map` on null threw before the
        // insert was ever attempted.
        photos: (nearMissReport.photos ?? []).map((url) => ({
          url,
          caption: 'From near miss report',
        })) as Json,
        linked_near_miss_id: nearMissReport.id,
        completed: false,
        created_by_name: profile?.full_name || user.email || '',
        notes,
      };

      const { data: briefing, error: briefingError } = await supabase
        .from('team_briefings')
        .insert(briefingPayload)
        .select()
        .single();

      if (briefingError) throw briefingError;

      // Link the briefing back to the report. Deliberately NOT touching
      // `status`: the old code wrote 'Briefing Scheduled', which is not one of
      // open / in_progress / closed, so the report detail view fell back to
      // "Open" and the workflow state was quietly destroyed. `briefed_to_team`
      // already records that a briefing exists.
      const { error: updateError } = await supabase
        .from('near_miss_reports')
        .update({
          briefed_to_team: true,
          briefing_id: briefing.id,
          briefing_created_at: new Date().toISOString(),
        })
        .eq('id', nearMissReport.id);

      if (updateError) throw updateError;

      toast({
        title: 'Briefing created',
        description: 'Team safety briefing created from the near miss report.',
      });

      onClose();
      navigate('/electrician/site-safety?tab=briefings');
    } catch (error) {
      console.error('Error creating briefing:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create briefing',
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
        <div className="flex h-full flex-col bg-[hsl(0_0%_8%)]">
          <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-4 pt-6">
            <SheetHeader className="text-left">
              <SheetTitle className="text-[19px] font-semibold tracking-tight text-white">
                Create team briefing
              </SheetTitle>
              <SheetDescription className="text-[13px] text-white">
                Generate a safety briefing from this near miss report.
              </SheetDescription>
            </SheetHeader>

            <div
              className={cn('space-y-1 rounded-2xl border border-elec-yellow/35 p-4', CARD_SURFACE)}
            >
              <p
                className={cn(
                  'text-[11px] font-semibold uppercase tracking-[0.14em]',
                  SEVERITY_TEXT[severityKey] || 'text-white'
                )}
              >
                {severityKey ? `${severityKey} severity` : 'Severity not rated'}
              </p>
              <p className="text-[14px] font-medium text-white">{nearMissReport.category}</p>
              <p className="truncate text-[12px] text-white">{nearMissReport.location}</p>
              <p className="line-clamp-3 pt-1 text-[13px] leading-relaxed text-white">
                {nearMissReport.description}
              </p>
            </div>

            <MobileInput
              label="Briefing date"
              type="date"
              value={briefingData.briefingDate}
              onChange={(e) =>
                setBriefingData((prev) => ({ ...prev, briefingDate: e.target.value }))
              }
            />

            <MobileInput
              label="Briefing time"
              type="time"
              value={briefingData.briefingTime}
              onChange={(e) =>
                setBriefingData((prev) => ({ ...prev, briefingTime: e.target.value }))
              }
            />

            <MobileInputWrapper
              label="Briefing conductor (optional)"
              value={briefingData.conductorName}
              onChange={(value) => setBriefingData((prev) => ({ ...prev, conductorName: value }))}
              placeholder="Who will conduct this briefing"
              icon={<Users className="h-4 w-4" />}
            />

            <div className="space-y-2 pt-2">
              <p className="text-[13px] font-medium text-white">The briefing will include:</p>
              <ul className="ml-4 space-y-1 text-[13px] text-white">
                <li>• Incident summary</li>
                <li>• Key safety discussion points</li>
                <li>• Preventive action items</li>
                <li>• Photos from the near miss</li>
              </ul>
            </div>
          </div>

          <div
            className="border-t border-white/[0.08] px-4 pt-3"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={generating}
                className="h-11 flex-1 touch-manipulation rounded-xl border border-white/[0.10] bg-white/[0.05] text-[14px] font-medium text-white transition-all duration-150 active:scale-[0.98] active:brightness-125 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGenerateAndCreate}
                disabled={generating}
                className="flex h-11 flex-[1.4] touch-manipulation items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-all duration-150 active:scale-[0.98] active:brightness-125 disabled:bg-white/[0.08] disabled:text-white/70"
              >
                {generating && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                {generating ? 'Generating…' : 'Create briefing'}
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
