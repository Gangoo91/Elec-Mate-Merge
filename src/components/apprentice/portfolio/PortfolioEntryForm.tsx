import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, ImagePlus, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { PortfolioEntry, PortfolioCategory, PortfolioFile } from "@/types/portfolio";
import { EvidenceUploader } from "@/components/apprentice/shared/EvidenceUploader";
import { EvidenceRequirementsGuide } from "@/components/apprentice/portfolio/EvidenceRequirementsGuide";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  ScrollbarFreeSelect,
  ScrollbarFreeSelectContent,
  ScrollbarFreeSelectItem,
  ScrollbarFreeSelectTrigger,
  ScrollbarFreeSelectValue,
} from "@/components/ui/scrollbar-free-select";
import { SingleSelectWithAdd } from "@/components/ui/single-select-with-add";

export interface PortfolioEntryFormProps {
  categories: PortfolioCategory[];
  initialData?: PortfolioEntry;
  onSubmit: (data: Partial<PortfolioEntry>) => void;
  onCancel: () => void;
}

// Pre-defined options for dropdowns
const SKILLS_OPTIONS = [
  { value: "circuit-analysis", label: "Circuit Analysis" },
  { value: "electrical-testing", label: "Electrical Testing" },
  { value: "wiring-installation", label: "Wiring Installation" },
  { value: "fault-finding", label: "Fault Finding" },
  { value: "health-safety", label: "Health & Safety" },
  { value: "conduit-installation", label: "Conduit Installation" },
  { value: "panel-wiring", label: "Panel Wiring" },
  { value: "motor-control", label: "Motor Control" },
  { value: "plc-programming", label: "PLC Programming" },
  { value: "cable-management", label: "Cable Management" },
  { value: "earthing-bonding", label: "Earthing & Bonding" },
  { value: "emergency-lighting", label: "Emergency Lighting" },
  { value: "fire-alarm-systems", label: "Fire Alarm Systems" },
  { value: "security-systems", label: "Security Systems" },
  { value: "data-cabling", label: "Data Cabling" }
];

const TAGS_OPTIONS = [
  { value: "practical", label: "Practical Work" },
  { value: "theory", label: "Theory" },
  { value: "workplace", label: "Workplace Learning" },
  { value: "college", label: "College Project" },
  { value: "assessment", label: "Assessment" },
  { value: "teamwork", label: "Teamwork" },
  { value: "problem-solving", label: "Problem Solving" },
  { value: "documentation", label: "Documentation" },
  { value: "presentation", label: "Presentation" },
  { value: "research", label: "Research" },
  { value: "innovation", label: "Innovation" },
  { value: "leadership", label: "Leadership" }
];

const ASSESSMENT_CRITERIA_OPTIONS = [
  { value: "ac1.1", label: "AC1.1 - Comply with health and safety requirements" },
  { value: "ac1.2", label: "AC1.2 - Use appropriate tools and equipment safely" },
  { value: "ac2.1", label: "AC2.1 - Select appropriate wiring systems" },
  { value: "ac2.2", label: "AC2.2 - Install wiring systems correctly" },
  { value: "ac3.1", label: "AC3.1 - Test electrical installations" },
  { value: "ac3.2", label: "AC3.2 - Commission electrical systems" },
  { value: "ac4.1", label: "AC4.1 - Identify electrical faults" },
  { value: "ac4.2", label: "AC4.2 - Rectify electrical faults safely" },
  { value: "ac5.1", label: "AC5.1 - Interpret technical documentation" },
  { value: "ac5.2", label: "AC5.2 - Complete installation certificates" }
];

const LEARNING_OUTCOMES_OPTIONS = [
  { value: "lo1", label: "LO1: Understand electrical safety principles" },
  { value: "lo2", label: "LO2: Install electrical wiring systems" },
  { value: "lo3", label: "LO3: Test and commission electrical installations" },
  { value: "lo4", label: "LO4: Diagnose and repair electrical faults" },
  { value: "lo5", label: "LO5: Apply industry standards and regulations" },
  { value: "lo6", label: "LO6: Work effectively in electrical environments" },
  { value: "lo7", label: "LO7: Communicate technical information effectively" }
];

