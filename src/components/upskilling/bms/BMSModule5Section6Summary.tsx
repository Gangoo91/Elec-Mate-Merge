import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Network, GitBranch, Clock, Wrench } from 'lucide-react';

export const BMSModule5Section6Summary = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p className="text-lg text-gray-300">
          Effective network planning, segmentation, and latency management are critical for reliable BMS operation.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-3">
                <Network className="h-5 w-5 text-blue-400" />
                <h4 className="font-semibold text-blue-300">Network Planning</h4>
              </div>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Ensures reliable communication by respecting device counts, cable lengths, and topology rules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Prevents data clashes and communication failures through proper system design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Must be done during initial design phase for cost-effective implementation</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-3">
                <GitBranch className="h-5 w-5 text-green-400" />
                <h4 className="font-semibold text-green-300">Segmentation</h4>
              </div>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Reduces congestion by distributing devices across multiple network sections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Isolates faults to prevent system-wide failures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Supports future expansion without affecting existing performance</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-5 w-5 text-yellow-400" />
                <h4 className="font-semibold text-yellow-300">Latency Management</h4>
              </div>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Occurs when networks are overloaded or poorly wired</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Must be kept low for safe operation, especially in life safety systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Target: under 1 second for general BMS, under 100ms for safety systems</span>
                </li>
              </ul>
            </div>

            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-3">
                <Wrench className="h-5 w-5 text-purple-400" />
                <h4 className="font-semibold text-purple-300">Electrician's Role</h4>
              </div>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Ensure physical layer integrity through proper cabling and termination</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Maintain clear labelling and accurate documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Support commissioning with proper testing and verification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/20 border border-blue-600/40 rounded-lg p-6">
          <h4 className="font-semibold text-blue-200 mb-3 text-lg">Key Takeaways</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-blue-300 mb-2">Planning Phase:</p>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• Calculate device counts and cable lengths</li>
                <li>• Plan segmentation strategy early</li>
                <li>• Coordinate with IT for network infrastructure</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-blue-300 mb-2">Installation Phase:</p>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• Follow protocol specifications exactly</li>
                <li>• Use proper cabling and termination</li>
                <li>• Test and document thoroughly</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-600/20 border border-green-600/40 rounded-lg p-4">
          <p className="text-green-100 font-medium">
            <strong>Remember:</strong> A well-planned network is the foundation of a reliable BMS. Invest time in proper design and installation to avoid costly problems later.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};