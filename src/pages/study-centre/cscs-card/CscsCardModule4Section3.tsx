import { ArrowLeft, ArrowRight, Volume2, Ear, Shield, AlertTriangle, CheckCircle, Vibrate, Wrench, HeartPulse, Activity, HandMetal, ThermometerSun, ClipboardList, Timer, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Inline Knowledge Checks (3)                                       */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "noise-upper-action-level",
    question: "At the upper exposure action value of 85 dB(A), what is the employer required to do regarding hearing protection?",
    options: [
      "Make hearing protection available on request",
      "Provide hearing protection and ensure it is worn in designated hearing protection zones",
      "Recommend that employees purchase their own hearing protection",
      "Only provide hearing protection if the worker has already suffered hearing loss"
    ],
    correctIndex: 1,
    explanation:
      "At the upper exposure action value of 85 dB(A) daily or weekly average exposure, the Control of Noise at Work Regulations 2005 require the employer to provide suitable hearing protection to every worker who is exposed at or above this level and to ensure that the hearing protection is worn. The employer must also designate hearing protection zones, mark them with appropriate signage, and enforce mandatory wearing of hearing protection within those zones. This is a significant step up from the lower action value of 80 dB(A), where the employer only needs to make hearing protection available upon request. At the upper level, it is no longer optional — the employer has a legal duty to ensure hearing protection is actually worn, not just offered."
  },
  {
    id: "hearing-protection-snr",
    question: "What does the SNR (Single Number Rating) on hearing protection indicate?",
    options: [
      "The maximum noise level the protector can withstand before breaking",
      "The average noise reduction in decibels the protector provides across all frequencies",
      "The number of hours the protector can be worn before replacement",
      "The comfort rating assigned by the manufacturer"
    ],
    correctIndex: 1,
    explanation:
      "The SNR (Single Number Rating) is a single-figure measure of the noise attenuation (reduction) provided by a hearing protector, expressed in decibels (dB). It represents the average noise reduction across all frequencies when the protector is worn correctly. For example, a hearing protector with an SNR of 30 dB would reduce exposure by approximately 30 dB when fitted properly. However, in practice, the actual protection achieved is typically less than the SNR because of imperfect fitting, wear and tear, and other real-world factors. The HSE recommends using the 'SNR minus 4 dB' method for a realistic estimate: subtract the SNR from the ambient noise level and add 4 dB to account for real-world performance. For instance, in a 95 dB(A) environment with SNR 30 protectors, the estimated exposure at the ear would be 95 - 30 + 4 = 69 dB(A)."
  },
  {
    id: "hav-exposure-action-value",
    question: "What is the daily exposure action value (EAV) for hand-arm vibration under the Control of Vibration at Work Regulations 2005?",
    options: [
      "1.0 m/s² A(8)",
      "2.5 m/s² A(8)",
      "5.0 m/s² A(8)",
      "10.0 m/s² A(8)"
    ],
    correctIndex: 1,
    explanation:
      "The daily exposure action value (EAV) for hand-arm vibration is 2.5 m/s² A(8), where A(8) represents the daily eight-hour time-weighted average vibration magnitude. When a worker's daily exposure reaches or exceeds this value, the employer must take action to reduce exposure. This includes introducing a programme of organisational and technical measures to reduce vibration exposure, providing information and training to workers on the risks and controls, and placing exposed workers under health surveillance. The EAV is not a 'safe' level — it is the trigger point at which action is legally required. Even below 2.5 m/s² A(8), the employer has a general duty to reduce vibration exposure to as low a level as is reasonably practicable."
  }
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Can noise-induced hearing loss be reversed or treated?",
    answer:
      "No. Noise-induced hearing loss (NIHL) is permanent and irreversible. Once the delicate hair cells in the cochlea of the inner ear are damaged by excessive noise exposure, they cannot regenerate or be repaired. Unlike many other tissues in the body, these sensory hair cells do not grow back. The damage is cumulative, meaning each exposure to excessive noise adds to the total damage already sustained. Hearing aids can amplify remaining hearing but cannot restore the lost sensitivity or clarity. Cochlear implants may help in severe cases but are not a cure. Tinnitus (persistent ringing or buzzing in the ears), which often accompanies NIHL, is similarly permanent in most cases. Prevention through proper noise control measures and consistent use of hearing protection is the only effective strategy. This is why the Control of Noise at Work Regulations 2005 place such emphasis on prevention and early detection through health surveillance."
  },
  {
    question: "How do I know if my workplace is too noisy and I need hearing protection?",
    answer:
      "As a general rule of thumb, if you need to raise your voice to have a normal conversation with someone approximately 2 metres away, the noise level is likely to be around 85 dB(A) or above — the upper exposure action value at which hearing protection becomes mandatory. However, this is only a rough indicator. The only reliable way to determine actual noise exposure levels is through a formal noise assessment conducted using calibrated sound level meters and personal noise dosimeters by a competent person. Employers have a legal duty under the Control of Noise at Work Regulations 2005 to carry out a noise assessment where any employee is likely to be exposed at or above the lower exposure action value of 80 dB(A). If you are uncertain, you should ask your employer or site manager whether a noise assessment has been carried out for your work area. Construction sites are almost always noisy enough to require formal assessment."
  },
  {
    question: "What is the difference between Hand-Arm Vibration Syndrome (HAVS) and Whole-Body Vibration (WBV)?",
    answer:
      "Hand-Arm Vibration Syndrome (HAVS) is caused by vibration transmitted through the hands and arms from handheld power tools and equipment such as angle grinders, hammer drills, concrete breakers, and disc cutters. The vibration damages the small blood vessels, nerves, muscles, and joints of the hands, fingers, and arms. Symptoms include white finger (blanching of the fingers, also known as vibration white finger or Raynaud's phenomenon), numbness, tingling, pain, and reduced grip strength. Whole-Body Vibration (WBV), by contrast, is transmitted through the whole body, typically through the seat or floor of a vehicle or machine. Sources include driving construction vehicles (dumpers, excavators, bulldozers), operating mobile plant on rough terrain, and standing on vibrating platforms. WBV primarily affects the lower back and spine and can cause or aggravate back pain, disc degeneration, and musculoskeletal disorders. Both are covered by the Control of Vibration at Work Regulations 2005, but they have different exposure action values and exposure limit values."
  },
  {
    question: "How is vibration exposure calculated and what tools are available to help?",
    answer:
      "Vibration exposure is calculated as a daily dose expressed as an eight-hour time-weighted average, denoted A(8), measured in metres per second squared (m/s²). The calculation takes into account the vibration magnitude of the tool (measured in m/s² or obtained from the manufacturer's declaration) and the duration of exposure (how long the worker uses the tool during the day). The formula combines these two factors to produce a single daily exposure value that can be compared against the exposure action value (2.5 m/s² A(8)) and exposure limit value (5.0 m/s² A(8)). The HSE provides a free online Hand-Arm Vibration Exposure Calculator that allows employers and workers to input tool vibration magnitudes and exposure durations to calculate daily exposure. The HSE also publishes vibration data for common tools. Employers should use exposure calculators as part of their risk assessment and to plan job rotation and trigger times — the maximum daily duration a specific tool can be used before the EAV or ELV is reached."
  }
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "What is the lower exposure action value for daily noise exposure under the Control of Noise at Work Regulations 2005?",
    options: [
      "75 dB(A)",
      "80 dB(A)",
      "85 dB(A)",
      "87 dB(A)"
    ],
    correctAnswer: 1,
    explanation:
      "The lower exposure action value is 80 dB(A) daily or weekly average exposure, with a peak sound pressure of 135 dB(C). At this level, the employer must make a suitable and sufficient assessment of the risk, provide information and training to workers about the risks, and make hearing protection available upon request. The lower action value represents the point at which noise exposure is considered significant enough to require action, even though it is below the level at which hearing protection becomes mandatory."
  },
  {
    id: 2,
    question:
      "What is the exposure limit value for daily noise exposure that must never be exceeded?",
    options: [
      "80 dB(A)",
      "85 dB(A)",
      "87 dB(A)",
      "90 dB(A)"
    ],
    correctAnswer: 2,
    explanation:
      "The exposure limit value is 87 dB(A) daily or weekly average exposure, with a peak sound pressure of 140 dB(C). This is an absolute limit that must not be exceeded, taking into account the effect of any hearing protection worn. If a worker is exposed to 95 dB(A) but wears hearing protection that provides 10 dB attenuation, the effective exposure at the ear is 85 dB(A) — below the limit value. However, if the hearing protection only provides 5 dB attenuation, the effective exposure would be 90 dB(A) — exceeding the limit value, which is a breach of the regulations."
  },
  {
    id: 3,
    question:
      "Which of the following is NOT a common symptom of Hand-Arm Vibration Syndrome (HAVS)?",
    options: [
      "White or blanched fingers in cold conditions",
      "Numbness and tingling in the fingers",
      "Persistent headaches and dizziness",
      "Reduced grip strength and difficulty handling small objects"
    ],
    correctAnswer: 2,
    explanation:
      "Persistent headaches and dizziness are not typical symptoms of HAVS. The classic symptoms of HAVS affect the hands, fingers, and arms and include: vascular symptoms (blanching or whitening of the fingers, known as vibration white finger, triggered by cold or damp conditions), neurological symptoms (numbness, tingling, pain, and loss of sensation in the fingers), and musculoskeletal symptoms (reduced grip strength, difficulty manipulating small objects, joint pain and stiffness in the hands and wrists). Headaches and dizziness may be associated with other occupational health conditions but are not characteristic of HAVS."
  },
  {
    id: 4,
    question:
      "What is the daily exposure action value for hand-arm vibration?",
    options: [
      "1.0 m/s² A(8)",
      "2.5 m/s² A(8)",
      "5.0 m/s² A(8)",
      "7.5 m/s² A(8)"
    ],
    correctAnswer: 1,
    explanation:
      "The daily exposure action value (EAV) for hand-arm vibration is 2.5 m/s² A(8). When a worker's daily vibration exposure reaches or exceeds this value, the employer must introduce a programme of organisational and technical measures to reduce exposure, provide information and training to exposed workers, and place them under appropriate health surveillance. The EAV is the trigger for preventive action and is set well below the level at which HAVS symptoms typically first appear, to allow intervention before irreversible damage occurs."
  },
  {
    id: 5,
    question:
      "What is the primary purpose of designating hearing protection zones on a construction site?",
    options: [
      "To indicate areas where noise levels are below 80 dB(A)",
      "To mark areas where hearing protection is mandatory because noise levels reach or exceed 85 dB(A)",
      "To show where ear plugs are stored and distributed",
      "To designate quiet rest areas for workers to recover from noise exposure"
    ],
    correctAnswer: 1,
    explanation:
      "Hearing protection zones are areas where noise levels reach or exceed the upper exposure action value of 85 dB(A). These zones must be demarcated (marked with physical boundaries where reasonably practicable) and identified with appropriate signage displaying the mandatory hearing protection symbol (blue circle with white ear defenders). Within these zones, everyone — including visitors, supervisors, and anyone passing through — must wear suitable hearing protection. The designation of hearing protection zones is a legal requirement under Regulation 7 of the Control of Noise at Work Regulations 2005."
  },
  {
    id: 6,
    question:
      "Which hierarchy of control should be applied first when reducing noise exposure?",
    options: [
      "Provide hearing protection to all workers",
      "Rotate workers to limit individual exposure time",
      "Eliminate the noise source or substitute with a quieter alternative",
      "Erect noise barriers around the work area"
    ],
    correctAnswer: 2,
    explanation:
      "The hierarchy of noise controls follows the same general hierarchy of controls used in all health and safety risk management: eliminate, substitute, engineering controls, administrative controls, and personal protective equipment (PPE). Eliminating the noise source entirely is the most effective measure — for example, using a pre-fabricated component instead of cutting and grinding on site. If elimination is not possible, substitution with a quieter tool or process is the next preference. Engineering controls (barriers, enclosures, damping) come next, followed by administrative controls (job rotation, limiting exposure time), and finally hearing protection as a last resort. Hearing protection should never be the primary control measure."
  },
  {
    id: 7,
    question:
      "What type of health surveillance is required for workers regularly exposed to noise above the upper exposure action value?",
    options: [
      "Annual chest X-ray",
      "Lung function testing (spirometry)",
      "Audiometric testing (hearing tests)",
      "Blood pressure monitoring"
    ],
    correctAnswer: 2,
    explanation:
      "Workers who are regularly exposed to noise at or above the upper exposure action value of 85 dB(A), or who are at risk for any other reason, must be placed under appropriate health surveillance, which for noise exposure means audiometric testing (hearing tests). Audiometry measures the individual's hearing threshold at different frequencies and can detect early signs of noise-induced hearing loss before the person is aware of any change. Testing should be carried out before or soon after the start of exposure (baseline audiogram), then at regular intervals — typically annually for the first two years and then every three years if no changes are detected. If audiometric testing reveals hearing damage, the employer must review the risk assessment and control measures."
  },
  {
    id: 8,
    question:
      "Which of the following measures helps reduce hand-arm vibration exposure on a construction site?",
    options: [
      "Using tools with the highest power output for faster completion",
      "Selecting tools with anti-vibration handles, limiting exposure duration, and maintaining tools regularly",
      "Wearing thermal gloves to keep hands warm, which eliminates vibration risk entirely",
      "Working in cold conditions because vibration transmission is reduced at lower temperatures"
    ],
    correctAnswer: 1,
    explanation:
      "Reducing hand-arm vibration exposure requires a combination of measures: selecting tools with lower vibration magnitudes and anti-vibration handles or damping systems, limiting the duration of exposure by planning job rotation and scheduling breaks, maintaining tools regularly (blunt or worn tools generate more vibration), keeping hands warm and dry (cold exacerbates the vascular symptoms of HAVS), and using the correct tool for the job (an oversized or undersized tool will typically vibrate more). Thermal gloves can help reduce the vascular effects of cold but do not eliminate vibration risk. Cold conditions actually worsen HAVS symptoms. Using high-powered tools for speed may increase vibration exposure rather than reduce it."
  }
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function CscsCardModule4Section3() {
  useSEO({
    title: "Noise & Vibration | CSCS Card Module 4.3",
    description:
      "Learn about noise exposure action levels, hearing protection, hand-arm vibration syndrome (HAVS), the Control of Noise at Work Regulations 2005, the Control of Vibration at Work Regulations 2005, and health surveillance for noise and vibration exposure.",
  });

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
            <Link to="../cscs-card-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">

        {/* ============================================================ */}
        {/*  PAGE TITLE                                                   */}
        {/* ============================================================ */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-400/20 border border-green-500/30 mb-4">
            <Volume2 className="h-7 w-7 text-green-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3 mx-auto">
            <span className="text-green-400 text-xs font-semibold">MODULE 4 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Noise &amp; Vibration
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding how excessive noise and vibration on construction sites cause permanent
            health damage, the legal exposure limits that apply, and the practical measures
            required to protect hearing and prevent hand-arm vibration syndrome
          </p>
        </header>

        {/* ============================================================ */}
        {/*  QUICK SUMMARY BOXES                                          */}
        {/* ============================================================ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>80 dB(A):</strong> Lower action value &mdash; assess, inform, make PPE available</li>
              <li><strong>85 dB(A):</strong> Upper action value &mdash; PPE mandatory, hearing zones</li>
              <li><strong>HAV EAV:</strong> 2.5 m/s&sup2; A(8) &mdash; action required</li>
              <li><strong>NIHL is permanent</strong> &mdash; prevention is the only cure</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400 text-base font-medium mb-2">Key Legislation</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Noise Regulations 2005:</strong> Control of Noise at Work</li>
              <li><strong>Vibration Regulations 2005:</strong> Control of Vibration at Work</li>
              <li><strong>MHSW 1999:</strong> Management of Health &amp; Safety at Work</li>
              <li><strong>PPE Regulations 2022:</strong> Provision of hearing protection</li>
            </ul>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  LEARNING OUTCOMES                                            */}
        {/* ============================================================ */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify common noise sources on construction sites and explain how noise damages hearing",
              "State the three noise action levels and employer duties at each under the 2005 Regulations",
              "Describe the hierarchy of noise controls from elimination through to hearing protection",
              "Explain how to select, fit, and maintain hearing protection using the SNR rating",
              "Describe the causes, symptoms, and staging of hand-arm vibration syndrome (HAVS)",
              "State the vibration exposure action value and exposure limit value and measures to reduce risk"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-green-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01: Noise in Construction                            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 text-green-400 text-sm font-bold border border-green-500/20">01</span>
              Noise in Construction
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction is one of the noisiest industries in the United Kingdom. Workers are routinely exposed to hazardous noise levels from a wide variety of tools, equipment, and processes. <strong>Noise-induced hearing loss (NIHL)</strong> is the most common occupational disease in the UK construction sector, and it is entirely preventable. The critical point to understand is that once hearing is lost through noise exposure, <strong>it is permanent and irreversible</strong> &mdash; there is no medical treatment, surgery, or hearing aid that can restore it.
              </p>

              <p>
                <strong>Common noise sources on construction sites</strong> include:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Angle grinders</strong> &mdash; typically produce 95&ndash;105 dB(A) depending on the disc type and material being cut. Cutting and grinding metal generates particularly high noise levels due to the friction and impact between the abrasive disc and the workpiece</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Hammer drills and rotary percussion drills</strong> &mdash; produce 95&ndash;110 dB(A). The percussive action generates impulsive noise that is particularly damaging to hearing because the ear does not have time to activate its protective reflex between impacts</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Concrete saws and disc cutters</strong> &mdash; produce 100&ndash;115 dB(A). These are among the loudest tools commonly used on construction sites, and even brief exposure without hearing protection can cause immediate, permanent damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Generators and compressors</strong> &mdash; produce 85&ndash;100 dB(A). Although individual units may not seem extremely loud, they often run continuously throughout the working day, creating a high cumulative dose of noise exposure</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Pile drivers</strong> &mdash; produce 100&ndash;120 dB(A) or more. Impact piling generates extremely high peak noise levels that can cause immediate acoustic trauma. Pile-driving operations typically require extensive noise control measures and exclusion zones</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Other common sources:</strong> chop saws, nail guns, pneumatic drills, circular saws, demolition activities, and even raised voices in an already noisy environment. Noise from multiple sources combines to create overall levels that may be significantly higher than any single source</span>
                </li>
              </ul>

              <p>
                <strong>How noise damages hearing:</strong> Sound waves enter the ear canal and cause the eardrum (tympanic membrane) to vibrate. These vibrations are transmitted through the three small bones of the middle ear (the ossicles) to the cochlea in the inner ear. The cochlea is a fluid-filled, snail-shaped structure lined with thousands of tiny <strong>hair cells</strong>. These hair cells convert the mechanical vibrations into electrical signals that travel along the auditory nerve to the brain. Excessive noise exposure damages and destroys these hair cells. Unlike many cells in the body, the hair cells of the human cochlea <strong>do not regenerate</strong>. Once destroyed, they are gone permanently. The damage is cumulative &mdash; each episode of excessive exposure adds to the total damage already sustained, gradually eroding the worker&rsquo;s ability to hear.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white">
                    <strong className="text-green-400">Key Fact:</strong> Noise-induced hearing loss typically develops gradually over months and years of exposure, which means workers often do not notice the damage until it is severe. Early signs include difficulty hearing conversations in noisy environments, needing to turn up the television volume, and <strong>tinnitus</strong> (persistent ringing, buzzing, or hissing in the ears). Tinnitus can be debilitating, affecting sleep, concentration, and mental health. Like NIHL itself, tinnitus caused by noise exposure is usually permanent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: Control of Noise at Work Regulations 2005        */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 text-green-400 text-sm font-bold border border-green-500/20">02</span>
              Control of Noise at Work Regulations 2005
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Control of Noise at Work Regulations 2005</strong> implement EU Physical Agents (Noise) Directive 2003/10/EC into UK law. They place duties on employers to protect workers from the risks of noise exposure in the workplace. The regulations establish <strong>three action levels</strong> based on daily or weekly average noise exposure and peak sound pressure, each triggering specific duties on the employer.
              </p>

              <p>
                The three action levels are:
              </p>

              {/* ── Noise Action Levels Diagram ── */}
              <div className="bg-gradient-to-br from-green-500/10 to-green-400/5 border border-green-500/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Volume2 className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Noise Action Levels &amp; Employer Duties</p>
                </div>
                <div className="space-y-3">
                  {/* Lower Action Value */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500/30">
                        <span className="text-[10px] font-bold text-yellow-400">1</span>
                      </div>
                      <p className="text-sm font-bold text-yellow-400">Lower Exposure Action Value</p>
                    </div>
                    <p className="text-xs text-white/60 mb-2">Daily/weekly: <strong className="text-white">80 dB(A)</strong> &nbsp;|&nbsp; Peak: <strong className="text-white">135 dB(C)</strong></p>
                    <ul className="space-y-1 text-xs text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-yellow-400" />
                        <span>Carry out a noise risk assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-yellow-400" />
                        <span>Provide information and training about the risks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-yellow-400" />
                        <span>Make hearing protection available on request</span>
                      </li>
                    </ul>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-px h-4 bg-green-500/30" />
                  </div>

                  {/* Upper Action Value */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/30">
                        <span className="text-[10px] font-bold text-orange-400">2</span>
                      </div>
                      <p className="text-sm font-bold text-orange-400">Upper Exposure Action Value</p>
                    </div>
                    <p className="text-xs text-white/60 mb-2">Daily/weekly: <strong className="text-white">85 dB(A)</strong> &nbsp;|&nbsp; Peak: <strong className="text-white">137 dB(C)</strong></p>
                    <ul className="space-y-1 text-xs text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-orange-400" />
                        <span>Reduce exposure through a programme of noise control measures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-orange-400" />
                        <span>Provide hearing protection and ensure it is worn</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-orange-400" />
                        <span>Designate and mark hearing protection zones</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-orange-400" />
                        <span>Provide health surveillance (audiometric testing)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-px h-4 bg-green-500/30" />
                  </div>

                  {/* Exposure Limit Value */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30">
                        <span className="text-[10px] font-bold text-red-400">3</span>
                      </div>
                      <p className="text-sm font-bold text-red-400">Exposure Limit Value</p>
                    </div>
                    <p className="text-xs text-white/60 mb-2">Daily/weekly: <strong className="text-white">87 dB(A)</strong> &nbsp;|&nbsp; Peak: <strong className="text-white">140 dB(C)</strong></p>
                    <ul className="space-y-1 text-xs text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>Must NEVER be exceeded (takes hearing protection into account)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>If exceeded, take immediate action to reduce exposure below the limit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>Identify the reason for the breach and prevent recurrence</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-3">
                  <p className="text-xs text-white/60 text-center">
                    <strong className="text-white/80">Important distinction:</strong> The exposure limit value of 87 dB(A) takes into account the noise reduction provided by hearing protection. The action values of 80 and 85 dB(A) do <strong>not</strong> take hearing protection into account &mdash; they are measured at the ambient noise level.
                  </p>
                </div>
              </div>

              <p>
                Employers have a general duty under the regulations to reduce noise exposure to the <strong>lowest level reasonably practicable</strong>, regardless of whether the action values are reached. The regulations also require employers to ensure that any personal hearing protectors provided are properly used, maintained, and stored, and that workers receive adequate information, instruction, and training on the risks of noise exposure and the control measures in place.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: Noise Assessment & Control                      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 text-green-400 text-sm font-bold border border-green-500/20">03</span>
              Noise Assessment &amp; Control
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>noise assessment</strong> must be carried out by a competent person whenever workers are likely to be exposed at or above the lower exposure action value of 80 dB(A). On construction sites, this threshold is exceeded in the vast majority of work activities involving power tools, plant, or machinery. The noise assessment should identify who is at risk, what the noise sources are, what the exposure levels are, and what control measures are needed.
              </p>

              <p>
                The assessment is typically carried out using <strong>calibrated sound level meters</strong> (to measure area noise levels) and <strong>personal noise dosimeters</strong> (small devices worn by the worker throughout the day to measure individual cumulative exposure). The results are used to determine whether action values are being reached and to prioritise control measures.
              </p>

              <p>
                <strong>The hierarchy of noise controls</strong> must be applied in the following order. The employer must always consider higher-level controls before resorting to lower-level ones:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Eliminate</strong> &mdash; remove the noise source entirely. For example, use pre-fabricated components instead of cutting and grinding on site, or use bolted connections instead of impact fixing. Elimination is always the most effective control because it removes the hazard completely</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Substitute</strong> &mdash; replace the noisy tool or process with a quieter alternative. For example, use electric tools instead of pneumatic tools (which are typically louder), use diamond wire cutting instead of disc cutting, or use hydraulic breakers instead of pneumatic breakers. Always check the manufacturer&rsquo;s noise data when selecting equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Engineering controls</strong> &mdash; use physical measures to reduce noise at source or along the transmission path. Examples include acoustic enclosures around noisy machinery, noise barriers between the source and workers, vibration-damping mounts to reduce structure-borne noise, and silencers on exhaust systems. Moving noisy equipment further away from workers (increasing the distance) also reduces exposure, as sound intensity decreases with the square of the distance</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Administrative controls</strong> &mdash; organise work to reduce exposure. Examples include limiting the time each worker spends on noisy tasks, rotating workers between noisy and quiet jobs, scheduling noisy activities when fewer people are nearby, and ensuring regular maintenance of tools and equipment (poorly maintained tools often generate more noise)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Personal hearing protection</strong> &mdash; the last resort in the hierarchy. Hearing protection (ear plugs, ear defenders) should only be relied upon when the above measures have been implemented and exposure still reaches the action values. Hearing protection must be suitable for the noise levels, correctly fitted, and consistently worn. It is never an acceptable substitute for proper noise control at source</span>
                </li>
              </ul>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Noise Assessment Records:</strong> The noise assessment must be recorded and kept as part of the overall risk assessment documentation. It should be reviewed regularly and updated whenever there are significant changes to work practices, equipment, or the workplace environment. On construction sites, the assessment may need to be updated as different phases of the project introduce different noise sources.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: Hearing Protection                               */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 text-green-400 text-sm font-bold border border-green-500/20">04</span>
              Hearing Protection
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When noise exposure cannot be adequately controlled through elimination, substitution, engineering, or administrative measures, <strong>personal hearing protection</strong> must be provided. There are two main types of hearing protection used on construction sites, each with advantages and limitations.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <Ear className="h-6 w-6 text-green-400 mb-2" />
                  <p className="text-sm font-semibold text-green-400 mb-1">Ear Plugs</p>
                  <p className="text-xs text-white/70 mb-2">Inserted into the ear canal to block sound transmission. Available as disposable foam plugs, reusable silicone plugs, or custom-moulded plugs.</p>
                  <ul className="space-y-1 text-xs text-white/60">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Lightweight and comfortable for extended wear</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Compatible with other PPE (hard hats, safety glasses)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Must be inserted correctly for effective protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Hands must be clean when inserting to prevent ear infections</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <Shield className="h-6 w-6 text-green-400 mb-2" />
                  <p className="text-sm font-semibold text-green-400 mb-1">Ear Defenders (Muffs)</p>
                  <p className="text-xs text-white/70 mb-2">Cups that fit over the entire ear, sealed against the head with cushioned pads, held in place by a headband or attached to a hard hat.</p>
                  <ul className="space-y-1 text-xs text-white/60">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Generally provide higher attenuation than plugs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Easier to fit correctly &mdash; less dependent on technique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Seal can be broken by spectacles, long hair, or headwear</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Can be hot and uncomfortable in warm conditions</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                <strong>Selecting correct hearing protection using the SNR:</strong> The <strong>Single Number Rating (SNR)</strong> is a measure of the average noise attenuation (reduction) provided by a hearing protector, expressed in decibels. To estimate the noise level at the ear when wearing hearing protection, use the HSE&rsquo;s &ldquo;SNR minus 4 dB&rdquo; method: subtract the SNR from the ambient noise level and add 4 dB to account for real-world performance. For example, in a 100 dB(A) environment with an SNR 25 protector: 100 &minus; 25 + 4 = 79 dB(A) at the ear.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Over-Protection Warning</p>
                <p className="text-sm text-white/80">
                  It is important not to <strong>over-protect</strong>. If the hearing protection reduces noise at the ear to below 70 dB(A), the wearer may feel isolated, unable to hear warning signals, alarms, or verbal instructions. This creates a safety hazard in itself. The aim is to reduce the noise at the ear to between 70 and 80 dB(A) &mdash; below the lower action value but not so low that situational awareness is compromised.
                </p>
              </div>

              <p>
                <strong>Proper fitting, maintenance, and hearing protection zones:</strong>
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Fitting:</strong> Foam ear plugs must be rolled into a tight cylinder with clean hands, inserted into the ear canal, and held in place until they expand to form a seal. Ear defenders must be adjusted so the headband provides even pressure and the cushion seals fully around the ear with no gaps caused by spectacles, hair, or PPE straps</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Maintenance:</strong> Reusable ear plugs must be washed regularly and replaced when they lose their flexibility. Ear defender cushions degrade over time (typically replaced every 6&ndash;12 months) and must be inspected regularly for cracks, hardening, or loss of seal. Headbands lose tension with age and should be replaced when they no longer hold the cups firmly</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Hearing protection zones:</strong> Areas where noise levels reach or exceed the upper exposure action value of 85 dB(A) must be designated as hearing protection zones. These zones must be marked with the mandatory hearing protection sign (blue circle, white ear defenders symbol) and demarcated where reasonably practicable. <strong>Everyone entering a hearing protection zone must wear hearing protection</strong> &mdash; this includes supervisors, visitors, and anyone passing through, not just the workers generating the noise</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05: Hand-Arm Vibration (HAV)                        */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 text-green-400 text-sm font-bold border border-green-500/20">05</span>
              Hand-Arm Vibration (HAV)
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Hand-arm vibration (HAV)</strong> is vibration transmitted from work processes into workers&rsquo; hands and arms. It is caused by the regular and frequent use of handheld vibrating tools, vibrating machinery held against a workpiece, or workpieces held against vibrating machinery. Prolonged exposure to HAV causes <strong>Hand-Arm Vibration Syndrome (HAVS)</strong>, a serious and disabling condition that affects the blood vessels, nerves, muscles, and joints of the hands, fingers, wrists, and arms.
              </p>

              <p>
                <strong>Common tools that cause HAV on construction sites:</strong>
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Angle grinders and disc cutters</strong> &mdash; high vibration from the spinning disc and impact with the material</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Hammer drills and rotary percussion drills</strong> &mdash; the percussive action generates significant hand-arm vibration</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Concrete breakers and demolition hammers</strong> &mdash; among the highest vibration tools on construction sites, capable of reaching the exposure limit value in under 30 minutes of use</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Sanders and polishers</strong> &mdash; orbital and random-orbit sanders produce continuous vibration during surface preparation work</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Chipping hammers, needle guns, and rivet busters</strong> &mdash; impact tools that generate high levels of impulsive vibration</span>
                </li>
              </ul>

              <p>
                <strong>Symptoms of HAVS</strong> fall into three categories:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Vascular symptoms (vibration white finger)</strong> &mdash; the fingers turn white (blanch) when exposed to cold or damp conditions. The blanching starts at the tips and works down towards the knuckle. The affected fingers feel cold, numb, and painful. As blood flow returns, the fingers turn red, throb, and tingle painfully. Episodes can last from minutes to hours and are triggered by cold exposure</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Neurological symptoms</strong> &mdash; numbness and tingling (paraesthesia) in the fingers, loss of sensation (particularly in the fingertips), reduced ability to detect temperature or texture, and difficulty with fine manipulative tasks such as picking up small objects, doing up buttons, or handling coins</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Musculoskeletal symptoms</strong> &mdash; reduced grip strength, joint pain and stiffness in the hands and wrists, muscle weakness, and difficulty gripping tools or objects firmly. In advanced cases, this can significantly impair the worker&rsquo;s ability to perform their job and carry out everyday activities</span>
                </li>
              </ul>

              {/* ── HAVS Symptoms Progression Diagram ── */}
              <div className="bg-gradient-to-br from-green-500/10 to-green-400/5 border border-green-500/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">HAVS Symptoms Progression</p>
                </div>
                <p className="text-xs text-white/50 mb-4">Staging from early to advanced &mdash; based on the Stockholm Workshop Scale</p>
                <div className="space-y-3">
                  {/* Stage 1: Early */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500/30">
                        <span className="text-[10px] font-bold text-yellow-400">1</span>
                      </div>
                      <p className="text-sm font-bold text-yellow-400">Early Stage (Mild)</p>
                    </div>
                    <ul className="space-y-1 text-xs text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-yellow-400" />
                        <span>Occasional tingling in fingertips, usually after using vibrating tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-yellow-400" />
                        <span>Occasional blanching of one or two fingertips in cold conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-yellow-400" />
                        <span>Symptoms are intermittent and may be dismissed as normal</span>
                      </li>
                    </ul>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-px h-4 bg-green-500/30" />
                  </div>

                  {/* Stage 2: Intermediate */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/30">
                        <span className="text-[10px] font-bold text-orange-400">2</span>
                      </div>
                      <p className="text-sm font-bold text-orange-400">Intermediate Stage (Moderate)</p>
                    </div>
                    <ul className="space-y-1 text-xs text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-orange-400" />
                        <span>Frequent blanching extending to the middle and base of fingers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-orange-400" />
                        <span>Persistent numbness and tingling, even when not using tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-orange-400" />
                        <span>Noticeable reduction in grip strength and fine motor control</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-orange-400" />
                        <span>Difficulty with everyday tasks: buttons, zips, handling coins</span>
                      </li>
                    </ul>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-px h-4 bg-green-500/30" />
                  </div>

                  {/* Stage 3: Advanced */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30">
                        <span className="text-[10px] font-bold text-red-400">3</span>
                      </div>
                      <p className="text-sm font-bold text-red-400">Advanced Stage (Severe)</p>
                    </div>
                    <ul className="space-y-1 text-xs text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>Extensive blanching affecting most or all fingers on both hands</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>Frequent attacks triggered by even mild cold exposure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>Severe loss of sensation &mdash; risk of burns and injuries unnoticed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                        <span>Significant disability: unable to perform manual work, tissue damage possible</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-3">
                  <p className="text-xs text-white/60 text-center">
                    <strong className="text-white/80">Critical point:</strong> HAVS is largely irreversible once established. Early detection through health surveillance is essential because removing the worker from vibration exposure in the early stage may prevent progression to more severe and disabling stages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06: Control of Vibration at Work Regulations 2005    */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 text-green-400 text-sm font-bold border border-green-500/20">06</span>
              Control of Vibration at Work Regulations 2005
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Control of Vibration at Work Regulations 2005</strong> implement EU Physical Agents (Vibration) Directive 2002/44/EC into UK law. They establish exposure action values and exposure limit values for both hand-arm vibration (HAV) and whole-body vibration (WBV), and place duties on employers to assess, control, and monitor vibration exposure.
              </p>

              <div className="bg-gradient-to-br from-green-500/10 to-green-400/5 border border-green-500/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Vibrate className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Vibration Exposure Values</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {/* HAV Values */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-sm font-bold text-green-400 mb-3">Hand-Arm Vibration (HAV)</p>
                    <div className="space-y-3">
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded p-2">
                        <p className="text-xs font-bold text-orange-400">Exposure Action Value (EAV)</p>
                        <p className="text-lg font-bold text-white">2.5 m/s&sup2; A(8)</p>
                        <p className="text-[10px] text-white/50 mt-1">Action required: reduce exposure, inform workers, health surveillance</p>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/20 rounded p-2">
                        <p className="text-xs font-bold text-red-400">Exposure Limit Value (ELV)</p>
                        <p className="text-lg font-bold text-white">5.0 m/s&sup2; A(8)</p>
                        <p className="text-[10px] text-white/50 mt-1">Must NOT be exceeded &mdash; immediate action to reduce below limit</p>
                      </div>
                    </div>
                  </div>

                  {/* WBV Values */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-sm font-bold text-green-400 mb-3">Whole-Body Vibration (WBV)</p>
                    <div className="space-y-3">
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded p-2">
                        <p className="text-xs font-bold text-orange-400">Exposure Action Value (EAV)</p>
                        <p className="text-lg font-bold text-white">0.5 m/s&sup2; A(8)</p>
                        <p className="text-[10px] text-white/50 mt-1">Action required: reduce exposure, inform workers, health surveillance</p>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/20 rounded p-2">
                        <p className="text-xs font-bold text-red-400">Exposure Limit Value (ELV)</p>
                        <p className="text-lg font-bold text-white">1.15 m/s&sup2; A(8)</p>
                        <p className="text-[10px] text-white/50 mt-1">Must NOT be exceeded &mdash; immediate action to reduce below limit</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                <strong>Employer duties when the exposure action value is reached or exceeded:</strong>
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Introduce a programme of measures</strong> to reduce vibration exposure to as low a level as is reasonably practicable. This may include changing tools, limiting exposure times, introducing job rotation, and improving tool maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Provide information and training</strong> to workers on the health risks of vibration exposure, the symptoms of HAVS, the exposure limits, the control measures in place, and the importance of reporting symptoms early</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Place exposed workers under health surveillance</strong> &mdash; this is a legal requirement when the EAV is reached. Health surveillance for HAVS includes regular questionnaires and clinical assessments to detect early signs of the condition</span>
                </li>
              </ul>

              <p>
                <strong>Employer duties when the exposure limit value is reached or exceeded:</strong>
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Take immediate action</strong> to reduce exposure below the limit value. This may mean stopping the work activity, replacing the tool, or removing the worker from the task</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Identify the reason</strong> for the limit being exceeded and take measures to prevent it happening again. The risk assessment and control measures must be reviewed and updated</span>
                </li>
              </ul>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">General Duty:</strong> As with noise, employers have a general duty to reduce vibration exposure to the lowest level reasonably practicable, even if the action values are not reached. This is particularly important because HAVS can develop at exposure levels below the EAV if exposure is sustained over many years.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 07: Reducing Vibration Risk                          */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 text-green-400 text-sm font-bold border border-green-500/20">07</span>
              Reducing Vibration Risk
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Reducing vibration risk requires a combination of technical, organisational, and individual measures. Unlike hearing protection for noise, there is <strong>no effective personal protective equipment for vibration</strong> &mdash; so-called &ldquo;anti-vibration gloves&rdquo; provide minimal reduction in the vibration frequencies most harmful to the hands. Effective control must focus on the tool, the task, and the exposure duration.
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Select lower-vibration tools</strong> &mdash; when purchasing or hiring tools, compare the vibration magnitudes declared by manufacturers. Choose tools with the lowest vibration output that can still perform the task. Modern tools are increasingly designed with vibration reduction in mind. For example, a hydraulic concrete breaker typically produces less vibration than a pneumatic one performing the same task</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Use anti-vibration handles and damping systems</strong> &mdash; many modern power tools are available with anti-vibration handles, spring-mounted grips, or internal damping mechanisms that reduce the vibration transmitted to the hands. Retrofitting anti-vibration handles to existing tools can also be effective. Always ensure that the anti-vibration features are in good condition and functioning correctly</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Limit exposure time</strong> &mdash; calculate the &ldquo;trigger time&rdquo; for each tool: the maximum daily usage time before the EAV or ELV is reached. For high-vibration tools such as concrete breakers, the trigger time may be surprisingly short &mdash; as little as 15&ndash;30 minutes per day to reach the EAV. Plan work schedules around these trigger times to prevent overexposure</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Job rotation</strong> &mdash; rotate workers between vibration-intensive tasks and non-vibrating tasks throughout the day. This spreads the exposure across more workers rather than concentrating it on a few individuals. However, job rotation must be properly planned &mdash; simply sharing the same tool between workers does not reduce anyone&rsquo;s individual exposure unless each person&rsquo;s total trigger time is managed</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Keep hands warm and dry</strong> &mdash; cold conditions constrict blood vessels and significantly worsen the vascular symptoms of HAVS. Workers should be provided with warm, waterproof gloves (not anti-vibration gloves, which offer no meaningful protection), heated rest areas during breaks, and warm beverages. Work involving vibrating tools should be minimised or avoided in very cold weather where possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Regular tool maintenance</strong> &mdash; poorly maintained tools generate significantly more vibration than well-maintained ones. Blunt cutting edges, worn bearings, damaged damping mounts, and loose components all increase vibration output. Establish a programme of regular maintenance, inspection, and replacement of worn parts. Replace tools that can no longer be maintained to an acceptable standard</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Use the HSE Vibration Calculator</strong> &mdash; the HSE provides a free online <strong>Hand-Arm Vibration Exposure Calculator</strong> that allows employers and workers to input tool vibration magnitudes and daily usage times to calculate the eight-hour time-weighted average exposure A(8). This helps determine whether action values are being reached and assists in planning trigger times and job rotation schedules. The calculator is available on the HSE website and is an invaluable tool for compliance</span>
                </li>
              </ul>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Wrench className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white mb-2">Grip Force</p>
                    <p className="text-sm text-white/80">
                      Encourage workers to use the minimum grip force necessary to control the tool safely. A tight, white-knuckle grip transmits more vibration to the hands than a relaxed, controlled grip. Workers should also avoid supporting the weight of the tool unnecessarily &mdash; tools should be balanced and supported by their own handles, jigs, or counterbalance systems where possible. This is particularly important for heavy tools such as concrete breakers and large grinders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08: Health Surveillance for Noise & Vibration        */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/10 text-green-400 text-sm font-bold border border-green-500/20">08</span>
              Health Surveillance for Noise &amp; Vibration
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Health surveillance</strong> is the systematic monitoring of workers&rsquo; health to detect early signs of work-related disease. For noise and vibration, health surveillance serves two critical purposes: it identifies individuals who are developing hearing loss or HAVS at an early stage (when intervention can prevent further damage), and it provides feedback on the effectiveness of the control measures in place. Health surveillance is a legal requirement under both the noise and vibration regulations when workers are exposed at or above the relevant action values.
              </p>

              <p className="font-medium text-white">Health Surveillance for Noise Exposure</p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Audiometric testing (audiometry)</strong> is the primary form of health surveillance for noise-exposed workers. It involves measuring the individual&rsquo;s hearing threshold at various frequencies using an audiometer &mdash; a device that plays tones at different pitches and volumes through headphones, and the individual indicates when they can hear the tone. The results are plotted on an audiogram</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Baseline audiogram:</strong> A baseline hearing test should be carried out before or soon after the worker begins exposure to noise (ideally within the first few weeks). This establishes the individual&rsquo;s starting hearing level against which future tests are compared</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Follow-up testing:</strong> Audiometric tests should be repeated annually for the first two years, then every three years if no significant changes are detected. If deterioration is found, the frequency of testing should increase and the cause investigated</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Categorisation:</strong> Audiometric results are typically categorised (e.g., Category 1 = acceptable hearing, Category 2 = mild hearing loss, Category 3 = poor hearing, Category 4 = rapid deterioration). Workers in higher categories may require referral to a specialist, review of their exposure, or redeployment to quieter work</span>
                </li>
              </ul>

              <p className="font-medium text-white">Health Surveillance for HAVS</p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Tier 1 &mdash; Screening questionnaire:</strong> All workers exposed to vibration at or above the EAV complete a simple questionnaire asking about symptoms such as tingling, numbness, white finger, pain, and grip problems. This is typically administered annually and can be carried out by a trained non-medical person. Workers reporting symptoms are referred to Tier 2</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Tier 2 &mdash; Assessment by a trained assessor:</strong> A more detailed interview and examination by someone trained in HAVS assessment (such as an occupational health nurse). This includes a standardised symptom history and a basic clinical examination of the hands. Workers with confirmed or suspected HAVS are referred to Tier 3</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Tier 3 &mdash; Clinical assessment by a doctor:</strong> A formal diagnosis by an occupational health physician, including standardised clinical tests for vascular function (cold provocation tests), neurological function (nerve conduction studies, thermal threshold testing), and musculoskeletal assessment. The doctor stages the condition using the Stockholm Workshop Scale and makes recommendations regarding fitness for continued vibration exposure</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span><strong>Tier 4 &mdash; Specialist referral:</strong> In complex or severe cases, the worker is referred to a specialist occupational medicine consultant or vascular surgeon for further investigation and management</span>
                </li>
              </ul>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <Stethoscope className="h-6 w-6 text-green-400 mb-2" />
                  <p className="text-sm font-semibold text-green-400 mb-1">Reporting Obligations</p>
                  <p className="text-xs text-white/70">
                    Cases of confirmed HAVS or occupational deafness must be reported to the HSE under <strong>RIDDOR 2013</strong> (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations). HAVS is a prescribed occupational disease, and employers have a legal duty to report diagnosed cases. Workers may also be entitled to claim Industrial Injuries Disablement Benefit (IIDB) for prescribed diseases including HAVS (PDA11) and occupational deafness (PDD1).
                  </p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <HeartPulse className="h-6 w-6 text-green-400 mb-2" />
                  <p className="text-sm font-semibold text-green-400 mb-1">Fitness for Work Decisions</p>
                  <p className="text-xs text-white/70">
                    When HAVS is confirmed, the occupational health physician must advise on the worker&rsquo;s fitness for continued vibration exposure. In early-stage cases, continuing with reduced exposure and enhanced monitoring may be appropriate. In moderate to severe cases, the worker may need to be permanently removed from vibration-exposed work. These decisions must balance the worker&rsquo;s health with their employment, and should involve discussion with the worker, their GP, and the employer.
                  </p>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <ClipboardList className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-white">
                    <strong className="text-green-400">Record Keeping:</strong> Health surveillance records must be kept for at least <strong>40 years</strong> from the date of the last entry. This extended retention period reflects the long latency of noise-induced hearing loss and HAVS &mdash; symptoms may not become apparent or worsen until years or decades after the exposure has ceased. Records must include the name and date of birth of the worker, the date and outcome of each health surveillance assessment, and the identity of the person carrying out the assessment. Individual workers are entitled to see their own health records upon request.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FAQ SECTION                                                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  END-OF-SECTION QUIZ                                          */}
        {/* ============================================================ */}
        <Quiz
          title="Section 3 Knowledge Check"
          questions={quizQuestions}
        />

        {/* ============================================================ */}
        {/*  BOTTOM NAVIGATION                                            */}
        {/* ============================================================ */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-green-500 text-white hover:bg-green-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-4-section-4">
              Environmental Protection
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

      </article>
    </div>
  );
}
