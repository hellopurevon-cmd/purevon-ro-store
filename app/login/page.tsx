"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(form.email, form.password);
        toast.success("Welcome back! 🎉");
        router.push("/");
      } else {
        await signUp(form.email, form.password, form.fullName);
        toast.success("Account created! Please check your email to verify.");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
      
      // 🔥 Sign up success message
      if (!isLogin && !loading) {
        alert("Account created! Please check your email to verify.");
        router.push("/login");
      }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <h1 className="text-3xl font-bold mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h1>
        <p className="text-zinc-400 mb-6">
          {isLogin ? "Sign in to your account" : "Sign up for a new account"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black font-bold py-4 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-zinc-400 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-yellow-400 ml-2 hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </main>
  );
}