import { BookOpen, AlertTriangle, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingIntroSection6_2 = () => {
  return (
    <Card className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow drop-shadow-md" />
          Introduction: Integration with Fire Safety Regulations
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="leading-relaxed">
          Emergency lighting is not an isolated requirement; it's a fundamental part of a building's overall fire safety strategy.
          In the UK, the <strong>Regulatory Reform (Fire Safety) Order 2005 (RRO)</strong> places a legal duty on the Responsible Person 
          to ensure occupants can safely evacuate in an emergency.
        </p>

        <p className="leading-relaxed">
          Emergency lighting systems—designed to BS 5266-1, BS 5266-8 (EN 50172) and EN 1838—are the means by which this obligation is met. 
          They must work seamlessly with fire detection systems, alarm systems, evacuation procedures, and building management protocols to 
          create a cohesive life-safety infrastructure.
        </p>
        
        <div className="bg-amber-600/20 border border-amber-500/40 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300 font-semibold">Legal Context</span>
          </div>
          <p className="text-foreground text-sm leading-relaxed">
            Electricians and designers must understand not just how to install emergency lighting correctly, but how it integrates 
            with fire detection, alarm systems, evacuation procedures, and building management responsibilities. The RRO makes the 
            Responsible Person criminally liable for failures—but designers and installers can also face liability if their work 
            contributes to non-compliance.
          </p>
          <p className="text-foreground text-sm mt-2 leading-relaxed">
            In legal proceedings following a fire, investigators will examine whether emergency lighting formed part of a coherent, 
            documented fire safety strategy. Isolated compliance with BS 5266-1 is insufficient if the system was not integrated 
            with the building's broader fire safety management framework.
          </p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 bg-elec-dark rounded-lg border border-white/10">
            <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
              <Scale className="h-4 w-4" />
              Legislative Framework
            </h4>
            <p className="text-sm mb-3">
              The RRO creates legal obligations that must be satisfied through properly integrated systems.
            </p>
            <ul className="text-xs space-y-1 text-gray-300">
              <li>• Regulatory Reform (Fire Safety) Order 2005</li>
              <li>• Building Regulations Approved Document B</li>
              <li>• Fire Scotland Act 2005 (Scotland)</li>
              <li>• Fire Safety (Northern Ireland) Regulations 2010</li>
              <li>• Corporate Manslaughter and Corporate Homicide Act 2007</li>
            </ul>
          </div>
          
          <div className="p-4 bg-elec-dark rounded-lg border border-white/10">
            <h4 className="font-semibold text-elec-yellow mb-2">Integration Requirements</h4>
            <p className="text-sm mb-3">
              Emergency lighting must integrate with multiple fire safety systems and procedures.
            </p>
            <ul className="text-xs space-y-1 text-gray-300">
              <li>• Fire detection and alarm systems</li>
              <li>• Fire risk assessments and evacuation strategies</li>
              <li>• Building management and maintenance protocols</li>
              <li>• Fire fighting equipment and access routes</li>
              <li>• Disabled evacuation provisions and refuges</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-300 mb-2">Why Integration Matters</h4>
          <p className="text-sm leading-relaxed">
            A perfectly installed emergency lighting system that doesn't align with the building's fire strategy, isn't documented 
            in fire safety plans, or doesn't work alongside fire alarm systems creates dangerous gaps in life safety provision. 
            Integration ensures that all systems work together during the critical moments of an emergency evacuation, when coordination 
            and reliability are literally matters of life and death.
          </p>
        </div>
        
        <p className="leading-relaxed">
          This section explores how emergency lighting integrates with UK fire safety law, the role of fire risk assessments, 
          coordination with fire alarm systems, enforcement mechanisms, and the documentation required to demonstrate compliant integration. 
          We'll examine specific regulatory requirements, practical integration methods, and real-world consequences when integration fails.
        </p>
      </CardContent>
    </Card>
  );
};
