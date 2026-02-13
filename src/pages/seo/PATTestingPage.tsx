import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Plug,
  ShieldCheck,
  Clock,
  CheckCircle2,
  BookOpen,
  Download,
  Smartphone,
  Zap,
  HelpCircle,
  ChevronRight,
  ArrowDown,
  ClipboardCheck,
  FileText,
  Eye,
  Briefcase,
  BarChart3,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'Is PAT testing a legal requirement in the UK?',
    answer:
      'There is no specific law that requires "PAT testing" by name. However, the Electricity at Work Regulations 1989 (Regulation 4) require that all electrical systems (including portable appliances) are maintained so as to prevent danger. The Health and Safety at Work Act 1974 requires employers to ensure, so far as is reasonably practicable, the health, safety, and welfare of their employees — which includes maintaining electrical equipment in a safe condition. The Provision and Use of Work Equipment Regulations 1998 (PUWER) also require that work equipment is maintained in a safe condition. In practice, regular inspection and testing of portable appliances (PAT testing) is the recognised method of demonstrating compliance with these duties. So while the specific term "PAT testing" does not appear in legislation, the underlying legal obligation to maintain electrical equipment is clear and enforceable.',
  },
  {
    question: 'Who is qualified to carry out PAT testing?',
    answer:
      'There is no formal legal qualification requirement for PAT testing. The IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment states that the person carrying out the testing must be competent — meaning they have sufficient knowledge, training, and experience to carry out the work safely and to interpret the results correctly. For formal combined inspection and testing (using a PAT tester), a person should understand basic electrical theory, know how to use the test instrument correctly, be able to identify the equipment class (I, II, or III), understand the pass/fail criteria, and be able to assess the results. Many electricians add PAT testing to their services as an additional revenue stream. Short PAT testing courses (typically 1 day) are available from training providers and cover the practical skills needed, though they are not legally required if the person can already demonstrate competence.',
  },
  {
    question: 'How often should PAT testing be carried out?',
    answer:
      'The IET Code of Practice provides suggested initial intervals for formal inspection and testing based on the type of environment and the type of equipment. These are guidelines, not legal requirements — the duty holder can adjust the intervals based on risk assessment. Typical intervals include: offices and shops — every 48 months for IT equipment, 24 months for portable appliances; hotels and public premises — every 24 months; industrial — every 12 months; construction sites — every 3 months. However, the IET Code of Practice emphasises that these are starting points. If previous testing shows consistently good results with very few failures, the intervals can be extended. If many failures are found, the intervals should be shortened. A risk-based approach is always preferred over a rigid schedule.',
  },
  {
    question: 'What is the difference between Class I and Class II appliances?',
    answer:
      'Class I appliances rely on both basic insulation AND an earth connection for protection against electric shock. They have a three-core cable (live, neutral, and earth) and their metal parts are connected to earth via the earth conductor. If the basic insulation fails and a live part touches the metal casing, the fault current flows to earth through the protective conductor, tripping the protective device (MCB or fuse) and disconnecting the supply. Examples include kettles with metal bodies, toasters, desktop computers with metal cases, and washing machines. Class II appliances rely on double insulation or reinforced insulation for protection — they do not require an earth connection. They typically have a two-core cable (live and neutral only) and are identified by the double square symbol on the rating plate. If the basic insulation fails, the supplementary insulation prevents dangerous voltages from reaching accessible parts. Examples include phone chargers, most power tools, hair dryers, and plastic-bodied devices.',
  },
  {
    question: 'What records do I need to keep for PAT testing?',
    answer:
      'The IET Code of Practice recommends maintaining a register of all equipment tested, including: a unique identifier for each item (an asset number or label), a description of the equipment, the date of each inspection and test, the results of the inspection and test (pass or fail), the name of the person who carried out the test, and the date of the next scheduled test. Records should be retained for comparison at future tests — this allows trends to be identified and testing intervals to be adjusted based on actual failure rates. A well-maintained register demonstrates due diligence to health and safety inspectors and insurers. Elec-Mate stores all PAT testing records digitally, generates asset labels, and produces professional reports that can be exported as PDFs and shared with clients immediately.',
  },
];

