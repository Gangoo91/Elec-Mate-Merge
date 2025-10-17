import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, FileText, Copy, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickActionBarProps {
  type: "quote" | "invoice";
}

export const QuickActionBar: React.FC<QuickActionBarProps> = ({ type }) => {
  const navigate = useNavigate();

  const actions = type === "quote" ? [
    {
      label: "New Quote",
      icon: Plus,
      onClick: () => navigate('/electrician/quote-builder/create'),
      primary: true
    },
    {
      label: "View All",
      icon: FileText,
      onClick: () => navigate('/electrician/quotes'),
      primary: false
    }
  ] : [
    {
      label: "New Invoice",
      icon: Plus,
      onClick: () => navigate('/electrician/invoice-builder/create'),
      primary: true
    },
    {
      label: "View All",
      icon: FileText,
      onClick: () => navigate('/electrician/invoices'),
      primary: false
    }
  ];

  return (
    <Card className="sticky top-4 z-10 border-primary/20 bg-card/95 backdrop-blur-sm shadow-lg">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {actions.map((action, idx) => (
            <Button
              key={idx}
              onClick={action.onClick}
              variant={action.primary ? "default" : "outline"}
              size="lg"
              className={action.primary ? "h-12 px-6" : "h-12"}
            >
              <action.icon className="mr-2 h-5 w-5" />
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
