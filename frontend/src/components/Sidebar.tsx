'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { cn } from '@/src/lib/utils';
import { 
  LayoutDashboard, 
  Upload, 
  CheckCircle, 
  ShieldAlert, 
  Settings 
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Upload Document', href: '/upload', icon: Upload },
  { name: 'Verify Document', href: '/verify', icon: CheckCircle },
];

const adminItems = [
  { name: 'Admin Panel', href: '/admin', icon: ShieldAlert },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="w-64 border-r border-white/10 h-[calc(100vh-64px)] fixed left-0 top-16 bg-black/20 hidden md:block">
      <div className="p-4 space-y-2">
        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold px-4 mb-4">Main Menu</p>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              pathname === item.href 
                ? "bg-emerald-500/10 text-emerald-500" 
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}

        {user?.role === 'admin' && (
          <>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold px-4 mt-8 mb-4">Administration</p>
            {adminItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  pathname === item.href 
                    ? "bg-emerald-500/10 text-emerald-500" 
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </>
        )}
      </div>
    </aside>
  );
}
