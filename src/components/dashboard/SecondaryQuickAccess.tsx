import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { BookOpen, ClipboardCheck, Calculator, Heart, Sparkles, FileText } from "lucide-react";

interface QuickAccessItemProps {
  title: string;
  icon: React.ReactNode;
  path: string;
  badge?: string;
}

function QuickAccessItem({ title, icon, path, badge }: QuickAccessItemProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="
        group cursor-pointer
        hover:border-elec-yellow/40 hover:bg-[#242424]
        active:scale-[0.97] active:opacity-90
      "
      onClick={() => navigate(path)}
    >
      <div className="p-2.5 sm:p-3 flex items-center gap-2 sm:gap-2.5">
        <div className="
          p-1.5 sm:p-2 rounded-lg
          bg-elec-yellow/10 text-elec-yellow/80
          group-hover:text-elec-yellow
          transition-colors duration-150
          flex-shrink-0
        ">
          {icon}
        </div>
        <span className="text-xs sm:text-sm font-medium text-white/70 group-hover:text-white transition-colors truncate">
          {title}
        </span>
        {badge && (
          <span className="ml-auto px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold bg-elec-yellow/20 text-elec-yellow rounded-full flex-shrink-0">
            {badge}
          </span>
        )}
      </div>
    </Card>
  );
}

export function SecondaryQuickAccess() {
  const items: QuickAccessItemProps[] = [
    {
      title: "Study Centre",
      icon: <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
      path: "/study-centre"
    },
    {
      title: "Inspection",
      icon: <ClipboardCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
      path: "/electrician/inspection-testing"
    },
    {
      title: "Quotes",
      icon: <Calculator className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
      path: "/electrician/quotes"
    },
    {
      title: "Wellbeing",
      icon: <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
      path: "/mental-health"
    },
    {
      title: "AI Tools",
      icon: <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
      path: "/electrician-tools/ai-tooling",
      badge: "New"
    },
    {
      title: "Documents",
      icon: <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
      path: "/electrician/inspection-testing?section=my-reports"
    }
  ];

  return (
    <div>
      <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2.5 px-0.5">
        Quick Access
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map((item) => (
          <QuickAccessItem key={item.path + item.title} {...item} />
        ))}
      </div>
    </div>
  );
}
