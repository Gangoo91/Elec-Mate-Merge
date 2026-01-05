
export interface RegulationWarning {
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  regulation: string;
  suggestion?: string;
}

export interface RegulationCheckResult {
  isCompliant: boolean;
  warnings: RegulationWarning[];
}
