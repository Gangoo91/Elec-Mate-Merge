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
      supplier: typeof args.supplier === 'string' ? args.supplier.trim() : null,
      date: args.date,
      receipt_photo_url: typeof args.receipt_photo_url === 'string' ? args.receipt_photo_url : null,
      job_id: typeof args.job_id === 'string' ? args.job_id : null,
      status: 'logged',
    })
    .select('id, status')
    .single();

  if (error) throw new Error(`Failed to create expense: ${error.message}`);

  return { expense_id: data.id, status: data.status };
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
      job_id: typeof args.job_id === 'string' ? args.job_id : null,
      metadata: {
        from_address: fromAddress,
        to_address: toAddress,
        miles,
        rate_per_mile: ratePerMile,
      },
      status: 'logged',
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to log mileage: ${error.message}`);

  return { expense_id: data.id, amount, miles };
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
