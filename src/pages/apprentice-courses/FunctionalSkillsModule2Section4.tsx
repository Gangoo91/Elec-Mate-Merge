/**
 * Functional Skills · Module 2 · Section 4 — Spelling, grammar and punctuation
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit.
 * DENSITY PASS (13 Sep): the converted page explained more than it taught —
 * 17 ConceptBlocks (up to three per section) against six worked examples and
 * three try-its. This pass merged the 17 down to 8, one per section, making
 * each denser rather than thinner: the reference tables (misspelt words, UK
 * vs US spelling, trade terminology, apostrophe rules, punctuation marks, the
 * Top 10 list, the homophone quick reference) still exist in full — they now
 * sit inside the ConceptBlock they belong to instead of standing alone with
 * nothing built on top of them. Added WorkedExample and TryIt blocks so every
 * section runs explain → show → do; every worked example corrects real
 * certificate or report text, bad sentence → diagnosis → corrected sentence,
 * because that is what "working" looks like on a language page. Cut the
 * passages that were about professionalism and habit rather than the
 * language itself, dropped the Section 7 scenario to make room for a worked
 * example applying the proofreading checklist directly, and removed a
 * SectionRule that had been sitting inside Section 3 between a worked
 * example and its try-it (a SectionRule marks the boundary between sections,
 * not a break inside one).
 *
 * DEDUPLICATION: Section 2 owns THE FORMS (what each certificate is, what
 * goes in each part). This page owns THE LANGUAGE, in full, with no
 * duplication: correct trade terminology, UK English spelling, the words
 * that get misspelt most, homophones, sentence structure, punctuation and
 * proofreading. Where an example of a form entry is useful, it appears here
 * as an example to correct — the natural fit for a language page — but this
 * page never teaches certificate STRUCTURE.
 *
 * ACCURACY corrections carried in from the audit (13 Sep), all still true:
 *  - CPC is written in capitals throughout — the RAG corpus carries 290 uses
 *    of "CPC" and zero of lowercase "CPC". The old page's claim that BS 7671
 *    itself uses a lowercase form was false and is not reintroduced here.
 *  - "Basic protection" is taught as the current term without dating the
 *    change to any BS 7671 edition or amendment, because that date could not
 *    be evidenced. Older paperwork using "protection against direct contact"
 *    is noted as a fact about what you will still see, not as a claim about
 *    when the term changed.
 *  - A line claiming competent person schemes sanction spelling errors has
 *    been removed — it asserted an enforcement action nobody could evidence.
 *  - The old en-dash example, "230–240V", is a claim about UK supply voltage
 *    and not the correct one (230 V +10%/−6% is the statutory range). Swapped
 *    for the BS EN 60898 device ladder, 6–63 A, which this page can state
 *    correctly: 6, 10, 16, 20, 25, 32, 40, 50, 63, with no 45 or 60 A rung.
 *  - "Top 10 spelling errors" keeps exactly ten entries.
 *
 * No <RegsCallout> anywhere on this page: it paraphrases throughout, and that
 * component renders its `clause` prop as quoted regulation text.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  ContentEyebrow,
  SectionRule,
  WorkedExample,
  TryIt,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Spelling, Grammar and Punctuation - Functional Skills Module 2.4';
const DESCRIPTION =
  'Functional Skills English for electricians: correct trade terminology, UK English spelling, commonly misspelt words, homophones, sentence structure, punctuation and proofreading for certificates and site paperwork.';

const quizQuestions = [
  {
    id: 1,
    question: 'Which is the correct spelling of the electrical term?',
    options: ['Florescent', 'Fluorescent', 'Flourescent', 'Fluoresent'],
    correctAnswer: 1,
    explanation:
      "'Fluorescent' is correct. It is one of the most commonly misspelt words in the trade, and the trap is the middle: 'flu-or-escent', not 'flor-' or 'flour-'.",
  },
  {
    id: 2,
    question: "In the sentence 'The fault has affected the entire circuit', which word is correct?",
    options: [
      "'effected' is correct — it is the past tense of the verb 'to bring about'",
      "Either 'affected' or 'effected' is acceptable here",
      "'affected' is correct — it is the verb meaning 'to have an impact on'",
      "'affect' is correct because it always follows the word 'has'",
    ],
    correctAnswer: 2,
    explanation:
      "'Affected' is correct. 'Affect' is usually the verb meaning 'to have an impact on'; 'effect' is usually the noun meaning 'the result'. This sentence needs the verb — the fault has had an impact on the circuit.",
  },
  {
    id: 3,
    question: 'Which EICR observation is written with correct spelling, grammar and punctuation?',
    options: [
      'Missing accessory faceplate on socket outlet in kitchen — replacement required (C3)',
      'Acessory faceplate missing on socket, kitchen, needs replacing c3',
      'missing accesory face plate socket outlet kitchen replacment required',
      'Faceplate on the socket it was missing in the kitchen and so it needs replacing',
    ],
    correctAnswer: 0,
    explanation:
      "The first option spells 'accessory' correctly, forms a complete and clear sentence, names the location, states the action, and gives the code in capitals. The others misspell 'accessory', drop capitals and punctuation, or wander into a run-on sentence that never quite says what is wrong.",
  },
  {
    id: 4,
    question: "Which sentence uses the correct form of 'their/there/they're'?",
    options: [
      "The cables are over they're by the distribution board",
      'Their going to replace the consumer unit tomorrow',
      'There inspection is booked for next week',
      "They're installing the new lighting circuit on Tuesday",
    ],
    correctAnswer: 3,
    explanation:
      "'They're' expands to 'they are' — 'They are installing the new lighting circuit on Tuesday' still makes sense, so the contraction is correct. The others should read 'They're going to replace…', 'The cables are over there…', and 'Their inspection is booked…'.",
  },
  {
    id: 5,
    question: 'Which sentence contains a subject-verb agreement error?',
    options: [
      'The circuit was tested and the results were satisfactory.',
      'Each of the RCDs were tested individually.',
      'The consumer unit has been replaced with a metal-clad unit.',
      'All cables have been installed in accordance with the specification.',
    ],
    correctAnswer: 1,
    explanation:
      "'Each' is a singular subject and always takes a singular verb, however many items follow it — 'Each of the RCDs WAS tested individually' is correct. It stays singular even standing in front of a plural noun.",
  },
  {
    id: 6,
    question: 'Which of these sentences is correctly punctuated for a professional email?',
    options: [
      'the EICR has been completed, and the report is attached.',
      'The EICR has been completed and the report is attached',
      'The EICR has been completed, and the report is attached.',
      'the eicr has been completed and the report is attached',
    ],
    correctAnswer: 2,
    explanation:
      "The correct version opens with a capital letter, places a comma before 'and' where it joins two clauses that could each stand as a sentence on their own, and closes with a full stop. EICR is an abbreviation and is always capitals.",
  },
  {
    id: 7,
    question: 'Which of these is the correct use of an apostrophe?',
    options: [
      "The RCD's in the board were all tested",
      "All the circuit's are labelled correctly",
      "Three MCB's need replacing",
      "The client's property was re-energised safely",
    ],
    correctAnswer: 3,
    explanation:
      "'The client's property' uses the apostrophe correctly, to show possession. The other three use an apostrophe to make a plural — 'RCDs', 'circuits' and 'MCBs' need no apostrophe at all.",
  },
  {
    id: 8,
    question: 'What is the most effective proofreading technique for catching wrong homophones?',
    options: [
      'Asking someone else to reformat it',
      'Using spell check software only',
      'Reading the document aloud slowly',
      'Reading the document backwards word by word',
    ],
    correctAnswer: 2,
    explanation:
      'Reading aloud catches wrong homophones because your ear hears a word that does not belong, even though every word on the page is correctly spelt. A spell checker cannot help here — both words in a homophone pair pass its dictionary.',
  },
];

const FunctionalSkillsModule2Section4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 4"
        title="Spelling, grammar and punctuation"
        backTo="/study-centre/apprentice/functional-skills/module2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            The certificate outlives the visit. The van drives off, the client forgets your name,
            and the document stays behind carrying whatever you actually wrote — not what you meant,
            not what you would have said if pushed, what you wrote. This section is the language
            itself: the words the trade uses, the ones people get wrong, and how to fix a sentence
            that has gone wrong before it goes out under your name.
          </p>

          <LearningOutcomes
            outcomes={[
              'Use the correct trade terminology in place of the colloquial version, and know why it matters on a signed document.',
              'Spell the words that trip electricians up most often, and apply UK English spelling throughout your paperwork.',
              'Tell apart the homophones that appear constantly in site writing — their/there/they’re, your/you’re, its/it’s, affect/effect, to/too/two, lose/loose.',
              'Write complete sentences, choose active or passive voice deliberately, and keep one idea per sentence.',
              'Punctuate certificates and reports correctly, including the apostrophe rule that causes the most errors in the trade.',
              'Proofread your own writing using techniques that catch what a first read misses.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Section 2 of this module',
                gist: 'That page covers what each form is and what belongs in each part of it. This page assumes you know roughly what an EICR, an EIC and a Minor Works certificate are, and picks up where the writing itself is the subject.',
              },
              {
                term: 'No grammar background needed',
                gist: 'Nothing here assumes you enjoyed English at school. It assumes you write things down for a living and would rather do it right the first time.',
              },
            ]}
          />

          <TLDR
            points={[
              'Use the trade term, not the colloquial one: consumer unit, not fuse box. RCD, not trip switch or safety switch. CPC, not earth wire. Luminaire, not light fitting.',
              'CPC is written in capitals — always. There is no lowercase form on a form you sign.',
              'UK English throughout: colour, centre, organisation, licence (noun), practise (verb), earthing not grounding.',
              'Accessory, fluorescent, separate, maintenance and luminaire are the words that catch electricians out most. Learn the shape of each one.',
              'Homophones are not caught by a spell checker — both words are spelt correctly, just in the wrong place. Reading aloud is the only reliable defence.',
              'Every sentence needs a subject and a verb. “Tested and satisfactory” is not a sentence.',
              'An apostrophe shows possession or a contraction. It never makes a plural — RCDs, MCBs and circuits take no apostrophe at all.',
              'Proofread on purpose. Read it aloud, read it backwards, or come back to it later — anything other than reading it the way you wrote it.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · Why accuracy matters</ContentEyebrow>

          <ConceptBlock
            title="Nobody reads a certificate the way you wrote it"
            onSite="Read your own observation back as though you have never been to the property and have no way of ringing to ask what you meant. That is who actually reads it."
          >
            <p>
              A poorly wired installation and a poorly written certificate fail the same test in the
              same way: something in front of the reader does not do the job it was meant to do. The
              installation cannot speak for itself once you have left site — the certificate speaks
              for it, and it only speaks correctly if the words on it are correct. A misspelt word
              or a muddled sentence is not a cosmetic problem on a document like this. It is the
              difference between a record that answers a question and one that raises a new one.
            </p>
            <p>
              This is not about sounding clever. Plenty of very capable electricians write plainly
              and it is exactly right for the job. What separates a usable document from a useless
              one is precision — the words mean only what they are supposed to mean, in an order
              that cannot be misread. That is a narrower, more testable standard than “good
              writing”, and it is the one this section teaches. Where it actually costs you, roughly
              in order of how often it happens:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">Certificates.</strong> An EIC, an EICR or a Minor
                Works form is a legal document with your name on it. A spelling error looks
                careless; a grammar error can genuinely change what the observation says.
              </li>
              <li>
                <strong className="text-white">Client emails and quotations.</strong> Often the
                first thing a prospective client sees of your work. Sloppy writing loses jobs to a
                competitor who writes cleanly, before either of you has picked up a screwdriver.
              </li>
              <li>
                <strong className="text-white">Method statements and risk assessments.</strong>{' '}
                These have to be unambiguous, because somebody follows them without you standing
                over their shoulder. A missing comma can turn one instruction into two, in the wrong
                order.
              </li>
              <li>
                <strong className="text-white">Day sheets and site notes.</strong> These get
                produced in disputes, months or years later. A vague entry protects nobody; a
                precise one is evidence.
              </li>
            </ul>
          </ConceptBlock>

          <WorkedExample
            question='An EICR observation reads: "Socket loose, needs sorting." Turn this into a finding someone could actually act on.'
            steps={[
              {
                calc: 'Work out what “loose” actually means',
                note: 'Is it the faceplate, the accessory box on the wall, or a terminal inside it? Each is a different job. The word “loose” on its own hides the actual defect.',
              },
              {
                calc: 'Name the location precisely',
                note: 'Which socket, which room, ideally which circuit reference. “A socket” could be any of dozens in the property.',
              },
              {
                calc: 'State the action in trade terms, with a code',
                note: '“Needs sorting” is not an instruction anyone can price, schedule or check off. Say what has to happen.',
              },
            ]}
            answer='"Socket outlet on circuit 4, kitchen worktop — faceplate loose on the wall box, accessory requires re-fixing (C3)."'
            watchOut="Notice that nothing here is new information — you knew all of this on site. The rewrite is not research, it is discipline: writing down what you already know precisely enough that someone who was not there can act on it."
          />

          <SectionRule />

          <TryIt
            question='Rewrite this day-sheet note so a stranger reading it next week could act on it: "Board’s a bit of a mess, sorted the worst of it, will need another look."'
            steps={[
              {
                calc: 'Which board, and what was actually wrong with it?',
                note: 'Loose connections, undersized cable, no labelling — “a mess” could be any of these.',
              },
              {
                calc: 'What did “sorted” mean?',
                note: 'Replaced, re-torqued, temporarily made safe — each has a different meaning for whoever reads this next.',
              },
              {
                calc: 'What specifically still needs a look, and roughly when?',
                note: '“Will need another look” with nothing else attached is a note that helps nobody, including you in six months.',
              },
            ]}
            answer='"Consumer unit at [location] — three loose terminations re-torqued and temporarily made safe. Board itself is undersized for the load and should be scheduled for replacement before winter." A stranger reading this knows exactly what was done and what is still outstanding.'
          />

          <CommonMistake
            title="Writing loosely because you already know what you mean"
            whatHappens="You write 'earth to small' instead of 'earth too small', or 'the usual issue with this type of board' instead of naming the issue, because in your head the meaning is obvious. It is obvious — to you, today. The reader is someone else, later, with none of that context."
            doInstead="Write every line as though the reader has never set foot on the property and cannot ring you to check. That is not an exaggeration for most certificates — it is the actual situation the document will be read in."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · Common trade vocabulary</ContentEyebrow>

          <ConceptBlock
            title="Spelling: the words that catch electricians out, and UK English throughout"
            onSite="Set your phone, tablet and laptop spell checker to British English before you type another certificate. Most default to American English out of the box, and it will happily wave through every one of the wrong spellings below."
          >
            <p>
              A handful of ordinary trade words get misspelt constantly, on certificates that
              otherwise read perfectly well. Learn the shape of each one and the error stops
              happening — these are not obscure words, they are the ones that appear every day:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">accessory</strong> — not ‘accessorie’, ‘acessory’ or
                ‘accesory’. Probably the single most misspelt word on an electrical certificate.
              </li>
              <li>
                <strong className="text-white">fluorescent</strong> — not ‘florescent’,
                ‘flourescent’ or ‘fluoresent’. The ‘uo’ and the ‘sc’ are the two places it goes
                wrong.
              </li>
              <li>
                <strong className="text-white">separate</strong> — not ‘seperate’. There is ‘a rat’
                in sep-a-rat-e.
              </li>
              <li>
                <strong className="text-white">maintenance</strong> — not ‘maintainance’ or
                ‘maintenence’. The ending is ‘-enance’.
              </li>
              <li>
                <strong className="text-white">accommodation</strong> — not ‘accomodation’. Double
                ‘c’, double ‘m’.
              </li>
              <li>
                <strong className="text-white">occurrence</strong> — not ‘occurance’ or ‘occurence’.
                Double ‘c’, double ‘r’, ending in ‘-ence’.
              </li>
              <li>
                <strong className="text-white">continuity</strong> — not ‘continuety’. One of the
                words you will type most, on every schedule of test results.
              </li>
              <li>
                <strong className="text-white">deterioration</strong> — not ‘deteriation’. Common on
                EICR observations describing cable or accessory condition.
              </li>
              <li>
                <strong className="text-white">installation</strong> — not ‘instillation’, which is
                a different word entirely (it means dripping liquid into something). A surprisingly
                frequent mix-up.
              </li>
            </ul>
            <p className="mt-3">
              Beyond individual words, every certificate you sign is a UK document and should read
              like one — a spell checker set to American English will not flag the wrong spelling,
              it will flag the right one:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">colour</strong>, not color ·{' '}
                <strong className="text-white">centre</strong>, not center ·{' '}
                <strong className="text-white">metre</strong>, not meter (a metre is a unit of
                length; a meter is an instrument that measures something — the distinction matters
                on a trade certificate)
              </li>
              <li>
                <strong className="text-white">organisation</strong>, not organization ·{' '}
                <strong className="text-white">analyse</strong>, not analyze ·{' '}
                <strong className="text-white">aluminium</strong>, not aluminum
              </li>
              <li>
                <strong className="text-white">licence</strong> as the noun, not license ·{' '}
                <strong className="text-white">practise</strong> as the verb, not practice — UK
                English is one of the few varieties that still spells the noun and the verb
                differently, so ‘practice makes perfect’ (noun) but ‘practise your testing sequence’
                (verb)
              </li>
              <li>
                <strong className="text-white">earthing</strong>, never grounding — ‘grounding’ is
                the American term and has no place on a UK certificate, however often you hear it on
                an imported YouTube video
              </li>
            </ul>
          </ConceptBlock>

          <WorkedExample
            question='A certificate note reads: "the seperate accesory in the kitchen has a maintainance issue and needs replacment." Correct every spelling error.'
            steps={[
              {
                calc: 'seperate → separate',
                note: 'There is ‘a rat’ in separate.',
              },
              {
                calc: 'accesory → accessory',
                note: 'Double ‘c’, double ‘s’ — accessory.',
              },
              {
                calc: 'maintainance → maintenance',
                note: 'The ending is ‘-enance’, not ‘-ainance’.',
              },
              {
                calc: 'replacment → replacement',
                note: 'The ‘e’ before ‘-ment’ is easy to drop when writing quickly. It should not be.',
              },
            ]}
            answer='"The separate accessory in the kitchen has a maintenance issue and needs replacement."'
            watchOut="Notice that all four words are ordinary trade vocabulary, not technical jargon. These are the four or five words that catch nearly everyone at some point, which is exactly why they are worth learning properly rather than trusting a spell checker to catch every time."
          />

          <SectionRule />

          <TryIt
            question='A written report says: "There has been an occurance of deteriation to the continuety test point since the last instillation was completed." Correct all four spelling errors.'
            steps={[
              {
                calc: 'occurance → occurrence',
                note: 'Double ‘c’, double ‘r’, ending in ‘-ence’.',
              },
              {
                calc: 'deteriation → deterioration',
                note: 'The full word is dete-RIORA-tion — a syllable is missing in the wrong version.',
              },
              {
                calc: 'continuety → continuity',
                note: 'One of the most-typed words on any schedule of test results.',
              },
              {
                calc: 'instillation → installation',
                note: '‘Instillation’ means dripping liquid into something — a different word entirely, not a misspelling of this one.',
              },
            ]}
            answer='"There has been an occurrence of deterioration to the continuity test point since the last installation was completed."'
          />

          <InlineCheck
            id="m2s4-spelling-check"
            question="Which of the following words is spelt correctly?"
            options={['Flourescent', 'Accessorie', 'Luminaire', 'Maintainance']}
            correctIndex={2}
            explanation="'Luminaire' is correctly spelt. The others should read 'fluorescent' (not flourescent), 'accessory' (not accessorie) and 'maintenance' (not maintainance) — three of the most commonly misspelt words in the trade."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Homophones and confusables</ContentEyebrow>

          <ConceptBlock
            title="Words a spell checker will never catch"
            plainEnglish="A homophone is two different words that sound the same. Both are spelt correctly on their own — the error is using the wrong one, and no spell checker can tell the difference."
          >
            <p>
              This is the category of error that survives every spell check, because every word
              involved is a real, correctly spelt word. The only defence is knowing which one you
              need, and reading your own writing carefully enough to catch it when you have not.
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">their / there / they’re.</strong> ‘Their’ means
                belonging to them (“their installation”). ‘There’ is a place, or introduces a
                statement (“over there”, “there are three circuits”). ‘They’re’ is ‘they are’
                (“they’re replacing the board”). Test: if ‘they are’ fits, it is ‘they’re’.
              </li>
              <li>
                <strong className="text-white">your / you’re.</strong> ‘Your’ is belonging to you
                (“your EICR is attached”). ‘You’re’ is ‘you are’ (“you’re booked in Thursday”).
              </li>
              <li>
                <strong className="text-white">its / it’s.</strong> ‘Its’ is belonging to it (“the
                RCD and its test button”) — no apostrophe, exactly like ‘his’ or ‘hers’. ‘It’s’ is
                ‘it is’ or ‘it has’ (“it’s been tested”). This is the pair people get backwards most
                often, precisely because every other possessive in English (“the client’s”) does
                take an apostrophe.
              </li>
              <li>
                <strong className="text-white">affect / effect.</strong> ‘Affect’ (verb) is to have
                an impact on (“the fault will affect the lighting circuit”). ‘Effect’ (noun) is the
                result (“the effect of the fault was a total loss of power”). Memory aid: Affect is
                an Action, Effect is the End result — both pairs share a first letter.
              </li>
              <li>
                <strong className="text-white">to / too / two.</strong> ‘To’ is direction, or part
                of a verb (“connect to the terminal”). ‘Too’ is also, or excessively (“the cable is
                too small”). ‘Two’ is the number. The single most frequent trade error in this group
                is writing “earth to small” instead of “earth too small” — spelt correctly, meaning
                nothing close to what was intended.
              </li>
              <li>
                <strong className="text-white">lose / loose.</strong> ‘Lose’ (rhymes with choose)
                means to misplace (“do not lose the test results”). ‘Loose’ (rhymes with goose)
                means not tight (“loose connection at the socket outlet”). ‘Loose’ has the extra ‘o’
                — think of it as the word that has come undone.
              </li>
            </ul>
          </ConceptBlock>

          <WorkedExample
            question='An EICR draft says: "The earths are to small for the load and there is a loose connection, but its been checked and there satisfied its safe for now." Fix every homophone error.'
            steps={[
              {
                calc: 'to small → too small',
                note: '‘Too’ means excessively — the earth conductors are excessively small, not directed anywhere.',
              },
              {
                calc: "its been checked → it's been checked",
                note: '‘It has been checked’ fits, so it needs the apostrophe.',
              },
              {
                calc: 'there satisfied → they’re satisfied',
                note: '‘They are satisfied’ is the meaning, so it takes the contraction, not the place-word.',
              },
              {
                calc: "its safe → it's safe",
                note: '‘It is safe’ fits — apostrophe needed again. Two different ‘its’ errors in one sentence is common; each one needs testing on its own.',
              },
            ]}
            answer='"The earths are too small for the load and there is a loose connection, but it’s been checked and they’re satisfied it’s safe for now."'
            watchOut="An observation this loosely worded should not be describing a safety-critical finding on its own account either — but fix the language first, then look at whether 'satisfied it's safe for now' is actually a defensible thing to write on a certificate at all."
          />

          <TryIt
            question='Choose the correct word in each gap: "___ (Their/There/They’re) going to test ___ (your/you’re) installation on Tuesday, and ___ (its/it’s) results will affect what ___ (their/there/they’re) recommendations say."'
            steps={[
              { calc: 'Gap 1: They’re', note: '‘They are going to test’ — the contraction fits.' },
              { calc: 'Gap 2: your', note: 'Belonging to you — the installation is yours.' },
              {
                calc: 'Gap 3: its',
                note: 'Belonging to it (the test) — no apostrophe, same rule as his/hers.',
              },
              { calc: 'Gap 4: their', note: 'Belonging to them — the recommendations are theirs.' },
            ]}
            answer='"They’re going to test your installation on Tuesday, and its results will affect what their recommendations say."'
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · Technical terminology</ContentEyebrow>

          <ConceptBlock
            title="Use the trade term, not the everyday one"
            onSite="A report that says 'fuse box' instead of 'consumer unit' reads, to another electrician or an inspector, as someone who is not quite fluent in the trade they are certifying work in."
          >
            <p>
              Every trade has words that mean something specific, and the electrical trade is no
              exception. Using the correct term is not showing off — it is precision, and precision
              is what a certificate is for. Four substitutions come up constantly:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">Consumer unit</strong>, not ‘fuse box’, ‘fuse board’
                or ‘breaker panel’ (the last is the American term). For commercial work the correct
                term is ‘distribution board’.
              </li>
              <li>
                <strong className="text-white">RCD</strong> — Residual Current Device — not ‘trip
                switch’ or ‘safety switch’. Both of those describe what it does in everyday
                language; neither is what it is called on a certificate.
              </li>
              <li>
                <strong className="text-white">CPC</strong>, not ‘earth wire’. Written in capitals,
                always — the corpus this course draws on carries the term written as CPC throughout,
                never lowercase. It stands for circuit protective conductor: the conductor
                connecting exposed-conductive-parts back to the main earthing terminal. ‘Earth wire’
                is close enough for a conversation on site and wrong for a document you sign.
              </li>
              <li>
                <strong className="text-white">Luminaire</strong>, not ‘light fitting’. A luminaire
                is the complete unit — lamp, control gear and housing — and it is the term the
                trade’s own reference documents use.
              </li>
            </ul>
            <p className="mt-3">
              A related pair worth knowing because they get muddled constantly:{' '}
              <strong className="text-white">basic protection</strong> is the current term for
              protection against contact with live parts under normal conditions; older paperwork
              calls the same idea ‘protection against direct contact’, and you will still meet that
              phrase on existing certificates and in older textbooks. Use the current term in
              anything you write yourself, and recognise the older phrase for what it is when you
              read it on a document somebody else produced.
            </p>
            <p className="mt-3">
              The same discipline applies to abbreviations. Standard ones — RCD, MCB, RCBO, CPC,
              EICR, EIC, SWA, Zs, Ze — are understood by anyone who reads certificates for a living,
              but that does not mean you can skip writing the full term at least once on a document
              a non-technical reader will see: “The Residual Current Device (RCD) was tested. The
              RCD tripped within 28 ms.” What you must never do is invent your own abbreviation —
              ‘CU’ for consumer unit, or a shorthand you and your mate use, means nothing to the
              person reading the certificate in eight years with no way of asking you what it stood
              for.
            </p>
          </ConceptBlock>

          <WorkedExample
            question='Rewrite for a professional report: "Fuse box needs a new breaker panel, the safety switch in it keeps going off, and the earth wire to the light fitting looks loose."'
            steps={[
              { calc: 'Fuse box → consumer unit' },
              {
                calc: 'breaker panel → consumer unit',
                note: 'One correction covers both — the American term and the colloquial one both resolve to the same correct word here.',
              },
              { calc: 'safety switch … keeps going off → the RCD is tripping repeatedly' },
              { calc: 'earth wire → CPC' },
              { calc: 'light fitting → luminaire' },
            ]}
            answer='"The consumer unit requires replacement. The RCD within it is tripping repeatedly, and the CPC to the luminaire appears loose."'
            watchOut="Every one of these substitutions was a like-for-like swap of a colloquial term for the correct one — nothing about the meaning changed. That is the whole discipline: say the same thing, in the trade's own words."
          />

          <SectionRule />

          <TryIt
            question='Rewrite for a professional report: "Trip switch on the fuseboard needs looking at, and the earth wire to the light fitting in the hall is loose."'
            steps={[
              { calc: 'Trip switch → RCD' },
              { calc: 'fuseboard → consumer unit' },
              { calc: 'earth wire → CPC' },
              { calc: 'light fitting → luminaire' },
            ]}
            answer='"The RCD in the consumer unit requires attention, and the CPC to the luminaire in the hall is loose."'
          />

          <CommonMistake
            title="Reaching for the word a client would use, not the word the trade uses"
            whatHappens="You write the way you would explain it to the customer standing next to you — 'fuse box', 'trip switch', 'light fitting' — because that is the conversation you just had. It reads fine to them and wrong to anyone in the trade who reads it afterwards."
            doInstead="Write the certificate in the trade's own language, and translate for the client separately if they need it — in the covering email, not on the form itself. The two audiences need two different registers, and the certificate belongs to the technical one."
          />

          <InlineCheck
            id="m2s4-terminology-check"
            question="Which sentence uses the correct technical terminology for a professional report?"
            options={[
              'The fuse box was replaced with a new breaker panel',
              'The trip switch kept going off every time the kettle was plugged in',
              'The consumer unit has been replaced and fitted with RCBOs to all circuits',
              'The safety switch in the fuseboard needs a new earth wire',
            ]}
            correctIndex={2}
            explanation="'The consumer unit has been replaced and fitted with RCBOs to all circuits' uses correct terminology throughout. The others use colloquial terms — 'fuse box', 'breaker panel', 'trip switch', 'safety switch', 'fuseboard', 'earth wire' — that have no place on a professional document."
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Sentence structure</ContentEyebrow>

          <ConceptBlock
            title="Complete sentences, and choosing your voice on purpose"
            onSite="If you read your own sentence back and cannot say who did what, it is not finished yet — however confident it sounds."
          >
            <p>
              Every sentence needs someone or something (the subject) doing or being something (the
              verb). Miss either one and you have a fragment, not a sentence, and fragments are
              common on certificates written in a hurry at the end of a long day:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">Fragment:</strong> “Tested and found satisfactory.”
                Who tested? What was tested?
              </li>
              <li>
                <strong className="text-white">Complete:</strong> “The insulation resistance of
                circuit 3 was tested and found satisfactory at 200 MΩ.”
              </li>
              <li>
                <strong className="text-white">Fragment:</strong> “Loose connections throughout.”
              </li>
              <li>
                <strong className="text-white">Complete:</strong> “Loose connections were found at
                multiple socket outlets on the ground floor.”
              </li>
            </ul>
            <p className="mt-3">
              Once every sentence is complete, the next choice is voice. In active voice, the
              subject does the action: “Isolate the supply before starting work.” In passive voice,
              the action is done to the subject: “The supply should be isolated before work
              commences.” Active is shorter and more direct, which is exactly what a method
              statement needs — nobody following an instruction wants to work out who is meant to be
              doing it. A certificate is a different job: “The installation was found to be
              satisfactory” is passive, and it is the conventional voice for recording what was done
              and found, because a certificate is reporting an outcome rather than instructing
              anyone. Choose the voice for what the sentence is doing, not out of habit.
            </p>
          </ConceptBlock>

          <WorkedExample
            question='Rewrite this method statement step in the active voice, as a direct instruction: "The circuit should be proved dead before the cover is removed."'
            steps={[
              {
                calc: 'Identify the passive construction',
                note: '‘should be proved’ and ‘is removed’ — the subject is not doing the action, it is having the action done to it.',
              },
              {
                calc: 'Find the person doing the work',
                note: 'It is addressed to whoever is carrying out the task — make them the implied subject.',
              },
              {
                calc: 'Rewrite as a command',
                note: 'Drop ‘should be’ and ‘is’, start with the verb.',
              },
            ]}
            answer='"Prove the circuit dead before removing the cover."'
            watchOut="This is shorter, not just more direct — nine words instead of thirteen. Active voice in an instruction is very often the shorter sentence as well as the clearer one. Note this is exactly the wrong voice to use on the certificate recording that the same step took place — 'the circuit was proved dead' is correct there, because the certificate is a record of what happened, not an instruction to anyone."
          />

          <SectionRule />

          <TryIt
            question='Break this into two shorter sentences, keeping one idea in each: "The consumer unit was replaced with a metal-clad unit fitted with RCBOs to all circuits and the main earth was measured at 0.12 ohms and all circuits tested satisfactory."'
            steps={[
              {
                calc: 'Count the ideas',
                note: 'Three things are being said: what was fitted, what was measured, and what the tests showed.',
              },
              {
                calc: 'Split at the natural joins',
                note: 'Each ‘and’ is doing the work of a full stop.',
              },
            ]}
            answer='"The consumer unit was replaced with a metal-clad unit fitted with RCBOs to all circuits. The main earth was measured at 0.12 Ω, and all circuits tested satisfactory." Two sentences, each with one clear job.'
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Punctuation essentials</ContentEyebrow>

          <ConceptBlock
            title="Punctuation that changes meaning, not just appearance"
            plainEnglish="A missing comma can merge two safety steps into one. A misplaced apostrophe can turn a plural into a possessive. These marks are doing real work, not decoration."
          >
            <p>
              Three groups of marks cause almost every punctuation error on a certificate: the
              everyday marks that end and join sentences, the apostrophe, and the three different
              dash-like marks that get used interchangeably when they should not be.
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">Full stops.</strong> Every sentence ends with one.
                Abbreviations only take full stops where convention already requires it — ‘e.g.’
                yes, ‘BS 7671’ no.
              </li>
              <li>
                <strong className="text-white">Commas.</strong> Use one before ‘and’, ‘but’ or ‘so’
                when joining two clauses that could each stand alone as a sentence: “The test was
                completed, and the results were satisfactory.” Use one after an introductory word or
                phrase: “However, the insulation resistance was below the minimum acceptable value.”
              </li>
              <li>
                <strong className="text-white">Colons and semicolons.</strong> A colon introduces a
                list or an explanation: “The following tests were carried out: continuity,
                insulation resistance and polarity.” A semicolon joins two related but independent
                sentences without a conjunction: “The lighting circuit passed all tests; the ring
                final circuit required further investigation.”
              </li>
            </ul>
            <p className="mt-3">
              The single most common punctuation error in the trade has one rule behind it: an
              apostrophe shows that something belongs to something, or that a letter has been
              dropped in a contraction. It is never used to make a word plural.
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">Possession, singular:</strong> add ‘’s’ — “the
                client’s property”, “the board’s main switch”.
              </li>
              <li>
                <strong className="text-white">Possession, plural ending in s:</strong> add the
                apostrophe only — “the clients’ properties”, “the circuits’ protective devices”.
              </li>
              <li>
                <strong className="text-white">Contraction:</strong> “it’s important” (it is),
                “don’t work live” (do not).
              </li>
              <li>
                <strong className="text-white">Never for a plural:</strong> “3 RCDs” is correct; “3
                RCD’s” is wrong. “all circuits” is correct; “all circuit’s” is wrong. Decades follow
                the same rule: “1990s”, not “1990’s”.
              </li>
            </ul>
            <p className="mt-3">
              Finally, a hyphen, an en dash and an em dash are three different marks, and mixing
              them up is common because they look similar and every keyboard makes the hyphen the
              easy one to reach for. A <strong className="text-white">hyphen (-)</strong> joins
              compound words: “metal-clad”, “single-phase”, “like-for-like”. An{' '}
              <strong className="text-white">en dash (–)</strong> shows a range: “pages 41–45”, or
              the BS EN 60898 device ladder itself — “6–63 A”, running 6, 10, 16, 20, 25, 32, 40,
              50, 63. There is no 45 A or 60 A rung on that ladder, which is exactly the kind of
              detail an en dash range needs to get right. An{' '}
              <strong className="text-white">em dash (—)</strong> stands in for commas or brackets,
              for emphasis: “The consumer unit — which was over 30 years old — was replaced.”
            </p>
          </ConceptBlock>

          <WorkedExample
            question='Correct the apostrophes: "The RCD’s in the board were tested and all three MCB’s were found satisfactory, but the client’s neighbour’s installation had a loose accessorie’s faceplate."'
            steps={[
              { calc: "RCD's → RCDs", note: 'Simple plural — no apostrophe.' },
              { calc: "MCB's → MCBs", note: 'Same error, same fix.' },
              {
                calc: "client's neighbour's → keep both",
                note: 'These ARE correct — two separate possessions, the client’s and, within that, the neighbour’s.',
              },
              {
                calc: "accessorie's → accessory's",
                note: 'This one needed a spelling fix as well as the apostrophe — a single accessory possessing something takes ‘’s’, but the word itself is ‘accessory’.',
              },
            ]}
            answer='"The RCDs in the board were tested and all three MCBs were found satisfactory, but the client’s neighbour’s installation had a loose accessory’s faceplate."'
            watchOut="Notice two genuine possessives survived untouched right next to two wrongly-apostrophised plurals. The rule is not 'remove every apostrophe' — it is 'ask whether something owns something'."
          />

          <InlineCheck
            id="m2s4-punctuation-check"
            question="Which of these sentences is correctly punctuated?"
            options={[
              "The RCD's were tested and found to be satisfactory.",
              'The RCDs were tested, and found to be satisfactory.',
              'The RCDs were tested and found to be satisfactory.',
              'The rcds were tested and found to be satisfactory',
            ]}
            correctIndex={2}
            explanation="'The RCDs were tested and found to be satisfactory.' is correct: 'RCDs' is a simple plural with no apostrophe, 'and' here joins two parts of the same clause rather than two independent sentences so no comma is needed, and it ends with a full stop. The first wrongly apostrophises a plural; the second adds an unneeded comma; the fourth drops both the capital letter and the full stop."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Proofreading techniques</ContentEyebrow>

          <ConceptBlock
            title="Your brain reads what it expects, not what is on the page"
            onSite="You cannot proofread reliably straight after writing, because you already know what the sentence is supposed to say — and that is exactly what your eye will see, whether or not it is actually there."
          >
            <p>
              Proofreading is the last check before a document goes out, and it works best as a
              deliberate technique rather than a quick glance. Four are worth building into your
              routine:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">Read it aloud.</strong> Your ear catches what your
                eye skips past — a missing word, a wrong homophone, a sentence that does not
                actually flow. If you cannot read aloud on site, moving your lips silently still
                helps.
              </li>
              <li>
                <strong className="text-white">Read it backwards.</strong> Start with the last
                sentence and work towards the first. It breaks the flow of meaning and forces you to
                look at each sentence on its own, which is particularly good for catching spelling
                and punctuation errors your brain would otherwise glide over.
              </li>
              <li>
                <strong className="text-white">Leave it and come back.</strong> Even thirty minutes
                helps; overnight is better. Fresh eyes catch what tired ones miss, and it is worth
                the wait on anything that matters — a quotation, a report, a certificate.
              </li>
              <li>
                <strong className="text-white">Use spell check, but do not trust it alone.</strong>{' '}
                It catches typos and basic errors and misses homophones, invented abbreviations and
                anything that is a real word used in the wrong place. Set it to British English so
                it flags Americanisms rather than the other way round.
              </li>
            </ul>
          </ConceptBlock>

          <WorkedExample
            question='Proofread this paragraph and fix one error of each kind — a wrongly apostrophised plural, a wrong homophone, a spelling error and a sentence fragment: "The consumer unit was replaced and all circuit’s tested satisfactory. There new RCBO’s should reduce nuisance tripping. A seperate isolator fitted to the outbuilding supply."'
            steps={[
              { calc: "circuit's → circuits", note: 'Apostrophe wrongly used to make a plural.' },
              {
                calc: 'There → Their',
                note: 'Homophone — the RCBOs belong to the client, so this needs the possessive, not the place-word.',
              },
              {
                calc: "RCBO's → RCBOs",
                note: 'Same apostrophe error, second occurrence in the same short paragraph.',
              },
              { calc: 'seperate → separate', note: '‘A rat’ in sep-a-rat-e.' },
              {
                calc: 'A separate isolator fitted → complete the sentence',
                note: 'No verb — a fragment. It needs “was fitted”.',
              },
            ]}
            answer='"The consumer unit was replaced and all circuits tested satisfactory. Their new RCBOs should reduce nuisance tripping. A separate isolator was fitted to the outbuilding supply."'
            watchOut="Five errors, four different categories, in three short sentences — this is a realistic density for paperwork written quickly at the end of a job, which is exactly why a deliberate proofreading pass matters more than a quick glance."
          />

          <SectionRule />

          <TryIt
            question='Proofread this day sheet entry and list every error you find: "arived on site 9am, tested all circuit’s in the kitchen, there was a lose connection at socket, client happy with progress so far, will finnish tomorow."'
            steps={[
              {
                calc: 'Spelling',
                note: '‘arived’ → arrived, ‘finnish’ → finish, ‘tomorow’ → tomorrow.',
              },
              { calc: 'Apostrophe', note: '‘circuit’s’ → circuits — a plural, not a possessive.' },
              { calc: 'Homophone', note: '‘there was a lose connection’ → loose connection.' },
              {
                calc: 'Precision',
                note: 'Which socket? Which circuit? ‘Progress so far’ on what, exactly? A day sheet needs specifics, not a general impression.',
              },
            ]}
            answer='"Arrived on site 9am. Tested all circuits in the kitchen; found a loose connection at the socket outlet on circuit 2. Client happy with progress. Kitchen ring final to be completed tomorrow." Five separate errors caught, and the rewrite is more useful as well as more correct.'
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Quick reference guide</ContentEyebrow>

          <ConceptBlock title="Quick reference: spelling, homophones and the final checklist">
            <p>
              Three tables worth keeping to hand, and one checklist to run before anything you write
              goes out under your name.
            </p>
            <p className="mt-3">
              <strong className="text-white">Top 10 spelling errors in the trade:</strong>
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">1. accessory</strong> (not accessorie)
              </li>
              <li>
                <strong className="text-white">2. fluorescent</strong> (not florescent)
              </li>
              <li>
                <strong className="text-white">3. separate</strong> (not seperate)
              </li>
              <li>
                <strong className="text-white">4. maintenance</strong> (not maintainance)
              </li>
              <li>
                <strong className="text-white">5. installation</strong> (not instillation)
              </li>
              <li>
                <strong className="text-white">6. occurrence</strong> (not occurance)
              </li>
              <li>
                <strong className="text-white">7. continuity</strong> (not continuety)
              </li>
              <li>
                <strong className="text-white">8. luminaire</strong> (not luminare)
              </li>
              <li>
                <strong className="text-white">9. satisfactory</strong> (not satisfactry)
              </li>
              <li>
                <strong className="text-white">10. deterioration</strong> (not deteriation)
              </li>
            </ul>
            <p className="mt-3">
              <strong className="text-white">Homophone and grammar quick reference:</strong>
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>their (belonging to them) / there (a place) / they’re (they are)</li>
              <li>your (belonging to you) / you’re (you are)</li>
              <li>its (belonging to it) / it’s (it is / it has)</li>
              <li>affect (verb — to impact) / effect (noun — the result)</li>
              <li>to (direction) / too (also, excessively) / two (the number)</li>
              <li>lose (to misplace) / loose (not tight)</li>
              <li>
                Subject-verb agreement: “Each of the circuits WAS tested” — ‘each’ is always
                singular.
              </li>
              <li>
                Tense consistency: do not mix past and present in the same report — “the circuit was
                tested and the results WERE satisfactory”, not “the results show”.
              </li>
            </ul>
            <p className="mt-3">
              <strong className="text-white">Before you submit — the final checklist:</strong>
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>Trade words spelt correctly — accessory, fluorescent, maintenance, luminaire?</li>
              <li>
                Correct terminology used — consumer unit, RCD, CPC, luminaire, not the colloquial
                versions?
              </li>
              <li>Homophones checked — their/there/they’re, your/you’re, its/it’s, to/too?</li>
              <li>Every sentence complete, with a subject and a verb?</li>
              <li>Apostrophes used only for possession and contraction, never for a plural?</li>
              <li>UK English spellings throughout, and CPC written in capitals?</li>
              <li>
                Would someone who has never been to the property understand exactly what you mean?
              </li>
            </ul>
          </ConceptBlock>

          <WorkedExample
            question='Rewrite this observation, correcting every error: "there consumer unit has no rcd protection its old and the earths are to small, the accessorie’s in the kitchen are loose to. needs replacing urgently theres danger of shock"'
            steps={[
              { calc: 'there → their', note: 'Homophone: belonging to them, not a place.' },
              { calc: 'rcd → RCD', note: 'Abbreviations are capitals.' },
              {
                calc: 'its → it is',
                note: 'Spell it out, or use ‘it’s’ correctly — either way, the apostrophe was missing.',
              },
              { calc: 'to small → too small', note: 'Homophone again.' },
              {
                calc: "accessorie's → accessories",
                note: 'Plural, spelt correctly, no apostrophe.',
              },
              { calc: 'loose to → loose too', note: 'Same to/too error a second time.' },
              {
                calc: '‘needs replacing urgently’ → a complete sentence',
                note: 'Fragment — give it a subject.',
              },
              {
                calc: 'theres → there is',
                note: 'Missing apostrophe and a fragment sentence both fixed at once.',
              },
            ]}
            answer='"Their consumer unit has no RCD protection. It is an older unit, and the earths are too small for the load. The accessories in the kitchen are loose too. This needs replacing urgently — there is a danger of shock."'
            watchOut="Fixing the language does not by itself make this a usable observation — it still needs a location, a circuit reference and a classification code, which is what Section 2 teaches. Correct language and correct structure are two different jobs, and a certificate needs both."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Use the trade term, not the colloquial one: consumer unit, RCD, CPC, luminaire.',
              'CPC is written in capitals, always.',
              'UK English throughout — colour, centre, organisation, licence (noun), practise (verb), earthing not grounding.',
              'Accessory, fluorescent, separate, maintenance and luminaire are the words that catch electricians out most often.',
              'Homophones are spelt correctly and used wrongly — no spell checker catches them. Reading aloud does.',
              'A complete sentence needs a subject and a verb. A fragment is not a sentence, however confident it sounds.',
              'Active voice for instructions; passive is conventional for recording an outcome on a certificate.',
              'An apostrophe shows possession or contraction. Never a plural — RCDs, MCBs, circuits, 1990s.',
              'Proofread on purpose: aloud, backwards, or after a break. Never trust the version you read the way you wrote it.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Is it really worth learning to spell trade words correctly when spell check exists?',
                answer:
                  'Spell check catches typos, not the wrong-but-real-word errors that make up most homophone mistakes, and it will actively fight you if it is set to American English. It is a useful second check, not a substitute for knowing the words.',
              },
              {
                question:
                  'Why does it matter whether I write ‘fuse box’ or ‘consumer unit’ if everyone knows what I mean?',
                answer:
                  'On a certificate the reader is not always someone who was there — it might be an inspector, another electrician, or the same client eight years later. The correct term is unambiguous in a way the colloquial one is not, and it reads as the language of someone fluent in the trade.',
              },
              {
                question: 'Is passive voice always wrong?',
                answer:
                  'No. It is the wrong choice for an instruction, where someone has to act and needs to know who is doing what. It is the conventional and appropriate choice for a certificate reporting an outcome — “the installation was found to be satisfactory” is exactly the right register for that sentence.',
              },
              {
                question: 'What is the fastest way to improve my writing on certificates?',
                answer:
                  'Read your own observation back before you submit it, as though you have never seen the property. It catches more than any other single habit, and it costs about thirty seconds per entry.',
              },
            ]}
          />

          <SectionRule />

          <Quiz questions={quizQuestions} title="Section 4: Spelling, Grammar & Punctuation Quiz" />

          {/* ── prev / next ─────────────────────────────────────────── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module2/section3')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-white touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
              Section 3
            </button>
            <button
              type="button"
              onClick={() => navigate('/study-centre/apprentice/functional-skills/module2')}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-elec-yellow/35 bg-elec-yellow/[0.08] px-4 text-sm font-semibold text-white touch-manipulation"
            >
              Module 2
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule2Section4;