const howToSteps = [
  {
    name: 'Open the PAT testing form in Elec-Mate',
    text: 'Navigate to Certificates in the Elec-Mate app and select PAT Testing. Enter the client and site details. The form opens with your company information pre-filled. You can add multiple appliances to a single testing session, building up the register as you work through the premises.',
  },
  {
    name: 'Carry out the visual inspection',
    text: 'Before connecting any test instrument, visually inspect each appliance. Check the cable for damage, cuts, or exposed conductors. Check the plug for cracks, overheating signs, and correct fuse rating. Check the appliance casing for damage or missing covers. Check the cable entry point for strain relief. Record each visual check in the app — a significant proportion of failures are identified at this stage without any instrument testing.',
  },
  {
    name: 'Identify the equipment class',
    text: 'Determine whether the appliance is Class I (earthed, three-core cable), Class II (double insulated, two-core cable, marked with the double square symbol), or Class III (SELV, operating at extra-low voltage such as laptop power supplies). The equipment class determines which electrical tests are required and the pass/fail criteria that apply.',
  },
  {
    name: 'Perform the electrical tests',
    text: 'For Class I appliances: earth continuity (must be less than 0.1 ohm plus the resistance of the supply cable), insulation resistance (must be greater than 1 megohm at 500 V DC), and if required, earth leakage or touch current measurement. For Class II appliances: insulation resistance (must be greater than 2 megohm at 500 V DC). Record all measured values in the app, which validates them against the IET Code of Practice limits automatically.',
  },
  {
    name: 'Apply asset labels and record results',
    text: 'For each appliance that passes, apply a PAT label showing the test date, next test date, and tester identity. For each appliance that fails, apply a fail label and advise the client to remove it from service until repaired or replaced. The app records each result against the asset number and builds a complete register for the site.',
  },
  {
    name: 'Export the PAT testing report',
    text: 'Once all appliances have been tested, review the complete register in the app. Export a professional PDF report showing all tested items, their results, pass/fail status, and the next test dates. Email the report directly to the client from the app. The records are stored in your cloud archive for future reference and comparison at the next visit.',
  },
];

const features = [
  {
    icon: BarChart3,
    title: 'Complete Asset Register',
    description:
      'Build and maintain a digital register of all tested appliances. Track asset numbers, locations, test history, and next test dates across all your client sites.',
  },
  {
    icon: ShieldCheck,
    title: 'IET Code of Practice Compliant',
    description:
      'Pass/fail criteria aligned with the IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment (5th Edition). Earth continuity, insulation resistance, and leakage limits built in.',
  },
  {
    icon: Clock,
    title: 'Batch Testing Mode',
    description:
      'Test multiple appliances in rapid succession. The app pre-fills common fields and lets you move quickly from one item to the next, minimising time on site.',
  },
  {
    icon: Download,
    title: 'Professional PDF Reports',
    description:
      'Generate a branded PDF report showing all tested items, results, and next test dates. Email directly to the client or share via WhatsApp from the job site.',
  },
  {
    icon: Smartphone,
    title: 'Works Offline on Site',
    description:
      'Start PAT testing sessions even without signal. Data saves locally and syncs to the cloud automatically when connectivity returns. Never lose test records.',
  },
  {
    icon: Briefcase,
    title: 'Part of 8 Certificate Types',
    description:
      'PAT testing is one of eight certificate types in Elec-Mate, alongside EIC, EICR, Minor Works, Emergency Lighting, Fire Alarm, EV Charger, and Solar PV certificates.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate PAT Testing App',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Digital PAT testing records on your phone. Visual inspection, earth continuity, insulation resistance, and lead polarity. IET Code of Practice compliant. Part of 8 certificate types.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: '7-day free trial, then from £9.99/month',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '430',
    bestRating: '5',
  },
};

