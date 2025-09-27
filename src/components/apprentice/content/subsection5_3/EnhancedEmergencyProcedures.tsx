import React, { useState } from "react";
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Download, 
  Search, 
  Zap, 
  Flame, 
  Users, 
  Shield, 
  Clock,
  CheckCircle,
  FileText,
  Share2,
  Printer
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { emergencyContacts, emergencyProcedures, EmergencyContact, EmergencyProcedure } from "./EmergencyContactsData";

const EnhancedEmergencyProcedures = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getTypeColor = (type: string) => {
    switch (type) {
      case "immediate": return "bg-red-500/20 text-red-300 border-red-500/30";
      case "urgent": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "specialist": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500/20 text-red-300 border-red-500/30";
      case "high": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      default: return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    }
  };

  const getIconComponent = (iconName: string, className: string = "h-5 w-5") => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Zap, Flame, Users, Shield, AlertTriangle
    };
    const IconComponent = icons[iconName] || AlertTriangle;
    return <IconComponent className={className} />;
  };

  const filteredProcedures = emergencyProcedures.filter(procedure => 
    (selectedCategory === "all" || procedure.category === selectedCategory) &&
    (procedure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     procedure.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = [
    { value: "all", label: "All Procedures" },
    { value: "electrical", label: "Electrical" },
    { value: "fire", label: "Fire Safety" },
    { value: "medical", label: "Medical" },
    { value: "evacuation", label: "Evacuation" }
  ];

  return (
    <div className="space-y-6">
      {/* Emergency Banner */}
      <Card className="border-red-500/40 bg-red-500/5 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-12 w-12 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-1">EMERGENCY</h3>
                <p className="text-sm text-white">
                  Life-threatening emergency? Call <span className="font-bold text-red-500 text-lg">999</span> immediately
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30"
              >
                <Phone className="h-4 w-4 mr-1" />
                <a href="tel:999" className="text-current no-underline">Call 999</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20"
        >
          <Download className="h-6 w-6 text-blue-400" />
          <span className="text-xs font-medium text-white">Download Emergency Card</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-green-500/10 border-green-500/30 hover:bg-green-500/20"
        >
          <Printer className="h-6 w-6 text-green-400" />
          <span className="text-xs font-medium text-white">Print Procedures</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20"
        >
          <Share2 className="h-6 w-6 text-purple-400" />
          <span className="text-xs font-medium text-white">Share Contacts</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20"
        >
          <MapPin className="h-6 w-6 text-orange-400" />
          <span className="text-xs font-medium text-white">Nearest Hospital</span>
        </Button>
      </div>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Phone className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Emergency Contacts</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div 
                key={index} 
                className="p-4 border border-elec-yellow/20 rounded-lg bg-elec-gray/50 hover:border-elec-yellow/40 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{contact.name}</h4>
                  <Badge className={getTypeColor(contact.type)}>
                    {contact.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{contact.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {contact.hours}
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    <a href={`tel:${contact.phone}`} className="text-current no-underline">
                      {contact.phone}
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Procedures */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-elec-yellow" />
              <CardTitle className="text-elec-yellow">Emergency Procedures</CardTitle>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search procedures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-elec-gray/50 border-elec-yellow/20"
                />
              </div>
              <div className="flex gap-1 overflow-x-auto">
                {categories.map(category => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                    className={selectedCategory === category.value 
                      ? "bg-elec-yellow text-elec-dark" 
                      : "bg-elec-gray/50 border-elec-yellow/20 text-white hover:bg-elec-yellow/10"
                    }
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredProcedures.map((procedure) => (
              <div 
                key={procedure.id}
                className="border border-elec-yellow/20 rounded-lg p-4 bg-elec-gray/30 hover:border-elec-yellow/40 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-elec-yellow/10 rounded">
                    {getIconComponent(procedure.icon, "h-5 w-5 text-elec-yellow")}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{procedure.title}</h4>
                      <Badge className={getPriorityColor(procedure.priority)}>
                        {procedure.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{procedure.timeframe}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {procedure.steps.slice(0, 3).map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-2">
                      <span className="text-xs font-bold text-elec-yellow mt-0.5">
                        {stepIndex + 1}.
                      </span>
                      <span className="text-sm text-white">{step}</span>
                    </div>
                  ))}
                  {procedure.steps.length > 3 && (
                    <p className="text-xs text-muted-foreground italic">
                      +{procedure.steps.length - 3} more steps...
                    </p>
                  )}
                </div>

                {procedure.specialRequirements && (
                  <div className="mt-3 p-2 bg-orange-500/10 rounded border border-orange-500/20">
                    <p className="text-xs text-orange-300 font-medium mb-1">Required:</p>
                    <p className="text-xs text-orange-200">
                      {procedure.specialRequirements.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Safety Information */}
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardHeader>
          <CardTitle className="text-amber-300 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Remember: Emergency Preparedness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-amber-300">Before an Emergency:</h4>
              <ul className="text-sm text-white space-y-1">
                <li>• Know evacuation routes and assembly points</li>
                <li>• Locate emergency equipment and contacts</li>
                <li>• Ensure mobile phone is charged</li>
                <li>• Carry emergency contact card</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-amber-300">During an Emergency:</h4>
              <ul className="text-sm text-white space-y-1">
                <li>• Stay calm and follow procedures</li>
                <li>• Help others if safe to do so</li>
                <li>• Do not re-enter danger areas</li>
                <li>• Follow emergency services instructions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedEmergencyProcedures;