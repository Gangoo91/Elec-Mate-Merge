import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const ToolBudgetCalculator = () => {
  const [monthlyBudget, setMonthlyBudget] = useState<string>('200');
  const [timeframe, setTimeframe] = useState<string>('12');
  const [priority, setPriority] = useState<string>('essential');
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<{ [key: string]: number }>({});

  const toolCosts = {
    essential: {
      'Basic hand tools': 300,
      'PPE & safety equipment': 150,
      'Basic test equipment': 200,
      'Tool storage': 100,
    },
    recommended: {
      'Power tools': 500,
      'Advanced test equipment': 800,
      'Professional hand tools': 400,
      'Vehicle storage': 300,
    },
    advanced: {
      'Specialist test equipment': 1200,
      'Professional power tools': 800,
      'Advanced PPE': 200,
      'Complete toolkit': 600,
    },
  };

  const calculateBudget = () => {
    const monthly = parseFloat(monthlyBudget) || 0;
    const months = parseInt(timeframe) || 12;
    const total = monthly * months;
    setTotalBudget(total);

    const selectedTools = toolCosts[priority as keyof typeof toolCosts];
    const totalCost = Object.values(selectedTools).reduce((sum, cost) => sum + cost, 0);

    const budgetBreakdown: { [key: string]: number } = {};
    Object.entries(selectedTools).forEach(([tool, cost]) => {
      budgetBreakdown[tool] = (cost / totalCost) * total;
    });

    setBreakdown(budgetBreakdown);
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Tool budget calculator
        </span>
        <p className="text-[13px] text-white/55">
          Plan your tool investments and see how your budget allocates
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-2">
            <Label htmlFor="monthly-budget" className="text-[13px] text-white/85">
              Monthly budget (£)
            </Label>
            <Input
              id="monthly-budget"
              type="number"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              placeholder="200"
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeframe" className="text-[13px] text-white/85">
              Timeframe (months)
            </Label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                <SelectItem value="6">6 months</SelectItem>
                <SelectItem value="12">12 months</SelectItem>
                <SelectItem value="18">18 months</SelectItem>
                <SelectItem value="24">24 months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority" className="text-[13px] text-white/85">
              Priority level
            </Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                <SelectItem value="essential">Essential only</SelectItem>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={calculateBudget}
          className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
        >
          Calculate budget plan
        </Button>

        {totalBudget > 0 && (
          <div className="space-y-4 pt-3 border-t border-white/[0.06]">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 flex items-baseline justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Total budget
              </span>
              <span className="text-2xl font-mono text-white">£{totalBudget.toFixed(0)}</span>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Recommended allocation
              </span>
              {Object.entries(breakdown).map(([tool, amount]) => (
                <div
                  key={tool}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-2"
                >
                  <div className="flex justify-between text-[14px]">
                    <span className="text-white/85">{tool}</span>
                    <span className="text-white font-mono">£{amount.toFixed(0)}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-elec-yellow transition-all"
                      style={{ width: `${(amount / totalBudget) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolBudgetCalculator;
