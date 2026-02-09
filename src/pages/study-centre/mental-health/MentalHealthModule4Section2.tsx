import {
  ArrowLeft,
  UtensilsCrossed,
  CheckCircle,
  AlertTriangle,
  Heart,
  Activity,
  Eye,
  Users,
  Phone,
  ShieldCheck,
  HeartPulse,
  HardHat,
  Scale,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "eating-disorder-mortality",
    question:
      "A colleague tells you that eating disorders are 'just a phase' and 'not that serious'. Which of the following statements is factually correct?",
    options: [
      "Eating disorders are a lifestyle choice and people can simply decide to eat normally again",
      "Eating disorders only affect teenage girls and young women",
      "Eating disorders have the highest mortality rate of any mental health condition and are serious mental illnesses",
      "Eating disorders are caused by vanity and a desire to look thin",
    ],
    correctIndex: 2,
    explanation:
      "Eating disorders have the highest mortality rate of any mental health condition. They are serious mental illnesses with complex biological, psychological, and social causes. They are NOT a lifestyle choice, a phase, or caused by vanity. They affect people of all ages, genders, and backgrounds. An estimated 1.25 million people in the UK have an eating disorder (BEAT), and around 25% of those affected are male.",
  },
  {
    id: "eating-disorder-approach",
    question:
      "You are concerned that a colleague on site may be struggling with an eating disorder. Which of the following is the MOST appropriate way to approach them?",
    options: [
      "Comment on how much weight they have lost and ask if they are eating properly",
      "Tell them they look unwell and need to see a doctor immediately",
      "Express concern about their general wellbeing in a private, non-judgemental conversation without commenting on their weight or appearance",
      "Confront them in front of others so they cannot deny the problem",
    ],
    correctIndex: 2,
    explanation:
      "The correct approach is to have a private, non-judgemental conversation expressing concern about their general wellbeing. You should NEVER comment on someone's weight, appearance, or eating habits directly. Comments about weight loss or looking unwell can be deeply triggering and counterproductive. Confronting someone publicly is inappropriate and may cause shame and withdrawal. Focus on expressing care for them as a person, saying something like 'I've noticed you seem a bit down lately, and I wanted to check in with you.'",
  },
  {
    id: "eating-disorder-physical-signs",
    question:
      "Which of the following is a potential medical emergency sign associated with eating disorders that would require urgent medical attention?",
    options: [
      "Skipping lunch occasionally",
      "Choosing to eat salad instead of a hot meal",
      "Fainting, chest pain, or an irregular heartbeat",
      "Preferring to eat alone rather than with colleagues",
    ],
    correctIndex: 2,
    explanation:
      "Fainting, chest pain, and irregular heartbeat are potential signs of serious cardiac complications from an eating disorder and require urgent medical attention. Eating disorders can cause dangerous electrolyte imbalances that lead to cardiac arrhythmias, which can be fatal. Other emergency signs include seizures, inability to stand, severe dehydration, and confusion. While skipping meals, food choices, and eating alone may be behavioural indicators of a problem, they are not in themselves medical emergencies.",
  },
];

