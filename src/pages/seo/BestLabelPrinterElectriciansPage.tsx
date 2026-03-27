import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Printer,
  Zap,
  Gauge,
  Calculator,
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  GraduationCap,
  Wrench,
  Tag,
  Cable,
  PoundSterling,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Best Label Printer 2026', href: '/guides/best-label-printer-electricians' },
];

const tocItems = [
  { id: 'overview', label: 'Why Labelling Matters' },
  { id: 'bs7671-requirements', label: 'BS 7671 Labelling Requirements' },
  { id: 'brother-ptouch', label: 'Brother P-Touch' },
  { id: 'dymo-xtl', label: 'Dymo XTL' },
  { id: 'brady-bmp21', label: 'Brady BMP21' },
  { id: 'epson-lw-px400', label: 'Epson LW-PX400' },
  { id: 'label-types', label: 'Label Types for Electricians' },
  { id: 'running-costs', label: 'Running Costs Comparison' },
  { id: 'verdict', label: 'Our Verdict' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671 requires circuit identification at every distribution board — Regulation 514.9.1 states that every circuit must be identified by a durable label at its origin. Handwritten labels are accepted but look unprofessional and fade over time.',
  'The Brother P-Touch range (particularly the PT-E550W) is the most popular label printer among UK electricians, combining Bluetooth connectivity, a wide label range, and reasonable running costs.',
  'Running costs matter more than purchase price — a 60-pound printer that uses 15-pound cartridges costs more per label than a 150-pound printer that uses 8-pound cartridges. Calculate the cost per metre of tape before buying.',
  'Bluetooth connectivity lets you design labels on your phone and print on site — particularly useful when working with Elec-Mate or similar apps that can generate circuit schedules directly to the printer.',
  'Label durability varies dramatically — cheap labels fade in sunlight, peel in heat, and become illegible within 2 years. TZe laminated labels (Brother) and Rhino industrial labels (Dymo) are designed for long-term electrical installation use.',
];

const faqs = [
  {
    question: 'What labels does BS 7671 require on a consumer unit?',
    answer:
      'BS 7671 requires several types of labelling at and around the consumer unit. Regulation 514.9.1 requires every circuit to be identified by a durable label at its origin (the circuit schedule or individual MCB labels). Regulation 514.12 requires warning labels including: "CAUTION — DUAL SUPPLY" where multiple sources exist, a periodic inspection notice (date of next inspection and name of installer), "SAFETY ELECTRICAL CONNECTION — DO NOT REMOVE" on the main earthing conductor, and RCD test labels ("This installation, or part of it, is protected by a device which automatically switches off the supply if an earth fault develops. Test quarterly by pressing the button marked T or Test"). Additional warning labels may be required for specific installations such as battery storage, solar PV, or generator connections.',
  },
  {
    question: 'Can I use a standard office label printer for electrical labels?',
    answer:
      'A standard office label printer (like a Dymo LabelWriter or Brother QL series) uses paper or thermal labels that are not designed for electrical installations. These labels fade when exposed to sunlight, heat, or moisture — a consumer unit label may become illegible within 6 to 12 months. For electrical work, you need a label printer that produces laminated or industrial-grade labels. The Brother TZe tape system, Dymo Rhino industrial system, and Brady BMP system all produce labels specifically designed for long-term durability in electrical environments. The extra cost of a proper label printer is minimal compared to the cost of returning to relabel an installation.',
  },
  {
    question: 'What tape width do I need for circuit labels?',
    answer:
      'For circuit identification labels on MCBs and RCBOs, 9mm or 12mm tape width is standard — this fits neatly on the circuit way number or on the front of most MCB and RCBO modules. For warning labels and safety notices, 18mm or 24mm tape provides enough space for readable text and any required symbols. Most electricians carry two tape widths — 12mm for circuit labels and 18mm or 24mm for warning labels. If you only buy one width, 12mm is the most versatile. All four printers reviewed here support multiple tape widths.',
  },
  {
    question: 'Is Bluetooth connectivity worth having on a label printer?',
    answer:
      'Yes, for most electricians. Bluetooth connectivity lets you design and print labels from your phone, which is significantly faster than typing on the small keyboard built into the printer. With a phone app, you can create a full set of circuit labels from a circuit schedule (including from Elec-Mate), review the layout on screen before printing, and save label templates for recurring installations. The Brother P-Touch Design and Print app and the Dymo Connect app are both functional. If you label more than two boards per week, Bluetooth saves noticeable time. If you label one board per month, the built-in keyboard is adequate.',
  },
  {
    question: 'How much does label tape cost per metre?',
    answer:
      'Label tape costs vary significantly by brand and type. Brother TZe standard laminated tape (12mm) costs approximately 8 to 12 pounds for an 8-metre cassette — about 1 to 1.50 pounds per metre. Dymo Rhino industrial tape (12mm) costs 10 to 15 pounds for a 5.5-metre cassette — about 1.80 to 2.70 pounds per metre. Brady BMP21 tape costs 12 to 18 pounds for a 6.4-metre cartridge — about 1.90 to 2.80 pounds per metre. Epson LK tape costs 8 to 12 pounds for a 9-metre cassette — about 0.90 to 1.30 pounds per metre. Over a year, a busy electrician might use 20 to 40 metres of tape — the annual running cost ranges from 20 to 110 pounds depending on the brand.',
  },
  {
    question: 'Do I need cable marking labels or just board labels?',
    answer:
      'For most domestic work, circuit identification labels at the distribution board are sufficient. However, BS 7671 Regulation 514.8.1 requires cables to be identified at terminations and at points of access. In commercial and industrial installations, cable marking at both ends and at intermediate junction boxes is standard practice. For cable marking, you need either self-laminating wrap-around labels (the label wraps around the cable and the clear laminate covers the printed text) or cable markers (slide-on or clip-on markers). The Brother PT-E550W and Brady BMP21 both support cable wrap label cassettes specifically designed for cable marking.',
  },
  {
    question: 'What is the best label printer for a small electrical firm?',
    answer:
      'For a small firm (1 to 5 electricians), the Brother PT-E550W offers the best combination of features and value. It has Bluetooth for phone-based label design, supports 6mm to 24mm TZe tape (the widest range), prints both standard labels and cable wraps, and the TZe tape system has the lowest running cost among professional-grade options. Buy the printer and three tape cassettes (12mm black on white for circuits, 18mm black on yellow for warnings, and 12mm cable wrap for cable marking) for under 200 pounds total. That covers every labelling need for domestic and commercial work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Generate circuit schedules from your EIC certificate that can be printed directly as board labels.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Document circuit identification and labelling deficiencies on EICR condition reports.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Full guide to BS 7671 requirements including the labelling regulations referenced in this review.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/best-multifunction-tester-2026',
    title: 'Best Multifunction Tester 2026',
    description:
      'The MFT is the other essential item in your kit bag — see our 2026 comparison.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/best-van-racking-electricians',
    title: 'Best Van Racking 2026',
    description:
      'Keep your label printer organised and accessible with proper van racking.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables correctly then label them properly — the complete professional workflow.',
    icon: Calculator,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Labelling Matters for Electricians',
    content: (
      <>
        <p>
          Proper labelling is one of the simplest ways to demonstrate professionalism and comply
          with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671
          </SEOInternalLink>
          . A neatly labelled consumer unit tells the customer (and the next electrician) that the
          installation was done by someone who cares about their work. Handwritten labels on
          masking tape tell a different story entirely.
        </p>
        <p>
          Beyond professionalism, correct labelling is a safety requirement. Circuit identification
          labels ensure that the correct circuit is isolated before work begins. Warning labels
          alert people to hazards — dual supplies, RCD test requirements, and specific installation
          conditions. Missing or illegible labels are among the most common observations on EICR
          reports.
        </p>
        <p>
          A decent label printer costs 80 to 200 pounds and pays for itself in professionalism
          and time saved. This guide compares the four main label printers used by UK electricians,
          covering print quality, tape costs, connectivity, and which labels you actually need for
          compliant work.
        </p>
      </>
    ),
  },
  {
    id: 'bs7671-requirements',
    heading: 'BS 7671 Labelling Requirements',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 specifies several labelling requirements that apply to virtually
          every electrical installation. These are the labels you need to produce on site.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit identification (Reg 514.9.1)</strong> — every circuit must be
                identified by a durable label at its origin (the distribution board). This means
                either individual labels on each MCB/RCBO or a circuit schedule chart affixed to
                the inside of the board cover. The label must identify the circuit purpose (e.g.
                "Kitchen ring", "Upstairs lighting", "Cooker") and ideally the cable size and
                protective device rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection notice (Reg 514.12.1)</strong> — a label stating the
                date of the next recommended periodic inspection and the name/contact details of
                the installer or inspector. This should be placed inside the consumer unit or on
                the adjacent wall. The recommended wording is prescribed in Appendix 6 of BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD test notice (Reg 514.12.1)</strong> — where an RCD is installed, a
                label must be placed at or near the origin of the installation with the wording:
                "This installation, or part of it, is protected by a device which automatically
                switches off the supply if an earth fault develops. Test quarterly by pressing the
                button marked 'T' or 'Test'."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warning labels</strong> — "SAFETY ELECTRICAL CONNECTION — DO NOT REMOVE"
                on the main earthing conductor connection (Reg 514.13), "CAUTION — DUAL SUPPLY"
                where more than one source of supply exists (Reg 514.15), and voltage warning
                labels where different voltages are present in the same enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable identification (Reg 514.8.1)</strong> — cables must be identified at
                termination points and where they pass through compartments, walls, or floors. In
                practice, this is most important in commercial installations with multiple cables
                running through the same containment. Cable wrap labels or clip-on markers are the
                standard method.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'brother-ptouch',
    heading: 'Brother P-Touch (PT-E550W)',
    content: (
      <>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Brother PT-E550W — The Electrician Favourite</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            The Brother PT-E550W is the most widely used label printer among UK electricians. It
            is designed specifically for electrical and network installers, with built-in templates
            for cable wraps, patch panels, and distribution board labels.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Tape widths:</strong> 6mm, 9mm, 12mm, 18mm, 24mm (TZe)</p>
              <p className="text-white text-sm"><strong>Connectivity:</strong> Bluetooth + USB</p>
              <p className="text-white text-sm"><strong>Built-in templates:</strong> Cable wrap, patch panel, board labels</p>
              <p className="text-white text-sm"><strong>Keyboard:</strong> Yes (QWERTY)</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Battery:</strong> Rechargeable Li-ion (included)</p>
              <p className="text-white text-sm"><strong>Print resolution:</strong> 180 dpi</p>
              <p className="text-white text-sm"><strong>Auto-cutter:</strong> Yes (full and half cut)</p>
              <p className="text-white text-sm"><strong>Street price:</strong> 130 to 170 pounds</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> The TZe tape system offers the widest range of sizes, colours,
          and types (standard laminated, flexible ID, heat-shrink, cable wrap) of any label printer
          platform. The Bluetooth connection to the Brother P-Touch Design and Print app works
          reliably and allows you to design labels on your phone screen, which is faster than using
          the small built-in keyboard for long labels. The rechargeable battery lasts a full
          working day. The auto-cutter (including half-cut for easy peeling) saves time when
          printing multiple labels. The built-in electrical templates speed up common label types.
          TZe laminated labels are extremely durable — the printed text is sandwiched between a
          clear laminate and a coloured backing, making them resistant to water, heat, UV, and
          abrasion.
        </p>
        <p>
          <strong>Weaknesses:</strong> The printer is bulkier than the Dymo Rhino alternatives —
          it does not fit in a pocket, though it fits easily in a tool bag. The 180 dpi resolution
          is adequate for text labels but not for detailed graphics or QR codes (the Brady BMP21
          at 203 dpi is slightly sharper). The Brother app, while functional, is not as intuitive
          as it could be — the label template selection is cluttered with options irrelevant to
          electricians.
        </p>
        <p>
          <strong>Best for:</strong> Most UK electricians. The combination of tape versatility,
          Bluetooth connectivity, and reasonable running costs makes it the default recommendation.
          If you are buying your first proper label printer, start here.
        </p>
      </>
    ),
  },
  {
    id: 'dymo-xtl',
    heading: 'Dymo XTL 300',
    content: (
      <>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Dymo XTL 300 — The Industrial Option</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            The Dymo XTL range is the industrial upgrade from the well-known Dymo Rhino series.
            The XTL 300 targets electrical contractors and data installers with a colour touchscreen
            and larger label capacity.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Tape widths:</strong> 6mm, 9mm, 12mm, 19mm, 24mm (XTL)</p>
              <p className="text-white text-sm"><strong>Connectivity:</strong> USB (Bluetooth on some models)</p>
              <p className="text-white text-sm"><strong>Display:</strong> Colour touchscreen</p>
              <p className="text-white text-sm"><strong>Keyboard:</strong> Yes (QWERTY)</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Battery:</strong> Rechargeable Li-ion</p>
              <p className="text-white text-sm"><strong>Print resolution:</strong> 300 dpi</p>
              <p className="text-white text-sm"><strong>Auto-cutter:</strong> Yes</p>
              <p className="text-white text-sm"><strong>Street price:</strong> 200 to 280 pounds</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> The 300 dpi print resolution is the highest in this review —
          labels are noticeably sharper and cleaner than the 180 dpi Brother output. The colour
          touchscreen makes label design on the printer itself much easier than using a small
          monochrome display. The XTL label range includes pre-printed headers (e.g. "DANGER",
          "CAUTION", "WARNING") that comply with BS 7671 warning label requirements without
          manual design. The industrial-grade labels are designed for harsh environments.
        </p>
        <p>
          <strong>Weaknesses:</strong> The XTL tape cartridges are more expensive per metre than
          Brother TZe tapes — approximately 50% more for comparable label widths. The XTL label
          range is smaller than the Brother TZe range, with fewer colour combinations and specialty
          types. Bluetooth connectivity is not standard on all XTL 300 models — check the specific
          model before buying. The printer is the largest and heaviest in this review, which
          matters if space in your tool bag is limited. The Dymo Connect app for phone-based label
          design is less reliable than the Brother equivalent.
        </p>
        <p>
          <strong>Best for:</strong> Electricians who prioritise print quality and on-device label
          design (using the touchscreen rather than a phone app). Also good for commercial work
          where the pre-printed warning label headers save time.
        </p>
      </>
    ),
  },
  {
    id: 'brady-bmp21',
    heading: 'Brady BMP21-PLUS',
    content: (
      <>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Brady BMP21-PLUS — The Durability Champion</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            Brady is a US manufacturer specialising in industrial labelling. The BMP21-PLUS is
            designed for harsh environments — construction sites, industrial plants, and outdoor
            installations where label durability is critical.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Tape widths:</strong> 6.4mm, 9.5mm, 12.7mm, 19mm (M21)</p>
              <p className="text-white text-sm"><strong>Connectivity:</strong> USB only</p>
              <p className="text-white text-sm"><strong>Built-in templates:</strong> Cable, wire, panel labels</p>
              <p className="text-white text-sm"><strong>Keyboard:</strong> Yes (ABC layout)</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Battery:</strong> 6x AA (alkaline or NiMH)</p>
              <p className="text-white text-sm"><strong>Print resolution:</strong> 203 dpi</p>
              <p className="text-white text-sm"><strong>Auto-cutter:</strong> No (manual cutter)</p>
              <p className="text-white text-sm"><strong>Street price:</strong> 150 to 200 pounds</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> Brady labels are the most durable in this review. The M21
          vinyl and nylon label materials are rated for outdoor use, chemical resistance, and
          extreme temperature ranges (-40 to +120 degrees Celsius for some cartridges). If you
          install labels in plant rooms, outdoor enclosures, or industrial environments, Brady
          labels will outlast any competitor. The BMP21-PLUS is compact and lightweight — the
          smallest printer in this review. The AA battery option means no charging required — carry
          spare batteries and you are always ready. The 203 dpi resolution produces clean, sharp
          labels.
        </p>
        <p>
          <strong>Weaknesses:</strong> No Bluetooth — label design is limited to the small built-in
          keyboard or a PC connection via USB. This is the most significant limitation for
          electricians who want phone-based label design. The manual cutter (no auto-cut) slows
          down batch label production. The M21 cartridge range uses imperial tape widths (6.4mm,
          9.5mm, 12.7mm, 19mm) rather than the metric widths used by Brother and Dymo — not a
          functional issue but the sizes do not match exactly. The M21 cartridges are the most
          expensive per metre in this review. The ABC keyboard layout is slower than QWERTY for
          text entry.
        </p>
        <p>
          <strong>Best for:</strong> Electricians working in industrial and commercial environments
          where label durability is the top priority. If your labels need to survive plant rooms,
          outdoor switchgear, and chemical exposure, the Brady BMP21-PLUS with industrial-grade
          cartridges is the right choice.
        </p>
      </>
    ),
  },
  {
    id: 'epson-lw-px400',
    heading: 'Epson LW-PX400',
    content: (
      <>
        <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Epson LW-PX400 — The Budget-Friendly All-Rounder</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            Epson's portable label printer targets electrical installers with Bluetooth connectivity
            and an industrial label range at a lower price point than the Brother PT-E550W.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Tape widths:</strong> 6mm, 9mm, 12mm, 18mm (LK)</p>
              <p className="text-white text-sm"><strong>Connectivity:</strong> Bluetooth</p>
              <p className="text-white text-sm"><strong>Built-in templates:</strong> Cable flag, circuit labels</p>
              <p className="text-white text-sm"><strong>Keyboard:</strong> No (phone app only)</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Battery:</strong> 6x AA</p>
              <p className="text-white text-sm"><strong>Print resolution:</strong> 180 dpi</p>
              <p className="text-white text-sm"><strong>Auto-cutter:</strong> Yes (manual lever)</p>
              <p className="text-white text-sm"><strong>Street price:</strong> 80 to 120 pounds</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> The price is the headline — at 80 to 120 pounds, the Epson
          LW-PX400 is the cheapest proper label printer in this review. The Epson iLabel app for
          phone-based label design works well and includes electrical-specific templates for circuit
          labels, cable flags, and warning notices. The LK tape cartridges are the cheapest per
          metre in this review — approximately 0.90 to 1.30 pounds per metre for 12mm tape. The
          compact form factor and AA battery power make it highly portable. The Bluetooth
          connection is reliable and pairs quickly.
        </p>
        <p>
          <strong>Weaknesses:</strong> No built-in keyboard — you must use the phone app for all
          label design. If your phone battery dies or Bluetooth drops out, you cannot produce
          labels. The maximum tape width is 18mm (not 24mm) — adequate for most circuit and warning
          labels but limiting for larger notices. The LK tape range is smaller than the Brother TZe
          range, with fewer specialty types (no heat-shrink, limited cable wrap options). The
          manual cutter lever is functional but slower than the Brother auto-cutter. The label
          durability is good but not at the Brady industrial level.
        </p>
        <p>
          <strong>Best for:</strong> Budget-conscious electricians who are comfortable using a phone
          app for label design and want the lowest running costs. The Epson LW-PX400 is the best
          entry point for electricians upgrading from handwritten labels to printed labels.
        </p>
      </>
    ),
  },
  {
    id: 'label-types',
    heading: 'Label Types Every Electrician Needs',
    content: (
      <>
        <p>
          Having the right label tape cassettes in your kit is as important as the printer itself.
          These are the label types that cover 95% of electrical installation work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>12mm black on white (circuit labels)</strong> — the workhorse. Used for
                circuit identification on MCBs and RCBOs. White background with black text is the
                standard for general circuit labelling. One 8-metre cassette produces approximately
                50 to 80 circuit labels depending on text length.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>18mm or 24mm black on yellow (warning labels)</strong> — BS 7671 warning
                labels should be on a yellow background with black text to match the standard safety
                colour coding. Used for "CAUTION — DUAL SUPPLY", "SAFETY ELECTRICAL CONNECTION",
                periodic inspection notices, and RCD test notices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable wrap / self-laminating labels</strong> — designed to wrap around
                cables for identification at termination points. The label wraps around the cable
                and a clear laminating tail covers the printed text, protecting it from abrasion.
                Essential for commercial installations with multiple cables in the same containment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat-shrink labels (optional)</strong> — printed heat-shrink tubing that
                slides over a cable end and shrinks with a heat gun to form a permanent, tamper-
                proof cable marker. The most durable cable marking method but requires a heat gun
                on site. Only the Brother TZe system offers heat-shrink cartridges in this review.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'running-costs',
    heading: 'Running Costs Comparison',
    content: (
      <>
        <p>
          The purchase price of the printer is a one-off cost. The ongoing cost of tape cartridges
          is what you pay month after month. Here is the real comparison.
        </p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-3">Cost Per Metre (12mm Standard Tape)</h4>
            <div className="space-y-2 text-white text-sm">
              <p><strong>Cheapest:</strong> Epson LK tape — 0.90 to 1.30 pounds per metre (9m cassette)</p>
              <p><strong>Mid:</strong> Brother TZe tape — 1.00 to 1.50 pounds per metre (8m cassette)</p>
              <p><strong>Higher:</strong> Dymo XTL tape — 1.80 to 2.70 pounds per metre (5.5m cassette)</p>
              <p><strong>Highest:</strong> Brady M21 tape — 1.90 to 2.80 pounds per metre (6.4m cassette)</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-3">Annual Cost Estimate (30 metres per year)</h4>
            <div className="space-y-2 text-white text-sm">
              <p><strong>Epson:</strong> 27 to 39 pounds per year</p>
              <p><strong>Brother:</strong> 30 to 45 pounds per year</p>
              <p><strong>Dymo:</strong> 54 to 81 pounds per year</p>
              <p><strong>Brady:</strong> 57 to 84 pounds per year</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-3">3-Year Total Cost (Printer + Tape at 30m/year)</h4>
            <div className="space-y-2 text-white text-sm">
              <p><strong>Epson LW-PX400:</strong> 80 + 99 = 179 to 237 pounds</p>
              <p><strong>Brother PT-E550W:</strong> 150 + 105 = 255 to 315 pounds</p>
              <p><strong>Brady BMP21-PLUS:</strong> 175 + 171 = 346 to 427 pounds</p>
              <p><strong>Dymo XTL 300:</strong> 240 + 162 = 402 to 483 pounds</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'verdict',
    heading: 'Our Verdict',
    content: (
      <>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">The Recommendation</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            <strong>For most electricians: Brother PT-E550W.</strong> The widest tape range,
            reliable Bluetooth connectivity, auto-cutter, and reasonable running costs make it the
            default choice. It covers every labelling scenario from domestic circuit labels to
            commercial cable marking. The electrical-specific templates and heat-shrink tape option
            add genuine value for professional work.
          </p>
          <p className="text-white text-sm leading-relaxed mb-3">
            <strong>For budget-conscious or starting out: Epson LW-PX400.</strong> At half the
            price of the Brother with the lowest running costs, the Epson is the smart choice for
            electricians upgrading from handwritten labels. The phone-app-only design is a
            limitation, but the Bluetooth connection works well and the label quality is good.
          </p>
          <p className="text-white text-sm leading-relaxed mb-3">
            <strong>For industrial and outdoor work: Brady BMP21-PLUS.</strong> When label
            durability is the priority — plant rooms, outdoor switchgear, chemical environments —
            Brady labels outlast everything else. Accept the higher running cost and lack of
            Bluetooth as trade-offs for labels that last decades.
          </p>
          <p className="text-white text-sm leading-relaxed">
            <strong>For print quality priority: Dymo XTL 300.</strong> The 300 dpi resolution
            produces the sharpest labels. If you produce labels for customer-facing installations
            where appearance matters (commercial reception areas, retail, hospitality), the Dymo
            delivers a premium finish.
          </p>
        </div>
        <p>
          Whatever printer you choose, the most important step is to start using it. Printed labels
          take seconds, look professional, and last years. Handwritten labels take the same time,
          look amateur, and fade in months. The cost difference over a year is trivial. Your
          customers and fellow electricians will notice.
        </p>
        <SEOAppBridge
          title="Generate circuit schedules and print labels directly"
          description="Elec-Mate's EIC and EICR certificate apps generate circuit schedules as part of the certification process. Use the schedule to produce matching labels for every board you test and certify."
          icon={Printer}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BestLabelPrinterElectriciansPage() {
  return (
    <GuideTemplate
      title="Best Label Printer for Electricians 2026 | Circuit Labels"
      description="Honest comparison of the best label printers for UK electricians in 2026. Brother P-Touch, Dymo XTL, Brady BMP21, and Epson LW-PX400 compared on print quality, tape costs, Bluetooth, BS 7671 labelling requirements, and running costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Equipment Guide"
      badgeIcon={Printer}
      heroTitle={
        <>
          Best Label Printer for Electricians:{' '}
          <span className="text-yellow-400">Circuit Labels and Warning Notices 2026</span>
        </>
      }
      heroSubtitle="Stop using masking tape and marker pens. Four label printers compared for BS 7671 compliance, running costs, Bluetooth connectivity, and real-world value for UK electricians."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Label Printers for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Generate Circuit Schedules and Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EIC and EICR certificates with automatic circuit schedules, AI board scanning, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
