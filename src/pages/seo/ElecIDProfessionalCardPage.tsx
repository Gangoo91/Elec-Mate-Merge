import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  CreditCard,
  QrCode,
  Shield,
  Award,
  CheckCircle2,
  Smartphone,
  Users,
  FileText,
  GraduationCap,
  Brain,
  Briefcase,
  Eye,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Tools', href: '/tools' },
  { label: 'ElecID Professional Card', href: '/tools/elecid-professional-card' },
];

const tocItems = [
  { id: 'what-is-elecid', label: 'What Is ElecID?' },
  { id: 'qualifications-display', label: 'Qualifications Display' },
  { id: 'verification-qr', label: 'Verification & QR Code' },
  { id: 'client-facing-proof', label: 'Client-Facing Proof of Competence' },
  { id: 'digital-vs-physical', label: 'Digital vs Physical ID Cards' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Digital ID card that displays your electrical qualifications, certifications, and ECS/JIB card details in a verified, professional format.',
  'Scannable QR code that clients, contractors, and site managers can use to instantly verify your qualifications are genuine and current.',
  'Client-facing proof of competence you can show on the doorstep, at site inductions, or include on your quotes and invoices.',
  'Always up to date — when you complete a new qualification or renew a certification, your ElecID card updates automatically.',
  'Works alongside your physical ECS/JIB card, not as a replacement. ElecID adds a digital verification layer that your physical card cannot provide.',
];

const faqs = [
  {
    question: 'What is the difference between ElecID and an ECS/JIB card?',
    answer:
      'Your ECS (Electrotechnical Certification Scheme) or JIB card is an industry-standard physical card that proves your qualification level within the electrical industry. It is recognised by contractors, site managers, and industry bodies. ElecID is a digital complement to your ECS card — it does not replace it. ElecID adds a digital verification layer that your physical ECS card cannot provide: a scannable QR code that anyone can use to verify your qualifications are genuine and current, a digital card on your phone that is always with you (even if you have left your physical card at home), and the ability to display additional qualifications and certifications that are not shown on your ECS card (such as specialist certifications for EV charger installation, solar PV, or fire alarm systems).',
  },
  {
    question: 'How does the QR code verification work?',
    answer:
      'Your ElecID card includes a unique QR code that links to a secure verification page. When someone scans the QR code using their phone camera, they are taken to a page that displays your verified qualifications, certifications, and their expiry dates. The verification page shows what has been verified (qualification title, awarding body, date achieved), the current status (valid, expired, or due for renewal), and your photograph for identity confirmation. The person scanning the code does not need to have the Elec-Mate app — the verification page works in any mobile web browser. This makes it easy for clients, site managers, and principal contractors to check your credentials without needing to contact awarding bodies or training providers.',
  },
  {
    question: 'Can I show ElecID to domestic clients on the doorstep?',
    answer:
      "Yes, and this is one of its most valuable uses. Domestic clients are increasingly aware that they should check the credentials of anyone doing electrical work in their home, but most do not know how to verify an electrician's qualifications. When you arrive at a job, you can show your ElecID card on your phone and invite the client to scan the QR code to verify your qualifications. This builds immediate trust and professionalism. It also differentiates you from unqualified or underqualified tradespeople who cannot offer this level of transparency. Many Elec-Mate users report that showing their ElecID card on the doorstep has helped them win jobs over competitors, because it demonstrates a commitment to professionalism and accountability.",
  },
  {
    question: 'Which qualifications appear on the ElecID card?',
    answer:
      'You control which qualifications appear on your ElecID card. You can include any electrical qualification or certification you hold, including: C&G 2382 (18th Edition), C&G 2391 (Inspection and Testing), C&G 2365 or 2357 (Electrical Installation), AM2 assessment, ECS/JIB card details (card type, number, expiry), Part P registration and competent person scheme membership, specialist certifications (EV charger installation, solar PV, fire alarm, emergency lighting, battery storage), health and safety qualifications (SSSTS, SMSTS, first aid), and any other relevant certifications. Each qualification is displayed with the awarding body, date achieved, and verification status.',
  },
  {
    question: 'Does ElecID work offline?',
    answer:
      'Your ElecID card is cached on your device, so you can display it even without an internet connection. This is important for site work where mobile signal may be poor. However, the QR code verification feature requires the person scanning the code to have an internet connection — they need to reach the verification server to confirm your qualifications are current. In practice, this is rarely an issue because QR code scanning is typically done during site inductions or doorstep introductions where at least one person has mobile data. If neither party has connectivity, you can still show the card display on your phone as a visual reference alongside your physical ECS card.',
  },
  {
    question: 'How do I keep my ElecID card up to date?',
    answer:
      'Your ElecID card updates automatically when you add new qualifications or certifications to your Elec-Mate profile. When you complete a new course, pass an exam, or renew a certification, you update your profile and the card reflects the changes immediately. The card also tracks expiry dates for time-limited certifications (such as your ECS card, first aid certificate, or SSSTS) and alerts you when renewals are due. This means your ElecID always shows your current, verified qualification status — unlike a physical card or printed CV that can become outdated between renewals.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cv-builder-electrician',
    title: 'CV Builder for Electricians',
    description:
      'Build a professional electrician CV with your ElecID verification link. Templates designed for the electrical trade.',
    icon: FileText,
    category: 'Tool',
  },
  {
    href: '/guides/electrical-qualifications-pathway',
    title: 'Electrical Qualifications Pathway',
    description:
      'Map of all UK electrical qualifications from Level 2 through specialist certifications. Plan your qualification journey.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/tools/apprentice-training-app',
    title: 'Apprentice Training App',
    description:
      'Training platform for electrical apprentices. Work towards your ElecID card as you complete qualifications.',
    icon: GraduationCap,
    category: 'Tool',
  },
  {
    href: '/tools/digital-certificates-app',
    title: 'Digital Certificates App',
    description:
      'Create and manage EICR, EIC, and Minor Works certificates. Your certification record feeds into your ElecID profile.',
    icon: FileText,
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
    href: '/tools/college-tutor-dashboard',
    title: 'College Tutor Dashboard',
    description:
      'Training provider dashboard for managing apprentice progress. Verify students are building their qualification profiles.',
    icon: Users,
    category: 'Tool',
  },
];

const features = [
  {
    icon: CreditCard,
    title: 'Digital Professional Card',
    description:
      'A clean, professional digital card on your phone displaying your photograph, qualifications, certifications, and ECS/JIB card details. Always with you, always current.',
  },
  {
    icon: QrCode,
    title: 'QR Code Verification',
    description:
      'Scannable QR code that anyone can use to verify your qualifications in seconds. Works in any mobile browser — no app required for the person scanning.',
  },
  {
    icon: Award,
    title: 'Full Qualifications Display',
    description:
      'Show every qualification you hold: core electrical, specialist certifications, health and safety, and industry card details. Each entry includes the awarding body and date.',
  },
  {
    icon: Shield,
    title: 'Verified Credentials',
    description:
      'Qualifications are marked as verified when confirmed against awarding body records. This gives clients and employers confidence that your credentials are genuine.',
  },
  {
    icon: Smartphone,
    title: 'Works Offline',
    description:
      'Your card is cached on your device so you can display it on site even without signal. QR verification works when the scanner has connectivity.',
  },
  {
    icon: Eye,
    title: 'Auto-Updating',
    description:
      'When you add new qualifications or renew certifications, your card updates automatically. Expiry alerts ensure you never let a certification lapse unknowingly.',
  },
];

const howToSteps = [
  {
    name: 'Add your qualifications',
    text: 'Enter your electrical qualifications, certifications, and ECS/JIB card details into your Elec-Mate profile. Upload certificate images for verification where available.',
  },
  {
    name: 'Generate your ElecID card',
    text: 'The platform generates your digital card with a unique QR code. Review the information displayed and choose which qualifications to show.',
  },
  {
    name: 'Show clients and contractors',
    text: 'Display your ElecID card on your phone at site inductions, on the doorstep, or during pre-qualification. Invite people to scan the QR code to verify your credentials.',
  },
  {
    name: 'Keep it current',
    text: 'Update your profile when you complete new qualifications or renew certifications. Your card updates automatically and alerts you before certifications expire.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-elecid',
    heading: 'What Is ElecID?',
    content: (
      <>
        <p>
          ElecID is a digital professional card for electricians. It displays your qualifications,
          certifications, and industry card details on your phone in a verified, professional
          format. Anyone can scan the QR code on your card to instantly verify that your credentials
          are genuine and current.
        </p>
        <p>
          In an industry where qualification fraud costs legitimate electricians work and puts the
          public at risk, ElecID provides a transparent, verifiable way to prove your competence.
          Whether you are meeting a domestic client on the doorstep, attending a site induction, or
          submitting a pre-qualification questionnaire, your ElecID card demonstrates that you are
          who you say you are and hold the qualifications you claim.
        </p>
        <p>
          ElecID works alongside your physical{' '}
          <SEOInternalLink href="/guides/electrical-qualifications-pathway">
            ECS/JIB card
          </SEOInternalLink>
          , not as a replacement. Your ECS card remains the industry-standard proof of qualification
          level. ElecID adds a digital layer that your physical card cannot provide: instant QR
          verification, display of additional specialist qualifications, automatic updating when you
          gain new certifications, and the ability to share a verification link digitally.
        </p>
        <p>
          The card is generated from your Elec-Mate profile and updates automatically when you add
          new qualifications or renew existing certifications. You control what appears on your card
          and who can access your verification page.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications-display',
    heading: 'Qualifications Display',
    content: (
      <>
        <p>
          Your ElecID card displays a comprehensive list of your electrical qualifications and
          certifications. Unlike your physical ECS card, which shows only your overall qualification
          level, ElecID can display every individual qualification you hold.
        </p>
        <p>
          The card organises qualifications into clear categories: core electrical qualifications
          (C&G 2365/2357, C&G 2382, C&G 2391, AM2), your ECS/JIB card details (card type, grade,
          number, and expiry date), specialist certifications (EV charger installation, solar PV,
          battery storage, fire alarm,{' '}
          <SEOInternalLink href="/certificates/emergency-lighting">
            emergency lighting
          </SEOInternalLink>
          , data cabling), Part P registration and competent person scheme membership, and health
          and safety qualifications (SSSTS, SMSTS, first aid, asbestos awareness).
        </p>
        <p>
          Each qualification entry shows the full title, the awarding body, the date achieved, and a
          verification status. Verified qualifications have been confirmed against awarding body
          records and display a verified badge. Unverified qualifications are shown with a pending
          status until verification is complete. This transparency gives clients and employers
          confidence in the information displayed.
        </p>
        <p>
          You choose which qualifications to display on your card. You might show everything, or you
          might create a streamlined card showing only the qualifications most relevant to the type
          of work you do. For example, a domestic installer might display{' '}
          <SEOInternalLink href="/training/18th-edition-course">C&G 2382</SEOInternalLink>,{' '}
          <SEOInternalLink href="/training/inspection-and-testing">C&G 2391</SEOInternalLink>, AM2,
          Part P, and ECS Approved Electrician — the qualifications most relevant to domestic
          clients.
        </p>
        <SEOAppBridge
          title="Show clients exactly what you are qualified to do"
          description="Your ElecID card displays all your electrical qualifications in a verified, professional format. Scan the QR code to verify instantly."
          icon={Award}
        />
      </>
    ),
  },
  {
    id: 'verification-qr',
    heading: 'Verification and QR Code',
    content: (
      <>
        <p>
          The QR code on your ElecID card is the feature that sets it apart from simply listing
          qualifications on a website or business card. When someone scans the code with their phone
          camera, they are taken to a secure verification page that confirms your identity and
          qualifications.
        </p>
        <p>
          The verification page displays your photograph (for identity confirmation), your name,
          your ECS card details, and a list of all qualifications you have chosen to display. Each
          qualification shows its verification status — verified qualifications have been
          cross-checked against awarding body records and display a green verified badge.
        </p>
        <p>
          The person scanning the code does not need to have the Elec-Mate app. The verification
          page opens in their standard mobile web browser, making it accessible to anyone with a
          smartphone. The page loads quickly on mobile data connections and displays clearly on any
          screen size.
        </p>
        <p>
          This verification capability is increasingly important in the electrical industry.
          Qualification fraud — where unqualified individuals carry out electrical work using fake
          or borrowed credentials — is a genuine problem that puts the public at risk and undermines
          legitimate electricians. ElecID provides a quick, reliable way for clients, contractors,
          and site managers to verify that an electrician's qualifications are genuine before they
          start work.
        </p>
      </>
    ),
  },
  {
    id: 'client-facing-proof',
    heading: 'Client-Facing Proof of Competence',
    content: (
      <>
        <p>
          For domestic electricians, the doorstep moment is critical. When you arrive at a client's
          home, they need to trust that you are a genuine, qualified electrician before letting you
          into their property. Showing your ElecID card and offering to let the client scan the QR
          code is a powerful trust-building gesture.
        </p>
        <p>
          Many domestic clients have heard stories about rogue tradespeople and are wary of anyone
          they have not used before. By proactively showing your verified credentials, you
          immediately differentiate yourself from less professional operators. Elec-Mate users
          report that this transparency helps them win jobs over competitors, because clients feel
          confident that they are dealing with a properly qualified professional.
        </p>
        <p>
          Beyond the doorstep, your ElecID verification link can be included on your{' '}
          <SEOInternalLink href="/tools/cv-builder-electrician">CV</SEOInternalLink>, your website,
          your quotes, and your invoices. When a potential client receives a quote from you, they
          can click the link to verify your qualifications before deciding whether to accept. This
          is particularly valuable for winning work from new clients who have found you online or
          through a directory listing.
        </p>
        <p>
          For commercial work, ElecID streamlines the pre-qualification process. When submitting
          tender documents or contractor questionnaires, you can include your ElecID verification
          link so the client's team can verify your credentials without requesting copies of
          individual certificates. This saves time for both parties and reduces the administrative
          burden of the pre-qualification process.
        </p>
        <SEOAppBridge
          title="Build client trust with verified credentials"
          description="Show your ElecID card on the doorstep, include the verification link on your quotes, and let clients verify your qualifications with a scan."
          icon={Shield}
        />
      </>
    ),
  },
  {
    id: 'digital-vs-physical',
    heading: 'Digital vs Physical ID Cards',
    content: (
      <>
        <p>
          Your physical ECS/JIB card remains the industry-standard credential for site access and
          employer verification. ElecID does not aim to replace it — the two serve complementary
          purposes.
        </p>
        <p>
          Your physical ECS card proves your qualification level at a glance (Apprentice, Improver,
          Installation Electrician, Approved Electrician, or Technician) and is required for access
          to most managed construction sites. It is issued by the Joint Industry Board and is widely
          recognised across the UK electrical industry.
        </p>
        <p>
          ElecID adds capabilities that a physical card cannot provide. It displays additional
          qualifications beyond your core ECS card level, it offers instant digital verification via
          QR code, it updates automatically when your qualifications change, it can be shared
          digitally via a link, and it alerts you before certifications expire so you never
          unknowingly work with an expired credential.
        </p>
        <p>
          Think of ElecID as the digital extension of your professional identity. Your ECS card gets
          you through the site gate. Your ElecID card proves to everyone else — clients,
          contractors, and colleagues — exactly what you are qualified to do, with a verification
          mechanism they can check in seconds.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElecIDProfessionalCardPage() {
  return (
    <ToolTemplate
      title="ElecID Professional Card | Digital Electrician ID"
      description="Digital professional card for electricians. Display verified qualifications, certifications, and ECS card details. QR code verification lets clients and contractors confirm your credentials instantly."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Digital Professional Card"
      badgeIcon={CreditCard}
      heroTitle={
        <>
          ElecID Professional Card:{' '}
          <span className="text-yellow-400">Your Digital Electrician ID</span>
        </>
      }
      heroSubtitle="Display your verified qualifications and certifications on a professional digital card. Clients and contractors scan the QR code to verify your credentials instantly. Always current, always with you."
      heroFeaturePills={[
        { icon: CreditCard, label: 'Digital ID Card' },
        { icon: QrCode, label: 'QR Verification' },
        { icon: Award, label: 'Verified Credentials' },
        { icon: Smartphone, label: 'Works Offline' },
      ]}
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="ElecID Features"
      featuresSubheading="Everything you need to prove your professional credentials digitally. Verified qualifications, QR code scanning, and automatic updates."
      howToSteps={howToSteps}
      howToHeading="How to Set Up Your ElecID Card"
      howToDescription="Four steps from profile to verified professional card. Add qualifications, generate your card, and start showing clients."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About ElecID"
      relatedPages={relatedPages}
      ctaHeading="Get Your ElecID Professional Card"
      ctaSubheading="Join hundreds of UK electricians using ElecID to verify their credentials digitally. 7-day free trial, cancel anytime."
      toolPath="/tools/elecid-professional-card"
    />
  );
}
