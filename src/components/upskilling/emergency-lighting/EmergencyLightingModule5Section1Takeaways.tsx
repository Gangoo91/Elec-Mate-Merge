import { Shield, CheckCircle, Eye, FileCheck, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingModule5Section1Takeaways = () => {
  const takeaways = [
    {
      icon: Eye,
      title: "Initial Inspection is Mandatory",
      description: "Pre-service verification confirms design compliance and system integrity",
      details: "BS 5266 and BS 7671 require comprehensive initial inspection before commissioning. This includes visual checks, physical verification, and electrical testing to ensure the installation matches approved drawings and complies with all safety requirements."
    },
    {
      icon: Shield,
      title: "Visual Checks Before Energising",
      description: "Cable type, fixings, segregation, and labelling must be verified",
      details: "Fire-resistant cables must use non-combustible supports. Emergency circuits must be segregated from normal lighting. All systems must be clearly labelled. These checks prevent dangerous faults and ensure regulatory compliance."
    },
    {
      icon: CheckCircle,
      title: "Electrical Verification Testing",
      description: "Continuity, insulation, polarity, and EFLI must be measured and recorded",
      details: "Use calibrated test equipment to verify all electrical parameters. Document all readings clearly. Any failures must be rectified and re-tested before proceeding. Never energise a circuit that has failed electrical testing."
    },
    {
      icon: FileCheck,
      title: "Luminaire Compliance Verification",
      description: "Confirm correct types, battery connections, and ISO 7010 exit signage",
      details: "Each luminaire must be inspected individually. Verify maintained/non-maintained classification, check battery charging status, confirm exit signs use ISO 7010 pictograms and face correct direction. Central battery connections must be verified for polarity."
    }
  ];

  const criticalPoints = [
    "Initial inspection must be completed before functional testing or commissioning begins",
    "Design drawings are your primary checklist—verify every luminaire position and specification",
    "Document all defects immediately and track rectification through to completion",
    "Use calibrated test equipment with valid certification for all electrical measurements",
    "Plastic fixings and cable ties are NOT acceptable for fire-resistant cable installations",
    "Emergency and normal lighting circuits must be kept separate and clearly labelled",
    "Exit signs must use ISO 7010 compliant green running man pictograms",
    "Photograph key installations—containment, risers, and critical connections—for records",
    "Never energise a system that has failed inspection or testing—rectify faults first",
    "Work with the client's fire safety team to confirm escape route coverage is adequate"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <CheckCircle className="h-5 w-5 text-elec-yellow" />
          Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Main Takeaways */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {takeaways.map((takeaway, index) => (
            <div key={index} className="bg-[#323232] rounded-lg p-4 sm:p-6 border-l-4 border-elec-yellow/50">
              <div className="flex items-start gap-3 mb-3">
                <takeaway.icon className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-foreground font-semibold text-sm sm:text-base mb-1">
                    {takeaway.title}
                  </h3>
                  <p className="text-foreground text-xs sm:text-sm">
                    {takeaway.description}
                  </p>
                </div>
              </div>
              <p className="text-foreground text-xs sm:text-sm leading-relaxed">
                {takeaway.details}
              </p>
            </div>
          ))}
        </div>

        {/* Critical Points to Remember */}
        <div className="bg-[#323232] rounded-lg p-4 sm:p-6">
          <h3 className="text-elec-yellow font-semibold text-base sm:text-lg mb-4">
            Critical Points to Remember
          </h3>
          <ol className="space-y-3 sm:space-y-4">
            {criticalPoints.map((point, index) => (
              <li key={index} className="flex gap-3 text-foreground text-xs sm:text-sm leading-relaxed">
                <span className="text-elec-yellow font-bold flex-shrink-0 min-w-[1.5rem]">
                  {index + 1}.
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Final Emphasis */}
        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-red-200 font-semibold text-base sm:text-lg mb-2">
                Life Safety System
              </h3>
              <p className="text-foreground text-sm sm:text-base leading-relaxed">
                Emergency lighting is a life safety critical system. Initial inspection and verification ensures 
                that when an emergency occurs, the system will function correctly to enable safe evacuation. 
                Thorough inspection at this stage prevents system failures that could endanger building occupants 
                during the most critical moments. Never compromise on inspection quality or completeness.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};