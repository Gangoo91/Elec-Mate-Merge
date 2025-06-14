
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Download, 
  Eye, 
  FileText, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  Printer,
  Mail,
  Share
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Report {
  id: string;
  type: 'EICR' | 'EIC' | 'Minor Works';
  property: string;
  client: string;
  date: string;
  status: 'draft' | 'completed' | 'issued';
  result: 'satisfactory' | 'unsatisfactory' | 'pending';
  circuits: number;
  faults: number;
}

const ReportsTab = () => {
  const [reports] = useState<Report[]>([
    {
      id: '1',
      type: 'EICR',
      property: '123 Main Street, London',
      client: 'John Smith',
      date: '2024-06-14',
      status: 'completed',
      result: 'satisfactory',
      circuits: 8,
      faults: 0
    },
    {
      id: '2',
      type: 'EIC',
      property: '456 Oak Avenue, Manchester',
      client: 'Sarah Jones',
      date: '2024-06-13',
      status: 'draft',
      result: 'pending',
      circuits: 12,
      faults: 2
    },
    {
      id: '3',
      type: 'EICR',
      property: '789 Elm Close, Birmingham',
      client: 'Mike Wilson',
      date: '2024-06-12',
      status: 'issued',
      result: 'unsatisfactory',
      circuits: 6,
      faults: 3
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'EICR' | 'EIC' | 'Minor Works'>('all');

  const filteredReports = filter === 'all' ? reports : reports.filter(r => r.type === filter);

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'draft': return 'bg-yellow-500/20 text-yellow-300';
      case 'completed': return 'bg-blue-500/20 text-blue-300';
      case 'issued': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getResultColor = (result: Report['result']) => {
    switch (result) {
      case 'satisfactory': return 'bg-green-500/20 text-green-300';
      case 'unsatisfactory': return 'bg-red-500/20 text-red-300';
      case 'pending': return 'bg-gray-500/20 text-gray-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getResultIcon = (result: Report['result']) => {
    switch (result) {
      case 'satisfactory': return <CheckCircle className="h-4 w-4" />;
      case 'unsatisfactory': return <AlertTriangle className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Reports Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-gray to-elec-gray/80">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-elec-yellow" />
              Total Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-elec-yellow mb-2">{reports.length}</div>
            <p className="text-sm text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-green-300">
              <CheckCircle className="h-5 w-5" />
              Satisfactory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-300 mb-2">
              {reports.filter(r => r.result === 'satisfactory').length}
            </div>
            <p className="text-sm text-muted-foreground">Passed inspections</p>
          </CardContent>
        </Card>

        <Card className="border-red-500/30 bg-red-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-red-300">
              <AlertTriangle className="h-5 w-5" />
              Unsatisfactory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-300 mb-2">
              {reports.filter(r => r.result === 'unsatisfactory').length}
            </div>
            <p className="text-sm text-muted-foreground">Failed inspections</p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-blue-300">
              <Calendar className="h-5 w-5" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-300 mb-2">
              {reports.filter(r => new Date(r.date).getMonth() === new Date().getMonth()).length}
            </div>
            <p className="text-sm text-muted-foreground">Recent reports</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Filter Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'EICR', 'EIC', 'Minor Works'] as const).map((type) => (
              <Button
                key={type}
                onClick={() => setFilter(type)}
                variant={filter === type ? "default" : "outline"}
                size="sm"
                className={filter === type ? "bg-elec-yellow text-black" : ""}
              >
                {type === 'all' ? 'All Reports' : type}
                <Badge variant="outline" className="ml-2">
                  {type === 'all' ? reports.length : reports.filter(r => r.type === type).length}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            Recent Reports
            <Button size="sm" className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div 
                key={report.id} 
                className="p-4 border border-elec-yellow/20 rounded-lg hover:border-elec-yellow/40 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow">
                      {report.type}
                    </Badge>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </Badge>
                    <Badge className={getResultColor(report.result)}>
                      {getResultIcon(report.result)}
                      <span className="ml-1 capitalize">{report.result}</span>
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{report.date}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-white mb-1">{report.property}</h4>
                    <p className="text-sm text-muted-foreground">Client: {report.client}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Circuits: </span>
                      <span className="font-medium">{report.circuits}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Faults: </span>
                      <span className={`font-medium ${report.faults > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {report.faults}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Printer className="h-3 w-3" />
                    Print
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Share className="h-3 w-3" />
                    Share
                  </Button>
                </div>
              </div>
            ))}

            {filteredReports.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No reports found for the selected filter.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow">Report Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Blank EICR Template
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Blank EIC Template
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Minor Works Certificate
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-elec-yellow">Export Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export to Excel
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Bulk PDF Export
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share className="h-4 w-4 mr-2" />
                Email Summary Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Notice */}
      <Alert className="bg-blue-500/10 border-blue-500/30">
        <FileText className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          <strong>Report Retention:</strong> All electrical certificates and test reports must be retained for future reference. 
          Digital copies should be backed up regularly and made available to property owners.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ReportsTab;
