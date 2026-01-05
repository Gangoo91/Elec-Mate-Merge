import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ClientStepProps {
  data: Record<string, any>;
  onChange: (updates: Record<string, any>) => void;
  isMobile: boolean;
}

/**
 * Step 1: Client & Property Details
 * Touch-optimized inputs for mobile
 */
export const ClientStep: React.FC<ClientStepProps> = ({
  data,
  onChange,
  isMobile,
}) => {
  const inputClass = cn(
    'transition-all duration-200',
    isMobile ? 'h-14 text-base' : 'h-12'
  );

  return (
    <div className="space-y-6">
      {/* Client Details */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold text-lg">Client Details</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                value={data.clientName || ''}
                onChange={(e) => onChange({ clientName: e.target.value })}
                placeholder="Enter client name"
                className={inputClass}
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientPhone">Phone Number</Label>
              <Input
                id="clientPhone"
                type="tel"
                value={data.clientPhone || ''}
                onChange={(e) => onChange({ clientPhone: e.target.value })}
                placeholder="Enter phone number"
                className={inputClass}
                inputMode="tel"
                autoComplete="tel"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientEmail">Email Address</Label>
              <Input
                id="clientEmail"
                type="email"
                value={data.clientEmail || ''}
                onChange={(e) => onChange({ clientEmail: e.target.value })}
                placeholder="Enter email address"
                className={inputClass}
                inputMode="email"
                autoComplete="email"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Address */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold text-lg">Property Address</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="propertyAddress">Address Line 1 *</Label>
              <Input
                id="propertyAddress"
                value={data.propertyAddress || ''}
                onChange={(e) => onChange({ propertyAddress: e.target.value })}
                placeholder="Enter property address"
                className={inputClass}
                autoComplete="street-address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyAddress2">Address Line 2</Label>
              <Input
                id="propertyAddress2"
                value={data.propertyAddress2 || ''}
                onChange={(e) => onChange({ propertyAddress2: e.target.value })}
                placeholder="Apartment, suite, etc. (optional)"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyCity">City</Label>
                <Input
                  id="propertyCity"
                  value={data.propertyCity || ''}
                  onChange={(e) => onChange({ propertyCity: e.target.value })}
                  placeholder="City"
                  className={inputClass}
                  autoComplete="address-level2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyPostcode">Postcode</Label>
                <Input
                  id="propertyPostcode"
                  value={data.propertyPostcode || ''}
                  onChange={(e) => onChange({ propertyPostcode: e.target.value })}
                  placeholder="Postcode"
                  className={inputClass}
                  autoComplete="postal-code"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold text-lg">Additional Information</h3>

          <div className="space-y-2">
            <Label htmlFor="propertyDescription">Property Description</Label>
            <Textarea
              id="propertyDescription"
              value={data.propertyDescription || ''}
              onChange={(e) => onChange({ propertyDescription: e.target.value })}
              placeholder="e.g., 3-bedroom semi-detached house"
              className="min-h-[100px] resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientStep;
