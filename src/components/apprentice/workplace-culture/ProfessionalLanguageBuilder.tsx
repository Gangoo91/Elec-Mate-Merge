
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Lightbulb } from "lucide-react";

interface ProfessionalLanguageBuilderProps {
  onBack: () => void;
}

const ProfessionalLanguageBuilder = ({ onBack }: ProfessionalLanguageBuilderProps) => {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [category, setCategory] = useState("general");

  const phraseCategories = {
    general: "General Communication",
    safety: "Safety Discussions",
    technical: "Technical Explanations",
    client: "Client Interactions"
  };

  const phraseSuggestions: Record<string, Record<string, string>> = {
    general: {
      "i don't know": "I'm not certain about that. Let me check and get back to you.",
      "that's wrong": "I think there might be a different approach we could consider.",
      "i can't do it": "I'd like to discuss the best way to approach this task.",
      "whatever": "I understand. Could you help me understand the preferred method?"
    },
    safety: {
      "that's dangerous": "I have some safety concerns about this approach. Could we discuss alternatives?",
      "you're not wearing ppe": "I noticed we might need additional PPE for this task. Shall we check the requirements?",
      "this site is messy": "Could we take a moment to improve the housekeeping in this area for safety?"
    },
    technical: {
      "this cable goes here": "This cable should be routed to the designated termination point according to the drawings.",
      "turn off the power": "We need to isolate the electrical supply and confirm it's dead before proceeding.",
      "test it": "We should carry out the appropriate electrical tests as specified in BS 7671."
    },
    client: {
      "it's broken": "I've identified an issue that needs attention. Let me explain the problem and solution.",
      "pay more": "There are additional requirements that weren't in the original scope. May I explain the necessary work?",
      "not my problem": "I'd be happy to help you understand how we can resolve this situation."
    }
  };

  const handlePhraseInput = (phrase: string) => {
    setCurrentPhrase(phrase);
    const lowercasePhrase = phrase.toLowerCase();
    const suggestions = phraseSuggestions[category];
    
    for (const [informal, professional] of Object.entries(suggestions)) {
      if (lowercasePhrase.includes(informal)) {
        setSuggestion(professional);
        return;
      }
    }
    setSuggestion("");
  };

  const getRandomExample = () => {
    const suggestions = phraseSuggestions[category];
    const phrases = Object.entries(suggestions);
    const randomIndex = Math.floor(Math.random() * phrases.length);
    const [informal, professional] = phrases[randomIndex];
    
    setCurrentPhrase(informal);
    setSuggestion(professional);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-purple-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
              <BookOpen className="h-5 w-5 text-purple-400" />
            </div>
            Professional Language Builder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 relative">
          <p className="text-white/70">
            Practice converting informal language into professional workplace communication.
          </p>

          <div className="space-y-3">
            <Label htmlFor="category" className="text-purple-400 font-medium">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/10 border border-purple-500/30 text-white focus:border-purple-500/50 focus:outline-none transition-colors"
            >
              {Object.entries(phraseCategories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="phrase-input" className="text-purple-400 font-medium">Enter an informal phrase:</Label>
            <Input
              id="phrase-input"
              value={currentPhrase}
              onChange={(e) => handlePhraseInput(e.target.value)}
              placeholder="Type how you might naturally say something..."
              className="h-12 bg-white/10 border-purple-500/30 text-white focus:border-purple-500/50 rounded-xl"
            />
          </div>

          {suggestion && (
            <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/30 animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Lightbulb className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-green-400 font-semibold mb-2">Professional Alternative</h4>
                  <p className="text-white/80">{suggestion}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              onClick={getRandomExample}
              variant="outline"
              className="h-11 border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/10 text-purple-400 touch-manipulation active:scale-95 transition-all"
            >
              Get Example
            </Button>
            <Button
              variant="outline"
              onClick={onBack}
              className="h-11 border-white/20 hover:border-purple-500/50 hover:bg-purple-500/10 touch-manipulation active:scale-95 transition-all"
            >
              Back to Tools
            </Button>
          </div>

          <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <h4 className="text-blue-400 font-semibold mb-3">Tips for Professional Communication:</h4>
            <ul className="space-y-2">
              {[
                "Use \"please\" and \"thank you\" regularly",
                "Avoid slang and casual expressions",
                "Be specific rather than vague",
                "Frame problems with solutions",
                "Show respect for others' expertise"
              ].map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalLanguageBuilder;
