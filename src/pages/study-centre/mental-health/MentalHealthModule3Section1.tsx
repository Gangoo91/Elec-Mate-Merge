import {
  ArrowLeft,
  Wine,
  CheckCircle,
  AlertTriangle,
  Shield,
  Heart,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-m3s1-alcohol-units",
    question:
      "A colleague tells you they drink a bottle of wine (750ml, 12% ABV) every evening after work but insists it is 'only one drink'. How many UK alcohol units does this bottle actually contain?",
    options: [
      "1 unit — it is only one drink",
      "About 5 units — roughly three times the daily guideline",
      "About 9 units — more than half the recommended weekly limit in a single sitting",
      "14 units — the entire recommended weekly limit",
    ],
    correctIndex: 2,
    explanation:
      "A standard 750ml bottle of 12% wine contains approximately 9 units of alcohol. The UK Chief Medical Officers' guideline is no more than 14 units per week, spread over 3 or more days. Drinking 9 units in a single evening is binge drinking and exceeds the informal daily guideline of around 3 units. One bottle every evening would amount to approximately 63 units per week — more than four times the recommended maximum.",
  },
  {
    id: "mh-m3s1-dual-diagnosis",
    question:
      "A worker who has been diagnosed with depression has also been drinking heavily for several months. Their GP says they have a 'dual diagnosis'. What does this term mean?",
    options: [
      "They have two separate physical health conditions that need treatment",
      "They have a mental health condition and a substance misuse problem occurring at the same time",
      "They have been diagnosed by two different doctors with the same condition",
      "They have a substance misuse problem that has caused two different physical health issues",
    ],
    correctIndex: 1,
    explanation:
      "Dual diagnosis (also called co-occurring disorders or comorbidity) means that a person has both a mental health condition and a substance misuse problem at the same time. The relationship is often bidirectional — the mental health condition may drive the substance misuse (self-medication), or the substance misuse may cause or worsen the mental health condition. Dual diagnosis is harder to treat because both conditions interact and must be addressed together through an integrated treatment approach.",
  },
  {
    id: "mh-m3s1-approaching",
    question:
      "You are concerned that a colleague on your construction site may be misusing substances. Using the ALGEE framework, what should your first step be?",
    options: [
      "Give information — hand them a leaflet about drug and alcohol services",
      "Encourage professional help — tell them to see their GP immediately",
      "Approach, assess, and assist — find a private moment, express your concern without judgement, and listen non-judgementally",
      "Report them to the site manager for a drug test",
    ],
    correctIndex: 2,
    explanation:
      "The ALGEE framework begins with 'A' — Approach, assess, and assist with any crisis. This means finding a private, calm moment to talk to the person, expressing genuine concern without judgement or accusation, and listening to what they have to say. Starting with information-giving or demands to seek help can feel confrontational and is likely to make the person defensive. As an MHFA, your role is to open a supportive conversation first, not to diagnose, discipline, or force treatment.",
  },
];

