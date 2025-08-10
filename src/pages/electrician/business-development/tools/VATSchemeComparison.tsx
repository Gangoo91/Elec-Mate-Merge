import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoBox from "@/components/common/InfoBox";

const VATSchemeComparison: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Helmet>
        <title>VAT Scheme Comparison for Electricians UK</title>
        <meta name="description" content="Compare Flat Rate vs Standard VAT schemes for UK electricians to see net take-home impact." />
        <link rel="canonical" href="/electrician/business-development/tools/vat-scheme" />
      </Helmet>

      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">VAT Scheme Comparison</h1>
        <p className="text-muted-foreground mt-2">Understand which VAT scheme suits your business model best.</p>
      </header>

      <BackButton customUrl="/electrician/business-development/tools" />

      <section className="mt-6 grid gap-4">
        <InfoBox
          title="Why this matters"
          points={[
            "Shows real impact on cash flow and margin.",
            "Accounts for materials-heavy vs labour-heavy jobs.",
            "Helps plan pricing and invoicing policies.",
          ]}
        />

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Comparison (scaffold)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">We’ll add toggles for VAT registered, Flat Rate %, input VAT on materials, and example job mix. Proceed?</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default VATSchemeComparison;
