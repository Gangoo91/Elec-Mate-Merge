import { Invoice } from '@/types/invoice';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Review Original Quote</h2>
        <p className="text-muted-foreground mb-4">
          Review the items from the original quote before adding any additional work.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Client Information</h3>
          <div className="space-y-1 text-sm">
            <p><strong>Name:</strong> {invoice.client?.name}</p>
            <p><strong>Email:</strong> {invoice.client?.email}</p>
            <p><strong>Phone:</strong> {invoice.client?.phone}</p>
            <p><strong>Address:</strong> {invoice.client?.address}</p>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-2">Quote Details</h3>
          <div className="space-y-1 text-sm">
            <p><strong>Quote Number:</strong> {invoice.quoteNumber}</p>
            <p><strong>Quote Date:</strong> {formatDate(invoice.createdAt)}</p>
            <p><strong>Expiry Date:</strong> {formatDate(invoice.expiryDate)}</p>
            <p><strong>Status:</strong> <Badge variant="secondary">{invoice.status}</Badge></p>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Quote Items</h3>
        <div className="overflow-x-auto">
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
                  <td className="py-2">
                    <div className="font-medium">{item.description}</div>
                    {item.notes && (
                      <div className="text-sm text-muted-foreground">{item.notes}</div>
                    )}
                  </td>
                  <td className="text-center py-2">{item.quantity}</td>
                  <td className="text-center py-2">{item.unit}</td>
                  <td className="text-right py-2">{formatCurrency(item.unitPrice)}</td>
                  <td className="text-right py-2 font-medium">{formatCurrency(item.totalPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-4 bg-primary/5">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Quote Total:</span>
          <span className="text-2xl font-bold">{formatCurrency(invoice.total || 0)}</span>
        </div>
      </Card>
    </div>
  );
};
