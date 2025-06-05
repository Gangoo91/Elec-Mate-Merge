
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
            <div>
              <Label htmlFor="targetRole" className="text-white">Target Role *</Label>
              <Select value={wizardData.targetRole} onValueChange={(value) => 
                setWizardData(prev => ({ ...prev, targetRole: value }))
              }>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
                  <SelectValue placeholder="Select your target role" />
                </SelectTrigger>
                <SelectContent>
                  {electricalRoles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="experienceLevel" className="text-white">Experience Level *</Label>
              <Select value={wizardData.experienceLevel} onValueChange={(value) => 
                setWizardData(prev => ({ ...prev, experienceLevel: value }))
              }>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="additionalContext" className="text-white">Additional Context</Label>
              <Textarea
                id="additionalContext"
                value={wizardData.additionalContext}
                onChange={(e) => setWizardData(prev => ({ ...prev, additionalContext: e.target.value }))}
                className="bg-elec-dark border-elec-yellow/20 text-white"
                placeholder="Any specific requirements, industries, or details you'd like to highlight..."
              />
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName" className="text-white">Full Name *</Label>
                <Input
                  id="fullName"
                  value={wizardData.personalInfo.fullName}
                  onChange={(e) => setWizardData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                  }))}
                  className="bg-elec-dark border-elec-yellow/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={wizardData.personalInfo.email}
                  onChange={(e) => setWizardData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, email: e.target.value }
                  }))}
                  className="bg-elec-dark border-elec-yellow/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-white">Phone</Label>
                <Input
                  id="phone"
                  value={wizardData.personalInfo.phone}
                  onChange={(e) => setWizardData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, phone: e.target.value }
                  }))}
                  className="bg-elec-dark border-elec-yellow/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="postcode" className="text-white">Postcode</Label>
                <Input
                  id="postcode"
                  value={wizardData.personalInfo.postcode}
                  onChange={(e) => setWizardData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, postcode: e.target.value }
                  }))}
                  className="bg-elec-dark border-elec-yellow/20 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address" className="text-white">Address</Label>
              <Input
                id="address"
                value={wizardData.personalInfo.address}
                onChange={(e) => setWizardData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, address: e.target.value }
                }))}
                className="bg-elec-dark border-elec-yellow/20 text-white"
              />
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white">Work Experience</h4>
              <Button
                onClick={addWorkExperience}
                variant="outline"
                size="sm"
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </div>

            {wizardData.workHistory.map((job, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Job Title</Label>
                      <Input
                        value={job.jobTitle}
                        onChange={(e) => updateWorkExperience(index, 'jobTitle', e.target.value)}
                        className="bg-elec-dark border-elec-yellow/20 text-white"
                        placeholder="e.g. Electrical Apprentice"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Company</Label>
                      <Input
                        value={job.company}
                        onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                        className="bg-elec-dark border-elec-yellow/20 text-white"
                        placeholder="e.g. ABC Electrical Ltd"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Duration</Label>
                    <Input
                      value={job.duration}
                      onChange={(e) => updateWorkExperience(index, 'duration', e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20 text-white"
                      placeholder="e.g. 2 years, Jan 2020 - Present"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Brief Description (Optional)</Label>
                    <Textarea
                      value={job.description}
                      onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20 text-white"
                      placeholder="Brief overview - AI will enhance this with industry-specific details"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            {wizardData.workHistory.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No work experience added yet</p>
                <Button
                  onClick={addWorkExperience}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
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
    <Card className="border-elec-yellow/20 bg-elec-dark max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Wand2 className="h-6 w-6 text-elec-yellow" />
          <div>
            <CardTitle className="text-xl text-white">Smart CV Wizard</CardTitle>
            <p className="text-gray-400 text-sm">AI-powered CV generation for electrical professionals</p>
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
                    : 'bg-gray-700 text-gray-400'
              }`}>
                {step.icon}
                <span className="text-sm font-medium">{step.title}</span>
              </div>
              {index < wizardSteps.length - 1 && (
                <div className="w-8 h-px bg-gray-600 mx-2" />
              )}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {wizardSteps[currentStep].title}
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            {wizardSteps[currentStep].description}
          </p>
        </div>

        {renderStepContent()}

        <div className="flex justify-between pt-6">
          <Button
            onClick={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : onClose()}
            variant="outline"
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            {currentStep > 0 ? 'Back' : 'Cancel'}
          </Button>

          <Button
            onClick={handleStepComplete}
            disabled={!isStepValid() || isGenerating}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
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
      </CardContent>
    </Card>
  );
};
