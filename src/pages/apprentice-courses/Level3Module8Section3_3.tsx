import { useState } from "react";
import { ArrowLeft, ArrowRight, Zap, CheckCircle, AlertTriangle, Brain, Target, Link2, Layers, HelpCircle, Lightbulb, BookOpen, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const Level3Module8Section3_3 = () => {
  useSEO(
    "Memory Techniques - Level 3 Mock Exams & Exam Preparation",
    "Proven memory techniques and mnemonics for retaining key electrical information - acronyms, visual methods, and chunking strategies"
  );

  const [showQuiz, setShowQuiz] = useState(false);

  // Electrical mnemonics data
  const electricalMnemonics = [
    {
      topic: "Safe Isolation Procedure",
      mnemonic: "SLIPPT",
      breakdown: "Seek permission, Locate, Identify, Prove device, Prove dead, Test device again",
      fullMeaning: "The six key steps of safe isolation in order"
    },
    {
      topic: "Cable Colour Code (New)",
      mnemonic: "BrBl = BroBro",
      breakdown: "Brown = Live (Brother), Blue = Neutral",
      fullMeaning: "Remember 'Bro' for Brown/Live connection"
    },
    {
      topic: "Test Sequence",
      mnemonic: "CRISP-ZPR",
      breakdown: "Continuity, Ring, Insulation, SELV/Polarity, then Zs, PFC, RCD",
      fullMeaning: "Dead tests (CRISP) before live tests (ZPR)"
    },
    {
      topic: "Earthing Systems",
      mnemonic: "TT, TN-S, TN-C-S",
      breakdown: "First T = Terra (earth source), Second letter = Neutral arrangement",
      fullMeaning: "T=Terra, N=Neutral to earth at source, S=Separate, C=Combined"
    },
    {
      topic: "RCD Testing",
      mnemonic: "Half, Full, Five",
      breakdown: "Test at 0.5x, 1x, and 5x rated current",
      fullMeaning: "At 0.5x shouldn't trip, at 1x and 5x must trip within limits"
    },
    {
      topic: "Disconnection Times",
      mnemonic: "0.4 for 230, 5 for other",
      breakdown: "0.4s for 230V final circuits, 5s for distribution",
      fullMeaning: "Maximum disconnection times for TN systems"
    },
    {
      topic: "MCB Types",
      mnemonic: "B=3-5, C=5-10, D=10-20",
      breakdown: "Instantaneous trip multipliers for each type",
      fullMeaning: "Type B trips at 3-5x In, C at 5-10x, D at 10-20x"
    },
    {
      topic: "IP Rating Digits",
      mnemonic: "First=Solids, Second=Liquids",
      breakdown: "IP65 = 6 for dust tight, 5 for water jets",
      fullMeaning: "Higher numbers = greater protection"
    }
  ];

  // Memory techniques data
  const memoryTechniques = [
    {
      technique: "Chunking",
      description: "Break large amounts of information into smaller, manageable groups",
      example: "Instead of memorising 18 regulation numbers, group into 3 sets of 6 related topics",
      benefit: "Working memory can hold 7±2 items; chunking increases effective capacity",
      application: "Group cable sizes by application, regulations by chapter"
    },
    {
      technique: "Method of Loci (Memory Palace)",
      description: "Associate information with locations in a familiar place",
      example: "Walk through your house placing test sequence at different rooms: continuity in hallway, insulation in kitchen...",
      benefit: "Spatial memory is powerful and enduring",
      application: "Use for ordered sequences like test procedures"
    },
    {
      technique: "Visual Association",
      description: "Create vivid mental images linking concepts",
      example: "Imagine a BIG Blue Whale swimming in Neutral water (Blue = Neutral)",
      benefit: "Visual memory is stronger than verbal memory",
      application: "Use for colour codes, symbols, component functions"
    },
    {
      technique: "Acronyms and Acrostics",
      description: "Create words or sentences from first letters",
      example: "CRISP-ZPR for test sequence, SLIPPT for safe isolation",
      benefit: "Provides retrieval cues for ordered information",
      application: "Ideal for procedures, sequences, lists"
    },
    {
      technique: "Storytelling",
      description: "Link information into a narrative that flows logically",
      example: "The electron travels from the brown live wire, through the load, returns via the blue neutral...",
      benefit: "Stories engage multiple brain areas and are memorable",
      application: "Circuit operation, fault-finding procedures"
    },
    {
      technique: "Spaced Repetition",
      description: "Review information at increasing intervals",
      example: "Review new material: Day 1, Day 3, Day 7, Day 14, Day 30",
      benefit: "Combats forgetting curve, strengthens long-term memory",
      application: "All topics - use flashcards with scheduled review"
    }
  ];

  // Key values to memorise
  const keyValues = [
    { item: "Minimum IR (230V circuits)", value: "1.0 MΩ", context: "At 500V DC test voltage" },
    { item: "Minimum IR (SELV/PELV)", value: "0.5 MΩ", context: "At 250V DC test voltage" },
    { item: "Continuity test current", value: "≥200 mA", context: "At 4-24V DC" },
    { item: "RCD trip time (1xIΔn)", value: "≤300 ms", context: "General Type AC/A" },
    { item: "RCD trip time (5xIΔn)", value: "≤40 ms", context: "General Type AC/A" },
    { item: "Zs correction factor", value: "×0.8", context: "Apply to tabulated values" },
    { item: "Max disconnection (230V)", value: "0.4 seconds", context: "TN system final circuits" },
    { item: "Max disconnection (dist)", value: "5 seconds", context: "Distribution circuits TN" },
    { item: "Socket outlet height", value: "450-1200 mm", context: "Part M accessibility" },
    { item: "Switch height", value: "450-1200 mm", context: "Part M accessibility" },
    { item: "Cable zones vertical", value: "150 mm", context: "From corners/edges" },
    { item: "Cable zones horizontal", value: "150 mm", context: "From ceiling/floor" }
  ];

  // Common patterns to recognise
  const commonPatterns = [
    {
      pattern: "The 0.4/5 second rule",
      explanation: "0.4s for final circuits (where users interact), 5s for distribution (where only competent persons access)",
      memoryTip: "Final = Fast (0.4), Distribution = Deliberate (5)"
    },
    {
      pattern: "The 80% rule",
      explanation: "Apply 0.8 multiplier to Zs values to account for conductor temperature rise",
      memoryTip: "Hot conductors have higher resistance - allow 20% margin"
    },
    {
      pattern: "The 150mm zone rule",
      explanation: "Safe zones for cables are 150mm from edges, corners, ceilings, and floors",
      memoryTip: "One and a half fists width (approximately 150mm)"
    },
    {
      pattern: "The 1MΩ minimum",
      explanation: "Minimum acceptable insulation resistance for most circuits at 500V DC",
      memoryTip: "1 Meg-ohm = 1 Million ohms = massive resistance (good!)"
    }
  ];

  // Quiz questions
  const quizQuestions = [
    {
      question: "What does the mnemonic SLIPPT stand for in safe isolation?",
      options: [
        "Seek, Locate, Identify, Prove, Prove, Test",
        "Switch, Lock, Isolate, Prove, Post, Test",
        "Safe, Lock, Inspect, Prove, Protect, Test",
        "Seek, Lock, Identify, Post, Prove, Test"
      ],
      correctAnswer: 0,
      explanation: "SLIPPT = Seek permission, Locate supply, Identify circuit, Prove proving device, Prove dead, Test proving device again (the two P's and two T's)."
    },
    {
      question: "In the mnemonic CRISP-ZPR for test sequence, what do the letters represent?",
      options: [
        "Cable, Resistance, Insulation, Safety, Polarity - Zone, Protection, RCD",
        "Continuity, Ring, Insulation, SELV/Polarity - Zs, PFC, RCD",
        "Colour, Resistance, Inspection, Switch, Power - Zero, Phase, Residual",
        "Connection, Rating, Installation, Supply, Power - Zone, Polarity, Resistance"
      ],
      correctAnswer: 1,
      explanation: "CRISP-ZPR represents the test sequence: Continuity, Ring circuit, Insulation resistance, SELV/Polarity (dead tests), then Zs, PFC, RCD (live tests)."
    },
    {
      question: "What is the 'chunking' memory technique?",
      options: [
        "Memorising information in alphabetical order",
        "Breaking large amounts of information into smaller groups",
        "Reading information multiple times",
        "Creating songs from technical data"
      ],
      correctAnswer: 1,
      explanation: "Chunking involves breaking large amounts of information into smaller, manageable groups. This works because working memory can typically hold 7±2 items, and grouping increases effective capacity."
    },
    {
      question: "What is the Method of Loci (Memory Palace)?",
      options: [
        "Memorising by location in a textbook",
        "Associating information with locations in a familiar place",
        "Learning from local electricians",
        "Using GPS coordinates to remember facts"
      ],
      correctAnswer: 1,
      explanation: "The Method of Loci involves mentally placing information at specific locations in a familiar environment (like your home). When recalling, you mentally 'walk through' the space, encountering each piece of information."
    },
    {
      question: "What does the mnemonic 'B=3-5, C=5-10, D=10-20' help you remember?",
      options: [
        "Cable sizes for different loads",
        "MCB instantaneous trip multipliers",
        "RCD operating currents",
        "Fuse ratings"
      ],
      correctAnswer: 1,
      explanation: "This mnemonic helps remember MCB instantaneous trip multipliers: Type B trips at 3-5 times rated current, Type C at 5-10 times, and Type D at 10-20 times rated current."
    },
    {
      question: "According to spaced repetition, when should you review new material after first learning it?",
      options: [
        "Only before the exam",
        "Every day without gaps",
        "Day 1, Day 3, Day 7, Day 14, Day 30",
        "Once a month only"
      ],
      correctAnswer: 2,
      explanation: "Spaced repetition suggests reviewing at increasing intervals: Day 1, Day 3, Day 7, Day 14, Day 30. This combats the forgetting curve and strengthens long-term memory more effectively than massed practice."
    },
    {
      question: "Why is visual association an effective memory technique?",
      options: [
        "Pictures are easier to draw",
        "Visual memory is stronger than verbal memory",
        "It's faster to look at pictures",
        "Everyone prefers images"
      ],
      correctAnswer: 1,
      explanation: "Visual memory is processed by different brain areas and tends to be stronger and longer-lasting than purely verbal memory. Creating vivid mental images helps cement information in long-term memory."
    },
    {
      question: "What does 'TN-C-S' tell you about an earthing system?",
      options: [
        "T=Terra source, N=Neutral combined then separate",
        "Triple Neutral Combined System",
        "Temporary Neutral Connection System",
        "T=Testing, N=Neutral, C=Current, S=Supply"
      ],
      correctAnswer: 0,
      explanation: "In TN-C-S: T=Terra (earth derived from supply), N=Neutral connected to earth at source, C=Combined neutral/earth in supply cable, S=Separate at installation. The letters describe the earthing arrangement."
    },
    {
      question: "What is the '0.4/5 second rule' memory pattern about?",
      options: [
        "RCD testing intervals",
        "Maximum disconnection times for TN systems",
        "Time between tests",
        "Circuit inspection frequency"
      ],
      correctAnswer: 1,
      explanation: "The 0.4/5 second rule refers to maximum disconnection times: 0.4 seconds for final circuits (where users interact) and 5 seconds for distribution circuits (accessed only by competent persons)."
    },
    {
      question: "What memory technique is being used when you create 'CRISP-ZPR'?",
      options: [
        "Visual association",
        "Method of Loci",
        "Acronyms/Acrostics",
        "Storytelling"
      ],
      correctAnswer: 2,
      explanation: "CRISP-ZPR is an acronym - a word or phrase formed from the first letters of items in a list. This provides retrieval cues and makes ordered information easier to recall."
    },
    {
      question: "Why does the 150mm zone rule exist for cable routing?",
      options: [
        "Cables need 150mm spacing for cooling",
        "It creates predictable safe zones to prevent cable damage",
        "150mm is the maximum cable length",
        "Regulations require 150mm from all surfaces"
      ],
      correctAnswer: 1,
      explanation: "The 150mm zones from edges, corners, and fittings create predictable locations where cables can be expected. This reduces the risk of cable damage from subsequent work like drilling."
    },
    {
      question: "What's the benefit of linking information into a narrative (storytelling technique)?",
      options: [
        "Stories are shorter than facts",
        "Stories engage multiple brain areas and are memorable",
        "Examiners prefer story answers",
        "It reduces the amount to learn"
      ],
      correctAnswer: 1,
      explanation: "Storytelling engages multiple brain areas (language, emotion, visualisation) which creates more neural connections and makes information more memorable than isolated facts."
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "I find it hard to create my own mnemonics - any tips?",
      answer: "Start with existing mnemonics like those provided here. For creating your own, use humour, emotion, or absurdity - they're more memorable. The mnemonic doesn't need to make sense to anyone else, just be meaningful to you."
    },
    {
      question: "How many times should I review information to remember it?",
      answer: "Research suggests 5-7 exposures are typically needed for long-term retention. Using spaced repetition (Day 1, 3, 7, 14, 30) is more effective than reviewing 7 times in one session. Quality of engagement matters more than quantity."
    },
    {
      question: "I'm not a visual learner - will visual techniques still work?",
      answer: "The concept of 'learning styles' is largely a myth. Visual memory is strong for everyone - it's how our brains evolved. Even if you prefer reading, creating mental images will enhance your memory. Try it before dismissing it."
    },
    {
      question: "Should I use memory techniques for everything?",
      answer: "No - reserve intensive techniques for information that's hard to remember or frequently needed. For information you naturally understand or that follows logical patterns, understanding is often sufficient. Use techniques strategically."
    },
    {
      question: "What if I forget the mnemonic itself?",
      answer: "This can happen if you learn too many at once. Start with a few key mnemonics and ensure they're well-established before adding more. Also, understanding the underlying concept provides a backup if the mnemonic fails."
    },
    {
      question: "Can I use these techniques in the exam itself?",
      answer: "Absolutely. Many candidates quickly jot down key mnemonics on scrap paper at the start of the exam while they're fresh. This 'memory dump' provides a reference throughout the exam and reduces anxiety about forgetting."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Exam Tips
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 flex items-center justify-center border border-elec-yellow/20">
              <Brain className="w-6 h-6 text-elec-yellow" />
            </div>
            <div>
              <p className="text-sm text-elec-yellow font-medium">Section 3.3</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Memory Techniques</h1>
            </div>
          </div>
          <p className="text-lg text-white/70">
            Master proven memory techniques and electrical-specific mnemonics to retain key information for your exams and practical work.
          </p>
        </div>

        {/* Quick Summary Box */}
        <div className="bg-gradient-to-br from-elec-yellow/10 to-transparent border border-elec-yellow/20 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            Quick Summary
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-white/80 text-sm"><span className="text-elec-yellow font-medium">Mnemonics:</span> SLIPPT, CRISP-ZPR, BrBl=BroBro</p>
              <p className="text-white/80 text-sm"><span className="text-elec-yellow font-medium">Key technique:</span> Visual association for lasting memory</p>
            </div>
            <div className="space-y-2">
              <p className="text-white/80 text-sm"><span className="text-elec-yellow font-medium">Chunking:</span> Group related information together</p>
              <p className="text-white/80 text-sm"><span className="text-elec-yellow font-medium">Repetition:</span> Review at increasing intervals</p>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <ul className="space-y-3">
            {[
              "Apply electrical-specific mnemonics for key procedures and values",
              "Understand different memory techniques and when to use them",
              "Create effective mental associations for difficult-to-remember information",
              "Use spaced repetition to strengthen long-term retention",
              "Recognise common patterns in electrical regulations and values"
            ].map((outcome, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 1: Electrical Mnemonics */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">1</span>
            <h2 className="text-xl font-bold text-white">Electrical Mnemonics</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80">
              These mnemonics have been developed specifically for electrical qualifications. They provide memorable shortcuts for complex procedures and frequently-tested values. Learn these and you'll have reliable recall for key exam topics.
            </p>
          </div>

          {/* Mnemonics Grid */}
          <div className="space-y-3 mb-6">
            {electricalMnemonics.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium">{item.topic}</h4>
                  <span className="px-3 py-1 bg-elec-yellow/20 text-elec-yellow font-bold rounded">{item.mnemonic}</span>
                </div>
                <p className="text-white/70 text-sm mb-1">{item.breakdown}</p>
                <p className="text-white/50 text-xs">{item.fullMeaning}</p>
              </div>
            ))}
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-green-400 font-medium mb-1">Exam Day Tip: Memory Dump</h4>
                <p className="text-white/70 text-sm">At the start of the exam, quickly write your key mnemonics on scrap paper while they're fresh. This creates a reference for the entire exam and reduces anxiety about forgetting.</p>
              </div>
            </div>
          </div>

          <InlineCheck
            question="Using the SLIPPT mnemonic, what comes after 'Prove the proving device'?"
            answer="Prove dead (the second 'P'). After proving your voltage indicator works on a known live source, you prove the circuit dead by testing all conductors. Then you Test the proving device again (the second 'T') to confirm it still works."
          />
        </section>

        {/* Section 2: Memory Techniques */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">2</span>
            <h2 className="text-xl font-bold text-white">Proven Memory Techniques</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80">
              These techniques are backed by cognitive science research. Different techniques work better for different types of information. Understanding when to use each one will help you remember more efficiently.
            </p>
          </div>

          {/* Techniques Grid */}
          <div className="space-y-4 mb-6">
            {memoryTechniques.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    {index === 0 && <Layers className="w-4 h-4 text-elec-yellow" />}
                    {index === 1 && <Image className="w-4 h-4 text-elec-yellow" />}
                    {index === 2 && <Image className="w-4 h-4 text-elec-yellow" />}
                    {index === 3 && <Link2 className="w-4 h-4 text-elec-yellow" />}
                    {index === 4 && <BookOpen className="w-4 h-4 text-elec-yellow" />}
                    {index === 5 && <Brain className="w-4 h-4 text-elec-yellow" />}
                  </div>
                  <div>
                    <h4 className="text-elec-yellow font-medium">{item.technique}</h4>
                    <p className="text-white/70 text-sm">{item.description}</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 mb-2">
                  <p className="text-white/50 text-xs mb-1">Example:</p>
                  <p className="text-white/80 text-sm">{item.example}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-start gap-1">
                    <span className="text-green-400">Why it works:</span>
                    <span className="text-white/60">{item.benefit}</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="text-blue-400">Best for:</span>
                    <span className="text-white/60">{item.application}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-amber-400 font-medium mb-1">Quality Over Quantity</h4>
                <p className="text-white/70 text-sm">Don't try to use every technique for every piece of information. Choose the right technique for the content type. Over-elaborate systems become a burden rather than a help.</p>
              </div>
            </div>
          </div>

          <InlineCheck
            question="What technique would be most effective for remembering the correct order of the test sequence?"
            answer="Acronyms (like CRISP-ZPR) or the Method of Loci would be most effective for ordered sequences. Acronyms provide retrieval cues for the order, while Method of Loci lets you mentally walk through the sequence in a familiar space."
          />
        </section>

        {/* Section 3: Key Values to Memorise */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">3</span>
            <h2 className="text-xl font-bold text-white">Key Values to Memorise</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80">
              Certain values appear repeatedly in exams and practical work. Having these committed to memory saves time in the exam and demonstrates competence. Focus on understanding the context as well as the number.
            </p>
          </div>

          {/* Key Values Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/10">
                  <th className="border border-white/20 px-3 py-2 text-left text-white text-sm">Item</th>
                  <th className="border border-white/20 px-3 py-2 text-left text-elec-yellow text-sm">Value</th>
                  <th className="border border-white/20 px-3 py-2 text-left text-white/60 text-sm">Context</th>
                </tr>
              </thead>
              <tbody>
                {keyValues.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white/5" : ""}>
                    <td className="border border-white/20 px-3 py-2 text-white/80 text-sm">{item.item}</td>
                    <td className="border border-white/20 px-3 py-2 text-elec-yellow font-medium text-sm">{item.value}</td>
                    <td className="border border-white/20 px-3 py-2 text-white/60 text-sm">{item.context}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h4 className="text-white font-medium mb-3">Memory Trick: The "1" Pattern</h4>
            <p className="text-white/70 text-sm mb-2">Notice how many key values contain "1":</p>
            <ul className="space-y-1 text-white/60 text-sm">
              <li>- 1.0 MΩ (minimum IR)</li>
              <li>- 1x IΔn (RCD test current)</li>
              <li>- 150mm (cable zones)</li>
              <li>- 1200mm (maximum switch height)</li>
            </ul>
          </div>

          <InlineCheck
            question="What is the minimum insulation resistance for SELV circuits, and why is it different from standard circuits?"
            answer="SELV circuits require minimum 0.5 MΩ at 250V DC (compared to 1.0 MΩ at 500V DC for standard circuits). The lower values are because SELV operates at extra-low voltage, so lower insulation standards are acceptable, and the lower test voltage protects sensitive low-voltage equipment."
          />
        </section>

        {/* Section 4: Recognising Patterns */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">4</span>
            <h2 className="text-xl font-bold text-white">Recognising Patterns</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80">
              Electrical regulations follow logical patterns. Once you recognise these patterns, you can often work out answers even if you haven't memorised the specific value. Understanding the 'why' behind rules helps you remember and apply them correctly.
            </p>
          </div>

          {/* Patterns */}
          <div className="space-y-4 mb-6">
            {commonPatterns.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="text-elec-yellow font-medium mb-2">{item.pattern}</h4>
                <p className="text-white/70 text-sm mb-2">{item.explanation}</p>
                <div className="bg-green-500/10 rounded-lg p-2">
                  <p className="text-green-400/80 text-xs flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" />
                    Memory tip: {item.memoryTip}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <Link2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-blue-400 font-medium mb-1">Connect Related Concepts</h4>
                <p className="text-white/70 text-sm">The 0.4s rule, Zs values, and protective device characteristics are all connected. Lower Zs = higher fault current = faster disconnection. Understanding this relationship helps you remember and apply all three concepts.</p>
              </div>
            </div>
          </div>

          <InlineCheck
            question="Why is the disconnection time for distribution circuits (5s) longer than for final circuits (0.4s)?"
            answer="Distribution circuits (like main switchgear) are only accessed by competent persons who understand the risks. Final circuits (sockets, lights) are used by the general public including children. Faster disconnection is needed where untrained people may contact faulty equipment."
          />
        </section>

        {/* Practical Guidance Box */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Memory Building Action Plan
          </h3>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Week 1-2: Foundation</h4>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>- Learn the key mnemonics (SLIPPT, CRISP-ZPR)</li>
                <li>- Create flashcards for key values</li>
                <li>- Begin spaced repetition schedule</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Week 3-4: Reinforcement</h4>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>- Create visual associations for difficult items</li>
                <li>- Build your Memory Palace for test sequence</li>
                <li>- Test yourself without notes</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Week 5+: Application</h4>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>- Use mnemonics in practice questions</li>
                <li>- Identify which techniques work best for you</li>
                <li>- Create your own mnemonics for weak areas</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-elec-yellow" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                <h4 className="text-white font-medium mb-2">{faq.question}</h4>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reference Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Reference - Essential Mnemonics</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Safe Isolation</span>
                <span className="text-elec-yellow font-medium">SLIPPT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Test Sequence</span>
                <span className="text-elec-yellow font-medium">CRISP-ZPR</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Colour Code</span>
                <span className="text-elec-yellow font-medium">BrBl=BroBro</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">MCB Types</span>
                <span className="text-elec-yellow font-medium">B=3-5, C=5-10, D=10-20</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">RCD Testing</span>
                <span className="text-elec-yellow font-medium">Half, Full, Five</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Disconnection</span>
                <span className="text-elec-yellow font-medium">0.4 for 230, 5 for dist</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Test Your Knowledge</h3>
          {!showQuiz ? (
            <div className="text-center">
              <p className="text-white/70 mb-4">Ready to test your memory techniques knowledge?</p>
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90"
              >
                Start Quiz (12 Questions)
              </Button>
            </div>
          ) : (
            <Quiz
              questions={quizQuestions}
              onComplete={() => setShowQuiz(false)}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
            <Link to="../section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Question Analysis Techniques
            </Link>
          </Button>
          <Button className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90" asChild>
            <Link to="../section3-4">
              Next: Stress Management
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module8Section3_3;
