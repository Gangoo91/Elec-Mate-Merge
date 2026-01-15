import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface StepProps {
  formData: any;
  onChange: (data: any) => void;
}

export function ContactDetailsStep({ formData, onChange }: StepProps) {
  // Pre-fill email from auth user
  useEffect(() => {
    const prefillEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email && !formData.email) {
        onChange({ ...formData, email: user.email });
      }
    };
    prefillEmail();
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 mb-4">
          <Mail className="h-10 w-10 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Contact Information</h3>
        <p className="text-muted-foreground">
          How should clients get in touch with you?
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="flex items-center gap-2 text-base">
            <Mail className="h-4 w-4" />
            Business Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange({ ...formData, email: e.target.value })}
            placeholder="you@yourcompany.com"
            className="h-11 mt-2 touch-manipulation"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Clients will reply to this email address
          </p>
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-2 text-base">
            <Phone className="h-4 w-4" />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange({ ...formData, phone: e.target.value })}
            placeholder="07XXX XXXXXX"
            className="h-11 mt-2 touch-manipulation"
          />
        </div>

        <div>
          <Label htmlFor="address" className="flex items-center gap-2 text-base">
            <MapPin className="h-4 w-4" />
            Business Address
          </Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => onChange({ ...formData, address: e.target.value })}
            placeholder="123 High Street&#10;London&#10;SW1A 1AA"
            rows={3}
            className="mt-2 touch-manipulation"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Appears on quote and invoice documents
          </p>
        </div>
      </div>
    </div>
  );
}
