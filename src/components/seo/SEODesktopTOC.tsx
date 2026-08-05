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
      <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
        On this page
      </p>
      <ul className="space-y-0.5 border-l border-white/[0.12]">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollTo(item.id)}
              aria-current={activeId === item.id ? 'true' : undefined}
              className={`-ml-px block w-full touch-manipulation border-l-2 py-1.5 pl-3 pr-2 text-left text-[13px] leading-snug text-white transition-colors ${
                activeId === item.id
                  ? 'border-elec-yellow font-semibold text-elec-yellow'
                  : 'border-transparent hover:border-white/40'
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
