import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, Info, BookOpen, Lightbulb, AlertTriangle, HelpCircle, ChevronDown, ChevronUp, RotateCcw, Hand, Ruler, Shield } from "lucide-react";
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
    options: ["5× cable diameter", "10× cable diameter", "20× cable diameter", "50× cable diameter"],
    correctIndex: 1,
    explanation: "The standard minimum bend radius for installed (static) fibre cable is typically 10× the outer cable diameter. Under tension during pulling, this increases to 15-20× diameter."
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
    question: "During cable pulling, the minimum bend radius should be:",
    options: ["Same as installed radius", "15-20× cable diameter", "5× cable diameter", "No limit applies"],
    correctAnswer: 1
  },
  {
    question: "Macrobend loss is caused by:",
    options: ["Connector contamination", "Light escaping at sharp bends", "Core misalignment", "Wavelength mismatch"],
    correctAnswer: 1
  },
  {
    question: "Microbend loss results from:",
    options: ["Sharp cable bends", "Small-scale irregularities in fibre/coating", "Splice imperfections", "End face damage"],
    correctAnswer: 1
  },
  {
    question: "G.657.A2 bend-insensitive fibre can handle radii down to:",
    options: ["30mm", "15mm", "7.5mm", "2mm"],
    correctAnswer: 2
  },
  {
    question: "The purpose of innerduct is to:",
    options: ["Provide additional bandwidth", "Protect cable and maintain bend radius in larger ducts", "Enable water blocking", "Reduce pull tension"],
    correctAnswer: 1
  },
  {
    question: "When routing patch cables in a cabinet:",
    options: ["Tight 90° bends are acceptable for short distances", "Use cable management with appropriate bend radius", "No bend radius requirements apply to patch cables", "Only the first and last bend matter"],
    correctAnswer: 1
  },
  {
    question: "A figure-8 storage configuration for cable is used to:",
    options: ["Increase signal strength", "Prevent twisting while maintaining minimum radius", "Enable faster deployment", "Reduce cable weight"],
    correctAnswer: 1
  },
  {
    question: "Maximum pulling tension for standard fibre cables is typically:",
    options: ["50N", "100-200N", "600-2700N", "10,000N"],
    correctAnswer: 2
  },
  {
    question: "If a fibre cable has been kinked (severely over-bent):",
    options: ["Gently straighten and continue use", "Test only - probably OK if it passes", "Replace the damaged section - permanent damage likely", "Add extra slack to compensate"],
    correctAnswer: 2
  },
  {
    question: "Cable lubricant is used during pulls to:",
    options: ["Reduce pulling tension and prevent damage", "Improve optical performance", "Provide waterproofing", "Meet fire rating requirements"],
    correctAnswer: 0
  }
];

const faqs = [
  {
    question: "How do I calculate the minimum bend radius for a specific cable?",
    answer: "Check the cable manufacturer's datasheet for exact specifications. As a general rule: installed (static) = 10× outer diameter, under tension during pulling = 15-20× outer diameter. For a typical 6mm indoor cable, that's 60mm installed, 90-120mm during pulling. Some cables have different requirements—always verify with manufacturer specs."
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
    answer: "Most LC duplex patch cables have 30mm minimum bend radius specified. Use cable management with appropriate radius guides—typically 50mm+ radius curves. Avoid letting patches hang in tight loops. Pre-formed patch cables (specific lengths with factory bends) can help maintain compliance in constrained spaces."
  },
  {
    question: "What's the difference between macrobend and microbend loss?",
    answer: "Macrobend loss occurs at visible, large-scale bends—light escapes because the bend exceeds the fibre's ability to contain it. Microbend loss comes from microscopic distortions along the fibre length caused by pressure points, crimps, or coating defects. Macrobends are installer-controllable; microbends are often manufacturing or environmental issues."
  },
  {
    question: "How do I fix a section of cable that's been over-bent?",
    answer: "You cannot 'fix' bent fibre—glass damage is permanent. Options: 1) Cut out the damaged section and splice in good cable, 2) Replace the entire cable run if splicing isn't practical, 3) If damage is minor and testing passes, document and monitor. Never ignore suspected bend damage—it may worsen over time due to stress fractures."
  }
];

