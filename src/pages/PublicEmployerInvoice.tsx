import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, Receipt, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   PublicEmployerInvoice — the client-facing view of an employer's invoice
   (token-keyed definer RPC; no login). Shows the amount, line items and the
   company's bank details for payment.
   ========================================================================== */

interface LineItem {
  description?: string;
  quantity?: number;
  total?: number;
}

const money = (v: number | string | null | undefined) =>
  `£${Number(v || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function PublicEmployerInvoice() {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!token) return;
      const { data: result, error: rpcError } = await supabase.rpc(
        'get_employer_invoice_by_token',
        { p_token: token }
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const r = result as any;
      if (rpcError || !r || r.error) {
        setError(
          r?.error === 'expired'
            ? 'This invoice link has expired — ask for a fresh one.'
            : 'Invoice not found. Check the link or ask for a new one.'
        );
      } else {
        setData(r);
      }
      setLoading(false);
    })();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(0_0%_7%)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[hsl(0_0%_7%)] flex items-center justify-center px-6">
        <p className="text-white/70 text-center">{error}</p>
      </div>
    );
  }

  const invoice = data.invoice;
  const company = data.company;
  const items: LineItem[] = Array.isArray(invoice.line_items) ? invoice.line_items : [];
  const bank = (company?.bank_details || {}) as {
    accountName?: string;
    sortCode?: string;
    accountNumber?: string;
  };
  const isPaid = invoice.status === 'Paid';

  return (
    <div className="min-h-screen bg-[hsl(0_0%_7%)] text-white">
      <div className="mx-auto max-w-lg px-4 py-8 space-y-6">
        <div className="flex items-center gap-3">
          {company?.logo_url ? (
            <img src={company.logo_url} alt="" className="h-12 w-12 rounded-xl object-contain bg-white/5" />
          ) : (
            <div className="h-12 w-12 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
              <Receipt className="h-6 w-6 text-elec-yellow" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-[15px] font-semibold">{company?.company_name || 'Invoice'}</p>
            <p className="text-[12px] text-white/50">Invoice {invoice.invoice_number}</p>
            {(company?.company_phone || company?.company_email) && (
              <p className="text-[11.5px] text-white/40 truncate">
                {[company?.company_phone, company?.company_email].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>
        </div>

        {(company?.company_address || company?.vat_number) && (
          <div className="space-y-1">
            {company?.company_address && (
              <p className="text-[11.5px] text-white/40 whitespace-pre-line leading-relaxed">
                {company.company_address}
              </p>
            )}
            {company?.vat_number && (
              <p className="text-[11.5px] text-white/40">VAT No. {company.vat_number}</p>
            )}
          </div>
        )}

        {isPaid && (
          <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/25 p-4 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <p className="text-[13.5px]">This invoice has been paid — thank you.</p>
          </div>
        )}

        <div className="rounded-2xl bg-[hsl(0_0%_11%)] border border-white/[0.08] p-5 space-y-4">
          {(invoice.client || invoice.created_at) && (
            <div className="flex items-start justify-between gap-4">
              {invoice.client && (
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">Billed to</p>
                  <p className="mt-0.5 text-[13.5px] font-medium text-white truncate">
                    {invoice.client}
                  </p>
                </div>
              )}
              {invoice.created_at && (
                <div className="shrink-0 text-right">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">Issued</p>
                  <p className="mt-0.5 text-[13.5px] text-white/80 tabular-nums">
                    {new Date(invoice.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              )}
            </div>
          )}

          {invoice.project && (
            <p className="text-[13.5px] text-white/80 leading-relaxed">{invoice.project}</p>
          )}

          {items.length > 0 && (
            <div className="space-y-2">
              {items.map((it, i) => (
                <div key={i} className="flex justify-between text-[13px]">
                  <span className="text-white/70">
                    {it.description}
                    {it.quantity && it.quantity > 1 ? ` ×${it.quantity}` : ''}
                  </span>
                  <span className="tabular-nums">{money(it.total)}</span>
                </div>
              ))}
            </div>
          )}

          {invoice.subtotal != null && (
            <div className="space-y-1.5 border-t border-white/[0.08] pt-4">
              <div className="flex justify-between text-[12.5px] text-white/60">
                <span>Subtotal</span>
                <span className="tabular-nums">{money(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[12.5px] text-white/60">
                <span>
                  {invoice.reverse_charge
                    ? 'VAT — reverse charge'
                    : `VAT (${Number(invoice.vat_rate ?? 20)}%)`}
                </span>
                <span className="tabular-nums">{money(invoice.vat_amount)}</span>
              </div>
              {Number(invoice.cis_amount) > 0 && (
                <div className="flex justify-between text-[12.5px] text-white/60">
                  <span>Less CIS deduction ({Number(invoice.cis_rate ?? 20)}% of labour)</span>
                  <span className="tabular-nums text-red-400">−{money(invoice.cis_amount)}</span>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-white/[0.08] pt-4 flex justify-between items-baseline">
            <span className="text-[13px] text-white/60">{isPaid ? 'Amount paid' : 'Amount due'}</span>
            <span className="text-[26px] font-bold tabular-nums">
              {money(Number(invoice.amount) - (Number(invoice.cis_amount) || 0))}
            </span>
          </div>

          {invoice.reverse_charge && (
            <p className="text-[11px] text-white/40 leading-relaxed">
              VAT reverse charge applies. Customer to account to HMRC for the VAT of{' '}
              {money(Number(invoice.subtotal || 0) * (Number(invoice.vat_rate ?? 20) / 100))} (
              {Number(invoice.vat_rate ?? 20)}%). This invoice shows £0 VAT — do not pay the VAT to
              the supplier. VAT Act 1994, s.55A.
            </p>
          )}
          {invoice.due_date && !isPaid && (
            <p className="text-[12px] text-white/50">
              Due{' '}
              {new Date(invoice.due_date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}
        </div>

        {!isPaid && (bank.accountName || bank.sortCode || bank.accountNumber) && (
          <div className="rounded-2xl bg-elec-yellow/[0.06] border border-elec-yellow/25 p-5 space-y-3">
            <p className="text-[12px] uppercase tracking-[0.15em] text-elec-yellow/80 font-medium">
              Pay by bank transfer
            </p>
            <div className="grid grid-cols-2 gap-3 text-[13px]">
              {bank.accountName && (
                <div className="col-span-2">
                  <p className="text-white/50 text-[11px]">Account name</p>
                  <p className="font-medium">{bank.accountName}</p>
                </div>
              )}
              {bank.sortCode && (
                <div>
                  <p className="text-white/50 text-[11px]">Sort code</p>
                  <p className="font-medium tabular-nums">{bank.sortCode}</p>
                </div>
              )}
              {bank.accountNumber && (
                <div>
                  <p className="text-white/50 text-[11px]">Account number</p>
                  <p className="font-medium tabular-nums">{bank.accountNumber}</p>
                </div>
              )}
            </div>
            <p className="text-[11.5px] text-white/50">
              Use <span className="font-medium text-white/80">{invoice.invoice_number}</span> as the
              payment reference.
            </p>
          </div>
        )}

        {invoice.notes && <p className="text-[12.5px] text-white/60 whitespace-pre-wrap">{invoice.notes}</p>}

        <p className="text-center text-[11px] text-white/30">Powered by Elec-Mate</p>
      </div>
    </div>
  );
}
