import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Zap, Lock, Eye, EyeOff, CheckCircle2, AlertTriangle, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Password requirements
const PASSWORD_REQUIREMENTS = [
  { id: 'length', label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { id: 'uppercase', label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number', label: 'One number', test: (p: string) => /[0-9]/.test(p) },
];

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { updatePassword, user } = useAuth();
  const navigate = useNavigate();

  // Check if user came from a valid reset link
  useEffect(() => {
    // Supabase handles the token verification automatically
    // The user will be logged in if the token is valid
  }, []);

  const getPasswordStrength = (password: string) => {
    const passed = PASSWORD_REQUIREMENTS.filter(req => req.test(password)).length;
    if (passed === 0) return { level: 0, label: '', color: '' };
    if (passed === 1) return { level: 1, label: 'Weak', color: 'bg-red-500' };
    if (passed === 2) return { level: 2, label: 'Fair', color: 'bg-orange-500' };
    if (passed === 3) return { level: 3, label: 'Good', color: 'bg-yellow-500' };
    return { level: 4, label: 'Strong', color: 'bg-green-500' };
  };

  const strength = getPasswordStrength(password);
  const allRequirementsMet = PASSWORD_REQUIREMENTS.every(req => req.test(password));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!allRequirementsMet) {
      setError('Please meet all password requirements');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const { error } = await updatePassword(password);

      if (error) {
        setError(error.message);
      } else {
        setIsSuccess(true);
        // Redirect to sign in after 3 seconds
        setTimeout(() => {
          navigate('/auth/signin');
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-card rounded-full blur-[120px] opacity-30 pointer-events-none" />

      {/* Header */}
      <header className="relative w-full px-4 pt-6 pb-4 sm:pt-8">
        <Link to="/" className="flex items-center justify-center gap-2 group">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-yellow-400 flex items-center justify-center transition-transform group-hover:scale-105">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-white">
            Elec-<span className="text-yellow-400">Mate</span>
          </span>
        </Link>
      </header>

      {/* Main content */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 pb-8">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Header text */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
              {isSuccess ? 'Password updated' : 'Set new password'}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              {isSuccess
                ? "You can now sign in with your new password"
                : "Create a strong password to secure your account"
              }
            </p>
          </div>

          {/* Card */}
          <Card className="border-white/10 bg-neutral-900 shadow-xl transition-all duration-300 hover:border-yellow-400/20">
            <CardContent className="pt-6">
              {isSuccess ? (
                <div className="text-center py-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">All set!</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Redirecting you to sign in...
                  </p>
                  <div className="flex justify-center">
                    <Loader2 className="h-5 w-5 animate-spin text-yellow-400" />
                  </div>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="mb-5 p-3 rounded-lg bg-card border border-red-500/30 animate-fade-in">
                      <div className="flex gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <p className="text-sm text-red-400">{error}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* New Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-gray-300">New password</Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 transition-colors group-focus-within:text-yellow-400" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter new password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 h-12 text-base bg-black border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 transition-all duration-200"
                          autoComplete="new-password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>

                      {/* Password strength indicator */}
                      {password && (
                        <div className="space-y-2 animate-fade-in">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  "h-full transition-all duration-300",
                                  strength.color
                                )}
                                style={{ width: `${(strength.level / 4) * 100}%` }}
                              />
                            </div>
                            {strength.label && (
                              <span className={cn(
                                "text-xs font-medium",
                                strength.level <= 1 && "text-red-400",
                                strength.level === 2 && "text-orange-400",
                                strength.level === 3 && "text-yellow-400",
                                strength.level === 4 && "text-green-400"
                              )}>
                                {strength.label}
                              </span>
                            )}
                          </div>

                          {/* Requirements list */}
                          <div className="grid grid-cols-2 gap-1.5">
                            {PASSWORD_REQUIREMENTS.map((req) => {
                              const passed = req.test(password);
                              return (
                                <div
                                  key={req.id}
                                  className={cn(
                                    "flex items-center gap-1.5 text-xs transition-colors",
                                    passed ? "text-green-400" : "text-gray-500"
                                  )}
                                >
                                  {passed ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <X className="h-3 w-3" />
                                  )}
                                  {req.label}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">Confirm password</Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 transition-colors group-focus-within:text-yellow-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={cn(
                            "pl-10 pr-10 h-12 text-base bg-black border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 transition-all duration-200",
                            confirmPassword && password !== confirmPassword && "border-red-500/50"
                          )}
                          autoComplete="new-password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {confirmPassword && password !== confirmPassword && (
                        <p className="text-xs text-red-400 animate-fade-in">Passwords don't match</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold bg-yellow-400 hover:bg-yellow-300 text-black transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                      disabled={isSubmitting || !allRequirementsMet || password !== confirmPassword}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Update password'
                      )}
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative px-4 pb-6">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5 transition-colors hover:text-gray-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              Secure update
            </span>
            <span className="transition-colors hover:text-gray-400">BS7671 compliant</span>
            <span className="transition-colors hover:text-gray-400">UK based</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResetPassword;
