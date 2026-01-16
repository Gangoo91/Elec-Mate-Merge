import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, Info, BookOpen, Lightbulb, AlertTriangle, HelpCircle, ChevronDown, ChevronUp, Sparkles, Eye, RefreshCcw, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Polish Grades (UPC, APC) | Fibre Optics Module 2";
const DESCRIPTION = "Understand fibre optic connector polish grades including PC, UPC, and APC. Learn return loss specifications, colour coding, and selection criteria for UK installations.";

const quickCheckQuestions = [
  {
    id: "fo-m2s4-qc1",
    question: "What is the typical return loss specification for UPC polished connectors?",
    options: ["-30 dB", "-40 dB", "-50 dB or better", "-65 dB"],
    correctIndex: 2,
    explanation: "UPC (Ultra Physical Contact) polish achieves return loss of -50 dB or better, significantly reducing back-reflections compared to standard PC polish."
  },
  {
    id: "fo-m2s4-qc2",
    question: "What angle is the ferrule end face polished at for APC connectors?",
    options: ["0 degrees (flat)", "4 degrees", "8 degrees", "12 degrees"],
    correctIndex: 2,
    explanation: "APC (Angled Physical Contact) connectors have the ferrule polished at an 8-degree angle, directing reflections away from the fibre core."
  },
  {
    id: "fo-m2s4-qc3",
    question: "What colour identifies APC connectors by convention?",
    options: ["Blue", "White/Beige", "Green", "Black"],
    correctIndex: 2,
    explanation: "APC connectors use green colour coding (housing or boot) by industry convention to distinguish them from UPC connectors which use blue."
  }
];

const quizQuestions = [
  {
    question: "What does PC stand for in connector polish terminology?",
    options: ["Polished Connection", "Physical Contact", "Precision Core", "Permanent Coupling"],
    correctAnswer: 1
  },
  {
    question: "Standard PC polish typically achieves a return loss of:",
    options: ["-20 dB", "-30 to -35 dB", "-50 dB", "-65 dB"],
    correctAnswer: 1
  },
  {
    question: "Why is APC polish superior for analogue signal transmission?",
    options: ["Lower insertion loss", "Fewer back-reflections cause less signal distortion", "Faster connection speed", "Lower cost"],
    correctAnswer: 1
  },
  {
    question: "Can you connect an APC connector to a UPC adaptor?",
    options: ["Yes, they are interchangeable", "No, it will damage the connector", "Only for multimode fibre", "Only at low power levels"],
    correctAnswer: 1
  },
  {
    question: "The curved end face of a UPC connector is polished with radius of approximately:",
    options: ["5-10mm", "10-25mm", "50-100mm", "Completely flat"],
    correctAnswer: 1
  },
  {
    question: "Which polish grade is typically specified for CATV/RF-over-fibre applications?",
    options: ["PC", "SPC", "UPC", "APC"],
    correctAnswer: 3
  },
  {
    question: "The 8-degree angle in APC connectors directs reflections:",
    options: ["Into the core for maximum power", "Into the cladding away from the core", "Back to the source", "Into adjacent fibres"],
    correctAnswer: 1
  },
  {
    question: "What insertion loss increase might be expected with APC vs UPC?",
    options: ["None - identical IL", "0.1-0.2 dB higher", "0.5 dB higher", "1.0 dB higher"],
    correctAnswer: 1
  },
  {
    question: "Blue coloured connector housings typically indicate:",
    options: ["APC polish", "UPC polish", "Multimode fibre", "High-power rating"],
    correctAnswer: 1
  },
  {
    question: "SPC (Super Physical Contact) polish achieves return loss of approximately:",
    options: ["-30 dB", "-40 dB", "-50 dB", "-65 dB"],
    correctAnswer: 1
  }
];

