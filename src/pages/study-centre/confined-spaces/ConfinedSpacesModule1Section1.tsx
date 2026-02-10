import { ArrowLeft, ShieldAlert, CheckCircle, AlertTriangle, ShieldCheck, Scale, BookOpen, Users } from "lucide-react";
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
    id: "confined-space-definition",
    question: "Which TWO conditions must BOTH be present for a place to be classified as a confined space under the Confined Spaces Regulations 1997?",
    options: [
      "It must be underground and have restricted access",
      "It must be substantially enclosed AND have a reasonably foreseeable risk of serious injury from specified hazards",
      "It must be too small for a person to stand upright and poorly ventilated",
      "It must be enclosed on all sides and contain hazardous substances"
    ],
    correctIndex: 1,
    explanation:
      "Under the Confined Spaces Regulations 1997, a confined space is defined as any place that is substantially (though not always entirely) enclosed AND where there is a reasonably foreseeable risk of serious injury from hazardous substances or conditions within the space. Both conditions must be met \u2014 enclosure alone is not enough."
  },
  {
    id: "confined-space-rescuer-deaths",
    question: "According to HSE data, approximately what percentage of deaths in confined space incidents are would-be rescuers?",
    options: [
      "Around 20%",
      "Around 40%",
      "Around 60%",
      "Around 80%"
    ],
    correctIndex: 2,
    explanation:
      "HSE data consistently shows that around 60% of deaths in confined space incidents are would-be rescuers who entered without adequate precautions. This is why emergency arrangements (the third tier of the hierarchy) are so critical \u2014 untrained, unplanned rescue attempts frequently result in multiple fatalities from a single incident."
  },
  {
    id: "confined-space-hierarchy",
    question: "What is the FIRST priority in the confined spaces hierarchy of control under the Regulations?",
    options: [
      "Have emergency rescue arrangements in place before entry",
      "Follow a safe system of work when entering",
      "Avoid entry into the confined space altogether",
      "Ensure continuous atmospheric monitoring during entry"
    ],
    correctIndex: 2,
    explanation:
      "The Confined Spaces Regulations 1997 establish a clear hierarchy: (1) avoid entry if reasonably practicable, (2) if entry is unavoidable, follow a safe system of work, and (3) have emergency arrangements in place before entry. Avoidance is always the first and preferred option."
  }
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Does a confined space have to be underground?",
    answer:
      "No. This is one of the most common misconceptions. A confined space can be at any level \u2014 above ground, at ground level, or below ground. Roof-level tanks, ceiling voids, ductwork, silos, enclosed rooms at height, and even open-topped vessels can all be confined spaces if they meet the two-part legal definition: substantially enclosed AND a reasonably foreseeable risk of serious injury from specified hazards. The Regulations are concerned with the characteristics of the space and the risks present, not its location relative to ground level."
  },
  {
    question: "Can a large room be a confined space?",
    answer:
      "Yes. Confined spaces are NOT defined by size. A large plant room, warehouse, or industrial chamber can be a confined space if it is substantially enclosed and there is a reasonably foreseeable risk of serious injury from specified hazards such as toxic gas accumulation, oxygen depletion, or fire/explosion risk. Conversely, a small cupboard is not a confined space if there is no foreseeable risk of serious injury from specified hazards. Always assess the characteristics and risks, not the physical dimensions."
  },
  {
    question: "Who needs confined space awareness training?",
    answer:
      "Anyone who may need to enter a confined space, work near a confined space, supervise work in or around confined spaces, or be involved in emergency rescue from confined spaces needs appropriate training. Under Regulation 4 of the Confined Spaces Regulations 1997 and the associated Approved Code of Practice L101, employers must ensure that persons entering confined spaces are trained and competent. The level of training varies \u2014 a general awareness course is the minimum for anyone who may encounter confined spaces, while those who actually enter confined spaces or act as rescuers need more detailed, practical training."
  },
  {
    question: "What is ACoP L101 and does it have legal force?",
    answer:
      "ACoP L101, 'Safe Work in Confined Spaces', is the Approved Code of Practice published by the HSE that accompanies the Confined Spaces Regulations 1997. An ACoP has a special legal status: while it is not law itself, if you are prosecuted for a breach of the Regulations and it is proved that you did not follow the relevant provisions of the ACoP, a court will find you at fault unless you can demonstrate that you complied with the Regulations in some other equally effective way. In practice, following ACoP L101 is the standard means of demonstrating compliance with the Confined Spaces Regulations."
  }
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "What is the statutory reference for the Confined Spaces Regulations?",
    options: [
      "SI 1997/1713",
      "SI 2002/2677",
      "SI 1999/3242",
      "SI 1998/2306"
    ],
    correctAnswer: 0,
    explanation:
      "The Confined Spaces Regulations 1997 have the statutory instrument reference SI 1997/1713. They were made under the Health and Safety at Work etc. Act 1974 and came into force on 28 January 1998."
  },
  {
    id: 2,
    question:
      "Which of the following is NOT one of the 'specified risks' that can make a space a confined space under the Regulations?",
    options: [
      "Loss of consciousness from raised body temperature",
      "Drowning from rising liquid levels",
      "Noise levels exceeding the upper exposure action value",
      "Asphyxiation from lack of oxygen"
    ],
    correctAnswer: 2,
    explanation:
      "Noise is not one of the specified risks under the Confined Spaces Regulations 1997. The specified risks are: fire or explosion, loss of consciousness from raised body temperature, loss of consciousness or asphyxiation from gas, fume, vapour, or lack of oxygen, drowning from rising liquid levels, and engulfment or suffocation by a free-flowing solid. Noise is addressed by the Control of Noise at Work Regulations 2005."
  },
  {
    id: 3,
    question:
      "Under the Confined Spaces Regulations hierarchy, what must you do FIRST?",
    options: [
      "Prepare emergency rescue arrangements",
      "Carry out atmospheric monitoring",
      "Avoid entry into the confined space if reasonably practicable",
      "Develop a safe system of work for entry"
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 4(1) of the Confined Spaces Regulations 1997 establishes that no person shall enter a confined space to carry out work unless it is not reasonably practicable to achieve the purpose without entry. Avoidance is always the first priority. Only if entry is unavoidable should a safe system of work and emergency arrangements be implemented."
  },
  {
    id: 4,
    question:
      "Approximately how many people are killed in confined space incidents in the UK each year?",
    options: [
      "Around 5",
      "Around 15",
      "Around 50",
      "Around 100"
    ],
    correctAnswer: 1,
    explanation:
      "HSE data shows that approximately 15 people die each year in the UK from confined space incidents. Critically, around 60% of these deaths are would-be rescuers who entered without adequate precautions, making unplanned rescue attempts one of the most dangerous aspects of confined space incidents."
  },
  {
    id: 5,
    question:
      "Which of the following correctly describes a 'confined space' under the Regulations?",
    options: [
      "Any space that is too small for a person to work comfortably in",
      "Any enclosed space below ground level",
      "Any place that is substantially enclosed where there is a reasonably foreseeable risk of serious injury from specified hazards",
      "Any space that requires a permit to enter"
    ],
    correctAnswer: 2,
    explanation:
      "The legal definition requires two conditions: the space must be substantially (though not always entirely) enclosed AND there must be a reasonably foreseeable risk of serious injury from hazardous substances or conditions. Size, depth, and permit requirements are not part of the legal definition."
  },
  {
    id: 6,
    question:
      "Which piece of legislation is the 'parent Act' under which the Confined Spaces Regulations 1997 were made?",
    options: [
      "Management of Health and Safety at Work Regulations 1999",
      "The Factories Act 1961",
      "Health and Safety at Work etc. Act 1974",
      "Construction (Design and Management) Regulations 2015"
    ],
    correctAnswer: 2,
    explanation:
      "The Confined Spaces Regulations 1997 are secondary legislation made under the enabling powers of the Health and Safety at Work etc. Act 1974 (HASAWA). HASAWA is the primary enabling Act that gives the Secretary of State powers to make health and safety regulations, including those covering confined spaces."
  },
  {
    id: 7,
    question:
      "A large above-ground storage tank has been drained but may still contain flammable vapours. Is this a confined space?",
    options: [
      "No \u2014 it is above ground so it cannot be a confined space",
      "No \u2014 it has been drained so there is no risk",
      "Yes \u2014 it is substantially enclosed and there is a foreseeable risk of fire/explosion from flammable vapours",
      "Only if the tank is sealed with no ventilation openings"
    ],
    correctAnswer: 2,
    explanation:
      "The tank meets both criteria of the legal definition: it is substantially enclosed, and there is a reasonably foreseeable risk of serious injury from fire or explosion due to the flammable vapours that may remain. The fact that it is above ground and has been drained does not remove the confined space classification. Residual vapours in empty or drained tanks are a common cause of fatal confined space incidents."
  },
  {
    id: 8,
    question:
      "Which of the following pieces of legislation does NOT directly relate to confined space work?",
    options: [
      "PUWER 1998 (Provision and Use of Work Equipment)",
      "LOLER 1998 (Lifting Operations and Lifting Equipment)",
      "The Consumer Rights Act 2015",
      "COSHH 2002 (Control of Substances Hazardous to Health)"
    ],
    correctAnswer: 2,
    explanation:
      "The Consumer Rights Act 2015 is consumer protection legislation and has no direct relevance to confined space work. PUWER 1998 applies to equipment used in confined spaces, LOLER 1998 applies to lifting equipment used for rescue, and COSHH 2002 applies to hazardous substances that may be present within confined spaces. All three are directly relevant."
  }
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function ConfinedSpacesModule1Section1() {
  useSEO({
    title: "What Is a Confined Space? | Confined Spaces Module 1.1",
    description:
      "Understand the legal definition of a confined space under the Confined Spaces Regulations 1997, the specified risks, common misconceptions, incident statistics, and the avoid-entry hierarchy.",
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
            <Link to="../confined-spaces-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">

        {/* ============================================================ */}
        {/*  PAGE TITLE                                                   */}
        {/* ============================================================ */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-400/20 border border-cyan-500/30 mb-4">
            <ShieldAlert className="h-7 w-7 text-cyan-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3 mx-auto">
            <span className="text-cyan-400 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Is a Confined Space?
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the legal definition under the Confined Spaces Regulations 1997 &mdash; what makes a space &ldquo;confined&rdquo;, the specified risks, common misconceptions, and the hierarchy of control
          </p>
        </header>

        {/* ============================================================ */}
        {/*  QUICK SUMMARY BOXES                                          */}
        {/* ============================================================ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Law:</strong> Confined Spaces Regulations 1997 (SI 1997/1713)</li>
              <li><strong>Definition:</strong> Substantially enclosed + foreseeable risk of serious injury</li>
              <li><strong>Not about size:</strong> A large room can qualify; a small cupboard may not</li>
              <li><strong>Deaths:</strong> ~15/year in the UK, ~60% are would-be rescuers</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-cyan-500/5 border-l-2 border-cyan-500/50">
            <p className="text-cyan-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Priority 1:</strong> Can you avoid entry altogether?</li>
              <li><strong>Priority 2:</strong> If not, follow a safe system of work</li>
              <li><strong>Priority 3:</strong> Emergency arrangements MUST be in place before entry</li>
              <li><strong>Never:</strong> Attempt an unplanned rescue &mdash; you may become the next casualty</li>
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
              "State the legal definition of a confined space under the Confined Spaces Regulations 1997",
              "Identify the three key characteristics that define a confined space",
              "List the specified risks that make a substantially enclosed space a confined space",
              "Recognise and correct common misconceptions about confined spaces",
              "Explain the three-tier hierarchy: avoid entry, safe system of work, emergency arrangements",
              "Describe the role of ACoP L101 and related legislation in confined space safety"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-cyan-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01: Introduction                                     */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">01</span>
            Introduction to Confined Spaces
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Confined spaces are among the most hazardous environments found in any workplace.
                Every year in the United Kingdom, people are killed or seriously injured in confined
                space incidents &mdash; and the pattern of these incidents has remained tragically
                consistent over decades. Workers enter spaces they do not recognise as confined,
                encounter hazards they did not anticipate, and are overcome within seconds. Worse
                still, colleagues who rush in to help without proper equipment or training become
                casualties themselves.
              </p>

              <p>
                The <strong>Confined Spaces Regulations 1997</strong> (statutory instrument reference
                <strong> SI 1997/1713</strong>) were introduced to address exactly this pattern.
                Made under the enabling powers of the <strong>Health and Safety at Work etc. Act
                1974 (HASAWA)</strong>, these Regulations came into force on 28 January 1998 and
                apply to all work activities in Great Britain. They replaced earlier, sector-specific
                provisions and created a single, comprehensive legal framework for managing the
                risks of confined space work across all industries.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Key Principle:</strong> The Confined Spaces
                  Regulations 1997 are built on one overriding principle: <strong>if you can do the
                  work without entering the confined space, you must not enter it</strong>. Entry is
                  the last resort, not the default. This principle runs through every requirement in
                  the Regulations and the accompanying Approved Code of Practice.
                </p>
              </div>

              <p>
                For electricians, confined space awareness is not an abstract topic. Electrical work
                regularly takes place in environments that may be or become confined spaces &mdash;
                plant rooms, ceiling voids, cable tunnels, service ducts, tank compartments,
                switchgear rooms with limited ventilation, and trenches. Understanding what makes
                a space &ldquo;confined&rdquo; in the legal sense, and what that means for how you
                work, is essential knowledge for every electrical worker, whether you are an
                apprentice or a seasoned contractor.
              </p>

              <p>
                This section provides the foundation for the entire course. We begin with the legal
                definition, examine the specified risks, address the most common misconceptions,
                review the statistics, and set out the hierarchy of control that underpins the
                Regulations. Every subsequent module builds on these fundamentals.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Why &ldquo;Awareness&rdquo; Training Matters</p>
                <p className="text-sm text-white/80">
                  You do not need to be a confined space &ldquo;entrant&rdquo; to need this
                  knowledge. HSE investigations repeatedly find that incidents occur because people
                  in the wider workforce &mdash; supervisors, nearby workers, those who plan or
                  specify work &mdash; did not recognise a space as confined, did not understand
                  the risks, or did not know what to do in an emergency. Awareness training is
                  the first line of defence against these failures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: The Legal Definition                             */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">02</span>
            The Legal Definition
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regulation 1(2) of the Confined Spaces Regulations 1997 provides the legal
                definition that underpins the entire regulatory framework. Understanding this
                definition precisely is critical, because it determines whether a space is a
                &ldquo;confined space&rdquo; within the meaning of the law &mdash; and therefore
                whether the full requirements of the Regulations apply to it.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Scale className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Legal Definition</p>
                </div>
                <p className="text-sm text-white leading-relaxed">
                  A <strong>&ldquo;confined space&rdquo;</strong> means any place which is
                  <strong> substantially (though not always entirely) enclosed</strong>, and where
                  there is a <strong>reasonably foreseeable risk of serious injury</strong> from
                  hazardous substances or conditions within the space or nearby.
                </p>
              </div>

              <p>
                This definition has <strong>two essential limbs</strong>, and <strong>both</strong> must
                be satisfied for a space to be classified as a confined space:
              </p>

              {/* Confined Space Definition Criteria Diagram */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-4 text-center">Confined Space Definition Criteria</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold flex-shrink-0">1</span>
                      <p className="text-sm font-semibold text-white">Substantially Enclosed</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The space must be substantially enclosed &mdash; though not necessarily
                      entirely enclosed. A space with a single opening, a space with removable
                      covers, or even an open-topped vessel can be substantially enclosed. The
                      key is that the enclosure is sufficient to give rise to the specified risks
                      (e.g., preventing natural ventilation, allowing gas to accumulate, or
                      trapping heat).
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold flex-shrink-0">2</span>
                      <p className="text-sm font-semibold text-white">Foreseeable Risk of Serious Injury</p>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">
                      There must be a reasonably foreseeable risk of serious injury from hazardous
                      substances or conditions within the space. &ldquo;Reasonably foreseeable&rdquo;
                      means a risk that a competent person, applying their knowledge and experience,
                      would anticipate. It does not need to be probable &mdash; just foreseeable.
                      The injury must be &ldquo;serious&rdquo;, meaning potentially fatal or causing
                      major harm.
                    </p>
                  </div>
                </div>
                <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold flex-shrink-0">3</span>
                    <p className="text-sm font-semibold text-white">From Specified Hazards</p>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    The risk of serious injury must arise from one or more of the specified hazards
                    listed in the Regulations and ACoP L101 (detailed below). General workplace
                    hazards such as slips, trips, falls, or manual handling do not, on their own,
                    make a space a confined space &mdash; it must be the specified confined-space hazards.
                  </p>
                </div>
              </div>

              <p>
                A critically important aspect of this definition is what it does
                <strong> not</strong> say. It does not mention size. It does not mention depth.
                It does not mention whether the space is underground, at ground level, or at
                height. It does not require the space to be permanently enclosed. A space that
                becomes substantially enclosed temporarily &mdash; for example, a room where
                all doors and windows are sealed during a coating operation &mdash; can become a
                confined space for the duration of that enclosure.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Term: &ldquo;Substantially Enclosed&rdquo;</p>
                <p className="text-sm text-white/80">
                  The word &ldquo;substantially&rdquo; is deliberate. A space does not need to be
                  hermetically sealed or enclosed on all sides to be substantially enclosed. ACoP
                  L101 gives examples including open-topped tanks, partially open trenches, rooms
                  with limited openings, and spaces with removable lids or covers. The test is
                  whether the degree of enclosure is sufficient, in combination with the conditions
                  present, to give rise to the specified risks.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: The Specified Risks                              */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">03</span>
            The Specified Risks
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The second limb of the legal definition requires a foreseeable risk of serious
                injury from <strong>specified hazards</strong>. These are not general workplace
                hazards &mdash; they are the particular dangers that are characteristic of enclosed
                or partially enclosed environments. ACoP L101 and the associated guidance identify
                the following specified risks:
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Specified Risks Under the Regulations</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Fire or Explosion</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Flammable gases, vapours, or dusts can accumulate in enclosed spaces to
                      form explosive atmospheres. In a substantially enclosed space, a fire or
                      explosion can be catastrophic because the pressure wave has nowhere to
                      dissipate and escape routes are limited. Sources of ignition include
                      electrical equipment, hot work, static electricity, and even sparks from
                      hand tools.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Loss of Consciousness from Raised Body Temperature</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      In enclosed spaces with limited air movement, body heat can accumulate
                      rapidly, especially during physical work. Heat stress can progress to heat
                      exhaustion and heat stroke, leading to loss of consciousness and, if not
                      treated urgently, death. This risk is heightened when workers wear PPE (such
                      as chemical suits) that prevents heat dissipation, or in spaces exposed to
                      external heat sources such as industrial processes.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Loss of Consciousness or Asphyxiation from Gas, Fume, Vapour, or Lack of Oxygen</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      This is the most common cause of death in confined spaces. Normal air
                      contains approximately 20.9% oxygen. When oxygen levels fall below 16%,
                      physical and mental impairment occurs. Below 10%, unconsciousness can be
                      immediate and death follows within minutes. Oxygen can be displaced by other
                      gases (e.g., nitrogen purging, CO&#8322; from fermentation, argon from
                      welding) or consumed by chemical reactions (e.g., rusting, microbial
                      decomposition). Toxic gases such as hydrogen sulphide (H&#8322;S) and
                      carbon monoxide (CO) can cause unconsciousness or death at very low
                      concentrations.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Drowning from Rising Liquid Levels</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      In spaces connected to liquid sources &mdash; drains, sewers, tanks,
                      sumps, interceptors &mdash; liquid levels can rise suddenly and without
                      warning due to rainfall, process discharges, or valve failures. In an
                      enclosed space with limited egress, a worker can be trapped and drowned
                      in seconds. This risk extends to any liquid, not just water &mdash;
                      including chemicals, slurry, and industrial effluent.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Engulfment by a Free-Flowing Solid</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Silos, hoppers, and storage vessels containing granular or powdered
                      materials (grain, sand, cement, plastic pellets) present a risk of
                      engulfment. Free-flowing solids behave like liquids &mdash; a worker
                      who breaks through a bridged surface or enters a partly filled vessel
                      can be engulfed in seconds. Once engulfed beyond chest depth, the
                      pressure of the material makes it virtually impossible to escape without
                      external assistance, and breathing is rapidly compromised.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                It is important to understand that only <strong>one</strong> of these specified
                risks needs to be reasonably foreseeable for the space to qualify as a confined
                space (provided it is also substantially enclosed). Many confined spaces present
                multiple specified risks simultaneously &mdash; for example, a sewer may present
                risks of toxic gas exposure, oxygen depletion, drowning, and explosive atmosphere
                all at the same time.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Electrical Trade Examples</p>
                <p className="text-sm text-white/80">
                  An electrician working in a poorly ventilated plant room where gas-fired
                  equipment is present may face oxygen depletion and toxic gas risks. A cable
                  tunnel below a substation may have limited ventilation and accumulations of
                  SF&#8326; (sulphur hexafluoride) gas used in switchgear insulation. A chamber
                  below a manhole cover on a cable route may have CO&#8322; accumulation from
                  biological decomposition in the surrounding soil. In each case, the space is
                  substantially enclosed and one or more specified risks are foreseeable &mdash;
                  making it a confined space.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: Common Misconceptions                            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">04</span>
            Common Misconceptions
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Misunderstanding what constitutes a confined space is a significant contributing
                factor in many fatal incidents. HSE investigations consistently find that workers,
                supervisors, and even managers failed to recognise a space as &ldquo;confined&rdquo;
                because they held one or more of the following incorrect beliefs:
              </p>

              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-semibold text-red-400">Misconception 1: &ldquo;Underground = Confined Space&rdquo;</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    <strong className="text-white">Wrong.</strong> While many confined spaces are
                    below ground (sewers, manholes, basements), the Regulations do not reference
                    depth or location. An above-ground storage tank, a ceiling void, a roof-level
                    ductwork chamber, or a room at the top of a building can all be confined spaces
                    if they meet the two-part definition. Equally, not all underground spaces are
                    confined spaces &mdash; an open excavation with good ventilation and no
                    specified risks is not a confined space.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-semibold text-red-400">Misconception 2: &ldquo;Small = Confined&rdquo;</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    <strong className="text-white">Wrong.</strong> Size is irrelevant to the legal
                    definition. A large factory building or warehouse can be a confined space if it
                    is substantially enclosed and there is a foreseeable risk of serious injury from
                    specified hazards (for example, a large enclosed space where a gas leak could
                    create a toxic or explosive atmosphere). Conversely, a small electrical cupboard
                    that is well-ventilated and contains no specified risks is not a confined space.
                    The definition is based on risk characteristics, not physical dimensions.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-semibold text-red-400">Misconception 3: &ldquo;It Must Be Permanently Enclosed&rdquo;</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    <strong className="text-white">Wrong.</strong> Temporary enclosure counts.
                    A room that is normally well-ventilated can become a confined space if doors
                    and windows are sealed during a work process (e.g., spray painting, fumigation,
                    gas purging). A trench that is covered with boards becomes substantially enclosed.
                    A normally open vessel that is partially covered during maintenance may temporarily
                    become a confined space. The assessment must consider the conditions at the time
                    of the work, not just the permanent physical characteristics of the space.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-semibold text-red-400">Misconception 4: &ldquo;If I Can See Daylight, It&rsquo;s Not Confined&rdquo;</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    <strong className="text-white">Wrong.</strong> Many confined spaces have
                    openings. Tanks with manholes, open-topped vats, trenches with partial
                    covering, and chambers with access hatches are all potentially confined
                    spaces despite having openings. The definition requires &ldquo;substantial&rdquo;
                    enclosure, not total enclosure. An opening does not automatically ensure
                    adequate ventilation or prevent the accumulation of hazardous atmospheres.
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-semibold text-red-400">Misconception 5: &ldquo;It Smells Fine, So It Must Be Safe&rdquo;</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    <strong className="text-white">Wrong &mdash; and fatally so.</strong> Many of
                    the most dangerous confined space hazards are invisible and odourless. Oxygen
                    depletion cannot be detected by human senses. Carbon monoxide is odourless.
                    Nitrogen and argon are odourless inert gases that displace oxygen without
                    warning. By the time a worker realises something is wrong, they may already
                    be losing consciousness. Only atmospheric monitoring with calibrated instruments
                    can reliably detect these hazards.
                  </p>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">The Lesson:</strong> Never assume. Always
                  assess. If a space is substantially enclosed, ask: &ldquo;Is there a reasonably
                  foreseeable risk of serious injury from fire/explosion, toxic gas, oxygen
                  depletion, heat, drowning, or engulfment?&rdquo; If the answer to any of these
                  is yes, it is a confined space and the full requirements of the Regulations apply.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 05: Incident History & Statistics                     */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">05</span>
            Incident History &amp; Statistics
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The statistics around confined space incidents are grim and remarkably consistent
                over time. Despite the Regulations being in force since 1998, people continue to
                die in confined spaces every year in the UK &mdash; and the pattern of incidents
                is depressingly predictable. Understanding these statistics is not an academic
                exercise; it is essential context for understanding why the Regulations take the
                approach they do.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-3">UK Confined Space Incident Statistics</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">~15</p>
                    <p className="text-white/70 text-xs">deaths per year in the UK from confined space incidents (HSE long-term average)</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">~60%</p>
                    <p className="text-white/70 text-xs">of those deaths are would-be rescuers who entered without adequate precautions or equipment</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">Seconds</p>
                    <p className="text-white/70 text-xs">the typical time from entry to incapacitation in an oxygen-depleted or toxic atmosphere &mdash; many victims collapse within the first few breaths</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">Multiple</p>
                    <p className="text-white/70 text-xs">many confined space incidents result in multiple fatalities from a single event, typically when rescuers become casualties alongside the original victim</p>
                  </div>
                </div>
              </div>

              <p>
                The statistic that should command the most attention is that <strong>approximately
                60% of deaths in confined space incidents are would-be rescuers</strong>. This
                means that for every worker who is overcome by a hazardous atmosphere, more people
                are likely to die attempting an unplanned rescue than from the original incident
                itself. The instinct to help a fallen colleague is natural and understandable &mdash;
                but rushing into a confined space without breathing apparatus, atmospheric monitoring,
                and a planned rescue procedure is one of the most dangerous actions a person can take.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">The Rescuer Trap</p>
                </div>
                <p className="text-sm text-white/80">
                  The typical pattern is tragically simple: a worker enters a confined space,
                  is overcome by a hazardous atmosphere (often within seconds), and collapses.
                  A colleague sees them fall and, driven by the instinct to help, enters the
                  space without any respiratory protection. They too are overcome by the same
                  atmosphere. A third person may follow. HSE records include incidents where
                  three, four, and even five people have died from a single event &mdash; the
                  first victim plus multiple rescuers. This is why the Regulations require
                  emergency arrangements to be in place <strong>before</strong> any entry.
                </p>
              </div>

              <p>
                Notable confined space incidents in UK industrial history include fatalities
                in water treatment works, agricultural silos, chemical storage tanks, brewing
                vessels, ships&rsquo; holds, and sewers. The industries affected are diverse,
                but the underlying causes are remarkably similar: failure to recognise the space
                as confined, failure to assess the atmosphere, failure to implement a safe system
                of work, and unplanned rescue attempts.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Common Causes of Fatal Incidents</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Failure to recognise the space as a confined space in the first place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>No atmospheric testing before or during entry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>No safe system of work (permit to work, risk assessment, method statement)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>No emergency rescue arrangements in place before entry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Unplanned, improvised rescue attempts by untrained colleagues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Inadequate or absent ventilation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>Workers not trained in confined space hazards and procedures</span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">The Hidden Danger:</strong> Unlike many
                  workplace hazards, confined space risks are often <strong>invisible</strong>.
                  You cannot see an oxygen-depleted atmosphere. You cannot smell carbon monoxide.
                  You cannot detect nitrogen displacement by looking into a space. The absence
                  of any visible hazard is precisely what lulls people into a false sense of
                  security &mdash; and into fatal decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 06: ACoP L101 & Related Legislation                  */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">06</span>
            ACoP L101 &amp; Related Legislation
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Confined Spaces Regulations 1997 are accompanied by <strong>Approved Code
                of Practice L101: &ldquo;Safe Work in Confined Spaces&rdquo;</strong>, published
                by the HSE. Understanding the legal status of an ACoP is important for anyone
                involved in planning, supervising, or carrying out work that may involve confined
                spaces.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Legal Status of ACoP L101</p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  An Approved Code of Practice has a special legal standing. It is not law in
                  itself, but if you are prosecuted for a breach of the Confined Spaces Regulations
                  and it is proved that you did not follow the relevant provisions of the ACoP,
                  a court will find you at fault <strong>unless you can demonstrate that you
                  complied with the Regulations in some other equally effective way</strong>. In
                  practice, following the ACoP is the recognised standard means of demonstrating
                  compliance. Departing from it places the burden of proof on you to show your
                  alternative approach was equally effective &mdash; a difficult position in court.
                </p>
              </div>

              <p>
                The Confined Spaces Regulations do not operate in isolation. They sit within a
                wider framework of UK health and safety legislation, and several other pieces of
                law are directly relevant to confined space work:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Key Related Legislation</p>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-white/5 pb-4">
                    <p className="text-sm font-medium text-white mb-1">Health and Safety at Work etc. Act 1974 (HASAWA)</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      The <strong>&ldquo;parent Act&rdquo;</strong> under which the Confined
                      Spaces Regulations were made. HASAWA places overarching duties on employers
                      (Section 2), the self-employed (Section 3), and employees (Section 7). It
                      is criminal law &mdash; breaches can result in unlimited fines and imprisonment.
                    </p>
                  </div>
                  <div className="border-b border-white/5 pb-4">
                    <p className="text-sm font-medium text-white mb-1">Management of Health and Safety at Work Regulations 1999</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Require employers to carry out suitable and sufficient risk assessments for
                      all work activities. Confined space risk assessments must comply with these
                      general requirements as well as the specific requirements of the Confined
                      Spaces Regulations. Also require the appointment of competent persons and
                      establishment of emergency procedures.
                    </p>
                  </div>
                  <div className="border-b border-white/5 pb-4">
                    <p className="text-sm font-medium text-white mb-1">Provision and Use of Work Equipment Regulations 1998 (PUWER)</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Applies to all equipment used in confined space work, including atmospheric
                      monitoring instruments, ventilation equipment, communication devices, and
                      rescue equipment. PUWER requires that equipment is suitable for purpose,
                      properly maintained, and used by trained persons.
                    </p>
                  </div>
                  <div className="border-b border-white/5 pb-4">
                    <p className="text-sm font-medium text-white mb-1">Lifting Operations and Lifting Equipment Regulations 1998 (LOLER)</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Directly relevant to confined space rescue operations, which frequently
                      involve raising an incapacitated casualty vertically through a manhole or
                      hatch using a tripod and winch system. LOLER requires that lifting
                      operations are properly planned, supervised, and carried out using suitable,
                      inspected equipment.
                    </p>
                  </div>
                  <div className="border-b border-white/5 pb-4">
                    <p className="text-sm font-medium text-white mb-1">Control of Substances Hazardous to Health Regulations 2002 (COSHH)</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Where hazardous substances are present in or generated within a confined
                      space, COSHH duties apply alongside the Confined Spaces Regulations. This
                      includes duties to assess exposure risks, prevent or control exposure, and
                      provide appropriate PPE and RPE.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR)</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Where flammable or explosive substances may be present in a confined space
                      (a very common scenario), DSEAR applies. DSEAR requires the classification
                      of hazardous areas into zones and the selection of appropriate (e.g.,
                      ATEX-rated) equipment for use in those zones.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">In Practice:</strong> On a typical job,
                  multiple pieces of legislation will apply simultaneously to confined space work.
                  An electrician entering a cable tunnel to carry out an inspection may be subject
                  to the Confined Spaces Regulations (confined space entry), HASAWA (general
                  duties), the Management Regulations (risk assessment), PUWER (tools and
                  instruments), COSHH (if hazardous substances are present), and DSEAR (if
                  flammable atmospheres could form). Effective compliance requires awareness of
                  all applicable legislation, not just the Confined Spaces Regulations in isolation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 07: The Hierarchy — Avoid, Safe System, Emergency    */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">07</span>
            The Hierarchy: Avoid &gt; Safe System &gt; Emergency
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Confined Spaces Regulations 1997 establish a clear, three-tier hierarchy
                that governs all confined space work. This hierarchy is the backbone of the
                Regulations and must be applied in order. You cannot jump to tier 2 without
                first demonstrating that tier 1 is not reasonably practicable, and you cannot
                proceed to tier 3 alone &mdash; tier 3 must always be in place when entry occurs.
              </p>

              {/* Hierarchy Diagram */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-cyan-400 mb-4 text-center">Hierarchy: Avoid &gt; Safe System &gt; Emergency</p>
                <div className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 text-green-400 text-lg font-bold flex-shrink-0">1</span>
                      <div>
                        <p className="text-base font-semibold text-green-400 mb-1">AVOID Entry (Regulation 4(1))</p>
                        <p className="text-sm text-white/80 leading-relaxed">
                          No person shall enter a confined space to carry out work for any purpose
                          unless it is not reasonably practicable to achieve that purpose without
                          such entry. This is the <strong>first and preferred option</strong>.
                          Before any entry is considered, you must ask: &ldquo;Can this work be
                          done from outside the space?&rdquo;
                        </p>
                        <div className="mt-3 bg-white/5 rounded-lg p-3">
                          <p className="text-xs text-white/60 font-medium mb-1">Examples of Avoidance</p>
                          <ul className="text-xs text-white/60 space-y-1">
                            <li className="flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                              <span>Inspecting a tank using remote cameras, CCTV, or robotic crawlers instead of physical entry</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                              <span>Cleaning a vessel using fixed spray nozzles operated from outside</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                              <span>Taking samples via remote sampling points rather than entering a chamber</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                              <span>Routing cables to avoid passing through a confined space</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-white/20" />
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 text-lg font-bold flex-shrink-0">2</span>
                      <div>
                        <p className="text-base font-semibold text-cyan-400 mb-1">SAFE SYSTEM of Work (Regulation 4(2))</p>
                        <p className="text-sm text-white/80 leading-relaxed">
                          Where entry cannot be avoided, no person shall enter or carry out work
                          in a confined space except in accordance with a safe system of work that
                          renders the work safe and without risks to health, so far as is reasonably
                          practicable. The safe system of work must be based on a thorough risk
                          assessment.
                        </p>
                        <div className="mt-3 bg-white/5 rounded-lg p-3">
                          <p className="text-xs text-white/60 font-medium mb-1">Typical Safe System Elements</p>
                          <ul className="text-xs text-white/60 space-y-1">
                            <li className="flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                              <span>Permit-to-work system with defined roles and responsibilities</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                              <span>Atmospheric testing before and continuously during entry</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                              <span>Mechanical ventilation of the space</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                              <span>Isolation of connected pipework, valves, and energy sources</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                              <span>Trained and competent personnel, with a top-person stationed at the entry point</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                              <span>Communication systems between entrant(s) and the top-person</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-0.5 h-6 bg-white/20" />
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-500/20 text-red-400 text-lg font-bold flex-shrink-0">3</span>
                      <div>
                        <p className="text-base font-semibold text-red-400 mb-1">EMERGENCY Arrangements (Regulation 5)</p>
                        <p className="text-sm text-white/80 leading-relaxed">
                          No person shall enter a confined space unless suitable and sufficient
                          emergency arrangements have been made <strong>before</strong> entry.
                          This is not optional &mdash; it is a mandatory requirement that applies
                          whenever entry occurs. The arrangements must be capable of effecting
                          a rescue of any person in the event of an emergency.
                        </p>
                        <div className="mt-3 bg-white/5 rounded-lg p-3">
                          <p className="text-xs text-white/60 font-medium mb-1">Emergency Arrangement Requirements</p>
                          <ul className="text-xs text-white/60 space-y-1">
                            <li className="flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                              <span>Rescue equipment immediately available at the point of entry (e.g., tripod, winch, harness, breathing apparatus)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                              <span>Trained rescue personnel available to respond immediately</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                              <span>A clear procedure for raising the alarm, initiating rescue, and contacting emergency services</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                              <span>Practice and drill of emergency procedures at regular intervals</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The hierarchy is straightforward: <strong>avoid</strong> if you can;
                <strong> safe system</strong> if you cannot avoid; <strong>emergency
                arrangements</strong> always in place when entry occurs. The first tier eliminates
                the risk entirely. The second tier manages the risk to an acceptable level. The
                third tier ensures that if something goes wrong despite the safe system of work,
                a rescue can be effected without creating additional casualties.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Why the Hierarchy Matters in Practice</p>
                <p className="text-sm text-white/80">
                  HSE investigations into fatal confined space incidents almost invariably find
                  that one or more tiers of the hierarchy were not followed. In some cases,
                  avoidance was possible but not considered. In others, a safe system of work
                  was not developed or was not followed. In the most tragic cases, no emergency
                  arrangements were in place, leading to the &ldquo;rescuer trap&rdquo; where
                  multiple people died trying to save the first victim. The hierarchy exists
                  because it works &mdash; when it is actually applied.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 08: Who Needs Confined Space Awareness Training?      */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-cyan-500/80 text-sm font-normal">08</span>
            Who Needs Confined Space Awareness Training?
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Confined Spaces Regulations 1997, supported by ACoP L101, require that no
                person enters a confined space unless they are competent and have received
                appropriate training. But the need for training extends well beyond those who
                physically enter confined spaces. Regulation 4 and the guidance in ACoP L101
                make clear that a range of people require varying levels of confined space
                knowledge.
              </p>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Who Needs Training?</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Those Who May Enter Confined Spaces</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Workers who may need to physically enter a confined space to carry out work
                      require the highest level of training. This includes knowledge of the
                      Regulations, risk assessment, safe systems of work, atmospheric monitoring,
                      use of RPE and other PPE, communication procedures, and emergency
                      arrangements. This typically involves both theoretical and practical training.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Those Who Work Near Confined Spaces</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Workers who carry out tasks near confined spaces &mdash; even if they do not
                      enter them &mdash; need awareness training. They need to be able to recognise
                      confined spaces, understand the risks, know not to enter or lean into a
                      confined space, and know what to do if they witness an emergency. This is
                      the &ldquo;awareness&rdquo; level of training.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Supervisors and Managers</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Those who plan, organise, or supervise work that may involve confined spaces
                      need sufficient knowledge to ensure compliance with the Regulations. This
                      includes understanding the hierarchy (avoid, safe system, emergency
                      arrangements), the content and operation of permit-to-work systems, and
                      their responsibilities for ensuring workers are competent and properly
                      equipped.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Emergency Rescue Personnel</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Anyone designated as part of the emergency rescue team for confined space
                      work requires specialist rescue training. This includes the use of breathing
                      apparatus (BA), rescue equipment (tripods, winches, harnesses, stretchers),
                      casualty handling in confined spaces, and communication during rescue
                      operations. Rescue training must include regular practical drills.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Top-Persons (Standby/Attendants)</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The &ldquo;top-person&rdquo; stationed at the entry point during confined
                      space work has a critical role: maintaining communication with the entrant(s),
                      monitoring conditions, controlling access, and raising the alarm in an
                      emergency. They require specific training in these responsibilities and must
                      know the emergency procedures thoroughly.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                For electricians, the question is not &ldquo;will I ever encounter a confined
                space?&rdquo; but &ldquo;will I recognise it when I do?&rdquo; Electrical
                installation and maintenance work regularly takes place in or near spaces that
                may be confined: plant rooms, risers, service tunnels, ceiling voids, trenches,
                transformer enclosures, and switchgear chambers. Even if you never physically
                enter a confined space, you need the awareness to recognise one, to avoid
                inadvertent entry, and to respond correctly if an incident occurs nearby.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Competence Under the Regulations</p>
                <p className="text-sm text-white/80">
                  ACoP L101 defines competence as a combination of training, experience, and
                  knowledge sufficient for the person to carry out their role safely. It is
                  not enough to simply attend a course &mdash; competence must be assessed and
                  verified. For those entering confined spaces, this typically means completing
                  accredited training, demonstrating practical skills, and receiving refresher
                  training at appropriate intervals. For awareness-level training, the
                  requirement is understanding the principles, recognising hazards, and knowing
                  the correct course of action.
                </p>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-cyan-400">Key Takeaway:</strong> Confined space
                  awareness training is not just for those who enter confined spaces. It is for
                  anyone who may encounter a confined space, work near one, supervise work
                  involving one, or need to respond to an emergency in or around one. As an
                  electrician, this almost certainly includes you. The knowledge in this course
                  could save your life or the life of a colleague.
                </p>
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
          title="Section 1 Knowledge Check"
          questions={quizQuestions}
        />

        {/* ============================================================ */}
        {/*  BOTTOM NAVIGATION                                            */}
        {/* ============================================================ */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-cyan-500 text-white hover:bg-cyan-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../confined-spaces-module-1-section-2">
              Next: Identifying Confined Spaces
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
