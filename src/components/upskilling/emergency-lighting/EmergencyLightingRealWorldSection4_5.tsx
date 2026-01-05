import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export const EmergencyLightingRealWorldSection4_5 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-300 mb-3">Manchester University Campus Upgrade</h4>
          
          <div className="space-y-3">
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="font-medium text-foreground mb-2">The Challenge</h5>
              <p className="text-foreground text-sm">
                The university campus comprised 12 buildings with over 850 emergency luminaires spread across teaching 
                blocks, laboratories, libraries, and student accommodation. The estates team spent several days each 
                month conducting manual tests, taking two staff members away from other critical maintenance duties.
              </p>
              <p className="text-foreground text-sm mt-2">
                Paper logbooks were difficult to maintain consistently, and during a fire inspection, the university 
                received a warning notice due to incomplete records for several buildings. The compliance risk and 
                labour burden made a business case for upgrading the system.
              </p>
            </div>
            
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="font-medium text-foreground mb-2">The Solution</h5>
              <p className="text-foreground text-sm mb-3">
                A wireless remote testing system was selected due to the difficulty of installing data cabling across 
                multiple buildings, some of which were listed structures where cable routing would be problematic.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm space-y-2">
                <div className="flex justify-between text-foreground">
                  <span className="font-medium text-purple-300">System Type:</span>
                  <span>Wireless mesh network with central gateway</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span className="font-medium text-purple-300">Total Luminaires:</span>
                  <span>850 units across 12 buildings</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span className="font-medium text-purple-300">Installation Time:</span>
                  <span>3 weeks (minimal disruption)</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span className="font-medium text-purple-300">Total Cost:</span>
                  <span>£68,000 (equipment + installation)</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span className="font-medium text-purple-300">Monitoring Platform:</span>
                  <span>Cloud-based with mobile app access</span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-900/20 border border-green-600/30 rounded p-3">
              <h5 className="font-medium text-green-300 mb-2">The Results</h5>
              <div className="space-y-3">
                <div>
                  <p className="text-foreground text-sm font-semibold mb-1">Labour Savings</p>
                  <div className="bg-elec-dark p-3 rounded text-sm space-y-1">
                    <div className="flex justify-between text-foreground">
                      <span>Previous: Manual testing</span>
                      <span className="text-red-300">48 hours/month</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>After: Visual inspections only</span>
                      <span className="text-green-300">18 hours/month</span>
                    </div>
                    <div className="flex justify-between text-elec-yellow font-semibold pt-2 border-t border-gray-600">
                      <span>Time Saved:</span>
                      <span>30 hours/month (62.5% reduction)</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Annual Labour Cost Saving (£25/hour):</span>
                      <span className="text-green-300 font-semibold">£9,000/year</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground text-sm font-semibold mb-1">Compliance Improvements</p>
                  <div className="text-foreground text-sm space-y-1">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>100% test completion rate (previously 85-90% due to staff absence)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Electronic reports always available for fire inspections</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Fire inspection warning notice lifted within 3 months</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Instant alerts enable rapid response to failures</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground text-sm font-semibold mb-1">Return on Investment</p>
                  <div className="bg-elec-dark p-3 rounded text-sm space-y-1">
                    <div className="flex justify-between text-foreground">
                      <span>System Cost:</span>
                      <span className="text-red-300">£68,000</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Annual Savings:</span>
                      <span className="text-green-300">£9,000</span>
                    </div>
                    <div className="flex justify-between text-elec-yellow font-semibold pt-2 border-t border-gray-600">
                      <span>Payback Period:</span>
                      <span>7.6 years</span>
                    </div>
                    <div className="text-foreground text-xs mt-2 italic">
                      Note: Does not include avoided compliance penalties, improved audit readiness, or reduced 
                      risk from undetected failures
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded p-3">
              <h5 className="font-medium text-blue-300 mb-2">Operational Benefits</h5>
              <p className="text-foreground text-sm mb-2">
                Beyond the direct cost savings, the estates team reported several additional benefits:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-blue-400">→</span>
                  <span className="text-foreground">
                    <span className="text-foreground font-medium">Proactive Maintenance:</span> Battery degradation trends 
                    identified before complete failure, allowing planned replacement during term breaks
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400">→</span>
                  <span className="text-foreground">
                    <span className="text-foreground font-medium">Mobile Access:</span> Facilities managers could check 
                    system status remotely via smartphone app, even when off-site
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400">→</span>
                  <span className="text-foreground">
                    <span className="text-foreground font-medium">Audit Confidence:</span> Electronic records eliminated 
                    concerns about lost or incomplete logbooks
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400">→</span>
                  <span className="text-foreground">
                    <span className="text-foreground font-medium">Staff Satisfaction:</span> Maintenance team no longer 
                    burdened with repetitive manual testing, allowing focus on higher-value tasks
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-2">Key Lessons Learned</h4>
          <ul className="text-foreground text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              <span>
                <span className="font-medium">Wireless systems are ideal for multi-building sites</span> where 
                cabling would be expensive or impractical, especially in listed or heritage buildings
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              <span>
                <span className="font-medium">Present full ROI including compliance benefits,</span> not just labour 
                savings — avoiding enforcement action was a major driver for this project
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              <span>
                <span className="font-medium">Train multiple staff members</span> to ensure system knowledge isn't 
                lost during staff turnover — university trained four estates team members
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              <span>
                <span className="font-medium">Schedule installation during vacation periods</span> to minimise 
                disruption to teaching and learning activities
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              <span>
                <span className="font-medium">Visual inspections still essential</span> — system detected luminaire 
                failures but couldn't identify physical damage from student activity in corridors
              </span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
