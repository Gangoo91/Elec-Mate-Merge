
import React from "react";

interface SectionHeaderProps {
  sectionNumber: string;
  title: string;
}

const SectionHeader = ({ sectionNumber, title }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="inline-flex items-center flex-col">
        <div className="flex justify-center items-center w-20 h-20 bg-elec-yellow rounded-full mb-4">
          <span className="text-3xl font-bold text-elec-dark">{sectionNumber}</span>
        </div>
        <h1 className="text-3xl font-bold text-center">{title}</h1>
      </div>
    </div>
  );
};

export default SectionHeader;
