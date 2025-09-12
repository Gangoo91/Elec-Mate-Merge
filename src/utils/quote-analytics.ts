import { Quote } from "@/types/quote";

export interface FinancialBreakdown {
  totalRevenue: number;
  netRevenue: number;
  totalCosts: number;
  totalProfit: number;
  profitMargin: number;
  averageQuoteValue: number;
  materialsTotal: number;
  labourTotal: number;
  overheadTotal: number;
  vatTotal: number;
}

export const calculateFinancialBreakdown = (quotes: Quote[]): FinancialBreakdown => {
  const approvedQuotes = quotes.filter(q => q.status === 'approved');
  
  if (approvedQuotes.length === 0) {
    return {
      totalRevenue: 0,
      netRevenue: 0,
      totalCosts: 0,
      totalProfit: 0,
      profitMargin: 0,
      averageQuoteValue: 0,
      materialsTotal: 0,
      labourTotal: 0,
      overheadTotal: 0,
      vatTotal: 0
    };
  }

  const totals = approvedQuotes.reduce((acc, quote) => {
    // Calculate quoted material costs (including any markup)
    const materialsCost = quote.items.reduce((sum, item) => {
      return sum + (item.category === 'materials' ? item.quantity * item.unitPrice : 0);
    }, 0);
    
    // Labour is pure income for the electrician (overhead already included in hourly rates)
    const labourIncome = quote.items.reduce((sum, item) => {
      return sum + (item.category === 'labour' ? item.quantity * item.unitPrice : 0);
    }, 0);

    return {
      revenue: acc.revenue + quote.total,
      materials: acc.materials + materialsCost,
      labour: acc.labour + labourIncome,
      vat: acc.vat + quote.vatAmount,
      subtotal: acc.subtotal + quote.subtotal
    };
  }, {
    revenue: 0,
    materials: 0,
    labour: 0,
    vat: 0,
    subtotal: 0
  });

  // Simplified approach: Only material costs are actual expenses
  // Labour is income (overhead already built into hourly rates)
  const totalCosts = totals.materials;
  
  // Calculate net revenue (excluding VAT for VAT-registered businesses)
  const netRevenue = totals.revenue - totals.vat;
  
  // Profit calculation: Net revenue minus material costs
  // Labour is pure income, materials may include markup (5-20%) which becomes profit
  const revenueForProfit = totals.vat > 0 ? netRevenue : totals.revenue;
  const totalProfit = revenueForProfit - totalCosts;
  const profitMargin = revenueForProfit > 0 ? (totalProfit / revenueForProfit) * 100 : 0;

  return {
    totalRevenue: totals.revenue,
    netRevenue,
    totalCosts,
    totalProfit,
    profitMargin,
    averageQuoteValue: totals.revenue / approvedQuotes.length,
    materialsTotal: totals.materials,
    labourTotal: totals.labour,
    overheadTotal: 0, // Overhead is included in labour rates, not separate
    vatTotal: totals.vat
  };
};

export const filterQuotesByStatus = (quotes: Quote[], status: Quote['status']): Quote[] => {
  return quotes.filter(quote => quote.status === status);
};

export const getMonthlyQuotes = (quotes: Quote[]): Quote[] => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  return quotes.filter(quote => {
    const quoteDate = new Date(quote.createdAt);
    return quoteDate.getMonth() === currentMonth && quoteDate.getFullYear() === currentYear;
  });
};