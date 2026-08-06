import { useState, useMemo, useCallback } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { calculateSelfEmployedTax, ratesFor, CURRENT_TAX_YEAR } from '@/data/uk-tax-rates';

/**
 * MONEY CONVENTION — all `amount` figures are EXCLUSIVE of VAT.
 *
 * Receipts are grossed up by the standard rate when the user is VAT
 * registered, and VATable expenses are paid gross. Mixing net income with
 * gross expenses (or vice versa) is the single easiest way to make a cash
 * flow model quietly wrong, so one convention is enforced throughout.
 */

/** Mean calendar month, used to convert payment terms in days into months. */
const AVG_MONTH_DAYS = 365.25 / 12; // 30.4375

/** Self Assessment payment dates: 31 January and 31 July. */
const SA_JANUARY_MONTH = 1;
const SA_JULY_MONTH = 7;

/**
 * A VAT quarter is payable one calendar month and 7 days after the quarter
 * end (gov.uk/vat-returns/deadlines), so a quarter ending in March is paid in
 * May — two months later.
 */
const VAT_PAYMENT_LAG_MONTHS = 2;

/** Payments on account are not required below this prior-year liability. */
const POA_THRESHOLD = 1000;

export interface IncomeStream {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'seasonal';
  seasonalMultiplier?: number[];
  /** Days between raising the invoice and the money landing. */
  paymentDelayDays: number;
  growth: number;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'annual';
  timing?: number; // Calendar month (1-12) the annual/quarterly cost falls in
  variable: boolean;
  growth: number;
  /**
   * Whether the cost carries recoverable input VAT. Wages, insurance and most
   * professional memberships do not. Defaults to true when unset.
   */
  vatable?: boolean;
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
  /** Cash actually received this month, gross of VAT, net of bad debt. */
  income: number;
  /** Work invoiced this month, excluding VAT. Drives profit, not cash. */
  invoiced: number;
  expenses: number;
  netFlow: number;
  cumulativeBalance: number;
  /** Net VAT handed to HMRC this month (negative = repayment received). */
  vatPaid: number;
  /** Self Assessment payment made this month. */
  taxPaid: number;
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
  /** Whether the business is VAT registered at all. */
  vatRegistered: boolean;
  vatQuarter: number;
  vatScheme: 'standard' | 'flat-rate';
  flatRatePercent: number; // e.g., 12.5
  badDebtPercent: number; // % of income assumed uncollected
  cardFeesPercent: number; // % of income lost to card fees
  monthlyLoanRepayments: number; // fixed monthly loan payment
  /**
   * Last completed tax year's income tax + Class 4 NI. Drives the 31 January
   * and 31 July payments on account.
   */
  priorYearTaxAndNI: number;
}

export interface FinancialMetrics {
  /** Cash received across the 12 months. */
  totalIncome: number;
  /** Work invoiced across the 12 months, excluding VAT. */
  totalInvoiced: number;
  totalExpenses: number;
  /** Accruals profit: invoiced less costs. NOT the same as cash generated. */
  netProfit: number;
  /** Closing cash less opening cash. */
  netCashFlow: number;
  avgMonthlyIncome: number;
  avgMonthlyExpenses: number;
  minBalance: number;
  maxBalance: number;
  cashRunway: number;
  profitMargin: number;
  breakEvenMonth: number;
  /** Invoiced but still unpaid at the end of the 12 months. */
  closingDebtors: number;
  /** Estimated income tax + NI on the projected profit. */
  estimatedTaxAndNI: number;
}

/**
 * Spread a month-by-month invoiced series into the months the cash actually
 * arrives, given payment terms in days.
 *
 * Invoices are assumed to be raised evenly through the month, so terms of `d`
 * days move d/30.4375 of a month forward: the whole-month part shifts the
 * receipt outright and the fractional part splits it across two months.
 *
 * OPENING DEBTOR BOOK. A trading business starts the year already owed money
 * for work done before it, so with `seedOpeningDebtors` the months before the
 * horizon are assumed to have invoiced at the projection's MEAN monthly rate.
 * Without that, anyone on 30-day terms would open on a fictitious cash cliff
 * and be told they were insolvent in month 1. The mean is used rather than
 * month 1's figure so a single spike month cannot invent a quarter's revenue.
 *
 * Invoicing that lands beyond the horizon is returned as closing debtors.
 */
