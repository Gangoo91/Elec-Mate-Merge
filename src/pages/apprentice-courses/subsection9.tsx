import useSEO from "@/hooks/useSEO";
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  Package,
  CheckSquare,
  Sparkles,
  TrendingDown,
  HardHat,
  ClipboardCheck,
  Construction,
  Users,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const TITLE = "Module 2 Section 2.5: Slip, Trip and Manual Handling Risks | BS7671 Electrical";
const DESCRIPTION = "Learn to prevent the most common workplace injuries in electrical work. Master TILE method, safe lifting techniques, and workplace housekeeping to eliminate slip, trip and manual handling risks.";

const quickCheckQuestions = [
  {
    id: "slip-hazards",
    question: "What is the most common cause of slips in electrical work?",
    options: [
      "Poor lighting",
      "Wet or contaminated floors",
      "Uneven surfaces",
      "Wrong footwear",
    ],
    correctIndex: 1,
    explanation:
      "Wet or contaminated floors from cleaning, spills, or weather are the primary cause of slips in electrical work environments.",
  },
  {
    id: "tile-method",
    question: "What does the 'I' in TILE stand for?",
    options: [
      "Installation requirements",
      "Individual capability",
      "Inspection checklist",
      "Impact assessment",
    ],
    correctIndex: 1,
    explanation:
      "Individual refers to assessing the person's physical capability, training, health status, and fatigue levels before manual handling.",
  },
  {
    id: "housekeeping",
    question: "What is the primary purpose of good housekeeping?",
    options: [
      "Professional appearance",
      "Safety and accident prevention",
      "Client satisfaction",
      "Faster work completion",
    ],
    correctIndex: 1,
    explanation:
      "Good housekeeping is fundamentally about safety and preventing accidents, not appearance or efficiency.",
  },
];

const mainQuizQuestions = [
  {
    id: 1,
    question: "What does the acronym TILE stand for in manual handling assessment?",
    options: [
      "Time, Impact, Load, Equipment",
      "Task, Individual, Load, Environment",
      "Training, Inspection, Lifting, Emergency",
      "Tools, Installation, Labour, Evaluation"
    ],
    correctAnswer: 1,
    explanation: "TILE stands for Task, Individual, Load, and Environment - the four key factors to assess when planning manual handling operations under the Manual Handling Operations Regulations 1992."
  },
  {
    id: 2,
    question: "According to HSE guidelines, what is the maximum safe lifting weight for men under ideal conditions?",
    options: [
      "20kg",
      "25kg",
      "30kg",
      "No specific limit"
    ],
    correctAnswer: 1,
    explanation: "HSE guidelines suggest a maximum of 25kg for men and 16kg for women under ideal conditions, but risk assessment should always be conducted for loads over 5kg."
  },
  {
    id: 3,
    question: "Which of these is the most common cause of trips on electrical installations?",
    options: [
      "Poor lighting conditions",
      "Trailing leads and cables across walkways",
      "Uneven floor surfaces",
      "Wet or slippery floors"
    ],
    correctAnswer: 1,
    explanation: "Trailing leads and tools across walkways are the most common trip hazard on electrical jobs, easily prevented by proper cable management."
  },
  {
    id: 4,
    question: "What is the correct lifting technique for heavy items?",
    options: [
      "Bend your back and keep legs straight",
      "Bend your knees and keep the load close to your body",
      "Lift as quickly as possible",
      "Always lift alone to maintain control"
    ],
    correctAnswer: 1,
    explanation: "Safe lifting requires bending your knees (not your back), keeping the load close to your body, maintaining straight spine, and avoiding twisting movements."
  },
  {
    id: 5,
    question: "Under the Manual Handling Operations Regulations 1992, employers must:",
    options: [
      "Eliminate manual handling tasks where possible",
      "Provide basic lifting training only",
      "Set maximum weight limits for all workers",
      "Allow workers to decide their own lifting limits"
    ],
    correctAnswer: 0,
    explanation: "The regulations require employers to avoid hazardous manual handling where reasonably practicable, assess remaining risks, and reduce risks to the lowest level reasonably practicable."
  },
  {
    id: 6,
    question: "What percentage of construction injuries are caused by slips and trips?",
    options: [
      "15%",
      "25%",
      "Over 30%",
      "45%"
    ],
    correctAnswer: 2,
    explanation: "Slips and trips account for over 30% of injuries in construction, making them the most common cause of workplace accidents."
  },
  {
    id: 7,
    question: "Which environmental factor is most important when assessing a manual handling task?",
    options: [
      "Room temperature",
      "Noise levels",
      "Space constraints and floor conditions",
      "Lighting colour"
    ],
    correctAnswer: 2,
    explanation: "Space constraints, floor conditions, stairs, doorways, and weather conditions significantly affect the safety of manual handling operations."
  },
  {
    id: 8,
    question: "True or False: Good housekeeping is primarily about keeping the workplace tidy for appearances.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False. Good housekeeping is fundamentally about safety and accident prevention, not appearance. It prevents slips, trips, and creates a safer working environment."
  }
];

