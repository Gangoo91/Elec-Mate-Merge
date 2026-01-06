import { ArrowLeft, CheckCircle, Users, Shield, Target, Award, Clock, TrendingUp, BookOpen, Zap, ArrowRight, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module1Section1 = () => {
  useSEO(
    "Section 1: Purpose of the AM2 and Who It's For - AM2 Preparation",
    "Understanding the AM2 assessment objectives, target candidates, and why it matters for your electrical career"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary purpose of the AM2 assessment?",
      options: [
        "To teach new electrical skills",
        "To prove competence and readiness to work as a qualified electrician",
        "To catch out apprentices with trick questions",
        "To provide theoretical knowledge only"
      ],
      correctAnswer: 1,
      explanation: "The AM2 is designed to prove you are ready to work as a qualified electrician by demonstrating competence in practical skills."
    },
    {
      id: 2,
      question: "Who is the AM2 assessment primarily aimed at?",
      options: [
        "Complete beginners to electrical work",
        "Final-stage apprentices and experienced electricians seeking qualification",
        "Electrical engineers only",
        "DIY enthusiasts"
      ],
      correctAnswer: 1,
      explanation: "The AM2 is for apprentices at the end of their training or experienced electricians going through assessment routes like NVQ Level 3."
    },
    {
      id: 3,
      question: "What credential does passing the AM2 allow you to apply for?",
      options: [
        "City & Guilds certificate",
        "University degree",
        "ECS Gold Card",
        "Health and Safety certificate"
      ],
      correctAnswer: 2,
      explanation: "Passing the AM2 allows you to apply for an ECS Gold Card, which is your passport to working as a fully qualified electrician in the UK."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="flex items-center gap-2 p-3 md:p-4 text-xs md:text-sm text-muted-foreground">
        <Link 
          to=".." 
          className="hover:text-elec-yellow transition-colors"
        >
          ← Back
        </Link>
        <span>/</span>
        <span>AM2</span>
        <span>/</span>
        <span className="hidden sm:inline">Module 1</span>
        <span className="sm:hidden">M1</span>
        <span>/</span>
        <span className="text-elec-yellow">Section 1</span>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-12">
        {/* Hero Section */}
        <div className="mb-4 md:mb-6">
          <Card className="bg-card border-elec-yellow/30">
            <div className="p-4 md:p-6 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-elec-yellow/20 rounded-full mb-3 md:mb-4">
                <Zap className="h-5 w-5 md:h-6 md:w-6 text-elec-yellow" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 md:mb-3">
                Understanding AM2 Assessment
              </h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
                Learn about the AM2 practical assessment - your pathway to becoming a qualified electrician.
              </p>
            </div>
          </Card>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          <Card className="bg-card border-elec-yellow/30 text-center p-3 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-elec-yellow mb-1">15,000+</div>
            <div className="text-xs text-muted-foreground">Take AM2 annually</div>
          </Card>
          <Card className="bg-card border-elec-yellow/30 text-center p-3 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-elec-yellow mb-1">2½ Days</div>
            <div className="text-xs text-muted-foreground">16.5 hours total</div>
          </Card>
          <Card className="bg-card border-elec-yellow/30 text-center p-3 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-elec-yellow mb-1">£8,000</div>
            <div className="text-xs text-muted-foreground">Avg salary increase</div>
          </Card>
          <Card className="bg-card border-elec-yellow/30 text-center p-3 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-elec-yellow mb-1">NVQ 3</div>
            <div className="text-xs text-muted-foreground">Qualification level</div>
          </Card>
        </div>

        {/* What is AM2? */}
        <Card className="bg-card border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">What is AM2?</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl mb-3 md:mb-4">
              AM2 (Achievement Measurement 2) is a 2½-day practical assessment totalling 16.5 hours for electrical workers completing their NVQ Level 3. 
              It proves your competency in electrical installation work and unlocks your ECS Gold Card.
            </p>
            <div className="bg-card/80 border border-elec-yellow/30 rounded-lg p-3 max-w-3xl">
              <p className="text-muted-foreground text-xs">
                <strong className="text-elec-yellow">Important:</strong> This isn't just a test - it's your final step to becoming a fully qualified electrician. 
                The assessment simulates real workplace conditions and you'll be evaluated on safety, technical skill, and professional standards.
              </p>
            </div>
          </div>
        </Card>

        {/* Assessment Breakdown */}
        <Card className="bg-card border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">AM2 Assessment Components</h2>
            <div className="space-y-3 md:space-y-4 max-w-3xl">
              <p className="text-muted-foreground text-sm mb-3 md:mb-4">
                The AM2 assessment comprises 5 distinct components totalling 16.5 hours over 2½ days. 
                Most of your time is spent on installation work, while other sections test how you finish, check, and fix your work.
              </p>
              
              <div className="border-l-4 border-elec-yellow/50 pl-3 md:pl-4">
                <h3 className="text-foreground font-semibold mb-1 md:mb-2 text-sm md:text-base">Safe Isolation & Risk Assessment (30 minutes)</h3>
                <p className="text-muted-foreground text-xs md:text-sm mb-1 md:mb-2">
                  Essential safety procedures before any electrical work begins:
                </p>
                <ul className="text-muted-foreground text-xs md:text-sm space-y-1">
                  <li>• Lock off and tag out procedures</li>
                  <li>• Prove dead testing using approved test equipment</li>
                  <li>• Risk assessment completion and hazard identification</li>
                  <li>• Safe working method statements</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-l-red-500/50 pl-3 md:pl-4">
                <h3 className="text-foreground font-semibold mb-1 md:mb-2 text-sm md:text-base">Installation Work (8 hours) - Main Component</h3>
                <p className="text-muted-foreground text-xs md:text-sm mb-1 md:mb-2">
                  The largest section where you demonstrate your core electrical installation skills:
                </p>
                <ul className="text-muted-foreground text-xs md:text-sm space-y-1">
                  <li>• Cable installation using various methods (conduit, trunking, clipping)</li>
                  <li>• SWA cable termination techniques</li>
                  <li>• Mechanical protection and support systems</li>
                  <li>• Accessory installation and final connections</li>
                  <li>• Professional workmanship and cable management</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-elec-yellow/50 pl-3 md:pl-4">
                <h3 className="text-foreground font-semibold mb-1 md:mb-2 text-sm md:text-base">Inspection & Testing (3.5 hours)</h3>
                <p className="text-muted-foreground text-xs md:text-sm mb-1 md:mb-2">
                  Comprehensive testing to verify your installation meets regulations:
                </p>
                <ul className="text-muted-foreground text-xs md:text-sm space-y-1">
                  <li>• Complete sequence of electrical tests</li>
                  <li>• Earth fault loop impedance measurements</li>
                  <li>• Insulation resistance testing</li>
                  <li>• RCD testing and verification</li>
                  <li>• Certificate completion with accurate results</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-elec-yellow/50 pl-3 md:pl-4">
                <h3 className="text-foreground font-semibold mb-1 md:mb-2 text-sm md:text-base">Fault Finding (2.5 hours)</h3>
                <p className="text-muted-foreground text-xs md:text-sm mb-1 md:mb-2">
                  Diagnostic skills to identify and rectify electrical faults:
                </p>
                <ul className="text-muted-foreground text-xs md:text-sm space-y-1">
                  <li>• Systematic fault diagnosis using test equipment</li>
                  <li>• Circuit analysis and problem identification</li>
                  <li>• Safe fault rectification procedures</li>
                  <li>• Verification testing after repairs</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-elec-yellow/50 pl-3 md:pl-4">
                <h3 className="text-foreground font-semibold mb-1 md:mb-2 text-sm md:text-base">Online Knowledge Test (1 hour)</h3>
                <p className="text-muted-foreground text-xs md:text-sm mb-1 md:mb-2">
                  Computer-based assessment covering theoretical knowledge:
                </p>
                <ul className="text-muted-foreground text-xs md:text-sm space-y-1">
                  <li>• BS 7671 Wiring Regulations questions</li>
                  <li>• Cable calculations and protective device selection</li>
                  <li>• Health and safety requirements</li>
                  <li>• Inspection and testing procedures</li>
                </ul>
              </div>
              
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3 mt-3 md:mt-4">
                <p className="text-elec-yellow text-xs font-semibold mb-1">Important Note:</p>
                <p className="text-muted-foreground text-xs">
                  These timings vary slightly by assessment centre, but the balance remains the same across all providers. 
                  The installation component always takes up the majority of your time.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Assessment Criteria */}
        <Card className="bg-card border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">How You'll Be Assessed</h2>
            <p className="text-muted-foreground text-sm mb-3 md:mb-4 max-w-3xl">
              Assessors evaluate you across multiple criteria. Understanding these helps you prepare effectively:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-3xl">
              <div className="space-y-3">
                <div className="bg-card/80 border border-elec-yellow/30 rounded-lg p-3">
                  <h4 className="text-foreground font-semibold text-sm mb-1">Safety & Compliance (30%)</h4>
                  <ul className="text-muted-foreground text-xs space-y-1">
                    <li>• Risk assessment completion</li>
                    <li>• PPE usage and safe working</li>
                    <li>• BS 7671 regulation compliance</li>
                  </ul>
                </div>
                
                <div className="bg-card/80 border border-elec-yellow/30 rounded-lg p-3">
                  <h4 className="text-foreground font-semibold text-sm mb-1">Technical Skills (40%)</h4>
                  <ul className="text-muted-foreground text-xs space-y-1">
                    <li>• Installation techniques</li>
                    <li>• Cable selection and calculations</li>
                    <li>• Testing procedures and accuracy</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-card/80 border border-elec-yellow/30 rounded-lg p-3">
                  <h4 className="text-foreground font-semibold text-sm mb-1">Quality & Presentation (20%)</h4>
                  <ul className="text-muted-foreground text-xs space-y-1">
                    <li>• Workmanship standards</li>
                    <li>• Cable management</li>
                    <li>• Professional appearance</li>
                  </ul>
                </div>
                
                <div className="bg-card/80 border border-elec-yellow/30 rounded-lg p-3">
                  <h4 className="text-foreground font-semibold text-sm mb-1">Time Management (10%)</h4>
                  <ul className="text-muted-foreground text-xs space-y-1">
                    <li>• Task completion within timeframes</li>
                    <li>• Efficient working methods</li>
                    <li>• Planning and organisation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck
          id="am2-understanding"
          question="What does AM2 stand for?"
          options={[
            "Apprentice Module 2",
            "Achievement Measurement 2", 
            "Advanced Maintenance 2",
            "Assessed Module 2"
          ]}
          correctIndex={1}
          explanation="AM2 stands for Achievement Measurement 2, which is the practical assessment for electrical installation workers."
        />

        {/* Who is AM2 For? */}
        <Card className="bg-card border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">
              <Users className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              Who Takes AM2?
            </h2>
            <div className="max-w-3xl">
              <p className="text-muted-foreground text-sm mb-3 md:mb-4">
                AM2 is designed for electrical workers at the final stage of their training or those seeking formal recognition of their skills.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-sm">
                <div>
                  <h3 className="text-foreground font-semibold mb-2">Typical Candidates</h3>
                  <ul className="space-y-1 text-muted-foreground mb-3 md:mb-4 text-xs md:text-sm">
                    <li>• Final year electrical apprentices</li>
                    <li>• Experienced electricians needing formal qualification</li>
                    <li>• Career changers with electrical training</li>
                    <li>• International electricians seeking UK recognition</li>
                  </ul>
                  
                  <h3 className="text-foreground font-semibold mb-2">Experience Level</h3>
                  <p className="text-muted-foreground text-xs">
                    Most candidates have 2-4 years of electrical installation experience and are working towards 
                    completing their NVQ Level 3 qualification.
                  </p>
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-2">Essential Requirements</h3>
                  <ul className="space-y-1 text-muted-foreground mb-3 md:mb-4 text-xs md:text-sm">
                    <li>• Level 3 Electrical Installation Diploma</li>
                    <li>• 18th Edition Wiring Regulations</li>
                    <li>• Inspection & Testing qualification</li>
                    <li>• Hands-on installation experience</li>
                  </ul>
                  
                  <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded p-2">
                    <p className="text-elec-yellow text-xs font-semibold mb-1">Before You Book:</p>
                    <p className="text-muted-foreground text-xs">
                      Ensure you're confident with practical installation work, testing procedures, 
                      and can work independently to professional standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Preparation Guide */}
        <Card className="bg-card border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">
              <Target className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              How to Prepare
            </h2>
            <div className="max-w-3xl space-y-3 md:space-y-4">
              <p className="text-muted-foreground text-sm">
                Success in AM2 comes from thorough preparation. Here's your roadmap to assessment readiness:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                <div className="bg-card/80 border border-elec-yellow/30 rounded-lg p-3">
                  <h4 className="text-foreground font-semibold text-sm mb-2">Technical Skills</h4>
                  <ul className="text-muted-foreground text-xs space-y-1">
                    <li>• Practice conduit bending techniques</li>
                    <li>• Master SWA cable terminations</li>
                    <li>• Refresh cable calculation methods</li>
                    <li>• Practice testing sequences</li>
                  </ul>
                </div>
                
                <div className="bg-card/80 border border-elec-yellow/30 rounded-lg p-3">
                  <h4 className="text-foreground font-semibold text-sm mb-2">Knowledge Review</h4>
                  <ul className="text-muted-foreground text-xs space-y-1">
                    <li>• Study BS 7671 key sections</li>
                    <li>• Review protective device selection</li>
                    <li>• Understand earthing systems</li>
                    <li>• Know inspection schedules</li>
                  </ul>
                </div>
                
                <div className="bg-card/80 border border-elec-yellow/30 rounded-lg p-3">
                  <h4 className="text-foreground font-semibold text-sm mb-2">Practical Prep</h4>
                  <ul className="text-muted-foreground text-xs space-y-1">
                    <li>• Complete mock assessments</li>
                    <li>• Time yourself on installations</li>
                    <li>• Practice fault-finding scenarios</li>
                    <li>• Perfect your test procedures</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3">
                <h4 className="text-elec-yellow font-semibold text-sm mb-2">Recommended Preparation Time</h4>
                <p className="text-muted-foreground text-xs">
                  Allow 3-6 months of focused preparation, including 40-60 hours of additional practice beyond your regular work. 
                  Many training centres offer AM2 preparation courses which can significantly boost your confidence.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck
          id="target-audience"
          question="Which qualification is a prerequisite for AM2?"
          options={[
            "Level 2 Electrical Installation",
            "18th Edition IET Wiring Regulations",
            "PAT Testing Certificate", 
            "First Aid Certificate"
          ]}
          correctIndex={1}
          explanation="The 18th Edition IET Wiring Regulations qualification is essential before taking AM2."
        />

        {/* Career Impact */}
        <Card className="bg-card border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">
              <TrendingUp className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              Why It Matters for Your Career
            </h2>
            <div className="max-w-3xl space-y-3 md:space-y-4">
              <p className="text-muted-foreground text-sm">
                Passing AM2 transforms your career prospects and opens doors that remain closed to unqualified electricians.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <h3 className="text-foreground font-semibold mb-2 text-sm">Immediate Impact</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground text-sm font-medium">ECS Gold Card</span>
                        <p className="text-muted-foreground text-xs">Access to construction sites nationwide</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground text-sm font-medium">JIB Recognition</span>
                        <p className="text-muted-foreground text-xs">Industry-wide acceptance of your skills</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground text-sm font-medium">Insurance Benefits</span>
                        <p className="text-muted-foreground text-xs">Lower rates for qualified tradespeople</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-foreground font-semibold mb-2 text-sm">Long-term Opportunities</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground text-sm font-medium">Self-Employment</span>
                        <p className="text-muted-foreground text-xs">Start your own electrical business</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground text-sm font-medium">Management Roles</span>
                        <p className="text-muted-foreground text-xs">Progress to supervisory positions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground text-sm font-medium">Specialist Sectors</span>
                        <p className="text-muted-foreground text-xs">Access high-value commercial projects</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card/80 border border-elec-yellow/30 rounded-lg p-3">
                <h4 className="text-foreground font-semibold text-sm mb-2">Salary Impact</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 text-center">
                  <div>
                    <div className="text-elec-yellow font-bold text-sm md:text-base">£28-32k</div>
                    <div className="text-muted-foreground text-xs">Newly Qualified</div>
                  </div>
                  <div>
                    <div className="text-elec-yellow font-bold text-sm md:text-base">£35-42k</div>
                    <div className="text-muted-foreground text-xs">3-5 Years Experience</div>
                  </div>
                  <div>
                    <div className="text-elec-yellow font-bold text-sm md:text-base">£45-55k</div>
                    <div className="text-muted-foreground text-xs">Senior/Specialist</div>
                  </div>
                  <div>
                    <div className="text-elec-yellow font-bold text-sm md:text-base">£60k+</div>
                    <div className="text-muted-foreground text-xs">Self-Employed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Challenges */}
        <Card className="bg-card border-elec-yellow/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-elec-yellow mb-2 md:mb-3">
              <AlertTriangle className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              Common Challenges & How to Overcome Them
            </h2>
            <div className="max-w-3xl space-y-3 md:space-y-4">
              <p className="text-muted-foreground text-sm">
                Understanding common pitfalls helps you prepare more effectively and avoid typical mistakes.
              </p>
              
              <div className="grid gap-3 md:gap-4">
                <div className="bg-card border border-red-500/20 rounded-lg p-3">
                  <h4 className="text-elec-yellow font-semibold text-sm mb-2">Time Management Issues</h4>
                  <p className="text-muted-foreground text-xs mb-2">
                    Many candidates struggle to complete all tasks within the allocated timeframe.
                  </p>
                  <div className="text-muted-foreground text-xs">
                    <strong>Solution:</strong> Practice timed installations, create a personal checklist, and prioritise safety-critical tasks first.
                  </div>
                </div>
                
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3">
                  <h4 className="text-elec-yellow font-semibold text-sm mb-2">Testing Procedure Errors</h4>
                  <p className="text-muted-foreground text-xs mb-2">
                    Incorrect testing sequence or missed tests are common failure points.
                  </p>
                  <div className="text-muted-foreground text-xs">
                    <strong>Solution:</strong> Memorise the BS 7671 testing sequence and practice until it becomes automatic.
                  </div>
                </div>
                
                <div className="bg-card border border-elec-yellow/20 rounded-lg p-3">
                  <h4 className="text-elec-yellow font-semibold text-sm mb-2">Documentation Quality</h4>
                  <p className="text-muted-foreground text-xs mb-2">
                    Poor handwriting, incomplete certificates, or calculation errors can cost marks.
                  </p>
                  <div className="text-muted-foreground text-xs">
                    <strong>Solution:</strong> Practice certificate completion and double-check all calculations and entries.
                  </div>
                </div>
              </div>
              
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3">
                <h4 className="text-elec-yellow font-semibold text-sm mb-2">Success Tips</h4>
                <ul className="text-muted-foreground text-xs space-y-1">
                  <li>• Arrive early and familiarise yourself with the workspace</li>
                  <li>• Read all instructions thoroughly before starting</li>
                  <li>• Maintain consistent safety practices throughout</li>
                  <li>• Ask assessors for clarification if instructions are unclear</li>
                  <li>• Keep your workspace organised and tools maintained</li>
                  <li>• Leave time for final checks and documentation review</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck
          id="career-benefits"
          question="What is one immediate benefit of passing AM2?"
          options={[
            "Automatic salary increase",
            "ECS Gold Card eligibility",
            "Company vehicle provision",
            "Guaranteed job placement"
          ]}
          correctIndex={1}
          explanation="Passing AM2 makes you eligible for an ECS Gold Card, essential for working on construction sites."
        />

        {/* Quiz Section */}
        <div className="mb-6">
          <Quiz 
            questions={quizQuestions}
            title="AM2 Understanding Quiz"
          />
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <Link 
            to=".."
            className="flex items-center gap-2 px-4 py-2 bg-card border border-elec-yellow/30 text-foreground rounded-lg hover:border-elec-yellow/50 transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Module
          </Link>
          <Link 
            to="../section2"
            className="flex items-center gap-2 px-4 py-2 bg-elec-yellow text-black rounded-lg hover:bg-elec-yellow/90 transition-colors text-sm"
          >
            Continue to Section 2
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AM2Module1Section1;