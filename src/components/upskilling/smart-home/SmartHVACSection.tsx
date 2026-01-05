import { Thermometer, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export const SmartHVACSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Thermometer className="h-6 w-6 text-blue-500" />
            Smart HVAC Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
            <h4 className="text-blue-400 font-semibold mb-3">What You'll Learn</h4>
            <p className="text-sm text-gray-300">
              How smart heating and cooling systems work, why zoning saves energy, and how AI learns 
              your preferences to optimise comfort while reducing bills.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">How Smart Thermostats Learn</h4>
              <div className="space-y-3">
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-blue-400 font-semibold text-sm mb-1">Pattern Recognition</p>
                  <p className="text-xs text-gray-400">
                    Smart thermostats track when you're home/away over 2-4 weeks. If you leave at 8 AM 
                    and return at 6 PM, it automatically reduces heating/cooling during the day.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-blue-400 font-semibold text-sm mb-1">Temperature Preferences</p>
                  <p className="text-xs text-gray-400">
                    The system learns you prefer 20°C during day, 18°C at night. It automatically 
                    adjusts without programming, achieving 10-15% energy savings.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-blue-400 font-semibold text-sm mb-1">Weather Integration</p>
                  <p className="text-xs text-gray-400">
                    Accesses weather forecasts to pre-cool before hot days or pre-heat before cold snaps, 
                    maintaining comfort while avoiding peak energy demand periods.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">HVAC Zoning Explained</h4>
              <div className="space-y-3">
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-blue-400 font-semibold text-sm mb-1">What is Zoning?</p>
                  <p className="text-xs text-gray-400">
                    Dividing your home into areas with independent temperature control. 
                    Example: bedrooms at 18°C for sleep, living room at 21°C for comfort.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-blue-400 font-semibold text-sm mb-1">Smart Dampers</p>
                  <p className="text-xs text-gray-400">
                    Motorised vents that open/close automatically. If the guest bedroom is empty, 
                    dampers close, redirecting airflow to occupied areas, saving 20-30% energy.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-blue-400 font-semibold text-sm mb-1">Occupancy-Based Control</p>
                  <p className="text-xs text-gray-400">
                    Motion sensors detect which rooms are occupied. HVAC only heats/cools active areas. 
                    Empty zones automatically enter energy-saving mode.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
            <h4 className="text-blue-400 font-semibold mb-3">Real Example: Family Home</h4>
            <p className="text-sm text-gray-300 mb-2">
              A 4-bedroom house installed smart HVAC with 3 zones and learning thermostat:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-foreground font-semibold text-xs mb-1">Before (Traditional):</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Whole house heated to 20°C constantly</li>
                  <li>• No occupancy detection</li>
                  <li>• Manual thermostat adjustments</li>
                  <li>• Annual bill: £1,800</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-xs mb-1">After (Smart):</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Zone 1 (bedrooms): 18°C night, 16°C day</li>
                  <li>• Zone 2 (living): 21°C evening, 18°C day</li>
                  <li>• Zone 3 (guest): Off unless occupied</li>
                  <li>• Annual bill: £1,260 (30% saving = £540/year)</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-green-600/10 border-green-600/30 border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            Knowledge Check: Smart HVAC
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-elec-gray p-4 rounded-lg">
              <p className="text-foreground font-semibold text-sm mb-2">Q: How do smart thermostats learn your preferences?</p>
              <p className="text-xs text-gray-400 mb-3">What data do they collect over time?</p>
              {showAnswers && (
                <div className="text-xs text-green-400 bg-green-600/20 p-2 rounded">
                  ✓ Track occupancy patterns, temperature adjustments, and schedule preferences over 2-4 weeks
                </div>
              )}
            </div>
            
            <div className="bg-elec-gray p-4 rounded-lg">
              <p className="text-foreground font-semibold text-sm mb-2">Q: What is HVAC zoning and why does it save energy?</p>
              <p className="text-xs text-gray-400 mb-3">Think about heating only what you need...</p>
              {showAnswers && (
                <div className="text-xs text-green-400 bg-green-600/20 p-2 rounded">
                  ✓ Independent temperature control for different areas, only heating/cooling occupied zones
                </div>
              )}
            </div>
            
            <div className="bg-elec-gray p-4 rounded-lg">
              <p className="text-foreground font-semibold text-sm mb-2">Q: How much energy can smart HVAC systems typically save?</p>
              <p className="text-xs text-gray-400 mb-3">Based on the example we discussed...</p>
              {showAnswers && (
                <div className="text-xs text-green-400 bg-green-600/20 p-2 rounded">
                  ✓ 20-30% energy savings through zoning, learning, and occupancy detection
                </div>
              )}
            </div>
            
            <div className="bg-elec-gray p-4 rounded-lg">
              <p className="text-foreground font-semibold text-sm mb-2">Q: How do smart dampers work?</p>
              <p className="text-xs text-gray-400 mb-3">What happens when rooms are empty?</p>
              {showAnswers && (
                <div className="text-xs text-green-400 bg-green-600/20 p-2 rounded">
                  ✓ Motorised vents automatically close to redirect airflow away from unoccupied areas
                </div>
              )}
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="bg-green-600 text-foreground px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              {showAnswers ? 'Hide Answers' : 'Show Answers'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};