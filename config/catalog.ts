export type Arrangement = {
  slug: string;
  name: string;
  category: string;
  description: string;
  flowers: string;
  image: string;
  alt: string;
  sizes: { label: string; price: number }[];
};
export const arrangements: Arrangement[] = [
  {
    slug: "the-soft-spoken",
    name: "The Soft Spoken",
    category: "Romance",
    description:
      "A tender gathering of blush roses and soft greenery, wrapped for a thoughtful gesture.",
    flowers: "Blush roses, seasonal accents and greenery",
    image: "/images/arrangement-1.webp",
    alt: "Blush rose bouquet with green foliage",
    sizes: [
      { label: "Classic", price: 65 },
      { label: "Generous", price: 95 },
    ],
  },
  {
    slug: "quiet-morning",
    name: "Quiet Morning",
    category: "Everyday",
    description:
      "Creamy white flowers arranged with room to breathe. A little calm for your favourite corner.",
    flowers: "White seasonal flowers and delicate foliage",
    image: "/images/arrangement-2.webp",
    alt: "Ivory and white flowers in a vase",
    sizes: [
      { label: "Classic", price: 75 },
      { label: "Generous", price: 110 },
    ],
  },
  {
    slug: "velvet-hour",
    name: "Velvet Hour",
    category: "Romance",
    description:
      "Rich burgundy blooms and expressive stems for a beautifully unexpected moment.",
    flowers: "Burgundy dahlias and seasonal foliage",
    image: "/images/arrangement-3.webp",
    alt: "Deep burgundy dahlia bouquet",
    sizes: [
      { label: "Classic", price: 85 },
      { label: "Generous", price: 125 },
    ],
  },
  {
    slug: "peach-poetry",
    name: "Peach Poetry",
    category: "Celebrations",
    description:
      "Warm peach petals and an airy silhouette, made for the people who brighten your day.",
    flowers: "Peach roses and seasonal accents",
    image: "/images/arrangement-4.webp",
    alt: "Warm peach rose arrangement",
    sizes: [
      { label: "Classic", price: 70 },
      { label: "Generous", price: 100 },
    ],
  },
  {
    slug: "a-little-wild",
    name: "A Little Wild",
    category: "Everyday",
    description:
      "Lavender tones with a loose, garden-inspired feeling. Lovely just because.",
    flowers: "Lavender and lilac seasonal flowers",
    image: "/images/arrangement-5.webp",
    alt: "Loose lavender and lilac flower bouquet",
    sizes: [
      { label: "Classic", price: 65 },
      { label: "Generous", price: 95 },
    ],
  },
  {
    slug: "hello-sunshine",
    name: "Hello, Sunshine",
    category: "Celebrations",
    description:
      "Cheerful golden flowers for birthdays, new beginnings and all the good things in between.",
    flowers: "Yellow seasonal flowers with greenery",
    image: "/images/arrangement-6.webp",
    alt: "Sunny yellow mixed flower bouquet",
    sizes: [
      { label: "Classic", price: 60 },
      { label: "Generous", price: 90 },
    ],
  },
];
export function price(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
