import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  // 🔥 Featured products fetch karo
  const { data: featuredProducts } = await supabase
    .from("products")
    .select("id, name, slug, price, image_url, short_description")
    .eq("active", true)
    .eq("featured", true)
    .limit(4);

  // 🔥 Latest products fetch karo
  const { data: latestProducts } = await supabase
    .from("products")
    .select("id, name, slug, price, image_url, short_description")
    .eq("active", true)
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-yellow-500/20 text-yellow-400 px-4 py-1 rounded-full text-sm font-semibold mb-6">
                🔬 India's Trusted RO Partner
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Right Filter.{" "}
                <span className="text-yellow-400">Right Guidance.</span>
                <br />
                Right Price.
              </h1>
              <p className="text-zinc-400 text-lg mt-6 max-w-lg">
                Original compatible RO filters delivered to your doorstep. 
                Get expert guidance before you buy.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/products"
                  className="bg-yellow-400 text-black font-semibold px-8 py-4 rounded-xl hover:bg-yellow-300 transition"
                >
                  Browse Products
                </Link>
                <a
                  href="https://wa.me/917017309002?text=Hi%20RO%20Doctor%2C%20I%20need%20help%20with%20my%20RO%20filter%20selection."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-zinc-700 px-8 py-4 rounded-xl hover:border-yellow-400 transition flex items-center gap-2"
                >
                  <span>💬</span> Chat on WhatsApp
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-yellow-400/10 rounded-3xl blur-2xl"></div>
                <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                  <div className="text-center">
                    <p className="text-6xl mb-4">🔍</p>
                    <p className="text-xl font-semibold">RO Doctor</p>
                    <p className="text-zinc-400 text-sm mt-2">
                      Send RO photo on WhatsApp<br />
                      Get instant filter recommendations
                    </p>
                    <a
                      href="https://wa.me/917017309002?text=Hi%20RO%20Doctor%2C%20I%20need%20help%20with%20my%20RO%20filter%20selection."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl font-semibold transition"
                    >
                      📱 WhatsApp Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-16 border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">⭐ Featured Products</h2>
              <Link href="/products" className="text-yellow-400 hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-yellow-400 transition group"
                >
                  <div className="aspect-square bg-zinc-800">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                    <p className="text-yellow-400 font-bold mt-2">₹{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WhatsApp CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-400/10 to-transparent border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-5xl mb-4">💬</p>
          <h2 className="text-3xl font-bold">Need Help Choosing the Right Filter?</h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            Send a photo of your RO on WhatsApp. Our experts will recommend the 
            perfect filter kit for your purifier — absolutely free!
          </p>
          <a
            href="https://wa.me/917017309002?text=Hi%20RO%20Doctor%2C%20I%20need%20help%20with%20my%20RO%20filter%20selection."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-green-600 hover:bg-green-500 px-10 py-4 rounded-xl font-bold text-lg transition"
          >
            📱 Chat with RO Doctor on WhatsApp
          </a>
          <p className="text-zinc-500 text-sm mt-4">Response within 30 minutes</p>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <p className="text-4xl mb-3">🔬</p>
              <h3 className="font-bold text-lg">Original Compatible Filters</h3>
              <p className="text-zinc-400 text-sm mt-2">
                100% genuine products with manufacturer warranty
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <p className="text-4xl mb-3">👨‍🔧</p>
              <h3 className="font-bold text-lg">Expert Guidance</h3>
              <p className="text-zinc-400 text-sm mt-2">
                Professional RO advisors to help you choose right
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <p className="text-4xl mb-3">🚚</p>
              <h3 className="font-bold text-lg">Free Delivery</h3>
              <p className="text-zinc-400 text-sm mt-2">
                Pan India shipping with easy returns
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}