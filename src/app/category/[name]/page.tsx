"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react"

import ProductCard from "@/components/ProductCard"
import { Products } from "@/lib/products"

const categoryDetails: Record<
  string,
  { label: string; description: string }
> = {
  parachute: {
    label: "Lightweight waterproof covers",
    description:
      "Built for everyday weather protection with a lightweight feel, easy handling, and multiple color choices.",
  },

  rexine: {
    label: "Premium textured protection",
    description:
      "Designed for customers who prefer a stronger surface finish with a refined look and reliable coverage.",
  },

  "car top cover": {
    label: "Measured vehicle top coverage",
    description:
      "Practical top-cover protection for compact vehicles with a clean fit and dependable waterproof material.",
  },

  "rain suites": {
    label: "Full-body rain protection",
    description:
      "Waterproof rain suits in multiple colors and sizes — stay dry on the road with Small, Medium, and Large options.",
  },
}

export default function CategoryPage() {
  const params = useParams()

  const rawParam = Array.isArray(params.name)
    ? params.name[0]
    : params.name

  const requestedCategory = decodeURIComponent(rawParam || "")

  const filteredProducts = Products.filter(
    (product) =>
      product.category.toLowerCase() ===
      requestedCategory.toLowerCase()
  )

  const categoryName =
    filteredProducts[0]?.category || requestedCategory

  const details =
    categoryDetails[categoryName.toLowerCase()] || {
      label: "Premium collection",
      description:
        "Explore carefully selected products with practical protection, reliable delivery, and clear color choices.",
    }

  const heroProducts = filteredProducts.slice(0, 3)

  const heroImage =
    heroProducts[0]?.cardImage ||
    heroProducts[0]?.image ||
    "/newarrival.png"

  return (
    <main className="min-h-screen bg-white pb-20 text-[#293325]">

      {/* =========================================================
          HERO SECTION
      ========================================================= */}

      <section className="border-b border-[#39542C]/15 bg-white">

        <div
          className="
            mx-auto
            grid
            max-w-7xl
            gap-10
            px-6
            py-14
            md:py-20
            lg:grid-cols-[0.9fr_1.1fr]
            lg:items-center
          "
        >

          {/* ================= HERO TEXT ================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >

            {/* Small Label */}

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#4CBB17]
              "
            >
              {details.label}
            </p>

            {/* Category Heading */}

            <h1
              className="
                mt-4
                text-5xl
                font-extrabold
                tracking-tight
                text-[#293325]
                md:text-7xl
              "
            >
              {categoryName}
            </h1>

            {/* Description */}

            <p
              className="
                mt-6
                max-w-xl
                text-base
                leading-7
                text-[#39542C]
                md:text-lg
              "
            >
              {details.description}
            </p>

            {/* Category Badges */}

            <div className="mt-8 flex flex-wrap gap-3">

              {[
                `${filteredProducts.length} products`,
                "Free delivery",
                "Open parcel allowed",
              ].map((item) => (

                <span
                  key={item}
                  className="
                    rounded-full
                    border
                    border-[#39542C]/20
                    bg-[#f5f8f3]
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-[#39542C]
                    transition-colors
                    hover:border-[#4CBB17]
                    hover:bg-[#4CBB17]
                    hover:text-white
                  "
                >
                  {item}
                </span>

              ))}

            </div>

          </motion.div>

          {/* ================= HERO IMAGES ================= */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-[1.25fr_0.75fr]
            "
          >

            {/* Main Product */}

            <div
              className="
                relative
                aspect-[4/3]
                overflow-hidden
                rounded-2xl
                border
                border-[#39542C]/15
                bg-[#f5f8f3]
                shadow-[0_18px_45px_rgba(41,51,37,0.08)]
              "
            >

              <Image
                src={heroImage}
                alt={`${categoryName} featured product`}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="
                  object-contain
                  p-6
                  transition-transform
                  duration-500
                  hover:scale-[1.03]
                "
              />

            </div>

            {/* Small Product Images */}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">

              {(
                heroProducts.length > 1
                  ? heroProducts.slice(1, 3)
                  : heroProducts
              ).map((product) => (

                <div
                  key={product.id}
                  className="
                    relative
                    aspect-square
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#39542C]/15
                    bg-[#f7f9f5]
                    shadow-[0_12px_30px_rgba(41,51,37,0.06)]
                  "
                >

                  <Image
                    src={
                      product.cardImage ||
                      product.image
                    }
                    alt={product.name}
                    fill
                    sizes="
                      (min-width: 1024px) 20vw,
                      50vw
                    "
                    className="
                      object-contain
                      p-4
                      transition-transform
                      duration-500
                      hover:scale-105
                    "
                  />

                </div>

              ))}

              {/* Single Product Fallback */}

              {heroProducts.length === 1 && (

                <div
                  className="
                    flex
                    aspect-square
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-dashed
                    border-[#39542C]/30
                    bg-[#f7f9f5]
                    p-5
                    text-center
                    text-sm
                    font-medium
                    text-[#39542C]
                  "
                >
                  More colors available inside
                </div>

              )}

            </div>

          </motion.div>

        </div>

      </section>

      {/* =========================================================
          PRODUCT COLLECTION
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-14">

        {/* Collection Header */}

        <div
          className="
            mb-8
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >

          <div>

            <p
              className="
                text-sm
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#4CBB17]
              "
            >
              Collection
            </p>

            <h2
              className="
                mt-2
                text-3xl
                font-extrabold
                tracking-tight
                text-[#293325]
              "
            >
              Available {categoryName}
            </h2>

          </div>

          {/* View All */}

          <Link
            href="/products"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#39542C]
              transition-colors
              hover:text-[#4CBB17]
            "
          >
            View all products

            <ArrowRight className="size-4" />

          </Link>

        </div>

        {/* Products */}

        <AnimatePresence mode="wait">

          {filteredProducts.length > 0 ? (

            <motion.div
              layout
              className="
                grid
                grid-cols-1
                gap-x-6
                gap-y-10
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >

              {filteredProducts.map((product) => (

                <motion.div
                  key={product.id}
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>

              ))}

            </motion.div>

          ) : (

            /* Empty State */

            <div
              className="
                flex
                min-h-64
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-[#39542C]/30
                bg-[#f7f9f5]
                p-8
                text-center
              "
            >

              <p
                className="
                  text-sm
                  font-medium
                  text-[#39542C]
                "
              >
                No products found in this collection yet.
              </p>

            </div>

          )}

        </AnimatePresence>

      </section>

      {/* =========================================================
          FEATURES
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-6">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {[
            {
              icon: Truck,
              title: "Fast delivery",
              desc:
                "Reliable delivery across Pakistan for every order.",
            },
            {
              icon: ShieldCheck,
              title: "Waterproof cover",
              desc:
                "Protection made for dust, rain, and daily outdoor use.",
            },
            {
              icon: PackageCheck,
              title: "Open parcel",
              desc:
                "Customers can check the parcel before accepting delivery.",
            },
          ].map((item) => (

            <div
              key={item.title}
              className="
                rounded-2xl
                border
                border-[#39542C]/15
                bg-white
                p-6
                shadow-[0_14px_40px_rgba(41,51,37,0.06)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#4CBB17]/40
                hover:shadow-[0_18px_45px_rgba(41,51,37,0.10)]
              "
            >

              {/* Icon */}

              <div
                className="
                  mb-5
                  grid
                  size-11
                  place-items-center
                  rounded-xl
                  bg-[#4CBB17]
                  text-white
                "
              >
                <item.icon className="size-5" />
              </div>

              {/* Title */}

              <h3
                className="
                  text-base
                  font-bold
                  text-[#293325]
                "
              >
                {item.title}
              </h3>

              {/* Description */}

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-[#39542C]
                "
              >
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

    </main>
  )
}