import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, Tag, Shapes, ShoppingCart, X } from "lucide-react";

const links = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/products", label: "Products", icon: Package },
    { to: "/categories", label: "Categories", icon: Shapes },
    { to: "/brands", label: "Brands", icon: Tag },
    { to: "/orders", label: "Orders", icon: ShoppingCart }
];

export default function MobileSidebar({ open, onClose }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 sm:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="absolute left-0 top-0 h-full w-64 bg-white">
                <div className="flex items-center justify-between px-6 py-5">
                    <p className="text-xl lowercase" style={{ fontFamily: "Georgia, serif" }}>liaan</p>
                    <button onClick={onClose} aria-label="Close menu">
                        <X size={20} strokeWidth={1.5} />
                    </button>
                </div>
                <nav className="flex flex-col gap-1 px-3">
                    {links.map(({ to, label, icon: Icon, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 text-[13px] ${
                                    isActive ? "bg-neutral-900 text-white" : "text-neutral-600"
                                }`
                            }
                        >
                            <Icon size={16} strokeWidth={1.5} />
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
}
