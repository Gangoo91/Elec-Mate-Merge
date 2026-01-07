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
  className?: string;
}

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
  className,
}: CVPreviewSheetProps) => {
  const [scale, setScale] = useState(0.5);
  const [isDownloading, setIsDownloading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handlePrint = () => {
    window.print();
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
