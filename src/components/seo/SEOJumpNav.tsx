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
    <div className="sticky top-16 z-30 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <nav className="flex gap-1 overflow-x-auto scrollbar-hide py-3 -mx-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="whitespace-nowrap px-3.5 py-2 text-sm font-medium text-white hover:text-yellow-400 hover:bg-white/5 rounded-lg transition-colors touch-manipulation shrink-0"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
