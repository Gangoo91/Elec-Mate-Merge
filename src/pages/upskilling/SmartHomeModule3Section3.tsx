import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Dimming, RGBW, and Colour Temperature";
const DESCRIPTION = "Understanding colour control and dimming capabilities in smart lighting";

const quickCheckQuestions = [
  {
    question: "What does RGBW stand for?",
    options: ["Red Green Blue Wireless", "Red Green Blue White", "Reduced Glare Basic White", "Remote Governed Brightness Wireless"],
    correctIndex: 1,
    explanation: "RGBW stands for Red, Green, Blue, White - the four LED types combined to produce a wide range of colours plus true white light."
  },
  {
    question: "Which dimmer type is recommended for LED lighting?",
    options: ["Leading-edge (TRIAC)", "Trailing-edge", "Either works equally well", "LEDs cannot be dimmed"],
    correctIndex: 1,
    explanation: "Trailing-edge dimmers are recommended for LED lighting as they provide smoother dimming without flicker or buzzing that leading-edge dimmers can cause with LEDs."
  },
  {
    question: "What colour temperature is considered warm white?",
    options: ["6500K", "4000K", "2700K", "10000K"],
    correctIndex: 2,
    explanation: "2700K is warm white, similar to traditional incandescent bulbs. Higher values (4000K, 6500K) produce cooler, bluer light."
  }
];

const quizQuestions = [
  {
    question: "Why is the dedicated white LED in RGBW bulbs important?",
    options: ["It produces more heat", "It provides pure white light without colour cast", "It uses more energy", "It enables wireless control"],
    correctIndex: 1,
    explanation: "Mixing RGB to create white results in an impure, slightly tinted white. The dedicated white LED produces clean, accurate white light for everyday use."
  },
  {
    question: "What is tunable white lighting?",
    options: ["Lights that can be repaired", "Lights that adjust colour temperature from warm to cool", "Lights with adjustable brightness only", "Lights that work with any dimmer"],
    correctIndex: 1,
    explanation: "Tunable white (CCT adjustable) lighting can change colour temperature from warm (2700K) to cool (6500K) while maintaining white light, not coloured light."
  },
  {
    question: "What causes LED flicker when dimming?",
    options: ["Low battery", "Incompatible dimmer type", "Dirty contacts", "High voltage"],
    correctIndex: 1,
    explanation: "LED flicker typically occurs when using incompatible dimmers. Leading-edge dimmers designed for incandescent loads often cause flicker with LEDs."
  },
  {
    question: "What is circadian lighting designed to support?",
    options: ["Energy savings", "Natural sleep-wake cycles", "Security monitoring", "Faster switching"],
    correctIndex: 1,
    explanation: "Circadian lighting adjusts colour temperature throughout the day (cool in morning, warm in evening) to support natural circadian rhythms and sleep patterns."
  },
  {
    question: "What minimum load issue can affect LED dimming?",
    options: ["Dimmer draws too much current", "LED load too small for dimmer's minimum rating", "Neutral wire missing", "Switch location too far from fixture"],
    correctIndex: 1,
    explanation: "Many dimmers have minimum load requirements (e.g., 10W). A single 5W LED may not meet this, causing dimming issues. Multiple LEDs or dummy loads can solve this."
  }
];

const faqs = [
  {
    question: "Should I recommend RGB or RGBW bulbs?",
    answer: "RGBW for most applications. The dedicated white LED provides clean white light for everyday use, while RGB offers colour options for entertainment and accent lighting. RGB-only bulbs produce inferior white light."
  },
  {
    question: "How do I solve LED dimming compatibility issues?",
    answer: "First verify the dimmer is trailing-edge and LED-compatible. Check minimum load requirements. Use manufacturer-recommended dimmer/bulb combinations. Consider installing a bypass capacitor or dummy load."
  },
  {
    question: "What colour temperature should I recommend for different rooms?",
    answer: "Warm white (2700-3000K) for living rooms and bedrooms. Neutral white (3500-4000K) for kitchens and bathrooms. Cool white (5000K+) for task lighting and workspaces. Tunable white offers flexibility."
  }
];

