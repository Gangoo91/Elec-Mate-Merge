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
    const materialsCost = quote.items.reduce((sum, item) => {
      return sum + (item.category === 'materials' ? item.quantity * item.unitPrice : 0);
    }, 0);
    
    const labourIncome = quote.items.reduce((sum, item) => {
      return sum + (item.category === 'labour' ? item.quantity * item.unitPrice : 0);
    }, 0);

    // Calculate overhead from settings percentage applied to subtotal
    const calculatedOverhead = quote.subtotal * (quote.settings.overheadPercentage / 100);

    return {
      revenue: acc.revenue + quote.total,
      materials: acc.materials + materialsCost,
      labour: acc.labour + labourIncome,
      overhead: acc.overhead + calculatedOverhead,
      vat: acc.vat + quote.vatAmount,
      subtotal: acc.subtotal + quote.subtotal
    };
  }, {
    revenue: 0,
    materials: 0,
    labour: 0,
    overhead: 0,
    vat: 0,
    subtotal: 0
  });

  // Only materials and overhead are actual costs - labour is income for the electrician
  const totalCosts = totals.materials + totals.overhead;
  
  // Calculate net revenue (excluding VAT for VAT-registered businesses)
  const netRevenue = totals.revenue - totals.vat;
  
  // Profit calculation: Revenue minus actual costs
  // For VAT-registered: use net revenue, for non-VAT: use total revenue
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
    overheadTotal: totals.overhead,
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