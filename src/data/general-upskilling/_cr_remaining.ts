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
      '4% above Bank of England base rate',
      '6% above Bank of England base rate',
      '8% above Bank of England base rate',
      '10% above Bank of England base rate',
    ],
    correctAnswer: 2,
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
      '£20 for all debts',
      '£40 (up to £999.99), £70 (£1,000-£9,999.99), £100 (£10,000+)',
      '£50 (up to £5,000), £100 (£5,000+)',
      '£100 for all debts',
    ],
    correctAnswer: 1,
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
    options: ['£5,000', '£10,000', '£15,000', '£25,000'],
    correctAnswer: 1,
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
      'When the physical scope of the building increases',
      'The gradual expansion of work beyond the original agreement, often through small additions that individually seem minor',
      'When another trade encroaches on your work area',
      'A type of structural defect',
    ],
    correctAnswer: 1,
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
      'A medical condition caused by construction work',
      'Clients requesting additional work beyond the original scope, often phrased casually to avoid formal pricing',
      'Being asked to stay late on site',
      'A safety protocol for lone working',
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
      'Only the additional cost',
      "What has changed, why it changed, the cost, and the client's signature",
      'A photograph and a text message',
      'Only a verbal agreement',
    ],
    correctAnswer: 1,
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
      'There is no legal distinction',
      'A quote is a fixed price that cannot change; an estimate is an approximate cost that may vary',
      'A quote is verbal; an estimate is written',
      'An estimate is always cheaper than a quote',
    ],
    correctAnswer: 1,
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
      'The cheapest available standard',
      'Reasonable care and skill, at a reasonable price',
      'The highest possible standard regardless of price',
      'Whatever standard the contractor decides',
    ],
    correctAnswer: 1,
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
      'An immediate full refund',
      'The right to require the trader to repeat or fix the service at no additional cost',
      'Automatic compensation of £1,000',
      'The right to sue without notice',
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
      'Hear, Empathise, Apologise, Resolve, Do follow up',
      'Handle, Explain, Adjust, Review, Decide',
      'Hope, Engage, Agree, Report, Dismiss',
    ],
    correctAnswer: 1,
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
      'Deliberately quoting an unrealistically low price',
      'Setting realistic or slightly conservative expectations and then exceeding them through quality, speed, or service',
      'Promising nothing and hoping for the best',
      'Over-charging to create a buffer for extras',
    ],
    correctAnswer: 1,
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
      'It is a legal requirement under the Consumer Rights Act',
      'Regular updates prevent anxiety, build trust, and reduce the likelihood of complaints and disputes',
      'It slows the project down to a safer pace',
      'It is only important if there are problems',
    ],
    correctAnswer: 1,
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
      'All complaints are unreasonable',
      'A legitimate complaint identifies a genuine failure to meet agreed standards; an unreasonable complaint seeks outcomes beyond what was agreed or what is fair',
      'Legitimate complaints are always written; unreasonable complaints are always verbal',
      'There is no difference — all complaints must be treated identically',
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
      'Admitting everything is your fault to end the argument',
      "Acknowledging the client's experience and taking ownership of resolving the issue, without making legal admissions of fault",
      'Blaming someone else for the problem',
      'Refusing to discuss the issue until lawyers are involved',
    ],
    correctAnswer: 1,
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
      'Letter before action, small claims, phone call, friendly reminder',
      'Small claims, letter before action, phone call, friendly reminder',
      'Friendly reminder, formal written reminder, phone call, letter before action, small claims',
      'Phone call, friendly reminder, small claims, letter before action',
    ],
    correctAnswer: 2,
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
      'Being rude or dismissive to maintain distance',
      'Clearly defining what is included in the agreed work, your working hours, communication expectations, and payment terms',
      'Refusing to talk to clients outside of formal meetings',
      'Never doing any additional work under any circumstances',
    ],
    correctAnswer: 1,
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
      'Services always fail and can never be recovered',
      'A customer who has a problem resolved exceptionally well may become more loyal than one who never experienced a problem',
      'It is always cheaper to find new customers than fix problems with existing ones',
      'Service recovery efforts always fail',
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
    options: ['7 days', '14 days', '30 days', '60 days'],
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
      'Just the amount owed',
      'The amount owed, how it was calculated, details of interest/charges, information about free debt advice, and a response deadline',
      'A threatening statement about legal consequences',
      'Only the court form reference number',
    ],
    correctAnswer: 1,
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
      'Free for all claims',
      '£35 to £455, depending on the claim value',
      'A flat fee of £200',
      '10% of the claim value',
    ],
    correctAnswer: 1,
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
      'Move all the sockets for free to avoid conflict',
      'Refuse to discuss the matter and tell the client to check the signed plan',
      'Show the client the signed plan, empathise with their frustration, and offer to move the sockets as priced additional work',
      'Threaten legal action if the client does not pay the original invoice',
    ],
    correctAnswer: 2,
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
      'Say yes to everything to keep the client happy',
      'Immediately refuse all additional requests',
      'Acknowledge the request positively, explain it falls outside the original scope, and offer to price it as additional work',
      'Pretend not to hear the request',
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
      'It creates an opportunity to upsell additional services',
      'Following up shows genuine care, confirms the resolution was satisfactory, and can transform a complaint into lasting loyalty',
      'It is a legal requirement',
      'It allows you to check if they have told anyone about the complaint',
    ],
    correctAnswer: 1,
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
      'Immediately offer a refund to avoid escalation',
      'Tell the client they are wrong and show them the regulations',
      'Listen fully to understand the specific concern, then offer an independent inspection if agreement cannot be reached',
      'Ignore the complaint and wait for it to go away',
    ],
    correctAnswer: 2,
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
      "To limit the client's involvement in decisions",
      'To create realistic expectations about progress, disruption, timeline, and finish quality, reducing the gap between expectation and reality that causes complaints',
      'To generate additional paperwork',
      'To slow the project down',
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
      'Nothing further — they must accept the situation',
      'A price reduction, which may be up to 100% of the cost (a full refund)',
      'Automatic compensation of £5,000',
      'Free services for life',
    ],
    correctAnswer: 1,
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
      'Estimates are always cheaper for the client',
      'An estimate allows flexibility for unforeseen work (hidden junction boxes, asbestos, damaged existing wiring), while a quote locks in a fixed price regardless of what is discovered',
      'There is no reason — quotes are always better',
      'Estimates do not require any written documentation',
    ],
    correctAnswer: 1,
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
      'They can withhold the entire payment indefinitely',
      'They can request the light fitting be repositioned (right to repair) but cannot withhold a disproportionate amount relative to the defect',
      'They have no rights because they approved the positions',
      'They must pay in full immediately and complain afterwards',
    ],
    correctAnswer: 1,
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
      'Remove the asbestos yourself to keep costs down',
      'Abandon the project and walk away',
      "Explain the legal requirement for licensed removal, present it as a variation with clear costs, and document the client's refusal if they still decline — then pause work on that element until resolved",
      'Continue working around the asbestos without telling anyone',
    ],
    correctAnswer: 2,
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
      'It applies to all complaints equally and has no limits',
      'It works best when the original failure was not caused by negligence, the recovery is swift and genuine, and the client perceives the effort as exceptional — it does not apply to repeated failures or serious safety issues',
      'It only applies to large commercial contracts',
      'It means you should deliberately create problems to then resolve them',
    ],
    correctAnswer: 1,
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
      'Immediately file a court claim',
      'Make a phone call to discuss the situation, check for any dispute about the work, and attempt to agree a payment plan',
      "Turn up at the client's property unannounced",
      'Post about the client on social media',
    ],
    correctAnswer: 1,
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
      'Yes — the Consumer Rights Act gives consumers an absolute right to a refund',
      'No — the Consumer Rights Act covers failure to perform with reasonable care and skill, not change of mind; the sockets were installed as agreed and meet the required standard',
      'Yes — but only within 14 days of installation',
      'It depends on the value of the sockets',
    ],
    correctAnswer: 1,
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
      'There are no considerations — always pursue debts through court',
      'Court fees, time investment, enforcement difficulty, relationship damage, and whether the debtor has the means to pay — sometimes a negotiated settlement or write-off is more commercially sensible',
      'Only whether the solicitor fees will be covered',
      'Whether the debt is more than a year old',
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
      'Deny the defect exists and hope the client gives up',
      'Apply the HEARD framework: listen fully, empathise genuinely, apologise for the inconvenience, resolve the defect promptly and thoroughly, and follow up to ensure satisfaction',
      'Blame the materials supplier and distance yourself from the issue',
      'Offer a cash discount to avoid doing the repair',
    ],
    correctAnswer: 1,
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
      'The client — a quote is a fixed price and must be honoured regardless',
      'The electrician — they can charge whatever they want',
      'Both have valid positions — a quote is generally fixed, but genuinely unforeseeable work can constitute a valid variation, provided it is documented and agreed before proceeding',
      'Neither — the contract is void',
    ],
    correctAnswer: 2,
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
      'Always charge the maximum interest from day one',
      'Include the statutory interest entitlement in your terms and conditions, reference it in friendly reminders as a factual statement rather than a threat, and only formally claim it after the letter before action stage',
      'Never mention it to avoid confrontation',
      'Only use it against clients you do not want to work with again',
    ],
    correctAnswer: 1,
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
      'Give in to avoid the negative review',
      'Threaten the client with legal action for defamation',
      "Acknowledge the client's concern, explain clearly what was agreed and delivered, maintain professional boundaries, and document the conversation — reviews based on genuine experience are fair, but threats to extort free work should not be rewarded",
      'Ignore the situation entirely',
    ],
    correctAnswer: 2,
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
      'The HEARD framework cannot be used for unreasonable complaints',
      'For legitimate complaints, all five steps apply fully; for unreasonable complaints, you Hear and Empathise but the Apologise, Resolve, and Do follow up steps are adapted to maintain boundaries while remaining professional',
      'The framework is applied identically regardless',
      'For unreasonable complaints, skip directly to legal action',
    ],
    correctAnswer: 1,
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
      'The electrician must repair it for free because it is within the warranty period',
      'The electrician should investigate, identify the water damage as the cause, explain that the fault was caused by an external factor (not workmanship), document the findings, and offer a paid repair while advising the client to address the plumbing issue first',
      'The electrician should refuse to attend',
      'The electrician should repair both the electrical fault and the plumbing leak',
    ],
    correctAnswer: 1,
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
      'There are no benefits — it wastes time',
      "It keeps the client informed, manages expectations about the next day's work and disruption, builds trust, prevents anxiety-driven complaints, and creates a record of project communication",
      'It is only necessary if problems have occurred',
      'It delays the project unnecessarily',
    ],
    correctAnswer: 1,
    explanation:
      "End-of-day updates during a domestic rewire serve multiple purposes: they keep the client informed about what was done today, set expectations for tomorrow's work and disruption, build trust through transparency, prevent the anxiety-driven complaints that arise when clients feel left in the dark, and create a record of communication that can be referenced if disputes arise later. A simple five-minute conversation or text message can prevent hours of conflict resolution.",
    section: 'Resolving Client Disputes',
    difficulty: 'intermediate' as const,
    topic: 'Communication Frequency',
    category: 'Resolving Client Disputes',
  },
];
