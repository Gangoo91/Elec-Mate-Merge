
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  workDescription: string;
}

interface CustomerDetailsPhaseProps {
  customerDetails: CustomerDetails;
  onCustomerDetailsChange: (details: CustomerDetails) => void;
  onProceed: () => void;
}

const CustomerDetailsPhase = ({ customerDetails, onCustomerDetailsChange, onProceed }: CustomerDetailsPhaseProps) => {
  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    onCustomerDetailsChange({ ...customerDetails, [field]: value });
  };

  const canProceed = customerDetails.name && customerDetails.address;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Communication
          </CardTitle>
          <CardDescription className="text-white">
            Record customer details and work description before beginning isolation procedure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Customer Name</label>
              <input
                type="text"
                value={customerDetails.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-3 bg-muted border border-border rounded-lg text-foreground"
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
              <input
                type="tel"
                value={customerDetails.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full p-3 bg-muted border border-border rounded-lg text-foreground"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                value={customerDetails.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-3 bg-muted border border-border rounded-lg text-foreground"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Installation Address</label>
              <input
                type="text"
                value={customerDetails.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full p-3 bg-muted border border-border rounded-lg text-foreground"
                placeholder="Enter installation address"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Work Description</label>
            <textarea
              value={customerDetails.workDescription}
              onChange={(e) => handleInputChange('workDescription', e.target.value)}
              className="w-full p-3 bg-muted border border-border rounded-lg text-foreground"
              rows={3}
              placeholder="Describe the work to be carried out"
            />
          </div>
          <Button 
            onClick={onProceed}
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
            disabled={!canProceed}
          >
            Begin Isolation Procedure
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDetailsPhase;
