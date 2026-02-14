import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  ShieldCheck,
  FileCheck2,
  ClipboardCheck,
  GraduationCap,
  Building2,
  FileText,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'NICEIC Registration 2026 | How to Join & Requirements';
const PAGE_DESCRIPTION =
  'Complete guide to NICEIC registration in 2026. Registration types (Domestic Installer, Approved Contractor), qualification requirements, costs, application process, initial assessment, and ongoing compliance. Comparison with NAPIT and ELECSA.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'NICEIC Registration', href: '/guides/niceic-registration' },
];

const tocItems = [
  { id: 'what-is-niceic', label: 'What Is NICEIC?' },
  { id: 'registration-types', label: 'Registration Types' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'application-process', label: 'Application Process' },
  { id: 'costs', label: 'Costs' },
  { id: 'initial-assessment', label: 'Initial Assessment' },
  { id: 'ongoing-compliance', label: 'Ongoing Compliance' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'niceic-vs-napit-elecsa', label: 'NICEIC vs NAPIT & ELECSA' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'NICEIC (National Inspection Council for Electrical Installation Contracting) is the largest competent person scheme for electricians in the UK, allowing self-certification of notifiable domestic electrical work under Part P.',
  'There are two main registration types: Domestic Installer (for domestic-only electricians, lower cost) and Approved Contractor (for all electrical work including commercial, higher credibility).',
  'Registration requires appropriate qualifications (18th Edition, 2391 or equivalent), relevant experience, adequate premises, calibrated test instruments, and public liability insurance.',
  'Annual registration fees range from approximately 300 to 600 pounds or more depending on the scheme type, with additional costs for the initial assessment visit.',
  'Elec-Mate certificates meet NICEIC scheme requirements with professional PDF output, BS 7671 compliance, and all 8 certificate types ready for upload to the NICEIC portal.',
];

const faqs = [
  {
    question: 'What qualifications do I need for NICEIC Domestic Installer registration?',
    answer:
      'To register as an NICEIC Domestic Installer, you need a current edition qualification — the 18th Edition of the IET Wiring Regulations (City & Guilds 2382 or equivalent). You also need an inspection and testing qualification such as City & Guilds 2391 (Inspection and Testing of Electrical Installations) or the older 2394/2395 equivalents. In addition, you need a relevant NVQ Level 3 in Electrical Installation or equivalent (such as City & Guilds 2357 or 2365 with AM2 assessment). Some applicants with significant verifiable experience but older qualifications may be accepted on a case-by-case basis, but NICEIC will always require demonstration of current competence. You must also hold valid public liability insurance with a minimum cover of 2 million pounds.',
  },
  {
    question: 'How much does NICEIC registration cost per year?',
    answer:
      'NICEIC registration costs vary by scheme type and are subject to annual review. As of 2026, the Domestic Installer scheme typically costs in the region of 300 to 400 pounds per year, while the Approved Contractor scheme costs approximately 500 to 650 pounds per year. There is also a one-off initial assessment fee, which is typically between 300 and 500 pounds. This covers the assessor visit to your premises and the review of your qualifications, test instruments, and sample work. Additional costs may apply for supplementary registrations such as the NICEIC Fire Detection and Alarm scheme or the Unvented Hot Water scheme. These figures are approximate and you should confirm the current fees directly with NICEIC before applying.',
  },
  {
    question: 'What happens during the NICEIC initial assessment visit?',
    answer:
      'The initial assessment visit is carried out by an NICEIC assessor at your business premises. The assessor will verify your qualifications and those of any qualified supervisors or operatives. They will check that your test instruments are calibrated and within their calibration date — typically you need a multifunction tester, a voltage indicator complying with GS38, and an RCD tester (if not integrated into the MFT). The assessor will review samples of your recent work, including completed certificates and the associated test results. They may ask to visit a recent job site to inspect the quality of your installation work. The assessor will also verify your insurance documentation, check your understanding of current regulations including BS 7671:2018+A3:2024, and confirm that you have adequate working premises (this does not mean you need an office — a home address is acceptable provided you have space for records and administration). The assessment typically takes 2 to 4 hours.',
  },
  {
    question: 'Can I register with NICEIC if I work from home?',
    answer:
      'Yes, you can register with NICEIC if you work from home. NICEIC does not require you to have a commercial office or workshop. However, you must have adequate facilities for maintaining records, storing certificates, and carrying out administrative functions. You must also have a fixed business address for correspondence (which can be your home address). Many sole traders and small electrical firms operate from home and are registered with NICEIC without issue. The key requirement is demonstrating competence and compliance, not the size or type of your premises.',
  },
  {
    question: 'How long does NICEIC registration take from application to approval?',
    answer:
      'The NICEIC registration process typically takes 4 to 8 weeks from the date of your initial application to receiving confirmation of registration. This includes the time for NICEIC to process your application, verify your qualifications and insurance, schedule the initial assessment visit, and review the assessment report. The timeline can vary depending on the volume of applications, the availability of assessors in your area, and whether any additional information or clarification is required. If the assessor identifies any issues during the initial assessment — for example, incomplete certificates, out-of-date calibration on test instruments, or gaps in knowledge — you will be given the opportunity to address these issues before the registration is confirmed, which may extend the timeline.',
  },
  {
    question: 'What is the difference between NICEIC Domestic Installer and Approved Contractor?',
    answer:
      'The NICEIC Domestic Installer scheme is designed for electricians who work exclusively on domestic properties. It allows self-certification of notifiable electrical work under Part P of the Building Regulations in dwellings. The Approved Contractor scheme covers all types of electrical installation work — domestic, commercial, and industrial. Approved Contractors can self-certify domestic work under Part P and are also recognised for commercial and industrial contracts where clients or main contractors require evidence of competent person scheme registration. The Approved Contractor scheme involves more rigorous assessment requirements and higher annual fees, but it provides greater commercial credibility, particularly when tendering for larger projects, working for local authorities or housing associations, or subcontracting to main contractors on commercial projects. If you work exclusively on houses and flats, the Domestic Installer scheme is sufficient. If you do any commercial or industrial work, you need the Approved Contractor scheme.',
  },
  {
    question: 'Do I need to be NICEIC registered to do electrical work?',
    answer:
      'No. There is no legal requirement in the UK to be registered with NICEIC or any other competent person scheme to carry out electrical work. Any competent person can carry out electrical installation work. However, if the work is notifiable under Part P of the Building Regulations (which applies in England to domestic properties), it must either be self-certified by a registered scheme member or notified to the local authority building control department before it starts. Without scheme registration, you must notify building control for every notifiable job, which adds a fee (typically 250 to 400 pounds per job) and requires a building control inspection. In practice, most professional electricians find that the annual registration fee for a competent person scheme is far more cost-effective than paying building control fees for each individual job. Scheme registration also provides significant commercial benefits — many clients, estate agents, and letting agents will only use NICEIC or NAPIT registered electricians.',
  },
];

const sections = [
  {
    id: 'what-is-niceic',
    heading: 'What Is NICEIC?',
    content: (
      <>
        <p>
          NICEIC stands for the National Inspection Council for Electrical Installation Contracting.
          It is the largest and most widely recognised competent person scheme for electricians in
          the United Kingdom. Established in 1956, NICEIC operates as an independent, voluntary
          regulatory body that assesses the competence of electrical contractors and allows
          registered members to self-certify certain types of electrical installation work as
          complying with building regulations.
        </p>
        <p>
          NICEIC registration is not a qualification — it is a mark of assessed competence.
          Registration demonstrates that an electrician or electrical contracting firm has been
          independently assessed and found to meet the technical, commercial, and professional
          standards required by NICEIC. This includes holding the correct qualifications,
          maintaining calibrated test instruments, having adequate public liability insurance, and
          producing work that complies with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the 18th Edition of the IET Wiring Regulations).
        </p>
        <p>
          NICEIC is one of several Government-authorised competent person schemes approved under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>
          . Part P applies to electrical work in dwellings in England and requires that notifiable
          work is either self-certified by a registered scheme member or notified to the local
          authority building control department. NICEIC registration allows electricians to
          self-certify their domestic work without the cost and delay of building control
          involvement.
        </p>
      </>
    ),
  },
  {
    id: 'registration-types',
    heading: 'NICEIC Registration Types',
    content: (
      <>
        <p>
          NICEIC offers two main registration types for electrical contractors. The choice between
          them depends on the type of work you carry out and the markets you serve.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Domestic Installer Scheme</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            The Domestic Installer scheme is designed for electricians who work exclusively on
            domestic properties — houses, flats, bungalows, and maisonettes. It provides
            self-certification ability for notifiable electrical work under Part P of the Building
            Regulations. This is the most popular scheme for sole traders and small firms who focus
            on domestic installations, rewires, consumer unit replacements, and periodic inspection
            and testing. The annual fee is lower than the Approved Contractor scheme, and the
            assessment requirements are proportionate to the scope of domestic work.
          </p>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Approved Contractor Scheme</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            The Approved Contractor scheme covers all types of electrical installation work —
            domestic, commercial, and industrial. Approved Contractors can self-certify domestic
            work under Part P and are also recognised for commercial and industrial contracts. This
            scheme carries higher credibility and is often required by main contractors, local
            authorities, housing associations, and commercial clients when appointing electrical
            subcontractors. The assessment is more rigorous and the annual fee is higher, but the
            commercial benefits are significant for firms that work across multiple sectors.
          </p>
        </div>
        <p>
          NICEIC also offers supplementary registrations for specialist work, including the Fire
          Detection and Alarm scheme (for BS 5839 work), the Unvented Hot Water scheme, and the
          Microgeneration scheme (for solar PV). These are add-ons to the main registration and
          carry additional assessment requirements and fees.
        </p>
      </>
    ),
  },
  {
    id: 'requirements',
    heading: 'Requirements for NICEIC Registration',
    content: (
      <>
        <p>
          NICEIC registration has specific requirements across five areas: qualifications,
          experience, premises, test instruments, and insurance. Meeting all five is essential for a
          successful application.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Qualifications</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                18th Edition IET Wiring Regulations (City & Guilds 2382 or equivalent) — this is the
                current edition qualification and is mandatory
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Inspection and Testing qualification (City & Guilds 2391, or the older 2394/2395) —
                required for carrying out and certifying periodic inspection and initial
                verification
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                NVQ Level 3 in Electrical Installation or equivalent (such as City & Guilds 2357 or
                2365 with AM2 assessment)
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">
            Experience, Premises, Instruments & Insurance
          </h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experience:</strong> You must demonstrate relevant, recent experience in
                electrical installation work. NICEIC will review your recent certificates and may
                ask to inspect completed work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Premises:</strong> A fixed business address for correspondence and record
                keeping. A home address is acceptable. No requirement for a commercial office or
                workshop.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test instruments:</strong> Calibrated multifunction tester (MFT),
                GS38-compliant voltage indicator, and RCD tester. All instruments must be within
                their calibration date. Calibration is typically required annually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance:</strong> Public liability insurance with a minimum cover of 2
                million pounds. Some scheme types or client requirements may specify higher cover (5
                million or 10 million pounds).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'application-process',
    heading: 'Application Process',
    content: (
      <>
        <p>
          The NICEIC application process is straightforward but thorough. It is designed to verify
          that you meet all the requirements before the assessment visit is scheduled.
        </p>
        <p>
          You begin by completing the online application form on the NICEIC website, selecting your
          scheme type (Domestic Installer or Approved Contractor). You upload copies of your
          qualifications, your public liability insurance certificate, and your test instrument
          calibration certificates. You provide details of your business — trading name, address,
          company registration (if applicable), and the names and qualifications of all qualified
          supervisors and operatives.
        </p>
        <p>
          Once NICEIC has reviewed your application and verified your documentation, they schedule
          the initial assessment visit. This is carried out at your business premises (or home
          address if that is your registered business address) by an NICEIC assessor. The assessment
          typically takes 2 to 4 hours and covers your qualifications, instruments, recent work
          samples, and technical knowledge. If the assessment is satisfactory, your registration is
          confirmed within a few working days and you receive your NICEIC registration number,
          certificates, and access to the NICEIC contractor portal.
        </p>
        <SEOAppBridge
          title="Professional certificates ready for NICEIC"
          description="Elec-Mate generates BS 7671 compliant certificates in professional PDF format — ready to present at your NICEIC assessment or upload to the NICEIC contractor portal. All 8 certificate types with auto-validation and digital signatures."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'NICEIC Registration Costs',
    content: (
      <>
        <p>
          NICEIC registration costs include a one-off initial assessment fee and an annual
          registration fee. The exact figures are subject to annual review by NICEIC, but the
          following gives a realistic guide for 2026.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Domestic Installer</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                <strong>Initial assessment fee:</strong> approximately 300 to 400 pounds
              </li>
              <li>
                <strong>Annual registration fee:</strong> approximately 300 to 400 pounds per year
              </li>
              <li>
                <strong>Total first year:</strong> approximately 600 to 800 pounds
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Approved Contractor</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>
                <strong>Initial assessment fee:</strong> approximately 400 to 500 pounds
              </li>
              <li>
                <strong>Annual registration fee:</strong> approximately 500 to 650 pounds per year
              </li>
              <li>
                <strong>Total first year:</strong> approximately 900 to 1,150 pounds
              </li>
            </ul>
          </div>
        </div>
        <p>
          These costs are tax-deductible as a legitimate business expense. When you consider that
          building control notification fees (the alternative to self-certification) cost between
          250 and 400 pounds per job, NICEIC registration pays for itself after just two or three
          notifiable jobs per year. Most professional electricians complete far more than that.
        </p>
      </>
    ),
  },
  {
    id: 'initial-assessment',
    heading: 'The Initial Assessment Visit',
    content: (
      <>
        <p>
          The initial assessment is the most important step in the NICEIC registration process. It
          is your opportunity to demonstrate your competence to the assessor, and the assessor's
          opportunity to verify that your work, knowledge, and processes meet the required standard.
        </p>
        <p>
          During the assessment, the NICEIC assessor will review your qualifications and verify that
          they are current and relevant. They will check your test instruments — make, model, serial
          number, and calibration date. They will review samples of your recent electrical
          installation certificates, including{' '}
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            EICs, Minor Works Certificates, and EICRs
          </SEOInternalLink>
          . The assessor will check that your certificates are correctly completed, that test
          results are recorded accurately, and that the documentation meets BS 7671 requirements.
        </p>
        <p>
          The assessor may also ask you technical questions about current regulations, testing
          procedures, and safe working practices. They may ask to visit a recent job site to inspect
          the quality of your installation work. This is not a formal exam — it is a professional
          conversation designed to establish your level of competence and knowledge.
        </p>
        <p>
          If the assessor identifies any issues, you will be given the opportunity to address them
          before your registration is confirmed. Common issues include out-of-date instrument
          calibration, incomplete or incorrectly completed certificates, and gaps in knowledge of
          recent regulation changes (such as the requirements of Amendment 3).
        </p>
      </>
    ),
  },
  {
    id: 'ongoing-compliance',
    heading: 'Ongoing Compliance and Annual Assessment',
    content: (
      <>
        <p>
          NICEIC registration is not a one-off event. Once registered, you must maintain ongoing
          compliance with NICEIC requirements. This includes an annual assessment visit by an NICEIC
          assessor, who will review your work, certificates, instruments, and qualifications to
          confirm continued compliance.
        </p>
        <p>
          The annual assessment is similar to the initial assessment but typically focuses on work
          completed since the last visit. The assessor will review a sample of your certificates,
          check that your qualifications and insurance are still current, verify your instrument
          calibration dates, and may visit one or more job sites to inspect recent work. If
          deficiencies are found, you may be given a corrective action plan with a deadline for
          resolution. Persistent non-compliance can lead to suspension or removal from the register.
        </p>
        <p>
          You must also notify NICEIC of any changes to your business — changes of address, changes
          of qualified supervisor, changes of insurance provider, or any complaints or disputes
          related to your electrical work. All notifiable domestic work must be notified to NICEIC
          within 30 days of completion through the NICEIC contractor portal.
        </p>
        <SEOAppBridge
          title="Keep your certificate records assessment-ready"
          description="All certificates created in Elec-Mate are stored in the cloud permanently. Search by date, property, or client. Download professional PDFs any time for your NICEIC assessor. No more hunting through filing cabinets the night before an assessment."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'benefits',
    heading: 'Benefits of NICEIC Registration',
    content: (
      <>
        <p>
          NICEIC registration provides significant commercial and professional benefits that go
          beyond the ability to self-certify Part P work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <ul className="space-y-3 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P self-certification:</strong> Certify notifiable domestic work
                yourself without building control fees or inspections. Issue Building Regulations
                Compliance Certificates directly to homeowners.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer confidence:</strong> NICEIC is the most recognised electrical
                competent person scheme among homeowners. Being NICEIC registered immediately builds
                trust with potential clients.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed on NICEIC website:</strong> Your business appears in the NICEIC "Find
                a Contractor" directory, which receives millions of searches per year from
                homeowners looking for a registered electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical support:</strong> Access to the NICEIC technical helpline for
                regulation queries, interpretation of BS 7671, and guidance on complex
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Platinum Promise warranty:</strong> NICEIC's Platinum Promise provides a
                free insurance-backed warranty on domestic work, giving homeowners additional peace
                of mind and giving you a competitive advantage.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'niceic-vs-napit-elecsa',
    heading: 'NICEIC vs NAPIT and ELECSA',
    content: (
      <>
        <p>
          NICEIC is not the only competent person scheme for electricians. NAPIT (National
          Association of Professional Inspectors and Testers) and ELECSA are also
          Government-authorised schemes that provide the same self-certification ability under Part
          P. The choice between them depends on your priorities.
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">NICEIC</h3>
            <p className="text-white text-sm leading-relaxed">
              The largest and most recognised scheme. Highest consumer awareness. Premium pricing.
              Rigorous assessment. Best for electricians who want maximum credibility and work with
              commercial clients, main contractors, or housing associations.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">NAPIT</h3>
            <p className="text-white text-sm leading-relaxed">
              The second-largest scheme. Covers multiple trades (electrical, gas, plumbing, building
              fabric). Competitive pricing. Good for multi-trade contractors. Growing recognition
              among consumers. See our{' '}
              <SEOInternalLink href="/guides/napit-certificate-guide">
                NAPIT certificate guide
              </SEOInternalLink>{' '}
              for full details.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">ELECSA</h3>
            <p className="text-white text-sm leading-relaxed">
              A smaller but well-established scheme. Often the most competitively priced option.
              Popular with sole traders and smaller firms. Provides the same self-certification
              ability as NICEIC and NAPIT. Good technical support.
            </p>
          </div>
        </div>
        <p>
          All three schemes provide the same legal self-certification ability under Part P. A
          certificate issued by a NAPIT or ELECSA registered electrician has exactly the same legal
          standing as one issued by an NICEIC registered electrician. The differences are in brand
          recognition, cost, assessment rigour, and additional member benefits.
        </p>
        <SEOAppBridge
          title="Certificates that work with any scheme provider"
          description="Elec-Mate certificates are built to BS 7671:2018+A3:2024 and work with NICEIC, NAPIT, ELECSA, and BRE Certification. Professional PDF output meets all scheme provider requirements. Upload directly to any scheme portal."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/napit-certificate-guide',
    title: 'NAPIT Certificate Guide',
    description:
      'NAPIT registration categories, requirements, costs, and how Elec-Mate works with NAPIT.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Notifiable vs non-notifiable work, competent person schemes, and compliance requirements.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description:
      'All 8 UK electrical certificate types explained — EICR, EIC, Minor Works, and more.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-retention',
    title: 'Certificate Retention Periods',
    description:
      'How long to keep electrical certificates, landlord requirements, and digital storage.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to BS 7671:2018+A3:2024 including Amendment 3 changes.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Create professional EICRs on your phone with board scanner and defect code AI.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NICEICRegistrationPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-06-15"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Registration Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          NICEIC Registration 2026:{' '}
          <span className="text-yellow-400">How to Join & Requirements</span>
        </>
      }
      heroSubtitle="The complete guide to NICEIC registration for UK electricians. Registration types, qualification requirements, costs, application process, initial assessment, ongoing compliance, and comparison with NAPIT and ELECSA. Everything you need to know before applying."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Certificates That Meet NICEIC Requirements"
      ctaSubheading="Join 430+ UK electricians producing professional BS 7671 compliant certificates with Elec-Mate. All 8 certificate types, PDF export, digital signatures. Ready for your NICEIC assessment. 7-day free trial."
    />
  );
}
