
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, ClipboardList, Briefcase, CheckCircle, AlertCircle, FileCheck, Users, Book, BarChart4, CalendarClock, Calculator, PenTool } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const handleGenerateDocument = () => {
    toast({
      title: "Template Ready",
      description: "Your document template is ready for completion.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Tools</h1>
          <p className="text-muted-foreground">
            Streamline your electrical business administration and documentation.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/electrician-tools">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Tools
            </Button>
          </Link>
          <Link to="/electrician-tools/quote-library">
            <Button variant="default" className="flex items-center gap-2">
              <Book className="h-4 w-4" /> Quote Library
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              Document Templates
            </CardTitle>
            <CardDescription>
              Professional templates for electrical contractors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <Button variant="outline" className="justify-start" onClick={handleGenerateDocument}>
                <FileCheck className="h-4 w-4 mr-2" />
                Electrical Installation Certificate
              </Button>
              <Button variant="outline" className="justify-start" onClick={handleGenerateDocument}>
                <FileCheck className="h-4 w-4 mr-2" />
                Minor Works Certificate
              </Button>
              <Button variant="outline" className="justify-start" onClick={handleGenerateDocument}>
                <FileCheck className="h-4 w-4 mr-2" />
                EICR Form
              </Button>
              <Button variant="outline" className="justify-start" onClick={handleGenerateDocument}>
                <FileCheck className="h-4 w-4 mr-2" />
                Client Quotation Template
              </Button>
              <Button variant="outline" className="justify-start" onClick={handleGenerateDocument}>
                <FileCheck className="h-4 w-4 mr-2" />
                Invoice Template
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              All templates comply with the latest BS 7671 IET Wiring Regulations and can be customised with your business details.
            </p>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-elec-yellow" />
              Business Management
            </CardTitle>
            <CardDescription>
              Tools to help manage your electrical business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-elec-dark rounded-md">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Client Database</span>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-elec-dark rounded-md">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Invoice Tracking</span>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-elec-dark rounded-md">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <span>VAT Returns Helper</span>
                </div>
                <Button variant="ghost" size="sm">Setup</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-elec-dark rounded-md">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <span>Expenses Tracker</span>
                </div>
                <Button variant="ghost" size="sm">Setup</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-elec-dark rounded-md">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Job Cost Calculator</span>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Compliance Manager</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Track your certifications, insurance and other compliance requirements.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Public Liability Insurance</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Valid</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">ECA Membership</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Valid</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">18th Edition Qualification</span>
                <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded">Renew Soon</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Professional Indemnity</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Valid</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">Manage Compliance</Button>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Staff Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Track working hours, qualifications and assignments for your team.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-elec-dark rounded">
                <span className="text-sm">Active Staff</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-elec-dark rounded">
                <span className="text-sm">Apprentices</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-elec-dark rounded">
                <span className="text-sm">Certification Due</span>
                <span className="font-medium text-amber-400">1</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">Manage Team</Button>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <BarChart4 className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Business Analytics</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Track performance metrics for your electrical business.
            </p>
            <div className="h-[120px] bg-elec-dark rounded-md p-2">
              <div className="flex items-end justify-around h-full w-full gap-2">
                <div className="flex flex-col items-center">
                  <div className="h-16 w-6 bg-elec-yellow/40 rounded-t-sm"></div>
                  <span className="text-xs mt-1">Jan</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-28 w-6 bg-elec-yellow/40 rounded-t-sm"></div>
                  <span className="text-xs mt-1">Feb</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-20 w-6 bg-elec-yellow/40 rounded-t-sm"></div>
                  <span className="text-xs mt-1">Mar</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-36 w-6 bg-elec-yellow/70 rounded-t-sm"></div>
                  <span className="text-xs mt-1">Apr</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-24 w-6 bg-elec-yellow/70 rounded-t-sm"></div>
                  <span className="text-xs mt-1">May</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-32 w-6 bg-elec-yellow rounded-t-sm"></div>
                  <span className="text-xs mt-1">Jun</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">View Reports</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Scheduling</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Manage appointments and schedule your electrical jobs.
            </p>
            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between p-2 bg-elec-dark rounded">
                <span className="text-sm">Today's Jobs</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-elec-dark rounded">
                <span className="text-sm">This Week</span>
                <span className="font-medium">12</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">View Schedule</Button>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Financial Tools</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Calculate profit margins and manage financial aspects.
            </p>
            <div className="space-y-2 mb-3">
              <Button variant="outline" className="w-full justify-start text-sm py-1 px-3">
                <PenTool className="h-4 w-4 mr-2" />
                Material Cost Calculator
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm py-1 px-3">
                <PenTool className="h-4 w-4 mr-2" />
                Labor Rate Calculator
              </Button>
            </div>
            <Button variant="outline" className="w-full">Open Calculators</Button>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Contracts & Forms</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Access and customize standard contracts for electrical work.
            </p>
            <div className="space-y-2 mb-3">
              <Button variant="outline" className="w-full justify-start text-sm py-1 px-3">
                <FileCheck className="h-4 w-4 mr-2" />
                Standard Service Agreement
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm py-1 px-3">
                <FileCheck className="h-4 w-4 mr-2" />
                Change Order Form
              </Button>
            </div>
            <Button variant="outline" className="w-full">View All Forms</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
