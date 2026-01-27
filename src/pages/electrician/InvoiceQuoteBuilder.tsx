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

export default function InvoiceQuoteBuilder() {
  const { quoteId } = useParams<{ quoteId: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        const { data: { user } } = await supabase.auth.getUser();
        
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
          work_completion_date: data.work_completion_date ? new Date(data.work_completion_date) : undefined,
        };

        setQuote(quoteData);
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
  }, [quoteId, navigate]);

  const handleQuoteGenerated = () => {
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
    <div className="bg-background  ">
      <Helmet>
        <title>Adjust Invoice Costs - Electrical Hub</title>
        <meta name="description" content="Adjust costs and items before generating your invoice" />
      </Helmet>

      <div className="px-4 py-4 sm:py-6 animate-fade-in">
        <div className="mb-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (quote?.invoice_raised) {
                navigate('/electrician/invoices');
              } else {
                navigate('/electrician/quotes');
              }
            }}
            className="h-10 mb-3 -ml-2 touch-manipulation"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {quote?.invoice_raised ? 'Back to Invoices' : 'Back to Quotes'}
          </Button>

          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {quote?.invoice_raised ? 'Edit Invoice' : 'Create Invoice'}
          </h1>
          <p className="text-muted-foreground">
            {quote?.invoice_raised
              ? `Editing ${quote.invoice_number}`
              : 'Review and modify the quote items before generating the final invoice'
            }
          </p>
        </div>
        
        {quote && quote.invoice_raised && quote.invoice_number ? (
          <InvoiceWizard
            existingInvoice={{
              ...quote,
              invoice_number: quote.invoice_number,
              // Preserve existing invoice dates - don't overwrite with new dates!
              invoice_date: quote.invoice_date || new Date(),
              invoice_due_date: quote.invoice_due_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              invoice_status: quote.invoice_status || 'draft',
              invoice_raised: true,
              additional_invoice_items: [],
              invoice_notes: quote.invoice_notes,
              work_completion_date: quote.work_completion_date || new Date(),
              originalQuoteId: quote.id,
              items: quote.items.map(item => ({
                ...item,
                completionStatus: 'completed' as const,
                actualQuantity: item.quantity,
              })) as InvoiceItem[],
              settings: {
                ...quote.settings,
                overheadPercentage: 0,  // Already baked into item prices
                profitMargin: 0,        // Already baked into item prices
                // Preserve existing payment terms and due date from settings!
                paymentTerms: quote.settings?.paymentTerms || '30 days',
                dueDate: quote.invoice_due_date || quote.settings?.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              } as InvoiceSettings,
            }}
            onInvoiceGenerated={handleQuoteGenerated}
          />
        ) : quote ? (
          <InvoiceWizard sourceQuote={quote} onInvoiceGenerated={handleQuoteGenerated} />
        ) : null}
      </div>
    </div>
  );
}
