import { Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeSection2RealWorld = () => {
  return (
    <Card className="bg-blue-600/10 border-blue-600/30 border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Home className="h-6 w-6 text-blue-400" />
          Real-World Implementation Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="font-semibold text-foreground mb-3">
          The Henderson Family Smart Home Retrofit Project
        </p>
        <p className="text-sm mb-4">
          A working couple with two school-age children retrofit their 1990s detached house with smart technology 
          across lighting, HVAC, and security systems. The implementation demonstrates practical benefits and 
          integration challenges in real-world residential environments.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-elec-gray p-3 rounded">
            <p className="text-foreground font-semibold text-sm mb-2">Smart Lighting Implementation</p>
            <ul className="text-xs text-gray-400 space-y-1">
                <li>• 32 smart LED bulbs with dimming capability</li>
                <li>• 8 motion sensors in hallways and bathrooms</li>
                <li>• Daylight sensors in main living areas</li>
                <li>• Automated evening and morning routines</li>
                <li>• Security integration with outdoor lighting</li>
              </ul>
            </div>
          
          <div className="bg-elec-gray p-3 rounded">
            <p className="text-foreground font-semibold text-sm mb-2">Smart HVAC System Upgrade</p>
            <ul className="text-xs text-gray-400 space-y-1">
                <li>• Learning thermostat with 4-zone control</li>
                <li>• Smart vents for individual room adjustment</li>
                <li>• Integration with weather forecast data</li>
                <li>• Occupancy-based heating schedule automation</li>
                <li>• Energy usage monitoring and reporting</li>
              </ul>
            </div>
          
          <div className="bg-elec-gray p-3 rounded">
            <p className="text-foreground font-semibold text-sm mb-2">Comprehensive Security Setup</p>
            <ul className="text-xs text-gray-400 space-y-1">
                <li>• Smart locks on front and back doors</li>
                <li>• Video doorbell with facial recognition</li>
                <li>• 6 security cameras (perimeter coverage)</li>
                <li>• Window and door sensors throughout</li>
                <li>• Integration with lighting for security scenes</li>
              </ul>
            </div>
          
          <div className="bg-elec-gray p-3 rounded">
            <p className="text-foreground font-semibold text-sm mb-2">Daily Operation Examples</p>
            <ul className="text-xs text-gray-400 space-y-1">
                <li>• Automatic lights and heating before family wakes</li>
                <li>• HVAC adjusts when children return from school</li>
                <li>• Security notifications when family arrives home</li>
                <li>• Evening wind-down lighting scenes activate</li>
                <li>• Away mode coordinates all systems automatically</li>
              </ul>
            </div>
        </div>
        
        <div className="bg-green-600/20 border border-green-600/40 p-4 rounded">
            <p className="text-green-400 font-semibold text-sm mb-3">Measured Results After 18 Months:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-foreground font-semibold text-xs mb-1">Energy Performance</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• 28% reduction in lighting energy costs</li>
                  <li>• 22% decrease in heating and cooling bills</li>
                  <li>• Annual savings: £720 on utility bills</li>
                  <li>• System payback period: 4.2 years</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-xs mb-1">Convenience & Security</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• 90% reduction in manual lighting adjustments</li>
                  <li>• Enhanced security with 24/7 monitoring</li>
                  <li>• Improved comfort through zoned heating</li>
                  <li>• Streamlined daily routines</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-xs mb-1">Family Impact</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Better sleep quality (automated lighting)</li>
                  <li>• Increased sense of security when away</li>
                  <li>• Children enjoy voice-controlled features</li>
                  <li>• Simplified home management</li>
                </ul>
              </div>
            </div>
        </div>
        
        <div className="bg-yellow-600/20 border border-yellow-600/40 p-3 rounded mt-4">
            <p className="text-yellow-400 font-semibold text-sm mb-2">Integration Opportunities Identified:</p>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Smart smoke detectors linked to security system for faster emergency response</li>
              <li>• Garden irrigation system integration with weather data and water usage monitoring</li>
              <li>• Electric vehicle charging coordination with energy management system</li>
              <li>• Elderly grandparent accessibility features for extended visits</li>
              <li>• Advanced air quality monitoring integrated with HVAC filtration</li>
            </ul>
        </div>
        
        <div className="bg-orange-600/20 border border-orange-600/40 p-3 rounded mt-4">
            <p className="text-orange-400 font-semibold text-sm mb-2">Critical Question for Learners:</p>
            <p className="text-sm text-gray-300">
              What further integrations could improve safety, efficiency, or quality of life for this family? 
              Consider emerging technologies, seasonal requirements, and long-term adaptability needs.
            </p>
        </div>
      </CardContent>
    </Card>
  );
};