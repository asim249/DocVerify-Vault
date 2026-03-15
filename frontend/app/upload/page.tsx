'use client';

import { useState } from 'react';
import DashboardLayout from '@/src/components/DashboardLayout';
import FileUpload from '@/src/components/FileUpload'; 
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion'; 
import { CheckCircle2, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);
    setProgress(10); // Start progress

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('http://localhost:2000/api/documents/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include', 
      });

      if (!res.ok) {
        throw new Error('Upload failed. Please check file size or login status.');
      }

      for (let i = 20; i <= 100; i += 20) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 150));
      }

      setIsSuccess(true);
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong during upload');
      setIsUploading(false);
      setProgress(0);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8 p-4 md:p-0">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10">
            <ArrowLeft className="w-6 h-6 text-zinc-400" />
          </Link>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white">Secure Upload</h1>
            <p className="text-zinc-500 font-medium">Register your document's unique fingerprint</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="upload-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="bg-zinc-900/50 border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl backdrop-blur-sm">
                <FileUpload 
                  onUpload={handleUpload} 
                  isUploading={isUploading} 
                  progress={progress} 
                />
                
                {error && (
                  <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                <div className="mt-10 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                  </div>
                  <h4 className="text-emerald-500 font-bold text-sm mb-3 flex items-center gap-2 uppercase tracking-widest">
                    Verification Protocol
                  </h4>
                  <p className="text-[13px] text-zinc-400 leading-relaxed relative z-10">
                    Your document is processed through <span className="text-white font-mono">SHA-256</span> hashing. 
                    This creates a mathematical fingerprint that is impossible to reverse or forge. 
                    We store the hash and metadata for future integrity checks.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/10 border border-emerald-500/20 rounded-[3rem] p-16 text-center flex flex-col items-center gap-8 shadow-2xl shadow-emerald-500/5"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse"></div>
                <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center relative shadow-inner">
                  <CheckCircle2 className="w-12 h-12 text-white stroke-[3px]" />
                </div>
              </div>
              
              <div>
                <h2 className="text-4xl font-black text-white mb-3">Vault Secured</h2>
                <p className="text-zinc-400 text-lg">Document successfully registered and hashed.</p>
              </div>
              
              <div className="flex items-center gap-3 px-6 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Syncing Dashboard</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}

// Small helper for loading state if not imported
function Loader2({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}