import { useState, useEffect, useCallback } from 'react';
import { List } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export interface TOCItem {
  id: string;
  label: string;
}

interface SEOTableOfContentsProps {
  items: TOCItem[];
}

export function SEOTableOfContents({ items }: SEOTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

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
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setMobileOpen(false);
    }
  }, []);

  const tocList = (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => scrollTo(item.id)}
            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors touch-manipulation ${
              activeId === item.id
                ? 'text-yellow-400 bg-yellow-500/10 font-medium'
                : 'text-white hover:text-yellow-400 hover:bg-white/5'
            }`}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Floating button + bottom sheet (all breakpoints) */}
      <div className="fixed bottom-20 right-4 z-40 sm:bottom-6">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-3 bg-yellow-500 text-black font-semibold rounded-full shadow-lg shadow-yellow-500/25 touch-manipulation">
              <List className="w-4 h-4" />
              <span className="text-sm">Contents</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl bg-[#141414] border-white/10 p-0">
            <SheetHeader className="px-5 pt-5 pb-3 border-b border-white/10">
              <SheetTitle className="text-white text-left">Contents</SheetTitle>
            </SheetHeader>
            <div className="px-3 py-4 max-h-[60vh] overflow-y-auto">{tocList}</div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
