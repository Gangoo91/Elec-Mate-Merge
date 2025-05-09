import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, ClipboardList, Briefcase, CheckCircle, AlertCircle, FileCheck, Users, Book } from "lucide-react";
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
          <Link to="/admin/quote-library">
            <Button variant="default" className="flex items-center gap-2">
              <Book className="h-4 w-4" /> Quote Library
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
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
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-elec-yellow" />
              Business Management
            </CardTitle>
            <CardDescription>
              Tools to help manage your electrical business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Compliance Manager</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Track your certifications, insurance and other compliance requirements with automated renewal reminders.
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
              Track working hours, qualifications and assignments for your electrical team members.
            </p>
            <div className="h-[120px] bg-elec-dark rounded-md flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Add team members to get started</p>
            </div>
            <Button variant="outline" className="w-full mt-4">Manage Team</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
