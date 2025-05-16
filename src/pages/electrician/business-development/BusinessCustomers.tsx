
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHelping, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BusinessCustomers = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Link to="/electrician/business-development">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Customer Acquisition</h1>
      </div>
      
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <HandHelping className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Client Acquisition Strategies</CardTitle>
          </div>
          <CardDescription>Effective methods to attract and retain clients</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development. Check back soon for complete guidance on customer acquisition.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessCustomers;
