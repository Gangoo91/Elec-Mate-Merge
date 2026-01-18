import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "What is PAT Testing and Why It's Required - PAT Testing Module 1";
const DESCRIPTION = "Learn what PAT testing involves, why it's essential for workplace safety, and understand the comprehensive scope of portable appliance testing across different sectors.";

const quickCheckQuestions = [
  {
    id: "pat-definition",
    question: "What does PAT stand for?",
    options: [
      "Power Application Testing",
      "Portable Appliance Testing",
      "Protective Apparatus Testing",
      "Precision Analysis Testing"
    ],
    correctIndex: 1,
    explanation: "PAT stands for Portable Appliance Testing - the routine inspection and testing of electrical appliances to ensure they are safe to use."
  },
  {
    id: "pat-purpose",
    question: "What is the primary purpose of PAT testing?",
    options: [
      "To reduce electricity bills",
      "To prevent electrical accidents and ensure equipment safety",
      "To extend equipment warranty",
      "To comply with insurance only"
    ],
    correctIndex: 1,
    explanation: "The primary purpose of PAT testing is to prevent electrical accidents by identifying faulty appliances before they can cause harm to users."
  },
  {
    id: "pat-approach",
    question: "What does a comprehensive PAT testing programme include?",
    options: [
      "Only visual inspection",
      "Only electrical testing",
      "Both visual inspection and electrical testing",
      "Just checking the equipment works"
    ],
    correctIndex: 2,
    explanation: "PAT testing involves both thorough visual inspection and electrical testing. Visual checks identify obvious damage, while electrical tests verify safety parameters."
  },
  {
    id: "testing-frequency",
    question: "How often should PAT testing typically be carried out?",
    options: [
      "Once per year for all equipment",
      "Depends on equipment type, usage, and environment",
      "Only when equipment appears damaged",
      "Every five years regardless of usage"
    ],
    correctIndex: 1,
    explanation: "PAT testing frequency depends on factors including equipment class, usage intensity, environmental conditions, and user competence - ranging from daily checks to several years."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does PAT stand for in electrical safety?",
    options: [
      "Portable Appliance Testing",
      "Power Application Testing",
      "Protective Appliance Testing",
      "Precision Apparatus Testing"
    ],
    correctAnswer: 0,
    explanation: "PAT stands for Portable Appliance Testing - the routine inspection and testing of electrical appliances to ensure they are safe to use."
  },
  {
    id: 2,
    question: "Why is PAT testing considered essential for workplace safety?",
    options: [
      "It's required by insurance companies only",
      "To prevent electrical accidents and ensure equipment safety",
      "To reduce electricity bills",
      "It's only needed for new equipment"
    ],
    correctAnswer: 1,
    explanation: "PAT testing is essential to prevent electrical accidents, fires, and electrocution by identifying faulty appliances before they can cause harm to users."
  },
  {
    id: 3,
    question: "Which sectors typically require comprehensive PAT testing programmes?",
    options: [
      "Private homes only",
      "Construction sites only",
      "Offices, construction sites, schools, and healthcare facilities",
      "Only government buildings"
    ],
    correctAnswer: 2,
    explanation: "PAT testing is required across multiple sectors including offices, construction sites, schools, healthcare, and any workplace using portable electrical equipment."
  },
  {
    id: 4,
    question: "What does a comprehensive PAT testing programme include?",
    options: [
      "Only visual inspection",
      "Both visual inspection and electrical testing",
      "Only electrical testing with instruments",
      "Just checking the equipment works"
    ],
    correctAnswer: 1,
    explanation: "PAT testing involves both thorough visual inspection and electrical testing. Visual checks identify obvious damage, while electrical tests verify safety parameters."
  },
  {
    id: 5,
    question: "What are the main types of electrical tests used in PAT testing?",
    options: [
      "Voltage and current testing only",
      "Earth continuity and insulation resistance testing",
      "Power consumption testing only",
      "Frequency response testing"
    ],
    correctAnswer: 1,
    explanation: "The main electrical tests in PAT are earth continuity testing (for Class I appliances) and insulation resistance testing (for all appliance classes)."
  },
  {
    id: 6,
    question: "How often should PAT testing typically be carried out?",
    options: [
      "Once per year for all equipment",
      "Depends on equipment type, usage, and environment",
      "Only when equipment appears damaged",
      "Every five years regardless of usage"
    ],
    correctAnswer: 1,
    explanation: "PAT testing frequency depends on factors including equipment class, usage intensity, environmental conditions, and user competence - ranging from daily checks to several years."
  },
  {
    id: 7,
    question: "What is a key benefit of maintaining detailed PAT testing records?",
    options: [
      "It reduces the need for future testing",
      "Demonstrates due diligence and legal compliance",
      "It's only needed for insurance purposes",
      "Records aren't necessary if equipment passes tests"
    ],
    correctAnswer: 1,
    explanation: "Detailed PAT testing records demonstrate due diligence, prove legal compliance, and provide essential documentation for insurance and regulatory purposes."
  },
  {
    id: 8,
    question: "Which type of equipment failure poses the greatest risk without PAT testing?",
    options: [
      "Cosmetic damage only",
      "Insulation breakdown leading to electric shock",
      "Equipment running slightly slower",
      "Minor cable wear that doesn't affect operation"
    ],
    correctAnswer: 1,
    explanation: "Insulation breakdown poses the greatest risk as it can lead to electric shock, electrocution, and electrical fires - all preventable through proper PAT testing."
  },
  {
    id: 9,
    question: "What environmental factors can accelerate electrical equipment degradation?",
    options: [
      "Only extreme temperatures",
      "Moisture, dust, heat, chemicals, and physical abuse",
      "Just humidity levels",
      "Environmental factors don't affect electrical equipment"
    ],
    correctAnswer: 1,
    explanation: "Multiple environmental factors including moisture, dust, heat, chemical exposure, and physical abuse can accelerate equipment degradation and create safety hazards."
  },
  {
    id: 10,
    question: "What is the primary goal of implementing a PAT testing programme?",
    options: [
      "To meet minimum legal requirements only",
      "To prevent accidents, ensure safety, and demonstrate compliance",
      "To avoid insurance claims",
      "To extend equipment warranty periods"
    ],
    correctAnswer: 1,
    explanation: "The primary goal is comprehensive safety management: preventing accidents, protecting people, ensuring legal compliance, and reducing liability exposure."
  }
];

