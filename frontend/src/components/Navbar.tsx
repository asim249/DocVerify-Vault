'use client';

import Link from 'next/link';
import { useAuth } from '@/src/context/AuthContext';
import { Shield, LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="h-16 border-b border-white/10 bg-black/50 backdrop-blur-xl fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-emerald-500" />
          <span className="font-bold text-xl tracking-tight">VeriDoc</span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <UserIcon className="w-4 h-4" />
                <span>{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Login
              </Link>
              <Link
                href="/auth/register"
                className="text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
