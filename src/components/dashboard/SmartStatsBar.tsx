import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { FileText, PoundSterling, BookOpen, Award, Clock } from "lucide-react";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import { useInvoiceStorage } from "@/hooks/useInvoiceStorage";

interface StatItemProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color?: string;
  path?: string;
}

function formatCompactNumber(num: number): string {
  if (num >= 10000) {
    return `${(num / 1000).toFixed(0)}k`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toLocaleString();
}

function StatItem({ icon, value, label, color = "text-elec-yellow", path }: StatItemProps) {
  const navigate = useNavigate();
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === "number" ? value : parseInt(value.replace(/[^0-9]/g, "")) || 0;

  // Animate counter
  useEffect(() => {
    if (typeof value !== "number") {
      return;
    }

    const duration = 800;
    const steps = 20;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericValue, value]);

  // Format display value
  const formattedValue = typeof value === "string"
    ? value
    : formatCompactNumber(displayValue);

  const handleClick = () => {
    if (path) navigate(path);
  };

  return (
    <div className="flex-shrink-0 min-w-[120px] sm:min-w-0 group">
      <Card
        className={`
          relative overflow-hidden h-full
          bg-elec-gray/50 border-elec-yellow/10
          hover:border-elec-yellow/30
          transition-all duration-300
          hover:shadow-lg hover:shadow-elec-yellow/5
          active:scale-[0.98]
          ${path ? "cursor-pointer" : ""}
        `}
        onClick={handleClick}
      >
        <div className="p-3 sm:p-4 flex flex-col items-center text-center">
          {/* Icon */}
          <div className={`
            p-2 sm:p-2.5 rounded-xl mb-2
            bg-elec-yellow/10 ${color}
            group-hover:scale-110
            transition-transform duration-300
          `}>
            {icon}
          </div>

          {/* Value - centered and prominent */}
          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            {formattedValue}
          </span>

          {/* Label */}
          <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{label}</p>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-elec-yellow/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Card>
    </div>
  );
}

export function SmartStatsBar() {
  const { savedQuotes } = useQuoteStorage();
  const { invoices } = useInvoiceStorage();

  // Calculate stats
  const pendingQuotes = savedQuotes?.filter(q =>
    q.status === "sent" || q.status === "pending"
  ) || [];

  const totalQuoteValue = pendingQuotes.reduce((sum, q) => sum + (q.total || 0), 0);

  const unpaidInvoices = invoices?.filter(i => i.invoice_status !== "paid") || [];
  const overdueCount = unpaidInvoices.filter(i => {
    if (!i.due_date) return false;
    return new Date(i.due_date) < new Date();
  }).length;

  // Format currency for display
  const formattedValue = totalQuoteValue >= 1000
    ? `£${(totalQuoteValue / 1000).toFixed(1)}k`
    : `£${totalQuoteValue}`;

  const stats: StatItemProps[] = [
    {
      icon: <FileText className="h-4 w-4 sm:h-5 sm:w-5" />,
      value: pendingQuotes.length,
      label: "Active Quotes",
      color: "text-elec-yellow",
      path: "/electrician/quotes"
    },
    {
      icon: <PoundSterling className="h-4 w-4 sm:h-5 sm:w-5" />,
      value: formattedValue,
      label: "Quote Value",
      color: "text-green-500",
      path: "/electrician/quotes"
    },
    {
      icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />,
      value: 3,
      label: "Courses",
      color: "text-blue-500",
      path: "/study-centre"
    },
    {
      icon: <Award className="h-4 w-4 sm:h-5 sm:w-5" />,
      value: 12,
      label: "Certificates",
      color: "text-purple-500",
      path: "/electrician/inspection-testing?section=my-reports"
    },
    {
      icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5" />,
      value: overdueCount > 0 ? overdueCount : 0,
      label: overdueCount > 0 ? "Overdue" : "All Clear",
      color: overdueCount > 0 ? "text-red-500" : "text-green-500",
      path: "/electrician/invoices"
    }
  ];

  return (
    <div className="relative">
      {/* Fade edges for scroll indication on mobile */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none sm:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none sm:hidden" />

      {/* Stats container - horizontal scroll on mobile, grid on desktop */}
      <div className="
        flex gap-2 sm:gap-3
        overflow-x-auto
        pb-2 -mx-4 px-4
        sm:mx-0 sm:px-0
        scrollbar-hide
        sm:grid sm:grid-cols-5
        snap-x snap-mandatory sm:snap-none
      ">
        {stats.map((stat, index) => (
          <div key={index} className="snap-start">
            <StatItem {...stat} />
          </div>
        ))}
      </div>
    </div>
  );
}
