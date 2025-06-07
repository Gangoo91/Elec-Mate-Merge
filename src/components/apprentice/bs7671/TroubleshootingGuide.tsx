
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Wrench, HelpCircle, CheckCircle } from "lucide-react";
import { BS7671StepData } from "@/data/bs7671-steps/enhancedStepData";

interface TroubleshootingGuideProps {
  stepData: BS7671StepData;
}

const TroubleshootingGuide = ({ stepData }: TroubleshootingGuideProps) => {
  if (!stepData.troubleshooting || stepData.troubleshooting.length === 0) return null;

  return (
    <Card className="border-amber-500/30 bg-amber-500/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-amber-300">
          <Wrench className="h-5 w-5" />
          Troubleshooting Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {stepData.troubleshooting.map((troubleshoot, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-start gap-2">
                <HelpCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <h4 className="font-medium text-amber-300">Problem: {troubleshoot.issue}</h4>
                  
                  <div>
                    <span className="text-sm font-medium text-amber-200">Possible Causes:</span>
                    <ul className="mt-1 space-y-1">
                      {troubleshoot.causes.map((cause, causeIndex) => (
                        <li key={causeIndex} className="text-sm text-amber-100 flex items-start gap-2 ml-2">
                          <span className="text-amber-400 mt-1">•</span>
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-green-300">Solutions:</span>
                    <ul className="mt-1 space-y-1">
                      {troubleshoot.solutions.map((solution, solutionIndex) => (
                        <li key={solutionIndex} className="text-sm text-green-100 flex items-start gap-2 ml-2">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {index < stepData.troubleshooting.length - 1 && (
                <div className="border-t border-amber-500/20 pt-3" />
              )}
            </div>
          ))}
        </div>

        <Alert className="mt-4 bg-amber-500/10 border-amber-500/30">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200 text-sm">
            <strong>Remember:</strong> If you're unsure about any readings or issues, always consult with your supervisor 
            or a qualified electrician. Safety is paramount in electrical testing.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default TroubleshootingGuide;
