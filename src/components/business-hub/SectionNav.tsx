import { useEffect, useRef, useCallback } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface SectionNavProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  className?: string;
}

const SectionNav = ({
  sections,
  activeSection,
  onSectionChange,
  className,
}: SectionNavProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isScrollingRef = useRef(false);

  // Set up intersection observer for auto-tracking active section
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Don't update during programmatic scroll
        if (isScrollingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onSectionChange(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [sections, onSectionChange]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Immediately update active section
      onSectionChange(sectionId);

      // Prevent observer from firing during scroll
      isScrollingRef.current = true;

      const yOffset = -120; // Account for sticky header + nav
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });

      // Re-enable observer after scroll completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  }, [onSectionChange]);

  return (
    <div
      className={cn(
        "sticky top-14 z-40",
        "bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10 p-4",
        className
      )}
    >
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = section.id === activeSection;

          return (
            <button
              type="button"
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg",
                "text-xs sm:text-sm font-medium transition-all duration-200",
                "touch-manipulation active:scale-[0.97]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50",
                isActive
                  ? "bg-yellow-400/10 text-white border border-yellow-400/30"
                  : "bg-white/5 text-white/90 hover:text-white hover:bg-white/10"
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "h-4 w-4 flex-shrink-0",
                    isActive ? "text-yellow-400" : "text-white/80"
                  )}
                />
              )}
              <span>{section.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SectionNav;
