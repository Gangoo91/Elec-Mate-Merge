import { ArrowLeft, ArrowRight, Gauge, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Environmental Sensors (Humidity, CO2, Air Quality)";
const DESCRIPTION = "Understand environmental monitoring sensors and their integration with smart home systems for improved health, comfort, and building protection.";

const quickCheckQuestions = [
  {
    question: "What is the ideal relative humidity range for indoor comfort and health?",
    options: ["20-30%", "40-60%", "70-80%", "90-100%"],
    correctAnswer: 1,
    explanation: "40-60% relative humidity is considered optimal for human health and comfort. Below 40% causes dry skin and respiratory irritation; above 60% promotes mould growth and dust mites."
  },
  {
    question: "At what CO2 level does cognitive performance typically begin to decline?",
    options: ["400 ppm", "800-1000 ppm", "2000 ppm", "5000 ppm"],
    correctAnswer: 1,
    explanation: "Studies show cognitive performance begins to decline when CO2 levels exceed 800-1000 ppm. Outdoor air is typically around 400 ppm, so indoor levels should be kept as close to this as practical."
  },
  {
    question: "What does VOC stand for in air quality monitoring?",
    options: ["Variable Output Controller", "Volatile Organic Compound", "Ventilation Optimisation Circuit", "Volume Of Contamination"],
    correctAnswer: 1,
    explanation: "VOC stands for Volatile Organic Compound - chemicals that evaporate at room temperature from sources like paints, cleaning products, and furniture, potentially affecting health and air quality."
  }
];

const quizQuestions = [
  {
    question: "Which sensor would be most useful for detecting potential mould conditions?",
    options: ["CO2 sensor", "Humidity sensor", "PM2.5 sensor", "Temperature sensor only"],
    correctAnswer: 1,
    explanation: "Humidity sensors detect conditions conducive to mould growth. Sustained humidity above 60-70% creates ideal conditions for mould, so monitoring humidity helps prevent problems before they develop."
  },
  {
    question: "What automation would be appropriate when CO2 levels rise above 1000 ppm?",
    options: ["Turn on heating", "Increase ventilation or open windows", "Reduce lighting", "Turn off all appliances"],
    correctAnswer: 1,
    explanation: "High CO2 indicates inadequate ventilation. The appropriate response is to increase fresh air supply through mechanical ventilation, MVHR boost mode, or automated window actuators."
  },
  {
    question: "PM2.5 sensors measure particles of what approximate size?",
    options: ["2.5 millimetres", "2.5 micrometres (microns)", "2.5 centimetres", "2.5 nanometres"],
    correctAnswer: 1,
    explanation: "PM2.5 refers to particulate matter 2.5 micrometres or smaller - fine particles that can penetrate deep into the lungs and even enter the bloodstream, making them a key health concern."
  },
  {
    question: "Which smart home integration makes best use of humidity sensor data?",
    options: ["Security system", "Bathroom extractor fan control", "Outdoor lighting", "Door locks"],
    correctAnswer: 1,
    explanation: "Humidity sensors can automatically control bathroom extractor fans, running them when humidity rises after showering and stopping when levels return to normal, preventing condensation and mould."
  },
  {
    question: "Why might a CO2 sensor give high readings in a bedroom overnight?",
    options: ["Electrical interference", "Human respiration with poor ventilation", "Sensor malfunction", "Temperature changes"],
    correctAnswer: 1,
    explanation: "Sleeping occupants continuously exhale CO2. Without adequate ventilation, bedroom CO2 levels can rise significantly overnight, sometimes exceeding 2000 ppm, affecting sleep quality."
  }
];

const faqs = [
  {
    question: "How often do environmental sensors need calibration?",
    answer: "Most consumer-grade sensors are factory calibrated and do not require user calibration. CO2 sensors typically have automatic baseline calibration that assumes the sensor will see fresh air (400 ppm) at least once per week. Professional sensors may need periodic recalibration, typically annually."
  },
  {
    question: "Can environmental sensors trigger HVAC systems directly?",
    answer: "With proper integration, yes. Smart home platforms can use sensor data to control HVAC systems. For example, high humidity can boost bathroom extraction, high CO2 can increase ventilation rates, and poor air quality can trigger air purifiers or close windows near busy roads."
  },
  {
    question: "Where should I position indoor air quality sensors?",
    answer: "Position sensors at breathing height (1.2-1.5m) away from direct airflow, windows, and doors. Avoid placing near known pollution sources like cookers or printers. For whole-house monitoring, place sensors in regularly occupied rooms like living rooms and bedrooms."
  }
];

const SmartHomeModule4Section3 = () => {
  useSEO({
    title: `${TITLE} | Smart Home Module 4`,
    description: DESCRIPTION,
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-elec-yellow hover:bg-transparent touch-manipulation"
            asChild
          >
            <Link to="/electrician/upskilling/smart-home-module-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <span className="text-sm text-white">Section 3 of 6</span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/10 mb-6">
            <Gauge className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{TITLE}</h1>
          <p className="text-white text-base sm:text-lg max-w-2xl mx-auto">{DESCRIPTION}</p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Key Focus</p>
            <p className="text-white text-sm">Monitoring indoor air quality and conditions</p>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-sm font-medium text-elec-yellow mb-1">Practical Skill</p>
            <p className="text-white text-sm">Sensor placement and HVAC integration</p>
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
              "Understand the health impacts of indoor environmental conditions",
              "Select appropriate sensors for different monitoring needs",
              "Interpret sensor readings and identify concerning levels",
              "Integrate environmental sensors with ventilation systems",
              "Advise customers on improving indoor air quality"
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3 text-white">
                <CheckCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Humidity Monitoring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Humidity Monitoring
          </h2>
          <p className="text-white mb-4">
            Relative humidity significantly affects both occupant comfort and building health.
            Smart humidity sensors enable automated control of ventilation and dehumidification.
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Health Impacts</h4>
              <p className="text-white text-sm">
                Low humidity (below 40%) dries out mucous membranes, increasing susceptibility
                to respiratory infections. High humidity (above 60%) promotes mould growth,
                dust mites, and bacterial proliferation.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Building Protection</h4>
              <p className="text-white text-sm">
                Sustained high humidity causes condensation on cold surfaces, leading to
                mould growth, timber decay, and damage to decorations. Monitoring humidity
                enables early warning of potential problems.
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">Humidity Level</th>
                  <th className="text-left py-3 px-4 text-elec-yellow font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">Below 30%</td>
                  <td className="py-3 px-4 text-white">Too dry - consider humidification</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">40-60%</td>
                  <td className="py-3 px-4 text-white">Optimal range</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4 text-white">60-70%</td>
                  <td className="py-3 px-4 text-white">Elevated - increase ventilation</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white">Above 70%</td>
                  <td className="py-3 px-4 text-white">High risk of mould - action required</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CO2 Monitoring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Carbon Dioxide (CO2) Monitoring
          </h2>
          <p className="text-white mb-4">
            CO2 levels indicate ventilation adequacy. As occupants breathe, CO2 accumulates
            indoors. Elevated levels indicate insufficient fresh air and correlate with
            reduced cognitive performance and occupant discomfort.
          </p>
          <div className="space-y-4 mb-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">CO2 Level Guidelines</h4>
              <ul className="space-y-2 text-white text-sm">
                <li><span className="text-elec-yellow">400 ppm:</span> Outdoor baseline (fresh air)</li>
                <li><span className="text-elec-yellow">600-800 ppm:</span> Good indoor air quality</li>
                <li><span className="text-elec-yellow">800-1000 ppm:</span> Acceptable, cognitive effects begin</li>
                <li><span className="text-elec-yellow">1000-1500 ppm:</span> Poor - increased ventilation needed</li>
                <li><span className="text-elec-yellow">Above 1500 ppm:</span> Very poor - significant health impact</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Practical Applications</h4>
              <p className="text-white text-sm">
                CO2 sensors are particularly valuable in bedrooms (overnight accumulation),
                meeting rooms (rapid rise with multiple occupants), classrooms, and any
                space with variable occupancy. They provide objective data for ventilation
                control and highlight when windows should be opened or MVHR boosted.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Air Quality Monitoring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Air Quality Monitoring
          </h2>
          <p className="text-white mb-4">
            Beyond CO2 and humidity, comprehensive air quality monitoring includes
            particulate matter, volatile organic compounds, and specific pollutants.
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Particulate Matter (PM2.5/PM10)</h4>
              <p className="text-white text-sm">
                Fine particles from cooking, dust, pollen, and outdoor pollution. PM2.5
                (particles under 2.5 microns) is most concerning as it penetrates deep
                into the respiratory system. WHO guidelines suggest below 15 micrograms
                per cubic metre annual average.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Volatile Organic Compounds (VOCs)</h4>
              <p className="text-white text-sm">
                Gases released from paints, furniture, cleaning products, and building
                materials. Common VOCs include formaldehyde, benzene, and toluene.
                New builds and recently decorated spaces often have elevated VOC levels.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="font-medium text-elec-yellow mb-2">Radon</h4>
              <p className="text-white text-sm">
                Radioactive gas from ground decay, a significant lung cancer risk.
                Certain areas of the UK have elevated radon levels. Specialist sensors
                are required for accurate long-term measurement.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Integration with HVAC */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Integration with HVAC Systems
          </h2>
          <p className="text-white mb-4">
            Environmental sensors provide the data needed for demand-controlled ventilation,
            optimising both air quality and energy efficiency.
          </p>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Humidity-Based Extraction</h4>
              <p className="text-white text-sm">
                Bathroom and kitchen extractors can be triggered automatically when humidity
                rises, running until levels return to normal. This ensures effective moisture
                removal without wasting energy through continuous operation.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">CO2-Based Ventilation</h4>
              <p className="text-white text-sm">
                MVHR systems can increase fan speed when CO2 exceeds threshold levels,
                providing fresh air on demand. This is more efficient than constant
                maximum ventilation and responds to actual occupancy.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-medium text-elec-yellow mb-2">Air Quality Response</h4>
              <p className="text-white text-sm">
                When outdoor air quality is poor (high PM2.5), smart systems can reduce
                natural ventilation and rely on filtered mechanical systems. Conversely,
                when indoor VOCs are high, increased ventilation helps dilute pollutants.
              </p>
            </div>
          </div>
        </section>

        {/* Sensor Selection and Placement */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Sensor Selection and Placement
          </h2>
          <p className="text-white mb-4">
            Choosing the right sensors and positioning them correctly is essential for
            accurate monitoring and useful data.
          </p>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-4">
            <h4 className="font-medium text-elec-yellow mb-2">Placement Guidelines</h4>
            <ul className="text-white text-sm space-y-2">
              <li>Mount at breathing height (1.2-1.5 metres from floor)</li>
              <li>Keep away from direct airflow (vents, windows, doors)</li>
              <li>Avoid proximity to heat sources and direct sunlight</li>
              <li>Position away from known pollution sources (cookers, printers)</li>
              <li>Ensure sensors have stable mounting away from vibration</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-2">Recommended Locations</h4>
            <ul className="text-white text-sm space-y-1">
              <li><span className="text-elec-yellow">Living room:</span> Primary occupied space, general monitoring</li>
              <li><span className="text-elec-yellow">Bedrooms:</span> Overnight CO2 and humidity tracking</li>
              <li><span className="text-elec-yellow">Kitchen:</span> Humidity and particulate monitoring</li>
              <li><span className="text-elec-yellow">Bathroom:</span> Humidity for extraction control</li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
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
            title="Section 3 Knowledge Check"
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
            <Link to="../section-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow text-black hover:bg-elec-yellow/80 touch-manipulation"
            asChild
          >
            <Link to="../section-4">
              Next Section
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default SmartHomeModule4Section3;
