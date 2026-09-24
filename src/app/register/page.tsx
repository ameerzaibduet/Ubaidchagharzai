"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", email: "", password: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const existing = users.find((u: any) => u.email === form.email)

    if (existing) {
      alert("User already exists with this email")
      return
    }

    users.push(form)
    localStorage.setItem("users", JSON.stringify(users))
    alert("Registered successfully")
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-[#F3EFE1] px-4 py-10 text-[#293325]">
      <div className="mx-auto max-w-lg rounded-[28px] border border-[#293325]/10 bg-white p-6 shadow-[0_24px_80px_rgba(41,51,37,0.08)] sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#293325]/10 bg-[#F8F7F4]">
            <img src="/logo.png" alt="Ubaid Chagharzai" className="h-9 w-9 object-contain" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#48872B]">Create account</p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-[#293325]">Register</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#293325]">Full Name</label>
            <Input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="h-12 rounded-xl border-[#293325]/15 bg-[#F8F7F4] text-[#293325] focus:border-[#4CBB17] focus:ring-[#4CBB17]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#293325]">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="h-12 rounded-xl border-[#293325]/15 bg-[#F8F7F4] text-[#293325] focus:border-[#4CBB17] focus:ring-[#4CBB17]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#293325]">Password</label>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="h-12 rounded-xl border-[#293325]/15 bg-[#F8F7F4] text-[#293325] focus:border-[#4CBB17] focus:ring-[#4CBB17]/20"
            />
          </div>

          <Button type="submit" className="mt-2 h-12 w-full rounded-xl bg-[#4CBB17] text-base font-bold text-white hover:bg-[#48872B]">
            Register
          </Button>
        </form>
      </div>
    </div>
  )
}
