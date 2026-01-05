
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Calendar, FileText, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuickActionsToolbarProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const QuickActionsToolbar: React.FC<QuickActionsToolbarProps> = ({ formData, onUpdate }) => {
  const { toast } = useToast();

  const handleCopyClientToInstallation = () => {
    if (formData.clientAddress) {
      onUpdate('installationAddress', formData.clientAddress);
      toast({
        title: "Address Copied",
        description: "Client address copied to installation address",
      });
    } else {
      toast({
        title: "No Client Address",
        description: "Please enter a client address first",
        variant: "destructive",
      });
    }
  };

  const handleSetTodayDate = () => {
    const today = new Date().toISOString().split('T')[0];
    onUpdate('installationDate', today);
    toast({
      title: "Date Set",
      description: "Installation date set to today",
    });
  };

  const handleAutoFillStandards = () => {
    onUpdate('designStandard', 'BS7671');
    onUpdate('partPCompliance', 'compliant');
    toast({
      title: "Standards Applied",
      description: "Standard BS7671 compliance settings applied",
    });
  };

  const handleClearForm = () => {
    const fieldsToKeep = ['clientName', 'clientAddress']; // Keep client details
    const clearedData = Object.keys(formData).reduce((acc, key) => {
      if (fieldsToKeep.includes(key)) {
        acc[key] = formData[key];
      } else {
        acc[key] = '';
      }
      return acc;
    }, {} as any);

    Object.keys(clearedData).forEach(key => {
      onUpdate(key, clearedData[key]);
    });

    toast({
      title: "Form Cleared",
      description: "Form cleared (client details preserved)",
    });
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyClientToInstallation}
        className="text-xs"
      >
        <Copy className="h-3 w-3 mr-1" />
        Copy Address
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleSetTodayDate}
        className="text-xs"
      >
        <Calendar className="h-3 w-3 mr-1" />
        Today's Date
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleAutoFillStandards}
        className="text-xs"
      >
        <Zap className="h-3 w-3 mr-1" />
        BS7671 Standards
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleClearForm}
        className="text-xs ml-auto"
      >
        <FileText className="h-3 w-3 mr-1" />
        Clear Form
      </Button>
    </div>
  );
};

export default QuickActionsToolbar;
