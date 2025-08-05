import { useState, useMemo, useCallback } from 'react';

export interface IncomeStream {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'seasonal';
  seasonalMultiplier?: number[];
  paymentDelayDays: number;
  growth: number;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'annual';
  timing?: number; // Month for annual/quarterly expenses
  variable: boolean;
  growth: number;
}

export interface Scenario {
  id: string;
  name: string;
  multiplier: number;
  description: string;
}

export interface MonthlyProjection {
  month: number;
  monthName: string;
  income: number;
  expenses: number;
  netFlow: number;
  cumulativeBalance: number;
  incomeBreakdown: { [key: string]: number };
  expenseBreakdown: { [key: string]: number };
}

export interface CashFlowState {
  incomeStreams: IncomeStream[];
  expenseCategories: ExpenseCategory[];
  startingBalance: number;
  scenarios: Scenario[];
  selectedScenario: string;
  emergencyFundTarget: number;
  vatQuarter: number;
}

const defaultScenarios: Scenario[] = [
  { id: 'pessimistic', name: 'Conservative', multiplier: 0.8, description: 'Cautious outlook with reduced income' },
  { id: 'realistic', name: 'Realistic', multiplier: 1.0, description: 'Expected business performance' },
  { id: 'optimistic', name: 'Optimistic', multiplier: 1.2, description: 'Strong growth scenario' }
];

const defaultIncomeStreams: IncomeStream[] = [
  {
    id: 'regular-contracts',
    name: 'Regular Contracts',
    amount: 6000,
    frequency: 'monthly',
    paymentDelayDays: 14,
    growth: 0.05
  },
  {
    id: 'seasonal-work',
    name: 'Seasonal Work',
    amount: 2000,
    frequency: 'seasonal',
    seasonalMultiplier: [0.6, 0.7, 0.9, 1.1, 1.3, 1.5, 1.6, 1.4, 1.2, 1.0, 0.8, 0.7],
    paymentDelayDays: 21,
    growth: 0.03
  }
];

const defaultExpenseCategories: ExpenseCategory[] = [
  {
    id: 'materials',
    name: 'Materials & Supplies',
    amount: 2000,
    frequency: 'monthly',
    variable: true,
    growth: 0.03
  },
  {
    id: 'labour',
    name: 'Labour Costs',
    amount: 1500,
    frequency: 'monthly',
    variable: true,
    growth: 0.04
  },
  {
    id: 'overheads',
    name: 'Overheads',
    amount: 800,
    frequency: 'monthly',
    variable: false,
    growth: 0.02
  },
  {
    id: 'insurance',
    name: 'Insurance',
    amount: 1200,
    frequency: 'annual',
    timing: 3,
    variable: false,
    growth: 0.05
  },
  {
    id: 'equipment',
    name: 'Equipment',
    amount: 2000,
    frequency: 'quarterly',
    timing: 6,
    variable: false,
    growth: 0.02
  }
];

