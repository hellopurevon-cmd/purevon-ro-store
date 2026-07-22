const features = [
  {
    title: "Curated Selection",
    description:
      "Every product is handpicked for quality, craftsmanship, and timeless design.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),
  },
  {
    title: "Free Shipping",
    description:
      "Complimentary worldwide delivery on all orders over $150.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a49.902 49.902 0 00-2.659-.814A1.125 1.125 0 0017.25 8.25h-1.5m-6 0H8.25A2.25 2.25 0 006 10.5v.75m12-3V6.75A2.25 2.25 0 0015.75 4.5h-1.5m-6 0H8.25A2.25 2.25 0 006 6.75v.75"
        />
      </svg>
    ),
  },
  {
    title: "Secure Checkout",
    description:
      "Shop with confidence using encrypted payments and buyer protection.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
  },
  {
    title: "Premium Support",
    description:
      "Dedicated concierge service available 24/7 for a seamless experience.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
        />
      </svg>
    ),
  },
];

const products = [
  {
    name: "Obsidian Leather Tote",
    category: "Accessories",
    price: "$289",
    accent: "from-neutral-900 via-neutral-800 to-neutral-950",
  },
  {
    name: "Aurum Silk Scarf",
    category: "Apparel",
    price: "$165",
    accent: "from-amber-900/80 via-amber-800/60 to-neutral-900",
  },
  {
    name: "Marble Essence Candle",
    category: "Home",
    price: "$78",
    accent: "from-stone-200 via-stone-100 to-neutral-50",
  },
  {
    name: "Onyx Ceramic Vase",
    category: "Decor",
    price: "$124",
    accent: "from-neutral-700 via-neutral-600 to-neutral-800",
  },
];

export default function Home() {
  return (
    <div className="min-h-full bg-white text-neutral-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#" className="group flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A962] bg-black text-sm font-semibold tracking-widest text-[#C9A962] transition-colors group-hover:bg-[#C9A962] group-hover:text-black">
              P
            </span>
            <span className="text-xl font-light tracking-[0.25em] text-black">
              PUREVON
            </span>
          </a>

          <ul className="hidden items-center gap-10 text-sm font-medium tracking-wide text-neutral-600 md:flex">
            <li>
              <a href="#" className="transition-colors hover:text-[#C9A962]">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-[#C9A962]">
                Collections
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-[#C9A962]">
                About
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-[#C9A962]">
                Contact
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Search"
              className="hidden text-neutral-600 transition-colors hover:text-black sm:block"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Cart"
              className="relative text-neutral-600 transition-colors hover:text-black"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A962] text-[10px] font-semibold text-black">
                0
              </span>
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-black text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,169,98,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,169,98,0.08),transparent_60%)]" />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-32">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#C9A962]">
                New Collection 2026
              </p>
              <h1 className="text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Premium Products for{" "}
                <span className="font-normal text-[#C9A962]">Modern Living</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-400">
                Discover a curated world of refined essentials — where
                exceptional craftsmanship meets contemporary elegance.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#featured"
                  className="inline-flex items-center gap-2 bg-[#C9A962] px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-black transition-all hover:bg-[#d4b872] hover:shadow-lg hover:shadow-[#C9A962]/20"
                >
                  Shop Now
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 border border-neutral-700 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-neutral-300 transition-colors hover:border-[#C9A962] hover:text-[#C9A962]"
                >
                  Explore
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="aspect-[4/5] overflow-hidden rounded-sm border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">
                <div className="flex h-full flex-col items-center justify-center p-12">
                  <div className="mb-8 h-px w-24 bg-[#C9A962]" />
                  <p className="text-center text-sm uppercase tracking-[0.4em] text-[#C9A962]">
                    Purevon
                  </p>
                  <p className="mt-4 text-center text-2xl font-light tracking-wide text-neutral-300">
                    Elevated Essentials
                  </p>
                  <div className="mt-8 h-px w-24 bg-[#C9A962]" />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 h-24 w-24 border border-[#C9A962]/30" />
              <div className="absolute -right-4 -top-4 h-24 w-24 border border-[#C9A962]/30" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-b border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#C9A962]">
                Why Purevon
              </p>
              <h2 className="mt-3 text-3xl font-light tracking-tight text-black sm:text-4xl">
                The Purevon Promise
              </h2>
              <p className="mt-4 text-neutral-600">
                Every detail is considered, every experience refined.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="group rounded-sm border border-neutral-200 bg-white p-8 transition-all hover:border-[#C9A962]/40 hover:shadow-lg hover:shadow-neutral-200/50"
                >
                  <div className="mb-5 inline-flex rounded-full border border-[#C9A962]/30 bg-[#C9A962]/10 p-3 text-[#C9A962] transition-colors group-hover:bg-[#C9A962] group-hover:text-black">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium text-black">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="featured" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#C9A962]">
                Featured
              </p>
              <h2 className="mt-3 text-3xl font-light tracking-tight text-black sm:text-4xl">
                Curated for You
              </h2>
            </div>
            <a
              href="#"
              className="text-sm font-medium uppercase tracking-widest text-neutral-600 transition-colors hover:text-[#C9A962]"
            >
              View All →
            </a>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.name}
                className="group cursor-pointer"
              >
                <div
                  className={`relative aspect-[3/4] overflow-hidden rounded-sm bg-gradient-to-br ${product.accent}`}
                >
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button
                      type="button"
                      className="w-full bg-white/95 py-3 text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:bg-[#C9A962]"
                    >
                      Quick Add
                    </button>
                  </div>
                  <div className="absolute left-4 top-4 rounded-sm bg-black/60 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-[#C9A962] backdrop-blur-sm">
                    New
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    {product.category}
                  </p>
                  <h3 className="mt-1 text-base font-medium text-black transition-colors group-hover:text-[#C9A962]">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-neutral-800">
                    {product.price}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mx-6 mb-20 lg:mx-8">
          <div className="mx-auto max-w-7xl bg-black px-8 py-16 text-center sm:px-16">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#C9A962]">
              Join Purevon
            </p>
            <h2 className="mt-4 text-2xl font-light text-white sm:text-3xl">
              Be the first to discover new arrivals
            </h2>
            <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border border-neutral-700 bg-transparent px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-[#C9A962]"
              />
              <button
                type="submit"
                className="bg-[#C9A962] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-black transition-colors hover:bg-[#d4b872]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <a href="#" className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C9A962] bg-black text-xs font-semibold tracking-widest text-[#C9A962]">
                  P
                </span>
                <span className="text-lg font-light tracking-[0.25em]">
                  PUREVON
                </span>
              </a>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                Premium products crafted for those who appreciate the finer
                things in life.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-black">
                Shop
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                <li>
                  <a href="#" className="transition-colors hover:text-[#C9A962]">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-[#C9A962]">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-[#C9A962]">
                    Collections
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-[#C9A962]">
                    Gift Cards
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-black">
                Support
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                <li>
                  <a href="#" className="transition-colors hover:text-[#C9A962]">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-[#C9A962]">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-[#C9A962]">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-[#C9A962]">
                    Size Guide
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-black">
                Follow
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                <li>
                  <a href="#" className="transition-colors hover:text-[#C9A962]">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-[#C9A962]">
                    Pinterest
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-[#C9A962]">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row">
            <p className="text-xs text-neutral-500">
              © {new Date().getFullYear()} Purevon. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-neutral-500">
              <a href="#" className="transition-colors hover:text-[#C9A962]">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-[#C9A962]">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
