import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ScanBarcode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProgressSteps, type Step } from '@/components/ui/ProgressSteps';
import {
  Eyebrow,
  Field,
  PrimaryButton,
  SecondaryButton,
  toneText,
  type Tone,
} from '@/components/college/primitives';

import { safetyInputCn, safetyTextareaCn } from '../common/SafetyDocField';
import { EquipmentSection, EquipmentInset } from './EquipmentSection';
import { SafetyMasthead } from '../common/SafetyModuleShell';
import { ReadinessGate } from '../common/ReadinessGate';
import { EquipmentBarcodeScanner } from './EquipmentBarcodeScanner';
import {
  EquipmentCategoryPicker,
  type EquipmentCategory,
  equipmentCategories,
} from './EquipmentCategoryPicker';
import { TestFrequencySelector } from './TestFrequencySelector';
import { SafetyPhotoCapture } from '../common/SafetyPhotoCapture';
import { LocationAutoFill } from '../common/LocationAutoFill';
import {
  nextInspectionFrom,
  todayISODate,
  WARRANTY_HORIZON_DAYS,
  type SafetyEquipment,
} from '@/hooks/useSafetyEquipment';
import { useLocalDraft } from '@/hooks/useLocalDraft';
import { DraftRecoveryBanner } from '../common/DraftRecoveryBanner';
import { DraftSaveIndicator } from '../common/DraftSaveIndicator';

