#!/usr/bin/env node
/**
 * gen-electrical-business-guides.mjs — Electrical business owner / employer
 * content batch. Audience: self-employed electricians ready to scale into a
 * business, small electrical contractors, employers hiring apprentices,
 * directors of established firms.
 *
 * CTA: Elec-Mate Business AI / Employer tier.
 */

import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SEO_DIR = join(ROOT, 'src/pages/seo');
const GEN_DIR = join(ROOT, 'src/pages/seo/generated');
const FORCE = process.argv.includes('--force');

const GUIDES = [
  {
    slug: 'starting-an-electrical-business-uk',
    title: 'Starting an Electrical Business in the UK',
    audience: 'qualified electricians ready to go self-employed or set up a limited company',
    summary: 'A practical step-by-step guide to starting your own UK electrical business in 2026. Covers sole trader vs limited company, registering with HMRC, choosing a competent person scheme, insurance, first-jobs funding, and the realistic 12-month timeline from registration to break-even.',
    keyPoints: [
      'Choose a structure first: sole trader is simpler but limited liability protects your home and savings — most electricians limit company within 6-12 months once revenue exceeds £30-40k',
      'Register with HMRC (sole trader) or Companies House (limited) before invoicing your first job',
      'Get NICEIC / NAPIT / ELECSA / Stroma scheme membership in place — without it you cannot legally self-certify Part P work',
      'Public liability + professional indemnity + tools-in-van insurance is a hard floor — typical cost £500-1,200/year for a single-person operation',
      'Pricing is the single biggest determinant of survival — use fair-margin pricing not race-to-the-bottom',
      'Most new electrical businesses break even in months 4-8. The fail mode is under-pricing combined with under-investing in cert kit and insurance',
    ],
    sections: [
      { id: 'structure', heading: 'Sole Trader vs Limited Company', body: 'Sole trader is faster to set up (free, HMRC self-assessment registration) but you are personally liable for every debt and claim. Limited company gives you liability protection, separates your personal finances, and is more tax-efficient above £30-40k profit — but it costs ~£200-400/year in accountancy. Most electricians start sole trader for year one then limit company when revenue justifies it.' },
      { id: 'register', heading: 'Registration: HMRC + Companies House + CIS', body: 'Register as self-employed with HMRC within 3 months of starting trading. If limiting a company, register with Companies House (£12 fee online). Apply for CIS (Construction Industry Scheme) registration before doing any sub-contract work — without it your contractors deduct 30% at source instead of 20%. Get a business bank account immediately — personal accounts mix transactions and complicate the tax return.' },
      { id: 'scheme', heading: 'Competent Person Scheme: NICEIC / NAPIT / ELECSA / Stroma', body: 'Scheme membership is the legal route to self-certify notifiable Part P work. The four main schemes (NICEIC, NAPIT, ELECSA, Stroma) are equivalent in industry recognition — pick on cost (~£500/year), local assessor availability, and which scheme your insurer recommends. Initial assessment requires a sample of certified work plus a desk audit of your QMS — give yourself 6-12 weeks lead time.' },
      { id: 'insurance', heading: 'Insurance: PL + PI + Tools', body: 'Three policies are essentially mandatory: Public Liability (£2-5m, ~£250-450/year), Professional Indemnity (£250k-1m, ~£200-400/year), Tools-in-Van (replacement cost, ~£100-300/year). Add Employers\\u2019 Liability (£5m statutory minimum) if you ever hire anyone, even an apprentice. Get a quote from a broker that specialises in electrical contractors — generic tradesman policies often exclude scheme membership.' },
      { id: 'first-jobs', heading: 'Getting Your First Jobs', body: 'The first six months are usually a mix of: friends-and-family work (don\\u2019t under-price these), local-area marketing (Google Business Profile, Facebook), trade contacts (sub to a busier electrician), and platform leads (Checkatrade, Bark, MyBuilder — but watch their fees eat margin). Build a personal-brand site even before you have many reviews — homeowners increasingly search for electricians on Google first.' },
      { id: 'pricing', heading: 'Pricing: Fair-Margin Not Race-to-the-Bottom', body: 'The single biggest survival factor. Charge £55-80/hour or fixed-price by job type, not whatever the customer wants. A typical 3-bed EICR fair-margin price is £270-360 (regional variation applies). A consumer unit replacement is £450-650. Quote in writing, itemise every line, exclude variations, and never absorb scope creep. Cheap quotes are how electrical businesses die — see our \\"How to Price X as an Electrician\\" guides for every common job.' },
    ],
  },
  {
    slug: 'how-to-hire-an-electrical-apprentice',
    title: 'How to Hire an Electrical Apprentice in the UK',
    audience: 'small electrical contractors and business owners considering taking on an apprentice',
    summary: 'A practical 2026 guide for UK electrical contractors hiring their first (or next) apprentice. Covers Apprenticeship Levy funding, employer obligations, training provider selection, day-one onboarding, and how to keep the apprentice through to AM2.',
    keyPoints: [
      'The Apprenticeship Levy applies to employers with pay bills above £3m — most small electrical contractors pay nothing but still access government funding for 95-100% of training costs',
      'You need a training provider partnership in place before you advertise the vacancy — most electricians use local colleges',
      'Minimum apprentice wage in 2026 is the Apprentice National Minimum Wage (typically £6.40/hour for under-19s or 1st-year over-19s); JIB rates apply if you\\u2019re a JIB member',
      'You commit to 20% off-the-job training as a legal requirement — this is non-negotiable and audited',
      'Day-one onboarding: PPE, tools, mentoring assignment, OJT logbook, college enrolment confirmed, ECS card application',
      'Retention through AM2 is the real challenge — many apprentices leave at year 2-3 if not mentored properly',
    ],
    sections: [
      { id: 'funding', heading: 'Apprenticeship Funding in 2026', body: 'If your annual UK pay bill is under £3m (true for most small electrical contractors), you pay only 5% of the apprentice\\u2019s training costs (~£150-450 over 3-4 years). The Government covers the other 95% via the funding band. If you have under 50 employees and hire an apprentice aged 16-21, the Government covers 100%. The Levy itself only applies to employers paying £3m+ in salaries — outside that, the funding is essentially free training for the apprentice.' },
      { id: 'training-provider', heading: 'Choosing a Training Provider', body: 'You can\\u2019t just hire an apprentice — they must be enrolled with an approved training provider (typically a local college). Pick the provider based on: distance from your office (apprentice has to attend), reputation (ask other local electricians), pass rate on the AM2, and which qualification they deliver (5357 Apprenticeship Standard is the default in 2026). Approach the provider FIRST, then advertise the vacancy.' },
      { id: 'advertise-recruit', heading: 'Advertising the Vacancy and Recruiting', body: 'Post the vacancy on the official "Find an apprenticeship" service (gov.uk). Local college job boards. Indeed, Facebook local groups. Look for: Maths and English at GCSE grade 4+ (a requirement of the standard), interest in electrical work demonstrated by personal projects or work experience, willingness to commit 3-4 years. Interview in pairs (you + your senior electrician). Trial half-day on site before final offer.' },
      { id: 'onboarding', heading: 'Day-One Onboarding', body: 'PPE supplied: safety boots, hi-vis, safety glasses, ear defenders, work gloves. Starter tool kit (insulated screwdrivers, side cutters, multi-meter — apprentices typically supply their own larger tools by year 2). Mentor assignment — a senior electrician responsible for the apprentice\\u2019s development. OJT logbook (paper or app — Elec-Mate auto-logs). College enrolment confirmation in writing. ECS card application (CSCS Trainee Electrical Operative).' },
      { id: 'twenty-percent-otj', heading: '20% Off-the-Job Training', body: 'A legal requirement of the Apprenticeship Standard. The apprentice must spend 20% of their working hours on off-the-job training — equivalent to one day per week. This includes college time, supervised on-site learning of new skills, attending CPD events, reading technical material, simulation work. Track every hour in the apprentice\\u2019s logbook — your contract with the training provider includes audits.' },
      { id: 'retention', heading: 'Retention to AM2', body: 'Apprentices leave for three reasons: bad mentorship (they\\u2019re left on dead-end jobs), boredom (they\\u2019re not progressing fast enough), or poor pay (a non-apprentice rate would pay more elsewhere). Mitigate by: regular structured progression conversations, rotating them through different job types, considering above-minimum-wage rates from year 2, paying for additional courses where possible. Most apprentices who reach the AM2 with strong support pass first time.' },
    ],
  },
  {
    slug: 'niceic-vs-napit-registration',
    title: 'NICEIC vs NAPIT — Which Competent Person Scheme?',
    audience: 'electricians applying for their first scheme membership or considering switching',
    summary: 'A detailed 2026 comparison of NICEIC and NAPIT, the two largest competent person schemes for UK electricians. Both let you self-certify Part P work and are equivalent in industry recognition — but cost, assessor availability, and contractor support differ.',
    keyPoints: [
      'NICEIC has the largest market share (~55% of UK electrical contractors)',
      'NAPIT is the second-largest (~25%) — equivalent in industry recognition, slightly cheaper',
      'Both schemes cost ~£500-600/year (NICEIC slightly higher with optional extras)',
      'Both require initial assessment + annual audit',
      'Both allow self-certification of Part P notifiable work',
      'Choice usually comes down to: which scheme your insurer prefers, which has nearest assessor, and personal preference of scheme contractor support',
    ],
    sections: [
      { id: 'niceic', heading: 'NICEIC (~£550/year)', body: 'Established 1956, the original UK electrical scheme. Largest market share. Strong contractor portal with technical helpline. Extra paid services available (training, CPD courses, NICEIC Pocket Guide). Initial assessment: ~£300-500. Annual audit: included in subscription. NICEIC certification carries strong brand recognition with insurers and homeowners.' },
      { id: 'napit', heading: 'NAPIT (~£480/year)', body: 'Established 1992. Second-largest UK electrical scheme. Equivalent regulatory recognition. NAPIT Direct CRM integrated with member dashboard. NAPIT also covers gas, plumbing, ventilation under separate scheme memberships — useful for multi-trade contractors. Initial assessment: ~£280-450. Annual audit: included.' },
      { id: 'comparison', heading: 'Side-by-Side Comparison', body: 'Annual fee: NICEIC ~£550 / NAPIT ~£480. Initial assessment: NICEIC £300-500 / NAPIT £280-450. Market share: NICEIC ~55% / NAPIT ~25%. Self-certification of Part P: both. Technical helpline: both. Insurance broker recognition: both equally recognised. Choose NICEIC if your area has a NICEIC assessor closer + your insurer specifies. Choose NAPIT if you want multi-trade scheme membership + slightly lower fees.' },
      { id: 'application-process', heading: 'The Application Process (Either Scheme)', body: 'Apply via the scheme\\u2019s online portal. Submit: your qualifications (Level 3 / AM2 / 18th Edition / 2391 or equivalent), insurance certificates, sample of certified work (typically 5-10 certified jobs), QMS / health and safety documentation. Wait for assessor visit (4-12 weeks). Assessor reviews 2-3 sample jobs on site + your paperwork. Pass: scheme membership granted. Annual re-audit thereafter.' },
      { id: 'after-membership', heading: 'After Joining the Scheme', body: 'Notification of work via the scheme portal — every Part P notifiable job is notified. Scheme issues the building control compliance certificate. Annual audit visit (typically 2-4 hours on site). Pay attention to: scheme correspondence (deadlines for renewal, audit dates), MTR (Minor Works) and EIC paperwork standards, customer-facing scheme branding (you can use the logo).' },
      { id: 'switching', heading: 'Switching Between Schemes', body: 'Allowed but typically only at annual renewal. Your existing scheme will not refund the year. Switching takes a fresh initial assessment with the new scheme. Most contractors who switch do so because: insurer recommendation changed, local assessor availability issues, scheme portal experience, or cost. Switching does NOT affect your industry recognition — both schemes are equivalent.' },
    ],
  },
  {
    slug: 'electrician-insurance-business-uk',
    title: 'Electrician Insurance for Your Business — UK 2026 Guide',
    audience: 'self-employed electricians and small business owners arranging insurance',
    summary: 'A practical 2026 guide to the insurance an electrical business must carry. Public Liability, Professional Indemnity, Tools-in-Van, Employers\' Liability — what each covers, what it costs, and where small electricians get caught out.',
    keyPoints: [
      'Public Liability is the floor — £2m minimum is standard; £5m is typical for commercial work',
      'Professional Indemnity covers errors and omissions in your certified work (EIC, EICR, design)',
      'Tools-in-Van replaces stolen / damaged tools — overnight cover is critical (most insurers require tools out of the van at night)',
      'Employers\\u2019 Liability is legally required from the moment you hire anyone — even a part-time apprentice',
      'Total insurance for a sole-trader electrical contractor: typically £500-1,200/year',
      'Adding sub-contractors, employees or commercial work pushes premiums upward significantly',
    ],
    sections: [
      { id: 'public-liability', heading: 'Public Liability (PL) Insurance', body: 'Covers injury to third parties or damage to property from your work. Industry minimum is £2m; £5m is standard for commercial / site work. Typical cost £250-450/year for a single-electrician operation. PL is the single most-claimed policy in the electrical trade — typical claims: cable nicked underground services, dropped tool on customer\\u2019s car, accidental water damage chasing for wiring. Don\\u2019t go below £5m if doing any commercial work.' },
      { id: 'professional-indemnity', heading: 'Professional Indemnity (PI) Insurance', body: 'Covers financial loss from errors in your certified work — the EIC you signed, the EICR you issued, the design you specified. £250k-1m typical limits, costing £200-400/year. PI is critical because a single EIC error (e.g. incorrect cable sizing flagged years later) can cost the customer £50k+ in remedial work — and you signed your name to it. PI is what makes scheme membership defensible if a customer takes you to court.' },
      { id: 'tools-in-van', heading: 'Tools-in-Van Insurance', body: 'Replaces tools / kit stolen from your vehicle or damaged on site. Sum-insured typically £3-10k for a single-person operation; multi-electrician firms run £15-30k. Critical detail: most policies require tools to be locked in the van AT NIGHT or in a secure store — leave them in the van overnight without a lock and the claim is voided. Some policies add cover for ladders / large kit on roof racks for extra premium.' },
      { id: 'employers-liability', heading: 'Employers\\u2019 Liability (EL) Insurance', body: '£5m statutory minimum the moment you hire anyone — apprentice, full-time electrician, even a part-time admin. The certificate must be displayed at your workplace by law. Typical cost: £200-400/year for a single-apprentice operation; scales with payroll. Most multi-trade insurers bundle EL with PL — confirm with your broker that EL is in place before the apprentice\\u2019s first day.' },
      { id: 'specialist-policies', heading: 'Specialist Add-Ons', body: 'Goods in transit (cables, distribution boards being transported). Personal accident (covers YOU if you fall off a ladder — sole traders especially). Legal expenses (covers solicitors\' fees defending claims). Cyber (if you store customer data electronically — increasingly relevant). None are strictly mandatory but small additions to the existing policy.' },
      { id: 'cost-summary', heading: 'Total Annual Insurance Cost', body: 'Single-electrician sole trader (PL £2m + PI £500k + Tools): £500-1,200/year. Add Employers\' Liability + apprentice: +£200-400/year. Limited company with 2-3 electricians + commercial work: £1,500-3,500/year. Get quotes from three brokers specialising in electrical contractors — generic tradesman policies often exclude scheme work or have low PI cover.' },
    ],
  },
  {
    slug: 'electrical-contractor-marketing-guide',
    title: 'Electrical Contractor Marketing — How to Get Customers',
    audience: 'self-employed electricians and small electrical business owners',
    summary: 'A practical 2026 marketing playbook for UK electrical contractors. What channels work, what they cost, what to expect for first-12-months results, and how to balance paid platforms against organic local presence.',
    keyPoints: [
      'Google Business Profile is the single highest-leverage free channel — set it up before anything else',
      'Local Google Pack (Map results) drives most "electrician near me" enquiries — reviews + accurate scheme info are critical',
      'Trade-aggregator platforms (Checkatrade, MyBuilder, Bark) bring leads but charge per lead or per win — calculate ROI before committing',
      'Personal-brand website is essential — even a single-page site with reviews ranks better than a profile on a directory',
      'Word-of-mouth is the highest-converting channel — incentivise it with referral rewards',
      'Paid Google Ads is rarely worth it for sole-trader electricians — the cost per click is high (£3-8 for "emergency electrician [city]")',
    ],
    sections: [
      { id: 'google-business-profile', heading: 'Google Business Profile (Free)', body: 'Set up before any other marketing. Adds you to the Google Map Pack — the three local-business results that appear above the standard search results. Critical fields: business name (must match your scheme registration name), address (use a real address — virtual offices are flagged), categories (Electrician + Electrical Installation Service + EV Charging Installer if applicable), hours, photos. Verify by postcard within 5 days of signup.' },
      { id: 'local-reviews', heading: 'Local Reviews', body: 'Google reviews are the single biggest local-pack ranking factor after proximity. Aim for 30+ reviews in your first year. Ask every customer at the moment of payment — "Would you mind leaving a Google review? Here\\u2019s the link." Use a short URL or QR code. NEVER pay for reviews (Google penalises) and NEVER review your own business. Respond to every review (positive and negative) within 24 hours — this signals an active business.' },
      { id: 'personal-brand-website', heading: 'Your Own Website', body: 'Even a single-page website with scheme membership, areas covered, services offered, reviews and a contact form ranks better than a third-party directory listing. Cost: £150-500 to build via Wix / Squarespace, or £1,500-3,500 for a custom developer build. Include: city-specific pages (e.g. "EICR in Manchester", "EV charger installer in Bristol") — these capture local searches that the Map Pack doesn\\u2019t.' },
      { id: 'trade-platforms', heading: 'Trade Aggregator Platforms', body: 'Checkatrade (subscription + per-lead), MyBuilder (per-win commission), Bark (per-lead), Rated People (subscription). Calculate cost-per-customer before committing. Typical platform stats: £40-120 cost per qualified lead, conversion 20-40%, so cost-per-customer £100-600. Worth it if your jobs are >£500 and you have spare capacity. Avoid if you\\u2019re full-booked from word-of-mouth.' },
      { id: 'social-media', heading: 'Social Media (Local Facebook + Instagram)', body: 'Local Facebook groups (your town + surrounding villages) are surprisingly high-converting for domestic work. Post a regular "I\\u2019m an electrician based in [town] — happy to quote any electrical work" once a fortnight, plus before/after photos of finished jobs. Instagram works for visual jobs (smart home, kitchen lighting, EV chargers). Both are free to use.' },
      { id: 'word-of-mouth', heading: 'Word-of-Mouth and Referrals', body: 'The highest-converting channel by far — referred customers convert at 60-80% and pay your asking price. Incentivise referrals: offer a £25-50 voucher / discount to existing customers who refer a paying customer. Keep a list of past customers — message them at month 11 with "It\\u2019s nearly a year since your installation — would you like a free annual safety check / EICR?" Generates EICR work and referrals.' },
    ],
  },
  {
    slug: 'cis-construction-industry-scheme-electricians',
    title: 'CIS for Electricians — The 2026 Guide',
    audience: 'self-employed electricians doing any sub-contract work',
    summary: 'The Construction Industry Scheme (CIS) is the HMRC system for deducting tax at source from construction sub-contractors — including electricians. This guide covers registration, 20% vs 30% deduction rates, monthly returns, and what happens if you ignore it.',
    keyPoints: [
      'CIS applies to any electrician doing sub-contract work for another contractor — even an occasional day-rate shift',
      'Registered sub-contractors are deducted at 20%; unregistered at 30%',
      'Gross Payment Status (no deduction) is available after 12 months of CIS compliance + £30k+ annual turnover',
      'Contractors must verify you with HMRC before paying — this is automatic if your CIS registration is current',
      'CIS deductions are credited against your annual self-assessment tax bill — most electricians get a refund at year-end',
      'Ignoring CIS means 30% deductions every job — significant cashflow drag',
    ],
    sections: [
      { id: 'what-is-cis', heading: 'What CIS Is and Why It Exists', body: 'CIS (Construction Industry Scheme) is HMRC\\u2019s tax-at-source system for construction sub-contractors, introduced 1971 and reformed several times since. The contractor (the main builder, electrical contractor or principal) deducts tax from your invoice before paying you. HMRC then credits the deduction against your annual tax bill. It exists because historically construction sub-contractors had a high rate of self-assessment non-compliance.' },
      { id: 'who-applies', heading: 'Who CIS Applies To', body: 'Any electrician who: works as a sub-contractor for another contractor on construction work (defined broadly — includes most electrical install work on building sites), is paid through CIS-recognised contracts, is not on PAYE for that contractor. Domestic small jobs direct to a homeowner are NOT CIS work. Doing the occasional day at a commercial site for another sparky IS CIS work.' },
      { id: 'registration', heading: 'Registering with CIS', body: 'Register via the HMRC online service (gov.uk/register-cis-subcontractor). You need: your Unique Taxpayer Reference (UTR), National Insurance number, bank details for refunds. Registration is free. Without CIS registration you are deducted at 30% — registration drops this to 20%. Takes 1-2 weeks for HMRC to process.' },
      { id: 'gross-payment-status', heading: 'Gross Payment Status (No Deductions)', body: 'After 12 months of CIS compliance + £30,000+ annual turnover, you can apply for Gross Payment Status. Approved sub-contractors are paid in full with no deductions — you settle the tax at year-end through self-assessment. Significant cashflow improvement. Apply via HMRC online service. HMRC reviews compliance annually — late returns or unpaid tax revokes Gross Payment Status.' },
      { id: 'monthly-returns', heading: 'Monthly CIS Returns (For Contractors)', body: 'If you are a contractor (i.e. hiring sub-contractors), you must file a monthly CIS return to HMRC by the 19th of each month, listing every sub-contractor paid and the deduction made. Late returns: £100 fine + escalating fines. Submit via HMRC online service or via your accountant. Most electrical companies hiring even one sub-contractor have monthly CIS returns alongside PAYE.' },
      { id: 'year-end-reconciliation', heading: 'Year-End Reconciliation', body: 'Your CIS deductions appear on your self-assessment tax return as tax already paid. If you\\u2019ve been deducted £8,000 across the year and your total tax liability is £6,000, you get a £2,000 refund. Many electricians under-claim because they don\\u2019t track CIS deductions properly — keep the CIS payment-and-deduction statements from every contractor. Reconcile at year-end.' },
    ],
  },
  {
    slug: 'electrical-contractor-vat-guide',
    title: 'VAT for Electrical Contractors — The 2026 Guide',
    audience: 'self-employed electricians and small electrical business owners approaching VAT registration',
    summary: 'A practical VAT guide for UK electrical contractors in 2026. When you must register, when you should register voluntarily, how the Domestic Reverse Charge affects your invoicing, and the Flat Rate vs Standard Rate decision.',
    keyPoints: [
      'VAT registration is mandatory once your rolling 12-month turnover exceeds £90,000 (2026 threshold)',
      'Voluntary registration below £90k can recover input VAT — useful if you have high tools / material spend',
      'The Domestic Reverse Charge applies to most construction sub-contract work — you do NOT charge VAT on the invoice; the customer accounts for it',
      'Standard VAT rate is 20%; some installations (energy-saving) attract 0% or 5% in specific circumstances',
      'The Flat Rate Scheme simplifies VAT for small businesses but is often less efficient than Standard Rate for electricians',
      'Get an accountant familiar with construction VAT before deciding — wrong invoices to wrong customers create £10k+ tax problems',
    ],
    sections: [
      { id: 'when-to-register', heading: 'When You Must Register for VAT', body: 'The mandatory threshold for VAT registration is £90,000 of taxable turnover in any rolling 12-month period (2026). The clock starts the moment your 12-month turnover crosses £90k — you have 30 days to register from the END of the month you crossed. Late registration: HMRC backdates and you owe VAT on every invoice you should have charged it on. Use accounting software (Xero, FreeAgent, QuickBooks) that warns you as you approach.' },
      { id: 'voluntary-registration', heading: 'Voluntary Registration Below £90k', body: 'You can register voluntarily below the threshold. Benefits: recover input VAT on tools, vehicles, materials, scheme fees, insurance, training. Drawbacks: you must charge VAT on every invoice — customer-pay sole traders (domestic homeowners) absorb this as extra cost. Worth doing if: majority of customers are VAT-registered (commercial), high material / tool spend, planning to grow quickly past £90k anyway.' },
      { id: 'domestic-reverse-charge', heading: 'Domestic Reverse Charge — Critical for Sub-Contractors', body: 'Since March 2021, the Domestic Reverse Charge (DRC) applies to most construction services between VAT-registered businesses. If you sub-contract to another VAT-registered electrical contractor: you do NOT charge VAT on the invoice. You write "Reverse charge: customer to pay VAT to HMRC" on the invoice and the customer accounts for the VAT. Get this wrong and you and your customer both face penalties. Direct-to-end-customer work is NOT under DRC — normal VAT applies.' },
      { id: 'vat-rates', heading: 'VAT Rates — Standard, Reduced, Zero', body: 'Standard rate: 20% — applies to most electrical work. Reduced rate: 5% — applies to energy-saving installations in residential dwellings (solar PV, ground source heat pumps, certain insulation), but only when supplied + fitted by the same VAT-registered contractor (not material-only). Zero rate: applies to limited cases (e.g. new-build construction in some circumstances). Get specific advice for every job — wrong rate creates VAT problems later.' },
      { id: 'flat-rate-scheme', heading: 'Flat Rate Scheme — Simpler, Often Less Efficient', body: 'Designed for small businesses, the Flat Rate Scheme lets you pay a fixed percentage of your turnover (typically 9.5% for construction trades) to HMRC, with no input VAT recovery. Simpler to administer. Often less efficient for electrical contractors because: input VAT on tools, materials, scheme fees, training and vehicles is significant. Most electrical contractors are better off on the Standard Rate Scheme.' },
      { id: 'getting-help', heading: 'Get an Accountant Before Registering', body: 'VAT is the single most common reason electrical contractors get into tax trouble. Get an accountant familiar with construction VAT before your first VAT return. Typical cost: £500-1,500/year for a small electrical business. They will: set up your Making Tax Digital (MTD) software, manage your quarterly VAT returns, advise on DRC, optimise the Flat Rate vs Standard decision, and represent you if HMRC investigates.' },
    ],
  },
  {
    slug: 'electrician-employee-vs-self-employed-decision',
    title: 'Employee vs Self-Employed Electrician — Which Is Right?',
    audience: 'qualified electricians weighing up going self-employed vs staying on PAYE',
    summary: 'A clear-eyed 2026 decision guide for UK electricians choosing between PAYE employee and self-employed (sole trader or limited company). Covers earnings, security, scope of work, lifestyle trade-offs and the realistic transition path.',
    keyPoints: [
      'Employee electrician earns £35-50k typical (regional + experience variance); top JIB Approved Electrician on PAYE £55-75k',
      'Self-employed electrician earns gross £55-110k typical (high variance) — but after costs, tax, holiday, sick and pension, net is often similar to employee',
      'Employee gets: holiday pay, sick pay, pension contributions, training paid, no admin, no insurance hassle',
      'Self-employed gets: full control of jobs, full margin on labour, lifestyle flexibility, unlimited earning potential — but absorbs all costs and risks',
      'Most self-employed electricians take 12-18 months to match their previous PAYE net income',
      'Hybrid: stay employed Mon-Fri, do private work evenings and weekends. Common stepping-stone.',
    ],
    sections: [
      { id: 'earnings-reality', heading: 'Earnings Reality Check', body: 'Employee Approved Electrician on JIB rates in 2026: £35-50k base + overtime / weekend rates / bonuses, typically £40-55k total. Senior / supervising electrician: £50-70k. Self-employed gross revenue: highly variable. A solo sparky averaging 35 chargeable hours/week at £55-75/hour = £100-135k gross. After costs (insurance, scheme fees, tools, van, fuel, accountant), typical net before tax £60-90k. After tax + NI, net is £45-65k — often similar to a strong PAYE position once you account for unpaid holiday, sick, and pension.' },
      { id: 'security-and-risk', heading: 'Job Security and Risk', body: 'Employee: PAYE, statutory rights, redundancy protection after 2 years, statutory sick pay, paid holiday. Self-employed: no statutory protections, no holiday pay, no sick pay, you pay your own pension. Risk profile: employee depends on employer health (could go bust). Self-employed depends on personal sales pipeline (could go quiet). Most electricians who survive the first 12 months self-employed find the work is plentiful.' },
      { id: 'lifestyle', heading: 'Lifestyle Trade-Offs', body: 'Employee: predictable hours, defined holiday, less admin, less stress, more downtime. Self-employed: full control of working hours (in theory — in practice often longer hours in year 1), full responsibility for sales, quoting, invoicing, certification, admin. Lifestyle question: do you want a job or do you want to run a business? They are very different things.' },
      { id: 'when-self-employed-makes-sense', heading: 'When Self-Employed Makes Sense', body: 'You have 5+ years of qualified electrician experience. You have £5-10k savings to cover startup + first 3 months of quiet work. You have a clear sales pipeline (existing local relationships, family in property, prior employer relationship). You are comfortable with admin, quoting, certification paperwork. You want to scale (hire apprentice → hire second electrician → grow a business). You\\u2019re a strong communicator — most self-employed success is sales, not technical.' },
      { id: 'when-paye-makes-sense', heading: 'When Staying on PAYE Makes Sense', body: 'You\\u2019re early in your career (under 5 years qualified). You value stability and predictability over autonomy. You don\\u2019t want to do quoting / invoicing / admin. You\\u2019re in a strong PAYE position with good rates + benefits + career progression. You have family commitments that need stable income. The "everyone is going self-employed" social pressure isn\\u2019t a good reason to switch.' },
      { id: 'transition-path', heading: 'The Realistic Transition Path', body: 'Most successful self-employed electricians do NOT quit on Monday and start trading on Tuesday. The realistic transition: month 1-6, stay on PAYE while doing private work evenings and weekends. Month 6-12, build savings + customer base. Month 12+, transition to part-time PAYE if employer allows. Month 18+, full self-employment. Total transition: 18-24 months. Reduces risk significantly.' },
    ],
  },
  {
    slug: 'electrical-quote-template-uk',
    title: 'Electrical Quote Template UK — How to Quote Like a Pro',
    audience: 'self-employed electricians and small contractors writing customer quotes',
    summary: 'A practical template + walk-through for electrical contractors writing professional customer quotes. Covers structure, line-itemisation, variation clauses, payment terms, and how to defend the price against haggling.',
    keyPoints: [
      'A defensible quote is itemised, in writing, signed and dated, and includes a clear scope + exclusions',
      'Always quote materials at retail+ (25-40% markup typical), never at trade cost — your time finding + supplying materials has value',
      'Include certification (EIC / MWC / EICR) as a line item — never give it away',
      'Variation clause: anything outside the scope is priced separately and acknowledged before work proceeds',
      'Payment terms: typical is 30 days, but consider 14 or 7 for new customers, with progress payments on large jobs',
      'The Elec-Mate quote tool generates a fully itemised PDF quote in under two minutes',
    ],
    sections: [
      { id: 'header-info', heading: 'Quote Header — What Must Be on Every Quote', body: 'Your business name (legal entity name), your address, your scheme membership numbers (NICEIC / NAPIT) with logos, VAT number if registered, contact email + phone. The customer\\u2019s name and address. A unique quote reference number (e.g. EM2026-101). Date of quote and a "Valid until" date (typically 30 days — prices change with copper, scheme fees, fuel).' },
      { id: 'scope', heading: 'Scope of Work', body: 'The single most important section. Write what you WILL do, not what you might do. Be specific: "Install one new 32A radial circuit from the consumer unit to a single 32A outdoor socket on the rear of the property, including chase + plaster patching to be done by others, RCD protection, and Electrical Installation Certificate." Vague scope ("install garden socket") guarantees scope creep + arguments later.' },
      { id: 'line-items', heading: 'Line-by-Line Itemisation', body: 'Every line is a separate cost. Materials at retail+ (25-40% markup). Labour at your hourly rate × estimated hours, or fixed-price by job type. Travel / setup time as a separate line. Certification as a separate line. Scheme notification fee (often included in cert line). Waste removal if applicable. NOT a single "Total: £450" — that invites haggling and reveals nothing about value.' },
      { id: 'exclusions', heading: 'Exclusions — What is NOT in the Price', body: 'Almost as important as the scope. Standard exclusions: "Plaster patching by others. Decoration / paintwork. Removal of furniture / fixtures. Disposal of any asbestos or hazardous materials. Building control variations beyond the scope above. Customer-supplied materials warranty." Get customers to acknowledge the exclusions before signing.' },
      { id: 'variation-clause', heading: 'Variation Clause', body: 'Word this exactly: "Any variations to the agreed scope will be priced separately at £[your hourly rate]/hour plus materials at retail+25% or fixed-price quote by agreement. No variations will commence without written customer approval." This is the line that protects you from "while you\\u2019re here, can you also do…"' },
      { id: 'payment-terms', heading: 'Payment Terms', body: 'New customer: deposit (e.g. 25% on acceptance), balance on completion. Repeat customer: 30 days net. Large jobs (£3k+): progress payments at agreed milestones. Always offer multiple payment methods (bank transfer, card via Stripe link, cheque, cash — but write down everything). State your late-payment policy: typical "Late payment over 30 days will accrue interest at 8% + base rate per the Late Payment Act."' },
      { id: 'use-elec-mate', heading: 'Use the Elec-Mate Quote Tool', body: 'Elec-Mate generates a fully itemised PDF quote in under two minutes from voice or text input. Includes: your scheme logo, customer details, scope, line items with retail+ pricing, exclusions, variation clause, payment terms, and a one-click acceptance link. Used by 1,000+ UK electricians for every quote.' },
    ],
  },
  {
    slug: 'electrical-business-pricing-strategy',
    title: 'Electrical Business Pricing Strategy — How to Set Your Rates',
    audience: 'electrical business owners setting their hourly rate, day rate and job pricing',
    summary: 'A practical 2026 pricing strategy guide for UK electrical contractors. Calculate your true hourly cost, set a fair-margin rate, decide between hourly / fixed / per-point, and defend your price against pressure.',
    keyPoints: [
      'Your true hourly cost (including non-chargeable time) is typically 1.4-1.6x your chargeable hourly rate',
      'A £55/hour charge-out rate covers: scheme fees, insurance, vehicle, tools, training, holiday, sick, pension and 30% margin — IF you bill 30+ chargeable hours/week',
      'Fixed-price by job type protects your margin against scope creep on standard work (EICR, CU swap, EV charger)',
      'Per-point pricing is industry-standard for rewires and large installs — typical UK rate £35-60 per point',
      'Day rate pricing only works for sub-contract work — direct-to-customer day rates always lose money',
      'Below-floor pricing is the single biggest reason electrical businesses fail',
    ],
    sections: [
      { id: 'true-hourly-cost', heading: 'Calculate Your True Hourly Cost', body: 'List every monthly cost: vehicle (£200-400 including fuel + insurance + depreciation), scheme fees (£40-50/month), insurance (£40-100/month), tools (£50-100/month average across the year), accountant (£50-150/month), training / CPD (£20-50/month), phone + internet (£30/month), pension (£200-400 ideally). Total typical: £700-1,300/month BEFORE you take any wages. Divide by chargeable hours (typically 30-35/week × 4 weeks = 120-140/month) to get your hourly floor.' },
      { id: 'charge-out-rate', heading: 'Setting Your Charge-Out Rate', body: 'A defensible 2026 charge-out rate for a UK self-employed electrician is £55-80/hour (excluding VAT). Below £55 you are subsidising the customer; above £80 you need either premium positioning (specialist work, exceptional reviews) or commercial / large-job pipeline. Most successful self-employed electricians charge £60-75/hour and bill 30-35 chargeable hours/week.' },
      { id: 'fixed-price-vs-hourly', heading: 'When to Fixed-Price vs Hourly', body: 'Fixed-price: standard work where you know the scope (EICR, CU swap, EV charger, rewire). Hourly: unknown scope (fault-finding, callouts, undefined remedial). Per-point: large jobs where complexity scales with outlet count (rewires, commercial fit-out). NEVER quote hourly for known-scope work — customers will haggle the hours; you absorb the variance.' },
      { id: 'per-point-pricing', heading: 'Per-Point Pricing (Rewires)', body: 'A "point" is one outlet, switch, light fitting or accessory — anything you terminate. Industry standard UK rate 2026: £35-60 per point depending on region and complexity. A typical 3-bed rewire with 50-65 points = £1,750-3,900 labour + materials. Per-point quoting protects you from scope creep ("can you also add a socket here?") because every added point is priced.' },
      { id: 'day-rate', heading: 'Day Rate — Sub-Contract Only', body: 'Day rate (£250-340/day for self-employed Approved Electrician) only works for sub-contract work where another contractor manages the customer relationship and absorbs scope risk. NEVER quote day rate to a homeowner — you absorb all the risk, the customer pays the cheapest day-rate, you lose money. Day rate sub-contract is fine as a way to fill quiet weeks; not as the basis of your business.' },
      { id: 'defending-price', heading: 'Defending Your Price', body: 'When customers haggle, the answer is not to discount. The answer is to explain what they\\u2019re paying for: scheme membership, insurance, calibrated test kit, certificate liability, BS 7671 compliance, warranty. "I\\u2019m the cheapest because…" is always a red flag for the customer — explain why your price is what it is, not why it should be lower. If they walk on price, they were never your customer.' },
    ],
  },
];

