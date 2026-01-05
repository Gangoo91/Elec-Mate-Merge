import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

const SmartHomeModule7Section6RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Case Study: Smart Lighting Warranty Dispute in Bristol</h4>
          
          <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-red-200 mb-2">The Incident</h5>
                <p className="text-red-100 text-sm mb-3">
                  A smart lighting installation failed six months after completion, leading to a warranty dispute:
                </p>
                <ul className="space-y-1 text-red-100 text-sm ml-4">
                  <li>• Multiple LED smart bulbs stopped responding to commands</li>
                  <li>• Client initially blamed the installer for poor workmanship</li>
                  <li>• No clear documentation about warranty coverage</li>
                  <li>• Installation records were incomplete and hard to locate</li>
                  <li>• Confusion about whether issue was electrical or device failure</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-amber-200 mb-2">The Initial Problems</h5>
                <p className="text-amber-100 text-sm mb-3">
                  Poor documentation led to multiple issues:
                </p>
                <ul className="space-y-1 text-amber-100 text-sm ml-4">
                  <li>• Client couldn't find warranty cards or receipts</li>
                  <li>• Installer had no detailed device records</li>
                  <li>• Manufacturer required proof of purchase dates</li>
                  <li>• No clear process for handling warranty claims</li>
                  <li>• Client relationship became strained and adversarial</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-green-200 mb-2">The Professional Resolution</h5>
                <p className="text-green-100 text-sm mb-3">
                  Fortunately, the electrician had maintained proper backup documentation:
                </p>
                <ul className="space-y-1 text-green-100 text-sm ml-4">
                  <li>• Retrieved complete device inventory with serial numbers</li>
                  <li>• Provided full documentation package including:</li>
                  <li className="ml-4">- Circuit test results showing proper installation</li>
                  <li className="ml-4">- Manufacturer warranty cards with purchase dates</li>
                  <li className="ml-4">- Device configuration notes and firmware versions</li>
                  <li>• Demonstrated that electrical installation was compliant</li>
                  <li>• Helped client successfully claim manufacturer warranty</li>
                  <li>• Maintained professional relationship and gained client trust</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Key Lessons Learned</h5>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Documentation protects everyone:</strong> Good records saved the installer from liability
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Backup systems are essential:</strong> Secure storage prevented loss of critical information
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Clear warranty explanation prevents disputes:</strong> Upfront communication avoids conflicts
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Detailed device records enable warranty claims:</strong> Serial numbers and dates are crucial
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Professional handling builds trust:</strong> Proper documentation demonstrated competence
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Client education is ongoing:</strong> Help clients understand warranty processes
              </li>
            </ul>
          </div>

          <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
            <h5 className="font-semibold text-blue-200 mb-2">Outcome</h5>
            <p className="text-blue-100 text-sm">
              The manufacturer replaced the faulty devices under warranty at no cost to the client. 
              The electrician's professional documentation and helpful approach during the warranty claim 
              not only resolved the immediate issue but strengthened the client relationship, 
              leading to additional work and positive referrals.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section6RealWorld;