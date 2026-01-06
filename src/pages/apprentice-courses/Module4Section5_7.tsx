import { ArrowLeft, ArrowRight, Wrench, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Making Final Fixes to Accessories - Module 4.5.7 | Level 2 Electrical Course";
const DESCRIPTION = "Master professional final fixing techniques for electrical accessories. Learn proper alignment, securing methods, and compliance with BS 7671 for high-quality installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Why is it important to follow manufacturer torque settings on terminals?",
    options: ["To save time", "To prevent over-tightening damage and ensure secure connections", "To use less tools", "To reduce material costs"],
    correctIndex: 1,
    explanation: "Manufacturer torque settings ensure optimal connection security without damaging terminals or conductors, preventing both loose connections and over-tightening damage."
  },
  {
    id: 2,
    question: "Name one way to ensure accessories are level when fixed.",
    options: ["Use measuring tape", "Use spirit level", "Use plumb line", "Visual estimation"],
    correctIndex: 1,
    explanation: "A spirit level is the standard tool for ensuring accessories are properly aligned and level during installation."
  },
  {
    id: 3,
    question: "What precaution should you take when handling decorative faceplates?",
    options: ["Use power tools", "Wear clean gloves", "Work quickly", "Use maximum force"],
    correctIndex: 1,
    explanation: "Clean gloves prevent fingerprints, scratches, and contamination on decorative faceplates, maintaining their appearance and finish quality."
  }
];

