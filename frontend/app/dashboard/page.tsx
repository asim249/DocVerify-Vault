// 'use client';

// import { useEffect, useState } from 'react';
// import DashboardLayout from '@/src/components/DashboardLayout';
// import DocumentCard from '@/src/components/DocumentCard';
// import { documentService } from '@/src/services/api';
// import { Document } from '@/src/types';
// import { FileText, Plus, Search, Filter } from 'lucide-react';
// import Link from 'next/link';

// export default function DashboardPage() {
//   const [documents, setDocuments] = useState<Document[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDocs = async () => {
//       try {
//         // Mocking data for demonstration
//         const mockDocs: Document[] = [
//           {
//             id: '1',
//             userId: '1',
//             userName: 'Demo User',
//             fileName: 'Contract_2024.pdf',
//             fileSize: 1024 * 1024 * 2.5,
//             hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
//             status: 'verified',
//             createdAt: new Date().toISOString(),
//           },
//           {
//             id: '2',
//             userId: '1',
//             userName: 'Demo User',
//             fileName: 'Identity_Proof.jpg',
//             fileSize: 1024 * 512,
//             hash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
//             status: 'pending',
//             createdAt: new Date(Date.now() - 86400000).toISOString(),
//           }
//         ];
//         setDocuments(mockDocs);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchDocs();
//   }, []);

//   const handleDelete = (id: string) => {
//     setDocuments(prev => prev.filter(doc => doc.id !== id));
//   };

//   return (
//     <DashboardLayout>
//       <div className="space-y-8">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-4xl font-black tracking-tight">Dashboard</h1>
//             <p className="text-zinc-500">Manage and monitor your secure documents</p>
//           </div>
//           <Link 
//             href="/upload"
//             className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 w-fit"
//           >
//             <Plus className="w-5 h-5" />
//             New Upload
//           </Link>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           <StatCard label="Total Documents" value={documents.length.toString()} icon={<FileText className="w-5 h-5" />} />
//           <StatCard label="Verified" value={documents.filter(d => d.status === 'verified').length.toString()} icon={<CheckCircle className="w-5 h-5 text-emerald-500" />} />
//           <StatCard label="Pending" value={documents.filter(d => d.status === 'pending').length.toString()} icon={<Clock className="w-5 h-5 text-amber-500" />} />
//         </div>

//         {/* Filters & Search */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
//             <input 
//               type="text" 
//               placeholder="Search documents by name or hash..."
//               className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-emerald-500/50 outline-none transition-all"
//             />
//           </div>
//           <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 text-zinc-400 hover:text-white transition-all">
//             <Filter className="w-4 h-4" />
//             Filters
//           </button>
//         </div>

//         {/* Documents Grid */}
//         {isLoading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {[1, 2, 3, 4].map(i => (
//               <div key={i} className="h-48 bg-white/5 animate-pulse rounded-2xl border border-white/10" />
//             ))}
//           </div>
//         ) : documents.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {documents.map(doc => (
//               <DocumentCard key={doc.id} doc={doc} onDelete={handleDelete} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-24 bg-white/5 rounded-3xl border border-white/10 border-dashed">
//             <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
//             <h3 className="text-xl font-bold">No documents yet</h3>
//             <p className="text-zinc-500 mt-2">Start by uploading your first secure document</p>
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// }

// function StatCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
//   return (
//     <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
//       <div className="flex items-center justify-between mb-4">
//         <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{label}</span>
//         <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
//           {icon}
//         </div>
//       </div>
//       <p className="text-3xl font-black">{value}</p>
//     </div>
//   );
// }

// import { CheckCircle, Clock } from 'lucide-react';
'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/src/components/DashboardLayout';
import DocumentCard from '@/src/components/DocumentCard';
import { Document } from '@/src/types';
import { FileText, Plus, Search, Filter, CheckCircle, Clock, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Fetch User Documents from Backend
  const fetchDocs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:2000/api/documents/my-documents', {
        method: 'GET',
        credentials: 'include', 
      });
      console.log("res",res)
      const data = await res.json();
      console.log("Backend Response:", data);
      if (res.ok) {
        setDocuments(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  // 2. Client-side Search Logic
  const filteredDocs = documents.filter(doc => 
    doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.fileHash.includes(searchQuery)
  );

  // 3. Delete Handler (Optional: agar user apni entry delete kar sake)
  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure you want to remove this record?")) return;
    try {
      const res = await fetch(`http://localhost:2000/api/documents/admin/delete-document/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        setDocuments(prev => prev.filter(doc => doc._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 p-4 md:p-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white">Personal Vault</h1>
            <p className="text-zinc-500">Manage and monitor your secure documents</p>
          </div>
          <Link 
            href="/upload"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Upload New File
          </Link>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard 
            label="Total Uploads" 
            value={documents.length.toString()} 
            icon={<FileText className="w-5 h-5 text-zinc-400" />} 
          />
          <StatCard 
            label="Verified Docs" 
            value={documents.length.toString()} // Hash stored means it's verified in this system
            icon={<CheckCircle className="w-5 h-5 text-emerald-500" />} 
          />
          <StatCard 
            label="Storage Usage" 
            value="Secure" 
            icon={<Clock className="w-5 h-5 text-amber-500" />} 
          />
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by filename or SHA256 hash..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-emerald-500/50 outline-none transition-all text-white"
            />
          </div>
        </div>

        {/* Documents Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-48 bg-white/5 animate-pulse rounded-3xl border border-white/10" />
            ))}
          </div>
        ) : filteredDocs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDocs.map(doc => (
              <DocumentCard 
                key={doc._id} 
                doc={{
                  id: doc._id,
                  fileName: doc.fileName,
                  fileSize: doc.fileSize || 0,
                  hash: doc.fileHash,
                  createdAt: doc.createdAt,
                  status: 'verified'
                }} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/[0.02] rounded-[2.5rem] border border-white/10 border-dashed">
            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-zinc-700" />
            </div>
            <h3 className="text-2xl font-bold text-white">No documents found</h3>
            <p className="text-zinc-500 mt-2 max-w-xs mx-auto">
              {searchQuery ? "Try a different search term" : "Your secure vault is empty. Start by uploading a document."}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:bg-white/[0.07] transition-colors group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">{label}</span>
        <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <p className="text-4xl font-black text-white">{value}</p>
    </div>
  );
}