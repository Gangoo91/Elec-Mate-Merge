import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the recommended maximum duration for a toolbox talk?",
    options: [
      "30-45 minutes",
      "5-15 minutes",
      "1-2 hours",
      "All day"
    ],
    correctIndex: 1,
    explanation: "Toolbox talks should be short and focused, typically 5-15 minutes. This keeps attention high and allows workers to get back to productive work quickly while still receiving important safety information."
  },
  {
    id: "check-2",
    question: "When must a site induction be completed?",
    options: [
      "Within the first week of work",
      "Before any work begins on site",
      "After the first task is completed",
      "Only if requested by the worker"
    ],
    correctIndex: 1,
    explanation: "Site inductions must be completed BEFORE any work begins on site. This is a legal requirement under CDM Regulations and ensures workers know site-specific hazards and emergency procedures before they are at risk."
  },
  {
    id: "check-3",
    question: "What should you do if you notice someone on site who hasn't been inducted?",
    options: [
      "Assume someone else has dealt with it",
      "Let them continue if they look experienced",
      "Stop them from working and inform the site supervisor",
      "Give them a quick verbal briefing yourself"
    ],
    correctIndex: 2,
    explanation: "Anyone without proper induction must be stopped from working until they complete the induction. Inform the site supervisor immediately. This protects both the uninducted person and others on site."
  },
  {
    id: "check-4",
    question: "What is the main purpose of recording toolbox talk attendance?",
    options: [
      "To check who is late to work",
      "To provide evidence of safety communication and track training",
      "To calculate overtime payments",
      "To monitor productivity"
    ],
    correctIndex: 1,
    explanation: "Recording attendance provides evidence that safety information has been communicated. This is important for legal compliance, demonstrating due diligence, tracking who needs refresher training, and investigating any future incidents."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is a 'toolbox talk'?",
    options: [
      "A formal training course lasting several days",
      "A short, focused safety briefing on a specific topic",
      "A discussion about tool prices and availability",
      "A meeting to discuss project schedules"
    ],
    correctAnswer: 1,
    explanation: "A toolbox talk is a short (typically 5-15 minute), focused safety briefing covering a specific topic relevant to the work being carried out. They are informal but effective ways to communicate safety messages."
  },
  {
    id: 2,
    question: "How often should toolbox talks typically be conducted on an active construction site?",
    options: [
      "Once a year",
      "Once a month",
      "Weekly or more frequently, depending on risks",
      "Only after accidents"
    ],
    correctAnswer: 2,
    explanation: "On active construction sites, toolbox talks are typically held weekly or more frequently. The frequency should reflect the changing nature of work, new hazards introduced, and any incidents or near misses that occur."
  },
  {
    id: 3,
    question: "Under the CDM Regulations 2015, who is responsible for ensuring workers receive site inductions?",
    options: [
      "The individual workers themselves",
      "The principal contractor",
      "The client only",
      "The local council"
    ],
    correctAnswer: 1,
    explanation: "The principal contractor is responsible for ensuring all workers (including subcontractors) receive appropriate site inductions before starting work. This is a key duty under CDM Regulations 2015."
  },
  {
    id: 4,
    question: "Which of the following should be included in a site induction?",
    options: [
      "The company's share price",
      "Site rules, emergency procedures, and specific hazards",
      "Workers' home addresses",
      "Historical information about the site"
    ],
    correctAnswer: 1,
    explanation: "Site inductions must cover practical safety information including site rules, emergency procedures (fire points, first aid, assembly points), specific hazards on site, welfare facilities, and reporting procedures."
  },
  {
    id: 5,
    question: "When should a toolbox talk topic be selected?",
    options: [
      "Based on what's easiest to present",
      "Based on relevant hazards, upcoming work, or recent incidents",
      "Randomly from a list",
      "Only topics required by law"
    ],
    correctAnswer: 1,
    explanation: "Toolbox talk topics should be relevant to the work being done, address hazards workers will face, respond to recent incidents or near misses, and reflect seasonal or environmental factors."
  },
  {
    id: 6,
    question: "What is the best way to deliver a toolbox talk?",
    options: [
      "Read directly from a script without eye contact",
      "Use interactive discussion, demonstrations, and encourage questions",
      "Send written documents and assume everyone reads them",
      "Use technical jargon to sound professional"
    ],
    correctAnswer: 1,
    explanation: "Effective toolbox talks are interactive - use demonstrations where possible, encourage questions and discussion, use plain language, and check understanding. This engages workers and helps information stick."
  },
  {
    id: 7,
    question: "What should happen if a visitor needs to enter a construction site?",
    options: [
      "They can go anywhere as long as someone accompanies them",
      "They must receive a visitor induction covering basic safety and site rules",
      "They don't need any induction if the visit is short",
      "Visitors are never allowed on construction sites"
    ],
    correctAnswer: 1,
    explanation: "Visitors must receive a basic induction covering essential safety information, emergency procedures, and any areas they are restricted from. They should typically be escorted and wear appropriate PPE."
  },
  {
    id: 8,
    question: "Why is it important to refresh or repeat toolbox talks on the same topic?",
    options: [
      "Because workers forget over time",
      "To fill time on quiet days",
      "It's a legal requirement to repeat every talk",
      "Because management enjoys giving talks"
    ],
    correctAnswer: 0,
    explanation: "Safety messages are forgotten over time - this is human nature. Refreshing key topics reinforces the message, especially before high-risk activities. Repetition improves retention and maintains safety awareness."
  },
  {
    id: 9,
    question: "What is the purpose of the emergency procedures section in a site induction?",
    options: [
      "To frighten workers about dangers",
      "To ensure workers know what to do if an emergency occurs",
      "To meet a legal minimum only",
      "To show that the site is dangerous"
    ],
    correctAnswer: 1,
    explanation: "The emergency procedures section ensures every worker knows: evacuation routes, assembly points, alarm sounds, fire extinguisher locations, first aid facilities, and who to contact. This knowledge saves lives in emergencies."
  },
  {
    id: 10,
    question: "An electrician moves to a different area of a large site to work on a different phase of the project. What should happen?",
    options: [
      "No action needed - they've already been inducted",
      "They should receive a specific briefing on hazards in the new area",
      "They can rely on their experience",
      "Another full induction is required"
    ],
    correctAnswer: 1,
    explanation: "When moving to a different area with different hazards, workers should receive an additional briefing on hazards specific to that area. The original induction covered general site information, but each area may have unique risks."
  },
  {
    id: 11,
    question: "What documentation should be kept for toolbox talks?",
    options: [
      "No documentation is required",
      "Topic, date, presenter, attendees, and key points covered",
      "Only the topic discussed",
      "Only signatures if someone is injured later"
    ],
    correctAnswer: 1,
    explanation: "Proper documentation includes: date and time, topic covered, key points discussed, name of presenter, attendee signatures or names, and any questions raised. This provides evidence of safety communication."
  },
  {
    id: 12,
    question: "What makes a toolbox talk most effective for electricians specifically?",
    options: [
      "Using only written handouts",
      "Relating the topic directly to electrical work with specific examples",
      "Making it as long as possible",
      "Avoiding practical demonstrations"
    ],
    correctAnswer: 1,
    explanation: "Toolbox talks are most effective when they relate directly to the workers' trade. For electricians, this means using electrical examples, discussing electrical hazards specifically, and demonstrating relevant safe practices."
  }
];

