
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ClientInfoProps } from "../types";

const ClientInformation = ({ formData, handleInputChange, isMobile }: ClientInfoProps) => {
  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle>Client Information</CardTitle>
        <CardDescription>Enter the details of your client and the property</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input 
              id="clientName" 
              name="clientName"
              value={formData.clientName}
              onChange={handleInputChange}
              placeholder="John Smith"
              className={isMobile ? "h-12 text-base" : ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientAddress">Client Address</Label>
            <Input 
              id="clientAddress" 
              name="clientAddress"
              value={formData.clientAddress}
              onChange={handleInputChange}
              placeholder="123 Main Street, London"
              className={isMobile ? "h-12 text-base" : ""}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientInformation;
