
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, Upload, CheckCircle, Clock, AlertCircle, Download } from "lucide-react";

const PortfolioManagementTab = () => {
  const portfolioSections = [
    {
      title: "Technical Competencies",
      completed: 12,
      total: 15,
      status: "in-progress"
    },
    {
      title: "Health & Safety Evidence",
      completed: 8,
      total: 10,
      status: "in-progress"
    },
    {
      title: "Professional Development",
      completed: 5,
      total: 8,
      status: "in-progress"
    },
    {
      title: "Work Experience Logs",
      completed: 24,
      total: 30,
      status: "in-progress"
    }
  ];

  const recentUploads = [
    {
      title: "Installation Certificate - Domestic Rewire",
      date: "2024-01-15",
      type: "Certificate",
      status: "verified"
    },
    {
      title: "Risk Assessment - Commercial Installation",
      date: "2024-01-12",
      type: "Document",
      status: "pending"
    },
    {
      title: "Training Record - PAT Testing Course",
      date: "2024-01-10",
      type: "Training",
      status: "verified"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <Card className="bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <FileText className="h-5 w-5 text-blue-600" />
            Portfolio Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800">73%</div>
              <div className="text-sm text-slate-600">Portfolio Completion</div>
              <Progress value={73} className="mt-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-800">49</div>
                <div className="text-slate-600">Evidence Items</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-800">63</div>
                <div className="text-slate-600">Total Required</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Sections */}
      <Card className="bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-800">Portfolio Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioSections.map((section, index) => (
              <div key={index} className="p-4 rounded-lg border border-slate-300 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-slate-800">{section.title}</h4>
                  <span className="text-sm text-slate-600">
                    {section.completed}/{section.total}
                  </span>
                </div>
                <Progress 
                  value={(section.completed / section.total) * 100} 
                  className="h-2" 
                />
                <div className="mt-2 text-xs text-slate-600">
                  {section.total - section.completed} items remaining
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Uploads */}
      <Card className="bg-slate-50 border-slate-200">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-slate-800">Recent Uploads</CardTitle>
            <Button size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Evidence
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentUploads.map((upload, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-300 bg-white">
                <div className="flex items-center gap-3">
                  {getStatusIcon(upload.status)}
                  <div>
                    <div className="font-medium text-sm text-slate-800">{upload.title}</div>
                    <div className="text-xs text-slate-600">
                      {upload.type} • {upload.date}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-800">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Evidence
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Portfolio
            </Button>
            <Button variant="outline" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Portfolio Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioManagementTab;
