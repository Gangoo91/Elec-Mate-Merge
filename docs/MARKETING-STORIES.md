<!-- Generated 2026-07-02 from screen-level UI audits (8 agents reading the actual components: step labels, button text, toasts, validation copy). Companion to FEATURE-PLAYBOOK.md (flows/benefits/spin) and FEATURE-CATALOG.md (inventory). These are full narrative marketing stories: each doubles as a reel script (the beats are the shot list), an ad, or a landing-page section. Every quoted UI string is real and verified in code. -->

# Elec-Mate — Marketing Stories
### True stories from inside the app. Every quote is the real UI.

**Rules (same as the playbook):** "7-day free trial" (never "no card required") · outcomes not mechanisms (no RAG/model names/version labels) · canonical numbers: 19 cert types, 46+ courses, 20,000+ in-app questions, 70+ calculators, 5,900+ free mock questions · keep supplier counts generic ("UK wholesalers") · RAMS takes "a couple of minutes" · never screenshot-fake anything — all of this is really in the app.

**The cast (reuse these consistently):**
- **Dave, 44** — sole trader, Stockport. Domestic/landlord work. Hates evenings of paperwork.
- **Jamie, 19** — 2nd-year apprentice. Phone-native, portfolio-phobic.
- **Claire, 38** — runs an 8-spark firm. Estimator, HR and contracts manager by accident.
- **Mark, 55** — Claire's Qualifying Supervisor. Allergic to email chains.

---

## PART 1 — CERTS & TESTING

### 1. "Snap your board." — the thirty-second consumer unit
**The scene.** Dave's third EICR of the day. Sixteen-way board, hieroglyphic legend, and the bit he hates most: typing sixteen circuits into a form.
**The story.**
1. In the EICR's Testing tab he taps **"Scan board"**. A sheet slides up: *"Snap your board."* — *"Frame the whole unit including the legend. Three-phase boards work — the scanner reads the main switch first."*
2. One photo. A live status card ticks through its phases while he gets the tester out: *"Uploading photo… Reading labels… Identifying devices… Counting circuits…"* with a timer running against *"~30s"*.
3. The results sheet lands: board facts up top — brand, model, main switch, SPD, *"Single phase · 16 way"* — then every circuit as a row: way number in yellow, label, device pill ("RCBO"), curve and rating ("C16"), RCD type ("Type A"), trip current ("30mA").
4. Wrong label on way 7? Tap **"Edit"**, fix it inline. Spare way? Swipe left, **"Delete"**. Then **"Confirm & accept"** — and the whole schedule of tests appears, pre-built.
**The payoff.** The most tedious ten minutes of every EICR now takes about thirty seconds and one photo — and Dave only ever types *readings*, never circuits.
**Proof points.** Real progress phases and ~30s timer in the UI; inline edit/reorder/swipe-delete before accepting; three-phase circuits auto-expand to L1/L2/L3 rows each taking their own readings.
**Where to use.** Hero reel (this is the single most filmable thing in the app), landing page hero, app store preview.
**Captions.** *"Sixteen circuits. One photo. Thirty seconds."* / *"Your camera just filled in the schedule of tests."* / *"Type readings, not boards."*

### 2. The schedule that checks your work
**The scene.** Same EICR. Dave's filling in readings and the form is quietly doing the maths around him.
**The story.**
1. He sets a protective device on circuit 5 — type, curve, rating. The Max Zs column fills itself, RCD-aware: for the RCBO it applies the RCD limit, for bare MCBs the device table, 80% rule applied.
2. Whole board is 30mA Type A? He opens **"Quick Fill RCD Details"**, picks the values once, hits **"Apply to All"** — toast: *"Applied … to all circuits"*. Same for insulation-resistance minimums.
3. Two identical ring finals: tap duplicate — *"Circuit duplicated"* — change one label, done.
4. Then he fat-fingers a Zs. The row flags red: *"C5: Zs 1.2Ω exceeds max 0.85Ω. Check cable length and connections."* Close-but-legal gets amber instead: *"…close to max 0.85Ω (80% rule). May fail in hot conditions."*
**The payoff.** The certificate argues back *before* it's issued — not when a scheme assessor or a QS reads it three weeks later.
**Proof points.** Real validation strings above; expected R1+R2 computed from cable type, length and ambient temperature; quick-fills are one tap across every blank circuit.
**Where to use.** Reel #2 in a cert series; FB group post aimed at "what's your Zs on that?" arguments.
**Captions.** *"My certificate app just told me my Zs was wrong. On site. Not at the assessment."* / *"One tap fills Max Zs for every circuit — and it knows when there's an RCD."*

### 3. C2 or C3? Ask the certificate.
**The scene.** Dave finds damaged insulation on a ring. He knows it's a defect. The classification code is where the arguments live.
**The story.**
1. He writes the observation, taps the AI enhancement. A sheet shows its work: *"Searching BS 7671 regulations…"* → *"Analysing with AI…"* → *"Complete"*.
2. Back comes a **"Suggested Classification"** — his code, an arrow, the suggested code, and a confidence figure. Below it: an **"Enhanced Description"**, a **"Recommended Remedial Action"**, and **"BS 7671 References"** as tappable regulation chips.
3. There's even a **"Client Explanation"** — plain English, copy-only, never written onto the cert.
4. He accepts what's right, field by field, or **"Apply all"** — toast: *"Suggestions applied — 3 fields updated on your observation."*
**The payoff.** The code, the wording and the regulation arrive together — so the report survives the landlord's "is this really necessary?" and anyone else who reads it.
**Proof points.** Per-field Accept buttons (Dave stays in charge); every suggestion carries its regulation; the client explanation is deliberately separate from the formal record.
**Where to use.** Reel; also a strong text post ("what would you code this?" engagement → answer in comments).
**Captions.** *"Code it, word it, cite it — then send the client the plain-English version."* / *"C2 or C3? Get the regulation with the answer."*

