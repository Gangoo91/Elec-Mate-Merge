import { ArrowLeft, Search, CheckCircle, AlertTriangle, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'rsm-1-4-physical-signs',
    question: 'Which of the following is a common physical symptom of chronic stress?',
    options: [
      'Improved appetite and weight gain in a healthy range',
      'Persistent headaches, muscle tension (especially neck and shoulders), and disrupted sleep',
      'Increased energy levels and improved physical fitness',
      'Faster wound healing and stronger immune response',
    ],
    correctIndex: 1,
    explanation:
      'Chronic stress produces a range of physical symptoms including persistent headaches, muscle tension (particularly in the neck, shoulders, and jaw), sleep disruption (difficulty falling asleep, waking during the night, unrefreshing sleep), fatigue, digestive problems (nausea, stomach cramps, IBS), elevated blood pressure, and weakened immune function. These are caused by the prolonged activation of the stress response \u2014 elevated cortisol and adrenaline take a measurable physical toll on the body over time.',
  },
  {
    id: 'rsm-1-4-behavioural-signs',
    question:
      'An experienced electrician who has always been reliable and sociable on site has started calling in sick on Mondays, avoiding the canteen at break times, and rushing through jobs without their usual care. This pattern of behaviour MOST likely indicates:',
    options: [
      'They are simply getting lazy and need a written warning',
      'They have found a new job and are losing interest in their current work',
      'A significant change from their normal behaviour that could indicate stress, mental health difficulties, or personal crisis',
      'They are just having a bad week and will be fine by next Monday',
    ],
    correctIndex: 2,
    explanation:
      'The most important principle for recognising stress in others is to look for changes from their normal behaviour. When someone who is normally reliable starts being absent, someone who is normally sociable withdraws, or someone who takes pride in their work starts rushing and cutting corners, these are warning signs that something significant has changed. It may be stress, depression, a personal crisis, substance use, or another issue \u2014 but the pattern of behavioural change warrants a careful, supportive conversation, not punishment or dismissal.',
  },
  {
    id: 'rsm-1-4-cognitive-signs',
    question:
      'Which of the following is a cognitive symptom of stress (affecting thinking and mental processes)?',
    options: [
      'Muscle tension and headaches',
      'Increased alcohol consumption and poor timekeeping',
      'Irritability and mood swings',
      'Poor concentration, forgetfulness, indecision, and catastrophising (imagining the worst possible outcome)',
    ],
    correctIndex: 3,
    explanation:
      'Cognitive symptoms affect thinking and mental processes. They include poor concentration (difficulty focusing on tasks), forgetfulness (missing appointments, forgetting instructions), indecision (struggling to make even simple choices), negative thinking patterns (seeing everything in the worst possible light), and catastrophising (imagining the worst outcome in every situation). These are distinct from physical symptoms (muscle tension, headaches), behavioural symptoms (alcohol use, timekeeping), and emotional symptoms (irritability). Cognitive symptoms are particularly dangerous in construction because they directly impair the ability to make safe decisions.',
  },
];

