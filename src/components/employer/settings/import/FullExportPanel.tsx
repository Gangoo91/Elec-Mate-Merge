/**
 * ELE-2067 — Settings → Export everything (owner only). A zip of every
 * record type as CSV plus every PDF and photo the firm holds. Built in this
 * browser tab; for a very large book we say so before it starts.
 */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '@/components/employer/editorial';
import {
  KeyValue,
  PanelHead,
  panelShellClass,
  plural,
} from '@/components/employer/pageParts/PageParts';
import { toast } from '@/hooks/use-toast';
import {
  EXPORT_LABEL,
  LARGE_EXPORT_BYTES,
  buildFirmExport,
  getExportManifest,
  saveBlob,
  type ExportProgress,
} from '@/lib/firmExport/buildExport';

const mb = (b: number) =>
  b >= 1024 * 1024 * 1024
    ? `${(b / 1024 / 1024 / 1024).toFixed(1)} GB`
    : b >= 1024 * 1024
      ? `${Math.round(b / 1024 / 1024)} MB`
      : `${Math.max(1, Math.round(b / 1024))} KB`;

export function FullExportPanel({ firmId, firmName }: { firmId: string; firmName: string }) {
  const [progress, setProgress] = useState<ExportProgress | null>(null);
  const [last, setLast] = useState<string | null>(null);

  const {
    data: manifest,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['firm-export-manifest', firmId],
    enabled: !!firmId,
    staleTime: 60_000,
    queryFn: () => getExportManifest(firmId),
  });

  const records = manifest ? Object.values(manifest.counts).reduce((s, n) => s + n, 0) : 0;
  const types = manifest ? Object.values(manifest.counts).filter(Boolean).length : 0;
  const large = !!manifest && manifest.file_bytes > LARGE_EXPORT_BYTES;

  const run = async (includeFiles: boolean) => {
    try {
      const fresh = (await refetch()).data ?? manifest;
      if (!fresh) return;
      setProgress({ stage: 'records', done: 0, total: 1 });
      const res = await buildFirmExport(firmId, firmName, fresh, { includeFiles }, setProgress);
      saveBlob(res.blob, res.fileName);
      const n = Object.values(res.recordCounts).reduce((s, x) => s + x, 0);
      setLast(
        `Downloaded ${res.fileName}: ${plural(n, 'record')}` +
          (includeFiles ? `, ${plural(res.filesIncluded, 'file')}` : '') +
          (res.filesFailed.length
            ? `. ${plural(res.filesFailed.length, 'file')} could not be included, listed in README.txt.`
            : '.')
      );
    } catch (e) {
      toast({
        title: 'Export did not finish',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setProgress(null);
    }
  };

  const stageLine = progress
    ? progress.stage === 'records'
      ? `Collecting ${progress.label?.toLowerCase() ?? 'records'} (${progress.done} of ${progress.total} types)`
      : progress.stage === 'files'
        ? `Adding files: ${progress.done} of ${progress.total}`
        : `Making the zip: ${progress.done}%`
    : null;

  return (
    <div className={panelShellClass}>
      <PanelHead
        title="Export everything"
        meta={<span className="text-[13px] text-white">Yours to keep, any time</span>}
      />
      <div className="px-4 pt-4 sm:px-5">
        <p className="text-[14px] leading-snug text-white">
          Your firm&rsquo;s records: one zip with every record as a spreadsheet (CSV) and every
          certificate, RAMS, invoice PDF and photo we hold for the firm. Free, as often as you like.
          Your own personal data, as GDPR allows, is under Settings, Privacy, Download My Data.
        </p>
      </div>
      {isLoading ? (
        <div className="flex items-center gap-2 px-4 py-4 text-[13px] text-white sm:px-5">
          <Loader2 className="h-4 w-4 animate-spin" /> Counting your records
        </div>
      ) : error ? (
        <p className="px-4 py-4 text-[13px] text-white sm:px-5">
          Could not count your records. {(error as Error).message}
        </p>
      ) : manifest ? (
        <div className="mt-2 divide-y divide-white/[0.07] border-t border-white/[0.07]">
          <KeyValue
            label={`Records across ${plural(types, 'type')}`}
            value={records.toLocaleString('en-GB')}
          />
          <KeyValue
            label="PDFs and photos"
            value={`${manifest.files.length.toLocaleString('en-GB')} · ${mb(manifest.file_bytes)}`}
          />
          {(['certificates', 'invoices', 'quotes', 'customers', 'jobs'] as const)
            .filter((k) => manifest.counts[k])
            .map((k) => (
              <KeyValue
                key={k}
                label={EXPORT_LABEL[k]}
                value={manifest.counts[k].toLocaleString('en-GB')}
              />
            ))}
        </div>
      ) : null}
      <div className="space-y-3 border-t border-white/[0.07] px-4 py-4 sm:px-5">
        {large && (
          <p className="text-[13.5px] leading-snug text-white">
            <span className="font-semibold text-elec-yellow">
              This is a big one ({mb(manifest!.file_bytes)}).{' '}
            </span>
            It is built in this tab, so use Wi-Fi and keep the page open until it downloads. Records
            only is quick.
          </p>
        )}
        {stageLine && (
          <p className="flex items-center gap-2 text-[13.5px] text-white">
            <Loader2 className="h-4 w-4 animate-spin" /> {stageLine}
          </p>
        )}
        {last && !progress && <p className="text-[13.5px] text-white">{last}</p>}
        <div className="flex flex-col gap-2 sm:flex-row">
          <PrimaryButton disabled={!manifest || !!progress} onClick={() => run(true)}>
            Download everything
          </PrimaryButton>
          <SecondaryButton disabled={!manifest || !!progress} onClick={() => run(false)}>
            Records only
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
