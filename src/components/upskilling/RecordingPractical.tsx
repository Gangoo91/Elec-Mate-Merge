import { Wrench, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const RecordingPractical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Learning Exercises
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Exercise 1 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Exercise 1</Badge>
            <h3 className="text-foreground font-semibold">Observation Code Classification</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              Practice classifying common defects using appropriate observation codes:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-red-400 font-medium">C1 - Immediate Danger:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Live parts accessible to touch</li>
                  <li>• Missing earthing conductor</li>
                  <li>• Damaged cable with live conductors exposed</li>
                  <li>• Non-functioning RCD protecting socket outlets</li>
                  <li>• Reversed polarity on lighting circuits</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-yellow-400 font-medium">C2 - Potentially Dangerous:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Inadequate earthing arrangements</li>
                  <li>• Overloaded circuits</li>
                  <li>• Missing circuit protection</li>
                  <li>• Incorrect cable size for load</li>
                  <li>• Damaged enclosures allowing moisture ingress</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 2 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Exercise 2</Badge>
            <h3 className="text-foreground font-semibold">Defect Description Workshop</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              Learn to write clear, precise defect descriptions:
            </p>
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-medium mb-2">Bad vs Good Descriptions:</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-red-300 text-sm"><strong>Bad:</strong> "Socket looks damaged"</p>
                      <p className="text-green-300 text-sm"><strong>Good:</strong> "Socket outlet in kitchen shows thermal damage to faceplate with burn marks around live terminal. Terminal screw loose causing poor connection. Regulation 134.1.1"</p>
                    </div>
                    <div>
                      <p className="text-red-300 text-sm"><strong>Bad:</strong> "Cable might be wrong size"</p>
                      <p className="text-green-300 text-sm"><strong>Good:</strong> "2.5mm² T&E cable feeding 32A MCB in garage distribution board. Cable undersized for protective device rating. Regulation 433.1"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 3 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Exercise 3</Badge>
            <h3 className="text-foreground font-semibold">Certificate Completion Practice</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              Practice completing different electrical certificates correctly:
            </p>
            <div className="space-y-3">
              <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2">EICR Completion Checklist:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>□ Extent and limitations clearly stated</li>
                  <li>□ All observation codes justified with descriptions</li>
                  <li>□ Recommendations prioritised appropriately</li>
                  <li>□ Next inspection date recommended</li>
                  <li>□ Inspector details and signature included</li>
                </ul>
              </div>
              <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                <h4 className="text-purple-400 font-medium mb-2">EIC Completion Checklist:</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>□ Design details completed accurately</li>
                  <li>□ Installation method documented</li>
                  <li>□ Test results recorded in correct units</li>
                  <li>□ Departures from BS 7671 justified</li>
                  <li>□ All required signatures obtained</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise 4 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Exercise 4</Badge>
            <h3 className="text-foreground font-semibold">Limitation Documentation Exercise</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground">
              Practice documenting inspection limitations clearly and comprehensively:
            </p>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="text-yellow-400 font-medium mb-2">Limitation Examples:</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-foreground text-sm font-medium">Example 1: Physical Access</h5>
                      <p className="text-foreground text-sm">
                        <strong>Poor:</strong> "Some areas couldn't be accessed"<br/>
                        <strong>Better:</strong> "Basement distribution board could not be accessed - locked room, key not available from client. Approximately 40% of installation circuits originate from this location."
                      </p>
                    </div>
                    <div>
                      <h5 className="text-foreground text-sm font-medium">Example 2: Equipment Issues</h5>
                      <p className="text-foreground text-sm">
                        <strong>Poor:</strong> "Equipment problems"<br/>
                        <strong>Better:</strong> "RCD testing could not be completed - RCD/RCBO test facility on multifunction tester failed calibration check. Alternative RCD tester not available on inspection date."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="text-green-400 font-medium mb-2">Key Learning Points</h4>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Accurate observation codes ensure appropriate action is taken</li>
                <li>• Precise defect descriptions provide legal protection and clear guidance</li>
                <li>• Complete certificate information demonstrates professional competence</li>
                <li>• Comprehensive limitation documentation protects all parties</li>
                <li>• Quality record keeping supports industry safety standards</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};