import { ArrowLeft, Zap, CheckCircle, RotateCcw, Ruler, Hand, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Bend Radius and Handling Precautions | Fibre Optics Module 3";
const DESCRIPTION = "Master fibre optic cable bend radius limits and handling procedures. Learn minimum bend radius calculations, macrobend vs microbend losses, and proper installation techniques for UK networks.";

const quickCheckQuestions = [
  {
    id: "fo-m3s2-qc1",
    question: "What is the typical minimum bend radius for installed fibre cable?",
    options: ["5x cable diameter", "10x cable diameter", "20x cable diameter", "50x cable diameter"],
    correctIndex: 1,
    explanation: "The standard minimum bend radius for installed (static) fibre cable is typically 10x the outer cable diameter. Under tension during pulling, this increases to 15-20x diameter."
  },
  {
    id: "fo-m3s2-qc2",
    question: "What type of loss occurs when a cable is bent beyond its minimum radius?",
    options: ["Insertion loss only", "Return loss only", "Macrobend loss", "Connector loss"],
    correctIndex: 2,
    explanation: "Macrobend loss occurs when cable is bent too sharply, causing light to escape from the core into the cladding at the bend point, resulting in signal attenuation."
  },
  {
    id: "fo-m3s2-qc3",
    question: "Bend-insensitive fibre (BIF) was developed primarily for which application?",
    options: ["Submarine cables", "FTTH installations with tight bends", "Industrial high-temperature use", "Military deployments"],
    correctIndex: 1,
    explanation: "Bend-insensitive fibre (G.657) was developed for FTTH deployments where tight bends are unavoidable in residential installations, reducing macrobend losses at small radii."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "During cable pulling, the minimum bend radius should be:",
    options: ["Same as installed radius", "15-20x cable diameter", "5x cable diameter", "No limit applies"],
    correctAnswer: 1,
    explanation: "Under tension during pulling, the minimum bend radius increases to 15-20x cable diameter to prevent damage."
  },
  {
    id: 2,
    question: "Macrobend loss is caused by:",
    options: ["Connector contamination", "Light escaping at sharp bends", "Core misalignment", "Wavelength mismatch"],
    correctAnswer: 1,
    explanation: "Macrobend loss occurs when light escapes from the fibre core at sharp bends."
  },
  {
    id: 3,
    question: "Microbend loss results from:",
    options: ["Sharp cable bends", "Small-scale irregularities in fibre/coating", "Splice imperfections", "End face damage"],
    correctAnswer: 1,
    explanation: "Microbend loss comes from microscopic distortions along the fibre caused by pressure points, crimps, or coating defects."
  },
  {
    id: 4,
    question: "G.657.A2 bend-insensitive fibre can handle radii down to:",
    options: ["30mm", "15mm", "7.5mm", "2mm"],
    correctAnswer: 2,
    explanation: "G.657.A2 bend-insensitive fibre can operate with bend radii as low as 7.5mm."
  },
  {
    id: 5,
    question: "The purpose of innerduct is to:",
    options: ["Provide additional bandwidth", "Protect cable and maintain bend radius in larger ducts", "Enable water blocking", "Reduce pull tension"],
    correctAnswer: 1,
    explanation: "Innerduct protects cables and maintains bend radius within larger duct systems."
  },
  {
    id: 6,
    question: "When routing patch cables in a cabinet:",
    options: ["Tight 90 degree bends are acceptable for short distances", "Use cable management with appropriate bend radius", "No bend radius requirements apply to patch cables", "Only the first and last bend matter"],
    correctAnswer: 1,
    explanation: "Patch cables require proper cable management with appropriate bend radius guides."
  },
  {
    id: 7,
    question: "A figure-8 storage configuration for cable is used to:",
    options: ["Increase signal strength", "Prevent twisting while maintaining minimum radius", "Enable faster deployment", "Reduce cable weight"],
    correctAnswer: 1,
    explanation: "Figure-8 storage prevents twist buildup while maintaining minimum bend radius."
  },
  {
    id: 8,
    question: "Maximum pulling tension for standard fibre cables is typically:",
    options: ["50N", "100-200N", "600-2700N", "10,000N"],
    correctAnswer: 2,
    explanation: "Standard fibre cables have maximum pulling tensions in the 600-2700N range depending on construction."
  },
  {
    id: 9,
    question: "If a fibre cable has been kinked (severely over-bent):",
    options: ["Gently straighten and continue use", "Test only - probably OK if it passes", "Replace the damaged section - permanent damage likely", "Add extra slack to compensate"],
    correctAnswer: 2,
    explanation: "Kinked cable has permanent damage and must be replaced - the glass develops microfractures that cannot be reversed."
  },
  {
    id: 10,
    question: "Cable lubricant is used during pulls to:",
    options: ["Reduce pulling tension and prevent damage", "Improve optical performance", "Provide waterproofing", "Meet fire rating requirements"],
    correctAnswer: 0,
    explanation: "Cable lubricant reduces friction and pulling tension to prevent cable damage during installation."
  }
];

const faqs = [
  {
    question: "How do I calculate the minimum bend radius for a specific cable?",
    answer: "Check the cable manufacturer's datasheet for exact specifications. As a general rule: installed (static) = 10x outer diameter, under tension during pulling = 15-20x outer diameter. For a typical 6mm indoor cable, that's 60mm installed, 90-120mm during pulling. Some cables have different requirements - always verify with manufacturer specs."
  },
  {
    question: "What happens if I exceed the minimum bend radius temporarily during installation?",
    answer: "Brief, minor exceedance during handling may not cause permanent damage if the cable springs back to acceptable radius. However, severe overbending (kinking) causes permanent microfractures in the glass that cannot be reversed. If you hear a 'crack' or feel a kink form, assume damage and test that section. When in doubt, replace the affected cable."
  },
  {
    question: "Can bend-insensitive fibre replace all standard fibre?",
    answer: "G.657.A-compliant BIF is backwards compatible with G.652.D standard fibre and can be used as direct replacement in most applications. G.657.B types (more bend-insensitive) may have compatibility limitations with some older equipment. For new installations, G.657.A1/A2 provides bend tolerance benefits while maintaining full compatibility."
  },
  {
    question: "How tight can I bend a patch cable in a cabinet?",
    answer: "Most LC duplex patch cables have 30mm minimum bend radius specified. Use cable management with appropriate radius guides - typically 50mm+ radius curves. Avoid letting patches hang in tight loops. Pre-formed patch cables (specific lengths with factory bends) can help maintain compliance in constrained spaces."
  },
  {
    question: "What's the difference between macrobend and microbend loss?",
    answer: "Macrobend loss occurs at visible, large-scale bends - light escapes because the bend exceeds the fibre's ability to contain it. Microbend loss comes from microscopic distortions along the fibre length caused by pressure points, crimps, or coating defects. Macrobends are installer-controllable; microbends are often manufacturing or environmental issues."
  },
  {
    question: "How do I fix a section of cable that's been over-bent?",
    answer: "You cannot 'fix' bent fibre - glass damage is permanent. Options: 1) Cut out the damaged section and splice in good cable, 2) Replace the entire cable run if splicing isn't practical, 3) If damage is minor and testing passes, document and monitor. Never ignore suspected bend damage - it may worsen over time due to stress fractures."
  }
];

const FiberOpticsModule3Section2 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fiber-optics-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <RotateCcw className="h-4 w-4" />
            <span>Module 3 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Bend Radius and Handling
          </h1>
          <p className="text-white/80">
            Critical limits and proper techniques for fibre cable installation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Installed:</strong> 10x cable diameter minimum</li>
              <li><strong>Pulling:</strong> 15-20x diameter under tension</li>
              <li><strong>Kinks:</strong> Permanent damage - replace cable</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Install It / Check It</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Pulleys:</strong> Use at bends during installation</li>
              <li><strong>Datasheet:</strong> Check for exact radius specs</li>
              <li><strong>Test:</strong> OTDR if damage suspected</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Minimum bend radius principles",
              "Macrobend vs microbend loss",
              "Pulling tension limits",
              "Bend-insensitive fibre applications",
              "Proper handling techniques",
              "Damage prevention and detection"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Understanding Bend Radius */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Bend Radius
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Bend radius</strong> is the minimum radius a fibre cable can be bent without causing signal loss or physical damage. Light travels through optical fibre by total internal reflection - when bent too sharply, light can escape from the core, causing <strong>attenuation</strong>. Severe bending can also physically damage the glass fibre itself.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Standard Bend Radius Guidelines:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Installed (Static):</strong> 10x outer cable diameter minimum. Cable at rest, no tension applied.</li>
                <li><strong>Under Load (During Pulling):</strong> 15-20x outer cable diameter. Increased radius needed when tension applied.</li>
                <li><strong>Patch Cables:</strong> Typically 30mm minimum for standard fibre, check individual cable specs.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculating Minimum Bend Radius</p>
              <p className="text-sm text-white mb-2">For a cable with 8mm outer diameter:</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Installed:</strong> 8mm x 10 = 80mm minimum radius</li>
                <li><strong>During pull:</strong> 8mm x 20 = 160mm minimum radius</li>
                <li>Always verify with manufacturer's datasheet for exact specifications</li>
              </ul>
            </div>

            <p>
              The bend radius specification accounts for both <strong>optical performance</strong> (preventing light loss) and <strong>mechanical integrity</strong> (preventing glass breakage). Even if a tight bend doesn't immediately fail testing, it may cause <strong>long-term reliability issues</strong> as the stressed glass develops microfractures.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Macrobend and Microbend Loss */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Macrobend and Microbend Loss
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Bend-induced losses fall into two categories based on the scale of the bending: <strong>macrobends</strong> (visible, large-scale bends) and <strong>microbends</strong> (microscopic, invisible distortions). Both cause light to escape from the fibre core, resulting in signal attenuation.
            </p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Macrobend Loss</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li><strong>Cause:</strong> Cable bent beyond minimum radius</li>
                  <li><strong>Scale:</strong> Visible bends (mm to cm range)</li>
                  <li><strong>Effect:</strong> Light escapes at bend point</li>
                  <li><strong>Wavelength:</strong> Worse at 1550nm than 1310nm</li>
                  <li><strong>Detection:</strong> OTDR shows localised loss</li>
                  <li><strong>Fix:</strong> Relax the bend or re-route</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Microbend Loss</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li><strong>Cause:</strong> Pressure, crimps, coating defects</li>
                  <li><strong>Scale:</strong> Microscopic (um range)</li>
                  <li><strong>Effect:</strong> Distributed loss along fibre</li>
                  <li><strong>Wavelength:</strong> Affects all wavelengths</li>
                  <li><strong>Detection:</strong> OTDR shows elevated attenuation</li>
                  <li><strong>Fix:</strong> Often requires cable replacement</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Kinking: Severe Macrobend Damage</p>
              <p className="text-sm text-white">
                A <strong>kink</strong> is a severe, localised bend that exceeds the fibre's elastic limit. The glass develops permanent microfractures that cannot be reversed. Signs include: visible sharp bend in cable, audible 'crack' during bending, high localised loss on OTDR, or cable won't return to straight. <strong>Kinked cable sections must be replaced</strong> - no amount of relaxing the bend will restore performance.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wavelength Sensitivity</p>
              <p className="text-sm text-white">
                Macrobend loss is <strong>wavelength-dependent</strong> - longer wavelengths (1550nm, 1625nm) are more sensitive to bending than shorter wavelengths (1310nm). This is why OTDR testing often uses 1550nm or 1625nm for bend detection. A bend that passes at 1310nm may fail at 1550nm.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Bend-Insensitive Fibre */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Bend-Insensitive Fibre (BIF)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Bend-insensitive fibre (BIF)</strong> was developed to reduce macrobend losses in applications where tight bends are unavoidable - particularly FTTH (Fibre to the Home) installations where cables must navigate tight spaces, staples, and corners in residential buildings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">ITU-T G.657 BIF Classifications:</p>
              <div className="grid grid-cols-3 gap-2 text-sm text-white ml-4 mb-2">
                <span className="font-medium">Class</span>
                <span className="font-medium">Min Radius</span>
                <span className="font-medium">Notes</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm text-white ml-4">
                <span>G.657.A1</span>
                <span>10mm</span>
                <span>G.652.D compatible</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm text-white ml-4">
                <span>G.657.A2</span>
                <span>7.5mm</span>
                <span>Enhanced bend, G.652.D compatible</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm text-white ml-4">
                <span>G.657.B2</span>
                <span>7.5mm</span>
                <span>Not backwards compatible</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm text-white ml-4">
                <span>G.657.B3</span>
                <span>5mm</span>
                <span>Extreme bend, limited compatibility</span>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">How BIF Works</p>
              <p className="text-sm text-white">
                Bend-insensitive fibre uses modified refractive index profiles - typically a <strong>trench-assisted design</strong> with a low-index ring around the core. This 'trench' reflects escaping light back into the core, even at tight bends. The trade-off is slightly different optical characteristics that may affect some legacy equipment compatibility.
              </p>
            </div>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use BIF</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>FTTH drop cables and ONT connections</li>
                  <li>Dense cabinet patching</li>
                  <li>Surface-mount residential installations</li>
                  <li>Pre-terminated patch cables</li>
                  <li>Any application with unavoidable tight bends</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compatibility Notes</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>G.657.A types: splice to G.652.D with no issues</li>
                  <li>G.657.B types: verify equipment compatibility</li>
                  <li>Don't mix G.657.B with G.652 in same link</li>
                  <li>BIF costs slightly more than standard fibre</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Pulling Tension and Handling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Pulling Tension and Handling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper cable handling during installation is critical to preventing damage. Fibre cables have specific <strong>maximum pulling tension</strong> limits - exceeding these can stretch or break fibres within the cable. The tension rating varies by cable type and construction.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Pulling Tension Limits:</p>
              <div className="text-sm text-white ml-4 space-y-1">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>Indoor distribution cable</span>
                  <span>200-600N</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>External loose-tube (unarmoured)</span>
                  <span>1000-2700N</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>Armoured external cable</span>
                  <span>2000-3000N</span>
                </div>
                <div className="flex justify-between">
                  <span>Mini/micro cables</span>
                  <span>100-300N</span>
                </div>
              </div>
              <p className="text-xs text-white/80 mt-2 ml-4">Always verify with manufacturer datasheet for specific cable</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Proper Pulling Techniques</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Pull from strength member:</strong> Use pulling eyes attached to aramid yarns, not the sheath</li>
                <li><strong>Use cable lubricant:</strong> Reduces friction and tension - use type compatible with cable sheath</li>
                <li><strong>Monitor tension:</strong> Use a dynamometer for long pulls</li>
                <li><strong>Multiple short pulls:</strong> Better than one long pull for complex routes</li>
                <li><strong>Guide at bends:</strong> Use pulleys or rollers at direction changes</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sidewall Pressure</p>
              <p className="text-sm text-white">
                At bends during pulling, <strong>sidewall pressure</strong> concentrates force on the cable's outer surface. This is calculated from tension and bend radius - higher tension or tighter bends increase pressure. Exceed sidewall pressure limits and you'll crush the cable. Use larger radius pulleys and reduce tension to manage sidewall pressure in complex routes.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Cable Management */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Cable Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              After installation, maintaining proper bend radius requires appropriate <strong>cable management</strong>. This includes routing through containment, slack storage, and cabinet/patch panel management.
            </p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bend Radius Limiters</p>
                <p className="text-sm text-white">Curved guides at direction changes that prevent tight bending. Available as standalone brackets or integrated into tray fittings.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Splice Trays</p>
                <p className="text-sm text-white">Manage bare fibre at splice points. Typically provide 60mm minimum bend radius for coiled fibre storage.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Patch Panel Management</p>
                <p className="text-sm text-white">Horizontal and vertical cable organisers with guides. Keep patch cables from hanging in tight loops.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Innerduct</p>
                <p className="text-sm text-white">Small-diameter tubing in larger ducts. Maintains separation and bend radius, enables future cable pulls.</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Figure-8 Storage Method</p>
              <p className="text-sm text-white">
                When storing cable slack, use a <strong>figure-8 (infinity) pattern</strong> rather than simple coils. This prevents twist buildup that can cause microbends when cable is later uncoiled. The figure-8 naturally reverses twist direction on each loop, keeping the cable relaxed.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Slack Management Tips</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Allow 3-5m slack at each termination point for re-termination</li>
                <li>Store slack in accessible locations - ceiling voids, cabinets, joint boxes</li>
                <li>Don't tightly coil - maintain minimum bend radius in stored loops</li>
                <li>Protect stored slack from mechanical damage</li>
                <li>Label slack locations in documentation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 06: Damage Prevention and Detection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Damage Prevention and Detection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Prevention is always better than repair when it comes to fibre cable damage. Understanding common damage mechanisms and how to detect problems early helps maintain reliable networks.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Damage Causes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Over-bending:</strong> Exceeding minimum radius during installation or at permanent bends</li>
                <li><strong>Crushing:</strong> Cables trapped in doors, under equipment, in overfilled conduit</li>
                <li><strong>Tension:</strong> Exceeding pull limits or leaving cables under permanent strain</li>
                <li><strong>Impact:</strong> Tools dropped on cables, cables used as handholds</li>
                <li><strong>Temperature:</strong> Installing in extreme cold (brittle sheath) or hot work nearby</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Detection Methods</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Visual inspection:</strong> Look for kinks, crushing, jacket damage</li>
                <li><strong>OTDR testing:</strong> Identifies location and magnitude of losses</li>
                <li><strong>Power meter:</strong> Measures total link loss against baseline</li>
                <li><strong>1550/1625nm testing:</strong> More sensitive to bend loss than 1310nm</li>
                <li><strong>Comparison testing:</strong> Test similar routes - significant difference indicates problem</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Prevention Best Practices</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Train all personnel on fibre handling requirements</li>
                <li>Use proper tools and equipment (pulleys, lubricant, tension monitors)</li>
                <li>Verify bend radius at all direction changes during and after installation</li>
                <li>Test immediately after installation to establish baseline</li>
                <li>Document test results and route details for future reference</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Calculate bend radius requirements before starting installation</li>
                <li>Position pulleys/rollers at all direction changes</li>
                <li>Use cable lubricant on pulls over 30m or with multiple bends</li>
                <li>Never step on, kneel on, or use cable drums as work platforms</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Post-Installation Checks</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Walk the route and visually verify bend compliance</li>
                <li>OTDR test at 1550nm minimum (ideally 1310nm and 1550nm)</li>
                <li>Compare measured loss to link loss budget</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming "it'll be fine"</strong> - for slightly tight bends</li>
                <li><strong>Pulling by jacket</strong> - instead of strength member</li>
                <li><strong>Leaving kinked cable</strong> - because it still passes testing</li>
                <li><strong>Ignoring specs</strong> - using generic radius rules instead of manufacturer data</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Bend Radius</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-elec-yellow/80 mb-1">Standard Fibre</p>
                <ul className="space-y-0.5">
                  <li><strong>Installed:</strong> 10x cable diameter</li>
                  <li><strong>Under tension:</strong> 15-20x diameter</li>
                  <li><strong>Patch cables:</strong> ~30mm typical</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow/80 mb-1">Bend-Insensitive (G.657)</p>
                <ul className="space-y-0.5">
                  <li><strong>G.657.A1:</strong> 10mm minimum</li>
                  <li><strong>G.657.A2:</strong> 7.5mm minimum</li>
                  <li><strong>G.657.B3:</strong> 5mm minimum</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-white mt-4 pt-4 border-t border-elec-yellow/30">
              <strong>Key rule:</strong> Macrobend loss is wavelength-dependent - test at 1550nm for best bend detection. Kinks = replace cable.
            </p>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Cable Types
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next: Routing and Containment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule3Section2;
