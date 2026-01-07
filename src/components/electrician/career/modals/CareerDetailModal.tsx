import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ExternalLink, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useCallback } from "react";

interface ContentSection {
  title: string;
  content: string | string[];
  icon?: LucideIcon;
}

interface Resource {
  title: string;
  url?: string;
  description?: string;
}

interface ModalContent {
  overview: string;
  sections: ContentSection[];
  resources?: Resource[];
  tips?: string[];
}

interface CareerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  badge?: string;
  icon?: LucideIcon;
  color?: "yellow" | "blue" | "green" | "purple" | "orange" | "amber" | "red";
  content: ModalContent;
  ctaText?: string;
  ctaAction?: () => void;
}

const colorConfig = {
  yellow: {
    accent: "bg-elec-yellow",
    accentText: "text-elec-yellow",
    accentBg: "bg-elec-yellow/10",
    accentBorder: "border-elec-yellow/30",
    badge: "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30",
    cta: "bg-elec-yellow text-black hover:bg-elec-yellow/90",
  },
  blue: {
    accent: "bg-blue-500",
    accentText: "text-blue-400",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/30",
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    cta: "bg-blue-500 text-white hover:bg-blue-600",
  },
  green: {
    accent: "bg-green-500",
    accentText: "text-green-400",
    accentBg: "bg-green-500/10",
    accentBorder: "border-green-500/30",
    badge: "bg-green-500/20 text-green-400 border-green-500/30",
    cta: "bg-green-500 text-white hover:bg-green-600",
  },
  purple: {
    accent: "bg-purple-500",
    accentText: "text-purple-400",
    accentBg: "bg-purple-500/10",
    accentBorder: "border-purple-500/30",
    badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    cta: "bg-purple-500 text-white hover:bg-purple-600",
  },
  orange: {
    accent: "bg-orange-500",
    accentText: "text-orange-400",
    accentBg: "bg-orange-500/10",
    accentBorder: "border-orange-500/30",
    badge: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    cta: "bg-orange-500 text-white hover:bg-orange-600",
  },
  amber: {
    accent: "bg-amber-500",
    accentText: "text-amber-400",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30",
    badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    cta: "bg-amber-500 text-black hover:bg-amber-600",
  },
  red: {
    accent: "bg-red-500",
    accentText: "text-red-400",
    accentBg: "bg-red-500/10",
    accentBorder: "border-red-500/30",
    badge: "bg-red-500/20 text-red-400 border-red-500/30",
    cta: "bg-red-500 text-white hover:bg-red-600",
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    y: "100%",
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    y: "100%",
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

const desktopModalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.15,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.05,
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  }),
};

