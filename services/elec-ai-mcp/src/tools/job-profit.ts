/**
 * Job profit tool — calculate_job_profit
 * Multi-table aggregation to calculate project profitability.
 */

import type { UserContext } from '../auth.js';

export async function calculateJobProfit(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.job_id !== 'string') {
    throw new Error('job_id (project UUID) is required');
  }

  const supabase = user.supabase;
  const includeEstimates = args.include_estimates === true;

  // 1. Fetch project
  const { data: project, error: projError } = await supabase
    .from('spark_projects')
    .select('id, title, location, customer_id, estimated_value, start_date, completed_at, status, created_at')
    .eq('id', args.job_id)
    .single();

  if (projError || !project) {
    throw new Error('Project not found');
  }

  // 2. Fetch linked entities via spark_project_links
  const { data: links } = await supabase
    .from('spark_project_links')
    .select('entity_type, entity_id')
    .eq('project_id', args.job_id);

  const linkedInvoiceIds = (links || [])
    .filter((l: Record<string, unknown>) => l.entity_type === 'invoice')
    .map((l: Record<string, unknown>) => l.entity_id as string);

  const linkedQuoteIds = (links || [])
    .filter((l: Record<string, unknown>) => l.entity_type === 'quote')
    .map((l: Record<string, unknown>) => l.entity_id as string);

  // 3. Fetch invoices (linked + any via quote_id)
  let invoices: Array<Record<string, unknown>> = [];
  if (linkedInvoiceIds.length > 0) {
    const { data } = await supabase
      .from('invoices')
      .select('id, invoice_number, total, status, paid_at, created_at')
      .in('id', linkedInvoiceIds);
    invoices = data || [];
  }

  // Also fetch invoices linked via quotes
  if (linkedQuoteIds.length > 0) {
    const { data: quoteInvoices } = await supabase
      .from('invoices')
      .select('id, invoice_number, total, status, paid_at, created_at')
      .in('quote_id', linkedQuoteIds);

    if (quoteInvoices) {
      const existingIds = new Set(invoices.map((i) => i.id));
      for (const inv of quoteInvoices) {
        if (!existingIds.has(inv.id)) {
          invoices.push(inv);
        }
      }
    }
  }

  // 4. Calculate revenue
  const paidInvoices = invoices.filter((i) => i.status === 'paid');
  const pendingInvoices = invoices.filter((i) => i.status !== 'paid');
  const revenue = paidInvoices.reduce(
    (sum, i) => sum + (typeof i.total === 'number' ? i.total : 0),
    0
  );
  const pendingRevenue = pendingInvoices.reduce(
    (sum, i) => sum + (typeof i.total === 'number' ? i.total : 0),
    0
  );

  // 5. Fetch expenses — match by description/location overlap
  const projectTitle = (project.title as string) || '';
  const projectLocation = (project.location as string) || '';
  const projectStart = (project.start_date as string) || (project.created_at as string);
  const projectEnd = (project.completed_at as string) || new Date().toISOString();

  let expenseQuery = supabase
    .from('sole_trader_expenses')
    .select('id, amount, description, category, expense_date, vendor')
    .gte('expense_date', projectStart.split('T')[0])
    .lte('expense_date', projectEnd.split('T')[0]);

  const { data: candidateExpenses } = await expenseQuery;

  // Score each expense by relevance
  const matchedExpenses: Array<{
    id: string;
    amount: number;
    description: string;
    category: string;
    relevance_score: number;
  }> = [];

  for (const expense of candidateExpenses || []) {
    const desc = ((expense.description as string) || '').toLowerCase();
    const amount = typeof expense.amount === 'number' ? expense.amount : 0;

    let score = 0;

    // Description match against project title
    if (projectTitle) {
      const titleWords = projectTitle.toLowerCase().split(/\s+/).filter((w: string) => w.length > 3);
      const matchingWords = titleWords.filter((w: string) => desc.includes(w));
      if (matchingWords.length > 0) {
        score += 0.4 * (matchingWords.length / titleWords.length);
      }
    }

    // Location match
    if (projectLocation && desc.includes(projectLocation.toLowerCase().split(',')[0])) {
      score += 0.3;
    }

    // Date overlap bonus (expense falls within project dates)
    score += 0.2;

    // Category bonus for materials/tools
    const cat = (expense.category as string) || '';
    if (['materials', 'tools', 'fuel'].includes(cat)) {
      score += 0.1;
    }

    if (score > 0.5) {
      matchedExpenses.push({
        id: expense.id as string,
        amount,
        description: expense.description as string,
        category: cat,
        relevance_score: Math.round(score * 100) / 100,
      });
    }
  }

  const expensesTotal = matchedExpenses.reduce((sum, e) => sum + e.amount, 0);

  // 6. Materials cost from quote line items
  let materialsTotal = 0;
  if (linkedQuoteIds.length > 0) {
    const { data: quotes } = await supabase
      .from('quotes')
      .select('items')
      .in('id', linkedQuoteIds);

    for (const quote of quotes || []) {
      const items = Array.isArray(quote.items) ? quote.items : [];
      for (const item of items) {
        if (
          typeof item === 'object' &&
          item !== null &&
          (item as Record<string, unknown>).category === 'materials'
        ) {
          const qty =
            typeof (item as Record<string, unknown>).quantity === 'number'
              ? ((item as Record<string, unknown>).quantity as number)
              : 0;
          const price =
            typeof (item as Record<string, unknown>).unitPrice === 'number'
              ? ((item as Record<string, unknown>).unitPrice as number)
              : typeof (item as Record<string, unknown>).unit_price === 'number'
                ? ((item as Record<string, unknown>).unit_price as number)
                : 0;
          materialsTotal += qty * price;
        }
      }
    }
  }

  materialsTotal = Math.round(materialsTotal * 100) / 100;

  // 7. Gross profit calculation
  const grossProfit = Math.round((revenue - expensesTotal - materialsTotal) * 100) / 100;
  const marginPercentage = revenue > 0 ? Math.round((grossProfit / revenue) * 10000) / 100 : 0;

  // 8. Labour estimate from RAG (if requested)
  let estimatedLabourCost: number | undefined;
  const gaps: string[] = [];

  if (includeEstimates && projectTitle) {
    // We don't call RAG directly here — the agent can do that separately
    // Instead, flag that labour data is missing
    gaps.push('No timesheet data available — consider using lookup_practical_method to estimate labour costs');
  }

  if (invoices.length === 0) {
    gaps.push('No invoices linked — revenue is £0. Link invoices to this project for accurate profit.');
  }
  if (matchedExpenses.length === 0) {
    gaps.push('No matching expenses found — expenses may be £0 or not yet logged.');
  }

  return {
    project_id: project.id,
    title: project.title,
    status: project.status,
    revenue: Math.round(revenue * 100) / 100,
    expenses_total: Math.round(expensesTotal * 100) / 100,
    materials_total: materialsTotal,
    gross_profit: grossProfit,
    margin_percentage: marginPercentage,
    matched_expenses: matchedExpenses,
    gaps,
    revenue_breakdown: {
      invoiced: Math.round(revenue * 100) / 100,
      pending_invoices: Math.round(pendingRevenue * 100) / 100,
    },
    estimated_labour_cost: estimatedLabourCost,
    estimated_value: project.estimated_value,
  };
}
