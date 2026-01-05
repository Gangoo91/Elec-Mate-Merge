import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Route, 
  MapPin, 
  Settings, 
  TestTube,
  Lightbulb,
  Eye,
  Navigation,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

export const EmergencyLightingContent2_4_Enhanced = () => {
  return (
    <div className="space-y-8">
      {/* Section 1: Purpose and Standards */}
      <Card className="bg-elec-gray/50 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            1. Purpose and Standards
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="grid gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-2">Primary Purpose</h3>
              <p className="text-foreground">
                Escape route lighting provides illumination along designated paths to ensure safe evacuation during mains lighting failure.
              </p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-400 mb-2">BS 5266 Requirements</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Minimum of 1 lux along the centre line of the escape route
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Lighting must make obstacles and changes of direction visible
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Fire equipment locations must be clearly illuminated
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Exit signs must be illuminated and legible at all times
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="font-semibold text-green-400">Quick Check</span>
            </div>
            <p className="text-foreground">What is the minimum lux requirement along the centre line of an escape route?</p>
            <p className="text-green-400 mt-2 font-medium">Answer: 1 lux minimum</p>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Identifying Escape Routes */}
      <Card className="bg-elec-gray/50 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <MapPin className="h-6 w-6 text-elec-yellow" />
            2. Identifying Escape Routes
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-foreground">
            Electricians must ensure all potential exit paths are covered, including:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-purple-400 mb-3">Primary Routes</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <Route className="h-4 w-4 text-purple-400" />
                  Corridors and passageways
                </li>
                <li className="flex items-center gap-2">
                  <Route className="h-4 w-4 text-purple-400" />
                  Staircases and landings
                </li>
                <li className="flex items-center gap-2">
                  <Route className="h-4 w-4 text-purple-400" />
                  Changes of level or direction
                </li>
                <li className="flex items-center gap-2">
                  <Route className="h-4 w-4 text-purple-400" />
                  Final exit doors
                </li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-red-400 mb-3">Critical Areas</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  Outside immediate safe areas
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  Fire extinguisher locations
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  Fire alarm call points
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  Fire-fighting equipment
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="font-semibold text-green-400">Quick Check</span>
            </div>
            <p className="text-foreground">Name two features along an escape route that must be clearly illuminated.</p>
            <p className="text-green-400 mt-2 font-medium">Answer: Fire-fighting equipment and changes of direction</p>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Installation and Design Principles */}
      <Card className="bg-elec-gray/50 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Settings className="h-6 w-6 text-elec-yellow" />
            3. Installation and Design Principles
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-foreground">When designing escape route lighting, electricians should:</p>

          <div className="grid gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-3">Luminaire Placement</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-blue-400" />
                  Position luminaires at all exits and safety equipment
                </li>
                <li className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-blue-400" />
                  Place fittings at every change of direction and junction
                </li>
                <li className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-blue-400" />
                  Ensure lighting levels are continuous, avoiding shadows
                </li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-400 mb-3">Exit Signage Integration</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-yellow-400" />
                  Use maintained exit signs in public buildings
                </li>
                <li className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-yellow-400" />
                  Ensure visibility even when mains lighting is on
                </li>
                <li className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-yellow-400" />
                  Confirm automatic activation on mains failure
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="font-semibold text-green-400">Quick Check</span>
            </div>
            <p className="text-foreground">Why must luminaires be placed at changes of direction and intersections?</p>
            <p className="text-green-400 mt-2 font-medium">Answer: To ensure continuous illumination and prevent confusion during evacuation</p>
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Testing and Maintenance */}
      <Card className="bg-elec-gray/50 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <TestTube className="h-6 w-6 text-elec-yellow" />
            4. Testing and Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-foreground">
            Compliance requires regular testing to confirm operation and duration:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-green-400 mb-3">Monthly Testing</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-400" />
                  Functional test required monthly
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Check all lights switch to emergency supply
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Verify operation of all luminaires
                </li>
              </ul>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-orange-400 mb-3">Annual Testing</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-400" />
                  Full-duration test annually
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400" />
                  Confirm full rated period (usually 3 hours)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400" />
                  Document any performance issues
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="font-semibold text-blue-400 mb-3">Documentation Requirements</h3>
            <ul className="space-y-2 text-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                Maintain detailed logbook entries
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                Record test results and any remedial work
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                Check coverage after building alterations
              </li>
            </ul>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="font-semibold text-green-400">Quick Check</span>
            </div>
            <p className="text-foreground">How often should full-duration testing of escape route lighting be carried out?</p>
            <p className="text-green-400 mt-2 font-medium">Answer: Annually (once per year)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};