import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import * as collectionService from "../../services/collection.service";
import * as productService from "../../services/product.service";

import CollectionForm from "../../components/collections/CollectionForm";

export default function AddCollection() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res =
                    await productService.getProducts({
                        limit: 200
                    });

                setProducts(res.data || []);
            } catch (error) {
                const message =
                    error.response?.data?.message ||
                    "Failed to load products";

                toast.error(message);
            }
        };

        loadProducts();
    }, []);

    const handleSubmit = async (formData) => {
        try {
            setSubmitting(true);

            await collectionService.createCollection(
                formData
            );

            toast.success("Collection created");

            navigate("/collections");
        } catch (error) {
            const message =
                error.response?.data?.message ||
                "Failed to create collection";

            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl space-y-5">
            <div>
                <h1 className="text-lg font-medium">
                    Add collection
                </h1>

                <p className="mt-1 text-[13px] text-neutral-500">
                    Create a curated collection and assign
                    products to it.
                </p>
            </div>

            <CollectionForm
                products={products}
                onSubmit={handleSubmit}
                submitting={submitting}
            />
        </div>
    );
}