import { Lightbulb, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export const SmartLightingSection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
            Smart Lighting Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
            <h4 className="text-yellow-400 font-semibold mb-3">What You'll Learn</h4>
            <p className="text-sm text-gray-300">
              Understanding how smart lighting systems work, their energy benefits, and practical applications 
              for homes and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">How Smart Lighting Works</h4>
              <div className="space-y-3">
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Automated Scheduling</p>
                  <p className="text-xs text-gray-400">
                    Smart lights use timers and occupancy sensors to turn on/off automatically. 
                    For example: lights turn on at sunset and off at 11 PM, saving energy when no one is home.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Dimming & Colour Control</p>
                  <p className="text-xs text-gray-400">
                    LED smart bulbs can dim from 1-100% and change colour temperature (warm 2700K to cool 6500K). 
                    This supports circadian rhythms and reduces eye strain.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Occupancy Detection</p>
                  <p className="text-xs text-gray-400">
                    Motion sensors detect when someone enters/leaves a room. Lights automatically turn on when 
                    you enter and off after 5-10 minutes of no movement, preventing energy waste.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Energy Savings Explained</h4>
              <div className="space-y-3">
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-yellow-400 font-semibold text-sm mb-1">LED Efficiency</p>
                  <p className="text-xs text-gray-400">
                    LED bulbs use 75% less energy than incandescent bulbs. A 60W incandescent = 9W LED, 
                    saving £40+ per bulb annually at current electricity rates.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Daylight Harvesting</p>
                  <p className="text-xs text-gray-400">
                    Light sensors measure natural light levels and automatically dim artificial lights. 
                    On bright days, lights dim to 30% saving 70% energy while maintaining comfort.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Scene Optimisation</p>
                  <p className="text-xs text-gray-400">
                    Different activities need different lighting levels. Reading needs 100% brightness, 
                    watching TV needs 20%, creating custom scenes saves energy and improves comfort.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
            <h4 className="text-yellow-400 font-semibold mb-3">Real Example: Office Building</h4>
            <p className="text-sm text-gray-300 mb-2">
              A 1000m² office installed smart lighting with occupancy sensors and daylight harvesting:
            </p>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Before: 50W fluorescent × 200 lights = 10kW continuous power</li>
              <li>• After: 20W LED × 200 lights = 4kW maximum power</li>
              <li>• With automation: Average 30% occupancy + 50% daylight dimming = 1.2kW average</li>
              <li>• <strong>Result: 88% energy reduction, £8,500 annual savings</strong></li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-blue-600/10 border-blue-600/30 border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-blue-400" />
            Knowledge Check: Smart Lighting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-elec-gray p-4 rounded-lg">
              <p className="text-foreground font-semibold text-sm mb-2">Q: How much energy can LED bulbs save compared to incandescent?</p>
              <p className="text-xs text-gray-400 mb-3">Think about the power consumption difference we discussed.</p>
              {showAnswers && (
                <div className="text-xs text-blue-400 bg-blue-600/20 p-2 rounded">
                  ✓ 75% energy reduction (60W incandescent = 9W LED)
                </div>
              )}
            </div>
            
            <div className="bg-elec-gray p-4 rounded-lg">
              <p className="text-foreground font-semibold text-sm mb-2">Q: What is daylight harvesting?</p>
              <p className="text-xs text-gray-400 mb-3">How do smart lights respond to natural light?</p>
              {showAnswers && (
                <div className="text-xs text-blue-400 bg-blue-600/20 p-2 rounded">
                  ✓ Automatically dimming artificial lights based on available natural light levels
                </div>
              )}
            </div>
            
            <div className="bg-elec-gray p-4 rounded-lg">
              <p className="text-foreground font-semibold text-sm mb-2">Q: How do occupancy sensors save energy?</p>
              <p className="text-xs text-gray-400 mb-3">What happens when a room is empty?</p>
              {showAnswers && (
                <div className="text-xs text-blue-400 bg-blue-600/20 p-2 rounded">
                  ✓ Lights automatically turn off when no movement detected, preventing waste in empty rooms
                </div>
              )}
            </div>
            
            <div className="bg-elec-gray p-4 rounded-lg">
              <p className="text-foreground font-semibold text-sm mb-2">Q: Why are lighting scenes beneficial?</p>
              <p className="text-xs text-gray-400 mb-3">Different activities need different lighting...</p>
              {showAnswers && (
                <div className="text-xs text-blue-400 bg-blue-600/20 p-2 rounded">
                  ✓ Optimise lighting levels for specific activities, saving energy while improving comfort
                </div>
              )}
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="bg-blue-600 text-foreground px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              {showAnswers ? 'Hide Answers' : 'Show Answers'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};