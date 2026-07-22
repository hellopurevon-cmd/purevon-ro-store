import Image from "next/image";

const categories = [
  {
    name: "Accessories",
    count: "48 items",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop",
  },
  {
    name: "Apparel",
    count: "62 items",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop",
  },
  {
    name: "Home & Living",
    count: "35 items",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=800&fit=crop",
  },
  {
    name: "Beauty",
    count: "29 items",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=800&fit=crop",
  },
  {
    name: "Jewelry",
    count: "41 items",
    image:
      "https://images.unsplash.com/photo-1515565500446-0976730db2a7?w=600&h=800&fit=crop",
  },
  {
    name: "Fragrances",
    count: "18 items",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=800&fit=crop",
  },
];

const features = [
  {
    title: "Curated Excellence",
    description:
      "Every item is hand-selected by our team for unmatched quality and design.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: "Worldwide Shipping",
    description:
      "Complimentary express delivery on orders over $150, anywhere in the world.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a49.902 49.902 0 00-2.659-.814A1.125 1.125 0 0017.25 8.25h-1.5m-6 0H8.25A2.25 2.25 0 006 10.5v.75m12-3V6.75A2.25 2.25 0 0015.75 4.5h-1.5m-6 0H8.25A2.25 2.25 0 006 6.75v.75" />
      </svg>
    ),
  },
  {
    title: "Secure Payments",
    description:
      "Bank-grade encryption and buyer protection on every transaction.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "24/7 Concierge",
    description:
      "Personal styling and support available around the clock for members.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
];

const products = [
  {
    name: "Obsidian Leather Tote",
    price: 289,
    rating: 4.9,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop",
    badge: "Bestseller",
  },
  {
    name: "Aurum Silk Scarf",
    price: 165,
    rating: 4.8,
    reviews: 94,
    image:
      "https://images.unsplash.com/photo-1601924994987-69fb26d0c737?w=600&h=750&fit=crop",
    badge: "New",
  },
  {
    name: "Marble Essence Candle",
    price: 78,
    rating: 4.7,
    reviews: 256,
    image:
      "https://images.unsplash.com/photo-1602608880126-a9a7387b4300?w=600&h=750&fit=crop",
  },
  {
    name: "Onyx Ceramic Vase",
    price: 124,
    rating: 4.6,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&h=750&fit=crop",
  },
  {
    name: "Sterling Chronograph",
    price: 425,
    rating: 5.0,
    reviews: 43,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=750&fit=crop",
    badge: "Limited",
  },
  {
    name: "Velvet Noir Perfume",
    price: 198,
    rating: 4.9,
    reviews: 112,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=750&fit=crop",
  },
  {
    name: "Pearl Drop Earrings",
    price: 310,
    rating: 4.8,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=750&fit=crop",
    badge: "New",
  },
  {
    name: "Cashmere Wrap Coat",
    price: 520,
    rating: 4.9,
    reviews: 76,
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=750&fit=crop",
  },
];

const reviews = [
  {
    name: "Sophia Laurent",
    location: "Paris, France",
    rating: 5,
    text: "The quality is extraordinary. My Obsidian Tote receives compliments everywhere I go. Purevon truly understands luxury.",
    avatar: "SL",
  },
  {
    name: "James Whitfield",
    location: "New York, USA",
    rating: 5,
    text: "Impeccable packaging, fast shipping, and products that exceed expectations. This is my go-to for premium gifts.",
    avatar: "JW",
  },
  {
    name: "Amara Okonkwo",
    location: "London, UK",
    rating: 5,
    text: "The concierge team helped me curate an entire home collection. Every piece feels thoughtfully chosen and beautifully made.",
    avatar: "AO",
  },
  {
    name: "Elena Vasquez",
    location: "Madrid, Spain",
    rating: 4,
    text: "Elegant designs and sustainable materials. The Aurum Silk Scarf is the softest I've ever owned. Will definitely order again.",
    avatar: "EV",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "text-[#C9A962]" : i < rating ? "text-[#C9A962]/50" : "text-neutral-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1.5 text-xs text-neutral-500">{rating.toFixed(1)}</span>
    </div>
  );
}

