import { formatCurrency } from "../../utils/formatCurrency";

// Ranks products by reviewCount as a proxy for popularity, since the backend
// doesn't currently expose units-sold per product.
export default function TopProducts({ products }) {
    if (!products || products.length === 0) {
        return <p className="py-6 text-center text-[13px] text-neutral-400">No products yet.</p>;
    }

    const top = [...products]
        .sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
        .slice(0, 5);

    return (
        <div className="divide-y divide-neutral-100">
            {top.map((product) => {
                const price = product.variants?.[0]?.salePrice ?? product.variants?.[0]?.price;
                return (
                    <div key={product._id} className="flex items-center gap-3 py-3">
                        <div className="h-10 w-10 shrink-0 overflow-hidden bg-neutral-100">
                            <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[13px]">{product.title}</p>
                            <p className="text-[11px] text-neutral-400">{product.reviewCount || 0} reviews</p>
                        </div>
                        <p className="text-[13px]">{formatCurrency(price)}</p>
                    </div>
                );
            })}
        </div>
    );
}