const faqs = [
  {
    question: "Can I deliver a toolbox talk as an apprentice?",
    answer: "Yes, with appropriate supervision and preparation. Delivering toolbox talks is excellent experience and demonstrates safety leadership. Work with your supervisor to prepare the content, practice beforehand, and have a qualified person available to answer questions you may not be able to address. Many companies encourage apprentices to present talks as part of their development."
  },
  {
    question: "What if workers don't pay attention during toolbox talks?",
    answer: "Make talks engaging by using demonstrations, asking questions, and relating content to their specific work. Keep talks short (under 15 minutes). Vary your delivery style and involve the audience. If individuals persistently don't engage, speak to them privately - disengagement may indicate deeper concerns about safety culture."
  },
  {
    question: "Do I need a new induction for every site I work on?",
    answer: "Yes. Every site has different hazards, emergency procedures, welfare facilities, and rules. A site induction from one location does not cover another. You need a new induction for each site, even sites belonging to the same company. This is a legal requirement, not optional."
  },
  {
    question: "How long should an induction take?",
    answer: "Site inductions typically take 30 minutes to 2 hours depending on site complexity. Large construction sites with many hazards require longer inductions than smaller domestic projects. The key is that all essential information is covered properly, not rushing to save time."
  },
  {
    question: "What's the difference between a toolbox talk and a method statement briefing?",
    answer: "A toolbox talk is a general safety briefing on a topic relevant to the workforce. A method statement briefing is specific to a particular task, explaining exactly how that task will be completed safely. Method statement briefings are typically given to those directly involved in that task before work begins."
  },
  {
    question: "Can toolbox talks be done online or must they be in person?",
    answer: "While face-to-face delivery is generally most effective (allows demonstrations, questions, and reading body language), online toolbox talks became common during COVID-19. They can work well for office-based workers or when supported by good materials. However, practical demonstrations and site-specific talks usually work better in person."
  }
];

