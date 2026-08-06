import { useState, useEffect, useCallback } from 'react';
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
    <ul className="divide-y divide-white/[0.08]">
      {items.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => scrollTo(item.id)}
            aria-current={activeId === item.id ? 'true' : undefined}
            className={`flex min-h-[52px] w-full touch-manipulation items-center px-5 text-left text-[15px] text-white transition-colors hover:bg-white/[0.04] ${
              activeId === item.id ? 'font-semibold text-elec-yellow' : ''
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
      {/* Quiet dark control, not a yellow pill. Yellow is the page's CTA
          colour and a floating "Contents" button should never outshout it —
          this is navigation, not the action we want. No glow, no icon. */}
      {/* data-bottom-floating: the public sticky CTA is pinned to bottom-0 and is
          100px tall, so this has to ride above it rather than sit underneath.
          See body.has-sticky-cta in index.css. */}
      <div
        data-bottom-floating
        className="fixed bottom-4 right-4 z-40"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button className="h-11 touch-manipulation rounded-xl border border-white/20 bg-[#0a0a0a]/95 px-4 text-[14px] font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/[0.06]">
              Contents
            </button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.12] bg-[#0a0a0a] p-0"
          >
            <SheetHeader className="border-b border-white/[0.12] px-5 pb-3 pt-5">
              <SheetTitle className="text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                Contents
              </SheetTitle>
            </SheetHeader>
            <div className="h-[calc(85vh-4rem)] overflow-y-auto">{tocList}</div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
