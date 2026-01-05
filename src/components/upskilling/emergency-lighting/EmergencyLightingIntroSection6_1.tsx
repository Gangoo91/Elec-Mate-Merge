import { BookOpen, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingIntroSection6_1 = () => {
  return (
    <Card className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow drop-shadow-md" />
          Introduction: Key Clauses from BS 5266-1 and EN 1838
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="leading-relaxed">
          The foundation of all emergency lighting design and installation in the UK is built on <strong>BS 5266-1</strong> and <strong>BS EN 1838</strong>. 
          Together, these standards define how emergency lighting systems must be designed, installed, tested, and maintained to ensure 
          safety during power failures or emergencies.
        </p>

        <p className="leading-relaxed">
          These standards are not merely guidelines — they represent the accepted benchmark of competence and compliance within the industry. 
          Compliance with these standards demonstrates due diligence and professional responsibility. In legal proceedings following a fire or 
          evacuation incident, failure to adhere to BS 5266-1 and EN 1838 can be used as evidence of negligence.
        </p>
        
        <div className="bg-amber-600/20 border border-amber-500/40 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300 font-semibold">Critical Requirement</span>
          </div>
          <p className="text-foreground text-sm leading-relaxed">
            Electricians must be able to interpret and apply these clauses correctly. A system that meets aesthetic or operational 
            goals but fails to meet these standards is non-compliant, unsafe, and legally indefensible under the 
            <strong> Regulatory Reform (Fire Safety) Order 2005</strong>.
          </p>
          <p className="text-foreground text-sm mt-2 leading-relaxed">
            The Fire Safety Order places legal responsibility on the "Responsible Person" (typically the building owner or manager) 
            to ensure adequate emergency lighting provision. Electricians who design, install, or certify non-compliant systems may 
            also face liability, particularly if their work is found to have contributed to injury or loss of life.
          </p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 bg-elec-dark rounded-lg border border-white/10">
            <h4 className="font-semibold text-elec-yellow mb-2">BS 5266-1</h4>
            <p className="text-sm mb-3">
              Focuses on the system design, installation, and ongoing maintenance.
            </p>
            <ul className="text-xs space-y-1 text-gray-300">
              <li>• Design methodology and risk assessment</li>
              <li>• Installation requirements and wiring standards</li>
              <li>• Testing schedules and maintenance procedures</li>
              <li>• Documentation and certification requirements</li>
              <li>• Responsibilities of all parties involved</li>
            </ul>
          </div>
          
          <div className="p-4 bg-elec-dark rounded-lg border border-white/10">
            <h4 className="font-semibold text-elec-yellow mb-2">BS EN 1838</h4>
            <p className="text-sm mb-3">
              Focuses on the lighting performance — specifically illuminance levels, duration, and visibility.
            </p>
            <ul className="text-xs space-y-1 text-gray-300">
              <li>• Minimum illuminance requirements (lux levels)</li>
              <li>• Duration of emergency operation</li>
              <li>• Uniformity ratios to prevent dark spots</li>
              <li>• Colour rendering and visibility standards</li>
              <li>• Exit sign specifications and placement</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-300 mb-2">Why Both Standards Matter</h4>
          <p className="text-sm leading-relaxed">
            BS 5266-1 tells you <strong>how</strong> to design and install the system. EN 1838 tells you <strong>what performance</strong> the 
            system must achieve. You cannot have one without the other — they are complementary and must be read together to ensure full compliance.
          </p>
        </div>
        
        <p className="leading-relaxed">
          This section explores the critical clauses that every electrician must understand to design, install, and certify 
          compliant emergency lighting systems that truly protect building occupants. We will examine specific clauses, their 
          practical application, common mistakes, and real-world consequences of non-compliance.
        </p>
      </CardContent>
    </Card>
  );
};
