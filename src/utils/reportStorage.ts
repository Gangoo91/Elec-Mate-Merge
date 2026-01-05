// DEPRECATED: Kept for compatibility only
// All reports are now in the cloud via reportCloud

export interface ReportMetadata {
  id: string;
  name: string;
  clientName: string;
  installationAddress: string;
  inspectionDate: string;
  status: 'draft' | 'in-progress' | 'completed';
  lastModified: number;
  created: number;
  inspectorName: string;
}

export interface SavedReport {
  id: string;
  metadata: ReportMetadata;
  data: any;
}

export const reportStorage = {
  getAllReports: (): SavedReport[] => [],
  getReport: (id: string) => null,
  saveReport: (data: any, reportType?: string, metadata?: any) => ({ id: '', metadata: {} as ReportMetadata, data: {} }),
  deleteReport: (id: string) => {},
};
