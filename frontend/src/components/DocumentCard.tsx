import { Document } from '@/src/types';
import { File, Calendar, HardDrive, Hash, CheckCircle2, Clock, Trash2 } from 'lucide-react';
import { formatBytes } from '@/src/lib/utils';

interface DocumentCardProps {
  doc: Document;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export default function DocumentCard({ doc, onDelete, isAdmin }: DocumentCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <File className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-bold text-lg truncate max-w-[200px]">{doc.fileName}</h3>
            {isAdmin && <p className="text-xs text-zinc-500">Uploaded by: {doc.userName}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {doc.status === 'verified' ? (
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              Pending
            </span>
          )}
          {onDelete && (
            <button 
              onClick={() => onDelete(doc.id)}
              className="p-2 hover:bg-red-500/10 hover:text-red-500 text-zinc-500 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-zinc-500">
            <Calendar className="w-4 h-4" />
            <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
            <HardDrive className="w-4 h-4" />
            <span>{formatBytes(doc.fileSize)}</span>
          </div>
        </div>

        <div className="bg-black/30 rounded-xl p-3 border border-white/5">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">
            <Hash className="w-3 h-3" />
            Hash
          </div>
          <p className="text-[10px] font-mono text-zinc-400 break-all leading-tight">
            {doc.hash}
          </p>
        </div>
      </div>
    </div>
  );
}
