/**
 * TemplateSelector — the six starting points, as a grid of chips.
 *
 * Was six 80px rows inside a 320px scroll box, behind a collapsed accordion:
 * each row an icon tile, the full title, a description, and the first 60
 * characters of the sample in italics with an ellipsis. Three lines of
 * explanation for something whose entire job is to put a paragraph in the box
 * below so you can edit it.
 *
 * It also carried two colour systems — `urgencyConfig` (red / amber / green)
 * and `categoryConfig` (blue / red / purple / green / orange / slate) — nine
 * colour declarations to label six buttons. Both have gone. The urgency each
 * template implies is still applied to the form when you pick one; it just
 * isn't painted on the chip, because the point of the chip is the scenario.
 *
 * The page shows these only while the findings box is EMPTY. Picking one
 * overwrites whatever is in that box, so offering it next to text someone has
 * just typed is offering to destroy their work.
 */

import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

export interface Template {
  id: string;
  /** Short enough to sit on one line of a half-width chip. */
  title: string;
  /** Applied to the form's tone + urgency when this one is picked. */
  urgency: 'low' | 'medium' | 'high';
  /** Dropped into the findings box, to be edited. */
  sample: string;
}

const TEMPLATES: Template[] = [
  {
    id: 'eicr-c2',
    title: 'EICR C2 finding',
    urgency: 'high',
    sample:
      'I found a fault with the consumer unit that needs immediate attention. The main switch is damaged and poses a potential fire risk. This is classified as Code C2 — potentially dangerous.',
  },
  {
    id: 'eicr-satisfactory',
    title: 'EICR satisfactory',
    urgency: 'low',
    sample:
      'Good news — your electrical installation has passed all tests. The wiring is in good condition and meets current safety standards. No urgent work is required.',
  },
  {
    id: 'circuit-fault',
    title: 'Circuit fault',
    urgency: 'medium',
    sample:
      "I've identified the cause of your electrical problem. The ring circuit in your kitchen has a break, causing some sockets to lose power. This requires rewiring the affected section.",
  },
  {
    id: 'consumer-unit-upgrade',
    title: 'Consumer unit upgrade',
    urgency: 'medium',
    sample:
      "Your fuseboard is the old rewirable type from the 1980s. Modern consumer units have RCD protection that can save lives by instantly cutting power if there's a fault.",
  },
  {
    id: 'pir-maintenance',
    title: 'Routine maintenance',
    urgency: 'low',
    sample:
      "During the periodic inspection, I found minor issues that don't affect safety but should be addressed during routine maintenance to prevent future problems.",
  },
  {
    id: 'quote-explanation',
    title: 'Quote breakdown',
    urgency: 'low',
    sample:
      'The quote includes materials, labour and certification. The work involves installing new RCD protection, upgrading outdated wiring, and providing electrical safety certificates.',
  },
];

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  const haptic = useHaptic();

  return (
    <div className="grid grid-cols-2 gap-2">
      {TEMPLATES.map((template) => (
        <button
          key={template.id}
          type="button"
          onClick={() => {
            haptic.light();
            onSelectTemplate(template);
          }}
          className={cn(
            'min-h-11 rounded-lg border border-white/[0.12] bg-white/[0.04] px-3 py-2.5 text-left',
            'text-[12.5px] font-medium leading-tight text-white',
            'transition-colors duration-150 touch-manipulation select-none',
            '[-webkit-tap-highlight-color:transparent] active:scale-[0.97] active:bg-white/[0.09]',
            'hover:border-white/[0.28] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60'
          )}
        >
          {template.title}
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
