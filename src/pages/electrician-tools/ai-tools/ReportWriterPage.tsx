import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ReportWizard from "@/components/electrician-tools/ai-tools/modern-report-writer/ReportWizard";

const ReportWriterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-safe">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/20">
              <FileText className="h-6 w-6 sm:h-7 sm:w-7 text-green-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Report Writer
              </h1>
              <p className="text-sm text-white/60">AI-generated electrical reports</p>
            </div>
          </div>
          <Link to="/electrician-tools/ai-tooling">
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 border-white/20 text-white/70 hover:text-white hover:bg-white/10 gap-2 touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to AI Tools
            </Button>
          </Link>
        </header>

        {/* Content */}
        <ReportWizard />
      </main>
    </div>
  );
};

export default ReportWriterPage;