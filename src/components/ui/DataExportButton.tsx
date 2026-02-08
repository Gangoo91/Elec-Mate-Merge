/**
 * DataExportButton
 * "Export All Data" button. Calls listAllBackups() from dataIntegrity.ts,
 * generates JSON blob, triggers download. Emergency use: phone dying on site.
 */

import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { listAllBackups } from '@/utils/dataIntegrity';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface DataExportButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
}

export const DataExportButton: React.FC<DataExportButtonProps> = ({
  className,
  variant = 'outline',
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const backups = listAllBackups();

      if (backups.length === 0) {
        toast({
          title: 'No data to export',
          description: 'There are no local backups to export.',
        });
        setIsExporting(false);
        return;
      }

      // Collect all localStorage data related to Elec-Mate
      const exportData: Record<string, any> = {
        exportedAt: new Date().toISOString(),
        backupCount: backups.length,
        backups: backups,
        rawData: {} as Record<string, any>,
      };

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
          key.startsWith('elecmate_') ||
          key.startsWith('eicr_') ||
          key.startsWith('eic_') ||
          key.startsWith('minor_works_') ||
          key.startsWith('fire_alarm_') ||
          key.startsWith('emergency_lighting_') ||
          key.includes('draft') ||
          key.includes('auto-save')
        )) {
          try {
            const value = localStorage.getItem(key);
            exportData.rawData[key] = value ? JSON.parse(value) : value;
          } catch {
            exportData.rawData[key] = localStorage.getItem(key);
          }
        }
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      });

      const filename = `elec-mate-backup-${new Date().toISOString().split('T')[0]}.json`;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: 'Data exported',
        description: `${backups.length} backup${backups.length !== 1 ? 's' : ''} exported to ${filename}`,
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: 'Export failed',
        description: 'Could not export data. Please try again.',
        variant: 'destructive',
      });
    }
    setIsExporting(false);
  };

  return (
    <Button
      variant={variant}
      className={cn('h-11 gap-2 touch-manipulation', className)}
      onClick={handleExport}
      disabled={isExporting}
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      Export All Data
    </Button>
  );
};
