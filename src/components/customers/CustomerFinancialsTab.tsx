import React from 'react';
import { Customer } from '@/hooks/inspection/useCustomers';
import { CustomerPaymentStatsCard } from './CustomerPaymentStatsCard';
import { CustomerQuotesCard } from './CustomerQuotesCard';
import { CustomerInvoicesCard } from './CustomerInvoicesCard';

interface CustomerFinancialsTabProps {
  customer: Customer;
}

/**
 * Financials tab — quotes, invoices and payment reliability in one place
 * (ELE-1292). These lived on the overview tab, which made it scroll forever;
 * money questions ("has this customer paid?", "what did I quote them?") are a
 * distinct job from reviewing work history.
 */
export const CustomerFinancialsTab = ({ customer }: CustomerFinancialsTabProps) => {
  return (
    <div className="space-y-4">
      <CustomerPaymentStatsCard customerId={customer.id} />
      <CustomerQuotesCard customerId={customer.id} customerName={customer.name} />
      <CustomerInvoicesCard customerId={customer.id} customerName={customer.name} />
    </div>
  );
};
