
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TestSession } from '@/types/inspection-testing';
import { FileText, Download, Mail, Printer } from 'lucide-react';

interface ReportGeneratorProps {
  session: TestSession;
  onGenerateReport: (format: 'pdf' | 'excel' | 'word') => void;
  onEmailReport: () => void;
  onPrintReport: () => void;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({
  session,
  onGenerateReport,
  onEmailReport,
  onPrintReport
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel' | 'word'>('pdf');

  const getOverallStatus = () => {
    const failedTests = session.results.filter(r => r.status === 'failed').length;
    const completedTests = session.results.filter(r => r.status === 'completed').length;
    
    if (failedTests > 0) return { status: 'Unsatisfactory', color: 'bg-red-500' };
    if (completedTests === session.steps.length) return { status: 'Satisfactory', color: 'bg-green-500' };
    return { status: 'Incomplete', color: 'bg-yellow-500' };
  };

  const overallStatus = getOverallStatus();

  const getTestStats = () => {
    const total = session.steps.length;
    const completed = session.results.filter(r => r.status === 'completed').length;
    const failed = session.results.filter(r => r.status === 'failed').length;
    const pending = total - completed - failed;

    return { total, completed, failed, pending };
  };

  const stats = getTestStats();

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Professional Report Generation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Session Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Overall Status</p>
            <Badge className={overallStatus.color}>{overallStatus.status}</Badge>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Failed</p>
            <p className="text-2xl font-bold text-red-400">{stats.failed}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
          </div>
        </div>

        {/* Report Details */}
        <div className="space-y-3">
          <h4 className="font-medium">Report Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Location:</span>
              <span className="ml-2">{session.location}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Installation Type:</span>
              <span className="ml-2">{session.installationType}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Session Started:</span>
              <span className="ml-2">{session.startTime.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Duration:</span>
              <span className="ml-2">
                {session.endTime 
                  ? `${Math.round((session.endTime.getTime() - session.startTime.getTime()) / 60000)} minutes`
                  : 'In Progress'
                }
              </span>
            </div>
          </div>
        </div>

        {/* Format Selection */}
        <div className="space-y-3">
          <h4 className="font-medium">Export Format</h4>
          <div className="flex gap-2">
            {['pdf', 'excel', 'word'].map((format) => (
              <Button
                key={format}
                variant={selectedFormat === format ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFormat(format as 'pdf' | 'excel' | 'word')}
              >
                {format.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={() => onGenerateReport(selectedFormat)}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <Download className="h-4 w-4 mr-2" />
            Generate {selectedFormat.toUpperCase()}
          </Button>
          
          <Button variant="outline" onClick={onEmailReport}>
            <Mail className="h-4 w-4 mr-2" />
            Email Report
          </Button>
          
          <Button variant="outline" onClick={onPrintReport}>
            <Printer className="h-4 w-4 mr-2" />
            Print Report
          </Button>
        </div>

        {/* Compliance Notice */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h4 className="font-medium text-blue-400 mb-2">Professional Compliance</h4>
          <p className="text-sm text-blue-300">
            All reports are generated in accordance with BS 7671:2018+A3:2024 requirements and 
            include proper certification documentation. Reports include detailed test results, 
            fault classifications, and professional recommendations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportGenerator;
