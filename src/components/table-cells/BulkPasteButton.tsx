import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ClipboardPaste } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { TestResult } from '@/types/testResult';

interface BulkPasteButtonProps {
  value: string;
  fieldName: keyof TestResult;
  fieldLabel: string;
  testResults: TestResult[];
  onBulkUpdate: (field: keyof TestResult, value: string) => void;
}

export const BulkPasteButton: React.FC<BulkPasteButtonProps> = ({
  value,
  fieldName,
  fieldLabel,
  testResults,
  onBulkUpdate,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  const handlePasteToAll = () => {
    onBulkUpdate(fieldName, value);
    setShowDialog(false);
    toast({
      title: 'Applied to all circuits',
      description: `Set "${fieldLabel}" to "${value}" for ${testResults.length} circuit${testResults.length > 1 ? 's' : ''}`,
    });
  };

  if (!value) return null;

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowDialog(true)}
        className="h-6 px-2 text-xs hover:bg-primary/10"
        title={`Paste "${value}" to all ${fieldLabel} fields`}
      >
        <ClipboardPaste className="h-3 w-3 mr-1" />
        Paste to All
      </Button>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Paste to All Circuits</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to set <strong>"{fieldLabel}"</strong> to{' '}
              <strong>"{value}"</strong> for all {testResults.length} circuits?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePasteToAll}>
              Apply to All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
