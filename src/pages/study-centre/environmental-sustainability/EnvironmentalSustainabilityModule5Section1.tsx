import { ArrowLeft, Leaf, CheckCircle, AlertTriangle, Calendar, TreePine, Shield, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "wildlife-countryside-offences",
    question:
      "Under the Wildlife & Countryside Act 1981, what is the legal consequence of intentionally killing a Schedule 5 protected animal?",
    options: [
      "A verbal warning from the local council",
      "A fixed penalty notice of up to £500",
      "A criminal offence carrying an unlimited fine and/or up to six months' imprisonment per offence",
      "An administrative charge handled by the site manager",
    ],
    correctIndex: 2,
    explanation:
      "Killing, injuring, or taking a Schedule 5 protected animal is a criminal offence under the Wildlife & Countryside Act 1981. Each offence can result in an unlimited fine and/or up to six months' imprisonment. These are strict liability offences — ignorance of the species' presence is not a defence if due diligence has not been exercised.",
  },
  {
    id: "bat-roost-protection",
    question:
      "When are bat roosts legally protected under UK law?",
    options: [
      "Only during the summer breeding season (May to August)",
      "Only when bats are physically present in the roost",
      "Year-round, whether bats are present or not",
      "Only during the winter hibernation period (November to March)",
    ],
    correctIndex: 2,
    explanation:
      "All bat species and their roosts are protected year-round under the Conservation of Habitats & Species Regulations 2017 and the Wildlife & Countryside Act 1981. A bat roost is protected even when bats are not physically present — it is the structure itself that is protected, not just the bats within it. Disturbing, damaging, or destroying a bat roost at any time of year is a criminal offence.",
  },
  {
    id: "biodiversity-net-gain",
    question:
      "What is the minimum biodiversity net gain percentage required under the Environment Act 2021?",
    options: [
      "5% net gain",
      "10% net gain",
      "15% net gain",
      "20% net gain",
    ],
    correctIndex: 1,
    explanation:
      "The Environment Act 2021 requires a minimum of 10% biodiversity net gain for most new developments in England. This is measured using the DEFRA biodiversity metric and must be maintained for at least 30 years. Developers must demonstrate that the development will result in a measurable improvement in biodiversity compared to the pre-development baseline.",
  },
];