### 4. Mark stops chasing paper (the QS story)
**The scene.** Mark counter-signs certs for Claire's firm. His old workflow: printed EICRs, sticky notes, "can you ring Dan about circuit 5?"
**The story.**
1. Dan submits from site — **"Submit for QS review"**, note attached. It lands in Mark's queue: *"QS Reviews — 4 awaiting sign-off."*
2. Mark opens one. Full certificate in the sheet — observations, the whole schedule of tests — and the dodgy circuits are already flagged for his attention.
3. He has a question. He doesn't email — he pins it: the comment field literally says *"Against (optional) — e.g. Circuit 5, Observation 2."* Dan replies from site, in-thread. Either of them taps the circle to mark it resolved.
4. Satisfied, Mark taps **"Approve & countersign"**, signs on screen. Toast: *"Certificate approved — your countersignature will appear on the generated PDF."* The cert locks itself: *"Issued & locked… any later change creates a new version."*
5. Not satisfied? **"Return with comments"** → *"Certificate returned — the electrician has been notified."*
**The payoff.** Sign-off drops from days of email tennis to a same-day loop — with an audit trail a scheme assessor will actually enjoy reading.
**Proof points.** All quoted strings are the real UI; the lock preserves the approved content (nothing can drift after counter-signature); a firm's principal QS can self-review in one tap.
**Where to use.** LinkedIn + FB, aimed at firms on competent-person schemes; strong two-hander reel (Dan's phone / Mark's phone).
**Captions.** *"QS sign-off without a single email."* / *"Pinned to Circuit 5, answered from site, locked on approval."*

---

## PART 2 — WIN THE JOB

### 5. Walk the job, talk the job
**The scene.** Dave's quoting a kitchen rewire at 6pm. Old world: scribbled notes, kitchen-table maths at 9pm, quote sent Thursday. New world:
**The story.**
1. New site visit. Step rail: **"1 · Job → 2 · Capture → 3 · Scope → 4 · Sign."** Client found by search, address autocompletes, property type is one tap.
2. In Capture he flips to **"Voice capture"**. The screen coaches him: *"Walk through the property and describe what you see — rooms, items, quantities. Items appear in real time."* Hints rotate: *"Say 'move to kitchen' to switch rooms"* … *"Say 'actually make that 4' to correct the last item."*
3. He walks and talks. A green dot pulses — *"Listening"* — and a Live Feed stacks up items as he speaks: *Kitchen — 3x double sockets*, undo arrow next to each. He finishes: *"Capture complete — 3 rooms, 12 items."*
4. Step 3 runs the analysis — *"Retrieving materials pricing… Calculating labour…"* — and lands the number: **ESTIMATED TOTAL £4,280.50**, with materials and labour split out (*"First fix 8h, Second fix 6h, Testing & sign-off 2h"*), priced from live UK wholesaler prices.
5. Every line is editable — *"Tap any field to edit"* — and the total recalculates as he tweaks.
6. **"Finalise & continue to sign-off →"** runs a visible six-step checklist (save, link customer, upload photos, lock scope baseline, pre-start checklist) — each with its own tick, each retryable if signal drops.
**The payoff.** He leaves the drive with a priced, photographed, locked scope. The 9pm kitchen-table shift is gone.
**Proof points.** Voice hints and Live Feed are real UI; costs split materials/labour with confidence shown; the finalise checklist makes "did my photos upload?" a visible yes.
**Where to use.** THE hero reel for electrician acquisition. Film it for real on a job.
**Captions.** *"Survey by talking. Price by wholesaler. Quote before the van door shuts."* / *"3 rooms, 12 items, £4,280 — captured on the walk-through."*

### 6. Three merchants, one blind auction
**The scene.** Dave's materials list is worth ~£2,100. Ringing three counters for prices is an hour he doesn't have — so he usually just pays list.
**The story.**
1. From the site visit he taps **"Wholesaler RFQ"**. The sheet says it plainly: *"6 items · price-free, sent BCC so they quote their best."*
2. His saved merchant reps are there as checkboxes; a new one takes a name and email. **"SEND TO (2 selected)."**
3. The preview is a clean, price-stripped list: *"Request for Quotation — My Sparks Ltd… Please quote your best price and availability for the following…"*
4. **"Email 2 wholesalers (BCC)"** — they can't see each other. They quote blind. They compete. (Copy and WhatsApp fallbacks are right there.)
**The payoff.** The merchants do the discounting; Dave keeps the difference as margin.
**Proof points.** BCC is deliberate and stated in the UI; prices are stripped from the RFQ by design; reps are saved once and reused forever.
**Where to use.** FB groups (this one gets shared), short reel.
**Captions.** *"Send the list. Strip the prices. Let them fight."* / *"Stop paying counter price because ringing round is a faff."*

