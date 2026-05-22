import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  Zap,
  ShieldCheck,
  PoundSterling,
  ClipboardCheck,
  Cable,
  BookOpen,
} from 'lucide-react';

const MCP_URL = 'https://www.elec-mate.com/api/public/v1/mcp';
const OPENAPI_URL = 'https://www.elec-mate.com/openapi.json';

const TOOL_CATEGORIES = [
  {
    name: 'BS 7671 Lookups',
    icon: BookOpen,
    tools: [
      { name: 'bs7671_lookup_regulation', desc: 'Full text of any reg by number (e.g. 411.4.4)' },
      { name: 'bs7671_lookup_table', desc: 'Any BS 7671 table (41.1, 4D5, B1, etc.)' },
      { name: 'bs7671_lookup_section', desc: 'Every reg in a section (701 bathrooms, 722 EV)' },
      { name: 'bs7671_search', desc: 'Keyword search across all 1,770 regulations' },
    ],
  },
  {
    name: 'Verified Calculations',
    icon: Cable,
    tools: [
      { name: 'calculate_zs_max', desc: 'Max Zs for any MCB per Reg 411.4.4 (Cmin=0.95)' },
      {
        name: 'calculate_disconnection_time',
        desc: 'Table 41.1 lookup (TN/TT × final/distribution)',
      },
      { name: 'calculate_voltage_drop', desc: 'Appendix 4 + Reg 525 compliance check' },
      { name: 'calculate_cable_size', desc: 'Cable size recommendation (capacity + Vd both)' },
      { name: 'calculate_earth_rod_resistance', desc: 'TT system Ra max per Reg 411.5.3' },
    ],
  },
  {
    name: 'Practical Work Intelligence',
    icon: Sparkles,
    badge: 'unique to Elec-Mate',
    tools: [
      { name: 'pwi_install_time', desc: 'Real UK labour minutes — 199k record dataset' },
      { name: 'pwi_common_defects', desc: 'Top defects, mistakes, failures by category' },
      { name: 'pwi_eicr_codes', desc: 'Suggested C1/C2/C3/FI codes per defect' },
      { name: 'pwi_troubleshooting', desc: 'Fault-diagnosis steps + diagnostic tests' },
      { name: 'pwi_materials', desc: 'Materials + tools + cable sizes per job' },
      { name: 'pwi_inspection_checklist', desc: 'EICR Schedule of Inspections walk-through' },
      { name: 'pwi_installation_procedure', desc: 'Installation method + terminations + tests' },
    ],
  },
  {
    name: 'Pricing & Reference',
    icon: PoundSterling,
    tools: [
      { name: 'pricing_job', desc: 'Verified UK pricing avg/min/max £ by region' },
      { name: 'eicr_code_explained', desc: 'C1/C2/C3/FI per IET Best Practice Guide 4' },
      { name: 'notifiable_work_check', desc: 'Part P notifiable decision (England)' },
      { name: 'certificate_required', desc: 'Which BS 7671 cert is needed for what job' },
    ],
  },
];

const CLIENTS = [
  {
    id: 'claude',
    name: 'Claude Desktop',
    badge: 'Recommended',
    audience: 'Claude Pro / Max subscribers',
    instructions: [
      'Open Claude Desktop (Mac or Windows)',
      'Click Claude menu → Settings → Developer → Connectors',
      'Click "Add custom connector"',
      `Paste the URL: ${MCP_URL}`,
      'Name it "Elec-Mate" and click Connect',
      'Start a new chat — Elec-Mate appears in the tools panel',
    ],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    audience: 'ChatGPT Plus / Pro / Team / Enterprise',
    instructions: [
      'Open ChatGPT (web or desktop)',
      'Go to Settings → Connectors → Add custom',
      `Paste the URL: ${MCP_URL}`,
      'Enable the connector',
      'New chat — ask any UK electrical question',
    ],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    audience: 'Cursor IDE',
    instructions: ['Edit ~/.cursor/mcp.json (create if missing)', 'Add the elec-mate server:'],
    code: `{
  "mcpServers": {
    "elec-mate": {
      "url": "https://www.elec-mate.com/api/public/v1/mcp"
    }
  }
}`,
    after: ['Restart Cursor', 'Tools appear in the chat panel'],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    audience: 'Windsurf IDE',
    instructions: [
      'Open Windsurf settings',
      'Navigate to MCP Servers',
      'Click Add server',
      `Paste URL: ${MCP_URL}`,
      'Save and restart',
    ],
  },
  {
    id: 'cline',
    name: 'Cline (VS Code)',
    audience: 'Cline extension for VS Code',
    instructions: ['Open Cline → Settings → MCP Servers → Add', `Paste URL: ${MCP_URL}`, 'Save'],
  },
  {
    id: 'continue',
    name: 'Continue (VS Code / JetBrains)',
    audience: 'Continue extension',
    instructions: ['Edit ~/.continue/config.json', 'Add to the mcpServers array:'],
    code: `{
  "mcpServers": [
    {
      "name": "elec-mate",
      "url": "https://www.elec-mate.com/api/public/v1/mcp"
    }
  ]
}`,
    after: ['Save and reload the editor'],
  },
  {
    id: 'perplexity',
    name: 'Perplexity Spaces',
    audience: 'Perplexity Pro',
    instructions: [
      'Create or open a Perplexity Space',
      'Click Tools → Add MCP server',
      `Paste URL: ${MCP_URL}`,
      'Save',
    ],
  },
];

