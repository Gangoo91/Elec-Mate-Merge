/**
 * Worker Tools › My jobs: the circuit design for this job (ELE-1943). The
 * office designs it in the Employer Hub; the crew read it on site: which
 * circuit, which cable, which protective device, how long the run, and the
 * readings to expect. Read-only. Shows nothing when the job has no design.
 *
 * get_job_designs / get_design_detail only answer for the crew on the job and
 * the firm's managers.
 */
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { WorkerPanel, SectionTitle } from '@/components/worker-tools/WorkerUi';
import { useDesignDetail, useJobDesigns } from '@/hooks/useFirmSafetyDocs';
import { cn } from '@/lib/utils';

interface CircuitRow {
  circuitNumber?: number;
  name?: string;
  cableType?: string;
  cableSize?: number;
  cpcSize?: number;
  cableLength?: number;
  installationMethod?: string;
  rcdProtected?: boolean;
  protectionDevice?: { type?: string; curve?: string; rating?: number };
  calculations?: { zs?: number; maxZs?: number };
  expectedTests?: { zs?: { expected?: number; maxPermitted?: number } };
}

const device = (c: CircuitRow) => {
  const d = c.protectionDevice;
  if (!d?.rating) return null;
  return `${d.rating}A${d.curve ? ` Type ${d.curve}` : ''} ${d.type ?? 'MCB'}`;
};

const zs = (c: CircuitRow) => {
  const expected = c.expectedTests?.zs?.expected ?? c.calculations?.zs;
  const max = c.expectedTests?.zs?.maxPermitted ?? c.calculations?.maxZs;
  if (expected == null) return null;
  const r = (n: number) => Math.round(Number(n) * 100) / 100;
  return `Zs about ${r(expected)}Ω${max != null ? `, max ${r(max)}Ω` : ''}`;
};

function DesignCircuits({ designId }: { designId: string }) {
  const { data, isLoading, error } = useDesignDetail(designId);
  if (isLoading)
    return <p className="px-4 py-3 text-[14px] text-white sm:px-5">Loading the design…</p>;
  if (error || !data) {
    return (
      <p className="px-4 py-3 text-[14px] text-white sm:px-5">
        This design could not be opened. Ask the office.
      </p>
    );
  }
  const circuits = ((data.design_data as { circuits?: CircuitRow[] } | null)?.circuits ?? [])
    .slice()
    .sort((a, b) => (a.circuitNumber ?? 0) - (b.circuitNumber ?? 0));
  if (!circuits.length) {
    return <p className="px-4 py-3 text-[14px] text-white sm:px-5">No circuits in this design.</p>;
  }
  return (
    <div className="divide-y divide-white/[0.07]">
      {circuits.map((c, i) => (
        <div key={i} className="px-4 py-3 sm:px-5">
          <p className="text-[15px] font-semibold text-white">
            {c.circuitNumber ? `C${c.circuitNumber} ` : ''}
            {c.name ?? 'Circuit'}
          </p>
          <p className="mt-0.5 text-[13px] text-white">
            {[
              c.cableType ?? (c.cableSize ? `${c.cableSize}mm²` : null),
              c.cpcSize ? `${c.cpcSize}mm² cpc` : null,
              c.cableLength ? `${c.cableLength} m` : null,
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
          <p className="mt-0.5 text-[13px] text-white">
            {[device(c), c.rcdProtected ? 'RCD protected' : null, zs(c)]
              .filter(Boolean)
              .join(' · ')}
          </p>
          {c.installationMethod && (
            <p className="mt-0.5 text-[13px] text-white">{c.installationMethod}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export function JobDesignPanel({ jobId }: { jobId: string }) {
  const { data: designs } = useJobDesigns(jobId);
  const [open, setOpen] = useState<string | null>(null);
  if (!designs?.length) return null;

  return (
    <div data-help="wt-jobs.design">
      <SectionTitle title="Design" />
      <WorkerPanel className="divide-y divide-white/[0.07]">
        {designs.map((d) => {
          const isOpen = open === d.id;
          return (
            <div key={d.id}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : d.id)}
                aria-expanded={isOpen}
                className="flex min-h-[56px] w-full items-center gap-3 px-4 py-3 text-left touch-manipulation sm:px-5"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-semibold text-white">
                    {d.title}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-white">
                    {d.circuits} circuit{d.circuits === 1 ? '' : 's'}: cable, devices and expected
                    readings
                  </span>
                </span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    'h-4 w-4 shrink-0 text-white transition-transform',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>
              {isOpen && (
                <div className="border-t border-white/[0.07]">
                  <DesignCircuits designId={d.id} />
                </div>
              )}
            </div>
          );
        })}
      </WorkerPanel>
    </div>
  );
}
