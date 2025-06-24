
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
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Professional Language Builder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white">
            Practice converting informal language into professional workplace communication.
          </p>

          <div className="space-y-3">
            <Label htmlFor="category" className="text-elec-yellow">Category</Label>
            <select 
              id="category"
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded bg-elec-dark border border-elec-yellow/30 text-white"
            >
              {Object.entries(phraseCategories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="phrase-input" className="text-elec-yellow">Enter an informal phrase:</Label>
            <Input
              id="phrase-input"
              value={currentPhrase}
              onChange={(e) => handlePhraseInput(e.target.value)}
              placeholder="Type how you might naturally say something..."
              className="bg-elec-dark border-elec-yellow/30 text-white"
            />
          </div>

          {suggestion && (
            <Card className="border-green-500/30 bg-green-500/10">
              <CardHeader>
                <CardTitle className="text-green-300 text-sm flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Professional Alternative
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-200">{suggestion}</p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-2 pt-4">
            <Button onClick={getRandomExample} variant="outline">
              Get Example
            </Button>
            <Button variant="outline" onClick={onBack}>
              Back to Tools
            </Button>
          </div>

          <Card className="border-blue-500/30 bg-blue-500/10">
            <CardContent className="pt-4">
              <h4 className="text-blue-300 font-medium mb-2">Tips for Professional Communication:</h4>
              <ul className="text-blue-200 text-sm space-y-1">
                <li>• Use "please" and "thank you" regularly</li>
                <li>• Avoid slang and casual expressions</li>
                <li>• Be specific rather than vague</li>
                <li>• Frame problems with solutions</li>
                <li>• Show respect for others' expertise</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalLanguageBuilder;
