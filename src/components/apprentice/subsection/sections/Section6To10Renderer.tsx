
import React from "react";
import { SubsectionProps } from "../../content/subsection1_1/types";
import Subsection6_1 from "../../content/Subsection6_1";
import Subsection6_2 from "../../content/Subsection6_2";
import Subsection6_3 from "../../content/Subsection6_3";
import Subsection7_1 from "../../content/Subsection7_1";
import Subsection7_2 from "../../content/Subsection7_2";
import Subsection7_3 from "../../content/Subsection7_3";
import Subsection8_1 from "../../content/Subsection8_1";
import Subsection8_2 from "../../content/Subsection8_2";
import Subsection8_3 from "../../content/Subsection8_3";
import Subsection9_1 from "../../content/Subsection9_1";
import Subsection9_2 from "../../content/Subsection9_2";
import Subsection9_3 from "../../content/Subsection9_3";
import Subsection10_1 from "../../content/Subsection10_1";
import Subsection10_2 from "../../content/Subsection10_2";
import Subsection10_3 from "../../content/Subsection10_3";

export const renderSection6To10 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  // Sections 6-10
  switch (subsectionId) {
    // Section 6
    case "6.1":
      return (
        <Subsection6_1
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "6.2":
      return (
        <Subsection6_2
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "6.3":
      return (
        <Subsection6_3
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    
    // Section 7
    case "7.1":
      return (
        <Subsection7_1
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "7.2":
      return (
        <Subsection7_2
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "7.3":
      return (
        <Subsection7_3
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    
    // Section 8
    case "8.1":
      return (
        <Subsection8_1
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "8.2":
      return (
        <Subsection8_2
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "8.3":
      return (
        <Subsection8_3
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    
    // Section 9
    case "9.1":
      return (
        <Subsection9_1
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "9.2":
      return (
        <Subsection9_2
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "9.3":
      return (
        <Subsection9_3
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    
    // Section 10
    case "10.1":
      return (
        <Subsection10_1
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "10.2":
      return (
        <Subsection10_2
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    case "10.3":
      return (
        <Subsection10_3
          subsectionId={subsectionId}
          isCompleted={isCompleted} 
          markAsComplete={markAsComplete}
        />
      );
    default:
      return null;
  }
};
