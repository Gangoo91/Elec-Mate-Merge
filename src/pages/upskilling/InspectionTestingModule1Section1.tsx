import { ArrowLeft, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';

const TITLE = "Purpose and Legal Requirements - Inspection & Testing";
const DESCRIPTION = "Understand the legal framework for electrical inspection and testing in the UK, including Health and Safety at Work Act, Electricity at Work Regulations, and BS 7671 requirements.";

const quickCheckQuestions = [
  {
    id: "eaw-regulation-4",
    question: "Under which regulation must electrical systems be maintained to prevent danger?",
    options: ["Health and Safety at Work Act Section 2", "Electricity at Work Regulations 1989 Regulation 4", "BS 7671 Regulation 610", "Building Regulations Part P"],
    correctIndex: 1,
    explanation: "Regulation 4 of the Electricity at Work Regulations 1989 requires that all systems shall be constructed, maintained and used so as to prevent danger."
  },
  {
    id: "reasonably-practicable",
    question: "What does 'reasonably practicable' mean in the context of electrical safety?",
    options: ["Do whatever is cheapest", "Do everything possible regardless of cost", "Balance the risk against cost, time and effort", "Only comply if convenient"],
    correctIndex: 2,
    explanation: "Reasonably practicable means weighing the risk against the sacrifice (time, cost, effort) needed to avert it. If the risk outweighs the sacrifice, action must be taken."
  },
  {
    id: "eic-signoff",
    question: "Who can sign off an Electrical Installation Certificate?",
    options: ["Any electrician", "Only a skilled person competent in inspection and testing", "The building owner", "Any contractor on site"],
    correctIndex: 1,
    explanation: "Only a skilled person who is competent in inspection and testing can sign certification. This requires appropriate training, qualifications and experience."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of electrical inspection and testing?",
    options: ["To generate paperwork", "To ensure safety and compliance with regulations", "To increase costs for clients", "To provide work for electricians"],
    correctAnswer: 1,
    explanation: "The primary purpose is to verify that electrical installations are safe for continued use and comply with relevant standards and regulations."
  },
  {
    id: 2,
    question: "The Health and Safety at Work Act 1974 places duties on:",
    options: ["Employers only", "Employees only", "Both employers and employees", "Neither employers nor employees"],
    correctAnswer: 2,
    explanation: "The HASAWA 1974 places duties on both employers (to provide safe systems of work) and employees (to take reasonable care and cooperate)."
  },
  {
    id: 3,
    question: "Which regulation specifically requires electrical systems to be maintained?",
    options: ["HASAWA Section 2", "EAW Regulations 1989 Reg 4", "BS 7671 Part 6", "CDM Regulations"],
    correctAnswer: 1,
    explanation: "Regulation 4 of the Electricity at Work Regulations 1989 specifically requires that all electrical systems shall be maintained so as to prevent danger."
  },
  {
    id: 4,
    question: "What is the legal status of BS 7671?",
    options: ["It is primary legislation", "It is a statutory regulation", "It is a non-statutory standard (code of practice)", "It has no legal standing"],
    correctAnswer: 2,
    explanation: "BS 7671 is a non-statutory document but compliance with it is likely to achieve compliance with statutory requirements."
  },
  {
    id: 5,
    question: "Under EAW Regulations, the term 'absolute' means:",
    options: ["The duty is qualified by cost considerations", "The duty must be complied with regardless of cost", "The duty only applies sometimes", "The duty is optional"],
    correctAnswer: 1,
    explanation: "An absolute duty must be complied with regardless of cost or difficulty. There is no defence of reasonable practicability."
  },
  {
    id: 6,
    question: "What qualification demonstrates competence in inspection and testing?",
    options: ["CSCS card only", "City & Guilds 2391 or equivalent", "First aid certificate", "Manual handling certificate"],
    correctAnswer: 1,
    explanation: "The City & Guilds 2391 (or equivalent like EAL or NICEIC) specifically demonstrates competence in inspection and testing of electrical installations."
  },
  {
    id: 7,
    question: "Maximum penalty for breach of Electricity at Work Regulations causing death:",
    options: ["Fine only", "Up to 2 years imprisonment", "Unlimited fine and/or imprisonment", "Community service"],
    correctAnswer: 2,
    explanation: "Serious breaches of EAW Regulations can result in unlimited fines and imprisonment, especially where death or serious injury occurs."
  },
  {
    id: 8,
    question: "How often should portable appliances typically be tested in an office environment?",
    options: ["Every month", "Every 6 months", "Up to 48 months depending on risk assessment", "Never"],
    correctAnswer: 2,
    explanation: "The IET Code of Practice suggests that IT equipment in offices may only need formal testing up to every 48 months, based on risk assessment."
  },
  {
    id: 9,
    question: "Who enforces the Electricity at Work Regulations?",
    options: ["Local councils", "The Health and Safety Executive (HSE)", "The police", "Trading Standards"],
    correctAnswer: 1,
    explanation: "The Health and Safety Executive (HSE) is responsible for enforcing the Electricity at Work Regulations 1989."
  },
  {
    id: 10,
    question: "A 'skilled person' for electrical work is defined as someone who:",
    options: ["Has worked in the trade for 5+ years", "Has technical knowledge, experience and can prevent danger", "Holds a university degree", "Is registered with a government scheme"],
    correctAnswer: 1,
    explanation: "A skilled person has technical knowledge or experience, and can recognise and avoid dangers in electrical work."
  }
];

const faqs = [
  {
    question: "Is periodic inspection and testing a legal requirement?",
    answer: "While BS 7671 is not statutory, the Electricity at Work Regulations 1989 require that electrical systems are maintained to prevent danger. Periodic inspection is the accepted method of demonstrating compliance with this requirement. For landlords and employers, there are specific legal obligations."
  },
  {
    question: "How often must electrical installations be tested?",
    answer: "BS 7671 and GN3 provide recommended maximum intervals: domestic properties 10 years (5 years for rented), commercial 5 years, industrial 3 years, construction sites 3 months. These are maximum intervals - risk assessment may require more frequent testing."
  },
  {
    question: "Can I test my own work?",
    answer: "Yes, the installer should test their own work as part of initial verification. However, for periodic inspection of existing installations, it's often preferable to have independent testing. Some warranty schemes require third-party verification."
  },
  {
    question: "What happens if I sign a certificate for work I haven't personally inspected?",
    answer: "Signing certification for work you haven't inspected is fraudulent and potentially criminal. You could face prosecution, loss of scheme membership, civil liability, and insurance claims. Only sign for work you have personally verified."
  },
  {
    question: "Do I need to be registered with a competent person scheme to test?",
    answer: "Registration with a competent person scheme (like NICEIC, NAPIT) is not legally required to carry out inspection and testing. However, you must be competent. For notifiable work under Building Regulations Part P, scheme membership or building control notification is required."
  },
  {
    question: "What's the difference between EIC and EICR?",
    answer: "An EIC (Electrical Installation Certificate) is for new installations or additions. An EICR (Electrical Installation Condition Report) is for periodic inspection of existing installations. The EIC confirms compliance; the EICR reports on condition and identifies defects."
  }
];

const referenceItems = [
  { label: "HASAWA 1974", value: "Health & Safety at Work Act" },
  { label: "EAW 1989", value: "Electricity at Work Regulations" },
  { label: "Reg 4 EAW", value: "Systems to prevent danger" },
  { label: "Reg 16 EAW", value: "Competent persons" },
  { label: "BS 7671", value: "IET Wiring Regulations 18th Ed" },
  { label: "GN3", value: "Guidance Note 3 - Inspection & Testing" },
  { label: "Domestic interval", value: "10 years (5 rented)" },
  { label: "Commercial interval", value: "5 years" },
  { label: "Industrial interval", value: "3 years" },
];

const InspectionTestingModule1Section1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-1">
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
            Purpose and Legal Requirements
          </h1>
          <p className="text-white/80">
            Understanding why we inspect and test electrical installations, and the legal framework that governs these requirements in the UK
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Ensure safety, verify compliance, identify defects</li>
              <li><strong>Key Law:</strong> Electricity at Work Regulations 1989</li>
              <li><strong>Standard:</strong> BS 7671 (non-statutory but accepted)</li>
              <li><strong>Penalties:</strong> Unlimited fines, imprisonment possible</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Unsafe installations, deterioration, damage</li>
              <li><strong>Use:</strong> EIC for new work, EICR for existing</li>
              <li><strong>Apply:</strong> Risk assessment determines test intervals</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the legal framework for electrical testing",
              "Explain the purpose of periodic inspection",
              "Identify relevant legislation and regulations",
              "Describe employer and duty holder responsibilities",
              "Understand competence requirements for testers",
              "Explain the consequences of non-compliance"
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

        {/* Section 01: The Purpose of Inspection & Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Purpose of Inspection & Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical inspection and testing is fundamental to ensuring the safety of people and property. Every year in the UK, there are approximately <strong>30 fatalities</strong> and <strong>350,000 injuries</strong> related to electrical accidents in domestic and workplace settings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The core purposes of inspection and testing are:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Safety verification</strong> - Confirming that installations don't pose a risk of electric shock or fire</li>
                <li><strong>Regulatory compliance</strong> - Demonstrating compliance with statutory requirements</li>
                <li><strong>Installation verification</strong> - Confirming work meets BS 7671 requirements</li>
                <li><strong>Defect identification</strong> - Finding deterioration, damage or defects before they cause incidents</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-white/60 mb-2">Key Statistic</p>
              <p className="text-white">
                Around <strong className="text-elec-yellow">20,000 dwelling fires</strong> per year in the UK are caused by electrical faults. Proper inspection and testing can identify many of these risks before they result in fire.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Health and Safety at Work Act 1974 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Health and Safety at Work Act 1974
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The <strong>Health and Safety at Work Act 1974 (HASAWA)</strong> is the primary piece of legislation covering occupational health and safety in Great Britain. It places general duties on employers, employees, and others.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Employer Duties (Section 2)</p>
              <p className="text-sm text-white/90 mb-2">Employers must ensure, so far as is reasonably practicable:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Safe plant and systems of work</li>
                <li>Safe use, handling, storage and transport of articles and substances</li>
                <li>Necessary information, instruction, training and supervision</li>
                <li>Safe workplace with safe access and egress</li>
                <li>Safe working environment with adequate welfare facilities</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Employee Duties (Section 7)</p>
              <p className="text-sm text-white/90 mb-2">Employees must:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Take reasonable care for their own health and safety</li>
                <li>Take reasonable care for the health and safety of others affected by their acts or omissions</li>
                <li>Cooperate with their employer on health and safety matters</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Role of HSE</p>
              <p className="text-sm text-white/90">
                The <strong>Health and Safety Executive (HSE)</strong> is responsible for enforcing health and safety legislation. HSE inspectors have powers to enter premises, investigate, issue improvement and prohibition notices, and prosecute offenders.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Electricity at Work Regulations 1989 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electricity at Work Regulations 1989
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The <strong>Electricity at Work Regulations 1989 (EAW)</strong> are the principal statutory requirements for electrical safety in the workplace. Unlike BS 7671, these are <strong className="text-elec-yellow">legally enforceable</strong>.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 4 - Systems, Work Activities and Protective Equipment</p>
              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <p className="text-white italic text-sm">
                  "All systems shall at all times be of such construction as to prevent, so far as is reasonably practicable, danger."
                </p>
                <p className="text-white italic text-sm mt-2">
                  "All systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger."
                </p>
              </div>
              <p className="text-sm text-white/90 mt-3">
                This regulation is critical for inspection and testing - it establishes the legal requirement for maintenance, which includes periodic inspection and testing.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulation 16 - Competent Persons</p>
              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <p className="text-white italic text-sm">
                  "No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger... unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate."
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Absolute vs Reasonably Practicable</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 font-semibold text-sm mb-2">Absolute Duty</p>
                  <p className="text-white/80 text-sm">Must be complied with regardless of cost or difficulty. No defence available. Example: Regulation 14 - work on live conductors.</p>
                </div>
                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <p className="text-orange-400 font-semibold text-sm mb-2">Reasonably Practicable</p>
                  <p className="text-white/80 text-sm">Allows a balance between risk and cost/effort to avert it. If risk outweighs sacrifice, action must be taken.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: BS 7671 IET Wiring Regulations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            BS 7671 IET Wiring Regulations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>BS 7671</strong> (Requirements for Electrical Installations - IET Wiring Regulations) is the national standard for electrical installation in the UK. The current edition is the <strong className="text-elec-yellow">18th Edition</strong>, with Amendment 3 (A3:2024) being the latest.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Status</p>
              <p className="text-sm text-white/90 mb-2">
                BS 7671 is a <strong>non-statutory standard</strong> - it is not law in itself. However:
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Compliance with BS 7671 is likely to achieve compliance with statutory requirements</li>
                <li>Courts accept BS 7671 as defining good practice</li>
                <li>Building Regulations reference BS 7671</li>
                <li>It forms the basis of electrical competence assessment</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part 6 - Inspection and Testing</p>
              <p className="text-sm text-white/90 mb-2">
                Part 6 of BS 7671 covers initial verification (Chapter 61) and periodic inspection and testing (Chapter 62). Key regulations include:
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2">
                <p className="text-sm"><strong className="text-elec-yellow">Reg 610.1</strong> - Every installation shall be inspected and tested during erection and on completion</p>
                <p className="text-sm"><strong className="text-elec-yellow">Reg 631.1</strong> - Initial verification includes visual inspection followed by testing</p>
                <p className="text-sm"><strong className="text-elec-yellow">Reg 650.1</strong> - Periodic inspection shall reveal if installations are safe for continued use</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Guidance Note 3 (GN3)</p>
              <p className="text-sm text-white/90">
                <strong>IET Guidance Note 3</strong> provides practical guidance on inspection and testing, including recommended test intervals, procedures, and documentation. It should be used alongside BS 7671.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Competence Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Competence Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A <strong>'skilled person'</strong> (sometimes called 'competent person') is defined in BS 7671 as a person who possesses, as appropriate to the nature of the work:
            </p>
            <ul className="text-sm text-white space-y-1 ml-4">
              <li>Adequate education and training</li>
              <li>Sufficient knowledge and practical experience</li>
              <li>The ability to prevent danger and injury</li>
            </ul>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Qualifications for Inspection & Testing</p>
              <p className="text-sm text-white/90 mb-3">
                While qualifications don't automatically make someone competent, the following demonstrate appropriate training:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-white font-semibold text-sm">City & Guilds 2391</p>
                  <p className="text-xs text-white/60">Initial verification & periodic inspection</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-white font-semibold text-sm">City & Guilds 2394</p>
                  <p className="text-xs text-white/60">Initial verification only</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-white font-semibold text-sm">City & Guilds 2395</p>
                  <p className="text-xs text-white/60">Periodic inspection only</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-white font-semibold text-sm">EAL / NICEIC Equivalents</p>
                  <p className="text-xs text-white/60">Various awarding bodies offer equivalent qualifications</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Self-Assessment of Competence</p>
              <p className="text-sm text-white/90 mb-2">
                You should honestly assess whether you have the competence for each specific task. Competence in one area doesn't automatically extend to all areas. Consider:
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Do I have the technical knowledge for this type of installation?</li>
                <li>Do I have practical experience with this equipment?</li>
                <li>Am I familiar with the relevant standards?</li>
                <li>Can I safely complete this work?</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Consequences of Non-Compliance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Consequences of Non-Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Failure to comply with electrical safety requirements can have serious consequences for duty holders, including criminal prosecution, civil liability, and business impacts.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Criminal Liability</p>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-white font-semibold text-sm">Breach of EAW Regulations</p>
                <p className="text-sm text-white/80 mt-1">Unlimited fines in Crown Court. Where death results, corporate manslaughter charges may apply (up to unlimited fines). Individual managers may face imprisonment.</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-orange-400/80 mb-2">Civil Liability</p>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="text-white font-semibold text-sm">Negligence Claims</p>
                <p className="text-sm text-white/80 mt-1">Those injured due to poor electrical work can sue for compensation. Claims can run into millions of pounds for serious injuries or death. Professional indemnity insurance may not cover work outside competence.</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insurance Implications</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Buildings insurance may be void if electrical installation not properly maintained</li>
                <li>Contents insurance claims may be rejected after electrical fires</li>
                <li>Employer's liability policies require compliance with safety legislation</li>
                <li>Public liability claims may exceed policy limits</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Business Consequences</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>HSE enforcement notices requiring immediate action</li>
                <li>Prohibition notices stopping work until compliance achieved</li>
                <li>Loss of competent person scheme membership</li>
                <li>Reputational damage affecting future work</li>
                <li>Removal from approved contractor lists</li>
              </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Demonstrating Compliance</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Keep records of all inspection and test results</li>
                <li>Maintain calibration certificates for test equipment</li>
                <li>Document your training and qualifications</li>
                <li>Use appropriate certification forms (EIC, EICR, Minor Works)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Pitfalls</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Signing certificates without personally verifying the work</li>
                <li>Working outside your area of competence</li>
                <li>Failing to keep test equipment calibrated</li>
                <li>Not following up on identified defects</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always work to BS 7671 and GN3 guidance</li>
                <li>Maintain CPD to keep knowledge current</li>
                <li>Don't take on work beyond your competence</li>
                <li>Be honest in your assessments and reports</li>
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

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard
            title="Key Regulations Reference"
            items={referenceItems}
          />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Test Intervals</p>
                <ul className="space-y-0.5">
                  <li>Domestic = 10 years (5 rented)</li>
                  <li>Commercial = 5 years</li>
                  <li>Industrial = 3 years</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Qualifications</p>
                <ul className="space-y-0.5">
                  <li>C&G 2391 = Full I&T</li>
                  <li>C&G 2394 = Initial only</li>
                  <li>C&G 2395 = Periodic only</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" disabled>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-1/section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule1Section1;