const FiberOpticsModule3Section2 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/60">
        <div className="container flex h-14 max-w-screen-2xl items-center px-4">
          <Link
            to="/study-centre/apprentice/fibre-optics/module-3"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Module 3</span>
          </Link>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Title Section */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm font-medium px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <RotateCcw className="h-4 w-4" />
            Module 3 • Section 2
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Bend Radius and Handling
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Critical limits and proper techniques for fibre cable installation
          </p>
        </section>

        {/* Quick Summary Cards */}
        <section className="grid sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-5 border border-elec-yellow/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                <Zap className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">In 30 Seconds</h3>
                <p className="text-sm text-white/80">
                  Installed: 10× cable diameter minimum. Pulling: 15-20× diameter. Macrobends cause signal loss. Kinks = permanent damage. BIF fibre tolerates tighter bends.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl p-5 border border-blue-500/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Install It / Check It</h3>
                <p className="text-sm text-white/80">
                  Use pulleys at bends during installation. Check datasheet for exact radius. Use cable management in cabinets. Never force cable into tight spaces. Test if damage suspected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            What You'll Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Minimum bend radius principles",
              "Macrobend vs microbend loss",
              "Pulling tension limits",
              "Bend-insensitive fibre applications",
              "Proper handling techniques",
              "Damage prevention and detection"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 1: Understanding Bend Radius */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">01</span>
            <h2 className="text-2xl font-bold">Understanding Bend Radius</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              <strong>Bend radius</strong> is the minimum radius a fibre cable can be bent without causing signal loss or physical damage. Light travels through optical fibre by total internal reflection—when bent too sharply, light can escape from the core, causing <strong>attenuation</strong>. Severe bending can also physically damage the glass fibre itself.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Standard Bend Radius Guidelines</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Ruler className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Installed (Static)</p>
                    <p className="text-sm text-white/70">10× outer cable diameter minimum. Cable at rest, no tension applied.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ruler className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Under Load (During Pulling)</p>
                    <p className="text-sm text-white/70">15-20× outer cable diameter. Increased radius needed when tension applied.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ruler className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Patch Cables</p>
                    <p className="text-sm text-white/70">Typically 30mm minimum for standard fibre, check individual cable specs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Calculating Minimum Bend Radius
              </h4>
              <p className="text-sm mb-2">
                For a cable with 8mm outer diameter:
              </p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Installed:</strong> 8mm × 10 = 80mm minimum radius</li>
                <li>• <strong>During pull:</strong> 8mm × 20 = 160mm minimum radius</li>
                <li>• Always verify with manufacturer's datasheet for exact specifications</li>
              </ul>
            </div>

            <p>
              The bend radius specification accounts for both <strong>optical performance</strong> (preventing light loss) and <strong>mechanical integrity</strong> (preventing glass breakage). Even if a tight bend doesn't immediately fail testing, it may cause <strong>long-term reliability issues</strong> as the stressed glass develops microfractures.
            </p>
          </div>
        </section>

        {/* Inline Check 1 */}
        <InlineCheck
          id={quickCheckQuestions[0].id}
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 2: Macrobend and Microbend Loss */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">02</span>
            <h2 className="text-2xl font-bold">Macrobend and Microbend Loss</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Bend-induced losses fall into two categories based on the scale of the bending: <strong>macrobends</strong> (visible, large-scale bends) and <strong>microbends</strong> (microscopic, invisible distortions). Both cause light to escape from the fibre core, resulting in signal attenuation.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
                <h4 className="font-semibold text-amber-400 mb-2">Macrobend Loss</h4>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Cause:</strong> Cable bent beyond minimum radius</li>
                  <li>• <strong>Scale:</strong> Visible bends (mm to cm range)</li>
                  <li>• <strong>Effect:</strong> Light escapes at bend point</li>
                  <li>• <strong>Wavelength:</strong> Worse at longer wavelengths (1550nm > 1310nm)</li>
                  <li>• <strong>Detection:</strong> OTDR shows localised loss at bend</li>
                  <li>• <strong>Fix:</strong> Relax the bend or re-route cable</li>
                </ul>
              </div>
              <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
                <h4 className="font-semibold text-purple-400 mb-2">Microbend Loss</h4>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Cause:</strong> Pressure, crimps, coating defects</li>
                  <li>• <strong>Scale:</strong> Microscopic (µm range)</li>
                  <li>• <strong>Effect:</strong> Distributed loss along fibre</li>
                  <li>• <strong>Wavelength:</strong> Affects all wavelengths</li>
                  <li>• <strong>Detection:</strong> OTDR shows elevated attenuation</li>
                  <li>• <strong>Fix:</strong> Often requires cable replacement</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Kinking: Severe Macrobend Damage
              </h4>
              <p className="text-sm">
                A <strong>kink</strong> is a severe, localised bend that exceeds the fibre's elastic limit. The glass develops permanent microfractures that cannot be reversed. Signs include: visible sharp bend in cable, audible 'crack' during bending, high localised loss on OTDR, or cable won't return to straight. <strong>Kinked cable sections must be replaced</strong>—no amount of relaxing the bend will restore performance.
              </p>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Wavelength Sensitivity
              </h4>
              <p className="text-sm">
                Macrobend loss is <strong>wavelength-dependent</strong>—longer wavelengths (1550nm, 1625nm) are more sensitive to bending than shorter wavelengths (1310nm). This is why OTDR testing often uses 1550nm or 1625nm for bend detection. A bend that passes at 1310nm may fail at 1550nm.
              </p>
            </div>
          </div>
        </section>

        {/* Inline Check 2 */}
        <InlineCheck
          id={quickCheckQuestions[1].id}
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Section 3: Bend-Insensitive Fibre */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">03</span>
            <h2 className="text-2xl font-bold">Bend-Insensitive Fibre (BIF)</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              <strong>Bend-insensitive fibre (BIF)</strong> was developed to reduce macrobend losses in applications where tight bends are unavoidable—particularly FTTH (Fibre to the Home) installations where cables must navigate tight spaces, staples, and corners in residential buildings.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">ITU-T G.657 BIF Classifications</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 pr-4">Class</th>
                      <th className="text-left py-2 pr-4">Min Radius</th>
                      <th className="text-left py-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4 font-medium">G.657.A1</td>
                      <td className="py-2 pr-4">10mm</td>
                      <td className="py-2">Compatible with G.652.D standard fibre</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4 font-medium">G.657.A2</td>
                      <td className="py-2 pr-4">7.5mm</td>
                      <td className="py-2">Enhanced bend performance, G.652.D compatible</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4 font-medium">G.657.B2</td>
                      <td className="py-2 pr-4">7.5mm</td>
                      <td className="py-2">Not backwards compatible—FTTH specific</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">G.657.B3</td>
                      <td className="py-2 pr-4">5mm</td>
                      <td className="py-2">Extreme bend tolerance, limited compatibility</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                How BIF Works
              </h4>
              <p className="text-sm">
                Bend-insensitive fibre uses modified refractive index profiles—typically a <strong>trench-assisted design</strong> with a low-index ring around the core. This 'trench' reflects escaping light back into the core, even at tight bends. The trade-off is slightly different optical characteristics that may affect some legacy equipment compatibility.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">When to Use BIF</h4>
                <ul className="text-sm space-y-1">
                  <li>• FTTH drop cables and ONT connections</li>
                  <li>• Dense cabinet patching</li>
                  <li>• Surface-mount residential installations</li>
                  <li>• Pre-terminated patch cables</li>
                  <li>• Any application with unavoidable tight bends</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
                <h4 className="font-semibold text-amber-400 mb-2">Compatibility Notes</h4>
                <ul className="text-sm space-y-1">
                  <li>• G.657.A types: splice to G.652.D with no issues</li>
                  <li>• G.657.B types: verify equipment compatibility</li>
                  <li>• Don't mix G.657.B with G.652 in same link</li>
                  <li>• BIF costs slightly more than standard fibre</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Check 3 */}
        <InlineCheck
          id={quickCheckQuestions[2].id}
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* Section 4: Pulling Tension and Handling */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">04</span>
            <h2 className="text-2xl font-bold">Pulling Tension and Handling</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Proper cable handling during installation is critical to preventing damage. Fibre cables have specific <strong>maximum pulling tension</strong> limits—exceeding these can stretch or break fibres within the cable. The tension rating varies by cable type and construction.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Typical Pulling Tension Limits</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Indoor distribution cable</span>
                  <span className="font-medium">200-600N</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>External loose-tube (unarmoured)</span>
                  <span className="font-medium">1000-2700N</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Armoured external cable</span>
                  <span className="font-medium">2000-3000N</span>
                </div>
                <div className="flex justify-between">
                  <span>Mini/micro cables</span>
                  <span className="font-medium">100-300N</span>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-2">Always verify with manufacturer datasheet for specific cable</p>
            </div>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <Hand className="h-4 w-4" />
                Proper Pulling Techniques
              </h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Pull from strength member:</strong> Use pulling eyes attached to aramid yarns, not the sheath</li>
                <li>• <strong>Use cable lubricant:</strong> Reduces friction and tension—use type compatible with cable sheath</li>
                <li>• <strong>Monitor tension:</strong> Use a dynamometer for long pulls</li>
                <li>• <strong>Multiple short pulls:</strong> Better than one long pull for complex routes</li>
                <li>• <strong>Guide at bends:</strong> Use pulleys or rollers at direction changes</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Sidewall Pressure
              </h4>
              <p className="text-sm">
                At bends during pulling, <strong>sidewall pressure</strong> concentrates force on the cable's outer surface. This is calculated from tension and bend radius—higher tension or tighter bends increase pressure. Exceed sidewall pressure limits and you'll crush the cable. Use larger radius pulleys and reduce tension to manage sidewall pressure in complex routes.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Cable Management */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">05</span>
            <h2 className="text-2xl font-bold">Cable Management</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              After installation, maintaining proper bend radius requires appropriate <strong>cable management</strong>. This includes routing through containment, slack storage, and cabinet/patch panel management.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Cable Management Components</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-white mb-1">Bend Radius Limiters</h5>
                  <p className="text-white/70">Curved guides at direction changes that prevent tight bending. Available as standalone brackets or integrated into tray fittings.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Splice Trays</h5>
                  <p className="text-white/70">Manage bare fibre at splice points. Typically provide 60mm minimum bend radius for coiled fibre storage.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Patch Panel Management</h5>
                  <p className="text-white/70">Horizontal and vertical cable organisers with guides. Keep patch cables from hanging in tight loops.</p>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Innerduct</h5>
                  <p className="text-white/70">Small-diameter tubing in larger ducts. Maintains separation and bend radius, enables future cable pulls.</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Figure-8 Storage Method
              </h4>
              <p className="text-sm">
                When storing cable slack, use a <strong>figure-8 (infinity) pattern</strong> rather than simple coils. This prevents twist buildup that can cause microbends when cable is later uncoiled. The figure-8 naturally reverses twist direction on each loop, keeping the cable relaxed.
              </p>
            </div>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Slack Management Tips
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Allow 3-5m slack at each termination point for re-termination</li>
                <li>• Store slack in accessible locations—ceiling voids, cabinets, joint boxes</li>
                <li>• Don't tightly coil—maintain minimum bend radius in stored loops</li>
                <li>• Protect stored slack from mechanical damage</li>
                <li>• Label slack locations in documentation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Damage Prevention and Detection */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">06</span>
            <h2 className="text-2xl font-bold">Damage Prevention and Detection</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Prevention is always better than repair when it comes to fibre cable damage. Understanding common damage mechanisms and how to detect problems early helps maintain reliable networks.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Common Damage Causes</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span><strong>Over-bending:</strong> Exceeding minimum radius during installation or at permanent bends</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span><strong>Crushing:</strong> Cables trapped in doors, under equipment, in overfilled conduit</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span><strong>Tension:</strong> Exceeding pull limits or leaving cables under permanent strain</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span><strong>Impact:</strong> Tools dropped on cables, cables used as handholds</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5" />
                  <span><strong>Temperature:</strong> Installing in extreme cold (brittle sheath) or hot work nearby</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Detection Methods
              </h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Visual inspection:</strong> Look for kinks, crushing, jacket damage</li>
                <li>• <strong>OTDR testing:</strong> Identifies location and magnitude of losses</li>
                <li>• <strong>Power meter:</strong> Measures total link loss against baseline</li>
                <li>• <strong>1550/1625nm testing:</strong> More sensitive to bend loss than 1310nm</li>
                <li>• <strong>Comparison testing:</strong> Test similar routes—significant difference indicates problem</li>
              </ul>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2">Prevention Best Practices</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span>Train all personnel on fibre handling requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span>Use proper tools and equipment (pulleys, lubricant, tension monitors)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span>Verify bend radius at all direction changes during and after installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span>Test immediately after installation to establish baseline</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                  <span>Document test results and route details for future reference</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Installation Best Practices</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Calculate bend radius requirements before starting installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Position pulleys/rollers at all direction changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Use cable lubricant on pulls over 30m or with multiple bends</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Never step on, kneel on, or use cable drums as work platforms</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Post-Installation Checks</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Walk the route and visually verify bend compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>OTDR test at 1550nm minimum (ideally 1310nm and 1550nm)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Compare measured loss to link loss budget</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Common Mistakes to Avoid</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Assuming "it'll be fine" for slightly tight bends</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Pulling by the cable jacket instead of strength member</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Leaving kinked cable in place because it still passes testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Ignoring cable specifications and using generic radius rules</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors touch-manipulation min-h-[44px]"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-white/60 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-white/60 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4 text-white/70 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-6 border border-elec-yellow/30">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Ruler className="h-5 w-5 text-elec-yellow" />
            Quick Reference: Bend Radius
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Standard Fibre</h4>
              <div className="space-y-1 text-white/80">
                <p><strong>Installed:</strong> 10× cable diameter</p>
                <p><strong>Under tension:</strong> 15-20× diameter</p>
                <p><strong>Patch cables:</strong> ~30mm typical</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Bend-Insensitive (G.657)</h4>
              <div className="space-y-1 text-white/80">
                <p><strong>G.657.A1:</strong> 10mm minimum</p>
                <p><strong>G.657.A2:</strong> 7.5mm minimum</p>
                <p><strong>G.657.B3:</strong> 5mm minimum</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-elec-yellow/30 text-sm text-white/80">
            <p><strong>Key rule:</strong> Macrobend loss is wavelength-dependent—test at 1550nm for best bend detection. Kinks = replace cable.</p>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <Quiz
            title="Bend Radius and Handling Quiz"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/fibre-optics/module-3/section-1"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors touch-manipulation min-h-[44px] active:scale-[0.98]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Previous: Cable Types</span>
          </Link>
          <Link
            to="/study-centre/apprentice/fibre-optics/module-3/section-3"
            className="flex items-center gap-2 text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation min-h-[44px] sm:flex-row-reverse active:scale-[0.98]"
          >
            <span>Next: Routing and Containment</span>
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default FiberOpticsModule3Section2;