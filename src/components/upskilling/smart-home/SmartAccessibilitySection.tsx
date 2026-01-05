import { Heart, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export const SmartAccessibilitySection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Heart className="h-6 w-6 text-purple-500" />
            Smart Accessibility Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
            <h4 className="text-purple-400 font-semibold mb-3">What You'll Learn</h4>
            <p className="text-sm text-gray-300">
              How smart home technology enables independent living for elderly and disabled users, 
              practical solutions for different mobility challenges, and the impact on quality of life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Voice Control Solutions</h4>
              <div className="space-y-3">
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Hands-Free Operation</p>
                  <p className="text-xs text-gray-400">
                    Users with arthritis or mobility issues can control lights, heating, TV, and doors using voice commands. 
                    "Hey Google, set living room to 22 degrees" replaces difficult switch operation.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Emergency Assistance</p>
                  <p className="text-xs text-gray-400">
                    "Alexa, call emergency services" or "Help, I've fallen" triggers immediate response. 
                    System can unlock doors for paramedics and turn on lights for visibility.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Medication Reminders</p>
                  <p className="text-xs text-gray-400">
                    Smart speakers provide verbal medication reminders at specific times. 
                    Can escalate to calling family/carers if doses are missed consistently.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Assistive Automation</h4>
              <div className="space-y-3">
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Automatic Doors & Windows</p>
                  <p className="text-xs text-gray-400">
                    Motorised door locks, window openers, and curtains operate via smartphone or voice. 
                    Wheelchair users can access all areas without physical barriers.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Fall Detection Systems</p>
                  <p className="text-xs text-gray-400">
                    Wearable devices or camera systems detect falls and automatically alert emergency contacts. 
                    Can distinguish between sitting down and falling using AI analysis.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Activity Monitoring</p>
                  <p className="text-xs text-gray-400">
                    Motion sensors track daily routines without cameras (preserving privacy). 
                    Alerts family if unusual patterns detected (e.g., no bathroom visits for 12+ hours).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
            <h4 className="text-purple-400 font-semibold mb-3">Real Example: Elderly Independence</h4>
            <p className="text-sm text-gray-300 mb-2">
              Margaret, 78, with arthritis maintains independence through smart home technology:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-foreground font-semibold text-xs mb-1">Daily Challenges:</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Difficulty turning light switches</li>
                  <li>• Cannot reach thermostat controls</li>
                  <li>• Struggles with door keys</li>
                  <li>• Forgets medication times</li>
                  <li>• Fear of falling when alone</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-xs mb-1">Smart Solutions:</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Voice control for all lighting</li>
                  <li>• Smartphone heating control</li>
                  <li>• Smart lock with family access</li>
                  <li>• Voice medication reminders</li>
                  <li>• Wearable fall detection device</li>
                  <li>• <strong>Result: Delayed care home admission by 3+ years</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-pink-600/10 border-pink-600/30 border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-pink-400" />
            Knowledge Check: Smart Accessibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-elec-gray p-4 rounded-lg">
              <p className="text-foreground font-semibold text-sm mb-2">Q: How does voice control help users with mobility issues?</p>
              <p className="text-xs text-gray-400 mb-3">Think about physical barriers...</p>
              {showAnswers && (
                <div className="text-xs text-pink-400 bg-pink-600/20 p-2 rounded">
                  ✓ Eliminates need to physically reach switches, controls, and buttons that may be difficult or impossible to operate
                </div>
              )}
            </div>
            
            <div className="bg-elec-gray p-4 rounded-lg">
              <p className="text-foreground font-semibold text-sm mb-2">Q: What is fall detection and why is it important?</p>
              <p className="text-xs text-gray-400 mb-3">Consider emergency response...</p>
              {showAnswers && (
                <div className="text-xs text-pink-400 bg-pink-600/20 p-2 rounded">
                  ✓ Automatically detects falls and alerts emergency contacts, crucial for elderly living alone
                </div>
              )}
            </div>
            
            <div className="bg-elec-gray p-4 rounded-lg">
              <p className="text-foreground font-semibold text-sm mb-2">Q: How can smart homes support medication management?</p>
              <p className="text-xs text-gray-400 mb-3">What happens if doses are missed?</p>
              {showAnswers && (
                <div className="text-xs text-pink-400 bg-pink-600/20 p-2 rounded">
                  ✓ Voice reminders at scheduled times, with escalation to family/carers if consistently missed
                </div>
              )}
            </div>
            
            <div className="bg-elec-gray p-4 rounded-lg">
              <p className="text-foreground font-semibold text-sm mb-2">Q: How does activity monitoring preserve privacy?</p>
              <p className="text-xs text-gray-400 mb-3">What's the alternative to cameras?</p>
              {showAnswers && (
                <div className="text-xs text-pink-400 bg-pink-600/20 p-2 rounded">
                  ✓ Uses motion sensors to track patterns without cameras, monitoring wellness while maintaining dignity
                </div>
              )}
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="bg-pink-600 text-foreground px-4 py-2 rounded hover:bg-pink-700 transition-colors"
            >
              {showAnswers ? 'Hide Answers' : 'Show Answers'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};