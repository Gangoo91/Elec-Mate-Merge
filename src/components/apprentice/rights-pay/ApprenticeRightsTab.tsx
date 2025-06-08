
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileText, GraduationCap, Heart, AlertTriangle, Users } from "lucide-react";

const ApprenticeRightsTab = () => {
  const basicRights = [
    "20 days annual leave plus bank holidays",
    "Written statement of employment terms within 2 months",
    "Safe working environment and proper training", 
    "Protection from discrimination and harassment",
    "Access to grievance and disciplinary procedures",
    "Time off for study (usually 1 day per week)",
    "Minimum wage as per age and experience",
    "Protection against unfair dismissal after 2 years"
  ];

  const apprenticeshipAgreement = [
    {
      section: "Training Plan",
      details: "Must outline specific skills and knowledge to be gained, duration of training, and assessment methods"
    },
    {
      section: "Working Hours",
      details: "Standard working hours, overtime arrangements, and study time allocation clearly defined"
    },
    {
      section: "Supervision",
      details: "Named supervisor or mentor assigned with regular review meetings scheduled"
    },
    {
      section: "Assessment Schedule",
      details: "Clear timeline for assessments, portfolio reviews, and end-point assessment preparation"
    }
  ];

  const trainingEntitlements = [
    "Minimum 20% off-the-job training (typically 1 day per week)",
    "Access to all necessary learning materials and resources",
    "Workplace mentor or supervisor assigned",
    "Regular progress reviews and feedback sessions",
    "EPA preparation and support",
    "Access to training provider support services"
  ];

  const healthSafetyRights = [
    "Comprehensive health and safety induction",
    "Proper personal protective equipment (PPE) provided free",
    "Training on safe working procedures and risk assessment",
    "Right to refuse unsafe work without penalty",
    "Access to first aid facilities and trained first aiders",
    "Reporting of accidents and near misses without blame"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Your Legal Rights as an Apprentice</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Basic Employment Rights</h4>
              <ul className="space-y-2">
                {basicRights.map((right, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    {right}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-elec-yellow/10 p-4 rounded-lg">
              <h4 className="font-semibold text-elec-yellow mb-2">Know Your Worth</h4>
              <p className="text-sm text-muted-foreground mb-3">
                You're not just cheap labour - you're a valuable team member in training. 
                Don't accept being treated poorly because you're "just an apprentice."
              </p>
              <p className="text-sm text-muted-foreground">
                If something feels wrong, speak up. There are people who can help.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="agreement" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="agreement">Agreement</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="agreement">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-elec-yellow">Apprenticeship Agreement Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apprenticeshipAgreement.map((item, index) => (
                  <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">{item.section}</h4>
                    <p className="text-sm text-muted-foreground">{item.details}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <p className="text-sm text-blue-400 font-medium mb-1">Important:</p>
                <p className="text-sm text-muted-foreground">
                  Your employer must provide a written apprenticeship agreement within the first 8 weeks. 
                  If you haven't received one, ask your supervisor or contact your training provider.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-elec-yellow">Training Entitlements</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">What You're Entitled To</h4>
                  <ul className="space-y-2">
                    {trainingEntitlements.map((entitlement, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <GraduationCap className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {entitlement}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Red Flags to Watch For</h4>
                  <ul className="space-y-2 text-sm text-red-400">
                    <li>• Being told "training is just watching others work"</li>
                    <li>• No structured learning programme</li>
                    <li>• Constantly being used as general labour</li>
                    <li>• No access to college or training provider</li>
                    <li>• Supervisor has no time for questions or guidance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-elec-yellow">Health & Safety Rights</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Your Safety Rights</h4>
                  <ul className="space-y-2">
                    {healthSafetyRights.map((right, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {right}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/30">
                  <h4 className="font-semibold text-red-400 mb-2">Never Accept:</h4>
                  <ul className="text-sm text-red-300 space-y-1">
                    <li>• Being asked to work without proper PPE</li>
                    <li>• Pressure to skip safety procedures</li>
                    <li>• Working alone on dangerous tasks</li>
                    <li>• Being blamed for reporting safety concerns</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessment">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-elec-yellow">End-Point Assessment Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-2">Your Rights During EPA</h4>
                  <ul className="text-sm text-green-300 space-y-1">
                    <li>• Adequate preparation time and support</li>
                    <li>• Access to all necessary equipment and materials</li>
                    <li>• Fair and unbiased assessment</li>
                    <li>• Clear feedback on performance</li>
                    <li>• Appeals process if you feel unfairly assessed</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-2">Support Available</h4>
                  <p className="text-sm text-blue-300">
                    Your employer and training provider must work together to ensure you're ready for EPA. 
                    This includes portfolio preparation, mock assessments, and addressing any knowledge gaps.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApprenticeRightsTab;
