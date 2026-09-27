import { Link } from "react-router-dom";
import { LOW_STOCK_THRESHOLD } from "../../utils/constants";

export default function LowStockProducts({ products }) {
    const lowStock = (products || [])
        .flatMap((product) =>
            (product.variants || [])
                .filter((v) => v.stock <= LOW_STOCK_THRESHOLD)
                .map((v) => ({ product, variant: v }))
        )
        .slice(0, 6);

    if (lowStock.length === 0) {
        return <p className="py-6 text-center text-[13px] text-neutral-400">Nothing low on stock.</p>;
    }

    return (
        <div className="divide-y divide-neutral-100">
            {lowStock.map(({ product, variant }) => (
                <Link
                    key={variant._id}
                    to={`/products/${product._id}`}
                    className="flex items-center justify-between py-3 text-[13px]"
                >
                    <div>
                        <p>{product.title}</p>
                        <p className="text-[11px] text-neutral-400">{variant.color} / {variant.size}</p>
                    </div>
                    <span className={variant.stock === 0 ? "text-red-700" : "text-amber-700"}>
                        {variant.stock} left
                    </span>
                </Link>
            ))}
        </div>
    );
}
