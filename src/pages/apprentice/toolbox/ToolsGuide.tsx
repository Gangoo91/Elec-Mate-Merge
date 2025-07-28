
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
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

  const dropdownTabs = [
    {
      value: "essential",
      label: "Essential Tools",
      icon: Wrench,
      content: <EssentialToolsTab />
    },
    {
      value: "selection",
      label: "Tool Selection & Quality",
      icon: CheckCircle,
      content: <ToolSelectionTab />
    },
    {
      value: "suppliers",
      label: "Suppliers & Costs",
      icon: Store,
      content: <SuppliersAndCostsTab />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 animate-fade-in">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Professional Tool Guide</h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl px-4 leading-relaxed">
          Comprehensive guidance for building your professional electrician toolkit - from essential tools to smart purchasing decisions and quality assessment
        </p>
        <BackButton customUrl="/apprentice/on-job-tools" label="Back to On-Job Tools" />
      </div>

      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Shield className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200 text-sm leading-relaxed">
          Building a professional toolkit is an investment in your career. This comprehensive guide provides everything you need for informed decision-making and strategic purchasing.
        </AlertDescription>
      </Alert>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow text-lg sm:text-xl text-center sm:text-left">Professional Tool Categories</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {toolCategories.map((category, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">{category.name}</h4>
                <div className="text-xs sm:text-sm text-elec-yellow mb-2">{category.count}</div>
                <Badge 
                  variant="outline" 
                  className={`mb-2 text-xs ${
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

      <DropdownTabs
        tabs={dropdownTabs}
        defaultValue="essential"
        placeholder="Select tool category"
        triggerClassName="w-full max-w-sm"
      />

      <Alert className="border-orange-500/50 bg-orange-500/10">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200 text-sm leading-relaxed">
          <strong>Remember:</strong> Quality tools are a long-term investment. Never compromise on safety-critical equipment like test instruments and PPE. Plan strategically and invest wisely.
        </AlertDescription>
      </Alert>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-green-300 flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5" />
            Your Professional Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed">
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
