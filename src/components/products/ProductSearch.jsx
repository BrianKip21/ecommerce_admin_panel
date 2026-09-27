import { useState } from "react";
import { Search } from "lucide-react";

export default function ProductSearch({ defaultValue = "", onSearch }) {
    const [value, setValue] = useState(defaultValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(value.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-b border-neutral-300 pb-1">
            <Search size={14} strokeWidth={1.5} className="text-neutral-400" />
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search products"
                className="w-full bg-transparent text-[13px] outline-none placeholder:text-neutral-400"
            />
        </form>
    );
}
