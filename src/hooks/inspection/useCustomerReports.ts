import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Report {
  id: string;
  certificate_number: string;
  report_type: string;
  status: string;
  created_at: string;
  inspection_date: string | null;
  client_name: string | null;
  installation_address: string | null;
  version?: number;
  is_latest_version?: boolean;
  parent_report_id?: string | null;
}

export const useCustomerReports = (customerId: string) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      if (!customerId) {
        setReports([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('reports')
          .select('id, certificate_number, report_type, status, created_at, inspection_date, client_name, installation_address, version, is_latest_version, parent_report_id')
          .eq('customer_id', customerId)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setReports(data || []);
      } catch (error) {
        console.error('Failed to load customer reports:', error);
        setReports([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadReports();
  }, [customerId]);

  return {
    reports,
    isLoading,
  };
};
