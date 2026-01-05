import { Shield, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export const SmartSecuritySection = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="space-y-6">
      {/* Learning Content */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-500" />
            Smart Security Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
            <h4 className="text-red-400 font-semibold mb-3">What You'll Learn</h4>
            <p className="text-sm text-gray-300">
              How smart security systems work together, why integration matters more than individual devices, 
              and how automation improves both security and convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Smart Lock Technology</h4>
              <div className="space-y-3">
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-red-400 font-semibold text-sm mb-1">How Smart Locks Work</p>
                  <p className="text-xs text-gray-400">
                    Use Bluetooth, Wi-Fi, or Z-Wave to communicate. Your phone acts as the key, 
                    automatically unlocking when you approach (geofencing) and locking when you leave.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-red-400 font-semibold text-sm mb-1">Access Control Benefits</p>
                  <p className="text-xs text-gray-400">
                    Create temporary codes for visitors (cleaner gets access 2-4 PM Tuesdays only). 
                    Track who enters and when - perfect for families with teenagers or rental properties.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-red-400 font-semibold text-sm mb-1">Emergency Features</p>
                  <p className="text-xs text-gray-400">
                    Duress codes (different from normal code) silently alert security services. 
                    Low battery warnings prevent lockouts. Manual override ensures access during power cuts.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Integrated Security Systems</h4>
              <div className="space-y-3">
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-red-400 font-semibold text-sm mb-1">Camera Integration</p>
                  <p className="text-xs text-gray-400">
                    Motion detection triggers recording + live alerts to your phone. 
                    Night vision and AI person detection reduce false alarms from pets or weather.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-red-400 font-semibold text-sm mb-1">Automated Responses</p>
                  <p className="text-xs text-gray-400">
                    When motion detected: cameras record, lights turn on, siren activates, phone alerts sent. 
                    All happens in 2-3 seconds without human intervention.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-red-400 font-semibold text-sm mb-1">Professional Monitoring</p>
                  <p className="text-xs text-gray-400">
                    Security company receives instant alerts with live video feed. 
                    They verify threats and dispatch police/fire services, reducing false alarm fees.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
            <h4 className="text-red-400 font-semibold mb-3">Real Example: Burglary Prevention</h4>
            <p className="text-sm text-gray-300 mb-2">
              How integrated smart security stopped a break-in attempt:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-foreground font-semibold text-xs mb-1">Traditional System Response:</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Motion sensor triggers siren (3-5 seconds)</li>
                  <li>• Neighbours may or may not respond</li>
                  <li>• No visual evidence of intruder</li>
                  <li>• Police response time: 15-30 minutes</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-xs mb-1">Smart System Response:</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Motion triggers cameras + lights instantly</li>
                  <li>• Homeowner gets live video on phone (5 seconds)</li>
                  <li>• Professional monitoring verifies threat</li>
                  <li>• Police dispatched with visual confirmation</li>
                  <li>• Intruder deterred by lights/siren combination</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Knowledge Check */}
      <Card className="bg-orange-600/10 border-orange-600/30 border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-orange-400" />
            Knowledge Check: Smart Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-elec-gray p-4 rounded-lg">
              <p className="text-foreground font-semibold text-sm mb-2">Q: What advantage do smart locks have over traditional locks?</p>
              <p className="text-xs text-gray-400 mb-3">Think beyond just keyless entry...</p>
              {showAnswers && (
                <div className="text-xs text-orange-400 bg-orange-600/20 p-2 rounded">
                  ✓ Remote control, temporary access codes, activity logging, and geofencing automation
                </div>
              )}
            </div>
            
            <div className="bg-elec-gray p-4 rounded-lg">
              <p className="text-foreground font-semibold text-sm mb-2">Q: How does system integration improve security?</p>
              <p className="text-xs text-gray-400 mb-3">What happens when devices work together?</p>
              {showAnswers && (
                <div className="text-xs text-orange-400 bg-orange-600/20 p-2 rounded">
                  ✓ Coordinated responses - motion triggers cameras, lights, alerts, and monitoring simultaneously
                </div>
              )}
            </div>
            
            <div className="bg-elec-gray p-4 rounded-lg">
              <p className="text-foreground font-semibold text-sm mb-2">Q: What is a duress code?</p>
              <p className="text-xs text-gray-400 mb-3">How can smart locks help in emergency situations?</p>
              {showAnswers && (
                <div className="text-xs text-orange-400 bg-orange-600/20 p-2 rounded">
                  ✓ A special code that unlocks the door but silently alerts security services to danger
                </div>
              )}
            </div>
            
            <div className="bg-elec-gray p-4 rounded-lg">
              <p className="text-foreground font-semibold text-sm mb-2">Q: Why is professional monitoring valuable?</p>
              <p className="text-xs text-gray-400 mb-3">What's the benefit over self-monitoring?</p>
              {showAnswers && (
                <div className="text-xs text-orange-400 bg-orange-600/20 p-2 rounded">
                  ✓ 24/7 verification of threats, faster police response, and reduced false alarm penalties
                </div>
              )}
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="bg-orange-600 text-foreground px-4 py-2 rounded hover:bg-orange-700 transition-colors"
            >
              {showAnswers ? 'Hide Answers' : 'Show Answers'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};