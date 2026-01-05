import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  MapPin, 
  Settings, 
  TestTube,
  Eye,
  Navigation,
  CheckCircle,
  AlertCircle,
  Clock,
  Lightbulb
} from 'lucide-react';

export const EmergencyLightingContent2_5 = () => {
  return (
    <div className="space-y-8">
      {/* Section 1: Purpose and Legal Requirements */}
      <Card className="bg-elec-gray/50 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6 text-elec-yellow" />
            1. Purpose and Legal Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-foreground leading-relaxed">
            Exit signs guide occupants safely towards final exits in the event of an emergency. They must:
          </p>

          <div className="grid gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-3">Essential Requirements</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Be visible from any point in the escape route
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Use the standard running man symbol in accordance with ISO 7010
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Be illuminated at all times — either internally or externally
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Be legible in smoke or low visibility conditions
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="font-semibold text-green-400">Quick Check</span>
            </div>
            <p className="text-foreground">Which symbol standard must emergency exit signs comply with in the UK?</p>
            <p className="text-green-400 mt-2 font-medium">Answer: ISO 7010</p>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Placement of Exit Signs */}
      <Card className="bg-elec-gray/50 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <MapPin className="h-6 w-6 text-elec-yellow" />
            2. Placement of Exit Signs
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-foreground">
            Signs must be positioned so there is always clear guidance along an escape route. Requirements include:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-purple-400 mb-3">Mandatory Locations</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-purple-400" />
                  At every final exit from the building
                </li>
                <li className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-purple-400" />
                  At every change of direction or decision point
                </li>
                <li className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-purple-400" />
                  Where the route is not obvious (e.g. long corridors or lobbies)
                </li>
                <li className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-purple-400" />
                  Above doors, staircases, and at the head and foot of stairs
                </li>
              </ul>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-orange-400 mb-3">Height Considerations</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-400" />
                  At a height where smoke is least likely to obscure visibility
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-400" />
                  High enough to avoid obstruction by people or equipment
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-400" />
                  Low enough to remain visible and legible
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="font-semibold text-green-400">Quick Check</span>
            </div>
            <p className="text-foreground">Name two locations where exit signs must be installed.</p>
            <p className="text-green-400 mt-2 font-medium">Answer: At every final exit and at every change of direction</p>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Types of Exit Signs */}
      <Card className="bg-elec-gray/50 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Settings className="h-6 w-6 text-elec-yellow" />
            3. Types of Exit Signs
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-foreground">There are different sign types, depending on the building and occupancy:</p>

          <div className="grid gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-blue-400 mb-3">Sign Types</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Maintained Signs</h4>
                    <p className="text-foreground text-sm">Remain illuminated at all times (essential in public buildings such as theatres, cinemas, hospitals)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Non-maintained Signs</h4>
                    <p className="text-foreground text-sm">Only illuminate when the mains supply fails (suitable in workplaces where staff are familiar with escape routes)</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Externally Illuminated Signs</h4>
                    <p className="text-foreground text-sm">Standard safety signs lit by emergency luminaires</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Internally Illuminated Signs</h4>
                    <p className="text-foreground text-sm">Self-contained units with internal light sources</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="font-semibold text-green-400">Quick Check</span>
            </div>
            <p className="text-foreground">What is the difference between maintained and non-maintained exit signs?</p>
            <p className="text-green-400 mt-2 font-medium">Answer: Maintained signs remain illuminated at all times, non-maintained signs only illuminate during mains failure</p>
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Testing and Compliance */}
      <Card className="bg-elec-gray/50 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <TestTube className="h-6 w-6 text-elec-yellow" />
            4. Testing and Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-foreground">
            Like other emergency lighting systems, exit signage requires regular inspection:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-green-400 mb-3">Testing Schedule</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-400" />
                  Monthly test – confirm illumination on emergency supply
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-400" />
                  Annual test – full-duration test of the emergency lighting circuit
                </li>
                <li className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-green-400" />
                  Legibility check – ensure symbols are not obstructed or faded
                </li>
              </ul>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-orange-400 mb-3">Documentation</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400" />
                  Logbook recording – all inspections must be documented
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400" />
                  Compliance audits require complete records
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400" />
                  Include photographs of sign condition where appropriate
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="font-semibold text-green-400">Quick Check</span>
            </div>
            <p className="text-foreground">Why should exit signage be checked for legibility as part of routine inspections?</p>
            <p className="text-green-400 mt-2 font-medium">Answer: To ensure symbols are not obstructed or faded and remain visible during emergencies</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};