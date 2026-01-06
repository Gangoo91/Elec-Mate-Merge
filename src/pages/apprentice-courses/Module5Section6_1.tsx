import { ArrowLeft, ArrowRight, MessageSquare, AlertTriangle, CheckCircle2, Target, BookOpen } from "lucide-react";
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
    question: "Why is clear verbal communication important on site?",
    options: [
      "It prevents mistakes, improves coordination, and reduces risks of accidents",
      "It helps you finish work faster",
      "It impresses supervisors",
      "It's a legal requirement"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "What are the three key characteristics of professional communication?",
    options: [
      "Loud, fast, and technical",
      "Clarity, conciseness, and professionalism",
      "Formal, complex, and detailed",
      "Casual, friendly, and relaxed"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Give one example of technical jargon that might confuse a non-electrician.",
    options: [
      "Using 'cable' instead of 'wire'",
      "Using 'MCB' instead of saying 'circuit breaker'",
      "Using 'socket' instead of 'outlet'",
      "Using 'switch' instead of 'control'"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What should you do before giving verbal instructions?",
    options: [
      "Speak as quickly as possible",
      "Use lots of technical terms",
      "Plan what you need to say and structure it clearly",
      "Assume everyone understands"
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "What does it mean to be concise?",
    options: [
      "Using big words to sound professional",
      "Speaking very quietly",
      "Delivering your message quickly and directly, without unnecessary words",
      "Using only technical terminology"
    ],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "How can background noise affect communication?",
    options: [
      "It makes you sound more professional",
      "It can cause misheard instructions and mistakes",
      "It doesn't affect communication",
      "It helps focus attention"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What is the purpose of repeating back instructions?",
    options: [
      "To waste time",
      "To show you're listening",
      "To confirm understanding and avoid errors",
      "To practice speaking"
    ],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "Give one example of professional body language.",
    options: [
      "Looking at your phone while listening",
      "Maintaining eye contact while giving instructions",
      "Crossing your arms",
      "Turning your back to the speaker"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What should you do if you don't understand an instruction?",
    options: [
      "Guess what they meant",
      "Ask for clarification immediately",
      "Ignore it and move on",
      "Ask someone else later"
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "How does active listening help communication?",
    options: [
      "It makes you look busy",
      "It ensures you fully understand the message and can confirm it back",
      "It impresses your supervisor",
      "It saves time"
    ],
    correctAnswer: 1
  }
];

const quickCheckQuestions = [
  {
    id: "comm1",
    question: "What is one benefit of clear verbal communication on site?",
    options: [
      "It makes you sound professional",
      "It prevents mistakes and improves safety",
      "It saves time",
      "It impresses supervisors"
    ],
    correctIndex: 1,
    explanation: "Clear verbal communication prevents mistakes in installation and reduces risks of accidents caused by misheard instructions."
  },
  {
    id: "comm2", 
    question: "Which is a barrier to effective communication on construction sites?",
    options: [
      "Using clear language",
      "Background noise",
      "Maintaining eye contact",
      "Asking questions"
    ],
    correctIndex: 1,
    explanation: "Background noise is common on construction sites and can cause misheard instructions and mistakes."
  },
  {
    id: "comm3",
    question: "What should you do when receiving important instructions?",
    options: [
      "Continue working while listening",
      "Stop what you're doing and give full attention",
      "Wait until later to ask questions",
      "Write it down without confirming"
    ],
    correctIndex: 1,
    explanation: "Active listening requires stopping your current task and giving full attention to ensure you understand the instructions correctly."
  },
  {
    id: "comm4",
    question: "What is the 'who, what, when, where' structure used for?",
    options: [
      "Writing reports",
      "Giving clear instructions",
      "Safety briefings only",
      "Client presentations"
    ],
    correctIndex: 1,
    explanation: "The 'who, what, when, where' structure helps ensure instructions are complete and clear, reducing the chance of misunderstandings."
  }
];

const Module5Section6_1 = () => {
  useSEO(
    "Verbal Communication: Being Clear, Concise, and Professional | Electrical Training",
    "Learn essential verbal communication skills for electricians, including clear instructions, professional tone, and active listening techniques for construction sites."
  );

  const faqs = [
    {
      question: "What if I don't fully understand the instruction?",
      answer: "Always ask for clarification. It's safer to ask twice than to do the job wrong once."
    },
    {
      question: "Is slang acceptable on site?",
      answer: "Light casual talk is fine, but when giving or receiving instructions, always keep it professional."
    },
    {
      question: "How do I handle communication with non-technical people (e.g., clients)?",
      answer: "Avoid technical jargon; explain in plain terms that they can understand."
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
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow mb-2">
                Section 5.6.1
              </Badge>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Verbal Communication: Being Clear, Concise, and Professional
              </h1>
              <p className="text-white mt-2">
                Master essential communication skills for electrical work environments
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
                <li>Clear communication prevents installation mistakes</li>
                <li>Use simple language, avoid unnecessary jargon</li>
                <li>Always confirm understanding by repeating back</li>
                <li>Active listening prevents costly errors</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Plan your words before speaking</li>
                <li><strong>Use:</strong> Check understanding after giving instructions</li>
                <li><strong>Check:</strong> Use "who, what, when, where" structure</li>
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
            <li>Explain why professional verbal communication is essential in electrical work</li>
            <li>Identify common barriers to clear communication on site</li>
            <li>Apply techniques for being concise and professional when speaking with others</li>
            <li>Demonstrate active listening skills to ensure mutual understanding</li>
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
                  Why Clear Verbal Communication Matters
                </h3>
                <p className="text-base text-white mb-3">
                  Effective communication is the foundation of safe and efficient electrical work. Poor communication leads to serious consequences:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-white mb-2"><strong>Safety implications:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Prevents mistakes in installation (e.g., misunderstanding circuit layouts)</li>
                      <li>Reduces risks of accidents caused by misheard instructions</li>
                      <li>Ensures proper isolation procedures are communicated</li>
                      <li>Prevents incorrect tool or material usage</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Project efficiency:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Improves coordination with supervisors, clients, and other trades</li>
                      <li>Reduces time wasted on clarification and rework</li>
                      <li>Ensures materials and tools are available when needed</li>
                      <li>Facilitates smooth handovers between shifts and trades</li>
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
                  Characteristics of Professional Communication
                </h3>
                <p className="text-base text-white mb-3">
                  Professional communication has four key characteristics that distinguish it from casual conversation:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-white mb-2"><strong>Clarity</strong> – Speak in straightforward language</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Avoid unnecessary jargon unless everyone understands it</li>
                      <li>Use specific terms rather than vague descriptions</li>
                      <li>Speak at an appropriate pace and volume</li>
                      <li>Articulate clearly, especially in noisy environments</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Conciseness</strong> – Get to the point quickly</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Deliver your message without rambling</li>
                      <li>Focus on essential information first</li>
                      <li>Avoid unnecessary details that might confuse</li>
                      <li>Structure your message logically</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Professional Tone</strong> – Respectful, calm, and confident</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Maintain composure even under pressure</li>
                      <li>Show respect for all team members regardless of rank</li>
                      <li>Project confidence without appearing arrogant</li>
                      <li>Remain courteous in all interactions</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Accuracy</strong> – Use correct terminology</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Use correct terms (e.g., "distribution board" not "fuse box" if that's the site terminology)</li>
                      <li>Reference specific locations, quantities, and specifications</li>
                      <li>Double-check facts before communicating them</li>
                      <li>Correct any misunderstandings immediately</li>
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
                  Barriers to Effective Communication
                </h3>
                <p className="text-base text-white mb-3">
                  Construction sites present unique challenges to clear communication. Understanding these barriers helps you overcome them:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-white mb-2"><strong>Environmental barriers:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Background noise (common on construction sites)</li>
                      <li>Distance between speaker and listener</li>
                      <li>Poor lighting affecting visual cues</li>
                      <li>Interference from machinery and tools</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Language and cultural barriers:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Technical jargon misunderstood by non-electricians</li>
                      <li>Language or cultural differences</li>
                      <li>Different levels of technical knowledge</li>
                      <li>Regional variations in terminology</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Personal barriers:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Not actively listening or repeating back instructions</li>
                      <li>Assumptions about what others know</li>
                      <li>Stress or time pressure affecting concentration</li>
                      <li>Fear of asking questions or appearing ignorant</li>
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
                  Techniques for Clear and Professional Speech
                </h3>
                <p className="text-base text-white mb-3">
                  Master these practical techniques to improve your verbal communication on site:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-white mb-2"><strong>Preparation techniques:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Plan before you speak – think through what needs to be said</li>
                      <li>Organise information logically (most important first)</li>
                      <li>Consider your audience and their level of knowledge</li>
                      <li>Prepare key points to avoid forgetting important details</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Delivery techniques:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Use simple, short sentences – especially when giving instructions</li>
                      <li>Speak clearly and at appropriate volume for the environment</li>
                      <li>Pause between key points to allow processing</li>
                      <li>Emphasise critical safety information</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Confirmation techniques:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Check understanding – ask the listener to repeat back key instructions</li>
                      <li>Use open questions: "What questions do you have?" not "Do you understand?"</li>
                      <li>Watch for non-verbal cues that suggest confusion</li>
                      <li>Be patient and willing to repeat or rephrase</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Professional presentation:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Maintain eye contact and appropriate body language</li>
                      <li>Avoid filler words (e.g., "um," "like," "you know")</li>
                      <li>Keep a confident but approachable tone</li>
                      <li>Use gestures to support your verbal message</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
          <Separator className="my-6" />

          {/* Section 5 - Cyan */}
          <div className="border-l-4 border-l-cyan-500 p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                5
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-cyan-600 mb-3">
                  Active Listening Skills
                </h3>
                <p className="text-base text-white mb-3">
                  Active listening is just as important as speaking clearly. It ensures you fully understand instructions and can respond appropriately:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-white mb-2"><strong>Physical attention:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Give full attention (don't keep working when someone's talking to you)</li>
                      <li>Face the speaker and maintain appropriate eye contact</li>
                      <li>Put down tools or materials to show you're listening</li>
                      <li>Position yourself where you can hear clearly</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Verbal and non-verbal feedback:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Nod or give verbal cues ("yes," "I understand," "right")</li>
                      <li>Use appropriate facial expressions to show engagement</li>
                      <li>Avoid interrupting unless clarification is urgently needed</li>
                      <li>Signal when you need something repeated</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>Confirmation and clarification:</strong></p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Repeat or paraphrase key points to confirm understanding</li>
                      <li>Ask specific questions about unclear instructions</li>
                      <li>Summarise complex instructions in your own words</li>
                      <li>Confirm timescales, locations, and safety requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[3]} />
          <Separator className="my-6" />

          {/* Section 6 - Practical Application */}
          <div className="border-l-4 border-l-indigo-500 bg-indigo-500/5 p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                6
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-indigo-600 mb-3">
                  Practical Application: The "Who, What, When, Where" Structure
                </h3>
                <p className="text-base text-white mb-3">
                  Use this structured approach for giving clear instructions:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-base text-white mb-2"><strong>WHO:</strong> Address the person specifically</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Use the person's name to get their attention</li>
                      <li>Ensure they are ready to receive the instruction</li>
                      <li>Make sure you have the right person for the task</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>WHAT:</strong> Describe the task clearly</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Be specific about materials (e.g., "2.5mm twin and earth cable")</li>
                      <li>Specify the method or standard required</li>
                      <li>Include any safety considerations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>WHEN:</strong> Set clear timescales</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Give specific deadlines ("before lunch," "by 3pm")</li>
                      <li>Indicate priority level if multiple tasks</li>
                      <li>Allow time for questions and confirmation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-base text-white mb-2"><strong>WHERE:</strong> Specify exact locations</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                      <li>Use specific references ("socket three on the north wall")</li>
                      <li>Reference drawings or room numbers where available</li>
                      <li>Describe route or access requirements if needed</li>
                    </ul>
                  </div>
                  <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-3">
                    <strong>Example:</strong> "John (WHO), I need you to run 2.5mm twin and earth cable from the consumer unit to socket three on the north wall (WHAT), and get it done before lunch (WHEN). Socket three is in the office area, marked on drawing E-02 (WHERE)."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-2xl font-bold mb-4 text-white">Real-World Example</h2>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3">Communication Comparison on a Busy Commercial Site</h3>
                <p className="text-blue-800 mb-4">
                  A project supervisor needs to assign cable installation tasks to two apprentices during the busy morning period when multiple trades are working. Here's how different communication styles affected the outcome:
                </p>
                
                <div className="space-y-4">
                  <div className="bg-[#121212]/50 p-4 rounded border">
                    <h4 className="font-semibold text-blue-700 mb-2">Scenario A - Poor Communication:</h4>
                    <p className="text-sm mb-2"><strong>Supervisor to Apprentice A:</strong> "Run that cable to socket three."</p>
                    <p className="text-sm text-blue-700"><strong>Problems:</strong></p>
                    <ul className="text-sm text-blue-800 ml-4 list-disc space-y-1">
                      <li>No name used - apprentice wasn't sure instruction was for him</li>
                      <li>"That cable" - which cable? Multiple cables available</li>
                      <li>"Socket three" - which room? Multiple socket threes on site</li>
                      <li>No timeframe specified</li>
                      <li>No material specification given</li>
                    </ul>
                  </div>

                  <div className="bg-[#121212]/50 p-4 rounded border">
                    <h4 className="font-semibold text-blue-700 mb-2">Scenario B - Clear Communication:</h4>
                    <p className="text-sm mb-2"><strong>Supervisor to Apprentice B:</strong> "John, I need you to take the 2.5mm twin and earth cable from the consumer unit and run it to socket outlet number three on the north wall of the office area. Please get this completed before lunch break at 12:30. The socket location is marked on drawing E-02, and you'll need to coordinate with the plaster team who are working in that area this morning."</p>
                    <p className="text-sm text-blue-700"><strong>Advantages:</strong></p>
                    <ul className="text-sm text-blue-800 ml-4 list-disc space-y-1">
                      <li>Personal address - "John" got his attention immediately</li>
                      <li>Specific material - "2.5mm twin and earth cable"</li>
                      <li>Clear start and end points specified</li>
                      <li>Exact deadline - "before lunch at 12:30"</li>
                      <li>Drawing reference provided for verification</li>
                      <li>Coordination requirement highlighted</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 p-4 rounded border border-red-200">
                    <h4 className="font-semibold text-red-700 mb-2">Result:</h4>
                    <p className="text-red-800 mb-2"><strong>Apprentice A:</strong> Misunderstood the instruction, took 1.5mm cable to socket three in the kitchen area, discovered the error after completion, required 2 hours of rework and caused delay to the kitchen fit-out team.</p>
                    <p className="text-green-800"><strong>Apprentice B:</strong> Completed the task correctly first time, coordinated effectively with other trades, finished 15 minutes early, and was able to help with the next phase of installation.</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded border border-green-200">
                    <h4 className="font-semibold text-green-700 mb-2">Cost Impact:</h4>
                    <ul className="text-sm text-green-800 list-disc ml-4 space-y-1">
                      <li><strong>Poor communication cost:</strong> 2 hours rework + 1 hour delay to other trades = £150 in lost productivity</li>
                      <li><strong>Clear communication benefit:</strong> Task completed efficiently, enabling smooth workflow for entire team</li>
                      <li><strong>Safety bonus:</strong> No confusion meant no safety risks from wrong cable specification</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-emerald-50 rounded border border-blue-200">
                  <p className="text-sm font-semibold text-blue-800">
                    Key Lesson: The extra 30 seconds spent giving clear, complete instructions saved hours of rework and prevented project delays. Clear communication is an investment, not a time cost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-2xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-muted pl-4">
                <h3 className="font-semibold text-white mb-2">Q: {faq.question}</h3>
                <p className="text-white">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-2xl font-bold mb-4 text-white">Pocket Guide</h2>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-white">Be clear, concise, professional</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-white">Speak with confidence and respect</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-white">Avoid jargon unless everyone understands it</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-white">Always check understanding (repeat back if needed)</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-white">Practice active listening – stop, focus, confirm</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-2xl font-bold mb-4 text-white">Recap</h2>
          <p className="text-base text-white mb-4">
            In this subsection, you've learned:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Why clear and professional verbal communication is critical</li>
            <li>Common barriers and how to overcome them</li>
            <li>Techniques for giving instructions effectively</li>
            <li>How to actively listen and confirm understanding</li>
          </ul>
        </Card>

        {/* Quiz */}
        <Quiz title="Test Your Knowledge: Verbal Communication" questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to=".." className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Section 6
            </Link>
          </Button>
          <Button asChild>
            <Link to="../6-2" className="flex items-center gap-2">
              Next: Subsection 2
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section6_1;