import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const BS7671Module7Section3FAQ = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="space-y-4">
          <div className="border-l-4 border-elec-yellow pl-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Q: What IP rating is required for outdoor electrical equipment in the UK?</h5>
            <p className="text-sm">
              <strong>A:</strong> The minimum IP rating depends on the specific location and exposure conditions. For general outdoor use, IP44 provides basic protection against solid objects and water splashing. However, IP55 is recommended for equipment exposed to driving rain or high-pressure washing. In agricultural environments where high-pressure cleaning is common, IP65 or higher may be necessary. Always consider the specific environmental conditions rather than applying a blanket rating.
            </p>
          </div>

          <div className="border-l-4 border-elec-yellow pl-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Q: Can standard PVC cables be used outdoors if they're in conduit?</h5>
            <p className="text-sm">
              <strong>A:</strong> While conduit provides some UV protection, it's not recommended to rely solely on this for standard PVC cables in permanent outdoor installations. UV radiation can penetrate through gaps in conduit systems, and thermal cycling can cause expansion and contraction that exposes cable sections. It's better practice to use UV-resistant cables even when protected by conduit systems, particularly for critical installations.
            </p>
          </div>

          <div className="border-l-4 border-elec-yellow pl-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Q: Why do agricultural installations require enhanced RCD protection?</h5>
            <p className="text-sm">
              <strong>A:</strong> Livestock are more susceptible to electric shock than humans due to their lower body resistance (especially when wet), four-point ground contact, and inability to voluntarily release from energised parts. Additionally, the consequences of electric shock in animals can include permanent injury, reduced productivity, or death. Enhanced RCD protection with 30mA sensitivity helps ensure that dangerous fault currents are interrupted quickly enough to prevent harm to both animals and humans.
            </p>
          </div>

          <div className="border-l-4 border-elec-yellow pl-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Q: What's the difference between touch voltage and step voltage in agricultural settings?</h5>
            <p className="text-sm">
              <strong>A:</strong> Touch voltage is the potential difference between a conductive part that can be touched and the local earth potential, while step voltage is the potential difference between two points on the ground surface separated by a distance of one human step (approximately 1 metre). In agricultural settings, animals with four legs spanning greater distances can experience higher step voltages. The limits are typically 25V touch and 10V step for livestock, compared to 50V touch and 25V step for humans in dry conditions.
            </p>
          </div>

          <div className="border-l-4 border-elec-yellow pl-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Q: How often should outdoor electrical installations be inspected?</h5>
            <p className="text-sm">
              <strong>A:</strong> BS 7671 recommends visual inspections every 6 months for outdoor installations in normal conditions, with more frequent inspections (quarterly or monthly) in harsh environments such as coastal areas or chemically aggressive agricultural settings. Full electrical testing should be conducted annually for commercial agricultural installations, or every 3 years for less critical outdoor installations. However, any signs of damage, unusual operation, or environmental changes should trigger immediate inspection.
            </p>
          </div>

          <div className="border-l-4 border-elec-yellow pl-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Q: What materials should be avoided in chemically aggressive environments like poultry farms?</h5>
            <p className="text-sm">
              <strong>A:</strong> Avoid standard mild steel conduits, standard brass fittings, aluminium components, and standard PVC cable glands in high-ammonia environments. Ammonia concentrations above 5ppm can cause rapid corrosion of ferrous metals and degradation of some plastics. Instead, use stainless steel (grade 316L), chemical-resistant plastics (such as polypropylene or PTFE), and specially designed chemical-resistant cable glands. Regular monitoring of atmospheric conditions helps determine appropriate material selection.
            </p>
          </div>

          <div className="border-l-4 border-elec-yellow pl-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Q: Is it necessary to bond all metal structures in agricultural buildings?</h5>
            <p className="text-sm">
              <strong>A:</strong> Yes, BS 7671 Section 705 requires all accessible metallic structures in agricultural locations to be included in the equipotential bonding system. This includes structural steelwork, reinforcing bars in concrete, metal pipework, water troughs, feeders, gates, and even fence posts within 3 metres of buildings. The bonding conductor must be minimum 4mm² copper, with 6mm² recommended for main equipotential connections. This ensures that dangerous potential differences cannot develop between different metallic parts.
            </p>
          </div>

          <div className="border-l-4 border-elec-yellow pl-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Q: Can TN-C-S (PME) earthing systems be used in agricultural installations?</h5>
            <p className="text-sm">
              <strong>A:</strong> While not prohibited, TN-C-S systems are generally not recommended for agricultural installations due to the risk of neutral-earth faults affecting livestock. If PME is used, additional precautions are required, including comprehensive equipotential bonding and enhanced monitoring. TN-S systems are preferred where available, or TT systems with local earth electrodes can provide better protection against neutral-earth faults. The decision should be based on a risk assessment considering the specific installation conditions and livestock present.
            </p>
          </div>

          <div className="border-l-4 border-elec-yellow pl-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Q: What documentation is required for outdoor and agricultural electrical installations?</h5>
            <p className="text-sm">
              <strong>A:</strong> Complete documentation should include: electrical installation certificates, inspection and testing records, equipotential bonding schedules, environmental risk assessments, material specification justifications, maintenance schedules and records, incident reports, and regular inspection checklists. Additionally, drawings showing cable routes, earth electrode locations, and bonding connections are essential. This documentation is crucial for insurance, safety compliance, and future maintenance or modifications.
            </p>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-elec-yellow">
          <h5 className="text-elec-yellow font-semibold mb-2">Additional Resources</h5>
          <ul className="text-sm space-y-1 text-foreground">
            <li>• BS 7671:2018+A2:2022 Section 705 - Agricultural and horticultural premises</li>
            <li>• BS EN 60529 - Degrees of protection provided by enclosures (IP Code)</li>
            <li>• HSE Guidance HSR25 - Memorandum of guidance on the Electricity at Work Regulations 1989</li>
            <li>• IEC 60364-4-44 - Protection for safety - Protection against voltage disturbances</li>
            <li>• BS EN 61140 - Protection against electric shock - Common aspects</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};