import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Papa from 'papaparse';
// XLSX is dynamically imported only when needed to reduce bundle size (~7.2MB)

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

// Column name mappings for common trade management apps
// (Tradify, ServiceM8, Fergus, SimPRO, Jobber, Powered Now, Xero, generic)
const COLUMN_ALIASES: Record<keyof ImportCustomer | 'firstName' | 'lastName', string[]> = {
  name: [
    'name',
    'customer name',
    'company name',
    'company',
    'client name',
    'client',
    'contact name',
    'full name',
    'display name',
    'account name',
    'business name',
    'customer',
    'organisation',
    'organization',
  ],
  firstName: ['first name', 'firstname', 'given name', 'contact first name', 'forename'],
  lastName: ['last name', 'lastname', 'surname', 'family name', 'contact last name'],
  email: [
    'email',
    'email address',
    'e-mail',
    'contact email',
    'primary email',
    'customer email',
    'e mail',
  ],
  phone: [
    'phone',
    'phone number',
    'telephone',
    'tel',
    'mobile',
    'mobile number',
    'cell',
    'cell phone',
    'contact phone',
    'primary phone',
    'work phone',
    'home phone',
    'mobile phone',
  ],
  address: [
    'address',
    'physical address',
    'street address',
    'billing address',
    'postal address',
    'full address',
    'site address',
    'property address',
    'address line 1',
    'street',
    'location',
  ],
  notes: ['notes', 'comments', 'description', 'memo', 'additional info', 'customer notes', 'note'],
};

// Map raw parsed rows to ImportCustomer[] using fuzzy column matching
const mapColumns = (rawRows: Record<string, string>[]): ImportCustomer[] => {
  if (rawRows.length === 0) return [];

  const headers = Object.keys(rawRows[0]);
  const normalised = headers.map((h) => h.toLowerCase().trim());

  // Find best match for each target field
  const findColumn = (aliases: string[]): string | null => {
    for (const alias of aliases) {
      const idx = normalised.indexOf(alias);
      if (idx !== -1) return headers[idx];
    }
    return null;
  };

  const nameCol = findColumn(COLUMN_ALIASES.name);
  const firstNameCol = findColumn(COLUMN_ALIASES.firstName);
  const lastNameCol = findColumn(COLUMN_ALIASES.lastName);
  const emailCol = findColumn(COLUMN_ALIASES.email);
  const phoneCol = findColumn(COLUMN_ALIASES.phone);
  const addressCol = findColumn(COLUMN_ALIASES.address);
  const notesCol = findColumn(COLUMN_ALIASES.notes);

  return rawRows.map((row) => {
    // Build name: prefer full name column, fall back to first+last
    let name = nameCol ? (row[nameCol] || '').trim() : '';
    if (!name && (firstNameCol || lastNameCol)) {
      const first = firstNameCol ? (row[firstNameCol] || '').trim() : '';
      const last = lastNameCol ? (row[lastNameCol] || '').trim() : '';
      name = [first, last].filter(Boolean).join(' ');
    }

    return {
      name,
      email: emailCol ? (row[emailCol] || '').trim() || undefined : undefined,
      phone: phoneCol ? (row[phoneCol] || '').trim() || undefined : undefined,
      address: addressCol ? (row[addressCol] || '').trim() || undefined : undefined,
      notes: notesCol ? (row[notesCol] || '').trim() || undefined : undefined,
    };
  });
};

export const useCustomerImport = () => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  // Parse CSV file into raw rows
  const parseCSV = (file: File): Promise<Record<string, string>[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data as Record<string, string>[]),
        error: (error) => reject(error),
      });
    });
  };

  // Parse Excel file into raw rows (dynamically imports xlsx to reduce bundle size)
  const parseExcel = (file: File): Promise<Record<string, string>[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // Dynamic import XLSX only when needed (saves ~7.2MB from initial bundle)
          const XLSX = await import('xlsx');
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, { raw: false }) as Record<
            string,
            string
          >[];
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
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Parse file based on type, then map columns
      let rawRows: Record<string, string>[];
      if (file.name.endsWith('.csv')) {
        rawRows = await parseCSV(file);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        rawRows = await parseExcel(file);
      } else {
        throw new Error('Unsupported file format. Please use CSV or Excel files.');
      }

      const customers = mapColumns(rawRows);

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

      // Batch insert in chunks of 50 to avoid payload limits
      const CHUNK_SIZE = 50;
      let insertedCount = 0;
      const dbErrors: Array<{ row: ImportCustomer; error: string }> = [];

      for (let i = 0; i < validCustomers.length; i += CHUNK_SIZE) {
        const chunk = validCustomers.slice(i, i + CHUNK_SIZE);
        const rows = chunk.map((c) => ({
          user_id: user.id,
          name: c.name,
          email: c.email || null,
          phone: c.phone || null,
          address: c.address || null,
          notes: c.notes || null,
        }));

        const { data: inserted, error: insertError } = await supabase
          .from('customers')
          .insert(rows)
          .select('id');

        if (insertError) {
          // If batch fails, try one-by-one for this chunk
          for (const row of rows) {
            const { error: singleError } = await supabase.from('customers').insert(row);
            if (singleError) {
              dbErrors.push({
                row: {
                  name: row.name,
                  email: row.email || undefined,
                  phone: row.phone || undefined,
                  address: row.address || undefined,
                  notes: row.notes || undefined,
                },
                error: singleError.message,
              });
            } else {
              insertedCount++;
            }
          }
        } else {
          insertedCount += inserted?.length || chunk.length;
        }

        setImportProgress(50 + Math.round(((i + chunk.length) / validCustomers.length) * 50));
      }

      setImportProgress(100);

      const result: ImportResult = {
        successCount: insertedCount,
        errorCount: dbErrors.length + errors.length,
        errors: [...errors, ...dbErrors],
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
