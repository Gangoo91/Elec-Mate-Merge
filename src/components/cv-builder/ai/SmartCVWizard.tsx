
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Wand2, Loader2, Plus, Target, User, Briefcase, GraduationCap, Wrench } from "lucide-react";
import { CVData } from "../types";
import { AIService } from "./AIService";
import { toast } from "@/hooks/use-toast";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";

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
    id: 'qualifications',
    title: 'Qualifications',
    description: 'Your electrical qualifications and certifications',
    icon: <GraduationCap className="h-5 w-5" />
  },
  {
    id: 'skills',
    title: 'Skills',
    description: 'Select your electrical skills and competencies',
    icon: <Wrench className="h-5 w-5" />
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
  const { isMobile } = useMobileEnhanced();
  const [newSkill, setNewSkill] = useState("");
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
    qualifications: [] as Array<{
      qualification: string;
      institution: string;
      year: string;
    }>,
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
    'Maintenance Electrician', 'Industrial Electrician', 'Commercial Electrician', 'Domestic Electrician',
    'Electrical Designer', 'Design Engineer', 'CAD Designer', 'Technical Designer', 'Schematic Designer',
    'Electrical Commissioning Engineer', 'Commissioning Technician', 'Commissioning Manager', 'Systems Commissioning Engineer',
    'EV Charging Installer', 'EV Charging Engineer', 'Electric Vehicle Technician', 'EV Infrastructure Specialist',
    'EV Commissioning Engineer', 'Electric Vehicle Service Technician', 'EV Maintenance Technician',
    'Solar Panel Installer', 'Renewable Energy Technician', 'Solar Installation Engineer', 'PV System Designer',
    'Wind Turbine Technician', 'Battery Storage Technician', 'Energy Storage Engineer',
    'Smart Home Installer', 'Home Automation Technician', 'Smart Building Engineer', 'IoT Systems Installer',
    'Fire Alarm Engineer', 'Fire Safety Systems Technician', 'Emergency Lighting Engineer',
    'Security Systems Installer', 'CCTV Installer', 'Access Control Engineer', 'Intruder Alarm Technician',
    'Data Cabling Technician', 'Network Infrastructure Engineer', 'Fibre Optic Technician', 'Telecommunications Engineer',
    'Electrical Testing & Inspection', 'PAT Testing Technician', 'Electrical Compliance Officer', 'EICR Inspector',
    'Electrical Project Manager', 'Site Supervisor', 'Electrical Estimator', 'Electrical Sales Engineer',
    'Control Panel Builder', 'PLC Programmer', 'SCADA Engineer', 'Automation Engineer',
    'Motor Control Engineer', 'Drives & Controls Technician', 'Instrumentation Technician',
    'Electrical Safety Officer', 'Electrical Trainer', 'Electrical Consultant'
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

      // Convert qualifications to education format
      const education = wizardData.qualifications.map(qual => ({
        id: Date.now().toString() + Math.random(),
        qualification: qual.qualification,
        institution: qual.institution || 'Not specified',
        location: '',
        startDate: '',
        endDate: qual.year || '',
        current: false,
        grade: ''
      }));

      const generatedCV: CVData = {
        personalInfo: {
          ...wizardData.personalInfo,
          professionalSummary
        },
        experience: enhancedExperience,
        education,
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

  const electricalQualifications = [
    'Level 2 Diploma in Electrical Engineering', 'Level 3 Diploma in Electrical Engineering',
    'Level 4 HNC Electrical Engineering', 'Level 5 HND Electrical Engineering',
    'City & Guilds 2365 Electrical Installation (Level 2)', 'City & Guilds 2365 Electrical Installation (Level 3)',
    'City & Guilds 2391 Inspection & Testing', 'City & Guilds 2396 Design & Verification',
    'City & Guilds 2394/2395 Initial Verification', 'City & Guilds 2382 18th Edition Wiring Regulations',
    'City & Guilds 2381 17th Edition Wiring Regulations', 'City & Guilds 2392 Fundamental Inspection',
    'City & Guilds 2393 Electrical Maintenance', 'City & Guilds 2377 PAT Testing',
    'City & Guilds 2330 Electrotechnical Technology', 'City & Guilds 2357 Electrotechnical Technology (NVQ)',
    '18th Edition IET Wiring Regulations (BS 7671:2018)', '17th Edition IET Wiring Regulations',
    'AM2 Assessment (Electrical Installation Work)', 'AM2S Assessment (Electrical Maintenance)',
    'ECS Card (Gold/Blue/Green)', 'JIB Gold Card', 'JIB Graded Card', 'SJIB Card',
    'NICEIC Approved Contractor', 'NICEIC Domestic Installer', 'Part P Qualified', 'Competent Person Scheme',
    'NAPIT Approved', 'ELECSA Approved', 'Stroma Approved', 'SELECT Approved',
    'EV Charging Installation (City & Guilds 2919)', 'OLEV EV Charging Qualification',
    'IET Code of Practice for EV Charging', 'EV Charging Point Installation & Maintenance',
    'Solar Panel Installation (MCS Certification)', 'Solar PV Installation Training',
    'Renewable Energy Installation', 'Battery Storage Installation',
    'Fire Alarm Installation (BS 5839)', 'Fire Detection & Alarm Systems',
    'Emergency Lighting (BS 5266)', 'Fire Safety Systems Maintenance',
    'Security Systems Installation', 'CCTV Installation & Maintenance', 'Access Control Systems',
    'Data Cabling Installation', 'Structured Cabling Systems', 'Fibre Optic Installation',
    'Smart Home Installation', 'Home Automation Systems', 'KNX/EIB Systems',
    'PAT Testing Certification', 'Portable Appliance Testing', 'In-Service Inspection',
    'COMPEX Ex Certification', 'ATEX Certification', 'Hazardous Area Installation',
    'Confined Space Training', 'Working at Height Certification', 'IPAF Certification',
    'PASMA Certification', 'SSSTS Site Safety', 'SMSTS Site Management',
    'CSCS Card (Various Categories)', 'CCNSG Safety Passport', 'ECITB Safety Passport',
    'First Aid at Work', 'Emergency First Aid', 'CPR & AED Training',
    'Manual Handling Training', 'Asbestos Awareness', 'COSHH Training',
    'BEng Electrical Engineering', 'BEng Electronic Engineering', 'MEng Electrical Engineering',
    'MSc Electrical Engineering', 'Electrical Engineering Degree', 'Electronic Engineering Degree',
    'Apprenticeship in Electrical Engineering', 'Advanced Apprenticeship', 'Higher Apprenticeship',
    'Degree Apprenticeship in Engineering', 'Electrical Installation Apprenticeship'
  ];

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

  const addQualification = () => {
    setWizardData(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, {
        qualification: '',
        institution: '',
        year: ''
      }]
    }));
  };

  const updateQualification = (index: number, field: string, value: string) => {
    setWizardData(prev => ({
      ...prev,
      qualifications: prev.qualifications.map((qual, i) => 
        i === index ? { ...qual, [field]: value } : qual
      )
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !wizardData.skills.includes(newSkill.trim())) {
      setWizardData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setWizardData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addSuggestedSkill = (skill: string) => {
    if (!wizardData.skills.includes(skill)) {
      setWizardData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const suggestedSkills = [
    "Electrical Installation", "Wiring", "Testing & Inspection", "PAT Testing",
    "Circuit Design", "Fault Finding", "Health & Safety", "BS 7671 Regulations",
    "NICEIC Knowledge", "Solar Panel Installation", "Emergency Lighting",
    "Fire Alarm Systems", "CCTV Systems", "LED Lighting", "Three Phase Systems",
    "Motor Control", "PLC Programming", "Electrical Maintenance", "Cable Installation",
    "Switchboard Installation", "18th Edition", "Electrical Design", "Risk Assessment"
  ];

  const renderStepContent = () => {
    const step = wizardSteps[currentStep];

    switch (step.id) {
      case 'target':
        return (
          <div className="space-y-6">
            <MobileSelectWrapper
              label="Target Role *"
              placeholder="Select your target role"
              value={wizardData.targetRole}
              onValueChange={(value) => setWizardData(prev => ({ ...prev, targetRole: value }))}
              options={electricalRoles.map(role => ({ value: role, label: role }))}
              hint="Choose the electrical role you're applying for"
            />

            <MobileSelectWrapper
              label="Experience Level *"
              placeholder="Select your experience level"
              value={wizardData.experienceLevel}
              onValueChange={(value) => setWizardData(prev => ({ ...prev, experienceLevel: value }))}
              options={experienceLevels.map(level => ({ value: level, label: level }))}
              hint="Select your current experience level"
            />

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
            <MobileInput
              label="Full Name *"
              type="text"
              value={wizardData.personalInfo.fullName}
              onChange={(e) => setWizardData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, fullName: e.target.value }
              }))}
              placeholder="Enter your full name"
            />

            <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
              <MobileInput
                label="Email *"
                type="email"
                value={wizardData.personalInfo.email}
                onChange={(e) => setWizardData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, email: e.target.value }
                }))}
                placeholder="your.email@example.com"
              />
              <MobileInput
                label="Phone"
                type="tel"
                value={wizardData.personalInfo.phone}
                onChange={(e) => setWizardData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, phone: e.target.value }
                }))}
                placeholder="07700 123456"
              />
            </div>

            <MobileInput
              label="Address"
              type="text"
              value={wizardData.personalInfo.address}
              onChange={(e) => setWizardData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, address: e.target.value }
              }))}
              placeholder="123 High Street, City"
            />
            
            <MobileInput
              label="Postcode"
              type="text"
              value={wizardData.personalInfo.postcode}
              onChange={(e) => setWizardData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, postcode: e.target.value }
              }))}
              placeholder="SW1A 1AA"
            />
          </div>
        );

      case 'qualifications':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-elec-light">Qualifications & Certifications</h4>
              <Button
                onClick={addQualification}
                variant="outline"
                size="sm"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Qualification
              </Button>
            </div>

            {wizardData.qualifications.map((qual, index) => (
              <div key={index} className="p-4 bg-elec-card border-2 border-elec-gray/50 rounded-xl">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                      <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                      Qualification *
                    </label>
                    <MobileSelectWrapper
                      label=""
                      placeholder="Select qualification"
                      value={qual.qualification}
                      onValueChange={(value) => updateQualification(index, 'qualification', value)}
                      options={electricalQualifications.map(q => ({ value: q, label: q }))}
                    />
                  </div>
                  <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    <MobileInput
                      label="Institution/Provider"
                      type="text"
                      value={qual.institution}
                      onChange={(e) => updateQualification(index, 'institution', e.target.value)}
                      placeholder="e.g. City & Guilds, Local College"
                    />
                    <MobileInput
                      label="Year Completed"
                      type="text"
                      value={qual.year}
                      onChange={(e) => updateQualification(index, 'year', e.target.value)}
                      placeholder="e.g. 2024, In Progress"
                    />
                  </div>
                </div>
              </div>
            ))}

            {wizardData.qualifications.length === 0 && (
              <div className="text-center py-8 bg-elec-card/50 rounded-xl border-2 border-dashed border-elec-yellow/20">
                <p className="text-elec-light/60 mb-4">No qualifications added yet</p>
                <Button
                  onClick={addQualification}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Qualification
                </Button>
              </div>
            )}
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-elec-light">Skills & Competencies</h4>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <MobileInput
                    label=""
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add a skill..."
                  />
                </div>
                <Button
                  onClick={addSkill}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex-shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {wizardData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {wizardData.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 pr-1"
                    >
                      {skill}
                      <Button
                        onClick={() => removeSkill(skill)}
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 ml-1 hover:bg-red-500/20"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-elec-light flex items-center gap-2 mb-3">
                  <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                  Suggested Skills:
                </label>
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills
                    .filter(skill => !wizardData.skills.includes(skill))
                    .slice(0, 12)
                    .map((skill, index) => (
                      <Button
                        key={index}
                        onClick={() => addSuggestedSkill(skill)}
                        variant="outline"
                        size="sm"
                        className="text-xs border-elec-yellow/30 hover:bg-elec-yellow/10 text-elec-light"
                      >
                        + {skill}
                      </Button>
                    ))}
                </div>
              </div>
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
                  <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    <MobileInput
                      label="Job Title"
                      type="text"
                      value={job.jobTitle}
                      onChange={(e) => updateWorkExperience(index, 'jobTitle', e.target.value)}
                      placeholder="e.g. Electrical Apprentice"
                    />
                    <MobileInput
                      label="Company"
                      type="text"
                      value={job.company}
                      onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                      placeholder="e.g. ABC Electrical Ltd"
                    />
                  </div>
                  <MobileInput
                    label="Duration"
                    type="text"
                    value={job.duration}
                    onChange={(e) => updateWorkExperience(index, 'duration', e.target.value)}
                    placeholder="e.g. 2 years, Jan 2020 - Present"
                  />
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
      case 'qualifications':
        return true; // Qualifications are optional
      case 'skills':
        return true; // Skills are optional
      case 'experience':
        return true; // Experience is optional
      default:
        return true;
    }
  };

  return (
    <div className="min-h-full">
      <div className="max-w-4xl mx-auto">
        <div className={`bg-elec-gray ${isMobile ? 'p-3' : 'p-6'} border-b border-elec-gray/20`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <Wand2 className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-semibold text-elec-light truncate">Smart CV Wizard</h1>
              <p className="text-elec-light/60 text-xs sm:text-sm">AI-powered CV generation for electrical professionals</p>
            </div>
          </div>
          
          {/* Step indicator */}
          <div className="flex items-center mt-3 sm:mt-4 gap-1 sm:gap-2 overflow-x-auto pb-2">
            {wizardSteps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div className={`flex items-center gap-1 sm:gap-2 rounded-lg whitespace-nowrap ${
                  isMobile ? 'px-2 py-1.5' : 'px-3 py-2'
                } ${
                  index === currentStep 
                    ? 'bg-elec-yellow text-black' 
                    : index < currentStep 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-elec-card text-elec-light/60'
                }`}>
                  <div className="flex-shrink-0">{step.icon}</div>
                  <span className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    {isMobile && step.title.includes(' ') ? step.title.split(' ')[0] : step.title}
                  </span>
                </div>
                {index < wizardSteps.length - 1 && (
                  <div className={`bg-elec-gray/60 mx-1 sm:mx-2 ${isMobile ? 'w-2 h-px' : 'w-4 h-px'} flex-shrink-0`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={`space-y-4 sm:space-y-6 bg-elec-gray ${isMobile ? 'p-3' : 'p-6'}`}>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-elec-light mb-1 sm:mb-2">
              {wizardSteps[currentStep].title}
            </h3>
            <p className="text-elec-light/60 text-xs sm:text-sm mb-4 sm:mb-6">
              {wizardSteps[currentStep].description}
            </p>
          </div>

          {renderStepContent()}

          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4 sm:pt-6 border-t border-elec-gray/20">
            <Button
              onClick={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : onClose()}
              variant="outline"
              className="border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10 w-full sm:w-auto"
            >
              {currentStep > 0 ? 'Back' : 'Cancel'}
            </Button>

            <Button
              onClick={handleStepComplete}
              disabled={!isStepValid() || isGenerating}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold w-full sm:w-auto"
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
