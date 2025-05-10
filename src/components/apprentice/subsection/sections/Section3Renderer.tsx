
import React from "react";
import { SubsectionProps } from "../../content/subsection1_1/types";
import Subsection3_1 from "../../content/Subsection3_1";
import Subsection3_2 from "../../content/Subsection3_2";
import Subsection3_3 from "../../content/Subsection3_3";

export const renderSection3 = (props: SubsectionProps) => {
  const { subsectionId } = props;

  if (subsectionId === "3.1") {
    return <Subsection3_1 {...props} />;
  } else if (subsectionId === "3.2") {
    return <Subsection3_2 {...props} />;
  } else if (subsectionId === "3.3") {
    return <Subsection3_3 {...props} />;
  }

  return <p>Content for subsection {subsectionId} is not available.</p>;
};