### 7. Signed at the door, booked by bedtime
**The scene.** The client says yes. What usually follows: "I'll email you the quote… chase… chase… deposit?… when can you start?"
**The story.**
1. The client's quote page opens under Dave's own branding — his colour, his logo, and a status pill: *"Awaiting response."* The total sits above a meta grid: quote number, valid-until, status.
2. She reads the breakdown, types her name and email, signs in the box — the button unlocks — **"Accept quote."**
3. If Dave set a deposit, the page flips to *"One step left · pay deposit"* with a card button — *"Secure payment by card · powered by Stripe. Your booking is confirmed as soon as the payment lands."* No Stripe? The bank-transfer table appears with *"Use [quote number] as the payment reference."*
4. Then the bit nobody expects: *"Last step · pick a time."* A slot picker on *his real calendar*: *"Slots show real availability… We'll hold your pick for 10 minutes while you confirm."* → *"Booked. See you on Friday, 12 July at 8:00. A calendar invite (.ics) is on its way."*
**The payoff.** Accept, sign, pay the deposit, book the slot — one page, one evening, zero phone tag.
**Proof points.** Signature-gated accept button; automatic deposit invoice at your default percentage; live-calendar slot picker with a 10-minute hold; every quoted string is real.
**Where to use.** Landing page section ("what your customer sees"); reel filmed from the *client's* phone — a rare customer-side story.
**Captions.** *"Your customer signs, pays the deposit and books the slot — while you're driving home."* / *"The quote that closes itself."*

### 8. The quote that won't be forgotten
**The scene.** Every spark has a graveyard of "sent" quotes. Dave used to find them in October.
**The story.**
1. The quotes page reads his pipeline out loud: *"£18,400 pipeline · 42% win rate"*, with tappable tiles — Won, Pending, Drafts, Invoiced.
2. Quick filters tell him what the client did: **"Viewed"** (it tracks opens), **"Not viewed"**, **"Expiring."**
3. And then the nudge: *"3 awaiting response 7+ days — [Follow up →]"*. One tap batch-creates follow-up tasks for tomorrow at 9am, tagged and linked to each quote.
**The payoff.** Silence stops being a black hole. The follow-up — the thing that statistically wins the job — happens by default.
**Proof points.** Open tracking with counts; the 7-day threshold and one-tap task batch are real; reminders to clients are capped at three so nobody gets spammed.
**Where to use.** Text post + screenshot; mid-funnel email.
**Captions.** *"Sent isn't the end of a quote. It's the start of a follow-up."* / *"It even tells you whether they've opened it."*

---

## PART 3 — GET PAID

### 9. The subbie's tax, done properly
**The scene.** Claire's firm subs to a main contractor. Reverse charge VAT plus CIS deductions — the two things generic invoice apps reliably get wrong.
**The story.**
1. In Money Settings, plain toggles: **"VAT reverse charge"** — helper: *"CIS supplies — charge £0 VAT; customer accounts to HMRC."* **"CIS deduction"** — *"Deducted from labour only (ex-VAT)"* — with rate buttons *"20% · registered"* / *"30% · unverified."*
2. A live preview shows the money before she commits: labour ex-VAT, *"Less CIS (20%)"* in red, *"Net payable"* in yellow.
3. And a guard rail: CIS on but no labour lines? Amber warning — *"CIS is on but no Labour lines were found, so nothing will be deducted."*
4. The invoice itself carries the statutory line: *"Reverse charge: customer to account to HMRC for the VAT"* — on the PDF, the email, the client page and into the accounting sync.
**The payoff.** The contractor's accounts team pays without a query, and month-end reconciliation matches HMRC's rules instead of fighting them.
**Proof points.** Every string above is on screen; items are tagged Labour/Materials so the deduction maths is right by construction.
**Where to use.** LinkedIn + FB groups; the single best "built for UK sparks, not adapted" proof.
**Captions.** *"20% off labour only, £0 VAT with the right wording, correct all the way into Xero. That's CIS done properly."* / *"If your invoice app doesn't know what a reverse charge is, it's not built for this trade."*

### 10. The polite robot that collects your money
**The scene.** Dave's owed £1,840 across three invoices. He hates the chasing more than the being owed.
**The story.**
1. On any invoice, a **"Remind"** menu with three tones: *"Gentle Reminder · Friendly first notice"*, *"Firm Reminder · Second notice, 7 days"*, *"Final Notice · Urgent, 48 hours."*
2. The gentle one reads like Dave on a good day: *"Just a quick note — invoice 0042 is due for payment… If you've already arranged this, please ignore this email — and thank you."* And the sign-off: *"Already paid? Just reply and let me know — I'll get it cleared."*
3. Every email carries a **"Pay £X now"** card button; no Stripe means the bank details render instead.
4. Or skip email entirely: **"Copy payment link"** — *"Paste it into WhatsApp or a text — your client can pay by card or Apple Pay."*
5. Payments land however they land: the Record Payment dialog takes cash/BACS with a date, partials tracked, or a 30-day mark-paid link goes to whoever confirms.
**The payoff.** The awkward conversation gets outsourced to well-written emails that escalate on schedule — and paying gets one-tap easy.
**Proof points.** Real email copy quoted above; three escalation tiers; Apple Pay via the payment link.
**Where to use.** Reel showing the three tones side by side; relatable text post ("the 'just following up 🙂' text, retired").
**Captions.** *"Gentle. Firm. Final. You pick the tone; it does the chasing."* / *"Card button beats sort code, every time."*

