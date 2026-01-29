import { ArrowLeft, Route, FileCheck, FileSignature, Users2, Search, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule5Section2 = () => {
  useSEO(
    "Procurement and Contracts - HNC Module 5 Section 2 | Building Services",
    "Master procurement routes, JCT and NEC contracts, subcontract management, tendering processes and supply chain management for building services."
  );

  const subsections = [
    {
      number: "2.1",
      title: "Procurement Routes",
      description: "Traditional, design and build, management contracting, construction management and two-stage tendering approaches",
      icon: Route,
      href: "../h-n-c-module5-section2-1"
    },
    {
      number: "2.2",
      title: "JCT Contracts",
      description: "Standard building contracts, intermediate forms, amendments, extensions of time and practical completion provisions",
      icon: FileCheck,
      href: "../h-n-c-module5-section2-2"
    },
    {
      number: "2.3",
      title: "NEC Contracts",
      description: "ECC main options A-F, early warning procedures, compensation events and programme management under NEC4",
      icon: FileSignature,
      href: "../h-n-c-module5-section2-3"
    },
    {
      number: "2.4",
      title: "Subcontract Management",
      description: "DOM/1, DOM/2 subcontracts, back-to-back provisions, flow-down clauses and subcontractor coordination",
      icon: Users2,
      href: "../h-n-c-module5-section2-4"
    },
    {
      number: "2.5",
      title: "Tendering Process",
      description: "Invitation to tender, bid preparation, tender evaluation, negotiation strategies and contract award procedures",
      icon: Search,
      href: "../h-n-c-module5-section2-5"
    },
    {
      number: "2.6",
      title: "Supply Chain Management",
      description: "Approved supplier lists, lead time management, logistics coordination, material scheduling and vendor relationships",
      icon: Link2,
      href: "../h-n-c-module5-section2-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 2: Procurement and Contracts
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Understand procurement strategies and contractual frameworks for building services projects
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the procurement routes, standard contract forms and supply chain management practices essential for successful delivery of building services installations - from initial tender through to subcontractor coordination and material logistics.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subsections.map((subsection) => (
            <ModuleCard
              key={subsection.number}
              number={subsection.number}
              title={subsection.title}
              description={subsection.description}
              icon={subsection.icon}
              href={subsection.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HNCModule5Section2;
