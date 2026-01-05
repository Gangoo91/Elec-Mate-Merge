import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TestResultsReviewDialogProps {
  open: boolean;
  onClose: () => void;
  extractedData: any;
  onAccept: (selectedCircuits: any[]) => void;
}

const TestResultsReviewDialog = ({
  open,
  onClose,
  extractedData,
  onAccept,
}: TestResultsReviewDialogProps) => {
  const [selectedCircuits, setSelectedCircuits] = useState<string[]>(
    extractedData?.circuits?.map((c: any) => c.circuit_reference) || []
  );

  const toggleCircuit = (ref: string) => {
    setSelectedCircuits(prev =>
      prev.includes(ref) ? prev.filter(r => r !== ref) : [...prev, ref]
    );
  };

  const toggleAll = () => {
    if (selectedCircuits.length === extractedData?.circuits?.length) {
      setSelectedCircuits([]);
    } else {
      setSelectedCircuits(extractedData?.circuits?.map((c: any) => c.circuit_reference) || []);
    }
  };

  const handleAccept = () => {
    const selected = extractedData?.circuits?.filter((c: any) =>
      selectedCircuits.includes(c.circuit_reference)
    ) || [];
    onAccept(selected);
    onClose();
  };

  const getConfidenceBadge = (confidence: string) => {
    const variants: Record<string, { color: string; label: string }> = {
      high: { color: 'bg-green-500/10 text-green-700 border-green-500/20', label: 'High' },
      medium: { color: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20', label: 'Medium' },
      low: { color: 'bg-red-500/10 text-red-700 border-red-500/20', label: 'Low' },
    };

    const variant = variants[confidence] || variants.medium;
    return (
      <Badge variant="outline" className={variant.color}>
        {variant.label}
      </Badge>
    );
  };

  const hasWarnings = extractedData?.warnings?.length > 0;
  const hasSuggestions = extractedData?.suggestions?.length > 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-5xl max-h-[90vh] overflow-y-auto p-3 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span>Test Results Detected</span>
            {getConfidenceBadge(extractedData?.overall_confidence || 'medium')}
          </DialogTitle>
          <DialogDescription>
            Review and verify the extracted test data. Select circuits to add to your schedule.
          </DialogDescription>
        </DialogHeader>

        {hasWarnings && (
          <div className="rounded-lg border-2 border-amber-500/50 bg-amber-500/10 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  BS 7671 Compliance Warnings:
                </p>
                <ul className="list-disc list-inside space-y-1.5">
                  {extractedData.warnings.map((warning: string, idx: number) => (
                    <li key={idx} className="text-sm text-amber-900 dark:text-amber-100 leading-relaxed">
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {extractedData?.circuits?.length === 0 ? (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              No circuits were detected in the provided images. Please ensure the images contain clear test result data.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-xs sm:text-sm">
                  <Checkbox
                    checked={selectedCircuits.length === extractedData?.circuits?.length}
                    onCheckedChange={toggleAll}
                  />
                  </TableHead>
                  <TableHead className="text-xs sm:text-sm">Circuit</TableHead>
                  <TableHead className="text-xs sm:text-sm">Description</TableHead>
                  <TableHead className="text-xs sm:text-sm">R1+R2</TableHead>
                  <TableHead className="text-xs sm:text-sm">IR</TableHead>
                  <TableHead className="text-xs sm:text-sm">Zs</TableHead>
                  <TableHead className="text-xs sm:text-sm">RCD</TableHead>
                  <TableHead className="text-xs sm:text-sm">Device</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {extractedData?.circuits?.map((circuit: any, idx: number) => {
                const isSelected = selectedCircuits.includes(circuit.circuit_reference);
                const hasIssues = circuit.confidence === 'low';

                return (
                  <TableRow key={idx} className={isSelected ? 'bg-accent/50' : ''}>
                    <TableCell>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleCircuit(circuit.circuit_reference)}
                      />
                    </TableCell>
                    <TableCell className="font-mono font-semibold">
                      {circuit.circuit_reference}
                    </TableCell>
                    <TableCell className="text-sm">
                      {circuit.circuit_description || '-'}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {circuit.tests?.r1_r2?.value || '-'}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {circuit.tests?.insulation_resistance?.value || '-'}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {circuit.tests?.zs?.value || '-'}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {circuit.tests?.rcd_trip_time?.value || '-'}
                    </TableCell>
                    <TableCell className="text-sm">
                      {circuit.protective_device?.type || '-'}
                      {circuit.protective_device?.rating && ` ${circuit.protective_device.rating}`}
                    </TableCell>
                    <TableCell className="text-center">
                      {hasIssues ? (
                        <AlertCircle className="h-4 w-4 text-destructive inline" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-green-600 inline" />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          </div>
        )}

        {hasSuggestions && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <p className="font-semibold mb-1">Recommendations:</p>
              <ul className="list-disc list-inside space-y-1">
                {extractedData.suggestions.map((suggestion: string, idx: number) => (
                  <li key={idx} className="text-sm">{suggestion}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-muted-foreground">
          <p>
            <strong>Layout detected:</strong> {extractedData?.layout_detected || 'Unknown'}
          </p>
          <p>
            <strong>Circuits found:</strong> {extractedData?.circuits?.length || 0}
          </p>
          <p className="mt-2 text-xs">
            All extracted data will be marked as "AI Detected - Please Verify" in your schedule.
            Review each value carefully before submission.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAccept}
            disabled={selectedCircuits.length === 0}
          >
            Add {selectedCircuits.length} Circuit{selectedCircuits.length !== 1 ? 's' : ''} to Schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TestResultsReviewDialog;
