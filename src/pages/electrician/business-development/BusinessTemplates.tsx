
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BusinessTemplates = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Link to="/electrician/business-development">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Business Templates</h1>
      </div>
      
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Document Templates</CardTitle>
          </div>
          <CardDescription>Essential templates for running your electrical contracting business</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development. Check back soon for complete business templates.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessTemplates;
