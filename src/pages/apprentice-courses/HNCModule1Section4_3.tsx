import { ArrowLeft, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safety Representatives - HNC Module 1 Section 4.3";
const DESCRIPTION = "Understand the roles, rights and responsibilities of safety representatives, the SRSC Regulations 1977, consultation requirements, and safety committee functions in building services.";

const quickCheckQuestions = [
  {
    id: "safety-rep-appointment",
    question: "Under the SRSC Regulations 1977, who appoints safety representatives in unionised workplaces?",
    options: [
      "The employer",
      "The Health and Safety Executive",
      "A recognised trade union",
      "A vote by all employees"
    ],
    correctIndex: 2,
    explanation: "Under the Safety Representatives and Safety Committees Regulations 1977, safety representatives must be appointed by a recognised trade union, not by the employer. The employer must then consult with these representatives on health and safety matters."
  },
  {
    id: "time-off-training",
    question: "Are safety representatives entitled to paid time off for training?",
    options: [
      "No, training must be done in their own time",
      "Yes, with pay for training approved by the union or agreed with the employer",
      "Only if the employer volunteers to pay",
      "Only for a maximum of one day per year"
    ],
    correctIndex: 1,
    explanation: "Safety representatives are entitled to paid time off during working hours for training approved by their trade union or agreed with the employer. This right is established in the SRSC Regulations 1977 and supported by the ACOP."
  },
  {
    id: "safety-committee-request",
    question: "If safety representatives request a safety committee, how long does the employer have to establish one?",
    options: [
      "7 days",
      "14 days",
      "3 months",
      "There is no time limit"
    ],
    correctIndex: 2,
    explanation: "If at least two safety representatives make a written request for a safety committee, the employer must establish one within 3 months of the request. The employer must consult with the representatives and recognised unions about the committee's composition."
  },
  {
    id: "non-union-consultation",
    question: "In workplaces without recognised trade unions, how must employers consult employees on health and safety?",
    options: [
      "There is no requirement to consult in non-unionised workplaces",
      "Through the Health and Safety Consultation with Employees Regulations 1996",
      "Only through written notices",
      "By consulting with the HSE only"
    ],
    correctIndex: 1,
    explanation: "The Health and Safety (Consultation with Employees) Regulations 1996 require employers to consult employees directly or through elected representatives of employee safety (ROES) in workplaces without recognised trade unions."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary function of a safety representative under the SRSC Regulations 1977?",
    options: [
      "To manage all health and safety on behalf of the employer",
      "To represent employees on health and safety matters and consult with the employer",
      "To enforce health and safety law",
      "To replace the employer's health and safety duties"
    ],
    correctAnswer: 1,
    explanation: "Safety representatives represent employees in consultations with the employer on health and safety matters. They do not manage safety (that remains the employer's duty) or enforce law (that is the HSE's role)."
  },
  {
    id: 2,
    question: "Which of the following is NOT a function of safety representatives under the SRSC Regulations?",
    options: [
      "Investigating potential hazards and dangerous occurrences",
      "Examining causes of workplace accidents",
      "Issuing improvement notices to the employer",
      "Making representations to the employer on health and safety matters"
    ],
    correctAnswer: 2,
    explanation: "Issuing improvement notices is an enforcement power held only by HSE inspectors. Safety representatives can investigate hazards, examine accident causes, and make representations to employers, but they have no enforcement powers."
  },
  {
    id: 3,
    question: "What information is an employer required to provide to safety representatives?",
    options: [
      "All confidential business information",
      "Information necessary for them to fulfil their functions, subject to certain restrictions",
      "Only information about past accidents",
      "No information is legally required"
    ],
    correctAnswer: 1,
    explanation: "Employers must provide information necessary for safety representatives to fulfil their functions. However, there are restrictions - employers need not disclose information that would cause substantial injury to the business, personal health information, or information obtained for legal proceedings."
  },
  {
    id: 4,
    question: "How often should a safety committee typically meet?",
    options: [
      "Once per year",
      "Only after accidents occur",
      "At least quarterly, though more frequently is often beneficial",
      "Daily"
    ],
    correctAnswer: 2,
    explanation: "While not specified in law, HSE guidance suggests safety committees should meet at least quarterly. More frequent meetings may be appropriate in higher-risk industries or during periods of significant change. Meetings should be regular and predictable."
  },
  {
    id: 5,
    question: "What protection do safety representatives have against employer action?",
    options: [
      "No special protection",
      "Protection from dismissal or detriment for performing their safety representative functions",
      "Complete immunity from all employer decisions",
      "Protection only if the union pays their salary"
    ],
    correctAnswer: 1,
    explanation: "Safety representatives have statutory protection against dismissal or being subjected to any detriment for performing their functions in good faith. Dismissal for this reason is automatically unfair. This protection encourages representatives to raise concerns without fear."
  },
  {
    id: 6,
    question: "Under the SRSC Regulations, safety representatives have the right to:",
    options: [
      "Stop production immediately if they believe there is danger",
      "Inspect the workplace at reasonable intervals",
      "Hire and fire workers who breach safety rules",
      "Access the employer's bank accounts"
    ],
    correctAnswer: 1,
    explanation: "Safety representatives have the right to inspect the workplace at least every three months (or more frequently with employer agreement). They cannot unilaterally stop production (though they can advise workers of dangers) and have no hiring/firing powers."
  },
  {
    id: 7,
    question: "What should be included in a safety committee's terms of reference?",
    options: [
      "Only the names of committee members",
      "Objectives, membership, meeting frequency, agenda setting, and reporting arrangements",
      "Just the meeting location",
      "Terms of reference are not necessary"
    ],
    correctAnswer: 1,
    explanation: "Clear terms of reference help committees function effectively. They should cover: the committee's objectives and scope, membership and quorum, meeting frequency, agenda setting process, decision-making process, and how findings/recommendations are reported and actioned."
  },
  {
    id: 8,
    question: "A representative of employee safety (ROES) differs from a union safety representative in that:",
    options: [
      "A ROES has more powers than a union safety representative",
      "A ROES is elected by employees in non-unionised workplaces",
      "A ROES is appointed by the HSE",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "ROES are elected by employees in workplaces without recognised trade unions, under the Health and Safety (Consultation with Employees) Regulations 1996. They have similar but not identical functions to union safety representatives and generally have fewer specific powers."
  },
  {
    id: 9,
    question: "When must employers consult safety representatives?",
    options: [
      "Only when an accident has occurred",
      "Before introducing measures affecting health and safety, when planning training, and on other specified matters",
      "Only annually during formal reviews",
      "Never - consultation is voluntary"
    ],
    correctAnswer: 1,
    explanation: "Consultation must occur in 'good time' on matters including: introduction of measures affecting health and safety, appointment of competent persons, health and safety information, planning of training, and the health and safety consequences of new technology."
  },
  {
    id: 10,
    question: "What happens if an employer refuses to establish a safety committee after a valid request?",
    options: [
      "Nothing - it is only a recommendation",
      "The employer is in breach of the SRSC Regulations and can be prosecuted",
      "The union must pay for a private safety committee",
      "The HSE automatically establishes one"
    ],
    correctAnswer: 1,
    explanation: "Failure to establish a safety committee after a valid written request from at least two safety representatives is a breach of the SRSC Regulations 1977. The employer can be prosecuted and may face improvement notices requiring compliance."
  }
];

const faqs = [
  {
    question: "What training should safety representatives receive?",
    answer: "Safety representatives should receive training appropriate to their role and workplace risks. This typically includes: understanding their functions and rights, relevant health and safety law, hazard identification and risk assessment, accident investigation, inspection techniques, and effective representation skills. TUC-approved courses are available and provide comprehensive preparation."
  },
  {
    question: "Can safety representatives inspect any area of the workplace?",
    answer: "Safety representatives can inspect areas where employees they represent work. The regulations state they must give reasonable notice (unless there is a notifiable accident or dangerous occurrence). Inspections should be at least every three months, though more frequent inspections can be agreed with the employer. The employer should provide reasonable facilities for inspection."
  },
  {
    question: "What is the difference between consultation and negotiation?",
    answer: "Consultation means the employer must listen to safety representatives' views and consider them before making decisions, but the employer makes the final decision. Negotiation implies reaching agreement. For health and safety, the legal requirement is consultation, not negotiation. However, good practice involves genuine two-way discussion with reasonable time for representatives to respond."
  },
  {
    question: "How many safety representatives should a workplace have?",
    answer: "There is no legal formula. The number should be sufficient to allow proper representation of all employees, considering factors like: number of employees, variety and distribution of occupations, type of work and hazards, size and layout of the workplace, and shift patterns. Trade unions typically have their own guidance on appropriate numbers."
  },
  {
    question: "What if the safety committee disagrees with management?",
    answer: "Safety committees are advisory - they recommend, not mandate. If agreement cannot be reached, the employer retains decision-making authority but must be able to justify their decision. Unresolved safety concerns can be raised with the HSE. The committee should have agreed procedures for escalating disagreements."
  },
  {
    question: "Do safety representatives have any powers when serious danger is discovered?",
    answer: "Safety representatives do not have legal power to stop work, but they can advise employees of dangers and represent them if they refuse to work due to danger. Employees have the right to leave a situation of serious and imminent danger. The representative can make urgent representations to management and, if necessary, contact the HSE."
  }
];

const HNCModule1Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section4">
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
            <Users className="h-4 w-4" />
            <span>Module 1.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safety Representatives
          </h1>
          <p className="text-white/80">
            Roles, rights, consultation requirements and safety committees in building services organisations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Safety reps:</strong> Appointed by trade unions to represent employees</li>
              <li className="pl-1"><strong>Key functions:</strong> Investigate hazards, inspect workplace, represent employees</li>
              <li className="pl-1"><strong>Consultation:</strong> Employers must consult in good time on H&S matters</li>
              <li className="pl-1"><strong>Safety committees:</strong> Must be established if requested by two+ reps</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Unite/GMB:</strong> Main unions representing electrical workers</li>
              <li className="pl-1"><strong>Multi-employer sites:</strong> Coordination between contractor reps</li>
              <li className="pl-1"><strong>Construction sites:</strong> Consultation through CDM structures</li>
              <li className="pl-1"><strong>JIB agreement:</strong> Industry-specific consultation arrangements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the appointment and functions of safety representatives under SRSC 1977",
              "Describe the rights and protections afforded to safety representatives",
              "Understand employer consultation duties with safety representatives",
              "Explain the requirements for establishing and running safety committees",
              "Distinguish between union safety reps and representatives of employee safety",
              "Apply consultation principles in building services environments"
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

        {/* Section 1: Safety Representatives */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Safety Representatives and the SRSC Regulations 1977
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Safety Representatives and Safety Committees Regulations 1977 (SRSC Regulations) establish the
              framework for employee representation on health and safety matters in unionised workplaces. Safety
              representatives play a vital role in ensuring worker involvement in workplace safety.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Appointment of Safety Representatives</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Appointed by a <strong>recognised trade union</strong>, not by the employer</li>
                <li className="pl-1">Should have been employed for at least two years or have two years' relevant experience</li>
                <li className="pl-1">The union must notify the employer in writing of the appointment</li>
                <li className="pl-1">Represent the employees of the employer who belong to the union</li>
                <li className="pl-1">Can represent non-union employees if the union and employees agree</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Functions of Safety Representatives</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Investigate hazards</td>
                      <td className="border border-white/10 px-3 py-2">Look into potential hazards and dangerous occurrences</td>
                      <td className="border border-white/10 px-3 py-2">Investigating concerns about isolation procedures</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Investigate complaints</td>
                      <td className="border border-white/10 px-3 py-2">Examine complaints by represented employees</td>
                      <td className="border border-white/10 px-3 py-2">Employee concerns about PPE provision</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Make representations</td>
                      <td className="border border-white/10 px-3 py-2">Raise health and safety matters with employer</td>
                      <td className="border border-white/10 px-3 py-2">Requesting additional welfare facilities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Carry out inspections</td>
                      <td className="border border-white/10 px-3 py-2">Inspect workplace and documents</td>
                      <td className="border border-white/10 px-3 py-2">Quarterly inspection of workshop areas</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Represent employees</td>
                      <td className="border border-white/10 px-3 py-2">Liaise with HSE on employees' behalf</td>
                      <td className="border border-white/10 px-3 py-2">Accompanying HSE inspector on site visit</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Attend safety committee</td>
                      <td className="border border-white/10 px-3 py-2">Participate in safety committee meetings</td>
                      <td className="border border-white/10 px-3 py-2">Presenting inspection findings to committee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">Important Distinction</p>
              <p className="text-sm text-white/90">
                Safety representatives <strong>do not have enforcement powers</strong>. They cannot issue notices
                or require work to stop. Their role is to represent employees, investigate and raise concerns,
                and participate in consultation. Enforcement remains with the HSE. However, their involvement
                significantly improves workplace safety by ensuring employee concerns are heard.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The employer's health and safety duties cannot be transferred to safety representatives - the employer remains responsible.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Rights and Protections */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Rights and Protections of Safety Representatives
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              To enable safety representatives to fulfil their functions effectively, the law grants them
              specific rights and protections. These ensure they can carry out their role without fear of
              employer retaliation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Statutory Rights</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Time Off Rights</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Paid time off for carrying out functions</li>
                    <li className="pl-1">Paid time off for training</li>
                    <li className="pl-1">Time must be 'reasonable' in circumstances</li>
                    <li className="pl-1">Training approved by union or agreed with employer</li>
                    <li className="pl-1">No requirement to make up lost time</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow mb-2">Information Rights</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Information necessary to fulfil functions</li>
                    <li className="pl-1">Access to relevant documents</li>
                    <li className="pl-1">Information from HSE about workplace</li>
                    <li className="pl-1">Records of RIDDOR incidents</li>
                    <li className="pl-1">Certain restrictions apply (see below)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Rights</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Inspect workplace at least every <strong>three months</strong></li>
                <li className="pl-1">More frequent inspections by agreement with employer</li>
                <li className="pl-1">Inspect after notifiable accident or dangerous occurrence</li>
                <li className="pl-1">Inspect when there has been substantial change in work conditions</li>
                <li className="pl-1">Reasonable notice required (except for accidents/dangerous occurrences)</li>
                <li className="pl-1">Employer must provide reasonable facilities and assistance</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Information Restrictions</p>
              <p className="text-sm text-white/90 mb-3">
                Employers are NOT required to disclose:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Information that would cause <strong>substantial injury</strong> to the business</li>
                <li className="pl-1">Information relating to <strong>individuals</strong> without their consent</li>
                <li className="pl-1">Information obtained for <strong>legal proceedings</strong></li>
                <li className="pl-1">Information that would breach <strong>statutory prohibition</strong></li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Protection from Detriment</p>
              <p className="text-sm text-white/90">
                Safety representatives are protected from:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 mt-2">
                <li className="pl-1"><strong>Dismissal</strong> for performing safety representative functions (automatically unfair)</li>
                <li className="pl-1"><strong>Detriment</strong> such as denial of promotion, transfer, or training opportunities</li>
                <li className="pl-1"><strong>Victimisation</strong> for raising legitimate health and safety concerns</li>
              </ul>
              <p className="text-xs text-white/70 mt-2">These protections are provided by the Employment Rights Act 1996.</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Time off:</strong> What is 'reasonable' depends on circumstances including the size of the workplace, the number of employees, and the nature of hazards.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Consultation Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Consultation Requirements and Non-Unionised Workplaces
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Employers have a legal duty to consult with employees on health and safety matters. The mechanism
              for consultation depends on whether the workplace has recognised trade unions. Either way,
              consultation must be meaningful and occur in 'good time'.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Matters Requiring Consultation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Matter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">New measures</td>
                      <td className="border border-white/10 px-3 py-2">Introduction of measures substantially affecting H&S</td>
                      <td className="border border-white/10 px-3 py-2">New safe isolation procedure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Competent persons</td>
                      <td className="border border-white/10 px-3 py-2">Appointment of persons to assist with H&S duties</td>
                      <td className="border border-white/10 px-3 py-2">Appointing a new H&S advisor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">H&S information</td>
                      <td className="border border-white/10 px-3 py-2">Information required to be provided to employees</td>
                      <td className="border border-white/10 px-3 py-2">Risk assessment findings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Training planning</td>
                      <td className="border border-white/10 px-3 py-2">Planning and organisation of H&S training</td>
                      <td className="border border-white/10 px-3 py-2">Annual training programme</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">New technology</td>
                      <td className="border border-white/10 px-3 py-2">H&S consequences of introducing new technology</td>
                      <td className="border border-white/10 px-3 py-2">New testing equipment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effective Consultation Practice</p>
              <p className="text-sm text-white/90 mb-3">
                Consultation means more than just informing representatives of decisions already made:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>In good time:</strong> Before decisions are finalised</li>
                <li className="pl-1"><strong>Provide information:</strong> Sufficient to enable meaningful input</li>
                <li className="pl-1"><strong>Allow response time:</strong> Representatives need time to consider and respond</li>
                <li className="pl-1"><strong>Consider views:</strong> Give proper consideration to views expressed</li>
                <li className="pl-1"><strong>Provide feedback:</strong> Explain how views were taken into account</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Non-Unionised Workplaces - HSCER 1996</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <p className="text-sm font-medium text-blue-400 mb-2">Direct Consultation</p>
                  <p className="text-sm text-white/90">
                    Employers can consult directly with employees individually on health and safety matters.
                    Suitable for small workplaces or where issues affect individuals specifically.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <p className="text-sm font-medium text-purple-400 mb-2">Representatives of Employee Safety (ROES)</p>
                  <p className="text-sm text-white/90">
                    Elected by the employees they represent. Employers must inform employees of names
                    and provide facilities, training, and time off to perform their functions.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">ROES vs Union Safety Representatives</p>
              <p className="text-sm text-white/90">
                ROES have consultation rights under the 1996 Regulations but generally have <strong>fewer
                specific powers</strong> than union safety representatives under the SRSC Regulations.
                For example, they do not have the same detailed inspection rights, and cannot request
                a safety committee. However, they must still be consulted on the same range of matters.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Good practice:</strong> Many employers provide similar rights to ROES as union safety representatives to ensure effective consultation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 4: Safety Committees */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Safety Committees
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Safety committees provide a formal structure for consultation between employers and employee
              representatives on health and safety matters. They are a key mechanism for joint problem-solving
              and continuous improvement of workplace safety.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Establishing a Safety Committee</p>
              <p className="text-sm text-white/90 mb-3">
                Under SRSC Regulations, if <strong>two or more safety representatives</strong> make a written request,
                the employer <strong>must establish a safety committee within 3 months</strong>.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Employer must consult with representatives and unions on composition</li>
                <li className="pl-1">Must post notice of committee establishment in the workplace</li>
                <li className="pl-1">Non-union employers may voluntarily establish committees</li>
                <li className="pl-1">Committee should be of manageable size to be effective</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Committee Functions</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Study of statistics</td>
                      <td className="border border-white/10 px-3 py-2">Review accident, incident, and ill-health trends</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Examination of reports</td>
                      <td className="border border-white/10 px-3 py-2">Consider safety audit and inspection reports</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Monitoring effectiveness</td>
                      <td className="border border-white/10 px-3 py-2">Review adequacy of safety training, communication</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Linking with enforcement</td>
                      <td className="border border-white/10 px-3 py-2">Consider reports/information from inspectors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Making recommendations</td>
                      <td className="border border-white/10 px-3 py-2">Recommend measures to improve health and safety</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Committee Composition</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Management Representatives</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Senior manager with authority to act</li>
                    <li className="pl-1">Line managers from key departments</li>
                    <li className="pl-1">Health and safety professional/advisor</li>
                    <li className="pl-1">Occupational health representative (if applicable)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Employee Representatives</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Union safety representatives</li>
                    <li className="pl-1">Representatives from different work areas</li>
                    <li className="pl-1">Representatives of different occupations/shifts</li>
                    <li className="pl-1">ROES (in non-unionised workplaces)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effective Committee Practice</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Clear terms of reference and objectives</li>
                  <li className="pl-1">Regular meetings (typically quarterly)</li>
                  <li className="pl-1">Published agenda circulated in advance</li>
                  <li className="pl-1">Minutes recording decisions and actions</li>
                </ul>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Action tracking and follow-up</li>
                  <li className="pl-1">Review of progress on previous actions</li>
                  <li className="pl-1">Communication of outcomes to workforce</li>
                  <li className="pl-1">Balanced representation of both sides</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Advisory role:</strong> Safety committees advise and recommend - they do not have power to make binding decisions. The employer retains ultimate responsibility.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Working Effectively with Safety Representatives</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Early involvement:</strong> Consult before decisions, not after</li>
                <li className="pl-1"><strong>Provide resources:</strong> Time, training, facilities for their role</li>
                <li className="pl-1"><strong>Take concerns seriously:</strong> Investigate and respond to issues raised</li>
                <li className="pl-1"><strong>Give feedback:</strong> Explain actions taken and reasons for decisions</li>
                <li className="pl-1"><strong>Joint inspections:</strong> Include representatives in workplace inspections</li>
                <li className="pl-1"><strong>Respect independence:</strong> Representatives serve employees, not management</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Specific Considerations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Multiple employer sites require coordination between contractor representatives</li>
                <li className="pl-1">Mobile workers may need flexible consultation arrangements</li>
                <li className="pl-1">Shift patterns should be considered when scheduling meetings</li>
                <li className="pl-1">Site-specific committees may be needed for large projects</li>
                <li className="pl-1">JIB agreements may provide additional industry-specific arrangements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes in Consultation</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Informing not consulting:</strong> Presenting fait accompli, not seeking input</li>
                <li className="pl-1"><strong>Insufficient time:</strong> Not allowing adequate time for representatives to respond</li>
                <li className="pl-1"><strong>Withholding information:</strong> Not providing information needed for meaningful input</li>
                <li className="pl-1"><strong>Ignoring views:</strong> Not giving proper consideration to concerns raised</li>
                <li className="pl-1"><strong>Committee as talking shop:</strong> Discussions without action or follow-through</li>
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
                <p className="font-medium text-white mb-1">Safety Representative Functions</p>
                <ul className="space-y-0.5">
                  <li>Investigate hazards and dangerous occurrences</li>
                  <li>Investigate employee complaints</li>
                  <li>Make representations to employer</li>
                  <li>Carry out workplace inspections</li>
                  <li>Represent employees to HSE</li>
                  <li>Attend safety committee meetings</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Rights</p>
                <ul className="space-y-0.5">
                  <li>Paid time off for functions and training</li>
                  <li>Inspect workplace every 3 months</li>
                  <li>Access to necessary information</li>
                  <li>Request safety committee (2+ reps)</li>
                  <li>Accompany HSE inspectors</li>
                  <li>Protection from detriment/dismissal</li>
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
            <Link to="../h-n-c-module1-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Competence and Training
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section4-4">
              Next: Ethical Responsibilities
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section4_3;
