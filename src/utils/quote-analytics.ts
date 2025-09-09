import { Quote } from "@/types/quote";

export interface FinancialBreakdown {
  totalRevenue: number;
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
  const completedQuotes = quotes.filter(q => q.status === 'completed');
  
  if (completedQuotes.length === 0) {
    return {
      totalRevenue: 0,
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

  const totals = completedQuotes.reduce((acc, quote) => {
    const materialsCost = quote.items.reduce((sum, item) => {
      return sum + (item.quantity * item.unitPrice);
    }, 0);
    
    const labourCost = quote.items.reduce((sum, item) => {
      return sum + ((item.hours || 0) * (item.hourlyRate || 0));
    }, 0);

    return {
      revenue: acc.revenue + quote.total,
      materials: acc.materials + materialsCost,
      labour: acc.labour + labourCost,
      overhead: acc.overhead + quote.overhead,
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

  const totalCosts = totals.materials + totals.labour + totals.overhead;
  const totalProfit = totals.revenue - totalCosts - totals.vat;
  const profitMargin = totals.revenue > 0 ? (totalProfit / totals.revenue) * 100 : 0;

  return {
    totalRevenue: totals.revenue,
    totalCosts,
    totalProfit,
    profitMargin,
    averageQuoteValue: totals.revenue / completedQuotes.length,
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