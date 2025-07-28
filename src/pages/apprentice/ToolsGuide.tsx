
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ArrowLeft, Wrench, CheckCircle, Store, AlertTriangle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import EssentialToolsTab from "@/components/apprentice/professional-tools/EssentialToolsTab";
import ToolSelectionTab from "@/components/apprentice/professional-tools/ToolSelectionTab";
import SuppliersAndCostsTab from "@/components/apprentice/professional-tools/SuppliersAndCostsTab";

const ToolsGuide = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="px-3 sm:px-6 py-4 sm:py-6 space-y-6 animate-fade-in">
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
                {isMobile ? "Back to Toolbox" : "Back to Toolbox"}
              </Button>
            </Link>
          </div>
          
          <div className="text-center space-y-3">
            <h1 className={`font-bold tracking-tight text-elec-yellow leading-tight ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
              Professional Tool Guide
            </h1>
            <p className={`text-muted-foreground leading-relaxed max-w-4xl mx-auto ${isMobile ? 'text-sm' : 'text-base'}`}>
              Comprehensive guidance for building your professional electrician toolkit in the UK. 
              From essential tools to smart purchasing decisions, quality assessment, and supplier recommendations.
            </p>
          </div>
        </div>

        <Alert className="border-blue-500/50 bg-blue-500/10">
          <Wrench className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            Building a professional toolkit is a career-long investment. This guide provides everything you need to make informed decisions and build your collection strategically.
          </AlertDescription>
        </Alert>

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
            <strong>Remember:</strong> Quality tools are a long-term investment. Never compromise on safety-critical equipment like test instruments and PPE. Plan your purchases strategically over 12-18 months.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default ToolsGuide;
