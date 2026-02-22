/**
 * Personal Finance & Financial Wellbeing Mock Exam Question Bank
 *
 * 200 questions across 5 categories, balanced by difficulty.
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

export const pfCategories = [
  'Understanding Your Money',
  'Budgeting & Cash Flow',
  'Debt Management & Credit',
  'Pensions & Retirement Planning',
  'Financial Protection & Planning Ahead',
];

export const pfMockExamConfig: MockExamConfig = {
  examId: 'personal-finance',
  examTitle: 'Personal Finance & Financial Wellbeing Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800,
  passThreshold: 80,
  exitPath: '/study-centre/personal-development/personal-finance',
  categories: pfCategories,
};

export const pfQuestionBank: StandardMockQuestion[] = [
  // =====================================================
  // Category 1: Understanding Your Money (id 1-40)
  // 16 basic, 16 intermediate, 8 advanced
  // =====================================================
  {
    id: 1,
    question: 'What is the UK Personal Allowance for the 2024/25 tax year?',
    options: ['£12,570', '£11,850', '£13,570', '£10,000'],
    correctAnswer: 0,
    explanation:
      'The Personal Allowance for 2024/25 is £12,570, meaning you can earn this amount before paying any Income Tax. This applies to both employed and self-employed electricians, though it may be reduced if you earn over £100,000.',
    section: 'Understanding Your Money',
    difficulty: 'basic' as const,
    topic: 'Income Tax Basics',
    category: 'Understanding Your Money',
  },
  {
    id: 2,
    question:
      'Under the Construction Industry Scheme (CIS), what is the standard deduction rate for registered subcontractors?',
    options: ['20%', '30%', '15%', '0%'],
    correctAnswer: 0,
    explanation:
      'Registered CIS subcontractors have 20% deducted from their payments by contractors. Unregistered subcontractors face a higher 30% deduction, while those with gross payment status have 0% deducted.',
    section: 'Understanding Your Money',
    difficulty: 'basic' as const,
    topic: 'CIS Deductions',
    category: 'Understanding Your Money',
  },
  {
    id: 3,
    question: 'What is the deadline for filing a paper self-assessment tax return?',
    options: ['31 October', '31 January', '5 April', '30 September'],
    correctAnswer: 0,
    explanation:
      'Paper self-assessment returns must be filed by 31 October following the end of the tax year. Online returns have a later deadline of 31 January, giving you an extra three months.',
    section: 'Understanding Your Money',
    difficulty: 'basic' as const,
    topic: 'Self-Assessment Deadlines',
    category: 'Understanding Your Money',
  },
  {
    id: 4,
    question:
      'Which JIB grading is the entry-level position before becoming a Trainee Electrician?',
    options: ['Electrical Labourer', 'Apprentice', 'Graded Electrician', 'Improver'],
    correctAnswer: 0,
    explanation:
      'The JIB progression starts with Electrical Labourer, then moves to Trainee, Graded Electrician, Approved Electrician, and finally Technician. Each grade has specific pay rates and responsibilities under JIB terms.',
    section: 'Understanding Your Money',
    difficulty: 'basic' as const,
    topic: 'JIB Grading System',
    category: 'Understanding Your Money',
  },
  {
    id: 5,
    question: 'What is the basic rate of Income Tax for the 2024/25 tax year?',
    options: ['20%', '25%', '30%', '40%'],
    correctAnswer: 0,
    explanation:
      'The basic rate of Income Tax is 20% and applies to earnings between £12,571 and £50,270. Above £50,270, you enter the higher rate band at 40%, and above £125,140 you pay the additional rate of 45%.',
    section: 'Understanding Your Money',
    difficulty: 'basic' as const,
    topic: 'Income Tax Rates',
    category: 'Understanding Your Money',
  },
  {
    id: 6,
    question:
      'Which of the following is NOT typically an allowable business expense for a self-employed electrician?',
    options: [
      'Personal grocery shopping',
      'Test equipment and tools',
      'Van insurance',
      'Professional indemnity insurance',
    ],
    correctAnswer: 0,
    explanation:
      'Personal expenses like grocery shopping are not allowable business expenses. However, tools, van costs, insurance, training, PPE, and accountancy fees are all allowable as they are incurred "wholly and exclusively" for business purposes.',
    section: 'Understanding Your Money',
    difficulty: 'basic' as const,
    topic: 'Allowable Expenses',
    category: 'Understanding Your Money',
  },
  {
    id: 7,
    question: 'What is the weekly rate for Class 2 National Insurance Contributions in 2024/25?',
    options: ['£3.45', '£3.05', '£4.25', '£5.00'],
    correctAnswer: 0,
    explanation:
      'Class 2 NICs are £3.45 per week for self-employed individuals earning over £12,570. While now voluntary for most, paying them ensures you maintain entitlement to the State Pension and certain benefits.',
    section: 'Understanding Your Money',
    difficulty: 'basic' as const,
    topic: 'National Insurance',
    category: 'Understanding Your Money',
  },
  {
    id: 8,
    question: 'What does PAYE stand for in the context of employed electricians?',
    options: [
      'Pay As You Earn',
      'Pay All Your Earnings',
      'Payment And Year End',
      'Professional Annual Year Earnings',
    ],
    correctAnswer: 0,
    explanation:
      'PAYE stands for Pay As You Earn, the system where employers deduct Income Tax and National Insurance from your wages before you receive them. This applies to JIB employed electricians and those on direct employment contracts.',
    section: 'Understanding Your Money',
    difficulty: 'basic' as const,
    topic: 'PAYE Employment',
    category: 'Understanding Your Money',
  },
  {
    id: 9,
    question:
      'Under simplified expenses rules, what is the approved mileage rate for the first 10,000 business miles?',
    options: ['45p per mile', '25p per mile', '40p per mile', '50p per mile'],
    correctAnswer: 0,
    explanation:
      'HMRC allows 45p per mile for the first 10,000 business miles, then 25p per mile thereafter. This covers fuel, insurance, servicing, and depreciation, making record-keeping simpler than claiming actual van costs.',
    section: 'Understanding Your Money',
    difficulty: 'basic' as const,
    topic: 'Simplified Expenses',
    category: 'Understanding Your Money',
  },
  {
    id: 10,
    question: 'What does UTR stand for in self-assessment?',
    options: [
      'Unique Taxpayer Reference',
      'Universal Tax Record',
      'United Tax Registration',
      'Updated Tax Return',
    ],
    correctAnswer: 0,
    explanation:
      'UTR stands for Unique Taxpayer Reference, a 10-digit number issued by HMRC when you register for self-assessment. You need this reference to file your tax return and make payments.',
    section: 'Understanding Your Money',
    difficulty: 'basic' as const,
    topic: 'Self-Assessment Registration',
    category: 'Understanding Your Money',
  },
  {
    id: 11,
    question: 'Which business structure allows you to pay yourself through salary and dividends?',
    options: ['Limited company', 'Sole trader', 'CIS subcontractor', 'Partnership'],
    correctAnswer: 0,
    explanation:
      'As a limited company director, you can pay yourself a combination of salary (subject to PAYE and NI) and dividends (taxed at lower rates). Sole traders simply pay Income Tax and NI on all profits.',
    section: 'Understanding Your Money',
    difficulty: 'basic' as const,
    topic: 'Business Structures',
    category: 'Understanding Your Money',
  },
  {
    id: 12,
    question: 'What is the higher rate of Income Tax for 2024/25?',
    options: ['40%', '45%', '35%', '50%'],
    correctAnswer: 0,
    explanation:
      'The higher rate of Income Tax is 40% and applies to earnings between £50,271 and £125,140. The additional rate of 45% applies to income above £125,140.',
    section: 'Understanding Your Money',
    difficulty: 'basic' as const,
    topic: 'Income Tax Rates',
    category: 'Understanding Your Money',
  },
  {
    id: 13,
    question: 'What is the simplified home office expense allowance per week?',
    options: ['£6', '£4', '£8', '£10'],
    correctAnswer: 0,
    explanation:
      'HMRC allows a flat rate of £6 per week (£312 per year) for home office expenses without needing detailed records. Alternatively, you can claim a proportion of actual costs like heating, lighting, and internet.',
    section: 'Understanding Your Money',
    difficulty: 'basic' as const,
    topic: 'Simplified Expenses',
    category: 'Understanding Your Money',
  },
  {
    id: 14,
    question: 'What does CIS stand for in the construction industry?',
    options: [
      'Construction Industry Scheme',
      'Contractor Income System',
      'Construction Insurance Scheme',
      'Certified Installation Service',
    ],
    correctAnswer: 0,
    explanation:
      "CIS stands for Construction Industry Scheme, an HMRC tax deduction system where contractors deduct money from subcontractors' payments and pass it to HMRC. This counts as advance payment towards the subcontractor's tax and NI bill.",
    section: 'Understanding Your Money',
    difficulty: 'basic' as const,
    topic: 'CIS Overview',
    category: 'Understanding Your Money',
  },
  {
    id: 15,
    question: 'When does the UK tax year run from and to?',
    options: [
      '6 April to 5 April',
      '1 January to 31 December',
      '1 April to 31 March',
      '6 January to 5 January',
    ],
    correctAnswer: 0,
    explanation:
      'The UK tax year runs from 6 April to 5 April the following year. For example, the 2024/25 tax year runs from 6 April 2024 to 5 April 2025.',
    section: 'Understanding Your Money',
    difficulty: 'basic' as const,
    topic: 'Tax Year Basics',
    category: 'Understanding Your Money',
  },
  {
    id: 16,
    question: 'Which of these is NOT a hidden cost of self-employment compared to PAYE employment?',
    options: [
      'Lower tax rates',
      'No holiday pay',
      'No sick pay',
      'No employer pension contributions',
    ],
    correctAnswer: 0,
    explanation:
      "Self-employment doesn't automatically mean lower tax rates. Hidden costs include loss of holiday pay, sick pay, employer pension contributions, and having to cover your own public liability insurance and accountancy fees.",
    section: 'Understanding Your Money',
    difficulty: 'basic' as const,
    topic: 'Self-Employment Costs',
    category: 'Understanding Your Money',
  },
  {
    id: 17,
    question: 'What is the CIS deduction rate for unregistered subcontractors?',
    options: ['30%', '20%', '25%', '35%'],
    correctAnswer: 0,
    explanation:
      "Unregistered CIS subcontractors face a 30% deduction rate, compared to 20% for registered subcontractors. It's always worth registering with HMRC to reduce the deduction and improve cash flow, as you'll get any overpayment refunded later.",
    section: 'Understanding Your Money',
    difficulty: 'intermediate' as const,
    topic: 'CIS Registration',
    category: 'Understanding Your Money',
  },
  {
    id: 18,
    question:
      'What is the Class 4 NIC rate on profits between £12,570 and £50,270 for self-employed individuals in 2024/25?',
    options: ['6%', '9%', '12%', '2%'],
    correctAnswer: 0,
    explanation:
      'Self-employed individuals pay Class 4 NICs at 6% on profits between £12,570 and £50,270, then 2% on profits above £50,270. This is in addition to Class 2 NICs at £3.45 per week if profits exceed £12,570.',
    section: 'Understanding Your Money',
    difficulty: 'intermediate' as const,
    topic: 'National Insurance',
    category: 'Understanding Your Money',
  },
  {
    id: 19,
    question:
      'When must sole traders earning over £50,000 comply with Making Tax Digital requirements?',
    options: ['From April 2026', 'From April 2024', 'From April 2025', 'From April 2027'],
    correctAnswer: 0,
    explanation:
      'Making Tax Digital (MTD) for Income Tax requires sole traders earning over £50,000 to use compatible software from April 2026. The threshold drops to £30,000 from April 2027, eventually covering most self-employed electricians.',
    section: 'Understanding Your Money',
    difficulty: 'intermediate' as const,
    topic: 'Making Tax Digital',
    category: 'Understanding Your Money',
  },
  {
    id: 20,
    question: 'What are payments on account in self-assessment?',
    options: [
      "Advance payments towards next year's tax bill based on the previous year",
      'Monthly instalments to spread the tax bill',
      'Payments made when submitting quarterly returns',
      'Deposits held by HMRC as security',
    ],
    correctAnswer: 0,
    explanation:
      "Payments on account are advance payments towards next year's tax bill, each equal to 50% of the previous year's tax liability. They're due on 31 January and 31 July, with a balancing payment on the following 31 January if needed.",
    section: 'Understanding Your Money',
    difficulty: 'intermediate' as const,
    topic: 'Self-Assessment Payments',
    category: 'Understanding Your Money',
  },
  {
    id: 21,
    question:
      'What is the main tax advantage of operating as a limited company compared to a sole trader?',
    options: [
      'Profits are taxed at Corporation Tax rates before being distributed',
      'No tax is payable on company profits',
      "Directors don't pay National Insurance",
      'All income is tax-free up to £50,000',
    ],
    correctAnswer: 0,
    explanation:
      'Limited companies pay Corporation Tax (currently 19-25% depending on profits) on company profits before distributing dividends to directors. This can be more tax-efficient than sole trader profits taxed at Income Tax rates of 20-45%, especially at higher income levels.',
    section: 'Understanding Your Money',
    difficulty: 'intermediate' as const,
    topic: 'Limited Company Taxation',
    category: 'Understanding Your Money',
  },
  {
    id: 22,
    question:
      'In the CIPD Financial Wellbeing model, which dimension refers to having enough money to meet day-to-day needs?',
    options: ['Control', 'Freedom', 'Resilience', 'Security'],
    correctAnswer: 0,
    explanation:
      'The CIPD/MaPS Financial Wellbeing model has four dimensions: Control (meeting day-to-day needs), Resilience (coping with financial shocks), Security (confidence in the future), and Freedom (making meaningful life choices). For electricians, control means managing irregular income and business expenses effectively.',
    section: 'Understanding Your Money',
    difficulty: 'intermediate' as const,
    topic: 'Financial Wellbeing',
    category: 'Understanding Your Money',
  },
  {
    id: 23,
    question:
      'Which allowable expense category would cover your ECS card renewal and 18th Edition update course?',
    options: ['Training and CPD', 'Tools and equipment', 'Professional fees', 'Subscriptions'],
    correctAnswer: 0,
    explanation:
      'Training, CPD (Continuing Professional Development), and courses required to maintain professional competence are allowable expenses. This includes ECS card renewals, 18th Edition updates, testing and inspection courses, and relevant health and safety training.',
    section: 'Understanding Your Money',
    difficulty: 'intermediate' as const,
    topic: 'Allowable Expenses',
    category: 'Understanding Your Money',
  },
  {
    id: 24,
    question: 'What is the additional rate of Income Tax for earnings above £125,140 in 2024/25?',
    options: ['45%', '40%', '50%', '42%'],
    correctAnswer: 0,
    explanation:
      'The additional rate of Income Tax is 45% on income above £125,140. Note that the Personal Allowance is also reduced by £1 for every £2 earned over £100,000, creating an effective marginal rate of 60% between £100,000 and £125,140.',
    section: 'Understanding Your Money',
    difficulty: 'intermediate' as const,
    topic: 'Income Tax Rates',
    category: 'Understanding Your Money',
  },
  {
    id: 25,
    question:
      'What is the deadline for paying your self-assessment tax bill and filing online returns?',
    options: [
      '31 January following the end of the tax year',
      '31 October following the end of the tax year',
      '5 April following the end of the tax year',
      '31 December following the end of the tax year',
    ],
    correctAnswer: 0,
    explanation:
      'Online self-assessment returns must be filed and any tax owed must be paid by 31 January following the end of the tax year. For the 2024/25 tax year (ending 5 April 2025), the deadline is 31 January 2026.',
    section: 'Understanding Your Money',
    difficulty: 'intermediate' as const,
    topic: 'Self-Assessment Deadlines',
    category: 'Understanding Your Money',
  },
  {
    id: 26,
    question:
      'What is the highest JIB grading for an electrician before moving into management roles?',
    options: ['Technician', 'Approved Electrician', 'Senior Electrician', 'Master Electrician'],
    correctAnswer: 0,
    explanation:
      'The JIB progression for electricians goes: Electrical Labourer, Trainee, Graded Electrician, Approved Electrician, and Technician. Technician is the highest operational grade, with specific pay rates and responsibilities defined in the JIB National Working Rules.',
    section: 'Understanding Your Money',
    difficulty: 'intermediate' as const,
    topic: 'JIB Grading System',
    category: 'Understanding Your Money',
  },
  {
    id: 27,
    question: 'In financial health terms, what is the difference between assets and liabilities?',
    options: [
      'Assets add value; liabilities create obligations or debt',
      'Assets are liquid; liabilities are fixed',
      'Assets are taxable; liabilities are tax-deductible',
      'Assets depreciate; liabilities appreciate',
    ],
    correctAnswer: 0,
    explanation:
      'Assets are things you own that have value (van, tools, property, savings), while liabilities are debts or financial obligations (van finance, credit cards, loans). Your net worth is calculated as total assets minus total liabilities.',
    section: 'Understanding Your Money',
    difficulty: 'intermediate' as const,
    topic: 'Financial Health',
    category: 'Understanding Your Money',
  },
  {
    id: 28,
    question: 'What is the reduced mileage rate for business miles over 10,000 in a tax year?',
    options: ['25p per mile', '45p per mile', '20p per mile', '30p per mile'],
    correctAnswer: 0,
    explanation:
      'After the first 10,000 business miles at 45p per mile, the approved mileage rate drops to 25p per mile. For example, if you drive 15,000 business miles, you can claim (10,000 × 45p) + (5,000 × 25p) = £4,500 + £1,250 = £5,750.',
    section: 'Understanding Your Money',
    difficulty: 'intermediate' as const,
    topic: 'Simplified Expenses',
    category: 'Understanding Your Money',
  },
  {
    id: 29,
    question: 'What is gross payment status under CIS?',
    options: [
      'Approved contractors can receive payments with 0% CIS deduction',
      'All contractors automatically receive gross payments',
      'Payments made before tax registration',
      'Monthly rather than weekly payment terms',
    ],
    correctAnswer: 0,
    explanation:
      'Gross payment status allows approved subcontractors to be paid without any CIS deduction (0%). To qualify, you must meet strict criteria including a good compliance record, turnover tests, and business tests over 12 months.',
    section: 'Understanding Your Money',
    difficulty: 'intermediate' as const,
    topic: 'CIS Gross Payment',
    category: 'Understanding Your Money',
  },
  {
    id: 30,
    question: 'Which expense category would cover your Napit or NICEIC membership fees?',
    options: [
      'Professional fees and subscriptions',
      'Training and development',
      'Insurance',
      'Administrative costs',
    ],
    correctAnswer: 0,
    explanation:
      'Professional body memberships like Napit, NICEIC, ECA, or SELECT are allowable as professional fees and subscriptions. These are necessary for trading as a qualified electrician and maintaining your professional status.',
    section: 'Understanding Your Money',
    difficulty: 'intermediate' as const,
    topic: 'Allowable Expenses',
    category: 'Understanding Your Money',
  },
  {
    id: 31,
    question: 'What does the "day rate illusion" refer to for self-employed electricians?',
    options: [
      'Comparing gross daily rates without accounting for tax, NI, expenses, and non-working time',
      'Charging different rates for different clients',
      'Quoting daily rates instead of hourly rates',
      'Working day shifts versus night shifts',
    ],
    correctAnswer: 0,
    explanation:
      'The day rate illusion occurs when electricians compare gross self-employed day rates (e.g., £200/day) against employed salaries without factoring in tax, NI, expenses, holiday pay loss, sick pay loss, and non-billable days. A proper comparison requires calculating actual annual take-home income.',
    section: 'Understanding Your Money',
    difficulty: 'intermediate' as const,
    topic: 'Employment Comparison',
    category: 'Understanding Your Money',
  },
  {
    id: 32,
    question: 'What is capital allowances in the context of business expenses?',
    options: [
      'Tax relief on business equipment and vehicle purchases spread over time',
      'Allowances for working in the capital city',
      'Extra deductions for limited companies only',
      'Annual limits on total business expenses',
    ],
    correctAnswer: 0,
    explanation:
      'Capital allowances allow you to claim tax relief on qualifying capital expenditure like vans, tools, and equipment. Annual Investment Allowance (AIA) lets you deduct the full value of qualifying equipment (up to £1 million) in the year of purchase, rather than claiming depreciation over several years.',
    section: 'Understanding Your Money',
    difficulty: 'intermediate' as const,
    topic: 'Capital Allowances',
    category: 'Understanding Your Money',
  },
  {
    id: 33,
    question:
      'How do IR35 off-payroll working rules affect electricians working through their own limited company?',
    options: [
      "They determine whether you're taxed as employed or self-employed based on working practices",
      'They require all contractors to use umbrella companies',
      'They set maximum daily rates for electrical work',
      'They mandate pension contributions for all limited companies',
    ],
    correctAnswer: 0,
    explanation:
      'IR35 assesses whether you\'re a "disguised employee" based on control, substitution, and mutuality of obligation. If caught by IR35, you\'re taxed as an employee despite operating through a limited company, losing tax advantages of salary/dividend splits. Medium and large clients must now determine IR35 status.',
    section: 'Understanding Your Money',
    difficulty: 'advanced' as const,
    topic: 'IR35 Compliance',
    category: 'Understanding Your Money',
  },
  {
    id: 34,
    question:
      'What is the effective marginal tax rate for income between £100,000 and £125,140 due to Personal Allowance withdrawal?',
    options: ['60%', '40%', '45%', '50%'],
    correctAnswer: 0,
    explanation:
      'Between £100,000 and £125,140, you lose £1 of Personal Allowance for every £2 earned, effectively adding 20% tax on top of the 40% higher rate, creating a 60% marginal rate. This makes pension contributions or other tax-efficient strategies particularly valuable in this income band.',
    section: 'Understanding Your Money',
    difficulty: 'advanced' as const,
    topic: 'Income Tax Planning',
    category: 'Understanding Your Money',
  },
  {
    id: 35,
    question:
      'What is the optimal salary/dividend split strategy for a limited company director in 2024/25?',
    options: [
      'Salary around £12,570 (Personal Allowance), remainder as dividends to minimise NI',
      'Maximum salary to build State Pension, no dividends',
      'Equal split between salary and dividends',
      'All dividends, no salary',
    ],
    correctAnswer: 0,
    explanation:
      'Most tax advisors recommend a salary around the Personal Allowance (£12,570) or slightly lower to avoid employer and employee NI (13.8% + 12%), then taking remaining profits as dividends taxed at 8.75%/33.75%/39.35%. This minimises the total tax and NI burden while maintaining some State Pension accrual.',
    section: 'Understanding Your Money',
    difficulty: 'advanced' as const,
    topic: 'Limited Company Tax Planning',
    category: 'Understanding Your Money',
  },
  {
    id: 36,
    question:
      'When comparing employed versus self-employed income, which calculation gives the most accurate comparison?',
    options: [
      'Net annual take-home after tax, NI, expenses, and adjusting for lost benefits and non-working days',
      'Gross daily rate multiplied by 365 days',
      'Hourly rate comparison ignoring benefits',
      'Weekly income comparison',
    ],
    correctAnswer: 0,
    explanation:
      'An accurate comparison requires calculating net annual take-home, factoring in all tax, NI, business expenses, lost holiday pay (28 days), sick pay, pension contributions, and non-billable days (admin, travel, quotes). A £200/day self-employed rate often equates to a £35-40k employed salary once all factors are included.',
    section: 'Understanding Your Money',
    difficulty: 'advanced' as const,
    topic: 'Employment Comparison',
    category: 'Understanding Your Money',
  },
  {
    id: 37,
    question: 'What are the four key dimensions of the CIPD/MaPS Financial Wellbeing model?',
    options: [
      'Control, Resilience, Security, Freedom',
      'Income, Savings, Pension, Protection',
      'Budgeting, Debt, Investment, Planning',
      'Earnings, Spending, Borrowing, Saving',
    ],
    correctAnswer: 0,
    explanation:
      'The model defines wellbeing across four dimensions: Control (managing day-to-day finances), Resilience (coping with shocks like van breakdown or injury), Security (planning for the future and retirement), and Freedom (making meaningful choices). This framework helps electricians assess and improve their overall financial health.',
    section: 'Understanding Your Money',
    difficulty: 'advanced' as const,
    topic: 'Financial Wellbeing Model',
    category: 'Understanding Your Money',
  },
  {
    id: 38,
    question:
      'When must a self-employed electrician register for Making Tax Digital if their income grows from £25,000 to £55,000?',
    options: [
      'From April 2026 when they exceed £50,000',
      'Immediately upon exceeding £50,000',
      'From April 2027 when they exceed £30,000',
      'When they file their next tax return',
    ],
    correctAnswer: 0,
    explanation:
      'MTD for Income Tax applies from April 2026 for those earning over £50,000, and from April 2027 for those over £30,000. Once you cross the threshold, you must use MTD-compatible software to keep digital records and submit quarterly updates, fundamentally changing how you manage tax compliance.',
    section: 'Understanding Your Money',
    difficulty: 'advanced' as const,
    topic: 'Making Tax Digital Compliance',
    category: 'Understanding Your Money',
  },
  {
    id: 39,
    question:
      'If a CIS subcontractor has £20,000 deducted under CIS during the year but only owes £15,000 in tax and NI, what happens?',
    options: [
      'HMRC refunds the £5,000 overpayment after filing the tax return',
      'The £5,000 is carried forward to next year',
      'The £5,000 is lost',
      'The contractor must claim it directly from the main contractor',
    ],
    correctAnswer: 0,
    explanation:
      'CIS deductions count as payments on account towards your tax bill. If deductions exceed your actual tax and NI liability, HMRC refunds the overpayment after you file your self-assessment return. This is why keeping accurate records and filing promptly is crucial for CIS workers.',
    section: 'Understanding Your Money',
    difficulty: 'advanced' as const,
    topic: 'CIS Overpayment',
    category: 'Understanding Your Money',
  },
  {
    id: 40,
    question:
      'What is the key difference between actual expenses and simplified expenses for business use of home?',
    options: [
      'Actual expenses require apportioning bills based on business use percentage; simplified expenses use a flat £6/week rate',
      'Actual expenses are always higher than simplified expenses',
      'Simplified expenses require more detailed records',
      'Actual expenses can only be claimed by limited companies',
    ],
    correctAnswer: 0,
    explanation:
      'With actual expenses, you calculate the business proportion of mortgage interest/rent, utilities, council tax, and internet, which requires detailed records and floor space calculations. Simplified expenses offer £6/week (£312/year) without proof, which is easier but may be less beneficial if your home office costs are genuinely higher.',
    section: 'Understanding Your Money',
    difficulty: 'advanced' as const,
    topic: 'Home Office Expenses',
    category: 'Understanding Your Money',
  },
  {
    // =====================================================
    // Category 2: Budgeting & Cash Flow (id 41-80)
    // 16 basic, 16 intermediate, 8 advanced
    // =====================================================
    id: 41,
    question:
      'According to MoneyHelper research, what percentage of UK adults do not have a household budget?',
    options: ['Around 25%', 'Around 40%', 'Around 55%', 'Around 70%'],
    correctAnswer: 1,
    explanation:
      'MoneyHelper research indicates that approximately 40% of UK adults do not maintain a household budget, leaving them vulnerable to financial shocks. For self-employed electricians with irregular income, budgeting is even more critical to manage seasonal variations and tax obligations.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'basic' as const,
    topic: 'Why Budgeting Matters',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 42,
    question: 'What does the "50" represent in the 50/30/20 budgeting rule?',
    options: [
      'Percentage for savings and debt repayment',
      'Percentage for wants and discretionary spending',
      'Percentage for needs and essential expenses',
      'Percentage for tax provisions',
    ],
    correctAnswer: 2,
    explanation:
      "In Elizabeth Warren's 50/30/20 rule, 50% of after-tax income should cover needs (housing, utilities, food, insurance). The remaining splits into 30% for wants and 20% for savings. For tradespeople, this rule requires adaptation to account for tax provisions before applying the percentages.",
    section: 'Budgeting & Cash Flow',
    difficulty: 'basic' as const,
    topic: '50/30/20 Rule',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 43,
    question: 'What is the key principle of zero-based budgeting?',
    options: [
      'Starting each month with zero in your bank account',
      'Allocating every pound of income to a specific purpose',
      'Spending nothing on non-essentials',
      'Resetting your budget to zero each year',
    ],
    correctAnswer: 1,
    explanation:
      'Zero-based budgeting means every pound of income is assigned to a category (expenses, savings, debt) before the month begins, so income minus allocations equals zero. This method is particularly effective for electricians with irregular income, as it forces intentional planning for variable earnings.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'basic' as const,
    topic: 'Zero-Based Budgeting',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 44,
    question:
      'Which banking feature allows you to create digital "envelopes" for different spending categories?',
    options: ['Direct debits', 'Standing orders', 'Pots or Spaces', 'Overdraft facilities'],
    correctAnswer: 2,
    explanation:
      'Digital banks like Starling (Spaces) and Monzo (Pots) offer virtual compartments within your account to separate money for different purposes. This replicates the traditional envelope budgeting system digitally, making it easier for electricians to separate tax money, emergency funds, and spending money.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'basic' as const,
    topic: 'Envelope System',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 45,
    question: "In the Tradesperson's Five-Account System, what is the purpose of the Tax account?",
    options: [
      'To pay business expenses',
      'To hold 30% of gross income for tax obligations',
      'To save for holidays',
      'To manage VAT returns only',
    ],
    correctAnswer: 1,
    explanation:
      'The Tax account should receive approximately 30% of gross income immediately upon receipt, ringfencing funds for Income Tax, National Insurance, and potentially VAT. This prevents the common trap of spending tax money and facing a large bill at payment deadlines.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'basic' as const,
    topic: 'Five-Account System',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 46,
    question: 'What does IPSE research reveal about self-employed income?',
    options: [
      'Income is always higher than employed workers',
      'Income is stable throughout the year',
      'Income shows significant volatility and seasonal variation',
      'Income is guaranteed by government schemes',
    ],
    correctAnswer: 2,
    explanation:
      'IPSE (Association of Independent Professionals and the Self-Employed) research demonstrates that self-employed workers experience significant income volatility, with many facing seasonal peaks and troughs. Electricians often see reduced demand during summer holidays and increased work during autumn/winter, requiring careful cash flow planning.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'basic' as const,
    topic: 'Income Volatility',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 47,
    question: 'What is the "baseline month" approach to budgeting for irregular income?',
    options: [
      'Budgeting based on your highest earning month',
      'Budgeting based on your average monthly income',
      'Budgeting based on your lowest likely monthly income',
      "Budgeting based on last year's total income",
    ],
    correctAnswer: 2,
    explanation:
      'The baseline month approach means budgeting to the lowest income you realistically expect to earn in a month, ensuring essential expenses are always covered. Any income above this baseline can be allocated to savings, debt repayment, or discretionary spending, creating a financial safety buffer for electricians.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'basic' as const,
    topic: 'Baseline Month',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 48,
    question: 'What is "income smoothing" in the context of self-employment?',
    options: [
      'Averaging your income over several years for tax purposes',
      'Paying yourself a consistent salary from your business account',
      'Spreading payments to HMRC across the year',
      'Requesting clients pay in monthly instalments',
    ],
    correctAnswer: 1,
    explanation:
      'Income smoothing involves paying yourself a regular, consistent amount from your business account (like a salary), regardless of monthly income fluctuations. This creates predictable personal finances and helps electricians avoid overspending in high-earning months while maintaining stability during quieter periods.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'basic' as const,
    topic: 'Income Smoothing',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 49,
    question: 'What is the recommended tax provision rule for self-employed electricians?',
    options: [
      'Save 10% of net profit',
      'Save 20% of gross income',
      'Save 30% of gross income',
      'Save 40% of gross income',
    ],
    correctAnswer: 2,
    explanation:
      'The 30% rule recommends setting aside 30% of gross income immediately for tax obligations (Income Tax, Class 2 and Class 4 National Insurance, and potentially VAT). This conservative approach ensures sufficient funds are available for tax bills and prevents the common issue of under-provisioning.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'basic' as const,
    topic: 'Tax Provision Rule',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 50,
    question: 'Why is December often called the "Christmas cash flow trap" for tradespeople?',
    options: [
      'HMRC requires extra tax payments in December',
      'High personal spending coincides with reduced business income',
      'Equipment suppliers increase their prices',
      'VAT returns are due in December',
    ],
    correctAnswer: 1,
    explanation:
      'Many tradespeople face reduced work during December due to client closures and holidays, while personal expenses spike for Christmas. Without proper planning and holiday provision savings, electricians can find themselves in financial difficulty during this period.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'basic' as const,
    topic: 'Seasonal Planning',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 51,
    question: 'What is the primary purpose of a 12-month cash flow forecast?',
    options: [
      'To calculate your tax liability',
      'To predict and plan for income and expense patterns',
      'To apply for business loans',
      'To comply with HMRC regulations',
    ],
    correctAnswer: 1,
    explanation:
      'A 12-month cash flow forecast projects expected income and expenses month by month, helping identify potential shortfalls or surpluses in advance. For electricians, this highlights seasonal quiet periods, tax payment months, and helps plan for major purchases or holiday periods.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'basic' as const,
    topic: 'Cash Flow Forecasting',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 52,
    question: 'Which is NOT a reason to separate business and personal finances?',
    options: [
      'Legal protection for sole traders',
      'Simplified Making Tax Digital compliance',
      'Psychological clarity on business profitability',
      'Easier bookkeeping and record-keeping',
    ],
    correctAnswer: 0,
    explanation:
      'While separation offers practical, psychological, and MTD benefits, it does not provide legal protection for sole traders, who remain personally liable for business debts. However, separation still simplifies accounting, reduces mixing of funds, and makes tax obligations clearer for self-employed electricians.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'basic' as const,
    topic: 'Separation of Finances',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 53,
    question: 'Which of these banks offers free business banking for sole traders?',
    options: ['Barclays', 'HSBC', 'Starling Bank', 'NatWest'],
    correctAnswer: 2,
    explanation:
      'Starling Bank, along with Tide and Mettle, offers free business current accounts for sole traders with no monthly fees. Traditional high street banks typically charge monthly fees and transaction charges, making digital-first banks attractive options for cost-conscious electricians.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'basic' as const,
    topic: 'Business Banking',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 54,
    question: 'How long must electricians keep business records for tax purposes?',
    options: ['1 year', '3 years', '5 years plus the current tax year', '10 years'],
    correctAnswer: 2,
    explanation:
      'HMRC requires self-employed individuals to keep records for 5 years from the 31 January submission deadline of the relevant tax year (effectively 5 years plus up to 10 months). This includes invoices, receipts, bank statements, and mileage logs, essential for MTD compliance and potential investigations.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'basic' as const,
    topic: 'Record-Keeping for MTD',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 55,
    question: 'What is the recommended weekly admin habit for self-employed electricians?',
    options: [
      '10 minutes on Monday morning',
      '30 minutes on Friday afternoon',
      '2 hours on Sunday evening',
      '1 hour on Wednesday lunchtime',
    ],
    correctAnswer: 1,
    explanation:
      "A dedicated 30-minute admin session on Friday afternoon allows electricians to reconcile the week's receipts, update accounting software, chase late payments, and review upcoming cash flow. This consistent habit prevents paperwork backlogs and keeps financial records MTD-ready.",
    section: 'Budgeting & Cash Flow',
    difficulty: 'basic' as const,
    topic: 'Weekly Admin Habit',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 56,
    question: 'What is the current VAT registration threshold from April 2024?',
    options: ['£85,000', '£90,000', '£100,000', '£120,000'],
    correctAnswer: 1,
    explanation:
      'The VAT registration threshold increased to £90,000 from April 2024. Electricians whose taxable turnover exceeds this threshold in a 12-month period must register for VAT, adding 20% to their invoices and submitting quarterly returns through Making Tax Digital.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'basic' as const,
    topic: 'VAT Threshold',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 57,
    question:
      'Under the Late Payment of Commercial Debts (Interest) Act 1998, what interest rate can electricians charge on overdue B2B invoices?',
    options: [
      'Bank of England base rate only',
      'Fixed 5% per annum',
      '8% plus Bank of England base rate',
      '10% plus Bank of England base rate',
    ],
    correctAnswer: 2,
    explanation:
      'The Act entitles businesses to charge 8% plus the Bank of England base rate on overdue business-to-business invoices, plus compensation for debt recovery costs. This statutory right helps electricians recover costs from late-paying commercial clients, though exercising it requires clear payment terms on invoices.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'intermediate' as const,
    topic: 'Late Payment Rights',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 58,
    question:
      'Why might the traditional 50/30/20 rule need adjustment for self-employed electricians?',
    options: [
      "It doesn't account for irregular income patterns",
      'It applies percentages to after-tax income, but electricians must provision tax first',
      'It assumes employer pension contributions',
      'All of the above',
    ],
    correctAnswer: 3,
    explanation:
      'The 50/30/20 rule requires significant adaptation for self-employment: tax must be provisioned before applying percentages, irregular income makes fixed percentages challenging, and there are no employer pension contributions. A better approach is "tax first, then baseline essentials, then allocate surplus".',
    section: 'Budgeting & Cash Flow',
    difficulty: 'intermediate' as const,
    topic: '50/30/20 Rule Adaptation',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 59,
    question:
      'In zero-based budgeting for electricians, what should happen to surplus income after all categories are funded?',
    options: [
      'It should be left unallocated for flexibility',
      'It must be spent immediately',
      'It should be allocated to specific goals (extra debt payment, savings, business investment)',
      'It should always go to the tax account',
    ],
    correctAnswer: 2,
    explanation:
      'Zero-based budgeting requires every pound to have a job, including surplus income. Rather than leaving it unallocated (where it might be frittered away), electricians should intentionally assign surplus to specific goals like emergency fund building, pension contributions, equipment upgrades, or debt overpayment.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'intermediate' as const,
    topic: 'Zero-Based Budgeting',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 60,
    question:
      "What is the main advantage of the Tradesperson's Five-Account System over a single account?",
    options: [
      'It provides better interest rates',
      'It automatically calculates your tax',
      'It creates financial discipline through physical separation and purpose-specific allocation',
      'It is required by HMRC for MTD compliance',
    ],
    correctAnswer: 2,
    explanation:
      'The Five-Account System (Tax, Business, Bills, Spending, Savings) uses physical separation to create psychological barriers against spending money earmarked for other purposes. When tax money sits in a separate account, electricians are far less likely to accidentally spend it, compared to keeping all funds mixed together.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'intermediate' as const,
    topic: 'Five-Account System',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 61,
    question: 'Which seasonal pattern is most common for domestic electricians in the UK?',
    options: [
      'Peak demand in summer, quiet in winter',
      'Stable demand year-round',
      'Quiet in summer holidays and December, busier in autumn/spring',
      'Peak demand only in December for Christmas lighting',
    ],
    correctAnswer: 2,
    explanation:
      'Most domestic electricians experience reduced work during summer holidays (July-August) when clients are away and in December due to Christmas closures. Autumn and spring typically see increased activity as homeowners undertake improvement projects. Understanding this pattern allows better cash flow planning and holiday provision savings.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'intermediate' as const,
    topic: 'Seasonal Patterns',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 62,
    question:
      "If an electrician's lowest monthly income is typically £2,500 and highest is £6,000, what should their baseline budget cover?",
    options: [
      'The average of £4,250',
      'The highest of £6,000 for security',
      'The lowest of £2,500 for resilience',
      'The median across the year',
    ],
    correctAnswer: 2,
    explanation:
      'Budgeting to the lowest likely income (£2,500) ensures all essential expenses can be covered even in the worst month. Income exceeding this baseline becomes available for savings, debt repayment, or discretionary spending. This conservative approach prevents financial stress during inevitable quiet periods.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'intermediate' as const,
    topic: 'Baseline Month Application',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 63,
    question:
      'An electrician earns £4,000 in January and £2,000 in February. Using income smoothing, what should they pay themselves each month?',
    options: [
      '£4,000 in January, £2,000 in February',
      '£3,000 in both months',
      '£2,000 in both months, saving the January surplus',
      '£6,000 total across the two months as needed',
    ],
    correctAnswer: 2,
    explanation:
      'Income smoothing means paying yourself consistently based on your baseline or average income, not actual monthly earnings. Paying £2,000 in both months (the lower amount) creates stability and forces saving in high-income months, building a buffer for lean periods rather than lifestyle inflation.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'intermediate' as const,
    topic: 'Income Smoothing Application',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 64,
    question:
      'An electrician invoices £5,000 gross in a month. Using the 30% tax provision rule, how much should go to the tax account immediately?',
    options: ['£1,000', '£1,200', '£1,500', '£2,000'],
    correctAnswer: 2,
    explanation:
      '30% of £5,000 is £1,500, which should be transferred to the tax account immediately upon receiving payment. This ensures sufficient provision for Income Tax, Class 2 and Class 4 NI, and potential VAT, preventing the common scenario of spending tax money and facing a shortfall at payment deadlines.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'intermediate' as const,
    topic: 'Tax Provision Calculation',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 65,
    question: 'How should an electrician plan for the Christmas cash flow trap?',
    options: [
      'Rely on credit cards during December',
      'Set aside money monthly in a separate pot throughout the year',
      'Work extra hours in December to compensate',
      'Delay paying suppliers until January',
    ],
    correctAnswer: 1,
    explanation:
      'The best approach is proactive saving: set aside a fixed amount monthly (e.g., £200/month for 10 months = £2,000 for December) in a dedicated pot or savings account. This covers both reduced December income and increased personal expenses without relying on expensive credit or creating cash flow stress.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'intermediate' as const,
    topic: 'Christmas Planning',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 66,
    question: 'What are the key elements a 12-month cash flow forecast should include?',
    options: [
      'Only expected income by month',
      'Only expected expenses by month',
      'Expected income, regular expenses, one-off costs, tax payments, and opening/closing balances',
      'Just tax payment dates',
    ],
    correctAnswer: 2,
    explanation:
      'A comprehensive cash flow forecast tracks expected income (considering seasonal patterns), regular monthly expenses (rent, insurance, subscriptions), one-off costs (equipment purchases, vehicle servicing), tax payment deadlines (January and July), and calculates running balances. This reveals potential shortfalls months in advance for electricians.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'intermediate' as const,
    topic: 'Cash Flow Forecasting',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 67,
    question:
      'Beyond practical bookkeeping, what psychological benefit does separating business and personal finances provide?',
    options: [
      'It makes you feel more professional',
      'It provides clear visibility on true business profitability and personal drawings',
      'It impresses clients',
      'It reduces anxiety about all finances',
    ],
    correctAnswer: 1,
    explanation:
      'Separation creates crucial psychological clarity: you can see whether your business is genuinely profitable (not just whether you have money in the bank) and whether your personal drawings are sustainable. Mixed finances obscure this reality, leading electricians to overestimate business success or overspend personal funds.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'intermediate' as const,
    topic: 'Psychological Benefits of Separation',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 68,
    question:
      'Which accounting software is specifically designed for freelancers and sole traders, with integrated tax timeline features?',
    options: ['Sage', 'QuickBooks', 'FreeAgent', 'Xero'],
    correctAnswer: 2,
    explanation:
      'FreeAgent was built specifically for freelancers and sole traders, featuring a visual tax timeline showing upcoming tax liabilities, automatic categorisation, and built-in expense tracking. While Xero, QuickBooks, and Sage are excellent, they are more general-purpose and may be more complex than required for sole trader electricians.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'intermediate' as const,
    topic: 'Accounting Software',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 69,
    question: 'What is the main purpose of receipt management apps like Dext or Xero Capture?',
    options: [
      'To calculate your tax automatically',
      'To photograph and digitise receipts for automatic data extraction and accounting software integration',
      'To store receipts for personal shopping',
      'To create invoices for clients',
    ],
    correctAnswer: 1,
    explanation:
      'Receipt management apps allow electricians to photograph paper receipts on-site, automatically extract key data (date, amount, supplier, VAT), and push transactions directly into accounting software. This eliminates paper clutter, prevents lost receipts, and saves hours of manual data entry each month.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'intermediate' as const,
    topic: 'Receipt Management',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 70,
    question:
      'Which budgeting app uses the "give every pound a job" philosophy, making it ideal for irregular income?',
    options: ['Emma', 'Plum', 'YNAB (You Need A Budget)', 'Moneybox'],
    correctAnswer: 2,
    explanation:
      'YNAB is built on zero-based budgeting principles ("give every pound a job") and specifically designed for people with irregular income. It forces intentional allocation of every pound earned, making it excellent for electricians who need to plan around variable monthly income and seasonal fluctuations.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'intermediate' as const,
    topic: 'Budgeting Apps',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 71,
    question:
      'What is the benefit of accessing your Personal Tax Account via the HMRC app rather than the Government Gateway website?',
    options: [
      'You pay less tax',
      'It provides mobile-optimised access to tax information, payment deadlines, and National Insurance record',
      'It automatically files your Self Assessment',
      'It gives you an extra month to pay tax',
    ],
    correctAnswer: 1,
    explanation:
      "The HMRC app provides convenient mobile access to your Personal Tax Account, showing tax owed, payment deadlines, National Insurance contributions, and tax codes. While it doesn't change your tax obligations, it allows electricians to check their tax position on-the-go, helping with cash flow planning and avoiding surprises.",
    section: 'Budgeting & Cash Flow',
    difficulty: 'intermediate' as const,
    topic: 'HMRC Digital Tools',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 72,
    question:
      'An electrician has £8,000 in their business account. £2,500 is actually for tax, £1,500 for upcoming materials, and £1,000 for VAT. What is their true available cash?',
    options: ['£8,000', '£5,500', '£4,000', '£3,000'],
    correctAnswer: 3,
    explanation:
      'Despite £8,000 showing in the account, only £3,000 is genuinely available (£8,000 - £2,500 tax - £1,500 materials - £1,000 VAT). This illustrates why the Five-Account System is valuable: physical separation prevents the illusion of available cash when funds are actually earmarked for obligations.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'intermediate' as const,
    topic: 'True Available Cash',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 73,
    question:
      'An electrician operates zero-based budgeting with irregular income. They earn £7,000 in March but only £2,800 in April. Their essential monthly allocation is £2,500. How should they allocate the March surplus?',
    options: [
      "Spend it immediately as it's surplus",
      "Allocate £2,500 to April's essentials buffer, then assign remaining £2,000 to specific goals",
      'Leave it unallocated for flexibility',
      'Put all £4,500 surplus into savings',
    ],
    correctAnswer: 1,
    explanation:
      'With April income falling short of essentials by £700, the first priority is buffering next month (£2,500 from March surplus covers April). The remaining £2,000 should be allocated to specific goals rather than left unallocated. This demonstrates true zero-based budgeting: intentional allocation of every pound, accounting for income volatility.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'advanced' as const,
    topic: 'Zero-Based Budgeting with Volatility',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 74,
    question:
      'Why might the 30% tax provision rule be insufficient for a VAT-registered electrician with high profit margins?',
    options: [
      'VAT is due immediately on invoice date',
      "30% may not cover higher-rate tax (40%), Class 4 NI, and VAT if pricing doesn't add VAT on top",
      'HMRC charges penalties if you save too much',
      'The rule only applies to employed people',
    ],
    correctAnswer: 1,
    explanation:
      'An electrician earning above £50,270 enters 40% Income Tax territory, plus Class 4 NI (6% between £12,570-£50,270, then 2% above). If VAT is absorbed rather than added to prices, 30% provision becomes inadequate. High earners may need 35-40% provision, calculated based on their specific tax position and VAT registration.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'advanced' as const,
    topic: 'Advanced Tax Provision',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 75,
    question:
      'An electrician wants to smooth income to £3,000/month. In a 12-month forecast, they project total income of £42,000. What challenge does this create?',
    options: [
      'No challenge, £42,000 ÷ 12 = £3,500/month available',
      'They need a starting buffer, as early months may earn less than £3,000 before later months compensate',
      'They cannot smooth income above £40,000',
      'HMRC prohibits income smoothing for tax purposes',
    ],
    correctAnswer: 1,
    explanation:
      'While annual income averages £3,500/month, income volatility means some months earn less than £3,000. To pay themselves £3,000 consistently, they need an initial buffer (e.g., 2-3 months of salary) to cover shortfalls in lean months before high-earning months replenish the buffer. Without this, smoothing breaks down immediately.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'advanced' as const,
    topic: 'Income Smoothing Buffer',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 76,
    question:
      'Under the Late Payment Act 1998, an electrician invoices a business client £2,000 with 30-day terms. The invoice is paid 90 days late. With base rate at 5.25%, what is the approximate statutory interest due?',
    options: ['£25', '£45', '£65', '£85'],
    correctAnswer: 2,
    explanation:
      'Statutory interest is 8% + 5.25% base = 13.25% per annum. For £2,000 over 90 days (0.247 years): £2,000 × 13.25% × 0.247 = approximately £65. Additionally, the electrician can claim £70 fixed compensation for a £2,000 debt under £10,000, making total recovery around £135 plus the original £2,000.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'advanced' as const,
    topic: 'Late Payment Calculation',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 77,
    question:
      'A 12-month cash flow forecast shows negative cash in August (-£1,200) and December (-£800), but positive all other months. What is the best strategic response?',
    options: [
      'Ignore it, as the total year is positive',
      'Plan to use a credit card in August and December',
      'Build a cash buffer of £1,500 by July and replenish it after August for December',
      'Stop working in August and December',
    ],
    correctAnswer: 2,
    explanation:
      "Forecasting reveals pinch points months in advance, allowing proactive buffering. Building a £1,500 reserve by July (through higher earnings or reduced expenses in earlier months) covers the August shortfall. Replenishing it during profitable autumn months ensures December's gap is also covered without debt.",
    section: 'Budgeting & Cash Flow',
    difficulty: 'advanced' as const,
    topic: 'Strategic Cash Flow Planning',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 78,
    question:
      'An electrician approaching the £90,000 VAT threshold considers voluntary registration at £75,000. What is the primary strategic advantage of early registration?',
    options: [
      'You pay less VAT',
      'You can reclaim VAT on business expenses and avoid rushing to implement systems at the threshold',
      'You automatically pay less Income Tax',
      'You get a discount on accounting software',
    ],
    correctAnswer: 1,
    explanation:
      'Voluntary early registration allows electricians to reclaim VAT on business purchases (tools, vehicle, materials), potentially creating a VAT refund if expenses exceed income VAT. It also provides time to implement systems (MTD software, pricing adjustments) without the pressure of crossing the threshold, and clients become accustomed to VAT-inclusive pricing gradually.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'advanced' as const,
    topic: 'VAT Strategy',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 79,
    question:
      'Why is the "Bills" account in the Five-Account System crucial for MTD compliance beyond just separation?',
    options: [
      'HMRC requires a dedicated bills account',
      'It creates a clear audit trail of personal vs business expenses, reducing classification errors',
      'It automatically generates your tax return',
      'It provides legal protection from HMRC',
    ],
    correctAnswer: 1,
    explanation:
      'The Bills account (for personal committed expenses like mortgage, utilities, insurance) creates clear separation from business expenses. When reviewing bank statements for MTD quarterly updates, transactions are pre-categorised by account, reducing misclassification errors. Business account = business expenses, Bills account = not business expenses, simplifying accurate record-keeping.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'advanced' as const,
    topic: 'MTD Compliance Strategy',
    category: 'Budgeting & Cash Flow',
  },
  {
    id: 80,
    question:
      'An electrician uses FreeAgent and Dext together. How should their Friday admin workflow integrate these tools for maximum efficiency?',
    options: [
      'Manually enter all receipts into FreeAgent',
      'Photograph receipts in Dext during the week, then Friday review Dext-pushed transactions in FreeAgent for categorisation and approval',
      'Only use Dext, ignore FreeAgent on Fridays',
      'Reconcile everything manually regardless of automation',
    ],
    correctAnswer: 1,
    explanation:
      'Optimal workflow: photograph receipts immediately when incurred (in van, at supplier) via Dext mobile app. On Friday, Dext will have auto-extracted data and pushed to FreeAgent. The electrician reviews these pre-populated transactions, confirms categories, adds notes if needed, and approves. This workflow takes 30 minutes instead of hours, maintaining MTD compliance without manual data entry.',
    section: 'Budgeting & Cash Flow',
    difficulty: 'advanced' as const,
    topic: 'Integrated Tool Workflow',
    category: 'Budgeting & Cash Flow',
  },
  {
    // =====================================================
    // Category 3: Debt Management & Credit (id 81-120)
    // 16 basic, 16 intermediate, 8 advanced
    // =====================================================
    id: 81,
    question: 'Which three credit reference agencies operate in the UK?',
    options: [
      'Experian, Equifax, TransUnion',
      'Experian, Equifax, Creditwise',
      'TransUnion, ClearScore, Experian',
      'Equifax, MSE Credit Club, TransUnion',
    ],
    correctAnswer: 0,
    explanation:
      'The three UK credit reference agencies are Experian, Equifax, and TransUnion. These agencies collect and maintain credit information on individuals and businesses. ClearScore, MSE Credit Club, and Credit Karma are free services that provide access to data from these agencies.',
    section: 'Debt Management & Credit',
    difficulty: 'basic' as const,
    topic: 'Credit Reference Agencies',
    category: 'Debt Management & Credit',
  },
  {
    id: 82,
    question: 'Which free service provides access to your Equifax credit report?',
    options: ['Credit Karma', 'ClearScore', 'MSE Credit Club', 'Experian Direct'],
    correctAnswer: 2,
    explanation:
      'MSE Credit Club (Money Saving Expert) provides free access to your Equifax credit report and score. ClearScore uses Equifax data, Credit Karma uses TransUnion, and you can access Experian directly through their own free service.',
    section: 'Debt Management & Credit',
    difficulty: 'basic' as const,
    topic: 'Free Credit Checking',
    category: 'Debt Management & Credit',
  },
  {
    id: 83,
    question: 'What is the most important factor affecting your credit score?',
    options: [
      'Payment history',
      'Credit utilisation',
      'Length of credit history',
      'Electoral roll registration',
    ],
    correctAnswer: 0,
    explanation:
      'Payment history is the most significant factor in credit scoring, typically accounting for around 35% of your score. Making payments on time consistently demonstrates reliability to lenders. Late or missed payments can significantly damage your credit score for up to six years.',
    section: 'Debt Management & Credit',
    difficulty: 'basic' as const,
    topic: 'Credit Score Factors',
    category: 'Debt Management & Credit',
  },
  {
    id: 84,
    question:
      'How many years of accounts do self-employed electricians typically need to show when applying for a mortgage?',
    options: ['1 year', '2-3 years', '4-5 years', '6 months'],
    correctAnswer: 1,
    explanation:
      'Most mortgage lenders require self-employed applicants to provide 2-3 years of accounts or tax returns (SA302 forms) to verify income. This is more stringent than for employed workers who typically only need recent payslips. Some specialist lenders may accept one year of accounts but often at less favourable rates.',
    section: 'Debt Management & Credit',
    difficulty: 'basic' as const,
    topic: 'Self-Employed Borrowing',
    category: 'Debt Management & Credit',
  },
  {
    id: 85,
    question:
      'Which document from HMRC is commonly required for self-employed mortgage applications?',
    options: ['P60', 'SA302', 'P45', 'P11D'],
    correctAnswer: 1,
    explanation:
      'The SA302 is a tax calculation from HMRC showing your self-assessment income for a specific year. Lenders use this to verify self-employed income alongside accounts or tax year overviews. This provides official confirmation of your declared income to support borrowing applications.',
    section: 'Debt Management & Credit',
    difficulty: 'basic' as const,
    topic: 'Self-Employed Income Verification',
    category: 'Debt Management & Credit',
  },
  {
    id: 86,
    question: 'Which of these is generally considered "good debt" for an electrician?',
    options: [
      'Payday loan for emergency tools',
      'Tool finance for diagnostic equipment',
      'Credit card cash advance',
      'Buy Now Pay Later for personal shopping',
    ],
    correctAnswer: 1,
    explanation:
      'Tool finance for professional equipment is considered good debt because it is an investment in your earning capacity. The tools generate income that can cover the repayments and increase long-term earnings. Payday loans and credit card advances carry extremely high interest rates and should be avoided.',
    section: 'Debt Management & Credit',
    difficulty: 'basic' as const,
    topic: 'Good vs Bad Debt',
    category: 'Debt Management & Credit',
  },
  {
    id: 87,
    question: 'What does PCP stand for in vehicle finance?',
    options: [
      'Personal Contract Purchase',
      'Personal Credit Plan',
      'Protected Car Payment',
      'Partial Credit Purchase',
    ],
    correctAnswer: 0,
    explanation:
      'PCP stands for Personal Contract Purchase, a popular form of van finance where you make monthly payments and have the option to pay a final balloon payment to own the vehicle, return it, or part-exchange it. PCP typically has lower monthly payments than HP (Hire Purchase) but you do not own the vehicle until the final payment is made.',
    section: 'Debt Management & Credit',
    difficulty: 'basic' as const,
    topic: 'Van Finance',
    category: 'Debt Management & Credit',
  },
  {
    id: 88,
    question: 'Which of these is a priority debt that must be paid first?',
    options: ['Credit card balance', 'Council tax', 'Personal loan', 'Catalogue debt'],
    correctAnswer: 1,
    explanation:
      'Council tax is a priority debt because non-payment can lead to court action, bailiff visits, and even imprisonment in extreme cases. Priority debts are those where the consequences of non-payment include losing your home, losing essential services, or facing criminal prosecution. Credit cards and personal loans are non-priority debts.',
    section: 'Debt Management & Credit',
    difficulty: 'basic' as const,
    topic: 'Priority Debts',
    category: 'Debt Management & Credit',
  },
  {
    id: 89,
    question: 'What is the avalanche method of debt repayment?',
    options: [
      'Paying off smallest debts first',
      'Paying off highest interest rate debts first',
      'Spreading payments equally across all debts',
      'Negotiating all debts to zero',
    ],
    correctAnswer: 1,
    explanation:
      'The avalanche method involves paying off debts with the highest interest rates first while maintaining minimum payments on others. This approach minimises the total interest paid over time and is mathematically the most efficient repayment strategy. It contrasts with the snowball method which targets smallest balances first for psychological wins.',
    section: 'Debt Management & Credit',
    difficulty: 'basic' as const,
    topic: 'Debt Repayment Strategies',
    category: 'Debt Management & Credit',
  },
  {
    id: 90,
    question: "What is StepChange's free debt advice phone number?",
    options: ['0800 138 1111', '0808 808 4000', '0300 200 3835', '0800 111 4444'],
    correctAnswer: 0,
    explanation:
      "StepChange's free debt advice line is 0800 138 1111. They are the UK's largest debt charity offering free, impartial advice on managing debts. National Debtline is 0808 808 4000, and HMRC Time to Pay is 0300 200 3835.",
    section: 'Debt Management & Credit',
    difficulty: 'basic' as const,
    topic: 'Free Debt Advice Services',
    category: 'Debt Management & Credit',
  },
  {
    id: 91,
    question: 'What does DMP stand for in debt management?',
    options: [
      'Debt Management Plan',
      'Direct Monthly Payment',
      'Deferred Minimum Payment',
      'Debt Mitigation Programme',
    ],
    correctAnswer: 0,
    explanation:
      'A Debt Management Plan (DMP) is an informal agreement between you and your creditors to repay debts at an affordable rate. It is not legally binding and does not write off any debt, but creditors often freeze interest and charges. DMPs are suitable for those with non-priority debts they can afford to repay over time.',
    section: 'Debt Management & Credit',
    difficulty: 'basic' as const,
    topic: 'Formal Debt Solutions',
    category: 'Debt Management & Credit',
  },
  {
    id: 92,
    question: 'What is the maximum debt level for a Debt Relief Order (DRO)?',
    options: ['Under £20,000', 'Under £30,000', 'Under £40,000', 'Under £50,000'],
    correctAnswer: 1,
    explanation:
      'A DRO is available for debts under £30,000 if you have minimal assets (under £2,000) and little spare income (less than £75 per month after essential costs). The DRO freezes debts for 12 months, after which they are usually written off. It is a lower-cost alternative to bankruptcy for those with limited means.',
    section: 'Debt Management & Credit',
    difficulty: 'basic' as const,
    topic: 'Debt Relief Orders',
    category: 'Debt Management & Credit',
  },
  {
    id: 93,
    question: "What is the phone number for HMRC's Time to Pay service?",
    options: ['0300 200 3835', '0800 138 1111', '0808 808 4000', '0345 600 4040'],
    correctAnswer: 0,
    explanation:
      "HMRC's Time to Pay helpline is 0300 200 3835. This service allows you to set up a payment plan for tax debts if you cannot pay in full when due. It is important to contact HMRC before the payment deadline to avoid penalties and interest escalating.",
    section: 'Debt Management & Credit',
    difficulty: 'basic' as const,
    topic: 'HMRC Time to Pay',
    category: 'Debt Management & Credit',
  },
  {
    id: 94,
    question:
      'How long is the cooling-off period for credit agreements under the Consumer Credit Act 1974?',
    options: ['7 days', '14 days', '21 days', '28 days'],
    correctAnswer: 1,
    explanation:
      'The Consumer Credit Act 1974 provides a 14-day cooling-off period for most credit agreements, allowing you to cancel without penalty. This applies to agreements signed away from business premises or distance sales. The period starts from the day after you receive your credit agreement.',
    section: 'Debt Management & Credit',
    difficulty: 'basic' as const,
    topic: 'Consumer Credit Act',
    category: 'Debt Management & Credit',
  },
  {
    id: 95,
    question: 'What is the minimum purchase value covered by Section 75 credit card protection?',
    options: ['£50', '£100', '£150', '£200'],
    correctAnswer: 1,
    explanation:
      'Section 75 of the Consumer Credit Act provides joint liability protection for credit card purchases between £100 and £30,000. If a retailer or supplier fails to deliver or goes bust, the card provider is equally liable. This protection applies even if you only pay the deposit on your credit card.',
    section: 'Debt Management & Credit',
    difficulty: 'basic' as const,
    topic: 'Section 75 Protection',
    category: 'Debt Management & Credit',
  },
  {
    id: 96,
    question:
      'Under the Limitation Act 1980, after how many years can most debts become statute-barred?',
    options: ['3 years', '6 years', '9 years', '12 years'],
    correctAnswer: 1,
    explanation:
      'Most unsecured debts become statute-barred after 6 years under the Limitation Act 1980 in England and Wales (5 years in Scotland). This means creditors cannot take court action to recover the debt, though the debt still technically exists. The 6-year period restarts if you acknowledge the debt or make a payment.',
    section: 'Debt Management & Credit',
    difficulty: 'basic' as const,
    topic: 'Limitation Act',
    category: 'Debt Management & Credit',
  },
  {
    id: 97,
    question: 'What is the ideal credit utilisation ratio to maintain a good credit score?',
    options: ['Below 10%', 'Below 30%', 'Below 50%', 'Below 75%'],
    correctAnswer: 1,
    explanation:
      'Credit utilisation below 30% is generally recommended to maintain a strong credit score. This means if you have £10,000 total credit available, you should ideally keep balances below £3,000. Lower utilisation demonstrates you are not overly reliant on credit and manage it responsibly.',
    section: 'Debt Management & Credit',
    difficulty: 'intermediate' as const,
    topic: 'Credit Utilisation',
    category: 'Debt Management & Credit',
  },
  {
    id: 98,
    question: 'Why does being on the electoral roll improve your credit score?',
    options: [
      'It shows you can vote responsibly',
      'It verifies your identity and address',
      'It increases your available credit',
      'It reduces your existing debts',
    ],
    correctAnswer: 1,
    explanation:
      'Electoral roll registration helps lenders verify your identity and address, making you less of a fraud risk. Credit reference agencies use this information to confirm you are who you say you are and live where you claim. Not being on the roll can significantly reduce your credit score and limit borrowing options.',
    section: 'Debt Management & Credit',
    difficulty: 'intermediate' as const,
    topic: 'Electoral Roll',
    category: 'Debt Management & Credit',
  },
  {
    id: 99,
    question: 'What is the key difference between a hard and soft credit search?',
    options: [
      'Hard searches are free, soft searches have a fee',
      'Hard searches appear on your credit file and can affect your score, soft searches do not',
      'Hard searches are for mortgages only, soft searches are for credit cards',
      'Hard searches take longer to process than soft searches',
    ],
    correctAnswer: 1,
    explanation:
      'Hard searches (or hard inquiries) are visible to other lenders on your credit file and can temporarily lower your score, especially if multiple applications are made in a short period. Soft searches are used for quotations and eligibility checks and are only visible to you. Too many hard searches in quick succession suggest financial distress to lenders.',
    section: 'Debt Management & Credit',
    difficulty: 'intermediate' as const,
    topic: 'Credit Searches',
    category: 'Debt Management & Credit',
  },
  {
    id: 100,
    question:
      'When comparing van finance options, what is the main advantage of Hire Purchase (HP) over PCP?',
    options: [
      'Lower monthly payments',
      'You own the van at the end of the agreement',
      'No mileage restrictions',
      'Lower total interest charges',
    ],
    correctAnswer: 1,
    explanation:
      'With HP, you automatically own the van once all payments are made with no large balloon payment required. PCP has lower monthly payments but requires a significant final payment to own the vehicle. HP is often better for tradespeople who want to own their van outright and may have high mileage requirements.',
    section: 'Debt Management & Credit',
    difficulty: 'intermediate' as const,
    topic: 'Van Finance Comparison',
    category: 'Debt Management & Credit',
  },
  {
    id: 101,
    question: 'What regulator oversees Buy Now Pay Later (BNPL) providers in the UK?',
    options: [
      'Financial Conduct Authority (FCA)',
      'Prudential Regulation Authority (PRA)',
      'Competition and Markets Authority (CMA)',
      'BNPL is currently unregulated',
    ],
    correctAnswer: 0,
    explanation:
      'The FCA now regulates BNPL products following government action to bring them under consumer credit regulation. This provides greater protection including affordability checks, clear information, and access to the Financial Ombudsman if things go wrong. Previously, BNPL was largely unregulated, leading to consumer harm.',
    section: 'Debt Management & Credit',
    difficulty: 'intermediate' as const,
    topic: 'BNPL Regulation',
    category: 'Debt Management & Credit',
  },
  {
    id: 102,
    question: 'Which of these is NOT typically considered a priority debt?',
    options: [
      'Mortgage arrears',
      'Energy bill arrears',
      'Catalogue debt',
      'Magistrates court fines',
    ],
    correctAnswer: 2,
    explanation:
      'Catalogue debt is a non-priority debt as the consequences of non-payment are limited to damaged credit rating and potential court action for the money. Priority debts like mortgage, energy, and court fines have severe consequences including home repossession, utility disconnection, or imprisonment. Always pay priority debts first when funds are limited.',
    section: 'Debt Management & Credit',
    difficulty: 'intermediate' as const,
    topic: 'Priority vs Non-Priority Debts',
    category: 'Debt Management & Credit',
  },
  {
    id: 103,
    question: 'What is the main psychological advantage of the snowball debt repayment method?',
    options: [
      'It saves the most money in interest',
      'It provides quick wins by clearing small debts first',
      'It reduces your credit utilisation fastest',
      'It is the most mathematically efficient',
    ],
    correctAnswer: 1,
    explanation:
      'The snowball method targets smallest debts first regardless of interest rate, providing quick psychological wins that motivate continued repayment. While the avalanche method saves more in interest charges, many people find snowball more sustainable due to the momentum from early successes. Choose the method that keeps you motivated to stick to the plan.',
    section: 'Debt Management & Credit',
    difficulty: 'intermediate' as const,
    topic: 'Snowball Method',
    category: 'Debt Management & Credit',
  },
  {
    id: 104,
    question: 'What is an Individual Voluntary Arrangement (IVA)?',
    options: [
      'An informal payment plan with creditors',
      'A formal, legally binding agreement to repay a portion of debts over 5-6 years',
      'A type of bankruptcy for high earners',
      'A government scheme to write off debts under £10,000',
    ],
    correctAnswer: 1,
    explanation:
      'An IVA is a formal insolvency procedure where you agree to repay an affordable amount (typically over 5-6 years) and the remainder is written off. It requires 75% creditor approval and is legally binding. IVAs are an alternative to bankruptcy but still significantly impact your credit file for six years and restrict certain activities like being a company director.',
    section: 'Debt Management & Credit',
    difficulty: 'intermediate' as const,
    topic: 'Individual Voluntary Arrangements',
    category: 'Debt Management & Credit',
  },
  {
    id: 105,
    question: 'If you cannot pay your tax bill, what should you do before the payment deadline?',
    options: [
      'Wait for HMRC to contact you',
      'Contact Time to Pay (0300 200 3835) to arrange a payment plan',
      'Ignore the bill until you have the money',
      'Apply for a DRO',
    ],
    correctAnswer: 1,
    explanation:
      "Contact HMRC's Time to Pay service before the deadline to arrange an affordable payment plan. Being proactive can prevent penalties, interest escalation, and enforcement action. HMRC are often willing to negotiate if you engage early, but ignoring tax debts can lead to serious consequences including court action and bailiff visits.",
    section: 'Debt Management & Credit',
    difficulty: 'intermediate' as const,
    topic: 'Time to Pay Arrangements',
    category: 'Debt Management & Credit',
  },
  {
    id: 106,
    question: 'What is the maximum value for Section 75 credit card protection?',
    options: ['£10,000', '£20,000', '£30,000', 'No maximum limit'],
    correctAnswer: 2,
    explanation:
      'Section 75 protection applies to credit card purchases between £100 and £30,000. For purchases above £30,000, you may still have protection under chargeback schemes but not the statutory Section 75 protection. This makes Section 75 particularly valuable for expensive trade tools, van deposits, or training courses.',
    section: 'Debt Management & Credit',
    difficulty: 'intermediate' as const,
    topic: 'Section 75 Limits',
    category: 'Debt Management & Credit',
  },
  {
    id: 107,
    question: 'What are bailiffs NOT allowed to do on their first visit to your property?',
    options: [
      'Knock on your door',
      'Force entry to your home',
      'Ask to come inside',
      'Look through windows',
    ],
    correctAnswer: 1,
    explanation:
      'Bailiffs cannot force entry to your home on a first visit for most debts (except criminal fines or tax). They can only enter peacefully if you let them in or through an unlocked door. If they gain peaceful entry, they can return and force entry later. Never let bailiffs in unless you have taken debt advice.',
    section: 'Debt Management & Credit',
    difficulty: 'intermediate' as const,
    topic: 'Bailiff Powers',
    category: 'Debt Management & Credit',
  },
  {
    id: 108,
    question:
      'What is the maximum value of tools of the trade that are protected from bailiff seizure?',
    options: ['£750', '£1,000', '£1,350', '£2,000'],
    correctAnswer: 2,
    explanation:
      'Tools of the trade are protected up to £1,350 in total value from bailiff seizure. This protects essential equipment needed for your work as an electrician, such as test equipment, hand tools, and power tools. However, proving items are essential work tools rather than personal possessions requires documentation and may be challenged.',
    section: 'Debt Management & Credit',
    difficulty: 'intermediate' as const,
    topic: 'Tools of Trade Protection',
    category: 'Debt Management & Credit',
  },
  {
    id: 109,
    question: 'What is the main benefit of using the Financial Ombudsman Service?',
    options: [
      'They write off your debts',
      'They provide free, independent dispute resolution with financial firms',
      'They improve your credit score automatically',
      'They negotiate lower interest rates',
    ],
    correctAnswer: 1,
    explanation:
      'The Financial Ombudsman Service provides free, independent resolution of complaints against financial firms including banks, lenders, and insurers. They can award compensation up to £430,000 if they find in your favour. You must complain to the firm first and wait 8 weeks or receive a deadlock letter before escalating to the Ombudsman.',
    section: 'Debt Management & Credit',
    difficulty: 'intermediate' as const,
    topic: 'Financial Ombudsman',
    category: 'Debt Management & Credit',
  },
  {
    id: 110,
    question:
      'Under the Consumer Contracts Regulations 2013, how long do you have to cancel distance or off-premises sales?',
    options: ['7 days', '14 days', '21 days', '30 days'],
    correctAnswer: 1,
    explanation:
      'The Consumer Contracts Regulations 2013 provide a 14-day cooling-off period for distance sales (online, phone, mail order) and off-premises contracts (signed away from business premises). This is separate from credit agreement cancellation rights. You can cancel for any reason and must receive a refund within 14 days of returning goods.',
    section: 'Debt Management & Credit',
    difficulty: 'intermediate' as const,
    topic: 'Consumer Contracts Regulations',
    category: 'Debt Management & Credit',
  },
  {
    id: 111,
    question:
      'What happens to statute-barred debt if you make a payment or acknowledge it in writing?',
    options: [
      'It becomes completely written off',
      'The 6-year limitation period restarts from that date',
      'The creditor must take you to court within 30 days',
      'Nothing changes - it remains statute-barred',
    ],
    correctAnswer: 1,
    explanation:
      'Making a payment or acknowledging a statute-barred debt in writing restarts the 6-year limitation period from that date. This is why debt advice charities warn against making payments or responding to old debt collection letters without professional advice. Once restarted, creditors can pursue court action again.',
    section: 'Debt Management & Credit',
    difficulty: 'intermediate' as const,
    topic: 'Statute-Barred Debt',
    category: 'Debt Management & Credit',
  },
  {
    id: 112,
    question: 'When applying for a mortgage as a self-employed electrician, what is an SA302 form?',
    options: [
      'A self-assessment registration form',
      'A tax calculation from HMRC showing your annual income',
      'A form confirming you have public liability insurance',
      'A credit reference agency report',
    ],
    correctAnswer: 1,
    explanation:
      "An SA302 is HMRC's official tax calculation showing your self-assessment income for a specific tax year. Mortgage lenders typically require SA302s for the last 2-3 years alongside tax year overviews or accounts. You can download SA302s from your HMRC online account or request them by phone.",
    section: 'Debt Management & Credit',
    difficulty: 'intermediate' as const,
    topic: 'SA302 Forms',
    category: 'Debt Management & Credit',
  },
  {
    id: 113,
    question:
      'If you use tool finance to purchase £5,000 of diagnostic equipment, paying a £500 deposit on a credit card and financing the rest, what level of Section 75 protection do you have?',
    options: [
      'No protection as the financed amount exceeds the card payment',
      'Protection for the £500 deposit only',
      'Full Section 75 protection for the entire £5,000 purchase',
      'Protection only if the supplier goes bust within 6 months',
    ],
    correctAnswer: 2,
    explanation:
      'Section 75 provides joint liability for the entire transaction value (£100-£30,000), not just the amount paid on the credit card. Even though only the £500 deposit was paid by card, the full £5,000 purchase is protected. This makes credit cards valuable for deposits on expensive trade equipment financed separately.',
    section: 'Debt Management & Credit',
    difficulty: 'advanced' as const,
    topic: 'Section 75 Application',
    category: 'Debt Management & Credit',
  },
  {
    id: 114,
    question:
      'What is the strategic disadvantage of a DMP compared to an IVA for electricians with significant non-priority debts?',
    options: [
      'DMPs are more expensive to set up',
      'DMPs do not write off any debt and creditors can withdraw at any time',
      'DMPs appear worse on your credit file',
      'DMPs require court approval',
    ],
    correctAnswer: 1,
    explanation:
      'DMPs are informal agreements that do not write off debt or legally bind creditors, who can withdraw and pursue full payment at any time. IVAs are legally binding and write off remaining debt after completion (typically 5-6 years). However, DMPs are more flexible, have no setup fees with charities like StepChange, and may be appropriate for those who can repay in full over time.',
    section: 'Debt Management & Credit',
    difficulty: 'advanced' as const,
    topic: 'DMP vs IVA',
    category: 'Debt Management & Credit',
  },
  {
    id: 115,
    question:
      'You have £15,000 in non-priority debts, own £1,800 of tools, and have £60 monthly surplus after priority debts and essential living costs. Which formal debt solution are you most likely to qualify for?',
    options: [
      'Debt Relief Order (DRO)',
      'Individual Voluntary Arrangement (IVA)',
      'Bankruptcy',
      'None - debts are too low',
    ],
    correctAnswer: 0,
    explanation:
      'You likely qualify for a DRO: debts under £30,000, surplus income under £75/month, and assets under £2,000. Tools of trade up to £1,350 are exempt from the asset calculation. A DRO costs £90, freezes debts for 12 months, then writes them off. An IVA typically requires higher debts (£6,000+) and surplus income to make meaningful monthly payments.',
    section: 'Debt Management & Credit',
    difficulty: 'advanced' as const,
    topic: 'DRO Eligibility',
    category: 'Debt Management & Credit',
  },
  {
    id: 116,
    question:
      'How does a County Court Judgement (CCJ) affect your ability to work as a self-employed electrician compared to an IVA?',
    options: [
      'A CCJ prevents you registering as self-employed; an IVA does not',
      'Both have identical impacts on credit and work restrictions',
      'An IVA restricts company directorships; a CCJ does not',
      'A CCJ is removed from your credit file faster than an IVA',
    ],
    correctAnswer: 2,
    explanation:
      'An IVA restricts you from acting as a company director without court permission, which may affect electricians operating through limited companies. A CCJ does not impose this restriction. Both severely impact credit for 6 years, but CCJs can be removed early if paid in full within one month. Sole traders are unaffected by director restrictions under either.',
    section: 'Debt Management & Credit',
    difficulty: 'advanced' as const,
    topic: 'CCJ vs IVA Impact',
    category: 'Debt Management & Credit',
  },
  {
    id: 117,
    question:
      'Why might using 0% balance transfer cards to manage existing debt be risky for self-employed electricians with variable income?',
    options: [
      'Balance transfer cards are illegal for business debt',
      'Missing a payment typically cancels the 0% rate and damages credit during a critical period when income may fluctuate',
      'Balance transfers do not affect your credit score',
      'Self-employed workers are not eligible for balance transfer offers',
    ],
    correctAnswer: 1,
    explanation:
      'Missing a single payment on a 0% balance transfer card typically reverts the rate to the standard APR (often 20%+ ) and leaves a missed payment mark on your credit file for 6 years. For self-employed electricians with fluctuating income, this risk is higher during quiet periods. Additionally, poor credit from missed payments makes remortgaging or securing tool finance extremely difficult.',
    section: 'Debt Management & Credit',
    difficulty: 'advanced' as const,
    topic: 'Balance Transfer Risks',
    category: 'Debt Management & Credit',
  },
  {
    id: 118,
    question:
      'If HMRC pursues a self-employed electrician for unpaid tax through bailiffs, what is different about their powers compared to bailiffs collecting other debts?',
    options: [
      'HMRC bailiffs can force entry on a first visit',
      'HMRC bailiffs cannot seize any tools of trade',
      'HMRC bailiffs have no power to enter your home',
      'HMRC bailiffs must wait 12 months before visiting',
    ],
    correctAnswer: 0,
    explanation:
      "HMRC bailiffs (enforcement agents) collecting tax debts can force entry on a first visit without needing prior peaceful entry, unlike bailiffs collecting council tax, commercial rent arrears, or court fines for most other debts. This makes engaging with HMRC's Time to Pay service before enforcement action critical. Tools of trade protection (£1,350) still applies.",
    section: 'Debt Management & Credit',
    difficulty: 'advanced' as const,
    topic: 'HMRC Bailiff Powers',
    category: 'Debt Management & Credit',
  },
  {
    id: 119,
    question:
      'What is the impact of taking a payment holiday on van finance during a quiet trading period?',
    options: [
      'No impact - payment holidays are free and consequence-free',
      'Interest typically continues to accrue, extending the agreement and increasing total cost',
      'Your van is immediately repossessed',
      'Payment holidays automatically improve your credit score',
    ],
    correctAnswer: 1,
    explanation:
      'Payment holidays (deferrals) typically allow you to pause payments, but interest continues accruing on the outstanding balance. This extends the finance term and increases the total amount repaid. Some lenders offered consequences-free holidays during COVID-19, but standard commercial terms usually add deferred interest to the balance. Always check specific terms before accepting a payment holiday.',
    section: 'Debt Management & Credit',
    difficulty: 'advanced' as const,
    topic: 'Payment Holiday Consequences',
    category: 'Debt Management & Credit',
  },
  {
    id: 120,
    question:
      "An electrician has a PCP van agreement with £8,000 remaining and a final balloon payment of £6,000 due in 6 months. The van's current market value is £11,000. What is the most financially advantageous option?",
    options: [
      'Return the van to the finance company and walk away',
      'Pay the balloon payment and keep the van',
      'Sell the van privately, settle the finance, and pocket the £3,000 equity',
      'Refinance the balloon payment over 5 years',
    ],
    correctAnswer: 2,
    explanation:
      'The van has £3,000 positive equity (£11,000 value - £8,000 settlement). Selling privately, settling the finance (£8,000), and keeping the £3,000 profit is most advantageous. Returning the van wastes this equity. Paying the £6,000 balloon gives you a £11,000 asset for £6,000, which is good, but selling captures the equity as cash. Refinancing adds unnecessary interest. Always check settlement figures before making PCP end-of-term decisions.',
    section: 'Debt Management & Credit',
    difficulty: 'advanced' as const,
    topic: 'PCP Equity Strategy',
    category: 'Debt Management & Credit',
  },
  {
    // =====================================================
    // Category 4: Pensions & Retirement Planning (id 121-160)
    // 16 basic, 16 intermediate, 8 advanced
    // =====================================================
    id: 121,
    question: 'What is the full new State Pension amount per week for 2024/25?',
    options: ['£221.20', '£203.85', '£198.60', '£256.40'],
    correctAnswer: 0,
    explanation:
      'The full new State Pension for 2024/25 is £221.20 per week. This rate is protected by the triple lock, which increases the pension by the highest of earnings growth, inflation, or 2.5% each year. You need 35 qualifying years of National Insurance contributions to receive the full amount.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'basic' as const,
    topic: 'State Pension Basics',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 122,
    question:
      'How many qualifying years of National Insurance contributions do you need for the full State Pension?',
    options: ['30 years', '35 years', '40 years', '45 years'],
    correctAnswer: 1,
    explanation:
      'You need 35 qualifying years to receive the full State Pension of £221.20 per week. You need a minimum of 10 qualifying years to receive any State Pension at all. If you have between 10 and 35 years, you will receive a proportional amount.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'basic' as const,
    topic: 'State Pension Qualifying Years',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 123,
    question: 'What is the minimum number of qualifying years needed to receive any State Pension?',
    options: ['5 years', '10 years', '15 years', '20 years'],
    correctAnswer: 1,
    explanation:
      'You need at least 10 qualifying years of National Insurance contributions to receive any State Pension at all. With fewer than 10 years, you will not be entitled to any State Pension. Each year above 10 years increases your entitlement proportionally up to the maximum at 35 years.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'basic' as const,
    topic: 'State Pension Minimum',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 124,
    question: 'What is the current State Pension age in the UK?',
    options: ['65', '66', '67', '68'],
    correctAnswer: 1,
    explanation:
      'The State Pension age is currently 66 for both men and women. It is scheduled to rise to 67 between 2026 and 2028. A further increase to 68 is planned but is currently under review by the government.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'basic' as const,
    topic: 'State Pension Age',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 125,
    question: 'Where can you check your State Pension forecast online?',
    options: [
      'hmrc.gov.uk/pensions',
      'gov.uk/check-state-pension',
      'pensionwise.gov.uk',
      'moneyhelper.org.uk',
    ],
    correctAnswer: 1,
    explanation:
      'You can check your State Pension forecast at gov.uk/check-state-pension. This service shows you how much you could get, when you can get it, and how to increase it if you have gaps in your National Insurance record. It is important to check this regularly to plan your retirement.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'basic' as const,
    topic: 'State Pension Forecast',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 126,
    question:
      'What is the total minimum contribution rate for automatic enrolment workplace pensions?',
    options: ['5%', '6%', '7%', '8%'],
    correctAnswer: 3,
    explanation:
      'The total minimum contribution for automatic enrolment is 8% of qualifying earnings, split between at least 3% from the employer and 5% from the employee. This was introduced by the Pensions Act 2008 to help workers save for retirement. The employee contribution includes tax relief.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'basic' as const,
    topic: 'Auto-Enrolment Contributions',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 127,
    question: 'What is the minimum employer contribution for automatic enrolment pensions?',
    options: ['2%', '3%', '4%', '5%'],
    correctAnswer: 1,
    explanation:
      'Employers must contribute at least 3% of qualifying earnings under automatic enrolment rules. The employee contributes 5%, making a total minimum of 8%. Employers who fail to meet their auto-enrolment duties can face penalties from The Pensions Regulator.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'basic' as const,
    topic: 'Employer Pension Contributions',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 128,
    question: 'Which pension scheme is commonly used by JIB/ECA employers for electricians?',
    options: ['NEST', "The People's Pension", 'Scottish Widows', 'Aviva'],
    correctAnswer: 1,
    explanation:
      "The People's Pension is the scheme used by JIB/ECA employers for electricians under industry agreements. While NEST is a government-backed default scheme available to all employers, the electrical industry has chosen The People's Pension as its preferred provider. It offers low charges and industry-specific support.",
    section: 'Pensions & Retirement Planning',
    difficulty: 'basic' as const,
    topic: 'Industry Pension Schemes',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 129,
    question: 'What is NEST in the context of pensions?',
    options: [
      'A private pension advisory service',
      'A government-backed default pension scheme',
      'A type of SIPP for high earners',
      'A pension tracing database',
    ],
    correctAnswer: 1,
    explanation:
      'NEST (National Employment Savings Trust) is a government-backed workplace pension scheme set up to support automatic enrolment. It has an annual management charge (AMC) of 0.3% and is designed as a low-cost default option for employers. Any UK employer can use NEST for their auto-enrolment duties.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'basic' as const,
    topic: 'NEST Pension Scheme',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 130,
    question:
      'According to the PLSA Retirement Living Standards, what annual income is needed for a minimum retirement lifestyle?',
    options: ['£10,900', '£12,800', '£15,700', '£18,200'],
    correctAnswer: 1,
    explanation:
      'The PLSA (Pensions and Lifetime Savings Association) sets the minimum retirement income at £12,800 per year for a single person. This covers basic needs like food, housing, and bills, but little discretionary spending. A moderate lifestyle requires £23,300, and a comfortable one needs £37,300.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'basic' as const,
    topic: 'PLSA Retirement Standards',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 131,
    question: 'What annual income does the PLSA suggest for a comfortable retirement?',
    options: ['£29,100', '£33,600', '£37,300', '£42,500'],
    correctAnswer: 2,
    explanation:
      'The PLSA Retirement Living Standards suggest £37,300 per year for a comfortable retirement for a single person. This allows for regular holidays, home improvements, and leisure activities. For comparison, minimum is £12,800 and moderate is £23,300 annually.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'basic' as const,
    topic: 'Comfortable Retirement Income',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 132,
    question:
      'What percentage of tax-free cash can you take from your pension pot under pension freedoms?',
    options: ['20%', '25%', '30%', '33%'],
    correctAnswer: 1,
    explanation:
      'Under pension freedoms, you can take 25% of your pension pot as a tax-free lump sum from age 55 (rising to 57 from 2028). The remaining 75% is subject to income tax when withdrawn. This flexibility was introduced to give people more control over their retirement savings.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'basic' as const,
    topic: 'Pension Tax-Free Cash',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 133,
    question: 'At what age can you currently access your private pension under pension freedoms?',
    options: ['50', '55', '60', '65'],
    correctAnswer: 1,
    explanation:
      'You can currently access your private pension from age 55 under pension freedoms rules. This age is rising to 57 from 2028 to stay 10 years below State Pension age. When you access your pension, you can take 25% tax-free and have flexibility over how you take the rest.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'basic' as const,
    topic: 'Pension Access Age',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 134,
    question: 'What happens if you opt out of automatic enrolment within the first month?',
    options: [
      'You pay a penalty fee',
      'You get a full refund of contributions',
      'You lose employer contributions only',
      'You must wait 5 years to rejoin',
    ],
    correctAnswer: 1,
    explanation:
      'If you opt out within the first month of being automatically enrolled, you will receive a full refund of any contributions you have made. However, opting out means refusing free money from your employer and missing out on tax relief. After one month, you can cease membership but will not get a refund of contributions already made.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'basic' as const,
    topic: 'Opting Out of Pensions',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 135,
    question: 'Which act introduced automatic enrolment for workplace pensions?',
    options: ['Pensions Act 2004', 'Pensions Act 2008', 'Finance Act 2010', 'Pensions Act 2014'],
    correctAnswer: 1,
    explanation:
      'The Pensions Act 2008 introduced automatic enrolment, requiring all employers to enrol eligible workers into a workplace pension scheme. This was rolled out from 2012 onwards to address the retirement savings crisis. It has successfully increased pension participation, particularly among lower earners and younger workers.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'basic' as const,
    topic: 'Pensions Legislation',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 136,
    question: 'What is the main advantage of starting pension contributions early in your career?',
    options: [
      'Higher tax relief rates',
      'Compound growth over time',
      'Lower contribution requirements',
      'Guaranteed investment returns',
    ],
    correctAnswer: 1,
    explanation:
      'Starting early allows compound growth to work in your favour, where investment returns generate their own returns over decades. A 25-year-old contributing £100 per month could have significantly more at retirement than a 40-year-old contributing £200 per month. Time in the market is more powerful than timing the market.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'basic' as const,
    topic: 'Compound Growth',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 137,
    question: 'When is the State Pension age scheduled to increase to 67?',
    options: ['2024-2026', '2026-2028', '2028-2030', '2030-2032'],
    correctAnswer: 1,
    explanation:
      'The State Pension age will rise to 67 between 2026 and 2028 for both men and women. A further increase to 68 is planned but currently under review following public consultation. These increases are driven by rising life expectancy and the need to keep the State Pension affordable.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'intermediate' as const,
    topic: 'Future State Pension Age',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 138,
    question: 'What percentage of self-employed workers currently save into a pension?',
    options: ['16%', '28%', '34%', '42%'],
    correctAnswer: 0,
    explanation:
      'Only 16% of self-employed workers save into a pension, creating a significant pension gap compared to employed workers who benefit from automatic enrolment. Self-employed electricians must actively set up their own pension and make it a non-negotiable business cost. Without automatic enrolment, it is easy to deprioritise pension saving when cash flow is tight.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'intermediate' as const,
    topic: 'Self-Employed Pension Gap',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 139,
    question: 'How do self-employed electricians build National Insurance qualifying years?',
    options: [
      'Automatically through Self Assessment',
      'By paying Class 2 voluntary contributions',
      'Through quarterly tax returns',
      'By registering with HMRC annually',
    ],
    correctAnswer: 1,
    explanation:
      'Self-employed workers build qualifying years by paying Class 2 National Insurance contributions, which are voluntary if profits are below the Small Profits Threshold. Employed workers build qualifying years automatically through payroll. It is important to check your National Insurance record and pay voluntary contributions if you have gaps.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'intermediate' as const,
    topic: 'Self-Employed NI Contributions',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 140,
    question: 'What is a SIPP?',
    options: [
      'State Individual Pension Plan',
      'Self-Invested Personal Pension',
      'Savings and Investment Protection Plan',
      'Simplified Income Pension Product',
    ],
    correctAnswer: 1,
    explanation:
      'A SIPP (Self-Invested Personal Pension) is a type of personal pension that gives you control over where your money is invested. You can choose from a wide range of investments including stocks, bonds, and funds. SIPPs are suitable for self-employed electricians who want more control than a standard stakeholder pension offers.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'intermediate' as const,
    topic: 'SIPP Pensions',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 141,
    question:
      'If you pay £80 into a pension as a basic-rate taxpayer, how much is added through tax relief?',
    options: ['£16', '£20', '£24', '£32'],
    correctAnswer: 1,
    explanation:
      'Basic-rate tax relief is 20%, so if you pay £80, the government adds £20 to make it £100 in your pension. This is relief at source, where the pension provider claims the tax back from HMRC. Higher-rate taxpayers can claim additional relief through their tax return, making pensions even more tax-efficient.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'intermediate' as const,
    topic: 'Pension Tax Relief',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 142,
    question: 'What is the "halve your age" rule of thumb for pension contributions?',
    options: [
      'Contribute half your age as a percentage from age 20',
      'Contribute half your age as a percentage when you start',
      'Contribute half your weekly wage in pounds',
      'Save half your annual bonus into your pension',
    ],
    correctAnswer: 1,
    explanation:
      'The "halve your age" rule suggests you should contribute half your age as a percentage of your salary when you start saving. If you start at 30, contribute 15%; at 40, contribute 20%. This is a rough guide to catch up if you start later, though starting early at a lower rate is often better due to compound growth.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'intermediate' as const,
    topic: 'Pension Contribution Rules',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 143,
    question: 'What is the annual management charge (AMC) for NEST?',
    options: ['0.3%', '0.5%', '0.75%', '1.0%'],
    correctAnswer: 0,
    explanation:
      'NEST has an annual management charge of 0.3%, making it one of the lowest-cost pension schemes available. This low charge means more of your money stays invested and grows over time. NEST also has a 1.8% charge on contributions, but no exit fees or transfer charges.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'intermediate' as const,
    topic: 'Pension Charges',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 144,
    question: 'What is the annual pension allowance for 2024/25?',
    options: ['£40,000', '£50,000', '£60,000', '£80,000'],
    correctAnswer: 2,
    explanation:
      "The annual pension allowance is £60,000 for 2024/25, which is the maximum amount you can contribute to pensions in a tax year while receiving tax relief. This includes both your contributions and employer contributions. If you exceed this, you may face a tax charge, though there are carry-forward rules if you have not used previous years' allowances.",
    section: 'Pensions & Retirement Planning',
    difficulty: 'intermediate' as const,
    topic: 'Annual Pension Allowance',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 145,
    question: 'What does the "4% rule" refer to in retirement planning?',
    options: [
      'Withdraw 4% of your pension pot annually in retirement',
      'Save 4% of income minimum for retirement',
      'Expect 4% average investment returns',
      'Pay 4% in pension charges maximum',
    ],
    correctAnswer: 0,
    explanation:
      'The 4% rule suggests withdrawing 4% of your pension pot each year in retirement to make your savings last 30 years. If you have a £250,000 pot, this means £10,000 per year. This is a guideline based on historical investment returns and assumes your pot remains invested.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'intermediate' as const,
    topic: 'Retirement Withdrawal Strategy',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 146,
    question: 'What is a stakeholder pension?',
    options: [
      'A pension for company shareholders only',
      'A low-cost, flexible pension with capped charges',
      'A government employee pension scheme',
      'A pension that includes life insurance',
    ],
    correctAnswer: 1,
    explanation:
      'Stakeholder pensions are simpler, low-cost personal pensions with charges capped at 1.5% for the first 10 years and 1% thereafter. They have flexible contributions (minimum £20) and low transfer charges. They are suitable for self-employed electricians who want a straightforward pension without complex investment choices.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'intermediate' as const,
    topic: 'Stakeholder Pensions',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 147,
    question:
      'What is the recommended minimum monthly pension contribution for a self-employed electrician starting out?',
    options: ['£25', '£50', '£100', '£200'],
    correctAnswer: 1,
    explanation:
      'Starting at £50 per month is recommended as a realistic, achievable minimum that builds the savings habit. This should be treated as a non-negotiable business cost, just like van insurance or tool replacement. Even £50 per month from age 25 can grow significantly by retirement through compound growth and tax relief.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'intermediate' as const,
    topic: 'Self-Employed Contributions',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 148,
    question: 'What is the phone number for the Pension Tracing Service?',
    options: ['0800 731 0193', '0800 011 3797', '0345 600 0806', '0800 731 7898'],
    correctAnswer: 0,
    explanation:
      'The Pension Tracing Service can be reached on 0800 731 0193 to help you find lost pensions from previous employers. Many electricians have multiple small pension pots from different employers throughout their career. Tracing and consolidating these can simplify retirement planning and reduce charges.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'intermediate' as const,
    topic: 'Pension Tracing',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 149,
    question: 'What is the "triple lock" that protects the State Pension?',
    options: [
      'Three verification steps to claim your pension',
      'Increases by the highest of earnings, inflation, or 2.5%',
      'Three different State Pension rates available',
      'Protection against three types of fraud',
    ],
    correctAnswer: 1,
    explanation:
      'The triple lock guarantees the State Pension increases each year by whichever is highest: average earnings growth, inflation (CPI), or 2.5%. This protects the purchasing power of the State Pension and has been government policy since 2010. It is politically popular but expensive, making its long-term future uncertain.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'intermediate' as const,
    topic: 'State Pension Protection',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 150,
    question: 'What is pension drawdown?',
    options: [
      'Taking your entire pension as cash',
      'Drawing a regular income from your invested pot',
      'Transferring your pension to another provider',
      'Reducing contributions during hard times',
    ],
    correctAnswer: 1,
    explanation:
      'Pension drawdown allows you to take a flexible income from your pension pot while the rest remains invested. You can take 25% tax-free first, then draw taxable income as needed. This contrasts with buying an annuity (guaranteed income for life) and gives more flexibility but requires managing investment risk.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'intermediate' as const,
    topic: 'Pension Drawdown',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 151,
    question: 'What are "qualifying earnings" in automatic enrolment?',
    options: [
      'All earnings including overtime and bonuses',
      'Salary between £6,240 and £50,270 per year (2024/25)',
      'Basic salary only, excluding benefits',
      'All earnings above the personal allowance',
    ],
    correctAnswer: 1,
    explanation:
      'Qualifying earnings are the band of salary between £6,240 and £50,270 per year for 2024/25 on which automatic enrolment contributions are calculated. The minimum 8% contribution (3% employer, 5% employee) applies to this band only, not total earnings. This means very high earners need additional pension provision beyond auto-enrolment minimums.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'intermediate' as const,
    topic: 'Qualifying Earnings',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 152,
    question: 'What is the "three-pot approach" to retirement planning?',
    options: [
      'Splitting your pension between three providers',
      'State Pension + private pension + other savings',
      'Saving for three different retirement ages',
      'Contributing to three different pension types',
    ],
    correctAnswer: 1,
    explanation:
      'The three-pot approach means building retirement income from three sources: State Pension (foundation), private/workplace pension (main income), and other savings like ISAs (flexibility and emergency fund). This diversification reduces reliance on any single source and provides tax-efficient flexibility. For electricians, the State Pension alone will not provide a comfortable retirement.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'intermediate' as const,
    topic: 'Retirement Strategy',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 153,
    question: 'What is the main difference between equities and bonds in pension investments?',
    options: [
      'Equities are shares in companies; bonds are loans to governments or companies',
      'Equities are tax-free; bonds are taxable',
      'Equities are UK only; bonds are international',
      'Equities are short-term; bonds are long-term',
    ],
    correctAnswer: 0,
    explanation:
      'Equities (shares) represent ownership in companies and offer higher growth potential but more volatility, suitable for long-term pension saving. Bonds are loans to governments or companies offering lower but more stable returns, suitable as you approach retirement. Default pension funds typically shift from equities to bonds as you age (lifestyling) to reduce risk.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'advanced' as const,
    topic: 'Investment Types',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 154,
    question: 'Which act established the current pension tax relief framework?',
    options: ['Finance Act 2004', 'Pensions Act 2008', 'Finance Act 2010', 'Pensions Act 2014'],
    correctAnswer: 0,
    explanation:
      'The Finance Act 2004 established the current pension tax regime, introducing the annual allowance, lifetime allowance (since abolished), and pension freedoms framework. It simplified multiple previous pension regimes into a single tax-advantaged system. Understanding this framework helps self-employed electricians maximise tax relief on contributions.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'advanced' as const,
    topic: 'Pension Tax Framework',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 155,
    question: 'At what age will the minimum pension access age rise to 57?',
    options: ['2026', '2028', '2030', '2032'],
    correctAnswer: 1,
    explanation:
      'The normal minimum pension access age will rise from 55 to 57 in 2028, maintaining the 10-year gap below State Pension age. This means anyone planning early retirement should consider this when building their financial plan. Protected pension ages (for example, in certain public service schemes) may still allow access at 55.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'advanced' as const,
    topic: 'Future Pension Access',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 156,
    question: 'What is an annuity in pension terms?',
    options: [
      'A lump sum payment from your pension',
      'A guaranteed income for life bought with your pension pot',
      'A type of tax-free pension withdrawal',
      'An annual pension statement',
    ],
    correctAnswer: 1,
    explanation:
      'An annuity is an insurance product that converts your pension pot into a guaranteed income for life. Once purchased, you cannot change your mind, but you have certainty of income regardless of how long you live or investment performance. Annuity rates are currently low due to low interest rates and rising life expectancy, making drawdown more popular.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'advanced' as const,
    topic: 'Annuities',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 157,
    question:
      'Why might a self-employed electrician consider career transition planning as part of retirement strategy?',
    options: [
      'To qualify for a higher State Pension',
      'To move from physical work to less demanding roles like testing or training',
      'To access pension benefits earlier',
      'To reduce National Insurance contributions',
    ],
    correctAnswer: 1,
    explanation:
      'Physical electrical work becomes harder with age, so planning a transition to supervision, testing, inspection, training, or consultancy roles allows you to extend your working life on your own terms. This generates income for longer, delays pension drawdown, and keeps you professionally engaged. Many electricians successfully transition to teaching, mentoring, or specialist testing roles in their 50s and 60s.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'advanced' as const,
    topic: 'Career Transition',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 158,
    question: 'What is "lifestyling" in pension fund management?',
    options: [
      'Choosing investments that match your lifestyle',
      'Automatically shifting from equities to bonds as you near retirement',
      'Increasing contributions as your lifestyle improves',
      'Taking regular income to fund your lifestyle',
    ],
    correctAnswer: 1,
    explanation:
      'Lifestyling (or target-date funds) automatically shifts your pension investments from higher-risk equities to lower-risk bonds as you approach retirement. This protects your pot from market crashes just before you need to access it. Most default workplace pension funds use lifestyling, though you can usually opt out if you prefer to manage risk yourself.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'advanced' as const,
    topic: 'Investment Strategy',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 159,
    question: 'What is Pension Wise and who can use it?',
    options: [
      'A pension advisory service for under-30s',
      'Free, impartial guidance from MoneyHelper for over-50s',
      'A pension tracing service for lost pensions',
      'An online pension calculator tool',
    ],
    correctAnswer: 1,
    explanation:
      'Pension Wise is a free, impartial guidance service from MoneyHelper (backed by government) for anyone aged 50 or over with a defined contribution pension. It helps you understand your pension options before you access your pot. Since 2021, pension providers must offer you a Pension Wise appointment before you can access your pension for the first time.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'advanced' as const,
    topic: 'Pension Guidance Services',
    category: 'Pensions & Retirement Planning',
  },
  {
    id: 160,
    question:
      'If you are self-employed and hire an apprentice or employee, what are your auto-enrolment duties?',
    options: [
      'You are exempt as a small business',
      'You must assess eligibility and enrol them if they qualify, contributing at least 3%',
      'You only need to enrol them if they request it',
      'You must offer a pension but contributions are voluntary',
    ],
    correctAnswer: 1,
    explanation:
      'Once you become an employer, even as a self-employed electrician taking on an apprentice, you have auto-enrolment duties under the Pensions Act 2008. You must assess eligibility, enrol qualifying workers, contribute at least 3%, and keep records. The Pensions Regulator enforces compliance and can issue fines. This is a legal duty, not optional, and applies from your first employee.',
    section: 'Pensions & Retirement Planning',
    difficulty: 'advanced' as const,
    topic: 'Employer Pension Duties',
    category: 'Pensions & Retirement Planning',
  },
  {
    // =====================================================
    // Category 5: Financial Protection & Planning Ahead (id 161-200)
    // 16 basic, 16 intermediate, 8 advanced
    // =====================================================
    id: 161,
    question:
      'What is the MoneyHelper recommended emergency fund size for an employed electrician?',
    options: [
      '3-6 months of essential outgoings',
      '1-2 months of essential outgoings',
      '12 months of essential outgoings',
      '1 month of total income',
    ],
    correctAnswer: 0,
    explanation:
      'MoneyHelper recommends 3-6 months of essential outgoings for emergency funds. Employed electricians can typically aim for the lower end (3 months) as they have more income stability than self-employed workers.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'basic' as const,
    topic: 'Emergency Fund Basics',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 162,
    question:
      'Why should a self-employed electrician maintain a larger emergency fund than an employed one?',
    options: [
      'Because self-employed income is more variable and they have no sick pay or redundancy protection',
      'Because they earn more money overall',
      'Because HMRC requires it for tax purposes',
      'Because banks offer better interest rates to self-employed customers',
    ],
    correctAnswer: 0,
    explanation:
      'Self-employed electricians should aim for 6 months of essential outgoings rather than 3 months. This accounts for variable income, no sick pay, no redundancy protection, and potential gaps between contracts.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'basic' as const,
    topic: 'Emergency Fund Basics',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 163,
    question: 'Where should you keep your emergency fund for best practice?',
    options: [
      'In an easy access savings account separate from your current account',
      'In your main current account',
      'In a fixed-rate bond you cannot access',
      'Under the mattress in cash',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency funds should be kept in easy access savings accounts (such as Chase, Marcus, or Chip) separate from your current account. This prevents accidental spending while ensuring you can access funds quickly when genuinely needed.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'basic' as const,
    topic: 'Emergency Fund Location',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 164,
    question: 'What is a good initial emergency fund target when starting from zero?',
    options: ['£1,000', '£100', '£10,000', '£500'],
    correctAnswer: 0,
    explanation:
      'A £1,000 initial target makes emergency fund building feel achievable and provides meaningful protection against common unexpected expenses. Once reached, you can gradually build towards the full 3-6 months of essential outgoings.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'basic' as const,
    topic: 'Emergency Fund Building',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 165,
    question: 'Which scenario is a valid use of your emergency fund?',
    options: [
      'Your van breaks down and needs £800 of repairs to get back on the road',
      'A new games console is on sale for half price',
      'You want to book a holiday abroad',
      'Your mate is selling his tools cheaply',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency funds should only be used for expenses that are unexpected, urgent, and necessary. A van breakdown meets all three criteria as it directly impacts your ability to work and earn income.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'basic' as const,
    topic: 'Emergency Fund Usage',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 166,
    question: 'How many separate "pots" should a self-employed electrician maintain?',
    options: [
      'At least three: emergency fund, tax provision, and general savings',
      'One combined pot for everything',
      'Two: business and personal',
      'Five: one for each type of expense',
    ],
    correctAnswer: 0,
    explanation:
      'Self-employed electricians need at least three separate pots to avoid confusion and overspending. The emergency fund is for genuine emergencies, tax provision covers upcoming tax bills, and general savings are for planned purchases or goals.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'basic' as const,
    topic: 'Savings Pot Structure',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 167,
    question: 'What is the typical annual cost of public liability insurance for an electrician?',
    options: ['£50-150', '£500-1,000', '£10-20', '£1,000-2,000'],
    correctAnswer: 0,
    explanation:
      'Public liability insurance typically costs electricians £50-150 per year and provides £1-5 million of cover. This protects against claims for injury or property damage caused during your work.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'basic' as const,
    topic: 'Public Liability Insurance',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 168,
    question: 'What does professional indemnity insurance cover for electricians?',
    options: [
      'Claims arising from design work and certification advice',
      'Theft of tools from your van',
      'Damage to your own equipment',
      'Your income if you fall ill',
    ],
    correctAnswer: 0,
    explanation:
      'Professional indemnity insurance protects against claims arising from professional advice, design work, and certification errors. It is particularly important for electricians who provide design services or issue electrical certificates.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'basic' as const,
    topic: 'Professional Indemnity Insurance',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 169,
    question: 'Why should you keep an inventory with serial numbers for your tools and equipment?',
    options: [
      'It is required by insurance providers to validate claims for stolen or damaged tools',
      'HMRC requires it for tax returns',
      'It helps you remember what you own',
      'It is needed for warranty claims only',
    ],
    correctAnswer: 0,
    explanation:
      'Insurance providers require detailed inventories with serial numbers, photos, and receipts to validate claims for stolen or damaged tools. Without this documentation, claims may be reduced or rejected entirely.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'basic' as const,
    topic: 'Tools and Equipment Insurance',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 170,
    question:
      'What special classification must your van insurance have if you use it for electrical work?',
    options: [
      'Business use classification',
      'Personal use only',
      'Trade plate exemption',
      'Agricultural use',
    ],
    correctAnswer: 0,
    explanation:
      'Using your van for electrical work requires business use classification on your insurance policy. Social, domestic and pleasure (SD&P) policies do not cover commercial use and claims will be rejected if you are working.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'basic' as const,
    topic: 'Van Insurance',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 171,
    question: 'What percentage of your income does income protection insurance typically replace?',
    options: ['50-70%', '100%', '20-30%', '90-100%'],
    correctAnswer: 0,
    explanation:
      'Income protection insurance typically replaces 50-70% of your income if you cannot work due to illness or injury. This is particularly critical for self-employed electricians who have no sick pay or employer support.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'basic' as const,
    topic: 'Income Protection Insurance',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 172,
    question: 'When is life insurance most essential for an electrician?',
    options: [
      'When they have a mortgage or dependants who rely on their income',
      'Only when they reach age 60',
      'Only if they are self-employed',
      'When they earn over £50,000 per year',
    ],
    correctAnswer: 0,
    explanation:
      'Life insurance is essential when you have a mortgage or dependants (partner, children) who rely on your income. It ensures they are financially protected if you die unexpectedly.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'basic' as const,
    topic: 'Life Insurance',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 173,
    question: 'What is the total annual ISA allowance for 2024/25?',
    options: ['£20,000', '£10,000', '£50,000', '£15,000'],
    correctAnswer: 0,
    explanation:
      'The ISA allowance for 2024/25 is £20,000 across all ISA types (Cash ISA, Stocks & Shares ISA, Lifetime ISA, and Innovative Finance ISA). Any interest or gains within ISAs are completely tax-free.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'basic' as const,
    topic: 'ISA Allowances',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 174,
    question: 'What age range can you open a Lifetime ISA?',
    options: ['18-39', '18-50', '21-39', '16-39'],
    correctAnswer: 0,
    explanation:
      'You can open a Lifetime ISA between ages 18-39 (though you can continue contributing until age 50). The 25% government bonus makes it attractive for first-time home buyers or long-term retirement savings.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'basic' as const,
    topic: 'Lifetime ISA',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 175,
    question: 'What is the Capital Gains Tax annual exempt amount for 2024/25?',
    options: ['£3,000', '£12,570', '£6,000', '£20,000'],
    correctAnswer: 0,
    explanation:
      'The Capital Gains Tax allowance for 2024/25 is £3,000 (reduced from £6,000 in 2023/24). This means you can make £3,000 of gains on investments outside ISAs before paying any tax.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'basic' as const,
    topic: 'Capital Gains Tax',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 176,
    question: 'What does SMART stand for when setting financial goals?',
    options: [
      'Specific, Measurable, Achievable, Relevant, Time-bound',
      'Simple, Manageable, Accurate, Realistic, Timely',
      'Savings, Money, Assets, Returns, Tax',
      'Safe, Moderate, Ambitious, Risky, Total',
    ],
    correctAnswer: 0,
    explanation:
      'SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. For example, "Save £5,000 in a Lifetime ISA for a house deposit by December 2026" is a SMART goal.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'basic' as const,
    topic: 'Financial Goal Setting',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 177,
    question:
      'A self-employed electrician earning £40,000/year has £2,500 in essential monthly outgoings. What should their full emergency fund target be?',
    options: [
      '£15,000 (6 months of essential outgoings)',
      '£20,000 (6 months of gross income)',
      '£7,500 (3 months of essential outgoings)',
      '£10,000 (fixed amount recommended)',
    ],
    correctAnswer: 0,
    explanation:
      'Self-employed electricians should aim for 6 months of essential outgoings, not gross income. With £2,500/month in essential costs, the target is £15,000 (6 × £2,500), providing a realistic buffer during income gaps or illness.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'intermediate' as const,
    topic: 'Emergency Fund Calculation',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 178,
    question:
      'What is the recommended public liability insurance cover level for electricians working on larger commercial projects?',
    options: ['£5 million', '£1 million', '£500,000', '£10 million'],
    correctAnswer: 0,
    explanation:
      'While £1-2 million is sufficient for domestic work, electricians working on commercial or public sector projects often need £5 million public liability cover as specified in contract requirements. The cost difference is usually minimal.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'intermediate' as const,
    topic: 'Public Liability Insurance',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 179,
    question:
      'Why might van insurance with "tools-in-van" cover be insufficient for a fully equipped electrician?',
    options: [
      'Tools-in-van cover often has low limits (£500-2,000) which may not cover the full value of specialist test equipment',
      'It only covers hand tools, not power tools',
      'It is only valid during working hours',
      'It does not cover theft, only accidental damage',
    ],
    correctAnswer: 0,
    explanation:
      'Standard tools-in-van cover typically has limits of £500-2,000, which may not cover multifunction testers, thermal imaging cameras, and full tool kits worth £5,000+. Separate tools and equipment insurance may be necessary for full protection.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'intermediate' as const,
    topic: 'Van and Tools Insurance',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 180,
    question:
      'What is a key difference between income protection insurance and critical illness cover?',
    options: [
      'Income protection pays regular monthly income for ongoing inability to work; critical illness pays a lump sum for specific diagnosed conditions',
      'They are the same product with different names',
      'Income protection is only for employed people; critical illness is only for self-employed',
      'Critical illness is cheaper and provides better coverage',
    ],
    correctAnswer: 0,
    explanation:
      'Income protection provides monthly payments (50-70% of income) if you cannot work due to illness or injury, continuing until you recover or retire. Critical illness pays a one-off lump sum only if you are diagnosed with a specific serious condition.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'intermediate' as const,
    topic: 'Income and Critical Illness Insurance',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 181,
    question:
      'An electrician contributes £4,000 to a Lifetime ISA in 2024/25. What is the total value with the government bonus?',
    options: ['£5,000', '£4,000', '£4,800', '£6,000'],
    correctAnswer: 0,
    explanation:
      'The Lifetime ISA provides a 25% government bonus on contributions up to £4,000 per year. A £4,000 contribution receives a £1,000 bonus (25% of £4,000), giving a total of £5,000.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'intermediate' as const,
    topic: 'Lifetime ISA Calculations',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 182,
    question: 'Who is eligible for a Help to Save account?',
    options: [
      'People receiving Universal Credit with minimum earnings, or Working Tax Credit',
      'Anyone earning under £50,000 per year',
      'Self-employed people only',
      'First-time home buyers under age 40',
    ],
    correctAnswer: 0,
    explanation:
      'Help to Save is available to people receiving Universal Credit with minimum earnings requirements, or Working Tax Credit. It offers a 50% bonus on the highest balance saved over four years, making it extremely valuable for eligible tradespeople.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'intermediate' as const,
    topic: 'Help to Save',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 183,
    question: 'Why are Stocks & Shares ISAs generally unsuitable for emergency funds?',
    options: [
      'Investment values fluctuate and you may need to sell at a loss in an emergency; they are better for 5+ year goals',
      'They have withdrawal penalties',
      'You can only access the money once per year',
      'They do not accept contributions under £10,000',
    ],
    correctAnswer: 0,
    explanation:
      'Stocks & Shares ISAs invest in markets that fluctuate daily. If you need emergency funds when the market is down, you may be forced to sell at a loss. They are appropriate for 5+ year savings goals, not emergency funds which need stability and instant access.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'intermediate' as const,
    topic: 'Investment Timeframes',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 184,
    question: 'What is the maximum annual contribution to a Lifetime ISA?',
    options: ['£4,000', '£20,000', '£2,000', '£10,000'],
    correctAnswer: 0,
    explanation:
      'You can contribute a maximum of £4,000 per year to a Lifetime ISA, which counts towards your overall £20,000 ISA allowance. The government adds a 25% bonus (up to £1,000/year) on Lifetime ISA contributions.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'intermediate' as const,
    topic: 'Lifetime ISA Limits',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 185,
    question: 'What is the recommended minimum investment timeframe for a Stocks & Shares ISA?',
    options: ['5+ years', '1 year', '6 months', '10+ years only'],
    correctAnswer: 0,
    explanation:
      'Stocks & Shares ISAs should have a minimum 5-year investment timeframe to ride out market volatility. This makes them suitable for medium to long-term goals like saving for a business expansion or supplementing pension savings.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'intermediate' as const,
    topic: 'Investment Timeframes',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 186,
    question:
      'In what order should an electrician prioritise their savings according to the tax-efficient hierarchy?',
    options: [
      'Employer pension match → emergency fund → ISA → additional pension contributions',
      'Emergency fund → ISA → pension → investments',
      'Pay off all debt → pension → emergency fund → ISA',
      'ISA → pension → emergency fund → general savings',
    ],
    correctAnswer: 0,
    explanation:
      'The tax-efficient hierarchy prioritises employer pension match first (free money), then emergency fund (essential protection), then ISA (tax-free growth), then additional pension (tax relief but locked until 55-57). This maximises benefits while maintaining financial security.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'intermediate' as const,
    topic: 'Savings Priority Hierarchy',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 187,
    question:
      'What is a realistic short-term financial goal (0-2 years) for a newly qualified electrician?',
    options: [
      'Build a £1,000 emergency fund and open a business bank account',
      'Save a £30,000 house deposit',
      'Build a £100,000 pension pot',
      'Pay off a 25-year mortgage',
    ],
    correctAnswer: 0,
    explanation:
      'Short-term goals (0-2 years) should be achievable and focus on financial foundations. Building a £1,000 emergency fund and separating business/personal finances are realistic first steps for a newly qualified electrician.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'intermediate' as const,
    topic: 'Short-Term Financial Goals',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 188,
    question:
      'Which of these is a realistic medium-term financial goal (2-10 years) for an electrician?',
    options: [
      'Save a £20,000 house deposit using a Lifetime ISA',
      'Retire at age 50',
      'Buy a new van next month',
      'Complete an 18th Edition course next week',
    ],
    correctAnswer: 0,
    explanation:
      'Medium-term goals (2-10 years) include house deposits, pension building, and major qualifications. A £20,000 deposit saved via Lifetime ISA (earning 25% bonus) over 5-7 years is a realistic medium-term goal for many electricians.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'intermediate' as const,
    topic: 'Medium-Term Financial Goals',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 189,
    question: 'What is a long-term financial goal (10+ years) for an electrician in their 30s?',
    options: [
      'Build a pension pot sufficient to retire comfortably at state pension age',
      'Save £5,000 for a holiday',
      "Pay for next year's van insurance",
      'Complete an EV charging course',
    ],
    correctAnswer: 0,
    explanation:
      'Long-term goals (10+ years) include retirement planning, mortgage payoff, and career transitions. Building a pension over 30+ years allows compound growth to work effectively and provides retirement security.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'intermediate' as const,
    topic: 'Long-Term Financial Goals',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 190,
    question: 'Why should electricians conduct an annual "financial MOT"?',
    options: [
      'To review insurance cover, check progress towards goals, and adjust savings as income or circumstances change',
      'Because HMRC requires it for tax returns',
      'To apply for new credit cards',
      'To renegotiate supplier contracts',
    ],
    correctAnswer: 0,
    explanation:
      "An annual financial MOT reviews insurance adequacy, goal progress, pension contributions, and savings strategies. As an electrician's income, family situation, or business changes, financial plans should be adjusted to remain appropriate and effective.",
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'intermediate' as const,
    topic: 'Annual Financial Review',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 191,
    question: 'What benefit do Premium Bonds offer to higher-rate taxpayers?',
    options: [
      'Prize winnings are completely tax-free, unlike savings interest which is taxable above the Personal Savings Allowance',
      'They guarantee a 5% annual return',
      'They offer better odds than ISAs',
      'They count towards pension contributions',
    ],
    correctAnswer: 0,
    explanation:
      'Premium Bond prizes are tax-free, making them attractive to higher-rate taxpayers who only have a £500 Personal Savings Allowance (vs £1,000 for basic-rate). While returns are variable and not guaranteed, tax-free prizes can be competitive for those with large savings.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'intermediate' as const,
    topic: 'Premium Bonds',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 192,
    question:
      'An electrician has £30,000 saved. They have maximised their employer pension match and have a 6-month emergency fund. What is the most tax-efficient next step?',
    options: [
      'Use £20,000 ISA allowance (£4,000 Lifetime ISA + £16,000 Stocks & Shares ISA) before investing in taxable accounts',
      'Put all £30,000 in a standard savings account',
      'Invest everything in cryptocurrency',
      'Make additional pension contributions with all £30,000',
    ],
    correctAnswer: 0,
    explanation:
      'After securing employer pension match and emergency fund, the ISA allowance provides tax-free growth and should be maximised before using taxable accounts. The Lifetime ISA provides 25% bonus (if eligible), and remaining allowance can go into Stocks & Shares ISA for long-term growth.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'intermediate' as const,
    topic: 'Tax-Efficient Savings Strategy',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 193,
    question:
      'A self-employed electrician has a £12,000 emergency fund and £8,000 set aside for tax. They receive an unexpected £15,000 inheritance. What is the most financially optimal strategy?',
    options: [
      'Maximise £4,000 Lifetime ISA (if under 40 and saving for first home), contribute £10,000 to pension (gaining higher-rate tax relief), keep £1,000 accessible',
      'Add the entire £15,000 to emergency fund',
      'Pay off their £15,000 van loan at 2.9% APR',
      'Invest all £15,000 in individual stocks outside an ISA',
    ],
    correctAnswer: 0,
    explanation:
      'With emergency fund and tax provision already secure, the optimal strategy combines multiple tax advantages: Lifetime ISA (25% bonus), pension (40% tax relief if higher-rate taxpayer), and maintaining some accessible funds. Low-rate debt (2.9%) is less urgent than capturing tax benefits.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'advanced' as const,
    topic: 'Advanced Savings Optimisation',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 194,
    question:
      'An electrician earns £55,000 and wants to avoid the higher-rate tax threshold (£50,270). What pension contribution (gross) would bring them back into basic rate while maximising tax relief?',
    options: [
      '£4,730 gross contribution (brings adjusted income to £50,270)',
      '£10,000 gross contribution',
      '£5,000 net contribution',
      '£1,000 gross contribution',
    ],
    correctAnswer: 0,
    explanation:
      'A £4,730 gross pension contribution reduces adjusted net income from £55,000 to £50,270, eliminating higher-rate tax liability. The electrician gains 40% tax relief on the contribution (£1,892) and avoids 40% tax on the £4,730 excess income, providing significant tax efficiency.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'advanced' as const,
    topic: 'Tax Threshold Management',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 195,
    question:
      'What is the withdrawal penalty for accessing Lifetime ISA funds before age 60 for non-qualifying purposes?',
    options: [
      '25% penalty on the total withdrawal (losing bonus plus some original capital)',
      '20% penalty on gains only',
      '25% penalty on the bonus only',
      '10% flat fee',
    ],
    correctAnswer: 0,
    explanation:
      'The Lifetime ISA charges a 25% penalty on the total withdrawal amount for non-qualifying withdrawals (not first home or age 60+). This means you lose the 25% bonus plus some original capital (e.g., withdraw £5,000, receive £3,750), making early withdrawal very costly.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'advanced' as const,
    topic: 'Lifetime ISA Penalties',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 196,
    question:
      'An electrician has £20,000 in a Stocks & Shares ISA and sells investments making a £5,000 gain. How much Capital Gains Tax do they owe?',
    options: [
      'None - gains within ISAs are completely tax-free regardless of amount',
      '£400 (20% of gain above £3,000 allowance)',
      '£500 (10% of total gain)',
      '£1,000 (20% of total gain)',
    ],
    correctAnswer: 0,
    explanation:
      'All gains within ISAs are completely tax-free, regardless of the amount. The £3,000 Capital Gains Tax allowance only applies to gains on investments held outside ISAs, making ISAs extremely valuable for long-term investors.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'advanced' as const,
    topic: 'ISA Tax Benefits',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 197,
    question:
      'A 35-year-old electrician opens a Lifetime ISA and contributes the maximum each year. What is the total government bonus they could receive by age 50?',
    options: [
      '£15,000 (15 years × £1,000 annual bonus)',
      '£16,000 (16 years × £1,000 annual bonus)',
      '£32,000 (compound growth on bonuses)',
      '£10,000 (10 years × £1,000 annual bonus)',
    ],
    correctAnswer: 0,
    explanation:
      'You can open a Lifetime ISA from 18-39 but contribute until age 50. A 35-year-old has 15 years of contributions (age 35-49), earning £1,000 bonus per year on maximum £4,000 contributions, totalling £15,000 in bonuses plus any investment growth.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'advanced' as const,
    topic: 'Lifetime ISA Long-Term Planning',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 198,
    question:
      'When might professional indemnity insurance be more critical than public liability for an electrician?',
    options: [
      'When designing electrical systems for new builds or providing certification for building control where errors could cause financial loss to clients',
      'When working at heights on commercial premises',
      'When employing subcontractors',
      'When carrying expensive test equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Professional indemnity covers financial losses from professional advice and design errors, becoming critical when providing design services or certification. If your design miscalculation causes a client financial loss (e.g., undersized system, building control rejection), professional indemnity protects you where public liability would not.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'advanced' as const,
    topic: 'Insurance Strategy',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 199,
    question:
      'An electrician earning £60,000 wants to avoid the £100,000 income threshold where personal allowance starts tapering. What combined strategy addresses both higher-rate tax and potential future allowance taper?',
    options: [
      'Make substantial pension contributions now (gaining 40% relief) while building tax-efficient ISA savings to provide flexible retirement income below allowance taper threshold',
      'Stop earning money above £50,270',
      'Move all savings to Premium Bonds',
      'Invest only in property to avoid income reporting',
    ],
    correctAnswer: 0,
    explanation:
      'Current pension contributions gain 40% tax relief and reduce adjusted income. Building ISA savings provides tax-free income in retirement that does not count towards the £100,000 threshold where personal allowance tapers (losing £1 allowance per £2 over threshold). This dual strategy maximises current relief and future flexibility.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'advanced' as const,
    topic: 'Advanced Tax Planning',
    category: 'Financial Protection & Planning Ahead',
  },
  {
    id: 200,
    question:
      'A self-employed electrician has income protection insurance with a 13-week deferred period. They break their arm and cannot work for 10 weeks. What will they receive?',
    options: [
      'Nothing - they returned to work before the 13-week deferred period ended',
      'Full 10 weeks of payments at 50-70% income',
      'Partial payment for 10 weeks',
      'A lump sum payment',
    ],
    correctAnswer: 0,
    explanation:
      'Income protection policies only pay after the deferred period (waiting period) ends. With a 13-week deferred period, you must be unable to work for 13 full weeks before payments start. Shorter deferred periods (4-8 weeks) cost more but provide earlier protection, which is critical for self-employed electricians with no sick pay.',
    section: 'Financial Protection & Planning Ahead',
    difficulty: 'advanced' as const,
    topic: 'Income Protection Policy Details',
    category: 'Financial Protection & Planning Ahead',
  },
];

export const getRandomPFExamQuestions = (count: number): StandardMockQuestion[] => {
  return getRandomQuestionsBalanced(pfQuestionBank, count, pfCategories);
};
