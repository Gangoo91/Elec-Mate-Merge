
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, Clock, Users, ArrowRight, Download, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackButton from '@/components/common/BackButton';
import WorkflowTab from './WorkflowTab';

const EICRDashboard = () => {
  const [activeTab, setActiveTab] = useState("workflow");

  const recentReports = [
    { id: 1, address: "123 Main Street, London", status: "completed", date: "2024-12-01", type: "EICR" },
    { id: 2, address: "45 Oak Avenue, Manchester", status: "in-progress", date: "2024-12-08", type: "Minor Works" },
    { id: 3, address: "78 Park Road, Birmingham", status: "draft", date: "2024-12-09", type: "Initial Verification" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400';
      case 'draft': return 'bg-amber-500/20 text-amber-400';
      default: return 'bg-elec-yellow/20 text-elec-yellow';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">EICR Reports</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Professional electrical inspection and testing reports with BS 7671 compliance
        </p>
        <BackButton customUrl="/electrician-tools" label="Back to Electrician Tools" />
      </div>

      <Tabs defaultValue="workflow" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workflow" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Workflow
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workflow">
          <WorkflowTab />
        </TabsContent>

        <TabsContent value="reports">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Recent Reports</h2>
              <Link to="/electrician-tools/eicr-reports/digital-form">
                <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                  <Plus className="h-4 w-4 mr-2" />
                  New Report
                </Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {recentReports.map((report) => (
                <Card key={report.id} className="border-elec-yellow/20 bg-elec-gray">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-white">{report.address}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(report.status)}>
                            {report.status.replace('-', ' ')}
                          </Badge>
                          <Badge variant="outline">{report.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Created: {report.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                        <Button size="sm" className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                          View <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow">Report Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Custom templates and pre-configured settings coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow">Report Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Performance metrics and insights coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EICRDashboard;
