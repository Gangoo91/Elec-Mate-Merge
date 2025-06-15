
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, Download, Edit } from "lucide-react";

const BusinessPlanTemplate = () => {
  const [businessDetails, setBusinessDetails] = useState({
    businessName: "",
    ownerName: "",
    location: "",
    services: "",
    targetMarket: "",
    uniqueSellingPoint: "",
    marketAnalysis: "",
    financialProjections: ""
  });

  const updateDetail = (field: string, value: string) => {
    setBusinessDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePlan = () => {
    console.log("Generating business plan with:", businessDetails);
    // This would integrate with a PDF generation service
  };

  return (
    <Card className="border-green-500/50 bg-green-500/10">
      <CardHeader>
        <CardTitle className="text-green-300 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Business Plan Template Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <Label className="text-green-200">Business Name</Label>
              <Input
                value={businessDetails.businessName}
                onChange={(e) => updateDetail("businessName", e.target.value)}
                placeholder="Enter your business name"
                className="bg-green-500/20 border-green-400/30"
              />
            </div>
            <div>
              <Label className="text-green-200">Owner Name</Label>
              <Input
                value={businessDetails.ownerName}
                onChange={(e) => updateDetail("ownerName", e.target.value)}
                placeholder="Your full name"
                className="bg-green-500/20 border-green-400/30"
              />
            </div>
            <div>
              <Label className="text-green-200">Location</Label>
              <Input
                value={businessDetails.location}
                onChange={(e) => updateDetail("location", e.target.value)}
                placeholder="Operating location"
                className="bg-green-500/20 border-green-400/30"
              />
            </div>
            <div>
              <Label className="text-green-200">Services Offered</Label>
              <Textarea
                value={businessDetails.services}
                onChange={(e) => updateDetail("services", e.target.value)}
                placeholder="List your electrical services..."
                className="bg-green-500/20 border-green-400/30"
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-green-200">Target Market</Label>
              <Textarea
                value={businessDetails.targetMarket}
                onChange={(e) => updateDetail("targetMarket", e.target.value)}
                placeholder="Describe your ideal customers..."
                className="bg-green-500/20 border-green-400/30"
                rows={3}
              />
            </div>
            <div>
              <Label className="text-green-200">Unique Selling Point</Label>
              <Textarea
                value={businessDetails.uniqueSellingPoint}
                onChange={(e) => updateDetail("uniqueSellingPoint", e.target.value)}
                placeholder="What makes your business different?"
                className="bg-green-500/20 border-green-400/30"
                rows={3}
              />
            </div>
            <div>
              <Label className="text-green-200">Market Analysis</Label>
              <Textarea
                value={businessDetails.marketAnalysis}
                onChange={(e) => updateDetail("marketAnalysis", e.target.value)}
                placeholder="Local market conditions and opportunities..."
                className="bg-green-500/20 border-green-400/30"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-green-500/20">
          <Button onClick={generatePlan} className="bg-green-600 hover:bg-green-700">
            <Edit className="h-4 w-4 mr-1" />
            Generate Plan
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-1" />
            Download Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessPlanTemplate;