### 11. Type it once, everywhere agrees
**The scene.** Sunday night, Dave used to retype the week's invoices into his accountant's software.
**The story.**
1. Settings shows the four connectors — Xero, QuickBooks, Sage, FreshBooks — each with a **"Connect"** button and, once linked, tenant name and last-sync.
2. On an invoice: **"Sync to Xero."** Toast: *"Synced to Xero. Invoice 0042 has been synced."* VAT and CIS classified correctly on the other side.
3. Client pays and the bookkeeper marks it in Xero? **"Refresh from provider"** pulls the paid status straight back.
4. Expenses go the same way — receipts attached, categories mapped, bulk-push for everything unsynced.
**The payoff.** Sunday night returns to being Sunday night. The accountant gets clean data; nothing is typed twice.
**Proof points.** Two-way (push and pull-back); re-sync labelled distinctly (*"Re-sync · Xero"*); Xero + QuickBooks fully live today, Sage/FreshBooks connections built.
**Where to use.** Text post + 15s screen capture; accountant-partnership angle on LinkedIn.
**Captions.** *"Your app and your accountant's software, finally agreeing with each other."* / *"Marked paid in Xero? Elec-Mate already knows."*

### 12. The pack that wins the next job
**The scene.** Job's done. Dave used to send a drip of attachments; the client filed none of them.
**The story.**
1. Project → **Export pack**. A branded cover builds itself: logo, scheme badge, job, customer, dates, value/spend/time cards.
2. The server pulls in every linked document — the EICR, the quote, the invoice — merges them behind the cover, even regenerating any expired PDF links on the fly.
3. Out comes one branded PDF on a secure 24-hour link. Contents listed, nothing missed.
**The payoff.** The final impression of the job is one immaculate document. That's what gets shown to the neighbour who "needs a spark too".
**Proof points.** Server-side merge of certs + quotes + invoices; expenses summary included; expired links regenerated automatically.
**Where to use.** Reel (flick through the merged PDF); estate-agent/landlord-audience post.
**Captions.** *"Cover sheet, cert, quote, invoice — one PDF, one tap."* / *"Finish like a firm ten times your size."*

---

## PART 4 — SAFETY THAT ACTUALLY GETS DONE

### 13. A RAMS from the quote you already wrote
**The scene.** Main contractor: "No RAMS, no start Monday." It's Thursday night. Dave's RAMS ritual used to be copy-pasting last year's and praying.
**The story.**
1. He opens the AI RAMS generator and taps **"Pre-fill from quote"** — client, address, job title and description drop in from the quote he already wrote. Site photos can go in too: *"We'll pull visible hazards into the risk register."*
2. Generate. The screen narrates honestly: *"Reading the brief — pulling in BS 7671, HSE codes and procedural patterns"* → *"Drafting the hazard register — identifying hazards, scoring risk, specifying control measures"* → *"Drafting the method statement"* → *"Final touches."* Live counters tick up: hazards, steps, sources.
3. A couple of minutes later: hazard cards labelled H01, H02… each with a risk pill (*"Med · 6"*, *"High · 12"*), tiered controls (Eliminate / Engineer / PPE), who's at risk, BS 7671 references, even stop-work triggers.
4. Anything reads wrong? Tap **"Edit"** — sliders for likelihood and severity, text fully amendable. Then export: cover page with assessor and emergency contacts, risk register, method statement, sign-off boxes.
**The payoff.** Thursday-night dread becomes a couple of minutes — and the document is job-specific, scored and cited, not last year's with the address changed.
**Proof points.** Real progress copy quoted; pre-fill from quote is one tap; fully editable before export; drafts survive a closed browser.
**Where to use.** Reel (the progress screen is genuinely watchable); FB groups Thursday evening — literally when the pain hits.
**Captions.** *"'No RAMS, no start.' Fine — give me two minutes."* / *"The job's already in the quote. Why are you typing it again?"*

### 14. The permit that refuses to cut corners
**The scene.** Hot works on a commercial unit. Claire needs a permit issued, countersigned and — the bit everyone forgets — properly closed.
**The story.**
1. Pick the permit type — hot work, confined space, electrical isolation, working at height, excavation — and the form arrives pre-loaded with that type's real hazards and PPE.
2. The **readiness gate** won't let a half-done permit issue: each condition sits as a hollow dot until met — *"Hazards identified and assessed"*, *"Issuer signature captured"* — and only a full row of filled dots unlocks issue.
3. The supervisor countersigns from their own phone via link or QR. Status pill flips *"Pending" → "Approved."*
4. End of day, the close-out sheet: *"Confirm the area is safe — tick each item before closing this record."* For hot works that includes *"Fire watch completed (min. 60 min) and area checked for smouldering."* Every box ticked plus a name — only then does **"Close record"** go live.
**The payoff.** The permit system physically can't issue incomplete or close unsafe — which is exactly the property a paper permit never had.
**Proof points.** Type-specific hazard/PPE defaults citing the right guidance; gate and close-out strings quoted from the UI; remote countersign needs no account.
**Where to use.** LinkedIn (commercial/firm audience); reel showing the gate unlocking dot by dot.
**Captions.** *"It won't issue half-done. It won't close unsafe. That's the point."* / *"The 60-minute fire watch is in the close-out — not in someone's memory."*

