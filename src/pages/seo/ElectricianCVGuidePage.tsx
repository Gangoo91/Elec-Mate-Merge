import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  Award,
  Briefcase,
  CheckCircle,
  AlertTriangle,
  GraduationCap,
  Wrench,
  ShieldCheck,
  Users,
  PoundSterling,
  Star,
  Building,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career', href: '/guides/how-to-become-electrician' },
  { label: 'CV Guide', href: '/guides/electrician-cv-guide' },
];

const tocItems = [
  { id: 'why-cv-matters', label: 'Why Your CV Matters' },
  { id: 'cv-structure', label: 'CV Structure' },
  { id: 'personal-statement', label: 'Personal Statement' },
  { id: 'qualifications', label: 'Qualifications Section' },
  { id: 'experience', label: 'Experience Section' },
  { id: 'key-skills', label: 'Key Skills to Highlight' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'digital-presence', label: 'Digital Presence and ElecID' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A well-structured electrician CV should be no more than 2 pages and lead with your qualifications and competent person scheme registration.',
  'Always list your 18th Edition (C&G 2382), inspection and testing (C&G 2391), and AM2 qualifications prominently — these are the first things employers check.',
  'Quantify your experience where possible: number of consumer unit changes, EICRs completed, or size of commercial projects managed.',
  'Tailor your CV to each role — domestic, commercial, and industrial employers look for different skills and experience.',
  "Use Elec-Mate's ElecID digital profile to share your verified qualifications, certifications, and CPD record with employers instantly.",
];

const faqs = [
  {
    question: 'How long should an electrician CV be?',
    answer:
      'An electrician CV should be no more than 2 pages. Most hiring managers and agency recruiters spend 30 seconds on an initial scan, so conciseness matters. Page one should cover your personal statement, key qualifications, and most recent experience. Page two can include earlier roles, additional training, and references. If you have been in the trade for 20+ years, you do not need to list every job — focus on the most relevant and recent roles. A newly qualified electrician coming out of an apprenticeship may only need a single page.',
  },
  {
    question: 'Should I include a personal statement on my electrician CV?',
    answer:
      'Yes. A personal statement (also called a professional summary) at the top of your CV gives the reader immediate context. Keep it to 3 to 4 sentences. State your qualification level (e.g., "18th Edition qualified electrician with C&G 2391 inspection and testing"), your years of experience, the type of work you specialise in (domestic, commercial, or industrial), and what you are looking for. Avoid vague statements like "hardworking team player" — instead, be specific: "Experienced in domestic rewires, consumer unit upgrades, and periodic inspection and testing across residential properties in the South East."',
  },
  {
    question: 'What qualifications should I list on an electrician CV?',
    answer:
      'List all relevant electrical qualifications in order of importance. The essential ones are: C&G 2382 (18th Edition IET Wiring Regulations, BS 7671:2018+A2:2022), C&G 2391 or 2394/2395 (Inspection and Testing), and AM2 (if you hold it). Also include your NVQ Level 3 in Electrotechnical Services, your JIB/ECS card grade, and any competent person scheme registration (NICEIC, NAPIT, ELECSA). Additional qualifications that strengthen your CV include: C&G 2919 (Electric Vehicle Charging), Part P Building Regulations, PAT testing, 18th Edition Amendment 2 update, fire alarm (BS 5839), emergency lighting (BS 5266), and any manufacturer-specific training. Always include the date you obtained each qualification.',
  },
  {
    question: 'How do I write an electrician CV with no experience?',
    answer:
      'If you are newly qualified or still completing your apprenticeship, focus on your qualifications, any practical placements or site experience during your training, and transferable skills. List the types of work you covered during your apprenticeship — rewires, first fixes, second fixes, testing, fault finding — even if they were supervised. Include any relevant college projects or simulated assessments. Mention your AM2 result if you have completed it. If you have done any work experience, volunteering, or part-time work in a related trade (plumbing, building, general labouring), include it to show you understand site work. Use your personal statement to show enthusiasm and willingness to learn.',
  },
  {
    question: 'Should I include references on my electrician CV?',
    answer:
      'You have two options. You can include the names and contact details of two professional references (typically a previous employer or supervisor who can vouch for your electrical work), or you can write "References available on request." Including actual references saves the employer a step and shows confidence, but some people prefer not to share contact details on a document that may be widely circulated. If you are applying through an agency, the agency will usually request references separately. For a direct application to a company, including references can speed up the hiring process.',
  },
  {
    question: 'How do I make my electrician CV stand out from other applicants?',
    answer:
      'Three things make an electrician CV stand out: specificity, evidence, and presentation. Be specific about the type and scale of work you have done — "completed 150+ domestic EICRs across London and the Home Counties" is far more compelling than "experienced in testing." Provide evidence by listing your qualifications with dates, your scheme registration number, and your ECS/JIB card grade. Present your CV cleanly with consistent formatting, no spelling errors, and a logical structure. A digital profile like Elec-Mate\'s ElecID can also set you apart — it gives employers a verified, up-to-date record of your qualifications and CPD that they can check with a single link.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-interview-questions',
    title: 'Interview Questions',
    description:
      'Top 25 electrician interview questions with model answers covering technical, behavioural, and situational scenarios.',
    icon: Users,
    category: 'Career',
  },
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK 2026',
    description:
      'Average electrician salaries by region, specialisation, and experience level across the UK.',
    icon: PoundSterling,
    category: 'Career',
  },
  {
    href: '/guides/how-to-become-electrician',
    title: 'How to Become an Electrician',
    description:
      'Complete pathway from school leaver to qualified electrician — apprenticeships, courses, and qualifications.',
    icon: GraduationCap,
    category: 'Career',
  },
  {
    href: '/guides/electrical-qualifications-pathway',
    title: 'Electrical Qualifications Pathway',
    description:
      'Every qualification from Level 2 to Level 4, including 18th Edition, 2391, AM2, and design qualifications.',
    icon: Award,
    category: 'Career',
  },
  {
    href: '/guides/electrician-self-employed',
    title: 'Self-Employed Electrician Guide',
    description:
      'How to set up as a self-employed electrician — insurance, tax, scheme registration, and finding work.',
    icon: Briefcase,
    category: 'Business',
  },
  {
    href: '/guides/domestic-vs-commercial-electrician',
    title: 'Domestic vs Commercial',
    description:
      'Compare work types, qualifications, earning potential, and career paths for domestic and commercial electricians.',
    icon: Building,
    category: 'Career',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-cv-matters',
    heading: 'Why Your Electrician CV Matters More Than You Think',
    content: (
      <>
        <p>
          Most electricians find work through word of mouth, agency contacts, or site referrals. So
          why does a CV matter? Because at some point in your career — whether you are applying for
          your first employed role after qualifying, moving to a larger contractor, applying for a
          supervisory position, or registering with a recruitment agency — someone is going to ask
          for one. And a poor CV will cost you opportunities.
        </p>
        <p>
          The electrical industry is competitive. A busy contractor advertising for a qualified
          electrician may receive 50 to 100 applications. The hiring manager is scanning each CV for
          three things: the right qualifications, relevant experience, and evidence that you can do
          the job. If your CV does not communicate these clearly in the first 30 seconds, it goes in
          the reject pile.
        </p>
        <p>
          The good news is that writing an effective electrician CV is not complicated. It follows a
          clear structure, and the content is largely factual — qualifications, experience, and
          skills. This guide walks you through every section, with specific advice for{' '}
          <SEOInternalLink href="/guides/how-to-become-electrician">
            newly qualified electricians
          </SEOInternalLink>
          , experienced installers, and those looking to move into{' '}
          <SEOInternalLink href="/guides/domestic-vs-commercial-electrician">
            commercial or industrial roles
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'cv-structure',
    heading: 'The Ideal CV Structure for Electricians',
    content: (
      <>
        <p>
          A well-organised CV follows a consistent structure that makes it easy for the reader to
          find the information they need. Here is the recommended layout for an electrician CV:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Contact Details</strong> — Full name, phone number, email address, location
              (town/city and county, not full address), and optionally a link to your ElecID profile
              or LinkedIn.
            </li>
            <li>
              <strong>Personal Statement</strong> — 3 to 4 sentences summarising your qualification
              level, experience, specialisation, and what you are looking for.
            </li>
            <li>
              <strong>Key Qualifications</strong> — A clear, bulleted list of your electrical
              qualifications with dates. This is the most important section for electricians.
            </li>
            <li>
              <strong>Professional Registration</strong> — Your competent person scheme (NICEIC,
              NAPIT, ELECSA), JIB/ECS card grade, and registration numbers.
            </li>
            <li>
              <strong>Work Experience</strong> — Most recent role first. Company name, job title,
              dates, and 3 to 5 bullet points describing your responsibilities and achievements.
            </li>
            <li>
              <strong>Additional Skills</strong> — Software proficiency (Elec-Mate, AutoCAD,
              Amtech), additional certifications (IPAF, PASMA, CSCS), and any other relevant skills.
            </li>
            <li>
              <strong>References</strong> — Two professional references or "References available on
              request."
            </li>
          </ol>
        </div>
        <p>
          Keep the formatting clean and consistent. Use the same font throughout, clear section
          headings, and consistent date formatting (e.g., "Jan 2023 - Present" or "January 2023 to
          Present" — pick one format and stick to it).
        </p>
      </>
    ),
  },
  {
    id: 'personal-statement',
    heading: 'Writing a Strong Personal Statement',
    content: (
      <>
        <p>
          Your personal statement sits at the top of your CV, directly below your contact details.
          It is the first thing the reader sees and sets the tone for the rest of the document. A
          good personal statement is specific, concise, and relevant to the role you are applying
          for.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Good example:</strong> "18th Edition qualified electrician with 6 years of
                post-apprenticeship experience in domestic installation, rewiring, and periodic
                inspection and testing. C&G 2391 qualified. NAPIT registered. Experienced in
                consumer unit upgrades, EV charger installations, and landlord EICRs. Looking for a
                senior installer role with a growing contractor in the Midlands."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bad example:</strong> "I am a hardworking and reliable electrician who works
                well in a team and individually. I am looking for a challenging role where I can
                develop my skills and progress my career."
              </span>
            </li>
          </ul>
        </div>
        <p>
          The difference is specificity. The good example tells the reader exactly what
          qualifications you hold, what work you do, and what you want. The bad example could apply
          to any job in any industry. Tailor your personal statement to each application — if you
          are applying for a commercial role, lead with your commercial experience; if it is a
          testing-focused role, lead with your{' '}
          <SEOInternalLink href="/guides/city-guilds-2391">2391 qualification</SEOInternalLink> and
          testing experience.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: 'Qualifications Section: The Most Important Part',
    content: (
      <>
        <p>
          For electricians, the qualifications section is the single most important part of the CV.
          Employers and agencies will scan this first. List your qualifications in order of
          relevance, not chronologically. Here is a recommended order:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C&G 2382-22</strong> — 18th Edition IET Wiring Regulations (BS
                7671:2018+A2:2022). Include the amendment number to show you are up to date.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C&G 2391-52</strong> — Inspection and Testing of Electrical Installations.
                If you hold the older 2394/2395 split qualifications, list those instead.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AM2</strong> — Assessment of Competence. This is essential for JIB grading
                as an Approved Electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NVQ Level 3</strong> — Electrotechnical Services (Installing). This confirms
                your practical competence through workplace assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional qualifications</strong> — EV Charging (C&G 2919), Part P, PAT
                Testing, Fire Alarm (BS 5839), Emergency Lighting (BS 5266), Solar PV, or any
                manufacturer-specific training.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always include the date you obtained each qualification. An employer needs to know whether
          your{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            18th Edition qualification
          </SEOInternalLink>{' '}
          is current or whether you completed it 10 years ago and have not updated since. If you
          have completed the Amendment 2 update course, list it explicitly.
        </p>
      </>
    ),
  },
  {
    id: 'experience',
    heading: 'Experience Section: Show What You Have Done',
    content: (
      <>
        <p>
          The experience section should demonstrate the breadth and depth of your practical work.
          Use bullet points, not paragraphs. Start each bullet with a strong action verb: installed,
          tested, completed, managed, supervised, designed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quantify your work:</strong> "Completed 200+ domestic EICRs across London
                and the Home Counties" is far more impressive than "Carried out periodic inspection
                and testing."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Show variety:</strong> "Installed and commissioned 50+ EV charge points (7kW
                and 22kW) for domestic and commercial clients" demonstrates a specific, in-demand
                skill.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Include responsibility:</strong> "Supervised a team of 3 apprentices on a
                new-build housing development of 120 units" shows leadership and site management
                capability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mention compliance:</strong> "Produced all certification (EIC, MEIWC, EICR)
                to BS 7671 standard and registered all notifiable work through NAPIT" shows you
                understand the regulatory framework.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For each role, list 3 to 5 bullet points. More than that and the reader's eyes glaze over.
          If you have held many short-term roles (common in the trades), you can group similar roles
          together under a single heading: "Various Domestic Electrical Contractors, Jan 2020 - Dec
          2022."
        </p>
        <p>
          If you are an{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            apprentice or newly qualified
          </SEOInternalLink>
          , list your apprenticeship as your main experience. Describe the types of work you carried
          out, the environments you worked in (domestic, commercial, industrial), and any notable
          projects.
        </p>
      </>
    ),
  },
  {
    id: 'key-skills',
    heading: 'Key Skills to Highlight on an Electrician CV',
    content: (
      <>
        <p>
          Beyond qualifications and experience, employers look for specific technical and
          professional skills. Here are the skills that carry the most weight on an electrician CV:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Technical Skills</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Domestic and commercial installation</li>
              <li>Periodic inspection and testing (EICR)</li>
              <li>Consumer unit design and installation</li>
              <li>Fault finding and diagnosis</li>
              <li>EV charge point installation</li>
              <li>Fire alarm systems (BS 5839)</li>
              <li>Emergency lighting (BS 5266)</li>
              <li>Solar PV installation</li>
              <li>Three-phase systems</li>
              <li>Data cabling and structured wiring</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Professional Skills</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>BS 7671 compliance and certification</li>
              <li>Health and safety (CSCS, SSSTS/SMSTS)</li>
              <li>Client communication and customer service</li>
              <li>Quoting and estimating</li>
              <li>Digital certification (Elec-Mate)</li>
              <li>Project management and scheduling</li>
              <li>Apprentice supervision and mentoring</li>
              <li>Risk assessment and method statements</li>
              <li>Tool and material procurement</li>
              <li>Working to programme on multi-trade sites</li>
            </ul>
          </div>
        </div>
        <p>
          Tailor your skills list to the job you are applying for. A domestic installer role values
          customer-facing skills and self-motivation; a commercial project role values site
          coordination, working to programme, and multi-trade interface experience.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common CV Mistakes Electricians Make',
    content: (
      <>
        <p>
          These are the mistakes that recruiters and hiring managers see most often on electrician
          CVs. Avoid them, and you will immediately be ahead of most applicants:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No qualifications section or qualifications buried at the bottom.</strong>{' '}
                Your qualifications are your most important selling point. They must be near the
                top, clearly listed, and dated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spelling and grammar errors.</strong> "Electrican", "certificat", "safty" —
                these undermine your credibility. Proofread your CV or have someone else check it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Too long.</strong> Five pages of dense text will not get read. Two pages
                maximum. Be concise and relevant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vague descriptions.</strong> "Carried out electrical work" tells the reader
                nothing. What type of work? Where? How much? Be specific.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No ECS/JIB card grade mentioned.</strong> Many employers and main
                contractors require specific card grades for site access. List your card type and
                grade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Using an unprofessional email address.</strong> "sparkyboi99@hotmail.com"
                does not inspire confidence. Use a professional-sounding email address.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'digital-presence',
    heading: 'Your Digital Presence: ElecID and Beyond',
    content: (
      <>
        <p>
          In 2026, your CV is just one part of your professional profile. Increasingly, employers
          and clients want to verify your qualifications digitally before they commit. This is where
          a professional digital presence adds real value.
        </p>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/guides/cpd-for-electricians">ElecID card</SEOInternalLink> creates
          a verified digital profile that includes your qualifications, scheme registration, CPD
          record, and certification history — all in one shareable link. Instead of attaching
          scanned qualification certificates to every application, you share your ElecID and the
          employer can verify everything instantly.
        </p>
        <p>Beyond ElecID, consider building your professional presence with:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>A complete LinkedIn profile</strong> — with your qualifications, experience,
                and a professional photo. Many recruitment agencies search LinkedIn for candidates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Google reviews and testimonials</strong> — if you are self-employed, client
                reviews build trust and credibility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>A portfolio of completed work</strong> — photos of consumer unit
                installations, rewire projects, and commercial fit-outs demonstrate quality
                workmanship.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Build your ElecID profile"
          description="Create a verified digital profile that shows employers your qualifications, certifications, and CPD record. Share a single link instead of scanning certificates. Professional, verifiable, always up to date."
          icon={ShieldCheck}
        />
        <p>
          Whether you are employed or{' '}
          <SEOInternalLink href="/guides/electrician-self-employed">self-employed</SEOInternalLink>,
          a strong CV combined with a verified digital profile gives you the best chance of landing
          the roles and contracts you want.
        </p>
        <SEOAppBridge
          title="Manage your business from your phone"
          description="Elec-Mate gives you professional quoting, invoicing, expense tracking, and certification tools — all in one app. Show employers or clients that you run a professional operation."
          icon={Briefcase}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianCVGuidePage() {
  return (
    <GuideTemplate
      title="Electrician CV Guide 2026 | Template & Tips UK"
      description="Complete guide to writing an electrician CV that gets interviews. CV structure, qualifications section, experience tips, common mistakes to avoid, and how to stand out in the UK electrical industry."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={FileText}
      heroTitle={
        <>
          Electrician CV Guide:{' '}
          <span className="text-yellow-400">Write a CV That Gets You Hired</span>
        </>
      }
      heroSubtitle="Your qualifications get you qualified. Your CV gets you the interview. This guide covers exactly how to structure your electrician CV, what to include, what to leave out, and the common mistakes that send your application straight to the reject pile."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician CVs"
      relatedPages={relatedPages}
      ctaHeading="Build Your Professional Electrician Profile"
      ctaSubheading="Create your ElecID digital profile, track your CPD, and access 50+ training courses — all on Elec-Mate. Join 430+ UK electricians building their careers the smart way. 7-day free trial."
    />
  );
}
