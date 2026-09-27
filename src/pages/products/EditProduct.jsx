import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import * as productService from "../../services/product.service";
import * as categoryService from "../../services/category.service";
import * as brandService from "../../services/brand.service";
import ProductForm from "../../components/products/ProductForm";
import Spinner from "../../components/ui/Spinner";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        productService.getProductById(id).then((res) => setProduct(res.data)).catch((err) => toast.error(err.message));
        categoryService.getCategories().then((res) => setCategories(res.data)).catch(() => {});
        brandService.getBrands().then((res) => setBrands(res.data)).catch(() => {});
    }, [id]);

    const handleSubmit = async (formData) => {
        setSubmitting(true);
        try {
            await productService.editProduct(id, formData);
            toast.success("Product updated");
            navigate("/products");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (!product) return <Spinner />;

    return (
        <div className="max-w-3xl space-y-5">
            <h1 className="text-lg font-medium">Edit product</h1>
            <ProductForm
                initialData={product}
                categories={categories}
                brands={brands}
                onSubmit={handleSubmit}
                submitting={submitting}
            />
        </div>
    );
}
