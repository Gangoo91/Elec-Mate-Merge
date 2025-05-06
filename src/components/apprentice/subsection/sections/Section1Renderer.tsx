
import React from "react";
import { SubsectionProps } from "../../content/subsection1_1/types";
import Subsection1_1 from "../../content/Subsection1_1";
import Subsection1_2 from "../../content/Subsection1_2";
import Subsection1_3 from "../../content/Subsection1_3";

export const renderSection1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  switch (subsectionId) {
    case "1.1":
      return (
        <Subsection1_1 
          subsectionId={subsectionId} 
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "1.2":
      return (
        <Subsection1_2 
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      );
    case "1.3":
      return (
        <Subsection1_3 
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      );
    default:
      return null;
  }
};
