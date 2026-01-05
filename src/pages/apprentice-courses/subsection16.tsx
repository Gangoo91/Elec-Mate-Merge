import { ArrowLeft, Target, BookOpen, Trash2, AlertCircle, CheckCircle, ClipboardList, Eye, MapPin, AlertTriangle, Shield, Home, Lightbulb, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Site Housekeeping and Safety Signage | Level 2 Electrical Course";
const DESCRIPTION = "Learn essential site housekeeping practices and safety signage requirements for electrical work, ensuring clean and safe work environments.";

const Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions = [
    {
      id: "1",
      question: "What does 'site housekeeping' primarily refer to?",
      options: [
        "Cleaning client property after work",
        "How clean, tidy, and organised a worksite is",
        "Managing electrical documentation",
        "Supervising apprentices on site"
      ],
      correctIndex: 1,
      explanation: "Site housekeeping refers to how clean, tidy, and organised a worksite is, including proper storage and management of tools, materials, and waste."
    },
    {
      id: "2",
      question: "What colour are warning safety signs?",
      options: [
        "Red with white text",
        "Blue with white symbol", 
        "Yellow with black symbol",
        "Green with white symbol"
      ],
      correctIndex: 2,
      explanation: "Warning signs are yellow with black symbols to indicate that a hazard is present."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What does 'site housekeeping' mean?",
      options: [
        "Cleaning the client's house after work",
        "How clean, tidy, and organised a worksite is",
        "Managing domestic electrical installations", 
        "Keeping site documentation in order"
      ],
      correctAnswer: 1,
      explanation: "Site housekeeping refers to how clean, tidy, and organised a worksite is, including how tools, materials, waste, and equipment are stored or managed."
    },
    {
      id: 2,
      question: "Name two consequences of poor housekeeping.",
      options: [
        "Higher wages and better conditions",
        "Trips on leads and blocked emergency exits",
        "Faster work completion and client satisfaction",
        "Better tool organisation and material storage"
      ],
      correctAnswer: 1,
      explanation: "Poor housekeeping causes trips on leads/tools, blocked emergency exits, fire risks, delays in finding equipment, and reduced productivity."
    },
    {
      id: 3,
      question: "What colour are warning signs?",
      options: [
        "Red with white text",
        "Blue with white symbol",
        "Yellow with black symbol",
        "Green with white symbol"
      ],
      correctAnswer: 2,
      explanation: "Warning signs are yellow with black symbols to indicate a hazard is present."
    },
    {
      id: 4,
      question: "Why are prohibition signs used?",
      options: [
        "To show safe conditions",
        "To indicate mandatory actions",
        "To warn of hazards",
        "To show actions that are not allowed"
      ],
      correctAnswer: 3,
      explanation: "Prohibition signs (red circle with line) are used to show actions that are not allowed or forbidden."
    },
    {
      id: 5,
      question: "True or False: Fire exit signs are red.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Fire exit signs are green with white symbols as they indicate safe conditions and emergency escape routes."
    }
  ];

  const faqs = [
    {
      question: "Who is responsible for maintaining site housekeeping?",
      answer: "Everyone on site is responsible for housekeeping. While site supervisors and managers have overall responsibility, each worker must maintain their own work area and follow housekeeping procedures throughout the day."
    },
    {
      question: "How often should tools and materials be tidied?",
      answer: "Tools and materials should be tidied continuously throughout the day ('tidy as you go') and properly stored at the end of each work period. This prevents accumulation of mess and maintains safety standards."
    },
    {
      question: "What should I do if I notice damaged safety signage?",
      answer: "Report damaged, missing, or unclear safety signage immediately to your supervisor. Do not ignore it - proper signage is a legal requirement and essential for site safety."
    },
    {
      question: "Are there specific regulations for safety signage?",
      answer: "Yes, the Health and Safety (Safety Signs and Signals) Regulations 1996 set out legal requirements for workplace signage, including colours, symbols, positioning, and maintenance standards."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="h-8 w-8 text-emerald-400" />
            <div>
              <span className="inline-block bg-emerald-500 text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 4.3
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Site Housekeeping and Safety Signage
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Maintaining clean, organised worksites and understanding safety signage
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Housekeeping:</strong> Clean, tidy, organised worksites prevent accidents.</li>
                <li><strong>Safety first:</strong> Poor housekeeping causes trips, fires, and delays.</li>
                <li><strong>Signage:</strong> Legal requirement to inform and warn of hazards.</li>
                <li><strong>Types:</strong> Warning, mandatory, prohibition, and safe condition signs.</li>
                <li><strong>Professional image:</strong> Clean sites impress clients and improve productivity.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Messy work areas, blocked exits, missing/damaged signs.</li>
                <li><strong>Use:</strong> Tidy as you go, proper waste disposal, sign reporting systems.</li>
                <li><strong>Apply:</strong> Daily housekeeping checks, signage maintenance, hazard awareness.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-muted-foreground mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Understand what housekeeping means in a construction or electrical setting</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Recognise the dangers of poor housekeeping</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Identify different types of safety signage and what they mean</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Apply housekeeping and signage principles to real site situations</span>
            </li>
          </ul>
        </Card>

        {/* What Is Good Site Housekeeping? */}
        <div className="mb-8 border-l-4 border-emerald-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">What Is Good Site Housekeeping?</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-emerald-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="font-medium text-blue-800 dark:text-blue-200 mb-3">
                Housekeeping refers to how clean, tidy, and organised a worksite is — including how tools, materials, waste, and equipment are stored or managed.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-red-800 dark:text-red-200">Poor housekeeping causes:</h4>
              <ul className="text-red-700 dark:text-emerald-400 text-sm space-y-1">
                <li>• Trips on leads, tools, or packaging</li>
                <li>• Fire risks from waste materials</li>
                <li>• Blocked emergency exits</li>
                <li>• Delays in finding tools or parts</li>
                <li>• Reduced productivity and increased stress</li>
              </ul>
            </div>
          </div>
        </div>

        <InlineCheck
          id="housekeeping-meaning"
          question="What does 'site housekeeping' primarily refer to?"
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Good Housekeeping Practices */}
        <div className="mb-8 border-l-4 border-emerald-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Good Housekeeping Practices</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  Daily Practices
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Tidy as you go — don't wait until the end of the job</li>
                  <li>• Coil cables neatly and keep them off walkways</li>
                  <li>• Store materials in designated areas</li>
                  <li>• Remove waste and packaging regularly</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-emerald-400" />
                  Tool Management
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Keep tools stored properly when not in use</li>
                  <li>• Use tool bags or pouches to organise equipment</li>
                  <li>• Account for all tools at end of shift</li>
                  <li>• Clean tools before storing</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  Safety Considerations
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Make sure exit routes are always clear</li>
                  <li>• Keep fire extinguisher access unobstructed</li>
                  <li>• Secure loose materials that could fall</li>
                  <li>• Maintain clear sight lines around hazards</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Trash2 className="h-4 w-4 text-emerald-400" />
                  Waste Management
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Label and segregate waste types</li>
                  <li>• Dispose of hazardous waste properly</li>
                  <li>• Use designated waste containers</li>
                  <li>• Remove combustible materials promptly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Types of Safety Signage */}
        <div className="mb-8 border-l-4 border-purple-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Types of Safety Signage</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <p className="font-medium text-purple-800 dark:text-purple-200 mb-3">
                Safety signs are used to inform, instruct, warn, or prohibit certain actions. These are required by law under the Health and Safety (Safety Signs and Signals) Regulations 1996.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">Warning Signs</h4>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">Yellow with black symbol - Hazard present</p>
              </div>

              <div className="bg-emerald-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Mandatory Signs</h4>
                <p className="text-blue-700 dark:text-emerald-400 text-sm">Blue with white symbol - Action required</p>
              </div>

              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-red-800 dark:text-red-200">Prohibition Signs</h4>
                <p className="text-red-700 dark:text-emerald-400 text-sm">Red circle with line - Action not allowed</p>
              </div>

              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">Safe Condition Signs</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">Green with white symbol - Safety information</p>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          id="sign-colors"
          question="What colour are warning safety signs?"
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Common Housekeeping Problems */}
        <div className="mb-8 border-l-4 border-red-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Common Housekeeping Problems</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="font-medium text-red-800 dark:text-red-200 mb-3">
                These common issues create safety hazards and reduce site efficiency:
              </p>
            </div>

            <div className="grid gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-emerald-400" />
                  Cable Management Issues
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Extension leads left across walkways</li>
                  <li>• Coiled cables creating trip hazards</li>
                  <li>• Temporary wiring not secured properly</li>
                  <li>• Multiple cables bundled without protection</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Trash2 className="h-4 w-4 text-emerald-400" />
                  Waste Accumulation
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Cable off-cuts left on floors</li>
                  <li>• Packaging materials not removed</li>
                  <li>• Metal shavings from drilling operations</li>
                  <li>• Old materials mixed with new stock</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-emerald-400" />
                  Tool and Equipment Storage
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Tools left on ladders or scaffolding</li>
                  <li>• Equipment blocking access routes</li>
                  <li>• Loose screws and fixings on surfaces</li>
                  <li>• Power tools without proper storage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Housekeeping Checklist */}
        <div className="mb-8 border-l-4 border-indigo-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Practical Housekeeping Checklist</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <p className="font-medium text-indigo-800 dark:text-indigo-200 mb-3">
                Use this checklist throughout your workday to maintain high standards:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-emerald-400" />
                  Start of Day
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Check work area is clear and clean</li>
                  <li>• Identify material storage locations</li>
                  <li>• Locate nearest waste disposal points</li>
                  <li>• Note emergency exit routes</li>
                  <li>• Set up temporary tool storage area</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-emerald-400" />
                  During Work
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Clean up spills immediately</li>
                  <li>• Keep walkways clear at all times</li>
                  <li>• Dispose of waste in correct containers</li>
                  <li>• Secure cables and hoses properly</li>
                  <li>• Return tools to designated areas</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  End of Day
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Account for all tools and equipment</li>
                  <li>• Remove all temporary installations</li>
                  <li>• Clear work area of all materials</li>
                  <li>• Secure any ongoing work safely</li>
                  <li>• Report any housekeeping concerns</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  Weekly Review
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Assess overall site organisation</li>
                  <li>• Check storage area efficiency</li>
                  <li>• Review waste disposal methods</li>
                  <li>• Update safety signage if needed</li>
                  <li>• Plan improvements for next week</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Safety Signage */}
        <div className="mb-8 border-l-4 border-teal-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Advanced Safety Signage Requirements</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
              <p className="font-medium text-teal-800 dark:text-teal-200 mb-3">
                Understanding specific signage requirements for electrical work environments:
              </p>
            </div>

            <div className="grid gap-4">
              <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">Electrical Hazard Signs</h4>
                <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                  <li>• "Danger - High Voltage" for equipment over 1kV</li>
                  <li>• "Caution - Electrical Equipment" for general areas</li>
                  <li>• "Authorized Personnel Only" for electrical rooms</li>
                  <li>• Voltage level indicators (230V, 400V, etc.)</li>
                </ul>
              </div>

              <div className="bg-emerald-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">PPE Requirement Signs</h4>
                <ul className="text-blue-700 dark:text-emerald-400 text-sm space-y-1">
                  <li>• Hard hat required in designated areas</li>
                  <li>• Safety glasses must be worn</li>
                  <li>• Insulated gloves required near live equipment</li>
                  <li>• Steel toe boots mandatory on site</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-red-800 dark:text-red-200">Emergency Information</h4>
                <ul className="text-red-700 dark:text-emerald-400 text-sm space-y-1">
                  <li>• Emergency shut-off switch locations</li>
                  <li>• First aid station identification</li>
                  <li>• Emergency contact numbers</li>
                  <li>• Assembly point for evacuations</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-purple-800 dark:text-purple-200">Site-Specific Requirements</h4>
                <ul className="text-purple-700 dark:text-emerald-400 text-sm space-y-1">
                  <li>• Permit to work area boundaries</li>
                  <li>• Hot work permit zones</li>
                  <li>• Confined space entry points</li>
                  <li>• Environmental hazard warnings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study */}
        <div className="mb-8 border-l-4 border-amber-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">7</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Case Study: Office Rewiring Project</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="font-medium text-amber-800 dark:text-amber-200 mb-3">
                Real-world example of how good housekeeping prevented accidents:
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">The Situation</h4>
              <p className="text-sm text-muted-foreground mb-3">
                A team was rewiring a busy office building over weekends. The work involved running new cables 
                through ceiling spaces and installing new distribution boards in several locations.
              </p>
              
              <h4 className="font-semibold mb-2">Housekeeping Challenges</h4>
              <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                <li>• 500m of old cable needed removal</li>
                <li>• Ceiling tiles and debris accumulating</li>
                <li>• New equipment stored in corridors</li>
                <li>• Multiple work areas active simultaneously</li>
              </ul>

              <h4 className="font-semibold mb-2">Solutions Implemented</h4>
              <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                <li>• Designated waste skips positioned strategically</li>
                <li>• "Tidy as you go" policy enforced</li>
                <li>• Clear signage for work areas and diversions</li>
                <li>• Daily housekeeping checks at shift end</li>
                <li>• Emergency route checks every 2 hours</li>
              </ul>

              <h4 className="font-semibold mb-2">Results</h4>
              <p className="text-sm text-muted-foreground">
                Zero accidents occurred during the 6-week project. Client praised the team's professionalism 
                and cleanliness. Work completed on schedule with no delays due to lost tools or blocked access.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-emerald-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-b-0">
                <h3 className="font-semibold mb-2 text-emerald-400">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Good housekeeping prevents accidents and improves productivity</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Safety signage is a legal requirement with specific colour codes</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Everyone on site is responsible for maintaining standards</span>
            </li>
          </ul>
        </Card>

        <Quiz questions={quizQuestions} />
      </div>
    </div>
  );
};

export default Section4_3;
