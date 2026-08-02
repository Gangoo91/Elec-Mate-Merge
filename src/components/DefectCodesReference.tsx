import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const defectCodes = [
  {
    code: 'C1',
    label: 'Danger present',
    description: 'Risk of injury. Immediate remedial action is necessary',
    badge: 'bg-red-600 text-white',
  },
  {
    code: 'C2',
    label: 'Potentially dangerous',
    description: 'Urgent remedial action is necessary',
    badge: 'bg-orange-500 text-white',
  },
  {
    code: 'C3',
    label: 'Improvement recommended',
    description: 'Advisory only — does not affect the overall assessment',
    badge: 'bg-yellow-500 text-black',
  },
  {
    code: 'FI',
    label: 'Further investigation',
    description: 'Further investigation is advised',
    badge: 'bg-blue-600 text-white',
  },
  {
    code: 'N/A',
    label: 'Not applicable',
    description: 'Not applicable to this installation',
    badge: 'bg-white/[0.15] text-white',
  },
  {
    code: 'LIM',
    label: 'Limitation',
    description: 'Limitation noted during inspection',
    badge: 'bg-purple-600 text-white',
  },
];

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className={cn(
      'h-4 w-4 shrink-0 text-white transition-transform duration-200',
      open && 'rotate-180'
    )}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

interface DefectCodesReferenceProps {
  defaultOpen?: boolean;
}

const DefectCodesReference = ({ defaultOpen = false }: DefectCodesReferenceProps) => {
  const haptic = useHaptic();
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <section className={cardCn}>
      <Collapsible
        open={isOpen}
        onOpenChange={(open) => {
          haptic.light();
          setIsOpen(open);
        }}
      >
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-3 text-left touch-manipulation"
          >
            <h2 className="text-[15px] font-semibold tracking-tight text-white">
              Defect classification
            </h2>
            <Chevron open={isOpen} />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="mt-4 space-y-3">
            {defectCodes.map((code) => (
              <div key={code.code} className="flex items-center gap-3">
                <span
                  className={cn(
                    'flex h-7 w-12 shrink-0 items-center justify-center rounded-lg text-[12px] font-bold',
                    code.badge
                  )}
                >
                  {code.code}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-medium text-white">{code.label}</span>
                  <p className="text-[12px] leading-snug text-white/80">{code.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};

export default DefectCodesReference;
