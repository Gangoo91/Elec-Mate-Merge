
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Shield, FileText, Clock, Phone, CheckCircle } from "lucide-react";

const IncidentGuidelines = () => {
  return (
    <div className="space-y-6">
      <Alert className="border-red-500/20 bg-red-500/5">
        <AlertTriangle className="h-4 w-4 text-red-500" />
        <AlertDescription className="text-red-400">
          <strong>Emergency First:</strong> If anyone is injured or there's immediate danger, call 999 first. 
          Complete this form only after ensuring everyone's safety.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* When to Report */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              When to Report Incidents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-400">Immediately Report:</h4>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                    <li>• Any injuries requiring first aid or medical treatment</li>
                    <li>• Dangerous occurrences or near misses</li>
                    <li>• Equipment failures that could cause harm</li>
                    <li>• Environmental incidents (spills, emissions)</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-400">Report Within 24 Hours:</h4>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                    <li>• Minor equipment malfunctions</li>
                    <li>• Unsafe working conditions</li>
                    <li>• Property damage incidents</li>
                    <li>• Security breaches or concerns</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Requirements */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-elec-yellow" />
              Legal Requirements (UK)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-elec-yellow mb-2">Health and Safety at Work Act 1974</h4>
                <p className="text-sm text-muted-foreground">
                  Employees have a duty to report incidents that could affect health and safety.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-elec-yellow mb-2">RIDDOR Regulations</h4>
                <p className="text-sm text-muted-foreground">
                  Certain incidents must be reported to the HSE within specific timeframes:
                </p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Deaths and major injuries: immediately</li>
                  <li>• Over-7-day injuries: within 15 days</li>
                  <li>• Dangerous occurrences: immediately</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-elec-yellow mb-2">Data Protection</h4>
                <p className="text-sm text-muted-foreground">
                  Personal information in incident reports is protected under UK GDPR.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Report Effectively */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              How to Report Effectively
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Be Factual and Objective</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Stick to facts, avoid opinions or blame</li>
                  <li>• Use clear, simple language</li>
                  <li>• Include specific times, locations, and conditions</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-blue-400 mb-2">Include All Relevant Details</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Weather conditions (for outdoor incidents)</li>
                  <li>• Equipment involved (model numbers, condition)</li>
                  <li>• People involved (witnesses, supervisors)</li>
                  <li>• Actions taken immediately after the incident</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-blue-400 mb-2">Supporting Evidence</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Take photos if safe to do so</li>
                  <li>• Preserve physical evidence where possible</li>
                  <li>• Get witness statements</li>
                  <li>• Keep any relevant documentation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-elec-yellow" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h4 className="font-medium text-red-400 mb-2">Emergency Services</h4>
                <p className="text-2xl font-bold text-red-400">999</p>
                <p className="text-sm text-muted-foreground">For immediate medical assistance or fire/police response</p>
              </div>

              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-medium text-blue-400 mb-2">HSE Incident Contact Centre</h4>
                <p className="text-lg font-bold text-blue-400">0345 300 9923</p>
                <p className="text-sm text-muted-foreground">For reporting RIDDOR incidents</p>
              </div>

              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="font-medium text-green-400 mb-2">Site Safety Officer</h4>
                <p className="text-sm text-muted-foreground">
                  Contact your site safety officer or supervisor for non-emergency incidents
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Common Incident Types */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Common Electrical Industry Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-elec-dark/50 rounded-lg">
              <h4 className="font-medium text-red-400 mb-2">Electrical Shock/Burns</h4>
              <p className="text-sm text-muted-foreground">
                Contact with live electrical parts, arc flash incidents, electrical burns
              </p>
            </div>

            <div className="p-4 bg-elec-dark/50 rounded-lg">
              <h4 className="font-medium text-orange-400 mb-2">Falls from Height</h4>
              <p className="text-sm text-muted-foreground">
                Falls from ladders, scaffolding, or elevated work platforms
              </p>
            </div>

            <div className="p-4 bg-elec-dark/50 rounded-lg">
              <h4 className="font-medium text-yellow-400 mb-2">Equipment Failures</h4>
              <p className="text-sm text-muted-foreground">
                Tool malfunctions, PPE failures, testing equipment issues
              </p>
            </div>

            <div className="p-4 bg-elec-dark/50 rounded-lg">
              <h4 className="font-medium text-green-400 mb-2">Manual Handling</h4>
              <p className="text-sm text-muted-foreground">
                Back injuries, muscle strains from lifting heavy equipment or materials
              </p>
            </div>

            <div className="p-4 bg-elec-dark/50 rounded-lg">
              <h4 className="font-medium text-blue-400 mb-2">Environmental</h4>
              <p className="text-sm text-muted-foreground">
                Chemical spills, improper waste disposal, environmental contamination
              </p>
            </div>

            <div className="p-4 bg-elec-dark/50 rounded-lg">
              <h4 className="font-medium text-purple-400 mb-2">Near Misses</h4>
              <p className="text-sm text-muted-foreground">
                Incidents that could have resulted in injury but didn't
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card className="border-blue-500/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-blue-400">Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium mb-1">HSE Website</h4>
              <p className="text-sm text-muted-foreground">
                Visit hse.gov.uk for comprehensive guidance on workplace health and safety reporting
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Training Requirements</h4>
              <p className="text-sm text-muted-foreground">
                Regular safety training helps identify and prevent incidents. Ensure you're up to date with current requirements.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Anonymous Reporting</h4>
              <p className="text-sm text-muted-foreground">
                If you have concerns about reporting openly, speak to your safety representative about anonymous reporting options.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentGuidelines;
