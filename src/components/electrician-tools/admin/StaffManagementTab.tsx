
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Award, AlertTriangle, CheckCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const StaffManagementTab = () => {
  const staffOverview = [
    {
      name: "James Mitchell",
      role: "Senior Electrician",
      status: "Active",
      certifications: ["18th Edition", "PAT Testing", "EV Charging"],
      hoursThisWeek: 38,
      nextReview: "Mar 2024"
    },
    {
      name: "Sarah Johnson",
      role: "Apprentice Level 3",
      status: "Training",
      certifications: ["17th Edition", "First Aid"],
      hoursThisWeek: 35,
      nextReview: "Jan 2024"
    },
    {
      name: "Michael Brown",
      role: "Qualified Electrician",
      status: "Active",
      certifications: ["18th Edition", "Inspection & Testing"],
      hoursThisWeek: 40,
      nextReview: "Apr 2024"
    }
  ];

  const staffMetrics = [
    {
      title: "Team Size",
      value: "8",
      subtitle: "Active electricians",
      icon: <Users className="h-5 w-5 text-blue-400" />,
      color: "border-blue-500/20 bg-blue-500/10"
    },
    {
      title: "Certification Status",
      value: "95%",
      subtitle: "Up to date",
      icon: <Award className="h-5 w-5 text-green-400" />,
      color: "border-green-500/20 bg-green-500/10"
    },
    {
      title: "Average Utilisation",
      value: "87%",
      subtitle: "This month",
      icon: <Clock className="h-5 w-5 text-yellow-400" />,
      color: "border-yellow-500/20 bg-yellow-500/10"
    },
    {
      title: "Pending Reviews",
      value: "3",
      subtitle: "Due this quarter",
      icon: <Calendar className="h-5 w-5 text-purple-400" />,
      color: "border-purple-500/20 bg-purple-500/10"
    }
  ];

  const trainingRequirements = [
    { course: "18th Edition Update", deadline: "End of Q1 2024", priority: "High", staff: 2 },
    { course: "EV Charging Installation", deadline: "End of Q2 2024", priority: "Medium", staff: 4 },
    { course: "Smart Home Technology", deadline: "End of Q3 2024", priority: "Low", staff: 6 },
    { course: "Health & Safety Refresher", deadline: "End of Q1 2024", priority: "High", staff: 8 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-400 border-red-500/40";
      case "Medium": return "text-yellow-400 border-yellow-500/40";
      case "Low": return "text-green-400 border-green-500/40";
      default: return "text-gray-400 border-gray-500/40";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-green-400 border-green-500/40";
      case "Training": return "text-blue-400 border-blue-500/40";
      case "Review": return "text-yellow-400 border-yellow-500/40";
      default: return "text-gray-400 border-gray-500/40";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Staff Management Overview</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {staffMetrics.map((metric, index) => (
              <Card key={index} className={`border-elec-yellow/20 bg-elec-gray ${metric.color}`}>
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2">{metric.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <p className="text-sm text-white mb-1">{metric.title}</p>
                  <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-blue-500/20 bg-blue-500/10">
          <CardHeader>
            <CardTitle className="text-blue-400">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffOverview.map((member, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white text-sm">{member.name}</h4>
                    <Badge variant="outline" className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{member.role}</p>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-muted-foreground">This week: {member.hoursThisWeek}h</span>
                    <span className="text-muted-foreground">Review: {member.nextReview}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {member.certifications.slice(0, 2).map((cert, certIndex) => (
                      <Badge key={certIndex} variant="outline" className="text-xs border-elec-yellow/40 text-elec-yellow">
                        {cert}
                      </Badge>
                    ))}
                    {member.certifications.length > 2 && (
                      <Badge variant="outline" className="text-xs border-gray-500/40 text-gray-400">
                        +{member.certifications.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              <Link to="/electrician-tools/staff-management">
                <Button variant="outline" className="w-full">
                  View All Staff
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20 bg-orange-500/10">
          <CardHeader>
            <CardTitle className="text-orange-400">Training Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trainingRequirements.map((requirement, index) => (
                <div key={index} className="border border-orange-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white text-sm">{requirement.course}</h4>
                    <Badge variant="outline" className={getPriorityColor(requirement.priority)}>
                      {requirement.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Deadline: {requirement.deadline}</span>
                    <span>{requirement.staff} staff members</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-500/20 bg-green-500/10 text-center">
          <CardContent className="p-4">
            <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <h4 className="font-semibold text-white mb-1">Compliance Tracking</h4>
            <p className="text-xs text-muted-foreground">Monitor certification expiry dates and renewal requirements</p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-purple-500/10 text-center">
          <CardContent className="p-4">
            <Clock className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <h4 className="font-semibold text-white mb-1">Time Tracking</h4>
            <p className="text-xs text-muted-foreground">Record working hours and track productivity across projects</p>
          </CardContent>
        </Card>

        <Card className="border-red-500/20 bg-red-500/10 text-center">
          <CardContent className="p-4">
            <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <h4 className="font-semibold text-white mb-1">Safety Monitoring</h4>
            <p className="text-xs text-muted-foreground">Track safety incidents and ensure compliance with regulations</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffManagementTab;
