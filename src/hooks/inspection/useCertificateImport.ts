import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

interface CertificateImportRow {
  certificate_number: string;
  customer_name: string;
  report_type: string;
  status?: string;
  inspection_date?: string;
  installation_address?: string;
  inspector_name?: string;
  client_name?: string;
}

interface ImportResult {
  success: number;
  failed: number;
  errors: Array<{ row: CertificateImportRow; error: string }>;
}

export const useCertificateImport = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const parseFile = async (file: File): Promise<CertificateImportRow[]> => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension === 'csv') {
      return new Promise((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.toLowerCase().replace(/\s+/g, '_'),
          complete: (results) => resolve(results.data as CertificateImportRow[]),
          error: (error) => reject(error),
        });
      });
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
              raw: false,
              defval: ''
            });
            
            // Transform headers to match expected format
            const transformedData = jsonData.map((row: any) => {
              const transformed: any = {};
              Object.keys(row).forEach(key => {
                const normalizedKey = key.toLowerCase().replace(/\s+/g, '_');
                transformed[normalizedKey] = row[key];
              });
              return transformed;
            });
            
            resolve(transformedData as CertificateImportRow[]);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsArrayBuffer(file);
      });
    } else {
      throw new Error('Unsupported file format. Please use CSV or Excel (.xlsx, .xls)');
    }
  };

  const validateRow = (row: CertificateImportRow): string | null => {
    if (!row.certificate_number?.trim()) {
      return 'Certificate number is required';
    }
    if (!row.customer_name?.trim()) {
      return 'Customer name is required';
    }
    if (!row.report_type?.trim()) {
      return 'Report type is required';
    }
    
    const validTypes = ['eicr', 'eic', 'minor-works'];
    const normalizedType = row.report_type.toLowerCase().trim();
    if (!validTypes.includes(normalizedType)) {
      return `Invalid report type: ${row.report_type}. Must be EICR, EIC, or Minor Works`;
    }
    
    return null;
  };

  const importCertificates = async (file: File): Promise<ImportResult> => {
    setIsImporting(true);
    setProgress(0);

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('You must be logged in to import certificates');
      }

      // Parse file
      setProgress(10);
      const rows = await parseFile(file);
      
      if (!rows || rows.length === 0) {
        throw new Error('No data found in file');
      }

      // Validate all rows
      setProgress(20);
      const validRows: CertificateImportRow[] = [];
      const errors: Array<{ row: CertificateImportRow; error: string }> = [];

      rows.forEach((row) => {
        const validationError = validateRow(row);
        if (validationError) {
          errors.push({ row, error: validationError });
        } else {
          validRows.push(row);
        }
      });

      if (validRows.length === 0) {
        throw new Error('No valid certificates to import');
      }

      // Call database function
      setProgress(50);
      const { data, error } = await supabase.rpc('bulk_insert_certificates', {
        p_user_id: user.id,
        p_certificates: validRows as any,
      });

      setProgress(90);

      if (error) {
        throw error;
      }

      const result = data as unknown as ImportResult[];
      const { success_count, error_count, errors: dbErrors } = result[0] as any;

      setProgress(100);

      return {
        success: success_count || 0,
        failed: error_count || 0,
        errors: [...errors, ...(dbErrors || [])],
      };
    } finally {
      setIsImporting(false);
    }
  };

  const generateSampleCSV = (): string => {
    const headers = [
      'Certificate Number',
      'Customer Name',
      'Report Type',
      'Status',
      'Inspection Date',
      'Installation Address',
      'Inspector Name',
      'Client Name',
    ];

    const sampleRows = [
      [
        'EICR-2025-0001',
        'John Smith',
        'EICR',
        'draft',
        '2025-01-15',
        '123 High Street, London, SW1A 1AA',
        'Mike Johnson',
        'ABC Property Ltd',
      ],
      [
        'EIC-2025-0002',
        'Sarah Williams',
        'EIC',
        'completed',
        '2025-01-20',
        '456 Park Avenue, Manchester, M1 1AA',
        'Mike Johnson',
        'Sarah Williams',
      ],
      [
        'MW-2025-0003',
        'David Brown',
        'Minor Works',
        'draft',
        '2025-01-25',
        '789 Oak Road, Birmingham, B1 1AA',
        'Mike Johnson',
        'Property Management Co',
      ],
    ];

    const csv = [headers, ...sampleRows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    return csv;
  };

  const downloadSampleCSV = () => {
    const csv = generateSampleCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'certificate_import_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    isImporting,
    progress,
    importCertificates,
    downloadSampleCSV,
  };
};
