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
import { Checkbox } from "@/components/ui/checkbox";
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
  Download,
  Upload,
  IdCard,
} from "lucide-react";

// Premium components
import CVBuilderHero from "./CVBuilderHero";
import CVTemplateShowcase, { CVTemplateId } from "./CVTemplateShowcase";
import CVSectionCard, { CVEntryCard, CVAddButton } from "./CVSectionCard";
import AIAssistantPanel from "./AIAssistantPanel";
import CVPreviewSheet from "./CVPreviewSheet";

// Types and utilities
import { CVData, defaultCVData, WorkExperience, Education } from "../types";
import { generateCVPDFByTemplate } from "../pdfGenerators";
import { AIService } from "../ai/AIService";
import { getCurrentUserElecIdForCV, saveCV } from "@/services/elecIdService";
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
  const [isImporting, setIsImporting] = useState(false);
  const [hasImportedElecId, setHasImportedElecId] = useState(false);

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

  // Download PDF - uses template-specific generator
  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generateCVPDFByTemplate(cvData, template);
      toast({
        title: "CV Downloaded",
        description: `Your ${template.charAt(0).toUpperCase() + template.slice(1)} CV has been downloaded as a PDF.`,
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Import data from Elec-ID profile
  const handleImportFromElecId = async () => {
    setIsImporting(true);
    try {
      const { profile, userInfo } = await getCurrentUserElecIdForCV();

      if (!profile && !userInfo) {
        toast({
          title: "No Elec-ID Found",
          description: "Please set up your Elec-ID profile first to import data.",
          variant: "destructive",
        });
        return;
      }

      // Build CV data from Elec-ID profile
      const importedData: Partial<CVData> = {
        personalInfo: {
          fullName: profile?.employee?.name || userInfo?.full_name || '',
          email: profile?.employee?.email || userInfo?.email || '',
          phone: profile?.employee?.phone || '',
          address: '',
          postcode: '',
          professionalSummary: profile?.bio || '',
        },
        experience: (profile?.work_history || []).map((wh) => ({
          id: wh.id,
          jobTitle: wh.job_title,
          company: wh.employer_name,
          location: '',
          startDate: wh.start_date ? wh.start_date.substring(0, 7) : '',
          endDate: wh.end_date ? wh.end_date.substring(0, 7) : '',
          current: wh.is_current,
          description: wh.description || '',
        })),
        education: [], // Education typically separate from Elec-ID
        skills: (profile?.skills || []).map((s) => s.skill_name),
        certifications: (profile?.qualifications || []).map((q) =>
          `${q.qualification_name}${q.awarding_body ? ` - ${q.awarding_body}` : ''}`
        ),
      };

      // Merge with existing data (don't overwrite non-empty fields)
      setCvData((prev) => ({
        personalInfo: {
          fullName: importedData.personalInfo?.fullName || prev.personalInfo.fullName,
          email: importedData.personalInfo?.email || prev.personalInfo.email,
          phone: importedData.personalInfo?.phone || prev.personalInfo.phone,
          address: prev.personalInfo.address,
          postcode: prev.personalInfo.postcode,
          professionalSummary: importedData.personalInfo?.professionalSummary || prev.personalInfo.professionalSummary,
        },
        experience: importedData.experience?.length ? importedData.experience : prev.experience,
        education: prev.education,
        skills: importedData.skills?.length ? [...new Set([...prev.skills, ...importedData.skills])] : prev.skills,
        certifications: importedData.certifications?.length
          ? [...new Set([...prev.certifications, ...importedData.certifications])]
          : prev.certifications,
      }));

      setHasImportedElecId(true);
      toast({
        title: "Elec-ID Data Imported",
        description: "Your profile information has been imported successfully.",
      });
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Import Failed",
        description: "Failed to import Elec-ID data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  // Save CV to database
  const handleSaveCV = async () => {
    setIsSaving(true);
    try {
      await saveCV({
        template_id: template,
        cv_data: cvData as unknown as Record<string, unknown>,
        title: `${cvData.personalInfo.fullName || 'My'} CV - ${template}`,
        is_primary: true,
      });
      toast({
        title: "CV Saved",
        description: "Your CV has been saved to your profile.",
      });
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
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
            description="Your employment history - most recent first"
            icon={<Briefcase className="h-5 w-5" />}
            completionCount={cvData.experience.length}
            totalCount={Math.max(cvData.experience.length, 1)}
            defaultExpanded
          >
            <div className="space-y-4">
              {cvData.experience.length === 0 && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-300">
                  Add at least one work experience entry to showcase your professional background.
                </div>
              )}
              {cvData.experience.map((exp, index) => (
                <div key={exp.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                  {/* Job badge */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs text-white/60 border-white/20">
                      Position {index + 1}
                    </Badge>
                    {exp.current && (
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                        Current Role
                      </Badge>
                    )}
                  </div>

                  {/* Job title and company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-white/60 mb-1.5 block">
                        Job Title *
                      </label>
                      <Input
                        value={exp.jobTitle}
                        onChange={(e) => updateExperience(exp.id, "jobTitle", e.target.value)}
                        placeholder="e.g., Qualified Electrician"
                        className="bg-white/5 border-white/10 text-white h-11"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-white/60 mb-1.5 block">
                        Company *
                      </label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        placeholder="e.g., ABC Electrical Ltd"
                        className="bg-white/5 border-white/10 text-white h-11"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-xs font-medium text-white/60 mb-1.5 block">
                      Location
                    </label>
                    <Input
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                      placeholder="e.g., London, UK"
                      className="bg-white/5 border-white/10 text-white h-11"
                    />
                  </div>

                  {/* Dates and current checkbox */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-white/60 mb-1.5 block">
                          Start Date
                        </label>
                        <Input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                          className="bg-white/5 border-white/10 text-white h-11"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-white/60 mb-1.5 block">
                          End Date
                        </label>
                        <Input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                          disabled={exp.current}
                          placeholder={exp.current ? "Present" : ""}
                          className="bg-white/5 border-white/10 text-white h-11 disabled:opacity-50"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onCheckedChange={(checked) => updateExperience(exp.id, "current", checked)}
                        className="border-white/40 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                      />
                      <label
                        htmlFor={`current-${exp.id}`}
                        className="text-sm text-white/70 cursor-pointer touch-manipulation"
                      >
                        I currently work here
                      </label>
                    </div>
                  </div>

                  {/* Description with AI assist */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-white/60">
                        Key Responsibilities & Achievements
                      </label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => openAIPanel("Job Description", exp.description)}
                        className="h-7 text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI Assist
                      </Button>
                    </div>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      placeholder="• Installed and maintained electrical systems in commercial buildings&#10;• Carried out testing and inspection to BS 7671 standards&#10;• Supervised apprentices and junior electricians"
                      className="min-h-[100px] bg-white/5 border-white/10 text-white resize-none"
                    />
                    <p className="text-xs text-white/40 mt-1">
                      Use bullet points (•) to highlight key achievements
                    </p>
                  </div>

                  {/* Remove button */}
                  <div className="flex justify-end pt-2 border-t border-white/5">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-9"
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
            description="Your academic background and professional certifications"
            icon={<GraduationCap className="h-5 w-5" />}
            completionCount={cvData.education.length}
            totalCount={Math.max(cvData.education.length, 1)}
            defaultExpanded
          >
            <div className="space-y-4">
              {cvData.education.length === 0 && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-300">
                  Add your qualifications and certifications - these are crucial for electricians.
                </div>
              )}
              {cvData.education.map((edu, index) => (
                <div key={edu.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                  {/* Qualification badge */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs text-white/60 border-white/20">
                      Qualification {index + 1}
                    </Badge>
                    {edu.current && (
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                        Currently Studying
                      </Badge>
                    )}
                  </div>

                  {/* Qualification and Institution */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-white/60 mb-1.5 block">
                        Qualification *
                      </label>
                      <Input
                        value={edu.qualification}
                        onChange={(e) => updateEducation(edu.id, "qualification", e.target.value)}
                        placeholder="e.g., City & Guilds 2391"
                        className="bg-white/5 border-white/10 text-white h-11"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-white/60 mb-1.5 block">
                        Institution *
                      </label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                        placeholder="e.g., Electrical Training College"
                        className="bg-white/5 border-white/10 text-white h-11"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-xs font-medium text-white/60 mb-1.5 block">
                      Location
                    </label>
                    <Input
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                      placeholder="e.g., Birmingham, UK"
                      className="bg-white/5 border-white/10 text-white h-11"
                    />
                  </div>

                  {/* Dates and current checkbox */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-white/60 mb-1.5 block">
                          Start Date
                        </label>
                        <Input
                          type="month"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                          className="bg-white/5 border-white/10 text-white h-11"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-white/60 mb-1.5 block">
                          End Date
                        </label>
                        <Input
                          type="month"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                          disabled={edu.current}
                          placeholder={edu.current ? "Present" : ""}
                          className="bg-white/5 border-white/10 text-white h-11 disabled:opacity-50"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`current-edu-${edu.id}`}
                        checked={edu.current}
                        onCheckedChange={(checked) => updateEducation(edu.id, "current", checked)}
                        className="border-white/40 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                      <label
                        htmlFor={`current-edu-${edu.id}`}
                        className="text-sm text-white/70 cursor-pointer touch-manipulation"
                      >
                        I am currently studying this
                      </label>
                    </div>
                  </div>

                  {/* Grade/Classification */}
                  <div>
                    <label className="text-xs font-medium text-white/60 mb-1.5 block">
                      Grade / Classification
                    </label>
                    <Input
                      value={edu.grade}
                      onChange={(e) => updateEducation(edu.id, "grade", e.target.value)}
                      placeholder="e.g., Distinction, Pass, 2:1"
                      className="bg-white/5 border-white/10 text-white h-11"
                    />
                    <p className="text-xs text-white/40 mt-1">
                      Leave blank if not applicable or still studying
                    </p>
                  </div>

                  {/* Remove button */}
                  <div className="flex justify-end pt-2 border-t border-white/5">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-9"
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
              onClick={handleImportFromElecId}
              disabled={isImporting}
              className="text-white/60 hover:text-white"
            >
              {isImporting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <IdCard className="h-4 w-4 mr-2" />
              )}
              <span className="hidden sm:inline">Import Elec-ID</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPreviewOpen(true)}
              className="text-white/60 hover:text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Preview</span>
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
        onSave={handleSaveCV}
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
