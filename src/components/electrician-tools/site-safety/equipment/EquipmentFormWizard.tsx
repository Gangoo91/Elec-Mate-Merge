import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowLeft,
  Package,
  Tag,
  MapPin,
  Calendar,
  FileText,
  Check,
  Loader2,
  ScanBarcode,
  ShieldCheck,
  Building2,
  Phone,
  Camera,
  Eye,
  ClipboardCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IOSInput } from '@/components/ui/ios-input';
import { ProgressSteps, type Step } from '@/components/ui/ProgressSteps';
import { cn } from '@/lib/utils';
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

  // Wizard step definitions
  const wizardSteps: Step[] = [
    { id: 'info', label: 'Equipment Info', icon: Package },
    { id: 'testing', label: 'Testing & Warranty', icon: ClipboardCheck },
    { id: 'review', label: 'Review', icon: Eye },
  ];

  // Step content variants
  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/[0.08]">
        <div className="flex items-center justify-between p-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white hover:text-white transition-colors min-h-[44px] touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">{currentStep === 1 ? 'Cancel' : 'Back'}</span>
          </button>
          <h1 className="text-base font-semibold text-white">
            {initialData?.id ? 'Edit Equipment' : 'Add Equipment'}
          </h1>
          <div className="w-16 flex justify-end">
            <DraftSaveIndicator status={draftStatus} />
          </div>
        </div>

        {/* Progress indicator */}
        <div className="px-3 pb-3">
          <ProgressSteps
            steps={wizardSteps}
            currentStep={currentStep - 1}
            compact
          />
        </div>

        {/* Step accent line */}
        <div className={cn(
          'h-0.5 bg-gradient-to-r',
          currentStep === 1 && 'from-elec-yellow via-amber-400 to-elec-yellow',
          currentStep === 2 && 'from-emerald-500 via-emerald-400 to-emerald-500',
          currentStep === 3 && 'from-blue-500 via-blue-400 to-blue-500'
        )} />
      </div>

      {/* Draft Recovery Banner */}
      <AnimatePresence>
        {recoveredDraft && !isEditing && (
          <div className="px-3 pt-3">
            <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />
          </div>
        )}
      </AnimatePresence>

      {/* Step Content */}
      <form onSubmit={onFormSubmit} className="p-3 pb-28">
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
              {/* Context banner */}
              <div className="bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/[0.02] border border-elec-yellow/20 rounded-2xl backdrop-blur-sm p-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/10">
                    <Package className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Equipment Details</p>
                    <p className="text-[10px] text-white">Select a category and identify your equipment</p>
                  </div>
                </div>
              </div>

              {/* Category picker in glass card */}
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-3">
                <EquipmentCategoryPicker
                  value={watchedValues.category as EquipmentCategory}
                  onChange={(cat) => setValue('category', cat)}
                  error={errors.category?.message}
                />
              </div>

              {/* Equipment Identity section */}
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-3 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 rounded-full bg-elec-yellow" />
                  <span className="text-xs font-medium text-white">Equipment Identity</span>
                </div>

                <IOSInput
                  label="Equipment Name"
                  icon={<Package className="h-5 w-5" />}
                  placeholder="e.g. Megger PAT420"
                  error={errors.name?.message}
                  {...register('name')}
                />

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-white">
                    Serial Number (Optional)
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <IOSInput
                        label=""
                        icon={<Tag className="h-5 w-5" />}
                        placeholder="e.g. PAT-2024-001"
                        error={errors.serial_number?.message}
                        {...register('serial_number')}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowSerialScanner(true)}
                      className={cn(
                        'flex items-center justify-center h-11 w-11 rounded-xl flex-shrink-0',
                        'bg-elec-yellow text-black',
                        'touch-manipulation active:scale-[0.95] transition-all'
                      )}
                      title="Scan barcode"
                    >
                      <ScanBarcode className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
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
              {/* Context banner */}
              <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/[0.02] border border-emerald-500/20 rounded-2xl backdrop-blur-sm p-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/30 to-emerald-500/10">
                    <Calendar className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Testing & Warranty</p>
                    <p className="text-[10px] text-white">Set test schedule and warranty details</p>
                  </div>
                </div>
              </div>

              {/* Testing Schedule section card */}
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-3 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 rounded-full bg-emerald-400" />
                  <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-xs font-medium text-white">Testing Schedule</span>
                </div>

                <LocationAutoFill
                  value={watchedValues.location || ''}
                  onChange={(v) => setValue('location', v, { shouldValidate: true })}
                  label="Location"
                  placeholder="e.g. Van, Main Office, Site Store"
                />

                <IOSInput
                  label="Last Test Date"
                  icon={<Calendar className="h-5 w-5" />}
                  type="date"
                  error={errors.last_inspection?.message}
                  {...register('last_inspection')}
                />

                <TestFrequencySelector
                  value={watchedValues.inspection_interval_days}
                  onChange={(days) => setValue('inspection_interval_days', days)}
                  error={errors.inspection_interval_days?.message}
                />

                {/* Next test preview */}
                {nextInspection && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <p className="text-[10px] text-emerald-400 mb-0.5">Next Test Due</p>
                    <p className="text-base font-semibold text-emerald-400">{nextInspection}</p>
                  </div>
                )}
              </div>

              {/* Warranty Details section card */}
              <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-3 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 rounded-full bg-amber-400" />
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-xs font-medium text-white flex-1">Warranty Details</span>
                  <span className="text-[10px] text-white">Optional</span>
                </div>

                <IOSInput
                  label="Warranty Expiry Date"
                  icon={<Calendar className="h-5 w-5" />}
                  type="date"
                  {...register('warranty_expiry')}
                />

                <IOSInput
                  label="Warranty Provider"
                  icon={<Building2 className="h-5 w-5" />}
                  placeholder="e.g. Megger, Fluke, Kewtech"
                  {...register('warranty_provider')}
                />

                <IOSInput
                  label="Claim Contact"
                  icon={<Phone className="h-5 w-5" />}
                  placeholder="e.g. 0800 123 456 or support@megger.com"
                  {...register('warranty_claim_contact')}
                />

                {/* Warranty status preview */}
                {warrantyPreview && (
                  <div
                    className={cn(
                      'p-3 rounded-lg border',
                      warrantyPreview.status === 'expired' && 'bg-red-500/10 border-red-500/20',
                      warrantyPreview.status === 'expiring' && 'bg-amber-500/10 border-amber-500/20',
                      warrantyPreview.status === 'valid' && 'bg-emerald-500/10 border-emerald-500/20'
                    )}
                  >
                    <p
                      className={cn(
                        'text-[10px] mb-0.5',
                        warrantyPreview.status === 'expired' && 'text-red-400',
                        warrantyPreview.status === 'expiring' && 'text-amber-400',
                        warrantyPreview.status === 'valid' && 'text-emerald-400'
                      )}
                    >
                      Warranty Status
                    </p>
                    <p
                      className={cn(
                        'text-base font-semibold',
                        warrantyPreview.status === 'expired' && 'text-red-400',
                        warrantyPreview.status === 'expiring' && 'text-amber-400',
                        warrantyPreview.status === 'valid' && 'text-emerald-400'
                      )}
                    >
                      {warrantyPreview.status === 'expired' &&
                        `Expired ${warrantyPreview.days} day${warrantyPreview.days !== 1 ? 's' : ''} ago`}
                      {warrantyPreview.status === 'expiring' &&
                        `Expiring in ${warrantyPreview.days} day${warrantyPreview.days !== 1 ? 's' : ''}`}
                      {warrantyPreview.status === 'valid' &&
                        `Valid for ${warrantyPreview.days} day${warrantyPreview.days !== 1 ? 's' : ''}`}
                    </p>
                  </div>
                )}
              </div>
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
              {/* Context banner */}
              <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/[0.02] border border-blue-500/20 rounded-2xl backdrop-blur-sm p-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/30 to-blue-500/10">
                    <FileText className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Review & Save</p>
                    <p className="text-[10px] text-white">Check the details before saving</p>
                  </div>
                </div>
              </div>

              {/* Equipment Info mini-card */}
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                <span className="text-[10px] font-medium text-white">Equipment Info</span>
              </div>
              <div className="flex rounded-2xl overflow-hidden bg-card/80 backdrop-blur-sm border border-white/10">
                <div className="w-1.5 bg-elec-yellow rounded-l-2xl flex-shrink-0" />
                <div className="flex-1 p-3 space-y-2">
                  <div className="flex items-center gap-2.5">
                    {selectedCategory && (
                      <div className={cn('p-1.5 rounded-lg', selectedCategory.bgColor)}>
                        <selectedCategory.icon className={cn('h-4 w-4', selectedCategory.color)} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-white px-1.5 py-0.5 rounded-full bg-elec-yellow/10">
                          {selectedCategory?.label || 'Equipment'}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-white truncate">
                        {watchedValues.name || 'Unnamed'}
                      </h3>
                    </div>
                  </div>
                  {watchedValues.serial_number && (
                    <div className="flex justify-between">
                      <span className="text-xs text-white">Serial</span>
                      <span className="text-xs text-white">{watchedValues.serial_number}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Testing Schedule mini-card */}
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-medium text-white">Testing Schedule</span>
              </div>
              <div className="flex rounded-2xl overflow-hidden bg-card/80 backdrop-blur-sm border border-white/10">
                <div className="w-1.5 bg-emerald-400 rounded-l-2xl flex-shrink-0" />
                <div className="flex-1 p-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-white">Location</span>
                    <span className="text-xs text-white">
                      {watchedValues.location || 'Not set'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-white">Last Test</span>
                    <span className="text-xs text-white">
                      {watchedValues.last_inspection
                        ? new Date(watchedValues.last_inspection).toLocaleDateString('en-GB')
                        : 'Not set'}
                    </span>
                  </div>
                  {nextInspection && (
                    <div className="flex justify-between">
                      <span className="text-xs text-white">Next Test</span>
                      <span className="text-xs text-emerald-400">{nextInspection}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-xs text-white">Frequency</span>
                    <span className="text-xs text-white">
                      {watchedValues.inspection_interval_days <= 90
                        ? '3 months'
                        : watchedValues.inspection_interval_days <= 180
                          ? '6 months'
                          : watchedValues.inspection_interval_days <= 365
                            ? '12 months'
                            : watchedValues.inspection_interval_days <= 730
                              ? '24 months'
                              : `${watchedValues.inspection_interval_days} days`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Warranty mini-card (conditional) */}
              {watchedValues.warranty_expiry && (
                <>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="text-[10px] font-medium text-white">Warranty Details</span>
                  </div>
                  <div className="flex rounded-2xl overflow-hidden bg-card/80 backdrop-blur-sm border border-white/10">
                    <div className="w-1.5 bg-amber-400 rounded-l-2xl flex-shrink-0" />
                  <div className="flex-1 p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-white">Expiry</span>
                      <span className="text-xs text-white">
                        {new Date(watchedValues.warranty_expiry).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                    {watchedValues.warranty_provider && (
                      <div className="flex justify-between">
                        <span className="text-xs text-white">Provider</span>
                        <span className="text-xs text-white">
                          {watchedValues.warranty_provider}
                        </span>
                      </div>
                    )}
                    {watchedValues.warranty_claim_contact && (
                      <div className="flex justify-between">
                        <span className="text-xs text-white">Claim Contact</span>
                        <span className="text-xs text-white">
                          {watchedValues.warranty_claim_contact}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                </>
              )}

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-white">Notes (Optional)</label>
                <textarea
                  placeholder="Add any notes about this equipment..."
                  className={cn(
                    'w-full min-h-[80px] p-3 rounded-lg text-sm',
                    'bg-white/5 border border-white/[0.08]',
                    'text-white placeholder:text-white',
                    'focus:outline-none focus:border-elec-yellow/50',
                    'resize-none touch-manipulation'
                  )}
                  {...register('condition_notes')}
                />
              </div>

              {/* Equipment Photos */}
              <SafetyPhotoCapture
                photos={photos}
                onPhotosChange={setPhotos}
                maxPhotos={5}
                label="Equipment Photos"
              />
              <div className="flex items-center gap-1.5 -mt-2">
                <Camera className="h-3 w-3 text-white flex-shrink-0" />
                <p className="text-[10px] text-white">
                  Tip: Include warranty receipts or proof of purchase
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Fixed bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-black/95 backdrop-blur-sm border-t border-white/[0.08] safe-area-bottom">
        {currentStep < TOTAL_STEPS ? (
          <Button
            type="button"
            onClick={handleNext}
            className={cn(
              'w-full h-11 text-sm font-semibold rounded-xl touch-manipulation',
              'bg-elec-yellow text-black hover:bg-elec-yellow/90',
              'shadow-lg shadow-elec-yellow/25',
              'active:scale-[0.98]'
            )}
          >
            Continue
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-11 text-sm rounded-xl border-white/[0.08] text-white hover:bg-white/10 touch-manipulation"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={onFormSubmit}
              disabled={isSubmitting}
              className={cn(
                'flex-1 h-11 text-sm font-semibold rounded-xl touch-manipulation',
                'bg-elec-yellow text-black hover:bg-elec-yellow/90',
                'shadow-lg shadow-elec-yellow/25',
                'active:scale-[0.98]',
                'disabled:opacity-50'
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-1.5" />
                  Save Equipment
                </>
              )}
            </Button>
          </div>
        )}
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
