'use client';

import React, { useState, useRef } from 'react';
import { Upload, File, X, Hash, Loader2 } from 'lucide-react';
import { calculateHash, formatBytes } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface FileUploadProps {
  onUpload: (file: File, hash: string) => void;
  isUploading?: boolean;
  progress?: number;
}

export default function FileUpload({ onUpload, isUploading, progress }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsCalculating(true);
      const fileHash = await calculateHash(selectedFile);
      setHash(fileHash);
      setIsCalculating(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setHash(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      {!file ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-zinc-400 group-hover:text-emerald-500" />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">Click to upload or drag and drop</p>
            <p className="text-sm text-zinc-500">PDF, PNG, JPG up to 10MB</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
          />
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <File className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-xs text-zinc-500">{formatBytes(file.size)}</p>
              </div>
            </div>
            {!isUploading && (
              <button onClick={removeFile} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                <Hash className="w-3 h-3" />
                SHA-256 Hash
              </div>
              <p className="text-sm font-mono break-all text-emerald-400">
                {isCalculating ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Calculating...
                  </span>
                ) : hash}
              </p>
            </div>

            {isUploading ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-zinc-400">Uploading...</span>
                  <span className="text-emerald-500">{progress}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <button
                disabled={isCalculating}
                onClick={() => hash && onUpload(file, hash)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                Upload Document
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
