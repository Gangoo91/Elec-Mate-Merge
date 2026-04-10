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
        'w-full h-11 rounded-lg text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all',
        showSuccess
          ? 'bg-green-500 text-white'
          : 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/30',
        className
      )}
    >
      {showSuccess ? 'Loaded!' : 'Load from Business Settings'}
    </button>
  );
};

export default LoadTesterButton;
