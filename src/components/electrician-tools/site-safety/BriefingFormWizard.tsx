import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { IOSInput } from '@/components/ui/ios-input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Save,
  FileText,
  MapPin,
  Home,
  Clock,
  Calendar,
  Users,
  Camera,
  Loader2,
  X,
  Check,
  Plus,
  ImagePlus,
  Trash2,
  Eye,
  ShieldAlert,
  AlertTriangle,
  ImageIcon,
  Share2,
  UserPlus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  BriefingTypePicker,
  BriefingType,
  briefingTypes,
  HazardPillSelector,
  defaultHazards,
  RiskLevelSlider,
  RiskLevel,
  BriefingShareSheet,
  PostSaveShareSheet,
} from './briefings';
import { TemplateSelector } from './briefing-templates/TemplateSelector';

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
  photo_urls?: string[];
}

interface BriefingFormWizardProps {
  initialData?: any;
  nearMissData?: NearMissData | null;
  onClose: () => void;
  onSuccess: () => void;
}

const STEP_TITLES = ['Type & Site', 'Briefing Content', 'Hazards', 'Photos', 'Attendees'];

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
    photos:
      nearMissData?.photo_urls?.map((url) => ({ url, caption: '' })) || initialData?.photos || [],
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
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

        const {
          data: { publicUrl },
        } = supabase.storage.from('briefing-photos').getPublicUrl(data.path);

        uploadedPhotos.push({ url: publicUrl, caption: '' });
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

            <IOSInput
              label="Site Name"
              icon={<MapPin className="h-5 w-5" />}
              placeholder="e.g. Acme Construction"
              value={formData.siteName}
              onChange={(e) => setValue('siteName', e.target.value)}
              error={errors.siteName?.message}
            />

            <IOSInput
              label="Site Address"
              icon={<Home className="h-5 w-5" />}
              placeholder="e.g. 123 High Street, Manchester"
              value={formData.siteAddress || ''}
              onChange={(e) => setValue('siteAddress', e.target.value)}
              hint="Optional"
            />

            <div className="grid grid-cols-2 gap-3">
              <IOSInput
                label="Date"
                type="date"
                icon={<Calendar className="h-5 w-5" />}
                value={formData.briefingDate}
                onChange={(e) => setValue('briefingDate', e.target.value)}
                className="[color-scheme:dark]"
              />
              <IOSInput
                label="Time"
                type="time"
                icon={<Clock className="h-5 w-5" />}
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

            <IOSInput
              label="Briefing Title"
              icon={<FileText className="h-5 w-5" />}
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
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="h-4.5 w-4.5 text-elec-yellow" />
                <label className="text-sm font-semibold text-white">Site Photos</label>
                <span className="text-xs text-white font-normal">(Optional)</span>
              </div>
              {photoCount > 0 && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-elec-yellow/20 text-elec-yellow"
                >
                  {photoCount} of {maxPhotos}
                </motion.span>
              )}
            </div>
            <p className="text-xs text-white -mt-2">
              Photograph site conditions, hazards, or relevant areas
            </p>

            {/* Upload Area */}
            {remaining > 0 && (
              <label
                className={cn(
                  'group flex flex-col items-center justify-center gap-3',
                  'py-8 rounded-2xl border-2 border-dashed',
                  'border-white/15 hover:border-elec-yellow/40',
                  'bg-white/[0.03] hover:bg-elec-yellow/[0.04]',
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
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={cn(
                        'flex items-center justify-center w-14 h-14 rounded-2xl',
                        'bg-elec-yellow/10 group-hover:bg-elec-yellow/20',
                        'transition-colors duration-300'
                      )}
                    >
                      <ImagePlus className="h-7 w-7 text-elec-yellow/70 group-hover:text-elec-yellow transition-colors" />
                    </motion.div>
                    <div className="text-center">
                      <span className="block text-sm font-medium text-white group-hover:text-white transition-colors">
                        Take or choose photos
                      </span>
                      <span className="block text-xs text-white mt-1">
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
                        src={photo.url}
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
                    src={previewPhoto}
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

            {/* Add Attendee — quick add */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <IOSInput
                  placeholder="Name(s) — e.g. John, Dave, Mike"
                  value={newAttendeeName}
                  onChange={(e) => setNewAttendeeName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAttendee())}
                  icon={<UserPlus className="h-5 w-5" />}
                />
                <Button
                  type="button"
                  onClick={addAttendee}
                  disabled={!newAttendeeName.trim()}
                  className="h-[50px] px-5 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation font-semibold"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              <p className="text-xs text-white">
                Separate multiple names with commas to add them all at once
              </p>
            </div>

            {/* Attendee List — numbered register */}
            <div className="space-y-2">
              <AnimatePresence>
                {(formData.attendees || []).map((attendee, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10"
                  >
                    {/* Row number */}
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.06] shrink-0">
                      <span className="text-xs font-bold text-white">{idx + 1}</span>
                    </div>

                    {/* Name & role */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-sm font-medium text-white truncate">{attendee.name}</p>
                      <input
                        type="text"
                        value={attendee.role || ''}
                        onChange={(e) => updateAttendeeRole(idx, e.target.value)}
                        placeholder="Trade / role (optional)"
                        className={cn(
                          'w-full text-xs px-0 py-0.5 bg-transparent border-0 text-white',
                          'placeholder:text-white focus:outline-none focus:text-white',
                          'touch-manipulation'
                        )}
                      />
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeAttendee(idx)}
                      className="flex items-center justify-center w-11 h-11 rounded-xl text-white hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {totalAttendees === 0 && (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-dashed border-white/15 flex items-center justify-center mx-auto mb-3">
                    <UserPlus className="h-7 w-7 text-white" />
                  </div>
                  <p className="text-sm font-medium text-white mb-1">No attendees added</p>
                  <p className="text-xs text-white">
                    Add the people who need to sign off on this briefing
                  </p>
                </div>
              )}
            </div>

            {/* Review Summary */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
              <div className="px-4 pt-3 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  Review Summary
                </span>
              </div>
              <div className="px-4 py-3 space-y-2.5">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.06]">
                    <FileText className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-white truncate">
                    {briefingTypeInfo?.label || formData.briefingType} — {formData.briefingTitle}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.06]">
                    <MapPin className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-white truncate">{formData.siteName}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.06]">
                    <Calendar className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-white whitespace-nowrap">
                    {formData.briefingDate
                      ? new Date(formData.briefingDate + 'T00:00:00').toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : ''}{' '}
                    at {formData.briefingTime}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.06]">
                    <ShieldAlert className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-white">
                    {formData.hazards?.length || 0} hazards identified
                  </span>
                </div>
                {(formData.photos?.length || 0) > 0 && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.06]">
                      <Camera className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-white">
                      {formData.photos!.length} photo{formData.photos!.length > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
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
        <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur border-b border-white/10">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={step === 0 ? onClose : prevStep}
              className="p-2.5 -ml-2 text-white hover:text-white touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="text-center">
              <p className="text-xs text-white">
                Step {step + 1} of {totalSteps}
              </p>
              <p className="text-sm font-medium text-white">{STEP_TITLES[step]}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 -mr-2 text-white hover:text-white touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-white/10">
            <motion.div
              className="h-full bg-elec-yellow"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

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
