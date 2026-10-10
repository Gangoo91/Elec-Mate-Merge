/**
 * Scheme and accreditations on the Compliance page (Gap #10): the competent
 * person scheme from Settings (the one certificates print) and the prequal
 * accreditations main contractors ask for (CHAS, SafeContractor,
 * Constructionline...), kept on the register. A row opens it; the last row
 * adds one.
 */
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { ComplianceDocument } from '@/hooks/useComplianceDocuments';
import { panel, PanelHead, Row, Rows, StatusPill } from '@/components/employer/pageParts/PageParts';
import type { PillTone } from '@/components/employer/pageParts/PageParts';
import {
  accreditationLabel,
  isCps,
  isSettingsDoc,
} from '@/components/employer/compliance/credentials';

const ukDate = (iso?: string | null) =>
  iso
    ? new Date(`${iso.slice(0, 10)}T00:00:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

function state(doc: ComplianceDocument): { tone: PillTone; label: string } {
  const exp = doc.expiry_date?.slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);
  const in30 = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
  if (!exp) return { tone: 'neutral', label: 'No date' };
  if (exp < today) return { tone: 'red', label: 'Lapsed' };
  if (exp <= in30) return { tone: 'volt', label: 'Renews soon' };
  return { tone: 'green', label: 'In date' };
}

export function AccreditationsPanel({
  documents,
  onOpen,
  onAddScheme,
  onAdd,
}: {
  documents: ComplianceDocument[];
  onOpen: (doc: ComplianceDocument) => void;
  onAddScheme: () => void;
  onAdd: () => void;
}) {
  const { scheme, others } = useMemo(() => {
    const held = documents.filter((d) => d.accreditation && !d.certificate_for);
    const cps = held
      .filter((d) => isCps(d.accreditation))
      .sort((a, b) => Number(isSettingsDoc(b)) - Number(isSettingsDoc(a)));
    return {
      scheme: cps,
      others: held
        .filter((d) => !isCps(d.accreditation))
        .sort((a, b) =>
          accreditationLabel(a.accreditation).localeCompare(accreditationLabel(b.accreditation))
        ),
    };
  }, [documents]);

  const lapsed = [...scheme, ...others].filter((d) => state(d).tone === 'red').length;

  const row = (d: ComplianceDocument) => {
    const s = state(d);
    const name = isSettingsDoc(d)
      ? (d.insurer ?? 'Competent person scheme')
      : accreditationLabel(d.accreditation);
    return (
      <Row
        key={d.id}
        onClick={() => onOpen(d)}
        title={name}
        detail={[
          d.policy_number ? `No. ${d.policy_number}` : 'No membership number',
          d.expiry_date ? `renews ${ukDate(d.expiry_date)}` : null,
          isSettingsDoc(d) ? 'on your certificates' : null,
        ]
          .filter(Boolean)
          .join(' · ')}
        trailing={<StatusPill tone={s.tone}>{s.label}</StatusPill>}
      />
    );
  };

  return (
    <section className={cn(panel, 'overflow-hidden')} data-help="compliance.accreditations">
      <PanelHead title="Scheme and accreditations" meta={lapsed ? `${lapsed} lapsed` : undefined} />
      <Rows>
        {scheme.length ? (
          scheme.map(row)
        ) : (
          <Row
            onClick={onAddScheme}
            title="Competent person scheme"
            detail="Not on file. NICEIC, NAPIT or ELECSA prints on every certificate"
            trailing={<StatusPill tone="volt">Add</StatusPill>}
          />
        )}
        {others.map(row)}
        <Row
          onClick={onAdd}
          title="Add an accreditation"
          detail="CHAS, SafeContractor, Constructionline or ISO"
        />
      </Rows>
    </section>
  );
}
