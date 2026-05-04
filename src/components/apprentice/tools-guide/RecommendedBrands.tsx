import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RecommendedBrands = () => {
  const handToolBrands = [
    {
      name: 'Wiha',
      category: 'Premium screwdrivers & hand tools',
      rating: 5,
      priceRange: '££££',
      strengths: ['VDE certified', 'Ergonomic design', 'Lifetime warranty'],
      bestFor: 'Professional screwdrivers and precision tools',
      ukAvailability: 'Excellent',
      apprenticeTip: 'Expensive but last a career. Start with essential sizes.',
    },
    {
      name: 'Knipex',
      category: 'Pliers & cutters',
      rating: 5,
      priceRange: '£££',
      strengths: ['German engineering', 'Precise cutting', 'Ergonomic handles'],
      bestFor: 'Professional pliers and wire strippers',
      ukAvailability: 'Excellent',
      apprenticeTip: 'Industry standard for pliers. Worth the investment.',
    },
    {
      name: 'Bahco',
      category: 'General hand tools',
      rating: 4,
      priceRange: '£££',
      strengths: ['Swedish quality', 'Wide range', 'Good value'],
      bestFor: 'Adjustable wrenches and general tools',
      ukAvailability: 'Very good',
      apprenticeTip: 'Good balance of quality and price for hand tools.',
    },
    {
      name: 'Stanley',
      category: 'Measuring & marking',
      rating: 4,
      priceRange: '££',
      strengths: ['Reliable', 'Widely available', 'Good warranty'],
      bestFor: 'Tape measures, levels, and marking tools',
      ukAvailability: 'Excellent',
      apprenticeTip: 'Solid choice for measuring tools. Widely available.',
    },
  ];

  const powerToolBrands = [
    {
      name: 'Makita',
      category: 'Cordless power tools',
      rating: 5,
      priceRange: '£££',
      strengths: ['18V LXT system', 'Reliable batteries', 'Wide tool range'],
      bestFor: 'Complete cordless tool system',
      ukAvailability: 'Excellent',
      apprenticeTip: 'Popular with electricians. Stick to one battery platform.',
    },
    {
      name: 'DeWalt',
      category: 'Construction power tools',
      rating: 5,
      priceRange: '£££',
      strengths: ['XR battery range', 'Tough construction', 'Good service'],
      bestFor: 'Heavy-duty cordless tools',
      ukAvailability: 'Excellent',
      apprenticeTip: 'Very popular on construction sites. Robust tools.',
    },
    {
      name: 'Milwaukee',
      category: 'Professional power tools',
      rating: 5,
      priceRange: '££££',
      strengths: ['M18 FUEL system', 'Innovation', 'Professional focus'],
      bestFor: 'Professional cordless systems',
      ukAvailability: 'Good',
      apprenticeTip: 'Premium tools but expensive. Great if budget allows.',
    },
    {
      name: 'Bosch Professional',
      category: 'Power tools & measuring',
      rating: 4,
      priceRange: '£££',
      strengths: ['German engineering', 'Measuring tools', 'Reliability'],
      bestFor: 'Mixed power tools and measuring equipment',
      ukAvailability: 'Very good',
      apprenticeTip: 'Good all-round choice. Excellent measuring tools.',
    },
  ];

  const testEquipmentBrands = [
    {
      name: 'Fluke',
      category: 'Professional test equipment',
      rating: 5,
      priceRange: '££££',
      strengths: ['Industry standard', 'Accuracy', 'Build quality'],
      bestFor: 'Multifunction testers and professional instruments',
      ukAvailability: 'Excellent',
      apprenticeTip: 'Gold standard but expensive. Consider when qualified.',
    },
    {
      name: 'Megger',
      category: 'Electrical testing',
      rating: 5,
      priceRange: '£££',
      strengths: ['UK heritage', 'Testing expertise', 'Compliance'],
      bestFor: 'Installation testing and insulation testing',
      ukAvailability: 'Excellent',
      apprenticeTip: 'British company with excellent UK support.',
    },
    {
      name: 'Kewtech',
      category: 'UK testing specialists',
      rating: 4,
      priceRange: '£££',
      strengths: ['UK focused', 'Good value', '18th Edition compliant'],
      bestFor: 'Multifunction testers for UK market',
      ukAvailability: 'Excellent',
      apprenticeTip: 'UK specialist. Good alternative to Fluke.',
    },
    {
      name: 'Martindale',
      category: 'Basic test equipment',
      rating: 4,
      priceRange: '££',
      strengths: ['GS38 compliant', 'Affordable', 'UK company'],
      bestFor: 'Voltage indicators and basic test equipment',
      ukAvailability: 'Excellent',
      apprenticeTip: 'Good for starting out. Reliable basic equipment.',
    },
  ];

  const ppeBrands = [
    {
      name: 'Honeywell',
      category: 'Professional PPE',
      rating: 5,
      priceRange: '£££',
      strengths: ['Wide range', 'Quality standards', 'Innovation'],
      bestFor: 'Complete PPE solutions',
      ukAvailability: 'Excellent',
      apprenticeTip: 'Premium PPE with excellent protection standards.',
    },
    {
      name: '3M',
      category: 'Respiratory & eye protection',
      rating: 5,
      priceRange: '£££',
      strengths: ['Innovation', 'Comfort', 'Effective protection'],
      bestFor: 'Masks, ear defenders, and safety glasses',
      ukAvailability: 'Excellent',
      apprenticeTip: 'Top choice for respiratory protection.',
    },
    {
      name: 'Dickies',
      category: 'Workwear & boots',
      rating: 4,
      priceRange: '££',
      strengths: ['Durability', 'Comfort', 'Value'],
      bestFor: 'Work clothing and safety boots',
      ukAvailability: 'Excellent',
      apprenticeTip: 'Good value workwear. Comfortable for daily wear.',
    },
    {
      name: 'Site',
      category: 'Safety footwear',
      rating: 4,
      priceRange: '££',
      strengths: ['UK brand', 'Comfort', 'Good value'],
      bestFor: 'Safety boots for construction sites',
      ukAvailability: 'Excellent',
      apprenticeTip: 'Affordable UK safety boots. Good for apprentices.',
    },
  ];

  const budgetAlternatives = [
    {
      category: 'Hand tools',
      premiumBrand: 'Wiha',
      budgetAlternative: 'Wera',
      savings: '30-40%',
      tradeOff: 'Slightly less ergonomic but still VDE certified',
    },
    {
      category: 'Power tools',
      premiumBrand: 'Milwaukee',
      budgetAlternative: 'Ryobi ONE+',
      savings: '40-50%',
      tradeOff: 'Less power but adequate for most electrical work',
    },
    {
      category: 'Test equipment',
      premiumBrand: 'Fluke',
      budgetAlternative: 'UniT',
      savings: '50-60%',
      tradeOff: 'Basic functionality but meets testing requirements',
    },
    {
      category: 'PPE',
      premiumBrand: 'Honeywell',
      budgetAlternative: 'Portwest',
      savings: '30-40%',
      tradeOff: 'Same safety standards but may be less comfortable',
    },
  ];

  const renderBrandCard = (brand: typeof handToolBrands[0], index: number) => (
    <div
      key={index}
      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
    >
      <div className="space-y-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[18px] font-semibold text-white leading-tight">{brand.name}</h3>
          <span className="text-[12px] text-white/85 font-mono flex-shrink-0">
            {brand.rating}/5
          </span>
        </div>
        <p className="text-[13px] text-white/85">{brand.category}</p>
      </div>

      <div className="flex items-baseline justify-between gap-3 text-[13px]">
        <span className="font-mono text-white/85">{brand.priceRange}</span>
        <span className="text-[12px] text-white/55">{brand.ukAvailability} UK availability</span>
      </div>

      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Strengths
        </span>
        <div className="flex flex-wrap gap-1.5">
          {brand.strengths.map((strength, i) => (
            <span
              key={i}
              className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
            >
              {strength}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Best for
        </span>
        <p className="text-[13px] text-white/85 leading-relaxed">{brand.bestFor}</p>
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Apprentice tip
        </span>
        <p className="text-[13px] text-white/85 leading-relaxed">{brand.apprenticeTip}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Trusted brands
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          These brands are trusted by UK electrical professionals. Quality tools are an investment -
          they'll serve you throughout your career.
        </p>
      </div>

      <Tabs defaultValue="hand-tools" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hand-tools">Hand</TabsTrigger>
          <TabsTrigger value="power-tools">Power</TabsTrigger>
          <TabsTrigger value="test-equipment">Test</TabsTrigger>
          <TabsTrigger value="ppe">PPE</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>

        <TabsContent value="hand-tools">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {handToolBrands.map(renderBrandCard)}
          </div>
        </TabsContent>

        <TabsContent value="power-tools">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {powerToolBrands.map(renderBrandCard)}
          </div>
        </TabsContent>

        <TabsContent value="test-equipment">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {testEquipmentBrands.map(renderBrandCard)}
          </div>
        </TabsContent>

        <TabsContent value="ppe">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {ppeBrands.map(renderBrandCard)}
          </div>
        </TabsContent>

        <TabsContent value="budget">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Budget-friendly alternatives
              </span>
              <h3 className="text-[18px] font-semibold text-white leading-tight">
                Save without compromising
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {budgetAlternatives.map((alt, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2"
                >
                  <h4 className="text-[14px] font-medium text-white">{alt.category}</h4>
                  <div className="space-y-1 text-[13px] text-white/85">
                    <div className="flex justify-between">
                      <span className="text-white/55">Premium</span>
                      <span>{alt.premiumBrand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/55">Budget</span>
                      <span>{alt.budgetAlternative}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/55">Savings</span>
                      <span className="font-mono text-white">{alt.savings}</span>
                    </div>
                    <div className="pt-2 border-t border-white/[0.06]">
                      <p className="text-[12px] text-white/55 leading-relaxed">
                        <strong>Trade-off:</strong> {alt.tradeOff}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecommendedBrands;
