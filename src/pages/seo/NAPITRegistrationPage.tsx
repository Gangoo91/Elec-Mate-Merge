import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Award,
  ClipboardCheck,
  PoundSterling,
  FileCheck2,
  ShieldCheck,
  GraduationCap,
  Zap,
  Clock,
  Users,
  Briefcase,
  BookOpen,
  Settings,
  Calculator,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'NAPIT Registration', href: '/guides/napit-registration' },
];

const tocItems = [
  { id: 'what-is-napit', label: 'What Is NAPIT?' },
  { id: 'schemes-available', label: 'Schemes Available' },
  { id: 'application-process', label: 'Application Process' },
  { id: 'assessment', label: 'The Assessment' },
  { id: 'costs', label: 'Costs & Fees' },
  { id: 'benefits', label: 'Benefits of NAPIT' },
  { id: 'renewal', label: 'Renewal & Ongoing' },
  { id: 'napit-vs-others', label: 'NAPIT vs Other Schemes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "NAPIT is one of the UK's leading competent person scheme providers, enabling electricians to self-certify notifiable electrical work under Part P of the Building Regulations without involving building control.",
  'The application process involves submitting your qualifications, completing a desk-based assessment of your certification work, and passing a practical on-site assessment. Most applications are completed within 4-8 weeks.',
  'NAPIT membership costs approximately GBP 400-700 per year depending on the scheme and number of disciplines. This is a legitimate business expense that pays for itself through the ability to self-certify work.',
  'Schemes available include domestic installer, commercial installer, fire detection and alarm, emergency lighting, unvented hot water, and EV charger installation — allowing you to expand your service offering.',
  'NAPIT provides technical support, compliance documentation templates, building control notification services, and professional development resources as part of your membership.',
];

const faqs = [
  {
    question: 'What qualifications do I need to join NAPIT?',
    answer:
      'To join NAPIT as a domestic electrical installer, you need the 18th Edition (BS 7671:2018+A3:2024, C&G 2382), an inspection and testing qualification (C&G 2391 or C&G 2394/2395), and evidence of practical competence. This can come from a Level 3 NVQ in Electrotechnical Services with AM2 assessment, or from demonstrable experience as a qualified electrician. If you have been working as a qualified electrician for some years but do not hold a formal NVQ, NAPIT may accept a portfolio of evidence demonstrating your competence — though this route is assessed on a case-by-case basis. For the commercial and specialist schemes, additional qualifications may be required depending on the specific discipline.',
  },
  {
    question: 'How long does NAPIT registration take?',
    answer:
      "The typical timeline from initial application to receiving your NAPIT registration is 4-8 weeks. This includes the desk-based assessment of your paperwork (usually 1-2 weeks), scheduling and completing the on-site assessment (which depends on your and the assessor's availability — typically 2-4 weeks after desk approval), and processing the results and issuing your registration (1-2 weeks). You can speed up the process by ensuring your application is complete and accurate from the outset, having all required certificates and documents ready for the assessor, and having a current job available for the on-site assessment. Incomplete applications or missing documentation are the most common causes of delay.",
  },
  {
    question: 'How much does NAPIT membership cost?',
    answer:
      'NAPIT membership fees for a single domestic electrical installer scheme are approximately GBP 400-500 per year (fees are reviewed annually). If you want to add additional schemes — such as fire detection and alarm, emergency lighting, or EV charger installation — each additional discipline typically adds GBP 50-150 per year. There is also an initial joining fee that covers your first assessment, typically around GBP 200-350. These costs are a legitimate business expense and are tax-deductible for self-employed electricians. Many electricians find that the ability to self-certify notifiable work — rather than paying building control fees of GBP 150-300 per job — means the membership pays for itself within a few jobs.',
  },
  {
    question: 'What happens during the NAPIT on-site assessment?',
    answer:
      'The NAPIT on-site assessment involves an assessor visiting you on a current job to evaluate your practical competence. The assessor will typically review your completed installation work, check that it complies with BS 7671, inspect your test results and certification, observe your testing and inspection procedures, review your test equipment calibration, and check your understanding of key regulations. The assessment is not designed to catch you out — it is a professional evaluation of your competence as a working electrician. If your work is to a good standard and your paperwork is thorough, you should pass comfortably. If the assessor identifies issues, you will receive feedback and may be given the opportunity to address them before a final decision is made.',
  },
  {
    question: 'Can I join NAPIT without an NVQ or AM2?',
    answer:
      'NAPIT may accept applications from experienced electricians who do not hold a formal NVQ Level 3 or AM2, provided they can demonstrate equivalent competence through other means. This might include holding the 18th Edition (C&G 2382), an inspection and testing qualification (C&G 2391), and substantial documented work experience. However, the assessment may be more rigorous in these cases, and you may need to provide a portfolio of evidence demonstrating your practical competence. The AM2 assessment is the standard benchmark for practical competence in the UK, so if you do not hold it, NAPIT will need to be satisfied through other evidence that your practical skills are equivalent. Contact NAPIT directly to discuss your specific qualifications and experience before applying.',
  },
  {
    question: 'What is the difference between NAPIT and NICEIC?',
    answer:
      'Both NAPIT and NICEIC are government-authorised competent person scheme providers for electrical work. They serve the same fundamental purpose — enabling electricians to self-certify notifiable work under Part P of the Building Regulations. The main differences are in membership fees (NAPIT is generally slightly cheaper), assessment approach (both conduct on-site assessments but with slightly different formats), additional services (NICEIC has a larger brand presence and marketing support; NAPIT offers competitive technical support), and reputation (NICEIC is longer established and more widely recognised, though NAPIT has grown significantly and is fully equivalent in regulatory terms). Both are equally valid for self-certification purposes, and clients, building control, and estate agents should accept certificates from either scheme.',
  },
  {
    question: 'Do I need to be NAPIT registered to do electrical work?',
    answer:
      'You do not need to be registered with any competent person scheme to carry out electrical work in the UK. However, without scheme membership, you cannot self-certify notifiable work under Part P of the Building Regulations. This means that for notifiable work (which includes most work in domestic properties such as new circuits, consumer unit changes, and work in special locations like bathrooms and kitchens), you or your client would need to involve local authority building control at a cost of GBP 150-300 per notification. For non-notifiable work (like-for-like replacements, minor additions), scheme membership is not legally required but demonstrates professionalism and competence to clients.',
  },
];

const sections = [
  {
    id: 'what-is-napit',
    heading: 'What Is NAPIT?',
    content: (
      <>
        <p>
          NAPIT (National Association of Professional Inspectors and Testers) is one of the UK's
          leading competent person scheme providers for electrical installations. Founded in 1992,
          NAPIT is government-authorised to enable registered electricians to self-certify
          notifiable electrical work under Part P of the Building Regulations in England and Wales.
        </p>
        <p>
          In practical terms, NAPIT registration means you can carry out notifiable domestic
          electrical work — such as new circuits, consumer unit changes, bathroom installations, and
          kitchen rewires — and issue a building regulations compliance certificate directly,
          without needing to involve local authority building control. This saves your clients the
          building control notification fee (typically GBP 150-300 per job) and streamlines the
          process for everyone.
        </p>
        <p>
          NAPIT is one of several competent person scheme providers alongside{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/elecsa-registration">ELECSA</SEOInternalLink>, and others.
          All are equally valid in regulatory terms — the choice between them comes down to cost,
          service, and personal preference. NAPIT has built a strong reputation for competitive
          pricing, responsive technical support, and a straightforward assessment process.
        </p>
      </>
    ),
  },
  {
    id: 'schemes-available',
    heading: 'NAPIT Schemes Available',
    content: (
      <>
        <p>
          NAPIT offers several competent person schemes covering different aspects of electrical and
          building services work. You can join one scheme or multiple schemes depending on the range
          of work you carry out.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Available NAPIT Schemes</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Domestic Electrical Installer:</strong> The core scheme for electricians
                doing domestic work. Covers all Part P notifiable work in dwellings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Commercial Electrical Installer:</strong> For electricians working on
                commercial and industrial installations. Covers a broader range of non-domestic
                work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Fire Detection and Alarm (BS 5839):</strong> For design, installation,
                commissioning, and maintenance of fire alarm systems. Requires additional
                qualifications in fire alarm systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Emergency Lighting (BS 5266):</strong> For design, installation,
                commissioning, and testing of emergency lighting systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>EV Charger Installation:</strong> For the installation of electric vehicle
                charging points in domestic and commercial settings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Ventilation, Heating, and Renewable Energy:</strong> Additional disciplines
                covering unvented hot water, heat pumps, and other building services work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Many electricians start with the domestic electrical installer scheme and add additional
          disciplines as they expand their service offering. Each additional scheme increases the
          range of work you can self-certify, which in turn increases your earning potential and the
          value you offer to clients.
        </p>
        <SEOAppBridge
          title="Certificates for Every Scheme"
          description="Elec-Mate supports all the certificate types you need for NAPIT-registered work: EICR, EIC, Minor Works, EV Charger, Solar PV, Fire Alarm, Emergency Lighting, and PAT Testing. Complete and submit professional certificates from site."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'application-process',
    heading: 'NAPIT Application Process',
    content: (
      <>
        <p>
          The NAPIT application process is straightforward but requires preparation. Here is what to
          expect at each stage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Step-by-Step Application</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0 text-sm font-bold text-yellow-400">
                1
              </span>
              <span className="flex-1 text-left">
                <strong>Submit your application online:</strong> Complete the NAPIT application form
                on their website. You will need to provide personal details, business details (sole
                trader, partnership, or limited company), and the schemes you wish to register for.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0 text-sm font-bold text-yellow-400">
                2
              </span>
              <span className="flex-1 text-left">
                <strong>Upload your qualifications:</strong> Provide copies of your 18th Edition
                certificate (C&G 2382), inspection and testing certificate (C&G 2391 or 2394/2395),
                Level 3 NVQ or equivalent, AM2 pass certificate, and your ECS/JIB card.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0 text-sm font-bold text-yellow-400">
                3
              </span>
              <span className="flex-1 text-left">
                <strong>Provide insurance details:</strong> You must hold appropriate public
                liability insurance (minimum GBP 2 million is standard, though NAPIT may accept GBP
                1 million). You will need to provide your insurance certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0 text-sm font-bold text-yellow-400">
                4
              </span>
              <span className="flex-1 text-left">
                <strong>Desk-based assessment:</strong> NAPIT reviews your application,
                qualifications, and sample certificates. They may ask you to submit examples of
                recent EICRs, EICs, or Minor Works certificates for review.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0 text-sm font-bold text-yellow-400">
                5
              </span>
              <span className="flex-1 text-left">
                <strong>On-site assessment:</strong> A NAPIT assessor visits you on a current job to
                evaluate your practical competence, testing procedures, and certification quality.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0 text-sm font-bold text-yellow-400">
                6
              </span>
              <span className="flex-1 text-left">
                <strong>Registration confirmed:</strong> If you pass, your NAPIT registration is
                confirmed, you receive your ID card, and you can begin self-certifying notifiable
                work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The most common reason for delays or initial rejection is incomplete or poorly completed
          certification paperwork. Before applying, ensure your{' '}
          <SEOInternalLink href="/guides/eicr-certificate">EICRs</SEOInternalLink> and EICs are
          completed thoroughly and accurately. NAPIT assessors look at the quality of your paperwork
          as an indicator of the quality of your work.
        </p>
      </>
    ),
  },
  {
    id: 'assessment',
    heading: 'The NAPIT Assessment',
    content: (
      <>
        <p>
          The on-site assessment is the most important part of the NAPIT registration process. It is
          designed to verify that you are a competent, safe, and thorough electrician who can work
          to the required standard.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">What the Assessor Checks</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Installation quality:</strong> The assessor examines your current work for
                compliance with BS 7671, correct cable selection, proper terminations, labelling,
                and general workmanship.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Testing and inspection:</strong> You will be asked to demonstrate your
                testing procedures — safe isolation, continuity, insulation resistance, polarity,
                earth fault loop impedance, RCD testing. The assessor checks that you follow the
                correct testing sequence and use calibrated instruments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Certification quality:</strong> Your completed certificates (EICR, EIC,
                Minor Works) are reviewed for accuracy, completeness, and compliance with the
                current certificate format.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Regulation knowledge:</strong> The assessor may ask questions about BS 7671
                regulations relevant to the work being inspected — maximum Zs values, cable derating
                factors, RCD requirements, earthing arrangements, and so on.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Test equipment:</strong> Your test instruments must be in calibration
                (within date), in good condition, and accompanied by the relevant calibration
                certificates. GS38-compliant test leads are essential.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The assessment is professional, not adversarial. The assessor wants to confirm that you
          are competent and safe, not trip you up. If you are a competent electrician doing good
          work with proper documentation, you will pass. The best preparation is simply to maintain
          the standard of work and documentation you should be producing every day.
        </p>
        <SEOAppBridge
          title="Assessment-Ready Certificates"
          description="Elec-Mate's certificate templates follow the latest formats and ensure every field is completed correctly. Complete your EICR, EIC, and Minor Works certificates digitally with auto-save, validation prompts, and professional PDF output — exactly what NAPIT assessors want to see."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'NAPIT Costs and Fees',
    content: (
      <>
        <p>
          NAPIT membership involves an initial joining fee and annual renewal fees. Here is a
          breakdown of the typical costs involved.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            NAPIT Fee Structure (Approximate 2026)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Initial joining fee:</strong> GBP 200-350 (covers your first assessment and
                registration processing)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Annual membership (domestic electrical):</strong> GBP 400-500 per year
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Additional disciplines:</strong> GBP 50-150 per discipline per year (fire
                alarm, emergency lighting, EV, etc.)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Annual assessment fee:</strong> Included in membership (NAPIT conducts
                periodic assessments to maintain standards)
              </span>
            </li>
          </ul>
        </div>
        <p>
          These costs are a legitimate business expense and are tax-deductible for self-employed
          electricians. The return on investment is straightforward: each notifiable job you
          self-certify saves the building control notification fee (GBP 150-300 per job). If you
          carry out just 2-3 notifiable jobs per year, the membership pays for itself. Most active
          electricians do far more than that.
        </p>
        <p>
          When budgeting for NAPIT membership, also factor in the requirement for public liability
          insurance (GBP 200-600/year if you do not already hold it), calibrated test equipment, and
          any qualifications you still need to obtain. For a complete breakdown of the costs of{' '}
          <SEOInternalLink href="/guides/going-self-employed-electrician">
            going self-employed
          </SEOInternalLink>{' '}
          as an electrician, including scheme membership, see our dedicated guide.
        </p>
      </>
    ),
  },
  {
    id: 'benefits',
    heading: 'Benefits of NAPIT Membership',
    content: (
      <>
        <p>
          Beyond the ability to self-certify notifiable work, NAPIT membership provides several
          practical benefits that support your business.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Membership Benefits</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Self-certification of notifiable work:</strong> Issue building regulations
                compliance certificates directly, saving your clients GBP 150-300 per job in
                building control fees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Technical helpline:</strong> Access to NAPIT's technical support team for
                regulation queries, compliance questions, and guidance on complex installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Find a Contractor listing:</strong> Your business is listed on the NAPIT
                Find a Contractor directory, which consumers and other trades use to find registered
                electricians.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Compliance documentation:</strong> Access to up-to-date certificate
                templates, technical bulletins, and guidance documents to keep your work compliant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Professional credibility:</strong> NAPIT registration demonstrates to
                clients, estate agents, solicitors, and other professionals that you are a vetted,
                competent electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Building control notification service:</strong> NAPIT handles the building
                control notification process on your behalf, submitting notifications electronically
                and providing compliance certificates to local authorities.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The technical helpline alone is worth the membership fee for many electricians. Having
          access to expert guidance on complex regulation questions can save hours of research and
          give you confidence when dealing with unusual installations or client queries.
        </p>
      </>
    ),
  },
  {
    id: 'renewal',
    heading: 'Renewal and Ongoing Requirements',
    content: (
      <>
        <p>
          NAPIT membership is renewed annually. To maintain your registration, you must meet several
          ongoing requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Ongoing Requirements</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Annual fee payment:</strong> Pay your annual membership fee on time. NAPIT
                typically sends renewal notices 4-6 weeks before your renewal date.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Periodic assessment:</strong> NAPIT conducts periodic on-site assessments
                (typically annually) to verify that your work continues to meet the required
                standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Current qualifications:</strong> You must keep your 18th Edition
                qualification current. When amendments to BS 7671 are published, you need to
                complete the update training within the specified timeframe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Valid insurance:</strong> Maintain current public liability insurance and
                provide updated certificates to NAPIT when your policy renews.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Calibrated test equipment:</strong> Your test instruments must remain within
                calibration dates. Most manufacturers recommend annual calibration.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If your work standard falls below expectations during a periodic assessment, NAPIT will
          provide feedback and a timeframe to address the issues. Repeated failures or serious
          non-compliance can result in membership suspension. However, the vast majority of members
          pass their annual assessments without difficulty — the key is maintaining consistent
          quality in both your installations and your paperwork.
        </p>
        <SEOAppBridge
          title="Stay Compliant with Elec-Mate"
          description="Keep your qualifications current with Elec-Mate's 18th Edition revision course, maintain impeccable certification with digital templates, and track your CPD hours automatically. Everything you need to pass your annual NAPIT assessment with confidence."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'napit-vs-others',
    heading: 'NAPIT vs Other Competent Person Schemes',
    content: (
      <>
        <p>
          NAPIT is one of several competent person scheme providers. Here is how it compares to the
          main alternatives.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Scheme Comparison</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>
                  NAPIT vs <SEOInternalLink href="/guides/niceic-vs-napit">NICEIC</SEOInternalLink>:
                </strong>{' '}
                NICEIC is the oldest and most recognised scheme. NAPIT is generally cheaper with
                equally responsive technical support. Both are fully equivalent in regulatory terms.
                NICEIC has stronger brand recognition with consumers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>
                  NAPIT vs{' '}
                  <SEOInternalLink href="/guides/elecsa-registration">ELECSA</SEOInternalLink>:
                </strong>{' '}
                ELECSA is another competent person scheme, now part of the same group as NICEIC.
                NAPIT and ELECSA are broadly comparable in terms of fees and services. The choice
                often comes down to which scheme your local assessor or colleagues recommend.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>All schemes vs no scheme:</strong> Without scheme membership, you cannot
                self-certify notifiable work and must involve building control (GBP 150-300 per
                job). For any electrician doing regular domestic work, scheme membership is
                effectively essential.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The bottom line is that all government-authorised competent person schemes are equivalent
          in legal terms. A NAPIT certificate carries the same weight as a NICEIC certificate or an
          ELECSA certificate. Choose the scheme that offers the best combination of cost, service,
          and convenience for your particular situation. For a detailed comparison, see our{' '}
          <SEOInternalLink href="/guides/niceic-vs-napit">NICEIC vs NAPIT guide</SEOInternalLink>.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/niceic-vs-napit',
    title: 'NICEIC vs NAPIT',
    description:
      'Detailed comparison of the two leading competent person schemes for electricians.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/niceic-registration',
    title: 'NICEIC Registration Guide',
    description: 'Complete guide to joining NICEIC — application, assessment, costs, and benefits.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/elecsa-registration',
    title: 'ELECSA Registration Guide',
    description: 'How to apply for ELECSA membership — process, requirements, and fees.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/competent-person-scheme',
    title: 'Competent Person Schemes',
    description:
      'Overview of all competent person schemes for electrical work in England and Wales.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'What Part P means for electricians — notifiable work, compliance, and self-certification.',
    icon: FileCheck2,
    category: 'Regulations',
  },
  {
    href: '/guides/going-self-employed-electrician',
    title: 'Going Self-Employed',
    description:
      'Complete guide to setting up as a self-employed electrician — insurance, schemes, and tax.',
    icon: Briefcase,
    category: 'Business Guide',
  },
];

export default function NAPITRegistrationPage() {
  return (
    <GuideTemplate
      title="NAPIT Registration Guide | How to Join & What It Costs (2026)"
      description="Complete guide to NAPIT registration for UK electricians. Application process, on-site assessment, costs, schemes available, benefits, renewal requirements, and how NAPIT compares to NICEIC and ELECSA."
      datePublished="2024-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Registration Guide"
      badgeIcon={Award}
      heroTitle={
        <>
          NAPIT Registration:{' '}
          <span className="text-yellow-400">How to Join and What to Expect</span>
        </>
      }
      heroSubtitle="A complete, practical guide to joining NAPIT as a registered electrician. Everything from the application form to the on-site assessment, what it costs, and how NAPIT compares to NICEIC and ELECSA."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About NAPIT Registration"
      relatedPages={relatedPages}
      ctaHeading="Prepare for your NAPIT assessment"
      ctaSubheading="Professional digital certificates, 70+ BS 7671 calculators, and 18th Edition revision. Everything you need to demonstrate competence during your NAPIT assessment."
    />
  );
}
