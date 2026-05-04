import ToolCard from './ToolCard';

const TestEquipmentTab = () => {
  const basicTestTools = [
    {
      name: 'Voltage indicator (2-pole type)',
      description: 'Proving dead before work - essential safety tool',
      priceRange: '£15-30',
      priority: 'essential' as const,
      ukStandard: 'GS38 compliant',
    },
    {
      name: 'Proving unit for voltage indicator',
      description: 'Test your tester before every use',
      priceRange: '£20-40',
      priority: 'essential' as const,
      ukStandard: 'Must match indicator',
    },
    {
      name: 'Continuity tester (buzzer type)',
      description: 'Basic continuity checks during installation',
      priceRange: '£10-25',
      priority: 'essential' as const,
      ukStandard: 'Low voltage output',
    },
    {
      name: 'Socket tester (13A plug-in type)',
      description: 'Quick checks of domestic socket wiring',
      priceRange: '£8-20',
      priority: 'recommended' as const,
      ukStandard: 'BS 1363 compliant',
    },
    {
      name: 'Test leads with fused probes',
      description: 'Safe connection to electrical systems',
      priceRange: '£15-35',
      priority: 'essential' as const,
      ukStandard: 'GS38 specification',
    },
  ];

  const advancedTestTools = [
    {
      name: 'Multifunction installation tester',
      description: 'Professional testing for certification work',
      priceRange: '£400-1200',
      priority: 'essential' as const,
      ukStandard: '18th Edition compliant',
    },
    {
      name: 'Earth loop impedance tester',
      description: 'Ze and Zs measurements for safety verification',
      priceRange: '£300-800',
      priority: 'essential' as const,
      ukStandard: 'BS 7671 compliant',
    },
    {
      name: 'RCD tester (all types)',
      description: 'Test 30mA, 100mA, and 300mA RCDs',
      priceRange: '£200-500',
      priority: 'essential' as const,
      ukStandard: 'Type A, AC, F testing',
    },
    {
      name: 'Insulation resistance tester',
      description: '500V and 1000V insulation testing',
      priceRange: '£150-400',
      priority: 'essential' as const,
      ukStandard: 'BS 7671 Part 6',
    },
    {
      name: 'Professional test lead set',
      description: 'Various probes and adaptors for all tests',
      priceRange: '£80-150',
      priority: 'recommended' as const,
      ukStandard: 'CAT III rated',
    },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Test equipment
        </span>
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-white leading-tight">
          Test equipment
        </h2>
        <p className="text-[14px] text-white/85 leading-relaxed max-w-2xl">
          As you progress through your apprenticeship, you'll need appropriate test equipment that
          meets UK regulations. Quality test equipment is essential for safety and compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ToolCard
          title="Basic test equipment (year 1-2)"
          icon={null}
          description="Essential testing tools for day-to-day electrical work during early apprenticeship."
          items={basicTestTools}
          apprenticeTip="Start with a good voltage indicator and proving unit - these are used daily. Many basic testers are included in apprentice starter kits. Always prove dead before starting work!"
          ukConsideration="GS38 compliance is mandatory for test equipment. Your voltage indicator must be 2-pole type for safety. Never use a multimeter for proving dead."
        />

        <ToolCard
          title="Advanced testing (year 3-4)"
          icon={null}
          description="Professional equipment needed for testing and inspection work leading to certification."
          items={advancedTestTools}
          apprenticeTip="Don't rush to buy expensive test equipment early. Many employers provide these for qualified staff. Focus on understanding how to use them properly first."
          ukConsideration="18th Edition testing requires specific capabilities. Ensure any multifunction tester can perform all required tests to current standards. Annual calibration is mandatory."
        />
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          18th Edition testing & progression
        </span>
        <div className="space-y-2 text-[14px] text-white/85 leading-relaxed">
          <p>
            <strong>Year 1-2:</strong> Focus on basic safety equipment. Learn to use voltage
            indicators, proving units, and simple continuity testers. Understand the principles
            before using complex equipment.
          </p>
          <p>
            <strong>Year 3-4:</strong> Begin using multifunction testers under supervision. Learn all
            test sequences and understand what the readings mean. Practice on training installations
            first.
          </p>
          <p>
            <strong>Calibration:</strong> All test equipment must be calibrated annually with valid
            certificates. Uncalibrated equipment can give false readings, compromising safety and
            invalidating test results.
          </p>
          <p>
            <strong>Investment strategy:</strong> Basic equipment: £100-150. Advanced equipment:
            £1000-2000. Consider finance options or employer schemes for expensive items.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Critical safety reminders
        </span>
        <ul className="space-y-1.5 text-[14px] text-white/85 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
            <span>Always prove your voltage indicator is working before and after use</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
            <span>Never use a digital multimeter to prove an installation is dead</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
            <span>Test equipment must be regularly PAT tested and calibrated</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
            <span>Follow the "prove dead" procedure every time - no exceptions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
            <span>Damaged test equipment must be taken out of service immediately</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TestEquipmentTab;
