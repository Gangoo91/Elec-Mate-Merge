import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export const EmergencyLightingRealWorldSection6_1 = () => {
  return (
    <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-orange-400" />
          Real-World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        
        {/* Case Study 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-orange-400"></div>
            <p className="font-semibold text-orange-400">
              Case Study 1: Manchester Engineering Firm — Documentation Failure (2023)
            </p>
          </div>
          
          <div className="bg-elec-dark rounded-lg p-4 border border-orange-500/30">
            <p className="text-sm leading-relaxed mb-3">
              An engineering firm in Manchester installed an emergency lighting system in a three-storey office building. 
              The system achieved adequate illumination levels and functioned correctly during testing. However, during the 
              final fire safety inspection, the system <strong>failed audit</strong> because:
            </p>
            
            <ul className="text-sm space-y-2 ml-4 mb-3">
              <li>• Design documentation did not reference EN 1838's specific lux level requirements</li>
              <li>• No photometric calculations were provided to demonstrate compliance</li>
              <li>• Test certificates lacked clause references to BS 5266-1</li>
              <li>• As-built drawings didn't show luminaire spacing calculations</li>
            </ul>
            
            <p className="text-sm leading-relaxed">
              The building control officer rejected the installation, stating: <em>"I cannot certify a system where compliance 
              cannot be demonstrated on paper, regardless of whether it appears to work correctly."</em>
            </p>
          </div>
          
          <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
            <p className="text-sm font-semibold text-red-400 mb-2">Consequences:</p>
            <ul className="text-sm space-y-1">
              <li>• Complete documentation overhaul required</li>
              <li>• Retrospective photometric survey commissioned (£3,800)</li>
              <li>• Building occupancy delayed by 6 weeks</li>
              <li>• Total additional cost: £12,400 + loss of rental income</li>
              <li>• Client relationship damaged — future work lost</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-900/20 border border-green-600/30 rounded-lg">
            <p className="text-sm font-semibold text-green-400 mb-2">Key Lessons:</p>
            <p className="text-sm leading-relaxed">
              Documentation and standards referencing are as important as physical performance. A functioning system without 
              proper documentation is still non-compliant. Always prepare comprehensive design calculations, reference specific 
              standard clauses, and maintain detailed commissioning records. The cost of proper documentation is trivial compared 
              to the cost of rectification.
            </p>
          </div>
        </div>

        {/* Case Study 2 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <p className="font-semibold text-red-400">
              Case Study 2: Birmingham Hotel — Duration Specification Error (2022)
            </p>
          </div>
          
          <div className="bg-elec-dark rounded-lg p-4 border border-red-500/30">
            <p className="text-sm leading-relaxed mb-3">
              A 120-room hotel in Birmingham had its emergency lighting system installed with standard 1-hour battery duration. 
              During the final building regulations inspection, the fire officer identified that sleeping accommodation requires 
              <strong> 3-hour duration</strong> under BS 5266-1, Clause 5.4.2.
            </p>
            
            <p className="text-sm leading-relaxed mb-3">
              The contractor had followed the architectural specification without questioning it. The architect had not consulted 
              the emergency lighting sections of BS 5266-1 and assumed 1-hour duration was universal.
            </p>
          </div>
          
          <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
            <p className="text-sm font-semibold text-red-400 mb-2">Consequences:</p>
            <ul className="text-sm space-y-1">
              <li>• 214 luminaires required replacement with 3-hour versions</li>
              <li>• Central battery system upgraded to triple capacity</li>
              <li>• Hotel opening delayed by 10 weeks (peak summer season lost)</li>
              <li>• Total rectification cost: £67,000</li>
              <li>• Contractor faced breach of contract claim</li>
              <li>• Professional indemnity insurance claim affected future premiums</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-900/20 border border-green-600/30 rounded-lg">
            <p className="text-sm font-semibold text-green-400 mb-2">Key Lessons:</p>
            <p className="text-sm leading-relaxed">
              Never assume specifications are correct — always verify against BS 5266-1. Clause 5 defines duration requirements 
              based on building type and occupancy. Sleeping accommodation, entertainment venues, and premises without direct 
              external access always require 3-hour duration. A competent electrician must challenge incorrect specifications 
              in writing before proceeding. Professional responsibility cannot be delegated to the specifier.
            </p>
          </div>
        </div>

        {/* Case Study 3 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-amber-500"></div>
            <p className="font-semibold text-amber-400">
              Case Study 3: Leeds Industrial Unit — Testing Regime Neglect (2024)
            </p>
          </div>
          
          <div className="bg-elec-dark rounded-lg p-4 border border-amber-500/30">
            <p className="text-sm leading-relaxed mb-3">
              An industrial unit in Leeds had a compliant emergency lighting system installed in 2019. However, the maintenance 
              contract lapsed, and the building owner (Responsible Person) failed to conduct monthly functional tests or annual 
              full-duration discharge tests as required by BS 5266-8.
            </p>
            
            <p className="text-sm leading-relaxed mb-3">
              In January 2024, a power failure occurred during working hours. Multiple emergency luminaires failed to operate — 
              batteries had degraded below operational capacity due to lack of testing. Fortunately, evacuation occurred during 
              daylight hours with no injuries.
            </p>
            
            <p className="text-sm leading-relaxed mb-3">
              The subsequent fire brigade inspection found no test records for over 3 years. The Fire Safety Officer issued a 
              <strong> Prohibition Notice</strong> under Article 31 of the Regulatory Reform (Fire Safety) Order 2005, preventing 
              building use until full system verification and testing was completed.
            </p>
          </div>
          
          <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
            <p className="text-sm font-semibold text-red-400 mb-2">Consequences:</p>
            <ul className="text-sm space-y-1">
              <li>• Building closed for 2 weeks pending system verification</li>
              <li>• 47 luminaires required battery replacement (£4,200)</li>
              <li>• Responsible Person prosecuted — £15,000 fine + £8,000 costs</li>
              <li>• Business interruption loss estimated at £85,000</li>
              <li>• Insurance premiums increased significantly</li>
              <li>• Reputational damage with clients and insurers</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-900/20 border border-green-600/30 rounded-lg">
            <p className="text-sm font-semibold text-green-400 mb-2">Key Lessons:</p>
            <p className="text-sm leading-relaxed">
              Installation is only the beginning — ongoing testing and maintenance are legal requirements, not optional. 
              BS 5266-8 mandates daily automatic tests (for systems with facilities), monthly functional tests, and annual 
              full-duration discharge tests. Electricians must educate clients about these obligations during handover and 
              provide clear written guidance. Consider offering maintenance contracts to ensure compliance continues.
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
