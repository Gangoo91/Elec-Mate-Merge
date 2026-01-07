import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { IOSInput } from "@/components/ui/ios-input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BriefingTypePicker,
  BriefingType,
  HazardPillSelector,
  RiskLevelSlider,
  RiskLevel,
  SignaturePad,
  AttendeeSignatureCard,
} from "./briefings";

// Schema for the form
const briefingSchema = z.object({
  briefingType: z.string().min(1, "Please select a briefing type"),
  siteName: z.string().min(2, "Site name is required"),
  siteAddress: z.string().optional(),
  briefingTitle: z.string().min(3, "Title must be at least 3 characters"),
  briefingContent: z.string().min(50, "Content must be at least 50 characters"),
  briefingDate: z.string().min(1, "Date is required"),
  briefingTime: z.string().min(1, "Time is required"),
  hazards: z.array(z.string()).min(1, "Select at least one hazard"),
  riskLevel: z.enum(["low", "medium", "high"]),
  photos: z.array(z.object({
    url: z.string(),
    caption: z.string().optional(),
  })).optional(),
  attendees: z.array(z.object({
    name: z.string(),
    signature: z.string().optional(),
    timestamp: z.string().optional(),
  })).optional(),
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

const STEP_TITLES = [
  "Type & Site",
  "Briefing Content",
  "Hazards",
  "Photos",
  "Review & Signatures",
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
  const [newAttendeeName, setNewAttendeeName] = useState("");
  const [signingAttendeeIndex, setSigningAttendeeIndex] = useState<number | null>(null);

  // Default values
  const defaultValues: Partial<BriefingFormData> = {
    briefingType: nearMissData ? "near-miss-review" : initialData?.briefing_type || "",
    siteName: nearMissData?.location || initialData?.location || "",
    siteAddress: initialData?.site_address || "",
    briefingTitle: nearMissData
      ? `Near Miss Review: ${nearMissData.categoryLabel}`
      : initialData?.briefing_name || "",
    briefingContent: nearMissData?.description || initialData?.briefing_description || "",
    briefingDate: initialData?.briefing_date || new Date().toISOString().split("T")[0],
    briefingTime: initialData?.briefing_time || "09:00",
    hazards: nearMissData ? [nearMissData.category] : initialData?.identified_hazards || [],
    riskLevel: (nearMissData?.severity as RiskLevel) || initialData?.risk_level || "medium",
    photos: (nearMissData?.photo_urls?.map(url => ({ url, caption: "" })) || initialData?.photos || []),
    attendees: initialData?.attendees || [],
  };

  const methods = useForm<BriefingFormData>({
    resolver: zodResolver(briefingSchema),
    defaultValues,
    mode: "onChange",
  });

  const { watch, setValue, formState: { errors } } = methods;
  const formData = watch();

  const totalSteps = STEP_TITLES.length;
  const progress = ((step + 1) / totalSteps) * 100;

  // AI Content Generation
  const handleGenerateAI = async () => {
    setAiGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-briefing-content", {
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
      const briefingContent = data.content.briefingOverview
        ?.map((p: any) => p.content)
        .join("\n\n") || data.content.briefingDescription || formData.briefingContent;

      setValue("briefingContent", briefingContent);

      toast({
        title: "AI Content Generated",
        description: "Review and edit the AI-generated content.",
      });
    } catch (error: any) {
      console.error("AI generation error:", error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate content.",
        variant: "destructive",
      });
    } finally {
      setAiGenerating(false);
    }
  };

  // Photo upload
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadingPhotos(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const uploadedPhotos: any[] = [];

      for (const file of Array.from(files)) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from("briefing-photos")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from("briefing-photos")
          .getPublicUrl(data.path);

        uploadedPhotos.push({ url: publicUrl, caption: "" });
      }

      setValue("photos", [...(formData.photos || []), ...uploadedPhotos]);

      toast({
        title: "Photos Uploaded",
        description: `${uploadedPhotos.length} photo(s) added.`,
      });
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload photos.",
        variant: "destructive",
      });
    } finally {
      setUploadingPhotos(false);
    }
  };

  const handleDeletePhoto = (index: number) => {
    setValue(
      "photos",
      (formData.photos || []).filter((_, idx) => idx !== index)
    );
  };

  // Attendee management
  const addAttendee = () => {
    if (!newAttendeeName.trim()) return;
    setValue("attendees", [
      ...(formData.attendees || []),
      { name: newAttendeeName.trim(), signature: undefined, timestamp: undefined },
    ]);
    setNewAttendeeName("");
  };

  const removeAttendee = (index: number) => {
    setValue(
      "attendees",
      (formData.attendees || []).filter((_, idx) => idx !== index)
    );
  };

  const handleSignature = (index: number, signature: string | undefined) => {
    const updated = [...(formData.attendees || [])];
    updated[index] = {
      ...updated[index],
      signature,
      timestamp: signature ? new Date().toLocaleString() : undefined,
    };
    setValue("attendees", updated);
    setSigningAttendeeIndex(null);
  };

  // Save briefing
  const handleSave = async (asDraft = false) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      const briefingData = {
        user_id: user.id,
        template_id: "ai-generated",
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
        status: asDraft ? "draft" : "scheduled",
      };

      let error;
      if (initialData?.id) {
        const { error: updateError } = await supabase
          .from("team_briefings")
          .update(briefingData)
          .eq("id", initialData.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("team_briefings")
          .insert([briefingData]);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: initialData?.id
          ? "Briefing Updated"
          : asDraft
            ? "Draft Saved"
            : "Briefing Created",
        description: "Successfully saved.",
      });

      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save briefing.",
        variant: "destructive",
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
        return true; // Review step
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
            <BriefingTypePicker
              value={formData.briefingType as BriefingType}
              onChange={(type) => setValue("briefingType", type)}
              error={errors.briefingType?.message}
            />

            <IOSInput
              label="Site Name"
              icon={<MapPin className="h-5 w-5" />}
              placeholder="e.g. Acme Construction"
              value={formData.siteName}
              onChange={(e) => setValue("siteName", e.target.value)}
              error={errors.siteName?.message}
            />

            <IOSInput
              label="Site Address"
              icon={<Home className="h-5 w-5" />}
              placeholder="e.g. 123 High Street, Manchester"
              value={formData.siteAddress || ""}
              onChange={(e) => setValue("siteAddress", e.target.value)}
              hint="Optional"
            />

            <div className="grid grid-cols-2 gap-3">
              <IOSInput
                label="Date"
                type="date"
                icon={<Calendar className="h-5 w-5" />}
                value={formData.briefingDate}
                onChange={(e) => setValue("briefingDate", e.target.value)}
                className="[color-scheme:dark]"
              />
              <IOSInput
                label="Time"
                type="time"
                icon={<Clock className="h-5 w-5" />}
                value={formData.briefingTime}
                onChange={(e) => setValue("briefingTime", e.target.value)}
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
                "w-full h-12",
                "bg-gradient-to-r from-purple-500 to-blue-500",
                "hover:from-purple-600 hover:to-blue-600",
                "text-white font-medium"
              )}
            >
              {aiGenerating ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Sparkles className="h-5 w-5 mr-2" />
              )}
              {aiGenerating ? "Generating..." : "AI Assist"}
            </Button>

            <IOSInput
              label="Briefing Title"
              icon={<FileText className="h-5 w-5" />}
              placeholder="e.g. Daily Site Induction Briefing"
              value={formData.briefingTitle}
              onChange={(e) => setValue("briefingTitle", e.target.value)}
              error={errors.briefingTitle?.message}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Briefing Content
              </label>
              <textarea
                value={formData.briefingContent}
                onChange={(e) => setValue("briefingContent", e.target.value)}
                placeholder="Enter the briefing content. Include key points, safety information, and any specific instructions..."
                rows={8}
                className={cn(
                  "w-full px-4 py-3 rounded-xl",
                  "bg-white/5 border border-white/10",
                  "text-white placeholder:text-white/40",
                  "focus:outline-none focus:ring-2 focus:ring-elec-yellow/50 focus:border-elec-yellow/50",
                  "transition-all resize-none"
                )}
              />
              <div className="flex justify-between text-xs text-white/40">
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
              onChange={(hazards) => setValue("hazards", hazards)}
              error={errors.hazards?.message}
            />

            <RiskLevelSlider
              value={formData.riskLevel as RiskLevel}
              onChange={(level) => setValue("riskLevel", level)}
            />
          </div>
        );

      // Step 4: Photos
      case 3:
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Site Photos (Optional)
              </label>
              <p className="text-xs text-white/50">
                Add photos to document site conditions
              </p>
            </div>

            {/* Upload Area */}
            <label
              className={cn(
                "flex flex-col items-center justify-center",
                "h-32 rounded-xl border-2 border-dashed",
                "border-white/20 hover:border-white/40",
                "bg-white/5 hover:bg-white/10",
                "cursor-pointer transition-all",
                uploadingPhotos && "pointer-events-none opacity-50"
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
                <Loader2 className="h-8 w-8 text-white/50 animate-spin" />
              ) : (
                <>
                  <Camera className="h-8 w-8 text-white/50 mb-2" />
                  <span className="text-sm text-white/50">Tap to add photos</span>
                  <span className="text-xs text-white/30 mt-1">Max 5 photos</span>
                </>
              )}
            </label>

            {/* Photo Grid */}
            {formData.photos && formData.photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {formData.photos.map((photo, idx) => (
                  <div key={idx} className="relative aspect-square">
                    <img
                      src={photo.url}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeletePhoto(idx)}
                      className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      // Step 5: Review & Signatures
      case 4:
        return (
          <div className="space-y-5">
            {/* Summary Card */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                <span className="font-medium text-white">{formData.briefingTitle}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-3.5 w-3.5" />
                <span>{formData.siteName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formData.briefingDate} at {formData.briefingTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <span className="capitalize">{formData.hazards?.length || 0} hazards</span>
                <span className="text-white/30">•</span>
                <span className="capitalize">{formData.riskLevel} risk</span>
              </div>
            </div>

            {/* Attendees */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white/80">
                  Attendees & Signatures
                </label>
                <span className="text-xs text-white/50">
                  {(formData.attendees || []).filter((a) => a.signature).length} of{" "}
                  {(formData.attendees || []).length} signed
                </span>
              </div>

              {/* Add Attendee */}
              <div className="flex gap-2">
                <IOSInput
                  placeholder="Enter attendee name"
                  value={newAttendeeName}
                  onChange={(e) => setNewAttendeeName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAttendee())}
                  icon={<Users className="h-5 w-5" />}
                />
                <Button
                  type="button"
                  onClick={addAttendee}
                  disabled={!newAttendeeName.trim()}
                  className="h-[50px] px-4 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Attendee List */}
              <AnimatePresence>
                {(formData.attendees || []).map((attendee, idx) => (
                  <div key={idx}>
                    {signingAttendeeIndex === idx ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <SignaturePad
                          name={`Signature for ${attendee.name}`}
                          value={attendee.signature}
                          onChange={(sig) => handleSignature(idx, sig)}
                        />
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setSigningAttendeeIndex(null)}
                            className="flex-1 h-10 text-white/60"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            onClick={() => handleSignature(idx, attendee.signature)}
                            disabled={!attendee.signature}
                            className="flex-1 h-10 bg-emerald-500 text-white hover:bg-emerald-600"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Confirm
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <AttendeeSignatureCard
                        name={attendee.name}
                        signed={!!attendee.signature}
                        timestamp={attendee.timestamp}
                        onSign={() => setSigningAttendeeIndex(idx)}
                        onRemove={() => removeAttendee(idx)}
                      />
                    )}
                  </div>
                ))}
              </AnimatePresence>

              {(formData.attendees || []).length === 0 && (
                <p className="text-center py-4 text-white/40 text-sm">
                  Add attendees to collect signatures
                </p>
              )}
            </div>
          </div>
        );

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
              className="p-2 -ml-2 text-white/60 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="text-center">
              <p className="text-xs text-white/50">
                Step {step + 1} of {totalSteps}
              </p>
              <p className="text-sm font-medium text-white">
                {STEP_TITLES[step]}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-white/60 hover:text-white"
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
                  className="flex-1 h-14 border-white/20 text-white/80"
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
              </>
            ) : (
              <>
                {step > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-6 border-white/20 text-white/80"
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
                    "flex-1 h-14 font-semibold",
                    "bg-elec-yellow text-black hover:bg-elec-yellow/90",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
