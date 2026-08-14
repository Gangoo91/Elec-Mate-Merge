import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  FileText,
  Loader2,
  Sparkles,
  TestTube2,
  X,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import {
  cardCn,
  chipBase,
  chipOff,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { JobScaleBadge } from './JobScaleBadge';
import { QuoteSelectorSheet, type QuotePickerRow } from './QuoteSelectorSheet';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const MIN_DESCRIPTION = 50;
const INPUT_DRAFT_KEY = 'rams-input-draft-v1';

/**
 * Section heading. Typography only — no icons, no coloured dots, no gradient
 * bars; hierarchy comes from type and spacing. Mirrors EVSectionHeader in the
 * specialist certificates, which are the reference implementation.
 */
const SectionHead: React.FC<{
  eyebrow: string;
  title: string;
  sub?: string;
  meta?: React.ReactNode;
  /** Render as a plain div when nested inside a button (no invalid <h_> nesting). */
  as?: 'section' | 'div';
}> = ({ eyebrow, title, sub, meta, as = 'section' }) => {
  const Title = as === 'div' ? 'span' : 'h2';
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between gap-3">
        {/* The small step label carries the accent; the h2 below stays white so
            typography still carries the hierarchy (design system) and the yellow
            reads as a wayfinding cue, matching the hub's section labels. */}
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
          {eyebrow}
        </span>
        {meta}
      </div>
      <Title className="block text-[17px] font-semibold tracking-tight text-white">{title}</Title>
      {sub && <p className="text-[12.5px] leading-relaxed text-white">{sub}</p>}
    </div>
  );
};

/**
 * Underline text field — the current form language. Replaces the boxed
 * `IOSInput`, which is the superseded style (see CLAUDE.md → Design System).
 */
const TextField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  inputMode?: 'text' | 'tel';
  autoComplete?: string;
}> = ({ label, value, onChange, placeholder, disabled, type = 'text', inputMode, autoComplete }) => {
  const id = React.useId();
  return (
    <div>
      <label className={labelCn} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={inputCn}
      />
    </div>
  );
};

/**
 * A single named readiness check in the action bar. Two of these answer "why is
 * Generate disabled?" at a glance, which a sentence underneath the button does
 * not — the eye goes to the button, not the caption.
 */
const ReadyCheck: React.FC<{ label: string; done: boolean }> = ({ label, done }) => (
  <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white">
    <span
      aria-hidden
      className={cn(
        'inline-flex h-4 w-4 items-center justify-center rounded-full border transition-colors',
        done ? 'border-elec-yellow bg-elec-yellow' : 'border-white/30 bg-transparent'
      )}
    >
      {done && <Check className="h-2.5 w-2.5 text-black" strokeWidth={3.5} />}
    </span>
    {label}
    <span className="sr-only">{done ? ' — complete' : ' — still needed'}</span>
  </span>
);

export interface AIRAMSAttachment {
  path: string;
  name: string;
  type: string;
  size: number;
  previewUrl?: string;
}

export interface AIRAMSInputProps {
  onGenerate: (
    jobDescription: string,
    projectInfo: {
      projectName: string;
      location: string;
      assessor: string;
      contractor: string;
      supervisor: string;
      siteManagerName?: string;
      siteManagerPhone?: string;
      firstAiderName?: string;
      firstAiderPhone?: string;
      safetyOfficerName?: string;
      safetyOfficerPhone?: string;
      assemblyPoint?: string;
    },
    jobScale: 'domestic' | 'commercial' | 'industrial',
    attachments: AIRAMSAttachment[]
  ) => void;
  isProcessing: boolean;
}

/** Read the saved input draft from localStorage, returns null if none / parse error. */
function loadInputDraft() {
  try {
    const raw = localStorage.getItem(INPUT_DRAFT_KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw);
    // Expire drafts older than 48 hours
    if (Date.now() - (draft.savedAt ?? 0) > 48 * 60 * 60 * 1000) {
      localStorage.removeItem(INPUT_DRAFT_KEY);
      return null;
    }
    return draft;
  } catch {
    return null;
  }
}

