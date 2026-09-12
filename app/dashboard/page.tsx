'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
    };
    getUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!user) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold">Asaan Qanoon AI - Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold text-sm"
        >
          Sign Out
        </button>
      </div>
      <p className="text-lg">Welcome, <span className="text-blue-400 font-semibold">{user.email}</span>!</p>
    </div>
  );
}