
import React from "react";
import { Book } from "lucide-react";

type SectionHeaderProps = {
  sectionNumber: number | string;
  title: string;
};

const SectionHeader = ({ sectionNumber, title }: SectionHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center p-3 bg-gradient-to-r from-elec-yellow to-amber-500 rounded-lg shadow-lg">
          <Book className="h-6 w-6 text-elec-dark" />
        </div>
        <div>
          <div className="text-sm font-medium text-elec-yellow mb-1">Section {sectionNumber}</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
