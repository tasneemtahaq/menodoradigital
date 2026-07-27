"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export function Newsletter() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  function onSubmit(data: NewsletterFormValues) {
    console.log("Newsletter signup:", data.email);
    reset();
  }

  return (
    <section className="bg-luxury-white px-6 py-24 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-luxury-black">
          <Mail className="h-6 w-6 text-luxury-gold" />
        </div>

        <h2 className="text-3xl font-bold text-luxury-text md:text-4xl">
          Join The Menodora Circle
        </h2>
        <p className="mt-3 text-sm text-gray-500 md:text-base">
          Be the first to know about new collections, limited drops, and exclusive offers.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          noValidate
        >
          <div className="flex-1">
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm text-luxury-text focus:border-luxury-gold focus:outline-none"
            />
            {errors.email && (
              <p className="mt-2 text-left text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="rounded-full bg-luxury-black px-8 py-3 text-sm font-semibold text-luxury-gold transition-colors hover:bg-neutral-800"
          >
            Subscribe
          </button>
        </form>

        {isSubmitSuccessful && (
          <p className="mt-4 text-sm text-green-600">
            Thank you for subscribing!
          </p>
        )}
      </motion.div>
    </section>
  );
}