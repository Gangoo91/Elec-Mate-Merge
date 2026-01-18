import { ArrowLeft, ArrowRight, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Load Compatibility and Control Types";
const DESCRIPTION = "Master the principles of matching smart lighting controls to different load types, including LED compatibility, dimmer selection, and troubleshooting common issues.";

const quickCheckQuestions = [
  {
    question: "Which type of dimmer is generally recommended for LED lamps?",
    options: ["Leading-edge (TRIAC)", "Trailing-edge (electronic)", "Rotary rheostat", "Any standard dimmer"],
    correctAnswer: 1,
    explanation: "Trailing-edge (electronic) dimmers are recommended for LEDs because they switch off more smoothly, reducing flicker and buzzing that can occur with leading-edge dimmers."
  },
  {
    question: "What causes LED lamps to flicker when connected to some dimmers?",
    options: ["Too much voltage", "Insufficient minimum load", "Wrong colour temperature", "Faulty LED chip"],
    correctAnswer: 1,
    explanation: "Many dimmers have a minimum load requirement. When the connected LED load is too low, the dimmer cannot regulate properly, causing flicker."
  },
  {
    question: "What does PWM stand for in LED dimming?",
    options: ["Power Watt Modulation", "Pulse Width Modulation", "Periodic Wave Management", "Programmable Wattage Mode"],
    correctAnswer: 1,
    explanation: "PWM (Pulse Width Modulation) rapidly switches the LED on and off at varying duty cycles to control perceived brightness without changing voltage."
  }
];

const quizQuestions = [
  {
    question: "A resistive load like an incandescent lamp can be dimmed with:",
    options: ["Only trailing-edge dimmers", "Only leading-edge dimmers", "Either leading or trailing-edge dimmers", "No dimmers at all"],
    correctAnswer: 2,
    explanation: "Resistive loads like incandescent lamps are compatible with both leading-edge and trailing-edge dimmers, as they have no minimum load issues or phase sensitivity."
  },
  {
    question: "What is the main advantage of a smart relay switch over a smart dimmer?",
    options: ["It can change colour temperature", "It works with non-dimmable loads", "It provides smoother dimming", "It uses less energy"],
    correctAnswer: 1,
    explanation: "Smart relay switches simply turn loads on or off, making them suitable for non-dimmable loads like some LED drivers, motors, or fluorescent fittings."
  },
  {
    question: "When installing LED downlights with a dimmer, you should always:",
    options: ["Use the highest wattage rating", "Check the dimmer's compatibility list", "Install a bypass capacitor regardless", "Use leading-edge dimmers only"],
    correctAnswer: 1,
    explanation: "Manufacturers provide compatibility lists showing which LED lamps work with which dimmers. Checking this prevents flickering, buzzing, and premature failure."
  },
  {
    question: "What minimum load issue might you encounter when dimming a single 5W LED lamp?",
    options: ["The lamp will overheat", "The dimmer may not reach minimum load threshold", "The circuit breaker will trip", "The lamp will change colour"],
    correctAnswer: 1,
    explanation: "Many dimmers require 25-40W minimum load to function properly. A single 5W LED may not meet this threshold, causing the dimmer to behave erratically."
  },
  {
    question: "DALI is a protocol specifically designed for:",
    options: ["Security system integration", "Digital addressable lighting control", "Audio system connection", "HVAC automation"],
    correctAnswer: 1,
    explanation: "DALI (Digital Addressable Lighting Interface) is an international standard protocol for controlling and dimming lighting fixtures in commercial and industrial applications."
  }
];

const faqs = [
  {
    question: "Can I use any dimmer with LED lamps?",
    answer: "No. LEDs require dimmers specifically designed for LED loads, typically trailing-edge types. Standard leading-edge dimmers can cause flickering, buzzing, reduced lifespan, and limited dimming range. Always check the dimmer manufacturer's LED compatibility list before installation."
  },
  {
    question: "Why do my LED lamps buzz when dimmed?",
    answer: "Buzzing usually indicates incompatibility between the dimmer and LED driver. The dimmer's switching frequency may be causing vibration in the driver components. Solutions include using a compatible trailing-edge dimmer, fitting a bypass/bleeder module, or selecting lamps specifically rated for the installed dimmer."
  },
  {
    question: "What is a bypass or bleeder module?",
    answer: "A bypass module adds a small resistive load to the circuit, helping the dimmer reach its minimum load threshold when controlling low-wattage LEDs. It connects in parallel with the LED load, typically at the last fitting, and prevents flickering and ghost lighting without significantly increasing energy consumption."
  }
];

const SmartHomeModule3Section4 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 3`,
    description: DESCRIPTION,
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="/electrician/upskilling/smart-home-module-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 4 of 5</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-6">
            <Zap className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-base sm:text-lg max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Key Focus</p>
            <p className="text-white text-sm">Matching dimmers to LED and traditional loads</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Practical Skill</p>
            <p className="text-white text-sm">Troubleshooting flickering and buzzing</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Learning Outcomes
          </h2>
          <ul className="space-y-3">
            {[
              "Identify different lighting load types and their control requirements",
              "Select appropriate dimmers for LED and traditional loads",
              "Understand leading-edge versus trailing-edge dimming technology",
              "Troubleshoot common LED dimming issues",
              "Apply DALI and other digital control protocols"
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3 text-white">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Types of Electrical Loads */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Types of Electrical Loads
          </h2>
          <p className="text-white mb-4">
            Understanding load types is essential for selecting compatible controls. Different
            loads respond differently to dimming methods and switching frequencies.
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Resistive Loads</h4>
              <p className="text-white text-sm">
                Incandescent and halogen lamps are purely resistive. They work with virtually
                any dimmer type and respond smoothly across the full dimming range. Power
                factor is unity (1.0), making calculations straightforward.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Inductive Loads</h4>
              <p className="text-white text-sm">
                Magnetic (wire-wound) transformers for low-voltage halogen are inductive.
                They require leading-edge dimmers and can cause issues with electronic
                dimmers due to current phase lag.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Capacitive Loads</h4>
              <p className="text-white text-sm">
                Electronic transformers and most LED drivers are capacitive. They work best
                with trailing-edge dimmers. The current leads the voltage, requiring
                smooth switching to prevent interference.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Leading vs Trailing-Edge Dimmers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Leading vs Trailing-Edge Dimmers
          </h2>
          <p className="text-white mb-4">
            The two main dimmer technologies differ in when they cut the AC waveform,
            affecting their compatibility with different load types.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">Feature</th>
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">Leading-Edge</th>
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">Trailing-Edge</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Technology</td>
                  <td className="py-3 px-4 text-white">TRIAC-based</td>
                  <td className="py-3 px-4 text-white">MOSFET-based</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Waveform cut</td>
                  <td className="py-3 px-4 text-white">Beginning of cycle</td>
                  <td className="py-3 px-4 text-white">End of cycle</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Best for</td>
                  <td className="py-3 px-4 text-white">Resistive, inductive</td>
                  <td className="py-3 px-4 text-white">Capacitive, LED</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Minimum load</td>
                  <td className="py-3 px-4 text-white">Higher (40-60W typical)</td>
                  <td className="py-3 px-4 text-white">Lower (10-25W typical)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white">Noise</td>
                  <td className="py-3 px-4 text-white">Can cause buzzing</td>
                  <td className="py-3 px-4 text-white">Quieter operation</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white text-sm">
            For mixed installations, universal dimmers automatically detect load type and
            adjust their operation accordingly. These are more expensive but offer flexibility.
          </p>
        </section>

        {/* LED Compatibility Issues */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            LED Compatibility Issues
          </h2>
          <p className="text-white mb-4">
            LEDs present unique challenges for dimming due to their low power consumption
            and driver electronics. Common issues include:
          </p>
          <div className="space-y-4 mb-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-white mb-2">Flickering</h4>
              <p className="text-white text-sm mb-2">
                Occurs when the dimmer cannot regulate properly, often due to minimum load
                not being met or incompatible driver electronics.
              </p>
              <p className="text-elec-yellow text-sm">
                Solution: Use compatible trailing-edge dimmer or add bypass module.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-white mb-2">Buzzing</h4>
              <p className="text-white text-sm mb-2">
                Caused by the dimmer's switching frequency resonating with LED driver
                components. More common with leading-edge dimmers.
              </p>
              <p className="text-elec-yellow text-sm">
                Solution: Switch to trailing-edge dimmer or select lamps tested with that dimmer.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-white mb-2">Limited Dimming Range</h4>
              <p className="text-white text-sm mb-2">
                The LED may not dim below 20-30% or may jump between levels rather than
                dimming smoothly.
              </p>
              <p className="text-elec-yellow text-sm">
                Solution: Use lamps with quality drivers rated for deep dimming (1-5%).
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-white mb-2">Ghost Lighting</h4>
              <p className="text-white text-sm mb-2">
                LEDs glow faintly even when switched off, caused by residual current through
                the dimmer or two-way wiring inductance.
              </p>
              <p className="text-elec-yellow text-sm">
                Solution: Install bypass module or check for neutral-switched circuits.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Smart Lighting Control Options */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Smart Lighting Control Options
          </h2>
          <p className="text-white mb-4">
            Smart controls offer various methods for adjusting lighting, each with specific
            load requirements and capabilities.
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Smart Relay Switches</h4>
              <p className="text-white text-sm">
                On/off control only, suitable for any load type including non-dimmable LEDs,
                motors, and fluorescent fittings. No compatibility concerns with load type.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Smart Dimmers</h4>
              <p className="text-white text-sm">
                Variable brightness control, typically trailing-edge for LED compatibility.
                Check manufacturer specifications for minimum/maximum load ratings.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">PWM Controllers</h4>
              <p className="text-white text-sm">
                Direct control of LED strips and fixtures via rapid on/off switching.
                Provides flicker-free dimming when operating at high frequencies (above 1kHz).
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">0-10V Dimming</h4>
              <p className="text-white text-sm">
                Analogue signal dims compatible LED drivers. Requires additional control wiring
                but provides smooth, flicker-free operation for commercial installations.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">DALI Controllers</h4>
              <p className="text-white text-sm">
                Digital addressable system for commercial lighting. Each fixture can be
                individually addressed and controlled. Supports dimming, scenes, and monitoring.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Matching Loads to Controls */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Matching Loads to Controls
          </h2>
          <p className="text-white mb-4">
            Follow these guidelines to ensure reliable operation when selecting controls
            for different load types.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">Load Type</th>
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">Recommended Control</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Dimmable LED lamps</td>
                  <td className="py-3 px-4 text-white">Trailing-edge dimmer, check compatibility</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Non-dimmable LEDs</td>
                  <td className="py-3 px-4 text-white">Relay switch only, never dimmer</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Incandescent/halogen</td>
                  <td className="py-3 px-4 text-white">Any dimmer type, check wattage rating</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">LV halogen (electronic trans.)</td>
                  <td className="py-3 px-4 text-white">Trailing-edge dimmer</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">LV halogen (magnetic trans.)</td>
                  <td className="py-3 px-4 text-white">Leading-edge dimmer</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">LED strip (12V/24V DC)</td>
                  <td className="py-3 px-4 text-white">PWM controller matched to strip type</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white">Commercial LED panels</td>
                  <td className="py-3 px-4 text-white">DALI or 0-10V with compatible driver</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-white text-sm">
              <span className="text-elec-yellow font-medium">Installation tip:</span> When
              specifying a project, calculate the total connected load and ensure it falls
              within the dimmer's minimum and maximum ratings. Add a bypass module if the
              LED load is below the minimum threshold.
            </p>
          </div>
        </section>

        {/* Practical Testing Procedures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Practical Testing Procedures
          </h2>
          <p className="text-white mb-4">
            Before finalising an installation, test for common issues to ensure reliable
            operation for the client.
          </p>
          <ol className="space-y-3 list-decimal list-inside text-white mb-4">
            <li className="pl-2">
              <span className="font-medium">Full range test</span> - Dim from 100% to minimum
              and back, checking for smooth operation at all levels
            </li>
            <li className="pl-2">
              <span className="font-medium">Low-level stability</span> - Leave at 10-20% for
              several minutes, watching for flickering or dropout
            </li>
            <li className="pl-2">
              <span className="font-medium">Listen for buzzing</span> - With the room quiet,
              check for audible noise from both dimmer and lamps
            </li>
            <li className="pl-2">
              <span className="font-medium">Off-state check</span> - Turn completely off and
              verify no ghost glow from lamps
            </li>
            <li className="pl-2">
              <span className="font-medium">Multiple switching</span> - Rapidly turn on/off
              several times to check for startup issues
            </li>
          </ol>
          <p className="text-white text-sm">
            Document any issues and their solutions for future reference. Inform the client
            if lamp replacement requires matching the original specification for dimmer
            compatibility.
          </p>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-elec-yellow mb-2">{faq.question}</h4>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section Quiz */}
        <section className="mb-10">
          <Quiz
            title="Section 4 Knowledge Check"
            questions={quizQuestions}
            passingScore={80}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="../section-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/80 touch-manipulation"
            asChild
          >
            <Link to="../section-5">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule3Section4;