const faqs = [
  {
    question: "What equipment requires PAT testing?",
    answer: "PAT testing applies to portable electrical equipment that can be moved or connected to different locations. This includes office equipment (computers, printers), kitchen appliances (kettles, microwaves), power tools, extension leads, and any device with a plug that connects to the mains supply."
  },
  {
    question: "Is PAT testing a legal requirement?",
    answer: "While PAT testing isn't explicitly named in UK legislation, it's widely recognised as an effective way to comply with the Electricity at Work Regulations 1989 (EAWR) and PUWER. These laws require employers to maintain electrical equipment in a safe condition."
  },
  {
    question: "How often should equipment be PAT tested?",
    answer: "Testing frequency depends on the equipment type, usage intensity, and environment. Construction site tools may need testing every 3 months, office equipment annually, and IT equipment in controlled environments every 2-4 years. Risk assessment guides frequency."
  },
  {
    question: "Can anyone perform PAT testing?",
    answer: "PAT testing should be carried out by a competent person with appropriate training and understanding of electrical safety. While formal qualifications aren't legally required, proper training ensures accurate testing and correct interpretation of results."
  },
  {
    question: "What happens if equipment fails a PAT test?",
    answer: "Failed equipment must be immediately removed from service and labelled as unsafe. It should either be repaired by a competent person and retested, or disposed of safely. Never allow failed equipment to be used, even temporarily."
  },
  {
    question: "What's the difference between visual inspection and electrical testing?",
    answer: "Visual inspection checks for obvious damage like frayed cables, cracked casings, or damaged plugs. Electrical testing uses specialised equipment to measure earth continuity, insulation resistance, and other safety parameters that aren't visible to the eye."
  }
];