const faqs = [
  {
    question: 'How do I bring up my concerns if I think a colleague is struggling?',
    answer:
      'The most important thing is to start the conversation. You do not need to be a counsellor or have all the answers \u2014 you just need to show that you have noticed and that you care. Find a private moment (not in front of the whole team), and use simple, non-judgemental language: "I\'ve noticed you\'ve been a bit quiet lately \u2014 is everything alright?" or "You don\'t seem yourself recently \u2014 anything on your mind?" Listen more than you talk. Do not try to diagnose or fix the problem. Avoid saying things like "cheer up" or "you\'ll be fine." If they open up, acknowledge what they are saying ("that sounds really tough") and gently suggest they speak to someone who can help \u2014 their GP, an EAP counsellor, the Samaritans (116 123), or the Construction Industry Helpline (0345 605 1956). If they do not want to talk, respect that \u2014 but let them know the door is open.',
  },
  {
    question: 'What if I recognise these signs in myself?',
    answer:
      'Recognising the signs in yourself is actually a strength, not a weakness. It takes self-awareness and honesty to acknowledge that you are struggling. The first step is to accept that what you are experiencing is real and valid \u2014 stress is a normal human response, not a character flaw. The next step is to talk to someone you trust: a partner, a friend, a colleague, or your GP. If you are not ready to talk to someone you know, anonymous helplines such as the Samaritans (116 123) and the Construction Industry Helpline (0345 605 1956) are available 24/7. You do not need to be in crisis to call \u2014 they are there for anyone who needs to talk. Beyond talking, practical steps include reviewing your workload, establishing boundaries around working hours, improving sleep habits, reducing alcohol intake, getting regular physical activity, and seeking professional support if symptoms persist.',
  },
  {
    question: 'Can stress symptoms look different in different people?',
    answer:
      "Yes. Stress manifests differently in different people. Some people experience predominantly physical symptoms (headaches, muscle tension, digestive problems) with very few emotional or behavioural changes. Others show mainly emotional symptoms (irritability, anxiety, low mood) with few physical complaints. Some people withdraw and go quiet; others become aggressive and confrontational. Some lose their appetite; others comfort-eat. Some cannot sleep; others sleep excessively. This is why the four-category framework (physical, emotional, behavioural, cognitive) is useful \u2014 it helps you look for signs across all domains rather than focusing on one. The key principle remains: look for changes from the person's normal baseline. Whatever their typical pattern, a significant deviation warrants attention.",
  },
  {
    question:
      'Is it my responsibility to help a struggling colleague, or should I leave it to management?',
    answer:
      'Everyone has a role to play. You do not need to be a manager, a mental health first aider, or a professional to help. Often, the most powerful intervention is simply a colleague who notices and says something. Research consistently shows that informal peer support \u2014 a mate asking "are you alright?" \u2014 is one of the most valued and effective first steps in getting someone to seek help. You are not expected to be a therapist. Your role is to notice, to ask, to listen, and to signpost towards professional help if needed. That said, if you believe someone is in immediate danger (threatening self-harm or suicide), do not hesitate to contact emergency services (999) or stay with the person and call the Samaritans (116 123) together.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following is a physical symptom of chronic stress?',
    options: [
      'Improved concentration and sharper focus',
      'Persistent fatigue, headaches, and disrupted sleep',
      'Increased confidence and self-esteem',
      'Better appetite and improved digestion',
    ],
    correctAnswer: 1,
    explanation:
      'Chronic stress causes a range of physical symptoms including persistent fatigue (even after rest), frequent headaches (especially tension headaches), sleep disruption (insomnia, waking in the night, unrefreshing sleep), muscle tension, digestive problems, elevated blood pressure, and weakened immune function. These are the physical consequences of prolonged activation of the stress response and elevated cortisol levels.',
  },
  {
    id: 2,
    question:
      'Irritability, anxiety, feeling overwhelmed, and loss of confidence are examples of which category of stress symptoms?',
    options: [
      'Physical symptoms',
      'Behavioural symptoms',
      'Emotional symptoms',
      'Cognitive symptoms',
    ],
    correctAnswer: 2,
    explanation:
      'These are emotional symptoms \u2014 changes in mood, feelings, and emotional state. Emotional symptoms of stress include irritability (short temper, overreacting to minor frustrations), anxiety (persistent worry, nervousness, sense of dread), feeling overwhelmed (the sense that demands exceed your ability to cope), low mood (sadness, flatness, loss of interest in things you normally enjoy), and loss of confidence (doubting your abilities, feeling like you are not good enough). Emotional symptoms are often the first to be noticed by others, especially irritability.',
  },
  {
    id: 3,
    question:
      'Withdrawing from social interaction, increased alcohol consumption, poor timekeeping, and rushing work are examples of which category of stress symptoms?',
    options: [
      'Physical symptoms',
      'Emotional symptoms',
      'Cognitive symptoms',
      'Behavioural symptoms',
    ],
    correctAnswer: 3,
    explanation:
      'These are behavioural symptoms \u2014 observable changes in what a person does. Behavioural symptoms include withdrawing from social situations (eating alone, avoiding the canteen, leaving site as soon as possible), increased substance use (alcohol, drugs, smoking), changes in timekeeping (arriving late, leaving early, increased sick days), changes in work quality (rushing, cutting corners, making uncharacteristic mistakes), and changes in eating habits. Behavioural symptoms are particularly important because they are the ones most visible to colleagues and supervisors.',
  },
  {
    id: 4,
    question:
      'A normally confident and decisive site supervisor has been struggling to make simple decisions, forgetting to order materials, and repeatedly saying "everything is going to go wrong." These are examples of:',
    options: [
      'Physical symptoms of stress',
      'Emotional symptoms of stress',
      'Cognitive symptoms of stress \u2014 poor concentration, forgetfulness, indecision, and catastrophising',
      'Normal behaviour that does not indicate any problem',
    ],
    correctAnswer: 2,
    explanation:
      'These are cognitive symptoms \u2014 changes in thinking and mental processing. Indecision (struggling with choices), forgetfulness (missing tasks, losing track of information), and catastrophising ("everything is going to go wrong") are all cognitive effects of stress. When the brain is overwhelmed by stress, cognitive resources are diverted to monitoring threats, leaving less capacity for planning, memory, and rational decision-making. For a construction supervisor, these cognitive impairments directly affect their ability to manage work safely and effectively.',
  },
  {
    id: 5,
    question: 'The MOST important principle for recognising stress in a colleague is:',
    options: [
      'Checking whether they match a specific checklist of stress symptoms',
      'Looking for changes from their normal behaviour \u2014 any significant deviation from how they usually are',
      'Waiting until they explicitly ask for help before getting involved',
      'Only paying attention if they show physical symptoms, as emotional symptoms are not reliable indicators',
    ],
    correctAnswer: 1,
    explanation:
      "The most important principle is to look for changes from the person's normal baseline. Everyone is different \u2014 one person's \"normal\" may be another person's warning sign. What matters is whether this specific person is behaving differently from how they usually behave. A normally chatty person who goes quiet, a normally reliable person who starts being late, a normally meticulous worker who starts making mistakes \u2014 these changes from the baseline are the most reliable indicators that something is wrong. You do not need a clinical checklist; you need to know your colleagues well enough to notice when they change.",
  },
  {
    id: 6,
    question:
      'An apprentice who was previously enthusiastic and engaged has become quiet, withdrawn, and is making frequent mistakes. A colleague asks them "are you alright?" in private. Why is this simple action so important?',
    options: [
      'It is not important \u2014 mental health conversations should only be conducted by trained professionals',
      'Because informal peer support is often the first and most valued step in getting someone to acknowledge they are struggling and seek help',
      'Because it is a legal requirement under the Health and Safety at Work etc. Act 1974',
      "Because it allows the colleague to diagnose the apprentice's condition and prescribe treatment",
    ],
    correctAnswer: 1,
    explanation:
      'Research consistently shows that informal peer support \u2014 a colleague who notices and asks a simple, caring question \u2014 is one of the most powerful first steps in the help-seeking process. For many people, especially in construction where cultural barriers are strong, the moment someone notices and asks is the moment the wall of silence starts to break down. You do not need to be a professional. You do not need to diagnose anything. You just need to notice, ask, listen, and if appropriate, signpost towards professional help. That simple conversation could be life-changing.',
  },
  {
    id: 7,
    question:
      'An experienced electrician who has always taken pride in their work has started rushing through installations, not checking their own work, and leaving site early. Their colleagues assume they have "just become lazy." According to what you have learned in this section, what is a more likely explanation?',
    options: [
      'They have indeed become lazy and need performance management',
      'These behavioural changes \u2014 rushing work, reduced quality, leaving early \u2014 are classic behavioural symptoms of stress and may indicate that they are struggling with a significant underlying issue',
      'They are probably looking for a new job and have lost interest',
      'Experienced electricians do not suffer from stress because they have seen it all before',
    ],
    correctAnswer: 1,
    explanation:
      'Behavioural changes \u2014 especially in someone who previously showed the opposite pattern (pride in work, quality focus, reliability) \u2014 are classic warning signs of stress or mental health difficulty. Jumping to the conclusion of "laziness" misses the underlying cause and could make the situation worse (disciplinary action adds stress to someone already struggling). The appropriate response is a private, supportive conversation to explore what might be driving the change, not punishment. Experienced electricians are just as vulnerable to stress as anyone else \u2014 experience does not provide immunity.',
  },
  {
    id: 8,
    question:
      'Which helpline is available 24/7 and provides free, confidential support specifically for construction workers?',
    options: [
      'ACAS (Advisory, Conciliation and Arbitration Service)',
      'The Construction Industry Helpline \u2014 0345 605 1956',
      'Companies House customer services',
      'The HMRC CIS helpline',
    ],
    correctAnswer: 1,
    explanation:
      "The Construction Industry Helpline (0345 605 1956), run by the Lighthouse Construction Industry Charity, provides free, confidential support specifically for construction workers and their families. It covers mental health, wellbeing, financial advice, legal guidance, and crisis support. It is available 24/7. The Samaritans (116 123) also provide 24/7 free confidential support for anyone in distress. Both services should be in every construction worker's phone. You do not need to be in crisis to call.",
  },
];

