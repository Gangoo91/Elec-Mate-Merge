
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Zap, 
  Building, 
  Car,
  Home,
  Cpu,
  Shield,
  Wrench,
  Users,
  Award
} from "lucide-react";

const CourseCategories = () => {
  const courseCategories = [
    {
      title: "Higher National Qualifications",
      icon: BookOpen,
      level: "Level 4-6",
      duration: "2-4 years",
      courses: [
        {
          name: "HNC Electrical Engineering",
          provider: "Colleges & Universities",
          cost: "£3,000 - £5,000",
          description: "Part-time qualification covering advanced electrical principles, design, and installation methods."
        },
        {
          name: "HND Electrical Engineering", 
          provider: "Colleges & Universities",
          cost: "£4,000 - £7,000",
          description: "Higher level qualification preparing for technician and junior engineer roles."
        },
        {
          name: "Foundation Degree in Electrical Engineering",
          provider: "Universities",
          cost: "£6,000 - £9,000",
          description: "University-level qualification combining practical skills with theoretical knowledge."
        }
      ]
    },
    {
      title: "Renewable Energy & Sustainability",
      icon: Zap,
      level: "Specialist",
      duration: "1-10 days",
      courses: [
        {
          name: "Solar PV Installation & Design",
          provider: "NICEIC, NAPIT, STC",
          cost: "£800 - £1,500",
          description: "Comprehensive training on photovoltaic system design, installation, and commissioning."
        },
        {
          name: "Heat Pump Installation",
          provider: "MCS Approved Centres",
          cost: "£1,200 - £2,000",
          description: "Air source and ground source heat pump installation and maintenance training."
        },
        {
          name: "Battery Storage Systems",
          provider: "Various providers",
          cost: "£600 - £1,200",
          description: "Training on domestic and commercial battery storage system installation."
        },
        {
          name: "Wind Turbine Maintenance",
          provider: "Renewable UK centres",
          cost: "£2,000 - £4,000",
          description: "Specialised training for wind turbine electrical systems and maintenance."
        }
      ]
    },
    {
      title: "Smart Technology & Automation",
      icon: Cpu,
      level: "Emerging",
      duration: "2-5 days",
      courses: [
        {
          name: "Smart Home Installation",
          provider: "Industry providers",
          cost: "£800 - £1,500",
          description: "Home automation systems, IoT devices, and smart lighting installation."
        },
        {
          name: "Building Management Systems (BMS)",
          provider: "Commercial centres",
          cost: "£1,500 - £3,000",
          description: "Training on commercial building automation and control systems."
        },
        {
          name: "Industrial Automation",
          provider: "Siemens, ABB centres",
          cost: "£2,000 - £4,000",
          description: "PLC programming and industrial control system installation."
        }
      ]
    },
    {
      title: "Electric Vehicle Infrastructure",
      icon: Car,
      level: "Growing Market",
      duration: "1-3 days",
      courses: [
        {
          name: "EV Charging Point Installation",
          provider: "NICEIC, NAPIT, ECA",
          cost: "£600 - £1,200",
          description: "Domestic and commercial EV charging point installation and commissioning."
        },
        {
          name: "Rapid Charging Systems",
          provider: "Specialist providers",
          cost: "£1,000 - £2,000",
          description: "High-power charging infrastructure for commercial and public use."
        },
        {
          name: "EV Fleet Management Systems",
          provider: "Commercial centres",
          cost: "£800 - £1,500",
          description: "Large-scale EV charging infrastructure and fleet management."
        }
      ]
    },
    {
      title: "Industrial & Commercial Specialisation",
      icon: Building,
      level: "Advanced",
      duration: "3-10 days",
      courses: [
        {
          name: "High Voltage Systems",
          provider: "Specialist centres",
          cost: "£2,500 - £5,000",
          description: "Working with high voltage electrical systems and switchgear."
        },
        {
          name: "Hazardous Area Installation",
          provider: "ATEX certified centres",
          cost: "£1,500 - £3,000",
          description: "Electrical installation in explosive atmospheres and hazardous environments."
        },
        {
          name: "Data Centre Infrastructure",
          provider: "Commercial providers",
          cost: "£2,000 - £4,000",
          description: "Critical power systems and uninterruptible power supplies."
        }
      ]
    },
    {
      title: "Health & Safety Advancement",
      icon: Shield,
      level: "Essential",
      duration: "1-5 days",
      courses: [
        {
          name: "IOSH Managing Safely",
          provider: "IOSH centres",
          cost: "£400 - £800",
          description: "Management-level health and safety qualification for supervisors."
        },
        {
          name: "NEBOSH General Certificate",
          provider: "NEBOSH centres",
          cost: "£1,000 - £2,000",
          description: "Internationally recognised health and safety qualification."
        },
        {
          name: "Confined Space Entry",
          provider: "Safety training centres",
          cost: "£300 - £600",
          description: "Specialised training for working in confined spaces."
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {courseCategories.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-elec-yellow/10">
                  <category.icon className="h-6 w-6 text-elec-yellow" />
                </div>
                <div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{category.level}</Badge>
                    <Badge variant="outline">{category.duration}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.courses.map((course, courseIndex) => (
                <div key={courseIndex} className="border border-elec-yellow/10 rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-white">{course.name}</h4>
                      <p className="text-sm text-muted-foreground">{course.provider}</p>
                    </div>
                    <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">
                      {course.cost}
                    </Badge>
                  </div>
                  <p className="text-sm text-elec-light/80">{course.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CourseCategories;
