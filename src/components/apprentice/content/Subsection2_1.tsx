
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";

const Subsection2_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <p>This content is being updated.</p>
      
      {!isCompleted && (
        <button 
          onClick={markAsComplete}
          className="px-4 py-2 bg-elec-yellow text-elec-dark rounded hover:bg-yellow-400 transition-colors"
        >
          Mark as Complete
        </button>
      )}
    </div>
  );
};

export default Subsection2_1;