export default function RSMModule1Section4() {
  useSEO({
    title: 'Recognising the Signs of Stress | Resilience & Stress Management Module 1.4',
    description:
      'Learn to recognise the physical, emotional, behavioural, and cognitive symptoms of stress in yourself and your colleagues on construction sites.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Search className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Recognising the Signs
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            How stress manifests physically, emotionally, behaviourally, and cognitively &mdash; and
            how to spot the warning signs in yourself and others
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Physical:</strong> Headaches, fatigue, muscle tension, sleep disruption
              </li>
              <li>
                <strong>Emotional:</strong> Irritability, anxiety, overwhelm, low mood
              </li>
              <li>
                <strong>Behavioural:</strong> Withdrawing, substance use, poor timekeeping, rushing
              </li>
              <li>
                <strong>Cognitive:</strong> Poor focus, forgetfulness, indecision, catastrophising
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Early detection:</strong> The sooner you spot stress, the easier it is to
                address
              </li>
              <li>
                <strong>Self-awareness:</strong> Recognising your own signs lets you act before
                crisis
              </li>
              <li>
                <strong>Colleagues:</strong> You may notice before they do
              </li>
              <li>
                <strong>Safety:</strong> Cognitive and behavioural symptoms directly increase
                accident risk
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Identify the physical symptoms of stress and explain their physiological basis',
              'Describe the emotional symptoms of stress and their impact on wellbeing',
              'Recognise the behavioural symptoms of stress that are most visible to others',
              'Explain the cognitive symptoms of stress and their implications for safety',
              'Apply the principle of "change from normal" to recognise stress in colleagues',
              'Know the key support resources available to construction workers',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Physical Symptoms */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Physical Symptoms
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Physical symptoms are the body&rsquo;s way of signalling that the stress response
                has been active for too long. As we learned in Section 1, prolonged activation of
                the sympathetic nervous system and elevated cortisol levels produce measurable,
                physical effects on the body. These symptoms are not &ldquo;in your head&rdquo;
                &mdash; they are real, physiological consequences of chronic stress.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Common Physical Symptoms</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Persistent headaches</strong> &mdash;
                      particularly tension headaches that feel like a tight band around the head.
                      Caused by sustained muscle tension in the scalp, neck, and shoulders.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Muscle tension</strong> &mdash; especially in
                      the neck, shoulders, jaw, and lower back. You may notice you are clenching
                      your jaw or holding your shoulders high without realising it. For electricians
                      who already have physical demands on their body, stress-related muscle tension
                      compounds existing aches and pains.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fatigue and exhaustion</strong> &mdash; feeling
                      tired even after sleep. The body is burning energy maintaining the stress
                      response, leaving less for normal daily activities. This is not laziness
                      &mdash; it is physiological depletion.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Sleep disruption</strong> &mdash; difficulty
                      falling asleep, waking in the early hours with racing thoughts, or sleeping
                      but waking unrefreshed. Elevated cortisol disrupts the normal sleep cycle.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Digestive problems</strong> &mdash; nausea,
                      stomach cramps, diarrhoea, constipation, or the worsening of conditions like
                      IBS. The gut-brain connection means that stress directly affects digestive
                      function.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Weakened immunity</strong> &mdash; catching
                      colds, infections, and illnesses more frequently. Cortisol suppresses the
                      immune system, making the body more vulnerable to pathogens.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Elevated blood pressure</strong> and increased
                      heart rate. Over time, chronic stress contributes to cardiovascular disease
                      risk.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Construction Context</p>
                <p className="text-sm text-white">
                  Physical symptoms of stress are particularly problematic in construction because
                  they are easily attributed to the physical demands of the job itself. An
                  electrician with persistent headaches, fatigue, and muscle tension may assume
                  these are just the result of hard physical work &mdash; and they might be, in
                  part. But if these symptoms persist even on rest days, worsen over time, or appear
                  alongside other categories of symptoms, stress is likely a contributing factor.{' '}
                  <strong className="text-white">
                    The danger is normalising these symptoms as &ldquo;just part of the job.&rdquo;
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Emotional Symptoms */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Emotional Symptoms
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Emotional symptoms reflect changes in mood, feelings, and emotional regulation. When
                the stress response is chronically activated, the brain&rsquo;s emotional regulation
                systems become overwhelmed, making it harder to manage feelings and maintain
                emotional equilibrium.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Emotional Symptoms</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Irritability</strong> &mdash; a short fuse,
                      snapping at colleagues or family over minor issues, overreacting to small
                      frustrations. Things that would normally not bother you become infuriating. On
                      site, this can damage relationships with colleagues, clients, and
                      subcontractors.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Anxiety</strong> &mdash; persistent worry that
                      goes beyond the specific situation. A generalised sense of dread or unease.
                      Nervousness about things that would not normally concern you. Physical
                      manifestations such as a tight chest, shortness of breath, or a churning
                      stomach.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Feeling overwhelmed</strong> &mdash; the sense
                      that demands are exceeding your ability to cope. Everything feels too much.
                      Even simple tasks feel like mountains. The to-do list feels impossible.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Low mood</strong> &mdash; sadness, flatness,
                      loss of interest in things you normally enjoy. A feeling that nothing matters.
                      Difficulty finding pleasure or motivation. If persistent, this may indicate
                      depression and warrants professional assessment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Loss of confidence</strong> &mdash; doubting
                      your abilities, second-guessing decisions, feeling like you are not good
                      enough. An experienced electrician may suddenly feel uncertain about work they
                      have done hundreds of times.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Emotional symptoms are often the first to be noticed by others, particularly
                irritability. In construction, where communication tends to be direct and sometimes
                blunt, a colleague who suddenly starts snapping at everyone or becoming visibly
                upset over minor issues is often showing the emotional impact of stress that they
                may not even be aware of themselves.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Behavioural Symptoms */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Behavioural Symptoms
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Behavioural symptoms are changes in what a person <em>does</em> &mdash; their
                observable actions and habits. These are particularly important because they are the
                most visible to colleagues, supervisors, and family members. Often, other people
                notice behavioural changes before the person themselves recognises what is
                happening.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Behavioural Symptoms</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Withdrawing</strong> &mdash; pulling back from
                      social interaction. Eating alone instead of with the team. Leaving site
                      immediately at the end of the day. Avoiding conversations. Going quiet in
                      toolbox talks. Declining social invitations.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Increased alcohol or substance use</strong>{' '}
                      &mdash; drinking more in the evenings to &ldquo;switch off,&rdquo; using
                      substances to cope with anxiety or sleep problems, arriving at work hungover.
                      In construction, where pub culture and after-work drinking are common, it can
                      be difficult to distinguish between social drinking and stress-driven
                      self-medication.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Poor timekeeping</strong> &mdash; arriving
                      late, leaving early, increased sick days (especially Mondays and Fridays),
                      extended breaks. Not because of laziness, but because getting up and facing
                      the day feels increasingly difficult.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Rushing work</strong> &mdash; hurrying through
                      tasks without the usual care and attention. Skipping quality checks. Not
                      testing properly. Cutting corners on safety procedures. The person&rsquo;s
                      capacity to care about quality has been eroded by stress.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Changes in eating habits</strong> &mdash; loss
                      of appetite, skipping meals, or comfort-eating and relying on fast food and
                      sugary snacks for energy. Weight changes (loss or gain) over a period of
                      weeks.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Construction Example</p>
                <p className="text-sm text-white">
                  An experienced electrician who has always been the first to arrive, who takes
                  meticulous pride in their work, and who is always up for a laugh in the canteen
                  has gradually changed. They arrive late three mornings a week. They eat lunch
                  alone in their van. Their installation work, which was always immaculate, now has
                  snags. A colleague mentions they smell of alcohol on Monday mornings. Their mates
                  laugh it off and say they are &ldquo;having a rough patch.&rdquo;{' '}
                  <strong className="text-white">
                    These are not minor issues &mdash; they are a pattern of behavioural change that
                    signals significant distress. Someone needs to have a conversation.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Cognitive Symptoms */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Cognitive Symptoms
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Cognitive symptoms affect thinking, concentration, memory, and decision-making.
                These are arguably the most dangerous symptoms in a construction context because
                they directly impair the mental processes needed to work safely.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Cognitive Symptoms</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Poor concentration</strong> &mdash; difficulty
                      focusing on the task at hand. The mind constantly wanders to worries and
                      problems. Reading the same paragraph of a specification three times without
                      taking it in. Losing track of what you were doing mid-task.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Forgetfulness</strong> &mdash; forgetting to
                      order materials, missing appointments, losing track of which circuits have
                      been tested, forgetting instructions given in the morning by lunchtime.
                      Working memory is impaired because cognitive resources are consumed by stress.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Indecision</strong> &mdash; struggling to make
                      even simple decisions. Should I use 2.5mm or 4mm cable for this circuit? What
                      order should I tackle these tasks? The ability to weigh options and choose
                      decisively is compromised.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Negative thinking</strong> &mdash; seeing
                      everything in the worst possible light. Interpreting neutral events as
                      negative. Focusing on what has gone wrong and ignoring what has gone right.
                      Feeling hopeless about the future.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Catastrophising</strong> &mdash; imagining the
                      worst possible outcome in every situation. &ldquo;If this EICR fails, the
                      client will sue me, I will lose my business, my family will leave me.&rdquo;
                      The mind spirals from a manageable problem to an imagined disaster.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Safety Implication</p>
                </div>
                <p className="text-sm text-white">
                  In electrical work, cognitive impairment is potentially fatal. An electrician who
                  cannot concentrate, who forgets which circuits are isolated, who cannot make clear
                  decisions under pressure, or who is so consumed by worry that they are mentally
                  &ldquo;elsewhere&rdquo; while physically working on a live installation is at
                  serious risk of harming themselves or others.{' '}
                  <strong className="text-white">
                    Cognitive symptoms of stress are a direct threat to site safety and must be
                    taken as seriously as any physical hazard.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Recognising Signs in Others */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Recognising Signs in Others
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Recognising stress in yourself requires self-awareness. Recognising stress in others
                requires observation, empathy, and the courage to act. The single most important
                principle is:
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-base text-white leading-relaxed">
                  <strong>&ldquo;Look for changes from normal behaviour.&rdquo;</strong>
                </p>
                <p className="text-sm text-white mt-2">
                  Everyone is different. What is normal for one person may be unusual for another.
                  The key is not matching a person to a checklist of symptoms &mdash; it is noticing
                  when they are behaving differently from how they usually behave. A change from
                  baseline is the most reliable early warning sign.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">What to Look For</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Someone chatty going quiet</strong> &mdash; or
                      someone quiet becoming unusually talkative or agitated
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Someone reliable becoming erratic</strong>{' '}
                      &mdash; missed starts, forgotten tasks, uncharacteristic mistakes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Someone calm becoming irritable</strong>{' '}
                      &mdash; snapping at colleagues, overreacting to minor issues, conflict
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Someone sociable becoming withdrawn</strong>{' '}
                      &mdash; avoiding the canteen, eating alone, leaving immediately at end of day
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Changes in appearance</strong> &mdash; looking
                      tired, unkempt, weight changes, not taking care of themselves
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Someone proud of their work cutting corners
                      </strong>{' '}
                      &mdash; rushing, skipping tests, leaving work unfinished
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Construction Examples</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Experienced electrician making mistakes:
                      </strong>{' '}
                      A 15-year veteran who has always produced flawless work has had three snags
                      called back in the past month. They seem distracted, forget where they left
                      their tools, and snap when asked about it. This is not incompetence &mdash;
                      this is a skilled professional whose cognitive and emotional resources are
                      being consumed by stress.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Apprentice going quiet:</strong> A second-year
                      apprentice who was enthusiastic, asked lots of questions, and always
                      volunteered for tasks has gone silent. They arrive, do the minimum, and leave.
                      They have stopped asking questions. When their supervisor checks in, they say
                      &ldquo;I&rsquo;m fine.&rdquo; They are not fine.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Colleague drinking every night:</strong> A
                      self-employed sparky mentions that he &ldquo;needs a few pints to switch
                      off&rdquo; every evening. He laughs about it. But over the past three months,
                      &ldquo;a few pints&rdquo; has become a bottle of wine, then spirits. He is
                      arriving on site looking rough. This is not social drinking &mdash; this is
                      self-medication for stress, and it is a warning sign that needs addressing.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                If you notice these signs in a colleague, the most important thing you can do is{' '}
                <strong>have a private, non-judgemental conversation</strong>. You do not need to be
                a trained counsellor. A simple &ldquo;I&rsquo;ve noticed you&rsquo;ve been a bit
                different lately &mdash; is everything alright?&rdquo; can be the opening that
                someone has been waiting for. And if they are not ready to talk, let them know you
                are there when they are.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary &amp; Support Resources
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has covered the four categories of stress symptoms and how to recognise
                them in yourself and others. The key takeaways are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Physical symptoms</strong> &mdash; headaches,
                    muscle tension, fatigue, sleep disruption, digestive problems, weakened
                    immunity. These are real physiological effects, not imagined.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Emotional symptoms</strong> &mdash; irritability,
                    anxiety, feeling overwhelmed, low mood, loss of confidence. Often the first
                    symptoms noticed by others.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Behavioural symptoms</strong> &mdash;
                    withdrawing, increased substance use, poor timekeeping, rushing work. Most
                    visible to colleagues and supervisors.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Cognitive symptoms</strong> &mdash; poor
                    concentration, forgetfulness, indecision, catastrophising. The most dangerous
                    category for construction safety.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Look for changes from normal</strong> &mdash; the
                    most reliable indicator in others is a significant deviation from their usual
                    behaviour.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Have the conversation</strong> &mdash; a simple
                    &ldquo;are you alright?&rdquo; from a colleague can be the first step to getting
                    help.
                  </span>
                </li>
              </ul>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Support Resources</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Samaritans:</strong> 116 123 (free, 24/7,
                      confidential) &mdash; for anyone who needs to talk
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Construction Industry Helpline:</strong> 0345
                      605 1956 (free, 24/7) &mdash; Lighthouse Construction Industry Charity
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Mates in Mind:</strong> matesinmind.org &mdash;
                      mental health awareness for construction
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Your GP:</strong> Can refer to NHS talking
                      therapies, prescribe medication if appropriate, and provide sick notes if
                      needed
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Congratulations:</strong> You have completed
                  Module 1 &mdash; Understanding Stress. You now have a solid foundation in stress
                  science, the stress-performance relationship, the specific risks facing
                  construction workers, and how to recognise the warning signs. In Module 2, we will
                  move from understanding stress to <strong>managing</strong> it &mdash; with
                  practical strategies, coping techniques, and resilience-building tools that you
                  can apply immediately on site and at home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-2">
              Next: Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
