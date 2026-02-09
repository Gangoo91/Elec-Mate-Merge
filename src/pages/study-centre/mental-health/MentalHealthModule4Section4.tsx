import {
  ArrowLeft,
  Brain,
  CheckCircle,
  AlertTriangle,
  Shield,
  Heart,
  HardHat,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Quick-check questions (3) — placed after sections 2, 4, 6         */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "ptsd-symptom-clusters-check",
    question:
      "A construction worker who witnessed a fatal fall on site six weeks ago is experiencing vivid nightmares about the incident, avoids going near the area where it happened, is constantly on edge and jumpy, and has withdrawn from his family. Which of the four PTSD symptom clusters is he NOT clearly demonstrating here?",
    options: [
      "Re-experiencing — the nightmares are intrusive re-experiencing of the event",
      "Avoidance — he is avoiding the location associated with the trauma",
      "Hyperarousal — he is on edge and jumpy (hypervigilant, exaggerated startle response)",
      "Negative Cognitions and Mood — while he has withdrawn, the scenario does not describe persistent guilt, shame, or distorted blame",
    ],
    correctIndex: 3,
    explanation:
      "The worker is clearly demonstrating Re-experiencing (nightmares), Avoidance (avoiding the location), and Hyperarousal (on edge, jumpy). While his withdrawal from family could suggest elements of Negative Cognitions and Mood, the scenario does not explicitly describe the core features of this cluster such as persistent guilt, shame, distorted blame about the cause of the event, or persistent negative beliefs about oneself or the world. In a clinical assessment, all four clusters would be explored thoroughly.",
  },
  {
    id: "complex-ptsd-features-check",
    question:
      "A colleague discloses that they experienced years of domestic violence at home. They describe extreme difficulty controlling their emotions, a deep sense of worthlessness, and an inability to trust anyone at work. They have been diagnosed with Complex PTSD. What distinguishes Complex PTSD from standard PTSD?",
    options: [
      "Complex PTSD only involves flashbacks, whereas standard PTSD does not",
      "Complex PTSD includes additional features beyond standard PTSD: emotional dysregulation, negative self-concept, and relationship difficulties — typically resulting from prolonged or repeated trauma",
      "Complex PTSD is less severe than standard PTSD and does not require specialist treatment",
      "Complex PTSD and standard PTSD are identical — the terms are interchangeable",
    ],
    correctIndex: 1,
    explanation:
      "Complex PTSD, recognised in ICD-11, includes all the core features of standard PTSD (re-experiencing, avoidance, hyperarousal) PLUS three additional features: emotional dysregulation (difficulty controlling emotions, explosive anger or emotional numbness), negative self-concept (persistent feelings of worthlessness, shame, defeat), and disturbances in relationships (difficulty trusting others, feeling detached, problems sustaining close relationships). It typically results from prolonged, repeated, or inescapable trauma such as domestic violence, childhood abuse, or captivity.",
  },
  {
    id: "trauma-informed-principles-check",
    question:
      "You are a Mental Health First Aider on a construction site. A colleague has recently disclosed a traumatic experience and is visibly distressed. Which of the following best reflects the five principles of a trauma-informed approach?",
    options: [
      "Diagnose the trauma, prescribe a treatment plan, refer immediately to A&E, document everything, and inform the site manager",
      "Safety, Trustworthiness, Choice, Collaboration, and Empowerment — creating a safe space, being transparent, offering options rather than directing, working with the person, and supporting their sense of control",
      "Listen briefly, advise them to toughen up, suggest they take the rest of the day off, and avoid discussing it further",
      "Immediately contact their GP, inform HR, arrange counselling without their consent, and remove them from the work rota",
    ],
    correctIndex: 1,
    explanation:
      "The five principles of a trauma-informed approach are: Safety (ensuring physical and emotional safety), Trustworthiness (being transparent, consistent, and reliable), Choice (giving the person options and control over what happens next), Collaboration (working alongside the person rather than doing things to them), and Empowerment (supporting their strengths, resilience, and ability to recover). As an MHFA, you are not diagnosing or prescribing treatment — you are providing initial support and signposting to appropriate professional help.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (5)                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      "Is it normal to feel distressed after witnessing a serious incident on site, even if I wasn't directly involved?",
    answer:
      "Yes, absolutely. Witnessing a serious incident — a fall, an electrocution, a structural collapse — is a traumatic experience in itself. This is known as vicarious or secondary trauma. You do not need to be the person who was physically injured to be psychologically affected. It is entirely normal to experience intrusive thoughts, difficulty sleeping, heightened anxiety, or emotional numbness in the days and weeks following such an event. Most people will recover naturally with time and support. However, if these symptoms persist beyond four weeks, are getting worse rather than better, or are significantly affecting your ability to function at work or at home, you should speak to your GP or contact a mental health professional. Early support leads to better outcomes.",
  },
  {
    question:
      "What is the difference between a normal stress reaction and PTSD?",
    answer:
      "After a traumatic event, it is normal to experience some degree of distress — difficulty sleeping, intrusive thoughts, feeling on edge, or wanting to avoid reminders of the event. For most people, these symptoms gradually reduce over the following days and weeks as the brain processes the experience. This is a normal stress reaction. PTSD is diagnosed when these symptoms persist for more than one month, are severe enough to cause significant distress or impairment in daily life, and include symptoms from all four clusters: re-experiencing (flashbacks, nightmares), avoidance (avoiding reminders, emotional numbing), hyperarousal (hypervigilance, exaggerated startle, insomnia), and negative cognitions and mood (guilt, shame, detachment). The key distinction is persistence, severity, and functional impairment. If symptoms last beyond four weeks and are not improving, professional assessment is recommended.",
  },
  {
    question:
      "Can PTSD develop months or even years after the traumatic event?",
    answer:
      "Yes. While PTSD symptoms typically begin within the first three months following a trauma, delayed-onset PTSD can develop months or even years later. This can be triggered by a new stressful event, a reminder of the original trauma (an anniversary, a similar incident, returning to the same location), or a change in circumstances that reduces the person's coping capacity. In construction, a worker who seemingly coped well after witnessing a fatal accident may develop PTSD symptoms years later when they encounter a similar situation or when other life stressors reduce their resilience. This is why ongoing awareness and support are important — not just in the immediate aftermath of an incident.",
  },
  {
    question: "What is EMDR and how does it work?",
    answer:
      "EMDR (Eye Movement Desensitisation and Reprocessing) is an evidence-based psychological therapy recommended by NICE for the treatment of PTSD. It was developed by Francine Shapiro in 1987. During EMDR, the therapist guides the client to recall distressing trauma-related images, thoughts, and sensations while simultaneously engaging in bilateral stimulation — typically side-to-side eye movements following the therapist's hand, but sometimes tapping or auditory tones. The theory is that the bilateral stimulation helps the brain to reprocess the traumatic memory, moving it from a 'stuck' state (where it feels as though the trauma is happening right now) to a properly processed memory (where it is recognised as something that happened in the past). EMDR does not require the person to talk in detail about the traumatic event, which makes it particularly suitable for people who find it difficult to verbalise their experiences.",
  },
  {
    question:
      "As a Mental Health First Aider, what should I do if someone tells me about a traumatic experience?",
    answer:
      "Your role as a Mental Health First Aider is to provide initial support, not therapy. Listen without judgement — let them share as much or as little as they want. Do not pressure them for details or ask probing questions about the trauma itself, as this can cause re-traumatisation. Validate their feelings ('It makes sense that you feel that way after what you went through'). Use the trauma-informed principles: ensure they feel safe, be trustworthy and transparent, give them choices about what happens next, collaborate with them rather than directing them, and empower them by acknowledging their strength in talking about it. Signpost to appropriate support: their GP, the company's Employee Assistance Programme (EAP), or specialist services such as the Samaritans (116 123), Mind, or the Construction Industry Helpline (0345 605 1956). Do not attempt to provide therapy, diagnose PTSD, or use techniques like EMDR — these require specialist training.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (8)                                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following best describes 'complex trauma'?",
    options: [
      "A single traumatic incident such as a car accident or natural disaster",
      "Prolonged, repeated, or inescapable traumatic experiences such as ongoing domestic violence, childhood abuse, or captivity",
      "Witnessing another person's traumatic experience through media reports",
      "A traumatic event that occurred in a workplace setting specifically",
    ],
    correctAnswer: 1,
    explanation:
      "Complex trauma refers to prolonged, repeated, or inescapable traumatic experiences — typically occurring in situations where the person cannot escape, such as domestic violence, childhood abuse, human trafficking, or war. This is distinct from single-incident trauma (a one-off event like an accident or assault) and vicarious trauma (exposure to others' trauma). Complex trauma often leads to Complex PTSD, which includes additional features beyond standard PTSD.",
  },
  {
    id: 2,
    question:
      "According to ICD-11, which of the following is NOT one of the four core symptom clusters of PTSD?",
    options: [
      "Re-experiencing — flashbacks, nightmares, intrusive memories",
      "Avoidance — avoiding reminders, emotional numbing",
      "Substance misuse — increased alcohol or drug use as a coping mechanism",
      "Hyperarousal — hypervigilance, exaggerated startle response, insomnia",
    ],
    correctAnswer: 2,
    explanation:
      "The four symptom clusters of PTSD are: Re-experiencing (flashbacks, nightmares, intrusive memories), Avoidance (avoiding reminders, emotional numbing), Hyperarousal (hypervigilance, exaggerated startle response, insomnia, irritability), and Negative Cognitions and Mood (guilt, shame, detachment, distorted blame). While substance misuse is commonly associated with PTSD as a maladaptive coping mechanism, it is not one of the diagnostic symptom clusters. It is a co-occurring problem rather than a core symptom.",
  },
  {
    id: 3,
    question:
      "A construction worker who witnessed a colleague's fatal electrocution three months ago is now experiencing vivid flashbacks where he feels as though the event is happening again. He can smell the burning and hear the sounds. What symptom cluster does this belong to?",
    options: [
      "Avoidance — he is re-living the event to try to process it",
      "Hyperarousal — the flashbacks are a form of heightened alertness",
      "Re-experiencing — flashbacks are involuntary, vivid reliving of the traumatic event with sensory components (sight, sound, smell) that feel as though the event is happening in the present moment",
      "Negative Cognitions and Mood — the flashbacks reflect a negative thought pattern",
    ],
    correctAnswer: 2,
    explanation:
      "Flashbacks are the hallmark feature of the Re-experiencing symptom cluster. They are involuntary, vivid, and intrusive experiences where the person feels as though the traumatic event is happening again in the present moment — not just remembering it, but reliving it. Flashbacks often include sensory components: the person may see, hear, smell, or physically feel aspects of the original trauma. They can be triggered by reminders of the event (a similar sound, a similar location, an anniversary) or may occur without an obvious trigger.",
  },
  {
    id: 4,
    question:
      "What additional features distinguish Complex PTSD from standard PTSD in the ICD-11 classification?",
    options: [
      "More frequent flashbacks and more severe nightmares",
      "Emotional dysregulation, negative self-concept, and disturbances in relationships",
      "Physical symptoms such as chronic pain and fatigue",
      "Inability to recall the traumatic event (complete amnesia)",
    ],
    correctAnswer: 1,
    explanation:
      "ICD-11 recognises Complex PTSD as a distinct diagnosis that includes all the core features of PTSD plus three additional 'disturbances in self-organisation': (1) Emotional dysregulation — difficulty controlling emotions, explosive anger, or emotional shutdown; (2) Negative self-concept — persistent feelings of worthlessness, being permanently damaged, shame, guilt, or defeat; (3) Disturbances in relationships — difficulty trusting others, feeling detached from people, inability to maintain close relationships. These additional features typically result from prolonged, repeated trauma where escape was difficult or impossible.",
  },
  {
    id: 5,
    question:
      "Why are construction workers particularly vulnerable to trauma-related mental health conditions?",
    options: [
      "Construction workers are genetically more susceptible to PTSD than workers in other industries",
      "Construction has higher exposure to potentially traumatic incidents (falls, electrocution, structural collapse, deaths on site), a culture of 'toughness' that discourages help-seeking, and cumulative exposure to dangerous situations over a career",
      "Construction workers receive no first aid training, so they are unprepared for accidents",
      "Construction workers work longer hours than any other profession, causing chronic fatigue that leads to PTSD",
    ],
    correctAnswer: 1,
    explanation:
      "Construction workers face multiple risk factors for trauma: high exposure to potentially traumatic incidents (the industry has one of the highest rates of serious injury and fatality), cumulative exposure over a career (witnessing multiple incidents compounds the psychological impact), a culture that often stigmatises mental health discussions ('man up', 'get on with it'), practical barriers to accessing help (remote site locations, self-employment, lack of occupational health support), and the physical nature of the work which means taking time off for mental health feels unacceptable. These factors combine to make construction workers especially vulnerable.",
  },
  {
    id: 6,
    question:
      "Which of the following best describes the trauma-informed principle of 'Choice'?",
    options: [
      "Choosing the most appropriate clinical diagnosis for the person's condition",
      "Allowing the person to choose which therapist they want to see",
      "Giving the person options and a sense of control over what happens next, rather than making decisions for them or directing them",
      "Choosing not to discuss the traumatic event to avoid causing further distress",
    ],
    correctAnswer: 2,
    explanation:
      "The principle of 'Choice' in a trauma-informed approach means giving the person options and restoring their sense of control. Trauma often involves a loss of control — the person was unable to prevent what happened to them. In your response, you should offer options rather than directing: 'Would you like me to sit with you for a bit, or would you prefer some space?', 'There are a few services that might help — would you like me to tell you about them?', 'You don't have to talk about what happened — but I'm here if you want to.' This restores agency and avoids replicating the powerlessness experienced during the trauma.",
  },
  {
    id: 7,
    question:
      "According to NICE guidelines, what are the two recommended first-line treatments for PTSD in adults?",
    options: [
      "Medication (antidepressants) and group counselling",
      "Trauma-focused Cognitive Behavioural Therapy (TF-CBT) and Eye Movement Desensitisation and Reprocessing (EMDR)",
      "Hypnotherapy and mindfulness meditation",
      "Debriefing sessions immediately after the traumatic event and ongoing counselling",
    ],
    correctAnswer: 1,
    explanation:
      "NICE (National Institute for Health and Care Excellence) recommends two first-line psychological treatments for PTSD: Trauma-focused Cognitive Behavioural Therapy (TF-CBT) and Eye Movement Desensitisation and Reprocessing (EMDR). Both have strong evidence bases. TF-CBT focuses on helping the person process the traumatic memory and change unhelpful thinking patterns. EMDR uses bilateral stimulation (typically eye movements) to help the brain reprocess stuck traumatic memories. Note: NICE specifically recommends against single-session psychological debriefing immediately after a trauma, as evidence shows it does not prevent PTSD and may actually be harmful.",
  },
  {
    id: 8,
    question:
      "As a Mental Health First Aider, which of the following actions is most appropriate when supporting a colleague who may be experiencing PTSD symptoms after a site incident?",
    options: [
      "Diagnose them with PTSD based on the symptoms they describe and recommend EMDR therapy",
      "Encourage them to relive the traumatic event in detail so they can process it — this is what therapists do in trauma-focused CBT",
      "Listen without judgement, validate their experience, offer practical support, and signpost to professional help such as their GP, EAP, or specialist services — without attempting to diagnose or provide therapy",
      "Inform the site manager and HR department about the person's mental health condition so they can arrange mandatory counselling",
    ],
    correctAnswer: 2,
    explanation:
      "The role of the Mental Health First Aider is to provide initial support and signpost to appropriate professional help — NOT to diagnose, treat, or provide therapy. You should: listen without judgement, validate their feelings, use trauma-informed principles (safety, trust, choice, collaboration, empowerment), offer practical support, and signpost to professional help (GP, EAP, Samaritans 116 123, Mind, Construction Industry Helpline 0345 605 1956). You should NOT diagnose PTSD, recommend specific therapies, encourage detailed reliving of the trauma (this requires specialist training and can cause re-traumatisation), or disclose their condition to others without consent.",
  },
];

