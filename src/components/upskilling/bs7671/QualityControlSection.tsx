import { CheckSquare, Target, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const QualityControlSection = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-900/20 to-elec-gray border-blue-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-elec-yellow" />
          Quality Control Procedures and Checklists
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-blue-600 text-foreground">Systematic Verification</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Design Stage Quality Control:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Load Assessment Checklist:</h6>
              <div className="space-y-2">
                <div className="flex items-start gap-3 py-2 touch-manipulation">
                  <input type="checkbox" className="rounded mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base leading-relaxed">Maximum demand calculated using appropriate diversity factors</span>
                </div>
                <div className="flex items-start gap-3 py-2 touch-manipulation">
                  <input type="checkbox" className="rounded mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base leading-relaxed">Future expansion requirements considered (EV charging, heat pumps)</span>
                </div>
                <div className="flex items-start gap-3 py-2 touch-manipulation">
                  <input type="checkbox" className="rounded mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base leading-relaxed">Special loads identified and accommodated (motors, welders, IT equipment)</span>
                </div>
                <div className="flex items-start gap-3 py-2 touch-manipulation">
                  <input type="checkbox" className="rounded mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base leading-relaxed">Supply capacity adequate for total connected load</span>
                </div>
                <div className="flex items-start gap-3 py-2 touch-manipulation">
                  <input type="checkbox" className="rounded mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base leading-relaxed">Three-phase balance achieved where applicable</span>
                </div>
              </div>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Protection Coordination Checklist:</h6>
              <div className="space-y-2">
                <div className="flex items-start gap-3 py-2 touch-manipulation">
                  <input type="checkbox" className="rounded mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base leading-relaxed">Protective device ratings appropriate for circuit design current</span>
                </div>
                <div className="flex items-start gap-3 py-2 touch-manipulation">
                  <input type="checkbox" className="rounded mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base leading-relaxed">Discrimination achieved between upstream and downstream devices</span>
                </div>
                <div className="flex items-start gap-3 py-2 touch-manipulation">
                  <input type="checkbox" className="rounded mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base leading-relaxed">Earth fault loop impedance values comply with tabulated limits</span>
                </div>
                <div className="flex items-start gap-3 py-2 touch-manipulation">
                  <input type="checkbox" className="rounded mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base leading-relaxed">RCD protection provided where required by regulations</span>
                </div>
                <div className="flex items-start gap-3 py-2 touch-manipulation">
                  <input type="checkbox" className="rounded mt-1 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base leading-relaxed">Arc fault protection considered for high-risk applications</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Installation Quality Verification:</h5>
          
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-3 text-sm sm:text-base">Cable Installation Standards</h6>
              <ul className="text-sm sm:text-base space-y-2">
                <li>☐ Appropriate cable types selected for environment</li>
                <li>☐ Installation methods comply with manufacturer specifications</li>
                <li>☐ Minimum bending radii observed</li>
                <li>☐ Support intervals comply with BS 7671 requirements</li>
                <li>☐ Protection from mechanical damage adequate</li>
                <li>☐ Segregation from other services maintained</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-3 text-sm sm:text-base">Earthing and Bonding Verification</h6>
              <ul className="text-sm sm:text-base space-y-2">
                <li>☐ Main earthing terminal properly connected</li>
                <li>☐ Equipotential bonding to water and gas services</li>
                <li>☐ Supplementary bonding where required</li>
                <li>☐ Earth electrode installation (where applicable)</li>
                <li>☐ Protective conductor continuity verified</li>
                <li>☐ Bonding conductor sizes comply with regulations</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-yellow-400">
              <h6 className="font-bold text-yellow-400 mb-3 text-sm sm:text-base">Consumer Unit Installation</h6>
              <ul className="text-sm sm:text-base space-y-2">
                <li>☐ Non-combustible enclosure used</li>
                <li>☐ Height and accessibility appropriate</li>
                <li>☐ Adequate working space provided</li>
                <li>☐ Circuit identification clear and durable</li>
                <li>☐ RCD testing facilities accessible</li>
                <li>☐ Warning notices and schedules provided</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-800 p-4 rounded touch-manipulation">
                <Settings className="h-6 w-6 text-elec-yellow mb-3" />
                <h6 className="font-bold text-foreground mb-3 text-sm sm:text-base">Workmanship Standards</h6>
                <ul className="text-sm space-y-2">
                  <li>☐ Neat and professional appearance</li>
                  <li>☐ Appropriate tools and techniques used</li>
                  <li>☐ No damage to building fabric</li>
                  <li>☐ Fire stopping correctly installed</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded touch-manipulation">
                <Target className="h-6 w-6 text-elec-yellow mb-3" />
                <h6 className="font-bold text-foreground mb-3 text-sm sm:text-base">Safety Measures</h6>
                <ul className="text-sm space-y-2">
                  <li>☐ Live working minimised and controlled</li>
                  <li>☐ Adequate PPE used throughout</li>
                  <li>☐ Isolation procedures followed</li>
                  <li>☐ Test equipment calibrated and appropriate</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded touch-manipulation">
                <CheckSquare className="h-6 w-6 text-elec-yellow mb-3" />
                <h6 className="font-bold text-foreground mb-3 text-sm sm:text-base">Documentation Control</h6>
                <ul className="text-sm space-y-2">
                  <li>☐ Installation records maintained</li>
                  <li>☐ Material certificates available</li>
                  <li>☐ Test results recorded accurately</li>
                  <li>☐ Non-conformances documented</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Testing and Verification Procedures:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Pre-Testing Verification:</h6>
              <ul className="text-sm space-y-1">
                <li>• Visual inspection completed and documented</li>
                <li>• Installation safe for testing activities</li>
                <li>• Test equipment calibrated and appropriate</li>
                <li>• Circuit isolation verified before testing</li>
                <li>• Protective equipment and procedures in place</li>
                <li>• Test sequence planned to avoid damage</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Test Result Evaluation:</h6>
              <ul className="text-sm space-y-1">
                <li>• Results compared against regulatory limits</li>
                <li>• Temperature corrections applied where necessary</li>
                <li>• Unexpected results investigated thoroughly</li>
                <li>• Remedial work documented and re-tested</li>
                <li>• Overall installation compliance verified</li>
                <li>• Certification completed only when satisfactory</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Quality Management Systems:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
              <h6 className="font-bold text-purple-400 mb-1">ISO 9001 Integration</h6>
              <p className="text-sm">Quality management systems provide framework for consistent delivery, continuous improvement, and customer satisfaction in electrical installation work.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-1">Competence Management</h6>
              <p className="text-sm">Regular training, competence assessment, and professional development ensure personnel maintain current knowledge and skills for quality delivery.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-1">Customer Communication</h6>
              <p className="text-sm">Clear communication of scope, limitations, recommendations, and maintenance requirements ensures customer understanding and satisfaction.</p>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Common Quality Issues and Prevention:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-red-400 font-medium mb-2">Frequent Problems:</h6>
              <ul className="text-sm space-y-1">
                <li>• Incomplete circuit identification and labelling</li>
                <li>• Inadequate protective conductor connections</li>
                <li>• Poor cable termination techniques</li>
                <li>• Missing or incorrect certification</li>
                <li>• Insufficient testing documentation</li>
                <li>• Non-compliance with special location requirements</li>
              </ul>
            </div>
            <div>
              <h6 className="text-green-400 font-medium mb-2">Prevention Strategies:</h6>
              <ul className="text-sm space-y-1">
                <li>• Systematic approach using standardised checklists</li>
                <li>• Regular peer review and supervision</li>
                <li>• Ongoing training and competence development</li>
                <li>• Quality audits and performance monitoring</li>
                <li>• Customer feedback integration</li>
                <li>• Continuous improvement processes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Performance Metrics and KPIs:</h5>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-3 rounded text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">98%</div>
              <div className="text-xs">First-time certification pass rate target</div>
            </div>
            <div className="bg-gray-800 p-3 rounded text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">&lt;5%</div>
              <div className="text-xs">Remedial work requirement target</div>
            </div>
            <div className="bg-gray-800 p-3 rounded text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">Zero</div>
              <div className="text-xs">Safety incidents target</div>
            </div>
            <div className="bg-gray-800 p-3 rounded text-center">
              <div className="text-2xl font-bold text-elec-yellow mb-1">95%</div>
              <div className="text-xs">Customer satisfaction target</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QualityControlSection;