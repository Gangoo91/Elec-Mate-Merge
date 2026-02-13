import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  FileText,
  PenTool,
  Shield,
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
  Users,
  Eye,
  ListChecks,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'When should I issue an EIC instead of a Minor Works certificate?',
    answer:
      'An Electrical Installation Certificate (EIC) must be issued whenever a new circuit is installed. This includes running a new cable from the distribution board with a new protective device (MCB, RCBO, or fuse). Examples include installing a new radial circuit for an electric shower, a new cooker circuit, a new ring final circuit, an EV charger circuit, or any circuit forming part of a complete rewire. If the work involves only additions or alterations to an existing circuit — such as adding a socket outlet to an existing ring — a Minor Electrical Installation Works Certificate is appropriate instead. The key distinction is whether a new circuit has been created. BS 7671 Regulation 631.1 covers the EIC requirement.',
  },
  {
    question: 'Can one person sign all three roles on an EIC?',
    answer:
      'Yes. BS 7671 permits the same competent person to fulfil all three roles — designer, constructor, and inspector — and to sign the EIC in all three capacities. This is common for sole traders and small firms where one electrician carries out the entire job from design through to inspection and testing. However, the person signing must be genuinely competent in all three areas. On larger projects, these roles are often split between different individuals or firms — for example, an electrical consultant may design the installation, a contracting firm may construct it, and an independent inspector may carry out the final inspection and testing. In this case, each person signs only for the role they have fulfilled.',
  },
  {
    question: 'What test results must be recorded on an EIC?',
    answer:
      'The EIC schedule of test results requires the following for each circuit: continuity of protective conductors (R1+R2 values), continuity of ring final circuit conductors (for ring circuits — r1, rn, r2 end-to-end readings and cross-connection readings), insulation resistance (minimum 1 MΩ at 500 V DC for circuits up to 500 V), polarity verification (confirmed correct at each point), earth fault loop impedance (Zs at the furthest point of each circuit), prospective fault current (PSCC at the origin and at each distribution board), and RCD operating times where RCD protection is fitted. The schedule also requires details of the protective device (type, rating, and short-circuit capacity) and the cable (type, size, and reference method) for every circuit.',
  },
  {
    question: 'Is Part P notification required for all work that needs an EIC?',
    answer:
      'In England and Wales, any electrical installation work in a dwelling that involves the installation of a new circuit is notifiable under Part P of the Building Regulations (Approved Document P). Since an EIC is required precisely when new circuits are installed, the two requirements align closely — virtually all domestic work requiring an EIC will also be notifiable. If you are registered with a competent person scheme (such as NICEIC, NAPIT, ELECSA, STROMA, or BRE), you can self-certify the work by submitting the EIC to your scheme provider, who issues a Building Regulations Compliance Certificate. If you are not registered with a scheme, you must notify the local authority building control before starting the work, and they will arrange an inspection. The rules differ in Scotland and Northern Ireland, so always check the regulations for the nation in which you are working.',
  },
  {
    question: 'How long should I keep copies of EIC certificates?',
    answer:
      'There is no specific legal requirement stating exactly how long EIC certificates must be retained, but best practice and scheme provider guidance recommend keeping copies for a minimum of 10 years. Some scheme providers require their registered members to retain copies for the duration of their membership. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require landlords to keep the most recent EICR (not EIC, but the principle of record-keeping applies), and the Limitation Act 1980 allows claims for breach of contract up to 6 years and claims under deed up to 12 years. Keeping certificates for at least 10 years provides protection against most potential claims. Elec-Mate stores all certificates in your cloud archive indefinitely, so you always have a copy available.',
  },
];

