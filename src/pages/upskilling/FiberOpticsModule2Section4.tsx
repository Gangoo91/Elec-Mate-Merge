import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Polish Grades (UPC, APC) - Fibre Optics Course";
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
    id: 1,
    question: "What does PC stand for in connector polish terminology?",
    options: ["Polished Connection", "Physical Contact", "Precision Core", "Permanent Coupling"],
    correctAnswer: 1,
    explanation: "PC stands for Physical Contact - the ferrule end faces make direct physical contact when mated."
  },
  {
    id: 2,
    question: "Standard PC polish typically achieves a return loss of:",
    options: ["-20 dB", "-30 to -35 dB", "-50 dB", "-65 dB"],
    correctAnswer: 1,
    explanation: "Standard PC polish achieves approximately -30 to -35 dB return loss."
  },
  {
    id: 3,
    question: "Why is APC polish superior for analogue signal transmission?",
    options: ["Lower insertion loss", "Fewer back-reflections cause less signal distortion", "Faster connection speed", "Lower cost"],
    correctAnswer: 1,
    explanation: "APC's extremely low back-reflections prevent interference patterns in analogue signals like CATV."
  },
  {
    id: 4,
    question: "Can you connect an APC connector to a UPC adaptor?",
    options: ["Yes, they are interchangeable", "No, it will damage the connector", "Only for multimode fibre", "Only at low power levels"],
    correctAnswer: 1,
    explanation: "APC and UPC are not interchangeable - forcing them together damages both ferrule end faces."
  },
  {
    id: 5,
    question: "The curved end face of a UPC connector is polished with radius of approximately:",
    options: ["5-10mm", "10-25mm", "50-100mm", "Completely flat"],
    correctAnswer: 1,
    explanation: "UPC ferrules have a domed end face with approximately 10-25mm radius curvature."
  },
  {
    id: 6,
    question: "Which polish grade is typically specified for CATV/RF-over-fibre applications?",
    options: ["PC", "SPC", "UPC", "APC"],
    correctAnswer: 3,
    explanation: "APC is required for CATV and RF-over-fibre due to its superior return loss performance."
  },
  {
    id: 7,
    question: "The 8-degree angle in APC connectors directs reflections:",
    options: ["Into the core for maximum power", "Into the cladding away from the core", "Back to the source", "Into adjacent fibres"],
    correctAnswer: 1,
    explanation: "The 8-degree angle causes reflections to exceed the fibre's numerical aperture and escape into the cladding."
  },
  {
    id: 8,
    question: "What insertion loss increase might be expected with APC vs UPC?",
    options: ["None - identical IL", "0.1-0.2 dB higher", "0.5 dB higher", "1.0 dB higher"],
    correctAnswer: 1,
    explanation: "APC connectors typically have slightly higher insertion loss (0.1-0.2 dB) than UPC due to the angled interface."
  },
  {
    id: 9,
    question: "Blue coloured connector housings typically indicate:",
    options: ["APC polish", "UPC polish", "Multimode fibre", "High-power rating"],
    correctAnswer: 1,
    explanation: "Blue is the standard colour code for UPC singlemode connectors."
  },
  {
    id: 10,
    question: "SPC (Super Physical Contact) polish achieves return loss of approximately:",
    options: ["-30 dB", "-40 dB", "-50 dB", "-65 dB"],
    correctAnswer: 1,
    explanation: "SPC achieves approximately -40 dB return loss, between PC and UPC performance."
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
    answer: "Look for markings on the connector body - 'APC' or 'PC/UPC' may be printed or engraved. Check documentation or labelling. Use a fibre microscope to examine the ferrule end face: APC shows an oval light pattern due to the angle, while UPC shows a circular pattern. When in doubt, use an inspection scope before connecting."
  },
  {
    question: "Do I need APC for 10 Gigabit Ethernet?",
    answer: "For standard 10GbE data transmission, UPC polish (-50 dB return loss) is typically adequate. APC is primarily needed for analogue applications (CATV, RF), wavelength-sensitive equipment (DWDM), or where specifications explicitly require greater than 55 dB return loss. Check your equipment specifications - most enterprise and data centre equipment works fine with UPC."
  },
  {
    question: "Can worn UPC connectors be re-polished to APC?",
    answer: "No - the fundamental geometry is different. APC requires removing material at an 8-degree angle, which would completely reshape the ferrule end. A UPC connector can be re-polished to restore UPC finish (common maintenance practice), but converting between polish types requires replacing the connector or using a new ferrule assembly."
  }
];

