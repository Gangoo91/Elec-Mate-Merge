import { ArrowLeft, BookOpen, Target, AlertTriangle, CheckCircle, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Module2Section6Quiz from '@/components/upskilling/Module2Section6Quiz';

const Module2Section6 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../module-2">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-3">
          <Badge variant="secondary" className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold text-sm px-3 py-1 border-0">
            Section 6
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Environmental & Site-Specific Hazards
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Identifying and managing environmental hazards and site-specific risks during electrical work
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Quick Introduction */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <BookOpen className="h-6 w-6 text-elec-yellow" />
                Quick Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Electrical testing doesn't happen in a vacuum. Real-world site conditions can significantly impact the safety and effectiveness of electrical testing procedures. This section focuses on recognising and managing environmental hazards and location-based risks that could turn routine tasks into serious safety concerns.
              </p>
              <p>
                Understanding how to assess and control these variable conditions is essential for maintaining safety standards whilst ensuring accurate test results in diverse working environments.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Target className="h-6 w-6 text-elec-yellow" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4">By the end of this section, you'll be able to:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Identify common environmental and location-based hazards in various electrical testing environments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Understand how site conditions directly impact testing safety and result accuracy</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Apply appropriate control measures to reduce on-site risks and maintain safe working conditions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Conduct effective site-specific risk assessments before commencing testing activities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Recognise when environmental conditions make testing unsafe and require postponement</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <BookOpen className="h-6 w-6 text-elec-yellow" />
                Main Content
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-8">
              
              {/* Why Site Conditions Matter */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Why Site Conditions Matter</h3>
                <p>
                  Even when proper isolation procedures are followed and appropriate test equipment is selected, external environmental factors can significantly interfere with safe working practices. Conditions such as wet floors, inadequate lighting, cramped working spaces, or interference from other trades can introduce unexpected hazards that compromise both personal safety and test accuracy.
                </p>
                <p>
                  The dynamic nature of construction and maintenance sites means that conditions can change rapidly throughout the working day. What may be a safe working environment in the morning could become hazardous by afternoon due to weather changes, ongoing work by other trades, or equipment failures.
                </p>
                <p>
                  Understanding and continuously assessing these variable factors is crucial for maintaining consistent safety standards and ensuring reliable test results across diverse working environments.
                </p>
              </div>

              {/* Common Environmental Hazards */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Common Environmental Hazards</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Moisture and Wet Surfaces</h4>
                    <p>
                      Water and electrical testing create an extremely dangerous combination. Moisture significantly increases the risk of electric shock and can cause serious damage to sensitive test equipment. Wet conditions can occur from roof leaks, condensation in plant rooms, cleaning activities, or external weather penetration. Even small amounts of moisture can create conductive paths that bypass normal safety measures.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Dusty Environments</h4>
                    <p>
                      Excessive dust can significantly impact both equipment function and personal safety. Dust can settle on test equipment displays making readings difficult to interpret, contaminate connection points leading to false readings, and reduce visibility in working areas. In extreme cases, conductive dust can create unexpected electrical paths or cause equipment malfunctions.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Temperature Extremes</h4>
                    <p>
                      Both hot and cold conditions can impair concentration, affect equipment accuracy, and impact personal protective equipment effectiveness. Extreme heat can cause heat stress, reduce cognitive function, and make PPE uncomfortable to wear properly. Cold conditions can reduce manual dexterity, affect battery performance in test equipment, and make materials brittle or difficult to handle.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Excessive Noise</h4>
                    <p>
                      High noise levels can significantly reduce concentration, make communication between team members difficult, and mask important audible warnings from test equipment. Construction noise, machinery operation, or HVAC systems can create environments where critical safety communications cannot be heard effectively.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Poor Ventilation</h4>
                    <p>
                      Inadequate ventilation is particularly problematic in confined spaces such as riser cupboards, roof spaces, basements, or electrical plant rooms. Poor air circulation can lead to the accumulation of hazardous gases, reduce oxygen levels, increase temperature and humidity, and create uncomfortable working conditions that impair concentration and decision-making.
                    </p>
                  </div>
                </div>
              </div>

              {/* Access and Work Area Hazards */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Access and Work Area Hazards</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Obstructed Distribution Boards and Panels</h4>
                    <p>
                      Electrical panels that are blocked by stored materials, furniture, or equipment create multiple hazards. Limited access prevents proper visual inspection, forces uncomfortable working positions that increase error risk, restricts emergency evacuation routes, and may require additional time to clear access, extending exposure to electrical hazards.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Unstable Access Equipment</h4>
                    <p>
                      Working at height introduces additional risks that must be carefully managed. Loose, damaged, or inappropriate ladders and platforms can lead to falls, which are among the most serious workplace accidents. All access equipment must be inspected before use, positioned correctly, and suitable for the specific task and environment.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Confined Space Working</h4>
                    <p>
                      Testing in confined spaces such as service ducts, plant rooms, or underground chambers requires special consideration. These environments may have limited escape routes, poor ventilation, potential for gas accumulation, and restricted movement that can complicate emergency procedures.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Trip and Slip Hazards</h4>
                    <p>
                      Test leads, tools, and equipment can create significant trip hazards, particularly in busy work areas. Poor housekeeping, inadequate lighting, and slippery surfaces compound these risks. Trips and falls while carrying test equipment or during testing procedures can result in both personal injury and equipment damage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Other Site-Specific Risks */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Other Site-Specific Risks</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Interference from Other Trades</h4>
                    <p>
                      One of the most serious risks occurs when other tradespeople energise circuits unexpectedly during testing procedures. This can happen when communication breaks down, isolation procedures are not properly coordinated, or when multiple contractors are working on the same installation without proper coordination protocols.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Shared Distribution Systems</h4>
                    <p>
                      When testing installations that share distribution boards with other users or systems, there's increased risk of inadvertent interference, difficulty in achieving complete isolation, confusion over circuit ownership, and potential impact on other users' operations during testing procedures.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Poor Circuit Identification</h4>
                    <p>
                      Unknown, incorrectly labelled, or unlabelled circuits create serious safety risks. Testing the wrong circuit can result in unexpected energisation, incomplete isolation procedures, damage to equipment or installations, and potential harm to personnel who believe circuits are safely isolated.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Limited Emergency Access</h4>
                    <p>
                      Restricted escape routes or emergency access can be particularly dangerous if an electrical fault or arc event occurs during testing. Emergency procedures must account for site-specific access limitations, and alternative escape routes should be identified before commencing work.
                    </p>
                  </div>
                </div>
              </div>

              {/* Risk Control Measures */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Risk Control Measures</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Site-Specific Risk Assessment</h4>
                    <p>
                      Always conduct a thorough site-specific risk assessment before beginning any testing work. This should identify environmental conditions, access limitations, potential interference from other activities, emergency procedures and escape routes, and specific control measures required for the location and conditions.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Work Zone Control</h4>
                    <p>
                      Use appropriate barriers, signage, and warning systems to control the immediate work area. This includes establishing clear boundaries around work areas, using warning signs to alert others to electrical testing in progress, implementing permit-to-work systems where required, and coordinating with other trades and site management.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Equipment and Lead Management</h4>
                    <p>
                      Keep all test leads, equipment, and tools properly organised and positioned to minimise trip hazards and maintain easy access to emergency controls. Use cable protectors where leads cross walkways, secure equipment in stable positions, and maintain clear access to isolation points and emergency equipment.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Site Familiarisation</h4>
                    <p>
                      Always request a comprehensive site walkthrough or formal induction before starting work. This should include identification of all relevant hazards, location of emergency equipment and procedures, communication protocols and key contacts, and any site-specific rules or restrictions that apply.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-elec-yellow mb-2">Continuous Awareness</h4>
                    <p>
                      Maintain constant situational awareness throughout the testing process. Site conditions can change rapidly due to weather, other work activities, equipment failures, or changes in building occupancy. Regular reassessment of conditions and immediate response to changing hazards is essential for maintaining safe working conditions.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practical Exercises */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Brain className="h-6 w-6 text-elec-yellow" />
                Practical Exercises
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-6">
                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-3">Exercise 1: Site Hazard Assessment</h4>
                  <p className="text-sm mb-3">
                    Visit a typical workplace (office, workshop, or public building) and conduct a comprehensive 
                    environmental hazard assessment from an electrical testing perspective.
                  </p>
                  <div className="text-sm text-white">
                    <strong>Assessment Points:</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Environmental conditions (moisture, temperature, ventilation)</li>
                      <li>• Access routes and workspace adequacy</li>
                      <li>• Potential interference from other activities</li>
                      <li>• Emergency procedures and escape routes</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-3">Exercise 2: Communication Protocol Development</h4>
                  <p className="text-sm mb-3">
                    Design a communication protocol for coordinating electrical testing in a busy commercial 
                    building with multiple contractors and ongoing operations.
                  </p>
                  <div className="text-sm text-white">
                    <strong>Protocol Elements:</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Pre-work notifications and authorisations</li>
                      <li>• Warning signage and barrier requirements</li>
                      <li>• Emergency contact procedures</li>
                      <li>• Work completion and handover process</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-transparent/80 p-4 rounded-lg">
                  <h4 className="text-elec-yellow font-medium mb-3">Exercise 3: Risk Control Implementation</h4>
                  <p className="text-sm mb-3">
                    Plan and implement control measures for testing in a challenging environment 
                    (basement plant room with poor ventilation and restricted access).
                  </p>
                  <div className="text-sm text-white">
                    <strong>Control Measures:</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Ventilation improvement or monitoring</li>
                      <li>• Access route optimisation</li>
                      <li>• Emergency procedures for confined space</li>
                      <li>• Equipment positioning and lead management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <CheckCircle className="h-6 w-6 text-elec-yellow" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-6">
                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: How do I determine if moisture levels are acceptable for testing?</h4>
                  <p className="text-sm text-white">
                    A: Any visible moisture, condensation, or dampness makes electrical testing unsafe. Use moisture meters 
                    for borderline conditions, and always err on the side of caution. If in doubt, postpone testing until 
                    conditions are completely dry.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: What should I do if other contractors object to my safety requirements?</h4>
                  <p className="text-sm text-white">
                    A: Safety requirements are non-negotiable. Explain the legal and safety reasons, involve site management 
                    if necessary, and document any refusal to comply. You have the right to stop work if safety cannot be ensured.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: How can I assess ventilation adequacy in confined spaces?</h4>
                  <p className="text-sm text-white">
                    A: Use gas detectors for oxygen levels and potential hazardous gases. Look for air movement, check for 
                    natural or mechanical ventilation systems, and consider the space volume relative to occupancy time.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: What temperature ranges are acceptable for test equipment operation?</h4>
                  <p className="text-sm text-white">
                    A: Check your instrument specifications, but typically -10°C to +50°C for storage and 0°C to +40°C for 
                    operation. Extreme temperatures can affect accuracy and battery performance.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: How do I handle access equipment that appears unsafe?</h4>
                  <p className="text-sm text-white">
                    A: Never use unsafe access equipment. Refuse to work, request suitable alternatives, and document the 
                    refusal. Falls from height are among the most serious workplace accidents.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: What if circuit identification is poor but testing must proceed?</h4>
                  <p className="text-sm text-white">
                    A: Poor circuit identification is a serious safety issue. Identify circuits properly using safe methods, 
                    update labelling where possible, and document limitations in your testing report.
                  </p>
                </div>

                <div className="border-l-4 border-elec-yellow pl-4">
                  <h4 className="text-white font-medium mb-2">Q: How frequently should environmental conditions be reassessed?</h4>
                  <p className="text-sm text-white">
                    A: Continuously monitor conditions, particularly weather changes, other work activities, and any changes 
                    in building systems. Conditions can deteriorate rapidly and require immediate response.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* On-the-Job Scenario */}
          <Card className="bg-transparent border-l-4 border-l-elec-yellow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <AlertTriangle className="h-6 w-6 text-elec-yellow" />
                Real-World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-transparent p-4 rounded-md">
                <p className="font-medium text-white mb-2">Scenario:</p>
                <p className="text-sm">
                  You arrive at a commercial site to conduct periodic testing in a basement plant room. Upon arrival, you notice poor lighting with only one working fluorescent tube, a ceiling leak creating puddles on the floor near the distribution board, and the air feels humid and stagnant. As you begin to set up your equipment, you slip slightly on the wet floor while attempting to remove a distribution board cover.
                </p>
              </div>
              <div className="bg-red-900/20 p-4 rounded-md border border-red-700/30">
                <p className="font-medium text-white mb-2">Correct Response:</p>
                <p>
                  Stop work immediately and assess the environment thoroughly. The combination of poor lighting, water ingress, and slippery surfaces creates an unacceptable risk level for electrical testing. Contact the site manager to report the unsafe conditions and request remedial action - improved lighting, resolution of the water leak, and thorough drying of the work area. Do not proceed with testing until all environmental hazards have been adequately controlled. If the area cannot be made safe within a reasonable timeframe, delay the testing until conditions improve. Document the decision and inform all relevant parties of the delay and reasons.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <CheckCircle className="h-6 w-6 text-elec-yellow" />
                Key Takeaways
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Environmental conditions directly impact both testing safety and result accuracy - they must be assessed and controlled before work begins</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Always carry out a comprehensive site-specific assessment beyond generic Risk Assessments and Method Statements (RAMS)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Maintain continuous awareness of changing site conditions, especially in live environments where multiple activities occur simultaneously</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>If environmental conditions make the work area unsafe for testing, do not proceed - delay work until adequate control measures are implemented</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Effective communication and coordination with other site personnel is essential for maintaining safe working conditions</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Interactive Quiz */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-elec-yellow" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Module2Section6Quiz />
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default Module2Section6;
