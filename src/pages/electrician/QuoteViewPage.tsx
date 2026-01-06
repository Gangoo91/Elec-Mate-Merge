import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Quote } from '@/types/quote';
import { supabase } from '@/integrations/supabase/client';
import { QuoteReviewStep } from '@/components/electrician/quote-builder/steps/QuoteReviewStep';
import { MobileButton } from '@/components/ui/mobile-button';
import { Loader2, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Helmet } from 'react-helmet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const QuoteViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
          
          // Debug logging for send button functionality
          console.log('Quote loaded for send debugging:', {
            hasId: !!transformedQuote.id,
            hasEmail: !!transformedQuote.client?.email,
            id: transformedQuote.id,
            email: transformedQuote.client?.email
          });
          
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

  const handleDelete = async () => {
    if (!quote) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', quote.id);

      if (error) throw error;

      toast({
        title: "Quote Deleted",
        description: `Quote ${quote.quoteNumber} has been deleted successfully.`,
        variant: "success"
      });
      
      navigate('/electrician/quote-builder');
    } catch (err) {
      console.error('Error deleting quote:', err);
      toast({
        title: "Error",
        description: "Failed to delete quote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const canonical = `${window.location.origin}/electrician/quotes/view/${id}`;

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
          <MobileButton onClick={() => navigate('/electrician/quote-builder')}>
            View All Quotes
          </MobileButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <Helmet>
        <title>View Quote {quote.quoteNumber} | Professional Electrical Quote</title>
        <meta
          name="description"
          content={`View details for electrical quote ${quote.quoteNumber} for ${quote.client?.name || 'client'}`}
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Header */}
      <header className="relative bg-card border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative px-4 py-8 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/electrician/business" className="hover:text-foreground transition-colors">
              Business Hub
            </Link>
            <span>/</span>
            <Link to="/electrician/quote-builder" className="hover:text-foreground transition-colors">
              Quote Builder
            </Link>
            <span>/</span>
            <Link to="/electrician/quotes" className="hover:text-foreground transition-colors">
              All Quotes
            </Link>
            <span>/</span>
            <span>View Quote</span>
          </nav>

          {/* Title and Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Quote {quote.quoteNumber}
              </h1>
              <p className="text-muted-foreground text-lg">
                View-only display of quote details
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <SmartBackButton className="w-full sm:w-auto" />
              <MobileButton
                variant="elec"
                size="wide"
                className="sm:w-auto w-full"
                onClick={() => navigate(`/electrician/quote-builder/${quote.id}`)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit This Quote
              </MobileButton>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-8 space-y-8 animate-fade-in">
        <div className="max-w-[1400px] mx-auto">
          <main className="space-y-8">
          {/* Quote Review Component */}
          <QuoteReviewStep quote={quote} />

          {/* Action Bar at Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-card border rounded-lg">
            <div className="text-center sm:text-left">
              <h3 className="font-semibold text-lg">Need to make changes?</h3>
              <p className="text-sm text-muted-foreground">
                Edit the quote or delete it if no longer needed
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <MobileButton
                variant="elec"
                size="wide"
                className="sm:w-auto"
                onClick={() => navigate(`/electrician/quote-builder/${quote.id}`)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Quote
              </MobileButton>
              <MobileButton
                variant="destructive"
                size="wide"
                className="sm:w-auto"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Quote
              </MobileButton>
            </div>
          </div>
        </main>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Quote {quote.quoteNumber}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the quote
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuoteViewPage;
