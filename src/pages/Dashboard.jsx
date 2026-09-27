import { useEffect, useState } from "react";
import { Package, ShoppingCart, DollarSign, Users } from "lucide-react";
import toast from "react-hot-toast";
import * as orderService from "../services/order.service";
import * as productService from "../services/product.service";
import StatCard from "../components/dashboard/StatCard";
import SalesChart from "../components/dashboard/SalesChart";
import RecentOrders from "../components/dashboard/RecentOrders";
import TopProducts from "../components/dashboard/TopProducts";
import LowStockProducts from "../components/dashboard/LowStockProducts";
import Spinner from "../components/ui/Spinner";
import { formatCurrency } from "../utils/formatCurrency";

export default function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            orderService.getAllOrders(),
            productService.getProducts({ limit: 100 })
        ])
            .then(([ordersRes, productsRes]) => {
                setOrders(ordersRes.data);
                setProducts(productsRes.data);
            })
            .catch((err) => toast.error(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Spinner />;

    const paidOrders = orders.filter((o) => o.paymentStatus === "paid");
    const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);
    const uniqueCustomers = new Set(orders.map((o) => o.user?._id || o.user)).size;

    // Last 7 days revenue, bucketed by day, for the chart
    const chartData = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        const dayLabel = date.toLocaleDateString("en-KE", { weekday: "short" });

        const total = paidOrders
            .filter((o) => new Date(o.paidAt || o.createdAt).toDateString() === date.toDateString())
            .reduce((sum, o) => sum + o.total, 0);

        return { label: dayLabel, total };
    });

    const sortedOrders = [...orders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <StatCard label="TOTAL REVENUE" value={formatCurrency(totalRevenue)} icon={DollarSign} />
                <StatCard label="ORDERS" value={orders.length} icon={ShoppingCart} />
                <StatCard label="PRODUCTS" value={products.length} icon={Package} />
                <StatCard label="CUSTOMERS" value={uniqueCustomers} icon={Users} />
            </div>

            <div className="border border-neutral-200 bg-white p-5">
                <p className="mb-4 text-[11px] tracking-[1.5px] text-neutral-400">REVENUE — LAST 7 DAYS</p>
                <SalesChart data={chartData} />
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
                <div className="border border-neutral-200 bg-white p-5">
                    <p className="mb-2 text-[11px] tracking-[1.5px] text-neutral-400">RECENT ORDERS</p>
                    <RecentOrders orders={sortedOrders} />
                </div>
                <div className="border border-neutral-200 bg-white p-5">
                    <p className="mb-2 text-[11px] tracking-[1.5px] text-neutral-400">TOP PRODUCTS</p>
                    <TopProducts products={products} />
                </div>
                <div className="border border-neutral-200 bg-white p-5">
                    <p className="mb-2 text-[11px] tracking-[1.5px] text-neutral-400">LOW STOCK</p>
                    <LowStockProducts products={products} />
                </div>
            </div>
        </div>
    );
}
