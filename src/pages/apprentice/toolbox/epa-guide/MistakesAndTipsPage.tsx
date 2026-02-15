import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const commonMistakes = [
  {
    mistake: 'Rushing the knowledge test',
    solution:
      'Read each question carefully. You have 2 hours — use the time. Read the question twice, eliminate wrong answers, then choose. Check your answers if you finish early.',
  },
  {
    mistake: 'Poor safe isolation procedure',
    solution:
      'Practise the 5-step procedure every single day until it is automatic. Failing safe isolation can result in an immediate fail of the practical, regardless of everything else.',
  },
  {
    mistake: 'Disorganised portfolio',
    solution:
      'Index your portfolio clearly with a contents page and KSB mapping grid. Make it easy for the assessor to find evidence. Use dividers, clear labels, and cross-references.',
  },
  {
    mistake: 'Not explaining reasoning during practical',
    solution:
      'The assessor needs to see your thought process, not just your actions. If they ask why you are doing something, explain your reasoning clearly. If they do not ask, you can still verbalise key decisions.',
  },
  {
    mistake: 'Leaving portfolio gaps',
    solution:
      'Cross-reference your portfolio against ALL KSBs at least 3 months before Gateway. Use a mapping grid — every KSB should have at least one piece of strong evidence. Fill gaps early.',
  },
  {
    mistake: 'Treating the professional discussion as an exam',
    solution:
      'This is a professional conversation, not a quiz. Relax, speak naturally, and share your genuine experiences. The assessor wants to hear your authentic voice, not rehearsed answers.',
  },
  {
    mistake: 'Using uncalibrated test instruments',
    solution:
      'Check calibration dates well before your assessment day. If any instrument is out of calibration, get it recalibrated or borrow/hire a calibrated replacement. Using uncalibrated instruments can invalidate your results.',
  },
  {
    mistake: 'Not practising under timed conditions',
    solution:
      'The practical is 6-8 hours but it goes fast. Practise complete tasks from start to finish, timing yourself. Know how long each activity takes so you can pace yourself on the day.',
  },
  {
    mistake: 'Cramming the night before',
    solution:
      'Last-minute cramming creates anxiety and confusion. Trust your months of preparation. The evening before, do light revision at most, prepare your equipment, and get a proper night\'s sleep.',
  },
  {
    mistake: 'Not knowing the testing sequence',
    solution:
      'The correct testing sequence (as per BS 7671 Regulation 612) must be memorised: continuity of protective conductors → continuity of ring finals → insulation resistance → polarity → EFLI → RCD → PFC. Getting this wrong shows a fundamental gap.',
  },
  {
    mistake: 'Forgetting PPE',
    solution:
      'Bring appropriate PPE to your practical assessment: safety boots, eye protection, gloves if needed. Not having correct PPE demonstrates poor professional habits and may delay or prevent your assessment.',
  },
  {
    mistake: 'Panicking when making a mistake',
    solution:
      'If you make a mistake during the practical or say something wrong in the discussion, stay calm. Acknowledge the error, correct it, and explain what you should have done. Assessors value self-awareness and the ability to learn from mistakes.',
  },
];

const tips = [
  {
    quote:
      'Start your portfolio from day one. It is so much easier to collect evidence as you go than trying to remember everything at the end. I kept a folder on my phone for site photos and added them weekly.',
    grade: 'Distinction',
    name: 'Level 3 Installation Electrician',
  },
  {
    quote:
      'In the professional discussion, do not just describe what you did — explain why you made those decisions and what you would do differently next time. That is what separates a Pass from a Distinction.',
    grade: 'Distinction',
    name: 'Level 3 Installation Electrician',
  },
  {
    quote:
      'The practical assessment is not about speed. Take your time, work safely, and check everything twice. Quality beats rushing every time. I finished with 20 minutes to spare and used it to double-check my work.',
    grade: 'Distinction',
    name: 'Level 3 Maintenance Electrician',
  },
  {
    quote:
      'I practised safe isolation so much it became automatic. In the assessment, I did not even have to think about it — my hands just did the procedure. That freed my mind to focus on the actual installation work.',
    grade: 'Merit',
    name: 'Level 3 Installation Electrician',
  },
  {
    quote:
      'Get someone to run mock professional discussions with you. My supervisor did three with me in the weeks before EPA and it made a massive difference. I knew exactly what to expect and had my answers ready.',
    grade: 'Merit',
    name: 'Level 3 Installation Electrician',
  },
  {
    quote:
      'Do not panic if you get a question wrong in the knowledge test. Move on, come back to it later. I flagged three questions I was unsure about, answered everything else, then came back with a clearer head.',
    grade: 'Pass',
    name: 'Level 3 Maintenance Electrician',
  },
];

