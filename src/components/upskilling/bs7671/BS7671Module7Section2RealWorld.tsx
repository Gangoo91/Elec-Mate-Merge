import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export const BS7671Module7Section2RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-4">The Office Complex EV Charging Project</h4>
          
          <div className="space-y-6">
            <div>
              <h5 className="font-medium text-blue-200 mb-3">The Challenge</h5>
              <p className="text-foreground mb-4">
                A modern office complex with 200 parking spaces needs to install 50 EV charging points to meet employee demand and sustainability targets. The existing electrical infrastructure was designed before EV charging became commonplace, and the supply is a TN-C-S (PME) system with limited spare capacity.
              </p>
              <p className="text-foreground">
                The facility manager wants a phased installation approach, starting with 20 chargers in the first phase, but the electrical contractor must ensure the design can accommodate the full 50-charger rollout without major infrastructure changes.
              </p>
            </div>
            
            <div>
              <h5 className="font-medium text-green-200 mb-3">Initial Assessment Findings</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <h6 className="font-medium text-foreground mb-2">Electrical Infrastructure</h6>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Existing supply: 400A three-phase PME connection</li>
                    <li>• Current maximum demand: 280A during peak hours</li>
                    <li>• Spare capacity: 120A (approximately 15-20 chargers)</li>
                    <li>• Distribution: aging 1980s switchgear and cabling</li>
                    <li>• Earthing: PME system with basic electrode arrangement</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-foreground mb-2">Site Constraints</h6>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Underground car park with limited cable routes</li>
                    <li>• Requirement for 7kW charging capability minimum</li>
                    <li>• Future-proofing for 22kW three-phase charging</li>
                    <li>• Smart charging and load management required</li>
                    <li>• Integration with existing building management system</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-purple-200 mb-3">PME Protection Solution</h5>
              <p className="text-foreground mb-4">
                The PME earthing system presents significant challenges for the EV installation. The contractor must implement comprehensive PEN conductor protection whilst maintaining system reliability and minimising installation costs.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="text-2xl font-bold text-green-400">50</div>
                  <div className="text-xs text-green-200">Additional earth electrodes required</div>
                </div>
                <div className="text-center p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="text-2xl font-bold text-blue-400">20Ω</div>
                  <div className="text-xs text-blue-200">Maximum earth electrode resistance</div>
                </div>
                <div className="text-center p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="text-2xl font-bold text-purple-400">24/7</div>
                  <div className="text-xs text-purple-200">PEN fault monitoring system operation</div>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-orange-200 mb-3">Smart Load Management Implementation</h5>
              <p className="text-foreground mb-4">
                To maximise the use of available supply capacity, the contractor implements a dynamic load management system that monitors building demand and adjusts EV charging accordingly.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h6 className="font-medium text-foreground mb-2">Load Management Features</h6>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Real-time monitoring of building electrical demand</li>
                    <li>• Dynamic power allocation to charging points</li>
                    <li>• Priority scheduling based on user requirements</li>
                    <li>• Integration with time-of-use electricity tariffs</li>
                    <li>• Renewable energy optimisation capability</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-foreground mb-2">Protection Coordination</h6>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Type B RCDs for all charging circuits</li>
                    <li>• SPD protection at main distribution board</li>
                    <li>• Individual circuit protection and isolation</li>
                    <li>• Emergency stop systems for maintenance</li>
                    <li>• Comprehensive earth fault monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-red-200 mb-3">Unexpected Discovery: Cable Capacity Issues</h5>
              <p className="text-foreground mb-4">
                During installation, thermal imaging reveals that existing distribution cables are operating at higher temperatures than expected. Investigation shows that thermal insulation added during a recent building refurbishment has reduced cable current-carrying capacity.
              </p>
              
              <div className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                <h6 className="font-medium text-red-200 mb-2">Capacity Reduction Solution</h6>
                <ul className="text-sm text-red-100 space-y-1">
                  <li>• Detailed cable derating calculations performed</li>
                  <li>• Load management system parameters adjusted</li>
                  <li>• Additional temperature monitoring installed</li>
                  <li>• Phased installation timeline extended to allow upgrades</li>
                  <li>• Alternative cable routes identified for future phases</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-cyan-200 mb-3">Project Success Metrics</h5>
              <p className="text-foreground mb-4">
                Despite the challenges, the project delivers a robust, compliant EV charging infrastructure that exceeds expectations for reliability, safety, and user satisfaction.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h6 className="font-medium text-foreground mb-2">Technical Achievements</h6>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• 100% BS 7671 Part 722 compliance</li>
                    <li>• Zero PEN fault incidents in first year</li>
                    <li>• 95% charging point availability</li>
                    <li>• 30% reduction in building peak demand</li>
                    <li>• Successful integration with building systems</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-foreground mb-2">Business Benefits</h6>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Employee satisfaction increase</li>
                    <li>• Attraction and retention of EV-driving staff</li>
                    <li>• Corporate sustainability targets met</li>
                    <li>• Future-proofed infrastructure for expansion</li>
                    <li>• Reduced operational electricity costs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#0f0f0f] border border-gray-600 rounded">
            <h5 className="font-medium text-elec-yellow mb-3">Discussion Questions:</h5>
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm">How would you prioritise EV charger allocation when demand exceeds available capacity?</p>
                <p className="text-gray-400 text-xs mt-1">Consider fairness, business needs, technical constraints, and user experience.</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">What factors should influence the choice between upgrading supply capacity or implementing load management?</p>
                <p className="text-gray-400 text-xs mt-1">Think about costs, timeline, flexibility, and future requirements.</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">How can thermal effects of existing cables be assessed and managed in EV installations?</p>
                <p className="text-gray-400 text-xs mt-1">Consider measurement techniques, derating calculations, and mitigation strategies.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};