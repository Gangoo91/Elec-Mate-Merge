
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SampleDataLoader = () => {
  const [loading, setLoading] = useState(false);
  const [dataStatus, setDataStatus] = useState<{
    alerts: number;
    news: number;
    resources: number;
    projects: number;
    lfe: number;
  }>({ alerts: 0, news: 0, resources: 0, projects: 0, lfe: 0 });
  const { toast } = useToast();

  useEffect(() => {
    checkDataStatus();
  }, []);

  const checkDataStatus = async () => {
    try {
      const [alertsCount, newsCount, resourcesCount, projectsCount, lfeCount] = await Promise.all([
        supabase.from('safety_alerts').select('id', { count: 'exact', head: true }),
        supabase.from('industry_news').select('id', { count: 'exact', head: true }),
        supabase.from('safety_resources').select('id', { count: 'exact', head: true }),
        supabase.from('major_projects').select('id', { count: 'exact', head: true }),
        supabase.from('lfe_reports').select('id', { count: 'exact', head: true })
      ]);

      setDataStatus({
        alerts: alertsCount.count || 0,
        news: newsCount.count || 0,
        resources: resourcesCount.count || 0,
        projects: projectsCount.count || 0,
        lfe: lfeCount.count || 0
      });

      console.log('Current data status:', {
        alerts: alertsCount.count,
        news: newsCount.count,
        resources: resourcesCount.count,
        projects: projectsCount.count,
        lfe: lfeCount.count
      });
    } catch (error) {
      console.error('Error checking data status:', error);
    }
  };

  const insertSampleData = async () => {
    setLoading(true);
    try {
      console.log('Starting to insert sample data...');

      // Insert safety alerts
      if (dataStatus.alerts === 0) {
        const alertsData = [
          {
            title: "Critical: Electrical Installation Safety Update",
            summary: "New safety requirements for electrical installations in commercial buildings",
            content: "Following recent incidents, new safety protocols have been introduced for all electrical installations in commercial buildings. All electricians must now follow enhanced isolation procedures and use upgraded PPE when working on systems above 400V.",
            severity: "critical",
            category: "Installation Safety"
          },
          {
            title: "High Voltage Work: New PPE Requirements",
            summary: "Updated personal protective equipment standards for high voltage work",
            content: "The HSE has issued new guidance on PPE requirements for high voltage electrical work. All electricians working on systems above 1kV must now use arc-rated clothing and enhanced eye protection.",
            severity: "high",
            category: "PPE Requirements"
          },
          {
            title: "Cable Installation: Underground Hazards",
            summary: "Important reminder about underground cable installation safety",
            content: "Recent incidents highlight the importance of proper cable detection before excavation. Always use approved cable detection equipment and follow the HSG47 guidance.",
            severity: "medium",
            category: "Cable Work"
          }
        ];

        const { error: alertsError } = await supabase
          .from('safety_alerts')
          .insert(alertsData);

        if (alertsError) throw alertsError;
        console.log('Safety alerts inserted successfully');
      }

      // Insert industry news
      if (dataStatus.news === 0) {
        const newsData = [
          {
            title: "IET Publishes Updated Wiring Regulations",
            summary: "The 19th edition of BS 7671 includes new requirements for EV charging points",
            content: "The Institution of Engineering and Technology has published the 19th edition of BS 7671, the UK's electrical wiring regulations. Key updates include new requirements for electric vehicle charging installations, enhanced RCD protection, and updated guidance on surge protective devices.",
            regulatory_body: "IET",
            category: "Regulations"
          },
          {
            title: "HSE Updates Electrical Safety Guidance",
            summary: "New guidance document HSG85 provides updated electrical safety requirements",
            content: "The Health and Safety Executive has released an updated version of HSG85, providing comprehensive guidance on electrical safety in the workplace. The document includes new sections on energy storage systems and smart grid technologies.",
            regulatory_body: "HSE",
            category: "Safety"
          },
          {
            title: "Ofgem Announces Smart Meter Rollout Updates",
            summary: "New requirements for smart meter installations in commercial properties",
            content: "Ofgem has announced updated requirements for smart meter installations in commercial properties. All installations must now include enhanced cybersecurity measures and backup communication systems.",
            regulatory_body: "Ofgem",
            category: "Smart Technology"
          }
        ];

        const { error: newsError } = await supabase
          .from('industry_news')
          .insert(newsData);

        if (newsError) throw newsError;
        console.log('Industry news inserted successfully');
      }

      // Insert safety resources
      if (dataStatus.resources === 0) {
        const resourcesData = [
          {
            title: "Electrical Safe Isolation Procedure Guide",
            summary: "Comprehensive guide to safe isolation procedures for electrical systems",
            file_type: "PDF",
            file_size: "2.5 MB",
            category: "Safe Working"
          },
          {
            title: "PPE Selection Chart for Electrical Work",
            summary: "Quick reference chart for selecting appropriate PPE based on voltage levels",
            file_type: "PDF",
            file_size: "1.2 MB",
            category: "PPE"
          },
          {
            title: "Emergency Response Procedures",
            summary: "Step-by-step emergency response procedures for electrical incidents",
            file_type: "DOCX",
            file_size: "800 KB",
            category: "Emergency Response"
          },
          {
            title: "Arc Flash Risk Assessment Template",
            summary: "Template for conducting arc flash risk assessments",
            file_type: "XLSX",
            file_size: "1.5 MB",
            category: "Risk Assessment"
          }
        ];

        const { error: resourcesError } = await supabase
          .from('safety_resources')
          .insert(resourcesData);

        if (resourcesError) throw resourcesError;
        console.log('Safety resources inserted successfully');
      }

      // Insert major projects
      if (dataStatus.projects === 0) {
        const projectsData = [
          {
            title: "London Underground Power Upgrade",
            summary: "Major electrical infrastructure upgrade for the London Underground network",
            content: "Transport for London has awarded a £250 million contract for upgrading the electrical systems across the London Underground network. The project will involve replacing aging switchgear, installing new power distribution systems, and upgrading signalling infrastructure.",
            awarded_to: "Siemens UK & Partners",
            project_value: "£250 million",
            location: "London",
            status: "awarded"
          },
          {
            title: "Offshore Wind Farm Connection",
            summary: "Electrical connection infrastructure for new offshore wind farm",
            content: "National Grid has been awarded the contract to provide electrical connection infrastructure for the new Hornsea Three offshore wind farm. The project includes submarine cables, onshore transmission lines, and a new electrical substation.",
            awarded_to: "National Grid ESO",
            project_value: "£180 million",
            location: "Yorkshire Coast",
            status: "in_progress"
          },
          {
            title: "Hospital Emergency Power Systems",
            summary: "Installation of backup power systems across NHS hospitals",
            content: "A major project to install and upgrade emergency power systems across 15 NHS hospitals in the South East. The work includes new generators, UPS systems, and automatic transfer switches to ensure continuous power during emergencies.",
            awarded_to: "Mitie Technical Services",
            project_value: "£45 million",
            location: "South East England",
            status: "awarded"
          }
        ];

        const { error: projectsError } = await supabase
          .from('major_projects')
          .insert(projectsData);

        if (projectsError) throw projectsError;
        console.log('Major projects inserted successfully');
      }

      // Insert LFE reports
      if (dataStatus.lfe === 0) {
        const lfeData = [
          {
            title: "Near Miss: Arc Flash During Switchgear Maintenance",
            summary: "Electrician experiences near miss during routine switchgear maintenance",
            content: "An experienced electrician working on routine maintenance of a 11kV switchgear experienced a near miss when an arc flash occurred during the switching operation. The incident was caused by a failure to properly test the isolation before beginning work. The electrician was wearing appropriate PPE which prevented injury.",
            incident_type: "near miss",
            key_takeaways: [
              "Always verify isolation using appropriate test equipment",
              "PPE prevented serious injury in this incident",
              "Review and follow company switching procedures",
              "Ensure proper communication during switching operations"
            ]
          },
          {
            title: "Equipment Failure: Cable Joint Explosion",
            summary: "Underground cable joint failure results in significant power outage",
            content: "A 33kV underground cable joint failed catastrophically during normal operation, resulting in a significant explosion and power outage affecting 2,000 customers. Investigation revealed that the joint had been installed with incorrect torque settings, leading to gradual deterioration over 5 years.",
            incident_type: "equipment failure",
            key_takeaways: [
              "Follow manufacturer's installation specifications exactly",
              "Implement regular thermal imaging surveys",
              "Proper training on cable jointing techniques is essential",
              "Maintain detailed installation records for future reference"
            ]
          },
          {
            title: "Fire Incident: Overloaded Distribution Board",
            summary: "Fire caused by overloaded distribution board in commercial premises",
            content: "A fire broke out in a commercial premises due to an overloaded distribution board. The building's electrical load had been gradually increased over time without proper assessment of the existing infrastructure. The fire was contained but caused significant damage to the building.",
            incident_type: "fire",
            key_takeaways: [
              "Regular electrical load assessments are essential",
              "Monitor and record electrical loads over time",
              "Upgrade electrical infrastructure when loads increase",
              "Install appropriate protection devices for all circuits"
            ]
          }
        ];

        const { error: lfeError } = await supabase
          .from('lfe_reports')
          .insert(lfeData);

        if (lfeError) throw lfeError;
        console.log('LFE reports inserted successfully');
      }

      await checkDataStatus();
      
      toast({
        title: "Sample data loaded",
        description: "Sample data has been successfully loaded into the database"
      });

    } catch (error) {
      console.error('Error inserting sample data:', error);
      toast({
        title: "Error",
        description: "Failed to load sample data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const totalRecords = Object.values(dataStatus).reduce((sum, count) => sum + count, 0);

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-elec-yellow" />
          Database Status & Sample Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-elec-yellow">{dataStatus.alerts}</div>
            <div className="text-gray-400">Safety Alerts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-elec-yellow">{dataStatus.news}</div>
            <div className="text-gray-400">Industry News</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-elec-yellow">{dataStatus.resources}</div>
            <div className="text-gray-400">Resources</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-elec-yellow">{dataStatus.projects}</div>
            <div className="text-gray-400">Major Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-elec-yellow">{dataStatus.lfe}</div>
            <div className="text-gray-400">LFE Reports</div>
          </div>
        </div>

        <div className="text-center border-t border-elec-yellow/20 pt-4">
          <div className="text-lg font-semibold text-white mb-2">
            Total Records: {totalRecords}
          </div>
          
          {totalRecords === 0 && (
            <div className="text-gray-400 mb-4">
              No data found in the database. Load sample data to test the components.
            </div>
          )}

          <Button
            onClick={insertSampleData}
            disabled={loading}
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading Sample Data...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                {totalRecords === 0 ? 'Load Sample Data' : 'Refresh Data'}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SampleDataLoader;
