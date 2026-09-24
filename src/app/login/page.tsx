"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabaseClient } from "@/utils/supabase/client"

export default function LoginPage() {
  const router = useRouter()

  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const fakeEmail = `${mobile}@company.com`

    const { error: loginError } = await supabaseClient.auth.signInWithPassword({
      email: fakeEmail,
      password,
    })

    if (loginError) {
      setError(loginError.message)
      setLoading(false)
      return
    }

    const { data } = await supabaseClient.auth.getUser()
    const role = data?.user?.user_metadata?.role

    if (role === "worker") {
      router.push("/worker/dashboard")
    } else if (role === "salesman") {
      router.push("/sales/dashboard")
    } else {
      setError("Access not allowed")
      await supabaseClient.auth.signOut()
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#F3EFE1] px-4 py-10 text-[#293325]">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-[#293325]/10 bg-white shadow-[0_24px_80px_rgba(41,51,37,0.08)] md:grid-cols-2">

        {/* Left Branding Side */}
        <div className="hidden md:flex flex-col justify-center bg-[#293325] p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5">
              <img src="/logo.png" alt="Ubaid Chagharzai" className="h-8 w-8 object-contain" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B7E07E]">Ubaid Chagharzai</p>
              <h1 className="mt-1 text-2xl font-black uppercase tracking-tight">Premium Protection</h1>
            </div>
          </div>

          <p className="mt-8 max-w-xs text-base leading-7 text-white/75">
            Secure access for the team managing covers, rain suits, and premium bike gear orders.
          </p>

          <div className="mt-8 space-y-3 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#4CBB17]" />
              Fast order management
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#4CBB17]" />
              Trusted delivery support
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#4CBB17]" />
              Built for your daily workflow
            </div>
          </div>
        </div>

        {/* Right Login Side */}
        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#48872B]">Welcome back</p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-[#293325]">Login</h2>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#293325]">
                Mobile Number
              </label>
              <input
                type="text"
                required
                className="w-full rounded-xl border border-[#293325]/15 bg-[#F8F7F4] px-4 py-3 text-[#293325] outline-none transition focus:border-[#4CBB17] focus:ring-2 focus:ring-[#4CBB17]/20"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#293325]">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full rounded-xl border border-[#293325]/15 bg-[#F8F7F4] px-4 py-3 text-[#293325] outline-none transition focus:border-[#4CBB17] focus:ring-2 focus:ring-[#4CBB17]/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#4CBB17] px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#48872B] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>
        </div>

      </div>
    </div>
  )
}