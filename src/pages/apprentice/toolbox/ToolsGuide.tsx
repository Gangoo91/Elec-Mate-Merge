
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, CheckCircle, Store, Heart, Shield, AlertTriangle } from "lucide-react";
import EssentialToolsTab from "@/components/apprentice/professional-tools/EssentialToolsTab";
import ToolSelectionTab from "@/components/apprentice/professional-tools/ToolSelectionTab";
import SuppliersAndCostsTab from "@/components/apprentice/professional-tools/SuppliersAndCostsTab";

const ToolsGuide = () => {
  const toolCategories = [
    { name: "Hand Tools", count: "15-20 essential items", priority: "High", cost: "£200-400" },
    { name: "Power Tools", count: "5-8 key tools", priority: "Medium", cost: "£300-800" },
    { name: "Test Equipment", count: "3-5 instruments", priority: "Critical", cost: "£400-1200" },
    { name: "PPE & Safety", count: "Complete safety kit", priority: "Critical", cost: "£150-300" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Professional Tool Guide</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Comprehensive guidance for building your professional electrician toolkit - from essential tools to smart purchasing decisions and quality assessment
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Shield className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Building a professional toolkit is an investment in your career. This comprehensive guide provides everything you need for informed decision-making and strategic purchasing.
        </AlertDescription>
      </Alert>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Professional Tool Categories</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {toolCategories.map((category, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-white mb-2">{category.name}</h4>
                <div className="text-sm text-elec-yellow mb-1">{category.count}</div>
                <Badge 
                  variant="outline" 
                  className={`mb-2 ${
                    category.priority === 'Critical' ? 'border-red-500/40 text-red-400' :
                    category.priority === 'High' ? 'border-orange-500/40 text-orange-400' :
                    'border-blue-500/40 text-blue-400'
                  }`}
                >
                  {category.priority} Priority
                </Badge>
                <p className="text-xs text-muted-foreground">{category.cost}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="essential" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="essential" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Essential Tools
          </TabsTrigger>
          <TabsTrigger value="selection" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Tool Selection & Quality
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Suppliers & Costs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="essential">
          <EssentialToolsTab />
        </TabsContent>

        <TabsContent value="selection">
          <ToolSelectionTab />
        </TabsContent>

        <TabsContent value="suppliers">
          <SuppliersAndCostsTab />
        </TabsContent>
      </Tabs>

      <Alert className="border-orange-500/50 bg-orange-500/10">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200">
          <strong>Remember:</strong> Quality tools are a long-term investment. Never compromise on safety-critical equipment like test instruments and PPE. Plan strategically and invest wisely.
        </AlertDescription>
      </Alert>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Your Professional Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Building a professional toolkit is a career-long investment in your success. Focus on quality over quantity, 
            plan your purchases strategically, and maintain your tools properly. A well-chosen and maintained toolkit will serve you throughout 
            your entire electrical career and contribute to your professional reputation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolsGuide;
