/**
 * Module 1 · Section 1 · Subsection 6 — Environmental and Building Regulations
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   The Environmental Protection Act 1990, Building Regulations Part P / L / F / B and the
 *   waste regime that bites on every project. Engineer-in-training perspective: how an HNC
 *   designer keeps the project compliant beyond H&S — environmental, energy, fire and waste.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  ContentEyebrow,
  SectionRule,
  LearningOutcomes,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Environmental and Building Regulations - HNC Module 1 Section 1.6';
const DESCRIPTION =
  'Master UK environmental legislation and building regulations for building services: Environmental Protection Act 1990, Part P, F-gas regulations, WEEE, and building control requirements.';

const quickCheckQuestions = [
  {
    id: 'part-p-scope',
    question: 'Which type of electrical work is NOT covered by Part P Building Regulations?',
    options: [
      'Like-for-like socket replacement',
      'New circuit in a kitchen',
      'Bathroom electrical installation',
      'New consumer unit installation',
    ],
    correctIndex: 0,
    explanation:
      'Like-for-like replacement of accessories (sockets, switches, light fittings) is minor work not covered by Part P. However, adding new circuits, work in special locations (bathrooms, kitchens), and consumer unit changes all require notification.',
  },
  {
    id: 'f-gas-qual',
    question: 'What minimum qualification is required to handle F-gas refrigerants?',
    options: [
      'Comprehensive fire safety measures',
      'Vd = (mV/A/m × Ib × L) / 1000',
      'Moisture ingress or condensation',
      'F-gas Category I-IV certificate',
    ],
    correctIndex: 3,
    explanation:
      'F-gas Regulation (EU 517/2014, retained in UK law) requires personnel handling fluorinated refrigerants to hold an appropriate Category I-IV certificate depending on the work undertaken. This is a legal requirement.',
  },
  {
    id: 'weee-responsibility',
    question:
      'Under WEEE Regulations, who is primarily responsible for proper disposal of commercial electrical equipment?',
    options: [
      'The business owner/last holder',
      'The installation contractor',
      'The local council',
      'The manufacturer only',
    ],
    correctIndex: 0,
    explanation:
      "Under WEEE Regulations 2013, the 'holder' (typically the business owner) is responsible for ensuring waste electrical equipment is properly disposed of through an approved AATF (Approved Authorised Treatment Facility).",
  },
  {
    id: 'building-control-notify',
    question:
      'Within what timeframe must notifiable electrical work be registered with Building Control?',
    options: [
      'Risk evaluation/assessment',
      'Within 30 days of completion',
      'Record and investigate the cause',
      'PWM armature voltage control',
    ],
    correctIndex: 1,
    explanation:
      'When using a competent person scheme (such as NICEIC or NAPIT), notification must be made within 30 days of completion. If not registered with such a scheme, Building Control must be notified BEFORE work commences.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary purpose of the Environmental Protection Act 1990?',
    options: [
      'To set minimum wage rates for construction workers',
      'To control emissions, waste management, and environmental contamination',
      'To regulate the design of electrical installations',
      'To enforce energy efficiency standards in new buildings',
    ],
    correctAnswer: 1,
    explanation:
      'The Environmental Protection Act 1990 is the principal legislation for environmental protection in the UK, covering waste management, contaminated land, statutory nuisances, and integrated pollution control.',
  },
  {
    id: 2,
    question:
      'Which Part of the Building Regulations specifically deals with electrical safety in dwellings?',
    options: [
      'Part M',
      'Part A',
      'Part P',
      'Part L',
    ],
    correctAnswer: 2,
    explanation:
      'Part P (Electrical Safety - Dwellings) covers electrical installations in dwellings. Part A deals with structure, Part L with energy conservation, and Part M with access.',
  },
  {
    id: 3,
    question: "What does the 'duty of care' under EPA 1990 require of contractors handling waste?",
    options: [
      'Disposing of all waste through the general site skip',
      'Recovering refrigerant gases before scrapping equipment',
      'Notifying Building Control before any waste leaves site',
      'Ensuring waste is transferred only to authorised persons with correct documentation',
    ],
    correctAnswer: 3,
    explanation:
      'The duty of care requires anyone handling waste to ensure it is only transferred to authorised carriers, with proper waste transfer notes describing the waste. This chain of responsibility applies from production to final disposal.',
  },
  {
    id: 4,
    question:
      'When installing a new circuit for an electric shower in a bathroom, what Building Control action is required?',
    options: [
      'Notification to Building Control or registration via competent person scheme',
      'No action is required as bathroom work is exempt from Part P',
      'Only verbal notification to the property owner is needed',
      'A waste transfer note must be issued before work begins',
    ],
    correctAnswer: 0,
    explanation:
      'New circuits in bathrooms (special locations) are notifiable work under Part P. Either notify Building Control before work starts, or self-certify through a competent person scheme (NICEIC, NAPIT, etc.) within 30 days of completion.',
  },
  {
    id: 5,
    question:
      'What is the Global Warming Potential (GWP) threshold for F-gases that will be phased out under UK regulations?',
    options: [
      'GWP above 750',
      'GWP above 2500',
      'There is no GWP threshold',
      'GWP above 150',
    ],
    correctAnswer: 1,
    explanation:
      'The F-gas Regulation sets a phase-down schedule with bans on high-GWP refrigerants. From 2025, new equipment using refrigerants with GWP above 2500 (like R404A) is prohibited. Lower GWP alternatives such as R32 and R290 are encouraged.',
  },
  {
    id: 6,
    question: 'Under WEEE Regulations, what is an AATF?',
    options: [
      'Alternative Appliance Transfer Form',
      'Automated Assembly Test Facility',
      'Approved Authorised Treatment Facility',
      'Annual Audit and Testing Framework',
    ],
    correctAnswer: 2,
    explanation:
      'An AATF (Approved Authorised Treatment Facility) is a licensed facility for processing waste electrical and electronic equipment. WEEE must be taken to an AATF to ensure proper recycling and recovery of hazardous materials.',
  },
  {
    id: 7,
    question:
      'Which certificate must be issued upon completion of notifiable electrical work in a dwelling?',
    options: [
      'A Minor Electrical Installation Works Certificate only',
      'A waste consignment note for the old wiring removed',
      'An Energy Performance Certificate for the dwelling',
      'Electrical Installation Certificate AND Building Regulations Compliance Certificate',
    ],
    correctAnswer: 3,
    explanation:
      'Notifiable electrical work requires both an Electrical Installation Certificate (to BS 7671) AND a Building Regulations Compliance Certificate (from Building Control or the competent person scheme). Both documents should be given to the property owner.',
  },
  {
    id: 8,
    question: 'What type of waste would old fluorescent tubes containing mercury be classified as?',
    options: [
      'Hazardous waste requiring special disposal',
      'General waste suitable for the site skip',
      'Inert waste that can go to any landfill',
      'Recyclable waste collected with scrap metal',
    ],
    correctAnswer: 0,
    explanation:
      'Fluorescent tubes contain mercury and phosphor powder, classifying them as hazardous waste under the Hazardous Waste Regulations 2005. They require specialist collection and disposal through licensed facilities, not general waste streams.',
  },
  {
    id: 9,
    question:
      'Which competent person scheme allows electricians to self-certify Part P notifiable work?',
    options: [
      'The Environment Agency waste carrier register',
      'NICEIC, NAPIT, or equivalent electrical scheme',
      'The F-gas Category I-IV certification scheme',
      'The Energy Performance Certificate register',
    ],
    correctAnswer: 1,
    explanation:
      'Competent person schemes like NICEIC, NAPIT, ELECSA, and others allow registered electricians to self-certify notifiable electrical work and issue Building Regulations Compliance Certificates without involving Local Authority Building Control directly.',
  },
  {
    id: 10,
    question: 'What is the maximum penalty for illegal dumping (fly-tipping) under the EPA 1990?',
    options: [
      'A written warning from the local council',
      'A fixed fine of £200 with no further action',
      'Unlimited fine and/or up to 5 years imprisonment',
      'Removal from the competent person scheme only',
    ],
    correctAnswer: 2,
    explanation:
      'Fly-tipping is a serious criminal offence under EPA 1990. On conviction, individuals face unlimited fines and/or up to 5 years imprisonment. Fixed penalty notices of up to £1000 may be issued for minor offences, but serious cases go to court.',
  },
  {
    id: 11,
    question: 'What document must accompany waste when transferred to a licensed carrier?',
    options: [
      'An Electrical Installation Certificate',
      'A Building Regulations Compliance Certificate',
      'An F-gas recovery record',
      'Waste Transfer Note or Consignment Note',
    ],
    correctAnswer: 3,
    explanation:
      'A Waste Transfer Note (for non-hazardous waste) or Consignment Note (for hazardous waste) must accompany all waste transfers. These documents must be retained for 2 years (WTN) or 3 years (CN) and describe the waste, its origin, and the receiving party.',
  },
  {
    id: 12,
    question:
      'Under Part L Building Regulations, what must be considered when upgrading building services?',
    options: [
      'Energy efficiency and carbon emissions targets',
      'The duty of care for waste disposal',
      'Maximum approved fly-tipping penalties',
      'Refrigerant leak checking frequencies',
    ],
    correctAnswer: 0,
    explanation:
      'Part L (Conservation of Fuel and Power) requires building services upgrades to meet minimum energy efficiency standards. This includes consideration of lighting efficacy, HVAC efficiency, controls, and insulation to reduce carbon emissions.',
  },
];

const faqs = [
  {
    question: 'Do I need to register with a competent person scheme to do electrical work?',
    answer:
      'Not legally required, but highly recommended. Without scheme membership (NICEIC, NAPIT, ELECSA, etc.), you must notify Building Control BEFORE starting any notifiable work, pay their inspection fees, and wait for their availability. Scheme members can self-certify, making the process faster and more cost-effective for clients.',
  },
  {
    question: "What happens if I don't notify Building Control about notifiable electrical work?",
    answer:
      'Failure to notify is a criminal offence under the Building Act 1984. The local authority can require you to expose and test the work, or even remove it. More practically, non-notified work causes problems when selling a property - solicitors require compliance certificates, and retrospective regularisation is expensive (typically £200-£500).',
  },
  {
    question: 'How do I dispose of old refrigeration equipment containing F-gases?',
    answer:
      'F-gas equipment must be decommissioned by qualified personnel who recover the refrigerant using certified equipment. The recovered gas must be sent for destruction, recycling, or reclamation by an approved company. The equipment itself falls under WEEE regulations and should go to an AATF. Keep recovery certificates for audit purposes.',
  },
  {
    question: 'What training is needed for working with hazardous waste?',
    answer:
      'Personnel handling hazardous waste should receive training appropriate to their role. This includes understanding waste classification, segregation, storage requirements, and documentation. For specific materials like asbestos, specialist qualifications (UKATA/IATP accredited training) are legally required. Regular refresher training is essential.',
  },
  {
    question: 'Are there exemptions from Part P for any electrical work?',
    answer:
      'Yes, minor works such as like-for-like replacement of accessories, adding a fused spur from an existing circuit (outside special locations), and repairs do not require notification. However, all work must still comply with BS 7671. Work in special locations (bathrooms, swimming pools, saunas) and new circuits always require notification.',
  },
];

const HNCModule1Section1_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 1.1.6"
            title="Environmental and Building Regulations"
            description="Essential UK legislation governing environmental protection, electrical installations, and building services compliance"
            tone="purple"
          />

          <TLDR
            points={[
              'You will treat the Building Regulations 2010 — Parts L, P, F, B and M — as binding alongside BS 7671 on every domestic and most non-domestic projects.',
              'You can scope notifiable electrical work under Part P and route it through a Competent Person Scheme (NICEIC, NAPIT, ELECSA) to avoid Building Control fees.',
              'You apply the Environmental Protection Act 1990 duty of care for waste and the Hazardous Waste Regulations 2005 to every WEEE, fluorescent tube and battery you remove.',
              'You identify Energy Performance of Buildings Regulations 2012 (EPC) triggers and DSEAR 2002 zones in oil/gas/battery rooms.',
            ]}
          />

          <RegsCallout
            source="Environmental Protection Act 1990 — Section 34(1)"
            clause="It shall be the duty of any person who imports, produces, carries, keeps, treats or disposes of controlled waste or, as a broker, has control of such waste, to take all such measures applicable to him in that capacity as are reasonable in the circumstances—(a) to prevent any contravention by any other person of section 33 above; (b) to prevent the escape of the waste from his control or that of any other person; and (c) on the transfer of the waste, to secure—(i) that the transfer is only to an authorised person…"
            meaning={
              <>
                The &ldquo;duty of care&rdquo; for waste is personal and non-delegable. As an HNC
                supervisor you ensure every skip leaving site has a waste transfer note, every
                hazardous load (lamps, batteries, asbestos, oil) goes via a registered carrier,
                and the waste hierarchy (prevent, reuse, recycle, recover, dispose) is documented.
              </>
            }
            cite="Source: Environmental Protection Act 1990, s.34(1) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the scope and requirements of the Environmental Protection Act 1990",
              "Identify notifiable work under Part P Building Regulations",
              "Describe the Building Control notification process and competent person schemes",
              "Outline F-gas Regulation requirements for refrigerant handling",
              "Apply WEEE and hazardous waste disposal requirements",
              "Understand compliance pathways for building services installations",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Environmental Protection Act 1990</ContentEyebrow>

          <ConceptBlock title="Environmental Protection Act 1990">
            <p>
            The Environmental Protection Act 1990 (EPA 1990) is the cornerstone of UK
            environmental legislation. For building services professionals, understanding its
            requirements is essential for legal compliance and professional practice.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">
            Key provisions affecting building services:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Part I:</strong> Integrated Pollution Control - controls emissions from
            industrial processes
            </li>
            <li>
            <strong>Part II:</strong> Waste management licensing and duty of care
            </li>
            <li>
            <strong>Part III:</strong> Statutory nuisances - noise, dust, odours from
            construction
            </li>
            <li>
            <strong>Part IIA:</strong> Contaminated land identification and remediation
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Duty of Care (Section 34)
            </p>
            <p className="text-sm text-white mb-3">
            The duty of care applies to anyone who produces, imports, carries, keeps, treats, or
            disposes of controlled waste. As a building services contractor, you must:
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Prevent escape</strong> — Action: Store waste securely on site. Evidence: Covered skips, locked compounds</li>
            <li><strong>Transfer to authorised person</strong> — Action: Check carrier's licence. Evidence: Carrier registration number</li>
            <li><strong>Describe waste accurately</strong> — Action: Complete transfer documentation. Evidence: Waste Transfer Notes (2 years)</li>
            <li><strong>Prevent illegal disposal</strong> — Action: Verify final destination. Evidence: Licensed facility confirmation</li>
            </ul>
            
            

            <CommonMistake
            title="Enforcement and Penalties"
            whatHappens={<><ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Fly-tipping:</strong> Unlimited fine and/or up to 5 years imprisonment
            </li>
            <li>
            <strong>Duty of care breach:</strong> Unlimited fine on indictment
            </li>
            <li>
            <strong>Fixed penalty:</strong> Up to £1000 for minor offences
            </li>
            <li>
            <strong>Vehicle seizure:</strong> Powers to seize vehicles used for illegal waste
            activity
            </li>
            </ul></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            <p className="text-sm text-elec-yellow/70">
            <strong>Remember:</strong> The duty of care follows waste from 'cradle to grave' - you
            remain liable for waste you produce even after transfer.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Part P Building Regulations - Electrical Safety</ContentEyebrow>

          <ConceptBlock title="Part P Building Regulations - Electrical Safety">
            <p>
            Part P of the Building Regulations (England and Wales) sets requirements for
            electrical installations in dwellings to ensure they are designed and installed
            safely. It applies to houses, flats, maisonettes, and their gardens and outbuildings.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Notifiable Work - Requires Building Control
            </p>
            
            <div>
            <p className="text-sm font-medium text-white mb-2">Always notifiable:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>New circuit installations</li>
            <li>Consumer unit replacement/alterations</li>
            <li>
            Any work in special locations (bathrooms, swimming pools)
            </li>
            <li>Outdoor installations</li>
            <li>Work near the origin of the installation</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-white mb-2">
            Non-notifiable (minor works):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Like-for-like replacement of accessories</li>
            <li>Adding lighting points to existing circuits</li>
            <li>
            Adding sockets/FCUs from existing circuits (not in special locations)
            </li>
            <li>Repairs and maintenance</li>
            <li>Prefabricated equipment connection</li>
            </ul>
            </div>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Special Locations Under Part P
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Bathrooms:</strong> Any electrical work (except SELV systems) requires
            notification
            </li>
            <li>
            <strong>Kitchens:</strong> New circuits require notification, but adding sockets
            to existing circuits does not
            </li>
            <li>
            <strong>Swimming pools/saunas:</strong> All electrical work is notifiable
            </li>
            <li>
            <strong>Gardens/outbuildings:</strong> New circuits always notifiable
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance Routes</p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Competent Person Scheme</strong> — Process: Self-certify and notify scheme within 30 days. Certification: EIC + Building Regs Compliance Cert</li>
            <li><strong>Building Control</strong> — Process: Notify LA before work, arrange inspections. Certification: EIC + LA Completion Certificate</li>
            <li><strong>Third Party Certification</strong> — Process: Engage registered third party certifier. Certification: EIC + Third Party Certificate</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Competent Person Schemes
            </p>
            
            <div className="p-2 rounded bg-white/5">NICEIC</div>
            <div className="p-2 rounded bg-white/5">NAPIT</div>
            <div className="p-2 rounded bg-white/5">ELECSA</div>
            <div className="p-2 rounded bg-white/5">STROMA</div>
            
            <p className="text-xs text-white mt-2">
            Scheme members must meet competence criteria, maintain technical competence, and are
            subject to periodic assessment.
            </p>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Note:</strong> Part P applies to England and Wales only. Scotland uses
            Building Standards, and Northern Ireland has its own Building Regulations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>F-gas Regulations - Refrigerant Handling</ContentEyebrow>

          <ConceptBlock title="F-gas Regulations - Refrigerant Handling">
            <p>
            The F-gas Regulation (EU 517/2014, retained in UK law) controls the use of fluorinated
            greenhouse gases (HFCs, PFCs, SF6) to combat climate change. For building services,
            this primarily affects air conditioning, refrigeration, and heat pump installations.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">
            Key requirements for building services:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            Personnel must hold appropriate certification (Categories I-IV)
            </li>
            <li>
            Refrigerant must be recovered during servicing and at end of life
            </li>
            <li>Leak checking requirements based on CO2-equivalent charge</li>
            <li>
            Records must be kept of refrigerant quantities and leak checks
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            F-gas Certification Categories
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Category I</strong> — Scope of Work: All activities - no charge limit. Typical Applications: Commercial HVAC contractors</li>
            <li><strong>Category II</strong> — Scope of Work: Recovery from equipment &lt;3kg charge. Typical Applications: Small systems, domestic AC</li>
            <li><strong>Category III</strong> — Scope of Work: Recovery from equipment &lt;3kg (hermetic). Typical Applications: Domestic refrigeration</li>
            <li><strong>Category IV</strong> — Scope of Work: Leak checking only. Typical Applications: Maintenance staff, inspectors</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Leak Checking Requirements
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>&lt;5 tonnes CO2e</strong> — Minimum Check Frequency: Not required. Notes: Good practice to check</li>
            <li><strong>5-50 tonnes CO2e</strong> — Minimum Check Frequency: Every 12 months. Notes: Every 24 months with leak detection</li>
            <li><strong>50-500 tonnes CO2e</strong> — Minimum Check Frequency: Every 6 months. Notes: Every 12 months with leak detection</li>
            <li><strong>&gt;500 tonnes CO2e</strong> — Minimum Check Frequency: Every 3 months. Notes: Leak detection mandatory</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Common Refrigerants and GWP
            </p>
            
            
            <p className="font-bold mb-1">R404A</p>
            <p className="text-xs text-white">GWP: 3922</p>
            <p className="text-xs text-red-400">Phase out</p>
            
            
            <p className="font-bold mb-1">R410A</p>
            <p className="text-xs text-white">GWP: 2088</p>
            <p className="text-xs text-orange-400">Restricted</p>
            
            
            <p className="font-bold mb-1">R32</p>
            <p className="text-xs text-white">GWP: 675</p>
            <p className="text-xs text-green-400">Alternative</p>
            
            
            <p className="font-bold mb-1">R290</p>
            <p className="text-xs text-white">GWP: 3</p>
            <p className="text-xs text-green-400">Natural</p>
            
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Trend:</strong> The industry is moving to lower-GWP alternatives. R32 is
            increasingly common for new split AC systems, while natural refrigerants (R290
            propane, R744 CO2) are used in supermarket refrigeration.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Waste Regulations - WEEE and Hazardous Waste</ContentEyebrow>

          <ConceptBlock title="Waste Regulations - WEEE and Hazardous Waste">
            <p>
            Building services work generates significant waste, from replaced equipment to
            packaging and construction materials. Proper classification and disposal is both a
            legal requirement and professional responsibility.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">WEEE Regulations 2013</p>
            <p className="text-sm text-white mb-3">
            The Waste Electrical and Electronic Equipment Regulations require proper disposal of
            electrical equipment through approved treatment facilities. This applies to
            equipment removed during upgrade or replacement work.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Producer responsibility:</strong> Manufacturers must finance collection
            and treatment
            </li>
            <li>
            <strong>Distributor take-back:</strong> Retailers must accept old equipment on
            like-for-like basis
            </li>
            <li>
            <strong>Holder responsibility:</strong> Business users must arrange proper
            disposal
            </li>
            <li>
            <strong>AATF:</strong> All WEEE must go to Approved Authorised Treatment
            Facilities
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Common Building Services WEEE
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Fluorescent tubes</strong> — Hazardous Components: Mercury, phosphor powder. Disposal Route: Hazardous waste collection</li>
            <li><strong>Air conditioning units</strong> — Hazardous Components: Refrigerant, oil. Disposal Route: F-gas recovery + AATF</li>
            <li><strong>Control panels</strong> — Hazardous Components: Batteries, capacitors. Disposal Route: AATF for WEEE</li>
            <li><strong>Older thermostats</strong> — Hazardous Components: Mercury switches. Disposal Route: Hazardous waste collection</li>
            <li><strong>UPS systems</strong> — Hazardous Components: Lead-acid batteries. Disposal Route: Battery recycler + AATF</li>
            </ul>
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Hazardous Waste Regulations 2005
            </p>
            <p className="text-sm text-white mb-3">
            Hazardous waste requires additional controls, documentation, and specialist disposal
            routes.
            </p>
            
            
            <p className="text-sm font-medium text-white mb-2">Common hazardous wastes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Fluorescent tubes (mercury)</li>
            <li>Lead-acid batteries</li>
            <li>Transformer oil (PCBs)</li>
            <li>Refrigerant gases</li>
            <li>Asbestos-containing materials</li>
            <li>Contaminated PPE/materials</li>
            </ul>
            
            
            <p className="text-sm font-medium text-white mb-2">Requirements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Consignment notes (not WTN)</li>
            <li>Premises registration (if producing &gt;500kg/year)</li>
            <li>Records kept for 3 years</li>
            <li>Licensed hazardous waste carrier</li>
            <li>Proper segregation on site</li>
            <li>Correct waste codes (EWC)</li>
            </ul>
            
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Waste Documentation Summary
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
            <p className="font-medium text-white mb-1">Waste Transfer Note (WTN)</p>
            <ul className="text-white space-y-0.5">
            <li>- Non-hazardous waste</li>
            <li>- Retain for 2 years</li>
            <li>- Both parties sign</li>
            </ul>
            </div>
            <div>
            <p className="font-medium text-white mb-1">Consignment Note (CN)</p>
            <ul className="text-white space-y-0.5">
            <li>- Hazardous waste only</li>
            <li>- Retain for 3 years</li>
            <li>- Unique reference number</li>
            </ul>
            </div>
            </div>
            

            <p className="text-sm text-white italic">
            <strong>Best practice:</strong> Establish relationships with reputable waste carriers
            and treatment facilities. Keep a waste management plan for each project identifying
            expected waste streams and disposal routes.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Additional Building Regulations">
            <p><strong>Part L - Conservation of Fuel and Power</strong></p>
            <p className="text-sm text-white mb-2">
            Part L sets energy efficiency requirements for building services installations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Lighting:</strong> Minimum efficacy requirements, controls for presence
            and daylight
            </li>
            <li>
            <strong>HVAC:</strong> Minimum efficiency standards, metering requirements
            </li>
            <li>
            <strong>Building fabric:</strong> Insulation, air tightness, thermal bridging
            </li>
            <li>
            <strong>Commissioning:</strong> Systems must be commissioned to achieve design
            performance
            </li>
            </ul>
            

            
            <p><strong>Part F - Ventilation</strong></p>
            <p className="text-sm text-white mb-2">
            Requirements for ventilation systems in buildings:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Minimum ventilation rates for different room types</li>
            <li>Extract requirements for kitchens, bathrooms, WCs</li>
            <li>Background ventilation provisions</li>
            <li>Commissioning and handover documentation</li>
            </ul>
            

            
            <p><strong>Part B - Fire Safety</strong></p>
            <p className="text-sm text-white mb-2">
            Fire safety requirements affecting building services:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Fire detection:</strong> Smoke/heat detector requirements and grades
            </li>
            <li>
            <strong>Emergency lighting:</strong> Coverage, duration, and testing
            </li>
            <li>
            <strong>Fire barriers:</strong> Maintaining compartmentation for cable routes
            </li>
            <li>
            <strong>Smoke control:</strong> Mechanical and natural ventilation systems
            </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Compliance Checklist">
            <div>
            <p><strong>Before Starting Work</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Identify if work is notifiable under Part P</li>
            <li>
            Check for other relevant Building Regulations (Part L, F, B)
            </li>
            <li>Establish waste streams and disposal routes</li>
            <li>
            Verify personnel hold required certifications (F-gas if applicable)
            </li>
            <li>
            Notify Building Control or competent person scheme as required
            </li>
            </ul>
            </div>

            <div>
            <p><strong>During Installation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Segregate waste streams on site</li>
            <li>Store hazardous materials securely</li>
            <li>Keep waste transfer notes for all collections</li>
            <li>Document refrigerant quantities if applicable</li>
            <li>Comply with BS 7671 throughout</li>
            </ul>
            </div>

            <div>
            <p><strong>On Completion</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Complete Electrical Installation Certificate</li>
            <li>Notify competent person scheme within 30 days</li>
            <li>Obtain Building Regulations Compliance Certificate</li>
            <li>Provide all documentation to property owner</li>
            <li>Retain copies for minimum 6 years</li>
            </ul>
            </div>

            <div>
            <p><strong>Common Compliance Failures</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Forgetting notification:</strong> Bathroom work is always notifiable
            </li>
            <li>
            <strong>Missing documentation:</strong> No EIC provided to customer
            </li>
            <li>
            <strong>Improper waste disposal:</strong> Fluorescent tubes in general skip
            </li>
            <li>
            <strong>F-gas non-compliance:</strong> No leak checking records
            </li>
            <li>
            <strong>Consumer unit changes:</strong> Assuming like-for-like exempt
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Strip-out of an old retail unit with mixed lamp waste and a battery UPS"
            situation={
              <>
                You are project-engineer on a high-street strip-out. The existing fit-out
                contains 230 fluorescent tubes, four 24 V sealed-lead-acid emergency lighting
                batteries and a 6 kVA online UPS with eight VRLA cells. The contractor wants
                them in the general waste skip.
              </>
            }
            whatToDo={
              <>
                Refuse. Apply EPA 1990 s.34 duty of care, the Hazardous Waste Regulations 2005
                (lead-acid batteries are absolute-entry hazardous waste), and the Waste
                Electrical and Electronic Equipment Regulations 2013 (UPS, lamps and emergency
                packs are all WEEE). Segregate at source: lamps to a registered tube recycler;
                batteries via a Battery Compliance Scheme; UPS to a B2B WEEE producer take-back
                or AATF. File the consignment notes for three years.
              </>
            }
            whyItMatters={
              <>
                Fly-tipping or mis-routing hazardous waste is an unlimited-fine offence and
                personal director liability under EPA s.157. The Environment Agency cross-checks
                consignment notes against carrier records.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Building Regulations 2010 — Part P (electrical), L (energy), F (ventilation), B (fire), M (access) — are statutory and enforced by Building Control.',
              'Part P notifiable work in dwellings: new circuits, consumer-unit replacements, work in special locations (bath/shower zones) — route via Competent Person Scheme.',
              'Environmental Protection Act 1990 s.34 imposes a personal duty of care for waste — non-delegable, with consignment notes the audit trail.',
              'Hazardous Waste Regulations 2005: WEEE, lamps, batteries, oils, paints, asbestos all sit on the absolute-entry list — segregate at source.',
              'WEEE Regulations 2013: B2B producer take-back applies to commercial UPS, lighting and EV equipment — design for end-of-life from concept.',
              'Energy Performance of Buildings Regulations 2012 trigger EPCs on construction, sale and let — your Part L design feeds directly in.',
              'DSEAR 2002 governs explosive atmospheres — zone classification applies to battery rooms, fuel stores and gas plant rooms.',
              'Water Supply (Water Fittings) Regulations 1999 sit alongside Part G — relevant when designing services that interface with the water supply.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 1
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module1-section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 2
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section1_6;
