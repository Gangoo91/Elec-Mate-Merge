
import React from "react";
import CompletionButton from "../../shared/CompletionButton";

interface CompletionButtonProps {
  isCompleted: boolean;
  markAsComplete: () => void;
}

const CompletionButtonWrapper = ({ isCompleted, markAsComplete }: CompletionButtonProps) => {
  return <CompletionButton isCompleted={isCompleted} markAsComplete={markAsComplete} />;
};

export default CompletionButtonWrapper;
