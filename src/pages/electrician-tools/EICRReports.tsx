
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Plus, Download, Settings, Users, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EICRProvider } from "@/contexts/EICRContext";
import EICRDashboard from "@/components/inspection-testing/eicr/EICRDashboard";
import BackButton from "@/components/common/BackButton";

const EICRReports = () => {
  console.log('EICRReports page rendered');
  
  return (
    <EICRProvider>
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        <div className="flex flex-col items-center justify-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-4">EICR Reports & Management</h1>
          <p className="text-muted-foreground text-center max-w-2xl mb-4">
            Create, manage, and export Electrical Installation Condition Reports with automated fault detection and BS 7671:2018+A2:2022 compliance
          </p>
          <BackButton customUrl="/electrician-tools/inspection-testing" label="Back to Testing" />
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="workflow" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Workflow
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="management" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <EICRDashboard />
          </TabsContent>

          <TabsContent value="workflow">
            {/* Multi-Page EICR Workflow */}
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
                        <Plus className="h-4 w-4" />
                        Start New EICR
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
          </TabsContent>

          <TabsContent value="reports">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
          </TabsContent>

          <TabsContent value="management">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>EICR Management Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-blue-500/30 bg-blue-500/10">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-blue-300 mb-2">Template Management</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Create and manage custom EICR templates for different installation types.
                        </p>
                        <Button variant="outline" size="sm" className="border-blue-500/30">
                          Manage Templates
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-500/30 bg-purple-500/10">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-purple-300 mb-2">Export Settings</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Configure default export formats and company branding for reports.
                        </p>
                        <Button variant="outline" size="sm" className="border-purple-500/30">
                          Export Settings
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="border-green-500/50 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Professional Standards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              All EICR reports generated through Elec-Mate comply with BS 7671:2018+A2:2022 standards 
              and include comprehensive fault detection, circuit analysis, and professional documentation. 
              Always verify critical findings with appropriate testing equipment and exercise professional judgement.
            </p>
          </CardContent>
        </Card>
      </div>
    </EICRProvider>
  );
};

export default EICRReports;
