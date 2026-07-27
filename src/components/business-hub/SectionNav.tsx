import { useEffect, useRef, useCallback } from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type AccentColor = 'yellow' | 'blue' | 'green' | 'purple' | 'orange' | 'emerald' | 'rose' | 'cyan';

const accentConfig: Record<
  AccentColor,
  { activeBg: string; activeText: string; activeIcon: string; activeBorder: string; ring: string }
> = {
  yellow: {
    activeBg: 'bg-yellow-400/10',
    activeText: 'text-yellow-400',
    activeIcon: 'text-yellow-400',
    activeBorder: 'border-yellow-400/30',
    ring: 'focus-visible:ring-yellow-400/50',
  },
  blue: {
    activeBg: 'bg-blue-400/10',
    activeText: 'text-blue-400',
    activeIcon: 'text-blue-400',
    activeBorder: 'border-blue-400/30',
    ring: 'focus-visible:ring-blue-400/50',
  },
  green: {
    activeBg: 'bg-green-400/10',
    activeText: 'text-green-400',
    activeIcon: 'text-green-400',
    activeBorder: 'border-green-400/30',
    ring: 'focus-visible:ring-green-400/50',
  },
  purple: {
    activeBg: 'bg-purple-400/10',
    activeText: 'text-purple-400',
    activeIcon: 'text-purple-400',
    activeBorder: 'border-purple-400/30',
    ring: 'focus-visible:ring-purple-400/50',
  },
  orange: {
    activeBg: 'bg-orange-400/10',
    activeText: 'text-orange-400',
    activeIcon: 'text-orange-400',
    activeBorder: 'border-orange-400/30',
    ring: 'focus-visible:ring-orange-400/50',
  },
  emerald: {
    activeBg: 'bg-emerald-400/10',
    activeText: 'text-emerald-400',
    activeIcon: 'text-emerald-400',
    activeBorder: 'border-emerald-400/30',
    ring: 'focus-visible:ring-emerald-400/50',
  },
  rose: {
    activeBg: 'bg-rose-400/10',
    activeText: 'text-rose-400',
    activeIcon: 'text-rose-400',
    activeBorder: 'border-rose-400/30',
    ring: 'focus-visible:ring-rose-400/50',
  },
  cyan: {
    activeBg: 'bg-cyan-400/10',
    activeText: 'text-cyan-400',
    activeIcon: 'text-cyan-400',
    activeBorder: 'border-cyan-400/30',
    ring: 'focus-visible:ring-cyan-400/50',
  },
};

interface Section {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface SectionNavProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  accentColor?: AccentColor;
  className?: string;
}

const SectionNav = ({
  sections,
  activeSection,
  onSectionChange,
  accentColor = 'yellow',
  className,
}: SectionNavProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isScrollingRef = useRef(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const accent = accentConfig[accentColor];

  // Stable ref for onSectionChange to avoid re-creating the observer on every render
  const onSectionChangeRef = useRef(onSectionChange);
  onSectionChangeRef.current = onSectionChange;

  // Throttle replaceState calls — prevent >100 calls per 10 seconds
  const lastChangeRef = useRef<string>('');
  const lastChangeTimeRef = useRef<number>(0);

  // Set up intersection observer for auto-tracking active section
  // Only depends on section IDs (stringified), NOT on onSectionChange callback
  const sectionIds = sections.map((s) => s.id).join(',');
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;

        const now = Date.now();
        // Throttle: ignore if less than 150ms since last change
        if (now - lastChangeTimeRef.current < 150) return;

        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id !== lastChangeRef.current) {
            lastChangeRef.current = entry.target.id;
            lastChangeTimeRef.current = now;
            onSectionChangeRef.current(entry.target.id);
            break; // Only process the first visible section
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sectionIds.split(',').forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [sectionIds]);

  // Scroll active tab into view when it changes
  useEffect(() => {
    if (activeTabRef.current && tabsRef.current) {
      const container = tabsRef.current;
      const activeElement = activeTabRef.current;
      const containerWidth = container.offsetWidth;
      const elementLeft = activeElement.offsetLeft;
      const elementWidth = activeElement.offsetWidth;

      const scrollPosition = elementLeft - containerWidth / 2 + elementWidth / 2;
      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }, [activeSection]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        onSectionChange(sectionId);

        isScrollingRef.current = true;

        const yOffset = -120;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });

        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
      }
    },
    [onSectionChange]
  );

  return (
    <div
      className={cn(
        'sticky top-14 z-40',
        'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06] p-4',
        className
      )}
    >
      <div className="relative">
        {/* Gradient fade indicators */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* Scrollable tabs */}
        <div
          ref={tabsRef}
          className="flex gap-0 overflow-x-auto px-1 -mx-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = section.id === activeSection;

            return (
              <button
                type="button"
                key={section.id}
                ref={isActive ? activeTabRef : null}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  'relative px-1 pb-2.5 pt-2 mx-3 first:ml-1 whitespace-nowrap',
                  'min-h-[44px] text-[13px] tracking-tight transition-colors duration-200',
                  'touch-manipulation border-b-2',
                  'focus:outline-none focus-visible:ring-2',
                  accent.ring,
                  isActive
                    ? 'text-white font-semibold border-elec-yellow'
                    : 'text-white/60 font-medium border-transparent hover:text-white'
                )}
              >
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionNav;
