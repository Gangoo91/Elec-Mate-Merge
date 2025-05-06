
import React from "react";
import { SubsectionProps } from "../../content/subsection1_1/types";
import Subsection5_1 from "../../content/Subsection5_1";
import Subsection5_2 from "../../content/Subsection5_2";
import Subsection5_3 from "../../content/Subsection5_3";

export const renderSection5 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  switch (subsectionId) {
    case "5.1":
      return (
        <Subsection5_1
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "5.2":
      return (
        <Subsection5_2
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "5.3":
      return (
        <Subsection5_3
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    default:
      return null;
  }
};
