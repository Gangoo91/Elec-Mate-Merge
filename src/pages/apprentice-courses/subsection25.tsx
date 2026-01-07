import { ArrowLeft, CheckCircle, Heart, AlertTriangle, Phone, FileText, Shield, Users, AlertCircle, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "First Aid Requirements on Site - Level 2 Electrical Course";
const DESCRIPTION = "Know what first aid is required on electrical sites, how to respond to incidents, and how to record and report properly.";

const Section6_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What law governs first aid at work in the UK?",
      options: [
        "Health and Safety at Work Act 1974",
        "Health and Safety (First-Aid) Regulations 1981",
        "Construction (Design and Management) Regulations 2015",
        "Management of Health and Safety at Work Regulations 1999"
      ],
      correctAnswer: 1,
      explanation: "The Health and Safety (First-Aid) Regulations 1981 specifically govern first aid provision in UK workplaces, requiring adequate equipment and trained personnel."
    },
    {
      id: 2,
      question: "Name three items that must be in a first aid kit.",
      options: [
        "Paracetamol, bandages, and thermometer",
        "Sterile dressings, bandages, and disposable gloves",
        "Antiseptic cream, scissors, and plasters",
        "Aspirin, eye wash, and burn gel"
      ],
      correctAnswer: 1,
      explanation: "Standard first aid kits must contain sterile dressings, bandages, disposable gloves, eye wash solution, and other basic items. Medications are not allowed."
    },
    {
      id: 3,
      question: "Who should you inform after giving first aid?",
      options: [
        "The injured person's family only",
        "The HSE inspector",
        "The site supervisor or first aider",
        "The local GP surgery"
      ],
      correctAnswer: 2,
      explanation: "After giving first aid, you must inform the site supervisor or trained first aider, and record the incident in the accident book."
    },
    {
      id: 4,
      question: "Are painkillers allowed in first aid boxes?",
      options: ["Yes", "No"],
      correctAnswer: 1,
      explanation: "No. Medications like paracetamol or antiseptic creams are not allowed in standard workplace first aid kits due to allergy risks and legal liability."
    },
    {
      id: 5,
      question: "True or False: Every site must have a trained first aider.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Small, low-risk sites may only need an 'appointed person' to manage first aid. Larger or high-risk sites require trained first aiders."
    },
    {
      id: 6,
      question: "What are the immediate steps after finding someone who has received an electric shock?",
      options: [
        "Touch them to check if they're conscious",
        "Pour water on them to cool them down",
        "Isolate the power source, then check breathing",
        "Give them mouth-to-mouth immediately"
      ],
      correctAnswer: 2,
      explanation: "Never touch someone still in contact with electricity. First isolate the power source, then check for breathing and consciousness before providing aid."
    },
    {
      id: 7,
      question: "What's the difference between an appointed person and a trained first aider?",
      options: [
        "There's no difference - they're the same role",
        "Appointed person needs less training but can only manage equipment and call 999",
        "Trained first aider is only for large sites",
        "Appointed person can give medications"
      ],
      correctAnswer: 1,
      explanation: "An appointed person manages first aid equipment and calls emergency services but needs no formal training. A trained first aider can perform CPR, treat injuries, and requires HSE-approved training."
    },
    {
      id: 8,
      question: "When calling 999, which information is most critical to provide first?",
      options: [
        "Your name and company",
        "The injured person's medical history",
        "Location and nature of emergency",
        "Insurance details"
      ],
      correctAnswer: 2,
      explanation: "Location and nature of emergency are critical - emergency services need to know where to go and what to expect. Personal details come later in the call."
    },
    {
      id: 9,
      question: "Which item is NOT allowed in a workplace first aid kit?",
      options: [
        "Paracetamol",
        "Sterile dressings",
        "Disposable gloves",
        "Bandages"
      ],
      correctAnswer: 0,
      explanation: "Medications like paracetamol are not allowed in standard workplace first-aid kits due to allergy risks and liability issues."
    },
    {
      id: 10,
      question: "How long must accident book records be kept?",
      options: [
        "1 year",
        "2 years", 
        "3 years",
        "Permanently"
      ],
      correctAnswer: 2,
      explanation: "Accident book records must be kept for 3 years from the date of the last entry, as required by UK health and safety regulations."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" asChild className="text-white hover:text-white">
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
          <Heart className="h-8 w-8 text-elec-yellow mt-2" />
          <div className="flex-1">
            <div className="inline-flex items-center px-3 py-1 bg-elec-yellow text-black rounded-full text-sm font-semibold mb-4">
              Module 6.3
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              First Aid Requirements on Site
            </h1>
            <p className="text-xl text-white">
              Understanding legal first aid provision and emergency response procedures
            </p>
          </div>
        </div>

        {/* Introduction */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">In 30 seconds</h2>
              <p className="text-white text-sm leading-relaxed">
                UK law requires adequate first aid provision on all sites. This means proper equipment, 
                trained personnel (appointed person or first aider), clear signage, and emergency communication. 
                For electrical workers, knowing how to respond safely to electric shock and arc burns is critical.
              </p>
            </div>
            <div className="bg-card border border-elec-yellow/30 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-2 text-sm">Spot it / Use it</h3>
              <div className="space-y-2 text-white text-sm">
                <p><span className="text-elec-yellow">Spot:</span> First aid box location, trained first aider names, emergency contact numbers</p>
                <p><span className="text-elec-yellow">Use:</span> Isolate power first, assess safety, provide aid within your training, call 999 when needed</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Learning Outcomes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Understand legal first aid requirements on electrical sites</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Identify site provision: kits, appointed person vs trained first aider</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Respond to incidents safely with electrical-specific knowledge</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-white">Record incidents and know when RIDDOR applies</span>
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
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">First Aid Overview and Legal Duty</h2>
            </div>
          </div>
          <div className="ml-12 space-y-4">
            <p className="text-white">
              The Health and Safety (First-Aid) Regulations 1981 place a legal duty on employers to provide adequate 
              and appropriate first aid equipment, facilities, and personnel to ensure employees receive immediate attention if injured or taken ill at work.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">It covers:</h3>
                <ul className="text-white text-sm space-y-1">
                  <li>• Adequate first aid equipment</li>
                  <li>• Trained personnel availability</li>
                  <li>• Clear information and signage</li>
                  <li>• Emergency communication access</li>
                </ul>
              </div>
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">The aim is to:</h3>
                <ul className="text-white text-sm space-y-1">
                  <li>• Preserve life in emergencies</li>
                  <li>• Prevent conditions worsening</li>
                  <li>• Promote recovery from injury/illness</li>
                  <li>• Ensure legal compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Check */}
        <InlineCheck
          id="first-aid-check-1"
          question="Which item is NOT allowed in a workplace first aid kit?"
          options={["Paracetamol", "Sterile dressings", "Disposable gloves", "Bandages"]}
          correctIndex={0}
          explanation="Medications like paracetamol are not allowed in standard workplace first-aid kits due to allergy risks and liability issues."
        />

        {/* Section 2 */}
        <div className="mb-8 border-l-4 border-orange-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
              2
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Site Provision: Kits, People, Locations</h2>
            </div>
          </div>
          <div className="ml-12 space-y-4">
            <p className="text-white">
              The level of first aid provision depends on site size, risk level, and nature of work. 
              Electrical sites often require enhanced provision due to specific hazards like electric shock and arc flash.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Essentials for all sites:</h3>
                <ul className="text-white text-sm space-y-1">
                  <li>• First aid box (clean, accessible, marked)</li>
                  <li>• Appointed person or trained first aider</li>
                  <li>• Clear signage showing locations/names</li>
                  <li>• Emergency communication access</li>
                  <li>• Accident recording arrangements</li>
                </ul>
              </div>
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Appointed person vs First aider:</h3>
                <ul className="text-white text-sm space-y-1">
                  <li>• <strong>Appointed:</strong> Manages equipment, calls 999</li>
                  <li>• <strong>Appointed:</strong> No formal training required (low risk)</li>
                  <li>• <strong>First aider:</strong> Can perform CPR, treat injuries</li>
                  <li>• <strong>First aider:</strong> Needs 3-day HSE training</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="mb-8 border-l-4 border-indigo-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
              3
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Emergency Response Steps (Electrical-Aware)</h2>
            </div>
          </div>
          <div className="ml-12 space-y-4">
            <p className="text-white">
              Electrical emergencies require specific safety considerations. Never touch someone still in contact with electricity. 
              Follow the DR ABC approach: Danger, Response, Airway, Breathing, Circulation.
            </p>
            
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Emergency response sequence:</h3>
              <ol className="text-white text-sm space-y-1 list-decimal list-inside">
                <li>Assess danger - isolate power source if safe to do so</li>
                <li>Check response - speak loudly, tap shoulders</li>
                <li>Open airway - tilt head back, lift chin</li>
                <li>Check breathing - look, listen, feel for 10 seconds</li>
                <li>Check circulation - look for signs of life</li>
                <li>Call 999 and begin CPR if trained and necessary</li>
              </ol>
            </div>
            
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">When calling 999, provide:</h3>
              <ul className="text-white text-sm space-y-1">
                <li>• <strong>Location:</strong> Full address with access details</li>
                <li>• <strong>Nature:</strong> What happened, how many injured</li>
                <li>• <strong>Condition:</strong> Conscious/unconscious, breathing status</li>
                <li>• <strong>Actions:</strong> First aid given, hazards isolated</li>
                <li>• <strong>Contact:</strong> Your name and callback number</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="mb-8 border-l-4 border-elec-yellow p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-elec-yellow text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
              4
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Common Electrical Injuries and Treatment Basics</h2>
            </div>
          </div>
          <div className="ml-12 space-y-4">
            <p className="text-white">
              Electrical work presents specific injury risks. Quick, appropriate response can prevent serious complications 
              and save lives. Always prioritise safety and call emergency services for serious incidents.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-muted/50 border border-border rounded-lg p-3">
                  <h4 className="font-semibold text-white text-sm mb-1">Electric Shock:</h4>
                  <p className="text-white text-xs">Isolate power, check breathing, begin CPR if trained, call 999</p>
                </div>
                <div className="bg-muted/50 border border-border rounded-lg p-3">
                  <h4 className="font-semibold text-white text-sm mb-1">Arc Burns:</h4>
                  <p className="text-white text-xs">Cool with water 20min, sterile dressing, no creams, seek medical attention</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-muted/50 border border-border rounded-lg p-3">
                  <h4 className="font-semibold text-white text-sm mb-1">Tool Cuts:</h4>
                  <p className="text-white text-xs">Direct pressure, elevate limb, sterile dressing, don't remove embedded objects</p>
                </div>
                <div className="bg-muted/50 border border-border rounded-lg p-3">
                  <h4 className="font-semibold text-white text-sm mb-1">Falls:</h4>
                  <p className="text-white text-xs">Don't move victim, check spinal injury signs, maintain airway, call 999</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="mb-8 border-l-4 border-slate-500 p-6 bg-card rounded-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-slate-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
              5
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Records, Reporting, and Good Practice</h2>
            </div>
          </div>
          <div className="ml-12 space-y-4">
            <p className="text-white">
              Proper record-keeping is legally required and helps identify trends to prevent future incidents. 
              All workplace accidents must be recorded in the accident book (BI 510).
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Accident book essentials:</h3>
                <ul className="text-white text-sm space-y-1">
                  <li>• Date, time, and location of incident</li>
                  <li>• Details of injured person and witnesses</li>
                  <li>• Nature of injury and treatment given</li>
                  <li>• Signed by person making entry</li>
                  <li>• Records kept for 3 years minimum</li>
                  <li>• Stored securely (confidentiality)</li>
                </ul>
              </div>
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Good practice includes:</h3>
                <ul className="text-white text-sm space-y-1">
                  <li>• Regular first aid kit checks and restocking</li>
                  <li>• Clear, visible signage for kits and personnel</li>
                  <li>• Practice emergency procedures</li>
                  <li>• Keep first aider training current</li>
                  <li>• Know when RIDDOR reporting applies</li>
                  <li>• Review incidents to prevent recurrence</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Real World Scenario */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Real World Scenario</h2>
          <div className="space-y-4">
            <div className="bg-card border border-amber-400/30 rounded-lg p-4">
              <h3 className="text-amber-400 font-semibold mb-2">Arc Flash Incident During Panel Work</h3>
              <p className="text-white text-sm">
                An electrician suffered arc burns to hands and face while working on a distribution panel. 
                A colleague witnessed the flash and immediately responded.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">What happened next:</h4>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex gap-2">
                  <span className="text-elec-yellow">•</span>
                  Colleague immediately isolated the power supply to ensure scene safety
                </li>
                <li className="flex gap-2">
                  <span className="text-elec-yellow">•</span>
                  Checked victim was conscious and breathing normally
                </li>
                <li className="flex gap-2">
                  <span className="text-elec-yellow">•</span>
                  Cooled burns with clean running water for 20 minutes
                </li>
                <li className="flex gap-2">
                  <span className="text-elec-yellow">•</span>
                  Called 999 providing location, nature of injury, and condition
                </li>
                <li className="flex gap-2">
                  <span className="text-elec-yellow">•</span>
                  Applied sterile dressings from first aid kit while waiting for ambulance
                </li>
                <li className="flex gap-2">
                  <span className="text-elec-yellow">•</span>
                  Incident recorded in accident book and reported under RIDDOR (over-7-day injury)
                </li>
              </ul>
            </div>
            
            <div className="bg-card border border-green-400/30 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-1">Why this mattered</h4>
              <p className="text-white text-sm">
                Quick isolation prevented further injury. Immediate cooling reduced burn severity. 
                Proper first aid and quick medical response prevented complications and scarring. 
                The incident led to improved arc flash PPE procedures site-wide.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-elec-yellow pl-4">
              <h3 className="font-semibold text-white mb-1">Do we always need a trained first aider or is an appointed person enough?</h3>
              <p className="text-white text-sm">
                It depends on site size and risk. Small, low-risk sites may only need an appointed person. 
                Larger sites or those with higher risks (like electrical work) typically require trained first aiders. 
                HSE guidance recommends at least one first aider for 50+ employees or high-risk environments.
              </p>
            </div>
            
            <div className="border-l-4 border-elec-yellow pl-4">
              <h3 className="font-semibold text-white mb-1">Are medications allowed in first aid kits?</h3>
              <p className="text-white text-sm">
                No. Standard workplace first aid kits cannot contain medications like paracetamol, aspirin, 
                or antiseptic creams due to allergy risks and legal liability. Only basic items like dressings, 
                bandages, and eye wash are permitted.
              </p>
            </div>
            
            <div className="border-l-4 border-elec-yellow pl-4">
              <h3 className="font-semibold text-white mb-1">How often should first aid kits be checked and restocked?</h3>
              <p className="text-white text-sm">
                Monthly checks are recommended to ensure contents are in date, undamaged, and complete. 
                After any use, kits should be immediately restocked. The appointed person or first aider 
                is typically responsible for maintenance.
              </p>
            </div>
            
            <div className="border-l-4 border-elec-yellow pl-4">
              <h3 className="font-semibold text-white mb-1">Where should first aid information be displayed?</h3>
              <p className="text-white text-sm">
                Clear signage must show the location of first aid equipment and the names of trained personnel. 
                This should be at main entrances, mess rooms, and key work areas. Emergency contact numbers 
                should also be prominently displayed.
              </p>
            </div>
            
            <div className="border-l-4 border-elec-yellow pl-4">
              <h3 className="font-semibold text-white mb-1">Who can use an AED (defibrillator) on site? Is training required?</h3>
              <p className="text-white text-sm">
                Modern AEDs are designed for use by anyone - they provide voice prompts and won't deliver 
                a shock unless needed. However, training greatly improves confidence and effectiveness. 
                Many first aid courses now include AED training.
              </p>
            </div>
            
            <div className="border-l-4 border-elec-yellow pl-4">
              <h3 className="font-semibold text-white mb-1">How do first aid records relate to RIDDOR reporting?</h3>
              <p className="text-white text-sm">
                All incidents must be recorded in the accident book. RIDDOR applies to serious injuries, 
                dangerous occurrences, and over-7-day injuries. First aid records provide the detail needed 
                for RIDDOR reports and help identify trends to prevent future incidents.
              </p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Summary</h2>
          <div className="space-y-4">
            <p className="text-white">
              Effective first aid provision saves lives and reduces injury severity. Every electrical worker should know their 
              site's arrangements, understand electrical-specific risks, and be prepared to respond safely in emergencies.
            </p>
            
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h3 className="text-elec-yellow font-semibold mb-3">Key Takeaways</h3>
              <ul className="space-y-2 text-white text-sm">
                <li className="flex gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Know your site's first aid arrangements - where kits are and who's trained
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Electrical emergencies require power isolation before providing aid
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Quick, appropriate response prevents complications and saves lives
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  All incidents must be recorded and serious ones reported under RIDDOR
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />
      </div>
    </div>
  );
};

export default Section6_3;