const FiberOpticsModule2Section4 = () => {
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
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centred Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Polish Grades (UPC, APC)
          </h1>
          <p className="text-white/80">
            Understanding connector end face finishing for optimal performance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>PC:</strong> Basic polish, -30dB return loss</li>
              <li><strong>UPC:</strong> Extended polish, -50dB, blue colour</li>
              <li><strong>APC:</strong> 8-degree angle, -65dB, green colour</li>
              <li><strong>Rule:</strong> Never mix APC with UPC</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Blue = UPC, Green = APC</li>
              <li><strong>Use:</strong> UPC for data, APC for CATV/analogue</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish PC, UPC, and APC polish grades",
              "Understand return loss specifications",
              "Identify polish grades by colour coding",
              "Select appropriate polish for applications",
              "Recognise compatibility requirements",
              "Avoid damaging polish grade mismatches"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Polish Grades
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fibre optic connector polish grade refers to the quality and geometry of the ferrule
              end face finish. This directly affects return loss (back-reflections) and insertion
              loss (signal attenuation). Proper polish selection is essential for system performance,
              particularly in singlemode applications.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Why Polish Matters</p>
              <p className="text-sm text-white">
                When light transitions between two fibre end faces, some reflects back toward the
                source. This Fresnel reflection causes approximately 4% power loss (about -14 dB
                return loss) at an unpolished air gap. Physical contact polishing eliminates the
                air gap and dramatically reduces reflections - critical for laser sources sensitive
                to back-reflected light.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Three Main Polish Grades:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li>
                  <strong className="text-elec-yellow">PC (Physical Contact):</strong> Original standard polish with curved end face.
                  Achieves -30 to -35 dB return loss. Suitable for basic applications.
                </li>
                <li>
                  <strong className="text-elec-yellow">UPC (Ultra Physical Contact):</strong> Extended polishing process for superior surface finish.
                  Achieves -50 dB or better return loss. Standard for data/telecom.
                </li>
                <li>
                  <strong className="text-elec-yellow">APC (Angled Physical Contact):</strong> 8-degree angled ferrule face directing reflections into cladding.
                  Achieves -65 dB or better return loss. Required for CATV/analogue.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            UPC - Ultra Physical Contact
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              UPC (Ultra Physical Contact) is the standard polish grade for most singlemode and
              multimode data communications applications. The ferrule end face is polished to a
              slight dome shape (typically 10-25mm radius) with an extended polishing process that
              achieves superior surface finish compared to basic PC.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">UPC Specifications</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>End face geometry:</strong> Domed, 10-25mm radius</li>
                <li><strong>Return loss:</strong> 50 dB or better typical</li>
                <li><strong>Insertion loss:</strong> 0.25 dB or better typical</li>
                <li><strong>Colour code:</strong> Blue (singlemode)</li>
                <li><strong>Applications:</strong> Data, telecom, enterprise networks</li>
              </ul>
            </div>

            <p>
              The domed end face ensures cores make contact first when connectors mate, eliminating
              air gaps at the critical light-carrying centre. Under a microscope, a properly polished
              UPC ferrule shows no visible scratches in the core zone.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical UPC Applications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Gigabit and 10G Ethernet</li>
                <li>Fibre Channel storage networks</li>
                <li>Passive optical networks (PON)</li>
                <li>Enterprise LAN infrastructure</li>
                <li>Data centre interconnects</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            APC - Angled Physical Contact
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              APC (Angled Physical Contact) connectors feature an 8-degree angled ferrule end face.
              This angle directs any reflected light into the cladding rather than back down the
              core, achieving return loss values of -65 dB or better - approximately 100 times less
              reflection than UPC.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">APC Specifications</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>End face angle:</strong> 8 degrees</li>
                <li><strong>Return loss:</strong> 65 dB or better typical</li>
                <li><strong>Insertion loss:</strong> 0.30 dB or better typical</li>
                <li><strong>Colour code:</strong> Green (universal)</li>
                <li><strong>Fibre type:</strong> Singlemode only</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Why the 8-Degree Angle?</p>
              <p className="text-sm text-white">
                When light reflects from an angled surface, it follows the law of reflection at an
                angle equal to the incident angle. At 8 degrees, reflected light exits the core at
                16 degrees (double the surface angle) - sufficient to exceed the fibre's numerical
                aperture and escape into the cladding rather than propagating back to the source.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When to Use APC:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>CATV / video distribution</li>
                <li>RF-over-fibre systems</li>
                <li>DWDM networks (some applications)</li>
                <li>Instrumentation and sensing</li>
                <li>High-power laser systems</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Colour Coding and Identification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Consistent colour coding prevents accidental mismatch between incompatible polish
              grades. While not a formal standard, industry convention has established clear visual
              identification that is followed by most manufacturers.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Standard Colour Conventions</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Blue:</strong> UPC singlemode - standard for data/telecom</li>
                <li><strong>Green:</strong> APC - always singlemode, CATV/analogue</li>
                <li><strong>Beige/Cream:</strong> Multimode (OM1-OM5) - always UPC/PC</li>
                <li><strong>Aqua:</strong> OM3/OM4/OM5 laser-optimised multimode</li>
              </ul>
            </div>

            <p>
              Colour may be on the connector housing, boot, or both - check carefully. Some
              manufacturers use different colours, so verify markings when in doubt. Adaptors should
              match connector polish grade colour - using a blue UPC adaptor with green APC connectors
              is as damaging as mixing the connectors directly.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Visual Inspection Technique</p>
              <p className="text-sm text-white">
                Under a fibre microscope, APC and UPC appear distinctly different. UPC shows a
                circular reflection pattern centred on the core. APC shows an oval or elliptical
                pattern due to the angled surface. If you see an oval pattern in what should be a
                UPC connector, stop - it may be APC mislabelled or in the wrong adaptor.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Compatibility and Damage Prevention
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The most critical rule of polish grades: APC and UPC are not interchangeable.
              Attempting to mate an APC connector with a UPC adaptor (or vice versa) causes
              immediate damage to both ferrule end faces and creates an unusable connection.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <p className="text-sm font-medium text-red-400 mb-2">CRITICAL: What Happens When APC Meets UPC</p>
              <ul className="text-sm text-white space-y-1">
                <li>Only partial edge contact occurs - massive air gap at core</li>
                <li>Insertion loss jumps to 3-10 dB (virtually no signal passes)</li>
                <li>Contact pressure chips and cracks both ferrule surfaces</li>
                <li>Both connectors are permanently damaged</li>
                <li>Contamination from damaged material affects other ports</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Compatibility Matrix:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>UPC connector + UPC adaptor:</strong> Compatible</li>
                <li><strong>APC connector + APC adaptor:</strong> Compatible</li>
                <li><strong>PC connector + UPC adaptor:</strong> Compatible</li>
                <li><strong>UPC connector + APC adaptor:</strong> DAMAGE - never connect</li>
                <li><strong>APC connector + UPC adaptor:</strong> DAMAGE - never connect</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Prevention Best Practices</p>
              <ul className="text-sm text-white space-y-1">
                <li>Standardise on one polish grade per system where possible</li>
                <li>Label patch panels and cables clearly with polish grade</li>
                <li>Train all personnel on colour coding significance</li>
                <li>Verify before connecting - colour and marking check</li>
                <li>Store APC and UPC patch leads separately</li>
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
                <li>Verify polish grade of all components before installation</li>
                <li>Use colour-matched adaptors (blue for UPC, green for APC)</li>
                <li>Document polish grades in as-built records</li>
                <li>Test return loss to verify polish grade performance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Selection Criteria</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Is it multimode?</strong> Use UPC (or PC)</li>
                <li><strong>Is the signal analogue (RF, video, CATV)?</strong> Use APC</li>
                <li><strong>Does equipment specify greater than 60 dB return loss?</strong> Use APC</li>
                <li><strong>Is existing infrastructure APC?</strong> Match with APC</li>
                <li><strong>None of the above?</strong> Use UPC (standard digital singlemode)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming all singlemode connectors are compatible</strong> - check polish grade</li>
                <li><strong>Ignoring adaptor polish grade</strong> - adaptors must match too</li>
                <li><strong>Using APC connectors for multimode</strong> - unnecessary, doesn't exist</li>
                <li><strong>Forcing tight connections</strong> - could indicate polish mismatch</li>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Polish Grades</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-elec-yellow mb-1">Specifications</p>
                <ul className="space-y-0.5">
                  <li>PC: -30 to -35 dB return loss</li>
                  <li>UPC: -50 dB or better</li>
                  <li>APC: -65 dB or better, 8-degree</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-1">Colour Codes</p>
                <ul className="space-y-0.5">
                  <li>Blue: UPC singlemode</li>
                  <li>Green: APC (always singlemode)</li>
                  <li>Beige/Aqua: Multimode (PC/UPC)</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white">
              <p className="font-medium text-elec-yellow">Golden Rule:</p>
              <p>APC to APC only | UPC to UPC only | Never mix!</p>
            </div>
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
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next: Patch Panels
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule2Section4;
