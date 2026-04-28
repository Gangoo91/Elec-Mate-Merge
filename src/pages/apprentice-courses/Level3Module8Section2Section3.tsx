/**
 * Level 3 · Module 8 · Section 2 · Sub 3 — Exam day preparation
 *
 * Mirrors L2 Module 8 Section 2 Sub 3 in voice and design but tailored to L3:
 *   - Closed-book preparation: knowing BS 7671 structure cold (no book in the room).
 *   - Multiple unit assessments across the academic year — pacing your revision per unit.
 *   - Sat at the centre under invigilated conditions (typically on-screen).
 *   - The L3 candidate is more often a working apprentice juggling site work + study.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Exam day preparation for the L3 paper | Level 3 Module 8.2.3 | Elec-Mate';
const DESCRIPTION =
  'The 24-hour run-up to a Level 3 closed-book unit assessment — what to revise the night before, what to pack, what to eat, sleep strategy and how to walk into the centre with the right mindset for closed-book sittings.';

const checks = [
  {
    id: 'l3-m8-s2-sub3-night',
    question:
      "It is the night before your Unit 305 (Electrical Systems Design) paper. You have done six full mocks across the last fortnight, averaging 72-78%. What is the most useful single hour of revision you can do tonight?",
    options: [
      "Re-read all of BS 7671 from cover to cover.",
      "Sit a seventh full mock under exam conditions.",
      "Walk through your mock-result error log — review the questions you got wrong, confirm you understand the right answer, and refresh the formula bank (Vd, Zs, CCC after derating, three-phase line/phase). One hour, no new material, no panic-cramming.",
      "Stay up until 2am cramming three-phase theory you've never properly understood.",
    ],
    correctIndex: 2,
    explanation:
      "Night-before revision should consolidate, not introduce. New material at this point creates anxiety and rarely sticks. Revisiting your error log targets the exact gaps you've already identified, refreshes the formula bank, and leaves you confident going into the morning. Full mocks the night before exhaust you. Cramming new material undermines sleep — and sleep is the single biggest performance multiplier on the day.",
  },
  {
    id: 'l3-m8-s2-sub3-pack',
    question:
      "You're walking out the door for your Unit 304 (Inspection, Testing and Commissioning) paper. The centre is on-screen, closed-book, invigilated. What do you pack?",
    options: [
      "Photo ID, candidate confirmation letter or email, basic non-programmable scientific calculator (in case the on-screen one fails), bottle of water, snack for AFTER the exam, and a watch (analogue) — phones are not permitted in the exam room.",
      "Your full BS 7671, the OSG, your revision notes, a smartphone for last-minute checking and a bag of energy drinks.",
      "Just yourself — the centre provides everything.",
      "A pencil case full of highlighters and your full revision binder.",
    ],
    correctIndex: 0,
    explanation:
      "L3 closed-book exam packing essentials: photo ID (the centre will not let you sit without it), the candidate confirmation letter, a basic non-programmable scientific calculator as backup (most centres provide on-screen but a backup is reassuring), water, post-exam snack, analogue watch (phones are banned). Notes, BS 7671 and the OSG are forbidden in the room — bringing them in is grounds for disqualification. Energy drinks spike then crash; water is better.",
  },
  {
    id: 'l3-m8-s2-sub3-arrive',
    question:
      "Your Unit 302 paper starts at 09:30. The centre is 20 minutes from home. What time do you aim to arrive?",
    options: [
      "09:25 — five minutes early is plenty.",
      "09:00 — half an hour early. Gives you time to use the toilet, settle nerves, sign in, get briefed, and not start the paper with adrenaline still spiking from a rushed arrival.",
      "08:00 — an hour and a half early so you can do last-minute revision in the car park.",
      "Whenever — the start time is flexible.",
    ],
    correctIndex: 1,
    explanation:
      "Aim for 30 minutes early. Five minutes is too tight — any traffic delay and you're sitting the paper with cortisol still pumping. An hour and a half is too long — last-minute revision in the car park increases anxiety without adding knowledge, and your concentration is finite. 30 minutes is the sweet spot: time to sign in, use the toilet, settle, and walk into the room calm rather than rushed.",
  },
];

const faqs = [
  {
    question:
      "Do I need to bring anything other than ID for an L3 closed-book unit assessment?",
    answer:
      "Photo ID (passport, driving licence, or another centre-accepted form) plus your candidate confirmation letter or email is the minimum. Most centres also let you bring a basic non-programmable scientific calculator, a clear water bottle (label removed) and a quiet snack for AFTER the exam. Phones, smartwatches, BS 7671, the OSG, your notes and any reference material are not permitted in the room. Confirm the exact rules with your centre at least a week ahead — they vary slightly between training providers.",
  },
  {
    question:
      "Should I sit a full mock the day before, or rest?",
    answer:
      "Rest beats cramming. A full mock the day before exhausts you and rarely improves performance. The most useful single hour of pre-exam revision is reviewing your mock error log — the questions you've already got wrong are the ones with the highest payoff for re-reading. Do that for an hour, then close the books, eat well, and sleep early.",
  },
  {
    question:
      "How does sleep affect L3 paper performance?",
    answer:
      "Massively. Sleep is the single biggest controllable performance variable on exam day. The closed-book L3 papers test recall under time pressure — both of which collapse under sleep deprivation. Aim for 7-8 hours the night before, ideally going to bed at your normal time (not earlier — you'll lie awake) and getting up early enough to eat a proper breakfast.",
  },
  {
    question:
      "What should I eat before the exam?",
    answer:
      "Slow-release carbohydrates (porridge, wholemeal toast, eggs) eaten ~90 minutes before the start. Avoid heavy meals (sleepy), high-sugar breakfasts (spike then crash) and caffeine overload (jittery, distracts from focus). One coffee or tea with breakfast is fine if it's your normal routine. Drink water steadily — dehydration is a meaningful performance hit and most candidates underestimate it.",
  },
  {
    question:
      "I'm a working apprentice — when should I take the day before off?",
    answer:
      "If you can. A day off the day before lets you eat properly, sleep properly, and revise calmly without rushing home from a long shift. Many employers will allow exam-day and exam-day-prior leave for apprenticeship assessments — ask early. If you can't take the day off, finish work early, go straight home, eat a proper meal, do an hour of error-log review and sleep at your normal time.",
  },
  {
    question:
      "I get exam anxiety badly. What actually helps?",
    answer:
      "Three things, in order. First, preparation — anxiety is partly your brain telling you you're not ready, so being objectively well-prepared (mock results above 70%) reduces the volume. Second, breathing — slow box breathing (4 in, 4 hold, 4 out, 4 hold) before walking in calms the autonomic nervous system. Third, normalisation — the L3 unit papers are built to be passed by prepared candidates; you are not facing a trick exam. If anxiety is severe, talk to your tutor about access arrangements (extra time, separate room) — they exist for a reason.",
  },
];

export default function Level3Module8Section2Section3() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> How to Pass Exams
          </button>

          <PageHero
            eyebrow="Module 8 · Section 2 · Subsection 3"
            title="Exam day preparation for the L3 paper"
            description="The 24-hour run-up to a Level 3 closed-book unit assessment — what to revise the night before, what to pack, what to eat, sleep strategy and how to walk into the centre with the right mindset for a calm, well-paced paper."
            tone="emerald"
          />

          <TLDR
            points={[
              "Night before: 1 hour of error-log review (NOT a full mock, NOT new material). Eat well, sleep at your normal time, lay out everything you need for the morning.",
              "Pack: photo ID, candidate confirmation letter, backup non-programmable calculator, water, post-exam snack, analogue watch. NO phone, NO smartwatch, NO notes, NO BS 7671 — closed-book means closed-book.",
              "Arrive 30 minutes early. Sign in, use the toilet, settle. Walk into the exam room calm rather than rushed — adrenaline burns the working memory you need for the calculations.",
              "L3 working apprentices: take the day off if you can. If not, leave work early, eat properly, do an hour of error-log review, sleep at your normal time.",
            ]}
          />

          <ContentEyebrow>The 24 hours before the paper</ContentEyebrow>

          <ConceptBlock
            title="Consolidate, don't cram"
            plainEnglish="The night before a closed-book L3 unit assessment is for consolidation, not for new material. New material at this point rarely sticks, undermines your confidence and steals sleep. The single highest-yield activity is reviewing the questions you've already got wrong in mocks — the gaps you already know about."
            onSite="Most candidates who fail an L3 paper they were on track for failed because they panic-crammed something new the night before, slept badly, and walked in shaky. The well-prepared candidate stops trying to learn at 8pm the night before and trusts the work they've already done."
          >
            <p>The 24-hour run-up checklist:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Evening before, 5pm-7pm</strong> — review your mock error log
                (every question you got wrong, with the right answer and why). Refresh
                the formula bank for the relevant unit (Unit 304: Zs limits, IR
                thresholds, RCD operating values; Unit 305: voltage drop, CCC after
                derating, Zs design check; Unit 302: three-phase line/phase, transformer
                ratios, AC waveform).
              </li>
              <li>
                <strong>7pm</strong> — close the books. Eat a proper meal (slow-release
                carbs, protein, vegetables; avoid alcohol).
              </li>
              <li>
                <strong>Evening</strong> — do something genuinely relaxing. Watch
                something, see family, walk. Anything that is not exam-related. Your
                brain consolidates while you switch off.
              </li>
              <li>
                <strong>9pm-10pm</strong> — pack everything you need for the morning.
                Lay it by the door. ID, confirmation letter, calculator, water, snack,
                watch. One bag, sealed.
              </li>
              <li>
                <strong>Bed at your normal time</strong> — not earlier (you'll lie
                awake). Aim for 7-8 hours. If anxiety is keeping you awake, slow box
                breathing (4 in, 4 hold, 4 out, 4 hold) for 5 minutes before lights out.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The morning of the paper</ContentEyebrow>

          <ConceptBlock
            title="The 90-minute breakfast rule"
            plainEnglish="Eat ~90 minutes before the paper starts. That gives the food time to digest enough that you're not sluggish, but the nutrients are fully available when you need them. Slow-release carbs (porridge, wholemeal toast) plus protein (eggs, yoghurt) plus a banana for potassium beats a sugar bomb every time."
            onSite="Skipping breakfast is one of the most common L3 candidate mistakes. The 90-minute closed-book paper is mentally taxing — your brain runs on glucose and you need a steady supply, not a spike-then-crash from a sugary cereal."
          >
            <p>The morning routine — work backwards from the start time:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Start time minus 3 hours</strong> — wake up. Don't oversleep, don't
                rush. Shower, get dressed in something comfortable.
              </li>
              <li>
                <strong>Start time minus 2 hours</strong> — eat breakfast. Slow-release
                carbs, protein, a banana, water. One coffee or tea if it's your normal
                routine.
              </li>
              <li>
                <strong>Start time minus 90 minutes</strong> — final pack-check. ID, letter,
                calculator, water, snack, watch. Phone going in the car (or in your bag,
                switched off, before you reach the centre).
              </li>
              <li>
                <strong>Start time minus 60 minutes</strong> — leave for the centre. Pad
                for traffic. If the journey is normally 20 minutes, allow 40.
              </li>
              <li>
                <strong>Start time minus 30 minutes</strong> — arrive at the centre. Sign
                in, use the toilet, settle. Do NOT do last-minute revision — it spikes
                anxiety without adding knowledge.
              </li>
              <li>
                <strong>Start time minus 5 minutes</strong> — in the room, seated,
                calculator on the desk, ID visible. Slow breathing. Trust the
                preparation.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What to pack — and what NOT to</ContentEyebrow>

          <ConceptBlock
            title="The closed-book packing list"
            plainEnglish="Closed-book means closed-book. Bringing BS 7671 or your notes into the exam room is grounds for disqualification — the centre invigilator will check bags. The packing list is short and specific: ID, confirmation, backup calculator, water, snack for after, watch."
            onSite="The biggest packing mistake is bringing the phone into the exam room. Most centres confiscate phones at the door — but a phone in your pocket discovered mid-exam is treated as cheating. Leave it in the car or in a sealed bag handed to the invigilator at sign-in."
          >
            <p>What goes in the bag:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Photo ID</strong> — passport, driving licence, or another
                centre-accepted form. No ID = no exam. Confirm in advance which forms
                your centre accepts.
              </li>
              <li>
                <strong>Candidate confirmation letter or email</strong> — printed or
                screenshotted (most centres accept either). Has your candidate number on
                it.
              </li>
              <li>
                <strong>Basic non-programmable scientific calculator</strong> — backup in
                case the on-screen calculator misbehaves or the centre's setup is
                different from what you expected. Programmable calculators are NOT
                permitted.
              </li>
              <li>
                <strong>Clear water bottle</strong> — label removed (centres ban printed
                labels in case of hidden notes).
              </li>
              <li>
                <strong>Snack for AFTER the exam</strong> — banana, energy bar. You'll
                want it on the way home.
              </li>
              <li>
                <strong>Analogue watch</strong> — phones and smartwatches are banned, but
                most rooms have a wall clock and the on-screen timer counts down. A
                cheap analogue watch is a cheap insurance against losing track.
              </li>
            </ul>
            <p>What does NOT go in the bag (or in your pockets):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Phone, smartwatch, fitness tracker — leave in the car.</li>
              <li>BS 7671, OSG, revision notes, flashcards — closed-book means closed-book.</li>
              <li>Programmable or graphing calculator.</li>
              <li>Pencil case full of highlighters — most centres provide pen, paper.</li>
              <li>Anything that could be mistaken for a hidden note (printed water bottle labels, written-on tissues).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Sleep, food and caffeine</ContentEyebrow>

          <ConceptBlock
            title="The single biggest controllable performance variable"
            plainEnglish="Sleep beats every other intervention you can make in the 24 hours before the paper. The closed-book L3 papers test recall under time pressure, and both collapse under sleep deprivation. 7-8 hours the night before is the target — and going to bed at your normal time (not earlier) is the way to get there."
            onSite="Most candidates who under-perform in L3 mocks-vs-exam day under-performed because they didn't sleep. Caffeine doesn't fix it — it masks the symptoms but the recall and the maths are still slower. Sleep is non-negotiable."
          >
            <p>The food, drink and caffeine framework:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Day before</strong> — eat normally. Drink plenty of water. Avoid
                alcohol (it disrupts sleep architecture even if you fall asleep fine).
              </li>
              <li>
                <strong>Evening</strong> — last caffeine by 2pm if you're sensitive,
                4pm at the latest. A late coffee will keep you awake and steal an
                hour off your sleep.
              </li>
              <li>
                <strong>Morning of</strong> — slow-release carbs, protein, banana, water.
                Avoid sugary cereal, pastries, energy drinks.
              </li>
              <li>
                <strong>Caffeine</strong> — one normal coffee or tea with breakfast if
                that's your routine. Don't suddenly drink three to &quot;get sharp&quot;
                — caffeine on a non-tolerant system makes you jittery, not focused.
              </li>
              <li>
                <strong>Hydration</strong> — sip water through the morning. The L3
                paper rooms are usually warm, and dehydration is a measurable
                performance hit.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Pulling an all-nighter the day before the paper"
            whatHappens={
              <>
                Working apprentice finishes a long shift at 6pm, arrives home, eats a
                quick takeaway, then sits up until 2am cramming three-phase theory and
                voltage drop calculations they haven&apos;t mastered. They sleep 4 hours,
                wake up at 7am for a 9:30am start, skip breakfast because they&apos;re
                running late, drink three coffees in the car, and arrive at the centre
                jittery and exhausted. They read questions twice and still misread half
                of them. They fail by 6 marks on a paper they were on track for at 72%
                in mocks.
              </>
            }
            doInstead={
              <>
                Stop revising at 8pm the night before. Eat a proper meal, do something
                relaxing for an hour, then sleep at your normal time. The hour you save
                by NOT cramming is worth 10 marks of clearer thinking on the day. Sleep
                is the multiplier — preparation without sleep is wasted preparation.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="A working apprentice's exam-week plan for Unit 304"
            situation={
              <>
                You're a working apprentice. Your Unit 304 (Inspection, Testing and
                Commissioning) paper is on a Friday at 09:30. You normally work
                07:30-16:30 Mon-Fri on a commercial fit-out site. You have done five
                full Unit 304 mocks across the last month, averaging 71%. Your tutor
                thinks you're ready.
              </>
            }
            whatToDo={
              <>
                Mon-Wed of exam week: work normally. Each evening do 30-45 minutes of
                error-log review focused on the items you've consistently got wrong
                (likely C2 vs C3 boundary calls, Zs/disconnection time mappings, IR
                test thresholds for different cable categories). Thursday: try to leave
                site at 14:00 if your employer allows; if not, finish at 16:30 and go
                straight home, no detours. Eat a proper evening meal at 18:00. From
                19:00-20:00, one final error-log review and a refresh of the Part 6
                BS 7671 structure. 20:00 onwards: stop, do something relaxing, pack
                everything for the morning, bed at your normal time. Friday: alarm at
                06:30, breakfast at 07:00 (porridge, banana, water, one coffee), out
                the door at 08:30, arrive at the centre 09:00, sign in, settle, walk
                in calm at 09:25.
              </>
            }
            whyItMatters={
              <>
                The L3 closed-book papers reward calm, well-rested candidates more than
                they reward last-minute crammers. A working apprentice has less
                bandwidth than a full-time student — the trade is sleep and consolidation,
                not heroic late-night revision. The 71% mock average is your real
                baseline; protecting it with sleep and prep is worth more than trying
                to push it to 80% with a sleepless cram.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Walking into the exam room</ContentEyebrow>

          <ConceptBlock
            title="The first 60 seconds set the tone"
            plainEnglish="When you sit down at the screen, you have ~60 seconds before the paper starts (or before you click 'begin'). Use them. Slow your breathing. Lay your calculator and rough paper exactly where you want them. Confirm you understand the navigation (next, previous, flag, submit). Settle the body so the brain can work."
            onSite="The candidates who race through the first five questions with their pulse still spiking from the rush in are the ones who misread the negation in question 3 and the units in question 4. The first 60 seconds is settling time — non-negotiable."
          >
            <p>The settling protocol — drilled in mocks, executed on the day:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Calculator and rough paper laid out where your hands fall naturally.
              </li>
              <li>
                Slow box breathing — 4 in, 4 hold, 4 out, 4 hold — for 30 seconds.
              </li>
              <li>
                Confirm screen navigation: where is the next button, the previous button,
                the flag button, the submit button. Where does the on-screen timer live.
              </li>
              <li>
                Read question 1 calmly, two reads, identify command word, work the
                answer. The first question sets the rhythm for the next 89.
              </li>
              <li>
                If question 1 is hard, flag and move on without panic. Question order
                isn't always difficulty order — Q2 may be your easiest mark.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Night before: 1 hour of error-log review (NOT a full mock, NOT new material). Eat well, sleep at your normal time.",
              "Morning: eat ~90 minutes before the start. Slow-release carbs, protein, banana, water. Avoid sugar bombs and energy drinks.",
              "Pack: photo ID, candidate confirmation letter, backup calculator, water, post-exam snack, analogue watch. NO phone, NO notes, NO BS 7671.",
              "Arrive 30 minutes early. Sign in, use the toilet, settle. Don't do last-minute revision — it spikes anxiety without adding knowledge.",
              "Sleep is the single biggest controllable performance variable. 7-8 hours, going to bed at your normal time, is the target.",
              "First 60 seconds in the room: lay out calculator and rough paper, slow box breathing, confirm screen navigation. Then start question 1 calmly.",
            ]}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../level3-module8-section2-section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.2 Question analysis
              </div>
            </button>
            <button
              onClick={() => navigate('../level3-module8-section2-section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.4 Common pitfalls
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
