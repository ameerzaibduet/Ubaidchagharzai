"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCart } from "@/lib/use-cart"
import { useCartUI } from "@/lib/use-cart-ui"
import { useState } from "react"
import { ShoppingCart, Menu, ChevronDown, X, Home, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Oswald } from "next/font/google"
import CartDrawer from "./CartDrawer"
import Image from "next/image"

const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
})

const smallNotch = {
  clipPath:
    "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
}

const tagNotch = {
  clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
}

export default function Navbar() {
  const pathname = usePathname()
  const { cart } = useCart()
  const { isCartOpen, openCart, closeCart } = useCartUI()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const categories = ["Parachute", "Rexine", "Car Top Cover", "Rain Suites"]

  const navLink =
    "relative text-[#293325] text-sm font-medium py-2 after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-[#4CBB17] after:transition-all after:duration-300 hover:after:w-full"

  return (
    <header className="sticky top-0 z-50 border-b border-[#293325]/15 bg-[#F8F5EE] shadow-sm shadow-[#293325]/5">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center relative">

        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span
            className="flex items-center justify-center w-10 h-10 shrink-0"
            style={smallNotch}
          >
            <Image
              src="/logo.png"
              alt="Ubaid Chagharzai"
              width={36}
              height={36}
              className="object-contain"
            />
          </span>
          <span
            className={`${display.className} text-[#293325] font-semibold text-base sm:text-lg uppercase tracking-tight leading-none`}
          >
            Ubaid Chagharzai
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 relative">
          {/* Home Link */}
          <Link href="/" className={`${navLink} flex items-center gap-1.5`}>
            <Home size={15} /> Home
          </Link>

          {/* Category Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCategoryOpen(true)}
            onMouseLeave={() => setCategoryOpen(false)}
          >
            <button className={`${navLink} flex items-center gap-1`}>
              Categories <ChevronDown size={15} />
            </button>

            <AnimatePresence>
              {categoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full mt-2 bg-[#F3EFE1] border-2 border-[#293325] p-2 w-40 z-50"
                  style={tagNotch}
                >
                  <div className="flex flex-col gap-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/category/${encodeURIComponent(cat)}`}
                        className="text-[#293325] hover:text-[#48872B] text-sm font-medium px-2 py-1.5 transition-colors"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/orders" className={`${navLink} flex items-center gap-1.5`}>
            <Package size={15} /> My Orders
          </Link>

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative text-[#293325] hover:text-[#48872B] transition-colors"
          >
            <ShoppingCart size={19} />
            {totalItems > 0 && (
              <span
                className="absolute -top-1.5 -right-2 text-xs bg-[#4CBB17] text-[#1B2415] font-bold w-4.5 h-4.5 flex items-center justify-center"
                style={smallNotch}
              >
                {totalItems}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3 text-[#293325]">
          {/* Cart */}
          <button
            onClick={openCart}
            className="relative hover:text-[#48872B] transition-colors"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span
                className="absolute -top-1.5 -right-2 text-xs bg-[#4CBB17] text-[#1B2415] font-bold w-4.5 h-4.5 flex items-center justify-center"
                style={smallNotch}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile drawer opener */}
          <Button
            variant="ghost"
            onClick={() => setMobileOpen(true)}
            className="text-[#293325] hover:bg-transparent hover:text-[#48872B]"
          >
            <Menu size={20} />
          </Button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black z-40"
                onClick={() => setMobileOpen(false)}
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.25 }}
                className="fixed top-0 right-0 h-full w-64 bg-[#293325] shadow-lg z-50 flex flex-col p-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`${display.className} text-white text-lg font-semibold uppercase tracking-wide`}
                  >
                    Menu
                  </span>
                  <Button
                    variant="ghost"
                    onClick={() => setMobileOpen(false)}
                    className="text-white hover:bg-transparent"
                  >
                    <X size={20} />
                  </Button>
                </div>
                <div className="flex flex-col gap-1">
                  {/* Home Link */}
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-white text-base font-medium px-2 py-2 hover:text-[#4CBB17] transition-colors border-b border-dashed border-white/10"
                  >
                    <Home size={16} /> Home
                  </Link>

                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/category/${encodeURIComponent(cat)}`}
                      onClick={() => setMobileOpen(false)}
                      className="text-white text-base font-medium px-2 py-2 hover:text-[#4CBB17] transition-colors border-b border-dashed border-white/10"
                    >
                      {cat}
                    </Link>
                  ))}

                  <Link
                    href="/orders"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-white text-base font-medium px-2 py-2 hover:text-[#4CBB17] transition-colors"
                  >
                    <Package size={16} /> My Orders
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        open={isCartOpen}
        onOpenChange={(open) => (open ? openCart() : closeCart())}
      />
    </header>
  )
}