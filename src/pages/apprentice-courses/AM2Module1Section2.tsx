import { Clock, CheckCircle, Target, Zap, FileText, Settings, AlertTriangle, BookOpen } from "lucide-react";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import useSEO from "@/hooks/useSEO";

const AM2Module1Section2 = () => {
  useSEO(
    "Structure and Timings of the AM2 Assessment - AM2 Module 1 Section 2",
    "Detailed breakdown of the AM2 assessment structure, timings, and time management strategies for successful completion"
  );

  const assessmentStats = [
    {
      number: "5",
      label: "Assessment Sections",
      description: "Five main sections (A-E) testing different skills"
    },
    {
      number: "~16.5",
      label: "Total Hours",
      description: "Spread across 2.5 days"
    },
    {
      number: "8.5",
      label: "Installation Hours",
      description: "Largest section of the assessment"
    },
    {
      number: "45",
      label: "Minutes for Isolation",
      description: "Critical safety assessment"
    }
  ];

  const assessmentSections = [
    {
      section: "A (A1-A5)",
      title: "Composite Installation",
      duration: "8.5 hours",
      description: "Install and terminate circuits including ring finals, lighting, three-phase distribution, data cabling, protective bonding, and heating controls. Split into sub-tasks A1-A5 covering different installation elements.",
      icon: Settings,
      color: "text-elec-yellow"
    },
    {
      section: "B",
      title: "Inspection, Testing & Certification",
      duration: "3.5 hours",
      description: "Complete testing suite: continuity, insulation resistance, polarity, earth fault loop impedance, RCD testing, and certification paperwork.",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      section: "C",
      title: "Safe Isolation of Circuits",
      duration: "45 minutes",
      description: "Isolate different circuit types in specific scenarios - single-phase equipment, three-phase isolators, distribution board isolation.",
      icon: Zap,
      color: "text-elec-yellow"
    },
    {
      section: "D",
      title: "Fault Diagnosis & Rectification",
      duration: "2 hours",
      description: "Find pre-programmed faults, identify fault types, explain corrections, and rectify with retesting. Logic over guessing.",
      icon: Target,
      color: "text-elec-yellow"
    },
    {
      section: "E",
      title: "Assessment of Applied Knowledge",
      duration: "1 hour",
      description: "Online multiple-choice exam covering health & safety, BS 7671 Wiring Regulations, building regulations, and safe practices.",
      icon: BookOpen,
      color: "text-indigo-500"
    }
  ];

  const timeManagementTips = [
    {
      title: "Plan Before You Touch Anything",
      description: "Spend five minutes mapping your work sequence. This saves hours later.",
      icon: Clock
    },
    {
      title: "Don't Chase Speed",
      description: "Assessors want safe, competent work. Rushing creates costly mistakes.",
      icon: Target
    },
    {
      title: "Prioritise Safety Steps",
      description: "Failing isolation or forgetting lockout can mean immediate failure.",
      icon: AlertTriangle
    },
    {
      title: "Leave Time for Paperwork",
      description: "Incomplete or incorrect test sheets will lose you marks.",
      icon: FileText
    }
  ];

  const checklistItems = [
    "The AM2 is divided into five main sections (A-E), totalling about ~16.5 hours",
    "Installation is the largest part (8.5 hours) - plan carefully and pace yourself",
    "Safe isolation tasks are short but crucial; failure here is often automatic",
    "Testing and certification is 3.5 hours - don't underestimate paperwork time",
    "Fault diagnosis is about logic, not luck - work step by step",
    "The online knowledge test lasts 1 hour with multiple-choice questions",
    "Safety, accuracy, and neatness always score higher than speed"
  ];

  return (
    <AM2SectionLayout
      backHref="/study-centre/apprentice/am2/module1"
      breadcrumbs={["AM2", "Module 1", "Section 2"]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={Clock}
        title="Structure and Timings of the Assessment"
        description="One of the main challenges of the AM2 is not just completing the tasks but doing them within the strict time limits. Understanding the structure and timings before you walk in gives you a huge advantage."
        badge="Module 1 - Section 2"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {assessmentStats.map((stat, index) => (
          <AM2ContentCard key={index} className="text-center">
            <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">
              {stat.number}
            </div>
            <div className="text-ios-footnote font-semibold text-white mb-1">
              {stat.label}
            </div>
            <div className="text-ios-footnote text-white/70">
              {stat.description}
            </div>
          </AM2ContentCard>
        ))}
      </div>

      {/* Assessment Structure */}
      <AM2ContentCard accent>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">
          How the AM2 Is Structured
        </h2>
        <p className="text-ios-body text-white/90 mb-6">
          The AM2 is divided into five main sections (A through E). Each section tests a different set of skills,
          but together they prove you are safe, competent, and ready for industry.
        </p>

        <div className="space-y-4">
          {assessmentSections.map((section, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30">
                    <section.icon className={`w-6 h-6 ${section.color}`} />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-ios-headline font-semibold text-white">
                      {section.section} - {section.title}
                    </h3>
                    <span className="text-ios-callout font-medium text-elec-yellow mt-1 sm:mt-0">
                      {section.duration}
                    </span>
                  </div>
                  <p className="text-ios-callout text-white/80 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AM2ContentCard>

      {/* Total Time */}
      <AM2ContentCard>
        <h3 className="text-ios-headline font-semibold text-white mb-3">
          Total Time
        </h3>
        <p className="text-ios-body text-white/90">
          The overall duration of the AM2 is around <span className="text-elec-yellow font-semibold">~16.5 hours</span>,
          normally spread across <span className="text-elec-yellow font-semibold">two and a half days</span>.
          Some centres allow short breaks between sections, but you should be prepared for long sessions of focused work.
        </p>
      </AM2ContentCard>

      {/* Time Management Tips */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-4">
          Time Management Tips
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {timeManagementTips.map((tip, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <tip.icon className="w-5 h-5 text-elec-yellow mt-0.5" />
                </div>
                <div>
                  <h3 className="text-ios-headline font-semibold text-white mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-ios-callout text-white/80">
                    {tip.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AM2ContentCard>

      {/* Additional Time Management Strategies */}
      <AM2ContentCard>
        <h3 className="text-ios-headline font-semibold text-white mb-4">
          Additional Time Management Strategies
        </h3>
        <div className="space-y-4">
          <p className="text-ios-body text-white/90">
            <span className="text-elec-yellow font-semibold">Treat each section as a reset.</span> If one task doesn't go perfectly,
            don't carry the stress into the next. The AM2 is marked section by section, not on overall impression.
          </p>
          <p className="text-ios-body text-white/90">
            <span className="text-elec-yellow font-semibold">Practice under time pressure.</span> During your preparation,
            time yourself on practice tasks to get used to working efficiently under pressure.
          </p>
          <p className="text-ios-body text-white/90">
            <span className="text-elec-yellow font-semibold">Know your weak areas.</span> Spend extra time practicing
            the sections you find most challenging, but don't neglect the areas you're confident in.
          </p>
        </div>
      </AM2ContentCard>

      {/* Assessment Day Schedule */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-4">
          Typical Assessment Schedule
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-ios-headline font-semibold text-white mb-3">
              Day 1 (6-7 hours)
            </h3>
            <ul className="space-y-2 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Installation Work begins (6-7 hours)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Break periods as centre allows</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-ios-headline font-semibold text-white mb-3">
              Day 2 (6-7 hours)
            </h3>
            <ul className="space-y-2 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Continue Installation Work (2.5-3.5 hours)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Begin Testing & Certification (3.5 hours)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Complete paperwork</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-ios-headline font-semibold text-white mb-3">
              Day 3 (3-4 hours)
            </h3>
            <ul className="space-y-2 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Safe Isolation of Circuits (45 min)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Fault Diagnosis (2 hours)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Online Knowledge Test (1 hour)</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Common Time Wasters */}
      <AM2ContentCard>
        <h3 className="text-ios-headline font-semibold text-white mb-4">
          Common Time Wasters to Avoid
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-ios-callout mb-1">Poor Planning</h4>
                <p className="text-ios-footnote text-white/70">Not reading the entire brief before starting work</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-ios-callout mb-1">Tool Organisation</h4>
                <p className="text-ios-footnote text-white/70">Wasting time looking for tools or components</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-ios-callout mb-1">Measurement Errors</h4>
                <p className="text-ios-footnote text-white/70">Having to re-run cables due to incorrect measurements</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-ios-callout mb-1">Perfectionism</h4>
                <p className="text-ios-footnote text-white/70">Spending too long on cosmetic improvements</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-ios-callout mb-1">Test Equipment Issues</h4>
                <p className="text-ios-footnote text-white/70">Not checking equipment functionality beforehand</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-ios-callout mb-1">Paperwork Panic</h4>
                <p className="text-ios-footnote text-white/70">Leaving insufficient time for test certificates</p>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Preparation Focus Areas */}
      <AM2ContentCard>
        <h3 className="text-ios-headline font-semibold text-white mb-4">
          How to Prepare for Time Management
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-elec-yellow text-ios-callout mb-2">Practice with Realistic Timings</h4>
            <p className="text-ios-body text-white/90">
              Set yourself challenges during training: "Can I complete this ring final in 45 minutes?"
              Time yourself regularly to build realistic expectations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-elec-yellow text-ios-callout mb-2">Master Your Test Equipment</h4>
            <p className="text-ios-body text-white/90">
              Know exactly which buttons to press and in what sequence. Practice until testing procedures become automatic.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-elec-yellow text-ios-callout mb-2">Memorise Key Calculations</h4>
            <p className="text-ios-body text-white/90">
              Know cable length calculations, volt drop formulas, and certification requirements by heart.
              No time to look these up during the assessment.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-elec-yellow text-ios-callout mb-2">Develop Work Sequences</h4>
            <p className="text-ios-body text-white/90">
              Create standard approaches for common tasks. Always do risk assessment, isolation,
              installation, testing, and certification in that order.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Tips and Checklist */}
      <AM2ContentCard>
        <h3 className="text-ios-headline font-semibold text-white mb-4">
          Tips and Checklist
        </h3>
        <div className="space-y-3">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-ios-body text-white/90">
                {item}
              </span>
            </div>
          ))}
        </div>
      </AM2ContentCard>

      {/* Navigation Footer */}
      <AM2NavigationFooter
        prevHref="../section1"
        prevLabel="Purpose of AM2"
        nextHref="../section3"
        nextLabel="Marking Criteria"
        currentSection={2}
        totalSections={4}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module1Section2;
