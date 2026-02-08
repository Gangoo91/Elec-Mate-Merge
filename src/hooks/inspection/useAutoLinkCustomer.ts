/**
 * useAutoLinkCustomer - Auto-link/create CRM customers after certificate save
 *
 * If user selected an existing customer -> link via customer_id
 * If new client name entered -> findCustomerByName (avoid duplicates), then createCustomerFromCertificate
 * Calls linkCustomerToReport to set reports.customer_id
 */

import { useCallback } from 'react';
import {
  findCustomerByName,
  createCustomerFromCertificate,
  linkCustomerToReport,
} from '@/utils/customerHelper';

interface AutoLinkParams {
  /** The report_id (UUID) returned from createReport/updateReport */
  reportId: string;
  /** The authenticated user's ID */
  userId: string;
  /** The selectedCustomerId from formData (if user picked an existing CRM customer) */
  selectedCustomerId?: string;
  /** Client name from the certificate form */
  clientName?: string;
  /** Client email from the certificate form */
  clientEmail?: string;
  /** Client phone from the certificate form */
  clientPhone?: string;
  /** Client address from the certificate form */
  clientAddress?: string;
}

/**
 * Hook that returns an autoLinkCustomer function.
 * Call it after a successful cloud save to link/create the CRM customer.
 */
export const useAutoLinkCustomer = () => {
  const autoLinkCustomer = useCallback(async (params: AutoLinkParams) => {
    const { reportId, userId, selectedCustomerId, clientName, clientEmail, clientPhone, clientAddress } = params;

    if (!reportId || !userId) return;

    try {
      // Case 1: User already selected an existing CRM customer
      if (selectedCustomerId) {
        await linkCustomerToReport(reportId, selectedCustomerId);
        return;
      }

      // Case 2: New client - try to find/create in CRM
      if (!clientName?.trim()) return;

      // Check if a customer with this name already exists
      const existing = await findCustomerByName(userId, clientName);

      if (existing) {
        // Link the existing customer
        await linkCustomerToReport(reportId, existing.id);
      } else {
        // Create a new customer and link
        const result = await createCustomerFromCertificate(userId, {
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
          address: clientAddress,
        });

        if (result.id) {
          await linkCustomerToReport(reportId, result.id);
        }
      }
    } catch (error) {
      // Don't block save flow - just log the error
      console.error('[useAutoLinkCustomer] Failed to auto-link customer:', error);
    }
  }, []);

  return { autoLinkCustomer };
};
