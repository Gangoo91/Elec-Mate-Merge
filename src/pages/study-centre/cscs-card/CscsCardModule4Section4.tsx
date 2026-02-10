import { ArrowLeft, Leaf, CheckCircle, AlertTriangle, Droplets, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (3) — placed after sections 2, 4, 6         */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'waste-hierarchy-check',
    question:
      'A construction site generates a large quantity of timber offcuts. According to the waste hierarchy, what is the most preferred option for dealing with this waste?',
    options: [
      'Send it to landfill immediately — timber rots and is biodegradable',
      'Burn it on site to reduce volume',
      'Prevent the waste in the first place by ordering accurate quantities, then reuse offcuts where possible, then recycle any remaining timber',
      'Mix it with general waste to save on skip costs',
    ],
    correctIndex: 2,
    explanation:
      'The waste hierarchy ranks options from most to least preferred: prevent, reuse, recycle, recover (e.g. energy from waste), and dispose (landfill) as the last resort. Prevention is always the most preferred option — ordering accurate quantities and using standard sizes reduces offcuts. Any offcuts that do arise should be reused on site where possible, and remaining timber should be segregated for recycling. Burning waste on site is illegal without an environmental permit, and mixing waste types prevents recycling.',
  },
  {
    id: 'dust-suppression-check',
    question:
      'Workers are cutting concrete blocks on a construction site, generating significant dust. Which combination of control measures would be most effective at reducing dust exposure?',
    options: [
      'Issue dust masks to all workers and continue cutting as normal',
      'Use a block cutter with water suppression, position the cutting area downwind of other workers, use local exhaust ventilation (LEV) where possible, and issue RPE as additional protection',
      'Wait until it rains before cutting any blocks',
      'Open all doors and windows to improve natural ventilation',
    ],
    correctIndex: 1,
    explanation:
      'Effective dust control requires a hierarchy of measures. Water suppression at the point of cutting is the primary engineering control — it prevents dust becoming airborne. Positioning the cutting area downwind prevents dust blowing towards other workers. LEV captures dust at source. RPE (respiratory protective equipment) is used as an additional measure alongside engineering controls, not as a substitute for them. Simply issuing dust masks without other controls is not sufficient — this relies solely on PPE, which is the lowest level of the hierarchy of control.',
  },
  {
    id: 'protected-species-check',
    question:
      'During demolition work, a worker discovers a bat roosting in the roof space of a building being demolished. What is the correct course of action?',
    options: [
      'Carefully remove the bat and place it in a nearby tree, then continue work',
      'Stop work immediately in that area, do not disturb the bat, inform your supervisor, and contact a licensed ecologist — bats and their roosts are protected by law',
      'Continue work carefully, avoiding the bat if possible',
      'Report it at the end of the shift — one bat is not a significant issue',
    ],
    correctIndex: 1,
    explanation:
      'All bat species in the UK are protected under the Wildlife and Countryside Act 1981 and the Conservation of Habitats and Species Regulations 2017. It is a criminal offence to deliberately kill, injure, or disturb a bat, or to damage or destroy a bat roost — even if no bats are present at the time. Work must stop immediately in the affected area, the bat must not be disturbed, and a licensed ecologist must be contacted. Penalties for wildlife offences include unlimited fines and up to six months imprisonment.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Who is responsible for waste produced on a construction site?',
    answer:
      'Under the Environmental Protection Act 1990, everyone in the waste chain has a duty of care — from the person who produces the waste to the person who finally disposes of it. On a construction site, the principal contractor typically holds overall responsibility for waste management, but every worker has a duty not to deposit waste illegally, to segregate waste correctly, and to ensure waste is only transferred to an authorised carrier with the correct documentation (waste transfer notes for non-hazardous waste, consignment notes for hazardous waste). If waste is fly-tipped, the original producer can be prosecuted even if they paid someone else to remove it.',
  },
  {
    question: 'What should I do if I accidentally spill diesel on the ground?',
    answer:
      'Act immediately — do not leave it. Contain the spill using absorbent materials from the nearest spill kit (absorbent granules, pads, or booms). Prevent the spill from reaching any drains, watercourses, or soakaways — block drains with drain covers or absorbent booms if necessary. Report the spill to your supervisor straight away. If the spill has entered or may enter a watercourse, the Environment Agency must be notified on their 24-hour incident hotline (0800 80 70 60). Collect all contaminated absorbent material and dispose of it as hazardous waste with the correct documentation. Record the incident and review storage arrangements to prevent recurrence.',
  },
  {
    question: 'Can construction work disturb nesting birds?',
    answer:
      'No. Under the Wildlife and Countryside Act 1981, it is an offence to intentionally kill, injure, or take any wild bird, or to intentionally take, damage, or destroy the nest of any wild bird while it is in use or being built. The main bird nesting season in the UK is generally March to August, although some species nest outside this period. If nesting birds are discovered during construction work, work must stop in the affected area and advice must be sought from an ecologist. Vegetation clearance and demolition should ideally be scheduled outside the nesting season, and ecological surveys should be conducted beforehand if there is any potential for nesting birds.',
  },
  {
    question: 'What is a Section 61 agreement under the Control of Pollution Act 1974?',
    answer:
      'A Section 61 agreement is a prior consent for construction works obtained from the local authority before work begins. The contractor applies to the local authority outlining the proposed works, the methods to be used, the hours of operation, and the noise mitigation measures that will be employed. If the local authority grants consent, the contractor is protected from a Section 60 notice (a noise abatement notice) provided they comply with the agreed conditions. Section 61 is voluntary — the contractor chooses to apply — but it provides certainty and protection. It is considered best practice for large or long-duration projects, particularly those in residential areas where noise complaints are likely.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (8)                                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Under the Environmental Protection Act 1990, who has a duty of care for waste produced on a construction site?',
    options: [
      'Only the site manager',
      'Only the waste carrier who removes it from site',
      'Everyone in the waste chain — from the producer to the final disposer',
      'Only the client who commissioned the project',
    ],
    correctAnswer: 2,
    explanation:
      'The duty of care under the Environmental Protection Act 1990 applies to everyone who produces, imports, keeps, stores, transports, treats, or disposes of waste. On a construction site, this means the principal contractor, subcontractors, individual workers, waste carriers, and waste disposal facilities all share responsibility. If waste is illegally dumped, the original producer can be prosecuted even if they paid a third party to remove it.',
  },
  {
    id: 2,
    question:
      'What is the correct order of the waste hierarchy, from most preferred to least preferred?',
    options: [
      'Recycle, Reuse, Recover, Prevent, Dispose',
      'Prevent, Reuse, Recycle, Recover, Dispose',
      'Dispose, Recover, Recycle, Reuse, Prevent',
      'Reuse, Prevent, Recycle, Dispose, Recover',
    ],
    correctAnswer: 1,
    explanation:
      'The waste hierarchy ranks waste management options from most to least environmentally preferred: Prevent (avoid creating waste), Reuse (use materials again for the same or different purpose), Recycle (process materials into new products), Recover (extract energy from waste, e.g. incineration with energy recovery), and Dispose (landfill — the last resort). This hierarchy is enshrined in the Waste (England and Wales) Regulations 2011 and must be applied on all construction sites.',
  },
  {
    id: 3,
    question:
      'Cement washings from a concrete pour are about to flow into a nearby stream. What should you do?',
    options: [
      'Allow it — cement is a natural product and will not harm the water',
      'Dilute it with clean water from a hose to reduce concentration',
      'Contain the washings immediately, prevent them reaching the watercourse, and report the incident to your supervisor and the Environment Agency if contamination has occurred',
      'Wait until the pour is finished before taking action',
    ],
    correctAnswer: 2,
    explanation:
      'Cement is highly alkaline (pH 11-13) and extremely toxic to aquatic life. Even small amounts entering a watercourse can kill fish and other organisms over a significant distance. Cement washings must be contained using settlement tanks, bunds, or absorbent materials. If contamination has reached a watercourse, the Environment Agency must be notified immediately on 0800 80 70 60. Allowing cement to enter a watercourse is an offence under the Environmental Permitting Regulations 2016 and can result in unlimited fines.',
  },
  {
    id: 4,
    question:
      'Which type of construction dust is most dangerous to health and requires the strictest controls?',
    options: [
      'General construction dust from sweeping',
      'Wood dust from cutting timber',
      'Silica dust from cutting concrete, sandstone, or morite',
      'Plaster dust from demolition work',
    ],
    correctAnswer: 2,
    explanation:
      'Respirable crystalline silica (RCS) dust is the most dangerous type of construction dust. It is generated when cutting, drilling, grinding, or demolishing materials containing silica — including concrete, sandstone, mortar, and brick. Inhaling RCS can cause silicosis (a serious, irreversible lung disease), lung cancer, and chronic obstructive pulmonary disease (COPD). The workplace exposure limit (WEL) for RCS is very low at 0.1 mg/m³, and strict controls including water suppression, LEV, and RPE are required.',
  },
  {
    id: 5,
    question:
      'A local authority serves a Section 60 notice on a construction site. What does this require?',
    options: [
      'The site must shut down permanently',
      'The contractor must comply with specified requirements to control noise — such as restricted working hours, specific methods, or noise limits',
      'All workers must wear hearing protection at all times',
      'The site must relocate to a different area',
    ],
    correctAnswer: 1,
    explanation:
      'A Section 60 notice under the Control of Pollution Act 1974 is served by the local authority to control noise from construction sites. It can specify the hours during which work may be carried out, the types of plant or machinery that may or may not be used, the maximum noise levels permitted, and the steps to be taken to minimise noise. Non-compliance with a Section 60 notice is a criminal offence. A Section 61 agreement (prior consent) can protect against a Section 60 notice if the contractor applies in advance.',
  },
  {
    id: 6,
    question:
      'Which of the following species is protected by law in the UK and could affect construction work?',
    options: [
      'Foxes',
      'Grey squirrels',
      'Great crested newts',
      'Pigeons',
    ],
    correctAnswer: 2,
    explanation:
      'Great crested newts are a European Protected Species under the Conservation of Habitats and Species Regulations 2017 and are also protected under the Wildlife and Countryside Act 1981. It is an offence to capture, kill, disturb, or injure great crested newts, or to damage or destroy their habitats (including ponds, terrestrial habitat, and hibernation sites). Construction work near potential great crested newt habitat requires ecological surveys and may need a Natural England licence before work can proceed. Other protected species that commonly affect construction include bats, nesting birds, dormice, and badgers.',
  },
  {
    id: 7,
    question:
      'What is the first action to take if you discover a fuel spill on a construction site?',
    options: [
      'Report it to your supervisor at the end of the shift',
      'Wash it away with water from a hose',
      'Contain the spill immediately using materials from the spill kit — prevent it from reaching drains or watercourses',
      'Cover it with soil to absorb the fuel',
    ],
    correctAnswer: 2,
    explanation:
      'The priority with any spill is immediate containment to prevent the pollutant from spreading, particularly to drains and watercourses. Use absorbent granules, pads, or booms from the nearest spill kit. Block any nearby drains with drain covers or absorbent booms. Do NOT wash the spill away with water — this spreads the contamination and makes it more likely to reach watercourses. Do NOT cover with soil — this does not contain the spill effectively and creates contaminated soil that must be disposed of as hazardous waste. Report to your supervisor immediately.',
  },
  {
    id: 8,
    question:
      'What does BREEAM assess in relation to construction projects?',
    options: [
      'The structural strength and load-bearing capacity of a building',
      'The environmental and sustainability performance of a building across categories including energy, water, materials, and ecology',
      'The fire resistance rating of building materials',
      'The electrical installation compliance of a building',
    ],
    correctAnswer: 1,
    explanation:
      'BREEAM (Building Research Establishment Environmental Assessment Method) is the world\'s leading sustainability assessment method for buildings and infrastructure. It assesses performance across categories including energy efficiency, water use, health and wellbeing, pollution, transport, materials, waste, land use and ecology, and management. Buildings are rated as Pass, Good, Very Good, Excellent, or Outstanding. Many public sector and large commercial projects require a minimum BREEAM rating. Awareness of BREEAM helps construction workers understand why certain sustainable practices and materials are specified.',
  },
];