const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const howToSchema = {
  '@type': 'HowTo',
  name: 'How to Carry Out PAT Testing with Elec-Mate',
  description:
    'Step-by-step guide to portable appliance testing using the Elec-Mate app, from visual inspection through to exporting the completed PAT testing report.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function PATTestingPage() {
  useSEO({
    title: 'PAT Testing App | Portable Appliance Testing',
    description:
      'Digital PAT testing records on your phone. Visual inspection, earth continuity, insulation resistance, and lead polarity. IET Code of Practice compliant. Part of 8 certificate types.',
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...softwareAppSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...howToSchema })}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <Plug className="w-4 h-4" />
            Part of 8 Certificate Types
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            PAT Testing App
            <span className="block text-yellow-400 mt-1">Portable Appliance Testing</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Digital PAT testing records on your phone. Visual inspection checklists, automated pass/fail validation, asset register management, and professional PDF reports — all from your mobile device.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Start Your Free Trial
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#how-it-works"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              See How It Works
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* What is PAT Testing */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Is PAT Testing?</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Portable Appliance Testing (PAT) is the process of examining and testing electrical appliances and equipment to ensure they are safe for continued use. The term "PAT testing" has become the standard industry shorthand, even though the acronym technically makes it redundant ("Portable Appliance Testing testing"). The process covers all electrical equipment that has a plug and is connected to a fixed installation — from kettles and computers in offices to power tools on construction sites.
            </p>
            <p>
              PAT testing involves two distinct stages: a visual inspection and, where necessary, a formal electrical test using a dedicated PAT testing instrument. The visual inspection checks for obvious damage, wear, or deterioration that could make the appliance unsafe — frayed cables, cracked plugs, missing covers, signs of overheating, or incorrect fuse ratings. Research consistently shows that the majority of faults are identified during the visual inspection stage, making it the most important part of the process.
            </p>
            <p>
              The formal electrical tests go further. Depending on the class of equipment, they may include an earth continuity test (to verify that the earth conductor provides a low-resistance path for fault current), an insulation resistance test (to verify that the insulation between live parts and accessible parts is intact), and an earth leakage or touch current measurement (to check for small currents that could indicate deteriorating insulation before a full fault develops).
            </p>
            <p>
              The purpose of PAT testing is preventative. It identifies equipment that is deteriorating or damaged before it becomes dangerous. Faulty electrical equipment is one of the leading causes of workplace fires and electric shock injuries in the UK. Regular inspection and testing — combined with user checks and a regime for reporting damage — significantly reduces these risks.
            </p>
          </div>
        </div>
      </section>

      {/* Legal Requirements */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Legal Requirements for PAT Testing</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The legal position on PAT testing is frequently misunderstood. There is no single law that says "you must PAT test your appliances." However, there are several pieces of legislation that, taken together, create a clear legal duty to maintain electrical equipment in a safe condition. PAT testing is the recognised method of discharging that duty.
            </p>
            <div className="space-y-4 my-6">
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">The Electricity at Work Regulations 1989</h3>
                <p className="text-white text-sm leading-relaxed">
                  Regulation 4(2) states: "As may be necessary to prevent danger, all systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger." This applies to all electrical systems and equipment in the workplace, including portable appliances. "Maintained" means kept in a condition that prevents danger — which requires inspection and, where appropriate, testing. The HSE Memorandum of Guidance on these regulations specifically cites the inspection and testing of portable equipment as an example of maintenance.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">The Health and Safety at Work Act 1974</h3>
                <p className="text-white text-sm leading-relaxed">
                  Section 2(1) places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all their employees. Section 3 extends this duty to persons other than employees who may be affected by the employer's undertaking — such as visitors, contractors, and members of the public. Maintaining electrical equipment in a safe condition through regular inspection and testing is part of discharging this general duty.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">The Provision and Use of Work Equipment Regulations 1998 (PUWER)</h3>
                <p className="text-white text-sm leading-relaxed">
                  Regulation 5 requires that work equipment is maintained in an efficient state, in efficient working order, and in good repair. Where the maintenance involves a risk, a maintenance log must be kept and kept up to date. Portable electrical appliances used in the workplace are "work equipment" under PUWER, so this regulation applies directly. A PAT testing register serves as the maintenance log for these items.
                </p>
              </div>
            </div>
            <p>
              The key point is this: while no law uses the words "PAT testing," the combined effect of these regulations is that employers, landlords, and duty holders must ensure their electrical equipment is safe. Regular inspection and testing to the IET Code of Practice is the industry-standard method of demonstrating compliance. Failing to maintain equipment, and having an incident as a result, could lead to prosecution under these regulations, with penalties including unlimited fines and imprisonment.
            </p>
          </div>
        </div>
      </section>

      {/* IET Code of Practice */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The IET Code of Practice (5th Edition)</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment is the definitive technical reference for PAT testing in the UK. Now in its 5th Edition, it provides guidance on the inspection and testing regime, the types of tests to be carried out, the pass/fail criteria, suggested testing intervals, and the competence requirements for those carrying out the work.
            </p>
            <p>
              The Code of Practice is not law — it is guidance. However, it is recognised by the Health and Safety Executive (HSE) as representing good practice, and following it provides a strong defence in the event of an incident or prosecution. Courts and tribunals regularly reference the IET Code of Practice when assessing whether an employer or duty holder has taken "reasonably practicable" steps to maintain electrical equipment.
            </p>
            <p>
              One of the most significant changes introduced in recent editions of the Code of Practice is the emphasis on a risk-based approach to testing intervals. Rather than prescribing fixed intervals for all equipment, the Code of Practice encourages duty holders to set initial testing frequencies based on the type of environment and the type of equipment, then adjust those intervals based on the results of previous inspections and tests. If a particular category of equipment consistently passes with no failures, the testing interval can be extended. If failures are found, the interval should be shortened.
            </p>
            <p>
              The Code of Practice also clarifies the different levels of inspection and testing. A formal visual inspection (checking the cable, plug, and appliance for damage) can be carried out by a trained user and does not require a test instrument. A combined inspection and test (visual inspection plus electrical tests with a PAT tester) requires a competent person with knowledge of the test procedures and the ability to interpret the results. Both levels play a role in the overall maintenance regime.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Inspection vs Formal Testing */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Eye className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Visual Inspection vs Formal Testing</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The IET Code of Practice distinguishes between user checks, formal visual inspections, and combined inspection and testing. Understanding the difference is important for setting up an appropriate maintenance regime and for advising clients on what level of PAT testing they actually need.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-bold text-white text-lg">Visual Inspection</h3>
                </div>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Check cable for cuts, fraying, or exposed conductors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Check plug for cracks, overheating, or bent pins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Verify correct fuse rating for the appliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Check cable entry point and strain relief</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Check casing for damage or missing parts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Check for signs of overheating or burning</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-bold text-white text-lg">Formal Electrical Tests</h3>
                </div>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Earth continuity (Class I only): less than 0.1 ohm + cable resistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Insulation resistance (Class I): greater than 1 megohm at 500 V DC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Insulation resistance (Class II): greater than 2 megohm at 500 V DC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Lead polarity (extension leads): correct wiring verified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Earth leakage (where required): below published limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Touch current (alternative to insulation resistance for IT equipment)</span>
                  </li>
                </ul>
              </div>
            </div>
            <p>
              The visual inspection alone catches a significant majority of faults. Research by the HSE found that approximately 95% of defects can be identified by a visual inspection without the need for instrument testing. This does not mean instrument testing is unnecessary — it catches the remaining 5% of defects that are invisible to the eye, such as deteriorating insulation or high-resistance earth connections. A combined approach of visual inspection plus formal testing provides the most comprehensive level of assurance.
            </p>
          </div>
        </div>
      </section>

      {/* Equipment Classes */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Plug className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Class I, Class II, and Class III Equipment Explained</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Electrical equipment is classified according to the method of protection against electric shock that it employs. Identifying the correct class is essential for PAT testing because it determines which tests are required and which pass/fail criteria apply.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <h3 className="font-bold text-yellow-400 text-2xl mb-1">Class I</h3>
                <h4 className="font-bold text-white mb-3">Basic Insulation + Earth</h4>
                <p className="text-white text-sm leading-relaxed">
                  Relies on basic insulation plus a protective earth connection. Has a three-core cable (live, neutral, earth). Metal parts connected to earth so that fault current can flow and trip the protective device. Tests required: earth continuity (less than 0.1 ohm), insulation resistance (greater than 1 megohm). Examples: kettles, toasters, desktop computers with metal cases, washing machines, dishwashers.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-2xl mb-1">Class II</h3>
                <h4 className="font-bold text-white mb-3">Double Insulation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Relies on double insulation or reinforced insulation for protection. Has a two-core cable (live and neutral only, no earth). Identified by the double square symbol on the rating plate. No earth continuity test required. Insulation resistance test required (greater than 2 megohm). Examples: phone chargers, most modern power tools, hair dryers, laptop chargers, plastic-cased appliances.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-2xl mb-1">Class III</h3>
                <h4 className="font-bold text-white mb-3">Safety Extra-Low Voltage</h4>
                <p className="text-white text-sm leading-relaxed">
                  Designed to be supplied from a Safety Extra-Low Voltage (SELV) source — typically a transformer or power supply providing no more than 50 V AC or 120 V DC. The low voltage itself provides the primary protection. Identified by the Class III diamond symbol. No earth continuity or insulation resistance test at mains voltage is required for the appliance itself, though the power supply unit should be tested. Examples: some garden lighting, certain medical devices.
                </p>
              </div>
            </div>
            <p>
              Misidentifying the equipment class leads to incorrect testing. Attempting an earth continuity test on a Class II appliance will produce misleading results because there is no earth conductor. Conversely, omitting the earth continuity test on a Class I appliance misses a critical safety check. Always check the rating plate for the class symbol before selecting your tests. If the class cannot be determined from the rating plate, assume Class I and test accordingly.
            </p>
          </div>
        </div>
      </section>

      {/* Testing Intervals */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Suggested Testing Intervals by Environment</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The IET Code of Practice provides suggested initial intervals for combined inspection and testing. These are starting points that should be reviewed and adjusted based on actual results and the specific risk profile of the environment. The intervals reflect the different levels of risk associated with different types of premises and equipment use.
            </p>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
              <h3 className="font-bold text-white text-lg mb-4">Suggested Initial Testing Intervals</h3>
              <ul className="space-y-3 text-white">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-yellow-400">Construction sites:</strong> Every 3 months. The harsh environment, frequent movement, and heavy use of equipment significantly increase the risk of damage. 110 V equipment should also be inspected regularly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-yellow-400">Industrial premises:</strong> Every 6 to 12 months, depending on the type of equipment and environment. Heavy industrial equipment in dusty, wet, or corrosive environments should be tested more frequently.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-yellow-400">Hotels, public premises, schools:</strong> Every 12 to 24 months. Higher footfall and less-careful use of equipment increase the risk compared to offices. Kitchen and catering equipment should be tested more frequently.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-yellow-400">Offices and shops:</strong> Every 24 to 48 months. IT equipment in offices is generally low-risk and static, so longer intervals are appropriate. Portable equipment such as kettles and heaters should be tested more frequently than IT equipment.</span>
                </li>
              </ul>
            </div>
            <p>
              These intervals are guidelines, not legal requirements. A risk assessment specific to the premises and equipment should always be carried out. Factors that may justify shorter intervals include: older equipment nearing end of life, equipment used in harsh conditions, equipment moved frequently between locations, a history of failures in previous test cycles, and equipment critical to safety (such as portable RCDs or emergency equipment).
            </p>
          </div>
        </div>
      </section>

      {/* PAT Testing as a Business Opportunity */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Briefcase className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">PAT Testing as a Business Opportunity for Electricians</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              PAT testing represents a significant and often underutilised revenue stream for qualified electricians. Every commercial premises, school, hotel, restaurant, and office in the UK has a legal obligation to maintain its electrical equipment — and most fulfil that obligation through periodic PAT testing. The demand is consistent, recurring, and relatively straightforward to service.
            </p>
            <p>
              The economics are attractive. A competent tester with the right equipment and an efficient workflow can test 20 to 40 appliances per hour in a typical office environment. At commercial rates of £1 to £3 per item (depending on the region and volume), this translates to a healthy hourly rate with relatively low physical effort compared to installation work. The initial investment is modest — a quality PAT tester costs between £300 and £1,000, and no specialist qualifications are legally required beyond demonstrable competence.
            </p>
            <p>
              The recurring nature of the work is the real value. Once you establish a client for PAT testing, the work repeats on a regular cycle — annually for most commercial clients, every three months for construction sites. Building a portfolio of PAT testing clients creates a predictable, reliable income stream that complements your installation and maintenance work. Many electricians schedule PAT testing for quieter periods, keeping their income consistent year-round.
            </p>
            <p>
              Elec-Mate supports PAT testing as a business by providing digital record-keeping, asset register management, automated reports, and client management tools. When you return to a client site for their next test cycle, the app pulls up the previous register, showing what was tested, the results, and any items that were flagged for attention — making repeat visits faster and more efficient.
            </p>
          </div>
        </div>
      </section>

      {/* How-To Section */}
      <section id="how-it-works" className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CheckCircle2 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How to Carry Out PAT Testing — Step by Step</h2>
          </div>
          <div className="space-y-4">
            {howToSteps.map((step, index) => (
              <div key={index} className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                  <span className="font-bold text-yellow-400">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{step.name}</h3>
                  <p className="text-white leading-relaxed text-sm">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Electricians Choose Elec-Mate for PAT Testing
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians. Faster than paper registers, more professional than spreadsheets.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* Record Keeping */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ClipboardCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Record Keeping Requirements</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Keeping accurate records is not just good practice — it is a practical requirement for demonstrating compliance with the Electricity at Work Regulations and PUWER. If an incident occurs involving a portable appliance, the first question a health and safety inspector will ask is: "Where are your testing records?" Having comprehensive, well-organised records demonstrates that you have taken reasonable steps to maintain equipment safely.
            </p>
            <p>
              The IET Code of Practice recommends that records include: a unique identifier (asset number) for each item of equipment, a description of the item, the location where it is normally used, the date of each inspection and test, the results of each inspection and test (including measured values), the pass/fail outcome, the name or identity of the person who carried out the test, and the date of the next scheduled inspection and test.
            </p>
            <p>
              Records should be retained for comparison at future test cycles. Comparing current results with previous results allows you to identify equipment that is deteriorating over time — for example, insulation resistance values that are declining steadily, even though they still pass. This trending information is invaluable for catching potential problems before they become dangerous and for making informed decisions about extending or shortening test intervals.
            </p>
            <p>
              Elec-Mate stores all PAT testing records digitally with automatic cloud backup. When you return to a client site, you can pull up the previous register instantly, compare results, and identify any items that need particular attention. This makes repeat visits faster, more efficient, and more valuable to the client.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <HelpCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-yellow-500/30 transition-colors"
              >
                <summary className="flex items-start gap-3 cursor-pointer touch-manipulation list-none [&::-webkit-details-marker]:hidden">
                  <ChevronRight className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0 transition-transform group-open:rotate-90" />
                  <h3 className="font-bold text-white text-lg">{faq.question}</h3>
                </summary>
                <div className="mt-3 pl-8">
                  <p className="text-white leading-relaxed text-sm">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Start PAT Testing Digitally"
        subheading="Join 430+ UK electricians using Elec-Mate for professional testing and certification. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
