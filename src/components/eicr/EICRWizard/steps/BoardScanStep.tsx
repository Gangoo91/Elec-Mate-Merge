import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Plus, Sparkles, Check, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DistributionBoard, MAIN_BOARD_ID, createMainBoard } from '@/types/distributionBoard';

interface BoardScanStepProps {
  data: Record<string, any>;
  onChange: (updates: Record<string, any>) => void;
  onSkip: () => void;
  isMobile: boolean;
}

/**
 * Step 3: AI Board Scan - Hero Feature
 * Full-screen camera UI with AI analysis
 */
export const BoardScanStep: React.FC<BoardScanStepProps> = ({
  data,
  onChange,
  onSkip,
  isMobile,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState<string>(MAIN_BOARD_ID);

  // Get boards from wizard data
  const boards: DistributionBoard[] = useMemo(() => {
    const wizardBoards = data.distributionBoards || [];
    if (wizardBoards.length === 0) {
      return [createMainBoard()];
    }
    return wizardBoards;
  }, [data.distributionBoards]);

  const selectedBoard = boards.find(b => b.id === selectedBoardId) || boards[0];
  const hasCircuits = data.circuits && data.circuits.length > 0;

  // Handle AI scan - updates board details and creates circuits
  const handleScan = async () => {
    setIsScanning(true);
    // TODO: Integrate with BoardPhotoCapture component
    // When AI scan completes, it should:
    // 1. Update the selected board's make/model if detected
    // 2. Add detected circuits with the selected boardId

    setTimeout(() => {
      // Simulate AI detecting board details
      // In real implementation, this would come from the AI response
      const updatedBoards = boards.map(board => {
        if (board.id === selectedBoardId) {
          return {
            ...board,
            // AI would update these fields
            // make: detectedMake,
            // model: detectedModel,
            // totalWays: detectedWays,
          };
        }
        return board;
      });

      // Update boards if any changes detected
      // onChange({ distributionBoards: updatedBoards });

      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Card - Primary Scan Action */}
      <Card className="overflow-hidden border-primary/20">
        <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 p-6 sm:p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Icon */}
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <Camera className="h-12 w-12 text-primary" />
            </div>

            {/* Text */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold">AI Board Scanner</h3>
              <p className="text-muted-foreground max-w-md">
                Take a photo of the distribution board and our AI will automatically
                detect all circuits, ratings, and device types.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-2 py-2">
              <Badge variant="secondary" className="gap-1">
                <Check className="h-3 w-3" />
                Circuit labels
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Check className="h-3 w-3" />
                MCB/RCBO ratings
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Check className="h-3 w-3" />
                3P detection
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Check className="h-3 w-3" />
                Board make/model
              </Badge>
            </div>

            {/* Board Selector - show if multiple boards */}
            {boards.length > 1 && (
              <div className="w-full max-w-xs">
                <label className="text-sm text-muted-foreground mb-1 block text-left">
                  Scanning board:
                </label>
                <Select value={selectedBoardId} onValueChange={setSelectedBoardId}>
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue placeholder="Select board" />
                  </SelectTrigger>
                  <SelectContent>
                    {boards.map((board) => (
                      <SelectItem key={board.id} value={board.id}>
                        {board.name} {board.location && `(${board.location})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Primary Action */}
            <Button
              size="lg"
              className={cn(
                'gap-2 px-8',
                isMobile ? 'h-14 text-lg w-full' : 'h-12'
              )}
              onClick={handleScan}
              disabled={isScanning}
            >
              {isScanning ? (
                <>
                  <Sparkles className="h-5 w-5 animate-pulse" />
                  Scanning...
                </>
              ) : (
                <>
                  <Camera className="h-5 w-5" />
                  Scan Distribution Board
                </>
              )}
            </Button>

            {/* Or divider */}
            <div className="flex items-center gap-3 w-full max-w-xs py-2">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground uppercase">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Secondary Action */}
            <Button
              variant="outline"
              className={cn('gap-2', isMobile ? 'h-12 w-full' : 'h-10')}
              onClick={onSkip}
            >
              <Plus className="h-4 w-4" />
              Add Circuits Manually
            </Button>
          </div>
        </div>
      </Card>

      {/* Tips Card */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="font-semibold mb-3">Tips for Best Results</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Zap className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Ensure good lighting - natural light works best</span>
            </li>
            <li className="flex items-start gap-2">
              <Zap className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Capture the full board including circuit labels</span>
            </li>
            <li className="flex items-start gap-2">
              <Zap className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Keep the camera steady and parallel to the board</span>
            </li>
            <li className="flex items-start gap-2">
              <Zap className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <span>For Hager/MK boards, include the schedule chart</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Already have circuits indicator */}
      {hasCircuits && (
        <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">
                    {data.circuits.length} circuits detected
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    You can continue to testing or rescan
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-green-700 dark:text-green-300"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BoardScanStep;