const howToSteps = [
  {
    name: 'Open the EIC form in Elec-Mate',
    text: 'Navigate to Certificates in the Elec-Mate app and select Electrical Installation Certificate. The form opens with your company details, personal information, and scheme registration number pre-filled from your profile. Select the number of circuits to pre-populate the schedule of test results.',
  },
  {
    name: 'Enter the client and installation details',
    text: 'Fill in the client name, address, and the description and extent of the installation covered by the certificate. Use the address auto-complete to speed up data entry. Record the supply characteristics: earthing system (TN-S, TN-C-S, or TT), nominal voltage, prospective fault current at the origin, and external earth fault loop impedance (Ze).',
  },
  {
    name: 'Complete the design section (Part 3)',
    text: 'Record the design details including the number and type of live conductors, the nature of the supply, the earthing arrangements, the method of protection against indirect contact (ADS), and the characteristics of the protective devices. Confirm compliance with BS 7671 and any departures from the standard with reasons noted.',
  },
  {
    name: 'Complete the construction section (Part 4)',
    text: 'Record the construction details including the method of cable installation, types of wiring system used, and confirmation that the installation has been constructed in accordance with the design. Note any deviations from the original design that were agreed during construction.',
  },
  {
    name: 'Record inspection and test results (Parts 5 and 6)',
    text: 'Complete the schedule of inspections (visual checks) and the schedule of test results for every circuit. Enter continuity, insulation resistance, polarity, Zs, PSCC, and RCD test results. Elec-Mate validates all values against BS 7671 limits and highlights failures in real time as you enter data on site.',
  },
  {
    name: 'Sign and export the certificate',
    text: 'Apply digital signatures for each role — designer, constructor, and inspector. If one person fulfils all roles, apply your signature three times. Review the completed certificate preview, then export as a professional PDF. Email directly to the client, share via WhatsApp, or submit to your scheme provider portal.',
  },
];

