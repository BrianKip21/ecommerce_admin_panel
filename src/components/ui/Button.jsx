export default function Button({ variant = "primary", size = "md", className = "", children, ...props }) {
    const base = "inline-flex items-center justify-center gap-2 text-[13px] font-medium tracking-wide transition disabled:opacity-40 disabled:cursor-not-allowed";
    const sizes = { sm: "h-8 px-3", md: "h-10 px-4", lg: "h-12 px-6" };
    const variants = {
        primary: "bg-neutral-900 text-white hover:bg-neutral-800",
        secondary: "border border-neutral-300 text-neutral-800 hover:bg-neutral-50",
        danger: "bg-red-700 text-white hover:bg-red-800",
        ghost: "text-neutral-600 hover:text-neutral-900"
    };

    return (
        <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
}