### 15. Prove dead. Prove it forever.
**The scene.** Jamie's supervisor drills one thing above all: safe isolation is the procedure that keeps you alive — and the one you can never evidence afterwards. Unless it's recorded.
**The story.**
1. The GS38 flow runs as numbered step cards: *"Identify the circuit" → "Notify and isolate" → "Prove the testing equipment" → "Test the point of work" → "Apply lock-off" → "Verify isolation."* Each completes with a timestamp — *14:32* — and the active card glows amber.
2. Verification wants numbers, not vibes: three fields — **L-N, L-E, N-E** — with the rule on screen: *"All readings must be below 50V to confirm dead."* Type them and the verdict animates in: **"Dead"** in green (or live, in red — stop).
3. Isolator signs. A second person verifies and signs. The record stays open — *"Step 6 of 7 completed"* — until the re-energisation sheet runs its own checklist: *"All locks-off and danger tags removed… Cables, tools, and personnel are clear."*
4. Out the other end: a PDF audit trail of the whole procedure, readings and signatures included.
**The payoff.** The most safety-critical routine in the trade, evidenced from lock-on to lock-off — proof that outlives a tag on a handle.
**Proof points.** Voltage fields with the live dead/live verdict are real UI; detector serial and calibration date recorded; two-signature discipline built in.
**Where to use.** Reel with genuine gravity (no jokes on this one); apprentice + firm audiences both.
**Captions.** *"Below 50 volts, in writing, twice signed."* / *"The procedure that keeps you alive now keeps its own records."*

### 16. The toolbox talk that signs itself
**The scene.** Monday, 7:40am, six sparks round the van. Claire's old sign-sheet came back with four signatures and a coffee ring.
**The story.**
1. She builds the briefing from a template — fourteen ready-made, from *"Safe Isolation (GS38)"* to *"Electrical Burns & Arc Flash"* to *"Lone Working Procedures"* — hazards pre-tagged.
2. She holds up her phone: a QR code. Each spark scans, and their own phone shows the briefing — hazards as coloured chips, the safety warning in red — with the register right there: *"4 of 8 signed"* on a progress bar that moves as they sign.
3. Someone's agency guy isn't on the list? *"Not on the list? Sign as a guest."* Name, company, signature pad — *"Draw your signature here."*
4. Each signer gets *"Signed Successfully — Thank you, [name]. Your signature has been recorded."* Claire's copy exports with every signature, pictogram and timestamp.
**The payoff.** Attendance evidence compiles itself, live, walk-ins included — and the link stops working after 7 days, so it can't be gamed later.
**Proof points.** Live "X of Y signed" counter; guest walk-in path; 14 real templates; 7-day link expiry.
**Where to use.** Reel filmed at an actual morning briefing; employer-audience posts.
**Captions.** *"Hold the talk. Show the QR. Watch the register fill in."* / *"Six phones, six signatures, zero soggy paper."*

### 17. Fourteen days, counting down
**The scene.** An apprentice puts a hand through a ceiling and it's more than a plaster job. Claire's next question is the one every employer dreads: is this RIDDOR, and when's the deadline?
**The story.**
1. The accident book takes the record — injured person, injury type, severity, witnesses, treatment, time off.
2. Then it answers the question nobody's sure of: a banner classifies the incident and counts down — *"RIDDOR: 12 DAYS LEFT"* amber, hardening to a pulsing red *"RIDDOR: REPORT NOW"* — with the rule spelled out (*"Report within 15 days of the incident"*) and a direct *"Report to HSE Online"* link.
3. Once filed, the banner turns green: *"RIDDOR: REPORTED — Reference: [HSE ref]."*
**The payoff.** The legal deadline stops living in someone's head. The book itself refuses to let it slip.
**Proof points.** Countdown states and wording are real; category-specific deadlines (death/specified injury/over-7-day) computed automatically.
**Where to use.** Employer/LinkedIn; pairs well with the permit story as a "compliance that runs itself" duo.
**Captions.** *"Your accident book now knows RIDDOR better than you do."* / *"The deadline counts itself down. In red, if it has to."*

---

## PART 5 — THE KNOWLEDGE IN YOUR POCKET

### 18. Every reg. Every table. On tap.
**The scene.** Dave, kneeling at a board, mid-disagreement with another spark about RCD requirements in a kitchen.
**The story.**
1. Elec-AI's welcome screen sets the tone — *"Every reg. Every table. On tap."* — with starter prompts that read like real site questions: *"What are the RCD requirements for socket-outlets in kitchens?"*
2. He taps **"Voice"** — *"Listening…"* — and asks it out loud. The answer streams in while status chips narrate: *"Understanding… Retrieving regulations… Answering…"*
3. The regulation numbers in the answer are yellow and tappable. One tap opens the full text: the regulation itself, its amendment badge, where it lives in the standard, related regs — and a button: *"Ask a follow-up about this reg."*
4. Argument settled, he saves it: **"Save to a project"** files the answer, citations and all, against the job. And in a dead spot next week, the offline banner still shows his recent answers: *"You're offline… your recent cached answers are below."*
5. The promise is printed right on the product: *"Every answer cited to BS 7671:2018+A4:2026 · No hallucinations · No invented regs."*
**The payoff.** Site arguments end with the actual regulation on an actual screen — in seconds, hands-free, and still there with no signal.
**Proof points.** Tappable citations opening full reg text; voice input; five photos per question; offline cache; the no-invented-regs promise is the app's own copy.
**Where to use.** Hero reel for the AI story; the tap-the-citation moment is the money shot.
**Captions.** *"Don't argue the reg. Tap it."* / *"Cited, tappable, saved to the job. That's how you settle it."*

### 19. Snap it. Know it.
**The scene.** A 1980s board with a breaker nobody recognises and no datasheet on Earth.
**The story.**
1. Component ID's own headline: *"Snap it. Know it."* Pick a category — or honestly, **"Don't know"** is one of the options.
2. Camera opens with a framing guide; the tip is practical: *"bright + flat lighting, no glare. Up to 4 photos."*
3. Chips choose the depth: *"Specifications · BS 7671 requirements · Replacement options · Age + compliance · Installation notes."*
4. Back comes the identification with specs, the applicable regs, modern replacements and an age estimate — cited throughout.
**The payoff.** The mystery kit gets named at the wall — with the compliance context that decides whether it stays or goes.
**Proof points.** "Don't know" category; multi-photo; user-selectable depth chips; every claim cited.
**Where to use.** Reel — old board close-up is irresistible content; great engagement post ("what IS this?").
**Captions.** *"Four photos. Named, dated, cited, replaceable."* / *"'Don't know' is a valid answer. That's the point of the tool."*

