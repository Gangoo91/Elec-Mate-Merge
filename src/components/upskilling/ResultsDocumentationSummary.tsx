import { BookOpen, CheckCircle, AlertTriangle, FileText, Shield, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ResultsDocumentationSummary = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-foreground text-lg sm:text-xl">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
        
        {/* Key Learning Points */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">Key Learning Points</h3>
          <div className="bg-[#323232] rounded-lg p-3 sm:p-4 space-y-3">
            <div className="space-y-3">
              
              <div className="bg-green-600/10 border border-green-600/20 rounded p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-green-200 font-medium mb-2 text-sm sm:text-base">Legal Documentation Requirements</h4>
                    <ul className="text-foreground text-xs sm:text-sm space-y-1">
                      <li>• Always record actual measured values with units</li>
                      <li>• Never use subjective terms like "Pass" or "OK"</li>
                      <li>• Certificates are legal documents with serious implications</li>
                      <li>• False certification can result in prosecution</li>
                      <li>• Retain records permanently for legal protection</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-blue-200 font-medium mb-2 text-sm sm:text-base">Standards Compliance</h4>
                    <ul className="text-foreground text-xs sm:text-sm space-y-1">
                      <li>• Compare Zs values against BS7671 Appendix 3 limits</li>
                      <li>• Ensure PFC doesn't exceed device breaking capacity</li>
                      <li>• Account for temperature correction factors</li>
                      <li>• Apply appropriate safety margins</li>
                      <li>• Document any non-standard test methods</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-200 font-medium mb-2 text-sm sm:text-base">Failure Response Protocol</h4>
                    <ul className="text-foreground text-xs sm:text-sm space-y-1">
                      <li>• Stop work immediately when results fail</li>
                      <li>• Investigate root causes thoroughly</li>
                      <li>• Document actual values and proposed remedies</li>
                      <li>• Never certify installations with failed results</li>
                      <li>• Retest after corrections to confirm compliance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-600/10 border border-purple-600/20 rounded p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-purple-200 font-medium mb-2 text-sm sm:text-base">Efficient Documentation</h4>
                    <ul className="text-foreground text-xs sm:text-sm space-y-1">
                      <li>• Use systematic recording workflows</li>
                      <li>• Leverage digital systems where appropriate</li>
                      <li>• Pre-populate certificates with known details</li>
                      <li>• Check calculations and limits immediately</li>
                      <li>• Complete reviews before leaving site</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Success Factors */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">Critical Success Factors</h3>
          <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-elec-yellow font-medium text-sm sm:text-base">Technical Accuracy</h4>
                <ul className="text-foreground text-xs sm:text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Record measurements to appropriate precision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Include correct units and environmental conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Apply relevant standards and correction factors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Verify calculations and limit comparisons</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-elec-yellow font-medium text-sm sm:text-base">Professional Integrity</h4>
                <ul className="text-foreground text-xs sm:text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Never compromise on accurate recording</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Maintain independence from commercial pressure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Document limitations and unusual conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span>Provide clear, actionable recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Framework */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">Regulatory Framework Overview</h3>
          <div className="bg-[#323232] rounded-lg p-3 sm:p-4 space-y-3">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              
              <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <h4 className="text-blue-200 font-medium text-sm">BS7671 Requirements</h4>
                </div>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Maximum Zs values in Appendix 3</li>
                  <li>• Test method specifications</li>
                  <li>• Certificate format requirements</li>
                  <li>• Record keeping obligations</li>
                </ul>
              </div>

              <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-green-400" />
                  <h4 className="text-green-200 font-medium text-sm">IET Guidance</h4>
                </div>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Practical testing procedures</li>
                  <li>• Documentation best practices</li>
                  <li>• Professional competency requirements</li>
                  <li>• Industry interpretation guidance</li>
                </ul>
              </div>

              <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <h4 className="text-red-200 font-medium text-sm">Legal Obligations</h4>
                </div>
                <ul className="text-foreground text-xs space-y-1">
                  <li>• Health & Safety at Work Act</li>
                  <li>• Electricity at Work Regulations</li>
                  <li>• Building regulations compliance</li>
                  <li>• Professional indemnity requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">Preparing for Practice</h3>
          <div className="bg-elec-dark p-3 sm:p-4 rounded-md border-l-4 border-elec-yellow">
            <h4 className="text-elec-yellow font-semibold mb-3 text-sm sm:text-base">Action Points:</h4>
            <ol className="space-y-2 text-foreground text-xs sm:text-sm">
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                Review your current documentation practices against these requirements
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                Develop standardised templates and checklists for consistent recording
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                Establish secure backup and retention systems for certificates
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                Practice efficient workflows to balance speed with accuracy
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-elec-yellow text-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                Stay updated with regulatory changes and industry best practices
              </li>
            </ol>
          </div>
        </div>

        {/* Final Reminder */}
        <div className="bg-red-600/10 border border-red-600/20 rounded p-3 sm:p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-red-200 font-semibold mb-2 text-sm sm:text-base">Professional Responsibility</h4>
              <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                Remember that your signature on an electrical certificate carries significant legal weight. 
                You are personally responsible for the accuracy of all recorded information and the professional 
                judgments made. When in doubt, seek guidance from experienced colleagues or relevant authorities—never guess or compromise on safety.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};