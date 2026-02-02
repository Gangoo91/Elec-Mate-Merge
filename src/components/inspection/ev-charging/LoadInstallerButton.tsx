/**
 * LoadInstallerButton.tsx
 *
 * Reusable "Load My Saved Details" button for auto-filling installer details
 * from Business Settings and Inspector Profiles.
 * Follows EICR pattern from EICRInspectorDetails.tsx
 */

import React from 'react';
import { Settings, Loader2, Check, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEVChargingSmartForm, InstallerDetails, CompanyBranding } from '@/hooks/inspection/useEVChargingSmartForm';
import { useToast } from '@/hooks/use-toast';

interface LoadInstallerButtonProps {
  onLoadDetails: (details: InstallerDetails) => void;
  onLoadBranding?: (branding: CompanyBranding) => void;
  variant?: 'default' | 'compact' | 'icon';
  className?: string;
  showBrandingOption?: boolean;
}

export const LoadInstallerButton: React.FC<LoadInstallerButtonProps> = ({
  onLoadDetails,
  onLoadBranding,
  variant = 'default',
  className,
  showBrandingOption = false
}) => {
  const {
    loading,
    hasSavedInstallerDetails,
    hasSavedCompanyBranding,
    loadInstallerDetails,
    loadCompanyBranding
  } = useEVChargingSmartForm();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [justLoaded, setJustLoaded] = React.useState(false);

  // Don't render if no saved details available
  if (!hasSavedInstallerDetails) {
    return null;
  }

  const handleLoadDetails = async () => {
    setIsLoading(true);
    try {
      // Load installer details
      const details = loadInstallerDetails();
      if (details) {
        onLoadDetails(details);
      }

      // Optionally load branding
      if (showBrandingOption && onLoadBranding && hasSavedCompanyBranding) {
        const branding = loadCompanyBranding();
        if (branding) {
          onLoadBranding(branding);
        }
      }

      // Show success feedback
      setJustLoaded(true);
      toast({
        title: 'Details Loaded',
        description: 'Your saved installer details have been applied.',
      });

      // Reset the success state after animation
      setTimeout(() => setJustLoaded(false), 2000);
    } catch (error) {
      toast({
        title: 'Failed to Load',
        description: 'Could not load your saved details. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Icon-only variant for tight spaces
  if (variant === 'icon') {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleLoadDetails}
        disabled={loading || isLoading}
        className={cn(
          "h-10 w-10 rounded-xl",
          "border border-border/30 hover:border-elec-yellow hover:bg-elec-yellow/10",
          justLoaded && "border-green-500 bg-green-500/10",
          className
        )}
        title="Load saved details"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : justLoaded ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Settings className="h-4 w-4" />
        )}
      </Button>
    );
  }

  // Compact variant for inline use
  if (variant === 'compact') {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleLoadDetails}
        disabled={loading || isLoading}
        className={cn(
          "h-9 px-3 touch-manipulation",
          "border-border/50 hover:border-elec-yellow hover:bg-elec-yellow/10",
          justLoaded && "border-green-500 bg-green-500/10 text-green-400",
          className
        )}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : justLoaded ? (
          <Check className="h-4 w-4 mr-2 text-green-400" />
        ) : (
          <User className="h-4 w-4 mr-2" />
        )}
        {justLoaded ? 'Loaded!' : 'Load Profile'}
      </Button>
    );
  }

  // Default full-width variant
  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleLoadDetails}
      disabled={loading || isLoading}
      className={cn(
        "w-full h-11 touch-manipulation font-medium",
        "border-border/50 text-foreground hover:border-elec-yellow hover:bg-elec-yellow/10",
        justLoaded && "border-green-500 bg-green-500/10 text-green-400",
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : justLoaded ? (
        <Check className="h-4 w-4 mr-2 text-green-400" />
      ) : (
        <Settings className="h-4 w-4 mr-2" />
      )}
      {justLoaded ? 'Details Loaded!' : 'Load My Saved Details'}
    </Button>
  );
};

export default LoadInstallerButton;
