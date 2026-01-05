
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import InputWithValidation from './InputWithValidation';

interface ClientDetailsSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const ClientDetailsSection: React.FC<ClientDetailsSectionProps> = ({ formData, onUpdate }) => {
  const { toast } = useToast();

  const handleCopyClientAddress = () => {
    if (formData.clientAddress) {
      onUpdate('installationAddress', formData.clientAddress);
      toast({
        title: "Address Copied",
        description: "Client address copied to installation address",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-elec-gray flex items-center gap-2">
          <Building className="h-5 w-5" />
          Client & Installation Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Client Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputWithValidation
            id="clientName"
            label="Client Name"
            value={formData.clientName || ''}
            onChange={(value) => onUpdate('clientName', value)}
            placeholder="Enter client name"
            required
            helpText="Enter the full name of the client or organisation"
          />
          
          <div>
            <Label htmlFor="clientAddress">Client Address</Label>
            <Textarea
              id="clientAddress"
              placeholder="Enter client address"
              value={formData.clientAddress || ''}
              onChange={(e) => onUpdate('clientAddress', e.target.value)}
              rows={2}
              className="mt-1"
            />
          </div>
        </div>

        {/* Installation Address */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="installationAddress">Installation Address *</Label>
            {formData.clientAddress && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyClientAddress}
                className="ml-auto text-xs"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy from Client
              </Button>
            )}
          </div>
          <Textarea
            id="installationAddress"
            placeholder="Enter installation address (or copy from client address)"
            value={formData.installationAddress || ''}
            onChange={(e) => onUpdate('installationAddress', e.target.value)}
            rows={2}
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description of Installation/Work *</Label>
          <Textarea
            id="description"
            placeholder="Describe the installation or work carried out"
            value={formData.description || ''}
            onChange={(e) => onUpdate('description', e.target.value)}
            rows={3}
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientDetailsSection;
