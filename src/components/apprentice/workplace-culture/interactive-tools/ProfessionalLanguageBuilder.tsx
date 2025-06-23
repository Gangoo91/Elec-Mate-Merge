
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lightbulb, Volume2, BookOpen, Target, RotateCcw } from "lucide-react";

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
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'safety': return 'bg-red-500/20 text-red-300';
      case 'tools': return 'bg-blue-500/20 text-blue-300';
      case 'processes': return 'bg-purple-500/20 text-purple-300';
      case 'communication': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
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
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={() => setMode('browse')} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Learning
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-white">Quiz Complete!</h2>
              <p className="text-muted-foreground">Your vocabulary knowledge results</p>
            </div>
          </div>

          <Card className="border-green-500/20 bg-green-500/10">
            <CardHeader>
              <CardTitle className="text-green-300 text-center">Final Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-6xl font-bold text-green-400 mb-4">
                {quizScore}/5
              </div>
              <p className="text-green-200">
                {quizScore >= 4 ? "Excellent vocabulary knowledge!" :
                 quizScore >= 3 ? "Good understanding, keep learning!" :
                 "Keep studying those terms!"}
              </p>
              <div className="flex gap-4 justify-center mt-6">
                <Button onClick={startQuiz} className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button variant="outline" onClick={() => setMode('browse')}>
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

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setMode('browse')} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Learning
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-white">Vocabulary Quiz</h2>
            <p className="text-muted-foreground">Question {quizQuestion + 1} of 5</p>
          </div>
        </div>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white">What does this definition describe?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-500/10 rounded-lg p-4 mb-6">
              <p className="text-blue-100 text-lg font-medium">{currentTerm.definition}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizOptions.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`p-4 h-auto ${
                    selectedAnswer === option.term
                      ? option.term === currentTerm.term
                        ? 'border-green-500 bg-green-500/20 text-green-300'
                        : 'border-red-500 bg-red-500/20 text-red-300'
                      : selectedAnswer && option.term === currentTerm.term
                      ? 'border-green-500 bg-green-500/20 text-green-300'
                      : ''
                  }`}
                  onClick={() => handleQuizAnswer(option.term)}
                  disabled={selectedAnswer !== null}
                >
                  {option.term}
                </Button>
              ))}
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-muted-foreground">
                Score: {quizScore}/{quizQuestion + (selectedAnswer ? 1 : 0)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mode === 'flashcards') {
    const currentTerm = filteredTerms[currentTermIndex];
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setMode('browse')} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Learning
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-white">Flashcard Study</h2>
            <p className="text-muted-foreground">Card {currentTermIndex + 1} of {filteredTerms.length}</p>
          </div>
        </div>

        <Card className="border-elec-yellow/20 bg-elec-gray cursor-pointer" onClick={() => setShowDefinition(!showDefinition)}>
          <CardContent className="p-8 text-center min-h-[300px] flex flex-col justify-center">
            {!showDefinition ? (
              <div>
                <h3 className="text-4xl font-bold text-elec-yellow mb-4">{currentTerm.term}</h3>
                <div className="flex justify-center gap-2 mb-4">
                  <Badge className={getDifficultyColor(currentTerm.difficulty)} variant="outline">
                    {currentTerm.difficulty}
                  </Badge>
                  <Badge className={getCategoryColor(currentTerm.category)} variant="outline">
                    {currentTerm.category}
                  </Badge>
                </div>
                <p className="text-muted-foreground">Click to reveal definition</p>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">{currentTerm.term}</h3>
                <p className="text-lg text-muted-foreground mb-4">{currentTerm.definition}</p>
                <div className="bg-blue-500/10 rounded-lg p-4">
                  <p className="text-blue-200"><strong>Usage:</strong> {currentTerm.context}</p>
                </div>
                <p className="text-muted-foreground mt-4">Click to hide definition</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => {
              setCurrentTermIndex(Math.max(0, currentTermIndex - 1));
              setShowDefinition(false);
            }}
            disabled={currentTermIndex === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={() => {
              setCurrentTermIndex(Math.min(filteredTerms.length - 1, currentTermIndex + 1));
              setShowDefinition(false);
            }}
            disabled={currentTermIndex === filteredTerms.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white">Professional Language Builder</h2>
          <p className="text-muted-foreground">Build your electrical industry vocabulary</p>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-500/20 bg-blue-500/10 cursor-pointer hover:border-blue-500/40 transition-colors" onClick={() => setMode('browse')}>
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Browse Terms</h3>
            <p className="text-sm text-blue-200">Explore vocabulary by category</p>
          </CardContent>
        </Card>
        
        <Card className="border-green-500/20 bg-green-500/10 cursor-pointer hover:border-green-500/40 transition-colors" onClick={() => setMode('flashcards')}>
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Flashcards</h3>
            <p className="text-sm text-green-200">Study with interactive cards</p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-yellow/10 cursor-pointer hover:border-elec-yellow/40 transition-colors" onClick={startQuiz}>
          <CardContent className="p-6 text-center">
            <Lightbulb className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Take Quiz</h3>
            <p className="text-sm text-yellow-200">Test your knowledge</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Card className="border-muted/20 bg-muted/5">
        <CardHeader>
          <CardTitle className="text-white">Filter by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="justify-between"
              >
                {category.label}
                <Badge variant="secondary" className="ml-2">
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
          <Card key={term.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-elec-yellow flex items-center gap-2">
                    {term.term}
                    <Button size="sm" variant="ghost" className="p-1 h-auto">
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  </CardTitle>
                  <div className="flex gap-2 mt-2">
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
            <CardContent>
              <p className="text-muted-foreground mb-3">{term.definition}</p>
              <div className="bg-blue-500/10 rounded-lg p-3">
                <p className="text-blue-200 text-sm"><strong>Usage:</strong> {term.context}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalLanguageBuilder;
