import { Wrench, AlertTriangle, CheckCircle, Info, Clock, Shield, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EICRPractical = () => {
  const inspectionSteps = [
    {
      step: "1. Initial Assessment",
      action: "Review installation history and determine inspection scope",
      details: "Examine existing certificates, assess installation age and type, identify any obvious defects or modifications"
    },
    {
      step: "2. Visual Inspection",
      action: "Conduct thorough visual examination of accessible parts",
      details: "Check cable conditions, identify non-compliance with current standards, examine consumer units and distribution boards"
    },
    {
      step: "3. Dead Testing",
      action: "Perform tests with installation isolated",
      details: "Test continuity of protective conductors, insulation resistance, and polarity verification"
    },
    {
      step: "4. Live Testing",
      action: "Carry out tests with installation energised",
      details: "Measure earth fault loop impedance, test RCD operation, verify phase sequence where applicable"
    },
    {
      step: "5. Functional Testing",
      action: "Test operation of protective devices and controls",
      details: "Check circuit breaker operation, test emergency lighting, verify isolator effectiveness"
    },
    {
      step: "6. Documentation Review",
      action: "Complete EICR with accurate observations and recommendations",
      details: "Record all defects with appropriate classification, provide clear recommendations for remedial work"
    }
  ];

  const defectClassifications = [
    {
      code: "C1 - Danger Present",
      description: "Immediate danger to persons or property",
      action: "Installation must be made safe immediately",
      examples: "Live parts accessible, missing earth connections, damaged cables with live conductors exposed"
    },
    {
      code: "C2 - Potentially Dangerous",
      description: "Defects requiring urgent attention",
      action: "Recommend remedial work without delay",
      examples: "Inadequate earthing arrangements, missing RCD protection, overloaded circuits"
    },
    {
      code: "C3 - Improvement Recommended", 
      description: "Non-compliance with current standards",
      action: "Improvement recommended for enhanced safety",
      examples: "Old cable types, lack of supplementary bonding, outdated protective devices"
    },
    {
      code: "FI - Further Investigation",
      description: "Limitation prevents full inspection",
      action: "Further investigation required without delay",
      examples: "Concealed cables requiring investigation, inaccessible connections, incomplete testing"
    }
  ];

  const commonDefects = [
    {
      defect: "Missing RCD Protection",
      location: "Socket circuits and bathroom installations",
      classification: "C1 or C2 depending on location",
      remediation: "Install appropriate RCD protection, verify discrimination, test operation"
    },
    {
      defect: "Inadequate Earthing",
      location: "Main earthing terminal and bonding",
      classification: "C1",
      remediation: "Upgrade earthing conductor, verify earth electrode resistance, check bonding continuity"
    },
    {
      defect: "Damaged Cable Insulation",
      location: "Mechanical damage or age-related deterioration",
      classification: "C1 if conductors exposed, C2 if containment damaged",
      remediation: "Replace damaged sections, improve cable protection, check for further damage"
    },
    {
      defect: "Non-Compliant Consumer Unit",
      location: "Plastic consumer units in escape routes",
      classification: "C2",
      remediation: "Replace with metal-clad unit or relocate away from escape routes"
    },
    {
      defect: "Missing Circuit Protection",
      location: "Circuits without appropriate overcurrent protection",
      classification: "C1",
      remediation: "Install correct protective devices, verify discrimination and selectivity"
    },
    {
      defect: "Poor Installation Practices",
      location: "Various including cable management and terminations",
      classification: "C2 or C3 depending on severity",
      remediation: "Rectify installation methods, ensure compliance with current standards"
    }
  ];

  const testingGuidelines = [
    {
      test: "Continuity of Protective Conductors",
      method: "Low resistance ohmmeter (typically 200mA-600mA DC)",
      acceptable: "R1 + R2 values within design parameters",
      notes: "Test all protective conductors including main and supplementary bonding"
    },
    {
      test: "Insulation Resistance",
      method: "500V DC for SELV/PELV, 1000V DC for other circuits",
      acceptable: "≥1MΩ for circuits ≤500V, ≥0.5MΩ for functional circuits",
      notes: "Test between live conductors and earth, and between live conductors"
    },
    {
      test: "Earth Fault Loop Impedance",
      method: "Loop impedance tester with appropriate test current",
      acceptable: "Zs values not exceeding maximum permitted for protective device",
      notes: "Consider cable length, temperature correction factors, and protective device characteristics"
    },
    {
      test: "RCD Operation",
      method: "Dedicated RCD tester at rated current and 5× rated current",
      acceptable: "Trip time ≤300ms at 1× In, ≤40ms at 5× In",
      notes: "Test all RCDs including additional protection devices and time-delayed types"
    }
  ];

  const safetyConsiderations = [
    "Always follow Permit to Work procedures in commercial/industrial environments",
    "Verify isolation using appropriate test equipment and proven test procedures",
    "Consider arc flash risks when testing energised installations",
    "Use appropriate PPE including insulated tools and arc-rated clothing",
    "Establish safe working distances from live conductors during testing",
    "Ensure adequate emergency procedures and first aid provisions are in place",
    "Consider environmental hazards including confined spaces and hazardous atmospheres",
    "Maintain clear communication with installation operators and users"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          EICR Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Inspection Process */}
        <div className="bg-[#323232] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5 text-elec-yellow" />
            Systematic Inspection Process
          </h3>
          <div className="grid gap-4">
            {inspectionSteps.map((step, index) => (
              <div key={index} className="border border-gray-600 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-elec-yellow text-elec-dark rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{step.step}</h4>
                    <p className="text-elec-yellow text-sm mb-2">{step.action}</p>
                    <p className="text-foreground text-sm leading-relaxed">{step.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Defect Classifications */}
        <div className="bg-[#323232] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Defect Classification System
          </h3>
          <div className="space-y-4">
            {defectClassifications.map((defect, index) => (
              <div key={index} className="border border-gray-600 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="text-elec-yellow font-bold text-lg flex-shrink-0">{defect.code.split(' - ')[0]}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{defect.code}</h4>
                    <p className="text-foreground text-sm mb-2">{defect.description}</p>
                    <p className="text-elec-yellow text-sm mb-2 font-medium">{defect.action}</p>
                    <p className="text-foreground text-sm leading-relaxed">{defect.examples}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Defects */}
        <div className="bg-[#323232] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Common Installation Defects
          </h3>
          <div className="grid gap-4">
            {commonDefects.map((item, index) => (
              <div key={index} className="border border-gray-600 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">{item.defect}</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground"><span className="text-elec-yellow font-medium">Location:</span> {item.location}</p>
                  <p className="text-foreground"><span className="text-elec-yellow font-medium">Classification:</span> {item.classification}</p>
                  <p className="text-foreground"><span className="text-elec-yellow font-medium">Remediation:</span> {item.remediation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testing Guidelines */}
        <div className="bg-[#323232] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-elec-yellow" />
            Testing Requirements & Methods
          </h3>
          <div className="space-y-4">
            {testingGuidelines.map((test, index) => (
              <div key={index} className="border border-gray-600 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">{test.test}</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground"><span className="text-elec-yellow font-medium">Method:</span> {test.method}</p>
                  <p className="text-foreground"><span className="text-elec-yellow font-medium">Acceptable Values:</span> {test.acceptable}</p>
                  <p className="text-foreground"><span className="text-elec-yellow font-medium">Notes:</span> {test.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Considerations */}
        <div className="bg-[#323232] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Critical Safety Considerations
          </h3>
          <div className="grid gap-3">
            {safetyConsiderations.map((consideration, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-foreground text-sm leading-relaxed">{consideration}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-foreground mb-2">Professional Responsibility</h4>
              <p className="text-foreground text-sm leading-relaxed">
                EICR inspection and testing must only be carried out by competent persons with appropriate 
                qualifications, experience, and insurance coverage. The inspector takes full responsibility 
                for the accuracy of observations, test results, and recommendations for remedial action.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default EICRPractical;