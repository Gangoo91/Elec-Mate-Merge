import { ArrowLeft, ArrowRight, Leaf, Factory, Recycle, ShieldCheck, Scale, Building2, Users, TrendingUp, CheckCircle, BookOpen, AlertTriangle, Droplets, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Inline Knowledge Checks (3)                                       */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "env-m1s1-check1",
    question: "Which of the following is the LARGEST single category of waste produced by the UK construction industry?",
    options: [
      "Hazardous chemical waste",
      "Excavation waste (soils and stones)",
      "Packaging waste from delivered materials",
      "Timber offcuts and wood waste"
    ],
    correctIndex: 1,
    explanation:
      "Excavation waste (soils and stones) constitutes the largest single category of construction waste in the UK by tonnage. According to DEFRA statistics, construction, demolition and excavation waste accounts for approximately 62% of all waste generated in England, with excavation materials making up a very large proportion. Effective management of excavation waste through on-site reuse, material management plans, and CL:AIRE Definition of Waste Code of Practice can dramatically reduce disposal volumes and costs."
  },
  {
    id: "env-m1s1-check2",
    question: "What does the Plan-Do-Check-Act (PDCA) cycle represent in Environmental Management Systems?",
    options: [
      "A one-off assessment carried out before construction begins",
      "A legal compliance checklist required by the Environment Agency",
      "A continuous improvement framework for managing environmental performance",
      "A training programme for environmental awareness on site"
    ],
    correctIndex: 2,
    explanation:
      "The Plan-Do-Check-Act (PDCA) cycle is the core continuous improvement framework underpinning ISO 14001 and all credible Environmental Management Systems. 'Plan' involves setting environmental objectives, targets, and processes. 'Do' means implementing the planned processes and controls. 'Check' requires monitoring, measuring, and evaluating environmental performance against objectives. 'Act' involves taking corrective and preventive actions to continually improve. This is not a one-off exercise but an ongoing, cyclical process that drives sustained environmental improvement."
  },
  {
    id: "env-m1s1-check3",
    question: "Under the 'polluter pays' principle, who bears the cost of environmental damage or pollution remediation?",
    options: [
      "The local authority where the pollution occurred",
      "The government through general taxation",
      "The party responsible for causing the pollution",
      "The affected community through increased local charges"
    ],
    correctIndex: 2,
    explanation:
      "The 'polluter pays' principle is a foundational concept in UK and EU environmental law. It establishes that the person or organisation responsible for causing pollution or environmental damage must bear the full costs of remediation, clean-up, compensation, and any associated enforcement action. This principle is enshrined in the Environmental Protection Act 1990, the Environmental Damage (Prevention and Remediation) Regulations 2009, and numerous other UK environmental regulations. It provides a powerful financial incentive for organisations to prevent pollution rather than risk incurring clean-up costs."
  }
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                          */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Do I need a formal Environmental Management System (EMS) on every construction site?",
    answer:
      "Not every site legally requires a certified EMS such as ISO 14001, but all construction projects must comply with environmental legislation regardless of size. The Construction (Design and Management) Regulations 2015 (CDM 2015) require the principal contractor to plan, manage, and coordinate the construction phase, which includes managing environmental risks. Many principal contractors and clients now require their supply chain to demonstrate environmental management capability, even if formal ISO 14001 certification is not mandated. In practice, having a proportionate environmental management plan for every project \u2014 covering waste management, pollution prevention, noise control, and ecological protection \u2014 is considered industry best practice and is often a contractual requirement. Smaller sites may use simplified environmental management plans rather than full EMS documentation, but the underlying principles of planning, implementation, monitoring, and improvement still apply."
  },
  {
    question: "What is the difference between the Environment Agency and the local authority in terms of environmental regulation?",
    answer:
      "In England, the Environment Agency (EA) is the principal environmental regulator with responsibility for major industrial processes, waste regulation, water quality, flood risk management, fisheries, and contaminated land oversight. The EA issues environmental permits for waste operations, water discharge, and prescribed industrial processes. Local authorities (district and unitary councils) handle complementary functions: they regulate smaller industrial processes under Part B of the Environmental Permitting Regulations, enforce statutory nuisance provisions (including noise, dust, odour, and light pollution) under the Environmental Protection Act 1990, deal with planning conditions relating to environmental matters, and enforce construction site noise controls under the Control of Pollution Act 1974 Section 60/61. In Wales, Natural Resources Wales (NRW) performs the combined functions of the Environment Agency, Countryside Council for Wales, and Forestry Commission Wales. In Scotland, the Scottish Environment Protection Agency (SEPA) is the equivalent regulator. Understanding which body to contact for which issue is essential for compliance."
  },
  {
    question: "What is embodied carbon and why does it matter in construction?",
    answer:
      "Embodied carbon refers to the total greenhouse gas emissions associated with the entire lifecycle of a material, product, or building element \u2014 from raw material extraction, through manufacturing and transportation, to installation, maintenance, and eventual demolition and disposal. It is distinct from operational carbon, which refers to emissions from energy used to heat, cool, light, and operate a building during its lifetime. As buildings become more energy-efficient in operation (due to improved insulation, heat pumps, and renewable energy), embodied carbon now represents an increasingly large proportion of a building\u2019s total lifetime carbon footprint \u2014 often 50% or more for new-build projects. Concrete and steel are the two largest contributors to embodied carbon in construction. Reducing embodied carbon requires careful material specification, use of recycled and low-carbon materials, efficient structural design, local sourcing to reduce transport emissions, and designing for deconstruction and reuse at end of life. The London Plan and the RICS Whole Life Carbon Assessment standard are driving increased attention to embodied carbon in UK construction."
  },
  {
    question: "What happens if a construction site causes a pollution incident?",
    answer:
      "If a construction site causes a pollution incident \u2014 such as a discharge of sediment, concrete washings, fuel, or chemicals into a watercourse \u2014 the consequences can be severe. The Environment Agency has powers under the Environmental Permitting (England and Wales) Regulations 2016 and the Environmental Protection Act 1990 to investigate and prosecute. For water pollution offences under the Environmental Permitting Regulations, unlimited fines can be imposed, and in serious cases, responsible individuals can face imprisonment of up to five years. The company and individual site managers can both be held personally liable. Beyond criminal prosecution, the EA can issue enforcement notices requiring immediate remediation, and the polluter will be liable for all clean-up costs under the polluter pays principle. Civil claims for damages from affected parties (landowners, fisheries, water companies) are also common. The reputational damage can be equally devastating: companies convicted of environmental offences may be excluded from future tender lists, lose accreditations (such as ISO 14001 or Considerate Constructors Scheme registration), and face increased insurance premiums. Prevention through proper site management, spill kits, bunding of fuel stores, settlement lagoons, and staff training is always far less costly than dealing with a pollution incident."
  }
];