### 20. Plain English. Every time.
**The scene.** Dave's found a C2. The customer hears "C2" and understands nothing — which means the remedial doesn't get booked.
**The story.**
1. The Client Explainer takes his findings raw: *"Test results, work completed, EICR codes (C1/C2/C3), safety concerns…"*
2. He picks the audience — Homeowner / Landlord / Property Manager — a tone (*Professional, Friendly, Reassuring, Urgent*), a reading level, and an urgency that colours the output (*Routine → Immediate*).
3. Toggles fold in everyday analogies, cost context, safety emphasis.
4. Out comes copy the customer actually understands — and says yes to.
**The payoff.** The gap between "found the problem" and "booked the fix" is a comprehension gap. This closes it.
**Proof points.** Real audience/tone/level/urgency controls as quoted; the hero line is the product's own: *"Plain English. Every time."*
**Where to use.** Text post aimed at the "customer said they'll think about it" pain; short reel.
**Captions.** *"Your customer doesn't speak C2. Now you don't have to translate."* / *"Findings in, plain English out, remedial booked."*

### 21. Strings that size themselves
**The scene.** Dave wants into solar but the design step — string sizing, voltage windows, G98 vs G99 — is the moat that's kept him out.
**The story.**
1. Or he just types it: *"10 panels on a bungalow in Carlisle, south roof, no shading, add a 7kW charger on the drive…"* → **"Design it for me."** The proposal comes back flagged honestly: *"Proposed from your description — check the assumptions."*
2. The step rail walks him through: **System → Strings → Cabling → Grid & yield → Handover.** Panels and inverters come from MCS-listed kit searches — real Voc, Vmp, temp coefficients, MPPT windows.
3. The Strings step does the maths that scares people, in public: *"String Voc (cold) 480 V — limit 600 V"*, valid panels-per-string range, DC design current with its working shown: *"1.25 × Isc · BS 7671 712."*
4. Cabling checks voltage drop live; Grid & yield calls the G98/G99 route and the export maths; UK yield hints included (*"UK typical 850–1,000 PVGIS"*).
5. Handover is the kicker: **"Create Solar PV certificate"** (pre-filled) and **"Send to a quote — kit & quantities pre-filled."** Single-line diagram included.
**The payoff.** Design → compliance checks → certificate → quote, one sitting, real kit. The moat becomes a doorway into the highest-margin work in the trade.
**Proof points.** Real MCS-listed kit autocomplete; live pass/fail check cards citing their standards; one-tap handover to both cert and quote; battery/EV/heat-pump designers alongside.
**Where to use.** LinkedIn + IG for the renewables-curious; strong "level up your career" framing.
**Captions.** *"Type the roof. Get the strings, the G99 call, the cert and the quote."* / *"Solar design with the working shown."*

### 22. Paste the list, keep the difference
**The scene.** Dave's scribbled materials list, and the eternal question: who's cheapest this week?
**The story.**
1. Smart Procurement takes it however it exists: **"Paste Text"** (*"10x 2.5mm T&E 100m… quantities like '10x' are detected automatically"*) or **"Photo / Upload"** — a photo of the paper list, read by AI (*"Reading materials…"*).
2. Three steps tick across the screen: Parsing Text → Comparing Prices → Done, while it searches UK suppliers.
3. The result is an optimised basket with the verdict in green: **"You Save £43 (12%)"** versus buying everything from one merchant — with the split laid out per supplier, and unmatched lines flagged rather than fudged.
4. **"Send to Quote Builder"** — the whole basket lands as line items.
**The payoff.** The hour of price-checking becomes a paste — and the saving lands on his margin, not the merchant's.
**Proof points.** Photo-of-a-paper-list genuinely works; savings shown against single-supplier cost; unmatched items surfaced honestly.
**Where to use.** Reel (photograph a real scribbled list — very relatable); FB groups.
**Captions.** *"Photograph the scribble. Get the cheapest basket."* / *"£43 back on one list. That's the app paying for itself this month."*

---

## PART 6 — JAMIE'S APPRENTICESHIP

### 23. Thirty seconds of evidence
**The scene.** Jamie just second-fixed his first kitchen. In the paper world, that experience evaporates — the portfolio gets "done" in a panic before gateway.
**The story.**
1. Big yellow button, middle of the tab bar. The capture sheet opens: **"+ Add photos"** — three shots of the work.
2. Then the button that changes everything: *"Speak it — what, how long, when."* He talks like he'd talk to his mate: what he did, how long it took. Live transcript fills as he speaks.
3. The AI grades each file **A–D** on the spot — and when it's not an A, it says why in plain fixes: *"Tag at least one assessment criterion"… "Add the date you did the work"… "Confirm it's your own work (or add a witness)."*
4. Criteria chips are tappable — *"Unit 304 AC A1"* — and the confirmation toast keeps score: *"Unit 304 — 5 of 17 criteria now have evidence."*
**The payoff.** The portfolio builds itself in thirty-second moments on real jobs — graded before filing, mapped to the standard, no gateway panic.
**Proof points.** Voice-first capture; A–D grades with named fixes; live per-unit coverage counts; drafts survive lost signal.
**Where to use.** TikTok/IG hero for apprentice acquisition (film a real capture end-to-end).
**Captions.** *"Say what you did. It becomes evidence. Graded."* / *"Unit 304: 5 of 17 covered — and it's not even lunch."*

