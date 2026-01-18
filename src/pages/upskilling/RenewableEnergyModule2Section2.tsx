import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const RenewableEnergyModule2Section2 = () => {
  useSEO({
    title: "Site Assessment | Solar PV Fundamentals",
    description: "Evaluating site conditions for optimal solar PV system performance - orientation, shading, and irradiance analysis."
  });

  const quizQuestions = [
    {
      question: "What is the optimal panel orientation in the UK?",
      options: ["East (90 degrees)", "South (180 degrees)", "West (270 degrees)", "North (0 degrees)"],
      correctAnswer: 1,
      explanation: "South-facing (180 degrees) provides maximum annual energy yield in the UK."
    },
    {
      question: "What percentage of optimal performance can south-east facing panels achieve?",
      options: ["70-80%", "85-90%", "95-98%", "100%"],
      correctAnswer: 2,
      explanation: "South-east (135 degrees) or south-west (225 degrees) facing panels achieve 95-98% of optimal performance."
    },
    {
      question: "What is the optimal tilt angle range for most UK locations?",
      options: ["15-25 degrees", "30-45 degrees", "50-60 degrees", "60-75 degrees"],
      correctAnswer: 1,
      explanation: "Most UK locations (51-56 degrees latitude) require 30-45 degree tilt for optimal year-round performance."
    },
    {
      question: "What can single cell shading reduce entire string output by?",
      options: ["5-10%", "15-25%", "30-50%", "60-80%"],
      correctAnswer: 2,
      explanation: "Due to the series-connected nature of solar cells, single cell shading can reduce entire string output by 30-50%."
    },
    {
      question: "What is Global Horizontal Irradiance (GHI)?",
      options: ["Direct sunlight only", "Scattered light only", "Total solar radiation on horizontal surface", "Radiation on tilted surface"],
      correctAnswer: 2,
      explanation: "GHI is the total solar radiation received on a horizontal surface, combining direct and diffuse components."
    },
    {
      question: "What is the typical annual GHI range in the UK?",
      options: ["600-800 kWh/m squared", "950-1,200 kWh/m squared", "1,400-1,600 kWh/m squared", "1,800-2,000 kWh/m squared"],
      correctAnswer: 1,
      explanation: "UK annual GHI ranges from 950-1,200 kWh/m squared, varying by region."
    },
    {
      question: "What tool provides dome-based shading analysis?",
      options: ["PVsyst", "Solar pathfinder", "PVGIS", "SketchUp"],
      correctAnswer: 1,
      explanation: "Solar pathfinder is a manual tool using a dome for visual shading analysis throughout the year."
    },
    {
      question: "What is the typical yield in kWh/kWp for South-West England?",
      options: ["750-850", "850-950", "950-1,050", "1,100-1,200"],
      correctAnswer: 2,
      explanation: "South-West England typically achieves 950-1,050 kWh/kWp due to higher irradiance and marine climate."
    },
    {
      question: "How much higher can urban temperatures be due to heat island effect?",
      options: ["0.5-1 degree C", "2-5 degrees C", "7-10 degrees C", "15-20 degrees C"],
      correctAnswer: 1,
      explanation: "Urban heat island effect can raise temperatures 2-5 degrees C higher than surrounding rural areas."
    },
    {
      question: "What accuracy can LiDAR technology achieve for measurements?",
      options: ["Plus or minus 10cm", "Plus or minus 5cm", "Plus or minus 2cm", "Plus or minus 0.5cm"],
      correctAnswer: 2,
      explanation: "LiDAR technology provides measurement precision of plus or minus 2cm for site surveys."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Minimal Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 -ml-2" asChild>
            <Link to="..">
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
            Site Assessment
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Orientation, Shading &amp; Irradiance Analysis
          </p>
        </div>

        {/* Quick Summary */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <div className="text-elec-yellow text-xs font-medium uppercase tracking-wide mb-1">Optimal Orientation</div>
            <div className="text-white font-semibold">South (180°)</div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <div className="text-elec-yellow text-xs font-medium uppercase tracking-wide mb-1">Optimal Tilt (UK)</div>
            <div className="text-white font-semibold">30-45°</div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8 p-4 rounded-lg bg-white/5 border border-white/10">
          <h2 className="text-white font-semibold mb-3">Learning Outcomes</h2>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Understand sun-path, azimuth, and tilt angles for optimal positioning</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Identify and quantify shading risks throughout the year</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Use irradiance data for accurate yield estimates</span>
            </div>
          </div>
        </div>

        {/* Section 01 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Optimal Orientation &amp; Azimuth
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Panel orientation is critical for maximising solar energy capture. In the UK, south-facing installations typically provide optimal performance. A great panel in the wrong location is a poor investment.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">UK Optimal Orientations</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">South (180°):</strong> Maximum annual yield</li>
                  <li>• <strong className="text-white">SE/SW (135°/225°):</strong> 95-98% performance</li>
                  <li>• <strong className="text-white">East/West (90°/270°):</strong> 85-90%</li>
                  <li>• <strong className="text-white">North:</strong> Not recommended</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="text-white font-medium mb-2">Azimuth Impact</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">0° (true south):</strong> Optimal</li>
                  <li>• <strong className="text-white">±30°:</strong> &lt;5% loss</li>
                  <li>• <strong className="text-white">±60°:</strong> 10-15% loss</li>
                  <li>• <strong className="text-white">±90°:</strong> 20-25% loss</li>
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Special Considerations:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong className="text-white">Time-of-use tariffs:</strong> West-facing may benefit evening peak rates</li>
                <li>• <strong className="text-white">Self-consumption:</strong> East-facing captures morning usage</li>
                <li>• <strong className="text-white">Ground-mount:</strong> Can achieve optimal regardless of building</li>
              </ul>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What is the optimal panel orientation in the UK?"
          options={["East (90 degrees)", "South (180 degrees)", "West (270 degrees)"]}
          correctIndex={1}
          explanation="South-facing (180 degrees) provides maximum annual energy yield in the UK."
        />

        {/* Section 02 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Tilt Angles by Latitude
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              The tilt angle determines how much solar irradiance panels receive throughout the year. Optimal angles vary by latitude and seasonal preferences.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">UK Tilt Recommendations</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">London (51.5°N):</strong> 35-40°</li>
                  <li>• <strong className="text-white">Birmingham (52.5°N):</strong> 35-40°</li>
                  <li>• <strong className="text-white">Manchester (53.5°N):</strong> 35-40°</li>
                  <li>• <strong className="text-white">Edinburgh (55.9°N):</strong> 40-45°</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Seasonal Optimisation</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Summer optimal:</strong> Latitude - 20°</li>
                  <li>• <strong className="text-white">Winter optimal:</strong> Latitude + 15°</li>
                  <li>• <strong className="text-white">Year-round:</strong> Latitude (51-56°)</li>
                  <li>• <strong className="text-white">Practical:</strong> 30-50° works well</li>
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Tilt Angle Effects:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong className="text-white">Too low (&lt;25°):</strong> Reduced winter performance, dirt accumulation</li>
                <li>• <strong className="text-white">Optimal (30-45°):</strong> Maximum yield, self-cleaning rain effect</li>
                <li>• <strong className="text-white">Too high (&gt;60°):</strong> Reduced summer performance, wind loading</li>
              </ul>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What is the optimal tilt angle range for most UK locations?"
          options={["15-25 degrees", "30-45 degrees", "50-60 degrees"]}
          correctIndex={1}
          explanation="Most UK locations benefit from 30-45 degree tilt angles for optimal year-round performance."
        />

        {/* Section 03 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Shading Analysis
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Shading is one of the most critical factors affecting PV system performance. Even partial shading can dramatically reduce output due to the series-connected nature of solar cells.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Common Shading Sources</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Buildings:</strong> Chimneys, dormers</li>
                  <li>• <strong className="text-white">Vegetation:</strong> Trees (future growth)</li>
                  <li>• <strong className="text-white">Infrastructure:</strong> Pylons, poles</li>
                  <li>• <strong className="text-white">Roof features:</strong> Vents, dishes</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Seasonal Impact</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Winter:</strong> Sun lower, longer shadows</li>
                  <li>• <strong className="text-white">Summer:</strong> Sun higher, shorter shadows</li>
                  <li>• <strong className="text-white">Critical times:</strong> 9am-3pm</li>
                  <li>• <strong className="text-white">Deciduous trees:</strong> Summer shade only</li>
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Shading Impact on Performance:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="mb-1"><strong className="text-white">Single cell shading:</strong></p>
                  <p>Can reduce string output by 30-50%</p>
                </div>
                <div>
                  <p className="mb-1"><strong className="text-white">Panel corner shading:</strong></p>
                  <p>May reduce panel output by 50-80%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What can single cell shading reduce entire string output by?"
          options={["5-10%", "15-25%", "30-50%"]}
          correctIndex={2}
          explanation="Due to the series-connected nature of solar cells, single cell shading can reduce entire string output by 30-50%."
        />

        {/* Section 04 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Analysis Tools &amp; Techniques
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Various tools and methods are available for conducting thorough site assessments, from simple manual instruments to sophisticated software simulation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Manual Tools</h4>
                <ul className="text-sm space-y-1">
                  <li>• Solar pathfinder</li>
                  <li>• Sun-eye digital</li>
                  <li>• Compass (azimuth)</li>
                  <li>• Inclinometer (tilt)</li>
                  <li>• Irradiance meter</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Software Tools</h4>
                <ul className="text-sm space-y-1">
                  <li>• PVsyst (professional)</li>
                  <li>• PVWatts (NREL)</li>
                  <li>• SketchUp + plugins</li>
                  <li>• PVGIS (EU tool)</li>
                  <li>• Aurora Solar</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Satellite-Based</h4>
                <ul className="text-sm space-y-1">
                  <li>• Google Sunroof</li>
                  <li>• LiDAR mapping</li>
                  <li>• Satellite imagery</li>
                  <li>• GIS mapping</li>
                  <li>• Drone surveys</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 05 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Irradiance &amp; Solar Resource Data
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Solar irradiance data is fundamental for accurate energy yield predictions and system sizing calculations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Types of Solar Radiation</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">DNI:</strong> Direct Normal Irradiance</li>
                  <li>• <strong className="text-white">DHI:</strong> Diffuse Horizontal</li>
                  <li>• <strong className="text-white">GHI:</strong> Global Horizontal</li>
                  <li>• <strong className="text-white">GTI:</strong> Global Tilted</li>
                  <li>• <strong className="text-white">POA:</strong> Plane of Array</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">UK Solar Resource</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Annual GHI:</strong> 950-1,200 kWh/m²</li>
                  <li>• <strong className="text-white">South England:</strong> 1,100-1,200</li>
                  <li>• <strong className="text-white">North Scotland:</strong> 900-1,000</li>
                  <li>• <strong className="text-white">Peak:</strong> May-July (150+ kWh/m²)</li>
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Key Metrics:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong className="text-white">Peak Sun Hours (PSH):</strong> Equivalent hours of 1,000 W/m² per day</li>
                <li>• <strong className="text-white">STC:</strong> Standard Test Conditions - 1,000 W/m², 25°C, AM 1.5</li>
                <li>• <strong className="text-white">Performance Ratio:</strong> Actual vs theoretical output</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 06 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Regional Performance Variations
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Local weather patterns and microclimates can significantly impact PV system performance beyond regional averages.
            </p>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 flex justify-between items-center">
                <span className="text-white font-medium">South-West England</span>
                <span className="text-sm">950-1,050 kWh/kWp</span>
              </div>
              <div className="p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 flex justify-between items-center">
                <span className="text-white font-medium">London/South-East</span>
                <span className="text-sm">900-1,000 kWh/kWp</span>
              </div>
              <div className="p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 flex justify-between items-center">
                <span className="text-white font-medium">Central England</span>
                <span className="text-sm">850-950 kWh/kWp</span>
              </div>
              <div className="p-3 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 flex justify-between items-center">
                <span className="text-white font-medium">Scotland/Northern</span>
                <span className="text-sm">750-850 kWh/kWp</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Microclimate Factors:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong className="text-white">Urban heat island:</strong> 2-5°C higher, reduced efficiency</li>
                <li>• <strong className="text-white">Coastal:</strong> Salt air, humidity, marine layer</li>
                <li>• <strong className="text-white">Highland:</strong> Temperature extremes, increased UV</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Case Study */}
        <div className="mb-8 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
          <h3 className="text-white font-semibold mb-3">Case Study: Manchester Residential</h3>
          <div className="text-white/80 text-sm space-y-2">
            <p>
              A residential property with south-west facing roof (225° azimuth) at 30° tilt. Large oak tree 15m to south-east causes morning shading November-February.
            </p>
            <div className="p-3 rounded bg-white/5 mt-2">
              <h4 className="text-white font-medium mb-2">Assessment Results:</h4>
              <ul className="space-y-1">
                <li>• <strong className="text-white">Orientation penalty:</strong> 3% loss (45° off-south)</li>
                <li>• <strong className="text-white">Tilt penalty:</strong> 2% loss (non-optimal)</li>
                <li>• <strong className="text-white">Shading loss:</strong> 8% annual (from tree)</li>
                <li>• <strong className="text-white">Total site factor:</strong> 87% of optimal</li>
                <li>• <strong className="text-elec-yellow">Recommendation:</strong> Proceed - acceptable losses</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Can I install solar on a north-facing roof?</h4>
              <p className="text-white/70 text-sm">North-facing installations are generally not recommended in the UK as they receive significantly less direct sunlight. However, east-west split arrays can work on north-south pitched roofs.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">How do bypass diodes help with shading?</h4>
              <p className="text-white/70 text-sm">Bypass diodes allow current to flow around shaded cell groups rather than through them. This limits the impact of partial shading to affected sub-strings rather than the entire panel.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">What is the difference between GHI and POA irradiance?</h4>
              <p className="text-white/70 text-sm">GHI (Global Horizontal Irradiance) measures total solar radiation on a flat surface. POA (Plane of Array) measures irradiance on the tilted panel surface - this is what your panels actually receive.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">How accurate is PVGIS for UK sites?</h4>
              <p className="text-white/70 text-sm">PVGIS uses satellite-derived data and is typically accurate within 5-10% for UK locations. It is best for initial feasibility but professional software like PVsyst provides more detailed analysis.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Should I prune trees causing shading?</h4>
              <p className="text-white/70 text-sm">Consider the annual shading loss versus tree value and local regulations. Deciduous trees only shade in summer when yields are highest but sun is also highest. Calculate the actual kWh impact before deciding.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">How does fog/mist affect solar output?</h4>
              <p className="text-white/70 text-sm">Fog reduces direct irradiance but increases diffuse radiation. Panels still generate power but at reduced levels. Coastal areas with frequent marine layer may see 5-15% lower annual yields.</p>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <div className="mb-8">
          <Quiz
            title="Section 2 Quiz: Site Assessment"
            questions={quizQuestions}
            passingScore={70}
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10" asChild>
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold" asChild>
            <Link to="../section-3">
              Next Section
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule2Section2;
