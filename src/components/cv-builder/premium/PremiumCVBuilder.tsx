/**
 * PremiumCVBuilder - Main container for premium CV builder
 * 5-step wizard flow with template selection and AI assistance
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FileText,
  Sparkles,
  Save,
  Eye,
  Loader2,
  Plus,
  X,
} from "lucide-react";

// Premium components
import CVBuilderHero from "./CVBuilderHero";
import CVTemplateShowcase, { CVTemplateId } from "./CVTemplateShowcase";
import CVSectionCard, { CVEntryCard, CVAddButton } from "./CVSectionCard";
import AIAssistantPanel from "./AIAssistantPanel";
import CVPreviewSheet from "./CVPreviewSheet";

// Types and utilities
import { CVData, defaultCVData, WorkExperience, Education } from "../types";
import { generateCVPDF } from "../pdfGenerator";
import { AIService } from "../ai/AIService";
import { toast } from "@/hooks/use-toast";
import { pageVariants, stepSlideVariants, listContainerVariants } from "./animations/variants";

// Storage key
const CV_STORAGE_KEY = "elecmate-cv-draft";
const TEMPLATE_STORAGE_KEY = "elecmate-cv-template";

// Step configuration
const STEPS = [
  { id: "template", title: "Template", icon: FileText },
  { id: "personal", title: "Personal", icon: User },
  { id: "experience", title: "Experience", icon: Briefcase },
  { id: "education", title: "Education", icon: GraduationCap },
  { id: "skills", title: "Skills", icon: Wrench },
];

const PremiumCVBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [cvData, setCvData] = useState<CVData>(defaultCVData);
  const [template, setTemplate] = useState<CVTemplateId>("modern");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [aiSectionContext, setAISectionContext] = useState("");
  const [aiCurrentContent, setAICurrentContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load draft on mount
  useEffect(() => {
    const savedCV = localStorage.getItem(CV_STORAGE_KEY);
    const savedTemplate = localStorage.getItem(TEMPLATE_STORAGE_KEY);

    if (savedCV) {
      try {
        setCvData(JSON.parse(savedCV));
      } catch (e) {
        console.error("Error loading CV draft:", e);
      }
    }

    if (savedTemplate) {
      setTemplate(savedTemplate as CVTemplateId);
    }
  }, []);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(cvData));
      localStorage.setItem(TEMPLATE_STORAGE_KEY, template);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cvData, template]);

  // Calculate progress
  const calculateProgress = useCallback(() => {
    let completed = 0;
    let total = 5;

    // Personal info (name + email required)
    if (cvData.personalInfo.fullName && cvData.personalInfo.email) completed++;

    // Experience (at least one entry)
    if (cvData.experience.length > 0) completed++;

    // Education (at least one entry)
    if (cvData.education.length > 0) completed++;

    // Skills (at least 3 skills)
    if (cvData.skills.length >= 3) completed++;

    // Professional summary
    if (cvData.personalInfo.professionalSummary) completed++;

    return Math.round((completed / total) * 100);
  }, [cvData]);

  const progress = calculateProgress();

  // Navigation
  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      goToStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  // AI Assistant handlers
  const openAIPanel = (context: string, content: string = "") => {
    setAISectionContext(context);
    setAICurrentContent(content);
    setIsAIPanelOpen(true);
  };

  const handleGenerateSuggestion = async (prompt: string): Promise<string> => {
    return await AIService.generateProfessionalSummary(
      {
        targetRole: "Electrician",
        experience: "Experienced",
        personalInfo: cvData.personalInfo,
        previousRoles: cvData.experience,
        skills: cvData.skills,
      },
      prompt
    );
  };

  const handleAcceptSuggestion = (content: string) => {
    if (aiSectionContext === "Professional Summary") {
      setCvData((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, professionalSummary: content },
      }));
    }
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setCvData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      qualification: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      grade: "",
    };
    setCvData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Skills handlers
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !cvData.skills.includes(newSkill.trim())) {
      setCvData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  // Download PDF
  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generateCVPDF(cvData);
      toast({
        title: "CV Downloaded",
        description: "Your CV has been downloaded as a PDF.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CVTemplateShowcase
            selectedTemplate={template}
            onSelectTemplate={setTemplate}
          />
        );

      case 2:
        return (
          <div className="space-y-4">
            <CVSectionCard
              title="Personal Information"
              description="Your contact details"
              icon={<User className="h-5 w-5" />}
              isCompleted={!!(cvData.personalInfo.fullName && cvData.personalInfo.email)}
              isRequired
              defaultExpanded
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-white/60 mb-1.5 block">
                      Full Name *
                    </label>
                    <Input
                      value={cvData.personalInfo.fullName}
                      onChange={(e) =>
                        setCvData((prev) => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, fullName: e.target.value },
                        }))
                      }
                      placeholder="John Smith"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/60 mb-1.5 block">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={cvData.personalInfo.email}
                      onChange={(e) =>
                        setCvData((prev) => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, email: e.target.value },
                        }))
                      }
                      placeholder="john@example.com"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-white/60 mb-1.5 block">
                      Phone
                    </label>
                    <Input
                      type="tel"
                      value={cvData.personalInfo.phone}
                      onChange={(e) =>
                        setCvData((prev) => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, phone: e.target.value },
                        }))
                      }
                      placeholder="07700 123456"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/60 mb-1.5 block">
                      Postcode
                    </label>
                    <Input
                      value={cvData.personalInfo.postcode}
                      onChange={(e) =>
                        setCvData((prev) => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, postcode: e.target.value },
                        }))
                      }
                      placeholder="SW1A 1AA"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-white/60 mb-1.5 block">
                    Address
                  </label>
                  <Input
                    value={cvData.personalInfo.address}
                    onChange={(e) =>
                      setCvData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, address: e.target.value },
                      }))
                    }
                    placeholder="123 High Street, London"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
            </CVSectionCard>

            <CVSectionCard
              title="Professional Summary"
              description="A brief overview of your career"
              icon={<FileText className="h-5 w-5" />}
              isCompleted={!!cvData.personalInfo.professionalSummary}
              onAIAssist={() =>
                openAIPanel("Professional Summary", cvData.personalInfo.professionalSummary)
              }
              defaultExpanded
            >
              <Textarea
                value={cvData.personalInfo.professionalSummary}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, professionalSummary: e.target.value },
                  }))
                }
                placeholder="A dedicated electrician with X years of experience..."
                className="min-h-[120px] bg-white/5 border-white/10 text-white resize-none"
              />
            </CVSectionCard>
          </div>
        );

      case 3:
        return (
          <CVSectionCard
            title="Work Experience"
            description="Your employment history"
            icon={<Briefcase className="h-5 w-5" />}
            completionCount={cvData.experience.length}
            totalCount={Math.max(cvData.experience.length, 1)}
            defaultExpanded
          >
            <div className="space-y-3">
              {cvData.experience.map((exp) => (
                <div key={exp.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      value={exp.jobTitle}
                      onChange={(e) => updateExperience(exp.id, "jobTitle", e.target.value)}
                      placeholder="Job Title"
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                      placeholder="Company Name"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                      disabled={exp.current}
                      placeholder={exp.current ? "Present" : ""}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    className="min-h-[80px] bg-white/5 border-white/10 text-white resize-none"
                  />
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <CVAddButton label="Add Work Experience" onClick={addExperience} />
            </div>
          </CVSectionCard>
        );

      case 4:
        return (
          <CVSectionCard
            title="Education & Qualifications"
            description="Your academic background"
            icon={<GraduationCap className="h-5 w-5" />}
            completionCount={cvData.education.length}
            totalCount={Math.max(cvData.education.length, 1)}
            defaultExpanded
          >
            <div className="space-y-3">
              {cvData.education.map((edu) => (
                <div key={edu.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                  <Input
                    value={edu.qualification}
                    onChange={(e) => updateEducation(edu.id, "qualification", e.target.value)}
                    placeholder="Qualification (e.g., City & Guilds 2391)"
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                    placeholder="Institution/Provider"
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <Input
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                    placeholder="Year Completed (e.g., 2023)"
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <CVAddButton label="Add Qualification" onClick={addEducation} />
            </div>
          </CVSectionCard>
        );

      case 5:
        return (
          <CVSectionCard
            title="Skills & Competencies"
            description="Your technical abilities"
            icon={<Wrench className="h-5 w-5" />}
            completionCount={cvData.skills.length}
            totalCount={3}
            onAIAssist={() => openAIPanel("Skills", cvData.skills.join(", "))}
            defaultExpanded
          >
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  placeholder="Add a skill..."
                  className="bg-white/5 border-white/10 text-white"
                />
                <Button onClick={addSkill} className="bg-blue-500 hover:bg-blue-400 text-white">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {cvData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {cvData.skills.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-blue-500/20 border-blue-500/30 text-blue-300 pr-1"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 p-0.5 hover:bg-white/10 rounded"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Suggested skills */}
              <div>
                <p className="text-xs text-white/50 mb-2">Suggested for electricians:</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "18th Edition",
                    "Testing & Inspection",
                    "PAT Testing",
                    "Fault Finding",
                    "Commercial Installation",
                    "Domestic Wiring",
                    "Solar PV",
                    "EV Charging",
                  ]
                    .filter((s) => !cvData.skills.includes(s))
                    .map((skill) => (
                      <Button
                        key={skill}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCvData((prev) => ({
                            ...prev,
                            skills: [...prev.skills, skill],
                          }));
                        }}
                        className="text-xs border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                      >
                        + {skill}
                      </Button>
                    ))}
                </div>
              </div>
            </div>
          </CVSectionCard>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-10 w-10 rounded-xl text-white/60 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-white">CV Builder</h1>
              <p className="text-xs text-white/50">Step {currentStep} of {STEPS.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPreviewOpen(true)}
              className="text-white/60 hover:text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Badge className="bg-emerald-500/20 border-emerald-500/30 text-emerald-300 text-xs">
              <Save className="h-3 w-3 mr-1" />
              Auto-saved
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-32 px-4 pt-4">
        {/* Hero */}
        <CVBuilderHero
          progress={progress}
          currentStep={currentStep}
          totalSteps={STEPS.length}
          steps={STEPS.map((s, i) => ({
            id: s.id,
            title: s.title,
            completed: i < currentStep - 1 || (i === currentStep - 1 && progress >= 100),
          }))}
          hasDraft={progress > 0}
          onPreview={() => setIsPreviewOpen(true)}
          onDownload={handleDownload}
          className="mb-6"
        />

        {/* Step Content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pt-6 pb-6 px-4">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex-1 h-12 border-white/20 text-white hover:text-white hover:bg-white/10 rounded-xl"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {currentStep === STEPS.length ? (
            <Button
              onClick={() => setIsPreviewOpen(true)}
              className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-black hover:from-blue-400 hover:to-cyan-400 font-semibold shadow-lg shadow-blue-500/25 rounded-xl"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview & Download
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-black hover:from-blue-400 hover:to-cyan-400 font-semibold shadow-lg shadow-blue-500/25 rounded-xl"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Preview Sheet */}
      <CVPreviewSheet
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        cvData={cvData}
        template={template}
        onDownload={handleDownload}
        onEditSection={(section) => {
          setIsPreviewOpen(false);
          // Map section to step
          const stepMap: Record<string, number> = {
            "personal-info": 2,
            experience: 3,
            education: 4,
            skills: 5,
          };
          if (stepMap[section]) {
            goToStep(stepMap[section]);
          }
        }}
      />

      {/* AI Assistant Panel */}
      <AIAssistantPanel
        isOpen={isAIPanelOpen}
        onClose={() => setIsAIPanelOpen(false)}
        sectionContext={aiSectionContext}
        currentContent={aiCurrentContent}
        onAcceptSuggestion={handleAcceptSuggestion}
        onGenerateSuggestion={handleGenerateSuggestion}
      />
    </motion.div>
  );
};

export default PremiumCVBuilder;
