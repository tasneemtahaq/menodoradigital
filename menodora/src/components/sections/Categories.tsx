"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shirt,
  Wind,
  Layers,
  Flower2,
  type LucideIcon,
} from "lucide-react";

const categories: {
  id: string;
  name: string;
  icon: LucideIcon;
  accent: string;
}[] = [
  {
    id: "Cotton",
    name: "Cotton",
    icon: Shirt,
    accent: "from-amber-500/20",
  },
  {
    id: "Lawn",
    name: "Lawn",
    icon: Wind,
    accent: "from-emerald-500/20",
  },
  {
    id: "Mixed Fabric",
    name: "Mixed Fabric",
    icon: Layers,
    accent: "from-yellow-600/20",
  },
  {
    id: "Embroidered",
    name: "Embroidered",
    icon: Flower2,
    accent: "from-rose-400/20",
  },
];

export function Categories() {
  return (
    <section
      id="categories"
      className="
        relative
        overflow-hidden
        bg-transparent
        px-6
        pt-32
        pb-28
        sm:px-8
        md:px-12
        lg:pt-36
        lg:pb-32
      "
    >
      {/* =========================================================
          BACKGROUND GLOW
      ========================================================= */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-10
          h-80
          w-[36rem]
          -translate-x-1/2
          rounded-full
          bg-luxury-gold/5
          blur-[130px]
        "
      />

      {/* =========================================================
          LEFT DECORATIVE LEAF
          ========================================================= */}
      <div
        className="
          pointer-events-none
          absolute
          -left-20
          top-20
          hidden
          h-[32rem]
          w-48
          opacity-25
          lg:block
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-0
            h-full
            w-[2px]
            -rotate-[12deg]
            origin-top
            bg-luxury-gold/30
          "
        />

        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="absolute left-1/2 h-12 w-24 -translate-x-1/2"
            style={{
              top: `${index * 52}px`,
              transform: `translateX(-50%) rotate(${
                index % 2 === 0 ? "-18deg" : "18deg"
              })`,
            }}
          >
            <div
              className="
                absolute
                left-0
                top-1/2
                h-7
                w-14
                -translate-y-1/2
                rounded-[100%_0_100%_0]
                border
                border-luxury-gold/30
                bg-luxury-gold/10
              "
            />

            <div
              className="
                absolute
                right-0
                top-1/2
                h-7
                w-14
                -translate-y-1/2
                rounded-[0_100%_0_100%]
                border
                border-luxury-gold/30
                bg-luxury-gold/10
              "
            />
          </div>
        ))}
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}
      <div className="relative mx-auto w-full max-w-7xl">
        {/* =======================================================
            HEADER
        ======================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p
            className="
              mb-3
              text-xs
              font-medium
              uppercase
              tracking-[0.35em]
              text-luxury-gold-dark
              sm:text-sm
            "
          >
            Shop By Fabric
          </p>

          <h2
            className="
              text-4xl
              font-bold
              leading-tight
              text-luxury-text
              sm:text-5xl
            "
          >
            Categories
          </h2>

          <div
            className="
              mx-auto
              mt-5
              h-px
              w-20
              bg-luxury-gold/50
            "
          />
        </motion.div>

        {/* =======================================================
            CATEGORY GRID
        ======================================================= */}
        <div
          className="
            grid
            grid-cols-1
            justify-items-center
            gap-y-20
            sm:grid-cols-2
            sm:gap-x-8
            sm:gap-y-24
            lg:grid-cols-4
            lg:gap-x-12
            lg:gap-y-0
          "
          style={{ perspective: "1200px" }}
        >
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="
                  group
                  flex
                  w-full
                  flex-col
                  items-center
                "
              >
                <Link
                  href={`/shop?category=${encodeURIComponent(
                    category.id
                  )}`}
                  className="
                    flex
                    w-full
                    flex-col
                    items-center
                    outline-none
                  "
                >
                  {/* =================================================
                      CIRCLE PAIR WRAPPER
                  ================================================= */}
                  <div
                    className="
                      relative
                      h-56
                      w-56
                      sm:h-60
                      sm:w-60
                      md:h-64
                      md:w-64
                    "
                  >
                    {/* =================================================
                        BACK SOFT CIRCLE
                    ================================================= */}
                    <motion.div
                      className="
                        absolute
                        left-[18%]
                        top-1/2
                        h-[82%]
                        w-[82%]
                        -translate-y-1/2
                        rounded-full
                        bg-[#eee8d8]/85
                      "
                      whileHover={{
                        scale: 1.04,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    />

                    {/* =================================================
                        MAIN OUTLINED CIRCLE
                    ================================================= */}
                    <motion.div
                      whileHover={{
                        rotateX: -7,
                        rotateY: 7,
                        scale: 1.06,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      className="
                        absolute
                        left-0
                        top-1/2
                        flex
                        h-[82%]
                        w-[82%]
                        -translate-y-1/2
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-full
                        border
                        border-[#c9ad70]/30
                        bg-[#faf8f1]/80
                        backdrop-blur-sm
                        transition-[border-color,box-shadow]
                        duration-300
                        group-hover:border-[#b99a5a]/70
                        group-hover:shadow-[0_12px_35px_rgba(155,125,60,0.10)]
                      "
                    >
                      {/* =================================================
                          DIAGONAL FABRIC TEXTURE
                      ================================================= */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          rounded-full
                          opacity-[0.07]
                        "
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, rgba(180,145,70,0.8) 0px, rgba(180,145,70,0.8) 1px, transparent 1px, transparent 9px)",
                        }}
                      />

                      {/* =================================================
                          HOVER COLOR GRADIENT
                      ================================================= */}
                      <div
                        className={`
                          pointer-events-none
                          absolute
                          inset-0
                          rounded-full
                          bg-linear-to-br
                          ${category.accent}
                          via-transparent
                          to-transparent
                          opacity-0
                          transition-opacity
                          duration-500
                          group-hover:opacity-100
                        `}
                      />

                      {/* =================================================
                          GOLD GLOW
                      ================================================= */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          rounded-full
                          opacity-0
                          transition-opacity
                          duration-500
                          group-hover:opacity-100
                          group-hover:shadow-[inset_0_0_35px_rgba(212,175,55,0.16)]
                        "
                      />

                      {/* =================================================
                          MOVING SHINE
                      ================================================= */}
                      <motion.div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          rounded-full
                          bg-linear-to-tr
                          from-transparent
                          via-luxury-gold/15
                          to-transparent
                        "
                        initial={{
                          x: "-120%",
                        }}
                        whileHover={{
                          x: "120%",
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut",
                        }}
                      />

                      {/* =================================================
                          INNER DASHED RING
                      ================================================= */}
                      <motion.div
                        className="
                          pointer-events-none
                          absolute
                          inset-4
                          rounded-full
                          border
                          border-dashed
                          border-transparent
                          transition-colors
                          duration-300
                          group-hover:border-luxury-gold/25
                        "
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 14,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      {/* =================================================
                          ICON
                      ================================================= */}
                      <motion.div
                        className="
                          relative
                          z-10
                          flex
                          items-center
                          justify-center
                        "
                        whileHover={{
                          scale: 1.12,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <Icon
                          className="
                            h-10
                            w-10
                            text-luxury-gold-dark/70
                            transition-colors
                            duration-300
                            group-hover:text-luxury-gold-dark
                            sm:h-11
                            sm:w-11
                          "
                          strokeWidth={1.5}
                        />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* =====================================================
                      CATEGORY NAME
                  ===================================================== */}
                  <span
                    className="
                      mt-3
                      text-center
                      text-base
                      font-medium
                      tracking-wide
                      text-luxury-text
                      transition-colors
                      duration-300
                      group-hover:text-luxury-gold-dark
                      sm:mt-4
                      sm:text-lg
                    "
                  >
                    {category.name}
                  </span>

                  {/* =====================================================
                      HOVER UNDERLINE
                  ===================================================== */}
                  <motion.span
                    className="
                      mt-2
                      block
                      h-px
                      bg-gold-gradient
                    "
                    initial={{
                      width: 0,
                    }}
                    whileHover={{
                      width: 40,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}