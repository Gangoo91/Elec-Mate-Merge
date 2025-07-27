import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { PortfolioEntry, PortfolioCategory } from "@/types/portfolio";
import { 
  ScrollbarFreeSelect,
  ScrollbarFreeSelectContent,
  ScrollbarFreeSelectItem,
  ScrollbarFreeSelectTrigger,
  ScrollbarFreeSelectValue,
} from "@/components/ui/scrollbar-free-select";
import { ScrollbarFreeMultiSelect } from "@/components/ui/scrollbar-free-multi-select";

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

const PortfolioEntryForm = ({ categories, initialData, onSubmit, onCancel }: PortfolioEntryFormProps) => {
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
    awardingBodyStandards: initialData?.awardingBodyStandards || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
    if (!selectedCategory) return;

    const submitData: Partial<PortfolioEntry> = {
      ...formData,
      category: selectedCategory,
      dateCreated: initialData?.dateCreated || new Date().toISOString(),
      evidenceFiles: initialData?.evidenceFiles || [],
      ...(formData.status === 'completed' && !initialData?.dateCompleted && {
        dateCompleted: new Date().toISOString()
      })
    };

    onSubmit(submitData);
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

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-md max-h-[95vh] overflow-y-auto bg-elec-gray border-elec-gray/40">
        <DialogHeader className="pb-4 bg-elec-gray">
          <DialogTitle className="text-elec-light text-xl font-semibold">
            {initialData ? "Edit Portfolio Entry" : "Create New Portfolio Entry"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 bg-elec-gray">
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
            <p className="text-xs text-elec-light/70 flex items-center gap-1">
              <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
              Give your portfolio entry a clear, descriptive title
            </p>
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
          <div className="space-y-3">
            <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
              <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what you did and what you learned..."
              rows={4}
              className="w-full h-32 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium p-4 resize-none"
              required
            />
            <p className="text-xs text-elec-light/70 flex items-center gap-1">
              <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
              Explain the task, your approach, and key activities
            </p>
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

          {/* Skills */}
          <ScrollbarFreeMultiSelect
            label="Skills Demonstrated"
            placeholder="Select skills you used or developed"
            value={formData.skills}
            onValueChange={(value) => setFormData(prev => ({ ...prev, skills: value }))}
            options={SKILLS_OPTIONS}
            hint="Choose all relevant electrical skills"
          />

          {/* Tags */}
          <ScrollbarFreeMultiSelect
            label="Tags"
            placeholder="Add relevant tags"
            value={formData.tags}
            onValueChange={(value) => setFormData(prev => ({ ...prev, tags: value }))}
            options={TAGS_OPTIONS}
            hint="Help categorise your work"
          />

          {/* Assessment Criteria */}
          <ScrollbarFreeMultiSelect
            label="Assessment Criteria Met"
            placeholder="Select criteria you've addressed"
            value={formData.assessmentCriteria}
            onValueChange={(value) => setFormData(prev => ({ ...prev, assessmentCriteria: value }))}
            options={ASSESSMENT_CRITERIA_OPTIONS}
            hint="Which assessment criteria does this evidence?"
          />

          {/* Learning Outcomes */}
          <ScrollbarFreeMultiSelect
            label="Learning Outcomes"
            placeholder="Select learning outcomes achieved"
            value={formData.learningOutcomes}
            onValueChange={(value) => setFormData(prev => ({ ...prev, learningOutcomes: value }))}
            options={LEARNING_OUTCOMES_OPTIONS}
            hint="What learning outcomes does this demonstrate?"
          />

          {/* Awarding Body Standards */}
          <ScrollbarFreeMultiSelect
            label="Standards & Regulations"
            placeholder="Select relevant standards"
            value={formData.awardingBodyStandards}
            onValueChange={(value) => setFormData(prev => ({ ...prev, awardingBodyStandards: value }))}
            options={AWARDING_BODY_STANDARDS_OPTIONS}
            hint="Which standards or regulations apply?"
          />

          {/* Reflection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
              <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
              Reflection
            </label>
            <textarea
              value={formData.reflection}
              onChange={(e) => setFormData(prev => ({ ...prev, reflection: e.target.value }))}
              placeholder="Reflect on your learning, challenges faced, and what you'd do differently..."
              rows={5}
              className="w-full h-40 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium p-4 resize-none"
              required
            />
            <p className="text-xs text-elec-light/70 flex items-center gap-1">
              <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
              Critical thinking about your experience and learning
            </p>
          </div>

          {/* Supervisor Feedback */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
              <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
              Supervisor Feedback
            </label>
            <textarea
              value={formData.supervisorFeedback}
              onChange={(e) => setFormData(prev => ({ ...prev, supervisorFeedback: e.target.value }))}
              placeholder="Enter any feedback from your supervisor or assessor..."
              rows={3}
              className="w-full h-24 bg-elec-card border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium p-4 resize-none"
            />
            <p className="text-xs text-elec-light/70 flex items-center gap-1">
              <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
              Optional: Add when feedback is available
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4 border-t border-elec-gray/20">
            <Button 
              type="submit" 
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/80 font-semibold py-3 rounded-xl transition-all duration-200"
            >
              {initialData ? "Update Entry" : "Create Entry"}
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onCancel}
              className="w-full text-elec-light/70 hover:text-elec-light hover:bg-elec-gray/20 font-medium py-3 rounded-xl transition-all duration-200"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioEntryForm;