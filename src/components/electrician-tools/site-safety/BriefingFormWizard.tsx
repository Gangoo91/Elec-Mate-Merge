import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight, Sparkles, Save, FileText, Users, AlertTriangle, Camera, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { TemplateSelector } from "./briefing-templates/TemplateSelector";

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

interface BriefingFormWizardProps {
  initialData?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const BriefingFormWizard = ({ initialData, onClose, onSuccess }: BriefingFormWizardProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(0); // Start at 0 for template selection
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiContent, setAiContent] = useState<any>(null);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(!initialData);

  // Form data - pre-populate if editing
  const [formData, setFormData] = useState({
    // Step 1: Briefing Type & Basic Info
    briefingType: initialData?.briefing_type || "site-work",
    briefingTitle: initialData?.briefing_name || initialData?.title || "",
    location: initialData?.location || "",
    contractorCompany: initialData?.contractor_company || "",
    conductorName: initialData?.conductor_name || "",
    briefingDate: initialData?.briefing_date || new Date().toISOString().split('T')[0],
    briefingTime: initialData?.briefing_time || "09:00",
    
    // Step 2: Content Details
    briefingContent: initialData?.briefing_content || "",
    workScope: initialData?.work_scope || "",
    environment: initialData?.environment || "",
    teamSize: initialData?.team_size || 4,
    experienceLevel: initialData?.experience_level || "",
    
    // Step 3: Hazards
    identifiedHazards: initialData?.identified_hazards || [] as string[],
    customHazards: initialData?.custom_hazards || "",
    riskLevel: initialData?.risk_level || "medium",
    specialConsiderations: initialData?.special_considerations || "",
    
    // Step 4: AI Generated (will be populated)
    briefingDescription: initialData?.briefing_description || "",
    hazards: initialData?.hazards || "",
    safetyWarning: initialData?.safety_warning || "",
    
    // Step 5: Photos
    photos: initialData?.photos || [] as any[],
    
    // Step 6: Review & Attendees
    attendees: initialData?.attendees || [] as any[],
  });

  const totalSteps = 7; // Including template selection
  const progress = (step / totalSteps) * 100;

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
      setFormData(prev => ({
        ...prev,
        briefingDescription: data.content.briefingDescription,
        hazards: data.content.hazardsAndControls,
        safetyWarning: data.content.safetyWarning,
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
        notes: formData.briefingDescription,
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
          aiContent: aiContent
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
            />

            <MobileInputWrapper
              label="Location"
              value={formData.location}
              onChange={(v) => setFormData(prev => ({ ...prev, location: v }))}
              placeholder="Full site address or meeting location"
              icon={<FileText className="h-4 w-4" />}
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
              <p className="text-xs text-elec-light/60">{formData.briefingContent.length}/500 characters</p>
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
              onChange={(v) => setFormData(prev => ({ ...prev, teamSize: parseInt(v) || 2 }))}
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

            <MobileSelectWrapper
              label="Overall Risk Level"
              value={formData.riskLevel}
              onValueChange={(v) => setFormData(prev => ({ ...prev, riskLevel: v }))}
              options={[
                { value: "low", label: "Low Risk" },
                { value: "medium", label: "Medium Risk" },
                { value: "high", label: "High Risk" },
                { value: "critical", label: "Critical Risk" },
              ]}
            />

            <div className="space-y-2">
              <Label className="text-elec-light">Special Safety Considerations</Label>
              <Textarea
                value={formData.specialConsiderations}
                onChange={(e) => setFormData(prev => ({ ...prev, specialConsiderations: e.target.value }))}
                placeholder="Any specific safety concerns, client requirements, or site conditions..."
                className="h-24 bg-card border-primary/30 text-elec-light"
              />
            </div>
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
                  <Textarea
                    value={formData.briefingDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, briefingDescription: e.target.value }))}
                    className="min-h-32 bg-card border-primary/30 text-elec-light text-sm resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-elec-light text-sm">Hazards & Controls</Label>
                  <Textarea
                    value={formData.hazards}
                    onChange={(e) => setFormData(prev => ({ ...prev, hazards: e.target.value }))}
                    className="min-h-32 bg-card border-primary/30 text-elec-light text-sm resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-elec-light text-sm">Safety Warning</Label>
                  <Textarea
                    value={formData.safetyWarning}
                    onChange={(e) => setFormData(prev => ({ ...prev, safetyWarning: e.target.value }))}
                    className="min-h-20 bg-card border-primary/30 text-elec-light text-sm resize-none"
                  />
                </div>

                <Button
                  onClick={handleGenerateAI}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  Regenerate Content
                </Button>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-elec-light mb-3">Photo Upload (Optional)</h3>
            
            <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center space-y-3">
              <Camera className="h-10 w-10 text-elec-yellow mx-auto" />
              <div className="space-y-1">
                <p className="text-sm text-elec-light">Add photos to your briefing</p>
                <p className="text-xs text-elec-light/60">Upload reference photos, site conditions, or incident images</p>
              </div>
              <input
                type="file"
                id="photo-upload"
                className="hidden"
                accept="image/*"
                multiple
                capture="environment"
                onChange={handlePhotoUpload}
                disabled={uploadingPhotos}
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => document.getElementById('photo-upload')?.click()}
                disabled={uploadingPhotos}
              >
                {uploadingPhotos ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photos
                  </>
                )}
              </Button>
            </div>

            {formData.photos.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs text-elec-light/70">{formData.photos.length} photo(s) attached</p>
                <div className="grid grid-cols-2 gap-3">
                  {formData.photos.map((photo, idx) => (
                    <div key={idx} className="relative aspect-video bg-card rounded-lg overflow-hidden border border-primary/20 group">
                      <img src={photo.url} alt={photo.caption || `Photo ${idx + 1}`} className="w-full h-full object-cover" />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeletePhoto(idx)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
    <Card className="w-full max-w-2xl mx-auto bg-background border-primary/30">
      <CardHeader>
        <div className="space-y-4">
          <CardTitle className="text-elec-yellow">AI-Powered Briefing Wizard</CardTitle>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-elec-light/60">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
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
          
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full sm:w-auto"
          >
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
