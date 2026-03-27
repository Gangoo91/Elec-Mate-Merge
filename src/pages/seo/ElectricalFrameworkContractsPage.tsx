import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Building2,
  FileText,
  Users,
  ShieldCheck,
  CheckCircle,
  ClipboardList,
  Scale,
  PoundSterling,
  AlertTriangle,
  Search,
  Briefcase,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/business' },
  { label: 'Electrical Framework Contracts', href: '/electrical-framework-contracts' },
];

const tocItems = [
  { id: 'what-are-frameworks', label: 'What Are Framework Contracts?' },
  { id: 'local-authority-frameworks', label: 'Local Authority Frameworks' },
  { id: 'nhs-procurement', label: 'NHS Procurement' },
  { id: 'housing-association-frameworks', label: 'Housing Association Frameworks' },
  { id: 'pqq', label: 'Pre-Qualification Questionnaires (PQQ)' },
  { id: 'find-and-register', label: 'How to Find and Register' },
  { id: 'ojeu-thresholds', label: 'Procurement Thresholds (UK Post-Brexit)' },
  { id: 'winning-call-offs', label: 'Winning Call-Off Contracts' },
  { id: 'for-electricians', label: 'Tools for Framework Contractors' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Framework contracts give electrical contractors guaranteed access to work from a client over a set period (typically two to four years) without the need to re-tender for each individual job. Once on a framework, work is awarded through mini-competitions or direct call-off.',
  'The UK Procurement Act 2023 (which replaced the Public Contracts Regulations 2015 from February 2025) governs how public sector bodies — including local authorities, NHS trusts, and housing associations with public funding — procure electrical framework contracts.',
  'A Pre-Qualification Questionnaire (PQQ) or Selection Questionnaire (SQ under the Procurement Act 2023) is the first stage of most framework procurement processes. It assesses your technical competence, financial standing, H&S credentials, and equality policies before you are invited to tender.',
  'Local authority electrical frameworks are typically procured through consortium purchasing organisations (Crown Commercial Service, ESPO, YPO, Eastern Shires Purchasing Organisation) and are open to electrical contractors meeting the required standards.',
  'Getting on an approved framework takes significant preparation — typically CHAS or Constructionline Gold, ISO 9001, two to three years of audited accounts, relevant project references, and current insurance evidence at higher limits than standard commercial work.',
];

const faqs = [
  {
    question: 'What is an electrical framework contract?',
    answer:
      'An electrical framework contract is an agreement between a public sector or large private sector client (or a group of clients) and one or more electrical contractors, under which the contractor is pre-approved to carry out electrical work over a set period (typically two to four years). Rather than tendering for each job individually, framework contractors are called off through mini-competitions (where several framework contractors compete on price and/or quality for a specific job) or direct award (where one framework contractor is selected without competition, usually for smaller or urgent work). Framework contracts provide greater certainty of work volume and reduce the cost of tendering, but they require significant upfront investment in pre-qualification.',
  },
  {
    question: 'How do I get onto a local authority electrical framework?',
    answer:
      'The process typically involves: (1) finding the framework through Find a Tender Service (UK public procurement notices), Contracts Finder, or the purchasing consortium\'s own portal; (2) checking the pre-qualification requirements (CHAS or Constructionline Gold, insurance levels, financial standing, references); (3) completing the Selection Questionnaire (SQ) or Pre-Qualification Questionnaire (PQQ) by the deadline — this involves submitting your H&S credentials, financial accounts, relevant project references, and quality management evidence; (4) if shortlisted, submitting a tender response including your rates (day rates, schedule of rates for common items) and method statements; and (5) if successful, signing the framework agreement and attending any required briefings or site visits.',
  },
  {
    question: 'What is the difference between the Crown Commercial Service and regional purchasing consortia?',
    answer:
      'The Crown Commercial Service (CCS) is a central government purchasing body that procures framework agreements on behalf of central government departments and many public sector bodies. CCS frameworks cover a range of electrical and M&E services. Regional purchasing consortia — ESPO (East Midlands), YPO (Yorkshire and the Humber), Eastern Shires Purchasing Organisation (ESPO/Eastern), and others — procure frameworks specifically for local authorities, schools, and public sector bodies in their regions. ESPO and YPO frameworks are widely used by local authorities for electrical maintenance and installation. Housing association frameworks are typically procured directly by the association or through a housing consortium (LHC, Southern Construction Framework).',
  },
  {
    question: 'What are the procurement thresholds for electrical framework contracts post-Brexit?',
    answer:
      'Since the Procurement Act 2023 came into force in February 2025, public procurement in the UK is no longer governed by OJEU (Official Journal of the EU) rules. The new UK thresholds (as of 2026) for works contracts (which include electrical installation) are: central government bodies — £5.34m; sub-central authorities (local authorities, NHS, schools, and others) — £5.34m; utilities — £10.68m. Contracts below these thresholds are still subject to Procurement Act requirements but with lighter-touch procedures. All public contracts above £12,000 (central government) or £30,000 (sub-central) must be advertised on Find a Tender Service.',
  },
  {
    question: 'What financial standing is usually required for a public sector electrical framework?',
    answer:
      'Public sector frameworks typically require: two to three years of audited accounts; an annual turnover of at least two to three times the estimated annual contract value (some frameworks require more); a current ratio (current assets divided by current liabilities) of at least 1.0; and no adverse CCJ (County Court Judgement) or insolvency history. Frameworks targeted at smaller local contractors may have lower financial thresholds, while national frameworks (Crown Commercial Service, NHS Shared Business Services) typically require £2m+ annual turnover. If your turnover does not meet the threshold, consider forming a consortium with another contractor or applying for smaller, locally procured frameworks.',
  },
  {
    question: 'What is a mini-competition under a framework contract?',
    answer:
      'A mini-competition is a competitive process where all (or selected) framework contractors are invited to submit a bid for a specific call-off contract. Mini-competitions are typically used for larger or more complex jobs within the framework. All framework contractors in the relevant lot must be invited (unless the framework agreement specifies a shorter list for mini-competitions). The evaluation criteria are the same as or a subset of the framework criteria — usually a combination of price and quality. The framework contractor submitting the most economically advantageous tender (MEAT) wins the call-off. For smaller jobs, direct award (without a mini-competition) is permitted where the framework agreement allows it.',
  },
  {
    question: 'Can a small electrical contractor get onto a framework?',
    answer:
      'Yes. Many local authority and housing association frameworks include lots specifically designed for small and medium-sized electrical contractors (SMEs). The government has a policy objective of increasing SME access to public procurement, reflected in the Procurement Act 2023 and its associated guidance. When applying, look for: frameworks with regional lots (limiting competition to your geographic area); SME-specific lots with lower financial thresholds; and frameworks procured by smaller local authorities or housing associations where the competition is less intense. Forming a consortium with another electrical contractor can also increase your apparent capacity while maintaining SME status.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tender-writing-electrician',
    title: 'Tender Writing Guide',
    description: 'How to price and write winning commercial electrical tenders.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/subcontracting-guide',
    title: 'Subcontracting Guide',
    description: 'Finding main contractors and CHAS pre-qualification for subcontract work.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/health-safety-audit-electrician',
    title: 'H&S Audit Guide',
    description: 'CDM 2015, RAMS, CHAS, and ISO 45001 for commercial electrical work.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/contract-templates-electrician',
    title: 'Contract Templates',
    description: 'What to include in electrical contractor agreements and customer contracts.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Build professional quotes and schedule of rates for framework call-offs.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-are-frameworks',
    heading: 'What Are Electrical Framework Contracts?',
    content: (
      <>
        <p>
          A framework contract is a pre-agreed arrangement between a client (or group of clients)
          and one or more contractors, under which the contractor is approved to carry out work
          over a set period — typically two to four years — without tendering for each individual
          job. For electrical contractors, getting onto frameworks is one of the most effective
          ways to secure a reliable pipeline of public sector work.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Framework benefits</strong> — reduced tendering cost per job; greater
                certainty of work volume; established working relationships with clients;
                earlier involvement in project planning; and reputational credibility from
                being a named public sector framework contractor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Framework structure</strong> — most frameworks are divided into lots
                by geography (regional or national), value (small works, medium works, major
                works), or activity (maintenance, installation, emergency works). Apply for the
                lots that match your capability and geography — applying for lots you cannot
                genuinely resource is wasted effort and can damage your credibility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call-off mechanisms</strong> — work is awarded either by direct award
                (for smaller jobs, where the client selects one framework contractor) or by
                mini-competition (where framework contractors compete for larger jobs). The
                framework agreement specifies which mechanism applies at which value thresholds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>No guaranteed volume</strong> — being on a framework does not guarantee
                work. The client is not obliged to call off any particular volume. Some frameworks
                include indicative volumes (not guaranteed); others are purely access-based.
                Build relationships with the client's works managers and project teams to
                maximise your call-off opportunities.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'local-authority-frameworks',
    heading: 'Local Authority Electrical Frameworks',
    content: (
      <>
        <p>
          Local authorities are major procurers of electrical services — maintenance of housing
          stock, schools, libraries, leisure centres, streetlighting, and corporate estate.
          Framework contracts are the standard route for councils to manage their electrical
          supply chains efficiently.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ESPO (Eastern Shires Purchasing Organisation)</strong> — one of the
                largest local authority purchasing consortia in England. Operates frameworks
                for electrical installation and maintenance covering local authorities, schools,
                and public sector bodies across the Midlands and East of England. Frameworks
                are open to other public bodies nationally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>YPO (Yorkshire Purchasing Organisation)</strong> — a major purchasing
                consortium for Yorkshire, Humber, and North East England local authorities.
                YPO electrical frameworks cover maintenance, installation, and specialist
                electrical works. Open to all public bodies nationally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Crown Commercial Service (CCS)</strong> — central government's
                purchasing body. The CCS Facilities Management Marketplace and other CCS
                frameworks include electrical services. CCS frameworks can be used by all
                central government departments, many public bodies, and devolved administrations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Direct council frameworks</strong> — larger local authorities (county
                councils, metropolitan boroughs, London boroughs) often procure their own
                electrical frameworks directly rather than using consortium routes. Watch Find
                a Tender Service and Contracts Finder for these opportunities.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'nhs-procurement',
    heading: 'NHS Electrical Procurement',
    content: (
      <>
        <p>
          The NHS is one of the largest procurers of electrical services in the UK. NHS trust
          estates teams manage complex electrical infrastructure in demanding environments —
          theatres, ITUs, data centres, and patient areas — requiring contractors with
          demonstrable specialist competence.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NHS Shared Business Services (NHS SBS)</strong> — procures frameworks
                on behalf of NHS trusts nationally. The NHS SBS Estates and Facilities Management
                frameworks include electrical installation and maintenance. Access is through
                the NHS SBS portal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HTM (Health Technical Memoranda)</strong> — NHS electrical work must
                comply with relevant HTMs, particularly HTM 06-01 (Electrical Services Supply
                and Distribution) and HTM 06-02 (Electrical Safety Guidance for Low Voltage
                Systems). Demonstrating knowledge of HTM requirements in your tender response
                is essential for NHS framework opportunities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher accreditation requirements</strong> — NHS frameworks typically
                require: ISO 45001 or equivalent; ISO 9001; public liability insurance of
                £10m or more; professional indemnity insurance; and specific references for
                healthcare electrical work. The Permit to Work requirements in NHS environments
                are also more stringent than standard commercial sites.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Contractors new to NHS electrical work should start with smaller trust frameworks or
          reactive maintenance frameworks before pursuing major installation work. Building a
          track record of NHS project references is essential for larger NHS framework
          opportunities.
        </p>
      </>
    ),
  },
  {
    id: 'housing-association-frameworks',
    heading: 'Housing Association Electrical Frameworks',
    content: (
      <>
        <p>
          Housing associations (registered providers of social housing) manage hundreds of
          thousands of homes and require regular electrical maintenance (EICR programmes, rewires,
          consumer unit upgrades) and installation work (EV chargers, solar PV, fire alarm
          upgrades). Framework contracts are the standard procurement route.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LHC (Local Housing Consortium)</strong> — procures frameworks for
                housing associations and local authorities covering planned and reactive
                maintenance, and new-build works. LHC frameworks include electrical installation
                and are widely used by housing associations in England, Scotland, and Wales.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Southern Construction Framework (SCF)</strong> — used by housing
                associations, local authorities, and NHS bodies in the South of England for
                construction and refurbishment works. SCF has lots for works contractors
                (including electrical) at various value bands.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Direct association frameworks</strong> — larger housing associations
                (Clarion, L&amp;Q, Peabody, Sanctuary, Places for People) procure their own
                electrical frameworks directly. These are advertised on Find a Tender Service
                and Contracts Finder. Relationships with association asset managers and
                procurement teams are valuable for direct framework opportunities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR programmes</strong> — the Electrical Safety Standards in the
                Private Rented Sector (England) Regulations 2020 and social housing electrical
                safety standards have driven significant EICR demand from housing associations.
                Framework contracts for EICR programmes (testing thousands of properties over
                several years) are a significant opportunity for electrical contractors with
                the capacity to deliver at volume.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pqq',
    heading: 'Pre-Qualification Questionnaires (PQQ / SQ)',
    content: (
      <>
        <p>
          A Pre-Qualification Questionnaire (PQQ) — called a Selection Questionnaire (SQ) under
          the Procurement Act 2023 — is the first stage of a public sector framework procurement.
          It screens applicants before they are invited to tender. A poorly completed PQQ means
          you will not reach the tender stage regardless of your technical ability.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical and professional ability</strong> — provide two to three
                relevant project references of similar scale and type to the framework lots
                you are applying for. References should include the client's name and contact
                details, the contract value, the scope of electrical works, and the outcome.
                Strong references from public sector clients are most persuasive.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Financial standing</strong> — the SQ will ask for your annual turnover,
                current ratio, and may request audited accounts. The financial threshold is
                typically two to three times the estimated annual lot value. If your accounts
                show consecutive years of loss, you may be excluded regardless of other
                credentials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>H&S credentials</strong> — CHAS, Safe Contractor, or Constructionline
                Gold will usually satisfy the H&amp;S section. Upload a current certificate.
                If you do not hold a recognised scheme, you will need to provide your full
                H&amp;S policy, risk assessment procedures, accident records, and training
                records for assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equality and diversity</strong> — public sector frameworks require an
                equality and diversity policy. This must be a genuine policy, reviewed annually
                and applied in your recruitment, training, and subcontracting practices.
                It is also increasingly required to provide data on your workforce diversity
                for larger framework applications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Environmental policy</strong> — a written environmental policy and
                evidence of carbon reduction commitments are increasingly required, particularly
                for NHS and larger local authority frameworks. At minimum, you need a policy
                covering waste management, vehicle emissions, and material sourcing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'find-and-register',
    heading: 'How to Find and Register for Framework Opportunities',
    content: (
      <>
        <p>
          Finding framework opportunities requires monitoring several procurement portals
          regularly. Many electrical contractors miss framework opportunities simply because
          they are not watching the right channels.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Find a Tender Service (FTS)</strong> — the UK's official public
                procurement notice portal (replaced OJEU after Brexit). All public contracts
                above the relevant thresholds must be advertised here. Set up email alerts for
                "electrical" in your region. Find a Tender Service is at find-tender.service.gov.uk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contracts Finder</strong> — a UK government portal for contracts below
                the FTS threshold (above £12,000 for central government, £30,000 for sub-central
                bodies). All public sector contracts above these values should be advertised
                here. Set up alerts by category and region at contractsfinder.service.gov.uk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consortium portals</strong> — register directly with ESPO, YPO, LHC,
                and other purchasing consortia. These organisations maintain supplier registers
                and notify registered suppliers when relevant frameworks are being tendered.
                Registration is usually free and takes 30 minutes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Constructionline and Achilles</strong> — main contractors and public
                sector clients use these databases to search for approved subcontractors when
                assembling bids. Registration ensures you appear in searches for electrical
                contractors in your region and value band.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ojeu-thresholds',
    heading: 'UK Procurement Thresholds After Brexit',
    content: (
      <>
        <p>
          The Procurement Act 2023 (in force from February 2025) replaced the Public Contracts
          Regulations 2015 and the OJEU (Official Journal of the EU) procurement regime. UK
          procurement now operates under its own threshold framework.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Works contract thresholds (2026)</strong> — the threshold for works
                contracts (including electrical installation) is £5.34m for central government
                and sub-central authorities (local authorities, NHS, schools). Contracts above
                this value must be advertised on Find a Tender Service and follow the full
                Procurement Act procedure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Light touch contracts</strong> — the Procurement Act 2023 introduces
                a Light Touch Regime for certain social, health, and education services. These
                have a higher threshold (£663,540) and a simpler procedure but still require
                transparency notices on Find a Tender Service.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transparency notices</strong> — a new requirement under the Procurement
                Act is planned procurement notices and pipeline notices. Public bodies must
                publish a pipeline notice for contracts over £2m expected in the next 18 months.
                This gives suppliers advance warning to prepare bids. Watch Find a Tender Service
                for pipeline notices from your target clients.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Direct award provisions</strong> — the Procurement Act 2023 expands the
                grounds for direct award (without competition) in specific circumstances,
                including extreme urgency and where only one supplier can deliver. For electrical
                contractors, this creates opportunities for emergency and specialist work
                without a competitive tender.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'winning-call-offs',
    heading: 'Winning Call-Off Contracts from Frameworks',
    content: (
      <>
        <p>
          Being on a framework is only the first step. Maximising the call-off work you receive
          from framework clients requires active relationship management and consistent delivery.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Relationship management</strong> — visit the client's works managers
                and estate teams after framework appointment. Build personal relationships
                with the people who decide which framework contractor to call off. Attend any
                client briefings, supply chain events, or framework review meetings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Responsive service</strong> — public sector clients value reliable,
                responsive contractors above almost everything else. Respond to call-off
                enquiries quickly, hit your programme milestones, and communicate proactively
                if problems arise. Your KPI performance is often reviewed at framework renewal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mini-competition pricing</strong> — for mini-competitions, your framework
                day rates and schedule of rates form the basis of your price. Review your rates
                annually against market conditions. Being uncompetitive on day rates will cost
                you mini-competitions even on frameworks where you are well-regarded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Social value</strong> — the Procurement Act 2023 requires contracting
                authorities to consider social value in all procurements. Offer apprenticeships,
                local supply chain commitments, or community engagement as part of your
                mini-competition quality submissions. Social value scoring is increasingly
                weighted at 10 to 20 per cent of the overall evaluation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Framework contracts that are managed well become long-term relationships. When a
          framework is re-tendered after its term (typically two to four years), existing
          performing contractors have a significant advantage — they have proven track records
          and are the known, low-risk choice for the client.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Tools for Electrical Framework Contractors',
    content: (
      <>
        <p>
          Winning and managing framework contracts requires systems for pricing, H&amp;S
          documentation, performance tracking, and client reporting. The right tools make
          framework management efficient and professional.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pre-Qualification Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Prepare your PQQ/SQ documentation library in advance — H&amp;S policy, equality
                  policy, environmental policy, and project references. Keep these documents
                  current so you can respond quickly when framework opportunities arise. See the{' '}
                  <SEOInternalLink href="/health-safety-audit-electrician">
                    H&amp;S audit guide
                  </SEOInternalLink>{' '}
                  for the H&amp;S documents you need, and the{' '}
                  <SEOInternalLink href="/tender-writing-electrician">
                    tender writing guide
                  </SEOInternalLink>{' '}
                  for pricing framework tenders.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Schedule of Rates and Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to build and maintain a schedule of rates for framework mini-competitions.
                  Quickly generate call-off quotes from your standard rates, with materials
                  pricing built in and professional PDF export for submission.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win and manage framework contracts with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for professional quoting, RAMS generation, H&S documentation, and AI business support. Build the documentation library you need to win public sector framework contracts. 7-day free trial."
          icon={Building2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalFrameworkContractsPage() {
  return (
    <GuideTemplate
      title="Electrical Framework Contracts UK | Getting on Approved Lists"
      description="How to get onto local authority, NHS, and housing association electrical framework contracts. Pre-qualification questionnaires, CHAS and Constructionline, UK procurement thresholds post-Brexit, and how to win call-off contracts."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          Electrical Framework Contracts UK:{' '}
          <span className="text-yellow-400">Getting on Local Authority and NHS Approved Lists</span>
        </>
      }
      heroSubtitle="How to get onto local authority, NHS, and housing association electrical framework contracts — understanding pre-qualification questionnaires, getting CHAS and Constructionline accreditation, navigating UK procurement thresholds, and winning call-off contracts once you are on a framework."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Framework Contracts"
      relatedPages={relatedPages}
      ctaHeading="Build the Documentation to Win Framework Contracts"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for professional quoting, RAMS generation, and business management. Build the H&S and commercial documentation library that public sector clients require. 7-day free trial, cancel anytime."
    />
  );
}
