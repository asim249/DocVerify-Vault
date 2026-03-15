import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-white/5 border-t-emerald-500 animate-spin" />
        <Loader2 className="w-8 h-8 text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
      <p className="text-emerald-500 font-bold tracking-widest uppercase text-xs animate-pulse">
        Securing Environment...
      </p>
    </div>
  );
}