const faqs = [
  {
    question:
      "What should I do if I discover a bat roost during construction work?",
    answer:
      "Stop all work in the area immediately and do not disturb the roost further. Contact your site ecologist or ecological clerk of works straight away. They will assess the situation and liaise with Natural England. You will likely need to apply for a European Protected Species mitigation licence before any further work can proceed in the area. Under no circumstances should you attempt to remove bats yourself, block their access, or continue work that could affect the roost. Continuing work without a licence is a criminal offence that can result in unlimited fines and imprisonment. Even if no bats are visibly present, the roost structure itself is protected year-round.",
  },
  {
    question:
      "Can I carry out vegetation clearance during the bird nesting season?",
    answer:
      "The bird nesting season in the UK runs broadly from March to August, though some species nest earlier or later. It is not illegal to carry out vegetation clearance during this period, but it IS illegal to intentionally or recklessly destroy or damage an active nest, or to disturb any bird while it is on or near a nest containing eggs or young. If vegetation clearance is planned during the nesting season, a suitably qualified ecologist must carry out a nesting bird check no more than 48 hours before work begins. If active nests are found, an exclusion zone must be established and no work can take place within that zone until the chicks have fledged and left the nest. The safest approach is to carry out all vegetation clearance outside the nesting season wherever possible.",
  },
  {
    question:
      "How does biodiversity net gain work in practice on a construction project?",
    answer:
      "Before development begins, a baseline assessment of the site's biodiversity value is carried out using the DEFRA biodiversity metric. This assigns a numerical score to each habitat type present on site based on its distinctiveness, condition, and strategic significance. The developer must then demonstrate that the post-development biodiversity value will be at least 10% higher than the baseline. This can be achieved through on-site habitat creation (e.g. planting native hedgerows, creating wildflower meadows, installing green roofs), off-site habitat creation on land controlled by the developer, or purchasing biodiversity units from a habitat bank. The net gain must be secured and managed for a minimum of 30 years through a legally binding management plan.",
  },
  {
    question:
      "What penalties can an individual face for damaging a Site of Special Scientific Interest (SSSI)?",
    answer:
      "Under the Wildlife & Countryside Act 1981 (as amended by the Countryside and Rights of Way Act 2000), it is a criminal offence to intentionally or recklessly damage the special features of a SSSI. Individuals can face unlimited fines on conviction. In addition, Natural England has the power to issue enforcement notices requiring restoration of the damaged features at the offender's expense. Planning enforcement action can also be taken against any development that has damaged a SSSI without the necessary consents. Company directors and managers can be held personally liable if the offence was committed with their consent or connivance. The courts have shown a willingness to impose substantial penalties in serious cases of SSSI damage.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which piece of legislation provides the primary framework for protecting wild animals, birds, and plants in the UK?",
    options: [
      "The Environmental Protection Act 1990",
      "The Wildlife & Countryside Act 1981",
      "The Health and Safety at Work Act 1974",
      "The Town and Country Planning Act 1990",
    ],
    correctAnswer: 1,
    explanation:
      "The Wildlife & Countryside Act 1981 is the principal legislation for the protection of wildlife in Great Britain. It establishes Schedules of protected species (Schedule 1 birds, Schedule 5 animals, Schedule 8 plants), creates offences related to killing, injuring, or disturbing protected species, and provides for the designation of Sites of Special Scientific Interest (SSSIs).",
  },
  {
    id: 2,
    question:
      "Under the Conservation of Habitats & Species Regulations 2017, what must a developer obtain before carrying out work that would affect a European Protected Species?",
    options: [
      "A standard planning permission only",
      "A European Protected Species mitigation licence from Natural England",
      "Written permission from the local parish council",
      "An environmental impact assessment only, with no further licence required",
    ],
    correctAnswer: 1,
    explanation:
      "If work is likely to result in a breach of the protection afforded to European Protected Species (such as bats, great crested newts, dormice, or otters), a European Protected Species mitigation licence must be obtained from Natural England before work can proceed. The licence application must demonstrate that there is no satisfactory alternative, that the action is necessary for an imperative reason of overriding public interest, and that the species' conservation status will be maintained.",
  },
  {
    id: 3,
    question:
      "Which of the following statements about great crested newts is correct?",
    options: [
      "They are only protected during their breeding season in spring",
      "Their terrestrial habitat within 500 metres of a breeding pond may also require protection",
      "A licence is only needed if more than 10 newts are present on site",
      "They are protected under the Badger Act 1992",
    ],
    correctAnswer: 1,
    explanation:
      "Great crested newts are protected at all life stages and at all times of year under both the Wildlife & Countryside Act 1981 and the Conservation of Habitats & Species Regulations 2017. Their protection extends beyond the breeding pond to include their terrestrial habitat — the land they use for foraging, sheltering, and hibernating, which can extend up to 500 metres from a breeding pond. Development within this zone may require a licence and mitigation measures.",
  },
  {
    id: 4,
    question:
      "What is a Site of Special Scientific Interest (SSSI)?",
    options: [
      "A site designated by the local council for recreational use",
      "A site designated by Natural England for its outstanding wildlife, geological, or physiographical features",
      "A site where construction is permanently prohibited under any circumstances",
      "A voluntary conservation area with no legal protection",
    ],
    correctAnswer: 1,
    explanation:
      "SSSIs are designated by Natural England (in England) as sites of outstanding wildlife, geological, or physiographical interest. They carry strong legal protection — operations likely to damage the special features require consent from Natural England, and it is a criminal offence to intentionally or recklessly damage them. Development affecting a SSSI requires careful assessment and may be refused or subject to strict conditions.",
  },
  {
    id: 5,
    question:
      "Under the Protection of Badgers Act 1992, which of the following is a criminal offence?",
    options: [
      "Walking near a badger sett on a public footpath",
      "Photographing a badger from a reasonable distance without disturbing it",
      "Intentionally or recklessly interfering with a badger sett, including blocking entrances",
      "Reporting the location of a badger sett to Natural England",
    ],
    correctAnswer: 2,
    explanation:
      "The Protection of Badgers Act 1992 makes it a criminal offence to wilfully kill, injure, or take a badger, or to interfere with a badger sett. Interference includes blocking entrances, digging into the sett, or causing disturbance (such as heavy vibration from construction machinery) near an active sett. Development near a badger sett typically requires a licence from Natural England and mitigation measures to avoid disturbance.",
  },
  {
    id: 6,
    question:
      "What is the purpose of pre-commencement ecological surveys on a construction site?",
    options: [
      "To confirm that no protected species are present so that work can proceed without restriction",
      "To identify the presence or likely presence of protected species and habitats so that appropriate mitigation can be planned",
      "To provide evidence that ecological constraints do not apply to the project",
      "To satisfy insurance requirements only, with no legal significance",
    ],
    correctAnswer: 1,
    explanation:
      "Pre-commencement ecological surveys identify whether protected species or habitats are present or likely to be present on or near the development site. This information is essential for planning appropriate mitigation measures, determining whether licences are required, establishing exclusion zones and seasonal constraints, and ensuring that the development complies with wildlife legislation. Failure to carry out adequate surveys does not provide a defence against prosecution if protected species are harmed.",
  },
  {
    id: 7,
    question:
      "For how long must biodiversity net gain be maintained under the Environment Act 2021?",
    options: [
      "5 years",
      "10 years",
      "20 years",
      "30 years",
    ],
    correctAnswer: 3,
    explanation:
      "Biodiversity net gain achieved through habitat creation or enhancement must be secured and maintained for a minimum of 30 years. This is enforced through legally binding conservation covenants or planning obligations (Section 106 agreements). A habitat management and monitoring plan must be in place for the full 30-year period, ensuring that the created habitats are properly established and maintained to deliver the intended biodiversity benefits.",
  },
  {
    id: 8,
    question:
      "Which enforcement body is primarily responsible for investigating wildlife offences related to protected species and habitats in England?",
    options: [
      "The Health and Safety Executive (HSE)",
      "Natural England, supported by the police",
      "The Environment Agency exclusively",
      "Local authority building control departments",
    ],
    correctAnswer: 1,
    explanation:
      "Natural England is the primary statutory body responsible for the conservation of wildlife and habitats in England. It investigates breaches of wildlife legislation, issues licences for work affecting protected species, and can take enforcement action including prosecution. The police (particularly specialist wildlife crime officers) also investigate wildlife offences and can bring criminal prosecutions. Natural England works closely with the Crown Prosecution Service and can refer cases for criminal prosecution where serious offences have been committed.",
  },
];

