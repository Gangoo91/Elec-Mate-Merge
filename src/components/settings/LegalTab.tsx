import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  FileText,
  Shield,
  Scale,
  ExternalLink,
  Cookie,
  ScrollText,
  CheckCircle,
  Globe,
  Lock,
  Building2,
  Mail,
  ChevronRight,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: 0 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};

const LegalTab = () => {
  const legalDocuments = [
    {
      title: "Terms of Service",
      description: "Our terms and conditions for using Elec-Mate",
      icon: ScrollText,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      url: "/terms",
      lastUpdated: "15 Dec 2025"
    },
    {
      title: "Privacy Policy",
      description: "How we collect, use, and protect your data",
      icon: Shield,
      iconColor: 'text-green-400',
      bgColor: 'bg-green-500/10',
      url: "/privacy",
      lastUpdated: "10 Jan 2026"
    },
    {
      title: "Cookie Policy",
      description: "Information about cookies we use",
      icon: Cookie,
      iconColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      url: "/cookies",
      lastUpdated: "1 Nov 2025"
    },
    {
      title: "Acceptable Use Policy",
      description: "Guidelines for using our platform responsibly",
      icon: Scale,
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      url: "/acceptable-use",
      lastUpdated: "20 Oct 2025"
    },
    {
      title: "Data Processing Agreement",
      description: "For business and enterprise customers",
      icon: FileText,
      iconColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      url: "/dpa",
      lastUpdated: "5 Dec 2025"
    }
  ];

  const complianceBadges = [
    {
      title: "GDPR Compliant",
      description: "Your data is protected under EU data protection laws",
      icon: Shield,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      title: "UK Data Protection",
      description: "Compliant with UK GDPR and Data Protection Act 2018",
      icon: Lock,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: "ISO 27001",
      description: "Information security management certified",
      icon: CheckCircle,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-elec-yellow/10 flex items-center justify-center">
              <Scale className="h-6 w-6 text-elec-yellow" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Legal & Privacy</h3>
              <p className="text-sm text-muted-foreground">
                Review our policies and learn how we protect your data
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Legal Documents */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground">Legal Documents</h3>
        </div>
        <div className="p-4 md:p-6 space-y-2">
          {legalDocuments.map((doc, index) => {
            const Icon = doc.icon;
            return (
              <button
                key={index}
                onClick={() => window.open(doc.url, '_blank')}
                className="w-full flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-lg ${doc.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-5 w-5 ${doc.iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{doc.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{doc.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    Updated {doc.lastUpdated}
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Compliance Badges */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Shield className="h-4 w-4 text-elec-yellow" />
            Compliance & Certifications
          </h3>
        </div>
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {complianceBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 text-center"
                >
                  <div className={`w-12 h-12 rounded-xl ${badge.bgColor} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`h-6 w-6 ${badge.color}`} />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">{badge.title}</p>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Data Storage Info */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Globe className="h-4 w-4 text-elec-yellow" />
            Data Storage & Security
          </h3>
        </div>
        <div className="p-4 md:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Globe className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">UK & EU Data Centers</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your data is stored securely in UK and EU data centers with full redundancy.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <Lock className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">End-to-End Encryption</p>
                <p className="text-xs text-muted-foreground mt-1">
                  All data is encrypted in transit and at rest using AES-256 encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Your Rights */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground">Your Data Rights</h3>
        </div>
        <div className="p-4 md:p-6">
          <p className="text-sm text-muted-foreground mb-4">
            Under GDPR and UK data protection law, you have the following rights:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Right to access your data',
              'Right to rectification',
              'Right to erasure ("right to be forgotten")',
              'Right to data portability',
              'Right to restrict processing',
              'Right to object to processing',
            ].map((right, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                {right}
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5"
              onClick={() => window.open('/data-request', '_blank')}
            >
              <FileText className="h-4 w-4 mr-2" />
              Submit Data Request
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Legal Contact */}
      <motion.div variants={itemVariants} className="rounded-xl bg-blue-500/10 border border-blue-500/20 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Mail className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Legal Inquiries</p>
              <p className="text-sm text-muted-foreground">
                For any legal questions or data protection inquiries, please contact our legal team at{' '}
                <a href="mailto:legal@elec-mate.com" className="text-blue-400 hover:underline">
                  legal@elec-mate.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Company Info */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Company Information</p>
              <p className="text-sm text-muted-foreground">
                Elec-Mate Ltd<br />
                Registered in England & Wales<br />
                Company No: 12345678
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LegalTab;