const faqs = [
  {
    question: "What happens if I accidentally connect APC to UPC?",
    answer: "The angled APC ferrule will only make partial contact with the flat UPC ferrule, causing extremely high insertion loss (potentially several dB) and unpredictable return loss. More critically, the misaligned contact can damage both ferrule end faces, requiring re-polishing or replacement. Always verify polish grades match before connecting."
  },
  {
    question: "Why doesn't multimode fibre use APC connectors?",
    answer: "Multimode systems use LED or VCSEL sources that are less sensitive to back-reflections than the lasers used in singlemode systems. The simpler UPC polish is adequate for multimode return loss requirements. Additionally, the larger multimode core makes alignment of angled ferrules less critical, and UPC's lower cost is sufficient for multimode applications."
  },
  {
    question: "How can I tell polish grade if there's no colour coding?",
    answer: "Look for markings on the connector body—'APC' or 'PC/UPC' may be printed or engraved. Check documentation or labelling. Use a fibre microscope to examine the ferrule end face: APC shows an oval light pattern due to the angle, while UPC shows a circular pattern. When in doubt, use an inspection scope before connecting."
  },
  {
    question: "Do I need APC for 10 Gigabit Ethernet?",
    answer: "For standard 10GbE data transmission, UPC polish (-50 dB return loss) is typically adequate. APC is primarily needed for analogue applications (CATV, RF), wavelength-sensitive equipment (DWDM), or where specifications explicitly require >55 dB return loss. Check your equipment specifications—most enterprise and data centre equipment works fine with UPC."
  },
  {
    question: "Can worn UPC connectors be re-polished to APC?",
    answer: "No—the fundamental geometry is different. APC requires removing material at an 8-degree angle, which would completely reshape the ferrule end. A UPC connector can be re-polished to restore UPC finish (common maintenance practice), but converting between polish types requires replacing the connector or using a new ferrule assembly."
  },
  {
    question: "Why do some patch leads have APC on one end and UPC on the other?",
    answer: "These 'hybrid' patch leads are used to connect between systems with different requirements. For example, connecting a CATV distribution system (APC) to test equipment (UPC). They're factory-made with proper transitions. However, for permanent infrastructure, it's better to standardise on one polish type throughout and use hybrid cables only at specific interface points."
  }
];

