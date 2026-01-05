import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Building, Home } from 'lucide-react';

export const SmartHomeModule2Section2RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="text-lg font-medium text-foreground mb-4">
          An installer is working on two different projects with distinct requirements. Each calls for a different protocol approach.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Project A */}
          <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Building className="h-6 w-6 text-blue-400" />
              <h4 className="font-semibold text-foreground">Project A: Modern Apartment</h4>
            </div>
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-blue-200">Property:</span>
                <span className="text-gray-300 ml-2">2-bedroom modern apartment, 900 sq ft</span>
              </div>
              <div>
                <span className="font-medium text-blue-200">Requirements:</span>
                <span className="text-gray-300 ml-2">60+ smart bulbs, colour-changing lighting throughout</span>
              </div>
              <div>
                <span className="font-medium text-blue-200">Budget:</span>
                <span className="text-gray-300 ml-2">Cost-conscious, wants maximum devices for money</span>
              </div>
              <div>
                <span className="font-medium text-blue-200">Challenges:</span>
                <span className="text-gray-300 ml-2">Dense device deployment, budget constraints</span>
              </div>
              
              <div className="mt-4 p-3 bg-blue-900/30 border border-blue-700 rounded">
                <h5 className="font-medium text-blue-200 mb-2">Recommended: Zigbee</h5>
                <ul className="space-y-1 text-blue-100 text-xs">
                  <li>• Can easily handle 60+ devices</li>
                  <li>• Wide selection of affordable bulbs</li>
                  <li>• Good coverage in compact space</li>
                  <li>• Mesh grows with each bulb added</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Project B */}
          <div className="p-4 bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-600 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Home className="h-6 w-6 text-green-400" />
              <h4 className="font-semibold text-foreground">Project B: Large Detached Home</h4>
            </div>
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-green-200">Property:</span>
                <span className="text-gray-300 ml-2">5-bedroom stone house, 3,500 sq ft, thick walls</span>
              </div>
              <div>
                <span className="font-medium text-green-200">Requirements:</span>
                <span className="text-gray-300 ml-2">Security system, access control, lighting control</span>
              </div>
              <div>
                <span className="font-medium text-green-200">Budget:</span>
                <span className="text-gray-300 ml-2">Premium installation, reliability priority</span>
              </div>
              <div>
                <span className="font-medium text-green-200">Challenges:</span>
                <span className="text-gray-300 ml-2">Thick stone walls, long distances, security critical</span>
              </div>
              
              <div className="mt-4 p-3 bg-green-900/30 border border-green-700 rounded">
                <h5 className="font-medium text-green-200 mb-2">Recommended: Z-Wave</h5>
                <ul className="space-y-1 text-green-100 text-xs">
                  <li>• Superior wall penetration</li>
                  <li>• Excellent range for large property</li>
                  <li>• Reliable for security applications</li>
                  <li>• Professional-grade performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <span>💭</span>
            Discussion Question
          </h4>
          <p className="text-gray-300 font-medium mb-2">
            Which protocol would you choose for each project and why?
          </p>
          <p className="text-sm text-gray-400">
            Consider factors like device count, range requirements, building materials, budget, and reliability needs...
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">Project A Analysis</h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-blue-900/20 border border-blue-600 rounded">
                <span className="text-blue-300 font-medium">Best Choice: Zigbee</span>
              </div>
              <ul className="space-y-1 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span>Handles 60+ devices easily</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span>Cost-effective bulb options</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span>Adequate range for apartment</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span>Strong mesh with many devices</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">Project B Analysis</h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-green-900/20 border border-green-600 rounded">
                <span className="text-green-300 font-medium">Best Choice: Z-Wave</span>
              </div>
              <ul className="space-y-1 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span>Penetrates thick stone walls</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span>Long range for large property</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span>No Wi-Fi interference</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span>Reliable for security systems</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3">Key Learning Points</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-purple-200 mb-2">Protocol Selection Factors</h5>
              <ul className="space-y-1 text-purple-100">
                <li>• Number of devices needed</li>
                <li>• Building materials and size</li>
                <li>• Budget constraints</li>
                <li>• Reliability requirements</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-pink-200 mb-2">Installation Success</h5>
              <ul className="space-y-1 text-pink-100">
                <li>• Match protocol to use case</li>
                <li>• Consider physical environment</li>
                <li>• Plan for future expansion</li>
                <li>• Prioritise critical functions</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};