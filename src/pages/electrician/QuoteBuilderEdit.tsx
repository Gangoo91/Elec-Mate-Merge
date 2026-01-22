import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Quote } from '@/types/quote';
import { supabase } from '@/integrations/supabase/client';
import { QuoteWizard } from '@/components/electrician/quote-builder/QuoteWizard';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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
      <motion.div
        className="min-h-screen bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* iOS-style Header */}
        <header className="sticky top-0 z-50 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center gap-3 px-4 h-14">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/electrician/quote-builder')}
              className="h-10 w-10 -ml-2 touch-manipulation active:scale-95 hover:bg-white/5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-semibold text-white truncate">Quote Not Found</h1>
            </div>
          </div>
        </header>

        <div className="px-4 py-12 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/[0.03] flex items-center justify-center">
            <FileText className="h-8 w-8 text-white/30" />
          </div>
          <h2 className="text-xl font-semibold text-white">Quote Not Found</h2>
          <p className="text-[14px] text-white/50">
            The quote you're looking for doesn't exist or may have been deleted.
          </p>
          <Button
            onClick={() => navigate('/electrician/quote-builder')}
            className="mt-4 h-12 px-6 rounded-xl bg-elec-yellow text-black font-semibold touch-manipulation active:scale-95"
          >
            View All Quotes
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-background pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-3 px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/electrician/quotes')}
            className="h-10 w-10 -ml-2 touch-manipulation active:scale-95 hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-white truncate">Edit {quote.quoteNumber}</h1>
            <p className="text-[11px] text-white/50">Make changes to your quote</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-4">
        <QuoteWizard
          initialQuote={quote}
          onQuoteGenerated={() => navigate('/electrician/quote-builder')}
        />
      </div>
    </motion.div>
  );
};

export default QuoteBuilderEdit;
