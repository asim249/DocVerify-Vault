// 'use client';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import Link from 'next/link';
// import { useAuth } from '@/src/context/AuthContext';
// import { Shield, Loader2, Mail, Lock, User as UserIcon } from 'lucide-react';
// import { useState } from 'react';

// const registerSchema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters'),
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// type RegisterFormValues = z.infer<typeof registerSchema>;

// export default function RegisterPage() {
//   const { login } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
//     resolver: zodResolver(registerSchema),
//   });

//   const onSubmit = async (data: RegisterFormValues) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const res = await fetch('http://localhost:2000/api/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
//       const response = await res.json();
//       if(res.ok){
//         alert(response.message);
//       }else{
//         setError(response.message);
//       }

//     } catch (err) {
//       setError('Registration failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 mb-4">
//             <Shield className="w-8 h-8 text-emerald-500" />
//           </div>
//           <h1 className="text-3xl font-black tracking-tight">Create Account</h1>
//           <p className="text-zinc-500 mt-2">Join the secure document network</p>
//         </div>

//         <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {error && (
//               <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl">
//                 {error}
//               </div>
//             )}

//             <div className="space-y-2">
//               <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest px-1">Full Name</label>
//               <div className="relative">
//                 <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
//                 <input
//                   {...register('name')}
//                   type="text"
//                   className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all"
//                   placeholder="John Doe"
//                 />
//               </div>
//               {errors.name && <p className="text-xs text-red-500 px-1">{errors.name.message}</p>}
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest px-1">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
//                 <input
//                   {...register('email')}
//                   type="email"
//                   className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all"
//                   placeholder="name@company.com"
//                 />
//               </div>
//               {errors.email && <p className="text-xs text-red-500 px-1">{errors.email.message}</p>}
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest px-1">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
//                 <input
//                   {...register('password')}
//                   type="password"
//                   className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all"
//                   placeholder="••••••••"
//                 />
//               </div>
//               {errors.password && <p className="text-xs text-red-500 px-1">{errors.password.message}</p>}
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
//             >
//               {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
//             </button>
//           </form>

//           <p className="text-center text-zinc-500 mt-8 text-sm">
//             Already have an account?{' '}
//             <Link href="/auth/login" className="text-emerald-500 font-bold hover:underline">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Shield, Loader2, Mail, Lock, User as UserIcon, KeyRound, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 1. Updated Schema with Role and Optional Admin Key
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['user', 'admin']),
  adminKey: z.string().optional(),
}).refine((data) => {
  if (data.role === 'admin' && !data.adminKey) {
    return false;
  }
  return true;
}, {
  message: "Admin Secret Key is required for admin accounts",
  path: ["adminKey"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'user',
    }
  });

  // Role ko watch karein taaki conditional field show kar saken
  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:2000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const response = await res.json();
      
      if (res.ok) {
        alert("Registration Successful!");
        router.push('/auth/login');
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      setError('Registration failed. Please check if your backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 mb-4">
            <Shield className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">Create Account</h1>
          <p className="text-zinc-500 mt-2">Join the secure document network</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest px-1">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  {...register('name')}
                  type="text"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all text-white"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 px-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest px-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  {...register('email')}
                  type="email"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all text-white"
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 px-1">{errors.email.message}</p>}
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest px-1">Select Role</label>
              <div className="relative">
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
                <select
                  {...register('role')}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 appearance-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all text-white cursor-pointer"
                >
                  <option value="user" className="bg-zinc-900">Regular User</option>
                  <option value="admin" className="bg-zinc-900">System Admin</option>
                </select>
              </div>
            </div>

            {/* Conditional Admin Key Field */}
            {selectedRole === 'admin' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-sm font-bold text-emerald-500 uppercase tracking-widest px-1">Admin Secret Key</label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                  <input
                    {...register('adminKey')}
                    type="password"
                    className="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-xl py-4 pl-12 pr-4 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all text-white"
                    placeholder="Enter Secret Key"
                  />
                </div>
                {errors.adminKey && <p className="text-xs text-red-500 px-1">{errors.adminKey.message}</p>}
              </div>
            )}

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  {...register('password')}
                  type="password"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all text-white"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-xs text-red-500 px-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-zinc-500 mt-8 text-sm">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-emerald-500 font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}