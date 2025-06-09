
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  FileText, 
  Database, 
  Settings,
  CheckCircle,
  Calendar,
  Target,
  BarChart3,
  Share,
  Link,
  Cloud
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExportIntegrationHub = () => {
  const { toast } = useToast();
  
  const [exportFormat, setExportFormat] = useState("");
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState("");

  // Mock export templates
  const exportTemplates = [
    {
      id: "eal-portfolio",
      name: "EAL Portfolio Export",
      description: "Standard format for EAL qualification submissions",
      format: "PDF + Excel",
      includes: ["Portfolio items", "Evidence files", "Assessment records", "Time logs"]
    },
    {
      id: "city-guilds",
      name: "City & Guilds Format",
      description: "Compatible with City & Guilds requirements",
      format: "PDF",
      includes: ["Portfolio items", "Learning outcomes", "Witness testimonies"]
    },
    {
      id: "training-provider",
      name: "Training Provider Report",
      description: "Comprehensive report for training providers",
      format: "PDF + Data",
      includes: ["All data", "Analytics", "Progress tracking", "Compliance status"]
    },
    {
      id: "employer-review",
      name: "Employer Review Pack",
      description: "Summary for employer reviews",
      format: "PDF",
      includes: ["Progress summary", "Key achievements", "Skills development"]
    }
  ];

  const integrationOptions = [
    {
      id: "lms-moodle",
      name: "Moodle LMS",
      description: "Export to Moodle learning management system",
      status: "Available",
      icon: "📚"
    },
    {
      id: "lms-blackboard",
      name: "Blackboard Learn",
      description: "Export to Blackboard learning platform",
      status: "Available",
      icon: "🖥️"
    },
    {
      id: "google-drive",
      name: "Google Drive",
      description: "Sync with Google Drive for backup",
      status: "Available",
      icon: "☁️"
    },
    {
      id: "onedrive",
      name: "Microsoft OneDrive",
      description: "Sync with OneDrive for backup",
      status: "Available",
      icon: "📁"
    }
  ];

  const dataCategories = [
    { id: "training-time", label: "Training Time Logs", description: "All recorded training sessions" },
    { id: "portfolio", label: "Portfolio Items", description: "Portfolio entries and submissions" },
    { id: "evidence", label: "Evidence Files", description: "Uploaded evidence and media" },
    { id: "assessments", label: "Assessment Records", description: "Assessment results and feedback" },
    { id: "compliance", label: "Compliance Data", description: "Progress towards requirements" },
    { id: "communication", label: "Tutor Communications", description: "Messages and feedback from tutors" }
  ];

  const recentExports = [
    {
      id: 1,
      name: "Monthly Progress Report - January 2024",
      format: "PDF",
      date: "2024-01-31",
      size: "2.4 MB",
      status: "Completed"
    },
    {
      id: 2,
      name: "EAL Portfolio Export",
      format: "ZIP",
      date: "2024-01-25",
      size: "15.6 MB",
      status: "Completed"
    },
    {
      id: 3,
      name: "Training Data Backup",
      format: "JSON",
      date: "2024-01-20",
      size: "1.2 MB",
      status: "Completed"
    }
  ];

  const handleExport = () => {
    if (!exportFormat || selectedData.length === 0) {
      toast({
        title: "Missing Selection",
        description: "Please select an export format and data to include.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Export Started",
      description: "Your export is being prepared. You'll receive a download link shortly."
    });

    // Reset form
    setExportFormat("");
    setSelectedData([]);
    setDateRange("");
  };

  const handleDataSelection = (dataId: string, checked: boolean) => {
    if (checked) {
      setSelectedData(prev => [...prev, dataId]);
    } else {
      setSelectedData(prev => prev.filter(id => id !== dataId));
    }
  };

  const ExportStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">23</div>
            <p className="text-sm text-muted-foreground">Total Exports</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">156 MB</div>
            <p className="text-sm text-muted-foreground">Data Exported</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">5</div>
            <p className="text-sm text-muted-foreground">Active Integrations</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">Daily</div>
            <p className="text-sm text-muted-foreground">Auto Backup</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Export & Integration Hub</h2>
          <p className="text-muted-foreground">Export your data and integrate with external systems</p>
        </div>
      </div>

      <ExportStats />

      <Tabs defaultValue="export" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="export" className="flex-1">Quick Export</TabsTrigger>
          <TabsTrigger value="templates" className="flex-1">Templates</TabsTrigger>
          <TabsTrigger value="integrations" className="flex-1">Integrations</TabsTrigger>
          <TabsTrigger value="history" className="flex-1">Export History</TabsTrigger>
        </TabsList>

        <TabsContent value="export" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Export</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="format">Export Format</Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Report</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV Data</SelectItem>
                      <SelectItem value="json">JSON Data</SelectItem>
                      <SelectItem value="zip">Complete Package (ZIP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dateRange">Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-week">Last Week</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="last-quarter">Last Quarter</SelectItem>
                      <SelectItem value="this-year">This Year</SelectItem>
                      <SelectItem value="all-time">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">Data to Include</Label>
                  <div className="space-y-3 mt-2">
                    {dataCategories.map((category) => (
                      <div key={category.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedData.includes(category.id)}
                          onCheckedChange={(checked) => handleDataSelection(category.id, checked as boolean)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor={category.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={handleExport} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Export
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Monthly Report
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Export Portfolio for Review
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Export Progress Analytics
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Backup All Data
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Export Training Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Templates</CardTitle>
              <p className="text-sm text-muted-foreground">
                Pre-configured export formats for different purposes
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exportTemplates.map((template) => (
                  <Card key={template.id} className="relative">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">{template.format}</Badge>
                        </div>
                        
                        <div className="text-xs">
                          <span className="font-medium">Includes:</span>
                          <ul className="list-disc list-inside mt-1 space-y-1">
                            {template.includes.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Integrations</CardTitle>
              <p className="text-sm text-muted-foreground">
                Connect with external systems and platforms
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrationOptions.map((integration) => (
                  <Card key={integration.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl">{integration.icon}</div>
                        <div>
                          <h3 className="font-semibold">{integration.name}</h3>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge className="bg-green-500">{integration.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Link className="h-4 w-4 mr-1" />
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentExports.map((exportItem) => (
                  <div key={exportItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <h3 className="font-medium">{exportItem.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{exportItem.format}</span>
                          <span>{exportItem.size}</span>
                          <span>{exportItem.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500">{exportItem.status}</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExportIntegrationHub;
