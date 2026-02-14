import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  Award,
  Download,
  Briefcase,
  CheckCircle2,
  Wrench,
  GraduationCap,
  Brain,
  Star,
  Layout,
  Zap,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Tools', href: '/tools' },
  { label: 'CV Builder for Electricians', href: '/tools/cv-builder-electrician' },
];

const tocItems = [
  { id: 'what-is-cv-builder', label: 'What Is the CV Builder?' },
  { id: 'electrician-templates', label: 'Electrician-Specific Templates' },
  { id: 'qualifications-section', label: 'Qualifications & Certifications' },
  { id: 'skills-experience', label: 'Skills & Experience Highlighting' },
  { id: 'pdf-export', label: 'PDF Export & Sharing' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Templates designed specifically for electricians — structured to highlight the qualifications, certifications, and experience that employers and agencies look for.',
  'Dedicated qualifications section for BS 7671, C&G 2382, C&G 2391, AM2, JIB/ECS cards, Part P, and all specialist certifications.',
  'Skill highlighting that maps your experience to the competencies employers search for: testing and inspection, fault finding, consumer unit upgrades, fire alarm installation, and more.',
  'Export as a professional PDF ready to send to employers, agencies, or upload to job boards. Clean, ATS-friendly formatting that passes automated screening.',
  'Auto-populates from your Elec-Mate profile — qualifications, training history, and completed work are pulled in automatically so you do not need to retype everything.',
];

const faqs = [
  {
    question: 'Why do electricians need a specialist CV builder?',
    answer:
      "Generic CV builders do not understand the electrical trade. They do not know the difference between a C&G 2382 and a C&G 2391, they do not have sections for ECS/JIB card details, and they do not highlight the specific competencies that electrical employers look for. An electrician's CV needs to clearly show their qualification level (apprentice, improver, approved electrician, or technician), their current certification status (18th Edition, Inspection and Testing, Part P), their specialist skills (EV charger installation, solar PV, fire alarm, emergency lighting), and their practical experience on different types of work (domestic, commercial, industrial). The Elec-Mate CV builder is structured to present all of this information in a clear, professional format that employers and recruitment agencies can quickly scan and assess.",
  },
  {
    question: 'Is the CV format compatible with recruitment agency systems?',
    answer:
      'Yes. The CV is exported in a clean, ATS-friendly (Applicant Tracking System) format. Many large electrical contractors and recruitment agencies use automated systems to screen CVs before a human reviews them. These systems look for specific keywords and qualifications. The Elec-Mate CV builder uses standard section headings, consistent formatting, and industry-standard terminology that ATS systems recognise. The PDF export uses a single-column layout without tables, text boxes, or graphics that might confuse automated parsing. This means your CV is more likely to pass the automated screening and reach a human recruiter.',
  },
  {
    question: 'Can I include my ECS/JIB card details on the CV?',
    answer:
      'Yes. The qualifications section includes a dedicated area for your ECS (Electrotechnical Certification Scheme) or JIB (Joint Industry Board) card details. You can specify your card type (Apprentice, Improver, Installation Electrician, Approved Electrician, or Technician), card number, expiry date, and the qualifications it is based on. This is important because many commercial and industrial employers require a specific ECS card grade as a minimum requirement. Having this information clearly displayed on your CV — rather than buried in a general qualifications list — makes it immediately visible to employers scanning applications.',
  },
  {
    question: 'Does the CV builder auto-populate from my Elec-Mate profile?',
    answer:
      'Yes. If you have been using Elec-Mate for training, certification, or professional development, the CV builder can pull in data from your profile automatically. This includes qualifications you have recorded, training courses you have completed on the platform, and certifications you have uploaded. This saves significant time compared to manually entering every qualification and date. You can review and edit all auto-populated data before exporting — nothing is included without your approval. If you are new to Elec-Mate, you can still use the CV builder by entering your information manually.',
  },
  {
    question: 'Can I create multiple versions of my CV for different roles?',
    answer:
      'Yes. You can save multiple CV versions tailored to different types of work. For example, you might have one version that emphasises your domestic installation experience for residential contractor roles, another that highlights your commercial and industrial experience for larger projects, and a third that focuses on your testing and inspection qualifications for inspection-only roles. Each version can be edited independently and exported as a separate PDF. This is particularly useful when applying to different types of employer — a domestic installer and an industrial maintenance contractor are looking for different things.',
  },
  {
    question: 'What if I am an apprentice or newly qualified with limited experience?',
    answer:
      'The CV builder includes templates specifically designed for apprentices and newly qualified electricians. These templates emphasise your qualifications, training, and skills rather than relying on extensive work history. They include sections for college coursework, practical projects, AM2 results, and apprenticeship achievements. If you have used the Elec-Mate apprentice training app, your completed modules, mock exam scores, and portfolio evidence can be referenced on your CV to demonstrate your competence even if your commercial work experience is limited. The templates also include a personal statement section with guidance on how to present your enthusiasm, reliability, and eagerness to learn — qualities that many employers value highly in newly qualified electricians.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/elecid-professional-card',
    title: 'ElecID Professional Card',
    description:
      'Digital ID card showcasing your qualifications and certifications. Share with clients and employers as proof of competence.',
    icon: Award,
    category: 'Tool',
  },
  {
    href: '/tools/apprentice-training-app',
    title: 'Apprentice Training App',
    description:
      'Complete training platform for electrical apprentices. Study, track OJT hours, and build your portfolio.',
    icon: GraduationCap,
    category: 'Tool',
  },
  {
    href: '/guides/how-to-become-electrician',
    title: 'How to Become an Electrician',
    description:
      'Complete guide to starting a career as an electrician in the UK. Qualifications, routes, and career progression.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK',
    description:
      'Current salary data for electricians across the UK. Rates by region, specialism, and experience level.',
    icon: Star,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-qualifications-pathway',
    title: 'Electrical Qualifications Pathway',
    description:
      'Map of all UK electrical qualifications from Level 2 through to specialist certifications and management.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/tools/mental-health-hub',
    title: 'Mental Health Hub',
    description:
      'Wellbeing resources designed for tradespeople. Support for job-seeking stress, career transitions, and workplace pressure.',
    icon: Brain,
    category: 'Tool',
  },
];

const features = [
  {
    icon: Layout,
    title: 'Electrician-Specific Templates',
    description:
      'Professional CV templates structured for the electrical trade. Sections for qualifications, ECS card, specialist skills, and project experience — not generic one-size-fits-all layouts.',
  },
  {
    icon: Award,
    title: 'Qualifications & Certifications',
    description:
      'Dedicated section for BS 7671, C&G 2382, C&G 2391, AM2, ECS/JIB card, Part P, and all specialist certifications. Clearly formatted so employers can assess your qualification level instantly.',
  },
  {
    icon: Wrench,
    title: 'Skills & Competency Mapping',
    description:
      'Highlight specific competencies employers search for: testing and inspection, consumer unit upgrades, EV charger installation, fire alarm systems, solar PV, and more.',
  },
  {
    icon: Download,
    title: 'Professional PDF Export',
    description:
      'Export as a clean, ATS-friendly PDF that passes automated screening by recruitment agencies. Single-column layout with standard formatting for maximum compatibility.',
  },
  {
    icon: Zap,
    title: 'Auto-Populate from Profile',
    description:
      'Pull in qualifications, training history, and certifications from your Elec-Mate profile automatically. Review and edit before exporting — nothing is included without your approval.',
  },
  {
    icon: FileText,
    title: 'Multiple CV Versions',
    description:
      'Save different versions tailored to different roles — domestic, commercial, industrial, inspection, or specialist. Edit independently and export separate PDFs for targeted applications.',
  },
];

const howToSteps = [
  {
    name: 'Choose a template',
    text: 'Select from templates designed for different career stages: apprentice, newly qualified, experienced electrician, or specialist. Each template is structured to highlight the most relevant information for that stage.',
  },
  {
    name: 'Enter or auto-populate your details',
    text: 'Add your personal details, work history, and qualifications manually, or let the builder pull data from your Elec-Mate profile. Review everything before moving on.',
  },
  {
    name: 'Highlight your skills and specialisms',
    text: 'Select from a list of recognised electrician competencies or add your own. The builder formats these as keywords that employers and ATS systems search for.',
  },
  {
    name: 'Export and share',
    text: 'Preview your finished CV, make any final adjustments, and export as a professional PDF. Send directly to employers, upload to job boards, or share with recruitment agencies.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-cv-builder',
    heading: 'What Is the CV Builder for Electricians?',
    content: (
      <>
        <p>
          The Elec-Mate CV Builder is a purpose-built tool for creating professional CVs tailored to
          the electrical trade. Unlike generic CV builders that treat all industries the same, this
          tool understands the specific qualifications, certifications, skills, and experience
          formats that electrical employers and recruitment agencies look for.
        </p>
        <p>
          A good electrician's CV needs to communicate your competence quickly. Employers scanning
          applications want to see your qualification level, your current certifications, your
          specialist skills, and your practical experience — and they want to find this information
          in seconds, not minutes. The Elec-Mate CV builder structures your CV so that this critical
          information is immediately visible.
        </p>
        <p>
          Whether you are an{' '}
          <SEOInternalLink href="/tools/apprentice-training-app">
            apprentice looking for your first employer
          </SEOInternalLink>
          , a newly qualified electrician seeking your first role, or an experienced electrician
          moving to a new company, the CV builder helps you present your credentials in the most
          effective way. It includes templates for every career stage, with guidance on what
          information to include and how to present it for maximum impact.
        </p>
        <p>
          The tool also integrates with your Elec-Mate profile, so if you have been using the
          platform for training or certification, your qualifications and achievements can be pulled
          in automatically — saving you the time of manually entering everything.
        </p>
      </>
    ),
  },
  {
    id: 'electrician-templates',
    heading: 'Electrician-Specific CV Templates',
    content: (
      <>
        <p>
          The CV builder includes professionally designed templates that are structured specifically
          for electricians. Each template includes the sections that electrical employers expect to
          see, in the order they expect to see them.
        </p>
        <p>
          A typical electrician CV template includes: a personal statement summarising your
          experience and career objectives, a qualifications and certifications section prominently
          positioned near the top, an ECS/JIB card details section, a skills and competencies
          section listing your specific electrical capabilities, a work history section with
          project-based descriptions rather than generic role descriptions, and training and
          professional development records.
        </p>
        <p>
          Templates are available for different career stages. The apprentice template emphasises
          training, college work, and early practical experience. The experienced electrician
          template focuses on project diversity, specialist skills, and professional certifications.
          The{' '}
          <SEOInternalLink href="/guides/electrician-self-employed">
            self-employed electrician
          </SEOInternalLink>{' '}
          template highlights client-facing skills, business capabilities, and the breadth of work
          you have undertaken independently.
        </p>
        <p>
          All templates use clean, professional formatting that looks polished without being flashy.
          Electrical employers and agencies generally prefer straightforward, easy-to-read CVs over
          heavily designed ones. The templates strike this balance — professional enough to make a
          good impression, simple enough to be scanned quickly.
        </p>
        <SEOAppBridge
          title="Build your electrician CV in minutes"
          description="Choose a template designed for your career stage, enter your details, and export a professional PDF. Auto-populates from your Elec-Mate profile."
          icon={Layout}
        />
      </>
    ),
  },
  {
    id: 'qualifications-section',
    heading: 'Qualifications and Certifications Section',
    content: (
      <>
        <p>
          The qualifications section is the most important part of an electrician's CV. This is
          where employers look first to assess whether you meet their requirements. The Elec-Mate CV
          builder gives this section the prominence it deserves, with a structured format that makes
          your qualifications clear at a glance.
        </p>
        <p>
          The section is divided into categories: core electrical qualifications (C&G 2365, 2357,{' '}
          <SEOInternalLink href="/training/18th-edition-course">C&G 2382</SEOInternalLink>,{' '}
          <SEOInternalLink href="/training/inspection-and-testing">C&G 2391</SEOInternalLink>),
          practical assessments (AM2), industry card details (ECS/JIB card type, number, and
          expiry), Part P registration and scheme membership, and specialist certifications (EV
          charger, solar PV, fire alarm, emergency lighting, battery storage).
        </p>
        <p>
          Each qualification entry includes the full title, the awarding body, the date achieved,
          and the certificate number where applicable. This level of detail gives employers
          confidence that you genuinely hold the qualifications you claim — and it makes reference
          checking straightforward.
        </p>
        <p>
          The builder knows which qualifications are prerequisites for others, so it can flag if you
          list a qualification without its prerequisite. For example, if you list a C&G 2391 but not
          a C&G 2382, it will note that this may raise questions with employers. This helps you
          ensure your qualifications section tells a coherent story of your professional
          development.
        </p>
      </>
    ),
  },
  {
    id: 'skills-experience',
    heading: 'Skills and Experience Highlighting',
    content: (
      <>
        <p>
          Beyond qualifications, employers want to know what you can actually do. The skills section
          of the CV builder maps your experience to the specific competencies that electrical
          employers search for. This is not a generic list of "teamwork" and "communication" — it is
          a targeted inventory of your electrical capabilities.
        </p>
        <p>
          The builder includes a library of recognised electrician competencies that you can select
          from: domestic rewiring, consumer unit upgrades, commercial installation, industrial
          maintenance, testing and inspection,{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">safe isolation</SEOInternalLink>,
          fault finding, first and second fix, containment systems, fire alarm installation and
          maintenance, emergency lighting, EV charger installation, solar PV, data cabling, and
          more.
        </p>
        <p>
          For each selected skill, you can add a brief description of your experience level and the
          types of projects where you have applied it. For example, rather than simply listing
          "Consumer unit upgrades", you might specify "Consumer unit upgrades — 50+ domestic
          upgrades from rewirable fuses to RCBO-populated metal consumer units, including associated
          testing and certification."
        </p>
        <p>
          The work history section follows a project-based format rather than a simple job title and
          dates format. For each role, you describe the types of work undertaken, the scale of
          projects, and any specific achievements or responsibilities. This gives employers a
          concrete understanding of your practical experience, not just a list of places you have
          worked.
        </p>
        <SEOAppBridge
          title="Showcase your electrical skills effectively"
          description="Map your experience to the competencies employers search for. The CV builder formats your skills and project experience for maximum impact."
          icon={Wrench}
        />
      </>
    ),
  },
  {
    id: 'pdf-export',
    heading: 'PDF Export and Sharing',
    content: (
      <>
        <p>
          When your CV is complete, the builder exports it as a clean, professional PDF. The export
          uses a single-column layout with standard section headings and consistent formatting — the
          format that is most compatible with the ATS (Applicant Tracking Systems) used by large
          electrical contractors and recruitment agencies.
        </p>
        <p>
          ATS compatibility matters because many employers use automated systems to screen CVs
          before a human reviews them. These systems parse the PDF text and look for specific
          keywords and qualifications. CVs with unusual formatting, multiple columns, embedded
          graphics, or non-standard section headings often fail to parse correctly, meaning your
          application is rejected before anyone reads it. The Elec-Mate export avoids all of these
          common pitfalls.
        </p>
        <p>
          You can share the PDF directly via email, upload it to job boards (Indeed, Reed,
          Totaljobs, CV-Library), or send it to recruitment agencies. The PDF includes your{' '}
          <SEOInternalLink href="/tools/elecid-professional-card">
            ElecID verification link
          </SEOInternalLink>{' '}
          if you have one, allowing employers to verify your qualifications digitally — a
          significant trust signal in an industry where qualification fraud is a known concern.
        </p>
        <p>
          Multiple CV versions can be saved and exported independently, so you can tailor your
          application for different types of role without starting from scratch each time.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CVBuilderElectricianPage() {
  return (
    <ToolTemplate
      title="CV Builder for Electricians | Professional CV Tool"
      description="Build a professional electrician CV with templates designed for the electrical trade. Highlight qualifications, ECS card details, specialist skills, and project experience. ATS-friendly PDF export."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Professional CV Tool"
      badgeIcon={FileText}
      heroTitle={
        <>
          CV Builder for Electricians:{' '}
          <span className="text-yellow-400">Stand Out to Employers</span>
        </>
      }
      heroSubtitle="Professional CV templates designed for the electrical trade. Highlight your qualifications, ECS card, specialist skills, and project experience. ATS-friendly PDF export that passes automated screening."
      heroFeaturePills={[
        { icon: Layout, label: 'Trade-Specific Templates' },
        { icon: Award, label: 'Qualifications Section' },
        { icon: Wrench, label: 'Skills Mapping' },
        { icon: Download, label: 'PDF Export' },
      ]}
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="CV Builder Features"
      featuresSubheading="Everything you need to create a professional electrician CV that gets you interviews. Templates, qualification sections, skill mapping, and ATS-friendly export."
      howToSteps={howToSteps}
      howToHeading="How to Build Your Electrician CV"
      howToDescription="Four steps from blank page to professional PDF. Choose a template, add your details, highlight your skills, and export."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the CV Builder"
      relatedPages={relatedPages}
      ctaHeading="Build Your Professional CV Today"
      ctaSubheading="Join hundreds of UK electricians using Elec-Mate to create CVs that get results. 7-day free trial, cancel anytime."
      toolPath="/tools/cv-builder-electrician"
    />
  );
}
