/**
 * Insurance on the Compliance page (ELE-2076): one row per cover type with
 * the problem if there is one (not on file, lapsed, under the £5m employers'
 * liability minimum, no certificate). Missing cover is a prompt, not red:
 * public liability is voluntary and employers' liability has exemptions. A row opens the policy, or adds it.
 * Public liability is the Settings record (Gap #10), the one certificates and quotes print.
 */
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { ComplianceDocument, InsuranceKind } from '@/hooks/useComplianceDocuments';
import { panel, PanelHead, Row, Rows, StatusPill } from '@/components/employer/pageParts/PageParts';
import { checkInsurance, money } from '@/components/employer/compliance/insurance';
import { isSettingsDoc } from '@/components/employer/compliance/credentials';

export function InsurancePanel({
  documents,
  employsPeople,
  onOpen,
  onAdd,
}: {
  documents: ComplianceDocument[];
  employsPeople: boolean;
  onOpen: (doc: ComplianceDocument) => void;
  onAdd: (kind: InsuranceKind) => void;
}) {
  const checks = useMemo(
    () => checkInsurance(documents, { employsPeople }),
    [documents, employsPeople]
  );
  const problems = checks.filter((c) => c.problem).length;
  return (
    <section className={cn(panel, 'overflow-hidden')} data-help="compliance.insurance">
      <PanelHead title="Insurance" meta={problems ? `${problems} to check` : undefined} />
      <Rows>
        {checks.map((c) => (
          <Row
            key={c.kind}
            onClick={() => (c.doc ? onOpen(c.doc) : onAdd(c.kind))}
            title={c.label}
            detail={
              c.doc
                ? [
                    c.problem ||
                      [
                        c.doc.insurer,
                        c.doc.cover_amount != null ? money(c.doc.cover_amount) : c.doc.cover_text,
                      ]
                        .filter(Boolean)
                        .join(' · ') ||
                      c.doc.title,
                    // Gap #10: the same record certificates and quotes print.
                    isSettingsDoc(c.doc) && !c.problem ? 'on your certificates' : null,
                  ]
                    .filter(Boolean)
                    .join(' · ')
                : c.problem
                  ? c.problem.replace(/^Not on file\. /, '')
                  : 'Add it if you hold it'
            }
            trailing={<StatusPill tone={c.tone}>{c.status}</StatusPill>}
          />
        ))}
      </Rows>
    </section>
  );
}
