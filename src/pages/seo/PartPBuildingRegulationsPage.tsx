import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  ShieldCheck,
  Zap,
  FileText,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Smartphone,
  Calculator,
  ClipboardCheck,
  HelpCircle,
  ChevronRight,
  ArrowDown,
  Building2,
  Bath,
  Brain,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PAGE_TITLE = 'Part P Building Regulations Explained | Electrical Work Guide | Elec-Mate';
const PAGE_DESCRIPTION =
  'Complete guide to Part P Building Regulations for electricians. Notifiable vs non-notifiable work, competent person schemes (NICEIC, NAPIT, ELECSA), penalties, and BS 7671 interaction.';

const faqs = [
  {
    question: 'What electrical work is notifiable under Part P?',
    answer:
      'Under Approved Document P, the following types of electrical work in dwellings are notifiable: the installation of a new circuit (including new circuits to existing consumer units), the replacement of a consumer unit, any electrical work in a bathroom or shower room (except like-for-like replacement of accessories on existing circuits), any electrical work in a special location such as a swimming pool or sauna, electrical work associated with a new building extension or a loft conversion, any work involving the installation of a new outdoor circuit or the supply to an outbuilding, and any addition or alteration to a circuit in a special installation or location. If the work is notifiable, it must either be carried out by an electrician registered with a competent person scheme (who can self-certify), or building control must be notified before the work begins and must inspect and sign off the work on completion.',
  },
  {
    question: 'What happens if notifiable work is done without notification?',
    answer:
      'If notifiable electrical work is carried out in a dwelling without either self-certification through a competent person scheme or notification to building control, the work is technically in breach of building regulations. The local authority can issue an enforcement notice requiring the homeowner to have the work inspected and tested by a qualified person, or in extreme cases, to have the non-compliant work removed and redone. The homeowner — not the electrician — bears the legal responsibility for building regulations compliance, but in practice the electrician who carried out the work will be expected to resolve the situation. Non-compliance can also cause significant problems when selling the property, as solicitors acting for the buyer will request evidence of building regulations compliance for any electrical work carried out. Without a Building Regulations Compliance Certificate or a competent person scheme certificate, the sale may be delayed or the buyer may demand a reduction in price to cover the cost of retrospective inspection.',
  },
  {
    question: 'Do I need to be registered with a competent person scheme to do electrical work?',
    answer:
      'No. There is no legal requirement to be a member of a competent person scheme to carry out electrical work, including notifiable work. However, if you are not registered, any notifiable work must be notified to building control before it begins, and building control will need to inspect and approve the work on completion. This adds cost (the building control fee is typically between 250 and 400 pounds depending on the local authority) and delays (building control inspectors may take several days to attend). Registration with a competent person scheme such as NICEIC, NAPIT, ELECSA, or BRE Certification allows you to self-certify notifiable work, issuing a Building Regulations Compliance Certificate directly to the homeowner without involving building control. For most professional electricians, the commercial benefits of scheme membership — self-certification, professional credibility, ability to issue certificates that clients expect — far outweigh the annual registration cost.',
  },
  {
    question: 'Does Part P apply to commercial and industrial electrical work?',
    answer:
      'No. Part P (Approved Document P) of the Building Regulations applies only to electrical installations in dwellings. This includes houses, flats, maisonettes, bungalows, and the common parts of blocks of flats. It does not apply to commercial, industrial, or agricultural buildings. However, this does not mean that commercial electrical work is unregulated — it must still comply with BS 7671 (the IET Wiring Regulations), and the Electricity at Work Regulations 1989 apply to all workplaces. The distinction is that commercial work does not require building control notification or competent person scheme certification under Part P. For mixed-use buildings (such as a shop with a flat above), Part P applies to the domestic dwelling part but not to the commercial part.',
  },
  {
    question: 'What is the relationship between Part P and BS 7671?',
    answer:
      'Part P and BS 7671 are related but different things. Part P (Approved Document P) is a building regulation that establishes the legal requirement for electrical installations in dwellings to be designed and installed to protect people from fire and electric shock. It does not specify how to design or install the work — instead, it references BS 7671:2018+A3:2024 (the IET Wiring Regulations) as the standard that, if followed, demonstrates compliance with the functional requirements of Part P. In other words, Part P tells you that you must do electrical work safely; BS 7671 tells you how to do it safely. Compliance with BS 7671 is the recognised way to demonstrate compliance with Part P, although the building regulations technically allow alternative approaches if they can be shown to meet the functional requirements. In practice, compliance with BS 7671 is the universal expectation.',
  },
  {
    question: 'Is replacing a socket outlet or light switch notifiable under Part P?',
    answer:
      'No. Like-for-like replacement of socket outlets, light switches, ceiling roses, and other accessories on existing circuits is not notifiable work under Part P, provided you are not altering the circuit itself. Adding a new spur from an existing socket outlet is also non-notifiable provided it is not in a special location (such as a bathroom). However, all electrical work — whether notifiable or not — must comply with BS 7671 and must be carried out by a competent person. Non-notifiable does not mean unregulated. If you replace a socket outlet and the work is defective (for example, loose connections, incorrect polarity, or no earth), you are still liable under the Health and Safety at Work etc. Act 1974 and the Consumer Rights Act 2015.',
  },
];

