# College Hub demo: two devices, 20 minutes

For a curriculum lead or head of department. ELE-1853. Written 9 October 2026 against the live screens.

## Before you start (5 minutes, before they arrive)

- **Laptop:** signed in as the demo tutor, open at `/college`. Full screen, notifications off.
- **Phone:** signed in as the demo learner, open at `/apprentice/college-plan`. Brightness up, Do Not Disturb off so the push lands.
- Both accounts are in the demo college, so the update banner, cookie bar, push prompt and first-week checklist stay hidden.
- If the demo data looks thin, refresh it before the meeting:
  `npx --yes supabase db query --linked --project-ref jtwygbeceundfgnkirof -f scripts/college-demo/seed_fixture_mocks.sql`
- Say once, at the start: every name on screen is a made-up demo learner.

## The story in one line

"Your learners already use Elec-Mate for their studies. The College Hub is what you see of that work, and what you send back."

## 1. The tutor's morning (3 minutes), laptop

| Time | Tap | Say |
|---|---|---|
| 0:00 | College home. Point at the header sentence. | "This is the whole day in one sentence: what's waiting, what's late." |
| 0:30 | Scroll to **To assess now**. Tap the **Hours** filter. | "Off-the-job hours come in from learners and their firms. Nothing to chase." |
| 1:00 | Tap the first row. | "One tap to verify, with the day and what they did." |
| 1:30 | **← Back**. | "Back always returns to where you were." |
| 2:00 | Tap the **Review** filter, then a row. | "Progress reviews are booked, pre-filled and signed by all three of you." |
| 2:45 | Press Escape, then **← Back**. | |

**If it goes wrong:** the inbox is empty → tap **Whole college** in the scope switch.

## 2. A learner, start to finish (4 minutes), laptop

| Time | Tap | Say |
|---|---|---|
| 3:00 | **People**, then **Learners**, then **Open Demo Learner (fixture)**. | "Everything about one apprentice on one page." |
| 3:30 | Point at the four figures at the top. | "Criteria passed, hours against plan, attendance, last contact. In words, not scores." |
| 4:00 | Point at **Gateway forecast**. | "When they'll be ready for EPA at their current pace. If it slips, it says what brings it back." |
| 4:45 | Tap **Criteria and assessment**. | "Every criterion, its state, and the evidence behind it." |
| 5:30 | **← Back**, then tap **Mock exams**. | "Mocks they sit on their own, landing here. No re-keying." |
| 6:30 | **← Back** twice to the Learners list. | |

## 3. The phone in their pocket (4 minutes), phone

| Time | Tap | Say |
|---|---|---|
| 7:00 | Hand them the phone. Point at **Do next**. | "This is the apprentice's home: one list, in order, with why each matters." |
| 7:45 | Tap the quiz row, then **Start**. Answer two questions. Close. | "Quizzes you set arrive here with a push." |
| 8:45 | Back on My college, tap **Log work activity**. Show the sheet. Close without saving. | "Hours logged once, on site, in two minutes." |
| 9:30 | Scroll to the EPA card. | "They see the same gateway lines and forecast as you." |
| 10:15 | Scroll to **Add to my calendar**. | "Classes, quiz deadlines and reviews go into their own phone calendar." |

**If it goes wrong:** the phone shows a sign-in screen → sign the demo learner in again (credentials in the fixture file).

## 4. Teaching from the evidence (5 minutes), laptop

| Time | Tap | Say |
|---|---|---|
| 11:00 | **Curriculum** hub. Point at **Where your classes are weakest**. | "Which criteria nobody has evidenced yet, across your classes." |
| 11:45 | Point at **Mock exams in your classes**. | "And what their own mocks say. Calculations is the weakest topic here." |
| 12:30 | **See every learner**. | "Who needs a word first: anyone falling, anyone gone quiet." |
| 13:15 | Close. Tap **See every criterion**. Tick two criteria in the weakest unit. | |
| 13:45 | **Plan a lesson for these**. Show the composer. Close. | "A lesson plan and slides drafted from the regulations, for exactly those gaps." |
| 14:30 | Tick the same two, **Set a quiz for these**. Close before publishing. | "Or a quiz on them, set to the whole class with a due date." |

**Never generate live in a demo unless they ask.** It takes about a minute.

## 5. A message to the class (2 minutes), laptop

| Time | Tap | Say |
|---|---|---|
| 16:00 | **People**, **Learners**, filter **Behind on hours**. | |
| 16:30 | **Message these N** (N is how many are filtered). Pick **Behind on hours**. Step through the preview. | "One message, each with that learner's own figures. Their hours, their gap." |
| 17:30 | Close without sending. | |

## 6. Inspection and quality (2 minutes), laptop

| Time | Tap | Say |
|---|---|---|
| 18:00 | **Quality & compliance**. | "IQA sampling, standardisation, interventions, safeguarding leads." |
| 18:45 | Tap **Audit pack**, then download the PDF. | "One document for an inspector, built from the live record." |
| 19:30 | Close. | |

## Close (30 seconds)

"The learner owns their record, and it travels with them. Your tutors get one place for the evidence, the hours, the reviews and the gaps, on a phone in the workshop."

**Pricing:** don't quote a model or a figure in the room until Andrew has confirmed it. The 2026/27 funding rules (para 220) bar a provider from asking apprentices to pay for anything used to deliver the programme, so never suggest the apprentice pays.

## Questions they usually ask, and the honest answer

- **"What does it cost?"** "We'll send you a quote." Never say the learner pays.

- **"Does it do ILR?"** Exports for your MIS are being built. Ask what format their MIS team imports.
- **"Can staff sign in with Microsoft?"** Being built. Today it is email and password.
- **"What if a learner moves college?"** Their record is theirs and moves with them.
- **"Where is the data held?"** Don't answer from memory. Say the DPIA pack sets it out and send it afterwards.

## Recovery for anything else

- A screen looks stuck → pull down to refresh (phone) or reload (laptop). Nothing is lost.
- You opened something by mistake → Escape closes sheets; **← Back** returns to where you were.
- A number looks wrong → say "demo data", move on, and send a note afterwards.
