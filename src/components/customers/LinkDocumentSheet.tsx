import React, { useState, useEffect, useMemo } from 'react';
import { Loader2, Search, Link2 } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface LinkDocumentSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId: string;
  customerName: string;
  mode: 'quotes' | 'invoices';
  onLinked: () => void;
}

interface UnlinkedRow {
  id: string;
  quote_number: string | null;
  invoice_number: string | null;
  job_details?: { title?: string } | null;
  client_data?: { name?: string } | null;
  total: number;
  status: string;
  invoice_status: string | null;
  created_at: string;
}

export const LinkDocumentSheet = ({
  open,
  onOpenChange,
  customerId,
  customerName,
  mode,
  onLinked,
}: LinkDocumentSheetProps) => {
  const [rows, setRows] = useState<UnlinkedRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [linkingId, setLinkingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!open) return;
    setSearch('');
    const fetchUnlinked = async () => {
      setIsLoading(true);
      try {
        let query = supabase
          .from('quotes')
          .select(
            'id, quote_number, invoice_number, job_details, client_data, total, status, invoice_status, created_at'
          )
          .is('customer_id', null)
          .order('created_at', { ascending: false })
          .limit(100);

        if (mode === 'invoices') {
          query = query.eq('invoice_raised', true);
        }

        const { data, error } = await query;
        if (error) throw error;
        setRows((data as UnlinkedRow[]) || []);
      } catch (error) {
        console.error('Failed to fetch unlinked documents:', error);
        toast.error('Could not load documents to link');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUnlinked();
  }, [open, mode]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => {
      const ref = mode === 'invoices' ? row.invoice_number : row.quote_number;
      return (
        ref?.toLowerCase().includes(q) ||
        row.client_data?.name?.toLowerCase().includes(q) ||
        row.job_details?.title?.toLowerCase().includes(q)
      );
    });
  }, [rows, search, mode]);

  const handleLink = async (row: UnlinkedRow) => {
    setLinkingId(row.id);
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ customer_id: customerId })
        .eq('id', row.id);
      if (error) throw error;

      const ref =
        (mode === 'invoices' ? row.invoice_number : row.quote_number) ||
        (mode === 'invoices' ? 'Invoice' : 'Quote');
      toast.success(`${ref} linked to ${customerName}`);
      setRows((prev) => prev.filter((r) => r.id !== row.id));
      onLinked();
    } catch (error) {
      console.error('Failed to link document:', error);
      toast.error('Could not link — please try again');
    } finally {
      setLinkingId(null);
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount || 0);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const noun = mode === 'invoices' ? 'invoice' : 'quote';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] rounded-t-2xl p-0 border-0 bg-[#1c1c1e] flex flex-col"
      >
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-9 h-1 rounded-full bg-white/20" />
        </div>

        <div className="px-4 pb-3 border-b border-white/[0.08] flex-shrink-0">
          <h2 className="text-[17px] font-semibold text-white">
            Link {mode === 'invoices' ? 'an invoice' : 'a quote'}
          </h2>
          <p className="text-[13px] text-white mt-0.5">
            Choose an existing {noun} to link to {customerName}
          </p>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder={`Search by number, client or job`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 pl-9 text-base bg-input border-white/[0.08] rounded-xl touch-manipulation text-white placeholder:text-muted-foreground focus:border-elec-yellow/50 focus:ring-0"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
            </div>
          ) : filtered.length > 0 ? (
            <div className="space-y-2 pb-8">
              {filtered.map((row) => {
                const ref = mode === 'invoices' ? row.invoice_number : row.quote_number;
                return (
                  <button
                    key={row.id}
                    onClick={() => handleLink(row)}
                    disabled={linkingId !== null}
                    className="w-full flex items-center gap-3 p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl text-left touch-manipulation active:scale-[0.98] transition-all disabled:opacity-60"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-white truncate">
                        {ref || row.job_details?.title || (mode === 'invoices' ? 'Invoice' : 'Quote')}
                      </p>
                      <p className="text-xs text-white/70 truncate">
                        {row.client_data?.name ? `${row.client_data.name} · ` : ''}
                        {formatCurrency(row.total)}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {linkingId === row.id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
                      ) : (
                        <Link2 className="h-4 w-4 text-elec-yellow" />
                      )}
                      <p className="text-[10px] text-white mt-1">{formatDate(row.created_at)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-white text-center py-8">
              {search
                ? `No ${noun}s match your search`
                : `No unlinked ${noun}s found — everything is already linked to a customer`}
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
