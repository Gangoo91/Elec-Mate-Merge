import { Card, CardContent } from '@/components/ui/card';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { CheckCircle } from 'lucide-react';

const coreCertifications = [
  {
    title: '18th Edition BS 7671 (Wiring Regulations)',
    provider: 'City & Guilds 2382 / EAL',
    cost: '£400–£600',
    duration: '3–5 days',
    validity: 'Current — update required when new edition published (expected mid-2030s)',
    renewalRequired: false,
    prerequisites: 'No formal prerequisites — but basic electrical knowledge strongly recommended',
    description:
      'The foundation of all UK electrical work. Covers the requirements of BS 7671:2018+A2:2022 for the design, erection, and verification of electrical installations. Mandatory for anyone carrying out electrical work.',
  },
  {
    title: 'AM2 Practical Assessment',
    provider: 'JTL / NET',
    cost: '£300–£450',
    duration: '1 day',
    validity: 'Lifetime — no renewal required',
    renewalRequired: false,
    prerequisites: 'Completion of Level 3 Electrical Installation apprenticeship or equivalent',
    description:
      'End-point practical assessment for electrical apprenticeships. Tests real-world installation skills including wiring, termination, and safe isolation under timed conditions.',
  },
  {
    title: 'Part P Building Regulations',
    provider: 'Various providers',
    cost: '£200–£350',
    duration: '1–2 days',
    validity: 'Lifetime knowledge — scheme membership renewed annually',
    renewalRequired: false,
    prerequisites: '18th Edition certificate recommended',
    description:
      'Understanding of the building regulations governing electrical work in dwellings. Required knowledge for domestic electrical installers in England and Wales.',
  },
  {
    title: '2391 Inspection & Testing',
    provider: 'City & Guilds 2391-52',
    cost: '£900–£1,400',
    duration: '5–7 days',
    validity: 'No expiry — CPD required',
    renewalRequired: false,
    prerequisites: '18th Edition certificate + 2–3 years practical experience recommended',
    description:
      'Qualification for initial verification and periodic inspection of electrical installations. Essential for producing EICRs and electrical installation certificates. A qualification, not a licence — does not expire.',
  },
  {
    title: 'PAT Testing (In-Service Inspection & Testing)',
    provider: 'City & Guilds 2377 / EAL',
    cost: '£200–£400',
    duration: '1–2 days',
    validity: 'No expiry — CPD recommended',
    renewalRequired: false,
    prerequisites: 'Basic electrical knowledge — no formal prerequisites',
    description:
      'Portable appliance testing qualification covering visual inspection, earth continuity, insulation resistance, and functional checks. Widely required in commercial and industrial environments. Good entry-level certification with steady demand.',
  },
];

