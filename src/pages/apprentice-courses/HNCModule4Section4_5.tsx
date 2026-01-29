import { ArrowLeft, Sun, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "External Lighting - HNC Module 4 Section 4.5";
const DESCRIPTION = "Master external lighting design for building services: security lighting, amenity lighting, car parks, facade lighting, Part L compliance requirements, and ILP guidance on light pollution control.";

const quickCheckQuestions = [
  {
    id: "car-park-lux",
    question: "What is the recommended illuminance for a multi-storey car park to EN 12464-2?",
    options: ["20 lux", "50 lux", "75 lux", "100 lux"],
    correctIndex: 2,
    explanation: "EN 12464-2 recommends 75 lux for parking areas in multi-storey car parks during hours of use. Open air car parks may be designed to lower levels (20-50 lux) depending on risk assessment."
  },
  {
    id: "light-pollution-zones",
    question: "In the ILP Environmental Zone classification, which zone has the strictest controls?",
    options: ["E0 - Protected", "E1 - Natural", "E3 - Suburban", "E4 - Urban"],
    correctIndex: 0,
    explanation: "E0 (Protected) has the strictest controls - areas like UNESCO starlight reserves or areas specifically designated for astronomical observation. E1 (Natural) includes national parks and rural areas."
  },
  {
    id: "security-lighting-type",
    question: "What type of lighting distribution is most effective for security applications?",
    options: ["Narrow spot lighting", "Wide uniform distribution", "Decorative uplighting", "Coloured accent lighting"],
    correctIndex: 1,
    explanation: "Uniform distribution across the protected area is most effective for security. This eliminates shadows where intruders could hide and enables CCTV cameras to capture clear images across the full area."
  },
  {
    id: "part-l-external",
    question: "What does Part L require for external lighting installations?",
    options: [
      "No requirements for external lighting",
      "Efficacy limits, controls and upward light restrictions",
      "Only emergency lighting requirements",
      "Aesthetic guidelines only"
    ],
    correctIndex: 1,
    explanation: "Part L requires external lighting to meet minimum efficacy (70 luminaire lumens/circuit-watt), include controls (daylight sensing, time scheduling), and limit upward light output ratio (ULOR) to control light pollution."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary standard for external workplace lighting design?",
    options: [
      "EN 12464-1",
      "EN 12464-2",
      "BS 5489",
      "ILP PLG04"
    ],
    correctAnswer: 1,
    explanation: "EN 12464-2 covers lighting for outdoor work places. BS 5489 covers road lighting, and ILP guidance covers light pollution. EN 12464-1 is for indoor workplaces."
  },
  {
    id: 2,
    question: "What does ULOR stand for in external lighting?",
    options: [
      "Universal Light Output Rating",
      "Upward Light Output Ratio",
      "Uniform Light Operating Range",
      "Upper Luminaire Operating Regulation"
    ],
    correctAnswer: 1,
    explanation: "Upward Light Output Ratio (ULOR) is the percentage of luminaire output directed above horizontal. Lower ULOR reduces light pollution. Part L limits ULOR for new installations."
  },
  {
    id: 3,
    question: "What illuminance is recommended for pedestrian areas near building entrances?",
    options: ["5 lux", "20 lux", "50 lux", "100 lux"],
    correctAnswer: 2,
    explanation: "50 lux is typically recommended for building entrances and surrounding pedestrian areas to EN 12464-2. This ensures safe movement and facial recognition for security purposes."
  },
  {
    id: 4,
    question: "What ILP Environmental Zone would a new suburban housing estate typically fall into?",
    options: ["E1 - Natural", "E2 - Rural", "E3 - Suburban", "E4 - Urban"],
    correctAnswer: 2,
    explanation: "E3 (Suburban) applies to suburban residential areas. This zone allows moderate lighting levels with controls on spill light and ULOR. E4 (Urban) applies to city centres and town centres."
  },
  {
    id: 5,
    question: "What is 'spill light' in external lighting design?",
    options: [
      "Light that falls outside the intended area",
      "Emergency backup lighting",
      "Reflected light from surfaces",
      "Light from adjacent properties"
    ],
    correctAnswer: 0,
    explanation: "Spill light (or obtrusive light) is light that falls outside the target area, potentially causing nuisance to neighbours or contributing to light pollution. Good design minimises spill through careful aiming and shielding."
  },
  {
    id: 6,
    question: "What colour temperature is typically recommended for security lighting to aid CCTV?",
    options: ["2700K (warm white)", "3000K (warm white)", "4000K (neutral white)", "6000K (daylight)"],
    correctAnswer: 2,
    explanation: "4000K neutral white is typically recommended for security applications. This provides good colour rendering for CCTV identification while avoiding the harsh appearance of very cool white sources."
  },
  {
    id: 7,
    question: "What is facade lighting primarily designed to achieve?",
    options: [
      "Security surveillance",
      "Architectural enhancement and identity",
      "Energy reduction",
      "Emergency evacuation"
    ],
    correctAnswer: 1,
    explanation: "Facade lighting is primarily for architectural enhancement, highlighting building features and creating visual identity at night. It contributes to placemaking and wayfinding but must be designed to minimise light pollution."
  },
  {
    id: 8,
    question: "What minimum IP rating is typically required for external luminaires in the UK?",
    options: ["IP20", "IP44", "IP54", "IP65"],
    correctAnswer: 3,
    explanation: "IP65 is typically required for external luminaires, providing protection against dust ingress and water jets from any direction. Locations with additional hazards (floods, pressure washing) may need IP66 or IP67."
  },
  {
    id: 9,
    question: "How can external lighting be controlled to reduce energy consumption and light pollution?",
    options: [
      "Use higher wattage luminaires",
      "Photocell, time scheduling, and dimming after hours",
      "Keep lights on 24 hours",
      "Use uplighting only"
    ],
    correctAnswer: 1,
    explanation: "Effective control combines: photocell (only operate when dark), time scheduling (match occupied hours), and dimming or switch-off during late night when activity is minimal. Part L requires such controls."
  },
  {
    id: 10,
    question: "What is the purpose of ILP Guidance Note 1 (GN01)?",
    options: [
      "Emergency lighting design",
      "The reduction of obtrusive light",
      "Sports lighting design",
      "Interior office lighting"
    ],
    correctAnswer: 1,
    explanation: "ILP Guidance Note 01 'The Reduction of Obtrusive Light' provides comprehensive guidance on minimising light pollution from external lighting installations. It is widely referenced in planning conditions."
  }
];

const faqs = [
  {
    question: "What is light pollution and why does it matter?",
    answer: "Light pollution is artificial light that serves no useful purpose - including sky glow (brightening of the night sky), glare (excessive brightness), light trespass (spill onto neighbouring properties), and clutter (excessive groupings of lights). It affects human health (sleep disruption), wildlife (navigation, breeding), astronomy, and wastes energy. Reducing light pollution is now a planning and Building Regulations requirement."
  },
  {
    question: "How do I determine the ILP Environmental Zone for a site?",
    answer: "Check with the local planning authority as they may have designated zones. Otherwise, assess based on area character: E1 for national parks/AONBs, E2 for rural villages, E3 for suburban residential, E4 for urban centres. Consider neighbouring uses - if residential, apply stricter zone criteria. The zone determines allowable ULOR, illuminance, and spill light limits."
  },
  {
    question: "What controls does Part L require for external lighting?",
    answer: "Part L requires: daylight sensing (photocell to switch off in daylight), time scheduling (to match building operation hours), and consideration of presence detection or dimming for energy efficiency. Additionally, ULOR must be limited and luminaire efficacy must meet minimum requirements (currently 70 llm/cW). These controls must be commissioned and instructions provided."
  },
  {
    question: "How do I design car park lighting for both security and energy efficiency?",
    answer: "Achieve uniform illuminance across driving lanes (50-75 lux multi-storey, 20-50 lux open air) with reduced lighting in less critical areas. Use luminaires with good optical control to minimise upward light and glare. Include controls: photocell, time scheduling, and adaptive dimming (reduced levels during quiet periods with occupancy-triggered boost)."
  },
  {
    question: "What special considerations apply to facade lighting?",
    answer: "Facade lighting should primarily use downlighting and in-grade uplights carefully aimed at specific features to minimise light escaping into the sky. Consider curfew hours after which decorative lighting switches off. Use appropriate colour rendering for the facade material. Ensure any uplighting is tightly controlled with minimal overshoot beyond the building."
  },
  {
    question: "How does external lighting interact with CCTV systems?",
    answer: "Good lighting is essential for CCTV effectiveness. Uniform illuminance (avoiding bright spots and deep shadows) helps cameras auto-adjust exposure. Consistent colour temperature aids identification. Avoid positioning luminaires in camera fields of view (causes flare). Coordinate with security consultants on camera positions and lighting requirements. IR-sensitive cameras may operate with less visible light."
  }
];

const HNCModule4Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section4">
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
            <Sun className="h-4 w-4" />
            <span>Module 4.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            External Lighting
          </h1>
          <p className="text-white/80">
            Designing external lighting for security, amenity and aesthetics while controlling light pollution
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Car parks:</strong> 20-75 lux depending on type</li>
              <li className="pl-1"><strong>Entrances:</strong> 50 lux for security/wayfinding</li>
              <li className="pl-1"><strong>ULOR:</strong> Limit upward light to control pollution</li>
              <li className="pl-1"><strong>Controls:</strong> Photocell + time scheduling required</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Guidance</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>EN 12464-2:</strong> Outdoor workplace lighting</li>
              <li className="pl-1"><strong>ILP GN01:</strong> Reducing obtrusive light</li>
              <li className="pl-1"><strong>Part L:</strong> Energy and controls requirements</li>
              <li className="pl-1"><strong>BS 5489:</strong> Road lighting standard</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Design security lighting for building perimeters and entrances",
              "Calculate car park lighting to appropriate standards",
              "Apply ILP Environmental Zone classifications",
              "Minimise light pollution and obtrusive light",
              "Select appropriate luminaires for external applications",
              "Demonstrate Part L compliance for external lighting"
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

        {/* Section 1: Security Lighting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Security Lighting Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Security lighting deters criminal activity and enables surveillance by providing adequate
              illumination for identification and CCTV operation. The design must balance security
              effectiveness with energy efficiency and light pollution control.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Security lighting objectives:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Deterrence:</strong> Visible lighting discourages intruders</li>
                <li className="pl-1"><strong>Detection:</strong> Uniform illumination reveals movement</li>
                <li className="pl-1"><strong>Identification:</strong> Sufficient light for facial recognition</li>
                <li className="pl-1"><strong>CCTV support:</strong> Even lighting without harsh shadows</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Security Lighting Illuminance Levels</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Area</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Illuminance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building perimeter</td>
                      <td className="border border-white/10 px-3 py-2">10-30 lux</td>
                      <td className="border border-white/10 px-3 py-2">Vertical illuminance on walls</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Entrances/exits</td>
                      <td className="border border-white/10 px-3 py-2">50-100 lux</td>
                      <td className="border border-white/10 px-3 py-2">Facial recognition capability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Loading bays</td>
                      <td className="border border-white/10 px-3 py-2">50-100 lux</td>
                      <td className="border border-white/10 px-3 py-2">Safe vehicle manoeuvring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pedestrian routes</td>
                      <td className="border border-white/10 px-3 py-2">20-50 lux</td>
                      <td className="border border-white/10 px-3 py-2">Safe movement, wayfinding</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CCTV coverage</td>
                      <td className="border border-white/10 px-3 py-2">50+ lux</td>
                      <td className="border border-white/10 px-3 py-2">Uniformity ratio ≤4:1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Principles for Security</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Avoid creating shadows where intruders can hide</li>
                <li className="pl-1">Position luminaires to minimise glare to legitimate users</li>
                <li className="pl-1">Use consistent colour temperature for CCTV colour matching</li>
                <li className="pl-1">Consider adaptive control - higher levels when triggered</li>
                <li className="pl-1">Coordinate with security consultants on camera positions</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> Very high lighting levels are counterproductive - they create glare that blinds observers and waste energy. Uniform moderate lighting is more effective than patchy bright lighting.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 2: Car Park Lighting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Car Park and Amenity Lighting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Car park lighting must provide safe movement for pedestrians and vehicles while meeting
              security requirements and controlling energy consumption and light pollution. The type
              of car park determines the appropriate illuminance levels.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Car Park Illuminance Requirements (EN 12464-2)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Car Park Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Em (lux)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Uniformity Uo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Multi-storey (during use)</td>
                      <td className="border border-white/10 px-3 py-2">75</td>
                      <td className="border border-white/10 px-3 py-2">0.40</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Multi-storey (24hr operation)</td>
                      <td className="border border-white/10 px-3 py-2">75</td>
                      <td className="border border-white/10 px-3 py-2">0.40</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open air - main area</td>
                      <td className="border border-white/10 px-3 py-2">50</td>
                      <td className="border border-white/10 px-3 py-2">0.25</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open air - low activity</td>
                      <td className="border border-white/10 px-3 py-2">20</td>
                      <td className="border border-white/10 px-3 py-2">0.25</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pedestrian routes</td>
                      <td className="border border-white/10 px-3 py-2">50</td>
                      <td className="border border-white/10 px-3 py-2">0.40</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ramps and corners</td>
                      <td className="border border-white/10 px-3 py-2">75</td>
                      <td className="border border-white/10 px-3 py-2">0.40</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multi-Storey Car Parks</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Consider LED linear or surface-mount luminaires</li>
                  <li className="pl-1">Higher ceilings allow column-mount</li>
                  <li className="pl-1">IP65 minimum for enclosed structures</li>
                  <li className="pl-1">Daylight linking for perimeter zones</li>
                  <li className="pl-1">Emergency lighting to BS 5266</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Surface Car Parks</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Column-mounted luminaires typical</li>
                  <li className="pl-1">6-10m mounting heights</li>
                  <li className="pl-1">Control spill light to boundaries</li>
                  <li className="pl-1">Part-night dimming for energy saving</li>
                  <li className="pl-1">IP66 for exposed locations</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Park Mark:</strong> Car parks seeking Park Mark accreditation must meet minimum lighting standards for safety and security. Check current criteria with the British Parking Association.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Light Pollution Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Light Pollution and ILP Guidance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Light pollution has significant impacts on human health, wildlife, and astronomy. The
              Institute of Lighting Professionals (ILP) provides guidance on Environmental Zones and
              acceptable limits for obtrusive light to balance lighting needs with environmental protection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ILP Environmental Zones</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Zone</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">E0</td>
                      <td className="border border-white/10 px-3 py-2">Protected</td>
                      <td className="border border-white/10 px-3 py-2">UNESCO starlight reserves, observatories</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">E1</td>
                      <td className="border border-white/10 px-3 py-2">Natural</td>
                      <td className="border border-white/10 px-3 py-2">National parks, AONBs, rural areas</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">E2</td>
                      <td className="border border-white/10 px-3 py-2">Rural</td>
                      <td className="border border-white/10 px-3 py-2">Village or small town locations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">E3</td>
                      <td className="border border-white/10 px-3 py-2">Suburban</td>
                      <td className="border border-white/10 px-3 py-2">Suburban residential areas</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">E4</td>
                      <td className="border border-white/10 px-3 py-2">Urban</td>
                      <td className="border border-white/10 px-3 py-2">Town/city centres, high-density urban</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maximum Limits by Zone (ILP GN01)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">E1</th>
                      <th className="border border-white/10 px-3 py-2 text-left">E2</th>
                      <th className="border border-white/10 px-3 py-2 text-left">E3</th>
                      <th className="border border-white/10 px-3 py-2 text-left">E4</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ULOR (max %)</td>
                      <td className="border border-white/10 px-3 py-2">0%</td>
                      <td className="border border-white/10 px-3 py-2">2.5%</td>
                      <td className="border border-white/10 px-3 py-2">5%</td>
                      <td className="border border-white/10 px-3 py-2">15%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Light into windows (pre-curfew)</td>
                      <td className="border border-white/10 px-3 py-2">2 lux</td>
                      <td className="border border-white/10 px-3 py-2">5 lux</td>
                      <td className="border border-white/10 px-3 py-2">10 lux</td>
                      <td className="border border-white/10 px-3 py-2">25 lux</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Light into windows (post-curfew)</td>
                      <td className="border border-white/10 px-3 py-2">0 lux</td>
                      <td className="border border-white/10 px-3 py-2">1 lux</td>
                      <td className="border border-white/10 px-3 py-2">2 lux</td>
                      <td className="border border-white/10 px-3 py-2">5 lux</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Source intensity (pre-curfew)</td>
                      <td className="border border-white/10 px-3 py-2">2.5 kcd</td>
                      <td className="border border-white/10 px-3 py-2">7.5 kcd</td>
                      <td className="border border-white/10 px-3 py-2">10 kcd</td>
                      <td className="border border-white/10 px-3 py-2">25 kcd</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reducing Obtrusive Light</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Use luminaires with 0% ULOR (full cut-off)</li>
                <li className="pl-1">Aim luminaires downward, never above horizontal</li>
                <li className="pl-1">Use shields/louvres to control spill light</li>
                <li className="pl-1">Position to avoid light trespass onto neighbours</li>
                <li className="pl-1">Implement curfew dimming or switch-off</li>
                <li className="pl-1">Use appropriate light output - avoid over-lighting</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Planning:</strong> Many local authorities impose lighting conditions based on ILP guidance. Check with the planning department early in design to avoid non-compliance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Part L and Facade Lighting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Part L Compliance and Facade Lighting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Regulations Part L sets requirements for external lighting energy efficiency
              and controls. Facade and architectural lighting adds visual interest but must be
              designed responsibly to minimise environmental impact.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part L Requirements for External Lighting</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Efficacy:</strong> Minimum 70 luminaire lumens per circuit-watt</li>
                <li className="pl-1"><strong>Controls:</strong> Daylight sensing to prevent daytime operation</li>
                <li className="pl-1"><strong>ULOR:</strong> Maximum 5% (may be stricter by zone)</li>
                <li className="pl-1"><strong>Commissioning:</strong> Controls must be commissioned and documented</li>
                <li className="pl-1"><strong>Information:</strong> Operating and maintenance instructions provided</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Facade Lighting Techniques</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Grazing:</strong> Light close to surface for texture</li>
                  <li className="pl-1"><strong>Washing:</strong> Even illumination of surfaces</li>
                  <li className="pl-1"><strong>Spotlighting:</strong> Highlighting specific features</li>
                  <li className="pl-1"><strong>Silhouette:</strong> Backlighting for outline effect</li>
                  <li className="pl-1"><strong>In-ground:</strong> Uplighting from ground level</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Responsible Facade Lighting</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Light top-down where possible</li>
                  <li className="pl-1">Minimise overshoot beyond building</li>
                  <li className="pl-1">Use narrow beam angles</li>
                  <li className="pl-1">Implement curfew hours (typically 23:00)</li>
                  <li className="pl-1">Match colour to building material</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">External Luminaire Selection</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Criterion</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IP Rating</td>
                      <td className="border border-white/10 px-3 py-2">IP65 minimum (IP66/67 for harsh environments)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IK Rating</td>
                      <td className="border border-white/10 px-3 py-2">IK08+ for accessible locations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Optical control</td>
                      <td className="border border-white/10 px-3 py-2">Sharp cut-off, minimal upward light</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Temperature range</td>
                      <td className="border border-white/10 px-3 py-2">-25°C to +40°C minimum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corrosion resistance</td>
                      <td className="border border-white/10 px-3 py-2">Powder coat or marine grade for coastal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Curfew:</strong> Many planning authorities require decorative lighting to switch off by 23:00. Design controls to facilitate this automatically.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Surface Car Park Design</h3>
              <p className="text-sm text-white mb-2">
                <strong>Brief:</strong> Design lighting for a 50-space surface car park (40m × 30m) in a suburban location (Zone E3).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Target illuminance (EN 12464-2): 50 lux</p>
                <p>Uniformity required: Uo ≥ 0.25</p>
                <p className="mt-2">ILP Zone E3 limits:</p>
                <p>- ULOR: ≤5%</p>
                <p>- Light into windows: ≤10 lux pre-curfew</p>
                <p className="mt-2">Luminaire selection:</p>
                <p>- 8m column-mount LED floodlights</p>
                <p>- 0% ULOR (full cut-off optics)</p>
                <p>- 120W, 14,400 lumens, 120 lm/W</p>
                <p className="mt-2">Layout: 4 columns at 20m spacing</p>
                <p>Total: <strong>4 luminaires × 120W = 480W</strong></p>
                <p className="mt-2">Controls: Photocell + time clock (dim to 50% after 23:00)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: ULOR Compliance Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A proposed luminaire has 3% ULOR. Is it compliant for Zone E2?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Zone E2 (Rural) ULOR limit: 2.5%</p>
                <p>Proposed luminaire: 3.0%</p>
                <p className="mt-2 text-red-400">✗ NOT COMPLIANT for Zone E2</p>
                <p className="mt-2">Options:</p>
                <p>1. Select luminaire with lower ULOR (≤2.5%)</p>
                <p>2. Add accessory shield to reduce upward light</p>
                <p>3. Demonstrate by calculation that actual ULOR</p>
                <p>   meets requirement (considering tilt angle)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Part L Efficacy Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Brief:</strong> Verify a proposed luminaire meets Part L efficacy requirements.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Luminaire specification:</p>
                <p>- System power: 85W</p>
                <p>- Lamp lumens: 10,200 lm</p>
                <p>- LOR: 92%</p>
                <p className="mt-2">Luminaire lumens = Lamp lumens × LOR</p>
                <p>= 10,200 × 0.92 = 9,384 luminaire lumens</p>
                <p className="mt-2">Efficacy = Luminaire lumens / System watts</p>
                <p>= 9,384 / 85 = <strong>110 luminaire lm/W</strong></p>
                <p className="mt-2">Part L minimum: 70 llm/W</p>
                <p className="text-green-400">✓ COMPLIANT (110 &gt; 70)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Determine ILP Environmental Zone</li>
                <li className="pl-1">Check planning conditions for lighting</li>
                <li className="pl-1">Select luminaires with appropriate ULOR</li>
                <li className="pl-1">Calculate illuminance and uniformity</li>
                <li className="pl-1">Verify Part L efficacy compliance</li>
                <li className="pl-1">Specify controls (photocell, timer, dimming)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Standards</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>EN 12464-2:</strong> Outdoor workplace lighting</li>
                <li className="pl-1"><strong>ILP GN01:</strong> Reduction of obtrusive light</li>
                <li className="pl-1"><strong>BS 5489:</strong> Road lighting design</li>
                <li className="pl-1"><strong>Building Regs Part L:</strong> Energy efficiency</li>
                <li className="pl-1"><strong>BS EN 13201:</strong> Road lighting performance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Over-lighting:</strong> Excessive levels waste energy and worsen pollution</li>
                <li className="pl-1"><strong>Ignoring zones:</strong> Check local environmental zone before design</li>
                <li className="pl-1"><strong>Poor control:</strong> Forgetting to specify curfew or dimming</li>
                <li className="pl-1"><strong>Wrong IP rating:</strong> Ensure adequate protection for location</li>
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
                <p className="font-medium text-white mb-1">Illuminance Levels</p>
                <ul className="space-y-0.5">
                  <li>Car park (multi): 75 lux</li>
                  <li>Car park (surface): 50 lux</li>
                  <li>Entrances: 50-100 lux</li>
                  <li>Pedestrian routes: 20-50 lux</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Part L Requirements</p>
                <ul className="space-y-0.5">
                  <li>Efficacy: ≥70 llm/W</li>
                  <li>Controls: photocell + timer</li>
                  <li>ULOR: ≤5% (zone dependent)</li>
                  <li>Minimum IP65 rating</li>
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
            <Link to="../h-n-c-module4-section4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Lighting Controls
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section4-6">
              Next: Energy Efficient Lighting
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section4_5;
