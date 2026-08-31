import { useState, useEffect, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  ArrowLeft,
  ArrowRight,
  Save,
  FileText,
  Loader2,
  X,
  Check,
  Trash2,
  Eye,
  ImageIcon,
  Share2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStorageUrls } from '@/utils/storageUrls';
import {
  BriefingTypePicker,
  BriefingType,
  briefingTypes,
  briefingTypeForTemplate,
  HazardPillSelector,
  RiskLevelSlider,
  RiskLevel,
  BriefingShareSheet,
  PostSaveShareSheet,
} from './briefings';
import { TemplateSelector } from './briefing-templates/TemplateSelector';
import { SafetyDocField } from './common/SafetyDocField';
import SafetyDocShell, {
  computeSafetyDocProgress,
  type SafetyDocStepConfig,
} from './common/SafetyDocShell';

// Schema for the form
const briefingSchema = z.object({
  briefingType: z.string().min(1, 'Please select a briefing type'),
  siteName: z.string().min(2, 'Site name is required'),
  siteAddress: z.string().optional(),
  briefingTitle: z.string().min(3, 'Title must be at least 3 characters'),
  briefingContent: z.string().min(50, 'Content must be at least 50 characters'),
  briefingDate: z.string().min(1, 'Date is required'),
  briefingTime: z.string().min(1, 'Time is required'),
  hazards: z.array(z.string()).min(1, 'Select at least one hazard'),
  riskLevel: z.enum(['low', 'medium', 'high']),
  photos: z
    .array(
      z.object({
        url: z.string(),
        caption: z.string().optional(),
      })
    )
    .optional(),
  attendees: z
    .array(
      z.object({
        name: z.string(),
        role: z.string().optional(),
        signature: z.string().optional(),
        timestamp: z.string().optional(),
      })
    )
    .optional(),
});

type BriefingFormData = z.infer<typeof briefingSchema>;

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

/**
 * Whatever the caller hands us to prefill from: an existing `team_briefings`
 * row, a duplicate of one, or a template seed with no `id`. It is deliberately
 * loose — the three sources do not share a shape — but `unknown` values rather
 * than `any` ones, so every read has to say what it expects it to be.
 */
type BriefingPrefill = Record<string, unknown> & { id?: string };

/** Read one prefill field as a string, or undefined if it is not one. */
const prefillString = (data: BriefingPrefill | null | undefined, key: string) => {
  const value = data?.[key];
  return typeof value === 'string' && value.length > 0 ? value : undefined;
};

interface BriefingFormWizardProps {
  initialData?: BriefingPrefill | null;
  nearMissData?: NearMissData | null;
  onClose: () => void;
  onSuccess: () => void;
}

const STEP_TITLES = ['Type & Site', 'Briefing Content', 'Hazards', 'Photos', 'Attendees'];

/** Enforced in `handlePhotoUpload`, not just displayed. */
const MAX_PHOTOS = 5;

/**
 * Tab labels plus the fields each step needs before it can honestly call itself
 * complete. The old bar was `((step + 1) / totalSteps) * 100` — it measured how
 * far the user had clicked, so an untouched briefing already read 20% on step
 * one, and a briefing with every field blank still read 100% on the last step.
 *
 * The required set is taken from `briefingSchema` rather than chosen, so the
 * ring and the submit button can never disagree: `hazards` is `.min(1)` and so
 * counts; `photos` and `attendees` are `.optional()` and so do not. `riskLevel`
 * is required but always has a default, so including it would hand out free
 * progress. A step with no required fields never blocks and never claims
 * completion it has not earned.
 */
const STEP_CONFIGS: SafetyDocStepConfig<string>[] = [
  {
    id: '0',
    label: 'Site',
    requiredFields: ['briefingType', 'siteName', 'briefingDate', 'briefingTime'],
  },
  { id: '1', label: 'Content', requiredFields: ['briefingTitle', 'briefingContent'] },
  { id: '2', label: 'Hazards', requiredFields: ['hazards'] },
  { id: '3', label: 'Photos', requiredFields: [] },
  { id: '4', label: 'Attendees', requiredFields: [] },
];

