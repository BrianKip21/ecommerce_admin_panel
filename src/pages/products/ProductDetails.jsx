import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import * as productService from "../../services/product.service";
import VariantTable from "../../components/products/VariantTable";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        productService.getProductById(id).then((res) => setProduct(res.data)).catch((err) => toast.error(err.message));
    }, [id]);

    if (!product) return <Spinner />;

    return (
        <div className="max-w-3xl space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-medium">{product.title}</h1>
                <Link to={`/products/${id}/edit`}>
                    <Button variant="secondary"><Pencil size={14} strokeWidth={1.5} />Edit</Button>
                </Link>
            </div>

            <div className="flex gap-6">
                <div className="h-40 w-40 shrink-0 overflow-hidden bg-neutral-100">
                    <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-1 text-[13px] text-neutral-600">
                    <p><span className="text-neutral-400">Category:</span> {product.category?.name}</p>
                    <p><span className="text-neutral-400">Brand:</span> {product.brand?.name}</p>
                    <p><span className="text-neutral-400">Rating:</span> {product.averageReview} ({product.reviewCount} reviews)</p>
                    <p className="mt-2 max-w-md">{product.description}</p>
                </div>
            </div>

            <div>
                <p className="mb-2 text-[11px] tracking-[1.5px] text-neutral-400">VARIANTS</p>
                <VariantTable variants={product.variants} onRemove={() => {}} />
            </div>
        </div>
    );
}
