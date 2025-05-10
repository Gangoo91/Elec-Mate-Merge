
import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useConceptExplainer } from "./concept-explainer/useConceptExplainer";
import ConceptForm from "./concept-explainer/ConceptForm";
import ExplanationDisplay from "./concept-explainer/ExplanationDisplay";

const ConceptExplainer = () => {
  const {
    query,
    setQuery,
    explanation,
    isLoading,
    isModalOpen,
    handleConceptExplain,
    toggleModal,
  } = useConceptExplainer();

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Concept Explainer
        </CardTitle>
        <CardDescription>
          Get clear explanations of complex electrical concepts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Ask questions about any electrical theory or practical concept and receive easy-to-understand
          explanations based on UK standards and regulations.
        </p>
        
        {isModalOpen ? (
          <div className="space-y-4">
            <ConceptForm 
              query={query}
              setQuery={setQuery}
              isLoading={isLoading}
              onExplain={handleConceptExplain}
              onClose={toggleModal}
            />

            <ExplanationDisplay 
              explanation={explanation}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <Button className="w-full" onClick={toggleModal}>
            Open Explainer
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ConceptExplainer;
