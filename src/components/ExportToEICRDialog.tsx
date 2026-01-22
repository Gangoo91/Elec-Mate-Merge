import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertCircle,
  CheckCircle,
  ArrowRight,
  FileText,
  Loader2,
  AlertTriangle,
  Zap,
  User,
  MapPin,
  CircuitBoard,
  ClipboardList,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { reportCloud } from '@/utils/reportCloud';
import {
  validateEICForExport,
  transformEICToEICR,
  getExportToEICRSummary,
  EICFormData,
} from '@/utils/eicToEicrExport';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ExportToEICRDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportId: string;
  onExportComplete?: (eicrReportId: string) => void;
}

export const ExportToEICRDialog: React.FC<ExportToEICRDialogProps> = ({
  open,
  onOpenChange,
  reportId,
  onExportComplete,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [eicData, setEicData] = useState<EICFormData | null>(null);
  const [validation, setValidation] = useState<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } | null>(null);
  const [summary, setSummary] = useState<{
    transferredFields: string[];
    requiredFields: string[];
    circuitCount: number;
  } | null>(null);

  // Load EIC data when dialog opens
  useEffect(() => {
    if (open && reportId) {
      loadEICData();
    }
  }, [open, reportId]);

  const loadEICData = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const data = await reportCloud.getReportData(reportId, user.id);
      if (!data) throw new Error('Report not found');

      setEicData(data);
      setValidation(validateEICForExport(data));
      setSummary(getExportToEICRSummary(data));
    } catch (error) {
      console.error('Error loading EIC data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load report data',
        variant: 'destructive',
      });
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    if (!eicData || !validation?.isValid) return;

    setIsExporting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Transform EIC to EICR data
      const eicrData = transformEICToEICR(eicData);

      // Add metadata to track origin
      const eicrDataWithMeta = {
        ...eicrData,
        sourceEICReportId: reportId,
        sourceCertificateNumber: eicData.certificateNumber,
        exportedFromEIC: true,
        exportedAt: new Date().toISOString(),
      };

      // Create new EICR report
      const result = await reportCloud.createReport(user.id, 'eicr', eicrDataWithMeta);

      if (!result.success || !result.reportId) {
        throw new Error(result.error || 'Failed to create EICR report');
      }

      toast({
        title: 'Export successful',
        description: 'EICR certificate created. Opening for completion...',
      });

      onOpenChange(false);

      // Navigate to the new EICR form
      if (onExportComplete) {
        onExportComplete(result.reportId);
      } else {
        // Navigate to EICR form with the new report
        navigate(`/electrician/inspection-testing?section=eicr&reportId=${result.reportId}`);
      }
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: 'Export failed',
        description: error instanceof Error ? error.message : 'Failed to export to EICR',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl flex flex-col">
        <div className="flex flex-col h-full bg-background">
          <SheetHeader className="px-4 py-4 border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-elec-yellow" />
              Export EIC to EICR
            </SheetTitle>
            <SheetDescription>
              Create a new EICR condition report from this installation certificate
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-elec-yellow mb-4" />
                <p className="text-muted-foreground">Loading report data...</p>
              </div>
            ) : validation && summary ? (
              <>
                {/* Validation Status */}
                <div className={cn(
                  'rounded-lg border p-4',
                  validation.isValid
                    ? 'border-green-500/30 bg-green-500/10'
                    : 'border-red-500/30 bg-red-500/10'
                )}>
                  <div className="flex items-start gap-3">
                    {validation.isValid ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div>
                      <p className={cn(
                        'font-medium',
                        validation.isValid ? 'text-green-400' : 'text-red-400'
                      )}>
                        {validation.isValid
                          ? 'Ready to export'
                          : 'Cannot export - issues found'}
                      </p>
                      {validation.errors.length > 0 && (
                        <ul className="mt-2 space-y-1 text-sm text-red-300">
                          {validation.errors.map((error, i) => (
                            <li key={i}>• {error}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Warnings */}
                {validation.warnings.length > 0 && (
                  <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-orange-400">Important Notes</p>
                        <ul className="mt-2 space-y-1 text-sm text-orange-300">
                          {validation.warnings.map((warning, i) => (
                            <li key={i}>• {warning}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* What will be transferred */}
                {summary.transferredFields.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      Will be transferred to EICR
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {summary.transferredFields.map((field, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2 bg-green-500/10 rounded-lg text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          <span className="text-green-300">{field}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Circuit count */}
                <div className="flex items-center gap-3 p-4 bg-elec-gray rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                    <CircuitBoard className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{summary.circuitCount}</p>
                    <p className="text-sm text-muted-foreground">
                      circuit{summary.circuitCount === 1 ? '' : 's'} with test data
                    </p>
                  </div>
                </div>

                {/* Inspection notice */}
                <div className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <ClipboardList className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-300">66 Inspection Items Required</p>
                    <p className="text-sm text-blue-300/80">
                      EICR requires completion of all inspection checklist items
                    </p>
                  </div>
                </div>

                {/* What's required */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                    You'll need to complete in EICR
                  </h3>
                  <div className="space-y-2">
                    {summary.requiredFields.map((field, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2 bg-orange-500/10 rounded-lg text-sm"
                      >
                        <AlertCircle className="h-4 w-4 text-orange-500 shrink-0" />
                        <span className="text-orange-300">{field}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview summary */}
                {eicData && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      Installation Summary
                    </h3>
                    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                      {eicData.clientName && (
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{eicData.clientName}</span>
                        </div>
                      )}
                      {eicData.installationAddress && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{eicData.installationAddress}</span>
                        </div>
                      )}
                      {eicData.supplyVoltage && (
                        <div className="flex items-center gap-2 text-sm">
                          <Zap className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {eicData.supplyVoltage}V {eicData.phases}
                            {eicData.earthingArrangement && ` • ${eicData.earthingArrangement}`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-background">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 h-11 touch-manipulation"
                disabled={isExporting}
              >
                Cancel
              </Button>
              <Button
                variant="accent"
                onClick={handleExport}
                className="flex-1 h-11 touch-manipulation"
                disabled={isLoading || !validation?.isValid || isExporting}
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating EICR...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Create EICR Certificate
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
