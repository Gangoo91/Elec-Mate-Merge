/**
 * CVTemplateShowcase - Template selection carousel
 * Visual preview of CV templates with selection
 */

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star,
  Briefcase,
  Palette,
  Zap,
} from "lucide-react";
import { templateCardVariants } from "./animations/variants";

export type CVTemplateId = "classic" | "modern" | "creative" | "technical";

export interface CVTemplate {
  id: CVTemplateId;
  name: string;
  description: string;
  icon: typeof Briefcase;
  popular?: boolean;
  color: string;
  accentColor: string;
  preview: {
    headerStyle: string;
    sectionStyle: string;
    accentElements: string;
  };
}

const CV_TEMPLATES: CVTemplate[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional professional layout, perfect for established electricians",
    icon: Briefcase,
    popular: true,
    color: "from-slate-600 to-slate-800",
    accentColor: "border-slate-500",
    preview: {
      headerStyle: "bg-slate-800",
      sectionStyle: "border-l-2 border-slate-600",
      accentElements: "bg-slate-600",
    },
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean minimalist design with bold headers",
    icon: Zap,
    color: "from-blue-600 to-blue-800",
    accentColor: "border-blue-500",
    preview: {
      headerStyle: "bg-gradient-to-r from-blue-600 to-blue-800",
      sectionStyle: "border-l-4 border-blue-500",
      accentElements: "bg-blue-500",
    },
  },
  {
    id: "creative",
    name: "Creative",
    description: "Stand out with unique styling and visual elements",
    icon: Palette,
    color: "from-purple-600 to-pink-600",
    accentColor: "border-purple-500",
    preview: {
      headerStyle: "bg-gradient-to-r from-purple-600 to-pink-600",
      sectionStyle: "rounded-lg bg-purple-500/10",
      accentElements: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
  },
  {
    id: "technical",
    name: "Technical",
    description: "Focused on skills and qualifications, ideal for specialists",
    icon: Star,
    color: "from-emerald-600 to-teal-600",
    accentColor: "border-emerald-500",
    preview: {
      headerStyle: "bg-gradient-to-r from-emerald-600 to-teal-600",
      sectionStyle: "border border-emerald-500/30 rounded",
      accentElements: "bg-emerald-500",
    },
  },
];

interface CVTemplateShowcaseProps {
  selectedTemplate: CVTemplateId;
  onSelectTemplate: (template: CVTemplateId) => void;
  className?: string;
}

// Mini CV preview component
const TemplateMiniPreview = ({ template }: { template: CVTemplate }) => (
  <div className="w-full aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-inner relative">
    {/* Header */}
    <div className={cn("h-1/4", template.preview.headerStyle)} />

    {/* Content */}
    <div className="p-2 space-y-2">
      {/* Name placeholder */}
      <div className="h-2 bg-gray-200 rounded w-2/3" />
      <div className="h-1.5 bg-gray-100 rounded w-1/2" />

      {/* Section 1 */}
      <div className={cn("mt-3 p-1.5", template.preview.sectionStyle)}>
        <div className="h-1.5 bg-gray-200 rounded w-1/3 mb-1" />
        <div className="h-1 bg-gray-100 rounded w-full" />
        <div className="h-1 bg-gray-100 rounded w-4/5 mt-0.5" />
      </div>

      {/* Section 2 */}
      <div className={cn("p-1.5", template.preview.sectionStyle)}>
        <div className="h-1.5 bg-gray-200 rounded w-1/4 mb-1" />
        <div className="h-1 bg-gray-100 rounded w-full" />
        <div className="h-1 bg-gray-100 rounded w-3/4 mt-0.5" />
      </div>

      {/* Skills dots */}
      <div className="flex gap-1 mt-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn("h-1.5 w-1.5 rounded-full", template.preview.accentElements)}
          />
        ))}
      </div>
    </div>
  </div>
);

const CVTemplateShowcase = ({
  selectedTemplate,
  onSelectTemplate,
  className,
}: CVTemplateShowcaseProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 200;
    const newPosition =
      direction === "left"
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;
    scrollRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-lg font-bold text-white">Choose Your Template</h3>
          <p className="text-sm text-white/50">Select a style that suits you</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            className="h-8 w-8 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            className="h-8 w-8 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Template Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {CV_TEMPLATES.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplate === template.id;

          return (
            <motion.div
              key={template.id}
              variants={templateCardVariants}
              initial="initial"
              animate={isSelected ? "selected" : "animate"}
              whileHover="hover"
              whileTap="tap"
              onClick={() => onSelectTemplate(template.id)}
              className={cn(
                "flex-shrink-0 w-44 snap-center cursor-pointer",
                "rounded-2xl border-2 overflow-hidden transition-all duration-300",
                isSelected
                  ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              )}
            >
              {/* Preview */}
              <div className="p-3">
                <TemplateMiniPreview template={template} />
              </div>

              {/* Info */}
              <div className="px-3 pb-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-lg flex items-center justify-center",
                        `bg-gradient-to-br ${template.color}`
                      )}
                    >
                      <Icon className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {template.name}
                    </span>
                  </div>
                  {template.popular && (
                    <Badge className="bg-amber-500/20 border-amber-500/30 text-amber-300 text-[8px] px-1.5">
                      Popular
                    </Badge>
                  )}
                </div>

                <p className="text-[10px] text-white/50 line-clamp-2">
                  {template.description}
                </p>

                {/* Selected indicator */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-1.5 text-blue-400"
                    >
                      <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 text-white" />
                      </div>
                      <span className="text-xs font-medium">Selected</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected template details */}
      <AnimatePresence mode="wait">
        {selectedTemplate && (
          <motion.div
            key={selectedTemplate}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white/[0.03] border border-white/10 rounded-xl p-4"
          >
            {(() => {
              const template = CV_TEMPLATES.find((t) => t.id === selectedTemplate);
              if (!template) return null;
              const Icon = template.icon;

              return (
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      `bg-gradient-to-br ${template.color}`
                    )}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">{template.name} Template</h4>
                      {template.popular && (
                        <Sparkles className="h-4 w-4 text-amber-400" />
                      )}
                    </div>
                    <p className="text-sm text-white/60">{template.description}</p>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { CV_TEMPLATES };
export default CVTemplateShowcase;
