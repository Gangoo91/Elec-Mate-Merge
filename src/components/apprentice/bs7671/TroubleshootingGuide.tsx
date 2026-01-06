
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Wrench, HelpCircle, CheckCircle, Shield } from "lucide-react";
import { BS7671StepData } from "@/data/bs7671-steps/enhancedStepData";

interface TroubleshootingGuideProps {
  stepData: BS7671StepData;
}

const TroubleshootingGuide = ({ stepData }: TroubleshootingGuideProps) => {
  if (!stepData.troubleshooting || stepData.troubleshooting.length === 0) return null;

  return (
    <Card className="bg-gradient-to-br from-white/5 to-elec-card border-orange-500/20 overflow-hidden relative animate-fade-in">
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="pb-3 relative">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30">
            <Wrench className="h-4 w-4 text-orange-400" />
          </div>
          Troubleshooting Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="relative space-y-4">
        {stepData.troubleshooting.map((troubleshoot, index) => (
          <div key={index} className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-500/20 flex-shrink-0">
                <HelpCircle className="h-4 w-4 text-orange-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">Problem: <span className="text-orange-400">{troubleshoot.issue}</span></h4>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <span className="text-xs font-medium text-orange-400 block mb-2">Possible Causes</span>
                <ul className="space-y-1.5">
                  {troubleshoot.causes.map((cause, causeIndex) => (
                    <li key={causeIndex} className="text-sm text-white/70 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <span className="text-xs font-medium text-green-400 block mb-2">Solutions</span>
                <ul className="space-y-1.5">
                  {troubleshoot.solutions.map((solution, solutionIndex) => (
                    <li key={solutionIndex} className="text-sm text-white/70 flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-elec-yellow/20 flex-shrink-0">
              <Shield className="h-4 w-4 text-elec-yellow" />
            </div>
            <div>
              <h4 className="font-semibold text-elec-yellow mb-1">Remember</h4>
              <p className="text-sm text-white/70">
                If you're unsure about any readings or issues, always consult with your supervisor
                or a qualified electrician. Safety is paramount in electrical testing.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TroubleshootingGuide;