const PATTestingModule1Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What is PAT Testing and Why It's Required
          </h1>
          <p className="text-white/80">
            Understanding the fundamentals of portable appliance testing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>PAT:</strong> Portable Appliance Testing</li>
              <li><strong>Purpose:</strong> Prevent electrical accidents</li>
              <li><strong>Method:</strong> Visual inspection + electrical testing</li>
              <li><strong>Scope:</strong> All portable electrical equipment</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Equipment with plugs, cables, portable devices</li>
              <li><strong>Use:</strong> Systematic safety checks, documentation</li>
              <li><strong>Apply:</strong> Risk-based testing frequencies</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand what PAT testing involves and its comprehensive scope",
              "Recognise why PAT is crucial for safety and compliance",
              "Identify typical use cases and industries requiring PAT",
              "Learn the goals: prevention, compliance, liability reduction",
              "Explain visual inspection vs electrical testing methods",
              "Understand the business case for PAT testing programmes"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: What is PAT Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is PAT Testing?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PAT testing is a systematic safety methodology for electrical appliances that could be moved or connected to different locations.
              It combines systematic visual inspection with precise electrical measurements to identify potential hazards before they cause harm.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key characteristics of PAT testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Systematic approach:</strong> Regular, scheduled testing using standardised procedures</li>
                <li><strong>Preventive measure:</strong> Identifies faults before they cause accidents</li>
                <li><strong>Documentation:</strong> Creates audit trail for compliance evidence</li>
                <li><strong>Risk management:</strong> Forms part of comprehensive electrical safety strategy</li>
                <li><strong>Legal compliance:</strong> Demonstrates due diligence under EAWR and PUWER</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment requiring PAT testing:</p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm text-white">
                <div>
                  <p className="font-medium mb-1">Office &amp; IT Equipment</p>
                  <ul className="space-y-0.5 text-white/90">
                    <li>Desktop computers and laptops</li>
                    <li>Printers and scanners</li>
                    <li>Monitors and displays</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Catering &amp; Kitchen</p>
                  <ul className="space-y-0.5 text-white/90">
                    <li>Kettles and coffee machines</li>
                    <li>Microwaves and toasters</li>
                    <li>Refrigerators and freezers</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Tools &amp; Equipment</p>
                  <ul className="space-y-0.5 text-white/90">
                    <li>Power tools and drills</li>
                    <li>Extension leads and RCDs</li>
                    <li>Vacuum cleaners</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: The Two-Stage Approach */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Two-Stage PAT Testing Approach
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PAT testing combines two complementary inspection methods to provide comprehensive safety assurance.
              Both stages are essential for thorough equipment assessment.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Stage 1: Visual Inspection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cable and plug condition assessment</li>
                  <li>Housing integrity and damage check</li>
                  <li>Cleanliness and contamination review</li>
                  <li>User modifications identification</li>
                  <li>Environmental suitability evaluation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Stage 2: Electrical Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Earth continuity verification</li>
                  <li>Insulation resistance measurement</li>
                  <li>Touch current testing</li>
                  <li>Functional safety checks</li>
                  <li>Load testing where appropriate</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Visual inspection alone identifies approximately 95% of faults,
              but electrical testing catches hidden dangers that could cause serious harm.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Why PAT Testing is Essential */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Why PAT Testing is Essential
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">Safety Risks Without PAT Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Electric shock from deteriorated insulation</li>
                  <li>Electrical fires from overheating or arcing</li>
                  <li>Equipment failure causing injury</li>
                  <li>Electrocution from earth faults</li>
                  <li>Burns from overheating equipment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Benefits of PAT Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Prevents 95%+ of electrical accidents</li>
                  <li>Reduces fire risk through early detection</li>
                  <li>Demonstrates legal due diligence</li>
                  <li>Protects insurance coverage</li>
                  <li>Extends equipment operational life</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">How electrical faults develop:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Normal wear and tear:</strong> Regular use causes gradual deterioration of cables, plugs, and internal components through thermal cycling and mechanical stress.</li>
                <li><strong>Environmental damage:</strong> Moisture, dust, heat, and chemical exposure accelerate equipment degradation significantly.</li>
                <li><strong>User damage:</strong> Incorrect handling, dropping equipment, and pulling cables cause immediate or progressive damage.</li>
                <li><strong>Manufacturing defects:</strong> Even new equipment may contain latent defects that manifest over time.</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Industries and Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Industries Where PAT Testing is Essential
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Office Environments</p>
                <p className="text-sm text-white mb-1">Computers, printers, desk lamps, kitchen appliances</p>
                <p className="text-xs text-white/80">Typical frequency: Annual testing for most equipment</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Construction Sites</p>
                <p className="text-sm text-white mb-1">Power tools, extension leads, temporary equipment</p>
                <p className="text-xs text-white/80">Typical frequency: 3-monthly testing, daily visual checks</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Educational Facilities</p>
                <p className="text-sm text-white mb-1">Laboratories, workshops, IT equipment</p>
                <p className="text-xs text-white/80">Typical frequency: Annual for IT, 6-monthly for workshop tools</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Healthcare Facilities</p>
                <p className="text-sm text-white mb-1">Medical devices, patient care equipment</p>
                <p className="text-xs text-white/80">Typical frequency: 6-monthly with specialised requirements</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Manufacturing</p>
                <p className="text-sm text-white mb-1">Production equipment, maintenance tools</p>
                <p className="text-xs text-white/80">Typical frequency: 6-monthly for production, 3-monthly for maintenance</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Facilities Management</p>
                <p className="text-sm text-white mb-1">Cleaning equipment, maintenance tools</p>
                <p className="text-xs text-white/80">Typical frequency: 6-monthly for cleaning, 3-monthly for power tools</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 5: The Business Case */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            The Business Case for PAT Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">Direct Cost Savings</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Reduced insurance premiums (up to 15% discount)</li>
                  <li>Prevention of business interruption costs</li>
                  <li>Extended equipment life through early maintenance</li>
                  <li>Avoided regulatory fines and penalties</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Risk Mitigation Value</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Personal injury claim prevention</li>
                  <li>Property damage limitation</li>
                  <li>Reputation protection and brand value</li>
                  <li>Regulatory compliance assurance</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Cost-Benefit Example: 200 Employee Office</p>
              <div className="grid grid-cols-3 gap-4 text-sm text-white">
                <div>
                  <p className="font-medium">Annual PAT Cost</p>
                  <p className="text-elec-yellow">£2,500</p>
                  <p className="text-xs text-white/80">500 items @ £5 each</p>
                </div>
                <div>
                  <p className="font-medium">Potential Incident Cost</p>
                  <p className="text-elec-yellow">£150,000+</p>
                  <p className="text-xs text-white/80">Fines, claims, disruption</p>
                </div>
                <div>
                  <p className="font-medium">ROI Ratio</p>
                  <p className="text-elec-yellow">60:1</p>
                  <p className="text-xs text-white/80">£150k saved per £2.5k</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Setting Up a PAT Programme</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Create a comprehensive equipment register listing all portable appliances</li>
                <li>Assess risk levels for different equipment types and environments</li>
                <li>Establish testing frequencies based on risk assessment</li>
                <li>Ensure testers are competent and properly trained</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Conducting Tests</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always start with thorough visual inspection</li>
                <li>Follow manufacturer guidelines for electrical tests</li>
                <li>Record all results accurately and completely</li>
                <li>Label equipment clearly with test date and result</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Missing equipment</strong> — ensure all portable appliances are included in the register</li>
                <li><strong>Inconsistent testing</strong> — stick to scheduled frequencies</li>
                <li><strong>Poor documentation</strong> — records must be complete and accessible</li>
                <li><strong>Untrained testers</strong> — competence is essential for valid results</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">PAT Testing Basics</p>
                <ul className="space-y-0.5">
                  <li>PAT = Portable Appliance Testing</li>
                  <li>Two stages: visual + electrical</li>
                  <li>Frequency based on risk assessment</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Benefits</p>
                <ul className="space-y-0.5">
                  <li>Prevents electrical accidents</li>
                  <li>Demonstrates legal compliance</li>
                  <li>Protects insurance coverage</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default PATTestingModule1Section1;
