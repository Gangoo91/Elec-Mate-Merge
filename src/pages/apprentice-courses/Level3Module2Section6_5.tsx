import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowLeft, ArrowRight, CheckCircle2, XCircle, Zap, Users, Leaf, MessageSquare, Target, Award, Lightbulb, TrendingUp, Heart, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface InlineCheckProps {
  question: string;
  correctAnswer: boolean;
  explanation: string;
}

const InlineCheck = ({ question, correctAnswer, explanation }: InlineCheckProps) => {
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answer: boolean) => {
    setAnswered(answer);
    setShowExplanation(true);
  };

  const isCorrect = answered === correctAnswer;

  return (
    <div className="my-6 p-4 bg-gradient-to-br from-[#1a1a1a] to-[#252525] rounded-xl border border-[#333333]">
      <p className="text-[#f5f5f5] font-medium mb-3">{question}</p>
      {answered === null ? (
        <div className="flex gap-3">
          <button
            onClick={() => handleAnswer(true)}
            className="flex-1 min-h-[44px] bg-green-600/20 hover:bg-green-600/30 text-green-400 py-2 px-4 rounded-lg transition-all duration-200 touch-manipulation active:scale-[0.98]"
          >
            True
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 min-h-[44px] bg-red-600/20 hover:bg-red-600/30 text-red-400 py-2 px-4 rounded-lg transition-all duration-200 touch-manipulation active:scale-[0.98]"
          >
            False
          </button>
        </div>
      ) : (
        <div className={`p-3 rounded-lg ${isCorrect ? "bg-green-600/20 border border-green-500/30" : "bg-red-600/20 border border-red-500/30"}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <span className={isCorrect ? "text-green-400" : "text-red-400"}>
              {isCorrect ? "Correct!" : "Not quite right"}
            </span>
          </div>
          {showExplanation && <p className="text-[#a1a1a1] text-sm">{explanation}</p>}
        </div>
      )}
    </div>
  );
};

const Level3Module2Section6_5 = () => {
  useSEO(
    "6.5 Promoting Sustainability Culture Within Teams - Level 3 Environmental Technologies",
    "Understanding how to promote and embed sustainability practices within electrical contracting teams"
  );

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      question: "Why is 'leading by example' considered the most effective way to promote sustainability in a team?",
      options: [
        "It's the quickest approach",
        "Actions are more convincing than words - team members follow what they see demonstrated",
        "It avoids the need for training",
        "It's the cheapest option"
      ],
      correctAnswer: 1,
      explanation: "People are naturally influenced by observed behaviour. When supervisors and experienced workers consistently demonstrate sustainable practices, it normalises these behaviours and shows they're valued by the organisation. Actions speak louder than instructions or policies."
    },
    {
      question: "What is the 'Toolbox Talk' approach to sustainability communication?",
      options: [
        "Only discussing tools that are eco-friendly",
        "Short, regular team briefings on specific sustainability topics",
        "A formal training course lasting several days",
        "Written policies distributed to team members"
      ],
      correctAnswer: 1,
      explanation: "Toolbox Talks are brief (5-15 minute) informal discussions with the team, often at the start of a shift. They work well for sustainability topics because they're regular, accessible, and can address specific site conditions or recent issues without requiring formal training time."
    },
    {
      question: "Why should sustainability initiatives connect to business benefits when communicating with teams?",
      options: [
        "Environmental arguments are not valid",
        "Staff only care about money",
        "Linking sustainability to cost savings, reputation, and job security makes the case more compelling",
        "It's a legal requirement to mention business benefits"
      ],
      correctAnswer: 2,
      explanation: "While many people are motivated by environmental concerns, connecting sustainability to tangible business benefits - cost savings, client expectations, reputation, competitiveness - reinforces that these practices are good for everyone. It broadens the appeal and shows organisational commitment."
    },
    {
      question: "What is 'gamification' in the context of promoting sustainability?",
      options: [
        "Making sustainability into a competition with no winners",
        "Using game-like elements such as challenges, scores, and recognition to encourage participation",
        "Playing games during breaks instead of working",
        "Creating video games about sustainability"
      ],
      correctAnswer: 1,
      explanation: "Gamification applies game-like elements (points, challenges, leaderboards, rewards) to non-game contexts. In sustainability, this might include team challenges for waste reduction, recognition for ideas implemented, or friendly competition between sites. It makes participation engaging and progress visible."
    },
    {
      question: "Why is it important to celebrate small wins when building a sustainability culture?",
      options: [
        "It's required by health and safety regulations",
        "Small wins build momentum, demonstrate progress, and reinforce that changes are achievable",
        "Large wins are too difficult to achieve",
        "Celebrations are good for team morale regardless of the cause"
      ],
      correctAnswer: 1,
      explanation: "Recognising small successes - a percentage reduction in waste, adoption of a new practice, a cost saving achieved - builds momentum and shows the team that their efforts matter. This positive reinforcement encourages continued engagement and makes larger goals seem achievable."
    },
    {
      question: "What role does 'psychological safety' play in promoting sustainability within teams?",
      options: [
        "It relates only to mental health issues",
        "Team members must feel safe to suggest ideas and report issues without fear of criticism",
        "It means wearing protective equipment",
        "It requires formal counselling services"
      ],
      correctAnswer: 1,
      explanation: "Psychological safety means team members feel comfortable speaking up - suggesting improvements, questioning practices, or reporting problems - without fear of embarrassment or reprisal. This is essential for sustainability because good ideas can come from anyone, and barriers to improvement often aren't visible to management."
    },
    {
      question: "How can apprentices particularly contribute to sustainability culture?",
      options: [
        "They cannot contribute until fully qualified",
        "Fresh perspectives, digital skills, and no ingrained habits make them valuable contributors",
        "Only by following instructions from seniors",
        "By focusing solely on their training"
      ],
      correctAnswer: 1,
      explanation: "Apprentices bring valuable fresh perspectives - they haven't developed 'we've always done it this way' habits. They often have strong digital skills useful for tracking and reporting, and many are personally motivated by environmental concerns. Involving apprentices also develops future sustainability leaders."
    },
    {
      question: "What is 'resistance to change' and how should it be addressed?",
      options: [
        "A technical problem with electrical resistance",
        "Natural reluctance to new practices - address by explaining benefits, involving people in decisions, and making changes gradual",
        "A formal HR disciplinary issue",
        "Something that should be ignored"
      ],
      correctAnswer: 1,
      explanation: "Resistance to change is a natural human response - people prefer familiar practices and may worry about extra work or criticism of past methods. Address it by explaining the 'why', involving team members in how changes are implemented, starting with easy wins, and acknowledging valid concerns."
    },
    {
      question: "Why should sustainability be integrated into existing processes rather than added as a separate layer?",
      options: [
        "Separate initiatives are always more expensive",
        "Integration into daily routines makes sustainability feel natural rather than an extra burden",
        "It's required by law to integrate all initiatives",
        "Separate processes are illegal"
      ],
      correctAnswer: 1,
      explanation: "When sustainability is woven into existing practices - planning, ordering, site setup, completion routines - it becomes 'how we do things' rather than an additional task. Standalone initiatives often feel like extra work and are more easily neglected when pressure increases."
    },
    {
      question: "What makes 'two-way communication' important for sustainability initiatives?",
      options: [
        "It's more efficient than one-way communication",
        "Feedback from the team identifies practical barriers, generates ideas, and increases buy-in",
        "It's required by employment law",
        "It reduces the need for written documentation"
      ],
      correctAnswer: 1,
      explanation: "Sustainability works best when it's a conversation, not a directive. Frontline workers often see barriers that management doesn't, have practical improvement ideas, and are more engaged when they feel heard. Regular feedback mechanisms (informal and formal) are essential for continuous improvement."
    },
    {
      question: "How can clients be encouraged to support sustainable practices?",
      options: [
        "By hiding the costs of sustainable options",
        "By presenting sustainability as added value, explaining benefits, and offering sustainable choices",
        "By refusing to work with clients who don't prioritise sustainability",
        "Clients cannot influence contractor practices"
      ],
      correctAnswer: 1,
      explanation: "Many clients value sustainability but need it presented clearly. Explain the benefits (cost savings, credentials, property value), offer sustainable alternatives with clear comparisons, and demonstrate your commitment through certifications or case studies. Growing client demand drives industry-wide improvement."
    },
    {
      question: "What is a 'sustainability champion' role within a team?",
      options: [
        "The most senior person automatically becomes champion",
        "Someone designated to promote sustainability, gather ideas, and coordinate initiatives",
        "A role that requires formal environmental qualifications",
        "The person who does the most recycling"
      ],
      correctAnswer: 1,
      explanation: "A sustainability champion is a designated person (not necessarily the most senior) who takes responsibility for promoting sustainability within their team - sharing information, gathering ideas, coordinating improvements, and being a point of contact. Champions don't need to be experts; enthusiasm and commitment matter more."
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "How do I convince sceptical colleagues that sustainability matters?",
      answer: "Focus on practical benefits they care about: cost savings (fuel efficiency reduces expenses), reduced hassle (proper waste management avoids disposal problems), client requirements (sustainability credentials win work), and future-proofing careers (these skills are increasingly valued). Avoid lecturing about environmental doom - connect sustainability to their daily experience. Leading by example is often more persuasive than arguments."
    },
    {
      question: "We're a small company - how can we build sustainability culture without dedicated resources?",
      answer: "Start small and integrate into existing routines. Brief weekly mentions in team meetings. Include sustainability in site inductions. Recognise good practices when you see them. Nominate a sustainability champion (doesn't need to be a separate role). Focus on quick wins that save money. Small companies can actually change culture faster than large ones because communication is more direct and decisions can be made quickly."
    },
    {
      question: "How do I handle team members who see sustainability as 'not my job'?",
      answer: "Acknowledge their concern - many workers feel they have enough to do. Frame sustainability as part of doing the job well, not extra work: good material handling reduces waste, efficient travel saves time, quality work avoids callbacks. Connect it to professionalism. Share examples of how small actions add up. Involve them in deciding how to implement changes so they have ownership. Avoid forcing compliance without explanation."
    },
    {
      question: "What's the best way to maintain momentum once initial enthusiasm fades?",
      answer: "Regular communication keeps sustainability visible - brief updates, recognising achievements, sharing results. Set short-term goals with visible milestones rather than just long-term targets. Vary the focus - different topics, different challenges. Connect to current events or client requirements. Involve different team members in leading initiatives. Review and refresh approaches periodically. Celebrate successes and learn from setbacks."
    },
    {
      question: "How can we measure whether our sustainability culture is improving?",
      answer: "Track practical metrics: waste volumes, recycling rates, fuel consumption, callback rates. But also measure engagement: suggestions submitted, participation in initiatives, awareness survey results. Look for behavioural indicators: are people sorting waste without being reminded? Raising sustainability issues proactively? Asking questions about materials? Culture change is gradual, so track trends over months, not days."
    },
    {
      question: "Should sustainability be linked to performance reviews or bonuses?",
      answer: "It can be, but carefully. Linking to performance shows organisational commitment and ensures accountability. However, purely financial motivation can undermine intrinsic motivation and create gaming behaviour. A balanced approach works best: include sustainability in competencies and expectations, recognise achievement publicly, consider team-based rewards for collective goals, but don't make it solely transactional."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#333333]">
        <div className="flex items-center gap-2 p-3 md:p-4 text-xs md:text-sm text-[#a1a1a1]">
          <Link to="/apprentice-courses/level-3/module-2/section-6" className="hover:text-[#FFD93D] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span>/</span>
          <span>Level 3</span>
          <span>/</span>
          <span>Module 2</span>
          <span>/</span>
          <span className="text-[#FFD93D]">6.5</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden mb-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD93D]/5 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#FFD93D]/10 rounded-lg">
                <Users className="w-8 h-8 text-[#FFD93D]" />
              </div>
              <span className="px-3 py-1 text-xs font-medium bg-[#FFD93D]/10 text-[#FFD93D] rounded-full">
                Section 6.5
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#f5f5f5] mb-3">
              Promoting Sustainability Culture Within Teams
            </h1>
            <p className="text-[#a1a1a1]">
              Understanding how to build, embed, and maintain sustainable practices within electrical contracting teams - turning environmental awareness into everyday behaviour.
            </p>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-[#FFD93D]" />
              <h3 className="font-semibold text-[#f5f5f5]">In 30 Seconds</h3>
            </div>
            <p className="text-sm text-[#a1a1a1]">
              Sustainability culture requires leadership by example, regular communication, employee involvement, and celebration of progress. Focus on integrating sustainable practices into daily routines rather than treating them as separate initiatives. Make it easy to do the right thing, and recognise those who do.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-[#f5f5f5]">Spot it / Use it</h3>
            </div>
            <p className="text-sm text-[#a1a1a1]">
              Start conversations about sustainability during site work. Share tips with colleagues. Ask 'is there a more sustainable way?' when planning work. Suggest improvements - even small ones. Your enthusiasm and example influence others. Culture change starts with individuals choosing to act differently.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Why Culture Matters */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#FFD93D]" />
              Why Culture Matters More Than Policy
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                Policies and procedures can mandate certain behaviours, but genuine sustainability requires people to make good choices even when no one is watching. That's culture - the shared values, assumptions, and habits that guide everyday behaviour. A strong sustainability culture makes environmentally responsible decisions feel natural and normal.
              </p>

              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                <h4 className="font-semibold text-[#f5f5f5] mb-3">Policy vs Culture</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-red-400 font-medium block mb-1">Policy Alone:</span>
                    <p>"We have a recycling policy, but the skips are always contaminated."</p>
                    <p className="mt-2">"The van log says check tyre pressure weekly, but nobody does."</p>
                  </div>
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-green-400 font-medium block mb-1">Policy + Culture:</span>
                    <p>"Everyone here separates waste properly - it's just what we do."</p>
                    <p className="mt-2">"The team reminds each other about fuel efficiency - we all care about our impact."</p>
                  </div>
                </div>
              </div>

              <p>
                <strong className="text-[#f5f5f5]">The business case:</strong> Companies with strong sustainability cultures report better employee engagement, easier recruitment of younger workers, improved client relationships, and often lower costs. Culture creates competitive advantage that policies alone cannot achieve.
              </p>
            </div>
          </section>

          <InlineCheck
            question="A sustainability policy document is sufficient to ensure environmentally responsible behaviour across a team."
            correctAnswer={false}
            explanation="False. Policies set expectations but don't guarantee behaviour. Culture determines what people actually do - especially when facing pressure, time constraints, or competing priorities. Policies are necessary but not sufficient; culture makes them effective."
          />

          {/* Leadership by Example */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#FFD93D]" />
              Leading by Example
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                The most powerful influence on team behaviour is what they see leaders and experienced colleagues doing. If supervisors cut corners on waste segregation, team members learn that sustainability isn't really important. If leaders visibly prioritise environmental practices, the message is clear without needing to be stated.
              </p>

              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                <h4 className="font-semibold text-[#f5f5f5] mb-3">Visible Leadership Actions</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-[#FFD93D] font-medium">On-Site Behaviour:</span>
                    <p className="mt-1">Personally separating waste correctly, turning off equipment when not in use, planning efficient routes, asking about material sustainability when ordering.</p>
                  </div>
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-[#FFD93D] font-medium">Communication:</span>
                    <p className="mt-1">Talking about sustainability regularly (not just during audits), asking team members about their ideas, acknowledging good practices when seen.</p>
                  </div>
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-[#FFD93D] font-medium">Decision Making:</span>
                    <p className="mt-1">Considering environmental factors in purchasing decisions, not overriding sustainable choices for short-term convenience, investing in efficient equipment.</p>
                  </div>
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-[#FFD93D] font-medium">Problem Solving:</span>
                    <p className="mt-1">Treating sustainability issues as seriously as safety issues, seeking solutions rather than blame, learning from incidents.</p>
                  </div>
                </div>
              </div>

              <p>
                <strong className="text-[#f5f5f5]">For apprentices and newer workers:</strong> You can also lead by example. Your enthusiasm and fresh perspective are valuable. When you demonstrate sustainable practices, you influence colleagues around you and help normalise these behaviours across the team.
              </p>
            </div>
          </section>

          {/* Communication Strategies */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#FFD93D]" />
              Effective Communication
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                Communication about sustainability needs to be regular, relevant, and two-way. Occasional memos or annual training aren't enough. Effective communication keeps sustainability visible, shares progress, addresses concerns, and generates ideas.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <h4 className="font-semibold text-[#f5f5f5] mb-2 flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-[#FFD93D]" />
                    Communication Channels
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Toolbox Talks - brief, regular team discussions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Site inductions - include sustainability expectations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Progress updates - share metrics and achievements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Suggestion systems - capture and respond to ideas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Informal conversations - day-to-day reinforcement</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <h4 className="font-semibold text-[#f5f5f5] mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#FFD93D]" />
                    Communication Principles
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Be specific - concrete examples beat vague goals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Explain 'why' - understanding drives commitment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Connect to values - environmental and business</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Listen actively - feedback improves initiatives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Be consistent - sustainability stays on agenda</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-[#FFD93D]/10 rounded-lg border border-[#FFD93D]/30">
                <p className="text-sm text-[#f5f5f5]">
                  <strong>Toolbox Talk tip:</strong> Keep them short (5-10 minutes), focused on one topic, and interactive. Ask questions rather than just presenting. Relate to current site conditions or recent incidents. End with one clear action people can take. Rotate who leads them to spread ownership.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            question="Annual sustainability training is sufficient to maintain environmental awareness in a team."
            correctAnswer={false}
            explanation="False. Annual training helps but isn't enough to sustain culture. Behaviour changes require regular reinforcement through ongoing communication, visible leadership, recognition of good practice, and integration into daily routines. Sustainability needs to stay on the agenda consistently, not just once a year."
          />

          {/* Engagement and Involvement */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#FFD93D]" />
              Employee Engagement and Involvement
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                People are more committed to changes they helped create. Involvement builds ownership, generates better ideas (frontline workers often see barriers and opportunities invisible to management), and reduces resistance to change.
              </p>

              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                <h4 className="font-semibold text-[#f5f5f5] mb-3">Ways to Involve the Team</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-[#252525] rounded">
                    <div className="w-8 h-8 rounded-full bg-[#FFD93D]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#FFD93D] font-bold">1</span>
                    </div>
                    <div>
                      <span className="text-[#f5f5f5] font-medium">Ask for ideas:</span>
                      <p className="text-[#a1a1a1]">Suggestion schemes, brainstorming sessions, 'what would you improve?' discussions. Respond to all suggestions, implement good ones, explain why others weren't taken forward.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#252525] rounded">
                    <div className="w-8 h-8 rounded-full bg-[#FFD93D]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#FFD93D] font-bold">2</span>
                    </div>
                    <div>
                      <span className="text-[#f5f5f5] font-medium">Involve in decisions:</span>
                      <p className="text-[#a1a1a1]">When planning how to implement changes, ask those affected how it might work best. 'How could we make waste sorting easier on this site?' generates better solutions than imposing procedures.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#252525] rounded">
                    <div className="w-8 h-8 rounded-full bg-[#FFD93D]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#FFD93D] font-bold">3</span>
                    </div>
                    <div>
                      <span className="text-[#f5f5f5] font-medium">Sustainability champions:</span>
                      <p className="text-[#a1a1a1]">Designate team members as sustainability champions - points of contact who promote initiatives, gather feedback, and coordinate improvements. Spread the role across the team over time.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#252525] rounded">
                    <div className="w-8 h-8 rounded-full bg-[#FFD93D]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#FFD93D] font-bold">4</span>
                    </div>
                    <div>
                      <span className="text-[#f5f5f5] font-medium">Give ownership:</span>
                      <p className="text-[#a1a1a1]">Let team members lead specific initiatives - someone manages the cable recycling process, another tracks van fuel efficiency. Ownership drives engagement.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                <strong className="text-[#f5f5f5]">Psychological safety:</strong> People will only share ideas and concerns if they feel safe doing so. Create an environment where questions are welcomed, suggestions are considered fairly, and mistakes are learning opportunities rather than blame opportunities. This openness is essential for continuous improvement.
              </p>
            </div>
          </section>

          {/* Recognition and Celebration */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FFD93D]" />
              Recognition and Celebrating Progress
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                Recognition reinforces desired behaviours and shows that sustainability efforts are valued. It doesn't have to be expensive - acknowledgement, thanks, and celebration of milestones are often more meaningful than financial rewards.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <h4 className="font-semibold text-[#f5f5f5] mb-2">What to Recognise</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Good ideas - even if not all are implemented</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Consistent good practice - not just one-off efforts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Progress toward goals - not just final achievement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Team achievements - collective success builds culture</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <h4 className="font-semibold text-[#f5f5f5] mb-2">How to Recognise</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Public acknowledgement - team meetings, noticeboards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Personal thanks - specific, timely, sincere</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Share success stories - newsletters, case studies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Milestone celebrations - mark achievements together</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-[#FFD93D]/10 rounded-lg border border-[#FFD93D]/30">
                <p className="text-sm text-[#f5f5f5]">
                  <strong>Gamification idea:</strong> Create friendly competition - which site has the best waste segregation? Which team improved fuel efficiency most? Display progress visibly. Award 'sustainability star of the month'. Make it fun rather than pressured. Competition engages people who might not respond to environmental arguments alone.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            question="Financial bonuses are the most effective way to motivate sustainable behaviour."
            correctAnswer={false}
            explanation="False. While financial incentives can help, research shows intrinsic motivation (personal values, pride in work, belonging to a responsible team) is more sustainable long-term. Recognition, involvement, and alignment with personal values often matter more. Over-reliance on financial incentives can actually undermine intrinsic motivation."
          />

          {/* Handling Resistance */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FFD93D]" />
              Overcoming Resistance to Change
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                Resistance to change is natural - people prefer familiar practices and may worry about extra work, criticism of past methods, or appearing incompetent with new approaches. Understanding and addressing resistance is essential for successful culture change.
              </p>

              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                <h4 className="font-semibold text-[#f5f5f5] mb-3">Common Concerns and Responses</h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-red-400 font-medium">"I don't have time for this."</span>
                    <p className="mt-1 text-[#a1a1a1]">Response: Show how sustainable practices save time (fewer returns for forgotten materials, less waste management hassle). Integrate into existing routines rather than adding separate tasks.</p>
                  </div>
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-red-400 font-medium">"We've always done it this way."</span>
                    <p className="mt-1 text-[#a1a1a1]">Response: Acknowledge experience but explain why change is needed (client requirements, regulations, costs). Involve experienced workers in how to implement changes - their knowledge is valuable.</p>
                  </div>
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-red-400 font-medium">"It won't make any difference."</span>
                    <p className="mt-1 text-[#a1a1a1]">Response: Show collective impact - small actions multiplied across the team/industry do add up. Share data on improvements achieved. Connect individual actions to bigger picture.</p>
                  </div>
                  <div className="p-3 bg-[#252525] rounded">
                    <span className="text-red-400 font-medium">"It's management's responsibility, not mine."</span>
                    <p className="mt-1 text-[#a1a1a1]">Response: Explain that culture is everyone's responsibility. Frontline workers make hundreds of small decisions daily that management can't control. Sustainability is part of professional competence.</p>
                  </div>
                </div>
              </div>

              <p>
                <strong className="text-[#f5f5f5]">Key principles:</strong> Start with quick wins to build credibility. Listen to concerns genuinely - some resistance highlights real barriers that need addressing. Don't criticise past practices - focus on future improvement. Make it easy to comply - remove practical barriers. Be patient - culture change takes time.
              </p>
            </div>
          </section>

          {/* Sustaining the Culture */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-[#FFD93D]" />
              Making Sustainability Stick
            </h2>
            <div className="space-y-4 text-[#a1a1a1]">
              <p>
                Initial enthusiasm often fades. Sustaining a sustainability culture requires ongoing attention, regular reinforcement, and integration into normal business operations rather than treating it as a special initiative.
              </p>

              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                <h4 className="font-semibold text-[#f5f5f5] mb-3">Long-term Success Factors</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="p-2 bg-[#252525] rounded">
                    <span className="text-[#FFD93D]">Integration:</span>
                    <p className="text-[#a1a1a1]">Embed sustainability into standard procedures, inductions, job planning, purchasing</p>
                  </div>
                  <div className="p-2 bg-[#252525] rounded">
                    <span className="text-[#FFD93D]">Measurement:</span>
                    <p className="text-[#a1a1a1]">Track and report progress - what gets measured gets managed</p>
                  </div>
                  <div className="p-2 bg-[#252525] rounded">
                    <span className="text-[#FFD93D]">Renewal:</span>
                    <p className="text-[#a1a1a1]">Refresh approaches periodically - new challenges, new ideas, new champions</p>
                  </div>
                  <div className="p-2 bg-[#252525] rounded">
                    <span className="text-[#FFD93D]">Connection:</span>
                    <p className="text-[#a1a1a1]">Link to current events, client requirements, industry developments</p>
                  </div>
                  <div className="p-2 bg-[#252525] rounded">
                    <span className="text-[#FFD93D]">Accountability:</span>
                    <p className="text-[#a1a1a1]">Include sustainability in performance discussions and reviews</p>
                  </div>
                  <div className="p-2 bg-[#252525] rounded">
                    <span className="text-[#FFD93D]">Leadership:</span>
                    <p className="text-[#a1a1a1]">Sustained visible commitment from management at all levels</p>
                  </div>
                </div>
              </div>

              <p>
                <strong className="text-[#f5f5f5]">Remember:</strong> Culture change is a journey, not a destination. There will be setbacks - busy periods when sustainability slips down the priority list, new team members who need bringing up to speed, changes that don't work as planned. The key is persistence and continuous improvement, not perfection.
              </p>
            </div>
          </section>

          <InlineCheck
            question="Once a sustainability culture is established, it will maintain itself without ongoing effort."
            correctAnswer={false}
            explanation="False. Culture requires continuous reinforcement. Without ongoing attention - communication, recognition, leadership commitment, integration into processes - old habits gradually return. Sustainability needs to remain visible and valued through regular, sustained effort."
          />

          {/* Quiz Section */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#FFD93D]" />
              Knowledge Check
            </h2>

            {!quizComplete ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-[#a1a1a1]">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-sm text-[#FFD93D]">
                    Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg text-[#f5f5f5] mb-4">
                    {quizQuestions[currentQuestion].question}
                  </h3>

                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full min-h-[44px] text-left p-4 rounded-lg transition-all duration-200 touch-manipulation active:scale-[0.98] ${
                          showResult
                            ? index === quizQuestions[currentQuestion].correctAnswer
                              ? "bg-green-600/20 border-green-500 border"
                              : index === selectedAnswer
                              ? "bg-red-600/20 border-red-500 border"
                              : "bg-[#1a1a1a] border border-[#333333]"
                            : selectedAnswer === index
                            ? "bg-[#FFD93D]/20 border-[#FFD93D] border"
                            : "bg-[#1a1a1a] border border-[#333333] hover:border-[#FFD93D]/50"
                        }`}
                      >
                        <span className="text-[#f5f5f5]">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {showResult && (
                  <div className="mb-4 p-4 rounded-lg bg-[#1a1a1a] border border-[#333333]">
                    <p className="text-[#a1a1a1] text-sm">
                      {quizQuestions[currentQuestion].explanation}
                    </p>
                  </div>
                )}

                {showResult && (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full min-h-[44px] bg-[#FFD93D] text-[#1a1a1a] py-3 px-6 rounded-lg font-semibold hover:bg-[#FFD93D]/90 transition-all duration-200 touch-manipulation active:scale-[0.98]"
                  >
                    {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <div className="text-6xl font-bold text-[#FFD93D] mb-2">
                    {Math.round((score / quizQuestions.length) * 100)}%
                  </div>
                  <p className="text-[#a1a1a1]">
                    You scored {score} out of {quizQuestions.length}
                  </p>
                </div>

                <div className="mb-6 p-4 rounded-lg bg-[#1a1a1a] border border-[#333333]">
                  {score === quizQuestions.length ? (
                    <p className="text-green-400">Perfect score! You understand the principles of building sustainability culture.</p>
                  ) : score >= quizQuestions.length * 0.8 ? (
                    <p className="text-green-400">Great work! You have a strong grasp of culture change principles.</p>
                  ) : score >= quizQuestions.length * 0.6 ? (
                    <p className="text-[#FFD93D]">Good effort! Review the sections on leadership and engagement.</p>
                  ) : (
                    <p className="text-orange-400">Keep learning! Focus on understanding how culture differs from policy.</p>
                  )}
                </div>

                <button
                  onClick={resetQuiz}
                  className="min-h-[44px] bg-[#FFD93D] text-[#1a1a1a] py-3 px-6 rounded-lg font-semibold hover:bg-[#FFD93D]/90 transition-all duration-200 touch-manipulation active:scale-[0.98]"
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </section>

          {/* FAQs */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-[#252525] to-[#1a1a1a] border border-[#333333]">
            <h2 className="text-xl font-bold text-[#f5f5f5] mb-6 flex items-center gap-2">
              <ChevronDown className="w-5 h-5 text-[#FFD93D]" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-[#333333] rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full min-h-[44px] flex items-center justify-between p-4 text-left bg-[#1a1a1a] hover:bg-[#252525] transition-colors touch-manipulation"
                  >
                    <span className="text-[#f5f5f5] font-medium pr-4">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#FFD93D] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#FFD93D] flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="p-4 bg-[#252525] border-t border-[#333333]">
                      <p className="text-[#a1a1a1] text-sm">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section Completion */}
          <section className="p-6 rounded-xl bg-gradient-to-br from-green-900/20 to-[#1a1a1a] border border-green-500/30">
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-[#f5f5f5] mb-2">Section 6 Complete!</h2>
              <p className="text-[#a1a1a1] mb-4">
                You've completed all topics in Section 6: Sustainable Working Practices. You now understand waste management, hazardous disposal, life-cycle thinking, carbon reduction, and building sustainability culture within teams.
              </p>
              <p className="text-sm text-[#a1a1a1]">
                Continue to the next module or review any topics using the navigation below.
              </p>
            </div>
          </section>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Link
            to="/apprentice-courses/level-3/module-2/section-6/6-4"
            className="flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 bg-[#252525] text-[#f5f5f5] rounded-lg border border-[#333333] hover:border-[#FFD93D]/50 transition-all duration-200 touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>6.4 Carbon Footprint</span>
          </Link>
          <Link
            to="/apprentice-courses/level-3/module-2/section-6"
            className="flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 bg-[#FFD93D] text-[#1a1a1a] rounded-lg font-semibold hover:bg-[#FFD93D]/90 transition-all duration-200 touch-manipulation active:scale-[0.98]"
          >
            <span>Back to Section 6 Overview</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Level3Module2Section6_5;