export const BriefingFormWizard = ({
  initialData,
  nearMissData,
  onClose,
  onSuccess,
}: BriefingFormWizardProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [newAttendeeName, setNewAttendeeName] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [showPostSaveShare, setShowPostSaveShare] = useState(false);
  const [savedBriefingId, setSavedBriefingId] = useState<string | null>(initialData?.id || null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [saving, setSaving] = useState(false);

  /**
   * `team_briefings` has no `site_address` column, so the site address the form
   * collects had nowhere to go: it was read back out of `initialData.site_address`
   * on every edit and never written by any save. The user typed an address, the
   * briefing saved with a tick, and the address was gone. It now rides in
   * `dynamic_fields`, the table's jsonb escape hatch, and round-trips on edit.
   */
  const initialDynamicFields =
    (initialData?.dynamic_fields as Record<string, unknown> | undefined) ?? {};

  // Default values
  const defaultValues: Partial<BriefingFormData> = {
    briefingType: nearMissData
      ? 'near-miss-review'
      : (prefillString(initialData, 'briefing_type') ?? ''),
    siteName: nearMissData?.location || (prefillString(initialData, 'location') ?? ''),
    siteAddress:
      (typeof initialDynamicFields.site_address === 'string'
        ? initialDynamicFields.site_address
        : undefined) ??
      prefillString(initialData, 'site_address') ??
      '',
    briefingTitle: nearMissData
      ? `Near Miss Review: ${nearMissData.categoryLabel}`
      : (prefillString(initialData, 'briefing_name') ?? ''),
    briefingContent:
      nearMissData?.description || (prefillString(initialData, 'briefing_description') ?? ''),
    briefingDate:
      prefillString(initialData, 'briefing_date') ?? new Date().toISOString().split('T')[0],
    briefingTime: prefillString(initialData, 'briefing_time') ?? '09:00',
    hazards: nearMissData
      ? [nearMissData.category]
      : ((initialData?.identified_hazards as string[] | undefined) ?? []),
    riskLevel:
      (nearMissData?.severity as RiskLevel) ||
      ((prefillString(initialData, 'risk_level') as RiskLevel | undefined) ?? 'medium'),
    photos:
      nearMissData?.photos?.map((url) => ({ url, caption: '' })) ??
      (initialData?.photos as { url: string; caption?: string }[] | undefined) ??
      [],
    attendees: (initialData?.attendees as BriefingFormData['attendees'] | undefined) ?? [],
  };

  const methods = useForm<BriefingFormData>({
    resolver: zodResolver(briefingSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    watch,
    setValue,
    formState: { errors },
  } = methods;
  const formData = watch();

  // Progress from what is filled in, not from how far the user has clicked.
  const docProgress = computeSafetyDocProgress(STEP_CONFIGS, formData);

  // Resolve stored photo references for display — new uploads store bare
  // storage paths (privacy-ready); legacy entries hold full URLs (pass-through).
  const { urls: photoSrcs } = useStorageUrls(
    'briefing-photos',
    (formData.photos || []).map((p: { url: string }) => p.url)
  );

  const totalSteps = STEP_TITLES.length;

  /** Pull a readable message off an unknown thrown value without reaching for `any`. */
  const errorMessage = (err: unknown, fallback: string) =>
    err instanceof Error && err.message ? err.message : fallback;

  // AI Content Generation
  const handleGenerateAI = async () => {
    setAiGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-briefing-content', {
        body: {
          briefingType: formData.briefingType,
          briefingContext: {
            briefingTitle: formData.briefingTitle,
            briefingContent: formData.briefingContent,
            location: formData.siteName,
          },
          hazards: {
            identified: formData.hazards,
            riskLevel: formData.riskLevel,
          },
        },
      });

      if (error) throw error;

      // Update form with AI content
      const content = (data as { content?: Record<string, unknown> } | null)?.content;
      const overview = content?.briefingOverview as { content?: string }[] | undefined;
      const briefingContent =
        overview
          ?.map((p) => p.content ?? '')
          .filter(Boolean)
          .join('\n\n') ||
        (typeof content?.briefingDescription === 'string' ? content.briefingDescription : '') ||
        formData.briefingContent;

      setValue('briefingContent', briefingContent);

      toast({
        title: 'AI Content Generated',
        description: 'Review and edit the AI-generated content.',
      });
    } catch (error: unknown) {
      console.error('AI generation error:', error);
      toast({
        title: 'Generation Failed',
        description: errorMessage(error, 'Failed to generate content.'),
        variant: 'destructive',
      });
    } finally {
      setAiGenerating(false);
    }
  };

  /**
   * Applying a template from inside the form.
   *
   * Two things were wrong and both produced a briefing that looked filled in
   * and was not:
   *
   * 1. `briefingType` was set to the raw `briefing_templates.template_type`
   *    ("site-work", "lfe", "hse-update", "safety-alert"). None of those is one
   *    of the six types the picker offers, so the required radio list came back
   *    showing nothing selected — and the value was saved anyway, giving
   *    `team_briefings.briefing_type` a string no screen can label.
   * 2. `briefingContent` was set to the template's one-line description
   *    ("5-minute safety briefing template"), which is both shorter than the
   *    50-character minimum the form enforces and not what a template is for.
   *    The section titles in `template_schema` are the actual skeleton, and
   *    the templates tab on the list screen has always used them.
   *
   * The title is only taken when the field is still empty: someone who has
   * already named their briefing and then opens a template wants the structure,
   * not a rename.
   */
  const handleTemplateSelect = (template: {
    id: string;
    name: string;
    description: string;
    template_type: string;
    template_schema?: { sections?: { id: string; title: string }[] } | null;
  }) => {
    const sections = template.template_schema?.sections ?? [];
    const skeleton = sections.length ? sections.map((s) => `${s.title}\n`).join('\n') : '';

    if (!formData.briefingTitle?.trim()) setValue('briefingTitle', template.name);
    if (skeleton) setValue('briefingContent', skeleton);
    setValue('briefingType', briefingTypeForTemplate(template.template_type));

    setShowTemplateSelector(false);
    toast({
      title: 'Template applied',
      description: sections.length
        ? `${sections.length} section${sections.length === 1 ? '' : 's'} to fill in.`
        : `"${template.name}" applied. Review and edit as needed.`,
    });
  };

  // Photo upload
  const handlePhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    /*
     * The "5 slots remaining" cap was cosmetic: it only hid the drop zone once
     * five photos existed. The input is `multiple`, so one trip through the
     * photo picker could add twenty in a single go — all of them uploaded to
     * storage, all of them written to the row, and the counter cheerfully
     * reading "20 of 5". Enforce it where the files actually arrive.
     */
    const alreadyHave = (formData.photos || []).length;
    const room = MAX_PHOTOS - alreadyHave;
    if (room <= 0) {
      event.target.value = '';
      toast({
        title: 'Photo limit reached',
        description: `A briefing can carry ${MAX_PHOTOS} photos.`,
      });
      return;
    }
    const selected = Array.from(files);
    const accepted = selected.slice(0, room);
    const dropped = selected.length - accepted.length;

    setUploadingPhotos(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const uploadedPhotos: { url: string; caption: string }[] = [];

      for (const file of accepted) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from('briefing-photos')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) throw error;

        // Store the bare storage path (privacy-ready) — readers resolve it
        // via useStorageUrls and still accept legacy full-URL entries.
        uploadedPhotos.push({ url: data.path, caption: '' });
      }

      setValue('photos', [...(formData.photos || []), ...uploadedPhotos]);

      toast({
        title: 'Photos added',
        description: dropped
          ? `${uploadedPhotos.length} added — ${dropped} skipped, the limit is ${MAX_PHOTOS}.`
          : `${uploadedPhotos.length} photo${uploadedPhotos.length === 1 ? '' : 's'} added.`,
      });
    } catch (error: unknown) {
      toast({
        title: 'Upload Failed',
        description: errorMessage(error, 'Failed to upload photos.'),
        variant: 'destructive',
      });
    } finally {
      // Clearing the input matters: without it, picking the same file twice in
      // a row fires no change event and the second attempt silently does nothing.
      event.target.value = '';
      setUploadingPhotos(false);
    }
  };

  const handleDeletePhoto = (index: number) => {
    setValue(
      'photos',
      (formData.photos || []).filter((_, idx) => idx !== index)
    );
  };

  // Attendee management
  const addAttendee = () => {
    if (!newAttendeeName.trim()) return;
    // Support comma-separated names for quick bulk add
    const names = newAttendeeName
      .split(',')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    const newEntries = names.map((name) => ({
      name,
      role: undefined as string | undefined,
      signature: undefined as string | undefined,
      timestamp: undefined as string | undefined,
    }));
    setValue('attendees', [...(formData.attendees || []), ...newEntries]);
    setNewAttendeeName('');
  };

  const removeAttendee = (index: number) => {
    setValue(
      'attendees',
      (formData.attendees || []).filter((_, idx) => idx !== index)
    );
  };

  const updateAttendeeRole = (index: number, role: string) => {
    const updated = [...(formData.attendees || [])];
    updated[index] = { ...updated[index], role };
    setValue('attendees', updated);
  };

  /**
   * Close the wizard, refreshing the list first if anything reached the
   * database. `onClose` alone leaves the caller's `briefings` array stale, so a
   * draft you just saved would not appear until the screen was remounted.
   */
  const closeWizard = () => (savedBriefingId ? onSuccess() : onClose());

  /**
   * The zod resolver was decorative: nothing ever called it. `canProceed()` is a
   * separate, looser hand-rolled check on the Continue button, and Complete
   * called `handleSave` straight through — so a one-character site name (schema
   * minimum: two) sailed past. Run the real schema before committing, and land
   * the user on the step that failed rather than on a toast with no destination.
   */
  const validateBeforeComplete = async () => {
    const valid = await methods.trigger();
    if (valid) return true;

    const failed = methods.formState.errors;
    const firstBadStep = STEP_CONFIGS.findIndex((cfg) =>
      cfg.requiredFields.some((f) => f in failed)
    );
    if (firstBadStep >= 0 && firstBadStep !== step) {
      setStep(firstBadStep);
      window.scrollTo({ top: 0 });
    }
    toast({
      title: 'Not ready yet',
      description: 'Some required details are missing — they are highlighted on this step.',
      variant: 'destructive',
    });
    return false;
  };

  // Save briefing
  const handleSave = async (asDraft = false) => {
    if (saving) return;
    if (!asDraft && !(await validateBeforeComplete())) return;

    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      const briefingData = {
        user_id: user.id,
        template_id: 'ai-generated',
        briefing_name: formData.briefingTitle,
        briefing_date: formData.briefingDate,
        briefing_time: formData.briefingTime,
        location: formData.siteName,
        attendees: formData.attendees,
        completed: !asDraft,
        briefing_type: formData.briefingType,
        job_name: formData.briefingTitle,
        work_scope: formData.briefingContent,
        risk_level: formData.riskLevel,
        identified_hazards: formData.hazards,
        briefing_description: formData.briefingContent,
        photos: formData.photos,
        created_by_name: profile?.full_name || user.email,
        /*
         * Save Draft used to write `status: 'draft'`. The live table has
         * `CHECK (status = ANY (ARRAY['scheduled','in_progress','completed',
         * 'cancelled']))`, so every draft save was rejected outright — the
         * button had never once worked, and there is not a single row with
         * status 'draft' in the table to show for it. A draft is a scheduled
         * briefing that is not finished; that is what `completed` records.
         *
         * Complete now writes 'completed' rather than leaving the status at
         * 'scheduled', which is what the in-briefing mode already does and what
         * the list screen needs in order to tell finished work from outstanding
         * work.
         */
        status: asDraft ? 'scheduled' : 'completed',
        dynamic_fields: {
          ...initialDynamicFields,
          site_address: formData.siteAddress?.trim() || null,
        },
      };

      let error;
      let briefingId = initialData?.id || savedBriefingId;
      if (briefingId) {
        const { error: updateError } = await supabase
          .from('team_briefings')
          .update(briefingData)
          .eq('id', briefingId);
        error = updateError;
      } else {
        const { data: insertedData, error: insertError } = await supabase
          .from('team_briefings')
          .insert([briefingData])
          .select('id')
          .single();
        error = insertError;
        if (insertedData?.id) {
          briefingId = insertedData.id;
          setSavedBriefingId(insertedData.id);
        }
      }

      if (error) throw error;

      toast({
        title: initialData?.id ? 'Briefing updated' : asDraft ? 'Draft saved' : 'Briefing created',
        description: asDraft ? 'Come back and finish it any time.' : 'Successfully saved.',
      });

      /*
       * `onSuccess()` used to fire here, unconditionally, before any of the
       * branches below. The parent's `onSuccess` closes the wizard, so this
       * component unmounted in the same React batch as `setShowPostSaveShare(true)`
       * — the post-save share sheet could never appear, and the "keep wizard
       * open for drafts" comment described behaviour that had not happened
       * since the callback was added. Each branch now decides for itself, and
       * the sheet reports success when it closes.
       */
      if (asDraft) {
        // Stay put. `closeWizard` refreshes the list on the way out.
      } else if (briefingId && (formData.attendees || []).length > 0) {
        setShowPostSaveShare(true);
      } else {
        onSuccess();
      }
    } catch (error: unknown) {
      toast({
        title: 'Save Failed',
        description: errorMessage(error, 'Failed to save briefing.'),
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  // Step validation
  const canProceed = () => {
    switch (step) {
      case 0:
        return formData.briefingType && formData.siteName;
      case 1:
        return formData.briefingTitle && formData.briefingContent?.length >= 50;
      case 2:
        return formData.hazards && formData.hazards.length > 0;
      case 3:
        return true; // Photos optional
      case 4:
        return true; // Attendees step
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (step < totalSteps - 1 && canProceed()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (step) {
      // Step 1: Type & Site
      case 0:
        return (
          <div className="space-y-6">
            {/* Start from template option — hidden when near-miss pre-fill or editing */}
            {!nearMissData && !initialData && (
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowTemplateSelector(!showTemplateSelector)}
                  className={cn(
                    'w-full h-12 border-white/20 text-white',
                    'hover:bg-white/[0.06] hover:border-elec-yellow/40',
                    'touch-manipulation',
                    showTemplateSelector && 'border-elec-yellow/50 bg-elec-yellow/[0.06]'
                  )}
                >
                  <FileText className="h-4 w-4 mr-2 text-elec-yellow" />
                  {showTemplateSelector ? 'Hide Templates' : 'Start from Template'}
                  <span className="text-xs text-white ml-2">(Optional)</span>
                </Button>

                <AnimatePresence>
                  {showTemplateSelector && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      {/* No `selectedType` filter. It fed the picker's
                          vocabulary ("electrical", "hot-works") into
                          `.eq('template_type', …)` against a column that only
                          ever holds "site-work" / "lfe" / "hse-update" /
                          "safety-alert" / "toolbox-talk" — so choosing any type
                          but Toolbox talk emptied the list and the panel said
                          "No templates available for this type". There are five
                          templates; show all five. */}
                      <TemplateSelector onSelectTemplate={handleTemplateSelect} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <BriefingTypePicker
              value={formData.briefingType as BriefingType}
              onChange={(type) => setValue('briefingType', type)}
              error={errors.briefingType?.message}
            />

            <SafetyDocField
              label="Site Name"
              placeholder="e.g. Acme Construction"
              value={formData.siteName}
              onChange={(e) => setValue('siteName', e.target.value)}
              error={errors.siteName?.message}
            />

            <SafetyDocField
              label="Site Address"
              placeholder="e.g. 123 High Street, Manchester"
              value={formData.siteAddress || ''}
              onChange={(e) => setValue('siteAddress', e.target.value)}
              hint="Optional"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SafetyDocField
                label="Date"
                type="date"
                value={formData.briefingDate}
                onChange={(e) => setValue('briefingDate', e.target.value)}
                className="[color-scheme:dark]"
              />
              <SafetyDocField
                label="Time"
                type="time"
                value={formData.briefingTime}
                onChange={(e) => setValue('briefingTime', e.target.value)}
                className="[color-scheme:dark]"
              />
            </div>
          </div>
        );

      // Step 2: Briefing Content
      case 1:
        return (
          <div className="space-y-5">
            {/* Drafting help is an assist, not the job — so it is a quiet
                outline rather than the purple-to-blue gradient it wore, which
                was both the loudest thing on the step and the only place in the
                app using that pair of colours. */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGenerateAI}
              disabled={aiGenerating || !formData.briefingType}
              className={cn(
                'h-11 w-full touch-manipulation border-white/[0.14] bg-white/[0.06]',
                'text-[14px] font-medium text-white',
                'transition-[background-color,transform] active:scale-[0.98] active:bg-white/[0.12]',
                'disabled:opacity-50'
              )}
            >
              {aiGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {aiGenerating ? 'Drafting…' : 'Draft the content for me'}
            </Button>

            <SafetyDocField
              label="Briefing Title"
              placeholder="e.g. Daily Site Induction Briefing"
              value={formData.briefingTitle}
              onChange={(e) => setValue('briefingTitle', e.target.value)}
              error={errors.briefingTitle?.message}
            />

            <div className="space-y-2">
              <label
                htmlFor="briefing-content"
                className="block text-[12px] font-medium text-white"
              >
                Briefing content
                <span className="text-elec-yellow"> *</span>
              </label>
              {/* No focus ring — the design system carries focus on the border
                  and the caret, and a 2px yellow halo round a box this large
                  swamps the step. */}
              <textarea
                id="briefing-content"
                value={formData.briefingContent}
                onChange={(e) => setValue('briefingContent', e.target.value)}
                placeholder="What is being briefed, what the risks are, and what everyone must do about them."
                rows={8}
                className={cn(
                  'w-full rounded-xl px-3 py-3',
                  'border border-white/[0.15] bg-transparent',
                  'text-[15px] text-white placeholder:text-white/25 caret-elec-yellow',
                  'transition-colors hover:border-white/[0.3] focus:border-elec-yellow',
                  'focus:outline-none focus:ring-0 resize-none touch-manipulation'
                )}
              />
              <div className="flex justify-between gap-3 text-[12px]">
                <span className="text-red-400">{errors.briefingContent?.message}</span>
                <span className="shrink-0 tabular-nums text-white">
                  {formData.briefingContent?.length || 0} / 50 minimum
                </span>
              </div>
            </div>
          </div>
        );

      // Step 3: Hazards
      case 2:
        return (
          <div className="space-y-6">
            <HazardPillSelector
              value={formData.hazards || []}
              onChange={(hazards) => setValue('hazards', hazards)}
              error={errors.hazards?.message}
            />

            <RiskLevelSlider
              value={formData.riskLevel as RiskLevel}
              onChange={(level) => setValue('riskLevel', level)}
            />
          </div>
        );

      // Step 4: Photos
      case 3: {
        const photoCount = formData.photos?.length || 0;
        const remaining = MAX_PHOTOS - photoCount;

        return (
          <div className="space-y-5">
            {/* Heading is type, and the count is a figure rather than a pill —
                the same treatment the certificates give a section count. */}
            <div className="flex items-baseline justify-between gap-3">
              <label className="text-[12px] font-medium text-white">Site photos (optional)</label>
              <span className="shrink-0 text-[12px] font-medium tabular-nums text-white">
                {photoCount} of {MAX_PHOTOS}
              </span>
            </div>
            <p className="-mt-3 text-[12px] leading-snug text-white">
              Photograph site conditions, hazards or relevant areas.
            </p>

            {/* Upload Area */}
            {remaining > 0 && (
              <label
                className={cn(
                  'group flex flex-col items-center justify-center gap-3',
                  'py-8 rounded-2xl border border-dashed',
                  'border-white/20 hover:border-white/35',
                  'bg-white/[0.03] hover:bg-white/[0.06]',
                  'cursor-pointer transition-all duration-300',
                  uploadingPhotos && 'pointer-events-none opacity-50'
                )}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={uploadingPhotos}
                />
                {uploadingPhotos ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
                    <span className="text-sm text-white">Uploading...</span>
                  </div>
                ) : (
                  <>
                    <div className="text-center">
                      <span className="block text-[15px] font-medium text-white">
                        Take or choose photos
                      </span>
                      <span className="mt-1 block text-[12px] text-white">
                        {remaining} {remaining === 1 ? 'slot' : 'slots'} remaining
                      </span>
                    </div>
                  </>
                )}
              </label>
            )}

            {/* Photo Grid */}
            {photoCount > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {formData.photos!.map((photo, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="relative group/photo"
                  >
                    <div
                      className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer"
                      onClick={() => setPreviewPhoto(photo.url)}
                    >
                      <img
                        src={photoSrcs[photo.url] ?? photo.url}
                        alt={`Site photo ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />

                      {/* Overlay on hover — desktop only */}
                      <div className="hidden sm:flex absolute inset-0 bg-black/0 group-hover/photo:bg-black/40 transition-colors duration-200 items-center justify-center gap-2 opacity-0 group-hover/photo:opacity-100">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewPhoto(photo.url);
                          }}
                          className={cn(
                            'flex items-center justify-center w-11 h-11 rounded-full',
                            'bg-white/20 backdrop-blur-sm text-white',
                            'hover:bg-white/30 touch-manipulation transition-colors'
                          )}
                        >
                          <Eye className="h-4.5 w-4.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePhoto(idx);
                          }}
                          className={cn(
                            'flex items-center justify-center w-11 h-11 rounded-full',
                            'bg-red-500/80 backdrop-blur-sm text-white',
                            'hover:bg-red-500 touch-manipulation transition-colors'
                          )}
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </div>

                    {/* Mobile actions — always visible */}
                    <div className="sm:hidden absolute bottom-1.5 right-1.5 flex gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewPhoto(photo.url);
                        }}
                        className={cn(
                          'flex items-center justify-center w-9 h-9 rounded-full',
                          'bg-black/50 backdrop-blur-sm text-white',
                          'touch-manipulation'
                        )}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(idx)}
                        className={cn(
                          'flex items-center justify-center w-9 h-9 rounded-full',
                          'bg-red-500/80 backdrop-blur-sm text-white',
                          'touch-manipulation'
                        )}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {photoCount === 0 && !uploadingPhotos && (
              <div className="text-center py-4">
                <ImageIcon className="h-8 w-8 text-white mx-auto mb-2" />
                <p className="text-xs text-white">No photos added yet</p>
              </div>
            )}

            {/* Full-screen photo preview */}
            <AnimatePresence>
              {previewPhoto && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                  onClick={() => setPreviewPhoto(null)}
                >
                  <button
                    type="button"
                    onClick={() => setPreviewPhoto(null)}
                    className="absolute top-4 right-4 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 touch-manipulation"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    src={photoSrcs[previewPhoto] ?? previewPhoto}
                    alt="Preview"
                    className="max-w-full max-h-[85vh] object-contain rounded-xl"
                    onClick={(e) => e.stopPropagation()}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      }

      // Step 5: Attendees (Sign-Off Register)
      case 4: {
        const totalAttendees = (formData.attendees || []).length;
        const briefingTypeInfo = briefingTypes.find((t) => t.id === formData.briefingType);

        return (
          <div className="space-y-5">
            {/* Heading is type. The yellow figure icon beside it restated the
                word "register" in a picture, and the volt pill spent the
                accent on a headcount — the loudest thing on a step whose real
                action is the Add button. */}
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-[15px] font-semibold tracking-tight text-white">
                Sign-off register
              </h2>
              <span className="shrink-0 text-[12px] font-medium tabular-nums text-white">
                {totalAttendees} {totalAttendees === 1 ? 'person' : 'people'}
              </span>
            </div>
            <p className="-mt-2 text-[12px] leading-snug text-white">
              Add everyone who needs to sign this briefing. Signatures are collected after sharing.
            </p>

            {/* Add attendee — quick add */}
            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <SafetyDocField
                    label="Add attendee"
                    placeholder="Name(s) — e.g. John, Dave, Mike"
                    value={newAttendeeName}
                    onChange={(e) => setNewAttendeeName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAttendee())}
                  />
                </div>
                <Button
                  type="button"
                  onClick={addAttendee}
                  disabled={!newAttendeeName.trim()}
                  className="h-11 touch-manipulation bg-elec-yellow px-5 font-semibold text-black hover:brightness-110"
                >
                  Add
                </Button>
              </div>
              {/* Hint sits below the row rather than inside the field, so it
                  cannot push the Add button out of line with the input. */}
              <p className="text-[11px] text-white">
                Separate multiple names with commas to add them all at once.
              </p>
            </div>

            {/* Attendee register — a signing sheet, not a stack of cards.
                Each person was a bordered pill with the row number in its own
                grey tile; five attendees produced ten nested boxes. A register
                is a list, so it is ruled like one: the number is type, the rule
                is a hairline, and the role keeps the same underline field the
                rest of the document uses. */}
            <div>
              <AnimatePresence>
                {(formData.attendees || []).map((attendee, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -16, height: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className="flex items-start gap-3 border-b border-white/[0.08] py-3"
                  >
                    <span className="w-5 shrink-0 pt-0.5 text-[13px] font-semibold tabular-nums text-white">
                      {idx + 1}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-medium text-white">{attendee.name}</p>
                      <input
                        type="text"
                        value={attendee.role || ''}
                        onChange={(e) => updateAttendeeRole(idx, e.target.value)}
                        placeholder="Trade / role (optional)"
                        className={cn(
                          'mt-1 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent',
                          'px-0 py-1 text-[13px] text-white placeholder:text-white/25',
                          'caret-elec-yellow transition-colors hover:border-white/[0.3]',
                          'focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation'
                        )}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeAttendee(idx)}
                      aria-label={`Remove ${attendee.name}`}
                      className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-[13px] font-medium text-white transition-colors hover:text-red-400 touch-manipulation"
                    >
                      Remove
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {totalAttendees === 0 && (
                <p className="py-8 text-center text-[13px] text-white">
                  No one added yet. Everyone who attends the briefing signs here.
                </p>
              )}
            </div>

            {/* Review summary — a definition list. Every row previously carried
                its own icon tile restating the label in a picture. Type does
                that job. Blank fields are named rather than rendered as an
                empty line: a summary that shows nothing where the site name
                should be reads as "no site required", which is how an
                incomplete briefing gets signed. */}
            <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
              <h3 className="mb-3 text-[15px] font-semibold tracking-tight text-white">Review</h3>
              <dl className="divide-y divide-white/[0.08]">
                {[
                  {
                    term: 'Briefing',
                    value:
                      formData.briefingTitle?.trim() ||
                      (briefingTypeInfo?.label ?? formData.briefingType) ||
                      null,
                    detail: formData.briefingTitle?.trim()
                      ? (briefingTypeInfo?.label ?? formData.briefingType) || null
                      : null,
                  },
                  { term: 'Site', value: formData.siteName?.trim() || null },
                  {
                    term: 'Date',
                    value: formData.briefingDate
                      ? `${new Date(formData.briefingDate + 'T00:00:00').toLocaleDateString(
                          'en-GB',
                          { day: 'numeric', month: 'long', year: 'numeric' }
                        )}${formData.briefingTime ? ` at ${formData.briefingTime}` : ''}`
                      : null,
                  },
                  {
                    term: 'Hazards',
                    value: formData.hazards?.length
                      ? `${formData.hazards.length} identified`
                      : null,
                  },
                  {
                    term: 'Photos',
                    value: formData.photos?.length
                      ? `${formData.photos.length} attached`
                      : 'None attached',
                  },
                  {
                    term: 'Attendees',
                    value: totalAttendees ? `${totalAttendees} on the register` : null,
                  },
                ].map(({ term, value, detail }) => (
                  <div key={term} className="flex items-baseline gap-4 py-2.5">
                    <dt className="w-24 shrink-0 text-[13px] text-white">{term}</dt>
                    <dd className="min-w-0 flex-1 text-[14px] font-medium text-white">
                      {value ?? <span className="font-normal text-white">Not yet set</span>}
                      {detail && (
                        <span className="mt-0.5 block text-[12px] font-normal text-white">
                          {detail}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-elec-dark">
        {/* Header */}
        {/* Certificate shell — Back as a word, the document reference, save
            state as a word, a progress ring and tappable step tabs. The arrow
            icon, the centred "Step N of 5" caption, the X and the thin bar have
            gone: this is the header an EV charging certificate uses, and a
            briefing should not feel like a lesser document than a certificate. */}
        <SafetyDocShell
          onBack={step === 0 ? closeWizard : prevStep}
          title="Team Briefing"
          /* Was "· HSG250" on both branches. HSG250 is HSE guidance on
             permit-to-work systems for the petroleum and chemical industries —
             the reference behind the Permit to Work module, and the worked
             example in this shell's own docstring. It says nothing about
             toolbox talks, so it has gone rather than been swapped for another
             standard I cannot source. */
          subtitle={formData.siteName || 'Toolbox talk'}
          isSaving={saving}
          progressPercent={docProgress.progressPercent}
          steps={docProgress.steps}
          currentStep={String(step)}
          onStepChange={(id) => {
            setStep(Number(id));
            window.scrollTo({ top: 0 });
          }}
          completedSteps={docProgress.completedSteps}
        />

        {/* Content */}
        <div className="p-4 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions — one primary action, everything else quieter.
            The last step used to put "Save Draft", "Complete" and an icon-only
            blue Share button side by side at equal width and equal weight, so
            the one irreversible action on the screen looked like a third of a
            toolbar. Complete is now full width; the two ways of leaving without
            completing sit under it as text. */}
        <div className="safe-area-pb fixed bottom-0 left-0 right-0 border-t border-white/10 bg-elec-dark/95 p-4 backdrop-blur">
          {step === totalSteps - 1 ? (
            <div className="space-y-2">
              <Button
                type="button"
                onClick={() => handleSave(false)}
                disabled={saving}
                className="h-14 w-full touch-manipulation bg-elec-yellow text-base font-semibold text-black transition-[filter,transform] active:scale-[0.98] active:brightness-110 disabled:bg-white/[0.08] disabled:text-white/70"
              >
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Check className="mr-2 h-4 w-4" />
                )}
                Complete briefing
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleSave(true)}
                  disabled={saving}
                  className="h-11 flex-1 touch-manipulation text-[14px] font-medium text-white hover:bg-white/[0.08] hover:text-white"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save draft
                </Button>
                {savedBriefingId && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowShareSheet(true)}
                    className="h-11 flex-1 touch-manipulation text-[14px] font-medium text-white hover:bg-white/[0.08] hover:text-white"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Send for signing
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="h-14 touch-manipulation border-white/20 px-6 text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceed()}
                className={cn(
                  'h-14 flex-1 touch-manipulation font-semibold',
                  'bg-elec-yellow text-black transition-[filter,transform] active:scale-[0.98] active:brightness-110',
                  'disabled:cursor-not-allowed disabled:opacity-50'
                )}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Share Sheet for remote signing */}
        <AnimatePresence>
          {showShareSheet && savedBriefingId && (
            <BriefingShareSheet
              briefingId={savedBriefingId}
              briefingName={formData.briefingTitle}
              onClose={() => setShowShareSheet(false)}
            />
          )}
        </AnimatePresence>

        {/* Post-save share sheet — shown after saving with attendees */}
        <AnimatePresence>
          {showPostSaveShare && savedBriefingId && (
            <PostSaveShareSheet
              briefingId={savedBriefingId}
              briefingName={formData.briefingTitle}
              attendeeCount={(formData.attendees || []).length}
              /* `onSuccess`, not `onClose` — the parent needs to refetch, and
                 this is the first point at which the save is genuinely done
                 with. Calling it earlier is what stopped this sheet ever
                 rendering. */
              onClose={() => {
                setShowPostSaveShare(false);
                onSuccess();
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </FormProvider>
  );
};
