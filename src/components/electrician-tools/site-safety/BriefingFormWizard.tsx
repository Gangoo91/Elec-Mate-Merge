import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight, Sparkles, Save, FileText, Users, AlertTriangle, Camera, Loader2, Clock, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { TemplateSelector } from "./briefing-templates/TemplateSelector";
import { FormattedTextDisplay } from "./FormattedTextDisplay";
import { useBriefingAutoSave } from "@/hooks/useBriefingAutoSave";
import { RiskMatrixGuide } from "./wizard-helpers/RiskMatrixGuide";
import { StepValidation } from "./wizard-helpers/StepValidation";
import { EnhancedPhotoManager } from "./wizard-helpers/EnhancedPhotoManager";

const HAZARD_CATEGORIES = [
  { id: 'live-circuits', label: 'Live Circuits', category: 'Electrical' },
  { id: 'high-voltage', label: 'High Voltage', category: 'Electrical' },
  { id: 'arc-flash', label: 'Arc Flash', category: 'Electrical' },
  { id: 'working-at-height', label: 'Working at Height', category: 'Physical' },
  { id: 'confined-spaces', label: 'Confined Spaces', category: 'Physical' },
  { id: 'manual-handling', label: 'Manual Handling', category: 'Physical' },
  { id: 'poor-lighting', label: 'Poor Lighting', category: 'Environmental' },
  { id: 'noise', label: 'Excessive Noise', category: 'Environmental' },
  { id: 'asbestos', label: 'Asbestos', category: 'Chemical' },
  { id: 'restricted-access', label: 'Restricted Access', category: 'Access' },
];

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