const faqs = [
  {
    question:
      "Can someone have an eating disorder if they appear to be a normal or healthy weight?",
    answer:
      "Absolutely. Many people with eating disorders are at a normal weight or even overweight. Bulimia Nervosa, Binge Eating Disorder, and OSFED can all occur at any weight. Even Anorexia Nervosa has an 'atypical' form where the person has lost significant weight but is not clinically underweight. The dangerous myth that you can tell if someone has an eating disorder by looking at them leads to many cases going undiagnosed. Weight is not a reliable indicator of the severity of an eating disorder, and people at any weight can be seriously medically compromised.",
  },
  {
    question:
      "What is BEAT and how can they help?",
    answer:
      "BEAT is the UK's leading eating disorder charity. They provide a free, confidential helpline (0808 801 0677) that is open to anyone concerned about their own or someone else's eating. They also offer a Youthline (0808 801 0711) for those under 18, webchat services, and online support groups. BEAT provides information for individuals, families, professionals, and workplaces. They campaign for better treatment and earlier intervention, and their website (beateatingdisorders.org.uk) has comprehensive resources including guidance on how to have conversations about eating disorders, what to expect from treatment, and how to support recovery.",
  },
  {
    question:
      "How should I respond if a colleague tells me they have an eating disorder?",
    answer:
      "Thank them for trusting you and listen without judgement. Do not try to offer advice about food or eating. Do not say things like 'just eat normally' or 'you don't look like you have an eating disorder'. Avoid commenting on their appearance or weight. Ask them how they would like to be supported and what would be helpful. Encourage them to seek professional help if they have not already done so, and let them know about the BEAT helpline (0808 801 0677). Respect their confidentiality. Recovery from an eating disorder is a long process, so be patient and continue to check in with them regularly. Your role is to be a supportive presence, not a treatment provider.",
  },
  {
    question:
      "Are eating disorders really common in men who work in construction?",
    answer:
      "Eating disorders in men are significantly underreported and underdiagnosed. Around 25% of people with eating disorders are male, and many experts believe the true figure is higher because men are less likely to seek help due to stigma and the perception that eating disorders are a 'female problem'. In construction, physical labour can mask symptoms (excessive exercise may be seen as part of the job), and the culture of toughness can prevent men from admitting to struggles with food, body image, or mental health. Men in construction may also use excessive exercise, protein supplements, or restrictive diets to achieve a particular physique, which can develop into or mask an eating disorder.",
  },
  {
    question:
      "What is the difference between normal dieting and an eating disorder?",
    answer:
      "While many people diet from time to time, an eating disorder is characterised by a persistent disturbance of eating behaviour that significantly impairs physical health or psychosocial functioning. Key differences include: an eating disorder involves obsessive, rigid thinking about food, weight, and body shape that dominates daily life; the person feels unable to stop the behaviour even when they want to; the behaviour causes significant physical harm (malnutrition, heart problems, dental erosion); there is significant psychological distress and impaired functioning; and the person may use dangerous compensatory behaviours such as purging, laxative abuse, or excessive exercise. Normal dieting does not involve these extreme behaviours, the level of psychological distress, or the medical complications.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which eating disorder has the highest mortality rate of any mental health condition?",
    options: [
      "Binge Eating Disorder",
      "Bulimia Nervosa",
      "Anorexia Nervosa",
      "OSFED",
    ],
    correctAnswer: 2,
    explanation:
      "Anorexia Nervosa has the highest mortality rate of any mental health condition. Deaths may result from the direct physical effects of starvation (cardiac arrest due to electrolyte imbalances, organ failure) or from suicide, as people with Anorexia Nervosa have a significantly elevated suicide risk. However, it is important to note that all eating disorders can be life-threatening and carry serious medical risks.",
  },
  {
    id: 2,
    question:
      "Which of the following is the MOST common eating disorder in the UK?",
    options: [
      "Anorexia Nervosa",
      "Bulimia Nervosa",
      "Binge Eating Disorder",
      "ARFID",
    ],
    correctAnswer: 2,
    explanation:
      "Binge Eating Disorder (BED) is the most common eating disorder in the UK and worldwide. It is characterised by recurrent episodes of eating large quantities of food in a short period, often very quickly and to the point of discomfort, accompanied by a sense of loss of control during the binge and feelings of shame, distress, or guilt afterwards. Unlike Bulimia Nervosa, people with BED do not regularly use compensatory behaviours such as purging.",
  },
  {
    id: 3,
    question:
      "Approximately what percentage of people with eating disorders in the UK are male?",
    options: [
      "5%",
      "10%",
      "25%",
      "50%",
    ],
    correctAnswer: 2,
    explanation:
      "Approximately 25% of people with eating disorders are male. However, many experts believe this figure is an underestimate because men are less likely to seek help, less likely to be referred for assessment, and less likely to be correctly diagnosed due to the persistent myth that eating disorders only affect women. Male eating disorder rates are rising, and greater awareness is needed to ensure men receive timely diagnosis and treatment.",
  },
  {
    id: 4,
    question:
      "A colleague with a suspected eating disorder faints on site and has a weak, irregular pulse. What is the priority action?",
    options: [
      "Give them something to eat and drink to raise their blood sugar",
      "Call 999 immediately — fainting and an irregular pulse may indicate a dangerous cardiac arrhythmia caused by electrolyte imbalances",
      "Help them to a quiet area and let them rest until they feel better",
      "Encourage them to see their GP when they get home",
    ],
    correctAnswer: 1,
    explanation:
      "Fainting combined with a weak, irregular pulse is a potential medical emergency. Eating disorders can cause severe electrolyte imbalances (particularly low potassium) that lead to dangerous cardiac arrhythmias, which can be fatal. You should call 999 immediately, not attempt to give food or drink (they may be unable to swallow safely if consciousness is impaired), and monitor the casualty until paramedics arrive. Be prepared to provide CPR if their condition deteriorates.",
  },
  {
    id: 5,
    question:
      "Which of the following is a characteristic feature of Bulimia Nervosa that distinguishes it from Anorexia Nervosa?",
    options: [
      "Fear of gaining weight",
      "A cycle of binge eating followed by compensatory behaviours such as purging, and the person may be a normal weight",
      "Preoccupation with body shape",
      "Restriction of food intake",
    ],
    correctAnswer: 1,
    explanation:
      "The defining feature of Bulimia Nervosa is the binge-purge cycle: episodes of eating large amounts of food (bingeing) followed by compensatory behaviours to prevent weight gain, such as self-induced vomiting, misuse of laxatives or diuretics, fasting, or excessive exercise. Crucially, people with Bulimia Nervosa may appear to be a normal weight, which can make the condition harder to detect. While fear of gaining weight and preoccupation with body shape occur in both conditions, the binge-purge pattern at a normal or near-normal weight is characteristic of Bulimia.",
  },
  {
    id: 6,
    question:
      "When approaching someone you are concerned about regarding a possible eating disorder, which of the following should you AVOID?",
    options: [
      "Expressing concern about their general wellbeing",
      "Having the conversation in a private setting",
      "Commenting on how much weight they have lost or how thin they look",
      "Letting them know about the BEAT helpline",
    ],
    correctAnswer: 2,
    explanation:
      "You should NEVER comment on someone's weight or appearance when approaching them about a suspected eating disorder. Comments like 'you've lost so much weight' or 'you look so thin' can actually reinforce the eating disorder behaviour, as the person may interpret this as confirmation that their restriction or purging is 'working'. Instead, focus on their general wellbeing: 'I've noticed you seem stressed/tired/down lately, and I wanted to check if you're OK.' Express care about them as a person, not about their body.",
  },
  {
    id: 7,
    question:
      "Which of the following physical health risks is associated with eating disorders?",
    options: [
      "Cardiac arrhythmias due to electrolyte imbalances",
      "Improved bone density from low body weight",
      "Enhanced kidney function from reduced caloric intake",
      "Stronger tooth enamel from purging",
    ],
    correctAnswer: 0,
    explanation:
      "Cardiac arrhythmias (irregular heartbeats) caused by electrolyte imbalances, particularly low potassium (hypokalaemia), are one of the most dangerous physical consequences of eating disorders and a leading cause of death. Far from being beneficial, eating disorders cause osteoporosis (not improved bone density), kidney failure (not enhanced function), and severe dental erosion from repeated vomiting (not stronger enamel). The physical health consequences of eating disorders are severe and can affect virtually every organ system in the body.",
  },
  {
    id: 8,
    question:
      "What does OSFED stand for and why is it clinically significant?",
    options: [
      "Obsessive Specific Food Elimination Disorder — a rare condition affecting only children",
      "Other Specified Feeding or Eating Disorder — it is as serious as other eating disorders and includes presentations that do not meet full criteria for Anorexia, Bulimia, or BED",
      "Occasional Sporadic Food Exclusion Disorder — a mild form of dieting behaviour",
      "Overweight Specific Feeding and Eating Dysfunction — a condition only affecting people who are overweight",
    ],
    correctAnswer: 1,
    explanation:
      "OSFED stands for Other Specified Feeding or Eating Disorder. It was previously known as EDNOS (Eating Disorder Not Otherwise Specified). OSFED is clinically significant because it is just as serious and potentially life-threatening as Anorexia Nervosa, Bulimia Nervosa, or Binge Eating Disorder. It includes presentations where the person has significant eating disorder symptoms that cause distress and impairment but does not meet the full diagnostic criteria for one of the other specific disorders. OSFED is actually one of the most commonly diagnosed eating disorders.",
  },
];

