/**
 * BulkLuminaireActions Component
 *
 * Provides bulk operations for large emergency lighting installations:
 * - Add 5/10/20 luminaires at once
 * - Mark all as PASS for functional test
 * - Clone luminaire with specs
 */

import React, { useState } from 'react';
import { Plus, Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Luminaire {
  id: string;
  location: string;
  luminaireType: string;
  category: string;
  manufacturer: string;
  model: string;
  wattage: number;
  batteryType: string;
  ratedDuration: number;
  functionalTestResult?: string;
  durationTestResult?: string;
  notes?: string;
}

interface BulkLuminaireActionsProps {
  luminaires: Luminaire[];
  onAddLuminaires: (count: number) => void;
  onCloneLuminaire: (luminaire: Luminaire) => void;
  onMarkAllPass: () => void;
  className?: string;
}

const BulkLuminaireActions: React.FC<BulkLuminaireActionsProps> = ({
  luminaires,
  onAddLuminaires,
  onCloneLuminaire,
  onMarkAllPass,
  className,
}) => {
  const [isAddingBulk, setIsAddingBulk] = useState(false);
  const [isMarkingPass, setIsMarkingPass] = useState(false);
  const { toast } = useToast();

  const handleBulkAdd = async (count: number) => {
    setIsAddingBulk(true);
    try {
      onAddLuminaires(count);
      toast({
        title: 'Luminaires Added',
        description: `${count} luminaires have been added to the schedule.`,
      });
    } finally {
      setIsAddingBulk(false);
    }
  };

  const handleMarkAllPass = async () => {
    if (luminaires.length === 0) {
      toast({
        title: 'No Luminaires',
        description: 'Add luminaires to the schedule first.',
        variant: 'destructive',
      });
      return;
    }

    setIsMarkingPass(true);
    try {
      onMarkAllPass();
      toast({
        title: 'All Marked Pass',
        description: `${luminaires.length} luminaires marked as PASS.`,
      });
    } finally {
      setTimeout(() => setIsMarkingPass(false), 500);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Quick Add Section */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <Plus className="h-4 w-4 text-elec-yellow" />
          Bulk Add Luminaires
        </h4>
        <p className="text-sm text-muted-foreground mb-3">
          Quickly add multiple luminaires for large installations.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAdd(5)}
            disabled={isAddingBulk}
            className="touch-manipulation border-white/30 hover:border-elec-yellow/50"
          >
            {isAddingBulk ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Plus className="h-4 w-4 mr-1" />
            )}
            +5
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAdd(10)}
            disabled={isAddingBulk}
            className="touch-manipulation border-white/30 hover:border-elec-yellow/50"
          >
            {isAddingBulk ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Plus className="h-4 w-4 mr-1" />
            )}
            +10
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAdd(20)}
            disabled={isAddingBulk}
            className="touch-manipulation border-white/30 hover:border-elec-yellow/50"
          >
            {isAddingBulk ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Plus className="h-4 w-4 mr-1" />
            )}
            +20
          </Button>
        </div>
      </div>

      {/* Bulk Test Results Section */}
      {luminaires.length > 0 && (
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            Bulk Test Results
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            Quickly mark all {luminaires.length} luminaires for functional test.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllPass}
            disabled={isMarkingPass}
            className={cn(
              "touch-manipulation border-white/30",
              isMarkingPass && "border-green-500/50 bg-green-500/10"
            )}
          >
            {isMarkingPass ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-400" />
                Marked!
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark All PASS
              </>
            )}
          </Button>
        </div>
      )}

      {/* Clone Hint */}
      {luminaires.length > 0 && (
        <div className="flex items-start gap-2 text-xs text-muted-foreground px-1">
          <Copy className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          <span>
            Use the <strong>Clone</strong> button on any luminaire to duplicate it
            with the same specs but a new location.
          </span>
        </div>
      )}
    </div>
  );
};

export default BulkLuminaireActions;
