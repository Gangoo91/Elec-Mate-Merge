import { Invoice } from '@/types/invoice';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const generateInvoicePDF = async (invoice: Partial<Invoice>, companyProfile?: any) => {
  try {
    // Call the PDF Monkey edge function
    const { data, error } = await supabase.functions.invoke('generate-pdf-monkey', {
      body: {
        quote: {
          ...invoice,
          // Transform invoice data to match quote format for PDF generation
          invoice_mode: true,
          invoice_number: invoice.invoice_number,
          invoice_date: invoice.invoice_date,
          invoice_due_date: invoice.invoice_due_date,
          invoice_status: invoice.invoice_status,
          work_completion_date: invoice.work_completion_date,
          additional_invoice_items: invoice.additional_invoice_items,
          invoice_notes: invoice.invoice_notes,
        },
        companyProfile,
      },
    });

    if (error) {
      console.error('Error generating invoice PDF:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate invoice PDF. Please try again.',
        variant: 'destructive',
      });
      return false;
    }

    if (data?.download_url) {
      // Download the PDF
      window.open(data.download_url, '_blank');
      toast({
        title: 'Success',
        description: 'Invoice PDF generated successfully',
      });
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error generating invoice PDF:', error);
    toast({
      title: 'Error',
      description: 'Failed to generate invoice PDF. Please try again.',
      variant: 'destructive',
    });
    return false;
  }
};