export const useCashFlow = () => {
  const [state, setState] = useState<CashFlowState>({
    incomeStreams: defaultIncomeStreams,
    expenseCategories: defaultExpenseCategories,
    startingBalance: 5000,
    scenarios: defaultScenarios,
    selectedScenario: 'realistic',
    emergencyFundTarget: 18000,
    vatQuarter: 3
  });

  const updateIncomeStream = useCallback((id: string, updates: Partial<IncomeStream>) => {
    setState(prev => ({
      ...prev,
      incomeStreams: prev.incomeStreams.map(stream =>
        stream.id === id ? { ...stream, ...updates } : stream
      )
    }));
  }, []);

  const addIncomeStream = useCallback((stream: Omit<IncomeStream, 'id'>) => {
    setState(prev => ({
      ...prev,
      incomeStreams: [...prev.incomeStreams, { ...stream, id: Date.now().toString() }]
    }));
  }, []);

  const removeIncomeStream = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      incomeStreams: prev.incomeStreams.filter(stream => stream.id !== id)
    }));
  }, []);

  const updateExpenseCategory = useCallback((id: string, updates: Partial<ExpenseCategory>) => {
    setState(prev => ({
      ...prev,
      expenseCategories: prev.expenseCategories.map(category =>
        category.id === id ? { ...category, ...updates } : category
      )
    }));
  }, []);

  const addExpenseCategory = useCallback((category: Omit<ExpenseCategory, 'id'>) => {
    setState(prev => ({
      ...prev,
      expenseCategories: [...prev.expenseCategories, { ...category, id: Date.now().toString() }]
    }));
  }, []);

  const removeExpenseCategory = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      expenseCategories: prev.expenseCategories.filter(category => category.id !== id)
    }));
  }, []);

  const updateSettings = useCallback((updates: Partial<Pick<CashFlowState, 'startingBalance' | 'selectedScenario' | 'emergencyFundTarget' | 'vatQuarter'>>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const monthlyProjections = useMemo((): MonthlyProjection[] => {
    const scenario = state.scenarios.find(s => s.id === state.selectedScenario) || state.scenarios[1];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let cumulativeBalance = state.startingBalance;

    return Array.from({ length: 12 }, (_, monthIndex) => {
      const month = monthIndex + 1;
      const incomeBreakdown: { [key: string]: number } = {};
      const expenseBreakdown: { [key: string]: number } = {};

      // Calculate income
      let totalIncome = 0;
      state.incomeStreams.forEach(stream => {
        let monthlyAmount = 0;

        if (stream.frequency === 'monthly') {
          monthlyAmount = stream.amount * (1 + stream.growth * (monthIndex / 12));
        } else if (stream.frequency === 'seasonal' && stream.seasonalMultiplier) {
          monthlyAmount = stream.amount * stream.seasonalMultiplier[monthIndex] * (1 + stream.growth * (monthIndex / 12));
        } else if (stream.frequency === 'quarterly' && month % 3 === 1) {
          monthlyAmount = stream.amount * 3 * (1 + stream.growth * (monthIndex / 12));
        }

        monthlyAmount *= scenario.multiplier;
        incomeBreakdown[stream.name] = monthlyAmount;
        totalIncome += monthlyAmount;
      });

      // Calculate expenses
      let totalExpenses = 0;
      state.expenseCategories.forEach(category => {
        let monthlyAmount = 0;

        if (category.frequency === 'monthly') {
          monthlyAmount = category.amount * (1 + category.growth * (monthIndex / 12));
        } else if (category.frequency === 'quarterly' && month % 3 === (category.timing || 1)) {
          monthlyAmount = category.amount * (1 + category.growth * (monthIndex / 12));
        } else if (category.frequency === 'annual' && month === (category.timing || 1)) {
          monthlyAmount = category.amount * (1 + category.growth * (monthIndex / 12));
        }

        // Apply scenario multiplier to variable expenses only
        if (category.variable) {
          monthlyAmount *= scenario.multiplier;
        }

        expenseBreakdown[category.name] = monthlyAmount;
        totalExpenses += monthlyAmount;
      });

      // Add VAT payment if applicable
      if (month % 3 === state.vatQuarter % 3) {
        const vatPayment = totalIncome * 0.2 * 3; // Simplified VAT calculation
        expenseBreakdown['VAT Payment'] = vatPayment;
        totalExpenses += vatPayment;
      }

      const netFlow = totalIncome - totalExpenses;
      cumulativeBalance += netFlow;

      return {
        month,
        monthName: monthNames[monthIndex],
        income: totalIncome,
        expenses: totalExpenses,
        netFlow,
        cumulativeBalance,
        incomeBreakdown,
        expenseBreakdown
      };
    });
  }, [state]);

  const insights = useMemo(() => {
    const insights = [];
    const minBalance = Math.min(...monthlyProjections.map(p => p.cumulativeBalance));
    const totalIncome = monthlyProjections.reduce((sum, p) => sum + p.income, 0);
    const totalExpenses = monthlyProjections.reduce((sum, p) => sum + p.expenses, 0);
    const netAnnual = totalIncome - totalExpenses;

    // Cash flow warnings
    const negativeMonths = monthlyProjections.filter(p => p.cumulativeBalance < 0);
    if (negativeMonths.length > 0) {
      insights.push({
        type: 'warning' as const,
        title: 'Negative Cash Flow Alert',
        message: `Cash flow goes negative in ${negativeMonths.length} month(s). Consider increasing credit facilities or adjusting payment terms.`,
        priority: 'high' as const
      });
    }

    // Emergency fund analysis
    if (minBalance < state.emergencyFundTarget) {
      insights.push({
        type: 'warning' as const,
        title: 'Emergency Fund Shortfall',
        message: `Minimum balance (£${minBalance.toFixed(0)}) falls below emergency fund target (£${state.emergencyFundTarget.toFixed(0)}).`,
        priority: 'medium' as const
      });
    }

    // Seasonal planning
    const peakMonth = monthlyProjections.reduce((peak, month) => 
      month.income > peak.income ? month : peak
    );
    const lowMonth = monthlyProjections.reduce((low, month) => 
      month.income < low.income ? month : low
    );

    insights.push({
      type: 'info' as const,
      title: 'Seasonal Pattern',
      message: `Peak income in ${peakMonth.monthName} (£${peakMonth.income.toFixed(0)}), lowest in ${lowMonth.monthName} (£${lowMonth.income.toFixed(0)}).`,
      priority: 'low' as const
    });

    // Profitability
    if (netAnnual > 0) {
      insights.push({
        type: 'success' as const,
        title: 'Positive Annual Outlook',
        message: `Projected annual profit: £${netAnnual.toFixed(0)} across all scenarios.`,
        priority: 'low' as const
      });
    }

    return insights.sort((a, b) => {
      const priority = { high: 3, medium: 2, low: 1 };
      return priority[b.priority] - priority[a.priority];
    });
  }, [monthlyProjections, state.emergencyFundTarget]);

  const financialMetrics = useMemo(() => {
    const totalIncome = monthlyProjections.reduce((sum, p) => sum + p.income, 0);
    const totalExpenses = monthlyProjections.reduce((sum, p) => sum + p.expenses, 0);
    const avgMonthlyIncome = totalIncome / 12;
    const avgMonthlyExpenses = totalExpenses / 12;
    const minBalance = Math.min(...monthlyProjections.map(p => p.cumulativeBalance));
    const maxBalance = Math.max(...monthlyProjections.map(p => p.cumulativeBalance));
    const cashRunway = minBalance < 0 ? 0 : Math.floor(minBalance / avgMonthlyExpenses);

    return {
      totalIncome,
      totalExpenses,
      netProfit: totalIncome - totalExpenses,
      avgMonthlyIncome,
      avgMonthlyExpenses,
      minBalance,
      maxBalance,
      cashRunway,
      profitMargin: totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0,
      breakEvenMonth: monthlyProjections.findIndex(p => p.cumulativeBalance > 0) + 1
    };
  }, [monthlyProjections]);

  return {
    state,
    monthlyProjections,
    insights,
    financialMetrics,
    updateIncomeStream,
    addIncomeStream,
    removeIncomeStream,
    updateExpenseCategory,
    addExpenseCategory,
    removeExpenseCategory,
    updateSettings
  };
};