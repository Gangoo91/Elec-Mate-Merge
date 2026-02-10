import { ArrowLeft, ArrowRight, SpellCheck, BookOpen, ArrowLeftRight, FileText, AlignLeft, Type, AlertCircle, SearchCheck, PenLine } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule2Section4 = () => {
  useSEO(
    "Section 4: Spelling, Grammar & Punctuation - English for Electricians",
    "Master trade vocabulary, common homophones, technical terminology, sentence structure, punctuation and proofreading skills for UK electricians."
  );

  const quizQuestions = [
    {
      id: 1,
      question: "Which is the correct spelling of the electrical term?",
      options: [
        "Florescent",
        "Flourescent",
        "Fluorescent",
        "Fluoresent"
      ],
      correctAnswer: 2,
      explanation: "'Fluorescent' is the correct spelling. This is one of the most commonly misspelt words in the electrical trade. The word comes from 'fluorescence' — remember the 'uo' in the middle and the 'sc' before the ending."
    },
    {
      id: 2,
      question: "In the sentence 'The fault has affected the entire circuit', which word is correct?",
      options: [
        "'affected' is correct — it is the verb meaning 'to have an impact on'",
        "'effected' should be used instead",
        "Either word can be used interchangeably",
        "Neither word is appropriate in this context"
      ],
      correctAnswer: 0,
      explanation: "'Affected' is the correct choice. 'Affect' is usually a verb meaning 'to have an impact on', while 'effect' is usually a noun meaning 'the result'. In this sentence, we need the verb — the fault has had an impact on the circuit."
    },
    {
      id: 3,
      question: "Which EICR observation is written with correct spelling, grammar and punctuation?",
      options: [
        "accessorie's missing from socket in kitchen, needs sorting",
        "Missing accessory faceplate on socket outlet in kitchen — replacement required (C3)",
        "there are some issue's with the sockets need looking at",
        "Socket in kitchen not right, its cover is of"
      ],
      correctAnswer: 1,
      explanation: "The second option is correctly written: 'accessory' is spelt correctly, the sentence is complete and clear, the location is specified, the action required is stated, and the observation code is included. Professional observations must be clear, specific and grammatically correct."
    },
    {
      id: 4,
      question: "Which sentence uses the correct form of 'their/there/they're'?",
      options: [
        "Their going to replace the consumer unit tomorrow",
        "The cables are over they're by the distribution board",
        "They're installing the new lighting circuit on Tuesday",
        "There inspection is booked for next week"
      ],
      correctAnswer: 2,
      explanation: "'They're' is the contraction of 'they are' — 'They are installing the new lighting circuit on Tuesday.' The other options should be: 'They're going to replace...' (not 'Their'), 'The cables are over there...' (not 'they're'), and 'Their inspection is booked...' (not 'There')."
    },
    {
      id: 5,
      question: "Which sentence contains a subject-verb agreement error?",
      options: [
        "The circuit was tested and the results were satisfactory.",
        "Each of the RCDs were tested individually.",
        "All cables have been installed in accordance with the specification.",
        "The consumer unit has been replaced with a metal-clad unit."
      ],
      correctAnswer: 1,
      explanation: "'Each' is a singular subject, so it requires a singular verb — 'Each of the RCDs was tested individually' is correct. This is a common subject-verb agreement error. 'Each' always takes a singular verb, even when followed by a plural noun."
    },
    {
      id: 6,
      question: "Which of these sentences is correctly punctuated for a professional email?",
      options: [
        "the EICR has been completed, and the report is attached.",
        "The EICR has been completed and the report is attached",
        "The EICR has been completed, and the report is attached.",
        "the eicr has been completed and the report is attached"
      ],
      correctAnswer: 2,
      explanation: "The correct sentence starts with a capital letter, uses a comma before 'and' when joining two independent clauses (both could stand alone as sentences), and ends with a full stop. Abbreviations like EICR should always be in capitals."
    },
    {
      id: 7,
      question: "Which of these is the correct use of an apostrophe?",
      options: [
        "The RCD's in the board were all tested",
        "The client's property was re-energised safely",
        "Three MCB's need replacing",
        "All the circuit's are labelled correctly"
      ],
      correctAnswer: 1,
      explanation: "'The client's property' is correct because the apostrophe shows possession — the property belonging to the client. The other options incorrectly use apostrophes to form plurals. 'RCDs', 'MCBs', and 'circuits' are simple plurals and do not need apostrophes."
    },
    {
      id: 8,
      question: "What is the most effective proofreading technique for catching wrong homophones?",
      options: [
        "Using spell check software only",
        "Reading the document backwards word by word",
        "Reading the document aloud slowly",
        "Asking someone else to reformat it"
      ],
      correctAnswer: 2,
      explanation: "Reading aloud is the most effective technique for catching wrong homophones because your ear will detect when a word sounds wrong in context, even though the spelling is correct. Spell checkers cannot catch homophones because both words are validly spelt — just used in the wrong place."
    }
  ];

  return (
    <div className="pb-24 bg-elec-dark min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link to="/study-centre/apprentice/functional-skills/module2" className="p-2 -ml-2 touch-manipulation">
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <div>
            <p className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">Module 2 &bull; Section 4</p>
            <h1 className="text-base font-bold text-white">Spelling, Grammar &amp; Punctuation</h1>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-600/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 shadow-2xl shadow-green-500/25">
                <SpellCheck className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Spelling, Grammar &amp; Punctuation</h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">Get to grips with the spelling, grammar and punctuation rules that matter most in electrical documentation and professional communication.</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">

        {/* Section 01 — Why Accuracy Matters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">01</span>
            <h3 className="text-lg font-bold text-white">Why Accuracy Matters</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              As an electrician, the quality of your written work reflects the quality of your electrical work. When a client receives a certificate full of spelling errors and poor grammar, they may question whether the same lack of attention was applied to the wiring. When a building inspector reads an observation that is vague, misspelt or grammatically incorrect, it undermines the credibility of the entire report.
            </p>
            <p>
              This is not about being pedantic or academic. It is about professionalism. Every Electrical Installation Certificate (EIC), every Electrical Installation Condition Report (EICR), every email to a client, and every method statement you write carries your name and your company's reputation. Getting the spelling, grammar and punctuation right is just as important as getting the wiring right.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">Your written work is a permanent record. Electrical certificates are kept for years — sometimes decades. A poorly written certificate does not just look bad today; it looks bad every time someone reads it in the future. First impressions last, and your certificates are often a client's first impression of your competence.</p>
            </div>

            <h4 className="text-white font-semibold pt-2">Where spelling and grammar matter most</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Electrical certificates (EIC, EICR, Minor Works):</strong> These are legal documents. Errors can cause confusion, delay sign-off, or raise questions about the validity of the certification.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Client emails and quotations:</strong> These are often the first point of contact with potential customers. Professional writing wins work; sloppy writing loses it.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Method statements and risk assessments:</strong> Safety documents must be unambiguous. A grammar error could change the meaning of a safety instruction.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Site records and day sheets:</strong> These may be used as evidence in disputes, insurance claims, or legal proceedings. Clear, accurate records protect you.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Technical reports and fault analyses:</strong> When documenting faults or defects, precision in language is essential to convey exactly what was found and what action is required.</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">The real-world consequences of errors</h4>
            <p>
              Consider these scenarios where poor writing has real consequences:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>An EICR observation that says "earth to small" instead of "earth too small" — the spelling error changes the meaning entirely and could be misinterpreted</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>A quotation email with "your" instead of "you're" and no full stops — the client may choose a competitor who writes more professionally</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>A method statement with ambiguous instructions because of missing commas — workers may interpret the sequence incorrectly, creating a safety risk</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>A day sheet that records "tested all circuits" with no specific details — in a legal dispute, this vague record provides no useful evidence</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Professional Standard</p>
              <p className="text-sm text-white/80">Many competent person schemes (NICEIC, NAPIT, ELECSA) audit their members' paperwork. Certificates and reports with frequent spelling and grammar errors can result in improvement notices or, in serious cases, affect your registration status. Taking pride in your written work protects your professional standing.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 02 — Common Trade Vocabulary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">02</span>
            <h3 className="text-lg font-bold text-white">Common Trade Vocabulary</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              The electrical trade has its own vocabulary, and many of these words are commonly misspelt — even by experienced electricians. Getting them right on certificates, reports and emails matters for your professional credibility. A misspelt technical term on an official document is like a loose connection in a consumer unit — it might not cause an immediate problem, but it shows a lack of attention to detail.
            </p>

            <h4 className="text-white font-semibold pt-2">Commonly misspelt electrical terms</h4>
            <p>These are the words that trip up electricians most frequently. Learn them, and you will avoid the most common errors in the trade:</p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">accessory</strong> — not 'accessorie', 'acessory' or 'accesory'. This is the single most misspelt word in electrical certification.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">fluorescent</strong> — not 'florescent', 'flourescent' or 'fluoresent'. Remember: flu-or-escent. The 'uo' and 'sc' are the tricky parts.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">separate</strong> — not 'seperate'. Memory aid: there is 'a rat' in separate.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">maintenance</strong> — not 'maintainance' or 'maintenence'. The ending is '-enance', not '-ainance'.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">accommodation</strong> — not 'accomodation'. It has double 'c' and double 'm'.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">immediately</strong> — not 'immediatly' or 'imediately'. Remember: immediate + ly.</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">More trade words to watch</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">installation</strong> — not 'instillation' (that means putting drops of liquid in something). This is a surprisingly common mix-up.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">occurrence</strong> — not 'occurance' or 'occurence'. Double 'c', double 'r', ending in '-ence'.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">resistance</strong> — not 'resistence'. The ending is '-ance', not '-ence'.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">continuity</strong> — not 'continuety' or 'contenuity'. Think: contin-u-ity.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">luminaire</strong> — not 'luminare', 'luminair' or 'light fitting'. Luminaire is the correct BS 7671 term for a complete light fitting including the lamp, control gear and housing.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">earthing</strong> — not 'grounding'. UK English uses 'earthing'; 'grounding' is American English and should not appear on UK certificates.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">satisfactory</strong> — not 'satisfactry' or 'satisfacory'. A word you will write hundreds of times on test schedules.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">deterioration</strong> — not 'deteriation' or 'deterioration'. Common on EICR observations describing cable or equipment condition.</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">UK English vs American English</h4>
            <p>
              As a UK-based electrician, you must use UK English spellings on all official documentation. Many spell checkers default to American English, so you need to be aware of the differences:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">colour</strong> (not color), <strong className="text-white/90">centre</strong> (not center), <strong className="text-white/90">metre</strong> (not meter)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">organisation</strong> (not organization), <strong className="text-white/90">analyse</strong> (not analyze)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">earthing</strong> (not grounding), <strong className="text-white/90">consumer unit</strong> (not breaker panel)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">aluminium</strong> (not aluminum), <strong className="text-white/90">programme</strong> (not program, except in computing)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">licence</strong> (noun, not license), <strong className="text-white/90">practise</strong> (verb, not practice)</span></li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Tip</p>
              <p className="text-sm text-white/80">Set your phone, tablet and computer spell checker to British English (en-GB). This will flag American spellings automatically. On iPhones, go to Settings &gt; General &gt; Keyboard &gt; Text Replacement and add commonly used trade terms that your spell checker does not recognise.</p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 02 */}
        <InlineCheck
          id="m2s4-spelling-check"
          question="Which of the following words is spelt correctly?"
          options={["Flourescent", "Accessorie", "Luminaire", "Maintainance"]}
          correctIndex={2}
          explanation="'Luminaire' is the correctly spelt word. The correct spellings of the others are: 'fluorescent' (not flourescent), 'accessory' (not accessorie), and 'maintenance' (not maintainance). These are among the most commonly misspelt words in the electrical trade."
        />

        {/* Section 03 — Homophones & Confusables */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">03</span>
            <h3 className="text-lg font-bold text-white">Homophones &amp; Confusables</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Homophones are words that sound the same but have different meanings and spellings. They are responsible for some of the most common errors in written English, and spell checkers will not catch them because the word itself is spelt correctly — just used in the wrong context. As an electrician, you will use many of these words daily in your certificates, emails and reports.
            </p>

            <h4 className="text-white font-semibold pt-2">their / there / they're</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">their</strong> = belonging to them — "Their installation was compliant with BS 7671"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">there</strong> = a place, or used to introduce a statement — "The consumer unit is over there" / "There are three circuits on this RCD"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">they're</strong> = they are — "They're replacing the distribution board next week"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Test:</strong> If you can replace the word with 'they are' and it still makes sense, use 'they're'. If it means 'belonging to them', use 'their'. Otherwise, use 'there'.</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">your / you're</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">your</strong> = belonging to you — "Your EICR report is attached" / "Your consumer unit requires upgrading"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">you're</strong> = you are — "You're booked in for Thursday morning" / "You're covered by our 12-month warranty"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Test:</strong> If you can replace it with 'you are' and it still makes sense, use 'you're'. If it means 'belonging to you', use 'your'.</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">its / it's</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">its</strong> = belonging to it — "The RCD and its test button" / "The cable has exceeded its current-carrying capacity"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">it's</strong> = it is / it has — "It's important to test before energising" / "It's been confirmed as a C2 observation"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Test:</strong> If you can replace it with 'it is' or 'it has' and it still makes sense, use 'it's'. If it means 'belonging to it', use 'its' (no apostrophe).</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Common trap:</strong> Many people think 'its' needs an apostrophe for possession because other possessive forms do (client's, company's). But 'its' follows the same rule as 'his', 'hers', and 'theirs' — none of which have apostrophes.</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">affect / effect</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">affect</strong> (verb) = to have an impact on — "The fault will affect the lighting circuit" / "Ambient temperature affects cable ratings"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">effect</strong> (noun) = the result — "The effect of the fault was a total power loss" / "The derating factor had a significant effect on cable selection"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Memory aid:</strong> Affect is an Action (both start with A); Effect is the End result (both start with E)</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">to / too / two</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">to</strong> = direction or part of a verb — "Connect to the earth terminal" / "I need to test the circuit"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">too</strong> = also, or excessively — "The cable is too small for the load" / "The kitchen circuit needs testing too"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">two</strong> = the number 2 — "Two circuits share the same protective conductor"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Common error:</strong> Writing "earth to small" instead of "earth too small" on an EICR. This is one of the most frequent homophone errors in the trade.</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">lose / loose</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">lose</strong> (verb, rhymes with 'choose') = to misplace or be deprived of — "Do not lose the test results"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">loose</strong> (adjective, rhymes with 'goose') = not tight, not fixed — "Loose connection at socket outlet in bedroom" / "Loose accessory faceplate"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Tip:</strong> 'Loose' has a double 'o' — think of the two 'o's being loose and wobbly. 'Lose' has lost one of its 'o's.</span></li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">Spell checkers will NOT catch homophone errors. The words are all spelt correctly — they are just used in the wrong context. The only way to catch them is to read your work carefully, or better still, read it aloud. Your ear will often detect what your eye misses.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 04 — Technical Terminology */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">04</span>
            <h3 className="text-lg font-bold text-white">Technical Terminology</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Technical terminology is the precise language of the trade. Using the correct terms shows competence and prevents misunderstandings. In formal documentation, vague or colloquial language should be replaced with the correct technical term. Knowing when to use abbreviations and when to write the full term is equally important.
            </p>

            <h4 className="text-white font-semibold pt-2">BS 7671 terms — use the correct definitions</h4>
            <p>BS 7671 has specific definitions for many terms. Using the wrong word can change the meaning entirely:</p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Protective conductor:</strong> Not just 'earth wire' — the correct term covers all conductors providing fault protection, including circuit protective conductors, main earthing conductors, and bonding conductors.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Circuit-protective conductor (cpc):</strong> The conductor connecting exposed-conductive-parts to the main earthing terminal. On certificates, write 'cpc' (lowercase) as this is the standard abbreviation in BS 7671.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Extraneous-conductive-part:</strong> A conductive part not forming part of the electrical installation but liable to introduce a potential. Note the hyphens — this is a compound term and should be hyphenated.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Basic protection:</strong> Previously called 'protection against direct contact' — protection against contact with live parts under normal conditions. The terminology was updated in the 18th Edition.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Fault protection:</strong> Previously called 'protection against indirect contact' — protection against contact with exposed-conductive-parts that have become live under fault conditions.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Consumer unit:</strong> Not 'fuse box', 'fuse board', or 'breaker panel'. The correct term for domestic distribution equipment is 'consumer unit'. For commercial installations, use 'distribution board'.</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Common abbreviations</h4>
            <p>The electrical trade uses many abbreviations. Always ensure you know what they stand for:</p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">RCD</strong> — Residual Current Device (not 'trip switch' or 'safety switch')</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">MCB</strong> — Miniature Circuit Breaker (not just 'breaker')</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">RCBO</strong> — Residual Current Breaker with Overcurrent protection</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">EICR</strong> — Electrical Installation Condition Report</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">EIC</strong> — Electrical Installation Certificate</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">MEIWC</strong> — Minor Electrical Installation Works Certificate</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">SWA</strong> — Steel Wire Armoured (cable)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Zs</strong> — Earth fault loop impedance (note: lowercase 's' is a subscript)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Ze</strong> — External earth fault loop impedance</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">R1+R2</strong> — Combined resistance of line conductor and circuit protective conductor</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">When to use full terms vs abbreviations</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Write the full term the first time you use it, with the abbreviation in brackets — then use the abbreviation thereafter. Example: "The Residual Current Device (RCD) was tested. The RCD tripped within 28ms."</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Use full terms when writing for non-technical audiences (clients, building managers, letting agents)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Abbreviations are acceptable in technical reports, test schedules, and communication with other electricians</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>On certificates, standard abbreviations (RCD, MCB, RCBO, Zs, Ze) are understood and acceptable</span></li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">Using the correct technical terminology demonstrates competence. A report that refers to the 'fuse box' instead of 'consumer unit', or the 'trip switch' instead of 'RCD', suggests the author may not be fully conversant with current standards and practice.</p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 04 */}
        <InlineCheck
          id="m2s4-terminology-check"
          question="Which sentence uses the correct technical terminology for a professional report?"
          options={[
            "The fuse box was replaced with a new breaker panel",
            "The trip switch kept going off every time the kettle was plugged in",
            "The consumer unit has been replaced and fitted with RCBOs to all circuits",
            "The safety switch in the fuseboard needs a new earth wire"
          ]}
          correctIndex={2}
          explanation="'The consumer unit has been replaced and fitted with RCBOs to all circuits' uses correct technical terminology throughout. The other options use colloquial terms ('fuse box', 'breaker panel', 'trip switch', 'going off', 'safety switch', 'fuseboard', 'earth wire') that should be replaced with proper terms in professional documentation."
        />

        {/* Section 05 — Sentence Structure */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">05</span>
            <h3 className="text-lg font-bold text-white">Sentence Structure</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Clear writing starts with clear sentences. In technical writing, short, direct sentences are always preferable to long, complex ones. Your aim is to be understood, not to impress. Every sentence you write on a certificate, in a report, or in an email should pass one test: would the reader understand exactly what you mean on the first reading?
            </p>

            <h4 className="text-white font-semibold pt-2">Complete sentences</h4>
            <p>A complete sentence needs a subject (who or what) and a verb (what they are doing or what happened). Sentence fragments are incomplete and cause confusion:</p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">&bull;</span><span><strong className="text-red-300">Fragment:</strong> "Tested and found satisfactory." (Who tested? What was tested?)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-green-300">Complete:</strong> "The insulation resistance of Circuit 3 was tested and found satisfactory at 200 MΩ."</span></li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">&bull;</span><span><strong className="text-red-300">Fragment:</strong> "Because the RCD did not trip."</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-green-300">Complete:</strong> "The circuit was de-energised because the RCD did not trip within the required time."</span></li>
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">&bull;</span><span><strong className="text-red-300">Fragment:</strong> "Loose connections throughout."</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-green-300">Complete:</strong> "Loose connections were found at multiple socket outlets throughout the ground floor."</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Active vs passive voice</h4>
            <p>
              Active voice is clearer, shorter, and more direct than passive voice. In active voice, the subject does the action. In passive voice, the action is done to the subject:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-2"><span className="text-white/40 mt-0.5">&bull;</span><span><strong className="text-white/60">Passive:</strong> "The supply should be isolated before work commences"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-green-300">Active:</strong> "Isolate the supply before starting work"</span></li>
                <li className="flex items-start gap-2"><span className="text-white/40 mt-0.5">&bull;</span><span><strong className="text-white/60">Passive:</strong> "The test was carried out and it was found that the readings were satisfactory"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-green-300">Active:</strong> "I tested the circuit and the readings were satisfactory"</span></li>
              </ul>
            </div>
            <p>
              Note: In some formal documents like EICR observations, passive voice is conventional ("The installation was found to be..."). Use whichever voice is appropriate for the document type, but in general, prefer active voice for clarity.
            </p>

            <h4 className="text-white font-semibold pt-2">One idea per sentence</h4>
            <p>
              Long sentences that try to convey multiple ideas are harder to read and more likely to contain errors. Break them up:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">&bull;</span><span><strong className="text-red-300">Too long:</strong> "The consumer unit was replaced with a new metal-clad unit fitted with RCBOs to all circuits and the earthing arrangement was confirmed as TN-C-S and the main earth was measured at 0.12 ohms and all circuits were tested and the results were satisfactory."</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-green-300">Better:</strong> "The consumer unit was replaced with a new metal-clad unit fitted with RCBOs to all circuits. The earthing arrangement was confirmed as TN-C-S, with a main earth reading of 0.12 Ω. All circuits were tested and the results were satisfactory."</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Clear instructions</h4>
            <p>When writing instructions in method statements or safe systems of work:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Use imperative mood (commands): "Isolate the supply" not "The supply should be isolated"</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>One instruction per sentence — do not chain multiple actions together</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Be specific: "Test at 500 V DC" not "Test at the appropriate voltage"</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Include quantities and measurements: "Install 4mm² twin and earth cable" not "Install suitable cable"</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">If you read your sentence aloud and need to take a breath in the middle, it is probably too long. Break it into two or more shorter sentences. Technical writing is about clarity, not literary style.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 06 — Punctuation Essentials */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">06</span>
            <h3 className="text-lg font-bold text-white">Punctuation Essentials</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Punctuation is not about being pedantic — it changes the meaning of sentences. In technical documents, incorrect punctuation can cause genuine confusion and even create safety risks. A missing comma in a list of actions can merge two separate steps into one. A misplaced apostrophe can change a plural into a possessive. These are the punctuation marks you need to use correctly in your everyday work.
            </p>

            <h4 className="text-white font-semibold pt-2">Full stops</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Every sentence must end with a full stop (or question mark / exclamation mark)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Use them in abbreviations only where convention requires — 'e.g.' is acceptable; 'BS 7671' does not need full stops</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>In bullet point lists, use full stops at the end of each point if the points are complete sentences. If they are short phrases, full stops are optional but be consistent.</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Commas</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Lists:</strong> "Check the continuity, insulation resistance, polarity and earth fault loop impedance" — in UK English, the comma before 'and' (Oxford comma) is optional, but be consistent throughout the document.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Joining clauses:</strong> "The test was completed, and the results were satisfactory" — use a comma before 'and', 'but', or 'so' when joining two independent clauses (each of which could stand alone as a sentence).</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">After introductory words:</strong> "However, the insulation resistance was below the minimum acceptable value" / "Following the test, the circuit was re-energised"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Separating additional information:</strong> "The consumer unit, which was installed in 2003, requires upgrading" — commas around the extra information that could be removed without changing the core meaning.</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Apostrophes</h4>
            <p>
              Apostrophes have only two jobs — showing possession and indicating contractions. They are NEVER used to make plurals. This is one of the most common errors in the trade.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Possession (singular):</strong> "The client's property" / "The board's main switch"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Possession (plural):</strong> "The clients' properties" (more than one client) / "The circuits' protective devices"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Contraction:</strong> "It's important to test" (it is) / "Don't work live" (do not)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-red-300">NOT for plurals:</strong> "3 RCDs" is correct — "3 RCD's" is WRONG. "All circuits" is correct — "All circuit's" is WRONG.</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-red-300">NOT with decades:</strong> "1990s" is correct — "1990's" is WRONG (unless you mean something belonging to the year 1990).</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Colons and semicolons</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Colon (:)</strong> — introduces a list or an explanation: "The following tests were carried out: continuity, insulation resistance and polarity"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Colon (:)</strong> — introduces an explanation: "The circuit was de-energised: the RCD had tripped due to an earth fault"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Semicolon (;)</strong> — connects two related but independent sentences: "The lighting circuit passed all tests; the ring final circuit required further investigation"</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Hyphens and dashes</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Hyphen (-):</strong> Joins compound words — "metal-clad", "single-phase", "like-for-like", "circuit-protective conductor"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">En dash (&ndash;):</strong> Shows a range — "230&ndash;240V", "16&ndash;32A", "pages 41&ndash;45"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Em dash (&mdash;):</strong> Used in place of commas or brackets for emphasis — "The consumer unit &mdash; which was over 30 years old &mdash; was replaced"</span></li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">The most common punctuation error in the electrical trade is using apostrophes to form plurals — "RCD's", "MCB's", "circuit's". Remember: apostrophes show possession or contraction, never plurals. If in doubt, ask yourself: does it own something, or is it a shortened form? If neither, do not use an apostrophe.</p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 06 */}
        <InlineCheck
          id="m2s4-punctuation-check"
          question="Which of these sentences is correctly punctuated?"
          options={[
            "The RCD's were tested and found to be satisfactory.",
            "The RCDs were tested, and found to be satisfactory.",
            "The RCDs were tested and found to be satisfactory.",
            "The rcds were tested and found to be satisfactory"
          ]}
          correctIndex={2}
          explanation="'The RCDs were tested and found to be satisfactory.' is correct. 'RCDs' is a simple plural (no apostrophe needed), 'and' here joins two parts of the same clause (not two independent sentences, so no comma is needed), and the sentence ends with a full stop. Option 1 incorrectly adds an apostrophe; option 2 incorrectly adds a comma; option 4 fails to capitalise the abbreviation and has no full stop."
        />

        {/* Section 07 — Proofreading Techniques */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">07</span>
            <h3 className="text-lg font-bold text-white">Proofreading Techniques</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Even experienced writers make errors. Proofreading is the final safety net before a document is submitted. The challenge is that your brain tends to read what it expects to see rather than what is actually written. These techniques will help you catch mistakes that you would otherwise miss.
            </p>

            <h4 className="text-white font-semibold pt-2">Technique 1: Read aloud</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Read the document aloud, slowly and deliberately — your ear will catch errors that your eye misses</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>If a sentence sounds awkward when spoken, it probably needs rewriting</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>This is especially effective for spotting missing words, wrong homophones, and sentences that do not flow</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>If you cannot read aloud on site, move your lips silently — this still engages the 'hearing' part of your brain</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Technique 2: Read backwards</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Read the last sentence first, then the one before, and work your way to the beginning</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>This breaks the flow of meaning and forces you to focus on each sentence individually</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Particularly useful for spotting spelling errors and punctuation problems</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>For individual word spelling, you can read each word in isolation by covering the surrounding text</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Technique 3: The overnight rule</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>If time allows, write the document and then review it the following day</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Fresh eyes spot errors that tired eyes miss — this is especially valuable for important documents like quotations and reports</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Even a 30-minute break between writing and proofreading makes a significant difference</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Technique 4: Use spell check wisely</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Spell check helps with:</strong> Obvious typos, repeated words, basic spelling errors, and flagging potential problems</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Spell check misses:</strong> Wrong homophones (their/there), incorrect technical terms, context errors (e.g. 'earth to small' instead of 'earth too small'), and proper nouns</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Set to UK English:</strong> Ensure your spell checker is set to British English (en-GB) to catch Americanisms (colour not color, centre not center, earthing not grounding)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Never rely on spell check alone — it is a tool, not a substitute for careful reading</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Technique 5: The checklist approach</h4>
            <p>Before submitting any document, run through this mental checklist:</p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Are all technical terms spelt correctly? (accessory, fluorescent, maintenance, luminaire)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Have I used the correct homophones throughout? (their/there/they're, your/you're, its/it's, to/too)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Are all sentences complete — with a subject and a verb?</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Is the punctuation correct — especially apostrophes?</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Have I used UK English spellings throughout?</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Are abbreviations consistent and correctly capitalised?</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span>Is the tense consistent throughout the document?</span></li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">Proofreading is not optional — it is part of the job. Just as you would never hand over an installation without testing it, you should never submit a document without proofreading it. Budget time for proofreading as part of your workflow.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 08 — Quick Reference Guide */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">08</span>
            <h3 className="text-lg font-bold text-white">Quick Reference Guide</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              This section brings together everything from this module into a quick-reference guide that you can return to whenever you need a reminder. Bookmark this page and use it as a checklist before submitting certificates, reports, emails and other professional documents.
            </p>

            <h4 className="text-white font-semibold pt-2">Putting it all together — a real-world example</h4>
            <p>Let us apply everything from this section to a real-world task: writing a professional observation on an EICR.</p>

            <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-red-300 mb-2">Poor Example</h4>
              <p className="text-sm text-white/70 italic">
                "there consumer unit has no rcd protection its old and the earths are to small, the accessorie's in the kitchen are loose to. needs replacing urgently theres danger of shock"
              </p>
              <p className="text-xs text-white/50 mt-3">
                <strong className="text-red-300">Errors found:</strong> Wrong homophone (there/their), wrong homophone (its/it's), wrong homophone (to/too), incorrect apostrophe (accessorie's), wrong homophone (to/too), missing capitals, missing full stops, fragment sentence ("needs replacing"), missing apostrophe (theres), vague language, no specific location, no observation code, no regulation reference.
              </p>
            </div>

            <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-green-300 mb-2">Professional Example</h4>
              <p className="text-sm text-white/70 italic">
                "The consumer unit (located in the hallway cupboard) does not incorporate RCD protection for circuits serving socket outlets. The installation predates the requirement for RCD protection under BS 7671. Protective conductors on Circuits 1, 3 and 5 are undersized for the associated overcurrent protective devices. Accessory faceplates in the kitchen are loose and not secured to the back boxes. (C2 — Potentially dangerous: recommend consumer unit upgrade with full RCBO board and re-termination of affected circuits.)"
              </p>
              <p className="text-xs text-white/50 mt-3">
                <strong className="text-green-300">Why this works:</strong> Correct spelling throughout, proper use of technical terminology, complete sentences with subjects and verbs, specific locations given, correct punctuation, regulation reference included, observation code with recommended action.
              </p>
            </div>

            <h4 className="text-white font-semibold pt-2">Top 10 spelling errors in the trade</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-start gap-2"><span className="text-green-400 font-mono text-xs mt-0.5">1.</span><span><strong className="text-white/90">accessory</strong> (not accessorie)</span></div>
                <div className="flex items-start gap-2"><span className="text-green-400 font-mono text-xs mt-0.5">2.</span><span><strong className="text-white/90">fluorescent</strong> (not florescent)</span></div>
                <div className="flex items-start gap-2"><span className="text-green-400 font-mono text-xs mt-0.5">3.</span><span><strong className="text-white/90">separate</strong> (not seperate)</span></div>
                <div className="flex items-start gap-2"><span className="text-green-400 font-mono text-xs mt-0.5">4.</span><span><strong className="text-white/90">maintenance</strong> (not maintainance)</span></div>
                <div className="flex items-start gap-2"><span className="text-green-400 font-mono text-xs mt-0.5">5.</span><span><strong className="text-white/90">installation</strong> (not instillation)</span></div>
                <div className="flex items-start gap-2"><span className="text-green-400 font-mono text-xs mt-0.5">6.</span><span><strong className="text-white/90">occurrence</strong> (not occurance)</span></div>
                <div className="flex items-start gap-2"><span className="text-green-400 font-mono text-xs mt-0.5">7.</span><span><strong className="text-white/90">continuity</strong> (not continuety)</span></div>
                <div className="flex items-start gap-2"><span className="text-green-400 font-mono text-xs mt-0.5">8.</span><span><strong className="text-white/90">luminaire</strong> (not luminare)</span></div>
                <div className="flex items-start gap-2"><span className="text-green-400 font-mono text-xs mt-0.5">9.</span><span><strong className="text-white/90">satisfactory</strong> (not satisfactry)</span></div>
                <div className="flex items-start gap-2"><span className="text-green-400 font-mono text-xs mt-0.5">10.</span><span><strong className="text-white/90">deterioration</strong> (not deteriation)</span></div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Homophone quick reference</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">their</strong> (belonging to them) / <strong className="text-white/90">there</strong> (a place) / <strong className="text-white/90">they're</strong> (they are)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">your</strong> (belonging to you) / <strong className="text-white/90">you're</strong> (you are)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">its</strong> (belonging to it) / <strong className="text-white/90">it's</strong> (it is / it has)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">affect</strong> (verb — to impact) / <strong className="text-white/90">effect</strong> (noun — the result)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">to</strong> (direction) / <strong className="text-white/90">too</strong> (also/excessive) / <strong className="text-white/90">two</strong> (the number)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">lose</strong> (to misplace) / <strong className="text-white/90">loose</strong> (not tight)</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Apostrophe rules — the complete guide</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Possession (singular):</strong> Add 's — "the client's report", "the board's main switch"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Possession (plural ending in s):</strong> Add ' only — "the clients' reports", "the circuits' ratings"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Possession (plural not ending in s):</strong> Add 's — "the children's rooms", "the men's toilets"</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Contractions:</strong> Replace the missing letter(s) — "it's" (it is), "don't" (do not), "they're" (they are)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-red-300">NEVER for plurals:</strong> RCDs, MCBs, circuits, accessories, 1990s — no apostrophe</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Common grammar pitfalls</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Subject-verb agreement:</strong> "Each of the circuits was tested" (not 'were' — 'each' is singular)</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Tense consistency:</strong> Do not mix past and present tense in the same report — "The circuit was tested and the results were satisfactory" (not 'the results show')</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Double negatives:</strong> "There was no earth connection" (not "There wasn't no earth connection")</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&bull;</span><span><strong className="text-white/90">Sentence fragments:</strong> Every sentence needs a subject and a verb — "Tested and satisfactory" is not a sentence</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Before you submit — final checklist</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#10003;</span><span>Spelling checked — especially trade-specific words?</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#10003;</span><span>Homophones correct throughout?</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#10003;</span><span>All sentences complete with subject and verb?</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#10003;</span><span>Punctuation correct — especially apostrophes?</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#10003;</span><span>Tense consistent throughout?</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#10003;</span><span>UK English spellings used?</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#10003;</span><span>Correct technical terminology used?</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">&#10003;</span><span>Would someone unfamiliar with the job understand what you have written?</span></li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Final Thought</p>
              <p className="text-sm text-white/80">Good spelling, grammar and punctuation are not about being academic — they are about being professional. Your written work represents you, your company and your trade. Taking the time to get it right demonstrates the same attention to detail that clients expect in your electrical work. An electrician who writes well is an electrician who is taken seriously.</p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Section 4: Spelling, Grammar & Punctuation Quiz" />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link to="/study-centre/apprentice/functional-skills/module2/section3" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation">
            <ArrowLeft className="w-4 h-4" />Communication Skills
          </Link>
          <Link to="/study-centre/apprentice/functional-skills/module3" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25">
            Continue to Module 3<ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule2Section4;
