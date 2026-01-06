import { ArrowLeft, ArrowRight, Clock, CheckCircle, Target, Zap, FileText, Settings, AlertTriangle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const AM2Module1Section2 = () => {
  useSEO(
    "Structure and Timings of the AM2 Assessment - AM2 Module 1 Section 2",
    "Detailed breakdown of the AM2 assessment structure, timings, and time management strategies for successful completion"
  );

  const assessmentStats = [
    {
      number: "6",
      label: "Assessment Sections",
      description: "Six distinct parts testing different skills"
    },
    {
      number: "16.25",
      label: "Total Hours",
      description: "Spread across 2½ days"
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
      section: "A1",
      title: "Safe Isolation & Risk Assessment",
      duration: "45 minutes",
      description: "Demonstrate risk assessment and correct circuit isolation procedures. Assessors are strict - shortcuts can lead to immediate failure.",
      icon: AlertTriangle,
      color: "text-elec-yellow"
    },
    {
      section: "A2-A5",
      title: "Composite Installation",
      duration: "8.5 hours",
      description: "Install and terminate circuits including ring finals, lighting, three-phase distribution, data cabling, protective bonding, and heating controls.",
      icon: Settings,
      color: "text-elec-yellow"
    },
    {
      section: "C",
      title: "Inspection, Testing & Certification",
      duration: "3.5 hours",
      description: "Complete testing suite: continuity, insulation resistance, polarity, earth fault loop impedance, RCD testing, and certification paperwork.",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      section: "D",
      title: "Safe Isolation of Circuits",
      duration: "30 minutes",
      description: "Isolate different circuit types in specific scenarios - single-phase equipment, three-phase isolators, distribution board isolation.",
      icon: Zap,
      color: "text-elec-yellow"
    },
    {
      section: "E",
      title: "Fault Diagnosis & Rectification",
      duration: "2 hours",
      description: "Find pre-programmed faults, identify fault types, explain corrections, and rectify with retesting. Logic over guessing.",
      icon: Target,
      color: "text-elec-yellow"
    },
    {
      section: "F",
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
    "The AM2 is divided into six main sections, totalling about 16.25 hours",
    "Installation is the largest part (8.5 hours) — plan carefully and pace yourself",
    "Safe isolation tasks are short but crucial; failure here is often automatic",
    "Testing and certification is 3.5 hours — don't underestimate paperwork time",
    "Fault diagnosis is about logic, not luck — work step by step",
    "The online knowledge test lasts 1 hour with multiple-choice questions",
    "Safety, accuracy, and neatness always score higher than speed"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-0 self-start" asChild>
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 1
              </Link>
            </Button>
            <Button variant="outline" className="self-start sm:self-auto" asChild>
              <Link to="../section3">
                Continue to Section 3
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
            Section 2: Structure and Timings of the Assessment
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl leading-relaxed">
            One of the main challenges of the AM2 is not just completing the tasks but doing them within 
            the strict time limits. Understanding the structure and timings before you walk in gives you 
            a huge advantage.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {assessmentStats.map((stat, index) => (
            <Card key={index} className="bg-card border-elec-yellow/30 p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-elec-yellow mb-2">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base font-semibold text-foreground mb-1 sm:mb-2">
                {stat.label}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {stat.description}
              </div>
            </Card>
          ))}
        </div>

        {/* Assessment Structure */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
            How the AM2 Is Structured
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-4xl">
            The AM2 is divided into six main parts. Each section tests a different set of skills, 
            but together they prove you are safe, competent, and ready for industry.
          </p>
          
          <div className="grid gap-4 sm:gap-6">
            {assessmentSections.map((section, index) => (
              <Card key={index} className="bg-card border-elec-yellow/30 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-card/50 border border-elec-yellow/30">
                      <section.icon className={`w-6 h-6 ${section.color}`} />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3">
                      <h3 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground">
                        {section.section} - {section.title}
                      </h3>
                      <span className="text-sm sm:text-base font-medium text-elec-yellow mt-1 sm:mt-0">
                        {section.duration}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Total Time */}
        <Card className="bg-card border-elec-yellow/30 p-4 sm:p-6 mb-8 sm:mb-12">
          <h3 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
            Total Time
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground">
            The overall duration of the AM2 is around <span className="text-elec-yellow font-semibold">16.25 hours</span>, 
            normally spread across <span className="text-elec-yellow font-semibold">two and a half days</span>. 
            Some centres allow short breaks between sections, but you should be prepared for long sessions of focused work.
          </p>
        </Card>

        {/* Time Management Tips */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
            Time Management Tips
          </h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {timeManagementTips.map((tip, index) => (
              <Card key={index} className="bg-card border-elec-yellow/30 p-4 sm:p-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex-shrink-0">
                    <tip.icon className="w-5 h-5 sm:w-6 sm:h-6 text-elec-yellow mt-1" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Tips */}
        <Card className="bg-card border-elec-yellow/30 p-4 sm:p-6 mb-8 sm:mb-12">
          <h3 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
            Additional Time Management Strategies
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-base text-muted-foreground">
              <span className="text-elec-yellow font-semibold">Treat each section as a reset.</span> If one task doesn't go perfectly, 
              don't carry the stress into the next. The AM2 is marked section by section, not on overall impression.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground">
              <span className="text-elec-yellow font-semibold">Practice under time pressure.</span> During your preparation, 
              time yourself on practice tasks to get used to working efficiently under pressure.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground">
              <span className="text-elec-yellow font-semibold">Know your weak areas.</span> Spend extra time practicing 
              the sections you find most challenging, but don't neglect the areas you're confident in.
            </p>
          </div>
        </Card>

        {/* Assessment Day Schedule */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
            Typical Assessment Schedule
          </h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            <Card className="bg-card border-elec-yellow/30 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Day 1 (6-7 hours)
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Safe Isolation & Risk Assessment (45 min)</p>
                <p>• Installation Work begins (5-6 hours)</p>
                <p>• Break periods as centre allows</p>
              </div>
            </Card>
            <Card className="bg-card border-elec-yellow/30 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Day 2 (6-7 hours)
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Continue Installation Work (2.5-3.5 hours)</p>
                <p>• Begin Testing & Certification (3.5 hours)</p>
                <p>• Complete paperwork</p>
              </div>
            </Card>
            <Card className="bg-card border-elec-yellow/30 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Day 3 (3-4 hours)
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Circuit Isolation (30 min)</p>
                <p>• Fault Diagnosis (2 hours)</p>
                <p>• Online Knowledge Test (1 hour)</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Common Time Wasters */}
        <Card className="bg-card border-elec-yellow/30 p-4 sm:p-6 mb-8 sm:mb-12">
          <h3 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
            Common Time Wasters to Avoid
          </h3>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Poor Planning</h4>
                  <p className="text-sm text-muted-foreground">Not reading the entire brief before starting work</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Tool Organisation</h4>
                  <p className="text-sm text-muted-foreground">Wasting time looking for tools or components</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Measurement Errors</h4>
                  <p className="text-sm text-muted-foreground">Having to re-run cables due to incorrect measurements</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Perfectionism</h4>
                  <p className="text-sm text-muted-foreground">Spending too long on cosmetic improvements</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Test Equipment Issues</h4>
                  <p className="text-sm text-muted-foreground">Not checking equipment functionality beforehand</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Paperwork Panic</h4>
                  <p className="text-sm text-muted-foreground">Leaving insufficient time for test certificates</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Preparation Focus Areas */}
        <Card className="bg-card border-elec-yellow/30 p-4 sm:p-6 mb-8 sm:mb-12">
          <h3 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
            How to Prepare for Time Management
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-elec-yellow mb-2">Practice with Realistic Timings</h4>
              <p className="text-sm sm:text-base text-muted-foreground mb-2">
                Set yourself challenges during training: "Can I complete this ring final in 45 minutes?" 
                Time yourself regularly to build realistic expectations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-elec-yellow mb-2">Master Your Test Equipment</h4>
              <p className="text-sm sm:text-base text-muted-foreground mb-2">
                Know exactly which buttons to press and in what sequence. Practice until testing procedures become automatic.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-elec-yellow mb-2">Memorise Key Calculations</h4>
              <p className="text-sm sm:text-base text-muted-foreground mb-2">
                Know cable length calculations, volt drop formulas, and certification requirements by heart. 
                No time to look these up during the assessment.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-elec-yellow mb-2">Develop Work Sequences</h4>
              <p className="text-sm sm:text-base text-muted-foreground">
                Create standard approaches for common tasks. Always do risk assessment → isolation → 
                installation → testing → certification in that order.
              </p>
            </div>
          </div>
        </Card>

        {/* Tips and Checklist */}
        <Card className="bg-card border-elec-yellow/30 p-4 sm:p-6">
          <h3 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
            Tips and Checklist
          </h3>
          <div className="space-y-3">
            {checklistItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-muted-foreground">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center gap-4">
          <Link 
            to="../section1"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-elec-yellow transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous: Purpose of AM2</span>
            <span className="sm:hidden">Previous</span>
          </Link>
          
          <Link 
            to="../section3"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-elec-yellow transition-colors"
          >
            <span className="hidden sm:inline">Next: Marking Criteria & Pass/Fail Thresholds</span>
            <span className="sm:hidden">Next</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AM2Module1Section2;