const Level3Module1Section5_3 = () => {
  useSEO(
    "5.3 Toolbox Talks and Site Inductions - Level 3 Health & Safety",
    "Delivering effective safety briefings, site induction requirements, and communication best practices for UK electrical workers"
  );

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Section Header */}
      <div className="sticky top-0 z-30 w-full bg-elec-yellow shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-3 px-4 sm:px-6 py-3">
          <Link
            to="/apprentice-courses/level-3-health-safety/module-1/section-5"
            className="text-black hover:underline font-semibold text-sm flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </Link>
          <span className="text-black/50">/</span>
          <span className="font-bold text-black text-lg">5.3 Toolbox Talks & Site Inductions</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-gray-200">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white">
            Toolbox Talks and Site Inductions
          </h1>
          <p className="text-lg text-gray-300">
            Effective methods for communicating safety information and ensuring workers are prepared for site-specific hazards.
          </p>
        </header>

        {/* Quick Summary Box */}
        <div className="bg-[#222] border-l-4 border-elec-yellow rounded p-5 mb-8">
          <h2 className="text-lg font-bold flex items-center gap-2 text-elec-yellow mb-2">
            <Zap className="h-5 w-5" /> Quick Summary
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>Toolbox talks are short (5-15 min), focused safety briefings on specific topics</li>
            <li>Site inductions must be completed BEFORE any work begins</li>
            <li>Inductions cover site rules, hazards, emergency procedures, and welfare</li>
            <li>CDM 2015 requires principal contractors to ensure all workers are inducted</li>
            <li>Both talks and inductions must be documented with attendance records</li>
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-[#282828] rounded-lg p-5 mb-8">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" /> Learning Outcomes
          </h2>
          <p className="text-gray-300 mb-3">By the end of this section, you will be able to:</p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">1.</span>
              <span>Explain the purpose and format of toolbox talks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">2.</span>
              <span>Describe legal requirements for site inductions under CDM 2015</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">3.</span>
              <span>Identify key content that should be covered in site inductions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">4.</span>
              <span>Apply best practices for delivering effective safety briefings</span>
            </li>
          </ul>
        </div>

        {/* Section 01: Toolbox Talks */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">1</span>
            Toolbox Talks
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-white">Toolbox talks</strong> (also called safety briefings or tailgate meetings) are short, informal meetings held on site to discuss specific safety topics. They're a cornerstone of effective safety communication.
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Characteristics of Effective Toolbox Talks:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Short:</strong> 5-15 minutes maximum</li>
                    <li><strong>Focused:</strong> One topic per talk</li>
                    <li><strong>Relevant:</strong> Related to current work</li>
                    <li><strong>Interactive:</strong> Questions encouraged</li>
                  </ul>
                </div>
                <div>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Practical:</strong> Include demonstrations</li>
                    <li><strong>Documented:</strong> Attendance recorded</li>
                    <li><strong>Regular:</strong> Weekly or more often</li>
                    <li><strong>Accessible:</strong> Plain language used</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">When to Conduct Toolbox Talks:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>At the start of the shift/week:</strong> Sets safety expectations</li>
              <li><strong>Before new activities:</strong> Prepares workers for new hazards</li>
              <li><strong>After incidents or near misses:</strong> Shares lessons learned</li>
              <li><strong>When hazards change:</strong> Weather, site conditions, new equipment</li>
              <li><strong>Seasonal reminders:</strong> Heat stress in summer, ice in winter</li>
            </ul>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Toolbox Talk Topics for Electricians:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <ul className="list-disc list-inside space-y-1">
                  <li>Safe isolation procedures</li>
                  <li>Test equipment inspection (GS38)</li>
                  <li>Working at height safely</li>
                  <li>Cable handling and storage</li>
                  <li>Lock-out/tag-out procedures</li>
                  <li>Arc flash awareness</li>
                </ul>
                <ul className="list-disc list-inside space-y-1">
                  <li>Manual handling of distribution boards</li>
                  <li>Working in confined spaces</li>
                  <li>Asbestos awareness</li>
                  <li>Hand tool safety</li>
                  <li>PPE selection and care</li>
                  <li>Emergency procedures</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-elec-yellow mb-2">Why Toolbox Talks Matter</p>
              <p className="text-sm">Research shows that regular safety communication significantly reduces accident rates. Toolbox talks keep safety "front of mind" - when workers are reminded about hazards and controls, they're more likely to work safely.</p>
            </div>
          </div>
        </section>

        {/* InlineCheck 1 */}
        <div className="my-8">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 02: Site Inductions */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">2</span>
            Site Inductions
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              A <strong className="text-white">site induction</strong> is a mandatory briefing given to all workers before they start work on a construction site. Under the CDM Regulations 2015, the principal contractor must ensure all workers receive appropriate information, instruction, and training.
            </p>

            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-red-400 mb-2">Legal Requirement</p>
              <p className="text-sm">No one should undertake any work on a construction site unless they have received a site induction covering health and safety information. This is not optional - it is a legal requirement under CDM 2015.</p>
            </div>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Site Induction Must Cover:</h4>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-elec-yellow">1. Site-Specific Hazards</p>
                  <p className="text-sm">What dangers exist on this particular site - underground services, asbestos locations, live services, overhead lines, confined spaces, etc.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">2. Emergency Procedures</p>
                  <p className="text-sm">Fire alarm sounds, evacuation routes, assembly points, first aid locations and first aiders, accident reporting procedures.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">3. Site Rules</p>
                  <p className="text-sm">PPE requirements, smoking areas, prohibited areas, speed limits, permit requirements, working hours.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">4. Welfare Facilities</p>
                  <p className="text-sm">Location of toilets, rest areas, drying rooms, drinking water, canteen facilities.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">5. Reporting Procedures</p>
                  <p className="text-sm">Who to report to, how to report hazards, signing in/out procedures, near-miss reporting.</p>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Types of Induction:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Company induction:</strong> General company policies (often done once at employment)</li>
              <li><strong>Site induction:</strong> Site-specific information (required for EVERY new site)</li>
              <li><strong>Area induction:</strong> Specific briefing for different areas of a large site</li>
              <li><strong>Visitor induction:</strong> Abbreviated version for short-term visitors</li>
            </ul>

            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-blue-400 mb-2">CSCS Cards and Inductions</p>
              <p className="text-sm">Having a CSCS (Construction Skills Certification Scheme) card does not exempt you from site inductions. Your CSCS card confirms your qualifications and health & safety awareness, but every site has unique hazards that only a site-specific induction can cover.</p>
            </div>
          </div>
        </section>

        {/* InlineCheck 2 */}
        <div className="my-8">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 03: Delivering Effective Briefings */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">3</span>
            Delivering Effective Briefings
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Whether delivering a toolbox talk or contributing to inductions, how you communicate safety information is as important as what you communicate. Poorly delivered briefings fail to engage workers and waste everyone's time.
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Best Practices for Delivery:</h4>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-elec-yellow">Preparation</p>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                    <li>Know your topic thoroughly</li>
                    <li>Prepare any visual aids or demonstrations</li>
                    <li>Choose an appropriate location (away from noise, distractions)</li>
                    <li>Time it when workers are alert, not at end of shift</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Engagement</p>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                    <li>Make eye contact with the group</li>
                    <li>Ask questions - don't just lecture</li>
                    <li>Use real examples from site or industry</li>
                    <li>Encourage workers to share experiences</li>
                    <li>Demonstrate practical points where possible</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Communication</p>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                    <li>Use plain language - avoid jargon</li>
                    <li>Speak clearly and at appropriate volume</li>
                    <li>Keep it focused - one main message</li>
                    <li>Summarise key points at the end</li>
                    <li>Check understanding before finishing</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Engaging Different Learning Styles:</h4>
            <p>People learn differently. Effective briefings use multiple approaches:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>Visual:</strong> Pictures, diagrams, demonstrations, videos</li>
              <li><strong>Auditory:</strong> Clear verbal explanations, discussions</li>
              <li><strong>Kinesthetic:</strong> Hands-on practice, handling equipment</li>
              <li><strong>Reading:</strong> Written materials to take away</li>
            </ul>

            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-elec-yellow mb-2">The 'Why' is Important</p>
              <p className="text-sm">Don't just tell workers what to do - explain WHY. "Wear hearing protection" is less effective than "Wear hearing protection because the noise levels here exceed 85 dB, which can cause permanent hearing damage that you won't notice until it's too late." Understanding the reason makes compliance more likely.</p>
            </div>
          </div>
        </section>

        {/* InlineCheck 3 */}
        <div className="my-8">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Section 04: Documentation and Records */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4 flex items-center gap-2">
            <span className="bg-elec-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-base font-bold">4</span>
            Documentation and Records
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Proper documentation of toolbox talks and inductions is essential for legal compliance, demonstrating due diligence, and tracking training across the workforce.
            </p>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">What Records Should Include:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-elec-yellow">Toolbox Talk Records:</p>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                    <li>Date and time</li>
                    <li>Topic covered</li>
                    <li>Key points discussed</li>
                    <li>Name of presenter</li>
                    <li>Attendee names/signatures</li>
                    <li>Questions raised</li>
                    <li>Actions identified</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Induction Records:</p>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                    <li>Worker's name and company</li>
                    <li>Date of induction</li>
                    <li>Topics covered</li>
                    <li>Name of inductor</li>
                    <li>Worker's signature</li>
                    <li>CSCS card number</li>
                    <li>Trade/occupation</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="font-semibold text-white mt-6 mb-2">Why Records Matter:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Legal defence:</strong> Demonstrates you provided information and training</li>
              <li><strong>HSE inspections:</strong> Inspectors will ask to see training records</li>
              <li><strong>Accident investigation:</strong> Shows what training the injured person received</li>
              <li><strong>Gap analysis:</strong> Identifies who needs refresher training</li>
              <li><strong>Audit trails:</strong> Required for safety management system certification</li>
            </ul>

            <div className="bg-[#282828] border border-gray-700 rounded-lg p-5 my-4">
              <h4 className="font-semibold text-white mb-3">Record Retention:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>Induction records:</strong> Keep for duration of employment + 3 years minimum</li>
                <li><strong>Toolbox talk records:</strong> Keep for at least 3 years</li>
                <li><strong>Where accidents occurred:</strong> Keep related records for at least 6 years (statute of limitations)</li>
                <li><strong>Apprentices/young workers:</strong> Keep until they reach 21 + 3 years</li>
              </ul>
            </div>

            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 my-4">
              <p className="font-semibold text-blue-400 mb-2">Electronic vs Paper Records</p>
              <p className="text-sm">Either format is acceptable. Electronic systems offer easier searching, backup, and analysis. Paper records are often used on site initially, then digitised. Whatever system you use, ensure it is organised, secure, and accessible when needed.</p>
            </div>
          </div>
        </section>

        {/* InlineCheck 4 */}
        <div className="my-8">
          <InlineCheck
            id={quickCheckQuestions[3].id}
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />
        </div>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4">Practical Guidance for Electricians</h2>
          <div className="bg-[#282828] border border-gray-700 rounded-lg p-5">
            <h4 className="font-semibold text-white mb-3">Simple Toolbox Talk Template:</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">1.</span>
                <span><strong>Introduction (1 min):</strong> State the topic and why it's relevant today</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">2.</span>
                <span><strong>Key Points (5-8 min):</strong> Cover 3-5 main points with examples</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">3.</span>
                <span><strong>Demonstration (2-3 min):</strong> Show correct practice where applicable</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">4.</span>
                <span><strong>Questions (2-3 min):</strong> Invite and answer questions</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">5.</span>
                <span><strong>Summary (1 min):</strong> Recap the key takeaways</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">6.</span>
                <span><strong>Sign-off:</strong> Get attendance signatures</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-[#282828] border border-gray-700 rounded-lg p-5">
                <h4 className="font-semibold text-white mb-2">Q: {faq.question}</h4>
                <p className="text-gray-300 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-elec-yellow mb-4">Quick Reference</h2>
          <div className="bg-[#282828] border border-gray-700 rounded-lg p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <p className="font-semibold text-white mb-2">Toolbox Talk Essentials:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Duration: 5-15 minutes</li>
                  <li>Frequency: Weekly or more</li>
                  <li>Content: Single topic, relevant</li>
                  <li>Style: Interactive, practical</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Site Induction Must Cover:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Site-specific hazards</li>
                  <li>Emergency procedures</li>
                  <li>Site rules and PPE</li>
                  <li>Welfare facilities</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Section 5.3 Knowledge Check"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Link to="/apprentice-courses/level-3-health-safety/module-1/section-5/5-2">
            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2 bg-[#333] border-gray-700 hover:bg-gray-700 text-white">
              <ArrowLeft className="h-4 w-4" /> Previous: 5.2 Near-Miss Reporting
            </Button>
          </Link>
          <Link to="/apprentice-courses/level-3-health-safety/module-1/section-5/5-4">
            <Button className="w-full sm:w-auto flex items-center gap-2 bg-elec-yellow hover:bg-elec-yellow text-black font-semibold">
              Next: 5.4 Safety Audits <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default Level3Module1Section5_3;
