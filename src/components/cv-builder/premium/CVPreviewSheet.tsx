/**
 * CVPreviewSheet - Full-screen CV preview with zoom and export
 * Supports pinch-to-zoom and template switching
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  X,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Edit3,
  Printer,
  FileText,
  Check,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Save,
} from "lucide-react";
import { sheetVariants, fadeUpVariants } from "./animations/variants";
import type { CVData } from "../types";
import type { CVTemplateId } from "./CVTemplateShowcase";

interface CVPreviewSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CVData;
  template: CVTemplateId;
  onDownload?: () => Promise<void>;
  onEditSection?: (section: string) => void;
  onShare?: () => void;
  onSave?: () => Promise<void>;
  className?: string;
}

// Validation helper
interface ValidationItem {
  section: string;
  label: string;
  isComplete: boolean;
  message: string;
  priority: 'required' | 'recommended';
}

const validateCV = (cvData: CVData): { score: number; items: ValidationItem[] } => {
  const items: ValidationItem[] = [
    {
      section: 'personal-info',
      label: 'Full Name',
      isComplete: !!cvData.personalInfo.fullName.trim(),
      message: 'Add your full name',
      priority: 'required',
    },
    {
      section: 'personal-info',
      label: 'Email',
      isComplete: !!cvData.personalInfo.email.trim() && cvData.personalInfo.email.includes('@'),
      message: 'Add a valid email address',
      priority: 'required',
    },
    {
      section: 'personal-info',
      label: 'Phone Number',
      isComplete: !!cvData.personalInfo.phone.trim(),
      message: 'Add your phone number',
      priority: 'recommended',
    },
    {
      section: 'personal-info',
      label: 'Professional Summary',
      isComplete: cvData.personalInfo.professionalSummary.length >= 50,
      message: 'Write a professional summary (at least 50 characters)',
      priority: 'recommended',
    },
    {
      section: 'experience',
      label: 'Work Experience',
      isComplete: cvData.experience.length > 0,
      message: 'Add at least one work experience entry',
      priority: 'required',
    },
    {
      section: 'experience',
      label: 'Job Descriptions',
      isComplete: cvData.experience.length > 0 && cvData.experience.every(e => e.description.length >= 30),
      message: 'Add detailed descriptions to all jobs',
      priority: 'recommended',
    },
    {
      section: 'education',
      label: 'Qualifications',
      isComplete: cvData.education.length > 0,
      message: 'Add your qualifications and certifications',
      priority: 'required',
    },
    {
      section: 'skills',
      label: 'Skills (minimum 3)',
      isComplete: cvData.skills.length >= 3,
      message: 'Add at least 3 relevant skills',
      priority: 'required',
    },
    {
      section: 'skills',
      label: 'Skills (recommended 5+)',
      isComplete: cvData.skills.length >= 5,
      message: 'Adding more skills improves your CV',
      priority: 'recommended',
    },
  ];

  const requiredItems = items.filter(i => i.priority === 'required');
  const completedRequired = requiredItems.filter(i => i.isComplete).length;
  const completedAll = items.filter(i => i.isComplete).length;

  // Score: 60% from required items, 40% from all items
  const requiredScore = (completedRequired / requiredItems.length) * 60;
  const allScore = (completedAll / items.length) * 40;
  const score = Math.round(requiredScore + allScore);

  return { score, items };
};

// Template-specific styles
const getTemplateStyles = (template: CVTemplateId) => {
  const styles = {
    classic: {
      header: "bg-slate-800 text-white",
      accent: "border-slate-600",
      section: "border-l-2 border-slate-600 pl-4",
      name: "text-slate-800",
    },
    modern: {
      header: "bg-gradient-to-r from-blue-600 to-blue-800 text-white",
      accent: "border-blue-500",
      section: "border-l-4 border-blue-500 pl-4",
      name: "text-blue-700",
    },
    creative: {
      header: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
      accent: "border-purple-500",
      section: "bg-purple-50 rounded-lg p-4",
      name: "text-purple-700",
    },
    technical: {
      header: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white",
      accent: "border-emerald-500",
      section: "border border-emerald-200 rounded p-4",
      name: "text-emerald-700",
    },
  };
  return styles[template];
};

// CV Render component based on template
const CVDocument = ({
  cvData,
  template,
  scale,
}: {
  cvData: CVData;
  template: CVTemplateId;
  scale: number;
}) => {
  const styles = getTemplateStyles(template);

  return (
    <div
      className="bg-white shadow-2xl mx-auto transition-transform duration-200"
      style={{
        width: "210mm",
        minHeight: "297mm",
        transform: `scale(${scale})`,
        transformOrigin: "top center",
      }}
    >
      {/* Header */}
      <div className={cn("p-8", styles.header)}>
        <h1 className="text-3xl font-bold">{cvData.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-sm opacity-90">
          {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
          {cvData.personalInfo.phone && <span>{cvData.personalInfo.phone}</span>}
          {cvData.personalInfo.address && <span>{cvData.personalInfo.address}</span>}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Professional Summary */}
        {cvData.personalInfo.professionalSummary && (
          <section className={styles.section}>
            <h2 className={cn("text-lg font-bold mb-2", styles.name)}>Professional Summary</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {cvData.personalInfo.professionalSummary}
            </p>
          </section>
        )}

        {/* Experience */}
        {cvData.experience.length > 0 && (
          <section className={styles.section}>
            <h2 className={cn("text-lg font-bold mb-3", styles.name)}>Work Experience</h2>
            <div className="space-y-4">
              {cvData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{exp.jobTitle}</h3>
                      <p className="text-gray-600 text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm mt-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <section className={styles.section}>
            <h2 className={cn("text-lg font-bold mb-3", styles.name)}>Education & Qualifications</h2>
            <div className="space-y-3">
              {cvData.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{edu.qualification}</h3>
                    <p className="text-gray-600 text-sm">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-gray-500">{edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {cvData.skills.length > 0 && (
          <section className={styles.section}>
            <h2 className={cn("text-lg font-bold mb-3", styles.name)}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                <span
                  key={index}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm",
                    template === "classic" && "bg-slate-100 text-slate-700",
                    template === "modern" && "bg-blue-100 text-blue-700",
                    template === "creative" && "bg-purple-100 text-purple-700",
                    template === "technical" && "bg-emerald-100 text-emerald-700"
                  )}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {cvData.certifications.length > 0 && (
          <section className={styles.section}>
            <h2 className={cn("text-lg font-bold mb-3", styles.name)}>Certifications</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {cvData.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

const CVPreviewSheet = ({
  isOpen,
  onClose,
  cvData,
  template,
  onDownload,
  onEditSection,
  onShare,
  onSave,
  className,
}: CVPreviewSheetProps) => {
  const [scale, setScale] = useState(0.5);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showValidation, setShowValidation] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate validation score
  const validation = validateCV(cvData);
  const incompleteRequired = validation.items.filter(i => i.priority === 'required' && !i.isComplete);
  const incompleteRecommended = validation.items.filter(i => i.priority === 'recommended' && !i.isComplete);

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.1, 1));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.1, 0.3));
  const handleFitToScreen = () => setScale(0.5);

  const handleDownload = async () => {
    if (!onDownload) return;
    setIsDownloading(true);
    try {
      await onDownload();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSave = async () => {
    if (!onSave) return;
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Score color based on completion
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-500/20 border-emerald-500/30';
    if (score >= 60) return 'bg-amber-500/20 border-amber-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl bg-background max-h-[95vh] outline-none">
          {/* Drag handle */}
          <div className="flex justify-center pt-4 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h2 className="font-bold text-white">CV Preview</h2>
                <p className="text-xs text-white/50 capitalize">{template} Template</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="hidden sm:flex items-center gap-1 bg-white/5 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleZoomOut}
                  className="h-8 w-8 text-white/60 hover:text-white"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-xs text-white/60 w-12 text-center">
                  {Math.round(scale * 100)}%
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleZoomIn}
                  className="h-8 w-8 text-white/60 hover:text-white"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFitToScreen}
                  className="h-8 w-8 text-white/60 hover:text-white"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-10 w-10 rounded-xl text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Validation Panel */}
          {showValidation && (incompleteRequired.length > 0 || incompleteRecommended.length > 0) && (
            <div className="px-4 sm:px-6 py-3 bg-black/30 border-b border-white/10">
              <div className="flex items-start gap-4">
                {/* Score Circle */}
                <div className={cn("flex-shrink-0 w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center", getScoreBg(validation.score))}>
                  <span className={cn("text-xl font-bold", getScoreColor(validation.score))}>{validation.score}%</span>
                  <span className="text-[10px] text-white/50">Complete</span>
                </div>

                {/* Incomplete Items */}
                <div className="flex-1 min-w-0">
                  {incompleteRequired.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-medium text-red-400 mb-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Required ({incompleteRequired.length})
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {incompleteRequired.slice(0, 3).map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => onEditSection?.(item.section)}
                            className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-300 hover:bg-red-500/20 transition-colors"
                          >
                            {item.label}
                          </button>
                        ))}
                        {incompleteRequired.length > 3 && (
                          <span className="text-xs text-red-300/60 px-2 py-1">
                            +{incompleteRequired.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {incompleteRecommended.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-amber-400 mb-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Recommended ({incompleteRecommended.length})
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {incompleteRecommended.slice(0, 2).map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => onEditSection?.(item.section)}
                            className="text-xs px-2 py-1 rounded bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-colors"
                          >
                            {item.label}
                          </button>
                        ))}
                        {incompleteRecommended.length > 2 && (
                          <span className="text-xs text-amber-300/60 px-2 py-1">
                            +{incompleteRecommended.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Dismiss Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowValidation(false)}
                  className="text-white/40 hover:text-white/60 -mr-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* All Complete Banner */}
          {showValidation && incompleteRequired.length === 0 && incompleteRecommended.length === 0 && (
            <div className="px-4 sm:px-6 py-3 bg-emerald-500/10 border-b border-emerald-500/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-300">Your CV is complete!</p>
                  <p className="text-xs text-emerald-300/60">All required and recommended sections are filled in.</p>
                </div>
              </div>
            </div>
          )}

          {/* Preview Container */}
          <div
            ref={containerRef}
            className="flex-1 overflow-auto bg-gray-900/50 p-4 sm:p-8"
          >
            <CVDocument cvData={cvData} template={template} scale={scale} />
          </div>

          {/* Action Bar */}
          <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-6 pb-6 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Edit Sections */}
              {onEditSection && (
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                  {["Personal Info", "Experience", "Education", "Skills"].map((section) => (
                    <Button
                      key={section}
                      variant="outline"
                      size="sm"
                      onClick={() => onEditSection(section.toLowerCase().replace(" ", "-"))}
                      className="flex-shrink-0 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <Edit3 className="h-3.5 w-3.5 mr-1.5" />
                      {section}
                    </Button>
                  ))}
                </div>
              )}

              {/* Main Actions */}
              <div className="flex gap-3 sm:ml-auto">
                <Button
                  variant="outline"
                  onClick={handlePrint}
                  className="flex-1 sm:flex-none h-11 border-white/20 text-white hover:text-white hover:bg-white/10 rounded-xl"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>

                {onShare && (
                  <Button
                    variant="outline"
                    onClick={onShare}
                    className="h-11 px-4 border-white/20 text-white hover:text-white hover:bg-white/10 rounded-xl"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                )}

                {onSave && (
                  <Button
                    variant="outline"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="h-11 px-4 border-emerald-500/30 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl"
                  >
                    {isSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Save</span>
                      </>
                    )}
                  </Button>
                )}

                {onDownload && (
                  <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex-1 sm:flex-none h-11 bg-gradient-to-r from-blue-500 to-cyan-500 text-black hover:from-blue-400 hover:to-cyan-400 font-semibold shadow-lg shadow-blue-500/25 rounded-xl"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default CVPreviewSheet;
