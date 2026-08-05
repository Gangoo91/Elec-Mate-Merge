import { useCallback } from 'react';

export interface JumpNavItem {
  id: string;
  label: string;
}

interface SEOJumpNavProps {
  items: JumpNavItem[];
}

export function SEOJumpNav({ items }: SEOJumpNavProps) {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="sticky top-[calc(4rem+env(safe-area-inset-top,0px))] z-30 border-b border-white/[0.12] bg-[#0a0a0a]/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <nav aria-label="Jump to section" className="-mx-1 flex gap-1 overflow-x-auto scrollbar-hide py-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="h-11 shrink-0 touch-manipulation whitespace-nowrap rounded-lg px-3.5 text-[14px] font-medium text-white transition-colors hover:bg-white/[0.06]"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
