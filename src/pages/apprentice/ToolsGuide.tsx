
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ArrowLeft, Wrench, CheckCircle, Store, Calculator, Heart, AlertTriangle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import EssentialToolsTab from "@/components/apprentice/professional-tools/EssentialToolsTab";
import ToolSelectionTab from "@/components/apprentice/professional-tools/ToolSelectionTab";
import SuppliersAndCostsTab from "@/components/apprentice/professional-tools/SuppliersAndCostsTab";
import InteractiveToolsTab from "@/components/apprentice/professional-tools/InteractiveToolsTab";

const ToolsGuide = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6 animate-fade-in max-w-6xl">
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
          
          <div className="text-center space-y-3 px-2">
            <h1 className={`font-bold tracking-tight text-elec-yellow leading-tight ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
              Professional Tool Guide
            </h1>
            <p className={`text-muted-foreground leading-relaxed max-w-3xl mx-auto ${isMobile ? 'text-sm px-1' : 'text-base'}`}>
              Essential tools and equipment for UK electrical professionals. 
              Learn what you need, where to buy it, and how to build your toolkit strategically for career success.
            </p>
          </div>
        </div>

        <Alert className="border-blue-500/50 bg-blue-500/10">
          <Wrench className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            Building a professional toolkit is an investment in your career. Focus on quality over quantity and build your collection gradually.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="essential" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="essential" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Essential Tools
            </TabsTrigger>
            <TabsTrigger value="selection" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Tool Selection
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Suppliers & Costs
            </TabsTrigger>
            <TabsTrigger value="interactive" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Interactive Tools
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

          <TabsContent value="interactive">
            <InteractiveToolsTab />
          </TabsContent>
        </Tabs>

        <Alert className="border-orange-500/50 bg-orange-500/10">
          <AlertTriangle className="h-4 w-4 text-orange-400" />
          <AlertDescription className="text-orange-200">
            <strong>Remember:</strong> Quality tools are a long-term investment. Never compromise on safety-critical equipment like test instruments and PPE.
          </AlertDescription>
        </Alert>

        <Card className="border-green-500/50 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Remember
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Building a professional toolkit is an investment in your career. Focus on quality over quantity, 
              and build your collection gradually. A well-maintained set of quality tools will serve you throughout 
              your entire electrical career.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ToolsGuide;
