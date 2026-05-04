import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SupplierFinder = () => {
  const majorSuppliers = [
    {
      name: 'Screwfix',
      type: 'Trade counter & online',
      speciality: 'Quick collection, everyday tools',
      apprenticeDiscount: '10% with trade card',
      locations: '700+ stores nationwide',
      delivery: 'Next day delivery available',
      strengths: ['Convenient locations', 'Good basic tool range', 'Fast service'],
      contact: '0333 003 3000',
      website: 'screwfix.com',
    },
    {
      name: 'Toolstation',
      type: 'Trade counter & online',
      speciality: 'Competitive prices, trade quality',
      apprenticeDiscount: 'Account pricing available',
      locations: '500+ stores nationwide',
      delivery: 'Same day click & collect',
      strengths: ['Competitive pricing', 'Quality brands', 'Trade focused'],
      contact: '0808 100 7211',
      website: 'toolstation.com',
    },
    {
      name: 'RS Components',
      type: 'Specialist electrical',
      speciality: 'Test equipment, industrial supplies',
      apprenticeDiscount: 'Educational pricing',
      locations: 'Online + trade counters',
      delivery: 'Next day delivery',
      strengths: ['Technical expertise', 'Quality test equipment', 'Engineering support'],
      contact: '01536 201234',
      website: 'rs-online.com',
    },
    {
      name: 'CPC Farnell',
      type: 'Electrical specialist',
      speciality: 'Professional electrical equipment',
      apprenticeDiscount: 'Student & apprentice rates',
      locations: 'Online + collection points',
      delivery: 'Free delivery over £45',
      strengths: ['Electrical focus', 'Professional grade', 'Technical datasheets'],
      contact: '0800 587 0093',
      website: 'cpc.co.uk',
    },
  ];

  const localSuppliers = [
    {
      type: 'Independent electrical wholesalers',
      description:
        'Local electrical wholesalers often offer the best trade prices and personalised service',
      benefits: ['Better trade discounts', 'Local knowledge', 'Account facilities', 'Bulk pricing'],
      howToFind:
        "Search 'electrical wholesaler near me' or ask local electricians for recommendations",
    },
    {
      type: 'Tool specialists',
      description:
        'Specialist tool shops often have better expertise and can provide hands-on advice',
      benefits: ['Expert advice', 'Try before buying', 'Better warranties', 'Professional service'],
      howToFind: 'Look for established local tool shops, often family-run businesses',
    },
  ];

  const costBreakdown = [
    {
      category: 'Hand tools',
      essentialCost: '£150-250',
      qualityCost: '£300-450',
      timeframe: 'First 6 months',
      priority: 'Start immediately',
    },
    {
      category: 'Power tools',
      essentialCost: '£200-400',
      qualityCost: '£500-800',
      timeframe: 'Months 6-12',
      priority: 'Build gradually',
    },
    {
      category: 'Test equipment',
      essentialCost: '£300-600',
      qualityCost: '£800-1500',
      timeframe: 'Year 2-3',
      priority: 'As training progresses',
    },
    {
      category: 'PPE & safety',
      essentialCost: '£100-200',
      qualityCost: '£200-350',
      timeframe: 'Immediate',
      priority: 'Never compromise',
    },
  ];

  const savingsTips = [
    'Join trade associations for member discounts',
    'Buy during end-of-year sales (November-January)',
    'Consider quality second-hand tools from reputable sources',
    'Group purchases with other apprentices for bulk discounts',
    'Look for manufacturer cashback offers',
    'Use price comparison websites for expensive items',
    'Ask about payment plans for expensive test equipment',
    'Check if your employer has corporate accounts you can use',
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="major-suppliers" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="major-suppliers">Major</TabsTrigger>
          <TabsTrigger value="local-suppliers">Local</TabsTrigger>
          <TabsTrigger value="cost-planning">Costs</TabsTrigger>
          <TabsTrigger value="savings-tips">Savings</TabsTrigger>
        </TabsList>

        <TabsContent value="major-suppliers">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {majorSuppliers.map((supplier, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[18px] font-semibold text-white leading-tight">
                    {supplier.name}
                  </h3>
                  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] flex-shrink-0">
                    {supplier.type}
                  </span>
                </div>
                <p className="text-[14px] text-white/85 leading-relaxed">{supplier.speciality}</p>

                <div className="space-y-1.5 text-[13px] text-white/85">
                  <div className="flex justify-between gap-3">
                    <span className="text-white/55">Discount</span>
                    <span className="text-right">{supplier.apprenticeDiscount}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-white/55">Locations</span>
                    <span className="text-right">{supplier.locations}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-white/55">Delivery</span>
                    <span className="text-right">{supplier.delivery}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Key strengths
                  </span>
                  <ul className="text-[13px] text-white/85 space-y-1">
                    {supplier.strengths.map((strength, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-white/[0.06] space-y-1 text-[12px] text-white/55">
                  <p>{supplier.contact}</p>
                  <p>{supplier.website}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="local-suppliers">
          <div className="space-y-4">
            {localSuppliers.map((supplier, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
              >
                <h3 className="text-[18px] font-semibold text-white leading-tight">
                  {supplier.type}
                </h3>
                <p className="text-[14px] text-white/85 leading-relaxed">{supplier.description}</p>

                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Benefits
                  </span>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-[13px] text-white/85">
                    {supplier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    How to find
                  </span>
                  <p className="text-[13px] text-white/85 leading-relaxed">{supplier.howToFind}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cost-planning">
          <div className="space-y-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Total investment
              </span>
              <p className="text-[14px] text-white/85 leading-relaxed">
                Total toolkit investment over 2-3 years: £750-2000. Quality tools are a career
                investment that can last decades.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {costBreakdown.map((category, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
                >
                  <h3 className="text-[16px] font-semibold text-white leading-tight">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                        Essential
                      </span>
                      <p className="text-[16px] font-semibold text-white">{category.essentialCost}</p>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                        Quality
                      </span>
                      <p className="text-[16px] font-semibold text-white">{category.qualityCost}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-[13px] text-white/85">
                    <div className="flex justify-between">
                      <span className="text-white/55">Timeframe</span>
                      <span>{category.timeframe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/55">Priority</span>
                      <span>{category.priority}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="savings-tips">
          <div className="space-y-4">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Money-saving strategies
                </span>
                <h3 className="text-[18px] font-semibold text-white leading-tight">
                  Strategies for apprentices
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {savingsTips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                  >
                    <span className="text-[12px] text-white/55 font-mono mt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[13px] text-white/85 leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Apprentice schemes
              </span>
              <p className="text-[14px] text-white/85 leading-relaxed">
                Many suppliers offer special apprentice pricing. Always ask about discounts and
                bring your apprenticeship agreement as proof of status.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierFinder;
