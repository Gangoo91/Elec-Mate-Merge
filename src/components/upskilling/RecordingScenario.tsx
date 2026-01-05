
import { Users, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RecordingScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="h-5 w-5 text-elec-yellow" />
          On-the-Job Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-6">
          <h3 className="text-blue-200 font-semibold text-lg mb-4">The Undocumented Hazard</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-foreground font-medium mb-2">Situation</h4>
              <p className="text-foreground leading-relaxed">
                During a routine domestic EICR, you find that RCD protection is absent on a socket circuit near a sink in a kitchen. 
                You notice the issue and make a mental note, but you don't mark it on the certificate because you're running late 
                and plan to mention it verbally to the client. Six months later, a serious shock incident occurs at that socket.
              </p>
            </div>

            <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
              <h4 className="text-red-200 font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Critical Analysis
              </h4>
              <p className="text-foreground text-sm leading-relaxed">
                <strong>You are at fault.</strong> Omissions in documentation can be as serious as testing errors. 
                By failing to record this C1 observation (immediate danger), you have:
              </p>
              <ul className="mt-3 space-y-1 text-foreground text-sm ml-4">
                <li>• Failed in your professional duty to identify and document hazards</li>
                <li>• Left the client unaware of a serious safety risk</li>
                <li>• Created potential legal liability for yourself</li>
                <li>• Compromised the validity of the entire inspection</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#323232] rounded-lg p-4">
                <h4 className="text-foreground font-medium mb-3">What Should Have Happened</h4>
                <ul className="space-y-2 text-foreground text-sm">
                  <li>• Record C1 observation immediately</li>
                  <li>• Reference Regulation 411.3.3</li>
                  <li>• Advise immediate remedial action</li>
                  <li>• Consider recommending isolation</li>
                  <li>• Provide clear written explanation</li>
                </ul>
              </div>

              <div className="bg-[#323232] rounded-lg p-4">
                <h4 className="text-foreground font-medium mb-3">Professional Consequences</h4>
                <ul className="space-y-2 text-foreground text-sm">
                  <li>• Professional liability claims</li>
                  <li>• Insurance policy voidance</li>
                  <li>• Regulatory body sanctions</li>
                  <li>• Criminal liability potential</li>
                  <li>• Reputation damage</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <h4 className="text-yellow-200 font-medium mb-2">Key Learning Point</h4>
              <p className="text-foreground text-sm leading-relaxed">
                <strong>Documentation is not optional - it's a legal and professional requirement.</strong> 
                Every hazard, defect, and non-compliance must be recorded accurately and completely. 
                Verbal advice has no legal standing - if it's not written down, it didn't happen.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <h3 className="text-green-200 font-medium mb-3">Professional Standards Reminder</h3>
          <p className="text-foreground text-sm leading-relaxed">
            Time pressure never justifies cutting corners on documentation. If you don't have time to document properly, 
            you don't have time to inspect properly. Schedule adequate time for complete and accurate record-keeping 
            as an integral part of every inspection.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
