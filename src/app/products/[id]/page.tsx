"use client"

import { use, useState, useEffect } from "react"
import { notFound, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Products } from "@/lib/products"
import { isCarTopCoverProduct } from "@/lib/car-top-cover"
import { isRainSuitProduct, RAIN_SUIT_SIZES } from "@/lib/rain-suit"
import { formatPrice } from "@/lib/format-price"
import ProductCategoryRow from "@/components/ProductCategoryRow"
import ProductColorPicker from "@/components/ProductColorPicker"
import { groupRelatedProductsByCategory } from "@/lib/group-products-by-category"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/use-cart"
import { useCartUI } from "@/lib/use-cart-ui"
import {
  buildTikTokProductParams,
  trackTikTokEvent,
} from "@/lib/tiktok"
import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Check,
  Minus,
  ShoppingBag,
} from "lucide-react"

type Props = {
  params: Promise<{ id: string }>
}

const bikeTypes = [
  "70cc",
  "110cc",
  "125cc",
  "150cc",
  "100 Prider",
]

function getCompactBenefits(description: string) {
  const seen = new Set<string>()

  return description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => {
      const key = line.toLowerCase()

      if (seen.has(key)) return false

      seen.add(key)
      return true
    })
}

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params)

  const product = Products.find((p) => p.id === id)

  const router = useRouter()

  const { addToCart } = useCart()
  const { openCart, closeCart } = useCartUI()

  const isCarTopCover = product
    ? isCarTopCoverProduct(product)
    : false

  const isRainSuit = product
    ? isRainSuitProduct(product)
    : false

  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.find((c) => c.default) ||
      product?.colors?.[0]
  )

  const [selectedCoverColor, setSelectedCoverColor] =
    useState(
      product?.colors?.find((c) => c.default)?.name ||
        product?.colors?.[0]?.name ||
        "black"
    )

  const [selectedCC, setSelectedCC] = useState("70cc")

  const [selectedSize, setSelectedSize] =
    useState<string>(RAIN_SUIT_SIZES[1])

  useEffect(() => {
    if (product) {
      trackTikTokEvent(
        "ViewContent",
        buildTikTokProductParams(product)
      )
    }
  }, [product])

  if (!product) return notFound()

  const activeCoverColor =
    product.colors.find(
      (c) => c.name === selectedCoverColor
    ) ||
    product.colors.find((c) => c.default) ||
    product.colors[0]

  const mainImage = isCarTopCover
    ? activeCoverColor?.displayImage ||
      activeCoverColor?.image ||
      product.image
    : selectedColor?.image || product.image

  const selectionLabel = isCarTopCover
    ? activeCoverColor?.name ?? selectedCoverColor
    : selectedColor?.name

  const benefits = getCompactBenefits(product.description)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: mainImage,
      quantity: 1,
      color: selectionLabel,
      ...(isRainSuit && { size: selectedSize }),
    })

    trackTikTokEvent(
      "AddToCart",
      buildTikTokProductParams(product)
    )

    openCart()
  }

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: mainImage,
      quantity: 1,
      color: selectionLabel,
      ...(isRainSuit && { size: selectedSize }),
    })

    trackTikTokEvent(
      "InitiateCheckout",
      buildTikTokProductParams(product)
    )

    closeCart()

    router.push("/checkout")
  }

  const relatedProductGroups =
    groupRelatedProductsByCategory(
      Products,
      product
    )

  return (
    <main className="min-h-screen bg-white text-[#293325]">

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">

        {/* Back Button */}
        <Link
          href="/products"
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-[#39542C]
            transition-colors
            hover:text-[#4CBB17]
          "
        >
          <ArrowLeft className="size-4" />

          Back to products
        </Link>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">

          {/* ================= IMAGE SECTION ================= */}

          <div className="lg:sticky lg:top-20">

            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-[#39542C]/20
                bg-white
                shadow-[0_20px_60px_rgba(41,51,37,0.10)]
              "
            >

              <AnimatePresence mode="wait">

                <motion.div
                  key={mainImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full bg-[#f5f7f3]"
                >

                  <Image
                    src={mainImage}
                    alt={product.name}
                    width={1200}
                    height={900}
                    className="h-auto w-full object-contain"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority
                  />

                </motion.div>

              </AnimatePresence>

              {/* Product Colors */}

              {!isCarTopCover && (
                <div
                  className="
                    border-t
                    border-[#39542C]/10
                    p-4
                    sm:p-5
                  "
                >
                  <ProductColorPicker
                    label="Color"
                    colors={product.colors}
                    selected={selectedColor?.name ?? ""}
                    onSelect={(name) => {
                      const color =
                        product.colors.find(
                          (c) => c.name === name
                        )

                      if (color) {
                        setSelectedColor(color)
                      }
                    }}
                  />
                </div>
              )}

            </div>

          </div>

          {/* ================= PRODUCT DETAILS ================= */}

          <div className="flex flex-col">

            {/* Category */}

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#4CBB17]
              "
            >
              {product.category}
            </p>

            {/* Product Name */}

            <h1
              className="
                mt-2
                text-3xl
                font-extrabold
                tracking-tight
                text-[#293325]
                sm:text-4xl
              "
            >
              {product.name}
            </h1>

            {/* Price + Delivery */}

            <div className="mt-4 flex flex-wrap items-center gap-3">

              <p
                className="
                  text-3xl
                  font-black
                  tabular-nums
                  text-[#4CBB17]
                  sm:text-4xl
                "
              >
                {formatPrice(product.price)}
              </p>

              <span
                className="
                  rounded-full
                  bg-[#48872B]
                  px-3
                  py-1
                  text-xs
                  font-bold
                  text-white
                "
              >
                Free delivery
              </span>

            </div>

            {/* Car Cover Color */}

            {isCarTopCover && (
              <div className="mt-5">

                <ProductColorPicker
                  label="Cover color"
                  colors={product.colors}
                  selected={selectedCoverColor}
                  onSelect={setSelectedCoverColor}
                />

              </div>
            )}

            {/* Rain Suit Size */}

            {isRainSuit && (
              <div className="mt-6">

                <p className="text-sm font-bold text-[#293325]">
                  Size
                </p>

                <div className="mt-2 flex flex-wrap gap-2">

                  {RAIN_SUIT_SIZES.map((size) => (

                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setSelectedSize(size)
                      }
                      className={clsx(
                        `
                        rounded-xl
                        border
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        transition-all
                        `,
                        selectedSize === size
                          ? `
                            border-[#4CBB17]
                            bg-[#4CBB17]
                            text-white
                            shadow-md
                            shadow-[#4CBB17]/20
                          `
                          : `
                            border-[#39542C]/20
                            bg-white
                            text-[#39542C]
                            hover:border-[#4CBB17]
                            hover:text-[#4CBB17]
                          `
                      )}
                    >
                      {size}
                    </button>

                  ))}

                </div>

              </div>
            )}

            {/* Buttons */}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              {/* Buy Now */}

              <Button
                onClick={handleBuyNow}
                className="
                  h-14
                  flex-1
                  rounded-2xl
                  bg-[#4CBB17]
                  text-base
                  font-bold
                  text-white
                  shadow-lg
                  shadow-[#4CBB17]/25
                  hover:bg-[#48872B]
                  sm:order-2
                "
              >
                Buy Now
              </Button>

              {/* Add To Cart */}

              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="
                  h-14
                  flex-1
                  rounded-2xl
                  border-2
                  border-[#39542C]
                  bg-white
                  text-base
                  font-bold
                  text-[#39542C]
                  hover:bg-[#f1f5ee]
                  hover:text-[#293325]
                  sm:order-1
                "
              >

                <ShoppingBag className="mr-2 size-5" />

                Add to Cart

              </Button>

            </div>

            {/* Benefits */}

            <ul className="mt-5 flex flex-wrap gap-2">

              {benefits.map((line, i) => (

                <li
                  key={i}
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-[#39542C]/15
                    bg-[#f7f9f5]
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-[#39542C]
                  "
                >

                  <Check
                    className="
                      size-3.5
                      shrink-0
                      text-[#4CBB17]
                    "
                  />

                  {line}

                </li>

              ))}

            </ul>

            {/* Bike Engine Size */}

            {!isCarTopCover && !isRainSuit && (
              <div className="mt-6">

                <p className="text-sm font-bold text-[#293325]">
                  Bike engine size
                </p>

                <div className="mt-2 flex flex-wrap gap-2">

                  {bikeTypes.map((cc) => (

                    <button
                      key={cc}
                      type="button"
                      onClick={() =>
                        setSelectedCC(cc)
                      }
                      className={clsx(
                        `
                        rounded-xl
                        border
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        transition-all
                        `,
                        selectedCC === cc
                          ? `
                            border-[#4CBB17]
                            bg-[#4CBB17]
                            text-white
                            shadow-md
                            shadow-[#4CBB17]/20
                          `
                          : `
                            border-[#39542C]/20
                            bg-white
                            text-[#39542C]
                            hover:border-[#4CBB17]
                            hover:text-[#4CBB17]
                          `
                      )}
                    >
                      {cc}
                    </button>

                  ))}

                </div>

              </div>
            )}

          </div>

        </div>

        {/* ================= RELATED PRODUCTS ================= */}

        {relatedProductGroups.length > 0 && (

          <section
            className="
              mt-16
              border-t
              border-[#39542C]/15
              pt-14
              sm:mt-20
            "
          >

            <div className="mb-10 flex flex-col items-center text-center">

              {/* Section Label */}

              <div className="flex items-center gap-2">

                <Minus
                  className="w-8 text-[#4CBB17]"
                />

                <span
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-[#48872B]
                  "
                >
                  You may also like
                </span>

                <Minus
                  className="w-8 text-[#4CBB17]"
                />

              </div>

              {/* Heading */}

              <h2
                className="
                  mt-4
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-[#293325]
                  sm:text-4xl
                "
              >
                Explore More
              </h2>

            </div>

            {/* Product Rows */}

            {relatedProductGroups.map((group) => (

              <ProductCategoryRow
                key={group.category}
                category={group.category}
                products={group.products}
                isCurrentCategory={
                  group.isCurrentCategory
                }
              />

            ))}

          </section>

        )}

      </div>

    </main>
  )
}