import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, Tag, Shapes, ShoppingCart, Layers } from "lucide-react";

const links = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/products", label: "Products", icon: Package },
    { to: "/categories", label: "Categories", icon: Shapes },
    { to: "/brands", label: "Brands", icon: Tag },
    { to: "/collections", label: "Collections", icon: Layers },
    { to: "/orders", label: "Orders", icon: ShoppingCart }
];

export default function Sidebar() {
    return (
        <aside className="hidden w-56 shrink-0 border-r border-neutral-200 bg-white sm:block">
            <div className="px-6 py-5">
                <p className="font-serif text-xl lowercase" style={{ fontFamily: "Georgia, serif" }}>
                    liaan
                </p>
                <p className="text-[10px] tracking-[1.5px] text-neutral-400">ADMIN</p>
            </div>

            <nav className="flex flex-col gap-1 px-3">
                {links.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 text-[13px] ${
                                isActive
                                    ? "bg-neutral-900 text-white"
                                    : "text-neutral-600 hover:bg-neutral-100"
                            }`
                        }
                    >
                        <Icon size={16} strokeWidth={1.5} />
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
