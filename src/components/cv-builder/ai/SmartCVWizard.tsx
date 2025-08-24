
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Wrench,
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  X,
  Plus
} from "lucide-react";
import { CVData, WorkExperience, Education } from "../types";
import { toast } from "@/hooks/use-toast";

export interface SmartCVWizardProps {
  onCVGenerated: (cvData: CVData) => void;
  onClose: () => void;
}

interface WizardData {
  targetRole: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    postcode: string;
    professionalSummary: string;
  };
  experience: string[];
  education: string[];
  skills: string[];
}

const wizardSteps = [
  { id: 'target', title: 'Target Role', icon: Briefcase },
  { id: 'profile', title: 'Profile', icon: User },
  { id: 'qualifications', title: 'Qualifications', icon: GraduationCap },
  { id: 'skills', title: 'Skills', icon: Wrench },
  { id: 'experience', title: 'Experience', icon: Briefcase }
];

const SmartCVWizard: React.FC<SmartCVWizardProps> = ({ onCVGenerated, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardData, setWizardData] = useState<WizardData>({
    targetRole: "",
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      postcode: "",
      professionalSummary: ""
    },
    experience: [],
    education: [],
    skills: []
  });

  const addExperience = (experience: string) => {
    if (experience.trim() && !wizardData.experience.includes(experience.trim())) {
      setWizardData(prev => ({
        ...prev,
        experience: [...prev.experience, experience.trim()]
      }));
    }
  };

  const removeExperience = (experienceToRemove: string) => {
    setWizardData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp !== experienceToRemove)
    }));
  };

  const addEducation = (education: string) => {
    if (education.trim() && !wizardData.education.includes(education.trim())) {
      setWizardData(prev => ({
        ...prev,
        education: [...prev.education, education.trim()]
      }));
    }
  };

  const removeEducation = (educationToRemove: string) => {
    setWizardData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu !== educationToRemove)
    }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !wizardData.skills.includes(skill.trim())) {
      setWizardData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setWizardData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const generateCVFromWizard = async (): Promise<CVData> => {
    // Convert wizard data to proper CV format
    const generatedExperience: WorkExperience[] = wizardData.experience.map((exp, index) => ({
      id: `exp-${index}`,
      jobTitle: exp,
      company: "Company Name",
      location: "Location",
      startDate: "2020",
      endDate: "2023",
      current: false,
      description: `Experience in ${exp}`
    }));

    const generatedEducation: Education[] = wizardData.education.map((edu, index) => ({
      id: `edu-${index}`,
      qualification: edu,
      institution: "Institution Name",
      location: "Location",
      startDate: "2018",
      endDate: "2020",
      current: false
    }));

    return {
      personalInfo: wizardData.personalInfo,
      experience: generatedExperience,
      education: generatedEducation,
      skills: wizardData.skills,
      certifications: []
    };
  };

  const handleFinish = async () => {
    try {
      const generatedCV = await generateCVFromWizard();
      onCVGenerated(generatedCV);
      toast({
        title: "CV Generated",
        description: "Your professional CV has been created successfully!"
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate CV. Please try again.",
        variant: "destructive"
      });
    }
  };

  const isStepValid = () => {
    switch (wizardSteps[currentStep].id) {
      case 'target':
        return wizardData.targetRole.trim().length > 0;
      case 'profile':
        return wizardData.personalInfo.fullName.trim().length > 0;
      case 'qualifications':
        return wizardData.education.length > 0;
      case 'skills':
        return true; // Skills are optional
      case 'experience':
        return wizardData.experience.length > 0;
      default:
        return false;
    }
  };

  const getSuggestedSkills = () => {
    const baseSkills = [
      "Electrical Installation",
      "Wiring & Circuits", 
      "Health & Safety",
      "Testing & Inspection",
      "Fault Finding",
      "Consumer Units",
      "Emergency Lighting",
      "Fire Alarm Systems",
      "CCTV Installation",
      "Data Cabling",
      "Solar Panel Installation",
      "Electric Vehicle Charging",
      "Smart Home Systems",
      "Industrial Maintenance",
      "Motor Control",
      "PLC Programming",
      "Electrical Design",
      "Project Management"
    ];

    // Filter out already selected skills
    return baseSkills.filter(skill => !wizardData.skills.includes(skill));
  };

  const renderStepContent = () => {
    switch (wizardSteps[currentStep].id) {
      case 'target':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-elec-light mb-2 block">
                What electrical position are you targeting?
              </label>
              <Input
                value={wizardData.targetRole}
                onChange={(e) => setWizardData(prev => ({ ...prev, targetRole: e.target.value }))}
                placeholder="e.g., Qualified Electrician, Electrical Supervisor, Apprentice Electrician"
                className="w-full bg-elec-gray border-elec-yellow/20"
              />
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-elec-light mb-2 block">Full Name</label>
                <Input
                  value={wizardData.personalInfo.fullName}
                  onChange={(e) => setWizardData(prev => ({ 
                    ...prev, 
                    personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                  }))}
                  placeholder="Your full name"
                  className="bg-elec-gray border-elec-yellow/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-elec-light mb-2 block">Email</label>
                <Input
                  type="email"
                  value={wizardData.personalInfo.email}
                  onChange={(e) => setWizardData(prev => ({ 
                    ...prev, 
                    personalInfo: { ...prev.personalInfo, email: e.target.value }
                  }))}
                  placeholder="your.email@example.com"
                  className="bg-elec-gray border-elec-yellow/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-elec-light mb-2 block">Phone</label>
                <Input
                  value={wizardData.personalInfo.phone}
                  onChange={(e) => setWizardData(prev => ({ 
                    ...prev, 
                    personalInfo: { ...prev.personalInfo, phone: e.target.value }
                  }))}
                  placeholder="Your phone number"
                  className="bg-elec-gray border-elec-yellow/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-elec-light mb-2 block">Postcode</label>
                <Input
                  value={wizardData.personalInfo.postcode}
                  onChange={(e) => setWizardData(prev => ({ 
                    ...prev, 
                    personalInfo: { ...prev.personalInfo, postcode: e.target.value }
                  }))}
                  placeholder="Your postcode"
                  className="bg-elec-gray border-elec-yellow/20"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-elec-light mb-2 block">Address</label>
              <Input
                value={wizardData.personalInfo.address}
                onChange={(e) => setWizardData(prev => ({ 
                  ...prev, 
                  personalInfo: { ...prev.personalInfo, address: e.target.value }
                }))}
                placeholder="Your full address"
                className="bg-elec-gray border-elec-yellow/20"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-elec-light mb-2 block">Professional Summary</label>
              <Textarea
                value={wizardData.personalInfo.professionalSummary}
                onChange={(e) => setWizardData(prev => ({ 
                  ...prev, 
                  personalInfo: { ...prev.personalInfo, professionalSummary: e.target.value }
                }))}
                placeholder="Brief summary of your electrical experience and skills..."
                className="bg-elec-gray border-elec-yellow/20 h-24"
              />
            </div>
          </div>
        );

      case 'qualifications':
        return <QualificationStep 
          education={wizardData.education}
          onAdd={addEducation}
          onRemove={removeEducation}
        />;

      case 'skills':
        return <SkillsStep
          skills={wizardData.skills}
          onAdd={addSkill}
          onRemove={removeSkill}
          suggestedSkills={getSuggestedSkills()}
        />;

      case 'experience':
        return <ExperienceStep 
          experience={wizardData.experience}
          onAdd={addExperience}
          onRemove={removeExperience}
        />;

      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / wizardSteps.length) * 100;

  return (
    <Card className="w-full h-full bg-elec-dark border-elec-yellow/20 flex flex-col">
      <CardHeader className="pb-4 px-4 md:px-6 border-b border-elec-yellow/10">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-lg md:text-xl text-elec-light flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-elec-yellow" />
            Smart CV Wizard
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-elec-light/60 hover:text-elec-light">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-elec-light/60">
            <span>Step {currentStep + 1} of {wizardSteps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          {React.createElement(wizardSteps[currentStep].icon, { 
            className: "h-5 w-5 text-elec-yellow" 
          })}
          <h3 className="text-lg font-semibold text-elec-light">
            {wizardSteps[currentStep].title}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4 md:p-6 overflow-y-auto">
        {renderStepContent()}
      </CardContent>

      <div className="border-t border-elec-yellow/10 p-4 md:p-6">
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep === wizardSteps.length - 1 ? (
            <Button
              onClick={handleFinish}
              disabled={!isStepValid()}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              Generate CV
              <Sparkles className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(prev => Math.min(wizardSteps.length - 1, prev + 1))}
              disabled={!isStepValid()}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

// Helper components for each step
const QualificationStep: React.FC<{
  education: string[];
  onAdd: (education: string) => void;
  onRemove: (education: string) => void;
}> = ({ education, onAdd, onRemove }) => {
  const [newEducation, setNewEducation] = useState("");

  const handleAdd = () => {
    if (newEducation.trim()) {
      onAdd(newEducation.trim());
      setNewEducation("");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-elec-light mb-2 block">
          Add your qualifications and certifications
        </label>
        <div className="flex gap-2">
          <Input
            value={newEducation}
            onChange={(e) => setNewEducation(e.target.value)}
            placeholder="e.g., City & Guilds Level 3, 18th Edition, ECS Card"
            className="flex-1 bg-elec-gray border-elec-yellow/20"
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <Button onClick={handleAdd} size="sm" className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {education.length > 0 && (
        <div>
          <p className="text-sm font-medium text-elec-light mb-2">Your qualifications:</p>
          <div className="flex flex-wrap gap-2">
            {education.map((edu) => (
              <Badge
                key={edu}
                variant="outline"
                className="border-elec-yellow/30 text-elec-light bg-elec-yellow/10 flex items-center gap-1"
              >
                {edu}
                <button
                  onClick={() => onRemove(edu)}
                  className="ml-1 text-elec-light/60 hover:text-elec-light"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ExperienceStep: React.FC<{
  experience: string[];
  onAdd: (experience: string) => void;
  onRemove: (experience: string) => void;
}> = ({ experience, onAdd, onRemove }) => {
  const [newExperience, setNewExperience] = useState("");

  const handleAdd = () => {
    if (newExperience.trim()) {
      onAdd(newExperience.trim());
      setNewExperience("");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-elec-light mb-2 block">
          Add your work experience and job roles
        </label>
        <div className="flex gap-2">
          <Input
            value={newExperience}
            onChange={(e) => setNewExperience(e.target.value)}
            placeholder="e.g., Domestic Electrician, Industrial Maintenance, Site Supervisor"
            className="flex-1 bg-elec-gray border-elec-yellow/20"
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <Button onClick={handleAdd} size="sm" className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {experience.length > 0 && (
        <div>
          <p className="text-sm font-medium text-elec-light mb-2">Your experience:</p>
          <div className="flex flex-wrap gap-2">
            {experience.map((exp) => (
              <Badge
                key={exp}
                variant="outline"
                className="border-elec-yellow/30 text-elec-light bg-elec-yellow/10 flex items-center gap-1"
              >
                {exp}
                <button
                  onClick={() => onRemove(exp)}
                  className="ml-1 text-elec-light/60 hover:text-elec-light"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SkillsStep: React.FC<{
  skills: string[];
  onAdd: (skill: string) => void;
  onRemove: (skill: string) => void;
  suggestedSkills: string[];
}> = ({ skills, onAdd, onRemove, suggestedSkills }) => {
  const [newSkill, setNewSkill] = useState("");

  const handleAdd = () => {
    if (newSkill.trim()) {
      onAdd(newSkill.trim());
      setNewSkill("");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-elec-light mb-2 block">
          Add your skills and competencies
        </label>
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="e.g., Electrical Installation, Testing & Inspection"
            className="w-full bg-elec-gray border-elec-yellow/20"
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <Button onClick={handleAdd} size="sm" className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {skills.length > 0 && (
        <div>
          <p className="text-sm font-medium text-elec-light mb-2">Your skills:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="border-elec-yellow/30 text-elec-light bg-elec-yellow/10 flex items-center gap-1"
              >
                {skill}
                <button
                  onClick={() => onRemove(skill)}
                  className="ml-1 text-elec-light/60 hover:text-elec-light"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {suggestedSkills.length > 0 && (
        <div>
          <p className="text-sm font-medium text-elec-light mb-2">Suggested skills (click to add):</p>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills.slice(0, 12).map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="cursor-pointer hover:bg-elec-yellow/20 border border-elec-yellow/40 text-elec-light/80 hover:text-elec-light"
                onClick={() => onAdd(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { SmartCVWizard };