export default function EnvironmentalSustainabilityModule5Section1() {
  useSEO({
    title:
      "Protected Species & Habitats | Environmental Sustainability Module 5.1",
    description:
      "UK wildlife legislation, protected species in construction, habitat designations, biodiversity net gain, ecological surveys, seasonal constraints, and enforcement for construction professionals.",
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
            <Link to="../environmental-sustainability-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <Leaf className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-400 text-xs font-semibold">
              MODULE 5 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Protected Species &amp; Habitats
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            UK wildlife legislation, protected species encountered in
            construction, habitat designations, biodiversity net gain,
            ecological surveys, and enforcement
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>All bats:</strong> Protected year-round, including
                roosts when bats are absent
              </li>
              <li>
                <strong>10% net gain:</strong> Mandatory biodiversity
                improvement for new developments
              </li>
              <li>
                <strong>Criminal offences:</strong> Unlimited fines and/or
                imprisonment for breaches
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Nesting season:</strong> March to August &mdash; check
                before clearing vegetation
              </li>
              <li>
                <strong>30-year management:</strong> Created habitats must be
                maintained long-term
              </li>
              <li>
                <strong>Due diligence:</strong> Ignorance is not a defence if
                surveys were not carried out
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why biodiversity matters and how construction impacts habitats and species",
              "Identify the key provisions of the Wildlife & Countryside Act 1981 relevant to construction",
              "Describe the European Protected Species regime under the Habitats Regulations 2017",
              "Recognise the protected species most commonly encountered on construction sites",
              "Explain the different types of protected habitat designations in the UK",
              "Understand the Environment Act 2021 requirement for 10% biodiversity net gain",
              "Describe the practical measures for working near protected features",
              "Know the penalties and enforcement mechanisms for wildlife offences",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Biodiversity Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">01</span>
            Why Biodiversity Matters
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Biodiversity</strong> &mdash; the variety of life on
                Earth &mdash; underpins the{" "}
                <strong>ecosystem services</strong> that human civilisation
                depends upon. These are not abstract environmental concepts;
                they are practical services that directly affect our daily
                lives and the viability of the construction industry itself.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Ecosystem Services We Depend Upon
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pollination</strong>{" "}
                      &mdash; bees, butterflies, and other insects pollinate
                      approximately 75% of global food crops. Without
                      pollinators, food production collapses
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Water purification
                      </strong>{" "}
                      &mdash; wetlands, rivers, and their associated ecosystems
                      naturally filter and purify water, reducing the cost of
                      water treatment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Flood defence</strong>{" "}
                      &mdash; natural habitats such as floodplains, wetlands,
                      and woodlands absorb and slow rainwater, reducing the
                      risk and severity of flooding downstream
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Carbon sequestration
                      </strong>{" "}
                      &mdash; forests, peatlands, and grasslands absorb and
                      store carbon dioxide, helping to regulate climate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Soil health</strong>{" "}
                      &mdash; earthworms, fungi, and microorganisms maintain
                      soil structure and fertility, essential for agriculture
                      and the stability of built structures
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    UK Biodiversity Decline
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The UK is one of the most{" "}
                  <strong className="text-white">
                    nature-depleted countries in the world
                  </strong>
                  . The 2023 State of Nature report found that 16% of UK
                  species are threatened with extinction, and species
                  abundance has fallen by an average of 19% since 1970.
                  Construction and development are significant drivers of
                  habitat loss, accounting for the direct destruction of
                  greenfield sites, fragmentation of wildlife corridors, and
                  disturbance of species during works.
                </p>
              </div>

              <p>
                The construction industry has a{" "}
                <strong>legal and moral responsibility</strong> to minimise
                its impact on biodiversity. This is not optional &mdash; it
                is enforced through criminal law, planning conditions, and
                the new mandatory biodiversity net gain requirement. Every
                person working on a construction site needs to understand
                which species and habitats are protected, what the law
                requires, and what the consequences are for getting it wrong.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Key Principle:</strong>{" "}
                  Biodiversity protection is not about preventing development
                  &mdash; it is about ensuring that development is carried
                  out in a way that{" "}
                  <strong>
                    avoids unnecessary harm, mitigates unavoidable impacts,
                    and compensates for any residual loss
                  </strong>
                  . This is known as the mitigation hierarchy: avoid first,
                  mitigate second, compensate last.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Wildlife & Countryside Act 1981 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">02</span>
            Wildlife &amp; Countryside Act 1981
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The{" "}
                <strong>Wildlife &amp; Countryside Act 1981</strong> (WCA) is
                the principal legislation for the protection of wildlife in
                Great Britain. It establishes three key Schedules of
                protected species and creates criminal offences for harming
                them.
              </p>

              <div className="bg-white/5 border-2 border-emerald-500/30 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Scale className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-bold text-emerald-400">
                    Protected Species Schedules
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-emerald-400">1</span>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        Schedule 1 &mdash; Birds
                      </p>
                    </div>
                    <p className="text-xs text-white/70">
                      Birds afforded special protection, including barn owls,
                      peregrine falcons, kingfishers, and red kites. It is an
                      offence to intentionally or recklessly disturb these
                      species at or near their nest during the breeding season.
                      All wild birds receive basic protection under Part 1 of
                      the Act.
                    </p>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-emerald-400">5</span>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        Schedule 5 &mdash; Animals
                      </p>
                    </div>
                    <p className="text-xs text-white/70">
                      Animals given special protection, including all bats, great
                      crested newts, dormice, otters, water voles, slow worms,
                      adders, grass snakes, and common lizards. It is an offence
                      to intentionally kill, injure, or take these species, or to
                      damage or destroy their places of shelter.
                    </p>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-emerald-400">8</span>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        Schedule 8 &mdash; Plants
                      </p>
                    </div>
                    <p className="text-xs text-white/70">
                      Plants given special protection, including bluebell
                      (wild), lady&apos;s slipper orchid, and shore dock. It is
                      an offence to intentionally pick, uproot, or destroy these
                      species. It is also an offence for anyone to uproot any
                      wild plant without authorisation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Key Offences Under the WCA 1981
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Killing, injuring, or taking
                      </strong>{" "}
                      any wild bird, or taking or destroying their eggs or nests
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Intentionally or recklessly disturbing
                      </strong>{" "}
                      Schedule 1 birds at or near their nest during the
                      breeding season
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Killing, injuring, or taking
                      </strong>{" "}
                      Schedule 5 animals, or damaging or destroying their
                      places of shelter or protection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Picking, uprooting, or destroying
                      </strong>{" "}
                      Schedule 8 plants
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Penalties
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Offences under the Wildlife &amp; Countryside Act 1981 are{" "}
                  <strong className="text-white">criminal offences</strong>.
                  Each offence can carry an{" "}
                  <strong className="text-white">unlimited fine</strong>{" "}
                  and/or{" "}
                  <strong className="text-white">
                    up to six months&apos; imprisonment
                  </strong>
                  . Penalties are per specimen &mdash; if ten protected
                  animals are killed, that is ten separate offences. Courts
                  can also order{" "}
                  <strong className="text-white">
                    forfeiture of equipment and vehicles
                  </strong>{" "}
                  used in the commission of the offence.
                </p>
              </div>

              <p>
                <strong>Licensing:</strong> Natural England can issue licences
                permitting actions that would otherwise be offences, where
                there is a justified need (such as development with
                overriding public interest) and the conservation status of
                the species will be maintained. Licences are not granted
                automatically &mdash; they require detailed survey data,
                evidence that alternatives have been considered, and a
                comprehensive mitigation plan.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Conservation of Habitats & Species Regulations 2017 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">03</span>
            Conservation of Habitats &amp; Species Regulations 2017
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The{" "}
                <strong>
                  Conservation of Habitats and Species Regulations 2017
                </strong>{" "}
                (commonly known as the &ldquo;Habitats Regulations&rdquo;)
                transposed the EU Habitats Directive into UK law and provide
                the highest level of protection for certain species and
                habitats. These regulations were retained in UK law after
                Brexit.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  European Protected Species (EPS)
                </p>
                <p className="text-sm text-white/80 mb-2">
                  Species listed in{" "}
                  <strong className="text-white">Annex IV</strong> of the
                  Habitats Directive receive the strictest protection. In the
                  UK, the most commonly encountered EPS in construction are:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        All 18 species of bat
                      </strong>{" "}
                      found in the UK
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Great crested newt
                      </strong>{" "}
                      (Triturus cristatus)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Dormouse</strong>{" "}
                      (Muscardinus avellanarius)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Otter</strong> (Lutra
                      lutra)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Annex II Species &amp; Habitat Designations
                </p>
                <p className="text-sm text-white/80 mb-2">
                  Species listed in{" "}
                  <strong className="text-white">Annex II</strong> require
                  the designation of{" "}
                  <strong className="text-white">
                    Special Areas of Conservation (SACs)
                  </strong>{" "}
                  for their protection. Any plan or project likely to have a
                  significant effect on a SAC must undergo a{" "}
                  <strong className="text-white">
                    Habitats Regulations Assessment (HRA)
                  </strong>{" "}
                  before it can proceed.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Screening:</strong>{" "}
                      Determines whether the project is likely to have a
                      significant effect on the SAC
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Appropriate Assessment:
                      </strong>{" "}
                      If screening identifies a likely significant effect, a
                      detailed assessment of impacts on site integrity must be
                      carried out
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Imperative reasons of overriding public interest
                        (IROPI):
                      </strong>{" "}
                      Only where there is no alternative and the reasons are
                      of exceptional public importance can a project proceed
                      despite adverse effects on a SAC
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Derogation Licences
                </p>
                <p className="text-sm text-white/80">
                  Where development will unavoidably affect European Protected
                  Species, a{" "}
                  <strong className="text-white">
                    European Protected Species mitigation licence
                  </strong>{" "}
                  (derogation licence) must be obtained from Natural England.
                  Three strict tests must be met:
                </p>
                <ul className="text-sm text-white/80 space-y-1 mt-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      There is{" "}
                      <strong className="text-white">
                        no satisfactory alternative
                      </strong>{" "}
                      that would avoid or reduce the impact
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The action is necessary for an{" "}
                      <strong className="text-white">
                        imperative reason of overriding public interest
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The action will{" "}
                      <strong className="text-white">
                        not be detrimental to the maintenance of the species
                        at a favourable conservation status
                      </strong>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Remember:</strong>{" "}
                  The Habitats Regulations provide the{" "}
                  <strong>highest level of species protection</strong> in UK
                  law. Working without the required licence where European
                  Protected Species are present is a criminal offence
                  regardless of whether planning permission has been granted.
                  Planning permission does not override the need for an EPS
                  licence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Protected Species in Construction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">04</span>
            Protected Species in Construction
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following protected species are most frequently
                encountered on construction sites in the UK. Understanding
                their ecology, legal protection, and the implications for
                construction work is essential for every site operative.
              </p>

              {/* Bats */}
              <div className="bg-white/5 border-2 border-emerald-500/30 p-5 rounded-xl">
                <p className="text-sm font-bold text-emerald-400 mb-3">
                  Bats &mdash; All Species Protected
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      All <strong className="text-white">18 species</strong>{" "}
                      of bat in the UK are European Protected Species
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Roosts are protected year-round
                      </strong>{" "}
                      &mdash; even when bats are not present. The roost
                      structure itself is protected, not just the bats within
                      it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Bats roost in buildings, bridges, trees, tunnels, and
                      underground structures &mdash; places commonly
                      encountered in construction
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Offences include killing or injuring bats, disturbing
                      them, damaging or destroying their roosts, or
                      obstructing access to a roost
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Bat surveys
                      </strong>{" "}
                      are required before demolition, renovation, or tree
                      felling where bats may be present
                    </span>
                  </li>
                </ul>
              </div>

              {/* Great Crested Newts */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Great Crested Newts
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Protected at all life stages and at all times of year
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Protection extends to{" "}
                      <strong className="text-white">
                        terrestrial habitat up to 500 metres
                      </strong>{" "}
                      from a breeding pond
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Found in ponds, rough grassland, log piles, rubble
                      piles, and beneath materials stored on the ground
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      District Level Licensing (DLL) schemes now available in
                      some areas as an alternative to individual site licences
                    </span>
                  </li>
                </ul>
              </div>

              {/* Nesting Birds */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Nesting Birds
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        All wild birds, their nests, and eggs
                      </strong>{" "}
                      are protected under the WCA 1981
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Breeding season: broadly March to August
                      </strong>
                      , though some species (e.g. pigeons, robins) may nest
                      at any time of year
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      It is an offence to intentionally or recklessly destroy
                      or damage an active nest, or to disturb nesting birds
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Vegetation clearance during the nesting season requires
                      a nesting bird check by an ecologist within 48 hours
                      before work
                    </span>
                  </li>
                </ul>
              </div>

              {/* Badgers */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Badgers
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Protected under the{" "}
                      <strong className="text-white">
                        Protection of Badgers Act 1992
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Offences include killing, injuring, or taking badgers,
                      and interfering with a sett (blocking entrances,
                      digging, causing disturbance)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Heavy machinery vibration near a sett can constitute
                      disturbance &mdash; exclusion zones are typically 30
                      metres minimum
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      A licence from Natural England is required for any work
                      that may disturb a sett
                    </span>
                  </li>
                </ul>
              </div>

              {/* Reptiles and Water Voles */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Reptiles
                  </p>
                  <ul className="text-xs text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Slow worms, common lizards, grass snakes, and adders
                        are protected against killing and injury
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Found in brownfield sites, rough grassland, rubble,
                        and compost heaps
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Translocation (trapping and moving) may be required
                        before site clearance
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Water Voles
                  </p>
                  <ul className="text-xs text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        The UK&apos;s fastest-declining mammal &mdash;
                        population has fallen by 90% since the 1970s
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Protected against killing, injuring, and disturbance
                        of burrows
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Work near waterways requires water vole surveys and
                        potential displacement programmes
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Diagram: Protected Species Calendar */}
              <div className="bg-white/5 border-2 border-emerald-500/30 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-bold text-emerald-400">
                    Protected Species Calendar &mdash; Seasonal Constraints
                  </p>
                </div>
                <p className="text-xs text-white/60 mb-3">
                  Key survey and constraint windows for common protected
                  species on construction sites
                </p>

                <div className="overflow-x-auto">
                  <div className="min-w-[600px]">
                    {/* Header row */}
                    <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-px mb-1">
                      <div className="text-xs text-white/60 font-medium">Species</div>
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                        <div key={m} className="text-[10px] text-white/50 text-center">{m}</div>
                      ))}
                    </div>

                    {/* Bats */}
                    <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-px mb-1">
                      <div className="text-xs text-white font-medium">Bats (roosts)</div>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="h-5 rounded-sm bg-red-500/40 border border-red-500/30" />
                      ))}
                    </div>
                    <p className="text-[10px] text-red-400 mb-2 ml-[140px]">Roosts protected year-round</p>

                    {/* Bat surveys */}
                    <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-px mb-1">
                      <div className="text-xs text-white font-medium">Bat surveys</div>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className={`h-5 rounded-sm ${i >= 4 && i <= 8 ? "bg-emerald-500/40 border border-emerald-500/30" : "bg-white/5 border border-white/10"}`} />
                      ))}
                    </div>
                    <p className="text-[10px] text-emerald-400 mb-2 ml-[140px]">Optimal survey window: May &ndash; Sep</p>

                    {/* Nesting birds */}
                    <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-px mb-1">
                      <div className="text-xs text-white font-medium">Nesting birds</div>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className={`h-5 rounded-sm ${i >= 2 && i <= 7 ? "bg-amber-500/40 border border-amber-500/30" : "bg-white/5 border border-white/10"}`} />
                      ))}
                    </div>
                    <p className="text-[10px] text-amber-400 mb-2 ml-[140px]">Breeding season: Mar &ndash; Aug (check before clearing)</p>

                    {/* Great crested newts */}
                    <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-px mb-1">
                      <div className="text-xs text-white font-medium">GCN (ponds)</div>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className={`h-5 rounded-sm ${i >= 2 && i <= 5 ? "bg-blue-500/40 border border-blue-500/30" : "bg-white/5 border border-white/10"}`} />
                      ))}
                    </div>
                    <p className="text-[10px] text-blue-400 mb-2 ml-[140px]">Aquatic surveys: Mar &ndash; Jun</p>

                    {/* Badgers */}
                    <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-px mb-1">
                      <div className="text-xs text-white font-medium">Badger setts</div>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className={`h-5 rounded-sm ${(i >= 0 && i <= 5) || i === 11 ? "bg-orange-500/40 border border-orange-500/30" : "bg-white/5 border border-white/10"}`} />
                      ))}
                    </div>
                    <p className="text-[10px] text-orange-400 mb-2 ml-[140px]">Sett closure restricted: Dec &ndash; Jun (breeding season)</p>

                    {/* Reptiles */}
                    <div className="grid grid-cols-[140px_repeat(12,1fr)] gap-px mb-1">
                      <div className="text-xs text-white font-medium">Reptile surveys</div>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className={`h-5 rounded-sm ${i >= 3 && i <= 8 ? "bg-purple-500/40 border border-purple-500/30" : "bg-white/5 border border-white/10"}`} />
                      ))}
                    </div>
                    <p className="text-[10px] text-purple-400 mb-2 ml-[140px]">Survey window: Apr &ndash; Sep (active season)</p>
                  </div>
                </div>

                <div className="mt-3 bg-white/5 p-2 rounded text-[10px] text-white/60">
                  Note: Exact timings vary by region, weather, and species.
                  Always consult a qualified ecologist for site-specific
                  survey timing.
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Protected Habitats */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">05</span>
            Protected Habitats
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The UK has a hierarchy of habitat designations, each
                carrying different levels of legal protection. Construction
                projects may be affected by any of these, and the level of
                protection determines the assessment, consent, and
                mitigation requirements.
              </p>

              <div className="bg-white/5 border-2 border-emerald-500/30 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <TreePine className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-bold text-emerald-400">
                    UK Habitat Designation Hierarchy
                  </p>
                </div>

                <div className="space-y-3">
                  {/* International */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-xs font-bold text-red-400 mb-1">
                      INTERNATIONAL DESIGNATIONS &mdash; Highest Protection
                    </p>
                    <ul className="text-xs text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Special Areas of Conservation (SACs)
                          </strong>{" "}
                          &mdash; designated under the Habitats Regulations
                          for habitats and species of European importance
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Special Protection Areas (SPAs)
                          </strong>{" "}
                          &mdash; designated under the Birds Directive for
                          internationally important bird populations
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Ramsar sites
                          </strong>{" "}
                          &mdash; wetlands of international importance
                          designated under the Ramsar Convention
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* National */}
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                    <p className="text-xs font-bold text-amber-400 mb-1">
                      NATIONAL DESIGNATIONS
                    </p>
                    <ul className="text-xs text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Sites of Special Scientific Interest (SSSIs)
                          </strong>{" "}
                          &mdash; designated by Natural England for
                          outstanding wildlife, geological, or
                          physiographical features. Operations likely to
                          damage the special features require consent.
                          Criminal offence to intentionally or recklessly
                          damage a SSSI
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Ancient Woodland
                          </strong>{" "}
                          &mdash; woodland that has existed continuously since
                          at least 1600 (England and Wales). Irreplaceable
                          habitat &mdash; development resulting in loss of
                          ancient woodland is refused except in wholly
                          exceptional circumstances (NPPF)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Priority Habitats
                          </strong>{" "}
                          &mdash; habitats identified under Section 41 of the
                          Natural Environment &amp; Rural Communities Act
                          2006 as being of principal importance for
                          conservation (e.g. lowland meadows, hedgerows,
                          ponds, coastal saltmarsh)
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Local */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-xs font-bold text-emerald-400 mb-1">
                      LOCAL DESIGNATIONS
                    </p>
                    <ul className="text-xs text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Local Wildlife Sites (LWS)
                          </strong>{" "}
                          &mdash; non-statutory sites identified by local
                          authorities as being of local importance for
                          wildlife. Protected through the planning system
                          &mdash; development should avoid impact where
                          possible
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          <strong className="text-white">
                            Local Nature Reserves (LNRs)
                          </strong>{" "}
                          &mdash; designated by local authorities for their
                          nature conservation interest and community value
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">
                    Practical Implication:
                  </strong>{" "}
                  Before any construction project begins, the planning
                  authority&apos;s ecological records and Natural
                  England&apos;s MAGIC map service should be checked to
                  identify whether any designated habitats are present on or
                  near the site. The higher the designation, the more
                  rigorous the assessment and consent requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Biodiversity Net Gain */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">06</span>
            Biodiversity Net Gain
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The{" "}
                <strong>Environment Act 2021</strong> introduced a mandatory
                requirement for{" "}
                <strong>
                  biodiversity net gain (BNG)
                </strong>{" "}
                in England. This is one of the most significant changes to
                environmental law affecting the construction industry in
                recent years.
              </p>

              <div className="bg-emerald-500/10 border-2 border-emerald-500/40 p-5 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-400 text-2xl font-black">10%</span>
                  </div>
                  <div>
                    <p className="text-emerald-400 text-lg font-bold">
                      Minimum Biodiversity Net Gain
                    </p>
                    <p className="text-white/60 text-sm">
                      Environment Act 2021 &mdash; mandatory for most new
                      developments in England
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/80">
                  Developers must demonstrate that the post-development
                  biodiversity value of the site will be at least{" "}
                  <strong className="text-white">
                    10% higher than the pre-development baseline
                  </strong>
                  . This is measured using the{" "}
                  <strong className="text-white">
                    DEFRA biodiversity metric
                  </strong>
                  , which assigns a numerical score to each habitat type
                  based on its distinctiveness, condition, and strategic
                  significance.
                </p>
              </div>

              {/* Diagram: BNG Process Flowchart */}
              <div className="bg-white/5 border-2 border-emerald-500/30 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-bold text-emerald-400">
                    Biodiversity Net Gain Process
                  </p>
                </div>

                <div className="space-y-2">
                  {/* Step 1 */}
                  <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-black">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Baseline Assessment
                        </p>
                        <p className="text-xs text-white/60">
                          Ecologist surveys existing habitats and calculates
                          pre-development biodiversity units using the DEFRA
                          metric
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center py-0.5">
                    <div className="flex flex-col items-center">
                      <div className="w-[2px] h-3 bg-white/20" />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-white/20" />
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-blue-500/15 border border-blue-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-black">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Apply the Mitigation Hierarchy
                        </p>
                        <p className="text-xs text-white/60">
                          Avoid habitat loss where possible, then mitigate
                          unavoidable impacts through design changes, then
                          compensate for residual loss
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center py-0.5">
                    <div className="flex flex-col items-center">
                      <div className="w-[2px] h-3 bg-white/20" />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-white/20" />
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-amber-500/15 border border-amber-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-black">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Calculate Post-Development Value
                        </p>
                        <p className="text-xs text-white/60">
                          Calculate the biodiversity units after development,
                          including on-site habitat creation/enhancement
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center py-0.5">
                    <div className="flex flex-col items-center">
                      <div className="w-[2px] h-3 bg-white/20" />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-white/20" />
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-orange-500/15 border border-orange-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-black">4</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Achieve 10% Net Gain
                        </p>
                        <p className="text-xs text-white/60">
                          If on-site measures are insufficient, use off-site
                          habitat creation or purchase biodiversity units from
                          a habitat bank
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center py-0.5">
                    <div className="flex flex-col items-center">
                      <div className="w-[2px] h-3 bg-white/20" />
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-white/20" />
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="bg-green-500/15 border border-green-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-black">5</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          30-Year Management Plan
                        </p>
                        <p className="text-xs text-white/60">
                          Secure the net gain through a conservation covenant
                          or S106 agreement with a legally binding 30-year
                          management and monitoring plan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  How to Deliver Biodiversity Net Gain
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">On-site:</strong>{" "}
                      Planting native hedgerows, creating wildflower meadows,
                      installing green roofs, creating ponds, planting native
                      trees, enhancing existing habitats
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Off-site:</strong>{" "}
                      Creating or enhancing habitats on land controlled by
                      the developer elsewhere &mdash; must be registered with
                      Natural England
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Statutory credits:
                      </strong>{" "}
                      Purchasing biodiversity units from a government habitat
                      bank as a last resort &mdash; deliberately priced to
                      incentivise on-site and off-site delivery first
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Important Restrictions
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  BNG does NOT allow the destruction of{" "}
                  <strong className="text-white">
                    irreplaceable habitats
                  </strong>{" "}
                  (ancient woodland, ancient and veteran trees) &mdash;
                  these cannot be adequately compensated for through the
                  metric. Additionally, on-site habitat delivery is always
                  preferred over off-site, and off-site is always preferred
                  over purchasing credits. This ensures that biodiversity
                  gains are delivered as close to the impact as possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Working Near Protected Features */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">07</span>
            Working Near Protected Features
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When construction work takes place near protected species or
                habitats, a structured approach is required to ensure legal
                compliance and avoid harm. The following measures represent{" "}
                <strong>industry best practice</strong> and are typically
                required by planning conditions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Pre-Commencement Surveys
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Phase 1 habitat survey:
                      </strong>{" "}
                      Maps all habitats on and adjacent to the site,
                      identifies potential for protected species, and
                      recommends further surveys
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Protected species surveys:
                      </strong>{" "}
                      Targeted surveys for specific species (bats, newts,
                      birds, badgers, reptiles) carried out at the
                      appropriate time of year by licensed ecologists
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Pre-commencement checks:
                      </strong>{" "}
                      Immediately before work begins, updated checks to
                      confirm the situation has not changed since the original
                      surveys (e.g. new nests, new badger sett activity)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Seasonal Constraints
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Vegetation clearance:
                      </strong>{" "}
                      Ideally carried out September to February (outside bird
                      nesting season). If clearance is required March to
                      August, a nesting bird check is mandatory within 48
                      hours before work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Demolition/renovation:
                      </strong>{" "}
                      Where bats are present, work may only be carried out
                      under licence during specified months (typically
                      avoiding the maternity season May to August and
                      hibernation November to March)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Badger sett closure:
                      </strong>{" "}
                      Only permitted July to November under licence &mdash;
                      sett closures are not permitted during the breeding
                      season (December to June)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Exclusion Zones
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Badger setts:</strong>{" "}
                      Minimum 30-metre buffer zone for heavy machinery; no
                      digging or ground works within this zone without a
                      licence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Active bird nests:</strong>{" "}
                      Exclusion zone typically 5 to 20 metres depending on
                      the species (Schedule 1 species may require larger
                      zones)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Watercourses with water voles:
                      </strong>{" "}
                      Typically 5-metre buffer zone from the water&apos;s edge
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Ancient woodland:
                      </strong>{" "}
                      Minimum 15-metre buffer zone from the woodland edge
                      (NPPF guidance)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Ecological Clerk of Works (ECoW)
                </p>
                <p className="text-sm text-white/80 mb-2">
                  On projects where protected species or habitats are
                  present, an{" "}
                  <strong className="text-white">
                    Ecological Clerk of Works
                  </strong>{" "}
                  may be required on site. Their role includes:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Supervising ecologically sensitive operations (e.g.
                      vegetation clearance, demolition near bat roosts)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Carrying out pre-start checks each day during
                      sensitive works
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Monitoring compliance with licence conditions and
                      ecological method statements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Stopping work immediately if protected species are
                      discovered or if licence conditions are being breached
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Method Statements &amp; Toolbox Talks
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Ecological method statements:
                      </strong>{" "}
                      Written procedures detailing how specific operations
                      will be carried out to avoid harm to protected species
                      (e.g. hand-searching before excavation, directional
                      vegetation clearance)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Toolbox talks:
                      </strong>{" "}
                      All site operatives must receive briefings on what
                      protected species may be present, how to recognise
                      them, what to do if they are found, and who to contact.
                      Records of attendance must be kept
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">
                    Golden Rule:
                  </strong>{" "}
                  If in doubt, <strong>stop work and seek advice</strong>.
                  Every person on a construction site has the right and the
                  duty to stop work if they believe a protected species may
                  be at risk. Stopping work for an hour while an ecologist
                  attends is always better than continuing and committing a
                  criminal offence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Penalties & Enforcement */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">08</span>
            Penalties &amp; Enforcement
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Wildlife offences are{" "}
                <strong>criminal offences</strong> in the UK. The penalties
                are severe, and enforcement has increased significantly in
                recent years as awareness of biodiversity loss has grown.
              </p>

              <div className="bg-red-500/10 border-2 border-red-500/40 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-bold text-red-400">
                    Criminal Penalties for Wildlife Offences
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-red-400">!</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Unlimited Fines
                      </p>
                      <p className="text-xs text-white/60">
                        The courts can impose unlimited fines for wildlife
                        offences. Fines are assessed per specimen &mdash;
                        multiple offences from a single incident can result
                        in cumulative penalties of tens or hundreds of
                        thousands of pounds
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-red-400">!</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Imprisonment
                      </p>
                      <p className="text-xs text-white/60">
                        Up to six months&apos; imprisonment per offence under
                        the WCA 1981. More serious offences under the
                        Habitats Regulations can carry higher sentences.
                        Company directors can be held personally liable
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-red-400">!</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Forfeiture
                      </p>
                      <p className="text-xs text-white/60">
                        Courts can order forfeiture of vehicles, equipment,
                        and other articles used in the commission of the
                        offence
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Natural England Enforcement
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Investigation powers:
                      </strong>{" "}
                      Natural England can investigate suspected wildlife
                      offences, enter land, and gather evidence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Stop notices:
                      </strong>{" "}
                      Natural England can issue notices requiring the
                      immediate cessation of activities that are damaging a
                      SSSI or harming protected species
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Restoration orders:
                      </strong>{" "}
                      Courts can require offenders to restore damaged
                      habitats at their own expense, which can cost
                      significantly more than the original fine
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Licence revocation:
                      </strong>{" "}
                      If a licence holder breaches their licence conditions,
                      Natural England can revoke the licence and require all
                      work to stop immediately
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Planning Enforcement
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Breach of planning conditions:
                      </strong>{" "}
                      Most planning permissions include ecological conditions
                      (e.g. no work during nesting season, implementation of
                      ecological management plan). Breach of these conditions
                      is a planning offence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Enforcement notices:
                      </strong>{" "}
                      The local planning authority can issue enforcement
                      notices requiring remedial action, including stopping
                      work entirely
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Injunctions:
                      </strong>{" "}
                      In urgent cases, the local planning authority can seek
                      a court injunction to immediately halt development that
                      is causing ecological harm
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  The Due Diligence Defence
                </p>
                <p className="text-sm text-white/80 mb-2">
                  In some circumstances, a{" "}
                  <strong className="text-white">due diligence defence</strong>{" "}
                  may be available. To rely on this defence, you must
                  demonstrate that:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Appropriate ecological surveys were carried out at the
                      right time of year by competent ecologists
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The results of surveys were properly assessed and acted
                      upon
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Reasonable precautions were taken to avoid harm
                      (method statements, exclusion zones, ecological
                      supervision)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      All relevant licences were obtained and their
                      conditions were followed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Workers were properly trained and briefed through
                      toolbox talks
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Ignorance is NOT a Defence
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Claiming that you did not know protected species were
                  present is{" "}
                  <strong className="text-white">not a valid defence</strong>{" "}
                  if you failed to carry out appropriate surveys. The law
                  expects developers and contractors to take{" "}
                  <strong className="text-white">
                    reasonable steps to find out
                  </strong>{" "}
                  what is on their site before commencing work. Failure to
                  survey is itself evidence of a lack of due diligence.
                </p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">
                    Final Thought:
                  </strong>{" "}
                  Protecting biodiversity is not just a legal obligation
                  &mdash; it is an investment in the environment that
                  sustains us all. The construction industry has the power
                  to be a{" "}
                  <strong>
                    positive force for nature
                  </strong>{" "}
                  through biodiversity net gain, sensitive design, and
                  responsible working practices. Every person on a
                  construction site plays a part in this. Know the law, know
                  what is on your site, and act responsibly. The penalties
                  for getting it wrong are severe, but the real cost of
                  biodiversity loss is measured in the degradation of the
                  natural systems that support life itself.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-5-section-2">
              Next: Ecological Impact Assessments
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
