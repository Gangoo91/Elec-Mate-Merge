/**
 * PersonTrainingEvidence (ELE-1834): on the person's Credentials tab, the
 * training evidence that sits beside their tickets.
 *
 *  - Briefings and toolbox talks they signed (newest five).
 *  - For an apprentice, off-the-job hours with the two authorities apart:
 *    attested by the firm, verified by their college, and what is waiting.
 *
 * CPD and training evidence only. Nothing here counts as holding a credential.
 */
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { PanelTitle, Row, RowList, StatusPill } from '@/components/employer/pageParts/PageParts';
import { useTeamTrainingEvidence, hoursLabel } from '@/hooks/useTeamTrainingEvidence';
import { otjActivityLabel } from '@/data/otjActivityTypes';

const day = (iso: string | null) => (iso ? format(parseISO(iso), 'd MMM yyyy') : 'No date');

export function PersonTrainingEvidence({
  employeeId,
  firstName,
  onNavigateAway,
}: {
  employeeId: string;
  firstName: string;
  /** Close the sheet before leaving for another page. */
  onNavigateAway?: () => void;
}) {
  const navigate = useNavigate();
  const { data, isLoading } = useTeamTrainingEvidence();
  if (isLoading) return null;
  const e = data?.get(employeeId);
  const hasOtj =
    !!e && (e.otjAttestedMinutes > 0 || e.otjCollegeVerifiedMinutes > 0 || e.otjWaiting > 0);

  const byType = e
    ? Object.entries(e.otjAttestedByType)
        .filter(([, m]) => m > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([t, m]) => `${otjActivityLabel(t)} ${hoursLabel(m)}`)
        .join(' · ')
    : '';

  return (
    <section>
      <PanelTitle
        title="Training evidence"
        meta={e && e.briefingsSigned > 0 ? `${e.briefingsSigned} signed` : undefined}
      />
      <RowList>
        {e && e.briefingsSigned > 0 ? (
          e.recentBriefings.map((b, i) => (
            <Row
              key={`${b.title}-${b.date}-${i}`}
              title={b.title}
              detail={`${day(b.date)} · ${b.how}`}
              trailing={<StatusPill tone="neutral">Briefing</StatusPill>}
            />
          ))
        ) : (
          <Row
            title="No briefings signed yet"
            wrapDetail
            detail={`Toolbox talks and briefings ${firstName} signs in Site Safety appear here.`}
          />
        )}
        {hasOtj && e && (
          <>
            <Row
              title="Off-the-job hours attested by the firm"
              wrapDetail
              detail={
                e.otjAttestedMinutes > 0 ? byType || 'Workplace-attested' : 'None attested yet'
              }
              trailing={
                e.otjAttestedMinutes > 0 ? (
                  <StatusPill tone="neutral">{hoursLabel(e.otjAttestedMinutes)}</StatusPill>
                ) : undefined
              }
            />
            <Row
              title="Verified by their college"
              detail="The college checks hours separately from the firm."
              trailing={
                <StatusPill tone="neutral">
                  {e.otjCollegeVerifiedMinutes > 0
                    ? hoursLabel(e.otjCollegeVerifiedMinutes)
                    : 'None'}
                </StatusPill>
              }
            />
            {e.otjWaiting > 0 && (
              <Row
                title={`${e.otjWaiting} ${e.otjWaiting === 1 ? 'entry' : 'entries'} waiting for you`}
                detail="Logged by them. Attest it or send it back."
                trailing={<StatusPill tone="volt">To attest</StatusPill>}
                onClick={() => {
                  onNavigateAway?.();
                  navigate('/employer?section=apprentices');
                }}
              />
            )}
          </>
        )}
      </RowList>
      <p className="mt-2 px-1 text-[12.5px] leading-snug text-white">
        Evidence of training and CPD. It never counts as holding a ticket.
      </p>
    </section>
  );
}
