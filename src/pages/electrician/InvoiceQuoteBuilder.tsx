import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { Quote, QuoteClient, QuoteItem, QuoteSettings, QuoteTag } from '@/types/quote';
import { Invoice, InvoiceItem, InvoiceSettings } from '@/types/invoice';
import { Loader2, ArrowLeft } from 'lucide-react';
import { InvoiceWizard } from '@/components/electrician/invoice-builder/InvoiceWizard';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { DepositChoicePanel } from '@/components/electrician/invoice-builder/DepositChoicePanel';
import {
  getDepositOffer,
  getPendingDeposit,
  type DepositOffer,
  type PendingDeposit,
} from '@/services/quoteDepositInvoice';
import { PendingDepositPanel } from '@/components/electrician/invoice-builder/PendingDepositPanel';

export default function InvoiceQuoteBuilder() {
  const { quoteId } = useParams<{ quoteId: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // ELE-2034 — a quote accepted in the app never had its deposit asked for.
  // Offer it before the invoice; "Invoice in full" carries on as before.
  const [depositOffer, setDepositOffer] = useState<DepositOffer | null>(null);
  // ELE-2034 — a deposit raised and not yet paid. Marking it paid reloads the
  // quote (reloadKey) so the conversion credits it.
  const [pendingDeposit, setPendingDeposit] = useState<PendingDeposit | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const fetchQuote = async () => {
      if (!quoteId) {
        toast({
          title: 'Error',
          description: 'No quote ID provided',
          variant: 'destructive',
        });
        navigate('/electrician/quotes');
        return;
      }

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          toast({
            title: 'Authentication required',
            description: 'Please sign in to continue',
            variant: 'destructive',
          });
          navigate('/auth/signin');
          return;
        }

        const { data, error } = await supabase
          .from('quotes')
          .select('*')
          .eq('id', quoteId)
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching quote:', error);
          toast({
            title: 'Error',
            description: 'Failed to load quote',
            variant: 'destructive',
          });
          navigate('/electrician/quotes');
          return;
        }

        if (!data) {
          toast({
            title: 'Quote not found',
            description: 'The requested quote could not be found',
            variant: 'destructive',
          });
          navigate('/electrician/quotes');
          return;
        }

        // Check if this is an existing invoice (has invoice_raised = true)
        const isExistingInvoice = data.invoice_raised === true;

        // Transform database row to Quote object - include ALL invoice fields
        const quoteData: Quote = {
          id: data.id,
          quoteNumber: data.quote_number,
          client: data.client_data as unknown as QuoteClient,
          items: data.items as unknown as QuoteItem[],
          settings: data.settings as unknown as QuoteSettings,
          subtotal: parseFloat(String(data.subtotal)),
          overhead: parseFloat(String(data.overhead)),
          profit: parseFloat(String(data.profit)),
          vatAmount: parseFloat(String(data.vat_amount)),
          total: parseFloat(String(data.total)),
          status: data.status as Quote['status'],
          tags: (data.tags || []) as unknown as QuoteTag[],
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
          expiryDate: new Date(data.expiry_date),
          jobDetails: data.job_details as unknown as Quote['jobDetails'],
          notes: data.notes,
          acceptance_status: data.acceptance_status as Quote['acceptance_status'],
          accepted_at: data.accepted_at ? new Date(data.accepted_at) : undefined,
          public_token: data.public_token,
          invoice_raised: data.invoice_raised || false,
          invoice_number: data.invoice_number,
          // Preserve existing invoice fields when editing
          invoice_date: data.invoice_date ? new Date(data.invoice_date) : undefined,
          invoice_due_date: data.invoice_due_date ? new Date(data.invoice_due_date) : undefined,
          invoice_status: data.invoice_status as Quote['invoice_status'],
          invoice_notes: data.invoice_notes,
          work_completion_date: data.work_completion_date
            ? new Date(data.work_completion_date)
            : undefined,
          // ELE-1760 — carry the paid deposit so the invoice conversion can
          // credit it. Without these two the deposit is invisible to the
          // builder and the client is billed the full total again.
          deposit_paid_at: data.deposit_paid_at ?? null,
          deposit_amount_pennies: data.deposit_amount_pennies ?? null,
        };

        setQuote(quoteData);
        if (!isExistingInvoice) {
          // Never blocks the builder: no offer, or a failed read, just means
          // the normal invoice.
          getDepositOffer(data.id)
            .then(setDepositOffer)
            .catch(() => setDepositOffer(null));
          getPendingDeposit(data.id)
            .then(setPendingDeposit)
            .catch(() => setPendingDeposit(null));
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        toast({
          title: 'Error',
          description: 'An unexpected error occurred',
          variant: 'destructive',
        });
        navigate('/electrician/quotes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, [quoteId, navigate, reloadKey]);

  const handleQuoteGenerated = (_invoiceId: string) => {
    if (quote?.invoice_raised && quoteId) {
      toast({
        title: 'Invoice updated',
        description: 'Your invoice has been updated successfully',
        variant: 'success',
      });
      navigate(`/electrician/invoices/${quoteId}/view`);
    } else {
      toast({
        title: 'Invoice created',
        description: 'Your invoice has been generated successfully',
        variant: 'success',
      });
      navigate('/electrician/invoices');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Helmet>
        <title>{quote?.invoice_raised ? 'Edit Invoice' : 'Create Invoice'} | Elec-Mate</title>
        <meta
          name="description"
          content="Create professional invoices with our guided invoice builder."
        />
      </Helmet>

      {/* Header — matching QuoteBuilderCreate */}
      <header className="sticky top-0 z-50 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-3 px-4 h-14">
          <button
            onClick={() => {
              if (quote?.invoice_raised) navigate('/electrician/invoices');
              else navigate('/electrician/quotes');
            }}
            className="h-11 w-11 -ml-2 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-white">
              {quote?.invoice_raised ? 'Edit Invoice' : 'Create Invoice'}
            </h1>
            {quote?.invoice_number && (
              <p className="text-[11px] text-white font-mono">{quote.invoice_number}</p>
            )}
          </div>
        </div>
      </header>

      <div className="px-0 sm:px-2 py-3 animate-fade-in">
        {quote && quote.invoice_raised && quote.invoice_number ? (
          <InvoiceWizard
            existingInvoice={{
              ...quote,
              invoice_number: quote.invoice_number,
              // Preserve existing invoice dates - don't overwrite with new dates!
              invoice_date: quote.invoice_date || new Date(),
              invoice_due_date:
                quote.invoice_due_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              invoice_status: quote.invoice_status || 'draft',
              invoice_raised: true,
              additional_invoice_items: [],
              invoice_notes: quote.invoice_notes,
              work_completion_date: quote.work_completion_date || new Date(),
              originalQuoteId: quote.id,
              items: quote.items.map((item) => {
                /*
                 * ELE-1780 — the LINK is dropped, the HOURS are kept. They
                 * are different things and only one of them is safe to carry.
                 *
                 * `derivedFromItemId` is a live relationship: on the quote it
                 * ties a labour line to the material whose allowance produced
                 * it, and `useQuoteBuilder` maintains the pair on every add,
                 * edit and delete. The invoice builder has no such logic, so
                 * a link carried across would orphan the labour the first
                 * time someone deleted the material there — precisely the
                 * defect this feature exists to remove.
                 *
                 * `timeAllowance` is a record, not a relationship. The
                 * invoice is the end of the job, and the hours allowed are
                 * part of what was done — worth keeping so the figure can be
                 * explained, and so quoted-against-actual is answerable later
                 * without re-deriving it from the labour lines.
                 */
                const { derivedFromItemId: _link, ...line } = item;
                return {
                  ...line,
                  completionStatus: 'completed' as const,
                  actualQuantity: item.quantity,
                };
              }) as InvoiceItem[],
              settings: {
                ...quote.settings,
                overheadPercentage: 0, // Already baked into item prices
                profitMargin: 0, // Already baked into item prices
                // Preserve existing payment terms and due date from settings!
                paymentTerms: quote.settings?.paymentTerms || '30 days',
                dueDate:
                  quote.invoice_due_date ||
                  quote.settings?.dueDate ||
                  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              } as InvoiceSettings,
            }}
            onInvoiceGenerated={handleQuoteGenerated}
          />
        ) : quote ? (
          <InvoiceWizard
            key={reloadKey}
            sourceQuote={quote}
            onInvoiceGenerated={handleQuoteGenerated}
          />
        ) : null}
      </div>

      {quote && pendingDeposit && (
        <Sheet open onOpenChange={(open) => !open && setPendingDeposit(null)}>
          <SheetContent
            side="bottom"
            className="h-[85vh] overflow-y-auto rounded-t-2xl border-white/[0.14] bg-background p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:mx-auto sm:max-w-lg"
          >
            <VisuallyHidden>
              <SheetTitle>The deposit isn't paid yet</SheetTitle>
              <SheetDescription>
                Mark the deposit paid so it comes off the invoice, or invoice the full amount.
              </SheetDescription>
            </VisuallyHidden>
            <PendingDepositPanel
              quoteId={quote.id}
              pending={pendingDeposit}
              onMarkedPaid={() => {
                setPendingDeposit(null);
                setReloadKey((k) => k + 1);
              }}
              onFullAmount={() => setPendingDeposit(null)}
            />
          </SheetContent>
        </Sheet>
      )}

      {quote && depositOffer && (
        <Sheet open onOpenChange={(open) => !open && setDepositOffer(null)}>
          <SheetContent
            side="bottom"
            className="h-[85vh] overflow-y-auto rounded-t-2xl border-white/[0.14] bg-background p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:mx-auto sm:max-w-lg"
          >
            <VisuallyHidden>
              <SheetTitle>Take the deposit first?</SheetTitle>
              <SheetDescription>
                Raise a deposit invoice now, or invoice the full amount.
              </SheetDescription>
            </VisuallyHidden>
            <DepositChoicePanel
              quoteId={quote.id}
              offer={depositOffer}
              onFullAmount={() => setDepositOffer(null)}
              onDone={() => navigate(`/electrician/quotes/view/${quote.id}`)}
            />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
