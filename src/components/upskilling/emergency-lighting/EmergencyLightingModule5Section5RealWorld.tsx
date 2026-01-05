import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, AlertTriangle, FileX, Clock, XCircle, CheckCircle2, GraduationCap } from 'lucide-react';

export const EmergencyLightingModule5Section5RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          Real-World Case Study
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
          Birmingham School Refurbishment
        </h3>

        {/* Project Context */}
        <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
          <div className="flex items-start gap-3 mb-2">
            <Building2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <h4 className="font-semibold text-blue-400 text-sm sm:text-base lg:text-lg">Project Context</h4>
          </div>
          <p className="text-foreground text-sm sm:text-base lg:text-lg ml-0 sm:ml-8">
            A school refurbishment project in Birmingham was completed with a fully functional emergency lighting 
            system. All luminaires were installed correctly, 3-hour duration tests passed, and exit signs complied 
            with ISO 7010. The system was physically operational and ready for use.
          </p>
        </div>

        {/* The Problem */}
        <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-amber-500">
          <div className="flex items-start gap-3 mb-2">
            <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <h4 className="font-semibold text-amber-400 text-sm sm:text-base lg:text-lg">The Problem</h4>
          </div>
          <p className="text-foreground text-sm sm:text-base lg:text-lg ml-0 sm:ml-8">
            During a safety audit conducted by the local fire authority, the absence of a formal commissioning 
            certificate meant the installation was deemed "non-verified." The contractor had provided verbal 
            confirmation that the system worked, but no written certification had been issued.
          </p>
        </div>

        {/* Consequences */}
        <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-red-500">
          <div className="flex items-start gap-3 mb-2">
            <FileX className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <h4 className="font-semibold text-red-400 text-sm sm:text-base lg:text-lg">Consequences</h4>
          </div>
          <p className="text-foreground text-sm sm:text-base lg:text-lg ml-0 sm:ml-8">
            Without certification, the emergency lighting system was considered non-compliant under the Regulatory 
            Reform (Fire Safety) Order 2005, even though it was physically operational. The school was prohibited 
            from opening until proper documentation was provided.
          </p>
        </div>

        {/* Impact */}
        <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-orange-500">
          <div className="flex items-start gap-3 mb-2">
            <Clock className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <h4 className="font-semibold text-orange-400 text-sm sm:text-base lg:text-lg">Impact</h4>
          </div>
          <div className="ml-0 sm:ml-8 space-y-2">
            <p className="text-foreground text-sm sm:text-base lg:text-lg">
              The contractor had to revisit the site to:
            </p>
            <ul className="space-y-2 text-foreground text-sm sm:text-base lg:text-lg">
              <li className="flex items-start gap-2">
                <span className="text-orange-400 flex-shrink-0">•</span>
                <span>Repeat full duration testing for all luminaires</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 flex-shrink-0">•</span>
                <span>Complete commissioning checklists and formal certificates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 flex-shrink-0">•</span>
                <span>Obtain signatures from the designer, installer, and verifier</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 flex-shrink-0">•</span>
                <span>Delay the building's reopening by three weeks</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Root Cause */}
        <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-purple-500">
          <div className="flex items-start gap-3 mb-2">
            <XCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <h4 className="font-semibold text-purple-400 text-sm sm:text-base lg:text-lg">Root Cause</h4>
          </div>
          <p className="text-foreground text-sm sm:text-base lg:text-lg ml-0 sm:ml-8">
            The contractor assumed that because the system was working perfectly, formal certification was "just 
            paperwork" and could be completed later. They didn't realise that without written certification, the 
            system was legally considered non-existent from a compliance perspective.
          </p>
        </div>

        {/* Resolution */}
        <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-green-500">
          <div className="flex items-start gap-3 mb-2">
            <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <h4 className="font-semibold text-green-400 text-sm sm:text-base lg:text-lg">Resolution</h4>
          </div>
          <p className="text-foreground text-sm sm:text-base lg:text-lg ml-0 sm:ml-8">
            After re-testing and issuing all required certificates (Emergency Lighting Completion Certificate, 
            Electrical Installation Certificate, and Commissioning Certificate), the fire authority approved the 
            installation. The school opened three weeks behind schedule, resulting in financial penalties and 
            reputational damage for the contractor.
          </p>
        </div>

        {/* Lessons Learned */}
        <div className="bg-elec-yellow/10 border-l-4 border-elec-yellow rounded-lg p-4">
          <div className="flex items-start gap-3 mb-3">
            <GraduationCap className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <h4 className="font-semibold text-elec-yellow text-sm sm:text-base lg:text-lg">Lessons Learned</h4>
          </div>
          <div className="ml-0 sm:ml-8 space-y-3">
            <p className="text-foreground text-sm sm:text-base lg:text-lg font-semibold">
              This case illustrates that:
            </p>
            <ul className="space-y-2 text-foreground text-sm sm:text-base lg:text-lg">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow flex-shrink-0">•</span>
                <span>A system without certification is considered non-compliant, even if it physically works</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow flex-shrink-0">•</span>
                <span>Certification is not "just paperwork" — it's a legal requirement under fire safety legislation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow flex-shrink-0">•</span>
                <span>Always complete and issue certificates before project handover, not after</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow flex-shrink-0">•</span>
                <span>The cost of proper certification is negligible compared to project delays and penalties</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow flex-shrink-0">•</span>
                <span>Professional credibility depends on delivering both functional systems and compliant documentation</span>
              </li>
            </ul>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
