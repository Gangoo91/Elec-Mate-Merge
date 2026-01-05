import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText, Shield, Lightbulb } from 'lucide-react';

export const EmergencyLightingModule5Section6Summary = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-8">
        
        {/* Key Points */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">Key Points to Remember</h3>
          </div>
          
          <div className="space-y-3">
            <div className="border-l-4 border-green-500 bg-green-500/10 p-4 rounded-r-lg">
              <p className="text-sm sm:text-base lg:text-lg text-foreground">
                <strong>Handover Transfers Responsibility:</strong> A formal handover marks the point where legal 
                responsibility for testing and maintenance transfers from installer to client's Responsible Person 
                under Fire Safety Order 2005.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 bg-blue-500/10 p-4 rounded-r-lg">
              <p className="text-sm sm:text-base lg:text-lg text-foreground">
                <strong>Complete Documentation Package:</strong> Handover must include commissioning certificates, 
                electrical certificates, as-built drawings, logbook, maintenance instructions, training notes, and 
                contact details — both digital and printed.
              </p>
            </div>
            
            <div className="border-l-4 border-purple-500 bg-purple-500/10 p-4 rounded-r-lg">
              <p className="text-sm sm:text-base lg:text-lg text-foreground">
                <strong>Client Training is Essential:</strong> Before leaving site, demonstrate test procedures, 
                system operation, fault indicators, and logbook entries. Walk through escape routes and explain 
                maintenance requirements.
              </p>
            </div>
            
            <div className="border-l-4 border-red-500 bg-red-500/10 p-4 rounded-r-lg">
              <p className="text-sm sm:text-base lg:text-lg text-foreground">
                <strong>Signed Handover Form is Mandatory:</strong> Without written acknowledgement, contractors 
                remain liable for maintenance failures. Always obtain client signature and retain copies for 
                minimum six years.
              </p>
            </div>
          </div>
        </div>

        {/* Handover Checklist */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">Client Handover Checklist</h3>
          </div>
          
          <div className="bg-gray-800 p-5 rounded-lg border border-gray-600 space-y-3">
            <p className="text-sm sm:text-base text-foreground font-semibold mb-3">
              Before leaving site, ensure you have completed:
            </p>
            <div className="space-y-2 text-sm sm:text-base">
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-500 text-elec-yellow focus:ring-elec-yellow" />
                <label className="text-foreground">Formal handover meeting scheduled with Responsible Person or facilities team</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-500 text-elec-yellow focus:ring-elec-yellow" />
                <label className="text-foreground">Complete documentation package assembled (certificates, drawings, logbook, manuals)</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-500 text-elec-yellow focus:ring-elec-yellow" />
                <label className="text-foreground">Digital copies provided (PDF or USB drive)</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-500 text-elec-yellow focus:ring-elec-yellow" />
                <label className="text-foreground">Site walkthrough completed showing luminaire coverage and escape routes</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-500 text-elec-yellow focus:ring-elec-yellow" />
                <label className="text-foreground">Monthly and annual test procedures demonstrated</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-500 text-elec-yellow focus:ring-elec-yellow" />
                <label className="text-foreground">Test switches, monitoring systems, and fault indicators explained</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-500 text-elec-yellow focus:ring-elec-yellow" />
                <label className="text-foreground">Logbook entries and record-keeping explained</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-500 text-elec-yellow focus:ring-elec-yellow" />
                <label className="text-foreground">Battery replacement intervals and maintenance requirements explained</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-500 text-elec-yellow focus:ring-elec-yellow" />
                <label className="text-foreground">Legal consequences of non-compliance explained</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-500 text-elec-yellow focus:ring-elec-yellow" />
                <label className="text-foreground">Handover form signed by client and installer</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-500 text-elec-yellow focus:ring-elec-yellow" />
                <label className="text-foreground">Signed copies retained by both parties</label>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-500 text-elec-yellow focus:ring-elec-yellow" />
                <label className="text-foreground">30-day follow-up check scheduled</label>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Benefits */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">Professional Benefits of Proper Handover</h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-lg p-5 space-y-3">
              <h4 className="font-semibold text-green-400 text-sm sm:text-base">Legal Protection</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground">Proves responsibility transferred</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground">Protects against liability claims</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-foreground">Demonstrates professional standards</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-5 space-y-3">
              <h4 className="font-semibold text-blue-400 text-sm sm:text-base">Business Benefits</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">✓</span>
                  <span className="text-foreground">Builds client trust and confidence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">✓</span>
                  <span className="text-foreground">Reduces future call-backs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">✓</span>
                  <span className="text-foreground">Generates referrals and repeat business</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-elec-yellow font-bold mb-3 text-base sm:text-lg">Key Takeaway for Electricians</h4>
              <p className="text-sm sm:text-base lg:text-lg text-foreground leading-relaxed">
                A formal handover is the final — and essential — stage of any emergency lighting installation. 
                Without proper documentation, training, and signed acknowledgement, even a perfectly installed system 
                remains legally incomplete. Professional handover protects contractors from liability, ensures clients 
                understand their obligations, and demonstrates the quality and thoroughness that builds long-term business 
                relationships. Always schedule dedicated time for handover — never rush it or skip it.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
