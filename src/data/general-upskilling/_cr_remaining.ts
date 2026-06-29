// =====================================================
// Category 3: Resolving Client Disputes (id 81-120)
// 16 basic, 16 intermediate, 8 advanced
// =====================================================

export const crRemainingQuestions = [
  {
    id: 81,
    question:
      'Under the Late Payment of Commercial Debts (Interest) Act 1998, what is the statutory interest rate that can be charged on overdue commercial invoices?',
    options: [
      '6% above Bank of England base rate',
      '8% above Bank of England base rate',
      '4% above Bank of England base rate',
      '10% above Bank of England base rate',
    ],
    correctAnswer: 1,
    explanation:
      'The Late Payment of Commercial Debts (Interest) Act 1998 entitles businesses to charge statutory interest at 8% above the Bank of England base rate on overdue commercial invoices. This is a powerful tool for electricians dealing with late-paying commercial clients. The interest accrues from the day after the agreed payment date, providing a strong financial incentive for timely payment.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Late Payment Act',
    category: 'Resolving Client Disputes',
  },
  {
    id: 82,
    question:
      'Under the Late Payment Act, what are the fixed compensation amounts for debt recovery, based on the size of the debt?',
    options: [
      '£25 (up to £499.99), £50 (£500-£4,999.99), £75 (£5,000+)',
      '£50 (up to £1,999.99), £80 (£2,000-£19,999.99), £120 (£20,000+)',
      '£40 (up to £999.99), £70 (£1,000-£9,999.99), £100 (£10,000+)',
      'A flat £100 regardless of the size of the debt',
    ],
    correctAnswer: 2,
    explanation:
      'The Late Payment Act provides fixed compensation for the cost of recovering a late debt: £40 for debts up to £999.99, £70 for debts between £1,000 and £9,999.99, and £100 for debts of £10,000 or more. These amounts are in addition to the statutory interest. Many electricians are unaware of this entitlement, which can be claimed even if the debt is eventually paid.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Late Payment Act',
    category: 'Resolving Client Disputes',
  },
  {
    id: 83,
    question: 'What is the maximum claim value for the Small Claims Court in England and Wales?',
    options: [
      '£25,000',
      '£15,000',
      '£5,000',
      '£10,000',
    ],
    correctAnswer: 3,
    explanation:
      'The Small Claims Court in England and Wales handles claims up to £10,000. It is designed to be accessible without needing a solicitor, making it a practical option for electricians pursuing unpaid invoices. Court fees range from £35 to £455 depending on the claim value, and claims can be submitted online through Money Claims Online (MCOL).',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Small Claims Court',
    category: 'Resolving Client Disputes',
  },
  {
    id: 84,
    question: 'What is "scope creep" in a construction project context?',
    options: [
      'The gradual expansion of work beyond the original agreement through small additions',
      'A formal written change to the contract price, agreed and signed before extra work begins',
      'The client deliberately delaying payment until all outstanding snags are resolved',
      'The risk of underpricing a fixed quote before the property has been fully surveyed',
    ],
    correctAnswer: 0,
    explanation:
      'Scope creep is the gradual expansion of work beyond what was originally agreed, often through small, seemingly minor additions — the classic "while you\'re here, could you also..." syndrome. Each individual request seems small, but collectively they can add hours or days of unpaid work. Managing scope creep requires clear original agreements and a systematic variation order process.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Scope Creep',
    category: 'Resolving Client Disputes',
  },
  {
    id: 85,
    question: 'The "while you\'re here" syndrome refers to:',
    options: [
      'A client withholding final payment over a single minor defect',
      'Clients requesting additional work beyond the original scope, often phrased casually to avoid formal pricing',
      'A client taking ownership of resolving an issue without admitting fault',
      'Clearly defining the agreed work, working hours, and payment terms upfront',
    ],
    correctAnswer: 1,
    explanation:
      'The "while you\'re here" syndrome is a common form of scope creep where clients casually request additional work — "while you\'re here, could you just move that socket?" — hoping to avoid the formal process of getting a quote and agreeing additional costs. Electricians must recognise this pattern and respond assertively with pricing for additional work, no matter how small the request appears.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Scope Creep',
    category: 'Resolving Client Disputes',
  },
  {
    id: 86,
    question: 'A variation order should include which essential elements?',
    options: [
      "Only the new total price, with no breakdown of the change",
      "A verbal agreement is sufficient provided both parties remember it",
      "What has changed, why it changed, the cost, and the client's signature",
      "The client's signature alone, without any description of the change",
    ],
    correctAnswer: 2,
    explanation:
      "A proper variation order should document what has changed from the original scope, why the change is needed, the cost (including materials and labour), and the client's signature confirming agreement. This documentation protects both parties — the electrician gets payment confirmation, and the client gets transparency about what they are paying for and why.",
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Variation Orders',
    category: 'Resolving Client Disputes',
  },
  {
    id: 87,
    question: 'What is the key legal distinction between a quote and an estimate?',
    options: [
      'A quote is verbal only, whereas an estimate must always be in writing',
      'An estimate is legally binding, whereas a quote is only a rough guide',
      'There is no legal difference; the two terms are interchangeable',
      'A quote is a fixed price that cannot change; an estimate is an approximate cost that may vary',
    ],
    correctAnswer: 3,
    explanation:
      'A quote is a fixed price offer — once accepted, it becomes the agreed price and cannot be changed without a variation order. An estimate is an informed approximation that may go up or down as the work progresses. This distinction is critical for electricians: quoting a fixed price for a rewire when you cannot see all the existing wiring creates financial risk. Estimates with clear caveats provide more flexibility.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Quote vs Estimate',
    category: 'Resolving Client Disputes',
  },
  {
    id: 88,
    question:
      'Under the Consumer Rights Act 2015, what standard must services provided to consumers meet?',
    options: [
      'Reasonable care and skill, at a reasonable price',
      'The cheapest available standard',
      'The highest possible standard regardless of price',
      'Whatever standard the contractor decides',
    ],
    correctAnswer: 0,
    explanation:
      'The Consumer Rights Act 2015 requires that services are performed with reasonable care and skill, at a reasonable price (if no price was agreed in advance), and within a reasonable time (if no timeframe was agreed). For electricians, this means work must meet the standard of a competent professional. Failure to meet this standard gives the consumer rights to repair, price reduction, or in some cases, a refund.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Consumer Rights Act 2015',
    category: 'Resolving Client Disputes',
  },
  {
    id: 89,
    question:
      "Under the Consumer Rights Act 2015, what is the consumer's primary remedy if a service is not performed with reasonable care and skill?",
    options: [
      'An automatic full refund with no opportunity for the trader to put it right',
      'The right to require the trader to repeat or fix the service at no additional cost',
      'Statutory interest at 8% above base rate on the disputed amount',
      'The right to demand a brand-new installation regardless of the defect',
    ],
    correctAnswer: 1,
    explanation:
      "Under the Consumer Rights Act 2015, the consumer's primary remedy for a service not performed with reasonable care and skill is the right to require the trader to repeat or fix the service at no additional cost. If this is not possible or not done within a reasonable time, the consumer can claim a price reduction. This statutory framework provides a clear pathway for resolving quality disputes between electricians and domestic clients.",
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Consumer Rights Act 2015',
    category: 'Resolving Client Disputes',
  },
  {
    id: 90,
    question: 'What does the HEARD framework stand for in service recovery?',
    options: [
      'Help, Evaluate, Act, Respond, Document',
      'Handle, Explain, Adjust, Review, Decide',
      'Hear, Empathise, Apologise, Resolve, Do follow up',
      'Hope, Engage, Agree, Report, Dismiss',
    ],
    correctAnswer: 2,
    explanation:
      'The HEARD framework stands for Hear (listen fully to the complaint), Empathise (show you understand their frustration), Apologise (say sorry for the experience), Resolve (fix the problem), and Do follow up (check back to ensure satisfaction). This systematic approach to complaint handling is widely used in service industries and is highly effective for electricians managing client dissatisfaction.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'HEARD Framework',
    category: 'Resolving Client Disputes',
  },
  {
    id: 91,
    question:
      'What is the "under-promise, over-deliver" principle in managing client expectations?',
    options: [
      'Promising an ambitious timeline to win the work, then explaining the delays later on',
      'Quoting the lowest possible price up front and adding extras as the job progresses',
      'Telling the client only what they want to hear so as to avoid difficult conversations',
      'Setting realistic or slightly conservative expectations and then exceeding them on delivery',
    ],
    correctAnswer: 3,
    explanation:
      'The under-promise, over-deliver principle means setting realistic or slightly conservative expectations — on timing, scope, and finish — and then exceeding them. For example, telling a client the rewire will take five days when you expect to finish in four. If you finish in four, the client is delighted. If complications arise and it takes five, you still met the expectation. This approach builds trust and generates referrals.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Managing Client Expectations',
    category: 'Resolving Client Disputes',
  },
  {
    id: 92,
    question: 'Why is proactive communication with clients important during a project?',
    options: [
      'Regular updates prevent anxiety, build trust and reduce complaints and disputes',
      'It lets the electrician charge for the additional time spent communicating',
      'It is a legal requirement imposed under the Consumer Rights Act 2015',
      'It removes the need for any written contract or signed variation orders',
    ],
    correctAnswer: 0,
    explanation:
      'Proactive communication — providing regular updates without waiting to be asked — prevents client anxiety, builds trust, and significantly reduces the likelihood of complaints and disputes. Clients who feel informed and included are far more tolerant of unexpected issues than those who feel ignored. A quick end-of-day update or photo of progress takes seconds but can prevent days of dispute resolution.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Communication Frequency',
    category: 'Resolving Client Disputes',
  },
  {
    id: 93,
    question:
      'What is the difference between a legitimate complaint and an unreasonable complaint?',
    options: [
      'A legitimate complaint is always made in writing; an unreasonable one is always verbal',
      'A legitimate complaint names a real failure to meet agreed standards; an unreasonable one seeks more than was agreed',
      'A legitimate complaint comes from a paying client; an unreasonable one comes from a third party',
      'A legitimate complaint must be acted on within 24 hours; an unreasonable one can be ignored',
    ],
    correctAnswer: 1,
    explanation:
      'A legitimate complaint identifies a genuine failure to meet agreed standards, specifications, or reasonable expectations. An unreasonable complaint seeks outcomes disproportionate to the issue, demands services beyond what was agreed, or is motivated by an attempt to avoid payment. While both require professional handling, recognising the difference helps electricians respond appropriately — resolving legitimate concerns while maintaining boundaries against unreasonable demands.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Legitimate vs Unreasonable Complaints',
    category: 'Resolving Client Disputes',
  },
  {
    id: 94,
    question:
      'What does "taking responsibility without accepting liability" mean in a client dispute?',
    options: [
      "Admitting full fault to the client immediately so that they feel reassured",
      "Refusing to discuss the issue at all until liability has been legally determined",
      "Owning the client's experience and committing to resolve it, without admitting legal fault",
      "Passing responsibility to your insurer and stepping back from the client entirely",
    ],
    correctAnswer: 2,
    explanation:
      "Taking responsibility without accepting liability means owning the client's experience and committing to resolve the issue, without making statements that could be used as legal admissions of fault. For example: \"I'm sorry you're experiencing this issue, and I'm going to make sure we sort it out\" rather than \"Yes, we did it wrong and it's all our fault.\" This approach demonstrates professionalism while protecting your legal position.",
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Taking Responsibility Without Liability',
    category: 'Resolving Client Disputes',
  },
  {
    id: 95,
    question: 'What is the correct order for staged payment chasing?',
    options: [
      'Letter before action, then small claims, then a phone call, then a friendly reminder',
      'Small claims, then letter before action, then a phone call, then a friendly reminder',
      'Phone call, then a friendly reminder, then small claims, then a letter before action',
      'Friendly reminder, formal reminder, phone call, letter before action, then small claims',
    ],
    correctAnswer: 3,
    explanation:
      'The correct staged approach is: friendly reminder (informal, assumes oversight), formal written reminder (references terms and deadlines), phone call (personal contact to discuss any issues), letter before action (formal legal warning giving 30 days), and finally small claims court. Each stage escalates appropriately, giving the client every opportunity to pay while building a documented trail that demonstrates reasonableness if court proceedings become necessary.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Staged Payment Chasing',
    category: 'Resolving Client Disputes',
  },
  {
    id: 96,
    question: 'Setting professional boundaries with clients means:',
    options: [
      'Clearly defining the agreed work, your working hours, communication and payment terms',
      'Refusing to take on any client who asks detailed questions about the work',
      'Always agreeing to extra requests, no matter the cost, to keep the client happy',
      'Avoiding any written terms so the working relationship stays informal and friendly',
    ],
    correctAnswer: 0,
    explanation:
      'Professional boundaries define the scope of work, working hours, communication expectations, and payment terms. They protect both the electrician and the client by creating clarity about what is expected from each party. Clear boundaries prevent the resentment that builds when expectations are undefined. They are not about being unfriendly — they are about being clear, consistent, and professional.',
    section: 'Resolving Client Disputes',
    difficulty: 'basic' as const,
    topic: 'Professional Boundaries',
    category: 'Resolving Client Disputes',
  },
  {
    id: 97,
    question: 'What is the service recovery paradox, as identified by Tax and Brown in 1998?',
    options: [
      'Customers who never complain at all are always the most loyal in the long run',
      'A customer whose problem is resolved exceptionally well may become more loyal than one with no problem',
      'Resolving a complaint quickly always costs more than the goodwill it ends up generating',
      'A customer who complains once will inevitably complain again on the very next job',
    ],
    correctAnswer: 1,
    explanation:
      'The service recovery paradox, identified by Tax and Brown in 1998, suggests that a customer who experiences a problem that is then resolved exceptionally well can become more loyal and satisfied than a customer who never had a problem at all. For electricians, this means that handling a complaint brilliantly — through genuine care, speed of response, and exceeding expectations in the fix — can actually strengthen the client relationship.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Service Recovery Paradox',
    category: 'Resolving Client Disputes',
  },
  {
    id: 98,
    question:
      'Under the Pre-Action Protocol for Debt Claims, how long must a debtor be given to respond to a letter before action?',
    options: [
      '7 days',
      '14 days',
      '30 days',
      '60 days',
    ],
    correctAnswer: 2,
    explanation:
      'The Pre-Action Protocol for Debt Claims requires that the debtor be given 30 days to respond to a letter before action. The letter must include the amount owed, how it was calculated, and details of any interest or charges being claimed. Failing to follow this protocol can result in cost penalties if the case reaches court, even if you win. The 30-day period also allows time for the debtor to seek advice or propose a payment plan.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Pre-Action Protocol',
    category: 'Resolving Client Disputes',
  },
  {
    id: 99,
    question:
      'What information must a letter before action contain under the Pre-Action Protocol for Debt Claims?',
    options: [
      'Only the total amount owed, with no breakdown or further information required',
      'A threat of immediate court action and the name of the judge who will hear it',
      'The debtor\'s credit score and a demand for full payment within 48 hours',
      'The amount owed and its calculation, interest and charges, free-debt-advice details and a deadline',
    ],
    correctAnswer: 3,
    explanation:
      'A letter before action must include: the total amount owed, a clear breakdown of how the amount was calculated, details of any interest or charges being claimed (including statutory interest under the Late Payment Act), information about where the debtor can get free debt advice, and a clear 30-day response deadline. The letter must be clear, factual, and professional. Threats or aggressive language can undermine your position in court.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Pre-Action Protocol',
    category: 'Resolving Client Disputes',
  },
  {
    id: 100,
    question: 'What are the court fees for making a small claim through Money Claims Online?',
    options: [
      '£35 to £455, depending on the claim value',
      'A flat £100 fee for any claim up to £10,000',
      'There are no court fees for claims made online',
      '£500 to £1,200, depending on the claim value',
    ],
    correctAnswer: 0,
    explanation:
      'Court fees for small claims through Money Claims Online range from £35 (for claims up to £300) to £455 (for claims between £5,000.01 and £10,000). These fees are recoverable from the defendant if you win the case. Money Claims Online is available 24/7 and is designed for use without a solicitor, making it accessible for electricians pursuing unpaid invoices.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Small Claims Court',
    category: 'Resolving Client Disputes',
  },
  {
    id: 101,
    question:
      'An electrician completed a bathroom rewire. The client now claims the socket positions are wrong, but the positions match the agreed plan that the client signed. How should the electrician handle this?',
    options: [
      'Move the sockets free of charge to avoid any confrontation with the unhappy client',
      'Show the signed plan, empathise with their frustration and offer to move them as priced work',
      'Refuse to discuss it and tell the client the work is finished and already signed off',
      'Threaten to take the client to the Small Claims Court for the full outstanding invoice',
    ],
    correctAnswer: 1,
    explanation:
      "The best approach combines documentation (the signed plan), empathy (acknowledging the client's frustration), and a constructive solution (offering to move the sockets as additional priced work). This demonstrates professionalism while protecting the electrician's financial position. Moving sockets for free rewards the client for changing their mind after sign-off. Refusing to discuss it or threatening legal action damages the relationship unnecessarily.",
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Managing Client Expectations',
    category: 'Resolving Client Disputes',
  },
  {
    id: 102,
    question: 'How should an electrician manage the "while you\'re here" syndrome assertively?',
    options: [
      'Refuse the request firmly and simply remind the client of the agreed scope of work',
      'Quietly do the extra work and add an unexplained charge to the final invoice later',
      'Acknowledge it positively, explain it is outside the original scope and offer to price it',
      'Agree to do it for free, since small extras help to secure future referral work',
    ],
    correctAnswer: 2,
    explanation:
      'The assertive approach is to acknowledge the request positively ("That\'s a good idea"), clarify that it falls outside the original scope ("That wasn\'t in our original agreement"), and offer a constructive path forward ("I can price that up for you as an additional — shall I do that?"). This approach is friendly and professional, protects the electrician\'s income, and keeps a clear record of scope changes.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Scope Creep',
    category: 'Resolving Client Disputes',
  },
  {
    id: 103,
    question: 'In the HEARD framework, why is the "Do follow up" step important?',
    options: [
      'It gives the client a final chance to raise new complaints in order to avoid paying',
      'It is a strict legal requirement under the Pre-Action Protocol for Debt Claims',
      'It lets the electrician upsell further additional work during the follow-up call',
      'Following up shows genuine care, confirms satisfaction and can build lasting loyalty',
    ],
    correctAnswer: 3,
    explanation:
      'The "Do follow up" step is crucial because it demonstrates genuine care beyond the immediate fix. A follow-up call or message after resolving a complaint shows the client that their satisfaction matters to you as a person, not just as a commercial transaction. This step is where the service recovery paradox operates — the follow-up can transform a negative experience into a strengthened relationship and future referrals.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'HEARD Framework',
    category: 'Resolving Client Disputes',
  },
  {
    id: 104,
    question:
      'When a client claims work is substandard but the electrician believes it meets all relevant standards, the best first step is to:',
    options: [
      'Listen fully to understand the concern, then offer an independent inspection if needed',
      'Insist the work is fully compliant and refuse to discuss the matter any further',
      'Immediately offer a full refund to head off the risk of a negative review',
      'Redo the entire installation at your own cost without first investigating it',
    ],
    correctAnswer: 0,
    explanation:
      'The best first step is to listen fully to understand exactly what the client believes is substandard. Often, perceived quality issues stem from different expectations rather than actual defects. After understanding the concern, explain your position with reference to standards and offer an independent inspection (such as by a registered third-party assessor) if agreement cannot be reached. This demonstrates confidence in your work while treating the client fairly.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Legitimate vs Unreasonable Complaints',
    category: 'Resolving Client Disputes',
  },
  {
    id: 105,
    question: 'What is the purpose of managing client expectations at each stage of a project?',
    options: [
      'To create grounds for later charging the client more than the original quote',
      'To set realistic expectations on progress, disruption, timeline and finish, closing the gap that causes complaints',
      'To satisfy a specific legal duty imposed by the Consumer Rights Act 2015',
      'To discourage the client from asking awkward questions during the work',
    ],
    correctAnswer: 1,
    explanation:
      'Managing expectations at each stage creates alignment between what the client anticipates and what they experience. This reduces the gap that causes complaints. Before starting, explain what each phase involves, what disruption to expect, and what the finish will look like. During the work, provide updates on progress. After completion, explain how to use new installations. Each touchpoint prevents misunderstandings that could become disputes.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Managing Client Expectations',
    category: 'Resolving Client Disputes',
  },
  {
    id: 106,
    question:
      'Under the Consumer Rights Act 2015, if a service cannot be re-performed or is not re-performed within a reasonable time, the consumer is entitled to:',
    options: [
      'Statutory interest of 8% above base rate on the price paid',
      'An automatic right to cancel the contract with no payment due',
      'A price reduction, which may be up to 100% of the cost (a full refund)',
      'Fixed compensation of £40, £70 or £100 depending on the value',
    ],
    correctAnswer: 2,
    explanation:
      'If a service cannot be re-performed or is not re-performed within a reasonable time and without significant inconvenience to the consumer, they are entitled to a price reduction. This price reduction can be up to 100% of the cost, effectively a full refund. The amount depends on the severity of the failure. This provides a proportionate remedy — minor issues warrant small reductions, while total failures justify full refunds.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Consumer Rights Act 2015',
    category: 'Resolving Client Disputes',
  },
  {
    id: 107,
    question:
      'Why should an electrician give an estimate rather than a quote for a rewire in a property they have not fully surveyed?',
    options: [
      'An estimate is legally binding, whereas a quote can always be revised later on',
      'A quote protects the client better because the price can never increase at all',
      'There is no practical difference once the work has been agreed verbally on site',
      'An estimate flexes for unforeseen work, while a fixed quote holds regardless of what is found',
    ],
    correctAnswer: 3,
    explanation:
      'When a property has not been fully surveyed, an estimate is more appropriate because it allows flexibility for unforeseen complications — hidden junction boxes, asbestos-containing materials, damaged existing wiring, or non-standard construction. A quote locks in a fixed price and the electrician must absorb any additional costs. The estimate should include clear caveats about what might cause the final price to differ.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Quote vs Estimate',
    category: 'Resolving Client Disputes',
  },
  {
    id: 108,
    question:
      'A domestic client wants to withhold the final payment because they are unhappy with the position of one light fitting, even though all other work is completed to a high standard. What are their rights under the Consumer Rights Act 2015?',
    options: [
      'They can require the fitting be repositioned but cannot withhold a sum out of proportion to the defect',
      'They are entitled to withhold the entire final payment until every last item is perfect',
      'They have no rights at all here because the work is essentially complete already',
      'They can demand that the whole installation be redone for them free of charge',
    ],
    correctAnswer: 0,
    explanation:
      'Under the Consumer Rights Act 2015, the client has the right to request that the service be re-performed (the light fitting repositioned) if it was not installed with reasonable care and skill. However, withholding the entire payment for a minor defect would be disproportionate. The appropriate approach is to discuss the specific issue, agree to rectify it, and arrange payment of the bulk of the invoice with a reasonable retention for the outstanding item.',
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Consumer Rights Act 2015',
    category: 'Resolving Client Disputes',
  },
  {
    id: 109,
    question:
      'An electrician discovers mid-project that the existing consumer unit contains asbestos. The client refuses to pay for the additional cost of licensed asbestos removal. How should this be handled?',
    options: [
      "Remove the asbestos yourself quickly to keep the job on its original schedule",
      "Explain the legal need for licensed removal, raise it as a costed variation, document any refusal and pause that element",
      "Absorb the cost of licensed removal yourself to avoid upsetting the paying client",
      "Work carefully around the asbestos and complete the job as it was originally quoted",
    ],
    correctAnswer: 1,
    explanation:
      'The correct approach is to explain the legal requirement for licensed asbestos removal (under the Control of Asbestos Regulations 2012), present the additional cost as a formal variation order, and document everything. If the client refuses, the electrician must pause work on that element — they cannot legally proceed with or around the asbestos. Self-removal without a licence is a criminal offence. Clear documentation protects the electrician if the dispute escalates.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'Variation Orders',
    category: 'Resolving Client Disputes',
  },
  {
    id: 110,
    question:
      'How does the service recovery paradox apply specifically to electrical contracting, and what are its limits?',
    options: [
      'It applies universally, so deliberately creating problems and fixing them builds loyalty',
      'It works only for commercial clients and never for ordinary domestic customers',
      'It works when the failure was not negligent and recovery is swift and genuine, but not for repeat failures or safety issues',
      'It guarantees a positive online review regardless of how the complaint is handled',
    ],
    correctAnswer: 2,
    explanation:
      'The service recovery paradox works best in electrical contracting when the original issue was understandable (not negligent), the response is swift, and the resolution exceeds expectations. However, it has limits: it does not work for repeated failures (which indicate systemic problems), serious safety issues (which breach trust fundamentally), or if the recovery effort feels performative rather than genuine. The paradox is a bonus outcome of excellent complaint handling, not a strategy to be manufactured.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'Service Recovery Paradox',
    category: 'Resolving Client Disputes',
  },
  {
    id: 111,
    question:
      'A client has not paid a £4,500 invoice that is now 60 days overdue. The electrician has sent a friendly reminder and a formal reminder with no response. What should the next step be before issuing a letter before action?',
    options: [
      'Issue the letter before action immediately to save time and force the issue',
      'Begin small claims proceedings straight away without any further client contact',
      'Write off the debt as a bad lesson in credit control and move on from it',
      'Phone the client to discuss it, check for any dispute and try to agree a payment plan',
    ],
    correctAnswer: 3,
    explanation:
      'Before escalating to a letter before action, a phone call serves several purposes: it confirms the client has received the reminders, checks whether there is a dispute about the work (which needs resolving before pursuing payment), offers the human connection that written communication lacks, and provides an opportunity to agree a payment plan. Courts look favourably on claimants who have made reasonable efforts to resolve disputes before litigation.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'Staged Payment Chasing',
    category: 'Resolving Client Disputes',
  },
  {
    id: 112,
    question:
      'A client claims the Consumer Rights Act 2015 entitles them to a full refund because they changed their mind about the colour of the sockets after installation. Is this claim valid?',
    options: [
      'No — the Act covers failure to use reasonable care and skill, not change of mind; the sockets were fitted as agreed',
      'Yes — the Act gives an automatic 14-day right to change your mind on any installed goods',
      'Yes — any dissatisfaction with the finished work entitles the consumer to a full refund',
      'Partly — the client is entitled to a 50% refund for a change of mind after installation',
    ],
    correctAnswer: 0,
    explanation:
      'The Consumer Rights Act 2015 provides remedies when services are not performed with reasonable care and skill, within a reasonable time, or at a reasonable price. It does not cover change of mind. If the electrician installed the agreed sockets competently, the client has no right to a free replacement. The electrician could offer to change them as additional paid work. Understanding the scope of the Act helps electricians resist invalid claims while respecting legitimate rights.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'Consumer Rights Act 2015',
    category: 'Resolving Client Disputes',
  },
  {
    id: 113,
    question:
      'What strategic considerations should an electrician weigh before pursuing a £2,000 debt through the Small Claims Court?',
    options: [
      'Only the size of the debt matters; all of the other factors are irrelevant here',
      'Court fees, time, enforcement difficulty, relationship damage and the debtor\'s means to pay',
      'Whether the client left a positive review and is likely to recommend you to others',
      'Solely whether you can recover the statutory interest under the Late Payment Act',
    ],
    correctAnswer: 1,
    explanation:
      'Before pursuing a small claim, an electrician should consider: court fees (£115 for a £2,000 claim), time spent preparing and attending (opportunity cost of not working), the difficulty of enforcing a judgement even if successful, the impact on any ongoing business relationship, and whether the debtor has assets or income to pay. Sometimes a negotiated settlement for a reduced amount, or even a write-off with lessons learned about credit control, is more commercially sensible than the cost of pursuing the full amount.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'Small Claims Court',
    category: 'Resolving Client Disputes',
  },
  {
    id: 114,
    question:
      'How should an electrician respond to a client who makes a legitimate complaint about a genuine defect?',
    options: [
      'Deny the defect exists and ask the client to provide independent proof of it',
      'Offer a partial refund straight away rather than returning to fix the work properly',
      'Apply the HEARD framework: hear, empathise, apologise, resolve the defect, then follow up',
      'Refer the client straight to your insurer and avoid any further contact yourself',
    ],
    correctAnswer: 2,
    explanation:
      'When a complaint is legitimate, the HEARD framework provides the optimal response. Hear the full concern without interrupting. Empathise genuinely — the client has been inconvenienced. Apologise for the experience (not necessarily admitting fault, but acknowledging the inconvenience). Resolve the defect promptly and to a high standard. Do follow up within a few days to confirm satisfaction. This approach often turns a dissatisfied client into your strongest advocate.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'HEARD Framework',
    category: 'Resolving Client Disputes',
  },
  {
    id: 115,
    question:
      'An electrician quotes £3,200 for a kitchen rewire. During the work, they discover the existing ring final circuit is in far worse condition than visible during the survey, requiring an additional £800 of work. The client says "A quote is a quote — you should honour it." Who is correct?',
    options: [
      'The client is entirely correct — a quote can never be increased for any reason at all',
      'The electrician is entirely correct — any extra work always justifies extra charges',
      'Neither is correct — the contract becomes void as soon as unforeseen work is found',
      'Both have a point — a quote is generally fixed, but genuinely unforeseeable work can be a documented, agreed variation',
    ],
    correctAnswer: 3,
    explanation:
      'Both have valid positions. A quote is generally a fixed price and the electrician bears the risk of underestimating. However, genuinely unforeseeable conditions (work hidden behind walls that could not be surveyed) can constitute a valid variation to the contract. The key is documentation: the electrician should stop work on the additional element, show the client the unforeseen condition, explain the additional work needed, and agree the variation in writing before proceeding. Future quotes should include caveats about hidden conditions.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'Quote vs Estimate',
    category: 'Resolving Client Disputes',
  },
  {
    id: 116,
    question:
      'How can the Late Payment of Commercial Debts Act 1998 be used strategically without damaging commercial relationships?',
    options: [
      'State the interest entitlement in your terms, mention it factually in reminders and claim it only after the letter before action',
      'Apply the maximum interest from day one of every invoice to discourage any late payment',
      'Never mention the interest entitlement at all so the client is not put off working with you',
      'Charge the interest only on genuinely disputed invoices, never on simple late payments',
    ],
    correctAnswer: 0,
    explanation:
      'The strategic approach is to include statutory interest entitlement in your standard terms (so clients are aware from the outset), reference it factually in payment reminders ("Please note that under the Late Payment Act, statutory interest applies to overdue invoices"), and only formally claim the interest after the letter before action stage. This approach uses the Act as a deterrent and motivator for timely payment without making every late payment feel like a personal attack.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'Late Payment Act',
    category: 'Resolving Client Disputes',
  },
  {
    id: 117,
    question:
      'A client makes an unreasonable complaint and threatens to leave a negative online review unless the electrician provides free additional work. How should this be handled?',
    options: [
      "Immediately carry out the free work to prevent the negative review being posted online",
      "Acknowledge the concern, explain what was agreed and delivered, hold your boundaries and document the threat",
      "Ignore the client entirely and block their number to avoid any further confrontation",
      "Threaten the client with a defamation claim before they have even posted anything yet",
    ],
    correctAnswer: 1,
    explanation:
      'This situation requires a balance of empathy and firm boundaries. Acknowledge the concern, calmly explain what was agreed and delivered (with documentation), and do not capitulate to the implicit blackmail. If the client leaves a genuine review about their experience, respond professionally and factually. If they post demonstrably false statements, that may constitute defamation. Document the threat in case it is needed later. Rewarding threats teaches clients that bullying works.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'Professional Boundaries',
    category: 'Resolving Client Disputes',
  },
  {
    id: 118,
    question:
      'What is the key difference between applying the HEARD framework to a legitimate complaint versus an unreasonable one?',
    options: [
      'There is no difference at all; the same five steps are applied identically to both',
      'The framework is abandoned entirely once a complaint is judged unreasonable',
      'All five steps apply to legitimate ones; for unreasonable ones the later steps are adapted to hold boundaries',
      'Only the Hear step is used for legitimate complaints; all five are used for unreasonable ones',
    ],
    correctAnswer: 2,
    explanation:
      'The HEARD framework is adapted for unreasonable complaints. You still Hear (listen fully — sometimes what seems unreasonable has a valid element) and Empathise (acknowledge the feeling, even if you disagree with the claim). However, the Apologise step becomes "I\'m sorry you feel this way" rather than "I\'m sorry we got it wrong." The Resolve step involves explaining what was agreed and delivered. The Do follow up step confirms the boundary. This maintains professionalism without capitulating.',
    section: 'Resolving Client Disputes',
    difficulty: 'advanced' as const,
    topic: 'HEARD Framework',
    category: 'Resolving Client Disputes',
  },
  {
    id: 119,
    question:
      "An electrician completed work six months ago. The client now reports a fault and demands free repair, claiming it is a warranty issue. The fault is caused by water damage from a leaking pipe above. What is the electrician's position?",
    options: [
      'Carry out the repair free of charge, as any fault within a year is a warranty claim',
      'Refuse to attend at all, since the work is out of any guarantee period after six months',
      'Tell the client to claim on their own home insurance and then take no further action',
      'Investigate, identify the water damage as the cause, document it and offer a paid repair after the plumbing is fixed',
    ],
    correctAnswer: 3,
    explanation:
      "The professional approach is to attend and investigate (demonstrating good faith), identify and document the actual cause (water damage from plumbing, not electrical workmanship), explain this clearly to the client with evidence, and offer to repair the electrical damage as paid work once the plumbing issue is resolved. This protects the electrician's reputation for standing behind their work while fairly declining responsibility for damage caused by others.",
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Taking Responsibility Without Liability',
    category: 'Resolving Client Disputes',
  },
  {
    id: 120,
    question:
      'What are the benefits of providing proactive updates at the end of each day during a domestic rewire?',
    options: [
      "It keeps the client informed, sets expectations for the next day, builds trust and records the communication",
      "It allows the electrician to justify charging for the extra time spent on site",
      "It is a mandatory legal requirement imposed under the Consumer Rights Act 2015",
      "It removes the need to agree any written variation orders during the course of the job",
    ],
    correctAnswer: 0,
    explanation:
      "End-of-day updates during a domestic rewire serve multiple purposes: they keep the client informed about what was done today, set expectations for tomorrow's work and disruption, build trust through transparency, prevent the anxiety-driven complaints that arise when clients feel left in the dark, and create a record of communication that can be referenced if disputes arise later. A simple five-minute conversation or text message can prevent hours of conflict resolution.",
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Communication Frequency',
    category: 'Resolving Client Disputes',
  },
];
