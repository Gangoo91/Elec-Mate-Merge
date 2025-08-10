import * as React from "react";
import { Helmet } from "react-helmet";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoBox from "@/components/common/InfoBox";

const BreakEvenCalculator: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <Helmet>
        <title>Break-even & Margin Guard | Electrician UK</title>
        <meta name="description" content="Work out your break-even point and minimum margin to protect profit on electrical jobs in the UK." />
        <link rel="canonical" href="/electrician/business-development/tools/break-even" />
      </Helmet>

      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Break-even & Margin Guard</h1>
        <p className="text-muted-foreground mt-2">Know the minimum price you must charge to cover costs and lock in your target margin.</p>
      </header>

      <BackButton customUrl="/electrician/business-development/tools" />

      <section className="mt-6 grid gap-4">
        <InfoBox
          title="Why this matters"
          points={[
            "Prevents underquoting and protects target margins.",
            "Adapts to VAT registration and material markup.",
            "Shows sensitivity to utilisation and overhead changes.",
          ]}
        />

        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-elec-light">Calculator (scaffold)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">We’ve scaffolded this calculator. Would you like me to wire up inputs next (overheads, labour cost, utilisation, markup, VAT)?</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default BreakEvenCalculator;