export const BriefingFormWizard = ({ initialData, nearMissData, onClose, onSuccess }: BriefingFormWizardProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(nearMissData ? 1 : 0); // Skip template if from near miss
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiContent, setAiContent] = useState<any>(null);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(!initialData && !nearMissData);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  

  // Build initial form data - pre-populate from editing OR near miss data
  const buildInitialFormData = () => {
    // If we have near miss data, pre-fill from it
    if (nearMissData) {
      const severityToRiskLevel: Record<string, string> = {
        'low': 'low',
        'medium': 'medium', 
        'high': 'high',
        'critical': 'critical'
      };
      
      return {
        briefingType: "near-miss-review",
        briefingTitle: `Near Miss Review: ${nearMissData.categoryLabel} - ${nearMissData.location}`,
        location: nearMissData.location,
        contractorCompany: "",
        conductorName: "",
        briefingDate: new Date().toISOString().split('T')[0],
        briefingTime: "09:00",
        briefingContent: nearMissData.description,
        workScope: `Review of near miss incident: ${nearMissData.description}`,
        environment: "",
        teamSize: 4,
        experienceLevel: "",
        identifiedHazards: [nearMissData.category],
        customHazards: nearMissData.potential_consequences || "",
        riskLevel: severityToRiskLevel[nearMissData.severity] || "medium",
        specialConsiderations: nearMissData.preventive_measures || "",
        briefingDescription: "",
        hazards: "",
        safetyWarning: "",
        additionalInfo: nearMissData.immediate_actions || "",
        photos: (nearMissData.photo_urls || []).map(url => ({ url, caption: 'From near miss report' })),
        attendees: [] as any[],
        linkedNearMissId: nearMissData.id,
      };
    }
    
    // Otherwise use initialData for editing
    return {
      briefingType: initialData?.briefing_type || "site-work",
      briefingTitle: initialData?.briefing_name || initialData?.title || "",
      location: initialData?.location || "",
      contractorCompany: initialData?.contractor_company || "",
      conductorName: initialData?.conductor_name || "",
      briefingDate: initialData?.briefing_date || new Date().toISOString().split('T')[0],
      briefingTime: initialData?.briefing_time || "09:00",
      briefingContent: initialData?.briefing_content || "",
      workScope: initialData?.work_scope || "",
      environment: initialData?.environment || "",
      teamSize: initialData?.team_size || 4,
      experienceLevel: initialData?.experience_level || "",
      identifiedHazards: initialData?.identified_hazards || [] as string[],
      customHazards: initialData?.custom_hazards || "",
      riskLevel: initialData?.risk_level || "medium",
      specialConsiderations: initialData?.special_considerations || "",
      briefingDescription: initialData?.briefing_description || "",
      hazards: initialData?.hazards || "",
      safetyWarning: initialData?.safety_warning || "",
      additionalInfo: initialData?.notes || "",
      photos: initialData?.photos || [] as any[],
      attendees: initialData?.attendees || [] as any[],
    };
  };

  const [formData, setFormData] = useState(buildInitialFormData());

  // Auto-save hook
  const {
    loadSavedData,
    saveData: manualSave,
    clearSavedData,
    lastSaved,
    hasUnsavedChanges,
    timeSinceLastSave,
  } = useBriefingAutoSave(formData, step, !!initialData || !!nearMissData);

  const totalSteps = 7; // Including template selection
  const progress = (step / totalSteps) * 100;

  // Check for saved data on mount
  useEffect(() => {
    if (initialData || nearMissData) return; // Don't load auto-save when editing or from near miss
    
    const saved = loadSavedData();
    if (saved) {
      setShowRestoreDialog(true);
    }
  }, []);

  const handleRestoreSaved = () => {
    const saved = loadSavedData();
    if (saved) {
      setFormData(saved.formData);
      setStep(saved.step);
      toast({
        title: "Progress Restored",
        description: "Your previous work has been restored.",
      });
    }
    setShowRestoreDialog(false);
  };

  const handleDiscardSaved = () => {
    clearSavedData();
    setShowRestoreDialog(false);
  };

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setShowTemplateSelector(false);
    
    // Pre-populate form data based on template
    if (template.template_schema) {
      const schema = template.template_schema;
      setFormData(prev => ({
        ...prev,
        briefingType: template.template_type,
        workScope: schema.work_scope || prev.workScope,
        identifiedHazards: schema.hazards || prev.identifiedHazards,
      }));
    }
    
    setStep(1); // Move to first actual form step
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadingPhotos(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const uploadedPhotos: any[] = [];

      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from('briefing-photos')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('briefing-photos')
          .getPublicUrl(data.path);

        uploadedPhotos.push({
          url: publicUrl,
          caption: '',
          filename: file.name
        });
      }

      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...uploadedPhotos]
      }));

      toast({
        title: "Photos Uploaded",
        description: `${uploadedPhotos.length} photo(s) added successfully.`,
      });
    } catch (error: any) {
      console.error('Photo upload error:', error);
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
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, idx) => idx !== index)
    }));
    toast({
      title: "Photo Removed",
      description: "Photo removed from briefing.",
    });
  };

  const handleGenerateAI = async () => {
    setAiGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-briefing-content', {
        body: {
          briefingType: formData.briefingType,
          briefingContext: {
            briefingTitle: formData.briefingTitle,
            briefingContent: formData.briefingContent,
            workScope: formData.workScope,
            environment: formData.environment,
            location: formData.location,
            teamSize: formData.teamSize,
            experienceLevel: formData.experienceLevel
          },
          hazards: {
            identified: formData.identifiedHazards,
            custom: formData.customHazards,
            riskLevel: formData.riskLevel,
            specialConsiderations: formData.specialConsiderations
          }
        }
      });

      if (error) throw error;
      
      setAiContent(data.content);

      // Flatten structured arrays back into text for editing
      const briefingDescriptionText = data.content.briefingOverview
        ?.map((p: any) => p.content)
        .join('\n\n') || data.content.briefingDescription || '';

      const hazardsText = data.content.hazardsAndControls
        ? Array.isArray(data.content.hazardsAndControls)
          ? data.content.hazardsAndControls.map((h: any) => {
              let text = `**Hazard ${h.hazardId}: ${h.hazardName}**\n`;
              text += `${h.description}\n`;
              text += `**Risk Level:** ${h.riskLevel}\n\n`;
              text += `**Control Measures:**\n`;
              text += h.controls.map((c: string) => `- ${c}`).join('\n');
              if (h.requiredPPE?.length > 0) {
                text += `\n\n**Required PPE:**\n`;
                text += h.requiredPPE.map((ppe: string) => `- ${ppe}`).join('\n');
              }
              return text;
            }).join('\n\n---\n\n')
          : data.content.hazardsAndControls
        : '';

      const safetyWarningText = data.content.safetyWarning?.headline 
        ? `**${data.content.safetyWarning.level}: ${data.content.safetyWarning.headline}**\n\n${data.content.safetyWarning.details.join('\n- ')}`
        : data.content.safetyWarning || '';

      const additionalInfoText = data.content.additionalInfo
        ? Array.isArray(data.content.additionalInfo)
          ? data.content.additionalInfo
              .map((info: any) => info.content)
              .join('\n\n')
          : data.content.additionalInfo
        : '';

      setFormData(prev => ({
        ...prev,
        briefingDescription: briefingDescriptionText,
        hazards: hazardsText,
        safetyWarning: safetyWarningText,
        additionalInfo: additionalInfoText,
      }));

      toast({
        title: "AI Content Generated",
        description: "Review and edit the AI-generated briefing content below.",
      });
    } catch (error: any) {
      console.error('AI generation error:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate briefing content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSave = async (asDraft = false) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

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
        location: formData.location,
        attendees: formData.attendees,
        completed: !asDraft,
        
        // Briefing fields
        briefing_type: formData.briefingType,
        job_name: formData.briefingTitle,
        contractor_company: formData.contractorCompany,
        conductor_name: formData.conductorName,
        work_scope: formData.workScope,
        environment_type: formData.environment,
        team_size: formData.teamSize,
        risk_level: formData.riskLevel,
        identified_hazards: formData.identifiedHazards,
        custom_hazards: formData.customHazards,
        special_considerations: formData.specialConsiderations,
        briefing_description: formData.briefingDescription,
        hazards: formData.hazards,
        safety_warning: formData.safetyWarning,
        notes: formData.additionalInfo,
        ai_generated: !!aiContent,
        ai_prompt_data: aiContent ? {
          briefingType: formData.briefingType,
          briefingContext: {
            briefingTitle: formData.briefingTitle,
            briefingContent: formData.briefingContent,
            workScope: formData.workScope,
            environment: formData.environment,
          },
          hazards: {
            identified: formData.identifiedHazards,
            custom: formData.customHazards,
            riskLevel: formData.riskLevel,
          },
          aiContent: aiContent  // Store FULL structured response
        } : null,
        photos: formData.photos,
        created_by_name: profile?.full_name || user.email,
      };

      let error;
      
      if (initialData?.id) {
        // Update existing briefing
        const { error: updateError } = await supabase
          .from('team_briefings')
          .update(briefingData)
          .eq('id', initialData.id);
        error = updateError;
      } else {
        // Insert new briefing
        const { error: insertError } = await supabase
          .from('team_briefings')
          .insert([briefingData]);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: initialData?.id ? "Briefing Updated" : (asDraft ? "Draft Saved" : "Briefing Created"),
        description: initialData?.id ? "Briefing updated successfully." : (asDraft ? "You can complete it later." : "Team briefing created successfully."),
      });

      // Clear auto-save data on successful save
      clearSavedData();

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Save error:', error);
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save briefing.",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-elec-light mb-2">Choose a Template</h2>
              <p className="text-sm text-elec-light/60">
                Start with a template or create from scratch
              </p>
            </div>
            <TemplateSelector
              onSelectTemplate={handleTemplateSelect}
              selectedType={formData.briefingType}
            />
            <Button
              variant="outline"
              className="w-full border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              onClick={() => setStep(1)}
            >
              Skip - Start from Scratch
            </Button>
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-elec-light">Briefing Type</Label>
              <MobileSelectWrapper
                label=""
                value={formData.briefingType}
                onValueChange={(v) => setFormData(prev => ({ ...prev, briefingType: v }))}
                options={[
                  { value: "site-work", label: "Site Work/Installation" },
                  { value: "lfe", label: "LFE - Lessons From Experience" },
                  { value: "hse-update", label: "HSE Update" },
                  { value: "business-update", label: "Business Update" },
                  { value: "safety-alert", label: "Safety Alert" },
                  { value: "regulatory", label: "Regulatory Change" },
                  { value: "general", label: "General Briefing" },
                ]}
              />
            </div>
            
            <MobileInputWrapper
              label={formData.briefingType === 'site-work' ? 'Job/Site Name' : 'Briefing Title'}
              value={formData.briefingTitle}
              onChange={(v) => setFormData(prev => ({ ...prev, briefingTitle: v }))}
              placeholder={
                formData.briefingType === 'site-work' 
                  ? 'e.g. Office Rewire - 123 High Street'
                  : formData.briefingType === 'lfe'
                  ? 'e.g. Arc Flash Incident - Manchester Office'
                  : formData.briefingType === 'hse-update'
                  ? 'e.g. New HSE Guidance on Working at Height'
                  : 'Enter briefing title'
              }
              icon={<FileText className="h-4 w-4" />}
              hint="A clear, descriptive title helps identify the briefing later"
            />

            <MobileInputWrapper
              label="Location"
              value={formData.location}
              onChange={(v) => setFormData(prev => ({ ...prev, location: v }))}
              placeholder="Full site address or meeting location"
              icon={<FileText className="h-4 w-4" />}
              hint="BS 7671 requires full site address for installation work"
            />

            <MobileInputWrapper
              label="Contractor Company"
              value={formData.contractorCompany}
              onChange={(v) => setFormData(prev => ({ ...prev, contractorCompany: v }))}
              placeholder="Your company name"
              icon={<FileText className="h-4 w-4" />}
            />

            <MobileInputWrapper
              label="Briefing Conductor"
              value={formData.conductorName}
              onChange={(v) => setFormData(prev => ({ ...prev, conductorName: v }))}
              placeholder="Who will conduct this briefing"
              icon={<Users className="h-4 w-4" />}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <MobileInputWrapper
                label="Date"
                type="date"
                value={formData.briefingDate}
                onChange={(v) => setFormData(prev => ({ ...prev, briefingDate: v }))}
              />

              <MobileInputWrapper
                label="Time"
                type="time"
                value={formData.briefingTime}
                onChange={(v) => setFormData(prev => ({ ...prev, briefingTime: v }))}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-elec-light">
                {formData.briefingType === 'site-work' ? 'Work Description' : 'Briefing Content'}
              </Label>
              <Textarea
                value={formData.briefingContent}
                onChange={(e) => setFormData(prev => ({ ...prev, briefingContent: e.target.value }))}
                placeholder={
                  formData.briefingType === 'site-work'
                    ? 'Describe the work to be carried out in detail...'
                    : formData.briefingType === 'lfe'
                    ? 'Describe the incident, what happened, and key learnings...'
                    : formData.briefingType === 'hse-update'
                    ? 'Describe the HSE update and its implications...'
                    : 'Describe the briefing content in detail...'
                }
                className="min-h-32 bg-card border-primary/30 text-elec-light resize-none"
                maxLength={500}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-elec-light/60">
                  {formData.briefingContent.length}/500 characters
                </p>
                {formData.briefingContent.length < 50 && (
                  <p className="text-xs text-elec-yellow/70">
                    Add {50 - formData.briefingContent.length} more for AI generation
                  </p>
                )}
              </div>
            </div>

            {formData.briefingType === 'site-work' && (
              <>
                <MobileSelectWrapper
                  label="Work Scope"
                  value={formData.workScope}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, workScope: v }))}
                  options={[
                    { value: "", label: "Select work type..." },
                    { value: "installation", label: "Installation" },
                    { value: "maintenance", label: "Maintenance" },
                    { value: "testing", label: "Testing & Inspection" },
                    { value: "repairs", label: "Repairs" },
                    { value: "upgrade", label: "Upgrade/Modification" },
                    { value: "emergency", label: "Emergency Work" },
                    { value: "commissioning", label: "Commissioning" },
                  ]}
                />

                <MobileSelectWrapper
                  label="Environment Type"
                  value={formData.environment}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, environment: v }))}
                  options={[
                    { value: "", label: "Select environment..." },
                    { value: "domestic", label: "Domestic Residence" },
                    { value: "commercial", label: "Commercial Building" },
                    { value: "industrial", label: "Industrial Facility" },
                    { value: "construction", label: "Construction Site" },
                    { value: "public", label: "Public Area" },
                    { value: "healthcare", label: "Healthcare Facility" },
                    { value: "education", label: "Educational Institution" },
                  ]}
                />
              </>
            )}

            <MobileInputWrapper
              label="Team Size"
              type="number"
              inputMode="numeric"
              value={formData.teamSize.toString()}
              onChange={(v) => {
                const parsed = parseInt(v);
                setFormData(prev => ({ 
                  ...prev, 
                  teamSize: v === '' ? 1 : Math.max(1, Math.min(20, isNaN(parsed) ? 1 : parsed))
                }));
              }}
              min="1"
              max="20"
              icon={<Users className="h-4 w-4" />}
            />

            <MobileSelectWrapper
              label="Team Experience Level"
              value={formData.experienceLevel}
              onValueChange={(v) => setFormData(prev => ({ ...prev, experienceLevel: v }))}
              options={[
                { value: "", label: "Select experience level..." },
                { value: "apprentice", label: "Apprentice Level" },
                { value: "qualified", label: "Qualified Electricians" },
                { value: "mixed", label: "Mixed Experience" },
                 { value: "senior", label: "Senior/Expert Team" },
               ]}
             />

            {/* Smart Validation */}
            <StepValidation step={step} formData={formData} />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-elec-yellow flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Hazards & Risk Assessment
            </h3>

            <div className="space-y-4">
              <Label className="text-elec-light">Quick Select Hazards</Label>
              <div className="grid grid-cols-2 gap-3">
                {HAZARD_CATEGORIES.map((hazard) => (
                  <div key={hazard.id} className="flex items-center space-x-2 bg-card/50 p-3 rounded-lg border border-primary/20">
                    <Checkbox
                      id={hazard.id}
                      checked={formData.identifiedHazards.includes(hazard.label)}
                      onCheckedChange={(checked) => {
                        setFormData(prev => ({
                          ...prev,
                          identifiedHazards: checked
                            ? [...prev.identifiedHazards, hazard.label]
                            : prev.identifiedHazards.filter(h => h !== hazard.label)
                        }));
                      }}
                    />
                    <label
                      htmlFor={hazard.id}
                      className="text-sm font-medium text-elec-light cursor-pointer"
                    >
                      {hazard.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-elec-light">Additional Custom Hazards</Label>
              <Textarea
                value={formData.customHazards}
                onChange={(e) => setFormData(prev => ({ ...prev, customHazards: e.target.value }))}
                placeholder="Describe any additional site-specific hazards..."
                className="h-24 bg-card border-primary/30 text-elec-light"
              />
            </div>

            {/* Risk Matrix Guide */}
            <div className="space-y-2">
              <Label className="text-elec-light">Overall Risk Level</Label>
              <RiskMatrixGuide
                selectedRiskLevel={formData.riskLevel}
                identifiedHazards={formData.identifiedHazards.map(h => 
                  HAZARD_CATEGORIES.find(cat => cat.label === h)?.id || ''
                )}
                onRiskLevelChange={(level) => setFormData(prev => ({ ...prev, riskLevel: level }))}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-elec-light">Special Safety Considerations</Label>
              <Textarea
                value={formData.specialConsiderations}
                onChange={(e) => setFormData(prev => ({ ...prev, specialConsiderations: e.target.value }))}
                placeholder="Any specific safety concerns, client requirements, or site conditions..."
                className="h-24 bg-card border-primary/30 text-elec-light"
              />
            </div>

            {/* Smart Validation */}
            <StepValidation step={step} formData={formData} />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-3 py-4">
              <Sparkles className="h-12 w-12 text-elec-yellow mx-auto" />
              <h3 className="text-lg font-semibold text-elec-light">Generate AI Content</h3>
              <p className="text-sm text-elec-light/70">
                Click below to generate BS 7671 compliant briefing content
              </p>
            </div>

            {!aiContent && !aiGenerating && (
              <Button
                onClick={handleGenerateAI}
                className="w-full h-12 bg-elec-yellow text-background font-semibold"
                disabled={!formData.briefingContent}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Generate with AI
              </Button>
            )}

            {aiGenerating && (
              <div className="text-center space-y-4 py-8">
                <Loader2 className="h-12 w-12 animate-spin text-elec-yellow mx-auto" />
                <p className="text-sm text-elec-light">Generating professional briefing content...</p>
              </div>
            )}

            {aiContent && (
              <div className="space-y-4">
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3">
                  <p className="text-sm text-elec-light">
                    ✅ AI content generated! Review and edit below.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-elec-light text-sm">Briefing Overview</Label>
                  <FormattedTextDisplay
                    value={formData.briefingDescription}
                    onChange={(value) => setFormData(prev => ({ ...prev, briefingDescription: value }))}
                    placeholder="Describe the work being carried out..."
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-elec-light text-sm">Hazards & Controls</Label>
                  <FormattedTextDisplay
                    value={formData.hazards}
                    onChange={(value) => setFormData(prev => ({ ...prev, hazards: value }))}
                    placeholder="List hazards and control measures..."
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-elec-light text-sm">Safety Warning</Label>
                  <FormattedTextDisplay
                    value={formData.safetyWarning}
                    onChange={(value) => setFormData(prev => ({ ...prev, safetyWarning: value }))}
                    placeholder="Any safety warnings or precautions..."
                  />
                </div>

                {formData.briefingType === 'general' && (
                  <div className="space-y-2">
                    <Label className="text-elec-light text-sm">Additional Information</Label>
                    <FormattedTextDisplay
                      value={formData.additionalInfo}
                      onChange={(value) => setFormData(prev => ({ ...prev, additionalInfo: value }))}
                      placeholder="Any additional relevant information..."
                    />
                  </div>
                )}

                <Button
                  onClick={handleGenerateAI}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  Regenerate Content
                </Button>

                {/* Smart Validation */}
                <StepValidation step={step} formData={formData} />
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-elec-light mb-3">Photo Upload (Optional)</h3>
            
            {/* Enhanced Photo Manager */}
            <EnhancedPhotoManager
              photos={formData.photos}
              onPhotosChange={(photos) => setFormData(prev => ({ ...prev, photos }))}
              onPhotoUpload={handlePhotoUpload}
              onDeletePhoto={handleDeletePhoto}
              uploadingPhotos={uploadingPhotos}
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-elec-light mb-3">Review & Complete</h3>
            
            <div className="bg-card/50 border border-primary/20 rounded-lg p-4 space-y-2.5">
              <div className="flex justify-between items-start gap-3">
                <span className="text-xs text-elec-light/70 flex-shrink-0">Briefing:</span>
                <span className="text-xs font-medium text-elec-light text-right">{formData.briefingTitle}</span>
              </div>
              <div className="flex justify-between items-start gap-3">
                <span className="text-xs text-elec-light/70 flex-shrink-0">Type:</span>
                <span className="text-xs font-medium text-elec-light text-right">
                  {formData.briefingType === 'site-work' ? 'Site Work' : 
                   formData.briefingType === 'lfe' ? 'LFE' :
                   formData.briefingType === 'hse-update' ? 'HSE Update' :
                   formData.briefingType === 'business-update' ? 'Business Update' :
                   formData.briefingType === 'safety-alert' ? 'Safety Alert' :
                   formData.briefingType === 'regulatory' ? 'Regulatory' : 'General'}
                </span>
              </div>
              <div className="flex justify-between items-start gap-3">
                <span className="text-xs text-elec-light/70 flex-shrink-0">Location:</span>
                <span className="text-xs font-medium text-elec-light text-right">{formData.location}</span>
              </div>
              <div className="flex justify-between items-start gap-3">
                <span className="text-xs text-elec-light/70 flex-shrink-0">Date & Time:</span>
                <span className="text-xs font-medium text-elec-light text-right">
                  {new Date(formData.briefingDate).toLocaleDateString('en-GB')} at {formData.briefingTime}
                </span>
              </div>
              <div className="flex justify-between items-start gap-3">
                <span className="text-xs text-elec-light/70 flex-shrink-0">Team Size:</span>
                <span className="text-xs font-medium text-elec-light text-right">{formData.teamSize} people</span>
              </div>
              <div className="flex justify-between items-start gap-3">
                <span className="text-xs text-elec-light/70 flex-shrink-0">Risk Level:</span>
                <span className={`text-xs font-bold text-right ${
                  formData.riskLevel === 'critical' ? 'text-destructive' :
                  formData.riskLevel === 'high' ? 'text-warning' : 'text-elec-yellow'
                }`}>
                  {formData.riskLevel.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-start gap-3">
                <span className="text-xs text-elec-light/70 flex-shrink-0">AI Generated:</span>
                <span className="text-xs font-medium text-elec-yellow text-right">
                  {aiContent ? 'Yes ✓' : 'No'}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <Button
                onClick={() => handleSave(false)}
                className="w-full h-11 bg-elec-yellow text-background font-semibold"
              >
                <FileText className="h-4 w-4 mr-2" />
                Complete Briefing
              </Button>

              <Button
                onClick={() => handleSave(true)}
                variant="outline"
                className="w-full h-11"
              >
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Restore Dialog */}
      {showRestoreDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-background border-primary/30">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Continue Previous Work?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-elec-light">
                We found unsaved work from a previous session. Would you like to continue where you left off?
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={handleRestoreSaved}
                  className="flex-1 bg-elec-yellow text-background"
                >
                  Restore
                </Button>
                <Button
                  onClick={handleDiscardSaved}
                  variant="outline"
                  className="flex-1"
                >
                  Start Fresh
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="w-full max-w-2xl mx-auto bg-background border-primary/30">
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-elec-yellow">AI-Powered Briefing Wizard</CardTitle>
              {!initialData && timeSinceLastSave && (
                <div className="flex items-center gap-2 text-xs text-elec-light/60">
                  <Clock className="h-3 w-3" />
                  <span>Saved {timeSinceLastSave}</span>
                </div>
              )}
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-elec-light/60">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            {hasUnsavedChanges && !initialData && (
              <Alert className="bg-elec-yellow/5 border-elec-yellow/20">
                <AlertCircle className="h-4 w-4 text-elec-yellow" />
                <AlertDescription className="text-xs text-elec-light/70">
                  Your progress is being auto-saved every 30 seconds
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {renderStep()}

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
            <div className="flex gap-3 flex-1">
              {step > 1 && (
                <Button
                  onClick={() => setStep(s => s - 1)}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              )}

              {step < totalSteps && (
                <Button
                  onClick={() => setStep(s => s + 1)}
                  className="flex-1 bg-elec-yellow text-background"
                  disabled={
                    (step === 1 && (!formData.briefingTitle || !formData.location || !formData.conductorName)) ||
                    (step === 2 && !formData.briefingContent) ||
                    (step === 4 && !aiContent)
                  }
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
            
            <div className="flex gap-3">
              {!initialData && (
                <Button
                  onClick={manualSave}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Progress
                </Button>
              )}
              
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="w-full sm:w-auto"
              >
                Close
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
