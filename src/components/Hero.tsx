"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Oswald, Work_Sans } from "next/font/google"
import { ArrowRight, Play, Droplet, ShieldCheck, Users } from "lucide-react"

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

const notch = {
  clipPath:
    "polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%)",
}

const smallNotch = {
  clipPath:
    "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
}

const stitchTexture = {
  backgroundImage:
    "repeating-linear-gradient(135deg, rgba(41,51,37,0.05) 0px, rgba(41,51,37,0.05) 1px, transparent 1px, transparent 14px)",
}

export default function Hero() {
  return (
    <section
      className={`${body.className} relative w-full bg-[#F3EFE1] overflow-hidden`}
    >
      {/* Canvas texture */}
      <div className="absolute inset-0 z-0" style={stitchTexture} />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 pt-16 pb-14">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 w-full"
          >
            {/* Tag label */}
            <div
              className="inline-flex items-center gap-2 bg-[#293325] text-[#F3EFE1] px-4 py-2 mb-8"
              style={smallNotch}
            >
              <Droplet size={13} className="text-[#4CBB17]" />
              <span className="text-xs font-medium tracking-wide">
                New stock in for monsoon season
              </span>
            </div>

            <h1
              className={`${display.className} text-5xl sm:text-6xl lg:text-7xl font-bold text-[#293325] uppercase leading-[0.95] tracking-tight mb-3`}
            >
              Geared for
              <br />
              every monsoon
            </h1>
            <div className="w-20 h-1.5 bg-[#4CBB17] mb-6" />

            <p className="text-[#293325]/70 text-base md:text-lg max-w-md mb-9 leading-relaxed">
              Rexine and parachute-grade covers, cut and stitched for
              Karachi&apos;s roads and its rain. Made to outlast the season,
              not just survive it.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                className="group inline-flex items-center gap-2 bg-[#4CBB17] hover:bg-[#48872B] text-[#1B2415] hover:text-white px-7 py-4 text-sm font-semibold transition-colors duration-300"
                style={smallNotch}
              >
                Shop the collection
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button className="group inline-flex items-center gap-3 text-[#293325] px-1 py-4 text-sm font-semibold">
                <span className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-[#293325] group-hover:bg-[#293325] group-hover:text-[#F3EFE1] transition-colors duration-300">
                  <Play size={12} className="fill-current ml-0.5" />
                </span>
                See it in the rain
              </button>
            </div>

            {/* Spec strip */}
            <div className="flex items-stretch border-t border-dashed border-[#293325]/30 pt-6 max-w-lg">
              {[
                { icon: Droplet, value: "10,000mm", label: "Waterproof rating" },
                { icon: ShieldCheck, value: "Reinforced", label: "Stitched seams" },
                { icon: Users, value: "100k+", label: "Riders equipped" },
              ].map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex-1 ${
                    i > 0 ? "border-l border-dashed border-[#293325]/30 pl-5 ml-5" : ""
                  }`}
                >
                  <spec.icon size={16} className="text-[#48872B] mb-2" />
                  <div
                    className={`${display.className} text-lg font-semibold text-[#293325] leading-none`}
                  >
                    {spec.value}
                  </div>
                  <div className="text-xs text-[#293325]/60 mt-1">
                    {spec.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Mounted product panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 relative flex justify-center items-center w-full"
          >
            <div
              className="relative  md:p-0 -rotate-2  border-[#293325]/80"
              style={{
                ...notch,
                boxShadow: "14px 16px 0px 0px rgba(41,51,37,0.9)",
              }}
            >
              <Image
                src="/images/black-display.jpeg"
                alt="Bin Watan Bike Seat Cover"
                width={620}
                height={480}
                priority
                className="w-full max-w-[420px] h-auto object-contain"
              />
            </div>

            {/* Ink stamp */}
            <motion.div
              initial={{ opacity: 0, rotate: -18, scale: 0.8 }}
              animate={{ opacity: 1, rotate: -10, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-4 -left-4 md:left-2 md:-bottom-6 z-20 w-28 h-28 rounded-full bg-[#F3EFE1] border-2 border-dashed border-[#293325] flex flex-col items-center justify-center text-center px-3"
            >
              <span className="text-[10px] font-bold uppercase tracking-wide text-[#293325] leading-tight">
                Field
                <br />
                Tested
              </span>
              <span className="w-6 h-[2px] bg-[#4CBB17] my-1" />
              <span className="text-[9px] font-medium text-[#48872B] uppercase tracking-wide">
                All-weather
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}