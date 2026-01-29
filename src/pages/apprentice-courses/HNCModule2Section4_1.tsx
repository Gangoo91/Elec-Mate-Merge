import { ArrowLeft, Lightbulb, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Light and Vision - HNC Module 2 Section 4.1";
const DESCRIPTION = "Understanding the electromagnetic spectrum, visual perception, colour temperature, CRI, and photopic/scotopic vision for building services lighting design.";

const quickCheckQuestions = [
  {
    id: "visible-spectrum",
    question: "What is the approximate wavelength range of visible light?",
    options: ["100-400nm", "380-780nm", "800-1200nm", "1000-2000nm"],
    correctIndex: 1,
    explanation: "Visible light occupies the 380-780nm wavelength range within the electromagnetic spectrum. Below 380nm is ultraviolet, above 780nm is infrared."
  },
  {
    id: "colour-temp-warm",
    question: "What colour temperature would you specify for a warm, relaxed atmosphere?",
    options: ["2700K", "4000K", "5000K", "6500K"],
    correctIndex: 0,
    explanation: "2700K provides warm white light with a yellowish appearance, ideal for relaxed environments like restaurants and lounges. Higher values produce cooler, bluer light."
  },
  {
    id: "cri-minimum",
    question: "What is the minimum CRI typically specified for general office lighting?",
    options: ["60", "70", "80", "90"],
    correctIndex: 2,
    explanation: "CRI 80 (Ra80) is the minimum recommended for most interior applications. Critical colour tasks like printing may require CRI 90+."
  },
  {
    id: "scotopic-vision",
    question: "Which type of vision predominates in low light levels below approximately 0.01 cd/m²?",
    options: ["Photopic vision", "Scotopic vision", "Mesopic vision", "Chromatic vision"],
    correctIndex: 1,
    explanation: "Scotopic vision uses rod cells and operates at very low light levels (below 0.01 cd/m²). It provides no colour perception and lower acuity than photopic vision."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is light?",
    options: [
      "A form of heat radiation only",
      "Electromagnetic radiation visible to the human eye",
      "A type of sound wave",
      "Ionising radiation from the sun"
    ],
    correctAnswer: 1,
    explanation: "Light is electromagnetic radiation within the visible spectrum (approximately 380-780nm) that can be detected by the human eye."
  },
  {
    id: 2,
    question: "Which part of the eye contains photoreceptor cells responsible for vision?",
    options: ["Cornea", "Lens", "Retina", "Iris"],
    correctAnswer: 2,
    explanation: "The retina at the back of the eye contains rods and cones - the photoreceptor cells that convert light into electrical signals sent to the brain."
  },
  {
    id: 3,
    question: "What is the colour temperature of typical daylight at midday?",
    options: ["2700K", "4000K", "5500-6500K", "8000K"],
    correctAnswer: 2,
    explanation: "Daylight at midday typically ranges from 5500K to 6500K, appearing as neutral to cool white. This is why 6500K is often called 'daylight' in lamp specifications."
  },
  {
    id: 4,
    question: "What does CRI stand for and what does it measure?",
    options: [
      "Colour Rendering Index - ability to reveal colours accurately",
      "Colour Radiation Intensity - brightness of colours",
      "Chromatic Reference Indicator - colour temperature accuracy",
      "Candela Rating Index - luminous intensity"
    ],
    correctAnswer: 0,
    explanation: "Colour Rendering Index (CRI or Ra) measures how accurately a light source reveals the true colours of objects compared to a reference source. Maximum value is 100."
  },
  {
    id: 5,
    question: "At what light level does vision transition from photopic to mesopic?",
    options: ["0.001 cd/m²", "0.01 cd/m²", "3 cd/m²", "10 cd/m²"],
    correctAnswer: 2,
    explanation: "Below approximately 3 cd/m², vision begins transitioning from photopic (cone-dominated) to mesopic (mixed rod-cone) vision. Full scotopic vision occurs below 0.01 cd/m²."
  },
  {
    id: 6,
    question: "Which photoreceptor cells provide colour vision?",
    options: ["Rods only", "Cones only", "Both rods and cones equally", "Neither - colour is processed in the brain"],
    correctAnswer: 1,
    explanation: "Cones are responsible for colour vision (photopic vision). There are three types sensitive to red, green, and blue wavelengths. Rods provide only monochromatic vision."
  },
  {
    id: 7,
    question: "A lamp has a colour temperature of 4000K. How would this typically be described?",
    options: ["Warm white", "Cool white/neutral", "Daylight", "Very warm"],
    correctAnswer: 1,
    explanation: "4000K is typically described as 'cool white' or 'neutral white'. It provides a balance between warm (2700-3000K) and daylight (5000K+) appearances."
  },
  {
    id: 8,
    question: "Why is the S/P ratio important in lighting design?",
    options: [
      "It determines energy efficiency",
      "It affects visual performance at mesopic light levels",
      "It measures lamp lifespan",
      "It indicates UV output"
    ],
    correctAnswer: 1,
    explanation: "The Scotopic/Photopic (S/P) ratio indicates how effective a light source is at mesopic light levels. Higher S/P ratios can improve visibility in peripheral vision and low-light areas."
  },
  {
    id: 9,
    question: "What is the Purkinje shift?",
    options: [
      "A colour temperature adjustment",
      "Change in eye sensitivity towards blue at low light levels",
      "Lens yellowing with age",
      "Automatic brightness adjustment"
    ],
    correctAnswer: 1,
    explanation: "The Purkinje shift describes how peak eye sensitivity moves from yellow-green (photopic) towards blue-green (scotopic) as light levels decrease, affecting colour perception in low light."
  },
  {
    id: 10,
    question: "For critical colour matching tasks, what minimum CRI should be specified?",
    options: ["CRI 70", "CRI 80", "CRI 90", "CRI 95+"],
    correctAnswer: 3,
    explanation: "Critical colour matching (printing, textiles, paint matching) typically requires CRI 95+ to ensure accurate colour perception. Some applications specify individual R values (R9 for reds)."
  },
  {
    id: 11,
    question: "What wavelength does the human eye perceive as brightest under photopic conditions?",
    options: ["450nm (blue)", "507nm (blue-green)", "555nm (yellow-green)", "630nm (red)"],
    correctAnswer: 2,
    explanation: "The photopic luminous efficiency function peaks at 555nm (yellow-green). This is why lumens are weighted towards this wavelength and why yellow-green appears brightest."
  },
  {
    id: 12,
    question: "Which CIBSE publication provides guidance on colour in interior lighting?",
    options: ["LG1", "LG3", "LG7", "TM10"],
    correctAnswer: 2,
    explanation: "CIBSE LG7 'Office Lighting' and other Lighting Guides provide specific guidance on colour rendering and colour temperature for various applications."
  }
];

const faqs = [
  {
    question: "Why do colours look different under different light sources?",
    answer: "Different light sources have different spectral power distributions - they emit different amounts of each wavelength. If a light source lacks certain wavelengths (like some LEDs lacking red), objects needing those wavelengths to appear their true colour will look dull or shifted. This is why CRI matters - it indicates how complete the spectrum is."
  },
  {
    question: "What is the difference between CCT and CRI?",
    answer: "CCT (Correlated Colour Temperature in Kelvin) describes the appearance of the light itself - warm (low K) or cool (high K). CRI (Colour Rendering Index) measures how accurately that light reveals colours in objects. A lamp can be warm white (2700K) with poor CRI (colours look wrong) or good CRI (colours look accurate). Both matter in lighting design."
  },
  {
    question: "Why do street lights often appear yellow or orange?",
    answer: "Traditional sodium street lights (now being replaced by LED) produced nearly monochromatic yellow-orange light around 589nm. This gave poor colour rendering (CRI ~20) but high luminous efficacy. LED replacements typically offer 4000K neutral white with CRI 70+, improving visibility and colour perception."
  },
  {
    question: "How does age affect colour perception?",
    answer: "The eye's lens yellows with age, absorbing more blue light. This shifts colour perception warmer and reduces sensitivity to blue wavelengths. Older occupants may need higher light levels and benefit from cooler colour temperatures (4000-5000K) to compensate. CIBSE guidance recommends considering this in lighting for older populations."
  },
  {
    question: "What is metamerism in lighting?",
    answer: "Metamerism occurs when two colours appear identical under one light source but different under another. This is caused by their different spectral reflectance curves interacting with different lamp spectra. It is important in retail, textiles, and any application where colour matching matters between different lighting environments."
  },
  {
    question: "Why is 4000K becoming popular for offices?",
    answer: "4000K neutral white provides good visual acuity and alertness during working hours while being less harsh than daylight (5000-6500K). It works well with daylight integration and suits a range of tasks. Many modern office specifications now use 4000K as standard, though circadian considerations may favour tuneable white systems."
  }
];

const HNCModule2Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Lightbulb className="h-4 w-4" />
            <span>Module 2.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Light and Vision
          </h1>
          <p className="text-white/80">
            Understanding the electromagnetic spectrum, visual perception, and colour properties essential for building services lighting design
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Visible light:</strong> EM radiation 380-780nm wavelength</li>
              <li className="pl-1"><strong>Colour temperature:</strong> Warm (2700K) to cool (6500K)</li>
              <li className="pl-1"><strong>CRI:</strong> Colour accuracy measure (max 100)</li>
              <li className="pl-1"><strong>Photopic/Scotopic:</strong> Cone vs rod vision</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Office:</strong> 4000K, CRI 80+</li>
              <li className="pl-1"><strong>Retail:</strong> 3000-4000K, CRI 90+</li>
              <li className="pl-1"><strong>Healthcare:</strong> 4000K, CRI 90+</li>
              <li className="pl-1"><strong>External:</strong> Consider mesopic vision</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the position of visible light in the electromagnetic spectrum",
              "Describe how the human eye perceives light and colour",
              "Define colour temperature (K) and its application in lighting design",
              "Explain Colour Rendering Index (CRI) and specify appropriate values",
              "Distinguish between photopic, mesopic, and scotopic vision",
              "Apply visual perception principles to building services lighting"
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

        {/* Section 1: Electromagnetic Spectrum */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Electromagnetic Spectrum
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Light is electromagnetic radiation that travels at approximately 3 × 10⁸ m/s in a vacuum. The electromagnetic
              spectrum spans from radio waves (long wavelength, low frequency) to gamma rays (short wavelength, high frequency),
              with visible light occupying a narrow band that the human eye can detect.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key properties of electromagnetic radiation:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Wavelength (λ) measured in nanometres (nm) or micrometres (μm)</li>
                <li className="pl-1">Frequency (f) measured in Hertz (Hz), where c = f × λ</li>
                <li className="pl-1">Energy is proportional to frequency (E = hf)</li>
                <li className="pl-1">Does not require a medium to propagate</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electromagnetic Spectrum for Building Services</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Radiation Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Wavelength</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Relevance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UV-C</td>
                      <td className="border border-white/10 px-3 py-2">100-280nm</td>
                      <td className="border border-white/10 px-3 py-2">Germicidal lamps, HVAC disinfection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UV-A/B</td>
                      <td className="border border-white/10 px-3 py-2">280-400nm</td>
                      <td className="border border-white/10 px-3 py-2">Material degradation, skin hazard</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Visible light</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">380-780nm</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">General and task lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Near infrared</td>
                      <td className="border border-white/10 px-3 py-2">780nm-3μm</td>
                      <td className="border border-white/10 px-3 py-2">Heat from lamps, solar gain</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Far infrared</td>
                      <td className="border border-white/10 px-3 py-2">3μm-1mm</td>
                      <td className="border border-white/10 px-3 py-2">Radiant heating, thermal imaging</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Visible Spectrum Colours</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Colour</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Wavelength Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Violet</td><td className="border border-white/10 px-3 py-2">380-450nm</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Blue</td><td className="border border-white/10 px-3 py-2">450-495nm</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Green</td><td className="border border-white/10 px-3 py-2">495-570nm</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Yellow</td><td className="border border-white/10 px-3 py-2">570-590nm</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Orange</td><td className="border border-white/10 px-3 py-2">590-620nm</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Red</td><td className="border border-white/10 px-3 py-2">620-780nm</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Shorter wavelengths (violet/blue) carry more energy than longer wavelengths (red). This affects both visual perception and circadian rhythm impacts.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Visual Perception */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Visual Perception and the Human Eye
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The human visual system consists of the eye (optical system) and the brain (image processing). Understanding
              how we perceive light is fundamental to designing effective lighting systems that meet both functional and
              comfort requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key structures of the eye:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cornea:</strong> Transparent front surface providing ~70% of focusing power</li>
                <li className="pl-1"><strong>Iris:</strong> Controls pupil size (2-8mm) to regulate light entry</li>
                <li className="pl-1"><strong>Lens:</strong> Adjustable focus (accommodation) for different distances</li>
                <li className="pl-1"><strong>Retina:</strong> Light-sensitive layer containing photoreceptors</li>
                <li className="pl-1"><strong>Fovea:</strong> Central area of retina with highest acuity</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cone Cells (Photopic Vision)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">~6 million cones concentrated in fovea</li>
                  <li className="pl-1">Three types: S (blue), M (green), L (red)</li>
                  <li className="pl-1">High acuity, colour perception</li>
                  <li className="pl-1">Operate above ~3 cd/m²</li>
                  <li className="pl-1">Peak sensitivity at 555nm</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rod Cells (Scotopic Vision)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">~120 million rods in peripheral retina</li>
                  <li className="pl-1">One type only (monochromatic)</li>
                  <li className="pl-1">Lower acuity, no colour vision</li>
                  <li className="pl-1">Operate below ~0.01 cd/m²</li>
                  <li className="pl-1">Peak sensitivity at 507nm</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Adaptation</p>
              <p className="text-sm text-white">
                The eye adapts to different light levels over time. Dark adaptation (entering a dark space) takes 20-30 minutes
                for full sensitivity. Light adaptation (entering bright light) is much faster at 1-2 minutes. Lighting design
                must consider adaptation zones at building entrances.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design implication:</strong> Transition zones between bright and dark areas should provide gradual changes in light level to allow visual adaptation.
            </p>
          </div>
        </section>

        {/* Section 3: Colour Temperature and CRI */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Colour Temperature (K) and Colour Rendering (CRI)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Colour temperature and colour rendering are two distinct but related properties of light sources. Both
              significantly impact visual comfort, task performance, and the appearance of spaces and objects.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Correlated Colour Temperature (CCT)</p>
              <p className="text-sm text-white">
                CCT describes the colour appearance of white light, measured in Kelvin (K). It relates to the colour of light
                emitted by an ideal black body radiator heated to that temperature. Lower values appear warm (yellow/orange),
                higher values appear cool (blue/white).
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Colour Temperature Guide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">CCT (K)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2700K</td>
                      <td className="border border-white/10 px-3 py-2">Warm white</td>
                      <td className="border border-white/10 px-3 py-2">Hospitality, residential, restaurants</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3000K</td>
                      <td className="border border-white/10 px-3 py-2">Warm white</td>
                      <td className="border border-white/10 px-3 py-2">Retail (warm), hotel lobbies</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4000K</td>
                      <td className="border border-white/10 px-3 py-2">Neutral/cool white</td>
                      <td className="border border-white/10 px-3 py-2">Offices, schools, healthcare</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5000K</td>
                      <td className="border border-white/10 px-3 py-2">Cool white/daylight</td>
                      <td className="border border-white/10 px-3 py-2">Industrial, colour matching</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6500K</td>
                      <td className="border border-white/10 px-3 py-2">Daylight</td>
                      <td className="border border-white/10 px-3 py-2">Colour critical tasks, D65 reference</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Colour Rendering Index (CRI/Ra)</p>
              <p className="text-sm text-white mb-3">
                CRI measures how accurately a light source reveals the colours of objects compared to a reference illuminant.
                It is calculated from colour shifts in 8 test colours (R1-R8), with the average giving Ra. Extended CRI
                (Re) uses 14 colours including saturated red (R9).
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">CRI 60-70</p>
                  <p className="text-white/70 text-xs">Basic (industrial)</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">CRI 80</p>
                  <p className="text-white/70 text-xs">Good (offices)</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">CRI 90</p>
                  <p className="text-white/70 text-xs">Excellent (retail)</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">CRI 95+</p>
                  <p className="text-white/70 text-xs">Critical (colour matching)</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Kruithof curve:</strong> Research suggests pleasing combinations of light level and colour temperature - warm light suits lower levels, cool light suits higher levels.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Photopic, Mesopic, Scotopic Vision */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Photopic, Mesopic, and Scotopic Vision
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The human visual system operates in three distinct modes depending on the ambient light level. Understanding
              these modes is essential for designing lighting for different environments, particularly external and
              emergency lighting where light levels may be low.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vision Modes and Light Levels</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Vision Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Luminance Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Photoreceptors</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Peak Sensitivity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Photopic</td>
                      <td className="border border-white/10 px-3 py-2">&gt;3 cd/m²</td>
                      <td className="border border-white/10 px-3 py-2">Cones</td>
                      <td className="border border-white/10 px-3 py-2">555nm (yellow-green)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mesopic</td>
                      <td className="border border-white/10 px-3 py-2">0.01-3 cd/m²</td>
                      <td className="border border-white/10 px-3 py-2">Rods + Cones</td>
                      <td className="border border-white/10 px-3 py-2">507-555nm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scotopic</td>
                      <td className="border border-white/10 px-3 py-2">&lt;0.01 cd/m²</td>
                      <td className="border border-white/10 px-3 py-2">Rods</td>
                      <td className="border border-white/10 px-3 py-2">507nm (blue-green)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">S/P Ratio (Scotopic/Photopic)</p>
              <p className="text-sm text-white mb-3">
                The S/P ratio indicates how effective a light source is under mesopic conditions relative to photopic lumens.
                Light sources with higher blue content have higher S/P ratios and can appear brighter in peripheral vision
                at low light levels.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-black/30">
                      <th className="border border-white/10 px-3 py-2 text-left">Light Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical S/P Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">High-pressure sodium</td><td className="border border-white/10 px-3 py-2">0.6</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Warm white LED (2700K)</td><td className="border border-white/10 px-3 py-2">1.1</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Neutral white LED (4000K)</td><td className="border border-white/10 px-3 py-2">1.4</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Cool white LED (5000K)</td><td className="border border-white/10 px-3 py-2">1.7</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Metal halide</td><td className="border border-white/10 px-3 py-2">1.5</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Implications</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Interior lighting: photopic (lux/lumens sufficient)</li>
                  <li className="pl-1">Street lighting: mesopic (S/P ratio matters)</li>
                  <li className="pl-1">Emergency escape: may be mesopic/scotopic</li>
                  <li className="pl-1">External areas: consider mesopic benefits</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Purkinje Shift</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">As light levels fall, sensitivity shifts to blue</li>
                  <li className="pl-1">Blue objects appear relatively brighter</li>
                  <li className="pl-1">Red objects appear relatively darker</li>
                  <li className="pl-1">Affects colour perception at dusk</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> External lighting calculations increasingly consider mesopic lumens rather than just photopic lumens, particularly for road and area lighting where peripheral detection is important.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Selecting Colour Temperature</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A new open-plan office requires lighting. The design brief specifies a professional,
                productive atmosphere with good daylight integration. What colour temperature should be specified?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Consider the requirements:</p>
                <p>- Professional appearance: suggests cooler rather than warm</p>
                <p>- Productive atmosphere: 4000K+ supports alertness</p>
                <p>- Daylight integration: artificial light should blend</p>
                <p className="mt-2"><strong>Recommendation: 4000K neutral white</strong></p>
                <p className="mt-2 text-white/60">This balances warmth with alertness and blends well with daylight (5500-6500K)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: CRI Specification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A fashion retailer requires lighting for clothing displays. What CRI should be specified and why?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Retail clothing requirements:</p>
                <p>- Colours must appear accurate (customers check fabric colours)</p>
                <p>- Skin tones must look flattering (changing rooms)</p>
                <p>- High-end brand image expected</p>
                <p className="mt-2"><strong>Specification: CRI 90 minimum (Ra90), R9 ≥ 50</strong></p>
                <p className="mt-2 text-white/60">R9 (saturated red) is particularly important for skin tones and warm fabric colours</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Mesopic Consideration</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A car park operates at 50 lux average. Should mesopic effects be considered in the lighting design?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>At 50 lux with typical surface reflectances:</p>
                <p>- Luminance ≈ 50 × 0.2 / π ≈ 3 cd/m²</p>
                <p>- This is at the photopic/mesopic boundary</p>
                <p>- Peripheral vision will be partly mesopic</p>
                <p className="mt-2"><strong>Yes - consider S/P ratio</strong></p>
                <p className="mt-2 text-white/60">A 4000K LED (S/P ~1.4) will provide better peripheral visibility than 2700K (S/P ~1.1) at the same photopic lux level</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Specifications to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Visible spectrum:</strong> 380-780nm</li>
                <li className="pl-1"><strong>Photopic peak:</strong> 555nm (yellow-green)</li>
                <li className="pl-1"><strong>Scotopic peak:</strong> 507nm (blue-green)</li>
                <li className="pl-1"><strong>Office standard:</strong> 4000K, CRI 80+</li>
                <li className="pl-1"><strong>Retail standard:</strong> 3000-4000K, CRI 90+</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE References</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>CIBSE LG7:</strong> Office Lighting (CCT and CRI guidance)</li>
                <li className="pl-1"><strong>CIBSE LG1:</strong> The Industrial Environment</li>
                <li className="pl-1"><strong>CIBSE LG6:</strong> The Outdoor Environment</li>
                <li className="pl-1"><strong>SLL Lighting Handbook:</strong> Comprehensive guidance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Confusing CCT and CRI:</strong> A lamp can be warm (2700K) with poor CRI</li>
                <li className="pl-1"><strong>Ignoring R9:</strong> Overall CRI can be good but reds may render poorly</li>
                <li className="pl-1"><strong>Mixing CCTs:</strong> Different colour temperatures in same space look inconsistent</li>
                <li className="pl-1"><strong>Forgetting adaptation:</strong> Transition areas need gradual light level changes</li>
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
                <p className="font-medium text-white mb-1">Light Properties</p>
                <ul className="space-y-0.5">
                  <li>Visible spectrum: 380-780nm</li>
                  <li>Speed of light: 3 × 10⁸ m/s</li>
                  <li>Photopic peak: 555nm</li>
                  <li>Scotopic peak: 507nm</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Design Standards</p>
                <ul className="space-y-0.5">
                  <li>Office: 4000K, CRI 80</li>
                  <li>Retail: 3000K, CRI 90</li>
                  <li>Healthcare: 4000K, CRI 90</li>
                  <li>Industry: 4000-5000K, CRI 80</li>
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
            <Link to="../h-n-c-module2-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section4-2">
              Next: Illumination Calculations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section4_1;