export function applyPaymentLag(
  invoiced: number[],
  lagDays: number,
  { seedOpeningDebtors = true }: { seedOpeningDebtors?: boolean } = {}
): { received: number[]; closingDebtors: number } {
  const months = invoiced.length;
  const received = new Array<number>(months).fill(0);
  if (months === 0) return { received, closingDebtors: 0 };

  const shift = Math.max(0, Number.isFinite(lagDays) ? lagDays : 0) / AVG_MONTH_DAYS;
  const whole = Math.floor(shift);
  const frac = shift - whole;
  const meanMonthly = invoiced.reduce((a, b) => a + b, 0) / months;
  let closingDebtors = 0;

  const from = seedOpeningDebtors ? -(whole + 1) : 0;
  for (let m = from; m < months; m++) {
    const amount = m < 0 ? meanMonthly : invoiced[m];
    if (!amount) continue;
    const parts: [number, number][] = [
      [m + whole, amount * (1 - frac)],
      [m + whole + 1, amount * frac],
    ];
    for (const [target, value] of parts) {
      if (value === 0) continue;
      if (target >= 0 && target < months) received[target] += value;
      // Only work invoiced INSIDE the horizon counts as a closing debtor.
      else if (target >= months && m >= 0) closingDebtors += value;
    }
  }

  return { received, closingDebtors };
}

const defaultScenarios: Scenario[] = [
  {
    id: 'pessimistic',
    name: 'Conservative',
    multiplier: 0.8,
    description: 'Cautious outlook with reduced income',
  },
  {
    id: 'realistic',
    name: 'Realistic',
    multiplier: 1.0,
    description: 'Expected business performance',
  },
  { id: 'optimistic', name: 'Optimistic', multiplier: 1.2, description: 'Strong growth scenario' },
];

const defaultIncomeStreams: IncomeStream[] = [
  {
    id: 'regular-contracts',
    name: 'Regular Contracts',
    amount: 6000,
    frequency: 'monthly',
    paymentDelayDays: 14,
    growth: 0.05,
  },
  {
    id: 'seasonal-work',
    name: 'Seasonal Work',
    amount: 2000,
    frequency: 'seasonal',
    seasonalMultiplier: [0.6, 0.7, 0.9, 1.1, 1.3, 1.5, 1.6, 1.4, 1.2, 1.0, 0.8, 0.7],
    paymentDelayDays: 21,
    growth: 0.03,
  },
];

const defaultExpenseCategories: ExpenseCategory[] = [
  {
    id: 'materials',
    name: 'Materials & Supplies',
    amount: 2000,
    frequency: 'monthly',
    variable: true,
    growth: 0.03,
  },
  {
    id: 'labour',
    name: 'Labour Costs',
    amount: 1500,
    frequency: 'monthly',
    variable: true,
    growth: 0.04,
  },
  {
    id: 'overheads',
    name: 'Overheads',
    amount: 800,
    frequency: 'monthly',
    variable: false,
    growth: 0.02,
  },
  {
    id: 'insurance',
    name: 'Insurance',
    amount: 1200,
    frequency: 'annual',
    timing: 3,
    variable: false,
    growth: 0.05,
    vatable: false, // insurance is exempt — no input VAT to reclaim
  },
  {
    id: 'equipment',
    name: 'Equipment',
    amount: 2000,
    frequency: 'quarterly',
    timing: 6,
    variable: false,
    growth: 0.02,
  },
];

/**
 * Build the 12-month projection from a settled state object.
 *
 * Pure and exported so the VAT, payment-terms and Self Assessment scheduling
 * can be asserted directly (scripts/check-business-planning.mjs) instead of
 * only ever running inside a component.
 */
