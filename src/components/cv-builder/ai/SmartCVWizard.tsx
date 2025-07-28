
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Wand2, Loader2, Plus, Target, User, Briefcase } from "lucide-react";
import { CVData } from "../types";
import { AIService } from "./AIService";
import { toast } from "@/hooks/use-toast";

interface SmartCVWizardProps {
  onCVGenerated: (cvData: CVData) => void;
  onClose: () => void;
}

interface WizardStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const wizardSteps: WizardStep[] = [
  {
    id: 'target',
    title: 'Target Role',
    description: 'What electrical position are you targeting?',
    icon: <Target className="h-5 w-5" />
  },
  {
    id: 'profile',
    title: 'Your Profile',
    description: 'Tell us about your background',
    icon: <User className="h-5 w-5" />
  },
  {
    id: 'experience',
    title: 'Experience',
    description: 'Your electrical work history',
    icon: <Briefcase className="h-5 w-5" />
  }
];

export const SmartCVWizard: React.FC<SmartCVWizardProps> = ({ onCVGenerated, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [wizardData, setWizardData] = useState({
    targetRole: '',
    experienceLevel: '',
    currentRole: '',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      postcode: ''
    },
    workHistory: [] as Array<{
      jobTitle: string;
      company: string;
      duration: string;
      description: string;
    }>,
    skills: [] as string[],
    additionalContext: ''
  });

  const electricalRoles = [
    'Electrician', 'Electrical Apprentice', 'Senior Electrician', 'Electrical Supervisor',
    'Electrical Engineer', 'Electrical Foreman', 'Electrical Inspector', 'Installation Electrician',
    'Maintenance Electrician', 'Industrial Electrician', 'Commercial Electrician', 'Domestic Electrician'
  ];

  const experienceLevels = [
    'Entry Level (0-2 years)', 'Intermediate (2-5 years)', 
    'Experienced (5-10 years)', 'Senior (10+ years)'
  ];

  const handleStepComplete = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateCV();
    }
  };

  const generateCV = async () => {
    setIsGenerating(true);
    try {
      const context = {
        targetRole: wizardData.targetRole,
        experience: wizardData.experienceLevel,
        personalInfo: wizardData.personalInfo,
        previousRoles: wizardData.workHistory,
        skills: wizardData.skills
      };

      // Generate professional summary
      const professionalSummary = await AIService.generateProfessionalSummary(context, wizardData.additionalContext);
      
      // Generate skills if none provided
      let skills = wizardData.skills;
      if (skills.length === 0) {
        skills = await AIService.generateSkills(context);
      }

      // Enhance work history descriptions
      const enhancedExperience = await Promise.all(
        wizardData.workHistory.map(async (job) => {
          const enhancedDescription = await AIService.generateJobDescription(
            job.jobTitle, 
            job.company, 
            job.description || wizardData.additionalContext
          );
          return {
            id: Date.now().toString() + Math.random(),
            jobTitle: job.jobTitle,
            company: job.company,
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: enhancedDescription
          };
        })
      );

      const generatedCV: CVData = {
        personalInfo: {
          ...wizardData.personalInfo,
          professionalSummary
        },
        experience: enhancedExperience,
        education: [],
        skills,
        certifications: []
      };

      onCVGenerated(generatedCV);
      toast({
        title: "CV Generated Successfully",
        description: "Your AI-powered CV has been created with industry-specific content."
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your CV. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const addWorkExperience = () => {
    setWizardData(prev => ({
      ...prev,
      workHistory: [...prev.workHistory, {
        jobTitle: '',
        company: '',
        duration: '',
        description: ''
      }]
    }));
  };

  const updateWorkExperience = (index: number, field: string, value: string) => {
    setWizardData(prev => ({
      ...prev,
      workHistory: prev.workHistory.map((job, i) => 
        i === index ? { ...job, [field]: value } : job
      )
    }));
  };

  const renderStepContent = () => {
    const step = wizardSteps[currentStep];

    switch (step.id) {
      case 'target':
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                Target Role *
              </label>
              <Select value={wizardData.targetRole} onValueChange={(value) => 
                setWizardData(prev => ({ ...prev, targetRole: value }))
              }>
                <SelectTrigger className="w-full h-12 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200">
                  <SelectValue placeholder="Select your target role" />
                </SelectTrigger>
                <SelectContent className="bg-elec-card border-elec-gray/40">
                  {electricalRoles.map(role => (
                    <SelectItem key={role} value={role} className="text-elec-light hover:bg-elec-yellow/10">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-elec-light/70 flex items-center gap-1">
                <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
                Choose the electrical role you're applying for
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                Experience Level *
              </label>
              <Select value={wizardData.experienceLevel} onValueChange={(value) => 
                setWizardData(prev => ({ ...prev, experienceLevel: value }))
              }>
                <SelectTrigger className="w-full h-12 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent className="bg-elec-card border-elec-gray/40">
                  {experienceLevels.map(level => (
                    <SelectItem key={level} value={level} className="text-elec-light hover:bg-elec-yellow/10">
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-elec-light/70 flex items-center gap-1">
                <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
                Select your current experience level
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                Additional Context
              </label>
              <Textarea
                value={wizardData.additionalContext}
                onChange={(e) => setWizardData(prev => ({ ...prev, additionalContext: e.target.value }))}
                className="w-full h-32 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium p-4 resize-none"
                placeholder="Any specific requirements, industries, or details you'd like to highlight..."
                rows={4}
              />
              <p className="text-xs text-elec-light/70 flex items-center gap-1">
                <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
                Optional: Add specific requirements or industry focus
              </p>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                Full Name *
              </label>
              <input
                type="text"
                value={wizardData.personalInfo.fullName}
                onChange={(e) => setWizardData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                }))}
                className="w-full h-12 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium px-4"
                placeholder="Enter your full name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                  <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                  Email *
                </label>
                <input
                  type="email"
                  value={wizardData.personalInfo.email}
                  onChange={(e) => setWizardData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, email: e.target.value }
                  }))}
                  className="w-full h-12 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium px-4"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                  <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                  Phone
                </label>
                <input
                  type="tel"
                  value={wizardData.personalInfo.phone}
                  onChange={(e) => setWizardData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, phone: e.target.value }
                  }))}
                  className="w-full h-12 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium px-4"
                  placeholder="07700 123456"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                Address
              </label>
              <input
                type="text"
                value={wizardData.personalInfo.address}
                onChange={(e) => setWizardData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, address: e.target.value }
                }))}
                className="w-full h-12 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium px-4"
                placeholder="123 High Street, City"
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                Postcode
              </label>
              <input
                type="text"
                value={wizardData.personalInfo.postcode}
                onChange={(e) => setWizardData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, postcode: e.target.value }
                }))}
                className="w-full h-12 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium px-4"
                placeholder="SW1A 1AA"
              />
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-elec-light">Work Experience</h4>
              <Button
                onClick={addWorkExperience}
                variant="outline"
                size="sm"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </div>

            {wizardData.workHistory.map((job, index) => (
              <div key={index} className="p-4 bg-elec-card border-2 border-elec-gray/50 rounded-xl">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                        <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={job.jobTitle}
                        onChange={(e) => updateWorkExperience(index, 'jobTitle', e.target.value)}
                        className="w-full h-12 bg-elec-gray border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium px-4"
                        placeholder="e.g. Electrical Apprentice"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                        <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                        Company
                      </label>
                      <input
                        type="text"
                        value={job.company}
                        onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                        className="w-full h-12 bg-elec-gray border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium px-4"
                        placeholder="e.g. ABC Electrical Ltd"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                      <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                      Duration
                    </label>
                    <input
                      type="text"
                      value={job.duration}
                      onChange={(e) => updateWorkExperience(index, 'duration', e.target.value)}
                      className="w-full h-12 bg-elec-gray border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium px-4"
                      placeholder="e.g. 2 years, Jan 2020 - Present"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                      <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                      Brief Description (Optional)
                    </label>
                    <textarea
                      value={job.description}
                      onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                      className="w-full h-24 bg-elec-gray border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium p-4 resize-none"
                      placeholder="Brief overview - AI will enhance this with industry-specific details"
                      rows={3}
                    />
                    <p className="text-xs text-elec-light/70 flex items-center gap-1">
                      <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
                      AI will enhance this with electrical terminology and achievements
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {wizardData.workHistory.length === 0 && (
              <div className="text-center py-8 bg-elec-card/50 rounded-xl border-2 border-dashed border-elec-yellow/20">
                <p className="text-elec-light/60 mb-4">No work experience added yet</p>
                <Button
                  onClick={addWorkExperience}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Role
                </Button>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (wizardSteps[currentStep].id) {
      case 'target':
        return wizardData.targetRole && wizardData.experienceLevel;
      case 'profile':
        return wizardData.personalInfo.fullName && wizardData.personalInfo.email;
      case 'experience':
        return true; // Experience is optional
      default:
        return true;
    }
  };

  return (
    <div className="max-h-full overflow-y-auto p-6">
      <div className="bg-elec-gray border-2 border-elec-gray/40 rounded-xl max-w-4xl mx-auto">
        <div className="p-6 bg-elec-gray">
          <div className="flex items-center gap-3">
            <Wand2 className="h-6 w-6 text-elec-yellow" />
            <div>
              <h1 className="text-xl font-semibold text-elec-light">Smart CV Wizard</h1>
              <p className="text-elec-light/60 text-sm">AI-powered CV generation for electrical professionals</p>
            </div>
          </div>
          
          {/* Step indicator */}
          <div className="flex items-center gap-2 mt-4">
            {wizardSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  index === currentStep 
                    ? 'bg-elec-yellow text-black' 
                    : index < currentStep 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-elec-card text-elec-light/60'
                }`}>
                  {step.icon}
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
                {index < wizardSteps.length - 1 && (
                  <div className="w-8 h-px bg-elec-gray/60 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 p-6 bg-elec-gray">
          <div>
            <h3 className="text-lg font-semibold text-elec-light mb-2">
              {wizardSteps[currentStep].title}
            </h3>
            <p className="text-elec-light/60 text-sm mb-6">
              {wizardSteps[currentStep].description}
            </p>
          </div>

        {renderStepContent()}

          <div className="flex justify-between pt-6 border-t border-elec-gray/20">
            <Button
              onClick={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : onClose()}
              variant="outline"
              className="border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10"
            >
              {currentStep > 0 ? 'Back' : 'Cancel'}
            </Button>

            <Button
              onClick={handleStepComplete}
              disabled={!isStepValid() || isGenerating}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating CV...
                </>
              ) : currentStep === wizardSteps.length - 1 ? (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate My CV
                </>
              ) : (
                'Next'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
