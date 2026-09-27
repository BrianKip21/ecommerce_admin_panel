import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Topbar from "./Topbar";

export default function AdminLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-neutral-50">
            <Toaster position="top-center" />
            <Sidebar />
            <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

            <div className="flex-1">
                <Topbar onMenuClick={() => setMobileOpen(true)} />
                <main className="p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
