import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import DefectObservationsList from './DefectObservationsList';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import RaiseRemedialItemsSheet from '@/components/inspection/RaiseRemedialItemsSheet';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

interface DefectObservation {
  id: string;
  item: string;
  defectCode: 'C1' | 'C2' | 'C3' | 'FI' | 'N/A' | 'LIM';
  description: string;
  recommendation: string;
  rectified: boolean;
  inspectionItemId?: string;
}

interface DefectObservationsSectionProps {
  defectObservations: DefectObservation[];
  reportId: string;
  onAddObservation: () => void;
  onUpdateObservation: (
    id: string,
    field: keyof DefectObservation | '__BULK__',
    value: any
  ) => void;
  onRemoveObservation: (id: string) => void;
  certificateContext?: {
    certificateNumber?: string;
    certificateType?: 'eicr' | 'eic';
    installationAddress?: string;
    clientName?: string;
    clientPhone?: string;
    clientEmail?: string;
    inspectorName?: string;
    companyName?: string;
    companyPhone?: string;
    companyEmail?: string;
    registrationScheme?: string;
    registrationNumber?: string;
  };
  defaultOpen?: boolean;
}

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

const DefectObservationsSection = React.forwardRef<HTMLDivElement, DefectObservationsSectionProps>(
  (
    {
      defectObservations,
      reportId,
      onAddObservation,
      onUpdateObservation,
      onRemoveObservation,
      certificateContext,
      defaultOpen = true,
    },
    ref
  ) => {
    const haptic = useHaptic();
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [raiseOpen, setRaiseOpen] = useState(false);

    const handleAddObservation = () => {
      haptic.light();
      onAddObservation();
    };

    // Calculate stats
    const c1Count = defectObservations.filter((obs) => obs.defectCode === 'C1').length;
    const c2Count = defectObservations.filter((obs) => obs.defectCode === 'C2').length;
    const c3Count = defectObservations.filter((obs) => obs.defectCode === 'C3').length;
    const fiCount = defectObservations.filter((obs) => obs.defectCode === 'FI').length;
    const rectifiedCount = defectObservations.filter((obs) => obs.rectified).length;
    const totalCount = defectObservations.length;

    // Bulk-rectify — serves the satisfactory-after-remedial duplicate flow where
    // every coded defect from the original report has since been put right.
    const codeableObs = defectObservations.filter(
      (obs) => obs.defectCode === 'C1' || obs.defectCode === 'C2' || obs.defectCode === 'C3'
    );
    const unrectifiedCodeable = codeableObs.filter((obs) => !obs.rectified);
    const showMarkAllRectified = codeableObs.length >= 2 && unrectifiedCodeable.length > 0;

    // Anything coded and not yet put right is outstanding remedial work.
    const outstandingCount = defectObservations.filter(
      (obs) => !obs.rectified && obs.defectCode !== 'N/A' && obs.defectCode !== 'LIM'
    ).length;

    const handleMarkAllRectified = () => {
      haptic.success();
      unrectifiedCodeable.forEach((obs) => {
        onUpdateObservation(obs.id, 'rectified', true);
      });
    };

    return (
      <div ref={ref}>
        <RaiseRemedialItemsSheet
          open={raiseOpen}
          onOpenChange={setRaiseOpen}
          reportId={reportId}
          observations={defectObservations}
          customerName={certificateContext?.clientName}
          location={certificateContext?.installationAddress}
        />
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
                  Observations and defects
                  {totalCount > 0 && (
                    <span className="ml-2 font-medium text-white/80">({totalCount})</span>
                  )}
                </h2>
                <div className="flex items-center gap-3">
                  {totalCount > 0 && (
                    <span className="flex items-center gap-x-3 text-[12px]">
                      {c1Count > 0 && (
                        <span className="font-semibold text-red-400">{c1Count} C1</span>
                      )}
                      {c2Count > 0 && (
                        <span className="font-semibold text-orange-400">{c2Count} C2</span>
                      )}
                      {c3Count > 0 && (
                        <span className="font-semibold text-yellow-400">{c3Count} C3</span>
                      )}
                      {fiCount > 0 && (
                        <span className="font-semibold text-blue-400">{fiCount} FI</span>
                      )}
                    </span>
                  )}
                  <Chevron open={isOpen} />
                </div>
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="mt-4 space-y-4">
                {/* One contextual note line — the header chips already carry the
                    counts, so no separate summary banner repeating them. */}
                {(c1Count > 0 || c2Count > 0) && (
                  <p className="text-xs leading-relaxed text-red-300">
                    C1/C2 observations affect the overall assessment — immediate or
                    urgent remedial action is required.
                  </p>
                )}
                {rectifiedCount > 0 && (
                  <span className="block text-[12px] font-semibold text-green-400">
                    {rectifiedCount} rectified
                  </span>
                )}

                {/* Bulk rectify — quiet secondary; one tap marks every unrectified
                    C1/C2/C3 as rectified (satisfactory-after-remedial flow). */}
                {showMarkAllRectified && (
                  <button
                    type="button"
                    onClick={handleMarkAllRectified}
                    className="h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.06] text-sm font-medium text-white transition-all touch-manipulation active:scale-[0.98] sm:w-auto sm:px-6"
                  >
                    Mark all rectified
                  </button>
                )}

                {/*
                  A coded observation IS remedial work: found, classified, and
                  someone has to go back and put it right. It was being captured
                  properly here and going no further — 1,846 coded defects across
                  the certificates against 23 hand-typed snags. Raising them
                  writes tasks tagged `snagging`, so they land on the Snagging
                  page and, if a job is chosen, on that job's task list too.
                */}
                {outstandingCount > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      haptic.light();
                      setRaiseOpen(true);
                    }}
                    className="h-11 w-full rounded-xl border border-elec-yellow/40 bg-elec-yellow/[0.10] text-sm font-semibold text-white transition-colors touch-manipulation hover:bg-elec-yellow/[0.14] active:scale-[0.98] sm:w-auto sm:px-6"
                  >
                    Raise {outstandingCount} as remedial work
                  </button>
                )}

                {totalCount === 0 && (
                  <p className="text-[13px] text-white">
                    Observations are auto-created when items are marked C1, C2, C3 or FI.
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleAddObservation}
                  className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-all touch-manipulation active:scale-[0.98] hover:bg-elec-yellow/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:w-auto sm:px-8"
                >
                  Add observation
                </button>

                {totalCount > 0 && (
                  <DefectObservationsList
                    defectObservations={defectObservations}
                    reportId={reportId}
                    onAddObservation={handleAddObservation}
                    onUpdateObservation={onUpdateObservation}
                    onRemoveObservation={onRemoveObservation}
                    certificateContext={certificateContext}
                  />
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </section>
      </div>
    );
  }
);

DefectObservationsSection.displayName = 'DefectObservationsSection';

export default DefectObservationsSection;