function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-8 w-8 text-xs" : "h-9 w-9 text-sm";
  const text = size === "sm" ? "text-lg" : "text-xl";
  return (
    <>
      <span
        className={`flex ${dim} items-center justify-center rounded-full border border-[#C9A962] bg-black font-semibold tracking-widest text-[#C9A962] transition-colors group-hover:bg-[#C9A962] group-hover:text-black`}
      >
        P
      </span>
      <span className={`${text} font-light tracking-[0.25em] text-black`}>
        PUREVON
      </span>
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-full bg-white text-neutral-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#" className="group flex items-center gap-2">
            <Logo />
          </a>

          <ul className="hidden items-center gap-8 text-sm font-medium tracking-wide text-neutral-600 lg:flex xl:gap-10">
            {["Shop", "Categories", "About", "Reviews", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="relative transition-colors hover:text-[#C9A962] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#C9A962] after:transition-all hover:after:w-full"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              aria-label="Search"
              className="hidden text-neutral-600 transition-colors hover:text-black sm:block"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Cart"
              className="relative text-neutral-600 transition-colors hover:text-black"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A962] text-[10px] font-semibold text-black">
                0
              </span>
            </button>

            {/* Mobile menu */}
            <details className="relative lg:hidden">
              <summary className="cursor-pointer list-none text-neutral-600 transition-colors hover:text-black [&::-webkit-details-marker]:hidden">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </summary>
              <div className="absolute right-0 top-full mt-2 w-48 rounded-sm border border-neutral-200 bg-white py-2 shadow-xl">
                {["Shop", "Categories", "About", "Reviews", "Contact"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block px-4 py-2.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-[#C9A962]"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </details>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-black text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,169,98,0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,169,98,0.08),transparent_60%)]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-12 md:py-24 lg:px-8 lg:py-32">
            <div className="order-2 md:order-1">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[#C9A962] sm:text-sm">
                New Collection 2026
              </p>
              <h1 className="text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
                Premium Products for{" "}
                <span className="font-normal text-[#C9A962]">Modern Living</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-400 sm:text-lg">
                Discover a curated world of refined essentials — where exceptional
                craftsmanship meets contemporary elegance.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
                <a
                  href="#featured"
                  className="inline-flex items-center gap-2 bg-[#C9A962] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d4b872] hover:shadow-lg hover:shadow-[#C9A962]/25 sm:px-8 sm:py-3.5 sm:text-sm"
                >
                  Shop Now
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a
                  href="#categories"
                  className="inline-flex items-center gap-2 border border-neutral-700 px-6 py-3 text-xs font-medium uppercase tracking-widest text-neutral-300 transition-all duration-300 hover:border-[#C9A962] hover:text-[#C9A962] sm:px-8 sm:py-3.5 sm:text-sm"
                >
                  Browse Categories
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 border-t border-neutral-800 pt-8 sm:gap-10">
                {[
                  { value: "10K+", label: "Happy Clients" },
                  { value: "500+", label: "Premium Products" },
                  { value: "4.9", label: "Average Rating" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xl font-light text-[#C9A962] sm:text-2xl">{stat.value}</p>
                    <p className="mt-0.5 text-xs uppercase tracking-widest text-neutral-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative order-1 md:order-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-neutral-800 shadow-2xl shadow-black/50">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop"
                  alt="Luxury boutique interior showcasing premium products"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-sm border border-[#C9A962]/30 bg-black/40 p-4 backdrop-blur-sm sm:bottom-8 sm:left-8 sm:right-8 sm:p-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A962] sm:text-xs">
                    Signature Collection
                  </p>
                  <p className="mt-1 text-sm font-light text-white sm:text-base">
                    Handcrafted for the discerning few
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-3 -left-3 hidden h-20 w-20 border border-[#C9A962]/40 sm:block lg:-bottom-4 lg:-left-4 lg:h-24 lg:w-24" />
              <div className="absolute -right-3 -top-3 hidden h-20 w-20 border border-[#C9A962]/40 sm:block lg:-right-4 lg:-top-4 lg:h-24 lg:w-24" />
            </div>
          </div>
        </section>

        {/* Shop by Category */}
        <section id="categories" className="bg-neutral-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#C9A962] sm:text-sm">
                Collections
              </p>
              <h2 className="mt-3 text-2xl font-light tracking-tight text-black sm:text-3xl lg:text-4xl">
                Shop by Category
              </h2>
              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                Explore our carefully curated categories, each designed for modern luxury.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-3 lg:gap-6">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href="#featured"
                  className="group relative aspect-[3/4] overflow-hidden rounded-sm sm:aspect-[4/5]"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                    <h3 className="text-sm font-medium text-white transition-colors group-hover:text-[#C9A962] sm:text-base lg:text-lg">
                      {category.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-neutral-400 sm:text-sm">{category.count}</p>
                    <span className="mt-2 inline-block text-[10px] font-medium uppercase tracking-widest text-[#C9A962] opacity-0 transition-all duration-300 group-hover:opacity-100 sm:mt-3 sm:text-xs">
                      Shop Now →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="featured" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#C9A962] sm:text-sm">
                  Featured
                </p>
                <h2 className="mt-3 text-2xl font-light tracking-tight text-black sm:text-3xl lg:text-4xl">
                  Featured Products
                </h2>
                <p className="mt-2 text-sm text-neutral-600">
                  Handpicked essentials for the modern connoisseur.
                </p>
              </div>
              <a
                href="#"
                className="text-xs font-medium uppercase tracking-widest text-neutral-600 transition-colors hover:text-[#C9A962] sm:text-sm"
              >
                View All →
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-4">
              {products.map((product) => (
                <article
                  key={product.name}
                  className="group flex flex-col overflow-hidden rounded-sm border border-neutral-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A962]/30 hover:shadow-xl hover:shadow-neutral-200/60"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {product.badge && (
                      <span className="absolute left-3 top-3 rounded-sm bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#C9A962] backdrop-blur-sm">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    <h3 className="text-xs font-medium leading-snug text-black transition-colors group-hover:text-[#C9A962] sm:text-sm">
                      {product.name}
                    </h3>
                    <div className="mt-2">
                      <StarRating rating={product.rating} />
                      <p className="mt-0.5 text-[10px] text-neutral-400 sm:text-xs">
                        ({product.reviews} reviews)
                      </p>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-black sm:text-base">
                      ${product.price}
                    </p>
                    <button
                      type="button"
                      className="mt-3 w-full border border-black bg-black py-2.5 text-[10px] font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:border-[#C9A962] hover:bg-[#C9A962] hover:text-black sm:mt-auto sm:py-3 sm:text-xs"
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Purevon */}
        <section id="about" className="border-y border-neutral-100 bg-neutral-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#C9A962] sm:text-sm">
                Our Promise
              </p>
              <h2 className="mt-3 text-2xl font-light tracking-tight text-black sm:text-3xl lg:text-4xl">
                Why Choose Purevon
              </h2>
              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                Every detail is considered, every experience refined.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="group rounded-sm border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A962]/40 hover:shadow-lg hover:shadow-neutral-200/50 sm:p-8"
                >
                  <div className="mb-4 inline-flex rounded-full border border-[#C9A962]/30 bg-[#C9A962]/10 p-3 text-[#C9A962] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C9A962] group-hover:text-black sm:mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-medium text-black sm:text-lg">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section id="reviews" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#C9A962] sm:text-sm">
                Testimonials
              </p>
              <h2 className="mt-3 text-2xl font-light tracking-tight text-black sm:text-3xl lg:text-4xl">
                Loved by Our Customers
              </h2>
              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                Join thousands of satisfied clients who trust Purevon.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {reviews.map((review) => (
                <article
                  key={review.name}
                  className="flex flex-col rounded-sm border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A962]/30 hover:shadow-lg sm:p-7"
                >
                  <StarRating rating={review.rating} />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-600">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-neutral-100 pt-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-xs font-semibold text-[#C9A962]">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">{review.name}</p>
                      <p className="text-xs text-neutral-500">{review.location}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden bg-black px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,98,0.12),transparent_70%)]" />
            <div className="relative mx-auto max-w-2xl text-center">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#C9A962] sm:text-sm">
                Stay Connected
              </p>
              <h2 className="mt-4 text-2xl font-light text-white sm:text-3xl">
                Join the Purevon Circle
              </h2>
              <p className="mt-3 text-sm text-neutral-400 sm:text-base">
                Subscribe for exclusive access to new arrivals, private sales, and styling tips.
              </p>
              <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 border border-neutral-700 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-[#C9A962] focus:bg-white/10"
                />
                <button
                  type="submit"
                  className="bg-[#C9A962] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d4b872] sm:text-sm"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-4 text-xs text-neutral-600">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="#" className="group flex items-center gap-2">
                <Logo size="sm" />
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-600">
                Premium products crafted for those who appreciate the finer things in life.
              </p>
              <div className="mt-5 flex gap-3">
                {[
                  { label: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                  { label: "Pinterest", icon: "M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" },
                  { label: "Twitter", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-all duration-300 hover:border-[#C9A962] hover:bg-[#C9A962] hover:text-black"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-black sm:text-sm">
                About
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-neutral-600">
                {["Our Story", "Craftsmanship", "Sustainability", "Careers"].map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors hover:text-[#C9A962]">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-black sm:text-sm">
                Shop
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-neutral-600">
                {["New Arrivals", "Best Sellers", "Collections", "Gift Cards"].map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors hover:text-[#C9A962]">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-black sm:text-sm">
                Support
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-neutral-600">
                {["FAQ", "Shipping & Returns", "Size Guide", "Track Order"].map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors hover:text-[#C9A962]">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-black sm:text-sm">
                Contact
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-neutral-600">
                <li>
                  <a href="mailto:hello@purevon.com" className="transition-colors hover:text-[#C9A962]">
                    hello@purevon.com
                  </a>
                </li>
                <li>+1 (800) 555-0199</li>
                <li>Mon–Fri, 9am–6pm EST</li>
                <li>
                  <a href="#" className="transition-colors hover:text-[#C9A962]">
                    Live Chat
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row">
            <p className="text-xs text-neutral-500">
              © {new Date().getFullYear()} Purevon. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-neutral-500 sm:gap-6">
              <a href="#" className="transition-colors hover:text-[#C9A962]">Privacy Policy</a>
              <a href="#" className="transition-colors hover:text-[#C9A962]">Terms of Service</a>
              <a href="#" className="transition-colors hover:text-[#C9A962]">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
