import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Scene Setting - HNC Module 7 Section 4.4";
const DESCRIPTION = "Master scene setting for lighting installations: scene controllers, preset configurations, tunable white CCT adjustment, colour changing RGB/RGBW systems, circadian lighting, and WELL Building Standard requirements.";

const quickCheckQuestions = [
  {
    id: "scene-controller-definition",
    question: "What is the primary function of a scene controller in a lighting system?",
    options: ["To provide emergency lighting", "To store and recall preset lighting configurations", "To measure energy consumption", "To replace individual light switches"],
    correctIndex: 1,
    explanation: "A scene controller stores multiple preset lighting configurations (scenes) and allows users to recall them with a single button press, coordinating multiple luminaires, dimming levels, and colour settings simultaneously."
  },
  {
    id: "tunable-white-purpose",
    question: "What does tunable white lighting allow users to adjust?",
    options: ["Only the brightness level", "The correlated colour temperature (CCT) from warm to cool white", "The RGB colour output", "The emergency lighting duration"],
    correctIndex: 1,
    explanation: "Tunable white (also called tuneable white or CCT adjustable) allows adjustment of correlated colour temperature, typically ranging from warm white (2700K) to cool white (6500K), whilst maintaining white light output."
  },
  {
    id: "circadian-lighting-aim",
    question: "What is the primary aim of circadian lighting design?",
    options: ["To reduce energy consumption", "To align artificial lighting with natural daylight patterns to support human biological rhythms", "To provide maximum illumination at all times", "To eliminate the need for daylight"],
    correctIndex: 1,
    explanation: "Circadian (human-centric) lighting aims to support the body's natural circadian rhythm by varying colour temperature and intensity throughout the day, mimicking natural daylight patterns to improve wellbeing, alertness, and sleep quality."
  },
  {
    id: "well-standard-lighting",
    question: "What aspect of lighting does the WELL Building Standard primarily address?",
    options: ["Energy efficiency ratings", "Human health and wellbeing through lighting design", "Emergency lighting requirements", "Cable sizing calculations"],
    correctIndex: 1,
    explanation: "The WELL Building Standard focuses on human health and wellbeing, with lighting requirements addressing circadian lighting design, visual comfort, glare control, and melanopic equivalent daylight illuminance (EML) to support occupant health."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A scene controller configured for a boardroom typically includes which preset scenes?",
    options: [
      "Emergency only, standby, and maintenance",
      "Presentation, meeting, video conference, and all off",
      "Maximum brightness at all times",
      "Single dimming level for all occasions"
    ],
    correctAnswer: 1,
    explanation: "Boardroom scene controllers typically include presets for presentations (low ambient, screen focus), general meetings (balanced lighting), video conferencing (face illumination, reduced glare), and all off for AV presentations."
  },
  {
    id: 2,
    question: "What CCT range is typically provided by tunable white luminaires?",
    options: ["1000K to 2000K", "2700K to 6500K", "8000K to 10000K", "Fixed at 4000K"],
    correctAnswer: 1,
    explanation: "Tunable white luminaires typically offer CCT adjustment from 2700K (warm white) to 6500K (cool daylight), covering the range most useful for architectural and human-centric lighting applications."
  },
  {
    id: 3,
    question: "RGB colour changing systems use which primary colours to create mixed colours?",
    options: ["Cyan, Magenta, Yellow", "Red, Green, Blue", "Red, Yellow, Blue", "White, Black, Grey"],
    correctAnswer: 1,
    explanation: "RGB systems use additive colour mixing with Red, Green, and Blue LEDs. By varying the intensity of each colour channel, a wide gamut of colours can be produced through additive colour mixing."
  },
  {
    id: 4,
    question: "What advantage does RGBW have over standard RGB?",
    options: [
      "Lower cost",
      "Better quality white light and improved colour rendering",
      "Fewer control channels required",
      "Higher energy consumption"
    ],
    correctAnswer: 1,
    explanation: "RGBW adds a dedicated White LED channel, producing cleaner, more efficient white light with better colour rendering compared to mixing RGB to create white. This is particularly important for spaces requiring both saturated colours and high-quality white light."
  },
  {
    id: 5,
    question: "What is melanopic equivalent daylight illuminance (EML)?",
    options: [
      "A measure of energy consumption",
      "A metric quantifying the biological effectiveness of light on circadian rhythms",
      "The colour rendering index of a light source",
      "The total lumen output of a luminaire"
    ],
    correctAnswer: 1,
    explanation: "Melanopic Equivalent Daylight Illuminance (EML, now called Melanopic EDI) measures how effectively light stimulates the melanopsin-containing cells in the eye that regulate circadian rhythms, expressed as an equivalent amount of daylight."
  },
  {
    id: 6,
    question: "For circadian lighting, what CCT should generally be used in the morning and midday?",
    options: [
      "Warm white (2700K) to promote relaxation",
      "Cool white (5000K-6500K) to promote alertness",
      "Amber (1800K) to simulate sunset",
      "The same CCT throughout the day"
    ],
    correctAnswer: 1,
    explanation: "Morning and midday periods benefit from cool white (5000K-6500K) rich in blue wavelengths to suppress melatonin, increase alertness, and synchronise the circadian rhythm with daytime activity patterns."
  },
  {
    id: 7,
    question: "What is the WELL Building Standard's minimum melanopic EML requirement for workspaces during daytime?",
    options: [
      "50 equivalent lux",
      "150 equivalent lux at the eye",
      "200 equivalent lux",
      "500 equivalent lux"
    ],
    correctAnswer: 1,
    explanation: "The WELL Building Standard requires a minimum of 150 melanopic equivalent lux (now melanopic EDI) measured vertically at eye level for at least 4 hours per day in regularly occupied spaces to support circadian health."
  },
  {
    id: 8,
    question: "In a DALI-2 system, how are scene presets typically stored?",
    options: [
      "In the scene controller only",
      "In each individual DALI driver/ballast",
      "On a central server",
      "In the building management system"
    ],
    correctAnswer: 1,
    explanation: "DALI-2 systems store scene presets in each individual driver/ballast. Scene commands broadcast to a group cause each device to recall its stored value for that scene, enabling fast response without individual commands to each device."
  },
  {
    id: 9,
    question: "What protocol is commonly used for professional architectural colour changing installations?",
    options: ["Simple on/off switching", "DMX512", "Standard dimming only", "Bluetooth only"],
    correctAnswer: 1,
    explanation: "DMX512 is the industry standard for professional colour changing and architectural lighting, providing 512 channels of control per universe. It enables precise control of RGB/RGBW luminaires, moving lights, and complex lighting effects."
  },
  {
    id: 10,
    question: "Which wavelength of light has the greatest impact on circadian rhythm regulation?",
    options: [
      "Red light (630-700nm)",
      "Blue light (460-490nm)",
      "Green light (520-560nm)",
      "Infrared light (&gt;700nm)"
    ],
    correctAnswer: 1,
    explanation: "Blue light wavelengths (particularly around 480nm) have the strongest effect on melanopsin-containing intrinsically photosensitive retinal ganglion cells (ipRGCs), which regulate circadian rhythms and melatonin suppression."
  },
  {
    id: 11,
    question: "A restaurant scene controller might include which specific scenes?",
    options: [
      "Manufacturing, warehouse, and loading",
      "Lunch service, dinner service, cleaning, and closed",
      "Emergency only",
      "Maximum brightness only"
    ],
    correctAnswer: 1,
    explanation: "Restaurant scene controllers typically include: lunch service (brighter, cooler), dinner service (dimmer, warmer for ambience), cleaning (full brightness for hygiene inspection), and closed (security lighting only)."
  },
  {
    id: 12,
    question: "What is the purpose of the 'fade time' parameter in scene recall?",
    options: [
      "To specify how long the scene remains active",
      "To control the transition speed between current and new lighting states",
      "To set the emergency lighting duration",
      "To define the daylight harvesting response"
    ],
    correctAnswer: 1,
    explanation: "Fade time controls how gradually the lighting transitions from the current state to the recalled scene. Slow fades (several seconds) create smooth, unobtrusive transitions; instant changes (0s fade) are used for presentations or alerts."
  }
];