function escSingle(s) { return String(s).replace(/'/g, "\\'"); }
function pascalCase(s) { return s.split(/[^a-z0-9]+/i).filter(Boolean).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(''); }

function configFor(g) {
  const ident = `${pascalCase(g.slug)}Config`;
  const kpBullets = g.keyPoints.map((kp) => `    '${escSingle(kp)}.',`).join('\n');
  const sectionBlocks = g.sections.map((s) => `    {
      id: '${escSingle(s.id)}',
      heading: '${escSingle(s.heading)}',
      tocLabel: '${escSingle(s.heading.length > 25 ? s.heading.slice(0, 22) + '...' : s.heading)}',
      blocks: [
        {
          type: 'paragraph',
          text: '${escSingle(s.body)}',
        },
      ],
    },`).join('\n');

  return `import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Electrical business owner / employer guide. Audience: ${g.audience}.
// CTA: Elec-Mate Business AI / Employer tier.
// Updated 2026-05-18.

const published = '2026-05-18';
const modified = '2026-05-18';

export const ${ident}: GeneratedGuideConfig = {
  pagePath: '/guides/${g.slug}',
  title: '${escSingle(g.title)} — Practical 2026 Guide',
  description: '${escSingle(g.summary)}',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'Business Owner Guide',
  badgeIcon: 'Briefcase',
  breadcrumbLabel: '${escSingle(g.title.length > 35 ? g.title.slice(0, 32) + '...' : g.title)}',
  heroPrefix: '${escSingle(g.title)}:',
  heroHighlight: 'Practical 2026 Guide',
  heroSuffix: '— For UK Electrical Contractors',
  heroSubtitle:
    '${escSingle(g.summary)} This guide is for ${escSingle(g.audience)}.',
  keyTakeaways: [
${kpBullets}
  ],
  sections: [
${sectionBlocks}
    {
      id: 'next-steps',
      heading: 'Next Steps With Elec-Mate',
      tocLabel: 'Next steps',
      blocks: [
        {
          type: 'paragraph',
          text: 'Elec-Mate is built for UK electrical contractors — sole-traders through to multi-electrician firms. The Business AI tier gives you AI-powered quoting, certification, customer management, and team workflow. The Employer tier adds apprentice management, OJT tracking and JIB grading workflows.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'For electrical business owners',
          body:
            '7-day free trial of the Business AI tier — see how fast your team can quote, certify and invoice when the admin is automated. Cancel anytime.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Who is this guide for?',
      answer: 'This guide is written for ${escSingle(g.audience)}. The advice is practical, UK-specific, and based on 2026 regulations and market rates.',
    },
    {
      question: 'How long will it take to act on this guide?',
      answer: 'Most actionable items in this guide can be completed within 1-12 weeks. Where longer commitments are required (e.g. scheme membership, training provider partnerships), the relevant timelines are noted in the section text.',
    },
    {
      question: 'Where can I get more help?',
      answer: 'For specific advice tailored to your business, speak to: your accountant (tax, VAT, CIS), your insurance broker (PL, PI, EL), your scheme operator (NICEIC, NAPIT, ELECSA, Stroma), or your local JIB office. Elec-Mate\\u2019s Business AI also has an AI specialist trained on UK electrical business operations — ask any question and get an answer instantly.',
    },
    {
      question: 'How does Elec-Mate help?',
      answer: 'Elec-Mate is the all-in-one platform for UK electrical contractors. The Business AI tier covers quoting, certification, customer management, and AI-driven business support. The Employer tier adds apprentice management and OJT tracking. 7-day free trial.',
    },
    {
      question: 'Is this guide updated for 2026?',
      answer: 'Yes — this guide reflects 2026 regulatory thresholds, scheme fees, and market rates as of May 2026. Where rules change (e.g. apprenticeship funding, VAT thresholds, CIS rates), we update annually.',
    },
    {
      question: 'What if my situation is different from the typical case?',
      answer: 'Every electrical business is different. The guide gives you the standard playbook; speak to your accountant, broker, or scheme advisor for situation-specific advice. Elec-Mate\\u2019s Business AI can also answer specific scenario questions instantly.',
    },
  ],
  howToHeading: 'Five-Step Action Plan',
  howToDescription: 'A focused action plan based on the guide above.',
  howToSteps: [
    { name: 'Read the full guide above', text: 'Get familiar with every section before acting. Skim first, then read carefully — the details matter.' },
    { name: 'Identify your top priority', text: 'Most readers will have one specific area to act on first (registration, insurance, hiring, pricing). Pick one and focus there.' },
    { name: 'Take the first concrete step within 7 days', text: 'Inertia is the biggest barrier. Whether it\\u2019s phoning your accountant, getting an insurance quote, or applying to a scheme — do one concrete thing this week.' },
    { name: 'Track progress in Elec-Mate', text: 'Elec-Mate\\u2019s business dashboard lets you track scheme status, insurance renewal dates, apprentice progress, and quoting performance — all in one place.' },
    { name: 'Review in 90 days', text: 'Most business operations decisions need a 90-day review. Did the action work? Adjust and try the next thing.' },
  ],
  relatedPages: [
    { href: '/guides/how-to-price-eicr-as-an-electrician', title: 'How to Price EICR as an Electrician', description: 'Trade-side pricing methodology for periodic inspection work.', icon: 'PoundSterling', category: 'Guide' },
    { href: '/guides/how-to-price-consumer-unit-replacement-as-an-electrician', title: 'How to Price CU Replacement', description: 'Fair-margin pricing for consumer unit swaps.', icon: 'PoundSterling', category: 'Guide' },
    { href: '/guides/electrician-insurance-uk', title: 'Electrician Insurance UK', description: 'PL, PI, EL, Tools-in-Van — what you need.', icon: 'ShieldCheck', category: 'Guide' },
    { href: '/guides/competent-person-scheme-electrical', title: 'Competent Person Scheme', description: 'How NICEIC / NAPIT / ELECSA / Stroma membership works.', icon: 'FileCheck2', category: 'Guide' },
    { href: '/tools/electrical-quoting-app', title: 'Electrical Quoting App', description: 'Voice-driven quoting from your phone.', icon: 'FileText', category: 'Tool' },
    { href: '/eic-certificate', title: 'EIC Certificate App', description: 'Issue Electrical Installation Certificates on your phone.', icon: 'FileCheck2', category: 'Tool' },
  ],
  ctaHeading: 'For Electrical Business Owners: Run Your Business on Elec-Mate',
  ctaSubheading:
    'Join 1,000+ UK electrical contractors using Elec-Mate to quote, certify, manage apprentices, and grow. 7-day free trial of the Business AI tier.',
};
`;
}

function wrapperFor(g) {
  const ident = `${pascalCase(g.slug)}Config`;
  const pname = `${pascalCase(g.slug)}Page`;
  return `import GeneratedGuidePage from '@/pages/seo/generated/GeneratedGuidePage';
import { ${ident} } from '@/pages/seo/generated/${ident}';

export default function ${pname}() {
  return <GeneratedGuidePage config={${ident}} />;
}
`;
}

let generated = 0;
let skipped = 0;
const indexEntries = [];
for (const g of GUIDES) {
  const ident = `${pascalCase(g.slug)}Config`;
  const pname = `${pascalCase(g.slug)}Page`;
  const configFile = join(GEN_DIR, `${ident}.ts`);
  const wrapperFile = join(SEO_DIR, `${pname}.tsx`);
  if (!FORCE && existsSync(configFile)) { skipped++; continue; }
  writeFileSync(configFile, configFor(g));
  writeFileSync(wrapperFile, wrapperFor(g));
  generated++;
  indexEntries.push({ pname, slug: `/guides/${g.slug}` });
}

const lazyLines = indexEntries.map((e) => `const ${e.pname} = lazy(() => import('@/pages/seo/${e.pname}'));`).join('\n');
const routeLines = indexEntries.map((e) => `      <Route path="${e.slug}" element={<LazyRoute><${e.pname} /></LazyRoute>} />`).join('\n');
writeFileSync(join(ROOT, 'reports/programmatic-routes-business.txt'), `// Lazy:\n${lazyLines}\n\n// Routes:\n${routeLines}\n`);
console.log(`Generated ${generated} business owner guides, skipped ${skipped}.`);
