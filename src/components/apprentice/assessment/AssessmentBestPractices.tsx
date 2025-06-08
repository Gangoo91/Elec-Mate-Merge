
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Users, FileText } from "lucide-react";

const AssessmentBestPractices = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-elec-yellow">Assessment Best Practices</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">Before Starting Work</h3>
                <ul className="text-sm space-y-1 text-elec-light/80">
                  <li>• Always complete pre-job assessment</li>
                  <li>• Verify all safety equipment is available</li>
                  <li>• Review method statements and risk assessments</li>
                  <li>• Ensure communication plan is in place</li>
                  <li>• Check weather conditions and forecasts</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">During Assessment</h3>
                <ul className="text-sm space-y-1 text-elec-light/80">
                  <li>• Document all findings clearly</li>
                  <li>• Take photographs where appropriate</li>
                  <li>• Involve experienced colleagues when uncertain</li>
                  <li>• Don't proceed if conditions are unsafe</li>
                  <li>• Regular reassessment as work progresses</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">Team Communication</h3>
                <ul className="text-sm space-y-1 text-elec-light/80">
                  <li>• Share assessment findings with all team members</li>
                  <li>• Ensure everyone understands the risks</li>
                  <li>• Establish clear communication protocols</li>
                  <li>• Regular safety briefings throughout the day</li>
                  <li>• Encourage team members to raise concerns</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">Documentation</h3>
                <ul className="text-sm space-y-1 text-elec-light/80">
                  <li>• Complete all required forms accurately</li>
                  <li>• Store digital copies securely</li>
                  <li>• Include relevant photos and measurements</li>
                  <li>• Note any unusual conditions or findings</li>
                  <li>• Ensure assessments are signed and dated</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-2">⚠️ Remember: When in Doubt, Stop and Ask</h4>
          <p className="text-sm text-muted-foreground">
            If you're unsure about any aspect of the site assessment, don't proceed. 
            Contact your supervisor, mentor, or a qualified electrician for guidance. 
            It's always better to ask questions than to compromise safety.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentBestPractices;
