import { Lightbulb, Thermometer, Shield, Heart, Zap, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeSection2Content = () => {
  return (
    <div className="space-y-8">
      {/* Benefits Overview */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Zap className="h-6 w-6 text-green-500" />
            Core Benefits of Smart Home Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-green-600/20 p-4 rounded-lg border border-green-600/40">
              <h5 className="text-green-400 font-semibold mb-2">Convenience</h5>
              <p className="text-xs text-gray-300 mb-2">
                Automating repetitive daily tasks such as lighting schedules, thermostat adjustments, 
                and security routines, freeing users from manual intervention.
              </p>
              <ul className="text-xs space-y-1">
                <li>• Automated morning and evening routines</li>
                <li>• Voice-controlled device management</li>
                <li>• Remote system monitoring and control</li>
              </ul>
            </div>
            
            <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-600/40">
              <h5 className="text-blue-400 font-semibold mb-2">Energy Efficiency</h5>
              <p className="text-xs text-gray-300 mb-2">
                Optimising heating, cooling, and lighting systems to reduce energy waste through 
                intelligent scheduling and occupancy-based control.
              </p>
              <ul className="text-xs space-y-1">
                <li>• Adaptive climate control systems</li>
                <li>• Daylight harvesting automation</li>
                <li>• Standby power elimination</li>
              </ul>
            </div>
            
            <div className="bg-red-600/20 p-4 rounded-lg border border-red-600/40">
              <h5 className="text-red-400 font-semibold mb-2">Safety & Security</h5>
              <p className="text-xs text-gray-300 mb-2">
                Integrated alarm systems, CCTV monitoring, and intelligent access control 
                providing comprehensive property and personal protection.
              </p>
              <ul className="text-xs space-y-1">
                <li>• Real-time threat detection and alerts</li>
                <li>• Automated emergency responses</li>
                <li>• Remote monitoring capabilities</li>
              </ul>
            </div>
            
            <div className="bg-purple-600/20 p-4 rounded-lg border border-purple-600/40">
              <h5 className="text-purple-400 font-semibold mb-2">Accessibility</h5>
              <p className="text-xs text-gray-300 mb-2">
                Assistive technology solutions enabling elderly and disabled users to maintain 
                independence through voice control and automated assistance.
              </p>
              <ul className="text-xs space-y-1">
                <li>• Voice-activated controls</li>
                <li>• Automated mobility assistance</li>
                <li>• Health monitoring integration</li>
              </ul>
            </div>
            
            <div className="bg-yellow-600/20 p-4 rounded-lg border border-yellow-600/40">
              <h5 className="text-yellow-400 font-semibold mb-2">Comfort & Lifestyle</h5>
              <p className="text-xs text-gray-300 mb-2">
                Customisable environmental settings, scene creation, and personalised automation 
                enhancing daily living experiences.
              </p>
              <ul className="text-xs space-y-1">
                <li>• Personalised scene settings</li>
                <li>• Zoned environmental control</li>
                <li>• Adaptive learning systems</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Lighting Applications */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
            Smart Lighting Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Core Lighting Functions</h4>
              <div className="space-y-3">
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Automated Scheduling</p>
                  <p className="text-xs text-gray-400">
                    Lighting schedules that automatically adjust based on occupancy patterns, 
                    time of day, and seasonal variations for optimal energy efficiency.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Dynamic Colour & Dimming</p>
                  <p className="text-xs text-gray-400">
                    Adjustable colour temperature (2700K-6500K) and dimming capabilities 
                    supporting circadian rhythms and task-specific lighting requirements.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Scene Management</p>
                  <p className="text-xs text-gray-400">
                    Pre-configured lighting scenes for different activities: work mode, 
                    entertainment, relaxation, and security lighting scenarios.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Advanced Features</h4>
              <div className="space-y-3">
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Occupancy Integration</p>
                  <p className="text-xs text-gray-400">
                    Motion sensors and presence detection automatically controlling lights, 
                    reducing energy waste in unoccupied spaces.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Daylight Harvesting</p>
                  <p className="text-xs text-gray-400">
                    Photosensors measuring ambient light levels and adjusting artificial 
                    lighting to maintain consistent illumination while minimising energy use.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-yellow-400 font-semibold text-sm mb-1">Security Integration</p>
                  <p className="text-xs text-gray-400">
                    Lighting triggered by security events, simulating occupancy during 
                    absence, and providing visual alerts for alarm conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
            <h4 className="text-yellow-400 font-semibold mb-3">Energy Efficiency Impact</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">30-50%</p>
                <p className="text-xs text-gray-300">Energy reduction through LED conversion and automation</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">15-25%</p>
                <p className="text-xs text-gray-300">Additional savings from occupancy-based control</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">10-15%</p>
                <p className="text-xs text-gray-300">Further reduction through daylight harvesting</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart HVAC Applications */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Thermometer className="h-6 w-6 text-blue-500" />
            Smart HVAC Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Intelligent Control Systems</h4>
              <div className="space-y-3">
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-blue-400 font-semibold text-sm mb-1">Learning Thermostats</p>
                  <p className="text-xs text-gray-400">
                    AI-powered thermostats that learn household patterns, occupancy schedules, 
                    and preferences to optimise comfort while minimising energy consumption.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-blue-400 font-semibold text-sm mb-1">Zoning Systems</p>
                  <p className="text-xs text-gray-400">
                    Independent temperature control for different areas, allowing personalised 
                    comfort settings and reduced energy waste in unoccupied zones.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-blue-400 font-semibold text-sm mb-1">Weather Integration</p>
                  <p className="text-xs text-gray-400">
                    Integration with weather forecasts to anticipate heating and cooling needs, 
                    pre-conditioning spaces for optimal energy efficiency.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Advanced Features</h4>
              <div className="space-y-3">
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-blue-400 font-semibold text-sm mb-1">Remote Access</p>
                  <p className="text-xs text-gray-400">
                    Mobile app control allowing pre-conditioning before arrival, 
                    emergency adjustments, and energy monitoring from anywhere.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-blue-400 font-semibold text-sm mb-1">Energy Reporting</p>
                  <p className="text-xs text-gray-400">
                    Detailed usage analytics, efficiency recommendations, and cost tracking 
                    helping users optimise system performance and reduce bills.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-blue-400 font-semibold text-sm mb-1">Maintenance Alerts</p>
                  <p className="text-xs text-gray-400">
                    Automated filter change reminders, system health monitoring, 
                    and predictive maintenance alerts preventing costly breakdowns.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
            <h4 className="text-blue-400 font-semibold mb-3">HVAC Efficiency Benefits</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Energy Savings:</p>
                <ul className="text-xs space-y-1">
                  <li>• 10-23% reduction through smart thermostats</li>
                  <li>• 20-30% additional savings with zoning</li>
                  <li>• 5-15% from weather integration</li>
                  <li>• Payback period: 1-3 years typically</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Comfort Improvements:</p>
                <ul className="text-xs space-y-1">
                  <li>• Consistent temperature maintenance</li>
                  <li>• Reduced temperature swings</li>
                  <li>• Personalised zone comfort</li>
                  <li>• Improved air quality monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Security Applications */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-500" />
            Smart Security Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Access Control Systems</h4>
              <div className="space-y-3">
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-red-400 font-semibold text-sm mb-1">Smart Locks</p>
                  <p className="text-xs text-gray-400">
                    Keyless entry with mobile app control, biometric access, temporary codes 
                    for visitors, and activity logging for complete access management.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-red-400 font-semibold text-sm mb-1">Video Doorbells</p>
                  <p className="text-xs text-gray-400">
                    HD video streaming, two-way audio communication, motion detection, 
                    and cloud recording for comprehensive visitor management.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-red-400 font-semibold text-sm mb-1">Access Monitoring</p>
                  <p className="text-xs text-gray-400">
                    Real-time notifications for entries, automated guest access, 
                    and integration with family member tracking systems.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Surveillance & Monitoring</h4>
              <div className="space-y-3">
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-red-400 font-semibold text-sm mb-1">CCTV Systems</p>
                  <p className="text-xs text-gray-400">
                    High-definition cameras with night vision, motion detection, 
                    facial recognition, and cloud storage for comprehensive monitoring.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-red-400 font-semibold text-sm mb-1">Integrated Alarms</p>
                  <p className="text-xs text-gray-400">
                    Multi-sensor alarm systems with door/window sensors, glass break detection, 
                    and immediate emergency service notification capabilities.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-red-400 font-semibold text-sm mb-1">Security Automation</p>
                  <p className="text-xs text-gray-400">
                    Automated lighting responses to security events, simulated occupancy 
                    during absence, and coordinated system responses to threats.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
            <h4 className="text-red-400 font-semibold mb-3">Security System Integration Benefits</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Response Times:</p>
                <ul className="text-xs space-y-1">
                  <li>• Instant mobile notifications</li>
                  <li>• Automated emergency calls</li>
                  <li>• Real-time video verification</li>
                  <li>• Coordinated system responses</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Deterrent Effects:</p>
                <ul className="text-xs space-y-1">
                  <li>• Visible camera systems</li>
                  <li>• Automated lighting responses</li>
                  <li>• Audio deterrent features</li>
                  <li>• Professional monitoring signs</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Peace of Mind:</p>
                <ul className="text-xs space-y-1">
                  <li>• 24/7 remote monitoring</li>
                  <li>• Family member tracking</li>
                  <li>• Emergency response features</li>
                  <li>• Comprehensive activity logs</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Accessibility Applications */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Heart className="h-6 w-6 text-purple-500" />
            Smart Accessibility Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Assistive Technologies</h4>
              <div className="space-y-3">
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Voice Control Systems</p>
                  <p className="text-xs text-gray-400">
                    Comprehensive voice control for lighting, heating, entertainment systems, 
                    and appliances, reducing physical interaction requirements for users with mobility limitations.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Mobility Automation</p>
                  <p className="text-xs text-gray-400">
                    Automated doors, motorised window blinds, adjustable furniture controls, 
                    and pathway lighting for users with physical disabilities.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Sensory Assistance</p>
                  <p className="text-xs text-gray-400">
                    Visual alerts for hearing-impaired users, audio descriptions for visually-impaired users, 
                    and tactile feedback systems for enhanced accessibility.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-foreground font-semibold text-lg mb-4">Health & Monitoring</h4>
              <div className="space-y-3">
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Medical Integration</p>
                  <p className="text-xs text-gray-400">
                    Integration with medical alert systems, medication reminders, 
                    and health monitoring devices for comprehensive care support.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Remote Monitoring</p>
                  <p className="text-xs text-gray-400">
                    Activity monitoring for carers and family members, emergency detection, 
                    and automated health status updates for peace of mind.
                  </p>
                </div>
                <div className="bg-elec-gray p-3 rounded">
                  <p className="text-purple-400 font-semibold text-sm mb-1">Independent Living</p>
                  <p className="text-xs text-gray-400">
                    Customised environmental controls, routine automation, and adaptive interfaces 
                    supporting independent living for elderly and disabled users.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
            <h4 className="text-purple-400 font-semibold mb-3">Accessibility Impact Assessment</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Independence Benefits:</p>
                <ul className="text-xs space-y-1">
                  <li>• Reduced reliance on carers for daily tasks</li>
                  <li>• Improved safety through automated monitoring</li>
                  <li>• Enhanced communication capabilities</li>
                  <li>• Greater control over living environment</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Quality of Life:</p>
                <ul className="text-xs space-y-1">
                  <li>• Increased confidence and self-reliance</li>
                  <li>• Better health monitoring and response</li>
                  <li>• Enhanced social connectivity</li>
                  <li>• Improved emergency response times</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};