export function buildCashFlowProjection(state: CashFlowState): {
  months: MonthlyProjection[];
  closingDebtors: number;
} {
    const scenario =
      state.scenarios.find((s) => s.id === state.selectedScenario) || state.scenarios[1];
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const MONTHS = 12;
    const rates = ratesFor(CURRENT_TAX_YEAR);
    const vatRate = rates.vatStandardRate;

    /**
     * Growth compounds. The old model used `amount * (1 + growth * m/12)`,
     * which pro-rated growth linearly and therefore never delivered the full
     * annual uplift within the year (December got 11/12 of it).
     */
    const grown = (base: number, growth: number, monthIndex: number) =>
      base * Math.pow(1 + growth, monthIndex / 12);

    // ── Pass 1: what gets INVOICED each month (excluding VAT) ──────────────
    const invoicedByMonth = new Array<number>(MONTHS).fill(0);
    const receiptsByStream: { name: string; received: number[] }[] = [];
    let closingDebtors = 0;

    state.incomeStreams.forEach((stream) => {
      const series = new Array<number>(MONTHS).fill(0);
      for (let monthIndex = 0; monthIndex < MONTHS; monthIndex++) {
        const month = monthIndex + 1;
        let amount = 0;

        if (stream.frequency === 'monthly') {
          amount = grown(stream.amount, stream.growth, monthIndex);
        } else if (stream.frequency === 'seasonal') {
          // A short or missing multiplier array used to yield undefined here
          // and poison the whole projection with NaN.
          const multiplier = stream.seasonalMultiplier?.[monthIndex];
          amount = grown(stream.amount, stream.growth, monthIndex) * (multiplier ?? 1);
        } else if (stream.frequency === 'quarterly' && month % 3 === 1) {
          // `amount` is the sum invoiced in that quarter. The old code
          // multiplied it by 3, tripling every quarterly income stream —
          // and inconsistently, since quarterly EXPENSES were never scaled.
          amount = grown(stream.amount, stream.growth, monthIndex);
        }

        series[monthIndex] = amount * scenario.multiplier;
        invoicedByMonth[monthIndex] += series[monthIndex];
      }

      // Payment terms were captured in the UI ("Payment Delay, days") and then
      // thrown away — every invoice was treated as paid the instant it was
      // raised, which is precisely what a cash flow planner exists to model.
      const lagged = applyPaymentLag(series, stream.paymentDelayDays);
      closingDebtors += lagged.closingDebtors;
      receiptsByStream.push({ name: stream.name, received: lagged.received });
    });

    // ── Pass 2: expenses (excluding VAT) ───────────────────────────────────
    const expenseNetByMonth = new Array<number>(MONTHS).fill(0);
    const recoverableInputVatByMonth = new Array<number>(MONTHS).fill(0);
    const expenseBreakdowns: { [key: string]: number }[] = Array.from(
      { length: MONTHS },
      () => ({})
    );

    state.expenseCategories.forEach((category) => {
      const timing = category.timing || 1;
      for (let monthIndex = 0; monthIndex < MONTHS; monthIndex++) {
        const month = monthIndex + 1;
        let amount = 0;

        if (category.frequency === 'monthly') {
          amount = grown(category.amount, category.growth, monthIndex);
        } else if (category.frequency === 'quarterly') {
          // Was `month % 3 === timing`. Since month % 3 is only ever 0, 1 or 2,
          // any timing of 3 or more (e.g. the default Equipment cost at
          // timing 6, or anything a user typed as a real calendar month)
          // NEVER fired and the expense silently vanished from the forecast.
          if ((((month - timing) % 3) + 3) % 3 === 0) {
            amount = grown(category.amount, category.growth, monthIndex);
          }
        } else if (category.frequency === 'annual' && month === timing) {
          amount = grown(category.amount, category.growth, monthIndex);
        }

        if (category.variable) amount *= scenario.multiplier;
        if (!amount) continue;

        expenseNetByMonth[monthIndex] += amount;
        expenseBreakdowns[monthIndex][category.name] =
          (expenseBreakdowns[monthIndex][category.name] || 0) + amount;

        if (state.vatRegistered && category.vatable !== false) {
          recoverableInputVatByMonth[monthIndex] += amount * vatRate;
        }
      }
    });

    // ── Pass 3: VAT control account ────────────────────────────────────────
    // Output VAT arises on the tax point (invoice date), not on receipt.
    const vatPaidByMonth = new Array<number>(MONTHS).fill(0);
    if (state.vatRegistered) {
      for (let monthIndex = 0; monthIndex < MONTHS; monthIndex++) {
        const month = monthIndex + 1;
        // Quarter ends in the months matching the selected VAT stagger.
        if (month % 3 !== state.vatQuarter % 3) continue;

        let liability = 0;
        for (let q = monthIndex - 2; q <= monthIndex; q++) {
          if (q < 0) continue;
          if (state.vatScheme === 'flat-rate') {
            // Flat rate applies to VAT-INCLUSIVE turnover (gov.uk), and there
            // is no input VAT recovery. The old code applied the flat rate to
            // net turnover, understating the bill by a fifth.
            liability += invoicedByMonth[q] * (1 + vatRate) * (state.flatRatePercent / 100);
          } else {
            liability += invoicedByMonth[q] * vatRate - recoverableInputVatByMonth[q];
          }
        }

        // Payable one calendar month and 7 days after the quarter end. The old
        // model took the payment in the quarter-end month itself, and sized it
        // as that single month's income x 3 — badly wrong for seasonal trades.
        const payMonthIndex = monthIndex + VAT_PAYMENT_LAG_MONTHS;
        if (payMonthIndex < MONTHS) vatPaidByMonth[payMonthIndex] += liability;
      }
    }

    // ── Pass 4: Self Assessment payments on account ────────────────────────
    // 31 January and 31 July, each half of the prior year's bill. These are
    // the two dates that sink sole traders and the model had neither.
    const taxPaidByMonth = new Array<number>(MONTHS).fill(0);
    const priorYear = Math.max(0, state.priorYearTaxAndNI);
    if (priorYear >= POA_THRESHOLD) {
      taxPaidByMonth[SA_JANUARY_MONTH - 1] += priorYear / 2;
      taxPaidByMonth[SA_JULY_MONTH - 1] += priorYear / 2;
    }

    // ── Pass 5: assemble the months and run the balance forward ────────────
    let cumulativeBalance = state.startingBalance;

    const months = Array.from({ length: MONTHS }, (_, monthIndex): MonthlyProjection => {
      const month = monthIndex + 1;
      const incomeBreakdown: { [key: string]: number } = {};
      const expenseBreakdown: { [key: string]: number } = { ...expenseBreakdowns[monthIndex] };

      // Receipts, grossed up for VAT charged to customers when registered.
      const vatUplift = state.vatRegistered ? 1 + vatRate : 1;
      let grossReceipts = 0;
      receiptsByStream.forEach(({ name, received }) => {
        const value = received[monthIndex] * vatUplift;
        incomeBreakdown[name] = value;
        grossReceipts += value;
      });

      // Bad debt is money that never arrives, so it reduces RECEIPTS. Booking
      // it as an expense left the balance right but inflated turnover, total
      // expenses and the profit margin.
      const badDebt = grossReceipts * (Math.max(0, state.badDebtPercent) / 100);
      const receipts = grossReceipts - badDebt;

      let totalExpenses = expenseNetByMonth[monthIndex];
      // VATable costs are paid gross; the VAT comes back via the VAT return.
      if (state.vatRegistered) totalExpenses += recoverableInputVatByMonth[monthIndex];

      // Card fees are charged on the gross amount actually collected.
      const cardFees = receipts * (Math.max(0, state.cardFeesPercent) / 100);
      if (cardFees > 0) {
        expenseBreakdown['Card Fees'] = cardFees;
        totalExpenses += cardFees;
      }

      if (state.monthlyLoanRepayments > 0) {
        expenseBreakdown['Loan Repayment'] = state.monthlyLoanRepayments;
        totalExpenses += state.monthlyLoanRepayments;
      }

      const vatPaid = vatPaidByMonth[monthIndex];
      if (vatPaid !== 0) {
        expenseBreakdown['VAT Payment'] = vatPaid;
        totalExpenses += vatPaid;
      }

      const taxPaid = taxPaidByMonth[monthIndex];
      if (taxPaid !== 0) {
        expenseBreakdown['Tax Payment on Account'] = taxPaid;
        totalExpenses += taxPaid;
      }

      const netFlow = receipts - totalExpenses;
      cumulativeBalance += netFlow;

      return {
        month,
        monthName: monthNames[monthIndex],
        income: receipts,
        invoiced: invoicedByMonth[monthIndex],
        expenses: totalExpenses,
        netFlow,
        cumulativeBalance,
        vatPaid,
        taxPaid,
        incomeBreakdown,
        expenseBreakdown,
      };
    });

    return { months, closingDebtors };
}

