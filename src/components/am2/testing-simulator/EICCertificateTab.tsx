/**
 * EICCertificateTab
 *
 * Pre-filled EIC certificate for the AM2 scenario.
 * Read-only during training — shows client details, supply
 * characteristics, earthing, and sign-off sections.
 */

import type { EICCertificateData } from '@/types/am2-testing-simulator';

interface EICCertificateTabProps {
  certificate: EICCertificateData;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] text-white/40 font-medium">{label}</span>
      <div className="px-2.5 py-1.5 rounded-md bg-white/[0.03] border border-white/5 text-sm text-white/70">
        {value || '—'}
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 pt-3 pb-1">
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
      <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider">{title}</h3>
    </div>
  );
}

export function EICCertificateTab({ certificate }: EICCertificateTabProps) {
  return (
    <div className="px-4 py-3 space-y-3">
      <SectionTitle title="Details of the Client" />
      <Field label="Client name" value={certificate.clientName} />
      <Field label="Installation address" value={certificate.installationAddress} />

      <SectionTitle title="Description of Work" />
      <Field label="Description" value={certificate.descriptionOfWork} />

      <SectionTitle title="Supply Characteristics" />
      <div className="grid grid-cols-2 gap-2">
        <Field label="Supply type" value={certificate.supplyType} />
        <Field label="Supply voltage" value={certificate.supplyVoltage} />
        <Field label="Earthing arrangement" value={certificate.earthingArrangement} />
        <Field label="Ze at origin" value={`${certificate.zeAtOrigin} Ω`} />
        <Field
          label="PFC at origin"
          value={certificate.pfcAtOrigin ? `${certificate.pfcAtOrigin} kA` : 'Not yet measured'}
        />
      </div>

      <SectionTitle title="Design / Construction / Inspection" />
      <div className="grid grid-cols-1 gap-2">
        <Field label="Designer" value={certificate.designerName} />
        <Field label="Installer" value={certificate.installerName} />
        <Field label="Inspector" value={certificate.inspectorName} />
      </div>

      <div className="pt-4 pb-2">
        <p className="text-[10px] text-white/30 text-center italic">
          This certificate is pre-filled for the AM2 assessment scenario. In a real inspection, all
          fields would be completed by the qualified persons responsible.
        </p>
      </div>
    </div>
  );
}
