/**
 * LoadTesterButton Component
 *
 * A button that loads tester details from the user's saved profile.
 * Shows success feedback for 2 seconds after loading.
 * Same pattern as the EV Charging LoadInstallerButton.
 */

import React, { useState, useCallback } from 'react';
import { User, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const LoadTesterButton: React.FC<LoadTesterButtonProps> = ({
  onLoad,
  className,
  variant = 'outline',
  size = 'default',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const { loadTesterDetails, hasSavedTesterDetails } = useEmergencyLightingSmartForm();

  const handleLoad = useCallback(async () => {
    setIsLoading(true);

    try {
      const details = loadTesterDetails();

      if (!details) {
        toast({
          title: 'No Profile Found',
          description: 'Please set up your profile in Settings first.',
          variant: 'destructive',
        });
        return;
      }

      // Call the onLoad callback with the details
      onLoad(details);

      // Show success state for 2 seconds
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);

      toast({
        title: 'Details Loaded',
        description: 'Your saved tester details have been applied.',
      });
    } catch (error) {
      console.error('Error loading tester details:', error);
      toast({
        title: 'Error',
        description: 'Failed to load tester details. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [loadTesterDetails, onLoad, toast]);

  // Don't render if no saved details
  if (!hasSavedTesterDetails) {
    return null;
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleLoad}
      disabled={isLoading || showSuccess}
      className={cn(
        "touch-manipulation transition-all duration-200",
        showSuccess && "bg-green-500/20 border-green-500/50 text-green-400",
        className
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Loading...
        </>
      ) : showSuccess ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Loaded!
        </>
      ) : (
        <>
          <User className="h-4 w-4 mr-2" />
          Load My Saved Details
        </>
      )}
    </Button>
  );
};

export default LoadTesterButton;
