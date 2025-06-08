
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PoundSterling, MapPin, Building, Clock, Gift } from "lucide-react";
import PayCalculator from "./PayCalculator";

const WageInformationTab = () => {
  const wageTiers = [
    { level: "Apprentice Minimum Wage", rate: "£6.40", description: "First year or under 19", period: "per hour" },
    { level: "Year 2+ Apprentice", rate: "£10.42+", description: "National minimum wage rates apply", period: "per hour" },
    { level: "Level 3 Qualified", rate: "£12-15", description: "Typical hourly rate for qualified electricians", period: "per hour" },
    { level: "Experienced Electrician", rate: "£15-25", description: "With several years experience", period: "per hour" }
  ];

  const regionalVariations = [
    { region: "London", multiplier: "15-25% higher", avgWage: "£14-18" },
    { region: "South East", multiplier: "10-15% higher", avgWage: "£13-16" },
    { region: "Scotland", multiplier: "Standard rates", avgWage: "£11-14" },
    { region: "North West", multiplier: "Standard rates", avgWage: "£10-13" },
    { region: "Wales", multiplier: "5-10% lower", avgWage: "£9-12" },
    { region: "Northern Ireland", multiplier: "5-10% lower", avgWage: "£9-12" }
  ];

  const sectorRates = [
    { sector: "Domestic", rate: "£10-14", description: "House wiring, consumer units" },
    { sector: "Commercial", rate: "£12-18", description: "Offices, shops, restaurants" },
    { sector: "Industrial", rate: "£14-22", description: "Factories, heavy machinery" },
    { sector: "Renewable Energy", rate: "£15-25", description: "Solar, wind, EV charging" },
    { sector: "Emergency/Call-out", rate: "£20-35", description: "Out-of-hours work" }
  ];

  const benefits = [
    "Company van and fuel allowance",
    "Tool allowance (£200-500 annually)",
    "Training and certification funding",
    "Health and dental insurance",
    "Pension contributions (3-6%)",
    "Performance bonuses",
    "Holiday pay (28 days minimum)"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <PoundSterling className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">UK Wage Expectations (2024)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {wageTiers.map((tier, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-white mb-2">{tier.level}</h4>
                <div className="text-2xl font-bold text-elec-yellow mb-1">{tier.rate}</div>
                <div className="text-xs text-elec-yellow/70 mb-2">{tier.period}</div>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="regional" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="regional">Regional Rates</TabsTrigger>
          <TabsTrigger value="sectors">By Sector</TabsTrigger>
          <TabsTrigger value="overtime">Overtime</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
        </TabsList>

        <TabsContent value="regional">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-elec-yellow">Regional Pay Variations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regionalVariations.map((region, index) => (
                  <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">{region.region}</h4>
                    <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow mb-2">
                      {region.multiplier}
                    </Badge>
                    <p className="text-sm text-muted-foreground">Average: {region.avgWage}/hour</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sectors">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-elec-yellow">Sector-Specific Rates</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectorRates.map((sector, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-elec-yellow/20 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-white">{sector.sector}</h4>
                      <p className="text-sm text-muted-foreground">{sector.description}</p>
                    </div>
                    <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40">
                      {sector.rate}/hour
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overtime">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-elec-yellow">Overtime & Premium Rates</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Standard Overtime</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Weekday overtime: Time and a half (1.5x)</li>
                    <li>• Saturday work: Time and a half (1.5x)</li>
                    <li>• Sunday work: Double time (2x)</li>
                    <li>• Bank holidays: Double time (2x)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Emergency Call-outs</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Minimum 4-hour charge</li>
                    <li>• Weekend call-out: 2-3x normal rate</li>
                    <li>• Night work (10pm-6am): 2x rate</li>
                    <li>• Travel time usually included</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-elec-yellow">Additional Benefits</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-elec-yellow/20 rounded-lg">
                    <Gift className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <PayCalculator />
    </div>
  );
};

export default WageInformationTab;
