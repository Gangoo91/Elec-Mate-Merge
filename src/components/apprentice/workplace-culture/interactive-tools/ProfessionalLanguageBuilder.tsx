
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lightbulb, Volume2, BookOpen, Target, RotateCcw, Trophy, Zap, Filter } from "lucide-react";

interface ProfessionalLanguageBuilderProps {
  onBack: () => void;
}

interface Term {
  id: string;
  term: string;
  definition: string;
  context: string;
  category: 'tools' | 'safety' | 'communication' | 'processes';
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

const electricalTerms: Term[] = [
  {
    id: '1',
    term: "Isolation",
    definition: "The process of safely disconnecting electrical supply to prevent shock or electrocution",
    context: "Before starting any work: 'I need to isolate this circuit first'",
    category: 'safety',
    difficulty: 'basic'
  },
  {
    id: '2',
    term: "Dead Testing",
    definition: "Testing to confirm there's no electrical supply present",
    context: "After isolation: 'I'll do some dead testing to make sure it's safe'",
    category: 'safety',
    difficulty: 'basic'
  },
  {
    id: '3',
    term: "SWA Cable",
    definition: "Steel Wire Armoured cable - tough cable with steel wire protection",
    context: "For outdoor runs: 'We'll need to run some SWA to the garage'",
    category: 'tools',
    difficulty: 'intermediate'
  },
  {
    id: '4',
    term: "Spurs",
    definition: "Branch circuits that connect to a ring circuit",
    context: "Adding sockets: 'We can add a spur off the ring for that extra socket'",
    category: 'processes',
    difficulty: 'intermediate'
  },
  {
    id: '5',
    term: "Zs Testing",
    definition: "Earth fault loop impedance testing to ensure safety",
    context: "Final testing: 'I need to do the Zs readings for the certificate'",
    category: 'processes',
    difficulty: 'advanced'
  },
  {
    id: '6',
    term: "Chasing",
    definition: "Cutting channels in walls for cables",
    context: "Installation work: 'I'll need to chase out these walls for the cables'",
    category: 'processes',
    difficulty: 'basic'
  },
  {
    id: '7',
    term: "MCB",
    definition: "Miniature Circuit Breaker - protective device that trips on overcurrent",
    context: "Consumer unit work: 'That MCB has tripped, let me check the circuit'",
    category: 'tools',
    difficulty: 'basic'
  },
  {
    id: '8',
    term: "Diversity",
    definition: "The assumption that not all electrical loads will be used simultaneously",
    context: "Design calculations: 'We apply diversity factors when sizing the main cable'",
    category: 'processes',
    difficulty: 'advanced'
  }
];

type Mode = 'browse' | 'quiz' | 'flashcards';

const ProfessionalLanguageBuilder = ({ onBack }: ProfessionalLanguageBuilderProps) => {
  const [mode, setMode] = useState<Mode>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const filteredTerms = selectedCategory === 'all' 
    ? electricalTerms 
    : electricalTerms.filter(term => term.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Terms', count: electricalTerms.length },
    { id: 'safety', label: 'Safety', count: electricalTerms.filter(t => t.category === 'safety').length },
    { id: 'tools', label: 'Tools & Equipment', count: electricalTerms.filter(t => t.category === 'tools').length },
    { id: 'processes', label: 'Processes', count: electricalTerms.filter(t => t.category === 'processes').length },
    { id: 'communication', label: 'Communication', count: electricalTerms.filter(t => t.category === 'communication').length }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'safety': return 'bg-red-500/20 text-red-300';
      case 'tools': return 'bg-blue-500/20 text-blue-300';
      case 'processes': return 'bg-purple-500/20 text-purple-300';
      case 'communication': return 'bg-green-500/20 text-green-300';
      default: return 'bg-white/10 text-white/80';
    }
  };

  const generateQuizOptions = (correctTerm: Term) => {
    const otherTerms = electricalTerms
      .filter(t => t.id !== correctTerm.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = [correctTerm, ...otherTerms].sort(() => Math.random() - 0.5);
    return options;
  };

  const startQuiz = () => {
    setMode('quiz');
    setQuizScore(0);
    setQuizQuestion(0);
    setSelectedAnswer(null);
    setShowQuizResult(false);
  };

  const handleQuizAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const currentTerm = filteredTerms[quizQuestion];
    
    setTimeout(() => {
      if (answer === currentTerm.term) {
        setQuizScore(quizScore + 1);
      }
      
      if (quizQuestion < Math.min(5, filteredTerms.length) - 1) {
        setQuizQuestion(quizQuestion + 1);
        setSelectedAnswer(null);
        setShowQuizResult(false);
      } else {
        setShowQuizResult(true);
      }
    }, 1500);
  };

