import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Quote } from '@/types/quote';
import { InvoiceWizard } from '@/components/electrician/invoice-builder/InvoiceWizard';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet';

const InvoiceBuilder = () => {
  const { quoteId } = useParams<{ quoteId: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (quoteId) {
      fetchQuote();
    } else {
      setIsLoading(false);
    }
  }, [quoteId]);

  const fetchQuote = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to create invoices',
          variant: 'destructive',
        });
        navigate('/electrician/quotes');
        return;
      }

      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', quoteId)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      if (!data) {
        toast({
          title: 'Quote not found',
          description: 'The requested quote could not be found',
          variant: 'destructive',
        });
        navigate('/electrician/quotes');
        return;
      }

      // Transform the database record to Quote type
      const quoteData: Quote = {
        id: data.id,
        quoteNumber: data.quote_number,
        client: data.client_data as any,
        items: data.items as any,
        settings: data.settings as any,
        subtotal: data.subtotal,
        overhead: data.overhead,
        profit: data.profit,
        vatAmount: data.vat_amount,
        total: data.total,
        status: data.status as any,
        tags: data.tags as any,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        expiryDate: new Date(data.expiry_date),
        notes: data.notes,
      };
      
      setQuote(quoteData);
    } catch (error) {
      console.error('Error fetching quote:', error);
      toast({
        title: 'Error loading quote',
        description: 'Failed to load quote data. Please try again.',
        variant: 'destructive',
      });
      navigate('/electrician/quotes');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Invoice Builder | ElecMate</title>
        <meta name="description" content="Create professional invoices from approved quotes" />
      </Helmet>
      
      <div className="container mx-auto py-6 px-4">
        <InvoiceWizard sourceQuote={quote || undefined} />
      </div>
    </>
  );
};

export default InvoiceBuilder;
