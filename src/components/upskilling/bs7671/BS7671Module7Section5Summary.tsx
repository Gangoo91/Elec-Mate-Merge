import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Lightbulb, TrendingUp } from 'lucide-react';

export const BS7671Module7Section5Summary = () => {
  return (
    <Card className="bg-gradient-to-r from-slate-900/40 to-elec-gray border-slate-600/50">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-elec-yellow" />
          Module 7.5 Summary: Prosumer Electrical Installations
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Key Learning Points
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">
                    <strong>PEI Definition:</strong> Installations that both consume and generate energy, 
                    requiring bi-directional energy flow management and advanced protection systems.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">
                    <strong>Energy Management:</strong> Smart control systems optimise generation, storage, 
                    and consumption to maximise self-sufficiency and economic benefits.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">
                    <strong>Grid Integration:</strong> G98/G99 compliance ensures safe connection whilst 
                    enabling participation in flexibility markets and grid services.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">
                    <strong>Battery Safety:</strong> Comprehensive BMS, thermal management, and fire 
                    suppression systems ensure safe operation of energy storage systems.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">
                    <strong>Commissioning:</strong> Systematic testing and verification procedures 
                    ensure optimal performance and compliance with all safety requirements.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Critical Success Factors
              </h4>
              <div className="space-y-3">
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <h5 className="text-green-400 font-medium text-sm mb-1">Technical Excellence</h5>
                  <p className="text-xs">
                    Proper system design, quality components, and professional installation 
                    are fundamental to achieving long-term performance and reliability.
                  </p>
                </div>
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <h5 className="text-blue-400 font-medium text-sm mb-1">Regulatory Compliance</h5>
                  <p className="text-xs">
                    Understanding and adhering to BS 7671 Part 8, G98/G99 requirements, 
                    and local planning regulations ensures smooth project delivery.
                  </p>
                </div>
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <h5 className="text-purple-400 font-medium text-sm mb-1">Economic Optimisation</h5>
                  <p className="text-xs">
                    Balancing capital investment with operational savings and revenue 
                    opportunities maximises the business case for PEI systems.
                  </p>
                </div>
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <h5 className="text-orange-400 font-medium text-sm mb-1">Future-Proofing</h5>
                  <p className="text-xs">
                    Designing for scalability and technology evolution ensures systems 
                    remain viable throughout their operational lifetime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h4 className="text-elec-yellow font-semibold mb-3">Regulatory Framework Summary</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h5 className="text-cyan-400 font-medium mb-2 text-sm">BS 7671 Part 8</h5>
              <ul className="text-xs space-y-1">
                <li>• Prosumer installation definitions</li>
                <li>• Bi-directional protection requirements</li>
                <li>• Energy management system standards</li>
                <li>• Battery storage safety protocols</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lime-400 font-medium mb-2 text-sm">Grid Connection Codes</h5>
              <ul className="text-xs space-y-1">
                <li>• G98: Simplified connection (&lt;16A/phase)</li>
                <li>• G99: Standard connection procedures</li>
                <li>• Distribution Code compliance</li>
                <li>• Export limitation requirements</li>
              </ul>
            </div>
            <div>
              <h5 className="text-pink-400 font-medium mb-2 text-sm">Supporting Standards</h5>
              <ul className="text-xs space-y-1">
                <li>• IEC 61850: Power system communication</li>
                <li>• IEC 62351: Cybersecurity protocols</li>
                <li>• IEEE 1547: Interconnection standards</li>
                <li>• ISO 50001: Energy management systems</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-4 rounded-md border border-green-600/30">
          <h4 className="text-foreground font-semibold mb-2">Professional Development Impact</h4>
          <p className="text-sm text-gray-200 mb-3">
            Mastery of prosumer electrical installations positions you at the forefront of the energy transition. 
            These skills are increasingly valuable as the UK moves towards net-zero emissions and greater energy independence.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-green-400 font-medium text-sm mb-1">Career Opportunities</h5>
              <ul className="text-xs space-y-1">
                <li>• Renewable energy system designer</li>
                <li>• Energy storage specialist</li>
                <li>• Microgrid engineer</li>
                <li>• Grid integration consultant</li>
              </ul>
            </div>
            <div>
              <h5 className="text-blue-400 font-medium text-sm mb-1">Market Growth Areas</h5>
              <ul className="text-xs space-y-1">
                <li>• Domestic solar-plus-storage</li>
                <li>• Commercial energy management</li>
                <li>• Community energy projects</li>
                <li>• Industrial microgrids</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h4 className="text-elec-yellow font-semibold mb-3">Next Steps & Continuous Learning</h4>
          <div className="space-y-2">
            <p className="text-sm">
              The prosumer installation sector continues to evolve rapidly with new technologies, 
              regulations, and market opportunities. Stay current through:
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li>• Regular updates to BS 7671 and related standards</li>
              <li>• Manufacturer training on new equipment and technologies</li>
              <li>• Professional development courses on emerging grid technologies</li>
              <li>• Industry conferences and technical seminars</li>
              <li>• Collaboration with DNOs and flexibility service providers</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};