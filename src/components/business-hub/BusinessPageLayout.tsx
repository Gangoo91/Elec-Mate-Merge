import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BusinessPageLayoutProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  backUrl?: string;
  children: ReactNode;
  className?: string;
}

const BusinessPageLayout = ({
  title,
  subtitle,
  icon: Icon,
  backUrl,
  children,
  className,
}: BusinessPageLayoutProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={cn("min-h-screen bg-[#1a1a1a]", className)}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10 pt-safe">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-14 sm:h-16">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl mr-3 h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-white truncate">{title}</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-white/10 bg-gradient-to-b from-yellow-500/5 to-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center gap-4">
            <div className="p-3 sm:p-4 rounded-2xl border border-white/10 bg-yellow-400/10">
              <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{title}</h2>
              {subtitle && (
                <p className="text-sm sm:text-base text-white mt-1">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-safe">
        {children}
      </main>
    </div>
  );
};

export default BusinessPageLayout;
