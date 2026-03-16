'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/src/components/DashboardLayout';
import { Document } from '@/src/types';
import { Search, Trash2, User, Hash, ShieldAlert, File, Loader2 } from 'lucide-react';
import { formatBytes } from '@/src/lib/utils';

export default function AdminDashboard() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchAllDocs = async () => {
    setIsLoading(true);
    try {
      const queryParam = search ? `?hash=${encodeURIComponent(search)}` : "";
    const url = `http://localhost:2000/api/documents/admin/documents${queryParam}`;

      const res = await fetch(url, {
        credentials: 'include', 
      });
      const data = await res.json();
      if (res.ok) {
        setDocuments(data);
      }
    } catch (error) {
      console.error("Failed to fetch documents", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
    fetchAllDocs();
  }, 500);

  return () => clearTimeout(delayDebounceFn);
  }, [search]); 

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this document?')) return;

    setIsDeleting(id);
    try {
      const res = await fetch(`http://localhost:2000/api/documents/admin/delete-document/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setDocuments(prev => prev.filter(d => d._id !== id));
        alert("Document deleted successfully");
      } else {
        alert("Failed to delete document");
      }
    } catch (error) {
      alert("Error deleting document");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center shadow-lg shadow-red-500/5">
              <ShieldAlert className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white">Admin Console</h1>
              <p className="text-zinc-500 text-sm">Manage global documents and integrity</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-white/5 px-4 py-2 rounded-xl">
             <span className="text-zinc-400 text-xs uppercase font-bold tracking-widest">Total Logs:</span>
             <span className="ml-2 text-white font-mono">{documents.length}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by hash, user, or filename..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 outline-none transition-all text-white"
          />
        </div>

        {/* Table Container */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Document</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Uploader</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">SHA256 Hash</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-red-500 mx-auto mb-2" />
                      <p className="text-zinc-500">Loading master records...</p>
                    </td>
                  </tr>
                ) : documents.map((doc) => (
                  <tr key={doc._id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                          <File className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white truncate max-w-[150px]">{doc.fileName}</p>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-tighter italic">Secured</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
                           <User className="w-3 h-3 text-zinc-400" />
                        </div>
                        <span className="text-sm text-zinc-300">{doc.userId?.name || 'Unknown User'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5 w-fit">
                        <Hash className="w-3 h-3 text-red-500/50" />
                        <span className="text-[11px] font-mono text-zinc-400 select-all">{doc.fileHash}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-500 font-mono">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(doc._id)}
                        disabled={isDeleting === doc._id}
                        className="p-2 hover:bg-red-500/10 text-zinc-600 hover:text-red-500 rounded-xl transition-all disabled:opacity-50"
                      >
                        {isDeleting === doc._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!isLoading && documents.length === 0 && (
            <div className="py-20 text-center border-t border-white/5 bg-white/[0.01]">
              <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-zinc-600" />
              </div>
              <h3 className="text-white font-bold">No Records Found</h3>
              <p className="text-zinc-500 text-sm">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}