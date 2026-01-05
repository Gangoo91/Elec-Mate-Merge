import { supabase } from '@/integrations/supabase/client';

/**
 * Check if a customer with the given name already exists
 * Case-insensitive search
 */
export const findCustomerByName = async (
  userId: string,
  clientName: string
): Promise<{ id: string } | null> => {
  if (!clientName?.trim()) return null;

  const { data, error } = await supabase
    .from('customers')
    .select('id')
    .eq('user_id', userId)
    .ilike('name', clientName.trim())
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error finding customer:', error);
    return null;
  }

  return data;
};

/**
 * Create a new customer from certificate data
 */
export const createCustomerFromCertificate = async (
  userId: string,
  customerData: {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    notes?: string;
  }
): Promise<{ id: string; error?: any }> => {
  const { data, error } = await supabase
    .from('customers')
    .insert({
      user_id: userId,
      name: customerData.name.trim(),
      email: customerData.email?.trim() || null,
      phone: customerData.phone?.trim() || null,
      address: customerData.address?.trim() || null,
      notes: customerData.notes?.trim() || null,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating customer:', error);
    return { id: '', error };
  }

  return { id: data.id };
};

/**
 * Link a customer to a report
 */
export const linkCustomerToReport = async (
  reportId: string,
  customerId: string
): Promise<{ success: boolean; error?: any }> => {
  const { error } = await supabase
    .from('reports')
    .update({ customer_id: customerId })
    .eq('report_id', reportId)
    .is('deleted_at', null);

  if (error) {
    console.error('Error linking customer to report:', error);
    return { success: false, error };
  }

  return { success: true };
};

/**
 * Check if a report needs customer creation prompt
 * Returns true if:
 * - Has client_name
 * - Does NOT have customer_id
 * - User is authenticated
 */
export const shouldPromptCustomerCreation = async (
  reportId: string,
  userId: string,
  clientName?: string
): Promise<boolean> => {
  if (!reportId || !userId || !clientName?.trim()) {
    return false;
  }

  // Check if report already has a customer linked
  const { data, error } = await supabase
    .from('reports')
    .select('customer_id')
    .eq('report_id', reportId)
    .eq('user_id', userId)
    .maybeSingle();

  if (error || !data) {
    return false;
  }

  // Prompt if no customer is linked
  return !data.customer_id;
};
