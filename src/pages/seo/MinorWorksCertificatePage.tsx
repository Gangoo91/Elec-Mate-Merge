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
  Eye,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'When should I issue a Minor Works certificate instead of an EIC?',
    answer:
      'A Minor Electrical Installation Works Certificate (commonly called an EWC or Minor Works) should be issued for work that does not include the provision of a new circuit. This covers additions and alterations to an existing circuit, such as adding a socket outlet to an existing ring final circuit, repositioning a light switch, or replacing a consumer unit on existing circuits. If the work involves installing a new circuit — for example running a new radial circuit for an electric shower or cooker — a full Electrical Installation Certificate (EIC) is required instead. BS 7671 Regulation 631.2 covers the requirement for the Minor Works certificate.',
  },
  {
    question: 'Do I need to issue a Minor Works certificate for a like-for-like replacement?',
    answer:
      'A like-for-like replacement of an accessory (such as swapping a socket outlet or light switch for an identical one in the same location) does not require a Minor Works certificate. However, if the replacement involves any alteration — for example changing the type of fitting, moving the position, or upgrading from a plastic to a metal accessory where a CPC connection is newly required — then a Minor Works certificate is needed. The key test is whether the work constitutes a "minor work" as defined in BS 7671, meaning an addition or alteration to an existing circuit that does not extend to a new circuit.',
  },
  {
    question: 'What is the difference between notifiable and non-notifiable minor works?',
    answer:
      'Under the Building Regulations Approved Document P (England and Wales), certain types of electrical work must be notified to the local building control authority. This is called "notifiable work". In a dwelling, notifiable work includes installing a new circuit, work in a special location (bathrooms, swimming pools), and replacing a consumer unit. Most minor works — such as adding a socket to an existing circuit in a non-special location — are non-notifiable. However, even non-notifiable work still requires a Minor Works certificate to be issued. If you are registered with a competent person scheme (such as NICEIC, NAPIT, or ELECSA), you can self-certify notifiable work. If not, you must notify building control and have the work inspected.',
  },
  {
    question: 'What test results are required on a Minor Works certificate?',
    answer:
      'The Minor Works certificate requires the following test results to be recorded: continuity of protective conductors (including CPC continuity and R1+R2 values for the circuit), insulation resistance of the circuit (minimum 1 MΩ at 500 V d.c. for circuits up to 500 V), polarity verification, earth fault loop impedance (Zs) at the furthest point of the circuit, and confirmation that the RCD operates within the required time if the circuit is RCD-protected. You do not need to test every circuit in the installation — only the circuit that has been worked on. However, you should also verify that the existing installation does not present any immediate danger.',
  },
  {
    question: 'Can an apprentice sign a Minor Works certificate?',
    answer:
      'No. A Minor Works certificate must be signed by a competent person who takes responsibility for the design, construction, inspection, and testing of the work. Under BS 7671, this means the person signing the certificate must have the technical knowledge, skill, and experience to carry out the work safely and correctly. An apprentice may carry out the physical installation work under the supervision of a qualified electrician, but the certificate must be signed by the supervising electrician or another competent person within the company who has verified the work. The certificate carries legal liability, so the signatory must be confident that the work complies with BS 7671.',
  },
];

const howToSteps = [
  {
    name: 'Open the Minor Works form in Elec-Mate',
    text: 'Navigate to Certificates in the Elec-Mate app and select Minor Electrical Installation Works Certificate. The form opens with your company details and personal information pre-filled from your profile, saving time on every job.',
  },
  {
    name: 'Enter the client and installation details',
    text: 'Fill in the client name, address, and the description of the installation. Use the address auto-complete to speed up data entry. Add the date of the work and the circuit details — which distribution board and circuit number the work relates to.',
  },
  {
    name: 'Describe the minor works carried out',
    text: 'Enter a clear description of the work completed. For example: "Addition of 1 no. double socket outlet to existing ring final circuit in kitchen, wired in 2.5 mm² twin and earth cable, Method C clipped direct." Be specific enough that another electrician could understand the scope of work from the description alone.',
  },
  {
    name: 'Record the test results',
    text: 'Enter the test results for the circuit: continuity of protective conductors (R1+R2), insulation resistance (IR), polarity, earth fault loop impedance (Zs), and RCD operation time if applicable. Elec-Mate validates your entries against BS 7671 limits and highlights any values that fall outside acceptable ranges.',
  },
  {
    name: 'Add observations and recommendations',
    text: 'Record any observations about the existing installation using the standard classification codes: C1 (danger present), C2 (potentially dangerous), C3 (improvement recommended), or FI (further investigation required). Elec-Mate provides a library of BS 7671 compliant observation phrases to ensure consistency.',
  },
  {
    name: 'Sign and export the certificate',
    text: 'Apply your digital signature using the built-in signature pad. Review the completed certificate preview, then export as a professional PDF. The certificate can be emailed directly to the client, shared via WhatsApp, or saved to your certificate archive for future reference.',
  },
];

