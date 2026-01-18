import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Quote } from '@/types/quote';
import { supabase } from '@/integrations/supabase/client';
import { QuoteWizard } from '@/components/electrician/quote-builder/QuoteWizard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const QuoteBuilderEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadQuote = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('quotes')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        if (!data) {
          setError(true);
          toast({
            title: "Quote Not Found",
            description: "The quote you're looking for doesn't exist or has been deleted.",
            variant: "destructive"
          });
        } else {
          // Transform the database record to Quote type
          const transformedQuote: Quote = {
            id: data.id,
            quoteNumber: data.quote_number,
            client: typeof data.client_data === 'string' ? JSON.parse(data.client_data) : data.client_data,
            items: typeof data.items === 'string' ? JSON.parse(data.items) : data.items,
            settings: typeof data.settings === 'string' ? JSON.parse(data.settings) : data.settings,
            jobDetails: data.job_details ? (typeof data.job_details === 'string' ? JSON.parse(data.job_details) : data.job_details) : undefined,
            subtotal: data.subtotal || 0,
            overhead: data.overhead || 0,
            profit: data.profit || 0,
            vatAmount: data.vat_amount || 0,
            total: data.total || 0,
            status: data.status as Quote['status'],
            tags: data.tags as Quote['tags'],
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
            expiryDate: new Date(data.expiry_date),
            notes: data.notes || undefined,
            acceptance_status: data.acceptance_status as Quote['acceptance_status'],
            acceptance_method: data.acceptance_method as Quote['acceptance_method'],
            accepted_at: data.accepted_at ? new Date(data.accepted_at) : undefined,
            accepted_by_name: data.accepted_by_name || undefined,
            accepted_by_email: data.accepted_by_email || undefined,
            invoice_raised: data.invoice_raised || false,
            invoice_number: data.invoice_number || undefined,
          };
          setQuote(transformedQuote);
        }
      } catch (err) {
        console.error('Error loading quote:', err);
        setError(true);
        toast({
          title: "Error",
          description: "Failed to load quote. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadQuote();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="space-y-6">
        <SmartBackButton />
        <div className="text-center py-12 space-y-4">
          <h2 className="text-2xl font-bold">Quote Not Found</h2>
          <p className="text-muted-foreground">
            The quote you're looking for doesn't exist or may have been deleted.
          </p>
          <Button onClick={() => navigate('/electrician/quote-builder')}>
            View All Quotes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background  ">
      <div className="space-y-6 px-4 py-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <SmartBackButton />
          <div>
            <h1 className="text-2xl font-bold">Edit Quote {quote.quoteNumber}</h1>
            <p className="text-sm text-muted-foreground">
              Make changes to your existing quote
            </p>
          </div>
        </div>

        <QuoteWizard
          initialQuote={quote}
          onQuoteGenerated={() => navigate('/electrician/quote-builder')}
        />
      </div>
    </div>
  );
};

export default QuoteBuilderEdit;