const SAMPLE_QUERIES = [
  'What is the max Zs for a B32 MCB and what disconnection time should I expect on a TN domestic socket circuit?',
  "I'm installing a 9.5 kW shower 18 m from the CU on a 40 A MCB — what cable size do I need and is it Part P notifiable?",
  'EICR on a London consumer unit — what should I check, what defects are most common, and what should I charge?',
  'My RCBO keeps tripping on the kitchen circuit. Walk me through the diagnosis.',
  'What is Section 722 of BS 7671 and what changed in A4:2026 for EV chargers?',
  'How much does a domestic EICR cost in Scotland and how long should it take?',
];

export default function ConnectAIPage() {
  const [copied, setCopied] = useState(false);
  const [activeClient, setActiveClient] = useState<string>('claude');

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(MCP_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  const active = CLIENTS.find((c) => c.id === activeClient) || CLIENTS[0];

  return (
    <PublicPageLayout>
      <Helmet>
        <title>Connect Elec-Mate to ChatGPT, Claude, Cursor + more | UK Electrical AI</title>
        <meta
          name="description"
          content="Install Elec-Mate inside ChatGPT, Claude, Cursor, Perplexity, Windsurf, Cline + Continue. 20 verified BS 7671:2018+A4:2026 tools — one URL, every AI."
        />
        <link rel="canonical" href="https://www.elec-mate.com/connect-ai" />
        <meta property="og:title" content="Elec-Mate is now inside ChatGPT, Claude + Cursor" />
        <meta
          property="og:description"
          content="20 verified UK electrical tools, callable from any AI assistant via one MCP URL. Free. No card required."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Elec-Mate AI Connector',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
            url: 'https://www.elec-mate.com/connect-ai',
            description:
              'Elec-Mate Model Context Protocol (MCP) server — 20 verified UK electrical tools for ChatGPT, Claude, Cursor, Perplexity, Windsurf, Cline and Continue.',
            featureList: TOOL_CATEGORIES.flatMap((c) => c.tools.map((t) => t.name)),
            sameAs: [
              'https://www.elec-mate.com',
              'https://www.elec-mate.com/api/public/v1/mcp',
              'https://www.elec-mate.com/openapi.json',
            ],
          })}
        </script>
      </Helmet>

      <main className="bg-background text-foreground">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-elec-gray/40">
          <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 via-transparent to-blue-500/5 pointer-events-none" />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-elec-yellow/30 bg-elec-yellow/10 px-3 py-1 text-xs font-semibold text-elec-yellow uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              New — MCP server live
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Elec-Mate is now inside <span className="text-elec-yellow">ChatGPT</span>,{' '}
              <span className="text-elec-yellow">Claude</span> and{' '}
              <span className="text-elec-yellow">Cursor</span>.
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              20 verified UK electrical tools — BS 7671:2018+A4:2026 lookups, cable sizing, EICR
              coding, real labour times, regional pricing — callable from any AI assistant via one
              URL. Every answer cites Elec-Mate.
            </p>

            <div className="mt-8 rounded-xl border border-elec-yellow/30 bg-elec-gray/40 p-4 sm:p-6">
              <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                Install URL
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <code className="flex-1 px-3 sm:px-4 py-2.5 bg-background rounded-lg text-sm sm:text-base font-mono break-all">
                  {MCP_URL}
                </code>
                <Button
                  onClick={copyUrl}
                  className="h-11 px-4 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-muted-foreground">
                Paste into your AI client's "Custom Connector" or "MCP Server" settings. No auth. No
                signup. Free for AI assistant use.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> 20 verified tools
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> BS 7671:2018+A4:2026
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> Citation on every reply
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> MCP + REST (OpenAPI)
              </span>
            </div>
          </div>
        </section>

        {/* HOW TO CONNECT — TABS */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">How to connect</h2>
          <p className="text-muted-foreground mb-8">
            Pick your AI client. Each setup takes under 60 seconds.
          </p>

          {/* Client tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CLIENTS.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveClient(c.id)}
                className={`h-11 px-4 rounded-lg text-sm font-semibold transition-colors touch-manipulation ${
                  activeClient === c.id
                    ? 'bg-elec-yellow text-black'
                    : 'bg-elec-gray/60 text-foreground hover:bg-elec-gray'
                }`}
              >
                {c.name}
                {c.badge && (
                  <span className="ml-2 text-[10px] uppercase tracking-wider opacity-70">
                    {c.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Active client instructions */}
          <div className="rounded-xl border border-elec-gray/40 bg-elec-gray/20 p-5 sm:p-7">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              {active.audience}
            </div>
            <h3 className="text-xl font-bold mb-4">{active.name}</h3>
            <ol className="space-y-3 text-sm sm:text-base">
              {active.instructions.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-none w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="break-words">{step}</span>
                </li>
              ))}
            </ol>
            {active.code && (
              <pre className="mt-4 p-4 bg-background rounded-lg text-xs sm:text-sm font-mono overflow-x-auto border border-elec-gray/40">
                <code>{active.code}</code>
              </pre>
            )}
            {active.after && (
              <ol
                className="mt-3 space-y-3 text-sm sm:text-base"
                start={active.instructions.length + 1}
              >
                {active.after.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-none w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold flex items-center justify-center">
                      {active.instructions.length + 1 + i}
                    </span>
                    <span className="break-words">{step}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>

        {/* TOOLS CATALOGUE */}
        <section className="bg-elec-gray/10 border-y border-elec-gray/40">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">The 20 tools</h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Every tool is read-only, no-auth, BS 7671:2018+A4:2026 aligned, and returns a{' '}
              <code className="text-sm">citation</code> field the AI is told to quote in its reply.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {TOOL_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.name}
                    className="rounded-xl border border-elec-gray/40 bg-background/60 p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-elec-yellow/15 text-elec-yellow flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg">{cat.name}</h3>
                      {cat.badge && (
                        <span className="ml-auto text-[10px] uppercase tracking-wider font-bold text-elec-yellow border border-elec-yellow/40 px-2 py-0.5 rounded">
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-2.5">
                      {cat.tools.map((t) => (
                        <li key={t.name} className="text-sm">
                          <code className="text-elec-yellow font-semibold">{t.name}</code>
                          <div className="text-muted-foreground text-xs sm:text-sm leading-relaxed mt-0.5">
                            {t.desc}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SAMPLE QUERIES */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">What you can ask</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Connect Elec-Mate then ask any of these — the AI calls the right tools, returns verified
            answers with the regulation cited.
          </p>
          <div className="space-y-3">
            {SAMPLE_QUERIES.map((q, i) => (
              <div
                key={i}
                className="rounded-lg border border-elec-gray/40 bg-elec-gray/20 p-4 text-sm sm:text-base leading-relaxed"
              >
                <span className="text-elec-yellow font-bold mr-2">"</span>
                {q}
                <span className="text-elec-yellow font-bold ml-1">"</span>
              </div>
            ))}
          </div>
        </section>

        {/* TECH FOOTER */}
        <section className="border-t border-elec-gray/40 bg-elec-gray/20">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-elec-yellow" />
                  <h3 className="font-bold">Verified at source</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Every tool returns the BS 7671 reg / table / IET source it answered from. Citation
                  is non-negotiable on every reply.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-elec-yellow" />
                  <h3 className="font-bold">Read-only, no auth</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  No user data accessible. No write actions. No PII. Public knowledge surfaces only.
                  Safe to install on personal AI accounts.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardCheck className="w-5 h-5 text-elec-yellow" />
                  <h3 className="font-bold">Free for AI use</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Free for AI assistant use — attribution required. Cite as "Elec-Mate
                  (https://www.elec-mate.com)" in any reply that quotes a response.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-5 rounded-xl border border-elec-yellow/30 bg-elec-yellow/5">
              <div>
                <h3 className="font-bold text-lg">Try the full Elec-Mate platform</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  16 certificate types, 70+ calculators, AM2 prep, business management. 7-day free
                  trial.
                </p>
              </div>
              <Link to="/" className="flex-none">
                <Button className="h-11 px-6 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation">
                  Start free trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <a
                href={MCP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-elec-yellow flex items-center gap-1"
              >
                MCP endpoint <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={OPENAPI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-elec-yellow flex items-center gap-1"
              >
                OpenAPI 3.1 spec <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.elec-mate.com/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-elec-yellow flex items-center gap-1"
              >
                llms.txt <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.elec-mate.com/.well-known/llm-facts.json"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-elec-yellow flex items-center gap-1"
              >
                llm-facts.json <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </PublicPageLayout>
  );
}
