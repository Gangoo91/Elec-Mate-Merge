/**
 * QuoteSelectorSheet (ELE-300)
 *
 * Lets the sparky pick an existing quote to pre-fill the AI RAMS input.
 * Auto-populates job description + project info (location, client name,
 * job title) from the chosen quote so they don't have to retype on site.
 */
import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export interface QuotePickerRow {
  id: string;
  quote_number: string | null;
  client_data: { name?: string; address?: string; postcode?: string } | null;
  job_details: { title?: string; description?: string; location?: string } | null;
  total: number | null;
  status: string | null;
  acceptance_status: string | null;
  created_at: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPick: (quote: QuotePickerRow) => void;
}

export function QuoteSelectorSheet({ open, onOpenChange, onPick }: Props) {
  const [quotes, setQuotes] = useState<QuotePickerRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    async function load() {
      setLoading(true);
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) {
        setQuotes([]);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('quotes')
        .select(
          'id, quote_number, client_data:client, job_details:jobDetails, total, status, acceptance_status, created_at'
        )
        .eq('user_id', auth.user.id)
        .order('created_at', { ascending: false })
        .limit(40);
      if (!cancelled) {
        setQuotes((data as unknown as QuotePickerRow[]) || []);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [open]);

  const formatGbp = (n: number | null) =>
    typeof n === 'number'
      ? `£${n.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
      : '';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-elec-dark border-white/[0.08]"
      >
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-white/[0.06]">
          <SheetTitle className="text-white text-left">Pre-fill from a quote</SheetTitle>
          <p className="text-[12px] text-white/60 text-left">
            Pick a quote — we'll use its job details to start your RAMS.
          </p>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-3">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-white/60">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : quotes.length === 0 ? (
            <div className="text-center py-12 text-white/60 text-sm">
              No quotes found. Create a quote first, then come back.
            </div>
          ) : (
            <div className="space-y-2">
              {quotes.map((q) => {
                const title = q.job_details?.title;
                const clientName = q.client_data?.name || 'No client';
                const location = q.job_details?.location || q.client_data?.address || '';
                const acceptedTag =
                  q.acceptance_status === 'accepted' || q.status === 'approved'
                    ? 'Accepted'
                    : q.status === 'sent'
                      ? 'Sent'
                      : q.status === 'rejected'
                        ? 'Declined'
                        : 'Draft';
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      onPick(q);
                      onOpenChange(false);
                    }}
                    className={cn(
                      'w-full text-left p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]',
                      'active:scale-[0.99] active:bg-white/[0.07] transition-all touch-manipulation'
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-[14px] font-semibold truncate">
                          {clientName}
                        </p>
                        {title && (
                          <p className="text-white/70 text-[12px] truncate mt-0.5">{title}</p>
                        )}
                        {location && (
                          <p className="text-white/50 text-[11px] truncate mt-0.5">{location}</p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-elec-yellow text-[14px] font-bold tabular-nums">
                          {formatGbp(q.total)}
                        </p>
                        <p className="text-white/40 text-[10px] mt-0.5 tabular-nums">
                          {format(new Date(q.created_at), 'd MMM')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/[0.06] text-white/70 uppercase tracking-wider">
                        {acceptedTag}
                      </span>
                      {q.quote_number && (
                        <span className="text-[10px] font-mono text-white/50">
                          {q.quote_number}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default QuoteSelectorSheet;
