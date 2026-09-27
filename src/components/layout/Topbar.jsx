import { Menu, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import Breadcrumbs from "./Breadcrumbs";

export default function Topbar({ onMenuClick }) {
    const { admin, logout } = useAuth();

    return (
        <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
                <button className="sm:hidden" onClick={onMenuClick} aria-label="Open menu">
                    <Menu size={20} strokeWidth={1.5} />
                </button>
                <Breadcrumbs />
            </div>

            <div className="flex items-center gap-4">
                <span className="hidden text-[13px] text-neutral-500 sm:inline">
                    {admin?.fullName}
                </span>
                <button
                    onClick={logout}
                    className="flex items-center gap-1.5 text-[13px] text-neutral-600 hover:text-neutral-900"
                >
                    <LogOut size={15} strokeWidth={1.5} />
                    Log out
                </button>
            </div>
        </header>
    );
}
