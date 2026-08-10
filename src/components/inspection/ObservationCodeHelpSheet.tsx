import React from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { DefectObservation } from '@/hooks/useRemedialItems';

/**
 * ELE-1537 — why this report is unsatisfactory, answered against this report.
 *
 * Inspectors hit the assessment gate mid-job, having just put a fault right,
 * and read it as a bug: "trying to block my cert with 3 c2s which were marked
 * as fixed on site". The gate is correct, but it asserted the outcome and
 * explained nothing, so this reads the actual observations back and says which
 * ones decide it and why.
 *
 * Everything quoted here is from BS 7671 Appendix 6 — the producer notes to the
 * model Condition Report, and Section E.
 */

interface ObservationCodeHelpSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  observations: DefectObservation[];
  /**
   * 'report' speaks for the whole certificate (the assessment card). 'observation'
   * is opened from a single card and must not claim to judge the report — the
   * inspector may have ten others it knows nothing about.
   */
  scope?: 'report' | 'observation';
}

const isBlocking = (d: DefectObservation) => d.defectCode === 'C1' || d.defectCode === 'C2';

const codeStyles: Record<string, string> = {
  C1: 'border-red-500/40 bg-red-500/15 text-red-300',
  C2: 'border-orange-500/40 bg-orange-500/15 text-orange-300',
};

const CodeChip = ({ code }: { code: string }) => (
  <span
    className={cn(
      'inline-flex h-6 min-w-[2rem] flex-shrink-0 items-center justify-center rounded-md border px-1.5 text-[12px] font-semibold',
      codeStyles[code] || 'border-white/[0.15] bg-white/[0.06] text-white'
    )}
  >
    {code}
  </span>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border-t border-white/[0.1] pt-4">
    <h3 className="mb-2 text-sm font-semibold text-white">{title}</h3>
    <div className="space-y-2 text-[13px] leading-relaxed text-white">{children}</div>
  </div>
);

const Quote = ({ children, cite }: { children: React.ReactNode; cite: string }) => (
  <figure className="my-2 border-l-2 border-elec-yellow/60 pl-3">
    <blockquote className="text-[13px] italic leading-relaxed text-white">{children}</blockquote>
    <figcaption className="mt-1 text-[12px] text-white">{cite}</figcaption>
  </figure>
);