const Module4Section5_7 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of final fixing?",
      options: [
        "To run new cables",
        "To secure and align electrical accessories",
        "To design the wiring layout",
        "To test circuit breakers"
      ],
      correctAnswer: 1,
      explanation: "Final fixing is the process of securely mounting and aligning electrical accessories in their final positions."
    },
    {
      id: 2,
      question: "True or False: Over-tightening screws on accessories can cause damage.",
      options: [
        "True",
        "False",
        "Only on plastic accessories",
        "Only on metal accessories"
      ],
      correctAnswer: 0,
      explanation: "True - Over-tightening can crack faceplates, strip threads, distort mounting boxes, and damage internal components."
    },
    {
      id: 3,
      question: "Why should gloves be worn when handling decorative faceplates?",
      options: [
        "For electrical safety",
        "To avoid fingerprints and scratches",
        "To improve grip",
        "To prevent static discharge"
      ],
      correctAnswer: 1,
      explanation: "Clean gloves prevent fingerprints, scratches, and contamination that would affect the appearance of decorative finishes."
    },
    {
      id: 4,
      question: "What tool can be used to ensure a socket is level?",
      options: [
        "Multimeter",
        "Spirit level",
        "Screwdriver",
        "Wire strippers"
      ],
      correctAnswer: 1,
      explanation: "A spirit level ensures accessories are properly aligned and level during installation."
    },
    {
      id: 5,
      question: "Which regulation covers the correct mounting heights for accessible installations?",
      options: [
        "BS 7671",
        "Building Regulations Part M",
        "BS EN 60309",
        "BS 5839"
      ],
      correctAnswer: 1,
      explanation: "Building Regulations Part M specifies accessibility requirements including mounting heights for switches and sockets."
    },
    {
      id: 6,
      question: "What should you check on all earth connections before final fixing?",
      options: [
        "Voltage level",
        "Current capacity",
        "That they are continuous and secure",
        "Wire colour"
      ],
      correctAnswer: 2,
      explanation: "Earth connections must be continuous and secure to provide effective protection in fault conditions."
    },
    {
      id: 7,
      question: "Name one method of correcting uneven mounting surfaces.",
      options: [
        "Use spacers or shims",
        "Force the accessory flat",
        "Use longer screws",
        "Ignore the problem"
      ],
      correctAnswer: 0,
      explanation: "Spacers or shims allow accessories to be mounted flush and level on uneven surfaces."
    },
    {
      id: 8,
      question: "Why is double-checking terminal tightness after fixing important?",
      options: [
        "To test the circuit",
        "Handling during fixing can loosen screws",
        "To check polarity",
        "To verify colour coding"
      ],
      correctAnswer: 1,
      explanation: "Movement and handling during the fixing process can cause terminals to loosen, requiring re-checking and re-tightening."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.5.7
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Making Final Fixes to Accessories
          </h1>
          <p className="text-white">
            Master professional final fixing techniques to ensure electrical accessories are securely fitted, correctly aligned, and meet all safety and aesthetic requirements.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Final fixing secures accessories in place with correct alignment and positioning.</li>
                <li>Proper technique ensures safety, reliability, and professional appearance.</li>
                <li>Compliance with BS 7671 and Building Regulations is essential for certification.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Mounting boxes, accessory types, alignment requirements.</li>
                <li><strong>Use:</strong> Correct tools, proper techniques, manufacturer specifications.</li>
                <li><strong>Check:</strong> Secure fixing, level alignment, tight terminations.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Prepare accessories and mounting boxes systematically for professional final fixing procedures.</li>
            <li>Securely fit and align electrical accessories to manufacturer specifications and industry standards.</li>
            <li>Ensure all terminations are tight and conductors are correctly positioned for long-term reliability.</li>
            <li>Avoid damage to accessories during installation while maintaining quality and appearance standards.</li>
            <li>Follow manufacturer instructions and relevant standards including BS 7671 and Building Regulations.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Preparing for Final Fix */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Systematic Preparation for Final Fixing</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Thorough preparation ensures efficient final fixing and professional results:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Pre-Installation Verification and Planning</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>First-fix completion check:</strong> Verify all preparatory work is complete and satisfactory.</p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>All cabling installed and tested for continuity and polarity</li>
                      <li>Containment systems (conduit, trunking, tray) properly installed and secured</li>
                      <li>Back boxes mounted flush, level, and at correct centres</li>
                      <li>Wall finishes completed with no damage to electrical installations</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Work area preparation:</strong> Create optimal conditions for quality installation.</p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Clean and dust-free environment to prevent contamination</li>
                      <li>Adequate lighting for detailed work and quality inspection</li>
                      <li>Temperature controlled to prevent condensation in accessories</li>
                      <li>Protect finished surfaces from damage during installation</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Accessory verification:</strong> Confirm all components meet specification requirements.</p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Correct type, rating, and finish as per specification</li>
                      <li>No damage from transport or storage</li>
                      <li>All mounting hardware and fixings included</li>
                      <li>Compliance markings and certifications present</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Quality checkpoint:</strong> Address any deficiencies before proceeding with final fixing
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="preparation-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Checking Terminations */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Professional Termination Standards and Verification</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Correct termination techniques ensure electrical safety and long-term reliability:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Conductor Preparation and Inspection</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Stripping length verification:</strong> Ensure optimal conductor exposure for secure termination.</p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Follow manufacturer specifications for each accessory type</li>
                      <li>Typically 10-12mm for standard terminals, verify in documentation</li>
                      <li>No bare copper visible outside terminal when properly inserted</li>
                      <li>Use appropriate wire strippers to avoid conductor damage</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Conductor integrity assessment:</strong> Check for damage that could compromise connection.</p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>No nicked or damaged strands that reduce current capacity</li>
                      <li>Clean, bright copper with no corrosion or oxidation</li>
                      <li>Proper conductor identification and colour coding maintained</li>
                      <li>CPC conductors properly sleeved with green/yellow identification</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Terminal tightening procedures:</strong> Apply manufacturer torque specifications precisely.</p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Use calibrated torque drivers where specified (typically 0.8-1.2Nm)</li>
                      <li>For non-specified values, tighten firmly without over-stressing</li>
                      <li>Check all terminals systematically, not just primary connections</li>
                      <li>Perform gentle tug test to verify mechanical security</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Safety requirement:</strong> Complete polarity and continuity verification before final fixing
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="alignment-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Aligning and Securing */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Professional Alignment and Securing Techniques</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Precise alignment and secure fixing ensure professional appearance and long-term performance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Precision Alignment Methods</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Spirit level application:</strong> Ensure professional appearance with accurate alignment.</p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Use quality spirit level appropriate for accessory size</li>
                      <li>Check both horizontal and vertical alignment where applicable</li>
                      <li>Maintain consistent alignment across multiple accessories</li>
                      <li>Account for building settlement and structural variations</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Screw tightening technique:</strong> Secure without damage or distortion.</p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Progressive tightening in stages to maintain alignment</li>
                      <li>Avoid over-tightening that cracks faceplates or strips threads</li>
                      <li>Use correct screwdriver size to prevent head damage</li>
                      <li>Apply even pressure across all fixing points</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Box type considerations:</strong> Adapt technique to mounting box material and design.</p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Plastic boxes: Monitor for thread stripping, use appropriate torque</li>
                      <li>Metal boxes: Verify earth continuity maintenance during fixing</li>
                      <li>Adjustable lugs: Set to correct depth before final tightening</li>
                      <li>Box extenders: Ensure secure connection and proper alignment</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Professional tip:</strong> Use consistent fixing patterns across the installation for uniform appearance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="handling-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Compliance and Standards */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Regulatory Compliance and Standards Application</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Adherence to regulations and standards ensures legal compliance and professional installation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">BS 7671 and Building Regulations Compliance</p>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>BS 7671 connection requirements:</strong> Electrical safety and reliability standards.</p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Secure mechanical and electrical connections for all conductors</li>
                      <li>Proper earthing arrangements for all metallic components</li>
                      <li>Appropriate protection against mechanical damage</li>
                      <li>Correct identification of all conductors and circuits</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Building Regulations Part M:</strong> Accessibility requirements for public and domestic buildings.</p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Switch mounting heights: 750mm-1200mm from finished floor level</li>
                      <li>Socket outlet heights: 450mm-1200mm in accessible areas</li>
                      <li>Contrast requirements for visually impaired users</li>
                      <li>Clear access space around all accessories</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-white mb-2"><strong>Site-specific requirements:</strong> Additional standards and client specifications.</p>
                    <ul className="text-xs text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Corporate design standards and branding requirements</li>
                      <li>Healthcare, education, and industrial specific regulations</li>
                      <li>Environmental considerations (IP ratings, temperature ranges)</li>
                      <li>Maintenance access and operational requirements</li>
                    </ul>
                    <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Documentation requirement:</strong> Record compliance evidence for certification and future reference
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          
          {/* Professional Installation Techniques */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Professional Installation Techniques and Quality Control</h3>
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-white mb-2">Handling and Protection Methods</p>
                <ul className="text-xs text-white space-y-1 list-disc pl-4">
                  <li>Always wear clean gloves when handling decorative faceplates to prevent fingerprints and scratches</li>
                  <li>Remove protective films only after installation completion to maintain finish quality</li>
                  <li>Use appropriate packaging materials to protect accessories during transport to work areas</li>
                  <li>Store accessories in clean, dry conditions away from construction dust and moisture</li>
                  <li>Handle metal faceplates with particular care to avoid dents and surface damage</li>
                  <li>Use soft cloths for final cleaning and inspection of completed installations</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium text-white mb-2">Surface Preparation and Correction Techniques</p>
                <ul className="text-xs text-white space-y-1 list-disc pl-4">
                  <li>Use spacers or shims to accommodate uneven wall surfaces and maintain flush mounting</li>
                  <li>Apply box extenders where wall thickness exceeds standard box depth</li>
                  <li>Fill and sand minor surface imperfections before accessory installation</li>
                  <li>Check for plumb and level on grouped accessories using string lines or laser levels</li>
                  <li>Maintain uniform spacing between multiple accessories for professional appearance</li>
                  <li>Account for different wall materials and fixing requirements in the same installation</li>
                </ul>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-white mb-2">Quality Assurance and Verification Procedures</p>
                <ul className="text-xs text-white space-y-1 list-disc pl-4">
                  <li>Double-check terminal tightness after positioning accessories as handling can loosen connections</li>
                  <li>Verify earth continuity on all metal faceplates and mounting systems</li>
                  <li>Test operation of all switches, dimmers, and control devices before completion</li>
                  <li>Check correct screwdriver size to avoid damaging screw heads during installation</li>
                  <li>Perform visual inspection for alignment, finish quality, and professional appearance</li>
                  <li>Document any non-standard installations or deviations from specification</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Step-by-Step Installation Procedures */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Systematic Installation Procedures</h3>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium text-white mb-2">Standard Socket Outlet Installation</p>
                <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                  <li>Verify circuit isolation and test conductors for correct polarity and continuity</li>
                  <li>Check mounting box is flush, level, and free from debris or damage</li>
                  <li>Prepare conductors to correct strip length as per manufacturer specification</li>
                  <li>Insert conductors into appropriate terminals: Live (L), Neutral (N), Earth (E)</li>
                  <li>Tighten terminals to specified torque, typically 0.8-1.2Nm for standard accessories</li>
                  <li>Fold conductors neatly into box ensuring no stress on terminations</li>
                  <li>Position accessory flush against wall using spirit level for alignment</li>
                  <li>Insert and tighten fixing screws progressively to maintain alignment</li>
                  <li>Check earth continuity where metal faceplate is used</li>
                  <li>Test operation and record installation details for certification</li>
                </ol>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-cyan-400/30">
                <p className="font-medium text-white mb-2">Light Switch Installation Procedure</p>
                <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                  <li>Confirm circuit design and switching arrangement requirements</li>
                  <li>Verify isolation and check conductor identification at switch position</li>
                  <li>Install appropriate sleeving on switched live conductors if required</li>
                  <li>Connect conductors according to switching circuit requirements</li>
                  <li>For two-way switching, verify common and strappers are correctly identified</li>
                  <li>Ensure no neutral conductors are switched in any switching arrangement</li>
                  <li>Position switch mechanism checking orientation and alignment</li>
                  <li>Apply consistent fixing pattern across multiple switch installations</li>
                  <li>Test switching operation in all positions before completing installation</li>
                  <li>Verify correct circuit identification and update documentation</li>
                </ol>
              </div>

              <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
                <p className="font-medium text-white mb-2">Light Fitting Final Fix Process</p>
                <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                  <li>Check ceiling box support adequately rated for fitting weight</li>
                  <li>Verify supply isolation and conductor preparation at ceiling position</li>
                  <li>Install any required mounting hardware or support systems first</li>
                  <li>Make electrical connections following manufacturer wiring diagram</li>
                  <li>Ensure earth connections to all metallic components of light fitting</li>
                  <li>Secure electrical connections and position conductors safely</li>
                  <li>Mount fitting ensuring weight is supported by structure, not electrical connections</li>
                  <li>Install lamps or LED modules according to specification</li>
                  <li>Test operation including any dimming or control functions</li>
                  <li>Complete installation with any decorative covers or trim pieces</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Troubleshooting and Problem Resolution */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Common Issues and Professional Solutions</h3>
            <div className="space-y-3">
              <div className="rounded-lg p-3 border border-border/30">
                <p className="font-medium text-white text-sm mb-1">Problem: Accessory not sitting flush with wall surface</p>
                <p className="text-xs text-white mb-2"><strong>Causes:</strong> Uneven wall surface, incorrect box depth, debris in mounting box</p>
                <p className="text-xs text-white"><strong>Solutions:</strong> Use appropriate spacers or shims, install box extenders if needed, clean box thoroughly, check wall for high spots</p>
              </div>
              
              <div className="rounded-lg p-3 border border-border/30">
                <p className="font-medium text-white text-sm mb-1">Problem: Terminals loosening after installation</p>
                <p className="text-xs text-white mb-2"><strong>Causes:</strong> Insufficient initial tightening, movement during fixing, conductor spring-back</p>
                <p className="text-xs text-white"><strong>Solutions:</strong> Use specified torque values, check tightness after positioning, consider ferrules for stranded conductors</p>
              </div>
              
              <div className="rounded-lg p-3 border border-border/30">
                <p className="font-medium text-white text-sm mb-1">Problem: Cracked or damaged faceplate during installation</p>
                <p className="text-xs text-white mb-2"><strong>Causes:</strong> Over-tightening screws, using wrong screwdriver size, forcing misaligned accessories</p>
                <p className="text-xs text-white"><strong>Solutions:</strong> Use appropriate torque, ensure correct tool sizes, align properly before tightening, replace damaged components</p>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Examples</h2>
          
          <div className="space-y-4">
            <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
              <p className="text-xs sm:text-sm text-white mb-2">
                <strong>Case Study 1: High-End Residential Alignment Issues</strong>
              </p>
              <p className="text-xs sm:text-sm text-white">
                On a high-end residential project, the installer failed to level a row of light switches properly. While the installation was electrically sound and passed all safety tests, the visual misalignment was immediately noticed by the client during the handover inspection. The slight variations in angle were particularly obvious under the architectural lighting design. This resulted in rework of 14 switches at the contractor's expense, including repainting the affected wall areas. The project was delayed by two days and cost £800 in additional labour and materials. Using a spirit level and maintaining consistent alignment could have prevented this expensive mistake.
              </p>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="text-xs sm:text-sm text-white mb-2">
                <strong>Case Study 2: Commercial Office Terminal Failure</strong>
              </p>
              <p className="text-xs sm:text-sm text-white">
                In a busy commercial office, socket outlets began failing after 18 months of operation. Investigation revealed that terminals had been inadequately tightened during installation, leading to high resistance connections and eventual failure. The loose connections caused arcing, which damaged both the socket outlets and some connected equipment. The building had to be partially evacuated while emergency repairs were completed. Over 40 socket outlets required replacement at a cost of £12,000, plus business interruption claims. Proper torque application and post-installation verification would have prevented this failure.
              </p>
            </div>

            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <p className="text-xs sm:text-sm text-white mb-2">
                <strong>Case Study 3: Heritage Building Successful Restoration</strong>
              </p>
              <p className="text-xs sm:text-sm text-white">
                A Grade II listed building restoration required careful installation of modern electrical accessories while preserving the historic character. The project team used period-appropriate brass faceplates and maintained original mounting heights where possible. Meticulous attention to alignment, spacing, and finish quality resulted in an installation that seamlessly blended modern functionality with historic aesthetics. The client was particularly impressed with the consistency of spacing and alignment across over 200 accessories. The project won a heritage restoration award and led to further contracts worth £2.3 million.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-white mb-2">Q: Can I reuse screws from old accessories?</h4>
              <p className="text-sm text-white">A: Only if they are undamaged, the correct length and thread type, and meet manufacturer specifications. New accessories should generally use new fixings for optimal performance.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-white mb-2">Q: What should I do if the mounting box is not flush with the wall?</h4>
              <p className="text-sm text-white">A: Use box extenders to bring the mounting point flush with the finished surface, or use spacers behind the accessory. Never force accessories to fit uneven surfaces.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-white mb-2">Q: Is it acceptable to leave bare copper exposed at the terminal?</h4>
              <p className="text-sm text-white">A: No — only the correct stripped length should be inside the terminal block. Any exposed copper outside terminals creates a safety risk and fails inspection.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-white mb-2">Q: How do I maintain consistent spacing between grouped accessories?</h4>
              <p className="text-sm text-white">A: Use a template or measuring stick to ensure consistent centres, and check alignment with a string line or laser level across multiple accessories.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <p className="text-xs sm:text-sm text-white">
            Final fixing ensures that electrical accessories are securely fitted, correctly aligned, and meet all safety and aesthetic requirements. Care, precision, and compliance with standards at this stage make the difference between a professional installation and one that appears rushed or unfinished. Proper technique prevents failures, reduces callbacks, and demonstrates the electrician's commitment to quality and safety standards.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quiz (8 Questions)</h2>
          <p className="text-sm text-white mb-6">
            Test your understanding of final fixing techniques and requirements
          </p>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button asChild variant="outline">
            <Link to="../5-6" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Testing for Polarity and Continuity During Install
            </Link>
          </Button>
          <Button asChild>
            <Link to="../5-8" className="flex items-center gap-2">
              Next: Common Faults and How to Correct Them
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section5_7;