
import { ArrowLeft } from "lucide-react";
import BackButton from "@/components/common/BackButton";

const TestingHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6">
      <h1 className="text-3xl font-bold tracking-tight">Testing Procedures Mini Toolkit</h1>
      <BackButton customUrl="/apprentice/on-job-tools" label="Back to Tools" />
    </div>
  );
};

export default TestingHeader;