### 24. "Two hours, second fix, the Hartlepool job"
**The scene.** Off-the-job hours: the thing every apprentice owes, forgets, and reconstructs badly in June.
**The story.**
1. In the hours hub, one hint on screen: *"Listening… e.g. 'Two hours second fix wiring at the Hartlepool job yesterday'."*
2. Jamie says exactly that. Toast: *"Filled from voice — Set: duration, date, activity type, title. Check it over, then submit."*
3. Submit → *"Sent to your tutor."* College-linked hours go for verification (*"Counts toward your verified hours once your tutor signs it off"*); no college yet, and he sends his supervisor an attestation link to confirm from their own phone instead.
4. Back on the Today page, the What's-next engine keeps him honest — behind pace on a Thursday and it says so: *"Logging an entry takes 30 seconds — keep your pace defensible."* CTA: *"Log hours now."*
**The payoff.** Hours logged in the moment they happen, verified by the people who saw them — funding-audit evidence built as a habit, not a June reconstruction.
**Proof points.** The exact listening hint and toast are real; verified/attested source-mix tracked; the Today page nudges only Thursday–Sunday when the week's genuinely at risk.
**Captions.** *"Say the sentence. The form fills itself. Your tutor signs it off."* / *"OTJ hours, logged on the walk back to the van."*

### 25. The key goes in YOUR pocket
**The scene.** AM2 week is coming. Everyone knows someone who failed it — usually on safe isolation, usually on something small.
**The story.**
1. The simulator's own card says the quiet part loud: *"Practise the 8-step safe-isolation procedure. AM2 will fail you instantly on this — get it perfect."*
2. The eight steps drill in order — *"Identify the circuit… Prove the tester… Isolate the supply… Secure the isolation…"* — and the app calls out the #1 fail: leaving the key in the padlock. **The key goes in YOUR pocket.**
3. The testing simulator hands him a working multifunction tester on screen — rotary dial, seven circuits, each with real specs (*"32A Type C — 2.5mm² cable — 30mA RCD"*) — through the full sequence: continuity, IR, polarity, Zs, RCD.
4. Mock AM2 day runs all four phases against the clock (isolation 8 min, testing 90, faults 45, knowledge 30) — and the readiness ring gives the verdict: *"Readiness 74% · 3 timed runs."*
**The payoff.** The exam that costs hundreds of pounds and months of nerve gets rehearsed until the readiness ring says book it.
**Proof points.** The "fail you instantly" warning and 8 steps are the app's own copy; on-screen MFT with per-circuit specs; 400-question knowledge bank; timed mock day with phase targets.
**Captions.** *"AM2 fails people on the small stuff. Drill the small stuff."* / *"A working MFT on your phone, and a number that says when you're ready."*

### 26. Mock the EPA on your own portfolio
**The scene.** The professional discussion is the scariest part of the End-Point Assessment — because you can't revise for questions about *your own work*.
**The story.**
1. Except now you can: *"AI reads your portfolio evidence and generates 5–8 EPA-style discussion questions grounded in your actual jobs."*
2. Jamie answers by voice or keyboard; each response is scored against the real grade descriptors.
3. The result lands like a mock should: a predicted grade — *Distinction / Pass / Fail* — with subscores across *"Technical knowledge, Practical application, Communication, Reflection, Problem solving"*, strengths listed, gaps targeted.
4. He submits it to his tutor as his self-assessment — which flows straight into the college's readiness view.
**The payoff.** The unrehearsable gets rehearsed — personally, repeatedly, with a grade attached.
**Proof points.** Questions generated from the apprentice's own evidence; voice answering; descriptor-based subscores; tutor submission built in.
**Captions.** *"It read your portfolio. Now it's asking questions about it."* / *"Walk into the EPA having already sat it."*

### 27. The streak that gets you qualified
**The scene.** Nobody studies for 3 hours on a Tuesday. Everybody can do five minutes.
**The story.**
1. Every section read, quiz taken and mock passed earns XP through ten named levels — from *"Apprentice"* to *"Keen Apprentice"* to, at the top, *"Qualified Sparky"* (25,000 XP).
2. Any learning keeps the streak alive; the app cheers in tiers — *"Building momentum!"* at three days, *"You're on fire!"* at seven, *"Legendary consistency!"* at thirty.
3. A leaderboard of UK apprentices ranks XP, streaks and quiz averages — first-name-and-initial only, one-tap opt-out.
4. And it all counts: in-app study time feeds the off-the-job hours automatically.
**The payoff.** Five-minutes-a-day compounds into 46+ courses and 20,000+ questions of coverage — because there's a streak on the line.
**Proof points.** Real level names and streak messages quoted; auto-tracked study time counts toward OTJ; achievements carry XP bonuses.
**Captions.** *"Level 10 is called 'Qualified Sparky'. That's the whole point."* / *"Your Duolingo streak, but it gets you a trade."*

---

## PART 7 — CLAIRE'S FIRM

