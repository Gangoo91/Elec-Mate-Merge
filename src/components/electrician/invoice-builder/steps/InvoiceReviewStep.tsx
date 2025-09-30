import { Invoice } from '@/types/invoice';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from '@/components/ui/mobile-accordion';
import { FileText, User, Banknote } from 'lucide-react';

interface InvoiceReviewStepProps {
  invoice: Partial<Invoice>;
}

export const InvoiceReviewStep = ({ invoice }: InvoiceReviewStepProps) => {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-GB');
  };

  const totalAmount = invoice.total || 0;

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Quote Number</p>
              <p className="text-sm font-semibold">{invoice.quoteNumber || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Client</p>
              <p className="text-sm font-semibold truncate">{invoice.client?.name || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="text-sm font-semibold">{formatDate(invoice.createdAt)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-lg font-bold text-primary">{formatCurrency(totalAmount)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-bold mb-2">Review Quote Details</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Review the original quote details before adding any additional items or settings.
        </p>
      </div>

      {/* Accordion Sections */}
      <MobileAccordion type="multiple" defaultValue={['client', 'quote', 'items']}>
        <MobileAccordionItem value="client">
          <MobileAccordionTrigger icon={<User className="h-4 w-4" />}>
            Client Information
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <div>
                <Label className="text-xs text-muted-foreground">Client Name</Label>
                <p className="font-medium">{invoice.client?.name || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Client Email</Label>
                <p className="font-medium break-all">{invoice.client?.email || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Client Phone</Label>
                <p className="font-medium">{invoice.client?.phone || 'N/A'}</p>
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs text-muted-foreground">Address</Label>
                <p className="font-medium">{invoice.client?.address || 'N/A'}</p>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="quote">
          <MobileAccordionTrigger icon={<FileText className="h-4 w-4" />}>
            Quote Details
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              <div>
                <Label className="text-xs text-muted-foreground">Quote Number</Label>
                <p className="font-medium">{invoice.quoteNumber || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Quote Date</Label>
                <p className="font-medium">{formatDate(invoice.createdAt)}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Expiry Date</Label>
                <p className="font-medium">{formatDate(invoice.expiryDate)}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Status</Label>
                <Badge variant="secondary" className="mt-1">{invoice.status || 'N/A'}</Badge>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="items">
          <MobileAccordionTrigger icon={<Banknote className="h-4 w-4" />}>
            Quote Items ({invoice.items?.length || 0})
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="p-4 space-y-3">
              {/* Mobile-optimized item cards */}
              <div className="block md:hidden space-y-3">
                {invoice.items?.map((item, index) => (
                  <Card key={index} className="p-3">
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium">{item.description}</p>
                        {item.notes && (
                          <p className="text-xs text-muted-foreground mt-1">{item.notes}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-xs text-muted-foreground">Qty:</span>
                          <p className="font-medium">{item.quantity} {item.unit}</p>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">Unit:</span>
                          <p className="font-medium">{formatCurrency(item.unitPrice)}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground">Total:</span>
                          <p className="font-bold">{formatCurrency(item.totalPrice)}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Description</th>
                      <th className="text-center py-2">Qty</th>
                      <th className="text-center py-2">Unit</th>
                      <th className="text-right py-2">Unit Price</th>
                      <th className="text-right py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items?.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3">
                          <div className="font-medium">{item.description}</div>
                          {item.notes && (
                            <div className="text-sm text-muted-foreground">{item.notes}</div>
                          )}
                        </td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-center">{item.unit}</td>
                        <td className="text-right">{formatCurrency(item.unitPrice)}</td>
                        <td className="text-right font-medium">
                          {formatCurrency(item.totalPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="font-semibold">Quote Total:</span>
                <span className="text-xl md:text-2xl font-bold text-primary">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};
