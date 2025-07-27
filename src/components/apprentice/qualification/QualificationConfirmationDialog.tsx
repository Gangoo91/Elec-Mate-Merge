import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarDays, Award, GraduationCap, CheckCircle, Clock } from 'lucide-react';
import { Qualification, QualificationCategory } from '@/types/qualification';
import { toast } from 'sonner';

interface QualificationConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qualification: Qualification | null;
  categories: QualificationCategory[];
  onConfirm: (targetDate?: string) => Promise<void>;
}

const QualificationConfirmationDialog = ({
  open,
  onOpenChange,
  qualification,
  categories,
  onConfirm
}: QualificationConfirmationDialogProps) => {
  const [targetDate, setTargetDate] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async () => {
    if (!qualification) return;

    setIsConfirming(true);
    try {
      await onConfirm(targetDate || undefined);
      onOpenChange(false);
      setTargetDate('');
    } catch (error) {
      toast.error('Failed to select qualification');
    } finally {
      setIsConfirming(false);
    }
  };

  const totalRequiredEntries = categories.reduce((sum, cat) => sum + cat.required_entries, 0);

  if (!qualification) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-elec-dark border-elec-yellow/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Award className="h-6 w-6 text-elec-yellow" />
            Confirm Qualification Selection
          </DialogTitle>
          <DialogDescription>
            You're about to select this qualification. Your portfolio will be tailored to meet these specific requirements.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Qualification Details */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-elec-yellow bg-elec-yellow text-elec-dark font-semibold">
                    {qualification.level}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    {qualification.awarding_body}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{qualification.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Code: {qualification.code}
                  </p>
                  {qualification.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {qualification.description}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Requirements */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-elec-yellow" />
              <h4 className="font-semibold">Portfolio Requirements</h4>
            </div>
            
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-4">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Total Portfolio Categories:</span>
                    <Badge variant="secondary">{categories.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Total Required Entries:</span>
                    <Badge variant="secondary">{totalRequiredEntries}</Badge>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Portfolio Categories:</p>
                  <div className="grid gap-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between p-2 rounded border border-elec-yellow/10 bg-elec-dark/50">
                        <span className="text-sm">{category.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {category.required_entries} entries
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Target Date */}
          <div className="space-y-2">
            <Label htmlFor="target-date" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Target Completion Date (Optional)
            </Label>
            <Input
              id="target-date"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="bg-elec-dark border-elec-yellow/20"
            />
            <p className="text-xs text-muted-foreground">
              Setting a target date helps track your progress and plan your portfolio completion.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-elec-yellow/20"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={isConfirming}
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          >
            {isConfirming ? 'Setting Up Portfolio...' : 'Confirm & Set Up Portfolio'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QualificationConfirmationDialog;