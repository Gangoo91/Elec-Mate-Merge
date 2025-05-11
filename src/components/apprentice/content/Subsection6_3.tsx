
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, MoveDown, Scale, HandHelping, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SubsectionProps } from "./subsection1_1/types";

const Subsection6_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8 animate-fade-in pb-8">
      {/* Main Heading */}
      <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-elec-yellow mb-3">Manual Handling Techniques for Electrical Work</h2>
        <p className="text-elec-light/80">
          Manual handling activities are common in electrical work and pose significant risks if not performed correctly. The Manual Handling Operations Regulations 1992 (as amended) provide the legal framework that protects workers from injury.
        </p>
      </div>
      
      {/* Decorative Separator with Icon */}
      <div className="flex items-center gap-4 py-2">
        <Separator className="flex-grow bg-elec-yellow/30" />
        <div className="bg-elec-yellow/10 p-2 rounded-full">
          <span className="text-elec-yellow text-xl">⚡</span>
        </div>
        <Separator className="flex-grow bg-elec-yellow/30" />
      </div>
      
      {/* Key Principles Section */}
      <Card className="bg-elec-gray border border-elec-yellow/20">
        <CardHeader className="bg-gradient-to-r from-elec-yellow/10 to-transparent border-b border-elec-yellow/20 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MoveDown className="h-5 w-5 text-elec-yellow" />
              <h3 className="text-xl font-bold text-elec-yellow">TILE Principles of Manual Handling</h3>
            </div>
            <div className="px-3 py-1.5 bg-elec-yellow/10 rounded-full text-sm text-elec-yellow border border-elec-yellow/20 hidden md:flex items-center gap-2">
              <Scale className="h-4 w-4" />
              <span>Risk Assessment</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <p className="text-base mb-6">
            Before attempting any manual handling task, electricians should apply the TILE principles to assess and minimise risks.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-elec-yellow/10 rounded-lg">
                  <HandHelping className="h-5 w-5 text-elec-yellow" />
                </div>
                <h4 className="font-medium text-elec-yellow text-lg">Task & Individual</h4>
              </div>
              
              <div className="space-y-4">
                <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 hover:border-elec-yellow/40 transition-all duration-300">
                  <h5 className="font-medium text-elec-yellow text-base mb-2">Task Factors</h5>
                  <ul className="space-y-2 pl-1">
                    {[
                      "Does the task require twisting, stooping, or reaching upwards?",
                      "Does it involve excessive lifting, lowering or carrying distances?",
                      "Is there a risk of sudden movement or unpredictable load movement?",
                      "Does the task require repetitive handling or team handling?"
                    ].map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow/60 mt-2 shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 hover:border-elec-yellow/40 transition-all duration-300">
                  <h5 className="font-medium text-elec-yellow text-base mb-2">Individual Capability</h5>
                  <ul className="space-y-2 pl-1">
                    {[
                      "Does the job require unusual strength, height, or other physical attributes?",
                      "Are there health concerns that might affect handling capability?",
                      "Is special knowledge or training required for safe handling?",
                      "Is suitable PPE available that won't interfere with handling?"
                    ].map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow/60 mt-2 shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-elec-yellow/10 rounded-lg">
                  <Scale className="h-5 w-5 text-elec-yellow" />
                </div>
                <h4 className="font-medium text-elec-yellow text-lg">Load & Environment</h4>
              </div>
              
              <div className="space-y-4">
                <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 hover:border-elec-yellow/40 transition-all duration-300">
                  <h5 className="font-medium text-elec-yellow text-base mb-2">Load Characteristics</h5>
                  <ul className="space-y-2 pl-1">
                    {[
                      "Is the load heavy, bulky, unwieldy, or difficult to grasp?",
                      "Is the load unstable or with contents likely to shift?",
                      "Are there sharp edges or hot/cold surfaces that pose risks?",
                      "Does the load obscure vision when carrying?"
                    ].map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow/60 mt-2 shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 hover:border-elec-yellow/40 transition-all duration-300">
                  <h5 className="font-medium text-elec-yellow text-base mb-2">Environmental Factors</h5>
                  <ul className="space-y-2 pl-1">
                    {[
                      "Are there space constraints preventing good posture?",
                      "Are floors uneven, slippery, or unstable?",
                      "Are there variations in floor levels or working surfaces?",
                      "Is lighting, temperature, or humidity poor?"
                    ].map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow/60 mt-2 shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 border-t border-elec-yellow/20 bg-gradient-to-b from-elec-dark/70 to-elec-dark">
            <p className="font-medium mb-1 text-elec-yellow text-sm">Risk Hierarchy:</p>
            <p className="text-sm">
              Following the hierarchy of control, first try to <strong>avoid</strong> hazardous manual handling operations altogether. If unavoidable, <strong>assess</strong> the risk and <strong>reduce</strong> it as far as reasonably practicable using mechanical aids or team lifting as appropriate.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Safe Lifting Techniques */}
      <div className="rounded-lg border border-elec-yellow/20 p-4 md:p-6 bg-gradient-to-b from-elec-dark/50 to-elec-dark">
        <h3 className="text-2xl font-bold text-elec-yellow mb-6">Safe Lifting Techniques</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <LiftingTechniqueCard 
            title="Preparation" 
            steps={[
              "Assess the load - weight, size, shape",
              "Plan the route - remove obstacles",
              "Get help if needed - don't be a hero",
              "Wear appropriate PPE - gloves, safety boots",
              "Position feet shoulder-width apart",
              "Ensure good lighting and visibility"
            ]}
          />
          
          <LiftingTechniqueCard 
            title="Lifting" 
            steps={[
              "Bend knees, not waist, keeping back straight",
              "Get a firm grip using palms, not fingertips",
              "Keep load close to body at waist height",
              "Lift smoothly using leg muscles, not back",
              "Avoid twisting - move feet to turn instead",
              "Keep head up and look forward, not down"
            ]}
          />
          
          <LiftingTechniqueCard 
            title="Carrying & Setting Down" 
            steps={[
              "Keep load close to body while moving",
              "Move smoothly, avoid jerky movements",
              "Change grip carefully if needed",
              "To set down, reverse lifting procedure",
              "Bend knees, not back when lowering",
              "Place load down first, then adjust position"
            ]}
          />
        </div>
        
        <div className="mt-8 p-4 bg-elec-dark/50 border border-elec-yellow/20 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            <h4 className="text-lg font-medium text-elec-yellow">Weight Guidelines</h4>
          </div>
          <p className="mb-4 text-sm">
            These guideline weights should be reduced if handling conditions are less than ideal. Consider the individual's capability when applying these limits.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <WeightGuidelineCard position="Shoulder height (head to shoulders)" menKg={10} womenKg={7} />
            <WeightGuidelineCard position="Elbow height (shoulders to waist)" menKg={20} womenKg={13} />
            <WeightGuidelineCard position="Knuckle height (waist to knuckle)" menKg={25} womenKg={16} />
            <WeightGuidelineCard position="Mid lower leg (knuckle to floor)" menKg={20} womenKg={13} />
          </div>
        </div>
      </div>
      
      {/* Electrical-Specific Considerations */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <div className="p-4 md:p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4">Electrical-Specific Handling Considerations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Common Electrical Items */}
            <div className="space-y-3">
              <h4 className="font-semibold text-elec-yellow mb-2">Common Electrical Items</h4>
              <ul className="space-y-3">
                {[
                  {
                    title: "Cable Drums",
                    content: "Use cable drum jacks or spindles rather than manually lifting. Roll drums rather than carry where possible. Large drums should always be handled by mechanical means such as forklifts or specialized cable handling equipment."
                  },
                  {
                    title: "Distribution Boards",
                    content: "Metal enclosures can be heavy and have sharp edges. Use team lifting for boards over 20kg. Ensure clear communication between team members before lifting. Consider using shoulder straps or carrying handles where provided."
                  },
                  {
                    title: "Conduit and Trunking",
                    content: "Long lengths can be unwieldy and cause balance issues. Carry with a partner for lengths over 3 metres. Be aware of overhead obstacles when carrying. Use pipe carriers or shoulder pads for metallic conduit to prevent injury."
                  }
                ].map((item, index) => (
                  <li key={index} className="bg-elec-dark/30 p-3 rounded-lg border border-elec-yellow/10">
                    <span className="font-medium block">{item.title}</span>
                    <p className="text-sm mt-1">{item.content}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Special Precautions */}
            <div className="space-y-3">
              <h4 className="font-semibold text-elec-yellow mb-2">Special Precautions</h4>
              <ul className="space-y-3">
                {[
                  {
                    title: "Batteries",
                    content: "Lead-acid batteries contain corrosive substances. Use battery carriers with insulated handles. Never lift by terminals or connectors. Be aware of weight - even small batteries can exceed 20kg. Wear acid-resistant gloves and eye protection."
                  },
                  {
                    title: "Transformers",
                    content: "Often extremely heavy with uneven weight distribution. Always use mechanical handling for units over 25kg. Check for oil leaks before handling. Never attempt to manually handle pole-mounted or substation transformers without proper equipment and training."
                  },
                  {
                    title: "Switchgear",
                    content: "Plan installation carefully to avoid manual handling where possible. Use skates or rollers for final positioning. Consider access routes during planning stages. Components may need to be installed separately and assembled in-situ to reduce handling risks."
                  }
                ].map((item, index) => (
                  <li key={index} className="bg-elec-dark/30 p-3 rounded-lg border border-elec-yellow/10">
                    <span className="font-medium block">{item.title}</span>
                    <p className="text-sm mt-1">{item.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-elec-dark/70 border border-elec-yellow/20 rounded-lg">
            <h4 className="font-medium text-elec-yellow mb-3">Team Handling Techniques</h4>
            <p className="text-sm mb-3">When items are too heavy for one person, team lifting may be appropriate if mechanical aids aren't available:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1" />
                <span>One person should coordinate the lift, giving clear commands</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1" />
                <span>Team members should be of similar height when possible</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1" />
                <span>Plan the route and ensure clear communication throughout</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1" />
                <span>Lift and lower simultaneously on agreed commands</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1" />
                <span>Each person should not handle more than 75% of their individual capacity</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1" />
                <span>Consider using carrying aids like slings or poles for awkward items</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
      
      {/* Mechanical Aids Section */}
      <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-4 md:p-6">
        <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
          <HandHelping className="h-5 w-5 mr-2" />
          Mechanical Handling Aids
        </h3>
        
        <div className="space-y-4">
          <p className="mb-4">Using appropriate mechanical aids can significantly reduce the risk of manual handling injuries:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-elec-dark/50 border border-elec-yellow/10 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Lifting Equipment</h4>
              <ul className="space-y-3">
                {[
                  {
                    title: "Trolleys and carts",
                    desc: "For transporting heavy equipment across level surfaces"
                  },
                  {
                    title: "Sack trucks",
                    desc: "Ideal for moving stacked items or boxed equipment"
                  },
                  {
                    title: "Pallet trucks",
                    desc: "For moving palletised materials around site"
                  },
                  {
                    title: "Hoists and pulleys",
                    desc: "For vertical lifting of equipment to height"
                  }
                ].map((item, index) => (
                  <li key={index} className="border-b border-elec-yellow/10 pb-2 last:border-0 last:pb-0">
                    <span className="font-medium block">{item.title}</span>
                    <p className="text-sm mt-1 text-elec-light/80">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-elec-dark/50 border border-elec-yellow/10 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Specialised Electrical Aids</h4>
              <ul className="space-y-3">
                {[
                  {
                    title: "Cable dispensers",
                    desc: "Allow smooth unreeling without manual lifting"
                  },
                  {
                    title: "Cable pulling winches",
                    desc: "Reduce strain when pulling cables through conduit"
                  },
                  {
                    title: "Conduit benders",
                    desc: "Bench or floor-mounted to avoid manual handling strain"
                  },
                  {
                    title: "Pipe/conduit carriers",
                    desc: "Ergonomic handles for carrying long materials"
                  }
                ].map((item, index) => (
                  <li key={index} className="border-b border-elec-yellow/10 pb-2 last:border-0 last:pb-0">
                    <span className="font-medium block">{item.title}</span>
                    <p className="text-sm mt-1 text-elec-light/80">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-elec-dark/50 border border-elec-yellow/10 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Legal Requirements</h4>
              <ul className="space-y-3">
                {[
                  {
                    title: "PUWER 1998",
                    desc: "All work equipment must be suitable, maintained and inspected"
                  },
                  {
                    title: "LOLER 1998",
                    desc: "Lifting equipment must be strong, stable and marked with SWL"
                  },
                  {
                    title: "Thorough examination",
                    desc: "Required for lifting equipment - typically every 12 months"
                  },
                  {
                    title: "Competent users",
                    desc: "Equipment operators must be properly trained"
                  }
                ].map((item, index) => (
                  <li key={index} className="border-b border-elec-yellow/10 pb-2 last:border-0 last:pb-0">
                    <span className="font-medium block">{item.title}</span>
                    <p className="text-sm mt-1 text-elec-light/80">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
            <p className="font-medium mb-1 text-elec-yellow">Selection of Aids:</p>
            <p>When selecting mechanical aids, consider the specific requirements of the task, the working environment, and the capabilities of the users. Always inspect aids before use for any damage or defects. Ensure equipment is suitable for the load characteristics and environment where it will be used.</p>
          </div>
        </div>
      </div>
      
      {/* Training and Reporting Section */}
      <div className="rounded-lg border border-elec-yellow/20 p-4 md:p-6 bg-gradient-to-b from-elec-dark/50 to-elec-dark">
        <h3 className="text-2xl font-bold text-elec-yellow mb-4">Training and Incident Reporting</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-elec-yellow text-lg flex items-center gap-2">
              <span className="inline-block w-6 h-6 bg-elec-yellow text-elec-dark rounded-full text-center font-bold text-sm leading-6">1</span>
              Training Requirements
            </h4>
            <p className="text-sm mb-3">
              Employers must ensure workers receive appropriate training on manual handling. This should include:
            </p>
            <ul className="bg-elec-dark/50 p-4 rounded-lg space-y-2 text-sm border border-elec-yellow/20">
              {[
                "Recognition of hazardous manual handling tasks",
                "How to use mechanical aids safely and effectively",
                "Good handling techniques for specific task types",
                "Factors affecting individual capability and limitations",
                "How to carry out dynamic risk assessments",
                "The importance of good posture and physical fitness"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-elec-yellow shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 p-4 bg-elec-dark/30 rounded-lg border border-elec-yellow/10">
              <h5 className="font-medium text-white mb-2">Refresher Training</h5>
              <p className="text-sm">
                Manual handling training should be refreshed regularly, typically every 1-3 years or when:
              </p>
              <ul className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
                <li className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow/60"></div>
                  <span>Work tasks change</span>
                </li>
                <li className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow/60"></div>
                  <span>After an incident</span>
                </li>
                <li className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow/60"></div>
                  <span>When risks change</span>
                </li>
                <li className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow/60"></div>
                  <span>Poor technique observed</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-elec-yellow text-lg flex items-center gap-2">
              <span className="inline-block w-6 h-6 bg-elec-yellow text-elec-dark rounded-full text-center font-bold text-sm leading-6">2</span>
              Incident Reporting
            </h4>
            <p className="text-sm mb-3">
              When manual handling injuries occur, proper reporting is essential:
            </p>
            
            <div className="space-y-4">
              <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
                <h5 className="font-medium text-elec-yellow mb-2">RIDDOR Reporting</h5>
                <p className="text-sm mb-2">
                  The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR) requires reporting of:
                </p>
                <ul className="space-y-1 text-sm pl-4 list-disc">
                  <li>Over 7-day injuries from manual handling</li>
                  <li>Specified injuries such as fractures</li>
                  <li>Musculoskeletal disorders directly linked to work</li>
                </ul>
                <p className="text-sm mt-2 italic">
                  Reports must be submitted to the HSE within specified timeframes.
                </p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
                <h5 className="font-medium text-elec-yellow mb-2">Internal Reporting</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm mb-2">
                      All manual handling incidents, including near misses, should be:
                    </p>
                    <ul className="space-y-1 text-sm pl-4 list-disc">
                      <li>Recorded in the company accident book</li>
                      <li>Investigated to identify root causes</li>
                      <li>Used to improve risk assessments</li>
                      <li>Shared as lessons learned</li>
                    </ul>
                  </div>
                  <div className="bg-elec-dark/30 p-3 rounded-lg border border-elec-yellow/10">
                    <h6 className="font-medium text-white mb-2">Early Reporting of Symptoms</h6>
                    <p className="text-sm mb-2">
                      Report early signs of:
                    </p>
                    <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
                      <li className="flex items-center gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow/60"></div>
                        <span>Persistent pain</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow/60"></div>
                        <span>Numbness</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow/60"></div>
                        <span>Tingling</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow/60"></div>
                        <span>Loss of strength</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Completion Button */}
      <div className="flex justify-end pt-6 border-t border-elec-yellow/20">
        <Button
          variant="study"
          className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
          onClick={markAsComplete}
          disabled={isCompleted}
        >
          {isCompleted ? 'Completed' : 'Mark as Complete'}
          {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

// Reusable component for Lifting Technique Cards
const LiftingTechniqueCard = ({ title, steps }) => (
  <div className="bg-elec-dark/50 rounded-lg p-4 border border-elec-yellow/20 hover:border-elec-yellow/40 transition-all duration-300 h-full">
    <h4 className="font-medium text-elec-yellow text-lg mb-3">{title}</h4>
    <ul className="space-y-2">
      {steps.map((step, index) => (
        <li key={index} className="flex items-start gap-2 text-sm">
          <div className="h-5 w-5 rounded-full bg-elec-yellow/20 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-elec-yellow text-xs">{index + 1}</span>
          </div>
          <span>{step}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Weight Guideline Card
const WeightGuidelineCard = ({ position, menKg, womenKg }) => (
  <div className="bg-elec-dark/70 rounded-lg p-3 border border-elec-yellow/10">
    <div className="mb-2 text-sm font-medium">{position}</div>
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-elec-dark p-2 rounded text-center">
        <div className="text-xs text-elec-yellow/80">Men</div>
        <div className="font-bold">{menKg} kg</div>
      </div>
      <div className="bg-elec-dark p-2 rounded text-center">
        <div className="text-xs text-elec-yellow/80">Women</div>
        <div className="font-bold">{womenKg} kg</div>
      </div>
    </div>
  </div>
);

export default Subsection6_3;
