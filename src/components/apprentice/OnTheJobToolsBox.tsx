
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Tool {
  id: number;
  title: string;
  icon: LucideIcon;
  description: string;
  link: string;
  badge?: string;
  color?: string;
}

interface OnTheJobToolsBoxProps {
  tools: Tool[];
}

const OnTheJobToolsBox = ({ tools }: OnTheJobToolsBoxProps) => {
  const getColorClasses = (color?: string) => {
    switch (color) {
      case 'green':
        return { icon: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20 hover:border-green-500/40' };
      case 'blue':
        return { icon: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20 hover:border-blue-500/40' };
      case 'purple':
        return { icon: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20 hover:border-purple-500/40' };
      case 'orange':
        return { icon: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20 hover:border-orange-500/40' };
      case 'red':
        return { icon: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20 hover:border-red-500/40' };
      default:
        return { icon: 'text-elec-yellow', bg: 'bg-elec-yellow/10', border: 'border-elec-yellow/20 hover:border-elec-yellow/40' };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {tools.map((tool) => {
        const colors = getColorClasses(tool.color);
        return (
          <Link to={tool.link} key={tool.id} className="group focus:outline-none focus:ring-2 focus:ring-elec-yellow/50 rounded-xl">
            <Card className={cn(
              "h-full cursor-pointer overflow-hidden",
              "bg-gradient-to-br from-elec-gray to-elec-card",
              "transition-all duration-300",
              "hover:scale-[1.02] hover:shadow-xl hover:shadow-elec-yellow/5",
              "active:scale-[0.98]",
              colors.border
            )}>
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <CardContent className="p-5 sm:p-6 relative">
                <div className="flex items-start gap-4">
                  {/* Icon container */}
                  <div className={cn(
                    "flex-shrink-0 p-3 rounded-xl transition-transform duration-300 group-hover:scale-110",
                    colors.bg
                  )}>
                    <tool.icon className={cn("h-6 w-6 sm:h-7 sm:w-7", colors.icon)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white group-hover:text-elec-yellow transition-colors duration-300 text-base sm:text-lg">
                        {tool.title}
                      </h3>
                      <ChevronRight className="h-4 w-4 text-white/70 group-hover:text-elec-yellow group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
                      {tool.description}
                    </p>
                    {tool.badge && (
                      <span className={cn(
                        "inline-block mt-3 px-2.5 py-1 text-xs font-medium rounded-full",
                        colors.bg, colors.icon
                      )}>
                        {tool.badge}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default OnTheJobToolsBox;
