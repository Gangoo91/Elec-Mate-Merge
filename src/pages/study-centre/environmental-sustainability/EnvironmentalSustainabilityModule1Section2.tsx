import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Shield,
  Scale,
  Leaf,
  Wind,
  Droplets,
  Bug,
  AlertTriangle,
  FileText,
  HardHat,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick Check Questions (3)                                         */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'epa-duty-of-care',
    question:
      'Under Part II of the Environmental Protection Act 1990, what does the "duty of care" require of anyone who produces, imports, keeps, stores, transports, treats, or disposes of controlled waste?',
    options: [
      'They must notify the local council within 7 days of producing any waste',
      'They must take all reasonable measures to prevent the unauthorised deposit, treatment, or disposal of waste and ensure it is transferred only to an authorised person',
      'They must personally transport all waste to the nearest licensed landfill site',
      'They must pay a flat-rate environmental levy for each tonne of waste produced',
    ],
    correctIndex: 1,
    explanation:
      'Section 34 of the Environmental Protection Act 1990 imposes a duty of care on anyone in the waste chain. This requires them to take all reasonable measures to prevent the escape of waste from their control, ensure waste is transferred only to an authorised person (a registered waste carrier), and provide an accurate written description of the waste via a waste transfer note. Breach of the duty of care is a criminal offence with unlimited fines.',
  },
  {
    id: 'environment-act-2021-oep',
    question:
      'What is the primary role of the Office for Environmental Protection (OEP), established under the Environment Act 2021?',
    options: [
      'To issue planning permission for construction projects near SSSIs',
      'To act as an independent watchdog scrutinising government environmental governance and enforcing environmental law',
      'To manage the licensing of waste carriers across England and Wales',
      'To fund local authority recycling programmes through central government grants',
    ],
    correctIndex: 1,
    explanation:
      'The Office for Environmental Protection (OEP) was established by the Environment Act 2021 as an independent, statutory body. Its primary role is to scrutinise environmental governance, investigate complaints about public authorities failing to comply with environmental law, and take enforcement action where necessary. It replaced the oversight role previously held by the European Commission before the United Kingdom left the European Union.',
  },
  {
    id: 'hazardous-waste-consignment',
    question:
      'Under the Hazardous Waste Regulations 2005, what document must accompany every movement of hazardous waste from a premises?',
    options: [
      'A waste transfer note signed by both parties',
      'A consignment note containing a unique code, full waste description, and details of the producer, carrier, and consignee',
      'A COSHH assessment signed by the site manager',
      'An Environment Agency permit application form',
    ],
    correctIndex: 1,
    explanation:
      'The Hazardous Waste Regulations 2005 require that every movement of hazardous waste is accompanied by a consignment note. This must contain a unique consignment note code, a full description of the waste including its European Waste Catalogue (EWC) code, details of the waste producer, the registered carrier, and the receiving facility (consignee). Consignment notes must be retained for a minimum of three years. This system provides a complete audit trail for hazardous waste from cradle to grave.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'How does the Environment Act 2021 replace the environmental protections that were previously provided by EU membership?',
    answer:
      'When the United Kingdom left the European Union, it lost the oversight of the European Commission, which had the power to take enforcement action against EU member states for breaching environmental law. The Environment Act 2021 addresses this governance gap by establishing the Office for Environmental Protection (OEP) as an independent domestic watchdog with the power to investigate complaints, issue decision notices, and bring legal proceedings against public authorities in England that fail to comply with environmental law. The Act also sets legally binding long-term environmental targets for air quality, water, biodiversity, and resource efficiency — areas previously governed by EU directives such as the Water Framework Directive and the Habitats Directive. Additionally, the Act introduced the requirement for Environmental Improvement Plans (EIPs), with the first 25-Year Environment Plan published in 2018 and placed on a statutory footing by the 2021 Act. The intention is to ensure that environmental standards are maintained or strengthened post-Brexit, rather than being weakened in the absence of EU oversight.',
  },
  {
    question:
      'What is the difference between a standard rules permit and a bespoke permit under the Environmental Permitting Regulations 2016?',
    answer:
      'The Environmental Permitting (England and Wales) Regulations 2016 provide two main permit routes. A standard rules permit is a pre-defined set of conditions published by the Environment Agency that covers common, lower-risk activities. Operators apply using a simplified process and must comply with the fixed set of rules — they cannot negotiate bespoke conditions. Standard rules permits are quicker and cheaper to obtain (typically costing between 750 and 1,600 pounds in application fees) and are suitable for straightforward operations such as small-scale waste storage or certain water discharge activities. A bespoke permit, by contrast, is individually tailored to the specific site, operation, and risk profile. The Environment Agency assesses the application, consults with stakeholders, and sets conditions specific to that operation. Bespoke permits are required for higher-risk activities, complex operations, or where standard rules do not cover the particular activity. They cost significantly more (application fees can exceed 10,000 pounds for complex installations) and take longer to process, but they allow operators to propose site-specific controls that may be more practical than the generic standard rules.',
  },
  {
    question:
      'How does the Construction (Design and Management) Regulations 2015 interface with environmental legislation on construction sites?',
    answer:
      'CDM 2015 does not directly regulate environmental matters, but there are significant overlaps. The principal designer must ensure that pre-construction information includes details of environmental constraints and hazards — for example, the presence of protected species, asbestos in existing structures, contaminated land, or proximity to controlled waters. Design decisions made under CDM 2015 can have major environmental implications: specifying materials, planning demolition sequences, and designing drainage all affect environmental compliance. The construction phase plan required under CDM 2015 should integrate environmental management measures including dust suppression, noise control, pollution prevention, and waste management. The principal contractor must coordinate these measures across all contractors on site. In practice, many construction projects now prepare a combined Construction Environmental Management Plan (CEMP) that satisfies both CDM 2015 requirements and environmental permit or planning conditions. Failure to consider environmental law during the design and planning stages can result in project delays, enforcement action from the Environment Agency or Natural England, and criminal prosecution under legislation such as the Environmental Protection Act 1990 or the Wildlife and Countryside Act 1981.',
  },
  {
    question:
      'What are the penalties for polluting controlled waters under the Water Resources Act 1991?',
    answer:
      'Under Section 85 of the Water Resources Act 1991 (as amended), it is an offence to cause or knowingly permit any poisonous, noxious, or polluting matter, or any solid waste matter, to enter any controlled waters. Controlled waters include rivers, streams, lakes, groundwater, estuaries, and coastal waters out to three nautical miles. The offence carries severe penalties: on summary conviction in the magistrates court, the maximum fine is unlimited (previously capped at 20,000 pounds but raised to unlimited by the Legal Aid, Sentencing and Punishment of Offenders Act 2012). On conviction on indictment in the Crown Court, the penalty is an unlimited fine and/or imprisonment for up to five years. The Environment Agency actively prosecutes water pollution offences. Notable prosecutions include Thames Water being fined 20.3 million pounds in 2017 for multiple sewage pollution incidents and Southern Water being fined 90 million pounds in 2021 for deliberately dumping raw sewage into protected waters. For construction and electrical contractors, the most common risks involve diesel spills from plant, cement washings entering watercourses, dewatering activities that mobilise silt, and improper storage of oils, chemicals, or waste materials near watercourses.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz Questions (8)                                                */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Which part of the Environmental Protection Act 1990 deals specifically with waste on land?',
    options: [
      'Part I — Integrated Pollution Control',
      'Part II — Waste on Land',
      'Part III — Statutory Nuisances',
      'Part IV — Litter',
    ],
    correctAnswer: 1,
    explanation:
      'Part II of the Environmental Protection Act 1990 deals with waste on land. It establishes the licensing regime for waste management, the duty of care for waste (Section 34), and the offence of unauthorised or harmful depositing, treatment, or disposal of waste (Section 33). Part I covers integrated pollution control and air pollution control. Part III addresses statutory nuisances such as noise and odours.',
  },
  {
    id: 2,
    question:
      'The Environment Act 2021 introduced a requirement for biodiversity net gain in planning. What is the minimum percentage net gain required?',
    options: [
      '5% net gain',
      '10% net gain',
      '15% net gain',
      '20% net gain',
    ],
    correctAnswer: 1,
    explanation:
      'The Environment Act 2021 introduced a mandatory requirement for a minimum 10% biodiversity net gain (BNG) as a condition of most planning permissions in England. This means that development must leave biodiversity in a measurably better state than before the development took place. The requirement became mandatory for major developments from February 2024 and for smaller developments from April 2024. Developers must submit a biodiversity gain plan and can achieve net gain through on-site habitat creation, off-site habitat creation, or purchasing statutory biodiversity credits.',
  },
  {
    id: 3,
    question:
      'Under the Clean Air Act 1993, what is a "smoke control area" and what restriction does it impose?',
    options: [
      'An area where only electric vehicles are permitted',
      'An area where local authorities can restrict the emission of smoke from chimneys by prohibiting the burning of unauthorised fuels',
      'An area within 500 metres of a hospital where all emissions are banned',
      'An area designated by the Environment Agency for continuous air quality monitoring',
    ],
    correctAnswer: 1,
    explanation:
      'Under Section 18 of the Clean Air Act 1993, local authorities can declare smoke control areas in which it is an offence to emit smoke from a chimney of a building, or from a chimney serving a furnace of any fixed boiler or industrial plant, unless an authorised fuel is being burned or an exempt appliance is being used. The penalty for emitting smoke in a smoke control area is a fine of up to 1,000 pounds. Smoke control areas were first introduced under the Clean Air Act 1956 following the Great Smog of London in 1952.',
  },
  {
    id: 4,
    question:
      'What does Section 85 of the Water Resources Act 1991 make it an offence to do?',
    options: [
      'Abstract water from a river without a licence',
      'Discharge trade effluent into a public sewer without consent',
      'Cause or knowingly permit poisonous, noxious, or polluting matter to enter controlled waters',
      'Fail to report a water leak to the water undertaker within 24 hours',
    ],
    correctAnswer: 2,
    explanation:
      'Section 85 of the Water Resources Act 1991 creates the principal water pollution offence in England and Wales. It makes it a criminal offence to cause or knowingly permit any poisonous, noxious, or polluting matter, or any solid waste matter, to enter controlled waters (rivers, lakes, groundwater, estuaries, and coastal waters). The offence carries an unlimited fine and/or up to five years imprisonment on indictment. This section is the most commonly used provision for prosecuting water pollution incidents.',
  },
  {
    id: 5,
    question:
      'Under the Wildlife and Countryside Act 1981, what is a Site of Special Scientific Interest (SSSI)?',
    options: [
      'A site designated by the local planning authority for future industrial development',
      'A site designated by the Health and Safety Executive as requiring special safety precautions',
      'An area of land notified by Natural England as being of special interest by reason of its flora, fauna, geological, or physiographical features',
      'A construction site where archaeological remains have been discovered',
    ],
    correctAnswer: 2,
    explanation:
      'Under Section 28 of the Wildlife and Countryside Act 1981 (as amended by the Countryside and Rights of Way Act 2000), Natural England has the power to notify areas of land as Sites of Special Scientific Interest (SSSIs) where they are of special interest by reason of their flora, fauna, geological, or physiographical features. There are over 4,100 SSSIs in England, covering approximately 8% of the land area. Owners and occupiers of SSSI land must obtain consent from Natural England before carrying out any operations likely to damage the special features of the site.',
  },
  {
    id: 6,
    question:
      'What is the "mixing prohibition" under the Hazardous Waste Regulations 2005?',
    options: [
      'A prohibition on mixing hazardous waste with non-hazardous waste or with other categories of hazardous waste, unless permitted by an environmental permit',
      'A prohibition on mixing different types of recyclable materials in the same container',
      'A prohibition on combining waste from different construction sites in the same skip',
      'A prohibition on transporting more than one type of waste in the same vehicle',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 19 of the Hazardous Waste Regulations 2005 prohibits the mixing of hazardous waste with non-hazardous waste, and the mixing of different categories of hazardous waste with each other, unless the mixing is carried out under an environmental permit that specifically authorises it. The purpose of the mixing prohibition is to prevent dangerous chemical reactions, to maintain the treatability of waste streams, and to ensure that hazardous waste can be properly characterised and managed through to final disposal. On construction sites, this means that hazardous waste such as asbestos, lead paint, waste oils, and fluorescent tubes must be segregated from each other and from general construction waste.',
  },
  {
    id: 7,
    question:
      'Under the Environmental Permitting Regulations 2016, which of the following activities would typically require an environmental permit?',
    options: [
      'Installing a domestic consumer unit in a residential property',
      'Operating a waste transfer station, discharging trade effluent to a watercourse, or operating a regulated industrial installation',
      'Carrying out a periodic inspection and test on an existing electrical installation',
      'Purchasing construction materials from a builders merchant',
    ],
    correctAnswer: 1,
    explanation:
      'The Environmental Permitting (England and Wales) Regulations 2016 require an environmental permit for a wide range of activities including waste operations (storage, treatment, recovery, and disposal of waste), water discharge activities (discharging to surface water or groundwater), groundwater activities, radioactive substances activities, and certain industrial installations falling under the Industrial Emissions Directive. The permit system replaced the previous separate regimes for waste management licensing and water discharge consents, creating a single permitting framework administered by the Environment Agency.',
  },
  {
    id: 8,
    question:
      'How should the principal designer under CDM 2015 address environmental constraints when preparing pre-construction information?',
    options: [
      'Environmental constraints are not relevant to CDM 2015 and should be ignored',
      'Environmental constraints should be delegated entirely to the client with no further action',
      'Pre-construction information should identify environmental hazards and constraints including protected species, contaminated land, asbestos, proximity to watercourses, and planning conditions relating to environmental management',
      'Environmental constraints only need to be considered if the project value exceeds 500,000 pounds',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 12 of CDM 2015 requires the principal designer to plan, manage, and monitor the pre-construction phase and to prepare pre-construction information that includes all information relevant to the health and safety of the construction work. Environmental hazards and constraints directly affect the health and safety of the project — for example, contaminated land poses risks to workers, asbestos in existing buildings requires specialist removal, and protected species may require ecological surveys and mitigation that affect the construction programme. The pre-construction information package should identify these constraints so that designers can eliminate or reduce risks through design decisions and contractors can plan their work accordingly.',
  },
];

/* ================================================================== */
/*  Component                                                         */
/* ================================================================== */
export default function EnvironmentalSustainabilityModule1Section2() {
  useSEO({
    title: 'Key Environmental Legislation | Environmental & Sustainability Module 1.2',
    description:
      'Comprehensive guide to UK environmental legislation for the construction and electrical industries — Environmental Protection Act 1990, Environment Act 2021, Clean Air Act 1993, Water Resources Act 1991, Wildlife and Countryside Act 1981, Hazardous Waste Regulations 2005, Environmental Permitting Regulations 2016, and CDM 2015 overlap.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <Scale className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-400 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Key Environmental Legislation
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the principal UK statutes and regulations that govern environmental
            protection, pollution control, waste management, water quality, wildlife protection,
            and how they apply to the construction and electrical industries
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>8 key pieces</strong> of legislation covering pollution, waste, water, air, wildlife, and hazardous materials
              </li>
              <li>
                <strong>Environment Act 2021:</strong> post-Brexit framework with binding targets and new watchdog (OEP)
              </li>
              <li>
                <strong>Penalties:</strong> unlimited fines and up to 5 years imprisonment for serious offences
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400/90 text-base font-medium mb-2">Key Principles</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Polluter pays:</strong> those who cause pollution bear the cost of managing it
              </li>
              <li>
                <strong>Duty of care:</strong> legal obligation on everyone who handles waste
              </li>
              <li>
                <strong>Precautionary principle:</strong> act to prevent harm even without full scientific certainty
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify and describe the key provisions of the Environmental Protection Act 1990 including Parts I, II, and III',
              'Explain the role of the Environment Act 2021 and the Office for Environmental Protection',
              'Describe the controls on air pollution under the Clean Air Act 1993',
              'Outline the water pollution offences under the Water Resources Act 1991',
              'Explain the protections provided by the Wildlife and Countryside Act 1981 and their implications for construction',
              'Describe the requirements of the Hazardous Waste Regulations 2005 including consignment notes and the mixing prohibition',
              'Distinguish between standard rules permits and bespoke permits under the Environmental Permitting Regulations 2016',
              'Explain how CDM 2015 interfaces with environmental legislation during the design and construction phases',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/* Section 01 — Environmental Protection Act 1990               */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">01</span>
            Environmental Protection Act 1990
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Environmental Protection Act 1990 (EPA 1990) is one of the most important pieces of
                environmental legislation in the United Kingdom. It established the fundamental
                framework for pollution control and waste management in England, Scotland, and Wales.
                The Act was a landmark statute that consolidated and strengthened previous environmental
                controls, and it remains in force today — although many of its provisions have been
                amended by subsequent legislation including the Environment Act 1995 and the
                Environment Act 2021.
              </p>

              <p>
                The EPA 1990 is divided into several parts, three of which are of primary importance
                for anyone working in the construction and electrical industries:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Part I — Integrated Pollution Control (IPC)</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Part I introduced a system of integrated pollution control for the most polluting
                    industrial processes. Under IPC, operators of &ldquo;prescribed processes&rdquo;
                    (such as chemical works, power stations, waste incinerators, and large industrial
                    installations) were required to obtain authorisation from the relevant regulator
                    before commencing operations. The system required operators to use the{' '}
                    <strong className="text-white">Best Available Techniques Not Entailing Excessive Cost (BATNEEC)</strong>{' '}
                    to prevent or minimise pollution released to air, water, and land.
                  </p>
                  <p>
                    Part I has been largely superseded by the Environmental Permitting (England and
                    Wales) Regulations 2016 for installations in England and Wales, which implemented
                    the EU Industrial Emissions Directive. However, the principle of integrated
                    pollution prevention and control that Part I established remains the foundation of
                    the modern environmental permitting regime.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Part II — Waste on Land</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Part II is the cornerstone of waste management law in England and Wales. It
                    establishes the licensing system for waste management activities and creates key
                    criminal offences relating to waste. The most important provisions include:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Section 33 — Prohibition on unauthorised depositing of waste:</strong>{' '}
                        It is an offence to deposit controlled waste, or knowingly cause or knowingly
                        permit controlled waste to be deposited, in or on any land unless a waste
                        management licence or environmental permit authorises the deposit. This section
                        targets fly-tipping and unauthorised waste disposal. The maximum penalty on
                        indictment is an unlimited fine and/or five years imprisonment
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Section 34 — Duty of care:</strong>{' '}
                        This imposes a duty of care on anyone who imports, produces, carries, keeps,
                        treats, or disposes of controlled waste, or as a broker has control of such
                        waste. They must take all reasonable measures to prevent the unauthorised or
                        harmful deposit, treatment, or disposal of waste; prevent the escape of waste
                        from their control; ensure that waste is transferred only to an authorised
                        person; and ensure that a written description of the waste accompanies it on
                        transfer (a waste transfer note). Breach of the duty of care carries an
                        unlimited fine
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Section 34A — Fixed penalty notices:</strong>{' '}
                        Introduced by the Clean Neighbourhoods and Environment Act 2005, this section
                        allows enforcement officers to issue fixed penalty notices for breaches of the
                        duty of care, particularly for the failure to produce waste transfer notes on
                        demand. The fixed penalty amount is 300 pounds
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Part III — Statutory Nuisances</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Part III gives local authorities the power to deal with statutory nuisances.
                    A statutory nuisance is defined as a matter that is either{' '}
                    <strong className="text-white">prejudicial to health</strong> or{' '}
                    <strong className="text-white">a nuisance</strong> and falls within one of the
                    categories listed in Section 79. These categories include:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Any premises in such a state as to be prejudicial to health or a nuisance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Smoke emitted from premises so as to be prejudicial to health or a nuisance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Fumes or gases emitted from premises so as to be prejudicial to health or a nuisance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Dust, steam, smell, or other effluvia arising on industrial, trade, or business premises</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Noise emitted from premises or from vehicles, machinery, or equipment in a street</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Artificial light emitted from premises so as to be prejudicial to health or a nuisance</span>
                    </li>
                  </ul>
                  <p>
                    When a local authority is satisfied that a statutory nuisance exists, it must serve
                    an <strong className="text-white">abatement notice</strong> under Section 80,
                    requiring the responsible person to abate the nuisance and/or prohibit its
                    recurrence. Failure to comply with an abatement notice is a criminal offence,
                    carrying a fine of up to 20,000 pounds for industrial, trade, or business premises
                    (5,000 pounds for other premises). Construction site noise is one of the most
                    common triggers for statutory nuisance complaints.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">For Electricians &amp; Contractors:</strong>{' '}
                  The EPA 1990 affects you directly. When you produce waste on a construction site
                  (cable offcuts, packaging, old components, fluorescent tubes, batteries), you are a
                  waste producer and the duty of care under Section 34 applies to you. You must ensure
                  waste is described accurately, stored securely, and handed over only to a registered
                  waste carrier with the correct documentation. If waste from your work ends up being
                  fly-tipped because you failed to check the carrier&rsquo;s credentials, you could
                  face prosecution under both Section 33 and Section 34.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 02 — Environment Act 2021                            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">02</span>
            Environment Act 2021
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Environment Act 2021 received Royal Assent on 9 November 2021 and represents the
                most significant piece of environmental legislation in the United Kingdom since the
                Environment Act 1995. It was designed to provide a new domestic environmental
                governance framework following the United Kingdom&rsquo;s departure from the European
                Union, ensuring that environmental standards would not be weakened in the absence of
                EU oversight mechanisms.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Office for Environmental Protection (OEP)</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Part 1 of the Act establishes the <strong className="text-white">Office for Environmental Protection (OEP)</strong>{' '}
                    as an independent, statutory body with the power to:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Scrutinise and advise on the implementation of environmental law by government and public authorities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Receive and investigate complaints from members of the public about failures by public authorities to comply with environmental law</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Issue information notices requiring public authorities to provide information about their compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Issue decision notices setting out its findings and recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Take enforcement action through the courts, including applying for judicial review and environmental review</span>
                    </li>
                  </ul>
                  <p>
                    The OEP became operational on 24 January 2022 and is headquartered in Worcester.
                    It fulfils the environmental oversight role previously held by the European
                    Commission for the United Kingdom.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Legally Binding Environmental Targets</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Part 1 also requires the Secretary of State to set legally binding long-term
                    environmental targets in at least four priority areas:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">Air quality</strong> — including a target for fine particulate matter (PM2.5) concentrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">Water</strong> — targets for the ecological and chemical status of water bodies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">Biodiversity</strong> — including halting species decline by 2030</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">Resource efficiency and waste reduction</strong> — including reducing residual waste per capita</span>
                    </li>
                  </ul>
                  <p>
                    The Environmental Targets (Fine Particulate Matter) (England) Regulations 2023
                    set a legally binding target for annual mean PM2.5 concentrations to not exceed
                    10 micrograms per cubic metre by 31 December 2040.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Biodiversity Net Gain (BNG)</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Schedule 7A of the Town and Country Planning Act 1990 (inserted by the
                    Environment Act 2021) introduces a mandatory requirement for{' '}
                    <strong className="text-white">10% biodiversity net gain</strong> as a condition
                    of most planning permissions in England. This means that the post-development
                    biodiversity value of a site must exceed its pre-development value by at least 10%,
                    as measured using the statutory biodiversity metric (currently Metric 4.0).
                  </p>
                  <p>
                    The requirement became mandatory for major developments (10 or more dwellings or
                    0.5 hectares or more) from <strong className="text-white">12 February 2024</strong>{' '}
                    and for smaller developments from <strong className="text-white">2 April 2024</strong>.
                    Developers must submit a biodiversity gain plan as part of the planning application
                    and can achieve net gain through on-site habitat creation, off-site habitat creation,
                    or purchasing statutory biodiversity credits from the government.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Extended Producer Responsibility &amp; Deposit Return Schemes</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    The Act gives the government powers to introduce <strong className="text-white">extended producer responsibility (EPR)</strong>{' '}
                    schemes, requiring producers of products and packaging to bear the full net cost of
                    managing those products at end of life. The first EPR scheme for packaging came into
                    force in 2024, making producers financially responsible for the collection, sorting,
                    and recycling or disposal of their packaging waste.
                  </p>
                  <p>
                    The Act also provides powers to introduce <strong className="text-white">deposit return schemes (DRS)</strong>{' '}
                    for drinks containers. Under a DRS, consumers pay a small deposit when purchasing
                    a drink in a single-use container and receive the deposit back when they return
                    the empty container for recycling.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Construction Impact:</strong>{' '}
                  The biodiversity net gain requirement directly affects every construction project
                  requiring planning permission. Electrical contractors working on new developments
                  should be aware that the site layout, landscaping, and programme may be influenced
                  by BNG requirements. Ecological surveys may restrict when and where ground works
                  (including cable trenching) can take place, particularly during bird nesting season
                  (March to August) or where protected species such as great crested newts or bats
                  have been identified.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/* Section 03 — Clean Air Act 1993                              */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">03</span>
            Clean Air Act 1993
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Clean Air Act 1993 consolidates the earlier Clean Air Acts of 1956 and 1968 and
                provides the legal framework for controlling smoke, grit, dust, and fumes from
                domestic and industrial sources. The original Clean Air Act 1956 was introduced in
                direct response to the <strong>Great Smog of London in December 1952</strong>, which
                killed an estimated 4,000 to 12,000 people and caused a public health crisis that
                forced the government to act. The 1993 Act remains the principal legislation for smoke
                control in England and Wales.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Provisions</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Dark smoke offences (Sections 1-2):</strong>{' '}
                      It is an offence to emit dark smoke from a chimney of any building (Section 1)
                      or from any industrial or trade premises (Section 2). Dark smoke is defined by
                      reference to the Ringelmann Chart — smoke that is as dark as or darker than
                      shade 2 on the chart is classified as dark smoke. The offence carries a fine
                      of up to 20,000 pounds for industrial premises
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Smoke control areas (Sections 18-29):</strong>{' '}
                      Local authorities can declare smoke control areas in which it is an offence to
                      emit smoke from a chimney unless an authorised fuel is being burned or an exempt
                      appliance is being used. The penalty is a fine of up to 1,000 pounds. There are
                      currently over 100 smoke control areas across England covering the majority of
                      urban areas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Chimney height controls (Sections 14-15):</strong>{' '}
                      Chimneys serving furnaces must be of sufficient height to prevent smoke, grit,
                      dust, gases, or fumes from becoming prejudicial to health or a nuisance. The
                      local authority must approve chimney heights for new furnaces before they are
                      installed. Third Memorandum on Chimney Heights (1981) provides the technical
                      guidance for calculating minimum chimney heights based on sulphur dioxide
                      emission rates and local geography
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Grit and dust from furnaces (Sections 5-12):</strong>{' '}
                      Furnaces used for burning pulverised fuel, burning any material at a rate of
                      45.4 kilograms or more per hour, or burning solid matter in any furnace the
                      heating capacity of which is 16.12 kilowatts or more, must be fitted with
                      equipment to arrest grit and dust as far as practicable. The Secretary of State
                      can set limits on the rate of emission of grit and dust
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Industrial Emissions &amp; Construction Relevance</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    While the Clean Air Act 1993 may seem primarily relevant to industrial processes
                    and domestic heating, it has direct implications for construction activities. The
                    burning of waste materials on construction sites can constitute a dark smoke
                    offence under Section 2 if the smoke is dark enough to meet the Ringelmann
                    threshold. On-site burning is also typically controlled by planning conditions
                    and may require an exemption or permit under waste legislation.
                  </p>
                  <p>
                    The Act also underpins the work of environmental health officers in local
                    authorities who investigate complaints about smoke, dust, and fumes from
                    construction sites. While dust from demolition and construction is more commonly
                    dealt with under the statutory nuisance provisions of the EPA 1990 (Part III),
                    the Clean Air Act provides additional enforcement tools where smoke is involved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 04 — Water Resources Act 1991 & Water Industry Act   */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">04</span>
            Water Resources Act 1991 &amp; Water Industry Act 1991
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Water Resources Act 1991 and the Water Industry Act 1991 together form the
                principal legislation governing water quality, water resources, and water pollution
                in England and Wales. The Water Resources Act deals with the regulation of water
                resources and the protection of water quality in the natural environment, while the
                Water Industry Act regulates the water and sewerage industry, including the discharge
                of trade effluent into public sewers.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Water Resources Act 1991 — Key Provisions</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Section 24 — Water abstraction:</strong>{' '}
                      It is an offence to abstract water from any source of supply (river, stream,
                      lake, underground strata) without an abstraction licence granted by the
                      Environment Agency, unless an exemption applies. Exemptions include abstractions
                      of less than 20 cubic metres per day from surface water for certain purposes.
                      Dewatering of construction excavations (pumping out groundwater to keep
                      excavations dry) may require an abstraction licence if the volume exceeds
                      the exempt thresholds
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Section 85 — Principal water pollution offence:</strong>{' '}
                      It is an offence to cause or knowingly permit any poisonous, noxious, or
                      polluting matter, or any solid waste matter, to enter any controlled waters.
                      &ldquo;Controlled waters&rdquo; is defined in Section 104 and includes relevant
                      territorial waters (extending to three nautical miles from the coast), coastal
                      waters, inland freshwaters (rivers, streams, watercourses, lakes, ponds, and
                      reservoirs), and groundwater (water in underground strata). The maximum penalty
                      on indictment is an unlimited fine and/or five years imprisonment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Discharge consents:</strong>{' '}
                      Any person who wishes to discharge trade effluent or sewage effluent into
                      controlled waters must obtain a discharge consent (now an environmental permit
                      under the Environmental Permitting Regulations 2016) from the Environment
                      Agency. The permit specifies conditions including the volume, composition, and
                      temperature of the discharge
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Common Construction Site Water Pollution Risks</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Diesel and oil spills</strong> from plant,
                      generators, and fuel storage that enter surface water drains or soak into the
                      ground to contaminate groundwater
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Cement and concrete washings</strong> — highly
                      alkaline (pH 11-13) and toxic to aquatic life. A single cement washout can kill
                      fish for several kilometres downstream
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Silt-laden runoff</strong> from exposed soil,
                      excavations, and stockpiles — silt smothers river beds and destroys spawning
                      habitat for fish
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Dewatering discharge</strong> — pumping
                      groundwater or rainwater from excavations directly into surface water drains
                      without settlement or treatment
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Water Industry Act 1991 — Trade Effluent</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    The Water Industry Act 1991 regulates the discharge of trade effluent into the
                    public sewer. <strong className="text-white">Trade effluent</strong> is defined as
                    any liquid that is wholly or partly produced in the course of any trade or industry
                    carried on at trade premises. Discharging trade effluent into a public sewer without
                    the consent of the sewerage undertaker (water company) is a criminal offence under
                    Section 118.
                  </p>
                  <p>
                    A trade effluent consent specifies conditions including the maximum daily volume,
                    the maximum rate of discharge, the composition and temperature of the effluent,
                    and the sewer into which the discharge is made. On construction sites, any discharge
                    to the public sewer that is not purely domestic sewage may be classified as trade
                    effluent and require consent — this can include contaminated groundwater from
                    dewatering operations, process water from concrete batching, or water used in
                    pressure testing of pipework.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/* Section 05 — Wildlife & Countryside Act 1981                 */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">05</span>
            Wildlife &amp; Countryside Act 1981
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Wildlife and Countryside Act 1981 (WCA 1981) is the principal legislation for the
                protection of wildlife, habitats, and the countryside in England and Wales. It
                implements the requirements of the European Birds Directive (79/409/EEC) and the Bern
                Convention on the Conservation of European Wildlife and Natural Habitats. Despite the
                United Kingdom&rsquo;s departure from the European Union, the protections provided by
                the WCA 1981 remain in force and have been retained in domestic law.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Protected Species</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Part I of the Act protects wild birds, wild animals, and wild plants. The key
                    protections include:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Section 1 — Wild birds:</strong>{' '}
                        It is an offence to intentionally kill, injure, or take any wild bird; to
                        intentionally take, damage, or destroy the nest of any wild bird while it
                        is in use or being built; or to intentionally take or destroy an egg of any
                        wild bird. Schedule 1 lists species receiving additional protection, making
                        it an offence to intentionally or recklessly disturb them at or near the nest
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Section 9 — Protected animals:</strong>{' '}
                        Schedule 5 lists animals receiving protection. It is an offence to
                        intentionally kill, injure, or take any Schedule 5 animal; to intentionally or
                        recklessly damage, destroy, or obstruct access to any structure or place used
                        by a Schedule 5 animal for shelter or protection; or to intentionally or
                        recklessly disturb such an animal while it is occupying such a structure.
                        Protected species commonly encountered on construction sites include great
                        crested newts, all bat species, water voles, dormice, and otters
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Section 13 — Protected plants:</strong>{' '}
                        Schedule 8 lists plants that may not be intentionally picked, uprooted, or
                        destroyed. It is also an offence for any person to intentionally uproot any
                        wild plant not listed in Schedule 8 unless they are an authorised person or
                        have the landowner&rsquo;s permission
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Sites of Special Scientific Interest (SSSIs)</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Part II of the Act (as significantly strengthened by the Countryside and Rights of
                    Way Act 2000) establishes the framework for the designation and protection of{' '}
                    <strong className="text-white">Sites of Special Scientific Interest (SSSIs)</strong>.
                    Natural England (in England) or Natural Resources Wales (in Wales) can notify land
                    as an SSSI where it is of special interest by reason of its flora, fauna, or
                    geological or physiographical features.
                  </p>
                  <p>
                    There are over <strong className="text-white">4,100 SSSIs in England</strong>,
                    covering approximately 1,085,000 hectares (about 8% of the land area). When land
                    is notified as an SSSI, the notification includes a list of{' '}
                    <strong className="text-white">operations likely to damage (OLDs)</strong> the
                    special features. Owners and occupiers must give Natural England 28 days&rsquo;
                    written notice before carrying out any of the listed operations and must obtain
                    consent before proceeding.
                  </p>
                  <p>
                    Intentionally or recklessly destroying or damaging any of the flora, fauna, or
                    geological or physiographical features by reason of which a site is of special
                    interest is a criminal offence under Section 28P, carrying an unlimited fine.
                  </p>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Bug className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Construction Implications</p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    The wildlife protections under the WCA 1981 have significant implications for
                    construction projects:
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>
                        <strong className="text-white">Bird nesting season (March to August):</strong>{' '}
                        vegetation clearance, demolition, and roofing works must be timed to avoid
                        destroying active nests. If nesting birds are discovered, work must stop in
                        that area until the chicks have fledged
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>
                        <strong className="text-white">Bat roosts:</strong>{' '}
                        all bat species and their roosts are protected. A bat roost is protected whether
                        or not bats are present. Demolition, renovation, re-roofing, or any work that
                        might disturb a bat roost requires a European Protected Species licence from
                        Natural England
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>
                        <strong className="text-white">Great crested newts:</strong>{' '}
                        found across England, particularly in ponds and surrounding terrestrial habitat.
                        Development within 500 metres of a great crested newt pond may require survey,
                        licensing, and mitigation. District Level Licensing schemes now offer a
                        strategic alternative in some areas
                      </span>
                    </li>
                  </ul>
                  <p>
                    Penalties for wildlife offences under the WCA 1981 include an unlimited fine
                    and/or up to six months imprisonment on summary conviction. For the most serious
                    offences involving Schedule 5 animals, the court can impose a fine of up to 5,000
                    pounds per specimen and/or six months imprisonment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 06 — Hazardous Waste Regulations 2005                */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">06</span>
            Hazardous Waste Regulations 2005
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Hazardous Waste (England and Wales) Regulations 2005 (as amended) implement the
                requirements of the EU Waste Framework Directive (2008/98/EC) and the European List
                of Waste in relation to hazardous waste. They establish a system for tracking hazardous
                waste from the point of production (the &ldquo;cradle&rdquo;) to the point of final
                disposal or recovery (the &ldquo;grave&rdquo;), ensuring that hazardous waste is
                properly managed at every stage.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Classification of Hazardous Waste</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Waste is classified as hazardous if it displays one or more of the{' '}
                    <strong className="text-white">15 hazardous properties (HP1 to HP15)</strong>{' '}
                    defined in Annex III of the Waste Framework Directive. These include:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">HP1 Explosive</strong> — waste capable of producing gas at such a temperature, pressure, and speed as to cause damage to surroundings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">HP3 Flammable</strong> — flammable liquid, solid, or gaseous waste</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">HP5 Specific target organ toxicity / Aspiration toxicity</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">HP6 Acute toxicity</strong> — waste that can cause acute toxic effects following oral, dermal, or inhalation exposure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">HP7 Carcinogenic</strong> — waste that induces cancer or increases its incidence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">HP14 Ecotoxic</strong> — waste that presents or may present immediate or delayed risks to the environment</span>
                    </li>
                  </ul>
                  <p>
                    The <strong className="text-white">European Waste Catalogue (EWC)</strong> assigns
                    a six-digit code to each type of waste. Entries marked with an asterisk (*) are
                    classified as hazardous. For example, 17 06 01* is insulation materials containing
                    asbestos, and 20 01 21* is fluorescent tubes and other mercury-containing waste.
                    Some entries are &ldquo;mirror entries&rdquo; — the same waste type may be
                    classified as hazardous or non-hazardous depending on the concentration of
                    dangerous substances.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Consignment Notes</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Every movement of hazardous waste from a premises must be accompanied by a{' '}
                    <strong className="text-white">consignment note</strong>. The consignment note
                    must contain:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>A unique consignment note code in the format prescribed by the regulations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>The name, address, and premises code of the waste producer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>A full description of the waste including the EWC code, the quantity, the physical form (solid, liquid, sludge, powder, mixed, gas), and the hazardous properties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Details of the registered waste carrier (name, registration number)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Details of the receiving facility (consignee) including their environmental permit number</span>
                    </li>
                  </ul>
                  <p>
                    Consignment notes must be retained for a minimum of{' '}
                    <strong className="text-white">three years</strong> by the producer, carrier,
                    and consignee. Failure to complete consignment notes correctly, or to retain them
                    for the required period, is a criminal offence.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Mixing Prohibition &amp; Registration</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    <strong className="text-white">Regulation 19 — Mixing prohibition:</strong>{' '}
                    It is prohibited to mix hazardous waste with non-hazardous waste, or to mix
                    different categories of hazardous waste with each other, unless the mixing is
                    carried out under an environmental permit that specifically authorises it. The
                    purpose is to prevent dangerous chemical reactions, maintain treatability, and
                    ensure proper characterisation and tracking. On construction sites, this means
                    asbestos waste, waste oils, lead paint debris, solvent containers, and fluorescent
                    tubes must all be segregated from each other and from general construction waste.
                  </p>
                  <p>
                    <strong className="text-white">Premises registration:</strong>{' '}
                    Premises that produce or hold hazardous waste no longer need to register with the
                    Environment Agency as a result of amendments made in 2009. However, producers must
                    still comply with all other requirements including the duty to classify waste
                    correctly, complete consignment notes, use registered carriers, and ensure waste
                    reaches an appropriately permitted facility.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">For Electricians:</strong>{' '}
                  Common hazardous wastes produced by electrical work include fluorescent tubes and
                  other mercury-containing lamps (EWC 20 01 21*), batteries containing lead, nickel-cadmium,
                  or mercury (EWC 16 06 01*, 16 06 02*, 16 06 03*), waste oils from transformers and
                  switchgear (EWC 13 03 01*), asbestos-containing materials encountered during
                  rewiring of older buildings (EWC 17 06 01* and 17 06 05*), and waste electrical
                  and electronic equipment containing hazardous components (EWC 16 02 11* to 16 02 13*).
                  All of these must be segregated, described accurately on consignment notes, and sent
                  to appropriately licensed facilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/* Diagram: UK Environmental Legislation Timeline               */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-emerald-500/10 border-b border-white/10">
              <p className="text-sm font-semibold text-emerald-400 text-center">
                UK Environmental Legislation Timeline
              </p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-emerald-500/30" />

                {[
                  { year: '1956', title: 'Clean Air Act 1956', desc: 'First clean air legislation following the Great Smog of London (1952). Introduced smoke control areas.' },
                  { year: '1974', title: 'Control of Pollution Act 1974', desc: 'Early framework for waste disposal, water pollution, noise, and atmospheric pollution.' },
                  { year: '1981', title: 'Wildlife & Countryside Act 1981', desc: 'Principal wildlife protection statute. Protected species, SSSIs, habitat conservation.' },
                  { year: '1990', title: 'Environmental Protection Act 1990', desc: 'Landmark statute — IPC, waste management licensing, duty of care, statutory nuisances.' },
                  { year: '1991', title: 'Water Resources Act 1991', desc: 'Water abstraction licensing, Section 85 pollution offence, discharge consents.' },
                  { year: '1993', title: 'Clean Air Act 1993', desc: 'Consolidation of 1956 and 1968 Acts. Dark smoke offences, smoke control areas, chimney heights.' },
                  { year: '1995', title: 'Environment Act 1995', desc: 'Created the Environment Agency and Scottish Environment Protection Agency (SEPA).' },
                  { year: '2005', title: 'Hazardous Waste Regulations 2005', desc: 'Consignment note system, mixing prohibition, cradle-to-grave tracking of hazardous waste.' },
                  { year: '2015', title: 'CDM Regulations 2015', desc: 'Construction safety regulations with environmental overlap — pre-construction information, design considerations.' },
                  { year: '2016', title: 'Environmental Permitting Regulations 2016', desc: 'Single permitting framework for waste operations, water discharge, and industrial emissions.' },
                  { year: '2021', title: 'Environment Act 2021', desc: 'Post-Brexit framework. OEP, legally binding targets, biodiversity net gain, extended producer responsibility.' },
                ].map((item, i) => (
                  <div key={i} className="relative pl-10 sm:pl-14 pb-6 last:pb-0">
                    <div className="absolute left-2.5 sm:left-4.5 top-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-emerald-400/50" />
                    <div>
                      <span className="text-emerald-400 text-xs font-bold">{item.year}</span>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-white/60 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 07 — Environmental Permitting Regulations 2016       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">07</span>
            Environmental Permitting Regulations 2016
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Environmental Permitting (England and Wales) Regulations 2016 (EPR 2016) provide
                a single, streamlined permitting framework for a wide range of environmentally
                regulated activities. They replaced the previous separate regimes for waste management
                licensing (under the EPA 1990), pollution prevention and control (under the Pollution
                Prevention and Control Act 1999), water discharge consents (under the Water Resources
                Act 1991), and groundwater authorisations. The intention was to reduce administrative
                burden while maintaining or improving environmental protection.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Activities Requiring Environmental Permits</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Waste operations:</strong>{' '}
                      the storage, treatment, recovery, and disposal of waste (including waste transfer
                      stations, materials recovery facilities, composting sites, landfill sites, and
                      waste incineration plants)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Water discharge activities:</strong>{' '}
                      discharging trade effluent, sewage effluent, or other polluting matter into
                      inland freshwaters, coastal waters, or relevant territorial waters
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Groundwater activities:</strong>{' '}
                      discharging polluting substances to groundwater or carrying out activities that
                      might lead to the input of polluting substances to groundwater
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Installations:</strong>{' '}
                      industrial activities listed in Schedule 1, including energy production, metals
                      processing, minerals processing, chemicals manufacturing, waste management,
                      and certain other activities (implementing the Industrial Emissions Directive)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Radioactive substances activities:</strong>{' '}
                      the keeping and use of radioactive substances and the accumulation and disposal
                      of radioactive waste
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Standard Rules Permits vs Bespoke Permits</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    The EPR 2016 provides two main routes to obtaining an environmental permit:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-3">
                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-lg">
                      <p className="text-xs font-semibold text-emerald-400 mb-2">Standard Rules Permit</p>
                      <ul className="text-xs text-white/80 space-y-1.5">
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                          <span>Pre-defined set of conditions published by the Environment Agency</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                          <span>Covers common, lower-risk activities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                          <span>Simplified application process</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                          <span>Application fee: typically 750 to 1,600 pounds</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                          <span>Cannot negotiate bespoke conditions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                          <span>Faster to obtain (typically 2-4 weeks)</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-lg">
                      <p className="text-xs font-semibold text-emerald-400 mb-2">Bespoke Permit</p>
                      <ul className="text-xs text-white/80 space-y-1.5">
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                          <span>Individually tailored to the specific site and operation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                          <span>Required for higher-risk or complex activities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                          <span>Full assessment by the Environment Agency</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                          <span>Application fee: can exceed 10,000 pounds</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                          <span>Site-specific conditions negotiated</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                          <span>Longer processing time (typically 4-13 weeks)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Waste Exemptions</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Certain low-risk waste operations are exempt from the requirement to hold an
                    environmental permit, but must be <strong className="text-white">registered</strong>{' '}
                    with the Environment Agency. There are currently 58 waste exemptions covering
                    activities such as:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">T4:</strong> preparatory treatments such as baling, sorting, shredding, or compacting waste for onward transfer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">U1:</strong> use of waste in construction (e.g., crushed concrete as aggregate)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">D7:</strong> burning waste in the open (very limited circumstances, specific waste types only)</span>
                    </li>
                  </ul>
                  <p>
                    Exemptions must be registered before the activity commences, and operators must
                    comply with the specific conditions and quantity limits attached to each exemption.
                    Registration is free and can be done online through the Environment Agency website.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Enforcement:</strong>{' '}
                  Operating a regulated facility without an environmental permit is a criminal offence
                  under Regulation 38 of the EPR 2016. The maximum penalty on indictment is an
                  unlimited fine and/or five years imprisonment. The Environment Agency can also issue
                  enforcement notices, suspension notices, and revocation notices. In addition, it has
                  the power to impose civil sanctions including variable monetary penalties as an
                  alternative to prosecution for less serious offences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Diagram: Legislation Hierarchy Pyramid                       */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-emerald-500/10 border-b border-white/10">
              <p className="text-sm font-semibold text-emerald-400 text-center">
                UK Environmental Legislation Hierarchy
              </p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex flex-col items-center gap-2">
                {/* Level 1 — Acts of Parliament */}
                <div className="w-[50%] sm:w-[40%] bg-emerald-500/20 border border-emerald-500/40 rounded-lg p-3 text-center">
                  <p className="text-xs font-bold text-emerald-400">ACTS OF PARLIAMENT</p>
                  <p className="text-[10px] text-white/60 mt-1">
                    Primary legislation passed by Parliament (e.g. EPA 1990, Environment Act 2021, WCA 1981)
                  </p>
                </div>
                <div className="w-0.5 h-3 bg-emerald-500/30" />

                {/* Level 2 — Statutory Instruments */}
                <div className="w-[65%] sm:w-[55%] bg-emerald-500/15 border border-emerald-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs font-bold text-emerald-400/90">STATUTORY INSTRUMENTS (REGULATIONS)</p>
                  <p className="text-[10px] text-white/60 mt-1">
                    Secondary legislation made under powers in Acts (e.g. EPR 2016, Hazardous Waste Regulations 2005)
                  </p>
                </div>
                <div className="w-0.5 h-3 bg-emerald-500/30" />

                {/* Level 3 — Approved Codes of Practice */}
                <div className="w-[80%] sm:w-[70%] bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-center">
                  <p className="text-xs font-bold text-emerald-400/80">APPROVED CODES OF PRACTICE &amp; GUIDANCE</p>
                  <p className="text-[10px] text-white/60 mt-1">
                    Statutory guidance from regulators (e.g. EA guidance notes, Defra guidance, Natural England standing advice)
                  </p>
                </div>
                <div className="w-0.5 h-3 bg-emerald-500/30" />

                {/* Level 4 — Industry Standards */}
                <div className="w-[95%] sm:w-[85%] bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3 text-center">
                  <p className="text-xs font-bold text-emerald-400/70">INDUSTRY STANDARDS &amp; BEST PRACTICE</p>
                  <p className="text-[10px] text-white/60 mt-1">
                    Industry codes, British Standards, CIRIA guidance (e.g. C753 SuDS Manual, C741 Environmental Good Practice on Site)
                  </p>
                </div>
              </div>

              <p className="text-xs text-white/40 text-center mt-4">
                Higher levels take legal precedence. Breach of an Act or Regulation is a criminal offence.
                Guidance and standards are not legally binding but may be used as evidence of good or poor practice.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* Section 08 — CDM 2015 & Environmental Overlap                */}
        {/* ============================================================ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">08</span>
            CDM 2015 &amp; Environmental Overlap
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Construction (Design and Management) Regulations 2015 (CDM 2015) are the principal
                health and safety regulations for the construction industry. While CDM 2015 does not
                directly regulate environmental matters, there are significant areas of overlap where
                environmental legislation and CDM duties intersect. Failing to consider environmental
                constraints during the design and planning stages can lead to delays, additional costs,
                enforcement action, and criminal prosecution.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Pre-Construction Information (Regulation 12)</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    The principal designer must prepare pre-construction information that includes all
                    information relevant to the health and safety of the construction work. This
                    should identify environmental hazards and constraints that affect worker safety
                    and project planning, including:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Contaminated land:</strong>{' '}
                        sites with a history of industrial use may contain contaminants in the soil
                        including heavy metals, hydrocarbons, asbestos fibres, and volatile organic
                        compounds. These pose direct health risks to workers through skin contact,
                        inhalation, and ingestion. Site investigation reports should be included in
                        the pre-construction information
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Asbestos in existing buildings:</strong>{' '}
                        the Regulation 4 duty to manage asbestos (Control of Asbestos Regulations
                        2012) requires the dutyholder to determine whether asbestos-containing
                        materials are present in the building. Refurbishment and demolition surveys
                        to HSG264 must be included in pre-construction information where the work
                        involves disturbing the building fabric
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Protected species and habitats:</strong>{' '}
                        ecological survey reports identifying protected species (bats, newts, nesting
                        birds) and designated sites (SSSIs, Local Wildlife Sites) near the
                        development. These affect the timing and methodology of construction works
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Proximity to controlled waters:</strong>{' '}
                        watercourses, drainage ditches, and groundwater vulnerability. This affects
                        the pollution prevention measures required during construction
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Environmental permit conditions:</strong>{' '}
                        any environmental permits attached to the site or required for the construction
                        activities, including their conditions and restrictions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Planning conditions:</strong>{' '}
                        environmental planning conditions relating to noise, dust, working hours,
                        ecology, drainage, and construction traffic that constrain how the work
                        is carried out
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Design Considerations (Regulation 9)</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Regulation 9 requires designers (including the principal designer) to eliminate,
                    so far as is reasonably practicable, foreseeable risks to the health and safety
                    of any person. Design decisions have significant environmental consequences:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Material specification:</strong>{' '}
                        choosing materials with lower environmental impact (e.g., specifying recycled
                        aggregates instead of virgin stone, selecting low-VOC paints and adhesives,
                        avoiding materials containing hazardous substances where alternatives exist)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Drainage design:</strong>{' '}
                        incorporating sustainable drainage systems (SuDS) to manage surface water
                        runoff, prevent flooding, and protect water quality. Schedule 3 of the Flood
                        and Water Management Act 2010 (when commenced) will make SuDS mandatory for
                        new developments
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Waste minimisation:</strong>{' '}
                        designing to standard material dimensions to reduce cutting waste, using
                        off-site manufacture and modular construction to reduce waste generation on
                        site, and designing for deconstruction at end of life
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Energy and carbon:</strong>{' '}
                        designing energy-efficient buildings, specifying low-carbon electrical systems
                        (LED lighting, heat pumps, solar PV), and minimising embodied carbon in
                        materials and construction methods
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Construction Phase Plan &amp; Environmental Management</p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    The construction phase plan required under CDM 2015 (Regulation 12(2)) should
                    integrate environmental management measures alongside health and safety
                    arrangements. Many construction projects now prepare a combined{' '}
                    <strong className="text-white">Construction Environmental Management Plan (CEMP)</strong>{' '}
                    that addresses:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">Pollution prevention:</strong> spill response procedures, bunded storage for oils and chemicals, silt management, cement washout areas, and emergency pollution control equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">Dust management:</strong> wheel washing, damping down, covered skips, boundary monitoring, and dust action levels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">Noise and vibration:</strong> best practicable means under Section 72 of the Control of Pollution Act 1974, prior consent under Section 61, monitoring, and complaint response procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">Waste management:</strong> site waste management plan, segregation procedures, duty of care compliance, and waste minimisation targets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span><strong className="text-white">Ecological mitigation:</strong> timing restrictions for vegetation clearance and demolition, ecological watching briefs, species relocation programmes, and habitat reinstatement</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Key Takeaway:</strong>{' '}
                  Environmental compliance is not separate from health and safety — it is integral
                  to it. Contaminated land, hazardous waste, and pollution incidents all pose direct
                  risks to workers. The CDM 2015 framework provides the structure for identifying
                  and managing these risks during the design and construction phases, but compliance
                  with environmental legislation (EPA 1990, Water Resources Act 1991, WCA 1981,
                  Hazardous Waste Regulations 2005, EPR 2016) is the legal mechanism that ensures
                  environmental protection is actually achieved. As an electrician working on
                  construction sites, you are part of this system and must understand how these laws
                  affect your work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: What Is Environmental Management?
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-1-section-3">
              Next: Environmental Impact Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