/* ------------------------------------------------------------------ */
/*  Border colours for alternating sections                            */
/* ------------------------------------------------------------------ */
const borderColours = [
  'border-green-500/50',
  'border-blue-500/50',
  'border-cyan-500/50',
  'border-purple-500/50',
  'border-amber-500/50',
  'border-rose-500/50',
  'border-teal-500/50',
  'border-red-500/50',
];

const numColours = [
  'text-green-400/80',
  'text-blue-400/80',
  'text-cyan-400/80',
  'text-purple-400/80',
  'text-amber-400/80',
  'text-rose-400/80',
  'text-teal-400/80',
  'text-red-400/80',
];

const headingColours = [
  'text-green-300',
  'text-blue-300',
  'text-cyan-300',
  'text-purple-300',
  'text-amber-300',
  'text-rose-300',
  'text-teal-300',
  'text-red-300',
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
const CscsCardModule4Section4 = () => {
  useSEO({
    title: 'Environmental Protection | CSCS Card Module 4 Section 4',
    description:
      'Environmental protection on construction sites — waste management, water pollution prevention, dust and air quality control, noise and nuisance, protected species, energy efficiency, and spillage response.',
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* -- Header ------------------------------------------------- */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* -- Main Content ------------------------------------------- */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Centred Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-400/20 border border-green-500/30 mb-4">
            <Leaf className="h-7 w-7 text-green-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3 mx-auto">
            <span className="text-green-400 text-xs font-semibold">MODULE 4 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Environmental Protection
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding your legal duties to protect the environment on construction sites &mdash;
            from waste management and pollution prevention to protected species and sustainability
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="h-5 w-5 text-blue-400" />
              <p className="text-blue-400 text-base font-medium">Pollution Prevention</p>
            </div>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Water:</strong> Prevent silt, cement &amp; chemicals reaching watercourses
              </li>
              <li>
                <strong>Air:</strong> Control dust with suppression, LEV &amp; damping
              </li>
              <li>
                <strong>Noise:</strong> Section 60/61 notices, working hours restrictions
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-5 w-5 text-green-400" />
              <p className="text-green-400 text-base font-medium">Legal Duties</p>
            </div>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Waste:</strong> Duty of care &mdash; prevent, reuse, recycle, recover, dispose
              </li>
              <li>
                <strong>Wildlife:</strong> Protected species &mdash; bats, newts, nesting birds
              </li>
              <li>
                <strong>Spills:</strong> Contain, report, clean up &mdash; Environment Agency
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the duty of care for waste under the Environmental Protection Act 1990 and the waste hierarchy',
              'Describe methods for preventing water pollution on construction sites including cement, silt, and fuel',
              'Identify the main types of construction dust and the control measures required for each',
              'Understand the Control of Pollution Act 1974 (Section 60 and 61) and how noise nuisance is managed',
              'Recognise protected species commonly encountered on construction sites and the legal requirements',
              'Outline spillage response procedures including containment, reporting, and clean-up',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-green-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* -------------------------------------------------------- */}
        {/* SECTION 01 — Environmental Responsibilities               */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[0]} text-sm font-normal`}>01</span>
            Environmental Responsibilities
          </h2>
          <div className={`border-l-2 ${borderColours[0]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The construction industry has a significant impact on the environment. It is
                responsible for approximately one third of all waste produced in the UK, and
                construction activities can cause pollution of water, air, and land if not properly
                managed. Every person on a construction site has a legal responsibility to minimise
                environmental harm.
              </p>

              <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[0]} font-medium mb-3`}>Key Environmental Legislation</h3>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Environmental Protection Act 1990</strong> &mdash; the principal
                      legislation governing waste management and pollution control. Establishes the
                      duty of care for waste, makes it an offence to deposit waste illegally
                      (fly-tipping), and provides powers to deal with statutory nuisances including
                      noise, dust, and odour
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Environmental Permitting Regulations 2016</strong> &mdash; requires
                      permits for activities that could pollute the environment, including discharges
                      to water, waste operations, and certain industrial processes. Construction sites
                      must not discharge polluting matter into controlled waters without a permit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Control of Pollution Act 1974</strong> &mdash; provides local
                      authorities with powers to control noise from construction sites through Section
                      60 and Section 61 notices
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Wildlife and Countryside Act 1981</strong> &mdash; protects wild birds,
                      animals, and plants, and their habitats. Places legal obligations on anyone
                      carrying out construction work to avoid harming protected species
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong>Clean Air Act 1993</strong> &mdash; controls emissions from premises
                      including construction sites. Burning certain materials on site may be an offence
                      in smoke control areas
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Legal Penalties for Pollution</h3>
                </div>
                <p className="text-white/80 text-sm mb-3">
                  Environmental offences carry severe penalties. Individuals and companies can face:
                </p>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Unlimited fines</strong> for pollution offences
                      under the Environmental Permitting Regulations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Up to 5 years imprisonment</strong> for serious
                      pollution offences tried on indictment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Up to 12 months imprisonment and/or unlimited
                      fines</strong> for fly-tipping offences
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Remediation costs</strong> &mdash; the polluter
                      pays for clean-up, which can amount to hundreds of thousands of pounds
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Criminal records</strong> for individuals
                      responsible, which can affect future employment and CSCS card eligibility
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 02 — Waste Management                             */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[1]} text-sm font-normal`}>02</span>
            Waste Management
          </h2>
          <div className={`border-l-2 ${borderColours[1]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction, demolition, and excavation waste accounts for approximately 62% of
                all waste produced in the UK. Every person who produces, stores, transports, or
                disposes of waste has a legal duty of care to manage it responsibly. The waste
                hierarchy must be applied to all waste decisions, prioritising prevention over
                disposal.
              </p>

              <div className="bg-white/5 border border-blue-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[1]} font-medium mb-3`}>Duty of Care</h3>
                <p className="text-white/60 text-sm mb-3">
                  The duty of care for waste requires you to:
                </p>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>Keep waste to a minimum and apply the waste hierarchy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>Store waste safely and securely — prevent it escaping, blowing away, or leaking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>Only transfer waste to an authorised person — check they hold a valid waste carrier licence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>Complete a waste transfer note for every load of non-hazardous waste leaving site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>Complete a consignment note for every movement of hazardous waste</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                    <span>Keep waste transfer notes for a minimum of 2 years (consignment notes for 3 years)</span>
                  </li>
                </ul>
              </div>

              {/* Waste Hierarchy Diagram */}
              <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                <h3 className="text-green-300 font-medium mb-4">The Waste Hierarchy</h3>
                <p className="text-white/60 text-sm mb-4">
                  The waste hierarchy ranks options from most to least preferred. Always start at
                  the top and only move down when higher options are not practicable.
                </p>
                <div className="flex flex-col items-center gap-2">
                  {/* Tier 1 — Prevent */}
                  <div className="w-full max-w-[200px] bg-green-500/20 border border-green-500/40 rounded-lg px-4 py-3 text-center">
                    <span className="text-green-300 font-bold text-sm block">PREVENT</span>
                    <span className="text-white/60 text-xs">Most preferred</span>
                  </div>
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-green-400/50" />
                  {/* Tier 2 — Reuse */}
                  <div className="w-full max-w-[260px] bg-teal-500/20 border border-teal-500/40 rounded-lg px-4 py-3 text-center">
                    <span className="text-teal-300 font-bold text-sm block">REUSE</span>
                    <span className="text-white/60 text-xs">Use again for same or different purpose</span>
                  </div>
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-teal-400/50" />
                  {/* Tier 3 — Recycle */}
                  <div className="w-full max-w-[320px] bg-blue-500/20 border border-blue-500/40 rounded-lg px-4 py-3 text-center">
                    <span className="text-blue-300 font-bold text-sm block">RECYCLE</span>
                    <span className="text-white/60 text-xs">Process into new materials or products</span>
                  </div>
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-blue-400/50" />
                  {/* Tier 4 — Recover */}
                  <div className="w-full max-w-[380px] bg-amber-500/20 border border-amber-500/40 rounded-lg px-4 py-3 text-center">
                    <span className="text-amber-300 font-bold text-sm block">RECOVER</span>
                    <span className="text-white/60 text-xs">Extract energy (e.g. incineration with energy recovery)</span>
                  </div>
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-amber-400/50" />
                  {/* Tier 5 — Dispose */}
                  <div className="w-full max-w-[440px] bg-red-500/20 border border-red-500/40 rounded-lg px-4 py-3 text-center">
                    <span className="text-red-300 font-bold text-sm block">DISPOSE</span>
                    <span className="text-white/60 text-xs">Landfill — last resort only</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-3">Waste Segregation on Site</h3>
                <p className="text-white/60 text-sm mb-3">
                  Segregating waste at source improves recycling rates and reduces costs. Common
                  categories on construction sites include:
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    'Timber — reuse or recycle (dedicated skip/container)',
                    'Metals — high recycling value (steel, copper, aluminium)',
                    'Plasterboard — must be segregated from general waste for recycling',
                    'Concrete and rubble — crush and reuse as aggregate on site',
                    'Packaging — cardboard, plastic wrapping, pallets',
                    'Hazardous waste — asbestos, chemicals, oils, paints, solvents (separate secure storage)',
                    'WEEE — waste electrical and electronic equipment',
                    'General mixed waste — only what cannot be segregated',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                      <span className="text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-3">Site Waste Management Plans</h3>
                <p className="text-white/80 text-sm">
                  Although no longer a legal requirement in England since 2013, site waste management
                  plans (SWMPs) remain best practice and are often required by clients and principal
                  contractors. A SWMP identifies the types and quantities of waste expected, sets
                  targets for waste reduction and recycling, and allocates responsibilities for waste
                  management on site. They help demonstrate compliance with the duty of care and
                  the waste hierarchy, and can significantly reduce waste disposal costs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* -------------------------------------------------------- */}
        {/* SECTION 03 — Water Pollution Prevention                   */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[2]} text-sm font-normal`}>03</span>
            Water Pollution Prevention
          </h2>
          <div className={`border-l-2 ${borderColours[2]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Water pollution from construction sites is one of the most common environmental
                offences prosecuted by the Environment Agency. Construction activities can pollute
                watercourses through silt runoff, cement washings, chemical spills, and fuel leaks.
                Under the Environmental Permitting Regulations 2016, it is an offence to cause or
                knowingly permit a water discharge activity or groundwater activity without a permit.
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[2]} font-medium mb-3`}>Common Construction Pollutants</h3>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-cyan-400" />
                    <span>
                      <strong className="text-white">Silt and sediment</strong> &mdash; from earthworks,
                      excavation, stockpiles, and vehicle movements. Silt smothers fish spawning gravels
                      and blocks light, killing aquatic plants
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-cyan-400" />
                    <span>
                      <strong className="text-white">Cement and concrete</strong> &mdash; highly alkaline
                      (pH 11&ndash;13), extremely toxic to aquatic life. Even small quantities can kill
                      fish over long distances and strip all life from a watercourse
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-cyan-400" />
                    <span>
                      <strong className="text-white">Fuel and oils</strong> &mdash; diesel, petrol,
                      hydraulic fluid. One litre of oil can contaminate up to one million litres of
                      drinking water
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-cyan-400" />
                    <span>
                      <strong className="text-white">Chemicals</strong> &mdash; paints, solvents,
                      cleaning agents, mould oils, curing compounds. Many are toxic to aquatic organisms
                      even in very low concentrations
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-cyan-300 font-medium mb-3">Prevention Measures</h3>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-cyan-400" />
                    <span>
                      <strong className="text-white">Settlement tanks and ponds</strong> &mdash; allow
                      silt to settle out of water before discharge. Must be properly sized and regularly
                      maintained
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-cyan-400" />
                    <span>
                      <strong className="text-white">Silt fencing</strong> &mdash; geotextile barriers
                      placed along the perimeter of excavations and stockpiles to prevent silt-laden
                      runoff reaching watercourses
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-cyan-400" />
                    <span>
                      <strong className="text-white">Bunded fuel storage</strong> &mdash; all fuel and
                      oil storage must be within a bund capable of containing 110% of the largest
                      container&rsquo;s capacity. Bunds must be impermeable and checked regularly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-cyan-400" />
                    <span>
                      <strong className="text-white">Spill kits</strong> &mdash; placed near all fuel
                      storage, refuelling points, and chemical storage areas. All workers should know
                      their location and how to use them
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-cyan-400" />
                    <span>
                      <strong className="text-white">Designated washout areas</strong> &mdash; concrete
                      washout must take place in contained areas, never near drains or watercourses
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-cyan-400" />
                    <span>
                      <strong className="text-white">Drain protection</strong> &mdash; cover or block
                      surface water drains near work areas. Use drain mats or neoprene covers to prevent
                      pollutants entering the drainage system
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-300">Reporting Spills</h3>
                </div>
                <p className="text-white/80 text-sm">
                  If a pollutant has entered or is likely to enter a watercourse, the Environment
                  Agency must be notified immediately on their 24-hour incident hotline:{' '}
                  <strong className="text-white">0800 80 70 60</strong>. Early reporting can help
                  the Environment Agency take action to protect downstream water supplies and
                  ecosystems. Failure to report a pollution incident is itself an offence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 04 — Dust & Air Quality Control                   */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[3]} text-sm font-normal`}>04</span>
            Dust &amp; Air Quality Control
          </h2>
          <div className={`border-l-2 ${borderColours[3]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction dust is a major source of air pollution and can cause both health
                problems for workers and nuisance to neighbours. Dust must be controlled at source
                to protect workers&rsquo; health (occupational exposure) and to prevent environmental
                nuisance. The Clean Air Act 1993 and the Environmental Protection Act 1990 both
                apply to dust emissions from construction sites.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[3]} font-medium mb-3`}>Types of Construction Dust</h3>
                <div className="space-y-3">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <h4 className="text-red-300 font-semibold text-sm mb-1">Silica Dust — Most Dangerous</h4>
                    <p className="text-white/80 text-sm">
                      Generated from cutting, drilling, or grinding concrete, sandstone, mortar, and
                      brick. Respirable crystalline silica (RCS) can cause silicosis, lung cancer, and
                      COPD. The workplace exposure limit is extremely low (0.1 mg/m&sup3;). Requires the
                      strictest controls including water suppression, LEV, and RPE.
                    </p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                    <h4 className="text-amber-300 font-semibold text-sm mb-1">Wood Dust — Hardwood Especially</h4>
                    <p className="text-white/80 text-sm">
                      Generated from sawing, sanding, and routing timber. Hardwood dust is classified
                      as a carcinogen (can cause nasal cancer). Softwood dust can cause asthma and
                      respiratory irritation. The WEL for hardwood dust is 3 mg/m&sup3; and for
                      softwood dust is 5 mg/m&sup3;. On-tool extraction (LEV) is required.
                    </p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <h4 className="text-blue-300 font-semibold text-sm mb-1">General Construction Dust</h4>
                    <p className="text-white/80 text-sm">
                      Generated from demolition, earthworks, sweeping, and vehicle movements. While
                      lower health risk than silica or hardwood dust, it can cause respiratory
                      irritation, exacerbate asthma, and create significant nuisance to neighbours
                      and the surrounding area.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-3">Dust Suppression Methods</h3>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-purple-400" />
                    <span>
                      <strong className="text-white">Water suppression</strong> &mdash; applying water
                      to the cutting point, haul roads, stockpiles, and demolition work to prevent dust
                      becoming airborne. The most common and effective primary control
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-purple-400" />
                    <span>
                      <strong className="text-white">Local exhaust ventilation (LEV)</strong> &mdash;
                      on-tool extraction that captures dust at the point of generation before it becomes
                      airborne. Required for cutting, drilling, and grinding operations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-purple-400" />
                    <span>
                      <strong className="text-white">Damping down</strong> &mdash; regular watering of
                      haul roads, stockpiles, and demolition areas to suppress dust. Particularly
                      important in dry, windy conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-purple-400" />
                    <span>
                      <strong className="text-white">Enclosure</strong> &mdash; enclosing cutting or
                      grinding operations within sheeted areas, or using enclosed cutting booths to
                      contain dust at source
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-purple-400" />
                    <span>
                      <strong className="text-white">Sheeting and covers</strong> &mdash; covering
                      stockpiles, skips, and vehicles transporting dusty materials. Prevents wind
                      dispersal
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-purple-400" />
                    <span>
                      <strong className="text-white">Air quality monitoring</strong> &mdash; dust
                      monitors can be placed at site boundaries to measure dust levels and demonstrate
                      compliance. Particularly important on sites near residential areas, schools, or
                      hospitals
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-2">Clean Air Act Considerations</h3>
                <p className="text-white/80 text-sm">
                  Under the Clean Air Act 1993, it is an offence to emit dark smoke from the chimney
                  of a building or from industrial or trade premises. On construction sites, this
                  means burning waste on site is generally prohibited &mdash; particularly in smoke
                  control areas where it is an offence to emit smoke from a chimney unless using
                  authorised fuel or an exempt appliance. Burning construction waste can produce toxic
                  fumes (especially plastics, treated timber, and painted materials) and constitutes
                  both a health hazard and an environmental offence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* -------------------------------------------------------- */}
        {/* SECTION 05 — Noise & Nuisance                             */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[4]} text-sm font-normal`}>05</span>
            Noise &amp; Nuisance
          </h2>
          <div className={`border-l-2 ${borderColours[4]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Environmental noise from construction is different from occupational noise exposure.
                While occupational noise concerns the health of workers on site (covered by the
                Control of Noise at Work Regulations 2005), environmental noise concerns the impact
                on neighbours and the surrounding community. Both must be managed, but the legislation
                and controls are different.
              </p>

              <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[4]} font-medium mb-3`}>Control of Pollution Act 1974</h3>
                <div className="space-y-3">
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                    <h4 className="text-amber-300 font-semibold text-sm mb-1">Section 60 — Noise Abatement Notice</h4>
                    <p className="text-white/80 text-sm">
                      A Section 60 notice is served <strong className="text-white">by the local
                      authority on the contractor</strong> to control noise from construction works.
                      It can be served without prior warning and can specify: the hours during which
                      work may be carried out, the types of plant or machinery that may or may not be
                      used, the maximum noise levels permitted at the site boundary, and the steps
                      required to minimise noise. Non-compliance is a criminal offence.
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <h4 className="text-green-300 font-semibold text-sm mb-1">Section 61 — Prior Consent</h4>
                    <p className="text-white/80 text-sm">
                      A Section 61 agreement is a <strong className="text-white">voluntary
                      application by the contractor to the local authority</strong> for prior consent
                      before work begins. The contractor outlines the proposed works, methods, hours,
                      and noise mitigation measures. If the local authority grants consent, the
                      contractor is protected from a Section 60 notice provided they comply with the
                      agreed conditions. This is considered best practice for large or long-duration
                      projects, particularly in residential areas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-amber-300 font-medium mb-3">Best Practicable Means (BPM)</h3>
                <p className="text-white/60 text-sm mb-3">
                  Contractors must use the best practicable means to reduce noise and vibration.
                  This includes:
                </p>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Using modern, well-maintained plant and equipment with effective silencers and noise enclosures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Selecting the quietest available plant for the task — e.g. electric plant instead of diesel where possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Positioning noisy equipment as far as possible from noise-sensitive receptors (homes, schools, hospitals)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Using acoustic barriers, hoarding, or screening to attenuate noise at the site boundary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Turning off plant and equipment when not in use — no unnecessary idling</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="text-amber-300 font-medium mb-3">Working Hours &amp; Neighbour Relations</h3>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>
                      <strong className="text-white">Typical permitted hours:</strong> Monday to Friday
                      08:00&ndash;18:00, Saturday 08:00&ndash;13:00. No noisy work on Sundays or bank
                      holidays. Exact hours vary by local authority
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>
                      <strong className="text-white">Neighbour notification:</strong> neighbours should
                      be informed before particularly noisy or disruptive phases of work (piling,
                      demolition, ground works). This is both good practice and often a condition of
                      planning consent
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>
                      <strong className="text-white">Complaints procedure:</strong> a clear point of
                      contact should be available for neighbours to raise concerns. Early resolution
                      prevents formal complaints to the local authority
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 06 — Protected Species & Ecology                  */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[5]} text-sm font-normal`}>06</span>
            Protected Species &amp; Ecology
          </h2>
          <div className={`border-l-2 ${borderColours[5]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction work can destroy or disturb habitats used by protected species. The
                Wildlife and Countryside Act 1981 and the Conservation of Habitats and Species
                Regulations 2017 place strict legal obligations on anyone carrying out work that
                could affect protected species. Ignorance of the law is not a defence &mdash;
                penalties include unlimited fines and imprisonment.
              </p>

              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[5]} font-medium mb-3`}>Commonly Encountered Protected Species</h3>
                <div className="space-y-3">
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                    <h4 className="text-purple-300 font-semibold text-sm mb-1">Bats (All Species)</h4>
                    <p className="text-white/80 text-sm">
                      All 18 species of bat in the UK are protected. It is an offence to deliberately
                      kill, injure, or capture a bat, to deliberately disturb a bat, or to damage or
                      destroy a bat roost &mdash; even if no bats are present at the time. Bats
                      commonly roost in buildings (particularly roofs, behind fascia boards, under
                      tiles), trees (especially those with cavities, crevices, or loose bark), and
                      bridges. Bat surveys are required before demolition or renovation of buildings
                      likely to support bats.
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <h4 className="text-green-300 font-semibold text-sm mb-1">Great Crested Newts</h4>
                    <p className="text-white/80 text-sm">
                      A European Protected Species. It is an offence to capture, kill, disturb, or
                      injure great crested newts, or to damage or destroy their habitats. They breed
                      in ponds but spend most of the year on land, up to 500 metres from their
                      breeding pond. Construction work near ponds or on land within 500 metres of
                      known great crested newt populations requires ecological surveys and potentially
                      a Natural England licence.
                    </p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <h4 className="text-blue-300 font-semibold text-sm mb-1">Nesting Birds (All Wild Birds)</h4>
                    <p className="text-white/80 text-sm">
                      It is an offence to intentionally kill, injure, or take any wild bird, or to
                      intentionally take, damage, or destroy the nest of any wild bird while in use or
                      being built. The main nesting season is March to August, but some species nest
                      outside this period. Vegetation clearance and demolition should be timed to avoid
                      the nesting season. If nesting birds are found during work, that area must stop
                      until the birds have fledged.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-300 font-medium mb-3">What To Do If You Find a Protected Species</h3>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      1
                    </span>
                    <span>
                      <strong>Stop work immediately</strong> in the affected area &mdash; do not
                      continue any activity that could disturb the species or its habitat
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      2
                    </span>
                    <span>
                      <strong>Do not handle, move, or disturb</strong> the animal or its nest/roost
                      &mdash; touching a protected species is itself an offence
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      3
                    </span>
                    <span>
                      <strong>Report to your supervisor immediately</strong> &mdash; they will need
                      to escalate to the site manager and environmental manager
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      4
                    </span>
                    <span>
                      <strong>Contact a licensed ecologist</strong> &mdash; they will assess the
                      situation and advise on the correct course of action, including whether a
                      Natural England licence is required
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                      5
                    </span>
                    <span>
                      <strong>Do not resume work</strong> in the affected area until the ecologist
                      has confirmed it is safe to do so
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className="font-semibold text-green-300 mb-2">Biodiversity Net Gain</h3>
                <p className="text-white/80 text-sm">
                  Since February 2024, most developments in England must deliver a minimum 10%
                  biodiversity net gain (BNG) under the Environment Act 2021. This means the
                  development must leave the natural environment in a measurably better state than
                  before. BNG is measured using the statutory biodiversity metric and can be achieved
                  through on-site habitat creation, off-site habitat creation, or purchasing
                  biodiversity credits. Construction workers should be aware that ecological features
                  on site (hedgerows, trees, ponds, grassland) may need to be retained or replaced
                  as part of the BNG requirement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 06 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* -------------------------------------------------------- */}
        {/* SECTION 07 — Energy Efficiency & Sustainability           */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[6]} text-sm font-normal`}>07</span>
            Energy Efficiency &amp; Sustainability
          </h2>
          <div className={`border-l-2 ${borderColours[6]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The construction industry is a significant contributor to carbon emissions, both
                through the energy used during the construction process and through the materials
                and products specified. Every worker on site can contribute to reducing the
                industry&rsquo;s environmental impact through simple, practical measures.
              </p>

              <div className="bg-white/5 border border-teal-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[6]} font-medium mb-3`}>Reducing Energy Use on Site</h3>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-teal-400" />
                    <span>
                      <strong className="text-white">Efficient plant and equipment</strong> &mdash;
                      use modern, fuel-efficient plant. Switch off engines when not in use rather than
                      leaving them idling. Use electric plant where possible instead of diesel
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-teal-400" />
                    <span>
                      <strong className="text-white">LED lighting</strong> &mdash; use LED tower
                      lights and task lighting instead of traditional halogen or metal halide. LEDs
                      use up to 80% less energy and last significantly longer
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-teal-400" />
                    <span>
                      <strong className="text-white">Timer switches and sensors</strong> &mdash; use
                      timers on lighting and heating in welfare facilities. PIR sensors ensure lights
                      are only on when areas are occupied
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-teal-400" />
                    <span>
                      <strong className="text-white">Generator management</strong> &mdash; right-size
                      generators for the load required. Over-sized generators running at low load waste
                      fuel. Consider hybrid or solar generators where appropriate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-teal-400" />
                    <span>
                      <strong className="text-white">Welfare cabin insulation</strong> &mdash; ensure
                      doors and windows are closed when heating is on. Report draughts and broken seals
                      to prevent heat loss
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">Reducing Transport Emissions</h3>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-teal-400" />
                    <span>Consolidate deliveries to reduce the number of vehicle movements to and from site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-teal-400" />
                    <span>Use local suppliers where possible to reduce transport distances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-teal-400" />
                    <span>Plan deliveries to avoid peak traffic periods, reducing time spent idling in congestion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-teal-400" />
                    <span>Consider car-sharing, public transport, or cycling for workforce travel to site</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-teal-500/30 p-4 rounded-lg">
                <h3 className="text-teal-300 font-medium mb-3">Sustainable Materials &amp; Carbon Awareness</h3>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-teal-400" />
                    <span>
                      <strong className="text-white">Carbon footprint</strong> &mdash; every material
                      used in construction has an embodied carbon cost (the energy used to extract,
                      manufacture, transport, and install it). Awareness of this helps inform better
                      material choices
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-teal-400" />
                    <span>
                      <strong className="text-white">Sustainable sourcing</strong> &mdash; use timber
                      from certified sustainable sources (FSC or PEFC). Specify recycled aggregate where
                      technical requirements allow
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-teal-400" />
                    <span>
                      <strong className="text-white">BREEAM</strong> &mdash; the Building Research
                      Establishment Environmental Assessment Method assesses buildings across categories
                      including energy, water, materials, waste, and ecology. Ratings range from Pass
                      to Outstanding. Many public and commercial projects require a minimum BREEAM rating
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-teal-400" />
                    <span>
                      <strong className="text-white">Reducing material waste</strong> &mdash; order
                      accurate quantities, use standard sizes to reduce offcuts, protect materials from
                      weather damage, and return unused materials to suppliers where possible
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 08 — Spillage Response & Emergency                */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className={`${numColours[7]} text-sm font-normal`}>08</span>
            Spillage Response &amp; Emergency
          </h2>
          <div className={`border-l-2 ${borderColours[7]} pl-4 sm:pl-6`}>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Spillages of fuel, oil, chemicals, or other pollutants are one of the most common
                causes of environmental incidents on construction sites. Every worker should know
                where the nearest spill kit is located, how to use it, and the reporting chain for
                spills. Rapid response can prevent a minor spill from becoming a major pollution
                incident.
              </p>

              <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[7]} font-medium mb-3`}>Spill Kit Contents</h3>
                <p className="text-white/60 text-sm mb-3">
                  A standard construction site spill kit typically contains:
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    'Absorbent granules — for soaking up liquid spills on hard surfaces',
                    'Absorbent pads — for wiping up smaller spills and residue',
                    'Absorbent booms/socks — for containing spills and blocking drains',
                    'Drain covers/mats — neoprene covers to seal surface water drains',
                    'Heavy-duty waste bags — for collecting contaminated absorbent material',
                    'PPE — chemical-resistant gloves, goggles, overshoes',
                    'Instructions — clear step-by-step spill response procedure',
                    'Disposal labels — for marking contaminated waste for correct disposal',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span className="text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spillage Response Steps — Flowchart Diagram */}
              <div className="bg-white/5 border border-red-400/30 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-4">Spillage Response Steps</h3>
                <p className="text-white/60 text-sm mb-4">
                  Follow these steps in order when responding to any spillage on site.
                </p>
                <div className="flex flex-col items-center gap-2">
                  {/* Step 1 */}
                  <div className="w-full max-w-md bg-red-500/20 border border-red-500/40 rounded-lg px-4 py-3 text-center">
                    <span className="text-red-300 font-bold text-sm block">1. STOP &amp; ASSESS</span>
                    <span className="text-white/60 text-xs">
                      Identify the substance, assess the size, check for hazards (fire, fumes)
                    </span>
                  </div>
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-red-400/50" />
                  {/* Step 2 */}
                  <div className="w-full max-w-md bg-amber-500/20 border border-amber-500/40 rounded-lg px-4 py-3 text-center">
                    <span className="text-amber-300 font-bold text-sm block">2. PROTECT YOURSELF</span>
                    <span className="text-white/60 text-xs">
                      Don PPE from spill kit (gloves, goggles). Avoid breathing fumes
                    </span>
                  </div>
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-amber-400/50" />
                  {/* Step 3 */}
                  <div className="w-full max-w-md bg-blue-500/20 border border-blue-500/40 rounded-lg px-4 py-3 text-center">
                    <span className="text-blue-300 font-bold text-sm block">3. CONTAIN THE SPILL</span>
                    <span className="text-white/60 text-xs">
                      Use booms/socks to surround spill. Block drains with covers. Stop the source
                    </span>
                  </div>
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-blue-400/50" />
                  {/* Step 4 */}
                  <div className="w-full max-w-md bg-purple-500/20 border border-purple-500/40 rounded-lg px-4 py-3 text-center">
                    <span className="text-purple-300 font-bold text-sm block">4. ABSORB &amp; CLEAN UP</span>
                    <span className="text-white/60 text-xs">
                      Apply absorbent granules/pads. Collect all contaminated material in waste bags
                    </span>
                  </div>
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-purple-400/50" />
                  {/* Step 5 */}
                  <div className="w-full max-w-md bg-cyan-500/20 border border-cyan-500/40 rounded-lg px-4 py-3 text-center">
                    <span className="text-cyan-300 font-bold text-sm block">5. REPORT</span>
                    <span className="text-white/60 text-xs">
                      Inform supervisor immediately. If watercourse affected: call Environment Agency (0800 80 70 60)
                    </span>
                  </div>
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-cyan-400/50" />
                  {/* Step 6 */}
                  <div className="w-full max-w-md bg-green-500/20 border border-green-500/40 rounded-lg px-4 py-3 text-center">
                    <span className="text-green-300 font-bold text-sm block">6. RECORD &amp; INVESTIGATE</span>
                    <span className="text-white/60 text-xs">
                      Document the incident. Investigate root cause. Implement prevention measures
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-3">Containment Procedures</h3>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Stop the source</strong> &mdash; if safe to do so,
                      stop the leak at its source (close a valve, turn off a pump, right a knocked-over
                      container)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Surround the spill</strong> &mdash; use absorbent
                      booms or socks to create a barrier around the spill, preventing it from spreading
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Block drains</strong> &mdash; cover or block any
                      surface water drains in the vicinity with drain covers or absorbent booms. This
                      is the priority if the spill is near drainage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Do NOT wash away with water</strong> &mdash; this
                      spreads the contamination and makes it more likely to reach watercourses. It also
                      increases the volume of contaminated liquid to clean up
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-red-500/30 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-3">Environment Agency Notification</h3>
                <p className="text-white/80 text-sm mb-3">
                  The Environment Agency must be notified if a pollutant has entered or is likely to
                  enter a watercourse (river, stream, lake, ditch, or groundwater). Report to the
                  24-hour incident hotline:
                </p>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center mb-3">
                  <span className="text-red-300 font-bold text-lg">0800 80 70 60</span>
                  <span className="text-white/60 text-xs block">Environment Agency Incident Hotline — 24 hours</span>
                </div>
                <p className="text-white/80 text-sm">
                  When reporting, you will need to provide: your name and contact details, the
                  location of the incident (grid reference or postcode), the type and estimated
                  quantity of pollutant, whether it has entered a watercourse, and what containment
                  actions have been taken.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-red-300 font-medium mb-3">Prevention Measures</h3>
                <ul className="text-white/80 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Bunded storage</strong> &mdash; store all fuels and
                      oils within impermeable bunds with 110% capacity of the largest container
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Drip trays</strong> &mdash; place drip trays under
                      plant, machinery, and equipment during refuelling and maintenance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Refuelling procedures</strong> &mdash; refuel on
                      hard standing away from drains and watercourses. Never leave refuelling unattended.
                      Use nozzle shut-off devices to prevent overfilling
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Regular inspections</strong> &mdash; check fuel and
                      chemical storage daily for leaks, damage, and deterioration. Check bunds for
                      rainwater accumulation (must be emptied regularly)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Spill kit maintenance</strong> &mdash; check spill
                      kits regularly to ensure contents are complete and in usable condition. Replace
                      used items immediately after an incident
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span>
                      <strong className="text-white">Training</strong> &mdash; all workers should know
                      where spill kits are located, how to use them, and the reporting procedure. Include
                      spill response in site inductions
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-amber-300">Recording &amp; Investigation</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Every spill, no matter how small, should be recorded and investigated. The record
                  should include: the date, time, and location of the spill; the type and quantity of
                  substance spilled; how the spill occurred (root cause); the containment and clean-up
                  actions taken; whether any pollution of watercourses or land occurred; and the
                  corrective actions implemented to prevent recurrence. This information is essential
                  for demonstrating due diligence and for continuous improvement of environmental
                  management on site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* FAQs                                                      */}
        {/* -------------------------------------------------------- */}
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

        {/* -------------------------------------------------------- */}
        {/* Quiz                                                      */}
        {/* -------------------------------------------------------- */}
        <Quiz title="Environmental Protection Quiz" questions={quizQuestions} />

        {/* -------------------------------------------------------- */}
        {/* Navigation                                                */}
        {/* -------------------------------------------------------- */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-green-500 text-white hover:bg-green-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-5">
              Next: Module 5 &rarr;
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default CscsCardModule4Section4;
