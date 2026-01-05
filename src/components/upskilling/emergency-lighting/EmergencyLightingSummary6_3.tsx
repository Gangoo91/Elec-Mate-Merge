import { BookmarkCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingSummary6_3 = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-600/10 to-blue-800/10 border border-blue-600/30 shadow-lg">
      <CardHeader>
        <CardTitle className="text-blue-400 flex items-center gap-2">
          <BookmarkCheck className="h-5 w-5 drop-shadow-md" />
          Key Takeaways: Emergency Lighting in Risk Assessments
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-800/30 border border-gray-600/50 rounded-lg p-4">
            <h4 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">📋</span>
              Risk Assessment Fundamentals
            </h4>
            <ul className="list-disc pl-4 space-y-2 text-sm text-gray-300">
              <li>Fire risk assessment is the legal foundation for emergency lighting design</li>
              <li>Must consider occupant type, vulnerability, building use, and layout</li>
              <li>BS 5266-1 translates risk findings into technical requirements</li>
              <li>Review required annually or after building changes</li>
            </ul>
          </div>
          
          <div className="bg-gray-800/30 border border-gray-600/50 rounded-lg p-4">
            <h4 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">⚡</span>
              Design Implications
            </h4>
            <ul className="list-disc pl-4 space-y-2 text-sm text-gray-300">
              <li>Low risk: 1-hour duration, basic escape route lighting</li>
              <li>Medium risk: 3-hour duration, anti-panic lighting</li>
              <li>High risk: 3-hour minimum, enhanced systems, redundancy</li>
              <li>Never use generic designs — tailor to assessed risks</li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-800/30 border border-gray-600/50 rounded-lg p-4">
            <h4 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">🔧</span>
              Practical Application
            </h4>
            <ul className="list-disc pl-4 space-y-2 text-sm text-gray-300">
              <li>Engage with fire risk assessor during design phase</li>
              <li>Document all decisions with reference to risk findings</li>
              <li>Keep risk assessment with emergency lighting logbook</li>
              <li>Never compromise on safety to reduce costs</li>
            </ul>
          </div>

          <div className="bg-gray-800/30 border border-gray-600/50 rounded-lg p-4">
            <h4 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              Common Mistakes
            </h4>
            <ul className="list-disc pl-4 space-y-2 text-sm text-gray-300">
              <li>Ignoring risk assessment to save money</li>
              <li>Using 1-hour duration in high-risk premises</li>
              <li>Failing to review after building alterations</li>
              <li>Missing documentation of design rationale</li>
            </ul>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-elec-yellow/20 to-yellow-600/20 border border-elec-yellow/30 rounded-lg">
          <p className="text-elec-yellow font-medium text-sm">
            <span className="font-bold">Remember:</span> The fire risk assessment is not a suggestion — 
            it's a legal requirement that drives every aspect of emergency lighting design. Ignoring it 
            leads to non-compliance, fines, and potentially tragic consequences. Always design to the 
            assessed risk level from day one.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
