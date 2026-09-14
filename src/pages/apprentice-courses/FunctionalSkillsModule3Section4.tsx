/**
 * Functional Skills · Module 3 · Section 4 — Online safety and communication
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit. Last
 * section in Module 3, so the forward button goes to the module page rather
 * than a Section 5 that does not exist.
 *
 * Built to the teaching-density standard set by Module 1: introduce a
 * technique in a `ConceptBlock`, show it worked in a `WorkedExample`, then
 * hand the learner a second case as a `TryIt`. Nearly everything on this page
 * is a judgement call made under pressure — is this email real, is this
 * password good enough, do I have a lawful basis to hold this — so almost
 * every block ends in a worked decision rather than a description.
 *
 * This page carries forward several accuracy fixes made to the old page and
 * they are NOT reverted here:
 *
 *  - Lawful basis under UK GDPR. The old page wrote "legitimate interest
 *    (fulfilling a contract)", which conflates two separate Article 6 bases.
 *    UK GDPR lists six lawful bases; for an electrician the two that usually
 *    apply are CONTRACT (holding a customer's details to do the job they
 *    asked for) and LEGAL OBLIGATION (retaining records you are required to
 *    keep). Legitimate interests is a third, different basis and is not the
 *    basis for doing a job you were hired to do. Kept exactly.
 *  - ICO data protection fee. The old page said a flat "£40 per year — this
 *    is a legal requirement". It is tiered: a sole trader or small firm sits
 *    in tier 1 (£52 a year, £47 by direct debit at the time of writing), a
 *    small number of businesses are exempt, and the reader is pointed to the
 *    ICO's self-assessment and told to check the current fee. Kept exactly.
 *  - Password strength. "12 characters is 62 trillion times harder to crack
 *    than 6" was wrong by roughly 85x. The real figure on a full keyboard is
 *    around 690 billion times as many combinations. Kept exactly, and the
 *    quiz explanation for the password-length question has been brought
 *    into line with it rather than left claiming an unqualified "billions
 *    of years to crack".
 *  - Zoom's free-tier meeting length and Udemy's course pricing are
 *    time-sensitive vendor claims and stay hedged ("check the current
 *    limit" / "check the price on the day") rather than stated as fact.
 *
 * No new products have been added. LastPass was removed from the password
 * manager list previously and does not come back. The construction-sector
 * mental health charities named at the end (Lighthouse Construction Industry
 * Charity, Mates in Mind) are kept — they are signposting, not products.
 *
 * No <RegsCallout> anywhere: this page paraphrases throughout, and that
 * component renders its `clause` prop as quoted regulation text. No
 * competent person scheme is named — ELECSA no longer exists as a brand, and
 * "a government-authorised competent person scheme" says the same thing
 * without dating the page to a market that will have moved on.
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
  Scenario,
  ContentEyebrow,
  SectionRule,
  WorkedExample,
  TryIt,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Online Safety & Communication - Functional Skills Module 3.4';
const DESCRIPTION =
  'Functional Skills for electricians: email etiquette, spotting phishing and smishing, password security, GDPR obligations, social media practice, video conferencing, online CPD, and managing screen time.';

const quizQuestions = [
  {
    id: 1,
    question:
      'You receive an email claiming to be from your electrical wholesaler asking you to verify your account by clicking a link. The email address is support@electrcal-wholesale-uk.com (note the misspelling). What should you do?',
    options: [
      'Click the link quickly to verify your account before it gets suspended',
      'Do not click; contact the wholesaler directly on a number you already know',
      'Reply to the email asking the sender to confirm the request is genuine',
      'Forward the email to all your colleagues so they can verify their accounts too',
    ],
    correctAnswer: 1,
    explanation:
      "This is a classic phishing attempt. The misspelled domain ('electrcal' instead of 'electrical') is the giveaway once you look for it. Never click links in a suspicious email — contact the company using a number or website you already have on file, not anything in the email itself. Replying confirms your address is live, which invites more of the same.",
  },
  {
    id: 2,
    question:
      "Under GDPR, how long can you retain a customer's personal data (name, address, contact details) after completing their electrical work?",
    options: [
      'Indefinitely, because old customer records may always prove useful in future',
      'Exactly 12 months, after which all of the data must be permanently deleted',
      'Only while there is a legitimate reason, such as warranty or legal retention',
      'For 30 days only, unless the customer specifically requests a longer extension',
    ],
    correctAnswer: 2,
    explanation:
      'GDPR requires that personal data is retained only for as long as there is a genuine reason to hold it. For an electrician that usually means the warranty period and the legal retention period for certificates, which for an installation runs for the life of the installation. When neither reason still applies, the data should go.',
  },
  {
    id: 3,
    question: 'What is the recommended minimum length for a strong password?',
    options: ['8 characters', '4 characters', '6 characters', '12 characters or more'],
    correctAnswer: 3,
    explanation:
      "Security experts recommend passwords of 12 characters or more. Each extra character multiplies the number of combinations an attacker has to search, which is why length matters more than complexity. Going from 6 characters to 12 on a full keyboard increases that search space by roughly 690 billion times over — enough to make brute-forcing it impractical against current attacks, though 'impractical' depends on what the attacker can throw at it and is not a permanent guarantee. Better still, use a passphrase — a string of random words like 'correct horse battery staple' — which is both long and memorable.",
  },
  {
    id: 4,
    question:
      'Which of the following is the best practice for professional email communication with a client?',
    options: [
      'A clear subject line, professional greeting, concise body, and signature block',
      'Lower case with no subject line, to keep the message informal and friendly',
      'Plenty of abbreviations and emojis, so the client knows you are approachable',
      'No greeting or sign-off at all, to save the client a little reading time',
    ],
    correctAnswer: 0,
    explanation:
      'A professional email has a clear subject line naming what it is about, a proper greeting, concise body text, and a signature block carrying your name, company, phone number, email and registration details. That structure is what lets a client act on the email without ringing you to ask what it means.',
  },
  {
    id: 5,
    question:
      'A customer posts a negative review about your work on social media. What is the best response?',
    options: [
      'Ignore the review completely so as not to draw attention to it',
      'Respond politely and professionally, acknowledge their concern, and offer to discuss the matter privately to resolve it',
      'Reply publicly to argue your case and prove the customer is wrong',
      'Ask friends and family to post fake positive reviews to bury it',
    ],
    correctAnswer: 1,
    explanation:
      'A calm, professional reply that acknowledges the concern and offers to resolve it privately does more for your reputation than the review itself ever will. People reading the exchange judge you on how you handled the complaint, not on the complaint. Arguing publicly, however justified you feel, reads badly to everyone except you.',
  },
  {
    id: 6,
    question: 'What is a password manager and why should electricians use one?',
    options: [
      'An app that automatically logs you out of every account after each use',
      'A device that physically locks your laptop to your desk, van, or toolbox',
      'Software that generates and stores unique passwords behind one master password',
      'A service that emails you a reminder whenever one of your passwords needs changing',
    ],
    correctAnswer: 2,
    explanation:
      'A password manager (Bitwarden and 1Password are two well-regarded examples) generates and stores a unique, strong password for every account, so you only have to remember one master password. That removes the habit of reusing passwords, which is what turns one breach into many.',
  },
  {
    id: 7,
    question: 'Which of the following would constitute a GDPR breach if done by an electrician?',
    options: [
      'Sending a completed certificate to the customer who commissioned the work',
      'Keeping electrical installation records to meet legal retention requirements',
      'Photographing your own finished work for your portfolio with no people in shot',
      "Passing a customer's contact details to a third party for marketing, without consent",
    ],
    correctAnswer: 3,
    explanation:
      "Sharing a customer's personal data with a third party for marketing purposes, without their consent, is the clear breach here. The other three are legitimate: giving the data subject their own certificate, retaining records you are legally required to keep, and photographing work with no identifiable people in the frame.",
  },
  {
    id: 8,
    question: "What is 'screen fatigue' and how can electricians manage it?",
    options: [
      'Eye strain and lost concentration from screens — managed by breaks and the 20-20-20 rule',
      'A fault that makes a tablet screen flicker — managed by replacing the display unit',
      'Glare from working under bright site lighting — managed by wearing tinted safety glasses',
      'A drop in battery life on older devices — managed by dimming the screen permanently',
    ],
    correctAnswer: 0,
    explanation:
      'Screen fatigue — digital eye strain — shows up as tired eyes, headaches, and difficulty concentrating after long periods looking at a screen. The 20-20-20 rule helps: every 20 minutes, look at something 20 feet away for 20 seconds. Regular breaks, matching brightness to the room, and a night mode in the evening all help too.',
  },
];

const FunctionalSkillsModule3Section4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 4"
        title="Online safety and communication"
        backTo="/study-centre/apprentice/functional-skills/module3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            Every electrician now runs a chunk of their business through a screen — quotes by email,
            certificates on a tablet, enquiries through a Facebook page, training on YouTube. Almost
            everything in this section is a judgement call you have to make in the moment: is this
            email real, is this password good enough, do I actually have a right to hold this data.
            So rather than a tour of the topics, this section works through real cases, step by
            step, and then gives you a second one to do yourself.
          </p>

          <LearningOutcomes
            outcomes={[
              'Write a professional email with the structure a client can act on without ringing you.',
              'Work through the indicators of a phishing email or smishing text, one at a time, to a verdict.',
              'Apply the four tests of password strength, and decide what to fix and in what order.',
              'Work out which GDPR lawful basis applies to a data-handling decision, and what to do when none does.',
              'Draft a reply to a negative review that protects your reputation rather than defends your pride.',
              'Prepare for a professional video call so nothing on your screen surprises you mid-meeting.',
              'Judge whether an online training source is credible before you act on what it says.',
              'Diagnose your own screen fatigue and pick the right fix for the actual cause.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'An email address you use for work',
                gist: 'The examples assume you already send quotes, certificates or invoices by email, even informally.',
              },
              {
                term: 'Module 3, earlier sections',
                gist: 'This section builds on the documentation and app habits already covered in this module — it does not repeat them.',
              },
            ]}
          />

          <TLDR
            points={[
              'A misspelled domain, manufactured urgency, or a request for a password are the fastest phishing tells. Any one is reason enough to stop.',
              'Verify a suspicious message through a channel you already trust — never through anything supplied in the message itself.',
              'Password strength is mostly length. Going from 6 to 12 characters on a full keyboard multiplies the combinations an attacker has to search by roughly 690 billion.',
              'A password manager and two-factor authentication together are the single biggest security upgrade most people can make in half an hour.',
              'UK GDPR lists six lawful bases. An electrician usually relies on contract and legal obligation — not "legitimate interests", which is a different basis.',
              'The ICO fee is tiered, not flat. Check the self-assessment and the current figure rather than assuming either way.',
              'Never post a customer address on social media, and check every "before" photo for anything else identifying in the frame.',
              'Test a new video platform, and share the single window rather than the whole screen.',
              'Screen fatigue has a cause. Diagnose it before reaching for the fix — the 20-20-20 rule solves a different problem than a boundary around work messages does.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · Email etiquette for professionals</ContentEyebrow>

          <ConceptBlock
            title="Five parts, checked every time"
            onSite="A quote sent by text feels informal. The exact figure sent by email, with a subject line and your signature under it, reads as a professional quotation — and if there is ever a dispute, it is the version that survives."
          >
            <p>
              A working email has a subject line naming what it is, which property, and roughly when
              — "EICR Report — 14 Oak Street — 15 June 2025", not "Update". Then five parts in
              order: a proper <strong className="text-white">greeting</strong> ("Dear Mr/Mrs
              [Name]", or "Hi [Name]" once you have a relationship — never "Hey" or nothing at all),
              an <strong className="text-white">opening</strong> that states the purpose in the
              first sentence, a short <strong className="text-white">body</strong> in bullet points
              where a list helps, a <strong className="text-white">call to action</strong> that says
              exactly what you need from the reader, and a{' '}
              <strong className="text-white">signature block</strong> with your name, company, phone
              number, email and your competent person scheme registration number.
            </p>
          </ConceptBlock>

          <WorkedExample
            question='A colleague hands you an account and you find they sent this to the client: "hey job all done let us know if issues, dave". Turn it into an email a client would take seriously.'
            steps={[
              {
                calc: 'Subject — "Consumer Unit Upgrade Complete — 8 Beech Grove"',
                note: 'Names the job and the property. "Job all done" is not findable in six months.',
              },
              {
                calc: 'Greeting — "Dear Mr Ahmed,"',
                note: 'Formal until there\'s an established relationship. "Hey" reads as an afterthought, not a job worth the client\'s money.',
              },
              {
                calc: 'Opening — state what and when',
                note: '"I\'m writing to confirm the consumer unit upgrade at 8 Beech Grove was completed today, 12 September."',
              },
              {
                calc: 'Body — what changed, in one or two lines',
                note: 'What was replaced and tested, and the certificate that follows it — enough for the client to know the job is genuinely finished.',
              },
              {
                calc: 'Call to action — tell them what to do if something is wrong',
                note: '"If anything doesn\'t feel right — a switch not resetting, a light flickering — call me on [number] and I\'ll come straight back."',
              },
              {
                calc: 'Signature block',
                note: 'Name, company, phone, competent person scheme registration number.',
              },
            ]}
            answer="Six lines instead of one, and every one of them earns its place: what the job was, that it is done, what to do if it is not right, and how to reach you. The original told the client nothing they could act on."
            watchOut='"Let us know if issues" sounds friendly but gives the client no number, no name, and no sense of what "issues" would look like. A call to action has to be specific enough to actually be followed.'
          />

          <TryIt
            question="You are emailing sixteen leaseholders in a block to tell them when the communal lighting will be off for testing. You put all sixteen addresses in the To field. What have you done, and what should you have done?"
            steps={[
              {
                calc: 'Every recipient can now see all sixteen addresses',
                note: 'An email address is personal data. You have disclosed all sixteen to all sixteen without any of them agreeing to it.',
              },
              {
                calc: 'That is a personal data breach, not just bad manners',
                note: 'You have shared identifiable data with third parties who had no lawful basis to receive it.',
              },
              {
                calc: 'Use BCC instead',
                note: 'Put your own address in To, and all sixteen in BCC. Each person sees only their own.',
              },
              {
                calc: 'Better still for a block: ask the managing agent to circulate it',
                note: 'Then you never hold the list at all, which is the cleanest answer.',
              },
            ]}
            answer="Sixteen addresses disclosed to sixteen people. Use BCC, or route it through whoever legitimately holds the list. This is one of the most common accidental data breaches in any trade, and it is entirely avoidable by moving one field."
          />

          <CommonMistake
            title="Sending before proofreading"
            whatHappens="An important email goes out with a typo in the price, a wrong date, or the words 'please see attached' with nothing attached. None of these is a big deal on its own, but together they read as carelessness — and this is a trade where clients are already looking for a reason not to trust the paperwork."
            doInstead="For anything that matters, draft it, leave it ten minutes, then re-read it before sending. Check the attachment is actually there. It costs almost nothing and it is the difference between looking sharp and looking rushed."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · Phishing and scam awareness</ContentEyebrow>

          <ConceptBlock
            title="Five checks, in order, every time"
            onSite="Electricians are a good target precisely because you check emails quickly between jobs, often on a small screen, with your mind on the next job rather than the one in your inbox."
          >
            <p>
              Work a suspicious message the same way every time:{' '}
              <strong className="text-white">the sender's actual address</strong> (not the display
              name), <strong className="text-white">urgency or threats</strong> (a tight deadline is
              pressure, not proof), <strong className="text-white">spelling and grammar</strong> (a
              real organisation proofreads its own mail),{' '}
              <strong className="text-white">where a link actually goes</strong> (hover, do not
              click), and <strong className="text-white">what it is asking for</strong> (a password
              or bank details by email is never legitimate). One flag is a reason to look harder;
              two or more is a verdict.
            </p>
          </ConceptBlock>

          <WorkedExample
            question='Your electrical wholesaler emails: "Your account has been suspended for security review. Verify your details within 24 hours to restore access." It is from support@electrcal-wholesale-uk.com and asks you to log in via a link. Work through it and reach a verdict.'
            steps={[
              {
                calc: 'Sender domain — electrcal-wholesale-uk.com',
                note: 'Misspelled ("electrcal" for "electrical"). A genuine wholesaler owns and spells its own domain correctly.',
              },
              {
                calc: 'Urgency — "within 24 hours"',
                note: 'A tight, unexplained deadline designed to make you act before you think.',
              },
              {
                calc: 'The ask — click a link and log in',
                note: 'The message wants your login credentials entered on a page it controls, not one you navigated to yourself.',
              },
              {
                calc: 'Cross-check — does the wholesaler usually email like this?',
                note: 'Genuine account issues are normally raised by phone or shown when you log in directly, not chased by email with a countdown.',
              },
            ]}
            answer="Phishing. Do not click the link. Contact the wholesaler on a number you already have — from an invoice, a saved contact, or their known website typed in yourself — and ask whether there is really an issue."
            watchOut="Replying to the email to ask 'is this genuine?' still confirms your address is live and monitored, which invites more attempts. Contact through a completely separate channel instead."
          />

          <WorkedExample
            question='An email arrives from "HMRC": "You are entitled to a tax refund of £1,247.50. Click here to claim before your case is closed." The sender name shows as HM Revenue & Customs. Work through it.'
            steps={[
              {
                calc: 'Channel and claim — an unsolicited refund by email',
                note: 'HMRC does not email or text links inviting you to claim a refund. This alone is close to conclusive.',
              },
              {
                calc: 'The precise figure — £1,247.50',
                note: 'A specific, plausible-looking amount is chosen deliberately, to feel too concrete to be fake.',
              },
              {
                calc: 'Deadline pressure — "before your case is closed"',
                note: 'Manufactured urgency again, aimed at stopping you checking calmly.',
              },
              {
                calc: 'Display name vs sender address',
                note: 'A display name can say anything the sender chooses. Check the actual address behind it, which will not be a genuine gov.uk domain.',
              },
            ]}
            answer="Phishing. Delete it, and if you want to be thorough, forward it to report@phishing.gov.uk. If you ever suspect you owe or are owed tax, check by logging into your HMRC account directly through gov.uk — never through a link in an email."
          />

          <InlineCheck
            id="m3s4-phishing"
            question="You receive a text message saying: 'HMRC: You are due a tax refund of £1,847.20. Claim now at: hmrc-refunds-uk.co.com'. What should you do?"
            options={[
              'Click the link and enter your bank details to receive the refund quickly',
              'Forward the text to a friend to check whether they got the same message',
              'Delete it — HMRC never texts refund links — and report it by forwarding to 7726',
              'Reply to the message asking the sender for a few more details first',
            ]}
            correctIndex={2}
            explanation="This is smishing — SMS phishing. HMRC never sends text messages with links for tax refunds, and the domain 'hmrc-refunds-uk.co.com' is not a genuine HMRC domain. Delete it and report it by forwarding to 7726, the UK's scam-text reporting number. Never click a link in an unsolicited message offering a refund or demanding urgent action."
          />

          <TryIt
            question='A message arrives from a number you do not recognise: "We need urgent electrical work at 14 Trent Close. Please open the attached specification and confirm you can attend tomorrow." Work through the same checks and reach a verdict.'
            steps={[
              {
                calc: 'Sender — an unrecognised personal number',
                note: 'Genuine commercial enquiries arrive through a company, a referral, or a number already in your records, not cold from nowhere.',
              },
              {
                calc: 'Urgency — "attend tomorrow"',
                note: 'A short deadline that discourages you from checking the job out first.',
              },
              {
                calc: 'The ask — open an attachment',
                note: 'A specification, on a genuine job, usually comes after a phone conversation, not before one, and rarely as the very first contact.',
              },
              {
                calc: 'Cross-check — would a real client send it this way?',
                note: 'A property owner with urgent electrical work almost always rings, or is referred by someone you already know.',
              },
            ]}
            answer="Very likely phishing aimed at getting you to open a malicious attachment. Do not open it. If you want to check, ring the number back rather than opening anything, or ask whoever might have referred the job whether they actually sent it."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Password security</ContentEyebrow>

          <ConceptBlock
            title="Four tests, and length wins most arguments"
            plainEnglish="A long, plain passphrase beats a short, complicated password almost every time."
          >
            <p>
              Run every password against four tests: <strong className="text-white">length</strong>{' '}
              (12 characters minimum — adding six characters to a six-character password multiplies
              the combinations by the size of the character set six times over, which on a full
              keyboard is roughly 690 billion times as many combinations as before),{' '}
              <strong className="text-white">complexity</strong>
              (helpful, but secondary to length), <strong className="text-white">uniqueness</strong>
              (never reused — this is the one that matters most, because one breach then stays one
              breach), and <strong className="text-white">unpredictability</strong> (no dictionary
              words, names, dates, or anything guessable from your own social media). Pair a strong
              password with a manager (Bitwarden or 1Password generate and store one for every
              account) and two-factor authentication, which stops a stolen password being enough on
              its own — prioritise it on email first, since most other accounts can be reset through
              it.
            </p>
          </ConceptBlock>

          <WorkedExample
            question='Two passwords: "Sparky2024!" and "van-ladder-thermostat-42". Which is actually stronger, and why?'
            steps={[
              {
                calc: 'Length — 11 characters vs 25',
                note: 'The passphrase is more than double the length before anything else is considered.',
              },
              {
                calc: 'Predictability — "Sparky2024!"',
                note: 'A trade word, a plausible current year, and a common symbol on the end. This exact shape — word, year, symbol — is one of the first patterns automated cracking tools try.',
              },
              {
                calc: 'Predictability — the four-word passphrase',
                note: 'Four unrelated words in no dictionary combination together. There is no shortcut pattern for an attacker to try first.',
              },
              {
                calc: 'Memorability',
                note: 'The passphrase is arguably easier to actually remember than the "clever" substitution password, which is the usual objection to going long.',
              },
            ]}
            answer="The passphrase is far stronger, mainly on length and because it avoids a well-known predictable pattern — not because it looks more complicated. It does not."
            watchOut="Do not judge password strength by how complicated it looks to a human eye. Cracking tools do not see complexity the way we do; they see search space, and search space is mostly about length."
          />

          <TryIt
            question='You use "ElectricalWork1" for your wholesaler login, your email, and your certification software. Apply the four tests and decide what to change first.'
            steps={[
              {
                calc: 'Length — 16 characters',
                note: 'Passes the length test on its own, which is exactly why this one is easy to get wrong.',
              },
              {
                calc: 'Uniqueness — reused across three accounts',
                note: 'Fails outright, regardless of how long it is. One breach on any of the three now exposes all three.',
              },
              {
                calc: 'Unpredictability — trade phrase plus a single digit',
                note: 'A recognisable pattern, not a random one — closer to "Sparky2024!" than it looks at first glance.',
              },
              {
                calc: 'Which account first?',
                note: 'Email, because most other accounts (banking, wholesaler, certification software) can be reset through it if it is compromised.',
              },
            ]}
            answer="Change the email password first, to a unique passphrase from a password manager with 2FA enabled, then work down through the other two accounts giving each its own unique password. Length was never the problem here — reuse was."
          />

          <CommonMistake
            title="Reusing one strong password everywhere"
            whatHappens="You put real effort into one memorable, strong password and then use it for email, the wholesaler account, and the certification software, reasoning that at least it's a good one. One of those three gets breached — and breaches happen to the site, not to you — and the attacker now has a working password for all three."
            doInstead="Uniqueness matters more than any individual password's strength. This is precisely the problem a password manager solves: it makes generating and remembering a different strong password for every site no harder than remembering one master password."
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · GDPR for electricians</ContentEyebrow>

          <ConceptBlock
            title="Two lawful bases, a fee, and a 72-hour clock"
            onSite="If you ever hear 'legitimate interest' offered as the reason you can keep a customer's details after a job, treat that as a flag rather than an answer."
          >
            <p>
              The UK GDPR, alongside the Data Protection Act 2018, applies to every business
              handling personal data — including a sole-trader electrician, and including names,
              addresses, access codes, site photos showing people, and payment details. You need a
              lawful reason to hold any of it, and the UK GDPR lists six. Two cover most of what an
              electrician does: <strong className="text-white">contract</strong>, which covers
              holding a customer's name, address and phone number so you can carry out the work they
              asked for, and <strong className="text-white">legal obligation</strong>, which covers
              retaining certificates and records you are required to keep. These are separate bases
              — "legitimate interests" is a third, different one, and it is not the basis for doing
              a job you were hired to do.
            </p>
            <p>
              Alongside that: collect only what you need, delete it once neither basis still
              applies, encrypt devices and lock them with a PIN or biometric, and give customers a
              short privacy notice explaining what you hold. Most electricians holding customer
              details electronically also need to pay the ICO's annual data protection fee. It is
              tiered by size, and a sole trader or small firm falls in tier 1 — £52 a year, or £47
              by direct debit at the time of writing. A small number of businesses are exempt, and
              the ICO publishes a short self-assessment that tells you in a couple of minutes which
              applies to you. Check it rather than assume either way, and check the current fee,
              because it changes.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="You completed an EICR eighteen months ago. The customer has since sold the property and you have no further contact with them. Do you still have a lawful basis to hold their name, address and the report on file?"
            steps={[
              {
                calc: 'Was the contract basis for a live job?',
                note: 'No — the job is finished and there is no ongoing work to perform for them.',
              },
              {
                calc: 'Does a legal obligation apply instead?',
                note: 'Yes — certificate retention requirements mean you should keep the record for the life of the installation, independent of who currently owns the property.',
              },
              {
                calc: 'Is any of the data now surplus to that obligation?',
                note: 'The contact number, for instance, is not needed to satisfy a record-keeping duty and could reasonably be reviewed once it is no longer needed for anything else.',
              },
            ]}
            answer="Yes, on the legal obligation basis — for the certificate and the details needed to identify the installation it covers. The contract basis that originally justified holding their live contact details has lapsed; keep what the retention requirement actually needs, not everything from the original job by default."
            watchOut="Do not reach for 'legitimate interests' to justify holding data past the reason you originally collected it for. If neither contract nor legal obligation covers it, that is a sign to review what you are keeping, not a cue to find a third basis to paper over the gap."
          />

          <TryIt
            question="You leave your work tablet — customer names, addresses, access codes and site photos — on a train. Work through what you must decide, and by when."
            steps={[
              {
                calc: 'What was actually on it?',
                note: 'Names, addresses and access codes together is a real risk profile, not just an inconvenience — enough to let a stranger identify and potentially access a property.',
              },
              {
                calc: "Is there a risk to the individuals' rights?",
                note: 'With access codes involved, plausibly yes. That is the test that decides whether you must report it.',
              },
              {
                calc: 'The 72-hour clock',
                note: 'It starts when you become aware of the loss, not when you get around to dealing with it. Reporting to the ICO within 72 hours applies where there is a risk.',
              },
              {
                calc: 'What else, immediately',
                note: 'Remote-lock or wipe the device if you can, and change any passwords it had saved.',
              },
            ]}
            answer="Report to the ICO within 72 hours of realising it is lost, given the risk the access codes create. Remote-wipe the device if the option exists, and tell the affected customers directly if the risk to them is high — for instance, change any access codes that were on it as soon as possible, and let them know why."
          />

          <InlineCheck
            id="m3s4-gdpr"
            question="A letting agent asks you to email them a list of all your residential customers' names and addresses so they can offer property services. What is the correct response?"
            options={[
              'Send the list — it helps the agent and your customers might appreciate the service',
              'Refuse — sharing customer personal data with a third party for marketing without customer consent violates GDPR',
              'Send just the addresses without names — that is not personal data',
              'Ask the agent to pay for the list first',
            ]}
            correctIndex={1}
            explanation="Sharing customers' personal data with a third party for marketing purposes, without their explicit consent, is a clear GDPR violation. Even addresses alone can be personal data if they identify an individual. Politely refuse and explain that data protection rules prevent you from sharing customer information this way."
          />

          <CommonMistake
            title="Leaving customer paperwork visible in the van"
            whatHappens="A completed EICR with a customer's name, address and access details sits on the passenger seat, visible through the window, while the van is parked outside the next job. Nobody has to break in for that data to be exposed."
            doInstead="Keep paperwork in a bag or a locked compartment, out of sight from outside the vehicle, the same way you would treat cash or tools you cannot afford to lose."
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Social media best practice</ContentEyebrow>

          <ConceptBlock title="Never post an address, and reply in three moves">
            <p>
              A business page on Facebook, Instagram or LinkedIn can generate real enquiries, but
              two rules protect you and your customers.{' '}
              <strong className="text-white">Never post a customer's address</strong>, even
              innocently — "just completed a rewire at 42 Maple Drive" tells anyone reading it the
              house was empty all week; use a general area instead. And{' '}
              <strong className="text-white">get permission before posting a photo</strong> of work
              at a customer's property, checking the whole frame for anything else identifying, not
              just the installation you are proud of.
            </p>
            <p>
              A negative review works in three moves: acknowledge the concern, keep the tone even,
              and take it private to resolve. Never argue publicly, however justified you feel —
              people reading the exchange judge the response, not the original complaint.
            </p>
          </ConceptBlock>

          <WorkedExample
            question={
              'A customer posts: "Turned up late, left mess, wouldn\'t recommend." How do you reply, in public, in a way that helps rather than hurts you?'
            }
            steps={[
              {
                calc: 'Acknowledge, do not dispute',
                note: '"Sorry to hear the visit didn\'t go as it should have" — accepting the complaint is real, not arguing about whether it is fair.',
              },
              {
                calc: 'One factual line, no more',
                note: 'If there is a genuine explanation (a prior job overran), one neutral sentence is enough. A defence of every point invites a public argument.',
              },
              {
                calc: 'Move it private',
                note: '"I\'d like to put this right — please call me on [number] so I can sort it directly."',
              },
              {
                calc: 'Stop there',
                note: 'Do not post again unless the customer replies. A short, calm reply that ends cleanly reads far better than one that keeps going.',
              },
            ]}
            answer={
              '"Sorry to hear the visit didn\'t go as it should have — I\'d like to put this right. Please call me on [number] so I can sort it directly." Four sentences, no defensiveness, and a route to resolve it away from public view.'
            }
            watchOut="Resist the urge to correct every inaccurate detail publicly. Even a fair correction reads as arguing with a customer in front of everyone else who might hire you."
          />

          <TryIt
            question='A review reads: "Overcharged me massively compared to quote, avoid." Your invoice actually matched the quote exactly — the customer added extra sockets on the day and the invoice reflects that. Draft the public reply.'
            steps={[
              {
                calc: 'Acknowledge first, even though you disagree',
                note: '"Sorry you feel that way about the final cost" keeps the tone even before anything factual is said.',
              },
              {
                calc: 'One neutral factual line',
                note: '"The invoice reflects the additional sockets added on the day, on top of the original quote" — a fact, not an accusation.',
              },
              {
                calc: 'Offer the paper trail privately, not publicly',
                note: '"Happy to go through the breakdown with you directly — please call me on [number]."',
              },
            ]}
            answer='"Sorry you feel that way about the final cost. The invoice reflects the additional sockets added on the day, on top of the original quote — happy to go through the breakdown with you directly, please call me on [number]." Corrects the record once, calmly, and takes the detail off the public thread.'
          />

          <Scenario
            title="The photo the customer did not expect to see online"
            situation="You post a proud before/after shot of a consumer unit upgrade to your business Facebook page. The 'before' photo happens to also show the hallway, with a coat rack, post addressed to the occupier, and a house number visible on a letter on the side table. A customer messages, uncomfortable that their name and address are now visible on a public post."
            whatToDo="Take the post down straight away, apologise, and in future crop or check every 'before' shot for anything identifying — post, letters, name plates, house numbers — before it goes anywhere near a public page."
            whyItMatters="Permission to photograph the work is not the same as permission to publish everything in frame. It is easy to focus on the consumer unit and miss what else the camera caught, and once it is public you cannot fully undo it."
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Video conferencing</ContentEyebrow>

          <ConceptBlock title="Test the platform, then prepare the screen">
            <p>
              Microsoft Teams is the standard on most commercial construction projects and
              integrates with Microsoft 365 for file sharing. Zoom is simple and reliable, though
              the free tier caps meeting length — check the current limit before relying on it for a
              long call. Google Meet runs from a browser with no install, handy for a quick call,
              and FaceTime or WhatsApp Video covers informal calls, such as a client walking you
              round an existing installation to help scope a quote without a site visit.
            </p>
            <p>
              Whichever platform, test camera, microphone and connection beforehand, look at the
              camera rather than the screen when speaking, mute when not talking, and if you are
              screen-sharing, close anything sensitive first and share the specific window rather
              than your whole desktop.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="You are about to screen-share a spreadsheet with a client to walk through a quote. Your browser has four other tabs open, including your online banking, and you have desktop notifications enabled. What do you close or change before you share, and in what order?"
            steps={[
              {
                calc: '1. Close anything with financial or personal information',
                note: 'Banking, personal email, anything you would not want a client glimpsing even briefly.',
              },
              {
                calc: '2. Turn off desktop notifications',
                note: 'A message preview popping up mid-share can reveal far more than you intended.',
              },
              {
                calc: '3. Close unrelated tabs',
                note: 'Fewer things visible means fewer chances of a slip, and it looks tidier.',
              },
              {
                calc: '4. Share the single window, not the whole screen',
                note: 'If the platform offers window-only sharing, use it — it is a hard boundary rather than a habit you have to maintain.',
              },
            ]}
            answer="Close sensitive tabs first, disable notifications, close the rest, then share only the specific window. Doing it in that order means even a slip at step 4 has nothing sensitive left behind it."
          />

          <TryIt
            question="A client wants to FaceTime you to show a fault before you quote for the repair. What do you ask them to do before the call, and what do you have ready on your end?"
            steps={[
              {
                calc: 'Ask them to have the area accessible and lit',
                note: 'Fitting cover off if it is safe for them to remove, curtains open, a torch to hand — a dark, distant shot tells you nothing.',
              },
              {
                calc: 'Ask them to have the consumer unit visible too',
                note: 'You will likely need to see which circuit and what protective devices are fitted, not just the faulty point.',
              },
              {
                calc: 'Have your notepad and a rough day-rate figure ready',
                note: 'You will want to note what you see as you see it, and be able to give an honest early estimate rather than a vague "I\'ll get back to you".',
              },
              {
                calc: 'Confirm the appointment before you hang up',
                note: 'Whether that is a site visit to quote properly or a next step — leaving it open invites a chase-up call later.',
              },
            ]}
            answer="Ask the client to light and clear access to both the fault and the consumer unit before the call. Have your notepad, a rough day-rate figure, and your diary open, and end the call with a concrete next step rather than 'I'll be in touch'."
          />

          <InlineCheck
            id="m3s4-video"
            question="You need to discuss a project with a main contractor who uses Microsoft Teams. You have never used Teams before. What is the best approach?"
            options={[
              'Refuse and insist on a phone call instead',
              'Download Teams, set up your account, and test your audio/video before the scheduled meeting',
              'Tell them you cannot attend',
              'Ask them to use a platform you are already familiar with',
            ]}
            correctIndex={1}
            explanation="Download and familiarise yourself with the platform before the meeting. Teams is free and available on Windows, macOS, iOS and Android. Setting up and testing in advance shows initiative, and since most commercial contractors default to Teams, the few minutes it takes will pay off on future calls too."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Online training platforms</ContentEyebrow>

          <ConceptBlock title="Two tiers of platform, and one test for either">
            <p>
              IET Academy courses come direct from the publishers of BS 7671, and a government-
              authorised competent person scheme typically runs its own modules — both count toward
              CPD. Manufacturer e-learning (Hager, Schneider Electric, Eaton and others) is usually
              free and product-specific. General platforms — Udemy, YouTube, LinkedIn Learning —
              cast a wider net at a lower barrier: Udemy courses are often inexpensive, particularly
              when discounted, though check the price on the day rather than assuming, and YouTube's
              free library is enormous but unfiltered.
            </p>
            <p>
              The wider the net, the more the burden of checking falls on you. Before you act on
              anything a video or a course tells you, check who is telling you, when, and against
              what.
            </p>
          </ConceptBlock>

          <WorkedExample
            question='A YouTube video titled "18th Edition exam prep — everything you need" states a specific figure for maximum Zs on a particular circuit. How do you decide whether to trust it before you use it on a job?'
            steps={[
              {
                calc: "Check the creator's stated credentials",
                note: 'A qualified electrician or trainer with a track record is a different proposition to an anonymous channel with no stated background.',
              },
              {
                calc: 'Check the upload date',
                note: 'BS 7671 is amended periodically. A figure from several editions ago may no longer be current.',
              },
              {
                calc: 'Cross-check the figure against a primary source',
                note: "BS 7671 itself, or the On-Site Guide, rather than taking the video's word for it.",
              },
              {
                calc: 'Scan the comments',
                note: 'A confidently wrong video often has someone underneath correcting it — worth ten seconds before you rely on the claim.',
              },
            ]}
            answer="Use the video to understand the idea, but verify the actual figure against BS 7671 or the On-Site Guide before it goes anywhere near a job. Confidence in delivery is not evidence of accuracy, and a wrong Zs figure is not a small mistake."
          />

          <TryIt
            question="You are considering paying for a Udemy course on cable sizing calculations before your AM2. Apply the same process to decide whether it is worth the money."
            steps={[
              {
                calc: 'Check who wrote it and their background',
                note: "The course page usually states the instructor's trade or teaching credentials — look for something specific, not just a job title.",
              },
              {
                calc: 'Check when it was last updated',
                note: 'A course untouched for several years may predate the current edition of BS 7671.',
              },
              {
                calc: 'Check the current price, not a remembered one',
                note: "Udemy pricing changes often and discounting is aggressive — do not assume last month's price.",
              },
              {
                calc: 'Read a handful of recent reviews',
                note: 'Specifically for accuracy complaints, not just general ratings.',
              },
            ]}
            answer="If the instructor's background checks out, the course was updated reasonably recently, the current price is fair, and recent reviews do not flag accuracy problems, it is a reasonable buy. Any one of those failing is a reason to look for another option before paying."
          />

          <CommonMistake
            title="Trusting a confident presenter over a checkable source"
            whatHappens="A video states a figure or a rule with total confidence, it sounds plausible, and you carry it onto a job without checking it against BS 7671, the On-Site Guide, or a manufacturer's own documentation."
            doInstead="Use video content to understand an idea, then verify anything you intend to act on against a source you could point to if asked — the standard itself, the guidance, or the datasheet."
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Digital wellbeing</ContentEyebrow>

          <ConceptBlock
            title="Diagnose the cause before you reach for the fix"
            plainEnglish="Tired eyes, a fragmented afternoon, and a phone that never stops on a Sunday are three different problems with three different fixes."
          >
            <p>
              Screen fatigue — tired eyes, headaches, trouble concentrating — responds to the
              20-20-20 rule (every 20 minutes, look at something 20 feet away for 20 seconds),
              matching brightness to the room, and a night mode setting in the evening. A fragmented
              day responds to turning off non-essential notifications and setting fixed times to
              check email and social media rather than answering every alert as it lands. And work
              bleeding into evenings and weekends responds to a boundary you set yourself — a stated
              reply-time policy, a cut-off hour, separate profiles for work and personal use where
              your device allows it. If scrolling or comparing your business to others online is
              wearing you down rather than helping it, that is worth noticing too — the construction
              trade has made real progress here, and organisations such as the Lighthouse
              Construction Industry Charity and Mates in Mind support people in it specifically.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="By Friday afternoon your eyes ache, you have a dull headache, and you have lost track of three separate WhatsApp threads with different clients. What is actually going on, and what do you fix first?"
            steps={[
              {
                calc: 'Symptom: aching eyes, headache',
                note: 'Matches screen fatigue specifically — hours of close screen focus without a break.',
              },
              {
                calc: 'Symptom: lost track of three threads',
                note: 'Matches fragmented attention from constant notifications, not eye strain — a different mechanism entirely.',
              },
              {
                calc: 'Match each symptom to its fix',
                note: 'The 20-20-20 rule and a brightness check address the eyes. Turning off non-essential notifications and checking messages at set times addresses the fragmentation.',
              },
              {
                calc: 'Pick one to start with',
                note: 'The eye strain is the more immediate discomfort, so start there today; restructure notifications from tomorrow so the change actually sticks.',
              },
            ]}
            answer="Two separate problems needing two separate fixes: the 20-20-20 rule and a brightness check for the eye strain, and scheduled message-checking rather than live notifications for the fragmented attention. Treating both as 'too much screen time' and just cutting hours would miss what is actually wrong."
          />

          <TryIt
            question="A client has started messaging you at 9pm and on Sundays, and you have been replying quickly because it felt rude not to. Work out the fix."
            steps={[
              {
                calc: 'What set the expectation?',
                note: 'Your own fast replies, however well-intentioned, taught this client that evenings and weekends get a response.',
              },
              {
                calc: 'Decide the boundary before you announce it',
                note: 'For example: messages are answered within one working day, evenings and weekends excluded.',
              },
              {
                calc: 'State it once, plainly, not apologetically',
                note: '"Just to let you know, I reply to messages within one working day — I\'ll pick this up properly tomorrow."',
              },
              {
                calc: 'Hold it the next time it is tested',
                note: 'A boundary stated once and broken the next weekend teaches the opposite lesson to the one you intended.',
              },
            ]}
            answer='State the policy once — "I reply within one working day, evenings and weekends excluded" — and then actually hold it the next time a Sunday message arrives. The fix is not ignoring the client; it is resetting an expectation you set yourself by accident.'
          />

          <CommonMistake
            title="Letting 'always available' become the standard a client expects"
            whatHappens="You reply to a client message within minutes, once, out of habit or good service. From then on that speed is what they expect every time, including at 9pm on a Sunday, and you have set the boundary yourself without meaning to."
            doInstead="Reply within your own working hours as a rule, not an exception. An out-of-office message or a simple stated policy sets the expectation once instead of every single message resetting it."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A working email has a findable subject line and five parts: greeting, opening, body, call to action, signature.',
              'Work a suspicious message through five checks — sender address, urgency, spelling, link destination, what it asks for — and verify through a channel you already trust.',
              "Password strength is mostly length: 6 to 12 characters on a full keyboard multiplies the search space by roughly 690 billion. Uniqueness matters more than any single password's cleverness.",
              'UK GDPR gives six lawful bases. An electrician usually relies on contract and legal obligation — not legitimate interests, which is a separate basis.',
              'A data breach with real risk to individuals is reported to the ICO within 72 hours of you becoming aware of it, not 72 hours from when it is convenient.',
              'A negative review gets acknowledged, answered once factually, and moved private — never argued in public.',
              'Never post a customer address, and check the whole frame of a photo, not just the installation.',
              'Test a new video platform before the meeting, and share the single window rather than the whole desktop.',
              'Check who wrote it, when, and against what before acting on anything a video or course tells you.',
              'Match the fix to the actual cause: the 20-20-20 rule for eye strain, scheduled checking for fragmented attention, a stated boundary for evenings bleeding into work.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Is it ever safe to click a link in an email from a company I actually deal with?',
                answer:
                  "Treat every unexpected link the same way regardless of who it claims to be from: hover to check the destination, and if there is any doubt, go to the company's website directly by typing the address yourself rather than clicking through.",
              },
              {
                question: 'Do I have to register with the ICO even as a one-person business?',
                answer:
                  "Most electricians handling customer data electronically do. Use the ICO's self-assessment to check which fee tier applies, or whether an exemption applies to you — do not assume either way, and check the current fee before paying.",
              },
              {
                question:
                  'Is a password manager actually safe, given it holds all my passwords in one place?',
                answer:
                  'Reputable password managers encrypt your data so that even the provider cannot read it, and the alternative — reused or written-down passwords — is demonstrably worse. The realistic risk is your one master password, so make that one genuinely strong and unique, and add two-factor authentication to the manager itself.',
              },
              {
                question: 'Can I post photos of a job at all if I am worried about GDPR?',
                answer:
                  "Yes, with the customer's permission and with the address kept general. The GDPR concern is about identifying people or their property without consent, not about photographing your own finished work.",
              },
              {
                question: 'What should I actually do if I realise I have clicked a phishing link?',
                answer:
                  'Change the password for that account immediately, and for any other account using the same password. If you entered financial details, contact your bank. Report the message using the address or number given earlier in this section.',
              },
            ]}
          />

          <SectionRule />

          <Quiz questions={quizQuestions} title="Section 4: Online Safety & Communication Quiz" />

          {/* ── prev / next ─────────────────────────────────────────── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module3/section3')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-white touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
              Section 3
            </button>
            <button
              type="button"
              onClick={() => navigate('/study-centre/apprentice/functional-skills/module3')}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-elec-yellow/35 bg-elec-yellow/[0.08] px-4 text-sm font-semibold text-white touch-manipulation"
            >
              Module 3
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule3Section4;
