/**
 * Level 3 Module 1 Section 4.1 - Common Construction Hazards
 *
 * Covers slips, trips, falls, sharps, dust, asbestos, and silica hazards
 * following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Common Construction Hazards - Level 3 Module 1 Section 4.1";
const DESCRIPTION = "Identify and control common construction site hazards including slips, trips, falls, sharps, dust, asbestos and silica for electrical apprentices.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary cause of slips on construction sites?",
    options: [
      "Incorrect footwear",
      "Contaminated walking surfaces (water, oil, debris)",
      "Poor lighting only",
      "Working too quickly"
    ],
    correctIndex: 1,
    explanation: "While all factors contribute, contaminated walking surfaces are the primary cause. Water, oil, mud, dust, and debris create slip hazards that must be controlled through good housekeeping and immediate clean-up of spills."
  },
  {
    id: "check-2",
    question: "What makes asbestos particularly dangerous compared to other dust hazards?",
    options: [
      "It causes immediate respiratory problems",
      "Fibres are inhaled and cause diseases that may not appear for 15-50 years",
      "It is always visible to the naked eye",
      "It only affects smokers"
    ],
    correctIndex: 1,
    explanation: "Asbestos fibres lodge in lung tissue and cause diseases like mesothelioma and asbestosis that may not manifest for 15-50 years after exposure. This latency period makes it uniquely dangerous as workers may not realise they have been harmed."
  },
  {
    id: "check-3",
    question: "What should you do if you suspect you have discovered asbestos-containing materials?",
    options: [
      "Remove it carefully yourself",
      "Stop work immediately and report to your supervisor",
      "Cover it with plastic sheeting",
      "Continue working but wear a dust mask"
    ],
    correctIndex: 1,
    explanation: "Stop work immediately and report to your supervisor. Only licensed contractors can remove most types of asbestos. Disturbing asbestos releases dangerous fibres. Never attempt to handle suspected asbestos yourself."
  },
  {
    id: "check-4",
    question: "What is the Workplace Exposure Limit (WEL) for respirable crystalline silica?",
    options: [
      "0.5 mg/m3",
      "0.1 mg/m3",
      "1.0 mg/m3",
      "There is no exposure limit"
    ],
    correctIndex: 1,
    explanation: "The UK Workplace Exposure Limit for respirable crystalline silica is 0.1 mg/m3 as an 8-hour time-weighted average. This strict limit reflects the serious health risks including silicosis and lung cancer."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to HSE statistics, what type of incident causes the most non-fatal injuries on construction sites?",
    options: [
      "Falls from height",
      "Slips, trips and falls on the same level",
      "Being struck by moving objects",
      "Manual handling injuries"
    ],
    correctAnswer: 1,
    explanation: "Slips, trips and falls on the same level consistently cause the most non-fatal injuries in construction. While falls from height cause more fatalities, the sheer volume of slip and trip incidents makes them the leading cause of reportable injuries."
  },
  {
    id: 2,
    question: "Which regulation specifically requires employers to maintain floors and traffic routes in good condition?",
    options: [
      "COSHH Regulations 2002",
      "Workplace (Health, Safety and Welfare) Regulations 1992",
      "Personal Protective Equipment Regulations 2002",
      "Work at Height Regulations 2005"
    ],
    correctAnswer: 1,
    explanation: "The Workplace (Health, Safety and Welfare) Regulations 1992 require employers to maintain floors and traffic routes in good condition, free from obstructions and slippery substances that could cause slips, trips or falls."
  },
  {
    id: 3,
    question: "What is 'good housekeeping' in the context of construction site safety?",
    options: [
      "Cleaning at the end of each day only",
      "Ongoing management of materials, waste and walkways throughout the work",
      "Hiring a cleaning company",
      "Sweeping floors once per week"
    ],
    correctAnswer: 1,
    explanation: "Good housekeeping means continuous management of the work environment - keeping walkways clear, storing materials properly, removing waste promptly, cleaning up spills immediately, and maintaining tidy work areas throughout the day, not just at the end."
  },
  {
    id: 4,
    question: "What is the main risk from sharps hazards such as exposed cable ends or metal fixings?",
    options: [
      "Minor scratches only",
      "Puncture wounds that can lead to infection or tetanus",
      "Damage to clothing",
      "Electrical shock"
    ],
    correctAnswer: 1,
    explanation: "Puncture wounds from sharp objects can lead to serious infections including tetanus. Rusty metal, contaminated sharps, and deep puncture wounds are particularly dangerous as they create ideal conditions for bacterial growth."
  },
  {
    id: 5,
    question: "When chasing walls for cables, what respiratory hazard is created?",
    options: [
      "Carbon monoxide",
      "Respirable dust including silica from concrete and brick",
      "Asbestos only",
      "No significant hazard"
    ],
    correctAnswer: 1,
    explanation: "Chasing walls creates respirable dust containing silica from concrete, brick, and morite. This fine dust can penetrate deep into the lungs and cause silicosis. Appropriate RPE and dust suppression measures are essential."
  },
  {
    id: 6,
    question: "What is silicosis?",
    options: [
      "A skin condition caused by silica",
      "An irreversible lung disease caused by inhaling crystalline silica dust",
      "A temporary respiratory irritation",
      "An allergic reaction to dust"
    ],
    correctAnswer: 1,
    explanation: "Silicosis is a serious and irreversible lung disease caused by inhaling respirable crystalline silica dust. The silica particles cause scarring and stiffening of lung tissue, leading to breathing difficulties and potentially death."
  },
  {
    id: 7,
    question: "In buildings constructed before what year should you assume asbestos may be present?",
    options: [
      "1980",
      "1990",
      "2000",
      "2010"
    ],
    correctAnswer: 2,
    explanation: "Asbestos use was not fully banned in the UK until 1999, so any building constructed or refurbished before 2000 may contain asbestos. Always check asbestos surveys and assume asbestos is present until confirmed otherwise."
  },
  {
    id: 8,
    question: "What type of asbestos is often found in textured ceiling coatings (Artex)?",
    options: [
      "Blue asbestos (crocidolite)",
      "Brown asbestos (amosite)",
      "White asbestos (chrysotile)",
      "Green asbestos"
    ],
    correctAnswer: 2,
    explanation: "White asbestos (chrysotile) was commonly used in textured ceiling coatings like Artex until the 1980s. While considered less dangerous than blue or brown asbestos, it still poses serious health risks if disturbed."
  },
  {
    id: 9,
    question: "What does RPE stand for and why is fit-testing important?",
    options: [
      "Respiratory Protection Equipment - fit-testing ensures a proper seal",
      "Required Personal Equipment - fit-testing checks it works",
      "Respiratory Protective Equipment - fit-testing is optional",
      "Regulated Protection Equipment - fit-testing is only for supervisors"
    ],
    correctAnswer: 0,
    explanation: "RPE means Respiratory Protective Equipment. Fit-testing is essential because even the best RPE is ineffective if it doesn't seal properly to the wearer's face. Facial hair, glasses, and face shape all affect seal quality."
  },
  {
    id: 10,
    question: "What is the hierarchy of control for dust hazards?",
    options: [
      "PPE, then engineering controls, then elimination",
      "Elimination, then substitution, engineering controls, administrative controls, then PPE",
      "Training first, then PPE, then engineering controls",
      "PPE is always the first choice"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy of control requires considering elimination first (can we avoid creating dust?), then substitution (less hazardous materials), engineering controls (extraction, wet cutting), administrative controls (limiting exposure time), and finally PPE as a last resort."
  },
  {
    id: 11,
    question: "What should you do before drilling or cutting into any wall or ceiling?",
    options: [
      "Just start work and be careful",
      "Check the asbestos register/survey and use a cable detector",
      "Wear safety glasses only",
      "Ask a colleague if it is safe"
    ],
    correctAnswer: 1,
    explanation: "Before any invasive work, check the asbestos register/survey to confirm no asbestos is present, and use a cable/pipe detector to avoid hidden services. This prevents both asbestos exposure and strikes on live cables or pipes."
  },
  {
    id: 12,
    question: "What is the legal duty regarding asbestos in non-domestic buildings?",
    options: [
      "No legal requirements exist",
      "The dutyholder must manage asbestos and maintain an asbestos register",
      "Only remove asbestos when convenient",
      "Asbestos can be ignored if not visible"
    ],
    correctAnswer: 1,
    explanation: "The Control of Asbestos Regulations 2012 require dutyholders of non-domestic premises to manage asbestos, including identifying its location, assessing condition, maintaining a register, and informing anyone who might disturb it."
  }
];

const faqs = [
  {
    question: "How do I know if there is asbestos in the building I am working in?",
    answer: "For non-domestic buildings, ask to see the asbestos register/survey - the dutyholder is legally required to have one. For domestic properties, assume asbestos is present in any pre-2000 building until a survey proves otherwise. Never drill, cut, or disturb any suspect material without verification."
  },
  {
    question: "What should I do if I accidentally disturb asbestos?",
    answer: "Stop work immediately. Do not try to clean up. Evacuate the immediate area and prevent others from entering. Report to your supervisor and site manager. The area must be assessed and potentially decontaminated by a licensed asbestos contractor. You should record your potential exposure for future reference."
  },
  {
    question: "Is a standard dust mask adequate protection when cutting brick or concrete?",
    answer: "No. Standard paper dust masks do not provide adequate protection against fine silica dust. You need at minimum an FFP3 respirator for silica work, and even then only for short-duration tasks. For extended work, powered respirators or engineering controls (wet cutting, LEV extraction) should be used."
  },
  {
    question: "Who is responsible for keeping walkways clear on a construction site?",
    answer: "Everyone shares responsibility. The principal contractor has overall duty for site-wide housekeeping. Your employer is responsible for your work area. But every worker has a personal duty under HASAWA to not endanger themselves or others - if you create an obstruction or see a hazard, deal with it."
  },
  {
    question: "What are the early symptoms of silicosis?",
    answer: "Early symptoms include persistent cough, shortness of breath on exertion, fatigue, and chest tightness. The disease progresses slowly and symptoms may not appear for years after exposure. Regular health surveillance helps detect early signs. There is no cure - prevention is essential."
  }
];

const Level3Module1Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Common Construction Hazards
          </h1>
          <p className="text-white/80">
            Slips, trips, falls, sharps, dust, asbestos and silica - identifying and controlling everyday site hazards
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Slips/Trips:</strong> Leading cause of workplace injuries - good housekeeping prevents most</li>
              <li><strong>Sharps:</strong> Puncture wounds cause infection risk - proper disposal and awareness</li>
              <li><strong>Dust/Silica:</strong> Invisible killer - causes irreversible lung disease</li>
              <li><strong>Asbestos:</strong> Still present in pre-2000 buildings - never disturb without survey</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Wet floors, trailing cables, poor storage, old insulation materials</li>
              <li><strong>Use:</strong> Correct PPE, dust extraction, wet cutting methods</li>
              <li><strong>Check:</strong> Asbestos register before any invasive work</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify common slip, trip and fall hazards on construction sites",
              "Understand the serious health risks from construction dusts",
              "Recognise where asbestos may be found and what to do",
              "Know the dangers of respirable crystalline silica",
              "Apply the hierarchy of control to dust hazards",
              "Select appropriate respiratory protective equipment"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 - Slips, Trips and Falls */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Slips, Trips and Falls
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Slips, trips and falls on the same level are the most common cause of workplace injuries in the UK construction industry. While falls from height cause more fatalities, the sheer volume of slip and trip incidents means they account for more lost working days, more compensation claims, and more suffering than almost any other hazard type. As an electrician, you move constantly around sites, carrying tools and materials, often focused on the task ahead rather than what is underfoot.
            </p>

            <p>
              <strong>Why do slips and trips happen?</strong> The causes are often mundane but the consequences can be severe. Slips occur when there is insufficient friction between footwear and the walking surface - wet floors, dusty surfaces, oil spills, ice, loose gravel, or polished surfaces all reduce grip. Trips occur when the foot strikes an obstruction - trailing cables, uneven surfaces, changes in floor level, materials stored in walkways, or poorly lit areas where hazards cannot be seen.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common slip and trip hazards for electricians:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Trailing cables (both your own and others) across walkways</li>
                <li>Wet floors from leaks, cleaning, or weather</li>
                <li>Construction debris - offcuts, packaging, fixings</li>
                <li>Uneven temporary flooring or deck boards</li>
                <li>Poor lighting, especially in ceiling voids and service risers</li>
                <li>Changes in floor level without proper markings</li>
                <li>Your own tools and materials left in walkways</li>
              </ul>
            </div>

            <p>
              The Workplace (Health, Safety and Welfare) Regulations 1992 require floors and traffic routes to be kept in good condition, free from obstructions and slippery substances. This is not just the site manager's responsibility - everyone on site has a duty to maintain good housekeeping and report hazards.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Good housekeeping is not just tidying up at the end of the day - it means continuously managing your work area, removing waste as you create it, securing cables and materials, and cleaning up spills immediately. Five minutes of housekeeping can prevent weeks off work with an injury.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 - Sharps Hazards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Sharps Hazards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Sharps hazards are often overlooked but can cause serious injuries. As an electrician, you work with sharp tools, cut cable ends, metal fixings, and sometimes in areas where others have left hazardous materials. Puncture wounds and cuts can lead to serious infections, particularly from rusty or contaminated materials, and deep puncture wounds create ideal conditions for tetanus bacteria.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common sharps hazards</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cut cable ends with exposed copper conductors</li>
                  <li>Sharp metal edges on trunking and tray</li>
                  <li>Protruding screws and fixings</li>
                  <li>Broken glass from light fittings</li>
                  <li>Stanley knife blades</li>
                  <li>Metal swarf from drilling</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control measures</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Wear appropriate gloves when handling materials</li>
                  <li>Cap or cover exposed cable ends</li>
                  <li>File or cover sharp edges on metalwork</li>
                  <li>Dispose of blades in sharps containers</li>
                  <li>Clear up swarf immediately after drilling</li>
                  <li>Keep tetanus vaccinations up to date</li>
                </ul>
              </div>
            </div>

            <p>
              If you sustain a puncture wound, clean it immediately with running water and allow it to bleed freely briefly to flush out contamination. Seek medical attention for deep wounds, wounds from rusty objects, or if you cannot remember your last tetanus vaccination. Report all injuries, however minor they seem - infection can develop days later.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 - Construction Dust and Silica */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Construction Dust and Silica
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Construction dust is a hidden killer. Unlike an obvious hazard like a fall from height, dust damage happens invisibly, over years, and by the time symptoms appear the damage is irreversible. As an electrician, you generate dust when chasing walls, drilling holes, cutting materials, and sweeping up. You also breathe dust created by others on site. Understanding what you are breathing and how to protect yourself is essential.
            </p>

            <p>
              <strong>Respirable Crystalline Silica (RCS)</strong> is found in concrete, morite, brick, sandstone, and many other construction materials. When you chase a wall or drill into concrete, you release fine silica particles that penetrate deep into your lungs. Over time, silica causes silicosis - irreversible scarring of lung tissue that leads to breathing difficulties and premature death. Silica exposure also increases lung cancer risk.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Workplace Exposure Limit for RCS is 0.1 mg/m3. For context:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Dry cutting concrete with an angle grinder can generate 10x the WEL in seconds</li>
                <li>Chasing a single channel for a cable can exceed daily limits without controls</li>
                <li>Sweeping up concrete dust without dampening creates dangerous clouds</li>
                <li>The WEL can be exceeded before you can see or taste dust in the air</li>
              </ul>
            </div>

            <p>
              The hierarchy of control must be applied. First, consider if you can avoid creating dust at all - can you route cables differently? If dust creation is unavoidable, use engineering controls: wet cutting suppresses dust at source, local exhaust ventilation captures dust before you breathe it. Only when these are impractical should you rely on RPE - and then it must be the right type, properly fitted.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An electrician developed severe breathing difficulties in his 40s. Investigation revealed years of chasing walls with a dry disc cutter and no respiratory protection. He now cannot work and requires regular hospital treatment. The silicosis damage is permanent. Had he used wet cutting or appropriate RPE, this would have been prevented.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 - Asbestos */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Asbestos - The Hidden Danger
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Asbestos kills approximately 5,000 people in the UK every year - more than road traffic accidents. Most of these deaths are from occupational exposure decades earlier, when the dangers were less understood or ignored. As an electrician working in existing buildings, you are in a high-risk occupation because your work often involves disturbing building fabric where asbestos may be hidden.
            </p>

            <p>
              Asbestos was widely used in UK construction until its complete ban in 1999. Any building constructed or refurbished before 2000 may contain asbestos. It was valued for its fire resistance, insulation properties, and durability. Asbestos is not dangerous when intact and undisturbed - the danger comes when fibres become airborne through cutting, drilling, or damage.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">White Asbestos</p>
                <p className="text-white/90 text-xs">Chrysotile - most common, found in cement products, textured coatings, brake pads</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Brown Asbestos</p>
                <p className="text-white/90 text-xs">Amosite - thermal insulation, ceiling tiles, fire protection</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Blue Asbestos</p>
                <p className="text-white/90 text-xs">Crocidolite - most dangerous, spray coatings, pipe lagging</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Where electricians commonly encounter asbestos:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Textured ceiling coatings (Artex) - drilling for light fittings</li>
                <li>Asbestos cement sheets - flat roofing, wall panels</li>
                <li>Floor tiles and adhesives - lifting for floor boxes</li>
                <li>Pipe lagging and boiler insulation - in plant rooms</li>
                <li>Electrical switchboard backings - older distribution boards</li>
                <li>Fire protection to structural steel - in ceiling voids</li>
              </ul>
            </div>

            <p>
              <strong>Before any invasive work</strong> in a pre-2000 building, you must check the asbestos register. For non-domestic buildings, the dutyholder is legally required to have an asbestos survey and management plan under the Control of Asbestos Regulations 2012. If there is no survey, or the survey does not cover your work area, assume asbestos is present and do not proceed until it is confirmed safe.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> You cannot identify asbestos by looking at it - laboratory analysis is required. If you discover any suspect material, STOP work immediately, leave the area, prevent others from entering, and report to your supervisor. Never try to handle or remove suspect asbestos yourself - this requires licensed contractors for most asbestos types.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Starting Work</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check asbestos register for any building pre-2000</li>
                <li>Assess the work area for slip/trip hazards</li>
                <li>Plan cable routes to minimise chasing and drilling</li>
                <li>Ensure correct PPE is available and in good condition</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Dusty Work</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use wet cutting methods wherever possible</li>
                <li>Connect dust extraction to power tools</li>
                <li>Wear correctly fitted FFP3 respirator for silica</li>
                <li>Dampen debris before sweeping - never dry sweep</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming a building is asbestos-free</strong> - always check the register for pre-2000 buildings</li>
                <li><strong>Using dust masks instead of proper RPE</strong> - paper masks do not stop silica</li>
                <li><strong>Dry cutting concrete without extraction</strong> - creates dangerous airborne dust</li>
                <li><strong>Leaving cables trailing across walkways</strong> - secure or cover all cables</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Silica Protection</p>
                <ul className="space-y-0.5">
                  <li>WEL: 0.1 mg/m3</li>
                  <li>Minimum RPE: FFP3 respirator</li>
                  <li>Best practice: Wet cutting + extraction</li>
                  <li>Health surveillance: Required for regular exposure</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Asbestos Response</p>
                <ul className="space-y-0.5">
                  <li>Stop work immediately</li>
                  <li>Do not disturb further</li>
                  <li>Leave area and restrict access</li>
                  <li>Report to supervisor - licensed removal required</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section4-2">
              Next: Working at Height
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section4_1;
