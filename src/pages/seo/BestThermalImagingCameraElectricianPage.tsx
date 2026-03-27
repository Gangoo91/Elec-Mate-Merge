import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Thermometer,
  Zap,
  Gauge,
  Calculator,
  FileCheck2,
  Wrench,
  GraduationCap,
  Camera,
  AlertTriangle,
  ShieldCheck,
  Eye,
  PoundSterling,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Best Thermal Camera 2026', href: '/guides/best-thermal-imaging-camera-electricians' },
];

const tocItems = [
  { id: 'overview', label: 'Why Electricians Need Thermal Imaging' },
  { id: 'use-cases', label: 'Use Cases on Site' },
  { id: 'flir-c5', label: 'FLIR C5' },
  { id: 'hikmicro-b1l', label: 'HikMicro B1L' },
  { id: 'fluke-pti120', label: 'Fluke PTi120' },
  { id: 'flir-one-pro', label: 'FLIR ONE Pro' },
  { id: 'milwaukee-m12', label: 'Milwaukee M12' },
  { id: 'what-to-look-for', label: 'What to Look For' },
  { id: 'comparison', label: 'Comparison Summary' },
  { id: 'verdict', label: 'Our Verdict' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Thermal imaging cameras detect temperature differences invisible to the naked eye — loose connections, overloaded circuits, and faulty components show up as hot spots before they cause failures or fires.',
  'You do not need a 10,000-pound camera. For electrical fault finding, a camera with 120x90 pixel resolution or better and a temperature range up to 150 degrees Celsius is sufficient for most domestic and commercial work.',
  'The FLIR C5 offers the best balance of resolution, portability, and features for a dedicated electrical thermal camera at around 500 to 600 pounds.',
  'Phone-attachment cameras (FLIR ONE Pro) are the cheapest entry point at around 350 pounds, but the image quality and ergonomics are inferior to standalone devices.',
  'Thermal imaging is increasingly expected on EICR condition reports — a thermal scan of the consumer unit adds professionalism and helps justify your findings to customers and insurers.',
];

const faqs = [
  {
    question: 'Do I need a thermal imaging camera as an electrician?',
    answer:
      'A thermal camera is not legally required for any electrical testing or certification work. However, it is becoming an expected tool for professional electricians, particularly those doing EICRs on commercial properties. Insurance companies and facilities managers increasingly expect a thermal scan of distribution boards as part of a periodic inspection. For domestic electricians, a thermal camera helps identify loose connections, overloaded circuits, and failing components that might not be obvious during visual inspection. It also helps you demonstrate the value of your work to customers — showing them a hot connection on screen is more convincing than telling them about a warm terminal.',
  },
  {
    question: 'What resolution do I need for electrical work?',
    answer:
      'For electrical fault finding, a minimum of 80x60 pixels is usable, but 120x90 pixels or better is recommended. At 80x60, individual connections on a consumer unit are difficult to distinguish. At 160x120, you can clearly identify which specific terminal or cable is overheating. Professional thermography for insurance reports typically requires 320x240 or higher, but this is specialist work beyond what most electricians need. Do not be misled by "enhanced" or "interpolated" resolution figures — these are software-upscaled from the true sensor resolution and do not add real thermal detail.',
  },
  {
    question: 'Can a thermal camera see through walls to find cables?',
    answer:
      'No. Thermal cameras detect surface temperature differences, not objects behind surfaces. However, a cable carrying significant current heats up, and that heat transfers through plaster, plasterboard, or thin wall coverings. A heavily loaded cable in a wall may show as a faint warm line on the surface — but this only works when the cable is carrying enough current to generate detectable heat. It is not a reliable cable-finding method. For locating cables in walls, use a dedicated cable detector (CAT scanner) instead.',
  },
  {
    question: 'What temperature range should I look for?',
    answer:
      'For electrical work, a range of minus 20 to plus 150 degrees Celsius covers virtually everything you will encounter. The lower end helps with insulation surveys (finding cold spots indicating draughts or missing insulation). The upper end covers overheating connections — a seriously overloaded connection can reach 80 to 120 degrees Celsius. Cameras with ranges up to 400 degrees Celsius are designed for industrial and HVAC applications and cost significantly more. You do not need that range for standard electrical work.',
  },
  {
    question: 'How do I interpret thermal images of a consumer unit?',
    answer:
      'Open the consumer unit cover and allow 10 to 15 minutes for temperature to stabilise (removing the cover changes airflow). Scan the board with circuits under normal load. Look for hot spots — any connection or component significantly warmer than its neighbours warrants investigation. A general guide: up to 10 degrees above ambient is normal for loaded circuits, 10 to 30 degrees above ambient suggests a loose connection or overloading, and 30 degrees or more above ambient is a serious issue requiring immediate attention. Always compare like with like — a 30A cooker circuit will naturally run warmer than a 6A lighting circuit.',
  },
  {
    question: 'Is thermal imaging part of the EICR process?',
    answer:
      'Thermal imaging is not a requirement of BS 7671 or the EICR process. However, IET Guidance Note 3 acknowledges thermographic surveying as a useful diagnostic tool during inspection. Many inspection bodies and insurance companies now expect or request a thermal scan as supplementary evidence alongside the EICR schedule of test results. Including thermal images in your EICR report adds professionalism, helps support your observations and recommendations, and can justify C2 or C3 codes to customers who question why a connection needs attention.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Include thermal images in your EICR reports with the Elec-Mate certificate app.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/best-multifunction-tester-2026',
    title: 'Best Multifunction Tester 2026',
    description:
      'Pair your thermal camera with the right MFT for a complete testing toolkit.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Correctly sized cables run cooler — verify your designs with the cable sizing calculator.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/best-cable-detector-2026',
    title: 'Best Cable Detector 2026',
    description:
      'For finding cables in walls, a cable detector is more reliable than thermal imaging.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured modules covering visual inspection, testing, and reporting.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'High voltage drop means heat in cables — check your designs before installation.',
    icon: Zap,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Electricians Need Thermal Imaging',
    content: (
      <>
        <p>
          A thermal imaging camera does something no other tool in your kit can do — it makes heat
          visible. Loose connections, overloaded cables, failing components, and imbalanced loads all
          generate excess heat before they cause visible damage, tripped breakers, or fires.
        </p>
        <p>
          For electricians, thermal imaging is a diagnostic shortcut. Instead of checking every
          connection on a loaded board with the back of your hand (or worse, waiting for something to
          fail), you point the camera at the board and instantly see which connections are running
          hot. A 30-second thermal scan can identify a problem that would take 20 minutes of
          systematic testing to find.
        </p>
        <p>
          Thermal cameras have dropped dramatically in price over the past five years. In 2020, a
          usable thermal camera for electrical work cost 1,500 pounds or more. In 2026, you can get
          a capable device for 350 to 600 pounds. There is no longer a cost excuse for not carrying
          one.
        </p>
      </>
    ),
  },
  {
    id: 'use-cases',
    heading: 'Practical Use Cases on Site',
    content: (
      <>
        <p>
          A thermal camera earns its keep on site in ways that go beyond electrical fault finding.
          Here are the use cases that UK electricians report getting the most value from.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose connections</strong> — the number one use case. A loose terminal on a
                busbar, MCB, or main switch generates heat due to increased resistance at the
                connection point. Thermal imaging identifies these instantly, even when the
                connection looks visually tight. This is a genuine fire prevention tool.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded circuits</strong> — a cable carrying more current than its rating
                runs hotter than properly loaded neighbours. Thermal imaging shows which circuits on
                a board are under strain, even before the MCB trips. This is particularly useful on
                older installations where circuits have been added over time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underfloor heating mapping</strong> — before drilling into a floor with
                underfloor heating, a thermal scan shows the pipe or cable layout. This is far
                quicker and cheaper than lifting flooring to check. Also useful for verifying even
                heat distribution during commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation gaps and draughts</strong> — useful for EV charger installations
                and battery storage where you need to assess the thermal environment of the
                installation location. Cold spots on walls indicate missing insulation or air
                leakage, which may affect equipment performance and condensation risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Customer demonstration</strong> — showing a customer a thermal image of
                their overheating connection is far more persuasive than a verbal explanation. It
                helps justify repair costs, replacement recommendations, and C2 codes on EICRs.
                Customers understand a red hot spot immediately.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'flir-c5',
    heading: 'FLIR C5',
    content: (
      <>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">FLIR C5 — Best All-Round Choice</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            The FLIR C5 is a compact, pocket-sized thermal camera with a 160x120 sensor, built-in
            visible light camera, and FLIR Ignite cloud connectivity. It is the camera most commonly
            recommended by electricians who have used multiple models.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Thermal resolution:</strong> 160x120 pixels</p>
              <p className="text-white text-sm"><strong>Temperature range:</strong> -20 to +400 degrees C</p>
              <p className="text-white text-sm"><strong>Accuracy:</strong> +/- 3 degrees C or +/- 3%</p>
              <p className="text-white text-sm"><strong>MSX enhancement:</strong> Yes (edge overlay)</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Visible camera:</strong> 5MP</p>
              <p className="text-white text-sm"><strong>Connectivity:</strong> Wi-Fi, FLIR Ignite cloud</p>
              <p className="text-white text-sm"><strong>Battery:</strong> Rechargeable, 4 hours</p>
              <p className="text-white text-sm"><strong>Street price:</strong> 500 to 600 pounds</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> The 160x120 resolution is the sweet spot for electrical work —
          you can clearly identify individual terminals and connections on a consumer unit. MSX
          (Multi-Spectral Dynamic Imaging) overlays visible light edges onto the thermal image,
          making it much easier to identify exactly which component is hot. The form factor is
          pocket-sized — it genuinely fits in a trouser pocket, so you always have it to hand. FLIR
          Ignite cloud sync means images are automatically backed up and can be accessed from any
          device. The touchscreen interface is intuitive.
        </p>
        <p>
          <strong>Weaknesses:</strong> Battery life is the main limitation — 4 hours is tight for a
          full day of inspections. Carry a USB-C power bank. The temperature range goes to 400
          degrees, which is more than you need for electrical work (you are paying for capability
          you will not use). The 5MP visible camera is adequate but not outstanding.
        </p>
        <p>
          <strong>Best for:</strong> Electricians who want one camera that does everything well. If
          you only buy one thermal camera, this is the one to buy.
        </p>
      </>
    ),
  },
  {
    id: 'hikmicro-b1l',
    heading: 'HikMicro B1L',
    content: (
      <>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">HikMicro B1L — The Value Performer</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            HikMicro (part of Hikvision) has entered the thermal imaging market with aggressively
            priced cameras that outperform their price point. The B1L is the standout model for
            electricians.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Thermal resolution:</strong> 256x192 pixels</p>
              <p className="text-white text-sm"><strong>Temperature range:</strong> -20 to +150 degrees C</p>
              <p className="text-white text-sm"><strong>Accuracy:</strong> +/- 2 degrees C or +/- 2%</p>
              <p className="text-white text-sm"><strong>Fusion modes:</strong> PIP, blended, side-by-side</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Visible camera:</strong> 2MP</p>
              <p className="text-white text-sm"><strong>Connectivity:</strong> Wi-Fi, HikMicro Viewer app</p>
              <p className="text-white text-sm"><strong>Battery:</strong> Rechargeable, 6 hours</p>
              <p className="text-white text-sm"><strong>Street price:</strong> 350 to 450 pounds</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> The headline is the resolution — 256x192 pixels at 350 to 450
          pounds is remarkable. This is a higher thermal resolution than the FLIR C5 at a lower
          price. Images are noticeably sharper, with better detail on individual connections. Battery
          life at 6 hours is better than the FLIR C5. The accuracy specification (+/- 2 degrees) is
          tighter than FLIR. Multiple image fusion modes give flexibility in how you present results
          to customers.
        </p>
        <p>
          <strong>Weaknesses:</strong> The HikMicro software ecosystem is less mature than FLIR.
          The Viewer app works but lacks the polish and cloud integration of FLIR Ignite. The
          visible light camera at 2MP is noticeably lower quality than the FLIR C5 — fine for
          reference images but not for detailed photo documentation. The brand is less established
          in the UK electrical market, and some customers may have concerns about Hikvision-related
          products. The temperature range tops out at 150 degrees, which is sufficient for
          electrical work but limits the camera for other applications.
        </p>
        <p>
          <strong>Best for:</strong> Electricians who want the best thermal resolution per pound
          spent and prioritise image quality over brand recognition and app ecosystem.
        </p>
      </>
    ),
  },
  {
    id: 'fluke-pti120',
    heading: 'Fluke PTi120',
    content: (
      <>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Fluke PTi120 — The Pocket Powerhouse</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            Fluke's entry into compact thermal imaging brings the same build quality and brand
            reputation that makes the Fluke 1664 FC a premium MFT. The PTi120 is designed
            specifically for quick thermal inspections by electricians and maintenance engineers.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Thermal resolution:</strong> 120x90 pixels</p>
              <p className="text-white text-sm"><strong>Temperature range:</strong> -20 to +150 degrees C</p>
              <p className="text-white text-sm"><strong>Accuracy:</strong> +/- 3 degrees C or +/- 3%</p>
              <p className="text-white text-sm"><strong>IR-Fusion:</strong> Yes (Fluke blend mode)</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Visible camera:</strong> 2MP</p>
              <p className="text-white text-sm"><strong>Connectivity:</strong> Fluke Connect</p>
              <p className="text-white text-sm"><strong>Battery:</strong> Rechargeable, 4 hours</p>
              <p className="text-white text-sm"><strong>Street price:</strong> 550 to 700 pounds</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> Fluke Connect integration — if you already use a Fluke 1664 FC
          MFT, the PTi120 feeds into the same app and cloud ecosystem. Build quality is excellent
          with an IP54 dust and splash rating. The form factor is genuinely pocket-friendly. The
          IR-Fusion blend mode overlays thermal data on the visible image for easy identification
          of hot spots. Fluke's calibration and support network is the strongest in the UK.
        </p>
        <p>
          <strong>Weaknesses:</strong> The 120x90 thermal resolution is the lowest in this review.
          While adequate for identifying obvious hot spots, it lacks the detail of the HikMicro B1L
          or FLIR C5 for pinpointing individual connections on a densely populated board. At 550 to
          700 pounds, it costs more than the HikMicro B1L with lower resolution — you are paying
          the Fluke premium for build quality and ecosystem integration. Battery life at 4 hours
          matches the FLIR C5 limitation.
        </p>
        <p>
          <strong>Best for:</strong> Electricians already invested in the Fluke Connect ecosystem who
          want thermal imaging that integrates seamlessly with their existing workflow.
        </p>
      </>
    ),
  },
  {
    id: 'flir-one-pro',
    heading: 'FLIR ONE Pro',
    content: (
      <>
        <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">FLIR ONE Pro — The Phone Attachment</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            The FLIR ONE Pro attaches to your smartphone (USB-C or Lightning) and turns it into a
            thermal camera. It is the cheapest way to get thermal imaging capability, but the
            trade-offs are significant.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Thermal resolution:</strong> 160x120 pixels</p>
              <p className="text-white text-sm"><strong>Temperature range:</strong> -20 to +400 degrees C</p>
              <p className="text-white text-sm"><strong>Accuracy:</strong> +/- 3 degrees C or +/- 5%</p>
              <p className="text-white text-sm"><strong>MSX enhancement:</strong> Yes</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Visible camera:</strong> Uses phone camera</p>
              <p className="text-white text-sm"><strong>Connectivity:</strong> FLIR ONE app (iOS/Android)</p>
              <p className="text-white text-sm"><strong>Battery:</strong> Internal, 1 hour continuous</p>
              <p className="text-white text-sm"><strong>Street price:</strong> 300 to 400 pounds</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> The price is the primary advantage — 300 to 400 pounds for
          160x120 resolution with MSX is good value. The FLIR ONE app is well-designed with
          multiple colour palettes, spot temperature measurement, and image export. Using your
          phone screen means a larger, higher-resolution display than any standalone camera at this
          price. The 160x120 sensor resolution matches the FLIR C5.
        </p>
        <p>
          <strong>Weaknesses:</strong> The 1-hour battery life is genuinely problematic — it drains
          your phone battery as well. The physical attachment is fragile and can be knocked off or
          damaged on site. You need to remove your phone case to attach it (or buy a specific
          compatible case). The ergonomics are poor — holding your phone at arm's length pointed at
          a consumer unit is awkward. It drains your phone battery, which is a problem if you also
          use your phone for certificates, photos, and navigation. The accuracy at +/- 5% is the
          worst in this review.
        </p>
        <p>
          <strong>Best for:</strong> Electricians who want to try thermal imaging before committing
          to a standalone camera. It is a good learning tool and proof-of-concept device. If you
          find you use it regularly, upgrade to a FLIR C5 or HikMicro B1L within 6 months.
        </p>
      </>
    ),
  },
  {
    id: 'milwaukee-m12',
    heading: 'Milwaukee M12',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Milwaukee M12 — The Tool Brand Option</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            Milwaukee's M12 thermal imager uses the M12 battery platform that powers their drill
            range. If you are already invested in Milwaukee cordless tools, the shared battery
            system is attractive.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Thermal resolution:</strong> 120x90 pixels</p>
              <p className="text-white text-sm"><strong>Temperature range:</strong> -10 to +400 degrees C</p>
              <p className="text-white text-sm"><strong>Accuracy:</strong> +/- 3 degrees C or +/- 3%</p>
              <p className="text-white text-sm"><strong>Image overlay:</strong> Basic blend mode</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Visible camera:</strong> VGA</p>
              <p className="text-white text-sm"><strong>Connectivity:</strong> None (USB download)</p>
              <p className="text-white text-sm"><strong>Battery:</strong> M12 platform, 6+ hours</p>
              <p className="text-white text-sm"><strong>Street price:</strong> 500 to 650 pounds (body only)</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> Battery life is excellent — the M12 platform batteries are
          robust and long-lasting. If you already own M12 batteries from other Milwaukee tools,
          you do not need to buy additional batteries. The build quality is designed for
          construction sites — it is tougher than the FLIR and Fluke pocket cameras. The pistol
          grip ergonomics feel natural for electricians used to holding power tools.
        </p>
        <p>
          <strong>Weaknesses:</strong> No wireless connectivity — images must be downloaded via USB,
          which is a significant limitation for modern workflows. The 120x90 thermal resolution is
          tied for the lowest in this review. The visible camera is VGA quality, which is poor by
          2026 standards. The image quality and software features are noticeably behind the
          thermal imaging specialists (FLIR, HikMicro). If you do not already own M12 batteries,
          the total cost including battery and charger pushes it above 700 pounds.
        </p>
        <p>
          <strong>Best for:</strong> Electricians heavily invested in the Milwaukee M12 ecosystem who
          want a thermal camera that shares batteries with their existing tools and can survive
          rough treatment on site.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-look-for',
    heading: 'What to Look For When Buying',
    content: (
      <>
        <p>
          The thermal camera market is full of misleading specifications. Here is what actually
          matters for electrical work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>True sensor resolution</strong> — ignore "enhanced" or "SuperResolution"
                numbers. The true sensor resolution is what determines actual thermal detail. 160x120
                is the sweet spot for electrical work. 120x90 is the minimum. Below 80x60 is not
                useful for identifying individual connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NETD (thermal sensitivity)</strong> — this measures the smallest temperature
                difference the camera can detect. Under 70mK (0.07 degrees C) is good. Under 50mK
                is excellent. This determines whether you can spot subtle temperature differences
                between adjacent connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Image fusion or MSX</strong> — the ability to overlay visible light detail
                onto the thermal image is extremely useful. Without it, a thermal image of a
                consumer unit is just coloured blobs. With fusion, you can see the MCB labels and
                terminal markings overlaid on the thermal data.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total cost</strong> — factor in the camera body, any required accessories
                (case, lanyard, screen protector), software subscriptions (FLIR Ignite has free and
                paid tiers), and replacement costs if dropped. The cheapest camera to buy is not
                always the cheapest to own.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'comparison',
    heading: 'Comparison Summary',
    content: (
      <>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-3">Resolution (Best to Lowest)</h4>
            <div className="space-y-2 text-white text-sm">
              <p><strong>1st:</strong> HikMicro B1L (256x192) — 350 to 450 pounds</p>
              <p><strong>2nd:</strong> FLIR C5 (160x120) — 500 to 600 pounds</p>
              <p><strong>2nd:</strong> FLIR ONE Pro (160x120) — 300 to 400 pounds</p>
              <p><strong>4th:</strong> Fluke PTi120 (120x90) — 550 to 700 pounds</p>
              <p><strong>4th:</strong> Milwaukee M12 (120x90) — 500 to 650 pounds</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-3">Battery Life (Best to Shortest)</h4>
            <div className="space-y-2 text-white text-sm">
              <p><strong>1st:</strong> Milwaukee M12 (6+ hours with M12 battery)</p>
              <p><strong>2nd:</strong> HikMicro B1L (6 hours)</p>
              <p><strong>3rd:</strong> FLIR C5 (4 hours) and Fluke PTi120 (4 hours)</p>
              <p><strong>5th:</strong> FLIR ONE Pro (1 hour)</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-3">Value for Money</h4>
            <div className="space-y-2 text-white text-sm">
              <p><strong>Best overall:</strong> HikMicro B1L — highest resolution at the lowest price</p>
              <p><strong>Best all-rounder:</strong> FLIR C5 — best software, good resolution, pocket-sized</p>
              <p><strong>Best entry point:</strong> FLIR ONE Pro — cheapest way to try thermal imaging</p>
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
            <strong>Best overall: FLIR C5.</strong> The combination of 160x120 resolution, MSX image
            fusion, FLIR Ignite cloud integration, and a pocket-sized form factor makes it the
            most practical thermal camera for day-to-day electrical work. The software ecosystem is
            the most mature and the brand is universally recognised.
          </p>
          <p className="text-white text-sm leading-relaxed mb-3">
            <strong>Best value: HikMicro B1L.</strong> If raw thermal resolution per pound is your
            priority, the B1L at 256x192 pixels for 350 to 450 pounds is unbeatable. You get
            clearer, more detailed thermal images than the FLIR C5 at a lower price. The trade-off
            is the less mature software ecosystem.
          </p>
          <p className="text-white text-sm leading-relaxed">
            <strong>Best for trying thermal imaging: FLIR ONE Pro.</strong> At 300 to 400 pounds
            with no commitment to a standalone device, it is the lowest-risk way to discover
            whether thermal imaging adds value to your workflow. Just accept the battery and
            ergonomic limitations.
          </p>
        </div>
        <p>
          Thermal imaging is not a replacement for proper testing with your{' '}
          <SEOInternalLink href="/guides/best-multifunction-tester-2026">
            multifunction tester
          </SEOInternalLink>
          . It is a complementary diagnostic tool that helps you find problems faster, demonstrate
          findings to customers, and add professionalism to your inspection reports.
        </p>
        <SEOAppBridge
          title="Add thermal images to your EICR reports"
          description="Elec-Mate's EICR certificate app supports photo attachments — include thermal images alongside your schedule of test results for professional, evidence-based condition reports."
          icon={Camera}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BestThermalImagingCameraElectricianPage() {
  return (
    <GuideTemplate
      title="Best Thermal Imaging Camera for Electricians 2026"
      description="Honest comparison of the best thermal imaging cameras for UK electricians in 2026. FLIR C5, HikMicro B1L, Fluke PTi120, FLIR ONE Pro, and Milwaukee M12 compared on resolution, temperature range, battery life, and price."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Equipment Guide"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          Best Thermal Imaging Camera for Electricians:{' '}
          <span className="text-yellow-400">2026 Buyers Guide</span>
        </>
      }
      heroSubtitle="Find loose connections, overloaded circuits, and hidden faults before they cause fires. Five thermal cameras compared for resolution, battery life, connectivity, and real-world value on site."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Thermal Imaging for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Add Thermal Evidence to Your EICR Reports"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EICR certificates with photo attachments, AI board scanning, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