const specialistCategories = [
  {
    category: 'Electric Vehicle Charging',
    growth: '45%',
    certs: [
      {
        name: 'City & Guilds 2919 (EV Charging)',
        cost: '£400–£600',
        duration: '2 days',
      },
      {
        name: 'Smart Charging & Load Management',
        cost: '£300–£500',
        duration: '1 day',
      },
      {
        name: 'EV Infrastructure Certification',
        cost: '£500–£800',
        duration: '2–3 days',
        note: 'Note: The OZEV Electric Vehicle Homecharge Scheme (EVHS) closed in March 2024. Current EV certification focuses on IET Code of Practice for EV Charging Equipment Installation.',
      },
    ],
  },
  {
    category: 'Battery Storage (BESS)',
    growth: '42%',
    certs: [
      {
        name: 'MCS Approved Battery Storage',
        cost: '£600–£1,000',
        duration: '3 days',
      },
      {
        name: 'G99/G100 Grid Connection',
        cost: '£400–£600',
        duration: '1–2 days',
      },
    ],
  },
  {
    category: 'Heat Pumps',
    growth: '38%',
    certs: [
      {
        name: 'MCS Approved Heat Pump Installation',
        cost: '£800–£1,200',
        duration: '3–5 days',
      },
      {
        name: 'F-Gas Handling Certification',
        cost: '£500–£800',
        duration: '2–3 days',
      },
    ],
  },
  {
    category: 'Solar PV',
    growth: 'Established',
    certs: [
      {
        name: 'Solar PV Installation',
        cost: '£800–£1,200',
        duration: '5 days',
      },
      {
        name: 'City & Guilds 2399 (PV Design)',
        cost: '£600–£900',
        duration: '3 days',
      },
    ],
  },
  {
    category: 'Fire Detection & Alarm Systems',
    growth: '20%',
    certs: [
      {
        name: 'BS 5839 Fire Detection & Alarm (FD&A)',
        cost: '£600–£1,000',
        duration: '3–5 days',
      },
      {
        name: 'Emergency Lighting (BS 5266)',
        cost: '£400–£700',
        duration: '2–3 days',
      },
      {
        name: 'Fire Alarm Commissioning & Maintenance',
        cost: '£500–£800',
        duration: '2–3 days',
        note: 'Required for commercial and industrial fire alarm maintenance contracts. Strong demand from facilities management companies.',
      },
    ],
  },
  {
    category: 'High Voltage',
    growth: 'Premium rates',
    certs: [
      {
        name: 'HV Switching Operations',
        cost: '£2,000–£3,500',
        duration: '3–5 days',
      },
      {
        name: 'HV Cable Jointing',
        cost: '£3,500–£5,500',
        duration: '5–10 days',
      },
    ],
  },
  {
    category: 'Data Centres',
    growth: '35%',
    certs: [
      {
        name: 'CDCDP (Certified Data Centre Design Professional)',
        cost: '£2,000–£3,500',
        duration: '5 days',
      },
      {
        name: 'UPS Systems & Power Distribution',
        cost: '£800–£1,500',
        duration: '3 days',
      },
      {
        name: 'Raised Floor & Containment Systems',
        cost: '£500–£800',
        duration: '2 days',
        note: 'Data centres are one of the fastest-growing sectors in the UK. Hyperscale facilities along the M4/M62 corridors are creating thousands of specialist electrical roles.',
      },
    ],
  },
  {
    category: 'Industrial & Automation',
    growth: 'Steady',
    certs: [
      {
        name: 'PLC Programming (Siemens/AB)',
        cost: '£1,500–£3,000',
        duration: '5 days',
      },
      {
        name: 'Motor Control Systems',
        cost: '£800–£1,200',
        duration: '3 days',
      },
    ],
  },
];

const competentPersonSchemes = [
  {
    name: 'NICEIC',
    cost: '£500–£900/year',
    description:
      'The most widely recognised competent person scheme in the UK. Offers Domestic Installer and Approved Contractor registration. Rigorous assessment process builds strong customer trust.',
    benefits: [
      'High consumer recognition',
      'Self-certification of Part P work',
      'Technical helpline',
      'Regular assessment ensures standards',
    ],
  },
  {
    name: 'NAPIT',
    cost: '£400–£750/year',
    description:
      'Multi-trade competent person scheme offering registration across electrical, plumbing, heating, and ventilation. Competitive pricing with comprehensive support.',
    benefits: [
      'Multi-trade registration options',
      'Self-certification of Part P work',
      'Online reporting portal',
      'Training and CPD support',
    ],
  },
  {
    name: 'Stroma',
    cost: '£400–£650/year',
    description:
      'Competent person scheme covering electrical, gas, and building control certification. Formerly separate schemes now consolidated under the Stroma brand. Good option for multi-skilled installers.',
    benefits: [
      'Electrical, gas, and building control',
      'Self-certification of Part P work',
      'Competitive annual fees',
      'Combined multi-discipline registration',
    ],
  },
];

