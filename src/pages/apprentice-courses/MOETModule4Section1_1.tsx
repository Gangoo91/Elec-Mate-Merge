import { ArrowLeft, Calendar, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Principles of PPM - MOET Module 4.1.1';
const DESCRIPTION =
  'Planned preventive maintenance for maintenance technicians: reactive, preventive, predictive and condition-based strategies compared, the bathtub curve, building a PPM schedule, criticality assessment, MTBF and MTTR, and where electrical tasks fit.';

const quickCheckQuestions = [
  {
    id: 'ppm-definition',
    question: 'Planned preventive maintenance (PPM) is best described as:',
    options: [
      'Maintenance carried out at predetermined intervals or against set criteria, intended to reduce the probability of failure or degradation',
      'Repair work carried out as quickly as possible once equipment has stopped working',
      'Replacing every component in a system at the same time to simplify the stores holding',
      'Continuous monitoring of equipment so that no scheduled work is ever needed',
    ],
    correctIndex: 0,
    explanation:
      'PPM is work carried out to a plan — at set time intervals, running hours, cycle counts or against defined criteria — with the aim of reducing the likelihood of failure or of a gradual loss of performance. The defining feature is that the work is decided in advance rather than triggered by a breakdown.',
  },
  {
    id: 'bathtub-region',
    question:
      'A batch of contactors has been in service for several years and coils are now beginning to fail with increasing regularity. Which region of the bathtub curve does this describe?',
    options: [
      'Infant mortality, where the failure rate falls as manufacturing defects are found',
      'Useful life, where the failure rate is roughly constant and failures are largely random',
      'Wear-out, where the failure rate rises as components approach the end of their service life',
      'The curve does not apply to electrical components, only to rotating machinery',
    ],
    correctIndex: 2,
    explanation:
      'A rising failure rate after a long period of steady service is the wear-out region. This is the part of the curve where interval-based replacement genuinely pays, because failures are age-related and therefore predictable in aggregate. In the flat useful-life region, replacing a healthy component gains you little and restarts infant mortality.',
  },
  {
    id: 'criticality-purpose',
    question: 'The purpose of a criticality assessment when building a PPM schedule is to:',
    options: [
      'Identify which assets are the most expensive to purchase so they can be insured',
      'Rank assets by the consequence of their failure so that maintenance effort is directed where it matters most',
      'Decide which technicians are qualified to work on each item of plant',
      'Establish the correct torque setting for every bolted connection on site',
    ],
    correctIndex: 1,
    explanation:
      'Criticality ranks assets by the consequence of failure — harm to people, statutory breach, production or service loss, environmental damage and cost. Maintenance resource is finite, so it must be concentrated on the assets where failure hurts most. Criticality drives both whether an asset gets PPM at all and how often.',
  },
  {
    id: 'mtbf-worked',
    question:
      'A conveyor drive is monitored over a period in which it accumulates 2,400 hours of running time and suffers 4 failures, with 12 hours of repair time in total. What are its MTBF and MTTR?',
    options: [
      'MTBF 600 hours, MTTR 3 hours',
      'MTBF 4 hours, MTTR 600 hours',
      'MTBF 2,400 hours, MTTR 12 hours',
      'MTBF 200 hours, MTTR 48 hours',
    ],
    correctIndex: 0,
    explanation:
      'MTBF = total running time / number of failures = 2,400 / 4 = 600 hours. MTTR = total repair time / number of repairs = 12 / 4 = 3 hours. Availability follows as MTBF / (MTBF + MTTR) = 600 / 603, which is approximately 99.5%.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The key difference between reactive and preventive maintenance is that:',
    options: [
      'Reactive maintenance is always cheaper because no planning effort is spent',
      'Preventive maintenance is decided and scheduled in advance, whereas reactive maintenance is triggered by a failure that has already happened',
      'Reactive maintenance can only be carried out by an external contractor',
      'Preventive maintenance applies only to mechanical plant, not to electrical systems',
    ],
    correctAnswer: 1,
    explanation:
      'Preventive maintenance is planned before failure and carried out to a schedule or against set criteria. Reactive (breakdown, or run-to-failure) maintenance responds after the equipment has already stopped or become unsafe. Reactive work is not automatically wrong — it can be a deliberate choice for low-consequence assets — but it is a choice, not a default.',
  },
  {
    id: 2,
    question: 'Run-to-failure is a legitimate maintenance strategy when:',
    options: [
      'The asset is safety-critical but expensive to access',
      'The asset carries a statutory inspection requirement',
      'Failure has low consequence, spares are readily available, and the failure cannot cause harm or damage other equipment',
      'The maintenance team is short of resource and needs to reduce its workload',
    ],
    correctAnswer: 2,
    explanation:
      'Run-to-failure is a valid, deliberate strategy for low-criticality assets where failure is not hazardous, does not cascade, and can be corrected quickly with stock spares — a single non-emergency luminaire in a well-lit open-plan office, for example. It is only wrong when it is the result of neglect rather than a documented decision, or when it is applied to an asset with a statutory or safety function.',
  },
  {
    id: 3,
    question:
      'Condition-based maintenance differs from fixed-interval preventive maintenance because:',
    options: [
      'Work is triggered by a measured indicator of the asset condition rather than by the calendar or a running-hours count',
      'It requires no measurement or record keeping of any kind',
      'It can only be applied to assets that are permanently de-energised',
      'It replaces the need for any statutory inspection of the installation',
    ],
    correctAnswer: 0,
    explanation:
      'Condition-based maintenance uses a measured parameter — temperature, vibration, insulation resistance, oil condition, partial discharge — to decide when intervention is needed. The asset is inspected or monitored on a schedule, but the intrusive work is only done when the measurement says it is warranted. This avoids both premature intervention and late intervention.',
  },
  {
    id: 4,
    question: 'The "infant mortality" region of the bathtub curve describes:',
    options: [
      'A rising failure rate as components reach the end of their design life',
      'A falling failure rate early in service as manufacturing defects, installation errors and commissioning faults are flushed out',
      'A constant failure rate throughout the whole life of the equipment',
      'The period during which no failures of any kind can occur',
    ],
    correctAnswer: 1,
    explanation:
      'Infant mortality is the early-life period during which the failure rate is initially high and then falls, as latent manufacturing defects, poor installation workmanship and commissioning errors reveal themselves. This is why thorough commissioning, and a close watch on newly installed or newly overhauled equipment, matter so much.',
  },
  {
    id: 5,
    question:
      'A common criticism of fixed-interval component replacement is that, for failures that occur randomly rather than with age, it:',
    options: [
      'Guarantees the asset will never fail again during the following interval',
      'Removes a component that was working and reintroduces the risk of early-life failure in the new one, without addressing the actual failure mode',
      'Always costs less than leaving the component in service',
      'Is required by BS 7671 for all electrical accessories',
    ],
    correctAnswer: 1,
    explanation:
      'If a failure mode is random rather than age-related, swapping a healthy component at a fixed interval does not reduce the chance of failure in the next period — and it exposes you to the infant-mortality risk of the replacement plus the risk of the intrusive work itself. This is the central argument for choosing condition-based tasks where a meaningful condition indicator exists.',
  },
  {
    id: 6,
    question:
      'Under BS 7671:2018+A4:2026, an assessment must be made of the frequency and quality of maintenance an installation can reasonably be expected to receive. Who must be consulted in making that assessment?',
    options: [
      'The distribution network operator for the site',
      'The manufacturer of the main switchgear',
      'The person or body responsible for the operation and/or maintenance of the installation',
      'The building insurer',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 Regulation 341.1 requires an assessment of the frequency and quality of maintenance the installation can reasonably be expected to receive during its intended life, and requires the person or body responsible for the operation and/or maintenance of the installation to be consulted. The outcome then feeds into how the requirements of Parts 4 to 8 are applied.',
  },
  {
    id: 7,
    question:
      'BS 7671 Regulation 652.1 requires the frequency of periodic inspection and testing to be determined having regard to a set of factors. Which of the following is one of them?',
    options: [
      'The frequency and quality of maintenance the installation receives',
      'The trading name of the contractor who carried out the original installation',
      'The insurance premium paid on the building',
      'The number of technicians employed on the site',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 652.1 requires the interval to be determined having regard to the type of installation, the type of equipment present, the use and operation of the installation, the frequency and quality of maintenance, the external influences to which it is subjected, and the results and recommendations of previous certificates and condition reports. A well-maintained installation and a neglected one do not warrant the same interval.',
  },
  {
    id: 8,
    question:
      'A machine accumulates 1,800 running hours with 3 failures and 9 hours of total repair time. Its MTBF and MTTR are:',
    options: [
      'MTBF 3 hours, MTTR 600 hours',
      'MTBF 600 hours, MTTR 3 hours',
      'MTBF 1,800 hours, MTTR 9 hours',
      'MTBF 200 hours, MTTR 27 hours',
    ],
    correctAnswer: 1,
    explanation:
      'MTBF = 1,800 / 3 = 600 hours. MTTR = 9 / 3 = 3 hours. Availability = 600 / (600 + 3) = 99.5% to one decimal place. Note that MTBF is an average across a period, not a guarantee about any individual machine.',
  },
  {
    id: 9,
    question:
      'A site reports 92% PPM schedule compliance for the month, but two of the tasks not completed were statutory inspections. The correct interpretation is:',
    options: [
      'The headline figure is good, so no action is required',
      'The headline figure conceals a compliance failure — statutory and safety-critical tasks need to be tracked separately and must not be traded off against routine work',
      'Statutory tasks should be removed from the schedule so they do not distort the KPI',
      'The compliance target should be lowered to 90% so the site passes',
    ],
    correctAnswer: 1,
    explanation:
      'An aggregated KPI hides the mix. Statutory and safety-critical tasks are not interchangeable with routine ones, and a high overall percentage can be achieved while missing exactly the tasks that must never be missed. Good practice is to report statutory compliance as its own figure, held to 100%.',
  },
  {
    id: 10,
    question:
      'The six-monthly test-button instruction associated with the RCD notice in BS 7671 Regulation 514.12.2 is best described as:',
    options: [
      'A requirement for the maintenance technician to carry out full RCD testing with an instrument every six months',
      'The wording of a user instruction notice, directing ordinary persons to press the test button and restore the device afterwards',
      'A replacement for periodic inspection and testing of the installation',
      'A manufacturer recommendation with no basis in BS 7671',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 514.12.2 sets out the wording of a notice to be provided for users. It instructs ordinary persons to test six-monthly by pressing the relevant test button, then to switch the device back on manually, and to seek expert advice if the device does not operate or indicates a fault. It is a user duty communicated by a notice — not a substitute for instrument testing by a competent person, and not itself the technician PPM task.',
  },
  {
    id: 11,
    question:
      'A thermographic survey of a distribution board is a good example of which maintenance strategy?',
    options: [
      'Reactive maintenance, because it is carried out after a fault',
      'Predictive or condition-based maintenance, because it measures a condition indicator on load to decide whether intervention is needed',
      'Corrective maintenance, because it repairs the fault directly',
      'Design maintenance, because it changes the circuit arrangement',
    ],
    correctAnswer: 1,
    explanation:
      'Thermography measures a condition indicator — surface temperature and, importantly, the temperature of one connection relative to its neighbours on comparable load — while the equipment is in normal service. It is non-intrusive, so it does not disturb healthy joints, and it identifies which connections warrant intervention at the next opportunity.',
  },
  {
    id: 12,
    question:
      'The HSE approved code of practice supporting PUWER 1998 makes which point about the frequency of maintenance checks?',
    options: [
      'A fault affecting production usually shows up quickly, but a fault in a safety-critical system can stay hidden unless safety checks are deliberately built into the maintenance regime',
      'All work equipment must be maintained weekly regardless of risk',
      'A maintenance log is a legal requirement for every item of work equipment',
      'Maintenance may be carried out by any available person on site',
    ],
    correctAnswer: 0,
    explanation:
      'The approved code of practice notes that faults which affect production tend to become apparent within a short time, whereas a fault in a safety-critical system may remain undetected unless appropriate safety checks are included in maintenance. It also notes there is no legal requirement for a maintenance log, although a record is recommended for high-risk equipment, and that maintenance should only be carried out by competent people.',
  },
];

const faqs = [
  {
    question: 'Does PPM stand for planned preventive or planned preventative maintenance?',
    answer:
      'Both are used on UK sites and they mean the same thing. "Planned preventive maintenance" is the more common form in standards and technical writing; "planned preventative maintenance" is widespread in facilities management. You may also see PPM used to mean "planned and preventive maintenance". Whichever your employer uses, the definition is the same: maintenance decided and scheduled in advance with the aim of reducing the likelihood of failure or degradation.',
  },
  {
    question: 'Is PPM a legal requirement?',
    answer:
      'There is no single regulation that says "you must have a PPM system". What the law requires is an outcome. The Electricity at Work Regulations 1989 place duties on those in control of electrical systems to ensure they are safe and maintained in a safe condition. The Provision and Use of Work Equipment Regulations 1998 require work equipment to be maintained so that it remains safe. A planned, recorded maintenance regime is the normal and most defensible way of demonstrating that those duties are being met — and, just as important, of proving it after the event.',
  },
  {
    question: 'How do I decide the interval for a PPM task?',
    answer:
      'Start from the manufacturer guidance for the asset, then adjust it for the way the asset is actually used: duty cycle, environment, load, criticality and the history you already hold. Where the task supports a statutory or standards-driven requirement, that requirement sets the floor and you do not go below it. After that, let the evidence move the interval. HSE guidance on maintaining portable electrical equipment makes this point plainly — a low failure rate indicates the interval can be lengthened, and a high failure rate that it should be shortened. The same logic applies far beyond portable appliances.',
  },
  {
    question: 'Can too much maintenance be a bad thing?',
    answer:
      'Yes. Intrusive work on healthy equipment carries its own risk: connections disturbed and not correctly remade, fixings cross-threaded, moisture or dust let into an enclosure, a tool left behind, a protective device left in the wrong position. It also consumes hours and, if the equipment must be taken out of service, availability. The aim is not maximum maintenance, it is the right maintenance — which is why non-intrusive condition checks are often preferable to routine strip-downs where a usable condition indicator exists.',
  },
  {
    question: 'What is the difference between predictive and condition-based maintenance?',
    answer:
      'They overlap heavily and many organisations use the terms interchangeably. The useful distinction is that condition-based maintenance triggers work when a measured parameter crosses a threshold — act now, this reading is out of limits. Predictive maintenance goes a step further and uses the trend in that data to estimate when the asset will reach the limit, so the work can be planned into a convenient window rather than done immediately. Predictive maintenance therefore depends on good condition data collected consistently over time.',
  },
  {
    question:
      'If a PPM task cannot be completed on the scheduled date, what should the technician do?',
    answer:
      'Never close the work order as complete. Record accurately what prevented completion — no access, plant running, parts unavailable, permit refused — and return the task so it stays visible in the backlog. If the task is statutory or safety-critical, escalate it the same day rather than letting it drift to the next cycle. A schedule that is honest about what was missed is far more useful than one that shows 100% compliance because incomplete tasks were quietly signed off.',
  },
];

const MOETModule4Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Calendar className="h-4 w-4" />
            <span>Module 4.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Principles of PPM
          </h1>
          <p className="text-white">
            Maintenance strategies, the bathtub curve, criticality and the KPIs that show whether
            your programme is working
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">
              In 30 Seconds
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>PPM:</strong> Work decided and scheduled before failure, not after it
              </li>
              <li className="pl-1">
                <strong>Four strategies:</strong> Reactive, preventive, predictive, condition-based
              </li>
              <li className="pl-1">
                <strong>Bathtub curve:</strong> Early-life, useful-life and wear-out failure regions
              </li>
              <li className="pl-1">
                <strong>Criticality:</strong> Rank by consequence of failure, then spend the hours
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">
              Electrical Maintenance Context
            </p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1">
                <strong>Condition tasks:</strong> Thermography, insulation resistance trending
              </li>
              <li className="pl-1">
                <strong>Function tests:</strong> RCDs, emergency lighting, interlocks, alarms
              </li>
              <li className="pl-1">
                <strong>BS 7671:</strong> Maintainability and inspection frequency are assessed
              </li>
              <li className="pl-1">
                <strong>ST1426:</strong> Planning and recording maintenance is a core competency
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Compare reactive, preventive, predictive and condition-based maintenance honestly',
              'Explain why PPM exists — safety, statutory duty, availability, asset life and cost',
              'Interpret the bathtub curve and what it means for replacement intervals',
              'Build a PPM schedule from manufacturer guidance, criticality and statutory items',
              'Calculate and interpret MTBF, MTTR and schedule compliance correctly',
              'Place electrical tasks such as thermography and IR trending within a PPM programme',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What PPM Is and Why It Exists */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What PPM Is and Why It Exists
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Planned preventive maintenance is maintenance that is decided in advance. The task,
              the interval, the person who does it and the record that results are all determined
              before anything goes wrong. That is the only real difference between PPM and the
              alternative — waiting for the equipment to tell you it needs attention by stopping.
            </p>
            <p>
              On a maintenance technician apprenticeship this is easy to treat as paperwork. It is
              not. The PPM schedule is the mechanism by which an organisation converts a legal duty
              and a commercial requirement into a list of jobs that a named person actually carries
              out on a named date. When a PPM programme is weak, nobody notices for a while — and
              then several things go wrong at once.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Five Reasons PPM Programmes Exist
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>Safety:</strong> Protective devices, interlocks, emergency stops,
                  emergency lighting and alarm systems only protect anybody if they still work.
                  Unlike a production fault, a dormant safety fault gives you no warning that it
                  exists — you only discover it at the moment you needed it to work.
                </li>
                <li className="pl-1">
                  <strong>Statutory duty:</strong> The Electricity at Work Regulations 1989 place
                  duties on those in control of electrical systems to keep them safe and maintained
                  in a safe condition. The Provision and Use of Work Equipment Regulations 1998
                  require work equipment to be maintained so that it remains safe to use. Neither
                  prescribes a schedule; both require the outcome.
                </li>
                <li className="pl-1">
                  <strong>Availability:</strong> Planned work happens in a window you chose. An
                  unplanned failure happens in a window the equipment chose, usually the least
                  convenient one, and takes longer because nothing was prepared.
                </li>
                <li className="pl-1">
                  <strong>Asset life:</strong> Lubrication, cleaning, tightening and correct
                  environmental control extend the service life of plant. Neglect shortens it, and
                  the shortening is usually invisible until replacement is unavoidable.
                </li>
                <li className="pl-1">
                  <strong>Cost and evidence:</strong> Planned work uses ordered parts, normal-hours
                  labour and prepared access. It also produces a record, and a record is what
                  demonstrates to an inspector, an insurer or a court that the duty was discharged.
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                The Hidden-Fault Problem
              </p>
              <p className="text-sm text-white">
                The HSE approved code of practice supporting PUWER makes a point that every
                maintenance technician should internalise: a fault which affects production is
                normally apparent within a short time, but a fault in a safety-critical system can
                remain undetected unless appropriate safety checks are deliberately included in the
                maintenance regime. A seized emergency stop, a failed RCD, an emergency luminaire
                with a dead battery — none of these announce themselves. They are found by a test,
                or they are found by an incident. PPM is how you make sure it is the first one.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The purpose of PPM is not to do more maintenance. It is to
              make sure that the maintenance which actually matters happens, is recorded, and is
              informed by what the equipment is telling you.
            </p>
          </div>
        </section>

        {/* Section 02: The Four Maintenance Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Four Maintenance Strategies Compared
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              No competent site runs on a single strategy. A mature maintenance programme is a
              deliberate mixture, with each asset assigned the strategy that suits its failure
              behaviour and its criticality. What makes the difference between a good programme and
              a poor one is whether that assignment was a decision or an accident.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Reactive (Breakdown / Run-to-Failure)
                </h3>
                <p className="text-sm text-white mb-2">
                  Nothing is done until the asset fails, then it is repaired or replaced. Also
                  called corrective maintenance when it follows a reported fault.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    <strong>In its favour:</strong> No effort is spent on assets that never fail.
                    Full component life is used. Zero planning overhead.
                  </li>
                  <li className="pl-1">
                    <strong>Against it:</strong> Failure occurs at the worst moment; repair takes
                    longer because access, parts and permits were not prepared; consequential damage
                    is possible; and there is no evidence of a maintenance regime.
                  </li>
                  <li className="pl-1">
                    <strong>Appropriate when:</strong> Consequence of failure is low, there is no
                    safety or statutory function, failure cannot cascade, and a spare is on the
                    shelf — and the decision has been documented rather than defaulted into.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Preventive (Fixed Interval)
                </h3>
                <p className="text-sm text-white mb-2">
                  Work is carried out at a set interval — calendar time, running hours, operating
                  cycles or throughput — regardless of the apparent condition of the asset.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    <strong>In its favour:</strong> Simple to schedule and resource; easy to audit;
                    highly effective where the dominant failure mode is genuinely age-related.
                  </li>
                  <li className="pl-1">
                    <strong>Against it:</strong> Intervals are estimates. Set them too long and you
                    miss failures; set them too short and you spend hours on healthy equipment and
                    disturb connections that were perfectly sound.
                  </li>
                  <li className="pl-1">
                    <strong>Appropriate when:</strong> There is a known wear-out mode, a
                    manufacturer-defined service life, a statutory interval, or no practical
                    condition indicator to measure.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Condition-Based Maintenance (CBM)
                </h3>
                <p className="text-sm text-white mb-2">
                  A condition indicator is measured on a schedule, and intrusive work is only
                  carried out when that measurement says it is needed.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    <strong>In its favour:</strong> Intervention happens because the asset needs it,
                    not because a date arrived. Healthy equipment is left alone. Most measurements
                    are taken with the plant in service.
                  </li>
                  <li className="pl-1">
                    <strong>Against it:</strong> Needs instruments, competence to interpret the
                    readings, and a baseline. A measurement without a baseline or a trend tells you
                    much less than people assume.
                  </li>
                  <li className="pl-1">
                    <strong>Electrical examples:</strong> Thermographic surveys of boards and
                    terminations, insulation resistance trending on motors, vibration on drive
                    trains, battery impedance on standby systems.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Predictive Maintenance (PdM)
                </h3>
                <p className="text-sm text-white mb-2">
                  Condition data is trended over time and used to estimate when the asset will reach
                  an unacceptable state, so the work can be planned into a chosen window rather than
                  done at the moment a threshold is crossed.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    <strong>In its favour:</strong> Converts an emerging fault into planned work
                    with ordered parts and booked access — the best of both worlds.
                  </li>
                  <li className="pl-1">
                    <strong>Against it:</strong> Depends entirely on consistent, comparable data. If
                    readings are taken at different loads, from different positions or by different
                    methods, the trend is noise. Investment in instruments and analysis skills is
                    real.
                  </li>
                  <li className="pl-1">
                    <strong>Appropriate when:</strong> The asset is critical enough to justify the
                    effort and the failure mode develops gradually enough to be seen coming.
                  </li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Strategy Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Trigger</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Main strength</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Main weakness</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Reactive</td>
                      <td className="border border-white/10 px-3 py-2">The asset fails</td>
                      <td className="border border-white/10 px-3 py-2">
                        No effort spent until it is needed
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Unplanned downtime, no evidence of a regime
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Preventive</td>
                      <td className="border border-white/10 px-3 py-2">
                        A date, hours run or cycle count
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Predictable, auditable, easy to resource
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Work done on healthy assets; interval is an estimate
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">
                        Condition-based
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        A measurement outside its limit
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Intervention only where it is warranted
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Needs instruments, baselines and interpretation
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Predictive</td>
                      <td className="border border-white/10 px-3 py-2">
                        A trend heading towards a limit
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Turns emerging faults into planned jobs
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Data must be consistent or the trend is meaningless
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The right question is never &quot;which strategy is
              best?&quot; It is &quot;which strategy suits this asset, given how it fails and what
              happens when it does?&quot;
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Bathtub Curve */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            The Bathtub Curve
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The bathtub curve is a plot of failure rate against time for a population of similar
              components. It is called that because the classic shape drops steeply, runs flat for a
              long stretch, then rises at the end — the profile of a bath viewed from the side. It
              is the single most useful mental model for deciding whether a fixed interval will
              actually buy you anything.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Region 1 — Infant Mortality (falling failure rate)
                </h3>
                <p className="text-sm text-white mb-2">
                  Early in service the failure rate is high and falling. The failures are not caused
                  by age; they are latent defects being flushed out — a manufacturing flaw, a
                  termination that was never properly tightened, a gland that was not correctly
                  made, a setting left at its factory default, a cable damaged during installation.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    Thorough commissioning and correct installation shorten this region more than
                    any maintenance task can
                  </li>
                  <li className="pl-1">
                    New and newly overhauled equipment deserves closer attention than
                    long-established plant, which is the opposite of most people&apos;s instinct
                  </li>
                  <li className="pl-1">
                    Every intrusive maintenance job restarts a small infant-mortality period on
                    whatever you touched
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Region 2 — Useful Life (roughly constant failure rate)
                </h3>
                <p className="text-sm text-white mb-2">
                  Through the long middle of the curve the failure rate is approximately constant.
                  Failures still occur, but they are essentially random with respect to age — a
                  transient overvoltage, a foreign object, an operating error, a one-off overload.
                  The component is no more likely to fail next month than it was last month.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    This is the region where fixed-interval replacement earns least. Swapping a
                    healthy item does not reduce the chance of a random event, and it exposes you to
                    the new item&apos;s early-life risk
                  </li>
                  <li className="pl-1">
                    Condition monitoring and functional testing are far more valuable here than
                    scheduled strip-downs
                  </li>
                  <li className="pl-1">
                    Cleaning, correct environment and protection against external influences shift
                    the whole curve — they keep the asset in this region for longer
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Region 3 — Wear-Out (rising failure rate)
                </h3>
                <p className="text-sm text-white mb-2">
                  Eventually age-related mechanisms take over and the failure rate climbs: insulation
                  degradation, bearing wear, contact erosion, electrolyte loss in capacitors and
                  standby batteries, mechanical fatigue, seal hardening.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    This is where scheduled replacement genuinely works, because failure is
                    age-related and therefore predictable across a population
                  </li>
                  <li className="pl-1">
                    Condition trending is at its most valuable just before this region, because it
                    tells you when an individual asset is entering it
                  </li>
                  <li className="pl-1">
                    Standby batteries are the textbook example: a defined service life, a
                    measurable degradation, and a failure mode that only shows up when you most need
                    the system
                  </li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Mistake</p>
              <p className="text-sm text-white">
                Assuming every asset follows the classic bathtub shape. Many electronic and
                electrical components show almost no wear-out region within the life of the
                installation, so their curve is essentially flat after the early-life period. For
                those, a fixed replacement interval is close to pointless and a periodic functional
                test is what actually protects you. Other assets — filters, brushes, contactor tips,
                lamps, batteries — are dominated by wear-out and should be on a firm interval. Ask
                which shape the asset in front of you actually has before you write an interval into
                the schedule.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Fixed-interval replacement is a wear-out tool. If the
              failure mode is random rather than age-related, the interval will not help and a
              condition or functional check will.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Building a PPM Schedule */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Building a PPM Schedule
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A PPM schedule is built asset by asset, not copied wholesale from another site. Three
              inputs shape every line of it: what the manufacturer says, what the consequence of
              failure is, and what the law or the applicable standard requires as a minimum.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Step 1 — Start From the Asset Register
                </h3>
                <p className="text-sm text-white">
                  You cannot maintain what you have not listed. Every asset needs a unique
                  identifier, a precise location, its type and rating, manufacturer and model, and
                  its commissioning date. An asset that is not on the register receives no
                  maintenance and appears in no report — and unregistered assets are almost always
                  the ones that fail first, because nobody has looked at them for years.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Step 2 — Take the Manufacturer Guidance
                </h3>
                <p className="text-sm text-white mb-2">
                  Manufacturer operating and maintenance documentation is the starting point for
                  task content and interval. It is a starting point rather than an answer, because
                  the manufacturer wrote it for a typical duty and a typical environment.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    Harsher duty than assumed — high ambient, dust, moisture, corrosive atmosphere,
                    vibration, frequent switching — argues for a shorter interval
                  </li>
                  <li className="pl-1">
                    Light duty in a clean, controlled environment may justify a longer one, provided
                    the evidence supports it and no statutory floor is breached
                  </li>
                  <li className="pl-1">
                    Where guidance conflicts with a statutory or standards-driven requirement, the
                    requirement wins and the manufacturer interval becomes the ceiling, not the
                    floor
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Step 3 — Assess Criticality
                </h3>
                <p className="text-sm text-white mb-2">
                  Criticality ranks assets by the consequence of their failure, not by their cost or
                  their size. It is the mechanism that stops a finite maintenance team spreading
                  itself evenly across a site where the risks are anything but even.
                </p>
                <div className="overflow-x-auto">
                  <table className="text-sm text-white w-full border-collapse">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="border border-white/10 px-3 py-2 text-left">Criticality</th>
                        <th className="border border-white/10 px-3 py-2 text-left">
                          Consequence of failure
                        </th>
                        <th className="border border-white/10 px-3 py-2 text-left">
                          Typical strategy
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 px-3 py-2 font-medium text-red-400">
                          Critical
                        </td>
                        <td className="border border-white/10 px-3 py-2">
                          Harm to people, statutory breach, or loss of a life-safety function
                        </td>
                        <td className="border border-white/10 px-3 py-2">
                          Planned tasks plus condition monitoring; redundancy where practicable;
                          never deferred
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2 font-medium text-orange-400">
                          High
                        </td>
                        <td className="border border-white/10 px-3 py-2">
                          Significant loss of production or service, or major cost
                        </td>
                        <td className="border border-white/10 px-3 py-2">
                          Full PPM regime, condition monitoring where a usable indicator exists,
                          critical spares held
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2 font-medium text-yellow-400">
                          Medium
                        </td>
                        <td className="border border-white/10 px-3 py-2">
                          Localised disruption, work-around available
                        </td>
                        <td className="border border-white/10 px-3 py-2">
                          Routine PPM at a longer interval; repair on failure acceptable
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2 font-medium text-green-400">
                          Low
                        </td>
                        <td className="border border-white/10 px-3 py-2">
                          Minimal impact, easily and quickly replaced
                        </td>
                        <td className="border border-white/10 px-3 py-2">
                          Documented run-to-failure; inspect opportunistically
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Step 4 — Identify Statutory and Standards-Driven Items
                </h3>
                <p className="text-sm text-white mb-2">
                  Some tasks are not yours to reschedule. Life-safety systems, lifting equipment,
                  pressure systems, local exhaust ventilation and the electrical installation itself
                  all attract requirements arising from legislation or from the standard the system
                  was installed to. These go into the schedule first, are flagged as statutory, and
                  are never traded off against routine work when the month gets busy.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    Flag them distinctly in the system so they cannot be closed as
                    &quot;not required this cycle&quot;
                  </li>
                  <li className="pl-1">
                    Report their compliance separately from the overall figure — see section 05
                  </li>
                  <li className="pl-1">
                    Retain the resulting certificates and reports; the record is part of the task,
                    not an afterthought
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  What BS 7671 Says About Maintenance
                </h3>
                <p className="text-sm text-white mb-2">
                  BS 7671 is a standard for design, erection and verification rather than a
                  maintenance manual, but it makes maintenance an explicit design input in three
                  places that a maintenance technician should know.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">
                    <strong>Chapter 34, Maintainability:</strong> the installation is to be designed
                    and erected so that it can be maintained without introducing danger, with the
                    access and facilities needed to carry out inspection, testing, maintenance and
                    replacement safely.
                  </li>
                  <li className="pl-1">
                    <strong>Regulation 341.1:</strong> an assessment shall be made of the frequency
                    and quality of maintenance the installation can reasonably be expected to
                    receive during its intended life, and the person or body responsible for its
                    operation and/or maintenance shall be consulted. Any periodic inspection,
                    testing, maintenance and repairs likely to be necessary must be readily and
                    safely capable of being carried out, and the effectiveness of the protective
                    measures must not diminish over the intended life.
                  </li>
                  <li className="pl-1">
                    <strong>Regulation 652.1:</strong> the frequency of periodic inspection and
                    testing is to be determined having regard to the type of installation, the type
                    of equipment present, the use and operation of the installation, the frequency
                    and quality of maintenance, the external influences to which it is subjected,
                    and the results and recommendations of previous certificates and condition
                    reports.
                  </li>
                </ul>
                <p className="text-sm text-white mt-2">
                  The point for a maintenance technician is that the standard treats your PPM
                  programme as evidence. A well-maintained installation with a complete record of
                  routine work and trended test results does not warrant the same inspection
                  interval as a neglected one — and the quality of your records is what determines
                  which of those two the inspector concludes they are looking at.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Step 5 — Write the Task, Not Just the Interval
                </h3>
                <p className="text-sm text-white mb-2">
                  &quot;Inspect panel — annual&quot; is not a task. A usable PPM task tells the
                  technician what to do, what to measure and what to compare it against.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    The isolation, permit and access arrangements the work requires
                  </li>
                  <li className="pl-1">
                    The specific checks in order, with acceptance criteria where they exist
                  </li>
                  <li className="pl-1">
                    The measurements to be recorded as values, not as a tick — a number can be
                    trended, a tick cannot
                  </li>
                  <li className="pl-1">The tools, instruments and consumables needed</li>
                  <li className="pl-1">
                    What to do if a defect is found, including the threshold for stopping and
                    escalating
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Manufacturer guidance sets the starting interval,
              criticality decides how much effort the asset deserves, and statutory items set a
              floor you do not go below.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: KPIs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Measuring Whether It Is Working — KPIs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A PPM programme that is never measured drifts. Key performance indicators turn
              opinions about how maintenance is going into figures that can be compared month to
              month. Three are worth understanding properly before any others.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MTBF — Reliability</p>
              <p className="text-sm text-white mb-2">
                Mean Time Between Failures is the average running time between failures for a
                repairable asset.
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>MTBF = total running time / number of failures</strong>
                </li>
                <li className="pl-1">
                  It is an average across a population or a period, not a promise about one machine.
                  An MTBF of 600 hours does not mean the machine runs 600 hours and then fails
                </li>
                <li className="pl-1">
                  The useful signal is the direction of travel. A rising MTBF means the asset is
                  becoming more reliable; a falling one is an early warning that something has
                  changed
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                MTTR — Speed of Recovery
              </p>
              <p className="text-sm text-white mb-2">
                Mean Time To Repair is the average time taken to restore the asset to service after
                a failure — including diagnosis, isolation, parts, repair and functional testing,
                not just the time spent with tools in hand.
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>MTTR = total repair time / number of repairs</strong>
                </li>
                <li className="pl-1">
                  A high MTTR usually points at logistics rather than skill: no spare held, no
                  drawing available, no permit issued, no access arranged
                </li>
                <li className="pl-1">
                  MTBF and MTTR answer different questions. MTBF asks how often it breaks; MTTR asks
                  how long you are down when it does
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Worked Example — MTBF, MTTR and Availability
              </p>
              <div className="text-sm text-white space-y-2">
                <p>
                  A conveyor drive is monitored over a period. It accumulates 2,400 hours of running
                  time, suffers 4 failures, and the total time spent repairing those 4 failures is
                  12 hours.
                </p>
                <p>
                  <strong>MTBF</strong> = total running time / number of failures = 2,400 / 4 ={' '}
                  <strong>600 hours</strong>
                </p>
                <p>
                  <strong>MTTR</strong> = total repair time / number of repairs = 12 / 4 ={' '}
                  <strong>3 hours</strong>
                </p>
                <p>
                  <strong>Availability</strong> = MTBF / (MTBF + MTTR) = 600 / (600 + 3) = 600 / 603
                  = 0.995 = <strong>99.5%</strong>
                </p>
                <p className="text-white">
                  Now read what it means. Roughly one failure every 600 running hours, each costing
                  about 3 hours of downtime. If the next period shows MTBF falling to 400 hours
                  while MTTR stays at 3, the asset is degrading and the maintenance regime needs
                  reviewing. If MTBF holds at 600 but MTTR climbs to 9 hours, the asset is no worse
                  — your spares holding or your response process is.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Schedule Compliance — Discipline
              </p>
              <p className="text-sm text-white mb-2">
                Schedule compliance (often called PPM compliance) is the proportion of planned tasks
                completed within their allowed window.
              </p>
              <div className="text-sm text-white space-y-2">
                <p>
                  <strong>Schedule compliance</strong> = tasks completed on time / tasks scheduled x
                  100%
                </p>
                <p>
                  <strong>Worked example:</strong> 240 PPM tasks were scheduled during the month and
                  216 were completed within their window. 216 / 240 = 0.90, so compliance is 90%.
                </p>
                <p>
                  <strong>Now look inside the number.</strong> Suppose 3 of the 24 tasks that were
                  missed were statutory inspections. Overall compliance of 90% looks respectable,
                  but statutory compliance is 3 items short of the only acceptable figure, which is
                  100%. This is why a single blended KPI is dangerous: it lets genuinely
                  non-negotiable work be averaged away by a pile of routine tasks that were done on
                  time.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                Reading a Poor Result
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  <strong>MTBF falling:</strong> reliability is degrading — wrong tasks, wrong
                  interval, or the duty on the asset has changed
                </li>
                <li className="pl-1">
                  <strong>MTTR rising:</strong> spares, drawings, access or permits are the
                  bottleneck, not the technician
                </li>
                <li className="pl-1">
                  <strong>Availability falling:</strong> could be either of the above — always check
                  which of the two moved before acting
                </li>
                <li className="pl-1">
                  <strong>Schedule compliance low:</strong> under-resourced, over-scheduled, or
                  reactive work is eating the planned hours
                </li>
                <li className="pl-1">
                  <strong>Statutory compliance below 100%:</strong> that is a finding to be
                  escalated, not a trend to be watched
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Mistake</p>
              <p className="text-sm text-white">
                Managing the KPI instead of the equipment. Compliance can be pushed to 100% by
                signing off tasks that were not really done, by writing intervals so long that
                nothing is ever due, or by removing awkward assets from the schedule. All three
                improve the number and worsen the risk. If you are ever asked to close a PPM task
                you did not complete, that is a request to falsify a maintenance record — decline it
                and escalate.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 06: Where Electrical Tasks Fit */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Where Electrical Tasks Fit in a PPM Programme
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Most PPM schedules are written around mechanical plant, with electrical work bolted on
              as an afterthought. As the electrically competent member of the team, part of your job
              is to make sure the electrical tasks are the right ones, at the right interval, with
              results recorded as values that can be compared next time.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Thermographic Surveys
                </h3>
                <p className="text-sm text-white mb-2">
                  Infrared thermography finds loose or high-resistance connections, overloaded
                  conductors, unbalanced phases and failing components by the heat they produce. It
                  is the flagship condition-based electrical task because it is carried out with the
                  equipment energised and in service, so it does not disturb healthy joints.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    Survey under representative load — a lightly loaded board hides the very faults
                    you are looking for
                  </li>
                  <li className="pl-1">
                    Comparison is the technique: one phase against the others, one connection
                    against its neighbours carrying similar current, and this survey against the
                    last
                  </li>
                  <li className="pl-1">
                    Record the load at the time of the survey. A temperature without a load figure
                    cannot be compared with anything
                  </li>
                  <li className="pl-1">
                    Emissivity, reflections, glass and enclosure covers all affect what the camera
                    reports — thermography is a skilled task and interpretation matters as much as
                    the image
                  </li>
                  <li className="pl-1">
                    Findings feed straight into planned work: a hot connection identified today
                    becomes a torque-check job in the next shutdown, not an emergency callout at
                    3am
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  RCD Testing and the Test Button
                </h3>
                <p className="text-sm text-white mb-2">
                  This is an area where two different things are routinely confused, so be precise
                  about which one you mean.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">
                    <strong>The user test.</strong> BS 7671 Regulation 514.12.2 sets out the wording
                    of a notice to be provided, instructing users to test six-monthly by pressing
                    the relevant test button, which should operate the device, and afterwards to
                    switch the device on manually — and if the device does not operate or indicates
                    a fault, to seek expert advice. That is a duty placed on ordinary persons and
                    communicated by a notice. It confirms the mechanism operates; it says nothing
                    about tripping current or disconnection time.
                  </li>
                  <li className="pl-1">
                    <strong>The technician test.</strong> Instrument testing of an RCD by a
                    competent person is a different activity, forms part of periodic inspection and
                    testing, and produces recorded values against the requirements of BS 7671.
                  </li>
                  <li className="pl-1">
                    <strong>In your PPM schedule</strong> both may appear: a functional
                    test-button task at a defined interval on the sites where the maintenance team
                    carries it out, and a separate instrument test tied to the inspection and
                    testing regime. Record which one was done. &quot;RCD tested&quot; on a work
                    order is close to worthless if nobody can tell which of the two it refers to.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Torque Checks on Terminations
                </h3>
                <p className="text-sm text-white mb-2">
                  Loose connections are one of the most common causes of overheating, nuisance
                  tripping and fire in distribution equipment. Torque checking is a classic PPM
                  task, and also a classic example of a task that can do harm if it is done
                  carelessly.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    Use the value specified by the equipment manufacturer for that terminal, with a
                    calibrated torque tool. Never work to a remembered figure or to feel
                  </li>
                  <li className="pl-1">
                    Repeatedly re-torquing the same terminal is not automatically good practice —
                    some terminals are designed to be tightened once, and over-tightening damages
                    the conductor and the terminal
                  </li>
                  <li className="pl-1">
                    Mark checked terminals so the next technician can see what has been done, and
                    record the connections checked rather than a bare &quot;all tight&quot;
                  </li>
                  <li className="pl-1">
                    A thermographic survey is often the better first move: let it tell you which
                    connections warrant opening up
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Insulation Resistance Trending
                </h3>
                <p className="text-sm text-white mb-2">
                  A single insulation resistance reading tells you whether the circuit or winding is
                  acceptable today. A series of readings taken the same way over several years tells
                  you whether the insulation is degrading — which is far more useful for planning.
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    Test at the same test voltage, from the same points, with the same equipment
                    disconnected each time — otherwise the readings are not comparable
                  </li>
                  <li className="pl-1">
                    Record temperature and, for motors, whether the machine was hot or cold.
                    Insulation resistance is strongly temperature-dependent and a warm machine will
                    always read lower
                  </li>
                  <li className="pl-1">
                    Compare against the minimum value required for the circuit by BS 7671 and, just
                    as importantly, against the previous readings for that asset
                  </li>
                  <li className="pl-1">
                    A reading that is still above the minimum but has fallen substantially and
                    consistently is an asset heading for the wear-out region — plan the intervention
                    before it fails
                  </li>
                  <li className="pl-1">
                    Record the actual value. &quot;Pass&quot; destroys the trend and wastes the test
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Other Common Electrical PPM Tasks
                </h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">
                    Functional testing of emergency lighting, fire detection, interlocks and
                    emergency stops — hidden functions that only a test can verify
                  </li>
                  <li className="pl-1">
                    Standby battery checks on UPS and emergency systems — a defined-life,
                    wear-out-dominated asset that must be on a firm interval
                  </li>
                  <li className="pl-1">
                    Cleaning and filter changes on drives, enclosures and switch rooms — dust and
                    heat shorten the useful-life region for everything inside
                  </li>
                  <li className="pl-1">
                    Verifying labelling, notices, schedules and drawings still match the
                    installation — the paperwork is a safety control, not administration
                  </li>
                  <li className="pl-1">
                    Confirming that means of isolation, access and clearances remain adequate, as
                    the maintainability requirements of BS 7671 assume
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Electrical PPM earns its keep when the results are values
              you can trend. Tick boxes prove attendance; recorded measurements prove condition.
            </p>
          </div>
        </section>

        {/* Section 07: CMMS Basics and Record Quality */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            CMMS Basics and Record Quality
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Computerised Maintenance Management System is the database that holds the asset
              register, generates the PPM work orders when they fall due, captures what was found,
              and keeps the history. The next section of this module covers CMMS use in detail; what
              matters here is the principle that the system is only ever as good as what technicians
              put into it.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">
                What a CMMS Does for a PPM Programme
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">
                  Holds the asset register and links each asset to its tasks, drawings, manuals and
                  spares
                </li>
                <li className="pl-1">
                  Raises the work order automatically when a task falls due, whether the trigger is
                  a date, a running-hours meter or a condition reading
                </li>
                <li className="pl-1">
                  Captures findings, measurements, parts used and time spent against that asset
                </li>
                <li className="pl-1">
                  Calculates the KPIs from the underlying records rather than from someone&apos;s
                  recollection
                </li>
                <li className="pl-1">
                  Provides the audit trail that demonstrates the maintenance regime actually
                  happened
                </li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Good Looks Like</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Poor record</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Good record</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Why it matters</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        &quot;IR test — pass&quot;
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Values for each measurement, test voltage, temperature, points tested
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Only values can be trended; a pass tells the next technician nothing
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        &quot;Board inspected — OK&quot;
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Board reference, what was checked, condition found, load at the time,
                        anomalies
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Establishes a baseline and shows the scope of what was actually covered
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        &quot;Couldn&apos;t do — closed&quot;
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Reason for non-completion, task returned to the backlog, escalated if
                        statutory
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        A missed task that is closed disappears; one that is returned stays visible
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">
                        &quot;Replaced faulty part&quot;
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Part number, quantity, why it failed, what the failure mode appeared to be
                      </td>
                      <td className="border border-white/10 px-3 py-2">
                        Failure-mode data is what lets the interval or the strategy be improved
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Records and the Law</p>
              <p className="text-sm text-white">
                The HSE approved code of practice supporting PUWER notes that there is no legal
                requirement to keep a maintenance log, although a record is recommended for
                high-risk equipment, and that a detailed log informs future planning and tells
                maintenance personnel what has been done before. It also states that maintenance
                work should only be carried out by people competent to do it. In practice, on any
                site of any size, the record is the only thing that can demonstrate after the event
                that the maintenance actually happened — which is why organisations treat record
                keeping as mandatory even where the law does not.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Accurate, contemporaneous record keeping and the use of
              maintenance data to inform decisions are assessed behaviours on the maintenance
              technician standard. Being able to explain why a value beats a tick is exactly the
              kind of point that separates a pass from a distinction at end-point assessment.
            </p>
          </div>
        </section>

        {/* Section 08: Site Scenarios */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Site Scenarios
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PPM makes far more sense once you have watched what happens when it goes wrong in
              either direction. These two scenarios are the failure modes you will actually meet.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Scenario 1 — The Skipped PPM That Became a Breakdown
                </h3>
                <div className="text-sm text-white space-y-2">
                  <p>
                    A quarterly thermographic survey of the main distribution boards on a
                    distribution centre falls due in a week when the team is short-handed and
                    chasing reactive calls. The task is deferred. It is deferred again the following
                    quarter because the board could not be surveyed under representative load during
                    the shift that was available. At the third attempt someone closes it in the CMMS
                    with the comment &quot;not required, no issues reported&quot;.
                  </p>
                  <p>
                    Some months later an incoming connection on a busy sub-main fails. The failure
                    takes out a section of the conveyor system for most of a shift, the repair is
                    carried out under emergency conditions with an improvised isolation, and the
                    subsequent investigation finds a connection that had been running hot for a long
                    period.
                  </p>
                  <p>
                    <strong>What went wrong.</strong> The deferral was reasonable once. What was not
                    reasonable was closing the task to protect the compliance figure, which erased
                    the only record that the survey had never been done. The fault was of exactly
                    the type thermography exists to find, and it had been developing across three
                    survey windows.
                  </p>
                  <p>
                    <strong>What good practice looks like.</strong> Return the task rather than
                    close it, so it stays in the backlog and in the compliance figure. Record the
                    genuine reason. Escalate a repeatedly deferred task on a high-criticality asset
                    rather than letting it roll a third time. And if load conditions prevent the
                    survey, that is a scheduling problem to be fixed, not a reason to record the
                    work as complete.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                  Scenario 2 — Over-Maintaining
                </h3>
                <div className="text-sm text-white space-y-2">
                  <p>
                    A site adopts a policy of opening every distribution board annually and
                    re-torquing every terminal, on the reasoning that tight connections are good and
                    more checking must therefore be better. The schedule consumes a large share of
                    the electrical team&apos;s planned hours.
                  </p>
                  <p>
                    Over the following two years the site sees a run of nuisance faults shortly
                    after the annual programme: a neutral not fully remade, a conductor damaged by
                    over-torquing, an enclosure left with a gland incorrectly refitted, and a device
                    left in the wrong position after the work. Meanwhile the emergency lighting
                    functional tests keep slipping, because there are no hours left for them.
                  </p>
                  <p>
                    <strong>What went wrong.</strong> Intrusive work on healthy equipment is not
                    risk-free — it restarts infant mortality on everything it touches. Worse, the
                    over-maintenance displaced a hidden-function test on a life-safety system, which
                    is precisely the category of task that should never be traded away.
                  </p>
                  <p>
                    <strong>What good practice looks like.</strong> Use a non-intrusive condition
                    task to decide where intrusive work is warranted — survey the boards
                    thermographically under load, then open only the ones the survey flags. Follow
                    manufacturer guidance on whether a terminal should be re-torqued at all. Protect
                    the functional tests on life-safety systems in the schedule so they cannot be
                    squeezed out. Consider whether the interval is justified by the evidence: HSE
                    guidance on maintaining portable electrical equipment applies exactly this
                    logic, noting that a low failure rate indicates the interval can be lengthened
                    and a high failure rate that it should be shortened.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Both failures come from the same root — a schedule that
              was never reviewed against evidence. PPM is not a document you write once; it is a
              programme you tune with the data your own records produce.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Choosing a Strategy</p>
                <ul className="space-y-0.5">
                  <li>Low consequence, quick to replace — documented run-to-failure</li>
                  <li>Wear-out failure mode — fixed-interval preventive</li>
                  <li>Usable condition indicator — condition-based</li>
                  <li>Critical plus gradual degradation — predictive, trend the data</li>
                  <li>Statutory or life-safety function — never deferred, 100% compliance</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Formulae</p>
                <ul className="space-y-0.5">
                  <li>MTBF = running time / number of failures</li>
                  <li>MTTR = repair time / number of repairs</li>
                  <li>Availability = MTBF / (MTBF + MTTR) x 100%</li>
                  <li>Compliance = completed on time / scheduled x 100%</li>
                  <li>Example: 2,400 h, 4 failures, 12 h repair = 600 h / 3 h / 99.5%</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Bathtub Curve</p>
                <ul className="space-y-0.5">
                  <li>Infant mortality — falling rate, defects and workmanship</li>
                  <li>Useful life — flat rate, failures largely random</li>
                  <li>Wear-out — rising rate, age-related mechanisms</li>
                  <li>Fixed intervals pay in wear-out, not in useful life</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">BS 7671 Reference Points</p>
                <ul className="space-y-0.5">
                  <li>Chapter 34 — maintainability; maintain without introducing danger</li>
                  <li>Reg 341.1 — assess frequency and quality of maintenance; consult duty holder</li>
                  <li>Reg 652.1 — factors determining periodic inspection frequency</li>
                  <li>Reg 514.12.2 — RCD notice, six-monthly user test-button instruction</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4.1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section1-2">
              Next: Maintenance Scheduling and Records
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule4Section1_1;
