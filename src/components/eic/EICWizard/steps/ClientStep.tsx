/**
 * ClientStep - Client & Property Details for EIC
 *
 * Mobile-optimized input for client and installation address
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, MapPin, Phone, Mail, Building } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClientStepProps {
  data: any;
  onChange: (updates: any) => void;
  isMobile?: boolean;
}

export const ClientStep: React.FC<ClientStepProps> = ({ data, onChange, isMobile }) => {
  const handleChange = (field: string, value: string) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Client Details Card */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <User className="h-5 w-5 text-elec-yellow" />
            </div>
            Client Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName" className="text-sm font-medium">
              Client Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="clientName"
              value={data.clientName || ''}
              onChange={(e) => handleChange('clientName', e.target.value)}
              placeholder="Enter client name"
              className={cn(
                'h-12 text-base',
                isMobile && 'text-[16px]' // Prevent iOS zoom
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientAddress" className="text-sm font-medium">
              Client Address
            </Label>
            <Textarea
              id="clientAddress"
              value={data.clientAddress || ''}
              onChange={(e) => handleChange('clientAddress', e.target.value)}
              placeholder="Enter client address (if different from installation)"
              className={cn(
                'min-h-[80px] text-base resize-none',
                isMobile && 'text-[16px]'
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientPhone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Phone
              </Label>
              <Input
                id="clientPhone"
                type="tel"
                value={data.clientPhone || ''}
                onChange={(e) => handleChange('clientPhone', e.target.value)}
                placeholder="Phone number"
                className={cn('h-12', isMobile && 'text-[16px]')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientEmail" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email
              </Label>
              <Input
                id="clientEmail"
                type="email"
                value={data.clientEmail || ''}
                onChange={(e) => handleChange('clientEmail', e.target.value)}
                placeholder="Email address"
                className={cn('h-12', isMobile && 'text-[16px]')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Installation Address Card */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <MapPin className="h-5 w-5 text-elec-yellow" />
            </div>
            Installation Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="installationAddress" className="text-sm font-medium">
              Property Address <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="installationAddress"
              value={data.installationAddress || ''}
              onChange={(e) => handleChange('installationAddress', e.target.value)}
              placeholder="Full installation address"
              className={cn(
                'min-h-[100px] text-base resize-none',
                isMobile && 'text-[16px]'
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="installationPostcode" className="text-sm font-medium">
                Postcode
              </Label>
              <Input
                id="installationPostcode"
                value={data.installationPostcode || ''}
                onChange={(e) => handleChange('installationPostcode', e.target.value.toUpperCase())}
                placeholder="e.g. SW1A 1AA"
                className={cn('h-12 uppercase', isMobile && 'text-[16px]')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupier" className="text-sm font-medium">
                Occupier
              </Label>
              <Input
                id="occupier"
                value={data.occupier || ''}
                onChange={(e) => handleChange('occupier', e.target.value)}
                placeholder="Name of occupier"
                className={cn('h-12', isMobile && 'text-[16px]')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Installation Description Card */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <Building className="h-5 w-5 text-elec-yellow" />
            </div>
            Installation Description
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description of Installation
            </Label>
            <Textarea
              id="description"
              value={data.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="e.g. New domestic installation, commercial fit-out, etc."
              className={cn(
                'min-h-[100px] text-base resize-none',
                isMobile && 'text-[16px]'
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="installationDate" className="text-sm font-medium">
                Installation Date
              </Label>
              <Input
                id="installationDate"
                type="date"
                value={data.installationDate || ''}
                onChange={(e) => handleChange('installationDate', e.target.value)}
                className={cn('h-12', isMobile && 'text-[16px]')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="constructionDate" className="text-sm font-medium">
                Construction Date
              </Label>
              <Input
                id="constructionDate"
                type="date"
                value={data.constructionDate || ''}
                onChange={(e) => handleChange('constructionDate', e.target.value)}
                className={cn('h-12', isMobile && 'text-[16px]')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientStep;
