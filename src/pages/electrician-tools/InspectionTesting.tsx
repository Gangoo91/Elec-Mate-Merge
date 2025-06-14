
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, TestTube, FileText, Settings, BarChart3, Zap, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EICRProcessTab from "@/components/inspection-testing/tabs/EICRProcessTab";
import EICProcessTab from "@/components/inspection-testing/tabs/EICProcessTab";
import CircuitTestingTab from "@/components/inspection-testing/tabs/CircuitTestingTab";
import ReportsTab from "@/components/inspection-testing/tabs/ReportsTab";
import MinorWorksTab from "@/components/inspection-testing/tabs/MinorWorksTab";

const InspectionTesting = () => {
  const navigate = useNavigate();
  
  const handleNavigateBack = () => {
    navigate('/electrician-tools');
  };
  
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-2">
          <TestTube className="h-8 w-8 text-elec-yellow" />
          Inspection & Testing Hub
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Complete inspection and testing solution for domestic electrical installations. 
          From initial assessment to final certification - everything you need in one place.
        </p>
        <Button variant="outline" className="flex items-center gap-2" onClick={handleNavigateBack}>
          <ArrowLeft className="h-4 w-4" />
          Back to Electrical Workshop
        </Button>
      </div>

      {/* Professional Standards Notice */}
      <Alert className="bg-blue-500/10 border-blue-500/30">
        <TestTube className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          <strong>Professional Standards:</strong> All procedures follow BS 7671:2018+A2:2022 requirements. 
          Reports are automatically generated with proper fault codes and classifications. 
          Always ensure you are competent and qualified before conducting electrical testing.
        </AlertDescription>
      </Alert>

      {/* Main Tabs Interface */}
      <Tabs defaultValue="eicr" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="eicr" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            EICR Process
          </TabsTrigger>
          <TabsTrigger value="eic" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            EIC Process
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Circuit Testing
          </TabsTrigger>
          <TabsTrigger value="minor-works" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Minor Works
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="eicr">
          <EICRProcessTab />
        </TabsContent>

        <TabsContent value="eic">
          <EICProcessTab />
        </TabsContent>

        <TabsContent value="testing">
          <CircuitTestingTab />
        </TabsContent>

        <TabsContent value="minor-works">
          <MinorWorksTab />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>
      </Tabs>

      {/* Additional Info Card */}
      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Built for UK Electricians
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This comprehensive testing suite is designed specifically for domestic electrical work in the UK. 
            From routine inspections to new installations, every tool follows current regulations and best practices. 
            All certificates and reports are generated to professional standards.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InspectionTesting;
