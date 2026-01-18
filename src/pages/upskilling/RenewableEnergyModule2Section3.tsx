import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const RenewableEnergyModule2Section3 = () => {
  useSEO({
    title: "String Design & Voltage Matching | Solar PV Fundamentals",
    description: "Designing solar panel strings and matching system voltages for optimal performance and safety."
  });

  const quizQuestions = [
    {
      question: "What does VOC stand for in panel specifications?",
      options: ["Voltage Output Current", "Open Circuit Voltage", "Voltage Overcurrent", "Optimal Circuit Voltage"],
      correctAnswer: 1,
      explanation: "VOC is Open Circuit Voltage - the maximum voltage a panel produces with no load connected."
    },
    {
      question: "What is the typical residential MPPT voltage range?",
      options: ["50V to 200V", "125V to 600V", "300V to 800V", "500V to 1000V"],
      correctAnswer: 1,
      explanation: "Typical residential inverters have MPPT ranges of 125V to 600V."
    },
    {
      question: "What happens to panel voltage in cold weather?",
      options: ["Decreases significantly", "Stays the same", "Increases significantly", "Becomes unstable"],
      correctAnswer: 2,
      explanation: "Cold weather causes voltage to increase significantly - this is why string design must account for lowest expected temperatures."
    },
    {
      question: "What is the typical temperature coefficient for panel voltage?",
      options: ["-0.1% per degree C", "-0.4% per degree C", "-0.8% per degree C", "-1.2% per degree C"],
      correctAnswer: 1,
      explanation: "Typical temperature coefficient is around -0.4% per degree C, meaning voltage decreases 0.4% for every degree above 25 degrees C."
    },
    {
      question: "In a series connection, what adds together?",
      options: ["Current only", "Voltage only", "Both voltage and current", "Neither"],
      correctAnswer: 1,
      explanation: "In series connections, voltages add together while current remains the same as individual panels."
    },
    {
      question: "What is the UK maximum system voltage for LV installations?",
      options: ["600V", "800V", "1000V", "1500V"],
      correctAnswer: 2,
      explanation: "UK regulations specify 1000V as the maximum system voltage for LV (low voltage) PV installations."
    },
    {
      question: "What safety margin should be left on maximum voltage design?",
      options: ["5%", "10%", "15%", "20%"],
      correctAnswer: 1,
      explanation: "A 10% safety margin is recommended - designing for 900V maximum when 1000V is the limit."
    },
    {
      question: "Which configuration gives independent string performance?",
      options: ["Series only", "Parallel", "Mixed", "Single panel"],
      correctAnswer: 1,
      explanation: "Parallel connections allow each string to perform independently - one underperforming string does not affect others."
    },
    {
      question: "What is a common cause of undervoltage problems?",
      options: ["Too few panels per string", "Too many panels per string", "Using different panel types", "Incorrect fusing"],
      correctAnswer: 0,
      explanation: "Too few panels per string causes string VMP to fall below MPPT minimum, especially in hot weather."
    },
    {
      question: "What tool provides professional PV system design capabilities?",
      options: ["Excel only", "PVsyst", "Basic calculator", "Smartphone app only"],
      correctAnswer: 1,
      explanation: "PVsyst is industry-standard professional software for PV system design, simulation, and yield prediction."
    }
  ];

  return (
    <div className="bg-[#1a1a1a]">
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
            String Design &amp; Voltage Matching
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Panel Sizing for Safety &amp; Performance
          </p>
        </div>

        {/* Quick Summary */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <div className="text-elec-yellow text-xs font-medium uppercase tracking-wide mb-1">Max System Voltage</div>
            <div className="text-white font-semibold">1000V (UK LV)</div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <div className="text-elec-yellow text-xs font-medium uppercase tracking-wide mb-1">Safety Margin</div>
            <div className="text-white font-semibold">Design for 900V</div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8 p-4 rounded-lg bg-white/5 border border-white/10">
          <h2 className="text-white font-semibold mb-3">Learning Outcomes</h2>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Calculate string voltages and currents for safe system operation</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Understand inverter input requirements and MPPT windows</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Avoid mismatch and overvoltage issues through proper design</span>
            </div>
          </div>
        </div>

        {/* Section 01 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Panel Electrical Parameters
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Every solar panel has key electrical specifications that determine how it can be connected and what performance to expect. Electrical compatibility starts at the design table - do not mismatch your string and inverter specifications.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Voltage Parameters</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">VOC:</strong> Open Circuit Voltage (~45V)</li>
                  <li>• <strong className="text-white">VMP:</strong> Max Power Voltage (~37V)</li>
                  <li>• <strong className="text-white">Temp effect:</strong> Decreases with heat</li>
                  <li>• <strong className="text-white">Design key:</strong> VOC sets string limits</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Current Parameters</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">ISC:</strong> Short Circuit Current (~11A)</li>
                  <li>• <strong className="text-white">IMP:</strong> Max Power Current (~10A)</li>
                  <li>• <strong className="text-white">Temp effect:</strong> Slightly increases</li>
                  <li>• <strong className="text-white">Design key:</strong> ISC sets fusing</li>
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Standard Test Conditions (STC):</h4>
              <p className="text-sm">All panel ratings are given at STC: 1000 W/m² irradiance, 25°C cell temperature, AM 1.5 spectrum. Real-world conditions vary significantly from STC.</p>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What does VOC stand for in panel specifications?"
          options={["Voltage Output Current", "Open Circuit Voltage", "Voltage Overcurrent"]}
          correctIndex={1}
          explanation="VOC is Open Circuit Voltage - the maximum voltage a panel produces with no load connected."
        />

        {/* Section 02 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            String Length &amp; MPPT Windows
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              String design must keep voltages within the inverter's MPPT (Maximum Power Point Tracking) window under all operating conditions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">MPPT Requirements</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Minimum:</strong> String VMP &gt; MPPT min</li>
                  <li>• <strong className="text-white">Maximum:</strong> String VOC &lt; MPPT max</li>
                  <li>• <strong className="text-white">Residential:</strong> 125V to 600V typical</li>
                  <li>• <strong className="text-white">Commercial:</strong> 250V to 1000V</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">String Length Calculation</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Min panels:</strong> MPPT min ÷ Panel VMP</li>
                  <li>• <strong className="text-white">Max panels:</strong> MPPT max ÷ Panel VOC</li>
                  <li>• <strong className="text-white">Example:</strong> 600V ÷ 45V = 13 max</li>
                  <li>• <strong className="text-white">Safety:</strong> Leave 10% buffer</li>
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Design Example (400W Panels):</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                  <span>8 panels: VMP 296V, VOC 360V</span>
                  <span className="text-green-400">Within MPPT</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                  <span>12 panels: VMP 444V, VOC 540V</span>
                  <span className="text-green-400">Within MPPT</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                  <span>15 panels: VMP 555V, VOC 675V</span>
                  <span className="text-red-400">Exceeds max</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What is the typical residential MPPT voltage range?"
          options={["50V to 200V", "125V to 600V", "500V to 1000V"]}
          correctIndex={1}
          explanation="Typical residential inverters have MPPT ranges of 125V to 600V."
        />

        {/* Section 03 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Series vs Parallel Configurations
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Understanding how panels combine electrically is fundamental to system design and troubleshooting.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Series Connection</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Voltage:</strong> Adds together</li>
                  <li>• <strong className="text-white">Current:</strong> Same as individual</li>
                  <li>• <strong className="text-white">Advantage:</strong> Lower current losses</li>
                  <li>• <strong className="text-white">Risk:</strong> Worst panel limits string</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Parallel Connection</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Voltage:</strong> Same as individual</li>
                  <li>• <strong className="text-white">Current:</strong> Adds together</li>
                  <li>• <strong className="text-white">Advantage:</strong> Independent strings</li>
                  <li>• <strong className="text-white">Risk:</strong> Larger conductors needed</li>
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Series String Considerations:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong className="text-white">Shading:</strong> One shaded panel reduces entire string</li>
                <li>• <strong className="text-white">Matching:</strong> Use panels from same batch/manufacturer</li>
                <li>• <strong className="text-white">Bypass diodes:</strong> Minimise series shading losses</li>
                <li>• <strong className="text-white">Safety:</strong> Higher voltages require extra precautions</li>
              </ul>
            </div>
          </div>
        </div>

        <InlineCheck
          question="In a series connection, what adds together?"
          options={["Current only", "Voltage only", "Both voltage and current"]}
          correctIndex={1}
          explanation="In series connections, voltages add together while current remains the same as individual panels."
        />

        {/* Section 04 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Temperature Effects on Voltage
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Temperature significantly affects panel voltage, requiring careful consideration in string design to avoid overvoltage conditions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Temperature Effects</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Cold:</strong> Voltage increases</li>
                  <li>• <strong className="text-white">Hot:</strong> Voltage decreases</li>
                  <li>• <strong className="text-white">Coefficient:</strong> Typically -0.4%/°C</li>
                  <li>• <strong className="text-white">UK winter:</strong> -10°C to -15°C possible</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Voltage Calculation</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Formula:</strong> V(temp) = V(STC) x factor</li>
                  <li>• <strong className="text-white">Factor:</strong> [1 + (T - 25) x coeff]</li>
                  <li>• <strong className="text-white">Example:</strong> 45V at -10°C = 51.3V</li>
                  <li className="text-elec-yellow">14% voltage increase in cold!</li>
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Maximum System Voltage:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong className="text-white">UK regulations:</strong> 1000V max for LV installations</li>
                <li>• <strong className="text-white">Safety margin:</strong> Design for 900V maximum</li>
                <li>• <strong className="text-white">Components:</strong> All DC parts rated for system voltage</li>
                <li>• <strong className="text-white">String fusing:</strong> Required for parallel strings</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 05 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Design Tools &amp; Validation
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Professional design tools and proper datasheet interpretation are essential for accurate string sizing and system design.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Design Software</h4>
                <ul className="text-sm space-y-1">
                  <li>• PVsyst (professional)</li>
                  <li>• Aurora Solar</li>
                  <li>• SolarEdge Designer</li>
                  <li>• Helioscope</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Datasheet Parameters</h4>
                <ul className="text-sm space-y-1">
                  <li>• VOC, VMP, ISC, IMP</li>
                  <li>• Temperature coefficients</li>
                  <li>• Power tolerances</li>
                  <li>• Certifications</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Validation Checks</h4>
                <ul className="text-sm space-y-1">
                  <li>• All temp conditions</li>
                  <li>• Current limits</li>
                  <li>• Power matching</li>
                  <li>• Safety factors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
          <h3 className="text-white font-semibold mb-3">Common Design Mistakes to Avoid</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="text-red-400 font-medium mb-2">Overvoltage Issues</h4>
              <ul className="text-white/70 space-y-1">
                <li>• Not accounting for cold temperature rise</li>
                <li>• Exceeding inverter max input voltage</li>
                <li>• Inadequate safety margins</li>
              </ul>
            </div>
            <div>
              <h4 className="text-red-400 font-medium mb-2">Undervoltage Problems</h4>
              <ul className="text-white/70 space-y-1">
                <li>• String voltage below MPPT min (hot)</li>
                <li>• Poor hot weather performance</li>
                <li>• Inverter cannot start in low light</li>
              </ul>
            </div>
            <div>
              <h4 className="text-red-400 font-medium mb-2">Panel Mismatch</h4>
              <ul className="text-white/70 space-y-1">
                <li>• Mixing different panel models</li>
                <li>• Different orientations in same string</li>
                <li>• Ignoring tolerance variations</li>
              </ul>
            </div>
            <div>
              <h4 className="text-red-400 font-medium mb-2">Current Oversizing</h4>
              <ul className="text-white/70 space-y-1">
                <li>• Too many parallel strings</li>
                <li>• Inadequate DC conductor sizing</li>
                <li>• Missing or undersized fusing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Practical Guidance */}
        <div className="mb-8 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
          <h3 className="text-white font-semibold mb-3">Practical Guidance</h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>
              <strong className="text-white">Multi-orientation systems:</strong> Never mix orientations in the same string - use separate MPPT inputs for each orientation.
            </p>
            <p>
              <strong className="text-white">Power optimisers:</strong> Consider for shaded sites - panel-level MPPT provides 15-25% premium but excellent shade tolerance.
            </p>
            <p>
              <strong className="text-white">String matching:</strong> Always use panels from the same batch/manufacturer in each string to minimise mismatch losses.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Why does cold weather increase voltage?</h4>
              <p className="text-white/70 text-sm">Solar cells are semiconductors - lower temperatures reduce electron movement resistance, increasing voltage output. This is why string design must account for coldest expected temperatures to avoid overvoltage.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">What happens if string voltage exceeds MPPT maximum?</h4>
              <p className="text-white/70 text-sm">The inverter may shut down to protect itself, or in worst cases suffer damage. Most modern inverters have overvoltage protection, but consistent operation above limits reduces lifespan and voids warranties.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Can I mix different wattage panels in a string?</h4>
              <p className="text-white/70 text-sm">Generally not recommended. The string current is limited by the lowest-current panel, and voltage differences can cause mismatch losses. If unavoidable, use power optimisers to mitigate losses.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">When do I need string fuses?</h4>
              <p className="text-white/70 text-sm">String fuses are typically required when three or more strings are connected in parallel to the same inverter input. They protect against reverse current flow from other strings if one string develops a fault.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">What is oversizing and when should I use it?</h4>
              <p className="text-white/70 text-sm">Oversizing means installing more panel capacity than inverter rating (e.g., 6kWp panels on 5kW inverter). This improves yield during non-peak hours but clips output at peak. Typically 10-30% oversizing is beneficial.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">How do I troubleshoot underperforming strings?</h4>
              <p className="text-white/70 text-sm">Use a DC clamp meter to measure string current and multimeter for voltage. Compare against expected values from datasheets. Thermal cameras can identify hot spots. I-V curve tracers provide detailed panel analysis.</p>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <div className="mb-8">
          <Quiz
            title="Section 3 Quiz: String Design"
            questions={quizQuestions}
            passingScore={70}
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10" asChild>
            <Link to="../section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold" asChild>
            <Link to="../section-4">
              Next Section
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule2Section3;
