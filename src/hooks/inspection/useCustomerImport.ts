import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export interface ImportCustomer {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

export interface ImportResult {
  successCount: number;
  errorCount: number;
  errors: Array<{ row: ImportCustomer; error: string }>;
}

export const useCustomerImport = () => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  // Parse CSV file
  const parseCSV = (file: File): Promise<ImportCustomer[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data as ImportCustomer[]),
        error: (error) => reject(error),
      });
    });
  };

  // Parse Excel file
  const parseExcel = (file: File): Promise<ImportCustomer[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet) as ImportCustomer[];
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(file);
    });
  };

  // Validate customer data
  const validateCustomer = (customer: ImportCustomer): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!customer.name || customer.name.trim() === '') {
      errors.push('Name is required');
    }
    
    if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      errors.push('Invalid email format');
    }
    
    if (customer.phone && customer.phone.length > 20) {
      errors.push('Phone number too long');
    }
    
    return { valid: errors.length === 0, errors };
  };

  // Import customers
  const importCustomers = async (file: File): Promise<ImportResult> => {
    setIsImporting(true);
    setImportProgress(0);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Parse file based on type
      let customers: ImportCustomer[];
      if (file.name.endsWith('.csv')) {
        customers = await parseCSV(file);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        customers = await parseExcel(file);
      } else {
        throw new Error('Unsupported file format. Please use CSV or Excel files.');
      }

      setImportProgress(30);

      // Validate all customers
      const validCustomers: ImportCustomer[] = [];
      const errors: Array<{ row: ImportCustomer; error: string }> = [];

      customers.forEach((customer) => {
        const validation = validateCustomer(customer);
        if (validation.valid) {
          validCustomers.push(customer);
        } else {
          errors.push({
            row: customer,
            error: validation.errors.join(', '),
          });
        }
      });

      setImportProgress(50);

      // Bulk insert using database function
      const { data, error } = await supabase.rpc('bulk_insert_customers', {
        p_user_id: user.id,
        p_customers: JSON.parse(JSON.stringify(validCustomers)),
      });

      if (error) throw error;

      setImportProgress(100);

      const dbErrors = Array.isArray(data[0].errors) 
        ? (data[0].errors as unknown as Array<{ row: ImportCustomer; error: string }>)
        : [];

      const result: ImportResult = {
        successCount: data[0].success_count,
        errorCount: data[0].error_count + errors.length,
        errors: [
          ...errors,
          ...dbErrors,
        ],
      };

      toast({
        title: 'Import complete',
        description: `Successfully imported ${result.successCount} customers${result.errorCount > 0 ? ` with ${result.errorCount} errors` : ''}.`,
      });

      return result;
    } catch (error) {
      toast({
        title: 'Import failed',
        description: error instanceof Error ? error.message : 'Failed to import customers',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsImporting(false);
      setImportProgress(0);
    }
  };

  return {
    importCustomers,
    isImporting,
    importProgress,
  };
};
