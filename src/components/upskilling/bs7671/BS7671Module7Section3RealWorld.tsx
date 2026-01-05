import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export const BS7671Module7Section3RealWorld = () => {
  return (
    <Card className="bg-gradient-to-r from-red-900/20 to-elec-gray border-red-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          Real-World Case Studies
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="grid gap-6">
          {/* Case Study 1 */}
          <div className="bg-elec-dark p-4 rounded-md border border-red-600/50">
            <h5 className="text-red-400 font-semibold mb-3">Case Study 1: UV Cable Degradation - Dairy Farm, Somerset</h5>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">The Incident:</h6>
                <p className="text-sm mb-3">
                  A dairy farm installed standard PVC-sheathed cables for external lighting without UV protection. After 18 months of direct sunlight exposure, the outer sheath cracked and split, exposing inner conductors. This created a serious risk of electric shock to livestock and workers, particularly during wet conditions.
                </p>
                <p className="text-sm">
                  The failure occurred during routine maintenance when a worker received a minor shock from the exposed conductor. Immediate testing revealed multiple insulation failures across the installation.
                </p>
              </div>
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">The Solution:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Complete cable replacement with XLPE UV-resistant cables</li>
                  <li>• Installation of protective conduit systems</li>
                  <li>• Underground routing where practically feasible</li>
                  <li>• Implementation of 6-monthly visual inspection schedule</li>
                  <li>• Training for farm staff on electrical safety</li>
                  <li>• Documentation of all outdoor cable routes</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-red-800/30 border border-red-500/50 rounded">
              <p className="text-red-200 text-sm">
                <strong>Lesson Learned:</strong> Initial cost savings from using standard cables resulted in complete reinstallation costs and safety risks. UV-resistant cables would have cost only 15% more initially.
              </p>
            </div>
          </div>

          {/* Case Study 2 */}
          <div className="bg-elec-dark p-4 rounded-md border border-orange-600/50">
            <h5 className="text-orange-400 font-semibold mb-3">Case Study 2: Livestock Electrocution - Pig Farm, Yorkshire</h5>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">The Incident:</h6>
                <p className="text-sm mb-3">
                  A pig farming operation experienced unexplained animal stress and reduced feeding behaviour. Investigation revealed that metal water troughs were carrying a 15V potential due to inadequate equipotential bonding. While not immediately fatal, the chronic exposure was causing stress and production losses.
                </p>
                <p className="text-sm">
                  The problem was traced to a neutral-earth fault in the main distribution board, combined with incomplete equipotential bonding of metalwork within the animal housing areas.
                </p>
              </div>
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">The Remedial Action:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Comprehensive equipotential bonding survey</li>
                  <li>• Installation of 6mm² bonding conductors to all metalwork</li>
                  <li>• Repair of neutral-earth fault</li>
                  <li>• Installation of 30mA RCD protection</li>
                  <li>• Regular voltage monitoring program</li>
                  <li>• Staff training on animal behavioural indicators</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-orange-800/30 border border-orange-500/50 rounded">
              <p className="text-orange-200 text-sm">
                <strong>Economic Impact:</strong> Production returned to normal levels within one week of remedial work completion, justifying the £3,000 investment through improved animal welfare and productivity.
              </p>
            </div>
          </div>

          {/* Case Study 3 */}
          <div className="bg-elec-dark p-4 rounded-md border border-blue-600/50">
            <h5 className="text-blue-400 font-semibold mb-3">Case Study 3: Water Ingress Failure - Market Garden, Kent</h5>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">The Problem:</h6>
                <p className="text-sm mb-3">
                  An automated irrigation system control panel was installed with inadequate IP rating (IP43) for its location near high-pressure washing areas. Repeated water ingress caused control system failures, crop loss, and eventual fire damage to the control cabinet.
                </p>
                <p className="text-sm">
                  The incident occurred during routine cleaning operations when high-pressure water penetrated the control panel, causing short circuits and igniting insulation materials.
                </p>
              </div>
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">The Upgrade:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Replacement with IP65-rated control systems</li>
                  <li>• Relocation away from washing areas</li>
                  <li>• Installation of proper cable gland sealing systems</li>
                  <li>• Implementation of zone-based cleaning procedures</li>
                  <li>• Installation of water detection alarms</li>
                  <li>• Regular IP rating verification testing</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-800/30 border border-blue-500/50 rounded">
              <p className="text-blue-200 text-sm">
                <strong>Prevention Strategy:</strong> Implementation of environmental zone mapping ensures appropriate IP ratings are specified for each installation location based on actual operating conditions.
              </p>
            </div>
          </div>

          {/* Case Study 4 */}
          <div className="bg-elec-dark p-4 rounded-md border border-green-600/50">
            <h5 className="text-green-400 font-semibold mb-3">Case Study 4: Chemical Corrosion - Poultry Farm, Norfolk</h5>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">The Challenge:</h6>
                <p className="text-sm mb-3">
                  A large-scale poultry operation experienced rapid corrosion of electrical components due to high ammonia concentrations from bird waste. Standard steel conduits and standard-grade cable glands failed within 6 months, causing frequent electrical failures and maintenance issues.
                </p>
                <p className="text-sm">
                  The ammonia-rich environment was particularly aggressive, with concentrations reaching 25ppm during peak occupancy periods, well above the 5ppm threshold for standard electrical equipment.
                </p>
              </div>
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">The Solution:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Replacement with stainless steel (316L) conduit systems</li>
                  <li>• Chemical-resistant cable glands and fittings</li>
                  <li>• Enhanced ventilation to reduce ammonia levels</li>
                  <li>• Regular atmospheric monitoring program</li>
                  <li>• Protective coatings on all metallic components</li>
                  <li>• Quarterly corrosion assessment inspections</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-800/30 border border-green-500/50 rounded">
              <p className="text-green-200 text-sm">
                <strong>Long-term Success:</strong> The upgraded installation has now operated successfully for over 5 years with minimal maintenance requirements, demonstrating the importance of proper material selection for aggressive environments.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-elec-yellow">
          <h5 className="text-elec-yellow font-semibold mb-3">Key Implementation Guidelines</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-foreground font-medium mb-2">Design Stage:</h6>
              <ul className="text-sm space-y-1 text-foreground">
                <li>• Conduct thorough environmental risk assessment</li>
                <li>• Specify appropriate materials for conditions</li>
                <li>• Plan for accessibility and maintenance</li>
                <li>• Consider whole-life costs, not just initial costs</li>
              </ul>
            </div>
            <div>
              <h6 className="text-foreground font-medium mb-2">Operation Stage:</h6>
              <ul className="text-sm space-y-1 text-foreground">
                <li>• Implement regular inspection schedules</li>
                <li>• Monitor environmental conditions</li>
                <li>• Train personnel in hazard recognition</li>
                <li>• Maintain comprehensive documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};