const features = [
  {
    icon: Clock,
    title: 'Complete in Under 3 Minutes',
    description:
      'Smart auto-fill pre-populates your company details, personal information, and common field values. Spend less time on paperwork and more time on the tools.',
  },
  {
    icon: PenTool,
    title: 'Digital Signatures',
    description:
      'Built-in signature pad captures your signature on screen. No printing, signing, and scanning. Sign on site and send immediately.',
  },
  {
    icon: Shield,
    title: 'BS 7671 Compliant Observations',
    description:
      'Library of pre-written observation phrases using correct C1, C2, C3, and FI classification codes. Every observation references the relevant BS 7671 regulation number.',
  },
  {
    icon: Download,
    title: 'Instant PDF Export',
    description:
      'Generate a professional, branded PDF certificate in one tap. Emailed directly to the client or shared via WhatsApp from the job site.',
  },
  {
    icon: Smartphone,
    title: 'Works Offline on Site',
    description:
      'Start certificates even without signal. Data saves locally and syncs to the cloud automatically when connectivity returns. Never lose work on site.',
  },
  {
    icon: ClipboardCheck,
    title: 'Test Result Validation',
    description:
      'Automatic validation of all test results against BS 7671 limits. Flags insulation resistance below 1 MΩ, high Zs values, and slow RCD trip times before you sign off.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Minor Works Certificate',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Create Minor Electrical Installation Works Certificates on site in minutes. Auto-fill, digital signatures, BS 7671 compliant observations, and instant PDF export.',
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
  name: 'How to Create a Minor Works Certificate with Elec-Mate',
  description:
    'Step-by-step guide to creating a Minor Electrical Installation Works Certificate using the Elec-Mate app, from opening the form to exporting the signed PDF.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function MinorWorksCertificatePage() {
  useSEO({
    title: 'Minor Works Certificate App | Digital EWC Form',
    description:
      'Create Minor Works certificates on site in minutes. Auto-fill, digital signatures, BS 7671 compliant observations, and instant PDF export. Part of 8 certificate types.',
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
            Minor Works Certificate App
            <span className="block text-yellow-400 mt-1">Digital EWC Form</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Create Minor Electrical Installation Works Certificates on site in minutes. Auto-fill company details, capture digital signatures, and export professional PDFs instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Create Your First Certificate Free
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

      {/* What Are Minor Works */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Are Minor Electrical Works?</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Minor electrical installation works are additions or alterations to an existing electrical circuit that do not involve the provision of a new circuit. BS 7671 Regulation 631.2 requires that a Minor Electrical Installation Works Certificate be issued upon completion of such work to confirm that the addition or alteration complies with the current edition of the wiring regulations.
            </p>
            <p>
              Common examples of minor works include adding a socket outlet to an existing ring final circuit, extending a lighting circuit to include an additional light point, replacing a consumer unit where no new circuits are added, installing a fused connection unit (FCU) to supply a fixed appliance from an existing circuit, and repositioning an existing accessory. Each of these involves work on an existing circuit without creating a new one, which is the defining characteristic of minor works.
            </p>
            <p>
              The term "minor" can be misleading. It does not mean the work is insignificant or that corners can be cut. The work must still comply fully with BS 7671, the contractor must be competent, and proper inspection and testing must be carried out. The "minor" classification simply refers to the scope of the electrical work (an alteration to an existing circuit) rather than its importance or complexity.
            </p>
            <p>
              It is worth noting that Regulation 620.3 of BS 7671 states that where the minor work is limited to replacing accessories such as socket outlets, light switches, or ceiling roses in the same location with the same type, no Minor Works certificate is required — provided the circuit protective conductor is verified as continuous and the polarity is confirmed. This is a like-for-like replacement and is not classified as minor works.
            </p>
          </div>
        </div>
      </section>

      {/* When to Use Minor Works vs EIC */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Eye className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Minor Works Certificate vs EIC — When to Use Each</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The choice between issuing a Minor Electrical Installation Works Certificate and a full Electrical Installation Certificate (EIC) depends on whether new circuits are being installed. Understanding the distinction is essential for compliance and avoiding potential liability issues.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-bold text-white text-lg">Minor Works Certificate</h3>
                </div>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Adding a socket to an existing ring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Extending a lighting circuit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Adding an FCU to an existing circuit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Repositioning an accessory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Consumer unit replacement (no new circuits)</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-bold text-white text-lg">Full EIC Required</h3>
                </div>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>New radial circuit for a shower</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>New dedicated cooker circuit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>Complete rewire of a property</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>New garden or outbuilding circuit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>EV charger installation (new circuit)</span>
                  </li>
                </ul>
              </div>
            </div>
            <p>
              A useful rule of thumb: if you are running a new cable from the distribution board with a new protective device (MCB or RCBO), you are installing a new circuit and need an EIC. If you are connecting into an existing circuit at any point, it is minor works and requires an EWC. There are edge cases — for instance, replacing a consumer unit is technically an alteration to existing circuits and many contractors issue a Minor Works certificate for each circuit, though some scheme providers require an EIC in this situation. Check with your registration body if in doubt.
            </p>
          </div>
        </div>
      </section>

      {/* Part P and Notifiable Work */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Shield className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Part P Building Regulations and Minor Works</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              In England and Wales, Approved Document P of the Building Regulations governs electrical safety in dwellings. It requires that electrical installation work in dwellings is carried out by a person who is competent, and that certain types of work are notified to the local authority building control body. This notification requirement is separate from the requirement to issue certificates under BS 7671, but the two are closely linked in practice.
            </p>
            <p>
              <strong className="text-yellow-400">Notifiable work</strong> in dwellings includes: the installation of a new circuit; the replacement of a consumer unit; and any electrical work in a special location such as a bathroom, room containing a shower, or swimming pool area. If you are registered with a government-approved competent person scheme — such as NICEIC, NAPIT, ELECSA, STROMA, or BRE — you can self-certify notifiable work by submitting the relevant BS 7671 certificate to your scheme provider, who will issue a Building Regulations Compliance Certificate on your behalf. The cost is typically covered by your annual registration fee.
            </p>
            <p>
              <strong className="text-yellow-400">Non-notifiable work</strong> includes most minor works outside special locations: adding a socket to an existing circuit, extending a lighting circuit, replacing accessories, and similar alterations. These still require a Minor Works certificate under BS 7671, but you do not need to notify building control. The certificate serves as the record of compliance and should be given to the client.
            </p>
            <p>
              In Scotland, the rules differ. The Building (Scotland) Regulations apply, and there is no direct equivalent of Part P. Electrical work must comply with BS 7671 and a building warrant may be required for certain types of work. In Northern Ireland, Part P of the Building Regulations (Northern Ireland) applies, with similar but not identical requirements to England and Wales. Always check the specific regulations for the nation in which you are working.
            </p>
          </div>
        </div>
      </section>

      {/* What Goes on the Form */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <FileText className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Goes on a Minor Works Certificate?</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The Minor Electrical Installation Works Certificate form, as specified in BS 7671 Appendix 6, is divided into several sections. Each section must be completed in full for the certificate to be valid. Understanding what goes in each section ensures your certificates are complete and stand up to scrutiny from scheme inspectors and building control.
            </p>
            <div className="space-y-4 my-6">
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">Part 1: Description of Minor Works</h3>
                <p className="text-white text-sm leading-relaxed">
                  The address and details of the installation, the description of the work carried out, the date of completion, and the details of the person ordering the work. The description of works should be specific and clear — for example, "Addition of 1 no. double switched socket outlet to existing ring final circuit in lounge, cable routed under floorboards, Method B reference." Vague descriptions such as "electrical work" are insufficient and will be flagged by scheme inspectors.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">Part 2: Installation Details</h3>
                <p className="text-white text-sm leading-relaxed">
                  The system type (TN-S, TN-C-S, or TT), the method of protection against indirect contact (usually automatic disconnection of supply), the protective device details for the circuit (type, rating, and short-circuit capacity of the MCB, RCBO, or fuse), and the earthing and bonding arrangements. Record the supply characteristics: nominal voltage, prospective fault current at the origin, and the external earth fault loop impedance (Ze).
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">Part 3: Circuit Details</h3>
                <p className="text-white text-sm leading-relaxed">
                  The circuit number, the distribution board it is connected to, the cable type and size used, the reference method of installation, the circuit protective device rating, and the maximum permitted disconnection time. For a ring final circuit addition, note that the cable size must match the existing ring cable (typically 2.5 mm² for a 32 A ring).
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">Part 4: Test Results</h3>
                <p className="text-white text-sm leading-relaxed">
                  Record the test instrument serial numbers and calibration dates, then enter the test results: continuity of protective conductors (R1+R2), insulation resistance (must be at least 1 MΩ at 500 V d.c. for standard circuits), correct polarity confirmed, earth fault loop impedance (Zs) at the furthest point of the circuit, and RCD test results (operating time and test current) where applicable. All values must meet the limits in BS 7671.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <h3 className="font-bold text-yellow-400 text-lg mb-2">Part 5: Declaration and Signatures</h3>
                <p className="text-white text-sm leading-relaxed">
                  The certificate must be signed by the person responsible for the design, construction, inspection, and testing of the work. Unlike a full EIC, the Minor Works certificate has a single combined signature block because the same person typically carries out all aspects of the work. Include your name, signature, registration number (e.g. NICEIC enrolment number), company name, address, and date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How-To Section */}
      <section id="how-it-works" className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CheckCircle2 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How to Create a Minor Works Certificate — Step by Step</h2>
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
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ClipboardCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">All 8 Certificate Types in Elec-Mate</h2>
          </div>
          <p className="text-white mb-6 leading-relaxed">
            The Minor Works certificate is one of eight electrical certificate types available in Elec-Mate. Each follows BS 7671 Appendix 6 model forms and includes auto-fill, digital signatures, and PDF export.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                name: 'Minor Electrical Installation Works Certificate',
                desc: 'For additions and alterations to existing circuits without new circuit installation.',
                highlight: true,
              },
              {
                name: 'Electrical Installation Certificate (EIC)',
                desc: 'For new installations and new circuits, including rewires and new builds.',
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
      <section className="py-16 px-5">
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
      <section className="py-16 px-5 bg-white/[0.02]">
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
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Common Mistakes on Minor Works Certificates</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Scheme inspectors consistently flag the same issues on Minor Works certificates. Understanding these common mistakes helps you avoid them and ensures your certificates pass inspection first time.
            </p>
            <ul className="space-y-3 my-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Vague description of works</strong> — "Fitted extra socket" is insufficient. Include the quantity, type, circuit, cable size, and method of installation. Elec-Mate provides description templates to help.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Missing test results</strong> — All mandatory tests must be recorded. Leaving the insulation resistance or Zs fields blank invalidates the certificate.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Incorrect Zs values</strong> — Recording the Zs at the distribution board instead of the furthest point of the circuit. The reading must be taken at the most remote accessory.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Not recording RCD test results</strong> — If the circuit is protected by an RCD (which most circuits now are), the trip time and test current must be recorded.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Using an EWC when an EIC is needed</strong> — If a new circuit is being installed (even a simple radial), a full EIC is required. The Minor Works form is only for additions and alterations to existing circuits.
                </span>
              </li>
            </ul>
            <p>
              Elec-Mate helps prevent these mistakes with built-in validation. The app flags incomplete fields, checks test results against BS 7671 limits, and prompts you for RCD results when an RCD protective device is selected. This reduces defects on scheme inspections and gives your clients confidence in your professionalism.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Create Professional Certificates in Minutes"
        subheading="Join 430+ UK electricians using Elec-Mate for on-site certification. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
