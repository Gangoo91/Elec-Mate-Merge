
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface CircuitSyncSectionProps {
  formData: any;
  onSyncCircuits: () => void;
}

const CircuitSyncSection = ({ formData, onSyncCircuits }: CircuitSyncSectionProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex-1">
        <h3 className="font-semibold text-sm text-blue-900">Circuit Synchronisation</h3>
        <p className="text-xs text-blue-700 mt-1">
          Circuits from the Electrical Installation Details section are automatically synced here.
          {formData.circuits?.length > 0 && (
            <span className="block mt-1">
              Found {formData.circuits.length} circuit(s) in Installation Details.
            </span>
          )}
        </p>
      </div>
      <Button 
        onClick={onSyncCircuits} 
        size="sm" 
        variant="outline"
        className="gap-2 border-blue-300 text-blue-700 hover:bg-blue-100"
      >
        <RefreshCw className="h-4 w-4" />
        Sync Circuits
      </Button>
    </div>
  );
};

export default CircuitSyncSection;
