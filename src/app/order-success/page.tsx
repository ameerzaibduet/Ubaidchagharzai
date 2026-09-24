"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown, CheckCircle, Package, ChevronRight } from "lucide-react"
import { formatPrice } from "@/lib/format-price"
import type { StoredCustomerOrder } from "@/lib/use-customer-orders"

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<StoredCustomerOrder | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem("lastPlacedOrder")
    if (!raw) return
    try {
      setOrder(JSON.parse(raw) as StoredCustomerOrder)
    } catch {
      setOrder(null)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F3EFE1] px-4 py-10 text-[#293325]">
      <div className="mx-auto max-w-lg">
        <div className="rounded-[28px] border border-[#293325]/10 bg-white p-6 shadow-[0_24px_80px_rgba(41,51,37,0.08)] sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E9F7D9]">
              <CheckCircle className="size-14 text-[#4CBB17]" />
            </div>
            <h1 className="mt-4 text-2xl font-black uppercase tracking-tight text-[#293325]">Order placed!</h1>
            <p className="mt-2 text-sm text-[#293325]/70">
              Thank you. We have received your order and will contact you soon.
            </p>
          </div>

          {order ? (
            <div className="mt-6 rounded-2xl border border-[#293325]/10 bg-[#F8F7F4] p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#48872B]">
                  Order details
                </p>
                <span className="font-mono text-[10px] text-[#293325]/60">
                  #{order.id.slice(0, 8).toUpperCase()}
                </span>
              </div>

              <ul className="space-y-3">
                {order.items.map((item, index) => (
                  <li key={`${item.id}-${index}`} className="flex gap-3">
                    {item.image ? (
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-white">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-white text-slate-400">
                        <Package className="size-5" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#293325]">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#293325]/65">
                        {item.quantity} × {formatPrice(item.price)}
                        {item.color ? ` · ${item.color}` : ""}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 space-y-1 border-t border-[#293325]/10 pt-3 text-sm text-[#293325]/70">
                <p>
                  <span className="font-medium text-[#293325]">Name:</span> {order.name}
                </p>
                <p>
                  <span className="font-medium text-[#293325]">Phone:</span> {order.phone}
                </p>
                <p>
                  <span className="font-medium text-[#293325]">Address:</span> {order.address},{" "}
                  {order.city}
                </p>
                <p className="pt-1 text-base font-black text-[#4CBB17]">
                  Total: {formatPrice(order.total)}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-6 text-center text-sm text-[#293325]/65">
              Your order was placed successfully.
            </p>
          )}

          <div className="mt-8 rounded-2xl border border-[#D8EFC0] bg-[#F4F9EE] p-4">
            <p className="text-center text-sm font-bold text-[#293325]">
              Track your order anytime
            </p>

            <div className="mt-4 flex flex-col items-center gap-2 text-center">
              <ArrowDown className="size-5 animate-bounce text-[#4CBB17]" />
              <p className="text-xs leading-relaxed text-[#293325]/70">
                Open the menu at the top and tap{" "}
                <span className="font-bold text-[#48872B]">My Orders</span> to see status
                updates when your parcel is booked or delivered.
              </p>
              <div className="mt-2 flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#293325] shadow-sm">
                Menu
                <ChevronRight className="size-3.5" />
                My Orders
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/orders" className="flex-1">
              <Button className="h-12 w-full rounded-2xl bg-[#4CBB17] font-bold text-white hover:bg-[#48872B]">
                View My Orders
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button
                variant="outline"
                className="h-12 w-full rounded-2xl border-2 border-[#293325]/20 bg-white font-bold text-[#293325] hover:bg-[#F5F7F1]"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
