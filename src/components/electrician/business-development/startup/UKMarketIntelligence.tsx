import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MapPin, Users, PoundSterling, Zap, Home, Building, AlertTriangle, Lightbulb } from "lucide-react";

const UKMarketIntelligence = () => {
  const marketStats = [
    {
      title: "UK Electrical Market Size",
      value: "£14.2bn",
      subtitle: "Annual market value",
      icon: <PoundSterling className="h-5 w-5" />,
      trend: "+4.1% YoY"
    },
    {
      title: "Skilled Electricians Shortage",
      value: "Critical",
      subtitle: "Labour shortage continues",
      icon: <Users className="h-5 w-5" />,
      trend: "Accelerating"
    },
    {
      title: "Average Hourly Rate",
      value: "£45-85",
      subtitle: "Experienced electricians",
      icon: <TrendingUp className="h-5 w-5" />,
      trend: "Regional variations"
    },
    {
      title: "Average Day Rate",
      value: "£320-600",
      subtitle: "Self-employed contractors",
      icon: <TrendingUp className="h-5 w-5" />,
      trend: "Experience dependent"
    },
    {
      title: "EV Charging Growth",
      value: "52%",
      subtitle: "Year-on-year installations",
      icon: <Zap className="h-5 w-5" />,
      trend: "Rapidly expanding"
    }
  ];

  const opportunities = [
    {
      sector: "Renewable Energy",
      description: "Solar panel installations and EV charging points are booming",
      requirements: ["G99 certification", "MCS accreditation", "Battery storage knowledge"],
      jobBreakdown: {
        basic: "£3,500-6,000",
        standard: "£8,000-12,000", 
        premium: "£15,000-18,000"
      },
      jobTypes: [
        "Domestic solar PV: £3,500-6,000",
        "Commercial solar: £8,000-15,000",
        "Battery storage add-on: £2,500-4,000",
        "EV charging point: £800-1,500"
      ]
    },
    {
      sector: "Smart Home Technology",
      description: "Home automation and smart electrical systems gaining popularity",
      requirements: ["Data cabling expertise", "Network understanding", "Smart device integration"],
      jobBreakdown: {
        basic: "£800-1,500",
        standard: "£2,000-3,500",
        premium: "£4,000-4,500"
      },
      jobTypes: [
        "Basic home automation: £800-1,500",
        "Full smart home setup: £2,500-4,500",
        "Security system integration: £1,200-2,800"
      ]
    },
    {
      sector: "Commercial Maintenance",
      description: "Ongoing maintenance contracts provide steady income",
      requirements: ["EICR qualifications", "PAT testing", "Emergency response capability"],
      jobBreakdown: {
        basic: "£300-500/month",
        standard: "£600-900/month",
        premium: "£1,000-1,200/month"
      },
      jobTypes: [
        "Small office contracts: £300-500/month",
        "Medium business: £600-900/month",
        "Large commercial: £1,000+/month"
      ]
    },
    {
      sector: "New Build Housing",
      description: "Continued housing development across the UK",
      requirements: ["First fix expertise", "Second fix skills", "Building regs knowledge"],
      jobBreakdown: {
        basic: "£3,200-5,000",
        standard: "£6,000-9,000",
        premium: "£10,000-12,000"
      },
      jobTypes: [
        "2-bed house rewire: £3,200-5,000",
        "4-bed house full electrical: £6,000-9,000",
        "Luxury home installation: £10,000-12,000"
      ]
    },
    {
      sector: "Emergency Call-Outs",
      description: "High-value emergency electrical services",
      requirements: ["24/7 availability", "Quick response capability", "Diagnostic skills"],
      jobBreakdown: {
        basic: "£150-250/call",
        standard: "£280-350/call",
        premium: "£400-500/call"
      },
      jobTypes: [
        "Basic fault finding: £150-250",
        "Emergency repairs: £280-350",
        "Out-of-hours premium: £400-500"
      ]
    }
  ];

  const regionalInsights = [
    {
      region: "London & South East",
      hourlyRate: "£65-95",
      dailyRate: "£450-700",
      demand: "Very High",
      specialisms: ["High-end residential", "Commercial fit-outs", "Smart homes"],
      challenges: ["High competition", "Traffic congestion", "Parking costs"]
    },
    {
      region: "North West",
      hourlyRate: "£45-75",
      dailyRate: "£320-550",
      demand: "High",
      specialisms: ["Industrial", "New build housing", "Maintenance"],
      challenges: ["Price competition", "Travel distances"]
    },
    {
      region: "Scotland",
      hourlyRate: "£40-70",
      dailyRate: "£280-500",
      demand: "Medium-High",
      specialisms: ["Renewable energy", "Rural installations", "Maintenance"],
      challenges: ["Remote locations", "Weather conditions"]
    },
    {
      region: "Wales",
      hourlyRate: "£38-65",
      dailyRate: "£260-450",
      demand: "Medium",
      specialisms: ["Agricultural", "Tourism sector", "Renewable energy"],
      challenges: ["Seasonal variations", "Rural access"]
    },
    {
      region: "North East",
      hourlyRate: "£35-60",
      dailyRate: "£240-420",
      demand: "Medium",
      specialisms: ["Industrial maintenance", "Residential", "Commercial"],
      challenges: ["Economic pressures", "Limited growth"]
    },
    {
      region: "South West",
      hourlyRate: "£42-72",
      dailyRate: "£300-520",
      demand: "High",
      specialisms: ["Tourism", "Residential", "Marine electrical"],
      challenges: ["Seasonal work", "Rural locations"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            UK Electrical Market Intelligence
          </CardTitle>
          <p className="text-blue-200 text-sm">
            Current market conditions and opportunities for UK electrical contractors
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
            <h4 className="font-semibold text-blue-200 mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Pricing Philosophy
            </h4>
            <p className="text-blue-300 text-sm italic">
              "Your price is what you believe your time is worth, regardless of what others are charging. 
              Factor in your skills, experience, overhead costs, and desired profit margin to set rates that reflect your true value."
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {marketStats.map((stat, index) => (
              <Card key={index} className="bg-blue-500/20 border-blue-400/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {stat.icon}
                    <h4 className="font-semibold text-blue-200 text-sm">{stat.title}</h4>
                  </div>
                  <p className="text-2xl font-bold text-blue-100">{stat.value}</p>
                  <p className="text-xs text-blue-300">{stat.subtitle}</p>
                  <Badge variant="outline" className="mt-2 text-xs border-blue-400/40 text-blue-300">
                    {stat.trend}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Growth Opportunities by Sector
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {opportunities.map((opportunity, index) => (
              <Card key={index} className="bg-green-500/20 border-green-400/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-200 text-lg">{opportunity.sector}</CardTitle>
                  <p className="text-green-300 text-sm">{opportunity.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-green-200 mb-1">Key Requirements:</p>
                      <div className="flex flex-wrap gap-1">
                        {opportunity.requirements.map((req, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-green-400/30 text-green-300">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-green-500/20 pt-3">
                      <p className="text-xs font-semibold text-green-200 mb-2">Job Value Breakdown:</p>
                      <div className="space-y-2 mb-3">
                        <div className="text-center p-2 bg-green-500/10 rounded border border-green-500/20">
                          <p className="text-xs text-green-300 mb-1">Basic</p>
                          <p className="font-semibold text-green-200 text-sm">{opportunity.jobBreakdown.basic}</p>
                        </div>
                        <div className="text-center p-2 bg-green-500/10 rounded border border-green-500/20">
                          <p className="text-xs text-green-300 mb-1">Standard</p>
                          <p className="font-semibold text-green-200 text-sm">{opportunity.jobBreakdown.standard}</p>
                        </div>
                        <div className="text-center p-2 bg-green-500/10 rounded border border-green-500/20">
                          <p className="text-xs text-green-300 mb-1">Premium</p>
                          <p className="font-semibold text-green-200 text-sm">{opportunity.jobBreakdown.premium}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs font-semibold text-green-200 mb-1">Typical Jobs:</p>
                        <ul className="space-y-1">
                          {opportunity.jobTypes.map((jobType, idx) => (
                            <li key={idx} className="text-xs text-green-300 flex items-start gap-1">
                              <span className="w-1 h-1 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                              {jobType}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Regional Market Insights
          </CardTitle>
          <p className="text-orange-200 text-sm">
            Understand market conditions across different UK regions
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regionalInsights.map((region, index) => (
              <Card key={index} className="bg-orange-500/20 border-orange-400/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-orange-200">
                    {region.region}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div className="space-y-2">
                    <div className="text-center">
                      <span className="text-xs text-orange-300">Hourly Rate:</span>
                      <div className="font-semibold text-orange-200">{region.hourlyRate}</div>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-orange-300">Day Rate:</span>
                      <div className="font-semibold text-orange-200">{region.dailyRate}</div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-orange-200 mb-1">Popular Specialisms:</p>
                    <div className="flex flex-wrap gap-1">
                      {region.specialisms.map((spec, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-orange-400/30 text-orange-300">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-orange-200 mb-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Key Challenges:
                    </p>
                    <ul className="text-xs text-orange-300 space-y-1">
                      {region.challenges.map((challenge, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="w-1 h-1 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UKMarketIntelligence;