const SmartHomeModule3Section3 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 3`,
    description: DESCRIPTION
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation" asChild>
            <Link to="..">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 3 of 5</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header - Title Centred Only */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Module 3 - Section 3
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-lg">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Colour Control</p>
            <p className="text-white text-sm">RGBW for millions of colours plus pure white light</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Colour Temperature</p>
            <p className="text-white text-sm">2700K warm white to 6500K cool daylight</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Learning Outcomes
          </h2>
          <div className="space-y-3">
            {[
              "Explain dimming technologies and compatibility requirements",
              "Understand RGBW colour mixing and white light quality",
              "Describe colour temperature and its applications",
              "Troubleshoot common dimming compatibility issues"
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span className="text-white">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Dimming Technologies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Dimming Technologies
          </h2>
          <p className="text-white mb-4">
            Dimming smart lights can be achieved through different methods, each with specific applications and compatibility considerations.
          </p>
          <div className="space-y-4 mb-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">Phase-Cut Dimming (Wall Dimmers)</h3>
              <p className="text-white text-sm mb-2">Traditional dimmers that reduce power by cutting part of the AC waveform.</p>
              <div className="space-y-2 mt-3">
                <div className="p-2 rounded bg-white/5">
                  <p className="text-white text-sm"><span className="text-elec-yellow">Leading-edge (TRIAC):</span> Cuts the front of the waveform. Works well with incandescent and halogen. Can cause flicker and buzzing with LEDs.</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <p className="text-white text-sm"><span className="text-elec-yellow">Trailing-edge:</span> Cuts the back of the waveform. Smoother dimming, recommended for LED loads. Lower minimum load requirements.</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">PWM Dimming (Smart Bulbs)</h3>
              <p className="text-white text-sm">Pulse Width Modulation rapidly switches the LED on and off at frequencies too fast for the eye to perceive. The ratio of on-time to off-time determines perceived brightness. Used internally by smart bulbs for smooth, flicker-free dimming.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">0-10V / DALI Dimming</h3>
              <p className="text-white text-sm">Professional control protocols that send dimming commands via separate control wires. Used in commercial and high-end residential installations with compatible LED drivers.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* RGBW Colour */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            RGBW Colour Mixing
          </h2>
          <p className="text-white mb-4">
            RGBW bulbs contain four types of LEDs: Red, Green, Blue, and White. By varying the intensity of each colour, millions of colour combinations can be produced.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">RGB Only</p>
              <p className="text-white text-sm">Mixing red, green, and blue can theoretically produce white, but the result has colour casts and lower colour rendering. Not ideal for everyday white lighting.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Dedicated White LED</p>
              <p className="text-white text-sm">The W in RGBW provides pure, high-quality white light for everyday use. Colour mixing creates accents and effects.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">RGBWW / RGBCCT</p>
              <p className="text-white text-sm">Advanced bulbs include both warm and cool white LEDs alongside RGB, enabling tunable white plus colour options.</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Practical Application</p>
            <p className="text-white text-sm">Use RGB colours for entertainment, parties, and accent lighting. Use the white LED for everyday activities like cooking, reading, and working.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Colour Temperature */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Colour Temperature
          </h2>
          <p className="text-white mb-4">
            Colour temperature, measured in Kelvin (K), describes the warmth or coolness of white light. Lower values are warmer (more orange/yellow), higher values are cooler (more blue).
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Warm White (2700-3000K)</p>
              <p className="text-white text-sm">Similar to traditional incandescent bulbs. Creates cosy, relaxing ambience. Ideal for living rooms, bedrooms, and dining areas.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Neutral White (3500-4000K)</p>
              <p className="text-white text-sm">Balanced light that appears neither warm nor cool. Good for kitchens, bathrooms, and offices where clarity is needed.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Cool White (5000-6500K)</p>
              <p className="text-white text-sm">Daylight-like appearance with blue tones. Best for task lighting, workshops, and spaces where alertness is desired.</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 text-white font-semibold">Colour Temperature</th>
                  <th className="text-left py-2 text-white font-semibold">Appearance</th>
                  <th className="text-left py-2 text-white font-semibold">Typical Use</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-white/10">
                  <td className="py-2">2700K</td>
                  <td className="py-2">Warm White</td>
                  <td className="py-2">Living room, bedroom</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">3000K</td>
                  <td className="py-2">Soft White</td>
                  <td className="py-2">Dining, hallways</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">4000K</td>
                  <td className="py-2">Neutral White</td>
                  <td className="py-2">Kitchen, bathroom</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2">5000K</td>
                  <td className="py-2">Daylight</td>
                  <td className="py-2">Office, garage</td>
                </tr>
                <tr>
                  <td className="py-2">6500K</td>
                  <td className="py-2">Cool Daylight</td>
                  <td className="py-2">Task lighting, workshops</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Circadian Lighting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Circadian Lighting
          </h2>
          <p className="text-white mb-4">
            Circadian lighting (human-centric lighting) automatically adjusts colour temperature throughout the day to support natural sleep-wake cycles.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Morning</p>
              <p className="text-white text-sm">Cool, bright light (5000K+) helps wake up and promotes alertness. Simulates natural morning sunlight.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Daytime</p>
              <p className="text-white text-sm">Neutral white (4000-5000K) maintains energy and focus during working hours.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Evening</p>
              <p className="text-white text-sm">Warm light (2700-3000K) reduces blue light exposure, preparing the body for sleep.</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Health Benefit</p>
            <p className="text-white text-sm">Blue light suppresses melatonin production. Automatic evening shift to warm light can improve sleep quality, particularly for those sensitive to artificial light at night.</p>
          </div>
        </section>

        {/* Compatibility Issues */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Dimming Compatibility Issues
          </h2>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Flicker</p>
              <p className="text-white text-sm">Visible or imperceptible light pulsing caused by incompatible dimmers. Can cause headaches and eye strain. Solution: Use trailing-edge LED dimmers.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Buzzing</p>
              <p className="text-white text-sm">Audible hum from LED drivers struggling with dimmer output. Solution: Match dimmer and bulb from manufacturer compatibility lists.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Limited Dimming Range</p>
              <p className="text-white text-sm">LEDs may not dim below 20-30% or may turn off abruptly. Check manufacturer specifications for dimming range.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Minimum Load Issues</p>
              <p className="text-white text-sm">Dimmer requires higher wattage than LED load provides. Solution: Add more bulbs to circuit or use a bypass capacitor.</p>
            </div>
          </div>
        </section>

        {/* Real World Application */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Real World Application
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white font-semibold mb-2">Scenario: Bedroom Lighting Design</p>
            <p className="text-white text-sm mb-3">
              A customer wants bedroom lighting that supports both reading and sleep preparation, with colour options for ambience.
            </p>
            <p className="text-white text-sm mb-2"><span className="text-elec-yellow">Recommended Solution:</span></p>
            <ul className="text-white text-sm space-y-1 ml-4">
              <li>RGBWW bedside bulbs for tunable white reading light and colour accents</li>
              <li>Tunable white ceiling lights for circadian support</li>
              <li>Schedule: Gradual warm shift starting 2 hours before bedtime</li>
              <li>Scene: Reading mode at 4000K, Relax mode at 2700K</li>
            </ul>
            <p className="text-white text-sm mt-3"><span className="text-elec-yellow">Result:</span> Versatile lighting supporting reading, relaxation, and healthy sleep patterns.</p>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-white/5">
                <p className="text-white font-medium mb-2">{faq.question}</p>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Section Quiz
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation" asChild>
            <Link to="../section-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation" asChild>
            <Link to="../section-4">
              Next Section
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule3Section3;
