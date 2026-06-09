import { useState, useEffect, useCallback } from 'react';
import type { TOCItem } from '@/components/seo/SEOTableOfContents';

interface SEODesktopTOCProps {
  items: TOCItem[];
}

/**
 * Sticky "On this page" navigation for desktop (lg+). Renders inside the right
 * column of the SEOPageShell grid and scroll-spies the active section. Hidden
 * below lg — mobile/tablet use the floating Contents bottom sheet instead.
 */
export function SEODesktopTOC({ items }: SEODesktopTOCProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[calc(5rem+env(safe-area-inset-top,0px))] max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-hide"
    >
      <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
        On this page
      </p>
      <ul className="space-y-0.5 border-l border-white/[0.08]">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollTo(item.id)}
              className={`-ml-px block w-full border-l-2 text-left pl-3 pr-2 py-1.5 text-[13px] leading-snug transition-colors touch-manipulation ${
                activeId === item.id
                  ? 'border-elec-yellow text-elec-yellow font-medium'
                  : 'border-transparent text-white/55 hover:text-white hover:border-white/30'
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
