
import { CultureModule } from "./types";

interface ModuleExamplesTabProps {
  module: CultureModule;
}

const ModuleExamplesTab = ({ module }: ModuleExamplesTabProps) => {
  return (
    <div className="space-y-4">
      {module.content.examples.map((example, index) => (
        <div key={index} className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20">
          <h4 className="font-medium mb-2">Situation: {example.situation}</h4>
          <div className="space-y-3 mt-4">
            <div className="pl-4 border-l-2 border-green-500">
              <p className="text-sm text-green-400 mb-1">Effective Approach:</p>
              <p className="text-elec-light/90">{example.rightApproach}</p>
            </div>
            <div className="pl-4 border-l-2 border-red-500">
              <p className="text-sm text-red-400 mb-1">Less Effective Approach:</p>
              <p className="text-elec-light/90">{example.wrongApproach}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleExamplesTab;
