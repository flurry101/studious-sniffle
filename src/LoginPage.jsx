import React, { useState } from 'react';
import { X, Mail, Lock, ArrowRight, Eye, EyeOff, User } from 'lucide-react';

export default function LoginPage({ isOpen, onClose }) {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      if (isSignup) {
        // check if email or name already exists in signup file
        const signupResponse = await fetch('http://localhost:4000/signups');
        const existingSignups = await signupResponse.json();
        const emailExists = existingSignups.some(signup => signup.email.toLowerCase() === email.toLowerCase());
        const nameExists = existingSignups.some(signup => signup.name.toLowerCase() === name.toLowerCase());
        if (emailExists) {
          setError('❌ This email is already registered. Please sign in or use a different email.');
          setIsLoading(false);
          return;
        }
        if (nameExists) {
          setError('❌ This name is already taken. Please choose a different name.');
          setIsLoading(false);
          return;
        }
      } else {
        // for login, check if email exists in logins.json
        const loginResponse = await fetch('http://localhost:4000/logins');
        const existingLogins = await loginResponse.json();
        const loginExists = existingLogins.some(login => login.email.toLowerCase() === email.toLowerCase());
        if (!loginExists) {
          setError('❌ Email not found. Please sign up first or check your email.');
          setIsLoading(false);
          return;
        }
      }
      const endpoint = isSignup ? 'http://localhost:4000/save-signup' : 'http://localhost:4000/save-login';
      const payload = isSignup 
        ? { name, email, password, timestamp: new Date().toISOString() }
        : { email, password, timestamp: new Date().toISOString() };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const message = isSignup ? '✅ Account created successfully! You can now sign in.' : '✅ Login successful!';
        setSuccess(message);
        console.log(`${message}`, payload);
        
        // Reset form and close modal after 1.5s
        setTimeout(() => {
          onClose();
          setName('');
          setEmail('');
          setPassword('');
          setIsSignup(false);
          setSuccess('');
        }, 1500);
      } else {
        throw new Error('Server responded with error');
      }
    } catch (err) {
      const message = isSignup ? 'Signup failed. Please try again.' : 'Login failed. Please try again.';
      setError(message);
      console.error('❌', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-[#1e1e1e] border border-white/20 max-w-md w-full p-8 rounded-lg relative chalk-border shadow-2xl">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-50 bg-[#1e1e1e]/80 rounded-full p-1 backdrop-blur-sm transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-block neon-text-lavender mb-2">
            {isSignup ? 'CREATE ACCOUNT' : 'WELCOME BACK'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isSignup ? 'Join us today' : 'Sign in to access your account'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input (Signup only) */}
          {isSignup && (
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center gap-2">
                <User className="w-4 h-4 text-[#CDB7FF]" /> Full Name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border border-gray-600 rounded-full px-4 py-3 focus:border-[#CDB7FF] focus:outline-none transition-colors text-white placeholder-gray-600"
                required={isSignup}
              />
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#A3CFFF]" /> Email Address
            </label>
            <input
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-gray-600 rounded-full px-4 py-3 focus:border-[#CDB7FF] focus:outline-none transition-colors text-white placeholder-gray-600"
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#F5A6C9]" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-gray-600 rounded-full px-4 py-3 pr-12 focus:border-[#CDB7FF] focus:outline-none transition-colors text-white placeholder-gray-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3 text-green-400 text-sm">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#CDB7FF] to-[#A3CFFF] text-black font-block text-lg py-3 rounded-full hover:scale-[1.02] transition-all shadow-lg shadow-[#CDB7FF]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (isSignup ? 'Creating account...' : 'Signing in...') : (
              <>
                {isSignup ? 'CREATE ACCOUNT' : 'SIGN IN'} <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            {isSignup ? (
              <>
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={() => { setIsSignup(false); setError(''); setSuccess(''); }}
                  className="text-[#A3CFFF] hover:text-[#CDB7FF] transition-colors font-semibold"
                >
                  Sign in here
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button 
                  type="button"
                  onClick={() => { setIsSignup(true); setError(''); setSuccess(''); }}
                  className="text-[#F5A6C9] hover:text-[#FF8F8F] transition-colors font-semibold"
                >
                  Sign up here
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
