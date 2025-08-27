import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Search } from "lucide-react";

// Sample Data (replace with actual data fetching)
const sampleProjects = [
  {
    title: "New Electrical Substation Project",
    snippet: "Construction of a new high-voltage electrical substation to improve power distribution in the region.",
    date: "2024-03-15",
    tag: "Infrastructure",
    source: "Electrical News Today"
  },
  {
    title: "Solar Panel Installation Contract Awarded",
    snippet: "A major contract has been awarded for the installation of solar panels on government buildings.",
    date: "2024-03-10",
    tag: "Renewable Energy",
    source: "Solar Power Industry"
  },
  {
    title: "Smart Grid Technology Implementation",
    snippet: "Implementation of smart grid technology to enhance grid efficiency and reliability.",
    date: "2024-03-05",
    tag: "Technology",
    source: "Energy Tech Journal"
  },
  {
    title: "Electrical Upgrade Project for Hospital",
    snippet: "Complete electrical system upgrade for a major hospital to ensure reliable power supply.",
    date: "2024-02-28",
    tag: "Healthcare",
    source: "Construction Weekly"
  },
  {
    title: "Offshore Wind Farm Electrical Connection",
    snippet: "Project to connect a new offshore wind farm to the mainland electrical grid.",
    date: "2024-02-20",
    tag: "Renewable Energy",
    source: "Wind Energy News"
  },
  {
    title: "Data Center Power Infrastructure Expansion",
    snippet: "Expansion of power infrastructure for a large data center to support increased computing capacity.",
    date: "2024-02-15",
    tag: "Technology",
    source: "Data Center Dynamics"
  },
  {
    title: "Residential Electrification Project Launched",
    snippet: "Government launches a project to electrify rural residential areas.",
    date: "2024-02-10",
    tag: "Infrastructure",
    source: "Government News"
  },
  {
    title: "EV Charging Station Network Expansion",
    snippet: "Expansion of the network of electric vehicle charging stations across the state.",
    date: "2024-02-05",
    tag: "Electric Vehicles",
    source: "EV Charging News"
  },
  {
    title: "Nuclear Power Plant Maintenance and Upgrade",
    snippet: "Major maintenance and upgrade work scheduled for a nuclear power plant.",
    date: "2024-01-30",
    tag: "Nuclear Energy",
    source: "Nuclear Engineering International"
  },
  {
    title: "Underground Cable Installation Project",
    snippet: "Project to install underground cables to improve power reliability and reduce storm damage.",
    date: "2024-01-25",
    tag: "Infrastructure",
    source: "Utility Dive"
  }
];

const MajorProjectsCard = () => {
  const [projects, setProjects] = useState(sampleProjects);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const uniqueTags = [...new Set(projects.map(project => project.tag))];

  const filteredProjects = projects.filter(project => {
    const searchMatch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        project.snippet.toLowerCase().includes(searchTerm.toLowerCase());
    const filterMatch = activeFilter === 'all' || project.tag === activeFilter;
    return searchMatch && filterMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Major Projects & Contracts
        </CardTitle>
        <CardDescription>
          Latest major electrical infrastructure projects, tenders, and contract awards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow"></div>
          </div>
        ) : (
          <>
            {/* Search and Filter Controls */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-elec-dark border border-elec-yellow/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-elec-yellow"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
                  className="px-4 py-2 bg-elec-dark border border-elec-yellow/30 rounded-md text-white focus:outline-none focus:border-elec-yellow"
                >
                  <option value="date">Sort by Date</option>
                  <option value="title">Sort by Title</option>
                </select>
              </div>

              {/* Filter Tags */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-elec-yellow text-black'
                      : 'bg-elec-dark border border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10'
                  }`}
                >
                  All Projects
                </button>
                {uniqueTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`px-3 py-1 rounded-full text-xs transition-colors ${
                      activeFilter === tag
                        ? 'bg-elec-yellow text-black'
                        : 'bg-elec-dark border border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
              {currentProjects.map((project, index) => (
                <div
                  key={index}
                  className="p-4 bg-elec-dark rounded-lg border border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                          {project.tag}
                        </span>
                        <span className="text-xs text-gray-400">
                          {project.date} • {project.source}
                        </span>
                      </div>
                      <h3 className="font-semibold text-white text-sm sm:text-base leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {project.snippet}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-elec-dark border border-elec-yellow/30 text-elec-yellow rounded disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Previous
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded text-sm ${
                        currentPage === page
                          ? 'bg-elec-yellow text-black'
                          : 'bg-elec-dark border border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-elec-dark border border-elec-yellow/30 text-elec-yellow rounded disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Next
                </button>
              </div>
            )}

            {filteredProjects.length === 0 && !loading && (
              <div className="text-center py-8 text-gray-400">
                {searchTerm || activeFilter !== 'all' 
                  ? 'No projects found matching your criteria.' 
                  : 'No projects available.'}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MajorProjectsCard;
