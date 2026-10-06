/**
 * EICCertificateTab — the front of the certificate.
 *
 * Rebuilt 5 Oct 2026. Sections laid out as hub cards; the supply reads
 * three-phase 400/230 V (the rig feeds a three-phase motor).
 *
 * Round 6 (6 Oct 2026): in Practise and Assessment the learner writes the
 * supply details — system type, Ze and Ipf from their own readings at the
 * origin, the phase sequence check, and the main switch and conductor sizes
 * from the drawings (NET: the candidate completes the certificate). Learn
 * fills them in, Ze and Ipf from the learner's readings as they're taken.
 */

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { CERT_FIELDS, RIG_DRAWINGS } from '@/data/am2/sectionBDetails';
import type { EICCertificateData, EICScheduleState } from '@/types/am2-testing-simulator';
import { WriteSheet, type WriteTarget } from './WriteSheet';

interface EICCertificateTabProps {
  certificate: EICCertificateData;
  headerFields: EICScheduleState['headerFields'];
  writable?: boolean;
  onWrite?: (field: string, value: string) => void;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={cn('rounded-2xl border border-white/[0.14] p-4 lg:p-5', CARD_SURFACE)}>
      <h3 className="text-[15px] font-bold text-white">{title}</h3>
      <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">{children}</dl>
    </section>
  );
}

function Row({ label, value, pending }: { label: string; value?: string; pending?: string }) {
  return (
    <div className="min-w-0 border-b border-white/[0.08] pb-2">
      <dt className="text-[12px] font-semibold text-white">{label}</dt>
      <dd className="mt-0.5 text-[14.5px] font-semibold text-white">
        {value ? value : <span>{pending ?? '—'}</span>}
      </dd>
    </div>
  );
}

export function EICCertificateTab({
  certificate: c,
  headerFields: h,
  writable = false,
  onWrite,
}: EICCertificateTabProps) {
  const [target, setTarget] = useState<WriteTarget | null>(null);
  const valueOf = (key: string) =>
    key === 'phaseSequence'
      ? h.phaseSequence
      : ((c as unknown as Record<string, string | undefined>)[key] ?? '');

  return (
    <div className="mx-auto w-full max-w-[1100px] space-y-4 px-3 py-4 sm:px-5 lg:px-6">
      <WriteSheet target={target} onClose={() => setTarget(null)} />
      <p className="text-[13.5px] leading-relaxed text-white">
        {writable
          ? 'Write the supply details: Ze and Ipf from your own readings at the origin, the phase sequence from your checks, and the rest from the drawings.'
          : 'Filled in for this practice rig. Ze and Ipf come from your readings at the origin — on this three-phase supply Ipf is the line–neutral reading × 2, or the earth fault current if greater (Appendix 14).'}
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="Client and installation">
          <Row label="Client" value={c.clientName} />
          <Row label="Installation address" value={c.installationAddress} />
          <div className="sm:col-span-2">
            <Row label="Extent of the work" value={c.descriptionOfWork} />
          </div>
        </Section>
        <Section title="Supply and earthing">
          <Row label="Supply" value={c.supplyType} />
          <Row label="Nominal voltage" value={c.supplyVoltage} />
          {CERT_FIELDS.map((f) => {
            const v = valueOf(f.key);
            const shown = v ? `${v}${f.unit ? ` ${f.unit}` : ''}` : '';
            return writable ? (
              <div key={f.key} className="min-w-0 border-b border-white/[0.08] pb-2">
                <dt className="text-[12px] font-semibold text-white">{f.label}</dt>
                <dd className="mt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setTarget({
                        title: f.label,
                        description: f.from,
                        value: v,
                        options: f.options,
                        unit: f.unit,
                        numeric: !f.options,
                        onWrite: (x) => onWrite?.(f.key, x),
                      })
                    }
                    className={cn(
                      'inline-flex min-h-[44px] min-w-[96px] items-center rounded-lg border px-3 font-mono text-[14px] font-semibold text-white touch-manipulation',
                      v ? 'border-white/[0.2]' : 'border-dashed border-white/[0.35]'
                    )}
                  >
                    {shown || 'Write it'}
                  </button>
                </dd>
              </div>
            ) : (
              <Row key={f.key} label={f.label} value={shown} pending="Not measured yet" />
            );
          })}
          <Row label="Board" value={`${h.dbReference} · ${h.location}`} />
        </Section>
        <Section title="The drawings">
          <div className="sm:col-span-2 space-y-2 text-[13.5px] text-white">
            <p>{RIG_DRAWINGS.supply}</p>
            <p>{RIG_DRAWINGS.board}</p>
            <p>
              Main earthing conductor {RIG_DRAWINGS.earthingConductor} mm² copper. Main bonding
              conductors {RIG_DRAWINGS.bondingConductor} mm² copper.
            </p>
          </div>
        </Section>
        <Section title="Design, construction, inspection and testing">
          <Row label="Designer" value={c.designerName} />
          <Row label="Installer" value={c.installerName} />
          <Row label="Inspector" value={c.inspectorName} />
        </Section>
      </div>
    </div>
  );
}