const faqs = [
  {
    question: "What is the difference between tunable white and colour changing?",
    answer: "Tunable white adjusts colour temperature along the white light spectrum only (warm to cool white, typically 2700K-6500K), maintaining white light output. Colour changing (RGB/RGBW) can produce saturated colours across the visible spectrum including reds, greens, blues, and mixed hues. Tunable white is used for human-centric and architectural applications; colour changing is for decorative, entertainment, or branding applications."
  },
  {
    question: "How many control channels does RGB vs RGBW require?",
    answer: "RGB requires 3 control channels (one each for Red, Green, Blue intensity). RGBW requires 4 channels (adding White). Some advanced systems use RGBA (Amber) or RGBWW (Warm White + Cool White) requiring 5 channels. Tunable white typically needs 2 channels (intensity + CCT, or warm + cool white levels). Each channel requires addressing in the control protocol (DALI DT8, DMX, etc.)."
  },
  {
    question: "Can existing DALI systems support tunable white and colour changing?",
    answer: "Standard DALI (IEC 62386-102) only supports single-channel dimming. DALI-2 Device Type 8 (DT8) extends support for colour control including tunable white (Tc), RGB, RGBW, and XY colour coordinates. Existing DALI-1 systems may require gateway upgrades or replacement of control gear with DT8-compliant devices to support colour control."
  },
  {
    question: "What evidence supports circadian lighting benefits?",
    answer: "Research shows circadian-aligned lighting can improve sleep quality (faster onset, longer duration), increase daytime alertness and cognitive performance, reduce symptoms of seasonal affective disorder, and improve patient outcomes in healthcare settings. The WELL Building Standard and EN 12464-1:2021 now include circadian considerations based on this evidence base."
  },
  {
    question: "How do I commission scene presets?",
    answer: "Scene commissioning involves: (1) programming each luminaire's output for each scene (level, CCT, colour), (2) storing these values in drivers/controllers, (3) assigning scenes to control interfaces, (4) setting fade times and priorities, and (5) documenting all settings. Modern systems use commissioning software to program multiple scenes efficiently. Always provide scene schedules in O&M documentation."
  },
  {
    question: "What is the WELL Building Standard and how does it affect lighting design?",
    answer: "WELL is a building certification focusing on occupant health and wellbeing. For lighting, it requires: minimum melanopic EDI levels (150+ equivalent lux at the eye), circadian lighting design with appropriate CCT variation, glare control (UGR limits), surface brightness ratios, and options for occupant control. WELL certification is increasingly specified for premium commercial developments."
  }
];

