import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const RenewableEnergyModule2Section1 = () => {
  useSEO({
    title: "PV Panel Types | Solar PV Fundamentals",
    description: "Understanding monocrystalline, polycrystalline, and thin-film photovoltaic panel technologies and their characteristics."
  });

  const quizQuestions = [
    {
      question: "What is the typical efficiency range for monocrystalline solar panels?",
      options: ["10-14%", "15-18%", "18-22%", "23-28%"],
      correctAnswer: 2,
      explanation: "Monocrystalline panels offer the highest commercially available efficiency at 18-22%."
    },
    {
      question: "Which panel type has a distinctive bluish hue with visible grain patterns?",
      options: ["Monocrystalline", "Polycrystalline", "Amorphous silicon", "CIGS"],
      correctAnswer: 1,
      explanation: "Polycrystalline panels have a distinctive bluish hue with visible grain patterns from multiple silicon crystals."
    },
    {
      question: "What is the temperature coefficient for thin-film panels?",
      options: ["-0.4% to -0.5% per degree C", "-0.45% to -0.5% per degree C", "-0.25% to -0.4% per degree C", "-0.1% to -0.2% per degree C"],
      correctAnswer: 2,
      explanation: "Thin-film panels have the best temperature coefficient at -0.25% to -0.4% per degree C, meaning better high-temperature performance."
    },
    {
      question: "Which thin-film technology offers the highest efficiency?",
      options: ["Amorphous Silicon (a-Si)", "Cadmium Telluride (CdTe)", "CIGS", "All are equal"],
      correctAnswer: 2,
      explanation: "CIGS (Copper Indium Gallium Selenide) offers the highest thin-film efficiency at 10-12%."
    },
    {
      question: "What is the typical degradation rate for monocrystalline panels per year?",
      options: ["0.2-0.3%", "0.4-0.5%", "0.6-0.8%", "1.0-1.2%"],
      correctAnswer: 1,
      explanation: "Monocrystalline panels have excellent degradation rates of 0.4-0.5% per year, maintaining performance longest."
    },
    {
      question: "Which panel type is best suited for limited roof space?",
      options: ["Polycrystalline", "Thin film", "Monocrystalline", "Amorphous silicon"],
      correctAnswer: 2,
      explanation: "Monocrystalline's highest efficiency maximises power output in limited space."
    },
    {
      question: "What technology has 80%+ market adoption for new installations?",
      options: ["Thin film", "PERC technology", "Bifacial panels", "Standard polycrystalline"],
      correctAnswer: 1,
      explanation: "PERC (Passivated Emitter Rear Cell) technology has 80%+ market adoption with minimal cost premium."
    },
    {
      question: "What is the typical bifaciality factor range?",
      options: ["30-50%", "50-70%", "70-95%", "95-100%"],
      correctAnswer: 2,
      explanation: "Bifacial panels have a bifaciality factor of 70-95%, meaning rear-side efficiency is 70-95% of front-side."
    },
    {
      question: "Which certification standards are key quality indicators for panels?",
      options: ["ISO 9001 only", "IEC 61215 and IEC 61730", "CE marking only", "UL certification only"],
      correctAnswer: 1,
      explanation: "IEC 61215 (performance) and IEC 61730 (safety) are the key international standards for PV panel quality."
    },
    {
      question: "What is a typical performance warranty for premium panels?",
      options: ["60% after 20 years", "70% after 25 years", "80% after 25 years", "90% after 30 years"],
      correctAnswer: 2,
      explanation: "Most quality panels offer performance warranties guaranteeing 80% output after 25 years."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Minimal Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 -ml-2" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/10 mb-4">
            <Zap className="w-6 h-6 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            PV Panel Types
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Monocrystalline, Polycrystalline &amp; Thin Film Technologies
          </p>
        </div>

        {/* Quick Summary */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <div className="text-elec-yellow text-xs font-medium uppercase tracking-wide mb-1">Highest Efficiency</div>
            <div className="text-white font-semibold">Monocrystalline 18-22%</div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <div className="text-elec-yellow text-xs font-medium uppercase tracking-wide mb-1">Best Value</div>
            <div className="text-white font-semibold">Polycrystalline 15-18%</div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8 p-4 rounded-lg bg-white/5 border border-white/10">
          <h2 className="text-white font-semibold mb-3">Learning Outcomes</h2>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Distinguish between monocrystalline, polycrystalline, and thin-film technologies</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Evaluate efficiency, cost, and physical characteristics of each type</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Select appropriate panels for different use cases and applications</span>
            </div>
          </div>
        </div>

        {/* Section 01 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Monocrystalline Silicon Panels
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Monocrystalline panels are manufactured from single silicon crystals, offering the highest efficiency and premium performance characteristics. They have a dark black or very dark blue colour with uniform appearance and rounded corners.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Key Characteristics</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Efficiency:</strong> 18-22% (highest)</li>
                  <li>• <strong className="text-white">Temp coefficient:</strong> -0.4% to -0.5%/°C</li>
                  <li>• <strong className="text-white">Lifespan:</strong> 25-30 years</li>
                  <li>• <strong className="text-white">Degradation:</strong> 0.4-0.5%/year</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="text-white font-medium mb-2">Advantages</h4>
                <ul className="text-sm space-y-1">
                  <li>• Space-efficient due to high efficiency</li>
                  <li>• Better low-light performance</li>
                  <li>• Longer warranties</li>
                  <li>• Higher power output per m²</li>
                </ul>
              </div>
            </div>
            <p>
              <strong className="text-white">Best suited for:</strong> Limited roof space, premium residential installations, and applications where space efficiency matters more than upfront cost.
            </p>
          </div>
        </div>

        <InlineCheck
          question="What is the typical efficiency range for monocrystalline panels?"
          options={["10-14%", "15-18%", "18-22%"]}
          correctIndex={2}
          explanation="Monocrystalline panels offer the highest efficiency at 18-22%, making them ideal for space-constrained installations."
        />

        {/* Section 02 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Polycrystalline Silicon Panels
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Polycrystalline panels are made from multiple silicon crystals melted together, offering a balance between cost and performance. They have a distinctive bluish hue with visible grain patterns and square cells with sharp corners.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Key Characteristics</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Efficiency:</strong> 15-18%</li>
                  <li>• <strong className="text-white">Temp coefficient:</strong> -0.45% to -0.5%/°C</li>
                  <li>• <strong className="text-white">Manufacturing:</strong> Less energy-intensive</li>
                  <li>• <strong className="text-white">Degradation:</strong> 0.5-0.6%/year</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="text-white font-medium mb-2">Advantages</h4>
                <ul className="text-sm space-y-1">
                  <li>• Lower cost per watt - budget-friendly</li>
                  <li>• Simpler manufacturing process</li>
                  <li>• Good performance-to-price ratio</li>
                  <li>• Widely available</li>
                </ul>
              </div>
            </div>
            <p>
              <strong className="text-white">Best suited for:</strong> Budget-conscious residential installations, projects with ample roof space, and applications where upfront cost is the primary concern.
            </p>
          </div>
        </div>

        <InlineCheck
          question="Which panel type offers the best balance between cost and performance?"
          options={["Monocrystalline", "Polycrystalline", "Thin film"]}
          correctIndex={1}
          explanation="Polycrystalline panels offer the best cost-performance balance with good efficiency at lower cost per watt."
        />

        {/* Section 03 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Thin Film Technologies
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Thin film panels use different semiconductor materials deposited in thin layers, offering unique advantages for specific applications including flexibility and better high-temperature performance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Amorphous Silicon (a-Si)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Efficiency: 6-8%</li>
                  <li>• Flexible substrate options</li>
                  <li>• Best low-light performance</li>
                  <li>• Lowest manufacturing cost</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Cadmium Telluride (CdTe)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Efficiency: 9-11%</li>
                  <li>• Excellent temp coefficient</li>
                  <li>• Fast energy payback</li>
                  <li>• Utility-scale applications</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">CIGS</h4>
                <ul className="text-sm space-y-1">
                  <li>• Efficiency: 10-12%</li>
                  <li>• Best thin-film efficiency</li>
                  <li>• Flexible and lightweight</li>
                  <li>• Premium thin-film option</li>
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Thin Film Advantages:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong className="text-white">Flexible and lightweight:</strong> Suitable for unconventional installations</li>
                <li>• <strong className="text-white">Better in diffuse light:</strong> Maintains output in cloudy conditions</li>
                <li>• <strong className="text-white">Lower temperature coefficient:</strong> Better high-temperature performance</li>
                <li>• <strong className="text-white">Aesthetic options:</strong> Can be integrated into building materials</li>
              </ul>
            </div>
          </div>
        </div>

        <InlineCheck
          question="Which thin-film technology has the highest efficiency?"
          options={["Amorphous Silicon", "Cadmium Telluride", "CIGS"]}
          correctIndex={2}
          explanation="CIGS (Copper Indium Gallium Selenide) offers the highest thin-film efficiency at 10-12%."
        />

        {/* Section 04 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Performance Factors
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Understanding key performance factors helps select the right panel technology for specific conditions and applications.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="text-white font-medium mb-2">Temperature Coefficients</h4>
                <p className="text-sm mb-2">Percentage decrease in power per °C above 25°C:</p>
                <ul className="text-sm space-y-1">
                  <li>• Monocrystalline: -0.4% to -0.5%/°C</li>
                  <li>• Polycrystalline: -0.45% to -0.5%/°C</li>
                  <li>• Thin film: -0.25% to -0.4%/°C</li>
                </ul>
                <p className="text-elec-yellow text-xs mt-2">Lower = better in hot climates</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="text-white font-medium mb-2">Degradation Rates</h4>
                <p className="text-sm mb-2">Annual reduction in power output:</p>
                <ul className="text-sm space-y-1">
                  <li>• Monocrystalline: 0.4-0.5%/year</li>
                  <li>• Polycrystalline: 0.5-0.6%/year</li>
                  <li>• Thin film: 0.6-0.8%/year</li>
                </ul>
                <p className="text-elec-yellow text-xs mt-2">Lower = better long-term performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 05 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Emerging Technologies
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              The solar industry continues to innovate with new technologies that push efficiency boundaries and reduce costs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">PERC Technology</h4>
                <ul className="text-sm space-y-1">
                  <li>• 1-2% efficiency improvement</li>
                  <li>• 80%+ market adoption</li>
                  <li>• Minimal cost premium</li>
                  <li>• Better low-light response</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Bifacial Panels</h4>
                <ul className="text-sm space-y-1">
                  <li>• Dual-sided generation</li>
                  <li>• 70-95% rear efficiency</li>
                  <li>• 10-30% extra yield</li>
                  <li>• Elevated mounting required</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Half-Cell Technology</h4>
                <ul className="text-sm space-y-1">
                  <li>• Reduced resistive losses</li>
                  <li>• Better shade tolerance</li>
                  <li>• Lower operating temps</li>
                  <li>• 5-10W extra per panel</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 06 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Quality &amp; Warranties
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Panel quality and manufacturer warranties significantly impact long-term system performance and project economics.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="text-white font-medium mb-2">Quality Indicators</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">IEC 61215/61730:</strong> Key certifications</li>
                  <li>• <strong className="text-white">Flash test results:</strong> Power accuracy</li>
                  <li>• <strong className="text-white">Visual inspection:</strong> Cell/solder quality</li>
                  <li>• <strong className="text-white">Mechanical testing:</strong> Hail/wind rated</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="text-white font-medium mb-2">Warranty Structures</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Product:</strong> 10-25 years materials</li>
                  <li>• <strong className="text-white">Performance:</strong> 80% after 25 years</li>
                  <li>• <strong className="text-white">Linear:</strong> ≤0.6%/year degradation</li>
                  <li>• <strong className="text-white">Tier 1:</strong> Bankable manufacturers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Selection Guide */}
        <div className="mb-8 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
          <h3 className="text-white font-semibold mb-3">Panel Selection Guide</h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>
              <strong className="text-white">Limited roof space:</strong> Monocrystalline - highest efficiency maximises power in small areas
            </p>
            <p>
              <strong className="text-white">Budget-conscious residential:</strong> Polycrystalline - best balance of cost and performance
            </p>
            <p>
              <strong className="text-white">Hot climate installations:</strong> Thin film - better temperature coefficient
            </p>
            <p>
              <strong className="text-white">Flexible/curved surfaces:</strong> Thin film - flexible substrate options
            </p>
            <p>
              <strong className="text-white">Utility-scale projects:</strong> Monocrystalline - lowest levelised cost of energy
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Why do monocrystalline panels cost more?</h4>
              <p className="text-white/70 text-sm">Monocrystalline panels require more energy and precision in manufacturing as they use single-crystal silicon. The Czochralski process creates a pure silicon ingot that is then sliced into wafers, which is more complex than polycrystalline production.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">How do I identify panel types visually?</h4>
              <p className="text-white/70 text-sm">Monocrystalline panels are dark black/blue with rounded cell corners. Polycrystalline panels are distinctly blue with visible grain patterns and square cell corners. Thin film panels have a uniform dark appearance without visible cells.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">What makes PERC technology so popular?</h4>
              <p className="text-white/70 text-sm">PERC adds a passivation layer to the rear of cells, improving light capture and efficiency by 1-2% with minimal cost increase. This makes it the default choice for most new installations.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">When should I choose thin film panels?</h4>
              <p className="text-white/70 text-sm">Choose thin film for hot climates (better temperature coefficient), flexible/curved surfaces, building-integrated applications (BIPV), or when consistent diffuse light performance matters more than peak output.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">What is a Tier 1 manufacturer?</h4>
              <p className="text-white/70 text-sm">Bloomberg NEF classifies Tier 1 manufacturers based on bankability - whether development banks will finance projects using their panels. This indicates financial stability, quality control, and long-term warranty reliability.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">How much extra yield do bifacial panels provide?</h4>
              <p className="text-white/70 text-sm">Bifacial panels can provide 10-30% additional energy yield depending on mounting height, ground reflectivity (albedo), and installation angle. They work best over light-coloured surfaces with elevated mounting.</p>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <div className="mb-8">
          <Quiz
            title="Section 1 Quiz: PV Panel Types"
            questions={quizQuestions}
            passingScore={70}
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold" asChild>
            <Link to="../section-2">
              Next Section
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule2Section1;
