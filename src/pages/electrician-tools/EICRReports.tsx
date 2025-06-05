
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Plus, Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EICRProvider } from "@/contexts/EICRContext";
import EICRDashboard from "@/components/inspection-testing/eicr/EICRDashboard";

const EICRReports = () => {
  console.log('EICRReports page rendered');
  
  return (
    <EICRProvider>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <FileText className="h-8 w-8 text-elec-yellow" />
              EICR Reports & Management
            </h1>
            <p className="text-muted-foreground">
              Create, manage, and export Electrical Installation Condition Reports with automated fault detection.
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/electrician-tools/inspection-testing">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Testing
              </Button>
            </Link>
            <Link to="/electrician-tools/eicr/installation-details">
              <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2">
                <Plus className="h-4 w-4" /> New EICR
              </Button>
            </Link>
          </div>
        </div>

        {/* Multi-Page EICR Workflow Feature */}
        <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-gray to-elec-gray/80">
          <CardHeader className="pb-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
                  <FileText className="h-8 w-8 text-elec-yellow" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">
                    Step-by-Step EICR Creation
                  </CardTitle>
                  <p className="text-base text-muted-foreground">
                    Our comprehensive multi-page EICR process guides you through every step: installation details, 
                    inspector information, circuit configuration, visual inspection checklist, testing procedures, 
                    and final report generation. Each step is validated and saved automatically.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/electrician-tools/eicr/installation-details">
                  <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2">
                    Start New EICR
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-medium">
                Guided Step-by-Step Process
              </span>
              <span className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full text-xs font-medium">
                Automatic Data Validation
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-medium">
                Progress Persistence
              </span>
              <span className="px-3 py-1 bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-full text-xs font-medium">
                Professional PDF Generation
              </span>
              <span className="px-3 py-1 bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30 rounded-full text-xs font-medium">
                BS 7671:2018+A2:2022 Compliant
              </span>
            </div>

            {/* EICR Process Steps */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
              {[
                'Installation Details',
                'Inspector Info',
                'Circuit Config',
                'Visual Inspection',
                'Testing',
                'Generate Report'
              ].map((step, index) => (
                <div key={step} className="text-center p-2 bg-elec-dark/50 rounded border border-elec-yellow/10">
                  <div className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs flex items-center justify-center mx-auto mb-1">
                    {index + 1}
                  </div>
                  <p className="text-xs text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <FileText className="h-8 w-8 text-elec-yellow" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Satisfactory</p>
                  <p className="text-2xl font-bold text-green-400">8</p>
                </div>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">PASS</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unsatisfactory</p>
                  <p className="text-2xl font-bold text-red-400">4</p>
                </div>
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30">FAIL</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Download className="h-8 w-8 text-elec-yellow" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main EICR Dashboard */}
        <EICRDashboard />

        {/* Recent Reports */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle>Recent EICR Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: 'EICR-001', address: '123 Main Street, London', date: '2024-01-15', status: 'satisfactory' },
                { id: 'EICR-002', address: '456 Oak Avenue, Manchester', date: '2024-01-12', status: 'unsatisfactory' },
                { id: 'EICR-003', address: '789 High Street, Birmingham', date: '2024-01-10', status: 'satisfactory' },
              ].map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 border border-elec-yellow/10 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm">{report.id}</span>
                      <Badge 
                        variant={report.status === 'satisfactory' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{report.address}</p>
                    <p className="text-xs text-muted-foreground">Completed: {report.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </EICRProvider>
  );
};

export default EICRReports;
