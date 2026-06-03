import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  FileCheck2,
  Cable,
  BookOpen,
  Activity,
  ClipboardCheck,
  Camera,
  Palette,
  ShieldCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Cable Colour Codes UK', href: '/guides/cable-colour-codes-uk' },
];

const tocItems = [
  { id: 'current-colours', label: 'Current Harmonised Colours' },
  { id: 'old-uk-colours', label: 'Old UK Colours (Pre-2004)' },
  { id: 'three-phase-colours', label: 'Three-Phase Colours' },
  { id: 'flex-colours', label: 'Flexible Cable Colours' },
  { id: 'identification-requirements', label: 'BS 7671 Identification Requirements' },
  { id: 'mixed-installations', label: 'Mixed Colour Installations' },
  { id: 'a4-notices', label: 'A4:2026 New Notice Requirements' },
  { id: 'sleeving-requirements', label: 'Sleeving and Marking' },
  { id: 'common-mistakes', label: 'Common Identification Mistakes' },
  { id: 'faq', label: 'FAQs' },
  { id: 'related', label: 'Related Guides' },
];

const keyTakeaways = [
  'Current harmonised cable colours (introduced 2004, mandatory from 2006): Brown = Line, Blue = Neutral, Green/Yellow = Earth. These colours align with European harmonised standards and replaced the old UK-specific colours.',
  'Old UK colours (pre-2004): Red = Line, Black = Neutral, Green (or bare) = Earth. These colours are still found in many existing installations and must be correctly identified during inspection and testing.',
  'Three-phase colours: Current system uses Brown (L1), Black (L2), Grey (L3). The old system used Red (L1), Yellow (L2), Blue (L3). In mixed installations, the On-Site Guide (OSG Reg 6.12) recommends a caution notice at the distribution board — note that BS 7671 Reg 514.14, which previously mandated this notice, was deleted in A4:2026 and a replacement regulation is forthcoming.',
  'BS 7671 Regulation 514.3.1 requires that cable cores shall be identified by colour as required by Regulation 514.4. Missing or incorrect identification is a deficiency on an EICR. Regulation 514.4.2 specifies that green-and-yellow bi-colour sleeving shall cover 30%–70% of the conductor surface with the remaining area in the other colour.',
  'Elec-Mate board scanner identifies cable colours from consumer unit photographs and flags incorrect or missing identification. The app auto-populates circuit details including conductor identification into your certificate.',
];

