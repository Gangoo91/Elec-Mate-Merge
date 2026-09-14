import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';
import type { Tool } from '@/data/professional-tools/types';

interface ToolListSectionProps {
  id: string;
  title: string;
  tools: Tool[];
  /** Retained for call-site compatibility — nothing collapses any more. */
  defaultOpen?: boolean;
  accentColour?: string;
}

const PRIORITY: Record<Tool['priority'], { label: string; className: string }> = {
  essential: {
    label: 'Essential',
    // The one thing an apprentice is scanning for: what do I have to own.
    className: 'border-elec-yellow/45 bg-elec-yellow/10 text-elec-yellow',
  },
  recommended: {
    label: 'Recommended',
    className: 'border-white/15 bg-white/[0.04] text-white',
  },
  'nice-to-have': {
    label: 'Nice to have',
    className: 'border-white/10 bg-white/[0.02] text-white',
  },
};

const Chip = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span
    className={cn(
      'rounded-md border px-2 py-0.5 text-[11px] font-medium leading-tight whitespace-nowrap',
      'border-white/10 bg-white/[0.03] text-white',
      className
    )}
  >
    {children}
  </span>
);

/**
 * A group of tools, laid out flat.
 *
 * 🔴 This used to be a `Collapsible` that defaulted to CLOSED, inside a panel
 * that itself only rendered once a chapter card was tapped. An apprentice
 * landing here saw six buttons and no content, and reaching one tool took two
 * taps — on the page whose entire job is answering "what do I actually buy".
 * The data was never the problem; all 77 tools were already written.
 *
 * Everything renders. The grid does the work the accordion was doing: on a
 * phone it is one column so the page still reads as a list, and from `sm:` up
 * it goes two-wide so the chapter is scannable instead of endless.
 */
const ToolListSection = ({ title, tools }: ToolListSectionProps) => {
  const essentials = tools.filter((t) => t.priority === 'essential').length;

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">{title}</h3>
        <span className="text-[12px] text-white">
          {tools.length} {tools.length === 1 ? 'tool' : 'tools'}
          {essentials > 0 && <> · {essentials} essential</>}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {tools.map((tool) => {
          const priority = PRIORITY[tool.priority];
          return (
            <article
              key={tool.name}
              className={cn(CARD_BASE, CARD_NEUTRAL, 'flex flex-col gap-2.5 p-4 sm:p-5')}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-[14.5px] font-semibold leading-tight tracking-tight text-white">
                  {tool.name}
                </h4>
                <Chip className={priority.className}>{priority.label}</Chip>
              </div>

              <p className="text-[13.5px] leading-relaxed text-white">{tool.description}</p>

              {/* Price and standard are the two facts people came for, so they
                  get their own row rather than being lost in the prose. */}
              <div className="flex flex-wrap items-center gap-1.5">
                <Chip className="border-white/15 bg-white/[0.05]">{tool.price}</Chip>
                {tool.standard && <Chip>{tool.standard}</Chip>}
              </div>

              {tool.brands.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tool.brands.map((brand) => (
                    <Chip key={brand}>{brand}</Chip>
                  ))}
                </div>
              )}

              {tool.apprenticeTip && (
                <div className="mt-auto rounded-lg border-l-[3px] border-l-elec-yellow border-y border-r border-white/[0.08] bg-white/[0.03] p-3">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                    On site
                  </span>
                  <p className="mt-1 text-[13px] leading-relaxed text-white">
                    {tool.apprenticeTip}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ToolListSection;