/* ------------------------------------------------------------------ */
/*  End-of-Section Quiz (8 questions)                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "What is the primary purpose of an Environmental Management System (EMS)?",
    options: [
      "To eliminate all environmental impacts from construction activities",
      "To provide a systematic framework for managing and continually improving environmental performance",
      "To satisfy planning permission conditions only",
      "To replace the need for environmental legislation compliance"
    ],
    correctAnswer: 1,
    explanation:
      "An EMS provides a systematic, structured framework for organisations to manage their environmental responsibilities and continually improve their environmental performance. It does not eliminate all environmental impacts (that is impossible for construction) nor does it replace legal compliance \u2014 rather, it ensures compliance is achieved systematically and that performance improves over time through the Plan-Do-Check-Act cycle."
  },
  {
    id: 2,
    question:
      "Approximately what percentage of total UK waste is generated by the construction, demolition, and excavation sector?",
    options: [
      "Approximately 25%",
      "Approximately 40%",
      "Approximately 62%",
      "Approximately 85%"
    ],
    correctAnswer: 2,
    explanation:
      "According to DEFRA statistics, the construction, demolition, and excavation sector generates approximately 62% of all waste produced in England. This makes construction by far the largest waste-producing sector in the UK economy, highlighting the critical importance of effective waste management, material reuse, and recycling on construction sites."
  },
  {
    id: 3,
    question:
      "Which international standard specifies the requirements for an Environmental Management System?",
    options: [
      "ISO 9001",
      "ISO 45001",
      "ISO 14001",
      "ISO 50001"
    ],
    correctAnswer: 2,
    explanation:
      "ISO 14001 (Environmental Management Systems \u2014 Requirements with guidance for use) is the international standard that specifies requirements for an EMS. ISO 9001 covers quality management, ISO 45001 covers occupational health and safety management, and ISO 50001 covers energy management. Many construction organisations hold multiple ISO certifications as part of an integrated management system."
  },
  {
    id: 4,
    question:
      "What is the Brundtland definition of sustainable development?",
    options: [
      "Development that maximises economic growth for the current generation",
      "Development that meets the needs of the present without compromising the ability of future generations to meet their own needs",
      "Development that avoids any use of non-renewable resources",
      "Development that prioritises environmental protection over economic activity"
    ],
    correctAnswer: 1,
    explanation:
      "The Brundtland definition, from the 1987 report 'Our Common Future' by the World Commission on Environment and Development, states that sustainable development is 'development that meets the needs of the present without compromising the ability of future generations to meet their own needs.' This definition balances economic development, social equity, and environmental protection and remains the most widely cited definition of sustainability worldwide."
  },
  {
    id: 5,
    question:
      "Which UK body is the principal environmental regulator responsible for issuing environmental permits, regulating waste, and protecting water quality in England?",
    options: [
      "The Health and Safety Executive (HSE)",
      "The Environment Agency (EA)",
      "The local planning authority",
      "Natural England"
    ],
    correctAnswer: 1,
    explanation:
      "The Environment Agency (EA) is the principal environmental regulator in England, responsible for environmental permits (waste, water discharge, industrial processes), waste regulation, water quality monitoring and protection, flood risk management, and enforcement of environmental legislation. The HSE deals with health and safety at work, the local planning authority handles planning permissions, and Natural England advises on conservation and biodiversity."
  },
  {
    id: 6,
    question:
      "Under the 'precautionary principle,' what should you do when there is scientific uncertainty about the potential environmental impact of an activity?",
    options: [
      "Proceed with the activity until harm is conclusively proven",
      "Take preventive measures to avoid potential harm even before full scientific certainty is established",
      "Wait for the Environment Agency to carry out a full assessment before proceeding",
      "Transfer the risk to the client through contractual provisions"
    ],
    correctAnswer: 1,
    explanation:
      "The precautionary principle states that where there are threats of serious or irreversible environmental damage, lack of full scientific certainty should not be used as a reason for postponing cost-effective measures to prevent environmental degradation. In practical terms, if an activity might cause environmental harm but the evidence is not yet conclusive, you should err on the side of caution and take preventive action rather than waiting until damage has been proven."
  },
  {
    id: 7,
    question:
      "Which of the following is an employer's environmental duty under UK law?",
    options: [
      "Employers are only responsible for environmental matters if they hold ISO 14001 certification",
      "Employers must carry out environmental risk assessments and implement control measures to prevent pollution and manage waste lawfully",
      "Employers are exempt from environmental duties on projects lasting less than 30 days",
      "Environmental responsibilities rest solely with the Environment Agency, not employers"
    ],
    correctAnswer: 1,
    explanation:
      "Under multiple pieces of UK legislation \u2014 including the Environmental Protection Act 1990, the Environmental Permitting Regulations 2016, the Hazardous Waste Regulations 2005, and CDM 2015 \u2014 employers have a legal duty to assess environmental risks, implement appropriate control measures, manage waste lawfully (including correct classification, storage, and transfer using registered carriers), prevent pollution of water, land, and air, and comply with all relevant environmental permit conditions. These duties apply regardless of ISO 14001 certification status and regardless of project duration."
  },
  {
    id: 8,
    question:
      "Which of the following is a benefit of implementing good environmental management practices on construction sites?",
    options: [
      "Increased waste disposal costs due to more rigorous sorting requirements",
      "Reduced competitiveness due to the costs of environmental compliance",
      "Cost savings through reduced material waste, energy efficiency, and avoidance of fines and clean-up costs",
      "Exemption from planning conditions relating to environmental matters"
    ],
    correctAnswer: 2,
    explanation:
      "Good environmental management delivers genuine business benefits including significant cost savings (reduced waste disposal costs, lower energy bills, avoided fines and remediation costs), improved legal compliance (reducing risk of prosecution), enhanced reputation and competitive advantage (particularly for tenders where environmental credentials are evaluated), better community relations (fewer complaints, smoother planning processes), improved worker health (cleaner air, less noise exposure), and potential for innovation and efficiency gains. Far from reducing competitiveness, environmental management increasingly provides a competitive edge in the UK construction market."
  }
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function EnvironmentalSustainabilityModule1Section1() {
  useSEO({
    title: "What Is Environmental Management? | Environmental & Sustainability Module 1.1",
    description:
      "Understand environmental management in construction: its definition, purpose, impacts, key principles, legislation, the Environment Agency's role, and the business benefits of good environmental practice.",
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

        {/* ============================================================ */}
        {/*  PAGE TITLE                                                   */}
        {/* ============================================================ */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <Leaf className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-400 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Is Environmental Management?
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the fundamentals of environmental management in the UK construction industry &mdash; why it matters, what it covers, who is responsible, and how it benefits your projects and career
          </p>
        </header>

        {/* ============================================================ */}
        {/*  QUICK SUMMARY BOXES                                          */}
        {/* ============================================================ */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Environmental management:</strong> Systematic control of construction impacts</li>
              <li><strong>UK construction:</strong> ~62% of all waste, major CO&#8322; contributor</li>
              <li><strong>Framework:</strong> Plan-Do-Check-Act continuous improvement cycle</li>
              <li><strong>Key principle:</strong> Polluter pays &mdash; prevention always cheaper than cure</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">For Electricians</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Waste:</strong> Cable offcuts, packaging, WEEE regulations apply</li>
              <li><strong>Pollution:</strong> Cable-pulling lubricants, solvents, dust from chasing</li>
              <li><strong>Energy:</strong> Your installations affect building operational carbon</li>
              <li><strong>Duty:</strong> Every worker shares environmental responsibility on site</li>
            </ul>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  LEARNING OUTCOMES                                            */}
        {/* ============================================================ */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define environmental management and explain its purpose in construction",
              "Identify the major environmental impacts of UK construction activities",
              "Describe the construction industry's environmental footprint using real statistics",
              "Explain the Plan-Do-Check-Act cycle and its role in Environmental Management Systems",
              "Outline key environmental principles: polluter pays, precautionary, sustainable development, circular economy",
              "Describe the role and powers of the Environment Agency",
              "Explain environmental responsibilities of employers, employees, contractors, and clients",
              "List the business benefits of good environmental management practice"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01: Definition & Purpose of Environmental Management */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">01</span>
              Definition &amp; Purpose of Environmental Management
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Environmental management</strong> is the systematic approach to identifying,
                assessing, controlling, and minimising the environmental impacts of an organisation&rsquo;s
                activities, products, and services. In the context of the UK construction industry, it
                encompasses every action taken to prevent pollution, reduce waste, conserve natural
                resources, protect biodiversity, and ensure compliance with environmental legislation
                throughout the lifecycle of a construction project.
              </p>

              <p>
                Environmental management is not an optional extra or a &ldquo;nice to have&rdquo; &mdash; it
                is a legal requirement, a commercial necessity, and an ethical obligation. The UK has one of
                the most comprehensive frameworks of environmental legislation in the world, and the
                construction industry, as one of the largest contributors to environmental degradation, is
                subject to particularly rigorous scrutiny from regulators, clients, and the public.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Core Definition:</strong> Environmental management
                  in construction is the planned, systematic identification and control of all activities that
                  could cause environmental harm &mdash; before, during, and after the construction process.
                  It requires understanding what impacts your work causes, knowing what the law requires, and
                  implementing practical measures to prevent or minimise harm.
                </p>
              </div>

              <p>
                The purpose of environmental management can be summarised under four key headings:
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <Scale className="h-6 w-6 text-emerald-400 mb-2" />
                  <p className="text-sm font-semibold text-emerald-400 mb-1">Legal Compliance</p>
                  <p className="text-xs text-white/70">Ensuring all activities comply with UK environmental legislation, permits, planning conditions, and regulatory requirements. Non-compliance can result in unlimited fines and imprisonment.</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <ShieldCheck className="h-6 w-6 text-emerald-400 mb-2" />
                  <p className="text-sm font-semibold text-emerald-400 mb-1">Pollution Prevention</p>
                  <p className="text-xs text-white/70">Preventing contamination of water, land, and air through proactive controls rather than reactive clean-up. Prevention is always more effective and less costly than remediation.</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <Recycle className="h-6 w-6 text-emerald-400 mb-2" />
                  <p className="text-sm font-semibold text-emerald-400 mb-1">Resource Efficiency</p>
                  <p className="text-xs text-white/70">Minimising waste generation, maximising material reuse and recycling, reducing energy and water consumption, and using sustainably sourced materials wherever practicable.</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <TrendingUp className="h-6 w-6 text-emerald-400 mb-2" />
                  <p className="text-sm font-semibold text-emerald-400 mb-1">Continuous Improvement</p>
                  <p className="text-xs text-white/70">Driving ongoing improvements in environmental performance through monitoring, review, target-setting, and the Plan-Do-Check-Act cycle that underpins all credible management systems.</p>
                </div>
              </div>

              <p>
                For electricians and electrical contractors, environmental management is particularly
                relevant. Electrical installation work generates waste (cable offcuts, packaging, old
                equipment), uses materials with significant embodied carbon (copper, PVC, steel), involves
                substances that can pollute if mismanaged (cable-pulling lubricants, solvents, flux), and
                produces dust and noise (chasing walls, drilling, cutting). Furthermore, the electrical
                installations you create directly affect a building&rsquo;s operational energy consumption
                for decades to come &mdash; making energy-efficient design a critical environmental
                consideration in your work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Historical Context</p>
                <p className="text-sm text-white/80">
                  Environmental management as a formal discipline emerged in the UK during the 1970s and
                  1980s, driven by growing public awareness of pollution and a series of high-profile
                  environmental incidents. The Environmental Protection Act 1990 was a landmark piece of
                  legislation that established the modern framework for waste management and pollution
                  control. The Environment Act 1995 created the Environment Agency. The international
                  standard ISO 14001 was first published in 1996 (and substantially revised in 2015),
                  providing organisations worldwide with a recognised framework for Environmental Management
                  Systems. The Environment Act 2021 has further strengthened environmental protections,
                  introducing biodiversity net gain requirements and establishing the Office for
                  Environmental Protection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02: Environmental Impacts of Construction            */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">02</span>
              Environmental Impacts of Construction
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction is one of the most environmentally impactful industries in the UK economy. Every
                construction project, from a small domestic rewire to a major infrastructure scheme, has the
                potential to cause environmental harm if impacts are not identified, assessed, and controlled.
                Understanding these impacts is the essential first step in managing them effectively.
              </p>

              {/* Construction Environmental Impacts Diagram */}
              <div className="my-6 p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-emerald-500/20">
                <h3 className="text-sm font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                  <Factory className="h-4 w-4" />
                  Construction Environmental Impacts Overview
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                    <div className="text-lg mb-1">&#127758;</div>
                    <p className="text-[11px] font-semibold text-emerald-400">LAND USE</p>
                    <p className="text-[10px] text-white/50 mt-1">Greenfield loss, soil sealing, habitat fragmentation</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                    <div className="text-lg mb-1">&#9851;&#65039;</div>
                    <p className="text-[11px] font-semibold text-emerald-400">WASTE</p>
                    <p className="text-[10px] text-white/50 mt-1">62% of UK waste from CDW, landfill pressure</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                    <div className="text-lg mb-1">&#9729;&#65039;</div>
                    <p className="text-[11px] font-semibold text-emerald-400">EMISSIONS</p>
                    <p className="text-[10px] text-white/50 mt-1">CO&#8322;, dust, VOCs, vehicle exhaust, plant</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                    <div className="text-lg mb-1">&#128167;</div>
                    <p className="text-[11px] font-semibold text-emerald-400">WATER</p>
                    <p className="text-[10px] text-white/50 mt-1">Sediment, chemicals, concrete washings, run-off</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                    <div className="text-lg mb-1">&#128266;</div>
                    <p className="text-[11px] font-semibold text-emerald-400">NOISE</p>
                    <p className="text-[10px] text-white/50 mt-1">Plant, power tools, piling, deliveries, vibration</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                    <div className="text-lg mb-1">&#127795;</div>
                    <p className="text-[11px] font-semibold text-emerald-400">ECOLOGY</p>
                    <p className="text-[10px] text-white/50 mt-1">Habitat loss, species displacement, tree removal</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                    <div className="text-lg mb-1">&#9962;&#65039;</div>
                    <p className="text-[11px] font-semibold text-emerald-400">RESOURCES</p>
                    <p className="text-[10px] text-white/50 mt-1">Aggregates, timber, metals, energy, water</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                    <div className="text-lg mb-1">&#128168;</div>
                    <p className="text-[11px] font-semibold text-emerald-400">DUST</p>
                    <p className="text-[10px] text-white/50 mt-1">PM10, PM2.5, silica, demolition, earthworks</p>
                  </div>
                </div>
                <p className="text-xs text-white/50 text-center mt-4">
                  Every construction activity has the potential to cause multiple, overlapping environmental impacts. Effective management requires a holistic approach.
                </p>
              </div>

              <p>
                The principal environmental impacts of construction activities are:
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Land Use &amp; Soil Disturbance</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Construction physically transforms land. Greenfield development converts natural or
                      agricultural land to built form, permanently sealing soil surfaces with impermeable
                      materials (concrete, tarmac) which prevents natural drainage, destroys soil ecosystems,
                      and fragments wildlife habitats. Earthworks activities strip and stockpile topsoil,
                      disrupt natural drainage patterns, and can cause soil compaction that reduces
                      infiltration capacity. Contaminated land from previous industrial use can be disturbed
                      during construction, releasing pollutants into the wider environment. The National
                      Planning Policy Framework (NPPF) prioritises brownfield (previously developed) land
                      over greenfield development to mitigate these impacts.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Resource Consumption</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The UK construction industry consumes vast quantities of natural resources. It uses
                      approximately 400 million tonnes of materials annually, including aggregates (sand,
                      gravel, crushed rock), cement, timber, steel, copper, aluminium, plastics, and glass.
                      Many of these are non-renewable or energy-intensive to produce. Quarrying for
                      aggregates destroys habitats and landscapes. Cement production is one of the largest
                      industrial sources of CO&#8322; emissions globally. Copper mining (essential for
                      electrical cables) causes significant environmental damage in extraction countries.
                      Resource efficiency &mdash; using less material, specifying recycled content, and
                      designing for future reuse &mdash; is therefore a critical environmental management
                      objective.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Waste Generation</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Construction, demolition and excavation (CDE) waste accounts for approximately 62% of
                      all waste produced in England by tonnage (DEFRA statistics). This includes excavated
                      soils and stones, concrete and masonry, timber, metals, plastics, plasterboard,
                      packaging, hazardous materials (asbestos, lead paint, contaminated soils), and mixed
                      waste. While recycling rates for CDE waste have improved significantly (approximately
                      90% recovery rate for non-hazardous CDE waste), landfill disposal remains a problem
                      for difficult-to-recycle materials. Effective waste management requires the waste
                      hierarchy: prevention first, then reuse, recycling, recovery, and disposal as a last
                      resort.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Air Emissions &amp; Dust</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Construction generates atmospheric emissions from multiple sources: CO&#8322; and other
                      greenhouse gases from plant and vehicles (diesel engines), from energy use (generators,
                      heating), and from material production (embodied carbon); particulate matter (PM10 and
                      PM2.5) from demolition, earthworks, concrete cutting, chasing, drilling, and vehicle
                      movements on unpaved surfaces; volatile organic compounds (VOCs) from paints,
                      adhesives, solvents, and sealants; and silica dust from cutting concrete, morite, brick
                      and stone. Dust and emissions affect air quality for workers and neighbouring
                      communities. The GLA&rsquo;s Non-Road Mobile Machinery (NRMM) Low Emission Zone
                      requirements in London and the IAQM guidance on dust assessment demonstrate increasing
                      regulatory attention to construction air quality impacts.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Water Pollution</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Construction is a leading cause of water pollution incidents in the UK. The Environment
                      Agency identifies construction as a significant source of pollution to rivers, streams,
                      and groundwater. Key pollutants include sediment (suspended solids from earthworks,
                      disturbed ground, and surface water run-off &mdash; which can smother aquatic habitats
                      and block fish spawning grounds), concrete and cement washings (highly alkaline, with pH
                      levels around 12-13, lethal to aquatic life), fuel and oil spillages (diesel, hydraulic
                      oil), chemical pollutants (solvents, paints, adhesives, preservatives), and sewage
                      from welfare facilities. A single cement washout entering a watercourse can kill fish
                      and invertebrates for hundreds of metres downstream.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Noise &amp; Vibration</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Construction noise can cause significant disturbance to neighbouring residents,
                      businesses, schools, hospitals, and wildlife. Sources include power tools (cutting,
                      drilling, chasing), heavy plant (excavators, cranes, compressors), piling operations,
                      vehicle movements and deliveries, and generator sets. Vibration from piling, compaction,
                      and demolition can cause structural damage to adjacent buildings and distress to
                      occupants. The Control of Pollution Act 1974 (Sections 60 and 61) gives local
                      authorities powers to control construction noise through noise restriction notices and
                      prior consent agreements. BS 5228 provides guidance on noise and vibration control on
                      construction sites.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Habitat Destruction &amp; Biodiversity Loss</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Construction can directly destroy habitats through site clearance, demolition, and
                      earthworks. Even on brownfield sites, significant ecological value may be present
                      &mdash; brownfield land can support rare invertebrates, plants, and reptiles. Protected
                      species (bats, great crested newts, nesting birds, badgers, dormice) are regularly
                      encountered on construction sites and are protected under the Wildlife and Countryside
                      Act 1981 and the Conservation of Habitats and Species Regulations 2017. The Environment
                      Act 2021 introduced mandatory biodiversity net gain (BNG) of at least 10% for most
                      developments in England, meaning that construction projects must now leave biodiversity
                      in a measurably better state than before development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03: The Construction Industry's Environmental        */}
        {/*  Footprint                                                    */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">03</span>
              The Construction Industry&rsquo;s Environmental Footprint
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                To appreciate why environmental management in construction matters so profoundly, it is
                essential to understand the sheer scale of the industry&rsquo;s environmental footprint.
                The UK construction sector is one of the largest industries in the national economy, turning
                over in excess of &pound;170 billion annually and employing over 2.4 million people. With
                that economic scale comes an enormous environmental impact.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-4 text-center">UK Construction: Key Environmental Statistics</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-emerald-400">~62%</p>
                    <p className="text-white/70 text-xs">Of all waste generated in England comes from construction, demolition, and excavation activities (DEFRA)</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-emerald-400">~25%</p>
                    <p className="text-white/70 text-xs">Of all UK carbon emissions are attributable to the construction and built environment sector (UKGBC)</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-emerald-400">400Mt</p>
                    <p className="text-white/70 text-xs">Approximate annual material consumption by UK construction &mdash; aggregates, cement, steel, timber, and other resources</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-emerald-400">8%</p>
                    <p className="text-white/70 text-xs">Of global CO&#8322; emissions come from cement production alone, making concrete the world&rsquo;s most carbon-intensive material by total volume</p>
                  </div>
                </div>
              </div>

              <p>
                The built environment as a whole (including operational energy use in existing buildings)
                accounts for approximately 40% of total UK energy consumption and around 25% of UK
                greenhouse gas emissions. The construction phase itself generates significant direct
                emissions through diesel-powered plant and equipment, generators, vehicle movements, and
                the manufacturing of materials. However, the <strong>embodied carbon</strong> of
                construction materials &mdash; particularly concrete, steel, aluminium, and plastics &mdash;
                represents an enormous and often underappreciated proportion of the industry&rsquo;s total
                carbon footprint.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Concrete: The Scale of the Problem</p>
                <p className="text-sm text-white/80">
                  Concrete is the most widely used construction material on earth, second only to water as
                  the most consumed substance globally. The production of Portland cement &mdash; the
                  binding agent in concrete &mdash; requires heating limestone and clay to approximately
                  1,450&deg;C in large kilns, a process that releases enormous quantities of CO&#8322; both
                  from the energy used and from the chemical reaction itself (calcination). Globally, cement
                  production accounts for approximately 8% of all anthropogenic CO&#8322; emissions. In the
                  UK, the Mineral Products Association and the Green Construction Board are driving efforts
                  to reduce concrete&rsquo;s carbon footprint through supplementary cementitious materials
                  (ground granulated blast-furnace slag, pulverised fuel ash), lower-clinker cements,
                  carbon capture technologies, and more efficient structural design that reduces the volume
                  of concrete required.
                </p>
              </div>

              <p>
                Water consumption is another significant impact. Construction activities use large volumes
                of water for concrete mixing, dust suppression, wheel washing, testing and commissioning of
                plumbing and heating systems, and welfare facilities. Water scarcity is an increasingly
                serious issue in parts of England, particularly the South East, and the construction
                industry is expected to demonstrate responsible water use through site water management
                plans and water-efficient practices.
              </p>

              <p>
                Energy consumption on construction sites comes from multiple sources: diesel fuel for plant
                and equipment (excavators, dumpers, cranes, telehandlers, compressors), generators providing
                temporary power supply, temporary heating systems, lighting, and welfare facilities. The
                transition to electric plant, battery-powered tools, mains connections instead of diesel
                generators, and solar-powered welfare cabins represents a growing area of environmental
                improvement in the sector.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Key Insight:</strong> The environmental footprint of
                  construction extends far beyond the construction site boundary. It includes the extraction
                  and processing of raw materials, manufacturing of products, transportation to site,
                  construction activities, operational energy use throughout the building&rsquo;s life, and
                  eventual demolition and disposal. A genuinely environmental approach considers this entire
                  <strong> whole-life</strong> perspective. This is captured in the concept of <strong>whole-life
                  carbon assessment</strong>, now required by the London Plan and promoted by the RICS
                  professional standard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04: Environmental Management on Site                 */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">04</span>
              Environmental Management on Site
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Effective environmental management on construction sites requires a structured, systematic
                approach. The international standard <strong>ISO 14001:2015</strong> (Environmental
                Management Systems &mdash; Requirements with guidance for use) provides the globally
                recognised framework for this approach. While not every construction site will have a
                formally certified ISO 14001 system, the principles of ISO 14001 underpin all credible
                environmental management in the sector.
              </p>

              <p>
                An <strong>Environmental Management System (EMS)</strong> is a structured framework that
                enables an organisation to manage its environmental responsibilities in a systematic manner.
                The core components of an EMS include:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Environmental policy</strong> &mdash; a top-level statement of the organisation&rsquo;s commitment to environmental protection, compliance with legislation, pollution prevention, and continual improvement. This must be communicated to all workers and made available to interested parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Environmental aspects and impacts register</strong> &mdash; a systematic identification of all activities, products, and services that can interact with the environment (aspects), together with an assessment of the resulting environmental changes (impacts). For a construction site, this would cover earthworks, waste generation, noise, dust, water use, chemical storage, emissions, habitat disturbance, and more</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Legal and other requirements register</strong> &mdash; identification of all applicable environmental legislation, permits, planning conditions, client requirements, and voluntary commitments relevant to the project</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Environmental objectives and targets</strong> &mdash; measurable goals for environmental improvement (for example, diverting 95% of waste from landfill, reducing water consumption by 10%, achieving zero pollution incidents)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Operational controls</strong> &mdash; documented procedures, method statements, permits to work, and physical controls to manage significant environmental aspects on a day-to-day basis</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Emergency preparedness and response</strong> &mdash; plans and procedures for responding to environmental emergencies such as pollution incidents, spills, fire, and flood</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Monitoring and measurement</strong> &mdash; regular monitoring of environmental performance, including waste volumes, energy use, water consumption, noise levels, and incident tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span><strong>Audit and management review</strong> &mdash; periodic internal audits to verify compliance with the EMS and management reviews to assess overall effectiveness and drive improvement</span>
                </li>
              </ul>

              {/* PDCA Cycle Diagram */}
              <div className="my-6 p-4 sm:p-6 rounded-xl bg-white/[0.02] border border-emerald-500/20">
                <h3 className="text-sm font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                  <Recycle className="h-4 w-4" />
                  Plan-Do-Check-Act (PDCA) Continuous Improvement Cycle
                </h3>
                <div className="relative mx-auto" style={{ maxWidth: "360px" }}>
                  {/* Top: PLAN */}
                  <div className="flex justify-center mb-3">
                    <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-5 py-3 text-center w-40">
                      <p className="text-xs font-bold text-emerald-400">PLAN</p>
                      <p className="text-[10px] text-white/50 mt-1">Set objectives, identify aspects &amp; impacts, establish processes</p>
                    </div>
                  </div>
                  {/* Middle row: ACT and DO with arrows */}
                  <div className="flex justify-between items-center px-0 sm:px-2 mb-3">
                    <div className="bg-purple-500/20 border border-purple-500/40 rounded-lg px-3 py-3 text-center w-36">
                      <p className="text-xs font-bold text-purple-400">ACT</p>
                      <p className="text-[10px] text-white/50 mt-1">Correct, prevent, improve processes</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="text-emerald-400 text-xs">&rarr;</div>
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center">
                        <p className="text-[9px] font-bold text-emerald-300 text-center leading-tight">CONTINUAL<br />IMPROVE</p>
                      </div>
                      <div className="text-emerald-400 text-xs">&larr;</div>
                    </div>
                    <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg px-3 py-3 text-center w-36">
                      <p className="text-xs font-bold text-blue-400">DO</p>
                      <p className="text-[10px] text-white/50 mt-1">Implement controls, train staff, operate</p>
                    </div>
                  </div>
                  {/* Bottom: CHECK */}
                  <div className="flex justify-center">
                    <div className="bg-amber-500/20 border border-amber-500/40 rounded-lg px-5 py-3 text-center w-40">
                      <p className="text-xs font-bold text-amber-400">CHECK</p>
                      <p className="text-[10px] text-white/50 mt-1">Monitor, measure, audit, evaluate performance</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/50 text-center mt-4">
                  The PDCA cycle is the engine of continual improvement in ISO 14001. Each cycle builds on the last, driving progressively better environmental performance.
                </p>
              </div>

              <p>
                On a practical level, environmental management on site manifests as a <strong>Construction
                Environmental Management Plan (CEMP)</strong>. A CEMP is a project-specific document that
                translates the organisation&rsquo;s EMS into practical, site-specific controls. It typically
                covers:
              </p>

              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span>Site description, surrounding environment, and sensitive receptors (watercourses, residential properties, ecological features)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span>Roles and responsibilities for environmental management on the project</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span>Site Waste Management Plan (SWMP) &mdash; although no longer a statutory requirement since 2013, producing a SWMP remains industry best practice and is required by many clients</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span>Pollution prevention measures (spill kits, bunding, silt fencing, settlement lagoons, designated concrete washout areas)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span>Dust management plan (suppression measures, monitoring, boundary monitoring)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span>Noise and vibration management plan (working hours, equipment selection, monitoring, Section 61 prior consent where required)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span>Ecological protection plan (tree protection, protected species measures, seasonal constraints)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                  <span>Environmental emergency response plan (spill response, incident reporting, contact details for the Environment Agency incident hotline: 0800 80 70 60)</span>
                </li>
              </ul>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Considerate Constructors Scheme (CCS)</p>
                <p className="text-sm text-white/80">
                  The Considerate Constructors Scheme is a voluntary initiative that many UK construction
                  sites register with. The scheme&rsquo;s Code of Considerate Practice includes a specific
                  section on &ldquo;Respecting the Environment&rdquo; which requires registered sites to
                  minimise environmental impacts, reduce waste, prevent pollution, and protect the natural
                  environment. CCS monitors score sites against these criteria during unannounced
                  inspections. Many clients now require CCS registration as a contract condition, making
                  environmental performance a directly assessed and scored component of project delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 05: Key Environmental Principles                     */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">05</span>
              Key Environmental Principles
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                UK environmental law and policy are underpinned by several fundamental principles that guide
                decision-making at every level, from government policy to individual site management
                decisions. Understanding these principles is essential for anyone working in the construction
                industry.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="h-5 w-5 text-emerald-400" />
                      <p className="text-sm font-semibold text-emerald-400">The Polluter Pays Principle</p>
                    </div>
                    <p className="text-sm text-white/80 mb-3">
                      The polluter pays principle establishes that the person or organisation responsible for
                      causing pollution or environmental damage must bear the full costs of remediation,
                      clean-up, and compensation. This is a cornerstone of UK and EU environmental law,
                      enshrined in the Environmental Protection Act 1990, the Environmental Damage (Prevention
                      and Remediation) Regulations 2009, and the Environmental Permitting Regulations 2016.
                    </p>
                    <p className="text-sm text-white/80">
                      In practical terms, if a construction site causes a pollution incident &mdash; for
                      example, by allowing concrete washings to enter a watercourse &mdash; the contractor
                      responsible will bear all costs: the Environment Agency&rsquo;s investigation and
                      enforcement costs, the clean-up and remediation costs, any compensation to affected
                      third parties, and any fines imposed by the courts. This provides a powerful financial
                      incentive for prevention.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-emerald-400" />
                      <p className="text-sm font-semibold text-emerald-400">The Precautionary Principle</p>
                    </div>
                    <p className="text-sm text-white/80 mb-3">
                      The precautionary principle states that where there are threats of serious or
                      irreversible environmental damage, lack of full scientific certainty should not be
                      used as a reason for postponing cost-effective measures to prevent environmental
                      degradation. It places the burden of proof on the proponent of an activity to
                      demonstrate that it will not cause significant harm, rather than requiring opponents
                      to prove that harm will occur.
                    </p>
                    <p className="text-sm text-white/80">
                      In construction, this means that if there is reasonable suspicion that an activity could
                      cause significant environmental harm &mdash; for example, if there is a possibility
                      that protected species are present on site, or that groundwater could be contaminated
                      &mdash; you should take protective action first and investigate afterwards, rather than
                      proceeding and hoping for the best.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="h-5 w-5 text-emerald-400" />
                      <p className="text-sm font-semibold text-emerald-400">Sustainable Development</p>
                    </div>
                    <p className="text-sm text-white/80 mb-3">
                      The most widely cited definition of sustainable development comes from the <strong>
                      Brundtland Commission</strong> report <em>Our Common Future</em> (1987):
                    </p>
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-lg mb-3">
                      <p className="text-sm text-white italic">
                        &ldquo;Sustainable development is development that meets the needs of the present
                        without compromising the ability of future generations to meet their own needs.&rdquo;
                      </p>
                    </div>
                    <p className="text-sm text-white/80">
                      Sustainable development rests on three interconnected pillars: <strong>environmental
                      protection</strong> (preserving natural resources and ecosystems), <strong>economic
                      growth</strong> (enabling prosperity and employment), and <strong>social equity</strong>
                      (ensuring fair distribution of benefits and burdens). In construction, sustainable
                      development means designing and building in ways that balance economic viability with
                      environmental responsibility and social benefit &mdash; for example, building
                      energy-efficient homes that are affordable, using sustainably sourced materials, and
                      creating developments that enhance rather than degrade their local communities and
                      environments.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Recycle className="h-5 w-5 text-emerald-400" />
                      <p className="text-sm font-semibold text-emerald-400">The Circular Economy</p>
                    </div>
                    <p className="text-sm text-white/80 mb-3">
                      The circular economy is an economic model that aims to eliminate waste and the continual
                      use of resources by keeping materials in use for as long as possible, extracting maximum
                      value from them while in use, and recovering and regenerating products and materials at
                      the end of each service life. It contrasts with the traditional <strong>linear economy
                      </strong> model of &ldquo;take, make, dispose.&rdquo;
                    </p>
                    <p className="text-sm text-white/80">
                      In construction, circular economy principles translate into: <strong>designing for
                      disassembly</strong> (so buildings can be deconstructed rather than demolished, with
                      materials recovered for reuse), <strong>specifying recycled and recyclable materials
                      </strong> (recycled steel, reclaimed timber, recycled aggregate), <strong>material
                      passports</strong> (documenting what materials are in a building for future recovery),
                      <strong> modular and prefabricated construction</strong> (reducing site waste and
                      enabling future reconfiguration), and <strong>industrial symbiosis</strong> (where one
                      industry&rsquo;s waste becomes another&rsquo;s raw material). The Waste and Resources
                      Action Programme (WRAP) is a leading UK body promoting circular economy principles in
                      construction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Waste Hierarchy:</strong> Closely related to the
                  circular economy is the <strong>waste hierarchy</strong>, established by the Waste Framework
                  Directive and transposed into UK law through the Waste (England and Wales) Regulations 2011.
                  It sets out the priority order for waste management: <strong>prevention</strong> (most
                  preferred) &rarr; <strong>preparation for reuse</strong> &rarr; <strong>recycling</strong>
                  &rarr; <strong>other recovery</strong> (including energy recovery) &rarr; <strong>disposal
                  </strong> (least preferred). All waste producers, including construction sites, have a legal
                  duty to apply the waste hierarchy and must be able to demonstrate that they have done so.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 06: The Role of the Environment Agency               */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">06</span>
              The Role of the Environment Agency
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Environment Agency (EA)</strong> is the principal environmental regulator in
                England, established under the Environment Act 1995. It is an executive non-departmental
                public body, sponsored by the Department for Environment, Food &amp; Rural Affairs (DEFRA).
                The EA&rsquo;s remit is broad and powerful, and any construction professional needs to
                understand its role, powers, and how to interact with it.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Environment Agency: Key Functions</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Environmental Permitting</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The EA issues environmental permits under the Environmental Permitting (England and
                      Wales) Regulations 2016 for a wide range of activities including waste operations
                      (waste transfer stations, treatment facilities, landfill sites), water discharge
                      activities (discharging effluent to watercourses or groundwater), groundwater
                      activities (discharges or releases to groundwater), and prescribed industrial processes
                      (Part A installations under the Industrial Emissions Directive). Construction sites
                      that need to discharge water (for example, dewatering of excavations) may require a
                      water discharge permit or must operate under a regulatory position statement.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Waste Regulation</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The EA regulates the storage, treatment, transportation, and disposal of waste. It
                      maintains the public registers of waste carriers, brokers, and dealers. It registers
                      waste exemptions (for low-risk waste activities that do not require a full environmental
                      permit). It inspects waste management facilities and investigates illegal waste
                      activities (fly-tipping, operating without a permit, mis-describing waste). Construction
                      sites must use registered waste carriers (check the EA public register), ensure waste
                      is described accurately on waste transfer notes and consignment notes, and comply with
                      the duty of care requirements under Section 34 of the Environmental Protection Act 1990.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Water Quality &amp; Flood Risk</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The EA monitors and protects the quality of rivers, lakes, estuaries, coastal waters,
                      and groundwater across England. It investigates water pollution incidents and takes
                      enforcement action against polluters. It also manages flood risk, maintaining flood
                      defences, issuing flood warnings, and providing flood risk data that informs planning
                      decisions. For construction, the EA is a statutory consultee on planning applications
                      in flood risk areas and for developments that could affect watercourses or groundwater.
                      The EA&rsquo;s Pollution Prevention Guidelines (now superseded by regulatory position
                      statements and guidance notes) provide practical advice on protecting water from
                      construction site pollution.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <p className="text-sm font-medium text-white mb-1">Enforcement Powers</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      The EA has extensive enforcement powers including: issuing <strong>enforcement notices
                      </strong> requiring compliance within a specified timeframe; issuing <strong>prohibition
                      notices</strong> requiring immediate cessation of polluting activities; issuing
                      <strong> suspension notices</strong> suspending environmental permits; issuing
                      <strong> fixed monetary penalties</strong> and <strong>variable monetary penalties
                      </strong> for less serious offences; and <strong>criminal prosecution</strong> for
                      serious offences. For water pollution offences under the Environmental Permitting
                      Regulations, unlimited fines and up to five years&rsquo; imprisonment can be imposed
                      on conviction. The EA publishes an annual enforcement and sanctions report and maintains
                      a public register of enforcement actions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Emergency Contact</p>
                </div>
                <p className="text-sm text-white/80">
                  If you witness a pollution incident or environmental emergency, report it immediately to
                  the <strong>Environment Agency 24-hour incident hotline: 0800 80 70 60</strong>. This
                  includes oil or fuel spills entering watercourses, illegal dumping of waste, fish kills,
                  unusual discolouration or contamination of rivers or streams, and any discharge of
                  polluting substances to land or water. Prompt reporting enables a faster response and
                  can significantly reduce environmental damage. All construction workers should know this
                  number.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Equivalent Bodies in the Devolved Nations</p>
                <p className="text-sm text-white/80">
                  In <strong>Wales</strong>, Natural Resources Wales (NRW) performs the combined functions of
                  the Environment Agency, the Countryside Council for Wales, and the Forestry Commission
                  Wales. In <strong>Scotland</strong>, the Scottish Environment Protection Agency (SEPA) is
                  the principal environmental regulator. In <strong>Northern Ireland</strong>, the Northern
                  Ireland Environment Agency (NIEA) is part of the Department of Agriculture, Environment
                  and Rural Affairs (DAERA). While the regulatory bodies differ, the underlying principles
                  of environmental protection are consistent across all UK nations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 07: Environmental Responsibilities                   */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">07</span>
              Environmental Responsibilities
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Environmental responsibility in UK construction is shared across all parties involved in a
                project. Unlike health and safety legislation, where the Health and Safety at Work etc. Act
                1974 provides a single overarching framework, environmental duties are distributed across
                multiple pieces of legislation. Nevertheless, clear responsibilities exist for each party.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Responsibilities by Role</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-sm font-semibold text-white mb-2">Employer / Organisation Duties</p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Comply with all applicable environmental legislation, permits, and planning conditions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Hold a registered waste carrier licence if transporting controlled waste (or use registered carriers)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Fulfil the duty of care for waste under Section 34 of the Environmental Protection Act 1990 &mdash; describing waste accurately, storing it safely, transferring it only to authorised persons, and keeping records</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Classify and manage hazardous waste in accordance with the Hazardous Waste Regulations 2005 (England and Wales)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Prevent pollution of water, land, and air through proactive site management and emergency preparedness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Provide environmental awareness training and information to all workers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Report environmental incidents to the Environment Agency as required</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-sm font-semibold text-white mb-2">Employee / Worker Duties</p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Follow the environmental procedures, method statements, and site rules established for the project</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Use designated waste segregation and recycling facilities correctly &mdash; do not contaminate recycling streams with wrong materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Store chemicals, fuels, and oils in designated areas with appropriate bunding and spill containment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Report any environmental incidents, spills, or near-misses immediately to site management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Never pour waste liquids (including dirty water, cement washings, solvents, or oils) down drains or into watercourses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Know the location of spill kits and understand how to use them</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Respect protected areas, trees, vegetation, and wildlife on and around the site</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-sm font-semibold text-white mb-2">Principal Contractor Duties</p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Under CDM 2015, plan, manage, monitor, and coordinate the construction phase including environmental aspects</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Prepare and implement the Construction Environmental Management Plan (CEMP)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Ensure all subcontractors and their workers are aware of and comply with environmental requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Provide site induction covering environmental rules, waste management, pollution prevention, and emergency procedures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Monitor environmental performance, investigate incidents, and implement corrective actions</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-sm font-semibold text-white mb-2">Client Duties</p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Set environmental requirements and expectations in the project brief and contract documents</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Commission Environmental Impact Assessments (EIA) where required by the Town and Country Planning (Environmental Impact Assessment) Regulations 2017</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Ensure adequate time and resources are allocated for environmental management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Comply with biodiversity net gain requirements under the Environment Act 2021</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Under CDM 2015, ensure that suitable arrangements are in place for managing the project (which includes environmental management)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">CDM 2015 and Environmental Overlap</p>
                <p className="text-sm text-white/80">
                  The Construction (Design and Management) Regulations 2015 (CDM 2015) are primarily health
                  and safety regulations, but they have significant environmental implications. CDM 2015
                  requires all duty holders &mdash; clients, designers, principal designers, principal
                  contractors, and contractors &mdash; to plan, manage, and coordinate work to ensure it is
                  carried out &ldquo;so far as is reasonably practicable, without risks to the health or
                  safety of any person.&rdquo; Since many environmental hazards (contaminated land, asbestos,
                  lead, biological hazards, chemical exposure, noise) also pose health and safety risks, the
                  CDM 2015 management framework naturally encompasses significant environmental management
                  activities. The Construction Phase Plan required by CDM 2015 typically includes or
                  cross-references the CEMP, ensuring that environmental management is integrated with
                  health and safety management from the outset of the project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 08: Benefits of Good Environmental Practice          */}
        {/* ============================================================ */}
        <section className="mb-10">
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">08</span>
              Benefits of Good Environmental Practice
            </h2>
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Environmental management is sometimes perceived as a burden &mdash; an additional cost and
                regulatory requirement that diverts resources from &ldquo;productive&rdquo; work. This
                perception is fundamentally wrong. Good environmental practice delivers tangible, measurable
                benefits that directly improve business performance, legal standing, reputation, and the
                wellbeing of workers and communities.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Business Benefits of Good Environmental Management</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-sm font-semibold text-white mb-2">Cost Savings</p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span><strong>Reduced waste disposal costs</strong> &mdash; segregating and recycling waste is typically 50&ndash;75% cheaper than mixed waste disposal to landfill. Landfill Tax currently stands at &pound;103.70 per tonne (standard rate, 2024/25), making disposal extremely expensive</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span><strong>Lower energy bills</strong> &mdash; efficient use of energy on site (mains connections instead of diesel generators, LED temporary lighting, timer-controlled heating) directly reduces fuel costs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span><strong>Reduced material waste</strong> &mdash; better material ordering, storage, and handling reduces waste and the cost of buying replacement materials. Over-ordering by even 5% on a large project represents thousands of pounds of unnecessary expenditure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span><strong>Avoided fines and remediation costs</strong> &mdash; environmental prosecution fines can run to hundreds of thousands of pounds. Clean-up costs for a pollution incident can be even higher. Prevention is always cheaper</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span><strong>Reduced water costs</strong> &mdash; metering, recycling, and efficient use of water on site can significantly reduce mains water charges</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-sm font-semibold text-white mb-2">Legal Compliance &amp; Risk Reduction</p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Systematic environmental management ensures compliance with the extensive body of UK environmental law, reducing the risk of enforcement action, prosecution, and associated costs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Environmental incidents cause project delays &mdash; an EA investigation or enforcement notice can halt work. Prevention avoids these costly interruptions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Directors and senior managers can be held personally liable for environmental offences under the &ldquo;consent, connivance, or neglect&rdquo; provisions in most environmental legislation</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-sm font-semibold text-white mb-2">Reputation &amp; Competitive Advantage</p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>An increasing number of public and private sector clients include environmental performance criteria in their procurement evaluation. ISO 14001 certification, strong environmental track records, and demonstrable sustainability commitments are now competitive differentiators in the UK construction market</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>The Social Value Act 2012 requires public sector procurement to consider social value, which includes environmental outcomes. Government construction procurement frameworks increasingly weight environmental factors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span>Conviction for environmental offences is published on the Environment Agency&rsquo;s public register. This reputational damage can affect future work opportunities for years</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-sm font-semibold text-white mb-2">Worker Health &amp; Community Relations</p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span><strong>Worker health:</strong> Many environmental controls also protect worker health. Dust suppression reduces silica exposure. Proper chemical storage prevents accidental exposure. Noise management protects hearing. Clean water prevents skin conditions and infections</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span><strong>Community relations:</strong> Construction sites that manage noise, dust, traffic, and visual impact effectively generate fewer complaints from neighbouring residents and businesses. Good community relations lead to smoother planning processes, fewer objections to future applications, and reduced risk of enforcement action triggered by complaints</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                        <span><strong>Staff morale and recruitment:</strong> Younger workers in particular are increasingly motivated by working for organisations that demonstrate genuine environmental responsibility. Good environmental practice supports recruitment, retention, and engagement</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Key Takeaway:</strong> Environmental management is not
                  a cost &mdash; it is an investment that delivers measurable financial returns, reduces legal
                  and reputational risk, improves worker health, strengthens community relations, and
                  increasingly determines whether you win or lose work in the competitive UK construction
                  market. Whether you are a sole trader electrician or part of a major contracting
                  organisation, environmental performance is now a core business competence, not an optional
                  add-on.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Electrician&rsquo;s Perspective</p>
                <p className="text-sm text-white/80">
                  As an electrician, your environmental contributions include: correctly segregating cable
                  offcuts (copper can be recycled at good value), managing packaging waste (returning reels,
                  recycling cardboard and plastic), properly disposing of old equipment under WEEE
                  regulations, minimising dust from chasing and drilling through extraction and suppression,
                  avoiding spillage of cable-pulling lubricants and cleaning solvents, and &mdash; critically
                  &mdash; designing and installing energy-efficient electrical systems (LED lighting, smart
                  controls, efficient motor circuits, EV charging infrastructure) that reduce the
                  operational carbon footprint of buildings for decades to come. Your work has both immediate
                  environmental impacts (on the construction site today) and long-term environmental
                  consequences (through the energy performance of the installations you create).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FAQ SECTION                                                  */}
        {/* ============================================================ */}
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

        {/* ============================================================ */}
        {/*  END-OF-SECTION QUIZ                                          */}
        {/* ============================================================ */}
        <Quiz
          title="Section 1 Knowledge Check"
          questions={quizQuestions}
        />

        {/* ============================================================ */}
        {/*  BOTTOM NAVIGATION                                            */}
        {/* ============================================================ */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-1-section-2">
              Next: Key Environmental Legislation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

      </article>
    </div>
  );
}
