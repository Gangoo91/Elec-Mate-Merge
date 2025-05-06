
import React from "react";
import { SubsectionProps } from "../content/subsection1_1/types";
import ElectricalSymbolsDisplay from "../ElectricalSymbolsDisplay";
import InteractiveLightDemo from "../InteractiveLightDemo";

// Import subsection components
import Subsection1_1 from "../content/Subsection1_1";
import Subsection1_2 from "../content/Subsection1_2";
import Subsection1_3 from "../content/Subsection1_3";
import Subsection2_1 from "../content/Subsection2_1";
import Subsection2_2 from "../content/Subsection2_2";
import Subsection2_3 from "../content/Subsection2_3";
import Subsection3_1 from "../content/Subsection3_1";
import Subsection3_2 from "../content/Subsection3_2";
import Subsection3_3 from "../content/Subsection3_3";
import Subsection4_1 from "../content/Subsection4_1";
import Subsection4_2 from "../content/Subsection4_2";
import Subsection4_3 from "../content/Subsection4_3";
import Subsection5_1 from "../content/Subsection5_1";
import Subsection5_2 from "../content/Subsection5_2";
import Subsection5_3 from "../content/Subsection5_3";
import Subsection6_1 from "../content/Subsection6_1";
import Subsection6_2 from "../content/Subsection6_2";
import Subsection6_3 from "../content/Subsection6_3";
import Subsection7_1 from "../content/Subsection7_1";
import Subsection7_2 from "../content/Subsection7_2";
import Subsection7_3 from "../content/Subsection7_3";
import Subsection8_1 from "../content/Subsection8_1";
import Subsection8_2 from "../content/Subsection8_2";
import Subsection8_3 from "../content/Subsection8_3";
import Subsection9_1 from "../content/Subsection9_1";
import Subsection9_2 from "../content/Subsection9_2";
import Subsection9_3 from "../content/Subsection9_3";
import Subsection10_1 from "../content/Subsection10_1";
import Subsection10_2 from "../content/Subsection10_2";
import Subsection10_3 from "../content/Subsection10_3";

const SubsectionRenderer = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  // Render the appropriate content based on subsection ID
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
      return <p>Content for subsection {subsectionId} is not yet available.</p>;
  }
};

export default SubsectionRenderer;