  if (mode === 'quiz') {
    if (showQuizResult) {
      const isExcellent = quizScore >= 4;
      const isGood = quizScore >= 3;

      return (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => setMode('browse')}
              className="flex items-center gap-2 h-11 border-white/20 hover:border-purple-500/50 hover:bg-purple-500/10 touch-manipulation active:scale-95 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Learning
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-white">Quiz Complete!</h2>
              <p className="text-white/60">Your vocabulary knowledge results</p>
            </div>
          </div>

          <Card className={`bg-gradient-to-br from-elec-gray to-elec-card ${isExcellent ? 'border-green-500/30' : isGood ? 'border-purple-500/30' : 'border-orange-500/30'} overflow-hidden relative`}>
            <div className={`absolute top-0 right-0 w-64 h-64 ${isExcellent ? 'bg-green-500/5' : isGood ? 'bg-purple-500/5' : 'bg-orange-500/5'} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
            <CardHeader className="relative text-center pb-0">
              <div className={`mx-auto p-4 rounded-2xl ${isExcellent ? 'bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30' : isGood ? 'bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30' : 'bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30'} w-fit mb-4`}>
                <Trophy className={`h-10 w-10 ${isExcellent ? 'text-green-400' : isGood ? 'text-purple-400' : 'text-orange-400'}`} />
              </div>
              <CardTitle className="text-white text-2xl">Final Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center relative space-y-6">
              <div>
                <div className={`text-6xl font-bold mb-2 ${isExcellent ? 'text-green-400' : isGood ? 'text-purple-400' : 'text-orange-400'}`}>
                  {quizScore}/5
                </div>
                <div className={`inline-block px-6 py-3 rounded-xl ${isExcellent ? 'bg-green-500/10 border border-green-500/20' : isGood ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-orange-500/10 border border-orange-500/20'}`}>
                  <p className={`${isExcellent ? 'text-green-300' : isGood ? 'text-purple-300' : 'text-orange-300'}`}>
                    {quizScore >= 4 ? "Excellent vocabulary knowledge!" :
                     quizScore >= 3 ? "Good understanding, keep learning!" :
                     "Keep studying those terms!"}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 justify-center pt-4 border-t border-white/10">
                <Button
                  onClick={startQuiz}
                  className="h-11 bg-purple-500 hover:bg-purple-500/90 text-white touch-manipulation active:scale-95 transition-all"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setMode('browse')}
                  className="h-11 border-white/20 hover:border-purple-500/50 hover:bg-purple-500/10 touch-manipulation active:scale-95 transition-all"
                >
                  Continue Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    const currentTerm = filteredTerms[quizQuestion];
    const quizOptions = generateQuizOptions(currentTerm);
    const quizProgress = ((quizQuestion + 1) / 5) * 100;

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setMode('browse')}
            className="flex items-center gap-2 h-11 border-white/20 hover:border-purple-500/50 hover:bg-purple-500/10 touch-manipulation active:scale-95 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learning
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-white">Vocabulary Quiz</h2>
            <p className="text-white/60">Question {quizQuestion + 1} of 5</p>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-purple-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
                  <Lightbulb className="h-5 w-5 text-purple-400" />
                </div>
                <CardTitle className="text-white">What does this definition describe?</CardTitle>
              </div>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                {quizQuestion + 1}/5
              </Badge>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${quizProgress}%` }}
              />
            </div>
          </CardHeader>
          <CardContent className="relative space-y-6">
            <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-blue-100 text-lg font-medium">{currentTerm.definition}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quizOptions.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`p-4 h-auto text-left justify-start transition-all ${
                    selectedAnswer === option.term
                      ? option.term === currentTerm.term
                        ? 'border-green-500 bg-green-500/20 text-green-300'
                        : 'border-red-500 bg-red-500/20 text-red-300'
                      : selectedAnswer && option.term === currentTerm.term
                      ? 'border-green-500 bg-green-500/20 text-green-300'
                      : 'border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10'
                  }`}
                  onClick={() => handleQuizAnswer(option.term)}
                  disabled={selectedAnswer !== null}
                >
                  <span className="font-semibold">{option.term}</span>
                </Button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <div className="text-sm text-white/60">
                Score: <span className="text-purple-400 font-semibold">{quizScore}</span>/{quizQuestion + (selectedAnswer ? 1 : 0)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mode === 'flashcards') {
    const currentTerm = filteredTerms[currentTermIndex];
    const flashcardProgress = ((currentTermIndex + 1) / filteredTerms.length) * 100;

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => setMode('browse')}
            className="flex items-center gap-2 h-11 border-white/20 hover:border-green-500/50 hover:bg-green-500/10 touch-manipulation active:scale-95 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learning
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-white">Flashcard Study</h2>
            <p className="text-white/60">Card {currentTermIndex + 1} of {filteredTerms.length}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${flashcardProgress}%` }}
          />
        </div>