/* ------------------------------------------------------------------ */
/*  Border colours for alternating sections                            */
/* ------------------------------------------------------------------ */
const borderColours = [
  "border-purple-500/50",
  "border-violet-500/50",
  "border-purple-400/50",
  "border-violet-400/50",
  "border-purple-500/50",
  "border-violet-500/50",
];

const numColours = [
  "text-purple-400/80",
  "text-violet-400/80",
  "text-purple-400/80",
  "text-violet-400/80",
  "text-purple-400/80",
  "text-violet-400/80",
];

const headingColours = [
  "text-purple-300",
  "text-violet-300",
  "text-purple-300",
  "text-violet-300",
  "text-purple-300",
  "text-violet-300",
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
const MentalHealthModule4Section4 = () => {
  useSEO({
    title:
      "Trauma, PTSD & Adverse Experiences | Mental Health Module 4 Section 4",
    description:
      "Understanding trauma and its types, PTSD symptom clusters and diagnosis, Complex PTSD, trauma in the construction industry, trauma-informed approaches, and evidence-based treatment options including TF-CBT and EMDR.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* -- Header ------------------------------------------------- */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* -- Main Content ------------------------------------------- */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Centred Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-400/20 border border-purple-500/30 mb-4">
            <Brain className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 mx-auto">
            <span className="text-purple-400 text-xs font-semibold">
              MODULE 4 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Trauma, PTSD &amp; Adverse Experiences
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding trauma, recognising post-traumatic stress disorder,
            applying trauma-informed principles, and supporting colleagues
            affected by adverse experiences in the construction industry
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-purple-400" />
              <p className="text-purple-400 text-base font-medium">
                Trauma &amp; PTSD
              </p>
            </div>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Trauma:</strong> Events that overwhelm the ability to
                cope
              </li>
              <li>
                <strong>PTSD:</strong> 4 symptom clusters &mdash;
                re-experiencing, avoidance, hyperarousal, negative cognitions
              </li>
              <li>
                <strong>Complex PTSD:</strong> Additional features from
                prolonged trauma
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-violet-500/5 border-l-2 border-violet-500/50">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-violet-400" />
              <p className="text-violet-400 text-base font-medium">
                Trauma-Informed Support
              </p>
            </div>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>5 principles:</strong> Safety, Trustworthiness, Choice,
                Collaboration, Empowerment
              </li>
              <li>
                <strong>Treatment:</strong> TF-CBT and EMDR (NICE recommended)
              </li>
              <li>
                <strong>MHFA role:</strong> Support and signpost &mdash; not
                diagnose or treat
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-purple-400" />
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define trauma and distinguish between the four main types: single-incident, complex, vicarious, and developmental",
              "Describe the four symptom clusters of PTSD as classified in ICD-11 and recognise the signs in a workplace context",
              "Explain how Complex PTSD differs from standard PTSD and identify the additional features recognised by ICD-11",
              "Analyse why construction workers are particularly vulnerable to trauma and identify barriers to seeking help",
              "Apply the five principles of a trauma-informed approach when supporting a colleague",
              "Outline the NICE-recommended treatments for PTSD and describe the MHFA's role in initial support and signposting",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-purple-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* -------------------------------------------------------- */}
        {/* SECTION 01 — Understanding Trauma                        */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[0]} text-sm font-normal`}>01</span>
            Understanding Trauma
          </h2>
          <div className={`border-l-2 ${borderColours[0]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Trauma is defined as an event, series of events, or set of
                circumstances that is experienced by an individual as physically
                or emotionally harmful or life-threatening, and that has lasting
                adverse effects on the individual&rsquo;s functioning and
                mental, physical, social, emotional, or spiritual wellbeing. In
                simpler terms, trauma occurs when an experience overwhelms a
                person&rsquo;s ability to cope.
              </p>

              <p>
                It is important to understand that trauma is subjective &mdash;
                what is traumatic for one person may not be traumatic for
                another. The same event can affect different people in very
                different ways, depending on their personal history, support
                networks, coping mechanisms, and individual resilience. There is
                no hierarchy of trauma: a person&rsquo;s response to an event
                is valid regardless of how others might have responded to the
                same situation.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[0]} font-medium mb-3`}>
                  Types of Trauma
                </h3>
                <div className="space-y-4">
                  {/* Single-incident */}
                  <div className="bg-purple-500/5 border border-purple-500/20 p-4 rounded-lg">
                    <h4 className="text-purple-300 font-semibold text-sm mb-2">
                      1. Single-Incident Trauma
                    </h4>
                    <p className="text-white/70 text-sm mb-2">
                      A one-off traumatic event that is sudden, unexpected, and
                      overwhelming.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        "Road traffic accident or serious injury",
                        "Physical or sexual assault",
                        "Natural disaster (flood, earthquake, fire)",
                        "Witnessing a sudden death or serious accident",
                        "Terrorist attack or violent crime",
                        "A serious workplace accident (fall from height, electrocution)",
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm"
                        >
                          <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                          <span className="text-white/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Complex/Repeated */}
                  <div className="bg-violet-500/5 border border-violet-500/20 p-4 rounded-lg">
                    <h4 className="text-violet-300 font-semibold text-sm mb-2">
                      2. Complex / Repeated Trauma
                    </h4>
                    <p className="text-white/70 text-sm mb-2">
                      Prolonged, repeated, or ongoing traumatic experiences,
                      often in situations where the person cannot escape.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        "Domestic violence and coercive control",
                        "Ongoing childhood physical, sexual, or emotional abuse",
                        "Prolonged bullying or harassment (including workplace bullying)",
                        "War, conflict, or captivity",
                        "Human trafficking",
                        "Repeated exposure to dangerous or life-threatening situations",
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm"
                        >
                          <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                          <span className="text-white/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vicarious/Secondary */}
                  <div className="bg-purple-500/5 border border-purple-500/20 p-4 rounded-lg">
                    <h4 className="text-purple-300 font-semibold text-sm mb-2">
                      3. Vicarious / Secondary Trauma
                    </h4>
                    <p className="text-white/70 text-sm mb-2">
                      Trauma experienced indirectly through exposure to
                      others&rsquo; traumatic experiences.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        "Witnessing a colleague\u2019s serious accident on site",
                        "Hearing repeated detailed accounts of traumatic events",
                        "First responders attending scenes of injury or death",
                        "Supporting a traumatised person over a prolonged period",
                        "Viewing distressing footage or images as part of your role",
                        "Mental health professionals absorbing clients\u2019 trauma",
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm"
                        >
                          <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                          <span className="text-white/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Developmental */}
                  <div className="bg-violet-500/5 border border-violet-500/20 p-4 rounded-lg">
                    <h4 className="text-violet-300 font-semibold text-sm mb-2">
                      4. Developmental Trauma
                    </h4>
                    <p className="text-white/70 text-sm mb-2">
                      Adverse experiences during childhood that affect
                      development and have lasting impacts into adulthood.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        "Childhood neglect (physical or emotional)",
                        "Growing up with a parent who has addiction or mental illness",
                        "Parental separation, loss of a caregiver, or being in care",
                        "Household dysfunction (domestic violence, incarceration of a parent)",
                        "Adverse Childhood Experiences (ACEs) — a recognised framework",
                        "Chronic instability, poverty, or lack of a safe home environment",
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm"
                        >
                          <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                          <span className="text-white/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-purple-400">
                  Key Principle: Trauma Is Subjective
                </h3>
                <p className="text-white/80 text-sm">
                  Two people can experience the same event and respond very
                  differently. One may recover quickly while the other develops
                  long-term psychological difficulties. Factors that influence
                  this include: previous trauma history, childhood experiences,
                  existing mental health conditions, availability of social
                  support, personality and coping style, and the nature and
                  duration of the event. Never judge another person&rsquo;s
                  response to trauma &mdash; &ldquo;I would have been fine
                  after that&rdquo; is never a helpful or accurate statement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 02 — Post-Traumatic Stress Disorder (PTSD)       */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[1]} text-sm font-normal`}>02</span>
            Post-Traumatic Stress Disorder (PTSD)
          </h2>
          <div className={`border-l-2 ${borderColours[1]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Post-Traumatic Stress Disorder (PTSD) is a mental health
                condition that can develop after experiencing or witnessing a
                traumatic event. It is classified in the ICD-11 (International
                Classification of Diseases, 11th Revision) and is characterised
                by symptoms that persist for more than one month after the
                trauma, causing significant distress or impairment in
                functioning.
              </p>

              <p>
                PTSD is not a sign of weakness. It is a recognised psychiatric
                condition with a clear neurobiological basis &mdash; the
                brain&rsquo;s threat-detection system becomes dysregulated,
                causing the person to remain in a state of heightened alertness
                long after the danger has passed. The traumatic memory becomes
                &ldquo;stuck&rdquo; and is not processed in the way that normal
                memories are, which is why the person re-experiences the event
                as though it is happening in the present.
              </p>

              {/* PTSD 4-Cluster Diagram */}
              <div className="bg-white/5 border border-violet-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[1]} font-medium mb-4 text-center`}>
                  The Four Symptom Clusters of PTSD (ICD-11)
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Cluster 1: Re-experiencing */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                        <span className="text-red-400 text-xs font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="text-red-300 font-semibold text-sm">
                          Re-experiencing
                        </h4>
                        <span className="text-red-400/70 text-xs">
                          Reliving the trauma involuntarily
                        </span>
                      </div>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Flashbacks</strong>{" "}
                          &mdash; vivid, involuntary reliving of the event as
                          though it is happening now, including sensory
                          components (sights, sounds, smells, physical
                          sensations)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Nightmares</strong>{" "}
                          &mdash; distressing dreams about the trauma or
                          related themes, often causing the person to wake in
                          a state of panic
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Intrusive memories
                          </strong>{" "}
                          &mdash; unwanted, distressing images or thoughts about
                          the event that intrude without warning
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Physical reactions to reminders
                          </strong>{" "}
                          &mdash; heart racing, sweating, nausea, trembling
                          when exposed to triggers
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Cluster 2: Avoidance */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                        <span className="text-blue-400 text-xs font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="text-blue-300 font-semibold text-sm">
                          Avoidance
                        </h4>
                        <span className="text-blue-400/70 text-xs">
                          Avoiding reminders of the trauma
                        </span>
                      </div>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Avoiding places, people, or activities
                          </strong>{" "}
                          &mdash; that are reminders of the trauma (e.g.
                          refusing to go near the area where an accident
                          occurred)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Emotional numbing
                          </strong>{" "}
                          &mdash; feeling emotionally flat, unable to
                          experience positive emotions, feeling detached from
                          others
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Avoiding thoughts or conversations
                          </strong>{" "}
                          &mdash; about the event, refusing to discuss it,
                          changing the subject, &ldquo;I don&rsquo;t want to
                          talk about it&rdquo;
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Withdrawal from activities
                          </strong>{" "}
                          &mdash; loss of interest in things previously
                          enjoyed, social withdrawal, isolation
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Cluster 3: Hyperarousal */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                        <span className="text-amber-400 text-xs font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="text-amber-300 font-semibold text-sm">
                          Hyperarousal
                        </h4>
                        <span className="text-amber-400/70 text-xs">
                          Constantly &ldquo;on edge&rdquo;
                        </span>
                      </div>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Hypervigilance
                          </strong>{" "}
                          &mdash; constantly scanning the environment for
                          danger, unable to relax, always on guard
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Exaggerated startle response
                          </strong>{" "}
                          &mdash; jumping at loud noises or unexpected
                          movements, disproportionate to the actual threat
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Insomnia</strong>{" "}
                          &mdash; difficulty falling or staying asleep, waking
                          early, poor sleep quality
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Irritability and anger
                          </strong>{" "}
                          &mdash; short temper, angry outbursts, difficulty
                          concentrating, reckless or self-destructive
                          behaviour
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Cluster 4: Negative Cognitions and Mood */}
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                        <span className="text-purple-400 text-xs font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="text-purple-300 font-semibold text-sm">
                          Negative Cognitions &amp; Mood
                        </h4>
                        <span className="text-purple-400/70 text-xs">
                          Distorted thoughts and persistent low mood
                        </span>
                      </div>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Guilt and shame
                          </strong>{" "}
                          &mdash; persistent feelings of guilt about what
                          happened, &ldquo;It was my fault&rdquo;,
                          survivor&rsquo;s guilt
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Distorted blame
                          </strong>{" "}
                          &mdash; blaming oneself or others disproportionately
                          for the traumatic event
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Negative beliefs
                          </strong>{" "}
                          &mdash; &ldquo;The world is completely
                          dangerous&rdquo;, &ldquo;I am permanently
                          broken&rdquo;, &ldquo;Nobody can be trusted&rdquo;
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Detachment and estrangement
                          </strong>{" "}
                          &mdash; feeling disconnected from others, emotionally
                          distant from family and friends, loss of interest in
                          previously enjoyed activities
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-violet-400">
                  Diagnosis: When Is It PTSD?
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  A normal stress reaction after a traumatic event may include
                  many of the symptoms described above. The distinction between
                  a normal reaction and PTSD depends on:
                </p>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold flex-shrink-0 mt-0.5">
                      &bull;
                    </span>
                    <span>
                      <strong className="text-white">Duration:</strong>{" "}
                      Symptoms persist for more than one month after the trauma
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold flex-shrink-0 mt-0.5">
                      &bull;
                    </span>
                    <span>
                      <strong className="text-white">Severity:</strong>{" "}
                      Symptoms cause significant distress or impairment in
                      daily functioning (work, relationships, self-care)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold flex-shrink-0 mt-0.5">
                      &bull;
                    </span>
                    <span>
                      <strong className="text-white">
                        All four clusters:
                      </strong>{" "}
                      Symptoms from each of the four clusters must be present
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold flex-shrink-0 mt-0.5">
                      &bull;
                    </span>
                    <span>
                      <strong className="text-white">Not improving:</strong>{" "}
                      Symptoms are not resolving naturally with time and are
                      not getting better
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* -------------------------------------------------------- */}
        {/* SECTION 03 — Complex PTSD                                */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[2]} text-sm font-normal`}>03</span>
            Complex PTSD
          </h2>
          <div className={`border-l-2 ${borderColours[2]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Complex PTSD (C-PTSD) is a relatively new diagnosis, formally
                recognised in the ICD-11 for the first time. It describes a
                condition that develops following exposure to prolonged,
                repeated, or inescapable traumatic experiences &mdash;
                typically situations where the person had little or no chance
                of escape, such as ongoing domestic violence, childhood abuse,
                torture, slavery, or prolonged war.
              </p>

              <p>
                Complex PTSD includes all the core symptoms of standard PTSD
                (re-experiencing, avoidance, hyperarousal, negative cognitions
                and mood) plus three additional features known as
                &ldquo;disturbances in self-organisation&rdquo;.
              </p>

              <div className="space-y-4">
                {/* Feature 1: Emotional Dysregulation */}
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                      <span className="text-purple-400 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-purple-300 font-semibold text-sm">
                        Emotional Dysregulation
                      </h4>
                    </div>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Extreme difficulty managing emotions &mdash; reactions
                        that seem disproportionate to the situation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Explosive anger, rage, or violent outbursts that appear
                        to come from nowhere
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Alternatively, complete emotional shutdown &mdash;
                        feeling nothing at all, dissociating from emotions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Rapid switching between emotional extremes &mdash;
                        intense distress one moment, numbness the next
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Feature 2: Negative Self-Concept */}
                <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center">
                      <span className="text-violet-400 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-violet-300 font-semibold text-sm">
                        Negative Self-Concept
                      </h4>
                    </div>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        Persistent feelings of worthlessness &mdash; &ldquo;I
                        am broken&rdquo;, &ldquo;I am damaged goods&rdquo;,
                        &ldquo;I deserved what happened to me&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        Deep, pervasive shame that goes beyond guilt about a
                        specific event &mdash; a sense that the self is
                        fundamentally flawed
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        Feeling permanently defeated, diminished, or empty
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Feature 3: Relationship Difficulties */}
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                      <span className="text-purple-400 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-purple-300 font-semibold text-sm">
                        Disturbances in Relationships
                      </h4>
                    </div>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Profound difficulty trusting others &mdash; expecting
                        betrayal, constantly testing relationships
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Feeling detached from other people &mdash; difficulty
                        feeling close to anyone, emotional distance
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Pattern of unstable, conflictual, or abusive
                        relationships &mdash; sometimes repeating patterns from
                        the original trauma
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-300">
                    Important: Overlap with Personality Disorder
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Many of the features of Complex PTSD &mdash; particularly
                  emotional dysregulation, unstable relationships, and
                  distorted self-image &mdash; overlap significantly with
                  Emotionally Unstable Personality Disorder (EUPD), also known
                  as Borderline Personality Disorder (BPD). There is growing
                  recognition that many people diagnosed with EUPD/BPD have
                  actually experienced complex childhood trauma, and their
                  symptoms may be better understood as Complex PTSD. This
                  distinction matters because it shifts the question from
                  &ldquo;What is wrong with this person?&rdquo; to
                  &ldquo;What happened to this person?&rdquo; &mdash; a
                  fundamental principle of trauma-informed care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 04 — Trauma in Construction                      */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[3]} text-sm font-normal`}>04</span>
            Trauma in Construction
          </h2>
          <div className={`border-l-2 ${borderColours[3]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The construction industry has one of the highest rates of
                serious injury and fatality of any sector in the UK. Workers
                are regularly exposed to dangerous and potentially traumatic
                situations. Beyond the immediate physical risks, the
                psychological impact of witnessing serious accidents, injuries,
                and deaths on site is significant and often overlooked.
              </p>

              <div className="bg-white/5 border border-violet-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[3]} font-medium mb-3`}>
                  <div className="flex items-center gap-2">
                    <HardHat className="h-5 w-5 text-violet-400" />
                    Potentially Traumatic Experiences on Site
                  </div>
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Witnessing a fatal or serious fall from height",
                    "Electrocution incidents \u2014 witnessing or responding to",
                    "Structural collapses (scaffolding, trenches, buildings)",
                    "Crush injuries from plant, machinery, or falling objects",
                    "Deaths on site \u2014 including finding a deceased colleague",
                    "Being a first responder to a serious accident",
                    "Near-miss incidents where the worker narrowly avoided death or serious injury",
                    "Cumulative exposure \u2014 witnessing multiple incidents over a career",
                    "Suicide of a colleague \u2014 particularly common in construction",
                    "Road traffic incidents involving site vehicles or plant",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                      <span className="text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  Why Construction Workers Are Particularly Vulnerable
                </h3>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      1
                    </span>
                    <span>
                      <strong>High-risk environment:</strong> Construction has
                      among the highest rates of fatal and serious injury of any
                      UK sector. Workers are more likely to witness traumatic
                      events than in most other occupations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      2
                    </span>
                    <span>
                      <strong>Cumulative exposure:</strong> Over a 30-40 year
                      career, a construction worker may witness numerous
                      serious incidents. Each exposure adds to the
                      psychological burden, even if individual events seem
                      manageable at the time
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      3
                    </span>
                    <span>
                      <strong>Culture of toughness:</strong> The construction
                      industry has historically had a &ldquo;man up&rdquo;,
                      &ldquo;get on with it&rdquo; culture that actively
                      discourages discussing emotions or seeking help for
                      mental health difficulties
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      4
                    </span>
                    <span>
                      <strong>Male-dominated workforce:</strong> Men are
                      statistically less likely to seek help for mental health
                      problems. Construction is approximately 87% male in the
                      UK
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      5
                    </span>
                    <span>
                      <strong>Self-employment and job insecurity:</strong> Many
                      construction workers are self-employed or on short-term
                      contracts. Taking time off for mental health risks loss of
                      income, and there may be no occupational health support
                      or Employee Assistance Programme
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      6
                    </span>
                    <span>
                      <strong>Transient workforce:</strong> Workers move between
                      sites and employers frequently, making it difficult to
                      build supportive relationships or access consistent
                      mental health support
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      7
                    </span>
                    <span>
                      <strong>Fear of career consequences:</strong> Workers may
                      fear that disclosing mental health difficulties will
                      result in losing their CSCS card, being deemed unfit to
                      work, or being passed over for future contracts
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    The Statistics
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Construction workers in the UK are approximately two to three
                  times more likely to take their own life than the average
                  male worker. Unrecognised and untreated trauma is a
                  significant contributing factor. The Mates in Mind charity
                  and the Lighthouse Construction Industry Charity provide
                  specific support for construction workers&rsquo; mental
                  health. The Construction Industry Helpline is{" "}
                  <strong className="text-white">0345 605 1956</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* -------------------------------------------------------- */}
        {/* SECTION 05 — Trauma-Informed Approach                    */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[4]} text-sm font-normal`}>05</span>
            Trauma-Informed Approach
          </h2>
          <div className={`border-l-2 ${borderColours[4]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A trauma-informed approach means understanding that many people
                have experienced trauma, and that their behaviour, reactions,
                and difficulties may be shaped by those experiences. Rather than
                asking &ldquo;What is wrong with you?&rdquo;, a
                trauma-informed approach asks &ldquo;What happened to
                you?&rdquo;. It shifts the focus from blame to understanding,
                and from judgement to compassion.
              </p>

              <p>
                As a Mental Health First Aider, you do not need to be a trauma
                therapist. But understanding trauma-informed principles will
                help you provide more effective, sensitive, and safe initial
                support to anyone who may be affected by traumatic experiences.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[4]} font-medium mb-4`}>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    The Five Principles of Trauma-Informed Care
                  </div>
                </h3>
                <div className="space-y-4">
                  {/* Principle 1: Safety */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                        <span className="text-green-400 text-xs font-bold">
                          1
                        </span>
                      </div>
                      <h4 className="text-green-300 font-semibold text-sm">
                        Safety
                      </h4>
                    </div>
                    <p className="text-white/70 text-sm mb-2">
                      Ensuring physical and emotional safety for the person.
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          Find a private, quiet space for the conversation
                          &mdash; not in front of the whole crew
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          Ensure they feel physically safe &mdash; away from
                          immediate dangers, in a comfortable environment
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>
                          Create emotional safety &mdash; non-judgemental body
                          language, calm tone of voice, reassurance that they
                          will not be judged
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Principle 2: Trustworthiness */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                        <span className="text-blue-400 text-xs font-bold">
                          2
                        </span>
                      </div>
                      <h4 className="text-blue-300 font-semibold text-sm">
                        Trustworthiness
                      </h4>
                    </div>
                    <p className="text-white/70 text-sm mb-2">
                      Being transparent, consistent, and reliable.
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          Be honest about what you can and cannot do &mdash;
                          &ldquo;I&rsquo;m not a counsellor, but I&rsquo;m here
                          to listen and help you find support&rdquo;
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          Be clear about confidentiality and its limits &mdash;
                          explain what you will and will not share with others
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>
                          Follow through on commitments &mdash; if you say
                          you will check in with them tomorrow, do it
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Principle 3: Choice */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                        <span className="text-amber-400 text-xs font-bold">
                          3
                        </span>
                      </div>
                      <h4 className="text-amber-300 font-semibold text-sm">
                        Choice
                      </h4>
                    </div>
                    <p className="text-white/70 text-sm mb-2">
                      Giving the person options and restoring their sense of
                      control.
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Offer options rather than directing &mdash;
                          &ldquo;Would you like me to sit with you, or would
                          you prefer some space?&rdquo;
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Let them decide what they want to share and what they
                          do not &mdash; do not pressure for details
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>
                          Trauma involves loss of control &mdash; restoring
                          choice helps counter the powerlessness of the
                          traumatic experience
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Principle 4: Collaboration */}
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                        <span className="text-purple-400 text-xs font-bold">
                          4
                        </span>
                      </div>
                      <h4 className="text-purple-300 font-semibold text-sm">
                        Collaboration
                      </h4>
                    </div>
                    <p className="text-white/70 text-sm mb-2">
                      Working alongside the person, not doing things to them.
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          Ask what they need rather than assuming &mdash;
                          &ldquo;What would be most helpful for you right
                          now?&rdquo;
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          Make decisions together &mdash; &ldquo;Shall we look
                          at some options for support together?&rdquo;
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>
                          Avoid taking over or making decisions on their behalf
                          &mdash; you are a partner in support, not an
                          authority figure
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Principle 5: Empowerment */}
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center">
                        <span className="text-violet-400 text-xs font-bold">
                          5
                        </span>
                      </div>
                      <h4 className="text-violet-300 font-semibold text-sm">
                        Empowerment
                      </h4>
                    </div>
                    <p className="text-white/70 text-sm mb-2">
                      Supporting the person&rsquo;s strengths, resilience, and
                      ability to recover.
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Acknowledge their courage in talking about it &mdash;
                          &ldquo;It took real strength to tell me about
                          this&rdquo;
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Focus on what they can do, not what they cannot
                          &mdash; highlight their existing coping strategies
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>
                          Support their belief in recovery &mdash; &ldquo;PTSD
                          is treatable, and many people recover fully with the
                          right support&rdquo;
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  Avoiding Re-Traumatisation
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Re-traumatisation occurs when a person is exposed to
                  situations, interactions, or environments that replicate
                  aspects of their original trauma. As an MHFA, you must take
                  care to avoid this:
                </p>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">
                        &times;
                      </span>
                    </div>
                    <div>
                      <strong>Do NOT press for details</strong> about the
                      trauma &mdash; &ldquo;What exactly happened?&rdquo;,
                      &ldquo;Tell me everything&rdquo;. Let them share at
                      their own pace
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">
                        &times;
                      </span>
                    </div>
                    <div>
                      <strong>Do NOT minimise or dismiss</strong> their
                      experience &mdash; &ldquo;It could have been
                      worse&rdquo;, &ldquo;At least you survived&rdquo;,
                      &ldquo;You need to move on&rdquo;
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">
                        &times;
                      </span>
                    </div>
                    <div>
                      <strong>Do NOT take away their control</strong> &mdash;
                      making decisions without their consent, sharing their
                      disclosure without permission, or forcing them into
                      action they are not ready for
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">
                        &times;
                      </span>
                    </div>
                    <div>
                      <strong>Do NOT use authority or power dynamics</strong>{" "}
                      &mdash; be mindful that trauma often involves a power
                      imbalance. If you are their supervisor or manager, be
                      especially aware of how the power dynamic may affect
                      their willingness to be honest
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 06 — Treatment and Support                       */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[5]} text-sm font-normal`}>06</span>
            Treatment and Support
          </h2>
          <div className={`border-l-2 ${borderColours[5]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                PTSD is a treatable condition. With the right support, many
                people recover fully or learn to manage their symptoms
                effectively. NICE (the National Institute for Health and Care
                Excellence) provides evidence-based guidelines for the treatment
                of PTSD. As a Mental Health First Aider, understanding the
                available treatments helps you signpost accurately and give
                people realistic hope.
              </p>

              {/* TF-CBT */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <h3 className="text-purple-300 font-semibold text-base">
                    Trauma-Focused CBT (TF-CBT)
                  </h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                    NICE Recommended
                  </span>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  A specialised form of Cognitive Behavioural Therapy
                  specifically designed for trauma. It is one of the two
                  first-line treatments recommended by NICE for PTSD.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Typically 8&ndash;12 sessions with a trained therapist
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Involves processing the traumatic memory in a safe,
                      controlled therapeutic environment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Identifies and challenges unhelpful thought patterns
                      related to the trauma (e.g. &ldquo;It was my
                      fault&rdquo;, &ldquo;The world is completely
                      unsafe&rdquo;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Develops healthier coping strategies and helps the person
                      integrate the traumatic experience into their wider life
                      narrative
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Strong evidence base with high rates of recovery
                    </span>
                  </li>
                </ul>
              </div>

              {/* EMDR */}
              <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-violet-400" />
                  <h3 className="text-violet-300 font-semibold text-base">
                    EMDR (Eye Movement Desensitisation and Reprocessing)
                  </h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                    NICE Recommended
                  </span>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  A specialised psychotherapy developed by Francine Shapiro in
                  1987 that uses bilateral stimulation to help the brain
                  reprocess traumatic memories. It is the second first-line
                  treatment recommended by NICE.
                </p>

                <div className="bg-white/5 border border-violet-400/20 p-3 rounded-lg mb-3">
                  <h4 className="text-violet-300 font-medium text-sm mb-2">
                    How EMDR Works (Simplified)
                  </h4>
                  <ul className="text-white space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                        1
                      </span>
                      <span>
                        <strong>Preparation:</strong> The therapist establishes
                        safety and teaches the client techniques for managing
                        distress before processing begins
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                        2
                      </span>
                      <span>
                        <strong>Target identification:</strong> The client
                        identifies a specific traumatic memory, along with the
                        associated image, negative belief, emotions, and body
                        sensations
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                        3
                      </span>
                      <span>
                        <strong>Bilateral stimulation:</strong> While holding
                        the traumatic memory in mind, the client follows the
                        therapist&rsquo;s hand movements with their eyes
                        (side-to-side), or receives alternating taps or sounds
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                        4
                      </span>
                      <span>
                        <strong>Reprocessing:</strong> The bilateral stimulation
                        is thought to engage both hemispheres of the brain,
                        helping to &ldquo;unstick&rdquo; the traumatic memory
                        and process it properly &mdash; moving it from a
                        present-tense, sensory experience to a past-tense
                        narrative memory
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-violet-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                        5
                      </span>
                      <span>
                        <strong>Integration:</strong> The distressing memory
                        loses its emotional charge. The person can recall the
                        event without being overwhelmed by it &mdash; it
                        becomes a memory of something that happened in the
                        past, not something happening now
                      </span>
                    </li>
                  </ul>
                </div>

                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Does not require the person to talk in detail about the
                      trauma &mdash; particularly suitable for people who find
                      it difficult to verbalise their experiences
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Typically requires fewer sessions than TF-CBT
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Must only be delivered by an accredited EMDR therapist
                    </span>
                  </li>
                </ul>
              </div>

              {/* NICE Guidelines Summary */}
              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  NICE Guidelines for PTSD &mdash; Key Points
                </h3>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      1
                    </span>
                    <span>
                      <strong>First-line treatment:</strong> Trauma-focused CBT
                      or EMDR should be offered to all adults with a diagnosis
                      of PTSD, regardless of the time since the traumatic event
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      2
                    </span>
                    <span>
                      <strong>Do NOT offer single-session debriefing:</strong>{" "}
                      NICE specifically recommends against single-session
                      psychological debriefing immediately after a traumatic
                      event, as evidence shows it does not prevent PTSD and may
                      cause harm
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      3
                    </span>
                    <span>
                      <strong>Watchful waiting:</strong> For symptoms lasting
                      less than four weeks that are mild and improving,
                      &ldquo;watchful waiting&rdquo; with a follow-up
                      appointment within one month may be appropriate
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      4
                    </span>
                    <span>
                      <strong>Medication:</strong> Antidepressants (usually
                      SSRIs such as sertraline or paroxetine) may be considered
                      if the person declines psychological therapy, or as an
                      adjunct to therapy in severe cases
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      5
                    </span>
                    <span>
                      <strong>Referral pathway:</strong> GP &rarr; IAPT (NHS
                      Talking Therapies) or direct referral to a specialist
                      trauma service. Self-referral to IAPT is also available
                      in most areas
                    </span>
                  </li>
                </ul>
              </div>

              {/* When to Refer */}
              <div className="bg-white/5 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="text-violet-300 font-medium mb-3">
                  When to Refer for Professional Help
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Encourage the person to seek professional support in any of
                  the following circumstances:
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Symptoms persisting beyond four weeks after the traumatic event",
                    "Symptoms worsening over time rather than improving",
                    "Significant impact on daily functioning \u2014 work, relationships, self-care",
                    "Flashbacks, nightmares, or hyperarousal that are frequent or severe",
                    "Using alcohol or drugs to cope with the symptoms",
                    "Suicidal thoughts or self-harm \u2014 this is urgent and may require immediate help",
                    "The person expresses a desire for professional help",
                    "Avoidance that is significantly restricting their life \u2014 unable to work, leave the house, etc.",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                      <span className="text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Role of the MHFA */}
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <Heart className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-purple-300">
                    The Role of the MHFA &mdash; What You Do and Do Not Do
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* DO */}
                  <div className="bg-green-500/5 border border-green-500/20 p-3 rounded-lg">
                    <h4 className="text-green-300 font-semibold text-sm mb-2">
                      You DO:
                    </h4>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      {[
                        "Listen without judgement",
                        "Validate their feelings and experience",
                        "Apply trauma-informed principles",
                        "Offer practical, immediate support",
                        "Signpost to professional help (GP, EAP, helplines)",
                        "Check in with them afterwards",
                        "Look after your own wellbeing too",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* DO NOT */}
                  <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-lg">
                    <h4 className="text-red-300 font-semibold text-sm mb-2">
                      You Do NOT:
                    </h4>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      {[
                        "Diagnose PTSD or any other condition",
                        "Provide therapy or counselling",
                        "Use therapeutic techniques (EMDR, exposure therapy)",
                        "Pressure someone to relive their trauma in detail",
                        "Share their disclosure without consent",
                        "Promise confidentiality you cannot guarantee",
                        "Take on the role of their ongoing therapist",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Key Support Services */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">
                  Key Support Services
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3 text-white/80">
                    <span className="text-purple-400 font-semibold flex-shrink-0 min-w-[160px]">
                      Samaritans
                    </span>
                    <span>
                      <strong className="text-white">116 123</strong> &mdash;
                      free, 24/7, for anyone in distress
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-white/80">
                    <span className="text-purple-400 font-semibold flex-shrink-0 min-w-[160px]">
                      Construction Helpline
                    </span>
                    <span>
                      <strong className="text-white">0345 605 1956</strong>{" "}
                      &mdash; Lighthouse Club, construction-specific support
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-white/80">
                    <span className="text-purple-400 font-semibold flex-shrink-0 min-w-[160px]">
                      Mind
                    </span>
                    <span>
                      <strong className="text-white">0300 123 3393</strong>{" "}
                      &mdash; mental health information and support
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-white/80">
                    <span className="text-purple-400 font-semibold flex-shrink-0 min-w-[160px]">
                      Mates in Mind
                    </span>
                    <span>
                      Construction industry mental health charity &mdash;
                      training, resources, and campaigns
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-white/80">
                    <span className="text-purple-400 font-semibold flex-shrink-0 min-w-[160px]">
                      NHS Talking Therapies
                    </span>
                    <span>
                      Self-referral available in most areas &mdash; free NHS
                      psychological therapy including trauma-focused CBT
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-white/80">
                    <span className="text-purple-400 font-semibold flex-shrink-0 min-w-[160px]">
                      GP
                    </span>
                    <span>
                      The first point of contact for a referral to specialist
                      trauma services or EMDR therapy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 06 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* -------------------------------------------------------- */}
        {/* FAQs                                                      */}
        {/* -------------------------------------------------------- */}
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

        {/* -------------------------------------------------------- */}
        {/* Quiz                                                      */}
        {/* -------------------------------------------------------- */}
        <Quiz
          title="Trauma, PTSD & Adverse Experiences Quiz"
          questions={quizQuestions}
        />

        {/* -------------------------------------------------------- */}
        {/* Navigation                                                */}
        {/* -------------------------------------------------------- */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-purple-500 text-white hover:bg-purple-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-5">
              Next: Module 5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MentalHealthModule4Section4;
