
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, XCircle, BookOpen, Lightbulb, Info } from 'lucide-react';
import { RegulationWarning } from '@/utils/autoRegChecker';

interface RegulationWarningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warnings: RegulationWarning[];
  circuitDescription?: string;
  onApprove?: () => void;
  onReject?: () => void;
}

const RegulationWarningDialog: React.FC<RegulationWarningDialogProps> = ({
  open,
  onOpenChange,
  warnings,
  circuitDescription = 'Circuit',
  onApprove,
  onReject
}) => {
  const criticalWarnings = warnings.filter(w => w.severity === 'critical');
  const generalWarnings = warnings.filter(w => w.severity === 'warning');
  const infoWarnings = warnings.filter(w => w.severity === 'info');

  const getIcon = (severity: 'info' | 'warning' | 'critical') => {
    if (severity === 'critical') return <XCircle className="h-5 w-5 text-red-500" />;
    if (severity === 'warning') return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    return <Info className="h-5 w-5 text-blue-500" />;
  };

  const getSeverityBadge = (severity: 'info' | 'warning' | 'critical') => {
    if (severity === 'critical') return <Badge variant="destructive" className="text-xs">Critical</Badge>;
    if (severity === 'warning') return <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">Warning</Badge>;
    return <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">Info</Badge>;
  };

  if (warnings.length === 0) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl w-[calc(100%-1rem)] sm:w-full max-h-[95vh] sm:max-h-[85vh] overflow-y-auto p-3 sm:p-6">
        <AlertDialogHeader className="pb-2 sm:pb-4">
          <AlertDialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            {criticalWarnings.length > 0 ? (
              <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500 flex-shrink-0" />
            )}
            <span className="hidden sm:inline">BS 7671 Regulation Check: {circuitDescription}</span>
            <span className="sm:hidden">BS 7671 Check</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs sm:text-sm pt-1">
            {circuitDescription && <span className="sm:hidden block text-muted-foreground mb-1">{circuitDescription}</span>}
            {criticalWarnings.length > 0 
              ? `${criticalWarnings.length} critical issue(s) and ${generalWarnings.length} warning(s) detected.`
              : `${generalWarnings.length} warning(s) detected for your review.`
            }
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-3 sm:space-y-4 max-h-[calc(100vh-300px)] sm:max-h-96 overflow-y-auto">
          {criticalWarnings.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-red-600 flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Critical Issues (Must be resolved)
              </h4>
              {criticalWarnings.map((warning, index) => (
                <Card key={index} className="border-red-200 bg-red-50/50">
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-medium text-red-800">{warning.title}</h5>
                        {getSeverityBadge(warning.severity)}
                      </div>
                      <p className="text-sm text-red-700">{warning.description}</p>
                      <div className="flex items-center gap-1 text-xs text-red-600">
                        <BookOpen className="h-3 w-3" />
                        <span className="font-medium">{warning.regulation}</span>
                      </div>
                      {warning.suggestion && (
                        <div className="flex items-start gap-2 p-2 bg-elec-gray/20 rounded border-l-2 border-elec-gray">
                          <Lightbulb className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-foreground">{warning.suggestion}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {generalWarnings.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-amber-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Warnings (Review recommended)
              </h4>
              {generalWarnings.map((warning, index) => (
                <Card key={index} className="border-amber-200 bg-amber-50/50">
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-medium text-amber-800">{warning.title}</h5>
                        {getSeverityBadge(warning.severity)}
                      </div>
                      <p className="text-sm text-amber-700">{warning.description}</p>
                      <div className="flex items-center gap-1 text-xs text-amber-600">
                        <BookOpen className="h-3 w-3" />
                        <span className="font-medium">{warning.regulation}</span>
                      </div>
                      {warning.suggestion && (
                        <div className="flex items-start gap-2 p-2 bg-elec-gray/20 rounded border-l-2 border-elec-gray">
                          <Lightbulb className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-foreground">{warning.suggestion}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2 pt-3 sm:pt-4">
          {criticalWarnings.length > 0 ? (
            <>
              <AlertDialogCancel onClick={onReject} className="w-full sm:w-auto min-h-[44px] touch-manipulation">
                Review Configuration
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={onApprove}
                className="w-full sm:w-auto min-h-[44px] bg-red-600 hover:bg-red-700 touch-manipulation"
              >
                Accept with Issues
              </AlertDialogAction>
            </>
          ) : (
            <>
              <AlertDialogCancel onClick={onReject} className="w-full sm:w-auto min-h-[44px] touch-manipulation">
                Review Warnings
              </AlertDialogCancel>
              <AlertDialogAction onClick={onApprove} className="w-full sm:w-auto min-h-[44px] touch-manipulation">
                Proceed
              </AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RegulationWarningDialog;
