'use client';

import { useState, useRef } from 'react';
import DashboardLayout from '@/src/components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, Loader2, ShieldCheck, ShieldAlert, Clock, User } from 'lucide-react';

export default function VerifyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
    }
  };

const handleVerify = async () => {
  if (!file) return;
  setIsVerifying(true);
  setResult(null);
  setError(null);

  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:2000/api/documents/verify', {
      method: 'POST',
      body: formData,
      credentials: 'include', 
    });

    const data = await res.json();

    // Debugging ke liye
    console.log("Backend Response:", data);

    if (res.ok && data.message === "Valid document") {
      // Yahan data.message check karein kyunki backend yahi bhej raha hai
      setResult({
        status: 'Valid',
        uploader: data.uploadedBy,
        timestamp: data.uploadedAt
      });
    } else if (data.message === "Modified document") {
      setResult({ status: 'Modified' });
    } else {
      setResult({ status: 'not_found' });
    }
  } catch (err) {
    console.error("Fetch Error:", err);
    setError('Server connection error.');
  } finally {
    setIsVerifying(false);
  }
};

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8 p-4">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black tracking-tight text-white">System Verification</h1>
          <p className="text-zinc-500 mt-2">Upload any document to check its cryptographic integrity</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
          {!file ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-zinc-500 group-hover:text-emerald-500 transition-colors" />
              </div>
              <div className="text-center">
                <p className="font-bold text-white text-lg">Drop file or click to browse</p>
                <p className="text-sm text-zinc-500 mt-1">Supports PDF, PNG, JPG (Max 5MB)</p>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.png,.jpg" />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="bg-emerald-500/10 p-2 rounded-lg">
                    <File className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-white truncate">{file.name}</p>
                    <p className="text-xs text-zinc-500">{(file.size / 1024).toFixed(2)} KB • Ready</p>
                  </div>
                </div>
                <button onClick={() => {setFile(null); setResult(null);}} className="text-xs font-bold text-zinc-500 hover:text-white uppercase tracking-widest">
                  Reset
                </button>
              </div>

              <button
                onClick={handleVerify}
                disabled={isVerifying}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Hash...</span>
                  </>
                ) : (
                  'Run Integrity Check'
                )}
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-8 rounded-3xl border shadow-2xl ${
                result.status === 'Valid' 
                  ? 'bg-emerald-500/5 border-emerald-500/20' 
                  : 'bg-red-500/5 border-red-500/20'
              }`}
            >
              <div className="flex flex-col items-center text-center gap-6">
                {result.status === 'Valid' ? (
                  <>
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <ShieldCheck className="w-12 h-12 text-emerald-500" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-3xl font-black text-emerald-500">AUTHENTIC</h2>
                      <p className="text-zinc-400">This document matches the original file in our registry.</p>
                    </div>
                    
                    {/* Meta Info Table */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-left">
                        <div className="flex items-center gap-2 mb-1 text-zinc-500">
                          <User className="w-4 h-4" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Uploaded By</span>
                        </div>
                        <p className="text-white font-bold">{result.uploader || 'Authorized User'}</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-left">
                        <div className="flex items-center gap-2 mb-1 text-zinc-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Timestamp</span>
                        </div>
                        <p className="text-white font-bold">{new Date(result.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                      <ShieldAlert className="w-12 h-12 text-red-500" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-3xl font-black text-red-500">
                        {result.status === 'not_found' ? 'NOT REGISTERED' : 'MODIFIED'}
                      </h2>
                      <p className="text-zinc-400">
                        {result.status === 'not_found' 
                          ? 'This document was never registered in our system.' 
                          : 'Warning: The cryptographic signature has changed. Data tampering detected.'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}