### 28. "Ask Mate" — the business partner in the corner
**The scene.** 9pm. Claire is estimator, contracts manager and HR department, and tonight's question is retention.
**The story.**
1. The yellow **"Ask Mate"** button floats on every hub page. The sheet opens with suggestions that read like her actual week: *"How much retention can a main contractor hold?" · "What's the VAT reverse charge and when does it apply?" · "How do I price a domestic consumer unit change?" · "When is electrical work notifiable under Part P?"*
2. She asks the retention one. The answer streams in — grounded in the trade's real sources (JIB, ACAS, HSE, the Construction Act) — with **Copy** and **PDF** buttons underneath (the PDF downloads as a branded advice note).
3. Then she pushes it: *"Set me up a domestic rewire for the Hartley job."* Mate breaks the job into tasks, prices materials live, costs labour at her day rate — and builds it: the job, the task list, the quote. High-stakes steps get confirmed first; everything's logged and undoable.
**The payoff.** The 9pm questions get answered with sources, and the 9:15pm admin does itself.
**Proof points.** The four suggestion pills are quoted verbatim; multi-step actions run in one conversation with confirmation before anything irreversible; advice exports to PDF.
**Where to use.** LinkedIn hero for the Employer tier; two-part reel (ask a question / give an instruction).
**Captions.** *"Ask it about retention. Then tell it to build the job."* / *"£49.99 a month for the colleague who knows the Construction Act."*

### 29. One glance, whole firm
**The scene.** Claire's mornings used to be six phone calls: where's Dan, did the timesheets go in, what's stuck?
**The story.**
1. The Overview leads with **"Action required"** and a count pill: *"3 jobs need attention — open incidents, overdue invoices or expiring certs"*, pending QS sign-offs, timesheets, new applications — every row tap-to-fix.
2. The live map answers "where is everyone" without a call: green **On Site**, orange **En Route**, purple **Office**, grey **On Leave** — presence from their own clock-ins, job sites pinned alongside.
3. Tap Dan: Worker 360. Tabs for **Hours, Spend, Leave, Credentials** — and the presence pill: *"On Site · [job] — since Fri, 14:30."* Call, Message, Assign, right there.
4. On the jobs board, trouble wears a badge: a red **"Needs attention"** panel on the job itself — *"Invoice 12345 overdue £500"*, *"John Smith: EICR expiring — 14d."*
**The payoff.** The morning triage takes one screen. Risk stops hiding between departments — it surfaces on the job it belongs to.
**Proof points.** Real row copy quoted; presence derived from clock-ins, not GPS-stalking framing; cross-section signals (safety + finance + HR) on each job card.
**Captions.** *"Who's where, what's stuck, what's expiring — before your coffee's done."* / *"The job card tells you the truth: '£500 overdue, 1 cert expiring'."*

### 30. Hiring without the agency cut
**The scene.** Claire needs a commercial spark. Agencies want a fat fee; CVs are creative writing.
**The story.**
1. The talent pool shows real candidates with verified facts: *"£250/day · 12 yrs exp · Blue ECS · 3 verified ✓"* — specialism chips, declared rates, verification tier. What it deliberately doesn't show: contact details, until she reaches out.
2. Filters cut it fast: ECS card type, experience band, day-rate slider, specialisms.
3. Two buttons per card: **"Message"** and **"Invite"**. The candidate applies from their own app; the application lands back on Claire's overview as a blue pill.
4. Meanwhile every electrician's **Elec-ID** — the verified profile with wallet pass and QR — is what makes those "3 verified ✓" chips mean something.
**The payoff.** Hiring where the credentials were checked by the platform before the first message — and no agency invoice at the end.
**Proof points.** Card fields quoted from the real UI; privacy-by-design contact gating; two-sided (candidates apply from the electrician app).
**Captions.** *"'Blue ECS · 3 verified' — before you've even said hello."* / *"The CV is verified. The agency fee is gone."*

### 31. £9.99 a seat, and the whole firm's inside
**The scene.** Claire's team ran on WhatsApp, a whiteboard and Sharon's memory.
**The story.**
1. Adding a spark states the deal in the dialog itself: *"Each new team member adds £9.99/month to your subscription — they pay nothing themselves."* Invite email does the rest.
2. Each worker's phone becomes their work hub: My Jobs, Timesheet, Expenses, Leave, Payslips, Messages, Credentials — fourteen tools, live-linked to Claire's hub both ways.
3. Assign a job in the office and the worker's phone pings — the push deep-links straight to that job, not to a home screen. Decisions come back the same way: the bell shows *"Leave approved · 2h ago"* with a yellow unread dot.
4. Clients get their own door too: a portal link, no login, and messages that land in Claire's hub as a thread — hers in yellow, the client's in grey — answered with a **"Reply"** box instead of another phone call.
**The payoff.** The firm's entire operating system — people, jobs, money, safety, clients — for a base fee and a tenner a head, only when they actually join.
**Proof points.** Seat-cost wording is the dialog's own; 14 routed worker tools; pushes deep-link to the exact page; client portal messaging threads both ways.
**Captions.** *"WhatsApp, whiteboard and Sharon's memory — retired."* / *"£9.99 a head, and only when they link."*

---

## Using these stories
- **Reels:** the numbered beats are the shot list. Film on a real phone, real job where possible; first 2 seconds = the payoff beat (the board-scan result, the "Dead" verdict, the £43 saving), not the setup.
- **Ads:** Scene paragraph = primary text; one caption = headline; payoff = description.
- **Landing pages:** Story order works as page order — pain, beats as screenshots, payoff as the section close.
- **Sales (employer/college):** Stories 4, 14, 16, 17, 28–31 walk live in a demo in under 10 minutes.
- **Calendar mapping:** each July calendar slot names a feature — pull that feature's story from here for the long-form caption or the video script.
- **Rule:** every quoted string here is real UI. If you improvise a new claim, check it against FEATURE-PLAYBOOK.md first; if it's not there, verify in code before publishing.

