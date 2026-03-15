'use client';

import Sidebar from '@/src/components/Sidebar';
import ProtectedRoute from '@/src/components/ProtectedRoutes';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-8 min-h-[calc(100vh-64px)]">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
