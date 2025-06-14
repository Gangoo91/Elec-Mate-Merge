
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Download, FileText, Eye } from 'lucide-react';

const ReportsTab = () => {
  const reportTypes = [
    {
      title: 'Electrical Installation Certificate (EIC)',
      description: 'For new electrical installations',
      status: 'Available',
      format: 'BS 7671 Compliant',
      lastGenerated: '2 hours ago'
    },
    {
      title: 'Electrical Installation Condition Report (EICR)',
      description: 'For periodic inspection and testing',
      status: 'Draft',
      format: 'BS 7671 Compliant',
      lastGenerated: '1 day ago'
    },
    {
      title: 'Minor Works Certificate',
      description: 'For small additions and alterations',
      status: 'Available',
      format: 'BS 7671 Compliant',
      lastGenerated: '3 days ago'
    },
    {
      title: 'Schedule of Test Results',
      description: 'Detailed test measurements and observations',
      status: 'Available',
      format: 'Comprehensive Data',
      lastGenerated: '2 hours ago'
    }
  ];

  const recentReports = [
    { name: 'EICR - 123 Main Street', date: '14/06/2025', type: 'EICR', status: 'Completed' },
    { name: 'EIC - Flat 2B Commercial Building', date: '13/06/2025', type: 'EIC', status: 'Completed' },
    { name: 'Minor Works - Kitchen Extension', date: '12/06/2025', type: 'Minor Works', status: 'Draft' },
    { name: 'EICR - Office Building Floor 3', date: '11/06/2025', type: 'EICR', status: 'Completed' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
      case 'Completed':
        return 'bg-green-500';
      case 'Draft':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-elec-yellow" />
            Inspection & Testing Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Generate, view, and manage all electrical installation certificates and reports. 
            All documents are automatically formatted to meet BS 7671 requirements and industry standards.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Available Reports</h3>
              {reportTypes.map((report, index) => (
                <Card key={index} className="border-elec-yellow/20 bg-elec-gray/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-white">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                      <Badge className={`${getStatusColor(report.status)} text-white`}>
                        {report.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-muted-foreground">Format: {report.format}</span>
                      <span className="text-muted-foreground">Updated: {report.lastGenerated}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-white">Recent Reports</h3>
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {recentReports.map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-elec-yellow/20 rounded-lg">
                        <div>
                          <h4 className="font-medium text-white text-sm">{report.name}</h4>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{report.date}</span>
                            <span>{report.type}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(report.status)} text-white text-xs`}>
                            {report.status}
                          </Badge>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/30 bg-green-500/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-green-400" />
                    <h4 className="font-medium text-green-400">Professional Standards</h4>
                  </div>
                  <p className="text-sm text-green-200">
                    All generated reports comply with BS 7671:2018+A2:2022 requirements and include 
                    proper defect classifications, remedial action codes, and professional formatting.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsTab;
