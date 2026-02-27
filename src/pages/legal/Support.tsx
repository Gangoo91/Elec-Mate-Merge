import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, ArrowLeft, Mail, Phone, MessageCircle, HelpCircle, Shield } from 'lucide-react';

const Support = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full px-4 py-3 sm:py-4 border-b border-white/10 bg-black/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group touch-manipulation">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-yellow-400 flex items-center justify-center transition-transform group-hover:scale-105">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
            </div>
            <span className="text-lg sm:text-xl font-bold">
              Elec-<span className="text-yellow-400">Mate</span>
            </span>
          </Link>
          <Link to="/">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 border-white/20 text-white hover:bg-white/5 touch-manipulation active:scale-95"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        {/* Hero */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 mb-4">
            <HelpCircle className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            How can we <span className="text-yellow-400">help?</span>
          </h1>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Got a question, found a bug or need a hand? We're here to help. Reach out through any of the channels below.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Email */}
          <a href="mailto:info@elec-mate.com" className="block touch-manipulation">
            <Card className="bg-white/5 border-white/10 hover:border-yellow-400/30 transition-colors h-full">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center mx-auto">
                  <Mail className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Email</h3>
                <p className="text-white text-sm">
                  info@elec-mate.com
                </p>
                <p className="text-white text-xs">
                  We aim to reply within 24 hours
                </p>
              </CardContent>
            </Card>
          </a>

          {/* Phone */}
          <a href="tel:+447507241303" className="block touch-manipulation">
            <Card className="bg-white/5 border-white/10 hover:border-yellow-400/30 transition-colors h-full">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center mx-auto">
                  <Phone className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Phone</h3>
                <p className="text-white text-sm">
                  07507 241 303
                </p>
                <p className="text-white text-xs">
                  Mon-Fri, 9am-5pm
                </p>
              </CardContent>
            </Card>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/Elec_MateOfficialGroup"
            target="_blank"
            rel="noopener noreferrer"
            className="block touch-manipulation"
          >
            <Card className="bg-white/5 border-white/10 hover:border-yellow-400/30 transition-colors h-full">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center mx-auto">
                  <MessageCircle className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Telegram</h3>
                <p className="text-white text-sm">
                  Community Group
                </p>
                <p className="text-white text-xs">
                  Chat with us and other sparks
                </p>
              </CardContent>
            </Card>
          </a>
        </div>

        {/* FAQ Section */}
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Common Questions</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-white mb-1">How do I cancel my subscription?</h3>
                <p className="text-white text-sm">
                  Go to Settings &gt; Billing and tap Manage Subscription. On iOS you can also cancel via Settings &gt; Apple ID &gt; Subscriptions on your device.
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="font-medium text-white mb-1">How do I restore my purchases?</h3>
                <p className="text-white text-sm">
                  Go to Settings &gt; Billing and tap Restore Purchases. This will sync your subscription from Apple or Google Play.
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="font-medium text-white mb-1">How do I delete my account?</h3>
                <p className="text-white text-sm">
                  Go to Settings &gt; Privacy and tap Delete My Account. This will permanently remove all your data. Please cancel your subscription first.
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="font-medium text-white mb-1">Is my data secure?</h3>
                <p className="text-white text-sm">
                  Yes. All data is encrypted in transit and at rest. We use Supabase (built on PostgreSQL) with row-level security. Your certificates and business data are private to your account.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Legal Links */}
        <div className="flex flex-wrap gap-3 justify-center text-sm">
          <Link to="/privacy" className="text-white hover:text-yellow-400 touch-manipulation">
            Privacy Policy
          </Link>
          <span className="text-white">|</span>
          <Link to="/terms" className="text-white hover:text-yellow-400 touch-manipulation">
            Terms of Service
          </Link>
          <span className="text-white">|</span>
          <Link to="/cookies" className="text-white hover:text-yellow-400 touch-manipulation">
            Cookie Policy
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center pb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-white">Built in the UK for UK electricians</span>
          </div>
          <p className="text-xs text-white">
            &copy; 2026 Elec-Mate. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Support;
