import { InvoiceSettings } from '@/types/invoice';
import { MobileInputWrapper } from '@/components/ui/mobile-input-wrapper';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, CreditCard, FileText, Info } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InvoiceSettingsStepProps {
  settings?: InvoiceSettings;
  notes?: string;
  onUpdateSettings: (settings: Partial<InvoiceSettings>) => void;
  onUpdateNotes: (notes: string) => void;
}

export const InvoiceSettingsStep = ({
  settings,
  notes,
  onUpdateSettings,
  onUpdateNotes,
}: InvoiceSettingsStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Invoice Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure payment terms and bank details for this invoice.
        </p>
      </div>

      {/* Payment Terms Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Payment Terms</CardTitle>
          </div>
          <CardDescription>
            Set when payment is due for this invoice
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paymentTerms" className="text-sm">Payment Terms</Label>
              <Select
                value={settings?.paymentTerms || '30 days'}
                onValueChange={(value) => onUpdateSettings({ paymentTerms: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Due on receipt">Due on receipt</SelectItem>
                  <SelectItem value="7 days">7 days</SelectItem>
                  <SelectItem value="14 days">14 days</SelectItem>
                  <SelectItem value="30 days">30 days (Standard)</SelectItem>
                  <SelectItem value="60 days">60 days</SelectItem>
                  <SelectItem value="90 days">90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dueDate" className="text-sm">Due Date</Label>
              <input
                id="dueDate"
                type="date"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                value={settings?.dueDate ? new Date(settings.dueDate).toISOString().split('T')[0] : ''}
                onChange={(e) => onUpdateSettings({ dueDate: new Date(e.target.value) })}
              />
            </div>
          </div>
          
          <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              The due date will be calculated automatically based on the payment terms you select. You can override it manually if needed.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bank Details Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Bank Details</CardTitle>
          </div>
          <CardDescription>
            These details will appear on the invoice for payment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <MobileInputWrapper
            label="Account Name"
            placeholder="e.g., Smith Electrical Ltd"
            value={settings?.bankDetails?.accountName || ''}
            onChange={(value) =>
              onUpdateSettings({
                bankDetails: {
                  accountName: value,
                  accountNumber: settings?.bankDetails?.accountNumber || '',
                  sortCode: settings?.bankDetails?.sortCode || '',
                },
              })
            }
            hint="The name on your bank account"
          />
          
          <div className="grid md:grid-cols-2 gap-4">
            <MobileInputWrapper
              label="Account Number"
              placeholder="12345678"
              value={settings?.bankDetails?.accountNumber || ''}
              onChange={(value) => {
                const numericValue = value.replace(/\D/g, '').slice(0, 8);
                onUpdateSettings({
                  bankDetails: {
                    accountName: settings?.bankDetails?.accountName || '',
                    accountNumber: numericValue,
                    sortCode: settings?.bankDetails?.sortCode || '',
                  },
                });
              }}
              inputMode="numeric"
              hint="8 digits"
            />
            <MobileInputWrapper
              label="Sort Code"
              placeholder="12-34-56"
              value={settings?.bankDetails?.sortCode || ''}
              onChange={(value) => {
                let formattedValue = value.replace(/\D/g, '');
                if (formattedValue.length > 6) formattedValue = formattedValue.slice(0, 6);
                if (formattedValue.length > 4) formattedValue = `${formattedValue.slice(0, 2)}-${formattedValue.slice(2, 4)}-${formattedValue.slice(4)}`;
                else if (formattedValue.length > 2) formattedValue = `${formattedValue.slice(0, 2)}-${formattedValue.slice(2)}`;
                
                onUpdateSettings({
                  bankDetails: {
                    accountName: settings?.bankDetails?.accountName || '',
                    accountNumber: settings?.bankDetails?.accountNumber || '',
                    sortCode: formattedValue,
                  },
                });
              }}
              inputMode="numeric"
              hint="Format: XX-XX-XX"
            />
          </div>
        </CardContent>
      </Card>

      {/* Invoice Notes Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Invoice Notes</CardTitle>
          </div>
          <CardDescription>
            Add any additional information or terms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            id="invoiceNotes"
            value={notes || ''}
            onChange={(e) => onUpdateNotes(e.target.value)}
            placeholder="e.g., Thank you for your business. Please ensure payment is made within the agreed terms."
            rows={5}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">
            These notes will appear at the bottom of your invoice
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
