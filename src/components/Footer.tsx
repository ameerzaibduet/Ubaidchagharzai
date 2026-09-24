// components/Footer.tsx

import Link from "next/link"
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa"
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#293325] pt-16 pb-8 text-white/65">

      {/* Brand Accent Line */}
      <div className="absolute left-0 top-0 h-1 w-full bg-[#4CBB17]" />

      <div className="mx-auto max-w-7xl px-6">

        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}

        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12">

          {/* ================= BRAND ================= */}

          <div className="space-y-6 lg:col-span-4">

            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                UBAID{" "}
                <span className="text-[#4CBB17]">
                  CHAGHARZI
                </span>
              </h2>

              <div className="mt-2 h-1 w-12 rounded-full bg-[#4CBB17]" />
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              Quality products designed for everyday protection,
              durability, and comfort. Proudly serving customers
              across Pakistan.
            </p>

            {/* Social Icons */}

            <div className="flex items-center gap-3">

              {[
                {
                  icon: <FaFacebookF />,
                  href: "#",
                  label: "Facebook",
                },
                {
                  icon: <FaInstagram />,
                  href: "#",
                  label: "Instagram",
                },
                {
                  icon: <FaTiktok />,
                  href: "#",
                  label: "TikTok",
                },
                {
                  icon: <FaWhatsapp />,
                  href: "#",
                  label: "WhatsApp",
                },
              ].map((social) => (

                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="
                    flex
                    size-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    text-white/70
                    transition-all
                    duration-300
                    hover:border-[#4CBB17]
                    hover:bg-[#4CBB17]
                    hover:text-white
                  "
                >
                  {social.icon}
                </a>

              ))}

            </div>

          </div>

          {/* ================= EXPLORE ================= */}

          <div className="lg:col-span-2">

            <h3
              className="
                mb-6
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-white
              "
            >
              Explore
            </h3>

            <ul className="space-y-4 text-sm">

              {[
                {
                  label: "Home",
                  href: "/",
                },
                {
                  label: "Shop",
                  href: "/products",
                },
                {
                  label: "About Us",
                  href: "/aboutus",
                },
                {
                  label: "Contact",
                  href: "/contact",
                },
              ].map((item) => (

                <li key={item.label}>

                  <Link
                    href={item.href}
                    className="
                      transition-colors
                      duration-200
                      hover:text-[#4CBB17]
                    "
                  >
                    {item.label}
                  </Link>

                </li>

              ))}

            </ul>

          </div>

          {/* ================= CONTACT ================= */}

          <div className="lg:col-span-3">

            <h3
              className="
                mb-6
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-white
              "
            >
              Get in Touch
            </h3>

            <ul className="space-y-5 text-sm">

              {/* Phone */}

              <li className="flex items-start gap-3">

                <div
                  className="
                    mt-0.5
                    flex
                    size-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#4CBB17]/15
                    text-[#4CBB17]
                  "
                >
                  <HiOutlinePhone className="text-lg" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Phone
                  </p>

                  <span className="mt-1 block text-white/75">
                    
                  </span>
                </div>

              </li>

              {/* Email */}

              <li className="flex items-start gap-3">

                <div
                  className="
                    mt-0.5
                    flex
                    size-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#4CBB17]/15
                    text-[#4CBB17]
                  "
                >
                  <HiOutlineMail className="text-lg" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Email
                  </p>

                  <span className="mt-1 block text-white/75">
                    ubaidkhan@gmail.com
                  </span>
                </div>

              </li>

              {/* Location */}

              <li className="flex items-start gap-3">

                <div
                  className="
                    mt-0.5
                    flex
                    size-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#4CBB17]/15
                    text-[#4CBB17]
                  "
                >
                  <HiOutlineLocationMarker className="text-lg" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    Location
                  </p>

                  <span className="mt-1 block text-white/75">
                    Karachi, Pakistan
                  </span>
                </div>

              </li>

            </ul>

          </div>

          {/* ================= NEWSLETTER ================= */}

          <div className="lg:col-span-3">

            <h3
              className="
                mb-6
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-white
              "
            >
              Newsletter
            </h3>

            <p className="mb-4 text-xs leading-5 text-white/55">
              Subscribe for exclusive offers, new arrivals,
              and special launches.
            </p>

            <form className="flex">

              <input
                type="email"
                placeholder="Your email"
                className="
                  min-w-0
                  w-full
                  rounded-l-xl
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-3
                  text-sm
                  text-white
                  placeholder:text-white/35
                  outline-none
                  transition-colors
                  focus:border-[#4CBB17]
                "
              />

              <button
                type="submit"
                className="
                  rounded-r-xl
                  bg-[#4CBB17]
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  transition-colors
                  hover:bg-[#48872B]
                "
              >
                Join
              </button>

            </form>

            {/* Small Brand Message */}

            <div
              className="
                mt-5
                rounded-xl
                border
                border-white/10
                bg-white/5
                p-4
              "
            >
              <p className="text-xs leading-5 text-white/50">
                Premium quality products with reliable
                delivery across Pakistan.
              </p>
            </div>

          </div>

        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            items-center
            justify-between
            gap-4
            border-t
            border-white/10
            pt-8
            md:flex-row
          "
        >

          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Ubaid Chagharzi.
            All rights reserved.
          </p>

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-6
              gap-y-2
              text-[10px]
              font-medium
              uppercase
              tracking-widest
            "
          >

            <a
              href="#"
              className="
                text-white/45
                transition
                hover:text-[#4CBB17]
              "
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="
                text-white/45
                transition
                hover:text-[#4CBB17]
              "
            >
              Terms of Service
            </a>

            <span className="text-[#48872B]">
              Made with ❤️ in Pakistan
            </span>

          </div>

        </div>

      </div>
    </footer>
  )
}