const HNCModule7Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Scene Setting
          </h1>
          <p className="text-white/80">
            Scene controllers, preset configurations, tunable white, colour changing, and circadian lighting for human-centric design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Scene controllers:</strong> Store and recall preset lighting configurations</li>
              <li className="pl-1"><strong>Tunable white:</strong> CCT adjustment from 2700K to 6500K</li>
              <li className="pl-1"><strong>RGB/RGBW:</strong> Colour changing via additive colour mixing</li>
              <li className="pl-1"><strong>Circadian:</strong> Light aligned with biological rhythms</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>WELL Standard:</strong> 150+ melanopic EDI at eye level</li>
              <li className="pl-1"><strong>DALI DT8:</strong> Protocol for colour control</li>
              <li className="pl-1"><strong>DMX512:</strong> Professional colour changing standard</li>
              <li className="pl-1"><strong>Human-centric:</strong> Supporting occupant wellbeing</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Design and configure scene controllers for various applications",
              "Specify tunable white systems for CCT adjustment",
              "Understand RGB and RGBW colour changing principles",
              "Apply circadian lighting design for human-centric installations",
              "Meet WELL Building Standard lighting requirements",
              "Commission and document scene-based lighting systems"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Scene Controllers and Presets */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Scene Controllers and Preset Configurations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Scene controllers are the user interface for recalling pre-programmed lighting configurations.
              Each scene stores multiple parameters—dimming levels, colour temperatures, and colour values—for
              groups of luminaires, allowing complex lighting changes with a single button press.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key scene controller components:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Scene buttons:</strong> Dedicated buttons for each preset (typically 4-8 scenes per plate)</li>
                <li className="pl-1"><strong>Raise/lower controls:</strong> Manual override for brightness adjustment</li>
                <li className="pl-1"><strong>Scene memory:</strong> Stored values in drivers (DALI) or central controller</li>
                <li className="pl-1"><strong>Fade time settings:</strong> Transition speed from current to recalled state</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Scene Configurations by Space Type</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Space</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Scene 1</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Scene 2</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Scene 3</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Scene 4</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Boardroom</td>
                      <td className="border border-white/10 px-3 py-2">Meeting (80%)</td>
                      <td className="border border-white/10 px-3 py-2">Presentation (30%)</td>
                      <td className="border border-white/10 px-3 py-2">Video call (60%)</td>
                      <td className="border border-white/10 px-3 py-2">All off</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Restaurant</td>
                      <td className="border border-white/10 px-3 py-2">Lunch (70%, 4000K)</td>
                      <td className="border border-white/10 px-3 py-2">Dinner (40%, 2700K)</td>
                      <td className="border border-white/10 px-3 py-2">Cleaning (100%)</td>
                      <td className="border border-white/10 px-3 py-2">Closed (5%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail</td>
                      <td className="border border-white/10 px-3 py-2">Trading (100%)</td>
                      <td className="border border-white/10 px-3 py-2">Evening (80%)</td>
                      <td className="border border-white/10 px-3 py-2">Closed (security)</td>
                      <td className="border border-white/10 px-3 py-2">Restock (100%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Healthcare ward</td>
                      <td className="border border-white/10 px-3 py-2">Day (5000K)</td>
                      <td className="border border-white/10 px-3 py-2">Evening (3000K)</td>
                      <td className="border border-white/10 px-3 py-2">Night (dim amber)</td>
                      <td className="border border-white/10 px-3 py-2">Examination</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">DALI Scene Commands</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Recall scene 1:</span> <span className="text-white">GOTO SCENE 0 (broadcast to group)</span></p>
                <p><span className="text-white/60">Store current as scene 2:</span> <span className="text-white">STORE DTR AS SCENE 1</span></p>
                <p><span className="text-white/60">Scene storage:</span> <span className="text-white">16 scenes per DALI group (0-15)</span></p>
                <p><span className="text-white/60">Fade time:</span> <span className="text-white">Configurable 0-90 seconds</span></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Scene names should be intuitive for end users—avoid technical labels like "Scene 3" in favour of descriptive names like "Presentation Mode."
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Tunable White Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Tunable White (CCT Adjustment)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Tunable white luminaires contain LEDs of different colour temperatures—typically warm white
              and cool white—allowing the correlated colour temperature (CCT) to be adjusted whilst
              maintaining consistent light output and colour quality.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Warm White</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">2700K - 3000K range</li>
                  <li className="pl-1">Relaxing, comfortable ambience</li>
                  <li className="pl-1">Hospitality, residential</li>
                  <li className="pl-1">Evening/wind-down periods</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Neutral White</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">4000K typical</li>
                  <li className="pl-1">Balanced, natural appearance</li>
                  <li className="pl-1">Offices, retail, education</li>
                  <li className="pl-1">General working conditions</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cool White</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">5000K - 6500K range</li>
                  <li className="pl-1">Alertness, concentration</li>
                  <li className="pl-1">Healthcare, laboratories</li>
                  <li className="pl-1">Morning/daytime periods</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tunable White Control Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Protocol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Control Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DALI DT8 (Tc)</td>
                      <td className="border border-white/10 px-3 py-2">Single address, CCT + level commands</td>
                      <td className="border border-white/10 px-3 py-2">Commercial, healthcare installations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dual channel (0-10V)</td>
                      <td className="border border-white/10 px-3 py-2">Separate warm/cool white channels</td>
                      <td className="border border-white/10 px-3 py-2">Retrofit, simple installations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DMX</td>
                      <td className="border border-white/10 px-3 py-2">Multiple channels per luminaire</td>
                      <td className="border border-white/10 px-3 py-2">Entertainment, architectural</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wireless (Bluetooth/Zigbee)</td>
                      <td className="border border-white/10 px-3 py-2">App or gateway control</td>
                      <td className="border border-white/10 px-3 py-2">Residential, small commercial</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tunable White Specification Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>CCT range:</strong> Ensure range covers application needs (wider range = more flexibility)</li>
                <li className="pl-1"><strong>Colour consistency:</strong> Specify MacAdam ellipse (3-step or better) across CCT range</li>
                <li className="pl-1"><strong>Dimming performance:</strong> Check minimum dim level maintains CCT accuracy</li>
                <li className="pl-1"><strong>CRI consistency:</strong> Verify CRI &gt;80 (preferably &gt;90) across full CCT range</li>
                <li className="pl-1"><strong>Efficacy variation:</strong> Note that efficacy typically drops at extreme CCT values</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> When specifying tunable white, ensure the control system supports smooth CCT transitions to avoid visible colour stepping during adjustments.
            </p>
          </div>
        </section>

        {/* Section 3: Colour Changing Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Colour Changing Systems (RGB/RGBW)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Colour changing systems use multiple LED colours—typically Red, Green, and Blue (RGB)—to
              create a wide gamut of colours through additive mixing. RGBW systems add a dedicated White
              channel for improved white light quality and efficiency.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Additive Colour Mixing Principles</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Red + Green =</span> <span className="text-yellow-400">Yellow</span></p>
                <p><span className="text-white/60">Red + Blue =</span> <span className="text-purple-400">Magenta</span></p>
                <p><span className="text-white/60">Green + Blue =</span> <span className="text-cyan-400">Cyan</span></p>
                <p><span className="text-white/60">Red + Green + Blue =</span> <span className="text-white">White (approximate)</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RGB vs RGBW Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">RGB</th>
                      <th className="border border-white/10 px-3 py-2 text-left">RGBW</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control channels</td>
                      <td className="border border-white/10 px-3 py-2">3 (R, G, B)</td>
                      <td className="border border-white/10 px-3 py-2">4 (R, G, B, W)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">White light quality</td>
                      <td className="border border-white/10 px-3 py-2">Poor CRI, pinkish tint</td>
                      <td className="border border-white/10 px-3 py-2">Good CRI, clean white</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Efficiency at white</td>
                      <td className="border border-white/10 px-3 py-2">Lower (all LEDs running)</td>
                      <td className="border border-white/10 px-3 py-2">Higher (dedicated white LED)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pastel colours</td>
                      <td className="border border-white/10 px-3 py-2">Limited quality</td>
                      <td className="border border-white/10 px-3 py-2">Better with white mixing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost</td>
                      <td className="border border-white/10 px-3 py-2">Lower</td>
                      <td className="border border-white/10 px-3 py-2">Higher</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Application</td>
                      <td className="border border-white/10 px-3 py-2">Saturated colour effects</td>
                      <td className="border border-white/10 px-3 py-2">Architectural, hospitality</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DMX512 for Colour Changing</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Universe:</strong> 512 channels per DMX universe</li>
                <li className="pl-1"><strong>Addressing:</strong> Each luminaire occupies 3 (RGB) or 4+ (RGBW) consecutive channels</li>
                <li className="pl-1"><strong>Data rate:</strong> Up to 44 refreshes per second</li>
                <li className="pl-1"><strong>Topology:</strong> Daisy-chain with termination resistor at end</li>
                <li className="pl-1"><strong>Cable:</strong> Screened twisted pair, maximum 300m per run</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-2">Colour Changing Applications</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>- Facade and architectural lighting</li>
                  <li>- Retail brand colour implementation</li>
                  <li>- Entertainment and event venues</li>
                  <li>- Feature walls and cove lighting</li>
                  <li>- Wayfinding and zoning</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-2">Control Options</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>- DMX controllers with show playback</li>
                  <li>- DALI DT8 colour control</li>
                  <li>- Standalone pixel controllers</li>
                  <li>- BMS integration via gateways</li>
                  <li>- Astronomical time clock triggers</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Installation note:</strong> RGB/RGBW installations require careful attention to colour consistency between luminaires. Specify binning requirements and consider calibration during commissioning.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Circadian and Human-Centric Lighting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Circadian and Human-Centric Lighting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Circadian lighting (also called human-centric lighting or HCL) designs artificial lighting
              to support the body's natural 24-hour biological rhythm. By varying colour temperature and
              intensity throughout the day, circadian lighting aims to improve alertness, mood, and sleep quality.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Circadian Rhythm and Light</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Time Period</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recommended CCT</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Intensity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Biological Effect</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Morning (6am-9am)</td>
                      <td className="border border-white/10 px-3 py-2">5000K-6500K (cool)</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">Suppress melatonin, increase alertness</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Midday (9am-3pm)</td>
                      <td className="border border-white/10 px-3 py-2">4000K-5000K</td>
                      <td className="border border-white/10 px-3 py-2">Moderate-high</td>
                      <td className="border border-white/10 px-3 py-2">Maintain alertness, support concentration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Afternoon (3pm-6pm)</td>
                      <td className="border border-white/10 px-3 py-2">3500K-4000K</td>
                      <td className="border border-white/10 px-3 py-2">Moderate</td>
                      <td className="border border-white/10 px-3 py-2">Gradual transition, reduce stimulation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Evening (6pm onwards)</td>
                      <td className="border border-white/10 px-3 py-2">2700K-3000K (warm)</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                      <td className="border border-white/10 px-3 py-2">Allow melatonin production, prepare for sleep</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Melanopic Metrics Explained</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Melanopic lux (EML/EDI):</strong> Measures biological effectiveness of light for circadian regulation</li>
                <li className="pl-1"><strong>ipRGCs:</strong> Intrinsically photosensitive retinal ganglion cells containing melanopsin</li>
                <li className="pl-1"><strong>Peak sensitivity:</strong> ~480nm (blue light wavelengths)</li>
                <li className="pl-1"><strong>Measurement:</strong> Vertical illuminance at eye level, not horizontal task illuminance</li>
                <li className="pl-1"><strong>WELL requirement:</strong> Minimum 150 melanopic EDI for at least 4 hours daily</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">WELL Building Standard - Lighting Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">L01 Light Exposure</td>
                      <td className="border border-white/10 px-3 py-2">&gt;150 melanopic EDI at eye</td>
                      <td className="border border-white/10 px-3 py-2">Circadian entrainment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">L02 Visual Lighting Design</td>
                      <td className="border border-white/10 px-3 py-2">Appropriate task illuminance</td>
                      <td className="border border-white/10 px-3 py-2">Visual comfort and performance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">L03 Circadian Lighting Design</td>
                      <td className="border border-white/10 px-3 py-2">&gt;200 melanopic EDI option</td>
                      <td className="border border-white/10 px-3 py-2">Enhanced circadian support</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">L04 Glare Control</td>
                      <td className="border border-white/10 px-3 py-2">UGR limits per task</td>
                      <td className="border border-white/10 px-3 py-2">Visual comfort</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">L06 Visual Balance</td>
                      <td className="border border-white/10 px-3 py-2">Surface luminance ratios</td>
                      <td className="border border-white/10 px-3 py-2">Reduce eye strain</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">L07 Electric Light Quality</td>
                      <td className="border border-white/10 px-3 py-2">CRI &gt;80, R9 &gt;0</td>
                      <td className="border border-white/10 px-3 py-2">Colour rendering quality</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-2">Healthcare Applications</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>- Patient recovery rooms (sleep support)</li>
                  <li>- Dementia care units (orientation)</li>
                  <li>- Neonatal intensive care</li>
                  <li>- Staff areas (shift worker alertness)</li>
                  <li>- Mental health facilities</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-2">Workplace Applications</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>- Deep-plan offices (limited daylight)</li>
                  <li>- Control rooms (24-hour operation)</li>
                  <li>- Schools (student concentration)</li>
                  <li>- Care homes (elderly wellbeing)</li>
                  <li>- Prisons (inmate behaviour)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Implementation tip:</strong> Circadian lighting requires automatic scheduling via BMS or astronomical time clocks. Manual control alone is insufficient as occupants often do not adjust settings appropriately.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Boardroom Scene Schedule</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Configure 4 scenes for a 20-person boardroom with tunable white luminaires.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Scene configuration:</p>
                <p className="mt-2">Scene 1 - "Meeting" (default)</p>
                <p className="ml-4">General: 80%, 4000K | Downlights: 70% | Perimeter: 60%</p>
                <p className="ml-4">Fade time: 3 seconds</p>
                <p className="mt-2">Scene 2 - "Presentation"</p>
                <p className="ml-4">General: 20%, 3500K | Downlights: 30% | Perimeter: 10%</p>
                <p className="ml-4">AV screen area: OFF | Fade time: 5 seconds</p>
                <p className="mt-2">Scene 3 - "Video Conference"</p>
                <p className="ml-4">General: 60%, 4000K | Face lighting: 80% | Background: 50%</p>
                <p className="ml-4">No direct glare on screens | Fade time: 3 seconds</p>
                <p className="mt-2">Scene 4 - "All Off"</p>
                <p className="ml-4">All luminaires: OFF | Fade time: 5 seconds</p>
                <p className="mt-2 text-green-400">Controller: 4-button plate at each entrance + AV touch panel integration</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Circadian Schedule for Office</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design a circadian lighting schedule for an open-plan office.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Automatic time-based schedule (BMS controlled):</p>
                <p className="mt-2">07:00 - Morning boost</p>
                <p className="ml-4">CCT: 6000K | Level: 100% | Melanopic EDI: ~180 lux</p>
                <p className="mt-2">09:00 - Working day</p>
                <p className="ml-4">CCT: 5000K | Level: 85% | Melanopic EDI: ~160 lux</p>
                <p className="mt-2">14:00 - Afternoon</p>
                <p className="ml-4">CCT: 4000K | Level: 80% | Melanopic EDI: ~120 lux</p>
                <p className="mt-2">17:00 - Late afternoon</p>
                <p className="ml-4">CCT: 3500K | Level: 70% | Daylight dimming active</p>
                <p className="mt-2">19:00 - Evening (if occupied)</p>
                <p className="ml-4">CCT: 2700K | Level: 50% | Melanopic EDI: ~40 lux</p>
                <p className="mt-2 text-green-400">WELL compliance: Maintains &gt;150 melanopic EDI 07:00-14:00 (7 hours)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: RGBW Facade Specification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify colour changing linear luminaires for building facade.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Specification requirements:</p>
                <p className="mt-2">Luminaire: RGBW linear, IP66 rated</p>
                <p className="ml-4">Length: 1000mm modules</p>
                <p className="ml-4">Output: 1500lm/m (white), full colour gamut</p>
                <p className="ml-4">Colour consistency: 3-step MacAdam</p>
                <p className="mt-2">Control: DMX512 via weatherproof junction boxes</p>
                <p className="ml-4">Channels per luminaire: 4 (RGBW)</p>
                <p className="ml-4">DMX universe: 1 (covers 128 luminaires)</p>
                <p className="ml-4">Controller: Show playback with astronomical clock</p>
                <p className="mt-2">Scenes programmed:</p>
                <p className="ml-4">Corporate blue (brand colour): R0, G100, B180, W50</p>
                <p className="ml-4">Warm white (evening): R0, G0, B0, W255 @ 2700K</p>
                <p className="ml-4">Dynamic colour wash: 30-minute cycle</p>
                <p className="ml-4">Special events: Manual override from reception</p>
                <p className="mt-2 text-green-400">Cable: Screened Cat5e for DMX, 5-core for RGBW power</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Scene Setting Commissioning Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify all luminaires are correctly addressed and grouped</li>
                <li className="pl-1">Program each scene with client present for approval</li>
                <li className="pl-1">Set appropriate fade times (typically 2-5 seconds)</li>
                <li className="pl-1">Test scene recall from all control points</li>
                <li className="pl-1">Configure scene priorities and override behaviour</li>
                <li className="pl-1">Document all scene parameters in O&M manual</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Tunable white range: <strong>2700K to 6500K</strong> typical</li>
                <li className="pl-1">WELL melanopic EDI: <strong>&gt;150 equivalent lux</strong> at eye level</li>
                <li className="pl-1">DMX universe: <strong>512 channels</strong> maximum</li>
                <li className="pl-1">DALI scenes: <strong>16 scenes</strong> per group (0-15)</li>
                <li className="pl-1">Circadian peak alertness CCT: <strong>5000K-6500K</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insufficient scene variety</strong> - Provide enough presets for all anticipated uses</li>
                <li className="pl-1"><strong>Manual-only circadian control</strong> - Requires automatic scheduling for effectiveness</li>
                <li className="pl-1"><strong>Ignoring colour consistency</strong> - Specify LED binning requirements</li>
                <li className="pl-1"><strong>Poor labelling</strong> - Use descriptive scene names, not technical codes</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Scene Control Standards</p>
                <ul className="space-y-0.5">
                  <li>DALI-2 DT8 - Colour control protocol</li>
                  <li>DMX512 - Entertainment/architectural standard</li>
                  <li>16 scenes per DALI group</li>
                  <li>512 channels per DMX universe</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">WELL Lighting Requirements</p>
                <ul className="space-y-0.5">
                  <li>&gt;150 melanopic EDI at eye level</li>
                  <li>CRI &gt;80, R9 &gt;0</li>
                  <li>Glare control (UGR limits)</li>
                  <li>Circadian lighting design option</li>
                </ul>
              </div>
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

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section4-5">
              Next: Section 4.5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section4_4;
