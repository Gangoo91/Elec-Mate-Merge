/**
 * Level 3 Module 1 Section 4.5 - Manual Handling, Noise, and Vibration Hazards
 *
 * Covers safe lifting techniques, noise exposure, and HAVS/vibration risks
 * following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Manual Handling, Noise, and Vibration Hazards - Level 3 Module 1 Section 4.5";
const DESCRIPTION = "Understanding safe manual handling techniques, noise exposure limits, and hand-arm vibration syndrome (HAVS) for electrical apprentices in the UK.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the recommended maximum weight for a single person to lift under ideal conditions?",
    options: [
      "10 kg",
      "25 kg",
      "50 kg",
      "There is no legal maximum - it depends on assessment"
    ],
    correctIndex: 3,
    explanation: "There is no legal maximum weight. The Manual Handling Operations Regulations require risk assessment considering weight, frequency, posture, individual capability, and environmental factors. HSE guidelines suggest 25 kg under ideal conditions but this varies with circumstances."
  },
  {
    id: "check-2",
    question: "At what noise level must employers provide hearing protection?",
    options: [
      "75 dB(A)",
      "80 dB(A) lower exposure action value",
      "90 dB(A)",
      "100 dB(A)"
    ],
    correctIndex: 1,
    explanation: "At 80 dB(A) (lower exposure action value), employers must provide hearing protection on request and give information about risks. At 85 dB(A) (upper action value), hearing protection must be worn, and hearing protection zones designated."
  },
  {
    id: "check-3",
    question: "What is HAVS and how is it caused?",
    options: [
      "High Altitude Vibration Syndrome - caused by working at height",
      "Hand-Arm Vibration Syndrome - caused by prolonged use of vibrating tools",
      "Heavy Activity Vascular Strain - caused by manual handling",
      "Hearing And Visual Stress - caused by noise exposure"
    ],
    correctIndex: 1,
    explanation: "Hand-Arm Vibration Syndrome (HAVS) is caused by prolonged exposure to hand-transmitted vibration from power tools. It damages blood vessels and nerves in the fingers and hands, causing numbness, tingling, loss of grip strength, and white finger attacks."
  },
  {
    id: "check-4",
    question: "Which electrical tool is most associated with HAVS risk?",
    options: [
      "Test meters",
      "Cable cutters",
      "Hammer drills and angle grinders",
      "Screwdrivers"
    ],
    correctIndex: 2,
    explanation: "Hammer drills, angle grinders, and other percussive/rotary power tools create significant vibration exposure. Regular use of these tools without control measures can lead to HAVS. Electricians using such tools regularly need vibration exposure monitoring."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does the acronym TILE stand for in manual handling assessment?",
    options: [
      "Time, Isolation, Location, Environment",
      "Task, Individual, Load, Environment",
      "Training, Inspection, Lifting, Equipment",
      "Tool, Instruction, Load, Ergonomics"
    ],
    correctAnswer: 1,
    explanation: "TILE stands for Task (what movements are involved), Individual (capability of the person), Load (weight, size, stability), and Environment (space, floor conditions, lighting). This framework helps assess manual handling risks."
  },
  {
    id: 2,
    question: "What is the first step in the manual handling hierarchy of control?",
    options: [
      "Provide training",
      "Avoid manual handling operations where reasonably practicable",
      "Use mechanical aids",
      "Reduce the load weight"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy starts with avoiding manual handling altogether where reasonably practicable - can the task be redesigned or mechanised? Only when avoidance is not possible should other controls like mechanical aids, reduced loads, and training be considered."
  },
  {
    id: 3,
    question: "What is the upper exposure action value for daily noise exposure?",
    options: [
      "75 dB(A)",
      "80 dB(A)",
      "85 dB(A)",
      "90 dB(A)"
    ],
    correctAnswer: 2,
    explanation: "The upper exposure action value is 85 dB(A) daily or weekly average, or 137 dB(C) peak. Above this, employers must reduce exposure, ensure hearing protection is worn, designate hearing protection zones, and provide health surveillance."
  },
  {
    id: 4,
    question: "How many decibels does it take to double the perceived loudness?",
    options: [
      "1 dB",
      "3 dB",
      "6 dB",
      "10 dB"
    ],
    correctAnswer: 3,
    explanation: "A 10 dB increase roughly doubles perceived loudness. However, a 3 dB increase doubles the sound energy. This is why noise exposure limits are so important - small increases in dB represent large increases in damaging energy."
  },
  {
    id: 5,
    question: "What are the early symptoms of HAVS?",
    options: [
      "Headaches and nausea",
      "Tingling, numbness, and loss of feeling in fingers",
      "Back pain and muscle strain",
      "Hearing loss"
    ],
    correctAnswer: 1,
    explanation: "Early HAVS symptoms include tingling and numbness in fingers, loss of feeling (especially in cold), white finger attacks (blanching), and reduced grip strength. These are often most noticeable after work or in cold conditions."
  },
  {
    id: 6,
    question: "What is the daily exposure limit value (ELV) for hand-arm vibration?",
    options: [
      "2.5 m/s2 A(8)",
      "5 m/s2 A(8)",
      "7.5 m/s2 A(8)",
      "10 m/s2 A(8)"
    ],
    correctAnswer: 1,
    explanation: "The daily exposure limit value (ELV) for hand-arm vibration is 5 m/s2 A(8), which must not be exceeded. The exposure action value (EAV) is 2.5 m/s2 A(8), above which employers must introduce controls."
  },
  {
    id: 7,
    question: "What is the correct lifting posture?",
    options: [
      "Bend at the waist with straight legs",
      "Keep the load at arm's length",
      "Bend knees, keep back straight, grip firmly, lift smoothly",
      "Twist and lift in one movement to save time"
    ],
    correctAnswer: 2,
    explanation: "Correct lifting: feet apart for stability, bend knees not back, keep load close to body, grip firmly, lift smoothly using leg muscles, avoid twisting - move feet to turn. This protects the spine from injury."
  },
  {
    id: 8,
    question: "Which regulation covers manual handling at work?",
    options: [
      "PUWER 1998",
      "Manual Handling Operations Regulations 1992",
      "LOLER 1998",
      "COSHH 2002"
    ],
    correctAnswer: 1,
    explanation: "The Manual Handling Operations Regulations 1992 (as amended) require employers to avoid hazardous manual handling where possible, assess unavoidable operations, and reduce the risk of injury so far as reasonably practicable."
  },
  {
    id: 9,
    question: "What is white finger disease?",
    options: [
      "A skin condition from chemicals",
      "A circulatory condition where fingers go white due to blood vessel damage from vibration",
      "Frostbite from cold working conditions",
      "A type of dermatitis"
    ],
    correctAnswer: 1,
    explanation: "White finger (vibration white finger or Raynaud's phenomenon) is a condition where blood vessels in the fingers are damaged by vibration, causing them to spasm and restrict blood flow. Fingers go white, then blue, then red as circulation returns."
  },
  {
    id: 10,
    question: "How can noise exposure be reduced using the hierarchy of control?",
    options: [
      "Provide hearing protection first, then consider other measures",
      "Eliminate or substitute noise sources, then engineering controls, then hearing protection",
      "Hearing protection is the only effective control",
      "Move workers further away is the only option"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy requires: elimination (quieter processes), substitution (quieter equipment), engineering controls (enclosures, damping, isolation), administrative controls (limiting exposure time), then PPE (hearing protection) as last resort."
  },
  {
    id: 11,
    question: "Why is health surveillance important for workers exposed to noise or vibration?",
    options: [
      "It is not important",
      "It detects early signs of damage before serious harm occurs",
      "It is only required for legal compliance",
      "It only applies to managers"
    ],
    correctAnswer: 1,
    explanation: "Health surveillance (hearing tests, vibration screening) detects early signs of damage when action can still be taken to prevent progression. Early detection allows exposure reduction before permanent disability occurs."
  },
  {
    id: 12,
    question: "What mechanical aids can electricians use to reduce manual handling risks?",
    options: [
      "None are available for electrical work",
      "Cable drums with stands, trolleys, hoists, and team lifting",
      "Only fully automated equipment",
      "Mechanical aids make work more dangerous"
    ],
    correctAnswer: 1,
    explanation: "Electricians can use: cable drum stands and spindles, cable pulling equipment, sack barrows and trolleys, hoists and lifting equipment, and team lifting for heavy items. These significantly reduce injury risk."
  }
];

const faqs = [
  {
    question: "Is there a legal maximum weight I can be asked to lift?",
    answer: "No. There is no single legal maximum weight. The Manual Handling Operations Regulations require employers to assess the risk considering all factors - weight, frequency, posture, individual capability, and environment. HSE provides guideline figures (e.g., 25 kg for men under ideal conditions) but these are not legal limits."
  },
  {
    question: "Do I have to wear hearing protection if my employer provides it?",
    answer: "At 80-85 dB(A), employers must provide hearing protection on request but you can choose whether to wear it. Above 85 dB(A), you MUST wear hearing protection and employers must enforce this. You have a duty under HASAWA to cooperate with safety measures."
  },
  {
    question: "How do I know if I am developing HAVS?",
    answer: "Early symptoms include tingling or numbness in fingers (especially after using tools), difficulty with fine tasks like doing up buttons, reduced grip strength, and fingers going white in cold conditions. If you experience any of these symptoms, report them immediately for health surveillance."
  },
  {
    question: "Can HAVS be cured?",
    answer: "No. HAVS damage is permanent and cannot be reversed. Early detection through health surveillance allows exposure reduction to prevent progression, but existing damage is irreversible. Prevention through exposure control is essential."
  },
  {
    question: "Why should I report manual handling injuries?",
    answer: "Reporting allows early treatment (preventing minor injuries becoming serious), identifies problem tasks for risk assessment review, creates records for any future compensation claims, and helps the employer prevent similar injuries to colleagues."
  }
];

const Level3Module1Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

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
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Manual handling:</strong> Use TILE assessment, avoid if possible, use aids</li>
              <li><strong>Noise:</strong> Action at 80 dB(A), mandatory protection at 85 dB(A)</li>
              <li><strong>Vibration:</strong> HAVS is permanent - monitor exposure from power tools</li>
              <li><strong>Health surveillance:</strong> Detects damage early, before it is too late</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Heavy loads, loud equipment, vibrating tools</li>
              <li><strong>Use:</strong> Mechanical aids, hearing protection, low-vibration tools</li>
              <li><strong>Report:</strong> Any tingling, numbness, or hearing difficulties</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01 - Manual Handling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Manual Handling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Manual handling injuries are among the most common workplace injuries. For electricians, activities like carrying cable drums, lifting distribution boards, and working in awkward positions create significant injury risk. Back injuries from poor lifting technique can be career-ending. The Manual Handling Operations Regulations 1992 require employers to assess and reduce these risks.
            </p>

            <p>
              <strong>The TILE framework</strong> provides a systematic approach to manual handling assessment: Task (what movements are involved - lifting, carrying, pushing, pulling, twisting), Individual (physical capability, fitness, training, existing conditions), Load (weight, size, shape, stability, grip), and Environment (space constraints, floor conditions, lighting, temperature).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Safe lifting technique:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Plan the lift - where is it going, is the route clear?</li>
                <li>Position feet apart for stable base, one foot slightly forward</li>
                <li>Bend knees, not back - keep back straight or slightly arched</li>
                <li>Get a firm grip on the load before lifting</li>
                <li>Keep the load close to your body throughout</li>
                <li>Lift smoothly using leg muscles, not jerking</li>
                <li>Avoid twisting - move your feet to change direction</li>
                <li>Put down carefully, then adjust position if needed</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The best lift is the one you do not make. Can you use a trolley, cable stand, or get help? Mechanical aids and team lifting are not admissions of weakness - they are professional practice that keeps you working injury-free.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 - Noise Hazards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Noise Hazards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Noise-induced hearing loss is permanent and irreversible. As an electrician, you are exposed to noise from your own tools (hammer drills, angle grinders) and from other trades on site. The Control of Noise at Work Regulations 2005 set exposure limits and require employers to protect your hearing. But you also have personal responsibility to use protection provided.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Noise Action Levels</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>80 dB(A):</strong> Lower action value - provide information and hearing protection on request</li>
                  <li><strong>85 dB(A):</strong> Upper action value - mandatory hearing protection zones</li>
                  <li><strong>87 dB(A):</strong> Exposure limit - must not be exceeded (accounting for protection)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical noise levels</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Normal conversation: 60-65 dB(A)</li>
                  <li>Angle grinder: 95-105 dB(A)</li>
                  <li>Hammer drill: 95-100 dB(A)</li>
                  <li>SDS drill: 90-100 dB(A)</li>
                </ul>
              </div>
            </div>

            <p>
              <strong>How noise damages hearing:</strong> Loud noise damages the delicate hair cells in the inner ear that convert sound to nerve signals. Once damaged, these cells do not regenerate. Damage is cumulative - every exposure adds to the total. Initial symptoms include tinnitus (ringing in ears) and difficulty hearing in noisy environments. By the time you notice hearing loss, significant damage has occurred.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An electrician used hammer drills and angle grinders daily for years without hearing protection. By age 45, he had significant hearing loss and constant tinnitus. He now struggles to hear conversations and cannot enjoy music or television at normal volumes. This damage is permanent. Wearing hearing protection from the start would have prevented it.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 - Vibration Hazards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Hand-Arm Vibration Syndrome (HAVS)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Hand-Arm Vibration Syndrome (HAVS) is a serious condition caused by regular use of vibrating hand-held power tools. It affects blood vessels, nerves, muscles, and joints in the hands and arms. HAVS is particularly relevant to electricians who regularly use hammer drills, SDS drills, and angle grinders. The damage is permanent - there is no cure.
            </p>

            <p>
              <strong>How vibration causes damage:</strong> Vibration transmitted through tool handles damages blood vessels, causing them to spasm and restrict blood flow (white finger). It also damages nerves, causing numbness and tingling, and can damage joints and muscles. The damage accumulates with exposure - the more you use vibrating tools without controls, the worse it gets.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">HAVS symptoms to watch for:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Tingling or numbness in fingers - especially after using tools</li>
                <li>Fingers going white (blanching) in cold conditions</li>
                <li>Loss of feeling - difficulty with fine tasks like buttons</li>
                <li>Reduced grip strength - dropping things</li>
                <li>Pain or aching in hands and arms</li>
                <li>Attacks triggered by cold, wet, or stress</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Exposure Action Value</p>
                <p className="text-white/90 text-xs">2.5 m/s2 A(8) - introduce controls and health surveillance</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Exposure Limit Value</p>
                <p className="text-white/90 text-xs">5 m/s2 A(8) - must not be exceeded</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Report any symptoms immediately. Early detection through health surveillance allows exposure reduction before permanent severe disability. If you notice tingling, numbness, or white finger attacks, tell your employer and see occupational health.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 - Control Measures */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Control Measures and Health Surveillance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The hierarchy of control applies to manual handling, noise, and vibration hazards. Elimination and substitution come first - can we avoid the hazard entirely? Engineering controls provide collective protection without relying on individual behaviour. Administrative controls limit exposure. PPE is the last resort, used when other measures are insufficient.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Control measures for electricians:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Manual handling:</strong> Cable drums with stands, trolleys, hoists, team lifting</li>
                <li><strong>Noise:</strong> Low-noise tools, enclosures, job rotation, hearing protection</li>
                <li><strong>Vibration:</strong> Low-vibration tools, anti-vibration gloves, limiting exposure time</li>
              </ul>
            </div>

            <p>
              <strong>Health surveillance:</strong> For workers exposed above the action values, employers must provide health surveillance. This includes hearing tests (audiometry) for noise exposure and questionnaires/examinations for HAVS. Health surveillance detects early signs of damage when intervention can still help. It is not optional - it is a legal requirement when exposure triggers it.
            </p>

            <p>
              <strong>Your role:</strong> Attend health surveillance appointments. Report symptoms honestly - under-reporting means damage goes undetected. Use control measures and PPE provided. Do not override safety features on tools. Rotate tasks to limit exposure. Take breaks to allow recovery. Keep hands warm to reduce HAVS symptom triggers.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A company introduced vibration exposure monitoring for all power tool use. An electrician was found to be regularly exceeding the exposure limit from hammer drill use. By providing a low-vibration SDS drill and limiting daily hammer drill use, exposure was reduced below the action value. Early health surveillance found the electrician had very early HAVS symptoms. With reduced exposure, these stabilised rather than progressing to disability.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Heavy Lifting</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Assess using TILE - can you avoid the lift?</li>
                <li>Use mechanical aids where available</li>
                <li>Get help for heavy or awkward loads</li>
                <li>Clear the route before lifting</li>
                <li>Warm up if doing repeated lifting</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Using Power Tools</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Wear hearing protection for noisy tools</li>
                <li>Use low-vibration tools where available</li>
                <li>Take regular breaks from vibrating tools</li>
                <li>Keep hands warm in cold conditions</li>
                <li>Report any tingling or numbness</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Lifting with a bent back</strong> - bend knees, not back</li>
                <li><strong>Not wearing hearing protection</strong> - damage is permanent</li>
                <li><strong>Ignoring tingling fingers</strong> - early HAVS is treatable</li>
                <li><strong>Skipping health surveillance</strong> - it detects problems early</li>
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
                <p className="font-medium text-white mb-1">Noise Action Levels</p>
                <ul className="space-y-0.5">
                  <li>80 dB(A) - Lower action value</li>
                  <li>85 dB(A) - Upper action value</li>
                  <li>87 dB(A) - Exposure limit</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Vibration Limits</p>
                <ul className="space-y-0.5">
                  <li>EAV: 2.5 m/s2 A(8)</li>
                  <li>ELV: 5 m/s2 A(8)</li>
                  <li>Report symptoms immediately</li>
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
            <Link to="/study-centre/apprentice/level3-module1-section4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Fire Safety
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section4-6">
              Next: Environmental Hazards
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section4_5;
