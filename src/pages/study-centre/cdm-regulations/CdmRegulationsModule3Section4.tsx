import { ArrowLeft, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "notification-threshold",
    question:
      "Under Regulation 6 of CDM 2015, which of the following triggers a requirement to notify HSE?",
    options: [
      "Any project involving more than one contractor",
      "A project lasting more than 30 working days with more than 20 workers simultaneously, OR exceeding 500 person-days",
      "Every construction project regardless of size",
      "Only demolition projects lasting more than 14 days",
    ],
    correctIndex: 1,
    explanation:
      "Regulation 6 requires notification to HSE when a project is expected to last more than 30 working days AND have more than 20 workers working simultaneously at any point, OR exceed 500 person-days of construction work. Both thresholds are alternatives \u2014 exceeding either one triggers the duty to notify.",
  },
  {
    id: "f10-submission-duty",
    question: "Whose legal duty is it to ensure the F10 notification is submitted to HSE?",
    options: [
      "The principal contractor",
      "The principal designer",
      "The client",
      "The site manager",
    ],
    correctIndex: 2,
    explanation:
      "Under CDM 2015, the duty to notify HSE rests with the client. The client may arrange for the principal designer or principal contractor to submit the F10 on their behalf, but the legal responsibility remains with the client. If the F10 is not submitted, it is the client who is in breach of the Regulations.",
  },
  {
    id: "displaying-f10",
    question:
      "Under Regulation 6(3), where must the F10 notification (or a copy) be displayed on site?",
    options: [
      "Only in the principal contractor\u2019s head office",
      "In the site office or at the main entrance to the site, visible to workers",
      "It does not need to be displayed \u2014 only filed with HSE",
      "In the client\u2019s registered business premises",
    ],
    correctIndex: 1,
    explanation:
      "Regulation 6(3) requires that the F10 notification, or a copy of it, must be displayed in the construction site office or at the approach to the site (typically the main entrance) so that it is visible to every worker on the project. It must be kept up to date throughout the construction phase.",
  },
];

