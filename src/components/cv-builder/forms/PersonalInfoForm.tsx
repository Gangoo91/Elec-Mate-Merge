
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CVData } from "../types";

interface PersonalInfoFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ cvData, onChange }) => {
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        [field]: value
      }
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-foreground">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName" className="text-foreground">Full Name *</Label>
            <Input
              id="fullName"
              value={cvData.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              className="bg-card border-elec-yellow/20 text-foreground"
              placeholder="John Smith"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-foreground">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={cvData.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              className="bg-card border-elec-yellow/20 text-foreground"
              placeholder="john.smith@email.com"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-foreground">Phone Number *</Label>
            <Input
              id="phone"
              value={cvData.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              className="bg-card border-elec-yellow/20 text-foreground"
              placeholder="07700 123456"
            />
          </div>

          <div>
            <Label htmlFor="postcode" className="text-foreground">Postcode</Label>
            <Input
              id="postcode"
              value={cvData.personalInfo.postcode}
              onChange={(e) => updatePersonalInfo('postcode', e.target.value)}
              className="bg-card border-elec-yellow/20 text-foreground"
              placeholder="SW1A 1AA"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address" className="text-foreground">Address</Label>
          <Input
            id="address"
            value={cvData.personalInfo.address}
            onChange={(e) => updatePersonalInfo('address', e.target.value)}
            className="bg-card border-elec-yellow/20 text-foreground"
            placeholder="123 High Street, London"
          />
        </div>

        <div>
          <Label htmlFor="summary" className="text-foreground">Professional Summary</Label>
          <Textarea
            id="summary"
            value={cvData.personalInfo.professionalSummary}
            onChange={(e) => updatePersonalInfo('professionalSummary', e.target.value)}
            className="bg-card border-elec-yellow/20 text-foreground min-h-24"
            placeholder="Brief description of your electrical experience and career goals..."
          />
        </div>
      </CardContent>
    </Card>
  );
};
