import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Interference, Channels, and Bandwidth";
const DESCRIPTION = "Managing signal interference and channel allocation in smart home networks";

const quickCheckQuestions = [
  {
    question: "What is the main cause of interference between Zigbee and Wi-Fi?",
    options: ["They use the same encryption", "They operate on the same 2.4 GHz frequency", "They have similar data rates", "They use the same hub"],
    correctIndex: 1,
    explanation: "Both Zigbee and Wi-Fi can operate on the 2.4 GHz frequency band, which means they can interfere with each other when using overlapping channels."
  },
  {
    question: "Which Wi-Fi channels are recommended when using Zigbee?",
    options: ["Any channel is fine", "Channels 1, 6, or 11 with Zigbee on non-overlapping channels", "Only channel 13", "Wi-Fi must be disabled"],
    correctIndex: 1,
    explanation: "Using Wi-Fi channels 1, 6, or 11 (which do not overlap) and positioning Zigbee on channels that avoid these frequencies minimises interference."
  },
  {
    question: "What is a practical first step when troubleshooting wireless interference?",
    options: ["Replace all devices", "Use a Wi-Fi analyser app", "Increase transmit power", "Change to wired connections"],
    correctIndex: 1,
    explanation: "A Wi-Fi analyser app helps identify which channels are congested and where interference is occurring, allowing targeted solutions rather than guesswork."
  }
];

const quizQuestions = [
  {
    question: "Why does Z-Wave experience less interference from Wi-Fi than Zigbee?",
    options: ["Z-Wave uses stronger encryption", "Z-Wave operates on sub-GHz frequencies", "Z-Wave has a lower data rate", "Z-Wave uses mesh networking"],
    correctIndex: 1,
    explanation: "Z-Wave operates at 868 MHz (UK), well separated from the 2.4 GHz band used by Wi-Fi, eliminating frequency overlap interference."
  },
  {
    question: "What common household item can cause 2.4 GHz interference?",
    options: ["LED bulbs", "Microwave ovens", "Refrigerators", "Washing machines"],
    correctIndex: 1,
    explanation: "Microwave ovens operate at 2.4 GHz and can leak RF energy, causing significant interference with Wi-Fi and Zigbee devices nearby."
  },
  {
    question: "How many non-overlapping channels exist in the 2.4 GHz Wi-Fi band?",
    options: ["11", "6", "3", "13"],
    correctIndex: 2,
    explanation: "Only channels 1, 6, and 11 are truly non-overlapping in the 2.4 GHz band. Other channels partially overlap with their neighbours."
  },
  {
    question: "What is the recommended minimum distance between a Zigbee hub and a Wi-Fi router?",
    options: ["10 cm", "30 cm", "1 metre", "3 metres"],
    correctIndex: 2,
    explanation: "Keeping Zigbee hubs at least 1 metre from Wi-Fi routers helps reduce direct interference between the devices."
  },
  {
    question: "Which tool can help identify wireless interference issues?",
    options: ["Multimeter", "Spectrum analyser", "Oscilloscope", "Clamp meter"],
    correctIndex: 1,
    explanation: "A spectrum analyser (or Wi-Fi analyser app) shows RF activity across frequency bands, revealing interference sources and congested channels."
  }
];

const faqs = [
  {
    question: "Can I have too many smart home devices on one network?",
    answer: "Yes. Zigbee networks can become sluggish with over 50 devices without adequate routers. Wi-Fi networks may struggle with 30+ devices depending on router capability. Plan mesh extenders and router capacity accordingly."
  },
  {
    question: "My smart devices work intermittently. How do I diagnose interference?",
    answer: "Use a Wi-Fi analyser to check channel congestion. Note if issues occur near microwaves or baby monitors. Check if problems correlate with neighbour activity. Try moving the hub or changing channels systematically."
  },
  {
    question: "Should I use 5 GHz Wi-Fi for smart home devices?",
    answer: "Most smart home devices only support 2.4 GHz due to better range and wall penetration. However, moving laptops and phones to 5 GHz reduces congestion on the 2.4 GHz band, benefiting smart devices."
  }
];

const SmartHomeModule2Section4 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 2`,
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
          <span className="text-sm text-white">Section 4 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header - Title Centred Only */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Module 2 - Section 4
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-lg">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Key Challenge</p>
            <p className="text-white text-sm">2.4 GHz congestion from Wi-Fi, Zigbee, Bluetooth, and appliances</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Solution Approach</p>
            <p className="text-white text-sm">Strategic channel selection and device placement</p>
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
              "Understand sources of wireless interference in smart homes",
              "Explain channel allocation for Wi-Fi and Zigbee",
              "Apply interference mitigation strategies",
              "Troubleshoot connectivity issues caused by interference"
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span className="text-white">{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Understanding Interference */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Understanding Wireless Interference
          </h2>
          <p className="text-white mb-4">
            Wireless interference occurs when multiple devices transmit on the same or nearby frequencies, causing signal collisions, packet loss, and reduced performance. In smart homes, the 2.4 GHz band is particularly congested.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Co-Channel Interference</p>
              <p className="text-white text-sm">Multiple devices using the exact same channel compete for airtime, causing delays and retransmissions.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Adjacent Channel Interference</p>
              <p className="text-white text-sm">Devices on neighbouring channels can overlap and cause partial interference, degrading signal quality.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Non-Wi-Fi Interference</p>
              <p className="text-white text-sm">Microwave ovens, baby monitors, cordless phones, and Bluetooth devices can all generate 2.4 GHz interference.</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Practical Insight</p>
            <p className="text-white text-sm">Dense housing (flats, terraces) often experiences significant interference from neighbouring networks. Survey the RF environment before specifying devices.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Wi-Fi Channels */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Wi-Fi Channel Allocation
          </h2>
          <p className="text-white mb-4">
            The 2.4 GHz Wi-Fi band contains 13 channels in the UK, but each channel is 20 MHz wide with only 5 MHz spacing between channel centres. This means most channels overlap with their neighbours.
          </p>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 mb-4">
            <p className="text-white font-semibold mb-2">Non-Overlapping Channels</p>
            <p className="text-white text-sm mb-2">Only three channels do not overlap: <span className="text-elec-yellow font-semibold">1, 6, and 11</span></p>
            <p className="text-white text-sm">In the UK, some also use channel 13, but device support varies. Stick to 1, 6, or 11 for maximum compatibility.</p>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Channel Selection Strategy</p>
              <p className="text-white text-sm">Use a Wi-Fi analyser to identify the least congested channel. Choose the channel with fewest strong signals.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Avoid Auto-Channel</p>
              <p className="text-white text-sm">Many routers default to auto-channel selection, which may not account for Zigbee devices. Manual selection often performs better.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Zigbee and Wi-Fi Coexistence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Zigbee and Wi-Fi Coexistence
          </h2>
          <p className="text-white mb-4">
            Zigbee operates on 16 channels (11-26) in the 2.4 GHz band. These channels overlap with Wi-Fi channels, requiring careful planning when both technologies are deployed together.
          </p>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-4">
            <p className="text-sm font-medium text-elec-yellow mb-1">Recommended Configuration</p>
            <p className="text-white text-sm">Wi-Fi on channel 1: Use Zigbee channels 15, 20, 25, or 26. Wi-Fi on channel 6: Use Zigbee channels 11, 20, 25, or 26. Wi-Fi on channel 11: Use Zigbee channels 11, 15, or 20.</p>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Physical Separation</p>
              <p className="text-white text-sm">Keep Zigbee coordinators at least 1-2 metres from Wi-Fi routers to reduce direct interference coupling.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Avoid USB Ports</p>
              <p className="text-white text-sm">USB 3.0 ports emit 2.4 GHz interference. If using a USB Zigbee dongle, use an extension cable to distance it from the computer.</p>
            </div>
          </div>
        </section>

        {/* Bandwidth Considerations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Bandwidth Considerations
          </h2>
          <p className="text-white mb-4">
            Different smart home applications have varying bandwidth requirements. Understanding these helps in protocol selection and network design.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Low Bandwidth (under 100 kbps)</p>
              <p className="text-white text-sm">Sensors, switches, thermostats. Zigbee and Z-Wave are ideal for these devices.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">Medium Bandwidth (100 kbps - 1 Mbps)</p>
              <p className="text-white text-sm">Smart speakers, basic audio streaming. Wi-Fi or Bluetooth typically required.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-white font-medium mb-1">High Bandwidth (1+ Mbps)</p>
              <p className="text-white text-sm">Video cameras, smart displays, video doorbells. Requires Wi-Fi or Ethernet.</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Planning Note</p>
            <p className="text-white text-sm">A single 4K video stream requires approximately 15-25 Mbps. Multiple cameras can quickly consume available bandwidth, especially on 2.4 GHz networks.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Mitigation Strategies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Interference Mitigation Strategies
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">1. Survey Before Installing</h3>
              <p className="text-white text-sm">Use a Wi-Fi analyser app to map existing networks and identify congested areas before recommending smart home devices.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">2. Strategic Hub Placement</h3>
              <p className="text-white text-sm">Place Zigbee/Z-Wave hubs centrally in the home, away from Wi-Fi routers, microwaves, and other interference sources.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">3. Use 5 GHz Where Possible</h3>
              <p className="text-white text-sm">Move phones, laptops, and tablets to 5 GHz Wi-Fi, reserving 2.4 GHz for devices that require it.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">4. Add Mesh Repeaters</h3>
              <p className="text-white text-sm">More Zigbee/Z-Wave routers provide alternative signal paths, reducing impact of localised interference.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">5. Consider Z-Wave</h3>
              <p className="text-white text-sm">For interference-prone environments, Z-Wave's sub-GHz operation completely avoids 2.4 GHz congestion.</p>
            </div>
          </div>
        </section>

        {/* Troubleshooting Guide */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Practical Troubleshooting
          </h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white font-semibold mb-3">Systematic Approach to Connectivity Issues</p>
            <ol className="text-white text-sm space-y-3">
              <li><span className="text-elec-yellow font-semibold">Step 1:</span> Document when issues occur (time, location, pattern)</li>
              <li><span className="text-elec-yellow font-semibold">Step 2:</span> Use a Wi-Fi analyser to scan the environment</li>
              <li><span className="text-elec-yellow font-semibold">Step 3:</span> Check for interference sources (microwaves, baby monitors)</li>
              <li><span className="text-elec-yellow font-semibold">Step 4:</span> Review channel settings on Wi-Fi and Zigbee</li>
              <li><span className="text-elec-yellow font-semibold">Step 5:</span> Test with devices moved closer to the hub</li>
              <li><span className="text-elec-yellow font-semibold">Step 6:</span> Add repeaters or change protocol if issues persist</li>
            </ol>
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
            <Link to="../section-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation" asChild>
            <Link to="../section-5">
              Next Section
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule2Section4;