const features = [
  {
    icon: Users,
    title: 'Three-Signature Support',
    description:
      'Built-in support for separate designer, constructor, and inspector signatures. One person can sign all three roles, or different individuals can each sign their own section.',
  },
  {
    icon: PenTool,
    title: 'Digital Signatures',
    description:
      'Built-in signature pad captures signatures on screen. No printing, signing, and scanning. Sign on site and send the completed certificate immediately.',
  },
  {
    icon: ListChecks,
    title: 'Full Schedule of Inspections',
    description:
      'The complete schedule of items inspected is built into the form, matching the BS 7671 Appendix 6 model form. Tick each item as you inspect, with nothing missed.',
  },
  {
    icon: Download,
    title: 'Professional PDF Export',
    description:
      'Generate a clean, branded PDF certificate in one tap. Email it directly to the client, share via WhatsApp, or upload to your scheme provider portal.',
  },
  {
    icon: Smartphone,
    title: 'Works Offline on Site',
    description:
      'Start certificates even without signal. Data saves locally every 10 seconds and syncs to the cloud every 30 seconds. Never lose work on site.',
  },
  {
    icon: ClipboardCheck,
    title: 'Test Result Validation',
    description:
      'Automatic validation of all test results against BS 7671 limits. Flags insulation resistance below 1 MΩ, high Zs values, slow RCD trip times, and incomplete fields before you sign off.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate EIC Certificate App',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Create Electrical Installation Certificates (EIC) on your phone. Design, construction, inspection, and testing sections. BS 7671 compliant with digital signatures and PDF export.',
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
  name: 'How to Create an Electrical Installation Certificate with Elec-Mate',
  description:
    'Step-by-step guide to creating an Electrical Installation Certificate (EIC) using the Elec-Mate app, from opening the form to exporting the signed PDF.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function EICCertificatePage() {
  useSEO({
    title: 'EIC Certificate App | Electrical Installation Certificate',
    description:
      'Create Electrical Installation Certificates (EIC) on your phone. Design, construction, inspection, and testing sections. BS 7671 compliant with digital signatures and PDF export.',
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
            <FileText className="w-4 h-4" />
            Part of 8 Certificate Types
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            EIC Certificate App
            <span className="block text-yellow-400 mt-1">Electrical Installation Certificate</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Create Electrical Installation Certificates on site in minutes. Design, construction, inspection, and testing sections with digital signatures, test result validation, and instant PDF export.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Create Your First EIC Free
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

      {/* What is an EIC */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Is an Electrical Installation Certificate (EIC)?</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              An Electrical Installation Certificate (EIC) is the formal document issued upon completion of a new electrical installation or the installation of new circuits. It is required by BS 7671 Regulation 631.1, which states that upon completion of the verification of a new installation or an addition or alteration to an existing installation which includes new circuits, an Electrical Installation Certificate shall be provided.
            </p>
            <p>
              The EIC serves as a declaration that the electrical installation work has been designed, constructed, inspected, and tested in accordance with BS 7671 (the IET Wiring Regulations). It is the most comprehensive of the three main electrical certificates — the others being the Minor Electrical Installation Works Certificate (for additions and alterations to existing circuits) and the Electrical Installation Condition Report (EICR, for periodic inspection and testing of existing installations).
            </p>
            <p>
              The certificate is not just a formality. It carries legal significance. The person or persons signing the EIC are making a declaration that the work complies with the current edition of BS 7671. If the work is subsequently found to be non-compliant and causes damage or injury, the signatories may be held legally liable. For this reason, the EIC requires careful completion, accurate test results, and genuine competence in all three areas covered by the certificate: design, construction, and inspection and testing.
            </p>
            <p>
              An EIC should be issued for all new installations including complete rewires, new-build properties, and commercial fit-outs. It must also be issued for any work on an existing installation that involves the creation of new circuits — for example, installing a new radial circuit for an electric shower, a new dedicated cooker circuit, a new ring final circuit for an extension, or an EV charger installation requiring a new circuit from the consumer unit.
            </p>
          </div>
        </div>
      </section>

      {/* EIC vs Minor Works */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Eye className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">EIC vs Minor Works — When to Use Each Certificate</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The distinction between an EIC and a Minor Works certificate is straightforward in principle: if you are installing a new circuit, you need an EIC. If you are making an addition or alteration to an existing circuit without creating a new one, you need a Minor Works certificate. In practice, however, there are grey areas that cause confusion.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-bold text-white text-lg">EIC Required</h3>
                </div>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>New radial circuit for an electric shower</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>New dedicated cooker circuit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Complete or partial rewire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>New ring final circuit for an extension</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>EV charger with new dedicated circuit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>New garden or outbuilding supply</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-bold text-white text-lg">Minor Works Certificate</h3>
                </div>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Adding a socket to an existing ring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Extending an existing lighting circuit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Adding an FCU to an existing circuit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Repositioning an existing accessory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Consumer unit replacement (no new circuits)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Installing a fused spur from an existing circuit</span>
                  </li>
                </ul>
              </div>
            </div>
            <p>
              A useful rule of thumb: if you are running a new cable from the distribution board with a new protective device (MCB or RCBO), you are installing a new circuit and need an EIC. If you are connecting into an existing circuit at any point without adding a new protective device at the board, it is minor works and requires a Minor Works certificate. Consumer unit replacement is an edge case — since it involves alterations to existing circuits rather than new circuit installation, many contractors issue a Minor Works certificate for each circuit, though some scheme providers prefer an EIC. Always check with your registration body if in doubt.
            </p>
          </div>
        </div>
      </section>

      {/* Three Responsible Persons */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Users className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The Three Responsible Persons on an EIC</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Unlike the Minor Works certificate (which has a single combined signature), the EIC has three distinct signature blocks for three different roles. Each signatory is making a separate declaration of competence and responsibility for their part of the work. Understanding these roles is essential for correct completion of the certificate.
            </p>
            <div className="space-y-4 my-6">
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">The Designer</h3>
                <p className="text-white text-sm leading-relaxed">
                  The designer is responsible for the design of the electrical installation. By signing, they declare that the design complies with BS 7671 and that they have taken into account all relevant factors including the maximum demand, diversity, cable sizing, voltage drop, protective device selection, earthing arrangements, and external influences. The design must ensure that the installation will be safe and will function correctly throughout its intended life. The designer must be competent in electrical design — holding appropriate qualifications and having sufficient experience for the complexity of the installation.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">The Constructor (Installer)</h3>
                <p className="text-white text-sm leading-relaxed">
                  The constructor is responsible for the physical construction of the electrical installation. By signing, they declare that the installation has been constructed in accordance with the design and in compliance with BS 7671. This covers all aspects of the physical work: cable routing, cable support and fixings, terminations, connections, accessory mounting, distribution board wiring, earthing and bonding connections, labelling, and all other elements of the physical installation. The constructor must be competent in electrical installation work.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">The Inspector (and Tester)</h3>
                <p className="text-white text-sm leading-relaxed">
                  The inspector is responsible for the inspection and testing of the completed installation. By signing, they declare that the installation has been inspected and tested in accordance with BS 7671 Chapter 6 and that the results confirm compliance with the standard. The inspector must carry out a detailed visual inspection using the schedule of inspections, then perform the full suite of tests including continuity, insulation resistance, polarity, earth fault loop impedance, prospective fault current, and RCD operation. The inspector must hold an appropriate inspection and testing qualification (such as C&G 2391) and be competent in the use of test instruments.
                </p>
              </div>
            </div>
            <p>
              On most domestic jobs carried out by a sole trader or small firm, the same person fulfils all three roles. This is perfectly acceptable under BS 7671, provided the person is competent in all three areas. The person signs the certificate three times — once as designer, once as constructor, and once as inspector. On larger commercial or industrial projects, these roles are frequently split between different individuals or firms, each signing only for the work they have carried out.
            </p>
          </div>
        </div>
      </section>

      {/* EIC Sections Explained */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <FileText className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Sections of the EIC Form Explained</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The EIC form, as specified in BS 7671 Appendix 6, is divided into several parts. Each must be completed accurately for the certificate to be valid. Understanding the purpose and content of each section ensures your certificates are thorough, compliant, and capable of withstanding scrutiny from scheme inspectors and building control officers.
            </p>
            <div className="space-y-4 my-6">
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">Part 1: Details of the Contractor</h3>
                <p className="text-white text-sm leading-relaxed">
                  The trading title, address, telephone number, and registration details of the contractor responsible for the work. If different firms are responsible for design, construction, and inspection, the details of each firm must be recorded. Include your competent person scheme membership number (e.g. NICEIC, NAPIT, ELECSA enrolment number).
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">Part 2: Details of the Installation</h3>
                <p className="text-white text-sm leading-relaxed">
                  The address and occupier of the installation, a description of the installation (e.g. "Complete rewire of three-bedroom semi-detached dwelling" or "New circuit for electric vehicle charge point"), and the extent of the work covered by this certificate. Also record whether the installation is new or an addition/alteration to an existing installation.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">Part 3: Design</h3>
                <p className="text-white text-sm leading-relaxed">
                  The supply characteristics (earthing system, number of phases, nominal voltage, prospective fault current, external earth fault loop impedance Ze), the means of earthing, the characteristics of the overcurrent protective devices, and any departures from BS 7671 with reasons. The designer signs this section to confirm the design complies with the standard.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">Part 4: Construction</h3>
                <p className="text-white text-sm leading-relaxed">
                  Confirmation that the construction follows the design, details of the wiring systems used, and the signature of the constructor. Any deviations from the original design that were agreed during construction should be noted and the design section updated accordingly.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">Part 5: Inspection (Schedule of Inspections)</h3>
                <p className="text-white text-sm leading-relaxed">
                  A comprehensive visual inspection checklist covering: connections at accessories and equipment, correct identification of conductors, routing of cables in safe zones, presence and condition of fire barriers, protective devices correctly rated and selected, RCD types correct for the loads served, earthing and bonding connections secure, labels and warning notices in place, IP ratings appropriate for the environment, and all other items listed in the BS 7671 model form.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">Part 6: Testing (Schedule of Test Results)</h3>
                <p className="text-white text-sm leading-relaxed">
                  The complete schedule of test results for every circuit in the installation. For each circuit, record: circuit designation, protective device type and rating, cable type and size, reference method, continuity of protective conductors (R1+R2), ring final circuit continuity readings, insulation resistance, polarity, earth fault loop impedance (Zs), prospective short-circuit current (PSCC), and RCD test results (type, IΔn, and measured operating time).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part P Notification */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Shield className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Part P Notification and the EIC</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              In England and Wales, Approved Document P of the Building Regulations governs electrical safety in dwellings. Since the EIC is issued when new circuits are installed, and new circuit installation in a dwelling is always notifiable under Part P, the EIC and Part P notification go hand in hand for domestic work.
            </p>
            <p>
              <strong className="text-yellow-400">Notifiable work</strong> in dwellings includes: the installation of a new circuit; the replacement of a consumer unit; any electrical work in a special location such as a bathroom or room containing a shower; and work in a kitchen that involves a new circuit. All of these situations require an EIC (or in the case of consumer unit replacement, at minimum a Minor Works certificate, depending on your scheme provider's requirements).
            </p>
            <p>
              If you are registered with a government-approved competent person scheme (NICEIC, NAPIT, ELECSA, STROMA, or BRE), you can self-certify notifiable work. This means you submit the completed EIC to your scheme provider within the required timeframe (typically 5 working days of completion). Your scheme provider then issues a Building Regulations Compliance Certificate and notifies the local authority on your behalf. The homeowner receives this compliance certificate as proof that the work has been properly certified and notified.
            </p>
            <p>
              If you are not registered with a competent person scheme, you must notify the local authority building control BEFORE starting any notifiable work. Building control will then arrange an inspection of the completed work. This route is slower, more expensive (building control fees typically range from £200 to £400), and less convenient for both you and the client. This is one of the key reasons most professional electricians maintain membership of a competent person scheme.
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How to Create an EIC — Step by Step</h2>
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

      {/* Certificate Types Available */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ClipboardCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">All 8 Certificate Types in Elec-Mate</h2>
          </div>
          <p className="text-white mb-6 leading-relaxed">
            The EIC is one of eight electrical certificate types available in Elec-Mate. Each follows BS 7671 Appendix 6 model forms and includes auto-fill, digital signatures, and PDF export.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                name: 'Electrical Installation Certificate (EIC)',
                desc: 'For new installations and new circuits, including rewires, new builds, and extensions.',
                highlight: true,
              },
              {
                name: 'Minor Electrical Installation Works Certificate',
                desc: 'For additions and alterations to existing circuits without new circuit installation.',
                highlight: false,
              },
              {
                name: 'Electrical Installation Condition Report (EICR)',
                desc: 'Periodic inspection and testing of existing installations. Required for landlords.',
                highlight: false,
              },
              {
                name: 'Emergency Lighting Certificate',
                desc: 'Testing and verification of emergency lighting systems to BS 5266.',
                highlight: false,
              },
              {
                name: 'Fire Alarm Certificate',
                desc: 'Commissioning and verification of fire detection and alarm systems to BS 5839.',
                highlight: false,
              },
              {
                name: 'PAT Testing Certificate',
                desc: 'Portable appliance testing records and certificates for commercial clients.',
                highlight: false,
              },
              {
                name: 'EV Charger Installation Certificate',
                desc: 'Specific certification for electric vehicle charge point installations.',
                highlight: false,
              },
              {
                name: 'Solar PV Installation Certificate',
                desc: 'Certification for solar photovoltaic system installations to BS 7671 Section 712.',
                highlight: false,
              },
            ].map((cert) => (
              <div
                key={cert.name}
                className={`p-5 rounded-2xl border ${
                  cert.highlight
                    ? 'bg-yellow-500/5 border-yellow-500/30'
                    : 'bg-white/[0.04] border-white/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  <FileText className={`w-5 h-5 mt-0.5 flex-shrink-0 ${cert.highlight ? 'text-yellow-400' : 'text-white'}`} />
                  <div>
                    <h3 className="font-bold text-white text-sm mb-1">{cert.name}</h3>
                    <p className="text-white text-sm leading-relaxed">{cert.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Electricians Choose Elec-Mate for Certificates
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians. Faster than paper forms, more reliable than generic PDF apps.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
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

      {/* Common Mistakes */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Common Mistakes on EIC Certificates</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Scheme inspectors regularly identify the same errors on EIC certificates. Understanding these common mistakes helps you produce certificates that pass inspection first time and demonstrate your professionalism to clients.
            </p>
            <ul className="space-y-3 my-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Missing or incomplete schedule of inspections</strong> — Every item on the schedule must be ticked as satisfactory, not applicable, or limited. Leaving items blank is a common deficiency that suggests the inspection was not thorough.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Test results missing for some circuits</strong> — Every circuit must have test results recorded. Missing R1+R2, insulation resistance, or Zs values for any circuit invalidates the certificate.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Signatures missing for one or more roles</strong> — All three signature blocks must be completed. If one person fulfils all roles, they must still sign in all three places.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Supply characteristics not recorded</strong> — Ze, PSCC at the origin, and the earthing system must be recorded. These values are essential for verifying that the design is correct.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Using a Minor Works form when an EIC is needed</strong> — If a new circuit has been installed, a full EIC is required. Issuing a Minor Works certificate for new circuit work is non-compliant and may result in scheme sanctions.
                </span>
              </li>
            </ul>
            <p>
              Elec-Mate helps prevent these mistakes with built-in validation. The app flags incomplete sections, missing signatures, and test results that fall outside BS 7671 limits before you export the certificate, reducing defects on scheme inspections.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Create Professional EIC Certificates in Minutes"
        subheading="Join 430+ UK electricians using Elec-Mate for on-site certification. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
