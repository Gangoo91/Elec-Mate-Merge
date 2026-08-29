/**
 * The discoverability fix for certificate linking (only 6 of 893 invoices had
 * ever linked one — the feature existed solely as a button on cert screens).
 *
 * Lives on the invoice review step when no certificate is linked yet:
 * certificates matching the invoice's customer are suggested outright — one
 * tap links them — and everything else is a search away in a bottom sheet.
 * Once linked, the review step's Linked Document card (with the
 * send-with-invoice / hold-until-paid choice) takes over.
 */
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { FileCheck2, Search, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export interface LinkableCertificate {
  id: string;
  type: string;
  reference: string;
  pdfUrl: string | null;
}

interface CertRow {
  id: string;
  report_id: string | null;
  report_type: string | null;
  certificate_number: string | null;
  client_name: string | null;
  installation_address: string | null;
  inspection_date: string | null;
  pdf_url: string | null;
  created_at: string;
}

const TYPE_LABELS: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
  'testing-only': 'Testing Only',
  'pat-testing': 'PAT',
  'ev-charging': 'EV Charging',
  'emergency-lighting': 'Emergency Lighting',
  'smoke-co-alarm': 'Smoke & CO Alarm',
  'fire-alarm-inspection': 'Fire Alarm',
  'fire-alarm': 'Fire Alarm',
  'solar-pv': 'Solar PV',
  bess: 'BESS',
};

const typeLabel = (t: string | null) =>
  (t && TYPE_LABELS[t]) || (t ? t.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Certificate');

const toLinkable = (r: CertRow): LinkableCertificate => ({
  // Prefer the human certificate number as the link key — both the send and
  // release functions resolve report_id first, then UUID.
  id: r.report_id || r.id,
  type: typeLabel(r.report_type),
  reference: r.certificate_number || r.report_id || r.id.slice(0, 8),
  pdfUrl: r.pdf_url,
});

interface LinkCertificateCardProps {
  clientName?: string | null;
  onLink: (cert: LinkableCertificate) => void;
}

export const LinkCertificateCard = ({ clientName, onLink }: LinkCertificateCardProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [search, setSearch] = useState('');

  const { data: certs } = useQuery({
    queryKey: ['linkable-certificates'],
    queryFn: async (): Promise<CertRow[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];
      const { data, error } = await supabase
        .from('reports')
        .select(
          'id, report_id, report_type, certificate_number, client_name, installation_address, inspection_date, pdf_url, created_at'
        )
        .eq('user_id', user.id)
        .is('deleted_at', null)
        // Notices are served on people, not sold to them — never invoice fodder.
        .not('report_type', 'in', '(danger-notice,limitation-notice,completion-notice)')
        .order('created_at', { ascending: false })
        .limit(150);
      if (error) throw error;
      return (data || []) as CertRow[];
    },
    staleTime: 60_000,
  });

  // Certificates for THIS customer surface without being asked for — the
  // suggestion is the whole discoverability play.
  const suggestions = useMemo(() => {
    const name = (clientName || '').trim().toLowerCase();
    if (!name || !certs) return [];
    return certs.filter((c) => (c.client_name || '').trim().toLowerCase() === name).slice(0, 2);
  }, [certs, clientName]);

  const filtered = useMemo(() => {
    if (!certs) return [];
    const q = search.trim().toLowerCase();
    if (!q) return certs.slice(0, 50);
    return certs
      .filter((c) =>
        [c.client_name, c.installation_address, c.certificate_number, c.report_id, typeLabel(c.report_type)]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
      )
      .slice(0, 50);
  }, [certs, search]);

  const pick = (row: CertRow) => {
    onLink(toLinkable(row));
    setSheetOpen(false);
  };

  const certRow = (c: CertRow, highlight: boolean) => (
    <button
      key={c.id}
      type="button"
      onClick={() => pick(c)}
      className={cn(
        'w-full flex items-center gap-3 rounded-xl border p-3 text-left touch-manipulation active:scale-[0.99] transition-all',
        highlight
          ? 'border-elec-yellow/30 bg-elec-yellow/[0.06]'
          : 'border-white/[0.1] bg-white/[0.04]'
      )}
    >
      <div className="flex-1 min-w-0">
        <p className="text-[13.5px] font-medium text-white truncate">
          {typeLabel(c.report_type)}
          {c.certificate_number ? ` · ${c.certificate_number}` : ''}
        </p>
        <p className="text-[12px] text-white truncate">
          {[c.client_name, c.installation_address].filter(Boolean).join(' — ') || 'No client recorded'}
        </p>
        <p className="text-[11px] text-white mt-0.5">
          {c.inspection_date
            ? format(new Date(c.inspection_date), 'd MMM yyyy')
            : format(new Date(c.created_at), 'd MMM yyyy')}
          {!c.pdf_url && ' · PDF not generated yet'}
        </p>
      </div>
      <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
    </button>
  );

  return (
    <div className="border-t border-white/[0.12] pt-4">
      <p className="text-[11px] text-white uppercase tracking-wider mb-2">Certificate</p>

      {suggestions.length > 0 ? (
        <div className="space-y-2">
          <p className="text-[12.5px] text-white leading-snug">
            You have {suggestions.length === 1 ? 'a certificate' : 'certificates'} for{' '}
            {clientName} — link {suggestions.length === 1 ? 'it' : 'one'} and it can go with the
            invoice, or be held until they&apos;ve paid.
          </p>
          {suggestions.map((c) => certRow(c, true))}
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] text-[12.5px] font-medium text-white touch-manipulation"
          >
            Browse all certificates
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="w-full flex items-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.04] p-3.5 text-left touch-manipulation active:scale-[0.99] transition-all"
        >
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.10]">
            <FileCheck2 className="h-4 w-4 text-elec-yellow" />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-[13.5px] font-medium text-white">Link a certificate</span>
            <span className="block text-[12px] text-white leading-snug">
              Attach it to the invoice email — or hold it until they&apos;ve paid.
            </span>
          </span>
          <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
        </button>
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            <div className="px-4 pt-5 pb-3 border-b border-white/[0.08]">
              <h2 className="text-[15px] font-semibold tracking-tight text-white">
                Link a certificate
              </h2>
              <div className="relative mt-3">
                <Search className="absolute left-1 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by client, address or number"
                  className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 pb-20 sm:pb-4">
              {filtered.length ? (
                filtered.map((c) => certRow(c, false))
              ) : (
                <p className="text-center text-[13px] text-white py-10">
                  {certs?.length ? 'No certificates match that search.' : 'No certificates yet.'}
                </p>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
