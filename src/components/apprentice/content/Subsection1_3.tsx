
import React from 'react';
import { SubsectionProps } from "./subsection1_1/types";
import Subsection1_3Content from './subsection1_3/index';

const Subsection1_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <Subsection1_3Content 
      subsectionId={subsectionId}
      isCompleted={isCompleted}
      markAsComplete={markAsComplete}
    />
  );
};

export default Subsection1_3;
