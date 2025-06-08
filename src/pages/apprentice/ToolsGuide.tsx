
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ArrowLeft, Wrench, Zap, CircuitBoard, Shield } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ToolCategoryCard from "@/components/apprentice/tools-guide/ToolCategoryCard";
import ToolStorage from "@/components/apprentice/tools-guide/ToolStorage";
import RecommendedBrands from "@/components/apprentice/tools-guide/RecommendedBrands";
import BuildingCollection from "@/components/apprentice/tools-guide/BuildingCollection";
import SupplierFinder from "@/components/apprentice/tools-guide/SupplierFinder";

const ToolsGuide = () => {
  const isMobile = useIsMobile();

  const toolCategories = [
    {
      title: "Hand Tools",
      icon: <Wrench className="h-6 w-6 text-elec-yellow" />,
      description: "Essential manual tools for electrical work including screwdrivers, pliers, cutters, and measuring equipment.",
      link: "/apprentice/toolbox/tools-guide/hand-tools",
      itemCount: 16
    },
    {
      title: "Power Tools",
      icon: <Zap className="h-6 w-6 text-elec-yellow" />,
      description: "Electric and battery-powered equipment for drilling, cutting, and heavy-duty electrical installation work.",
      link: "/apprentice/toolbox/tools-guide/power-tools",
      itemCount: 14
    },
    {
      title: "Test Equipment",
      icon: <CircuitBoard className="h-6 w-6 text-elec-yellow" />,
      description: "Measurement and testing instruments for electrical safety, compliance, and troubleshooting work.",
      link: "/apprentice/toolbox/tools-guide/test-equipment",
      itemCount: 10
    },
    {
      title: "PPE & Safety",
      icon: <Shield className="h-6 w-6 text-elec-yellow" />,
      description: "Personal protective equipment and safety gear essential for electrical work environments.",
      link: "/apprentice/toolbox/tools-guide/ppe-safety",
      itemCount: 10
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 animate-fade-in max-w-6xl">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-start">
            <Link to="/apprentice/toolbox">
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"} 
                className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {isMobile ? "Back" : "Back to Toolbox"}
              </Button>
            </Link>
          </div>
          
          <div className="text-center space-y-3 px-2">
            <h1 className={`font-bold tracking-tight text-elec-yellow leading-tight ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
              Apprentice Tool Guide
            </h1>
            <p className={`text-muted-foreground leading-relaxed max-w-2xl mx-auto ${isMobile ? 'text-sm px-1' : 'text-base'}`}>
              Essential tools, equipment and materials for UK electrical apprentices. 
              Learn what you need, when to buy it, and where to get the best value.
            </p>
          </div>
        </div>

        {/* Tool Categories Grid */}
        <div className="bg-elec-gray/30 backdrop-blur border border-elec-yellow/20 rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-elec-yellow mb-4 sm:mb-6 text-center">
            Tool Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {toolCategories.map((category) => (
              <ToolCategoryCard
                key={category.title}
                title={category.title}
                icon={category.icon}
                description={category.description}
                link={category.link}
                itemCount={category.itemCount}
              />
            ))}
          </div>
        </div>

        {/* Information Sections */}
        <div className="space-y-4 sm:space-y-6">
          <Separator className="bg-elec-yellow/20" />
          
          <div className="bg-elec-gray/30 backdrop-blur border border-elec-yellow/20 rounded-lg shadow-lg overflow-hidden">
            <SupplierFinder />
          </div>

          <div className="bg-elec-gray/30 backdrop-blur border border-elec-yellow/20 rounded-lg shadow-lg overflow-hidden">
            <ToolStorage />
          </div>

          <div className="bg-elec-gray/30 backdrop-blur border border-elec-yellow/20 rounded-lg shadow-lg overflow-hidden">
            <RecommendedBrands />
          </div>

          <div className="bg-elec-gray/30 backdrop-blur border border-elec-yellow/20 rounded-lg shadow-lg overflow-hidden">
            <BuildingCollection />
          </div>
        </div>

        {/* Footer Message */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-green-500/10 border border-elec-yellow/30 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8 shadow-lg">
          <p className={`text-center text-muted-foreground leading-relaxed ${isMobile ? 'text-sm' : 'text-base'}`}>
            <strong className="text-elec-yellow">Remember:</strong> Quality tools are an investment in your career. 
            Buy once, use for years. Always prioritise safety equipment and testing instruments first.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolsGuide;
