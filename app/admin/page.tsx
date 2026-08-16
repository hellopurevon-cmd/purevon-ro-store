import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // 🔥 Real-time stats fetch
  const { count: productCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { count: orderCount } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  const { count: userCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const { data: orders } = await supabase
    .from("orders")
    .select("total")
    .eq("status", "delivered");

  const totalRevenue = orders?.reduce((sum, o) => sum + o.total, 0) || 0;

  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-72 bg-black border-r border-zinc-800 p-6 min-h-screen">
        <h1 className="text-3xl font-bold text-yellow-400">PUREVON</h1>
        <p className="text-zinc-500 mt-2">Admin Panel</p>
        <nav className="mt-10 space-y-2">
          {["Dashboard", "Products", "Categories", "Orders", "Customers"].map((item) => (
            <Link
              key={item}
              href={`/admin/${item.toLowerCase()}`}
              className={`block w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-900 transition ${
                item === "Dashboard" ? "bg-zinc-900 text-yellow-400" : ""
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-4xl font-bold">Dashboard</h2>
        <p className="text-zinc-400 mt-2">Real-time business overview</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <p className="text-zinc-500 text-sm">Revenue</p>
            <h3 className="text-4xl font-bold text-green-400 mt-3">₹{totalRevenue.toLocaleString()}</h3>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <p className="text-zinc-500 text-sm">Orders</p>
            <h3 className="text-4xl font-bold text-yellow-400 mt-3">{orderCount || 0}</h3>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <p className="text-zinc-500 text-sm">Customers</p>
            <h3 className="text-4xl font-bold text-blue-400 mt-3">{userCount || 0}</h3>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <p className="text-zinc-500 text-sm">Products</p>
            <h3 className="text-4xl font-bold text-purple-400 mt-3">{productCount || 0}</h3>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Recent Orders</h3>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-800">
                <tr className="text-left">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders?.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-10 text-zinc-500">No orders yet</td></tr>
                ) : (
                  recentOrders?.map((order) => (
                    <tr key={order.id} className="border-t border-zinc-800 hover:bg-zinc-800/50">
                      <td className="px-6 py-4 font-mono text-sm">#{order.id.slice(0, 8).toUpperCase()}</td>
                      <td className="px-6 py-4">{order.full_name}</td>
                      <td className="px-6 py-4 font-bold">₹{order.total}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "delivered" ? "bg-green-500/20 text-green-400" :
                          order.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                          order.status === "cancelled" ? "bg-red-500/20 text-red-400" :
                          "bg-blue-500/20 text-blue-400"
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}