const faqs = [
  {
    question:
      "Does the 30-day / 20-worker threshold include weekends and bank holidays?",
    answer:
      "The threshold refers to 30 \u2018working days\u2019 rather than calendar days. A working day is any day on which construction work is carried out. If work takes place on a Saturday, that Saturday counts as a working day. Sundays and bank holidays only count if construction work actually takes place on those days. When calculating whether a project crosses the threshold, you must count every day on which any construction work is planned or expected to occur.",
  },
  {
    question:
      "Can the F10 be submitted after the construction phase has already started?",
    answer:
      "The Regulations require notification \u2018as soon as is practicable before the construction phase begins.\u2019 Ideally, the F10 should be submitted well before construction work starts on site. However, if circumstances change and a project crosses the notification threshold after work has commenced (for example, an extension to the programme or an increase in workforce), the F10 should be submitted as soon as the client becomes aware that the thresholds will be exceeded. Deliberate failure to notify is a criminal offence.",
  },
  {
    question:
      "Is there a fee for submitting the F10 notification to HSE?",
    answer:
      "No. Submission of the F10 notification is free of charge. It is submitted online through the HSE website. There is no charge for the initial submission or for any subsequent updates. The only costs associated with notification are the administrative time required to compile the information. Given that the information required is straightforward \u2014 project details, client details, principal designer and principal contractor details, planned dates and worker numbers \u2014 the process is not onerous.",
  },
  {
    question:
      "What happens if a client appoints a new principal contractor halfway through a notifiable project?",
    answer:
      "If the principal contractor changes during a notifiable project, the F10 must be updated to reflect the new appointment. The client is responsible for ensuring this update is submitted to HSE. The original F10 does not become invalid \u2014 it is amended rather than replaced. The updated notification should include the new principal contractor\u2019s details, and the copy displayed on site must also be updated. HSE uses this information to know who is responsible for managing the construction phase, so keeping it current is essential for both compliance and safety.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "A construction project is planned to last 35 working days with a peak of 15 workers on site at any one time. The total estimated person-days are 420. Does this project require notification to HSE?",
    options: [
      "Yes \u2014 it exceeds 30 working days",
      "No \u2014 it does not meet either threshold because it has fewer than 20 simultaneous workers and fewer than 500 person-days",
      "Yes \u2014 any project over 30 days must be notified regardless of workforce size",
      "No \u2014 notification is only required for demolition projects",
    ],
    correctAnswer: 1,
    explanation:
      "The project lasts more than 30 working days but will never have more than 20 workers simultaneously, so it does not meet the first threshold. The total person-days (420) are below 500, so it does not meet the second threshold either. Both conditions of the first threshold must be met (more than 30 days AND more than 20 simultaneous workers), and the 500 person-day alternative is not exceeded. Therefore, notification is not required.",
  },
  {
    id: 2,
    question:
      "Who has the legal duty under CDM 2015 to ensure the F10 notification is submitted to HSE?",
    options: [
      "The principal designer",
      "The principal contractor",
      "The client",
      "The CDM coordinator",
    ],
    correctAnswer: 2,
    explanation:
      "Under CDM 2015, the duty to notify HSE rests squarely with the client. Whilst the client may instruct the principal designer or principal contractor to complete and submit the F10 on their behalf, the legal responsibility remains with the client. The role of CDM coordinator no longer exists under CDM 2015 \u2014 it was replaced by the principal designer.",
  },
  {
    id: 3,
    question:
      "Which of the following is NOT a piece of information required on the F10 notification form?",
    options: [
      "The name and address of the client",
      "The name of the principal designer",
      "A detailed breakdown of the project budget",
      "The planned start date of the construction phase",
    ],
    correctAnswer: 2,
    explanation:
      "The F10 requires project details, client details, principal designer details, principal contractor details, the planned start date, expected duration, estimated peak number of workers, and a brief description of the work. It does NOT require financial information such as project budgets, contract values, or cost breakdowns. The form is about safety management, not financial management.",
  },
  {
    id: 4,
    question:
      "Under Regulation 6(3), where must the F10 notification be displayed?",
    options: [
      "Only in the client\u2019s head office",
      "In the construction site office or at the main entrance, visible to workers",
      "It only needs to be held electronically in the health and safety file",
      "At the nearest HSE regional office",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 6(3) requires the F10, or a copy, to be displayed in the site office or at the approach to the site so that it is visible to every worker. This ensures that all workers on the project can see that the project has been notified to HSE and can check the key details. The displayed copy must be kept up to date.",
  },
  {
    id: 5,
    question:
      "A project was originally planned to last 25 working days with 10 workers but has been extended to 40 working days with 25 workers at peak. What must the client do?",
    options: [
      "Nothing \u2014 notification was not required at the start, so it is not required now",
      "Submit an F10 notification to HSE as soon as practicable, because the project now exceeds the notification thresholds",
      "Wait until the project is complete and then notify HSE retrospectively",
      "Only notify HSE if there has been an accident on site",
    ],
    correctAnswer: 1,
    explanation:
      "When a project crosses the notification thresholds during its lifetime \u2014 whether due to programme extensions, increased workforce, or scope changes \u2014 the client must submit an F10 as soon as practicable. The duty to notify is not fixed at the start of the project; it applies whenever the thresholds are crossed. Retrospective notification after project completion would be a breach of the Regulations.",
  },
  {
    id: 6,
    question:
      "How does HSE primarily use the information submitted on F10 notifications?",
    options: [
      "To calculate the amount of tax owed by the client",
      "To target proactive inspections, gather sector intelligence, and plan resource allocation",
      "To approve or reject construction projects before they can proceed",
      "To issue building control certificates",
    ],
    correctAnswer: 1,
    explanation:
      "HSE uses F10 data to target proactive inspections (visiting sites where risks are likely to be highest), gather intelligence about the construction sector (types of work, locations, sizes of projects), and plan resource allocation (deploying inspectors where they are most needed). The F10 is NOT an approval process \u2014 submitting it does not mean HSE has approved the project, and HSE does not have the power to approve or reject construction projects.",
  },
  {
    id: 7,
    question:
      "What is the potential consequence for a client who fails to notify HSE of a notifiable project?",
    options: [
      "A verbal warning from the local authority",
      "A small administrative fine of \u00a3100",
      "Criminal prosecution by HSE, potentially resulting in an unlimited fine",
      "No consequence \u2014 notification is voluntary",
    ],
    correctAnswer: 2,
    explanation:
      "Failure to notify HSE of a notifiable project is a criminal offence under CDM 2015. HSE can prosecute the client, and the courts can impose an unlimited fine. In serious cases, particularly where the failure to notify is part of a wider pattern of non-compliance, individual directors or managers can also face personal prosecution. Enforcement notices (improvement or prohibition notices) may also be served.",
  },
  {
    id: 8,
    question:
      "A large development is being built in three separate phases over two years. How should notification be handled?",
    options: [
      "A single F10 covers all phases regardless of timing",
      "Each phase should be assessed individually against the notification thresholds, and separate F10 notifications submitted for each phase that qualifies",
      "Only the final phase needs to be notified because it is closest to completion",
      "Phased projects are exempt from notification requirements",
    ],
    correctAnswer: 1,
    explanation:
      "For phased projects, each phase should be assessed individually against the notification thresholds. If a phase meets the criteria (more than 30 working days with more than 20 simultaneous workers, or more than 500 person-days), it requires its own F10 notification. A single F10 may cover the entire project if all phases are managed as one continuous project, but where phases are distinct (different contractors, different timescales, significant gaps between phases), separate notifications are appropriate.",
  },
];

export default function CdmRegulationsModule3Section4() {
  useSEO({
    title:
      "Notification to HSE (F10) | CDM Regulations Module 3.4",
    description:
      "When notification to HSE is required under CDM 2015, the F10 form, who submits it, displaying and updating the notification, phased projects, HSE\u2019s use of F10 data, and penalties for non-notification.",
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
            <Link to="../cdm-regulations-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-400/20 border border-blue-500/30 mb-4">
            <FileText className="h-7 w-7 text-blue-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3 mx-auto">
            <span className="text-blue-500 text-xs font-semibold">
              MODULE 3 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Notification to HSE (F10)
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            When and how to notify the Health and Safety Executive about
            construction projects, the F10 form, and the consequences of failing
            to notify
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Threshold:</strong> &gt;30 working days with &gt;20
                simultaneous workers OR &gt;500 person-days
              </li>
              <li>
                <strong>Form:</strong> F10 &mdash; submitted online to HSE
              </li>
              <li>
                <strong>Duty holder:</strong> The client must ensure
                notification
              </li>
              <li>
                <strong>Regulation:</strong> CDM 2015, Regulation 6
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-400 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>F10 must be displayed</strong> in the site office or at
                the main entrance
              </li>
              <li>
                <strong>Keep it up to date</strong> &mdash; resubmit when
                details change
              </li>
              <li>
                <strong>Failure to notify</strong> is a criminal offence
              </li>
              <li>
                <strong>No fee</strong> &mdash; F10 submission is free of charge
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
              "Identify when a construction project requires notification to HSE under Regulation 6",
              "Describe the content and purpose of the F10 notification form",
              "Explain whose duty it is to submit the F10 and when it must be submitted",
              "State the legal requirements for displaying the F10 on site",
              "Outline when and how the F10 must be updated during a project",
              "Explain how phased projects are assessed against the notification thresholds",
              "Describe how HSE uses F10 data for inspection targeting and sector intelligence",
              "Identify the penalties for failing to notify HSE of a notifiable project",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-blue-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: When Is Notification Required? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">01</span>
            When Is Notification Required?
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Regulation 6 of the Construction (Design and Management) Regulations 2015</strong>{" "}
                requires that certain construction projects must be notified to
                the Health and Safety Executive (HSE) before the construction
                phase begins. The purpose of notification is to ensure HSE is
                aware of significant construction projects so it can plan
                inspections and allocate resources effectively.
              </p>

              <p>
                Not every construction project needs to be notified. The duty to
                notify only applies when a project crosses one of two specific
                thresholds. These thresholds are designed to capture larger,
                longer, or more complex projects where the risks to workers are
                greatest.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  The Two Notification Thresholds
                </p>
                <div className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-sm font-semibold text-blue-400 mb-2">
                      Threshold 1: Duration + Workforce
                    </p>
                    <p className="text-sm text-white/80">
                      The project is expected to last{" "}
                      <strong className="text-white">
                        more than 30 working days
                      </strong>{" "}
                      AND will have{" "}
                      <strong className="text-white">
                        more than 20 workers working simultaneously
                      </strong>{" "}
                      at any point during the project. Both conditions must be
                      met &mdash; 30 days alone is not enough; there must also
                      be more than 20 simultaneous workers.
                    </p>
                  </div>
                  <div className="text-center text-white/40 text-sm font-medium">
                    OR
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-sm font-semibold text-blue-400 mb-2">
                      Threshold 2: Person-Days
                    </p>
                    <p className="text-sm text-white/80">
                      The project exceeds{" "}
                      <strong className="text-white">500 person-days</strong> of
                      construction work. A person-day is one person working for
                      one working day. For example, 10 workers working for 50
                      days = 500 person-days. This threshold captures projects
                      that may not have large numbers of simultaneous workers but
                      involve significant total labour.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                If <strong>either</strong> threshold is expected to be exceeded,
                the project is notifiable and the client must ensure that an F10
                notification is submitted to HSE. The notification must be
                submitted{" "}
                <strong>
                  as soon as is practicable before the construction phase begins
                </strong>
                . Waiting until work has started, or failing to notify at all, is
                a breach of the Regulations.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-500">Key Point:</strong>{" "}
                  The thresholds are based on{" "}
                  <strong>planned or expected</strong> figures, not actual
                  figures. If a project is expected to exceed the thresholds at
                  the planning stage, it must be notified before work begins
                  &mdash; even if the actual numbers later turn out to be lower.
                  Conversely, if a project crosses the thresholds unexpectedly
                  during work, notification must be made as soon as the client
                  becomes aware.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Common Mistake
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  A common error is assuming that the 30-day threshold alone
                  triggers notification. It does not. The first threshold
                  requires{" "}
                  <strong>both</strong> conditions to be met: more than 30
                  working days <strong>AND</strong> more than 20 simultaneous
                  workers. A project lasting 50 working days with only 10
                  workers at peak does not meet this threshold. However, always
                  check the 500 person-day threshold as well &mdash; the same
                  project may still be notifiable if total person-days exceed
                  500.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The F10 Form */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">02</span>
            The F10 Form
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>F10</strong> is the official notification form used
                to inform HSE about a notifiable construction project. It is
                submitted <strong>online</strong> through the HSE website.
                There is no paper version &mdash; all F10 notifications must
                be submitted electronically.
              </p>

              <p>
                The form is straightforward and collects the essential
                information HSE needs to understand the nature, scale, and
                duration of the project, and to identify the key duty holders
                responsible for managing health and safety.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Information Required on the F10
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Project details</strong>{" "}
                      &mdash; the address or location of the construction site
                      and a brief description of the project
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Client details</strong>{" "}
                      &mdash; name and address of the client (the person or
                      organisation for whom the project is being carried out)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Principal designer (PD) details
                      </strong>{" "}
                      &mdash; name, address, and contact details of the
                      appointed principal designer
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Principal contractor (PC) details
                      </strong>{" "}
                      &mdash; name, address, and contact details of the
                      appointed principal contractor
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Planned start date
                      </strong>{" "}
                      &mdash; the date the construction phase is expected to
                      begin
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Expected duration</strong>{" "}
                      &mdash; how long the construction phase is planned to last
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Estimated peak number of workers
                      </strong>{" "}
                      &mdash; the maximum number of workers expected on site at
                      any one time
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Brief description of the work
                      </strong>{" "}
                      &mdash; a short summary of the nature of the construction
                      work being undertaken
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-500">Important:</strong> The F10
                  does NOT require detailed construction phase plans, method
                  statements, risk assessments, or financial information. It is
                  a notification, not an application for approval. HSE does not
                  approve or reject construction projects based on the F10
                  &mdash; it simply records the information for inspection
                  planning purposes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Notification Threshold Decision Flowchart */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">&mdash;</span>
            Notification Threshold Decision Flowchart
          </h2>
          <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[320px] space-y-4">
              {/* Start Node */}
              <div className="flex justify-center">
                <div className="bg-blue-500/20 border-2 border-blue-500/50 rounded-xl px-5 py-3 text-center">
                  <p className="text-sm font-semibold text-blue-400">START</p>
                  <p className="text-white text-sm font-medium mt-1">
                    Is it a construction project under CDM 2015?
                  </p>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center gap-16 sm:gap-24">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-blue-500/40" />
                  <span className="text-xs font-bold text-red-400 mb-1">NO</span>
                  <div className="w-0.5 h-4 bg-blue-500/40" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-blue-500/40" />
                  <span className="text-xs font-bold text-green-400 mb-1">YES</span>
                  <div className="w-0.5 h-4 bg-blue-500/40" />
                </div>
              </div>

              {/* Two Branch Row */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs font-medium text-green-400 mb-1">NO NOTIFICATION</p>
                  <p className="text-white/80 text-xs sm:text-sm">
                    CDM 2015 does not apply &mdash; notification not required
                  </p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs font-medium text-blue-400 mb-1">CHECK THRESHOLD 1</p>
                  <p className="text-white text-xs sm:text-sm font-medium">
                    &gt;30 working days AND &gt;20 simultaneous workers?
                  </p>
                </div>
              </div>

              {/* Arrow from Threshold 1 */}
              <div className="flex justify-end pr-[25%]">
                <div className="flex gap-12 sm:gap-20">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-blue-500/40" />
                    <span className="text-xs font-bold text-green-400 mb-1">YES</span>
                    <div className="w-0.5 h-4 bg-blue-500/40" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-blue-500/40" />
                    <span className="text-xs font-bold text-red-400 mb-1">NO</span>
                    <div className="w-0.5 h-4 bg-blue-500/40" />
                  </div>
                </div>
              </div>

              {/* Threshold 1 YES/NO Branches */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div />
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                    <p className="text-xs font-bold text-red-400 mb-1">NOTIFIABLE</p>
                    <p className="text-white text-xs sm:text-sm font-medium">
                      Submit F10 to HSE before construction begins
                    </p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                    <p className="text-xs font-medium text-blue-400 mb-1">CHECK THRESHOLD 2</p>
                    <p className="text-white text-xs sm:text-sm font-medium">
                      &gt;500 person-days?
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow from Threshold 2 */}
              <div className="flex justify-end pr-[12%]">
                <div className="flex gap-12 sm:gap-20">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-blue-500/40" />
                    <span className="text-xs font-bold text-green-400 mb-1">YES</span>
                    <div className="w-0.5 h-4 bg-blue-500/40" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-blue-500/40" />
                    <span className="text-xs font-bold text-red-400 mb-1">NO</span>
                    <div className="w-0.5 h-4 bg-blue-500/40" />
                  </div>
                </div>
              </div>

              {/* Final outcomes */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div />
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                    <p className="text-xs font-bold text-red-400 mb-1">NOTIFIABLE</p>
                    <p className="text-white text-xs sm:text-sm font-medium">
                      Submit F10 to HSE before construction begins
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                    <p className="text-xs font-medium text-green-400 mb-1">NOT NOTIFIABLE</p>
                    <p className="text-white/80 text-xs sm:text-sm">
                      No F10 required (CDM still applies for other duties)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Who Submits the F10? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">03</span>
            Who Submits the F10?
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Under CDM 2015, the <strong>legal duty to notify HSE</strong>{" "}
                rests with the <strong>client</strong>. The client is the person
                or organisation for whom the construction project is being
                carried out. This is a non-delegable duty &mdash; even if
                someone else physically submits the form, the client remains
                legally responsible for ensuring it is done.
              </p>

              <p>
                In practice, the client often instructs the{" "}
                <strong>principal designer (PD)</strong> or the{" "}
                <strong>principal contractor (PC)</strong> to complete and submit
                the F10 on their behalf. This is perfectly acceptable, and indeed
                common, but it does not transfer the legal responsibility. If the
                F10 is not submitted, it is the <strong>client</strong> who is in
                breach of Regulation 6 &mdash; not the PD or PC.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Timing of Submission
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      The F10 must be submitted{" "}
                      <strong className="text-white">
                        as soon as is practicable before the construction phase
                        begins
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      There is no specific number of days or weeks required
                      &mdash; the test is{" "}
                      <strong className="text-white">
                        &ldquo;as soon as is practicable&rdquo;
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      In practice, submission should happen once the key details
                      are known (client, PD, PC, planned dates, workforce
                      estimates) and{" "}
                      <strong className="text-white">
                        before any construction work starts on site
                      </strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      If a PD or PC has not yet been appointed at the time of
                      notification, the F10 can be submitted with this
                      information to follow, and{" "}
                      <strong className="text-white">
                        updated once appointments are made
                      </strong>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Domestic Clients
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  For <strong>domestic clients</strong> (homeowners having work
                  done on their own home), the duty to notify HSE transfers to
                  the <strong>principal contractor</strong> (or the contractor on
                  single-contractor projects). This is because domestic clients
                  cannot reasonably be expected to understand CDM duties. The
                  contractor effectively takes on the client&rsquo;s notification
                  responsibilities for domestic projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Displaying the Notification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">04</span>
            Displaying the Notification
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Regulation 6(3)</strong> requires that the F10
                notification, or a copy of it, must be{" "}
                <strong>
                  displayed in a readable condition in a position where it can
                  be read by every worker engaged in the construction work
                </strong>
                . This is not optional &mdash; it is a specific legal
                requirement with a clear purpose.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Display Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Location:</strong> The F10
                      or a copy must be displayed in the{" "}
                      <strong className="text-white">
                        site office or at the main entrance/approach
                      </strong>{" "}
                      to the construction site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Condition:</strong> It must
                      be in a <strong className="text-white">readable condition</strong>{" "}
                      &mdash; legible, not faded, torn, or obscured
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Visibility:</strong> Every
                      worker on the project must be able to see and read it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Currency:</strong> The
                      displayed copy must be{" "}
                      <strong className="text-white">kept up to date</strong>{" "}
                      &mdash; if the F10 is amended, the displayed copy must be
                      replaced with the updated version
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The purpose of displaying the F10 is transparency. It tells
                every worker on site that the project has been notified to HSE,
                who the client is, who the principal designer and principal
                contractor are, and the basic details of the project. This
                information empowers workers to raise concerns through the
                correct channels and to verify that the project is being managed
                in accordance with CDM 2015.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-500">
                    Practical Tip for Electricians:
                  </strong>{" "}
                  When you arrive on a notifiable construction site, check
                  whether the F10 is displayed. If you cannot find it, this may
                  indicate that the project has not been notified to HSE, or
                  that the site management is not meeting its CDM obligations.
                  You are entitled to ask to see the F10, and its absence should
                  prompt you to raise a concern with your supervisor or the
                  principal contractor.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Updating the F10 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">05</span>
            Updating the F10
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The F10 is not a &ldquo;submit and forget&rdquo; document. When
                key details of the project change, the notification must be{" "}
                <strong>updated</strong> to reflect the current position. The
                duty to ensure the F10 is kept up to date rests with the{" "}
                <strong>client</strong>, although in practice the principal
                contractor or principal designer often manages the update
                process.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  When Must the F10 Be Updated?
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Change of principal contractor
                      </strong>{" "}
                      &mdash; if the PC is replaced or a new one is appointed,
                      the F10 must be updated with the new PC&rsquo;s details
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Change of principal designer
                      </strong>{" "}
                      &mdash; similarly, a new PD appointment requires an update
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Extended duration
                      </strong>{" "}
                      &mdash; if the construction phase is expected to last
                      significantly longer than originally notified
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Significant increase in workforce
                      </strong>{" "}
                      &mdash; if peak worker numbers increase substantially
                      beyond the original estimate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Change of client details
                      </strong>{" "}
                      &mdash; if the client changes (for example, a property
                      sale during construction)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Significant change to the nature of the work
                      </strong>{" "}
                      &mdash; for example, if the scope changes from
                      refurbishment to demolition and rebuild
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Updates are submitted through the same HSE online system used
                for the original notification. The updated F10 replaces the
                previous version, and the copy displayed on site must also be
                replaced with the updated version. There is no charge for
                submitting updates.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-500">Key Point:</strong>{" "}
                  Keeping the F10 up to date is not merely good practice &mdash;
                  it is a legal requirement. An outdated F10 that lists a
                  principal contractor who is no longer on the project, or a
                  duration that has long been exceeded, undermines the purpose
                  of the notification system and could result in enforcement
                  action.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Projects Involving Multiple Phases */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">06</span>
            Projects Involving Multiple Phases
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Large construction developments are frequently delivered in{" "}
                <strong>phases</strong> &mdash; for example, a housing estate
                built in three stages, or a commercial development where the
                shell is completed first and the fit-out follows later. The
                question of how to handle notification for phased projects is
                one of the most common areas of confusion under CDM 2015.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Key Principles for Phased Projects
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Single project:</strong>{" "}
                      If all phases are managed as one continuous project under
                      the same client, PD, and PC, a single F10 may cover the
                      entire project &mdash; assessed against the thresholds as
                      a whole
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Separate projects:
                      </strong>{" "}
                      If phases involve different contractors, different
                      timescales, or significant gaps between phases, each phase
                      should be assessed individually against the notification
                      thresholds
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Linked projects:</strong>{" "}
                      Where projects on the same site are linked (sharing
                      access, welfare, or management arrangements), consider
                      whether they should be treated as one project for
                      notification purposes
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  When Does One Project Become Two?
                </p>
                <p className="text-sm text-white/80 mb-3">
                  There is no rigid rule, but HSE considers the following
                  factors when determining whether phases constitute a single
                  project or separate projects:
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-blue-400 font-medium uppercase tracking-wide mb-2">
                      Suggests One Project
                    </p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Same client throughout</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Same PD and PC throughout</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Continuous or overlapping phases</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Shared welfare and site management</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-red-400 font-medium uppercase tracking-wide mb-2">
                      Suggests Separate Projects
                    </p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Different clients for each phase</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Different PCs appointed for each phase</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Significant time gap between phases</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Separate contracts and management structures</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Avoiding Artificial Splitting
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Clients must not artificially split a project into phases to
                  avoid the notification thresholds. If a development is
                  clearly one project but is divided into phases solely to keep
                  each phase below the notification thresholds, HSE will treat
                  it as a single project. This would be viewed as a deliberate
                  attempt to circumvent the Regulations and could result in
                  enforcement action.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* F10 Form Content Summary Visual */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">&mdash;</span>
            F10 Form Content Summary
          </h2>
          <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4 sm:p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Project Details */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500/30 to-blue-400/20 border-b border-blue-500/30 px-4 py-2.5">
                  <p className="text-blue-400 font-semibold text-sm">Project</p>
                </div>
                <div className="p-3 space-y-2 text-xs text-white/80">
                  <p>&bull; Site address / location</p>
                  <p>&bull; Brief description of work</p>
                  <p>&bull; Planned start date</p>
                  <p>&bull; Expected duration</p>
                </div>
              </div>

              {/* People */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500/30 to-blue-400/20 border-b border-blue-500/30 px-4 py-2.5">
                  <p className="text-blue-400 font-semibold text-sm">People</p>
                </div>
                <div className="p-3 space-y-2 text-xs text-white/80">
                  <p>&bull; Client name &amp; address</p>
                  <p>&bull; Principal designer details</p>
                  <p>&bull; Principal contractor details</p>
                  <p>&bull; Contact information for each</p>
                </div>
              </div>

              {/* Workforce */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500/30 to-blue-400/20 border-b border-blue-500/30 px-4 py-2.5">
                  <p className="text-blue-400 font-semibold text-sm">Workforce</p>
                </div>
                <div className="p-3 space-y-2 text-xs text-white/80">
                  <p>&bull; Estimated peak workers</p>
                  <p>&bull; Number of contractors</p>
                  <p>&bull; Total planned person-days</p>
                </div>
              </div>

              {/* Not Required */}
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-white/10 to-white/5 border-b border-white/10 px-4 py-2.5">
                  <p className="text-white/50 font-semibold text-sm">NOT Required</p>
                </div>
                <div className="p-3 space-y-2 text-xs text-white/50">
                  <p>&bull; Budget / cost information</p>
                  <p>&bull; Detailed method statements</p>
                  <p>&bull; Risk assessments</p>
                  <p>&bull; Construction phase plan</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: HSE's Use of F10 Data */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">07</span>
            HSE&rsquo;s Use of F10 Data
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The F10 notification is not simply filed away and forgotten.
                HSE <strong>actively uses</strong> the data submitted on F10
                notifications to inform its regulatory activities. Understanding
                how HSE uses this information helps explain why accurate and
                timely notification matters.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  How HSE Uses F10 Data
                </p>
                <div className="space-y-3">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-blue-400 mb-1">
                      Targeting Proactive Inspections
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      HSE uses F10 data to identify construction sites for
                      proactive inspection. Larger projects, higher-risk work
                      types (demolition, refurbishment, work at height), and
                      projects involving known higher-risk activities are more
                      likely to receive a visit. Without the F10, HSE would not
                      know the site exists.
                    </p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-blue-400 mb-1">
                      Sector Intelligence
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      F10 data provides HSE with a picture of construction
                      activity across Great Britain &mdash; the types of
                      projects being undertaken, where they are located, the
                      size of the workforce, and the duration of work. This
                      intelligence helps HSE understand trends and identify
                      emerging risks in the construction sector.
                    </p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-blue-400 mb-1">
                      Resource Planning
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      HSE deploys its inspectors based on where the risks are
                      greatest. F10 data helps HSE allocate inspectors to
                      regions and sectors where construction activity is highest
                      or where specific risks have been identified. Without
                      notification data, resource planning would be based on
                      guesswork.
                    </p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-blue-400 mb-1">
                      Construction Statistics
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      F10 data contributes to national construction statistics
                      &mdash; the number of notifiable projects, total
                      workforce numbers, the geographical spread of
                      construction activity, and trends over time. These
                      statistics inform policy decisions and help justify
                      regulatory interventions.
                    </p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-blue-400 mb-1">
                      Proactive Inspection Programmes
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      HSE runs themed inspection programmes targeting specific
                      risks (for example, work at height, structural collapse,
                      or occupational health). F10 data helps HSE identify
                      which sites are most relevant to each programme and plan
                      inspection campaigns accordingly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-500">Key Point:</strong>{" "}
                  Submitting an F10 does <strong>not</strong> mean HSE has
                  approved the project or reviewed the health and safety
                  arrangements. The F10 is a notification, not an application.
                  HSE does not issue approvals or permits for construction
                  projects. The responsibility for managing health and safety
                  remains entirely with the duty holders (client, PD, PC, and
                  contractors).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Penalties for Non-Notification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">08</span>
            Penalties for Non-Notification
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Failure to notify HSE of a notifiable project is a{" "}
                <strong>criminal offence</strong> under the Construction (Design
                and Management) Regulations 2015. It is not a civil matter or
                an administrative oversight &mdash; it is a breach of health and
                safety law that can result in prosecution, fines, and
                enforcement action.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  Enforcement and Penalties
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Criminal prosecution:
                      </strong>{" "}
                      HSE can prosecute the client (or the contractor for
                      domestic projects) for failing to notify. Prosecution is
                      brought under the Health and Safety at Work etc. Act 1974
                      for breach of the CDM Regulations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Unlimited fines:</strong>{" "}
                      The courts can impose an{" "}
                      <strong className="text-white">unlimited fine</strong> for
                      non-notification. The level of fine depends on the
                      seriousness of the offence, the size and turnover of the
                      organisation, and any aggravating factors
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Personal prosecution:
                      </strong>{" "}
                      In serious cases, individual directors, managers, or
                      company officers can be personally prosecuted if the
                      failure to notify was due to their consent, connivance, or
                      neglect
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Improvement notices:
                      </strong>{" "}
                      HSE can serve an improvement notice requiring the client
                      to submit the F10 within a specified period
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Prohibition notices:
                      </strong>{" "}
                      In more serious cases, HSE can serve a prohibition notice
                      stopping work on site until the breach is rectified
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">
                  How HSE Discovers Non-Compliance
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Proactive inspections:
                      </strong>{" "}
                      HSE inspectors visit construction sites as part of their
                      routine work. If they visit a site that should have been
                      notified but was not, this will be identified immediately
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reactive investigations:
                      </strong>{" "}
                      If an accident or dangerous occurrence happens on a site
                      that should have been notified, the failure to notify will
                      be discovered during the investigation and will be treated
                      as an aggravating factor
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Worker complaints:
                      </strong>{" "}
                      Workers, trade unions, or members of the public can report
                      concerns to HSE, including the absence of an F10 on a
                      large construction site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cross-referencing data:
                      </strong>{" "}
                      HSE may cross-reference planning applications, building
                      control notifications, and other public records against
                      its F10 database to identify projects that should have
                      been notified
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Non-Notification as an Aggravating Factor
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If an accident occurs on a site that should have been notified
                  but was not, the failure to notify is treated as an{" "}
                  <strong>aggravating factor</strong> in any subsequent
                  prosecution. The courts take a dim view of duty holders who
                  have failed to comply with basic regulatory requirements,
                  and the failure to notify suggests a wider disregard for
                  health and safety obligations. This typically results in a
                  significantly higher fine.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-500">
                    Bottom Line for Electricians:
                  </strong>{" "}
                  You will rarely be the person responsible for submitting the
                  F10 &mdash; that is the client&rsquo;s duty. However, you
                  should understand the notification requirements so you can
                  recognise when a project should have been notified. If you
                  are working on a large construction site and there is no F10
                  displayed, this is a red flag. It may mean that CDM duties
                  are not being properly managed, which could affect your
                  safety. Raise the concern with your supervisor or the
                  principal contractor.
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-3-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-4">
              Next: Module 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
