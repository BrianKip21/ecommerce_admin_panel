import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ProductRow({ product, onDeleteClick }) {
    const variant = product.variants?.[0];
    const totalStock = (product.variants || []).reduce((sum, v) => sum + v.stock, 0);

    return (
        <tr>
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden bg-neutral-100">
                        <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                    </div>
                    <span>{product.title}</span>
                </div>
            </td>
            <td className="px-4 py-3 text-neutral-500">{product.category?.name}</td>
            <td className="px-4 py-3 text-neutral-500">{product.brand?.name}</td>
            <td className="px-4 py-3">{formatCurrency(variant?.salePrice ?? variant?.price)}</td>
            <td className="px-4 py-3">
                <span className={totalStock === 0 ? "text-red-700" : totalStock <= 5 ? "text-amber-700" : ""}>
                    {totalStock}
                </span>
            </td>
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <Link to={`/products/${product._id}/edit`} aria-label="Edit">
                        <Pencil size={15} strokeWidth={1.5} className="text-neutral-500 hover:text-neutral-900" />
                    </Link>
                    <button onClick={() => onDeleteClick(product)} aria-label="Delete">
                        <Trash2 size={15} strokeWidth={1.5} className="text-neutral-500 hover:text-red-700" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
