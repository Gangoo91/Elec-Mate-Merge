import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Lightbulb, Building2 } from 'lucide-react';

interface StepProps {
  formData: any;
  onChange: (data: any) => void;
}

export function CompanyNameStep({ formData, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/30 mb-4">
          <Building2 className="h-10 w-10 text-elec-yellow" />
        </div>
        <h3 className="text-xl font-bold mb-2">What's your business name?</h3>
        <p className="text-muted-foreground">
          This will appear on all your quotes and invoices
        </p>
      </div>

      <div>
        <Label htmlFor="company-name" className="text-base">Company Name</Label>
        <Input
          id="company-name"
          value={formData.companyName}
          onChange={(e) => onChange({ ...formData, companyName: e.target.value })}
          placeholder="e.g., Smith Electrical Services Ltd"
          className="h-12 text-lg mt-2 touch-manipulation"
          autoFocus
        />
      </div>

      <Card className="bg-elec-yellow/5 border-elec-yellow/20 p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-1">Why we need this</p>
            <p className="text-muted-foreground">
              Your company name builds trust and professionalism. It appears prominently on every quote and invoice you send to clients.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