const features = [
  {
    icon: FileText,
    title: '8 Certificate Types',
    description:
      'Generate EICs, Minor Works certificates, EICRs, and more — all built to BS 7671:2018+A3:2024. Part P compliance documentation made simple.',
  },
  {
    icon: Brain,
    title: '8 AI Agents + 12 AI Tools',
    description:
      'AI-powered guidance on Part P requirements, notifiable vs non-notifiable work, and competent person scheme obligations. Get instant answers on site.',
  },
  {
    icon: Calculator,
    title: '70 Electrical Calculators',
    description:
      'Cable sizing, voltage drop, maximum demand, Zs verification, and dozens more. All calculations comply with BS 7671:2018+A3:2024.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671:2018+A3:2024',
    description:
      'Built to the current 18th Edition including Amendment 3. All regulation references, test limits, and compliance checks are up to date.',
  },
  {
    icon: Smartphone,
    title: 'Works Offline on Site',
    description:
      'Complete certificates and check Part P requirements even without signal. Data syncs to the cloud automatically when connectivity returns.',
  },
  {
    icon: ClipboardCheck,
    title: 'Auto-Notification Guidance',
    description:
      'Describe the work you are doing and the app tells you whether it is notifiable under Part P. No more guessing or searching through Approved Document P.',
  },
];

const articleSchema = {
  '@type': 'Article',
  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  datePublished: '2025-03-10',
  dateModified: '2026-02-10',
  author: {
    '@type': 'Organization',
    name: 'Elec-Mate',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Elec-Mate',
    logo: {
      '@type': 'ImageObject',
      url: 'https://elec-mate.com/logo.jpg',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://elec-mate.com/guides/part-p-building-regulations',
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

const breadcrumbSchema = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://elec-mate.com/' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://elec-mate.com/guides' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Part P Building Regulations',
      item: 'https://elec-mate.com/guides/part-p-building-regulations',
    },
  ],
};

