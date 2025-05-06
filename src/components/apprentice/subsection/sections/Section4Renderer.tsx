
import React from "react";
import { SubsectionProps } from "../../content/subsection1_1/types";
import Subsection4_1 from "../../content/Subsection4_1";
import Subsection4_2 from "../../content/Subsection4_2";
import Subsection4_3 from "../../content/Subsection4_3";

export const renderSection4 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  switch (subsectionId) {
    case "4.1":
      return (
        <Subsection4_1
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "4.2":
      return (
        <Subsection4_2
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "4.3":
      return (
        <Subsection4_3
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    default:
      return null;
  }
};