export const useCashFlow = () => {
  const [state, setState] = useState<CashFlowState>({
    incomeStreams: [],
    expenseCategories: [],
    startingBalance: 5000,
    scenarios: defaultScenarios,
    selectedScenario: 'realistic',
    emergencyFundTarget: 18000,
    // Defaults to NOT registered: the threshold is £90,000 and most sole
    // traders sit under it. The old model charged VAT unconditionally.
    vatRegistered: false,
    vatQuarter: 3,
    vatScheme: 'standard',
    flatRatePercent: 12.5,
    badDebtPercent: 0,
    cardFeesPercent: 1.5,
    monthlyLoanRepayments: 0,
    priorYearTaxAndNI: 0,
  });

  const loadTemplate = useCallback(
    (
      incomeStreams: Omit<IncomeStream, 'id'>[],
      expenseCategories: Omit<ExpenseCategory, 'id'>[]
    ) => {
      setState((prev) => ({
        ...prev,
        incomeStreams: incomeStreams.map((stream, idx) => ({
          ...stream,
          id: `income-${Date.now()}-${idx}`,
        })),
        expenseCategories: expenseCategories.map((cat, idx) => ({
          ...cat,
          id: `expense-${Date.now()}-${idx}`,
        })),
      }));
    },
    []
  );

  const updateIncomeStream = useCallback((id: string, updates: Partial<IncomeStream>) => {
    setState((prev) => ({
      ...prev,
      incomeStreams: prev.incomeStreams.map((stream) =>
        stream.id === id ? { ...stream, ...updates } : stream
      ),
    }));
  }, []);

  const addIncomeStream = useCallback((stream: Omit<IncomeStream, 'id'>) => {
    setState((prev) => ({
      ...prev,
      incomeStreams: [...prev.incomeStreams, { ...stream, id: Date.now().toString() }],
    }));
  }, []);

  const removeIncomeStream = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      incomeStreams: prev.incomeStreams.filter((stream) => stream.id !== id),
    }));
  }, []);

  const updateExpenseCategory = useCallback((id: string, updates: Partial<ExpenseCategory>) => {
    setState((prev) => ({
      ...prev,
      expenseCategories: prev.expenseCategories.map((category) =>
        category.id === id ? { ...category, ...updates } : category
      ),
    }));
  }, []);

  const addExpenseCategory = useCallback((category: Omit<ExpenseCategory, 'id'>) => {
    setState((prev) => ({
      ...prev,
      expenseCategories: [...prev.expenseCategories, { ...category, id: Date.now().toString() }],
    }));
  }, []);

  const removeExpenseCategory = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      expenseCategories: prev.expenseCategories.filter((category) => category.id !== id),
    }));
  }, []);

  const updateSettings = useCallback(
    (
      updates: Partial<
        Pick<
          CashFlowState,
          | 'startingBalance'
          | 'selectedScenario'
          | 'emergencyFundTarget'
          | 'vatRegistered'
          | 'vatQuarter'
          | 'vatScheme'
          | 'flatRatePercent'
          | 'badDebtPercent'
          | 'cardFeesPercent'
          | 'monthlyLoanRepayments'
          | 'priorYearTaxAndNI'
        >
      >
    ) => {
      setState((prev) => ({ ...prev, ...updates }));
    },
    []
  );


  const projectionModel = useMemo(() => buildCashFlowProjection(state), [state]);
  const monthlyProjections = projectionModel.months;

  const insights = useMemo(() => {
    const insights = [];
    const minBalance = Math.min(...monthlyProjections.map((p) => p.cumulativeBalance));
    const totalIncome = monthlyProjections.reduce((sum, p) => sum + p.income, 0);
    const totalExpenses = monthlyProjections.reduce((sum, p) => sum + p.expenses, 0);
    const netAnnual = totalIncome - totalExpenses;

    // Cash flow warnings
    const negativeMonths = monthlyProjections.filter((p) => p.cumulativeBalance < 0);
    if (negativeMonths.length > 0) {
      insights.push({
        type: 'warning' as const,
        title: 'Negative Cash Flow Alert',
        message: `Cash flow goes negative in ${negativeMonths.length} month(s). Consider increasing credit facilities or adjusting payment terms.`,
        priority: 'high' as const,
      });
    }

    // Emergency fund analysis
    if (minBalance < state.emergencyFundTarget) {
      insights.push({
        type: 'warning' as const,
        title: 'Emergency Fund Shortfall',
        message: `Minimum balance (£${minBalance.toFixed(0)}) falls below emergency fund target (£${state.emergencyFundTarget.toFixed(0)}).`,
        priority: 'medium' as const,
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
      priority: 'low' as const,
    });

    // Profitability
    if (netAnnual > 0) {
      insights.push({
        type: 'success' as const,
        title: 'Positive Annual Cash Flow',
        message: `Projected net cash generated: £${netAnnual.toFixed(0)} on the selected scenario.`,
        priority: 'low' as const,
      });
    }

    // VAT registration threshold — the model used to charge VAT regardless of
    // turnover, and never mentioned the threshold at all.
    const rates = ratesFor(CURRENT_TAX_YEAR);
    const totalInvoiced = monthlyProjections.reduce((sum, p) => sum + p.invoiced, 0);
    if (!state.vatRegistered && totalInvoiced > rates.vatRegistrationThreshold) {
      insights.push({
        type: 'warning' as const,
        title: 'VAT Registration Threshold Crossed',
        message: `Projected turnover of £${totalInvoiced.toFixed(0)} exceeds the £${rates.vatRegistrationThreshold.toLocaleString('en-GB')} VAT registration threshold. Registration is compulsory once you cross it on a rolling 12-month basis.`,
        priority: 'high' as const,
      });
    }

    // Self Assessment — no payments on account modelled means the January
    // cliff is invisible.
    if (state.priorYearTaxAndNI < POA_THRESHOLD) {
      insights.push({
        type: 'info' as const,
        title: 'Self Assessment Not Modelled',
        message:
          'Enter last year\'s tax and NI bill in Settings to schedule the 31 January and 31 July payments on account. Without them this forecast shows more cash than you will have.',
        priority: 'medium' as const,
      });
    } else {
      insights.push({
        type: 'info' as const,
        title: 'Payments on Account Scheduled',
        message: `£${(state.priorYearTaxAndNI / 2).toFixed(0)} falls due on 31 January and again on 31 July, each half of last year's bill. A balancing payment for the current year follows next 31 January.`,
        priority: 'medium' as const,
      });
    }

    // Debtors left outstanding at the end of the horizon.
    const closing = projectionModel.closingDebtors;
    if (closing > 0) {
      insights.push({
        type: 'info' as const,
        title: 'Outstanding Debtors',
        message: `£${closing.toFixed(0)} of work invoiced in this period is still unpaid at month 12 because of your payment terms.`,
        priority: 'low' as const,
      });
    }

    return insights.sort((a, b) => {
      const priority = { high: 3, medium: 2, low: 1 };
      return priority[b.priority] - priority[a.priority];
    });
  }, [
    monthlyProjections,
    projectionModel.closingDebtors,
    state.emergencyFundTarget,
    state.vatRegistered,
    state.priorYearTaxAndNI,
  ]);

  const financialMetrics = useMemo((): FinancialMetrics => {
    const totalIncome = monthlyProjections.reduce((sum, p) => sum + p.income, 0);
    const totalInvoiced = monthlyProjections.reduce((sum, p) => sum + p.invoiced, 0);
    const totalExpenses = monthlyProjections.reduce((sum, p) => sum + p.expenses, 0);
    const totalVat = monthlyProjections.reduce((sum, p) => sum + p.vatPaid, 0);
    const totalTax = monthlyProjections.reduce((sum, p) => sum + p.taxPaid, 0);
    const avgMonthlyIncome = totalIncome / 12;
    const avgMonthlyExpenses = totalExpenses / 12;
    const minBalance = Math.min(...monthlyProjections.map((p) => p.cumulativeBalance));
    const maxBalance = Math.max(...monthlyProjections.map((p) => p.cumulativeBalance));
    const closingBalance = monthlyProjections[monthlyProjections.length - 1].cumulativeBalance;

    const cashRunway =
      avgMonthlyExpenses > 0 && minBalance > 0 ? Math.floor(minBalance / avgMonthlyExpenses) : 0;

    // Profit is an ACCRUALS figure: work invoiced less the cost of doing it.
    // VAT is a pass-through, not a cost, and tax paid on account is an
    // appropriation of profit rather than an expense — including either in
    // "profit" (as the old cash-based figure did) overstates how badly the
    // business is doing. Loan repayments are cash but only the interest is a
    // cost, so they are excluded here too.
    const operatingCosts = totalExpenses - totalVat - totalTax;
    const netProfit = totalInvoiced - operatingCosts;

    // "Break even" is the month the business has generated more cash than it
    // has consumed — not the month the balance happens to be positive, which
    // the old code reported and which is simply month 1 for anyone who starts
    // with money in the bank.
    let runningNetFlow = 0;
    let breakEvenMonth = 0;
    for (const p of monthlyProjections) {
      runningNetFlow += p.netFlow;
      if (runningNetFlow > 0) {
        breakEvenMonth = p.month;
        break;
      }
    }

    return {
      totalIncome,
      totalInvoiced,
      totalExpenses,
      netProfit,
      netCashFlow: closingBalance - state.startingBalance,
      avgMonthlyIncome,
      avgMonthlyExpenses,
      minBalance,
      maxBalance,
      cashRunway,
      profitMargin: totalInvoiced > 0 ? (netProfit / totalInvoiced) * 100 : 0,
      breakEvenMonth,
      closingDebtors: projectionModel.closingDebtors,
      estimatedTaxAndNI: calculateSelfEmployedTax({ profit: netProfit }).totalTaxAndNI,
    };
  }, [monthlyProjections, projectionModel.closingDebtors, state.startingBalance]);

  const exportToCSV = useCallback(() => {
    const headers = [
      'Month',
      'Invoiced (ex VAT)',
      'Cash Received',
      'Expenses',
      'VAT Paid',
      'Tax Paid',
      'Net Flow',
      'Cumulative Balance',
    ];
    const rows = monthlyProjections.map((p) => [
      p.monthName,
      p.invoiced.toFixed(2),
      p.income.toFixed(2),
      p.expenses.toFixed(2),
      p.vatPaid.toFixed(2),
      p.taxPaid.toFixed(2),
      p.netFlow.toFixed(2),
      p.cumulativeBalance.toFixed(2),
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cash-flow-projection-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [monthlyProjections]);

  const copySummaryToClipboard = useCallback(() => {
    const summary = `Cash Flow Summary
Annual Profit: £${financialMetrics.netProfit.toFixed(0)}
Lowest Balance: £${financialMetrics.minBalance.toFixed(0)}
Cash Runway: ${financialMetrics.cashRunway} months
Profit Margin: ${financialMetrics.profitMargin.toFixed(1)}%

Monthly Breakdown:
${monthlyProjections
  .map(
    (p) =>
      `${p.monthName}: Income £${p.income.toFixed(0)}, Expenses £${p.expenses.toFixed(0)}, Balance £${p.cumulativeBalance.toFixed(0)}`
  )
  .join('\n')}`;

    copyToClipboard(summary);
  }, [monthlyProjections, financialMetrics]);

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
    updateSettings,
    loadTemplate,
    exportToCSV,
    copySummaryToClipboard,
  };
};
