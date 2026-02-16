import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

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
        return {
          icon: 'text-green-400',
          iconGlow: 'shadow-green-500/30',
          bg: 'bg-green-500/10',
          bgStrong: 'bg-green-500/20',
          border: 'border-green-500/20 hover:border-green-500/50',
          card: 'from-green-500/[0.07] via-transparent to-transparent',
          badge: 'bg-green-500/20 text-green-300 ring-1 ring-green-500/30',
        };
      case 'blue':
        return {
          icon: 'text-blue-400',
          iconGlow: 'shadow-blue-500/30',
          bg: 'bg-blue-500/10',
          bgStrong: 'bg-blue-500/20',
          border: 'border-blue-500/20 hover:border-blue-500/50',
          card: 'from-blue-500/[0.07] via-transparent to-transparent',
          badge: 'bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/30',
        };
      case 'purple':
        return {
          icon: 'text-purple-400',
          iconGlow: 'shadow-purple-500/30',
          bg: 'bg-purple-500/10',
          bgStrong: 'bg-purple-500/20',
          border: 'border-purple-500/20 hover:border-purple-500/50',
          card: 'from-purple-500/[0.07] via-transparent to-transparent',
          badge: 'bg-purple-500/20 text-purple-300 ring-1 ring-purple-500/30',
        };
      case 'orange':
        return {
          icon: 'text-orange-400',
          iconGlow: 'shadow-orange-500/30',
          bg: 'bg-orange-500/10',
          bgStrong: 'bg-orange-500/20',
          border: 'border-orange-500/20 hover:border-orange-500/50',
          card: 'from-orange-500/[0.07] via-transparent to-transparent',
          badge: 'bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/30',
        };
      case 'red':
        return {
          icon: 'text-red-400',
          iconGlow: 'shadow-red-500/30',
          bg: 'bg-red-500/10',
          bgStrong: 'bg-red-500/20',
          border: 'border-red-500/20 hover:border-red-500/50',
          card: 'from-red-500/[0.07] via-transparent to-transparent',
          badge: 'bg-red-500/20 text-red-300 ring-1 ring-red-500/30',
        };
      default:
        return {
          icon: 'text-elec-yellow',
          iconGlow: 'shadow-yellow-500/30',
          bg: 'bg-elec-yellow/10',
          bgStrong: 'bg-elec-yellow/20',
          border: 'border-elec-yellow/20 hover:border-elec-yellow/50',
          card: 'from-elec-yellow/[0.07] via-transparent to-transparent',
          badge: 'bg-elec-yellow/20 text-yellow-300 ring-1 ring-elec-yellow/30',
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {tools.map((tool) => {
        const colors = getColorClasses(tool.color);
        return (
          <Link
            to={tool.link}
            key={tool.id}
            className="group focus:outline-none focus:ring-2 focus:ring-elec-yellow/50 rounded-xl touch-manipulation"
          >
            <Card
              className={cn(
                'h-full cursor-pointer overflow-hidden relative',
                'bg-gradient-to-br',
                colors.card,
                'transition-all duration-300',
                'hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20',
                'active:scale-[0.97] active:duration-100',
                colors.border
              )}
            >
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%]" />

              <CardContent className="p-4 sm:p-5 relative">
                <div className="flex items-start gap-3.5">
                  {/* Icon container with glow */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={cn(
                        'absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300',
                        colors.bg
                      )}
                    />
                    <div
                      className={cn(
                        'relative p-3 rounded-xl transition-all duration-300 group-hover:scale-110',
                        colors.bgStrong,
                        'shadow-lg',
                        colors.iconGlow
                      )}
                    >
                      <tool.icon className={cn('h-6 w-6', colors.icon)} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-semibold text-white group-hover:text-elec-yellow transition-colors duration-300 text-[15px] sm:text-base leading-tight">
                        {tool.title}
                      </h3>
                      <ChevronRight className="h-4 w-4 text-white group-hover:text-elec-yellow group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                    </div>
                    <p className="text-[13px] text-white leading-relaxed line-clamp-2">
                      {tool.description}
                    </p>
                    {tool.badge && (
                      <span
                        className={cn(
                          'inline-flex items-center mt-2.5 px-2.5 py-0.5 text-[11px] font-semibold rounded-full tracking-wide uppercase',
                          colors.badge
                        )}
                      >
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
