import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, AlertTriangle, FileX, Clock, XCircle, CheckCircle2, GraduationCap } from 'lucide-react';

export const EmergencyLightingModule5Section6RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-6 w-6 text-elec-yellow" />
          Real-World Case Study
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-5">
          <h3 className="text-xl font-bold text-foreground mb-3">London Commercial Landlord Case Study</h3>
          <p className="text-sm sm:text-base text-gray-300 italic">
            This case demonstrates why formal handover documentation is as critical as the installation itself.
          </p>
        </div>

        {/* Project Context */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-blue-400 flex-shrink-0" />
            <h4 className="text-lg font-semibold text-blue-400">Project Context</h4>
          </div>
          <div className="ml-0 sm:ml-8 bg-gray-800 p-4 rounded-lg border border-blue-500/20">
            <p className="text-sm sm:text-base lg:text-lg text-foreground">
              A commercial landlord in London commissioned a complete emergency lighting system installation 
              for a multi-tenant office building. The system was installed correctly, tested, and left fully operational. 
              However, the contractor completed the work during a busy period and did not arrange a formal handover meeting.
            </p>
          </div>
        </div>

        {/* The Problem */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0" />
            <h4 className="text-lg font-semibold text-amber-400">The Problem</h4>
          </div>
          <div className="ml-0 sm:ml-8 bg-gray-800 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm sm:text-base lg:text-lg text-foreground mb-3">
              The contractor assumed a verbal confirmation was sufficient and left without:
            </p>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span className="text-foreground">Providing formal commissioning certificates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span className="text-foreground">Issuing an emergency lighting logbook</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span className="text-foreground">Training the landlord or facilities manager</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span className="text-foreground">Obtaining a signed handover form</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Consequences */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FileX className="h-5 w-5 text-red-400 flex-shrink-0" />
            <h4 className="text-lg font-semibold text-red-400">Consequences</h4>
          </div>
          <div className="ml-0 sm:ml-8 bg-gray-800 p-4 rounded-lg border border-red-500/20">
            <p className="text-sm sm:text-base lg:text-lg text-foreground">
              Six months later, the fire authority requested maintenance records during a routine inspection. 
              The landlord had no logbook, no certificates, and no record of any tests being performed. The 
              landlord blamed the installer for not providing documentation.
            </p>
          </div>
        </div>

        {/* Impact */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-orange-400 flex-shrink-0" />
            <h4 className="text-lg font-semibold text-orange-400">Impact</h4>
          </div>
          <div className="ml-0 sm:ml-8 bg-gray-800 p-4 rounded-lg border border-orange-500/20">
            <p className="text-sm sm:text-base lg:text-lg text-foreground mb-3">
              Because no handover documentation was signed, the contractor could not prove they had completed the handover process:
            </p>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span className="text-foreground">Contractor was legally obligated to revisit the site</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span className="text-foreground">Full re-commissioning and testing required</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span className="text-foreground">Certificates and logbook reissued at contractor's expense</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span className="text-foreground">Formal training session provided six months late</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span className="text-foreground">Contractor's reputation damaged and profit margin lost</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Root Cause */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <XCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
            <h4 className="text-lg font-semibold text-purple-400">Root Cause</h4>
          </div>
          <div className="ml-0 sm:ml-8 bg-gray-800 p-4 rounded-lg border border-purple-500/20">
            <p className="text-sm sm:text-base lg:text-lg text-foreground">
              The contractor issued a verbal confirmation instead of formal written handover. Without a signed 
              handover form, they had no proof that documentation was provided or that the client acknowledged 
              receipt. The system physically worked, but legally it was considered "non-verified" and "non-handed-over."
            </p>
          </div>
        </div>

        {/* Resolution */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
            <h4 className="text-lg font-semibold text-green-400">Resolution</h4>
          </div>
          <div className="ml-0 sm:ml-8 bg-gray-800 p-4 rounded-lg border border-green-500/20">
            <p className="text-sm sm:text-base lg:text-lg text-foreground">
              The contractor returned to site, performed full re-testing, issued complete documentation, 
              conducted formal training, and obtained signed handover confirmation. The process took two 
              additional site visits and cost the contractor significant time and money.
            </p>
          </div>
        </div>

        {/* Lessons Learned */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-elec-yellow flex-shrink-0" />
            <h4 className="text-lg font-semibold text-elec-yellow">Lessons Learned</h4>
          </div>
          <div className="ml-0 sm:ml-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-5">
            <ul className="space-y-3 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">1.</span>
                <span className="text-foreground"><strong>A signed handover form is mandatory</strong> — verbal confirmations have no legal standing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">2.</span>
                <span className="text-foreground"><strong>Documentation must be formally delivered</strong> — never leave it at reception or with an unknown person</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">3.</span>
                <span className="text-foreground"><strong>Training is part of handover</strong> — clients must understand their legal obligations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">4.</span>
                <span className="text-foreground"><strong>Physical functionality ≠ legal compliance</strong> — without handover, the system is considered incomplete</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">5.</span>
                <span className="text-foreground"><strong>Professional protection requires proof</strong> — retain signed handover records for minimum six years</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-sm sm:text-base text-foreground font-semibold">
            ⚠️ Key Takeaway: This incident shows that a signed handover is as important as the installation itself. 
            Without formal documentation, even a perfect installation can result in legal liability, financial loss, 
            and professional reputation damage.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
