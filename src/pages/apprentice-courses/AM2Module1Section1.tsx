import { CheckCircle, Users, Target, TrendingUp, AlertTriangle, Zap } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2TestSequence } from "@/components/apprentice-courses/AM2TestSequence";
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

  const assessmentSteps = [
    {
      title: "Safe Isolation & Risk Assessment (30 minutes)",
      description: "Lock off and tag out procedures, prove dead testing using approved test equipment, risk assessment completion and hazard identification, safe working method statements."
    },
    {
      title: "Installation Work (8 hours) - Main Component",
      description: "Cable installation using various methods (conduit, trunking, clipping), SWA cable termination techniques, mechanical protection and support systems, accessory installation and final connections."
    },
    {
      title: "Inspection & Testing (3.5 hours)",
      description: "Complete sequence of electrical tests, earth fault loop impedance measurements, insulation resistance testing, RCD testing and verification, certificate completion."
    },
    {
      title: "Fault Finding (2.5 hours)",
      description: "Systematic fault diagnosis using test equipment, circuit analysis and problem identification, safe fault rectification procedures, verification testing after repairs."
    },
    {
      title: "Online Knowledge Test (1 hour)",
      description: "BS 7671 Wiring Regulations questions, cable calculations and protective device selection, health and safety requirements, inspection and testing procedures."
    }
  ];

  return (
    <AM2SectionLayout
      backHref=".."
      breadcrumbs={["AM2", "Module 1", "Section 1"]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={Zap}
        title="Understanding AM2 Assessment"
        description="Learn about the AM2 practical assessment - your pathway to becoming a qualified electrician."
        badge="Module 1 • Section 1"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <AM2ContentCard className="text-center">
          <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">15,000+</div>
          <div className="text-ios-footnote text-white/70">Take AM2 annually</div>
        </AM2ContentCard>
        <AM2ContentCard className="text-center">
          <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">2½ Days</div>
          <div className="text-ios-footnote text-white/70">16.5 hours total</div>
        </AM2ContentCard>
        <AM2ContentCard className="text-center">
          <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">£8,000</div>
          <div className="text-ios-footnote text-white/70">Avg salary increase</div>
        </AM2ContentCard>
        <AM2ContentCard className="text-center">
          <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">NVQ 3</div>
          <div className="text-ios-footnote text-white/70">Qualification level</div>
        </AM2ContentCard>
      </div>

      {/* What is AM2? */}
      <AM2ContentCard accent>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">What is AM2?</h2>
        <p className="text-ios-body text-white/90 leading-relaxed mb-4">
          AM2 (Achievement Measurement 2) is a 2½-day practical assessment totalling 16.5 hours for electrical workers completing their NVQ Level 3.
          It proves your competency in electrical installation work and unlocks your ECS Gold Card.
        </p>
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
          <p className="text-ios-callout text-white/90">
            <strong className="text-elec-yellow">Important:</strong> This isn't just a test - it's your final step to becoming a fully qualified electrician.
            The assessment simulates real workplace conditions and you'll be evaluated on safety, technical skill, and professional standards.
          </p>
        </div>
      </AM2ContentCard>

      {/* Assessment Breakdown */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">AM2 Assessment Components</h2>
        <p className="text-ios-body text-white/90 mb-6">
          The AM2 assessment comprises 5 distinct components totalling 16.5 hours over 2½ days.
          Most of your time is spent on installation work, while other sections test how you finish, check, and fix your work.
        </p>
        <AM2TestSequence steps={assessmentSteps} />
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4 mt-6">
          <p className="text-ios-footnote text-elec-yellow font-semibold mb-1">Important Note</p>
          <p className="text-ios-callout text-white/80">
            These timings vary slightly by assessment centre, but the balance remains the same across all providers.
            The installation component always takes up the majority of your time.
          </p>
        </div>
      </AM2ContentCard>

      {/* Assessment Criteria */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">How You'll Be Assessed</h2>
        <p className="text-ios-body text-white/90 mb-4">
          Assessors evaluate you across multiple criteria. Understanding these helps you prepare effectively:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Safety & Compliance (30%)</h4>
              <ul className="text-ios-callout text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Risk assessment completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>PPE usage and safe working</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>BS 7671 regulation compliance</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Technical Skills (40%)</h4>
              <ul className="text-ios-callout text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Installation techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Cable selection and calculations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Testing procedures and accuracy</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Quality & Presentation (20%)</h4>
              <ul className="text-ios-callout text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Workmanship standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Cable management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Professional appearance</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Time Management (10%)</h4>
              <ul className="text-ios-callout text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Task completion within timeframes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Efficient working methods</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Planning and organisation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AM2ContentCard>

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
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Who Takes AM2?
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          AM2 is designed for electrical workers at the final stage of their training or those seeking formal recognition of their skills.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-ios-headline text-white font-semibold mb-3">Typical Candidates</h3>
            <ul className="space-y-2 text-ios-callout text-white/80 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Final year electrical apprentices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Experienced electricians needing formal qualification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Career changers with electrical training</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>International electricians seeking UK recognition</span>
              </li>
            </ul>

            <h3 className="text-ios-headline text-white font-semibold mb-2">Experience Level</h3>
            <p className="text-ios-callout text-white/80">
              Most candidates have 2-4 years of electrical installation experience and are working towards
              completing their NVQ Level 3 qualification.
            </p>
          </div>
          <div>
            <h3 className="text-ios-headline text-white font-semibold mb-3">Essential Requirements</h3>
            <ul className="space-y-2 text-ios-callout text-white/80 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Level 3 Electrical Installation Diploma</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>18th Edition Wiring Regulations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Inspection & Testing qualification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Hands-on installation experience</span>
              </li>
            </ul>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-3">
              <p className="text-ios-footnote text-elec-yellow font-semibold mb-1">Before You Book</p>
              <p className="text-ios-callout text-white/80">
                Ensure you're confident with practical installation work, testing procedures,
                and can work independently to professional standards.
              </p>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Preparation Guide */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Target className="h-5 w-5" />
          How to Prepare
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          Success in AM2 comes from thorough preparation. Here's your roadmap to assessment readiness:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3">Technical Skills</h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Practice conduit bending techniques</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Master SWA cable terminations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Refresh cable calculation methods</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Practice testing sequences</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3">Knowledge Review</h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Study BS 7671 key sections</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Review protective device selection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Understand earthing systems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Know inspection schedules</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3">Practical Prep</h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Complete mock assessments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Time yourself on installations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Practice fault-finding scenarios</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Perfect your test procedures</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
          <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Recommended Preparation Time</h4>
          <p className="text-ios-callout text-white/80">
            Allow 3-6 months of focused preparation, including 40-60 hours of additional practice beyond your regular work.
            Many training centres offer AM2 preparation courses which can significantly boost your confidence.
          </p>
        </div>
      </AM2ContentCard>

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
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Why It Matters for Your Career
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          Passing AM2 transforms your career prospects and opens doors that remain closed to unqualified electricians.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-ios-headline text-white font-semibold mb-3">Immediate Impact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-ios-body text-white font-medium">ECS Gold Card</span>
                  <p className="text-ios-callout text-white/70">Access to construction sites nationwide</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-ios-body text-white font-medium">JIB Recognition</span>
                  <p className="text-ios-callout text-white/70">Industry-wide acceptance of your skills</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-ios-body text-white font-medium">Insurance Benefits</span>
                  <p className="text-ios-callout text-white/70">Lower rates for qualified tradespeople</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-ios-headline text-white font-semibold mb-3">Long-term Opportunities</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-ios-body text-white font-medium">Self-Employment</span>
                  <p className="text-ios-callout text-white/70">Start your own electrical business</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-ios-body text-white font-medium">Management Roles</span>
                  <p className="text-ios-callout text-white/70">Progress to supervisory positions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-ios-body text-white font-medium">Specialist Sectors</span>
                  <p className="text-ios-callout text-white/70">Access high-value commercial projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-ios-headline text-white font-semibold mb-3">Salary Impact</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-ios-title-3 text-elec-yellow font-bold">£28-32k</div>
              <div className="text-ios-footnote text-white/70">Newly Qualified</div>
            </div>
            <div>
              <div className="text-ios-title-3 text-elec-yellow font-bold">£35-42k</div>
              <div className="text-ios-footnote text-white/70">3-5 Years Experience</div>
            </div>
            <div>
              <div className="text-ios-title-3 text-elec-yellow font-bold">£45-55k</div>
              <div className="text-ios-footnote text-white/70">Senior/Specialist</div>
            </div>
            <div>
              <div className="text-ios-title-3 text-elec-yellow font-bold">£60k+</div>
              <div className="text-ios-footnote text-white/70">Self-Employed</div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Common Challenges */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Common Challenges & How to Overcome Them
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          Understanding common pitfalls helps you prepare more effectively and avoid typical mistakes.
        </p>

        <div className="space-y-3 mb-4">
          <AM2CriticalWarning title="Time Management Issues">
            <p className="text-ios-callout text-white/80 mb-2">
              Many candidates struggle to complete all tasks within the allocated timeframe.
            </p>
            <p className="text-ios-callout text-white/90">
              <strong>Solution:</strong> Practice timed installations, create a personal checklist, and prioritise safety-critical tasks first.
            </p>
          </AM2CriticalWarning>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Testing Procedure Errors</h4>
            <p className="text-ios-callout text-white/80 mb-2">
              Incorrect testing sequence or missed tests are common failure points.
            </p>
            <p className="text-ios-callout text-white/90">
              <strong>Solution:</strong> Memorise the BS 7671 testing sequence and practice until it becomes automatic.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Documentation Quality</h4>
            <p className="text-ios-callout text-white/80 mb-2">
              Poor handwriting, incomplete certificates, or calculation errors can cost marks.
            </p>
            <p className="text-ios-callout text-white/90">
              <strong>Solution:</strong> Practice certificate completion and double-check all calculations and entries.
            </p>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
          <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Success Tips</h4>
          <ul className="text-ios-callout text-white/80 space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Arrive early and familiarise yourself with the workspace</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Read all instructions thoroughly before starting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Maintain consistent safety practices throughout</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Ask assessors for clarification if instructions are unclear</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Keep your workspace organised and tools maintained</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Leave time for final checks and documentation review</span>
            </li>
          </ul>
        </div>
      </AM2ContentCard>

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
      <Quiz
        questions={quizQuestions}
        title="AM2 Understanding Quiz"
      />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        prevHref=".."
        prevLabel="Back to Module"
        nextHref="../section2"
        nextLabel="Continue to Section 2"
        currentSection={1}
        totalSections={4}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module1Section1;
