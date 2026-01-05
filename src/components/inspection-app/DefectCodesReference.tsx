
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, XCircle, FileText, Minus, Info } from 'lucide-react';

const DefectCodesReference = () => {
  const defectCodes = [
    { code: 'C1', description: 'Danger present - Immediate action required', severity: 'high' },
    { code: 'C2', description: 'Potentially dangerous - Urgent remedial action required', severity: 'medium' },
    { code: 'C3', description: 'Improvement recommended', severity: 'low' },
    { code: 'FI', description: 'Further investigation required', severity: 'info' },
    { code: 'N/A', description: 'Not applicable to this installation', severity: 'neutral' },
    { code: 'LIM', description: 'Limitation noted during inspection', severity: 'limitation' }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'medium': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'low': return <CheckCircle className="h-5 w-5 text-yellow-500" />;
      case 'info': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'neutral': return <Minus className="h-5 w-5 text-muted-foreground" />;
      case 'limitation': return <Info className="h-5 w-5 text-purple-500" />;
      default: return <FileText className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-elec-yellow">Defect Classification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {defectCodes.map((code) => (
            <div 
              key={code.code} 
              className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex-shrink-0">
                {getSeverityIcon(code.severity)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base mb-0.5">{code.code}</p>
                <p className="text-sm text-muted-foreground">{code.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DefectCodesReference;
