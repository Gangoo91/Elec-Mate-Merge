/**
 * Expense tools — create_expense, log_mileage, sync_expense_to_accounting
 * Maps to: Supabase `sole_trader_expenses` table + accounting sync edge function
 */

import type { UserContext } from '../auth.js';

import { callEdgeFunction } from '../lib/edge-function.js';

/** HMRC approved mileage rate (2024/25): 45p per mile for first 10,000 miles */
const HMRC_MILEAGE_RATE = 0.45;

export async function createExpense(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.amount !== 'number' || args.amount <= 0) {
    throw new Error('Expense amount must be a positive number');
  }
  if (typeof args.category !== 'string') {
    throw new Error('Expense category is required');
  }
  if (typeof args.description !== 'string' || args.description.trim().length === 0) {
    throw new Error('Expense description is required');
  }
  if (typeof args.date !== 'string') {
    throw new Error('Expense date is required');
  }

  const supabase = user.supabase;

  const { data, error } = await supabase
    .from('sole_trader_expenses')
    .insert({
      user_id: user.userId,
      amount: Math.round(args.amount * 100) / 100,
      category: args.category,
      description: args.description.trim(),
      vendor: typeof args.vendor === 'string' ? args.vendor.trim() : null,
      date: args.date,
      receipt_url: typeof args.receipt_url === 'string' ? args.receipt_url : null,
      tax_deductible: true,
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to create expense: ${error.message}`);

  return { expense_id: data.id, status: 'logged' };
}

export async function logMileage(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.from_address !== 'string' || args.from_address.trim().length === 0) {
    throw new Error('from_address is required');
  }
  if (typeof args.to_address !== 'string' || args.to_address.trim().length === 0) {
    throw new Error('to_address is required');
  }
  if (typeof args.miles !== 'number' || args.miles <= 0) {
    throw new Error('Miles must be a positive number');
  }
  if (typeof args.date !== 'string') {
    throw new Error('Date is required');
  }

  const supabase = user.supabase;
  const ratePerMile =
    typeof args.rate_per_mile === 'number' && args.rate_per_mile > 0
      ? args.rate_per_mile
      : HMRC_MILEAGE_RATE;
  const miles = args.miles;
  const amount = Math.round(miles * ratePerMile * 100) / 100;

  const fromAddress = args.from_address.trim();
  const toAddress = args.to_address.trim();

  const { data, error } = await supabase
    .from('sole_trader_expenses')
    .insert({
      user_id: user.userId,
      amount,
      category: 'mileage',
      description: `Mileage: ${fromAddress} → ${toAddress} (${miles} miles @ £${ratePerMile.toFixed(2)}/mile)`,
      date: args.date,
      mileage_miles: miles,
      mileage_rate: ratePerMile,
      mileage_from: fromAddress,
      mileage_to: toAddress,
      tax_deductible: true,
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to log mileage: ${error.message}`);

  return { expense_id: data.id, amount, miles };
}

export async function addReceiptToExpense(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.photo_analysis_id !== 'string') {
    throw new Error('photo_analysis_id is required — analyse a receipt photo first');
  }

  const supabase = user.supabase;

  // Fetch the photo analysis
  const { data: analysis, error: fetchError } = await supabase
    .from('photo_analyses')
    .select('id, analysis_type, analysis_result, image_url')
    .eq('id', args.photo_analysis_id)
    .eq('user_id', user.userId)
    .single();

  if (fetchError || !analysis) {
    throw new Error('Photo analysis not found — run analyse_photo on the receipt image first');
  }

  if (analysis.analysis_type !== 'receipt') {
    throw new Error(
      `This photo was analysed as "${analysis.analysis_type}", not a receipt. Re-analyse with context indicating it is a receipt.`
    );
  }

  const result = analysis.analysis_result as Record<string, unknown> | null;
  if (!result) {
    throw new Error(
      'Photo analysis has no structured result — the receipt may not have been readable'
    );
  }

  const supplier = (result.supplier as string) || 'Unknown supplier';
  const total = typeof result.total === 'number' ? result.total : 0;
  const category = (result.category as string) || 'materials';
  const receiptDate = (result.date as string) || new Date().toISOString().split('T')[0];
  const items = Array.isArray(result.items) ? result.items : [];

  if (total <= 0 && items.length === 0) {
    throw new Error('Could not extract any amounts from the receipt. Try a clearer photo.');
  }

  // Build description from extracted items
  const itemDescriptions = items
    .map((item: Record<string, unknown>) => {
      const desc = item.description || 'Item';
      const qty = typeof item.quantity === 'number' ? item.quantity : 1;
      const price = typeof item.unit_price === 'number' ? `£${item.unit_price.toFixed(2)}` : '';
      return `${qty}x ${desc}${price ? ` @ ${price}` : ''}`;
    })
    .join(', ');

  const description = itemDescriptions
    ? `Receipt from ${supplier}: ${itemDescriptions}`
    : `Receipt from ${supplier}`;

  const amount =
    total > 0
      ? total
      : items.reduce((sum: number, item: Record<string, unknown>) => {
          const qty = typeof item.quantity === 'number' ? item.quantity : 1;
          const price = typeof item.unit_price === 'number' ? item.unit_price : 0;
          return sum + qty * price;
        }, 0);

  const { data, error } = await supabase
    .from('sole_trader_expenses')
    .insert({
      user_id: user.userId,
      amount: Math.round(amount * 100) / 100,
      category,
      description,
      vendor: supplier,
      date: receiptDate,
      receipt_url: analysis.image_url || null,
      tax_deductible: true,
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to create expense from receipt: ${error.message}`);

  return {
    expense_id: data.id,
    supplier,
    amount: Math.round(amount * 100) / 100,
    category,
    date: receiptDate,
    items_extracted: items.length,
    status: 'logged',
  };
}

export async function syncExpenseToAccounting(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.expense_id !== 'string') {
    throw new Error('expense_id is required');
  }

  const result = await callEdgeFunction('accounting-sync-expense', user.jwt, {
    expense_id: args.expense_id,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}
