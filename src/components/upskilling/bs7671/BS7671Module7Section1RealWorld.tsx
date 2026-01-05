import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export const BS7671Module7Section1RealWorld = () => {
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
          <h4 className="font-semibold text-foreground mb-4">The Hotel Bathroom Refurbishment Challenge</h4>
          
          <div className="space-y-6">
            <div>
              <h5 className="font-medium text-blue-200 mb-3">The Project</h5>
              <p className="text-foreground mb-4">
                A boutique hotel is refurbishing 50 en-suite bathrooms to meet modern standards whilst maintaining luxury appeal. Each bathroom features a large walk-in shower, standalone bathtub, and premium finishes. The electrical contractor must ensure full BS 7671 compliance whilst accommodating the client's design requirements.
              </p>
              <p className="text-foreground">
                The challenge: the original 1980s installation has numerous non-compliances, and the new design includes integrated LED lighting, heated towel rails, smart mirrors, and underfloor heating systems.
              </p>
            </div>
            
            <div>
              <h5 className="font-medium text-green-200 mb-3">Zone Analysis & Planning</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <h6 className="font-medium text-foreground mb-2">Existing Issues Identified</h6>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Light switches within Zone 2 areas</li>
                    <li>• Standard socket outlets too close to baths</li>
                    <li>• Inadequate IP ratings on existing fixtures</li>
                    <li>• No RCD protection on bathroom circuits</li>
                    <li>• Non-compliant cable routing through wet areas</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-foreground mb-2">New Design Requirements</h6>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Smart mirrors with integrated lighting and heating</li>
                    <li>• LED strip lighting above shower areas</li>
                    <li>• Electric underfloor heating throughout</li>
                    <li>• Heated towel rails with thermostatic controls</li>
                    <li>• Extractor fans with humidity sensors</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-purple-200 mb-3">Solution Implementation</h5>
              <p className="text-foreground mb-4">
                The electrical team conducts detailed zone measurements for each bathroom layout. They discover that the walk-in shower configuration creates an extended Zone 1 area that affects the placement of several proposed fixtures.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className="text-xs text-green-200">Bathrooms requiring zone recalculation</div>
                </div>
                <div className="text-center p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="text-2xl font-bold text-blue-400">30%</div>
                  <div className="text-xs text-blue-200">Fixtures requiring repositioning</div>
                </div>
                <div className="text-center p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="text-2xl font-bold text-purple-400">0</div>
                  <div className="text-xs text-purple-200">Compliance issues after completion</div>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-orange-200 mb-3">Critical Design Changes</h5>
              <p className="text-foreground mb-4">
                Several significant modifications are required to achieve compliance whilst maintaining the luxury aesthetic:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h6 className="font-medium text-foreground mb-2">Smart Mirror Solution</h6>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Repositioned outside Zone 2 boundaries</li>
                    <li>• SELV supply from transformer in adjacent room</li>
                    <li>• IP44 rating maintained despite relocation</li>
                    <li>• Wireless controls replacing wired switches</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-foreground mb-2">Lighting Reconfiguration</h6>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• LED strips upgraded to IP65 rating</li>
                    <li>• Emergency lighting integrated into design</li>
                    <li>• PIR sensors located outside zones</li>
                    <li>• Maintenance access improved with modular design</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-red-200 mb-3">Unexpected Challenge: Historic Building Constraints</h5>
              <p className="text-foreground mb-4">
                During installation, the team discovers that the building's listed status restricts cable routing options. Creative solutions are required to achieve BS 7671 compliance without damaging historic features.
              </p>
              
              <div className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                <h6 className="font-medium text-red-200 mb-2">Heritage Compliance Solution</h6>
                <ul className="text-sm text-red-100 space-y-1">
                  <li>• Surface-mounted containment systems in discrete locations</li>
                  <li>• Flexible conduit systems allowing reversible installation</li>
                  <li>• Coordination with conservation officers throughout</li>
                  <li>• Alternative earthing arrangements using existing metalwork</li>
                  <li>• Documentation of all interventions for future reference</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-cyan-200 mb-3">Project Outcomes</h5>
              <p className="text-foreground mb-4">
                Despite the challenges, the project achieves full compliance with BS 7671 whilst exceeding the client's aesthetic expectations. The systematic approach to zone analysis and creative problem-solving results in a successful installation.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h6 className="font-medium text-foreground mb-2">Technical Achievements</h6>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• 100% BS 7671 compliance across all bathrooms</li>
                    <li>• Enhanced safety through upgraded protection</li>
                    <li>• Future-proofed infrastructure for technology upgrades</li>
                    <li>• Improved energy efficiency through LED systems</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-foreground mb-2">Commercial Benefits</h6>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Luxury aesthetic maintained and enhanced</li>
                    <li>• Reduced maintenance requirements</li>
                    <li>• Improved guest satisfaction ratings</li>
                    <li>• Compliance certificate enabling operation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#0f0f0f] border border-gray-600 rounded">
            <h5 className="font-medium text-elec-yellow mb-3">Discussion Questions:</h5>
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm">How would you handle client requests that conflict with BS 7671 requirements?</p>
                <p className="text-gray-400 text-xs mt-1">Consider professional obligations, safety responsibilities, and commercial pressures.</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">What additional considerations apply when working in listed buildings?</p>
                <p className="text-gray-400 text-xs mt-1">Think about conservation requirements, alternative installation methods, and documentation needs.</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">How can zone analysis be communicated effectively to non-technical clients?</p>
                <p className="text-gray-400 text-xs mt-1">Consider visual aids, practical examples, and the importance of explaining safety benefits.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};