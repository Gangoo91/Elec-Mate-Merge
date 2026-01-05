import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, AlertTriangle, Clock, Settings, TrendingUp, Lightbulb } from 'lucide-react';

export const BMSModule4Section5Content = () => {
  return (
    <div className="space-y-8">
      {/* Advanced Integration Overview */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Advanced HVAC and Lighting Integration Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p>
            Combined HVAC and lighting control represents the pinnacle of building automation efficiency. When these systems work together intelligently, they can achieve energy savings of 30-50% while significantly improving occupant comfort, productivity, and building performance metrics. Modern integration goes beyond simple scheduling to include predictive algorithms, machine learning optimisation, and real-time environmental response.
          </p>

          <p>
            Advanced integration considers multiple variables including solar irradiance, occupancy patterns, thermal mass utilisation, daylight availability, weather forecasts, and even utility pricing to make optimal control decisions throughout the day. This sophisticated coordination creates compound energy savings that exceed the sum of individual system optimisations.
          </p>

          {/* Integration Benefits Grid */}
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-600/40 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                <h4 className="font-semibold text-red-300">Problems with Independent Control</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Energy Waste:</strong> Lighting heat gains ignored by HVAC controls, causing overcooling</p>
                <p><strong>Occupancy Inefficiency:</strong> Systems operate independently despite zero occupancy</p>
                <p><strong>Daylight Waste:</strong> Artificial lighting competes with natural light without HVAC coordination</p>
                <p><strong>Peak Demand:</strong> No coordination during high-cost utility periods</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-600/40 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="h-6 w-6 text-blue-400" />
                <h4 className="font-semibold text-blue-300">Integrated Control Benefits</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Compound Savings:</strong> 30-50% energy reduction through coordinated operation</p>
                <p><strong>Load Optimisation:</strong> Reduced cooling loads when lighting is dimmed or off</p>
                <p><strong>Smart Scheduling:</strong> Predictive pre-cooling/heating based on occupancy patterns</p>
                <p><strong>Demand Response:</strong> Automated peak shaving through coordinated load reduction</p>
              </div>
            </div>
          </div>

          <div className="bg-green-600/20 border border-green-600/40 rounded-lg p-4">
            <p className="text-green-100">
              <strong>Advanced Integration:</strong> Modern systems use artificial intelligence to learn building behaviour patterns, optimising both comfort and efficiency whilst adapting to changing conditions and usage patterns throughout seasons.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Comprehensive Control Strategies */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            Comprehensive Integration Control Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          
          {/* Primary Strategies */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-600/40 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Settings className="h-6 w-6 text-purple-400" />
                <h4 className="font-semibold text-purple-300">Advanced Occupancy Control</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Multi-sensor Detection:</strong> PIR, CO₂, and desk sensors for accurate occupancy</p>
                <p><strong>Predictive Scheduling:</strong> Pre-conditioning based on calendar integration</p>
                <p><strong>Zone Coordination:</strong> Adjacent zone lighting affects HVAC load calculations</p>
                <p><strong>Energy Savings:</strong> 40-70% reduction during unoccupied periods</p>
                <p><strong>Comfort Features:</strong> Gradual recovery prevents temperature shock</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 border border-cyan-600/40 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="h-6 w-6 text-cyan-400" />
                <h4 className="font-semibold text-cyan-300">Daylight Integration Control</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Daylight Harvesting:</strong> Automatic dimming based on available natural light</p>
                <p><strong>Thermal Coordination:</strong> HVAC adjusts for reduced lighting heat gains</p>
                <p><strong>Glare Management:</strong> Coordinated blinds and lighting prevent visual discomfort</p>
                <p><strong>Energy Savings:</strong> 35-60% lighting reduction, 15-25% cooling reduction</p>
                <p><strong>Circadian Benefits:</strong> Natural light exposure supports occupant wellbeing</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 border border-orange-600/40 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-6 w-6 text-orange-400" />
                <h4 className="font-semibold text-orange-300">Intelligent Scheduling Control</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Optimal Start:</strong> Systems pre-condition spaces based on thermal mass</p>
                <p><strong>Night Purge:</strong> Coordinated ventilation and reduced lighting for cooling</p>
                <p><strong>Weekend Setback:</strong> Both systems enter energy-saving modes together</p>
                <p><strong>Holiday Programming:</strong> Automatic adjustment for bank holidays and closures</p>
                <p><strong>Seasonal Adaptation:</strong> Schedules adjust for changing daylight hours</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-900/30 to-teal-800/20 border border-teal-600/40 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="h-6 w-6 text-teal-400" />
                <h4 className="font-semibold text-teal-300">Peak Demand Management</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Load Shedding:</strong> Coordinated reduction during utility peak periods</p>
                <p><strong>Demand Response:</strong> Grid signal integration for automated load reduction</p>
                <p><strong>Thermal Banking:</strong> Pre-cooling during off-peak hours with dimmed lighting</p>
                <p><strong>Cost Optimisation:</strong> Real-time utility pricing influences control decisions</p>
                <p><strong>Peak Avoidance:</strong> Prevents costly demand charges through intelligent coordination</p>
              </div>
            </div>
          </div>

          {/* Technical Implementation Table */}
          <div className="bg-gray-800/40 rounded-lg p-5">
            <h4 className="font-semibold mb-4 text-foreground text-lg">Technical Implementation Specifications</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-600 text-sm">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Control Strategy</th>
                    <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Sensor Requirements</th>
                    <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Response Time</th>
                    <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Energy Savings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Occupancy Detection</strong></td>
                    <td className="border border-gray-600 px-4 py-2">PIR, ultrasonic, CO₂ sensors</td>
                    <td className="border border-gray-600 px-4 py-2">Lights: Immediate, HVAC: 15min delay</td>
                    <td className="border border-gray-600 px-4 py-2">40-70% during unoccupied periods</td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-600 px-4 py-2"><strong>Daylight Harvesting</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Photocells, daylight sensors</td>
                    <td className="border border-gray-600 px-4 py-2">Gradual dimming over 5-10 minutes</td>
                    <td className="border border-gray-600 px-4 py-2">35-60% lighting, 15-25% cooling</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Load Shedding</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Power meters, utility signals</td>
                    <td className="border border-gray-600 px-4 py-2">Within 30 seconds of signal</td>
                    <td className="border border-gray-600 px-4 py-2">15-25% peak demand reduction</td>
                  </tr>
                  <tr className="bg-gray-800/50">
                    <td className="border border-gray-600 px-4 py-2"><strong>Thermal Banking</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Temperature, weather forecasts</td>
                    <td className="border border-gray-600 px-4 py-2">2-4 hour pre-conditioning</td>
                    <td className="border border-gray-600 px-4 py-2">20-35% peak period costs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-yellow-900/30 border border-yellow-600/40 rounded-lg p-4">
            <p className="text-yellow-100">
              <strong>Best Practice:</strong> Advanced integration requires sophisticated commissioning and regular optimization. Machine learning algorithms can improve performance over time, but proper sensor calibration and system documentation remain essential for long-term success.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};