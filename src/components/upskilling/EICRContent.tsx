import { Book, Search, AlertTriangle, Info, Target, Clipboard, CheckCircle, Shield, Timer, Database, FileText, Zap, Users, Calculator, Settings, Cable } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EICRContent = () => {
  const introductionContent = {
    overview: "The Electrical Installation Condition Report (EICR) is a comprehensive assessment document that evaluates the safety and condition of existing electrical installations. Unlike certificates for new work, the EICR focuses on identifying deterioration, damage, defects, and non-compliance that may have developed over time, providing essential information for maintaining electrical safety.",
    importance: "EICRs are crucial for ongoing electrical safety, legal compliance, and risk management. They provide evidence of due diligence for property owners, identify potential hazards before they cause harm, and ensure installations continue to meet current safety standards throughout their operational life.",
    scope: "This section covers the complete EICR process from initial planning through to report completion, including inspection techniques, testing procedures, defect classification, recommendation coding, and the legal obligations associated with condition reporting."
  };

  const learningObjectives = [
    "Understand when EICR is required and legal obligations",
    "Plan and prepare for comprehensive electrical inspections", 
    "Perform systematic visual inspection techniques",
    "Execute complete testing schedules according to BS 7671",
    "Classify defects using correct observation codes",
    "Apply appropriate recommendation codes for different scenarios",
    "Complete EICR documentation accurately and comprehensively",
    "Understand limitation declarations and their implications",
    "Assess installation condition against current standards",
    "Provide clear recommendations for remedial actions"
  ];

  const eicrRequirements = [
    { situation: "Rental property changes of tenancy", frequency: "Every 5 years or change of tenancy", reason: "Legal requirement under Electrical Safety Standards in Private Rented Sector Regulations" },
    { situation: "Commercial premises insurance requirements", frequency: "Annually or as specified by insurer", reason: "Risk assessment and insurance compliance, often annual for high-risk premises" },
    { situation: "Healthcare and care facilities", frequency: "Annually", reason: "Enhanced safety requirements due to vulnerable occupants and critical equipment" },
    { situation: "Educational establishments", frequency: "Every 5 years", reason: "Large numbers of young people and duty of care obligations" },
    { situation: "Industrial installations", frequency: "Every 3 years", reason: "Harsh operating conditions and higher risk environment" },
    { situation: "Places of worship and community centres", frequency: "Every 5 years", reason: "Public access and varied usage patterns require regular assessment" },
    { situation: "Swimming pools and special locations", frequency: "Annually", reason: "Enhanced safety requirements due to increased shock risk" },
    { situation: "Caravan parks and marinas", frequency: "Annually", reason: "Outdoor installations and harsh environmental conditions" }
  ];

  const observationCodes = [
    { code: "C1", description: "Danger present - immediate action required", action: "Installation or part must be made safe immediately", examples: "Live parts accessible, no earthing, severe damage" },
    { code: "C2", description: "Potentially dangerous - urgent remedial action required", action: "Action required as matter of urgency", examples: "Inadequate earthing, non-compliant protection, deteriorated insulation" },
    { code: "C3", description: "Improvement recommended", action: "Action recommended to improve safety", examples: "Lack of RCD protection, old wiring systems, missing labels" },
    { code: "FI", description: "Further investigation required", action: "Investigation needed to determine safety", examples: "Concealed wiring condition, inaccessible equipment, specialist systems" }
  ];

  const inspectionAreas = [
    { area: "Consumer Units and Distribution Boards", checks: ["Enclosure condition and IP rating", "Labelling and circuit identification", "Protective device types and ratings", "Busbar and connection condition", "Earthing and bonding arrangements", "Available spare ways and capacity"] },
    { area: "Protective Devices", checks: ["MCB/RCBO condition and operation", "Fuse types and ratings", "RCD testing and operation", "Isolation and switching provision", "Discrimination and selectivity", "Protective conductor continuity"] },
    { area: "Wiring Systems", checks: ["Cable types and condition", "Installation methods and support", "Segregation of systems", "Fire barriers and sealing", "Mechanical protection", "Environmental suitability"] },
    { area: "Accessories and Equipment", checks: ["Socket outlet condition and testing", "Switch and control gear operation", "Fixed equipment connections", "Flexible cables and leads", "Portable appliance provision", "Special installations assessment"] }
  ];

  const testingSequence = [
    { order: 1, test: "Continuity of Protective Conductors", purpose: "Verify protective conductor integrity", method: "Low resistance ohmmeter between points", standard: "Continuity must be confirmed, resistance values recorded" },
    { order: 2, test: "Continuity of Ring Final Circuits", purpose: "Confirm ring circuit integrity", method: "End-to-end resistance measurements", standard: "R1, R2, and r1+r2 values within expected ranges" },
    { order: 3, test: "Insulation Resistance", purpose: "Assess cable and equipment insulation", method: "500V DC test between conductors", standard: "≥1MΩ for circuits ≤500V, ≥0.5MΩ where electronic equipment present" },
    { order: 4, test: "Polarity", purpose: "Verify correct conductor connections", method: "Continuity testing and visual inspection", standard: "Single pole devices in line conductors only" },
    { order: 5, test: "Earth Electrode Resistance", purpose: "Assess earthing system effectiveness", method: "Earth electrode resistance tester", standard: "≤200Ω for TT systems, ≤21Ω for other systems typically" },
    { order: 6, test: "Earth Fault Loop Impedance", purpose: "Verify automatic disconnection", method: "Loop impedance tester at distribution boards and circuits", standard: "≤ maximum Zs values for protective devices" },
    { order: 7, test: "RCD Operation", purpose: "Confirm RCD effectiveness", method: "RCD tester at rated and test currents", standard: "≤300ms at IΔn, ≤40ms at 5×IΔn for socket circuits" },
    { order: 8, test: "Phase Sequence", purpose: "Verify three-phase rotation", method: "Phase sequence indicator", standard: "Correct phase rotation L1-L2-L3" },
    { order: 9, test: "Functional Testing", purpose: "Verify operational effectiveness", method: "Manual operation of controls and safety devices", standard: "All devices operate as intended" }
  ];

  const limitationTypes = [
    { limitation: "Extent of installation inspected", impact: "May not identify defects in uninspected areas", declaration: "Percentage or areas inspected must be stated clearly" },
    { limitation: "Operational requirements", impact: "Safety assessment may be incomplete", declaration: "Areas not inspected due to operational constraints" },
    { limitation: "Agreed sampling basis", impact: "Statistical confidence in results", declaration: "Sampling methodology and coverage documented" },
    { limitation: "Inaccessible parts", impact: "Hidden defects remain undetected", declaration: "Areas not accessible must be identified" },
    { limitation: "Destructive testing not performed", impact: "Internal cable condition unknown", declaration: "Non-destructive testing limitations stated" },
    { limitation: "Equipment not de-energised", impact: "Some tests not possible", declaration: "Tests not performed due to operational requirements" }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardContent className="space-y-8 pt-6">
        
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Info className="h-6 w-6 text-elec-yellow" />
            Introduction
          </h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-foreground mb-2">Overview</h4>
                <p className="text-foreground leading-relaxed">{introductionContent.overview}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-foreground mb-2">Importance</h4>
                <p className="text-foreground leading-relaxed">{introductionContent.importance}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-foreground mb-2">Scope of Learning</h4>
                <p className="text-foreground leading-relaxed">{introductionContent.scope}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">When EICR is Required</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed">
              EICRs are required in various situations, driven by legal obligations, insurance requirements, 
              and safety management needs. Understanding these requirements ensures appropriate inspection scheduling.
            </p>
            <div className="bg-purple-600/10 border border-purple-600/20 rounded p-4">
              <Shield className="h-6 w-6 text-purple-400 mb-3" />
              <p className="text-foreground text-sm">
                <strong className="text-purple-200">Legal Requirement:</strong> Since July 2020, private landlords in England 
                must ensure electrical installations are inspected every 5 years by a qualified electrician.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Learning Objectives</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Master the comprehensive skills required for professional EICR completion, from planning 
              through execution to report generation. Each objective develops critical competencies for electrical condition assessment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningObjectives.map((objective, index) => (
                <div key={index} className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-foreground text-sm">{objective}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">EICR Requirements by Situation</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Different premises types have varying EICR requirements based on risk levels, occupancy types, 
              and regulatory frameworks. Understanding these helps determine appropriate inspection intervals.
            </p>
            <div className="space-y-3">
              {eicrRequirements.map((item, index) => (
                <div key={index} className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h4 className="text-green-200 font-medium mb-2">{item.situation}</h4>
                  <p className="text-foreground text-sm mb-1"><strong>Frequency:</strong> {item.frequency}</p>
                  <p className="text-foreground text-sm">{item.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Observation Codes and Classifications</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Correct classification of observations is critical for EICR validity and safety management. 
              Each code has specific implications for required actions and urgency levels.
            </p>
            <div className="space-y-3">
              {observationCodes.map((code, index) => (
                <div key={index} className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <span className="w-12 h-12 bg-red-500 text-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {code.code}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-red-200 font-medium mb-1">{code.description}</h4>
                      <p className="text-foreground text-sm mb-2"><strong>Action:</strong> {code.action}</p>
                      <p className="text-foreground text-sm"><strong>Examples:</strong> {code.examples}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Systematic Inspection Areas</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Professional EICR inspection requires systematic coverage of all installation elements. 
              This structured approach ensures comprehensive assessment and consistent reporting.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inspectionAreas.map((area, index) => (
                <div key={index} className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                  <Search className="h-6 w-6 text-orange-400 mb-3" />
                  <h4 className="text-orange-200 font-medium mb-3">{area.area}</h4>
                  <ul className="text-foreground text-sm space-y-1">
                    {area.checks.map((check, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-orange-400 mt-1 flex-shrink-0" />
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">EICR Testing Sequence</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              EICR testing follows the same sequence as initial verification but focuses on condition assessment. 
              The sequence prevents equipment damage and ensures comprehensive evaluation of safety parameters.
            </p>
            <div className="space-y-3">
              {testingSequence.map((test, index) => (
                <div key={index} className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {test.order}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-yellow-200 font-medium mb-1">{test.test}</h4>
                      <p className="text-foreground text-sm mb-2">{test.purpose}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <p className="text-yellow-300"><strong>Method:</strong> {test.method}</p>
                        <p className="text-yellow-300"><strong>Standard:</strong> {test.standard}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Limitations and Extent of Inspection</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <div className="bg-cyan-600/10 border border-cyan-600/20 rounded p-4">
              <AlertTriangle className="h-6 w-6 text-cyan-400 mb-3" />
              <h4 className="text-cyan-200 font-medium mb-3">Inspection Limitations</h4>
              <p className="text-foreground text-sm mb-4">
                All EICR limitations must be clearly documented to ensure report users understand the scope 
                and any areas not assessed. Limitations affect the confidence level of the safety assessment.
              </p>
              <div className="space-y-3">
                {limitationTypes.map((limit, index) => (
                  <div key={index} className="bg-[#2a2a2a] border border-gray-600 rounded p-3">
                    <h5 className="text-cyan-300 font-medium mb-1">{limit.limitation}</h5>
                    <p className="text-foreground text-xs mb-1"><strong>Impact:</strong> {limit.impact}</p>
                    <p className="text-foreground text-xs"><strong>Declaration:</strong> {limit.declaration}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Professional Competency Requirements</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              EICR inspection and testing requires high levels of competency due to the assessment nature 
              and responsibility for identifying safety issues in existing installations.
            </p>
            <div className="space-y-4">
              <div className="bg-purple-600/10 border border-purple-600/20 rounded p-4">
                <Users className="h-6 w-6 text-purple-400 mb-3" />
                <h4 className="text-purple-200 font-medium mb-3">Required Competencies</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-purple-300 font-medium mb-2">Technical Knowledge</h5>
                    <ul className="text-foreground text-sm space-y-1">
                      <li>• Comprehensive BS 7671 knowledge</li>
                      <li>• Historical wiring systems understanding</li>
                      <li>• Testing equipment proficiency</li>
                      <li>• Defect recognition skills</li>
                      <li>• Risk assessment capabilities</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-purple-300 font-medium mb-2">Professional Skills</h5>
                    <ul className="text-foreground text-sm space-y-1">
                      <li>• Systematic inspection methodology</li>
                      <li>• Report writing and communication</li>
                      <li>• Client liaison and explanation</li>
                      <li>• Professional judgment application</li>
                      <li>• Ongoing competency maintenance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Legal and Contractual Obligations</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              EICR completion carries significant legal and professional obligations that extend beyond 
              the inspection period. Understanding these ensures appropriate risk management and professional protection.
            </p>
            <div className="space-y-4">
              <div className="bg-red-600/10 border border-red-600/20 rounded p-4">
                <Shield className="h-6 w-6 text-red-400 mb-3" />
                <h4 className="text-red-200 font-medium mb-3">Legal Responsibilities</h4>
                <ul className="text-foreground text-sm space-y-2">
                  <li>• Electrical Safety Standards in the Private Rented Sector Regulations</li>
                  <li>• Health and Safety at Work Act obligations</li>
                  <li>• Consumer Protection Act implications</li>
                  <li>• Professional negligence liability</li>
                  <li>• Data Protection Act compliance for records</li>
                  <li>• Building Regulations compliance assessment</li>
                </ul>
              </div>
              <div className="bg-indigo-600/10 border border-indigo-600/20 rounded p-4">
                <Timer className="h-6 w-6 text-indigo-400 mb-3" />
                <h4 className="text-indigo-200 font-medium mb-3">Report Validity and Recommendations</h4>
                <p className="text-foreground text-sm mb-3">
                  EICR recommendations must be clear, actionable, and prioritised appropriately for client understanding and action planning.
                </p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Report valid for maximum 5 years from inspection date</li>
                  <li>• C1 and C2 codes require immediate or urgent action</li>
                  <li>• Recommendations must be specific and achievable</li>
                  <li>• Follow-up inspection intervals should be advised</li>
                  <li>• Client notification requirements for serious defects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Clipboard className="h-6 w-6 text-elec-yellow" />
            Summary
          </h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed">
              The EICR represents a critical element of electrical safety management, providing systematic 
              assessment of installation condition and clear guidance for maintaining safety standards. 
              Professional competency and thorough methodology are essential for effective condition reporting.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-lg font-medium text-foreground mb-3">Key Principles</h4>
                <ul className="text-foreground text-sm space-y-2">
                  <li>• Systematic inspection methodology ensures comprehensive coverage</li>
                  <li>• Correct observation coding provides clear action priorities</li>
                  <li>• Professional competency is essential for valid assessment</li>
                  <li>• Clear documentation supports decision-making and compliance</li>
                  <li>• Regular inspection intervals maintain ongoing safety assurance</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-foreground mb-3">Professional Standards</h4>
                <ul className="text-foreground text-sm space-y-2">
                  <li>• Thorough preparation and planning optimise inspection effectiveness</li>
                  <li>• Comprehensive testing confirms visual inspection findings</li>
                  <li>• Clear communication helps clients understand requirements</li>
                  <li>• Ongoing competency development maintains inspection quality</li>
                  <li>• Professional accountability ensures public safety protection</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#2a2a2a] border border-gray-600 rounded p-4 mt-6">
              <p className="text-foreground text-sm">
                <strong className="text-foreground">Next Steps:</strong> Apply EICR principles through practical scenarios, 
                practice observation coding and report completion, and test knowledge with the comprehensive quiz. 
                Remember that EICR competency requires ongoing development and practical experience.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default EICRContent;