const faqs = [
  {
    question:
      "Is alcoholism a disease or a choice?",
    answer:
      "Current medical understanding recognises alcohol dependency as a chronic, relapsing condition with a strong neurobiological basis. While the initial decision to drink is voluntary, repeated alcohol use changes brain chemistry — particularly the dopamine reward system and the prefrontal cortex (responsible for decision-making and impulse control). Over time, the brain adapts to expect alcohol, and the person experiences physical and psychological withdrawal symptoms without it. This is why willpower alone is often insufficient to overcome dependency. The World Health Organisation, the NHS, and the Royal College of Psychiatrists all classify alcohol use disorder as a medical condition that requires treatment, not simply a lifestyle choice.",
  },
  {
    question:
      "What is the difference between a substance misuse policy and a zero-tolerance policy on a construction site?",
    answer:
      "A substance misuse policy takes a broader, more supportive approach: it outlines what substances are prohibited on site, describes the consequences of misuse, but also includes pathways for support such as occupational health referrals, employee assistance programmes (EAPs), and return-to-work arrangements after treatment. A zero-tolerance policy typically states that any detection of drugs or alcohol on site results in immediate removal and potentially dismissal, with limited or no support pathways. Most modern construction industry guidance (including from Build UK and the Considerate Constructors Scheme) recommends a balanced approach that combines clear safety standards with access to support, recognising that punitive-only approaches often drive substance misuse underground rather than addressing it.",
  },
  {
    question:
      "Can you become addicted to prescription medication?",
    answer:
      "Yes, absolutely. Prescription medication addiction (particularly to opioid painkillers such as codeine, tramadol, and morphine, and to benzodiazepines such as diazepam) is a significant and growing problem in the UK. These medications can cause physical dependency when used for extended periods, even when taken as prescribed. The risk increases when medication is taken at higher doses than prescribed, for longer than recommended, or for a purpose other than its original prescription (such as managing emotional distress rather than physical pain). In the construction industry, prescription opioid misuse is particularly relevant because many workers receive these medications for musculoskeletal injuries and chronic pain. If you suspect someone is misusing prescription medication, encourage them to speak to their GP — dose reduction and alternative pain management strategies are available.",
  },
  {
    question:
      "What should I do if I find drugs on a construction site?",
    answer:
      "If you find drugs or drug paraphernalia on a construction site, do not handle the items. Report the find immediately to your site manager or supervisor, who will follow the site's substance misuse policy. Most policies require the area to be secured and the items to be handled in accordance with guidance — some sites may involve the police, particularly if the substances are Class A drugs. Do not attempt to identify or test unknown substances yourself. If you suspect a specific individual, do not confront them directly about the find — this is a management responsibility. Your role as a colleague or MHFA is to express concern for the person's wellbeing through a private, supportive conversation, not to act as an investigator or enforcer.",
  },
  {
    question:
      "How do I know if someone is self-medicating with alcohol or drugs?",
    answer:
      "Self-medication refers to using substances to manage emotional pain, stress, anxiety, depression, or trauma symptoms without medical supervision. Signs that someone may be self-medicating include: they drink or use drugs specifically in response to stress, difficult emotions, or triggering events; their substance use has increased noticeably following a life event such as bereavement, relationship breakdown, or work problems; they describe alcohol or drugs as helping them 'cope', 'switch off', or 'sleep'; they become anxious or irritable when they cannot access their substance of choice; and their substance use is solitary rather than social. If you suspect self-medication, this is an opportunity for a compassionate conversation — 'I've noticed you seem to be going through a tough time. How are you doing?' The goal is to help them recognise the pattern and consider professional support.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "According to UK Chief Medical Officers' guidelines, what is the recommended maximum weekly alcohol intake for adults?",
    options: [
      "21 units per week for men, 14 units for women",
      "14 units per week for both men and women, spread over 3 or more days",
      "28 units per week, with at least 2 alcohol-free days",
      "There is no recommended limit — it depends on body weight",
    ],
    correctAnswer: 1,
    explanation:
      "The UK Chief Medical Officers' low-risk drinking guidelines (updated in 2016) recommend that both men and women drink no more than 14 units of alcohol per week, spread evenly over 3 or more days, with several alcohol-free days each week. This replaced the previous guidelines that set different limits for men (21 units) and women (14 units). The guidelines also state that there is no 'safe' level of alcohol consumption — the 14-unit limit represents a low risk, not no risk.",
  },
  {
    id: 2,
    question:
      "What constitutes binge drinking in the UK?",
    options: [
      "Drinking any alcohol on a weeknight",
      "Drinking more than 14 units in a week",
      "Drinking 6 or more units in a single session for women, or 8 or more units for men",
      "Drinking every day for a week",
    ],
    correctAnswer: 2,
    explanation:
      "The NHS defines binge drinking as consuming 6 or more units of alcohol in a single session for women, or 8 or more units for men. To put this in context, 8 units is roughly equivalent to 3 pints of 4% beer or 1 bottle of 13% wine. Binge drinking significantly increases the risk of accidents, injuries, alcohol poisoning, and risky behaviour — all of which have serious implications on construction sites where safety-critical work is being carried out.",
  },
  {
    id: 3,
    question:
      "Which of the following is a sign that a colleague may be misusing substances at work?",
    options: [
      "They consistently arrive early and volunteer for overtime",
      "Increased absenteeism, erratic behaviour, unexplained accidents, mood swings, and declining work quality",
      "They have recently changed their diet and started exercising",
      "They prefer to work alone rather than in a team",
    ],
    correctAnswer: 1,
    explanation:
      "Workplace signs of substance misuse include: increased or unexplained absenteeism (particularly on Mondays or after paydays), arriving late or leaving early, erratic or unpredictable behaviour, mood swings, unexplained accidents or near-misses, declining quality of work, poor concentration, changes in appearance or hygiene, social withdrawal from colleagues, and financial difficulties. No single sign confirms substance misuse, but a pattern of these behaviours should prompt concern and a supportive conversation.",
  },
  {
    id: 4,
    question:
      "What does the term 'dual diagnosis' mean in the context of mental health?",
    options: [
      "Having two different physical health conditions",
      "Being diagnosed with a mental health condition by two different doctors",
      "Having a mental health condition and a substance misuse problem occurring together",
      "Taking two different types of medication for the same condition",
    ],
    correctAnswer: 2,
    explanation:
      "Dual diagnosis refers to the co-occurrence of a mental health condition (such as depression, anxiety, PTSD, or psychosis) and a substance misuse problem. The relationship between the two is often bidirectional: mental health problems may lead to substance misuse through self-medication, and substance misuse can cause or worsen mental health conditions. Dual diagnosis is harder to treat because both conditions interact and reinforce each other, requiring an integrated treatment approach that addresses both simultaneously.",
  },
  {
    id: 5,
    question:
      "Why is substance misuse considered a particularly serious safety issue on construction sites?",
    options: [
      "Because it is illegal to drink alcohol in any workplace",
      "Because construction sites are safety-critical environments where impaired judgement, coordination, and reaction time can lead to fatal accidents",
      "Because substance misuse always leads to violence in the workplace",
      "Because insurance companies require all construction workers to be teetotal",
    ],
    correctAnswer: 1,
    explanation:
      "Construction sites are safety-critical environments where workers operate heavy machinery, work at height, handle hazardous materials, and carry out tasks requiring precise coordination and concentration. Alcohol and drugs impair judgement, slow reaction times, reduce coordination, cause drowsiness, and increase risk-taking behaviour. Even residual impairment from the night before (the 'morning after' effect) can be dangerous. A worker operating a crane, working on scaffolding, or carrying out electrical work while impaired poses a risk not only to themselves but to every person on site.",
  },
  {
    id: 6,
    question:
      "In the ALGEE framework, what does the 'L' stand for and why is it important when discussing substance misuse?",
    options: [
      "Learn — you should research the substance before speaking to them",
      "Listen non-judgementally — because people are more likely to open up about substance use if they feel heard rather than judged",
      "Leave — give the person space and do not bring up the topic again",
      "Limit — set clear limits on how much they are allowed to drink",
    ],
    correctAnswer: 1,
    explanation:
      "The 'L' in ALGEE stands for Listen non-judgementally. This is particularly important when discussing substance misuse because people who misuse substances often experience significant shame, stigma, and fear of judgement. If they feel judged, lectured, or criticised, they are likely to become defensive, deny the problem, and disengage from the conversation. By listening without judgement — maintaining open body language, not interrupting, reflecting back what they say, and avoiding moral language — you create a safe space where the person is more likely to be honest about their situation and receptive to suggestions for help.",
  },
  {
    id: 7,
    question:
      "A colleague confides in you that they have been using cocaine regularly to 'get through the day' on site. What is the most appropriate response as an MHFA?",
    options: [
      "Report them immediately to the site manager for disciplinary action",
      "Tell them cocaine is illegal and they could go to prison",
      "Thank them for trusting you, express concern for their wellbeing and safety, listen without judgement, and encourage them to seek professional help such as their GP or the FRANK helpline",
      "Offer to help them find a better dealer with safer products",
    ],
    correctAnswer: 2,
    explanation:
      "As an MHFA, your role is to provide initial support and encourage professional help — not to discipline, diagnose, or judge. The correct approach is to thank the person for their trust, express genuine concern for their health and safety, listen non-judgementally, and gently encourage them to seek professional support. Useful referral options include their GP, the FRANK helpline (0300 123 6600), local drug and alcohol services, and workplace employee assistance programmes. While you should not ignore the safety implications, your primary role in this conversation is to be a supportive bridge to professional help.",
  },
  {
    id: 8,
    question:
      "Which of the following best describes the 'spectrum of substance use'?",
    options: [
      "Everyone who tries a substance becomes addicted immediately",
      "Substance use exists on a spectrum from abstinence through casual/social use, regular use, misuse, dependency, and addiction — with increasing risk at each stage",
      "There are only two categories: you either use substances or you do not",
      "The spectrum only applies to illegal drugs, not alcohol or prescription medication",
    ],
    correctAnswer: 1,
    explanation:
      "Substance use exists on a spectrum, not a binary. At one end is abstinence (no use), then casual or social use (occasional, controlled use with minimal risk), regular use (more frequent but not necessarily problematic), misuse (use that causes harm to health, relationships, or work), dependency (physical or psychological reliance, with withdrawal symptoms), and finally addiction (compulsive use despite serious negative consequences, with loss of control). Understanding this spectrum is important because it shows that substance misuse is progressive — early intervention at the misuse stage can prevent progression to dependency and addiction.",
  },
];

