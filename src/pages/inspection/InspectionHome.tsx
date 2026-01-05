import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CertificateCard } from "@/components/shared/CertificateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, FileText, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InspectionHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with real data from your database
  const certificates = [
    {
      id: "1",
      title: "Residential Property Inspection",
      type: "EICR" as const,
      location: "123 Main Street, London",
      client: "John Smith",
      date: "2024-01-15",
      status: "In Progress" as const,
      progress: 65,
      reference: "EICR-2024-001"
    },
    {
      id: "2",
      title: "New Kitchen Installation",
      type: "EIC" as const,
      location: "45 Oak Avenue, Manchester",
      client: "ABC Construction Ltd",
      date: "2024-01-10",
      status: "Completed" as const,
      reference: "EIC-2024-002"
    },
    {
      id: "3",
      title: "Additional Socket Installation",
      type: "Minor Works" as const,
      location: "78 Park Road, Birmingham",
      client: "Sarah Johnson",
      date: "2024-01-12",
      status: "Draft" as const,
      progress: 20,
      reference: "MW-2024-003"
    }
  ];

  const filteredCertificates = certificates.filter(cert =>
    cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterByType = (type?: string) => {
    if (!type) return filteredCertificates;
    return filteredCertificates.filter(cert => cert.type === type);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Inspection & Testing
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Create and manage electrical certificates
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/electrician/inspection-testing/learning")}
                className="whitespace-nowrap"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Learning Hub
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/electrician/inspection-testing/new")}
                className="whitespace-nowrap"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Certificate
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search certificates by title, client, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs for filtering */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full sm:w-auto mb-6">
            <TabsTrigger value="all">
              All ({filteredCertificates.length})
            </TabsTrigger>
            <TabsTrigger value="eicr">
              EICR ({filterByType("EICR").length})
            </TabsTrigger>
            <TabsTrigger value="eic">
              EIC ({filterByType("EIC").length})
            </TabsTrigger>
            <TabsTrigger value="minor">
              Minor Works ({filterByType("Minor Works").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCertificates.map((cert) => (
                <CertificateCard
                  key={cert.id}
                  title={cert.title}
                  type={cert.type}
                  location={cert.location}
                  client={cert.client}
                  date={cert.date}
                  status={cert.status}
                  progress={cert.progress}
                  reference={cert.reference}
                  onClick={() => navigate(`/electrician/inspection-testing/${cert.type.toLowerCase().replace(' ', '-')}/${cert.id}`)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="eicr" className="mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filterByType("EICR").map((cert) => (
                <CertificateCard
                  key={cert.id}
                  title={cert.title}
                  type={cert.type}
                  location={cert.location}
                  client={cert.client}
                  date={cert.date}
                  status={cert.status}
                  progress={cert.progress}
                  reference={cert.reference}
                  onClick={() => navigate(`/electrician/inspection-testing/eicr/${cert.id}`)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="eic" className="mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filterByType("EIC").map((cert) => (
                <CertificateCard
                  key={cert.id}
                  title={cert.title}
                  type={cert.type}
                  location={cert.location}
                  client={cert.client}
                  date={cert.date}
                  status={cert.status}
                  progress={cert.progress}
                  reference={cert.reference}
                  onClick={() => navigate(`/electrician/inspection-testing/eic/${cert.id}`)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="minor" className="mt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filterByType("Minor Works").map((cert) => (
                <CertificateCard
                  key={cert.id}
                  title={cert.title}
                  type={cert.type}
                  location={cert.location}
                  client={cert.client}
                  date={cert.date}
                  status={cert.status}
                  progress={cert.progress}
                  reference={cert.reference}
                  onClick={() => navigate(`/electrician/inspection-testing/minor-works/${cert.id}`)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No certificates found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search" : "Create your first certificate to get started"}
            </p>
            {!searchQuery && (
              <Button onClick={() => navigate("/electrician/inspection-testing/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Create Certificate
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
