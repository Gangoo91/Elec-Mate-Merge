
import React from "react";

type SectionHeaderProps = {
  sectionNumber: number | string;
  title: string;
};

const SectionHeader = ({ sectionNumber, title }: SectionHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <div className="bg-elec-yellow text-elec-dark font-bold px-3 py-1 rounded">
          Section {sectionNumber}
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-white">{title}</h1>
      </div>
    </div>
  );
};

export default SectionHeader;