export default function MentalHealthModule3Section1() {
  useSEO({
    title:
      "Substance Misuse & Addiction | Mental Health Module 3.1",
    description:
      "Understanding substance misuse, alcohol and drug misuse in construction, dual diagnosis, the ALGEE framework for approaching someone about substance use, and workplace drug and alcohol policies.",
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
            <Link to="../mental-health-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-400/20 border border-purple-500/30 mb-4">
            <Wine className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 mx-auto">
            <span className="text-purple-400 text-xs font-semibold">
              MODULE 3 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Substance Misuse &amp; Addiction
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the spectrum of substance use, recognising alcohol and
            drug misuse in the workplace, dual diagnosis, and how to approach
            someone about substance use as a Mental Health First Aider
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>UK guidelines:</strong> Max 14 units/week for all
                adults
              </li>
              <li>
                <strong>Dual diagnosis:</strong> Mental health + substance
                misuse together
              </li>
              <li>
                <strong>ALGEE:</strong> Approach, Listen, Give info, Encourage
                help, Encourage self-help
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety-critical:</strong> Impairment on site can be
                fatal
              </li>
              <li>
                <strong>Signs:</strong> Absenteeism, erratic behaviour,
                accidents, mood swings
              </li>
              <li>
                <strong>Your role:</strong> Support &amp; signpost &mdash;
                not discipline or diagnose
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the spectrum of substance use from casual use through to addiction and describe how each stage differs",
              "State the UK alcohol guidelines (14 units/week) and explain what constitutes a unit of alcohol",
              "Recognise the signs of alcohol and drug misuse in the workplace, including construction-specific indicators",
              "Define dual diagnosis and explain the bidirectional relationship between mental health and substance misuse",
              "Apply the ALGEE framework to approach someone about suspected substance misuse in a non-confrontational way",
              "Describe workplace drug and alcohol policies, including the balance between safety enforcement and support",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-purple-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Understanding Substance Misuse */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">01</span>
            Understanding Substance Misuse
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Substance misuse is a major public health issue in the UK and a
                significant concern within the construction industry. To respond
                effectively as a Mental Health First Aider, you need to
                understand the difference between{" "}
                <strong>use</strong>, <strong>misuse</strong>, and{" "}
                <strong>dependency</strong> &mdash; and recognise that substance
                use exists on a <strong>spectrum</strong>, not as a simple
                binary of &ldquo;addicted&rdquo; or &ldquo;not addicted&rdquo;.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Definitions
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                      U
                    </span>
                    <div>
                      <p className="text-sm font-medium text-emerald-400">
                        Substance Use
                      </p>
                      <p className="text-sm text-white/80">
                        The consumption of a substance (alcohol, drugs,
                        prescription medication) in a way that does not
                        necessarily cause harm. Social drinking within
                        guidelines is an example of use without misuse.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">
                      M
                    </span>
                    <div>
                      <p className="text-sm font-medium text-amber-400">
                        Substance Misuse
                      </p>
                      <p className="text-sm text-white/80">
                        The use of a substance in a way that causes harm to the
                        individual or others &mdash; physically, mentally,
                        socially, or legally. This includes binge drinking,
                        using prescription drugs for purposes other than
                        prescribed, or using recreational drugs that impair
                        functioning.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-400 text-xs font-bold flex-shrink-0">
                      D
                    </span>
                    <div>
                      <p className="text-sm font-medium text-red-400">
                        Dependency &amp; Addiction
                      </p>
                      <p className="text-sm text-white/80">
                        A chronic condition where the person has developed a
                        physical or psychological reliance on the substance.
                        They experience withdrawal symptoms without it, have
                        lost control over their use, continue despite serious
                        negative consequences, and prioritise the substance
                        over other aspects of their life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spectrum Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-purple-500/10 border-b border-purple-500/20 px-4 py-2">
                  <p className="text-sm font-semibold text-purple-400">
                    The Spectrum of Substance Use
                  </p>
                </div>
                <div className="p-4 sm:p-6">
                  {/* Arrow bar */}
                  <div className="relative mb-6">
                    <div className="h-3 rounded-full bg-gradient-to-r from-emerald-500/40 via-amber-500/40 via-60% to-red-500/40 border border-white/10" />
                    <div className="absolute -top-0.5 left-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-emerald-300" />
                    <div className="absolute -top-0.5 left-[20%] w-4 h-4 rounded-full bg-emerald-400 border-2 border-emerald-200" />
                    <div className="absolute -top-0.5 left-[40%] w-4 h-4 rounded-full bg-amber-400 border-2 border-amber-200" />
                    <div className="absolute -top-0.5 left-[60%] w-4 h-4 rounded-full bg-orange-500 border-2 border-orange-300" />
                    <div className="absolute -top-0.5 left-[80%] w-4 h-4 rounded-full bg-red-500 border-2 border-red-300" />
                    <div className="absolute -top-0.5 right-0 w-4 h-4 rounded-full bg-red-700 border-2 border-red-400" />
                  </div>

                  {/* Labels */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
                    <div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500 mx-auto mb-1" />
                      <p className="text-[11px] sm:text-xs font-medium text-emerald-400">
                        Abstinence
                      </p>
                      <p className="text-[10px] text-white/40 hidden sm:block">
                        No use
                      </p>
                    </div>
                    <div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400 mx-auto mb-1" />
                      <p className="text-[11px] sm:text-xs font-medium text-emerald-300">
                        Casual Use
                      </p>
                      <p className="text-[10px] text-white/40 hidden sm:block">
                        Social, occasional
                      </p>
                    </div>
                    <div>
                      <div className="w-3 h-3 rounded-full bg-amber-400 mx-auto mb-1" />
                      <p className="text-[11px] sm:text-xs font-medium text-amber-400">
                        Regular Use
                      </p>
                      <p className="text-[10px] text-white/40 hidden sm:block">
                        Frequent, habitual
                      </p>
                    </div>
                    <div>
                      <div className="w-3 h-3 rounded-full bg-orange-500 mx-auto mb-1" />
                      <p className="text-[11px] sm:text-xs font-medium text-orange-400">
                        Misuse
                      </p>
                      <p className="text-[10px] text-white/40 hidden sm:block">
                        Causing harm
                      </p>
                    </div>
                    <div>
                      <div className="w-3 h-3 rounded-full bg-red-500 mx-auto mb-1" />
                      <p className="text-[11px] sm:text-xs font-medium text-red-400">
                        Dependency
                      </p>
                      <p className="text-[10px] text-white/40 hidden sm:block">
                        Physical/psychological reliance
                      </p>
                    </div>
                    <div>
                      <div className="w-3 h-3 rounded-full bg-red-700 mx-auto mb-1" />
                      <p className="text-[11px] sm:text-xs font-medium text-red-300">
                        Addiction
                      </p>
                      <p className="text-[10px] text-white/40 hidden sm:block">
                        Compulsive, loss of control
                      </p>
                    </div>
                  </div>

                  {/* Direction arrow */}
                  <div className="flex items-center justify-center mt-4 gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20" />
                    <span className="text-[10px] sm:text-xs text-white/40 whitespace-nowrap">
                      Increasing risk &amp; loss of control &rarr;
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                  </div>
                </div>

                <div className="bg-purple-500/5 border-t border-purple-500/20 px-4 py-3">
                  <p className="text-xs sm:text-sm text-white/60">
                    <strong className="text-purple-400">Key point:</strong>{" "}
                    Movement along this spectrum is not always linear or
                    one-directional. People can move back towards lower-risk
                    use with appropriate support and treatment. Early
                    intervention at the misuse stage is significantly more
                    effective than waiting until dependency or addiction has
                    developed.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Substances Covered in This Section
                </p>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    "Alcohol — the most widely misused substance in the UK",
                    "Cannabis — the most commonly used illegal drug in the UK",
                    "Cocaine — increasingly prevalent in the construction industry",
                    "Prescription opioids — codeine, tramadol, morphine (often for work injuries)",
                    "Benzodiazepines — diazepam (Valium), often prescribed for anxiety",
                    "Novel psychoactive substances (NPS) — formerly called 'legal highs'",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-white/80"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Novel Psychoactive Substances (NPS):
                  </strong>{" "}
                  Formerly known as &ldquo;legal highs&rdquo;, these
                  substances were made illegal under the Psychoactive
                  Substances Act 2016. They include synthetic cannabinoids
                  (such as &ldquo;Spice&rdquo;), synthetic cathinones
                  (&ldquo;bath salts&rdquo;), and various other compounds
                  designed to mimic the effects of illegal drugs. Despite
                  being illegal, they remain in circulation and are
                  particularly dangerous because their chemical composition
                  is often unknown and inconsistent, making overdose and
                  unpredictable reactions common.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Alcohol Misuse */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">02</span>
            Alcohol Misuse
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Alcohol is the most widely consumed psychoactive substance in
                the UK and the most commonly misused. It is legal, socially
                normalised, and deeply embedded in workplace culture &mdash;
                particularly in the construction industry, where after-work
                drinking has historically been part of the social fabric. This
                normalisation makes it harder to recognise when use has
                crossed into misuse or dependency.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-purple-500/10 border-b border-purple-500/20 px-4 py-2">
                  <p className="text-sm font-semibold text-purple-400">
                    UK Alcohol Guidelines &mdash; Key Facts
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-purple-400 mb-1">
                        14
                      </p>
                      <p className="text-sm font-medium text-white mb-1">
                        Units per week maximum
                      </p>
                      <p className="text-xs text-white/60">
                        For both men and women, spread over 3 or more days
                        with several alcohol-free days each week
                      </p>
                    </div>
                    <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-violet-400 mb-1">
                        1 unit
                      </p>
                      <p className="text-sm font-medium text-white mb-1">
                        = 10ml or 8g of pure alcohol
                      </p>
                      <p className="text-xs text-white/60">
                        Half a pint of 4% beer, a single 25ml spirit measure,
                        or a small (125ml) glass of 8% wine
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-2">
                      Common Drinks &mdash; Unit Guide
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="text-center p-2 bg-purple-500/5 rounded-lg">
                        <p className="text-lg font-bold text-purple-400">2</p>
                        <p className="text-[10px] sm:text-xs text-white/60">
                          Pint of 4% beer
                        </p>
                      </div>
                      <div className="text-center p-2 bg-purple-500/5 rounded-lg">
                        <p className="text-lg font-bold text-purple-400">3</p>
                        <p className="text-[10px] sm:text-xs text-white/60">
                          Pint of 5.2% lager
                        </p>
                      </div>
                      <div className="text-center p-2 bg-purple-500/5 rounded-lg">
                        <p className="text-lg font-bold text-purple-400">2.1</p>
                        <p className="text-[10px] sm:text-xs text-white/60">
                          175ml glass 12% wine
                        </p>
                      </div>
                      <div className="text-center p-2 bg-purple-500/5 rounded-lg">
                        <p className="text-lg font-bold text-purple-400">1</p>
                        <p className="text-[10px] sm:text-xs text-white/60">
                          25ml single spirit
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Binge Drinking
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The NHS defines binge drinking as consuming{" "}
                  <strong className="text-white">
                    6 or more units in a single session for women, or 8 or more
                    units for men
                  </strong>
                  . This equates to roughly 3 pints of 4% beer or a bottle of
                  wine. Binge drinking significantly increases the risk of
                  accidents, alcohol poisoning, risky behaviour, and
                  cardiovascular events &mdash; even in people who do not
                  drink regularly.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Signs of Alcohol Dependency
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      A strong, compulsive urge or craving to drink alcohol
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Difficulty controlling the amount consumed once drinking
                      has started &mdash; inability to &ldquo;just have one&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Withdrawal symptoms
                      </strong>{" "}
                      when not drinking &mdash; tremors (shaking hands),
                      sweating, nausea, anxiety, insomnia, and in severe
                      cases seizures or delirium tremens
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Tolerance</strong> &mdash;
                      needing increasing amounts of alcohol to achieve the same
                      effect
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Neglecting responsibilities, relationships, or interests
                      in favour of drinking
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Continuing to drink despite awareness of the harm it is
                      causing to health, relationships, or work
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">
                      Physical Health Effects
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Liver:</strong> Fatty
                        liver, alcoholic hepatitis, cirrhosis, liver failure
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Brain:</strong> Memory
                        loss, cognitive impairment, Wernicke-Korsakoff
                        syndrome, increased dementia risk
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Heart:</strong> High
                        blood pressure, cardiomyopathy, increased stroke risk
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Cancer:</strong> Mouth,
                        throat, oesophagus, liver, bowel, and breast cancer
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="h-5 w-5 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      Mental Health Effects
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Depression:</strong>{" "}
                        Alcohol is a central nervous system depressant that
                        worsens low mood over time
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Anxiety:</strong>{" "}
                        Withdrawal and rebound effects increase anxiety
                        significantly
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Psychosis:</strong>{" "}
                        Heavy, prolonged use can cause alcoholic hallucinations
                        and paranoia
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Suicide risk:</strong>{" "}
                        Alcohol is a factor in approximately 25&ndash;50% of
                        suicides in the UK
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Alcohol &amp; the Construction Industry:
                  </strong>{" "}
                  Historically, heavy drinking has been normalised in
                  construction culture &mdash; after-work pints, Friday
                  sessions, and drinking to &ldquo;wind down&rdquo; from
                  physically demanding work. Research shows that construction
                  workers are significantly more likely than the general
                  population to drink at hazardous or harmful levels. The
                  industry is increasingly recognising this as a serious
                  welfare and safety issue, with organisations like the
                  Lighthouse Club, Mates in Mind, and the Considerate
                  Constructors Scheme promoting awareness and support. For
                  further information, resources are available at{" "}
                  <strong className="text-white">Drinkaware</strong>{" "}
                  (drinkaware.co.uk), which provides tools for tracking
                  consumption, understanding risk, and finding support.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Drug Misuse */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">03</span>
            Drug Misuse
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Drug misuse in the workplace is a growing concern across all
                industries, but it carries particular risk in construction where
                safety-critical work is carried out daily. Understanding the
                common substances involved, their effects, and the signs of
                misuse enables you to recognise when a colleague may need
                support.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-1">
                    Cannabis
                  </p>
                  <p className="text-sm text-white/80 mb-2">
                    The most commonly used illegal drug in the UK. Effects
                    include relaxation, altered perception, impaired
                    concentration and coordination, short-term memory
                    problems, and increased appetite. Regular use is linked
                    to{" "}
                    <strong className="text-white">
                      anxiety, depression, paranoia, and psychosis
                    </strong>{" "}
                    &mdash; particularly in those with a predisposition to
                    mental health conditions. Cannabis impairs coordination
                    and reaction time for up to 24 hours after use, making
                    it a significant safety risk on construction sites even
                    when used the evening before work.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-1">
                    Cocaine &amp; Crack Cocaine
                  </p>
                  <p className="text-sm text-white/80 mb-2">
                    A powerful stimulant that produces intense euphoria, high
                    energy, and confidence followed by a severe crash. Cocaine
                    use has increased significantly across the UK, including
                    in the construction industry. Effects include raised heart
                    rate and blood pressure, overconfidence and risk-taking
                    behaviour, agitation and aggression, and impaired
                    judgement. The crash after use causes fatigue, depression,
                    irritability, and poor concentration &mdash; all dangerous
                    on a construction site. Regular use leads to dependency,
                    cardiovascular damage, nasal septum perforation, and
                    severe mental health deterioration.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-1">
                    Prescription Opioids (Codeine, Tramadol, Morphine)
                  </p>
                  <p className="text-sm text-white/80 mb-2">
                    Prescribed for pain management &mdash; particularly
                    relevant in construction where musculoskeletal injuries
                    are common. Effects include pain relief, drowsiness,
                    euphoria, slowed breathing, and impaired coordination.
                    Prescription opioid misuse occurs when medication is taken
                    at higher doses than prescribed, for longer than
                    recommended, obtained from non-medical sources, or used
                    for emotional rather than physical pain management.
                    Dependency can develop within{" "}
                    <strong className="text-white">
                      as little as 2&ndash;4 weeks
                    </strong>{" "}
                    of regular use.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-1">
                    Benzodiazepines (Diazepam / Valium)
                  </p>
                  <p className="text-sm text-white/80 mb-2">
                    Prescribed for anxiety, insomnia, and muscle spasms.
                    Effects include sedation, reduced anxiety, muscle
                    relaxation, impaired coordination, and slowed reaction
                    times. Benzodiazepines are highly addictive &mdash;
                    dependency can develop within{" "}
                    <strong className="text-white">2&ndash;4 weeks</strong> of
                    daily use. Withdrawal from benzodiazepines can be
                    medically dangerous and must be managed gradually under
                    medical supervision. Combining benzodiazepines with
                    alcohol is extremely dangerous and can cause fatal
                    respiratory depression.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Signs of Drug Misuse at Work
                </p>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    "Erratic, unpredictable, or uncharacteristic behaviour",
                    "Increased absenteeism — particularly Mondays or after paydays",
                    "Unexplained accidents, near-misses, or injury patterns",
                    "Mood swings — periods of high energy followed by lethargy or irritability",
                    "Declining quality of work and inability to concentrate",
                    "Changes in appearance, hygiene, or weight",
                    "Social withdrawal from colleagues or becoming secretive",
                    "Financial difficulties — borrowing money, selling possessions",
                    "Dilated or constricted pupils, bloodshot eyes, runny nose",
                    "Smell of cannabis or alcohol on clothing or breath",
                  ].map((sign, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-white/80"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Safety Implications on Construction Sites
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  On a construction site, drug impairment can be{" "}
                  <strong className="text-white">fatal</strong>. Workers who
                  are impaired may operate cranes, excavators, or power tools
                  with reduced coordination and impaired judgement. They may
                  work at height with slowed reaction times, fail to follow
                  safety procedures, misjudge risks, or cause accidents that
                  injure others. Even{" "}
                  <strong className="text-white">
                    residual impairment
                  </strong>{" "}
                  from substances used the previous evening can significantly
                  affect performance. This is not just about the individual
                  &mdash; it is about the safety of every person on that site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Dual Diagnosis */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">04</span>
            Dual Diagnosis
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Dual diagnosis</strong> (also called co-occurring
                disorders or comorbidity) refers to having both a mental health
                condition and a substance misuse problem at the same time. This
                is extremely common &mdash; research consistently shows that
                people with mental health conditions are significantly more
                likely to misuse substances, and people who misuse substances
                are significantly more likely to develop mental health
                conditions.
              </p>

              {/* Bidirectional Relationship Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-purple-500/10 border-b border-purple-500/20 px-4 py-2">
                  <p className="text-sm font-semibold text-purple-400">
                    The Bidirectional Relationship
                  </p>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                    {/* Mental Health Box */}
                    <div className="w-full sm:w-48 bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg text-center">
                      <Heart className="h-6 w-6 text-violet-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-violet-400">
                        Mental Health Condition
                      </p>
                      <p className="text-[10px] sm:text-xs text-white/50 mt-1">
                        Depression, anxiety, PTSD, psychosis
                      </p>
                    </div>

                    {/* Arrows */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-purple-400 hidden sm:block">
                          Self-medication
                        </span>
                        <span className="text-purple-400 text-lg sm:text-xl">
                          &rarr;
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-purple-400 text-lg sm:text-xl">
                          &larr;
                        </span>
                        <span className="text-xs text-purple-400 hidden sm:block">
                          Substance-induced
                        </span>
                      </div>
                      <p className="text-[10px] text-white/40 sm:hidden">
                        Bidirectional relationship
                      </p>
                    </div>

                    {/* Substance Misuse Box */}
                    <div className="w-full sm:w-48 bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg text-center">
                      <Wine className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-orange-400">
                        Substance Misuse
                      </p>
                      <p className="text-[10px] sm:text-xs text-white/50 mt-1">
                        Alcohol, drugs, prescription medication
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Which Comes First?
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The relationship between mental health and substance misuse
                  can work in either direction:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-violet-400">
                        Mental health &rarr; substance misuse:
                      </strong>{" "}
                      A person develops depression or anxiety first and begins
                      using alcohol or drugs to cope with their symptoms
                      (self-medication). The substance provides temporary
                      relief but worsens the underlying condition over time.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-orange-400">
                        Substance misuse &rarr; mental health:
                      </strong>{" "}
                      A person&rsquo;s substance use causes or triggers a
                      mental health condition. For example, heavy cannabis use
                      triggering psychosis, or chronic alcohol use causing
                      depression through neurochemical changes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-purple-400">
                        Shared root causes:
                      </strong>{" "}
                      Both conditions may stem from the same underlying factors
                      &mdash; childhood trauma, adverse life events, genetic
                      predisposition, or chronic stress &mdash; and develop in
                      parallel.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Self-Medication
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Self-medication is one of the most common pathways to dual
                  diagnosis. People use substances to manage symptoms that
                  they find overwhelming or unbearable:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Alcohol</strong> to numb
                      emotional pain, reduce anxiety, or aid sleep
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cannabis</strong> to
                      reduce anxiety, relax, or escape intrusive thoughts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cocaine</strong> to
                      counteract low mood, increase energy, or feel confident
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Prescription opioids
                      </strong>{" "}
                      to manage both physical and emotional pain
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Why Dual Diagnosis Is Harder to Treat
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Each condition worsens the other &mdash; creating a
                      vicious cycle that is difficult to break
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Symptoms overlap and can be difficult to distinguish
                      &mdash; is the low mood caused by depression or by
                      alcohol withdrawal?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Treatment services have historically been separated
                      &mdash; mental health services and substance misuse
                      services operating independently
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Some mental health services refuse to engage until the
                      person is &ldquo;clean&rdquo;, while substance misuse
                      services may not address the mental health condition
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Best practice is an integrated treatment approach
                      </strong>{" "}
                      that addresses both conditions simultaneously, delivered
                      by a team experienced in dual diagnosis
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Approaching Someone About Substance Use */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">05</span>
            Approaching Someone About Substance Use
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Approaching someone about suspected substance misuse is one of
                the most challenging conversations you may have as a Mental
                Health First Aider. The person may be defensive, in denial,
                ashamed, or frightened. Your approach matters enormously &mdash;
                a confrontational, accusatory conversation will almost
                certainly fail, while a compassionate, non-judgemental approach
                can open the door to change.
              </p>

              {/* ALGEE Framework */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-purple-500/10 border-b border-purple-500/20 px-4 py-2">
                  <p className="text-sm font-semibold text-purple-400">
                    Using the ALGEE Framework for Substance Misuse
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 text-sm font-bold flex-shrink-0">
                      A
                    </span>
                    <div className="flex-1 bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-purple-400 mb-1">
                        Approach, Assess &amp; Assist
                      </p>
                      <p className="text-sm text-white/80">
                        Find a private, calm moment. Express genuine concern:
                        &ldquo;I&rsquo;ve noticed you seem to be going through
                        a tough time. How are you doing?&rdquo; Do not accuse
                        or confront &mdash; focus on what you have observed,
                        not what you suspect.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 text-sm font-bold flex-shrink-0">
                      L
                    </span>
                    <div className="flex-1 bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-purple-400 mb-1">
                        Listen Non-Judgementally
                      </p>
                      <p className="text-sm text-white/80">
                        Give them space to talk. Do not interrupt, lecture, or
                        moralise. Avoid language like &ldquo;you should&rdquo;
                        or &ldquo;you need to stop&rdquo;. Use open body
                        language, maintain eye contact, and reflect back what
                        they say to show understanding.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 text-sm font-bold flex-shrink-0">
                      G
                    </span>
                    <div className="flex-1 bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-purple-400 mb-1">
                        Give Information &amp; Support
                      </p>
                      <p className="text-sm text-white/80">
                        Share practical information about where they can get
                        help. Do not diagnose or tell them they are an
                        &ldquo;alcoholic&rdquo; or &ldquo;addict&rdquo; &mdash;
                        this is not your role and can cause further shame.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 text-sm font-bold flex-shrink-0">
                      E
                    </span>
                    <div className="flex-1 bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-purple-400 mb-1">
                        Encourage Professional Help
                      </p>
                      <p className="text-sm text-white/80">
                        Gently suggest they speak to their GP, contact a
                        helpline, or access local services. Offer to help them
                        make the first contact if they are willing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 text-sm font-bold flex-shrink-0">
                      E
                    </span>
                    <div className="flex-1 bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-purple-400 mb-1">
                        Encourage Self-Help &amp; Other Strategies
                      </p>
                      <p className="text-sm text-white/80">
                        Suggest practical steps they can take themselves &mdash;
                        tracking their consumption, setting goals, attending
                        support groups, or using self-help resources. Respect
                        their autonomy &mdash; they must choose to make changes
                        themselves.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Non-Confrontational Approach &mdash; Key Principles
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Use &ldquo;I&rdquo; statements:
                      </strong>{" "}
                      &ldquo;I&rsquo;m worried about you&rdquo; rather than
                      &ldquo;You have a drinking problem&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Describe observations, not judgements:
                      </strong>{" "}
                      &ldquo;I&rsquo;ve noticed you&rsquo;ve been missing
                      Mondays quite a lot recently&rdquo; rather than
                      &ldquo;You&rsquo;re always hungover on Mondays&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Choose the right time and place:
                      </strong>{" "}
                      Private, calm, and when the person is sober &mdash; never
                      approach someone when they are intoxicated or in front of
                      others
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Be prepared for denial:
                      </strong>{" "}
                      Many people are not ready to acknowledge their substance
                      use as a problem. Do not argue &mdash; plant the seed,
                      let them know you are there when they are ready, and
                      follow up later
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Respect boundaries:
                      </strong>{" "}
                      You cannot force someone to accept help. Your role is to
                      open the door &mdash; they must choose to walk through it
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    Referral Options
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      GP (First Port of Call)
                    </p>
                    <p className="text-xs text-white/60">
                      Can assess, prescribe, refer to specialist services, and
                      coordinate treatment for dual diagnosis
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      FRANK Helpline
                    </p>
                    <p className="text-xs text-white/60">
                      0300 123 6600 &mdash; free, confidential drug advice and
                      support, 24/7
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      Alcoholics Anonymous (AA)
                    </p>
                    <p className="text-xs text-white/60">
                      0800 917 7650 &mdash; peer support, 12-step programme,
                      meetings across the UK
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      Narcotics Anonymous (NA)
                    </p>
                    <p className="text-xs text-white/60">
                      0300 999 1212 &mdash; peer support for drug addiction,
                      meetings across the UK
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      Local Drug &amp; Alcohol Services
                    </p>
                    <p className="text-xs text-white/60">
                      Free NHS-funded services in every area &mdash; search
                      via NHS.uk or the FRANK website
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      Drinkaware
                    </p>
                    <p className="text-xs text-white/60">
                      drinkaware.co.uk &mdash; unit calculator, self-assessment
                      tools, and information about reducing drinking
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    The Role of the MHFA:
                  </strong>{" "}
                  As a Mental Health First Aider, your role is to{" "}
                  <strong>recognise</strong> the signs of substance misuse,{" "}
                  <strong>approach</strong> the person with compassion,{" "}
                  <strong>listen</strong> without judgement,{" "}
                  <strong>signpost</strong> to professional help, and{" "}
                  <strong>support</strong> them while they seek treatment. You
                  are <strong>not</strong> a counsellor, therapist, or
                  disciplinary authority. You are a bridge between suffering in
                  silence and getting professional help. That bridge can save
                  a life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Workplace Policies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">06</span>
            Workplace Policies
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every construction site should have a clear drug and alcohol
                policy. As an MHFA, you should be familiar with your site&rsquo;s
                policy so you can signpost colleagues appropriately and
                understand the framework within which you are operating. The
                best policies balance{" "}
                <strong>safety enforcement</strong> with{" "}
                <strong>welfare support</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key Components of a Drug &amp; Alcohol Policy
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Clear rules:
                      </strong>{" "}
                      What substances are prohibited on site, including
                      alcohol, illegal drugs, and the misuse of prescription
                      medication
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Testing procedures:
                      </strong>{" "}
                      Whether the site conducts random, for-cause, or
                      post-incident drug and alcohol testing, and what methods
                      are used (urine, oral fluid, breathalyser)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Fitness for work assessments:
                      </strong>{" "}
                      Supervisors and managers should be trained to assess
                      whether a worker appears fit to carry out their duties
                      safely, regardless of test results
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Consequences:
                      </strong>{" "}
                      What happens if someone tests positive or is found to be
                      impaired &mdash; this may range from immediate removal
                      from site to a formal disciplinary process
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Support pathways:
                      </strong>{" "}
                      How the employer supports workers with substance misuse
                      problems &mdash; occupational health referrals, employee
                      assistance programmes (EAPs), and return-to-work
                      arrangements after treatment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Confidentiality:
                      </strong>{" "}
                      How personal health information is handled, who has
                      access to test results, and the worker&rsquo;s right to
                      privacy
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-emerald-400" />
                    <p className="text-sm font-medium text-emerald-400">
                      Supporting
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>
                        Encouraging the person to voluntarily seek help
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>
                        Offering occupational health referral and EAP access
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>
                        Allowing time off for treatment and recovery
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>
                        A structured return-to-work plan with ongoing support
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">
                      Disciplining
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        Immediate removal from safety-critical work if impaired
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        Formal investigation and disciplinary process
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        Potential dismissal for repeated or gross violations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>
                        Reporting to relevant professional bodies if applicable
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Duty of Care on Construction Sites
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Under the Health and Safety at Work etc. Act 1974, employers
                  have a duty of care to ensure, so far as is reasonably
                  practicable, the health, safety, and welfare of their
                  employees. This includes managing the risks associated with
                  substance misuse. Workers also have a duty not to put
                  themselves or others at risk. On construction sites, where
                  work is{" "}
                  <strong className="text-white">safety-critical</strong>,
                  the consequences of substance-related impairment can be
                  catastrophic &mdash; falls from height, machinery accidents,
                  electrical incidents, and vehicle collisions. The policy
                  must balance the need to protect everyone on site with the
                  duty to support individuals who are struggling.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Occupational Health Referral
                </p>
                <p className="text-sm text-white/80 mb-3">
                  An occupational health referral is a key tool for managing
                  substance misuse in the workplace. It involves referring the
                  worker to an occupational health professional who can:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Assess the worker&rsquo;s fitness to carry out their
                      role safely
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Recommend reasonable adjustments or temporary changes
                      to duties
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Facilitate access to treatment programmes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Provide a confidential, non-judgemental assessment
                      separate from the disciplinary process
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Support a structured return to work after treatment,
                      including monitoring and follow-up
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Remember:
                  </strong>{" "}
                  A substance misuse policy should not be purely punitive.
                  Workers who feel they will be immediately sacked if they
                  disclose a problem are far less likely to seek help &mdash;
                  and far more likely to hide their impairment, increasing the
                  risk to themselves and everyone around them. The most
                  effective policies create an environment where workers feel
                  safe to ask for help, while maintaining clear, non-negotiable
                  safety standards. As an MHFA, you can play a crucial role in
                  encouraging this culture &mdash; by being someone people
                  trust to talk to without fear of immediate consequences.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
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

        {/* Quiz */}
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-purple-500 text-white hover:bg-purple-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-3-section-2">
              Next: Self-Harm
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
