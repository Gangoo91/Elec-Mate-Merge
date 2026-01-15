import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, AlertCircle, HelpCircle } from 'lucide-react';

interface StepProps {
  formData: any;
  onChange: (data: any) => void;
}

export function BankDetailsStep({ formData, onChange }: StepProps) {
  const [showHelp, setShowHelp] = useState(false);

  const formatSortCode = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 6)}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex p-4 rounded-2xl bg-green-500/10 border border-green-500/30 mb-4">
          <CreditCard className="h-10 w-10 text-green-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Bank Details</h3>
        <p className="text-muted-foreground">
          So clients know where to send payment for invoices
        </p>
      </div>

      <Card className="bg-amber-500/5 border-amber-500/20 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-1">This step is optional</p>
            <p className="text-muted-foreground">
              Without bank details, clients won't know where to send payment. You can skip this now and add it later in Settings.
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div>
          <Label htmlFor="bank-name" className="text-base">Bank Name</Label>
          <Input
            id="bank-name"
            value={formData.bankName}
            onChange={(e) => onChange({ ...formData, bankName: e.target.value })}
            placeholder="e.g., Barclays"
            className="h-11 mt-2 touch-manipulation"
          />
        </div>

        <div>
          <Label htmlFor="account-name" className="text-base">Account Name</Label>
          <Input
            id="account-name"
            value={formData.accountName}
            onChange={(e) => onChange({ ...formData, accountName: e.target.value })}
            placeholder="e.g., Smith Electrical Ltd"
            className="h-11 mt-2 touch-manipulation"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="sort-code" className="text-base">Sort Code</Label>
            <Input
              id="sort-code"
              value={formData.sortCode}
              onChange={(e) => onChange({ ...formData, sortCode: formatSortCode(e.target.value) })}
              placeholder="XX-XX-XX"
              maxLength={8}
              className="h-11 mt-2 touch-manipulation"
            />
          </div>

          <div>
            <Label htmlFor="account-number" className="text-base">Account Number</Label>
            <Input
              id="account-number"
              value={formData.accountNumber}
              onChange={(e) => onChange({ ...formData, accountNumber: e.target.value.replace(/\D/g, '').slice(0, 8) })}
              placeholder="XXXXXXXX"
              maxLength={8}
              className="h-11 mt-2 touch-manipulation"
            />
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowHelp(!showHelp)}
          className="text-sm text-elec-yellow hover:text-elec-yellow/90 flex items-center gap-1 touch-manipulation h-11"
        >
          <HelpCircle className="h-4 w-4" />
          Where do I find these details?
        </Button>

        {showHelp && (
          <Card className="bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              You can find your bank details on your bank statement, online banking portal, or mobile banking app. Look for "Account Details" or "Account Information" section.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
