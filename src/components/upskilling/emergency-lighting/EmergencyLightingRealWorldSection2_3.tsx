import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

export const EmergencyLightingRealWorldSection2_3 = () => {
  return (
    <Card className="bg-[#323232] border-elec-yellow/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          Real-World Example: Birmingham Manufacturing Incident
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Incident Overview */}
        <div className="bg-red-600/15 border border-red-400/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="h-4 w-4 text-red-400" />
            <Badge className="bg-red-600/40 text-red-300 text-xs">Incident Report</Badge>
            <span className="text-red-300 font-medium text-sm">Power Failure During Production</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Facility Details:</p>
                 <ul className="space-y-1 text-xs text-foreground">
                  <li>• Location: Birmingham industrial estate</li>
                  <li>• Type: Automotive component manufacturing</li>
                  <li>• Size: 3,000m² production floor</li>
                  <li>• Equipment: 25 CNC machines, 8 industrial lathes</li>
                  <li>• Workforce: 45 operators on day shift</li>
                </ul>
              </div>
              
              <div>
                <p className="text-foreground font-medium text-sm mb-2">What Happened:</p>
                 <ul className="space-y-1 text-xs text-foreground">
                  <li>• 11:30 AM: Total power failure due to grid fault</li>
                  <li>• Emergency escape lighting activated normally</li>
                  <li>• No dedicated high-risk task area lighting installed</li>
                  <li>• Operators forced to stop machines immediately</li>
                  <li>• Several near-miss incidents reported</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-red-600/20 rounded-lg p-3">
                <p className="text-red-300 font-medium text-sm mb-2">Immediate Consequences:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• CNC machine spindle damaged due to emergency stop</li>
                  <li>• £15,000 work pieces ruined mid-process</li>
                  <li>• One operator nearly injured by lathe chuck</li>
                  <li>• Production stopped for 6 hours</li>
                  <li>• Customer delivery commitments missed</li>
                </ul>
              </div>
              
              <div className="bg-yellow-600/20 rounded-lg p-3">
                <p className="text-yellow-300 font-medium text-sm mb-2">HSE Investigation Found:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Insufficient emergency lighting for high-risk tasks</li>
                  <li>• No formal risk assessment completed</li>
                  <li>• Operators not trained in emergency procedures</li>
                  <li>• Non-compliance with BS 5266 requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline of Events */}
        <div className="space-y-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4 text-elec-yellow" />
            Incident Timeline
          </h4>
          
          <div className="space-y-3">
            <div className="flex gap-4">
              <div className="w-16 flex-shrink-0">
                <Badge className="bg-blue-600/40 text-blue-300 text-xs">11:30</Badge>
              </div>
              <div className="bg-elec-gray/40 rounded-lg p-3 flex-1">
                <p className="text-foreground text-sm font-medium mb-1">Grid power failure occurs</p>
                <p className="text-foreground text-xs">Substation fault affects entire industrial estate. Emergency escape lighting (0.5 lux) activates correctly but provides insufficient illumination for safe machine shutdown.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-16 flex-shrink-0">
                <Badge className="bg-orange-600/40 text-orange-300 text-xs">11:31</Badge>
              </div>
              <div className="bg-elec-gray/40 rounded-lg p-3 flex-1">
                <p className="text-foreground text-sm font-medium mb-1">Operators struggle in poor light</p>
                <p className="text-foreground text-xs">Machine operators cannot see control panels clearly. Several attempt to continue operations by feel, creating dangerous conditions. Supervisor shouts for immediate stop.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-16 flex-shrink-0">
                <Badge className="bg-red-600/40 text-red-300 text-xs">11:32</Badge>
              </div>
              <div className="bg-elec-gray/40 rounded-lg p-3 flex-1">
                <p className="text-foreground text-sm font-medium mb-1">Emergency stops activated</p>
                <p className="text-foreground text-xs">Multiple machines stopped using emergency stops rather than controlled shutdown. CNC #7 suffers spindle damage. Operator John Smith nearly catches hand in lathe chuck while trying to secure work piece.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-16 flex-shrink-0">
                <Badge className="bg-purple-600/40 text-purple-300 text-xs">11:35</Badge>
              </div>
              <div className="bg-elec-gray/40 rounded-lg p-3 flex-1">
                <p className="text-foreground text-sm font-medium mb-1">Evacuation commenced</p>
                <p className="text-foreground text-xs">All personnel evacuated to assembly point. Several expensive aluminium components left unsecured on machines, later found to be damaged beyond use.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-16 flex-shrink-0">
                <Badge className="bg-green-600/40 text-green-300 text-xs">17:30</Badge>
              </div>
              <div className="bg-elec-gray/40 rounded-lg p-3 flex-1">
                <p className="text-foreground text-sm font-medium mb-1">Power restored, damage assessed</p>
                <p className="text-foreground text-xs">Full extent of damage becomes clear. Production cannot resume until CNC machine repaired and work pieces remachined. Total cost impact exceeds £50,000.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Implemented */}
        <div className="bg-green-600/15 border border-green-400/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <Badge className="bg-green-600/40 text-green-300 text-xs">Solution Implemented</Badge>
            <span className="text-green-300 font-medium text-sm">High-Risk Task Area Lighting Installation</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Risk Assessment Results:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• 25 CNC machines identified as high-risk</li>
                  <li>• 8 lathes requiring controlled shutdown</li>
                  <li>• Normal task illuminance: 400 lux</li>
                  <li>• Required emergency level: 40 lux minimum</li>
                  <li>• Shutdown time analysis: 3-5 minutes per machine</li>
                </ul>
              </div>
              
              <div>
                <p className="text-foreground font-medium text-sm mb-2">System Specifications:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• 85 LED emergency luminaires installed</li>
                  <li>• 40 lux maintained at machine control panels</li>
                  <li>• 3-hour battery duration for complex shutdowns</li>
                  <li>• Separate emergency circuits per machine bay</li>
                  <li>• Central battery system with distributed lighting</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">Installation Process:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Work conducted during planned shutdown</li>
                  <li>• Luminaires positioned above each machine</li>
                  <li>• Emergency circuits clearly marked</li>
                  <li>• Testing conducted with machines running</li>
                  <li>• Operator training provided on procedures</li>
                </ul>
              </div>
              
              <div className="bg-green-600/20 rounded-lg p-3">
                <p className="text-green-300 font-medium text-sm mb-2">Performance Results:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Zero accidents during subsequent outages</li>
                  <li>• Controlled machine shutdown in 4 power cuts</li>
                  <li>• £200,000+ in equipment damage prevented</li>
                  <li>• Insurance premium reduced by 12%</li>
                  <li>• HSE compliance achieved and maintained</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Operator Testimonials */}
        <div className="space-y-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-elec-yellow" />
            Operator Testimonials
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-elec-gray/40 rounded-lg p-4">
              <div className="mb-3">
                <Badge className="bg-blue-600/40 text-blue-300 text-xs mb-2">John Smith</Badge>
                <p className="text-blue-300 text-sm font-medium">Senior Machine Operator</p>
              </div>
              <p className="text-foreground text-sm italic mb-3">
                "Before the emergency lighting, I nearly lost my hand when the power cut happened. I couldn't see the lathe chuck properly and reached in to stop the work piece. Now with proper lighting, I can safely shutdown the machine step by step, even secure expensive parts properly."
              </p>
              <p className="text-foreground text-xs">
                John has 15 years experience operating CNC lathes and was involved in the near-miss incident that triggered the lighting upgrade.
              </p>
            </div>

            <div className="bg-elec-gray/40 rounded-lg p-4">
              <div className="mb-3">
                <Badge className="bg-purple-600/40 text-purple-300 text-xs mb-2">Sarah Williams</Badge>
                <p className="text-purple-300 text-sm font-medium">Production Supervisor</p>
              </div>
              <p className="text-foreground text-sm italic mb-3">
                "The difference is night and day. During the last power cut, I watched my team calmly and safely shut down their machines in proper sequence. No panic, no damage, no injuries. The emergency lighting gives us time to do things right instead of just hitting the panic button."
              </p>
              <p className="text-foreground text-xs">
                Sarah oversees 20 operators across two shifts and was responsible for implementing the new shutdown procedures.
              </p>
            </div>
            
          </div>
        </div>

        {/* Lessons Learned */}
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-4 w-4 text-elec-yellow" />
            <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow bg-elec-yellow/20">
              Key Lessons Learned
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">For Electricians:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Don't assume escape lighting is sufficient for all areas</li>
                  <li>• Conduct thorough risk assessments with operators</li>
                  <li>• Calculate illuminance based on actual task requirements</li>
                  <li>• Consider shutdown complexity when sizing batteries</li>
                  <li>• Test systems under realistic operating conditions</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm mb-2">For Facility Managers:</p>
                <ul className="space-y-1 text-xs text-foreground">
                  <li>• Invest in proper emergency lighting upfront</li>
                  <li>• Train operators on emergency shutdown procedures</li>
                  <li>• Regular testing prevents expensive failures</li>
                  <li>• Document procedures and maintain records</li>
                  <li>• Consider insurance and legal liability impacts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
};