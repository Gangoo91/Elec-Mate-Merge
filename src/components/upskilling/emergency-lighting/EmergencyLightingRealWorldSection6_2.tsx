import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export const EmergencyLightingRealWorldSection6_2 = () => {
  return (
    <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-orange-400" />
          Real-World Examples
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        
        {/* Case Study 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-orange-400"></div>
            <p className="font-semibold text-orange-400">
              Case Study 1: Manchester Retail Complex — Missing Fire Strategy Integration (2024)
            </p>
          </div>
          
          <div className="bg-elec-dark rounded-lg p-4 border border-orange-500/30">
            <p className="text-sm leading-relaxed mb-3">
              A retail complex in Manchester passed its emergency lighting installation test and received commissioning certification. 
              The system functioned correctly, achieving all required lux levels with appropriate duration. However, during a routine 
              fire safety audit six months after opening, Fire Safety Officers identified a critical compliance failure.
            </p>
            
            <p className="text-sm leading-relaxed mb-3">
              The emergency lighting drawings and certificates were not included in the site's Fire Safety Strategy folder. The 
              building manager could not immediately produce documentation showing how emergency lighting integrated with the fire 
              evacuation strategy. Although the physical system worked perfectly, inspectors could not verify compliance.
            </p>
            
            <p className="text-sm leading-relaxed">
              The Fire Safety Officer stated: <em>"The Fire Safety Strategy must document all fire precautions, including emergency 
              lighting. Without this documentation, I cannot verify the installation supports your evacuation strategy. The system 
              may be compliant, but you cannot demonstrate it."</em>
            </p>
          </div>
          
          <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
            <p className="text-sm font-semibold text-red-400 mb-2">Consequences:</p>
            <ul className="text-sm space-y-1">
              <li>• Enforcement Notice issued requiring documentation within 28 days</li>
              <li>• Building manager (Responsible Person) fined £12,000 + £3,200 costs</li>
              <li>• Retrospective fire strategy review commissioned (£8,500)</li>
              <li>• Emergency lighting designer recalled to produce integration drawings (£4,200)</li>
              <li>• Negative publicity affected tenant confidence</li>
              <li>• Insurance premiums increased at renewal (additional £18,000 annually)</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-900/20 border border-green-600/30 rounded-lg">
            <p className="text-sm font-semibold text-green-400 mb-2">Key Lessons:</p>
            <p className="text-sm leading-relaxed">
              Documentation of integration is as critical as the installation itself. Emergency lighting must be explicitly referenced 
              in the Fire Safety Strategy, with drawings, calculations, and certificates forming part of the fire safety documentation 
              package. The installation was technically perfect, but the failure to integrate documentation into the fire safety 
              management system created a compliance breach. Always ensure emergency lighting documentation is filed with fire safety 
              records and clearly cross-referenced in the Fire Safety Strategy.
            </p>
          </div>
        </div>

        {/* Case Study 2 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <p className="font-semibold text-red-400">
              Case Study 2: Birmingham Warehouse — Fire Alarm Panel Lighting Failure (2023)
            </p>
          </div>
          
          <div className="bg-elec-dark rounded-lg p-4 border border-red-500/30">
            <p className="text-sm leading-relaxed mb-3">
              A large distribution warehouse in Birmingham had a compliant emergency lighting system with adequate coverage of escape 
              routes and open areas. However, during a real fire incident involving a forklift truck battery, fire wardens discovered 
              they could not read the fire alarm panel when normal lighting failed.
            </p>
            
            <p className="text-sm leading-relaxed mb-3">
              The nearest emergency luminaire was positioned 8 metres from the panel, providing less than 1 lux at panel face. Fire 
              wardens could not identify which zone had triggered, silence the alarm to give evacuation instructions, or reset the 
              panel after the incident. Fire service attendance was extended while they located the fire source using thermal cameras 
              rather than panel indicators.
            </p>
            
            <p className="text-sm leading-relaxed">
              Post-incident investigation by the Fire Authority revealed the emergency lighting designer had not considered fire alarm 
              panel illumination as a specific requirement. The installation passed building control inspection because this integration 
              point was not tested during commissioning.
            </p>
          </div>
          
          <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
            <p className="text-sm font-semibold text-red-400 mb-2">Consequences:</p>
            <ul className="text-sm space-y-1">
              <li>• Enforcement Notice requiring additional emergency luminaires near fire panels</li>
              <li>• Fire spread further than necessary due to delayed fire service response (estimated additional £45,000 damage)</li>
              <li>• Responsible Person prosecuted — £25,000 fine + £8,500 costs</li>
              <li>• Designer faced professional negligence claim (settled out of court)</li>
              <li>• Fire risk assessment required updating (£3,800)</li>
              <li>• Staff retraining on fire procedures (£2,400)</li>
              <li>• Six additional emergency luminaires installed retrospectively (£8,200)</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-900/20 border border-green-600/30 rounded-lg">
            <p className="text-sm font-semibold text-green-400 mb-2">Key Lessons:</p>
            <p className="text-sm leading-relaxed">
              Integration between emergency lighting and fire alarm systems must be explicit and tested. BS 5266-1 requires minimum 
              5 lux at fire alarm control panels and fire-fighting equipment. During commissioning, test integrated functions — 
              verify panel visibility, check fire equipment locations, and ensure fire wardens can operate all life-safety systems 
              during emergency lighting operation. Don't assume adequate escape route lighting automatically provides adequate panel 
              illumination. Critical control interfaces need dedicated consideration and verification.
            </p>
          </div>
        </div>

        {/* Case Study 3 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-amber-500"></div>
            <p className="font-semibold text-amber-400">
              Case Study 3: Leeds Care Home — Inadequate Fire Risk Assessment (2022)
            </p>
          </div>
          
          <div className="bg-elec-dark rounded-lg p-4 border border-amber-500/30">
            <p className="text-sm leading-relaxed mb-3">
              A 48-bed residential care home in Leeds had emergency lighting installed to BS 5266-1 with 1-hour duration. The 
              electrician had designed the system based on the original building plans which showed office use. However, the premises 
              had been converted to a care home three years prior without updating the fire risk assessment.
            </p>
            
            <p className="text-sm leading-relaxed mb-3">
              During a CQC (Care Quality Commission) inspection, the fire risk assessment was found to be generic, outdated, and did 
              not reflect the care home use. The FRA still described "office evacuation" and "staff familiarity with escape routes" — 
              neither applicable to care home residents who may be sleeping, confused, or mobility-impaired.
            </p>
            
            <p className="text-sm leading-relaxed mb-3">
              The Fire Authority was notified and conducted an immediate inspection. They identified that care homes require <strong>3-hour 
              duration</strong> emergency lighting (sleeping accommodation) and enhanced provision for progressive horizontal evacuation 
              to refuges. The 1-hour system was fundamentally inadequate for the actual building use.
            </p>
          </div>
          
          <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
            <p className="text-sm font-semibold text-red-400 mb-2">Consequences:</p>
            <ul className="text-sm space-y-1">
              <li>• Prohibition Notice issued — immediate closure of two floors (24 beds unusable)</li>
              <li>• Care home operator prosecuted — £150,000 fine + £28,000 costs</li>
              <li>• Director received suspended prison sentence (4 months, suspended 18 months)</li>
              <li>• Complete emergency lighting system upgrade required (£89,000)</li>
              <li>• Comprehensive fire risk assessment by specialist consultant (£12,500)</li>
              <li>• Lost revenue during partial closure (estimated £180,000 over 6 weeks)</li>
              <li>• Residents relocated temporarily (reputational damage, several families moved permanently)</li>
              <li>• CQC rating downgraded to "Requires Improvement" affecting future admissions</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-900/20 border border-green-600/30 rounded-lg">
            <p className="text-sm font-semibold text-green-400 mb-2">Key Lessons:</p>
            <p className="text-sm leading-relaxed mb-4">
              Emergency lighting requirements flow from the fire risk assessment, which must accurately reflect current building use. 
              Never design systems based on outdated FRAs or assumptions about building type. Electricians must verify FRA currency 
              and accuracy before designing systems — if the FRA is inadequate, raise this formally with the client in writing.
            </p>
            <p className="text-sm leading-relaxed">
              This case also demonstrates the importance of understanding building-specific requirements: care homes, hospitals, 
              hotels, HMOs, and similar sleeping accommodation require 3-hour duration and often enhanced coverage compared to 
              commercial premises. Generic "office" lighting specifications are dangerous when applied to specialised occupancies. 
              The electrician in this case faced no direct legal consequences but suffered significant reputational damage and lost 
              the client relationship — highlighting the importance of professional due diligence even when not legally obligated.
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
