import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Brain,
  Camera,
  Mic,
  Receipt,
  Send,
  FileCheck2,
  Search,
  ClipboardCheck,
  GraduationCap,
  ShieldCheck,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Calculator,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Observation Codes', href: '/guides/eicr-observation-codes-explained' },
];

const tocItems = [
  { id: 'what-are-observation-codes', label: 'What Are Observation Codes?' },
  { id: 'c1-danger-present', label: 'C1 — Danger Present' },
  { id: 'c2-potentially-dangerous', label: 'C2 — Potentially Dangerous' },
  { id: 'c3-improvement-recommended', label: 'C3 — Improvement Recommended' },
  { id: 'fi-further-investigation', label: 'FI — Further Investigation' },
  { id: 'overall-assessment', label: 'Overall Assessment' },
  { id: 'common-mistakes', label: 'Common Classification Mistakes' },
  { id: 'defect-code-ai', label: 'Defect Code AI' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'There are four EICR observation codes: C1 (Danger Present), C2 (Potentially Dangerous), C3 (Improvement Recommended), and FI (Further Investigation).',
  'Any C1 or C2 observation makes the overall EICR assessment Unsatisfactory — no exceptions.',
  'C3 observations are advisory and do not affect the overall assessment, but should still be communicated to the client.',
  'FI means the inspector could not fully assess part of the installation — further investigation is needed before a classification can be given.',
  'Elec-Mate Defect Code AI lets you describe a defect in plain English and returns the correct classification code with the matching BS 7671 regulation number.',
];

const faqs = [
  {
    question: 'What is the difference between C2 and C3 on an EICR?',
    answer:
      'C2 (Potentially Dangerous) means there is a risk of injury that requires urgent remedial action. The defect may not be causing harm right now, but it could cause injury under certain foreseeable conditions. C3 (Improvement Recommended) means the installation does not comply with the current edition of BS 7671, but the non-compliance is not dangerous. C3 items are advisory — they represent things that would be required if the installation were being designed and built today, but were acceptable under the regulations in force when the work was originally carried out. The key distinction is risk of injury: if the non-compliance could foreseeably lead to electric shock, fire, or burns, it is C2. If it is simply a departure from current best practice with no immediate or foreseeable danger, it is C3. For example, the absence of RCD protection on socket outlets in a bathroom is C2 (because of the heightened shock risk in a wet environment), whereas the absence of an SPD (surge protection device) that would be required for a new installation is typically C3.',
  },
  {
    question: 'Can an EICR have a C1 code and still be Satisfactory?',
    answer:
      'No. An EICR with any C1 or C2 observation must be classified as Unsatisfactory. This is a mandatory requirement under BS 7671. There are no exceptions, regardless of how minor the C1 defect might seem or how quickly it was remedied. Even if the inspector made the installation safe before leaving (for example, by isolating a dangerous circuit), the report must still record the C1 observation and the overall assessment must be Unsatisfactory. A separate remedial visit is required to permanently fix the defect, and the landlord or responsible person must be informed that the report is Unsatisfactory and remedial action is needed. Only after the remedial work is completed and confirmed by a qualified person can the installation be considered safe for continued use.',
  },
  {
    question: 'Should I record a C3 for old wiring colours that have not been re-identified?',
    answer:
      'This is a common question and the answer depends on whether the old colours create a safety risk. Under BS 7671 Regulation 514.14, where new cables are installed alongside existing cables in the old colour scheme (red/black instead of brown/blue), a warning notice must be fitted at the distribution board stating that two wiring colour schemes are present. If the warning notice is absent and mixed colours are present, this is typically a C2 because it creates a risk of incorrect identification, which could lead to a dangerous situation during future work. If the installation uses the old colour scheme throughout (no mixing) and there is no immediate risk, some inspectors record this as C3. The key factor is whether the old colours could lead to a mistake that causes injury. In an installation with only one colour scheme and no mixing, the risk is lower and C3 may be appropriate. But if colours are mixed without a warning notice, C2 is the correct code.',
  },
  {
    question: 'How do I decide whether a missing bonding connection is C1 or C2?',
    answer:
      'The distinction between C1 and C2 for missing bonding depends on the level of immediate danger. C1 (Danger Present) means a risk of injury exists right now. C2 (Potentially Dangerous) means a risk of injury may arise. For bonding: if the metalwork is accessible, could become live due to a fault, and there is no protective conductor connecting it to the earthing system, the question is whether the danger is present right now or only under fault conditions. Main protective bonding to gas, water, and oil services is required by Regulation 411.3.1.2. If main bonding is absent and the service pipes enter the building, metalwork in the property could become live if a fault develops on any connected appliance. Because this scenario is foreseeable and the consequences are severe (electric shock), missing main bonding is typically classified as C2. If there is clear evidence that metalwork is already at a dangerous potential (for example, a tingle when touching a pipe), that is C1 because the danger is present right now, not just potential.',
  },
  {
    question: 'What happens if I get the classification code wrong?',
    answer:
      'Getting a classification code wrong has real consequences. Over-classifying (recording C1 or C2 when C3 would be correct) can cause unnecessary alarm to the client and create pressure for remedial work that is not urgently needed. Under-classifying (recording C3 when C2 is correct) is more dangerous — it means a potentially dangerous defect is not flagged for urgent action, potentially leaving occupants at risk. For landlord EICRs, under-classification can also mean the report shows Satisfactory when it should be Unsatisfactory, which could leave the landlord non-compliant with the Electrical Safety Standards Regulations. Competent person scheme providers (NICEIC, NAPIT, ELECSA) regularly audit member reports and can take disciplinary action — including removal from the scheme — for consistent mis-classification. If you are ever unsure whether a defect is C2 or C3, the conservative approach is to classify it as C2 and let the client make the decision to remediate or seek a second opinion.',
  },
  {
    question: 'Is "lack of supplementary bonding in a bathroom" a C2 or C3?',
    answer:
      'This is one of the most commonly debated classifications. The answer depends on whether the installation meets the conditions of Regulation 701.415.2, which removed the requirement for supplementary bonding in bathrooms provided that: (1) all circuits in the bathroom are protected by a 30 mA RCD, and (2) the main protective bonding is in place and confirmed to be effective. If both conditions are met, supplementary bonding is no longer required under the current edition of BS 7671, and its absence should not be recorded as an observation at all — or at most as a C3 noting the historical departure. If either condition is NOT met (for example, a socket circuit in a bathroom without RCD protection), then the absence of supplementary bonding becomes a contributing factor to a more significant deficiency that would warrant a C2 classification. The point is that the classification depends on the full picture, not just a single missing item in isolation.',
  },
  {
    question: 'How does Elec-Mate Defect Code AI help with observation codes?',
    answer:
      'Elec-Mate includes a Defect Code AI tool built specifically for EICR classification. You describe the defect in plain English — for example, "missing earth connection on metal light fitting in kitchen" or "no RCD protection on socket circuit supplying outdoor equipment" — and the AI analyses the description against BS 7671 regulations. It returns the recommended classification code (C1, C2, C3, or FI), the relevant BS 7671 regulation reference, and a clear explanation of why that code applies. The AI draws on the full text of BS 7671:2018+A3:2024, IET Guidance Note 3, and common classification precedents. It does not replace your professional judgement — you can override the suggestion — but it provides a consistent, regulation-backed starting point that eliminates second-guessing on site. This is particularly valuable for less common defects where the correct classification is genuinely ambiguous.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanner and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/how-to-fill-in-eicr',
    title: 'How to Fill In an EICR',
    description: 'Step-by-step guide to completing every section of the EICR form correctly.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description: 'The correct order for dead and live testing per IET Guidance Note 3.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Legal requirements, penalties, and deadlines for landlord EICR inspections.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with 50+ structured training courses on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/eicr-cost-uk',
    title: 'EICR Cost UK 2026',
    description: 'Average EICR prices by property type and guidance on pricing your inspections.',
    icon: Calculator,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-are-observation-codes',
    heading: 'What Are EICR Observation Codes?',
    content: (
      <>
        <p>
          EICR observation codes are the classification system used to categorise defects,
          deficiencies, and departures from BS 7671 found during a periodic inspection and testing
          of an electrical installation. Every issue identified during the inspection is recorded in
          the observations table of the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            Electrical Installation Condition Report
          </SEOInternalLink>{' '}
          and assigned one of four classification codes.
        </p>
        <p>
          The codes are defined in BS 7671:2018+A3:2024 and are explained in detail in IET Guidance
          Note 3: Inspection and Testing (9th Edition, aligned with the 18th Edition of BS 7671).
          They serve a critical purpose: they communicate the severity of each defect to the person
          responsible for the installation (the client, landlord, or building owner) and determine
          the overall assessment of the installation — Satisfactory or Unsatisfactory.
        </p>
        <p>
          Getting the codes right matters. Under-classifying a dangerous defect as C3 instead of C2
          could leave occupants at risk. Over-classifying a non-dangerous departure as C2 creates
          unnecessary alarm and undermines the credibility of the report. The four codes are:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          {[
            {
              code: 'C1',
              label: 'Danger Present',
              colour: 'text-red-400',
              bg: 'bg-red-500/10',
              border: 'border-red-500/20',
            },
            {
              code: 'C2',
              label: 'Potentially Dangerous',
              colour: 'text-orange-400',
              bg: 'bg-orange-500/10',
              border: 'border-orange-500/20',
            },
            {
              code: 'C3',
              label: 'Improvement Recommended',
              colour: 'text-blue-400',
              bg: 'bg-blue-500/10',
              border: 'border-blue-500/20',
            },
            {
              code: 'FI',
              label: 'Further Investigation',
              colour: 'text-purple-400',
              bg: 'bg-purple-500/10',
              border: 'border-purple-500/20',
            },
          ].map((item) => (
            <div
              key={item.code}
              className={`rounded-xl ${item.bg} ${item.border} border p-4 text-center`}
            >
              <div className={`text-2xl font-bold ${item.colour} mb-1`}>{item.code}</div>
              <div className="text-sm text-white font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'c1-danger-present',
    heading: 'C1 — Danger Present',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center font-bold text-red-400 text-xl">
              C1
            </span>
            <div>
              <h3 className="font-bold text-white text-lg">Danger Present</h3>
              <p className="text-white text-sm">
                Risk of injury. Immediate remedial action required.
              </p>
            </div>
          </div>
          <p className="text-white leading-relaxed">
            A C1 code means there is an immediate risk of injury from the defect. The danger exists
            right now — not under some future fault condition, but at the time of the inspection.
            The inspector must take immediate action to mitigate the danger before leaving site.
            This could mean isolating a circuit, disconnecting dangerous equipment, or making
            emergency temporary repairs. The person responsible for the installation must be advised
            to take immediate action.
          </p>
        </div>
        <h4 className="font-bold text-white text-lg mb-3">Real Examples of C1 Defects</h4>
        <div className="space-y-3 mb-4">
          {[
            'Exposed live conductors accessible to occupants — for example, a damaged socket faceplate with live terminals visible, or a junction box with a missing cover in an accessible location.',
            'Absence of earthing on exposed metalwork that is live — for example, a metal light fitting with no earth connection where the live conductor has come into contact with the metalwork.',
            'A consumer unit with the cover removed or damaged, exposing live busbars that could be touched.',
            'An electric shower with a broken connection that has resulted in the metalwork of the shower unit becoming live.',
            'A cable that has been damaged by rodents or mechanical impact, with live conductors exposed and accessible.',
          ].map((example, i) => (
            <div key={i} className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <p className="text-white text-sm leading-relaxed">{example}</p>
            </div>
          ))}
        </div>
        <p>
          C1 defects are relatively rare in practice. Most inspectors encounter them infrequently
          because truly dangerous conditions tend to be obvious even before formal testing. However,
          when they are found, they must be addressed immediately and cannot be left for the client
          to deal with later.
        </p>
      </>
    ),
  },
  {
    id: 'c2-potentially-dangerous',
    heading: 'C2 — Potentially Dangerous',
    content: (
      <>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center font-bold text-orange-400 text-xl">
              C2
            </span>
            <div>
              <h3 className="font-bold text-white text-lg">Potentially Dangerous</h3>
              <p className="text-white text-sm">
                Risk of injury may arise. Urgent remedial action required.
              </p>
            </div>
          </div>
          <p className="text-white leading-relaxed">
            A C2 code means there is no immediate danger at the time of inspection, but a risk of
            injury could arise under reasonably foreseeable conditions. The defect is serious enough
            that it requires urgent remedial action — it cannot simply be noted and left. C2 is the
            most common classification for significant defects found during periodic inspections,
            and it is the code that causes the most debate between electricians.
          </p>
        </div>
        <h4 className="font-bold text-white text-lg mb-3">Real Examples of C2 Defects</h4>
        <div className="space-y-3 mb-4">
          {[
            'Absence of RCD protection on socket outlet circuits where required by BS 7671 Regulation 411.3.4 — particularly in bathrooms, kitchens, and circuits supplying equipment intended for outdoor use.',
            'Missing circuit protective conductor (CPC / earth wire) connection at an accessory — the socket or light fitting has no earth, meaning metalwork could become live under a fault condition.',
            'Earth fault loop impedance (Zs) exceeding the maximum permitted value for the protective device — meaning the device may not disconnect within the required time during a fault.',
            'Absence of main protective bonding to gas, water, or oil services as required by Regulation 411.3.1.2.',
            'A circuit breaker or fuse that is incorrectly rated for the cable it protects — for example, a 32A MCB protecting a 1.0mm squared cable.',
            'Mixed wiring colours (old red/black with new brown/blue) without the required warning notice at the distribution board.',
            'An RCD that fails to trip within the required time during testing.',
            'Lack of adequate overcurrent protection — for example, a rewirable fuse that has been replaced with incorrectly rated fuse wire.',
          ].map((example, i) => (
            <div key={i} className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <p className="text-white text-sm leading-relaxed">{example}</p>
            </div>
          ))}
        </div>
        <p>
          C2 is the code that generates the most remedial work. For{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">landlord EICRs</SEOInternalLink>, any
          C2 observation makes the report Unsatisfactory and triggers the 28-day remedial deadline.
          For electricians, this is where the remedial quoting opportunity lies.
        </p>
        <SEOAppBridge
          title="Defect Code AI: describe it, get the right code"
          description="Not sure if it is C2 or C3? Type or dictate the defect in plain English and Elec-Mate's AI returns the correct classification code with the matching BS 7671 regulation number. No more guesswork."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'c3-improvement-recommended',
    heading: 'C3 — Improvement Recommended',
    content: (
      <>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center font-bold text-blue-400 text-xl">
              C3
            </span>
            <div>
              <h3 className="font-bold text-white text-lg">Improvement Recommended</h3>
              <p className="text-white text-sm">
                Does not comply with current standard but not dangerous.
              </p>
            </div>
          </div>
          <p className="text-white leading-relaxed">
            A C3 code means the installation does not comply with the current edition of BS 7671 but
            the non-compliance is not dangerous and does not pose a foreseeable risk of injury. C3
            items are advisory — they represent improvements that would be required if the
            installation were being designed and installed today, but were acceptable under the
            regulations in force when the original work was carried out. C3 observations do not
            affect the overall assessment of the EICR. A report with only C3 observations (and no C1
            or C2) is classified as Satisfactory.
          </p>
        </div>
        <h4 className="font-bold text-white text-lg mb-3">Real Examples of C3 Observations</h4>
        <div className="space-y-3 mb-4">
          {[
            'Absence of surge protection device (SPD) — required for new installations under BS 7671 Regulation 443.4.1 but not dangerous if absent in an existing installation.',
            'Older wiring colours (red/black) throughout the installation where no mixing with new colours has occurred — not dangerous but noted as a departure from the current harmonised colour scheme.',
            'Absence of supplementary bonding in a bathroom where the conditions of Regulation 701.415.2 are met (all circuits RCD protected, main bonding effective) — no longer required by current regulations.',
            'Lack of cable support clips at the intervals specified in the current edition — typically seen in older installations where the cable is securely fixed but not at the precise intervals required today.',
            'Absence of IP-rated accessories in a location where the current edition would require them, but the existing accessories are in serviceable condition and the location does not present an immediate hazard.',
          ].map((example, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <p className="text-white text-sm leading-relaxed">{example}</p>
            </div>
          ))}
        </div>
        <p>
          While C3 items are not mandatory to fix, they should be communicated to the client
          clearly. Many clients choose to address C3 items during the remedial visit for C2 defects,
          as the electrician is already on site and the incremental cost is low. From a professional
          standpoint, recording C3 items demonstrates thoroughness and helps the client understand
          what would need to be addressed if the installation were to be brought fully up to the
          current standard.
        </p>
      </>
    ),
  },
  {
    id: 'fi-further-investigation',
    heading: 'FI — Further Investigation',
    content: (
      <>
        <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center font-bold text-purple-400 text-xl">
              FI
            </span>
            <div>
              <h3 className="font-bold text-white text-lg">Further Investigation</h3>
              <p className="text-white text-sm">
                Could not be fully assessed. Investigation needed without delay.
              </p>
            </div>
          </div>
          <p className="text-white leading-relaxed">
            FI is different from the other three codes. It does not classify the severity of a known
            defect — it indicates that the inspector could not fully assess a part of the
            installation. The reason may be restricted access, unexpected test results that need
            deeper analysis, or concealed wiring that shows signs of deterioration but cannot be
            fully examined without more intrusive investigation. FI means "we do not know the full
            picture yet" and further work is required to determine whether the issue is C1, C2, C3,
            or actually acceptable.
          </p>
        </div>
        <h4 className="font-bold text-white text-lg mb-3">Real Examples of FI Observations</h4>
        <div className="space-y-3 mb-4">
          {[
            'Insulation resistance readings that are low but not definitive — for example, a reading of 1.5 megohms on a circuit where 200+ megohms would be expected. The cable may be deteriorating but cannot be fully assessed without lifting floorboards or opening up walls.',
            'A circuit that could not be tested because equipment could not be disconnected — for example, a dedicated circuit supplying a burglar alarm or medical equipment where the client would not permit disconnection.',
            'Signs of overheating at a connection that could not be fully accessed — for example, discolouration visible through a gap in a ceiling void that requires removal of the ceiling to investigate fully.',
            'An earth electrode on a TT system where the resistance is borderline and the electrode cannot be accessed for further testing without excavation.',
            'A consumer unit or distribution board in a locked room or behind fixed furniture that could not be accessed during the inspection.',
          ].map((example, i) => (
            <div key={i} className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <p className="text-white text-sm leading-relaxed">{example}</p>
            </div>
          ))}
        </div>
        <p>
          FI observations must be actioned "without delay." The client or landlord should arrange
          for the further investigation to take place as soon as practicable. Once the investigation
          is complete, the FI code is replaced with the appropriate classification (C1, C2, C3, or
          removed entirely if no defect is found). For{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">landlord EICRs</SEOInternalLink>, FI
          observations should be treated with urgency — a local authority may consider an unresolved
          FI as evidence that the landlord has not met their obligations.
        </p>
      </>
    ),
  },
  {
    id: 'overall-assessment',
    heading: 'How Observation Codes Determine the Overall Assessment',
    content: (
      <>
        <p>
          The overall assessment on an EICR is determined entirely by the observation codes present
          in the report. The rules are straightforward:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
              <h4 className="font-bold text-white text-lg">Satisfactory</h4>
            </div>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>No C1 observations</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>No C2 observations</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>C3 observations may be present (advisory only)</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>FI observations may be present (need follow-up)</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-center gap-3 mb-3">
              <XCircle className="w-8 h-8 text-red-400" />
              <h4 className="font-bold text-white text-lg">Unsatisfactory</h4>
            </div>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Any C1 observation present</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Any C2 observation present</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Even a single C1 or C2 makes it Unsatisfactory</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>No exceptions — regardless of remedial action taken</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          Elec-Mate tracks observation codes in real time as you add them to the EICR. The moment
          you add a C1 or C2 observation, the overall assessment flips to Unsatisfactory
          automatically. This eliminates the human error of accidentally marking a report
          Satisfactory when a C2 defect is present — one of the most common mistakes flagged by
          scheme provider audits.
        </p>
        <p>
          Note that FI observations do not, by themselves, make the report Unsatisfactory. However,
          an FI should prompt the inspector to consider whether the unknown condition could
          reasonably be expected to be dangerous. If so, the professional approach is to recommend
          that the further investigation is carried out urgently and to note this in the report.
        </p>
        <SEOAppBridge
          title="Auto overall assessment — no human error"
          description="Elec-Mate watches your observation codes in real time. The moment a C1 or C2 is added, the overall assessment flips to Unsatisfactory automatically. You cannot accidentally mark an unsafe installation as Satisfactory."
          icon={ShieldCheck}
        />
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Classification Mistakes to Avoid',
    content: (
      <>
        <p>
          Getting observation codes wrong is one of the most common reasons for EICR reports being
          rejected or queried by competent person scheme providers. Here are the mistakes inspectors
          make most often:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Recording C3 when C2 is correct for missing RCD protection
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  The absence of RCD protection on socket circuits in wet areas (bathrooms, kitchens
                  near sinks) is a C2 defect, not C3. While the circuit may have been compliant when
                  originally installed, the risk of electric shock in wet environments is a
                  foreseeable danger that warrants urgent remedial action. C3 would only apply where
                  the absence of RCD protection creates no foreseeable risk of injury — which is
                  difficult to justify for any socket circuit in a domestic property.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Marking the report Satisfactory with a C2 present
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  This is a hard rule with no exceptions. Any C1 or C2 observation makes the overall
                  assessment Unsatisfactory. Some electricians mark a report Satisfactory despite a
                  C2 being present because the client pressures them or because the defect seems
                  minor. This is incorrect and will be flagged by scheme provider audits. It can
                  result in disciplinary action and, in a landlord context, could leave the landlord
                  unknowingly non-compliant with the 2020 Regulations.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Vague observation descriptions</h4>
                <p className="text-white text-sm leading-relaxed">
                  Writing "no bonding" or "RCD fail" is not sufficient. The observation must include
                  enough detail that a different electrician could find and rectify the issue: what
                  is missing, where it is located, and (ideally) the relevant BS 7671 regulation
                  reference. For example: "Absence of main protective bonding to incoming gas supply
                  at meter position — Regulation 411.3.1.2" is far more useful than "no bonding."
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Using FI to avoid making a classification decision
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  FI should only be used when you genuinely could not fully assess the issue. It is
                  not a catch-all for "I am not sure what code to use." If you can see the defect,
                  can identify the problem, and have enough information to classify it, it should be
                  classified as C1, C2, or C3 — not FI. Over-use of FI is a red flag in scheme
                  provider audits and suggests the inspector may not have the competence or
                  confidence to make classification decisions.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Not recording C3 observations at all</h4>
                <p className="text-white text-sm leading-relaxed">
                  Some inspectors skip C3 items because they do not affect the overall assessment.
                  This is poor practice. Recording C3 items demonstrates thoroughness, provides the
                  client with a complete picture of their installation, and creates a record for
                  future inspections. It also generates additional remedial work opportunities —
                  many clients choose to address C3 items alongside C2 remedials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'defect-code-ai',
    heading: 'Elec-Mate Defect Code AI: The Right Code Every Time',
    content: (
      <>
        <p>
          The hardest part of completing an EICR is not the testing — it is deciding what code to
          assign. Is missing bonding in the bathroom C2 or C3? Is a Zs reading that is 5% over the
          maximum a C2 or just a marginal pass? Is the absence of an SPD a C3 or should it not be
          recorded at all?
        </p>
        <p>
          Elec-Mate solves this with the Defect Code AI — one of the 8 Elec-AI agents built into the
          app. Here is how it works:
        </p>
        <div className="rounded-2xl bg-gradient-to-r from-blue-500/10 to-blue-600/5 border border-blue-500/20 p-6 my-4">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center shrink-0">
                <span className="font-bold text-blue-400">1</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Describe the defect in plain English</h4>
                <p className="text-white text-sm leading-relaxed">
                  Type or dictate: "No RCD protection on socket circuit in bathroom" or "Missing
                  earth connection on metal light fitting in upstairs landing" or "Zs reading of
                  1.92 ohms on a B32 radial circuit."
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center shrink-0">
                <span className="font-bold text-blue-400">2</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">AI returns the classification</h4>
                <p className="text-white text-sm leading-relaxed">
                  The AI analyses your description against BS 7671:2018+A3:2024 and IET Guidance
                  Note 3. It returns the recommended code (C1, C2, C3, or FI), the specific BS 7671
                  regulation reference, and an explanation of why that code applies.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center shrink-0">
                <span className="font-bold text-blue-400">3</span>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Accept, override, or adjust</h4>
                <p className="text-white text-sm leading-relaxed">
                  You always have the final say. If you agree with the AI classification, tap to add
                  it to the EICR. If you disagree, override it with your professional judgement. The
                  AI provides a starting point — you make the decision.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          The Defect Code AI eliminates the most time-consuming and stressful part of EICR
          completion. Instead of flicking through GN3 trying to decide between C2 and C3, you get a
          regulation-backed answer in seconds. Combine it with the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">AI board scanner</SEOInternalLink>, voice
          test entry, and the remedial works estimator, and you have a complete EICR workflow that
          runs from arrival on site to sending the finished certificate — all from your phone.
        </p>
        <SEOAppBridge
          title="Try Defect Code AI free for 7 days"
          description="Describe any defect in plain English and get the correct EICR classification code with the matching BS 7671 regulation. No more second-guessing between C2 and C3."
          icon={Brain}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRObservationCodesPage() {
  return (
    <GuideTemplate
      title="EICR Observation Codes C1 C2 C3 FI Explained"
      description="Complete guide to EICR observation codes C1, C2, C3, and FI. Real examples of each classification, how they affect the overall assessment, common mistakes, and how Elec-Mate's Defect Code AI gets the right code every time."
      datePublished="2025-01-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Classification Guide"
      badgeIcon={Search}
      heroTitle={
        <>
          EICR Observation Codes:{' '}
          <span className="text-yellow-400">C1, C2, C3, and FI Explained</span>
        </>
      }
      heroSubtitle="Every defect on an EICR must be classified as C1, C2, C3, or FI. The code you choose determines whether the report is Satisfactory or Unsatisfactory — and whether the landlord faces a £30,000 penalty. This guide explains each code with real examples, common mistakes, and how Elec-Mate's Defect Code AI gets the right answer every time."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICR Observation Codes"
      relatedPages={relatedPages}
      ctaHeading="Never second-guess an observation code again"
      ctaSubheading="Elec-Mate's Defect Code AI describes defects in plain English and returns the correct classification with the matching BS 7671 regulation. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
