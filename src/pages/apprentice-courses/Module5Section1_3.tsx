import { ArrowLeft, ArrowRight, Lightbulb, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Shield, HelpCircle, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Electrical Symbols and Conventions - Module 5.1.3 | Level 2 Electrical Course";
const DESCRIPTION = "Master electrical symbols from BS 7671 and common site conventions. Learn to interpret lighting, power, switch, and containment symbols for accurate installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What does a circle with a cross usually represent?",
    options: ["A socket outlet", "A ceiling light", "A switch", "A distribution board"],
    correctIndex: 1,
    explanation: "A circle with a cross is the standard BS symbol for a ceiling light or luminaire fitting."
  },
  {
    id: 2,
    question: "What must always be checked for site-specific symbols?",
    options: ["The scale", "The legend", "The date", "The title"],
    correctIndex: 1,
    explanation: "The legend must always be checked as symbols may vary between drawings or projects, even when following BS standards."
  },
  {
    id: 3,
    question: "Which regulation defines UK electrical symbols?",
    options: ["BS 7909", "BS 5839", "BS 7671", "BS 6351"],
    correctIndex: 2,
    explanation: "BS 7671 (IET Wiring Regulations) defines the standard electrical symbols used in the UK."
  }
];

const Module5Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Why are symbols used in electrical drawings?",
      options: [
        "To make drawings look professional",
        "To communicate clearly and avoid clutter",
        "To save ink when printing",
        "To confuse other trades"
      ],
      correctAnswer: 1,
      explanation: "Symbols provide clear communication while reducing clutter on drawings, making them easier to read and interpret."
    },
    {
      id: 2,
      question: "What does a circle with a cross represent?",
      options: [
        "A socket outlet",
        "A ceiling light",
        "A switch",
        "A junction box"
      ],
      correctAnswer: 1,
      explanation: "A circle with a cross is the standard symbol for a ceiling light or luminaire."
    },
    {
      id: 3,
      question: "Which regulation defines UK electrical symbols?",
      options: [
        "BS 7909",
        "BS 5839",
        "BS 7671",
        "BS 6351"
      ],
      correctAnswer: 2,
      explanation: "BS 7671 (IET Wiring Regulations) defines the standard electrical symbols used in the UK."
    },
    {
      id: 4,
      question: "True or False: Site-specific symbols are never used.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. Site-specific symbols may be used to clarify particular installations, which is why checking the legend is essential."
    },
    {
      id: 5,
      question: "What does 'S' in a square usually mean?",
      options: [
        "Socket",
        "Switch",
        "Supply",
        "Safety device"
      ],
      correctAnswer: 1,
      explanation: "'S' in a square is the standard symbol for a switch."
    },
    {
      id: 6,
      question: "Why must the legend always be checked?",
      options: [
        "It's a legal requirement",
        "Symbols may differ between projects",
        "To waste time",
        "It's not necessary"
      ],
      correctAnswer: 1,
      explanation: "Symbols may vary between projects or include site-specific variations, making the legend essential for accurate interpretation."
    },
    {
      id: 7,
      question: "Give one example of a power symbol.",
      options: [
        "Circle with cross",
        "Double circle for socket outlet",
        "S in a square",
        "Single line"
      ],
      correctAnswer: 1,
      explanation: "A double circle represents a socket outlet, which is a power symbol."
    },
    {
      id: 8,
      question: "What happens if a symbol is misinterpreted?",
      options: [
        "Nothing serious",
        "Wrong installation, delays, and rework",
        "The drawing is automatically updated",
        "Other trades will fix it"
      ],
      correctAnswer: 1,
      explanation: "Misinterpreting symbols leads to incorrect installations, causing delays, waste, and requiring costly rework."
    },
    {
      id: 9,
      question: "Which category of symbols represents trunking or conduit?",
      options: [
        "Lighting",
        "Power",
        "Containment",
        "Switches"
      ],
      correctAnswer: 2,
      explanation: "Containment symbols represent trunking, conduit, and other cable management systems."
    },
    {
      id: 10,
      question: "Who should you ask if you don't recognise a symbol?",
      options: [
        "Another apprentice",
        "The client",
        "The supervisor or site manager",
        "Nobody, just guess"
      ],
      correctAnswer: 2,
      explanation: "Always ask your supervisor or site manager when you don't recognise a symbol to ensure correct installation."
    }
  ];

  const faqs = [
    {
      question: "Are all electrical symbols the same across different projects?",
      answer: "Most follow BS 7671 standards, but there can be variations. Always check the legend and symbol key for each set of drawings as different designers may use slight variations or additional symbols."
    },
    {
      question: "What should I do if I don't recognise a symbol?",
      answer: "Never guess. Always ask your supervisor or check the drawing legend. Keep BS 7671 reference materials accessible for quick symbol verification."
    },
    {
      question: "How do I differentiate between similar symbols?",
      answer: "Pay attention to small details like the number of circles, lines, or additional markings. When in doubt, refer to the legend or ask for clarification."
    },
    {
      question: "Can symbols be modified for specific installations?",
      answer: "Yes, site-specific symbols may be used for unique installations or equipment. These must be clearly explained in the drawing legend."
    },
    {
      question: "What happens if I install based on wrong symbol interpretation?",
      answer: "Wrong installation leads to delays, material waste, costly rework, and potentially compromised safety and compliance. Always verify unclear symbols."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Lightbulb className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 5.1.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Electrical Symbols and Conventions
          </h1>
          <p className="text-muted-foreground">
            Master electrical symbols from BS 7671 and common site conventions for accurate installation work.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Electrical drawings use standardised symbols from BS 7671 to communicate clearly.</li>
                <li>Main categories include lighting, power, switches, and containment symbols.</li>
                <li>Always check site legends for project-specific variations.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Circle with cross (lights), double circle (sockets), S in square (switches).</li>
                <li><strong>Use:</strong> Legend to verify symbols, BS 7671 for standard meanings.</li>
                <li><strong>Check:</strong> Site-specific symbols, containment routes, symbol variations.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Recognise standard electrical symbols from BS 7671.</li>
            <li>Interpret common site conventions used in electrical drawings.</li>
            <li>Differentiate between symbol types for wiring, containment, and accessories.</li>
            <li>Apply knowledge of symbols to read and implement installation drawings.</li>
          </ul>
        </Card>


        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* Purpose of Symbols */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Purpose of Symbols</h3>
            <p className="text-base text-foreground mb-4">
              Electrical symbols serve essential communication functions in technical drawings:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Communication and Clarity</p>
                    <p className="text-base text-foreground mb-2"><strong>Universal understanding:</strong> Symbols provide a standardised language.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Clear communication across all electrical trades</li>
                      <li>Reduces misunderstandings and installation errors</li>
                      <li>Maintains consistency across different projects</li>
                      <li>Enables quick recognition of electrical components</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Drawing efficiency:</strong> Symbols reduce clutter and improve readability.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Avoids lengthy text descriptions</li>
                      <li>Keeps drawings clean and professional</li>
                      <li>Allows more information in less space</li>
                      <li>Makes complex installations easier to understand</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> Symbols are the universal language of electrical engineering
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="symbols-purpose-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Categories of Symbols */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Categories of Symbols</h3>
            <p className="text-base text-foreground mb-4">
              Electrical symbols are organised into main categories for different system components:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Main Symbol Categories</p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Lighting symbols:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                          <li>Circle with cross = ceiling light</li>
                          <li>Pendant symbols for hanging lights</li>
                          <li>Emergency lighting indicators</li>
                          <li>Spotlight and downlight variations</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Power symbols:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                          <li>Double circle = socket outlet</li>
                          <li>Switched socket variations</li>
                          <li>Special purpose outlets (cooker, shower)</li>
                          <li>Industrial socket symbols</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Switch symbols:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                          <li>"S" in a square = switch</li>
                          <li>Multi-way switch indicators</li>
                          <li>Dimmer switch symbols</li>
                          <li>PIR and sensor switches</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Containment symbols:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                          <li>Lines with marks = trunking/conduit</li>
                          <li>Cable tray indicators</li>
                          <li>Underground cable routes</li>
                          <li>Cable ladder and basket tray</li>
                        </ul>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Remember:</strong> Each category has multiple variations - always check the legend
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="symbols-categories-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* BS 7671 Standards */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">BS 7671 Standards</h3>
            <p className="text-base text-foreground mb-4">
              All electrical symbols must comply with BS 7671 for consistency and safety:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">Regulatory Compliance</p>
                    <p className="text-base text-foreground mb-2"><strong>BS 7671 requirements:</strong> Standard symbols for all UK installations.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>All drawings must use approved BS 7671 symbols</li>
                      <li>Ensures consistency across the electrical industry</li>
                      <li>Maintains safety standards and reduces errors</li>
                      <li>Provides legal compliance for installations</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Professional standards:</strong> Using correct symbols demonstrates competence.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Shows understanding of electrical standards</li>
                      <li>Builds confidence with clients and supervisors</li>
                      <li>Prevents installation errors and disputes</li>
                      <li>Meets professional certification requirements</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Important:</strong> Stay updated with BS 7671 amendments and symbol changes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="bs7671-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Common Site Conventions */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Common Site Conventions</h3>
            <p className="text-base text-foreground mb-4">
              While following BS standards, sites may use variations for specific requirements:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-1">Site-Specific Adaptations</p>
                    <p className="text-base text-foreground mb-2"><strong>Adapted symbols:</strong> Sites may modify symbols for clarity.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Arrows for cable run directions</li>
                      <li>Numbers for circuit identification</li>
                      <li>Shading for different electrical zones</li>
                      <li>Special symbols for unique equipment</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Legend provision:</strong> Every drawing must include comprehensive legends.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Explains all symbols used on the drawing</li>
                      <li>Defines abbreviations and reference codes</li>
                      <li>Shows any site-specific variations</li>
                      <li>Must be checked before starting work</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Golden rule:</strong> Always check the legend first - never assume symbol meanings
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-6" />


          {/* Errors and Misinterpretation */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Errors and Misinterpretation</h3>
            <p className="text-base text-foreground mb-4">
              Understanding common errors helps prevent costly installation mistakes:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-1">Common Errors and Prevention</p>
                    <p className="text-base text-foreground mb-2"><strong>Symbol interpretation errors:</strong> Common mistakes and their consequences.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Not checking legends causes costly mistakes</li>
                      <li>Mixing up similar symbols (lighting vs. power)</li>
                      <li>Assuming symbols without verification</li>
                      <li>Using outdated symbol references</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Prevention strategies:</strong> Avoiding symbol-related errors.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Always double-check unfamiliar symbols</li>
                      <li>Keep BS 7671 reference materials accessible</li>
                      <li>Ask supervisors when uncertain</li>
                      <li>Cross-reference with specifications</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Consequences:</strong> Wrong installation, delays, material waste, and costly rework
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
        </Card>

        {/* Real-World Example */}
        <Card className="mb-8 border-slate-300 bg-slate-100 dark:bg-card/50 dark:border-slate-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Users className="w-5 h-5" />
              Real-World Example
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">
              <p className="font-medium">Office Refurbishment Symbol Mix-up</p>
              <p>
                An apprentice misread a lighting symbol and installed a pendant luminaire instead of a recessed 
                downlight in a suspended ceiling. The error wasn't discovered until the ceiling tiles were fitted. 
                This required:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Removing and replacing the incorrect luminaire</li>
                <li>Cutting new ceiling tile openings</li>
                <li>Additional cable work for the recessed fitting</li>
                <li>Two days of delays affecting other trades</li>
              </ul>
              <p className="font-medium">
                This £300 mistake could have been avoided by checking the legend and confirming the symbol 
                interpretation with the supervisor.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Q: Do all projects use BS 7671 symbols only?</p>
                <p className="text-muted-foreground">A: No — site-specific symbols may be added, so always check the legend for any variations or additional symbols.</p>
              </div>
              <div>
                <p className="font-semibold">Q: What if I don't recognise a symbol?</p>
                <p className="text-muted-foreground">A: Always refer to the drawing legend first, then ask your supervisor if the symbol isn't clear or explained.</p>
              </div>
              <div>
                <p className="font-semibold">Q: Are electrical symbols the same worldwide?</p>
                <p className="text-muted-foreground">A: No — different countries use different standards. In the UK, we follow BS 7671 and related British Standards.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 border-slate-300 bg-slate-100 dark:bg-card/50 dark:border-slate-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Book className="w-5 h-5" />
              Pocket Guide: Reading Electrical Symbols
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
              <div className="space-y-2">
                <p>✓ Always refer to BS 7671 standards</p>
                <p>✓ Memorise common lighting, socket, and switch symbols</p>
                <p>✓ Double-check site-specific legends</p>
              </div>
              <div className="space-y-2">
                <p>✓ When unsure, confirm before installing</p>
                <p>✓ Keep symbol reference charts handy</p>
                <p>✓ Ask supervisors about unfamiliar symbols</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recap */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recap</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">In this subsection, you learned:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Why symbols and conventions matter for clear communication</li>
              <li>The main symbol categories: lighting, power, switches, and containment</li>
              <li>The importance of BS 7671 compliance and checking legends</li>
              <li>How errors occur when symbols are misinterpreted</li>
              <li>Prevention strategies for accurate symbol interpretation</li>
            </ul>
            <p className="mt-4 font-medium text-primary">
              Accurate symbol interpretation ensures safe, compliant, and efficient electrical installations.
            </p>
          </CardContent>
        </Card>

        {/* Quiz */}
        <Quiz 
          title="Symbols and Conventions Quiz"
          questions={quizQuestions}
        />

        {/* Navigation */}
        <div className="flex justify-between">
          <Link to="../1-2">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Link to="../1-4">
            <Button>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Module5Section1_3;