const Certifications = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Certifications & Qualifications
        </h1>
      </div>

      {/* Intro */}
      <Card className="border-yellow-500/20 bg-white/5">
        <CardContent className="p-4">
          <p className="text-white text-sm leading-relaxed">
            The right certifications open doors to higher pay, specialist work, and career
            progression. This guide covers everything from essential qualifications to specialist
            certifications and competent person scheme membership.
          </p>
        </CardContent>
      </Card>

      {/* Core Certifications */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <h2 className="text-base font-semibold text-white">Core Certifications</h2>
      </div>

      <div className="space-y-3">
        {coreCertifications.map((cert) => (
          <Card key={cert.title} className="border-yellow-500/20 bg-white/5">
            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold text-yellow-400 text-sm">{cert.title}</h3>
              <p className="text-white text-sm leading-relaxed">{cert.description}</p>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs font-semibold">Provider:</span>
                  <span className="text-white text-xs">{cert.provider}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs font-semibold">Cost:</span>
                  <span className="text-white text-xs">{cert.cost}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs font-semibold">Duration:</span>
                  <span className="text-white text-xs">{cert.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs font-semibold">Validity:</span>
                  <span className="text-white text-xs">{cert.validity}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white text-xs font-semibold flex-shrink-0">
                    Prerequisites:
                  </span>
                  <span className="text-white text-xs">{cert.prerequisites}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Specialist Certifications */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-400" />
        <h2 className="text-base font-semibold text-white">Specialist Certifications</h2>
      </div>

      <div className="space-y-3">
        {specialistCategories.map((cat) => (
          <Card key={cat.category} className="border-blue-500/20 bg-white/5">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-blue-400 text-sm">{cat.category}</h3>
                <span className="text-xs font-medium text-white bg-blue-500/20 border border-blue-500/30 rounded-full px-2 py-0.5">
                  {cat.growth} growth
                </span>
              </div>

              <div className="space-y-2">
                {cat.certs.map((cert) => (
                  <div
                    key={cert.name}
                    className="p-3 bg-white/5 border border-white/10 rounded-lg space-y-1"
                  >
                    <p className="text-white text-sm font-medium">{cert.name}</p>
                    <div className="flex items-center gap-3 text-xs text-white">
                      <span>{cert.cost}</span>
                      <span>·</span>
                      <span>{cert.duration}</span>
                    </div>
                    {'note' in cert && cert.note && (
                      <p className="text-white text-xs leading-relaxed mt-1">{cert.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Competent Person Schemes */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <h2 className="text-base font-semibold text-white">Competent Person Schemes</h2>
      </div>

      <div className="space-y-3">
        {competentPersonSchemes.map((scheme) => (
          <Card key={scheme.name} className="border-green-500/20 bg-white/5">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-green-400">{scheme.name}</h3>
                <span className="text-xs font-medium text-white bg-green-500/20 border border-green-500/30 rounded-full px-2 py-0.5">
                  {scheme.cost}
                </span>
              </div>
              <p className="text-white text-sm leading-relaxed">{scheme.description}</p>
              <ul className="space-y-1">
                {scheme.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-white">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certification Planning Strategy */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-purple-400" />
        <h2 className="text-base font-semibold text-white">Certification Planning Strategy</h2>
      </div>

      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <ul className="space-y-2">
            {[
              'Start with core certifications — 18th Edition and AM2 are your foundation',
              'Add the 2391 once you have 2–3 years of practical experience',
              'Consider PAT Testing early — it is quick, affordable, and in steady demand',
              'Choose specialist certifications based on your local market demand',
              'Fire alarm (BS 5839) and emergency lighting (BS 5266) are valuable additions for commercial work',
              'Check if your employer will fund training — many will cover all or part of the cost',
              'Book courses well in advance — popular ones fill up months ahead',
              'Keep a CPD log of all training and development activities',
              'Join a competent person scheme once you are working independently',
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Certification Order Guide */}
      <Card className="border-yellow-500/20 bg-yellow-500/5">
        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-yellow-400 text-sm">Recommended Certification Order</h3>
          <p className="text-white text-sm leading-relaxed">
            Year 1–3: 18th Edition + AM2 + Part P. Year 3–5: 2391 + PAT Testing + first specialist
            cert (EV, Solar, or Fire Alarm). Year 5+: Advanced specialisms (BESS, HV, Data Centres,
            PLC) + competent person scheme. This gives you the widest range of opportunities while
            building on solid foundations.
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4">
          <p className="text-white text-xs leading-relaxed">
            Certification costs and durations are indicative and vary by provider and location.
            Check with approved training providers for current pricing. Validity information is
            correct as of BS 7671:2018+A2:2022.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Certifications;
