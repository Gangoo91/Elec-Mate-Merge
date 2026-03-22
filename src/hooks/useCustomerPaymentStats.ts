import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type ReliabilityLevel = 'good' | 'fair' | 'poor' | 'none';

interface InvoiceRow {
  id: string;
  invoice_number: string | null;
  total: number;
  invoice_status: string | null;
  invoice_date: string | null;
  invoice_due_date: string | null;
  invoice_paid_at: string | null;
}

export interface CustomerPaymentStats {
  totalInvoices: number;
  paidCount: number;
  paidOnTimeCount: number;
  paidLateCount: number;
  outstandingCount: number;
  averageDaysToPayment: number | null;
  onTimeRate: number | null;
  reliabilityLevel: ReliabilityLevel;
  recentInvoices: InvoiceRow[];
  isLoading: boolean;
}

export function useCustomerPaymentStats(customerId: string): CustomerPaymentStats {
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const { data, error } = await supabase
          .from('quotes')
          .select(
            'id, invoice_number, total, invoice_status, invoice_date, invoice_due_date, invoice_paid_at'
          )
          .eq('customer_id', customerId)
          .eq('invoice_raised', true)
          .order('invoice_date', { ascending: false });

        if (error) throw error;
        setInvoices((data as InvoiceRow[]) || []);
      } catch (error) {
        console.error('Failed to fetch customer invoices:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, [customerId]);

  return useMemo(() => {
    const totalInvoices = invoices.length;
    const paid = invoices.filter((i) => i.invoice_status === 'paid');
    const paidCount = paid.length;

    const paidOnTime = paid.filter((i) => {
      if (!i.invoice_paid_at || !i.invoice_due_date) return true;
      return new Date(i.invoice_paid_at) <= new Date(i.invoice_due_date);
    });
    const paidOnTimeCount = paidOnTime.length;
    const paidLateCount = paidCount - paidOnTimeCount;

    const outstandingCount = invoices.filter(
      (i) => i.invoice_status !== 'paid' && i.invoice_status !== 'cancelled'
    ).length;

    // Average days to payment
    let averageDaysToPayment: number | null = null;
    const daysArr = paid
      .filter((i) => i.invoice_paid_at && i.invoice_date)
      .map((i) => {
        const start = new Date(i.invoice_date!).getTime();
        const end = new Date(i.invoice_paid_at!).getTime();
        return Math.max(0, Math.round((end - start) / (1000 * 60 * 60 * 24)));
      });
    if (daysArr.length > 0) {
      averageDaysToPayment = Math.round(daysArr.reduce((a, b) => a + b, 0) / daysArr.length);
    }

    // On-time rate (only meaningful with 2+ paid invoices)
    const onTimeRate = paidCount >= 2 ? Math.round((paidOnTimeCount / paidCount) * 100) : null;

    let reliabilityLevel: ReliabilityLevel = 'none';
    if (onTimeRate !== null) {
      if (onTimeRate > 80) reliabilityLevel = 'good';
      else if (onTimeRate >= 50) reliabilityLevel = 'fair';
      else reliabilityLevel = 'poor';
    }

    return {
      totalInvoices,
      paidCount,
      paidOnTimeCount,
      paidLateCount,
      outstandingCount,
      averageDaysToPayment,
      onTimeRate,
      reliabilityLevel,
      recentInvoices: invoices.slice(0, 5),
      isLoading,
    };
  }, [invoices, isLoading]);
}