// Form schema
const formSchema = z.object({
  category: z.string().min(1, 'Please select a category'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  serial_number: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  last_inspection: z.string().optional(),
  inspection_interval_days: z.number().min(1),
  condition_notes: z.string().optional(),
  warranty_expiry: z.string().optional(),
  warranty_provider: z.string().optional(),
  warranty_claim_contact: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

/**
 * What this wizard hands back.
 *
 * Declared explicitly rather than derived from the resolver's inference, because
 * that inference is what broke the caller. The old prop type was
 * `Omit<FormData, 'category'> & { category: string; … }`, an intersection the
 * submit payload could not satisfy, and the one consumer sidestepped the whole
 * problem by typing its handlers `(data: Record<string, unknown>)`. Every field
 * read on the other side was then `unknown` — 24 type errors, and, more to the
 * point, the add/update payload was never once checked against the table.
 *
 * Required here means "zod has already guaranteed it by the time we submit".
 */
export interface EquipmentFormValues {
  category: string;
  name: string;
  location: string;
  inspection_interval_days: number;
  serial_number?: string;
  last_inspection?: string;
  condition_notes?: string;
  warranty_expiry?: string;
  warranty_provider?: string;
  warranty_claim_contact?: string;
  photos?: string[];
}

interface EquipmentFormWizardProps {
  initialData?: Partial<SafetyEquipment>;
  onClose: () => void;
  onSubmit: (data: EquipmentFormValues) => Promise<void>;
  isSubmitting?: boolean;
}

const TOTAL_STEPS = 3;

export function EquipmentFormWizard({
  initialData,
  onClose,
  onSubmit,
  isSubmitting = false,
}: EquipmentFormWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  // Seeded from the record being edited. This used to start `[]` unconditionally
  // while the update path sent `photos` straight through — so opening an existing
  // item, changing nothing but the location, and saving DELETED every photo on the
  // record. Every other field was seeded through `defaultValues`; photos were the
  // one piece of state that was not.
  const [photos, setPhotos] = useState<string[]>(initialData?.photos ?? []);
  const [showSerialScanner, setShowSerialScanner] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: initialData?.category || '',
      name: initialData?.name || '',
      serial_number: initialData?.serial_number || '',
      location: initialData?.location || '',
      last_inspection: initialData?.last_inspection || '',
      inspection_interval_days: initialData?.inspection_interval_days || 180,
      condition_notes: initialData?.condition_notes || '',
      warranty_expiry: initialData?.warranty_expiry || '',
      warranty_provider: initialData?.warranty_provider || '',
      warranty_claim_contact: initialData?.warranty_claim_contact || '',
    },
  });

  const watchedValues = watch();

  // ─── Draft auto-save (only for new equipment) ───
  //
  // Keyed on `initialData?.id`, not on `initialData` being present. The register
  // also passes `initialData` when a scanned barcode matched nothing —
  // `{ serial_number: '…' }`, a brand-new record with a serial pre-filled. Testing
  // the object treated that as an edit and silently switched draft protection off
  // for exactly the entry a user is most likely to be part-way through on site.
  // The masthead title already keyed on `.id`, so the two disagreed.
  const isEditing = !!initialData?.id;
  const equipmentDraftData = useMemo(
    () => ({
      ...watchedValues,
      photos,
      currentStep,
    }),
    [watchedValues, photos, currentStep]
  );

  const {
    status: draftStatus,
    recoveredData: recoveredDraft,
    clearDraft,
    dismissRecovery: dismissDraft,
  } = useLocalDraft({
    key: 'equipment-form',
    data: equipmentDraftData,
    enabled: !isEditing,
  });

  const restoreDraft = () => {
    if (!recoveredDraft) return;
    if (recoveredDraft.category) setValue('category', recoveredDraft.category);
    if (recoveredDraft.name) setValue('name', recoveredDraft.name);
    if (recoveredDraft.serial_number) setValue('serial_number', recoveredDraft.serial_number);
    if (recoveredDraft.location) setValue('location', recoveredDraft.location);
    if (recoveredDraft.last_inspection) setValue('last_inspection', recoveredDraft.last_inspection);
    if (recoveredDraft.inspection_interval_days)
      setValue('inspection_interval_days', recoveredDraft.inspection_interval_days);
    if (recoveredDraft.condition_notes) setValue('condition_notes', recoveredDraft.condition_notes);
    if (recoveredDraft.warranty_expiry) setValue('warranty_expiry', recoveredDraft.warranty_expiry);
    if (recoveredDraft.warranty_provider)
      setValue('warranty_provider', recoveredDraft.warranty_provider);
    if (recoveredDraft.warranty_claim_contact)
      setValue('warranty_claim_contact', recoveredDraft.warranty_claim_contact);
    if (recoveredDraft.photos) setPhotos(recoveredDraft.photos);
    if (recoveredDraft.currentStep) setCurrentStep(recoveredDraft.currentStep);
    dismissDraft();
  };

  // The date this preview shows and the date the caller actually writes are now
  // the same calculation (`nextInspectionFrom`), not two hand-rolled copies of
  // the same rule sitting in different files.
  const nextInspectionISO = nextInspectionFrom(
    watchedValues.last_inspection,
    watchedValues.inspection_interval_days
  );
  const nextInspection = nextInspectionISO
    ? new Date(nextInspectionISO).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  // Step validation
  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger(['category', 'name', 'serial_number']);
      case 2:
        return await trigger(['location', 'last_inspection', 'inspection_interval_days']);
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < TOTAL_STEPS) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    } else {
      onClose();
    }
  };

  const onFormSubmit = handleSubmit(async (data) => {
    // Built field by field rather than spread. `handleSubmit`'s callback argument
    // widens every key to optional through the resolver generics, so spreading it
    // could not produce the required `category`/`name`/`location`. zod has already
    // enforced all three by the time we get here; the fallbacks only exist to
    // satisfy the compiler without an assertion.
    await onSubmit({
      category: data.category ?? '',
      name: (data.name ?? '').trim(),
      location: (data.location ?? '').trim(),
      inspection_interval_days: data.inspection_interval_days ?? 180,
      serial_number: data.serial_number?.trim() || undefined,
      last_inspection: data.last_inspection || undefined,
      condition_notes: data.condition_notes?.trim() || undefined,
      warranty_expiry: data.warranty_expiry || undefined,
      warranty_provider: data.warranty_provider?.trim() || undefined,
      warranty_claim_contact: data.warranty_claim_contact?.trim() || undefined,
      photos,
    });
    clearDraft();
  });

  // Get category display info
  const selectedCategory = equipmentCategories.find((c) => c.id === watchedValues.category);

  // Warranty status preview.
  //
  // Both operands are date-only `YYYY-MM-DD`, so both parse as UTC midnight and
  // the difference is an exact whole number of days. The previous version
  // subtracted a UTC-midnight expiry from the LOCAL instant `new Date()`, which
  // in BST reported a warranty expiring today as already expired from 01:00.
  const warrantyPreview = useMemo(() => {
    const expiry = watchedValues.warranty_expiry;
    if (!expiry) return null;
    const diffDays = Math.round((Date.parse(expiry) - Date.parse(todayISODate())) / 86_400_000);
    if (Number.isNaN(diffDays)) return null;
    if (diffDays < 0) return { status: 'expired' as const, days: Math.abs(diffDays) };
    if (diffDays <= WARRANTY_HORIZON_DAYS) return { status: 'expiring' as const, days: diffDays };
    return { status: 'valid' as const, days: diffDays };
  }, [watchedValues.warranty_expiry]);

  // A status read-out, not a selected-state control and not a binary safety
  // verdict — so it takes the neutral surface with the colour carried by the
  // TEXT. It was previously a tinted wash per state (and a `Record<Tone, …>`
  // covering seven tones that could never occur, whose text colour was then
  // recovered by `.split(' ').pop()` on the class string).
  const warrantyTone: Record<'expired' | 'expiring' | 'valid', Tone> = {
    expired: 'red',
    expiring: 'amber',
    valid: 'emerald',
  };

  // Exact match, not `<=` bucketing: the old ladder started at `days <= 90` and
  // so reported a 30-day interval as "3 months".
  const formatFrequency = (days: number | undefined) => {
    if (!days) return 'Not set';
    const preset = { 90: '3 months', 180: '6 months', 365: '12 months', 730: '24 months' }[days];
    return preset ?? `${days} days`;
  };

  // Wizard step definitions
  const wizardSteps: Step[] = [
    { id: 'info', label: 'Equipment' },
    { id: 'testing', label: 'Testing & warranty' },
    { id: 'review', label: 'Review' },
  ];

  // Readiness for save
  const readiness = [
    { ok: !!watchedValues.category, label: 'Category selected' },
    { ok: (watchedValues.name?.trim().length || 0) >= 2, label: 'Equipment name' },
    { ok: (watchedValues.location?.trim().length || 0) >= 2, label: 'Location set' },
    { ok: !!watchedValues.inspection_interval_days, label: 'Test frequency set' },
  ];
  const formReady = readiness.every((r) => r.ok);

  // Step content variants
  const stepVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-[hsl(0_0%_7%)] pb-28">
      <SafetyMasthead
        onBack={handleBack}
        backLabel={currentStep === 1 ? 'Equipment' : 'Back'}
        moduleName={initialData?.id ? 'Edit equipment' : 'Add equipment'}
        trailing={<DraftSaveIndicator status={draftStatus} />}
      />

      <div className="mx-auto max-w-3xl px-4 py-4 space-y-4">
        <ProgressSteps steps={wizardSteps} currentStep={currentStep - 1} compact />

        {/* Draft Recovery Banner */}
        <AnimatePresence>
          {recoveredDraft && !isEditing && (
            <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />
          )}
        </AnimatePresence>

        <form onSubmit={onFormSubmit}>
          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 1: Equipment Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <EquipmentSection eyebrow="Category">
                  <EquipmentCategoryPicker
                    value={watchedValues.category as EquipmentCategory}
                    onChange={(cat) => setValue('category', cat)}
                    error={errors.category?.message}
                  />
                </EquipmentSection>

                <EquipmentSection eyebrow="Equipment identity">
                  <Field label="Equipment name" required>
                    <input
                      placeholder="e.g. Megger PAT420"
                      className={cn(safetyInputCn, errors.name && 'border-red-500/60')}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.name.message}</p>
                    )}
                  </Field>

                  <Field label="Serial number">
                    <div className="flex items-center gap-2">
                      {/* `safetyInputCn` was missing here — with only `flex-1`
                          this rendered as a raw browser text box: white fill,
                          black text, system border, on a near-black form. */}
                      <input
                        placeholder="e.g. PAT-2024-001"
                        className={cn(
                          safetyInputCn,
                          'flex-1',
                          errors.serial_number && 'border-red-500/60'
                        )}
                        {...register('serial_number')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSerialScanner(true)}
                        className="flex items-center justify-center h-11 w-11 rounded-xl flex-shrink-0 bg-elec-yellow text-black touch-manipulation active:scale-[0.95] transition-all"
                        aria-label="Scan barcode"
                      >
                        <ScanBarcode className="h-5 w-5" />
                      </button>
                    </div>
                  </Field>
                </EquipmentSection>
              </motion.div>
            )}

            {/* Step 2: Testing & Warranty */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <EquipmentSection eyebrow="Testing schedule">
                  <LocationAutoFill
                    value={watchedValues.location || ''}
                    onChange={(v) => setValue('location', v, { shouldValidate: true })}
                    label="Location"
                    placeholder="e.g. Van, Main Office, Site Store"
                  />

                  <Field label="Last test date">
                    {/* Same omission as the serial field: a bare
                        `[color-scheme:dark]` on an unstyled date input. */}
                    <input
                      type="date"
                      className={cn(
                        safetyInputCn,
                        '[color-scheme:dark]',
                        errors.last_inspection && 'border-red-500/60'
                      )}
                      {...register('last_inspection')}
                    />
                  </Field>

                  <TestFrequencySelector
                    value={watchedValues.inspection_interval_days}
                    onChange={(days) => setValue('inspection_interval_days', days)}
                    error={errors.inspection_interval_days?.message}
                  />

                  {nextInspection && (
                    <EquipmentInset>
                      <Eyebrow>Next test due</Eyebrow>
                      <p className="mt-1 text-[15px] font-semibold text-white">{nextInspection}</p>
                    </EquipmentInset>
                  )}
                </EquipmentSection>

                <EquipmentSection eyebrow="Warranty (optional)">
                  <Field label="Warranty expiry date">
                    <input
                      type="date"
                      className={cn(safetyInputCn, '[color-scheme:dark]')}
                      {...register('warranty_expiry')}
                    />
                  </Field>
                  <Field label="Warranty provider">
                    <input
                      placeholder="e.g. Megger, Fluke, Kewtech"
                      className={safetyInputCn}
                      {...register('warranty_provider')}
                    />
                  </Field>
                  <Field label="Claim contact">
                    <input
                      placeholder="e.g. 0800 123 456 or support@megger.com"
                      className={safetyInputCn}
                      {...register('warranty_claim_contact')}
                    />
                  </Field>

                  {warrantyPreview && (
                    <EquipmentInset>
                      <Eyebrow className={toneText[warrantyTone[warrantyPreview.status]]}>
                        Warranty status
                      </Eyebrow>
                      <p
                        className={cn(
                          'mt-1 text-[15px] font-semibold',
                          toneText[warrantyTone[warrantyPreview.status]]
                        )}
                      >
                        {warrantyPreview.status === 'expired' &&
                          `Expired ${warrantyPreview.days} day${warrantyPreview.days !== 1 ? 's' : ''} ago`}
                        {warrantyPreview.status === 'expiring' &&
                          `Expiring in ${warrantyPreview.days} day${warrantyPreview.days !== 1 ? 's' : ''}`}
                        {warrantyPreview.status === 'valid' &&
                          `Valid for ${warrantyPreview.days} day${warrantyPreview.days !== 1 ? 's' : ''}`}
                      </p>
                    </EquipmentInset>
                  )}
                </EquipmentSection>
              </motion.div>
            )}

            {/* Step 3: Review & Save */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <EquipmentSection eyebrow="Equipment info">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[12px] text-white">Category</span>
                      <span className="text-[12.5px] font-medium text-white">
                        {selectedCategory?.label || 'Equipment'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[12px] text-white">Name</span>
                      <span className="text-[12.5px] font-medium text-white">
                        {watchedValues.name || 'Unnamed'}
                      </span>
                    </div>
                    {watchedValues.serial_number && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[12px] text-white">Serial</span>
                        <span className="text-[12.5px] font-medium text-white">
                          {watchedValues.serial_number}
                        </span>
                      </div>
                    )}
                  </div>
                </EquipmentSection>

                <EquipmentSection eyebrow="Testing schedule">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[12px] text-white">Location</span>
                      <span className="text-[12.5px] font-medium text-white">
                        {watchedValues.location || 'Not set'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[12px] text-white">Last test</span>
                      <span className="text-[12.5px] font-medium text-white">
                        {watchedValues.last_inspection
                          ? new Date(watchedValues.last_inspection).toLocaleDateString('en-GB')
                          : 'Not set'}
                      </span>
                    </div>
                    {nextInspection && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[12px] text-white">Next test</span>
                        <span className="text-[12.5px] font-medium text-emerald-400">
                          {nextInspection}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[12px] text-white">Frequency</span>
                      <span className="text-[12.5px] font-medium text-white">
                        {formatFrequency(watchedValues.inspection_interval_days)}
                      </span>
                    </div>
                  </div>
                </EquipmentSection>

                {watchedValues.warranty_expiry && (
                  <EquipmentSection eyebrow="Warranty">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[12px] text-white">Expiry</span>
                        <span className="text-[12.5px] font-medium text-white">
                          {new Date(watchedValues.warranty_expiry).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      {watchedValues.warranty_provider && (
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[12px] text-white">Provider</span>
                          <span className="text-[12.5px] font-medium text-white">
                            {watchedValues.warranty_provider}
                          </span>
                        </div>
                      )}
                      {watchedValues.warranty_claim_contact && (
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[12px] text-white">Claim contact</span>
                          <span className="text-[12.5px] font-medium text-white">
                            {watchedValues.warranty_claim_contact}
                          </span>
                        </div>
                      )}
                    </div>
                  </EquipmentSection>
                )}

                <EquipmentSection eyebrow="Notes & photos">
                  <Field label="Notes (optional)">
                    <textarea
                      placeholder="Add any notes about this equipment…"
                      className={cn(safetyTextareaCn, 'min-h-[80px]')}
                      {...register('condition_notes')}
                    />
                  </Field>
                  <SafetyPhotoCapture
                    photos={photos}
                    onPhotosChange={setPhotos}
                    maxPhotos={5}
                    label="Equipment photos"
                  />
                  <p className="text-[11px] text-white">
                    Tip: include warranty receipts or proof of purchase.
                  </p>
                </EquipmentSection>

                <ReadinessGate items={readiness} title="Ready to save?" />
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Sticky bottom actions */}
      <div
        className="fixed bottom-0 inset-x-0 bg-[hsl(0_0%_7%)]/95 backdrop-blur-sm border-t border-white/[0.06] px-4 py-3"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto max-w-3xl">
          {currentStep < TOTAL_STEPS ? (
            <PrimaryButton fullWidth size="lg" onClick={handleNext}>
              Continue
            </PrimaryButton>
          ) : (
            <div className="flex gap-2">
              <SecondaryButton size="lg" onClick={onClose}>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                size="lg"
                disabled={isSubmitting || !formReady}
                onClick={() => onFormSubmit()}
              >
                {isSubmitting ? 'Saving…' : 'Save equipment'}
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>

      <EquipmentBarcodeScanner
        open={showSerialScanner}
        onClose={() => setShowSerialScanner(false)}
        onScan={(result) => {
          setValue('serial_number', result.text, { shouldValidate: true });
          setShowSerialScanner(false);
        }}
        title="Scan serial number"
        description="Point at the barcode on the equipment"
      />
    </div>
  );
}
