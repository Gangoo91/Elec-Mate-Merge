import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Zap, Briefcase, GraduationCap, Layout } from "lucide-react";

interface CVThemeSelectorProps {
  selectedTheme: 'modern' | 'professional' | 'electrical' | 'two-column';
  onThemeChange: (theme: 'modern' | 'professional' | 'electrical' | 'two-column') => void;
}

export const CVThemeSelector: React.FC<CVThemeSelectorProps> = ({
  selectedTheme,
  onThemeChange
}) => {
  const themes = [
    {
      id: 'electrical' as const,
      name: 'Electrical Pro',
      description: 'ElecMate branded with yellow accents',
      icon: <Zap className="h-5 w-5" />,
      preview: 'bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border-elec-yellow/20',
      badge: 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20'
    },
    {
      id: 'modern' as const,
      name: 'Modern',
      description: 'Clean contemporary design',
      icon: <Palette className="h-5 w-5" />,
      preview: 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20',
      badge: 'bg-primary/10 text-primary border-primary/20'
    },
    {
      id: 'professional' as const,
      name: 'Professional',
      description: 'Traditional corporate styling',
      icon: <Briefcase className="h-5 w-5" />,
      preview: 'bg-gradient-to-br from-slate-100 to-slate-50 border-slate-200',
      badge: 'bg-slate-100 text-slate-700 border-slate-200'
    },
    {
      id: 'two-column' as const,
      name: 'Two Column',
      description: 'Professional sidebar layout matching reference',
      icon: <Layout className="h-5 w-5" />,
      preview: 'bg-gradient-to-br from-gray-50 to-white border-gray-200',
      badge: 'bg-gray-100 text-gray-700 border-gray-200'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="h-5 w-5 text-elec-yellow" />
        <h3 className="text-lg font-semibold text-elec-light">CV Theme</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {themes.map((theme) => (
          <Card
            key={theme.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTheme === theme.id
                ? 'ring-2 ring-elec-yellow border-elec-yellow/30'
                : 'border-elec-gray/40 hover:border-elec-yellow/20'
            } bg-elec-card`}
            onClick={() => onThemeChange(theme.id)}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-elec-yellow">{theme.icon}</span>
                    <span className="font-medium text-elec-light">{theme.name}</span>
                  </div>
                  {selectedTheme === theme.id && (
                    <Badge className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
                      Selected
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-elec-light/60">{theme.description}</p>
                
                {/* Theme Preview */}
                <div className={`h-16 rounded-lg ${theme.preview} p-3 space-y-1`}>
                  <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-1.5 bg-gray-500 rounded w-1/2"></div>
                  <div className="flex gap-1">
                    <div className={`h-3 w-8 rounded ${theme.badge}`}></div>
                    <div className={`h-3 w-6 rounded ${theme.badge}`}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 bg-elec-card/50 rounded-lg border border-elec-yellow/20">
        <div className="flex items-start gap-3">
          <GraduationCap className="h-5 w-5 text-elec-yellow mt-0.5" />
          <div>
            <h4 className="font-medium text-elec-light mb-1">Theme Selection Tips</h4>
            <ul className="text-sm text-elec-light/60 space-y-1">
              <li>• <strong>Electrical Pro:</strong> Best for electrical industry positions</li>
              <li>• <strong>Modern:</strong> Great for tech-forward companies</li>
              <li>• <strong>Professional:</strong> Perfect for corporate environments</li>
              <li>• <strong>Two Column:</strong> Professional layout with sidebar like the reference</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};