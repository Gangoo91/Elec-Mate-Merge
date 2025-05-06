
import React from "react";
import { SubsectionProps } from "../../content/subsection1_1/types";
import Subsection3_1 from "../../content/Subsection3_1";
import Subsection3_2 from "../../content/Subsection3_2";
import Subsection3_3 from "../../content/Subsection3_3";

export const renderSection3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  switch (subsectionId) {
    case "3.1":
      return (
        <Subsection3_1
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "3.2":
      return (
        <Subsection3_2
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "3.3":
      return (
        <Subsection3_3
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    default:
      return null;
  }
};
