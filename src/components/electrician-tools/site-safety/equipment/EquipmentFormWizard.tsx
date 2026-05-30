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
  FormCard,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  type Tone,
} from '@/components/college/primitives';
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
import type { SafetyEquipment } from '@/hooks/useSafetyEquipment';
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

interface EquipmentFormWizardProps {
  initialData?: Partial<SafetyEquipment>;
  onClose: () => void;
  onSubmit: (
    data: Omit<FormData, 'category'> & { category: string; photos?: string[] | null }
  ) => Promise<void>;
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
  const [photos, setPhotos] = useState<string[]>([]);
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

  // ─── Draft Auto-save (only for new equipment) ───
  const isEditing = !!initialData;
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

  // Calculate next inspection date
  const calculateNextInspection = () => {
    if (!watchedValues.last_inspection) return null;
    const lastDate = new Date(watchedValues.last_inspection);
    lastDate.setDate(lastDate.getDate() + (watchedValues.inspection_interval_days || 180));
    return lastDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const nextInspection = calculateNextInspection();

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
    await onSubmit({
      ...data,
      photos: photos.length > 0 ? photos : null,
    });
    clearDraft();
  });

  // Get category display info
  const selectedCategory = equipmentCategories.find((c) => c.id === watchedValues.category);

  // Warranty status preview
  const warrantyPreview = useMemo(() => {
    if (!watchedValues.warranty_expiry) return null;
    const now = new Date();
    const expiry = new Date(watchedValues.warranty_expiry);
    const diffMs = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { status: 'expired' as const, days: Math.abs(diffDays) };
    if (diffDays <= 30) return { status: 'expiring' as const, days: diffDays };
    return { status: 'valid' as const, days: diffDays };
  }, [watchedValues.warranty_expiry]);

  const warrantyTone: Record<'expired' | 'expiring' | 'valid', Tone> = {
    expired: 'red',
    expiring: 'amber',
    valid: 'emerald',
  };
  const warrantyToneClass: Record<Tone, string> = {
    red: 'border-red-500/25 bg-red-500/[0.07] text-red-400',
    amber: 'border-amber-500/25 bg-amber-500/[0.07] text-amber-400',
    emerald: 'border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-400',
    green: 'border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-400',
    blue: 'border-blue-500/25 bg-blue-500/[0.07] text-blue-400',
    orange: 'border-orange-500/25 bg-orange-500/[0.07] text-orange-400',
    yellow: 'border-elec-yellow/25 bg-elec-yellow/[0.07] text-elec-yellow',
    purple: 'border-purple-500/25 bg-purple-500/[0.07] text-purple-400',
    cyan: 'border-cyan-500/25 bg-cyan-500/[0.07] text-cyan-400',
    indigo: 'border-indigo-500/25 bg-indigo-500/[0.07] text-indigo-400',
  };

  const formatFrequency = (days: number) =>
    days <= 90
      ? '3 months'
      : days <= 180
        ? '6 months'
        : days <= 365
          ? '12 months'
          : days <= 730
            ? '24 months'
            : `${days} days`;

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
    <div className="bg-elec-dark min-h-screen pb-28">
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
                <FormCard eyebrow="Category">
                  <EquipmentCategoryPicker
                    value={watchedValues.category as EquipmentCategory}
                    onChange={(cat) => setValue('category', cat)}
                    error={errors.category?.message}
                  />
                </FormCard>

                <FormCard eyebrow="Equipment identity">
                  <Field label="Equipment name" required>
                    <input
                      placeholder="e.g. Megger PAT420"
                      className={cn(inputClass, errors.name && 'border-red-500/60')}
                      {...register('name')}
                    />
                    {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name.message}</p>}
                  </Field>

                  <Field label="Serial number">
                    <div className="flex items-center gap-2">
                      <input
                        placeholder="e.g. PAT-2024-001"
                        className={cn(inputClass, 'flex-1', errors.serial_number && 'border-red-500/60')}
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
                </FormCard>
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
                <FormCard eyebrow="Testing schedule">
                  <LocationAutoFill
                    value={watchedValues.location || ''}
                    onChange={(v) => setValue('location', v, { shouldValidate: true })}
                    label="Location"
                    placeholder="e.g. Van, Main Office, Site Store"
                  />

                  <Field label="Last test date">
                    <input
                      type="date"
                      className={cn(inputClass, '[color-scheme:dark]', errors.last_inspection && 'border-red-500/60')}
                      {...register('last_inspection')}
                    />
                  </Field>

                  <TestFrequencySelector
                    value={watchedValues.inspection_interval_days}
                    onChange={(days) => setValue('inspection_interval_days', days)}
                    error={errors.inspection_interval_days?.message}
                  />

                  {nextInspection && (
                    <div className="p-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]">
                      <Eyebrow>Next test due</Eyebrow>
                      <p className="mt-1 text-[15px] font-semibold text-white">{nextInspection}</p>
                    </div>
                  )}
                </FormCard>

                <FormCard eyebrow="Warranty (optional)">
                  <Field label="Warranty expiry date">
                    <input type="date" className={cn(inputClass, '[color-scheme:dark]')} {...register('warranty_expiry')} />
                  </Field>
                  <Field label="Warranty provider">
                    <input placeholder="e.g. Megger, Fluke, Kewtech" className={inputClass} {...register('warranty_provider')} />
                  </Field>
                  <Field label="Claim contact">
                    <input placeholder="e.g. 0800 123 456 or support@megger.com" className={inputClass} {...register('warranty_claim_contact')} />
                  </Field>

                  {warrantyPreview && (
                    <div className={cn('p-3 rounded-xl border', warrantyToneClass[warrantyTone[warrantyPreview.status]])}>
                      <Eyebrow className={warrantyToneClass[warrantyTone[warrantyPreview.status]].split(' ').pop()}>
                        Warranty status
                      </Eyebrow>
                      <p className="mt-1 text-[15px] font-semibold">
                        {warrantyPreview.status === 'expired' &&
                          `Expired ${warrantyPreview.days} day${warrantyPreview.days !== 1 ? 's' : ''} ago`}
                        {warrantyPreview.status === 'expiring' &&
                          `Expiring in ${warrantyPreview.days} day${warrantyPreview.days !== 1 ? 's' : ''}`}
                        {warrantyPreview.status === 'valid' &&
                          `Valid for ${warrantyPreview.days} day${warrantyPreview.days !== 1 ? 's' : ''}`}
                      </p>
                    </div>
                  )}
                </FormCard>
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
                <FormCard eyebrow="Equipment info">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[12px] text-white/55">Category</span>
                      <span className="text-[12.5px] font-medium text-white">
                        {selectedCategory?.label || 'Equipment'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[12px] text-white/55">Name</span>
                      <span className="text-[12.5px] font-medium text-white">{watchedValues.name || 'Unnamed'}</span>
                    </div>
                    {watchedValues.serial_number && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[12px] text-white/55">Serial</span>
                        <span className="text-[12.5px] font-medium text-white">{watchedValues.serial_number}</span>
                      </div>
                    )}
                  </div>
                </FormCard>

                <FormCard eyebrow="Testing schedule">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[12px] text-white/55">Location</span>
                      <span className="text-[12.5px] font-medium text-white">{watchedValues.location || 'Not set'}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[12px] text-white/55">Last test</span>
                      <span className="text-[12.5px] font-medium text-white">
                        {watchedValues.last_inspection
                          ? new Date(watchedValues.last_inspection).toLocaleDateString('en-GB')
                          : 'Not set'}
                      </span>
                    </div>
                    {nextInspection && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[12px] text-white/55">Next test</span>
                        <span className="text-[12.5px] font-medium text-emerald-400">{nextInspection}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[12px] text-white/55">Frequency</span>
                      <span className="text-[12.5px] font-medium text-white">
                        {formatFrequency(watchedValues.inspection_interval_days)}
                      </span>
                    </div>
                  </div>
                </FormCard>

                {watchedValues.warranty_expiry && (
                  <FormCard eyebrow="Warranty">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[12px] text-white/55">Expiry</span>
                        <span className="text-[12.5px] font-medium text-white">
                          {new Date(watchedValues.warranty_expiry).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      {watchedValues.warranty_provider && (
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[12px] text-white/55">Provider</span>
                          <span className="text-[12.5px] font-medium text-white">{watchedValues.warranty_provider}</span>
                        </div>
                      )}
                      {watchedValues.warranty_claim_contact && (
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[12px] text-white/55">Claim contact</span>
                          <span className="text-[12.5px] font-medium text-white">{watchedValues.warranty_claim_contact}</span>
                        </div>
                      )}
                    </div>
                  </FormCard>
                )}

                <FormCard eyebrow="Notes & photos">
                  <Field label="Notes (optional)">
                    <textarea
                      placeholder="Add any notes about this equipment…"
                      className={cn(
                        'w-full min-h-[80px] px-4 py-3 rounded-xl text-[13px] bg-[hsl(0_0%_9%)] border border-white/[0.08] text-white placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 resize-none touch-manipulation'
                      )}
                      {...register('condition_notes')}
                    />
                  </Field>
                  <SafetyPhotoCapture
                    photos={photos}
                    onPhotosChange={setPhotos}
                    maxPhotos={5}
                    label="Equipment photos"
                  />
                  <p className="text-[11px] text-white/45">
                    Tip: include warranty receipts or proof of purchase.
                  </p>
                </FormCard>

                <ReadinessGate items={readiness} title="Ready to save?" />
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Sticky bottom actions */}
      <div
        className="fixed bottom-0 inset-x-0 bg-elec-dark/95 backdrop-blur-sm border-t border-white/[0.06] px-4 py-3"
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
        title="Scan Serial Number"
        description="Point at the barcode on the equipment"
      />
    </div>
  );
}
