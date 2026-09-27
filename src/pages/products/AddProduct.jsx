import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as productService from "../../services/product.service";
import * as categoryService from "../../services/category.service";
import * as brandService from "../../services/brand.service";
import ProductForm from "../../components/products/ProductForm";

export default function AddProduct() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        categoryService.getCategories().then((res) => setCategories(res.data)).catch(() => {});
        brandService.getBrands().then((res) => setBrands(res.data)).catch(() => {});
    }, []);

    const handleSubmit = async (formData) => {
        setSubmitting(true);
        try {
            await productService.addProduct(formData);
            toast.success("Product created");
            navigate("/products");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl space-y-5">
            <h1 className="text-lg font-medium">Add product</h1>
            <ProductForm categories={categories} brands={brands} onSubmit={handleSubmit} submitting={submitting} />
        </div>
    );
}
