
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
    <div className="w-full min-h-screen bg-elec-dark space-y-4 sm:space-y-6 animate-fade-in">
      <div className="flex flex-col items-center justify-center text-center space-y-4 px-4 sm:px-6 py-4 sm:py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Professional Tool Guide</h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
          Comprehensive guidance for building your professional electrician toolkit - from essential tools to smart purchasing decisions and quality assessment
        </p>
        <BackButton customUrl="/apprentice/on-job-tools" label="Back to On-Job Tools" />
      </div>

      <div className="px-4 sm:px-6">
        <Alert className="border-blue-500/50 bg-blue-500/10">
          <Shield className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200 text-sm leading-relaxed">
            Building a professional toolkit is an investment in your career. This comprehensive guide provides everything you need for informed decision-making and strategic purchasing.
          </AlertDescription>
        </Alert>
      </div>

      <div className="w-full">
        <div className="pb-6 px-4 sm:px-6">
          <div className="flex items-center gap-2 justify-center sm:justify-start mb-6">
            <Wrench className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
            <h2 className="text-elec-yellow text-xl sm:text-2xl text-center sm:text-left font-bold">Professional Tool Categories</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 sm:gap-4 sm:px-4">
          {toolCategories.map((category, index) => (
            <div key={index} className="border-2 border-elec-yellow/30 bg-elec-gray p-6 text-center hover:bg-elec-card transition-all duration-300">
              <h4 className="font-bold text-white mb-3 text-lg">{category.name}</h4>
              <div className="text-base text-elec-yellow mb-4 font-medium">{category.count}</div>
              <Badge 
                variant="outline" 
                className={`mb-4 text-sm font-bold px-3 py-1 ${
                  category.priority === 'Critical' ? 'border-red-500/60 text-red-300 bg-red-500/10' :
                  category.priority === 'High' ? 'border-orange-500/60 text-orange-300 bg-orange-500/10' :
                  'border-blue-500/60 text-blue-300 bg-blue-500/10'
                }`}
              >
                {category.priority} Priority
              </Badge>
              <p className="text-base font-bold text-elec-yellow bg-elec-yellow/10 rounded-lg py-2 px-3">{category.cost}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-6">
        <DropdownTabs
          tabs={dropdownTabs}
          defaultValue="essential"
          placeholder="Select tool category"
          triggerClassName="w-full"
        />
      </div>

      <div className="px-4 sm:px-6">
        <Alert className="border-orange-500/50 bg-orange-500/10">
          <AlertTriangle className="h-4 w-4 text-orange-400" />
          <AlertDescription className="text-orange-200 text-sm leading-relaxed">
            <strong>Remember:</strong> Quality tools are a long-term investment. Never compromise on safety-critical equipment like test instruments and PPE. Plan strategically and invest wisely.
          </AlertDescription>
        </Alert>
      </div>

      <div className="px-4 sm:px-6">
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
    </div>
  );
};

export default ToolsGuide;
