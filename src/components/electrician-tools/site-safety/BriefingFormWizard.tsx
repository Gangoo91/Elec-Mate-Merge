import { useState } from "react";
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
  onClose: () => void;
  onSuccess: () => void;
}

export const BriefingFormWizard = ({ onClose, onSuccess }: BriefingFormWizardProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiContent, setAiContent] = useState<any>(null);

  // Form data
  const [formData, setFormData] = useState({
    // Step 2: Basic Info
    jobName: "",
    location: "",
    contractorCompany: "",
    conductorName: "",
    briefingDate: new Date().toISOString().split('T')[0],
    briefingTime: "09:00",
    
    // Step 3: Job Context
    jobDescription: "",
    workScope: "",
    environment: "",
    teamSize: 4,
    experienceLevel: "",
    
    // Step 4: Hazards
    identifiedHazards: [] as string[],
    customHazards: "",
    riskLevel: "medium",
    specialConsiderations: "",
    
    // Step 5: AI Generated (will be populated)
    briefingDescription: "",
    hazards: "",
    safetyWarning: "",
    
    // Step 6: Attendees & Photos
    attendees: [] as any[],
    photos: [] as any[],
  });

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const handleGenerateAI = async () => {
    setAiGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-briefing-content', {
        body: {
          jobContext: {
            jobName: formData.jobName,
            jobDescription: formData.jobDescription,
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
        briefing_name: formData.jobName,
        briefing_date: formData.briefingDate,
        briefing_time: formData.briefingTime,
        location: formData.location,
        notes: formData.briefingDescription,
        attendees: formData.attendees,
        completed: !asDraft,
        status: asDraft ? 'draft' : 'completed',
        
        // New fields
        job_name: formData.jobName,
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
          jobContext: {
            jobName: formData.jobName,
            jobDescription: formData.jobDescription,
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

      const { error } = await supabase
        .from('team_briefings')
        .insert([briefingData]);

      if (error) throw error;

      toast({
        title: asDraft ? "Draft Saved" : "Briefing Created",
        description: asDraft ? "You can complete it later." : "Team briefing created successfully.",
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
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-3 pb-6 border-b border-border">
              <h3 className="text-xl font-bold text-elec-yellow">Create AI-Powered Briefing</h3>
              <p className="text-elec-light/70 text-sm">
                Generate professional BS 7671 compliant team briefings with AI assistance
              </p>
            </div>
            
            <MobileInputWrapper
              label="Job/Site Name"
              value={formData.jobName}
              onChange={(v) => setFormData(prev => ({ ...prev, jobName: v }))}
              placeholder="e.g. Office Rewire - 123 High Street"
              icon={<FileText className="h-4 w-4" />}
            />

            <MobileInputWrapper
              label="Location"
              value={formData.location}
              onChange={(v) => setFormData(prev => ({ ...prev, location: v }))}
              placeholder="Full site address"
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

            <div className="grid grid-cols-2 gap-4">
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
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-elec-yellow flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Job Context for AI Generation
            </h3>

            <div className="space-y-2">
              <Label className="text-elec-light">Job Description</Label>
              <Textarea
                value={formData.jobDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, jobDescription: e.target.value }))}
                placeholder="Describe the work to be carried out in detail..."
                className="h-32 bg-card border-primary/30 text-elec-light"
                maxLength={500}
              />
              <p className="text-xs text-elec-light/60">{formData.jobDescription.length}/500 characters</p>
            </div>

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
            <div className="text-center space-y-4 pb-6 border-b border-border">
              <Sparkles className="h-12 w-12 text-elec-yellow mx-auto" />
              <h3 className="text-lg font-bold text-elec-yellow">Generate AI Briefing Content</h3>
              <p className="text-sm text-elec-light/70">
                Click below to generate BS 7671 compliant briefing content based on your inputs
              </p>
            </div>

            {!aiContent && !aiGenerating && (
              <Button
                onClick={handleGenerateAI}
                className="w-full h-14 bg-gradient-to-r from-elec-yellow to-elec-yellow/80 text-background font-bold text-lg"
                disabled={!formData.jobDescription || !formData.workScope || !formData.environment}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Briefing with AI
              </Button>
            )}

            {aiGenerating && (
              <div className="text-center space-y-4 py-12">
                <Loader2 className="h-12 w-12 animate-spin text-elec-yellow mx-auto" />
                <p className="text-elec-light">Analyzing job requirements and generating briefing...</p>
              </div>
            )}

            {aiContent && (
              <div className="space-y-6">
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                  <p className="text-sm text-elec-light">
                    ✅ AI content generated! Review and edit below, then continue to save.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-elec-light">Briefing Description</Label>
                  <Textarea
                    value={formData.briefingDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, briefingDescription: e.target.value }))}
                    className="h-40 bg-card border-primary/30 text-elec-light"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-elec-light">Hazards & Controls</Label>
                  <Textarea
                    value={formData.hazards}
                    onChange={(e) => setFormData(prev => ({ ...prev, hazards: e.target.value }))}
                    className="h-40 bg-card border-primary/30 text-elec-light"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-elec-light">Safety Warning</Label>
                  <Textarea
                    value={formData.safetyWarning}
                    onChange={(e) => setFormData(prev => ({ ...prev, safetyWarning: e.target.value }))}
                    className="h-20 bg-card border-primary/30 text-elec-light"
                  />
                </div>

                <Button
                  onClick={handleGenerateAI}
                  variant="outline"
                  className="w-full"
                >
                  Regenerate Content
                </Button>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-elec-yellow">Review & Complete</h3>
            
            <div className="bg-card/50 border border-primary/20 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-elec-light/70">Job Name:</span>
                <span className="text-sm font-medium text-elec-light">{formData.jobName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-elec-light/70">Location:</span>
                <span className="text-sm font-medium text-elec-light">{formData.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-elec-light/70">Date & Time:</span>
                <span className="text-sm font-medium text-elec-light">
                  {new Date(formData.briefingDate).toLocaleDateString('en-GB')} at {formData.briefingTime}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-elec-light/70">Team Size:</span>
                <span className="text-sm font-medium text-elec-light">{formData.teamSize} electricians</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-elec-light/70">Risk Level:</span>
                <span className={`text-sm font-bold ${
                  formData.riskLevel === 'critical' ? 'text-destructive' :
                  formData.riskLevel === 'high' ? 'text-warning' : 'text-elec-yellow'
                }`}>
                  {formData.riskLevel.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-elec-light/70">AI Generated:</span>
                <span className="text-sm font-medium text-elec-yellow">
                  {aiContent ? 'Yes ✓' : 'No'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => handleSave(false)}
                className="w-full h-12 bg-elec-yellow text-background font-bold"
              >
                <FileText className="h-4 w-4 mr-2" />
                Save & Complete Briefing
              </Button>

              <Button
                onClick={() => handleSave(true)}
                variant="outline"
                className="w-full h-12"
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

        <div className="flex gap-3 pt-6 border-t border-border">
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
                (step === 1 && (!formData.jobName || !formData.location || !formData.conductorName)) ||
                (step === 2 && (!formData.jobDescription || !formData.workScope || !formData.environment)) ||
                (step === 4 && !aiContent)
              }
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}

          <Button
            onClick={onClose}
            variant="ghost"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
