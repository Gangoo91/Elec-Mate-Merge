import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Camera,
  ChevronDown,
  FileText,
  Loader2,
  Shield,
  Sparkles,
  TestTube2,
  X,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { IOSInput } from '@/components/ui/ios-input';
import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { JobScaleBadge } from './JobScaleBadge';
import { QuoteSelectorSheet, type QuotePickerRow } from './QuoteSelectorSheet';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const MIN_DESCRIPTION = 50;
const INPUT_DRAFT_KEY = 'rams-input-draft-v1';

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

  // Restore from localStorage draft if available
  const savedDraft = loadInputDraft();

  const [jobDescription, setJobDescription] = useState(savedDraft?.jobDescription ?? '');
  const [projectInfo, setProjectInfo] = useState(savedDraft?.projectInfo ?? {
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
  });

  const [detectedScale, setDetectedScale] = useState<'domestic' | 'commercial' | 'industrial'>(
    'commercial'
  );
  const [manualScale, setManualScale] = useState<'domestic' | 'commercial' | 'industrial' | null>(
    savedDraft?.manualScale ?? null
  );
  const [scaleConfidence, setScaleConfidence] = useState<number>(0);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [quoteSheetOpen, setQuoteSheetOpen] = useState(false);
  const [attachments, setAttachments] = useState<AIRAMSAttachment[]>([]);
  const [uploading, setUploading] = useState(false);

  // Per-form upload session id so the same job can re-upload without
  // colliding. The path is moved into the final job_id namespace by the
  // edge function at create time if needed; for now we keep them grouped
  // under this temp id.
  const [uploadSessionId] = useState(
    () => `pending-${crypto.randomUUID().slice(0, 8)}`
  );

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
    const description =
      q.job_details?.description?.trim() || q.job_details?.title?.trim() || '';
    if (description) setJobDescription(description);
    setProjectInfo((prev) => ({
      ...prev,
      projectName:
        q.job_details?.title?.trim() ||
        (q.client_data?.name ? `${q.client_data.name} job` : prev.projectName),
      location:
        q.job_details?.location?.trim() || q.client_data?.address?.trim() || prev.location,
    }));
    toast({
      title: 'Pre-filled from quote',
      description: q.client_data?.name
        ? `Using details from ${q.client_data.name}'s quote.`
        : 'Quote details applied.',
    });
  };

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
      // Clear the input draft once generation starts — the result draft takes over
      try { localStorage.removeItem(INPUT_DRAFT_KEY); } catch { /* ignore */ }
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
      className="space-y-7 sm:space-y-10 pb-32 sm:pb-12"
    >
      {/* 01 — BRIEFING (hero) */}
      <motion.section variants={itemVariants} className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <Eyebrow>01 · BRIEFING</Eyebrow>
          <span
            className={cn(
              'text-[11px] tabular-nums',
              hasDescription ? 'text-emerald-400/70' : 'text-white/45'
            )}
          >
            {jobDescription.length} chars
          </span>
        </div>
        <h2 className="text-[24px] sm:text-[30px] font-semibold tracking-tight leading-[1.1] text-white">
          Describe the job.
        </h2>
        <p className="text-[13.5px] text-white/75 leading-relaxed max-w-2xl">
          Tell us what work needs the RAMS — site, scope, scale. The more detail you give, the
          sharper the risk assessment and method statement.
        </p>

        <div
          className={cn(
            'relative bg-[hsl(0_0%_10%)] border rounded-2xl p-5 transition-colors',
            hasDescription
              ? 'border-elec-yellow/40'
              : 'border-white/[0.10] hover:border-white/15'
          )}
        >
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="e.g., Install new consumer unit in 3-bed house with full rewire of kitchen, including new sockets, lighting circuit, and connection of integrated appliances..."
            disabled={isProcessing}
            rows={6}
            maxLength={1000}
            className="w-full bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none text-[15px] sm:text-[16px] text-white placeholder:text-white/35 resize-none touch-manipulation leading-relaxed"
            style={{ fontSize: '16px' }}
          />
          <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-baseline justify-between text-[11px]">
            <span className="text-white/55">
              {MIN_DESCRIPTION} chars minimum for a meaningful risk assessment
            </span>
            {hasDescription && (
              <span className="text-emerald-400/80 uppercase tracking-[0.18em] font-semibold text-[10px]">
                Ready
              </span>
            )}
          </div>
        </div>

        {/* Quick-pick example chips — horizontal scroll on mobile, wrap on larger */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide sm:flex-wrap sm:overflow-x-visible">
          {examplePrompts[manualScale || detectedScale].map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setJobDescription(prompt)}
              disabled={isProcessing}
              className="flex-shrink-0 h-9 px-3 rounded-xl text-[12.5px] font-medium bg-[hsl(0_0%_10%)] border border-white/[0.10] text-white/80 hover:border-elec-yellow/40 hover:text-elec-yellow transition-colors touch-manipulation active:scale-[0.99] disabled:opacity-50 whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Job scale auto-detect badge */}
        {scaleConfidence > 0 && (
          <div className="pt-1">
            <JobScaleBadge
              scale={manualScale || detectedScale}
              confidence={scaleConfidence}
              onManualChange={setManualScale}
            />
          </div>
        )}

        {/* Site photo attachments — vision extracts visible hazards on the
            backend before the H&S agent runs. Optional but adds real depth. */}
        <div className="pt-3 space-y-3">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Site photos
            </span>
            <span className="text-[11px] text-white/45 tabular-nums">
              {attachments.length} / {MAX_ATTACHMENTS}
            </span>
          </div>
          <p className="text-[12px] text-white/65 leading-relaxed">
            Add up to {MAX_ATTACHMENTS} photos of the site, distribution boards or work
            area. We&rsquo;ll pull visible hazards into the risk register.
          </p>

          {attachments.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {attachments.map((a) => (
                <div
                  key={a.path}
                  className="relative aspect-square rounded-xl overflow-hidden bg-[hsl(0_0%_10%)] border border-white/[0.10]"
                >
                  {a.previewUrl && a.type.startsWith('image/') ? (
                    <img
                      src={a.previewUrl}
                      alt={a.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/55 text-[11px] p-2 text-center">
                      {a.name}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeAttachment(a)}
                    disabled={isProcessing}
                    className="absolute top-1 right-1 inline-flex items-center justify-center h-7 w-7 rounded-full bg-black/65 hover:bg-black/85 transition-colors touch-manipulation"
                    aria-label="Remove photo"
                  >
                    <X className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {attachments.length < MAX_ATTACHMENTS && (
            <label
              className={cn(
                'block w-full cursor-pointer touch-manipulation',
                (isProcessing || uploading) && 'opacity-50 pointer-events-none'
              )}
            >
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
              <div className="flex items-center justify-center gap-2 h-12 rounded-xl border border-dashed border-white/[0.15] hover:border-elec-yellow/40 bg-[hsl(0_0%_10%)] text-[13px] font-medium text-white/75 transition-colors">
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading…
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4" />
                    Add a site photo
                  </>
                )}
              </div>
            </label>
          )}
        </div>
      </motion.section>

      {/* 02 — PROJECT DETAILS */}
      <motion.section variants={itemVariants} className="space-y-5">
        <div className="space-y-2">
          <Eyebrow>02 · PROJECT DETAILS</Eyebrow>
          <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
            Where, and who.
          </h3>
          <p className="text-[12.5px] text-white/65 leading-snug max-w-2xl">
            Site, contractor, assessor. These are embedded into the document headers and footers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <IOSInput
            label="Project name"
            value={projectInfo.projectName}
            onChange={(e) => setProjectInfo((prev) => ({ ...prev, projectName: e.target.value }))}
            placeholder="e.g., Warehouse Lighting Upgrade"
            disabled={isProcessing}
          />
          <IOSInput
            label="Site location"
            value={projectInfo.location}
            onChange={(e) => setProjectInfo((prev) => ({ ...prev, location: e.target.value }))}
            placeholder="e.g., Unit 5, Industrial Estate"
            disabled={isProcessing}
          />
          <IOSInput
            label="Assessor"
            value={projectInfo.assessor}
            onChange={(e) => setProjectInfo((prev) => ({ ...prev, assessor: e.target.value }))}
            placeholder="Your name"
            disabled={isProcessing}
          />
          <IOSInput
            label="Contractor"
            value={projectInfo.contractor}
            onChange={(e) => setProjectInfo((prev) => ({ ...prev, contractor: e.target.value }))}
            placeholder="Company name"
            disabled={isProcessing}
          />
          <div className="sm:col-span-2">
            <IOSInput
              label="Supervisor (optional)"
              value={projectInfo.supervisor}
              onChange={(e) =>
                setProjectInfo((prev) => ({ ...prev, supervisor: e.target.value }))
              }
              placeholder="Site supervisor"
              disabled={isProcessing}
            />
          </div>
        </div>
      </motion.section>

      {/* 03 — EMERGENCY CONTACTS (collapsible) */}
      <motion.section variants={itemVariants} className="space-y-3">
        <Eyebrow>03 · EMERGENCY CONTACTS</Eyebrow>
        <Collapsible open={showEmergencyContacts} onOpenChange={setShowEmergencyContacts}>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="w-full flex items-center justify-between p-4 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.10] hover:border-elec-yellow/30 transition-colors touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Shield className="h-4 w-4 text-elec-yellow shrink-0" />
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-[13.5px] font-medium text-white">
                    Site manager, first aider, H&S officer
                  </span>
                  <span className="text-[11px] text-white/55">
                    Optional — embedded into the RAMS cover page if filled
                  </span>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white/60 transition-transform duration-300 shrink-0',
                  showEmergencyContacts && 'rotate-180'
                )}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <IOSInput
                label="Site manager name"
                value={projectInfo.siteManagerName}
                onChange={(e) =>
                  setProjectInfo((prev) => ({ ...prev, siteManagerName: e.target.value }))
                }
                placeholder="John Smith"
                disabled={isProcessing}
              />
              <IOSInput
                label="Site manager phone"
                value={projectInfo.siteManagerPhone}
                onChange={(e) =>
                  setProjectInfo((prev) => ({ ...prev, siteManagerPhone: e.target.value }))
                }
                placeholder="07XXX XXXXXX"
                disabled={isProcessing}
              />
              <IOSInput
                label="First aider name"
                value={projectInfo.firstAiderName}
                onChange={(e) =>
                  setProjectInfo((prev) => ({ ...prev, firstAiderName: e.target.value }))
                }
                placeholder="Jane Doe"
                disabled={isProcessing}
              />
              <IOSInput
                label="First aider phone"
                value={projectInfo.firstAiderPhone}
                onChange={(e) =>
                  setProjectInfo((prev) => ({ ...prev, firstAiderPhone: e.target.value }))
                }
                placeholder="07XXX XXXXXX"
                disabled={isProcessing}
              />
              <IOSInput
                label="H&S officer name"
                value={projectInfo.safetyOfficerName}
                onChange={(e) =>
                  setProjectInfo((prev) => ({ ...prev, safetyOfficerName: e.target.value }))
                }
                placeholder="Safety officer"
                disabled={isProcessing}
              />
              <IOSInput
                label="H&S officer phone"
                value={projectInfo.safetyOfficerPhone}
                onChange={(e) =>
                  setProjectInfo((prev) => ({ ...prev, safetyOfficerPhone: e.target.value }))
                }
                placeholder="07XXX XXXXXX"
                disabled={isProcessing}
              />
              <div className="sm:col-span-2">
                <IOSInput
                  label="Emergency assembly point"
                  value={projectInfo.assemblyPoint}
                  onChange={(e) =>
                    setProjectInfo((prev) => ({ ...prev, assemblyPoint: e.target.value }))
                  }
                  placeholder="e.g., Main car park, site entrance"
                  disabled={isProcessing}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </motion.section>

      {/* Quick-fill actions */}
      <motion.div variants={itemVariants} className="flex items-center gap-5 text-[12.5px]">
        <button
          type="button"
          onClick={() => setQuoteSheetOpen(true)}
          disabled={isProcessing}
          className="inline-flex items-center gap-1.5 text-elec-yellow hover:text-elec-yellow/80 transition-colors disabled:opacity-50 touch-manipulation"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Pre-fill from quote</span>
        </button>
        <button
          type="button"
          onClick={loadMockData}
          disabled={isProcessing}
          className="inline-flex items-center gap-1.5 text-white/55 hover:text-white transition-colors disabled:opacity-50 touch-manipulation"
        >
          <TestTube2 className="h-3.5 w-3.5" />
          <span>Load test data</span>
        </button>
      </motion.div>

      <QuoteSelectorSheet
        open={quoteSheetOpen}
        onOpenChange={setQuoteSheetOpen}
        onPick={handlePickQuote}
      />

      {/* Sticky generate CTA — single, adapts mobile + desktop */}
      <div className="pb-safe">
        <div className="sticky bottom-0 z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 sm:py-0 bg-elec-dark/95 backdrop-blur-sm border-t border-white/[0.06] sm:border-t-0 sm:bg-transparent">
          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={!canGenerate || isProcessing}
            whileTap={canGenerate && !isProcessing ? { scale: 0.98 } : undefined}
            className={cn(
              'w-full h-12 rounded-xl text-[14px] font-semibold inline-flex items-center justify-center gap-2 transition-colors touch-manipulation',
              canGenerate && !isProcessing
                ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                : 'bg-white/[0.05] text-white/40 cursor-not-allowed'
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
            <p className="mt-2 text-center text-[11px] text-white/45">
              {!hasDescription
                ? `Describe the job (${MIN_DESCRIPTION}+ chars) and add a project name to continue`
                : 'Add a project name to continue'}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