const FiberOpticsModule2Section4 = () => {
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
            to="/study-centre/apprentice/fibre-optics/module-2"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Module 2</span>
          </Link>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Title Section */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm font-medium px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30">
            <Sparkles className="h-4 w-4" />
            Module 2 • Section 4
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Polish Grades (UPC, APC)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Understanding connector end face finishing for optimal performance
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
                  Polish grade affects back-reflections. UPC (blue) = flat, -50dB return loss, general use. APC (green) = 8° angle, -65dB, for analogue/CATV. Never mix APC with UPC.
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
                <h3 className="font-semibold text-white mb-1">Identify It / Match It</h3>
                <p className="text-sm text-white/80">
                  Blue housing = UPC. Green housing = APC. Always match polish grades. Check markings if colour is ambiguous. APC to UPC = damage.
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
              "PC, UPC, and APC polish differences",
              "Return loss specifications by grade",
              "Colour coding conventions",
              "Application selection criteria",
              "Compatibility requirements",
              "Inspection and identification"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 1: Understanding Polish Grades */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">01</span>
            <h2 className="text-2xl font-bold">Understanding Polish Grades</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Fibre optic connector <strong>polish grade</strong> refers to the quality and geometry of the ferrule end face finish. This directly affects <strong>return loss</strong> (back-reflections) and <strong>insertion loss</strong> (signal attenuation). Proper polish selection is essential for system performance, particularly in singlemode applications.
            </p>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Why Polish Matters
              </h4>
              <p className="text-sm">
                When light transitions between two fibre end faces, some reflects back toward the source. This <strong>Fresnel reflection</strong> causes approximately 4% power loss (about -14 dB return loss) at an unpolished air gap. Physical contact polishing eliminates the air gap and dramatically reduces reflections—critical for laser sources sensitive to back-reflected light.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-white mb-2">PC (Physical Contact)</h4>
                <p className="text-sm text-white/60 mb-2">Original standard polish</p>
                <ul className="text-sm space-y-1">
                  <li>• Curved end face</li>
                  <li>• ~-30 to -35 dB RL</li>
                  <li>• Basic applications</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                <h4 className="font-semibold text-blue-400 mb-2">UPC (Ultra PC)</h4>
                <p className="text-sm text-white/60 mb-2">Enhanced standard</p>
                <ul className="text-sm space-y-1">
                  <li>• Extended polish process</li>
                  <li>• ≥-50 dB return loss</li>
                  <li>• Data/telecom standard</li>
                </ul>
              </div>
              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">APC (Angled PC)</h4>
                <p className="text-sm text-white/60 mb-2">Lowest reflections</p>
                <ul className="text-sm space-y-1">
                  <li>• 8° angled face</li>
                  <li>• ≥-65 dB return loss</li>
                  <li>• Analogue/RF/CATV</li>
                </ul>
              </div>
            </div>

            <p>
              The evolution from PC to UPC to APC represents increasingly stringent control of back-reflections. While <strong>insertion loss</strong> (the light lost passing through the connection) is similar across grades, the <strong>return loss</strong> (reflected light) varies significantly and drives polish grade selection.
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

        {/* Section 2: UPC - Ultra Physical Contact */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">02</span>
            <h2 className="text-2xl font-bold">UPC - Ultra Physical Contact</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              <strong>UPC (Ultra Physical Contact)</strong> is the standard polish grade for most singlemode and multimode data communications applications. The ferrule end face is polished to a slight dome shape (typically 10-25mm radius) with an extended polishing process that achieves superior surface finish compared to basic PC.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">UPC Specifications</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">End Face Geometry</p>
                  <p className="font-medium">Domed, 10-25mm radius</p>
                </div>
                <div>
                  <p className="text-white/60">Return Loss</p>
                  <p className="font-medium">≥50 dB typical</p>
                </div>
                <div>
                  <p className="text-white/60">Insertion Loss</p>
                  <p className="font-medium">≤0.25 dB typical</p>
                </div>
                <div>
                  <p className="text-white/60">Colour Code</p>
                  <p className="font-medium">Blue (singlemode)</p>
                </div>
                <div>
                  <p className="text-white/60">Surface Quality</p>
                  <p className="font-medium">Scratch-free core zone</p>
                </div>
                <div>
                  <p className="text-white/60">Primary Applications</p>
                  <p className="font-medium">Data, telecom, enterprise</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                How UPC Achieves Low Return Loss
              </h4>
              <p className="text-sm">
                The domed end face ensures the cores make contact first when connectors mate, eliminating air gaps at the critical light-carrying centre. The extended polishing removes sub-surface damage and achieves a mirror-smooth finish. Under a microscope, a properly polished UPC ferrule shows no visible scratches in the core zone.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">UPC Advantages</h4>
                <ul className="text-sm space-y-1">
                  <li>• Industry standard availability</li>
                  <li>• Lower cost than APC</li>
                  <li>• Suitable for most digital data</li>
                  <li>• Easy field termination</li>
                  <li>• Wide equipment compatibility</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-2">Typical Applications</h4>
                <ul className="text-sm space-y-1">
                  <li>• Gigabit & 10G Ethernet</li>
                  <li>• Fibre Channel storage</li>
                  <li>• Passive optical networks</li>
                  <li>• Enterprise LAN infrastructure</li>
                  <li>• Data centre interconnects</li>
                </ul>
              </div>
            </div>

            <p>
              For <strong>multimode fibre</strong>, standard PC or UPC polish is universally used. The larger core diameter and LED/VCSEL sources are less sensitive to reflections than singlemode laser systems. Most multimode connectors use <strong>beige or black</strong> colour coding rather than blue.
            </p>
          </div>
        </section>

        {/* Section 3: APC - Angled Physical Contact */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">03</span>
            <h2 className="text-2xl font-bold">APC - Angled Physical Contact</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              <strong>APC (Angled Physical Contact)</strong> connectors feature an 8-degree angled ferrule end face. This angle directs any reflected light into the cladding rather than back down the core, achieving return loss values of <strong>-65 dB or better</strong>—approximately 100 times less reflection than UPC.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">APC Specifications</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">End Face Angle</p>
                  <p className="font-medium">8 degrees</p>
                </div>
                <div>
                  <p className="text-white/60">Return Loss</p>
                  <p className="font-medium">≥65 dB typical</p>
                </div>
                <div>
                  <p className="text-white/60">Insertion Loss</p>
                  <p className="font-medium">≤0.30 dB typical</p>
                </div>
                <div>
                  <p className="text-white/60">Colour Code</p>
                  <p className="font-medium">Green (universal)</p>
                </div>
                <div>
                  <p className="text-white/60">Fibre Type</p>
                  <p className="font-medium">Singlemode only</p>
                </div>
                <div>
                  <p className="text-white/60">Primary Applications</p>
                  <p className="font-medium">CATV, RF, analogue</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Why the 8-Degree Angle?
              </h4>
              <p className="text-sm">
                When light reflects from an angled surface, it follows the law of reflection at an angle equal to the incident angle. At 8 degrees, reflected light exits the core at 16 degrees (double the surface angle)—sufficient to exceed the fibre's numerical aperture and escape into the cladding rather than propagating back to the source.
              </p>
            </div>

            <p>
              APC is essential for <strong>analogue signal transmission</strong> where back-reflections cause interference patterns (composite second-order and triple-beat distortion). CATV distribution, RF-over-fibre, and precision measurement applications require APC's superior reflection control.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">When to Use APC</h4>
                <ul className="text-sm space-y-1">
                  <li>• CATV / video distribution</li>
                  <li>• RF-over-fibre systems</li>
                  <li>• DWDM networks (some)</li>
                  <li>• Instrumentation / sensing</li>
                  <li>• High-power laser systems</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
                <h4 className="font-semibold text-amber-400 mb-2">APC Considerations</h4>
                <ul className="text-sm space-y-1">
                  <li>• Higher cost (~20% more)</li>
                  <li>• Slightly higher IL</li>
                  <li>• Not compatible with UPC</li>
                  <li>• Requires angle-specific tooling</li>
                  <li>• Singlemode only</li>
                </ul>
              </div>
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

        {/* Section 4: Colour Coding and Identification */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">04</span>
            <h2 className="text-2xl font-bold">Colour Coding and Identification</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Consistent <strong>colour coding</strong> prevents accidental mismatch between incompatible polish grades. While not a formal standard, industry convention has established clear visual identification that is followed by most manufacturers.
            </p>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Standard Colour Conventions</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500 flex-shrink-0"></div>
                  <div>
                    <h5 className="font-semibold text-white">Blue - UPC Singlemode</h5>
                    <p className="text-sm text-white/70">Standard for singlemode UPC connectors and adaptors</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500 flex-shrink-0"></div>
                  <div>
                    <h5 className="font-semibold text-white">Green - APC</h5>
                    <p className="text-sm text-white/70">Universal identifier for APC polish (always singlemode)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-200 flex-shrink-0"></div>
                  <div>
                    <h5 className="font-semibold text-white">Beige/Cream - Multimode</h5>
                    <p className="text-sm text-white/70">Standard multimode (OM1-OM5) - always UPC/PC polish</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-400 flex-shrink-0"></div>
                  <div>
                    <h5 className="font-semibold text-white">Aqua - OM3/OM4/OM5</h5>
                    <p className="text-sm text-white/70">Laser-optimised multimode - always UPC/PC polish</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Identification Cautions
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Colour may be on housing, boot, or both—check carefully</li>
                <li>• Some manufacturers use different colours—verify markings</li>
                <li>• Adaptors should match connector polish grade colour</li>
                <li>• When in doubt, inspect the ferrule angle under magnification</li>
              </ul>
            </div>

            <p>
              Beyond colour, look for <strong>text markings</strong> on the connector body. Many connectors are marked "APC", "UPC", or "PC". The adaptor sleeve should also indicate polish grade. Using a blue UPC adaptor with green APC connectors is as damaging as mixing the connectors directly.
            </p>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Visual Inspection Technique
              </h4>
              <p className="text-sm">
                Under a fibre microscope, APC and UPC appear distinctly different. UPC shows a <strong>circular reflection pattern</strong> centred on the core. APC shows an <strong>oval or elliptical pattern</strong> due to the angled surface. If you see an oval pattern in what should be a UPC connector, stop—it may be APC mislabelled or installed in the wrong adaptor.
              </p>
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

        {/* Section 5: Compatibility and Damage Prevention */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">05</span>
            <h2 className="text-2xl font-bold">Compatibility and Damage Prevention</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              The most critical rule of polish grades: <strong>APC and UPC are not interchangeable</strong>. Attempting to mate an APC connector with a UPC adaptor (or vice versa) causes immediate damage to both ferrule end faces and creates an unusable connection.
            </p>

            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                CRITICAL: What Happens When APC Meets UPC
              </h4>
              <div className="space-y-2 text-sm">
                <p>When an 8-degree APC ferrule is forced against a flat UPC ferrule:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Only partial edge contact occurs—massive air gap at core</li>
                  <li>• Insertion loss jumps to 3-10 dB (virtually no signal passes)</li>
                  <li>• Contact pressure chips and cracks both ferrule surfaces</li>
                  <li>• Both connectors are permanently damaged</li>
                  <li>• Contamination from damaged material affects other ports</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Compatibility Matrix</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 pr-4">Connector</th>
                      <th className="text-left py-2 pr-4">UPC Adaptor</th>
                      <th className="text-left py-2">APC Adaptor</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4 font-medium">UPC Connector</td>
                      <td className="py-2 pr-4 text-green-400">✓ Compatible</td>
                      <td className="py-2 text-red-400">✗ DAMAGE</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4 font-medium">APC Connector</td>
                      <td className="py-2 pr-4 text-red-400">✗ DAMAGE</td>
                      <td className="py-2 text-green-400">✓ Compatible</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">PC Connector</td>
                      <td className="py-2 pr-4 text-green-400">✓ Compatible</td>
                      <td className="py-2 text-red-400">✗ DAMAGE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Prevention Best Practices
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Standardise on one polish grade per system where possible</li>
                <li>• Label patch panels and cables clearly with polish grade</li>
                <li>• Train all personnel on colour coding significance</li>
                <li>• Verify before connecting—colour and marking check</li>
                <li>• Use adaptor panels with consistent polish grades</li>
                <li>• Store APC and UPC patch leads separately</li>
              </ul>
            </div>

            <p>
              If you encounter a mixed installation (APC equipment connecting to UPC infrastructure), use <strong>hybrid patch leads</strong> factory-made with APC on one end and UPC on the other. These provide proper transitions at each interface without attempting incompatible matings.
            </p>
          </div>
        </section>

        {/* Section 6: Selection Criteria */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">06</span>
            <h2 className="text-2xl font-bold">Selection Criteria</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Selecting the appropriate polish grade depends on the application's <strong>sensitivity to reflections</strong>, <strong>equipment specifications</strong>, and <strong>existing infrastructure</strong>. Use these guidelines to make appropriate selections.
            </p>

            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-blue-400 mb-3">Use UPC When:</h4>
              <ul className="text-sm space-y-1">
                <li>• Application is digital data transmission (Ethernet, Fibre Channel)</li>
                <li>• Equipment specifications allow ≥-50 dB return loss</li>
                <li>• Existing infrastructure uses UPC throughout</li>
                <li>• Cost is a significant factor</li>
                <li>• Field termination simplicity is required</li>
                <li>• Multimode fibre is used (UPC is the only practical option)</li>
              </ul>
            </div>

            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-3">Use APC When:</h4>
              <ul className="text-sm space-y-1">
                <li>• Application transmits analogue signals (CATV, RF)</li>
                <li>• Equipment specifications require ≥-60 dB return loss</li>
                <li>• DWDM or wavelength-sensitive transmission</li>
                <li>• High-power laser systems where reflections damage sources</li>
                <li>• Precision measurement or sensing applications</li>
                <li>• Existing CATV/video infrastructure uses APC</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-elec-yellow mb-3">Decision Flowchart</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">1.</span>
                  <span>Is the fibre multimode? → Use UPC (or PC)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">2.</span>
                  <span>Is the signal analogue (RF, video, CATV)? → Use APC</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">3.</span>
                  <span>Does equipment specify ≥-60 dB return loss? → Use APC</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">4.</span>
                  <span>Is existing infrastructure APC? → Match with APC</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-elec-yellow">5.</span>
                  <span>None of the above? → Use UPC (standard digital singlemode)</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/30">
              <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Standardisation Tip
              </h4>
              <p className="text-sm">
                For new builds, consider standardising entirely on <strong>UPC for data/enterprise</strong> or <strong>APC for CATV/broadcast</strong>. Mixed environments create ongoing risk of accidental damage. If you must interface between systems, designate specific patch panel positions for hybrid cables and label clearly.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <RefreshCcw className="h-5 w-5 text-elec-yellow" />
            Practical Guidance
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Installation Best Practices</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Verify polish grade of all components before installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Use colour-matched adaptors (blue for UPC, green for APC)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Document polish grades in as-built records</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Test return loss to verify polish grade performance</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Maintenance Considerations</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Inspect end faces before each mating—contamination degrades return loss</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Clean with appropriate grade-specific procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Track return loss measurements over time—degradation indicates damage</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Common Mistakes to Avoid</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Assuming all singlemode connectors are compatible</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Ignoring adaptor polish grade when troubleshooting</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Using APC connectors for multimode (doesn't exist—they'd be wasting money)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Forcing connections that feel "tight"—could indicate mismatch</span>
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
            <Sparkles className="h-5 w-5 text-elec-yellow" />
            Quick Reference: Polish Grades
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Specifications</h4>
              <div className="space-y-1 text-white/80">
                <p><strong>PC:</strong> ~-30dB RL, curved face</p>
                <p><strong>UPC:</strong> ≥-50dB RL, extended polish</p>
                <p><strong>APC:</strong> ≥-65dB RL, 8° angle</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Colour Codes</h4>
              <div className="space-y-1 text-white/80">
                <p><strong>Blue:</strong> UPC singlemode</p>
                <p><strong>Green:</strong> APC (always SM)</p>
                <p><strong>Beige/Aqua:</strong> Multimode (PC/UPC)</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-elec-yellow/30 text-sm text-white/80">
            <p className="font-semibold text-white">Golden Rule:</p>
            <p>APC ↔ APC only • UPC ↔ UPC only • Never mix!</p>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="bg-white/5 rounded-xl p-6 border border-white/10">
          <Quiz
            title="Polish Grades Quiz"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/fibre-optics/module-2/section-3"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors touch-manipulation min-h-[44px] active:scale-[0.98]"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Previous: Connector Types</span>
          </Link>
          <Link
            to="/study-centre/apprentice/fibre-optics/module-2/section-5"
            className="flex items-center gap-2 text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation min-h-[44px] sm:flex-row-reverse active:scale-[0.98]"
          >
            <span>Next: Patch Panels</span>
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default FiberOpticsModule2Section4;