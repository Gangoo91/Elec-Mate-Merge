import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Lightbulb,
  Calculator,
  BookOpen,
  BarChart3,
  Shield,
  Zap,
  Building,
  FileCheck2,
  Ruler,
  Sun,
  Eye,
  Layers,
} from 'lucide-react';

export default function LightingLuxCalculatorPage() {
  return (
    <ToolTemplate
      title="Lighting Lux Level Calculator | Free Tool UK"
      description="Calculate required lux levels for any room type using CIBSE recommendations and BS EN 12464-1. Covers offices, warehouses, kitchens, retail, schools, and domestic spaces. Free UK lighting calculator with maintained illuminance values."
      datePublished="2026-01-20"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Lighting Lux Calculator', href: '/tools/lighting-lux-calculator' },
      ]}
      tocItems={[
        { id: 'what-is-lux', label: 'What Is Lux?' },
        { id: 'cibse-lux-levels', label: 'CIBSE Recommended Lux Levels' },
        { id: 'calculation-method', label: 'Lux Calculation Method' },
        { id: 'room-index', label: 'Room Index and Utilisation Factor' },
        { id: 'maintenance-factor', label: 'Maintenance Factor' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="CIBSE Compliant"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          <span className="text-yellow-400">Lighting Lux Level Calculator</span> — Get the Right
          Light Level for Every Room
        </>
      }
      heroSubtitle="Calculate the number of luminaires needed to achieve CIBSE-recommended lux levels in any space. Enter room dimensions, select the room type, choose your luminaire, and get an instant result. Part of Elec-Mate's 50+ electrical calculators built for UK electricians."
      heroFeaturePills={[
        { icon: Lightbulb, label: 'CIBSE Lux Tables' },
        { icon: Calculator, label: 'Instant Results' },
        { icon: Building, label: 'All Room Types' },
        { icon: Sun, label: 'Maintained Illuminance' },
      ]}
      readingTime={10}
      keyTakeaways={[
        'Lux is the unit of illuminance — one lumen per square metre — and is the standard measure for specifying lighting levels in UK building design.',
        'CIBSE and BS EN 12464-1 publish maintained illuminance recommendations for every room type, from 100 lux in corridors to 500 lux in offices and 750 lux in detailed inspection areas.',
        'The lumen method is the standard calculation: Number of luminaires = (Lux x Area) / (Lumens per fitting x Utilisation Factor x Maintenance Factor).',
        'Room index, reflectance values, and maintenance factor all affect the result — ignoring them leads to under-lit or over-lit spaces.',
        'Elec-Mate calculates lux levels instantly with CIBSE data built in, saving you time on every lighting design job.',
      ]}
      sections={[
        {
          id: 'what-is-lux',
          heading: 'What Is Lux and Why Does It Matter?',
          content: (
            <>
              <p>
                Lux (lx) is the SI unit of illuminance. It measures the amount of luminous flux
                (light) falling on a surface per unit area. One lux equals one lumen per square
                metre. It is the primary measure used by lighting designers, architects, and
                electricians to specify how bright a space needs to be for its intended use.
              </p>
              <p>
                Getting lux levels right is critical for compliance, occupant comfort, and energy
                efficiency. Too little light causes eye strain, reduces productivity, and creates
                safety hazards — particularly in workplaces where detailed tasks are performed. Too
                much light wastes energy, increases running costs, and can cause glare that is just
                as problematic as insufficient light.
              </p>
              <p>
                In the UK, lighting design is governed by CIBSE (the Chartered Institution of
                Building Services Engineers) recommendations and the European standard BS EN 12464-1
                for indoor workplaces. These standards specify the maintained illuminance — the
                minimum average lux level on the working plane — for every type of room and task.
                The{' '}
                <SEOInternalLink href="/tools/electrical-testing-calculators">
                  Elec-Mate calculator suite
                </SEOInternalLink>{' '}
                includes all these values built in, so you do not need to look them up manually.
              </p>
            </>
          ),
          appBridge: {
            title: 'Calculate Lux Levels Instantly',
            description:
              'Enter room dimensions, select the room type, and choose your luminaire. Elec-Mate calculates the number of fittings needed to meet CIBSE recommendations — no manual lookup required.',
            icon: Lightbulb,
          },
        },
        {
          id: 'cibse-lux-levels',
          heading: 'CIBSE Recommended Lux Levels by Room Type',
          content: (
            <>
              <p>
                CIBSE publishes recommended maintained illuminance values for a wide range of room
                types and tasks. These values represent the minimum average lux level that should be
                maintained on the working plane throughout the life of the installation, accounting
                for lamp depreciation and dirt accumulation on luminaires and room surfaces.
              </p>
              <p>
                The table below shows the most commonly referenced values. These are used across
                commercial, industrial, educational, healthcare, and domestic lighting designs:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
                <div className="grid grid-cols-3 gap-px bg-white/10">
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Room Type
                  </div>
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Lux Level
                  </div>
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Notes
                  </div>
                </div>
                {[
                  { room: 'General office', lux: '500', notes: 'Desk-level working plane' },
                  { room: 'Open-plan office', lux: '500', notes: 'Uniform across floor plate' },
                  { room: 'Classroom', lux: '300-500', notes: '300 general, 500 at desks' },
                  { room: 'Workshop / factory', lux: '300-500', notes: 'Depends on task detail' },
                  { room: 'Warehouse', lux: '150-200', notes: 'General storage areas' },
                  {
                    room: 'Corridor / circulation',
                    lux: '100',
                    notes: 'Minimum for safe movement',
                  },
                  { room: 'Kitchen (commercial)', lux: '500', notes: 'Food preparation areas' },
                  { room: 'Retail shop floor', lux: '300-500', notes: 'Higher for display areas' },
                  { room: 'Hospital ward', lux: '100-300', notes: '100 night, 300 day' },
                  { room: 'Domestic living room', lux: '150-300', notes: 'Task-dependent' },
                  { room: 'Domestic kitchen', lux: '300', notes: 'Worktop-level illuminance' },
                  {
                    room: 'Inspection / detail work',
                    lux: '750-1000',
                    notes: 'Close visual tasks',
                  },
                ].map((row) => (
                  <div key={row.room} className="grid grid-cols-3 gap-px bg-white/5">
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">
                      {row.room}
                    </div>
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.lux}</div>
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.notes}</div>
                  </div>
                ))}
              </div>
              <p>
                These values should be treated as minimums. Many designers specify higher levels for
                premium fit-outs or where the client has specific requirements. For{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing
                </SEOInternalLink>{' '}
                on lighting circuits, the total wattage derived from the lux calculation feeds
                directly into the circuit design.
              </p>
            </>
          ),
        },
        {
          id: 'calculation-method',
          heading: 'The Lumen Method — How to Calculate Lux',
          content: (
            <>
              <p>
                The lumen method is the standard approach for calculating the number of luminaires
                needed to achieve a target lux level. The formula is:
              </p>
              <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
                <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                  N = (E x A) / (F x UF x MF)
                </p>
                <p className="mt-3 text-sm text-white">
                  N = number of luminaires, E = required lux, A = area (m²), F = lumens per
                  luminaire, UF = utilisation factor, MF = maintenance factor
                </p>
              </div>
              <p>
                Each variable in this formula has a specific meaning and source. The required lux
                (E) comes from CIBSE or the project specification. The area (A) is the floor area of
                the room in square metres. The lumens per luminaire (F) come from the manufacturer's
                photometric data for the chosen fitting. The utilisation factor (UF) accounts for
                how efficiently light reaches the working plane, considering room shape, surface
                reflectances, and luminaire light distribution. The maintenance factor (MF) accounts
                for light loss over time due to lamp depreciation, luminaire dirt, and room surface
                deterioration.
              </p>
              <p>
                Elec-Mate's calculator handles the entire formula. You enter the room dimensions,
                select the room type, input the luminaire lumen output, and the calculator returns
                the number of fittings needed. It also calculates the achieved lux level if you want
                to check a fixed number of luminaires against the target. This pairs well with the{' '}
                <SEOInternalLink href="/tools/max-demand-calculator">
                  maximum demand calculator
                </SEOInternalLink>{' '}
                when sizing the supply for a lighting-heavy installation.
              </p>
            </>
          ),
        },
        {
          id: 'room-index',
          heading: 'Room Index and Utilisation Factor',
          content: (
            <>
              <p>
                The room index (RI or K) is a dimensionless number that describes the proportions of
                the room relative to the mounting height of the luminaires. It directly affects how
                efficiently the light from the luminaires reaches the working plane:
              </p>
              <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
                <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                  K = (L x W) / (Hm x (L + W))
                </p>
                <p className="mt-3 text-sm text-white">
                  L = room length, W = room width, Hm = mounting height above working plane (all in
                  metres)
                </p>
              </div>
              <p>
                A high room index (typically above 3) means the room is large relative to the
                mounting height — light reaches the working plane efficiently, and the utilisation
                factor is high. A low room index (below 1) means the room is small or the ceiling is
                very high — more light is lost to walls, and the utilisation factor drops.
              </p>
              <p>
                The utilisation factor (UF) is read from the luminaire manufacturer's UF table using
                the room index and the reflectance values of the ceiling, walls, and floor. Typical
                reflectance values are 70% for a white ceiling, 50% for light-coloured walls, and
                20% for the floor. Elec-Mate includes standard UF lookup values, so you select the
                room surface colours rather than looking up tables manually.
              </p>
              <p>
                Understanding room index is also important when working with{' '}
                <SEOInternalLink href="/tools/voltage-drop-calculator">
                  voltage drop calculations
                </SEOInternalLink>{' '}
                for long lighting circuit runs in large commercial spaces.
              </p>
            </>
          ),
          appBridge: {
            title: 'Room Index Calculated Automatically',
            description:
              'Enter room length, width, and luminaire mounting height. Elec-Mate calculates the room index, looks up the utilisation factor, and applies it to the lumen method — all in one step.',
            icon: Calculator,
          },
        },
        {
          id: 'maintenance-factor',
          heading: 'Maintenance Factor Explained',
          content: (
            <>
              <p>
                The maintenance factor (MF) accounts for the gradual decline in light output over
                the life of the installation. Three factors contribute to this decline:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Lamp lumen depreciation (LLD)</span> —
                  all light sources lose output over time. LED lamps typically retain 80% of their
                  initial output at their rated life (L80), giving an LLD of 0.8. Fluorescent tubes
                  may have an LLD of 0.85 at mid-life.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Luminaire maintenance factor (LMF)
                  </span>{' '}
                  — dirt accumulation on the luminaire optic, diffuser, or reflector reduces light
                  output. A clean environment (office) might give an LMF of 0.9, while a dirty
                  environment (factory, kitchen) might give 0.7.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Room surface maintenance factor (RSMF)
                  </span>{' '}
                  — walls and ceilings darken with age, reducing the amount of reflected light.
                  Typically 0.9 for clean environments and 0.8 for industrial spaces.
                </li>
              </ul>
              <p>
                The overall maintenance factor is the product of these three: MF = LLD x LMF x RSMF.
                For a typical office with LED luminaires, MF = 0.8 x 0.9 x 0.9 = 0.65. For a clean
                room with frequent maintenance, it could be 0.8 or higher. The{' '}
                <SEOInternalLink href="/tools/conduit-fill-calculator">
                  conduit fill calculator
                </SEOInternalLink>{' '}
                and lighting calculator work together when planning wiring routes for large lighting
                installations.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Select the room type',
          text: 'Choose the room type from the dropdown — office, warehouse, classroom, kitchen, corridor, etc. The CIBSE-recommended lux level is pre-populated automatically.',
        },
        {
          name: 'Enter room dimensions',
          text: 'Input the room length, width, and ceiling height in metres. The calculator determines the floor area and room index from these values.',
        },
        {
          name: 'Enter luminaire details',
          text: 'Input the lumen output per luminaire from the manufacturer data sheet. Optionally adjust the utilisation factor and maintenance factor if you have project-specific values.',
        },
        {
          name: 'Review the result',
          text: 'The calculator displays the number of luminaires required, the achieved lux level, and a layout suggestion showing rows and columns of fittings for even distribution.',
        },
        {
          name: 'Adjust and refine',
          text: 'Try different luminaire types or lux targets to optimise the design. The calculator updates instantly, letting you compare options in seconds.',
        },
      ]}
      howToHeading="How to Use the Lighting Lux Calculator"
      howToDescription="Five steps from room dimensions to a complete lighting scheme."
      features={[
        {
          icon: Sun,
          title: 'CIBSE Lux Tables Built In',
          description:
            'All CIBSE recommended lux levels for offices, warehouses, retail, schools, hospitals, kitchens, and domestic rooms are pre-loaded. Select the room type and the target lux is set automatically.',
        },
        {
          icon: Calculator,
          title: 'Instant Lumen Method Calculation',
          description:
            'Enter room dimensions and luminaire output. The calculator applies the lumen method formula and returns the number of fittings needed within seconds.',
        },
        {
          icon: Ruler,
          title: 'Room Index Calculation',
          description:
            'Automatically calculates the room index from room length, width, and mounting height. Uses the room index to look up the utilisation factor from built-in tables.',
        },
        {
          icon: Eye,
          title: 'Maintenance Factor Guidance',
          description:
            'Guides you through selecting the correct maintenance factor for the environment — clean office, normal industrial, or dirty/harsh conditions.',
        },
        {
          icon: Layers,
          title: 'Layout Suggestions',
          description:
            'Suggests luminaire spacing in rows and columns for even light distribution across the room. Helps ensure uniformity ratios are met.',
        },
        {
          icon: Shield,
          title: 'BS EN 12464-1 Compliant',
          description:
            "All calculations follow BS EN 12464-1 and CIBSE lighting guide recommendations. Part of Elec-Mate's 50+ calculators for UK electricians.",
        },
      ]}
      featuresHeading="Lighting Calculator Features"
      featuresSubheading="Everything you need to design a compliant lighting scheme on site or in the office."
      faqs={[
        {
          question: 'What lux level is required for a UK office?',
          answer:
            'CIBSE recommends 500 lux maintained illuminance at desk level for general office work. This applies to both cellular offices and open-plan offices. For areas with computer screens, glare control is also important — the luminaire UGR (Unified Glare Rating) should be 19 or less. Corridors and circulation areas within office buildings require 100 lux, while meeting rooms typically require 300-500 lux depending on the activities performed.',
        },
        {
          question: 'What is the difference between lux and lumens?',
          answer:
            'Lumens measure the total amount of visible light emitted by a light source in all directions. Lux measures the amount of light falling on a surface per square metre. The relationship is: 1 lux = 1 lumen per square metre. A 4,000 lumen luminaire illuminating a 10 m² room would produce an average of 400 lux if all the light reached the working plane (which it does not, due to losses accounted for by the utilisation factor and maintenance factor).',
        },
        {
          question: 'How do I find the lumen output of a luminaire?',
          answer:
            'The lumen output is listed on the luminaire manufacturer\'s product data sheet and is usually printed on the product packaging. For LED luminaires, look for "initial lumens" or "total luminaire lumens" — this is the light output of the complete fitting, not just the LED chip. Some manufacturers quote LED chip lumens, which is higher than the luminaire output because of optical losses in the diffuser or lens. Always use the luminaire (fitting) lumen value for calculations.',
        },
        {
          question: 'What maintenance factor should I use for LED lighting?',
          answer:
            'For LED luminaires in a clean indoor environment (office, retail, school), a maintenance factor of 0.8 is commonly used. This accounts for LED lumen depreciation to L80 (80% of initial output at rated life) and a moderate level of dirt accumulation. For dirtier environments such as industrial workshops or commercial kitchens, use 0.65 to 0.7. For very clean environments with regular cleaning schedules, 0.85 may be appropriate. CIBSE publishes detailed guidance in the SLL Lighting Handbook.',
        },
        {
          question: 'Can I use the lux calculator for emergency lighting?',
          answer:
            'The lux calculator can be used to check emergency lighting illuminance levels. BS 5266-1 requires a minimum of 1 lux along escape routes (measured at floor level on the centre line) and 0.5 lux in open areas. For high-risk task areas, the emergency lighting must provide 10% of the normal illuminance or 15 lux, whichever is greater. You would set the target lux to the emergency requirement and use only the emergency luminaires in the calculation.',
        },
        {
          question: 'What is uniformity ratio in lighting design?',
          answer:
            'Uniformity ratio is the ratio of the minimum illuminance to the average illuminance across the working plane. BS EN 12464-1 requires a minimum uniformity ratio of 0.6 for task areas and 0.4 for surrounding areas. A uniformity ratio of 1.0 would mean perfectly even light — which is practically impossible. Good luminaire spacing and the correct number of fittings help achieve acceptable uniformity. The Elec-Mate calculator suggests luminaire spacing to help you meet these ratios.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'Size cables for lighting circuits using BS 7671 current-carrying capacity tables and correction factors.',
          icon: Calculator,
          category: 'Calculators',
        },
        {
          href: '/tools/voltage-drop-calculator',
          title: 'Voltage Drop Calculator',
          description:
            'Check voltage drop on long lighting circuit runs to ensure lamps operate at their rated voltage.',
          icon: Zap,
          category: 'Calculators',
        },
        {
          href: '/tools/max-demand-calculator',
          title: 'Maximum Demand Calculator',
          description:
            'Calculate total maximum demand including lighting loads with IET diversity allowances.',
          icon: BarChart3,
          category: 'Calculators',
        },
        {
          href: '/tools/conduit-fill-calculator',
          title: 'Conduit Fill Calculator',
          description:
            'Size conduit for lighting circuit cables using the cable factor method to BS 7671.',
          icon: Ruler,
          category: 'Calculators',
        },
        {
          href: '/tools/electrical-testing-calculators',
          title: 'All Electrical Calculators',
          description:
            '50+ BS 7671 calculators for cable sizing, Zs verification, voltage drop, and more.',
          icon: Calculator,
          category: 'Tools',
        },
        {
          href: '/guides/emergency-lighting-certificate',
          title: 'Emergency Lighting Certificate',
          description:
            'Complete emergency lighting certificates with built-in BS 5266-1 compliance checks.',
          icon: FileCheck2,
          category: 'Certificates',
        },
      ]}
      ctaHeading="Calculate lux levels in seconds"
      ctaSubheading="Join UK electricians using Elec-Mate's 50+ calculators on every job. 7-day free trial, cancel anytime."
      toolPath="/tools/lighting-lux-calculator"
    />
  );
}