// Keep the HTML generation function for potential future use or preview
const generateInvoiceHTML = (invoice: Partial<Invoice>, companyProfile?: any): string => {
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const allItems = [...(invoice.items || []), ...(invoice.additional_invoice_items || [])];

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; font-size: 12pt; color: #333; padding: 20px; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 3px solid #1e40af; padding-bottom: 20px; }
          .company-info { flex: 1; }
          .invoice-title { font-size: 32pt; font-weight: bold; color: #1e40af; text-align: right; }
          .invoice-meta { text-align: right; margin-top: 10px; }
          .invoice-meta div { margin: 5px 0; }
          .parties { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .party { width: 48%; }
          .party-title { font-weight: bold; margin-bottom: 10px; color: #1e40af; }
          .party-content { line-height: 1.6; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { background-color: #1e40af; color: white; padding: 12px; text-align: left; font-weight: bold; }
          td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
          tr:nth-child(even) { background-color: #f9fafb; }
          .totals { margin-left: auto; width: 300px; }
          .totals-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .totals-row.total { font-size: 14pt; font-weight: bold; background-color: #1e40af; color: white; padding: 12px; margin-top: 10px; }
          .payment-info { margin-top: 40px; padding: 20px; background-color: #f3f4f6; border-left: 4px solid #1e40af; }
          .payment-title { font-weight: bold; margin-bottom: 10px; color: #1e40af; }
          .notes { margin-top: 30px; padding: 15px; background-color: #fffbeb; border-left: 4px solid #f59e0b; }
          .footer { margin-top: 50px; text-align: center; font-size: 10pt; color: #6b7280; padding-top: 20px; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-info">
            <h1 style="font-size: 20pt; margin-bottom: 10px;">${companyProfile?.company_name || 'Your Company'}</h1>
            <div>${companyProfile?.company_address || ''}</div>
            <div>${companyProfile?.company_postcode || ''}</div>
            <div style="margin-top: 10px;">Tel: ${companyProfile?.company_phone || ''}</div>
            <div>Email: ${companyProfile?.company_email || ''}</div>
            ${companyProfile?.vat_number ? `<div>VAT No: ${companyProfile.vat_number}</div>` : ''}
          </div>
          <div>
            <div class="invoice-title">INVOICE</div>
            <div class="invoice-meta">
              <div><strong>Invoice No:</strong> ${invoice.invoice_number || 'N/A'}</div>
              <div><strong>Invoice Date:</strong> ${formatDate(invoice.invoice_date)}</div>
              <div><strong>Due Date:</strong> ${formatDate(invoice.invoice_due_date)}</div>
              <div style="color: #dc2626; font-weight: bold;">Status: ${(invoice.invoice_status || 'draft').toUpperCase()}</div>
            </div>
          </div>
        </div>

        <div class="parties">
          <div class="party">
            <div class="party-title">BILL TO:</div>
            <div class="party-content">
              <div style="font-weight: bold; margin-bottom: 5px;">${invoice.client?.name || 'N/A'}</div>
              <div>${invoice.client?.address || ''}</div>
              <div>${invoice.client?.postcode || ''}</div>
              <div style="margin-top: 5px;">Tel: ${invoice.client?.phone || ''}</div>
              <div>Email: ${invoice.client?.email || ''}</div>
            </div>
          </div>
          <div class="party">
            <div class="party-title">PROJECT DETAILS:</div>
            <div class="party-content">
              <div><strong>Project:</strong> ${invoice.jobDetails?.title || 'N/A'}</div>
              <div><strong>Location:</strong> ${invoice.jobDetails?.location || 'N/A'}</div>
              <div><strong>Work Completed:</strong> ${formatDate(invoice.work_completion_date)}</div>
              ${invoice.quoteNumber ? `<div><strong>Original Quote:</strong> ${invoice.quoteNumber}</div>` : ''}
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 50%;">Description</th>
              <th style="width: 10%; text-align: center;">Qty</th>
              <th style="width: 10%; text-align: center;">Unit</th>
              <th style="width: 15%; text-align: right;">Unit Price</th>
              <th style="width: 15%; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${allItems.map(item => `
              <tr>
                <td>
                  <div style="font-weight: bold;">${item.description}</div>
                  ${item.notes ? `<div style="font-size: 10pt; color: #6b7280; margin-top: 4px;">${item.notes}</div>` : ''}
                </td>
                <td style="text-align: center;">${item.actualQuantity || item.quantity}</td>
                <td style="text-align: center;">${item.unit}</td>
                <td style="text-align: right;">${formatCurrency(item.unitPrice)}</td>
                <td style="text-align: right; font-weight: bold;">${formatCurrency(item.totalPrice)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="totals">
          <div class="totals-row">
            <span>Subtotal:</span>
            <span>${formatCurrency(invoice.subtotal || 0)}</span>
          </div>
          ${invoice.overhead ? `
            <div class="totals-row">
              <span>Overhead (${invoice.settings?.overheadPercentage}%):</span>
              <span>${formatCurrency(invoice.overhead)}</span>
            </div>
          ` : ''}
          ${invoice.profit ? `
            <div class="totals-row">
              <span>Profit (${invoice.settings?.profitMargin}%):</span>
              <span>${formatCurrency(invoice.profit)}</span>
            </div>
          ` : ''}
          ${invoice.vatAmount ? `
            <div class="totals-row">
              <span>VAT (${invoice.settings?.vatRate}%):</span>
              <span>${formatCurrency(invoice.vatAmount)}</span>
            </div>
          ` : ''}
          <div class="totals-row total">
            <span>TOTAL DUE:</span>
            <span>${formatCurrency(invoice.total || 0)}</span>
          </div>
        </div>

        ${invoice.settings?.bankDetails ? `
          <div class="payment-info">
            <div class="payment-title">PAYMENT DETAILS</div>
            <div>Payment Terms: ${invoice.settings.paymentTerms || '30 days'}</div>
            <div style="margin-top: 10px;">
              <div><strong>Bank Transfer Details:</strong></div>
              <div>Account Name: ${invoice.settings.bankDetails.accountName}</div>
              <div>Account Number: ${invoice.settings.bankDetails.accountNumber}</div>
              <div>Sort Code: ${invoice.settings.bankDetails.sortCode}</div>
            </div>
            <div style="margin-top: 10px; font-style: italic;">
              Please include invoice number ${invoice.invoice_number} as payment reference.
            </div>
          </div>
        ` : ''}

        ${invoice.invoice_notes ? `
          <div class="notes">
            <div style="font-weight: bold; margin-bottom: 5px;">Notes:</div>
            <div>${invoice.invoice_notes}</div>
          </div>
        ` : ''}

        <div class="footer">
          <div>Thank you for your business!</div>
          ${companyProfile?.company_website ? `<div style="margin-top: 5px;">${companyProfile.company_website}</div>` : ''}
          ${companyProfile?.company_registration ? `<div>Company Registration: ${companyProfile.company_registration}</div>` : ''}
        </div>
      </body>
    </html>
  `;
};
