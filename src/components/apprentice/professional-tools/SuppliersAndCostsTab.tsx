import { Globe } from 'lucide-react';
import BudgetPlanningCalculator from '@/components/apprentice/tools-guide/BudgetPlanningCalculator';

const SuppliersAndCostsTab = () => {
  const ukSuppliers = [
    {
      name: 'CEF (City Electrical Factors)',
      type: 'National chain',
      speciality: 'Comprehensive electrical supplies',
      apprenticeSupport: '10% apprentice discount with valid ID',
      locations: '200+ branches across UK',
      website: 'cef.co.uk',
      bestFor: 'Electrical components and basic tools',
    },
    {
      name: 'Screwfix',
      type: 'Retail chain',
      speciality: 'Tools and hardware',
      apprenticeSupport: 'Student discount available',
      locations: '800+ stores nationwide',
      website: 'screwfix.com',
      bestFor: 'General tools and consumables',
    },
    {
      name: 'TLC Electrical',
      type: 'Online/Trade',
      speciality: 'Professional electrical supplies',
      apprenticeSupport: 'Education pricing available',
      locations: 'Online + regional depots',
      website: 'tlc-direct.co.uk',
      bestFor: 'Professional test equipment',
    },
    {
      name: 'RS Components',
      type: 'Industrial supplier',
      speciality: 'Technical products',
      apprenticeSupport: 'Educational discounts available',
      locations: 'Online + trade counters',
      website: 'rs-online.com',
      bestFor: 'Precision instruments and components',
    },
  ];

  const budgetingStrategies = [
    {
      strategy: 'Spread purchase plan',
      description: 'Distribute tool purchases over 12–18 months',
      monthlyBudget: '£100–200',
      benefits: ['Manageable payments', 'Learn tool preferences', 'Avoid debt'],
      timeline: [
        'Month 1–3: Safety gear and basic hand tools',
        'Month 4–6: Power tools and storage',
        'Month 7–12: Test equipment and specialists',
        'Month 13+: Upgrades and additional tools',
      ],
    },
    {
      strategy: 'Priority-based purchasing',
      description: 'Buy essential tools first, then upgrade',
      monthlyBudget: '£150–300',
      benefits: [
        'Immediate functionality',
        'Shorter setup time',
        'Professional appearance',
      ],
      timeline: [
        'Week 1: PPE and basic safety',
        'Month 1: Essential hand tools',
        'Month 2–3: Basic power tools',
        'Month 4–6: Test equipment',
      ],
    },
    {
      strategy: 'Quality investment plan',
      description: 'Buy fewer, higher-quality tools',
      monthlyBudget: '£200–400',
      benefits: ['Long-term value', 'Better performance', 'Professional image'],
      timeline: [
        'Research extensively before purchasing',
        'Buy one tool category at a time',
        'Focus on lifetime value',
        'Maintain and care properly',
      ],
    },
  ];

  const savingTips = [
    {
      tip: 'Timing your purchases',
      description: 'Take advantage of seasonal sales and promotions',
      savings: '10–30%',
      details: [
        'Black Friday and January sales',
        'End of financial year clearances',
        'Tool brand promotional periods',
        'Trade show discounts',
      ],
    },
    {
      tip: 'Group buying with peers',
      description: 'Coordinate purchases with other apprentices',
      savings: '5–15%',
      details: [
        'Bulk purchase discounts',
        'Shared delivery costs',
        'Group negotiation power',
        'Split specialised tools',
      ],
    },
    {
      tip: 'Second-hand quality tools',
      description: 'Buy premium brands at reduced prices',
      savings: '30–50%',
      details: [
        'Check eBay and Facebook Marketplace',
        'Verify tool condition thoroughly',
        'Ensure safety certifications valid',
        'Test before purchasing when possible',
      ],
    },
  ];

  const financingOptions = [
    {
      option: 'Apprentice loans',
      rate: '0–3% APR',
      amount: '£500–3000',
      term: '12–36 months',
      eligibility: 'Enrolled apprentices with regular income',
      pros: ['Low interest', 'Flexible terms', 'Build credit history'],
      cons: ['Debt commitment', 'Income requirements'],
    },
    {
      option: '0% credit cards',
      rate: '0% for 6–24 months',
      amount: '£500–5000',
      term: 'Promotional period',
      eligibility: 'Good credit score required',
      pros: ['No interest if paid on time', 'Purchase protection'],
      cons: ['High APR after promotion', 'Credit requirements'],
    },
    {
      option: 'Employer schemes',
      rate: 'Varies',
      amount: '£1000–5000',
      term: '12–60 months',
      eligibility: 'Company-dependent',
      pros: ['Employer guaranteed', 'Payroll deduction'],
      cons: ['Limited to company suppliers', 'Employment dependent'],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Smart purchasing guide
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Smart supplier selection and budgeting can save you hundreds of pounds on your
          professional toolkit while ensuring you get quality tools.
        </p>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Major UK tool suppliers
          </span>
          <p className="text-[13px] text-white/55">
            Key suppliers for electrical tools and equipment across the UK
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {ukSuppliers.map((supplier, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="space-y-1">
                  <h3 className="text-[14px] font-semibold text-white">{supplier.name}</h3>
                  <p className="text-[13px] text-white/85">{supplier.speciality}</p>
                </div>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  {supplier.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <div>
                  <span className="text-white/55">Locations</span>
                  <p className="text-white/85">{supplier.locations}</p>
                </div>
                <div>
                  <span className="text-white/55">Best for</span>
                  <p className="text-white/85">{supplier.bestFor}</p>
                </div>
              </div>

              <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Apprentice support
                </span>
                <p className="text-[13px] text-white/85">{supplier.apprenticeSupport}</p>
              </div>

              <div className="flex items-center gap-2 text-[12px] text-white/55">
                <Globe className="h-3.5 w-3.5" />
                <span className="font-mono">{supplier.website}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BudgetPlanningCalculator />

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Budgeting strategies for apprentices
          </span>
          <p className="text-[13px] text-white/55">
            Smart approaches to building your professional toolkit
          </p>
        </div>
        <div className="space-y-3">
          {budgetingStrategies.map((strategy, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-[14px] font-semibold text-white">{strategy.strategy}</h3>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono">
                  {strategy.monthlyBudget}/month
                </span>
              </div>
              <p className="text-[14px] text-white/85 leading-relaxed">{strategy.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Benefits
                  </span>
                  <ul className="space-y-1.5">
                    {strategy.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Timeline
                  </span>
                  <ul className="space-y-1.5">
                    {strategy.timeline.map((phase, idx) => (
                      <li
                        key={idx}
                        className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                        <span>{phase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Money-saving tips for tool purchases
          </span>
          <p className="text-[13px] text-white/55">
            Smart strategies to get the best value for your money
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {savingTips.map((tip, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[14px] font-semibold text-white">{tip.tip}</h3>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono">
                  Save {tip.savings}
                </span>
              </div>
              <p className="text-[14px] text-white/85 leading-relaxed">{tip.description}</p>
              <ul className="space-y-1.5">
                {tip.details.map((detail, idx) => (
                  <li
                    key={idx}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Financing options for larger purchases
          </span>
          <p className="text-[13px] text-white/55">
            Responsible financing options for expensive test equipment
          </p>
        </div>
        <div className="space-y-3">
          {financingOptions.map((option, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-[14px] font-semibold text-white">{option.option}</h3>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono">
                  {option.rate}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[13px]">
                <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-2 space-y-0.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Amount
                  </span>
                  <p className="text-white font-mono">{option.amount}</p>
                </div>
                <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-2 space-y-0.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Term
                  </span>
                  <p className="text-white">{option.term}</p>
                </div>
                <div className="col-span-2 rounded-md border border-white/[0.06] bg-white/[0.02] p-2 space-y-0.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Eligibility
                  </span>
                  <p className="text-white">{option.eligibility}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Pros
                  </span>
                  <ul className="space-y-1">
                    {option.pros.map((pro, idx) => (
                      <li
                        key={idx}
                        className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Cons
                  </span>
                  <ul className="space-y-1">
                    {option.cons.map((con, idx) => (
                      <li
                        key={idx}
                        className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Financial warning
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Only borrow what you can afford to repay. Tool purchases are an investment, but debt can
          impact your financial future. Consider starting with essential items and upgrading
          gradually.
        </p>
      </div>
    </div>
  );
};

export default SuppliersAndCostsTab;
