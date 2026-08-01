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
  Sparkles,
  Save,
  FileText,
  Users,
  Loader2,
  X,
  Check,
  Plus,
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

interface BriefingFormWizardProps {
  initialData?: any;
  nearMissData?: NearMissData | null;
  onClose: () => void;
  onSuccess: () => void;
}

const STEP_TITLES = ['Type & Site', 'Briefing Content', 'Hazards', 'Photos', 'Attendees'];

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

  // Default values
  const defaultValues: Partial<BriefingFormData> = {
    briefingType: nearMissData ? 'near-miss-review' : initialData?.briefing_type || '',
    siteName: nearMissData?.location || initialData?.location || '',
    siteAddress: initialData?.site_address || '',
    briefingTitle: nearMissData
      ? `Near Miss Review: ${nearMissData.categoryLabel}`
      : initialData?.briefing_name || '',
    briefingContent: nearMissData?.description || initialData?.briefing_description || '',
    briefingDate: initialData?.briefing_date || new Date().toISOString().split('T')[0],
    briefingTime: initialData?.briefing_time || '09:00',
    hazards: nearMissData ? [nearMissData.category] : initialData?.identified_hazards || [],
    riskLevel: (nearMissData?.severity as RiskLevel) || initialData?.risk_level || 'medium',
    photos: nearMissData?.photos?.map((url) => ({ url, caption: '' })) || initialData?.photos || [],
    attendees: initialData?.attendees || [],
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
  const progress = ((step + 1) / totalSteps) * 100;

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
      const briefingContent =
        data.content.briefingOverview?.map((p: any) => p.content).join('\n\n') ||
        data.content.briefingDescription ||
        formData.briefingContent;

      setValue('briefingContent', briefingContent);

      toast({
        title: 'AI Content Generated',
        description: 'Review and edit the AI-generated content.',
      });
    } catch (error: any) {
      console.error('AI generation error:', error);
      toast({
        title: 'Generation Failed',
        description: error.message || 'Failed to generate content.',
        variant: 'destructive',
      });
    } finally {
      setAiGenerating(false);
    }
  };

  // Template selection handler
  const handleTemplateSelect = (template: {
    id: string;
    name: string;
    description: string;
    template_type: string;
  }) => {
    setValue('briefingTitle', template.name);
    setValue('briefingContent', template.description);
    if (template.template_type) {
      setValue('briefingType', template.template_type);
    }
    setShowTemplateSelector(false);
    toast({
      title: 'Template loaded',
      description: `"${template.name}" has been applied. Review and edit as needed.`,
    });
  };

  // Photo upload
  const handlePhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadingPhotos(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const uploadedPhotos: any[] = [];

      for (const file of Array.from(files)) {
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
        title: 'Photos Uploaded',
        description: `${uploadedPhotos.length} photo(s) added.`,
      });
    } catch (error: any) {
      toast({
        title: 'Upload Failed',
        description: error.message || 'Failed to upload photos.',
        variant: 'destructive',
      });
    } finally {
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

  // Save briefing
  const handleSave = async (asDraft = false) => {
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
        status: asDraft ? 'draft' : 'scheduled',
      };

      let error;
      if (initialData?.id || savedBriefingId) {
        const updateId = initialData?.id || savedBriefingId;
        const { error: updateError } = await supabase
          .from('team_briefings')
          .update(briefingData)
          .eq('id', updateId);
        error = updateError;
      } else {
        const { data: insertedData, error: insertError } = await supabase
          .from('team_briefings')
          .insert([briefingData])
          .select('id')
          .single();
        error = insertError;
        if (insertedData?.id) {
          setSavedBriefingId(insertedData.id);
        }
      }

      if (error) throw error;

      toast({
        title: initialData?.id ? 'Briefing Updated' : asDraft ? 'Draft Saved' : 'Briefing Created',
        description: 'Successfully saved.',
      });

      onSuccess();

      if (asDraft) {
        // Keep wizard open for drafts
      } else if ((formData.attendees || []).length > 0) {
        // Show post-save share sheet when there are attendees to sign
        setShowPostSaveShare(true);
      } else {
        onClose();
      }
    } catch (error: any) {
      toast({
        title: 'Save Failed',
        description: error.message || 'Failed to save briefing.',
        variant: 'destructive',
      });
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
                      <TemplateSelector
                        onSelectTemplate={handleTemplateSelect}
                        selectedType={formData.briefingType || undefined}
                      />
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
            {/* AI Assist Button */}
            <Button
              type="button"
              onClick={handleGenerateAI}
              disabled={aiGenerating || !formData.briefingType}
              className={cn(
                'w-full h-12',
                'bg-gradient-to-r from-purple-500 to-blue-500',
                'hover:from-purple-600 hover:to-blue-600',
                'text-white font-medium'
              )}
            >
              {aiGenerating ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Sparkles className="h-5 w-5 mr-2" />
              )}
              {aiGenerating ? 'Generating...' : 'AI Assist'}
            </Button>

            <SafetyDocField
              label="Briefing Title"
              placeholder="e.g. Daily Site Induction Briefing"
              value={formData.briefingTitle}
              onChange={(e) => setValue('briefingTitle', e.target.value)}
              error={errors.briefingTitle?.message}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Briefing Content</label>
              <textarea
                value={formData.briefingContent}
                onChange={(e) => setValue('briefingContent', e.target.value)}
                placeholder="Enter the briefing content. Include key points, safety information, and any specific instructions..."
                rows={8}
                className={cn(
                  'w-full px-4 py-3 rounded-xl',
                  'bg-white/5 border border-white/10',
                  'text-white placeholder:text-white',
                  'focus:outline-none focus:ring-2 focus:ring-elec-yellow/50 focus:border-elec-yellow/50',
                  'transition-all resize-none touch-manipulation'
                )}
              />
              <div className="flex justify-between text-xs text-white">
                <span>{errors.briefingContent?.message}</span>
                <span>{formData.briefingContent?.length || 0} / 50 min</span>
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
        const maxPhotos = 5;
        const remaining = maxPhotos - photoCount;

        return (
          <div className="space-y-5">
            {/* Heading is type, and the count is a figure rather than a pill —
                the same treatment the certificates give a section count. */}
            <div className="flex items-baseline justify-between gap-3">
              <label className="text-[12px] font-medium text-white">Site photos (optional)</label>
              <span className="shrink-0 text-[12px] font-medium tabular-nums text-white">
                {photoCount} of {maxPhotos}
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
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-elec-yellow" />
                <label className="text-sm font-semibold text-white">Sign-Off Register</label>
              </div>
              {totalAttendees > 0 && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-elec-yellow/20 text-elec-yellow"
                >
                  {totalAttendees} {totalAttendees === 1 ? 'person' : 'people'}
                </motion.span>
              )}
            </div>
            <p className="text-xs text-white -mt-2">
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
                  className="h-11 touch-manipulation bg-elec-yellow px-5 font-semibold text-black hover:bg-elec-yellow/90"
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
                          'px-0 py-1 text-[13px] text-white placeholder:text-white',
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
          onBack={step === 0 ? onClose : prevStep}
          title="Team Briefing"
          subtitle={formData.siteName ? `${formData.siteName} · HSG250` : 'Toolbox talk · HSG250'}
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

        {/* Footer Actions */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-elec-dark/95 backdrop-blur border-t border-white/10 safe-area-pb">
          <div className="flex gap-3">
            {step === totalSteps - 1 ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSave(true)}
                  className="flex-1 h-14 border-white/20 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button
                  type="button"
                  onClick={() => handleSave(false)}
                  className="flex-1 h-14 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Complete
                </Button>
                {/* Share for remote signing — only available if briefing has been saved */}
                {savedBriefingId && (
                  <Button
                    type="button"
                    onClick={() => setShowShareSheet(true)}
                    className="h-14 px-4 bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                )}
              </>
            ) : (
              <>
                {step > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-6 border-white/20 text-white"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={cn(
                    'flex-1 h-14 font-semibold',
                    'bg-elec-yellow text-black hover:bg-elec-yellow/90',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </>
            )}
          </div>
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
              onClose={() => {
                setShowPostSaveShare(false);
                onClose();
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </FormProvider>
  );
};
