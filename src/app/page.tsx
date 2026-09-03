"use client"

import Hero from "@/components/Hero"
import ProductCard from "@/components/ProductCard"
import { motion } from "framer-motion"
import { Products } from "@/lib/products"
import Image from "next/image"
import { Oswald, Work_Sans } from "next/font/google"
import { ArrowRight, Truck, BadgeCheck, Headset } from "lucide-react"
import Link from "next/link"

const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
})

const body = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
})

const tagNotch = {
  clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
}

const smallNotch = {
  clipPath:
    "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
}

export default function HomePage() {
  const categoryOrder = ["Parachute", "Rexine", "Car Top Cover", "Rain Suites"]
  const productGroups = categoryOrder
    .map((category) => ({
      category,
      products: Products.filter((p) => p.category === category),
    }))
    .filter((group) => group.products.length > 0)

  const categories = [
    {
      name: "Parachute",
      image: "/images/black-display.jpeg",
      href: "/category/parachute",
    },
    {
      name: "Comando Covers",
      image: "/images/comando-black.jpeg",
      href: "/category/Comando%20Covers",
    },
    {
      name: "Ladies Rain Suit",
      image: "/images/Ladies-Rainsuit-Skyblue.jpeg",
      href: "/category/Rain%20Coat",
    },
    {
      name: "Rain Suites",
      image: "/images/rain-suite-black.png",
      href: "/category/Rain%20Suites",
    },
    {
      name: "Rexine",
      image: "/rexine.png",
      href: "/category/Rexine",
    },
    {
      name: "Car Top",
      image: "/images/boolan-cover2.png",
      href: "/category/Car%20Top%20Cover",
    },
  ]

  const benefits = [
    {
      icon: Truck,
      title: "Delivery",
      desc: "Reliable nationwide logistics ensuring your order arrives in pristine condition.",
    },
    {
      icon: BadgeCheck,
      title: "Quality",
      desc: "Using only the finest Rexine and Parachute fabrics tested for extreme weather.",
    },
    {
      icon: Headset,
      title: "Support",
      desc: "A dedicated concierge service available 24/7 for all your tailoring needs.",
    },
  ]

  return (
    <main
      className={`${body.className} bg-[#F3EFE1] text-[#293325] selection:bg-[#4CBB17]/25 antialiased`}
    >
      {/* Hero Section */}
      <Hero />

      {/* 2. Featured Categories — hang-tag strip */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between border-b border-dashed border-[#293325]/30 pb-4">
          <h2
            className={`${display.className} text-2xl md:text-3xl font-semibold uppercase tracking-tight text-[#293325]`}
          >
            Shop by gear type
          </h2>
          <span className="hidden sm:block text-sm text-[#293325]/60">
            {categories.length} categories
          </span>
        </div>

        <div className="category-scroll overflow-x-auto pb-4">
          <div className="flex min-w-max gap-5 md:min-w-0 md:flex-wrap md:justify-center">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative flex w-32 shrink-0 flex-col md:w-40"
              >
                <div
                  className="relative aspect-[4/5] w-full overflow-hidden border-2 border-[#293325] bg-white transition-transform duration-300 group-hover:-translate-y-1"
                  style={tagNotch}
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(min-width: 768px) 240px, 160px"
                    className="object-cover"
                  />
                  {/* punch hole */}
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#F3EFE1] border border-[#293325]" />
                </div>
                <span className="mt-3 text-sm font-semibold text-[#293325] transition-colors group-hover:text-[#48872B]">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Top Products */}
      <section className="bg-white py-16 border-y-2 border-[#293325]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-2">
            <h2
              className={`${display.className} text-3xl md:text-4xl font-semibold uppercase tracking-tight text-[#293325]`}
            >
              The full lineup
            </h2>
            <p className="text-sm text-[#293325]/60">
              {Products.length} products across {productGroups.length} collections
            </p>
          </div>

          <div className="space-y-16">
            {productGroups.map((group) => (
              <div key={group.category}>
                <div className="mb-6 flex flex-col gap-2 border-t border-dashed border-[#293325]/30 pt-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#48872B]">
                      {group.category}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight text-[#293325]">
                      {group.products.length} available
                    </h3>
                  </div>
                  <Link
                    href={`/category/${encodeURIComponent(group.category)}`}
                    className="group inline-flex items-center gap-1 text-sm font-semibold text-[#293325] transition-colors hover:text-[#48872B]"
                  >
                    View all
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10"
                  initial={{ opacity: 0.6 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {group.products.map((product) => (
                    <div key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Promotional Panel */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto relative bg-[#293325] px-8 py-16 md:px-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span
                className="inline-block bg-[#4CBB17] text-[#1B2415] text-xs font-semibold px-3 py-1.5 mb-6"
                style={smallNotch}
              >
                Winter Edition 2024
              </span>
              <h3
                className={`${display.className} text-white text-4xl md:text-5xl font-semibold uppercase leading-[1.05] mb-6`}
              >
                Craftsmanship
                <br />
                meets durability
              </h3>
              <p className="text-white/60 text-base mb-10 max-w-md leading-relaxed">
                Every panel is cut, stitched, and pressure-tested before it
                reaches your bike. This season&apos;s new arrivals are built to
                the same standard.
              </p>
              <Link href="/category/parachute">
                <button
                  className="inline-flex items-center gap-2 bg-[#4CBB17] hover:bg-white text-[#1B2415] px-8 py-4 text-sm font-semibold transition-colors duration-300"
                  style={smallNotch}
                >
                  Explore new arrivals
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>

            <div
              className="relative -rotate-1 border-2 border-white/20 bg-[#39542C] p-4"
              style={tagNotch}
            >
              <img
                src="/newarrival.png"
                alt="New arrivals"
                className="w-full h-72 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Benefits — care label panel */}
      <section className="max-w-5xl mx-auto pb-24 px-6">
        <div className="border-2 border-[#293325]/15 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#293325]/15 grid grid-cols-1 md:grid-cols-3">
          {benefits.map((item) => (
            <div key={item.title} className="flex flex-col items-start p-8">
              <item.icon size={22} className="text-[#48872B] mb-5" />
              <h3
                className={`${display.className} text-sm font-semibold uppercase tracking-wide mb-3 text-[#293325]`}
              >
                {item.title}
              </h3>
              <p className="text-[#293325]/60 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}