import { useLocation, Link } from "react-router-dom";

export default function Breadcrumbs() {
    const location = useLocation();
    const parts = location.pathname.split("/").filter(Boolean);

    if (parts.length === 0) {
        return <p className="text-[13px] text-neutral-500">Dashboard</p>;
    }

    return (
        <div className="flex items-center gap-1.5 text-[13px] text-neutral-500">
            <Link to="/" className="hover:text-neutral-900">Dashboard</Link>
            {parts.map((part, i) => (
                <span key={i} className="flex items-center gap-1.5">
                    <span>/</span>
                    <span className="capitalize text-neutral-700">{decodeURIComponent(part)}</span>
                </span>
            ))}
        </div>
    );
}
