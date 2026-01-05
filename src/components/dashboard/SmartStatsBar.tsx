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

  const formattedValue = typeof value === "string"
    ? value
    : formatCompactNumber(displayValue);

  const handleClick = () => {
    if (path) navigate(path);
  };

  return (
    <div className="flex-shrink-0 min-w-[100px] sm:min-w-0 group">
      <Card
        className={`
          h-full
          hover:border-elec-yellow/40 hover:bg-[#242424]
          active:scale-[0.97] active:opacity-90
          ${path ? "cursor-pointer" : ""}
        `}
        onClick={handleClick}
      >
        <div className="p-2.5 sm:p-3.5 flex flex-col items-center text-center">
          <div className={`
            p-1.5 sm:p-2 rounded-lg mb-1.5
            bg-white/[0.05] ${color}
            transition-transform duration-200
            group-hover:scale-105
          `}>
            {icon}
          </div>

          <span className="text-lg sm:text-xl md:text-2xl font-semibold text-white tracking-tight">
            {formattedValue}
          </span>

          <p className="text-[10px] sm:text-xs text-white/50 mt-0.5 whitespace-nowrap font-medium">{label}</p>
        </div>
      </Card>
    </div>
  );
}

export function SmartStatsBar() {
  const { savedQuotes } = useQuoteStorage();
  const { invoices } = useInvoiceStorage();

  const pendingQuotes = savedQuotes?.filter(q =>
    q.status === "sent" || q.status === "pending"
  ) || [];

  const totalQuoteValue = pendingQuotes.reduce((sum, q) => sum + (q.total || 0), 0);

  const unpaidInvoices = invoices?.filter(i => i.invoice_status !== "paid") || [];
  const overdueCount = unpaidInvoices.filter(i => {
    if (!i.due_date) return false;
    return new Date(i.due_date) < new Date();
  }).length;

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
      <div className="
        flex gap-2.5 sm:gap-3
        overflow-x-auto overscroll-x-contain
        pb-1 -mx-3 px-3
        sm:mx-0 sm:px-0
        scrollbar-hide
        sm:grid sm:grid-cols-5
        snap-x snap-mandatory sm:snap-none
        scroll-smooth
      ">
        {stats.map((stat, index) => (
          <div key={index} className="snap-center first:snap-start last:snap-end">
            <StatItem {...stat} />
          </div>
        ))}
      </div>
    </div>
  );
}