const AWARDING_BODY_STANDARDS_OPTIONS = [
  { value: "bs7671", label: "BS 7671:2018 - Wiring Regulations" },
  { value: "bs5839", label: "BS 5839 - Fire Detection & Alarm Systems" },
  { value: "bs6651", label: "BS 6651 - Lightning Protection" },
  { value: "bs5266", label: "BS 5266 - Emergency Lighting" },
  { value: "iet-guidance", label: "IET Guidance Notes" },
  { value: "city-guilds-2365", label: "City & Guilds 2365" },
  { value: "eal-electrical", label: "EAL Electrical Installation" },
  { value: "btec-electrical", label: "BTEC Electrical Engineering" },
  { value: "niceic-standards", label: "NICEIC Standards" },
  { value: "napit-requirements", label: "NAPIT Requirements" }
];

// Wizard steps configuration
const WIZARD_STEPS = [
  { id: 'basics', title: 'Basics', shortTitle: 'Basics' },
  { id: 'skills', title: 'Skills & Outcomes', shortTitle: 'Skills' },
  { id: 'evidence', title: 'Evidence', shortTitle: 'Evidence' },
  { id: 'reflection', title: 'Reflection', shortTitle: 'Reflect' }
];

const PortfolioEntryForm = ({ categories, initialData, onSubmit, onCancel }: PortfolioEntryFormProps) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    categoryId: initialData?.category.id || "",
    reflection: initialData?.reflection || "",
    skills: initialData?.skills || [],
    tags: initialData?.tags || [],
    assessmentCriteria: initialData?.assessmentCriteria || [],
    learningOutcomes: initialData?.learningOutcomes || [],
    supervisorFeedback: initialData?.supervisorFeedback || "",
    selfAssessment: initialData?.selfAssessment || 3,
    status: initialData?.status || "draft" as const,
    timeSpent: initialData?.timeSpent || 0,
    awardingBodyStandards: initialData?.awardingBodyStandards || [],
    evidenceFiles: initialData?.evidenceFiles || [] as PortfolioFile[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
    if (!selectedCategory) return;

    const submitData: Partial<PortfolioEntry> = {
      ...formData,
      category: selectedCategory,
      dateCreated: initialData?.dateCreated || new Date().toISOString(),
      evidenceFiles: formData.evidenceFiles,
      ...(formData.status === 'completed' && !initialData?.dateCompleted && {
        dateCompleted: new Date().toISOString()
      })
    };

    onSubmit(submitData);
  };

  const handleFilesChange = (files: PortfolioFile[]) => {
    setFormData(prev => ({ ...prev, evidenceFiles: files }));
  };

  const categoryOptions = categories.map(cat => ({
    value: cat.id,
    label: cat.name
  }));

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "reviewed", label: "Reviewed" }
  ];

  const selfAssessmentOptions = [
    { value: "1", label: "1 - Poor" },
    { value: "2", label: "2 - Below Average" },
    { value: "3", label: "3 - Average" },
    { value: "4", label: "4 - Good" },
    { value: "5", label: "5 - Excellent" }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.title.trim() && formData.categoryId && formData.description.trim();
      case 1:
        return true; // Skills are optional
      case 2:
        return true; // Evidence is optional
      case 3:
        return formData.reflection.trim();
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Step Progress Indicator
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-1 sm:gap-2 py-3 px-2">
      {WIZARD_STEPS.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          <button
            type="button"
            onClick={() => setCurrentStep(idx)}
            className={`
              flex items-center justify-center transition-all duration-200
              ${idx === currentStep
                ? 'bg-elec-yellow text-elec-dark'
                : idx < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-white/5 text-elec-light/60'
              }
              ${isMobile
                ? 'w-8 h-8 rounded-full text-xs font-bold'
                : 'px-3 py-1.5 rounded-lg text-sm font-medium gap-2'
              }
            `}
          >
            {idx < currentStep ? (
              <Check className="h-4 w-4" />
            ) : isMobile ? (
              idx + 1
            ) : (
              <>
                <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs">
                  {idx + 1}
                </span>
                {step.shortTitle}
              </>
            )}
          </button>
          {idx < WIZARD_STEPS.length - 1 && (
            <div className={`w-4 sm:w-8 h-0.5 mx-1 ${idx < currentStep ? 'bg-green-500' : 'bg-white/5'}`} />
          )}
        </div>
      ))}
    </div>
  );

  // Step 1: Basics
  const BasicsStep = () => (
    <div className="space-y-5">
      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
          <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
          Entry Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="e.g., Three-phase motor installation"
          className="w-full h-12 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium px-4"
          required
        />
      </div>

      {/* Category */}
      <ScrollbarFreeSelect
        value={formData.categoryId}
        onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
      >
        <ScrollbarFreeSelectTrigger
          label="Category"
          hint="Choose the most relevant category for this work"
        >
          <ScrollbarFreeSelectValue placeholder="Select category" />
        </ScrollbarFreeSelectTrigger>
        <ScrollbarFreeSelectContent>
          {categoryOptions.map((option) => (
            <ScrollbarFreeSelectItem key={option.value} value={option.value}>
              {option.label}
            </ScrollbarFreeSelectItem>
          ))}
        </ScrollbarFreeSelectContent>
      </ScrollbarFreeSelect>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
          <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe what you did and what you learned..."
          rows={4}
          className="w-full bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium p-4 resize-none"
          style={{ minHeight: isMobile ? '120px' : '100px' }}
          required
        />
      </div>

      {/* Status and Time Spent */}
      <div className="grid grid-cols-2 gap-4">
        <ScrollbarFreeSelect
          value={formData.status}
          onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}
        >
          <ScrollbarFreeSelectTrigger label="Status">
            <ScrollbarFreeSelectValue placeholder="Select status" />
          </ScrollbarFreeSelectTrigger>
          <ScrollbarFreeSelectContent>
            {statusOptions.map((option) => (
              <ScrollbarFreeSelectItem key={option.value} value={option.value}>
                {option.label}
              </ScrollbarFreeSelectItem>
            ))}
          </ScrollbarFreeSelectContent>
        </ScrollbarFreeSelect>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
            <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
            Time Spent
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-elec-light/60" />
            <input
              type="number"
              min="0"
              value={formData.timeSpent}
              onChange={(e) => setFormData(prev => ({ ...prev, timeSpent: parseInt(e.target.value) || 0 }))}
              className="w-full h-12 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 text-base font-medium pl-10 pr-16"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-elec-light/60">mins</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 2: Skills & Learning Outcomes
  const SkillsStep = () => (
    <div className="space-y-5">
      {/* Skills */}
      <SingleSelectWithAdd
        label="Skills Demonstrated"
        placeholder="Select a skill"
        value={formData.skills}
        onValueChange={(value) => setFormData(prev => ({ ...prev, skills: value }))}
        options={SKILLS_OPTIONS}
        hint="Add electrical skills you used or developed"
      />

      {/* Learning Outcomes */}
      <SingleSelectWithAdd
        label="Learning Outcomes"
        placeholder="Select a learning outcome"
        value={formData.learningOutcomes}
        onValueChange={(value) => setFormData(prev => ({ ...prev, learningOutcomes: value }))}
        options={LEARNING_OUTCOMES_OPTIONS}
        hint="Add learning outcomes this work demonstrates"
      />

      {/* Assessment Criteria */}
      <SingleSelectWithAdd
        label="Assessment Criteria Met"
        placeholder="Select an assessment criteria"
        value={formData.assessmentCriteria}
        onValueChange={(value) => setFormData(prev => ({ ...prev, assessmentCriteria: value }))}
        options={ASSESSMENT_CRITERIA_OPTIONS}
        hint="Add criteria you've addressed with this evidence"
      />

      {/* Tags */}
      <SingleSelectWithAdd
        label="Tags"
        placeholder="Select a tag"
        value={formData.tags}
        onValueChange={(value) => setFormData(prev => ({ ...prev, tags: value }))}
        options={TAGS_OPTIONS}
        hint="Add tags to help categorise your work"
      />

      {/* Awarding Body Standards */}
      <SingleSelectWithAdd
        label="Standards & Regulations"
        placeholder="Select a standard or regulation"
        value={formData.awardingBodyStandards}
        onValueChange={(value) => setFormData(prev => ({ ...prev, awardingBodyStandards: value }))}
        options={AWARDING_BODY_STANDARDS_OPTIONS}
        hint="Add relevant standards or regulations that apply"
      />
    </div>
  );

  // Step 3: Evidence
  const EvidenceStep = () => (
    <div className="space-y-5">
      {/* Evidence Requirements Guide */}
      {formData.categoryId && (
        <EvidenceRequirementsGuide
          categoryId={formData.categoryId}
          uploadedFiles={formData.evidenceFiles.map(f => f.file).filter(Boolean) as File[]}
          compact={isMobile}
        />
      )}

      <div className="space-y-3">
        <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
          <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
          <ImagePlus className="h-4 w-4" />
          Evidence Files
        </label>
        <EvidenceUploader
          files={formData.evidenceFiles}
          onFilesChange={handleFilesChange}
          entryId={initialData?.id}
          maxFiles={10}
        />
        <p className="text-xs text-elec-light/70">
          Upload photos, documents, or videos as evidence of your work. Max 10 files, 10MB each.
        </p>
      </div>
    </div>
  );

  // Step 4: Reflection
  const ReflectionStep = () => (
    <div className="space-y-5">
      {/* Self Assessment */}
      <ScrollbarFreeSelect
        value={formData.selfAssessment.toString()}
        onValueChange={(value) => setFormData(prev => ({ ...prev, selfAssessment: parseInt(value) }))}
      >
        <ScrollbarFreeSelectTrigger
          label="Self Assessment"
          hint="Rate your performance on this task"
        >
          <ScrollbarFreeSelectValue placeholder="Rate your performance" />
        </ScrollbarFreeSelectTrigger>
        <ScrollbarFreeSelectContent>
          {selfAssessmentOptions.map((option) => (
            <ScrollbarFreeSelectItem key={option.value} value={option.value}>
              {option.label}
            </ScrollbarFreeSelectItem>
          ))}
        </ScrollbarFreeSelectContent>
      </ScrollbarFreeSelect>

      {/* Reflection */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
          <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
          Reflection
        </label>
        <textarea
          value={formData.reflection}
          onChange={(e) => setFormData(prev => ({ ...prev, reflection: e.target.value }))}
          placeholder="Reflect on your learning, challenges faced, and what you'd do differently..."
          rows={5}
          className="w-full bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium p-4 resize-none"
          style={{ minHeight: isMobile ? '150px' : '120px' }}
          required
        />
        <p className="text-xs text-elec-light/70">
          Critical thinking about your experience and learning
        </p>
      </div>

      {/* Supervisor Feedback */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
          <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
          Supervisor Feedback
          <span className="text-xs text-elec-light/50 font-normal">(Optional)</span>
        </label>
        <textarea
          value={formData.supervisorFeedback}
          onChange={(e) => setFormData(prev => ({ ...prev, supervisorFeedback: e.target.value }))}
          placeholder="Enter any feedback from your supervisor or assessor..."
          rows={3}
          className="w-full bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium p-4 resize-none"
          style={{ minHeight: isMobile ? '100px' : '80px' }}
        />
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicsStep />;
      case 1:
        return <SkillsStep />;
      case 2:
        return <EvidenceStep />;
      case 3:
        return <ReflectionStep />;
      default:
        return null;
    }
  };

  // Navigation Buttons
  const NavigationButtons = () => (
    <div className={`flex gap-3 pt-4 border-t border-elec-gray/20 ${isMobile ? 'sticky bottom-0 bg-white/5 pb-safe' : ''}`}>
      {currentStep > 0 ? (
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="flex-1 border-elec-yellow/30 hover:bg-elec-yellow/10 font-medium py-3 h-12"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      ) : (
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="flex-1 text-elec-light/70 hover:text-elec-light hover:bg-white/5 font-medium py-3 h-12"
        >
          Cancel
        </Button>
      )}

      {currentStep < WIZARD_STEPS.length - 1 ? (
        <Button
          type="button"
          onClick={nextStep}
          disabled={!canProceed()}
          className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold py-3 h-12 disabled:opacity-50"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={!canProceed()}
          className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold py-3 h-12 disabled:opacity-50"
        >
          <Check className="h-4 w-4 mr-1" />
          {initialData ? "Update Entry" : "Create Entry"}
        </Button>
      )}
    </div>
  );

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent
        className={`
          bg-white/5 border-elec-gray/40
          ${isMobile
            ? 'max-w-full h-[100dvh] max-h-[100dvh] rounded-none p-0 flex flex-col'
            : 'max-w-2xl max-h-[95vh]'
          }
        `}
      >
        <div className={`${isMobile ? 'flex flex-col h-full' : ''}`}>
          {/* Header */}
          <DialogHeader className={`pb-2 bg-white/5 ${isMobile ? 'sticky top-0 z-10 px-4 pt-4 border-b border-elec-gray/20' : ''}`}>
            <DialogTitle className="text-elec-light text-lg sm:text-xl font-semibold">
              {initialData ? "Edit Portfolio Entry" : "New Portfolio Entry"}
            </DialogTitle>
            <StepIndicator />
          </DialogHeader>

          {/* Form Content */}
          <form
            onSubmit={handleSubmit}
            className={`
              bg-white/5
              ${isMobile
                ? 'flex-1 overflow-y-auto px-4 py-4'
                : 'space-y-6 overflow-y-auto max-h-[calc(95vh-180px)] px-1'
              }
            `}
          >
            <div className={isMobile ? 'min-h-full' : ''}>
              {renderStep()}
            </div>

            {/* Navigation */}
            <NavigationButtons />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioEntryForm;
