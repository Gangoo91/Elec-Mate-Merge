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
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-hidden bg-elec-dark border-elec-yellow/20 mx-2 w-[calc(100vw-1rem)] sm:w-full sm:mx-4">
        <div className="overflow-y-auto max-h-[calc(95vh-8rem)] pr-2 -mr-2">
          <DialogHeader className="pb-4">
            <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
              <span className="line-clamp-2">Confirm Qualification Selection</span>
            </DialogTitle>
            <DialogDescription className="text-sm">
              You're about to select this qualification. Your portfolio will be tailored to meet these specific requirements.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Qualification Details */}
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="p-3 sm:p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <Badge variant="outline" className="border-elec-yellow bg-elec-yellow text-elec-dark font-semibold text-xs sm:text-sm">
                      {qualification.level}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">{qualification.awarding_body}</span>
                      <span className="sm:hidden">City & Guilds</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-lg line-clamp-3">{qualification.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Code: {qualification.code}
                    </p>
                    {qualification.description && (
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2">
                        {qualification.description}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Requirements */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
                <h4 className="font-semibold text-sm sm:text-base">Portfolio Requirements</h4>
              </div>
              
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardContent className="p-3 sm:p-4">
                  <div className="grid gap-2 sm:gap-3">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-medium">Total Categories:</span>
                      <Badge variant="secondary" className="text-xs">{categories.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-medium">Total Required Entries:</span>
                      <Badge variant="secondary" className="text-xs">{totalRequiredEntries}</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Portfolio Categories:</p>
                    <div className="grid gap-1.5 sm:gap-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center justify-between p-2 rounded border border-elec-yellow/10 bg-elec-dark/50">
                          <span className="text-xs sm:text-sm line-clamp-2 flex-1 mr-2">{category.name}</span>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {category.required_entries}
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
              <Label htmlFor="target-date" className="flex items-center gap-2 text-sm">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                Target Completion Date (Optional)
              </Label>
              <Input
                id="target-date"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-elec-dark border-elec-yellow/20 text-sm"
              />
              <p className="text-xs text-muted-foreground leading-tight">
                Setting a target date helps track your progress and plan your portfolio completion.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 pt-4">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-elec-yellow/20 w-full sm:w-auto order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={isConfirming}
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 w-full sm:w-auto order-1 sm:order-2"
          >
            <span className="text-sm sm:text-base">
              {isConfirming ? 'Setting Up Portfolio...' : 'Confirm & Set Up Portfolio'}
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QualificationConfirmationDialog;