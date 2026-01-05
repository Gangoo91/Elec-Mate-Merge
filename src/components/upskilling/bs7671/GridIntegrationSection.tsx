import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network } from 'lucide-react';

export const GridIntegrationSection = () => {
  return (
    <Card className="bg-gradient-to-r from-cyan-900/20 to-elec-gray border-cyan-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-5 w-5 text-elec-yellow" />
          Grid Integration & Connection Requirements
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-cyan-600 text-foreground">Grid Connection</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">G98 & G99 Connection Procedures:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-cyan-400 font-medium mb-2">G98 Simplified Connection (&lt;16A per phase):</h6>
              <ul className="text-sm space-y-1">
                <li>• <strong>Capacity limit:</strong> 3.68kW single-phase, 11.04kW three-phase</li>
                <li>• <strong>Application process:</strong> Notification to DNO post-installation</li>
                <li>• <strong>Connection time:</strong> Up to 45 working days for approval</li>
                <li>• <strong>Technical requirements:</strong> Type tested equipment only</li>
                <li>• <strong>Export limitation:</strong> May be required in certain areas</li>
                <li>• <strong>Monitoring:</strong> Smart export guarantee metering</li>
              </ul>
            </div>
            <div>
              <h6 className="text-blue-400 font-medium mb-2">G99 Standard Connection (&gt;16A per phase):</h6>
              <ul className="text-sm space-y-1">
                <li>• <strong>Capacity ranges:</strong> Up to 50kW (fast-track) or higher</li>
                <li>• <strong>Application process:</strong> Pre-application and formal application</li>
                <li>• <strong>Assessment time:</strong> 65 working days for standard applications</li>
                <li>• <strong>Studies required:</strong> Network impact assessment</li>
                <li>• <strong>Grid codes:</strong> Distribution Code compliance</li>
                <li>• <strong>Protection:</strong> Detailed protection studies required</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Distribution Network Operator (DNO) Requirements:</h5>
          <div className="space-y-3">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-orange-400 font-medium mb-2">Northern England</h6>
                <p className="text-xs text-gray-400 mb-1">Electricity North West</p>
                <ul className="text-xs space-y-1">
                  <li>• Export limits in rural areas</li>
                  <li>• Flexible connection options</li>
                  <li>• Smart grid trial participation</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-green-400 font-medium mb-2">Scotland</h6>
                <p className="text-xs text-gray-400 mb-1">Scottish Power / SSEN</p>
                <ul className="text-xs space-y-1">
                  <li>• High renewable penetration</li>
                  <li>• Active network management</li>
                  <li>• Constraint management</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-purple-400 font-medium mb-2">South England</h6>
                <p className="text-xs text-gray-400 mb-1">SSEN / UKPN</p>
                <ul className="text-xs space-y-1">
                  <li>• Urban network constraints</li>
                  <li>• Flexible services markets</li>
                  <li>• Time-of-use connections</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Export Limitation & Control Systems:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-lime-400 font-medium mb-2">Static Export Limitation:</h6>
              <ul className="text-sm space-y-1">
                <li>• Fixed maximum export capacity setting</li>
                <li>• Hardware-based power limiting devices</li>
                <li>• Suitable for simple installations</li>
                <li>• Lower capital cost implementation</li>
                <li>• Reduced revenue potential from curtailed generation</li>
                <li>• Compliance with network capacity constraints</li>
              </ul>
            </div>
            <div>
              <h6 className="text-emerald-400 font-medium mb-2">Dynamic Export Limitation:</h6>
              <ul className="text-sm space-y-1">
                <li>• Real-time export control based on network conditions</li>
                <li>• Communication with DNO control systems</li>
                <li>• Maximises export opportunities</li>
                <li>• Requires smart inverter technology</li>
                <li>• Higher technical complexity and cost</li>
                <li>• Optimal revenue generation potential</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Smart Grid Services & Flexibility Markets:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-indigo-400 font-medium mb-2">Flexibility Services:</h6>
              <ul className="text-sm space-y-1">
                <li>• <strong>Secure:</strong> Emergency backup power provision</li>
                <li>• <strong>Dynamic:</strong> Real-time constraint management</li>
                <li>• <strong>Restore:</strong> Network restoration support</li>
                <li>• <strong>Sustain:</strong> Voltage control and power factor</li>
                <li>• <strong>Reactive Power:</strong> VAR support services</li>
                <li>• <strong>Intertrip:</strong> Fast disconnection services</li>
              </ul>
            </div>
            <div>
              <h6 className="text-violet-400 font-medium mb-2">Market Participation:</h6>
              <ul className="text-sm space-y-1">
                <li>• Balancing Mechanism participation</li>
                <li>• Capacity Market revenue streams</li>
                <li>• Demand Side Response (DSR) services</li>
                <li>• Virtual Power Plant aggregation</li>
                <li>• Peer-to-peer energy trading</li>
                <li>• Carbon credit generation opportunities</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Network Monitoring & Communication:</h5>
          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-pink-400 font-medium mb-2">Real-time Monitoring:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Power quality measurement (PQ monitors)</li>
                  <li>• Fault passage indicators (FPIs)</li>
                  <li>• Network state estimation systems</li>
                  <li>• Load forecasting algorithms</li>
                  <li>• Weather correlation analysis</li>
                  <li>• Asset condition monitoring</li>
                </ul>
              </div>
              <div>
                <h6 className="text-rose-400 font-medium mb-2">Communication Infrastructure:</h6>
                <ul className="text-sm space-y-1">
                  <li>• SCADA system integration</li>
                  <li>• IEC 61850 protocol compliance</li>
                  <li>• 4G/5G cellular communication</li>
                  <li>• Satellite backup communication</li>
                  <li>• Cybersecurity protocols (IEC 62351)</li>
                  <li>• Data sovereignty and privacy compliance</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="text-yellow-400 font-medium mb-2">Performance Metrics & KPIs:</h6>
              <div className="grid md:grid-cols-4 gap-3">
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Export Utilisation</p>
                  <p className="text-sm text-green-400">&gt;90% target</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Power Quality</p>
                  <p className="text-sm text-blue-400">THD &lt;5%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Availability</p>
                  <p className="text-sm text-purple-400">&gt;99.5%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Response Time</p>
                  <p className="text-sm text-orange-400">&lt;2 seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Future Grid Technologies:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-teal-400 font-medium mb-2">Emerging Technologies:</h6>
              <ul className="text-sm space-y-1">
                <li>• Blockchain for energy trading and certificates</li>
                <li>• Artificial intelligence for grid optimisation</li>
                <li>• Digital twins for network modelling</li>
                <li>• Quantum communication for security</li>
                <li>• Autonomous grid healing capabilities</li>
                <li>• Carbon intensity optimisation algorithms</li>
              </ul>
            </div>
            <div>
              <h6 className="text-sky-400 font-medium mb-2">Integration Challenges:</h6>
              <ul className="text-sm space-y-1">
                <li>• Intermittency management at scale</li>
                <li>• Grid stability with high renewables penetration</li>
                <li>• Voltage regulation in distributed networks</li>
                <li>• Fault level management with inverter sources</li>
                <li>• Protection coordination complexity</li>
                <li>• Market design for flexibility services</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};