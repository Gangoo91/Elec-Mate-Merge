import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PoolCalculationResult } from "@/lib/swimming-pool";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { 
  BookOpen, 
  Wrench, 
  TestTube, 
  Clock, 
  AlertTriangle, 
  Shield,
  Lightbulb,
  CheckCircle,
  Eye
} from "lucide-react";

interface PoolGuidanceProps {
  result: PoolCalculationResult | null;
}

const PoolGuidance = ({ result }: PoolGuidanceProps) => {
  return (
    <div className="space-y-6">
      {/* Regulatory Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg">Regulatory Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="p-4 rounded-lg border border-elec-yellow/20 bg-elec-dark">
              <h4 className="font-medium text-elec-yellow mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                BS 7671:2018 Section 702 - Swimming Pools
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                The primary standard governing swimming pool electrical installations in the UK.
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Zone classifications and IP rating requirements</li>
                <li>• RCD protection mandatory for all circuits</li>
                <li>• Supplementary equipotential bonding requirements</li>
                <li>• SELV systems for underwater equipment</li>
                <li>• Socket outlet placement restrictions</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
              <h4 className="font-medium text-blue-300 mb-2">IET Code of Practice for Electrical Installations</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Guidance on domestic swimming pool installations</li>
                <li>• Risk assessment requirements</li>
                <li>• Installation and testing procedures</li>
                <li>• Maintenance recommendations</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-purple-500/20 bg-purple-500/5">
              <h4 className="font-medium text-purple-300 mb-2">Building Regulations Part P</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Notification requirements for new pool installations</li>
                <li>• Competent person scheme compliance</li>
                <li>• Electrical installation certificates required</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zone Classifications */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg">Zone Classifications Guide</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-red-300">Zone 0 - Highest Risk</h4>
                <Badge variant="outline" className="border-red-500/30 text-red-300">IPX8 Required</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Interior of pool, fountain, or water feature</p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Maximum 12V SELV only</li>
                <li>• Safety isolating transformer required</li>
                <li>• No socket outlets permitted</li>
                <li>• Underwater lighting maximum 12V</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-yellow-300">Zone 1 - Medium Risk</h4>
                <Badge variant="outline" className="border-yellow-500/30 text-yellow-300">IPX4 Minimum</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">2m horizontally from pool edge, up to 2.5m height</p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• 12V SELV systems preferred</li>
                <li>• Limited 230V with additional protection</li>
                <li>• No socket outlets within 2m of pool</li>
                <li>• RCD protection mandatory</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-green-300">Zone 2 - Lower Risk</h4>
                <Badge variant="outline" className="border-green-500/30 text-green-300">IPX2 Minimum</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">1.5m beyond Zone 1, up to 2.5m height</p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• 230V equipment permitted with RCD</li>
                <li>• Socket outlets allowed with RCD protection</li>
                <li>• Standard wiring methods acceptable</li>
                <li>• All circuits require 30mA RCD</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Installation Steps */}
      {result && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg">Installation Procedure</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.practicalGuidance.installationSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-elec-yellow/10 bg-elec-dark">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Testing Requirements */}
      {result && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg">Testing & Verification</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {result.practicalGuidance.testingRequirements.map((test, index) => (
                <div key={index} className="flex items-start gap-2 p-3 rounded-lg border border-blue-500/20 bg-blue-500/5">
                  <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{test}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Maintenance */}
      {result && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg">Ongoing Maintenance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.practicalGuidance.maintenancePoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2 p-3 rounded-lg border border-green-500/20 bg-green-500/5">
                  <Clock className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Common Pitfalls */}
      {result && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-lg">Common Pitfalls to Avoid</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.practicalGuidance.commonPitfalls.map((pitfall, index) => (
                <Alert key={index} className="border-orange-500/20 bg-orange-500/5">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  <AlertDescription className="text-orange-200">
                    {pitfall}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Why This Matters */}
      <WhyThisMatters
        title="Why Swimming Pool Electrical Safety Matters"
        points={[
          "Water and electricity create extreme hazards - proper installation prevents electrocution",
          "Zone classifications ensure appropriate equipment for wet environments",
          "RCD protection provides rapid fault clearance in high-risk areas",
          "Supplementary bonding eliminates dangerous potential differences",
          "Regular testing ensures continued protection as equipment ages",
          "Compliance with BS 7671 Section 702 is legally required",
          "Professional installation protects users and reduces liability",
          "Proper earthing arrangements prevent shock and fire hazards"
        ]}
      />

      {/* Critical Safety Notice */}
      <Alert className="border-red-500/30 bg-red-500/10">
        <Shield className="h-4 w-4 text-red-400" />
        <AlertDescription className="text-red-200">
          <strong>Critical Safety Notice:</strong> Swimming pool electrical installations require specialist knowledge 
          and experience. Water and electricity create extreme hazards. Always engage qualified pool electrical 
          engineers for design and installation. Building control notification is required for new installations.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PoolGuidance;