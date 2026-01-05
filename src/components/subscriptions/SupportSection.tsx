import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Phone, ArrowRight, RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { useState } from "react";
import { cn } from "@/lib/utils";

const SupportSection = () => {
  const { toast } = useToast();
  const { checkSubscriptionStatus } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshStatus = async () => {
    setIsRefreshing(true);
    toast({
      title: "Refreshing...",
      description: "Checking your subscription status.",
    });
    await checkSubscriptionStatus();
    setTimeout(() => {
      setIsRefreshing(false);
      window.location.reload();
    }, 1000);
  };

  const supportOptions = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help within 24 hours",
      action: "info@elec-mate.com",
      href: "mailto:info@elec-mate.com?subject=Subscription%20Support",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our team",
      action: "Start Chat",
      href: "mailto:info@elec-mate.com?subject=Live%20Chat%20Request",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri, 9am-5pm",
      action: "Coming Soon",
      href: "#",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      disabled: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Need Help?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Our support team is here to help you with any questions about your subscription.
        </p>
      </div>

      {/* Support Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {supportOptions.map((option, index) => (
          <a
            key={index}
            href={option.disabled ? undefined : option.href}
            className={cn(
              "group relative overflow-hidden rounded-2xl p-6 transition-all duration-300",
              "bg-elec-gray/50 backdrop-blur-sm border",
              option.borderColor,
              !option.disabled && "hover:scale-[1.02] hover:shadow-xl cursor-pointer",
              option.disabled && "opacity-60 cursor-not-allowed"
            )}
            onClick={(e) => {
              if (option.disabled) {
                e.preventDefault();
                toast({
                  title: "Coming Soon",
                  description: "Phone support will be available soon!",
                });
              }
            }}
          >
            {/* Background Glow */}
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              option.bgColor
            )} />

            <div className="relative z-10">
              {/* Icon */}
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                option.bgColor
              )}>
                <option.icon className={cn("h-6 w-6", option.color)} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-1">{option.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{option.description}</p>

              {/* Action */}
              <div className={cn(
                "inline-flex items-center gap-2 text-sm font-medium",
                option.color
              )}>
                {option.action}
                {!option.disabled && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handleRefreshStatus}
          disabled={isRefreshing}
          className="w-full sm:w-auto border-white/10 hover:border-elec-yellow/50 hover:bg-elec-yellow/10"
        >
          {isRefreshing ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh Subscription Status
        </Button>
      </div>

      {/* Bottom Note */}
      <p className="text-center text-xs text-muted-foreground pt-4">
        For billing inquiries or to cancel your subscription, please email{" "}
        <a href="mailto:info@elec-mate.com" className="text-elec-yellow hover:underline">
          info@elec-mate.com
        </a>
      </p>
    </div>
  );
};

export default SupportSection;
