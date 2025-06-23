
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Home, 
  ClipboardList, 
  Zap, 
  TestTube, 
  Shield, 
  FileText, 
  AlertTriangle,
  BookOpen
} from "lucide-react";
import { ReactNode } from "react";

interface SafetyPoint {
  title: string;
  content: string;
}

interface SafetyNotice {
  title: string;
  points: SafetyPoint[];
}

interface CableType {
  application: string;
  cable: string;
  protection: string;
  notes: string;
}

interface InstallationGuideTabsProps {
  title: string;
  icon: React.ElementType;
  description: string;
  commonTypes: string[];
  cableTypes: CableType[];
  keyStandards: string[];
  planningContent: string;
  safetyContent: string;
  complianceContent: string;
  enhancedOverviewComponent?: ReactNode;
  enhancedPlanningComponent?: ReactNode;
  enhancedCircuitComponent?: ReactNode;
  enhancedTestingComponent?: ReactNode;
  enhancedReferenceComponent?: ReactNode;
  safetyNotice: SafetyNotice;
}

const InstallationGuideTabs = ({
  title,
  icon: Icon,
  description,
  commonTypes,
  cableTypes,
  keyStandards,
  planningContent,
  safetyContent,
  complianceContent,
  enhancedOverviewComponent,
  enhancedPlanningComponent,
  enhancedCircuitComponent,
  enhancedTestingComponent,
  enhancedReferenceComponent,
  safetyNotice
}: InstallationGuideTabsProps) => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4 mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
            <Icon className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
        </div>
        <p className="text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {/* Safety Notice */}
      <Alert className="border-red-500/50 bg-red-500/10">
        <AlertTriangle className="h-5 w-5 text-red-400" />
        <AlertDescription>
          <div className="space-y-3">
            <h3 className="font-semibold text-red-300 text-lg">{safetyNotice.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safetyNotice.points.map((point, index) => (
                <div key={index} className="bg-red-500/10 p-3 rounded border border-red-500/20">
                  <h4 className="font-medium text-red-200 mb-1 text-sm">{point.title}</h4>
                  <p className="text-red-100 text-xs">{point.content}</p>
                </div>
              ))}
            </div>
          </div>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="planning" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Planning</span>
          </TabsTrigger>
          <TabsTrigger value="circuits" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Circuits</span>
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            <span className="hidden sm:inline">Testing</span>
          </TabsTrigger>
          <TabsTrigger value="safety" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Safety</span>
          </TabsTrigger>
          <TabsTrigger value="reference" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Reference</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {enhancedOverviewComponent || (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-elec-yellow">Common Installation Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {commonTypes.map((type, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                        {type}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-elec-yellow">Key Standards & Regulations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {keyStandards.map((standard, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                        {standard}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="planning">
          {enhancedPlanningComponent || (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow">Planning Process</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{planningContent}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="circuits">
          {enhancedCircuitComponent || (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow">Cable Types & Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-elec-yellow/20">
                        <th className="text-left p-2 text-elec-yellow">Application</th>
                        <th className="text-left p-2 text-elec-yellow">Cable</th>
                        <th className="text-left p-2 text-elec-yellow">Protection</th>
                        <th className="text-left p-2 text-elec-yellow">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cableTypes.map((cable, index) => (
                        <tr key={index} className="border-b border-elec-yellow/10">
                          <td className="p-2">{cable.application}</td>
                          <td className="p-2">
                            <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
                              {cable.cable}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <Badge variant="outline" className="border-green-500 text-green-400">
                              {cable.protection}
                            </Badge>
                          </td>
                          <td className="p-2 text-xs text-muted-foreground">{cable.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="testing">
          {enhancedTestingComponent || (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow">Testing & Certification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{complianceContent}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="safety">
          <Card className="border-red-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-400" />
                <CardTitle className="text-red-300">Safety Procedures</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{safetyContent}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reference">
          {enhancedReferenceComponent || (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-elec-yellow" />
                  <CardTitle className="text-elec-yellow">Reference Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Additional reference materials and resources will be available here.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstallationGuideTabs;
