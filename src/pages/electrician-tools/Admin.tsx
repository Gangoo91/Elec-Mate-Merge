
import { useState } from "react";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, FileText, BarChart4, Users, Heart } from "lucide-react";
import BusinessManagementTab from "@/components/electrician-tools/admin/BusinessManagementTab";
import DocumentationTab from "@/components/electrician-tools/admin/DocumentationTab";
import AnalyticsTab from "@/components/electrician-tools/admin/AnalyticsTab";
import StaffManagementTab from "@/components/electrician-tools/admin/StaffManagementTab";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("business");

  const tabOptions = [
    { value: "business", label: "Business", icon: Building2 },
    { value: "documentation", label: "Documentation", icon: FileText },
    { value: "analytics", label: "Analytics", icon: BarChart4 },
    { value: "staff", label: "Staff", icon: Users }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "business":
        return <BusinessManagementTab />;
      case "documentation":
        return <DocumentationTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "staff":
        return <StaffManagementTab />;
      default:
        return <BusinessManagementTab />;
    }
  };

  const getCurrentTabLabel = () => {
    const currentTab = tabOptions.find(tab => tab.value === activeTab);
    return currentTab ? currentTab.label : "Select Section";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Business Administration Hub</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Streamline your electrical business operations with professional tools designed for the trade. 
          Manage projects, staff, compliance, and finances all in one place.
        </p>
        <BackButton customUrl="/electrician/business" label="Back to Business Hub" />
      </div>

      {/* Section Selector Dropdown */}
      <div className="mb-6">
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-full max-w-md mx-auto bg-background/80 backdrop-blur-sm border-elec-yellow/20">
            <div className="flex items-center gap-3">
              {(() => {
                const currentTab = tabOptions.find(tab => tab.value === activeTab);
                const IconComponent = currentTab?.icon || Building2;
                return (
                  <>
                    <IconComponent className="h-4 w-4 text-elec-yellow" />
                    <SelectValue placeholder="Select a section" />
                  </>
                );
              })()}
            </div>
          </SelectTrigger>
          <SelectContent className="bg-background/95 backdrop-blur-sm border-elec-yellow/20 z-50">
            {tabOptions.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <SelectItem key={tab.value} value={tab.value} className="cursor-pointer">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Content Area */}
      <div className="mt-6">
        {renderContent()}
      </div>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Built for Electricians
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Every tool in this hub is designed specifically for electrical contractors. From compliance tracking 
            to client management, we understand the unique challenges of running an electrical business. 
            Spend less time on paperwork and more time doing what you do best.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