const CareerDetailModal = ({
  isOpen,
  onClose,
  title,
  description,
  badge,
  icon: Icon,
  color = "yellow",
  content,
  ctaText,
  ctaAction,
}: CareerDetailModalProps) => {
  const colors = colorConfig[color];

  // Handle escape key
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  const renderContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-2">
          {content.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-white">
              <ChevronRight className="h-4 w-4 text-white/60 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }
    return <p className="text-sm text-white leading-relaxed">{content}</p>;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Mobile: Full screen slide up */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 sm:hidden flex flex-col bg-elec-gray"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-elec-gray/95 backdrop-blur-lg border-b border-white/10">
              <div className={cn("h-1", colors.accent)} />
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {Icon && (
                    <div className={cn("p-2 rounded-lg", colors.accentBg)}>
                      <Icon className={cn("h-5 w-5", colors.accentText)} />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-white truncate">{title}</h2>
                    {badge && (
                      <Badge variant="outline" className={cn("text-[10px] mt-1", colors.badge)}>
                        {badge}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-9 w-9 text-white hover:text-white hover:bg-white/10 flex-shrink-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-6 pb-24">
                {/* Overview */}
                <motion.div custom={0} variants={contentVariants} initial="hidden" animate="visible">
                  <p className="text-sm text-white leading-relaxed">{content.overview}</p>
                </motion.div>

                {/* Sections */}
                {content.sections.map((section, idx) => (
                  <motion.div
                    key={section.title}
                    custom={idx + 1}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className={cn("p-4 rounded-xl border", colors.accentBorder, colors.accentBg)}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {section.icon && (
                        <section.icon className={cn("h-4 w-4", colors.accentText)} />
                      )}
                      <h3 className="font-semibold text-white text-sm">{section.title}</h3>
                    </div>
                    {renderContent(section.content)}
                  </motion.div>
                ))}

                {/* Tips */}
                {content.tips && content.tips.length > 0 && (
                  <motion.div
                    custom={content.sections.length + 1}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <h3 className="font-semibold text-white text-sm mb-3">Pro Tips</h3>
                    <ul className="space-y-2">
                      {content.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-white">
                          <span className={cn("text-xs font-bold mt-0.5", colors.accentText)}>
                            {idx + 1}.
                          </span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Resources */}
                {content.resources && content.resources.length > 0 && (
                  <motion.div
                    custom={content.sections.length + 2}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h3 className="font-semibold text-white text-sm mb-3">Resources</h3>
                    <div className="space-y-2">
                      {content.resources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                        >
                          <div>
                            <div className="text-sm font-medium text-white group-hover:text-white/90">
                              {resource.title}
                            </div>
                            {resource.description && (
                              <div className="text-xs text-white">{resource.description}</div>
                            )}
                          </div>
                          <ExternalLink className="h-4 w-4 text-white/60 group-hover:text-white" />
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Fixed Bottom CTA */}
            {ctaText && ctaAction && (
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-elec-gray/95 backdrop-blur-lg border-t border-white/10">
                <Button onClick={ctaAction} className={cn("w-full", colors.cta)}>
                  {ctaText}
                </Button>
              </div>
            )}
          </motion.div>

          {/* Desktop: Centered modal */}
          <motion.div
            variants={desktopModalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 hidden sm:flex items-center justify-center p-4"
          >
            <div className="w-full max-w-2xl max-h-[85vh] bg-elec-gray rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
              {/* Header */}
              <div className="flex-shrink-0 border-b border-white/10">
                <div className={cn("h-1", colors.accent)} />
                <div className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {Icon && (
                      <div className={cn("p-3 rounded-xl", colors.accentBg)}>
                        <Icon className={cn("h-6 w-6", colors.accentText)} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-semibold text-white">{title}</h2>
                      {description && (
                        <p className="text-sm text-white mt-1">{description}</p>
                      )}
                      {badge && (
                        <Badge variant="outline" className={cn("text-xs mt-2", colors.badge)}>
                          {badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-10 w-10 text-white hover:text-white hover:bg-white/10 flex-shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-5 space-y-6">
                  {/* Overview */}
                  <motion.div custom={0} variants={contentVariants} initial="hidden" animate="visible">
                    <p className="text-white leading-relaxed">{content.overview}</p>
                  </motion.div>

                  {/* Sections Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.sections.map((section, idx) => (
                      <motion.div
                        key={section.title}
                        custom={idx + 1}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        className={cn(
                          "p-4 rounded-xl border",
                          colors.accentBorder,
                          colors.accentBg,
                          content.sections.length === 1 ? "md:col-span-2" : ""
                        )}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          {section.icon && (
                            <section.icon className={cn("h-4 w-4", colors.accentText)} />
                          )}
                          <h3 className="font-semibold text-white">{section.title}</h3>
                        </div>
                        {renderContent(section.content)}
                      </motion.div>
                    ))}
                  </div>

                  {/* Tips */}
                  {content.tips && content.tips.length > 0 && (
                    <motion.div
                      custom={content.sections.length + 1}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      className="p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <h3 className="font-semibold text-white mb-3">Pro Tips</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {content.tips.map((tip, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-white">
                            <span className={cn("text-xs font-bold mt-0.5", colors.accentText)}>
                              {idx + 1}.
                            </span>
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Resources */}
                  {content.resources && content.resources.length > 0 && (
                    <motion.div
                      custom={content.sections.length + 2}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <h3 className="font-semibold text-white mb-3">Resources</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {content.resources.map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                          >
                            <div>
                              <div className="text-sm font-medium text-white group-hover:text-white/90">
                                {resource.title}
                              </div>
                              {resource.description && (
                                <div className="text-xs text-white">{resource.description}</div>
                              )}
                            </div>
                            <ExternalLink className="h-4 w-4 text-white/60 group-hover:text-white" />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Footer CTA */}
              {ctaText && ctaAction && (
                <div className="flex-shrink-0 p-5 border-t border-white/10 bg-elec-gray/50">
                  <Button onClick={ctaAction} className={cn("w-full", colors.cta)}>
                    {ctaText}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CareerDetailModal;