const faqs = [
  {
    question: 'How long does EPA take in total?',
    answer:
      'The assessment window is typically 3 months from when you pass Gateway. Within that window, your three components will be scheduled — usually on different days. The knowledge test is 2 hours, the practical observation is 6-8 hours, and the professional discussion is 60 minutes. Results come within 10-15 working days of your final component.',
  },
  {
    question: 'Can I choose my EPAO?',
    answer:
      'Usually your training provider selects the EPAO, as they have existing relationships and contracts. However, you can discuss this with your training provider if you have a preference. Common EPAOs for electrical apprenticeships include Smart Assessor, City & Guilds, and EAL.',
  },
  {
    question: 'What if I am not ready for Gateway?',
    answer:
      'You can delay Gateway. There is no penalty for postponing — it simply extends your apprenticeship end date. It is far better to delay and pass first time than to rush and risk failing. Speak to your training provider about additional support.',
  },
  {
    question: 'Do I need to pass AM2 before EPA?',
    answer:
      'Yes. AM2 is a mandatory Gateway requirement for the Level 3 Installation Electrician / Maintenance Electrician standard. You must have your AM2 pass certificate before you can enter Gateway.',
  },
  {
    question: 'Can I bring reference books to the knowledge test?',
    answer:
      'This depends on your EPAO. Most allow a clean (unannotated) copy of BS 7671 and the On-Site Guide. Some also allow Guidance Note 3. Check with your training provider well in advance — they will confirm exactly what is permitted.',
  },
  {
    question: 'What happens if I fail one component?',
    answer:
      'You only need to re-sit the failed component. You get one free re-sit within the original funding band, typically within 3 months. Your training provider arranges additional support. Maximum grade on re-sit is usually Pass.',
  },
  {
    question: 'How do I prepare my portfolio?',
    answer:
      'Organise your portfolio by KSB area, with a contents page and cross-reference grid. Include a mix of evidence types: photographs, test results, witness testimonies, reflective accounts, CPD records, and certificates. Each piece of evidence should clearly state which KSBs it covers.',
  },
  {
    question: 'Will the assessor help me during the practical?',
    answer:
      'No. The assessor observes silently and takes notes. They may ask you to explain what you are doing (to assess your understanding), but they will not guide you, correct you, or hint at answers. You must work independently.',
  },
  {
    question: 'What is the pass rate for EPA?',
    answer:
      'Pass rates vary by EPAO but are generally high — typically 80-90% for well-prepared apprentices. First-attempt pass rates are higher for apprentices who have completed proper preparation with their training provider.',
  },
  {
    question: 'Can my employer attend the EPA?',
    answer:
      'Your employer does not attend the EPA assessments. The whole point of EPA is that it is an independent assessment by a third-party organisation. Your employer is involved at Gateway but not during the assessments themselves.',
  },
  {
    question: 'What certificate do I receive?',
    answer:
      'You receive an apprenticeship completion certificate from the ESFA, showing your name, the apprenticeship standard (Level 3 Installation Electrician or Maintenance Electrician), your overall grade (Pass, Merit, or Distinction), and the completion date. This is separate from your AM2 certificate.',
  },
  {
    question: 'How soon after EPA can I get my JIB Gold Card?',
    answer:
      'You can apply for your JIB Approved Electrician (Gold Card) once you have your apprenticeship completion certificate. The process takes a few weeks. You will need your EPA certificate, AM2 certificate, and evidence of your qualifications. Your employer or JIB can guide you through the application.',
  },
];

const MistakesAndTipsPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Mistakes, Tips & FAQs
        </h1>
      </div>

      {/* Common Mistakes */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <h2 className="text-base font-semibold text-white">
            Common Mistakes to Avoid ({commonMistakes.length})
          </h2>
        </div>

        {commonMistakes.map((item) => (
          <Card key={item.mistake} className="border-red-500/20 bg-white/5">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-red-400 font-semibold text-sm">
                  {item.mistake}
                </span>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-green-400 font-semibold text-sm">
                      Solution:{' '}
                    </span>
                    <span className="text-white text-sm">{item.solution}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips from Apprentices */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">
            Tips from Successful Apprentices ({tips.length})
          </h2>
        </div>

        {tips.map((tip) => (
          <Card key={tip.quote} className="border-blue-500/20 bg-white/5">
            <CardContent className="p-4 space-y-2">
              <p className="text-white text-sm italic leading-relaxed">
                &ldquo;{tip.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="inline-block px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30">
                  <span className="text-blue-400 font-bold text-xs">
                    {tip.grade}
                  </span>
                </div>
                <span className="text-white text-xs">{tip.name}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Day-Before Checklist */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">
            The Day Before — Preparation Checklist
          </h2>
        </div>

        <Card className="border-green-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            <p className="text-white text-sm">
              The day before any EPA component, go through this checklist:
            </p>
            {[
              'Confirm the time, location, and any access arrangements (parking, building entry)',
              'Check you have photo ID (driving licence or passport)',
              'Lay out everything you need the night before — do not leave packing to the morning',
              'For practical: check all instruments are calibrated, test leads are intact, lock-off devices work',
              'For knowledge test: pack calculator, pens, BS 7671 (if permitted)',
              'For professional discussion: review your portfolio, re-read your key evidence and reflective accounts',
              'Set two alarms — do not rely on one',
              'Eat a proper dinner and avoid alcohol',
              'Do light revision only — do not cram new material',
              'Get at least 7-8 hours of sleep',
              'Prepare lunch and water if you will be there all day',
              'Plan your route and add extra time for unexpected delays',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white text-sm">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* What to Do If Things Go Wrong */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <h2 className="text-base font-semibold text-white">
            If Things Go Wrong on the Day
          </h2>
        </div>

        <Card className="border-purple-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            {[
              {
                situation: 'You are running late',
                action:
                  'Call your training provider and the assessment venue immediately. Most EPAOs can accommodate a short delay. Do not just fail to show up — communicate.',
              },
              {
                situation: 'You feel unwell on the day',
                action:
                  'Contact your training provider as soon as possible. If you are genuinely ill, the assessment can be rescheduled. Attempting an assessment while unwell will affect your performance and is not recommended.',
              },
              {
                situation: 'Your test instrument is faulty',
                action:
                  'Tell the assessor immediately. If at a training provider or assessment centre, they may have a replacement available. This is why checking instruments the day before is critical.',
              },
              {
                situation: 'You do not understand a question',
                action:
                  'In the knowledge test, re-read carefully and use process of elimination. In the professional discussion, ask the assessor to rephrase or clarify. There is no penalty for asking.',
              },
              {
                situation: 'You make a significant mistake in the practical',
                action:
                  'Stop, acknowledge it, explain what went wrong and how you will correct it. Do not try to hide it. Self-awareness and correction are valued. A single mistake does not necessarily mean a fail.',
              },
              {
                situation: 'You have a panic attack or severe anxiety',
                action:
                  'Tell the assessor you need a moment. Step away briefly if needed. Assessors are trained to handle this and will give you time to compose yourself. If you cannot continue, the assessment can be rescheduled under mitigating circumstances.',
              },
              {
                situation: 'The assessment environment has a problem',
                action:
                  'Report any issues (noise, temperature, equipment problems) to the assessor or invigilator. These may be recorded as mitigating circumstances if they affect your performance.',
              },
            ].map((item) => (
              <div key={item.situation}>
                <p className="text-purple-400 font-semibold text-sm">
                  {item.situation}
                </p>
                <p className="text-white text-sm mt-0.5">{item.action}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* FAQs */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <h2 className="text-base font-semibold text-white">
            Frequently Asked Questions ({faqs.length})
          </h2>
        </div>

        {faqs.map((faq) => (
          <Card key={faq.question} className="border-amber-500/20 bg-white/5">
            <CardContent className="p-4 space-y-2">
              <h3 className="font-medium text-amber-400 text-sm">
                {faq.question}
              </h3>
              <p className="text-white text-sm">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Post-EPA Next Steps */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-elec-yellow" />
          <h2 className="text-base font-semibold text-white">
            After EPA — Your Next Steps
          </h2>
        </div>

        <Card className="border-elec-yellow/20 bg-white/5">
          <CardContent className="p-4 space-y-4">
            <p className="text-white text-sm leading-relaxed">
              Once you have passed EPA, you are a qualified Level 3 electrician.
              Here is a roadmap for what comes next:
            </p>

            {[
              {
                step: '1',
                title: 'Apply for JIB Gold Card',
                description:
                  'Apply for your JIB Approved Electrician (Gold Card) as soon as you have your completion certificate. You will need your EPA certificate, AM2 certificate, and qualification evidence. The Gold Card is the industry-recognised proof of your competence.',
              },
              {
                step: '2',
                title: 'Negotiate your pay',
                description:
                  'You are now a fully qualified electrician and should be paid accordingly. The average qualified electrician salary is £35,000-£42,000. Speak to your employer about a pay review — you are no longer an apprentice.',
              },
              {
                step: '3',
                title: 'Consider further qualifications',
                description:
                  'Level 4 Design & Verification (2396) is the natural next step if you want to design and certify installations. The 18th Edition course (2382) keeps you current with regulation updates.',
              },
              {
                step: '4',
                title: 'Competent person scheme',
                description:
                  'Once you have sufficient experience (typically 1-2 years post-qualification), you can register with a competent person scheme (NICEIC, NAPIT, ELECSA) to self-certify notifiable work under Part P.',
              },
              {
                step: '5',
                title: 'Specialisation options',
                description:
                  'Consider specialising in areas like EV charging installations, solar PV, fire alarm systems, data cabling, industrial controls, or building management systems. Specialisation often commands higher rates.',
              },
              {
                step: '6',
                title: 'Self-employment',
                description:
                  'If you want to work for yourself, you will need to register with a competent person scheme, get public liability insurance, register as self-employed with HMRC, and build your client base. Many electricians go self-employed within 2-5 years of qualifying.',
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow/20 border border-elec-yellow/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-elec-yellow text-xs font-bold">
                    {item.step}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {item.title}
                  </p>
                  <p className="text-white text-sm mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Glossary */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">
            EPA Glossary
          </h2>
        </div>

        <Card className="border-blue-500/20 bg-white/5">
          <CardContent className="p-4 space-y-3">
            {[
              { term: 'EPA', definition: 'End Point Assessment — the independent final assessment of your apprenticeship.' },
              { term: 'EPAO', definition: 'End Point Assessment Organisation — the independent body that conducts your EPA (e.g. Smart Assessor, City & Guilds, EAL).' },
              { term: 'Gateway', definition: 'The formal readiness checkpoint before EPA, where you, your employer, and training provider agree you are ready.' },
              { term: 'KSB', definition: 'Knowledge, Skills, and Behaviours — the three areas defined in your apprenticeship standard that you must demonstrate competence in.' },
              { term: 'AM2', definition: 'Achievement Measurement 2 — the practical assessment run by NET that tests installation competence, required before Gateway.' },
              { term: 'NET', definition: 'National Electrotechnical Training — the organisation that runs AM2 assessments at centres across the UK.' },
              { term: 'ST0152', definition: 'The apprenticeship standard reference number for Level 3 Installation Electrician / Maintenance Electrician (v1.2 is the current version).' },
              { term: 'STAR Method', definition: 'Situation, Task, Action, Result — a structured approach to answering questions in the professional discussion.' },
              { term: 'Portfolio', definition: 'Your collection of evidence demonstrating competence against all KSBs, used in the professional discussion.' },
              { term: 'Regulation 612', definition: 'The BS 7671 regulation that defines the correct testing sequence for initial verification.' },
              { term: 'GS38', definition: 'Health and Safety Executive guidance on test probes and leads — your voltage indicator must comply with GS38.' },
              { term: 'Safe Isolation', definition: 'The 5-step procedure for safely isolating electrical circuits before work: identify, switch off, secure, test, work.' },
              { term: 'JIB Gold Card', definition: 'The Joint Industry Board Approved Electrician card — the industry-recognised proof of your qualification and competence.' },
            ].map((item) => (
              <div key={item.term} className="flex items-start gap-2">
                <span className="text-blue-400 font-semibold text-sm min-w-[100px] flex-shrink-0">
                  {item.term}
                </span>
                <span className="text-white text-sm">{item.definition}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MistakesAndTipsPage;
