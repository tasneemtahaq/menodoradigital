import { Gem, Scissors, Leaf } from "lucide-react";

const values = [
  {
    icon: Gem,
    title: "Uncompromising Quality",
    description: "Every fabric is digitally printed with precision, then inspected by hand before it ever reaches you.",
  },
  {
    icon: Scissors,
    title: "Thoughtful Design",
    description: "Our prints are designed in-house, blending timeless elegance with modern silhouettes.",
  },
  {
    icon: Leaf,
    title: "Limited & Intentional",
    description: "We produce only 4 pieces per design — no mass production, just genuine exclusivity.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-luxury-black pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
        <p className="mb-2 text-sm tracking-[0.3em] text-luxury-gold uppercase">
          Our Story
        </p>
        <h1 className="text-4xl font-bold text-luxury-white md:text-5xl">
          About Menodora
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
          Menodora Digital Printed Fabrics was founded with a simple belief: that every
          abaya deserves to be as thoughtfully made as the woman who wears it. Based in
          Karachi, Pakistan, we design and digitally print premium fabrics that bring
          together timeless elegance and modern craftsmanship — in small, limited batches,
          never mass produced.
        </p>
      </div>

      <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-8 px-6 sm:grid-cols-3 md:px-12">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <div key={value.title} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-luxury-gold/30 bg-luxury-gold/5">
                <Icon className="h-7 w-7 text-luxury-gold" />
              </div>
              <h3 className="text-lg font-semibold text-luxury-white">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-gray-400">{value.description}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}