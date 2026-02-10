import { ArrowLeft, Skull, CheckCircle, AlertTriangle, ShieldAlert, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────────────────────────────
   Quick-check questions (InlineCheck after 02 / 05 / 07)
   ─────────────────────────────────────────────── */
const quickCheckQuestions = [
  {
    id: "cs-rescuer-statistic",
    question:
      "Approximately what percentage of confined-space fatalities in the UK are rescuers rather than the original entrants?",
    options: [
      "Around 20%",
      "Around 40%",
      "Around 60%",
      "Around 80%",
    ],
    correctIndex: 2,
    explanation:
      "HSE data consistently shows that approximately 60% of those who die in confined-space incidents are would-be rescuers, not the original entrants. This shocking statistic underscores why improvised rescue attempts without training, equipment, and atmospheric monitoring are so deadly. It is the foundation of the rule: NEVER attempt rescue without proper training and equipment.",
  },
  {
    id: "cs-oxygen-unconscious",
    question:
      "At what approximate oxygen concentration does a person typically lose consciousness without warning?",
    options: [
      "Below 19.5%",
      "Below 18%",
      "Below 16%",
      "Below 12%",
    ],
    correctIndex: 2,
    explanation:
      "Normal atmospheric oxygen is 20.9%. Impairment begins at around 19.5%, but loss of consciousness typically occurs rapidly and without warning when oxygen drops below approximately 16%. At concentrations below 6%, death can follow within minutes. The critical danger is that the person may feel no warning symptoms before suddenly collapsing.",
  },
  {
    id: "cs-cascade-effect",
    question:
      "What is the 'cascade effect' in confined-space incidents?",
    options: [
      "A gradual build-up of toxic gas over several hours",
      "One person is overcome, a colleague enters to help and is also overcome, then a third person enters — resulting in multiple casualties from a single incident",
      "The sequential failure of ventilation equipment",
      "The spread of gas from one confined space to an adjacent area",
    ],
    correctIndex: 1,
    explanation:
      "The cascade effect describes the tragically common pattern where one person is overcome by the atmosphere, a colleague rushes in to help without testing or equipment, and is themselves overcome. A third or even fourth person may then enter, each succumbing in turn. This is the single biggest reason why rescuers make up 60% of confined-space fatalities. Emergency rescue must ONLY be attempted by trained personnel with appropriate breathing apparatus and retrieval equipment.",
  },
];

/* ───────────────────────────────────────────────
   FAQs
   ─────────────────────────────────────────────── */
const faqs = [
  {
    question:
      "If I have entered a confined space before without incident, does that mean it is safe?",
    answer:
      "Absolutely not. Previous safe entry provides no guarantee of future safety. Atmospheric conditions inside a confined space can change rapidly and unpredictably. A tank that was safe yesterday may be oxygen-depleted today because of chemical reaction, biological decomposition, rusting of steel surfaces, or displacement by an inert gas. Every single entry must be preceded by fresh atmospheric testing. Complacency from previous safe entries is one of the leading human factors in confined-space fatalities.",
  },
  {
    question:
      "Can I rely on my sense of smell to detect dangerous gases in a confined space?",
    answer:
      "No. Many of the most dangerous confined-space gases are completely odourless and colourless — carbon monoxide (CO) being the most notable example. Hydrogen sulphide (H\u2082S) has a distinctive 'rotten eggs' smell at low concentrations, but at higher concentrations (above approximately 100 ppm) it paralyses the olfactory nerve, meaning you can no longer smell it precisely when it is most dangerous. At 1,000 ppm, a single breath of H\u2082S can cause immediate unconsciousness and death. The only reliable method of detection is a properly calibrated multi-gas detector.",
  },
  {
    question:
      "Why do so many rescuers die in confined-space incidents?",
    answer:
      "Rescuers die because they enter the same hazardous atmosphere that overcame the original casualty, typically without any respiratory protective equipment (RPE) or atmospheric monitoring. The natural human instinct to help a colleague in distress overrides rational risk assessment. The rescuer enters the space, inhales the same toxic or oxygen-depleted atmosphere, and is overcome within seconds. This triggers further rescue attempts, creating a cascade of casualties. HSE data shows approximately 60% of confined-space deaths are rescuers. This is why the Confined Spaces Regulations 1997 require that emergency rescue arrangements — including trained personnel and suitable equipment — must be in place BEFORE any entry.",
  },
  {
    question:
      "How quickly can the atmosphere inside a confined space change from safe to lethal?",
    answer:
      "The atmosphere can change from safe to lethal in seconds. A sudden release of gas from a connected pipe, the disturbance of sludge containing decomposing organic matter, or the activation of equipment that consumes oxygen can all cause near-instantaneous atmospheric change. Even slower processes — such as rusting of steel walls consuming oxygen, or biological decomposition generating methane and CO\u2082 — can cause dangerous changes over minutes to hours. This is why continuous atmospheric monitoring is essential during the entire duration of a confined-space entry, not just a single reading before entry.",
  },
];

/* ───────────────────────────────────────────────
   End-of-section quiz (8 questions)
   ─────────────────────────────────────────────── */
const quizQuestions = [
  {
    id: 1,
    question:
      "Approximately how many people die each year in the UK in confined-space incidents?",
    options: [
      "Around 5",
      "Around 15",
      "Around 50",
      "Around 100",
    ],
    correctAnswer: 1,
    explanation:
      "HSE statistics indicate that approximately 15 people die each year in the UK as a result of confined-space incidents. This may sound low, but it is disproportionately high given the relatively small number of confined-space entries that take place compared to other work activities. Crucially, around 60% of these fatalities are rescuers, not original entrants.",
  },
  {
    id: 2,
    question:
      "What is the normal oxygen concentration in the atmosphere?",
    options: ["18.5%", "19.5%", "20.9%", "23.5%"],
    correctAnswer: 2,
    explanation:
      "Normal atmospheric oxygen concentration is 20.9%. This is the baseline against which all confined-space oxygen readings are measured. The Confined Spaces Regulations and associated guidance use 19.5% as the lower action level — below this, entry without breathing apparatus is not permitted. Impairment begins at 19.5%, unconsciousness occurs below approximately 16%, and death below approximately 6%.",
  },
  {
    id: 3,
    question:
      "At what concentration can hydrogen sulphide (H\u2082S) cause death from a single breath?",
    options: [
      "10 ppm",
      "100 ppm",
      "500 ppm",
      "1,000 ppm",
    ],
    correctAnswer: 3,
    explanation:
      "Hydrogen sulphide at concentrations of approximately 1,000 ppm (0.1%) can cause immediate unconsciousness and death from a single breath. At lower concentrations (10-50 ppm) it causes eye and respiratory irritation. At around 100 ppm it paralyses the sense of smell, removing the 'rotten eggs' warning odour. At 500 ppm it causes rapid unconsciousness. At 1,000 ppm it is almost instantly fatal.",
  },
  {
    id: 4,
    question:
      "Which of the following gases is both odourless and colourless, making it impossible to detect without instruments?",
    options: [
      "Hydrogen sulphide (H\u2082S)",
      "Ammonia (NH\u2083)",
      "Carbon monoxide (CO)",
      "Chlorine (Cl\u2082)",
    ],
    correctAnswer: 2,
    explanation:
      "Carbon monoxide (CO) is completely odourless, colourless, and tasteless. It cannot be detected by human senses at any concentration. It binds to haemoglobin in the blood approximately 200 times more readily than oxygen, causing rapid oxygen starvation of tissues. Symptoms of CO poisoning (headache, dizziness, confusion) are easily mistaken for other conditions, and at high concentrations it causes unconsciousness and death without any warning.",
  },
  {
    id: 5,
    question:
      "Why are heavier-than-air gases particularly dangerous in confined spaces?",
    options: [
      "They rise to the top and displace breathable air",
      "They sink to the lowest point and pool, creating invisible layers of toxic or oxygen-depleted atmosphere at working level",
      "They are always flammable",
      "They cannot be detected by gas monitors",
    ],
    correctAnswer: 1,
    explanation:
      "Gases that are denser (heavier) than air — such as carbon dioxide, propane, butane, and some solvent vapours — sink to the lowest point in a space and pool there. This creates invisible layers of hazardous atmosphere at the bottom of pits, tanks, and chambers, exactly where workers are most likely to be. A gas monitor held at head height may show acceptable readings while a lethal concentration exists at knee or waist level. This is why multi-level atmospheric testing is essential.",
  },
  {
    id: 6,
    question:
      "What is the primary reason workers underestimate confined-space risks?",
    options: [
      "They have received too much training",
      "The hazards are often invisible — you cannot see, smell, or taste oxygen depletion or many toxic gases",
      "Confined spaces are always clearly labelled as dangerous",
      "Atmospheric conditions never change once tested",
    ],
    correctAnswer: 1,
    explanation:
      "The fundamental reason workers underestimate confined-space risk is that the hazards are invisible. Oxygen depletion has no colour, smell, or taste. Carbon monoxide is undetectable by human senses. Previous safe entries create a false sense of security. Time pressure and the 'it's only a quick look' mentality compound the problem. Unlike visible hazards (heights, moving machinery), atmospheric hazards give no visual warning until someone collapses.",
  },
  {
    id: 7,
    question:
      "Which of the following is a common fatal combination of atmospheric hazards in confined spaces?",
    options: [
      "High oxygen + low temperature",
      "Oxygen depletion combined with toxic gas accumulation",
      "High humidity + normal oxygen",
      "Low temperature + high visibility",
    ],
    correctAnswer: 1,
    explanation:
      "One of the most common and lethal combinations is oxygen depletion occurring simultaneously with toxic gas accumulation. For example, biological decomposition in a tank may consume oxygen (causing depletion) while simultaneously producing hydrogen sulphide and methane (toxic and flammable gases). The worker faces a dual hazard — reduced oxygen impairs their ability to respond, while toxic gas exposure accelerates incapacitation. This combination is frequently seen in sewers, tanks with organic residues, and agricultural storage.",
  },
  {
    id: 8,
    question:
      "What is the single most important rule for anyone approaching a confined-space incident?",
    options: [
      "Enter immediately to help the casualty",
      "Shout into the space to check if the person responds",
      "NEVER enter without atmospheric testing, training, and appropriate rescue equipment",
      "Ventilate the space by fanning air in with a piece of cardboard",
    ],
    correctAnswer: 2,
    explanation:
      "The single most important rule is: NEVER enter a confined space without atmospheric testing, proper training, and appropriate rescue equipment. The instinct to rush in and help is precisely what causes the cascade effect that kills rescuers. Raise the alarm, call the emergency services, and use pre-planned rescue procedures with trained personnel and breathing apparatus. Entering without these precautions will very likely result in additional casualties rather than a successful rescue.",
  },
];

/* ═══════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════ */
export default function ConfinedSpacesModule1Section3() {
  useSEO({
    title: "Why Confined Spaces Kill | Confined Spaces Module 1.3",
    description:
      "UK confined-space fatality statistics, the cascade rescue effect, atmospheric hazards including oxygen depletion and toxic gases, human factors, and the critical rule of never entering without testing.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky Header ─────────────────────── */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Page Title ──────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-400/20 border border-cyan-500/30 mb-4">
            <Skull className="h-7 w-7 text-cyan-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 mx-auto">
            <span className="text-cyan-400 text-xs font-semibold">
              MODULE 1 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Why Confined Spaces Kill
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            UK fatality statistics, the deadly cascade rescue effect, invisible
            atmospheric hazards, and the human factors that turn routine entries
            into multiple-fatality incidents
          </p>
        </header>

        {/* ── Quick Summary Boxes ─────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>~15 deaths/year</strong> in UK confined-space incidents
              </li>
              <li>
                <strong>60% are rescuers</strong> &mdash; not the original
                entrants
              </li>
              <li>
                <strong>Invisible hazards:</strong> O&#8322; depletion, CO,
                H&#8322;S &mdash; no warning
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400/90 text-base font-medium mb-2">
              The Golden Rule
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>NEVER</strong> enter without atmospheric testing
              </li>
              <li>
                <strong>NEVER</strong> attempt rescue without training &amp;
                equipment
              </li>
              <li>
                <strong>ALWAYS</strong> assume the atmosphere is hostile until
                proven safe
              </li>
            </ul>
          </div>
        </div>

        {/* ── Learning Outcomes ───────────────── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why the UK confined-space death toll is disproportionately high relative to the number of entries",
              "Describe the cascade rescue effect and why rescuers account for approximately 60% of fatalities",
              "State the oxygen concentration thresholds for impairment, unconsciousness, and death",
              "Identify the key toxic gases encountered in confined spaces and their lethal properties",
              "Explain why human senses cannot reliably detect confined-space atmospheric hazards",
              "List the human factors that cause workers to underestimate confined-space risk",
              "Describe common fatal atmospheric combinations and the speed at which conditions can change",
              "State the absolute rule: NEVER enter without testing, NEVER rescue without training and equipment",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ═════════════════════════════════════════
            SECTION 01 — The Statistics
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">01</span>
            The Statistics &mdash; A Disproportionate Death Toll
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every year in the United Kingdom, approximately <strong>15 people
                die</strong> as a direct result of confined-space incidents.
                Dozens more suffer serious injuries, many of which result in
                permanent disability. These numbers have remained stubbornly
                consistent over decades despite improvements in legislation,
                training, and equipment.
              </p>

              <p>
                To understand why this death toll matters, consider the context.
                The number of workers who actually enter confined spaces in any
                given year is a tiny fraction of the total UK workforce. Yet
                confined-space incidents consistently account for a
                disproportionately high number of workplace fatalities. A
                construction worker is statistically far more likely to die
                inside a confined space than from a fall, an electrical contact,
                or a vehicle strike on site &mdash; activities that, on the
                surface, feel far more dangerous.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    The Most Shocking Statistic
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Of those who die in confined-space incidents, approximately
                  <strong> 60% are rescuers</strong> &mdash; people who were
                  never in the confined space in the first place. They entered
                  to help a colleague in distress and were themselves overcome
                  by the same atmosphere. In many incidents, the original
                  entrant survived while the rescuer died. This single
                  statistic is the most powerful argument for why planned,
                  trained, and equipped rescue arrangements must be in place
                  <em> before</em> any confined-space entry begins.
                </p>
              </div>

              <p>
                The HSE has investigated hundreds of confined-space fatalities
                over the past three decades. The same causal factors appear
                again and again: no atmospheric testing, no safe system of
                work, no rescue plan, and the deadly cascade effect where
                multiple people enter after the first casualty. These are not
                freak accidents &mdash; they are predictable, preventable
                deaths caused by inadequate planning and human behaviour under
                pressure.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  UK Confined-Space Fatality Summary
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      stat: "~15 deaths per year",
                      detail:
                        "Consistently around 15 fatalities annually in UK confined-space incidents over recent decades",
                    },
                    {
                      stat: "60% are rescuers",
                      detail:
                        "The majority of those who die were not the original entrant — they entered to attempt an improvised rescue",
                    },
                    {
                      stat: "Multiple-fatality incidents",
                      detail:
                        "Many confined-space incidents kill two, three, or even four people in a single event due to the cascade effect",
                    },
                    {
                      stat: "Same causes repeated",
                      detail:
                        "HSE investigations consistently identify: no testing, no plan, no rescue arrangements, and the cascade effect",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-cyan-400 mb-1">
                        {item.stat}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════
            SECTION 02 — Rapid Onset of Unconsciousness
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">02</span>
            Rapid Onset of Unconsciousness &mdash; Why Speed Kills
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The defining characteristic of confined-space fatalities is
                <strong> speed</strong>. Unlike many other workplace hazards
                where there is time to recognise danger and react, atmospheric
                hazards in confined spaces can incapacitate and kill within
                seconds. There is often no warning, no gradual onset of
                symptoms, and no opportunity to self-rescue.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">
                  Key Definition &mdash; Rapid Onset
                </p>
                <p className="text-sm text-white">
                  <strong>Hydrogen sulphide (H&#8322;S)</strong> at
                  concentrations of approximately 1,000 ppm can cause immediate
                  unconsciousness and death from a <em>single breath</em>. The
                  victim inhales, the H&#8322;S paralyses the respiratory
                  centre in the brain, and they collapse. There is no time to
                  hold their breath, no time to shout for help, no time to turn
                  and exit. One breath. Unconscious. Dead within minutes if not
                  rescued.
                </p>
              </div>

              <p>
                <strong>Carbon monoxide (CO)</strong> is equally treacherous but
                works differently. CO is completely odourless, colourless, and
                tasteless. It binds to haemoglobin in the blood approximately
                200 times more readily than oxygen, forming carboxyhaemoglobin
                (COHb). As COHb levels rise, oxygen delivery to tissues
                decreases. Early symptoms &mdash; headache, dizziness, nausea
                &mdash; are easily mistaken for feeling unwell, tiredness, or
                even a hangover. By the time the victim realises something is
                seriously wrong, they may already be too confused and weak to
                escape. At high concentrations, CO causes unconsciousness
                within minutes and death within an hour.
              </p>

              <p>
                The insidious nature of these gases is compounded by the fact
                that <strong>human senses are entirely unreliable</strong> as
                detection methods. You cannot see oxygen depletion. You cannot
                smell carbon monoxide. Hydrogen sulphide has a distinctive
                &lsquo;rotten eggs&rsquo; smell at low concentrations, but at
                higher concentrations (above ~100 ppm) it paralyses the
                olfactory nerve &mdash; you stop smelling it precisely when it
                becomes most dangerous. The absence of an odour does not mean
                the absence of a hazard; it may mean the hazard is so severe
                that your body can no longer detect it.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Warning
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong>
                    The speed at which confined-space atmospheres incapacitate
                    means that self-rescue is frequently impossible.
                  </strong>{" "}
                  A worker who enters a space with a lethal atmosphere may
                  collapse before they have taken two steps. They cannot call
                  for help, cannot turn around, and cannot hold their breath
                  long enough to escape. This is why atmospheric testing before
                  entry is not a &lsquo;nice to have&rsquo; &mdash; it is the
                  single most critical control measure that prevents fatalities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ═════════════════════════════════════════
            SECTION 03 — Oxygen Displacement
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">03</span>
            Oxygen Displacement &mdash; The Silent Suffocation
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The atmosphere we breathe normally contains approximately{" "}
                <strong>20.9% oxygen</strong>. Our bodies are finely tuned to
                function at this level. Even a seemingly small reduction in
                oxygen concentration can have catastrophic effects on the human
                body &mdash; and in a confined space, oxygen can be displaced or
                consumed by a variety of mechanisms.
              </p>

              <p>
                Oxygen depletion is particularly dangerous because it is{" "}
                <strong>completely invisible and odourless</strong>. The air
                looks, smells, and feels exactly the same whether it contains
                20.9% or 10% oxygen. There is no visible haze, no unusual
                smell, no taste, and no sensation on the skin. The first
                indication that something is wrong may be impaired judgement
                and coordination &mdash; by which time the victim may already
                be unable to make rational decisions about escape.
              </p>

              {/* ── Oxygen Level Effects Diagram ──── */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 overflow-hidden">
                <p className="text-xs text-white/50 uppercase tracking-wider mb-4 text-center">
                  Oxygen Concentration &mdash; Effects on the Human Body
                </p>

                <div className="relative mx-auto max-w-2xl">
                  <div className="relative border-2 border-cyan-500/40 rounded-lg bg-gradient-to-b from-cyan-500/5 to-transparent">
                    {/* Normal */}
                    <div className="border-b border-dashed border-cyan-500/20 p-3 sm:p-4">
                      <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-3 items-center">
                        <div className="flex items-center justify-center">
                          <span className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-green-500/20 border border-green-500/40 text-sm font-bold text-green-400">
                            20.9%
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-green-400">
                            Normal Atmosphere
                          </p>
                          <p className="text-xs text-white/70">
                            Standard atmospheric oxygen. No adverse effects.
                            Full cognitive and physical function.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 19.5% */}
                    <div className="border-b border-dashed border-cyan-500/20 p-3 sm:p-4">
                      <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-3 items-center">
                        <div className="flex items-center justify-center">
                          <span className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-yellow-500/20 border border-yellow-500/40 text-sm font-bold text-yellow-400">
                            19.5%
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-yellow-400">
                            Minimum Safe Level
                          </p>
                          <p className="text-xs text-white/70">
                            Regulatory lower limit for safe entry. Subtle
                            impairment may begin. Do not enter below this level
                            without breathing apparatus (BA).
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 16% */}
                    <div className="border-b border-dashed border-cyan-500/20 p-3 sm:p-4">
                      <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-3 items-center">
                        <div className="flex items-center justify-center">
                          <span className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-orange-500/20 border border-orange-500/40 text-sm font-bold text-orange-400">
                            16%
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-orange-400">
                            Impaired Judgement &amp; Coordination
                          </p>
                          <p className="text-xs text-white/70">
                            Increased breathing rate, impaired attention,
                            reduced coordination. Judgement deteriorates &mdash;
                            victim may not recognise they are in danger. Loss
                            of consciousness can occur suddenly.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 12% */}
                    <div className="border-b border-dashed border-cyan-500/20 p-3 sm:p-4">
                      <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-3 items-center">
                        <div className="flex items-center justify-center">
                          <span className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-sm font-bold text-red-400">
                            12%
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-red-400">
                            Unconsciousness
                          </p>
                          <p className="text-xs text-white/70">
                            Rapid onset of unconsciousness. Nausea, vomiting,
                            inability to move or call for help. Self-rescue
                            extremely unlikely. Death will follow without
                            immediate assisted rescue and oxygen administration.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* <6% */}
                    <div className="p-3 sm:p-4">
                      <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-3 items-center">
                        <div className="flex items-center justify-center">
                          <span className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-red-600/30 border border-red-600/50 text-sm font-bold text-red-300">
                            &lt;6%
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-red-300">
                            Fatal Within Minutes
                          </p>
                          <p className="text-xs text-white/70">
                            Unconsciousness within seconds. Convulsions.
                            Cessation of breathing. Death within 6&ndash;8
                            minutes. Even with immediate rescue and
                            resuscitation, survival is unlikely at this level.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap items-center gap-4 mt-4 justify-center">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50" />
                      <span className="text-[10px] text-white/50">Safe</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/50" />
                      <span className="text-[10px] text-white/50">
                        Action level
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-orange-500/30 border border-orange-500/50" />
                      <span className="text-[10px] text-white/50">
                        Dangerous
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
                      <span className="text-[10px] text-white/50">
                        Life-threatening / fatal
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Oxygen can be displaced or consumed by many mechanisms inside a
                confined space. <strong>Rusting of steel surfaces</strong>{" "}
                (oxidation) consumes oxygen. <strong>Biological decomposition</strong>{" "}
                of organic matter &mdash; sludge, vegetation, food waste &mdash;
                consumes oxygen while producing carbon dioxide, methane, and
                hydrogen sulphide. <strong>Inerting processes</strong> using
                nitrogen or argon deliberately displace oxygen. Even{" "}
                <strong>the breathing of previous occupants</strong> in a
                poorly ventilated space can reduce oxygen levels over time.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-2">
                  The Deceptive Drop
                </p>
                <p className="text-sm text-white/80">
                  A reduction from 20.9% to 16% oxygen sounds small &mdash;
                  less than a 5 percentage point change. But this
                  &lsquo;small&rsquo; change represents a{" "}
                  <strong>24% reduction in the oxygen available to your
                  body</strong>. At 16%, you are functioning on three-quarters
                  of your normal oxygen supply. Your brain &mdash; which
                  consumes about 20% of all the oxygen you breathe &mdash; is
                  the first organ to be affected. Impaired judgement means you
                  may not even recognise you are in danger.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════
            SECTION 04 — Toxic Gas Accumulation
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">04</span>
            Toxic Gas Accumulation &mdash; Invisible Poisons
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Confined spaces can accumulate toxic gases from multiple
                sources: chemical reactions, biological decomposition,
                connected pipework, previous contents of tanks and vessels,
                welding and cutting operations, or the natural geology of the
                surrounding ground. Many of these gases are{" "}
                <strong>heavier than air</strong>, meaning they sink to the
                lowest point in the space and pool there &mdash; creating
                invisible pockets of lethal atmosphere at the very level where
                workers are most likely to be positioned.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Toxic Gases in Confined Spaces
                </p>
                <div className="space-y-3">
                  {[
                    {
                      gas: "Hydrogen sulphide (H\u2082S)",
                      properties: "Heavier than air. 'Rotten eggs' smell at low concentration; olfactory paralysis above ~100 ppm",
                      lethal: "1,000 ppm — death from single breath",
                      sources: "Decomposition of organic matter, sewage, oil refining, volcanic geology",
                    },
                    {
                      gas: "Carbon monoxide (CO)",
                      properties: "Slightly lighter than air. Completely odourless, colourless, tasteless",
                      lethal: "1,200+ ppm — unconsciousness within minutes, death within 1-3 hours at lower levels",
                      sources: "Incomplete combustion (engines, welding, fires), chemical reactions",
                    },
                    {
                      gas: "Carbon dioxide (CO\u2082)",
                      properties: "Heavier than air. Odourless at low concentration; slightly acidic taste at high levels",
                      lethal: "40,000 ppm (4%) — headache, dizziness; 100,000 ppm (10%) — unconsciousness and death",
                      sources: "Fermentation, decomposition, combustion, dry ice sublimation, respiration",
                    },
                    {
                      gas: "Methane (CH\u2084)",
                      properties: "Lighter than air. Odourless (domestic gas is artificially odorised). Explosive at 5-15%",
                      lethal: "Asphyxiant by displacement of oxygen; explosion risk at 5-15% in air",
                      sources: "Decomposition of organic matter, landfill, coal seams, sewage systems",
                    },
                    {
                      gas: "Nitrogen (N\u2082)",
                      properties: "Slightly lighter than air. Completely odourless, colourless, tasteless",
                      lethal: "Simple asphyxiant — displaces oxygen. Enriched N\u2082 atmospheres give no warning before unconsciousness",
                      sources: "Inerting / purging operations, leaks from N\u2082 cylinders or pipework",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-cyan-400 mb-1">
                        {item.gas}
                      </p>
                      <div className="space-y-1">
                        <p className="text-xs text-white/70">
                          <span className="text-white/50 font-medium">Properties:</span>{" "}
                          {item.properties}
                        </p>
                        <p className="text-xs text-white/70">
                          <span className="text-red-400/80 font-medium">Lethal:</span>{" "}
                          {item.lethal}
                        </p>
                        <p className="text-xs text-white/70">
                          <span className="text-white/50 font-medium">Sources:</span>{" "}
                          {item.sources}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Heavier-Than-Air Gas Pooling
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Gases that are denser than air &mdash; such as H&#8322;S,
                  CO&#8322;, propane, and many solvent vapours &mdash; sink to
                  the lowest point and <strong>pool</strong>. In a pit, tank,
                  or chamber, this creates an invisible layer of toxic
                  atmosphere at the bottom. A gas monitor held at head height
                  may read safe levels while a lethal concentration exists at
                  knee level. This is why{" "}
                  <strong>multi-level atmospheric testing</strong> is essential
                  &mdash; readings must be taken at top, middle, and bottom of
                  the space before and during entry.
                </p>
              </div>

              <p>
                The combination of multiple gases is often more dangerous than
                any single gas alone. A sewer, for example, may simultaneously
                contain elevated H&#8322;S, depleted oxygen, elevated methane,
                and elevated CO&#8322; &mdash; each contributing to the hazard.
                A worker entering this atmosphere faces toxic exposure, oxygen
                starvation, and potential explosion risk simultaneously. This is
                why a <strong>multi-gas detector</strong> that monitors
                oxygen, flammable gases, and at least two toxic gases (typically
                CO and H&#8322;S) is the minimum standard for confined-space
                atmospheric monitoring.
              </p>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════
            SECTION 05 — Case Studies (Anonymised)
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">05</span>
            Case Studies &mdash; Lessons from Real Incidents
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following case studies are based on real incidents
                investigated by the HSE. Names, locations, and identifying
                details have been changed or removed, but the circumstances
                and lessons are genuine. Each case illustrates one or more of
                the key factors that make confined spaces so deadly.
              </p>

              {/* Case Study 1 */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-red-500/20 border-b border-red-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-red-300">
                    Case Study A &mdash; Water Treatment Works
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-sm text-white/80">
                    A maintenance worker at a water treatment facility was
                    asked to check a valve inside a below-ground chamber. The
                    chamber had been entered many times before without
                    incident. No atmospheric testing was carried out. No
                    confined-space permit was issued. The worker descended
                    the ladder and collapsed at the bottom. A colleague
                    immediately climbed down after him and also collapsed.
                    A third worker entered and was himself overcome.
                  </p>
                  <p className="text-sm text-white/80">
                    Emergency services were called. Firefighters wearing
                    breathing apparatus recovered all three men. The first
                    entrant and the third &lsquo;rescuer&rsquo; died. The
                    second survived with permanent brain damage. The
                    atmosphere in the chamber was found to contain less than
                    4% oxygen &mdash; it had been displaced by nitrogen
                    leaking from a nearby line.
                  </p>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-red-400 mb-1">
                      Failures Identified
                    </p>
                    <ul className="text-xs text-white/70 space-y-1 list-disc list-inside">
                      <li>No atmospheric testing before entry</li>
                      <li>No confined-space permit to work</li>
                      <li>
                        Complacency &mdash; &lsquo;we&rsquo;ve always done
                        it this way&rsquo;
                      </li>
                      <li>Classic cascade rescue effect &mdash; two rescuers became casualties</li>
                      <li>No emergency rescue plan or equipment in place</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-red-500/20 border-b border-red-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-red-300">
                    Case Study B &mdash; Chemical Storage Tank
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-sm text-white/80">
                    Two workers were tasked with cleaning a storage tank at a
                    chemical processing facility. The tank had previously
                    contained organic solvents. It had been drained and the
                    manway opened for several hours for &lsquo;natural
                    ventilation&rsquo;. No atmospheric testing was performed.
                    No forced ventilation was provided. No breathing
                    apparatus was available.
                  </p>
                  <p className="text-sm text-white/80">
                    The first worker entered and began cleaning the tank
                    floor. Within minutes he became dizzy, confused, and
                    collapsed. The second worker, stationed at the manway as
                    a &lsquo;top man&rsquo;, shouted down and received no
                    response. He entered without any respiratory protection.
                    He was found unconscious beside his colleague. Both men
                    died from acute solvent vapour inhalation combined with
                    oxygen depletion. Residual solvent in the tank floor and
                    walls had been outgassing into the confined volume,
                    displacing oxygen and creating a toxic atmosphere that
                    natural ventilation alone was insufficient to control.
                  </p>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-red-400 mb-1">
                      Failures Identified
                    </p>
                    <ul className="text-xs text-white/70 space-y-1 list-disc list-inside">
                      <li>No atmospheric testing despite known chemical residues</li>
                      <li>
                        Natural ventilation assumed to be adequate &mdash;
                        it was not
                      </li>
                      <li>No forced mechanical ventilation provided</li>
                      <li>No breathing apparatus available on site</li>
                      <li>
                        &lsquo;Top man&rsquo; entered without RPE &mdash;
                        cascade effect
                      </li>
                      <li>No rescue plan or retrieval equipment</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Case Study 3 */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-amber-300">
                    Case Study C &mdash; Farm Slurry Pit
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-sm text-white/80">
                    A farmer was agitating a slurry pit beneath a cattle
                    shed when a pump became blocked. He descended into the
                    pit to clear the blockage. The agitation of slurry
                    releases large volumes of hydrogen sulphide &mdash; a
                    fact well documented in agricultural safety guidance but
                    not known by this particular farmer. He was overcome
                    within seconds by H&#8322;S at concentrations later
                    estimated at over 500 ppm.
                  </p>
                  <p className="text-sm text-white/80">
                    His son, seeing his father collapse, entered the pit.
                    He too was overcome. A neighbouring farmer, alerted by
                    the sound of distressed cattle, arrived and found both
                    men unconscious. He called 999 but then attempted to
                    reach them. He lost consciousness on the ladder.
                    Emergency services recovered all three. The farmer and
                    his son died. The neighbour survived after prolonged
                    hospital treatment.
                  </p>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-amber-400 mb-1">
                      Failures Identified
                    </p>
                    <ul className="text-xs text-white/70 space-y-1 list-disc list-inside">
                      <li>
                        No knowledge of H&#8322;S risk from slurry agitation
                      </li>
                      <li>No atmospheric monitoring</li>
                      <li>No confined-space risk assessment</li>
                      <li>
                        Triple cascade &mdash; three casualties from a
                        single incident
                      </li>
                      <li>
                        Heroic instinct overrode rational risk assessment
                        in both the son and neighbour
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-2">
                  Common Thread
                </p>
                <p className="text-sm text-white/80">
                  Every case above shares the same root causes: no atmospheric
                  testing, no rescue plan, and the cascade effect. Every death
                  was preventable. The victims were not reckless people &mdash;
                  they were workers and family members doing what seemed like
                  routine tasks, unaware of the invisible hazard that would kill
                  them in seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ═════════════════════════════════════════
            SECTION 06 — Human Factors
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">06</span>
            Human Factors &mdash; Why Workers Underestimate the Risk
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The technical hazards of confined spaces &mdash; oxygen
                depletion, toxic gases, explosive atmospheres &mdash; are
                well understood. The legislation is clear. Gas detectors are
                readily available. So why do people keep dying? The answer
                lies in <strong>human behaviour</strong>. Time after time,
                HSE investigations reveal the same psychological and
                organisational factors that lead competent people to make
                fatal decisions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Human Factors in Confined-Space Fatalities
                </p>
                <div className="space-y-3">
                  {[
                    {
                      factor: "\"It's only a quick look\"",
                      detail:
                        "The belief that a brief, informal entry does not require the full permit-to-work process. Workers reason that they will only be in the space for a few seconds, so the risk is negligible. But atmospheric hazards do not care about your schedule — H\u2082S at 1,000 ppm kills in one breath regardless of whether you planned to be there for five seconds or five hours.",
                    },
                    {
                      factor: "Complacency from previous safe entries",
                      detail:
                        "The most dangerous precedent is a safe one. If a worker has entered a space ten times without incident, they unconsciously lower their risk perception. They begin to believe the space is inherently safe rather than recognising that each previous entry was safe only because conditions happened to be acceptable at that moment. Atmospheric conditions can change between entries.",
                    },
                    {
                      factor: "Invisible hazards",
                      detail:
                        "Humans are hardwired to respond to visible threats — heights, fire, moving machinery, deep water. Atmospheric hazards are invisible, odourless, and give no visual cue of danger. A pit that looks, smells, and feels perfectly safe may contain a lethal atmosphere. Our evolved threat-detection system simply does not register the risk.",
                    },
                    {
                      factor: "Time pressure and production demands",
                      detail:
                        "Workers under time pressure cut corners. The full confined-space entry procedure — risk assessment, permit, atmospheric testing, rescue arrangements, standby person — takes time to set up. When a supervisor says 'just nip down and check that valve', the temptation to skip the process and 'get on with the job' is powerful, especially on sites where safety culture is weak.",
                    },
                    {
                      factor: "Lack of training",
                      detail:
                        "Many workers who enter confined spaces have received no confined-space training. They do not know what a confined space is, cannot identify the hazards, do not understand atmospheric monitoring, and have no concept of safe systems of work. Some employers fail to recognise that their workers even encounter confined spaces.",
                    },
                    {
                      factor: "No atmospheric testing equipment",
                      detail:
                        "Even workers who understand the risk may not have access to a calibrated multi-gas detector. Without testing equipment, they cannot confirm the atmosphere is safe — but they enter anyway, relying on their senses (which, as we have established, are entirely unreliable for atmospheric detection).",
                    },
                    {
                      factor: "Inadequate rescue planning",
                      detail:
                        "Many workplaces have no confined-space rescue plan. When an incident occurs, untrained colleagues rush in to help — the cascade effect. Proper rescue planning requires trained rescue personnel, breathing apparatus, retrieval equipment (harnesses, winches, tripods), and practised procedures. This is not optional under the Confined Spaces Regulations 1997.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-cyan-400 mb-1">
                        {item.factor}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    The Normalisation of Deviance
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Sociologist Diane Vaughan coined the term
                  &lsquo;normalisation of deviance&rsquo; to describe how
                  people and organisations gradually come to accept
                  increasingly risky behaviour as normal when nothing bad
                  happens. In confined-space work, this manifests as: first
                  time, full procedure; second time, skip the rescue plan;
                  third time, skip the gas test; tenth time, just climb in
                  and do it. Each deviation from the safe system of work
                  appears to be validated by the absence of an incident.
                  Until the day the atmosphere is not safe. And then people
                  die.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════
            SECTION 07 — The Cascade Effect
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">07</span>
            The Cascade Effect &mdash; How One Death Becomes Three
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The cascade effect is the single most important concept in
                understanding why confined-space incidents produce
                disproportionately high body counts. It explains why a single
                person being overcome by an atmosphere routinely results in
                two, three, or even four fatalities. It is the reason that 60%
                of confined-space deaths are rescuers.
              </p>

              <p>
                The pattern is devastatingly simple and tragically predictable:
              </p>

              {/* ── Cascade Rescue Failure Diagram ── */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 overflow-hidden">
                <p className="text-xs text-white/50 uppercase tracking-wider mb-4 text-center">
                  The Cascade Rescue Failure &mdash; Anatomy of a
                  Multiple-Fatality Incident
                </p>

                <div className="relative mx-auto max-w-2xl">
                  <div className="relative border-2 border-cyan-500/40 rounded-lg bg-gradient-to-b from-cyan-500/5 to-transparent">
                    {/* Step 1 */}
                    <div className="border-b border-dashed border-cyan-500/20 p-3 sm:p-4">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-sm font-bold text-cyan-400">
                          1
                        </span>
                        <div>
                          <p className="text-sm font-medium text-cyan-400">
                            Worker A enters the confined space
                          </p>
                          <p className="text-xs text-white/70">
                            No atmospheric testing has been carried out. The
                            atmosphere appears normal &mdash; no visible haze,
                            no obvious smell. Worker A descends the ladder or
                            steps through the manway.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="border-b border-dashed border-cyan-500/20 p-3 sm:p-4">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-sm font-bold text-orange-400">
                          2
                        </span>
                        <div>
                          <p className="text-sm font-medium text-orange-400">
                            Worker A collapses
                          </p>
                          <p className="text-xs text-white/70">
                            Within seconds of entering the hazardous
                            atmosphere, Worker A loses consciousness. They
                            fall to the floor of the space. They may or may
                            not have been able to shout. Collapse is sudden
                            and complete.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="border-b border-dashed border-cyan-500/20 p-3 sm:p-4">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-sm font-bold text-red-400">
                          3
                        </span>
                        <div>
                          <p className="text-sm font-medium text-red-400">
                            Worker B enters to rescue Worker A
                          </p>
                          <p className="text-xs text-white/70">
                            A colleague sees Worker A collapse or hears no
                            response. Natural instinct takes over. Worker B
                            rushes in to help &mdash; no breathing apparatus,
                            no atmospheric testing, no rescue equipment. They
                            enter the same lethal atmosphere and collapse
                            within seconds.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="border-b border-dashed border-cyan-500/20 p-3 sm:p-4">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600/30 border border-red-600/50 flex items-center justify-center text-sm font-bold text-red-300">
                          4
                        </span>
                        <div>
                          <p className="text-sm font-medium text-red-300">
                            Worker C enters to rescue Workers A and B
                          </p>
                          <p className="text-xs text-white/70">
                            Now there are two unconscious people visible in
                            the space. The urgency is overwhelming. Worker C
                            enters. The outcome is identical. Three
                            casualties. One incident. One hazardous
                            atmosphere. The same pattern has produced four
                            and even five casualties in documented UK
                            incidents.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Outcome */}
                    <div className="p-3 sm:p-4 bg-red-500/5">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600/40 border border-red-600/60 flex items-center justify-center">
                          <Skull className="w-4 h-4 text-red-300" />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-red-300">
                            Result: Multiple fatalities from a single
                            incident
                          </p>
                          <p className="text-xs text-white/70">
                            Emergency services arrive. Firefighters in
                            breathing apparatus recover the casualties. One,
                            two, or all three are dead. The atmosphere is
                            tested and found to be immediately dangerous to
                            life. Every death after the first was entirely
                            preventable if a rescue plan had been in place.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Diagram annotation */}
                  <div className="mt-4 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-4 w-4 text-cyan-400" />
                      <p className="text-xs font-medium text-cyan-400">
                        Breaking the Cascade
                      </p>
                    </div>
                    <p className="text-xs text-white/70">
                      The cascade is broken by one thing:{" "}
                      <strong>
                        a pre-planned rescue procedure with trained
                        personnel and breathing apparatus
                      </strong>
                      . When the standby person sees Worker A collapse, they
                      do NOT enter. They raise the alarm, initiate the
                      emergency rescue plan, and the trained rescue team
                      enters with BA and retrieval equipment. Worker A may
                      or may not survive &mdash; but Workers B and C are
                      alive because they did not become casualties
                      themselves.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The psychological mechanism behind the cascade is powerful
                and deeply human. Seeing a colleague in distress triggers a
                fight-or-flight response heavily biased towards action. The
                instinct to help is overwhelming &mdash; it overrides
                training, overrides knowledge, and overrides rational risk
                assessment. Workers who know the rules, who have been
                trained, who understand the hazards, still enter because in
                that moment of crisis, emotion defeats logic. This is
                precisely why rescue arrangements must be{" "}
                <strong>pre-planned and practised</strong> &mdash; because in
                the moment of crisis, only ingrained procedures and
                immediately available equipment can compete with the
                instinct to rush in.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Absolute Rule
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong>
                    NEVER attempt a confined-space rescue without breathing
                    apparatus, a rescue plan, and trained personnel.
                  </strong>{" "}
                  If you do not have these three things, do NOT enter the
                  space. Call 999. Shout to the casualty. Ventilate from
                  outside if possible. But do NOT go in. You will almost
                  certainly become the next casualty. The hardest thing in
                  the world is to stand at the edge and not enter &mdash;
                  but it may be the decision that saves your life.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ═════════════════════════════════════════
            SECTION 08 — Key Lesson & Fatal Combinations
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-400/80 text-sm font-normal">08</span>
            Fatal Combinations &amp; the Speed of Change
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Confined-space fatalities rarely involve a single hazard in
                isolation. In practice, the most dangerous situations involve{" "}
                <strong>combinations of atmospheric hazards</strong>{" "}
                occurring simultaneously, each compounding the effect of the
                others. Understanding these combinations is essential because
                they explain why incidents escalate so rapidly and why
                monitoring for a single parameter alone is never sufficient.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Fatal Atmospheric Combinations
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      combo: "Oxygen depletion + H\u2082S",
                      detail:
                        "Biological decomposition consumes O\u2082 while producing H\u2082S. The worker is simultaneously oxygen-starved and being poisoned. Commonly encountered in sewers, slurry pits, and tanks with organic residues.",
                    },
                    {
                      combo: "Oxygen depletion + CO\u2082",
                      detail:
                        "Fermentation and decomposition consume O\u2082 and produce CO\u2082. Wine vats, brewery tanks, grain silos, and water treatment chambers are classic locations. CO\u2082 at high levels also acts as a direct toxic agent.",
                    },
                    {
                      combo: "Flammable gas + toxic gas",
                      detail:
                        "Methane (flammable) and H\u2082S (toxic) are frequently found together in sewage systems and landfill sites. Workers face both explosion risk and toxic exposure simultaneously.",
                    },
                    {
                      combo: "O\u2082 enrichment + flammable materials",
                      detail:
                        "Oxygen-enriched atmospheres (above 23.5%) dramatically increase the intensity and speed of combustion. Clothing, grease, and oils that would not normally ignite can burn violently. Found near welding operations and O\u2082 cylinder leaks.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-cyan-400 mb-1">
                        {item.combo}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                The speed at which atmospheric conditions can change inside a
                confined space is often dramatically underestimated. A space
                that was tested and found safe an hour ago may now contain a
                lethal atmosphere. The causes of rapid atmospheric change
                include:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Causes of Rapid Atmospheric Change
                </p>
                <div className="space-y-3">
                  {[
                    {
                      cause: "Disturbance of sediment or sludge",
                      detail:
                        "Walking on or agitating sludge at the bottom of a tank, sewer, or chamber can release large volumes of trapped H\u2082S and methane almost instantaneously. A space with acceptable readings at entry can become lethal within seconds of the sludge being disturbed.",
                    },
                    {
                      cause: "Connected pipework or valves",
                      detail:
                        "A valve that is inadvertently opened, a connected pipe carrying gas or chemicals, or a cross-contamination from an adjacent system can flood a confined space with toxic or asphyxiant gas in seconds. Isolation is essential but failures occur.",
                    },
                    {
                      cause: "Chemical reactions",
                      detail:
                        "Mixing of chemicals — even residual chemicals on surfaces — can generate toxic gases. Acid meeting metal produces hydrogen. Bleach meeting acid produces chlorine. These reactions can begin suddenly when surfaces are washed or disturbed.",
                    },
                    {
                      cause: "Temperature changes",
                      detail:
                        "Rising temperatures accelerate evaporation of volatile substances and speed biological decomposition. A tank that was safe in the cool of the morning may become hazardous as temperatures rise during the day.",
                    },
                    {
                      cause: "Loss of ventilation",
                      detail:
                        "If forced ventilation fails — power cut, fan malfunction, duct disconnection — the atmosphere can deteriorate rapidly, especially in spaces with ongoing gas production or where workers' breathing is consuming oxygen faster than natural ventilation replaces it.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-cyan-400 mb-1">
                        {item.cause}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-2">
                  Why Continuous Monitoring Matters
                </p>
                <p className="text-sm text-white/80">
                  A single atmospheric reading taken before entry provides a
                  snapshot of conditions at one moment in time. It does not
                  guarantee that conditions will remain the same during the
                  work. This is why{" "}
                  <strong>continuous atmospheric monitoring</strong> &mdash;
                  using a personal gas detector worn by the entrant or a
                  fixed monitor within the space &mdash; is essential for the
                  entire duration of the entry. The detector must alarm if
                  conditions deteriorate, giving the entrant time to evacuate
                  before incapacitation occurs.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    The Key Lesson of This Section
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Every point covered in this section leads to the same two
                  absolute rules. They are non-negotiable. They apply to
                  every confined-space entry, every time, without exception:
                </p>
                <ol className="text-sm text-white/80 mt-2 space-y-2 list-decimal list-inside">
                  <li>
                    <strong>
                      NEVER enter a confined space without atmospheric
                      testing.
                    </strong>{" "}
                    Test before entry. Test at multiple levels. Monitor
                    continuously during entry. No test, no entry.
                  </li>
                  <li>
                    <strong>
                      NEVER attempt rescue without training, breathing
                      apparatus, and a rescue plan.
                    </strong>{" "}
                    The cascade effect kills more people than the original
                    hazard. Improvised rescue is not rescue &mdash; it is
                    additional casualties. Rescue arrangements must be in
                    place before entry begins.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════
            FAQ Section
            ═════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════
            Quiz
            ═════════════════════════════════════════ */}
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* ═════════════════════════════════════════
            Bottom Navigation
            ═════════════════════════════════════════ */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Common Examples
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-1-section-4">
              Next: Confined Spaces in Electrical Work
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
