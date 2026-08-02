/**
 * LoadTesterButton — loads tester details from saved profile (no icons)
 */

import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useEmergencyLightingSmartForm } from '@/hooks/inspection/useEmergencyLightingSmartForm';

interface LoadTesterButtonProps {
  onLoad: (details: {
    testerName: string;
    testerCompany: string;
    testerQualifications: string;
    testerSignature: string;
    testerDate: string;
  }) => void;
  className?: string;
}

const LoadTesterButton: React.FC<LoadTesterButtonProps> = ({ onLoad, className }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const { loadTesterDetails, hasSavedTesterDetails } = useEmergencyLightingSmartForm();

  const handleLoad = useCallback(() => {
    const details = loadTesterDetails();
    if (!details) {
      toast({
        title: 'No profile found',
        description: 'Set up your profile in Settings first.',
        variant: 'destructive',
      });
      return;
    }
    onLoad(details);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    toast({ title: 'Details loaded' });
  }, [loadTesterDetails, onLoad, toast]);

  if (!hasSavedTesterDetails) return null;

  return (
    <button
      type="button"
      onClick={handleLoad}
      disabled={showSuccess}
      className={cn(
        // Solid volt when idle — a translucent elec-yellow wash reads brown on
        // the dark surface, so the selected/primary state is always solid.
        'w-full h-11 rounded-xl text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all',
        showSuccess
          ? 'bg-green-500 border border-green-500 text-black'
          : 'bg-elec-yellow border border-elec-yellow text-black hover:bg-elec-yellow',
        className
      )}
    >
      {showSuccess ? 'Loaded' : 'Load from business settings'}
    </button>
  );
};

export default LoadTesterButton;
