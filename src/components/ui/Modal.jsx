import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children, footer }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
                    <p className="text-[14px] font-medium">{title}</p>
                    <button onClick={onClose} aria-label="Close">
                        <X size={18} strokeWidth={1.5} />
                    </button>
                </div>
                <div className="px-5 py-4">{children}</div>
                {footer && <div className="flex justify-end gap-3 border-t border-neutral-200 px-5 py-4">{footer}</div>}
            </div>
        </div>
    );
}