const faqs = [
  {
    question: 'What are the current cable colours in the UK?',
    answer:
      'The current cable colour code in the UK uses harmonised colours that align with European standards. For single-phase circuits: Brown is the line conductor, Blue is the neutral conductor, and Green/Yellow striped is the earth (protective) conductor. For three-phase circuits: Brown is Line 1 (L1), Black is Line 2 (L2), Grey is Line 3 (L3), Blue is the neutral, and Green/Yellow is the earth. These colours were introduced in 2004 by BS 7671 Amendment 2 and became mandatory for all new installations from 2006. All cable manufacturers now produce cables in these colours as standard.',
  },
  {
    question: 'What were the old UK cable colours?',
    answer:
      'The old UK cable colour code, used before 2004, was: Red for the line conductor, Black for the neutral conductor, and Green (or bare copper) for the earth conductor. For three-phase circuits: Red was L1, Yellow was L2, Blue was L3, and Black was the neutral. These colours are still found in many existing installations, particularly in properties that have not been rewired since before 2006. During an EICR, the inspector must correctly identify these old colours. Note that Blue was a phase colour in the old three-phase system but is the neutral colour in the new harmonised system — this is the most dangerous potential confusion point.',
  },
  {
    question: 'Do I need to rewire an installation with old colours?',
    answer:
      'No. An installation using the old pre-2004 colour code does not need to be rewired purely because of the colours. The old colours were compliant when installed and remain acceptable in existing installations. Note: BS 7671 Regulation 514.14, which previously required a warning notice in mixed-colour installations, was deleted in BS 7671:2018+A4:2026 and a replacement regulation is forthcoming. The On-Site Guide (OSG Reg 6.12) continues to recommend affixing a caution notice at or near the distribution board reading: "Caution — This installation has wiring colours to two versions of BS 7671. Great care should be taken before undertaking extension, alteration or repair that all conductors are correctly identified." Following this guidance remains good practice. If old-colour circuits have conductors used as switch wires without correct identification sleeving, this is a deficiency.',
  },
  {
    question: 'What colour is a switch wire in the old system?',
    answer:
      'In the old UK colour code, two-core and earth cable was used for switch drops, with Red as the permanent line to the switch and Black as the switched line (switch return). The Black conductor in this application is actually carrying a line voltage when the switch is on, so it should be sleeved with Red sleeving at both ends to identify it as a line conductor. Missing Red sleeving on Black switch wires is one of the most common defects found during EICRs on older installations. In the current harmonised system, the equivalent is Brown as the permanent line and Blue as the switched line, with the Blue conductor sleeved Brown at both ends.',
  },
  {
    question: 'What are the flexible cable colours in the UK?',
    answer:
      "Flexible cables (flex) used for appliance connections, extension leads, and portable equipment use the same harmonised colours as fixed wiring: Brown for line, Blue for neutral, and Green/Yellow for earth. Older flex cables may use the old colours (Red, Black, Green/Yellow — note that old flex already used Green/Yellow for earth, unlike old fixed wiring which sometimes used just green or bare copper). Two-core flex without an earth conductor uses Brown and Blue only. Three-core flex includes all three conductors. The current rating of a flexible cable depends on its conductor cross-sectional area, installation method, and ambient temperature — refer to the manufacturer's data and BS 7671 Appendix 4 for the applicable current-carrying capacity for the specific flex type and installation condition.",
  },
  {
    question: 'What warning notice is required for mixed colour installations?',
    answer:
      'BS 7671 Regulation 514.14, which previously required a specific warning notice for mixed-colour installations, was deleted in BS 7671:2018+A4:2026 (a replacement regulation is forthcoming). The On-Site Guide (OSG Reg 6.12) continues to recommend a notice at or near the appropriate distribution board with the wording: "Caution — This installation has wiring colours to two versions of BS 7671. Great care should be taken before undertaking extension, alteration or repair that all conductors are correctly identified." The notice should be durable and legible. Because there is currently no operative regulation mandating this notice, EICR observations for a missing notice do not have a confirmed BS 7671 regulatory basis — the practice is recommended by the OSG but no current C-code classification is prescribed in the standard. Elec-Mate includes pre-formatted notice text that can be printed and applied on site.',
  },
];