const ObservationCodeHelpSheet: React.FC<ObservationCodeHelpSheetProps> = ({
  open,
  onOpenChange,
  observations,
  scope = 'report',
}) => {
  const list = observations || [];
  const blocking = list.filter(isBlocking);
  const rectifiedBlocking = blocking.filter((d) => d.rectified);
  const advisory = list.filter((d) => d.defectCode === 'C3' || d.defectCode === 'FI');
  const isReport = scope === 'report';

  const headline = blocking.length
    ? isReport
      ? 'This report must be Unsatisfactory'
      : 'This observation makes the report Unsatisfactory'
    : isReport
      ? 'Nothing here forces an unsatisfactory outcome'
      : 'This observation does not affect the outcome';

  /** "…and it is marked rectified" reads better than "1 of which" at n = 1. */
  const rectifiedClause = () => {
    if (!rectifiedBlocking.length) return null;
    if (blocking.length === 1) return ', and it is marked rectified on site';
    if (rectifiedBlocking.length === blocking.length) return ', all marked rectified on site';
    return `, ${rectifiedBlocking.length} of them marked rectified on site`;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.08] p-0"
      >
        <div className="flex h-full flex-col bg-background">
          <div className="flex-shrink-0 px-4 pb-3 pt-5">
            <h2 className="text-[15px] font-semibold tracking-tight text-white">
              Codes and the overall assessment
            </h2>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-8">
            {/* The verdict for this report, not a general statement */}
            <div
              className={cn(
                'rounded-xl border p-3.5',
                blocking.length > 0
                  ? 'border-elec-yellow/30 bg-elec-yellow/[0.08]'
                  : 'border-green-500/30 bg-green-500/[0.08]'
              )}
            >
              <p className="text-sm font-semibold text-white">{headline}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-white">
                {blocking.length > 0 ? (
                  <>
                    {isReport ? (
                      <>
                        {blocking.length} observation{blocking.length === 1 ? ' is' : 's are'} coded
                        C1 or C2
                      </>
                    ) : (
                      <>It is coded {blocking[0].defectCode}</>
                    )}
                    {rectifiedClause()}. A code of C1 or C2 sets the outcome, whether or not the
                    work has been done.
                  </>
                ) : (
                  <>
                    {isReport ? 'No observation is coded C1 or C2.' : 'It is not coded C1 or C2.'}
                    {advisory.length > 0 && isReport && (
                      <>
                        {' '}
                        The {advisory.length} advisory item{advisory.length === 1 ? '' : 's'} here
                        are recorded but do not change it.
                      </>
                    )}
                    {!isReport && ' C3 and FI are advisory.'}
                  </>
                )}
              </p>
            </div>

            {/* Redundant when you opened this from the observation itself. */}
            {blocking.length > 0 && isReport && (
              <Section title="The observations that decide it">
                <ul className="space-y-2">
                  {blocking.map((d) => (
                    <li
                      key={d.id}
                      className="flex items-start gap-2.5 rounded-lg border border-white/[0.08] bg-white/[0.03] p-2.5"
                    >
                      <CodeChip code={d.defectCode || ''} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium text-white">
                          {d.item || 'Observation'}
                        </p>
                        {d.description && (
                          <p className="mt-0.5 line-clamp-2 text-[12px] leading-relaxed text-white">
                            {d.description}
                          </p>
                        )}
                        <p className="mt-1 text-[12px] font-medium text-white">
                          {d.rectified ? 'Rectified on site' : 'Outstanding'}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Section title="Why a C1 or C2 decides the outcome">
              <Quote cite="BS 7671, Appendix 6 — notes for the person producing the report">
                The overall assessment of the installation is to be reported as unsatisfactory where
                any observation is given a code C1 or C2 classification.
              </Quote>
              <p>
                It turns on the code being given, not on whether the fault is still there. There is
                no exemption for work carried out during the inspection.
              </p>
            </Section>

            {rectifiedBlocking.length > 0 && (
              <Section title="You put it right on site">
                <p>
                  Then the installation is not dangerous, and that is what the report is about — so
                  satisfactory is the honest outcome. The obstacle is the code, not the work.
                </p>
                <p>
                  The assessment follows what is written on the observation, not the state you left
                  the job in. A defect that no longer exists should not still sit on the report as a
                  live C1 or C2. Record what you found, what you did, and your before and after
                  photos, so the client can see the work and the next inspector knows the history.
                </p>
              </Section>
            )}

            <Section title="Certifying the work itself">
              <p>
                A condition report reports condition — it does not certify work. Where you have
                altered a circuit without adding a new one or replacing the board, Regulation
                644.4.201 allows a Minor Electrical Installation Works Certificate for the work you
                carried out. That is the document that certifies the repair; the report records the
                installation you found.
              </p>
            </Section>

            <Section title="What does not affect the assessment">
              <Quote cite="BS 7671, Appendix 6 — Section E">
                Any observation classified as &lsquo;Improvement recommended&rsquo; (code C3), or
                &lsquo;Further investigation&rsquo; (code FI), is advisory and does not affect the
                overall assessment but should be given due consideration.
              </Quote>
              <p>
                C3 and FI are advisory. Neither makes a report unsatisfactory, whatever you may have
                read elsewhere — it is a common misreading.
              </p>
            </Section>

            <Section title="C1 — danger present">
              <Quote cite="BS 7671, Appendix 6 — notes for the person producing the report">
                Wherever practicable, items classified as &lsquo;Danger present&rsquo; (C1) are to be
                made safe on discovery. Where this is not possible the owner or user is to be given
                written notification as a matter of urgency.
              </Quote>
              <p>
                Making safe on discovery is the expectation. The written notification is for when
                that is not possible.
              </p>
            </Section>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ObservationCodeHelpSheet;