const Section2_5: React.FC = () => {
  console.log("Section2_5 component loaded");
  
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-white/80 hover:text-foreground active:text-foreground p-0 -ml-1"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <AlertTriangle className="w-6 h-6 text-foreground" />
            </div>
            <Badge
              variant="outline"
              className="border-elec-yellow/30 text-elec-yellow"
            >
              Section 2.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Slip, Trip and Manual Handling Risks
          </h1>
          <p className="text-white/80">
            Preventing the most common workplace injuries in electrical work. Manual Handling Operations Regulations 1992 and workplace safety standards.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Slip/Trip Risks:</strong> Wet surfaces, uneven floors, cables, poor lighting are major hazards.</li>
                <li><strong>Manual Handling:</strong> Use TILE method - Task, Individual, Load, Environment assessment.</li>
                <li><strong>Prevention:</strong> Good housekeeping, proper lifting techniques, adequate lighting.</li>
                <li>Poor practices lead to musculoskeletal injuries and fall accidents.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Wet floors, trailing cables, poor lighting, heavy equipment, cluttered walkways.</li>
                <li><strong>Use:</strong> TILE assessment, lifting aids, proper footwear, team lifts for heavy items.</li>
                <li><strong>Check:</strong> Clear walkways, adequate lighting, non-slip surfaces, lifting technique.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Identify common slip, trip and manual handling risks in electrical work environments</li>
            <li>Apply the TILE method to assess manual handling tasks</li>
            <li>Implement effective housekeeping measures to prevent accidents</li>
            <li>Demonstrate proper lifting techniques and use of mechanical aids</li>
            <li>Recognise when tasks require team lifting or mechanical assistance</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Slip and Trip Risks */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <TrendingDown className="w-5 h-5" /> Slip and Trip Risks
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div>
                <p className="font-medium mb-2">Common Hazards & Prevention</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium mb-1">Slip Hazards</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Wet or damp surfaces from cleaning, spills, or weather</li>
                      <li>Oily or greasy surfaces in plant rooms or machinery areas</li>
                      <li>Smooth surfaces with inadequate grip</li>
                      <li>Contaminated floors (dust, debris, liquids)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Trip Hazards</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Trailing cables and extension leads</li>
                      <li>Uneven or damaged flooring</li>
                      <li>Tools and equipment left in walkways</li>
                      <li>Changes in floor level without adequate marking</li>
                      <li>Poor lighting creating hidden hazards</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Contributing Factors</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Inappropriate footwear for the work environment</li>
                      <li>Rushing or distraction during tasks</li>
                      <li>Poor housekeeping standards</li>
                      <li>Inadequate lighting levels</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Prevention Measures</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Use appropriate non-slip footwear</li>
                      <li>Clean up spills immediately</li>
                      <li>Route cables safely or use cable protectors</li>
                      <li>Maintain adequate lighting (minimum 200 lux for general areas)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* Manual Handling Risks */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Package className="w-5 h-5" /> Manual Handling Risks
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div>
                <p className="font-medium mb-2">Risk Assessment & Prevention</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium mb-1">Common Manual Handling Tasks</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Lifting and moving electrical panels and distribution boards</li>
                      <li>Carrying tools, cable drums, and conduit</li>
                      <li>Installing overhead equipment (lights, cable trays)</li>
                      <li>Moving materials in confined spaces</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Risk Factors</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Heavy loads (panels can weigh 50kg+)</li>
                      <li>Awkward shapes and unbalanced loads</li>
                      <li>Repetitive lifting and carrying</li>
                      <li>Working in confined or restricted spaces</li>
                      <li>Poor lifting technique</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Potential Injuries</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Back injuries (most common musculoskeletal disorder)</li>
                      <li>Shoulder and neck strain from overhead work</li>
                      <li>Muscle and ligament damage from overexertion</li>
                      <li>Hernias from sudden strain or poor technique</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Weight Guidelines</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Men: Maximum 25kg for most situations</li>
                      <li>Women: Maximum 16kg for most situations</li>
                      <li>Reduced limits for frequent lifting or awkward positions</li>
                      <li>Team lift required for loads over 30kg</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* The TILE Method */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <CheckSquare className="w-5 h-5" /> The TILE Method
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div>
                <p className="font-medium mb-2">Systematic Risk Assessment Approach</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium mb-1">T - Task Assessment</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>What needs to be lifted or moved?</li>
                      <li>How often will the task be repeated?</li>
                      <li>What lifting technique is required?</li>
                      <li>Are there time constraints or deadlines?</li>
                      <li>Does the task involve twisting or reaching?</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">I - Individual Capability</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Physical capability and fitness level</li>
                      <li>Training and experience with manual handling</li>
                      <li>Any existing injuries or health issues</li>
                      <li>Current fatigue levels and work schedule</li>
                      <li>Age considerations and physical limitations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">L - Load Characteristics</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Weight of the item (use scales if unknown)</li>
                      <li>Size and shape (bulky, awkward dimensions)</li>
                      <li>Whether it has adequate grip points</li>
                      <li>If contents might shift during lifting</li>
                      <li>Temperature of load (hot equipment)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">E - Environment Assessment</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Space available for lifting and manoeuvring</li>
                      <li>Floor conditions (level, non-slip, obstacles)</li>
                      <li>Adequate lighting levels (minimum 200 lux)</li>
                      <li>Temperature and ventilation conditions</li>
                      <li>Noise levels affecting communication</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />

          {/* Housekeeping */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Housekeeping
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div>
                <p className="font-medium mb-2">Workplace Organisation & Safety</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium mb-1">General Housekeeping Practices</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Keep walkways clear of tools, cables, and debris</li>
                      <li>Store materials and equipment in designated areas</li>
                      <li>Clean up spills immediately with appropriate methods</li>
                      <li>Ensure adequate lighting in all work areas (200+ lux)</li>
                      <li>Mark changes in floor level clearly with warning tape</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Cable Management</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Use cable protectors or runners across walkways</li>
                      <li>Route cables around edges of rooms where possible</li>
                      <li>Secure cables to prevent movement and tension</li>
                      <li>Use adequate length to avoid stretching or kinking</li>
                      <li>Tape down temporary cables with appropriate tape</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Tool and Material Storage</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Return tools to designated storage after use</li>
                      <li>Stack materials safely and securely against walls</li>
                      <li>Never store items on stairs or in escape routes</li>
                      <li>Use appropriate storage containers for small parts</li>
                      <li>Label storage areas clearly for easy identification</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Daily Workplace Checks</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Inspect walkways for hazards before starting work</li>
                      <li>Check lighting levels are adequate for tasks</li>
                      <li>Ensure first aid and emergency equipment accessible</li>
                      <li>Verify fire exits remain clear and unobstructed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Consequences of Poor Practices */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Consequences of Poor Practices
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-foreground">
              <div>
                <p className="font-medium mb-2">Injury & Legal Consequences</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Musculoskeletal disorders (back injuries are most common workplace injury)</li>
                  <li>Slips, trips and falls causing fractures, sprains, and head injuries</li>
                  <li>Lost time injuries affecting project schedules and costs</li>
                  <li>Legal liability under Health and Safety at Work Act</li>
                  <li>Potential prosecution and unlimited fines for serious breaches</li>
                  <li>Increased insurance premiums and reduced company reputation</li>
                </ul>
              </div>
            </div>
          </section>
        </Card>

        {/* Tools and Equipment */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <HardHat className="w-5 h-5" />
            Tools and Equipment
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-4 bg-elec-yellow/5 border border-elec-yellow/30">
              <p className="font-medium mb-2">Manual Handling Aids</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Trolleys and sack trucks for heavy equipment</li>
                <li>Lifting belts for additional back support</li>
                <li>Conveyor rollers for moving long items</li>
                <li>Team lifting straps for coordinated lifts</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-elec-yellow/5 border border-elec-yellow/30">
              <p className="font-medium mb-2">Safety Equipment</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Non-slip safety footwear with good sole grip</li>
                <li>Cable protectors and warning tape</li>
                <li>Portable lighting for dark areas</li>
                <li>Spill kits for immediate cleanup</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Industry Standards & Compliance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5" />
            Industry Standards & Compliance
          </h2>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-4 bg-elec-yellow/5 border border-elec-yellow/30">
              <p className="font-medium mb-2">Manual Handling Operations Regulations 1992</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Avoid manual handling where possible</li>
                <li>Assess unavoidable manual handling</li>
                <li>Reduce risk of injury</li>
                <li>Provide training and information</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-elec-yellow/5 border border-elec-yellow/30">
              <p className="font-medium mb-2">Health and Safety at Work Act 1974</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Employer duty of care</li>
                <li>Safe working environment</li>
                <li>Adequate training provision</li>
                <li>Worker cooperation requirements</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-elec-yellow/5 border border-elec-yellow/30">
              <p className="font-medium mb-2">Workplace (Health, Safety and Welfare) Regulations 1992</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Adequate lighting requirements</li>
                <li>Safe traffic routes</li>
                <li>Maintenance of workplace</li>
                <li>Cleanliness standards</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Construction className="w-5 h-5" />
            Real-World Case Study
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="font-medium mb-2">The Problem</p>
              <p className="mb-3">
                An electrician suffered a serious back injury while attempting to lift a 45kg distribution board alone. 
                The incident occurred in a cramped plant room with poor lighting and cables trailing across the floor.
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>No TILE assessment conducted</li>
                <li>Exceeded safe lifting limits</li>
                <li>Poor environmental conditions</li>
                <li>No lifting aids available</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-card border border-green-400/30">
              <p className="font-medium mb-2">The Solution</p>
              <p className="mb-3">
                Implementation of proper manual handling procedures and workplace organisation 
                prevented future incidents and improved overall safety performance.
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>TILE assessments for all lifting tasks</li>
                <li>Team lifts for loads over 30kg</li>
                <li>Improved lighting and cable management</li>
                <li>Provision of lifting aids and trolleys</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Frequently asked questions
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-foreground">
            <div>
              <p className="font-medium mb-1">Do I need special training for manual handling?</p>
              <p>Yes, under the Manual Handling Operations Regulations 1992, employers must provide suitable training for manual handling tasks. This includes proper lifting techniques, risk assessment, and when to use mechanical aids.</p>
            </div>
            <div>
              <p className="font-medium mb-1">What should I do if I'm asked to lift something I think is too heavy?</p>
              <p>Stop and assess using TILE method. If in doubt, request mechanical aids (trolley, hoist, crane) or additional personnel. Never risk injury - it's better to take time to do it safely.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Are there specific weight limits I should follow?</p>
              <p>HSE guidelines suggest maximum loads of 25kg for men and 16kg for women under ideal conditions, but any load over 5kg requires risk assessment. The key is considering the task, individual, load and environment.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-8 p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Summary
          </h2>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-4 bg-elec-yellow/5 border border-elec-yellow/30">
              <p className="font-medium mb-2">Risk Identification</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Slip/trip hazards are the most common workplace accidents</li>
                <li>Manual handling causes 25% of workplace injuries</li>
                <li>Poor housekeeping creates multiple hazards</li>
                <li>Environmental factors significantly affect safety</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-elec-yellow/5 border border-elec-yellow/30">
              <p className="font-medium mb-2">TILE Assessment</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Task: What, how often, how far</li>
                <li>Individual: Capability, training, health</li>
                <li>Load: Weight, size, shape, stability</li>
                <li>Environment: Space, floors, lighting</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-elec-yellow/5 border border-elec-yellow/30">
              <p className="font-medium mb-2">Prevention Measures</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Good housekeeping and cable management</li>
                <li>Proper lifting techniques and team lifts</li>
                <li>Use of mechanical aids where possible</li>
                <li>Adequate lighting and clear walkways</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Do's and Don'ts */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Do's and Don'ts</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="space-y-3">
              <h3 className="font-medium text-green-500 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Do's
              </h3>
              <ul className="space-y-2">
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /><span>Conduct TILE assessment before lifting</span></li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /><span>Keep walkways clear of cables and materials</span></li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /><span>Use mechanical aids for heavy items</span></li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /><span>Clean up spills immediately</span></li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /><span>Wear appropriate non-slip footwear</span></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-elec-yellow flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Don'ts
              </h3>
              <ul className="space-y-2">
                <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" /><span>Never lift alone if load exceeds guidelines</span></li>
                <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" /><span>Don't leave cables across walkways</span></li>
                <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" /><span>Avoid rushing or taking shortcuts</span></li>
                <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" /><span>Don't ignore spills or trip hazards</span></li>
                <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" /><span>Never compromise on adequate lighting</span></li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quick Reference Card */}
        <Card className="mb-8 p-6 bg-elec-yellow/5 border border-elec-yellow/30">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quick Reference Card</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div>
              <h3 className="font-medium mb-2">Weight Limits (HSE Guidelines)</h3>
              <ul className="space-y-1">
                <li><strong>Men:</strong> 25kg maximum (ideal conditions)</li>
                <li><strong>Women:</strong> 16kg maximum (ideal conditions)</li>
                <li><strong>Team lift:</strong> Required for loads over 30kg</li>
                <li><strong>Risk assessment:</strong> Required for loads over 5kg</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Emergency Contacts</h3>
              <ul className="space-y-1">
                <li><strong>Emergency:</strong> 999</li>
                <li><strong>HSE:</strong> 0300 003 1647</li>
                <li><strong>Site Safety Officer:</strong> [Local contact]</li>
                <li><strong>First Aid:</strong> [Local contact]</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz 
          questions={mainQuizQuestions}
          title="Section 2.5 Knowledge Check"
        />

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" asChild>
            <Link to="/study-centre/apprentice/level2/module1/section2/2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 2.4
            </Link>
          </Button>
          <Button asChild>
            <Link to="/study-centre/apprentice/level2/module1/section3">
              Next: Section 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Section2_5;
