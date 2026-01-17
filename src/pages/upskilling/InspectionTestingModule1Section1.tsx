import { ArrowLeft, Scale, Clock, CheckCircle, AlertTriangle, Wrench, HelpCircle, ChevronRight, ChevronLeft, BookOpen, Gavel, Shield, Users, Award, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';

const TITLE = "Purpose and Legal Requirements - Inspection & Testing";
const DESCRIPTION = "Understand the legal framework for electrical inspection and testing in the UK, including Health and Safety at Work Act, Electricity at Work Regulations, and BS 7671 requirements.";

const quickCheckQuestions = [
  {
    question: "Under which regulation must electrical systems be maintained to prevent danger?",
    options: ["Health and Safety at Work Act Section 2", "Electricity at Work Regulations 1989 Regulation 4", "BS 7671 Regulation 610", "Building Regulations Part P"],
    correctAnswer: 1,
    explanation: "Regulation 4 of the Electricity at Work Regulations 1989 requires that all systems shall be constructed, maintained and used so as to prevent danger."
  },
  {
    question: "What does 'reasonably practicable' mean in the context of electrical safety?",
    options: ["Do whatever is cheapest", "Do everything possible regardless of cost", "Balance the risk against cost, time and effort", "Only comply if convenient"],
    correctAnswer: 2,
    explanation: "Reasonably practicable means weighing the risk against the sacrifice (time, cost, effort) needed to avert it. If the risk outweighs the sacrifice, action must be taken."
  },
  {
    question: "Who can sign off an Electrical Installation Certificate?",
    options: ["Any electrician", "Only a skilled person competent in inspection and testing", "The building owner", "Any contractor on site"],
    correctAnswer: 1,
    explanation: "Only a skilled person who is competent in inspection and testing can sign certification. This requires appropriate training, qualifications and experience."
  }
];

const quizQuestions = [
  {
    question: "What is the primary purpose of electrical inspection and testing?",
    options: ["To generate paperwork", "To ensure safety and compliance with regulations", "To increase costs for clients", "To provide work for electricians"],
    correctAnswer: 1,
    explanation: "The primary purpose is to verify that electrical installations are safe for continued use and comply with relevant standards and regulations."
  },
  {
    question: "The Health and Safety at Work Act 1974 places duties on:",
    options: ["Employers only", "Employees only", "Both employers and employees", "Neither employers nor employees"],
    correctAnswer: 2,
    explanation: "The HASAWA 1974 places duties on both employers (to provide safe systems of work) and employees (to take reasonable care and cooperate)."
  },
  {
    question: "Which regulation specifically requires electrical systems to be maintained?",
    options: ["HASAWA Section 2", "EAW Regulations 1989 Reg 4", "BS 7671 Part 6", "CDM Regulations"],
    correctAnswer: 1,
    explanation: "Regulation 4 of the Electricity at Work Regulations 1989 specifically requires that all electrical systems shall be maintained so as to prevent danger."
  },
  {
    question: "What is the legal status of BS 7671?",
    options: ["It is primary legislation", "It is a statutory regulation", "It is a non-statutory standard (code of practice)", "It has no legal standing"],
    correctAnswer: 2,
    explanation: "BS 7671 is a non-statutory document but compliance with it is likely to achieve compliance with statutory requirements."
  },
  {
    question: "Under EAW Regulations, the term 'absolute' means:",
    options: ["The duty is qualified by cost considerations", "The duty must be complied with regardless of cost", "The duty only applies sometimes", "The duty is optional"],
    correctAnswer: 1,
    explanation: "An absolute duty must be complied with regardless of cost or difficulty. There is no defence of reasonable practicability."
  },
  {
    question: "What qualification demonstrates competence in inspection and testing?",
    options: ["CSCS card only", "City & Guilds 2391 or equivalent", "First aid certificate", "Manual handling certificate"],
    correctAnswer: 1,
    explanation: "The City & Guilds 2391 (or equivalent like EAL or NICEIC) specifically demonstrates competence in inspection and testing of electrical installations."
  },
  {
    question: "Maximum penalty for breach of Electricity at Work Regulations causing death:",
    options: ["Fine only", "Up to 2 years imprisonment", "Unlimited fine and/or imprisonment", "Community service"],
    correctAnswer: 2,
    explanation: "Serious breaches of EAW Regulations can result in unlimited fines and imprisonment, especially where death or serious injury occurs."
  },
  {
    question: "How often should portable appliances typically be tested in an office environment?",
    options: ["Every month", "Every 6 months", "Up to 48 months depending on risk assessment", "Never"],
    correctAnswer: 2,
    explanation: "The IET Code of Practice suggests that IT equipment in offices may only need formal testing up to every 48 months, based on risk assessment."
  },
  {
    question: "Who enforces the Electricity at Work Regulations?",
    options: ["Local councils", "The Health and Safety Executive (HSE)", "The police", "Trading Standards"],
    correctAnswer: 1,
    explanation: "The Health and Safety Executive (HSE) is responsible for enforcing the Electricity at Work Regulations 1989."
  },
  {
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
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-3xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1">
            <Link to="/study-centre/upskilling/inspection-testing-module-1">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 1</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 1</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
            <Scale className="h-7 w-7 text-elec-yellow" />
          </div>
          <span className="text-[11px] font-medium text-elec-yellow uppercase tracking-wide">
            Module 1 • Section 1
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Purpose and Legal Requirements
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed">
          Understanding why we inspect and test electrical installations, and the legal framework that governs these requirements in the UK.
        </p>
      </section>

      {/* In 30 Seconds */}
      <section className="px-4 pb-6 max-w-3xl mx-auto">
        <Card variant="ios-elevated" className="border-elec-yellow/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Electrical testing ensures safety and is legally required under the Electricity at Work Regulations 1989</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Only competent persons with appropriate qualifications should carry out inspection and testing</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Non-compliance can result in criminal prosecution, civil liability, and insurance invalidation</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <h2 className="text-[22px] font-semibold text-white mb-4">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Understand the legal framework for electrical testing",
            "Explain the purpose of periodic inspection",
            "Identify relevant legislation and regulations",
            "Describe employer and duty holder responsibilities",
            "Understand competence requirements for testers",
            "Explain the consequences of non-compliance"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-elec-yellow/10 flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-elec-yellow" />
                </div>
                <p className="text-[15px] text-white/80">{outcome}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Content Section 01 */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">01</span>
          <h2 className="text-[22px] font-semibold text-white">The Purpose of Inspection & Testing</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Electrical inspection and testing is fundamental to ensuring the safety of people and property. Every year in the UK, there are approximately <strong className="text-white">30 fatalities</strong> and <strong className="text-white">350,000 injuries</strong> related to electrical accidents in domestic and workplace settings.
            </p>
            <p>
              The core purposes of inspection and testing are:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Safety verification</strong> - Confirming that installations don't pose a risk of electric shock or fire</span>
              </li>
              <li className="flex items-start gap-3">
                <Gavel className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Regulatory compliance</strong> - Demonstrating compliance with statutory requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Installation verification</strong> - Confirming work meets BS 7671 requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Defect identification</strong> - Finding deterioration, damage or defects before they cause incidents</span>
              </li>
            </ul>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 mt-4">
              <p className="text-[13px] text-white/60 mb-2">Key Statistic</p>
              <p className="text-white">
                Around <strong className="text-elec-yellow">20,000 dwelling fires</strong> per year in the UK are caused by electrical faults. Proper inspection and testing can identify many of these risks before they result in fire.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Content Section 02 */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">02</span>
          <h2 className="text-[22px] font-semibold text-white">Health and Safety at Work Act 1974</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              The <strong className="text-white">Health and Safety at Work Act 1974 (HASAWA)</strong> is the primary piece of legislation covering occupational health and safety in Great Britain. It places general duties on employers, employees, and others.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Employer Duties (Section 2)</h3>
            <p>Employers must ensure, so far as is reasonably practicable:</p>
            <ul className="space-y-2 ml-4 mt-2">
              <li>• Safe plant and systems of work</li>
              <li>• Safe use, handling, storage and transport of articles and substances</li>
              <li>• Necessary information, instruction, training and supervision</li>
              <li>• Safe workplace with safe access and egress</li>
              <li>• Safe working environment with adequate welfare facilities</li>
            </ul>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Employee Duties (Section 7)</h3>
            <p>Employees must:</p>
            <ul className="space-y-2 ml-4 mt-2">
              <li>• Take reasonable care for their own health and safety</li>
              <li>• Take reasonable care for the health and safety of others affected by their acts or omissions</li>
              <li>• Cooperate with their employer on health and safety matters</li>
            </ul>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">The Role of HSE</h3>
            <p>
              The <strong className="text-white">Health and Safety Executive (HSE)</strong> is responsible for enforcing health and safety legislation. HSE inspectors have powers to enter premises, investigate, issue improvement and prohibition notices, and prosecute offenders.
            </p>
          </div>
        </Card>
      </section>

      {/* InlineCheck 1 */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <InlineCheck question={quickCheckQuestions[0]} />
      </section>

      {/* Content Section 03 */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">03</span>
          <h2 className="text-[22px] font-semibold text-white">Electricity at Work Regulations 1989</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              The <strong className="text-white">Electricity at Work Regulations 1989 (EAW)</strong> are the principal statutory requirements for electrical safety in the workplace. Unlike BS 7671, these are <strong className="text-elec-yellow">legally enforceable</strong>.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Regulation 4 - Systems, Work Activities and Protective Equipment</h3>
            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/20">
              <p className="text-white italic">
                "All systems shall at all times be of such construction as to prevent, so far as is reasonably practicable, danger."
              </p>
              <p className="text-white italic mt-2">
                "All systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger."
              </p>
            </div>
            <p className="mt-4">
              This regulation is critical for inspection and testing - it establishes the legal requirement for maintenance, which includes periodic inspection and testing.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Regulation 16 - Competent Persons</h3>
            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/20">
              <p className="text-white italic">
                "No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger... unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate."
              </p>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Absolute vs Reasonably Practicable</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                <p className="text-red-400 font-semibold mb-2">Absolute Duty</p>
                <p className="text-white/80 text-[14px]">Must be complied with regardless of cost or difficulty. No defence available. Example: Regulation 14 - work on live conductors.</p>
              </div>
              <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                <p className="text-orange-400 font-semibold mb-2">Reasonably Practicable</p>
                <p className="text-white/80 text-[14px]">Allows a balance between risk and cost/effort to avert it. If risk outweighs sacrifice, action must be taken.</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Content Section 04 */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">04</span>
          <h2 className="text-[22px] font-semibold text-white">BS 7671 IET Wiring Regulations</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">BS 7671</strong> (Requirements for Electrical Installations - IET Wiring Regulations) is the national standard for electrical installation in the UK. The current edition is the <strong className="text-elec-yellow">18th Edition</strong>, with Amendment 2 published in 2022.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Legal Status</h3>
            <p>
              BS 7671 is a <strong className="text-white">non-statutory standard</strong> - it is not law in itself. However:
            </p>
            <ul className="space-y-2 ml-4 mt-2">
              <li>• Compliance with BS 7671 is likely to achieve compliance with statutory requirements</li>
              <li>• Courts accept BS 7671 as defining good practice</li>
              <li>• Building Regulations reference BS 7671</li>
              <li>• It forms the basis of electrical competence assessment</li>
            </ul>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Part 6 - Inspection and Testing</h3>
            <p>
              Part 6 of BS 7671 covers initial verification (Chapter 61) and periodic inspection and testing (Chapter 62). Key regulations include:
            </p>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 mt-4 space-y-2">
              <p><strong className="text-elec-yellow">Reg 610.1</strong> - Every installation shall be inspected and tested during erection and on completion</p>
              <p><strong className="text-elec-yellow">Reg 631.1</strong> - Initial verification includes visual inspection followed by testing</p>
              <p><strong className="text-elec-yellow">Reg 650.1</strong> - Periodic inspection shall reveal if installations are safe for continued use</p>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Guidance Note 3 (GN3)</h3>
            <p>
              <strong className="text-white">IET Guidance Note 3</strong> provides practical guidance on inspection and testing, including recommended test intervals, procedures, and documentation. It should be used alongside BS 7671.
            </p>
          </div>
        </Card>
      </section>

      {/* InlineCheck 2 */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <InlineCheck question={quickCheckQuestions[1]} />
      </section>

      {/* Content Section 05 */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">05</span>
          <h2 className="text-[22px] font-semibold text-white">Competence Requirements</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              A <strong className="text-white">'skilled person'</strong> (sometimes called 'competent person') is defined in BS 7671 as a person who possesses, as appropriate to the nature of the work:
            </p>
            <ul className="space-y-2 ml-4">
              <li>• Adequate education and training</li>
              <li>• Sufficient knowledge and practical experience</li>
              <li>• The ability to prevent danger and injury</li>
            </ul>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Qualifications for Inspection & Testing</h3>
            <p>
              While qualifications don't automatically make someone competent, the following demonstrate appropriate training:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Award className="h-5 w-5 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">City & Guilds 2391</p>
                <p className="text-[13px] text-white/60">Initial verification & periodic inspection</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Award className="h-5 w-5 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">City & Guilds 2394</p>
                <p className="text-[13px] text-white/60">Initial verification only</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Award className="h-5 w-5 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">City & Guilds 2395</p>
                <p className="text-[13px] text-white/60">Periodic inspection only</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Award className="h-5 w-5 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">EAL / NICEIC Equivalents</p>
                <p className="text-[13px] text-white/60">Various awarding bodies offer equivalent qualifications</p>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Self-Assessment of Competence</h3>
            <p>
              You should honestly assess whether you have the competence for each specific task. Competence in one area doesn't automatically extend to all areas. Consider:
            </p>
            <ul className="space-y-2 ml-4 mt-2">
              <li>• Do I have the technical knowledge for this type of installation?</li>
              <li>• Do I have practical experience with this equipment?</li>
              <li>• Am I familiar with the relevant standards?</li>
              <li>• Can I safely complete this work?</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Content Section 06 */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">06</span>
          <h2 className="text-[22px] font-semibold text-white">Consequences of Non-Compliance</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Failure to comply with electrical safety requirements can have serious consequences for duty holders, including criminal prosecution, civil liability, and business impacts.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Criminal Liability</h3>
            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
              <div className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Breach of EAW Regulations</p>
                  <p className="text-[14px] text-white/80 mt-1">Unlimited fines in Crown Court. Where death results, corporate manslaughter charges may apply (up to unlimited fines). Individual managers may face imprisonment.</p>
                </div>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Civil Liability</h3>
            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Negligence Claims</p>
                  <p className="text-[14px] text-white/80 mt-1">Those injured due to poor electrical work can sue for compensation. Claims can run into millions of pounds for serious injuries or death. Professional indemnity insurance may not cover work outside competence.</p>
                </div>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Insurance Implications</h3>
            <ul className="space-y-2 ml-4">
              <li>• Buildings insurance may be void if electrical installation not properly maintained</li>
              <li>• Contents insurance claims may be rejected after electrical fires</li>
              <li>• Employer's liability policies require compliance with safety legislation</li>
              <li>• Public liability claims may exceed policy limits</li>
            </ul>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Business Consequences</h3>
            <ul className="space-y-2 ml-4">
              <li>• HSE enforcement notices requiring immediate action</li>
              <li>• Prohibition notices stopping work until compliance achieved</li>
              <li>• Loss of competent person scheme membership</li>
              <li>• Reputational damage affecting future work</li>
              <li>• Removal from approved contractor lists</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* InlineCheck 3 */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <InlineCheck question={quickCheckQuestions[2]} />
      </section>

      {/* Practical Guidance */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <Card variant="ios-elevated" className="border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-[17px] font-semibold flex items-center gap-2">
              <Wrench className="h-5 w-5 text-elec-yellow" />
              Practical Guidance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-white font-semibold mb-2">Demonstrating Compliance</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Keep records of all inspection and test results</li>
                <li>• Maintain calibration certificates for test equipment</li>
                <li>• Document your training and qualifications</li>
                <li>• Use appropriate certification forms (EIC, EICR, Minor Works)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Common Pitfalls</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Signing certificates without personally verifying the work</li>
                <li>• Working outside your area of competence</li>
                <li>• Failing to keep test equipment calibrated</li>
                <li>• Not following up on identified defects</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Best Practice</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Always work to BS 7671 and GN3 guidance</li>
                <li>• Maintain CPD to keep knowledge current</li>
                <li>• Don't take on work beyond your competence</li>
                <li>• Be honest in your assessments and reports</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQs */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <h2 className="text-[22px] font-semibold text-white mb-4 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i} variant="ios" className="p-4">
              <h3 className="text-[17px] font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-[15px] text-white/70 leading-relaxed">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Reference Card */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <UnitsPocketCard
          title="Key Regulations Reference"
          items={referenceItems}
        />
      </section>

      {/* Quiz */}
      <section className="px-4 pb-8 max-w-3xl mx-auto">
        <Quiz
          questions={quizQuestions}
          title="Section 1 Quiz"
          description="Test your knowledge of purpose and legal requirements"
        />
      </section>

      {/* Navigation */}
      <footer className="px-4 pb-safe pt-6 max-w-3xl mx-auto border-t border-white/10">
        <div className="flex gap-3">
          <Button variant="ios-secondary" size="ios-default" className="flex-1 opacity-50" disabled>
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous
          </Button>
          <Button variant="ios-primary" size="ios-default" className="flex-1" asChild>
            <Link to="/study-centre/upskilling/inspection-testing-module-1-section-2">
              Next
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default InspectionTestingModule1Section1;
