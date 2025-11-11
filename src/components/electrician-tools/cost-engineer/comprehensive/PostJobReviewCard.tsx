import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ClipboardCheck, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import { MobileButton } from "@/components/ui/mobile-button";

interface PostJobReviewCardProps {
  estimatedCost: number;
  estimatedHours: number;
  estimatedProfit: number;
  projectName?: string;
}

const PostJobReviewCard = ({
  estimatedCost,
  estimatedHours,
  estimatedProfit,
  projectName
}: PostJobReviewCardProps) => {
  const [winLoss, setWinLoss] = useState<'won' | 'lost' | 'pending'>('pending');
  const [actualCost, setActualCost] = useState("");
  const [actualHours, setActualHours] = useState("");
  const [reviewNotes, setReviewNotes] = useState("");

  const calculateVariance = (actual: number, estimated: number) => {
    if (!actual || !estimated) return null;
    const variance = ((actual - estimated) / estimated) * 100;
    return variance;
  };

  const actualCostNum = parseFloat(actualCost) || 0;
  const actualHoursNum = parseFloat(actualHours) || 0;
  const actualProfit = actualCostNum > 0 ? actualCostNum - estimatedCost + estimatedProfit : 0;

  const costVariance = calculateVariance(actualCostNum, estimatedCost);
  const hoursVariance = calculateVariance(actualHoursNum, estimatedHours);
  const profitVariance = calculateVariance(actualProfit, estimatedProfit);

  const handleSubmit = () => {
    const review = {
      winLoss,
      estimatedCost,
      actualCost: actualCostNum,
      estimatedHours,
      actualHours: actualHoursNum,
      estimatedProfit,
      actualProfit,
      reviewNotes,
      projectName,
      submittedAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingReviews = JSON.parse(localStorage.getItem('job-reviews') || '[]');
    existingReviews.push(review);
    localStorage.setItem('job-reviews', JSON.stringify(existingReviews));

    alert('Review saved successfully!');
  };

  return (
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <CardTitle className="text-xl sm:text-lg font-bold text-white flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
          Post-Job Review
        </CardTitle>
        <p className="text-base sm:text-sm text-white/80">
          Track actual vs estimate to improve future quotes
        </p>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-4">
        {/* Win/Loss */}
        <div className="space-y-2">
          <Label className="text-base sm:text-sm font-medium text-white">Job Outcome</Label>
          <RadioGroup value={winLoss} onValueChange={(v: any) => setWinLoss(v)}>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="won" id="won" className="h-5 w-5 sm:h-4 sm:w-4" />
              <Label htmlFor="won" className="cursor-pointer text-base sm:text-sm text-white">Won - Job completed</Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="lost" id="lost" className="h-5 w-5 sm:h-4 sm:w-4" />
              <Label htmlFor="lost" className="cursor-pointer text-base sm:text-sm text-white">Lost - Client chose competitor</Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="pending" id="pending" className="h-5 w-5 sm:h-4 sm:w-4" />
              <Label htmlFor="pending" className="cursor-pointer text-base sm:text-sm text-white">Pending - Awaiting decision</Label>
            </div>
          </RadioGroup>
        </div>

        {winLoss === 'won' && (
          <>
            {/* Actual vs Estimate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="actual-cost" className="text-base sm:text-sm text-white">Actual Cost (excl. VAT)</Label>
                <Input
                  id="actual-cost"
                  type="number"
                  value={actualCost}
                  onChange={(e) => setActualCost(e.target.value)}
                  placeholder={`Est: £${estimatedCost.toFixed(0)}`}
                />
                {costVariance !== null && (
                  <div className={`text-xs flex items-center gap-1 ${
                    costVariance > 0 ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {costVariance > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(costVariance).toFixed(1)}% {costVariance > 0 ? 'over' : 'under'} estimate
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="actual-hours" className="text-base sm:text-sm text-white">Actual Hours</Label>
                <Input
                  id="actual-hours"
                  type="number"
                  value={actualHours}
                  onChange={(e) => setActualHours(e.target.value)}
                  placeholder={`Est: ${estimatedHours.toFixed(1)}h`}
                />
                {hoursVariance !== null && (
                  <div className={`text-xs flex items-center gap-1 ${
                    hoursVariance > 0 ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {hoursVariance > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(hoursVariance).toFixed(1)}% {hoursVariance > 0 ? 'over' : 'under'} estimate
                  </div>
                )}
              </div>
            </div>

            {/* Profit Comparison */}
            {actualProfit > 0 && (
              <div className="p-4 sm:p-3 rounded-lg bg-background/50 border border-border/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base sm:text-sm text-white/80">Actual Profit</span>
                  <span className={`text-xl sm:text-lg font-bold ${
                    actualProfit >= estimatedProfit ? 'text-green-500' : 'text-red-500'
                  }`}>
                    £{actualProfit.toFixed(0)}
                  </span>
                </div>
                {profitVariance !== null && (
                  <div className={`text-sm ${
                    profitVariance >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {profitVariance >= 0 ? '+' : ''}{profitVariance.toFixed(1)}% vs estimate (£{estimatedProfit.toFixed(0)})
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Review Notes */}
        <div className="space-y-2">
          <Label htmlFor="review-notes" className="text-base sm:text-sm font-medium text-white">
            Review Notes
          </Label>
          <Textarea
            id="review-notes"
            value={reviewNotes}
            onChange={(e) => setReviewNotes(e.target.value)}
            placeholder="What went well? What would you do differently? Any learnings?"
            className="min-h-[80px] resize-none"
            style={{ fontSize: '16px' }}
          />
        </div>

        <MobileButton
          variant="elec"
          size="default"
          onClick={handleSubmit}
          className="w-full"
        >
          Save Review
        </MobileButton>
      </CardContent>
    </Card>
  );
};

export default PostJobReviewCard;
