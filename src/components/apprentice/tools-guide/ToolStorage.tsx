const ToolStorage = () => {
  const storageOptions = [
    {
      type: 'Portable tool storage',
      options: [
        {
          name: 'Professional tool cases',
          price: '£80-200',
          features: ['Weather resistant', 'Organised compartments', 'Professional appearance'],
          bestFor: 'Site work & client visits',
        },
        {
          name: 'Modular tool systems',
          price: '£60-150',
          features: ['Stackable design', 'Multiple configurations', 'Easy transport'],
          bestFor: 'Van storage & flexibility',
        },
        {
          name: 'Tool bags & pouches',
          price: '£25-80',
          features: ['Lightweight', 'Quick access', 'Belt mounting'],
          bestFor: 'Daily carry tools',
        },
      ],
    },
    {
      type: 'Vehicle storage',
      options: [
        {
          name: 'Van racking systems',
          price: '£300-800',
          features: ['Custom fit', 'Maximises space', 'Secure mounting'],
          bestFor: 'Mobile electricians',
        },
        {
          name: 'Secure tool cabinets',
          price: '£200-500',
          features: ['Lockable storage', 'Weather protection', 'Organised drawers'],
          bestFor: 'Valuable equipment',
        },
        {
          name: 'Cable & material racks',
          price: '£50-150',
          features: ['Organised storage', 'Easy access', 'Space efficient'],
          bestFor: 'Cable management',
        },
      ],
    },
    {
      type: 'Workshop storage',
      options: [
        {
          name: 'Tool chests',
          price: '£150-500',
          features: ['Large capacity', 'Multiple drawers', 'Secure locking'],
          bestFor: 'Home workshop base',
        },
        {
          name: 'Wall storage systems',
          price: '£50-200',
          features: ['Space saving', 'Visual organisation', 'Easy access'],
          bestFor: 'Workshop walls',
        },
        {
          name: 'Mobile tool trolleys',
          price: '£100-300',
          features: ['Wheels for mobility', 'Multiple levels', 'Workspace top'],
          bestFor: 'Workshop flexibility',
        },
      ],
    },
    {
      type: 'Security & protection',
      options: [
        {
          name: 'Tool insurance',
          price: '£10-40/month',
          features: ['Theft protection', 'Replacement cover', 'Public liability'],
          bestFor: 'Financial protection',
        },
        {
          name: 'Vehicle security',
          price: '£100-300',
          features: ['Deadlocks', 'Alarms', 'Visible deterrents'],
          bestFor: 'Theft prevention',
        },
        {
          name: 'Tool marking',
          price: '£10-30',
          features: ['UV marking', 'Postcode etching', 'Identification'],
          bestFor: 'Recovery assistance',
        },
      ],
    },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Storage
        </span>
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-white leading-tight">
          Tool storage solutions
        </h2>
        <p className="text-[14px] text-white/85 leading-relaxed max-w-2xl">
          Protect your investment with proper storage. Good organisation improves efficiency and
          maintains professional standards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {storageOptions.map((category, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4"
          >
            <h3 className="text-[16px] font-semibold text-white">{category.type}</h3>

            <div className="space-y-3">
              {category.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-[14px] font-medium text-white">{option.name}</h4>
                    <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] flex-shrink-0">
                      {option.price}
                    </span>
                  </div>

                  <p className="text-[13px] text-white/85 leading-relaxed">
                    <strong>Best for:</strong> {option.bestFor}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {option.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Organisation tips
          </span>
          <ul className="space-y-1 text-[14px] text-white/85 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Label storage clearly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Keep daily tools accessible</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Maintain tool inventories</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Regular condition checks</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Security essentials
          </span>
          <ul className="space-y-1 text-[14px] text-white/85 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Never leave tools visible in vehicles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Use multiple security measures</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Keep purchase receipts safe</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Mark tools for identification</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Efficiency tips
          </span>
          <ul className="space-y-1 text-[14px] text-white/85 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Foam inserts for organisation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Keep spare consumables</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Clean tools after use</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Schedule maintenance</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToolStorage;
