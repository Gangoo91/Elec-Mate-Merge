import { useState } from 'react';
import { Invoice } from '@/types/invoice';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download } from 'lucide-react';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface InvoiceGenerationStepProps {
  invoice: Partial<Invoice>;
  onGenerate: () => void;
  onSave: () => Promise<boolean>;
  isGenerating: boolean;
}

export const InvoiceGenerationStep = ({
  invoice,
  onGenerate,
  onSave,
  isGenerating,
}: InvoiceGenerationStepProps) => {
  const { companyProfile } = useCompanyProfile();
  const [isPreviewing, setIsPreviewing] = useState(false);

  // Poll PDF Monkey status via edge function until downloadUrl is ready (max ~90s)
  const pollPdfDownloadUrl = async (documentId: string, accessToken: string): Promise<string | null> => {
    for (let i = 0; i < 45; i++) {
      const { data } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: { documentId, mode: 'status' },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (data?.downloadUrl) return data.downloadUrl;
      await new Promise((res) => setTimeout(res, 2000));
    }
    return null;
  };
  
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-GB');
  };

  // Items already merged in database during save
  const allItems = invoice.items || [];

  const handlePreviewPDF = async () => {
    setIsPreviewing(true);
    try {
      const success = await onSave();
      if (!success) {
        throw new Error('Failed to save invoice');
      }

      // Get user session for authentication
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }

      // Use items directly from invoice - they're already merged in DB
      const mergedItems = invoice.items || [];
      
      const completeInvoice = {
        ...invoice,
        items: mergedItems,
        additional_invoice_items: [], // Already merged
        jobDetails: invoice.jobDetails,
      };

      // Generate professional PDF using PDF Monkey template
      toast({
        title: 'Generating Professional PDF',
        description: 'Creating invoice preview with your branded template...',
      });

      const { data: pdfData, error: pdfError } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: {
          quote: completeInvoice,
          companyProfile: companyProfile,
          invoice_mode: true  // Uses DC891A6A-4B38-48F5-A7DB-7CD0B550F4A2 template
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      let pdfUrl: string | undefined = pdfData?.downloadUrl;
      const documentId: string | undefined = pdfData?.documentId;
      if (!pdfUrl && documentId) {
        toast({ title: 'Preparing PDF…', description: 'Finalising your professional invoice…' });
        pdfUrl = await pollPdfDownloadUrl(documentId, session.access_token) || undefined;
      }

      if (pdfError || !pdfUrl) {
        console.error('PDF Monkey error:', pdfError);
        throw new Error('Failed to generate professional PDF');
      }

      // Open PDF in new tab
      window.open(pdfUrl, '_blank');

      toast({
        title: 'Invoice PDF Ready',
        description: 'Professional invoice PDF has been generated',
        variant: 'success',
      });
    } catch (error) {
      console.error('Preview PDF error:', error);
      toast({
        title: 'PDF Generation Failed',
        description: error instanceof Error ? error.message : 'Failed to generate PDF preview',
        variant: 'destructive',
      });
    } finally {
      setIsPreviewing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Review & Generate Invoice</h2>
        <p className="text-muted-foreground">
          Review all invoice details before generating the final invoice.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Invoice Number</div>
          <div className="font-semibold text-lg">{invoice.invoice_number}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Invoice Date</div>
          <div className="font-semibold text-lg">{formatDate(invoice.invoice_date)}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Due Date</div>
          <div className="font-semibold text-lg">{formatDate(invoice.invoice_due_date)}</div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Client</h3>
        <div className="text-sm space-y-1">
          <div className="font-medium">{invoice.client?.name}</div>
          <div className="text-muted-foreground">{invoice.client?.email}</div>
          <div className="text-muted-foreground">{invoice.client?.address}, {invoice.client?.postcode}</div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Items Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Original Quote Items:</span>
            <span className="font-medium">{invoice.items?.length || 0}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Additional Items:</span>
            <span className="font-medium">{invoice.additional_invoice_items?.length || 0}</span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t">
            <span className="font-semibold">Total Items:</span>
            <span className="font-semibold">{allItems.length}</span>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-primary/5">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>{formatCurrency(invoice.subtotal || 0)}</span>
          </div>
          {invoice.overhead && invoice.overhead > 0 && (
            <div className="flex justify-between text-sm">
              <span>Overhead:</span>
              <span>{formatCurrency(invoice.overhead)}</span>
            </div>
          )}
          {invoice.profit && invoice.profit > 0 && (
            <div className="flex justify-between text-sm">
              <span>Profit:</span>
              <span>{formatCurrency(invoice.profit)}</span>
            </div>
          )}
          {invoice.vatAmount && invoice.vatAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span>VAT:</span>
              <span>{formatCurrency(invoice.vatAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-primary/20">
            <span>Total:</span>
            <span>{formatCurrency(invoice.total || 0)}</span>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Payment Information</h3>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Terms:</span>
            <span className="font-medium">{invoice.settings?.paymentTerms || 'N/A'}</span>
          </div>
          {invoice.settings?.bankDetails && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Name:</span>
                <span className="font-medium">{invoice.settings.bankDetails.accountName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Number:</span>
                <span className="font-medium">{invoice.settings.bankDetails.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sort Code:</span>
                <span className="font-medium">{invoice.settings.bankDetails.sortCode}</span>
              </div>
            </>
          )}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handlePreviewPDF}
          disabled={isPreviewing || isGenerating}
          className="flex-1 h-10"
        >
          <Download className="mr-2 h-4 w-4" />
          {isPreviewing ? 'Generating...' : 'Preview PDF'}
        </Button>
        <Button
          onClick={onGenerate}
          disabled={isGenerating || isPreviewing}
          className="flex-1 h-10"
        >
          <FileText className="mr-2 h-4 w-4" />
          {isGenerating ? 'Generating...' : 'Save Invoice'}
        </Button>
      </div>
    </div>
  );
};
