import { InvoiceSettings } from '@/types/invoice';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
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
        <h2 className="text-xl font-semibold mb-2">Invoice Settings</h2>
        <p className="text-muted-foreground">
          Configure payment terms and bank details for this invoice.
        </p>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Payment Terms</h3>
        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select
                value={settings?.paymentTerms || '30 days'}
                onValueChange={(value) => onUpdateSettings({ paymentTerms: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7 days">7 days</SelectItem>
                  <SelectItem value="14 days">14 days</SelectItem>
                  <SelectItem value="30 days">30 days</SelectItem>
                  <SelectItem value="60 days">60 days</SelectItem>
                  <SelectItem value="Due on receipt">Due on receipt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={settings?.dueDate ? new Date(settings.dueDate).toISOString().split('T')[0] : ''}
                onChange={(e) => onUpdateSettings({ dueDate: new Date(e.target.value) })}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Bank Details</h3>
        <p className="text-sm text-muted-foreground mb-4">
          These details will appear on the invoice for payment.
        </p>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="accountName">Account Name</Label>
            <Input
              id="accountName"
              value={settings?.bankDetails?.accountName || ''}
              onChange={(e) =>
                onUpdateSettings({
                  bankDetails: {
                    ...settings?.bankDetails!,
                    accountName: e.target.value,
                  },
                })
              }
              placeholder="Enter account name"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={settings?.bankDetails?.accountNumber || ''}
                onChange={(e) =>
                  onUpdateSettings({
                    bankDetails: {
                      ...settings?.bankDetails!,
                      accountNumber: e.target.value,
                    },
                  })
                }
                placeholder="12345678"
              />
            </div>
            <div>
              <Label htmlFor="sortCode">Sort Code</Label>
              <Input
                id="sortCode"
                value={settings?.bankDetails?.sortCode || ''}
                onChange={(e) =>
                  onUpdateSettings({
                    bankDetails: {
                      ...settings?.bankDetails!,
                      sortCode: e.target.value,
                    },
                  })
                }
                placeholder="12-34-56"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Invoice Notes</h3>
        <Label htmlFor="invoiceNotes">Additional Notes (Optional)</Label>
        <Textarea
          id="invoiceNotes"
          value={notes || ''}
          onChange={(e) => onUpdateNotes(e.target.value)}
          placeholder="Add any additional information or terms for this invoice..."
          rows={4}
          className="mt-2"
        />
      </Card>
    </div>
  );
};