export default function PartPBuildingRegulationsPage() {
  useSEO({
    title: 'Part P Building Regulations Explained | Electrical Work Guide',
    description: PAGE_DESCRIPTION,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...articleSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...breadcrumbSchema })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            BS 7671:2018 + A3:2024
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Part P Building Regulations
            <span className="block text-yellow-400 mt-1">Explained for Electricians</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            The complete guide to Approved Document P. Notifiable vs non-notifiable work, competent
            person schemes, building control, penalties, and how Part P interacts with BS 7671.
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
              href="#what-is-part-p"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              Read the Guide
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* What Is Part P */}
      <section id="what-is-part-p" className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Building2 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Is Part P?</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Part P is one of the Approved Documents that provides practical guidance on how to
              comply with the Building Regulations 2010 in England. Specifically, Approved Document
              P covers electrical safety in dwellings. It was first introduced on 1 January 2005,
              and its purpose is to ensure that electrical installation work in homes is designed
              and installed to a standard that protects people from fire and injury caused by
              electric shock.
            </p>
            <p>
              The functional requirement of Part P is deliberately broad. Regulation P1 states:
              "Reasonable provision shall be made in the design and installation of electrical
              installations in order to protect persons operating, maintaining or altering the
              installations from fire or injury." This functional requirement does not specify the
              technical standard to be used — that is where BS 7671 comes in. Approved Document P
              states that compliance with BS 7671:2018+A3:2024 (the 18th Edition of the IET Wiring
              Regulations, as amended) is one way of meeting the functional requirements of Part P.
            </p>
            <p>
              It is important to understand what Part P is and what it is not. Part P is a building
              regulation. It is not a British Standard, not a law in itself (it derives its legal
              force from the Building Act 1984), and it does not replace or override BS 7671. Part P
              sets the legal framework for when electrical work in dwellings needs to be formally
              certified and notified; BS 7671 tells you how to design and install the work safely.
              The two work together: you do the work to BS 7671, and you certify it in accordance
              with Part P.
            </p>
            <p>
              Part P applies in England only. Wales has its own version of Part P with similar
              requirements. Scotland has separate building regulations that cover electrical safety
              under a different framework. Northern Ireland has its own building regulations. If you
              work across the UK, you need to be aware that the notification requirements differ
              between the home nations, even though BS 7671 applies throughout.
            </p>
          </div>
        </div>
      </section>

      {/* Notifiable vs Non-Notifiable */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ClipboardCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Notifiable vs Non-Notifiable Work
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The most critical distinction in Part P is between notifiable and non-notifiable work.
              Notifiable work must be either self-certified by an electrician registered with a
              competent person scheme, or notified to the local authority building control
              department before it starts. Non-notifiable work does not require formal notification
              but must still comply with BS 7671.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
              <h3 className="font-bold text-yellow-400 text-xl mb-3">Notifiable Work</h3>
              <ul className="space-y-3 text-white text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Installation of a new circuit (including new circuits added to existing consumer
                    units)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Replacement of a consumer unit (including like-for-like replacement)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Any electrical work in a bathroom or shower room (except like-for-like
                    replacement of accessories)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Any electrical work in a special installation or location (swimming pool, sauna,
                    hot tub area)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Installation of a new outdoor circuit or supply to an outbuilding, shed, or
                    garage
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Electrical work as part of a new building extension or loft conversion
                  </span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-white text-xl mb-3">Non-Notifiable Work</h3>
              <ul className="space-y-3 text-white text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <span>
                    Like-for-like replacement of socket outlets, switches, ceiling roses, and light
                    fittings
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <span>Like-for-like replacement of a damaged cable for a single circuit</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <span>Re-fixing or replacing enclosures of existing accessories</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <span>
                    Adding a fused spur to an existing circuit (not in a special location)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <span>
                    Work that is not in a dwelling (commercial, industrial, agricultural premises)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <span>
                    Telephone, data, alarm, and extra-low voltage signal wiring (not connected to
                    mains)
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              A common point of confusion is bathroom work. Under the current Part P, like-for-like
              replacement of an existing bathroom accessory (such as a pull-cord switch, shaver
              supply unit, or extractor fan) on an existing circuit is non-notifiable. However,
              adding a new circuit in a bathroom, or extending an existing circuit to add a new
              accessory, is notifiable. The reasoning is that the existing circuit has already been
              certified as safe — replacing a component on it does not change the circuit design.
              But altering the circuit or adding a new one requires the design to be verified and
              certified afresh.
            </p>
          </div>
        </div>
      </section>

      {/* Competent Person Schemes */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Competent Person Schemes</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Competent person schemes are Government-authorised bodies that allow registered
              installers to self-certify certain types of building work as complying with building
              regulations, without the need to involve the local authority building control
              department. For electrical work in dwellings, several competent person schemes are
              approved under Part P.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
              <h3 className="font-bold text-white text-lg mb-2">NICEIC</h3>
              <p className="text-white text-sm leading-relaxed">
                The National Inspection Council for Electrical Installation Contracting is the
                largest and best-known electrical competent person scheme in the UK.
                NICEIC-registered contractors are assessed annually to confirm their technical
                competence, and their work is sampled on a regular basis. Registration provides the
                ability to self-certify notifiable domestic work and issue Building Regulations
                Compliance Certificates. NICEIC also operates the Domestic Installer scheme for
                electricians who only work in domestic premises.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-white text-lg mb-2">NAPIT</h3>
              <p className="text-white text-sm leading-relaxed">
                The National Association of Professional Inspectors and Testers is the
                second-largest electrical competent person scheme. NAPIT-registered electricians can
                self-certify domestic electrical work under Part P and issue compliance
                certificates. NAPIT also covers other building trades (gas, plumbing, building
                fabric), making it popular with multi-trade contractors. The registration process
                includes technical assessment, insurance verification, and ongoing compliance
                monitoring.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-white text-lg mb-2">ELECSA</h3>
              <p className="text-white text-sm leading-relaxed">
                ELECSA is another Government-approved competent person scheme for electricians. It
                provides the same self-certification ability as NICEIC and NAPIT. ELECSA is known
                for being competitively priced and is popular with smaller electrical firms and sole
                traders. Registered members can self-certify domestic work, issue compliance
                certificates, and benefit from technical support helplines.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-white text-lg mb-2">BRE Certification</h3>
              <p className="text-white text-sm leading-relaxed">
                The Building Research Establishment operates a competent person scheme for domestic
                electrical installers. BRE Certification provides self-certification ability for
                Part P notifiable work. While less well-known than NICEIC or NAPIT in the electrical
                sector, BRE is a highly respected organisation in the broader construction industry
                and their certification carries significant credibility.
              </p>
            </div>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              When a registered installer completes notifiable work, they must notify the relevant
              scheme within 30 days of completion. The scheme then issues a Building Regulations
              Compliance Certificate to the homeowner and registers the work with the local
              authority. This creates a permanent record that the work was carried out to the
              required standard. The certificate is an important document for property sales —
              buyers' solicitors will request evidence of compliance for any electrical work done
              within the property.
            </p>
          </div>
        </div>
      </section>

      {/* Penalties and Consequences */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Penalties for Non-Compliance
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Non-compliance with Part P can have serious consequences for both the homeowner and
              the electrician. Under the Building Act 1984, it is an offence to carry out building
              work that does not comply with building regulations. The maximum penalty for
              contravening building regulations is a fine of up to 5,000 pounds in a magistrates'
              court, with an additional daily penalty of 50 pounds for each day the contravention
              continues after conviction. In more serious cases, the local authority can seek
              prosecution in the Crown Court, where penalties are unlimited.
            </p>
            <p>
              In practice, criminal prosecution for Part P breaches is rare. The more common
              consequences are civil and commercial. Local authorities can issue enforcement notices
              requiring the homeowner to either have the work inspected and approved
              retrospectively, or to have non-compliant work removed and redone. Retrospective
              building control approval typically costs between 400 and 800 pounds (the building
              control fee plus the cost of having the work inspected and tested by a qualified
              person), and there is no guarantee the work will pass without remedial work.
            </p>
            <p>
              The most significant practical consequence of non-compliance is the impact on property
              sales. When selling a property, the buyer's conveyancer will request building
              regulations completion certificates for any work carried out since the property was
              last sold. If electrical work has been done without Part P compliance, the seller may
              need to obtain a regularisation certificate from building control (which requires an
              inspection, testing, and a fee), obtain an electrical installation condition report
              from a qualified inspector showing the work is satisfactory, or accept a reduction in
              the sale price to compensate the buyer for the risk and cost of resolving the
              compliance gap. In some cases, indemnity insurance may be used to cover the buyer
              against the risk of enforcement action, but this is seen as a last resort and does not
              actually resolve the underlying compliance issue.
            </p>
          </div>
        </div>
      </section>

      {/* Special Locations */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Bath className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Special Locations Under Part P
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Part P pays particular attention to special locations within dwellings where the risk
              of electric shock is increased. These are locations where the body's resistance to
              electric shock is reduced — typically because of the presence of water, damp
              conditions, or contact with earth potential. Work in these locations is almost always
              notifiable and must comply with the additional requirements of BS 7671 Section 7.
            </p>
            <p>
              <strong className="text-yellow-400">Bathrooms and shower rooms</strong> are the most
              common special locations in domestic properties. BS 7671 Section 701 defines specific
              zones (Zone 0, Zone 1, and Zone 2) around baths and showers, with restrictions on what
              equipment can be installed in each zone and the minimum IP ratings required. Any new
              electrical work in a bathroom — including new circuits for heated towel rails,
              underfloor heating, ventilation fans, or additional lighting — is notifiable under
              Part P. Only like-for-like replacement of accessories on existing circuits is
              non-notifiable.
            </p>
            <p>
              <strong className="text-yellow-400">
                Swimming pools, saunas, and hot tub installations
              </strong>{' '}
              are less common but carry the highest risk. BS 7671 Section 702 (swimming pools) and
              Section 703 (saunas) impose the most restrictive requirements in the standard,
              including mandatory SELV (Separated Extra-Low Voltage) supplies in certain zones,
              specific equipment ratings, and supplementary equipotential bonding. All electrical
              work associated with these installations is notifiable.
            </p>
            <p>
              <strong className="text-yellow-400">Gardens and outbuildings</strong> also require
              careful attention. Any new outdoor circuit — whether supplying garden lighting, a pond
              pump, an electric vehicle charger, or an outbuilding — is notifiable under Part P. The
              outdoor environment introduces hazards including exposure to weather, increased risk
              of cable damage, contact with earth potential, and the presence of water. BS 7671
              Section 714 covers outdoor installations and requires specific measures including RCD
              protection, suitable cable types, and IP-rated enclosures.
            </p>
          </div>
        </div>
      </section>

      {/* Part P and BS 7671 */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How Part P Interacts with BS 7671:2018+A3:2024
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Approved Document P references BS 7671 as the standard that, if followed, demonstrates
              compliance with the safety requirements of Part P. The current referenced edition is
              BS 7671:2018+A3:2024 — the 18th Edition of the IET Wiring Regulations with Amendment
              3, issued in July 2024. Amendment 3 introduced Regulation 530.3.201 covering
              bidirectional and unidirectional protective devices, as well as other updates and
              clarifications.
            </p>
            <p>
              The practical implication is straightforward: if you design and install electrical
              work to BS 7671:2018+A3:2024, and you certify the work correctly using the appropriate
              IET model forms (EIC for new installations, Minor Works Certificate for minor work,
              EICR for condition reports), you have met the technical requirements of Part P. The
              certification demonstrates that the work has been designed, installed, inspected, and
              tested to the required standard.
            </p>
            <p>
              For new installations and alterations that are notifiable under Part P, the Electrical
              Installation Certificate (EIC) or Minor Works Certificate serves two purposes: it is
              the BS 7671 certificate confirming compliance with the wiring regulations, and (when
              issued by a registered competent person) it forms the basis for the Building
              Regulations Compliance Certificate that the homeowner receives. This dual function
              means that getting the certification right is doubly important — errors in the EIC or
              Minor Works Certificate can create both BS 7671 and Part P compliance issues.
            </p>
            <p>
              Elec-Mate generates certificates that comply with both BS 7671 and Part P
              requirements. The app guides you through the correct certificate for each type of
              work, ensures all mandatory fields are completed, and validates test results against
              BS 7671 limits. This reduces the risk of certification errors that could lead to
              building regulations queries or enforcement issues.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Electricians Choose Elec-Mate
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians. Certificates, calculators, AI tools, and 36+ training
            courses — all built to BS 7671:2018+A3:2024.
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
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
        heading="Certify Part P Work with Confidence"
        subheading="Join 430+ UK electricians producing professional certificates with Elec-Mate. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
