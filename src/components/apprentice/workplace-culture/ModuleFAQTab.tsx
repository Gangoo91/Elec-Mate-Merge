
import { CultureModule } from "./types";

interface ModuleFAQTabProps {
  module: CultureModule;
}

const ModuleFAQTab = ({ module }: ModuleFAQTabProps) => {
  const { questions } = module.content;

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">FAQ content for this module is coming soon</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((item, index) => (
        <div key={index} className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20">
          <h4 className="font-medium text-elec-yellow mb-2">{item.question}</h4>
          <p className="text-elec-light/90">{item.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default ModuleFAQTab;
