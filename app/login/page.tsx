'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else alert('Account created! Please check your email.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <form onSubmit={handleAuth} className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center">{isSignUp ? 'Create Account' : 'Sign In'}</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold transition"
        >
          {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <p
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-center text-sm text-gray-400 cursor-pointer hover:underline"
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
}