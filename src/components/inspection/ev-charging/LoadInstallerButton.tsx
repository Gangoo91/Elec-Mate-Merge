/**
 * LoadInstallerButton.tsx
 * "Load My Saved Details" button — no icons, clean design
 */

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useEVChargingSmartForm,
  InstallerDetails,
  CompanyBranding,
} from '@/hooks/inspection/useEVChargingSmartForm';
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
  showBrandingOption = false,
}) => {
  const {
    loading,
    hasSavedInstallerDetails,
    hasSavedCompanyBranding,
    loadInstallerDetails,
    loadCompanyBranding,
  } = useEVChargingSmartForm();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [justLoaded, setJustLoaded] = React.useState(false);

  if (!hasSavedInstallerDetails) return null;

  const handleLoadDetails = async () => {
    setIsLoading(true);
    try {
      const details = loadInstallerDetails();
      if (details) onLoadDetails(details);

      if (showBrandingOption && onLoadBranding && hasSavedCompanyBranding) {
        const branding = loadCompanyBranding();
        if (branding) onLoadBranding(branding);
      }

      setJustLoaded(true);
      toast({ title: 'Details Loaded', description: 'Your saved installer details have been applied.' });
      setTimeout(() => setJustLoaded(false), 2000);
    } catch {
      toast({ title: 'Failed to Load', description: 'Could not load your saved details.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleLoadDetails}
        disabled={loading || isLoading}
        className={cn(
          'h-11 w-11 rounded-xl flex items-center justify-center touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50',
          justLoaded
            ? 'bg-emerald-500 border border-emerald-500 text-white'
            : 'bg-elec-yellow border border-elec-yellow text-black',
          className
        )}
        title="Load saved details"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="text-[10px] font-bold">{justLoaded ? '✓' : 'LP'}</span>}
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleLoadDetails}
        disabled={loading || isLoading}
        className={cn(
          'h-11 px-4 rounded-xl text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all inline-flex items-center justify-center disabled:opacity-50',
          justLoaded
            ? 'bg-emerald-500 border border-emerald-500 text-white'
            : 'bg-elec-yellow border border-elec-yellow text-black',
          className
        )}
      >
        {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : null}
        {justLoaded ? 'Loaded!' : 'Load Profile'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleLoadDetails}
      disabled={loading || isLoading}
      className={cn(
        'w-full h-11 rounded-xl text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50',
        justLoaded
          ? 'bg-emerald-500 border border-emerald-500 text-white'
          : 'bg-elec-yellow border border-elec-yellow text-black',
        className
      )}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {justLoaded ? 'Details Loaded!' : 'Load My Saved Details'}
    </button>
  );
};