        <Card
          className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20 cursor-pointer hover:border-green-500/40 transition-all overflow-hidden relative min-h-[350px]"
          onClick={() => setShowDefinition(!showDefinition)}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-8 text-center min-h-[350px] flex flex-col justify-center relative">
            {!showDefinition ? (
              <div className="animate-fade-in">
                <div className="mx-auto p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 w-fit mb-6">
                  <Target className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-4xl font-bold text-green-400 mb-6">{currentTerm.term}</h3>
                <div className="flex justify-center gap-2 mb-6">
                  <Badge className={getDifficultyColor(currentTerm.difficulty)} variant="outline">
                    {currentTerm.difficulty}
                  </Badge>
                  <Badge className={getCategoryColor(currentTerm.category)} variant="outline">
                    {currentTerm.category}
                  </Badge>
                </div>
                <p className="text-white/80 text-sm">Tap to reveal definition</p>
              </div>
            ) : (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-white mb-4">{currentTerm.term}</h3>
                <p className="text-lg text-white/70 mb-6">{currentTerm.definition}</p>
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-left">
                  <p className="text-blue-300 text-sm"><strong className="text-blue-400">Usage:</strong> {currentTerm.context}</p>
                </div>
                <p className="text-white/80 text-sm mt-6">Tap to hide definition</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setCurrentTermIndex(Math.max(0, currentTermIndex - 1));
              setShowDefinition(false);
            }}
            disabled={currentTermIndex === 0}
            className="flex-1 h-11 border-white/20 hover:border-green-500/50 hover:bg-green-500/10 disabled:opacity-50 touch-manipulation active:scale-95 transition-all"
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              setCurrentTermIndex(Math.min(filteredTerms.length - 1, currentTermIndex + 1));
              setShowDefinition(false);
            }}
            disabled={currentTermIndex === filteredTerms.length - 1}
            className="flex-1 h-11 bg-green-500 hover:bg-green-500/90 text-black disabled:opacity-50 touch-manipulation active:scale-95 transition-all"
          >
            Next
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2 h-11 border-white/20 hover:border-purple-500/50 hover:bg-purple-500/10 touch-manipulation active:scale-95 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white">Professional Language Builder</h2>
          <p className="text-white/60">Build your electrical industry vocabulary</p>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20 cursor-pointer hover:border-blue-500/40 transition-all overflow-hidden relative group"
          onClick={() => setMode('browse')}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-6 text-center relative">
            <div className="mx-auto p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 w-fit mb-4">
              <BookOpen className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Browse Terms</h3>
            <p className="text-sm text-white/60">Explore vocabulary by category</p>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20 cursor-pointer hover:border-green-500/40 transition-all overflow-hidden relative group"
          onClick={() => setMode('flashcards')}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-6 text-center relative">
            <div className="mx-auto p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 w-fit mb-4">
              <Target className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Flashcards</h3>
            <p className="text-sm text-white/60">Study with interactive cards</p>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-elec-gray to-elec-card border-purple-500/20 cursor-pointer hover:border-purple-500/40 transition-all overflow-hidden relative group"
          onClick={startQuiz}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardContent className="p-6 text-center relative">
            <div className="mx-auto p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 w-fit mb-4">
              <Lightbulb className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Take Quiz</h3>
            <p className="text-sm text-white/60">Test your knowledge</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-white/10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
              <Filter className="h-4 w-4 text-purple-400" />
            </div>
            Filter by Category
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`h-9 transition-all touch-manipulation active:scale-95 ${
                  selectedCategory === category.id
                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                    : 'border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10'
                }`}
              >
                {category.label}
                <Badge
                  variant="outline"
                  className={`ml-2 ${
                    selectedCategory === category.id
                      ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                      : 'bg-white/5 text-white/60 border-white/10'
                  }`}
                >
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Terms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map((term) => (
          <Card key={term.id} className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 hover:border-elec-yellow/40 transition-all overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-elec-yellow flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-elec-yellow/10">
                      <Zap className="h-4 w-4 text-elec-yellow" />
                    </div>
                    {term.term}
                    <Button size="sm" variant="ghost" className="p-1 h-auto hover:bg-elec-yellow/10">
                      <Volume2 className="h-3 w-3 text-white/80" />
                    </Button>
                  </CardTitle>
                  <div className="flex gap-2 mt-3">
                    <Badge className={getDifficultyColor(term.difficulty)} variant="outline">
                      {term.difficulty}
                    </Badge>
                    <Badge className={getCategoryColor(term.category)} variant="outline">
                      {term.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-white/70 mb-4">{term.definition}</p>
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <p className="text-blue-300 text-sm"><strong className="text-blue-400">Usage:</strong> {term.context}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalLanguageBuilder;
