
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, LucideIcon } from "lucide-react";

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
  icon: LucideIcon;
  description: string;
  commonTypes: string[];
  cableTypes: CableType[];
  keyStandards: string[];
  planningContent: string;
  safetyContent: string;
  complianceContent: string;
  enhancedOverviewComponent?: React.ReactNode;
  enhancedPlanningComponent?: React.ReactNode;
  enhancedCircuitComponent?: React.ReactNode;
  enhancedTestingComponent?: React.ReactNode;
  enhancedReferenceComponent?: React.ReactNode;
  bottomSafetyNotice?: SafetyNotice;
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
  bottomSafetyNotice
}: InstallationGuideTabsProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Icon className="h-8 w-8 text-elec-yellow" />
          <h1 className="text-3xl font-bold text-white">{title}</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-elec-gray border-elec-yellow/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">
            Overview
          </TabsTrigger>
          <TabsTrigger value="planning" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">
            Planning
          </TabsTrigger>
          <TabsTrigger value="circuits" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">
            Circuits
          </TabsTrigger>
          <TabsTrigger value="testing" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">
            Testing
          </TabsTrigger>
          <TabsTrigger value="compliance" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">
            Compliance
          </TabsTrigger>
          <TabsTrigger value="reference" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black">
            Reference
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {enhancedOverviewComponent || (
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-elec-yellow">Common Installation Types</CardTitle>
                  <CardDescription>Typical projects you'll encounter in domestic electrical work</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {commonTypes.map((type, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-elec-yellow">•</span>
                        <span className="text-sm">{type}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-elec-yellow">Safety & Compliance</CardTitle>
                  <CardDescription>Essential safety practices for domestic installations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {safetyContent}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="planning" className="space-y-6">
          {enhancedPlanningComponent || (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow">Installation Planning</CardTitle>
                <CardDescription>Comprehensive planning approach for domestic installations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {planningContent}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="circuits" className="space-y-6">
          {enhancedCircuitComponent || (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow">Circuit Design & Cable Selection</CardTitle>
                <CardDescription>Standard circuits and cable specifications for domestic installations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
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
                          <td className="p-2 text-sm">{cable.application}</td>
                          <td className="p-2 text-sm font-mono">{cable.cable}</td>
                          <td className="p-2 text-sm">{cable.protection}</td>
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

        <TabsContent value="testing" className="space-y-6">
          {enhancedTestingComponent || (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow">Testing & Verification</CardTitle>
                <CardDescription>Essential testing procedures for domestic installations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  All domestic electrical installations must undergo comprehensive testing and verification in accordance with BS 7671 requirements.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">Continuity Testing</Badge>
                  <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">Insulation Resistance</Badge>
                  <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">Polarity Testing</Badge>
                  <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">Earth Fault Loop Impedance</Badge>
                  <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">RCD Testing</Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          {enhancedReferenceComponent ? (
            <div className="space-y-6">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-elec-yellow">Regulatory Compliance</CardTitle>
                  <CardDescription>Legal and regulatory requirements for domestic electrical work</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {complianceContent}
                  </p>
                </CardContent>
              </Card>
              {enhancedReferenceComponent}
            </div>
          ) : (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow">Regulatory Compliance</CardTitle>
                <CardDescription>Legal and regulatory requirements for domestic electrical work</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {complianceContent}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="reference" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow">Key Standards & Regulations</CardTitle>
              <CardDescription>Essential standards and regulations for domestic electrical installations</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {keyStandards.map((standard, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span className="text-sm">{standard}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {bottomSafetyNotice && (
        <Alert className="border-red-500/50 bg-red-500/10 mt-8">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-400 mb-3">
                {bottomSafetyNotice.title}
              </h3>
              <div className="space-y-3">
                {bottomSafetyNotice.points.map((point, index) => (
                  <div key={index} className="space-y-1">
                    <h4 className="font-medium text-red-300">{point.title}</h4>
                    <p className="text-sm text-red-200">{point.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default InstallationGuideTabs;
