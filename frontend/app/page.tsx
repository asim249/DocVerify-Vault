import Link from 'next/link';
import { Shield, Lock, CheckCircle, ArrowRight, FileText, Hash } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-4 pt-24 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
          <Lock className="w-3 h-3" />
          Blockchain-Grade Security
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
          SECURE YOUR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            DOCUMENTS
          </span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
          The ultimate platform for document integrity. Hash, store, and verify your sensitive files with immutable cryptographic proof.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/auth/register" 
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/verify" 
            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all"
          >
            Verify a Document
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full bg-white/[0.02] border-y border-white/5 py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Hash className="w-8 h-8 text-emerald-500" />}
              title="SHA-256 Hashing"
              description="Every document is hashed locally before upload, ensuring your actual content never leaves your control unless you want it to."
            />
            <FeatureCard 
              icon={<CheckCircle className="w-8 h-8 text-cyan-500" />}
              title="Instant Verification"
              description="Verify the authenticity of any document in seconds by comparing its current hash with our secure records."
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-indigo-500" />}
              title="Admin Controls"
              description="Comprehensive administrative dashboard for managing users, monitoring uploads, and maintaining platform integrity."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all group">
      <div className="mb-6 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-zinc-500 leading-relaxed">{description}</p>
    </div>
  );
}