export default function MentalHealthModule4Section2() {
  useSEO({
    title:
      "Eating Disorders | Mental Health First Aid Module 4.2",
    description:
      "Understanding eating disorders including Anorexia Nervosa, Bulimia Nervosa, Binge Eating Disorder, OSFED, and ARFID. Recognition in the workplace, physical health risks, male prevalence, and how to approach and support.",
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
            <Link to="../mental-health-module-4">
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
            <UtensilsCrossed className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 mx-auto">
            <span className="text-purple-400 text-xs font-semibold">
              MODULE 4 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Eating Disorders
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding eating disorders including Anorexia Nervosa,
            Bulimia Nervosa, Binge Eating Disorder, OSFED, and ARFID
            &mdash; recognition in the workplace, physical health risks,
            male prevalence, and how to approach and support
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
                <strong>Serious illness:</strong> Highest mortality
                rate of any mental health condition
              </li>
              <li>
                <strong>Not a choice:</strong> Complex mental illness,
                not a lifestyle decision
              </li>
              <li>
                <strong>Anyone affected:</strong> 1.25 million people
                in UK, 25% are male
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Recognise:</strong> Avoiding meals, excessive
                exercise, weight changes, fatigue
              </li>
              <li>
                <strong>Approach:</strong> Private, non-judgemental
                &mdash; focus on wellbeing, not weight
              </li>
              <li>
                <strong>Support:</strong> BEAT helpline 0808 801 0677,
                GP referral
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
              "Explain why eating disorders are serious mental illnesses with the highest mortality rate of any mental health condition",
              "Describe the key features of Anorexia Nervosa, Bulimia Nervosa, Binge Eating Disorder, OSFED, and ARFID",
              "Discuss why eating disorders in men and in construction are underreported and how physical jobs can mask symptoms",
              "Identify the major physical health risks associated with eating disorders, including cardiac, renal, and skeletal complications",
              "Recognise behavioural and physical signs of eating disorders in the workplace",
              "Demonstrate how to approach and support a colleague with a suspected eating disorder using non-judgemental, person-centred communication",
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

        {/* Section 01: Understanding Eating Disorders */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">01</span>
            Understanding Eating Disorders
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Eating disorders are <strong>serious mental illnesses</strong>{" "}
                characterised by a persistent disturbance of eating behaviour
                and the associated distressing thoughts and emotions. They are{" "}
                <strong>not a lifestyle choice</strong>, a phase, a diet gone
                too far, or a bid for attention. They are complex conditions
                with biological, psychological, and social contributing factors
                that require specialist treatment.
              </p>

              <div className="bg-red-500/10 border-2 border-red-500/40 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <p className="text-base font-bold text-red-400">
                    Highest Mortality Rate
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Eating disorders have the{" "}
                  <strong className="text-white">
                    highest mortality rate of any mental health condition
                  </strong>
                  . Deaths result from the direct physical consequences of
                  malnutrition and starvation (cardiac arrest, organ failure,
                  electrolyte imbalances) and from suicide, as people with
                  eating disorders have a significantly elevated risk of
                  taking their own life. Early identification and treatment
                  are critical for survival.
                </p>
                <p className="text-sm text-white/80">
                  According to the eating disorder charity{" "}
                  <strong className="text-white">BEAT</strong>, an estimated{" "}
                  <strong className="text-white">
                    1.25 million people in the UK
                  </strong>{" "}
                  have an eating disorder. The true figure is likely higher
                  due to the secrecy and shame that surround these conditions,
                  meaning many people never seek help or receive a diagnosis.
                </p>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Key Facts About Eating Disorders
                  </p>
                </div>
                <div className="space-y-2">
                  {[
                    "They are recognised mental illnesses, not lifestyle choices or phases",
                    "They affect people of ALL ages, genders, ethnicities, and socioeconomic backgrounds",
                    "Around 25% of people with eating disorders are male — rates in men are rising and significantly underreported",
                    "They have complex causes involving genetics, brain chemistry, personality traits, life experiences, and social/cultural pressures",
                    "Without treatment, eating disorders tend to worsen over time — they rarely resolve on their own",
                    "With the right treatment, full recovery IS possible, even after many years of illness",
                    "Average delay from onset to treatment in the UK is approximately 3.5 years (BEAT)",
                  ].map((fact, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/80">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What Eating Disorders Are NOT
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  {[
                    "NOT a diet or a choice — the person cannot 'just eat normally'",
                    "NOT about vanity or wanting to look thin — they are driven by complex psychological distress",
                    "NOT only a young woman's illness — they affect men, older adults, and children too",
                    "NOT something you can identify by looking at someone — people at any weight can have a serious eating disorder",
                    "NOT a sign of weakness — they are serious psychiatric conditions with neurobiological components",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Types of Eating Disorders */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">02</span>
            Types of Eating Disorders
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There are several clinically recognised eating disorders, each
                with distinct features, though they share common themes of
                distress around food, eating, body weight, and body shape. It
                is important to understand the differences, as the support and
                treatment approaches vary.
              </p>

              {/* Comparison Diagram */}
              <div className="bg-white/5 border-2 border-purple-500/30 rounded-lg overflow-hidden">
                <div className="bg-purple-500/10 px-4 py-3 border-b border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-purple-400" />
                    <p className="text-base font-semibold text-purple-400">
                      Eating Disorders &mdash; Comparison Overview
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    {
                      name: "Anorexia Nervosa",
                      key: "Restriction & low weight",
                      colour: "text-red-400",
                      bg: "bg-red-500/10",
                      border: "border-red-500/30",
                      features:
                        "Severe restriction of food intake, significantly low body weight, intense fear of gaining weight, body image distortion (seeing themselves as larger than they are)",
                    },
                    {
                      name: "Bulimia Nervosa",
                      key: "Binge-purge cycle",
                      colour: "text-amber-400",
                      bg: "bg-amber-500/10",
                      border: "border-amber-500/30",
                      features:
                        "Recurrent episodes of binge eating followed by compensatory purging (vomiting, laxatives, excessive exercise, fasting). Person may be a normal weight, making it harder to detect",
                    },
                    {
                      name: "Binge Eating Disorder (BED)",
                      key: "Most common type",
                      colour: "text-blue-400",
                      bg: "bg-blue-500/10",
                      border: "border-blue-500/30",
                      features:
                        "Recurrent episodes of eating large quantities very quickly, feeling a loss of control, eating beyond comfort, followed by shame and distress. No regular purging. The most commonly diagnosed eating disorder in the UK",
                    },
                    {
                      name: "OSFED",
                      key: "Other Specified Feeding or Eating Disorder",
                      colour: "text-violet-400",
                      bg: "bg-violet-500/10",
                      border: "border-violet-500/30",
                      features:
                        "Significant eating disorder symptoms causing distress and impairment, but does not meet full criteria for Anorexia, Bulimia, or BED. Previously called EDNOS. Just as serious and potentially life-threatening as other eating disorders",
                    },
                    {
                      name: "ARFID",
                      key: "Avoidant/Restrictive Food Intake Disorder",
                      colour: "text-teal-400",
                      bg: "bg-teal-500/10",
                      border: "border-teal-500/30",
                      features:
                        "Avoidance or restriction of food NOT driven by concerns about body weight or shape. May be due to sensory sensitivities (texture, taste, smell), fear of choking or vomiting, or lack of interest in eating. Can cause significant nutritional deficiencies",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`${item.bg} border ${item.border} p-3 rounded-lg`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1.5">
                        <p
                          className={`text-sm font-semibold ${item.colour}`}
                        >
                          {item.name}
                        </p>
                        <span className="text-xs text-white/50">
                          {item.key}
                        </span>
                      </div>
                      <p className="text-sm text-white/80">{item.features}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed: Anorexia Nervosa */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">
                  Anorexia Nervosa &mdash; In Detail
                </p>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Anorexia Nervosa is characterised by a relentless pursuit
                    of thinness, an intense fear of gaining weight (even when
                    significantly underweight), and a distorted body image
                    where the person perceives themselves as larger than they
                    actually are. It has the{" "}
                    <strong className="text-white">
                      highest mortality rate of any psychiatric disorder
                    </strong>
                    .
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      "Severe restriction of caloric intake leading to significantly low body weight",
                      "Intense, overwhelming fear of gaining weight or becoming fat",
                      "Body image distortion — seeing themselves as overweight even when dangerously underweight",
                      "May engage in excessive exercise, purging, or misuse of laxatives to lose weight",
                      "Denial of the seriousness of the low body weight — the person may insist they are 'fine'",
                      "Social withdrawal, rigid routines around food, and intense anxiety at mealtimes",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Detailed: Bulimia Nervosa */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-amber-400 mb-3">
                  Bulimia Nervosa &mdash; In Detail
                </p>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Bulimia Nervosa is characterised by recurrent cycles of
                    binge eating followed by compensatory behaviours designed
                    to prevent weight gain. The binge-purge cycle is typically
                    carried out in secret, and the person often feels intense
                    shame and self-loathing afterwards.
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      "Binge eating — consuming large amounts of food in a short time with a feeling of being out of control",
                      "Purging — self-induced vomiting, misuse of laxatives or diuretics, fasting, or excessive exercise",
                      "Often maintained at a normal weight, making detection harder",
                      "Chronic sore throat, damaged tooth enamel (from stomach acid), swollen salivary glands ('chipmunk cheeks')",
                      "Russell's sign — calluses or scarring on the knuckles from self-induced vomiting",
                      "Severe fluctuations in mood, low self-esteem, and intense self-criticism",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Detailed: Binge Eating Disorder */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Binge Eating Disorder (BED) &mdash; In Detail
                </p>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Binge Eating Disorder is the most common eating disorder.
                    It involves recurrent episodes of eating significantly
                    more food than most people would eat in a similar time
                    period, accompanied by a sense of loss of control. Unlike
                    Bulimia, the person does not regularly purge after bingeing.
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      "Eating much more rapidly than normal during binge episodes",
                      "Eating until uncomfortably full",
                      "Eating large amounts when not physically hungry",
                      "Eating alone because of embarrassment about the amount being consumed",
                      "Feelings of disgust, depression, or guilt after a binge",
                      "Marked distress about the binge eating behaviour",
                      "Often associated with being overweight or obese, but not always",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Eating Disorders in Men and in Construction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">03</span>
            Eating Disorders in Men &amp; in Construction
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Eating disorders have historically been stereotyped as a
                &ldquo;female disorder,&rdquo; but this is a dangerous myth
                that leads to widespread under-recognition and delayed
                help-seeking in men. In male-dominated industries like
                construction, the problem is compounded by workplace culture,
                physical job demands, and the stigma around discussing mental
                health.
              </p>

              <div className="bg-purple-500/10 border-2 border-purple-500/40 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HardHat className="h-6 w-6 text-purple-400" />
                  <p className="text-base font-bold text-purple-400">
                    The Male Eating Disorder Gap
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Approximately <strong className="text-white">25% of
                  people with eating disorders are male</strong>. However,
                  experts believe this is a significant underestimate. Men
                  are less likely to recognise their symptoms as an eating
                  disorder, less likely to seek help, less likely to be
                  asked about eating behaviour by healthcare professionals,
                  and less likely to be correctly diagnosed.
                </p>
                <p className="text-sm text-white/80">
                  Male eating disorder rates are{" "}
                  <strong className="text-white">rising</strong>, and the
                  gap between male and female rates may be narrower than
                  statistics suggest. Research from the NHS shows a sharp
                  increase in hospital admissions for eating disorders among
                  men and boys in recent years.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-violet-400 mb-3">
                    Why Men Are Under-Diagnosed
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    {[
                      "Persistent perception that eating disorders are a 'female problem'",
                      "Screening tools and diagnostic criteria historically developed based on female presentations",
                      "Men may present differently — focus on muscularity rather than thinness",
                      "Healthcare professionals may not ask men about eating behaviour",
                      "Men are less likely to seek help for mental health issues generally",
                      "Male eating disorders may be framed as 'fitness' or 'training' rather than illness",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-purple-400 mb-3">
                    Construction-Specific Factors
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    {[
                      "Physical labour can mask excessive exercise — seen as 'part of the job'",
                      "Skipping meals on site may be normalised ('too busy to eat')",
                      "Body image pressures — wanting to look strong, muscular, or lean",
                      "Excessive protein supplement use or restrictive diets seen as 'getting fit'",
                      "Culture of toughness makes admitting struggles with food very difficult",
                      "Irregular eating patterns due to shift work or early starts",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  How Eating Disorders May Present Differently in Men
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  {[
                    "Focus on 'muscularity' rather than thinness — desire to be lean and muscular rather than thin",
                    "Excessive gym use and obsessive exercise routines ('bigorexia' or Muscle Dysmorphia)",
                    "Rigid, obsessive approach to 'clean eating' or macronutrient tracking",
                    "Use of anabolic steroids, testosterone, or other performance-enhancing substances",
                    "Binge eating may be more common in men than restriction",
                    "History of being overweight or bullied about weight in childhood",
                    "Eating disorder may develop alongside or be masked by substance misuse",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Breaking the Stigma:
                  </strong>{" "}
                  If you are a man struggling with your relationship with food,
                  exercise, or your body, you are not alone and you are not
                  weak. Eating disorders are mental illnesses that require
                  treatment, not willpower. The BEAT helpline (0808 801 0677)
                  is available to everyone regardless of gender, and their
                  website has specific resources for men with eating disorders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Physical Health Risks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">04</span>
            Physical Health Risks
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Eating disorders can cause devastating damage to virtually
                every organ system in the body. Many of these complications
                are directly life-threatening. Understanding these risks helps
                to reinforce that eating disorders are serious medical
                conditions, not trivial concerns about food and weight.
              </p>

              {/* Physical Risks Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HeartPulse className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">
                      Heart &amp; Cardiovascular
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    {[
                      "Cardiac arrhythmias (irregular heartbeat) — the leading cause of sudden death in eating disorders",
                      "Bradycardia (abnormally slow heart rate)",
                      "Hypotension (low blood pressure) causing dizziness and fainting",
                      "Heart failure in severe, prolonged cases",
                      "Caused primarily by electrolyte imbalances (especially low potassium, magnesium, and phosphate)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">
                      Kidneys &amp; Electrolytes
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    {[
                      "Kidney failure from chronic dehydration and electrolyte disturbance",
                      "Hypokalaemia (low potassium) — can cause fatal cardiac arrhythmias",
                      "Hyponatraemia (low sodium) — confusion, seizures, brain swelling",
                      "Metabolic alkalosis (from purging) or acidosis (from laxative misuse)",
                      "Chronic dehydration causing kidney stones and urinary tract infections",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">
                      Bones, Muscles &amp; Hormones
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    {[
                      "Osteoporosis (brittle bones) — increased fracture risk, especially dangerous in physical jobs",
                      "Muscle wasting and weakness — reduced strength and ability to work safely",
                      "Hormonal disruption — loss of menstrual periods in women, low testosterone in men",
                      "Growth stunting in young people and adolescents",
                      "Fertility problems in both men and women",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      Other Physical Complications
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    {[
                      "Dental erosion — stomach acid from repeated vomiting destroys tooth enamel",
                      "Oesophageal tears (Mallory-Weiss) from forceful vomiting",
                      "Swollen salivary glands giving a 'puffy' facial appearance",
                      "Lanugo — fine downy hair growing on the body as an insulation response",
                      "Impaired immune function — increased susceptibility to infections",
                      "Anaemia and nutritional deficiencies (iron, B12, folate, vitamin D)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Medical Emergency Signs */}
              <div className="bg-red-500/10 border-2 border-red-500/40 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <p className="text-base font-bold text-red-400">
                    Medical Emergency Signs &mdash; Call 999
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The following signs may indicate a life-threatening
                  complication of an eating disorder. They require{" "}
                  <strong className="text-white">
                    immediate emergency medical attention
                  </strong>
                  :
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Fainting or collapse",
                    "Chest pain or palpitations",
                    "Irregular or very slow heartbeat",
                    "Seizures or fitting",
                    "Confusion or disorientation",
                    "Severe muscle weakness — unable to stand",
                    "Blood in vomit",
                    "Signs of severe dehydration (dry mouth, sunken eyes, dark urine, confusion)",
                  ].map((sign, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <p className="text-sm text-white/80">{sign}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Refeeding Syndrome:
                  </strong>{" "}
                  When someone who has been severely malnourished begins to eat
                  again, there is a risk of{" "}
                  <strong className="text-white">refeeding syndrome</strong>{" "}
                  &mdash; a potentially fatal condition caused by rapid shifts
                  in electrolytes (particularly phosphate) as the body
                  transitions from a catabolic to an anabolic state. This is
                  why refeeding must be done gradually and under medical
                  supervision. You should{" "}
                  <strong className="text-white">never</strong> try to force
                  someone with a suspected eating disorder to eat.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Recognising Eating Disorders in the Workplace */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">05</span>
            Recognising Eating Disorders in the Workplace
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                People with eating disorders are often very skilled at hiding
                their condition. However, there are behavioural and physical
                signs that may indicate a colleague is struggling. It is
                important to remember that no single sign is diagnostic
                &mdash; it is a <strong>pattern of changes</strong> over
                time that should raise concern.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      Behavioural Signs
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    {[
                      "Avoiding eating with others — always finding excuses not to join for lunch or breaks",
                      "Excessive exercise beyond what the job requires — going to the gym before and after physical work",
                      "Frequent trips to the toilet immediately after eating (may indicate purging)",
                      "Wearing baggy, oversized clothing to hide weight changes",
                      "Preoccupation with food, calories, or diets — talking about food constantly or refusing to eat certain food groups",
                      "Rituals around food — cutting food into tiny pieces, eating very slowly, rearranging food on the plate",
                      "Mood changes around mealtimes — becoming anxious, irritable, or withdrawn",
                      "Social withdrawal — reducing contact with colleagues and friends",
                      "Increased secrecy — hiding food, disposing of meals, lying about eating",
                      "Excessive use of supplements, protein shakes, or 'meal replacement' products",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="h-5 w-5 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      Physical Signs
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    {[
                      "Noticeable weight changes — either loss or gain — over a period of weeks or months",
                      "Persistent fatigue and low energy despite adequate rest",
                      "Dizziness, lightheadedness, or fainting — particularly dangerous on construction sites",
                      "Sensitivity to cold — wearing extra layers even in warm weather",
                      "Dry, yellowish skin or brittle nails",
                      "Hair loss or thinning hair",
                      "Swollen cheeks or jaw (swollen salivary glands from purging)",
                      "Damaged teeth or dental problems (erosion from stomach acid)",
                      "Calluses or scarring on the knuckles (Russell's sign — from self-induced vomiting)",
                      "Poor wound healing and frequent illness due to weakened immune system",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Safety Implications on Site
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Eating disorders can directly impact workplace safety on
                  construction sites. Dizziness and fainting from malnutrition
                  or dehydration can lead to falls from height or injury from
                  tools and equipment. Muscle weakness can impair the ability
                  to carry loads safely or maintain grip. Poor concentration
                  from low blood sugar increases the risk of errors and
                  accidents. If you notice a colleague showing signs of
                  physical impairment that may be related to an eating
                  disorder, there is a duty of care to address the situation
                  &mdash; their safety and the safety of others is at stake.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Important: What These Signs Do NOT Mean
                </p>
                <p className="text-sm text-white/80">
                  Noticing one or two of these signs does not mean someone
                  definitely has an eating disorder. Many of these behaviours
                  or physical changes can have other causes. What should
                  prompt concern is a <strong className="text-white">
                  pattern</strong> of several signs occurring together or a
                  noticeable <strong className="text-white">change</strong>{" "}
                  from someone's normal behaviour over time. If you are
                  concerned, the appropriate response is a gentle, private
                  conversation — not a diagnosis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: How to Approach and Support */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">06</span>
            How to Approach &amp; Support
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                If you are concerned about a colleague, approaching them
                with care, empathy, and sensitivity can make a significant
                difference. Many people with eating disorders feel trapped
                and alone, and a compassionate conversation can be the first
                step towards seeking help. How you approach the conversation
                matters enormously.
              </p>

              {/* Step-by-step approach */}
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    How to Have the Conversation
                  </p>
                </div>
                <div className="space-y-2">
                  {[
                    "Choose a private, comfortable setting where you won't be overheard or interrupted",
                    "Be non-judgemental — approach with genuine care and concern, not criticism or alarm",
                    "Express concern about their WELLBEING, not their weight or eating — say 'I've noticed you seem stressed/tired/down lately' rather than 'I've noticed you're not eating'",
                    "Use 'I' statements — 'I'm concerned about you' rather than 'You have a problem'",
                    "Listen more than you talk — give them space to respond at their own pace",
                    "Do NOT comment on their appearance, weight, or body shape — this can be deeply triggering",
                    "Do NOT try to force them to eat or tell them they 'just need to eat properly'",
                    "Accept that they may deny there is a problem — this is common and does not mean the conversation was wasted",
                    "Let them know you care about them regardless, and that you are there whenever they are ready to talk",
                    "Gently share information about support services like the BEAT helpline",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">
                    Things to Say
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    {[
                      "'I've noticed you've seemed a bit down recently and I wanted to check in'",
                      "'I care about you and I'm here if you ever want to talk about anything'",
                      "'Whatever you're going through, you don't have to deal with it alone'",
                      "'Would it help to talk to someone professional? I can help you find support'",
                      "'There's no rush — whenever you're ready, I'm here'",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">
                    Things to Avoid
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    {[
                      "'You've lost so much weight!' or 'You look really thin'",
                      "'Just eat something — it's not that hard'",
                      "'You don't look like you have an eating disorder'",
                      "'Lots of people would love to have your problem'",
                      "Commenting on what or how much they are eating in front of others",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Support Services */}
              <div className="bg-white/5 border-2 border-purple-500/30 rounded-lg overflow-hidden">
                <div className="bg-purple-500/10 px-4 py-3 border-b border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-purple-400" />
                    <p className="text-base font-semibold text-purple-400">
                      Support Services &amp; Resources
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-purple-400 mb-1">
                      BEAT Eating Disorders Helpline
                    </p>
                    <p className="text-lg font-bold text-white mb-1">
                      0808 801 0677
                    </p>
                    <p className="text-sm text-white/80">
                      Free, confidential helpline open to anyone concerned
                      about their own or someone else&rsquo;s eating. Also
                      available via webchat at beateatingdisorders.org.uk.
                      Youthline (under 18s): 0808 801 0711.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      GP Referral
                    </p>
                    <p className="text-sm text-white/80">
                      Encourage the person to see their GP, who can assess
                      their physical health, provide initial support, and
                      refer them to a specialist eating disorder service if
                      needed. Under NICE guidelines, GPs should refer to
                      a specialist service as early as possible &mdash; early
                      intervention significantly improves outcomes.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      Specialist Eating Disorder Services
                    </p>
                    <p className="text-sm text-white/80">
                      The NHS provides specialist eating disorder services
                      in every area of the UK. Treatment may include
                      Cognitive Behavioural Therapy for eating disorders
                      (CBT-ED), the Maudsley Anorexia Nervosa Treatment for
                      Adults (MANTRA), Specialist Supportive Clinical
                      Management (SSCM), or family-based therapy. NICE
                      guidelines recommend that treatment should be delivered
                      by professionals with eating disorder expertise.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">
                      Additional Resources
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Samaritans:</strong>{" "}
                          116 123 (free, 24/7) &mdash; for anyone in
                          emotional distress
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Men Get Eating Disorders Too:
                          </strong>{" "}
                          mengetedstoo.co.uk &mdash; resources specifically
                          for men
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Mind:</strong>{" "}
                          mind.org.uk &mdash; comprehensive information
                          on eating disorders and mental health
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Mates in Mind:
                          </strong>{" "}
                          matesinmind.org &mdash; mental health support
                          specifically for the construction industry
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">
                    Recovery IS Possible
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  It is important to know and to communicate that{" "}
                  <strong className="text-white">
                    full recovery from an eating disorder is possible
                  </strong>
                  , even after many years of illness. Recovery is a process
                  that takes time, professional support, and patience. It is
                  not a straight line &mdash; there will be setbacks. But
                  with the right treatment and support, people do recover
                  and go on to live full, healthy lives. As a mental health
                  first aider, holding on to this hope and communicating it
                  to others is one of the most valuable things you can do.
                </p>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    NICE Guidelines:
                  </strong>{" "}
                  The National Institute for Health and Care Excellence (NICE)
                  publishes evidence-based guidelines for the recognition and
                  treatment of eating disorders (NG69). Key recommendations
                  include: do not use BMI alone to determine the severity of
                  an eating disorder; refer to specialist eating disorder
                  services as early as possible; offer evidence-based
                  psychological therapies delivered by eating disorder
                  specialists; and monitor physical health throughout
                  treatment. People with eating disorders should not be
                  required to reach a certain weight or BMI threshold before
                  receiving treatment.
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
        <Quiz
          title="Section 2 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
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
            <Link to="../mental-health-module-4-section-3">
              Next: Personality Disorders &amp; Complex Needs
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
