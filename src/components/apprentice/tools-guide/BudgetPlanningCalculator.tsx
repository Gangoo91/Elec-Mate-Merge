import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ToolCategory {
  name: string;
  minCost: number;
  maxCost: number;
  priority: 'essential' | 'recommended' | 'optional';
  timeframe: string;
}

const BudgetPlanningCalculator = () => {
  const [monthlyBudget, setMonthlyBudget] = useState('');
  const [timeframe, setTimeframe] = useState('12');

  const toolCategories: ToolCategory[] = [
    {
      name: 'Hand Tools',
      minCost: 200,
      maxCost: 400,
      priority: 'essential',
      timeframe: 'Months 1-3',
    },
    { name: 'Basic PPE', minCost: 100, maxCost: 200, priority: 'essential', timeframe: 'Month 1' },
    {
      name: 'Power Tools',
      minCost: 300,
      maxCost: 800,
      priority: 'recommended',
      timeframe: 'Months 3-6',
    },
    {
      name: 'Test Equipment',
      minCost: 400,
      maxCost: 1200,
      priority: 'essential',
      timeframe: 'Months 6-12',
    },
    {
      name: 'Specialist Tools',
      minCost: 200,
      maxCost: 500,
      priority: 'optional',
      timeframe: 'Months 12+',
    },
  ];

  const calculateBudget = () => {
    const monthly = parseFloat(monthlyBudget);
    const months = parseInt(timeframe);
    if (!monthly || !months) return null;

    const totalBudget = monthly * months;
    const essentialCosts = toolCategories
      .filter((cat) => cat.priority === 'essential')
      .reduce((sum, cat) => sum + cat.minCost, 0);

    const maxEssentialCosts = toolCategories
      .filter((cat) => cat.priority === 'essential')
      .reduce((sum, cat) => sum + cat.maxCost, 0);

    return {
      totalBudget,
      essentialCosts,
      maxEssentialCosts,
      remainingBudget: totalBudget - essentialCosts,
      canAffordEssentials: totalBudget >= essentialCosts,
      canAffordQuality: totalBudget >= maxEssentialCosts,
    };
  };

  const budget = calculateBudget();

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-5">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Budget planner
        </span>
        <h3 className="text-[18px] font-semibold text-white leading-tight">
          Budget planning calculator
        </h3>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Plan your tool investments based on your available budget and timeframe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="monthly-budget" className="text-[13px] text-white/85">
            Monthly budget (£)
          </Label>
          <Input
            id="monthly-budget"
            type="number"
            placeholder="150"
            value={monthlyBudget}
            onChange={(e) => setMonthlyBudget(e.target.value)}
            className="h-11 text-base touch-manipulation border-white/15 focus:border-elec-yellow focus:ring-elec-yellow"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeframe" className="text-[13px] text-white/85">
            Planning period (months)
          </Label>
          <Input
            id="timeframe"
            type="number"
            placeholder="12"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="h-11 text-base touch-manipulation border-white/15 focus:border-elec-yellow focus:ring-elec-yellow"
          />
        </div>
      </div>

      {budget && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Total budget
              </span>
              <p className="text-[18px] font-semibold text-white">£{budget.totalBudget}</p>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Essential tools
              </span>
              <p className="text-[18px] font-semibold text-white">£{budget.essentialCosts}</p>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Remaining
              </span>
              <p className="text-[18px] font-semibold text-elec-yellow">£{budget.remainingBudget}</p>
            </div>
          </div>

          {!budget.canAffordEssentials && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/[0.04] p-3 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
                Budget alert
              </span>
              <p className="text-[14px] text-white/85 leading-relaxed">
                Your current budget may not cover all essential tools. Consider extending your
                timeframe or increasing monthly allocation.
              </p>
            </div>
          )}

          {budget.canAffordQuality && (
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Excellent planning
              </span>
              <p className="text-[14px] text-white/85 leading-relaxed">
                Your budget allows for quality essential tools plus some recommended items.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3 pt-2 border-t border-white/[0.06]">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Tool category breakdown
        </span>
        <div className="space-y-2">
          {toolCategories.map((category, index) => (
            <div
              key={index}
              className="flex items-baseline justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
            >
              <div className="space-y-1">
                <div className="flex items-baseline gap-3 text-[10px] uppercase tracking-[0.18em] text-white/55">
                  <span className="text-[14px] text-white normal-case tracking-normal font-medium">
                    {category.name}
                  </span>
                  <span>{category.priority}</span>
                </div>
                <p className="text-[12px] text-white/55">{category.timeframe}</p>
              </div>
              <p className="text-[13px] text-white/85 font-mono">
                £{category.minCost} - £{category.maxCost}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanningCalculator;