const relatedPages = [
  {
    href: '/guides/wiring-colours-uk',
    title: 'Wiring Colours UK',
    description: 'Detailed guide to all UK wiring colours with diagrams.',
    icon: Cable,
    category: 'Guide' as const,
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description: 'Consumer unit change requirements and wiring standards.',
    icon: ShieldCheck,
    category: 'Guide' as const,
  },
  {
    href: '/guides/distribution-board-wiring',
    title: 'Distribution Board Wiring',
    description: 'Three-phase distribution board wiring and colour coding.',
    icon: Activity,
    category: 'Guide' as const,
  },
  {
    href: '/guides/house-rewire-guide',
    title: 'House Rewire Guide',
    description: 'Complete guide to domestic rewiring including colour changeover.',
    icon: Cable,
    category: 'Guide' as const,
  },
  {
    href: '/guides/polarity-testing-guide',
    title: 'Polarity Testing Guide',
    description: 'Verify correct conductor connections at every point.',
    icon: ClipboardCheck,
    category: 'Guide' as const,
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition',
    description: 'Complete guide to the current Wiring Regulations.',
    icon: BookOpen,
    category: 'Regulations' as const,
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'current-colours',
    heading: 'Current Harmonised Cable Colours (Post-2004)',
    content: (
      <>
        <p>
          The current cable colour code used in the UK was introduced by Amendment 2 to BS 7671:2001
          in 2004 and became mandatory for all new installations from 31 March 2006. These colours
          are "harmonised" — meaning they align with the colour code used across Europe under the
          CENELEC harmonisation documents.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Single-Phase Harmonised Colours</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-amber-900/30 border border-amber-700/40">
              <span className="text-white font-bold">Line (Phase)</span>
              <span className="text-yellow-400 font-bold">Brown</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-blue-900/30 border border-blue-700/40">
              <span className="text-white font-bold">Neutral</span>
              <span className="text-yellow-400 font-bold">Blue</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-green-900/30 border border-green-700/40">
              <span className="text-white font-bold">Earth (Protective)</span>
              <span className="text-yellow-400 font-bold">Green/Yellow</span>
            </div>
          </div>
        </div>
        <p>
          These colours are used in all types of fixed wiring cable — twin and earth (flat cable),
          SWA (steel wire armoured), MICC (mineral insulated copper clad), and singles in conduit or
          trunking. The earth conductor in twin and earth cable is bare copper and must be sleeved
          with green/yellow sleeving at every termination point and at every accessible position.
        </p>
        <p>
          The harmonised colours solved a long-standing problem with international trade and
          cross-border electrical work. Before harmonisation, each country had its own colour code,
          creating potential confusion for imported equipment and for electricians working across
          European borders.
        </p>
      </>
    ),
  },
  {
    id: 'old-uk-colours',
    heading: 'Old UK Cable Colours (Pre-2004)',
    content: (
      <>
        <p>
          The old UK cable colour code was used for decades before the harmonised colours were
          introduced. Many existing installations still use these colours, and every electrician
          must be able to identify them correctly during{' '}
          <SEOInternalLink href="/tools/eicr-certificate">inspection and testing</SEOInternalLink>.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Old UK Single-Phase Colours</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-red-900/30 border border-red-700/40">
              <span className="text-white font-bold">Line (Phase)</span>
              <span className="text-yellow-400 font-bold">Red</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-900/60 border border-gray-700/40">
              <span className="text-white font-bold">Neutral</span>
              <span className="text-yellow-400 font-bold">Black</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-green-900/30 border border-green-700/40">
              <span className="text-white font-bold">Earth (Protective)</span>
              <span className="text-yellow-400 font-bold">Green (or bare copper)</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <div>
              <h4 className="font-bold text-white mb-2">Critical Confusion Point</h4>
              <p className="text-white text-sm leading-relaxed">
                Black is the neutral colour in the old system but is the L2 phase colour in the new
                three-phase system. Blue is the neutral colour in the new system but was the L3
                phase colour in the old three-phase system. This overlap creates a serious safety
                risk in mixed-colour installations and is the primary reason warning notices are
                mandatory.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'three-phase-colours',
    heading: 'Three-Phase Cable Colours',
    content: (
      <>
        <p>
          Three-phase colour codes changed along with single-phase colours during the 2004
          harmonisation. The change in three-phase colours is more significant because it introduces
          new colours (Black and Grey) and reassigns existing colours (Blue) to different functions.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <h3 className="font-bold text-yellow-400 text-lg mb-3">Current Three-Phase Colours</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <strong>L1:</strong> Brown
              </li>
              <li>
                <strong>L2:</strong> Black
              </li>
              <li>
                <strong>L3:</strong> Grey
              </li>
              <li>
                <strong>Neutral:</strong> Blue
              </li>
              <li>
                <strong>Earth:</strong> Green/Yellow
              </li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white text-lg mb-3">Old Three-Phase Colours</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <strong>L1:</strong> Red
              </li>
              <li>
                <strong>L2:</strong> Yellow
              </li>
              <li>
                <strong>L3:</strong> Blue
              </li>
              <li>
                <strong>Neutral:</strong> Black
              </li>
              <li>
                <strong>Earth:</strong> Green (or bare copper)
              </li>
            </ul>
          </div>
        </div>
        <p>
          The three-phase colour change is particularly important for{' '}
          <SEOInternalLink href="/guides/distribution-board-wiring">
            distribution board wiring
          </SEOInternalLink>{' '}
          and{' '}
          <SEOInternalLink href="/guides/three-phase-installation">
            three-phase installations
          </SEOInternalLink>
          . Incorrect identification of three-phase conductors can result in incorrect phase
          rotation, which can damage three-phase motors and other equipment. It can also create
          dangerous voltage conditions if a conductor assumed to be neutral is actually a phase.
        </p>
      </>
    ),
  },
  {
    id: 'flex-colours',
    heading: 'Flexible Cable (Flex) Colours',
    content: (
      <>
        <p>
          Flexible cables used for appliance connections, extension leads, and portable equipment
          have always used a slightly different colour convention from fixed wiring. The current
          harmonised flex colours are the same as fixed wiring — Brown (line), Blue (neutral), and
          Green/Yellow (earth).
        </p>
        <p>
          Older flex cables manufactured before the 2004 harmonisation used a different old flex
          colour code: Brown (line), Blue (neutral), and Green/Yellow (earth). Note that old flex
          already used Brown and Blue — the old flex colours happened to match the future harmonised
          colours for single-phase. The difference was in fixed wiring, where the old UK colours
          (Red, Black, Green) applied.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Common Flex Cable Types</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong className="text-yellow-400">2-core flex (no earth):</strong> Brown and Blue
                only. Used for double-insulated (Class II) equipment such as some power tools, phone
                chargers, and table lamps. The flex has no earth conductor because the equipment
                does not require an earth connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong className="text-yellow-400">3-core flex (with earth):</strong> Brown, Blue,
                and Green/Yellow. Used for Class I equipment that requires an earth connection —
                kettles, irons, toasters, washing machines, and most domestic appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong className="text-yellow-400">Heat-resistant flex:</strong> Same colours but
                manufactured with heat-resistant insulation (typically silicone or butyl rubber).
                Used for immersion heaters, storage heaters, and other equipment that generates
                significant heat at the connection point.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'identification-requirements',
    heading: 'BS 7671 Conductor Identification Requirements',
    content: (
      <>
        <p>
          BS 7671 Section 514 sets out the requirements for conductor identification. Regulation
          514.3.1 requires that cable cores shall be identified by colour as required by Regulation
          514.4 (except where Regulation 514.6 exempts identification). The specific colours,
          application points, and bi-colour ratios are then set out in Regulation 514.4. This is not
          optional — it is a regulatory requirement.
        </p>
        <p>Key identification requirements include:</p>
        <ul className="space-y-3 my-4">
          <li className="flex items-start gap-3">
            <span className="text-white">
              <strong className="text-yellow-400">Protective conductors</strong> — must be
              identified by the bi-colour combination green-and-yellow, which shall be used
              exclusively for protective conductors and no other purpose (Regulation 514.4.2). The
              bi-colour must cover the full conductor: one colour covering 30%–70% of the surface
              and the other colour covering the remainder. A bare copper earth conductor in twin and
              earth cable must be sleeved with green/yellow sleeving at every termination.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-white">
              <strong className="text-yellow-400">Line conductors used as switch wires</strong> —
              where a blue (or black in old wiring) conductor is used as a switched line, it must be
              identified with brown (or red in old wiring) sleeving or tape at both ends to indicate
              that it is carrying a line voltage, not a neutral.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-white">
              <strong className="text-yellow-400">Neutral conductors</strong> — the neutral
              conductor must be identified by the colour blue (or black in old wiring) and must not
              be used for any purpose other than a neutral conductor, except where identified as a
              switched line with appropriate sleeving.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-white">
              <strong className="text-yellow-400">Three-phase identification</strong> — in
              three-phase circuits, each phase must be clearly identified at every termination
              point. Where cables are grouped, individual identification by colour or marking is
              essential to prevent phase confusion.
            </span>
          </li>
        </ul>
        <p>
          During an <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>, missing
          or incorrect conductor identification is recorded as an observation. Missing earth
          sleeving is typically C3. Missing switch wire sleeving where it creates a{' '}
          <SEOInternalLink href="/guides/polarity-testing-guide">polarity</SEOInternalLink>{' '}
          identification risk may be C2.
        </p>
      </>
    ),
  },
  {
    id: 'mixed-installations',
    heading: 'Mixed Colour Installations',
    content: (
      <>
        <p>
          Many UK installations contain wiring from both the old and new colour codes. This is
          perfectly legal — the old colours were compliant when installed and do not need to be
          replaced. However, the presence of both colour codes in the same installation creates a
          significant identification risk that must be managed.
        </p>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <div>
              <h4 className="font-bold text-white mb-2">A4:2026 Change — Reg 514.14 Deleted</h4>
              <p className="text-white text-sm leading-relaxed">
                BS 7671 Regulation 514.14, which previously required a mandatory warning notice for
                mixed-colour installations, has been deleted in BS 7671:2018+A4:2026. A replacement
                regulation is forthcoming. When citing a regulatory basis on EICR documentation, do
                not reference Reg 514.14 — there is no current text at that clause number.
              </p>
            </div>
          </div>
        </div>
        <p>
          The On-Site Guide (OSG Reg 6.12) continues to recommend affixing a caution notice at or
          near the appropriate distribution board in a mixed-colour installation:
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-yellow-400 mb-3">
            Recommended Caution Notice Text (OSG Reg 6.12)
          </h3>
          <p className="text-white text-sm leading-relaxed italic">
            "Caution — This installation has wiring colours to two versions of BS 7671. Great care
            should be taken before undertaking extension, alteration or repair that all conductors
            are correctly identified."
          </p>
        </div>
        <p>
          This notice should be durable, legible, and positioned at or near the{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">consumer unit</SEOInternalLink>{' '}
          or distribution board where circuits of both colour codes are present. Self-adhesive
          labels are available from electrical wholesalers, or the notice can be printed and
          laminated.
        </p>
        <p>
          During a{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR inspection</SEOInternalLink>,
          check for the presence of this notice at every distribution board in a mixed-colour
          installation. Following the OSG recommendation to affix such a notice remains good
          practice, though the deleted Reg 514.14 no longer provides a regulatory basis for the
          observation.
        </p>
        <SEOAppBridge
          title="UK Wiring Colour Codes: Old vs New (BS 7671)"
          description="UK cable colour codes explained: the new harmonised colours vs the old red and black, for single, twin & earth and three-phase, with a comparison."
          icon={Camera}
        />
      </>
    ),
  },
  {
    id: 'a4-notices',
    heading: 'A4:2026 New Section 514 Notice Requirements',
    content: (
      <>
        <p>
          BS 7671:2018+A4:2026 introduced two new notice requirements in Section 514 that apply to
          new installations and affect EICR inspections.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <div>
                <h4 className="font-bold text-white mb-2">
                  Reg 514.15.1 — Alternative and Additional Sources of Supply
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Where an installation includes alternative or additional sources of supply (such
                  as solar PV, battery storage, or a generator), warning notices shall be durably
                  affixed at: (a) the origin of the installation; (b) the meter position, if remote
                  from the origin; (c) the consumer unit or distribution board to which the source
                  is connected; and (d) all points of isolation of all sources of supply. Each
                  notice must identify the relevant isolation point(s). An example notice format is
                  given in Figure 11E of Appendix 11 of BS 7671.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <div>
                <h4 className="font-bold text-white mb-2">
                  Reg 514.16.1 — Presence of Surge Protective Devices (SPDs)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Where SPDs are installed, an information notice shall be placed at or near the
                  relevant distribution board(s) to indicate their presence. This ensures
                  maintenance personnel are aware of the surge protection before working on
                  associated circuitry. There is an exception: domestic (household) premises are
                  exempt from this labelling requirement.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Both obligations are live under A4:2026. During an{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> on an installation
          with solar PV, battery storage, or SPDs, check for these notices and record their absence
          as an observation where applicable.
        </p>
      </>
    ),
  },
  {
    id: 'sleeving-requirements',
    heading: 'Sleeving and Marking Requirements',
    content: (
      <>
        <p>
          Sleeving is the primary method of conductor identification where the factory-applied
          insulation colour does not match the conductor's function. The two most common
          applications are earth sleeving and switch wire sleeving.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <div>
                <h4 className="font-bold text-white mb-2">Earth Conductor Sleeving</h4>
                <p className="text-white text-sm leading-relaxed">
                  The bare copper earth conductor in twin and earth cable must be sleeved with
                  green/yellow sleeving at every termination point — at the consumer unit, at every
                  junction box, at every switch, socket, and light fitting. The sleeving must cover
                  the conductor from the point where it emerges from the cable sheath to the
                  termination. Regulation 514.4.2 requires that when the bi-colour is applied, one
                  colour shall cover at least 30% and at most 70% of the surface, with the other
                  colour covering the remainder. Poor-quality or wrongly-proportioned sleeving can
                  therefore fail on its own even if the correct colours are present. Missing earth
                  sleeving is one of the most common EICR findings.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <div>
                <h4 className="font-bold text-white mb-2">Switch Wire Sleeving</h4>
                <p className="text-white text-sm leading-relaxed">
                  In switch circuits using two-core and earth cable, the blue (or black in old
                  wiring) conductor is used as the switched line return from the switch to the light
                  fitting. This conductor carries line voltage when the switch is on, so it must be
                  sleeved with brown (or red in old wiring) sleeving at both ends to identify it as
                  a line conductor. Missing switch wire sleeving creates a polarity identification
                  risk and is commonly raised as a C2 or C3 finding on an EICR.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Sleeving must be the correct colour, the correct size for the conductor, and securely
          fitted so it cannot slide or fall off. Heat-shrink sleeving provides a more secure fit
          than push-on PVC sleeving.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Conductor Identification Mistakes',
    content: (
      <>
        <p>
          Conductor identification errors are among the most common findings during EICR
          inspections. Being aware of these common mistakes helps both during installation and
          inspection.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <div>
                <h4 className="font-bold text-white mb-2">Missing Earth Sleeving</h4>
                <p className="text-white text-sm leading-relaxed">
                  Bare copper earth conductors without green/yellow sleeving at termination points.
                  This is extremely common in older installations and in DIY work. It creates a risk
                  of the earth conductor being mistaken for a line conductor or being accidentally
                  contacted. Typically raised as C3 on an EICR.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <div>
                <h4 className="font-bold text-white mb-2">Missing Switch Wire Sleeving</h4>
                <p className="text-white text-sm leading-relaxed">
                  Blue (or black) conductors used as switched lines without brown (or red) sleeving.
                  This means a conductor that carries line voltage is identified as a neutral,
                  creating a serious risk for anyone working on the circuit. Typically C2 or C3
                  depending on circumstances.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <div className="flex items-start gap-3">
              <div>
                <h4 className="font-bold text-white mb-2">Missing Mixed-Colour Warning Notice</h4>
                <p className="text-white text-sm leading-relaxed">
                  Installations with both old and new colour codes but no warning notice at the{' '}
                  <SEOInternalLink href="/guides/consumer-unit-regulations">
                    consumer unit
                  </SEOInternalLink>
                  . The On-Site Guide (OSG Reg 6.12) recommends this notice. Note: BS 7671 Reg
                  514.14 — which previously mandated the notice — was deleted in A4:2026, so citing
                  it on EICR documentation is not appropriate. A replacement regulation is
                  forthcoming.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <div className="flex items-start gap-3">
              <div>
                <h4 className="font-bold text-white mb-2">Incorrect Phase Identification</h4>
                <p className="text-white text-sm leading-relaxed">
                  In three-phase installations, incorrect or missing phase identification on
                  individual conductors. This can lead to phase rotation errors, incorrect neutral
                  identification, and dangerous voltage conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="20 Pair Colour Code UK Cable Guide"
          description="20 pair cable colour codes explained for UK electricians. BS 7671:2018+A4:2026 compliant identification. Quick reference chart and installation rules."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CableColourCodesPage() {
  return (
    <GuideTemplate
      title="UK Cable Colour Codes 2026 | New + Old Colours Reference"
      description="UK cable colour codes: current harmonised (brown/blue/green-yellow) + pre-2004 old colours (red/black/green). What to do when joining old to new."
      datePublished="2025-05-15"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Essential Reference"
      badgeIcon={Palette}
      heroTitle={
        <>
          Cable Colour Codes UK
          <br />
          <span className="text-yellow-400">Complete Reference for Electricians</span>
        </>
      }
      heroSubtitle="Every UK cable colour code in one reference — current harmonised colours, old UK colours, three-phase identification, flex colours, and BS 7671 requirements. Includes EICR observation guidance for common identification defects."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Identify Cable Colours with AI Board Scanner"
      ctaSubheading="Elec-Mate's board scanner identifies cable colours from consumer unit photographs, flags missing sleeving, and auto-populates circuit data. Join 1,000+ UK electricians. 7-day free trial."
    />
  );
}
