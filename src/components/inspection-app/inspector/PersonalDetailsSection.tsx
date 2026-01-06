
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Copy, RefreshCw } from 'lucide-react';
import SignatureInput from '@/components/signature/SignatureInput';

interface PersonalDetailsSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
  onCopyFromClient: () => void;
  onAutoFillDate: () => void;
}

const PersonalDetailsSection = ({ 
  formData, 
  onUpdate, 
  onCopyFromClient, 
  onAutoFillDate 
}: PersonalDetailsSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-white/80 border-b border-border pb-2">
        <User className="h-4 w-4 text-elec-yellow" />
        Personal Details
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <Label htmlFor="inspectorName" className="text-sm font-medium text-white/80">
              Inspector Name *
            </Label>
            {formData.clientName && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onCopyFromClient}
                className="text-xs h-7 px-2 text-blue-400 hover:text-blue-300 hover:bg-muted self-start sm:self-auto"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy from client
              </Button>
            )}
          </div>
          <Input
            id="inspectorName"
            value={formData.inspectorName || ''}
            onChange={(e) => onUpdate('inspectorName', e.target.value)}
            placeholder="Full name of inspector"
            className={`w-full bg-muted border-border text-foreground placeholder:text-white/70 focus:border-elec-yellow focus:ring-elec-yellow ${
              !formData.inspectorName?.trim() ? 'border-orange-500 focus:border-orange-400 focus:ring-orange-400' : ''
            }`}
          />
        </div>

        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <Label htmlFor="inspectorDate" className="text-sm font-medium text-white/80">
              Date of Inspection
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={onAutoFillDate}
              className="text-xs h-7 px-2 text-blue-400 hover:text-blue-300 hover:bg-muted self-start sm:self-auto"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Today
            </Button>
          </div>
          <Input
            id="inspectorDate"
            type="date"
            value={formData.inspectorDate || ''}
            onChange={(e) => onUpdate('inspectorDate', e.target.value)}
            className="w-full bg-muted border-border text-foreground focus:border-elec-yellow focus:ring-elec-yellow"
          />
        </div>
      </div>

      <div className="space-y-4">
        <SignatureInput
          label="Digital Signature"
          value={formData.inspectorSignature || ''}
          onChange={(signature) => onUpdate('inspectorSignature', signature || '')}
          placeholder="Enter signature or draw digitally"
          required={false}
        />
      </div>
    </div>
  );
};

export default PersonalDetailsSection;
