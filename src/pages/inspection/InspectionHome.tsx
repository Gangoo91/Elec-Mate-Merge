import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CertificateCard } from "@/components/shared/CertificateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, FileText, BookOpen, ArrowLeft, Zap } from "lucide-react";
import { Link } from "react-router-dom";
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
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-safe">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Inspection & Testing
              </h1>
              <p className="text-sm text-white/60">Create and manage electrical certificates</p>
            </div>
          </div>
          <Link to="/electrician">
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 border-white/20 text-white/70 hover:text-white hover:bg-white/10 gap-2 touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Hub
            </Button>
          </Link>
        </header>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => navigate("/electrician/inspection-testing/new")}
            className="bg-amber-500 hover:bg-amber-600 text-black font-semibold gap-2 h-11 px-5 touch-manipulation active:scale-[0.98] transition-transform"
          >
            <Plus className="h-4 w-4" />
            New Certificate
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/electrician/inspection-testing/learning")}
            className="border-white/20 text-white/80 hover:text-white hover:bg-white/10 gap-2 h-11 px-5 touch-manipulation"
          >
            <BookOpen className="h-4 w-4" />
            Learning Hub
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              type="text"
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-amber-500/50 focus:ring-amber-500/20"
            />
          </div>

          {/* Tabs for filtering */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full sm:w-auto mb-6 bg-white/5 border border-white/10 p-1 h-auto flex-wrap">
              <TabsTrigger value="all" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black text-white/70 text-sm px-3 py-2">
                All ({filteredCertificates.length})
              </TabsTrigger>
              <TabsTrigger value="eicr" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black text-white/70 text-sm px-3 py-2">
                EICR ({filterByType("EICR").length})
              </TabsTrigger>
              <TabsTrigger value="eic" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black text-white/70 text-sm px-3 py-2">
                EIC ({filterByType("EIC").length})
              </TabsTrigger>
              <TabsTrigger value="minor" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black text-white/70 text-sm px-3 py-2">
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
            <div className="text-center py-12 px-4">
              <div className="p-4 rounded-full bg-white/5 w-fit mx-auto mb-4">
                <FileText className="h-12 w-12 text-white/30" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No certificates found</h3>
              <p className="text-sm text-white/60 mb-6">
                {searchQuery ? "Try adjusting your search" : "Create your first certificate to get started"}
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => navigate("/electrician/inspection-testing/new")}
                  className="bg-amber-500 hover:bg-amber-600 text-black font-semibold gap-2 touch-manipulation"
                >
                  <Plus className="h-4 w-4" />
                  Create Certificate
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
