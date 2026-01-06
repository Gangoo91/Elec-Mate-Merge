import { ArrowLeft, ArrowRight, MessageCircle, Target, CheckCircle2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quizQuestions = [
  {
    id: 1,
    question: "What is a common cause of misunderstandings on site?",
    options: [
      "Poorly explained instructions",
      "Good teamwork",
      "Clear drawings",
      "Proper planning"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "Give two signs that a misunderstanding may have occurred.",
    options: [
      "Fast work completion and happy workers",
      "Confused expressions and work done incorrectly",
      "Clear instructions and good progress",
      "Quiet site and efficient work"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What should you do if you are unsure of an instruction?",
    options: [
      "Guess what is meant",
      "Stop and ask for clarification immediately",
      "Continue working and hope for the best",
      "Ask a colleague to guess"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Explain the 'Repeat Back' method.",
    options: [
      "Saying instructions louder",
      "Summarising instructions back to the supervisor to confirm accuracy",
      "Writing down everything said",
      "Asking someone else to repeat"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Why is it important to clarify conflicting instructions?",
    options: [
      "To waste time",
      "To avoid mistakes and ensure the correct task is carried out",
      "To show off knowledge",
      "To create more confusion"
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "What resource should you refer to if instructions are unclear?",
    options: [
      "Social media",
      "Site drawings, specifications, or BS 7671 regulations",
      "Personal opinion",
      "Previous job experience only"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "How can clarification improve teamwork?",
    options: [
      "It creates more work",
      "It builds trust and ensures everyone works to the same standard",
      "It slows down progress",
      "It causes arguments"
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "True or False: Asking questions shows you are inexperienced.",
    options: [
      "True - it shows weakness",
      "False — it shows professionalism and commitment to safety",
      "True - experienced workers never ask questions",
      "False - but only if asked quietly"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What is the risk of not asking for clarification?",
    options: [
      "Nothing happens",
      "Errors, rework, delays, and possible safety hazards",
      "Work gets completed faster",
      "Supervisors are impressed"
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "What should you do if technical jargon is used and you don't understand it?",
    options: [
      "Pretend to understand",
      "Ask for simpler terms or request to see a drawing",
      "Ignore it completely",
      "Ask a random colleague"
    ],
    correctAnswer: 1
  }
];

const quickCheckQuestions = [
  {
    id: "clarify1",
    question: "What should you do if you receive unclear instructions?",
    options: [
      "Guess what is meant and start working",
      "Ask for clarification immediately before starting work",
      "Wait until you make a mistake then ask",
      "Ask a colleague to interpret"
    ],
    correctIndex: 1,
    explanation: "Always ask for clarification immediately if instructions are unclear. Guessing can lead to errors, rework, and potential safety hazards."
  },
  {
    id: "clarify2", 
    question: "What is the 'Repeat Back' method?",
    options: [
      "Repeating instructions word for word",
      "Summarising instructions back to confirm understanding",
      "Writing down every instruction",
      "Asking someone else to repeat instructions"
    ],
    correctIndex: 1,
    explanation: "The 'Repeat Back' method involves summarising instructions in your own words to confirm you've understood correctly, helping prevent misunderstandings."
  },
  {
    id: "clarify3",
    question: "How should you respond if two supervisors give conflicting instructions?",
    options: [
      "Follow the first instruction received",
      "Politely explain the conflict and ask which should take priority",
      "Ignore both instructions",
      "Choose the easier instruction to follow"
    ],
    correctIndex: 1,
    explanation: "When instructions conflict, politely bring this to attention and ask for clarification on which takes priority to avoid mistakes and confusion."
  },
  {
    id: "clarify4",
    question: "Why is it professional to ask questions when unsure?",
    options: [
      "It shows you're not paying attention",
      "It demonstrates commitment to doing the job correctly and safely",
      "It proves you're inexperienced",
      "It wastes everyone's time"
    ],
    correctIndex: 1,
    explanation: "Asking questions when unsure shows professionalism, commitment to safety, and ensures work is done correctly the first time."
  }
];

const Module5Section6_4 = () => {
  useSEO(
    "Resolving Misunderstandings and Asking for Clarification | Electrical Training",
    "Learn how to spot and resolve misunderstandings and effectively ask for clarification in electrical work to ensure safety and accuracy."
  );

  const faqs = [
    {
      question: "Won't asking questions make me look inexperienced?",
      answer: "No — asking questions shows professionalism and a commitment to safety. Experienced professionals always clarify when unsure."
    },
    {
      question: "What if two supervisors give conflicting instructions?",
      answer: "Politely explain the conflict and ask which instruction should take priority. This prevents mistakes and shows good communication skills."
    },
    {
      question: "How do I clarify something if I don't understand technical jargon?",
      answer: "Ask for it to be explained in simpler terms or request to see a drawing. Most supervisors appreciate when workers ensure they understand correctly."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 rounded ">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow mb-2">
                Section 5.6.4
              </Badge>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Resolving Misunderstandings and Asking for Clarification
              </h1>
              <p className="text-white mt-2">
                Essential skills for clear communication and preventing errors on site
              </p>
            </div>
          </div>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Always clarify if unsure — don't assume</li>
                <li>Use the "Repeat Back" method to confirm instructions</li>
                <li>Ask specific, polite questions</li>
                <li>Stop work if instructions conflict or seem unsafe</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Confused expressions or hesitation from colleagues</li>
                <li><strong>Use:</strong> "Repeat Back" method for confirmation</li>
                <li><strong>Check:</strong> Against drawings and specifications when uncertain</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-2xl font-bold mb-4 text-white">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">
            By the end of this subsection, you will be able to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Recognise signs of miscommunication on site</li>
            <li>Use effective techniques to ask for clarification</li>
            <li>Apply strategies to resolve misunderstandings quickly</li>
            <li>Appreciate the importance of clear communication to prevent errors and accidents</li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-white">Content / Learning</h2>
          
          {/* Section 1 - Blue */}
          <div className="border-l-4 border-l-elec-yellow p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-elec-yellow text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-3">
                  Causes of Misunderstandings
                </h3>
                <p className="text-base text-white mb-3">
                  On construction sites, communication breakdowns can happen easily. Understanding the common causes helps prevent them:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-white mb-2"><strong>Communication Issues:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Poorly explained instructions or unclear technical language</li>
                      <li>Use of jargon without checking understanding</li>
                      <li>Assumptions made instead of checking facts</li>
                      <li>Information passed through multiple people</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Environmental Factors:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Noise or distractions on site affecting concentration</li>
                      <li>Poor lighting making drawings difficult to read</li>
                      <li>Time pressure leading to rushed explanations</li>
                      <li>Multiple tasks being explained at once</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Personal Factors:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Cultural or language differences affecting understanding</li>
                      <li>Different levels of experience and knowledge</li>
                      <li>Reluctance to admit not understanding</li>
                      <li>Fatigue affecting concentration and comprehension</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 - Green */}
          <div className="border-l-4 border-l-green-500 p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-green-600 mb-3">
                  Spotting Signs of Misunderstanding
                </h3>
                <p className="text-base text-white mb-3">
                  Early recognition of misunderstandings prevents errors and accidents:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-white mb-2"><strong>Verbal and Non-Verbal Signs:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Confused expressions or hesitation from team members</li>
                      <li>Requests to repeat instructions multiple times</li>
                      <li>Vague responses like "I think so" or "probably"</li>
                      <li>Body language showing uncertainty or confusion</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Work Performance Indicators:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Work being done incorrectly or differently than instructed</li>
                      <li>Repeated questions on the same task</li>
                      <li>Lack of progress due to uncertainty</li>
                      <li>Unusual delays or apparent avoidance of tasks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
          <Separator className="my-6" />

          {/* Section 3 - Purple */}
          <div className="border-l-4 border-l-purple-500 p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-purple-600 mb-3">
                  Asking for Clarification Effectively
                </h3>
                <p className="text-base text-white mb-3">
                  Professional communication techniques ensure clarity and prevent mistakes:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-white mb-2"><strong>The "Repeat Back" Method:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Summarise instructions in your own words for confirmation</li>
                      <li>Example: "Just to confirm, you want this conduit run along the ceiling and dropped into the riser?"</li>
                      <li>Helps identify misunderstandings before work begins</li>
                      <li>Shows active listening and professionalism</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Effective Questioning Techniques:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Be polite and professional — avoid sounding confrontational</li>
                      <li>Ask for examples, drawings, or demonstrations if unsure</li>
                      <li>Confirm deadlines and priorities clearly</li>
                      <li>Request specific information rather than general explanations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Professional Language:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Use phrases like "Could you clarify..." rather than "I don't understand"</li>
                      <li>Focus on the task, not the person giving instructions</li>
                      <li>Keep questions short, clear, and specific</li>
                      <li>Thank supervisors for their time and clarification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
          <Separator className="my-6" />

          {/* Section 4 - Orange */}
          <div className="border-l-4 border-l-orange-500 p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                4
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-orange-600 mb-3">
                  Strategies for Resolving Misunderstandings
                </h3>
                <p className="text-base text-white mb-3">
                  When misunderstandings occur, quick and effective resolution is essential:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-white mb-2"><strong>Immediate Actions:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Stop work if unsure — mistakes cost time and can be unsafe</li>
                      <li>Acknowledge the misunderstanding without blaming anyone</li>
                      <li>Seek clarification from the original source of instructions</li>
                      <li>Document the clarification to prevent future confusion</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Reference Materials:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Refer back to site drawings, specifications, or method statements</li>
                      <li>Check against BS 7671 Wiring Regulations when applicable</li>
                      <li>Use manufacturer's instructions for specific equipment</li>
                      <li>Consult site-specific safety procedures and protocols</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Escalation Procedures:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>If conflicting instructions are given, escalate to the foreman or manager</li>
                      <li>Ask supervisors or experienced colleagues for confirmation</li>
                      <li>Request written clarification for complex or critical tasks</li>
                      <li>Follow site hierarchy for decision-making</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />

          {/* Section 5 - Teal */}
          <div className="border-l-4 border-l-teal-500 bg-teal-500/5 p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                5
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-teal-600 mb-3">
                  Benefits of Clarification
                </h3>
                <p className="text-base text-white mb-3">
                  Effective clarification provides multiple benefits for individuals, teams, and projects:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-white mb-2"><strong>Safety and Quality Benefits:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Prevents errors and rework, saving time and materials</li>
                      <li>Reduces the risk of accidents caused by misunderstandings</li>
                      <li>Ensures work meets specifications and quality standards</li>
                      <li>Improves compliance with safety regulations and procedures</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Professional and Team Benefits:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Strengthens teamwork and trust between colleagues</li>
                      <li>Demonstrates professionalism and commitment to quality</li>
                      <li>Builds reputation for reliability and attention to detail</li>
                      <li>Creates a positive work environment where questions are welcomed</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Project Benefits:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Saves time and reduces costs through fewer mistakes</li>
                      <li>Keeps projects on schedule and within budget</li>
                      <li>Improves client satisfaction with quality outcomes</li>
                      <li>Reduces stress and pressure on all team members</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[3]} />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-start gap-3 mb-4">
            <Target className="w-6 h-6 text-elec-yellow mt-1" />
            <h2 className="text-2xl font-bold text-white">Practical Guidance</h2>
          </div>
          <div className="space-y-4 text-base text-white">
            <p><strong>If instructions are unclear, always ask immediately rather than guessing.</strong> Guessing can lead to costly errors and safety risks.</p>
            
            <p><strong>Use the "Repeat Back" method:</strong> summarise instructions to confirm understanding. For example: "So you want me to install three sockets on this wall, with the cables run behind the plasterboard?"</p>
            
            <p><strong>Keep questions short, clear, and specific.</strong> Instead of "I don't understand," ask "Could you show me exactly where this cable should terminate?"</p>
            
            <p><strong>Avoid blaming language — focus on the task, not the person.</strong> Say "Could you clarify the connection sequence?" rather than "You didn't explain this properly."</p>
            
            <p><strong>When in doubt, check against drawings or the BS 7671 Wiring Regulations.</strong> These provide authoritative guidance when verbal instructions are unclear.</p>
          </div>
        </Card>

        {/* Real World Example */}
        <Card className="mb-8 p-6 bg-transparent border-white/20">
          <h2 className="text-2xl font-bold mb-4 text-white">Real World Example</h2>
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-red-800 text-elec-yellow mb-2">Communication Breakdown</h3>
            <p className="text-base text-white">
              An apprentice is told to "terminate the cable in the distribution board." He assumes this means connecting it to the main switch, but the supervisor intended it to be connected to an outgoing circuit breaker. Because he didn't clarify, the result was a wasted hour of rework and an unnecessary safety risk.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Successful Resolution</h3>
            <p className="text-base text-white">
              By simply repeating back the instruction for confirmation - "Just to confirm, you want me to connect this cable to the main switch in the board?" - the mistake would have been avoided. The supervisor could then clarify: "No, connect it to the spare MCB in position 6."
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-elec-yellow pl-4">
                <h3 className="font-semibold text-white mb-2">Q: {faq.question}</h3>
                <p className="text-white">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-gradient-to-br from-card/10 to-elec-yellow/10 border-elec-yellow/30">
          <div className="flex items-start gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-elec-yellow mt-1" />
            <h2 className="text-2xl font-bold text-white">Pocket Guide</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base">
            <div>
              <h3 className="font-semibold text-white mb-2">Quick Clarification Steps:</h3>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li>Always clarify if unsure — don't assume</li>
                <li>Use the "Repeat Back" method to confirm instructions</li>
                <li>Ask specific, polite questions</li>
                <li>Stop work if instructions conflict or seem unsafe</li>
                <li>Check against drawings and specifications</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Professional Phrases:</h3>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li>"Could you clarify..."</li>
                <li>"Just to confirm..."</li>
                <li>"Could you show me exactly where..."</li>
                <li>"Is this correct..."</li>
                <li>"Which should take priority..."</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-600 mt-1" />
            <h2 className="text-2xl font-bold text-white">Recap</h2>
          </div>
          <p className="text-base text-white mb-4">In this subsection, you've learned:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Common causes and signs of misunderstandings on construction sites</li>
            <li>Effective ways to ask for clarification professionally and politely</li>
            <li>Strategies to resolve confusion quickly and safely before errors occur</li>
            <li>Why clarification is vital for saving time, avoiding rework, and ensuring safety</li>
          </ul>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Test Your Knowledge: Resolving Misunderstandings" />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../6-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Communicating Faults, Risks, and Task Progress
            </Link>
          </Button>
          <Button asChild>
            <Link to="../6-5">
              Next: Documentation and Record Keeping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section6_4;