export const AIRAMSInput: React.FC<AIRAMSInputProps> = ({ onGenerate, isProcessing }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const seededFromQuote = useRef(false);

  // Restore from localStorage draft if available
  const savedDraft = loadInputDraft();

  const [jobDescription, setJobDescription] = useState(savedDraft?.jobDescription ?? '');
  const [projectInfo, setProjectInfo] = useState(
    savedDraft?.projectInfo ?? {
      projectName: '',
      location: '',
      assessor: '',
      contractor: '',
      supervisor: '',
      siteManagerName: '',
      siteManagerPhone: '',
      firstAiderName: '',
      firstAiderPhone: '',
      safetyOfficerName: '',
      safetyOfficerPhone: '',
      assemblyPoint: '',
    }
  );

  const [detectedScale, setDetectedScale] = useState<'domestic' | 'commercial' | 'industrial'>(
    'commercial'
  );
  const [manualScale, setManualScale] = useState<'domestic' | 'commercial' | 'industrial' | null>(
    savedDraft?.manualScale ?? null
  );
  const [scaleConfidence, setScaleConfidence] = useState<number>(0);
  // Open by default on desktop, where it fills its quadrant; collapsed on
  // mobile so it doesn't add seven fields to the scroll before the CTA.
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 1024
  );
  const [quoteSheetOpen, setQuoteSheetOpen] = useState(false);
  const [attachments, setAttachments] = useState<AIRAMSAttachment[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);

  // Per-form upload session id so the same job can re-upload without
  // colliding. The path is moved into the final job_id namespace by the
  // edge function at create time if needed; for now we keep them grouped
  // under this temp id.
  const [uploadSessionId] = useState(() => `pending-${crypto.randomUUID().slice(0, 8)}`);

  const MAX_ATTACHMENTS = 6;
  const MAX_FILE_SIZE_MB = 10;

  const handleAttachmentSelect = async (files: FileList | null) => {
    if (!files || files.length === 0 || !user?.id) return;
    const remaining = MAX_ATTACHMENTS - attachments.length;
    if (remaining <= 0) {
      toast({
        title: 'Attachment limit reached',
        description: `Up to ${MAX_ATTACHMENTS} photos per RAMS.`,
        variant: 'destructive',
      });
      return;
    }
    setUploading(true);
    const next: AIRAMSAttachment[] = [];
    for (const file of Array.from(files).slice(0, remaining)) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: `${file.name} is over ${MAX_FILE_SIZE_MB} MB.`,
          variant: 'destructive',
        });
        continue;
      }
      const ext = (file.name.split('.').pop() ?? 'jpg').toLowerCase();
      const safeName = `${crypto.randomUUID().slice(0, 8)}.${ext}`;
      const path = `${user.id}/${uploadSessionId}/${safeName}`;
      const { error } = await supabase.storage
        .from('safety-photos')
        .upload(path, file, { upsert: false, contentType: file.type });
      if (error) {
        console.error('attachment upload failed', error);
        toast({
          title: 'Upload failed',
          description: error.message,
          variant: 'destructive',
        });
        continue;
      }
      next.push({
        path,
        name: file.name,
        type: file.type,
        size: file.size,
        previewUrl: URL.createObjectURL(file),
      });
    }
    setAttachments((prev) => [...prev, ...next]);
    setUploading(false);
  };

  const removeAttachment = async (att: AIRAMSAttachment) => {
    setAttachments((prev) => prev.filter((a) => a.path !== att.path));
    if (att.previewUrl) URL.revokeObjectURL(att.previewUrl);
    await supabase.storage.from('safety-photos').remove([att.path]);
  };

  // Revoke any unrevoked blob URLs on unmount so we don't leak object URLs.
  // A ref tracks the LIVE attachments list so the cleanup sees the latest
  // state at unmount time (not the empty array captured at mount).
  const attachmentsRef = useRef<AIRAMSAttachment[]>([]);
  useEffect(() => {
    attachmentsRef.current = attachments;
  }, [attachments]);
  useEffect(() => {
    return () => {
      for (const a of attachmentsRef.current) {
        if (a.previewUrl) URL.revokeObjectURL(a.previewUrl);
      }
    };
  }, []);

  const handlePickQuote = (q: QuotePickerRow) => {
    const description = q.job_details?.description?.trim() || q.job_details?.title?.trim() || '';
    if (description) setJobDescription(description);
    setProjectInfo((prev) => ({
      ...prev,
      projectName:
        q.job_details?.title?.trim() ||
        (q.client_data?.name ? `${q.client_data.name} job` : prev.projectName),
      location: q.job_details?.location?.trim() || q.client_data?.address?.trim() || prev.location,
    }));
    toast({
      title: 'Pre-filled from quote',
      description: q.client_data?.name
        ? `Using details from ${q.client_data.name}'s quote.`
        : 'Quote details applied.',
    });
  };

  // Seed from a quote when arriving via the quote's "Create RAMS" action.
  // One-shot: apply once, then clear route state so a refresh won't re-seed.
  useEffect(() => {
    if (seededFromQuote.current) return;
    const seed = (location.state as { ramsSeed?: QuotePickerRow } | null)?.ramsSeed;
    if (!seed) return;
    seededFromQuote.current = true;
    handlePickQuote(seed);
    navigate(location.pathname, { replace: true, state: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const examplePrompts: Record<'domestic' | 'commercial' | 'industrial', string[]> = {
    domestic: [
      'Consumer unit in 3-bed house',
      'Rewire kitchen + sockets',
      'EV charger in garage',
      'Bathroom shower circuit',
    ],
    commercial: [
      'Emergency lighting in office',
      'DB upgrade in retail unit',
      'Fire alarm in school',
      'Socket circuits in restaurant',
    ],
    industrial: [
      '3-phase motor in factory',
      '400V distribution upgrade',
      'Switchgear replacement',
      'Cable tray for production',
    ],
  };

  const detectJobScale = (
    description: string,
    location: string
  ): { scale: 'domestic' | 'commercial' | 'industrial'; confidence: number } => {
    const text = `${description} ${location}`.toLowerCase();

    const industrialKeywords = [
      'factory',
      'plant',
      'industrial estate',
      'warehouse',
      'manufacturing',
      'substation',
      '3-phase motor',
      'hv',
      '400v',
      'switchgear',
      'production line',
    ];
    const industrialScore = industrialKeywords.filter((k) => text.includes(k)).length;

    const commercialKeywords = [
      'office',
      'shop',
      'retail',
      'restaurant',
      'hotel',
      'school',
      'hospital',
      'commercial',
      'business premises',
      'surgery',
    ];
    const commercialScore = commercialKeywords.filter((k) => text.includes(k)).length;

    const domesticKeywords = [
      'house',
      'home',
      'flat',
      'apartment',
      'bungalow',
      'kitchen',
      'bedroom',
      'domestic',
      'residential',
      'consumer unit',
    ];
    const domesticScore = domesticKeywords.filter((k) => text.includes(k)).length;

    if (industrialScore >= 2 || text.includes('factory')) {
      return { scale: 'industrial', confidence: Math.min(industrialScore * 30 + 40, 95) };
    } else if (commercialScore >= 2 || (commercialScore === 1 && industrialScore === 0)) {
      return { scale: 'commercial', confidence: Math.min(commercialScore * 25 + 50, 90) };
    } else if (domesticScore >= 1) {
      return { scale: 'domestic', confidence: Math.min(domesticScore * 20 + 60, 85) };
    }

    return { scale: 'commercial', confidence: 40 };
  };

  useEffect(() => {
    if (jobDescription || projectInfo.location) {
      const { scale, confidence } = detectJobScale(jobDescription, projectInfo.location);
      setDetectedScale(scale);
      setScaleConfidence(confidence);
    }
  }, [jobDescription, projectInfo.location]);

  // Autosave input form to localStorage on every change — so a freeze/cancel never loses work
  useEffect(() => {
    if (!jobDescription && !projectInfo.projectName) return; // nothing worth saving yet
    try {
      localStorage.setItem(
        INPUT_DRAFT_KEY,
        JSON.stringify({ jobDescription, projectInfo, manualScale, savedAt: Date.now() })
      );
    } catch {
      // localStorage full or unavailable — silently ignore
    }
  }, [jobDescription, projectInfo, manualScale]);

  const handleSubmit = () => {
    if (jobDescription && projectInfo.projectName) {
      const finalScale = manualScale || detectedScale;
      // Keep the input draft until generation SUCCEEDS — it's cleared in
      // AIRAMSGenerator once status === 'complete'. Deleting it here wiped the
      // form when a failed generation was retried via "Try Again" (ELE-1116).
      onGenerate(jobDescription, projectInfo, finalScale, attachments);
    }
  };

  const loadMockData = () => {
    setJobDescription(
      'Install new 3-phase distribution board in warehouse with additional socket circuits, emergency lighting, and fire alarm panel upgrade. Work includes cable containment, trunking installation, and testing of existing circuits.'
    );
    setProjectInfo({
      projectName: 'Industrial Warehouse Electrical Upgrade',
      location: 'Unit 12, Riverside Industrial Estate, Manchester',
      assessor: 'John Smith',
      contractor: 'Elite Electrical Solutions Ltd',
      supervisor: 'Sarah Johnson',
      siteManagerName: 'Michael Brown',
      siteManagerPhone: '07892 123456',
      firstAiderName: 'Emma Wilson',
      firstAiderPhone: '07891 234567',
      safetyOfficerName: 'David Taylor',
      safetyOfficerPhone: '07890 345678',
      assemblyPoint: 'Main car park near site entrance',
    });
    setManualScale('industrial');
    setShowEmergencyContacts(true);
  };

  const hasDescription = jobDescription.trim().length >= MIN_DESCRIPTION;
  const hasProjectName = projectInfo.projectName.trim().length > 0;
  const canGenerate = hasDescription && hasProjectName;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pb-32 sm:pb-12"
    >
      {/* Four quadrants on desktop, one column on mobile.
          Deliberately NOT `items-start`: the cards stretch so both in a row are
          the same height. Each card is a flex column so its content can grow
          into that height instead of leaving a void underneath. */}
      <div className="-mx-4 grid gap-4 sm:mx-0 sm:gap-5 lg:grid-cols-2">
        {/* 01 — BRIEFING */}
        <motion.section variants={itemVariants} className={cn(cardCn, 'mx-0 flex min-w-0 flex-col')}>
          <SectionHead
            eyebrow="01 · Briefing"
            title="Describe the job"
            sub="Site, scope and scale. The more detail, the sharper the risk assessment and method statement."
            meta={
              <span
                className={cn(
                  'text-[11px] tabular-nums font-medium',
                  hasDescription ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {jobDescription.length} chars
              </span>
            }
          />

          <div>
            <label className={labelCn} htmlFor="rams-brief">
              What needs doing
            </label>
            <textarea
              id="rams-brief"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="e.g., Install new consumer unit in a 3-bed house with a full rewire of the kitchen, including new sockets, lighting circuit and connection of integrated appliances…"
              disabled={isProcessing}
              rows={7}
              maxLength={1000}
              className={cn(textareaCn, 'w-full min-h-[168px] resize-none')}
              style={{ fontSize: '16px' }}
            />
            <div className="mt-2 flex items-baseline justify-between gap-3">
              <span className="text-[11px] text-white">
                {MIN_DESCRIPTION} characters minimum
              </span>
              {hasDescription && (
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                  Ready
                </span>
              )}
            </div>
          </div>

          {/* Quick-pick examples — scroll on mobile, wrap from sm: up. */}
          <div>
            <span className={labelCn}>Start from an example</span>
            <div className="flex flex-wrap gap-2">
              {examplePrompts[manualScale || detectedScale].map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setJobDescription(prompt)}
                  disabled={isProcessing}
                  className={cn(
                    chipBase,
                    chipOff,
                    // Leftovers from when this was a carousel: `flex-shrink-0`
                    // and `whitespace-nowrap` stop a long prompt shrinking, so
                    // it would still overflow a 360px screen. `min-h-11` rather
                    // than `h-11` so a wrapped label isn't clipped.
                    'h-auto min-h-11 max-w-full whitespace-normal px-3.5 py-2 text-left hover:border-elec-yellow/50 disabled:opacity-50'
                  )}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {scaleConfidence > 0 && (
            <JobScaleBadge
              scale={manualScale || detectedScale}
              confidence={scaleConfidence}
              onManualChange={setManualScale}
            />
          )}
        </motion.section>

        {/* 02 — SITE PHOTOS */}
        <motion.section variants={itemVariants} className={cn(cardCn, 'mx-0 flex min-w-0 flex-col')}>
          <SectionHead
            eyebrow="02 · Site photos"
            title="Show us the site"
            sub="Photos of the board, work area or access route. Visible hazards are pulled into the risk register."
            meta={
              <span className="text-[11px] font-medium tabular-nums text-white">
                {attachments.length} / {MAX_ATTACHMENTS}
              </span>
            }
          />

          {attachments.length > 0 && (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {attachments.map((a) => (
                <div
                  key={a.path}
                  className="relative aspect-square overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.05]"
                >
                  {a.previewUrl && a.type.startsWith('image/') ? (
                    <img src={a.previewUrl} alt={a.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-2 text-center text-[11px] text-white">
                      {a.name}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeAttachment(a)}
                    disabled={isProcessing}
                    className="absolute right-1 top-1 inline-flex h-11 sm:h-9 w-9 items-center justify-center rounded-full bg-black/70 transition-colors hover:bg-black/90 touch-manipulation"
                    aria-label={`Remove ${a.name}`}
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {attachments.length < MAX_ATTACHMENTS && (
            <label
              onDragOver={(e) => {
                e.preventDefault();
                if (!isProcessing && !uploading) setIsDraggingPhoto(true);
              }}
              onDragLeave={() => setIsDraggingPhoto(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingPhoto(false);
                handleAttachmentSelect(e.dataTransfer.files);
              }}
              className={cn(
                'block w-full cursor-pointer touch-manipulation',
                // Grow into the card's stretched height so the drop target
                // fills the space rather than leaving a void beneath it.
                attachments.length === 0 && 'flex flex-1 flex-col',
                (isProcessing || uploading) && 'pointer-events-none opacity-50'
              )}
            >
              {/* No `capture` attribute on purpose: it would force the camera and
                  remove the option to pick an existing photo. The OS sheet offers
                  both, which is what "add a site photo" should mean. */}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  handleAttachmentSelect(e.target.files);
                  e.target.value = '';
                }}
                className="hidden"
              />
              <div
                className={cn(
                  'flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed text-[13px] font-medium text-white transition-colors',
                  // Fills the card when empty so both cards in the row read as
                  // the same size; a compact bar once photos are in.
                  attachments.length === 0
                    ? 'min-h-[168px] flex-1 px-4 text-center'
                    : 'h-12 flex-row',
                  isDraggingPhoto
                    ? 'border-elec-yellow bg-elec-yellow/[0.08]'
                    : 'border-white/[0.2] bg-white/[0.05] hover:border-elec-yellow/50 hover:bg-white/[0.07]'
                )}
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
                    Uploading…
                  </>
                ) : (
                  <>
                    <Camera
                      className={cn(
                        'text-elec-yellow',
                        attachments.length === 0 ? 'h-6 w-6' : 'h-4 w-4'
                      )}
                    />
                    <span>{isDraggingPhoto ? 'Drop to upload' : 'Add a site photo'}</span>
                    {attachments.length === 0 && (
                      <span className="text-[12px] font-normal text-white">
                        Take one now, choose from your photos, or drag them in
                      </span>
                    )}
                  </>
                )}
              </div>
            </label>
          )}

          {attachments.length === 0 && (
            <p className="text-[12px] text-white">
              Optional — but a photo of the board usually adds two or three hazards the brief misses.
            </p>
          )}
        </motion.section>

        {/* 03 — PROJECT DETAILS */}
        <motion.section variants={itemVariants} className={cn(cardCn, 'mx-0 flex min-w-0 flex-col')}>
          <SectionHead
            eyebrow="03 · Project details"
            title="Where, and who"
            sub="These are embedded into the document headers and footers."
          />

          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            <TextField
              label="Project name"
              value={projectInfo.projectName}
              onChange={(v) => setProjectInfo((prev) => ({ ...prev, projectName: v }))}
              placeholder="Warehouse lighting upgrade"
              disabled={isProcessing}
              autoComplete="off"
            />
            <TextField
              label="Site location"
              value={projectInfo.location}
              onChange={(v) => setProjectInfo((prev) => ({ ...prev, location: v }))}
              placeholder="Unit 5, Industrial Estate"
              disabled={isProcessing}
              autoComplete="off"
            />
            <TextField
              label="Assessor"
              value={projectInfo.assessor}
              onChange={(v) => setProjectInfo((prev) => ({ ...prev, assessor: v }))}
              placeholder="Your name"
              disabled={isProcessing}
              autoComplete="name"
            />
            <TextField
              label="Contractor"
              value={projectInfo.contractor}
              onChange={(v) => setProjectInfo((prev) => ({ ...prev, contractor: v }))}
              placeholder="Company name"
              disabled={isProcessing}
              autoComplete="organization"
            />
            <div className="sm:col-span-2">
              <TextField
                label="Supervisor (optional)"
                value={projectInfo.supervisor}
                onChange={(v) => setProjectInfo((prev) => ({ ...prev, supervisor: v }))}
                placeholder="Site supervisor"
                disabled={isProcessing}
                autoComplete="name"
              />
            </div>
          </div>
        </motion.section>

        {/* 04 — EMERGENCY CONTACTS */}
        <motion.section variants={itemVariants} className={cn(cardCn, 'mx-0 flex min-w-0 flex-col')}>
          <Collapsible open={showEmergencyContacts} onOpenChange={setShowEmergencyContacts}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex min-h-11 w-full items-start justify-between gap-3 text-left touch-manipulation"
              >
                <SectionHead
                  eyebrow="04 · Emergency contacts"
                  title="Who to call on site"
                  sub="Optional. Printed on the front sheet where they can actually be found."
                  as="div"
                />
                <ChevronDown
                  className={cn(
                    'mt-1 h-5 w-5 shrink-0 text-white transition-transform duration-300',
                    showEmergencyContacts && 'rotate-180'
                  )}
                />
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-4">
              <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                <TextField
                  label="Site manager"
                  value={projectInfo.siteManagerName}
                  onChange={(v) => setProjectInfo((prev) => ({ ...prev, siteManagerName: v }))}
                  placeholder="John Smith"
                  disabled={isProcessing}
                  autoComplete="name"
                />
                <TextField
                  label="Site manager phone"
                  value={projectInfo.siteManagerPhone}
                  onChange={(v) => setProjectInfo((prev) => ({ ...prev, siteManagerPhone: v }))}
                  placeholder="07XXX XXXXXX"
                  disabled={isProcessing}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                />
                <TextField
                  label="First aider"
                  value={projectInfo.firstAiderName}
                  onChange={(v) => setProjectInfo((prev) => ({ ...prev, firstAiderName: v }))}
                  placeholder="Jane Doe"
                  disabled={isProcessing}
                  autoComplete="name"
                />
                <TextField
                  label="First aider phone"
                  value={projectInfo.firstAiderPhone}
                  onChange={(v) => setProjectInfo((prev) => ({ ...prev, firstAiderPhone: v }))}
                  placeholder="07XXX XXXXXX"
                  disabled={isProcessing}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                />
                <TextField
                  label="H&S officer"
                  value={projectInfo.safetyOfficerName}
                  onChange={(v) => setProjectInfo((prev) => ({ ...prev, safetyOfficerName: v }))}
                  placeholder="Safety officer"
                  disabled={isProcessing}
                  autoComplete="name"
                />
                <TextField
                  label="H&S officer phone"
                  value={projectInfo.safetyOfficerPhone}
                  onChange={(v) => setProjectInfo((prev) => ({ ...prev, safetyOfficerPhone: v }))}
                  placeholder="07XXX XXXXXX"
                  disabled={isProcessing}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                />
                <div className="sm:col-span-2">
                  <TextField
                    label="Emergency assembly point"
                    value={projectInfo.assemblyPoint}
                    onChange={(v) => setProjectInfo((prev) => ({ ...prev, assemblyPoint: v }))}
                    placeholder="Main car park, site entrance"
                    disabled={isProcessing}
                    autoComplete="off"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </motion.section>
      </div>

      <QuoteSelectorSheet
        open={quoteSheetOpen}
        onOpenChange={setQuoteSheetOpen}
        onPick={handlePickQuote}
      />

      {/* ── Action bar ───────────────────────────────────────────────────────
          One grouped footer rather than three loose things stacked on the left.
          Desktop: quick-fill on the left, readiness + CTA on the right, so the
          button and the reason it's disabled read as a single unit.
          Mobile: the CTA becomes a full-bleed sticky bar above the tab bar. */}
      <motion.div variants={itemVariants} className="mt-5 sm:mt-6">
        <div className="rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 py-4 -mx-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Quick-fill */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <button
                type="button"
                onClick={() => setQuoteSheetOpen(true)}
                disabled={isProcessing}
                className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-medium text-elec-yellow transition-colors hover:text-elec-yellow/80 disabled:opacity-50 touch-manipulation"
              >
                <FileText className="h-4 w-4" />
                <span>Pre-fill from quote</span>
              </button>
              <button
                type="button"
                onClick={loadMockData}
                disabled={isProcessing}
                className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-medium text-white transition-colors hover:text-elec-yellow disabled:opacity-50 touch-manipulation"
              >
                <TestTube2 className="h-4 w-4" />
                <span>Load test data</span>
              </button>
            </div>

            {/* Readiness — two named checks, so "why is this disabled?" is
                answerable at a glance instead of by reading a sentence. */}
            <div className="flex items-center gap-4 sm:gap-5">
              <ReadyCheck label="Briefing" done={hasDescription} />
              <ReadyCheck label="Project name" done={hasProjectName} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Generate CTA */}
      <div className="pb-safe">
        <div className="sticky bottom-0 z-30 -mx-4 border-t border-white/[0.1] bg-elec-dark/95 px-4 py-3 backdrop-blur-sm sm:static sm:mx-0 sm:mt-5 sm:border-t-0 sm:bg-transparent sm:px-0 sm:py-0">
          <div className="flex flex-col items-stretch gap-2 sm:flex-row-reverse sm:items-center sm:justify-start sm:gap-4">
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={!canGenerate || isProcessing}
              whileTap={canGenerate && !isProcessing ? { scale: 0.98 } : undefined}
              className={cn(
                'inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[14px] font-semibold transition-colors touch-manipulation sm:w-auto sm:px-8',
                canGenerate && !isProcessing
                  ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                  : 'cursor-not-allowed border border-white/[0.12] bg-white/[0.04] text-white'
              )}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating RAMS</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate RAMS</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>

            {!canGenerate && !isProcessing && (
              <p className="text-center text-[12px] text-white sm:text-right">
                {!hasDescription
                  ? `Add ${MIN_DESCRIPTION}+ characters of brief${hasProjectName ? '' : ' and a project name'} to continue`
                  : 'Add a project name to continue'}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
