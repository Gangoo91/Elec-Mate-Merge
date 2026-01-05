import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';

export const SmartHomeSection4RealWorld = () => {
  return (
    <Card className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-emerald-400" />
          Real-World Scenario: Architecture Migration
        </CardTitle>
      </CardHeader>
      <CardContent className="text-emerald-100 space-y-6">
        {/* Scenario Description */}
        <div className="p-4 bg-emerald-900/40 border border-emerald-500 rounded-lg">
          <h4 className="font-semibold text-emerald-200 mb-3">The Situation</h4>
          <p className="leading-relaxed">
            Sarah, a homeowner, initially installed a cloud-based smart home system using Amazon Alexa for voice control, 
            smart bulbs, and a few switches. Everything worked well until a series of internet outages left her without 
            any automation - lights wouldn't respond, scheduled routines failed, and even basic switch controls stopped working.
          </p>
        </div>

        {/* Problems Identified */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-900/30 border border-red-500 rounded-lg">
            <h4 className="font-semibold text-red-200 mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Problems with Cloud-Only System
            </h4>
            <ul className="space-y-2 text-red-100 text-sm">
              <li>• Complete system failure during internet outages</li>
              <li>• 3-5 second delays for simple lighting changes</li>
              <li>• Privacy concerns with always-listening devices</li>
              <li>• Dependency on Amazon's servers and policies</li>
              <li>• Limited customisation of automation rules</li>
            </ul>
          </div>

          <div className="p-4 bg-green-900/30 border border-green-500 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Benefits She Still Wanted
            </h4>
            <ul className="space-y-2 text-green-100 text-sm">
              <li>• Voice control convenience for music and information</li>
              <li>• Easy setup process for new devices</li>
              <li>• Integration with weather and news services</li>
              <li>• Remote access when travelling</li>
              <li>• Automatic software updates</li>
            </ul>
          </div>
        </div>

        {/* Solution Implemented */}
        <div className="p-4 bg-blue-900/30 border border-blue-500 rounded-lg">
          <h4 className="font-semibold text-blue-200 mb-3">The Hybrid Solution</h4>
          <p className="text-blue-100 mb-4">
            Sarah decided to implement a hybrid architecture using Hubitat Elevation as her local hub whilst keeping 
            her Alexa devices for voice control and entertainment.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-blue-200 mb-2">Local Processing (Hubitat):</h5>
              <ul className="space-y-1 text-blue-100 text-sm">
                <li>• All lighting automation and switches</li>
                <li>• Security system and door locks</li>
                <li>• HVAC control and scheduling</li>
                <li>• Motion-triggered routines</li>
                <li>• Emergency automation (power outages)</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-blue-200 mb-2">Cloud Services (Alexa):</h5>
              <ul className="space-y-1 text-blue-100 text-sm">
                <li>• Voice commands for music and information</li>
                <li>• Weather forecasts and news updates</li>
                <li>• Shopping lists and reminders</li>
                <li>• Remote monitoring via smartphone app</li>
                <li>• Integration with streaming services</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Results and Benefits */}
        <div className="p-4 bg-purple-900/30 border border-purple-500 rounded-lg">
          <h4 className="font-semibold text-purple-200 mb-3">Results After Migration</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-purple-200 mb-2">Immediate Benefits:</h5>
              <ul className="space-y-1 text-purple-100">
                <li>• Instant light responses (no more delays)</li>
                <li>• Continued operation during internet outages</li>
                <li>• More complex automation possibilities</li>
                <li>• Reduced reliance on external services</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-purple-200 mb-2">Trade-offs:</h5>
              <ul className="space-y-1 text-purple-100">
                <li>• Higher initial cost (hub + migration)</li>
                <li>• More complex setup and configuration</li>
                <li>• Learning curve for new interface</li>
                <li>• Ongoing maintenance responsibilities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Discussion Questions */}
        <div className="p-4 bg-yellow-900/30 border border-yellow-500 rounded-lg">
          <h4 className="font-semibold text-yellow-200 mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Discussion Points
          </h4>
          <div className="space-y-3 text-yellow-100 text-sm">
            <div>
              <span className="font-medium">Consider:</span>
              <span className="ml-2">What are the long-term benefits of Sarah's hybrid approach compared to staying fully cloud-based?</span>
            </div>
            <div>
              <span className="font-medium">Analyse:</span>
              <span className="ml-2">What trade-offs still exist in her new system, and how might future technology address them?</span>
            </div>
            <div>
              <span className="font-medium">Evaluate:</span>
              <span className="ml-2">Would this solution work for someone with less technical knowledge? What alternatives might be better?</span>
            </div>
            <div>
              <span className="font-medium">Predict:</span>
              <span className="ml-2">How might edge computing and Matter protocol improvements change Sarah's architecture choices in the future?</span>
            </div>
          </div>
        </div>

        {/* Key Learnings */}
        <div className="p-4 bg-gray-800/50 border border-gray-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3">Key Learnings from This Scenario</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
              Architecture decisions aren't permanent - systems can evolve based on experience and changing needs
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
              Hybrid approaches can capture benefits of multiple architectures whilst mitigating their weaknesses
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
              Critical functions should prioritise reliability over convenience features
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
              Understanding the trade-offs helps make informed decisions about system design
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};