
import React from "react";
import { SubsectionProps } from "../../content/subsection1_1/types";
import Subsection2_1 from "../../content/Subsection2_1";
import Subsection2_2 from "../../content/Subsection2_2";
import Subsection2_3 from "../../content/Subsection2_3";
import ElectricalSymbolsDisplay from "../../ElectricalSymbolsDisplay";

export const renderSection2 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  switch (subsectionId) {
    case "2.1":
      return (
        <Subsection2_1 
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      );
    case "2.2":
      return (
        <>
          <Subsection2_2 
            subsectionId={subsectionId}
            isCompleted={isCompleted}
            markAsComplete={markAsComplete}
          />
          <ElectricalSymbolsDisplay subsectionId={subsectionId} />
        </>
      );
    case "2.3":
      return (
        <Subsection2_3 
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      );
    default:
      return null;
  }
};
