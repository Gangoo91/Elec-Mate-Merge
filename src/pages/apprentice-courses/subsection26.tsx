import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Emergency Procedures and Evacuation Plans - Level 2 Electrical Course";
const DESCRIPTION = "Know what to do when alarms sound, how to evacuate safely, roles and responsibilities, and post-incident actions.";

const Section6_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Name three types of site emergencies.",
      options: [
        "Equipment failure, weather changes, lunch breaks",
        "Fire, electric shock, and gas leaks",
        "Tool maintenance, shift changes, meetings",
        "Material delivery, visitor arrivals, inspections"
      ],
      correctAnswer: 1,
      explanation: "Common site emergencies include fire, electric shock, gas leaks, explosions, structural failure, serious injury, and chemical spills."
    },
    {
      id: 2,
      question: "What is the first step when an evacuation alarm sounds?",
      options: [
        "Collect your tools and equipment",
        "Stop work immediately",
        "Call your supervisor",
        "Find out what the emergency is"
      ],
      correctAnswer: 1,
      explanation: "When an evacuation alarm sounds, stop work immediately. Do not waste time investigating or collecting items - evacuate using the nearest safe exit."
    },
    {
      id: 3,
      question: "Where should workers go after evacuating?",
      options: [
        "To their cars in the car park",
        "To the nearest pub or café",
        "To the designated assembly point",
        "Home immediately"
      ],
      correctAnswer: 2,
      explanation: "After evacuating, all workers must report to the designated assembly point where a roll call will be conducted to ensure everyone is accounted for."
    },
    {
      id: 4,
      question: "What item should you never collect during evacuation?",
      options: [
        "Your safety helmet",
        "Your mobile phone",
        "Personal tools or belongings",
        "Your high-vis vest"
      ],
      correctAnswer: 2,
      explanation: "Never delay evacuation to collect tools, personal items, or equipment. Lives are more important than possessions - these can be replaced."
    },
    {
      id: 5,
      question: "True or False: You should wait for permission before leaving during an emergency.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. When an emergency alarm sounds, evacuate immediately without waiting for permission. Every second counts in an emergency situation."
    },
    {
      id: 6,
      question: "What is your immediate action when the evacuation alarm sounds?",
      options: [
        "Collect important documents",
        "Stop work and evacuate immediately",
        "Call your supervisor for instructions",
        "Wait for an announcement"
      ],
      correctAnswer: 1,
      explanation: "When the evacuation alarm sounds, stop work immediately and evacuate using the nearest safe exit. Do not delay for any reason."
    },
    {
      id: 7,
      question: "What is the main purpose of an assembly point?",
      options: [
        "To wait for transport home",
        "To have a meeting about the emergency",
        "To conduct a roll call and ensure everyone is safe",
        "To distribute emergency equipment"
      ],
      correctAnswer: 2,
      explanation: "Assembly points are designated areas where everyone gathers so that a roll call can be conducted to ensure all personnel are accounted for and safe."
    },
    {
      id: 8,
      question: "Who is typically responsible for conducting the roll call at the assembly point?",
      options: [
        "The first person to arrive",
        "Fire wardens or designated marshals",
        "The site security guard",
        "Emergency services when they arrive"
      ],
      correctAnswer: 1,
      explanation: "Fire wardens or designated emergency marshals are responsible for conducting roll calls and reporting headcounts to the incident commander."
    },
    {
      id: 9,
      question: "In an electrical incident with a casualty, what must you do BEFORE providing first aid?",
      options: [
        "Call 999 first",
        "Move the casualty to safety",
        "Isolate the electrical supply if safe to do so",
        "Start CPR immediately"
      ],
      correctAnswer: 2,
      explanation: "Before providing first aid to an electrical incident casualty, you must isolate the electrical supply if it's safe to do so. Never touch the casualty while they may still be energised."
    },
    {
      id: 10,
      question: "How long must emergency procedure records and accident book entries be kept?",
      options: [
        "1 year",
        "2 years", 
        "3 years",
        "5 years"
      ],
      correctAnswer: 2,
      explanation: "Emergency procedure records, accident book entries, and related documentation must be kept for at least 3 years as required by health and safety regulations."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" asChild className="text-gray-300 hover:text-white">
            <Link to=".." className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title block */}
        <div className="flex items-start gap-4 mb-8">
          <Shield className="h-8 w-8 text-emerald-400 mt-2" />
          <div className="flex-1">
            <div className="inline-flex items-center px-3 py-1 bg-emerald-500 text-black rounded-full text-sm font-semibold mb-4">
              Module 6.4
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Emergency Procedures and Evacuation Plans
            </h1>
            <p className="text-xl text-gray-300">
              Understanding legal first aid provision and emergency response procedures
            </p>
          </div>
        </div>

        {/* Introduction */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">In 30 seconds</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Site emergencies like fire, electric shock, and gas leaks can happen without warning. When they do, lives depend on following emergency procedures immediately. This covers alarm responses, evacuation routes, key roles (fire wardens, first aiders), and post-incident actions including roll calls and reporting.
              </p>
            </div>
            <div className="bg-card border border-emerald-500/30 rounded-lg p-4">
              <h3 className="text-emerald-400 font-semibold mb-2 text-sm">Spot it / Use it</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <p><span className="text-emerald-400">Spot:</span> Alarm types, exit signage, assembly point, fire wardens/first aiders</p>
                <p><span className="text-emerald-400">Use:</span> Stop work, evacuate via nearest exit, no lifts/no belongings, go to assembly point, wait for roll call</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Learning Outcomes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">Understand emergency procedure content and legal expectations</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">Follow evacuation routes and roles (fire wardens, roll call)</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">Respond correctly to fire, electrical, and gas incidents</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">Complete post-incident actions (roll call, preserve scene, reporting/RIDDOR)</span>
            </div>
          </div>
        </Card>

        {/* Section 1 */}
        <div className="mb-8 border-l-4 border-red-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
              1
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Emergency Procedures Overview & Legal Purpose</h2>
            </div>
          </div>
          <div className="ml-12 space-y-4">
            <p className="text-gray-300">
              Emergency procedures are written plans that specify actions to take during site emergencies. They exist to protect life, minimise harm, ensure swift professional help, and maintain accountability for all personnel.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">It covers:</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Alarm raising procedures</li>
                  <li>• Emergency contacts and communication</li>
                  <li>• Evacuation routes and assembly points</li>
                  <li>• Safety equipment locations</li>
                  <li>• Personnel roles and responsibilities</li>
                  <li>• Isolation procedures for utilities</li>
                </ul>
              </div>
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">The aim is to:</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Protect life above all else</li>
                  <li>• Prevent incidents from escalating</li>
                  <li>• Ensure orderly evacuation if needed</li>
                  <li>• Account for all personnel quickly</li>
                  <li>• Enable swift emergency response</li>
                  <li>• Minimise harm and property damage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Check after Section 1 */}
        <InlineCheck 
          id="emergency-check-1"
          question="What is your first action when the evacuation alarm sounds?"
          options={["Collect your tools", "Stop work and evacuate", "Call your supervisor", "Wait for permission"]}
          correctIndex={1}
          explanation="When the evacuation alarm sounds, stop work immediately and evacuate using the nearest safe exit. Do not delay for any reason - lives depend on immediate action."
        />

        {/* Section 2 */}
        <div className="mb-8 border-l-4 border-orange-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Evacuation Planning & Roles</h2>
              <p className="text-gray-300">
                Effective evacuation requires clear routes, visible signage, designated assembly points, and trained personnel with specific roles. Personal Emergency Evacuation Plans (PEEPs) may be needed for individuals with mobility limitations.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Responsibilities</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• <strong>Fire wardens:</strong> Lead evacuation, check areas</li>
                <li>• <strong>Marshals:</strong> Guide people to assembly points</li>
                <li>• <strong>First aiders:</strong> Assist injured during evacuation</li>
                <li>• <strong>Supervisors:</strong> Account for their teams</li>
              </ul>
            </div>
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Essentials</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Clear, illuminated exit signs</li>
                <li>• Unobstructed escape routes</li>
                <li>• Designated assembly points</li>
                <li>• Regular evacuation drills</li>
                <li>• Visitor sign-in/out systems</li>
              </ul>
            </div>
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Never do</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Use lifts during evacuation</li>
                <li>• Collect personal belongings</li>
                <li>• Re-enter the building</li>
                <li>• Leave the assembly point early</li>
                <li>• Block escape routes with materials</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="mb-8 border-l-4 border-indigo-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Incident Response Basics (Electrical/Fire/Gas)</h2>
              <p className="text-gray-300">
                Different emergency types require specific response procedures. Knowing how to respond safely to fire, electrical incidents, and gas leaks can save lives and prevent further escalation.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Fire Response</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Raise the alarm immediately</li>
                <li>• Evacuate the area quickly</li>
                <li>• Only use extinguishers if trained and safe exit available</li>
                <li>• Never turn back to fight large fires</li>
                <li>• Call 999 from a safe location</li>
              </ul>
            </div>
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Electric Shock/Arc</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Isolate power if safe to do so</li>
                <li>• Never touch casualty until isolated</li>
                <li>• Use insulated tools if available</li>
                <li>• Provide first aid once safe</li>
                <li>• Call 999 for serious injuries</li>
              </ul>
            </div>
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Gas Leak</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Stop all ignition sources immediately</li>
                <li>• Ventilate area if safe to do so</li>
                <li>• Evacuate to upwind location</li>
                <li>• Call gas emergency services</li>
                <li>• Do not use electrical switches</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="mb-8 border-l-4 border-emerald-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              4
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Alarms, Communication & Drills</h2>
              <p className="text-gray-300">
                Effective emergency response relies on clear alarm systems, reliable communication methods, accurate muster procedures, and regular practice through drills that help identify areas for improvement.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Alarm Types & Communication</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• <strong>Fire alarms:</strong> Continuous siren or bells</li>
                <li>• <strong>Gas alarms:</strong> Often different tone/pattern from fire</li>
                <li>• <strong>Tannoy/Radio:</strong> Clear instructions and updates</li>
                <li>• <strong>Hand signals:</strong> When noise levels prevent verbal communication</li>
                <li>• <strong>Site-specific signals:</strong> Air horns, klaxons for large sites</li>
              </ul>
            </div>
            
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Muster & Roll Call</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• All personnel report to designated assembly points</li>
                <li>• Fire wardens conduct headcounts using visitor books/sign-in sheets</li>
                <li>• Contractor and visitor accountability systems</li>
                <li>• Missing persons reported immediately to incident commander</li>
                <li>• No one leaves assembly point without authorisation</li>
              </ul>
            </div>
            
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Drills & Continuous Improvement</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Regular evacuation drills (typically quarterly)</li>
                <li>• Timing and observation of evacuation effectiveness</li>
                <li>• Identifying and addressing procedural gaps</li>
                <li>• Updating plans based on site changes and lessons learned</li>
                <li>• Training records for all personnel and visitors</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="mb-8 border-l-4 border-slate-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-slate-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              5
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Records, Reporting, and Good Practice</h2>
              <p className="text-gray-300">
                Post-incident actions ensure accountability, preserve evidence for investigation, maintain legal compliance, and help prevent similar occurrences. Proper record-keeping and reporting are essential legal requirements.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Immediate Post-Incident Actions</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Complete roll call to confirm all personnel accounted for</li>
                <li>• Preserve the incident scene where safe to do so</li>
                <li>• Notify site management and relevant authorities</li>
                <li>• Record details in the accident book within 24 hours</li>
                <li>• Consider RIDDOR reporting requirements if criteria are met</li>
              </ul>
            </div>
            
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Legal Record-Keeping (3 Years Minimum)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Accident book entries and witness statements</li>
                <li>• Emergency drill records and timing data</li>
                <li>• Training records for emergency procedures</li>
                <li>• Equipment inspection and maintenance logs</li>
                <li>• RIDDOR submissions and follow-up correspondence</li>
              </ul>
            </div>
            
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h3 className="font-semibold text-white mb-3">Good Practice Checklist</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Regular review and update of emergency procedures</li>
                <li>• Clear signage and unobstructed escape routes</li>
                <li>• Induction training for all new personnel and visitors</li>
                <li>• Emergency equipment checks and maintenance schedules</li>
                <li>• Coordination with emergency services for site familiarisation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real World Scenario */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Real World Scenario</h2>
          <div className="bg-card border border-amber-400/30 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-white mb-3">Scenario: Electrical Panel Smoke Detection</h3>
            <p className="text-gray-300 mb-4">
              During routine electrical work on a commercial site, a worker noticed smoke coming from a main distribution panel. The fire alarm was triggered, and emergency procedures were activated immediately.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <h4 className="font-semibold text-white">What happened next:</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• All electrical work stopped immediately across the site</li>
              <li>• Workers evacuated using the nearest marked exits</li>
              <li>• Fire wardens conducted systematic area checks</li>
              <li>• Everyone assembled at the designated muster point</li>
              <li>• Roll call confirmed all 47 personnel were accounted for</li>
              <li>• Authorised person isolated main electrical supply</li>
              <li>• Fire service attended and declared the area safe</li>
              <li>• Incident was recorded in the accident book</li>
              <li>• RIDDOR was considered but not required (no injuries, minor incident)</li>
            </ul>
          </div>

          <div className="bg-card border border-green-400/30 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Why this mattered:</h4>
            <p className="text-gray-300 text-sm">
              Quick evacuation prevented potential injuries from electrical fire or explosion. Clear role assignments ensured systematic area checking and accurate roll call. Proper electrical isolation by a competent person prevented escalation. The incident demonstrated that well-practiced procedures save lives when every second counts.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="font-semibold text-white mb-2">Can I grab my personal items during evacuation?</h3>
              <p className="text-gray-300 text-sm">No. Never delay evacuation to collect personal belongings, tools, or equipment. Lives are more important than possessions, and these can be replaced. Every second counts in an emergency.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="font-semibold text-white mb-2">Can I use the lift during evacuation?</h3>
              <p className="text-gray-300 text-sm">Never use lifts during emergency evacuation. Power failures can trap people, and lifts may automatically return to ground floor in fire mode. Always use stairs, even if it takes longer.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="font-semibold text-white mb-2">When can we re-enter the building?</h3>
              <p className="text-gray-300 text-sm">Only when the incident commander (usually fire service or senior site management) gives the "all clear." Never re-enter before official authorisation, even if the alarm stops.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="font-semibold text-white mb-2">How are visitors accounted for during evacuation?</h3>
              <p className="text-gray-300 text-sm">Sites must maintain visitor sign-in/out books or electronic systems. Fire wardens use these to account for visitors during roll call. Visitors should be inducted on emergency procedures upon arrival.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="font-semibold text-white mb-2">What if someone is missing at roll call?</h3>
              <p className="text-gray-300 text-sm">Report missing persons immediately to the incident commander. Provide last known location and any relevant medical information. Never re-enter to search - this is a job for emergency services with proper equipment.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="font-semibold text-white mb-2">Do evacuation drills count as real training records?</h3>
              <p className="text-gray-300 text-sm">Yes, but separate formal training should also be provided. Drills are practical exercises, while training covers procedures, responsibilities, and emergency response theory. Both are important for compliance.</p>
            </div>
          </div>
        </Card>

        <Quiz questions={quizQuestions} />
      </div>
    </div>
  );
};

export default Section6_4;