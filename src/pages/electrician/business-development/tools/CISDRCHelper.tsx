import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoBox from "@/components/common/InfoBox";

const CISDRCHelper: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Helmet>
        <title>CIS Deductions & DRC Helper UK</title>
        <meta name="description" content="Calculate CIS deductions and Domestic Reverse Charge (DRC) VAT effects for UK electrical contracts." />
        <link rel="canonical" href="/electrician/business-development/tools/cis-drc" />
      </Helmet>

      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">CIS & DRC Helper (UK)</h1>
        <p className="text-muted-foreground mt-2">Handle CIS deductions and DRC VAT rules cleanly on invoices and cash flow.</p>
      </header>

      <BackButton customUrl="/electrician/business-development/tools" />

      <section className="mt-6 grid gap-4">
        <InfoBox
          title="Why this matters"
          points={[
            "Avoids invoicing errors and cash flow shocks.",
            "Clarity for contractor vs subcontractor scenarios.",
            "Exports a clean summary for your accountant.",
          ]}
        />

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Helper (scaffold)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">We’ll add inputs for role (contractor/subbie), CIS rate, materials, labour split and DRC eligibility. Build now?</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default CISDRCHelper;
